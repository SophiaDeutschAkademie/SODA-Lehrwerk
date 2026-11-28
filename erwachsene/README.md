# 성인 교재 세 권: SODA Basis, SODA Studium, SODA Beruf

성인 학습자를 위한 독일어 교재 세 권의 원고와 도구가 있는 폴더입니다. 지금은 세 권의 목차와 「성인 독일어」 본문 58화면(과 40개, 복습 12개, 단계 평가 6개)이 있고, 모두 비공개입니다. 음성은 58화면 모두에 있습니다(Eleven v3, 2026.11.25부터 11.28까지 만든 7,364줄).

| 교재 | 이름 | 대상 | 범위 | 목차 주소 |
|---|---|---|---|---|
| SODA Basis | 성인 독일어 | 독일에서 공부하거나 일하거나 살려는 성인 | A1–B1, 여섯 단계 40과 (공통 과정) | https://sophiadeutschakademie.github.io/SODA-Lehrwerk/basis/ |
| SODA Studium | 대학생 독일어 | 독일 유학과 교환 학기를 준비하는 대학생 | B2–C1 Hochschule, 네 단계 28과 | https://sophiadeutschakademie.github.io/SODA-Lehrwerk/studium/ |
| SODA Beruf | 직장인 독일어 | 독일 취업과 이직을 준비하는 직장인과 성인 | B2, 두 단계 16과 | https://sophiadeutschakademie.github.io/SODA-Lehrwerk/beruf/ |

Lehrwerk 목차에서는 세 교재 모두 「작업 중」 칸으로 보이고 링크가 없습니다. 위 주소를 직접 열면 목차를 볼 수 있습니다.

2026.11.27에 분류를 바꿨습니다. 그전에는 대학생용(A1–C1 Hochschule, 68과)과 직장인용(A1–B2, 56과) 두 권이었고, A1–B1 40과가 두 권에 똑같이 들어 있었습니다. 같은 과가 두 번 나오지 않게 공통 과정을 「성인 독일어」 한 권으로 떼고, B2부터 두 권으로 나눴습니다. 교재 이름은 2026.11.28에 「성인 독일어 밑바탕」「대학생 독일어 디딤돌」「직장인 독일어 길잡이」에서 뒤의 낱말을 떼어 「성인 독일어」「대학생 독일어」「직장인 독일어」로 줄였습니다(청소년 교재도 「청소년 독일어 발돋움」에서 「청소년 독일어」로). 폴더 이름 `basis` 는 임시로 정한 것입니다. 이름이나 폴더를 바꾸려면 `tools/inhalt.json` 의 `books` 와 `tools/seo.py`, 루트 `index.html` 의 칸을 고치고 폴더를 옮깁니다. `studium/a1-…`, `beruf/a1-…` 주소는 없앴습니다(비공개 상태라 옛 주소에서 넘겨 주는 화면은 두지 않았습니다).

본문이 있는 화면 (2026.11.28): A1.1 Neu hier: Lektion 1 Guten Tag!, 2 Beruf und Studium, 3 Familie und Freunde, 4 Einkaufen, 5 Mein Tag, 6 Termine, Wiederholung 1·2, Stufentest. A1.2 Im Alltag: Lektion 1 In der Stadt, 2 Meine Wohnung, 3 Gesundheit, 4 Was haben Sie gemacht?, 5 Kleidung und Geschenke, 6 Feste und Reisen, Wiederholung 1·2, Stufentest. A2.1 Angekommen: Lektion 1 Wohnen und Nachbarn, 2 Wie war’s?, 3 Gute Besserung!, 4 Auf dem Amt, 5 Zu Gast, 6 Einkaufen und Reklamieren, Wiederholung 1·2, Stufentest. A2.2 Mittendrin: Lektion 1 Unterwegs, 2 Arbeit und Ausbildung, 3 Kontakt halten, 4 Geld und Verträge, 5 Freizeit und Vereine, 6 Leben in Deutschland, Wiederholung 1·2, Stufentest. B1.1 Im Gespräch: Lektion 1 Sprachen lernen, 2 Zusammen leben, 3 Medien und Nachrichten, 4 Gesund bleiben, 5 Arbeitswelt, 6 Stadt und Land, 7 Konsum und Geld, 8 Freundschaft und Beziehungen, Wiederholung 1·2, Stufentest. B1.2 Perspektiven: Lektion 1 Bewerbung, 2 Studium und Weiterbildung, 3 Umwelt, 4 Engagement, 5 Reisen und Kulturen, 6 Geschichte, 7 Technik und Zukunft, 8 Ziele und Wege, Wiederholung 1·2, Stufentest. 주소는 `basis/a1-1/1/`, `basis/a1-1/wiederholung-1/`, `basis/a1-1/stufentest/` 꼴입니다. 과마다 여섯째 순서 Aufgabe의 과제가 두 가지(대학 과제, 직장 과제)이고 학습자가 하나를 고릅니다. 단계의 마지막 화면(Stufentest)은 다음 단계의 1과로 이어집니다(`site` 는 단계의 마지막 화면을 그 뒤에 열려 있는 첫 화면으로 잇습니다).

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

