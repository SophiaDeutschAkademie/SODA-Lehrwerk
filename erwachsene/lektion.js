/* SODA Basis, SODA Studium, SODA Beruf 과 화면: 순서 넘기기, 음성, 문제, 역할 대화, 쓰기, 과제 고르기, 학습 기록 (청소년 교재의 lektion.js 를 옮겨 쓴 것)
   기록은 이 브라우저의 localStorage 에 교재마다 따로 남습니다: 'soda-basis-v1', 'soda-studium-v1', 'soda-beruf-v1' (화면의 body data-store). 과를 고칠 때 이 짜임을 바꾸지 않습니다.
   { v:1, o:{ko:0|1, sp:"S"|"B"}, l:{ "a1-1/1": { s:마지막 순서, d:[본 순서], x:{문제 묶음:[결과…]}, k:[자기 평가], w:{글}, c:{확인 표시}, f:{내 정보}, fin:"마친 날", t:시각 } } }
   o.sp 는 공통 과정(SODA Basis)에서 고른 과제: S 대학 과제, B 직장 과제.
   공통 과정은 2026.11.26까지 두 교재(studium, beruf)에 따로 있었습니다. 'soda-basis-v1' 이 아직 없으면 그때의 기록을 한 번 옮겨 옵니다(body data-alt). */
