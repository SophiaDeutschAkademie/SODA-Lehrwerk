# SODA Kinder

어린이와 초등 저학년을 위한 독일어 교재입니다. 레벨 구분이 없고, 글자를 몰라도 듣고 따라 말하면서 시작할 수 있습니다. 부엉이 Sofi와 독일 친구 Lena, Ben이 나옵니다.

- 주소: https://sophiadeutschakademie.github.io/SODA-Lehrwerk/kinder/
- 목차 묶음: Lehrbuch
- 열려 있는 단원: 1–32 (Thema 1–8), 복습 놀이 Spielplatz 1–8, 명절 단원 네 개(Ostern, Laternenfest, Nikolaus, Weihnachten)
- 스티커 서른두 장(1–32단원)을 모두 모으면 차례의 「Urkunde 수료증」이 열립니다.

## 책의 짜임

| Thema | 단원 |
|---|---|
| 1 Hallo! | 1 Hallo! · 2 Wie heißt du? · 3 Wie geht’s? · 4 Eins, zwei, drei |
| 2 Bunte Welt | 5 Rot, blau, grün · 6 Mein Schulranzen · 7 Steh auf! Setz dich! · 8 Elf, zwölf, dreizehn |
| 3 Ich und meine Familie | 9 Meine Familie · 10 Kopf, Bauch, Fuß · 11 Hose und Pulli · 12 Mein Zuhause |
| 4 Lecker! | 13 Obst und Gemüse · 14 Mein Frühstück · 15 Hunger und Durst · 16 Auf dem Markt |
| 5 Tiere | 17 Hund und Katze · 18 Auf dem Bauernhof · 19 Im Zoo · 20 Was kann der Frosch? |
| 6 Spielen und Freunde | 21 Mein Spielzeug · 22 Was machst du gern? · 23 Spielst du mit? · 24 Woher kommst du? |
| 7 Mein Tag | 25 Von morgens bis abends · 26 Wie spät ist es? · 27 Montag, Dienstag … · 28 Mit dem Bus |
| 8 Das Jahr | 29 Wie ist das Wetter? · 30 Die Jahreszeiten · 31 Januar, Februar, März · 32 Alles Gute! |

한 단원은 여섯 활동으로 되어 있습니다.

1. **Hör zu!** 그림을 보며 짧은 이야기를 듣습니다. 줄을 누르면 그 말만 다시 들립니다.
2. **Schau mal!** 그림 카드 여섯 장으로 낱말을 익힙니다. 명사는 der·die·das를 색으로 구분합니다.
3. **Sprich nach!** 문장 틀에 낱말을 바꿔 넣어 말하고, 역할을 맡아 대화하고, 자기 목소리를 녹음해 들어 봅니다.
4. **Spiel mit!** 듣고 고르기와 짝 맞추기 놀이를 합니다.
5. **Klatsch mit!** 손뼉을 치며 따라 말하는 리듬 놀이를 합니다.
6. **Mach mit!** 집에서 해 볼 일, 따라 쓰기(단원 17부터), 스티커, 부모님과 선생님께 드리는 안내가 있습니다.

단원 5부터는 낱말의 첫소리 글자를 하나씩 봅니다. Thema가 끝나면 그 Thema의 낱말을 모아 Spielplatz에서 복습합니다.

명절 단원은 차례 맨 아래 「Feste」에 있고, 책의 차례와 따로 그 달에 꺼내 배웁니다. 안에서는 33–36번 단원으로 다룹니다(`tools/src/k33.json`–`k36.json`, 주소 `#k33-1`).

카드는 단원 종류(`kind`)에 따라 다르게 그립니다. `pic`은 생성한 그림, `num`은 숫자와 점, `farbe`는 색 풍선, `uhr`는 화면에서 그리는 시계(26단원), `wort`는 글자 칸(27단원 요일, 31단원 달)입니다.

## 그림의 움직임

그림은 생성한 그대로 쓰고, 화면에서 CSS로만 움직입니다. 장면 그림은 빌드할 때 덩어리(아이들, 물건, Sofi)로 나눠 따로 놓기 때문에 덩어리마다 조금씩 다르게 흔들립니다. 누가 말하는 동안에는 그 사람이 들어 있는 덩어리가 통통 뜁니다. 카드 그림, 안내하는 Sofi, 표지의 Sofi도 조금씩 움직입니다. 기기에서 「동작 줄이기」를 켜 두면 모든 움직임이 멈춥니다.

## Sofi의 눈

생성한 Sofi 그림의 눈은 남색 타원뿐이라 눈이 없는 것처럼 보였습니다. 그래서 눈마다 호박색 홍채 고리와 흰 반짝임 두 개를 덧그렸습니다(`tools/sofi_augen.py`). 원래의 남색 타원은 테두리와 눈동자로 남아 있습니다. 눈을 감은 `sofi_schlaf` 와 `sofi_hoer` 의 감은 눈은 그대로입니다.

