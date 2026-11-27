# SODA Jugendliche

청소년 독일어 교재 「청소년 독일어 발돋움」입니다. 독일어를 처음 배우는 초등 고학년, 중학생, 고등학생이 A1부터 B1까지 배웁니다. 여섯 단계(A1.1, A1.2, A2.1, A2.2, B1.1, B1.2)의 본문이 모두 올라와 있습니다. 단계마다 과 8개, Station 2개, Stufentest 1개이고 모두 48과입니다. 여섯 단계 모두 독일어 음성(Eleven v3)까지 들어 있습니다. A2.1과 A2.2의 음성은 2026-11-27에 나중에 넣었습니다.

## 공개 상태

지금은 **공개**입니다 (`tools/status.json` 의 `public` 이 `true`). Lehrwerk 목차의 청소년 칸을 누르면 열리고, 사이트맵에 들어 있습니다.

비공개로 돌리려면 `public` 을 `false` 로 바꾸고 `python3 jugend/tools/lektion.py site` 와 `JUGEND_DATE=그날 날짜 python3 jugend/tools/build.py` 를 실행합니다. 그러면 목차 칸은 「작업 중」으로 바뀌고 화면마다 `noindex` 가 들어가며, 사이트맵과 알림에서 빠집니다. 루트 `index.html` 의 청소년 칸은 링크가 없는 칸으로 되돌립니다(같은 묶음의 「작업 중」 칸과 같은 모양: `<div class="tile soon buch" aria-disabled="true">`, 업데이트 날짜 자리에 `<span class="meta st">작업 중</span>`, 화살표 없음).

## 음성이 없는 단계를 둘 때

`tools/status.json` 의 `ohne_audio` 에 단계 이름(예: `a2-1`)을 적으면 그 단계는 음성 없이 화면을 엽니다. 지금은 목록이 비어 있습니다.

- 듣기 단추는 꺼져 있고, 화면 위에 「음성은 준비 중이에요」 안내가 보입니다.
- 듣기 글의 대본은 처음부터 펼쳐져 있습니다. 받아쓰기는 문장만 보여 주고 채점하지 않습니다.
- 목차에서는 그 단계의 「시작하기」 단추 아래에 음성이 준비 중이라는 안내가 보입니다.

음성을 넣을 때

1. `python3 jugend/tools/lektion.py tts a21 a2-1` 처럼 단계마다 대본을 만듭니다(A2.1은 35,840자, A2.2는 38,162자였습니다).
2. 대본으로 만든 음성과 낱말 시각 파일을 한 폴더에 받아 `python3 jugend/tools/lektion.py cut 폴더` 로 자릅니다. 한 줄이 다른 줄과 붙어 「sounds for lines」 오류가 나면 그 대본 하나만 다시 만들어 `cut 폴더 대본이름` 으로 자릅니다(2026-11-27 a22_lu_05가 이랬습니다: 쉼이 0.13초였습니다).
3. `tools/status.json` 의 `ohne_audio` 에서 그 단계를 뺍니다.
4. `python3 jugend/tools/lektion.py site` 와 `JUGEND_DATE=그날 날짜 python3 jugend/tools/build.py` 를 실행합니다. 음성이 하나라도 빠진 화면은 열리지 않으므로, 빠진 줄이 있으면 1번부터 다시 합니다.

## 틀

- 주소: https://sophiadeutschakademie.github.io/SODA-Lehrwerk/jugend/
- 목차 묶음: Lehrbuch
- 이야기 틀: 서울에서 온 Yuna가 쾰른의 학교에서 보내는 두 해. A1과 A2는 8b 반에서 보내는 첫해이고, A2.2의 8과에서 Yuna가 한 해 더 있기로 합니다. B1에서는 한 학년 올라간 9b 반(학생 24명)이 팟캐스트 「Mitreden」을 만들며 주제를 조사하고 토론합니다. B1.1의 1~4과는 첫 방송에 넣을 꼭지(가족, 공부, 우정, 가짜 뉴스)를 준비하고, 첫 방송은 Station 1에서 녹음합니다. 5과부터는 첫 방송이 나간 뒤의 이야기입니다(5과 건강 설문, 6과 서울 친구 Mina의 방문과 기차 연착 항의, 7과 기후 프로젝트 주간, 8과 동물 보호소 봉사와 벼룩시장). Station 2에서는 「학교를 아홉 시에 시작해야 할까?」로 찬반 토론을 엽니다. B1.2는 둘째 해의 4월부터 여름 방학 전까지입니다(1과 직업 체험 지원, 2과 광고와 소비, 3과 Lukas네 마을과 미래의 도시, 4과 베토벤 생가와 문화의 밤, Station 1 이력서와 자기소개 영상, 5과 Herr Krause와 Elif의 할머니에게 듣는 분단과 이주, 6과 발명 전시회와 기술 토론, 7과 Yuna의 한국과 독일 발표, 8과 마지막 방송과 작별 저녁). Station 2에서는 주제를 골라 5분 발표를 준비합니다. 성적표를 받는 날은 2027년 7월 16일 금요일이고, Yuna는 7월 17일 토요일 11시 비행기로 한국에 돌아갑니다.

## 단계