무대는 프랑크푸르트입니다. 대학에 가려는 사람, 직장인, 가족과 사는 사람 세 명이 함께 나와서 대학 과제와 직장 과제가 같은 이야기 위에 놓입니다. 지금까지 쓴 본문을 모두 아래 설정으로 썼습니다. 교재 속의 지금은 2026년입니다.

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
- A1.2 5과, 6과와 복습에서 더한 설정(2026.11.28): Jiu는 Lena와 백화점에서 파란 재킷을 69유로에 삽니다(전에는 89유로). 팀은 퇴직하는 Herr Braun에게 서점 상품권과 꽃, 카드를 선물합니다(한 사람 10유로. Dohyun이 상품권을 사고 Markus가 꽃을 가져옴). Sora는 Minho에게 줄 파란 스웨터(L, 39유로)를 사고, 교환은 영수증이 있으면 14일 안에 됩니다. 과제 속 퇴직자는 Frau Keller, Carlos에게 주는 선물은 카페 상품권입니다. Lena의 생일은 6월 12일 금요일이고 16시에 대학 뒤 공원에서 파티를 합니다(비가 오면 WG). Jiu와 Lena는 8월에 Hamburg에 갑니다. 회사 Sommerfest는 7월 3일 금요일 17시에 회사 뒤 정원에서 하고(비가 오면 회사 안), 6월 20일까지 Frau Schulz에게 답합니다. Dohyun은 독일에 온 지 여덟 달이 되었고 Sujin과 Minjun은 8월에 옵니다. Sora의 가족은 7월 10일부터 17일까지 기차(네 시간)로 Bodensee의 Konstanz에 가서 Ferienwohnung에 묵습니다. A1.2 복습 1의 집 광고는 Sachsenhausen의 1-Zimmer-Wohnung(32 qm, Kaltmiete 650유로, Nebenkosten 120유로, Kaution 1.950유로, 연락은 Herr Vogel)이고, 복습 2의 기차는 Frankfurt에서 Heidelberg까지 IC 8.20–9.14(RE는 9.06–10.32, Mannheim에서 갈아탐), 7번 선로, 왕복 38유로입니다. 기차 시각과 값은 지어낸 것입니다.
- A2.1에서 더한 설정(2026.11.28): 교재 속의 때는 2026년 10월부터 12월입니다. WG에는 9월부터 새 룸메이트 Felix가 삽니다(대사 없음). Dohyun의 가족(아내 Sujin, 아들 Minjun)은 8월에 와서 Frau Krause의 집 2. Stock에 삽니다. Sora의 집은 Sachsenhausen의 Musterweg 8, 1. Stock이고 옆집에 일흔쯤 된 Herr Wolf가 삽니다. Jiu의 체류 허가는 1월 31일까지, Dohyun의 체류 허가는 12월 말까지입니다. Jiu는 Carlos, Ewa와 하이델베르크에 다녀왔고, Lena는 2년 전에 Valencia에서 교환 학기를 했습니다. Dohyun은 슈투트가르트의 고객에게 출장을 다녀왔습니다. Sora는 인천에서 자랐고 어릴 때 화가가 되고 싶었습니다. Jiu는 750유로짜리 노트북을 고르고, 봄부터 대학에 다닐 예정입니다. 과제 예시의 고객 Frau Sommer(뮌헨), 식당 Lindenhof, 주문 번호는 지어낸 것입니다. 쓰기 전에 확인한 사실(2026.11.28): 기차 지연 보상(60분부터 25퍼센트, 120분부터 50퍼센트), 응급 전화 112와 당직 의사 116 117, 병가 진단서(보통 사흘 넘게 아프면 필요하고, 공보험은 병원이 건강보험으로 보내면 회사가 받아 감. 첫날부터 요구하게 하는 법 개정이 논의 중이라 「회사마다 다르다」고만 적음). 온라인 구매 14일 철회, 하자 담보 2년, 전입 신고 2주는 확인하지 않고 알려진 대로 적었습니다.
- A2.2에서 더한 설정(2026.11.28): 교재 속의 때는 2027년 1월부터 6월입니다. 1월에 Jiu와 Lena는 마르부르크에 다녀오고, Dohyun은 함부르크 출장에서 열차가 취소됩니다. 2월에 Jiu는 Café Morgenrot(Susanne Brandt)의 구인 광고를 보고 지원해서 4월 6일부터 화요일과 토요일에 일합니다(주 10시간, 시간당 15유로). Dohyun은 연간 면담에서 남부 독일 고객 담당, 프로젝트 관리 교육, 3월부터 B1 저녁 과정을 정합니다. 3월에 Jiu는 Sprachenzentrum(Petra Meyer)에 B1 저녁 과정을 묻고, Dohyun은 Schneider und Partner의 비서 Frau Vogt에게 메모를 남깁니다. Sora의 관심사는 디자인과 사진이고, 작은 가구 가게를 여는 것이 꿈입니다. 4월에 Jiu는 대학 공부를 시작하고 학생 계좌를 만듭니다. Dohyun은 가족 배상 책임 보험을 알아봅니다(한 달 7유로, 기간 1년, 끝나기 석 달 전 해지). Sora와 Minho는 휴대폰 두 대에 한 달 60유로를 내다가 5월 31일 자로 해지합니다(통신사 이름 Beispiel Mobil, 고객 센터 Frau Lang은 지어낸 것). 5월에 Jiu는 대학 스포츠의 요가 강좌(수요일 저녁, 한 학기 15유로)에 등록하고, Minjun은 Mia가 다니는 동호회에서 축구 체험 훈련을 하고(화·목 17시, 회비 한 달 8유로), Dohyun은 수요일 19시 탁구 모임에 갑니다. Sora는 사진 동호회 Fotoclub am Main(Herr Albers, 2주에 한 번 목요일, Bürgerhaus, 회비 한 달 5유로)에 들어갑니다. 6월에 Jiu의 건물에 베트남에서 온 유학생 Mai가 이사 오고, Kessler Technik에 새 동료 Elif Demir가 옵니다(탄력 근무 7시~9시, 구내식당은 카드만, 월요일 10시 회의, 휴가는 1월에 계획). 과제 예시의 스포츠 동호회 Sportverein Mainufer, 서점 구인 광고, 대학 스포츠 강좌 표는 지어낸 것입니다. 쓰기 전에 확인한 사실(2026.11.28): 프랑크푸르트의 쓰레기통 색(종이 초록, 포장재 노랑, 음식물 갈색, 나머지 회색, 유리는 길가 수거함. FES 안내), 보증금(한 번 쓰는 병과 캔 25센트, 다시 쓰는 병 8~15센트). 조용히 해야 하는 시간(보통 22시~6시, 일요일과 공휴일), 일요일 휴점, 계약 해지 기한은 확인하지 않고 알려진 대로 「보통」, 「많다」로 적었습니다. 휴대폰 계약의 법정 해지 기한, 최저 임금, Deutschlandticket 값처럼 바뀌는 숫자는 본문에 적지 않았습니다.
- B1.1에서 더한 설정(2026.11.28): 교재 속의 때는 2027년 7월부터 2028년 2월입니다. Jiu의 대학 과정은 영어로 진행되고, Jiu는 졸업한 뒤 독일에서 일하려고 독일어를 배웁니다. 7월에 Jiu는 저녁 과정을 마치고 Lena와 Tandem을 합니다(독일어 30분, 한국어 30분). Dohyun은 9월부터 토요일 오전 과정 「Deutsch für den Beruf」(10주, 480유로)를 듣고 싶어 회사에 비용을 부탁하고, Sora는 12월에 B1 시험을 보고 1월부터 지원하려고 합니다. 9월에 WG는 회의를 해서 설거지를 주마다 돌아가며 하고, 평일 손님은 미리 알리고 22시까지만 있기로 정합니다. Dohyun은 위층 Herr Novak에게 음악 소리 때문에 편지를 씁니다. Frau Becker(Anna Becker)는 Mehrgenerationenhaus에 삽니다. 10월의 목요일 저녁 21시 10분부터 23시 15분까지 Bockenheim에 전기가 나갑니다(약 5,000가구, 공사장에서 끊어진 전선, 16번 트램이 멈추고 승강기에서 세 사람을 구함). Dohyun은 슈투트가르트 박람회에서 경쟁사 Lindner의 새 기계(전기를 20퍼센트 덜 씀, 봄에 출시)를 보고 옵니다. 11월에 Jiu는 과제 두 개에 쫓기고, Dohyun은 함부르크 견적 때문에 3주째 초과 근무를 합니다(Markus는 3년 전에 여섯 주 동안 아팠고 지금은 17시 30분에 퇴근). Sora는 Dr. Neumann에게 건강 검진을 받습니다. 복습 1: B1 시험은 12월 11일 토요일, 접수는 11월 20일까지, 150유로. Frau Hoffmann(Claudia Hoffmann)은 함부르크 일의 일부를 Herr Weber에게 넘기고, 인사과가 독일어 과정 비용을 냅니다. 12월에 Lena는 제약 회사 실험실에서 인턴을 하고, Jiu는 소프트웨어 회사의 2월 인턴 면접에 초대받습니다. Kessler Technik은 투표(14 대 3)로 2028년 1월 10일 월요일부터 주 이틀 재택근무를 시작합니다(화·목은 사무실, 노트북 20대, 꼭 일하는 시간 9시~15시). Sora는 B1 시험을 봤고 주 20시간 일자리를 생각합니다. 2028년 1월에 Lena는 석사 과정을 할 도시로 Leipzig과 Freiburg을 견주고, Dohyun은 여름에 여는 함부르크 사무실을 맡아 달라는 제안을 받습니다(2월 말까지 결정). 1월 말에 Dohyun의 전기 연간 정산서에 계량기 숫자가 7,200이 아니라 8,200으로 적혀 480유로가 빠져나가고, Dohyun은 고객 센터 Frau Seidel에게 이의를 제기합니다(고객 번호 4720331, 1월 20일 자 청구서). 2월에 Lena는 Jiu와 주말에 다녀온 뒤 가을에 Leipzig으로 가기로 하고, Dohyun은 프랑크푸르트에 남아 한 달에 두 번 함부르크에 가서 새 사무실을 돕기로 합니다. Sora는 B1 시험에 붙었고, 사진 동호회의 Marta(폴란드)와 친구가 됐습니다. 복습 2와 단계 평가: Jiu는 소프트웨어 회사 Datenwerk(Herr Engel, Frau Aydin)에서 2월 21일 월요일부터 여섯 주 동안 인턴을 하고(서점 앱 시험), Sora는 디자인 회사 Farbraum(Julia Sander)에서 주 20시간 자리를 제안받아 3월 10일까지 답합니다. 전기 회사는 청구서를 고쳐 더 낼 돈이 80유로가 되고 400유로를 돌려줍니다. 시립 도서관은 1월부터 일요일에도 열고 7월에 계속할지 정합니다. 지어낸 것: 회사 Lindner, Datenwerk, Farbraum과 사람 이름, 4과의 「한 시간이 더 있다면」 설문과 6과의 「어디에 살고 싶은가」 설문의 숫자, 3과의 정전 기사·학생 식당 기사, 도서관 기사와 방문자 수, 과제 예시의 이웃 Frau Kaya, WG 방 광고, 과정 값. 쓰기 전에 확인한 사실(2026.11.28): 인구(Leipzig 약 63만, Freiburg 약 23만, Hamburg 약 190만, Frankfurt 약 77만. 본문에는 「60만 넘음」처럼 어림수로 적음), Betriebsrat는 뽑을 수 있는 직원이 다섯 명 이상인 사업장에서 뽑음(BetrVG 1조), 법정 최소 휴가는 주 5일 근무에 20일, Bildungsurlaub은 16개 주 가운데 14개 주에 있고 Sachsen은 2027년 1월부터 생김(본문에는 「대부분의 주」), 방송 수신료는 집마다 내고 수신기가 없어도 냄(값은 적지 않음). 수습 기간(길면 여섯 달), Tagesschau(20시, 15분), 전기·난방 연간 정산, Verbraucherzentrale, Volkshochschule는 확인하지 않고 알려진 대로 적었습니다.
- B1.2에서 더한 설정(2026.11.28): 교재 속의 때는 2028년 3월부터 8월이고, 복습 2와 단계 평가는 9월 초입니다. 1과(4월): Jiu는 Datenwerk의 근로 학생 자리(소프트웨어 테스트, 6월 1일부터 주 15시간, 12개월, 지원 마감 4월 28일)에 지원하고 5월 4일 목요일 14시에 면접을 봅니다. Frau Hoffmann과 Dohyun은 함부르크 사무실 지원자 Frau Petersen, Herr Yilmaz, Herr Lorenz를 견줍니다. Sora는 4월 3일부터 Farbraum에서 주 20시간 일하고 계약은 먼저 1년입니다. 2과(5월): Lena는 Leipzig 석사 과정(Biologie와 Biochemie)에 지원합니다(마감 5월 31일, 허가는 8월, 강의는 10월). Jiu는 근로 학생 자리를 얻어 Café Morgenrot 일을 5월 말에 그만둡니다. Dohyun은 쾰른의 연수 「Führung und Kommunikation」(6월 14~16일, 1,400유로, 회사가 냄)과 온라인 과정(6주, 600유로)을 견줍니다. Sora는 9월에 B2 과정을 시작하려 하고, Hana는 여름 뒤에 4학년이 됩니다. 3과(5월 말~6월): Jiu와 Lena는 고장 난 청소기를 토요일의 Repair-Café(Bürgerhaus Bockenheim, 10~14시)에 가져갑니다. Dohyun과 Markus는 사무실의 종이를 줄일 제안 세 가지를 만들고, 함부르크에는 비행기 대신 기차로 갑니다. Sora네는 차를 사지 않고 먼저 1년 동안 Carsharing을 씁니다. 4과(6월): Jiu는 10월부터 대학의 Buddy-Programm에 참여합니다. Kessler Technik의 sozialer Tag은 7월 7일 금요일(Jugendtreff Bockenheim 새 단장, 신청은 6월 23일까지 인사과 Anke Schulz). Markus는 10년째 의용 소방대원입니다. Frau Becker는 사는 집의 모임방에서 4년째 목요일마다 Sprachcafé를 열고(Herr Hakimi), Sora는 한 달에 한 번 청소년 사진 수업을 맡습니다. 복습 1: Frau Petersen이 뽑혀 8월 1일에 시작합니다(기간 없는 계약, 수습 여섯 달). 5과(7월): Jiu의 부모가 열흘 동안 다녀갔습니다(일요일에 닫힌 가게, 에어컨 없는 하이델베르크 호텔, 현금만 받는 식당). Frau Hoffmann과 Dohyun은 부산의 협력 회사(Herr Jang)에 출장을 다녀왔습니다. Sora는 독일에 온 지 2년 반이고, Frau Becker는 학생 때 프랑스에서 1년을 살았습니다. 6과(7월 말~8월): Jiu와 Lena는 주말에 베를린에 갑니다. Kessler Technik은 1962년에 Wilhelm Kessler가 작은 작업장에서 직원 다섯 명과 세웠고 1985년에 지금 건물로 옮겼으며 지금 직원은 약 120명입니다. 부산의 손님이 프랑크푸르트에 와서 Dohyun이 회사와 도시를 안내합니다. Frau Becker는 튀링겐(동독)의 작은 마을에서 자랐고(국경에서 20킬로미터), 장벽이 무너질 때 열여섯 살이었으며 열여덟 살에 공부하러 프랑크푸르트에 왔습니다. Sora의 할머니는 북쪽 출신입니다. 7과(8월): Datenwerk는 테스트를 스스로 만드는 인공 지능 프로그램을 시험하고, Jiu는 석사 논문에서 인공 지능이 낸 결과를 검증하는 방법을 다루려고 합니다. Kessler Technik의 새 기계는 감지기로 부품 교체 시기를 스스로 알리고, 함부르크의 고객이 동의하면 1월부터 시험합니다. Farbraum은 그림을 만드는 프로그램을 쓰고, Hana는 스마트폰을 갖고 싶어 합니다. 8과(8월 말): Lena는 Leipzig 석사 과정에 합격해 8월 26일 토요일에 이사합니다(Jiu와 거의 2년 반을 같이 살았음). Jiu는 봄에 B2 시험을 보려고 합니다. Dohyun은 면담에서 1월부터 함부르크 프로젝트를 맡고 급여가 오른다는 말을 듣고, 회사가 B2 과정 비용을 냅니다(여름까지 B2가 목표). Frau Becker(Anna)가 Sora에게 du로 말하자고 권하고, Sora는 9월부터 주 2회 저녁에 B2 과정을 듣습니다. Frau Becker는 한국어를 배우려고 합니다. 복습 2와 단계 평가(9월 초): Lena가 Leipzig에서 전화합니다(Jiu는 11월에 감). Datenwerk의 Frau Aydin(Selin Aydin)이 메일로 알립니다. Jiu는 10월부터 여섯 달 동안 Datenwerk에서 석사 논문을 쓰고, Herr Engel이 맡아 돕고, 근로 학생 계약은 그대로 이어지며, 9월 18일 월요일 10시에 다음 일을 의논합니다. Dohyun은 1월 1일부터 함부르크 고객의 프로젝트를 이끕니다(인사과 Frau Schulz의 메일). 지어낸 것: 사람 이름(Frau Petersen, Herr Yilmaz, Herr Lorenz, Herr Jang, Herr Hakimi, Wilhelm Kessler, Selin Aydin, Thomas Lindemann, Herr Albrecht, Herr Brenner, Frau Keller, Herr Costa, Frau Wolf), Kessler Technik의 역사와 직원 수, 연수와 과정의 이름·값·날짜, 1과의 구인 광고, 복습 1의 대학 상담 메일, 3과의 나무 천 그루 기사, 5과의 라디오 인터뷰와 「Mein Semester in Deutschland」, 6과의 박물관 안내와 「Teilung und Einheit」 글, 7과의 라디오 방송 「Das Haus denkt mit」와 요양원 로봇 기사, 8과의 어학원 상담(B2 저녁반, 16주, 640유로), 복습 2의 학교 스마트폰 토론 글(Schule am Park), 단계 평가의 박물관의 밤(30곳 넘는 박물관, 12유로)·도서관 Sprachcafé·옛 공장 기사. 쓰기 전에 확인한 사실(2026.11.28): 재생 에너지는 2025년 전기 소비의 약 55~56퍼센트(본문에는 「절반 넘게」), 기후 중립 목표 2045년, 석탄 발전은 늦어도 2038년까지, 고속도로에 일반 속도 제한 없음, 2024년 Freiwilligensurvey에서 14세 이상의 36.7퍼센트가 봉사 활동(본문에는 「세 사람 가운데 한 사람 넘게」)이고 그 절반쯤이 Verein에서 활동, 소방대원의 대부분이 의용 소방대원, E-Rezept는 2024년 1월부터 처방약에 의무이고 2025년 말에 처방의 약 76퍼센트(본문에는 「대부분」), 유럽 연합의 인공 지능 법은 2024년 8월에 발효(2026년 7월에 일부 기한을 늦춤. 본문에는 법을 만들었다고만 적음). 확인하지 않고 알려진 대로 적은 것: 학사 6학기와 석사 4학기, 일부 주의 비유럽 학생 등록금, Meister 제도, 2023년 4월의 원전 가동 종료, 한국의 명함·술자리 예절, 독일의 학교 제도, 6과의 역사 날짜(1949년 두 나라, 1961년 8월 13일 장벽, 1989년 10월 9일 Leipzig 시위 7만 명, 1989년 11월 9일, 1990년 10월 3일, 장벽 사망자 적어도 140명, Paulskirche 1848년, Goethe 1749~1832년, 프랑크푸르트 새 옛 시가지 2018년), Mitarbeitergespräch의 관행, 독일어로 수업하는 대학 과정의 어학 시험(DSH, TestDaF). 음성으로 읽는 줄의 숫자(연도, 날짜, 시각)는 `say=`에 글자로 풀어 적었고, 6과의 연도는 화면에 숫자로 보입니다. KI, PDF, WLAN, DDR 같은 줄임말은 음성을 만들 때 소리를 들어서 확인해야 합니다.
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
erwachsene/tools/tts/          그림 설명 묶음(*.prompts.json)과 음성 목록(이름.plan.json, 이름_목소리_번호.json)
erwachsene/tools/open.json     본문이 있는 과 목록 (site 가 씁니다. 목차 빌드가 읽어서 링크를 겁니다)
erwachsene/lektion.css, lektion.js   과 화면의 모양과 동작 (세 교재가 함께 씁니다). 글자 크기는 font-size:calc(17px*var(--fz)) 처럼 적습니다 (저장소 README 「글자 크기(교재)」)
erwachsene/img/                과 그림: 단계/과/szene.webp(장면), c1.webp …(낱말 그림), c/(인물 얼굴), titel/<교재>.webp(목차 표지 그림 1200×900, 그림 설명은 inhalt.json books 의 bildalt). 폭 700px 이상인 화면에서는 장면 그림을 높이 600px까지만 그립니다(lektion.css 의 `.szene img{max-height:600px;object-fit:contain}`. 세로로 긴 그림이 화면을 넘지 않게 함)
erwachsene/audio/              과 음성(mp3, 한 줄에 파일 하나, 178MB)
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
4. `ERWACHSENE_DATE=그날 날짜 python3 erwachsene/tools/build.py` 로 목차를 다시 만듭니다. 본문이 있는 과에 링크와 「시작하기」 단추가 생깁니다. 표지 아래의 안내는 열린 화면에 따라 바뀝니다. 교재의 모든 단계가 다 열리면 「본문은 A1.1부터 B1.2까지 과 40개가 모두 올라와 있어요.」가 됩니다(2026.11.28).