Sofi 그림을 새로 생성하면 `python3 kinder/tools/sofi_augen.py` 를 한 번 실행합니다. `img/c/` 의 Sofi 자세와 얼굴 그림, `icons/` 의 아이콘에 눈을 그리고, 이미 눈이 있는 그림은 건너뜁니다. 날개에 눈이 가린 `sofi_hoer` 자세는 눈의 자리를 도구 안에 적어 두었으므로, 이 자세를 새로 생성했다면 `HOER` 값을 고쳐야 합니다.

## 폴더

```
index.html            화면 (tools/shell.html 에서 만듦, 직접 고치지 않음)
data/kNN.js           단원 자료 (단원을 열 때 하나씩 받음)
audio/kNN/            단원 음성: s01… Sofi, l01… Lena, b01… Ben, chant.mp3 리듬 놀이
audio/c/              공통 음성: 칭찬(fb_*), 활동 이름(st_*), 인사
img/kNN/              단원 그림: 장면 덩어리(szene_pN.webp), 카드(c1–c6.webp)
img/c/                Sofi 네 자세와 등장인물 얼굴 (Sofi의 눈은 tools/sofi_augen.py 로 덧그림)
fonts/                글꼴 SodaFibel (OFL.txt 참고)
icons/, manifest.webmanifest   홈 화면 앱
tools/                원본과 만드는 도구
```

## 만드는 도구 (tools/)

```
book.json     차례 (8 Thema, 32단원, 명절 단원 33–36)
src/kNN.json  단원 원본: 이야기, 카드, 문장 틀, 대화, 리듬, 집에서 해 보기, 그림 설명
shell.html    화면 틀 (CSS와 스크립트)
blocks/       Lehrwerk 공통 블록 (다크 모드, 홈 화면에 앱 추가)
build.py      검사, 음성 대본, 그림 프롬프트, 음성 자르기, 그림 넣기, 빌드
sofi_augen.py Sofi 그림에 눈(홍채와 반짝임) 그리기
test.py       화면 검사 (Playwright)
tts/          음성 대본(<job>.json), plan.json, 그림 프롬프트(prompts.json)
audio/, img/  단원별 음성 대응표와 장면 배치표 (build.py 가 만듦)
```

새 단원을 올리는 순서입니다.

1. `tools/src/kNN.json` 을 씁니다. 가까운 단원 파일을 복사해 고치면 됩니다.
2. `python3 kinder/tools/build.py check NN` 으로 짜임과 글자 수를 봅니다.
3. `python3 kinder/tools/build.py tts NN` 과 `prompts NN` 으로 음성 대본과 그림 프롬프트를 만듭니다.
4. ElevenLabs에서 음성(eleven_v3, language_code `de`)과 그림(Recraft 4.1 Flash)을 생성해 한 폴더에 받습니다. 음성은 `<job>.mp3` 와 단어 시각 `<job>.words.json`, 그림은 `kNN_szene.webp`, `kNN_karten.webp`, `kNN_cN.webp` 이름으로 둡니다.
5. `python3 kinder/tools/build.py cut 폴더` 로 음성을 줄 단위로 자르고, `img 폴더` 로 그림을 넣습니다.
6. `python3 kinder/tools/build.py site` 로 `data/` 와 `index.html` 을 다시 만듭니다. 그림과 음성이 모두 있는 단원만 열립니다. 끝날 때 저장소의 `tools/seo.py` 도 함께 돕니다.
7. `python3 kinder/tools/test.py smoke 1-36` 과 `full NN` 으로 화면을 확인합니다.
8. 목차 타일의 업데이트 날짜와 단원 수를 고치고 `notices.json` 에 공지를 더합니다.

목소리는 Sofi = Milly Maple, Lena = Rika Sturm, Ben = Pipp 입니다. 한 번에 열 줄까지 `[long pause]` 로 이어 생성한 다음 줄 단위로 자릅니다. 그림은 SODA 삽화 그림체(남색, 회청, 모래색, 아이보리)입니다. 장면에는 Sofi를 그리지 않고, 빌드할 때 Sofi의 정해진 그림을 따로 놓습니다. 그래서 Sofi의 모습이 단원마다 같습니다.

## 학습 기록

그 브라우저의 localStorage `soda-kinder-v1` 에 남습니다(아이 이름과 사는 곳, 단원별 진행, 별, 스티커, 수료증을 받은 날). 학습 포탈에 로그인한 브라우저에서는 다른 Lehrwerk 앱처럼 `sync.js` 가 서버에 함께 저장합니다. 단원을 더하거나 고칠 때 이 키의 짜임을 바꾸지 않습니다. 녹음한 목소리는 저장하지 않고 화면을 떠나면 없어집니다.
