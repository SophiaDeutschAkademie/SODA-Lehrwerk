# 성인 교재 세 권: SODA Basis, SODA Studium, SODA Beruf

성인 학습자를 위한 독일어 교재 세 권의 원고와 도구가 있는 폴더입니다. 지금은 세 권의 목차와 「성인 독일어」 열 과(A1.1의 1과부터 6과, A1.2의 1과부터 4과)의 본문이 있고, 모두 비공개입니다. 본문 음성은 Eleven v3로 만들어 넣었습니다(2026.11.25에 A1.1의 다섯 과, 2026.11.26에 그다음 다섯 과, 모두 1,488줄).

| 교재 | 이름 | 대상 | 범위 | 목차 주소 |
|---|---|---|---|---|
| SODA Basis | 성인 독일어 | 독일에서 공부하거나 일하거나 살려는 성인 | A1–B1, 여섯 단계 40과 (공통 과정) | https://sophiadeutschakademie.github.io/SODA-Lehrwerk/basis/ |
| SODA Studium | 대학생 독일어 | 독일 유학과 교환 학기를 준비하는 대학생 | B2–C1 Hochschule, 네 단계 28과 | https://sophiadeutschakademie.github.io/SODA-Lehrwerk/studium/ |
| SODA Beruf | 직장인 독일어 | 독일 취업과 이직을 준비하는 직장인과 성인 | B2, 두 단계 16과 | https://sophiadeutschakademie.github.io/SODA-Lehrwerk/beruf/ |

Lehrwerk 목차에서는 세 교재 모두 「작업 중」 칸으로 보이고 링크가 없습니다. 위 주소를 직접 열면 목차를 볼 수 있습니다.

2026.11.27에 분류를 바꿨습니다. 그전에는 대학생용(A1–C1 Hochschule, 68과)과 직장인용(A1–B2, 56과) 두 권이었고, A1–B1 40과가 두 권에 똑같이 들어 있었습니다. 같은 과가 두 번 나오지 않게 공통 과정을 「성인 독일어」 한 권으로 떼고, B2부터 두 권으로 나눴습니다. 교재 이름은 2026.11.28에 「성인 독일어 밑바탕」「대학생 독일어 디딤돌」「직장인 독일어 길잡이」에서 뒤의 낱말을 떼어 「성인 독일어」「대학생 독일어」「직장인 독일어」로 줄였습니다(청소년 교재도 「청소년 독일어 발돋움」에서 「청소년 독일어」로). 폴더 이름 `basis` 는 임시로 정한 것입니다. 이름이나 폴더를 바꾸려면 `tools/inhalt.json` 의 `books` 와 `tools/seo.py`, 루트 `index.html` 의 칸을 고치고 폴더를 옮깁니다. `studium/a1-…`, `beruf/a1-…` 주소는 없앴습니다(비공개 상태라 옛 주소에서 넘겨 주는 화면은 두지 않았습니다).

본문이 있는 과 (2026.11.26): A1.1 Lektion 1 Guten Tag!, 2 Beruf und Studium, 3 Familie und Freunde, 4 Einkaufen, 5 Mein Tag, 6 Termine, A1.2 Lektion 1 In der Stadt, 2 Meine Wohnung, 3 Gesundheit, 4 Was haben Sie gemacht? 주소는 `basis/a1-1/1/` … `basis/a1-1/6/`, `basis/a1-2/1/` … `basis/a1-2/4/`입니다. 과마다 여섯째 순서 Aufgabe의 과제가 두 가지(대학 과제, 직장 과제)이고 학습자가 하나를 고릅니다. A1.1의 Wiederholung 두 개와 Stufentest, A1.2의 5과부터는 아직 없습니다. 그래서 A1.1 6과 끝의 「다음」 단추는 A1.2 1과로 바로 갑니다(`site` 는 단계의 마지막 화면을 그 뒤에 열려 있는 첫 화면으로 잇습니다).

## 구조

A1부터 B1까지는 대학생과 직장인이 배우는 문법과 기본 어휘가 같으므로 한 권(「성인 독일어」)으로 만듭니다. B2부터는 필요한 말이 달라지므로 목적에 따라 두 권으로 나눕니다.

