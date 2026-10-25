/* SODA SPRECHTRAINING · B1 대화문 */
window.DIALOG_DATA = window.DIALOG_DATA || {};
window.DIALOG_DATA.B1 = [
  {
    no: 1, lv: "B1",
    title: "Ärger mit dem Nachbarn", titleKo: "이웃과의 소음 문제", type: "Alltag", typeKo: "생활",
    intro: "소음 문제를 정중하게 꺼내고 합의하는 대화예요.",
    focus: ["불만 말하기", "정중한 요청: könnten Sie", "타협하기"],
    roles: { A: "Nachbarin", B: "Nachbar" },
    turns: [
      { r: "A", de: "Entschuldigung, haben Sie einen Moment Zeit? Ich möchte kurz mit Ihnen über den Lärm sprechen.", ko: "실례합니다, 잠깐 시간 괜찮으세요? 소음 문제로 잠깐 얘기하고 싶어서요." },
      { r: "B", de: "Ja, natürlich. Welchen Lärm meinen Sie?", ko: "네, 그럼요. 어떤 소음 말씀이세요?" },
      { r: "A", de: "Nachts gegen eins hört man Musik aus Ihrer Wohnung. Das stört mich sehr, weil ich früh zur Arbeit muss.", ko: "밤 1시쯤 댁에서 음악 소리가 들려요. 저는 아침 일찍 출근해야 해서 많이 불편해요." },
      { r: "B", de: "Oh, das tut mir leid. Ich habe nicht gemerkt, dass man das so laut hört.", ko: "아, 죄송해요. 그렇게 크게 들리는 줄 몰랐어요." },
      { r: "A", de: "Könnten Sie die Musik bitte nach 22 Uhr leiser stellen?", ko: "밤 10시 이후에는 음악 소리를 좀 줄여 주실 수 있을까요?" },
      { r: "B", de: "Ja, das mache ich. Allerdings höre ich manchmal auch Lärm aus Ihrer Wohnung, zum Beispiel wenn Sie sonntags staubsaugen.", ko: "네, 그렇게 할게요. 그런데 저도 가끔 댁에서 나는 소리가 들려요. 예를 들면 일요일에 청소기를 돌리실 때요." },
      { r: "A", de: "Das stimmt, sonntags ist das wirklich nicht ideal. Ich werde künftig nur noch werktags staubsaugen.", ko: "맞아요, 일요일에는 정말 좋지 않죠. 앞으로는 평일에만 청소기를 돌릴게요." },
      { r: "B", de: "Das wäre gut. Falls wieder Probleme auftauchen, könnten wir einfach direkt miteinander sprechen.", ko: "그러면 좋겠어요. 혹시 또 문제가 생기면 그냥 바로 서로 얘기하면 되겠네요." },
      { r: "A", de: "Gute Idee. Dann sind wir uns einig?", ko: "좋은 생각이에요. 그럼 이렇게 하기로 한 거죠?" },
      { r: "B", de: "Ja, abgemacht. Vielen Dank für das offene Gespräch.", ko: "네, 그렇게 해요. 솔직하게 얘기해 주셔서 감사해요." },
      { r: "A", de: "Ich danke Ihnen auch. Schönen Abend noch!", ko: "저도 감사해요. 좋은 저녁 보내세요!" }
    ],
    redemittel: [
      { group: "대화 시작", items: [
        { de: "Haben Sie einen Moment Zeit?", ko: "잠깐 시간 괜찮으세요?" },
        { de: "Ich möchte kurz mit Ihnen über … sprechen.", ko: "…에 대해 잠깐 얘기하고 싶어요." }
      ] },
      { group: "문제 말하기", items: [
        { de: "Das stört mich sehr, weil …", ko: "…해서 많이 불편해요." }
      ] },
      { group: "사과", items: [
        { de: "Das tut mir leid.", ko: "죄송해요." }
      ] },
      { group: "요청", items: [
        { de: "Könnten Sie … bitte …?", ko: "…해 주실 수 있을까요?" }
      ] },
      { group: "대안 제시", items: [
        { de: "Das wäre gut.", ko: "그러면 좋겠어요." },
        { de: "Falls …, könnten wir …", ko: "혹시 …하면 …하면 되겠네요." }
      ] },
      { group: "합의", items: [
        { de: "Dann sind wir uns einig?", ko: "그럼 이렇게 하기로 한 거죠?" },
        { de: "Ja, abgemacht.", ko: "네, 그렇게 해요." }
      ] }
    ]
  },

  {
    no: 2, lv: "B1",
    title: "Reklamation im Elektronikmarkt", titleKo: "전자제품 매장에서 하자 신고", type: "Beschwerde", typeKo: "항의",
    intro: "산 지 3주 된 스마트폰의 결함을 알리고 해결 방법을 협의하는 대화예요.",
    focus: ["항의하기", "요구 말하기", "wenn · sobald"],
    roles: { A: "Kunde", B: "Mitarbeiter" },
    turns: [
      { r: "A", de: "Guten Tag. Ich habe vor drei Wochen dieses Smartphone bei Ihnen gekauft, aber der Akku hält höchstens zwei Stunden. Das kann doch nicht normal sein.", ko: "안녕하세요. 3주 전에 여기서 이 스마트폰을 샀는데 배터리가 길어야 두 시간밖에 안 가요. 이게 정상일 리가 없잖아요." },
      { r: "B", de: "Das tut mir leid. Haben Sie den Kaufbeleg dabei?", ko: "죄송합니다. 구매 영수증 가지고 오셨어요?" },
      { r: "A", de: "Ja, hier. Außerdem schaltet sich das Gerät manchmal von selbst aus.", ko: "네, 여기요. 그리고 기기가 가끔 저절로 꺼져요." },
      { r: "B", de: "Hm. Haben Sie es schon zurückgesetzt oder ein Update gemacht?", ko: "음. 초기화나 업데이트는 해 보셨어요?" },
      { r: "A", de: "Ja, beides. Das hat aber nichts geändert. Ich möchte entweder ein neues Gerät oder mein Geld zurück.", ko: "네, 둘 다 해 봤는데 달라진 게 없어요. 새 기기로 받거나 환불받고 싶어요." },
      { r: "B", de: "Wir müssen es zuerst prüfen lassen. Das dauert in der Regel bis zu zwei Wochen. Wenn der Mangel bestätigt wird, bekommen Sie ein Ersatzgerät.", ko: "먼저 점검을 맡겨야 해요. 보통 길게는 2주까지 걸려요. 결함이 확인되면 교환 제품을 받으실 수 있어요." },
      { r: "A", de: "Zwei Wochen sind mir zu lang, ich brauche das Telefon für die Arbeit. Gibt es in der Zwischenzeit ein Leihgerät?", ko: "2주는 너무 길어요. 일 때문에 휴대폰이 꼭 있어야 하거든요. 그동안 쓸 수 있는 대여폰이 있나요?" },
      { r: "B", de: "Ein Leihgerät können wir leider nicht anbieten, aber ich kann versuchen, die Prüfung zu beschleunigen. Dann haben Sie vielleicht schon nach einer Woche ein Ergebnis.", ko: "대여폰은 죄송하지만 드릴 수가 없어요. 대신 점검이 빨리 진행되도록 해 볼게요. 그러면 일주일 안에 결과가 나올 수도 있어요." },
      { r: "A", de: "Das wäre schon besser. Und was passiert, wenn der Fehler nicht gefunden wird?", ko: "그러면 좀 낫겠네요. 그런데 결함이 안 나오면 어떻게 되나요?" },
      { r: "B", de: "Dann bekommen Sie das Gerät unverändert zurück. Aber das Problem ist bei diesem Modell bekannt, deshalb bin ich zuversichtlich.", ko: "그 경우에는 기기를 그대로 돌려드려요. 하지만 이 모델은 그 문제가 이미 알려져 있어서 잘 해결될 거라고 봐요." },
      { r: "A", de: "Gut, dann lasse ich es hier. Bekomme ich das schriftlich?", ko: "알겠어요, 그럼 맡기고 갈게요. 이 내용을 서면으로 받을 수 있을까요?" },
      { r: "B", de: "Selbstverständlich. Ich gebe Ihnen einen Reparaturauftrag mit und rufe Sie an, sobald es Neuigkeiten gibt.", ko: "물론이죠. 수리 접수증을 드리고, 소식이 있으면 바로 전화드릴게요." },
      { r: "A", de: "Danke, das ist fair.", ko: "감사합니다. 그 정도면 괜찮네요." }
    ],
    redemittel: [
      { group: "문제 설명", items: [
        { de: "Ich habe vor drei Wochen … gekauft, aber …", ko: "3주 전에 …을 샀는데 …" },
        { de: "Das kann doch nicht normal sein.", ko: "이게 정상일 리가 없잖아요." }
      ] },
      { group: "요구", items: [
        { de: "Ich möchte entweder … oder …", ko: "…하거나 …하고 싶어요." },
        { de: "Zwei Wochen sind mir zu lang.", ko: "2주는 너무 길어요." }
      ] },
      { group: "묻기", items: [
        { de: "Was passiert, wenn …?", ko: "…하면 어떻게 되나요?" },
        { de: "Bekomme ich das schriftlich?", ko: "서면으로 받을 수 있을까요?" }
      ] },
      { group: "점원의 제안", items: [
        { de: "Wir müssen es zuerst prüfen lassen.", ko: "먼저 점검을 맡겨야 해요." },
        { de: "Ich kann versuchen, die Prüfung zu beschleunigen.", ko: "점검이 빨리 진행되도록 해 볼게요." },
        { de: "Ich rufe Sie an, sobald es Neuigkeiten gibt.", ko: "소식이 있으면 바로 전화드릴게요." }
      ] },
      { group: "마무리", items: [
        { de: "Danke, das ist fair.", ko: "감사합니다. 그 정도면 괜찮네요." }
      ] }
    ]
  },

  {
    no: 3, lv: "B1",
    title: "Auto oder Fahrrad?", titleKo: "도심의 자동차와 자전거", type: "Diskussion", typeKo: "토론",
    intro: "도심에 자전거 도로를 늘리는 계획을 두고 의견을 주고받는 대화예요.",
    focus: ["의견 말하기", "찬반 논의", "Konjunktiv II"],
    roles: { A: "Hannah", B: "Lukas" },
    turns: [
      { r: "A", de: "Sag mal, Lukas, hast du schon gehört? Die Stadt will im Zentrum mehr Radwege bauen und dafür Parkplätze streichen. Was hältst du davon?", ko: "있잖아, 루카스, 들었어? 시에서 도심에 자전거 도로를 더 만들고 그 대신 주차 공간을 없앤대. 어떻게 생각해?" },
      { r: "B", de: "Ehrlich gesagt finde ich das übertrieben. Ich bin auf mein Auto angewiesen, weil ich in einem Vorort wohne und der Bus nur alle 30 Minuten fährt.", ko: "솔직히 좀 지나친 것 같아. 나는 교외에 사는데 버스가 30분에 한 대밖에 없어서 차가 꼭 있어야 해." },
      { r: "A", de: "Das verstehe ich, aber meiner Meinung nach würden viele Leute aufs Rad umsteigen, wenn es sichere Radwege gäbe. Ich fahre selbst jeden Tag mit dem Fahrrad zur Arbeit, und manchmal ist es wirklich gefährlich.", ko: "그건 이해해. 그래도 내 생각에는 안전한 자전거 도로가 있으면 자전거로 갈아탈 사람이 많을 거야. 나도 매일 자전거로 출근하는데 가끔 정말 위험하거든." },
      { r: "B", de: "Da hast du recht, die Sicherheit ist wichtig. Trotzdem darf man Autofahrer nicht benachteiligen. Was ist mit Handwerkern oder älteren Menschen, die nicht Rad fahren können?", ko: "맞아, 안전은 중요하지. 그래도 운전자한테 불리하게 하면 안 돼. 기술자들이나 자전거를 못 타는 어르신들은 어떡하고?" },
      { r: "A", de: "Das ist ein guter Punkt. Man könnte Ausnahmen für Handwerker, Lieferverkehr und Menschen mit Behinderung machen. Außerdem wäre es in der Stadt leiser und die Luft besser.", ko: "좋은 지적이야. 기술자나 배송 차량, 장애가 있는 사람들은 예외로 하면 되지. 게다가 도시가 더 조용해지고 공기도 좋아질 거야." },
      { r: "B", de: "Das stimmt schon, andererseits würden Geschäfte im Zentrum Kunden verlieren, wenn man dort nicht mehr parken könnte.", ko: "그건 맞아. 그런데 한편으로는 도심에 차를 못 대게 되면 가게들이 손님을 잃을 거야." },
      { r: "A", de: "Ich habe gelesen, dass Radfahrer und Fußgänger im Durchschnitt häufiger einkaufen, weil sie nicht nach einem Parkplatz suchen müssen.", ko: "자전거 타는 사람이나 걸어 다니는 사람은 주차할 곳을 찾을 필요가 없어서 평균적으로 더 자주 물건을 산다는 글을 읽었어." },
      { r: "B", de: "Kann sein. Mein Vorschlag wäre, zuerst die Busverbindungen auszubauen. Dann würde ich mein Auto auch öfter stehen lassen.", ko: "그럴 수도 있지. 내 제안은 먼저 버스 노선을 늘리는 거야. 그러면 나도 차를 더 자주 두고 다닐 거야." },
      { r: "A", de: "Das wäre ein guter Kompromiss: mehr Busse und sichere Radwege.", ko: "그거 좋은 타협안이다. 버스도 늘리고 안전한 자전거 도로도 만들고." },
      { r: "B", de: "Einverstanden. Aber nur, wenn die Parkhäuser am Stadtrand günstig bleiben.", ko: "좋아. 다만 외곽 주차장 요금이 계속 쌀 때만이야." },
      { r: "A", de: "Abgemacht! Dann sind wir uns ja fast einig.", ko: "좋아! 그럼 우리 거의 의견이 같네." },
      { r: "B", de: "Fast. Bei Regen nehme ich aber trotzdem das Auto.", ko: "거의. 그래도 비 오는 날에는 차를 탈 거야." }
    ],
    redemittel: [
      { group: "의견 묻기", items: [
        { de: "Was hältst du davon?", ko: "어떻게 생각해?" }
      ] },
      { group: "의견 말하기", items: [
        { de: "Ehrlich gesagt finde ich das übertrieben.", ko: "솔직히 좀 지나친 것 같아." },
        { de: "Meiner Meinung nach würden viele …, wenn …", ko: "내 생각에는 …하면 …할 사람이 많을 거야." }
      ] },
      { group: "동의 · 부분 동의", items: [
        { de: "Da hast du recht.", ko: "맞아." },
        { de: "Das ist ein guter Punkt.", ko: "좋은 지적이야." },
        { de: "Das stimmt schon, andererseits …", ko: "그건 맞아. 그런데 한편으로는 …" }
      ] },
      { group: "반론 · 근거", items: [
        { de: "Trotzdem darf man … nicht …", ko: "그래도 …하면 안 돼." },
        { de: "Ich habe gelesen, dass …", ko: "…라는 글을 읽었어." }
      ] },
      { group: "제안 · 타협", items: [
        { de: "Mein Vorschlag wäre, … zu …", ko: "내 제안은 …하는 거야." },
        { de: "Das wäre ein guter Kompromiss.", ko: "그거 좋은 타협안이다." },
        { de: "Einverstanden. Aber nur, wenn …", ko: "좋아. 다만 …할 때만이야." }
      ] }
    ]
  },

  {
    no: 4, lv: "B1",
    title: "Den Urlaub planen", titleKo: "여름휴가 계획 세우기", type: "Planung", typeKo: "계획",
    intro: "두 사람이 휴가지를 비교하고 하나로 정하는 대화예요.",
    focus: ["제안하기", "비교하기", "sonst · allerdings"],
    roles: { A: "Eva", B: "Daniel" },
    turns: [
      { r: "A", de: "Daniel, wir müssen endlich entscheiden, wohin wir im Sommer fahren. Hast du dir schon Gedanken gemacht?", ko: "다니엘, 이제 여름에 어디 갈지 정말 정해야 해. 생각해 봤어?" },
      { r: "B", de: "Ja, ich hätte Lust auf eine Rundreise durch Italien. Wir könnten Rom, Florenz und Venedig besuchen.", ko: "응, 나는 이탈리아 일주를 해 보고 싶어. 로마, 피렌체, 베네치아에 가 볼 수 있잖아." },
      { r: "A", de: "Klingt interessant, aber im Sommer ist es dort ziemlich heiß und überall sind Touristen. Ich würde lieber ans Meer fahren und mich einfach erholen.", ko: "재밌을 것 같긴 한데, 여름에는 거기가 꽤 덥고 어딜 가나 관광객이 많아. 나는 차라리 바다에 가서 그냥 푹 쉬고 싶어." },
      { r: "B", de: "Am Meer finde ich es nach drei Tagen langweilig. Was hältst du von Kroatien? Dort gibt es schöne Strände, und wir könnten auch Städte und Nationalparks besuchen.", ko: "나는 바닷가는 3일만 지나면 지루해. 크로아티아는 어때? 거기는 해변도 멋지고, 도시랑 국립공원에도 가 볼 수 있어." },
      { r: "A", de: "Das gefällt mir schon besser. Wie kommen wir dorthin? Mit dem Auto sind es bestimmt zehn Stunden.", ko: "그게 더 마음에 들어. 거기까지는 어떻게 가지? 차로 가면 열 시간은 걸릴 거야." },
      { r: "B", de: "Wir könnten fliegen, das ist allerdings teurer. Oder wir fahren mit dem Auto und übernachten unterwegs in Österreich.", ko: "비행기를 타도 되는데, 그건 좀 더 비싸. 아니면 차로 가다가 중간에 오스트리아에서 하룻밤 자고 가도 되고." },
      { r: "A", de: "Die Zwischenübernachtung wäre eine gute Lösung. Und wie lange sollen wir bleiben? Ich habe nur zwei Wochen Urlaub.", ko: "중간에 하룻밤 자고 가는 게 좋겠다. 그런데 얼마나 있을까? 나는 휴가가 2주밖에 없어." },
      { r: "B", de: "Zwei Wochen reichen doch. Eine Woche an der Küste, die zweite Woche in den Nationalparks im Landesinneren.", ko: "2주면 충분하지. 첫 주는 해안에서, 둘째 주는 내륙에 있는 국립공원에서 보내자." },
      { r: "A", de: "Okay. Wir sollten bald buchen, sonst sind die schönen Unterkünfte weg.", ko: "좋아. 빨리 예약하는 게 좋겠어. 안 그러면 괜찮은 숙소는 다 나가." },
      { r: "B", de: "Stimmt. Ich schaue heute Abend nach Angeboten und schicke dir drei Vorschläge. Dann entscheiden wir gemeinsam.", ko: "맞아. 오늘 저녁에 숙소를 알아보고 후보 세 곳을 보내 줄게. 그다음에 같이 정하자." },
      { r: "A", de: "Perfekt. Ich freue mich schon!", ko: "좋아. 벌써 기대된다!" }
    ],
    redemittel: [
      { group: "제안", items: [
        { de: "Wir könnten … besuchen.", ko: "…에 가 볼 수 있어." },
        { de: "Was hältst du von …?", ko: "…는 어때?" }
      ] },
      { group: "선호", items: [
        { de: "Ich würde lieber ans Meer fahren.", ko: "나는 차라리 바다에 가고 싶어." },
        { de: "Das gefällt mir schon besser.", ko: "그게 더 마음에 들어." }
      ] },
      { group: "비교", items: [
        { de: "Wir könnten fliegen, das ist allerdings teurer.", ko: "비행기를 타도 되는데, 그건 좀 더 비싸." },
        { de: "Oder wir fahren mit dem Auto.", ko: "아니면 차로 가도 되고." }
      ] },
      { group: "결정", items: [
        { de: "Wir sollten bald buchen, sonst …", ko: "빨리 예약하는 게 좋겠어. 안 그러면 …" },
        { de: "Dann entscheiden wir gemeinsam.", ko: "그다음에 같이 정하자." }
      ] }
    ]
  },

  {
    no: 5, lv: "B1",
    title: "Urlaub beim Chef beantragen", titleKo: "상사에게 휴가 신청하기", type: "Beruf", typeKo: "직장",
    intro: "바쁜 시기에 휴가를 신청하며 대안을 제시하고 합의하는 대화예요.",
    focus: ["휴가 신청", "협상하기", "damit · deshalb · wenn"],
    roles: { A: "Mitarbeiterin", B: "Abteilungsleiter" },
    turns: [
      { r: "A", de: "Guten Morgen, Herr Krüger. Haben Sie kurz Zeit? Ich würde gern mit Ihnen über meinen Urlaub sprechen.", ko: "안녕하세요, 크뤼거 부장님. 잠깐 시간 괜찮으세요? 제 휴가 문제로 말씀드리고 싶어서요." },
      { r: "B", de: "Guten Morgen, Frau Yoon. Ja, kommen Sie rein. Worum geht es?", ko: "안녕하세요, 윤 씨. 네, 들어오세요. 무슨 일이에요?" },
      { r: "A", de: "Ich möchte vom 15. bis zum 26. Dezember Urlaub nehmen, weil ich meine Familie in Korea besuchen will. Ich habe sie seit zwei Jahren nicht gesehen.", ko: "12월 15일부터 26일까지 휴가를 내고 싶어요. 한국에 있는 가족을 만나러 가려고요. 2년 동안 못 봤거든요." },
      { r: "B", de: "Das ist verständlich. Allerdings ist im Dezember bei uns viel los. Wir haben mehrere Projekte, die vor Jahresende fertig sein müssen.", ko: "그럴 만하네요. 그런데 12월에는 우리 부서가 많이 바빠요. 연말 전에 끝내야 하는 프로젝트가 여러 개 있잖아요." },
      { r: "A", de: "Ich weiß, das ist eine anstrengende Zeit. Deshalb würde ich die laufenden Aufgaben vorher abschließen. Das Projekt für den Kunden könnte ich bis zum 12. Dezember fertigstellen.", ko: "힘든 시기라는 건 알고 있어요. 그래서 진행 중인 업무는 미리 끝내 두려고 해요. 고객사 프로젝트는 12월 12일까지 마칠 수 있어요." },
      { r: "B", de: "Das würde uns sehr helfen. Wer soll Sie in dieser Zeit vertreten?", ko: "그러면 많이 도움이 되겠네요. 그동안 업무는 누가 대신 맡죠?" },
      { r: "A", de: "Ich habe schon mit Herrn Becker gesprochen. Er wäre bereit, meine Aufgaben zu übernehmen, wenn ich ihn vorher einarbeite.", ko: "베커 씨와 이미 얘기해 봤어요. 제가 미리 업무를 알려 주면 제 일을 맡아 주겠다고 했어요." },
      { r: "B", de: "Gut, dass Sie das schon geklärt haben. Zwei Wochen am Stück sind trotzdem lang. Könnten Sie sich vorstellen, nur eine Woche zu nehmen und die andere im Januar?", ko: "벌써 정리해 두셨다니 다행이네요. 그래도 2주를 연달아 쉬는 건 길어요. 한 주만 쓰고 나머지 한 주는 1월에 쓰는 건 어떠세요?" },
      { r: "A", de: "Eine Woche wäre für die Reise zu kurz, der Flug allein dauert fast einen Tag. Ich wäre aber bereit, in der Woche davor länger zu arbeiten, damit nichts liegen bleibt.", ko: "한 주는 다녀오기엔 너무 짧아요. 비행시간만 거의 하루거든요. 대신 일이 밀리지 않도록 그 전 주에 더 늦게까지 일할 수 있어요." },
      { r: "B", de: "Das ist ein faires Angebot. Dann genehmige ich den Urlaub unter einer Bedingung: Sie schreiben mir bis Ende nächster Woche eine kurze Übergabenotiz, in der steht, was Herr Becker alles übernimmt.", ko: "그 정도면 합리적인 제안이네요. 그럼 조건을 하나 걸고 휴가를 승인할게요. 다음 주 말까지 베커 씨가 맡을 업무를 간단히 정리한 인수인계 메모를 써 주세요." },
      { r: "A", de: "Selbstverständlich. Vielen Dank für Ihr Verständnis.", ko: "물론이죠. 이해해 주셔서 감사합니다." },
      { r: "B", de: "Gern. Reichen Sie den Antrag bitte noch offiziell über das Personalportal ein.", ko: "그래요. 그리고 신청서는 인사 포털에서 정식으로 제출해 주세요." }
    ],
    redemittel: [
      { group: "용건 꺼내기", items: [
        { de: "Ich würde gern mit Ihnen über … sprechen.", ko: "…에 대해 말씀드리고 싶어요." },
        { de: "Ich möchte … Urlaub nehmen, weil …", ko: "…에 휴가를 내고 싶어요. …해서요." }
      ] },
      { group: "상대 입장 받아들이기", items: [
        { de: "Ich weiß, das ist eine anstrengende Zeit.", ko: "힘든 시기라는 건 알고 있어요." }
      ] },
      { group: "해결책 제시", items: [
        { de: "Deshalb würde ich … vorher abschließen.", ko: "그래서 …을 미리 끝내 두려고 해요." },
        { de: "Ich könnte … bis zum 12. Dezember fertigstellen.", ko: "…을 12월 12일까지 마칠 수 있어요." },
        { de: "Er wäre bereit, … zu übernehmen.", ko: "그 동료가 …을 맡아 주겠다고 했어요." }
      ] },
      { group: "협상", items: [
        { de: "Ich wäre bereit, …, damit …", ko: "…하도록 …할 수 있어요." },
        { de: "Dann genehmige ich den Urlaub unter einer Bedingung.", ko: "그럼 조건을 하나 걸고 휴가를 승인할게요." }
      ] },
      { group: "감사", items: [
        { de: "Vielen Dank für Ihr Verständnis.", ko: "이해해 주셔서 감사합니다." }
      ] }
    ]
  },

  {
    no: 6, lv: "B1",
    title: "Tipps für die Prüfung", titleKo: "시험 준비 조언 주고받기", type: "Rat", typeKo: "조언",
    intro: "시험을 앞두고 고민하는 친구에게 학습 방법을 조언하는 대화예요.",
    focus: ["조언하기", "Konjunktiv II: solltest · würde", "시험 준비"],
    roles: { A: "Sophie", B: "Jin" },
    turns: [
      { r: "A", de: "Hallo Jin! Du siehst müde aus. Ist alles in Ordnung?", ko: "안녕, 진! 피곤해 보인다. 괜찮아?" },
      { r: "B", de: "Ehrlich gesagt nicht so ganz. In drei Wochen habe ich meine B1-Prüfung, und ich weiß nicht, wie ich mich am besten vorbereiten soll.", ko: "솔직히 좀 그래. 3주 뒤에 B1 시험인데 어떻게 준비하는 게 제일 좋을지 모르겠어." },
      { r: "A", de: "Was fällt dir denn am schwersten?", ko: "뭐가 제일 어려운데?" },
      { r: "B", de: "Das Sprechen. Ich kenne die Grammatik, aber wenn ich vor den Prüfern sitze, habe ich einen Blackout.", ko: "말하기. 문법은 아는데, 시험관 앞에만 앉으면 머리가 하얘져." },
      { r: "A", de: "Das kenne ich. An deiner Stelle würde ich mit Freunden üben, am besten jeden Tag zehn Minuten. Du könntest dich auch aufnehmen und die Aufnahme danach anhören.", ko: "나도 그런 적 있어. 내가 너라면 친구들이랑 연습하겠어. 되도록 매일 10분씩. 네 말을 녹음해서 나중에 들어 봐도 좋고." },
      { r: "B", de: "Aufnehmen? Das klingt komisch, aber vielleicht hilft es. Und wie soll ich mich aufs Schreiben vorbereiten?", ko: "녹음? 좀 어색할 것 같은데, 도움이 될 수도 있겠다. 그럼 쓰기는 어떻게 준비해야 해?" },
      { r: "A", de: "Du solltest Mustertexte lesen und wichtige Redemittel lernen. Aber lerne keine ganzen Texte auswendig, sonst passt dein Text in der Prüfung vielleicht nicht zum Thema.", ko: "모범 답안을 읽고 중요한 표현을 익혀 두는 게 좋아. 그런데 글을 통째로 외우지는 마. 안 그러면 시험에서 네 글이 주제에 안 맞을 수도 있어." },
      { r: "B", de: "Gute Idee. Ich habe bisher viele Übungstests gemacht. Meinst du, das reicht?", ko: "좋은 생각이다. 지금까지 모의고사는 많이 풀었어. 그걸로 충분할까?" },
      { r: "A", de: "Übungstests sind wichtig, aber sie allein reichen nicht. Du solltest zwischendurch auch Texte lesen, die dich wirklich interessieren. Dann lernst du Wörter, ohne es zu merken.", ko: "모의고사도 중요하지만 그것만으로는 부족해. 중간중간 네가 정말 관심 있는 글도 읽는 게 좋아. 그러면 자기도 모르게 단어가 늘어." },
      { r: "B", de: "Danke, das hilft mir sehr. Hättest du Lust, nächste Woche mit mir zu üben?", ko: "고마워, 진짜 도움 된다. 다음 주에 나랑 같이 연습할래?" },
      { r: "A", de: "Gern! Wie wäre es mit Dienstag nach dem Kurs?", ko: "좋아! 화요일 수업 끝나고 어때?" },
      { r: "B", de: "Perfekt. Ich bringe die Aufgaben mit.", ko: "좋아. 문제는 내가 챙겨 갈게." }
    ],
    redemittel: [
      { group: "고민 이야기", items: [
        { de: "Ich weiß nicht, wie ich mich vorbereiten soll.", ko: "어떻게 준비해야 할지 모르겠어." },
        { de: "Wenn ich vor den Prüfern sitze, habe ich einen Blackout.", ko: "시험관 앞에만 앉으면 머리가 하얘져." }
      ] },
      { group: "조언", items: [
        { de: "An deiner Stelle würde ich …", ko: "내가 너라면 …하겠어." },
        { de: "Du solltest …", ko: "…하는 게 좋아." },
        { de: "Du könntest dich auch aufnehmen.", ko: "네 말을 녹음해 봐도 좋아." }
      ] },
      { group: "경고 · 이유", items: [
        { de: "Lerne keine ganzen Texte auswendig, sonst …", ko: "글을 통째로 외우지는 마. 안 그러면 …" }
      ] },
      { group: "제안 · 약속", items: [
        { de: "Hättest du Lust, mit mir zu üben?", ko: "나랑 같이 연습할래?" },
        { de: "Wie wäre es mit Dienstag nach dem Kurs?", ko: "화요일 수업 끝나고 어때?" }
      ] }
    ]
  }
];