| 단계 | 이름 | 내용 | 마지막 |
|---|---|---|---|
| A1.1 | Ankommen 첫 만남 | 인사, 반, 학용품, 시간표, 취미, 가족, 음식, 하루 일과 | Stufentest A1.1 |
| A1.2 | Einleben 익숙해지기 | 집, 길 찾기, 약속, 쇼핑, 건강, 지난 일, 여행, 축제 | Stufentest A1.2 |
| A2.1 | Dazugehören 어울리기 | 새 학기, 친구, 미디어, 집안일, 동아리, 요리, 교통, 스타일 | Stufentest A2.1 |
| A2.2 | Entdecken 넓혀 가기 | 진로, 수학여행, 환경, D-A-CH, 용돈, 갈등, 음악과 영화, 한 해 돌아보기 | Stufentest A2.2 |
| B1.1 | Mitreden 의견 말하기 | 가족과 세대, 공부, 우정, 뉴스, 건강, 여행, 기후, 참여 | Stufentest B1.1 |
| B1.2 | Weiterdenken 깊이 생각하기 | 직업, 소비, 주거, 예술, 역사, 기술, 문화, 마무리 | Stufentest B1.2 |

단계마다 과 8개, Station 2개(4과와 8과 뒤, 복습과 프로젝트), 평가 1개(Stufentest)가 있습니다. 모두 48과입니다. 시험 형식 연습과 시험 안내는 넣지 않습니다.

한 과는 여섯 순서로 진행합니다: Einstieg, Hören und Lesen, Wortschatz, Grammatik, Training, Sprechen und Schreiben. 과마다 Aussprache(발음), Land und Leute(문화), Lerntipp(공부 요령)이 함께 들어갑니다.

## 파일

```
index.html              목차 화면 (빌드 결과, 직접 고치지 않습니다)
a1-1/1/ … a1-1/8/       과 화면 (빌드 결과). a1-1/station-1/, a1-1/station-2/, a1-1/stufentest/ 도 같은 틀입니다. a1-2/, a2-1/, a2-2/, b1-1/, b1-2/ 도 같습니다
lektion.css, lektion.js 과 화면의 모양과 동작 (모든 과가 같이 씁니다)
audio/<단계>/<과>/      독일어 음성 (mp3, 한 줄에 파일 하나). 여섯 단계 모두 있습니다
img/<단계>/<과>/        장면 그림 szene.webp, 단어 그림 c1.webp …, Station 이야기 그림 b1.webp …
img/c/                  등장인물 얼굴
manifest.webmanifest    홈 화면에 추가할 때 쓰는 정보
icons/, fonts/          앱 아이콘, 독일어 글꼴 DM Sans(라틴 글자만)와 사용 허가서 OFL.txt
tools/inhalt.json       단계, 과 제목, 말하기 목표, 문법, Station, 평가, 과 구성
tools/shell.html        목차 화면 틀
tools/build.py          inhalt.json + shell.html + open.json -> index.html
tools/src/<단계>/       과 원고 (1.txt … 8.txt, s1.txt, s2.txt, t.txt). 쓰는 법은 tools/src/README.md
tools/page.html         과 화면 틀
tools/lektion.py        원고 검사, 음성 대본 만들기, 음성 자르기, 그림 자르기, 과 화면 만들기
tools/audio/            음성 파일 이름표 (과마다 "말한 사람|글" -> 파일 이름)
tools/tts/              음성과 그림을 만들 때 쓴 대본과 프롬프트
tools/open.json         본문이 올라온 화면 목록 (lektion.py site 가 적습니다)
tools/status.json       공개 여부(public)와 음성이 아직 없는 단계(ohne_audio)
tools/blocks/           다크 모드 스위치, 목차 버튼, 홈 화면에 앱 추가 공통 조각
```

## 고치는 법

과 내용을 고칠 때

1. `tools/src/<단계>/<과>.txt`를 고칩니다.
2. `python3 jugend/tools/lektion.py check`로 원고를 검사합니다.
3. 독일어 문장을 바꾸거나 더했으면 그 줄의 음성을 새로 만들어야 합니다. `python3 jugend/tools/lektion.py tts 이름`이 음성이 없는 줄만 모아 대본(`tools/tts/이름_*.json`)을 만듭니다. 대본으로 만든 음성과 낱말 시각 파일을 한 폴더에 받아 `python3 jugend/tools/lektion.py cut 폴더`로 자릅니다. 낱말과 예문 사이에 쉼 없이 읽힌 줄은 알려 준 경계 가까이의 가장 조용한 곳에서 나누고 `short pause inside a word line (0.0)`으로 알려 주므로, 그 줄은 한 번 확인합니다.
4. `python3 jugend/tools/lektion.py site`로 과 화면을 다시 만들고, `python3 jugend/tools/build.py`로 목차를 다시 만듭니다. 음성이나 그림이 하나라도 빠진 과는 열리지 않고 목차에도 링크가 생기지 않습니다. `tools/status.json` 의 `ohne_audio` 에 적힌 단계만 음성 없이 열립니다.

목차만 고칠 때는 `tools/inhalt.json`을 고치고 `python3 jugend/tools/build.py`를 실행합니다. 단계마다 과 8개, Station 2개, 평가 1개인지 확인한 뒤 `index.html`을 만들고, 저장소의 `tools/seo.py`를 이어서 실행합니다.

## 학습 기록

과 화면은 이 브라우저의 localStorage `soda-jugend-v1`에 기록을 남깁니다. 과마다 마지막으로 본 순서, 문제 결과, 쓴 글, 자기 평가, 마친 날이 들어갑니다. 목차 화면은 이 기록을 읽어 마친 과와 보던 과를 표시합니다. 과를 고칠 때 이 기록의 짜임을 바꾸지 않습니다. 녹음한 목소리는 저장하지 않습니다.

화면은 다크 모드가 기본이고, 목차 주소 끝에 `#a1-1`부터 `#b1-2`까지 붙이면 그 단계가 열립니다. 과 화면 주소 끝에는 `#einstieg`, `#hoeren`, `#wortschatz`, `#grammatik`, `#training`, `#sprechen`을 붙일 수 있습니다.