| 단계 | 이름 | 과 | 교재 |
|---|---|---|---|
| A1.1 | Neu hier, 새 출발 | 6 | Basis (공통 과정) |
| A1.2 | Im Alltag, 생활 꾸리기 | 6 | Basis (공통 과정) |
| A2.1 | Angekommen, 자리 잡기 | 6 | Basis (공통 과정) |
| A2.2 | Mittendrin, 생활 넓히기 | 6 | Basis (공통 과정) |
| B1.1 | Im Gespräch, 의견 나누기 | 8 | Basis (공통 과정) |
| B1.2 | Perspektiven, 진로와 사회 | 8 | Basis (공통 과정) |
| B2.1 | Im Team, 함께 일하기 | 8 | Beruf (직장인) |
| B2.2 | Verantwortung, 맡아서 이끌기 | 8 | Beruf (직장인) |
| B2.1 | Auf dem Campus, 대학 생활 | 8 | Studium (대학생) |
| B2.2 | Argumentieren, 논증하고 쓰기 | 8 | Studium (대학생) |
| C1.1 | Verstehen, 학문의 글과 강의 | 6 | Studium (대학생) |
| C1.2 | Mitgestalten, 쓰고 발표하기 | 6 | Studium (대학생) |

- 만드는 과는 Basis 40과, Beruf 16과, Studium 28과(B2 16과, C1 Hochschule 12과)로 모두 84과입니다.
- 단계마다 복습과 실전 과제를 하는 Wiederholung 2개와 단계 평가(Stufentest) 1개가 있습니다.
- 공통 과정의 과는 마지막 순서의 과제(Aufgabe)가 두 가지입니다. 대학 과제는 캠퍼스 상황, 직장 과제는 직장과 생활 상황입니다. 과 화면에 둘 다 들어 있고, 학습자가 「과제 고르기」에서 고른 쪽만 보입니다. 고른 것은 다음 과에서도 이어지고 언제든 바꿀 수 있습니다.
- 과 안에는 시험 형식 연습을 넣지 않습니다. A2.2, B1.2, B2.2, C1.2의 단계 정보에 SODA Modelltest로 가는 링크만 둡니다.
- 한 과는 일주일 공부량으로 잡았습니다.

## 한 과의 순서

1. Ziel: 이 과에서 해낼 일을 먼저 보고, 아는 말로 한번 해 봅니다.
2. Hören: 관청, 병원, 직장, 대학에서 실제로 오가는 대화를 듣습니다.
3. Wortschatz: 낱말을 덩어리 표현으로 익힙니다.
4. Grammatik: 표와 규칙으로 바로 정리하고 문장으로 확인합니다. Syntalab의 해당 Lektion으로 이어집니다.
5. Lesen und Training: 서식, 안내문, 메일 같은 실제 글을 읽고 연습합니다.
6. Aufgabe: 말하기와 쓰기 과제를 하고 스스로 점검합니다.

C1 Hochschule 단계는 긴 글과 강의가 중심이라, 본문을 만들 때 순서를 따로 정해야 합니다.

## 설정

무대는 프랑크푸르트입니다. 대학에 가려는 사람, 직장인, 가족과 사는 사람 세 명이 함께 나와서 대학 과제와 직장 과제가 같은 이야기 위에 놓입니다. 지금까지 쓴 열 과를 아래 설정으로 썼습니다. 교재 속의 지금은 2026년입니다.

| 인물 | 설정 |
|---|---|
| Jiu Kim | 서울 출신. 어학원에서 독일어를 배우고, 그다음에 Informatik을 공부할 계획. Bockenheim의 WG에서 Lena와 삶. 부모 Sangho와 Mira, 남동생 Junho(23살, 부산에서 대학 다님). 대학생 과정의 중심 인물 |
| Dohyun Park | 부산 출신. Kessler Technik의 Ingenieur. Bockenheim에 삶. 아내 Sujin은 아직 한국에 있고 아들 Minjun은 5살. 직장인 과정의 중심 인물 |
| Sora Lee | Designerin(지금은 일하지 않음). 남편 Minho는 Informatiker, 딸 Hana는 8살이고 Sachsenhausen의 학교에 다님. 부모는 인천, 남자 형제는 서울에 삶. 생활 장면의 중심 인물 |
| Lena | Jiu와 같이 사는 독일인 대학생. Biologie 전공. 언니 둘이 Hamburg에 삶 |
| Frau Becker (Anna Becker) | 어학원 독일어 선생님 |
| Markus Weber | Dohyun의 동료 Ingenieur. Hamburg 출신. 딸 Mia(8살), 아들 Paul(3살) |
| Frau Hoffmann | Dohyun의 팀장. Köln 출신. Deutsch, Englisch, Französisch를 함 |

