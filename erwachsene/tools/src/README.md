# 과 원고 쓰는 법 (성인 교재)

과 하나가 글 파일 하나이고, 원고 하나가 화면 하나가 됩니다. 공통 과정(A1.1–B1.2)의 화면은 「성인 독일어」(`basis/`)에 만들어집니다. `a1-1/1.txt`부터 `a1-1/6.txt`가 과, `w1.txt`와 `w2.txt`가 Wiederholung, `t.txt`가 단계 평가입니다.

```
python3 erwachsene/tools/lektion.py check     원고 검사 (문제 0이어야 합니다)
python3 erwachsene/tools/lektion.py site      과 화면 만들기
ERWACHSENE_DATE=2026.11.24 python3 erwachsene/tools/build.py     목차 다시 만들기
```

줄의 첫머리로 뜻이 정해집니다.

```
@id a1-1/1                 화면 이름. 단계 id와 과 번호
== ziel                    구역. 과는 ziel, hoeren, wortschatz, grammatik, training, aufgabe 여섯 개
-- dialog A | 제목 | 상황   블록
--S sprich …               대학 과제 블록 (학습자가 「대학 과제」를 골랐을 때 보입니다)
--B sprich …               직장 과제 블록 (「직장 과제」를 골랐을 때 보입니다)
# …                        원고에만 남기는 메모
```

- `--S`와 `--B`는 공통 과정의 aufgabe 구역에서만 씁니다. 과마다 둘 다 하나 넘게 있어야 합니다. 두 과제가 한 화면에 함께 들어가므로 쓰기(`schreiben`)와 내 이야기(`ich`, `projekt`) 블록의 제목은 한 과 안에서 서로 달라야 합니다. `check`가 확인합니다. B2부터의 단계에는 `--S`, `--B`를 쓰지 않습니다.
- `*낱말*`처럼 별표로 감싸면 화면에서 강조됩니다. 칸은 ` | `(앞뒤 빈칸)로 나눕니다.
- 음성으로 읽을 글을 화면 글과 다르게 적어야 하면 마지막 칸에 `say=…`를 씁니다. 숫자, 가격, 철자, 전화번호가 그렇습니다.
- 말하는 사람은 `Jiu, Dohyun, Sora, Lena, Becker, Markus, Hoffmann` 그리고 이름 없는 `Frau, Mann`, 해설 `N`입니다. `Frau`와 `Mann`은 블록 첫 줄 마지막 칸에 `Frau=Verkäuferin`처럼 화면에 보일 이름을 적습니다.

## 과의 구역

```
== ziel
bild: 장면 그림 설명(영어). 인물은 JIU, DOHYUN, SORA, LENA, BECKER, MARKUS, HOFFMANN 으로 적습니다
alt: 그림을 설명하는 한국어 한 줄
lead: 주제를 여는 한두 문장
mission: 이 과를 마치면 할 수 있는 일
wort: 독일어 | 한국어            이 과에서 쓸 말 (네 개)
mc: 질문 | 보기* | 보기 | 보기 => 설명      배우기 전에 해 보는 물음. 정답 뒤에 *
```
목표, 문법, 교재별 과제 글은 원고가 아니라 `tools/inhalt.json`에서 가져옵니다.

```
== hoeren
-- dialog A | 제목 | 상황 | Frau=Verkäuferin
vor: 듣기 전에 줄 물음
Jiu: 독일어 | 한국어 | say=읽을 글
-- fragen 지시문
mc: 질문 | 보기* | 보기
rf: 문장 | r 또는 f => 설명
-- kultur 제목                  화면에는 「Leben in Deutschland」 상자로 나옵니다
p: 문단
mc: 확인 물음 | 보기* | 보기

== wortschatz
-- gruppe 독일어 이름 | 한국어 이름
der Name, die Namen | 뜻 | 예문 | 예문 뜻       복수만 있으면 "die Eltern (Pl.)", 모음이 바뀌는 동사는 "lesen (du liest, er liest)",
                                               Perfekt를 배운 뒤의 동사는 "reisen (ist gereist)", "putzen (hat geputzt)" (괄호 안의 말도 음성으로 읽습니다)
-- bilder
der Name, die Namen: 그림 설명(영어)            여섯 개씩 한 장에 그립니다 (6개 또는 12개)
-- tafel 제목 | 부제
p: 설명
r: 0 null ; 1 eins | say=null, eins.           숫자 줄: 숫자와 읽는 법
r: Korea = 한국 ; Japan = 일본 | say=…          낱말 줄: 낱말 = 뜻
r: aus Korea ; aus Deutschland | say=…         표현 줄: 뜻 없이 통째로
-- aussprache 제목 | 부제
p: 설명
hör: 독일어 | 붙일 말

== grammatik
-- punkt 독일어 이름 | 한국어 이름
bsp: 예문 | 뜻
finde: 질문 | 답* | 오답        규칙과 표를 본 뒤에 푸는 확인 물음
regel: 규칙
| 칸 | 칸 |                      표. 첫 줄이 머리글. 휴대폰 화면에 들어가도록 좁은 칸 넷까지만 씁니다
merke: 주의할 점
-- alphabet                     알파벳 표 (1과)
p: 설명
```
규칙과 표가 먼저 나오고 `finde` 물음이 뒤에 나옵니다. 청소년 교재와 순서가 반대입니다.

