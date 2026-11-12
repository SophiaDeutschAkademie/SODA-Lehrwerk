# SODA Lehrwerk

Sophia Deutsch Akademie(소피아 독일어학원)의 독일어 학습 자료를 한곳에 모은 웹앱입니다. 표지 다음 페이지의 목차에서 스물한 가지 학습 자료를 골라 열 수 있어요.

## 학습 자료

| 폴더 | 자료 | 내용 |
|---|---|---|
| `grammatik/` | Syntalab | 문법 교재, Lektion 37개와 부록「암기 노트」, 과마다 연습문제 37개(보강 포함)와 통합 복습 4세트 |
| `lesetraining/` | SODA Lesetraining | 독해 훈련, A1–C1, 텍스트 100개 |
| `hoertraining/` | Lehrwerk Hörtraining | 듣기 훈련, A1–C1, 88세트 |
| `schreibtraining/` | SODA Schreibtraining | 쓰기 훈련, A1–C1 레벨별 5챕터(총 25개), 챕터마다 구성·표현·연습·쓰기·모범답안, 「선생님께 제출하기」(소피아 독일어학원 수강생 전용 안내 팝업) |
| `sprechtraining/` | SODA Sprechtraining | 말하기 훈련, A1–C1과 MZ 구어체, 대화 36개, 독일어 음성 433줄 |
| `diktattraining/` | SODA Diktattraining | 받아쓰기 훈련, A1–C1, 문장 563개(56세트), 문장마다 음성, 틀린 곳을 종류별로 표시(어미·관사·철자·빠진 단어 등), 다시 쓸 문장, 나의 기록, 「선생님께 기록 보내기」(소피아 독일어학원 수강생 전용 안내 팝업) |
| `vokalab/` | SODA Vokalab | 독일어 단어장, A1–C1, 12,724단어, 주차별 목표와 테스트 |
| `praepositionen/` | SODA Präpositionen | 독일어 전치사의 모든 것, 전치사 80개, 비교, 퀴즈 |
| `verben-mit-praepositionen/` | Verben mit Präpositionen | 동사와 전치사 결합 플래시카드, A1–C2, 324장 |
| `nomen-verb-verbindungen/` | Nomen-Verb-Verbindungen | 명사와 동사 연어 플래시카드, A1–C2, 317장 |
| `redemittel/` | SODA Alltagsredemittel | 회화 패턴과 상황별 반응 표현 플래시카드, A1–B2, 279장 |
| `kuerze-wuerze/` | In der Kürze liegt die Würze | 일상을 위한 MSG, 짧은 표현 플래시카드, A2–C1, 256장과 헷갈리는 짝 |
| `lernmethoden/` | SODA Lernmethoden | 독일어 공부법, 학습 계획·어휘·문법·읽기·듣기·말하기·쓰기·시험·특별 주제 글 37편 |
| `sprechen/` | SODA Sprechen | 말하기 실전 연습(시험관·파트너와 Teil별 연습, 평가, 결과 파일). Modelltest 연습 기록은 같은 브라우저(localStorage `soda-sprechen:mdt:<시험 id>`)에도 저장되어, Modelltest 디지털 시험의 「선생님께 제출하기」가 필기 결과와 함께 보냅니다. 소피아 독일어학원 수강생 전용이라 아이디와 비밀번호로 로그인해야 합니다. 학습 포탈(`SODA-LERNPORTAL` 저장소)에 로그인한 브라우저에서는 그 로그인으로 바로 들어가서 로그인 화면이 나오지 않습니다(같은 브라우저의 localStorage `soda-portal:session`에 들어 있는 말하기 계정을 씁니다. 자세한 내용은 `SODA-LERNPORTAL`의 README 「학습 포탈」). 목차의 「SODA Modelltest」 묶음 맨 아래 전체 너비 타일과, Goethe A2·B1·B2, telc B1·B2 Modelltest 1·2의 「말하기 실전 연습」 줄에서 열립니다 |
| 별도 저장소 `SODA-Goethe` | Goethe A2·B1·B2 모의고사 | Modelltest 10·10·5개, 페이퍼(PDF, 듣기 음원)와 디지털 시험 화면, A2·B1·B2·C1 Hochschule에는 쓰기·말하기 시험 대비 가이드 |
| 별도 저장소 `SODA-TELC` | telc B1·B2·C1 Hochschule 모의고사 | Modelltest 5·7·5개, 페이퍼(PDF, 듣기 음원)와 디지털 시험 화면, B1·B2·C1 Hochschule에는 쓰기·말하기 시험 대비 가이드 |