- 그 밖에 나오는 사람: 어학원 수강생 Carlos García(스페인, Offenbach)와 Ewa Nowak(폴란드, Mainz), 어학원 사무실의 Frau Wagner, Kessler Technik의 동료 Frau Schulz(Sabine Schulz), 거래처의 Herr Schneider(Peter Schneider. A1.1 2과의 업무 행사에서 처음 만나고 A1.2 1과에서 회사로 찾아옴), 의사 Dr. Neumann(여자. Sora의 딸 Hana와 Dohyun이 가는 병원), 집주인 Frau Krause, Jiu와 Lena의 WG에서 이사 나가는 Tim.
- A1.1 6과부터 A1.2 4과까지 더한 설정: Kessler Technik은 U4 Bockenheimer Warte 역에서 걸어서 5분, 약국 근처입니다(중앙역에서 두 정거장). WG의 빈방은 16 qm, 520유로 warm이고 과제에 나오는 WG 주소는 Beispielweg 7입니다. Dohyun이 가족과 살려고 본 집은 방 3개, 78 qm, Kaltmiete 1.350유로, Nebenkosten 250유로, Kaution은 석 달 치 Kaltmiete입니다. Sora는 서울에서 Design을 전공하고(2007–2011) 가구 회사에서 10년 동안 Designerin으로 일했고(2011–2021), 여섯 달 전에 독일에 와서 지금 일자리를 찾습니다. Lena는 주말에 Hamburg의 언니들에게 다녀왔고, Dohyun의 고객은 Mainz에 있습니다.
- 바뀔 수 있는 사실은 쓰기 전에 확인했습니다(2026.11.26): RMV 프랑크푸르트 Einzelfahrkarte 어른 3,80유로, 어린이 1,55유로. U4는 Bockenheimer Warte, Festhalle/Messe, Hauptbahnhof, Willy-Brandt-Platz, Dom/Römer, Konstablerwache 순서로 서고, Zoo 역은 Konstablerwache 다음 역으로 U6와 U7이 섭니다. Deutschlandticket은 값이 해마다 바뀌어서 값을 적지 않았습니다. 요금이 바뀌면 A1.2 1과의 대화 B, 듣기 문제, 받아쓰기를 고치고 그 줄의 음성을 다시 만듭니다.
- Kessler Technik은 지어낸 회사입니다. 주소는 견본 주소 Musterstraße 12, 60487 Frankfurt am Main, 전화번호는 드라마용 번호(0176 040690xx, 069 90009-xxx), 이메일은 example.com과 example.org를 씁니다.
- 과제의 예시 답에 나오는 학습자는 Minji Choi(대구 출신, 프랑크푸르트 거주)입니다.
- du로 나눈 어른들의 대화도 한국어 뜻은 '해요'로 옮깁니다. 까닭은 1과의 「Leben in Deutschland」에 적었습니다.
- 이름과 설정을 바꾸면 지금까지 쓴 과의 원고와 그림 설명(`tools/lektion.py`의 `WHO`)을 함께 고치고, 바뀐 줄의 음성을 다시 만듭니다.

## 학원 자료와 맞춰 본 것

### Syntalab

과마다 그 과의 문법을 다루는 Syntalab Lektion 번호를 `syn` 에 적었고, 목차에서 번호를 누르면 그 Lektion(`grammatik/#/L05`)이 열립니다. 번호는 Syntalab 각 Lektion의 본문에서 그 문법 항목을 찾아 확인하고 붙였습니다. Syntalab에 없는 항목(Alphabet, Nomen-Verb-Verbindungen, 필기 약어, Gesprächsstrategien, Ausklammerung, 수치 변화를 말하는 steigen um · sinken auf)에는 번호가 없습니다.

### SODA GRAMMATIK KURS (문법 과정 16 Lektion)