복습(Wiederholung)과 단계 평가(Stufentest)도 같은 방법으로 만듭니다. 원고 이름은 `w1.txt`, `w2.txt`, `t.txt` 이고 화면은 `basis/a1-1/wiederholung-1/`, `basis/a1-1/stufentest/` 에 생깁니다. 이 화면에는 그림이 없고, 앞 과에 음성이 있는 문장은 그 음성을 그대로 씁니다.

`img` 에 주는 폴더는 그때 받은 그림만 든 새 폴더여야 합니다. 예전 그림이 남아 있는 폴더를 주면 이미 올린 그림을 예전 것으로 덮어씁니다(2026.11.28에 A1.1 3과와 4과의 그림이 그렇게 바뀌어서 git에서 되돌렸습니다).

2026.11.24에 다섯 과의 그림 15장을 만들었습니다(장면 5, 낱말 그림 묶음 6, 인물 2, 다시 그린 것 2). 4과의 Brötchen 그림은 생성된 그림이 달걀처럼 보여서 칼집을 직접 그려 넣었습니다.

2026.11.26에 그다음 다섯 과의 그림 15장을 만들었습니다(장면 5, 낱말 그림 묶음 8, 다시 그린 것 2). 사람 얼굴에 눈, 코, 입이 없거나 뒷모습으로 나온 낱말 그림은 다시 그렸습니다(A1.2 4과의 묶음 전체, A1.2 1과의 Bahnhof, U-Bahn, Fahrrad, Fahrkarte). 낱말 그림 하나만 바꿀 때는 `단계_번호_c번호.webp` 로 저장해서 `img` 에 주면 그 그림만 바뀝니다. 사람이 나오는 그림 설명에는 `face with clearly drawn eyes, nose and mouth` 를 적습니다. A1.1 6과의 Praxis 그림은 책상 위 물건에 깨진 글자가 있어서 그 글자만 지웠습니다.

