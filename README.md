# SODA Lehrwerk

Sophia Deutsch Akademie(소피아 독일어학원)의 독일어 학습 자료를 한곳에 모은 웹앱입니다. 표지 다음 페이지의 목차에서 여섯 가지 학습 자료를 골라 열 수 있어요.

## 학습 자료

| 폴더 | 자료 | 내용 |
|---|---|---|
| `grammatik/` | Lehrwerk Grammatik | 문법 교재, Lektion 37개 |
| `lesetraining/` | SODA Lesetraining | 독해 훈련, A1–C1, 텍스트 50개 |
| `hoertraining/` | Lehrwerk Hörtraining | 듣기 훈련, A1–C1, 80세트 |
| `praepositionen/` | SODA Präpositionen | 독일어 전치사의 모든 것, 전치사 80개, 비교, 퀴즈 |
| `verben-mit-praepositionen/` | Verben mit Präpositionen | 동사와 전치사 결합 플래시카드, A1–C2, 324장 |
| `nomen-verb-verbindungen/` | Nomen-Verb-Verbindungen | 명사와 동사 연어 플래시카드, A1–C2, 317장 |

루트의 `index.html`이 표지와 목차입니다. 목차는 세 묶음(Grundlagen / Training / Wortschatz)을 가로 패널 세 개로 보여 주고, 말하기 훈련은 업데이트 예정 카드로 들어 있어요. 주소 끝에 `#inhalt`를 붙이면 목차가 바로 열려요.

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
praepositionen/   이 저장소(SODA-PRP)에 있던 전치사 앱
verben-mit-praepositionen/   SODA-VP 저장소의 내용
nomen-verb-verbindungen/     SODA-NVV 저장소의 내용
```

각 폴더는 통합 전 저장소와 파일 내용이 같고, 자료끼리 서로 참조하지 않습니다. 파일 경로가 모두 상대 경로라서 폴더 안에서 그대로 동작해요. 통합 전 저장소는 그대로 남아 있습니다.

## 고치거나 추가하기

- 자료의 내용은 해당 폴더 안의 파일을 고칩니다.
- `lesetraining/`의 텍스트 원본과 데이터 파일을 다시 만드는 방법은 `lesetraining/README.md`에 있어요.
- `hoertraining/`과 `grammatik/`은 오프라인 캐시(서비스워커)를 씁니다. 이 두 폴더의 내용을 고친 뒤에는 같은 폴더의 `sw.js`도 함께 갱신해야 학생 기기에 새 내용이 나와요. 갱신하지 않으면 이전 내용이 계속 보일 수 있습니다.
- 목차에 자료를 추가하려면 루트 `index.html`의 해당 묶음의 `<ul class="grid">` 안에 `<li>` 항목을 같은 형식으로 추가합니다.

## 홈 화면에 앱 추가

여섯 앱의 표지에 모두 `홈 화면에 앱 추가` 버튼이 있습니다. 휴대폰에서만 보이고, 이미 홈 화면 앱으로 연 경우에는 숨겨져요. `grammatik/`과 `hoertraining/`은 자체 코드를, 나머지 네 앱은 `index.html` 맨 아래의 `SODA 공통 홈 화면에 앱 추가` 블록을 씁니다. 아이콘과 `manifest.webmanifest`는 각 앱 폴더에 있어요.
