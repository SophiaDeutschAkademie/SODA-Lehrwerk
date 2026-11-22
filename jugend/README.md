# SODA Jugendliche

청소년 독일어 교재 「청소년 독일어 발돋움」입니다. 독일어를 처음 배우는 초등 고학년, 중학생, 고등학생이 A1부터 B1까지 배웁니다. 지금은 목차만 있고, 본문은 A1.1부터 차례로 올립니다.

- 주소: https://sophiadeutschakademie.github.io/SODA-Lehrwerk/jugend/
- 목차 묶음: Lehrbuch
- 이야기 틀: 서울에서 온 Yuna가 쾰른의 학교(8b 반)에서 보내는 한 해. B1에서는 반 친구들이 팟캐스트를 만들며 주제를 조사하고 토론합니다.

## 단계

| 단계 | 이름 | 내용 | 마지막 |
|---|---|---|---|
| A1.1 | Ankommen 첫 만남 | 인사, 반, 학용품, 시간표, 취미, 가족, 음식, 하루 일과 | Stufentest A1.1 |
| A1.2 | Einleben 익숙해지기 | 집, 길 찾기, 약속, 쇼핑, 건강, 지난 일, 여행, 축제 | Stufentest A1.2 |
| A2.1 | Dazugehören 어울리기 | 새 학기, 친구, 미디어, 집안일, 동아리, 요리, 교통, 스타일 | Stufentest A2.1 |
| A2.2 | Entdecken 넓혀 가기 | 진로, 수학여행, 환경, D-A-CH, 용돈, 갈등, 음악과 영화, 한 해 돌아보기 | Stufentest A2.2 |
| B1.1 | Mitreden 의견 말하기 | 가족과 세대, 공부, 우정, 뉴스, 건강, 여행, 기후, 참여 | Stufentest B1.1 |
| B1.2 | Weiterdenken 깊이 생각하기 | 직업, 소비, 주거, 예술, 역사, 기술, 문화, 마무리 | Stufentest B1.2 |

단계마다 과 8개, Station 2개(4과와 8과 뒤, 복습과 프로젝트), 평가 1개(Stufentest)가 있습니다. 모두 48과입니다. 시험 형식 연습은 넣지 않습니다. 목차 아래에는 단계 수준에 맞는 Goethe 시험 이름만 안내합니다.

한 과는 여섯 순서로 진행합니다: Einstieg, Hören und Lesen, Wortschatz, Grammatik, Training, Sprechen und Schreiben. 과마다 Aussprache(발음), Land und Leute(문화), Lerntipp(공부 요령)이 함께 들어갑니다.

## 파일

```
index.html              목차 화면 (빌드 결과, 직접 고치지 않습니다)
manifest.webmanifest    홈 화면에 추가할 때 쓰는 정보
icons/                  앱 아이콘
fonts/                  독일어 글꼴 DM Sans(라틴 글자만, 굵기 400–900)와 사용 허가서 OFL.txt
tools/inhalt.json       단계, 과 제목, 말하기 목표, 문법, Station, 평가, 과 구성
tools/shell.html        화면 틀(CSS와 스크립트)
tools/blocks/           다크 모드 스위치, 목차 버튼, 홈 화면에 앱 추가 공통 조각
tools/build.py          inhalt.json + shell.html -> index.html
```

## 고치는 법

1. `tools/inhalt.json`에서 과 제목이나 내용을 고칩니다. 과 하나는 `{"t": "l", "de": 독일어 제목, "ko": 주제, "ziel": 말하기 목표, "gr": 문법}`이고, Station은 `"t": "s"`, 평가는 `"t": "t"`입니다.
2. `python3 jugend/tools/build.py`를 실행합니다. 단계마다 과 8개, Station 2개, 평가 1개인지 확인한 뒤 `index.html`을 만들고, 저장소의 `tools/seo.py`를 이어서 실행합니다.
3. 본문을 올릴 때는 과 항목에 주소를 더해 목차의 줄을 링크로 바꿉니다(아직 만들지 않았습니다).

화면은 다크 모드가 기본이고, 주소 끝에 `#a1-1`부터 `#b1-2`까지 붙이면 그 단계가 열립니다. 저장하는 학습 기록은 아직 없습니다.