문법 과정은 문법 체계를 먼저 배우는 과정이고 이 교재는 상황 순서로 가므로, 순서가 그대로 겹치지는 않습니다. 문법 과정 수강생이 함께 쓸 때 볼 자리는 아래와 같습니다.

| 문법 과정 | 이 교재에서 다루는 과 |
|---|---|
| 01 명사 · 관사 · 격 | A1.1 3–4과, A1.2 5과, B1.1 7과 |
| 02 인칭대명사 | A1.1 1과, A1.2 5과, A2.2 4과 |
| 03 현재형 동사변화 | A1.1 1–3과, 5과 |
| 04 어순 · 의문문 · 수사 | A1.1 1–2과, 5–6과, A1.2 1과, 3과, 6과 |
| 05 소유관사 | A1.1 2–4과, A1.2 3과 |
| 06 전치사와 격 | A1.2 1–2과, 6과, A2.1 1과, A2.2 1과, B1.1 7과 |
| 07 형용사 · Teil 1 | A2.1 6과, A2.2 1과, B1.1 6과 |
| 08 비교급 · 최상급 | A2.1 6과, B1.1 6과 |
| 09 화법조동사 · 분리동사 | A1.1 4–6과, A1.2 3과 |
| 10 현재완료 | A1.2 4과, A2.1 2과 |
| 11 과거 · 과거완료 | A1.2 4과, A2.1 2과, B1.1 3과, B1.2 1과, 6과 |
| 12 재귀동사 · 비인칭 | A1.2 2과, A2.1 3과, A2.2 3과, B1.1 8과 |
| 13 접속사 · 종속절 | A1.2 6과, A2.1 3–5과, A2.2 2과, 6과, B1.1 1과, 3–4과, B1.2 1–2과, 4과, 7–8과 |
| 14 관계문 · 분사 | A2.2 5과, B1.1 2과, B1.2 4과, 6과 |
| 15 수동태 | A2.2 6과, B1.1 5과, B1.2 3과 |
| 16 접속법 | A2.1 3–4과, A2.2 4과, B1.1 2과, 4과, B1.2 5과, B2 단계의 간접화법(대학생 B2.1 4과, B2.2 3과, 직장인 B2.1 3과) |

문법 과정 4과에는 명령형, 시각, 날짜가, 5과에는 kein과 nicht가, 6과에는 2격 전치사와 n-변화가, 12과에는 전치사와 함께 쓰는 동사가, 13과에는 zu 부정형이, 16과에는 접속법 I이 함께 들어 있어서 그 내용을 다루는 과도 같이 적었습니다. 미래형(문법 과정 11과 참고, 교재 A2.2 2과와 B1.2 2과), lassen(문법 과정 9과, 교재 B1.2 3과), Modalpartikeln(문법 과정 4과, 교재 B1.2 8과)은 문법 과정에서 짧게만 나옵니다.

### 학원 A2 · B1 과정 챕터

A2와 B1 단계의 주제는 학원 과정 챕터와 짝이 되도록 골랐습니다. 2026년 11월 23일에 저장소에서 확인한 챕터 수는 A2 16개, B1 20개, B2 20개입니다. 교재의 과 수(A2 12과, B1 16과)와 같지 않으므로 한 과에 챕터 둘이 붙는 곳이 있습니다.

| 교재 | 학원 A2 과정 챕터 |
|---|---|
| A2.1 1과 Wohnen und Nachbarn | 1 Meine Wohnung, meine Stadt |
| A2.1 2과 Wie war’s? | 2 Am Wochenende war es toll!, 6 Meine Kindheit |
| A2.1 3과 Gute Besserung! | 3 Gute Besserung!, 14 Im Notfall |
| A2.1 4과 Auf dem Amt | 12 Auf dem Amt |
| A2.1 5과 Zu Gast | 5 Eine Einladung zum Geburtstag, 9 Essen und Kochen |
| A2.1 6과 Einkaufen und Reklamieren | 4 Das steht dir gut! |
| A2.2 1과 Unterwegs | 10 Unterwegs in der Stadt, 16 Wandern in den Bergen |
| A2.2 3과 Kontakt halten | 7 Ich interessiere mich für… |
| A2.2 4과 Geld und Verträge | 13 Auf der Bank und auf der Post |
| A2.2 5과 Freizeit und Vereine | 7 Ich interessiere mich für…, 15 Im Tierheim |
| A2.2 6과 Leben in Deutschland | 8 Leben in Deutschland |