2026.11.28에 만든 그림 가운데 손본 것입니다. B1.1: 낱말 그림 일곱 장을 낱장으로 다시 그렸습니다(1과 Untertitel, 2과 sich streiten, 3과 Zeitschrift 두 번, 4과 Überstunde, 7과 Zähler와 aufbewahren). 상자에 적힌 글자를 지우고, 배경이 옅게 물든 그림은 배경을 희게 하고, 그림이 가장자리에 닿은 장면 두 장(5과, 7과)에는 여백을 더했습니다. B1.2: 그림은 27장입니다(장면 8, 낱말 그림 묶음 16, 낱장 3). 낱장으로 다시 그린 것은 1과의 teamfähig, belastbar(사람의 몸이 살색으로만 칠해져 나옴)와 5과의 verwirrt(뒷모습으로 나옴)입니다. 1과 Absage의 빨간 더하기 표는 X로 고쳐 그렸고, 2과 sich einschreiben의 모니터와 이름판에 있던 글자, Meister의 증서에 있던 글자 흉내는 지웠습니다. 5과의 둘째 묶음은 윗줄의 Stäbchen과 Klimaanlage가 설명과 다른 순서로 나와서 두 칸을 맞바꿨고, 첫째 묶음의 auspacken과 einschenken은 팔이 맞닿아 있어서 사이를 띄웠습니다. 3과 Windrad 옆의 옅은 줄과 7과 장면의 갈고리(로봇 팔 대신 그려진 것)는 지웠습니다. 묶음 그림은 칸의 순서가 설명과 같은지 묶음마다 눈으로 확인해야 합니다. 고치기 전의 원본은 저장소에 없습니다.

