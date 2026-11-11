/* SODA DIKTATTRAINING · 채점
 *
 * grade(원문, 학생이 쓴 문장) → { ops, n, ok, extra, errs, pct, perfect }
 *   ops    원문 단어와 학생 단어를 순서대로 맞춘 결과. op 는
 *          ok(맞음) · sub(다르게 씀) · del(빠뜨림) · ins(더 씀) · space(띄어쓰기가 다름) · skip(채점하지 않는 감탄사)
 *          ok·sub·del·ins·skip 은 t(원문 단어)·u(학생 단어)를, space 는 ts·us(단어 여러 개)를 가져요.
 *   errs   틀린 곳 목록 { type, t(원문 단어), u(학생 단어) }
 *   pct    맞은 단어 ÷ (원문 단어 + 더 쓴 단어) × 100
 *
 * 채점 규칙
 *   - 문장부호는 보지 않아요. 붙임표(-)와 아포스트로피(')도 빼고 견줘요. (Vier-Tage-Woche = Viertagewoche, geht's = gehts)
 *   - 문장의 첫 글자는 대소문자를 보지 않아요. 문장 안의 대문자는 봐요.
 *   - 숫자는 글자로 써도, 숫자로 써도 맞아요. (zwanzig = 20, dritten = 3., zwei Euro achtzig = 2,80 Euro, neun Uhr zwanzig = 9:20 Uhr)
 *   - 둘 다 쓰는 표기는 모두 맞아요. (Tschüs = Tschüss, Friseur = Frisör, okay = ok)
 *   - Ah, Oh 같은 감탄사는 빠뜨리거나 더 써도 세지 않아요.
 *   - zu Hause = zuhause, nach Hause = nachhause, so dass = sodass 는 모두 맞아요.
 */