짝이 없는 것: 교재 A2.2 2과 Arbeit und Ausbildung, 과정 챕터 11 Wetter und Jahreszeiten(날씨는 교재 A1.2 6과에서 다룹니다).

| 교재 | 학원 B1 과정 챕터 |
|---|---|
| B1.1 1과 Sprachen lernen | 1 Warum lernen Sie Deutsch? |
| B1.1 2과 Zusammen leben | 3 Zusammen leben, 6 Generationen im Wandel |
| B1.1 3과 Medien und Nachrichten | 2 Medien im Alltag |
| B1.1 4과 Gesund bleiben | 4 Gesund leben — aber wie? |
| B1.1 5과 Arbeitswelt | 5 Arbeitswelt im Wandel |
| B1.1 6과 Stadt und Land | 7 Stadt oder Land? |
| B1.1 7과 Konsum und Geld | 10 Konsum und Werbung, 19 Reparieren statt wegwerfen |
| B1.1 8과 Freundschaft und Beziehungen | 15 Zweihundert Stunden bis zur Freundschaft |
| B1.2 1과 Bewerbung | 20 Ausbildung oder Studium? |
| B1.2 2과 Studium und Weiterbildung | 14 Studium und Uni-Alltag, 20 Ausbildung oder Studium? |
| B1.2 3과 Umwelt | 8 Umwelt und Nachhaltigkeit |
| B1.2 4과 Engagement | 9 Ehrenamt und Engagement |
| B1.2 5과 Reisen und Kulturen | 13 Reisen — Erwartung und Wirklichkeit |
| B1.2 6과 Geschichte | 17 Rätsel im Museum, 18 Der Mauerfall |
| B1.2 7과 Technik und Zukunft | 12 Meine Zukunft |
| B1.2 8과 Ziele und Wege | 11 Was macht uns glücklich?, 12 Meine Zukunft |

짝이 없는 것: 과정 챕터 16 Ungewöhnliche Hobbys.

B2는 학원 과정 챕터가 사회 주제 토론이고 이 교재의 B2는 직장과 대학의 상황이라 짝을 짓지 않았습니다.

## 폴더

```
erwachsene/tools/inhalt.json   교재 세 권(books), 단계(levels), 과의 순서(aufbau), 과마다 함께 들어 있는 것(extras)
erwachsene/tools/build.py      목차 빌드: basis/index.html, studium/index.html, beruf/index.html, 세 폴더의 manifest.webmanifest
erwachsene/tools/shell.html    목차 화면 틀 (청소년 교재 목차와 같은 모양, 교재마다 색만 다름)
erwachsene/tools/icons.py      앱 아이콘 만들기: basis/icons/, studium/icons/, beruf/icons/
erwachsene/tools/status.json   공개 여부(public)와 음성을 아직 만들지 않은 단계(ohne_audio)
erwachsene/tools/blocks/       다크 모드 스위치, 홈 버튼, 글자 크기 버튼(soda-fz.html), 「홈 화면에 앱 추가」 공통 조각
erwachsene/tools/lektion.py    과 화면 도구: check, prompts, img, site, tts, cut
erwachsene/tools/page.html     과 화면 틀
erwachsene/tools/src/          과 원고 (단계 폴더/과 번호.txt)와 쓰는 법 README.md
erwachsene/tools/tts/          그림 설명 묶음(*.prompts.json). 음성을 만들면 음성 목록도 여기에 생깁니다
erwachsene/tools/open.json     본문이 있는 과 목록 (site 가 씁니다. 목차 빌드가 읽어서 링크를 겁니다)
erwachsene/lektion.css, lektion.js   과 화면의 모양과 동작 (세 교재가 함께 씁니다). 글자 크기는 font-size:calc(17px*var(--fz)) 처럼 적습니다 (저장소 README 「글자 크기(교재)」)
erwachsene/img/                과 그림: 단계/과/szene.webp(장면), c1.webp …(낱말 그림), c/(인물 얼굴), titel/<교재>.webp(목차 표지 그림 1200×900, 그림 설명은 inhalt.json books 의 bildalt)
erwachsene/audio/              과 음성(mp3, 한 줄에 파일 하나, 31MB)
erwachsene/fonts/              독일어 글꼴 DM Sans(라틴 글자만)와 사용 허가서 OFL.txt
basis/, studium/, beruf/       빌드 결과 (index.html, manifest.webmanifest, icons/, 단계/과/index.html)
```