### 음성을 만들 때

A1.1의 1과부터 5과 음성은 2026.11.25에, A1.1 6과와 A1.2의 1과부터 4과 음성은 2026.11.26에 만들었습니다(뒤의 다섯 과는 64묶음, 쉼 표시 포함 약 33,000자). 새 화면을 음성 없이 먼저 올릴 때는 그 단계 id를 `status.json` 의 `ohne_audio` 에 적습니다. 그러면 음성이 빠진 화면 위에 「음성은 준비 중이에요」 안내가 나오고, 듣기 단추는 눌리지 않고, 듣고 푸는 문제에는 들려줄 글이 보이고, 받아쓰기는 문장만 보이고, 역할 대화는 상대의 말을 읽고 넘어갑니다. 음성이 다 있는 화면은 그 단계가 `ohne_audio` 에 있어도 그대로입니다. `site` 가 음성이 빠진 화면의 이름을 `open.json` 의 `na` 에 적고, 목차는 그것을 읽어 단계마다 어느 화면의 음성이 준비 중인지 알려 줍니다.

2026.11.28에 A1.1의 복습 둘과 단계 평가, A1.2의 5과, 6과, 복습 둘, 단계 평가를 음성 없이 올렸습니다(`ohne_audio` 에 `a1-1`, `a1-2`). 이 여덟 화면의 음성은 쉼 표시를 포함해 약 19,350자입니다(5과 6,953자, 6과 7,249자, 복습과 평가 여섯 화면 약 5,150자). Lena의 목소리 값을 넣으면 약 21,300크레딧입니다.