```
== training
-- ex 묶음 이름 | 지시문 | opt: der / das / die
hör: Markus: 들려줄 말          바로 다음 문제에 붙습니다
mc: 질문 | 보기* | 보기
wahl: Wort | der
gap: Ich [richtig|falsch] … | 뜻 => 설명         고르는 빈칸. 첫 보기가 정답
gap: Ich [=richtig/auch richtig] … | 뜻         직접 쓰는 빈칸
ord: wie / heißt / du? ~ 다른 / 순서 | 뜻
paar: 왼쪽 = 오른쪽 ; 왼쪽 = 오른쪽
dik: Jiu: 받아쓸 문장 | 뜻
text plan | 제목                읽기 글. 다음 줄부터 "> …"
audio | 제목 | Mann=Trainer     듣기 글. 다음 줄부터 "> Sora: …"
```
읽기 글의 종류: `chat`, `profil`, `plan`(표, `> | 칸 | 칸 |`), `notiz`, `formular`(`> 항목: 값`), `mail`(`> Von: …` `> An: …` `> Betreff: …` 다음에 본문), `karte`(명함. 첫 줄이 이름). 성인 교재는 서식, 명함, 가격표, 계획표, 안내문처럼 실제로 마주치는 글을 씁니다. 구역 끝에는 Syntalab과 Vokalab으로 가는 「Mehr üben」 상자가 자동으로 붙습니다.

```
== aufgabe
-- redemittel
묶음 이름: 독일어 | 한국어 ; 독일어 | 한국어
--S rolle A | Jiu, Lena         역할 대화에 쓸 대화와 고를 수 있는 역할
--B rolle B | Dohyun, Markus
-- ich 제목 | 지시문
feld: 이름 | 칸 이름 | 예시
satz: Ich heiße {이름}.
--S projekt 제목 | 설명 | 카드 제목      칸을 채우면 서식이나 명함이 완성되는 과제
p: 문단
feld: 이름 | 칸 이름 | 예시
karte: 항목 = {이름}
satz: 소리 내어 읽을 문장 {이름}
check: 확인할 것 ; 확인할 것
--B sprich 제목 | 지시문 | Frau=Frau Schulz
f: Frau: 질문 | 뜻 => 예시 답
--B info 제목                   과제에 필요한 정보를 적은 쪽지 (p: 문단)
-- schreiben 독일어 제목 | 과제
punkt: 넣을 내용 ; 넣을 내용
start: 첫머리
muster: 예시 글
check: 확인할 것 ; 확인할 것
-- kann
Ich kann … | 한국어
-- tipp 제목
p: 문단
```

## 지키는 것

- 학습자에게 보이는 한국어는 해요체로 씁니다. du로 나눈 어른들의 대화도 '해요'로 옮깁니다.
- 그 과까지 배운 낱말과 문법만으로 독일어 문장을 씁니다. 아직 배우지 않은 것이 꼭 필요하면 통째로 익히는 표현으로 두고 `merke`에 적습니다.
- 「Was machst du von Beruf?」는 쓰지 않습니다. 직업은 Was sind Sie von Beruf? / Was bist du von Beruf? / Was machen Sie beruflich?로 묻습니다. 밑줄 문자도 쓰지 않습니다. `check`가 걸러 냅니다.
- 시험 형식 연습과 시험 안내는 넣지 않습니다.
- 전화번호는 드라마용 번호(0176 040690xx, 069 90009-xxx), 이메일은 example.com과 example.org, 주소는 Musterstraße 12, 60487 Frankfurt am Main을 씁니다. 실제 번호나 주소를 쓰지 않습니다.
- 예시 답의 학습자는 Minji Choi(대구 출신, 프랑크푸르트 거주)로 통일합니다.
- 가격, 제도, 금액처럼 바뀔 수 있는 사실은 쓰기 전에 확인합니다.
- 그림 설명에는 얼굴이 보이는 사람을 그리게 적습니다. 얼굴 없는 사람 그림은 쓰지 않습니다.