## inhalt.json

- `books`: 교재마다 이름, 소개 글, 표지 그림 설명(`bildalt`. 그림 파일은 `erwachsene/img/titel/<id>.webp`), 색(`farbe`), 그 교재에 든 단계의 `id` 목록(`levels`), 앞뒤 교재를 알리는 글과 링크(`weiter`). 한 교재에는 `art` 가 같은 단계만 넣고, 단계마다 교재가 하나씩 있어야 합니다(`build.py` 가 검사합니다)
- `levels`: 단계마다 `id`, `code`(A1.1), `art`(`g` 공통, `s` 대학생, `b` 직장인), 이름(`de`, `ko`), 소개(`lead`), 마치면 할 수 있는 일 세 가지(`kann`), 읽고 쓰는 글(`text`), 독일 생활과 제도(`leben`), 함께 쓰는 앱(`apps`), 마친 뒤 연결(`nach`), 과 목록(`items`)
- 과(`t: l`): 제목(`de`), 주제(`ko`), 목표(`ziel`), 문법(`gr`), Syntalab Lektion 번호(`syn`), 과제. 공통 과정은 `as`(대학 과제)와 `ab`(직장 과제), B2부터는 `auf` 하나
- 복습(`t: w`)과 단계 평가(`t: t`): 제목과 설명(`txt`)

## 고칠 때

1. `tools/inhalt.json` 을 고칩니다.
2. `ERWACHSENE_DATE=그날 날짜 python3 erwachsene/tools/build.py` 를 실행합니다. 세 목차를 다시 만들고 끝에 `tools/seo.py` 를 부릅니다.
3. 단계 수나 색을 바꿨으면 `python3 erwachsene/tools/icons.py` 로 아이콘도 다시 만듭니다.

## 공개할 때

1. `tools/status.json` 의 `public` 을 `true` 로 바꿉니다.
2. `python3 erwachsene/tools/lektion.py site` 와 목차 빌드를 다시 실행합니다. 목차와 과 화면에서 noindex 가 빠지고 `tools/seo.py` 가 목차 세 곳에 검색 태그를 넣고 사이트맵에 세 주소를 넣습니다.
3. 과 화면 주소는 `tools/seo.py` 가 아직 사이트맵에 넣지 않습니다. 공개할 때 어린이 교재처럼 과 주소를 사이트맵에 넣는 부분을 `tools/seo.py` 에 더합니다.
4. 루트 `index.html` 의 세 칸을 `<a class="tile buch" href="basis/">`, `<a class="tile buch" href="studium/">`, `<a class="tile buch" href="beruf/">` 로 바꾸고, 「작업 중」 표시 자리에 업데이트 날짜(`.upd`)를, 끝에 화살표(`.go`)를 넣습니다(어린이·청소년 칸과 같은 모양). 본문이 있는 교재부터 하나씩 열어도 됩니다.
5. `notices.json` 에 공지를 올립니다.

## 본문

과 화면 도구는 청소년 교재의 `jugend/tools/lektion.py`에서 갈라 나왔습니다. 원고 하나(`tools/src/a1-1/1.txt`)가 화면 하나(`basis/a1-1/1/`)가 됩니다. 화면은 그 단계가 든 교재의 폴더에 만들어집니다. 공통 과정의 원고에서 `--S`로 시작하는 블록은 대학 과제, `--B`로 시작하는 블록은 직장 과제입니다. 화면에는 둘 다 들어가고 고른 쪽만 보입니다(아래 「과제 고르기」). 원고 쓰는 법은 `tools/src/README.md`에 있습니다.

청소년 교재와 다른 점:

