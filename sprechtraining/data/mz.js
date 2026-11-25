/* SODA SPRECHTRAINING · MZ 챕터: 독일 사람들이 일상에서 실제로 쓰는 구어체 (Umgangssprache)
   은어와 유행어는 쓰지 않고, 오래 쓰여 온 일상 구어체만 모았어요.
   umg 항목: de(대화에 실제로 나오는 표현), t(나오는 줄 번호, 1부터. 여러 줄이면 배열), ko, std(표준 독일어), reg(종류) */
window.DIALOG_DATA = window.DIALOG_DATA || {};
window.DIALOG_DATA.MZ = [
  {
    no: 1, lv: "MZ",
    title: "Was machst du am Wochenende?", titleKo: "주말에 뭐 해?", type: "Freunde", typeKo: "친구",
    intro: "친구끼리 주말 약속을 잡고 저녁 메뉴를 정하는 대화예요.",
    focus: ["was = etwas", "'ne · hab · komm ich", "Passt schon · Versprochen"],
    roles: { A: "Mika", B: "Jule" },
    turns: [
      { r: "A", de: "Na, was machst du am Wochenende? Hast du schon was vor?", ko: "있잖아, 주말에 뭐 해? 벌써 계획 있어?" },
      { r: "B", de: "Eigentlich nichts. Ich bin diese Woche echt fertig und will einfach mal ausschlafen.", ko: "사실 아무것도 없어. 이번 주에 진짜 지쳐서 그냥 늦잠이나 실컷 자고 싶어." },
      { r: "A", de: "Versteh ich. Aber Lena macht am Samstag 'ne Einweihungsparty. Da kommen ziemlich viele von uns.", ko: "그럴 만하지. 근데 레나가 토요일에 집들이를 해. 우리 친구들도 꽤 많이 와." },
      { r: "B", de: "Wer kommt denn alles? Wenn Tim wieder mit seiner Ex auftaucht, hab ich keine Lust. Das ist mir immer so peinlich.", ko: "누구누구 오는데? 팀이 또 전 애인이랑 나타나면 난 별로 가기 싫어. 그럴 때마다 너무 민망해." },
      { r: "A", de: "Keine Sorge, Tim fährt übers Wochenende zu seinen Eltern. Seine Ex ist sowieso nicht eingeladen.", ko: "걱정 마, 팀은 주말에 부모님 댁에 가. 전 애인은 어차피 초대 안 받았고." },
      { r: "B", de: "Na gut, dann komm ich mit. Aber ich bleib nur bis Mitternacht, ich bin wirklich kaputt.", ko: "알겠어, 그럼 같이 갈게. 대신 자정까지만 있을 거야. 진짜 녹초거든." },
      { r: "A", de: "Passt schon. Wir treffen uns um acht bei mir und essen vorher noch was. Döner oder Pizza?", ko: "그 정도면 괜찮아. 8시에 우리 집에서 만나서 먼저 뭐 좀 먹자. 되너 아니면 피자?" },
      { r: "B", de: "Döner, auf jeden Fall. Aber bitte nicht wieder bei dem Laden an der Ecke. Die haben letztes Mal unsere Bestellung vergessen, das war echt 'ne Frechheit.", ko: "당연히 되너지. 근데 모퉁이 그 가게에서는 제발 또 시키지 말자. 지난번에 우리 주문을 까먹었잖아, 진짜 너무했어." },
      { r: "A", de: "Stimmt, ich hab fast 'ne Stunde gewartet. Dann bestellen wir lieber bei dem neuen Laden in der Weststraße. Der soll richtig gut sein.", ko: "맞아, 나 거의 한 시간이나 기다렸잖아. 그럼 차라리 Weststraße에 새로 생긴 가게에서 시키자. 거기 진짜 맛있대." },
      { r: "B", de: "Gut, dann bestell ich am Samstag für uns beide. Nimmst du Knoblauchsoße oder lieber ohne?", ko: "좋아, 그럼 토요일에 내가 우리 둘 거 주문할게. 마늘 소스 넣을래, 아니면 뺄래?" },
      { r: "A", de: "Mit Knoblauch, ist doch klar! Und diesmal kommen wir wirklich pünktlich, ja?", ko: "당연히 마늘 소스 넣어야지! 그리고 이번엔 진짜 제시간에 가자, 알았지?" },
      { r: "B", de: "Versprochen! Dann bis Samstag.", ko: "약속! 그럼 토요일에 봐." }
    ],
    umg: [
      { de: "Na,", t: 1, ko: "자, 그래 (말을 걸 때 가볍게 꺼내는 말)", std: "Also,", reg: "추임새" },
      { de: "was vor", t: 1, ko: "계획이 있다 (was = etwas)", std: "etwas vor", reg: "축약" },
      { de: "echt", t: [2, 8], ko: "진짜, 정말", std: "wirklich", reg: "구어" },
      { de: "fertig", t: 2, ko: "지친 (끝났다는 뜻이 아니라 지쳤다는 뜻)", std: "erschöpft", reg: "구어" },
      { de: "einfach mal", t: 2, ko: "그냥 한번 (mal = einmal)", std: "einfach einmal", reg: "불변화사" },
      { de: "Versteh ich", t: 3, ko: "이해해, 그럴 만해 (주어 das와 어미 e가 빠짐)", std: "Das verstehe ich.", reg: "축약" },
      { de: "'ne", t: [3, 8, 9], ko: "eine의 구어 축약 (말할 때만, 글에서는 쓰지 않음)", std: "eine", reg: "축약" },
      { de: "auftaucht", t: 4, ko: "(갑자기) 나타나다", std: "erscheint", reg: "구어" },
      { de: "hab ich keine Lust", t: 4, ko: "…하고 싶지 않아, 내키지 않아 (habe의 e 탈락)", std: "habe ich keine Lust", reg: "축약" },
      { de: "Na gut", t: 6, ko: "알겠어, 좋아 (마지못해 받아들일 때)", std: "Also gut", reg: "추임새" },
      { de: "komm ich mit", t: 6, ko: "같이 갈게 (komme의 e 탈락)", std: "komme ich mit", reg: "축약" },
      { de: "ich bleib", t: 6, ko: "나는 있을게 (bleibe의 e 탈락)", std: "ich bleibe", reg: "축약" },
      { de: "kaputt", t: 6, ko: "녹초가 된 (원래는 ‘망가진’)", std: "sehr müde, erschöpft", reg: "구어" },
      { de: "Passt schon", t: 7, ko: "괜찮아, 그 정도면 돼", std: "Das ist in Ordnung.", reg: "구어" },
      { de: "noch was", t: 7, ko: "뭘 좀 (was = etwas)", std: "noch etwas", reg: "축약" },
      { de: "Laden", t: [8, 9], ko: "가게, 식당 (작은 음식점을 편하게 부르는 말)", std: "Lokal, Imbiss", reg: "구어" },
      { de: "richtig gut", t: 9, ko: "아주 좋은 (richtig = 매우)", std: "sehr gut", reg: "구어" },
      { de: "bestell ich", t: 10, ko: "내가 주문할게 (bestelle의 e 탈락)", std: "bestelle ich", reg: "축약" },
      { de: "ist doch klar", t: 11, ko: "당연하잖아 (주어 das가 빠짐)", std: "Das ist doch selbstverständlich.", reg: "구어" },
      { de: "Versprochen", t: 12, ko: "약속해 (짧게 줄인 대답)", std: "Ich verspreche es.", reg: "구어" }
    ],
    redemittel: [
      { group: "계획 묻기", items: [
        { de: "Was machst du am Wochenende?", ko: "주말에 뭐 해?" },
        { de: "Hast du schon was vor?", ko: "벌써 계획 있어?" }
      ] },
      { group: "내키지 않을 때 · 받아들일 때", items: [
        { de: "Wenn …, hab ich keine Lust.", ko: "…하면 별로 가기 싫어." },
        { de: "Na gut, dann komm ich mit.", ko: "알겠어, 그럼 같이 갈게." },
        { de: "Passt schon.", ko: "괜찮아." }
      ] },
      { group: "약속 정하기", items: [
        { de: "Wir treffen uns um … bei mir.", ko: "…시에 우리 집에서 만나자." },
        { de: "Versprochen!", ko: "약속!" }
      ] }
    ]
  },
  {
    no: 2, lv: "MZ",
    title: "Du hast nicht mal angerufen", titleKo: "전화도 안 했잖아", type: "Streit", typeKo: "다툼",
    intro: "약속을 어긴 친구에게 서운함을 말하고, 사과하고 화해하는 대화예요.",
    focus: ["weil + Hauptsatz", "Vorwurf und Entschuldigung", "eben · halt · nämlich"],
    roles: { A: "Nele", B: "Ben" },
    turns: [
      { r: "A", de: "Sag mal, wo warst du denn gestern? Wir hatten doch sieben Uhr ausgemacht, und du bist einfach nicht gekommen.", ko: "야, 어제 대체 어디 있었어? 7시로 약속했잖아. 근데 그냥 안 왔어." },
      { r: "B", de: "Oh Mann, das tut mir wirklich leid. Ich hab total die Zeit vergessen, weil ich war noch bis acht im Büro.", ko: "아이고, 정말 미안해. 시간 가는 걸 완전히 잊었어. 8시까지 회사에 있었거든." },
      { r: "A", de: "Du hättest ja wenigstens kurz anrufen können! Ich stand 'ne halbe Stunde vorm Kino wie bestellt und nicht abgeholt.", ko: "적어도 잠깐 전화는 할 수 있었잖아! 영화관 앞에서 30분 동안 바람맞은 사람처럼 서 있었다고." },
      { r: "B", de: "Ich weiß, das war blöd von mir. Mein Handy war nämlich auch noch leer. Ich konnte dich gar nicht erreichen.", ko: "알아, 내가 생각이 없었어. 게다가 휴대폰 배터리까지 나갔었어. 너한테 연락할 방법이 아예 없었어." },
      { r: "A", de: "Aha, und das soll ich dir jetzt glauben? Das ist schon das zweite Mal diesen Monat.", ko: "아, 그래? 그걸 지금 믿으라고? 이번 달에만 벌써 두 번째야." },
      { r: "B", de: "Nein, du hast ja recht. Aber ich meine es wirklich nicht böse. Ich bin zurzeit einfach total im Stress mit dem Projekt.", ko: "아니야, 네 말이 맞아. 그래도 나쁜 뜻은 정말 없어. 요즘 프로젝트 때문에 정신이 하나도 없어서 그래." },
      { r: "A", de: "Das versteh ich ja, aber dann sag doch einfach Bescheid. Das dauert doch nur fünf Sekunden.", ko: "그건 이해해. 그래도 그럴 땐 그냥 말을 해 주면 되잖아. 5초면 되는데." },
      { r: "B", de: "Stimmt. Ich hätte dir vorher wenigstens 'ne Nachricht schreiben sollen.", ko: "맞아. 미리 메시지라도 보냈어야 했는데." },
      { r: "A", de: "Eben. Mich nervt halt, dass ich immer als Letzte erfahre, was los ist.", ko: "그러니까. 무슨 일인지 늘 내가 제일 마지막에 아는 게 그냥 짜증 나." },
      { r: "B", de: "Kommt nicht wieder vor, versprochen. Ich lad dich zum Essen ein, als Entschuldigung.", ko: "다시는 안 그럴게, 약속해. 미안해서 그러는데 내가 밥 살게." },
      { r: "A", de: "Na gut, aber dann such ich das Restaurant aus. Und diesmal kommst du pünktlich, sonst bin ich echt sauer.", ko: "알겠어, 대신 식당은 내가 고를 거야. 그리고 이번엔 제시간에 와, 안 그러면 진짜 화낼 거야." },
      { r: "B", de: "Abgemacht. Samstag um sieben, und ich schreib dir vorher noch mal.", ko: "그렇게 하자. 토요일 7시. 그리고 그 전에 한 번 더 연락할게." }
    ],
    umg: [
      { de: "Sag mal", t: 1, ko: "야, 있잖아 (질문하거나 따지기 전에 던지는 말)", std: "Sag mir bitte,", reg: "추임새" },
      { de: "ausgemacht", t: 1, ko: "약속했다, 정했다 (ausmachen)", std: "vereinbart", reg: "구어" },
      { de: "Oh Mann", t: 2, ko: "아이고, 어휴 (당황·실망)", std: "Ach je", reg: "감탄" },
      { de: "total", t: [2, 6], ko: "완전히, 엄청", std: "völlig", reg: "구어" },
      { de: "weil ich war", t: 2, ko: "weil 뒤에 동사를 둘째 자리에 두는 말투 (표준은 동사가 맨 뒤)", std: "weil ich noch bis acht im Büro war", reg: "구어 어순" },
      { de: "'ne", t: [3, 8], ko: "eine의 구어 축약", std: "eine", reg: "축약" },
      { de: "vorm", t: 3, ko: "…앞에 (vor dem의 축약)", std: "vor dem", reg: "축약" },
      { de: "wie bestellt und nicht abgeholt", t: 3, ko: "오기로 한 사람이 안 와서 혼자 하염없이 서 있는 모습", std: "allein und vergeblich wartend", reg: "관용구" },
      { de: "blöd", t: 4, ko: "바보 같은, 생각 없는", std: "dumm, unüberlegt", reg: "구어" },
      { de: "leer", t: 4, ko: "(휴대폰) 배터리가 다 된", std: "Der Akku war leer.", reg: "구어" },
      { de: "Aha", t: 5, ko: "아, 그래? (믿지 못하는 투)", std: "Ach, wirklich?", reg: "추임새" },
      { de: "im Stress", t: 6, ko: "스트레스를 받는, 정신없는", std: "gestresst, unter Druck", reg: "구어" },
      { de: "versteh ich", t: 7, ko: "이해해 (verstehe의 e 탈락)", std: "verstehe ich", reg: "축약" },
      { de: "sag doch einfach Bescheid", t: 7, ko: "그냥 알려 주면 되잖아 (Bescheid sagen)", std: "informiere mich doch einfach", reg: "구어" },
      { de: "Stimmt", t: 8, ko: "맞아 (주어 das가 빠짐)", std: "Das stimmt.", reg: "구어" },
      { de: "Eben", t: 9, ko: "바로 그거야, 그러니까", std: "Genau so ist es.", reg: "불변화사" },
      { de: "nervt", t: 9, ko: "짜증 나게 하다", std: "ärgert", reg: "구어" },
      { de: "halt", t: 9, ko: "그냥 (어쩔 수 없다는 듯 담담히 말할 때)", std: "eben, nun einmal", reg: "불변화사" },
      { de: "was los ist", t: 9, ko: "무슨 일이 있는지", std: "was passiert ist", reg: "구어" },
      { de: "Kommt nicht wieder vor", t: 10, ko: "다시는 안 그럴게 (주어 das가 빠짐)", std: "Das kommt nicht wieder vor.", reg: "구어" },
      { de: "lad", t: 10, ko: "초대하다, 사 주다 (lade의 e 탈락)", std: "lade", reg: "축약" },
      { de: "such ich", t: 11, ko: "내가 고를게 (suche의 e 탈락)", std: "suche ich", reg: "축약" },
      { de: "sauer", t: 11, ko: "화난", std: "verärgert", reg: "구어" },
      { de: "Abgemacht", t: 12, ko: "그렇게 하자, 약속한 거야", std: "Einverstanden", reg: "구어" },
      { de: "schreib", t: 12, ko: "메시지 보낼게 (schreibe의 e 탈락)", std: "schreibe", reg: "축약" }
    ],
    redemittel: [
      { group: "서운함 말하기", items: [
        { de: "Du bist einfach nicht gekommen.", ko: "그냥 안 왔잖아." },
        { de: "Du hättest wenigstens anrufen können.", ko: "적어도 전화는 할 수 있었잖아." },
        { de: "Mich nervt, dass …", ko: "…는 게 짜증 나." }
      ] },
      { group: "사과하기", items: [
        { de: "Das tut mir wirklich leid.", ko: "정말 미안해." },
        { de: "Ich hätte … sollen.", ko: "…했어야 했는데." },
        { de: "Kommt nicht wieder vor.", ko: "다시는 안 그럴게." }
      ] },
      { group: "화해하기", items: [
        { de: "Ich lad dich zum Essen ein.", ko: "내가 밥 살게." },
        { de: "Abgemacht.", ko: "그렇게 하자." }
      ] }
    ]
  },
  {
    no: 3, lv: "MZ",
    title: "Immer nur am Handy", titleKo: "맨날 휴대폰만 봐", type: "Geschwister", typeKo: "남매",
    intro: "휴대폰만 보는 동생에게 설거지와 저녁 준비를 말하는 집 안 대화예요.",
    focus: ["nix · gibt's · leg's", "Aufforderung im Alltag", "Keine Ahnung · Na also"],
    roles: { A: "Luca", B: "Sophie" },
    turns: [
      { r: "A", de: "Sophie, du hängst schon wieder die ganze Zeit am Handy. Kannst du das nicht mal weglegen?", ko: "소피, 또 하루 종일 휴대폰만 붙잡고 있네. 좀 내려놓으면 안 돼?" },
      { r: "B", de: "Ich schau doch nur schnell was nach. Hab ich dich gestört?", ko: "잠깐 뭐 좀 찾아보는 것뿐이야. 내가 뭐 방해했어?" },
      { r: "A", de: "Du machst das jetzt seit zwei Stunden. Ich hab dich dreimal was gefragt, und du hast nix gehört.", ko: "벌써 두 시간째 그러고 있잖아. 내가 세 번이나 뭘 물어봤는데 하나도 못 들었고." },
      { r: "B", de: "Echt? Oh, tut mir leid. Ich hab 'nen Film über Berlin geguckt, der war total interessant.", ko: "진짜? 아, 미안. 베를린에 관한 영상을 봤는데 엄청 재밌었어." },
      { r: "A", de: "Und was ist mit dem Abwasch? Du bist heute dran.", ko: "그리고 설거지는? 오늘 네 차례잖아." },
      { r: "B", de: "Mist, den hab ich ganz vergessen. Gib mir fünf Minuten, ich mach den gleich.", ko: "아, 맞다. 완전히 잊어버렸어. 5분만 줘, 금방 할게." },
      { r: "A", de: "Das sagst du jedes Mal. Ehrlich gesagt nervt mich das ein bisschen.", ko: "너 맨날 그 말 하잖아. 솔직히 좀 짜증 나." },
      { r: "B", de: "Du übertreibst echt. Aber okay, ich leg's weg und mach den Abwasch. Danach muss ich eh los zum Sport.", ko: "진짜 오버한다. 그래도 알겠어, 내려놓고 설거지할게. 그다음엔 어차피 운동하러 나가야 해." },
      { r: "A", de: "Na also, geht doch! Und wenn du wiederkommst, kochen wir zusammen, okay?", ko: "거 봐, 되잖아! 갔다 오면 같이 저녁 해 먹자, 알았지?" },
      { r: "B", de: "Gern. Was gibt's denn dann zu essen?", ko: "좋아. 그럼 뭐 먹을 건데?" },
      { r: "A", de: "Keine Ahnung, schau mal in den Kühlschrank. Ich glaub, da ist noch Gemüse drin.", ko: "몰라, 냉장고 좀 봐 봐. 아직 채소가 좀 남아 있을 거야." },
      { r: "B", de: "Passt, dann mach ich 'ne Gemüsepfanne. Bis später!", ko: "좋아, 그럼 채소볶음 만들게. 이따 봐!" }
    ],
    umg: [
      { de: "hängst schon wieder die ganze Zeit am Handy", t: 1, ko: "또 계속 휴대폰만 붙잡고 있다 (am Handy hängen)", std: "beschäftigst dich schon wieder die ganze Zeit mit dem Handy", reg: "구어" },
      { de: "mal", t: [1, 11], ko: "좀, 한번 (부탁이나 요청을 부드럽게 함)", std: "einmal", reg: "불변화사" },
      { de: "schau", t: [2, 11], ko: "보다 (schauen은 남부 독일에서 많이 쓰는 말, 어미 e 탈락)", std: "sehe, sieh", reg: "구어" },
      { de: "schnell was nach", t: 2, ko: "잠깐 뭘 좀 찾아보다 (was = etwas)", std: "schnell etwas nach", reg: "축약" },
      { de: "nix", t: 3, ko: "아무것도 (nichts의 구어형)", std: "nichts", reg: "축약" },
      { de: "Echt?", t: 4, ko: "진짜?", std: "Wirklich?", reg: "추임새" },
      { de: "'nen", t: 4, ko: "einen의 구어 축약", std: "einen", reg: "축약" },
      { de: "total", t: 4, ko: "엄청, 완전", std: "sehr", reg: "구어" },
      { de: "geguckt", t: 4, ko: "봤다 (gucken = 보다)", std: "gesehen", reg: "구어" },
      { de: "dran", t: 5, ko: "차례인, 당번인 (dran sein)", std: "an der Reihe", reg: "구어" },
      { de: "Mist", t: 6, ko: "아차, 이런 (가볍게 쓰는 감탄)", std: "Wie ärgerlich!", reg: "감탄" },
      { de: "Gib mir fünf Minuten", t: 6, ko: "5분만 줘", std: "Warte bitte fünf Minuten.", reg: "구어" },
      { de: "ich mach den gleich", t: 6, ko: "금방 할게 (den = ihn, mache의 e 탈락)", std: "ich mache ihn gleich", reg: "축약" },
      { de: "nervt", t: 7, ko: "짜증 나게 하다", std: "ärgert", reg: "구어" },
      { de: "übertreibst echt", t: 8, ko: "진짜 오버한다 (echt = 진짜)", std: "übertreibst wirklich", reg: "구어" },
      { de: "leg's", t: 8, ko: "그걸 내려놓다 (lege es의 축약)", std: "lege es", reg: "축약" },
      { de: "eh", t: 8, ko: "어차피", std: "sowieso", reg: "구어" },
      { de: "los zum Sport", t: 8, ko: "운동하러 나가다 (동사 gehen이 빠짐)", std: "zum Sport losgehen", reg: "구어" },
      { de: "Na also, geht doch", t: 9, ko: "거 봐, 되잖아", std: "Siehst du, es funktioniert doch.", reg: "구어" },
      { de: "gibt's", t: 10, ko: "있다 (gibt es의 축약)", std: "gibt es", reg: "축약" },
      { de: "Keine Ahnung", t: 11, ko: "몰라", std: "Ich weiß es nicht.", reg: "구어" },
      { de: "glaub", t: 11, ko: "…인 것 같아 (glaube의 e 탈락)", std: "glaube", reg: "축약" },
      { de: "drin", t: 11, ko: "안에 (darin의 축약)", std: "darin", reg: "축약" },
      { de: "Passt", t: 12, ko: "좋아, 그걸로 해", std: "Das passt gut.", reg: "구어" }
    ],
    redemittel: [
      { group: "부드럽게 지적하기", items: [
        { de: "Kannst du das nicht mal weglegen?", ko: "그것 좀 내려놓으면 안 돼?" },
        { de: "Ehrlich gesagt nervt mich das.", ko: "솔직히 그게 짜증 나." }
      ] },
      { group: "변명 · 인정", items: [
        { de: "Ich hab das ganz vergessen.", ko: "완전히 잊어버렸어." },
        { de: "Gib mir fünf Minuten.", ko: "5분만 줘." }
      ] },
      { group: "저녁 정하기", items: [
        { de: "Was gibt's zu essen?", ko: "뭐 먹어?" },
        { de: "Keine Ahnung, schau mal in den Kühlschrank.", ko: "몰라, 냉장고 좀 봐 봐." }
      ] }
    ]
  },
  {
    no: 4, lv: "MZ",
    title: "Mittagspause im Büro", titleKo: "사무실 점심시간", type: "Kollegen", typeKo: "직장 동료",
    intro: "야근에 지친 동료를 점심에 불러내고 상사에게 말해 보라고 권하는 대화예요.",
    focus: ["Tja · halt · eh", "Rat geben", "auf den letzten Drücker"],
    roles: { A: "Kim", B: "Leon" },
    turns: [
      { r: "A", de: "Hey Leon, gehst du mit in die Kantine? Ich hab 'nen Riesenhunger.", ko: "레온, 구내식당 같이 갈래? 배고파 죽겠어." },
      { r: "B", de: "Ich weiß nicht, ich hab noch ewig viel zu tun. Der Chef will die Zahlen bis heute Abend haben.", ko: "글쎄, 아직 할 일이 끝도 없이 많아. 팀장님이 오늘 저녁까지 수치를 달래." },
      { r: "A", de: "Schon wieder? Das ist jetzt das dritte Mal diese Woche. Immer wollen die alles auf den letzten Drücker haben.", ko: "또? 이번 주에만 벌써 세 번째야. 위에서는 맨날 뭐든 코앞에 닥쳐서 달라고 하더라." },
      { r: "B", de: "Tja, so ist das halt. Und ich kann ja schlecht nein sagen, ich bin noch neu hier.", ko: "뭐, 원래 그런 거지. 게다가 난 아직 신입이라 거절하기도 좀 그래." },
      { r: "A", de: "Doch, kannst du! Man muss auch mal Grenzen setzen. Sonst machst du am Ende nur Überstunden, und keiner bedankt sich.", ko: "아니, 할 수 있어! 가끔은 선을 그어야 해. 안 그러면 결국 야근만 하고 고맙다는 사람도 없어." },
      { r: "B", de: "Hm, vielleicht hast du recht. Aber bei dem Stress kann ich echt nicht abschalten.", ko: "음, 네 말이 맞을지도 몰라. 근데 이렇게 스트레스 받으면 진짜 머리를 못 식히겠어." },
      { r: "A", de: "Komm, wir gehen jetzt erst mal was essen. Mit leerem Magen kann man eh nicht klar denken.", ko: "자, 일단 뭐 좀 먹으러 가자. 어차피 배고프면 머리도 안 돌아가." },
      { r: "B", de: "Okay, überredet. Aber nur 'ne halbe Stunde, sonst werd ich nie fertig.", ko: "알았어, 설득당했다. 근데 30분만이야, 안 그러면 절대 못 끝내." },
      { r: "A", de: "Alles klar. Ich lad dich auch ein, dann hast du keine Ausrede mehr.", ko: "알겠어. 밥도 내가 살게, 그럼 더 이상 핑계 못 대겠지." },
      { r: "B", de: "Na, das nehm ich an! Danke dir.", ko: "오, 그럼 사양 안 할게! 고마워." },
      { r: "A", de: "Und danach sprichst du mit dem Chef. Kein Mensch schafft so viel an einem Tag.", ko: "그리고 먹고 나서 팀장님한테 말해. 하루에 그렇게 많이 해낼 수 있는 사람은 없어." },
      { r: "B", de: "Mal schauen. Ich versuch's gleich nach dem Mittagessen.", ko: "생각해 볼게. 점심 먹고 바로 한번 말해 볼게." }
    ],
    umg: [
      { de: "Hey", t: 1, ko: "야, 저기 (가볍게 부르는 말)", std: "Hallo", reg: "추임새" },
      { de: "'nen Riesenhunger", t: 1, ko: "엄청난 배고픔 ('nen = einen, Riesen- = 엄청난)", std: "einen großen Hunger", reg: "구어" },
      { de: "ewig viel", t: 2, ko: "끝도 없이 많이", std: "sehr viel", reg: "구어" },
      { de: "wollen die", t: 3, ko: "그 사람들이 원하다 (die = sie, 윗사람들을 가리킴)", std: "wollen sie", reg: "구어" },
      { de: "auf den letzten Drücker", t: 3, ko: "마지막 순간에, 닥쳐서", std: "erst im letzten Moment", reg: "관용구" },
      { de: "Tja", t: 4, ko: "뭐, 글쎄 (체념하는 말투)", std: "Nun", reg: "추임새" },
      { de: "halt", t: 4, ko: "원래 그런 거야 (so ist das halt)", std: "eben", reg: "불변화사" },
      { de: "schlecht nein sagen", t: 4, ko: "거절하기 어렵다 (schlecht = 하기 힘들다)", std: "kaum ablehnen", reg: "구어" },
      { de: "Doch, kannst du", t: 5, ko: "아니, 할 수 있어 (상대의 부정을 뒤집을 때, 목적어 das가 빠짐)", std: "Doch, das kannst du.", reg: "구어" },
      { de: "auch mal", t: 5, ko: "가끔은", std: "auch einmal", reg: "불변화사" },
      { de: "echt", t: 6, ko: "진짜, 정말", std: "wirklich", reg: "구어" },
      { de: "abschalten", t: 6, ko: "머리를 식히다, 긴장을 풀다", std: "sich entspannen", reg: "구어" },
      { de: "Komm,", t: 7, ko: "자, 가자 (재촉하는 말)", std: "Lass uns …", reg: "추임새" },
      { de: "erst mal", t: 7, ko: "우선, 일단", std: "zunächst", reg: "구어" },
      { de: "was essen", t: 7, ko: "뭘 좀 먹다 (was = etwas)", std: "etwas essen", reg: "축약" },
      { de: "eh", t: 7, ko: "어차피", std: "sowieso", reg: "구어" },
      { de: "überredet", t: 8, ko: "설득당했어, 넘어갔어", std: "Du hast mich überredet.", reg: "구어" },
      { de: "'ne halbe Stunde", t: 8, ko: "30분 (eine의 축약)", std: "eine halbe Stunde", reg: "축약" },
      { de: "werd", t: 8, ko: "…하게 되다 (werde의 e 탈락)", std: "werde", reg: "축약" },
      { de: "Alles klar", t: 9, ko: "알겠어, 좋아", std: "In Ordnung.", reg: "구어" },
      { de: "lad", t: 9, ko: "사 주다, 초대하다 (lade의 e 탈락)", std: "lade", reg: "축약" },
      { de: "das nehm ich an", t: 10, ko: "그럼 받을게, 사양 안 할게 (nehme의 e 탈락)", std: "Das nehme ich gern an.", reg: "축약" },
      { de: "Kein Mensch", t: 11, ko: "아무도 (…하지 않는다)", std: "Niemand", reg: "구어" },
      { de: "schafft", t: 11, ko: "해내다, 끝내다", std: "bewältigt", reg: "구어" },
      { de: "Mal schauen", t: 12, ko: "생각해 볼게, 두고 보자", std: "Ich werde es mir überlegen.", reg: "구어" },
      { de: "versuch's", t: 12, ko: "한번 해 볼게 (versuche es의 축약)", std: "versuche es", reg: "축약" }
    ],
    redemittel: [
      { group: "점심 권하기", items: [
        { de: "Gehst du mit in die Kantine?", ko: "구내식당 같이 갈래?" },
        { de: "Komm, wir gehen jetzt erst mal was essen.", ko: "자, 일단 뭐 좀 먹으러 가자." }
      ] },
      { group: "일이 많다고 말하기", items: [
        { de: "Ich hab noch ewig viel zu tun.", ko: "아직 할 일이 끝도 없이 많아." },
        { de: "Ich kann ja schlecht nein sagen.", ko: "거절하기가 좀 그래." }
      ] },
      { group: "조언하기", items: [
        { de: "Man muss auch mal Grenzen setzen.", ko: "가끔은 선을 그어야 해." },
        { de: "Danach sprichst du mit dem Chef.", ko: "그다음에 팀장님한테 말해." }
      ] }
    ]
  },
  {
    no: 5, lv: "MZ",
    title: "Fußball in der Kneipe", titleKo: "술집에서 축구 보기", type: "Hobby", typeKo: "취미",
    intro: "토요일 경기를 함께 볼 장소와 시간을 정하고 경기 결과를 두고 내기하는 대화예요.",
    focus: ["Klar · Na ja", "tippen · wetten", "'nen · würd"],
    roles: { A: "Jan", B: "Mara" },
    turns: [
      { r: "A", de: "Mara, hast du am Samstag Zeit? Da spielt unser Verein gegen Köln.", ko: "마라, 토요일에 시간 있어? 우리 팀이 쾰른이랑 붙어." },
      { r: "B", de: "Klar, das lass ich mir doch nicht entgehen. Wo wollen wir gucken, bei dir oder in der Kneipe?", ko: "당연하지, 그걸 어떻게 놓쳐. 어디서 볼까? 너희 집에서, 아니면 술집에서?" },
      { r: "A", de: "Ich würd sagen, in der Kneipe. Da ist die Stimmung viel besser als zu zweit vor dem Fernseher.", ko: "술집이 낫겠어. 둘이 TV 앞에 앉아 있는 것보다 분위기가 훨씬 좋잖아." },
      { r: "B", de: "Stimmt auch wieder. Aber da ist es oft total voll. Wir müssen früh hin, sonst kriegen wir keinen Platz.", ko: "그 말도 맞네. 근데 거기 사람이 꽉 찰 때가 많아. 일찍 가야 해, 안 그러면 자리 못 잡아." },
      { r: "A", de: "Dann treffen wir uns um halb zwei. Anpfiff ist um halb vier, das reicht locker.", ko: "그럼 1시 반에 만나자. 경기 시작이 3시 반이니까 그 정도면 넉넉해." },
      { r: "B", de: "Gut. Was glaubst du denn, wie das ausgeht? Ich tipp auf ein Unentschieden.", ko: "좋아. 근데 결과는 어떻게 될 것 같아? 난 무승부에 걸게." },
      { r: "A", de: "Echt? Ich glaub, wir gewinnen zwei zu eins. Die Mannschaft ist gerade richtig gut drauf.", ko: "진짜? 난 우리가 2대 1로 이길 것 같아. 요즘 선수들 컨디션이 엄청 좋거든." },
      { r: "B", de: "Na ja, abwarten. Letzte Saison haben sie auch am Anfang gut gespielt und dann total abgebaut.", ko: "글쎄, 두고 봐야지. 지난 시즌에도 초반엔 잘하다가 나중에 완전히 무너졌잖아." },
      { r: "A", de: "Stimmt, das war schon ärgerlich. Aber diesmal haben sie 'nen neuen Trainer, und der macht vieles anders.", ko: "맞아, 그건 진짜 속상했지. 근데 이번엔 감독이 새로 왔는데, 그 사람은 많은 걸 다르게 해." },
      { r: "B", de: "Ich lass mich überraschen. Wetten wir um ein Bier?", ko: "어떻게 되나 보자. 맥주 한 잔 걸고 내기할래?" },
      { r: "A", de: "Gern! Wer verliert, zahlt die Runde.", ko: "좋아! 지는 사람이 한턱내기야." },
      { r: "B", de: "Abgemacht. Dann bis Samstag, und vergiss deinen Schal nicht!", ko: "그렇게 하자. 그럼 토요일에 봐, 머플러 잊지 말고!" }
    ],
    umg: [
      { de: "Klar", t: 2, ko: "물론이지, 당연하지", std: "Selbstverständlich", reg: "구어" },
      { de: "lass ich mir doch nicht entgehen", t: 2, ko: "놓칠 수 없지 (lasse의 e 탈락)", std: "lasse ich mir doch nicht entgehen", reg: "축약" },
      { de: "gucken", t: 2, ko: "(경기를) 보다", std: "das Spiel ansehen", reg: "구어" },
      { de: "Kneipe", t: [2, 3], ko: "동네 술집", std: "Gaststätte, Lokal", reg: "구어" },
      { de: "Ich würd sagen", t: 3, ko: "…가 낫겠어 (würde의 e 탈락)", std: "Ich würde sagen", reg: "축약" },
      { de: "Stimmt auch wieder", t: 4, ko: "그 말도 맞네", std: "Da hast du auch recht.", reg: "구어" },
      { de: "total voll", t: 4, ko: "꽉 찬", std: "sehr voll", reg: "구어" },
      { de: "früh hin", t: 4, ko: "일찍 가다 (동사 gehen이 빠짐)", std: "früh hingehen", reg: "구어" },
      { de: "kriegen", t: 4, ko: "얻다, 받다", std: "bekommen", reg: "구어" },
      { de: "locker", t: 5, ko: "여유 있게, 충분히", std: "ohne Probleme", reg: "구어" },
      { de: "tipp auf", t: 6, ko: "…이라고 예상하다, …에 걸다 (tippe의 e 탈락)", std: "tippe auf", reg: "축약" },
      { de: "Echt?", t: 7, ko: "진짜?", std: "Wirklich?", reg: "추임새" },
      { de: "glaub", t: 7, ko: "…인 것 같아 (glaube의 e 탈락)", std: "glaube", reg: "축약" },
      { de: "richtig gut drauf", t: 7, ko: "컨디션이 아주 좋은", std: "in sehr guter Form", reg: "구어" },
      { de: "Na ja", t: 8, ko: "글쎄 (완전히 동의하지는 않을 때)", std: "Nun ja", reg: "추임새" },
      { de: "abwarten", t: 8, ko: "두고 보자 (주어와 조동사가 빠짐)", std: "Wir müssen abwarten.", reg: "구어" },
      { de: "abgebaut", t: 8, ko: "기량이 떨어지다, 무너지다 (abbauen)", std: "nachgelassen", reg: "구어" },
      { de: "'nen", t: 9, ko: "einen의 구어 축약", std: "einen", reg: "축약" },
      { de: "Ich lass mich überraschen", t: 10, ko: "어떻게 될지 지켜볼게 (lasse의 e 탈락)", std: "Ich lasse mich überraschen.", reg: "축약" },
      { de: "Wetten wir", t: 10, ko: "내기할래? (동사로 시작하는 제안)", std: "Sollen wir wetten?", reg: "구어" },
      { de: "zahlt die Runde", t: 11, ko: "한턱내다 (모두의 술값을 내다)", std: "bezahlt die Getränke für alle", reg: "구어" },
      { de: "Abgemacht", t: 12, ko: "그렇게 하자, 약속한 거야", std: "Einverstanden", reg: "구어" }
    ],
    redemittel: [
      { group: "약속 · 장소 정하기", items: [
        { de: "Hast du am Samstag Zeit?", ko: "토요일에 시간 있어?" },
        { de: "Ich würd sagen, in der Kneipe.", ko: "술집이 낫겠어." },
        { de: "Wir müssen früh hin, sonst kriegen wir keinen Platz.", ko: "일찍 가야 해, 안 그러면 자리 못 잡아." }
      ] },
      { group: "예상 말하기", items: [
        { de: "Ich tipp auf …", ko: "난 …에 걸게." },
        { de: "Ich glaub, wir gewinnen …", ko: "우리가 …로 이길 것 같아." }
      ] },
      { group: "내기하기", items: [
        { de: "Wetten wir um …?", ko: "…를 걸고 내기할래?" },
        { de: "Wer verliert, zahlt die Runde.", ko: "지는 사람이 한턱내기야." }
      ] }
    ]
  },
  {
    no: 6, lv: "MZ",
    title: "Das WG-Casting", titleKo: "룸메이트 면접", type: "Wohnen", typeKo: "주거",
    intro: "셰어하우스(WG)에 들어가려는 사람이 지금 사는 사람과 만나 생활 규칙을 이야기하는 대화예요.",
    focus: ["Sag mal · Hauptsache", "was = etwas", "Wohnen und Alltag"],
    roles: { A: "Paula", B: "Daniel" },
    turns: [
      { r: "A", de: "Hi, du bist bestimmt Daniel. Komm rein, die Schuhe kannst du einfach hier abstellen.", ko: "안녕, 네가 다니엘이구나. 들어와, 신발은 그냥 여기 두면 돼." },
      { r: "B", de: "Hallo Paula, danke. Schön habt ihr's hier! Die Wohnung ist viel größer, als ich gedacht hab.", ko: "안녕, 파울라. 고마워. 집 진짜 좋다! 생각했던 것보다 훨씬 넓네." },
      { r: "A", de: "Danke, finden wir auch! Wir sind zu dritt, jeder hat sein eigenes Zimmer, und es gibt 'ne große Küche. Willst du was trinken?", ko: "고마워, 우리도 그렇게 생각해. 셋이 사는데, 각자 자기 방이 있고 부엌도 커. 뭐 좀 마실래?" },
      { r: "B", de: "Gern, ein Wasser wär super. Sag mal, wie läuft das bei euch mit dem Putzen?", ko: "좋아, 물 한 잔이면 좋겠어. 근데 여기는 청소를 어떻게 해?" },
      { r: "A", de: "Wir haben 'nen Putzplan. Jeder ist eine Woche dran. Ist eigentlich recht entspannt.", ko: "청소 당번표가 있어. 한 사람씩 일주일씩 맡아. 사실 꽤 편한 편이야." },
      { r: "B", de: "Klingt gut. Ich bin ziemlich ordentlich, nur manchmal bleibt das Geschirr ein bisschen länger stehen.", ko: "좋네. 난 꽤 깔끔한 편인데, 가끔 설거지거리가 좀 오래 쌓여 있을 때가 있어." },
      { r: "A", de: "Haha, kenn ich. Dafür ist die Spülmaschine ja da. Und was machst du so beruflich?", ko: "하하, 그거 알지. 그러라고 식기세척기가 있는 거잖아. 그런데 너는 무슨 일 해?" },
      { r: "B", de: "Ich arbeite als Grafiker, meistens von zu Hause aus. Das heißt, ich bin tagsüber öfter da. Stört dich das?", ko: "그래픽 디자이너인데 주로 집에서 일해. 그러니까 낮에 집에 있을 때가 많아. 그게 신경 쓰여?" },
      { r: "A", de: "Überhaupt nicht. Tagsüber sind wir sowieso fast nie da. Hauptsache, du bist abends nicht zu laut.", ko: "전혀. 낮에는 어차피 우리가 거의 없어. 저녁에 너무 시끄럽지만 않으면 돼." },
      { r: "B", de: "Keine Sorge, ich bin eher der ruhige Typ. Was kostet das Zimmer denn im Monat?", ko: "걱정 마, 난 조용한 편이야. 그런데 방은 한 달에 얼마야?" },
      { r: "A", de: "Vierhundertfünfzig warm, also mit allem drin. Internet und Strom sind auch dabei.", ko: "관리비 포함 450유로야. 그러니까 전부 다 들어 있어. 인터넷이랑 전기도 포함이고." },
      { r: "B", de: "Das ist fair. Ich würd's gern nehmen. Wann erfahr ich denn, ob es klappt?", ko: "괜찮은 가격이네. 나 이 방으로 하고 싶어. 언제쯤 결과를 알 수 있어?" },
      { r: "A", de: "Wir melden uns bis Freitag bei dir. Aber mein Bauchgefühl sagt: Das passt.", ko: "금요일까지 연락할게. 근데 내 느낌상으로는 잘 맞을 것 같아." },
      { r: "B", de: "Super, ich freu mich! Vielen Dank für die Einladung.", ko: "좋아, 기대된다! 불러 줘서 정말 고마워." }
    ],
    umg: [
      { de: "Hi", t: 1, ko: "안녕 (가벼운 인사)", std: "Hallo", reg: "구어" },
      { de: "Komm rein", t: 1, ko: "들어와 (rein = herein)", std: "Komm herein", reg: "축약" },
      { de: "habt ihr's", t: 2, ko: "(집을) 꾸며 놓았다 (habt ihr es의 축약)", std: "habt ihr es", reg: "축약" },
      { de: "gedacht hab", t: 2, ko: "생각했던 (habe의 e 탈락)", std: "gedacht habe", reg: "축약" },
      { de: "'ne", t: 3, ko: "eine의 구어 축약", std: "eine", reg: "축약" },
      { de: "was trinken", t: 3, ko: "뭘 좀 마시다 (was = etwas)", std: "etwas trinken", reg: "축약" },
      { de: "wär super", t: 4, ko: "…면 아주 좋겠어 (wäre의 e 탈락, super = 아주 좋은)", std: "wäre sehr schön", reg: "구어" },
      { de: "Sag mal", t: 4, ko: "근데, 있잖아 (질문을 꺼낼 때)", std: "Sag mir bitte,", reg: "추임새" },
      { de: "wie läuft das", t: 4, ko: "어떻게 돌아가? 어떻게 해?", std: "wie ist das geregelt", reg: "구어" },
      { de: "'nen", t: 5, ko: "einen의 구어 축약", std: "einen", reg: "축약" },
      { de: "dran", t: 5, ko: "차례인, 당번인 (dran sein)", std: "an der Reihe", reg: "구어" },
      { de: "Ist eigentlich recht entspannt", t: 5, ko: "사실 꽤 편해 (주어 das가 빠짐, entspannt = 부담 없는)", std: "Das ist eigentlich recht unkompliziert.", reg: "구어" },
      { de: "Klingt gut", t: 6, ko: "좋네, 좋게 들려 (주어 das가 빠짐)", std: "Das klingt gut.", reg: "구어" },
      { de: "kenn ich", t: 7, ko: "그거 알지, 나도 그래 (주어 das가 빠지고 kenne의 e 탈락)", std: "Das kenne ich.", reg: "구어" },
      { de: "was machst du so beruflich", t: 7, ko: "일은 뭐 해? (so = 대략, 부드럽게 묻는 말)", std: "Was bist du von Beruf?", reg: "구어" },
      { de: "Hauptsache", t: 9, ko: "중요한 건 …야, …만 되면 돼", std: "Wichtig ist, dass", reg: "구어" },
      { de: "warm", t: 11, ko: "관리비 포함 (월세 Warmmiete)", std: "inklusive Nebenkosten", reg: "구어" },
      { de: "mit allem drin", t: 11, ko: "전부 다 포함해서", std: "alles inbegriffen", reg: "구어" },
      { de: "dabei", t: 11, ko: "포함된", std: "inbegriffen", reg: "구어" },
      { de: "würd's", t: 12, ko: "그걸 …하고 싶어 (würde es)", std: "würde es", reg: "축약" },
      { de: "erfahr ich", t: 12, ko: "내가 알게 되다 (erfahre의 e 탈락)", std: "erfahre ich", reg: "축약" },
      { de: "klappt", t: 12, ko: "잘 되다, 성사되다", std: "zustande kommt", reg: "구어" },
      { de: "Das passt", t: 13, ko: "잘 맞을 거야", std: "Wir passen gut zusammen.", reg: "구어" },
      { de: "Super", t: 14, ko: "좋아, 잘됐다", std: "Sehr schön", reg: "구어" },
      { de: "freu", t: 14, ko: "기대돼, 기뻐 (freue의 e 탈락)", std: "freue", reg: "축약" }
    ],
    redemittel: [
      { group: "집 보기", items: [
        { de: "Schön habt ihr's hier!", ko: "집 진짜 좋다!" },
        { de: "Willst du was trinken?", ko: "뭐 좀 마실래?" }
      ] },
      { group: "생활 규칙 묻기", items: [
        { de: "Wie läuft das bei euch mit dem Putzen?", ko: "여기는 청소를 어떻게 해?" },
        { de: "Jeder ist eine Woche dran.", ko: "한 사람씩 일주일씩 맡아." },
        { de: "Was kostet das Zimmer im Monat?", ko: "방은 한 달에 얼마야?" }
      ] },
      { group: "관심 표현 · 마무리", items: [
        { de: "Ich würd's gern nehmen.", ko: "이 방으로 하고 싶어." },
        { de: "Wann erfahr ich, ob es klappt?", ko: "언제쯤 결과를 알 수 있어?" },
        { de: "Mein Bauchgefühl sagt: Das passt.", ko: "내 느낌상으로는 잘 맞을 것 같아." }
      ] }
    ]
  },
  {
    no: 7, lv: "MZ",
    title: "Der Zug fällt aus", titleKo: "기차가 취소됐어", type: "Unterwegs", typeKo: "이동",
    intro: "기차가 취소돼 역에 발이 묶인 친구와 기다리는 친구가 전화로 약속 시간을 다시 맞추는 대화예요.",
    focus: ["'ne · 'nen · Gibt's", "Mensch · Du · Alles klar", "Mach ich · Meld dich"],
    roles: { A: "Lea", B: "Jonas" },
    turns: [
      { r: "A", de: "Hey Jonas, wo steckst du denn? Wir wollten uns doch um sieben treffen.", ko: "야 요나스, 어디야? 우리 7시에 만나기로 했잖아." },
      { r: "B", de: "Sorry, ich sitz noch am Bahnhof fest. Mein Zug fällt aus, und keiner sagt, was los ist.", ko: "미안, 나 아직 역에 발이 묶여 있어. 내 기차가 취소됐는데 아무도 무슨 일인지 말을 안 해 줘." },
      { r: "A", de: "Oh nein, nicht schon wieder! Gibt's denn 'ne andere Verbindung?", ko: "아 이런, 또야? 다른 연결편은 없어?" },
      { r: "B", de: "Der nächste Zug geht erst in vierzig Minuten. Dann bin ich frühestens um acht da.", ko: "다음 기차는 40분 뒤에나 가. 그럼 빨라야 8시에 도착해." },
      { r: "A", de: "Mensch, das ist ja ärgerlich. Soll ich schon mal 'nen Tisch reservieren?", ko: "아이고, 정말 짜증 나겠다. 내가 먼저 자리를 예약해 둘까?" },
      { r: "B", de: "Ja, mach das. Aber sag den anderen noch nicht, dass ich zu spät komm. Ich schreib ihnen gleich selbst.", ko: "응, 그렇게 해 줘. 근데 내가 늦는다는 건 다른 애들한테 아직 말하지 마. 내가 곧 직접 쓸게." },
      { r: "A", de: "Okay. Und hast du wenigstens was zu essen dabei? Bis acht ist das ja ewig.", ko: "알겠어. 그런데 먹을 건 가진 거 있어? 8시까지면 한참이잖아." },
      { r: "B", de: "Ich hol mir gleich 'ne Brezel am Kiosk. Das reicht erstmal.", ko: "곧 매점에서 브레첼 하나 사 먹을게. 일단은 그거면 돼." },
      { r: "A", de: "Gut. Ach, und nimm dir lieber 'nen Kaffee mit. Es ist ziemlich kalt draußen.", ko: "좋아. 아 그리고 커피도 하나 들고 가. 밖이 꽤 추워." },
      { r: "B", de: "Stimmt, danke für den Tipp. Du, ich muss auflegen, die sagen gerade was durch.", ko: "맞네, 알려 줘서 고마워. 있잖아, 나 끊어야 해. 지금 안내 방송이 나와." },
      { r: "A", de: "Alles klar, viel Glück! Meld dich, wenn du im Zug sitzt.", ko: "알았어, 행운을 빌어! 기차 타면 연락해." },
      { r: "B", de: "Mach ich. Bis später!", ko: "그럴게. 이따 봐!" }
    ],
    umg: [
      { de: "Hey", t: 1, ko: "안녕 (가벼운 인사)", std: "Hallo", reg: "구어" },
      { de: "wo steckst du", t: 1, ko: "어디에 있어? (stecken = 있다)", std: "wo bist du", reg: "구어" },
      { de: "Sorry", t: 2, ko: "미안", std: "Entschuldigung", reg: "구어" },
      { de: "sitz", t: 2, ko: "sitze의 e 탈락", std: "sitze", reg: "축약" },
      { de: "Gibt's", t: 3, ko: "gibt es의 축약", std: "Gibt es", reg: "축약" },
      { de: "'ne", t: [3, 8], ko: "eine의 구어 축약", std: "eine", reg: "축약" },
      { de: "Mensch", t: 5, ko: "아이고, 야 (놀람·아쉬움)", std: "Das ist wirklich schade.", reg: "추임새" },
      { de: "'nen", t: [5, 9], ko: "einen의 구어 축약", std: "einen", reg: "축약" },
      { de: "mach das", t: 6, ko: "그렇게 해 줘", std: "Bitte tu das.", reg: "구어" },
      { de: "komm", t: 6, ko: "komme의 e 탈락", std: "komme", reg: "축약" },
      { de: "was zu essen", t: 7, ko: "뭘 좀 먹을 것 (was = etwas)", std: "etwas zu essen", reg: "축약" },
      { de: "hol mir", t: 8, ko: "나한테 사 오다 (hole의 e 탈락)", std: "hole mir", reg: "축약" },
      { de: "erstmal", t: 8, ko: "일단, 우선", std: "zunächst", reg: "구어" },
      { de: "Du,", t: 10, ko: "있잖아 (말을 꺼낼 때)", std: "Hör mal,", reg: "추임새" },
      { de: "was durch", t: 10, ko: "방송으로 알리다 (was = etwas, durchsagen)", std: "etwas durchgesagt", reg: "구어" },
      { de: "Alles klar", t: 11, ko: "알았어, 좋아", std: "In Ordnung", reg: "구어" },
      { de: "Meld dich", t: 11, ko: "연락해 (melde의 e 탈락)", std: "Melde dich", reg: "축약" },
      { de: "Mach ich", t: 12, ko: "그럴게 (주어 das가 빠짐)", std: "Das mache ich.", reg: "구어" }
    ],
    redemittel: [
      { group: "늦는다고 알리기", items: [
        { de: "Wo steckst du denn?", ko: "어디야?" },
        { de: "Ich sitz noch am Bahnhof fest.", ko: "나 아직 역에 발이 묶여 있어." }
      ] },
      { group: "대안 찾기", items: [
        { de: "Gibt's 'ne andere Verbindung?", ko: "다른 연결편은 없어?" },
        { de: "Dann bin ich frühestens um acht da.", ko: "그럼 빨라야 8시에 도착해." }
      ] },
      { group: "연락 주고받기", items: [
        { de: "Meld dich, wenn du im Zug sitzt.", ko: "기차 타면 연락해." },
        { de: "Mach ich. Bis später!", ko: "그럴게. 이따 봐!" }
      ] }
    ]
  },
  {
    no: 8, lv: "MZ",
    title: "Das Meeting verschieben", titleKo: "회의 시간 옮기기", type: "Kollegen", typeKo: "직장 동료",
    intro: "아침 회의가 어려운 동료가 시간을 옮겨 달라고 부탁하고, 다른 사람들에게 알리는 방법을 정하는 대화예요.",
    focus: ["Hast du mal 'nen Moment?", "halb drei · checken", "Ich mach das schon"],
    roles: { A: "Sandra", B: "Markus" },
    turns: [
      { r: "A", de: "Hast du mal 'nen Moment? Ich hab 'ne Frage wegen morgen.", ko: "잠깐 시간 돼? 내일 일 때문에 물어볼 게 있어." },
      { r: "B", de: "Klar, schieß los. Was gibt's denn?", ko: "그럼, 말해 봐. 무슨 일인데?" },
      { r: "A", de: "Unser Meeting um neun passt mir leider nicht. Ich muss morgen früh noch mein Auto in die Werkstatt bringen.", ko: "9시 회의가 나한테는 안 맞아. 내일 아침에 차를 정비소에 맡겨야 하거든." },
      { r: "B", de: "Kein Problem, wir können das auch verschieben. Wann würd's dir denn besser passen?", ko: "문제없어, 옮겨도 돼. 언제가 더 편해?" },
      { r: "A", de: "Vielleicht am Nachmittag? So gegen zwei oder halb drei?", ko: "오후는 어때? 2시나 2시 반쯤?" },
      { r: "B", de: "Zwei ist okay. Aber ich muss kurz checken, ob die anderen da auch können.", ko: "2시 좋아. 근데 다른 사람들도 그때 되는지 잠깐 확인해 봐야 해." },
      { r: "A", de: "Super, das wär nett. Soll ich 'ne Mail schreiben, oder machst du das?", ko: "좋아, 그래 주면 고맙지. 내가 메일을 쓸까, 아니면 네가 할래?" },
      { r: "B", de: "Ich mach das schon. Ich schick gleich 'ne Nachricht in die Gruppe.", ko: "내가 할게. 곧 단체방에 메시지 보낼게." },
      { r: "A", de: "Danke dir! Du rettest mir echt den Tag.", ko: "고마워! 너 덕분에 정말 살았어." },
      { r: "B", de: "Gern geschehen. Übrigens, hast du schon die Zahlen für die Präsentation?", ko: "별말씀을. 그나저나 발표 자료에 쓸 숫자는 벌써 받았어?" },
      { r: "A", de: "Noch nicht ganz. Ich warte noch auf die Daten vom Vertrieb, die kommen wohl erst morgen.", ko: "아직 다는 아니야. 영업팀 데이터를 기다리는 중인데, 내일에야 올 것 같아." },
      { r: "B", de: "Na ja, dann bleibt ja genug Zeit. Bis morgen um zwei also!", ko: "뭐, 그럼 시간은 충분하네. 그럼 내일 2시에 보자!" }
    ],
    umg: [
      { de: "mal 'nen Moment", t: 1, ko: "잠깐 (mal은 부드럽게 만드는 말, 'nen = einen)", std: "einen Moment Zeit", reg: "축약" },
      { de: "hab", t: 1, ko: "habe의 e 탈락", std: "habe", reg: "축약" },
      { de: "'ne", t: [1, 7, 8], ko: "eine의 구어 축약", std: "eine", reg: "축약" },
      { de: "schieß los", t: 2, ko: "말해 봐, 시작해", std: "Sag, worum es geht.", reg: "구어" },
      { de: "Was gibt's", t: 2, ko: "무슨 일이야? (gibt es의 축약)", std: "Was gibt es?", reg: "구어" },
      { de: "würd's", t: 4, ko: "würde es의 축약", std: "würde es", reg: "축약" },
      { de: "halb drei", t: 5, ko: "2시 반 (독일어는 '3시로 가는 반'이라고 말함)", std: "vierzehn Uhr dreißig", reg: "구어" },
      { de: "checken", t: 6, ko: "확인하다 (영어 check에서 온 말)", std: "überprüfen", reg: "구어" },
      { de: "wär", t: 7, ko: "wäre의 e 탈락", std: "wäre", reg: "축약" },
      { de: "Ich mach das schon", t: 8, ko: "내가 할게 (schon = 걱정 마)", std: "Ich übernehme das.", reg: "구어" },
      { de: "schick", t: 8, ko: "schicke의 e 탈락", std: "schicke", reg: "축약" },
      { de: "Danke dir", t: 9, ko: "고마워 (dir를 붙여 친근하게)", std: "Danke schön", reg: "구어" },
      { de: "rettest mir echt den Tag", t: 9, ko: "큰 도움이 됐어 (직역: 내 하루를 구했어)", std: "Du hilfst mir sehr.", reg: "구어" },
      { de: "Noch nicht ganz", t: 11, ko: "아직 다는 아니야 (주어 생략)", std: "Ich habe sie noch nicht vollständig.", reg: "구어" },
      { de: "wohl", t: 11, ko: "아마 …일 거야", std: "vermutlich", reg: "구어" },
      { de: "Na ja", t: 12, ko: "뭐, 글쎄 (망설이거나 받아들일 때)", std: "Nun", reg: "추임새" }
    ],
    redemittel: [
      { group: "부탁하기", items: [
        { de: "Hast du mal 'nen Moment?", ko: "잠깐 시간 돼?" },
        { de: "Ich hab 'ne Frage wegen morgen.", ko: "내일 일 때문에 물어볼 게 있어." }
      ] },
      { group: "시간 조정하기", items: [
        { de: "Wann würd's dir besser passen?", ko: "언제가 더 편해?" },
        { de: "So gegen zwei oder halb drei?", ko: "2시나 2시 반쯤?" }
      ] },
      { group: "일 나누기", items: [
        { de: "Ich mach das schon.", ko: "내가 할게." },
        { de: "Du rettest mir echt den Tag.", ko: "너 덕분에 정말 살았어." }
      ] }
    ]
  },
  {
    no: 9, lv: "MZ",
    title: "Kochen für Freunde", titleKo: "친구들에게 요리해 주기", type: "Essen", typeKo: "음식",
    intro: "집에 손님을 초대한 사람이 형제와 메뉴를 정하고, 장보기와 후식을 나누는 대화예요.",
    focus: ["'ne Menge · Die isst", "Das kriegen wir hin", "wär der Hammer"],
    roles: { A: "Nina", B: "Felix" },
    turns: [
      { r: "A", de: "Du, ich hab am Samstag Leute zum Essen eingeladen. Kannst du mir beim Kochen helfen?", ko: "있잖아, 토요일에 사람들을 식사에 초대했어. 요리하는 거 좀 도와줄래?" },
      { r: "B", de: "Klar, gern. Wie viele kommen denn?", ko: "물론, 좋아. 몇 명 오는데?" },
      { r: "A", de: "So acht oder neun. Ich dachte an 'ne Lasagne, die geht immer.", ko: "한 8~9명쯤. 라자냐를 생각했어, 그건 언제나 무난하잖아." },
      { r: "B", de: "Gute Idee. Aber was ist mit Valentina? Die isst doch kein Fleisch.", ko: "좋은 생각이야. 근데 발렌티나는 어떡해? 걔 고기 안 먹잖아." },
      { r: "A", de: "Stimmt, daran hab ich gar nicht gedacht. Dann mach ich einfach 'ne zweite mit Spinat und Käse.", ko: "맞다, 그건 전혀 생각 못 했네. 그럼 시금치랑 치즈 넣은 걸 하나 더 만들지 뭐." },
      { r: "B", de: "Das kriegen wir hin. Hast du denn schon alles zu Hause?", ko: "그건 해낼 수 있어. 근데 재료는 벌써 다 집에 있어?" },
      { r: "A", de: "Nee, so gut wie nichts. Ich muss noch Hackfleisch, Tomaten und 'ne Menge Käse besorgen.", ko: "아니, 거의 아무것도 없어. 다진 고기, 토마토, 치즈를 잔뜩 사야 해." },
      { r: "B", de: "Dann fahr ich morgen nach der Arbeit schnell zum Supermarkt. Schreib mir einfach 'ne Liste.", ko: "그럼 내가 내일 퇴근하고 마트에 얼른 갈게. 목록만 하나 써 줘." },
      { r: "A", de: "Mach ich gleich. Und denk bitte dran, Wein mitzubringen. Rot oder weiß ist egal.", ko: "바로 써 줄게. 그리고 와인 사 오는 것 잊지 마. 레드든 화이트든 상관없어." },
      { r: "B", de: "Alles klar. Soll ich auch 'nen Nachtisch machen? Ich könnt ja Tiramisu machen.", ko: "알았어. 후식도 내가 만들까? 티라미수를 만들 수도 있겠네." },
      { r: "A", de: "Oh ja, das wär der Hammer! Aber nur, wenn's dir nicht zu viel wird.", ko: "오 좋아, 그럼 최고지! 근데 너한테 너무 부담이 안 될 때만." },
      { r: "B", de: "Passt schon, das mach ich gern. Dann wird das ein richtig schöner Abend.", ko: "괜찮아, 기꺼이 할게. 그럼 정말 좋은 저녁이 되겠다." }
    ],
    umg: [
      { de: "Du,", t: 1, ko: "있잖아 (말을 꺼낼 때)", std: "Hör mal,", reg: "추임새" },
      { de: "hab", t: [1, 5], ko: "habe의 e 탈락", std: "habe", reg: "축약" },
      { de: "Leute", t: 1, ko: "사람들 (여기서는 손님들)", std: "Gäste", reg: "구어" },
      { de: "Klar", t: 2, ko: "물론", std: "Natürlich", reg: "구어" },
      { de: "So acht oder neun", t: 3, ko: "한 8~9명쯤 (so = 대략)", std: "Ungefähr acht oder neun", reg: "구어" },
      { de: "'ne", t: [3, 5, 7, 8], ko: "eine의 구어 축약", std: "eine", reg: "축약" },
      { de: "die geht immer", t: 3, ko: "언제나 무난해, 어느 자리에나 어울려", std: "Die passt immer.", reg: "구어" },
      { de: "Die isst", t: 4, ko: "걔는 먹어 (die = 그 사람을 가리키는 말)", std: "Sie isst", reg: "구어" },
      { de: "Das kriegen wir hin", t: 6, ko: "우리가 해낼 수 있어", std: "Das schaffen wir.", reg: "구어" },
      { de: "Nee", t: 7, ko: "아니 (Nein의 구어)", std: "Nein", reg: "구어" },
      { de: "fahr", t: 8, ko: "fahre의 e 탈락", std: "fahre", reg: "축약" },
      { de: "Mach ich gleich", t: 9, ko: "바로 할게 (주어 das가 빠짐)", std: "Das mache ich gleich.", reg: "구어" },
      { de: "denk bitte dran", t: 9, ko: "잊지 말고 기억해 (dran = daran)", std: "denke bitte daran", reg: "축약" },
      { de: "egal", t: 9, ko: "상관없어", std: "gleichgültig", reg: "구어" },
      { de: "Alles klar", t: 10, ko: "알았어, 좋아", std: "In Ordnung", reg: "구어" },
      { de: "'nen", t: 10, ko: "einen의 구어 축약", std: "einen", reg: "축약" },
      { de: "könnt", t: 10, ko: "könnte의 e 탈락", std: "könnte", reg: "축약" },
      { de: "wär der Hammer", t: 11, ko: "최고일 거야 (der Hammer = 아주 대단한 것)", std: "wäre fantastisch", reg: "구어" },
      { de: "wenn's", t: 11, ko: "wenn es의 축약", std: "wenn es", reg: "축약" },
      { de: "Passt schon", t: 12, ko: "괜찮아", std: "Das ist in Ordnung.", reg: "구어" }
    ],
    redemittel: [
      { group: "초대와 부탁", items: [
        { de: "Ich hab Leute zum Essen eingeladen.", ko: "사람들을 식사에 초대했어." },
        { de: "Kannst du mir beim Kochen helfen?", ko: "요리하는 거 도와줄래?" }
      ] },
      { group: "메뉴 정하기", items: [
        { de: "Ich dachte an 'ne Lasagne, die geht immer.", ko: "라자냐를 생각했어, 그건 언제나 무난해." },
        { de: "Das kriegen wir hin.", ko: "우리가 해낼 수 있어." }
      ] },
      { group: "나누어 맡기", items: [
        { de: "Schreib mir einfach 'ne Liste.", ko: "목록만 하나 써 줘." },
        { de: "Das wär der Hammer!", ko: "그럼 최고지!" }
      ] }
    ]
  }
];
