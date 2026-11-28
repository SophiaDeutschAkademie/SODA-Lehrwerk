# 듣기 훈련에 세트 더하기 (`hoertraining/tools/`)

`hoertraining/index.html`은 듣기 훈련 루틴 빌더(listening-routine-builder)가 만든 단일 HTML입니다. 세트 자료는 그 안의 `<script type="application/json" id="routine-data">`(형식 1.1)에 있고, 음원은 `hoertraining/audio/`에 있습니다.

2026.11.04까지 만든 88세트는 원고(spec)가 이 저장소에 없습니다. 그래서 새 세트는 이 폴더의 `sets.py`로 만들어 기존 자료 뒤에 덧붙입니다. 앱 코드는 건드리지 않습니다.

## 파일

```
sets.py        원고 검사(check), 음성 대본 묶음(tts), 음원 만들기(mix), 앱에 넣기(merge)
walk.py        넣은 세트를 실제 브라우저에서 7단계 모두 눌러 보는 검사
basis.json     어느 지문에나 나오는 낱말 344개의 뜻(관사, 대명사, 전치사, 접속사, 조동사, 수, 요일, 달, 인사). 원고에 뜻이 없는 낱말은 여기서 채웁니다
src/<세트>.txt       원고
src/<세트>.t.json    mix가 쓴 줄별 시작·끝 시각, 음원 길이, 속도 조정값
tts/<이름>_<파일>_s<화자>_<번호>.json   화자별 음성 대본 묶음, tts/<이름>.plan.json은 묶음 목록
```

## 순서

```
python3 hoertraining/tools/sets.py check a2-21            # 오류 0이 될 때까지 원고를 고칩니다. -v를 붙이면 공통 낱말에서 채운 낱말도 보여 줍니다
python3 hoertraining/tools/sets.py tts h2 a2-21           # tts/h2_*.json (화자마다 760자쯤으로 나눈 대본)
#   묶음마다 ElevenLabs(Eleven v3, language_code de)로 음성을 만들고, 같은 음성의 낱말별 시각을 받아
#   한 폴더에 <묶음 이름>.mp3 와 <묶음 이름>.words.json 으로 저장합니다
python3 hoertraining/tools/sets.py mix 받은폴더 a2-21      # audio/a2-21-a.mp3, src/a2-21.t.json. 마지막 줄이 "NEEDS ATTENTION: none"이어야 합니다
python3 hoertraining/tools/sets.py merge                  # index.html, sw.js, 세트 수가 적힌 곳을 모두 고칩니다. 여러 번 실행해도 결과가 같습니다
python3 hoertraining/tools/walk.py A2_21                  # "ALL PASS"
```

그다음 목차(`index.html`)의 Hörtraining 칸 업데이트 날짜를 고치고 `notices.json` 맨 앞에 공지를 더한 뒤 커밋합니다.

세트 이름을 쓰지 않으면 `src/`의 모든 원고를 대상으로 합니다.

## 원고 형식 (`src/<세트>.txt`)

```
@set A2_17                      세트 id. 레벨_번호
@titel Umzug                    세트 목록에 나오는 제목
@art 일상 대화                   세트 목록에 나오는 지문 종류
@id a2-17-a-umzug               지문 id(학습 기록의 열쇠). 올린 뒤에는 바꾸지 않습니다
@datei a2-17-a                  음원 파일 이름(audio/a2-17-a.mp3)
@thema Mias Umzug am Samstag | 토요일에 이사하는 미아
@lage Sie hören ein Telefongespräch zwischen zwei Freunden.
@form 3지선다                    또는 richtig / falsch
@plays 2                        듣는 횟수
@prep 45                        문제 읽는 시간(초). A2 45, B1 60, B2 90
@stimme Mia = Nadine | #C54B4B  화자 = 목소리 | 화자 색
@tempo 0.9                      (없어도 됩니다) 속도를 직접 정할 때

[text]
Mia: Hallo Jonas, hier ist Mia. | 안녕 요나스, 나 미아야.
+0.9 Jonas: Hallo Mia!  | 안녕 미아!          ← 줄 앞의 +0.9 는 이 줄 앞 쉼(초). 없으면 같은 화자 0.30초, 화자가 바뀌면 0.45초

[woerter]                       미리 볼 낱말 8~14개
der Umzug | 이사

[saetze]                        미리 볼 문장 6개쯤. 지문에 나온 문장이나 그 일부
Kannst du mir vielleicht helfen? | 혹시 나 좀 도와줄 수 있어?

[vokabeln]                      지문 낱말의 뜻. 왼쪽은 지문에 나온 모양 그대로(쉼표로 여러 모양), 오른쪽은 뜻과 원형
ziehe, ziehst | 이사하다 (um|ziehen) — ich ziehe um = 나는 이사한다

[fragen]
1 | Warum ruft Mia bei Jonas an? | 미아는 왜 요나스에게 전화하는가?
* Sie braucht noch einen Helfer. | 도와줄 사람이 한 명 더 필요해서      ← * 가 정답
- Sie möchte ihm ihre Wohnung zeigen. | 집을 보여 주고 싶어서
- Ihr Cousin sucht eine Wohnung. | 사촌이 집을 구하고 있어서
> Leider ist mein Cousin krank geworden, und jetzt fehlt mir ein Helfer.     ← 근거. 지문 한 줄의 일부를 글자 그대로
! 사촌이 아파서 도와줄 사람이 한 명 모자란다고 했습니다.                      ← 해설(합니다체)
~ paraphrase                    함정 종류: wording number context negation paraphrase speaker
```