- 여섯 순서의 이름이 Ziel, Hören, Wortschatz, Grammatik, Lesen und Training, Aufgabe입니다.
- Ziel에서 이 과에서 해낼 일, 문법, 과제를 먼저 보여 줍니다(`inhalt.json`의 `ziel`, `gr`, `as`/`ab`). 공통 과정은 두 과제를 모두 적고, 과제를 고른 뒤에는 고른 쪽만 보입니다.
- 문법은 규칙과 표를 바로 보여 주고 확인 물음을 뒤에 둡니다.
- 읽기 글에 서식(`formular`), 메일(`mail`), 명함(`karte`)이 있습니다.
- Lesen und Training 끝에 그 과의 Syntalab Lektion과 Vokalab으로 가는 「Mehr üben」 상자가 붙습니다(`inhalt.json`의 `syn`).
- 문화 상자의 이름은 「Leben in Deutschland」입니다.
- 공부 기록은 교재마다 따로 남습니다(이 브라우저의 `soda-basis-v1`, `soda-studium-v1`, `soda-beruf-v1`). 공통 과정은 한 권이므로 기록도 하나입니다.

### 과제 고르기 (공통 과정)

- 과제 구역(Aufgabe)의 `--S`, `--B` 블록은 `<div class="nur" data-nur="S">`, `<div class="nur" data-nur="B">` 로 감싸서 둘 다 화면에 넣습니다. 첫 블록 앞에 「과제 고르기」 상자(`.wahl`, 단추 「대학 과제」「직장 과제」)가 놓입니다. Ziel의 과제 줄도 두 줄(`data-nur`)입니다.
- 고르기 전에는 두 과제 블록이 모두 감춰지고 상자만 보입니다. 고르면 `<html data-spur="S">` 또는 `B` 가 붙고 다른 쪽 블록이 감춰집니다. 상자는 작은 한 줄로 줄어들고 언제든 바꿀 수 있습니다.
- 고른 것은 `soda-basis-v1` 의 `o.sp`(`S` 대학, `B` 직장)에 남아 다음 과에서도 이어집니다. 학습 포탈에 로그인한 학생은 다른 기기에서도 이어집니다(`sync.js`).
- 자바스크립트가 꺼져 있으면 상자를 감추고 두 과제를 이름표와 함께 모두 보여 줍니다.
- 공통 과정이 두 교재에 따로 있던 때(2026.11.26까지)의 기록 `soda-studium-v1`, `soda-beruf-v1` 은, `soda-basis-v1` 이 아직 없을 때 과 화면이 한 번 옮겨 옵니다(`lektion.js` 의 `alt()`: 과마다 더 나중 기록, 과제는 마지막에 공부하던 교재 쪽). 옛 기록은 지우지 않습니다. 목차는 옮기기 전에도 옛 기록을 읽어서 마친 과를 표시합니다.
- 쓰기(`schreiben`)와 내 이야기(`ich`, `projekt`) 블록은 저장 이름이 블록 제목에서 나옵니다. 두 과제가 한 화면에 함께 들어가므로 한 과 안에서 제목이 같으면 쓴 글이 서로 겹칩니다. `check` 가 겹치는 제목을 걸러 냅니다.

### 과를 더 만들 때

1. `tools/src/단계/번호.txt` 를 씁니다. `python3 erwachsene/tools/lektion.py check` 가 문제 0이어야 합니다.
2. 그림: `python3 erwachsene/tools/lektion.py prompts 이름 단계` 가 그림 설명 묶음(`tools/tts/이름.prompts.json`)을 만듭니다. ElevenLabs flow `IvbXhqxUBYBb6uxNB2VD`(Recraft 4.1 Flash, 한 장 48.48크레딧)에서 그려 `단계_번호_szene.webp`, `단계_번호_karten1.webp` 같은 이름으로 한 폴더에 내려받고 `python3 erwachsene/tools/lektion.py img 폴더` 로 잘라 넣습니다. 인물 얼굴은 `cast_1`, `cast_2` 두 장에서 잘랐습니다.
3. `python3 erwachsene/tools/lektion.py site` 가 과 화면을 만들고 `tools/open.json` 을 고칩니다. 그림이 하나라도 빠지면 그 과는 열리지 않습니다.
4. `ERWACHSENE_DATE=그날 날짜 python3 erwachsene/tools/build.py` 로 목차를 다시 만듭니다. 본문이 있는 과에 링크와 「시작하기」 단추가 생깁니다.

