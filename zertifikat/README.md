# SODA Modelltest

Goethe와 telc 모의고사(Modelltest) 네 묶음입니다. 메인 목차의 「SODA Modelltest」 묶음에서 열립니다. 각 폴더는 통합 전 저장소와 내용이 같고, 폴더마다 표지, 응시 방식(페이퍼·디지털), Modelltest 목록으로 이어지는 자기 목차 페이지(`index.html`)를 가집니다.

| 폴더 | 통합 전 저장소 | 내용 |
|---|---|---|
| `goethe-a2/` | (이 저장소에서 처음 만듦) | Goethe-Zertifikat A2, Modelltest 4개 (PDF, 듣기 MP3, 디지털 시험 화면) |
| `goethe-b1/` | SODA-GZ-B1 | Goethe-Zertifikat B1, Modelltest 10개 (PDF, 듣기 MP3, 디지털 시험 화면) |
| `goethe-b2/` | SODA-GZ-B2 | Goethe-Zertifikat B2, Modelltest 4개 (PDF, 듣기 MP3, 디지털 시험 화면) |
| `telc-b2/` | SODA-telc-B2 | telc Deutsch B2, Modelltest 5개 (PDF, 듣기 MP3, 디지털 시험 화면) |
| `tools/` | | 네 앱에 다크 모드 스위치를 넣는 `soda-theme.py` |

## 앱 폴더 구성

```
index.html       표지, 응시 방식, 페이퍼 목록, 디지털 목록, Modelltest별 페이지
digital.html     디지털 시험 화면 (Lesen, Hören, Schreiben)
<시험> Modelltest N.pdf, N.k.mp3   문제지와 듣기 음원
digital-src/     digital.html과 index.html의 원본(데이터, 템플릿, 빌드 스크립트)
```

`goethe-b1/`에는 예전에 만든 단일 파일 오프라인 버전(`Goethe B1 Modelltest N offline.html`)도 그대로 들어 있습니다. 목차에서는 연결하지 않습니다.

학생의 답과 결과는 학생 브라우저에만 저장되고, 앱마다 저장 이름이 다릅니다(`sodaGZA2.v1.`, `sodaGZB1.v1.`, `sodaGZB2.v1.`, `sodaTelcB2.v1.`). 통합 전에 저장한 답과 결과는 그대로 이어집니다.

## 다크 모드와 목차 버튼

네 앱의 모든 화면 오른쪽 위에 다크 모드 스위치가 있습니다. 처음 열면 다크이고, 선택은 `soda-theme` 하나를 Lehrwerk의 모든 앱과 함께 씁니다. 목차 페이지(`index.html`)에는 스위치 왼쪽에 「목차」 버튼이 있어 Lehrwerk 목차로 돌아갑니다. 시험 화면에는 시험 중 잘못 눌러 나가는 일을 막으려고 스위치만 둡니다.

`tools/soda-theme.py`가 이 부품을 넣습니다. 각 앱의 `build-digital.py`(와 A2·B2의 `build-index.py`)가 파일을 쓴 뒤 자동으로 부르고, 직접 쓸 때는 다음처럼 실행합니다. 몇 번을 실행해도 결과가 같습니다.

```
python3 zertifikat/tools/soda-theme.py zertifikat/goethe-a2/index.html  --kind index
python3 zertifikat/tools/soda-theme.py zertifikat/goethe-a2/digital.html --kind exam
```

Goethe B1과 telc B2의 `index.html`은 빌드 스크립트 없이 직접 고치는 파일입니다. 고친 뒤에 위 명령을 한 번 실행하면 됩니다.

## 새 Modelltest 추가

해당 앱 폴더의 `digital-src/README.md`를 따릅니다. 메인 목차의 「Modelltest N개」 표시는 `index.html`의 해당 항목에서 고칩니다.
