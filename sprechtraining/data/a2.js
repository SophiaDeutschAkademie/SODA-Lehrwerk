/* SODA SPRECHTRAINING · A2 대화문 */
window.DIALOG_DATA = window.DIALOG_DATA || {};
window.DIALOG_DATA.A2 = [
  {
    no: 1, lv: "A2",
    title: "Beim Arzt", titleKo: "병원 예약", type: "Telefon", typeKo: "전화",
    intro: "전화로 진료 예약을 잡는 대화예요.",
    focus: ["진료 예약", "증상 말하기", "weil · leider"],
    roles: { A: "Sprechstundenhilfe", B: "Patientin" },
    turns: [
      { r: "A", de: "Praxis Dr. Weber, guten Tag. Was kann ich für Sie tun?", ko: "베버 의원입니다. 안녕하세요, 무엇을 도와드릴까요?" },
      { r: "B", de: "Guten Tag. Ich bräuchte dringend einen Termin. Ich habe seit drei Tagen Husten und Fieber.", ko: "안녕하세요. 급하게 예약을 잡고 싶어요. 3일 전부터 기침이 나고 열이 나요." },
      { r: "A", de: "Oh, das klingt nicht gut. Heute um 15 Uhr hätte ich noch einen Termin frei.", ko: "아, 많이 안 좋으시네요. 오늘 오후 3시에 아직 자리가 하나 있어요." },
      { r: "B", de: "15 Uhr passt mir leider nicht, weil ich bis 17 Uhr arbeiten muss. Haben Sie morgen früh noch einen Termin frei?", ko: "3시는 아쉽게도 안 돼요. 5시까지 일해야 하거든요. 내일 아침에 비는 시간이 있을까요?" },
      { r: "A", de: "Morgen um 8:30 Uhr ist noch ein Termin frei. Wie heißen Sie bitte?", ko: "내일 8시 30분이 비어 있어요. 성함이 어떻게 되세요?" },
      { r: "B", de: "Mein Name ist Jiyoung Kim. Muss ich etwas mitbringen?", ko: "김지영이에요. 가져가야 할 게 있나요?" },
      { r: "A", de: "Bitte bringen Sie Ihre Versichertenkarte mit. Wenn es schlimmer wird, rufen Sie bitte sofort wieder an.", ko: "건강보험 카드를 가져오세요. 더 나빠지면 바로 다시 전화해 주세요." },
      { r: "B", de: "Mache ich. Vielen Dank und auf Wiederhören.", ko: "그렇게 할게요. 감사합니다. 안녕히 계세요." },
      { r: "A", de: "Gute Besserung!", ko: "빨리 나으세요!" }
    ],
    redemittel: [
      { group: "예약 요청", items: [
        { de: "Ich bräuchte einen Termin.", ko: "예약을 잡고 싶어요." },
        { de: "Haben Sie morgen früh noch einen Termin frei?", ko: "내일 아침에 비는 시간이 있나요?" },
        { de: "Das passt mir leider nicht.", ko: "그 시간은 아쉽게도 안 돼요." }
      ] },
      { group: "증상 말하기", items: [
        { de: "Ich habe seit drei Tagen Husten und Fieber.", ko: "3일 전부터 기침과 열이 나요." }
      ] },
      { group: "확인", items: [
        { de: "Wie heißen Sie bitte?", ko: "성함이 어떻게 되세요?" },
        { de: "Muss ich etwas mitbringen?", ko: "가져가야 할 게 있나요?" }
      ] },
      { group: "마무리", items: [
        { de: "Auf Wiederhören.", ko: "(전화) 안녕히 계세요." },
        { de: "Gute Besserung!", ko: "빨리 나으세요!" }
      ] }
    ]
  },

  {
    no: 2, lv: "A2",
    title: "Die Wohnungsbesichtigung", titleKo: "집 보러 가기", type: "Wohnen", typeKo: "주거",
    intro: "집주인에게 집과 비용을 묻고 계약 의사를 밝히는 대화예요.",
    focus: ["월세 · 관리비", "묻고 확인하기", "würde · könnte"],
    roles: { A: "Vermieterin", B: "Interessent" },
    turns: [
      { r: "A", de: "Guten Tag, Herr Lee. Kommen Sie bitte herein. Die Wohnung hat zwei Zimmer und ist 58 Quadratmeter groß.", ko: "안녕하세요, 이 선생님. 들어오세요. 방 두 개에 58제곱미터예요." },
      { r: "B", de: "Guten Tag, Frau Schulz. Die Wohnung ist schön hell. Gibt es auch einen Balkon?", ko: "안녕하세요, 슐츠 씨. 집이 참 밝네요. 발코니도 있나요?" },
      { r: "A", de: "Ja, einen kleinen Balkon nach Süden. Eine Einbauküche gibt es leider nicht.", ko: "네, 남향으로 작은 발코니가 있어요. 아쉽게도 주방 설비는 없어요." },
      { r: "B", de: "Schade, dann muss ich eine Küche kaufen. Wie hoch ist die Miete?", ko: "아쉽네요. 그럼 주방 설비를 사야겠네요. 월세는 얼마예요?" },
      { r: "A", de: "Die Kaltmiete beträgt 720 Euro. Dazu kommen etwa 150 Euro Nebenkosten.", ko: "관리비를 뺀 기본 월세는 720유로예요. 여기에 관리비가 150유로쯤 더 붙어요." },
      { r: "B", de: "Sind Heizung und Wasser in den Nebenkosten enthalten?", ko: "관리비에 난방비와 수도 요금도 포함돼 있나요?" },
      { r: "A", de: "Ja, beides ist enthalten. Den Strom bezahlen Sie selbst.", ko: "네, 둘 다 포함돼 있어요. 전기 요금은 따로 내셔야 해요." },
      { r: "B", de: "Und wie hoch ist die Kaution?", ko: "그리고 보증금은 얼마예요?" },
      { r: "A", de: "Die Kaution beträgt zwei Monatsmieten.", ko: "보증금은 월세 두 달 치예요." },
      { r: "B", de: "Wann könnte ich einziehen?", ko: "언제 입주할 수 있을까요?" },
      { r: "A", de: "Ab dem ersten November ist die Wohnung frei.", ko: "집은 11월 1일부터 비어요." },
      { r: "B", de: "Das passt gut. Ich würde die Wohnung gern nehmen. Was muss ich tun?", ko: "딱 좋네요. 이 집으로 하고 싶어요. 뭘 하면 될까요?" },
      { r: "A", de: "Bitte schicken Sie mir eine Kopie Ihres Arbeitsvertrags und Ihres Passes. Ich melde mich bis Freitag bei Ihnen.", ko: "근로계약서와 여권 사본을 보내 주세요. 금요일까지 연락드릴게요." },
      { r: "B", de: "Gut, ich schicke Ihnen heute Abend alles. Vielen Dank für die Besichtigung!", ko: "알겠습니다. 오늘 저녁에 모두 보내 드릴게요. 집을 보여 주셔서 감사합니다!" }
    ],
    redemittel: [
      { group: "집 묻기", items: [
        { de: "Gibt es auch einen Balkon?", ko: "발코니도 있나요?" },
        { de: "Wie hoch ist die Miete?", ko: "월세는 얼마예요?" }
      ] },
      { group: "비용 확인", items: [
        { de: "Die Kaltmiete beträgt … Euro.", ko: "기본 월세는 …유로예요." },
        { de: "Dazu kommen … Euro Nebenkosten.", ko: "여기에 관리비가 …유로 더 붙어요." },
        { de: "Sind Heizung und Wasser enthalten?", ko: "난방비와 수도 요금도 포함돼 있나요?" },
        { de: "Wie hoch ist die Kaution?", ko: "보증금은 얼마예요?" }
      ] },
      { group: "일정", items: [
        { de: "Wann könnte ich einziehen?", ko: "언제 입주할 수 있을까요?" },
        { de: "Ab dem ersten November ist die Wohnung frei.", ko: "집은 11월 1일부터 비어요." }
      ] },
      { group: "결정", items: [
        { de: "Ich würde die Wohnung gern nehmen.", ko: "이 집으로 하고 싶어요." },
        { de: "Was muss ich tun?", ko: "뭘 하면 될까요?" }
      ] }
    ]
  },

  {
    no: 3, lv: "A2",
    title: "Die Jacke umtauschen", titleKo: "옷 교환하기", type: "Einkauf", typeKo: "쇼핑",
    intro: "산 옷이 맞지 않아 매장에서 교환하는 대화예요.",
    focus: ["Perfekt", "교환 요청", "비교급: besser · bequemer"],
    roles: { A: "Kundin", B: "Verkäufer" },
    turns: [
      { r: "A", de: "Guten Tag. Ich habe diese Jacke letzte Woche gekauft, aber sie ist leider zu klein. Kann ich sie umtauschen?", ko: "안녕하세요. 지난주에 이 재킷을 샀는데 아쉽게도 너무 작아요. 교환할 수 있을까요?" },
      { r: "B", de: "Guten Tag. Haben Sie den Kassenbon dabei?", ko: "안녕하세요. 영수증 가지고 계신가요?" },
      { r: "A", de: "Ja, hier ist er. Ich habe die Jacke am Dienstag gekauft.", ko: "네, 여기 있어요. 화요일에 샀어요." },
      { r: "B", de: "Kein Problem. Bei uns können Sie innerhalb von 14 Tagen umtauschen.", ko: "괜찮아요. 저희 매장은 14일 안에 교환하실 수 있어요." },
      { r: "A", de: "Haben Sie die Jacke auch in Größe M?", ko: "이 재킷, M 사이즈도 있나요?" },
      { r: "B", de: "Moment, ich schaue nach. In Größe M haben wir sie nur in Schwarz, in Blau leider nicht mehr.", ko: "잠시만요, 확인해 볼게요. M 사이즈는 검은색만 있고 파란색은 아쉽게도 다 나갔어요." },
      { r: "A", de: "Schwarz finde ich auch schön. Kann ich sie anprobieren?", ko: "검은색도 예쁘네요. 입어 봐도 될까요?" },
      { r: "B", de: "Natürlich. Die Umkleidekabinen sind dort hinten links.", ko: "물론이죠. 탈의실은 저 뒤쪽 왼편에 있어요." },
      { r: "A", de: "Die Größe M passt viel besser! Sie ist auch bequemer.", ko: "M 사이즈가 훨씬 잘 맞아요! 입기도 더 편해요." },
      { r: "B", de: "Das freut mich. Dann tausche ich sie um. Der Preis ist gleich, Sie müssen nichts nachzahlen.", ko: "잘됐네요. 그럼 교환해 드릴게요. 가격이 같아서 더 내실 돈은 없어요." },
      { r: "A", de: "Dann nehme ich sie. Vielen Dank für Ihre Hilfe!", ko: "그럼 이걸로 할게요. 도와주셔서 감사합니다!" },
      { r: "B", de: "Gern geschehen. Hier ist Ihre Jacke. Einen schönen Tag noch!", ko: "천만에요. 여기 재킷이에요. 좋은 하루 보내세요!" }
    ],
    redemittel: [
      { group: "문제 설명", items: [
        { de: "Ich habe … gekauft, aber sie ist zu klein.", ko: "…을 샀는데 너무 작아요." },
        { de: "Kann ich sie umtauschen?", ko: "교환할 수 있을까요?" }
      ] },
      { group: "확인", items: [
        { de: "Haben Sie den Kassenbon dabei?", ko: "영수증 가지고 계신가요?" },
        { de: "Bei uns können Sie innerhalb von 14 Tagen umtauschen.", ko: "저희 매장은 14일 안에 교환하실 수 있어요." }
      ] },
      { group: "사이즈 · 색", items: [
        { de: "Haben Sie die Jacke auch in Größe M?", ko: "이 재킷, M 사이즈도 있나요?" },
        { de: "Kann ich sie anprobieren?", ko: "입어 봐도 될까요?" }
      ] },
      { group: "비교", items: [
        { de: "Die Größe M passt viel besser!", ko: "M 사이즈가 훨씬 잘 맞아요!" },
        { de: "Sie ist auch bequemer.", ko: "입기도 더 편해요." }
      ] },
      { group: "결정", items: [
        { de: "Dann nehme ich sie.", ko: "그럼 이걸로 할게요." }
      ] }
    ]
  },

  {
    no: 4, lv: "A2",
    title: "Wie war dein Wochenende?", titleKo: "주말 이야기하기", type: "Alltag", typeKo: "일상",
    intro: "월요일 아침에 서로 말을 놓는 친한 직장 동료와 주말에 한 일을 이야기하는 대화예요.",
    focus: ["Perfekt (haben · sein)", "과거 이야기", "시간 표현"],
    roles: { A: "Tom", B: "Nina" },
    turns: [
      { r: "A", de: "Hallo Nina! Wie war dein Wochenende?", ko: "안녕, 니나! 주말 어땠어?" },
      { r: "B", de: "Hallo Tom! Es war sehr schön. Wir sind am Samstag an den See gefahren.", ko: "안녕, 톰! 아주 좋았어. 토요일에 호숫가에 다녀왔어." },
      { r: "A", de: "Toll! Wart ihr schwimmen?", ko: "좋았겠다! 수영도 했어?" },
      { r: "B", de: "Ja, aber das Wasser war noch kalt. Wir sind nur kurz geschwommen und haben dann ein Picknick gemacht.", ko: "응, 근데 물이 아직 차가웠어. 잠깐만 수영하고 피크닉을 했어." },
      { r: "A", de: "Das klingt super. Wie war das Wetter?", ko: "재밌었겠다. 날씨는 어땠어?" },
      { r: "B", de: "Am Samstag war es sonnig, aber am Sonntag hat es den ganzen Tag geregnet. Da sind wir zu Hause geblieben.", ko: "토요일은 화창했는데, 일요일에는 하루 종일 비가 왔어. 그래서 집에 있었어." },
      { r: "A", de: "Was habt ihr am Sonntag gemacht?", ko: "일요일에는 뭘 했어?" },
      { r: "B", de: "Ich habe ein Buch gelesen, und mein Mann hat gekocht. Am Abend haben wir einen Film gesehen. Und du? Was hast du gemacht?", ko: "나는 책을 읽었고 남편은 요리를 했어. 저녁에는 영화를 봤어. 너는? 뭐 했어?" },
      { r: "A", de: "Ich war am Samstag auf dem Flohmarkt und habe ein altes Fahrrad gekauft. Am Sonntag habe ich es repariert.", ko: "나는 토요일에 벼룩시장에 가서 오래된 자전거를 샀어. 일요일에는 그걸 고쳤고." },
      { r: "B", de: "Wirklich? Hast du das allein gemacht?", ko: "정말? 혼자 했어?" },
      { r: "A", de: "Nicht ganz. Mein Nachbar hat mir ein bisschen geholfen. Heute bin ich damit zur Arbeit gefahren.", ko: "혼자는 아니고, 옆집 사람이 좀 도와줬어. 오늘 그거 타고 출근했어." },
      { r: "B", de: "Das ist ja toll! Dann machen wir bald mal zusammen eine Radtour.", ko: "대단하다! 그럼 조만간 같이 자전거 타러 가자." }
    ],
    redemittel: [
      { group: "묻기", items: [
        { de: "Wie war dein Wochenende?", ko: "주말 어땠어?" },
        { de: "Und du? Was hast du gemacht?", ko: "너는? 뭐 했어?" }
      ] },
      { group: "한 일 말하기", items: [
        { de: "Wir sind am Samstag an den See gefahren.", ko: "토요일에 호숫가에 다녀왔어." },
        { de: "Ich habe ein Buch gelesen.", ko: "나는 책을 읽었어." }
      ] },
      { group: "대조", items: [
        { de: "Am Samstag war es sonnig, aber am Sonntag hat es geregnet.", ko: "토요일은 화창했는데 일요일에는 비가 왔어." }
      ] },
      { group: "반응", items: [
        { de: "Das klingt super.", ko: "재밌었겠다." },
        { de: "Wirklich? Hast du das allein gemacht?", ko: "정말? 혼자 했어?" }
      ] }
    ]
  },

  {
    no: 5, lv: "A2",
    title: "Der Zug hat Verspätung", titleKo: "기차가 연착될 때", type: "Reise", typeKo: "여행",
    intro: "연착 때문에 환승이 어려워진 상황에서 창구 직원에게 문의하는 대화예요.",
    focus: ["연착 문의", "umsteigen", "Fahrgastrechte"],
    roles: { A: "Reisende", B: "Bahnmitarbeiter" },
    turns: [
      { r: "A", de: "Entschuldigung, ich habe eine Frage. Mein Zug nach Hamburg hat Verspätung. Wie lange muss ich warten?", ko: "실례합니다, 뭐 좀 여쭤볼게요. 제가 탈 함부르크행 기차가 연착됐어요. 얼마나 기다려야 하나요?" },
      { r: "B", de: "Der ICE nach Hamburg hat etwa 40 Minuten Verspätung. Es gab eine Signalstörung.", ko: "함부르크행 ICE는 40분쯤 늦어요. 신호 장애가 있었거든요." },
      { r: "A", de: "Oh nein. Ich muss in Hamburg noch in einen Regionalzug umsteigen. Schaffe ich den Anschluss noch?", ko: "아, 이런. 함부르크에서 지역 열차로 갈아타야 하거든요. 환승 열차를 탈 수 있을까요?" },
      { r: "B", de: "Leider nicht. Ihr Anschlusszug fährt um 14:10 Uhr ab, aber der ICE kommt jetzt erst um 14:25 Uhr an.", ko: "아쉽지만 어렵겠어요. 환승 열차는 14시 10분에 출발하는데, ICE는 지금으로서는 14시 25분에야 도착해요." },
      { r: "A", de: "Und was kann ich jetzt machen?", ko: "그럼 이제 어떻게 하면 될까요?" },
      { r: "B", de: "Sie können den nächsten Regionalzug nehmen. Er fährt um 15:10 Uhr ab. Ihre Fahrkarte gilt auch für diesen Zug.", ko: "다음 지역 열차를 타시면 돼요. 15시 10분에 출발해요. 가지고 계신 승차권으로 그 열차도 타실 수 있어요." },
      { r: "A", de: "Von welchem Gleis fährt er ab?", ko: "어느 승강장에서 출발하나요?" },
      { r: "B", de: "Laut Fahrplan fährt er von Gleis 7 ab. Schauen Sie aber bitte vorher noch einmal auf die Anzeigetafel oder in die App.", ko: "시간표상으로는 7번 승강장이에요. 그래도 타기 전에 전광판이나 앱을 한 번 더 확인해 주세요." },
      { r: "A", de: "Kann ich eine Entschädigung bekommen?", ko: "보상을 받을 수 있나요?" },
      { r: "B", de: "Ja, ab 60 Minuten Verspätung am Ziel bekommen Sie einen Teil des Fahrpreises zurück. Dafür müssen Sie ein Formular ausfüllen.", ko: "네, 목적지에 60분 이상 늦게 도착하면 요금 일부를 돌려받으실 수 있어요. 그러려면 신청서를 작성하셔야 해요." },
      { r: "A", de: "Wo bekomme ich das Formular?", ko: "신청서는 어디서 받나요?" },
      { r: "B", de: "Bei uns am Schalter oder online. Ich gebe Ihnen eines mit.", ko: "여기 창구나 온라인에서 받으실 수 있어요. 지금 하나 드릴게요." },
      { r: "A", de: "Vielen Dank für Ihre Hilfe.", ko: "도와주셔서 감사합니다." },
      { r: "B", de: "Gern. Gute Reise!", ko: "천만에요. 즐거운 여행 되세요!" }
    ],
    redemittel: [
      { group: "문의", items: [
        { de: "Mein Zug hat Verspätung.", ko: "제가 탈 기차가 연착됐어요." },
        { de: "Wie lange muss ich warten?", ko: "얼마나 기다려야 하나요?" }
      ] },
      { group: "환승", items: [
        { de: "Ich muss in Hamburg umsteigen.", ko: "함부르크에서 갈아타야 해요." },
        { de: "Schaffe ich den Anschluss noch?", ko: "환승 열차를 탈 수 있을까요?" }
      ] },
      { group: "대안", items: [
        { de: "Was kann ich jetzt machen?", ko: "이제 어떻게 하면 될까요?" },
        { de: "Von welchem Gleis fährt er ab?", ko: "어느 승강장에서 출발하나요?" }
      ] },
      { group: "보상", items: [
        { de: "Kann ich eine Entschädigung bekommen?", ko: "보상을 받을 수 있나요?" },
        { de: "Wo bekomme ich das Formular?", ko: "신청서는 어디서 받나요?" }
      ] },
      { group: "마무리", items: [
        { de: "Gute Reise!", ko: "즐거운 여행 되세요!" }
      ] }
    ]
  },

  {
    no: 6, lv: "A2",
    title: "Eine Einladung zum Geburtstag", titleKo: "생일 초대", type: "Telefon", typeKo: "전화",
    intro: "친구에게 생일 파티 초대를 받고 가져갈 음식, 동행, 도착 시간을 정하는 대화예요.",
    focus: ["초대 · 수락", "무엇을 가져갈까요", "sollen · können"],
    roles: { A: "Sara", B: "Felix" },
    turns: [
      { r: "A", de: "Hallo Felix, hier ist Sara. Hast du kurz Zeit?", ko: "안녕, 펠릭스. 나 사라야. 잠깐 시간 돼?" },
      { r: "B", de: "Hallo Sara! Ja, klar. Was gibt's?", ko: "안녕, 사라! 그럼. 무슨 일이야?" },
      { r: "A", de: "Ich werde nächsten Samstag 30 und möchte mit ein paar Freunden feiern. Hast du Lust zu kommen?", ko: "나 다음 토요일에 서른 살이 되거든. 친구 몇 명이랑 파티하고 싶은데, 올래?" },
      { r: "B", de: "Oh, wie schön! Danke für die Einladung. Ich komme gern. Wann und wo feierst du?", ko: "와, 좋다! 초대해 줘서 고마워. 꼭 갈게. 언제, 어디서 해?" },
      { r: "A", de: "Ab 18 Uhr bei mir zu Hause. Wir grillen im Garten.", ko: "저녁 6시부터 우리 집에서. 마당에서 바비큐 할 거야." },
      { r: "B", de: "Super! Soll ich etwas mitbringen?", ko: "좋아! 뭘 가져갈까?" },
      { r: "A", de: "Das ist lieb von dir. Vielleicht einen Salat oder etwas zu trinken.", ko: "고마워. 샐러드나 마실 거 가져오면 좋겠어." },
      { r: "B", de: "Ich bringe einen Nudelsalat mit. Kann ich auch meine Schwester mitbringen? Sie ist gerade bei mir zu Besuch.", ko: "파스타 샐러드 가져갈게. 내 여동생도 데려가도 돼? 지금 우리 집에 놀러 와 있거든." },
      { r: "A", de: "Natürlich, sie ist herzlich willkommen!", ko: "당연하지, 대환영이야!" },
      { r: "B", de: "Ach, noch etwas: Ich muss am Samstagnachmittag noch arbeiten. Ich komme vielleicht etwas später, so gegen 19 Uhr. Ist das okay?", ko: "아, 그리고 나 토요일 오후에 일해야 해. 그래서 조금 늦게, 7시쯤 갈 수도 있는데 괜찮아?" },
      { r: "A", de: "Kein Problem. Hauptsache, du kommst!", ko: "괜찮아. 와 주기만 하면 돼!" },
      { r: "B", de: "Ich freue mich schon. Bis Samstag!", ko: "벌써 기대된다. 토요일에 봐!" }
    ],
    redemittel: [
      { group: "초대", items: [
        { de: "Hast du Lust zu kommen?", ko: "올래?" },
        { de: "Ab 18 Uhr bei mir zu Hause.", ko: "저녁 6시부터 우리 집에서." }
      ] },
      { group: "수락", items: [
        { de: "Danke für die Einladung. Ich komme gern.", ko: "초대해 줘서 고마워. 꼭 갈게." }
      ] },
      { group: "준비물 · 동반", items: [
        { de: "Soll ich etwas mitbringen?", ko: "뭘 가져갈까?" },
        { de: "Kann ich auch meine Schwester mitbringen?", ko: "내 여동생도 데려가도 돼?" }
      ] },
      { group: "시간 조정", items: [
        { de: "Ich komme vielleicht etwas später.", ko: "조금 늦게 갈 수도 있어." },
        { de: "Kein Problem. Hauptsache, du kommst!", ko: "괜찮아. 와 주기만 하면 돼!" }
      ] },
      { group: "마무리", items: [
        { de: "Ich freue mich schon.", ko: "벌써 기대된다." }
      ] }
    ]
  }
];
