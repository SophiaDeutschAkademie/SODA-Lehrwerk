/* SODA SPRECHTRAINING · B2 대화문 */
window.DIALOG_DATA = window.DIALOG_DATA || {};
window.DIALOG_DATA.B2 = [
  {
    no: 1, lv: "B2",
    title: "Das Bewerbungsgespräch", titleKo: "면접", type: "Beruf", typeKo: "직장",
    intro: "지원자가 자신의 경험을 설명하고 회사에 궁금한 점을 묻는 면접 대화예요.",
    focus: ["면접", "경험 설명", "Passiversatz: ließen sich"],
    roles: { A: "Personalleiterin", B: "Bewerber" },
    turns: [
      { r: "A", de: "Herr Choi, in Ihrem Lebenslauf steht, dass Sie ein Projekt geleitet haben. Könnten Sie das genauer erläutern?", ko: "최 씨, 이력서를 보니 프로젝트를 이끈 경험이 있으시네요. 조금 더 자세히 설명해 주실 수 있을까요?" },
      { r: "B", de: "Gern. Vor zwei Jahren habe ich ein Team von fünf Personen geleitet, das ein neues Lagerverwaltungssystem einführen sollte. Dabei zeigte sich, dass die Kommunikation zwischen den Abteilungen das größte Hindernis war.", ko: "네, 말씀드리겠습니다. 2년 전에 새 재고 관리 시스템 도입을 맡은 5명 규모의 팀을 이끌었습니다. 그 과정에서 부서 간 소통이 가장 큰 걸림돌이라는 점이 드러났습니다." },
      { r: "A", de: "Wie sind Sie mit diesem Problem umgegangen?", ko: "그 문제는 어떻게 해결하셨어요?" },
      { r: "B", de: "Ich habe wöchentliche Besprechungen eingeführt, in denen jede Abteilung kurz über den aktuellen Stand berichtete. Dadurch ließen sich Missverständnisse früh klären.", ko: "매주 회의를 열어 각 부서가 진행 상황을 짧게 보고하도록 했습니다. 그 덕분에 오해를 일찍 풀 수 있었습니다." },
      { r: "A", de: "Das klingt sinnvoll. Wie reagieren Sie, wenn Ihre Vorschläge abgelehnt werden?", ko: "합리적인 방법이네요. 제안이 받아들여지지 않으면 어떻게 대응하세요?" },
      { r: "B", de: "Ich nehme Kritik ernst und versuche zunächst, die Gründe zu verstehen. Wenn ich überzeugt bin, dass meine Idee besser ist, argumentiere ich sachlich – zugleich bin ich aber bereit, Kompromisse einzugehen.", ko: "비판은 진지하게 받아들이고, 먼저 그 이유를 이해하려고 합니다. 제 아이디어가 더 낫다고 확신하면 근거를 들어 차분하게 설명합니다. 그러면서도 타협할 자세는 갖추고 있습니다." },
      { r: "A", de: "Und was erwarten Sie von dieser Stelle?", ko: "그럼 이 자리에 어떤 기대를 갖고 계세요?" },
      { r: "B", de: "Ich wünsche mir eine Aufgabe, bei der ich Verantwortung übernehmen kann. Außerdem möchte ich mich im Unternehmen langfristig weiterentwickeln.", ko: "책임을 맡을 수 있는 업무를 바랍니다. 또 이 회사에서 오래 일하며 성장하고 싶습니다." },
      { r: "A", de: "Haben Sie noch Fragen an uns?", ko: "저희에게 궁금한 점이 더 있으세요?" },
      { r: "B", de: "Ja, mich würde interessieren, wie die Zusammenarbeit zwischen den Standorten organisiert ist.", ko: "네, 지점 간 협업이 어떤 방식으로 이루어지는지 궁금합니다." },
      { r: "A", de: "Gute Frage. Wir koordinieren das über eine wöchentliche Videokonferenz und gemeinsame Projektteams.", ko: "좋은 질문이에요. 매주 하는 화상 회의와 공동 프로젝트팀을 통해 조율하고 있어요." },
      { r: "B", de: "Das klingt gut. Ich freue mich auf Ihre Rückmeldung.", ko: "좋습니다. 연락 기다리겠습니다." },
      { r: "A", de: "Vielen Dank, Herr Choi. Wir melden uns innerhalb von zwei Wochen bei Ihnen.", ko: "감사합니다, 최 씨. 2주 안에 연락드릴게요." }
    ],
    redemittel: [
      { group: "설명 요청", items: [
        { de: "Könnten Sie das genauer erläutern?", ko: "조금 더 자세히 설명해 주실 수 있을까요?" }
      ] },
      { group: "경험 설명", items: [
        { de: "Dabei zeigte sich, dass …", ko: "그 과정에서 …라는 점이 드러났습니다." },
        { de: "Dadurch ließen sich … klären.", ko: "그 덕분에 …을 풀 수 있었습니다." }
      ] },
      { group: "비판에 대한 태도", items: [
        { de: "Ich nehme Kritik ernst und versuche, die Gründe zu verstehen.", ko: "비판은 진지하게 받아들이고 그 이유를 이해하려고 합니다." },
        { de: "Wenn …, argumentiere ich sachlich.", ko: "…하면 근거를 들어 차분하게 설명합니다." }
      ] },
      { group: "기대와 포부", items: [
        { de: "Ich wünsche mir …", ko: "…을 바랍니다." },
        { de: "Ich möchte mich langfristig weiterentwickeln.", ko: "오래 일하며 성장하고 싶습니다." }
      ] },
      { group: "질문하기", items: [
        { de: "Mich würde interessieren, wie …", ko: "…이 어떻게 이루어지는지 궁금합니다." }
      ] },
      { group: "마무리", items: [
        { de: "Wir melden uns innerhalb von … bei Ihnen.", ko: "… 안에 연락드릴게요." },
        { de: "Ich freue mich auf Ihre Rückmeldung.", ko: "연락 기다리겠습니다." }
      ] }
    ]
  },

  {
    no: 2, lv: "B2",
    title: "Die Gehaltsverhandlung", titleKo: "연봉 협상", type: "Beruf", typeKo: "직장",
    intro: "성과를 근거로 급여 인상을 요구하고 절충안을 찾는 대화예요.",
    focus: ["협상", "조건문: wenn · sofern", "논거 제시"],
    roles: { A: "Mitarbeiterin", B: "Vorgesetzter" },
    turns: [
      { r: "A", de: "Danke, dass Sie sich Zeit für das Gespräch nehmen. Ich würde gern über meine Gehaltsentwicklung sprechen.", ko: "면담 시간을 내 주셔서 감사합니다. 제 급여 조정에 대해 말씀드리고 싶습니다." },
      { r: "B", de: "Natürlich, Frau Berger. Was haben Sie sich vorgestellt?", ko: "물론이죠, 베르거 씨. 어떻게 생각하고 계세요?" },
      { r: "A", de: "Seit meinem Eintritt vor drei Jahren habe ich mein Aufgabengebiet deutlich erweitert. Ich leite mittlerweile das Kundenprojekt und betreue zwei Praktikanten. Mein Gehalt ist dabei aber gleich geblieben.", ko: "3년 전 입사한 뒤로 업무 범위를 크게 넓혀 왔습니다. 지금은 고객 프로젝트를 이끌고 인턴 두 명도 지도하고 있습니다. 그런데 급여는 그대로입니다." },
      { r: "B", de: "Ihre Arbeit wird sehr geschätzt, das möchte ich vorweg sagen. Allerdings ist das Budget in diesem Jahr knapp. Woran haben Sie denn konkret gedacht?", ko: "먼저 말씀드리자면 베르거 씨의 업무는 높이 평가받고 있어요. 다만 올해는 예산이 빠듯해요. 구체적으로 어느 정도를 생각하셨어요?" },
      { r: "A", de: "Auf Basis von Gehaltsvergleichen in unserer Branche halte ich eine Erhöhung von zehn Prozent für angemessen.", ko: "업계 급여 수준을 비교해 보면 10퍼센트 인상이 적절하다고 생각합니다." },
      { r: "B", de: "Zehn Prozent sind für uns derzeit schwer zu stemmen. Wir könnten uns eher auf fünf Prozent einigen.", ko: "10퍼센트는 지금 저희로서는 감당하기 어려워요. 5퍼센트라면 합의할 수 있을 것 같아요." },
      { r: "A", de: "Fünf Prozent liegen unter dem, was ich für gerechtfertigt halte. Ich wäre aber bereit, mich auf sieben Prozent zu einigen, wenn wir zusätzlich über Weiterbildungsmöglichkeiten sprechen könnten.", ko: "5퍼센트는 제가 타당하다고 보는 수준보다 낮습니다. 다만 교육 기회에 대해서도 함께 이야기할 수 있다면 7퍼센트로 합의할 용의가 있습니다." },
      { r: "B", de: "Das ist ein interessanter Gedanke. Eine Weiterbildung zu finanzieren wäre für uns leichter als eine dauerhafte Gehaltserhöhung. Welche Weiterbildung schwebt Ihnen vor?", ko: "흥미로운 생각이네요. 저희로서는 급여를 계속 올려 드리는 것보다 교육비를 지원하는 편이 부담이 덜해요. 어떤 교육을 생각하고 계세요?" },
      { r: "A", de: "Ein Zertifikatskurs im Projektmanagement. Er würde mich dafür qualifizieren, noch größere Projekte zu verantworten, wovon auch das Unternehmen profitieren würde.", ko: "프로젝트 관리 자격 과정입니다. 이 과정을 마치면 더 큰 프로젝트도 책임질 수 있게 되고, 회사에도 도움이 될 겁니다." },
      { r: "B", de: "Dafür bin ich grundsätzlich offen. Ich schlage vor: Wir vereinbaren sechs Prozent ab Januar, und das Unternehmen übernimmt die Kosten für den Kurs – sofern Sie sich verpflichten, mindestens zwei Jahre bei uns zu bleiben.", ko: "그 부분은 기본적으로 긍정적으로 생각해요. 이렇게 제안할게요. 1월부터 6퍼센트를 인상하고, 과정 비용은 회사가 부담하는 거예요. 단, 최소 2년은 회사에 남겠다고 약속해 주셔야 해요." },
      { r: "A", de: "Das klingt nach einer fairen Lösung. Darf ich bis morgen darüber nachdenken?", ko: "공정한 방안인 것 같습니다. 내일까지 생각해 봐도 될까요?" },
      { r: "B", de: "Selbstverständlich. Geben Sie mir bitte bis morgen Bescheid, dann bereite ich die Zusatzvereinbarung vor.", ko: "물론이죠. 내일까지 알려 주시면 추가 약정서를 준비할게요." }
    ],
    redemittel: [
      { group: "대화 시작", items: [
        { de: "Ich würde gern über meine Gehaltsentwicklung sprechen.", ko: "제 급여 조정에 대해 말씀드리고 싶습니다." }
      ] },
      { group: "성과 제시", items: [
        { de: "Seit meinem Eintritt habe ich mein Aufgabengebiet deutlich erweitert.", ko: "입사한 뒤로 업무 범위를 크게 넓혀 왔습니다." }
      ] },
      { group: "요구 근거", items: [
        { de: "Auf Basis von … halte ich … für angemessen.", ko: "…을 근거로 보면 …이 적절하다고 생각합니다." }
      ] },
      { group: "상대 제안", items: [
        { de: "Wir könnten uns eher auf … einigen.", ko: "…라면 합의할 수 있을 것 같아요." },
        { de: "Das ist für uns derzeit schwer zu stemmen.", ko: "지금 저희로서는 감당하기 어려워요." }
      ] },
      { group: "절충", items: [
        { de: "Ich wäre bereit, mich auf … zu einigen, wenn …", ko: "…한다면 …로 합의할 용의가 있습니다." },
        { de: "…, sofern Sie sich verpflichten, …", ko: "단, …하겠다고 약속해 주셔야 해요." }
      ] },
      { group: "결정 유보", items: [
        { de: "Darf ich bis morgen darüber nachdenken?", ko: "내일까지 생각해 봐도 될까요?" }
      ] }
    ]
  },

  {
    no: 3, lv: "B2",
    title: "Konflikt im Team", titleKo: "팀 내 갈등 풀기", type: "Beruf", typeKo: "직장",
    intro: "팀장이 갈등을 겪는 직원의 이야기를 듣고 중재 방법을 정하는 대화예요.",
    focus: ["갈등 다루기", "중재하기", "ohne … zu · damit"],
    roles: { A: "Teamleiterin", B: "Mitarbeiter" },
    turns: [
      { r: "A", de: "Danke, dass Sie gekommen sind, Herr Winter. Mir ist aufgefallen, dass die Stimmung im Team in den letzten Wochen angespannt ist. Können Sie mir schildern, wie Sie die Situation erleben?", ko: "와 주셔서 고마워요, 빈터 씨. 최근 몇 주 동안 팀 분위기가 긴장돼 있다는 게 눈에 띄었어요. 빈터 씨는 지금 상황을 어떻게 느끼고 계신지 말씀해 주시겠어요?" },
      { r: "B", de: "Ehrlich gesagt fühle ich mich übergangen. Frau Roth hat bei der letzten Präsentation meine Analyse verwendet, ohne mich zu erwähnen. Das hat mich sehr geärgert.", ko: "솔직히 무시당한 기분이에요. 로트 씨가 지난 발표에서 제 분석을 쓰면서 제 이름은 언급하지 않았거든요. 그 일로 정말 화가 났어요." },
      { r: "A", de: "Verstehe. Haben Sie schon mit Frau Roth darüber gesprochen?", ko: "그렇군요. 로트 씨와 그 이야기를 해 보셨어요?" },
      { r: "B", de: "Nein, bisher nicht. Ich wollte keinen Streit anfangen, aber inzwischen kann ich mich kaum noch konzentrieren, wenn sie im Raum ist.", ko: "아니요, 아직이요. 괜히 다툼을 만들고 싶지 않았어요. 그런데 이제는 그분이 같은 공간에 있으면 집중이 거의 안 돼요." },
      { r: "A", de: "Ich verstehe, dass Sie das belastet. Ich möchte aber auch ihre Sicht hören, bevor wir Schlüsse ziehen. Es könnte auch ein Missverständnis sein.", ko: "그 일로 마음이 무거우신 건 이해해요. 하지만 결론을 내리기 전에 로트 씨의 입장도 들어 보고 싶어요. 오해일 수도 있으니까요." },
      { r: "B", de: "Möglich. Aber wie kann ein Missverständnis dazu führen, dass jemand die Arbeit anderer als seine eigene ausgibt?", ko: "그럴 수도 있죠. 하지만 오해가 있었다고 해서 어떻게 남의 작업을 자기 것처럼 내놓게 되죠?" },
      { r: "A", de: "Ich unterstelle niemandem etwas, dazu weiß ich zu wenig. Mein Vorschlag: Wir führen zu dritt ein Gespräch, in dem jeder in Ruhe seine Sicht darlegt. Ich moderiere, damit es sachlich bleibt.", ko: "저는 누구에게 잘못이 있다고 단정하지 않아요. 그러기엔 제가 아는 게 너무 적어요. 제 제안은 이래요. 셋이 함께 이야기하는 자리를 만들어 각자 차분하게 자기 입장을 설명하는 거예요. 감정적으로 흐르지 않도록 진행은 제가 맡을게요." },
      { r: "B", de: "Das würde ich mir wünschen. Wichtig wäre mir, dass es nicht wie eine Beschuldigung wirkt.", ko: "그렇게 해 주시면 좋겠어요. 다만 누군가를 탓하는 자리처럼 보이지 않았으면 해요. 그게 저한테는 중요해요." },
      { r: "A", de: "Das verspreche ich Ihnen. Wir legen Regeln für das Gespräch fest: ausreden lassen, Ich-Botschaften verwenden und keine alten Vorwürfe aufwärmen.", ko: "약속드릴게요. 대화 규칙도 정해 두겠어요. 상대가 말을 끝까지 하게 두기, 나 전달법으로 말하기, 지난 일을 다시 꺼내 탓하지 않기예요." },
      { r: "B", de: "Einverstanden. Und was passiert, wenn wir uns nicht einigen können?", ko: "좋아요. 그런데 합의가 안 되면 어떻게 되나요?" },
      { r: "A", de: "Dann überlegen wir gemeinsam, wie die Zusammenarbeit künftig klarer geregelt werden kann, zum Beispiel durch festgelegte Zuständigkeiten und Quellenangaben in Präsentationen.", ko: "그때는 앞으로 협업 방식을 어떻게 더 분명하게 정할지 함께 고민해요. 예를 들면 담당 업무를 확실히 나누고 발표 자료에 출처를 밝히는 식으로요." },
      { r: "B", de: "Das klingt vernünftig. Ich bin bereit, es zu versuchen.", ko: "합리적인 방법이네요. 한번 해 볼게요." },
      { r: "A", de: "Gut. Ich lade Sie und Frau Roth für Donnerstag zu einem Gespräch ein und schicke Ihnen vorher eine kurze Agenda.", ko: "좋아요. 목요일에 로트 씨와 함께 이야기하는 자리를 마련하고, 그 전에 간단한 안건을 보내 드릴게요." }
    ],
    redemittel: [
      { group: "상황 듣기", items: [
        { de: "Können Sie mir schildern, wie Sie die Situation erleben?", ko: "지금 상황을 어떻게 느끼고 계신지 말씀해 주시겠어요?" }
      ] },
      { group: "감정 말하기", items: [
        { de: "Ich fühle mich übergangen.", ko: "무시당한 기분이에요." },
        { de: "Das hat mich sehr geärgert.", ko: "그 일로 정말 화가 났어요." }
      ] },
      { group: "중재", items: [
        { de: "Ich möchte auch ihre Sicht hören, bevor wir Schlüsse ziehen.", ko: "결론을 내리기 전에 그분의 입장도 들어 보고 싶어요." },
        { de: "Ich unterstelle niemandem etwas.", ko: "저는 누구에게 잘못이 있다고 단정하지 않아요." }
      ] },
      { group: "제안 · 규칙", items: [
        { de: "Mein Vorschlag: Wir führen zu dritt ein Gespräch.", ko: "제 제안은 셋이 함께 이야기하는 거예요." },
        { de: "Ich moderiere, damit es sachlich bleibt.", ko: "감정적으로 흐르지 않도록 진행은 제가 맡을게요." }
      ] },
      { group: "조건 · 동의", items: [
        { de: "Wichtig wäre mir, dass …", ko: "저한테는 …이 중요해요." },
        { de: "Ich bin bereit, es zu versuchen.", ko: "한번 해 볼게요." }
      ] }
    ]
  },

  {
    no: 4, lv: "B2",
    title: "Studienberatung", titleKo: "독일 대학원 유학 상담", type: "Beratung", typeKo: "상담",
    intro: "독일 석사 과정의 입학 조건, 비용, 준비 절차를 문의하는 대화예요.",
    focus: ["상담 대화", "Passiv", "간접 의문문"],
    roles: { A: "Studienberaterin", B: "Interessent" },
    turns: [
      { r: "A", de: "Guten Tag, Herr Han. Sie möchten sich über ein Masterstudium in Deutschland informieren?", ko: "안녕하세요, 한 씨. 독일 석사 과정에 대해 알아보고 싶으시다고요?" },
      { r: "B", de: "Ja, genau. Ich habe in Korea meinen Bachelor in Maschinenbau gemacht und würde gern einen Master in Deutschland anschließen. Ich weiß aber nicht, welche Voraussetzungen ich erfüllen muss.", ko: "네, 맞아요. 한국에서 기계공학 학사를 마쳤고, 독일에서 석사를 이어서 하고 싶어요. 그런데 어떤 조건을 갖춰야 하는지 모르겠어요." },
      { r: "A", de: "Zunächst wird Ihr Abschluss auf Gleichwertigkeit geprüft. Das übernimmt in der Regel die Hochschule, an der Sie sich bewerben. Haben Sie Ihre Zeugnisse bereits beglaubigt übersetzen lassen?", ko: "먼저 학위가 독일 학위와 동등한지 심사를 받아요. 보통은 지원하는 대학에서 맡아서 해요. 증명서는 벌써 공증 번역을 받아 두셨어요?" },
      { r: "B", de: "Noch nicht. Muss ich das vor der Bewerbung erledigen?", ko: "아직이요. 지원하기 전에 해 둬야 하나요?" },
      { r: "A", de: "Meistens ja, zumindest bei den Unterlagen, die nicht auf Deutsch oder Englisch sind. Auch Ihre Sprachkenntnisse müssen Sie nachweisen. Für deutschsprachige Studiengänge wird häufig Deutsch auf C1-Niveau verlangt, nachgewiesen zum Beispiel durch den TestDaF oder die DSH.", ko: "대부분 그래요. 적어도 독일어나 영어로 되어 있지 않은 서류는요. 어학 능력도 증명해야 해요. 독일어로 수업하는 과정은 흔히 C1 수준의 독일어를 요구하는데, 예를 들어 TestDaF나 DSH로 증명해요." },
      { r: "B", de: "Gibt es auch englischsprachige Masterstudiengänge? Mein Deutsch ist erst auf B2-Niveau.", ko: "영어로 수업하는 석사 과정도 있나요? 제 독일어는 아직 B2 수준이에요." },
      { r: "A", de: "Ja, davon gibt es inzwischen viele, vor allem in den Ingenieurwissenschaften. Allerdings sollten Sie bedenken, dass Deutschkenntnisse im Alltag und bei der Jobsuche dennoch wichtig bleiben.", ko: "네, 요즘은 특히 공학 분야에 많아요. 다만 일상생활이나 일자리를 구할 때는 그래도 독일어가 중요하다는 점을 생각하셔야 해요." },
      { r: "B", de: "Das leuchtet mir ein. Wie sieht es mit den Kosten aus? Muss ich Studiengebühren zahlen?", ko: "듣고 보니 그러네요. 비용은 어떤가요? 등록금을 내야 하나요?" },
      { r: "A", de: "An den meisten öffentlichen Hochschulen fallen keine Studiengebühren an, nur ein Semesterbeitrag. In einzelnen Bundesländern, etwa in Baden-Württemberg, zahlen Studierende aus Nicht-EU-Ländern allerdings Studiengebühren. Außerdem müssen Sie für das Visum nachweisen, dass Sie Ihren Lebensunterhalt finanzieren können.", ko: "대부분의 공립 대학은 등록금이 없고 학기 분담금만 내요. 다만 바덴뷔르템베르크처럼 일부 주에서는 EU 밖에서 온 학생이 등록금을 내요. 그리고 비자를 받으려면 생활비를 감당할 수 있다는 걸 증명해야 해요." },
      { r: "B", de: "Und darf man neben dem Studium arbeiten?", ko: "그리고 학업과 병행해서 일해도 되나요?" },
      { r: "A", de: "Ja, in begrenztem Umfang. Die genauen Regeln sollten Sie aber vor der Einreise prüfen, zum Beispiel auf der Website der deutschen Botschaft, weil sie sich ändern können.", ko: "네, 정해진 범위 안에서는 돼요. 다만 규정이 바뀔 수 있으니 입국 전에 독일 대사관 홈페이지 등에서 정확한 내용을 확인해 보세요." },
      { r: "B", de: "Verstanden. Welche Schritte würden Sie mir für die nächsten Monate empfehlen?", ko: "알겠어요. 앞으로 몇 달 동안 어떤 순서로 준비하면 좋을까요?" },
      { r: "A", de: "Ich würde zuerst drei bis vier Studiengänge auswählen, dann die Bewerbungsfristen und Voraussetzungen vergleichen und anschließend die Unterlagen vorbereiten. Bei Interesse können wir einen Folgetermin vereinbaren.", ko: "저라면 먼저 과정을 서너 개 고르고, 지원 마감일과 조건을 비교한 다음 서류를 준비하겠어요. 원하시면 다음 상담 날짜도 잡을 수 있어요." },
      { r: "B", de: "Das mache ich. Vielen Dank für die ausführliche Beratung.", ko: "그렇게 할게요. 자세히 상담해 주셔서 감사합니다." }
    ],
    redemittel: [
      { group: "상담 목적", items: [
        { de: "Ich würde gern einen Master anschließen.", ko: "석사를 이어서 하고 싶어요." },
        { de: "Ich weiß nicht, welche Voraussetzungen ich erfüllen muss.", ko: "어떤 조건을 갖춰야 하는지 모르겠어요." }
      ] },
      { group: "질문", items: [
        { de: "Muss ich das vor der Bewerbung erledigen?", ko: "지원하기 전에 해 둬야 하나요?" },
        { de: "Wie sieht es mit den Kosten aus?", ko: "비용은 어떤가요?" },
        { de: "Darf man neben dem Studium arbeiten?", ko: "학업과 병행해서 일해도 되나요?" }
      ] },
      { group: "정보 전달", items: [
        { de: "Zunächst wird … geprüft.", ko: "먼저 …을 심사해요." },
        { de: "Das übernimmt in der Regel …", ko: "보통은 …에서 맡아서 해요." }
      ] },
      { group: "주의", items: [
        { de: "Allerdings sollten Sie bedenken, dass …", ko: "다만 …라는 점을 생각하셔야 해요." }
      ] },
      { group: "이해 · 권고", items: [
        { de: "Das leuchtet mir ein.", ko: "듣고 보니 그러네요." },
        { de: "Ich würde zuerst … auswählen.", ko: "저라면 먼저 …을 고르겠어요." }
      ] }
    ]
  },

  {
    no: 5, lv: "B2",
    title: "Reklamation einer Reise", titleKo: "여행 하자 항의", type: "Beschwerde", typeKo: "항의",
    intro: "예약한 방과 다른 객실을 받은 일을 여행사에 항의하고 보상을 요구하는 대화예요.",
    focus: ["공식적인 항의", "요구 근거 대기", "명사화: Preisminderung · Stellungnahme"],
    roles: { A: "Kundin", B: "Mitarbeiter" },
    turns: [
      { r: "A", de: "Guten Tag, ich rufe wegen meiner Reise nach Mallorca an, von der ich letzte Woche zurückgekehrt bin. Ich möchte eine Reklamation einreichen.", ko: "안녕하세요, 지난주에 다녀온 마요르카 여행 건으로 전화드렸어요. 항의를 접수하고 싶어요." },
      { r: "B", de: "Das tut mir leid. Worum geht es genau?", ko: "불편을 겪으셨다니 죄송합니다. 어떤 일인지 자세히 말씀해 주시겠어요?" },
      { r: "A", de: "Gebucht hatten wir ein Doppelzimmer mit Meerblick. Tatsächlich haben wir ein Zimmer zum Parkplatz bekommen, und die Klimaanlage war in den ersten Tagen defekt. Dazu kam der Lärm von einer Baustelle neben dem Hotel – jeden Morgen ab sieben Uhr.", ko: "바다가 보이는 더블룸을 예약했는데, 실제로는 주차장 쪽 방을 받았어요. 처음 며칠은 에어컨도 고장 나 있었고요. 게다가 호텔 옆 공사장이 매일 아침 7시부터 시끄러웠어요." },
      { r: "B", de: "Haben Sie die Mängel schon vor Ort gemeldet?", ko: "현지에서 바로 문제를 알리셨나요?" },
      { r: "A", de: "Selbstverständlich, gleich am ersten Abend an der Rezeption. Man hat uns ein anderes Zimmer versprochen, aber umziehen konnten wir erst nach vier Tagen. Ich habe Fotos und eine schriftliche Bestätigung der Rezeption.", ko: "그럼요, 첫날 저녁에 바로 프런트에 알렸어요. 다른 방을 주겠다고 했는데, 나흘이 지나서야 옮길 수 있었어요. 사진도 있고 프런트에서 받은 서면 확인서도 있어요." },
      { r: "B", de: "Das ist gut, denn die Meldung vor Ort ist wichtig, damit eine Minderung geltend gemacht werden kann. Was genau erwarten Sie von uns?", ko: "잘하셨어요. 현지에서 알려야 감액을 청구할 수 있거든요. 저희에게 구체적으로 무엇을 원하세요?" },
      { r: "A", de: "Ich halte eine Preisminderung für angemessen. Für die ersten vier Tage ohne Meerblick und ohne funktionierende Klimaanlage würde ich 30 Prozent des anteiligen Reisepreises zurückfordern. Außerdem erwarte ich eine schriftliche Stellungnahme des Hotels.", ko: "요금 감액이 적절하다고 생각해요. 바다 전망도 없고 에어컨도 안 됐던 처음 나흘에 대해서는 그 기간 요금의 30퍼센트를 돌려받고 싶어요. 호텔 측의 서면 해명도 받고 싶고요." },
      { r: "B", de: "Dreißig Prozent erscheinen mir hoch. Solche Minderungen richten sich nach Art, Schwere und Dauer der Mängel. Wir werden den Fall prüfen und uns beim Hotel erkundigen.", ko: "30퍼센트는 높아 보여요. 이런 감액은 문제의 종류와 심각성, 기간에 따라 정해지거든요. 사안을 검토하고 호텔에도 확인해 볼게요." },
      { r: "A", de: "Ich habe volles Verständnis dafür, dass Sie das prüfen müssen. Allerdings bitte ich Sie, mir eine Frist zu nennen, innerhalb derer ich eine Antwort erhalte. Ansonsten müsste ich Rechtsberatung in Anspruch nehmen.", ko: "검토가 필요하다는 건 충분히 이해해요. 다만 언제까지 답변을 받을 수 있는지 기한을 알려 주세요. 그렇지 않으면 법률 상담을 받아야 할 것 같아요." },
      { r: "B", de: "Verständlich. Bitte schicken Sie uns Ihre Forderung schriftlich per E-Mail, zusammen mit den Fotos und der Bestätigung. Sobald alles vorliegt, melden wir uns innerhalb von zwei Wochen bei Ihnen.", ko: "알겠습니다. 요구 사항을 사진, 확인서와 함께 이메일로 보내 주세요. 자료가 다 들어오면 2주 안에 연락드릴게요." },
      { r: "A", de: "Gut, dann schicke ich Ihnen alles noch heute. Bitte bestätigen Sie mir den Eingang schriftlich.", ko: "좋아요, 그럼 오늘 중으로 다 보낼게요. 받으시면 서면으로 확인해 주세요." },
      { r: "B", de: "Selbstverständlich. Noch einmal: Wir bedauern die Unannehmlichkeiten.", ko: "물론이죠. 불편을 드려 다시 한번 죄송합니다." }
    ],
    redemittel: [
      { group: "용건", items: [
        { de: "Ich möchte eine Reklamation einreichen.", ko: "항의를 접수하고 싶어요." }
      ] },
      { group: "사실 설명", items: [
        { de: "Gebucht hatten wir … Tatsächlich haben wir … bekommen.", ko: "…을 예약했는데, 실제로는 …을 받았어요." },
        { de: "Ich habe Fotos und eine schriftliche Bestätigung.", ko: "사진도 있고 서면 확인서도 있어요." }
      ] },
      { group: "요구", items: [
        { de: "Ich halte eine Preisminderung für angemessen.", ko: "요금 감액이 적절하다고 생각해요." },
        { de: "Ich würde … Prozent zurückfordern.", ko: "…퍼센트를 돌려받고 싶어요." }
      ] },
      { group: "상대의 신중한 응답", items: [
        { de: "… erscheint mir hoch.", ko: "…는 높아 보여요." },
        { de: "Wir werden den Fall prüfen.", ko: "사안을 검토해 볼게요." }
      ] },
      { group: "기한 · 확인", items: [
        { de: "Ich bitte Sie, mir eine Frist zu nennen.", ko: "기한을 알려 주세요." },
        { de: "Bitte bestätigen Sie mir den Eingang schriftlich.", ko: "받으시면 서면으로 확인해 주세요." }
      ] }
    ]
  },

  {
    no: 6, lv: "B2",
    title: "KI am Arbeitsplatz", titleKo: "직장 내 AI 도입", type: "Diskussion", typeKo: "토론",
    intro: "고객 문의에 AI를 도입하려는 회사 계획을 두고 동료끼리 찬반을 따지는 대화예요.",
    focus: ["찬반 논의", "우려 표현하기", "Konjunktiv II · statt … zu"],
    roles: { A: "Mira", B: "Paul" },
    turns: [
      { r: "A", de: "Hast du mitbekommen, dass die Geschäftsleitung künftig ein KI-Tool für Kundenanfragen einsetzen will? Was hältst du davon?", ko: "경영진이 앞으로 고객 문의에 AI 도구를 쓰려고 한다는 거 들었어? 어떻게 생각해?" },
      { r: "B", de: "Grundsätzlich finde ich die Idee sinnvoll. Routineanfragen könnten schneller beantwortet werden, und wir hätten mehr Zeit für komplizierte Fälle.", ko: "기본적으로 괜찮은 생각 같아. 흔한 문의는 더 빨리 답할 수 있고, 우리는 복잡한 건에 시간을 더 쓸 수 있잖아." },
      { r: "A", de: "Das sehe ich anders. Ich befürchte, dass die Qualität leiden wird. Kunden merken sofort, wenn sie mit einer Maschine kommunizieren, und fühlen sich nicht ernst genommen.", ko: "나는 생각이 달라. 서비스 질이 떨어질까 봐 걱정돼. 고객들은 기계랑 대화하고 있다는 걸 바로 알아채고, 제대로 대접받지 못한다고 느낄 거야." },
      { r: "B", de: "Das kann sein, aber die Qualität hängt davon ab, wie man das Tool einsetzt. Wenn es nur Standardfragen beantwortet und alles andere an uns weiterleitet, hat doch niemand einen Nachteil.", ko: "그럴 수도 있지. 그런데 질은 도구를 어떻게 쓰느냐에 달렸어. 정해진 질문에만 답하고 나머지는 다 우리한테 넘기면 손해 보는 사람은 없잖아." },
      { r: "A", de: "In der Theorie ja. Aber was passiert, wenn das System Fehler macht und falsche Auskünfte gibt? Wer trägt dann die Verantwortung?", ko: "이론상으로는 그렇지. 그런데 시스템이 실수해서 잘못 안내하면 어떡해? 그때 책임은 누가 져?" },
      { r: "B", de: "Das ist ein berechtigter Einwand. Deshalb müsste man klare Regeln aufstellen und die Antworten stichprobenartig überprüfen.", ko: "그건 맞는 지적이야. 그래서 규칙을 분명하게 세우고, 답변을 표본으로 골라 점검해야 할 거야." },
      { r: "A", de: "Außerdem mache ich mir Sorgen um unsere Arbeitsplätze. Es heißt, dass zunächst nur Routineaufgaben automatisiert werden, aber wer garantiert, dass es dabei bleibt?", ko: "게다가 우리 일자리도 걱정돼. 처음에는 단순한 업무만 자동화한다고 하는데, 거기서 끝난다고 누가 장담해?" },
      { r: "B", de: "Garantien gibt es nie. Andererseits hat bisher jede technische Neuerung auch neue Aufgaben geschaffen. Entscheidend ist, dass wir uns weiterbilden und die Veränderung rechtzeitig mitgestalten, statt abzuwarten.", ko: "장담할 수 있는 건 없지. 그래도 지금까지 기술 혁신은 늘 새로운 일도 만들어 냈어. 중요한 건 가만히 기다리지 말고, 계속 배우면서 변화를 제때 함께 만들어 가는 거야." },
      { r: "A", de: "Da ist etwas dran. Vielleicht sollten wir dem Betriebsrat vorschlagen, dass wir an der Einführung beteiligt werden.", ko: "일리가 있네. 도입 과정에 우리도 참여하게 해 달라고 직원 협의회에 제안해 보는 게 좋겠어." },
      { r: "B", de: "Gute Idee. Dann könnten wir auch Schulungen einfordern.", ko: "좋은 생각이야. 그러면 교육도 요구할 수 있겠지." },
      { r: "A", de: "Gut, dann formulieren wir einen kurzen Vorschlag.", ko: "좋아, 그럼 짧게 제안서를 써 보자." },
      { r: "B", de: "Einverstanden. Ich entwerfe ihn und schicke ihn dir bis morgen.", ko: "그래. 초안은 내가 써서 내일까지 보내 줄게." }
    ],
    redemittel: [
      { group: "의견 묻기", items: [
        { de: "Was hältst du davon?", ko: "어떻게 생각해?" }
      ] },
      { group: "찬성", items: [
        { de: "Grundsätzlich finde ich die Idee sinnvoll.", ko: "기본적으로 괜찮은 생각 같아." }
      ] },
      { group: "반대 · 우려", items: [
        { de: "Das sehe ich anders.", ko: "나는 생각이 달라." },
        { de: "Ich befürchte, dass …", ko: "…할까 봐 걱정돼." },
        { de: "Ich mache mir Sorgen um …", ko: "…이 걱정돼." }
      ] },
      { group: "인정 · 양보", items: [
        { de: "Das ist ein berechtigter Einwand.", ko: "그건 맞는 지적이야." },
        { de: "In der Theorie ja. Aber …", ko: "이론상으로는 그렇지. 그런데 …" },
        { de: "Da ist etwas dran.", ko: "일리가 있네." }
      ] },
      { group: "대안", items: [
        { de: "Andererseits …", ko: "그래도 한편으로는 …" },
        { de: "Entscheidend ist, dass wir …, statt abzuwarten.", ko: "중요한 건 가만히 기다리지 말고 우리가 …하는 거야." }
      ] }
    ]
  }
];