같은 날 이 여덟 화면의 음성을 만들었습니다(47묶음: 5과와 6과 33묶음, 복습과 평가 14묶음. 465줄, 22,038크레딧). 자르기 검사에서 다시 볼 묶음은 없었습니다. `ohne_audio` 에서 `a1-1`, `a1-2` 를 뺐고, A1.1과 A1.2는 모든 화면에 음성이 있습니다.

같은 날 A2.1과 A2.2의 열여덟 화면(단계마다 과 6개, 복습 2개, 단계 평가 1개)도 음성 없이 올렸습니다(`ohne_audio` 에 `a2-1`, `a2-2`). 음성은 쉼 표시를 포함해 A2.1이 48,708자, A2.2가 51,775자입니다(`check a2-1`, `check a2-2` 의 마지막 줄). 글자 수만큼 크레딧이 들고, Lena의 대사는 약 2.5배입니다.

같은 날 A2.1의 아홉 화면의 음성을 만들었습니다(93묶음: 과 여섯 개 83묶음, 복습과 평가 10묶음. 1,122줄, 55,039크레딧). 자르기 검사에서 다시 볼 묶음은 없었습니다. `ohne_audio` 에서 `a2-1` 을 뺐습니다.

같은 날 A2.2의 아홉 화면의 음성을 만들었습니다(95묶음: 과 여섯 개 85묶음, 복습과 평가 10묶음. 1,102줄, 57,174크레딧). 1과 낱말 묶음 하나(`a22_n_02`)는 받아쓰기 시각이 2초쯤 밀려 자르기 검사에 걸렸고, 쉼 위치를 직접 재서 아홉 부분을 다시 잘랐습니다. `ohne_audio` 에서 `a2-2` 를 뺐습니다.