루트의 `index.html`이 표지와 목차입니다. 목차는 세 묶음(Grammatik / Training / Wortschatz)을 가로 패널 세 개로 보여 주고, 말하기 훈련은 Training 묶음에 들어 있어요. 그 아래에 「Lernmethoden」(독일어 공부법) 묶음이 있고, 그 아래에 전체 너비의 「SODA Modelltest」 묶음이 있고, Goethe A2, Goethe B1, Goethe B2, telc B1, telc B2, telc C1 Hochschule 모의고사 여섯 항목이 들어 있습니다. 그 아래에 전체 너비의 「말하기 실전 연습」 타일(`sprechen/`, 수강생 전용 로그인)이 하나 더 있습니다. 이 여섯 항목은 용량 한도(GitHub Pages 1 GB) 때문에 별도 저장소(`SODA-Goethe`, `SODA-TELC`)의 주소로 연결됩니다. 주소 끝에 `#inhalt`를 붙이면 목차가 바로 열려요.

## 웹 주소로 열기 (GitHub Pages)

Settings → Pages → Build and deployment에서 Source를 `Deploy from a branch`, Branch를 `main` / `/ (root)`로 지정하고 저장합니다. 몇 분 뒤 아래 주소에서 열립니다.

- 표지와 목차: https://sophiadeutschakademie.github.io/SODA-Lehrwerk/
- 각 자료: 위 주소 뒤에 폴더 이름을 붙입니다. 예) https://sophiadeutschakademie.github.io/SODA-Lehrwerk/hoertraining/

`.nojekyll` 파일은 숨김 파일이라 폴더에서 안 보일 수 있어요. 지우지 마세요.

## 구조

```
index.html        표지와 목차 (표지에 「홈 화면에 앱 추가」)
manifest.webmanifest  목차를 홈 화면 앱으로 설치할 때 쓰는 정보
sitemap.xml       검색엔진에 제출하는 주소 목록 (tools/seo.py가 만듦)
tools/seo.py      페이지마다 검색용 태그를 넣고 sitemap.xml을 만드는 스크립트
assets/           표지와 목차에 쓰는 로고, 글꼴, 홈 화면 아이콘(assets/icons/)
grammatik/        SODA-Lehrwerk-Grammatik 저장소의 내용
lesetraining/     SODA-Lehrwerk-Lesetraining 저장소의 내용
hoertraining/     SODA-Lehrwerk-Hoertraining 저장소의 내용
sprechtraining/   SODA-SPRECHTRAINING 저장소의 내용 (대화 앱, 음성 mp3 포함)
schreibtraining/  쓰기 훈련 (챕터 데이터는 data/chapters.js, 화면은 assets/app.js)
diktattraining/   받아쓰기 훈련 (문장은 data/saetze.js, 문장별 음성은 audio/, 채점은 assets/grade.js, 만드는 스크립트는 tools/build.py)
vokalab/          VOKALAB 단어장 (A1–C1, 단일 HTML)
praepositionen/   이 저장소(SODA-PRP)에 있던 전치사 앱
verben-mit-praepositionen/   SODA-VP 저장소의 내용
nomen-verb-verbindungen/     SODA-NVV 저장소의 내용
sprechen/                    말하기 실전 연습(단일 HTML). 서버(Cloudflare Worker)가 로그인, 연습 횟수, 음성 연결을 맡습니다. 주소 끝의 #goethe-b1-2 같은 시험 id로 시험을 지정해 엽니다
redemittel/                  회화 패턴과 상황별 반응 표현 플래시카드(단일 HTML)
kuerze-wuerze/               일상을 위한 MSG, 짧은 표현 플래시카드(단일 HTML)
lernmethoden/                독일어 공부법 글 37편(단일 HTML, 원고와 빌드 스크립트 포함). lernmethoden/a/<글 id>.html은 글마다 따로 만든 검색용 페이지
zertifikat/                  옛 모의고사 주소를 새 주소로 넘기는 안내 페이지만 있음 (zertifikat/README.md)
```