richtig / falsch 문항은 선택지 대신 `= richtig` 또는 `= falsch` 한 줄을 씁니다.

## 원고를 쓸 때

- 지문의 모든 낱말에 뜻이 있어야 합니다(`check`가 빠진 낱말을 알려 줍니다). 대문자·소문자만 다른 모양은 한 번만 적으면 됩니다. `weg`와 `Weg`처럼 다른 낱말이면 둘 다 적습니다.
- 분리 동사의 떨어진 앞부분(`an`, `auf`, `aus`, `ein`, `mit`, `um`, `vor`, `zu`, `zurück` 등)은 공통 낱말 뜻만으로는 모자라므로 그 지문에서 쓰인 뜻을 `[vokabeln]`에 다시 적습니다.
- 한 줄은 한 화자의 말이고 세 문장, 240자를 넘지 않습니다. 한국어 해석의 문장 수는 독일어와 같아야 합니다(문장 단위로 예문을 뽑기 때문입니다).
- 수는 숫자가 아니라 글자로 씁니다(`sieben Uhr zweiundvierzig`). 따옴표, 괄호, 줄표, 줄임표는 쓰지 않습니다. 음성 합성이 읽는 방식이 달라지기 때문입니다.
- 문항은 10개, 정답 위치는 고르게 둡니다. 근거 인용이 지문에 글자 그대로 없으면 `check`가 오류로 알려 줍니다.
- 길이는 A2 2,000~2,300자, B1 2,300~2,700자, B2 2,600~3,100자쯤입니다. Eleven v3는 글자 하나에 1크레딧이고, 묶음마다 앞뒤에 붙이는 `Also.` `Gut.`까지 셉니다.

## 음성

- 목소리 이름과 voice_id는 `sets.py`의 `VOICES`에 있습니다(Nadine, Ithaka, Melissa, Bettina, Ela, Emily, Juna, Ava, Andrew, Jonas, Ben, Toni, Leon).
- 대본 묶음은 한 화자의 줄을 `[pause]`로 이어 붙인 것입니다. 앞의 `Also.`와 뒤의 `Gut.`은 첫 줄과 마지막 줄의 소리가 잘리지 않게 붙였다가 버립니다.
- `<묶음>.words.json`은 그 음성을 대본에 맞춘 낱말별 시각입니다(`{"words":[{"text","start","end"}, …]}`, `[pause]`도 낱말 하나로 들어 있습니다). `mix`는 이 시각과 실제 무음 구간을 함께 보고 줄을 자릅니다.
- 음성을 받으면 `mix`의 출력을 봅니다. 묶음 옆에 `<--` 표시가 붙으면 그 묶음만 다시 만듭니다(예: 마지막 `Gut.`을 읽지 않아 끝 줄이 잘린 경우).

## mix가 하는 일

