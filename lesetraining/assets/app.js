/* SODA LESETRAINING · Sophia Deutsch Akademie */
(function () {
  'use strict';

  var LEVELS = [
    { code: 'A1', de: 'Anfänger', ko: '처음 읽는 독일어', step: 1, words: '90–140',
      desc: '일상에서 만나는 짧은 글을 읽어요.' },
    { code: 'A2', de: 'Grundlegende Kenntnisse', ko: '생활 속 독일어', step: 2, words: '160–240',
      desc: '이메일, 일기, 인터뷰, 포럼 글처럼 익숙한 주제를 다룬 글을 읽어요.' },
    { code: 'B1', de: 'Fortgeschrittene Sprachverwendung', ko: '정보와 의견 읽기', step: 3, words: '260–360',
      desc: '신문 기사, 독자 편지, 전기, 생활 안내문에서 정보와 의견을 구분해 읽어요.' },
    { code: 'B2', de: 'Selbständige Sprachverwendung', ko: '관점과 논리 읽기', step: 4, words: '380–500',
      desc: '보도 기사, 서평, 논증문, 단편소설에서 관점과 논리의 흐름을 따라 읽어요.' },
    { code: 'C1', de: 'Fachkundige Sprachkenntnisse', ko: '깊이 읽기', step: 5, words: '520–700',
      desc: '칼럼, 연설, 전문 기사, 에세이에서 글쓴이의 태도와 숨은 뜻까지 읽어요.' }
  ];
  var LEVEL_BY = {};
  LEVELS.forEach(function (l) { LEVEL_BY[l.code] = l; });
  var TABS = [
    { id: 'text', ko: '본문', de: 'Text' },
    { id: 'aufgaben', ko: '문제', de: 'Aufgaben' },
    { id: 'grammatik', ko: '문법', de: 'Grammatik' },
    { id: 'wortschatz', ko: '어휘', de: 'Wortschatz' }
  ];
  var KIND = { detail: '세부 내용', gist: '중심 내용', match: '연결하기', paraphrase: '바꿔 말하기',
    meaning: '표현의 의미', intent: '글쓴이의 의도', inference: '추론' };
  var FIXED = { rf: ['Richtig', 'Falsch'], rfn: ['Ja', 'Nein', 'Text sagt dazu nichts'] };
  var LETTERS = 'ABCDEFG';

  var INDEX = window.LESE_INDEX || {};
  var VERSION = window.LESE_VERSION || '1';
  var app = document.getElementById('app');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var state = {
    quiz: {},        // id -> {answers:{}, graded:false}
    showKo: {},      // id -> bool
    openKo: {},      // id -> {paraIndex:true}
    hideVocab: false,
    peek: {},
    scroll: {},
    current: null,   // current text object
    route: null
  };

  /* ───────── 유틸 ───────── */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, val);
    } catch (e) { return null; }
    return null;
  }
  /* ───────── 진행률 (완료 = 채점한 텍스트) ───────── */
  var DONE_KEY = 'soda-lese-done';
  function doneMap() {
    try { return JSON.parse(store(DONE_KEY) || '{}') || {}; } catch (e) { return {}; }
  }
  function markDone(t, right, total) {
    var m = doneMap(), old = m[t.id];
    if (!old || right >= old.r) m[t.id] = { r: right, n: total };
    store(DONE_KEY, JSON.stringify(m));
  }
  /* ───────── 학습 기록 (채점할 때마다 쌓임) · 결과 내보내기 ───────── */
  var LOG_KEY = 'soda-lese-log', NAME_KEY = 'soda-lese-name', SENT_KEY = 'soda-lese-sent', memLog = null;
  /* 제출 주소: Modelltest 「선생님께 제출하기」와 같은 Google Apps Script 웹 앱 (SODA-Goethe tools/제출 받기) */
  var SUBMIT_URL = 'https://script.google.com/macros/s/AKfycbxMAWjrhVgLqgKBYa3tZBIxbfnQ7Y1DYzmKO9fOonJbSdHE6_g1TDEXeykziZo1ujTt7g/exec';
  function readLog() {
    if (memLog) return memLog.slice();
    try { var a = JSON.parse(store(LOG_KEY) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; }
  }
  function addLog(rec) {
    var a = readLog();
    a.unshift(rec);
    if (a.length > 1000) a.length = 1000;
    try { localStorage.setItem(LOG_KEY, JSON.stringify(a)); memLog = null; } catch (e) { memLog = a; }
  }
  function metaById() {
    var m = {};
    LEVELS.forEach(function (l) {
      (INDEX[l.code] || []).forEach(function (x) { m[x.id] = { level: l.code, no: x.no, title: x.title, titleKo: x.titleKo }; });
    });
    return m;
  }
  function exportSummary() {
    var dm = doneMap(), meta = metaById(), byLevel = {}, r = 0, n = 0, done = 0, total = 0;
    LEVELS.forEach(function (l) {
      var c = { done: 0, total: (INDEX[l.code] || []).length };
      (INDEX[l.code] || []).forEach(function (x) { if (dm[x.id]) c.done++; });
      byLevel[l.code] = c; done += c.done; total += c.total;
    });
    var results = Object.keys(dm).map(function (id) {
      var x = meta[id] || {}, d = dm[id];
      r += d.r; n += d.n;
      return { id: id, level: x.level || '', no: x.no || '', title: x.title || '', best: d.r + '/' + d.n };
    }).sort(function (a, b) { return (a.level + pad(+a.no || 0)).localeCompare(b.level + pad(+b.no || 0)); });
    return { done: done, total: total, byLevel: byLevel, rate: n ? Math.round(r * 100 / n) : 0, results: results };
  }
  function exportText() {
    var sm = exportSummary();
    return JSON.stringify({
      app: 'lesetraining', format: 1, title: 'SODA LESETRAINING',
      student: store(NAME_KEY) || '', exportedAt: new Date().toISOString(),
      summary: { done: sm.done, total: sm.total, bestRate: sm.rate, byLevel: sm.byLevel },
      results: sm.results, records: readLog()
    });
  }
  function dstr(t) {
    var d = new Date(t);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }
  function mailBody(nm, now) {
    var sm = exportSummary(), log = readLog(), last = +(store(SENT_KEY) || 0), nw = 0;
    log.forEach(function (r) { if (Date.parse(r.ts) > last) nw++; });
    var o = [
      '학생: ' + nm,
      '앱: SODA-Lehrwerk Lesetraining (독해 훈련)',
      '보낸 시각: ' + dstr(now),
      '완료한 텍스트: ' + sm.done + ' / ' + sm.total + ' · 채점 ' + log.length + '회' + (last ? ' · 지난번(' + dstr(last) + ') 이후 새 채점 ' + nw + '회' : ''),
      '최고 점수 기준 정답률: ' + sm.rate + '%',
      '레벨별 완료: ' + LEVELS.map(function (l) { var c = sm.byLevel[l.code]; return l.code + ' ' + c.done + '/' + c.total; }).join(' · '),
      '', '==== 채점 기록 (최근 순) ===='
    ];
    if (!log.length) o.push('', '(문항별 채점 기록 없음 — 아래 텍스트별 최고 점수만 있습니다)');
    log.forEach(function (r, i) {
      var t = Date.parse(r.ts);
      o.push('', (i + 1) + '. ' + (last && t > last ? '[새 기록] ' : '') + (t ? dstr(t) : '') + ' · ' + r.level + ' ' + pad(+r.no || 0) + ' ' + r.title + ' — ' + r.right + '/' + r.total);
      (r.wrong || []).forEach(function (w) {
        o.push('   ' + w.n + '번 (' + w.kind + ') ' + (w.picked == null ? '답 안 고름' : '고른 답: ' + w.picked) + ' → 정답: ' + w.answer);
      });
    });
    o.push('', '==== 텍스트별 최고 점수 ====');
    if (!sm.results.length) o.push('(없음)');
    sm.results.forEach(function (x) { o.push(x.level + ' ' + pad(+x.no || 0) + ' ' + x.title + ' — ' + x.best); });
    var b = o.join('\n');
    return b.length > 140000 ? b.slice(0, 140000) + '\n…(이하 생략)' : b;
  }
  function sendMail() {
    var nm = String(store(NAME_KEY) || '').replace(/\s+/g, ' ').trim(), bt = document.querySelector('#xp [data-act="xpmail"]');
    if (!nm) {
      xpMsg('이름을 입력하세요.', 'no');
      var f = document.querySelector('#xp [data-xp-name]');
      if (f) f.focus();
      return;
    }
    var done = false, now = Date.now();
    var tm = setTimeout(function () { fail('응답이 없어요. 인터넷 연결을 확인하고 다시 눌러 주세요.'); }, 60000);
    function fail(m) {
      if (done) return;
      done = true; clearTimeout(tm);
      if (bt) bt.disabled = false;
      xpMsg(m + ' 계속 안 되면 「파일로 저장」으로 받은 파일을 선생님께 보내 주세요.', 'no');
    }
    if (bt) bt.disabled = true;
    xpMsg('보내고 있어요…', '');
    var pl = { v: 1, kind: 'modelltest', app: 'lehrwerk', appName: 'Lesetraining', exam: 'Lehrwerk Lesetraining', mt: '기록',
      module: '학습 결과', name: nm, finished: dstr(now), used: '-', byTime: false, body: mailBody(nm, now), speaking: null,
      count: readLog().length, data: exportText(), page: location.href.split('#')[0] };
    try {
      fetch(SUBMIT_URL, { method: 'POST', body: JSON.stringify(pl) }).then(function (r) { return r.json(); }).then(function (j) {
        if (done) return;
        if (!j || !j.ok) { fail((j && j.message) || '보내지 못했어요.'); return; }
        done = true; clearTimeout(tm);
        if (bt) bt.disabled = false;
        store(SENT_KEY, String(now));
        xpMsg(dstr(now) + ' 선생님께 메일로 보냈어요.', 'ok');
      }, function () { fail('서버에 연결하지 못했어요.'); });
    } catch (e) { fail('이 브라우저에서는 보낼 수 없어요.'); }
  }
  function today() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function openExport() {
    closeExport();
    var sm = exportSummary(), log = readLog(), has = sm.done > 0 || log.length > 0;
    var lv = LEVELS.map(function (l) {
      var c = sm.byLevel[l.code];
      return '<li><b>' + l.code + '</b><span>' + c.done + ' / ' + c.total + '</span></li>';
    }).join('');
    var box = document.createElement('div');
    box.className = 'xp';
    box.id = 'xp';
    box.innerHTML = '<div class="xp-in" role="dialog" aria-modal="true" aria-labelledby="xp-t">' +
      '<h2 id="xp-t">선생님께 결과 보내기</h2>' +
      (has ? '<p class="xp-sum">완료한 텍스트 <b>' + sm.done + '</b>개 · 채점 <b>' + log.length + '</b>회 · 최고 점수 기준 정답률 <b>' + sm.rate + '%</b></p>' +
        '<ul class="xp-lv">' + lv + '</ul>' :
        '<p class="xp-sum">아직 채점한 텍스트가 없어요. 문제를 풀고 채점하면 결과가 쌓여요.</p>') +
      '<label class="xp-name"><span>이름</span><input type="text" data-xp-name placeholder="이름" autocomplete="name" value="' + esc(store(NAME_KEY) || '') + '"></label>' +
      '<button class="btn pri xp-mail" data-act="xpmail"' + (has ? '' : ' disabled') + '>' + ICON.mail + '메일로 보내기</button>' +
      '<p class="xp-msg" aria-live="polite">' + (store(SENT_KEY) ? '마지막으로 보낸 시각: ' + dstr(+store(SENT_KEY)) : '메일 보내기는 소피아 독일어학원 수강생 전용이에요.') + '</p>' +
      '<div class="xp-b"><button class="btn sec" data-act="xpcopy"' + (has ? '' : ' disabled') + '>결과 복사</button>' +
      '<button class="btn sec" data-act="xpfile"' + (has ? '' : ' disabled') + '>파일로 저장</button></div>' +
      '<textarea class="xp-ta" data-xp-text readonly hidden aria-label="결과 내용"></textarea>' +
      '<p class="xp-note">「메일로 보내기」를 누르면 이 기기에 쌓인 결과 전체가 선생님 메일로 바로 가요. 메일이 안 될 때는 결과를 복사해 메신저로 보내거나 저장한 파일을 보내세요.</p>' +
      '<button class="xp-x" data-act="xpclose" aria-label="닫기">닫기</button></div>';
    document.body.appendChild(box);
    xpFrom = document.activeElement;
    var f = box.querySelector('[data-xp-name]');
    if (f) try { f.focus({ preventScroll: true }); } catch (e) { f.focus(); }
  }
  var xpFrom = null;
  function closeExport() {
    var b = document.getElementById('xp');
    if (!b) return;
    b.parentNode.removeChild(b);
    if (xpFrom && xpFrom.focus && document.body.contains(xpFrom)) xpFrom.focus();
    xpFrom = null;
  }
  function xpMsg(t, c) {
    var m = document.querySelector('#xp .xp-msg');
    if (!m) return;
    m.textContent = t;
    m.className = 'xp-msg' + (c ? ' ' + c : '');
  }
  function xpShow(txt) {
    var ta = document.querySelector('#xp [data-xp-text]');
    if (!ta) return;
    ta.hidden = false; ta.value = txt; ta.focus(); ta.select();
  }
  function exportCopy() {
    var txt = exportText(), done = function () { xpMsg('결과를 복사했어요. 메신저에 붙여 넣어 보내세요.', 'ok'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done, function () { xpShow(txt); xpMsg('아래 내용을 길게 눌러 복사하세요.'); });
    } else {
      xpShow(txt);
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      if (ok) done(); else xpMsg('아래 내용을 길게 눌러 복사하세요.');
    }
  }
  function exportFile() {
    var txt = exportText();
    try {
      var b = new Blob([txt], { type: 'application/json' }), u = URL.createObjectURL(b), a = document.createElement('a');
      a.href = u;
      a.download = (store(NAME_KEY) || 'student').replace(/[\\/:*?"<>|_]+/g, ' ').trim() + ' Lesetraining ' + today() + '.json';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(u); }, 4000);
      xpMsg('파일을 저장했어요. 이 파일을 선생님께 보내세요.', 'ok');
    } catch (e) { xpShow(txt); xpMsg('파일 저장이 막혀 있어요. 아래 내용을 복사하세요.'); }
  }
  function exportBtn(label) {
    return '<div class="actions xp-open"><button class="btn sec" data-act="export">' + ICON.out + esc(label) + '</button></div>';
  }

  function progressFor(lv) {
    var m = doneMap(), total = 0, done = 0;
    (lv ? [lv] : LEVELS.map(function (l) { return l.code; })).forEach(function (code) {
      (INDEX[code] || []).forEach(function (x) { total++; if (m[x.id]) done++; });
    });
    return { done: done, total: total, pct: total ? Math.round(done * 100 / total) : 0 };
  }
  function updateProgress() {
    var bar = document.getElementById('lprog');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'lprog';
      bar.className = 'lprog';
      bar.setAttribute('role', 'region');
      bar.setAttribute('aria-label', '나의 진행률');
      bar.innerHTML = '<div class="lprog-in"><span class="lprog-l"></span>' +
        '<span class="lprog-track" role="progressbar" aria-valuemin="0" aria-valuemax="100"><i></i></span>' +
        '<span class="lprog-n"></span></div>';
      document.body.insertBefore(bar, document.body.firstChild);
    }
    var r = state.route || { v: 'cover' };
    document.documentElement.classList.toggle('has-prog', r.v !== 'cover');
    var lv = r.lv || null, p = progressFor(lv);
    bar.querySelector('.lprog-l').innerHTML = '나의 진행률' + (lv ? ' <b>' + lv + '</b>' : ' <b>전체</b>');
    var tr = bar.querySelector('.lprog-track');
    tr.setAttribute('aria-valuenow', String(p.pct));
    tr.querySelector('i').style.width = p.pct + '%';
    bar.querySelector('.lprog-n').innerHTML = '<b>' + p.done + '</b> / ' + p.total + ' · ' + p.pct + '%';
  }

  function markText(text, needles, cls) {
    var ranges = [];
    (needles || []).forEach(function (n) {
      if (!n) return;
      var from = 0, idx;
      while ((idx = text.indexOf(n, from)) >= 0) {
        var overlap = ranges.some(function (r) { return idx < r[1] && idx + n.length > r[0]; });
        if (!overlap) { ranges.push([idx, idx + n.length]); break; }
        from = idx + 1;
      }
    });
    ranges.sort(function (a, b) { return a[0] - b[0]; });
    var out = '', pos = 0;
    ranges.forEach(function (r) {
      out += esc(text.slice(pos, r[0])) + '<mark' + (cls ? ' class="' + cls + '"' : '') + '>' +
        esc(text.slice(r[0], r[1])) + '</mark>';
      pos = r[1];
    });
    return out + esc(text.slice(pos));
  }
  function paras(text) {
    return String(text || '').split(/\n+/).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
  }
  var ICON = {
    left: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3 5 8l5 5"/></svg>',
    right: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5"/></svg>',
    print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 9V3.5h10V9"/><rect x="3.5" y="9" width="17" height="8" rx="2"/><path d="M7 14h10v6.5H7z"/></svg>',
    ok: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="m6.5 10.2 2.4 2.3 4.6-5"/></svg>',
    no: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="m7.2 7.2 5.6 5.6M12.8 7.2l-5.6 5.6"/></svg>',
    doc: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 2.5h7l3.5 3.5v11.5H5z"/><path d="M12 2.5V6h3.5M7.5 10h5M7.5 13h5"/></svg>',
    q: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M7.8 7.8a2.3 2.3 0 1 1 3.2 2.1c-.6.3-1 .8-1 1.4v.5M10 14.3v.2"/></svg>',
    book: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 5C8.3 4 6.2 3.7 4 4v11c2.2-.3 4.3 0 6 1 1.7-1 3.8-1.3 6-1V4c-2.2-.3-4.3 0-6 1zM10 5v11"/></svg>',
    arrowR: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
    mail: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="11" rx="2"/><path d="m3 5.5 7 5.5 7-5.5"/></svg>',
    out: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 12.5V3M6.5 6.5 10 3l3.5 3.5"/><path d="M4 11v4.5c0 .8.7 1.5 1.5 1.5h9c.8 0 1.5-.7 1.5-1.5V11"/></svg>'
  };
  function brandTop(backHref, backLabel) {
    return '<div class="top"><a class="top-brand" href="#/levels" aria-label="레벨 선택으로">' +
      '<img src="assets/logo.png" alt=""><div><b>SODA LESETRAINING</b><span>Sophia Deutsch Akademie</span></div></a>' +
      '<a class="pill" href="' + backHref + '">' + ICON.left + esc(backLabel) + '</a></div>';
  }

  /* ───────── 데이터 ───────── */
  var loading = {};
  function loadLevel(lv) {
    var D = window.LESE_DATA;
    if (D && D[lv]) return Promise.resolve(D[lv]);
    if (loading[lv]) return loading[lv];
    loading[lv] = new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = 'data/' + lv.toLowerCase() + '.js?v=' + encodeURIComponent(VERSION);
      s.onload = function () {
        var D2 = window.LESE_DATA;
        if (D2 && D2[lv]) res(D2[lv]); else rej(new Error('no data'));
      };
      s.onerror = function () { delete loading[lv]; rej(new Error('load failed')); };
      document.head.appendChild(s);
    });
    return loading[lv];
  }

  /* ───────── 라우팅 ───────── */
  function parse() {
    var p = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    if (!p.length) return { v: 'cover' };
    if (p[0] === 'levels') return { v: 'levels' };
    var lv = p[0].toUpperCase();
    if (!LEVEL_BY[lv]) return { v: 'cover' };
    if (p.length === 1) return { v: 'list', lv: lv };
    var tab = 'text';
    TABS.forEach(function (t) { if (t.id === p[2]) tab = t.id; });
    return { v: 'reader', lv: lv, no: p[1], tab: tab };
  }
  function routeKey(r) { return r.v + (r.lv || '') + (r.no || ''); }

  function route() {
    var r = parse();
    var prev = state.route;
    if (prev) state.scroll[routeKey(prev)] = window.scrollY;
    if (prev && r.v === 'reader' && prev.v === 'reader' && prev.lv === r.lv && prev.no === r.no) {
      if (prev.tab !== r.tab) selectTab(r.tab, true);
      state.route = r;
      return;
    }
    state.route = r;
    updateProgress();
    if (r.v === 'cover') renderCover();
    else if (r.v === 'levels') renderLevels();
    else if (r.v === 'list') renderList(r.lv);
    else renderReader(r);
  }
  function settle(r) {
    var y = state.scroll[routeKey(r)];
    window.scrollTo(0, (r.v === 'list' || r.v === 'levels') && y ? y : 0);
    var m = document.getElementById('main');
    if (m && !firstRender) {
      try { m.focus({ preventScroll: true }); } catch (e) { m.focus(); }
    }
    firstRender = false;
  }
  var firstRender = true;

  /* ───────── 표지 ───────── */
  function renderCover() {
    var total = 0;
    LEVELS.forEach(function (l) { total += (INDEX[l.code] || []).length; });
    document.title = '독일어 독해 훈련 · A1–C1 텍스트 100개 | SODA Lesetraining';
    app.innerHTML =
      '<main id="main" class="cover view" tabindex="-1" aria-labelledby="cover-title">' +
      '<header class="brand"><img src="assets/logo.png" alt="Sophia Deutsch Akademie 로고">' +
      '<div class="brand-t"><b>Sophia Deutsch Akademie</b><span>소피아 독일어학원</span></div></header>' +
      '<div class="hero"><h1 class="title" id="cover-title"><span class="t1">SODA</span><span class="t2">LESETRAINING</span></h1>' +
      '<a class="cta" href="#/levels">레벨 선택하기' + ICON.right + '</a></div>' +
      '<footer class="cover-foot"><span>Innovative Learning Beyond the Traditional</span>' +
      '<span>A1 – C1' + (total ? ' · ' + total + ' Texte' : '') + '</span></footer></main>';
    settle(state.route);
  }

  /* ───────── 레벨 선택 ───────── */
  function renderLevels() {
    document.title = '레벨 선택 · SODA LESETRAINING';
    var cards = LEVELS.map(function (l, i) {
      var n = (INDEX[l.code] || []).length;
      return '<li><a class="lv" href="#/' + l.code.toLowerCase() + '" style="--i:' + i + '">' +
        '<span class="lv-code">' + l.code + '</span>' +
        '<div><div class="lv-de" lang="de">' + esc(l.de) + '</div><div class="lv-ko">' + esc(l.ko) + '</div>' +
        '<p class="lv-desc">' + esc(l.desc) + '</p></div>' +
        '<div class="lv-side">' +
        (progressFor(l.code).done ? '<span class="lv-done">완료 ' + progressFor(l.code).done + '개</span>' : '') +
        '<span class="arrow">' + ICON.arrowR + '</span></div></a></li>';
    }).join('');
    app.innerHTML = '<main id="main" class="page view" tabindex="-1">' + brandTop('#/', '표지') +
      '<div class="sec-h"><span class="kicker">STUFE</span><h1>레벨 선택</h1>' +
      '<p>텍스트마다 독해 문제, 주요 문법, 단어와 숙어를 함께 공부해요.</p></div>' +
      '<ul class="levels">' + cards + '</ul>' + exportBtn('학습 결과 내보내기') + '</main>';
    settle(state.route);
  }

  /* ───────── 텍스트 목록 ───────── */
  function renderList(lv) {
    var L = LEVEL_BY[lv];
    var items = INDEX[lv] || [];
    document.title = lv + ' · SODA LESETRAINING';
    var dm = doneMap();
    var cards = items.map(function (t, i) {
      var tags = (t.focus || []).slice(0, 3).map(function (f) { return '<span class="tag">' + esc(f) + '</span>'; }).join('');
      return '<li><a class="card" href="#/' + lv.toLowerCase() + '/' + pad(t.no) + '" style="--i:' + i + '">' +
        '<div class="card-top"><span class="num">' + pad(t.no) + '</span><span class="chip" title="' + esc(t.type) + '">' + esc(t.typeKo) + '</span></div>' +
        '<h2 class="card-de de" lang="de">' + esc(t.title) + '</h2>' +
        '<p class="card-ko">' + esc(t.titleKo) + '</p>' +
        '<div class="card-foot">' + tags + (dm[t.id] ? '<span class="meta done">' + ICON.ok + '완료 · ' + dm[t.id].r + '/' + dm[t.id].n + '</span>' : '') + '</div></a></li>';
    }).join('');
    app.innerHTML = '<main id="main" class="page view" tabindex="-1">' + brandTop('#/levels', '레벨') +
      '<div class="sec-h"><div class="lvhead"><span class="lv-code">' + lv + '</span>' +
      '<div><span class="kicker" lang="de">' + esc(L.de.toUpperCase()) + '</span><h1>' + esc(L.ko) + '</h1></div></div>' +
      '<p>' + esc(L.desc) + '</p></div>' +
      (items.length ? '<ul class="grid">' + cards + '</ul>' : '<p class="empty">아직 텍스트가 없어요.</p>') + exportBtn('학습 결과 내보내기') + '</main>';
    settle(state.route);
  }

  /* ───────── 읽기 화면 ───────── */
  function renderReader(r) {
    app.innerHTML = '<p class="loading">불러오는 중…</p>';
    loadLevel(r.lv).then(function (list) {
      var t = null;
      list.forEach(function (x) { if (pad(x.no) === r.no || String(x.no) === r.no) t = x; });
      if (!t) { location.replace('#/' + r.lv.toLowerCase()); return; }
      if (state.route !== r) return;
      state.current = t;
      buildReader(t, r.tab, list);
    }).catch(function () {
      app.innerHTML = '<main class="page"><p class="empty">텍스트를 불러오지 못했어요. 인터넷 연결을 확인한 뒤 새로고침해 주세요.</p></main>';
    });
  }

  function buildReader(t, tab, list) {
    var lv = t.level, lc = lv.toLowerCase();
    document.title = t.title + ' · ' + lv + ' · SODA LESETRAINING';
    var idx = list.indexOf(t);
    var prev = list[idx - 1], next = list[idx + 1];
    var html =
      '<header class="rd-top"><div class="rd-top-in">' +
      '<a class="pill" href="#/' + lc + '">' + ICON.left + lv + ' 목록</a>' +
      '<div class="rd-where">' + lv + ' · ' + pad(t.no) + '</div>' +
      '<div class="tools"><button class="ibtn" data-act="smaller" aria-label="글자 작게" title="글자 작게">가<small>−</small></button>' +
      '<button class="ibtn" data-act="bigger" aria-label="글자 크게" title="글자 크게">가<small>+</small></button>' +
      '<button class="ibtn" data-act="print" aria-label="인쇄" title="인쇄">' + ICON.print + '</button></div>' +
      '</div></header>' +
      '<main id="main" class="rd view" tabindex="-1">' +
      '<div class="rd-head"><div class="rd-type"><span class="chip" lang="de">' + esc(t.type) + '</span>' +
      '<span class="tag">' + esc(t.typeKo) + '</span></div>' +
      '<h1 class="rd-title" lang="de">' + esc(t.title) + '</h1>' +
      '<p class="rd-title-ko">' + esc(t.titleKo) + '</p>' +
      '</div>' +
      '<nav class="tabs" aria-label="학습 메뉴"><div class="tablist" role="tablist">' +
      TABS.map(function (x) {
        return '<button class="tab" role="tab" id="tab-' + x.id + '" aria-controls="panel-' + x.id + '" data-act="tab" data-tab="' + x.id + '">' +
          x.ko + '<small lang="de">' + x.de + '</small></button>';
      }).join('') + '</div></nav>' +
      '<section class="panel" role="tabpanel" id="panel-text" aria-labelledby="tab-text">' + textPanel(t) + '</section>' +
      '<section class="panel" role="tabpanel" id="panel-aufgaben" aria-labelledby="tab-aufgaben">' + quizPanel(t) + '</section>' +
      '<section class="panel" role="tabpanel" id="panel-grammatik" aria-labelledby="tab-grammatik">' + grammarPanel(t) + '</section>' +
      '<section class="panel" role="tabpanel" id="panel-wortschatz" aria-labelledby="tab-wortschatz">' + vocabPanel(t) + '</section>' +
      '<nav class="pager" aria-label="다른 텍스트">' +
      (prev ? '<a class="pg prev" href="#/' + lc + '/' + pad(prev.no) + '"><small>← 이전 텍스트</small><b lang="de">' + esc(prev.title) + '</b></a>' : '') +
      (next ? '<a class="pg next" href="#/' + lc + '/' + pad(next.no) + '"><small>다음 텍스트 →</small><b lang="de">' + esc(next.title) + '</b></a>' : '') +
      '</nav></main>';
    app.innerHTML = html;
    selectTab(tab, false);
    if (state.quiz[t.id] && state.quiz[t.id].graded) showGrades(t, false);
    settle(state.route);
  }

  function selectTab(id, scroll) {
    TABS.forEach(function (x) {
      var b = document.getElementById('tab-' + x.id), p = document.getElementById('panel-' + x.id);
      if (!b || !p) return;
      var on = x.id === id;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
      p.hidden = !on;
    });
    if (scroll) {
      var tabs = document.querySelector('.tabs');
      if (tabs) {
        var top = tabs.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--top-h'), 10) || 60);
        if (window.scrollY > top) window.scrollTo(0, top);
      }
    }
  }
  function setTab(id) {
    var r = state.route;
    if (!r || r.v !== 'reader') return;
    var hash = '#/' + r.lv.toLowerCase() + '/' + r.no + (id === 'text' ? '' : '/' + id);
    if (history.replaceState) history.replaceState(null, '', hash);
    state.route = { v: 'reader', lv: r.lv, no: r.no, tab: id };
    selectTab(id, true);
  }

  /* 본문 */
  function isChat(t) { return /chat/i.test(t.type) || /채팅/.test(t.typeKo); }
  function paraHtml(t, p, i, num, evText) {
    var open = state.showKo[t.id] || (state.openKo[t.id] && state.openKo[t.id][i]);
    var cls = 'para' + (p.style ? ' ' + p.style : '') + (open ? ' open' : '');
    var de = evText ? markText(p.de, [evText], 'ev') : esc(p.de);
    return '<div class="' + cls + '" data-i="' + i + '" id="p-' + i + '">' +
      (p.label ? '<span class="plabel">' + esc(p.label) + '</span>' : '') +
      '<p class="pde">' + (num ? '<span class="pno" aria-hidden="true">' + num + '</span>' : '') + de + '</p>' +
      '<button class="pbtn" data-act="ko" data-i="' + i + '" aria-expanded="' + (open ? 'true' : 'false') + '">해석</button>' +
      '<p class="pko" lang="ko">' + esc(p.ko) + '</p></div>';
  }
  function textPanel(t) {
    var n = 0;
    var body = t.paragraphs.map(function (p, i) {
      var num = (p.style === 'h' || p.style === 'meta') ? 0 : ++n;
      return paraHtml(t, p, i, num);
    }).join('');
    var on = !!state.showKo[t.id];
    return '<h2 class="print-h">TEXT · 본문</h2>' +
      (t.intro ? '<p class="intro"><b>글 소개</b>' + esc(t.intro) + '</p>' : '') +
      '<div class="bar"><p class="hint">단락 아래 ‘해석’을 누르면 한국어 해석이 보여요.</p>' +
      '<button class="toggle" data-act="allko" aria-pressed="' + on + '"><span class="dot"></span>해석 모두 보기</button></div>' +
      '<article class="text' + (isChat(t) ? ' chat' : '') + (on ? ' show-ko' : '') + '" lang="de" id="textbox">' + body + '</article>';
  }
  function paraNumbers(t) {
    var n = 0, map = {};
    t.paragraphs.forEach(function (p, i) { map[i] = (p.style === 'h' || p.style === 'meta') ? 0 : ++n; });
    return map;
  }
  function highlightEvidence(t, ev) {
    var box = document.getElementById('textbox');
    if (!box) return;
    var nums = paraNumbers(t);
    var target = null;
    t.paragraphs.forEach(function (p, i) {
      var el = document.getElementById('p-' + i);
      if (!el) return;
      var has = ev && p.de.indexOf(ev) >= 0 && !target;
      var pde = el.querySelector('.pde');
      var pn = pde.querySelector('.pno');
      pde.innerHTML = (pn ? pn.outerHTML : '') + (has ? markText(p.de, [ev], 'ev') : esc(p.de));
      if (has) target = el;
    });
    if (target) {
      var m = target.querySelector('mark') || target;
      setTimeout(function () { m.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); }, 30);
    }
    return nums;
  }

  /* 문제 */
  function optionLabels(q) { return q.type === 'mc' ? q.options : FIXED[q.type]; }
  function quizPanel(t) {
    var types = {};
    t.questions.forEach(function (q) { types[q.kind === 'match' ? 'match' : q.type] = true; });
    var hints = [];
    if (types.rf) hints.push('<b>Richtig/Falsch</b> 본문 내용과 같으면 Richtig, 다르면 Falsch를 고르세요.');
    if (types.rfn) hints.push('<b>Ja/Nein</b> 본문 내용과 같으면 Ja, 다르면 Nein, 본문으로 알 수 없으면 ‘Text sagt dazu nichts’를 고르세요.');
    if (types.mc) hints.push('<b>선택형</b> 알맞은 답을 하나 고르세요.');
    if (types.match) hints.push('<b>연결하기</b> 문장의 내용에 해당하는 사람이나 글을 고르세요.');
    hints.push('문제는 본문의 표현을 그대로 쓰지 않고 바꿔 말한 경우가 많아요. 단어가 같은지보다 뜻이 같은지 확인하세요.');
    var qs = t.questions.map(function (q, i) {
      var labels = optionLabels(q);
      var row = q.type !== 'mc' || q.kind === 'match';
      var opts = labels.map(function (o, k) {
        return '<button class="opt" data-act="pick" data-q="' + i + '" data-o="' + k + '" aria-pressed="false"' + (q.type === 'mc' && q.kind !== 'match' ? '' : ' lang="de"') + '>' +
          (row ? '' : '<span class="k">' + LETTERS[k] + '</span>') + '<span lang="de">' + esc(o) + '</span></button>';
      }).join('');
      return '<li class="q" id="q-' + i + '"><div class="q-h"><span class="q-no">' + (i + 1) + '</span>' +
        '<span class="q-kind">' + esc(KIND[q.kind] || KIND.detail) + '</span></div>' +
        '<p class="q-t" lang="de">' + esc(q.q) + '</p>' +
        '<div class="opts' + (row ? ' row' : '') + '" role="group" aria-label="' + (i + 1) + '번 보기">' + opts + '</div>' +
        '<div class="fb" hidden></div></li>';
    }).join('');
    return '<h2 class="print-h">AUFGABEN · 문제</h2>' +
      '<div class="bar"><p class="hint">' + hints.join('<br>') + '</p></div>' +
      '<div class="score" id="score" hidden></div>' +
      '<ol class="qs" style="list-style:none">' + qs + '</ol>' +
      '<p class="notice" id="notice" hidden></p>' +
      '<div class="actions"><button class="btn pri" data-act="grade">채점하기</button>' +
      '<button class="btn sec" data-act="reset" hidden>다시 풀기</button>' +
      '<button class="btn sec" data-act="export" hidden>' + ICON.out + '결과 내보내기</button></div>';
  }
  function quizState(t) {
    if (!state.quiz[t.id]) state.quiz[t.id] = { answers: {}, graded: false };
    return state.quiz[t.id];
  }
  function restorePicks(t) {
    var st = quizState(t);
    t.questions.forEach(function (q, i) {
      var li = document.getElementById('q-' + i);
      if (!li) return;
      li.querySelectorAll('.opt').forEach(function (b) {
        b.setAttribute('aria-pressed', String(st.answers[i]) === b.getAttribute('data-o') ? 'true' : 'false');
      });
    });
  }
  function answerLabel(q, k) {
    var labels = optionLabels(q);
    if (q.type === 'mc' && q.kind !== 'match') return LETTERS[k] + ' · ' + labels[k];
    return labels[k];
  }
  function showGrades(t, scrollTo) {
    var st = quizState(t);
    st.graded = true;
    restorePicks(t);
    var right = 0;
    t.questions.forEach(function (q, i) {
      var li = document.getElementById('q-' + i);
      if (!li) return;
      var a = st.answers[i];
      var ok = a === q.answer;
      if (ok) right++;
      li.querySelector('.opts').parentNode.classList.add('graded');
      li.querySelectorAll('.opt').forEach(function (b) {
        var k = +b.getAttribute('data-o');
        b.classList.toggle('is-ok', k === q.answer);
        b.classList.toggle('is-no', k === a && !ok);
        b.setAttribute('aria-disabled', 'true');
      });
      var res = ok ? '<div class="fb-res ok">' + ICON.ok + '정답이에요</div>' :
        '<div class="fb-res no">' + ICON.no + (a === undefined ? '답을 고르지 않았어요' : '오답이에요') +
        ' · 정답: <span lang="de">' + esc(answerLabel(q, q.answer)) + '</span></div>';
      var ev = q.evidence ?
        '<span class="fb-l">근거 · Textstelle</span><p class="fb-ev" lang="de">' + esc(q.evidence) + '</p>' +
        '<button class="linkbtn" data-act="goto" data-q="' + i + '">본문에서 보기' + ICON.arrowR + '</button>' :
        '<span class="fb-l">근거 · Textstelle</span><p>본문에는 이 내용에 대한 정보가 없어요.</p>';
      var pairs = (q.pairs && q.pairs.length) ?
        '<span class="fb-l">바꿔 말하기 · Paraphrase</span><div class="pairs-h"><span>본문 표현</span><span>→</span><span>문제 표현</span></div><ul class="pairs">' +
        q.pairs.map(function (p) {
          return '<li><span class="pa" lang="de">' + esc(p[0]) + '</span><span class="to" aria-hidden="true">→</span><span class="pb" lang="de">' + esc(p[1]) + '</span></li>';
        }).join('') + '</ul>' : '';
      var fb = li.querySelector('.fb');
      fb.innerHTML = res + ev + pairs + '<span class="fb-l">해설</span>' + paras(q.explain);
      fb.hidden = false;
    });
    var total = t.questions.length;
    markDone(t, right, total);
    if (scrollTo) {
      var rt = state.route || {}, wrong = [];
      t.questions.forEach(function (q, i) {
        var a = st.answers[i];
        if (a !== q.answer) wrong.push({ n: i + 1, kind: KIND[q.kind] || KIND.detail,
          picked: a === undefined ? null : answerLabel(q, a), answer: answerLabel(q, q.answer) });
      });
      addLog({ id: t.id, level: rt.lv || '', no: t.no || rt.no || '', title: t.title, ts: new Date().toISOString(),
        right: right, total: total, wrong: wrong });
    }
    updateProgress();
    var sc = document.getElementById('score');
    if (sc) {
      sc.innerHTML = '<div><b>' + right + ' / ' + total + '</b></div><span>' + total + '문항 중 ' + right + '문항을 맞혔어요. 틀린 문제는 근거 문장과 바꿔 말한 표현을 비교해 보세요.</span>';
      sc.hidden = false;
    }
    var grade = document.querySelector('[data-act="grade"]'), reset = document.querySelector('[data-act="reset"]');
    if (grade) grade.hidden = true;
    if (reset) reset.hidden = false;
    var xb = document.querySelector('#panel-aufgaben [data-act="export"]');
    if (xb) xb.hidden = false;
    var notice = document.getElementById('notice');
    if (notice) notice.hidden = true;
    if (scrollTo && sc) sc.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  }
  function resetQuiz(t) {
    state.quiz[t.id] = { answers: {}, graded: false };
    var panel = document.getElementById('panel-aufgaben');
    if (panel) panel.innerHTML = quizPanel(t);
    var q0 = document.getElementById('q-0');
    if (q0) q0.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  }

  /* 문법 */
  function roleClass(r) {
    if (r === '주어') return 'r-subj';
    if (r.indexOf('동사') === 0) return 'r-verb';
    if (/목적어|재귀대명사/.test(r)) return 'r-obj';
    if (r === '보어') return 'r-comp';
    if (r.indexOf('부사어') === 0) return 'r-adv';
    if (/접속사|접속부사|의문사|관계대명사/.test(r)) return 'r-conj';
    if (/종속절|관계절|부정사구/.test(r)) return 'r-clause';
    if (r === '부정어') return 'r-neg';
    return 'r-other';
  }
  function grammarPanel(t) {
    var cards = t.grammar.map(function (g, i) {
      var exs = (g.examples || []).map(function (ex) {
        var parts = ex.parts && ex.parts.length ?
          '<div class="parts" aria-label="문장 성분">' + ex.parts.map(function (p) {
            return '<span class="pt ' + roleClass(p[1]) + '"><b lang="de">' + esc(p[0]) + '</b><small>' + esc(p[1]) + '</small></span>';
          }).join('') + '</div>' : '';
        return '<div class="ex"><p class="ex-de" lang="de">' + markText(ex.de, ex.mark) + '</p>' +
          '<p class="ex-ko">' + esc(ex.ko) + '</p>' + parts + '</div>';
      }).join('');
      return '<article class="g"><div class="g-h"><span class="g-no">' + (i + 1) + '</span><div>' +
        '<h3 class="g-title">' + esc(g.title) + '</h3><p class="g-term" lang="de">' + esc(g.term) + '</p></div></div>' +
        '<div class="g-ex">' + paras(g.explain) + '</div>' +
        (g.pattern ? '<div class="pattern">' + esc(g.pattern) + '</div>' : '') +
        '<div class="exs">' + exs + '</div>' +
        (g.tip ? '<div class="tip"><b>참고</b><div>' + paras(g.tip) + '</div></div>' : '') + '</article>';
    }).join('');
    return '<h2 class="print-h">GRAMMATIK · 문법</h2>' +
      '<div class="bar"><p class="hint">본문에 나온 문장으로 주요 문법을 정리했어요. 색 상자는 문장 성분이에요.</p></div>' +
      '<div class="gs">' + cards + '</div>';
  }

  /* 어휘 */
  function vocabPanel(t) {
    var on = state.hideVocab;
    var rows = t.vocab.map(function (v, i) {
      return '<li><button class="vrow" data-act="peek" data-k="v' + i + '"><span class="vde" lang="de">' + esc(v.de) +
        '</span><span class="vko">' + esc(v.ko) + '</span></button></li>';
    }).join('');
    var phs = t.phrases.map(function (p, i) {
      return '<div class="ph" data-act="peek" data-k="p' + i + '" tabindex="0" role="button">' +
        '<div class="ph-de" lang="de">' + esc(p.de) + '</div><span class="phko">' + esc(p.ko) + '</span>' +
        '<div class="ph-ex"><p class="de" lang="de">' + esc(p.ex) + '</p><p class="ko">' + esc(p.exko) + '</p></div></div>';
    }).join('');
    return '<h2 class="print-h">WORTSCHATZ · 어휘</h2>' +
      '<div class="bar"><p class="hint">‘뜻 가리기’를 켜면 뜻이 가려져요. 줄을 누르면 그 뜻만 보여요.</p>' +
      '<button class="toggle" data-act="hideko" aria-pressed="' + on + '"><span class="dot"></span>뜻 가리기</button></div>' +
      '<div id="vocabbox" class="' + (on ? 'hide-ko' : '') + '">' +
      '<section class="vsec"><h3>단어 <small lang="de">WÖRTER</small></h3><ul class="vlist">' + rows + '</ul></section>' +
      '<section class="vsec"><h3>숙어·표현 <small lang="de">AUSDRÜCKE</small></h3><div class="phs">' + phs + '</div></section></div>';
  }

  /* ───────── 이벤트 ───────── */
  function applyScale(s) {
    document.documentElement.style.setProperty('--scale', s);
  }
  var scale = parseFloat(store('soda-lese-scale')) || 1;
  if (scale < 0.85 || scale > 1.6) scale = 1;
  applyScale(scale);

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var act = el.getAttribute('data-act');
    var t = state.current;
    switch (act) {
      case 'tab':
        setTab(el.getAttribute('data-tab'));
        break;
      case 'smaller':
      case 'bigger':
        scale = Math.round((scale + (act === 'bigger' ? 0.1 : -0.1)) * 10) / 10;
        scale = Math.min(1.6, Math.max(0.7, scale));
        applyScale(scale);
        store('soda-lese-scale', String(scale));
        break;
      case 'print':
        window.print();
        break;
      case 'ko': {
        var i = +el.getAttribute('data-i');
        var m = state.openKo[t.id] = state.openKo[t.id] || {};
        m[i] = !m[i];
        var p = document.getElementById('p-' + i);
        if (p) { p.classList.toggle('open', m[i]); el.setAttribute('aria-expanded', m[i] ? 'true' : 'false'); }
        break;
      }
      case 'allko': {
        var on = !state.showKo[t.id];
        state.showKo[t.id] = on;
        el.setAttribute('aria-pressed', String(on));
        var box = document.getElementById('textbox');
        if (box) box.classList.toggle('show-ko', on);
        if (!on) {
          state.openKo[t.id] = {};
          document.querySelectorAll('#textbox .para.open').forEach(function (n) { n.classList.remove('open'); });
        }
        break;
      }
      case 'pick': {
        var st = quizState(t);
        if (st.graded) return;
        var qi = +el.getAttribute('data-q'), o = +el.getAttribute('data-o');
        st.answers[qi] = st.answers[qi] === o ? undefined : o;
        if (st.answers[qi] === undefined) delete st.answers[qi];
        restorePicks(t);
        break;
      }
      case 'grade': {
        var st2 = quizState(t);
        var missing = t.questions.length - Object.keys(st2.answers).length;
        var notice = document.getElementById('notice');
        if (missing > 0 && !el.getAttribute('data-confirm')) {
          notice.textContent = '아직 고르지 않은 문제가 ' + missing + '개 있어요. 그대로 채점하려면 한 번 더 누르세요.';
          notice.hidden = false;
          el.setAttribute('data-confirm', '1');
          return;
        }
        showGrades(t, true);
        break;
      }
      case 'reset':
        resetQuiz(t);
        break;
      case 'export':
        openExport();
        break;
      case 'xpclose':
        closeExport();
        break;
      case 'xpmail':
        sendMail();
        break;
      case 'xpcopy':
        exportCopy();
        break;
      case 'xpfile':
        exportFile();
        break;
      case 'goto': {
        var q = t.questions[+el.getAttribute('data-q')];
        setTab('text');
        highlightEvidence(t, q.evidence);
        break;
      }
      case 'hideko': {
        state.hideVocab = !state.hideVocab;
        el.setAttribute('aria-pressed', String(state.hideVocab));
        var vb = document.getElementById('vocabbox');
        if (vb) vb.classList.toggle('hide-ko', state.hideVocab);
        document.querySelectorAll('#vocabbox .peek').forEach(function (n) { n.classList.remove('peek'); });
        break;
      }
      case 'peek':
        if (state.hideVocab) el.classList.toggle('peek');
        break;
    }
  });
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'xp') closeExport();
  });
  document.addEventListener('input', function (e) {
    var el = e.target;
    if (el && el.hasAttribute && el.hasAttribute('data-xp-name')) store(NAME_KEY, el.value);
  });
  window.addEventListener('hashchange', closeExport);
  document.addEventListener('keydown', function (e) {
    var el = e.target;
    if (e.key === 'Escape' && document.getElementById('xp')) { closeExport(); return; }
    if ((e.key === 'Enter' || e.key === ' ') && el.classList && el.classList.contains('ph')) {
      e.preventDefault();
      el.click();
    }
    if (el.getAttribute && el.getAttribute('role') === 'tab' && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      var ids = TABS.map(function (x) { return x.id; });
      var cur = ids.indexOf(el.getAttribute('data-tab'));
      var nx = ids[(cur + (e.key === 'ArrowRight' ? 1 : ids.length - 1)) % ids.length];
      setTab(nx);
      var b = document.getElementById('tab-' + nx);
      if (b) b.focus();
    }
  });
  window.addEventListener('hashchange', route);
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  route();
})();
