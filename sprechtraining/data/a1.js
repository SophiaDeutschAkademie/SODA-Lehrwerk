/* SODA SPRECHTRAINING · A1 대화문 */
window.DIALOG_DATA = window.DIALOG_DATA || {};
window.DIALOG_DATA.A1 = [
  {
    no: 1, lv: "A1",
    title: "Beim Bäcker", titleKo: "빵집에서", type: "Einkauf", typeKo: "쇼핑",
    intro: "빵을 고르고 계산하는 짧은 대화예요.",
    focus: ["주문하기", "가격 묻기", "계산하기"],
    roles: { A: "Verkäuferin", B: "Kunde" },
    turns: [
      { r: "A", de: "Guten Morgen! Was darf es sein?", ko: "안녕하세요! 뭘 드릴까요?" },
      { r: "B", de: "Guten Morgen. Ich möchte zwei Brötchen, bitte.", ko: "안녕하세요. 브뢰트헨 두 개 주세요." },
      { r: "A", de: "Gerne. Sonst noch etwas?", ko: "네. 더 필요하신 건 없으세요?" },
      { r: "B", de: "Ja, noch ein Stück Kuchen, bitte. Wie viel kostet das?", ko: "네, 케이크도 한 조각 주세요. 그건 얼마예요?" },
      { r: "A", de: "Der Kuchen kostet zwei Euro fünfzig. Das macht zusammen drei Euro fünfzig.", ko: "케이크는 2유로 50센트예요. 전부 해서 3유로 50센트입니다." },
      { r: "B", de: "Kann ich mit Karte bezahlen?", ko: "카드로 계산해도 돼요?" },
      { r: "A", de: "Ja, natürlich. Bitte halten Sie die Karte hier an das Gerät.", ko: "네, 그럼요. 카드를 여기 단말기에 대 주세요." },
      { r: "B", de: "So, fertig. Danke!", ko: "자, 됐네요. 감사합니다!" },
      { r: "A", de: "Danke und einen schönen Tag noch!", ko: "감사합니다. 좋은 하루 보내세요!" },
      { r: "B", de: "Danke, Ihnen auch!", ko: "고마워요. 좋은 하루 보내세요!" }
    ],
    redemittel: [
      { group: "주문", items: [
        { de: "Was darf es sein?", ko: "뭘 드릴까요?" },
        { de: "Ich möchte …, bitte.", ko: "…(을)를 주세요." },
        { de: "Sonst noch etwas?", ko: "더 필요하신 건 없으세요?" }
      ] },
      { group: "가격", items: [
        { de: "Wie viel kostet das?", ko: "그건 얼마예요?" },
        { de: "Das macht zusammen …", ko: "전부 해서 …입니다." }
      ] },
      { group: "계산", items: [
        { de: "Kann ich mit Karte bezahlen?", ko: "카드로 계산해도 돼요?" }
      ] },
      { group: "인사", items: [
        { de: "Einen schönen Tag noch!", ko: "좋은 하루 보내세요!" },
        { de: "Danke, Ihnen auch!", ko: "고마워요. 좋은 하루 보내세요!" }
      ] }
    ]
  },

  {
    no: 2, lv: "A1",
    title: "Kennenlernen im Deutschkurs", titleKo: "독일어 수업에서 인사하기", type: "Vorstellung", typeKo: "자기소개",
    intro: "새로운 사람에게 이름, 출신, 직업, 언어를 말하는 대화예요.",
    focus: ["자기소개", "W-Fragen", "sein · wohnen · sprechen"],
    roles: { A: "Lena", B: "Min-jun" },
    turns: [
      { r: "A", de: "Hallo! Ich bin Lena. Wie heißt du?", ko: "안녕! 나는 레나야. 너는 이름이 뭐야?" },
      { r: "B", de: "Hallo, Lena! Ich heiße Min-jun. Ich komme aus Korea. Woher kommst du?", ko: "안녕, 레나! 나는 민준이야. 한국에서 왔어. 너는 어디에서 왔어?" },
      { r: "A", de: "Ich komme aus Polen, aus Warschau. Wo wohnst du jetzt?", ko: "나는 폴란드 바르샤바에서 왔어. 너는 지금 어디에 살아?" },
      { r: "B", de: "Ich wohne in Berlin, in Kreuzberg. Und du?", ko: "나는 베를린 크로이츠베르크에 살아. 너는?" },
      { r: "A", de: "Ich wohne auch in Berlin, in Neukölln. Was bist du von Beruf?", ko: "나도 베를린에 살아. 노이쾰른에. 너는 직업이 뭐야?" },
      { r: "B", de: "Ich bin Ingenieur und arbeite bei einer Firma in Berlin. Und du?", ko: "나는 엔지니어이고 베를린에 있는 회사에서 일해. 너는?" },
      { r: "A", de: "Ich bin Studentin. Ich studiere Biologie.", ko: "나는 대학생이야. 생물학을 전공해." },
      { r: "B", de: "Welche Sprachen sprichst du?", ko: "너는 무슨 언어를 할 줄 알아?" },
      { r: "A", de: "Ich spreche Polnisch, Englisch und ein bisschen Deutsch. Und du?", ko: "나는 폴란드어랑 영어를 하고, 독일어도 조금 해. 너는?" },
      { r: "B", de: "Ich spreche Koreanisch und ein bisschen Englisch. Und jetzt lerne ich Deutsch.", ko: "나는 한국어를 하고 영어도 조금 해. 그리고 지금은 독일어를 배우고 있어." },
      { r: "A", de: "Schön, dich kennenzulernen, Min-jun!", ko: "만나서 반가워, 민준!" },
      { r: "B", de: "Freut mich auch! Bis morgen im Kurs!", ko: "나도 반가워! 내일 수업에서 봐!" }
    ],
    redemittel: [
      { group: "이름 · 출신", items: [
        { de: "Ich bin … / Ich heiße …", ko: "나는 …(이)야. / 내 이름은 …(이)야." },
        { de: "Woher kommst du?", ko: "너는 어디에서 왔어?" },
        { de: "Ich komme aus …", ko: "나는 …에서 왔어." }
      ] },
      { group: "사는 곳", items: [
        { de: "Wo wohnst du jetzt?", ko: "너는 지금 어디에 살아?" },
        { de: "Ich wohne in …", ko: "나는 …에 살아." }
      ] },
      { group: "직업", items: [
        { de: "Was bist du von Beruf?", ko: "너는 직업이 뭐야?" },
        { de: "Ich bin Ingenieur.", ko: "나는 엔지니어야." },
        { de: "Ich arbeite bei einer Firma.", ko: "나는 회사에서 일해." }
      ] },
      { group: "언어", items: [
        { de: "Welche Sprachen sprichst du?", ko: "너는 무슨 언어를 할 줄 알아?" },
        { de: "Ich spreche … und ein bisschen …", ko: "나는 …(을)를 하고, …도 조금 해." }
      ] },
      { group: "인사", items: [
        { de: "Schön, dich kennenzulernen!", ko: "만나서 반가워!" },
        { de: "Freut mich auch!", ko: "나도 반가워!" },
        { de: "Bis morgen!", ko: "내일 봐!" }
      ] }
    ]
  },

  {
    no: 3, lv: "A1",
    title: "Nach dem Weg fragen", titleKo: "길 묻기", type: "Orientierung", typeKo: "길 찾기",
    intro: "기차역 가는 길을 묻고 방향을 알아듣는 대화예요.",
    focus: ["길 묻기", "방향 말하기", "gibt es …?"],
    roles: { A: "Tourist", B: "Passantin" },
    turns: [
      { r: "A", de: "Entschuldigung, wo ist der Bahnhof, bitte?", ko: "실례합니다. 기차역이 어디예요?" },
      { r: "B", de: "Der Bahnhof? Gehen Sie hier geradeaus bis zur Ampel.", ko: "기차역이요? 여기서 신호등까지 쭉 가세요." },
      { r: "A", de: "Geradeaus bis zur Ampel. Und dann?", ko: "신호등까지 쭉 가고요. 그다음은요?" },
      { r: "B", de: "Dann gehen Sie nach links. Die Straße heißt Bahnhofstraße.", ko: "그다음에 왼쪽으로 가세요. 그 길 이름이 Bahnhofstraße예요." },
      { r: "A", de: "Nach links, Bahnhofstraße. Ist das weit?", ko: "왼쪽으로, Bahnhofstraße요. 먼가요?" },
      { r: "B", de: "Nein, nicht weit. Zu Fuß sind es zehn Minuten.", ko: "아니요, 멀지 않아요. 걸어서 10분이에요." },
      { r: "A", de: "Super. Gibt es dort auch einen Geldautomaten?", ko: "잘됐네요. 거기에 현금인출기도 있어요?" },
      { r: "B", de: "Ja, direkt im Bahnhof gibt es einen.", ko: "네, 기차역 안에 하나 있어요." },
      { r: "A", de: "Vielen Dank! Das ist sehr nett.", ko: "정말 감사합니다! 친절하시네요." },
      { r: "B", de: "Bitte, gern geschehen. Schönen Tag noch!", ko: "천만에요. 좋은 하루 보내세요!" }
    ],
    redemittel: [
      { group: "길 묻기", items: [
        { de: "Entschuldigung, wo ist …, bitte?", ko: "실례합니다. …(이)가 어디예요?" },
        { de: "Ist das weit?", ko: "먼가요?" }
      ] },
      { group: "방향", items: [
        { de: "Gehen Sie geradeaus bis zur Ampel.", ko: "신호등까지 쭉 가세요." },
        { de: "Dann gehen Sie nach links.", ko: "그다음에 왼쪽으로 가세요." }
      ] },
      { group: "거리 · 시간", items: [
        { de: "Zu Fuß sind es zehn Minuten.", ko: "걸어서 10분이에요." }
      ] },
      { group: "장소 묻기", items: [
        { de: "Gibt es dort auch einen Geldautomaten?", ko: "거기에 현금인출기도 있어요?" }
      ] },
      { group: "감사 · 인사", items: [
        { de: "Bitte, gern geschehen.", ko: "천만에요." }
      ] }
    ]
  },

  {
    no: 4, lv: "A1",
    title: "Im Restaurant", titleKo: "식당에서", type: "Gastronomie", typeKo: "식당",
    intro: "자리를 안내받고, 음식을 주문하고, 계산하는 대화예요.",
    focus: ["음식 주문", "ich nehme + 4격", "계산서 요청"],
    roles: { A: "Kellner", B: "Gast" },
    turns: [
      { r: "A", de: "Guten Abend! Haben Sie reserviert?", ko: "안녕하세요! 예약하셨어요?" },
      { r: "B", de: "Ja, auf den Namen Park, für zwei Personen.", ko: "네, 박 이름으로 두 명이요." },
      { r: "A", de: "Bitte sehr, hier ist Ihr Tisch. Was möchten Sie trinken?", ko: "이쪽이에요. 여기가 손님 자리입니다. 음료는 뭘로 하시겠어요?" },
      { r: "B", de: "Ich möchte ein Wasser, bitte. Meine Freundin nimmt einen Apfelsaft.", ko: "저는 물 한 잔 주세요. 제 친구는 사과 주스로 할게요." },
      { r: "A", de: "Gerne. Und was möchten Sie essen?", ko: "알겠습니다. 식사는 뭘로 하시겠어요?" },
      { r: "B", de: "Ich nehme die Gemüsesuppe und das Schnitzel. Meine Freundin nimmt auch das Schnitzel.", ko: "저는 채소 수프하고 슈니첼로 할게요. 친구도 슈니첼로 할게요." },
      { r: "A", de: "So, bitte sehr. Guten Appetit!", ko: "자, 나왔습니다. 맛있게 드세요!" },
      { r: "B", de: "Danke. Entschuldigung, die Rechnung, bitte.", ko: "감사합니다. 저기요, 계산서 주세요." },
      { r: "A", de: "Zusammen oder getrennt?", ko: "같이 계산해 드릴까요, 따로 해 드릴까요?" },
      { r: "B", de: "Zusammen, bitte.", ko: "같이 해 주세요." },
      { r: "A", de: "Das macht sechsundvierzig Euro.", ko: "46유로입니다." },
      { r: "B", de: "Hier sind fünfzig Euro. Stimmt so.", ko: "여기 50유로요. 잔돈은 괜찮아요." },
      { r: "A", de: "Vielen Dank! Auf Wiedersehen!", ko: "감사합니다! 안녕히 가세요!" }
    ],
    redemittel: [
      { group: "예약 · 자리", items: [
        { de: "Haben Sie reserviert?", ko: "예약하셨어요?" },
        { de: "Ja, auf den Namen …, für zwei Personen.", ko: "네, … 이름으로 두 명이요." }
      ] },
      { group: "주문", items: [
        { de: "Was möchten Sie trinken?", ko: "음료는 뭘로 하시겠어요?" },
        { de: "Ich möchte …, bitte.", ko: "…(을)를 주세요." },
        { de: "Ich nehme die Gemüsesuppe.", ko: "저는 채소 수프로 할게요." }
      ] },
      { group: "식사", items: [
        { de: "Guten Appetit!", ko: "맛있게 드세요!" }
      ] },
      { group: "계산", items: [
        { de: "Die Rechnung, bitte.", ko: "계산서 주세요." },
        { de: "Zusammen oder getrennt?", ko: "같이 계산해 드릴까요, 따로 해 드릴까요?" },
        { de: "Stimmt so.", ko: "잔돈은 괜찮아요." }
      ] }
    ]
  },

  {
    no: 5, lv: "A1",
    title: "Eine Verabredung", titleKo: "약속 잡기", type: "Telefon", typeKo: "전화",
    intro: "전화로 영화를 보러 가자고 하고 시간과 장소를 정하는 대화예요.",
    focus: ["약속 잡기", "시각 말하기", "요일"],
    roles: { A: "Jonas", B: "Mia" },
    turns: [
      { r: "A", de: "Hallo Mia, hier ist Jonas. Hast du am Samstag Zeit?", ko: "안녕, 미아. 나 요나스야. 토요일에 시간 있어?" },
      { r: "B", de: "Hallo Jonas! Am Samstag? Ja, ich habe Zeit. Was möchtest du machen?", ko: "안녕, 요나스! 토요일? 응, 시간 있어. 뭐 하고 싶은데?" },
      { r: "A", de: "Ich möchte ins Kino gehen. Kommst du mit?", ko: "영화 보러 가고 싶어. 같이 갈래?" },
      { r: "B", de: "Gute Idee! Welcher Film läuft denn?", ko: "좋은 생각이야! 무슨 영화 하는데?" },
      { r: "A", de: "Eine Komödie. Der Film beginnt um 20 Uhr.", ko: "코미디야. 영화는 저녁 8시에 시작해." },
      { r: "B", de: "20 Uhr ist gut. Wo treffen wir uns?", ko: "8시 좋아. 어디에서 만날까?" },
      { r: "A", de: "Vor dem Kino, um 19 Uhr 30. Geht das?", ko: "영화관 앞에서 7시 반에. 괜찮아?" },
      { r: "B", de: "Hm, ich arbeite bis 19 Uhr. Ich komme erst um 19 Uhr 45. Ist das okay?", ko: "음, 나 7시까지 일해. 7시 45분은 돼야 도착해. 그래도 괜찮아?" },
      { r: "A", de: "Ja, kein Problem. Dann kaufe ich die Karten.", ko: "응, 문제없어. 그럼 표는 내가 살게." },
      { r: "B", de: "Super, danke! Dann bis Samstag.", ko: "좋아, 고마워! 그럼 토요일에 봐." },
      { r: "A", de: "Bis Samstag! Tschüs!", ko: "토요일에 봐! 안녕!" }
    ],
    redemittel: [
      { group: "제안", items: [
        { de: "Hast du am Samstag Zeit?", ko: "토요일에 시간 있어?" },
        { de: "Kommst du mit?", ko: "같이 갈래?" }
      ] },
      { group: "수락", items: [
        { de: "Gute Idee!", ko: "좋은 생각이야!" },
        { de: "Ja, ich habe Zeit.", ko: "응, 시간 있어." }
      ] },
      { group: "시간 · 장소", items: [
        { de: "Der Film beginnt um 20 Uhr.", ko: "영화는 저녁 8시에 시작해." },
        { de: "Wo treffen wir uns?", ko: "어디에서 만날까?" },
        { de: "Vor dem Kino.", ko: "영화관 앞에서." }
      ] },
      { group: "시간 조정", items: [
        { de: "Ich komme erst um … Uhr. Ist das okay?", ko: "…시는 돼야 도착해. 그래도 괜찮아?" },
        { de: "Ja, kein Problem.", ko: "응, 문제없어." }
      ] },
      { group: "마무리", items: [
        { de: "Bis Samstag!", ko: "토요일에 봐!" }
      ] }
    ]
  },

  {
    no: 6, lv: "A1",
    title: "Eine Fahrkarte kaufen", titleKo: "기차표 사기", type: "Reise", typeKo: "여행",
    intro: "창구에서 왕복표를 사고 할인을 문의하는 대화예요.",
    focus: ["승차권 구입", "시각", "가격"],
    roles: { A: "Reisender", B: "Mitarbeiterin am Schalter" },
    turns: [
      { r: "A", de: "Guten Tag. Ich möchte eine Fahrkarte nach München, bitte.", ko: "안녕하세요. 뮌헨행 승차권 한 장 주세요." },
      { r: "B", de: "Guten Tag. Einfach oder hin und zurück?", ko: "안녕하세요. 편도로 드릴까요, 왕복으로 드릴까요?" },
      { r: "A", de: "Hin und zurück, bitte.", ko: "왕복으로 주세요." },
      { r: "B", de: "Wann möchten Sie fahren?", ko: "언제 출발하실 거예요?" },
      { r: "A", de: "Morgen früh, um acht Uhr.", ko: "내일 아침 8시요." },
      { r: "B", de: "Es gibt einen Zug um 8 Uhr 12. Er kommt um 9 Uhr 20 in München an.", ko: "8시 12분에 기차가 있어요. 뮌헨에는 9시 20분에 도착해요." },
      { r: "A", de: "Gut. Was kostet die Fahrkarte?", ko: "좋아요. 승차권은 얼마예요?" },
      { r: "B", de: "Hin und zurück kostet sie hundertzwanzig Euro.", ko: "왕복은 120유로예요." },
      { r: "A", de: "Ich bin Student. Gibt es eine Ermäßigung?", ko: "제가 대학생인데요. 할인이 있나요?" },
      { r: "B", de: "Für Studenten leider nicht. Aber mit dem Sparpreis kostet die Fahrkarte nur sechzig Euro. Sie können dann nur diesen Zug nehmen.", ko: "학생 할인은 아쉽게도 없어요. 그런데 할인 요금으로 하시면 60유로밖에 안 해요. 대신 이 기차만 타실 수 있어요." },
      { r: "A", de: "Kein Problem. Dann nehme ich den Sparpreis.", ko: "괜찮아요. 그럼 할인 요금으로 할게요." },
      { r: "B", de: "Gern. Hier ist Ihre Fahrkarte. Der Zug fährt von Gleis fünf. Gute Reise!", ko: "네. 여기 승차권이요. 기차는 5번 승강장에서 출발해요. 즐거운 여행 되세요!" },
      { r: "A", de: "Danke schön. Auf Wiedersehen!", ko: "감사합니다. 안녕히 계세요!" }
    ],
    redemittel: [
      { group: "표 사기", items: [
        { de: "Ich möchte eine Fahrkarte nach …, bitte.", ko: "…행 승차권 한 장 주세요." },
        { de: "Einfach oder hin und zurück?", ko: "편도로 드릴까요, 왕복으로 드릴까요?" }
      ] },
      { group: "시간", items: [
        { de: "Wann möchten Sie fahren?", ko: "언제 출발하실 거예요?" },
        { de: "Es gibt einen Zug um … Uhr.", ko: "…시에 기차가 있어요." }
      ] },
      { group: "가격 · 할인", items: [
        { de: "Was kostet die Fahrkarte?", ko: "승차권은 얼마예요?" },
        { de: "Gibt es eine Ermäßigung?", ko: "할인이 있나요?" },
        { de: "Dann nehme ich den Sparpreis.", ko: "그럼 할인 요금으로 할게요." }
      ] },
      { group: "승강장", items: [
        { de: "Der Zug fährt von Gleis fünf.", ko: "기차는 5번 승강장에서 출발해요." }
      ] },
      { group: "마무리", items: [
        { de: "Gute Reise!", ko: "즐거운 여행 되세요!" }
      ] }
    ]
  }
];