Goethe(A2·B1·B2)와 telc(B1·B2·C1 Hochschule) 모의고사는 각각 `SODA-Goethe`, `SODA-TELC` 저장소에 있습니다.

각 폴더는 통합 전 저장소와 파일 내용이 같고, 자료끼리 서로 참조하지 않습니다. 파일 경로가 모두 상대 경로라서 폴더 안에서 그대로 동작해요. 통합 전 저장소는 그대로 남아 있습니다.

## 고치거나 추가하기

- 자료의 내용은 해당 폴더 안의 파일을 고칩니다.
- `lesetraining/`의 텍스트 원본과 데이터 파일을 다시 만드는 방법은 `lesetraining/README.md`에 있어요.
- `hoertraining/`과 `grammatik/`은 오프라인 캐시(서비스워커)를 씁니다. 이 두 폴더의 내용을 고친 뒤에는 같은 폴더의 `sw.js`도 함께 갱신해야 학생 기기에 새 내용이 나와요. 갱신하지 않으면 이전 내용이 계속 보일 수 있습니다.
- `grammatik/`의 부록「암기 노트」(`lessons/anhang.json`)는 각 과의 변화표와 목록을 그대로 옮겨 만든 것입니다. 과의 표를 고친 뒤 `python3 grammatik/tools/anhang-build.py`를 실행하면 부록도 같은 내용으로 다시 만들어지고, `index.html`과 `sw.js`의 버전 값도 함께 바뀌어요. 부록에 넣을 표와 순서는 이 스크립트의 `PARTS`에 적혀 있습니다. `PARTS`는 표를 과 안의 순서 번호로 가리키므로(`L03-t1` = 3과의 첫 번째 표), 과에 표를 새로 넣거나 빼면 그 뒤 표의 번호를 `PARTS`에서도 고쳐야 합니다. 행을 더하거나 글자를 고치는 것은 번호와 상관없어요.
- 내용 교정은 부록이 아니라 과(`lessons/L01.json` …)에서 합니다. 과의 글만 고친 경우에도 `anhang-build.py`를 실행해야 `index.html`과 `sw.js`의 버전 값이 바뀌어 학생 기기에 새 내용이 나와요. 스크립트의 `FIXES`에는 '이 과'처럼 과 안에서만 통하는 말을 부록용으로 바꾸는 항목만 둡니다.
- 과의 용어에 점선 밑줄로 걸린 낱말 풀이(`span.gt`)는 과마다 같은 글이 되풀이되어 들어 있습니다. 풀이를 고칠 때는 모든 과에서 같은 글을 한꺼번에 바꿉니다.
- `grammatik/`의 연습문제(목차 아래 「연습문제 · Übungen」)는 과마다 하나, 37개예요. 과마다 기본·중간·도전 뒤에 보강(바꿔 쓰기·오류 찾기)이 있고, 목차 맨 아래에 여러 과를 섞은 통합 복습 4세트(`W1.json` … `W4.json`)가 있어요. 학생이 푼 답은 기기에 저장되며, 지키는 규칙은 `grammatik/tools/uebungen-src/README.md` 끝에 있어요. 원본은 `grammatik/tools/uebungen-src/U01.json` … `U37.json`이고, 쓰는 법과 규칙은 같은 폴더의 `README.md`에 있어요. 원본을 고친 뒤 `python3 grammatik/tools/uebungen-check.py`로 검사하고 `python3 grammatik/tools/uebungen-build.py`를 실행하면 `grammatik/uebungen/`의 앱용 파일, `index.html`의 연습 주소, `sw.js`의 캐시 목록과 버전이 함께 바뀌어요.
- 목차에 자료를 추가하려면 루트 `index.html`의 해당 묶음의 `<ul class="grid">` 안에 `<li>` 항목을 같은 형식으로 추가합니다.
- 모의고사 여섯 앱은 `SODA-Goethe`, `SODA-TELC` 저장소의 각 앱 폴더에 있고, 다시 만드는 방법은 앱 폴더의 `digital-src/README.md`에 있어요. 파일을 고치면 그 저장소의 `tools/soda-theme.py`로 다크 모드 스위치를 다시 넣습니다(빌드 스크립트는 자동으로 실행).

