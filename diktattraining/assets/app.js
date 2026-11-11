/* SODA DIKTATTRAINING · Sophia Deutsch Akademie
 *
 * 화면: 표지 → 레벨 선택 → 세트 목록 → 받아쓰기 → 세트 결과, 그리고 나의 기록 · 이렇게 공부하세요
 * 주소: #/  #/levels  #/a1  #/a1/03  #/a1/wieder(다시 쓸 문장)  #/a1/03/nochmal(틀린 문장만 다시)  #/record  #/guide
 *
 * 저장(localStorage 'soda-diktat-v1', 이 기기에만 저장)
 *   sets  { 'a1-03': { n 끝낸 횟수, ts 마지막으로 끝낸 때, a1 1차 정확도, a2 최종 정확도, best 가장 높은 1차 정확도 } }
 *   prog  { 'a1-03': 하던 연습 { ids, idx, res, secs, draft } }      세트를 끝내면 지워요. res 의 문장마다 { id, a1, a2, plays, errs, in1 1차에 쓴 글, tx 마지막에 쓴 글, rv 정답 보기를 눌렀으면 1 }
 *   rev   { 문장 id: { lv, ts } }                                    1차에서 틀린 문장. 한 번에 맞히면 빠져요
 *   hist  [ { ts, key, lv, n, a1, a2, hit, plays, secs, errs, wrong } ]   끝낸 연습 기록(최대 300개)
 * 세트 id와 문장 id는 바꾸지 않아요. 바꾸면 학생의 기록이 끊겨요.
 */