(function () {
  'use strict';
  var d = document, root = d.documentElement, body = d.body;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';
  var ID = body.getAttribute('data-id'), AUD = body.getAttribute('data-audio'), D = {};
  try { D = JSON.parse($('#daten').textContent); } catch (e) { }
  root.classList.add('js');

  /* ---------- 기록 ---------- */
  var KEY = document.body.getAttribute('data-store') || 'soda-erwachsene-v1', S = { v: 1, o: {}, l: {} };
  function read() {
    try { var o = JSON.parse(localStorage.getItem(KEY) || 'null'); if (o && typeof o === 'object' && o.l && typeof o.l === 'object') return o; } catch (e) { }
    return null;
  }
  /* 공통 과정이 두 교재에 따로 있던 때의 기록: 과마다 더 나중에 쓴 것을 가져오고, 과제는 마지막에 공부하던 교재 쪽으로 맞춘다. 옛 기록은 그대로 둔다 */
  function alt() {
    var out = { v: 1, o: {}, l: {} }, last = -1, any = false;
    [['soda-studium-v1', 'S'], ['soda-beruf-v1', 'B']].forEach(function (kv) {
      try {
        var o = JSON.parse(localStorage.getItem(kv[0]) || 'null'); if (!o || !o.l) return;
        Object.keys(o.l).forEach(function (id) {
          if (!/^(a1|a2|b1)-/.test(id)) return;
          var r = o.l[id], t = r.t || 0; any = true;
          if (!out.l[id] || t > (out.l[id].t || 0)) out.l[id] = r;
          if (t > last) { last = t; out.o.sp = kv[1]; }
        });
        if (o.o && o.o.ko) out.o.ko = 1;
      } catch (e) { }
    });
    return any ? out : null;
  }
  S = read() || (body.getAttribute('data-alt') === '1' && alt()) || S; if (!S.o) S.o = {};
  function P() { return S.l[ID] || (S.l[ID] = {}); }
  function save() {
    var rec = P(), opt = S.o; rec.t = Date.now();
    var fresh = read();                      /* 다른 화면에서 바뀐 기록을 덮어쓰지 않게 다시 읽고 이 과만 바꾼다 */
    if (fresh) { fresh.l[ID] = rec; fresh.o = opt; S = fresh; }
    S.v = 1;
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { }
  }

  var toastT;
  function toast(m) { var t = $('#toast'); if (!t) return; t.textContent = m; t.classList.add('an'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('an'); }, 2600); }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }

  /* ---------- 음성 ---------- */
  var player = new Audio(); player.preload = 'auto';
  var mine = new Audio();
  var tok = 0, seqTok = 0, slow = false;
  function unmark() { $$('.spielt').forEach(function (e) { e.classList.remove('spielt'); }); }
  function seqBtn(b, on) {
    if (!b) return; var sp = $('span', b);
    if (!b.getAttribute('data-l')) b.setAttribute('data-l', sp.textContent);
    sp.textContent = on ? '멈추기' : b.getAttribute('data-l'); b.classList.toggle('laeuft', on);
  }
  function stop() {
    tok++; seqTok++;
    try { player.pause(); } catch (e) { } try { mine.pause(); } catch (e) { }
    unmark(); $$('.laeuft').forEach(function (b) { seqBtn(b, false); });
  }
  function play(id, el) {
    tok++; var my = tok; unmark();
    return new Promise(function (res) {
      if (!id) { res(false); return; }
      var fin = false, timer = 0;
      function done(ok) { if (fin) return; fin = true; clearTimeout(timer); player.removeEventListener('ended', onE); player.removeEventListener('error', onX); if (el) el.classList.remove('spielt'); res(!!ok && my === tok); }
      function onE() { done(true); }
      function onX() { done(false); }
      try { player.pause(); } catch (e) { }
      player.addEventListener('ended', onE); player.addEventListener('error', onX);
      player.src = AUD + id + '.mp3';
      player.defaultPlaybackRate = slow ? 0.8 : 1; player.playbackRate = slow ? 0.8 : 1;
      if (el) el.classList.add('spielt');
      var p; try { p = player.play(); } catch (e) { done(false); }
      if (p && p.catch) p.catch(function () { done(false); });
      timer = setTimeout(function () { done(false); }, 40000);
    });
  }
  function playSeq(items, btn) {            /* items: [{id, el}] */
    stop(); var my = ++seqTok, i = 0; seqBtn(btn, true);
    (function next() {
      if (my !== seqTok) return;
      if (i >= items.length) { seqBtn(btn, false); return; }
      var it = items[i++];
      if (it.el) { var r = it.el.getBoundingClientRect(); if (r.top < 70 || r.bottom > innerHeight - 110) it.el.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
      play(it.id, it.el).then(function (ok) { if (my !== seqTok) return; if (!ok) { seqBtn(btn, false); return; } setTimeout(next, 300); });
    })();
  }
  d.addEventListener('visibilitychange', function () { if (d.hidden) stop(); });

  /* ---------- 순서 넘기기 ---------- */
  var teile = $$('.teil'), sts = $$('.st'), prevB = $('#prev'), nextB = $('#next'), cur = -1;
  function show(i, scroll) {
    i = Math.max(0, Math.min(teile.length - 1, i));
    if (i === cur) return;
    stop(); cur = i;
    var rec = P(); rec.s = i; rec.d = rec.d || []; rec.d[i] = 1; save();
    teile.forEach(function (t, k) { t.classList.toggle('on', k === i); });
    sts.forEach(function (s, k) { if (k === i) s.setAttribute('aria-current', 'step'); else s.removeAttribute('aria-current'); s.classList.toggle('war', !!rec.d[k] && k !== i); });
    if (prevB) prevB.hidden = i === 0;
    if (nextB) {
      nextB.hidden = i === teile.length - 1;
      if (i < teile.length - 1) { var nm = $('h2 [lang="de"]', teile[i + 1]); nextB.innerHTML = '다음 <span lang="de">' + esc(nm ? nm.textContent : '') + '</span>'; }
    }
    try { history.replaceState(null, '', '#' + teile[i].id); } catch (e) { }
    if (scroll !== false) window.scrollTo(0, 0);
  }
  function fromHash() { var h = location.hash.slice(1); for (var k = 0; k < teile.length; k++) if (teile[k].id === h) return k; return -1; }
  if (prevB) prevB.addEventListener('click', function () { show(cur - 1); });
  if (nextB) nextB.addEventListener('click', function () { show(cur + 1); });
  sts.forEach(function (s, k) { s.addEventListener('click', function (e) { e.preventDefault(); show(k); }); });
  window.addEventListener('hashchange', function () { var k = fromHash(); if (k >= 0) show(k); });

  /* ---------- 문제 ---------- */
  function itemsOf(ex) { return $$('.it', ex); }
  function pts(it) { return it.getAttribute('data-k') === 'paar' ? +it.getAttribute('data-n') : 1; }
  function stand(ex) {
    var its = itemsOf(ex), tot = 0, got = 0, done = 0;
    its.forEach(function (it) { var p = pts(it); tot += p; if (it._r != null) { done++; got += Math.round(it._r * p); } });
    var st = $('.stand', ex); if (st) st.textContent = !done ? '' : (done < its.length ? done + ' / ' + its.length : '맞은 수 ' + got + ' / ' + tot);
    var nb = $('[data-act="neu"]', ex); if (nb) nb.hidden = !done;
  }
  function record(ex) {
    var arr = itemsOf(ex).map(function (it) { return it._r == null ? null : it._r; });
    var rec = P(); rec.x = rec.x || {}; rec.x[ex.getAttribute('data-ex')] = arr; save(); stand(ex);
    var gp = ex.closest('.gp'); if (gp && arr.every(function (v) { return v != null; })) gp.classList.remove('zu');
    bilanz();
  }
  /* 평가: 자동으로 채점한 문제를 구역마다 더해서 보여 준다 */
  function bilanz() {
    var box = $('[data-bilanz] .bil-feld'); if (!box) return;
    var rows = '', T = 0, G = 0, offen = 0, B = D.bil || {};
    teile.forEach(function (t) {
      var its = $$('.ex .it', t); if (!its.length) return;
      var tot = 0, got = 0, off = 0;
      its.forEach(function (it) { var p = pts(it); tot += p; if (it._r == null) off++; else got += Math.round(it._r * p); });
      T += tot; G += got; offen += off;
      var nm = $('h2 [lang="de"]', t), pc = tot ? Math.round(got / tot * 100) : 0;
      rows += '<li><a href="#' + t.id + '"><span class="bil-n" lang="de">' + esc(nm ? nm.textContent : '') + '</span><b>' + got + ' / ' + tot + '</b><span class="bil-b"><i style="width:' + pc + '%"></i></span>'
        + (off ? '<small>아직 안 푼 문제 ' + off + '개</small>' : '') + '</a></li>';
    });
    if (!T) return;
    var pc = Math.round(G / T * 100), msg;
    if (offen === T) msg = '문제를 풀면 여기에 결과가 나와요.';
    else if (offen) msg = '아직 풀지 않은 문제가 ' + offen + '개 있어요. 모두 풀면 전체 결과를 알려 줘요.';
    else msg = pc >= 80 ? B.hoch : (pc >= 60 ? B.mittel : B.tief);
    box.innerHTML = '<p class="bil-ges"><b>' + G + '</b><span>/ ' + T + '</span>' + (offen ? '' : '<em>' + pc + '%</em>') + '</p><ul class="bil-liste">' + rows + '</ul><p class="bil-msg">' + esc(msg || '') + '</p>';
  }
  function mark(it, r) {
    it._r = r; it.classList.add('fertig'); it.classList.add(r >= 1 ? 'richtig' : 'falsch');
    $$('.why,.skript1,.loes', it).forEach(function (n) { n.hidden = false; });
  }
  function setResult(it, r) { mark(it, r); record(it.closest('.ex')); }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function norm(s) { return String(s).toLowerCase().replace(/[.,!?;:–\-"„“”'’`´]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function ordDone(it, seq) {
    $('.ziel', it).innerHTML = '<span class="tok" style="border:0;background:none;padding-left:6px">' + esc(cap(seq.split(' / ').join(' ')) + (it.getAttribute('data-end') || '')) + '</span>';
    $('.bank', it).innerHTML = '';
  }
  function solve(it, r) {                   /* 저장된 결과를 다시 보여 준다 */
    var k = it.getAttribute('data-k');
    if (k === 'mc') { var o = $$('.opt', it)[+it.getAttribute('data-ok')]; if (o) o.classList.add('r'); }
    else if (k === 'gap') {
      $$('.lk', it).forEach(function (lk) {
        lk.classList.add('fertig');
        if (lk.classList.contains('in')) { var inp = $('input', lk); inp.value = lk.getAttribute('data-ans').split('|')[0]; inp.disabled = true; lk.classList.add('r'); }
        else $$('.opt', lk).forEach(function (o) { if (o.textContent === lk.getAttribute('data-ok')) o.classList.add('r'); });
      });
      var pb = $('.pruef', it); if (pb) pb.hidden = true;
    }
    else if (k === 'ord') ordDone(it, it.getAttribute('data-ok').split('|')[0]);
    else if (k === 'paar') $$('.pa,.pb', it).forEach(function (b) { b.classList.add('r'); });
    else if (k === 'dik') { var f = $('input', it); f.value = it.getAttribute('data-ok'); f.disabled = true; $('.pruef', it).hidden = true; }
    mark(it, r);
  }
  function initEx(ex) {
    itemsOf(ex).forEach(function (it) {
      it._r = null;
      if (it.getAttribute('data-k') === 'ord') { var e = it.getAttribute('data-end'); if (e) $('.ziel', it).insertAdjacentHTML('beforeend', '<span class="punktum">' + esc(e) + '</span>'); }
    });
  }
  $$('.ex').forEach(function (ex) {
    ex._html = ex.innerHTML; initEx(ex);
    var arr = (P().x || {})[ex.getAttribute('data-ex')], its = itemsOf(ex);
    if (arr && arr.length === its.length) { its.forEach(function (it, i) { if (arr[i] != null) solve(it, arr[i]); }); stand(ex); }
  });
  /* 성인 교재는 규칙과 표를 처음부터 보여 준다 (청소년 교재는 물음을 풀어야 규칙이 열린다) */
  bilanz();

  function gapDone(it) {
    var lks = $$('.lk', it);
    if (lks.every(function (x) { return x.classList.contains('fertig'); })) setResult(it, lks.every(function (x) { return x._r === 1; }) ? 1 : 0);
  }
  function onOpt(b) {
    var it = b.closest('.it'); if (!it || it.classList.contains('fertig')) return;
    var lk = b.closest('.lk');
    if (lk) {
      if (lk.classList.contains('fertig')) return;
      var ok = lk.getAttribute('data-ok'), right = b.textContent === ok;
      lk.classList.add('fertig'); lk._r = right ? 1 : 0;
      $$('.opt', lk).forEach(function (o) { if (o.textContent === ok) o.classList.add(right ? 'r' : 'k'); });
      gapDone(it); return;
    }
    var opts = $$('.opt', it), i = opts.indexOf(b), okI = +it.getAttribute('data-ok');
    if (i === okI) { b.classList.add('r'); setResult(it, 1); } else { b.classList.add('f'); if (opts[okI]) opts[okI].classList.add('r'); setResult(it, 0); }
  }
  function onPruef(b) {
    var it = b.closest('.it'); if (!it || it.classList.contains('fertig')) return;
    if (it.getAttribute('data-k') === 'dik') {
      var f = $('input', it); if (!f.value.trim()) { f.focus(); return; }
      f.disabled = true; b.hidden = true; setResult(it, norm(f.value) === norm(it.getAttribute('data-ok')) ? 1 : 0); return;
    }
    var ins = $$('.lk.in', it), leer = ins.filter(function (lk) { return !$('input', lk).value.trim(); });
    if (leer.length) { $('input', leer[0]).focus(); return; }
    ins.forEach(function (lk) {
      var inp = $('input', lk), ans = lk.getAttribute('data-ans').split('|'), v = inp.value.trim().replace(/\s+/g, ' ');
      var right = ans.some(function (a) { return a.toLowerCase() === v.toLowerCase(); });
      lk._r = right ? 1 : 0; lk.classList.add('fertig'); lk.classList.add(right ? 'r' : 'k'); inp.disabled = true;
      if (!right || ans.indexOf(v) < 0) lk.insertAdjacentHTML('beforeend', '<span class="soll">' + esc(ans[0]) + '</span>');
    });
    b.hidden = true; gapDone(it);
  }
  function onTok(b) {
    var it = b.closest('.it'); if (!it || it.classList.contains('fertig')) return;
    var ziel = $('.ziel', it), bank = $('.bank', it);
    if (b.parentNode === bank) ziel.insertBefore(b, $('.punktum', ziel)); else bank.appendChild(b);
    if (bank.children.length) return;
    var got = $$('.tok', ziel).map(function (x) { return x.textContent; }).join(' / '), oks = it.getAttribute('data-ok').split('|');
    if (oks.indexOf(got) >= 0) { ordDone(it, got); setResult(it, it._miss ? 0 : 1); return; }
    it._miss = (it._miss || 0) + 1; ziel.classList.add('nein'); setTimeout(function () { ziel.classList.remove('nein'); }, 340);
    if (it._miss >= 2) { ordDone(it, oks[0]); setResult(it, 0); } else toast('순서가 달라요. 낱말을 눌러 다시 놓아 보세요.');
  }
  function onPaar(b) {
    var it = b.closest('.it'); if (!it || b.classList.contains('r')) return;
    var side = b.classList.contains('pa') ? '.pa' : '.pb';
    $$(side + '.gew', it).forEach(function (x) { x.classList.remove('gew'); }); b.classList.add('gew');
    var a = $('.pa.gew', it), c = $('.pb.gew', it); if (!a || !c) return;
    a.classList.remove('gew'); c.classList.remove('gew');
    if (a.getAttribute('data-p') === c.getAttribute('data-p')) {
      a.classList.add('r'); c.classList.add('r'); if (!a._miss) it._got = (it._got || 0) + 1;
      var n = +it.getAttribute('data-n'); if ($$('.pa.r', it).length === n) setResult(it, (it._got || 0) / n);
    } else { a._miss = 1; [a, c].forEach(function (x) { x.classList.add('f'); setTimeout(function () { x.classList.remove('f'); }, 460); }); }
  }

  /* ---------- 단어 확인 ---------- */
  function quiz(box) {
    var key = box.getAttribute('data-quiz') || 'w', W = (D[key] || []).filter(function (w) { return w.d && w.k; }); if (W.length < 4) return;
    var feld = $('.quiz-feld', box), startB = $('[data-act="quiz"]', box), pool = shuffle(W.slice()).slice(0, Math.min(key === 'w' ? 8 : 5, W.length)), i = 0, got = 0, lock = false;
    feld.hidden = false; startB.hidden = true;
    function ask() {
      if (i >= pool.length) { feld.innerHTML = '<p class="qz-end">' + pool.length + '문제 가운데 ' + got + '문제를 맞혔어요.</p>'; startB.textContent = '다시 하기'; startB.hidden = false; return; }
      lock = false;
      var w = pool[i], rev = i % 2 === 1;
      var others = shuffle(W.filter(function (x) { return x !== w && x.k !== w.k && x.d !== w.d; })).slice(0, 3), opts = shuffle(others.concat([w]));
      feld.innerHTML = '<p class="qz-n">' + (i + 1) + ' / ' + pool.length + '</p><p class="qz-q' + (rev ? ' k' : '') + '"' + (rev ? '' : ' lang="de"') + '>'
        + (!rev && w.a ? '<button type="button" class="ton" data-a="' + w.a + '" aria-label="듣기">' + PLAY + '</button>' : '') + '<span>' + esc(rev ? w.k : w.d) + '</span></p><div class="qz-o">'
        + opts.map(function (o) { return '<button type="button" class="opt"' + (rev ? ' lang="de"' : '') + ' data-r="' + (o === w ? 1 : 0) + '">' + esc(rev ? o.d : o.k) + '</button>'; }).join('') + '</div>';
      if (!rev && w.a) play(w.a, $('.ton', feld));
    }
    feld.onclick = function (e) {
      var b = e.target.closest('.qz-o .opt'); if (!b || lock) return; lock = true;
      var r = b.getAttribute('data-r') === '1'; b.classList.add(r ? 'r' : 'f');
      if (r) got++; else { var c = $('.qz-o .opt[data-r="1"]', feld); if (c) c.classList.add('r'); }
      setTimeout(function () { lock = false; i++; ask(); }, r ? 650 : 1500);
    };
    ask();
  }

  /* ---------- 녹음 (저장하지 않음) ---------- */
  var canRec = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  function recPaint(w) {
    var b = $('[data-act="rec"]', w), p = $('[data-act="rec-play"]', w); if (!b) return;
    b.textContent = w._mr ? '녹음 멈추기' : (w._url ? '다시 녹음' : '녹음'); b.classList.toggle('auf', !!w._mr); p.hidden = !w._url || !!w._mr;
  }
  function recInit(w) {
    if (!canRec) { w.innerHTML = ''; return; }
    w.innerHTML = '<button type="button" class="chip" data-act="rec">녹음</button><button type="button" class="chip" data-act="rec-play" hidden>' + PLAY + '내 목소리</button>';
  }
  function recToggle(w) {
    if (w._mr) { try { w._mr.stop(); } catch (e) { } return; }
    stop();
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      var mr, ch = [];
      try { mr = new MediaRecorder(stream); } catch (e) { stream.getTracks().forEach(function (t) { t.stop(); }); toast('이 기기에서는 녹음을 쓸 수 없어요.'); return; }
      mr.ondataavailable = function (e) { if (e.data && e.data.size) ch.push(e.data); };
      mr.onstop = function () {
        stream.getTracks().forEach(function (t) { t.stop(); }); clearTimeout(w._t); w._mr = null;
        if (w._url) URL.revokeObjectURL(w._url);
        w._url = ch.length ? URL.createObjectURL(new Blob(ch, { type: mr.mimeType || 'audio/webm' })) : '';
        recPaint(w);
      };
      w._mr = mr; mr.start(); w._t = setTimeout(function () { if (mr.state === 'recording') mr.stop(); }, 60000); recPaint(w);
    }).catch(function () { toast('마이크를 쓸 수 없어요. 브라우저의 마이크 권한을 확인해 주세요.'); });
  }
  $$('[data-rec]').forEach(recInit);

  /* ---------- 역할 대화 ---------- */
  function rolleStart(sec, role) {
    var lines = (D.dlg || {})[sec.getAttribute('data-dlg')] || [], feld = $('.rolle-feld', sec);
    stop(); feld.hidden = false;
    $$('[data-rolle]', sec).forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-rolle') === role ? 'true' : 'false'); });
    feld.innerHTML = lines.map(function (l, k) {
      return '<div class="rz spaeter' + (l[0] === role ? ' ich' : '') + '" data-k="' + k + '"><b>' + esc(l[1]) + (l[0] === role ? ' · 내 차례' : '') + '</b><span lang="de">' + esc(l[3]) + '</span><small>' + esc(l[4]) + '</small></div>';
    }).join('') + '<div class="rolle-bar"><button type="button" class="btn" data-act="rolle-weiter">시작하기</button><button type="button" class="chip" data-act="rolle-zu" aria-pressed="false">내 대사 가리기</button><span class="rec" data-rec></span></div>'
      + '<p class="klein" style="margin-top:8px">녹음한 목소리는 저장되지 않고, 이 화면을 떠나면 없어져요.</p>';
    recInit($('[data-rec]', feld));
    sec._st = { lines: lines, role: role, i: -1 };
  }
  function rolleWeiter(sec) {
    var st = sec._st; if (!st) return;
    var rows = $$('.rz', sec), btn = $('[data-act="rolle-weiter"]', sec);
    st.i++;
    if (st.i >= st.lines.length) {
      rows.forEach(function (r) { r.classList.remove('jetzt', 'spaeter', 'zu'); });
      btn.disabled = false; btn.textContent = '처음부터 다시'; st.i = -1; toast('대화를 끝까지 했어요. 역할을 바꿔서 한 번 더 해 보세요.'); return;
    }
    var hide = $('[data-act="rolle-zu"]', sec).getAttribute('aria-pressed') === 'true';
    rows.forEach(function (r, k) { r.classList.toggle('spaeter', k > st.i); r.classList.toggle('jetzt', k === st.i); r.classList.toggle('zu', hide && k === st.i && st.lines[k][0] === st.role); });
    var l = st.lines[st.i], row = rows[st.i], rc = row.getBoundingClientRect();
    if (rc.top < 70 || rc.bottom > innerHeight - 190) row.scrollIntoView({ block: 'center', behavior: 'smooth' });
    if (l[0] === st.role) { btn.disabled = false; btn.textContent = '말했어요'; return; }
    if (!l[2]) { btn.disabled = false; btn.textContent = '읽었어요'; return; }   // 음성이 아직 없는 과: 상대의 말을 읽고 넘어간다
    btn.disabled = true; btn.textContent = '듣는 중';
    play(l[2], row).then(function (ok) {
      if (sec._st !== st) return;
      if (ok || !l[2]) { setTimeout(function () { if (sec._st === st) rolleWeiter(sec); }, ok ? 350 : 700); }
      else { btn.disabled = false; btn.textContent = '이어서 하기'; st.i--; }
    });
  }

  /* ---------- 내 이야기, 쓰기, 자기 평가 ---------- */
  $$('.ich').forEach(function (sec) {
    var id = sec.getAttribute('data-ich');
    function vals() { var r = P(); r.f = r.f || {}; return r.f[id] || (r.f[id] = {}); }
    function fill() { var v = vals(); $$('.slot', sec).forEach(function (s) { var t = v[s.getAttribute('data-s')]; s.textContent = t || s.getAttribute('data-ph'); s.classList.toggle('leer', !t); }); }
    $$('input[data-f]', sec).forEach(function (inp) {
      inp.value = vals()[inp.getAttribute('data-f')] || '';
      inp.addEventListener('input', function () { vals()[inp.getAttribute('data-f')] = inp.value.trim(); save(); fill(); });
    });
    fill();
  });
  $$('.schreib').forEach(function (sec) {
    var id = sec.getAttribute('data-schreib'), ta = $('textarea', sec), info = $('.gespeichert', sec), t = 0;
    var rec = P(); ta.value = (rec.w || {})[id] || '';
    ta.addEventListener('input', function () {
      clearTimeout(t); info.textContent = '';
      t = setTimeout(function () { var r = P(); r.w = r.w || {}; r.w[id] = ta.value; save(); info.textContent = '이 기기에 저장했어요.'; }, 500);
    });
    var cs = $$('.checks input', sec), cv = (rec.c || {})[id] || [];
    cs.forEach(function (c, i) {
      c.checked = !!cv[i];
      c.addEventListener('change', function () { var r = P(); r.c = r.c || {}; r.c[id] = cs.map(function (x) { return x.checked ? 1 : 0; }); save(); });
    });
  });
  $$('.selbst[data-checks]').forEach(function (box) {
    var id = box.getAttribute('data-checks'), cs = $$('input', box), cv = (P().c || {})[id] || [];
    cs.forEach(function (c, i) {
      c.checked = !!cv[i];
      c.addEventListener('change', function () { var r = P(); r.c = r.c || {}; r.c[id] = cs.map(function (x) { return x.checked ? 1 : 0; }); save(); });
    });
  });
  /* Station: 공부한 과가 어디까지 되었는지 */
  $$('.fortliste li[data-id]').forEach(function (li) {
    var r = S.l[li.getAttribute('data-id')], sp = $('.fo-s', li), t = '아직 시작하지 않았어요';
    if (r && r.fin) { t = '마쳤어요'; li.classList.add('ok'); }
    else if (r && r.d) { t = '6단계 가운데 ' + r.d.filter(function (v) { return v; }).length + '단계까지 봤어요'; li.classList.add('teilw'); }
    if (sp) sp.textContent = t;
  });
  /* ---------- 과제 고르기 (공통 과정) ---------- */
  function spur(v, neu) {
    if (v !== 'S' && v !== 'B') return;
    root.setAttribute('data-spur', v);
    $$('.wahl [data-spur]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-spur') === v ? 'true' : 'false'); });
    if (neu) { S.o.sp = v; save(); }
  }
  if ($('.wahl')) spur(S.o.sp, false);
  var kann = $$('.kannliste li');
  function kannPaint() { var k = P().k || []; kann.forEach(function (li, i) { $$('button', li).forEach(function (b) { b.setAttribute('aria-pressed', +b.getAttribute('data-v') === k[i] ? 'true' : 'false'); }); }); }
  kannPaint();
  function fertigPaint() { var b = $('[data-act="fertig"]'); if (b && P().fin) { b.textContent = b.getAttribute('data-done') || '마친 과예요'; b.classList.add('hell'); } }
  fertigPaint();

  /* ---------- 누르기 ---------- */
  function act(b) {
    var a = b.getAttribute('data-act'), sec;
    if (a === 'dlg-play') {
      if (b.classList.contains('laeuft')) { stop(); return; }
      playSeq($$('.z', b.closest('.dlg')).map(function (z) { return { id: z.getAttribute('data-a'), el: z }; }), b);
    } else if (a === 'story-play') {
      if (b.classList.contains('laeuft')) { stop(); return; }
      playSeq($$('.bz', b.closest('.story')).map(function (z) { return { id: z.getAttribute('data-a'), el: z }; }), b);
    } else if (a === 'seq') {
      if (b.classList.contains('laeuft')) { stop(); return; }
      playSeq(b.closest('.hoertext').getAttribute('data-seq').split(' ').map(function (id) { return { id: id, el: null }; }), b);
    } else if (a === 'dlg-ko') {
      var on = b.getAttribute('aria-pressed') !== 'true'; S.o.ko = on ? 1 : 0; save();
      $$('.dlg').forEach(function (x) { x.classList.toggle('mit-ko', on); }); $$('[data-act="dlg-ko"]').forEach(function (x) { x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    } else if (a === 'dlg-slow') {
      slow = b.getAttribute('aria-pressed') !== 'true'; $$('[data-act="dlg-slow"]').forEach(function (x) { x.setAttribute('aria-pressed', slow ? 'true' : 'false'); });
      player.playbackRate = slow ? 0.8 : 1;
    } else if (a === 'neu') {
      var ex = b.closest('.ex'), rec = P(); if (rec.x) delete rec.x[ex.getAttribute('data-ex')]; save();
      ex.innerHTML = ex._html; initEx(ex); stand(ex); bilanz();
    } else if (a === 'quiz') quiz(b.closest('.quiz'));
    else if (a === 'rec') recToggle(b.closest('[data-rec]'));
    else if (a === 'rec-play') { var w = b.closest('[data-rec]'); if (w._url) { stop(); mine.src = w._url; mine.play().catch(function () { }); } }
    else if (a === 'rolle-weiter') rolleWeiter(b.closest('.rolle'));
    else if (a === 'rolle-zu') {
      var z = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', z ? 'true' : 'false');
      sec = b.closest('.rolle'); var st = sec._st; $$('.rz', sec).forEach(function (r, k) { r.classList.toggle('zu', z && st && k === st.i && st.lines[k][0] === st.role); });
    } else if (a === 'kopie') {
      var ta = $('textarea', b.closest('.schreib')); if (!ta.value.trim()) { toast('먼저 글을 써 보세요.'); return; }
      var okc = function () { toast('글을 복사했어요.'); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(ta.value).then(okc, function () { ta.select(); });
      else { ta.select(); try { d.execCommand('copy'); okc(); } catch (e) { } }
    } else if (a === 'fertig') {
      var r2 = P(); if (!r2.fin) { var n = new Date(); r2.fin = n.getFullYear() + '-' + ('0' + (n.getMonth() + 1)).slice(-2) + '-' + ('0' + n.getDate()).slice(-2); save(); toast(b.getAttribute('data-msg') || '이 과를 마친 것으로 기록했어요.'); }
      fertigPaint();
    }
  }
  d.addEventListener('click', function (e) {
    var t = e.target, b;
    if ((b = t.closest('[data-act]'))) { act(b); return; }
    if ((b = t.closest('.wahl [data-spur]'))) { stop(); spur(b.getAttribute('data-spur'), true); return; }
    if ((b = t.closest('[data-rolle]'))) { rolleStart(b.closest('.rolle'), b.getAttribute('data-rolle')); return; }
    if ((b = t.closest('.stufe button'))) {
      var li = b.closest('li'), i = kann.indexOf(li), r = P(); r.k = r.k || []; r.k[i] = +b.getAttribute('data-v'); save(); kannPaint(); return;
    }
    if ((b = t.closest('.it .opt'))) { onOpt(b); return; }
    if ((b = t.closest('.pruef'))) { onPruef(b); return; }
    if ((b = t.closest('.tok'))) { onTok(b); return; }
    if ((b = t.closest('.pa,.pb'))) { onPaar(b); return; }
    if ((b = t.closest('[data-a]')) && !b.disabled) {
      if (b.classList.contains('spielt')) { stop(); return; }
      stop(); play(b.getAttribute('data-a'), b);
    }
  });
  d.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    var inp = e.target; if (!inp || inp.tagName !== 'INPUT') return;
    var it = inp.closest('.it'); if (!it) return;
    var pb = $('.pruef', it); if (pb && !pb.hidden) { e.preventDefault(); onPruef(pb); }
  });

  /* ---------- 처음 ---------- */
  if (S.o.ko) { $$('.dlg').forEach(function (x) { x.classList.add('mit-ko'); }); $$('[data-act="dlg-ko"]').forEach(function (x) { x.setAttribute('aria-pressed', 'true'); }); }
  try { history.scrollRestoration = 'manual'; } catch (e) { }
  function oben() { window.scrollTo(0, 0); }
  if (teile.length) {
    setTimeout(oben, 0); window.addEventListener('load', function () { setTimeout(oben, 0); });      /* 주소 끝의 #이름 때문에 화면이 아래로 내려가지 않게 */
    var h = fromHash(), saved = P().s;
    if (h >= 0) show(h, false);
    else if (saved > 0 && saved < teile.length) { show(saved, false); toast('지난번에 보던 곳에서 이어서 시작해요.'); }
    else show(0, false);
  }
})();
