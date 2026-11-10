/* SODA SCHREIBTRAINING · Sophia Deutsch Akademie */
(function () {
  'use strict';

  var LEVELS = [
    { code: 'A1', de: 'Anfänger', ko: '처음 쓰는 독일어', desc: '자기소개, 약속과 초대 메시지, 간단한 문의·예약 메일을 써요. 부르는 말과 끝인사부터 익혀요.' },
    { code: 'A2', de: 'Grundlegende Kenntnisse', ko: '생활 속 이메일', desc: '소식을 전하고, 고마움을 말하고, 묻고, 제안하는 생활 속 이메일을 써요.' },
    { code: 'B1', de: 'Fortgeschrittene Sprachverwendung', ko: '요구 사항에 맞춰 쓰기', desc: '시험처럼 요구 사항에 모두 답하는 개인 이메일, 반격식·격식 메일, 토론 글을 써요.' },
    { code: 'B2', de: 'Selbständige Sprachverwendung', ko: '격식 있는 글과 의견', desc: '항의 편지, 직장 메시지, 지원 편지와, 반대 의견까지 다루는 의견 글·독자 편지를 써요.' },
    { code: 'C1', de: 'Fachkundige Sprachkenntnisse', ko: '논증과 대학 글쓰기', desc: '논증문, 그래프 설명, 요약문과, 교수에게 쓰는 메일·지원 동기서를 써요.' }
  ];
  var LEVEL_BY = {};
  LEVELS.forEach(function (l) { LEVEL_BY[l.code] = l; });
  var TABS = [
    { id: 'aufbau', ko: '구성', de: 'Aufbau' },
    { id: 'redemittel', ko: '표현', de: 'Redemittel' },
    { id: 'uebung', ko: '연습', de: 'Übung' },
    { id: 'schreiben', ko: '쓰기', de: 'Schreiben' },
    { id: 'muster', ko: '모범답안', de: 'Muster' }
  ];
  var KIND = { mc: '고르기', fill: '빈칸 채우기', fix: '고쳐 쓰기' };
  var LETTERS = 'ABCDEFG';

  var DATA = window.SCHREIB_DATA || [];
  var BY_ID = {}, BY_LEVEL = {};
  DATA.forEach(function (c) {
    BY_ID[c.id] = c;
    (BY_LEVEL[c.level] = BY_LEVEL[c.level] || []).push(c);
  });

  var app = document.getElementById('app');
  var state = { route: null, scroll: {}, ueb: {}, showMuster: {}, openKo: {}, hideKo: false, peek: {}, taskKo: {}, timer: null };

  /* ───────── 유틸 ───────── */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function br(s) { return esc(s).replace(/\n/g, '<br>'); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function store(key, val) {
    try {
      if (val === undefined) return localStorage.getItem(key);
      if (val === null) localStorage.removeItem(key); else localStorage.setItem(key, val);
    } catch (e) { return null; }
    return null;
  }
  function jget(key, def) { try { var v = JSON.parse(store(key) || 'null'); return v == null ? def : v; } catch (e) { return def; } }
  function jset(key, v) { store(key, JSON.stringify(v)); }
  function countWords(t) {
    var m = String(t || '').split(/\s+/), n = 0;
    m.forEach(function (w) { if (/[A-Za-zÄÖÜäöüß0-9가-힣]/.test(w)) n++; });
    return n;
  }
  function dstr(t) {
    var d = new Date(t);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }
  function mmss(s) { s = Math.max(0, Math.round(s)); return pad(Math.floor(s / 60)) + ':' + pad(s % 60); }
  function code(c) { return c.level + ' ' + pad(c.no); }

  /* ───────── 저장: 쓴 글 · 점검 · 연습 · 제출 ───────── */
  var DRAFT = 'soda-schreib-draft:', SENT_KEY = 'soda-schreib-sent', UEB_KEY = 'soda-schreib-ueb', NAME_KEY = 'soda-schreib-name';
  /* 제출 주소: Modelltest 「선생님께 제출하기」와 Lesetraining·Hörtraining과 같은 Google Apps Script 웹 앱 */
  var SUBMIT_URL = 'https://script.google.com/macros/s/AKfycbxMAWjrhVgLqgKBYa3tZBIxbfnQ7Y1DYzmKO9fOonJbSdHE6_g1TDEXeykziZo1ujTt7g/exec';
  var memDraft = {};
  function draft(id) {
    var d = jget(DRAFT + id, null) || memDraft[id] || { text: '', check: [], secs: 0, ts: 0 };
    if (!Array.isArray(d.check)) d.check = [];
    return d;
  }
  function saveDraft(id, d) {
    d.ts = Date.now();
    memDraft[id] = d;
    try { localStorage.setItem(DRAFT + id, JSON.stringify(d)); } catch (e) {}
  }
  function sentMap() { return jget(SENT_KEY, {}) || {}; }
  function uebMap() { return jget(UEB_KEY, {}) || {}; }
  function defaultName() {
    var n = store(NAME_KEY);
    if (n) return n;
    var keys = ['soda-lese-name', 'soda-hoer-name'];
    for (var i = 0; i < keys.length; i++) { var v = store(keys[i]); if (v) return v; }
    return '';
  }
  function isDone(c) { return countWords(draft(c.id).text) >= c.words[0]; }

  /* ───────── 진행률 ───────── */
  function progressFor(lv) {
    var list = lv ? (BY_LEVEL[lv] || []) : DATA, done = 0;
    list.forEach(function (c) { if (isDone(c)) done++; });
    return { done: done, total: list.length, pct: list.length ? Math.round(done * 100 / list.length) : 0 };
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
    bar.querySelector('.lprog-l').innerHTML = '완성한 글' + (lv ? ' <b>' + lv + '</b>' : ' <b>전체</b>');
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
    mail: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="11" rx="2"/><path d="m3 5.5 7 5.5 7-5.5"/></svg>',
    copy: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M13 7V4.5A1.5 1.5 0 0 0 11.5 3h-7A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13H7"/></svg>',
    print: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 9V3.5h10V9"/><rect x="3.5" y="9" width="17" height="8" rx="2"/><path d="M7 14h10v6.5H7z"/></svg>',
    clock: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M10 6v4.2l2.8 1.8"/></svg>',
    pen: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.5 3.5l3 3L7 16H4v-3z"/><path d="M11.5 5.5l3 3"/></svg>',
    info: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M10 9v5M10 6.2v.1"/></svg>',
    eye: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.8 10S5 4.5 10 4.5 18.2 10 18.2 10 15 15.5 10 15.5 1.8 10 1.8 10z"/><circle cx="10" cy="10" r="2.5"/></svg>',
    file: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3v9M6.5 8.5 10 12l3.5-3.5"/><path d="M4 13v2.5c0 .8.7 1.5 1.5 1.5h9c.8 0 1.5-.7 1.5-1.5V13"/></svg>'
  };
  function brandTop(backHref, backLabel) {
    return '<div class="top"><a class="top-brand" href="#/levels" aria-label="레벨 선택으로">' +
      '<img src="assets/logo.png" alt=""><div><b>SODA SCHREIBTRAINING</b><span>Sophia Deutsch Akademie</span></div></a>' +
      '<a class="pill" href="' + backHref + '">' + ICON.left + esc(backLabel) + '</a></div>';
  }

  /* ───────── 라우팅 ───────── */
  function parse() {
    var p = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    if (!p.length) return { v: 'cover' };
    if (p[0] === 'levels') return { v: 'levels' };
    var lv = p[0].toUpperCase();
    if (!LEVEL_BY[lv]) return { v: 'cover' };
    if (p.length === 1) return { v: 'list', lv: lv };
    var id = lv.toLowerCase() + '-' + p[1];
    if (!BY_ID[id]) return { v: 'list', lv: lv };
    var tab = 'aufbau';
    TABS.forEach(function (t) { if (t.id === p[2]) tab = t.id; });
    return { v: 'chapter', lv: lv, no: p[1], id: id, tab: tab };
  }
  function routeKey(r) { return r.v + (r.lv || '') + (r.no || ''); }
  function route() {
    var r = parse(), prev = state.route;
    if (prev) state.scroll[routeKey(prev)] = window.scrollY;
    stopTimer();
    if (prev && r.v === 'chapter' && prev.v === 'chapter' && prev.id === r.id) {
      if (prev.tab !== r.tab) selectTab(r.tab, true);
      state.route = r;
      return;
    }
    state.route = r;
    updateProgress();
    if (r.v === 'cover') renderCover();
    else if (r.v === 'levels') renderLevels();
    else if (r.v === 'list') renderList(r.lv);
    else renderChapter(r);
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
    document.title = 'SODA SCHREIBTRAINING · Sophia Deutsch Akademie';
    app.innerHTML =
      '<main id="main" class="cover view" tabindex="-1" aria-labelledby="cover-title">' +
      '<header class="brand"><img src="assets/logo.png" alt="Sophia Deutsch Akademie 로고">' +
      '<div class="brand-t"><b>Sophia Deutsch Akademie</b><span>소피아 독일어학원</span></div></header>' +
      '<div class="hero"><h1 class="title" id="cover-title"><span class="t1">SODA</span><span class="t2 long">SCHREIBTRAINING</span></h1>' +
      '<a class="cta" href="#/levels">레벨 선택하기' + ICON.right + '</a></div>' +
      '<footer class="cover-foot"><span>Innovative Learning Beyond the Traditional</span>' +
      '<span>A1 – C1 · ' + DATA.length + ' Kapitel</span></footer></main>';
    settle(state.route);
  }

  /* ───────── 레벨 선택 ───────── */
  function renderLevels() {
    document.title = '레벨 선택 · SODA SCHREIBTRAINING';
    var cards = LEVELS.map(function (l, i) {
      var p = progressFor(l.code);
      return '<li><a class="lv" href="#/' + l.code.toLowerCase() + '" style="--i:' + i + '">' +
        '<span class="lv-code">' + l.code + '</span>' +
        '<div><div class="lv-de" lang="de">' + esc(l.de) + '</div><div class="lv-ko">' + esc(l.ko) + '</div>' +
        '<p class="lv-desc">' + esc(l.desc) + '</p></div>' +
        '<div class="lv-side">' + (p.done ? '<span class="lv-done">완성 ' + p.done + '개</span>' : '') +
        '<span class="arrow">' + ICON.arrowR + '</span></div></a></li>';
    }).join('');
    app.innerHTML = '<main id="main" class="page view" tabindex="-1">' + brandTop('#/', '표지') +
      '<div class="sec-h"><span class="kicker">STUFE</span><h1>레벨 선택</h1>' +
      '<p>챕터마다 글의 구성, 표현, 연습을 익힌 뒤 직접 쓰고 모범답안과 비교해요.</p></div>' +
      '<ul class="levels">' + cards + '</ul>' + submitInfoLink() + '</main>';
    settle(state.route);
  }

  /* ───────── 챕터 목록 ───────── */
  function statusMeta(c) {
    var sent = sentMap()[c.id], d = draft(c.id), w = countWords(d.text);
    if (sent) return '<span class="meta done">' + ICON.ok + '제출함</span>';
    if (w >= c.words[0]) return '<span class="meta done">' + ICON.ok + '완성 · ' + w + '단어</span>';
    if (w) return '<span class="meta">쓰는 중 · ' + w + '단어</span>';
    return '';
  }
  function renderList(lv) {
    var L = LEVEL_BY[lv], items = BY_LEVEL[lv] || [];
    document.title = lv + ' · SODA SCHREIBTRAINING';
    var cards = items.map(function (c, i) {
      return '<li><a class="card" href="#/' + lv.toLowerCase() + '/' + pad(c.no) + '" style="--i:' + i + '">' +
        '<div class="card-top"><span class="num">' + pad(c.no) + '</span><span class="chip" title="' + esc(c.type) + '">' + esc(c.typeKo) + '</span></div>' +
        '<h2 class="card-de de" lang="de">' + esc(c.title) + '</h2>' +
        '<p class="card-ko">' + esc(c.titleKo) + '</p>' +
        '<div class="card-foot"><span class="tag">' + c.words[0] + '–' + c.words[1] + '단어</span><span class="tag">' + c.time + '분</span>' + statusMeta(c) + '</div></a></li>';
    }).join('');
    app.innerHTML = '<main id="main" class="page view" tabindex="-1">' + brandTop('#/levels', '레벨') +
      '<div class="sec-h"><div class="lvhead"><span class="lv-code">' + lv + '</span>' +
      '<div><span class="kicker" lang="de">' + esc(L.de.toUpperCase()) + '</span><h1>' + esc(L.ko) + '</h1></div></div>' +
      '<p>' + esc(L.desc) + '</p></div>' +
      (items.length ? '<ul class="grid">' + cards + '</ul>' : '<p class="empty">아직 챕터가 없어요.</p>') + submitInfoLink() + '</main>';
    settle(state.route);
  }
  function submitInfoLink() {
    return '<div class="actions sub-info"><button class="btn sec" data-act="subinfo">' + ICON.info + '선생님께 제출하기 안내</button></div>';
  }

  /* ───────── 챕터 화면 ───────── */
  function renderChapter(r) {
    var c = BY_ID[r.id], lc = c.level.toLowerCase(), list = BY_LEVEL[c.level], idx = list.indexOf(c);
    var prev = list[idx - 1], next = list[idx + 1];
    document.title = c.title + ' · ' + c.level + ' · SODA SCHREIBTRAINING';
    app.innerHTML =
      '<header class="rd-top"><div class="rd-top-in">' +
      '<a class="pill" href="#/' + lc + '">' + ICON.left + c.level + ' 목록</a>' +
      '<div class="rd-where">' + code(c) + '</div>' +
      '<div class="tools"><button class="ibtn" data-act="smaller" aria-label="글자 작게" title="글자 작게">가<small>−</small></button>' +
      '<button class="ibtn" data-act="bigger" aria-label="글자 크게" title="글자 크게">가<small>+</small></button>' +
      '<button class="ibtn" data-act="print" aria-label="과제지 인쇄" title="과제지 인쇄">' + ICON.print + '</button></div>' +
      '</div></header>' +
      '<main id="main" class="rd view" tabindex="-1">' +
      '<div class="rd-head"><div class="rd-type"><span class="chip" lang="de">' + esc(c.type) + '</span>' +
      '<span class="tag">' + esc(c.typeKo) + '</span></div>' +
      '<h1 class="rd-title" lang="de">' + esc(c.title) + '</h1>' +
      '<p class="rd-title-ko">' + esc(c.titleKo) + '</p>' +
      '<div class="rd-meta"><span>' + ICON.pen + c.words[0] + '–' + c.words[1] + '단어</span><span>' + ICON.clock + '권장 ' + c.time + '분</span><span>' + esc(c.exam) + '</span></div>' +
      '</div>' +
      '<nav class="tabs" aria-label="학습 메뉴"><div class="tablist st-tabs" role="tablist">' +
      TABS.map(function (x) {
        return '<button class="tab" role="tab" id="tab-' + x.id + '" aria-controls="panel-' + x.id + '" data-act="tab" data-tab="' + x.id + '">' +
          x.ko + '<small lang="de">' + x.de + '</small></button>';
      }).join('') + '</div></nav>' +
      '<section class="panel" role="tabpanel" id="panel-aufbau" aria-labelledby="tab-aufbau">' + aufbauPanel(c) + '</section>' +
      '<section class="panel" role="tabpanel" id="panel-redemittel" aria-labelledby="tab-redemittel">' + redePanel(c) + '</section>' +
      '<section class="panel" role="tabpanel" id="panel-uebung" aria-labelledby="tab-uebung">' + uebPanel(c) + '</section>' +
      '<section class="panel" role="tabpanel" id="panel-schreiben" aria-labelledby="tab-schreiben">' + writePanel(c) + '</section>' +
      '<section class="panel" role="tabpanel" id="panel-muster" aria-labelledby="tab-muster">' + musterPanel(c) + '</section>' +
      '<nav class="pager" aria-label="다른 챕터">' +
      (prev ? '<a class="pg prev" href="#/' + lc + '/' + pad(prev.no) + '"><small>← 이전 챕터</small><b lang="de">' + esc(prev.title) + '</b></a>' : '') +
      (next ? '<a class="pg next" href="#/' + lc + '/' + pad(next.no) + '"><small>다음 챕터 →</small><b lang="de">' + esc(next.title) + '</b></a>' : '') +
      '</nav></main>';
    selectTab(r.tab, false);
    restoreUeb(c);
    updateWriteInfo(c);
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
    if (id !== 'schreiben') stopTimer();
    if (id === 'muster') refreshMine();
    if (scroll) {
      var tabs = document.querySelector('.tabs');
      if (tabs) {
        var off = (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--top-h'), 10) || 60) +
          (document.documentElement.classList.contains('has-prog') ? (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pg-h'), 10) || 58) : 0);
        var top = tabs.getBoundingClientRect().top + window.scrollY - off;
        if (window.scrollY > top) window.scrollTo(0, top);
      }
    }
  }
  function setTab(id) {
    var r = state.route;
    if (!r || r.v !== 'chapter') return;
    var hash = '#/' + r.lv.toLowerCase() + '/' + r.no + (id === 'aufbau' ? '' : '/' + id);
    if (history.replaceState) history.replaceState(null, '', hash);
    state.route = { v: 'chapter', lv: r.lv, no: r.no, id: r.id, tab: id };
    selectTab(id, true);
  }
  function cur() { var r = state.route; return r && r.v === 'chapter' ? BY_ID[r.id] : null; }

  /* 구성 */
  function aufbauPanel(c) {
    return '<p class="intro"><b>이 챕터에서는</b>' + esc(c.intro) + '</p>' +
      '<div class="st-box"><h2 class="st-h">목표</h2><ul class="st-goals">' +
      c.goals.map(function (g) { return '<li>' + ICON.ok + '<span>' + esc(g) + '</span></li>'; }).join('') + '</ul></div>' +
      '<div class="st-box"><h2 class="st-h">글의 구성 <small lang="de">Aufbau</small></h2><ol class="st-steps">' +
      c.aufbau.map(function (a, i) {
        return '<li><span class="st-n">' + (i + 1) + '</span><div><div class="st-name"><b>' + esc(a.ko) + '</b><span lang="de">' + esc(a.de) + '</span></div>' +
          '<p class="st-ex de" lang="de">' + br(a.ex) + '</p></div></li>';
      }).join('') + '</ol></div>' +
      '<div class="st-box"><h2 class="st-h">쓰기 요령</h2>' +
      c.tipps.map(function (t) { return '<p class="tip"><b>TIP</b><span>' + esc(t) + '</span></p>'; }).join('') + '</div>' +
      '<div class="st-box"><h2 class="st-h">자주 하는 실수</h2><ul class="st-err">' +
      c.fehler.map(function (f) {
        return '<li><p class="st-f de" lang="de"><span class="st-x">' + ICON.no + '</span><s>' + esc(f.f) + '</s></p>' +
          '<p class="st-r de" lang="de"><span class="st-o">' + ICON.ok + '</span>' + esc(f.r) + '</p>' +
          '<p class="st-e">' + esc(f.e) + '</p></li>';
      }).join('') + '</ul></div>' +
      '<div class="actions"><button class="btn pri" data-act="go" data-tab="redemittel">표현 익히기' + ICON.arrowR + '</button></div>';
  }

  /* 표현 */
  function redePanel(c) {
    var on = state.hideKo;
    return '<div class="bar"><p class="hint">뜻을 가리고 독일어만 보며 떠올려 보세요. 가린 줄을 누르면 뜻이 보여요.</p>' +
      '<button class="toggle" data-act="hideko" aria-pressed="' + on + '"><span class="dot"></span>뜻 가리기</button></div>' +
      '<div class="rede' + (on ? ' hide-ko' : '') + '" id="rede">' +
      c.redemittel.map(function (g, gi) {
        return '<div class="vsec"><h3>' + esc(g.g) + '</h3><ul class="vlist">' +
          g.items.map(function (it, ii) {
            return '<li><button class="vrow" data-act="peek" data-k="' + gi + '-' + ii + '"><span class="vde" lang="de">' + esc(it[0]) + '</span><span class="vko">' + esc(it[1]) + '</span></button></li>';
          }).join('') + '</ul></div>';
      }).join('') + '</div>' +
      '<div class="actions"><button class="btn pri" data-act="go" data-tab="uebung">연습 문제 풀기' + ICON.arrowR + '</button></div>';
  }

  /* 연습 */
  function uebPanel(c) {
    var qs = c.uebung.map(function (q, i) {
      var body = '';
      if (q.t === 'mc') {
        body = '<p class="q-t q-ko">' + esc(q.q) + '</p><div class="opts">' +
          q.o.map(function (o, j) {
            return '<button class="opt" data-act="pick" data-q="' + i + '" data-j="' + j + '" aria-pressed="false"><span class="k">' + LETTERS[j] + '</span><span lang="de">' + esc(o) + '</span></button>';
          }).join('') + '</div>';
      } else if (q.t === 'fill') {
        var parts = String(q.q).split('___');
        body = '<p class="q-t de" lang="de">' + esc(parts[0]) +
          '<input class="st-in" data-q="' + i + '" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="빈칸 ' + (i + 1) + '">' +
          esc(parts.slice(1).join('___')) + '</p>' +
          '<div class="st-qa"><button class="btn sec st-chk" data-act="check" data-q="' + i + '">확인</button></div>';
      } else {
        body = '<p class="st-wrong de" lang="de"><span>틀린 문장</span>' + esc(q.q) + '</p>' +
          '<textarea class="st-in st-fix" data-q="' + i + '" rows="2" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="고친 문장 ' + (i + 1) + '">' + esc(q.q) + '</textarea>' +
          '<div class="st-qa"><button class="btn sec st-chk" data-act="check" data-q="' + i + '">확인</button></div>';
      }
      return '<div class="q" id="q-' + i + '"><div class="q-h"><span class="q-no">' + (i + 1) + '</span><span class="q-kind">' + KIND[q.t] + '</span></div>' +
        body + '<div class="fb" hidden></div></div>';
    }).join('');
    return '<div class="bar"><p class="hint">고르기는 누르면 바로 채점돼요. 빈칸과 고쳐 쓰기는 답을 쓰고 「확인」을 누르세요.</p></div>' +
      '<div class="qs">' + qs + '</div>' +
      '<div class="score st-score" id="ueb-score" hidden></div>' +
      '<div class="actions"><button class="btn sec" data-act="uebreset">다시 풀기</button>' +
      '<button class="btn pri" data-act="go" data-tab="schreiben">직접 써 보기' + ICON.arrowR + '</button></div>';
  }
  function norm(s) {
    return String(s || '').replace(/[„“”"]/g, '"').replace(/[‚‘’']/g, "'").replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim().replace(/\s*([.!?])+$/, '').replace(/\s+([,;:])/g, '$1');
  }
  function uebState(c) { return state.ueb[c.id] || (state.ueb[c.id] = {}); }
  function gradeMc(c, i, j) {
    var st = uebState(c);
    if (st[i]) return;
    st[i] = { ok: j === c.uebung[i].a, pick: j };
    showQ(c, i);
    afterAnswer(c);
  }
  function gradeText(c, i) {
    var st = uebState(c), q = c.uebung[i];
    if (st[i]) return;
    var el = document.querySelector('#q-' + i + ' .st-in');
    if (!el) return;
    var v = el.value;
    if (!norm(v)) { el.focus(); return; }
    var ok = q.a.some(function (a) { return norm(a) === norm(v); });
    st[i] = { ok: ok, val: v };
    showQ(c, i);
    afterAnswer(c);
  }
  function showQ(c, i) {
    var st = uebState(c)[i], q = c.uebung[i], box = document.getElementById('q-' + i);
    if (!st || !box) return;
    box.classList.add('graded');
    if (q.t === 'mc') {
      box.querySelectorAll('.opt').forEach(function (b) {
        var j = +b.getAttribute('data-j');
        b.setAttribute('aria-pressed', j === st.pick ? 'true' : 'false');
        b.disabled = true;
        if (j === q.a) b.classList.add('is-ok');
        else if (j === st.pick) b.classList.add('is-no');
      });
    } else {
      var el = box.querySelector('.st-in');
      if (el) { el.value = st.val; el.readOnly = true; el.classList.add(st.ok ? 'is-ok' : 'is-no'); }
      var b = box.querySelector('.st-chk');
      if (b) b.hidden = true;
    }
    var fb = box.querySelector('.fb');
    fb.hidden = false;
    fb.innerHTML = '<div class="fb-res ' + (st.ok ? 'ok' : 'no') + '">' + (st.ok ? ICON.ok + '맞았어요' : ICON.no + '다시 확인해요') + '</div>' +
      (q.t !== 'mc' ? '<span class="fb-l">정답</span><p class="fb-ev de" lang="de">' + q.a.map(esc).join('<br>') + '</p>' : '') +
      '<p class="st-why">' + esc(q.e) + '</p>';
  }
  function afterAnswer(c) {
    var st = uebState(c), n = c.uebung.length, done = 0, r = 0;
    for (var i = 0; i < n; i++) if (st[i]) { done++; if (st[i].ok) r++; }
    var sc = document.getElementById('ueb-score');
    if (done === n) {
      var m = uebMap(), old = m[c.id];
      if (!old || r >= old.r) { m[c.id] = { r: r, n: n }; jset(UEB_KEY, m); }
      if (sc) {
        sc.hidden = false;
        sc.innerHTML = '<div><span>연습 결과</span><br><b>' + r + ' / ' + n + '</b></div><span>' +
          (r === n ? '모두 맞았어요. 이제 직접 써 보세요.' : '틀린 문제의 설명을 다시 읽고 쓰기로 넘어가세요.') + '</span>';
      }
    } else if (sc) sc.hidden = true;
  }
  function restoreUeb(c) {
    var st = state.ueb[c.id];
    if (!st) return;
    Object.keys(st).forEach(function (i) { showQ(c, +i); });
    afterAnswer(c);
  }

  /* 쓰기 */
  function chartHtml(ch) {
    var max = 50;
    return '<figure class="st-chart"><figcaption><b lang="de">' + esc(ch.title) + '</b><span lang="de">' + esc(ch.unit) + '</span></figcaption>' +
      '<div class="st-legend">' + ch.series.map(function (s, k) { return '<span><i class="s' + k + '"></i>' + esc(s) + '</span>'; }).join('') + '</div>' +
      '<ul class="st-bars">' + ch.rows.map(function (row) {
        return '<li><div class="st-bl"><b lang="de">' + esc(row.label) + '</b><small>' + esc(row.ko) + '</small></div><div class="st-bv">' +
          row.v.map(function (v, k) {
            return '<div class="st-b"><i class="s' + k + '" style="width:' + (v / max * 100) + '%"></i><span>' + v + ' %</span></div>';
          }).join('') + '</div></li>';
      }).join('') + '</ul><p class="st-src" lang="de">' + esc(ch.source) + '</p></figure>';
  }
  function taskHtml(c, withKo) {
    var A = c.aufgabe, K = A.ko;
    return '<div class="st-task" lang="de">' +
      '<p class="st-lead de">' + br(A.lead) + '</p>' +
      (A.brief ? '<blockquote class="st-brief de">' + br(A.brief) + '</blockquote>' : '') +
      (A.chart ? chartHtml(A.chart) : '') +
      '<ul class="st-punkte de">' + A.punkte.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' +
      '<p class="st-close de">' + esc(A.close) + '</p></div>' +
      (withKo ? '<div class="st-task-ko" lang="ko"' + (state.taskKo[c.id] ? '' : ' hidden') + ' id="task-ko">' +
        '<p>' + br(K.lead) + '</p>' + (K.brief ? '<blockquote>' + br(K.brief) + '</blockquote>' : '') +
        '<ul>' + K.punkte.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul><p>' + esc(K.close) + '</p></div>' : '');
  }
  function writePanel(c) {
    var d = draft(c.id), sent = sentMap()[c.id];
    return '<div class="st-box st-aufgabe"><div class="st-ah"><h2 class="st-h">과제 <small lang="de">Aufgabe</small></h2>' +
      '<button class="toggle" data-act="taskko" aria-pressed="' + !!state.taskKo[c.id] + '"><span class="dot"></span>해석 보기</button></div>' +
      taskHtml(c, true) + '</div>' +
      '<div class="st-box st-write"><div class="st-wh"><h2 class="st-h">내 글</h2>' +
      '<div class="st-timer"><span class="st-tv" id="st-tv">' + ICON.clock + '<b>' + mmss(d.secs || 0) + '</b> / ' + c.time + '분</span>' +
      '<button class="pill" data-act="timer" id="st-tbtn">' + (d.secs ? '이어서 재기' : '시간 재기') + '</button></div></div>' +
      '<textarea class="st-ta de" id="st-ta" lang="de" spellcheck="false" autocapitalize="sentences" placeholder="여기에 독일어로 쓰세요. 쓰는 내용은 이 기기에 자동으로 저장돼요." aria-label="내 글">' + esc(d.text) + '</textarea>' +
      '<div class="st-wc"><span id="st-wc"></span><span class="st-saved" id="st-saved" aria-live="polite"></span></div>' +
      '<div class="st-kb" aria-label="특수 문자 넣기">' + ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü', '„', '“', '–'].map(function (k) {
        return '<button type="button" data-act="ins" data-k="' + k + '" aria-label="' + k + ' 넣기">' + k + '</button>';
      }).join('') + '</div></div>' +
      '<div class="st-box"><h2 class="st-h">스스로 점검하기</h2><ul class="st-check">' +
      c.check.map(function (t, i) {
        return '<li><label><input type="checkbox" data-act="chk" data-i="' + i + '"' + (d.check[i] ? ' checked' : '') + '><span>' + esc(t) + '</span></label></li>';
      }).join('') + '</ul></div>' +
      '<div class="st-submit">' +
      '<button class="btn pri" data-act="submit">' + ICON.mail + '선생님께 제출하기</button>' +
      '<button class="btn sec" data-act="copytext">' + ICON.copy + '글 복사</button>' +
      '<p class="st-sent" id="st-sent">' + (sent ? '마지막 제출: ' + dstr(sent) : '') + '</p>' +
      '<p class="st-note">' + ICON.info + '<span>제출하기는 소피아 독일어학원 수강생을 위한 기능이에요. 누르면 안내가 먼저 나와요.</span></p></div>' +
      '<div class="actions"><button class="btn sec" data-act="clear">글 지우기</button>' +
      '<button class="btn pri" data-act="go" data-tab="muster">모범답안과 비교하기' + ICON.arrowR + '</button></div>';
  }
  function updateWriteInfo(c) {
    var ta = document.getElementById('st-ta'), wc = document.getElementById('st-wc');
    if (!ta || !wc) return;
    var n = countWords(ta.value), cls = n === 0 ? '' : n < c.words[0] ? 'low' : n > c.words[1] ? 'high' : 'ok';
    var msg = n === 0 ? '권장 ' + c.words[0] + '–' + c.words[1] + '단어' :
      n < c.words[0] ? '권장까지 ' + (c.words[0] - n) + '단어 더' : n > c.words[1] ? '권장보다 ' + (n - c.words[1]) + '단어 많아요' : '권장 분량이에요';
    wc.className = 'st-wcn ' + cls;
    wc.innerHTML = '<b>' + n + '</b>단어 · ' + msg;
  }
  var saveT = null;
  function onType(c) {
    updateWriteInfo(c);
    clearTimeout(saveT);
    var sv = document.getElementById('st-saved');
    if (sv) sv.textContent = '';
    saveT = setTimeout(function () {
      var ta = document.getElementById('st-ta');
      if (!ta) return;
      var d = draft(c.id);
      d.text = ta.value;
      saveDraft(c.id, d);
      if (sv) sv.textContent = '저장됨';
      updateProgress();
    }, 400);
  }
  function flushSave() {
    var c = cur(), ta = document.getElementById('st-ta');
    if (!c || !ta) return;
    clearTimeout(saveT);
    var d = draft(c.id);
    if (d.text !== ta.value) { d.text = ta.value; saveDraft(c.id, d); }
  }
  /* 타이머 */
  function startTimer() {
    var c = cur();
    if (!c) return;
    if (state.timer) { stopTimer(); return; }
    var d = draft(c.id), t0 = Date.now(), base = d.secs || 0;
    var btn = document.getElementById('st-tbtn');
    if (btn) { btn.textContent = '멈추기'; btn.classList.add('on'); }
    state.timer = { id: c.id, iv: setInterval(function () {
      var s = base + (Date.now() - t0) / 1000, tv = document.querySelector('#st-tv b');
      if (tv) tv.textContent = mmss(s);
      var box = document.getElementById('st-tv');
      if (box) box.classList.toggle('over', s > c.time * 60);
      state.timer.secs = s;
    }, 500), secs: base };
  }
  function stopTimer() {
    var t = state.timer;
    if (!t) return;
    clearInterval(t.iv);
    state.timer = null;
    var d = draft(t.id);
    d.secs = Math.round(t.secs || d.secs || 0);
    var ta = document.getElementById('st-ta');
    if (ta && cur() && cur().id === t.id) d.text = ta.value;
    saveDraft(t.id, d);
    var btn = document.getElementById('st-tbtn');
    if (btn) { btn.textContent = '이어서 재기'; btn.classList.remove('on'); }
  }
  function insertChar(k) {
    var ta = document.getElementById('st-ta');
    if (!ta) return;
    var s = ta.selectionStart || 0, e = ta.selectionEnd || 0;
    ta.value = ta.value.slice(0, s) + k + ta.value.slice(e);
    ta.focus();
    try { ta.setSelectionRange(s + k.length, s + k.length); } catch (x) {}
    onType(cur());
  }

  /* 모범답안 */
  function musterPanel(c) {
    var on = !!state.showMuster[c.id], M = c.muster;
    var wn = countWords(M.de.join(' '));
    return '<div class="st-gate" id="st-gate"' + (on ? ' hidden' : '') + '>' +
      '<p><b>먼저 직접 써 보세요.</b> 내 글을 다 쓴 뒤에 모범답안과 비교하면 무엇을 고쳐야 할지 더 잘 보여요.</p>' +
      '<button class="btn pri" data-act="showmuster">' + ICON.eye + '모범답안 보기</button></div>' +
      '<div id="st-muster"' + (on ? '' : ' hidden') + '>' +
      '<div class="bar"><p class="hint">단락 아래 「해석」을 누르면 한국어 해석이 보여요. 모범답안 ' + wn + '단어</p></div>' +
      '<article class="text st-letter" lang="de">' + M.de.map(function (p, i) {
        var open = state.openKo[c.id + ':' + i];
        var short = p.length < 40;
        return '<div class="para' + (open ? ' open' : '') + (short ? ' st-short' : '') + '" id="mp-' + i + '"><p class="pde">' + br(p) + '</p>' +
          (short ? '' : '<button class="pbtn" data-act="mko" data-i="' + i + '" aria-expanded="' + (open ? 'true' : 'false') + '">해석</button>') +
          '<p class="pko" lang="ko">' + br(M.ko[i] || '') + '</p></div>';
      }).join('') + '</article>' +
      '<div class="st-box"><h2 class="st-h">이 답안의 포인트</h2><ul class="st-notes">' +
      M.notes.map(function (n) { return '<li><p class="de" lang="de">' + esc(n.de) + '</p><p>' + esc(n.ko) + '</p></li>'; }).join('') + '</ul></div>' +
      '<div class="st-box st-mine"><h2 class="st-h">내 글</h2><div id="st-mine"></div></div>' +
      '</div>';
  }
  function refreshMine() {
    var c = cur(), box = document.getElementById('st-mine');
    if (!c || !box) return;
    flushSave();
    var t = draft(c.id).text;
    box.innerHTML = t.trim() ? '<p class="st-mine-t de" lang="de">' + br(t) + '</p><p class="st-mine-n">' + countWords(t) + '단어</p>' :
      '<p class="st-empty">아직 쓴 글이 없어요. 「쓰기」 탭에서 먼저 써 보세요.</p>';
  }

  /* ───────── 제출하기 (소피아 독일어학원 수강생 전용 안내 팝업) ───────── */
  var mFrom = null;
  function closeModal() {
    var b = document.getElementById('xp');
    if (!b) return;
    b.parentNode.removeChild(b);
    if (mFrom && mFrom.focus && document.body.contains(mFrom)) mFrom.focus();
    mFrom = null;
  }
  function openModal(html, label) {
    closeModal();
    mFrom = document.activeElement;
    var box = document.createElement('div');
    box.className = 'xp';
    box.id = 'xp';
    box.innerHTML = '<div class="xp-in" role="dialog" aria-modal="true" aria-labelledby="xp-t">' + html +
      '<button class="xp-x" data-act="xpclose" aria-label="닫기">닫기</button></div>';
    document.body.appendChild(box);
    var f = box.querySelector(label || 'h2');
    if (f) { if (!f.hasAttribute('tabindex') && f.tagName === 'H2') f.setAttribute('tabindex', '-1'); try { f.focus({ preventScroll: true }); } catch (e) { f.focus(); } }
  }
  var NOTICE = '<div class="st-only"><span class="st-only-i">' + ICON.info + '</span><div>' +
    '<b>소피아 독일어학원 수강생을 위한 기능이에요.</b>' +
    '<p>제출한 글은 소피아 독일어학원 선생님 메일로 바로 가고, 선생님이 읽고 첨삭해요. 메일 제목에 적힌 이름으로 수강생인지 확인하니 이름을 정확히 적어 주세요.</p>' +
    '<p>수강생이 아니어도 구성, 표현, 연습, 쓰기, 모범답안은 모두 자유롭게 쓸 수 있어요. 쓴 글은 「글 복사」나 「파일로 저장」으로 보관하세요.</p>' +
    '</div></div>';
  function openInfo() {
    openModal('<h2 id="xp-t">선생님께 제출하기 안내</h2>' + NOTICE +
      '<ol class="st-how"><li>챕터의 「쓰기」 탭에서 글을 써요.</li><li>「선생님께 제출하기」를 누르고 이름을 적어요.</li><li>「메일로 제출하기」를 누르면 글, 단어 수, 쓴 시간, 스스로 점검 결과가 함께 가요.</li></ol>' +
      '<button class="btn pri xp-mail" data-act="xpclose">확인</button>');
  }
  function openSubmit() {
    var c = cur();
    if (!c) return;
    flushSave();
    stopTimer();
    var d = draft(c.id), n = countWords(d.text), ck = d.check.filter(Boolean).length, sent = sentMap()[c.id];
    var has = !!d.text.trim();
    openModal('<h2 id="xp-t">선생님께 제출하기</h2>' + NOTICE +
      '<div class="st-sum"><p class="st-sum-t"><b>' + code(c) + '</b> <span lang="de">' + esc(c.title) + '</span></p>' +
      '<ul><li><span>단어 수</span><b>' + n + '</b><small>권장 ' + c.words[0] + '–' + c.words[1] + '</small></li>' +
      '<li><span>쓴 시간</span><b>' + (d.secs ? Math.max(1, Math.round(d.secs / 60)) + '분' : '–') + '</b><small>권장 ' + c.time + '분</small></li>' +
      '<li><span>스스로 점검</span><b>' + ck + ' / ' + c.check.length + '</b><small>항목</small></li></ul>' +
      (!has ? '<p class="st-warn">아직 쓴 글이 없어요. 「쓰기」 탭에서 글을 쓴 뒤 제출하세요.</p>' :
        n < c.words[0] ? '<p class="st-warn">권장 단어 수보다 적어요. 그대로 제출해도 돼요.</p>' : '') + '</div>' +
      '<label class="xp-name"><span>이름</span><input type="text" data-xp-name placeholder="이름" autocomplete="name" value="' + esc(defaultName()) + '"></label>' +
      '<button class="btn pri xp-mail" data-act="send"' + (has ? '' : ' disabled') + '>' + ICON.mail + '메일로 제출하기</button>' +
      '<p class="xp-msg" aria-live="polite">' + (sent ? '마지막 제출: ' + dstr(sent) : '') + '</p>' +
      '<div class="xp-b"><button class="btn sec" data-act="copytext"' + (has ? '' : ' disabled') + '>글 복사</button>' +
      '<button class="btn sec" data-act="savefile"' + (has ? '' : ' disabled') + '>파일로 저장</button></div>' +
      '<textarea class="xp-ta" data-xp-text readonly hidden aria-label="제출 내용"></textarea>' +
      '<p class="xp-note">메일이 보내지지 않을 때는 「파일로 저장」으로 받은 파일을 선생님께 보내 주세요.</p>');
  }
  function xpMsg(t, cl) {
    var m = document.querySelector('#xp .xp-msg');
    if (!m) { flash(t); return; }
    m.textContent = t;
    m.className = 'xp-msg' + (cl ? ' ' + cl : '');
  }
  function flash(t) {
    var m = document.getElementById('st-sent');
    if (m) m.textContent = t;
  }
  function reportText(c, nm, now) {
    var d = draft(c.id), A = c.aufgabe, ub = uebMap()[c.id];
    var o = [
      '학생: ' + nm,
      '앱: SODA-Lehrwerk Schreibtraining (쓰기 훈련)',
      '챕터: ' + code(c) + ' · ' + c.title + ' (' + c.titleKo + ')',
      '유형: ' + c.type + ' · ' + c.exam,
      '보낸 시각: ' + dstr(now),
      '단어 수: ' + countWords(d.text) + ' (권장 ' + c.words[0] + '–' + c.words[1] + ')',
      '쓴 시간: ' + (d.secs ? Math.max(1, Math.round(d.secs / 60)) + '분' : '재지 않음') + ' (권장 ' + c.time + '분)',
      '연습 문제: ' + (ub ? ub.r + ' / ' + ub.n : '풀지 않음'),
      '', '==== 과제 ====', A.lead
    ];
    if (A.brief) o.push('', A.brief);
    A.punkte.forEach(function (p) { o.push('– ' + p); });
    o.push(A.close, '', '==== 학생 글 ====', d.text.trim(), '', '==== 스스로 점검 ====');
    c.check.forEach(function (t, i) { o.push((d.check[i] ? '[v] ' : '[ ] ') + t); });
    return o.join('\n');
  }
  function sendMail() {
    var c = cur();
    if (!c) return;
    var f = document.querySelector('#xp [data-xp-name]'), nm = String(f ? f.value : '').replace(/\s+/g, ' ').trim();
    var bt = document.querySelector('#xp [data-act="send"]');
    if (!nm) { xpMsg('이름을 입력하세요.', 'no'); if (f) f.focus(); return; }
    store(NAME_KEY, nm);
    var d = draft(c.id);
    if (!d.text.trim()) { xpMsg('보낼 글이 없어요.', 'no'); return; }
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
    var body = reportText(c, nm, now);
    var data = JSON.stringify({ app: 'schreibtraining', format: 1, chapter: c.id, level: c.level, no: c.no, title: c.title,
      student: nm, sentAt: new Date(now).toISOString(), words: countWords(d.text), secs: Math.round(d.secs || 0),
      check: c.check.map(function (t, i) { return { item: t, done: !!d.check[i] }; }), uebung: uebMap()[c.id] || null, text: d.text });
    var pl = { v: 1, kind: 'modelltest', app: 'lehrwerk', appName: 'Schreibtraining ' + c.level + '-' + pad(c.no),
      exam: 'Lehrwerk Schreibtraining', mt: c.level + '-' + pad(c.no), module: '쓰기 답안', name: nm, finished: dstr(now),
      used: d.secs ? Math.max(1, Math.round(d.secs / 60)) + '분' : '-', byTime: false, body: body, speaking: null,
      count: 1, data: data, page: location.href.split('#')[0] };
    try {
      fetch(SUBMIT_URL, { method: 'POST', body: JSON.stringify(pl) }).then(function (r) { return r.json(); }).then(function (j) {
        if (done) return;
        if (!j || !j.ok) { fail((j && j.message) || '보내지 못했어요.'); return; }
        done = true; clearTimeout(tm);
        if (bt) bt.disabled = false;
        var m = sentMap(); m[c.id] = now; jset(SENT_KEY, m);
        xpMsg(dstr(now) + ' 선생님께 메일로 제출했어요.', 'ok');
        flash('마지막 제출: ' + dstr(now));
      }, function () { fail('서버에 연결하지 못했어요.'); });
    } catch (e) { fail('이 브라우저에서는 보낼 수 없어요.'); }
  }
  function plainText(c) {
    flushSave();
    var d = draft(c.id);
    return code(c) + ' · ' + c.title + '\n\n' + d.text.trim() + '\n\n(' + countWords(d.text) + '단어)';
  }
  function copyText() {
    var c = cur();
    if (!c) return;
    var txt = plainText(c), ok = function () { xpMsg('글을 복사했어요.', 'ok'); };
    if (!draft(c.id).text.trim()) { xpMsg('복사할 글이 없어요.', 'no'); return; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(ok, function () { fallbackCopy(txt); });
    } else fallbackCopy(txt);
  }
  function fallbackCopy(txt) {
    var ta = document.querySelector('#xp [data-xp-text]');
    if (ta) { ta.hidden = false; ta.value = txt; ta.focus(); ta.select(); xpMsg('아래 내용을 길게 눌러 복사하세요.'); return; }
    var t = document.createElement('textarea');
    t.value = txt; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(t);
    xpMsg(ok ? '글을 복사했어요.' : '복사하지 못했어요. 글을 길게 눌러 직접 복사하세요.', ok ? 'ok' : 'no');
  }
  function saveFile() {
    var c = cur();
    if (!c) return;
    var f = document.querySelector('#xp [data-xp-name]'), nm = String(f ? f.value : '').replace(/\s+/g, ' ').trim() || defaultName() || '학생';
    if (f && f.value.trim()) store(NAME_KEY, nm);
    var txt = reportText(c, nm, Date.now());
    try {
      var b = new Blob([txt], { type: 'text/plain;charset=utf-8' }), u = URL.createObjectURL(b), a = document.createElement('a');
      var dd = new Date();
      a.href = u;
      a.download = (nm + ' Schreibtraining ' + c.level + ' ' + pad(c.no) + ' ' + dd.getFullYear() + '-' + pad(dd.getMonth() + 1) + '-' + pad(dd.getDate())).replace(/[\\/:*?"<>|_]+/g, ' ').replace(/\s+/g, ' ').trim() + '.txt';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(u); }, 4000);
      xpMsg('파일을 저장했어요. 이 파일을 선생님께 보내세요.', 'ok');
    } catch (e) { fallbackCopy(txt); }
  }

  /* ───────── 인쇄: 과제지 ───────── */
  function printSheet() {
    var c = cur();
    if (!c) return;
    flushSave();
    var t = draft(c.id).text.trim(), old = document.getElementById('st-print');
    if (old) old.parentNode.removeChild(old);
    var lines = Math.max(8, Math.ceil(c.words[1] / 9));
    var el = document.createElement('div');
    el.id = 'st-print';
    el.className = 'st-print';
    el.innerHTML = '<div class="sp-h"><img src="assets/logo.png" alt=""><div><b>SODA SCHREIBTRAINING</b><span>Sophia Deutsch Akademie</span></div><em>' + code(c) + '</em></div>' +
      '<h1 lang="de">' + esc(c.title) + '</h1><p class="sp-ko">' + esc(c.titleKo) + ' · ' + c.words[0] + '–' + c.words[1] + '단어 · 권장 ' + c.time + '분</p>' +
      taskHtml(c, false) + '<h2>Name: ____________________</h2>' +
      (t ? '<div class="sp-text" lang="de">' + br(t) + '</div>' : '<div class="sp-lines">' + new Array(lines + 1).join('<i></i>') + '</div>');
    document.body.appendChild(el);
    document.documentElement.classList.add('printing');
    var done = function () {
      document.documentElement.classList.remove('printing');
      var e = document.getElementById('st-print');
      if (e) e.parentNode.removeChild(e);
      window.removeEventListener('afterprint', done);
    };
    window.addEventListener('afterprint', done);
    setTimeout(function () { window.print(); setTimeout(function () { if (!window.matchMedia || !matchMedia('print').matches) done(); }, 1500); }, 60);
  }

  /* ───────── 글자 크기 ───────── */
  var SCALE_KEY = 'soda-schreib-scale', scale = parseFloat(store(SCALE_KEY)) || 1;
  function applyScale() { document.documentElement.style.setProperty('--scale', String(scale)); }
  applyScale();

  /* ───────── 이벤트 ───────── */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) {
      if (e.target.classList && e.target.classList.contains('xp')) closeModal();
      return;
    }
    var act = el.getAttribute('data-act'), c = cur();
    if (act === 'tab') setTab(el.getAttribute('data-tab'));
    else if (act === 'go') setTab(el.getAttribute('data-tab'));
    else if (act === 'smaller' || act === 'bigger') {
      scale = Math.max(.85, Math.min(1.4, Math.round((scale + (act === 'bigger' ? .1 : -.1)) * 100) / 100));
      store(SCALE_KEY, String(scale)); applyScale();
    } else if (act === 'print') printSheet();
    else if (act === 'hideko') {
      state.hideKo = !state.hideKo; state.peek = {};
      el.setAttribute('aria-pressed', String(state.hideKo));
      var rd = document.getElementById('rede');
      if (rd) { rd.classList.toggle('hide-ko', state.hideKo); rd.querySelectorAll('.peek').forEach(function (x) { x.classList.remove('peek'); }); }
    } else if (act === 'peek') { if (state.hideKo) el.classList.toggle('peek'); }
    else if (act === 'pick' && c) gradeMc(c, +el.getAttribute('data-q'), +el.getAttribute('data-j'));
    else if (act === 'check' && c) gradeText(c, +el.getAttribute('data-q'));
    else if (act === 'uebreset' && c) {
      delete state.ueb[c.id];
      var p = document.getElementById('panel-uebung');
      if (p) { p.innerHTML = uebPanel(c); var q0 = p.querySelector('.q'); if (q0) q0.scrollIntoView({ block: 'start' }); }
    } else if (act === 'taskko' && c) {
      state.taskKo[c.id] = !state.taskKo[c.id];
      el.setAttribute('aria-pressed', String(state.taskKo[c.id]));
      var tk = document.getElementById('task-ko');
      if (tk) tk.hidden = !state.taskKo[c.id];
    } else if (act === 'timer') startTimer();
    else if (act === 'ins') insertChar(el.getAttribute('data-k'));
    else if (act === 'clear' && c) {
      if (!draft(c.id).text.trim() && !document.getElementById('st-ta').value.trim()) return;
      if (!window.confirm('쓴 글을 모두 지울까요? 지운 글은 되돌릴 수 없어요.')) return;
      stopTimer();
      var d = draft(c.id); d.text = ''; d.secs = 0; d.check = []; saveDraft(c.id, d);
      var p2 = document.getElementById('panel-schreiben');
      if (p2) p2.innerHTML = writePanel(c);
      updateWriteInfo(c); updateProgress();
    } else if (act === 'submit') openSubmit();
    else if (act === 'subinfo') openInfo();
    else if (act === 'send') sendMail();
    else if (act === 'copytext') copyText();
    else if (act === 'savefile') saveFile();
    else if (act === 'xpclose') closeModal();
    else if (act === 'showmuster' && c) {
      state.showMuster[c.id] = true;
      var g = document.getElementById('st-gate'), m = document.getElementById('st-muster');
      if (g) g.hidden = true;
      if (m) m.hidden = false;
      refreshMine();
    } else if (act === 'mko' && c) {
      var i = el.getAttribute('data-i'), k = c.id + ':' + i;
      state.openKo[k] = !state.openKo[k];
      var mp = document.getElementById('mp-' + i);
      if (mp) mp.classList.toggle('open', !!state.openKo[k]);
      el.setAttribute('aria-expanded', String(!!state.openKo[k]));
    }
  });
  document.addEventListener('change', function (e) {
    var el = e.target, c = cur();
    if (el.matches && el.matches('[data-act="chk"]') && c) {
      var d = draft(c.id), ta = document.getElementById('st-ta');
      if (ta) d.text = ta.value;
      d.check[+el.getAttribute('data-i')] = el.checked;
      saveDraft(c.id, d);
    }
  });
  document.addEventListener('input', function (e) {
    var c = cur();
    if (e.target.id === 'st-ta' && c) onType(c);
    if (e.target.matches && e.target.matches('[data-xp-name]')) store(NAME_KEY, e.target.value.replace(/\s+/g, ' ').trim());
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.getElementById('xp')) { closeModal(); return; }
    var t = e.target;
    if (e.key === 'Enter' && t.classList && t.classList.contains('st-in') && !e.shiftKey) {
      var c = cur();
      if (c) { e.preventDefault(); gradeText(c, +t.getAttribute('data-q')); }
    }
    if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && t.getAttribute && t.getAttribute('role') === 'tab') {
      var ids = TABS.map(function (x) { return x.id; }), i = ids.indexOf(t.getAttribute('data-tab'));
      var n = ids[(i + (e.key === 'ArrowRight' ? 1 : ids.length - 1)) % ids.length];
      setTab(n);
      var b = document.getElementById('tab-' + n);
      if (b) b.focus();
    }
  });
  window.addEventListener('pagehide', function () { flushSave(); stopTimer(); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) { flushSave(); } });
  window.addEventListener('hashchange', function () { flushSave(); closeModal(); });
  window.addEventListener('hashchange', route);
  route();
})();