(function () {
  'use strict';

  var G = window.DiktatGrade;
  var DATA = window.DIKTAT_DATA || { topics: [], sets: [] };
  var AUDIO_V = '2';
  var LEVELS = [
    { code: 'A1', de: 'Anfänger', ko: '짧은 생활 문장', desc: '약속, 장보기, 길 묻기, 예약' },
    { code: 'A2', de: 'Grundlegende Kenntnisse', ko: '생활 속 대화', desc: '집 보기, 운동 등록, 이웃과의 대화' },
    { code: 'B1', de: 'Fortgeschrittene Sprachverwendung', ko: '이유와 의견이 들어간 문장', desc: '분실물 신고, 면접, 토론' },
    { code: 'B2', de: 'Selbständige Sprachverwendung', ko: '토론과 인터뷰의 문장', desc: '토론, 인터뷰, 직장 대화' },
    { code: 'C1', de: 'Fachkundige Sprachkenntnisse', ko: '대담과 강연의 문장', desc: '대담, 공개 토론, 고객 상담' }
  ];
  var LEVEL_BY = {}, BY_LEVEL = {}, BY_SET = {}, BY_SENT = {}, TOTAL = 0;
  LEVELS.forEach(function (l) { LEVEL_BY[l.code] = l; BY_LEVEL[l.code] = []; });
  DATA.sets.forEach(function (s) {
    if (!BY_LEVEL[s.lv]) return;
    BY_LEVEL[s.lv].push(s);
    BY_SET[s.id] = s;
    s.items.forEach(function (it) { it.lv = s.lv; BY_SENT[it.id] = it; TOTAL++; });
  });

  var app = document.getElementById('app');
  var state = { route: null, scroll: {} };
  var sess = null;                  // 지금 하는 연습
  var au = new Audio(), auNext = null;
  au.preload = 'auto';

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
      if (val === null) localStorage.removeItem(key); else localStorage.setItem(key, val);
    } catch (e) { return null; }
    return null;
  }
  function dstr(t) {
    var d = new Date(t);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }
  function mins(s) { return Math.max(1, Math.round(s / 60)) + '분'; }
  function avg(a) { return a.length ? Math.round(a.reduce(function (x, y) { return x + y; }, 0) / a.length) : 0; }
  function setCode(s) { return s.lv + ' ' + pad(s.no); }

  /* ───────── 저장 ───────── */
  var KEY = 'soda-diktat-v1', NAME_KEY = 'soda-diktat-name';
  /* 제출 주소: Modelltest 「선생님께 제출하기」, Lesetraining·Hörtraining·Schreibtraining과 같은 Google Apps Script 웹 앱 */
  var SUBMIT_URL = 'https://script.google.com/macros/s/AKfycbxMAWjrhVgLqgKBYa3tZBIxbfnQ7Y1DYzmKO9fOonJbSdHE6_g1TDEXeykziZo1ujTt7g/exec';
  var S = (function () {
    var v = null;
    try { v = JSON.parse(store(KEY) || 'null'); } catch (e) {}
    if (!v || typeof v !== 'object') v = {};
    v.v = 1;
    ['sets', 'prog', 'rev'].forEach(function (k) { if (!v[k] || typeof v[k] !== 'object') v[k] = {}; });
    if (!Array.isArray(v.hist)) v.hist = [];
    return v;
  })();
  var saveOk = true;
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); saveOk = true; } catch (e) { saveOk = false; }
  }
  function defaultName() {
    var keys = [NAME_KEY, 'soda-schreib-name', 'soda-lese-name', 'soda-hoer-name'];
    for (var i = 0; i < keys.length; i++) { var v = store(keys[i]); if (v) return v; }
    return '';
  }

  /* ───────── 진행률 ───────── */
  function progressFor(lv) {
    var list = lv ? (BY_LEVEL[lv] || []) : DATA.sets, done = 0;
    list.forEach(function (s) { if (S.sets[s.id]) done++; });
    return { done: done, total: list.length, pct: list.length ? Math.round(done * 100 / list.length) : 0 };
  }
  function revCount(lv) {
    var n = 0;
    Object.keys(S.rev).forEach(function (id) { if (BY_SENT[id] && (!lv || BY_SENT[id].lv === lv)) n++; });
    return n;
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
    bar.querySelector('.lprog-l').innerHTML = '끝낸 세트' + (lv ? ' <b>' + lv + '</b>' : ' <b>전체</b>');
    var tr = bar.querySelector('.lprog-track');
    tr.setAttribute('aria-valuenow', String(p.pct));
    tr.querySelector('i').style.width = p.pct + '%';
    bar.querySelector('.lprog-n').innerHTML = '<b>' + p.done + '</b> / ' + p.total + ' · ' + p.pct + '%';
  }

  var ICON = {
    left: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3 5 8l5 5"/></svg>',
    right: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5"/></svg>',
    arrowR: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
    ok: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="m6.5 10.2 2.4 2.3 4.6-5"/></svg>',
    no: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="m7.2 7.2 5.6 5.6M12.8 7.2l-5.6 5.6"/></svg>',
    mid: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="M6.5 10h7"/></svg>',
    mail: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="11" rx="2"/><path d="m3 5.5 7 5.5 7-5.5"/></svg>',
    info: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M10 9v5M10 6.2v.1"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.2v13.6a.8.8 0 0 0 1.2.7l11-6.8a.8.8 0 0 0 0-1.4l-11-6.8A.8.8 0 0 0 8 5.2z"/></svg>',
    stop: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',
    chart: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 16.5h13M6 13.5v-3M10 13.5v-7M14 13.5v-5"/></svg>',
    book: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H16v12H5.5A1.5 1.5 0 0 0 4 16.5z"/><path d="M4 16.5A1.5 1.5 0 0 0 5.5 18H16v-3"/></svg>',
    redo: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10a6 6 0 1 0 2-4.5"/><path d="M4 4v3.5h3.5"/></svg>'
  };
  function brandTop(backHref, backLabel) {
    return '<div class="top"><a class="top-brand" href="#/levels" aria-label="레벨 선택으로">' +
      '<img src="assets/logo.png" alt=""><div><b>SODA DIKTATTRAINING</b><span>Sophia Deutsch Akademie</span></div></a>' +
      '<a class="pill" href="' + backHref + '">' + ICON.left + esc(backLabel) + '</a></div>';
  }
  function links() {
    return '<div class="actions dk-links"><a class="btn sec" href="#/record">' + ICON.chart + '나의 기록</a>' +
      '<a class="btn sec" href="#/guide">' + ICON.book + '이렇게 공부하세요</a></div>';
  }

  /* ───────── 라우팅 ───────── */
  function parse() {
    var p = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    if (!p.length) return { v: 'cover' };
    if (p[0] === 'levels') return { v: 'levels' };
    if (p[0] === 'record') return { v: 'record' };
    if (p[0] === 'guide') return { v: 'guide' };
    var lv = p[0].toUpperCase();
    if (!LEVEL_BY[lv]) return { v: 'cover' };
    if (p.length === 1) return { v: 'list', lv: lv };
    if (p[1] === 'wieder') return { v: 'run', lv: lv, key: 'wieder-' + lv.toLowerCase(), kind: 'review' };
    var id = lv.toLowerCase() + '-' + p[1];
    if (!BY_SET[id]) return { v: 'list', lv: lv };
    if (p[2] === 'nochmal') return { v: 'run', lv: lv, key: 'nochmal-' + id, kind: 'retry', set: id };
    return { v: 'run', lv: lv, key: id, kind: 'set', set: id };
  }
  function routeKey(r) { return r.v + (r.lv || '') + (r.key || ''); }
  function route() {
    var r = parse(), prev = state.route;
    if (prev) state.scroll[routeKey(prev)] = window.scrollY;
    stopAudio();
    if (sess) { persist(); sess = null; }
    state.route = r;
    updateProgress();
    if (r.v === 'cover') renderCover();
    else if (r.v === 'levels') renderLevels();
    else if (r.v === 'list') renderList(r.lv);
    else if (r.v === 'record') renderRecord();
    else if (r.v === 'guide') renderGuide();
    else startRun(r);
  }
  var firstRender = true;
  function settle(r) {
    var y = state.scroll[routeKey(r)];
    window.scrollTo(0, (r.v === 'list' || r.v === 'levels') && y ? y : 0);
    var m = document.getElementById('main');
    if (m && !firstRender) { try { m.focus({ preventScroll: true }); } catch (e) { m.focus(); } }
    firstRender = false;
  }

  /* ───────── 표지 ───────── */
  function renderCover() {
    document.title = '독일어 받아쓰기 훈련 · A1–C1 문장 ' + TOTAL + '개 | SODA Diktattraining';
    app.innerHTML =
      '<main id="main" class="cover view" tabindex="-1" aria-labelledby="cover-title">' +
      '<header class="brand"><img src="assets/logo.png" alt="Sophia Deutsch Akademie 로고">' +
      '<div class="brand-t"><b>Sophia Deutsch Akademie</b><span>소피아 독일어학원</span></div></header>' +
      '<div class="hero"><h1 class="title" id="cover-title"><span class="t1">SODA</span><span class="t2 long">DIKTATTRAINING</span></h1>' +
      '<a class="cta" href="#/levels">레벨 선택하기' + ICON.right + '</a></div>' +
      '<footer class="cover-foot"><span>Innovative Learning Beyond the Traditional</span>' +
      '<span>A1 – C1 · ' + TOTAL + ' Sätze</span></footer></main>';
    settle(state.route);
  }

  /* ───────── 레벨 선택 ───────── */
  function renderLevels() {
    document.title = '레벨 선택 · SODA DIKTATTRAINING';
    var cards = LEVELS.map(function (l, i) {
      var p = progressFor(l.code), rv = revCount(l.code);
      return '<li><a class="lv" href="#/' + l.code.toLowerCase() + '" style="--i:' + i + '">' +
        '<span class="lv-code">' + l.code + '</span>' +
        '<div><div class="lv-de" lang="de">' + esc(l.de) + '</div><div class="lv-ko">' + esc(l.ko) + '</div>' +
        '<p class="lv-desc">' + esc(l.desc) + '</p></div>' +
        '<div class="lv-side">' + (p.done ? '<span class="lv-done">끝낸 세트 ' + p.done + '개</span>' : '') +
        (rv ? '<span class="lv-done dk-rv">다시 쓸 문장 ' + rv + '개</span>' : '') +
        '<span class="arrow">' + ICON.arrowR + '</span></div></a></li>';
    }).join('');
    app.innerHTML = '<main id="main" class="page view" tabindex="-1">' + brandTop('#/', '표지') +
      '<div class="sec-h"><span class="kicker">STUFE</span><h1>레벨 선택</h1>' +
      '<p>문장을 듣고 그대로 써요. 세트 하나는 10분 안팎이에요.</p></div>' +
      '<ul class="levels">' + cards + '</ul>' + links() + '</main>';
    settle(state.route);
  }

  /* ───────── 세트 목록 ───────── */
  function titleOf(s) {             // 세트의 제목: 문장이 가장 많이 나온 지문의 제목
    var cnt = {}, order = [], best;
    s.items.forEach(function (it) { if (!cnt[it.tp]) { cnt[it.tp] = 0; order.push(it.tp); } cnt[it.tp]++; });
    best = order[0];
    order.forEach(function (t) { if (cnt[t] > cnt[best]) best = t; });
    return DATA.topics[best].de;
  }
  function statusMeta(s) {
    var st = S.sets[s.id], pg = S.prog[s.id];
    if (pg && pg.res && pg.res.length && pg.res.length < pg.ids.length) return '<span class="meta">하는 중 · ' + pg.res.length + ' / ' + pg.ids.length + '</span>';
    if (st) return '<span class="meta done">' + ICON.ok + '1차 ' + st.a1 + '% · 최종 ' + st.a2 + '%</span>';
    return '';
  }
  function renderList(lv) {
    var L = LEVEL_BY[lv], items = BY_LEVEL[lv] || [], rv = revCount(lv);
    document.title = lv + ' · SODA DIKTATTRAINING';
    var cards = items.map(function (s, i) {
      return '<li><a class="card" href="#/' + lv.toLowerCase() + '/' + pad(s.no) + '" style="--i:' + Math.min(i, 12) + '">' +
        '<div class="card-top"><span class="num">' + pad(s.no) + '</span><span class="chip">문장 ' + s.items.length + '개</span></div>' +
        '<h2 class="card-de de" lang="de">' + esc(titleOf(s)) + '</h2>' +
        '<div class="card-foot">' + statusMeta(s) + '</div></a></li>';
    }).join('');
    app.innerHTML = '<main id="main" class="page view" tabindex="-1">' + brandTop('#/levels', '레벨') +
      '<div class="sec-h"><div class="lvhead"><span class="lv-code">' + lv + '</span>' +
      '<div><span class="kicker" lang="de">' + esc(L.de.toUpperCase()) + '</span><h1>' + esc(L.ko) + '</h1></div></div>' +
      '<p>' + esc(L.desc) + '</p></div>' +
      (rv ? '<a class="dk-rev" href="#/' + lv.toLowerCase() + '/wieder">' + ICON.redo + '<span><b>다시 쓸 문장 ' + rv + '개</b>' +
        '<small>1차에서 틀린 문장이에요. 한 번에 맞히면 여기서 빠져요.</small></span><span class="arrow">' + ICON.arrowR + '</span></a>' : '') +
      (items.length ? '<ul class="grid dk-grid">' + cards + '</ul>' : '<p class="empty">아직 세트가 없어요.</p>') + links() + '</main>';
    settle(state.route);
  }

  /* ───────── 연습 ───────── */
  function draftNow() {             // 지금 쓰던 문장에 적어 둔 글 (앞 문장을 다시 보는 동안에는 sess.draft 에 둬요)
    if (sess.back != null) return sess.draft || '';
    if (sess.phase === 'done') return '';
    var ta = document.getElementById('dk-ta');
    return ta ? ta.value : (sess.draft || '');
  }
  function persist() {
    if (!sess || sess.phase === 'result') return;
    var draft = draftNow();
    if (!sess.res.length && !draft.trim()) delete S.prog[sess.key];      // 아무것도 쓰지 않은 연습은 남기지 않아요
    else S.prog[sess.key] = { ids: sess.items.map(function (it) { return it.id; }), idx: sess.idx, res: sess.res, secs: Math.round(sess.secs), draft: draft, ts: Date.now() };
    save();
  }
  function startRun(r) {
    var items = null, pg = S.prog[r.key], resume = null;
    if (pg && Array.isArray(pg.ids) && Array.isArray(pg.res) && (pg.res.length || pg.draft) && pg.res.length < pg.ids.length) {
      var its = pg.ids.map(function (id) { return BY_SENT[id]; });
      if (its.every(Boolean)) { items = its; resume = pg; }
    }
    if (!items) {
      if (r.kind === 'set') items = BY_SET[r.set].items.slice();
      else if (r.kind === 'retry') {
        var st = S.sets[r.set], w = (st && st.wrong) || [];
        items = w.map(function (id) { return BY_SENT[id]; }).filter(Boolean);
      } else {
        items = Object.keys(S.rev).filter(function (id) { return BY_SENT[id] && BY_SENT[id].lv === r.lv; })
          .sort(function (a, b) { return (S.rev[a].ts || 0) - (S.rev[b].ts || 0); }).slice(0, 10).map(function (id) { return BY_SENT[id]; });
      }
    }
    if (!items.length) { location.replace('#/' + r.lv.toLowerCase()); return; }
    sess = {
      key: r.key, kind: r.kind, set: r.set || null, lv: r.lv, items: items,
      idx: resume ? Math.min(resume.res.length, items.length - 1) : 0,
      res: resume ? resume.res.slice(0, items.length) : [], secs: resume ? (resume.secs || 0) : 0,
      phase: 'w1', plays: 0, g1: null, in1: '', shown: Date.now(), draft: resume ? (resume.draft || '') : '',
      back: null, rplays: 0, away: 0          // back: 다시 보고 있는 앞 문장의 번호(없으면 null)
    };
    renderRun();
    settle(state.route);
  }
  function runTitle() {
    if (sess.kind === 'review') return sess.lv + ' 다시 쓸 문장';
    if (sess.kind === 'retry') return setCode(BY_SET[sess.set]) + ' 틀린 문장';
    return setCode(BY_SET[sess.set]);
  }
  function viewIdx() { return sess.back != null ? sess.back : sess.idx; }
  function cur() { return sess ? sess.items[viewIdx()] : null; }
  function audioSrc(it) { return 'audio/' + it.lv.toLowerCase() + '/' + it.id + '.mp3?v=' + AUDIO_V; }

  function renderRun() {
    var v = viewIdx(), it = sess.items[v], tp = DATA.topics[it.tp], lc = sess.lv.toLowerCase(), n = sess.items.length;
    var seen = sess.back != null, r0 = sess.res[v];
    document.title = runTitle() + ' · SODA DIKTATTRAINING';
    var dots = sess.items.map(function (x, i) {
      var r = sess.res[i], c = r ? (r.a1 === 100 ? 'ok' : r.a2 === 100 ? 'mid' : 'no') : (i === sess.idx ? 'on' : '');
      return '<i class="' + c + (seen && i === v ? ' see' : '') + '"></i>';
    }).join('');
    var text = r0 ? (r0.tx != null ? r0.tx : (r0.in1 || (r0.a1 === 100 ? it.de : ''))) : (sess.draft || '');
    app.innerHTML =
      '<header class="rd-top"><div class="rd-top-in">' +
      '<a class="pill" href="#/' + lc + '">' + ICON.left + sess.lv + ' 목록</a>' +
      '<div class="rd-where">' + esc(runTitle()) + '</div>' +
      '<div class="tools"><span class="dk-count" aria-label="문장 ' + (v + 1) + ' / ' + n + '"><b>' + (v + 1) + '</b> / ' + n + '</span></div>' +
      '</div></header>' +
      '<main id="main" class="rd dk view" tabindex="-1">' +
      '<div class="dk-steps" aria-hidden="true">' + dots + '</div>' +
      '<section class="dk-card">' +
      '<p class="dk-ctx"><span class="chip">' + esc(tp.kind || '문장') + '</span><span class="dk-ctx-de" lang="de">' + esc(tp.de) + '</span>' +
      '<span class="dk-ctx-ko">' + esc(tp.ko) + '</span></p>' +
      '<div class="dk-play">' +
      '<button type="button" class="dk-pbtn" id="dk-pbtn" data-act="play" aria-label="문장 듣기">' + ICON.play + '</button>' +
      '<div class="dk-pinfo"><b id="dk-pl">문장 듣기</b><span id="dk-pc">몇 번이든 다시 들을 수 있어요</span></div>' +
      '<button type="button" class="toggle" data-act="slow" aria-pressed="' + !!S.slow + '"><span class="dot"></span>느리게</button>' +
      '</div>' +
      (!r0 && it.nm && it.nm.length ? '<div class="dk-names"><span>이름</span>' + it.nm.map(function (x) {
        return '<button type="button" data-act="ins" data-k="' + esc(x) + ' " lang="de" aria-label="' + esc(x) + ' 넣기">' + esc(x) + '</button>';
      }).join('') + '</div>' : '') +
      '<textarea class="dk-ta de" id="dk-ta" lang="de" rows="3" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" ' +
      (r0 ? 'readonly ' : '') + 'placeholder="들은 문장을 여기에 쓰세요" aria-label="받아쓴 문장">' + esc(text) + '</textarea>' +
      '<div class="dk-fb" id="dk-fb" aria-live="polite"></div>' +
      '<div class="dk-actions" id="dk-actions"></div>' +
      '</section>' +
      '<p class="dk-tip">문장부호는 채점하지 않아요. 문장의 첫 글자는 소문자로 써도 돼요.</p>' +
      '</main>';
    if (r0) showStored(v);                                        // 이미 끝낸 문장: 정답과 내가 쓴 글
    else if (sess.phase === 'w2' && sess.g1) showFirst(sess.g1, sess.in1);   // 1차 확인을 한 문장으로 돌아온 경우
    paintPlay(false);
    paintActions();
    preloadNext();
  }
  /* 끝낸 문장의 결과를 저장된 기록으로 다시 보여 줘요 */
  function showStored(v) {
    var it = sess.items[v], r = sess.res[v];
    var g1 = G.grade(it.de, r.a1 === 100 ? it.de : (r.in1 || ''));
    var g2 = r.a1 === 100 ? g1 : (r.tx != null ? G.grade(it.de, r.tx) : (r.a2 === 100 ? G.grade(it.de, it.de) : g1));
    showFinal(it, g1, g2, !!r.rv);
  }
  function paintActions() {
    var box = document.getElementById('dk-actions');
    if (!box) return;
    var v = viewIdx(), last = sess.idx === sess.items.length - 1;
    var prevBtn = v > 0 ? '<button type="button" class="btn sec dk-prev" data-act="prev" aria-label="이전 문장">' + ICON.left + '이전<span class="dk-full">&nbsp;문장</span></button>' : '';
    var again = '<button type="button" class="btn sec" data-act="play">' + ICON.play + '<span class="dk-full">다시&nbsp;</span>듣기</button>';
    if (sess.back != null) box.innerHTML = prevBtn + again + '<button type="button" class="btn pri" data-act="next">다음 문장' + ICON.arrowR + '</button>';
    else if (sess.phase === 'w1') box.innerHTML = prevBtn + '<button type="button" class="btn pri" data-act="check">확인</button>';
    else if (sess.phase === 'w2') box.innerHTML = prevBtn + '<button type="button" class="btn sec" data-act="reveal">정답 보기</button>' +
      '<button type="button" class="btn pri" data-act="check">다시 확인</button>';
    else box.innerHTML = prevBtn + again + '<button type="button" class="btn pri" data-act="next">' + (last ? '결과 보기' : '다음 문장') + ICON.arrowR + '</button>';
  }

  /* 음성 */
  function paintPlay(on) {
    var b = document.getElementById('dk-pbtn'), l = document.getElementById('dk-pl'), c = document.getElementById('dk-pc');
    if (b) { b.innerHTML = on ? ICON.stop : ICON.play; b.classList.toggle('on', !!on); b.setAttribute('aria-label', on ? '멈추기' : '문장 듣기'); }
    var n = sess ? (sess.back != null ? sess.rplays : sess.plays) : 0;
    if (l) l.textContent = on ? '듣는 중' : (n ? '다시 듣기' : '문장 듣기');
    if (c && n) c.textContent = '들은 횟수 ' + n;
  }
  function stopAudio() {
    try { au.pause(); } catch (e) {}
    paintPlay(false);
  }
  function play() {
    var it = cur();
    if (!it) return;
    if (!au.paused && !au.ended) { stopAudio(); return; }
    var src = audioSrc(it);
    if (au.getAttribute('data-src') !== src) { au.src = src; au.setAttribute('data-src', src); }
    try { au.currentTime = 0; } catch (e) {}
    au.playbackRate = S.slow ? 0.8 : 1;
    if (sess.back != null) sess.rplays++; else sess.plays++;
    paintPlay(true);
    var p = au.play();
    if (p && p.catch) p.catch(function () { audioFail(); });
  }
  function audioFail() {
    paintPlay(false);
    var c = document.getElementById('dk-pc');
    if (c) c.textContent = '음성을 불러오지 못했어요. 인터넷 연결을 확인하고 다시 눌러 주세요.';
  }
  au.addEventListener('ended', function () { paintPlay(false); });
  au.addEventListener('pause', function () { paintPlay(false); });
  au.addEventListener('error', function () { if (sess && au.getAttribute('data-src')) audioFail(); });
  function preloadNext() {
    var nx = sess && sess.items[sess.idx + 1];
    if (!nx) return;
    try { auNext = new Audio(); auNext.preload = 'auto'; auNext.src = audioSrc(nx); } catch (e) {}
  }

  /* 채점 결과를 화면에 */
  function chips(errs) {
    var c = {};
    errs.forEach(function (e) { c[e.type] = (c[e.type] || 0) + 1; });
    return G.ORDER.filter(function (t) { return c[t]; }).map(function (t) {
      return '<span class="dk-chip t-' + t + '">' + G.LABEL[t] + ' ' + c[t] + '</span>';
    }).join('');
  }
  function markUser(g) {
    return g.ops.map(function (o) {
      if (o.type === 'space') return '<span class="w no" title="' + G.LABEL.space + '">' + esc(o.us.map(function (z) { return z.raw; }).join(' ')) + '</span>';
      if (o.op === 'ok') return '<span class="w">' + esc(o.us ? o.us.map(function (z) { return z.raw; }).join(' ') : o.u.raw) + '</span>';
      if (o.op === 'sub') return '<span class="w no" title="' + G.LABEL[o.type] + '">' + esc(o.u.raw) + '</span>';
      if (o.op === 'del') return '<span class="w gap" title="' + G.LABEL.miss + '"><span class="sr">빠진 단어</span></span>';
      if (o.op === 'ins') return '<span class="w xt" title="' + G.LABEL.extra + '">' + esc(o.u.raw) + '</span>';
      return o.u ? '<span class="w">' + esc(o.u.raw) + '</span>' : '';
    }).filter(Boolean).join(' ');
  }
  function markTarget(de, g) {
    var bad = {};
    g.ops.forEach(function (o) {
      if (o.type === 'space') o.ts.forEach(function (t) { bad[t.i] = 1; });
      else if (o.op === 'sub' || o.op === 'del') bad[o.t.i] = 1;
    });
    var i = 0;
    return de.split(/\s+/).map(function (w) {
      var has = /[0-9A-Za-zÀ-ÖØ-öø-ÿ]/.test(w), cls = '';
      if (has) { if (bad[i]) cls = ' hl'; i++; }
      return '<span class="w' + cls + '">' + esc(w) + '</span>';
    }).join(' ');
  }
  function errList(g) {
    if (!g.errs.length) return '';
    return '<ul class="dk-errs">' + g.errs.map(function (e) {
      var body = e.type === 'miss' ? '<b lang="de">' + esc(e.t) + '</b>' :
        e.type === 'extra' ? '<s lang="de">' + esc(e.u) + '</s>' :
          '<s lang="de">' + esc(e.u) + '</s><i aria-hidden="true">→</i><b lang="de">' + esc(e.t) + '</b>';
      return '<li><span class="dk-chip t-' + e.type + '">' + G.LABEL[e.type] + '</span>' + body + '</li>';
    }).join('') + '</ul>';
  }
  function showFirst(g, text) {
    var fb = document.getElementById('dk-fb');
    fb.innerHTML = '<div class="dk-msg mid">' + ICON.mid + '<span>틀린 곳이 <b>' + g.errs.length + '군데</b> 있어요. 표시된 자리를 다시 듣고 고쳐 보세요.</span></div>' +
      '<div class="dk-line"><span class="dk-l">내가 쓴 문장</span><p class="dk-s de" lang="de">' + markUser(g) + '</p></div>' +
      '<div class="dk-chips">' + chips(g.errs) + '</div>' +
      '<p class="dk-legend"><span class="w no">밑줄</span> 다르게 쓴 단어 <span class="w gap"></span> 빠진 단어 <span class="w xt">줄 그음</span> 더 쓴 단어</p>';
  }
  function showFinal(it, g1, g2, revealed) {
    var fb = document.getElementById('dk-fb'), head;
    if (g1.perfect) head = '<div class="dk-msg ok">' + ICON.ok + '<span><b>맞았어요.</b> 한 번에 다 받아썼어요.</span></div>';
    else if (g2.perfect) head = '<div class="dk-msg ok">' + ICON.ok + '<span><b>고쳐서 다 맞았어요.</b> 1차 정확도는 ' + g1.pct + '%였어요.</span></div>';
    else head = '<div class="dk-msg no">' + ICON.no + '<span>' + (revealed ? '정답을 확인하세요.' : '아직 틀린 곳이 있어요. 정답과 비교해 보세요.') + ' 1차 ' + g1.pct + '% · 최종 ' + g2.pct + '%</span></div>';
    fb.innerHTML = head +
      '<div class="dk-line"><span class="dk-l">정답</span><p class="dk-s dk-ans de" lang="de">' + markTarget(it.de, g1.perfect ? g1 : g2) + '</p></div>' +
      (g2.perfect ? '' : '<div class="dk-line"><span class="dk-l">내가 쓴 문장</span><p class="dk-s de" lang="de">' + (g2.empty ? '<span class="dk-none">쓰지 않았어요</span>' : markUser(g2)) + '</p></div>' + errList(g2)) +
      (!g1.perfect && g2.perfect ? '<div class="dk-line"><span class="dk-l">1차에서 틀린 곳</span>' + errList(g1) + '</div>' : '') +
      (it.ko ? '<p class="dk-ko">' + esc(it.ko) + '</p>' : '');
  }

  function check() {
    var it = cur(), ta = document.getElementById('dk-ta');
    if (!it || !ta || sess.phase === 'done' || sess.back != null) return;
    var text = ta.value;
    if (!text.trim()) {
      var fb = document.getElementById('dk-fb');
      fb.innerHTML = '<div class="dk-msg mid">' + ICON.info + '<span>들은 문장을 쓰고 「확인」을 누르세요.</span></div>';
      ta.focus();
      return;
    }
    var g = G.grade(it.de, text);
    if (sess.phase === 'w1') {
      sess.g1 = g; sess.in1 = text;
      if (g.perfect) { finish(g, g, false); return; }
      sess.phase = 'w2';
      showFirst(g, text);
      paintActions();
      persist();
      reveal2('dk-actions');
      return;
    }
    finish(sess.g1, g, false);
  }
  function reveal() {
    var it = cur(), ta = document.getElementById('dk-ta');
    if (!it || sess.phase !== 'w2' || sess.back != null) return;
    var g = G.grade(it.de, ta ? ta.value : '');
    finish(sess.g1, g, true);
  }
  function finish(g1, g2, revealed) {
    var it = cur(), ta = document.getElementById('dk-ta');
    stopAudio();
    sess.phase = 'done';
    sess.secs += Math.min(240, (Date.now() - sess.shown) / 1000);
    var r = { id: it.id, a1: g1.pct, a2: Math.max(g1.pct, g2.pct), plays: sess.plays, errs: g1.errs.map(function (e) { return e.type; }) };
    if (!g1.perfect) r.in1 = String(sess.in1).replace(/\s+/g, ' ').trim().slice(0, 240);
    r.tx = String(ta ? ta.value : '').replace(/\s+/g, ' ').trim().slice(0, 240);      // 마지막으로 쓴 글 (이 문장을 다시 볼 때 보여 줘요)
    if (revealed) r.rv = 1;
    sess.res[sess.idx] = r;
    if (g1.perfect) delete S.rev[it.id]; else S.rev[it.id] = { lv: it.lv, ts: Date.now() };
    if (ta) ta.readOnly = true;
    showFinal(it, g1, g2, revealed);
    paintActions();
    var d = document.querySelectorAll('.dk-steps i')[sess.idx];
    if (d) d.className = r.a1 === 100 ? 'ok' : r.a2 === 100 ? 'mid' : 'no';
    persist();
    var nb = document.querySelector('#dk-actions [data-act="next"]');
    if (nb) { try { nb.focus({ preventScroll: true }); } catch (e) {} }
    reveal2('dk-fb');
  }
  /* 채점 결과가 화면 밖에 있으면 보이는 곳까지만 올려요 */
  function reveal2(id) {
    var el = document.getElementById(id);
    if (!el || !el.scrollIntoView) return;
    var r = el.getBoundingClientRect(), vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top > vh - 80 || (id === 'dk-actions' && r.bottom > vh)) {
      try { el.scrollIntoView({ behavior: 'smooth', block: id === 'dk-actions' ? 'end' : 'start' }); } catch (e) { el.scrollIntoView(); }
    }
  }
  function focusTa() {
    var ta = document.getElementById('dk-ta');
    if (ta && !ta.readOnly && window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches) ta.focus();
  }
  function next() {
    if (!sess || sess.phase === 'result') return;
    if (sess.back != null) {                    // 앞 문장을 다시 보던 중: 한 문장 앞으로, 끝이면 쓰던 문장으로
      stopAudio();
      sess.rplays = 0;
      if (sess.back + 1 < sess.idx) sess.back++;
      else {
        sess.back = null;
        if (sess.away) { sess.shown += Date.now() - sess.away; sess.away = 0; }      // 다시 보던 시간은 걸린 시간에서 빼요
      }
      renderRun();
      window.scrollTo(0, 0);
      focusTa();
      return;
    }
    if (sess.phase !== 'done') return;
    if (sess.idx >= sess.items.length - 1) { complete(); return; }
    sess.idx++;
    stopAudio();
    sess.phase = 'w1'; sess.plays = 0; sess.g1 = null; sess.in1 = ''; sess.shown = Date.now(); sess.draft = '';
    renderRun();
    window.scrollTo(0, 0);
    play();
    focusTa();
    persist();
  }
  /* 앞 문장으로 돌아가 결과를 다시 봐요. 쓰던 문장의 글과 1차 확인 결과는 그대로 둬요. */
  function prev() {
    if (!sess || sess.phase === 'result') return;
    var v = viewIdx();
    if (v <= 0) return;
    if (sess.back == null) {
      sess.draft = draftNow();
      sess.away = Date.now();
      persist();
    }
    stopAudio();
    sess.back = v - 1;
    sess.rplays = 0;
    renderRun();
    window.scrollTo(0, 0);
  }

  /* ───────── 세트 결과 ───────── */
  function complete() {
    var res = sess.res, n = res.length;
    var a1 = avg(res.map(function (r) { return r.a1; })), a2 = avg(res.map(function (r) { return r.a2; }));
    var hit = res.filter(function (r) { return r.a1 === 100; }).length;
    var errs = {};
    res.forEach(function (r) { r.errs.forEach(function (t) { errs[t] = (errs[t] || 0) + 1; }); });
    var wrong = res.filter(function (r) { return r.a1 < 100; });
    var h = {
      ts: Date.now(), key: sess.key, kind: sess.kind, lv: sess.lv, name: runTitle(), n: n, a1: a1, a2: a2, hit: hit,
      plays: res.reduce(function (x, r) { return x + (r.plays || 0); }, 0), secs: Math.round(sess.secs), errs: errs,
      wrong: wrong.slice(0, 12).map(function (r) { return { id: r.id, a1: r.a1, in1: r.in1 || '' }; })
    };
    S.hist.push(h);
    if (S.hist.length > 300) S.hist = S.hist.slice(-300);
    if (sess.kind === 'set') {
      var old = S.sets[sess.set] || { n: 0, best: 0 };
      S.sets[sess.set] = { n: old.n + 1, ts: h.ts, a1: a1, a2: a2, best: Math.max(old.best || 0, a1), wrong: wrong.map(function (r) { return r.id; }) };
    } else if (sess.kind === 'retry' && S.sets[sess.set]) {
      S.sets[sess.set].wrong = wrong.map(function (r) { return r.id; });
    }
    delete S.prog[sess.key];
    save();
    sess.phase = 'result';
    sess.h = h;
    updateProgress();
    renderResult();
    window.scrollTo(0, 0);
  }
  function typeBars(errs) {
    var keys = G.ORDER.filter(function (t) { return errs[t]; }).sort(function (a, b) { return errs[b] - errs[a]; });
    if (!keys.length) return '<p class="dk-none">틀린 곳이 없어요.</p>';
    var max = errs[keys[0]];
    return '<ul class="dk-bars">' + keys.map(function (t) {
      return '<li><span>' + G.LABEL[t] + '</span><i><b style="width:' + Math.max(6, Math.round(errs[t] * 100 / max)) + '%"></b></i><em>' + errs[t] + '</em></li>';
    }).join('') + '</ul>';
  }
  function renderResult() {
    var h = sess.h, lc = sess.lv.toLowerCase(), wrongN = h.n - h.hit;
    var rows = sess.res.map(function (r, i) {
      var it = BY_SENT[r.id], g = r.in1 != null && r.a1 < 100 ? G.grade(it.de, r.in1) : null;
      var cls = r.a1 === 100 ? 'ok' : r.a2 === 100 ? 'mid' : 'no';
      return '<li class="' + cls + '"><span class="dk-rn">' + (i + 1) + '</span><div>' +
        '<p class="dk-s de" lang="de">' + (g ? markTarget(it.de, g) : esc(it.de)) + '</p>' +
        (g ? '<p class="dk-mine de" lang="de"><span class="dk-l">1차</span>' + (g.empty ? '<span class="dk-none">쓰지 않았어요</span>' : markUser(g)) + '</p>' : '') +
        '<p class="dk-rm">' + (r.a1 === 100 ? '한 번에 맞힘' : '1차 ' + r.a1 + '% · 최종 ' + r.a2 + '%') + ' · 듣기 ' + (r.plays || 0) + '회</p></div></li>';
    }).join('');
    var nextSet = null;
    if (sess.kind === 'set') { var list = BY_LEVEL[sess.lv], ix = list.indexOf(BY_SET[sess.set]); nextSet = list[ix + 1] || null; }
    var acts = '';
    if (wrongN && sess.kind !== 'review') acts += '<a class="btn pri" href="#/' + lc + '/' + pad(BY_SET[sess.set].no) + '/nochmal">' + ICON.redo + '틀린 문장만 다시 쓰기</a>';
    if (sess.kind === 'review' && revCount(sess.lv)) acts += '<button type="button" class="btn pri" data-act="again">' + ICON.redo + '남은 문장 이어서 쓰기</button>';
    if (nextSet) acts += '<a class="btn ' + (wrongN ? 'sec' : 'pri') + '" href="#/' + lc + '/' + pad(nextSet.no) + '">다음 세트' + ICON.arrowR + '</a>';
    acts += '<a class="btn sec" href="#/' + lc + '">' + sess.lv + ' 목록</a>';
    app.innerHTML =
      '<header class="rd-top"><div class="rd-top-in">' +
      '<a class="pill" href="#/' + lc + '">' + ICON.left + sess.lv + ' 목록</a>' +
      '<div class="rd-where">' + esc(runTitle()) + ' · 결과</div><div class="tools"></div></div></header>' +
      '<main id="main" class="rd dk view" tabindex="-1">' +
      '<div class="rd-head"><span class="kicker">ERGEBNIS</span><h1 class="dk-h1">' + esc(runTitle()) + ' 결과</h1></div>' +
      '<ul class="dk-score"><li><span>1차 정확도</span><b>' + h.a1 + '<small>%</small></b><em>처음 쓴 문장</em></li>' +
      '<li><span>최종 정확도</span><b>' + h.a2 + '<small>%</small></b><em>고쳐 쓴 뒤</em></li>' +
      '<li><span>한 번에 맞힌 문장</span><b>' + h.hit + '<small> / ' + h.n + '</small></b><em>듣기 ' + h.plays + '회 · ' + mins(h.secs) + '</em></li></ul>' +
      '<section class="dk-box"><h2 class="dk-h">1차에서 틀린 종류</h2>' + typeBars(h.errs) +
      (wrongN ? '<p class="dk-note">어미와 관사가 많으면 단어의 끝소리를, 빠진 단어가 많으면 짧은 단어(전치사, 대명사, nicht)를 다시 들어 보세요.</p>' : '') + '</section>' +
      '<section class="dk-box"><h2 class="dk-h">문장별 결과</h2><ol class="dk-list">' + rows + '</ol></section>' +
      '<div class="actions dk-res-act">' + acts + '</div>' +
      '<div class="actions dk-links"><button type="button" class="btn sec" data-act="submit">' + ICON.mail + '선생님께 기록 보내기</button>' +
      '<a class="btn sec" href="#/record">' + ICON.chart + '나의 기록</a></div>' +
      (saveOk ? '' : '<p class="notice">이 브라우저에서는 기록이 저장되지 않아요. 창을 닫기 전에 「선생님께 기록 보내기」에서 기록을 복사하세요.</p>') +
      '</main>';
  }

  /* ───────── 나의 기록 ───────── */
  function totals() {
    var H = S.hist, errs = {}, sent = 0, a1 = [], a2 = [], secs = 0;
    H.forEach(function (h) {
      sent += h.n; secs += h.secs || 0;
      for (var i = 0; i < h.n; i++) { a1.push(h.a1); a2.push(h.a2); }
      Object.keys(h.errs || {}).forEach(function (t) { errs[t] = (errs[t] || 0) + h.errs[t]; });
    });
    return { runs: H.length, sent: sent, a1: avg(a1), a2: avg(a2), secs: secs, errs: errs };
  }
  function renderRecord() {
    document.title = '나의 기록 · SODA DIKTATTRAINING';
    var T = totals(), p = progressFor(null);
    var lvRows = LEVELS.map(function (l) {
      var pp = progressFor(l.code), hs = S.hist.filter(function (h) { return h.lv === l.code; });
      var x1 = [], x2 = [];
      hs.forEach(function (h) { for (var i = 0; i < h.n; i++) { x1.push(h.a1); x2.push(h.a2); } });
      return '<tr><th>' + l.code + '</th><td>' + pp.done + ' / ' + pp.total + '</td><td>' + (x1.length ? avg(x1) + '%' : '–') + '</td><td>' +
        (x2.length ? avg(x2) + '%' : '–') + '</td><td>' + revCount(l.code) + '</td></tr>';
    }).join('');
    var recent = S.hist.slice(-15).reverse().map(function (h) {
      return '<li><span class="dk-d">' + dstr(h.ts) + '</span><b>' + esc(h.name || h.key) + '</b><span>1차 ' + h.a1 + '% · 최종 ' + h.a2 + '%</span></li>';
    }).join('');
    app.innerHTML = '<main id="main" class="page dk-page view" tabindex="-1">' + brandTop('#/levels', '레벨') +
      '<div class="sec-h"><span class="kicker">MEIN PROTOKOLL</span><h1>나의 기록</h1>' +
      '<p>이 기기에 저장된 받아쓰기 기록이에요. 다른 기기나 다른 브라우저에서 한 기록은 보이지 않아요.</p></div>' +
      (T.runs ?
        '<ul class="dk-score"><li><span>끝낸 세트</span><b>' + p.done + '<small> / ' + p.total + '</small></b><em>연습 ' + T.runs + '회</em></li>' +
        '<li><span>1차 정확도</span><b>' + T.a1 + '<small>%</small></b><em>문장 ' + T.sent + '개</em></li>' +
        '<li><span>최종 정확도</span><b>' + T.a2 + '<small>%</small></b><em>' + mins(T.secs) + ' 연습</em></li></ul>' +
        '<section class="dk-box"><h2 class="dk-h">레벨별</h2><div class="dk-tw"><table class="dk-table"><thead><tr><th>레벨</th><th>끝낸 세트</th><th>1차</th><th>최종</th><th>다시 쓸 문장</th></tr></thead><tbody>' + lvRows + '</tbody></table></div></section>' +
        '<section class="dk-box"><h2 class="dk-h">1차에서 자주 틀린 종류</h2>' + typeBars(T.errs) + '</section>' +
        '<section class="dk-box"><h2 class="dk-h">최근 연습</h2><ul class="dk-recent">' + recent + '</ul></section>' +
        '<div class="actions dk-links"><button type="button" class="btn pri" data-act="submit">' + ICON.mail + '선생님께 기록 보내기</button></div>' +
        '<div class="actions dk-links"><button type="button" class="btn sec dk-del" data-act="wipe">이 기기의 기록 지우기</button></div>'
        : '<p class="empty">아직 기록이 없어요. 세트 하나를 끝까지 하면 여기에 쌓여요.</p>') +
      '<div class="actions dk-links"><a class="btn sec" href="#/guide">' + ICON.book + '이렇게 공부하세요</a></div></main>';
    settle(state.route);
  }

  /* ───────── 이렇게 공부하세요 ───────── */
  function renderGuide() {
    document.title = '이렇게 공부하세요 · SODA DIKTATTRAINING';
    var steps = [
      ['먼저 끝까지 듣기', '쓰지 말고 문장을 한 번 끝까지 들어요. 누가 어떤 상황에서 하는 말인지부터 잡아요. 입력란 위에 지문 제목이 있어요.'],
      ['들으면서 쓰기', '다시 들으면서 들리는 만큼 써요. 몇 번이든 다시 들을 수 있어요. 빠르게 느껴지면 「느리게」를 켜요.'],
      ['확인하기', '「확인」을 누르면 틀린 자리와 틀린 종류만 보여요. 정답은 아직 나오지 않아요.'],
      ['틀린 자리 다시 듣기', '표시된 자리에 귀를 기울여 다시 듣고 고쳐요. 어미가 틀렸으면 단어의 끝소리를, 빠진 단어가 있으면 그 앞뒤 단어 사이를 들어요.'],
      ['정답과 비교하기', '「다시 확인」을 누르면 정답이 나와요. 못 들어서 틀린 것인지, 들었지만 철자나 문법을 몰라서 틀린 것인지 나눠 보세요.'],
      ['소리 내어 따라 읽기', '정답을 보면서 「다시 듣기」를 누르고 같은 속도로 따라 읽어요. 내 입으로 말해 본 소리가 다음에 더 잘 들려요.'],
      ['다음 날 다시 쓰기', '1차에서 틀린 문장은 「다시 쓸 문장」에 모여요. 하루 뒤에 다시 써서 한 번에 맞히면 목록에서 빠져요.']
    ];
    var rules = [
      '문장부호(쉼표, 마침표, 물음표)는 채점하지 않아요.',
      '문장의 첫 글자는 소문자로 써도 맞아요. 문장 안의 대문자(명사, Sie)는 채점해요.',
      'ä, ö, ü, ß는 독일어 자판으로 써요. ae, oe, ue, ss로 쓰면 「움라우트·ß」로 표시돼요.',
      '숫자는 글자(zwanzig)로 써도, 숫자(20)로 써도 맞아요. zwei Euro achtzig는 2,80 Euro로, neun Uhr zwanzig는 9:20 Uhr로 써도 돼요.',
      '사람 이름과 지명은 입력란 위에 미리 보여 줘요. 누르면 입력란에 들어가요.',
      'Ah, Oh 같은 감탄사는 빠뜨려도 틀린 것으로 세지 않아요.',
      "geht's와 gehts, Tschüs와 Tschüss, zu Hause와 zuhause처럼 둘 다 쓰는 표기는 모두 맞아요."
    ];
    var types = [
      ['빠진 단어', '짧고 약하게 발음되는 단어(전치사, 대명사, nicht, 관사)가 자주 빠져요. 앞뒤 단어 사이를 들어요.'],
      ['다른 단어', '다른 단어로 들은 경우예요. 모르는 단어였다면 단어장에 옮겨 적어요.'],
      ['어미', '-e, -en, -em, -er, -t, -st 같은 끝소리예요. 격과 인칭을 알면 소리가 약해도 쓸 수 있어요.'],
      ['관사·대명사', 'den과 dem, ein과 eine, mir와 mich처럼 형태가 비슷한 단어예요. 문장 성분을 따져 보세요.'],
      ['철자', '소리는 맞게 들었지만 철자가 틀린 경우예요. 겹자음(kommen), 긴 모음(ie, h), 끝소리 d·t를 확인해요.'],
      ['움라우트·ß', 'ä, ö, ü, ß를 다른 글자로 쓴 경우예요. schon과 schön처럼 뜻이 달라지기도 해요.'],
      ['대소문자', '명사와 존칭 Sie·Ihnen·Ihr는 문장 안에서도 대문자로 써요.'],
      ['띄어쓰기', '한 단어를 띄어 쓰거나 두 단어를 붙여 쓴 경우예요.'],
      ['더 쓴 단어', '음성에 없는 단어를 쓴 경우예요.']
    ];
    app.innerHTML = '<main id="main" class="page dk-page view" tabindex="-1">' + brandTop('#/levels', '레벨') +
      '<div class="sec-h"><span class="kicker">SO GEHT’S</span><h1>이렇게 공부하세요</h1>' +
      '<p>받아쓰기는 소리를 단어로 알아듣는 힘을 키우는 연습이에요. 아는 단어인데 소리로는 못 알아들을 때 효과가 커요. 하루에 세트 하나, 10분 안팎이면 충분해요.</p></div>' +
      '<section class="dk-box"><h2 class="dk-h">문장 하나를 연습하는 순서</h2><ol class="dk-how">' +
      steps.map(function (s, i) { return '<li><span class="dk-n">' + (i + 1) + '</span><div><b>' + s[0] + '</b><p>' + s[1] + '</p></div></li>'; }).join('') + '</ol></section>' +
      '<section class="dk-box"><h2 class="dk-h">채점 규칙</h2><ul class="dk-rules">' + rules.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul></section>' +
      '<section class="dk-box"><h2 class="dk-h">틀린 종류와 다시 볼 곳</h2><dl class="dk-types">' +
      types.map(function (t) { return '<div><dt>' + t[0] + '</dt><dd>' + t[1] + '</dd></div>'; }).join('') + '</dl></section>' +
      '<section class="dk-box"><h2 class="dk-h">알아 둘 것</h2><ul class="dk-rules">' +
      '<li>「이전」을 누르면 앞 문장의 정답과 내가 쓴 글을 다시 볼 수 있어요. 쓰던 문장은 그대로 남아 있어요.</li>' +
      '<li>컴퓨터에서는 Enter가 「확인」과 「다음 문장」이고, Shift + Enter가 「다시 듣기」예요.</li>' +
      '<li>1차 정확도는 처음 쓴 문장의 점수이고, 최종 정확도는 다시 듣고 고친 뒤의 점수예요. 실력은 1차 정확도로 보세요.</li>' +
      '<li>기록은 이 기기의 이 브라우저에만 저장돼요. 홈 화면에 추가한 앱과 브라우저의 기록은 따로예요.</li>' +
      '<li>문장은 듣기 훈련(Hörtraining)과 말하기 훈련(Sprechtraining)의 지문에서 골랐어요. 받아쓴 뒤에 그 지문을 다시 들으면 더 잘 들려요.</li>' +
      '</ul></section>' +
      '<div class="actions dk-links"><a class="btn pri" href="#/levels">레벨 선택하기' + ICON.arrowR + '</a></div></main>';
    settle(state.route);
  }

  /* ───────── 선생님께 기록 보내기 (소피아 독일어학원 수강생 전용 안내 팝업) ───────── */
  var mFrom = null;
  function closeModal() {
    var b = document.getElementById('xp');
    if (!b) return;
    b.parentNode.removeChild(b);
    if (mFrom && mFrom.focus && document.body.contains(mFrom)) mFrom.focus();
    mFrom = null;
  }
  function openModal(html) {
    closeModal();
    mFrom = document.activeElement;
    var box = document.createElement('div');
    box.className = 'xp';
    box.id = 'xp';
    box.innerHTML = '<div class="xp-in" role="dialog" aria-modal="true" aria-labelledby="xp-t">' + html +
      '<button type="button" class="xp-x" data-act="xpclose" aria-label="닫기">닫기</button></div>';
    document.body.appendChild(box);
    var f = box.querySelector('h2');
    if (f) { f.setAttribute('tabindex', '-1'); try { f.focus({ preventScroll: true }); } catch (e) { f.focus(); } }
  }
  var NOTICE = '<div class="dk-only"><span class="dk-only-i">' + ICON.info + '</span><div>' +
    '<b>소피아 독일어학원 수강생을 위한 기능이에요.</b>' +
    '<p>보낸 기록은 소피아 독일어학원 선생님 메일로 바로 가고, 선생님이 틀린 종류를 보고 피드백해요. 메일 제목에 적힌 이름으로 수강생인지 확인하니 이름을 정확히 적어 주세요.</p>' +
    '<p>수강생이 아니어도 받아쓰기와 기록 보기는 모두 자유롭게 쓸 수 있어요. 기록은 「기록 복사」나 「파일로 저장」으로 보관하세요.</p>' +
    '</div></div>';
  function unsent() {
    var last = S.sentAt || 0, list = S.hist.filter(function (h) { return h.ts > last; });
    return list.length ? list : S.hist.slice(-10);
  }
  function openSubmit() {
    var T = totals(), list = unsent(), has = S.hist.length > 0;
    openModal('<h2 id="xp-t">선생님께 기록 보내기</h2>' + NOTICE +
      '<div class="dk-sum"><ul><li><span>보내는 연습</span><b>' + (has ? list.length : 0) + '</b><small>회</small></li>' +
      '<li><span>1차 정확도</span><b>' + (has ? T.a1 + '%' : '–') + '</b><small>전체 평균</small></li>' +
      '<li><span>최종 정확도</span><b>' + (has ? T.a2 + '%' : '–') + '</b><small>전체 평균</small></li></ul>' +
      (has ? '' : '<p class="dk-warn">아직 끝낸 연습이 없어요. 세트 하나를 끝까지 한 뒤 보내세요.</p>') + '</div>' +
      '<label class="xp-name"><span>이름</span><input type="text" data-xp-name placeholder="이름" autocomplete="name" value="' + esc(defaultName()) + '"></label>' +
      '<button type="button" class="btn pri xp-mail" data-act="send"' + (has ? '' : ' disabled') + '>' + ICON.mail + '메일로 보내기</button>' +
      '<p class="xp-msg" aria-live="polite">' + (S.sentAt ? '마지막으로 보낸 때: ' + dstr(S.sentAt) : '') + '</p>' +
      '<div class="xp-b"><button type="button" class="btn sec" data-act="copyrec"' + (has ? '' : ' disabled') + '>기록 복사</button>' +
      '<button type="button" class="btn sec" data-act="saverec"' + (has ? '' : ' disabled') + '>파일로 저장</button></div>' +
      '<textarea class="xp-ta" data-xp-text readonly hidden aria-label="기록 내용"></textarea>' +
      '<p class="xp-note">메일이 보내지지 않을 때는 「파일로 저장」으로 받은 파일을 선생님께 보내 주세요.</p>');
  }
  function xpMsg(t, cl) {
    var m = document.querySelector('#xp .xp-msg');
    if (!m) return;
    m.textContent = t;
    m.className = 'xp-msg' + (cl ? ' ' + cl : '');
  }
  function errText(errs) {
    var k = G.ORDER.filter(function (t) { return errs && errs[t]; }).sort(function (a, b) { return errs[b] - errs[a]; });
    return k.length ? k.map(function (t) { return G.LABEL[t] + ' ' + errs[t]; }).join(', ') : '없음';
  }
  function reportText(nm, now, list) {
    var T = totals();
    var o = [
      '학생: ' + nm,
      '앱: SODA-Lehrwerk Diktattraining (받아쓰기 훈련)',
      '보낸 시각: ' + dstr(now),
      '끝낸 세트: ' + LEVELS.map(function (l) { var p = progressFor(l.code); return l.code + ' ' + p.done + '/' + p.total; }).join(' · '),
      '전체 평균: 1차 정확도 ' + T.a1 + '% · 최종 정확도 ' + T.a2 + '% (연습 ' + T.runs + '회, 문장 ' + T.sent + '개, ' + mins(T.secs) + ')',
      '1차에서 자주 틀린 종류: ' + errText(T.errs),
      '다시 쓸 문장: ' + LEVELS.map(function (l) { return l.code + ' ' + revCount(l.code); }).join(' · '),
      '', '==== 이번에 보내는 연습 ' + list.length + '회 ===='
    ];
    list.forEach(function (h) {
      o.push('', '[' + dstr(h.ts) + '] ' + (h.name || h.key) + ' · 문장 ' + h.n + '개 · 1차 ' + h.a1 + '% · 최종 ' + h.a2 + '% · 한 번에 맞힘 ' + h.hit + '개 · 듣기 ' + h.plays + '회 · ' + mins(h.secs || 0));
      o.push('  틀린 종류: ' + errText(h.errs));
      (h.wrong || []).forEach(function (w) {
        var it = BY_SENT[w.id];
        if (!it) return;
        var g = G.grade(it.de, w.in1 || '');
        o.push('  - 정답: ' + it.de, '    학생: ' + (w.in1 || '(쓰지 않음)') + '   [1차 ' + w.a1 + '% · ' + errText(g.errs.reduce(function (c, e) { c[e.type] = (c[e.type] || 0) + 1; return c; }, {})) + ']');
      });
    });
    return o.join('\n');
  }
  function nameFromModal() {
    var f = document.querySelector('#xp [data-xp-name]');
    return String(f ? f.value : '').replace(/\s+/g, ' ').trim();
  }
  function sendMail() {
    var f = document.querySelector('#xp [data-xp-name]'), nm = nameFromModal();
    var bt = document.querySelector('#xp [data-act="send"]');
    if (!nm) { xpMsg('이름을 입력하세요.', 'no'); if (f) f.focus(); return; }
    store(NAME_KEY, nm);
    if (!S.hist.length) { xpMsg('보낼 기록이 없어요.', 'no'); return; }
    var done = false, now = Date.now(), list = unsent();
    var tm = setTimeout(function () { fail('응답이 없어요. 인터넷 연결을 확인하고 다시 눌러 주세요.'); }, 60000);
    function fail(m) {
      if (done) return;
      done = true; clearTimeout(tm);
      if (bt) bt.disabled = false;
      xpMsg(m + ' 계속 안 되면 「파일로 저장」으로 받은 파일을 선생님께 보내 주세요.', 'no');
    }
    if (bt) bt.disabled = true;
    xpMsg('보내고 있어요…', '');
    var T = totals();
    var data = JSON.stringify({ app: 'diktattraining', format: 1, student: nm, sentAt: new Date(now).toISOString(),
      total: { runs: T.runs, sentences: T.sent, a1: T.a1, a2: T.a2, errs: T.errs }, sessions: list });
    var pl = { v: 1, kind: 'modelltest', app: 'lehrwerk', appName: 'Diktattraining', exam: 'Lehrwerk Diktattraining', mt: '기록', module: '학습 기록',
      name: nm, finished: dstr(now), used: '-', byTime: false, body: reportText(nm, now, list), speaking: null,
      count: list.length, data: data, page: location.href.split('#')[0] };
    try {
      fetch(SUBMIT_URL, { method: 'POST', body: JSON.stringify(pl) }).then(function (r) { return r.json(); }).then(function (j) {
        if (done) return;
        if (!j || !j.ok) { fail((j && j.message) || '보내지 못했어요.'); return; }
        done = true; clearTimeout(tm);
        if (bt) bt.disabled = false;
        S.sentAt = now; save();
        xpMsg(dstr(now) + ' 선생님께 메일로 보냈어요.', 'ok');
      }, function () { fail('서버에 연결하지 못했어요.'); });
    } catch (e) { fail('이 브라우저에서는 보낼 수 없어요.'); }
  }
  function fallbackCopy(txt) {
    var ta = document.querySelector('#xp [data-xp-text]');
    if (ta) { ta.hidden = false; ta.value = txt; ta.focus(); ta.select(); xpMsg('아래 내용을 길게 눌러 복사하세요.'); }
  }
  function recText() { return reportText(nameFromModal() || defaultName() || '학생', Date.now(), S.hist.slice(-30)); }
  function copyRec() {
    var txt = recText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { xpMsg('기록을 복사했어요.', 'ok'); }, function () { fallbackCopy(txt); });
    } else fallbackCopy(txt);
  }
  function saveRec() {
    var nm = nameFromModal() || defaultName() || '학생', txt = recText();
    if (nameFromModal()) store(NAME_KEY, nm);
    try {
      var b = new Blob([txt], { type: 'text/plain;charset=utf-8' }), u = URL.createObjectURL(b), a = document.createElement('a'), dd = new Date();
      a.href = u;
      a.download = (nm + ' Diktattraining ' + dd.getFullYear() + '-' + pad(dd.getMonth() + 1) + '-' + pad(dd.getDate())).replace(/[\\/:*?"<>|_]+/g, ' ').replace(/\s+/g, ' ').trim() + '.txt';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(u); }, 4000);
      xpMsg('파일을 저장했어요. 이 파일을 선생님께 보내세요.', 'ok');
    } catch (e) { fallbackCopy(txt); }
  }

  /* ───────── 입력 ───────── */
  function insertChar(k) {
    var ta = document.getElementById('dk-ta');
    if (!ta || ta.readOnly) return;
    var s = ta.selectionStart == null ? ta.value.length : ta.selectionStart, e = ta.selectionEnd == null ? s : ta.selectionEnd;
    if (k.length > 1 && s > 0 && !/\s$/.test(ta.value.slice(0, s))) k = ' ' + k;      // 이름은 앞 단어와 띄어서
    ta.value = ta.value.slice(0, s) + k + ta.value.slice(e);
    ta.focus();
    try { ta.setSelectionRange(s + k.length, s + k.length); } catch (x) {}
  }

  /* ───────── 이벤트 ───────── */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) {
      if (e.target.classList && e.target.classList.contains('xp')) closeModal();
      return;
    }
    var act = el.getAttribute('data-act');
    if (act === 'play') play();
    else if (act === 'slow') {
      S.slow = !S.slow; save();
      el.setAttribute('aria-pressed', String(!!S.slow));
      au.playbackRate = S.slow ? 0.8 : 1;
    } else if (act === 'ins') insertChar(el.getAttribute('data-k'));
    else if (act === 'check') check();
    else if (act === 'reveal') reveal();
    else if (act === 'next') next();
    else if (act === 'prev') prev();
    else if (act === 'again') { sess = null; startRun(state.route); window.scrollTo(0, 0); }
    else if (act === 'submit') openSubmit();
    else if (act === 'send') sendMail();
    else if (act === 'copyrec') copyRec();
    else if (act === 'saverec') saveRec();
    else if (act === 'xpclose') closeModal();
    else if (act === 'wipe') {
      if (!window.confirm('이 기기에 저장된 받아쓰기 기록을 모두 지울까요? 지운 기록은 되돌릴 수 없어요.')) return;
      S = { v: 1, sets: {}, prog: {}, rev: {}, hist: [], slow: S.slow };
      save(); updateProgress(); renderRecord();
    }
  });
  document.addEventListener('input', function (e) {
    if (e.target.matches && e.target.matches('[data-xp-name]')) store(NAME_KEY, e.target.value.replace(/\s+/g, ' ').trim());
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.getElementById('xp')) { closeModal(); return; }
    if (!sess || sess.phase === 'result' || document.getElementById('xp')) return;
    if (e.key !== 'Enter' || e.isComposing) return;
    var t = e.target, inTa = t && t.id === 'dk-ta';
    if (!inTa && t && t.closest && t.closest('button, a, input, textarea')) return;
    e.preventDefault();
    if (e.shiftKey) { play(); return; }
    if (sess.phase === 'done' || sess.back != null) next(); else check();
  });
  window.addEventListener('pagehide', persist);
  document.addEventListener('visibilitychange', function () { if (document.hidden) { persist(); stopAudio(); } });
  window.addEventListener('hashchange', function () { closeModal(); route(); });
  route();
})();
