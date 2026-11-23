# 과 원고 쓰는 법

과 하나가 글 파일 하나입니다. `a1-1/1.txt`부터 `a1-1/8.txt`가 과, `s1.txt`와 `s2.txt`가 Station, `t.txt`가 단계 평가입니다. `python3 jugend/tools/lektion.py check`가 원고를 검사하고, `site`가 화면을 만듭니다.

줄의 첫머리로 뜻이 정해집니다.

```
@id a1-1/1                 화면 이름. Station 은 @typ station 과 @lektionen 1 2 3 4, 평가는 @typ test 를 더 적습니다
== einstieg                구역. 과는 einstieg, hoeren, wortschatz, grammatik, training, sprechen 여섯 개
-- dialog A | 제목 | 상황   블록
# …                        원고에만 남기는 메모
```

`*낱말*`처럼 별표로 감싸면 화면에서 강조됩니다. 칸은 ` | `(앞뒤 빈칸)로 나눕니다. 음성으로 읽을 글을 다르게 적어야 하면 마지막 칸에 `say=…`를 씁니다.

## 과의 구역

```
== einstieg
bild: 장면 그림 설명(영어). 인물은 YUNA, EMMA, LUKAS, ELIF, SCHNEIDER, SABINE, THOMAS 로 적습니다
alt: 그림을 설명하는 한국어 한 줄
lead: 주제를 여는 한두 문장
mission: 이 과를 마치면 할 수 있는 일
wort: 독일어 | 한국어            눌러서 듣는 낱말
mc: 질문 | 보기* | 보기 | 보기 => 설명      정답 뒤에 *

== hoeren
-- dialog A | 제목 | 상황 | Frau=Verkäuferin      마지막 칸은 화면에 보일 이름 바꾸기
vor: 듣기 전에 줄 물음
Emma: 독일어 | 한국어
-- fragen 지시문
rf: 문장 | r 또는 f => 설명
-- kultur 제목
p: 문단

== wortschatz
-- gruppe 독일어 이름 | 한국어 이름
der Name, die Namen | 뜻 | 예문 | 예문 뜻       복수만 있으면 "die Eltern (Pl.)", 모음이 바뀌는 동사는 "lesen (du liest, er liest)"
-- bilder
der Name, die Namen: 그림 설명(영어)            여섯 개씩 한 장에 그립니다
-- tafel 제목 | 부제
r: 0 null ; 1 eins | say=null, eins
-- aussprache 제목 | 부제
p: 설명
hör: 독일어 | 붙일 말

== grammatik
-- punkt 독일어 이름 | 한국어 이름
bsp: 예문 | 뜻
finde: 질문 | 답* | 오답        규칙을 보기 전에 푸는 물음
regel: 규칙
| 칸 | 칸 |                      표
merke: 주의할 점

== training
-- ex 묶음 이름 | 지시문 | opt: der / die / das
hör: Lukas: 들려줄 말            바로 다음 문제에 붙습니다
wahl: Wort | der
gap: Ich [richtig|falsch] … | 뜻 => 설명         고르는 빈칸. 첫 보기가 정답
gap: Ich [=richtig/auch richtig] … | 뜻         직접 쓰는 빈칸
ord: wie / heißt / du? ~ 다른 / 순서 | 뜻
paar: 왼쪽 = 오른쪽 ; 왼쪽 = 오른쪽
dik: Emma: 받아쓸 문장 | 뜻
text chat | 제목                 읽기 글. chat, profil, plan(표), notiz. 다음 줄부터 "> …"
audio | 제목 | Mann=Trainer      듣기 글. 다음 줄부터 "> Emma: …". 셋째 칸은 화면에 보일 이름 바꾸기(없어도 됨)

== sprechen
-- redemittel
묶음 이름: 독일어 | 한국어 ; 독일어 | 한국어
-- rolle A | Yuna, Emma          역할 대화에 쓸 대화와 고를 수 있는 역할
-- ich 제목 | 지시문
feld: 이름 | 칸 이름 | 예시
satz: Ich heiße {이름}.
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

## Station 과 평가에서만 쓰는 블록

Station 의 구역은 rueckblick, training, projekt 이고, 평가의 구역은 hoeren, lesen, schreiben, sprechen, ergebnis 입니다. 블록은 적은 순서대로 화면에 놓입니다. 위의 `ex`, `schreiben`, `kann`, `tipp`도 쓸 수 있습니다.

```
-- info 제목                     설명 글 (p: 문단)
-- fortschritt                   @lektionen 에 적은 과를 어디까지 공부했는지 보여 줍니다
-- quiz 제목 | 설명              @lektionen 에 적은 과의 낱말로 내는 문제
-- story 제목 | 설명             그림과 문장. 그림은 장면마다 한 장씩 따로 그립니다 (b1.webp, b2.webp …)
bild: 그림 설명(영어)
bild: = a1-2/2 c1                같은 단계 과의 단어 그림을 빌려 쓸 때 (과 id와 그림 이름)
alt: 그림을 설명하는 한국어 한 줄
Yuna: 독일어 | 한국어
-- projekt 제목 | 설명 | 카드 제목
p: 문단
feld: 이름 | 칸 이름 | 예시
karte: 항목 = {이름}             카드에 놓일 줄
satz: 소리 내어 읽을 문장 {이름}
check: 확인할 것 ; 확인할 것
-- sprich 제목 | 지시문 | Frau=Verkäuferin
f: Emma: 질문 | 뜻 => 예시 답
thema: 낱말 ; 낱말               낱말을 보고 이어서 말하는 과제
muster: 예시
-- bilanz                        자동으로 채점한 문제의 결과
hoch: 80% 이상일 때 보일 말
mittel: 60% 이상일 때 보일 말
tief: 그보다 낮을 때 보일 말
```

Station 과 평가는 같은 단계의 과에 이미 있는 음성(말한 사람과 글이 같은 줄)을 그대로 다시 씁니다. 받아쓰기 문장을 과의 예문에서 고르면 음성을 새로 만들지 않아도 됩니다.

## 지키는 것

- 학습자에게 보이는 한국어는 해요체로 씁니다.
- 그 과까지 배운 낱말과 문법만으로 독일어 문장을 씁니다.
- 「Was machst du von Beruf?」는 쓰지 않습니다. 밑줄 문자도 쓰지 않습니다. `check`가 걸러 냅니다.
- 시험 형식 연습과 시험 안내는 넣지 않습니다.
