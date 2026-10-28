/* SODA 공통 접속 횟수 집계 (GoatCounter)
   쿠키와 개인 식별 정보를 쓰지 않고, 페이지별 접속 횟수만 센다.
   goatcounter.com 에서 만든 사이트 코드를 아래 CODE 에 넣으면 집계가 시작된다.
   CODE 가 비어 있으면 아무 일도 하지 않는다. */
(function () {
  var CODE = '';
  if (!CODE) return;
  try {
    if (navigator.doNotTrack === '1') return;
    var s = document.createElement('script');
    s.async = true;
    s.setAttribute('data-goatcounter', 'https://' + CODE + '.goatcounter.com/count');
    s.src = 'https://gc.zgo.at/count.js';
    document.head.appendChild(s);
  } catch (e) {}
})();