2026.11.24에 다섯 과의 그림 15장을 만들었습니다(장면 5, 낱말 그림 묶음 6, 인물 2, 다시 그린 것 2). 4과의 Brötchen 그림은 생성된 그림이 달걀처럼 보여서 칼집을 직접 그려 넣었습니다.

2026.11.26에 그다음 다섯 과의 그림 15장을 만들었습니다(장면 5, 낱말 그림 묶음 8, 다시 그린 것 2). 사람 얼굴에 눈, 코, 입이 없거나 뒷모습으로 나온 낱말 그림은 다시 그렸습니다(A1.2 4과의 묶음 전체, A1.2 1과의 Bahnhof, U-Bahn, Fahrrad, Fahrkarte). 낱말 그림 하나만 바꿀 때는 `단계_번호_c번호.webp` 로 저장해서 `img` 에 주면 그 그림만 바뀝니다. 사람이 나오는 그림 설명에는 `face with clearly drawn eyes, nose and mouth` 를 적습니다. A1.1 6과의 Praxis 그림은 책상 위 물건에 깨진 글자가 있어서 그 글자만 지웠습니다.

### 음성을 만들 때

A1.1의 1과부터 5과 음성은 2026.11.25에, A1.1 6과와 A1.2의 1과부터 4과 음성은 2026.11.26에 만들었습니다(뒤의 다섯 과는 64묶음, 쉼 표시 포함 약 33,000자). `status.json` 의 `ohne_audio` 는 비어 있습니다. 새 단계를 음성 없이 먼저 올릴 때는 그 단계 id를 `ohne_audio` 에 적습니다. 그러면 화면 위에 「음성은 준비 중이에요」 안내가 나오고, 듣기 단추는 눌리지 않고, 듣고 푸는 문제에는 들려줄 글이 보이고, 받아쓰기는 문장만 보이고, 역할 대화는 상대의 말을 읽고 넘어갑니다.

1. `python3 erwachsene/tools/lektion.py tts 이름 단계` 로 음성이 없는 줄만 모아 음성 목록을 만듭니다(다섯 과는 54묶음, 쉼 표시 포함 약 24,000자, 글자 수만큼 크레딧이 듭니다).
2. ElevenLabs flow `ey7DgxIxSWctcTQ7kvGQ`(Eleven v3, `language_code` de)의 TTS 노드 10개에 묶음을 넣어 만들고, 모두 끝난 뒤 낱말 시각 정렬 노드를 돌립니다(음성이 끝나기 전에 돌리면 크레딧이 듭니다). 받은 파일을 `python3 erwachsene/tools/lektion.py cut 폴더` 로 잘라 `erwachsene/audio/` 에 넣습니다. 방법은 청소년 교재(`jugend/README.md`)와 같습니다.
3. `status.json` 의 `ohne_audio` 에서 그 단계를 빼고 `site` 와 목차 빌드를 다시 실행합니다.

정해 둔 목소리(`tools/lektion.py`의 `CAST`): Jiu는 Nadine, Dohyun은 Andrew, Sora는 Ithaka, Lena는 Lucy, Frau Becker는 Melissa, Markus는 Jonas, Frau Hoffmann은 Bettina, 이름 없는 여자는 Ela, 이름 없는 남자는 Ben, 해설은 Toni. 목소리 설명만 보고 골랐고 만든 음성을 들어 보지는 않았습니다. Dohyun은 처음 고른 Andreas가 소유자에 의해 비활성화되어 있어 Andrew(bNFIvb6Gmmlk9QMIWo7U)로 바꿨습니다. Jiu는 처음에 Leni였는데 2026.11.26에 그 목소리도 소유자가 비활성화해서 Nadine(XFigb6fqZPxl2Q2dFOXN)으로 바꾸고, 한 사람의 목소리가 과마다 달라지지 않게 A1.1 1과부터 5과의 Jiu 대사 29줄도 같은 목소리로 다시 만들어 바꿨습니다. 목소리가 비활성화되면 그 묶음만 실패하고 크레딧은 들지 않습니다. 묶음을 다시 만들 때는 `tts` 를 같은 이름으로 다시 실행하지 않습니다(묶음 번호가 바뀝니다). Lena의 Lucy는 글자당 크레딧이 다른 목소리의 약 2.5배입니다.