같은 날 B1.1의 열한 화면(과 8개, 복습 2개, 단계 평가 1개)도 음성 없이 올렸습니다(`ohne_audio` 에 `b1-1`). 음성은 쉼 표시를 포함해 83,280자입니다(`check b1-1` 의 마지막 줄). Lena의 대사(약 6,900자)를 2.5배로 치면 약 93,700크레딧입니다.

같은 날 B1.2의 열한 화면(과 8개, 복습 2개, 단계 평가 1개)도 음성 없이 올렸습니다(`ohne_audio` 에 `b1-2`). 음성은 쉼 표시를 포함해 87,153자입니다(`check b1-2` 의 마지막 줄). Lena의 대사(약 6,500자)를 2.5배로 치면 약 97,000크레딧입니다. 이것으로 「성인 독일어」의 여섯 단계(과 40개, 복습 12개, 단계 평가 6개)에 본문이 모두 있습니다. 음성이 없는 화면의 음성을 모두 만들려면 A1의 나머지 약 21,300, A2.1 약 52,300, A2.2 약 54,900, B1.1 약 93,700, B1.2 약 97,000, 모두 약 319,000크레딧이 듭니다(다시 만드는 줄은 따로 듭니다).

같은 날 B1.1의 열한 화면의 음성을 만들었습니다(138묶음: 과 여덟 개 126묶음, 복습과 평가 12묶음. 1,585줄, 98,044크레딧). 낱말 묶음 넷은 자르기 검사에 걸려 직접 다시 잘랐습니다. `b11_n_02` 는 받아쓰기 시각이 밀려 네 줄을 쉼 위치로 다시 잘랐고(`fixsplit.py`), `b11_n_20`(1줄)과 `b11_n_37`(6줄)은 낱말과 예문 사이에 쉼이 없어 그 자리에 0.3초 무음을 넣고 잘랐으며, `b11_n_26` 은 음성 끝의 「Gut.」이 거의 들리지 않아 낱말 시각으로 잘랐습니다. `ohne_audio` 에서 `b1-1` 을 뺐습니다.