## 쓰기 훈련(`schreibtraining/`) 고치기

- 챕터 내용은 `schreibtraining/data/chapters.js` 하나에 있습니다. 맨 위 설명에 챕터 구조(구성, 표현, 연습, 과제, 점검, 모범답안)가 적혀 있어요. 새 챕터는 같은 형식의 객체를 배열에 더하면 레벨 목록에 바로 나옵니다.
- 고친 뒤에는 `schreibtraining/index.html`의 `chapters.js?v=` 값을 바꿔야 학생 기기에 새 내용이 나와요.
- 「선생님께 제출하기」는 Lesetraining·Hörtraining과 같은 Apps Script 주소로 보냅니다. 메일 제목은 「[SODA 학습 기록] Schreibtraining B1-01 · 학생 이름」으로 오고, 학생 글 전체가 본문과 txt 첨부에 들어 있습니다.
- 학생이 쓴 글은 학생 기기의 브라우저(localStorage `soda-schreib-draft:<챕터 id>`)에 입력할 때마다 자동 저장됩니다. 저장 이름에 챕터 `id`가 들어가므로, 이미 올린 챕터의 `id`(예: `b1-01`)는 바꾸지 않습니다. 새 챕터는 새 `id`로 더합니다.
- 한국어 설명과 해석은 해요체로 씁니다. B1 이상 격식 편지의 해석만 합니다체로 씁니다.
- 레벨 화면의 제목과 소개 문장은 `schreibtraining/assets/app.js` 맨 위 `LEVELS`에 있습니다. 챕터 구성이 바뀌면 함께 고칩니다.

## 받아쓰기 훈련(`diktattraining/`) 고치기

