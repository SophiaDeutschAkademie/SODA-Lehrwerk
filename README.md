# SODA Lehrwerk

Sophia Deutsch Akademie(소피아 독일어학원)의 독일어 학습 자료를 한곳에 모은 웹앱입니다. 표지 다음 페이지의 목차에서 열다섯 가지 학습 자료를 골라 열 수 있어요.

## 학습 자료

| 폴더 | 자료 | 내용 |
|---|---|---|
| `grammatik/` | Syntalab | 문법 교재, Lektion 37개 |
| `lesetraining/` | SODA Lesetraining | 독해 훈련, A1–C1, 텍스트 55개 |
| `hoertraining/` | Lehrwerk Hörtraining | 듣기 훈련, A1–C1, 80세트 |
| `sprechtraining/` | SODA Sprechtraining | 말하기 훈련, A1–C1과 MZ 구어체, 대화 36개, 독일어 음성 433줄 |
| `vokalab/` | SODA Vokalab | 독일어 단어장, A1–C1, 12,724단어, 주차별 목표와 테스트 |
| `praepositionen/` | SODA Präpositionen | 독일어 전치사의 모든 것, 전치사 80개, 비교, 퀴즈 |
| `verben-mit-praepositionen/` | Verben mit Präpositionen | 동사와 전치사 결합 플래시카드, A1–C2, 324장 |
| `nomen-verb-verbindungen/` | Nomen-Verb-Verbindungen | 명사와 동사 연어 플래시카드, A1–C2, 317장 |
| `redemittel/` | SODA Alltagsredemittel | 회화 패턴과 상황별 반응 표현 플래시카드, A1–B2, 279장 |
| 별도 저장소 `SODA-Goethe` | Goethe A2·B1·B2 모의고사 | Modelltest 5·10·5개, 페이퍼(PDF, 듣기 음원)와 디지털 시험 화면 |
| 별도 저장소 `SODA-TELC` | telc B1·B2·C1 Hochschule 모의고사 | Modelltest 5·7·5개, 페이퍼(PDF, 듣기 음원)와 디지털 시험 화면 |

루트의 `index.html`이 표지와 목차입니다. 목차는 세 묶음(Grammatik / Training / Wortschatz)을 가로 패널 세 개로 보여 주고, 말하기 훈련은 Training 묶음에 들어 있어요. 그 아래에 전체 너비의 「SODA Modelltest」 묶음이 있고, Goethe A2, Goethe B1, Goethe B2, telc B1, telc B2, telc C1 Hochschule 모의고사 여섯 항목이 들어 있습니다. 이 여섯 항목은 용량 한도(GitHub Pages 1 GB) 때문에 별도 저장소(`SODA-Goethe`, `SODA-TELC`)의 주소로 연결됩니다. 주소 끝에 `#inhalt`를 붙이면 목차가 바로 열려요.

## 웹 주소로 열기 (GitHub Pages)

Settings → Pages → Build and deployment에서 Source를 `Deploy from a branch`, Branch를 `main` / `/ (root)`로 지정하고 저장합니다. 몇 분 뒤 아래 주소에서 열립니다.

- 표지와 목차: https://sophiadeutschakademie.github.io/SODA-PRP/
- 각 자료: 위 주소 뒤에 폴더 이름을 붙입니다. 예) https://sophiadeutschakademie.github.io/SODA-PRP/hoertraining/

`.nojekyll` 파일은 숨김 파일이라 폴더에서 안 보일 수 있어요. 지우지 마세요.

## 구조

```
index.html        표지와 목차
assets/           표지와 목차에 쓰는 로고, 글꼴
grammatik/        SODA-Lehrwerk-Grammatik 저장소의 내용
lesetraining/     SODA-Lehrwerk-Lesetraining 저장소의 내용
hoertraining/     SODA-Lehrwerk-Hoertraining 저장소의 내용
sprechtraining/   SODA-SPRECHTRAINING 저장소의 내용 (대화 앱, 음성 mp3 포함)
vokalab/          VOKALAB 단어장 (A1–C1, 단일 HTML)
praepositionen/   이 저장소(SODA-PRP)에 있던 전치사 앱
verben-mit-praepositionen/   SODA-VP 저장소의 내용
nomen-verb-verbindungen/     SODA-NVV 저장소의 내용
redemittel/                  회화 패턴과 상황별 반응 표현 플래시카드(단일 HTML)
zertifikat/                  옛 모의고사 주소를 새 주소로 넘기는 안내 페이지만 있음 (zertifikat/README.md)
```

Goethe(A2·B1·B2)와 telc(B1·B2·C1 Hochschule) 모의고사는 각각 `SODA-Goethe`, `SODA-TELC` 저장소에 있습니다.

각 폴더는 통합 전 저장소와 파일 내용이 같고, 자료끼리 서로 참조하지 않습니다. 파일 경로가 모두 상대 경로라서 폴더 안에서 그대로 동작해요. 통합 전 저장소는 그대로 남아 있습니다.

## 고치거나 추가하기

- 자료의 내용은 해당 폴더 안의 파일을 고칩니다.
- `lesetraining/`의 텍스트 원본과 데이터 파일을 다시 만드는 방법은 `lesetraining/README.md`에 있어요.
- `hoertraining/`과 `grammatik/`은 오프라인 캐시(서비스워커)를 씁니다. 이 두 폴더의 내용을 고친 뒤에는 같은 폴더의 `sw.js`도 함께 갱신해야 학생 기기에 새 내용이 나와요. 갱신하지 않으면 이전 내용이 계속 보일 수 있습니다.
- 목차에 자료를 추가하려면 루트 `index.html`의 해당 묶음의 `<ul class="grid">` 안에 `<li>` 항목을 같은 형식으로 추가합니다.
- 모의고사 여섯 앱은 `SODA-Goethe`, `SODA-TELC` 저장소의 각 앱 폴더에 있고, 다시 만드는 방법은 앱 폴더의 `digital-src/README.md`에 있어요. 파일을 고치면 그 저장소의 `tools/soda-theme.py`로 다크 모드 스위치를 다시 넣습니다(빌드 스크립트는 자동으로 실행).

## 다크 모드

모든 앱과 목차에 다크 모드 버튼(해·달 아이콘)이 있습니다. 처음 열면 다크 모드로 시작하고, 버튼을 누르면 라이트 모드로 바뀝니다. 선택은 브라우저에 저장되며 `soda-theme` 하나를 모든 앱이 함께 씁니다. 그래서 한 앱에서 바꾸면 다른 앱에도 같은 모드가 적용돼요. 각 `index.html`에 `soda-theme-js`(버튼과 저장)와 `soda-dark`(다크 색) 블록이 들어 있습니다. 모의고사 여섯 앱(`SODA-Goethe`, `SODA-TELC` 저장소)은 `index.html`과 `digital.html` 모두에 같은 블록이 들어 있어요.

## 홈 화면에 앱 추가

일곱 앱의 표지에 모두 `홈 화면에 앱 추가` 버튼이 있습니다. 휴대폰에서만 보이고, 이미 홈 화면 앱으로 연 경우에는 숨겨져요. `grammatik/`과 `hoertraining/`은 자체 코드를, 나머지 다섯 앱은 `index.html` 맨 아래의 `SODA 공통 홈 화면에 앱 추가` 블록을 씁니다. 아이콘과 `manifest.webmanifest`는 각 앱 폴더에 있어요.
