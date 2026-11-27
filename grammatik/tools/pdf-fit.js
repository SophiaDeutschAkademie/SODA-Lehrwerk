/* Syntalab 인쇄용 PDF — 인쇄 직전에 한 번, 좁은 단(약 88mm)에 선지·표·도식·그림을 맞춘다.
   pdf-build.py 가 이 파일을 인쇄용 HTML 끝에 그대로 넣고, 끝났다는 표시(data-pdf-fit)를 기다렸다가 인쇄한다.

   교재 앱의 pager.js 가 핸드폰 화면에서 하는 일과 같은 방식이다(tableFit, wordFit, svgFit).
   인쇄용 단의 폭이 핸드폰 화면 폭과 비슷해서 같은 기준을 쓴다.

   재는 동안(화면에 띄운 상태) 본문은 두 단이 아니라 단 하나의 폭으로 길게 늘어놓여 있다(pdf-print.css 의 「재는 때의 배치」).
   폭만 맞으면 되고, 단의 경계에 걸쳐 둘로 나뉜 상자는 폭이 제대로 재어지지 않기 때문이다.

   길이 단위 주의: 본문(.lx)에는 zoom 이 걸려 있다. getBoundingClientRect·getClientRects 는 줄어든 뒤의 값,
   clientWidth·offsetWidth·scrollWidth 와 getComputedStyle 의 px 는 줄기 전의 값이다. 한 비교 안에서는 섞지 않는다. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  var N = { tf: 0, tb: 0, span: 0, wf: 0, svg: 0 };   /* 손댄 개수: 넘친 표, 첫 칸을 푼 표, 두 단에 걸친 표, 낱말 맞춤, 키운 그림 글자 */
  function cs(el) { return getComputedStyle(el); }
  function px(v) { return parseFloat(v) || 0; }
  function all(sel, scope) { return Array.prototype.slice.call((scope || doc).querySelectorAll(sel)); }

  /* ── 1. 문제 선지: 네 선지가 모두 한 줄에 들어가는 가장 많은 칸 수(4 → 2 → 1). 선지가 셋이면 3 → 1, 둘이면 2 → 1.
        문제가 천 개가 넘으므로 한꺼번에 바꾸고 한꺼번에 잰다(하나씩 하면 그때마다 문서를 다시 놓는다). ── */
  function quizCols() {
    var gs = [];
    all('.lx .qg').forEach(function (g) {
      var os = all('.qo', g), n = os.length;
      if (n) gs.push({ g: g, os: os, tries: n >= 4 ? [4, 2] : n === 3 ? [3] : n === 2 ? [2] : [], i: 0, cols: 0, h: 0 });
    });
    /* 선지 한 줄의 높이: 줄바꿈을 막아 놓고 잰다 */
    gs.forEach(function (s) { s.g.classList.add('q-fit'); });
    gs.forEach(function (s) { for (var i = 0; i < s.os.length; i++) s.h = Math.max(s.h, s.os[i].getBoundingClientRect().height); });
    gs.forEach(function (s) { s.g.classList.remove('q-fit'); });
    /* 칸 수를 줄여 가며, 두 줄이 된 선지(한 줄 높이보다 높은 것)도 칸 밖으로 나간 선지(끊을 수 없는 긴 낱말)도 없는 첫 배치를 고른다 */
    var left = gs;
    while (left.length) {
      left.forEach(function (s) { if (s.i < s.tries.length) s.g.setAttribute('data-cols', s.tries[s.i]); else s.cols = 1; });
      left.forEach(function (s) {
        if (s.cols) return;
        for (var i = 0; i < s.os.length; i++) {
          var o = s.os[i];
          if (o.getBoundingClientRect().height > s.h + 1 || o.scrollWidth > o.clientWidth) { s.i++; return; }
        }
        s.cols = s.tries[s.i];
      });
      left = left.filter(function (s) { return !s.cols; });
    }
    gs.forEach(function (s) { s.g.setAttribute('data-cols', s.cols); });
  }

  /* ── 1-2. 문법 연습(body.ueb): 문항은 높이가 정해진 줄(.u-r)로 이루어지고, 줄에 든 글은 다음 줄로 넘어가지 않는다.
        들어가지 않는 줄은 이 순서로 맞춘다: 글자를 조금 줄인다 → (문장이 여럿이면) 문장마다 한 줄 → (한 문장이 너무 길면) 쉼표에서 나눈다.
        한국어 뜻은 줄여도 안 들어가면 여러 줄로 접는다. 문항이 천 개가 넘으므로 잴 때는 한꺼번에 잰다. ── */
  var K_SPLIT = 0.88;      /* 문장이 여럿인 줄: 이만큼 줄여도 안 들어가면 문장마다 한 줄로 나눈다 */
  var K_MIN = 0.8;         /* 한 문장: 이만큼(약 8pt)까지는 줄여서 한 줄에 넣는다 */
  var K_KO = 0.9;          /* 한국어 뜻: 이만큼 줄여도 안 들어가면 여러 줄로 접는다 */
  var K_OPT = 0.88;        /* 보기: 이만큼 줄여서 들어가면 줄 수를 늘리지 않는다 */
  function ubOptions() {
    /* 보기: 네 칸(칸 폭이 같아 문항끼리 줄이 맞는다, "4") → 한 줄에 제 폭대로("4f") → 두 줄("2") → 보기마다 한 줄("1") */
    var gs = all('.lx .qg').map(function (g) { return { g: g, os: all('.qo', g) }; });
    gs.forEach(function (s) { s.g.setAttribute('data-cols', 'm'); });          /* 재는 상태: 보기를 제 폭대로 늘어놓는다 */
    gs.forEach(function (s) { s.W = s.g.clientWidth; s.w = s.os.map(function (o) { return o.offsetWidth; }); });
    gs.forEach(function (s) {
      var n = s.w.length, GAP = 16, FREE = 28, max = 0, sum = 0, k = 1, cols, i;
      for (i = 0; i < n; i++) { max = Math.max(max, s.w[i]); sum += s.w[i]; }
      if (max <= (s.W - 3 * GAP) / 4) cols = '4';
      else if ((k = (s.W - (n - 1) * FREE) / sum) >= K_OPT) cols = '4f';
      else if ((k = (s.W - GAP) / 2 / max) >= K_OPT) cols = '2';
      else { cols = '1'; k = s.W / max; }
      s.g.setAttribute('data-cols', cols);
      if (k < 1) { s.g.style.fontSize = (Math.floor(k * 980) / 10) + '%'; N.os++; }
    });
  }
  function ubOver(x) { return x.scrollWidth > x.clientWidth + 0.5 ? x.clientWidth / x.scrollWidth : 1; }
  function ubShrink(x, k) {
    x.__k = (x.__k || 1) * k * 0.992;
    x.style.fontSize = (Math.floor(x.__k * 1000) / 10) + '%';
  }
  /* s(문장 .u-s)와 그 뒤의 것들을 새 줄로 옮긴다 → 새 줄의 .u-x */
  function ubNewRow(s, cont) {
    var x = s.parentNode, row = x.parentNode, r = row.cloneNode(false), nx = x.cloneNode(false), t;
    nx.removeAttribute('style');
    while (s) { t = s.nextSibling; nx.appendChild(s); s = t; }
    r.appendChild(nx);
    if (cont) r.classList.add('u-r-c');
    row.parentNode.insertBefore(r, row.nextSibling);
    return nx;
  }
  /* 한 문장이 너무 길 때(약 8pt 로 줄여도 한 줄에 들어가지 않을 때) 두 줄로 나눈다. 나눌 곳은 이 차례로 찾는다:
     ① 쉼표·쌍반점·쌍점·줄표·가운뎃점 뒤 ② und · oder · aber … 앞 ③ 낱말 사이. 두 조각이 다 한 줄에 들어가는 곳 가운데 길이가 가장 고른 곳을 고른다.
     힌트(괄호 안)와 빈칸 사이에서는 나누지 않는다. 뒤 조각은 들여 쓴다. */
  var CUTS = [/[,;:–—·]\s+/g, /\s+(?=(?:und|oder|aber|denn|sondern|doch)\s)/g, /\s+/g];
  function ubClause(x) {
    var z = x.getBoundingClientRect().width / x.offsetWidth, full = x.scrollWidth, limit = x.clientWidth / K_MIN;
    var r = doc.createRange(), best = null, score = 1e9, loose = null, lscore = 1e9, t, tw, n, m, re, a, v;
    for (t = 0; t < CUTS.length && !best; t++) {
      re = CUTS[t];
      tw = doc.createTreeWalker(x, 4, null, false);
      while ((n = tw.nextNode())) {
        if (n.parentNode.closest('.qh,.u-bh')) continue;
        re.lastIndex = 0;
        while ((m = re.exec(n.data))) {
          if (!m.index && !n.previousSibling && n.parentNode.firstChild === n && n.parentNode === x.firstChild) continue;   /* 맨 앞 */
          r.setStart(x, 0); r.setEnd(n, m.index + m[0].length);
          a = r.getBoundingClientRect().width / z;
          if (a < 40 || full - a < 40) continue;
          v = Math.max(a, full - a + 24);
          if (v <= limit && v < score) { score = v; best = { n: n, o: m.index + m[0].length }; }
          if (v < lscore) { lscore = v; loose = { n: n, o: m.index + m[0].length }; }
        }
      }
    }
    best = best || loose;
    if (!best) return null;
    r.setStart(best.n, best.o); r.setEndAfter(x.lastChild);
    var row = x.parentNode, nr = row.cloneNode(false), nx = x.cloneNode(false);
    nx.removeAttribute('style');
    nx.appendChild(r.extractContents());
    nr.appendChild(nx); nr.classList.add('u-r-c');
    row.parentNode.insertBefore(nr, row.nextSibling);
    nx.__cl = x.__cl = (x.__cl || 0) + 1;
    return nx;
  }
  function ubRows() {
    /* 줄바꿈이 적혀 있던 자리(data-br)에서는 언제나 줄을 나눈다 */
    all('.lx .u-r-s .u-s[data-br]').forEach(function (s) { if (s.previousSibling) ubNewRow(s); });
    var todo = all('.lx .u-r > .u-x'), pass, ks, next;
    for (pass = 0; pass < 8 && todo.length; pass++) {
      ks = todo.map(ubOver); next = [];
      todo.forEach(function (x, i) {
        var k = ks[i], row = x.parentNode, sent, ss, j, nx;
        if (k >= 1) return;
        sent = row.classList.contains('u-r-s'); ss = sent ? all('.u-s', x) : [];
        if (ss.length > 1 && (x.__k || 1) * k < K_SPLIT) {
          if (x.__k) { x.__k = 0; x.style.fontSize = ''; }
          for (j = 1; j < ss.length; j++) next.push(ubNewRow(ss[j]));
          next.push(x); N.sp++;
        } else if ((x.__k || 1) * k >= (row.classList.contains('u-r-m') ? K_KO : K_MIN)) {
          if (!x.__k) N.rs++;
          ubShrink(x, k); next.push(x);
        } else if (sent && (x.__cl || 0) < 3 && (nx = ubClause(x))) {
          if (x.__k) { x.__k = 0; x.style.fontSize = ''; }
          next.push(x); next.push(nx); N.cl++;
        } else if (row.classList.contains('u-r-m') && !row.classList.contains('u-wrap')) {
          if (x.__k) { x.__k = 0; x.style.fontSize = ''; }
          row.classList.add('u-wrap'); N.wr++;
        } else if (!row.classList.contains('u-wrap')) {
          if (!x.__k) N.rs++;
          ubShrink(x, k); next.push(x);
        }
      });
      todo = next;
    }
  }

  /* ── 2. 단보다 넓은 표: data-tf 1(최소 폭·줄바꿈 금지를 풀고 칸 여백을 줄임) → 2~6(글자를 한 단계씩 줄임).
        6단계에서도 넓으면 두 단에 걸쳐 놓는다(data-span). 낱말 중간에서 줄을 바꾸지는 않는다. ── */
  var TF_MAX = 6;
  function tblOver(t) {
    var p = t.parentNode;
    if (!p || p.nodeType !== 1) return false;
    var st = cs(p), avail = p.clientWidth - px(st.paddingLeft) - px(st.paddingRight);
    return avail > 0 && t.offsetWidth > avail + 1;
  }
  function tfSteps(t) {
    var k = 1;
    t.setAttribute('data-tf', '1');
    while (k < TF_MAX && tblOver(t)) { k++; t.setAttribute('data-tf', String(k)); }
    return !tblOver(t);
  }
  function tableFit() {
    all('.lx table').forEach(function (t) {
      if (!tblOver(t)) return;
      N.tf++;
      if (tfSteps(t)) return;
      var w = t.closest('.tbl-wrap') || t;
      if (w.closest('.dgm,.callout,.trap,.qi,.kc,.summary-card')) return;      /* 상자 안의 표는 단을 벗어날 수 없다 */
      t.removeAttribute('data-tf');
      w.setAttribute('data-span', '');
      /* 표의 제목도 함께 걸친다(그러지 않으면 제목만 한쪽 단에 남는다) */
      var h = w.previousElementSibling;
      while (h && (/^H[34]$/.test(h.tagName) || h.classList.contains('sub-head'))) { h.setAttribute('data-span', ''); h = h.previousElementSibling; }
      N.span++;
      if (tblOver(t)) tfSteps(t);
    });
  }

  /* 넘치지는 않지만 첫 칸(교재의 표는 첫 칸이 줄바꿈 금지다)이 표 폭의 40% 넘게 차지해서 다른 칸의 글이 세 줄 넘게 접힌 표:
     첫 칸도 접을 수 있게 푼다(data-tf="1"). 풀어서 표가 10% 넘게 낮아질 때만 그렇게 하고, 아니면 그대로 둔다. */
  function tableBalance() {
    all('.lx table').forEach(function (t) {
      if (t.hasAttribute('data-tf') || t.closest('[data-span]') || t.classList.contains('decl-m')) return;
      var rows = t.rows, first = 0, lines = 0, nowrap = false, i, j, c, st, lh;
      for (i = 0; i < rows.length; i++) {
        var cells = rows[i].cells;
        if (cells.length < 2 || cells[0].colSpan !== 1) continue;
        if (cells[0].tagName === 'TD' && cs(cells[0]).whiteSpace === 'nowrap') nowrap = true;
        first = Math.max(first, cells[0].offsetWidth);
        for (j = 1; j < cells.length; j++) {
          c = cells[j]; st = cs(c); lh = px(st.lineHeight);
          if (lh) lines = Math.max(lines, Math.round((c.clientHeight - px(st.paddingTop) - px(st.paddingBottom)) / lh));
        }
      }
      if (!nowrap || first < 0.4 * t.offsetWidth || lines < 3) return;
      var h0 = t.offsetHeight;
      t.setAttribute('data-tf', '1');
      if (t.offsetHeight > 0.9 * h0) t.removeAttribute('data-tf'); else N.tb++;
    });
  }

  /* ── 3. 좁은 칸(단의 절반 폭 이하)에서 낱말이 중간에 잘려 두 줄이 되면, 같은 줄의 같은 종류 칸 글자를 함께 조금씩 줄인다 ── */
  var WRE = /[가-힣]{2,}|[A-Za-zÄÖÜäöüß]{3,}/g;
  var CELL_MAX = 260;                                  /* 줄기 전의 px */
  function brokenIn(el) {
    var tw = doc.createTreeWalker(el, 4, null, false), n, m, r, rs, i, top;
    while ((n = tw.nextNode())) {
      WRE.lastIndex = 0;
      while ((m = WRE.exec(n.data))) {
        r = doc.createRange(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length);
        rs = r.getClientRects(); top = null;
        for (i = 0; i < rs.length; i++) {
          if (rs[i].width <= 0) continue;
          if (top == null) top = rs[i].top; else if (Math.abs(rs[i].top - top) > 2) return true;
        }
      }
    }
    return false;
  }
  function wordFit(scope) {
    var list = all('div,span,b,strong,em,i', scope), i, j, k, el, done = [];
    for (i = 0; i < list.length; i++) {
      el = list[i];
      if (el.__pfW || el.closest('table,.qg,svg')) continue;
      var own = false;
      for (var c = el.firstChild; c; c = c.nextSibling) if (c.nodeType === 3 && /\S/.test(c.data)) { own = true; break; }
      if (!own) continue;
      /* 글자를 담은 칸: 글자 요소가 inline 이면 그것을 감싼 가장 가까운 블록 */
      var cell = el;
      while (cell && cell !== scope && cs(cell).display === 'inline') cell = cell.parentNode;
      if (!cell || cell.nodeType !== 1 || cell.offsetWidth > CELL_MAX || !brokenIn(el)) continue;
      /* 같은 줄의 같은 종류 칸(부모의 부모 안에서 클래스가 같은 것)을 함께 줄여 크기를 맞춘다 */
      var box = el.parentNode && el.parentNode.parentNode || el.parentNode, grp = [el];
      if (el.className && typeof el.className === 'string' && box && box.querySelectorAll) {
        var sib = box.querySelectorAll(el.tagName.toLowerCase() + '.' + el.className.trim().split(/\s+/).join('.'));
        if (sib.length > 1 && sib.length < 40) grp = Array.prototype.slice.call(sib);
      }
      var base = [];
      for (j = 0; j < grp.length; j++) { grp[j].__pfW = 1; base.push(px(cs(grp[j]).fontSize)); }
      for (k = 0.92; k > 0.48; k -= 0.07) {
        for (j = 0; j < grp.length; j++) grp[j].style.fontSize = (base[j] * k).toFixed(2) + 'px';
        var bad = false;
        for (j = 0; j < grp.length && !bad; j++) if (brokenIn(grp[j])) bad = true;
        if (!bad) break;
      }
      N.wf++;
      done.push(grp);
    }
    for (i = 0; i < done.length; i++) for (j = 0; j < done[i].length; j++) done[i][j].__pfW = 0;
  }

  /* ── 4. 그림(SVG)이 단 폭에 맞춰 줄면서 그림 속 글자가 작아지면 글자만 키운다.
        키운 글자가 다른 글자와 겹치거나, 원래 들어 있던 상자·그림 밖으로 나가면 덜 키우고, 그래도 안 되면 그대로 둔다.
        기준: 줄어든 뒤 10.5px(약 8pt)보다 작은 글자를 11px 까지, 많아야 1.5배. ── */
  function inside(a, b, t) { return a.left >= b.left - t && a.right <= b.right + t && a.top >= b.top - t && a.bottom <= b.bottom + t; }
  function hits(a, b) { return a.left < b.right - 0.5 && b.left < a.right - 0.5 && a.top < b.bottom - 0.5 && b.top < a.bottom - 0.5; }
  function svgFit(scope) {
    all('svg', scope).forEach(function (svg) {
      var ts = svg.querySelectorAll('text'), i, j, x;
      if (!ts.length) return;
      var vb = svg.viewBox && svg.viewBox.baseVal, sr = svg.getBoundingClientRect();
      if (!vb || !vb.width || sr.width <= 0) return;
      var k = sr.width / vb.width;
      if (k >= 0.98) return;
      /* 그림 안의 좌표로 잰다. 변형(transform)이 걸린 그림은 그림 왼쪽 위를 기준으로 화면 좌표를 쓴다. */
      var useB = !svg.querySelector('[transform]');
      var box = function (el) {
        var b;
        if (useB) { b = el.getBBox(); return { left: (b.x - vb.x) * k, top: (b.y - vb.y) * k, right: (b.x - vb.x + b.width) * k, bottom: (b.y - vb.y + b.height) * k, width: b.width * k, height: b.height * k }; }
        b = el.getBoundingClientRect(); var o = svg.getBoundingClientRect();
        return { left: b.left - o.left, top: b.top - o.top, right: b.right - o.left, bottom: b.bottom - o.top, width: b.width, height: b.height };
      };
      var sb = { left: 0, top: 0, right: vb.width * k, bottom: vb.height * k };
      var base = [], tb = [], st = [], need = false;
      for (i = 0; i < ts.length; i++) {
        base.push(px(cs(ts[i]).fontSize)); tb.push(box(ts[i])); st.push(ts[i].getAttribute('style'));
        if (base[i] * k < 10.5) need = true;
      }
      if (!need) return;
      /* 글자마다 원래 들어 있던 가장 작은 상자(rect). 상자 테두리와의 원래 여백(4px 까지)은 남긴다. */
      var rs = svg.querySelectorAll('rect'), rb = [], cont = [], gap = [];
      for (j = 0; j < rs.length; j++) rb.push(box(rs[j]));
      for (i = 0; i < ts.length; i++) {
        var best = -1, area = 1e12;
        for (j = 0; j < rb.length; j++) { var a = rb[j].width * rb[j].height; if (a < area && inside(tb[i], rb[j], 1)) { best = j; area = a; } }
        cont.push(best);
        var g0 = best < 0 ? 0 : Math.min(tb[i].left - rb[best].left, rb[best].right - tb[i].right, tb[i].top - rb[best].top, rb[best].bottom - tb[i].bottom);
        gap.push(Math.max(0, Math.min(4, g0)));
      }
      /* 작은 글자부터 하나씩: 1.5배 → 1.35배 → 1.2배 → 1.1배 가운데 겹치지 않는 가장 큰 배율 */
      var caps = [1.5, 1.35, 1.2, 1.1], cur = tb.slice(0), ord = [];
      for (i = 0; i < ts.length; i++) if (base[i] * k < 10.5) ord.push(i);
      ord.sort(function (a, b) { return base[a] - base[b]; });
      for (var o = 0; o < ord.length; o++) {
        i = ord[o];
        for (x = 0; x < caps.length; x++) {
          var f = Math.min(caps[x], 11 / (base[i] * k));
          if (f <= 1.01) break;
          ts[i].style.fontSize = (base[i] * f).toFixed(2) + 'px';
          var nb = box(ts[i]), ok = inside(nb, sb, 1) && (cont[i] < 0 || inside(nb, rb[cont[i]], 0.5 - gap[i]));
          for (j = 0; j < ts.length && ok; j++) if (j !== i && hits(nb, cur[j]) && !hits(tb[i], tb[j])) ok = false;
          for (j = 0; j < rb.length && ok; j++) if (hits(nb, rb[j]) && !hits(tb[i], rb[j])) ok = false;   /* 원래 닿지 않던 상자에 닿으면 안 된다 */
          if (ok) { cur[i] = nb; N.svg++; break; }
          if (st[i] == null) ts[i].removeAttribute('style'); else ts[i].setAttribute('style', st[i]);
        }
      }
    });
  }

  /* ── 5. 맞춘 뒤에도 남은 문제를 적어 둔다(pdf-build.py 가 읽어 알린다).
        단 밖으로 나간 것이 하나라도 오른쪽 단에 놓이면 Chrome 이 책 전체를 줄여서 찍으므로 빠짐없이 찾는다:
        ① 상자가 단의 오른쪽 끝을 넘은 것 ② 글자가 제 상자 밖으로 나간 것(끊을 수 없는 긴 낱말).
        그리고 키우지 못해 5pt(6.7px)보다 작게 남은 그림 속 글자. ── */
  function label(el) {
    return el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).join('.') : '');
  }
  function snip(el, n) { return (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, n); }
  function report() {
    var over = [], small = [];
    all('article.lk').forEach(function (art) {
      all('.lx', art).forEach(function (lx) {
        var lr = lx.getBoundingClientRect(), st = cs(lx), z = lr.width / lx.offsetWidth;
        var cols = parseInt(st.columnCount, 10) || 1, gap = cols > 1 ? px(st.columnGap) * z : 0;
        var left0 = lr.left + px(st.paddingLeft) * z;
        var colW = (lr.width - (px(st.paddingLeft) + px(st.paddingRight)) * z - gap * (cols - 1)) / cols;
        var right = function (x) {
          var n = Math.min(cols - 1, Math.max(0, Math.floor((x - left0 + gap / 2) / (colW + gap))));
          return left0 + n * (colW + gap) + colW;
        };
        var boxes = [], inner = [];
        all('*', lx).forEach(function (el) {
          var tag = el.tagName.toLowerCase();
          if (tag !== 'svg' && el.closest('svg')) return;
          var rs = el.getClientRects(), o = 0, i;
          if (!el.closest('[data-span]')) {
            for (i = 0; i < rs.length; i++) if (rs[i].width > 0 && rs[i].height > 0) o = Math.max(o, rs[i].right - right(rs[i].left + 1));
          }
          if (o > 1.5) {
            for (i = 0; i < boxes.length; i++) if (boxes[i].el.contains(el)) return;      /* 가장 바깥 것만 */
            boxes.push({ el: el, o: o });
          } else if (rs.length === 1 && el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1) {
            inner.push({ el: el, o: (el.scrollWidth - el.clientWidth) * z });      /* 단에 걸쳐 나뉜 상자는 이 값이 맞지 않아 뺀다 */
          }
        });
        /* 글자가 넘친 상자는 가장 안쪽 것만, 그리고 ① 에서 이미 적은 상자의 안팎은 뺀다 */
        inner = inner.filter(function (a) {
          return !inner.some(function (b) { return b !== a && a.el.contains(b.el); }) &&
                 !boxes.some(function (b) { return b.el.contains(a.el) || a.el.contains(b.el); });
        });
        boxes.concat(inner).forEach(function (b) {
          over.push({ key: art.id, tag: label(b.el), over: Math.round(b.o * 10) / 10, text: snip(b.el, 60) });
        });
        all('svg', lx).forEach(function (svg) {
          var vb = svg.viewBox && svg.viewBox.baseVal, sr = svg.getBoundingClientRect();
          if (!vb || !vb.width || !sr.width) return;
          var k = sr.width / vb.width, min = 1e9, txt = '';
          all('text', svg).forEach(function (t) { var s = px(cs(t).fontSize) * k; if (s && s < min) { min = s; txt = t.textContent; } });
          if (min < 6.7) small.push({ key: art.id, pt: Math.round(min * 7.5) / 10, text: (txt || '').replace(/\s+/g, ' ').trim().slice(0, 40) });
        });
      });
    });
    /* 문법 연습: 높이가 정해진 줄에 든 것이 그 줄보다 높으면(안에서 줄이 바뀌었으면) 아래 줄과 겹친다 */
    all('.ueb .lx .u-r, .ueb .lx .qg').forEach(function (r) {
      var d = r.scrollHeight - r.clientHeight, art = r.closest('article');
      if (d > 6) over.push({ key: art ? art.id : '', tag: label(r) + '(높이)', over: d, text: snip(r, 60) });
    });
    /* 과 첫머리 차례의 한 줄 폭(px). pdf-build.py 가 PDF 에 찍힌 폭과 견주어, Chrome 이 쪽을 줄여 찍지 않았는지 본다. */
    var ref = doc.querySelector('.op-nav-l a');
    return { over: over, small: small, n: N, ref: ref ? ref.getBoundingClientRect().width : 0 };
  }

  function run() {
    try {
      var failed = [];
      if (doc.fonts && doc.fonts.forEach) doc.fonts.forEach(function (f) { if (f.status === 'error') failed.push(f.family + ' ' + f.weight); });
      if (failed.length) throw new Error('글꼴을 불러오지 못함: ' + failed.join(', '));
      if (doc.body.classList.contains('ueb')) { N.os = N.rs = N.sp = N.cl = N.wr = 0; ubOptions(); ubRows(); }
      else quizCols();
      tableFit();
      tableBalance();
      all('.lx').forEach(function (lx) { wordFit(lx); svgFit(lx); });
      root.setAttribute('data-pdf-report', JSON.stringify(report()));
    } catch (e) {
      root.setAttribute('data-pdf-error', String(e && e.stack || e));
    }
    root.setAttribute('data-pdf-fit', '1');
  }

  /* 그림과 글꼴을 모두 불러온 뒤에 잰다.
     쪽 여백 상자(머리말·꼬리말)의 글자는 본문에 같은 굵기로 나온 적이 없으면 글꼴이 불려 오지 않아 시스템 글꼴로 찍힌다.
     그래서 그 글자(data-margin-text)에 쓸 글꼴을 여기서 미리 부른다. */
  function loaded() {
    return new Promise(function (res) {
      if (doc.readyState === 'complete') res(); else window.addEventListener('load', function () { res(); });
    });
  }
  function marginFonts() {
    var text = root.getAttribute('data-margin-text') || '', jobs = [];
    if (text && doc.fonts && doc.fonts.load) {
      ['500', '600', '700'].forEach(function (w) {
        jobs.push(doc.fonts.load(w + ' 10px PInter', text));
        jobs.push(doc.fonts.load(w + ' 10px PPret', text));
      });
    }
    return Promise.all(jobs);
  }
  loaded().then(marginFonts).then(function () { return doc.fonts ? doc.fonts.ready : null; }).then(run, run);
})();