- 문장은 새로 쓴 것이 아니라 `hoertraining/`(줄 단위 시작·끝 시각이 있는 지문)과 `sprechtraining/`(줄마다 음성이 있는 대화, MZ 챕터 제외)에서 3–12단어 줄을 골라 온 것입니다. `python3 diktattraining/tools/build.py`가 줄을 고르고, 문장마다 음성 파일 `audio/<레벨>/<문장 id>.mp3`를 만들고, 앱이 읽는 `data/saetze.js`를 씁니다(ffmpeg, node, numpy 필요). 이미 있는 음성은 다시 만들지 않고, `--audio`를 붙이면 모두 다시 만듭니다.
- 글로 보아 받아쓰기에 맞지 않는 줄은 빠집니다. 규칙(말줄임, 줄임말, 낱글자와 철자 부르기, 대문자 약어, 숫자 나열 등)은 `tools/build.py`의 `reason()`에 있고, 한 줄씩 따로 뺀 것은 이유와 함께 `tools/ausschluss.json`에 있습니다. 음성 인식으로 받아 적어 원문과 다르게 들린 줄(구어 축약, 음성이 불분명한 단어)도 이 목록으로 뺐습니다.
- 음원 때문에 문장 하나만 깨끗하게 들려줄 수 없는 줄도 빠집니다. 듣기 훈련에서는 전화 음질로 만든 줄, 앞뒤에 쉼이 없어 옆 문장과 떼어 낼 수 없는 줄, 말소리에 다른 큰 소리(안내 방송의 신호음 등)가 겹친 줄이고, 말하기 훈련에서는 음성 파일이 문장의 끝소리 도중에 끝나는 줄입니다. `build.py`가 음원을 검사해 줄마다 자를 자리 또는 뺀 이유를 `tools/schnitt.json`에 적습니다. 음원 파일이 바뀐 지문만 다시 검사합니다.
- 듣기 훈련 음원은 줄 앞뒤의 무음 구간을 찾아 그 가운데에서 자릅니다. 배경음(시장, 역, 카페 소리 등)이 깔린 지문은 먼저 배경음을 줄인 음원을 만들어 거기서 자릅니다. 말하기 훈련 줄 음성은 통째로 씁니다. 모든 문장은 같은 음량(EBU R128 기준 −18 LUFS)으로 맞추고 앞에 0.25초, 뒤에 0.3초 무음을 붙입니다.
- 배경음이 있는 지문의 음성을 새로 만들 때만 DeepFilterNet의 실행 파일 `deep-filter`(0.5.6)가 필요합니다. [DeepFilterNet 배포 페이지](https://github.com/Rikorose/DeepFilterNet/releases)에서 받아 PATH에 두거나 환경 변수 `DEEP_FILTER`에 경로를 적습니다. 배경음을 줄인 지문 음원은 `tools/.cache/`에 보관하고 저장소에는 올리지 않습니다.
- `tools/asr_check.py`는 만든 음성을 음성 인식 두 가지(Parakeet, Whisper)로 받아 적어 원문과 비교합니다(선택 도구, sherpa-onnx와 모델이 필요하며 파일 맨 위에 설명이 있음). 두 가지 모두 다르게 받아 적은 문장은 확인해서 `tools/ausschluss.json`에 넣습니다. 음성 인식은 배경음이나 끊긴 소리에 사람보다 너그러우므로, 이 검사를 통과했다고 듣기 좋은 음성이라는 뜻은 아닙니다. 새 지문을 넣은 뒤에는 몇 세트를 직접 들어 봅니다.
- `tools/hoerprobe.html`은 모든 문장을 차례로 들어 보며 이상한 음성에 표시하는 점검 페이지입니다(주소 `…/diktattraining/tools/hoerprobe.html`, 목차에는 연결하지 않음). 음성 종류(배경음을 줄인 문장, 그대로 쓴 문장, 말하기 훈련 줄)별로 골라 들을 수 있고, 표시한 문장 id 목록을 복사할 수 있습니다. 그 id를 이유와 함께 `tools/ausschluss.json`에 넣고 `build.py`를 다시 실행하면 그 문장이 빠집니다.
- 이름 힌트(입력란 위에 미리 보여 주는 사람 이름·지명·상호)는 `tools/build.py`의 `NAMES`에 있습니다. `Herr`·`Frau` 뒤의 성은 목록에 없어도 힌트가 됩니다.
- 세트 구성은 `tools/sets.json`에 적혀 있고 한 번 정해지면 바뀌지 않습니다. 학생의 기록이 세트 id(`a1-01`)와 문장 id(`h-a1-08-a-kino-01`, `s-a1-02-08`)로 저장되기 때문입니다. 새로 생긴 문장은 그 레벨의 새 세트로 뒤에 붙고, 재료에서 없어진 문장은 세트에서 빠집니다. `sets.json`을 지우거나 `--neu`를 붙여 다시 만들면 세트가 처음부터 다시 나뉘어 학생의 진행 기록과 어긋나니 쓰지 않습니다. (2026-11-12에 음성 문제로 문장을 많이 빼면서 공개 다음 날 한 번 다시 나눴습니다.)
- `hoertraining/`의 줄 원문·시각이나 `sprechtraining/`의 대화 줄·음성을 고쳤다면 `build.py`를 다시 실행합니다. 원문이 바뀐 문장은 그 문장의 음성 파일을 지운 뒤 실행해야 음성도 새로 만들어집니다.
- 다시 만든 뒤에는 `diktattraining/index.html`의 `saetze.js?v=` 값을 바꿔야 학생 기기에 새 내용이 나와요. 음성 파일을 바꿨다면 `assets/app.js`의 `AUDIO_V`도 올립니다.
- 채점 규칙은 `assets/grade.js` 맨 위 설명에 있습니다. 문장부호와 문장 첫 글자의 대소문자는 보지 않고, 숫자는 글자와 숫자를 모두 받고, 둘 다 쓰는 표기(Tschüs·Tschüss, geht's·gehts, zu Hause·zuhause)는 모두 맞게 처리합니다. 틀린 곳은 어미, 관사·대명사, 대소문자, 움라우트·ß, 철자, 띄어쓰기, 빠진 단어, 더 쓴 단어, 다른 단어로 나눕니다.
- 학생의 기록은 학생 기기의 브라우저(localStorage `soda-diktat-v1`)에 저장됩니다. 끝낸 세트, 하던 연습, 다시 쓸 문장(1차에서 틀린 문장), 연습 기록이 들어 있어요.
- 「선생님께 기록 보내기」는 Lesetraining·Hörtraining·Schreibtraining과 같은 Apps Script 주소로 보냅니다. 앱 이름은 `Diktattraining`으로 가고, 본문에 끝낸 세트, 1차·최종 정확도, 틀린 종류, 1차에서 틀린 문장(정답과 학생이 쓴 문장)이 들어 있습니다.
- 한국어 설명은 해요체로 씁니다.

## 다크 모드

모든 앱과 목차에 다크 모드 버튼(해·달 아이콘)이 있습니다. 처음 열면 다크 모드로 시작하고, 버튼을 누르면 라이트 모드로 바뀝니다. 선택은 브라우저에 저장되며 `soda-theme` 하나를 모든 앱이 함께 씁니다. 그래서 한 앱에서 바꾸면 다른 앱에도 같은 모드가 적용돼요. 각 `index.html`에 `soda-theme-js`(버튼과 저장)와 `soda-dark`(다크 색) 블록이 들어 있습니다. 모의고사 여섯 앱(`SODA-Goethe`, `SODA-TELC` 저장소)은 `index.html`과 `digital.html` 모두에 같은 블록이 들어 있어요.

## 홈 화면에 앱 추가

일곱 앱의 표지에 모두 `홈 화면에 앱 추가` 버튼이 있습니다. 휴대폰에서만 보이고, 이미 홈 화면 앱으로 연 경우에는 숨겨져요. `grammatik/`과 `hoertraining/`은 자체 코드를, 나머지 다섯 앱은 `index.html` 맨 아래의 `SODA 공통 홈 화면에 앱 추가` 블록을 씁니다. 아이콘과 `manifest.webmanifest`는 각 앱 폴더에 있어요.

## 독일어 공부법(`lernmethoden/`) 고치기

- 글 원고는 `lernmethoden/src/<글id>.txt`입니다. 맨 위에 `id`, `cat`, `no`, `date`, `title`, `sum`을 적고 `---` 아래에 본문을 씁니다. 문법은 `lernmethoden/build.py` 맨 위 설명에 있어요.
- 원고를 고치거나 새 글을 넣은 뒤 `python3 lernmethoden/build.py`를 실행하면 `lernmethoden/index.html`이 다시 만들어집니다. 분류 목록은 `build.py`의 `CATS`에 있습니다.
- 분류는 열 개입니다(일반, 학습 계획, 어휘, 문법, 읽기, 듣기, 말하기, 쓰기, 시험, 특별 주제). 글의 `id`는 글 주소(`#a/<id>`, `lernmethoden/a/<id>.html`)여서 한번 정하면 바꾸지 않습니다. 글을 다른 분류로 옮길 때는 `cat`과 `no`만 고치고, 두 분류의 `no`를 1부터 빠짐없이 이어지게 다시 매깁니다(어긋나면 빌드가 멈춥니다). 다른 글에서 「특별 주제 2편」처럼 번호로 가리키는 링크 글자도 함께 고칩니다.
- 시험(Prüfungen) 분류의 세 글은 특별 주제에서 옮긴 글이라 `id`가 `sonder-2`, `sonder-7`, `sonder-8`입니다. 새 글의 `id`는 `<분류>-<번호>`로 짓되 이미 있는 파일 이름을 피합니다(시험의 다음 글은 `pruefungen-4`, 특별 주제의 다음 글은 `sonder-9`).
- 목차 타일의 「글 27편」과 `README`의 편수는 글을 더하거나 뺄 때 직접 고칩니다.
- 목차의 분류는 닫힌 상태로 보이고, 분류를 누르면 그 분류의 글 목록이 아래에 열립니다. 다시 누르면 닫힙니다.
- 본문에서 다른 앱으로 가는 링크 카드(`link|`)의 주소는 `../sprechtraining/`처럼 `lernmethoden/` 기준으로 적습니다. 글 페이지(`lernmethoden/a/`)에서는 빌드할 때 한 단계 위(`../../sprechtraining/`)로 바뀝니다.

페이퍼 시험의 풀이 PDF 제출은 SODA-Goethe·SODA-TELC의 `index.html`에서 이루어지며, 같은 제출 주소(Apps Script)를 씁니다.

## 검색 노출

네이버·구글 검색에 자료가 잡히도록 세 가지를 해 두었습니다.

- **페이지마다 검색용 태그**: 목차와 각 앱의 `<title>`, 설명, canonical 주소, 카카오톡 미리보기(og 태그)를 `tools/seo.py`가 `<!-- seo:begin -->` … `<!-- seo:end -->` 사이에 넣습니다. 제목과 설명을 고치려면 `tools/seo.py`의 `PAGES`를 고친 뒤 `python3 tools/seo.py`를 실행합니다. 여러 번 실행해도 태그는 한 번만 들어갑니다. 앱의 index.html을 통째로 새로 만드는 빌드를 돌렸다면 이 스크립트를 다시 실행합니다.
- **검색에서 빼는 페이지**: 수강생 전용 `sprechen/`과 옛 모의고사 주소 안내 `zertifikat/`에는 noindex 태그가 들어갑니다(`NOINDEX`).
- **공부법 글 페이지**: `lernmethoden/build.py`가 앱(`lernmethoden/index.html`)과 함께 글마다 본문이 HTML에 그대로 들어 있는 페이지 `lernmethoden/a/<글 id>.html`을 만듭니다. 앱 안의 글은 주소가 `#a/…`라서 검색엔진이 글 하나하나를 따로 찾지 못하기 때문입니다. 원고를 고치면 `python3 lernmethoden/build.py`만 실행하면 되고, 끝날 때 `tools/seo.py`도 자동으로 실행됩니다.
- **sitemap.xml**: 목차, 앱 13개, 공부법 글 37편의 주소입니다. 네이버 서치어드바이저와 구글 서치 콘솔에 `https://sophiadeutschakademie.github.io/SODA-Lehrwerk/sitemap.xml`로 제출합니다. 날짜(lastmod)는 고친 파일만 오늘 날짜로 바뀝니다. 얕은 복제(`git clone --depth 1`)에서는 git 기록으로 파일별 날짜를 알 수 없어서, 바뀌지 않은 페이지는 이미 올라가 있는 sitemap.xml의 날짜를 그대로 둡니다.

사이트 소유 확인 코드는 `tools/seo.py`의 `VERIFY`에 적고 스크립트를 실행하면 목차(`index.html`) 머리에 들어갑니다.

`robots.txt`는 두지 않았습니다. 이 사이트는 `sophiadeutschakademie.github.io/SODA-Lehrwerk/` 아래에 있어서, 검색엔진은 도메인 맨 위(`sophiadeutschakademie.github.io/robots.txt`)만 읽고 이 저장소 안의 robots.txt는 읽지 않습니다. robots.txt가 없으면 모든 페이지를 수집해도 된다는 뜻입니다.

