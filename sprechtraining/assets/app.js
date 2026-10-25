/* SODA SPRECHTRAINING · Sophia Deutsch Akademie */
(function () {
  'use strict';

  var LEVELS = [
    { code: 'A1', de: 'Anfänger', ko: '처음 말하는 독일어', step: 1,
      desc: '자기소개, 길 묻기, 주문, 약속, 기차표 구입처럼 짧은 생활 대화를 따라 말해요.' },
    { code: 'A2', de: 'Grundlegende Kenntnisse', ko: '일상 대화', step: 2,
      desc: '병원 예약, 집 구하기, 교환, 주말 이야기, 초대처럼 익숙한 상황의 대화를 말해요.' },
    { code: 'B1', de: 'Fortgeschrittene Sprachverwendung', ko: '문제를 풀어 말하기', step: 3,
      desc: '항의, 의견 나누기, 계획, 휴가 협의, 조언처럼 이유를 덧붙이며 말하는 대화예요.' },
    { code: 'B2', de: 'Selbständige Sprachverwendung', ko: '경험을 설명하기', step: 4,
      desc: '면접, 협상, 갈등 중재, 상담, 항의, 토론처럼 논리적으로 설명하는 대화예요.' },
    { code: 'C1', de: 'Fachkundige Sprachkenntnisse', ko: '논쟁하고 타협하기', step: 5,
      desc: '반론하고 조건을 달며 합의안을 만드는 토론, 인터뷰, 협상, 문학 대화예요.' },
    { code: 'MZ', de: 'Jugendsprache', ko: 'MZ 구어체', step: 0, special: true,
      desc: '독일 사람들이 일상에서 실제로 쓰는 구어체를 대화로 익혀요. 은어와 유행어는 쓰지 않아요.' }
  ];
  var LEVEL_BY = {};
  LEVELS.forEach(function (l) { LEVEL_BY[l.code] = l; });

  var DATA = window.DIALOG_DATA || {};
  var app = document.getElementById('app');

  var state = {
    route: null,
    hide: 'none',     // none | A | B | all
    mine: 'none',     // none | A | B  (내가 맡는 역할)
    ko: true,         // 해석 보기
    sl: true,         // 구어체 표시
    peek: {},         // 가려진 줄 중 눌러서 연 것
    playAll: false,   // 대화 전체 듣기 중
    playing: -1,      // 전체 듣기에서 지금 들리는 줄
    practice: -1,     // 단계별 연습 중 현재 줄 번호 (-1: 꺼짐)
    recs: {},         // 녹음 결과 (메모리에만 보관)
    recording: null   // 녹음 중인 줄 번호
  };
  var current = null;   // 지금 읽고 있는 대화
  var recorder = null;
  var chunks = [];

  var ICON = {
    left: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 3 5 8l5 5"/></svg>',
    right: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5"/></svg>',
    arrowR: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>'
  };

  /* ───────── 유틸 ───────── */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function keyOf(i) { return current.lv + '-' + pad(current.no) + '-' + i; }
  function inTurn(it, i) {
    var t = it.t;
    return Array.isArray(t) ? t.indexOf(i + 1) >= 0 : t === i + 1;
  }
  function hlUmg(text, items, i) {
    if (!state.sl || !items || !items.length) return esc(text);
    var low = text.toLowerCase(), ranges = [];
    items.forEach(function (it) {
      if (!inTurn(it, i)) return;
      var idx = low.indexOf(it.de.toLowerCase());
      if (idx < 0) return;
      var end = idx + it.de.length;
      if (ranges.some(function (r) { return idx < r[1] && end > r[0]; })) return;
      ranges.push([idx, end]);
    });
    ranges.sort(function (a, b) { return a[0] - b[0]; });
    var out = '', pos = 0;
    ranges.forEach(function (r) {
      out += esc(text.slice(pos, r[0])) + '<mark class="sl">' + esc(text.slice(r[0], r[1])) + '</mark>';
      pos = r[1];
    });
    return out + esc(text.slice(pos));
  }
  function isMineRole(r) { return state.mine !== 'none' && state.mine === r; }
  function phraseCount(t) {
    var n = 0;
    (t.redemittel || []).forEach(function (g) { n += g.items.length; });
    return n;
  }
  function seg(items, act, cur) {
    return '<div class="seg" role="group">' + items.map(function (it) {
      return '<button type="button" data-act="' + act + '" data-v="' + esc(it[0]) + '" aria-pressed="' +
        (cur === it[0] ? 'true' : 'false') + '">' + esc(it[1]) + '</button>';
    }).join('') + '</div>';
  }
  function brandTop(backHref, backLabel) {
    return '<div class="top"><a class="top-brand" href="#/levels" aria-label="레벨 선택으로">' +
      '<img src="assets/logo.png" alt=""><div><b>SODA SPRECHTRAINING</b><span>Sophia Deutsch Akademie</span></div></a>' +
      '<a class="pill" href="' + backHref + '">' + ICON.left + esc(backLabel) + '</a></div>';
  }

  /* ───────── 음성 (기기의 독일어 음성 사용) ───────── */
  function speak(text, onEnd) {
    if (!text) return;
    if (lineAudio) { try { lineAudio.pause(); } catch (e) {} lineAudio = null; }
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd(); else alert('이 기기에서는 독일어 음성을 들을 수 없어요.');
      return;
    }
    try {
      var s = window.speechSynthesis;
      s.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'de-DE';
      u.rate = 0.9;
      var v = s.getVoices().filter(function (x) { return /^de/i.test(x.lang); })[0];
      if (v) u.voice = v;
      if (onEnd) { u.onend = onEnd; u.onerror = function (ev) { if (!ev || ev.error !== 'canceled' && ev.error !== 'interrupted') onEnd(); }; }
      s.speak(u);
    } catch (e) { if (onEnd) onEnd(); }
  }
  function cancelMedia() {
    if (lineAudio) { try { lineAudio.pause(); } catch (e) {} lineAudio = null; }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }
  function stopSpeech() {
    playToken++;
    state.playAll = false;
    state.playing = -1;
    cancelMedia();
  }
  /* 대화 줄 음성: 녹음된 mp3(ElevenLabs)를 먼저 쓰고, 파일을 못 불러오면 기기 음성으로 대신해요 */
  var lineAudio = null;
  var playToken = 0;
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function speakTurn(i, onEnd) {
    var t = current.turns[i];
    cancelMedia();
    var src = 'assets/audio/' + current.lv.toLowerCase() + '-' + pad2(current.no) + '-' + pad2(i + 1) + '.mp3?v=' + (window.APP_VERSION || '');
    var a = new Audio(src);
    lineAudio = a;
    a.onended = function () { if (lineAudio === a) { lineAudio = null; if (onEnd) onEnd(); } };
    a.onerror = function () { if (lineAudio === a) { lineAudio = null; speak(t.de, onEnd); } };
    var pr = a.play();
    if (pr && pr.catch) pr.catch(function () { if (lineAudio === a) { lineAudio = null; speak(t.de, onEnd); } });
  }
  /* 대화 전체 듣기: 처음부터 끝까지 줄마다 이어서 들려줘요 */
  function markPlaying(i) {
    var lis = document.querySelectorAll('.turn');
    for (var k = 0; k < lis.length; k++) lis[k].classList.toggle('is-playing', k === i);
    if (lis[i] && lis[i].scrollIntoView) lis[i].scrollIntoView({ block: 'center', behavior: 'smooth' });
  }
  function playFrom(i, tok) {
    if (tok !== playToken) return;
    if (i >= current.turns.length) { stopSpeech(); render(); return; }
    state.playing = i;
    markPlaying(i);
    speakTurn(i, function () {
      setTimeout(function () { playFrom(i + 1, tok); }, 500);
    });
  }
  function toggleListenAll() {
    if (state.playAll) { stopSpeech(); render(); return; }
    if (state.recording !== null && recorder) recorder.stop();
    stopSpeech();
    state.practice = -1;
    state.playAll = true;
    render();
    playFrom(0, playToken);
  }

  /* ───────── 녹음 ───────── */
  function toggleRec(i) {
    if (recorder) {
      if (state.recording === i) recorder.stop();
      return;
    }
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert('이 브라우저에서는 녹음을 쓸 수 없어요.');
      return;
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      var key = keyOf(i);
      var rec = new MediaRecorder(stream);
      chunks = [];
      recorder = rec;
      state.recording = i;
      rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
      rec.onstop = function () {
        var blob = new Blob(chunks, { type: rec.mimeType || 'audio/webm' });
        if (state.recs[key]) URL.revokeObjectURL(state.recs[key]);
        state.recs[key] = URL.createObjectURL(blob);
        stream.getTracks().forEach(function (tr) { tr.stop(); });
        recorder = null;
        state.recording = null;
        render();
      };
      rec.start();
      render();
    }).catch(function () {
      alert('마이크를 쓸 수 없어요. 브라우저의 마이크 권한을 확인해 주세요.');
    });
  }

  /* ───────── 단계별 연습 ───────── */
  function startPractice() {
    if (state.mine === 'none') {
      alert('먼저 내 역할(나는 A 또는 나는 B)을 골라 주세요.');
      return;
    }
    enterStep(0);
  }
  function enterStep(i) {
    state.practice = i;
    var t = current.turns[i];
    render();
    if (!isMineRole(t.r)) speakTurn(i);
  }
  function stopPractice() {
    state.practice = -1;
    render();
  }

  /* ───────── 데이터 ───────── */
  function isHidden(i) {
    var t = current.turns[i];
    if (state.peek[keyOf(i)]) return false;
    if (state.practice >= 0 && i === state.practice && isMineRole(t.r)) return true;
    return state.hide === 'all' || state.hide === t.r;
  }

  /* ───────── 라우팅 ───────── */
  function parse() {
    var p = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    if (!p.length) return { v: 'cover' };
    if (p[0] === 'levels') return { v: 'levels' };
    if (p[0] === 'guide') return { v: 'guide' };
    var lv = p[0].toUpperCase();
    if (!LEVEL_BY[lv]) return { v: 'cover' };
    if (p.length === 1) return { v: 'list', lv: lv };
    return { v: 'reader', lv: lv, no: p[1] };
  }

  function route() {
    var r = parse();
    stopSpeech();
    if (r.v === 'reader') {
      var t = null;
      (DATA[r.lv] || []).forEach(function (x) {
        if (pad(x.no) === r.no || String(x.no) === r.no) t = x;
      });
      if (!t) { location.replace('#/' + r.lv.toLowerCase()); return; }
      var same = current && current.lv === t.lv && current.no === t.no;
      current = t;
      if (!same) { state.peek = {}; state.practice = -1; }
    } else {
      current = null;
      state.practice = -1;
    }
    state.route = r;
    render();
    window.scrollTo(0, 0);
  }

  function render() {
    var r = state.route;
    if (!r || r.v === 'cover') renderCover();
    else if (r.v === 'levels') renderLevels();
    else if (r.v === 'guide') renderGuide();
    else if (r.v === 'list') renderList(r.lv);
    else renderReader();
  }

  /* ───────── 표지 ───────── */
  function renderCover() {
    var total = 0;
    LEVELS.forEach(function (l) { total += (DATA[l.code] || []).length; });
    document.title = 'SODA SPRECHTRAINING · Sophia Deutsch Akademie';
    app.innerHTML =
      '<main id="main" class="cover view" tabindex="-1" aria-labelledby="cover-title">' +
      '<header class="brand"><img src="assets/logo.png" alt="Sophia Deutsch Akademie 로고">' +
      '<div class="brand-t"><b>Sophia Deutsch Akademie</b><span>소피아 독일어학원</span></div>' +
      (window.TOC_URL ? '<a class="pill toc-pill" href="' + window.TOC_URL + '">' + ICON.left + '목차로</a>' : '') + '</header>' +
      '<div class="hero"><h1 class="title" id="cover-title"><span class="t1">SODA</span><span class="t2">SPRECHTRAINING</span></h1>' +
      '<a class="cta" href="#/levels">레벨 선택하기' + ICON.right + '</a></div>' +
      '<footer class="cover-foot"><span>Innovative Learning Beyond the Traditional</span>' +
      '<span>A1 – C1 · MZ' + (total ? ' · ' + total + ' Dialoge' : '') + '</span></footer></main>';
  }

  /* ───────── 레벨 선택 ───────── */
  function renderLevels() {
    document.title = '레벨 선택 · SODA SPRECHTRAINING';
    var cards = LEVELS.map(function (l, i) {
      var list = DATA[l.code] || [];
      var turns = 0;
      list.forEach(function (d) { turns += d.turns.length; });
      var steps = '';
      for (var k = 1; k <= 5; k++) steps += '<i class="' + (k <= l.step ? 'on' : '') + '"></i>';
      if (l.special) steps = '<b class="sp-lab">SPECIAL</b>';
      return '<li><a class="lv" href="#/' + l.code.toLowerCase() + '" style="--i:' + i + '">' +
        '<span class="lv-code">' + l.code + '</span>' +
        '<div><div class="lv-de" lang="de">' + esc(l.de) + '</div><div class="lv-ko">' + esc(l.ko) + '</div>' +
        '<p class="lv-desc">' + esc(l.desc) + '</p></div>' +
        '<div class="lv-side"><span class="steps" aria-hidden="true">' + steps + '</span>' +
        '<span>대화 ' + list.length + '개 · 발화 ' + turns + '개</span>' +
        '<span class="arrow">' + ICON.arrowR + '</span></div></a></li>';
    }).join('');
    app.innerHTML = '<main id="main" class="page view" tabindex="-1">' + brandTop('#/', '표지') +
      '<div class="sec-h"><span class="kicker">STUFE</span><h1>레벨 선택</h1>' +
      '<p>A1–C1은 레벨마다 대화가 6개 있어요. 마지막 MZ 챕터에는 독일 젊은 층의 구어체 대화 6개가 있어요. 역할을 나눠 따라 말하고, 문장을 가린 뒤 말해 보고, 녹음해서 원문과 비교해요.</p></div>' +
      '<a class="guide-link" href="#/guide"><span><b>이렇게 공부하세요</b><small>이 자료를 가장 잘 활용하는 학습법</small></span>' + ICON.right + '</a>' +
      '<ul class="levels">' + cards + '</ul></main>';
  }

  /* ───────── 학습법 ───────── */
  var GUIDE_STEPS = [
    { t: '이해하기', m: '5분', b: [
      '‘해석 보기’를 켠 채로 ‘대화 전체 듣기’를 눌러 처음부터 끝까지 한 번 들어요.',
      '다시 한 번 들으면서 눈으로 독일어 문장을 따라 읽어요. 해석은 뜻을 확인할 때만 봐요.',
      '모르는 표현은 아래 Redemittel에서 눌러 소리와 함께 확인해요.'] },
    { t: '듣고 따라 말하기', m: '5분', b: [
      '‘해석 보기’를 끄고 한 줄씩 ‘원문 듣기’를 눌러요. 들은 직후에 바로 소리 내어 따라 말해요.',
      '속도, 끊어 읽는 곳, 문장 끝의 억양까지 그대로 흉내 내는 것이 목표예요.',
      '한 줄을 3번쯤 따라 한 뒤 다음 줄로 넘어가요. 눈으로만 읽지 말고 꼭 입으로 말해요.'] },
    { t: '내 역할 정하기', m: '3분', b: [
      '‘내 역할’에서 A나 B를 골라요. 내 줄에는 녹음 버튼이 생겨요.',
      '‘단계별 연습’을 눌러요. 상대 줄은 음성으로 나오고, 내 차례에서는 내 줄이 가려져요.',
      '내 줄을 먼저 말해 보고, 막히면 눌러서 확인한 뒤 다시 말해요.'] },
    { t: '가리고 말하기', m: '5분', b: [
      '‘가리기’에서 내 역할의 줄을 가려요. 상대 줄을 듣고 내 줄을 기억해서 말해요.',
      '막힌 줄은 눌러 확인하고 공책에 적어 두어요. 다음 연습 때 이 줄부터 시작해요.',
      '익숙해지면 ‘모두 가리기’로 양쪽 역할을 모두 말해 봐요.'] },
    { t: '녹음하고 비교하기', m: '5분', b: [
      '내 줄을 녹음하고 ‘내 녹음 듣기’와 ‘원문 듣기’를 번갈아 들어요.',
      '한 번에 한 가지만 비교해요. 속도, 끊어 읽기, 강세, 문장 끝 억양 중 하나를 고르면 돼요.',
      '고친 점이 하나 보이면 다시 녹음해서 바뀐 것을 확인해요.'] },
    { t: '내 말로 바꾸기', m: '5분', b: [
      '역할을 바꿔서 한 번 더 연습해요.',
      '이름, 장소, 시간, 물건을 내 상황으로 바꿔 말해요. 예를 들어 내 직업, 내가 가는 도시, 내 약속 시간으로 바꿔요.',
      '문장 구조는 그대로 두고 단어만 바꾸는 것이 가장 안전해요.'] }
  ];
  var GUIDE_TIPS = [
    ['복습 간격', '다 외운 대화도 하루 뒤, 사흘 뒤, 일주일 뒤에 한 번씩 ‘모두 가리기’로 말해 보세요. 한 번에 오래 하는 것보다 간격을 두고 여러 번 하는 편이 오래 기억돼요.'],
    ['분량', '하루에 대화 1개, 15~20분이면 충분해요. 새 대화로 넘어가기 전에 지난 대화를 한 번 말해 보세요.'],
    ['환경', '이어폰을 끼고 조용한 곳에서 소리 내어 말하세요. 작게 중얼거리는 연습은 실제 말하기에 도움이 적어요.'],
    ['레벨 고르기', '지금 레벨에서 가리고 말하기가 막힘없이 되면 다음 레벨로 올라가세요. 처음부터 어려운 대화를 고르면 오래 못 가요.'],
    ['MZ 챕터', '구어체는 말할 때와 친구와의 대화에서 써요. 시험 쓰기와 공식 문서에서는 대화 아래 ‘표준 독일어’ 표현을 쓰세요. 구어체 표시는 끄고 들으면서 소리만으로 알아듣는 연습도 해 보세요.'],
    ['Redemittel', '대화가 끝나면 Redemittel 표현을 3개 골라 내 문장을 하나씩 만들어 말해 보세요. 새 상황에서 쓸 수 있어야 내 표현이 돼요.']
  ];
  var GUIDE_MISTAKES = [
    '해석만 보고 넘어가요. 독일어 문장을 소리 내어 말하는 단계가 빠지면 말하기가 늘지 않아요.',
    '읽기만 하고 말하지 않아요. 눈으로 읽는 것과 입으로 말하는 것은 다른 연습이에요.',
    '틀린 곳을 한꺼번에 다 고치려 해요. 한 번에 한 가지씩 고치세요.',
    '녹음을 듣기 싫어서 건너뛰어요. 처음엔 어색해도 비교해 보는 단계에서 가장 많이 늘어요.'
  ];
  function renderGuide() {
    document.title = '이렇게 공부하세요 · SODA SPRECHTRAINING';
    var steps = GUIDE_STEPS.map(function (g, i) {
      return '<li class="g-step"><div class="g-head"><span class="g-no">' + (i + 1) + '</span><b>' + esc(g.t) + '</b><span class="g-min">' + esc(g.m) + '</span></div>' +
        '<ul>' + g.b.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></li>';
    }).join('');
    var tips = GUIDE_TIPS.map(function (x) {
      return '<li><b>' + esc(x[0]) + '</b><p>' + esc(x[1]) + '</p></li>';
    }).join('');
    var mist = GUIDE_MISTAKES.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
    app.innerHTML = '<main id="main" class="page view guide" tabindex="-1">' + brandTop('#/levels', '레벨 선택') +
      '<div class="sec-h"><span class="kicker">LERNWEG</span><h1>이렇게 공부하세요</h1>' +
      '<p>대화 하나를 6단계로 연습하는 방법이에요. 대화 1개에 약 30분이 걸리고, 앞의 3단계만 해도 15분이면 돼요. 듣기, 따라 말하기, 기억해서 말하기, 녹음 비교의 순서로 말하는 힘을 키워요.</p></div>' +
      '<ol class="g-steps">' + steps + '</ol>' +
      '<section class="g-sec"><h2>더 잘 활용하려면</h2><ul class="g-tips">' + tips + '</ul></section>' +
      '<section class="g-sec"><h2>자주 하는 실수</h2><ul class="g-mist">' + mist + '</ul></section>' +
      '<a class="cta g-cta" href="#/levels">레벨 선택하기' + ICON.right + '</a></main>';
  }

  /* ───────── 대화 목록 ───────── */
  function renderList(lv) {
    var L = LEVEL_BY[lv];
    var items = DATA[lv] || [];
    document.title = lv + ' · SODA SPRECHTRAINING';
    var cards = items.map(function (t, i) {
      return '<li><a class="card" href="#/' + lv.toLowerCase() + '/' + pad(t.no) + '" style="--i:' + i + '">' +
        '<div class="card-top"><span class="num">' + pad(t.no) + '</span><span class="chip" title="' + esc(t.type) + '">' + esc(t.typeKo) + '</span></div>' +
        '<h2 class="card-de de" lang="de">' + esc(t.title) + '</h2>' +
        '<p class="card-ko">' + esc(t.titleKo) + '</p>' +
        '<p class="card-desc">' + esc(t.intro) + '</p>' +
        '<div class="card-foot">' + (t.focus || []).slice(0, 3).map(function (f) { return '<span class="tag">' + esc(f) + '</span>'; }).join('') +
        '<span class="meta">발화 ' + t.turns.length + '개 · 표현 ' + phraseCount(t) + '개</span></div></a></li>';
    }).join('');
    app.innerHTML = '<main id="main" class="page view" tabindex="-1">' + brandTop('#/levels', '레벨') +
      '<div class="sec-h"><div class="lvhead"><span class="lv-code">' + lv + '</span>' +
      '<div><span class="kicker" lang="de">' + esc(L.de.toUpperCase()) + '</span><h1>' + esc(L.ko) + '</h1></div></div>' +
      '<p>' + esc(L.desc) + '</p></div>' +
      (L.special ? '<aside class="mznote"><b>사용하기 전에</b><p>이 챕터의 표현은 말할 때 쓰는 구어체예요. 일상 대화에서는 자연스럽지만 시험의 쓰기 과제나 공식 문서에서는 ‘표준 독일어’로 바꿔 써요. 대화마다 있는 ‘표준 독일어’ 풀이로 바꿔 말하는 연습도 함께 해요.</p></aside>' : '') +
      (items.length ? '<ul class="grid">' + cards + '</ul>' : '<p class="empty">아직 대화가 없어요.</p>') + '</main>';
  }

  /* ───────── 대화 화면 ───────── */
  function renderReader() {
    var t = current;
    var n = t.turns.length;
    var pr = state.practice;
    var mineItems = [['none', '듣기만'], ['A', '나는 A (' + t.roles.A + ')'], ['B', '나는 B (' + t.roles.B + ')']];

    var controls =
      '<div class="dctl">' +
      '<div class="dctl-row"><span class="dctl-lab">내 역할</span>' + seg(mineItems, 'mine', state.mine) + '</div>' +
      '<div class="dctl-row"><span class="dctl-lab">가리기</span>' + seg([
        ['none', '전체 보기'], ['A', 'A 가리기'], ['B', 'B 가리기'], ['all', '모두 가리기']
      ], 'hide', state.hide) + '</div>' +
      '<div class="dctl-row"><span class="dctl-lab">보기</span>' +
      '<button type="button" class="dctl-btn" data-act="ko" aria-pressed="' + (state.ko ? 'true' : 'false') + '">해석 ' + (state.ko ? '가리기' : '보기') + '</button>' +
      '<button type="button" class="dctl-btn" data-act="listenall" aria-pressed="' + (state.playAll ? 'true' : 'false') + '">' +
      (state.playAll ? '■ 전체 듣기 멈춤' : '▶ 대화 전체 듣기') + '</button>' +
      '<button type="button" class="dctl-btn" data-act="practice" aria-pressed="' + (pr >= 0 ? 'true' : 'false') + '">' +
      (pr >= 0 ? '연습 끝내기' : '단계별 연습') + '</button>' +
      (t.umg && t.umg.length ? '<button type="button" class="dctl-btn" data-act="sl" aria-pressed="' + (state.sl ? 'true' : 'false') + '">구어체 표시 ' + (state.sl ? '끄기' : '켜기') + '</button>' : '') +
      '</div>' +
      '<p class="dctl-note">가려진 문장은 눌러서 볼 수 있어요. 녹음은 이 화면을 떠나면 사라져요.</p>' +
      '</div>';

    var bar = '';
    if (pr >= 0) {
      var mine = isMineRole(t.turns[pr].r);
      bar = '<div class="pbar"><span>' + (pr + 1) + ' / ' + n + ' · ' +
        (mine ? '내 차례예요. 먼저 말해 보세요.' : '상대 차례예요. 듣고 다음으로 넘어가세요.') +
        '</span><button type="button" class="btn-next" data-act="next">' + (pr + 1 < n ? '다음' : '끝내기') + '</button></div>';
    }

    var turns = '';
    for (var i = 0; i < n; i++) {
      if (pr >= 0 && i > pr) break;
      var turn = t.turns[i];
      var hidden = isHidden(i);
      var cls = 'turn r-' + turn.r + (hidden ? ' is-hidden' : '') + (pr === i ? ' is-current' : '') + (state.playing === i ? ' is-playing' : '');
      var rec = '';
      if (isMineRole(turn.r)) {
        rec = state.recording === i
          ? '<button type="button" class="tool rec on" data-act="rec" data-i="' + i + '">■ 녹음 정지</button>'
          : '<button type="button" class="tool rec" data-act="rec" data-i="' + i + '">● 내 목소리 녹음</button>';
        if (state.recs[keyOf(i)]) {
          rec += '<button type="button" class="tool" data-act="play" data-i="' + i + '">▶ 내 녹음 듣기</button>';
        }
      }
      turns += '<li class="' + cls + '"' + (hidden ? ' data-act="peek" data-i="' + i + '"' : '') + '>' +
        '<div class="who"><b>' + esc(turn.r) + '</b><span>' + esc(t.roles[turn.r]) + '</span></div>' +
        '<p class="de-line" lang="de">' + hlUmg(turn.de, t.umg, i) + '</p>' +
        (state.ko ? '<p class="ko-line">' + esc(turn.ko) + '</p>' : '') +
        '<div class="tools"><button type="button" class="tool" data-act="speak" data-i="' + i + '">🔊 원문 듣기</button>' + rec + '</div>' +
        '</li>';
    }

    var gloss = '';
    if (t.umg && t.umg.length) {
      gloss = '<section class="gloss"><h2>Umgangssprache · 구어체 표현</h2>' +
        '<p>표현을 누르면 독일어로 들을 수 있어요. 구어체는 말할 때 쓰고, 쓰기 시험과 공식 문서에서는 ‘표준 독일어’로 바꿔 써요.</p>' +
        '<ul class="glist">' + t.umg.map(function (it) {
          return '<li><button type="button" data-act="say" data-text="' + esc(it.de) + '">' +
            '<span class="g-top"><span class="rde" lang="de">' + esc(it.de) + '</span>' +
            (it.reg ? '<span class="g-chip">' + esc(it.reg) + '</span>' : '') + '</span>' +
            '<span class="rko">' + esc(it.ko) + '</span>' +
            '<span class="g-std"><small>표준 독일어</small><span lang="de">' + esc(it.std) + '</span></span></button></li>';
        }).join('') + '</ul></section>';
    }

    var redem = '<section class="redem"><h2>Redemittel</h2>' +
      '<p>표현을 누르면 독일어로 들을 수 있어요.</p>' +
      (t.redemittel || []).map(function (g) {
        return '<div class="rgroup"><h3>' + esc(g.group) + '</h3><ul class="rlist">' +
          g.items.map(function (it) {
            return '<li><button type="button" data-act="say" data-text="' + esc(it.de) + '">' +
              '<span class="rde" lang="de">' + esc(it.de) + '</span><span class="rko">' + esc(it.ko) + '</span></button></li>';
          }).join('') + '</ul></div>';
      }).join('') +
      '</section>';

    var all = DATA[t.lv] || [];
    var idx = all.indexOf(t);
    var nav = '';
    if (all.length > 1) {
      nav = '<nav class="dnav" aria-label="대화 이동">' +
        (idx > 0 ? '<a class="dnav-a" href="#/' + t.lv.toLowerCase() + '/' + pad(all[idx - 1].no) + '">' + ICON.left + '<span><small>이전 대화</small><b lang="de">' + esc(all[idx - 1].title) + '</b></span></a>' : '<span></span>') +
        (idx < all.length - 1 ? '<a class="dnav-a next" href="#/' + t.lv.toLowerCase() + '/' + pad(all[idx + 1].no) + '"><span><small>다음 대화</small><b lang="de">' + esc(all[idx + 1].title) + '</b></span>' + ICON.right + '</a>' : '<span></span>') +
        '</nav>';
    }
    document.title = t.title + ' · SODA SPRECHTRAINING';
    app.innerHTML = '<main id="main" class="page view" tabindex="-1">' + brandTop('#/' + t.lv.toLowerCase(), t.lv) +
      '<div class="sec-h"><span class="kicker" lang="de">' + esc(t.type) + ' · ' + esc(t.typeKo) + '</span>' +
      '<h1 class="de" lang="de">' + esc(t.title) + '</h1>' +
      '<p>' + esc(t.titleKo) + ' · ' + esc(t.intro) + '</p></div>' +
      (t.lv === 'MZ' ? '<p class="mzline">친구 사이 구어체예요. 시험·직장·공식 자리에서는 쓰지 않아요.</p>' : '') +
      controls + bar +
      '<ol class="dlg">' + turns + '</ol>' +
      gloss + redem + nav + '</main>';
  }

  /* ───────── 이벤트 ───────── */
  app.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var act = el.getAttribute('data-act');
    var i = parseInt(el.getAttribute('data-i'), 10);
    if (state.playAll && act !== 'listenall' && act !== 'ko' && act !== 'sl' && act !== 'peek') { stopSpeech(); render(); }
    if (act === 'mine') { state.mine = el.getAttribute('data-v'); if (state.practice >= 0) state.practice = -1; render(); }
    else if (act === 'hide') { state.hide = el.getAttribute('data-v'); state.peek = {}; render(); }
    else if (act === 'ko') { state.ko = !state.ko; render(); }
    else if (act === 'sl') { state.sl = !state.sl; render(); }
    else if (act === 'listenall') { toggleListenAll(); }
    else if (act === 'practice') { if (state.practice >= 0) stopPractice(); else startPractice(); }
    else if (act === 'next') { if (state.practice + 1 < current.turns.length) enterStep(state.practice + 1); else stopPractice(); }
    else if (act === 'peek') { state.peek[keyOf(i)] = true; render(); }
    else if (act === 'speak') { speakTurn(i); }
    else if (act === 'rec') { toggleRec(i); }
    else if (act === 'play') { var u = state.recs[keyOf(i)]; if (u) new Audio(u).play(); }
    else if (act === 'say') { speak(el.getAttribute('data-text').replace(/\s*\/\s*/g, '. ').replace(/\s*…\s*/g, ' ').replace(/\s+([,.?!])/g, '$1').replace(/\s+/g, ' ').trim()); }
  });

  window.addEventListener('hashchange', route);
  route();

  // 새 버전 확인: 브라우저가 예전 index.html을 캐시에서 열었으면 새 주소로 한 번만 다시 불러와요.
  (function checkVersion() {
    var cur = window.APP_VERSION;
    if (!cur || location.protocol === 'file:' || !window.fetch || !window.URLSearchParams) return;
    fetch('version.json?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j || !j.v || j.v === cur) return;
        var q = new URLSearchParams(location.search);
        if (q.get('v') === j.v) return;                                   // 이미 새 주소로 열었으면 반복하지 않음
        if (state.recording !== null || Object.keys(state.recs).length) return; // 녹음한 내용이 있으면 그대로 둠
        q.set('v', j.v);
        location.replace(location.pathname + '?' + q.toString() + location.hash);
      })
      .catch(function () {});
  })();
})();