(function (root) {
  'use strict';

  var ONES = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf',
    'dreizehn', 'vierzehn', 'fünfzehn', 'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn'];
  var TENS = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig'];

  function numToDe(n) {
    if (n < 20) return ONES[n];
    if (n < 100) {
      var t = Math.floor(n / 10), o = n % 10;
      return o === 0 ? TENS[t] : (o === 1 ? 'ein' : ONES[o]) + 'und' + TENS[t];
    }
    if (n < 1000) {
      var h = Math.floor(n / 100), r = n % 100;
      return (h === 1 ? 'ein' : ONES[h]) + 'hundert' + (r ? numToDe(r) : '');
    }
    if (n < 10000) {
      var k = Math.floor(n / 1000), r2 = n % 1000;
      return (k === 1 ? 'ein' : ONES[k]) + 'tausend' + (r2 ? numToDe(r2) : '');
    }
    return String(n);
  }
  /* 숫자 n 을 글자로 쓰는 여러 방법 */
  function numForms(n) {
    var f = [numToDe(n)];
    if (n === 1) f.push('ein', 'eine', 'einen', 'einem', 'einer', 'eines');
    if (n >= 100 && n < 200) f.push(f[0].replace(/^ein/, ''));              // hundertfünfzig
    if (n >= 1000 && n < 2000) f.push(f[0].replace(/^ein/, ''));            // tausendzweihundert
    if (n >= 1100 && n < 2000) f.push(numToDe(Math.floor(n / 100)) + 'hundert' + (n % 100 ? numToDe(n % 100) : ''));   // neunzehnhundertzehn
    return f;
  }
  var ORD = { 1: 'erst', 3: 'dritt', 7: 'siebt', 8: 'acht' };
  function ordForms(n) {
    var stem = ORD[n] || (n < 20 ? ONES[n] + 't' : numToDe(n) + 'st');
    return ['e', 'en', 'er', 'es', 'em'].map(function (e) { return stem + e; });
  }

  /* 둘 다 쓰는 표기 */
  var VARIANT = {};
  [['tschüs', 'tschüss'], ['okay', 'ok', 'o.k'], ['hm', 'hmm'], ['friseur', 'frisör'], ['friseurin', 'frisörin'],
    ['gern', 'gerne'], ['oje', 'ohje']].forEach(function (g, i) {
    g.forEach(function (w) { VARIANT[w] = 'v' + i; });
  });
  var INTERJ = {};
  'ah ach aha oh oje ohje hm hmm na tja wow hey hi puh äh ähm och ups'.split(' ').forEach(function (w) { INTERJ[w] = 1; });

  /* 관사·대명사 묶음 */
  var FAM = {};
  function fam(name, words) { words.split(' ').forEach(function (w) { FAM[w] = name; }); }
  fam('d', 'der die das den dem des');
  ['ein', 'kein', 'mein', 'dein', 'sein', 'unser'].forEach(function (st) {
    fam(st, [st, st + 'e', st + 'en', st + 'em', st + 'er', st + 'es'].join(' '));
  });
  fam('unser', 'unsre unsren unsrem unsrer unsres');
  fam('euer', 'euer eure euren eurem eurer eures euch');
  fam('ihr', 'sie ihr ihre ihren ihrem ihrer ihres ihnen');
  fam('dies', 'dies dieser diese dieses diesen diesem');
  fam('jed', 'jeder jede jedes jeden jedem');
  fam('welch', 'welcher welche welches welchen welchem');
  fam('ich', 'ich mich mir');
  fam('du', 'du dich dir');
  fam('er', 'er ihn ihm');
  fam('wir', 'wir uns');

  /* 변화 어미(명사·형용사·동사). 단어의 앞부분이 같고 끝만 이 가운데 하나로 다르면 「어미」로 봐요. */
  var ENDING = {};
  ['', 'e', 'en', 'em', 'er', 'es', 'n', 's', 'st', 't', 'te', 'ten', 'tet', 'test', 'et', 'est', 'ern', 'nen', 'se', 'sen', 'in', 'innen'].forEach(function (e) { ENDING[e] = 1; });

  var EDGE = /^[^0-9A-Za-zÀ-ÖØ-öø-ÿ]+|[^0-9A-Za-zÀ-ÖØ-öø-ÿ]+$/g;

  function clean(s) {
    s = String(s == null ? '' : s);
    if (s.normalize) s = s.normalize('NFC');
    return s.replace(/[’‘`´]/g, "'").replace(/\b([Oo])h je\b/g, '$1je')
      /* 가격과 시각을 숫자로 쓴 꼴은 들리는 순서로 풀어요 (2,80 Euro → 2 Euro 80, 9:20 Uhr → 9 Uhr 20) */
      .replace(/(\d+),(\d\d)\s*(Euro|€)/g, '$1 Euro $2').replace(/€/g, ' Euro ')
      .replace(/(\d+)[:.](\d\d)\s*Uhr/g, '$1 Uhr $2')
      .replace(/\s+/g, ' ').trim();
  }
  /* 견줄 때 쓰는 꼴: 아포스트로피를 빼고, 붙임표로 이은 말은 붙여 쓴 꼴로 (Vier-Tage-Woche → Viertagewoche) */
  function keyOf(raw) {
    var p = raw.replace(/'/g, '').split('-');
    for (var i = 1; i < p.length; i++) p[i] = p[i].toLowerCase();
    return p.join('');
  }
  function tokenize(s) {
    var out = [];
    clean(s).split(' ').forEach(function (w) {
      var raw = w.replace(EDGE, '');
      if (!raw) return;
      out.push({
        i: out.length,
        raw: raw,
        key: keyOf(raw),
        ord: /^\d+\.[,;:!?)]*$/.test(w),
        end: /[.!?…:]["'»“”)]*$/.test(w) && !/^\d+\.[,;:!?)]*$/.test(w)
      });
    });
    out.forEach(function (t, i) {
      /* "18." 은 서수일 수도, 문장 끝의 숫자일 수도 있어요. 다음 단어가 대문자로 시작하면 문장 끝으로 봐요. */
      if (t.ord && out[i + 1] && isUpper(out[i + 1].raw)) t.end = true;
    });
    out.forEach(function (t, i) {
      t.first = i === 0 || out[i - 1].end ||
        /* 문장 첫머리 감탄사 바로 뒤 단어도 첫 글자 대소문자를 보지 않아요 (Oh, das … → Das …) */
        (out[i - 1].first && !!INTERJ[out[i - 1].key.toLowerCase()]);
    });
    return out;
  }
  function isUpper(s) { var c = s.charAt(0); return c !== c.toLowerCase(); }
  function fold(s) { return s.toLowerCase().replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss'); }
  function foldAe(s) { return s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss'); }
  function lev(a, b) {
    var n = a.length, m = b.length, i, j, prev = [], cur = [];
    if (!n) return m;
    if (!m) return n;
    for (j = 0; j <= m; j++) prev[j] = j;
    for (i = 1; i <= n; i++) {
      cur = [i];
      for (j = 1; j <= m; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
      prev = cur;
    }
    return prev[m];
  }

  /* 원문 단어 t 와 학생 단어 u 가 같은가 */
  function same(t, u) {
    var a = t.key, b = u.key;
    if (a === b) return true;
    var la = a.toLowerCase(), lb = b.toLowerCase();
    var caseOk = t.first ? a.slice(1) === b.slice(1) : a === b;
    if (la === lb) return caseOk;
    /* 숫자 ↔ 글자 */
    var ta = /^\d+$/.test(a), ub = /^\d+$/.test(b);
    if (ta !== ub) {
      var num = parseInt(ta ? a : b, 10), word = ta ? lb : la, isOrd = ta ? t.ord : u.ord;
      if (num < 10000) {
        if (isOrd && ordForms(num).indexOf(word) >= 0) return true;
        if (numForms(num).indexOf(word) >= 0) return true;
      }
      return false;
    }
    /* 둘 다 쓰는 표기 */
    if (VARIANT[la] && VARIANT[la] === VARIANT[lb]) return t.first || isUpper(a) === isUpper(b);
    return false;
  }

  /* 틀린 단어의 종류 */
  function kind(t, u) {
    var a = t.key, b = u.key, la = a.toLowerCase(), lb = b.toLowerCase();
    if (la === lb) return 'case';
    if (/^\d+$/.test(a) || /^\d+$/.test(b)) return 'word';
    if (fold(a) === fold(b) || foldAe(a) === lb || foldAe(a) === foldAe(b)) return 'uml';
    var fa = FAM[la], fb = FAM[lb];
    if (fa && fa === fb) return 'art';
    var d = lev(la, lb), L = Math.max(la.length, lb.length);
    if (fa || fb) return d <= 2 ? 'spell' : 'word';
    var cp = 0;
    while (cp < la.length && cp < lb.length && la.charAt(cp) === lb.charAt(cp)) cp++;
    var ra = la.slice(cp), rb = lb.slice(cp);
    if (cp >= 3 && cp >= L / 2) {
      /* 끝소리 d/t, b/p, g/k 를 바꿔 쓴 것은 철자 */
      if (ra.length === 1 && rb.length === 1 && /^(dt|td|bp|pb|gk|kg)$/.test(ra + rb)) return 'spell';
      /* 겹자음을 하나 더 쓰거나 덜 쓴 것(wenn/wen, Mann/man)은 철자 */
      if ((ra === '' && rb === la.charAt(cp - 1)) || (rb === '' && ra === lb.charAt(cp - 1))) return 'spell';
      /* 두 단어의 끝이 모두 변화 어미이면 어미 */
      if (ENDING[ra] && ENDING[rb]) return 'end';
    }
    if (d <= 2 || d <= L * 0.34) return 'spell';
    return 'word';
  }

  function subCost(t, u) {
    if (same(t, u)) return 0;
    var la = t.key.toLowerCase(), lb = u.key.toLowerCase();
    if (la === lb || fold(la) === fold(lb)) return 0.3;
    return 0.4 + 0.8 * Math.min(1, lev(la, lb) / Math.max(la.length, lb.length));
  }

  /* 붙여 쓰기와 띄어 쓰기를 모두 쓰는 말 */
  var SPACE_OK = { zuhause: 1, nachhause: 1, sodass: 1 };
  function joined(arr, from, k) {
    var s = '';
    for (var x = 0; x < k; x++) s += arr[from + x].key;
    return s.toLowerCase();
  }

  function grade(target, input) {
    var T = tokenize(target), U = tokenize(input), n = T.length, m = U.length, i, j, k;
    var D = [], B = [];
    for (i = 0; i <= n; i++) { D[i] = []; B[i] = []; }
    D[0][0] = 0;
    for (i = 1; i <= n; i++) { D[i][0] = i; B[i][0] = { op: 'del' }; }
    for (j = 1; j <= m; j++) { D[0][j] = j; B[0][j] = { op: 'ins' }; }
    for (i = 1; i <= n; i++) {
      for (j = 1; j <= m; j++) {
        var c = subCost(T[i - 1], U[j - 1]);
        var best = D[i - 1][j - 1] + c, bop = { op: c === 0 ? 'ok' : 'sub' };
        if (D[i - 1][j] + 1 < best) { best = D[i - 1][j] + 1; bop = { op: 'del' }; }
        if (D[i][j - 1] + 1 < best) { best = D[i][j - 1] + 1; bop = { op: 'ins' }; }
        /* 한 단어를 여러 단어로 띄어 쓴 경우 (sowieso → so wie so) */
        for (k = 2; k <= 3 && k <= j; k++) {
          if (T[i - 1].key.length >= 4 && joined(U, j - k, k) === T[i - 1].key.toLowerCase()) {
            var c1 = SPACE_OK[T[i - 1].key.toLowerCase()] ? 0 : 0.5;
            if (D[i - 1][j - k] + c1 < best) { best = D[i - 1][j - k] + c1; bop = { op: 'split', k: k, free: c1 === 0 }; }
          }
        }
        /* 여러 단어를 한 단어로 붙여 쓴 경우 (zu Hause → zuhause) */
        for (k = 2; k <= 3 && k <= i; k++) {
          if (U[j - 1].key.length >= 4 && joined(T, i - k, k) === U[j - 1].key.toLowerCase()) {
            var c2 = SPACE_OK[U[j - 1].key.toLowerCase()] ? 0 : 0.5;
            if (D[i - k][j - 1] + c2 < best) { best = D[i - k][j - 1] + c2; bop = { op: 'join', k: k, free: c2 === 0 }; }
          }
        }
        D[i][j] = best; B[i][j] = bop;
      }
    }
    var ops = [];
    i = n; j = m;
    while (i > 0 || j > 0) {
      var b = B[i][j], x;
      if (b.op === 'ok' || b.op === 'sub') { ops.push({ op: b.op, t: T[i - 1], u: U[j - 1] }); i--; j--; }
      else if (b.op === 'del') { ops.push({ op: 'del', t: T[i - 1] }); i--; }
      else if (b.op === 'ins') { ops.push({ op: 'ins', u: U[j - 1] }); j--; }
      else if (b.op === 'split') {
        var us = [];
        for (x = 0; x < b.k; x++) us.push(U[j - b.k + x]);
        ops.push({ op: 'space', free: b.free, ts: [T[i - 1]], us: us });
        i--; j -= b.k;
      } else {
        var ts = [];
        for (x = 0; x < b.k; x++) ts.push(T[i - b.k + x]);
        ops.push({ op: 'space', free: b.free, ts: ts, us: [U[j - 1]] });
        i -= b.k; j--;
      }
    }
    ops.reverse();

    var counted = 0, ok = 0, extra = 0, errs = [];
    function raws(a) { return a.map(function (z) { return z.raw; }).join(' '); }
    ops.forEach(function (o) {
      if (o.op === 'ok') { counted++; ok++; return; }
      if (o.op === 'space') {
        counted += o.ts.length;
        if (o.free) { ok += o.ts.length; o.op = 'ok'; o.lenient = true; return; }
        ok += o.ts.length - 1;
        o.type = 'space';
        errs.push({ type: 'space', t: raws(o.ts), u: raws(o.us) });
        return;
      }
      if (o.op === 'sub') {
        if (INTERJ[o.t.key.toLowerCase()] && INTERJ[o.u.key.toLowerCase()]) { o.op = 'ok'; o.lenient = true; counted++; ok++; return; }
        counted++;
        o.type = kind(o.t, o.u);
        errs.push({ type: o.type, t: o.t.raw, u: o.u.raw });
        return;
      }
      if (o.op === 'del') {
        if (INTERJ[o.t.key.toLowerCase()]) { o.op = 'skip'; return; }
        counted++;
        o.type = 'miss';
        errs.push({ type: 'miss', t: o.t.raw, u: '' });
        return;
      }
      if (INTERJ[o.u.key.toLowerCase()]) { o.op = 'skip'; return; }
      extra++;
      o.type = 'extra';
      errs.push({ type: 'extra', t: '', u: o.u.raw });
    });
    var den = counted + extra;
    return {
      ops: ops, n: counted, ok: ok, extra: extra, errs: errs,
      pct: den ? Math.round(ok * 100 / den) : 0,
      perfect: errs.length === 0 && counted > 0,
      empty: m === 0
    };
  }

  var LABEL = {
    end: '어미', art: '관사·대명사', 'case': '대소문자', uml: '움라우트·ß', spell: '철자',
    space: '띄어쓰기', miss: '빠진 단어', extra: '더 쓴 단어', word: '다른 단어'
  };
  var ORDER = ['miss', 'word', 'end', 'art', 'spell', 'uml', 'case', 'space', 'extra'];

  var api = { grade: grade, tokenize: tokenize, numToDe: numToDe, LABEL: LABEL, ORDER: ORDER };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DiktatGrade = api;
})(typeof window !== 'undefined' ? window : this);