같은 날 B1.2의 열한 화면의 음성을 만들었습니다(139묶음: 과 여덟 개 128묶음, 복습과 평가 11묶음. 1,602줄, 101,218크레딧). 자르기 검사에서 다시 자를 묶음은 없었습니다. 낱말 묶음 하나(`b12_n_18`)는 한 줄의 낱말과 예문 경계가 받아쓰기 시각 때문에 밀려 쉼 위치로 다시 잘랐습니다(`fixsplit.py`). `ohne_audio` 는 비었고, 「성인 독일어」 여섯 단계 58화면 모두에 음성이 있습니다. 이 날까지 계정에서 쓴 크레딧은 894,054(한도 945,933)입니다.

1. `python3 erwachsene/tools/lektion.py tts 이름 단계` 로 음성이 없는 줄만 모아 음성 목록을 만듭니다(다섯 과는 54묶음, 쉼 표시 포함 약 24,000자, 글자 수만큼 크레딧이 듭니다).
2. ElevenLabs flow `ey7DgxIxSWctcTQ7kvGQ`(Eleven v3, `language_code` de)의 TTS 노드 20개에 묶음을 넣어 만들고, 모두 끝난 뒤 낱말 시각 정렬 노드를 돌립니다(음성이 끝나기 전에 돌리면 크레딧이 듭니다). 받은 파일을 `python3 erwachsene/tools/lektion.py cut 폴더` 로 잘라 `erwachsene/audio/` 에 넣습니다. 방법은 청소년 교재(`jugend/README.md`)와 같습니다.
3. `status.json` 의 `ohne_audio` 에서 그 단계를 빼고 `site` 와 목차 빌드를 다시 실행합니다.

정해 둔 목소리(`tools/lektion.py`의 `CAST`): Jiu는 Nadine, Dohyun은 Andrew, Sora는 Ithaka, Lena는 Lucy, Frau Becker는 Melissa, Markus는 Jonas, Frau Hoffmann은 Bettina, 이름 없는 여자는 Ela, 이름 없는 남자는 Ben, 해설은 Toni. 목소리 설명만 보고 골랐고 만든 음성을 들어 보지는 않았습니다. Dohyun은 처음 고른 Andreas가 소유자에 의해 비활성화되어 있어 Andrew(bNFIvb6Gmmlk9QMIWo7U)로 바꿨습니다. Jiu는 처음에 Leni였는데 2026.11.26에 그 목소리도 소유자가 비활성화해서 Nadine(XFigb6fqZPxl2Q2dFOXN)으로 바꾸고, 한 사람의 목소리가 과마다 달라지지 않게 A1.1 1과부터 5과의 Jiu 대사 29줄도 같은 목소리로 다시 만들어 바꿨습니다. 목소리가 비활성화되면 그 묶음만 실패하고 크레딧은 들지 않습니다. 묶음을 다시 만들 때는 `tts` 를 같은 이름으로 다시 실행하지 않습니다(묶음 번호가 바뀝니다). Lena의 Lucy는 글자당 크레딧이 다른 목소리의 약 2.5배입니다.