1. 묶음을 줄마다 자르고, 줄 안의 긴 쉼(0.55초 넘는 것)을 줄입니다.
2. 말 빠르기를 레벨에 맞춥니다. 말하는 시간 1초에 읽는 음절 수가 레벨 목표(A1 3.2 · A2 3.8 · B1 4.2 · B2 4.4 · C1 4.4, 처음 88세트의 레벨별 가운데값)보다 3% 넘게 빠르면 높낮이는 그대로 두고 그만큼 느리게 늘입니다(ffmpeg `atempo`, 한도 0.85). 원고에 `@tempo`가 있으면 그 값을 씁니다.
3. 지문 순서대로 쉼을 넣어 이어 붙입니다(앞 0.8초, 뒤 0.5초).
4. 모노 32kHz 56kbps CBR mp3, −16 LUFS로 저장합니다. 줄 단위 재생 위치가 어긋나지 않도록 VBR은 쓰지 않습니다.
5. 저장한 mp3를 다시 읽어 줄마다 시작과 끝에 말소리가 있는지, 줄 사이 쉼이 조용한지 확인합니다.

## merge가 하는 일

- 세트와 지문을 `routine-data`에 넣습니다. 지문은 맨 뒤에 붙이고(기존 지문의 번호가 바뀌지 않습니다), 세트는 같은 레벨의 마지막 세트 뒤에 넣습니다. 같은 id가 이미 있으면 바꿔 넣습니다.
- 음원 목록(`data-media`, 주소 뒤 `?v=`는 파일 sha256 앞 10자), 표지 통계(세트·지문·문항·음원 분), 화자 색을 고칩니다.
- `sw.js`의 음원 목록과 `VERSION`을 고칩니다. 이 값이 바뀌어야 학생 기기의 오프라인 캐시가 새로 받아집니다.
- 세트 수가 적힌 다른 곳도 고칩니다: `hoertraining/manifest.webmanifest`, `tools/seo.py`(제목·설명), 저장소 `README.md`의 자료 표, 목차 `index.html`의 Hörtraining 칸, `lernmethoden/src/`의 바로가기 칸(고쳤으면 `lernmethoden/build.py`도 실행). 마지막에 `tools/seo.py`를 실행해 검색용 태그와 `sitemap.xml`을 맞춥니다.

## 확인

- `walk.py`는 Playwright Chromium으로 세트마다 7단계를 눌러 봅니다. 음원이 재생되는지, 줄 재생이 그 줄 시각으로 가는지, 모든 낱말에 뜻이 나오는지, 채점·근거·복습 카드가 나오는지 봅니다.
- 음성 인식으로 다시 받아 적어 대본과 맞춰 보는 검사는 들어 있지 않습니다. 새 목소리를 쓰거나 고유명사·수가 많은 지문은 올리기 전에 한 번 들어 봅니다.

## 이 도구로 만든 세트

| 세트 | 제목 | 형식 | 화자 = 목소리 | 길이 |
|---|---|---|---|---|
| A2_17 | Umzug | 전화 대화, 3지선다 | Mia = Nadine, Jonas = Jonas | 2분 46초 |
| A2_18 | Stadtführung | 안내, R/F | Frau Brandt = Bettina | 2분 32초 |
| A2_19 | Kochkurs | 전화 신청, 3지선다 | Frau Lindner = Melissa, Herr Weber = Andrew | 2분 28초 |
| A2_20 | Au-pair in Hamburg | 경험 이야기, R/F | Jisu = Juna | 2분 31초 |
| B1_17 | Repair-Café | 인터뷰, 3지선다 | Moderator = Toni, Frau Albers = Ithaka | 2분 59초 |
| B1_18 | WG-Besichtigung | 대화, R/F | Felix = Leon, Carla = Ava | 2분 38초 |
| B1_19 | Klassenfahrt | 설명회, 3지선다 | Herr Krüger = Ben, Mutter = Ela, Vater = Andrew | 3분 04초 |
| B1_20 | Sprachtandem | 팟캐스트, R/F | Marie = Emily | 2분 54초 |
| B2_17 | Zurück ins Büro? | 토론, 3지선다 | Moderatorin = Ela, Frau Hartmann = Melissa, Herr Kaya = Ben | 3분 25초 |
| B2_18 | Warum wir vergessen | 강연, 3지선다 | Herr Reuter = Andrew, Zuhörerin = Nadine | 2분 47초 |
| B2_19 | Bibliothek der Dinge | 르포, R/F | Reporter = Jonas, Frau Petersen = Bettina, Frau Vogt = Ava | 3분 08초 |
| B2_20 | Dialekte | 인터뷰, 3지선다 | Moderator = Toni, Frau Lenz = Ithaka | 3분 03초 |

2026.11.28에 만들었습니다. 음성 대본은 묶음 56개, 33,563자입니다.
