/* SODA SPRECHTRAINING · C1 대화문 */
window.DIALOG_DATA = window.DIALOG_DATA || {};
window.DIALOG_DATA.C1 = [
  {
    no: 1, lv: "C1",
    title: "Homeoffice – ja oder nein?", titleKo: "재택근무, 찬성인가 반대인가", type: "Diskussion", typeKo: "토론",
    intro: "양쪽 입장을 검토하며 타협안을 찾는 토론이에요.",
    focus: ["찬반 토론", "반론과 양보", "타협안 만들기"],
    roles: { A: "Teamleiterin Sabine", B: "Kollege Markus" },
    turns: [
      { r: "A", de: "Ich habe den Eindruck, dass die Diskussion um das Homeoffice oft an der eigentlichen Frage vorbeigeht. Es geht nicht um Bequemlichkeit, sondern um Vertrauen.", ko: "재택근무 논의가 정작 핵심을 비켜 가는 경우가 많다는 느낌이 들어요. 편리함의 문제가 아니라 신뢰의 문제예요." },
      { r: "B", de: "Da stimme ich dir zum Teil zu. Vertrauen lässt sich allerdings kaum an Anwesenheitszeiten messen. Wer produktiv ist, zeigt das an seinen Ergebnissen, nicht an den Stunden am Schreibtisch.", ko: "그 말에는 부분적으로 동의해요. 그런데 신뢰는 사무실에 있는 시간으로 재기 어렵죠. 일을 잘하는 사람은 책상 앞에 앉아 있는 시간이 아니라 결과로 그걸 보여 줘요." },
      { r: "A", de: "Das mag stimmen, nur hat die Praxis gezeigt, dass der informelle Austausch bei reiner Remote-Arbeit deutlich leidet – ganz zu schweigen davon, dass neue Kollegen kaum Gelegenheit haben, sich einzuarbeiten.", ko: "그럴 수도 있어요. 다만 실제로 보면 완전 원격 근무에서는 비공식적인 소통이 눈에 띄게 줄어요. 신입이 일을 익힐 기회가 거의 없다는 건 말할 것도 없고요." },
      { r: "B", de: "Das ist ein berechtigter Einwand. Allerdings wird dabei oft übersehen, dass starre Anwesenheitspflichten viele Mitarbeitende auch nicht produktiver machen – im Großraumbüro leidet die Konzentration mitunter erheblich.", ko: "타당한 지적이에요. 하지만 출근을 일률적으로 의무화한다고 많은 직원이 더 생산적이 되는 것도 아니라는 점은 자주 간과돼요. 개방형 사무실에서는 집중력이 크게 떨어지기도 하거든요." },
      { r: "A", de: "Sicher, es gibt Argumente auf beiden Seiten. Mein Vorschlag wäre ein Modell, bei dem wir je nach Aufgabe entscheiden: konzeptionelle Arbeit zu Hause, Abstimmungen vor Ort.", ko: "물론 양쪽 다 근거가 있어요. 제 제안은 업무에 따라 정하는 모델이에요. 구상하는 일은 집에서, 협의는 사무실에서 하는 거죠." },
      { r: "B", de: "Ein hybrides Modell liegt zwar nahe, doch es birgt die Gefahr, dass je nach Präsenz im Büro eine Art Zweiklassengesellschaft entsteht.", ko: "하이브리드 모델이 가장 먼저 떠오르긴 하죠. 하지만 사무실에 얼마나 나오느냐에 따라 직원들이 두 부류로 나뉠 위험이 있어요." },
      { r: "A", de: "Das ist ein Punkt, den man ernst nehmen muss. Dem könnte man entgegenwirken, indem man die Regeln transparent festlegt und sie nicht dem Gutdünken Einzelner überlässt.", ko: "그건 진지하게 받아들여야 할 부분이에요. 규칙을 투명하게 정하고 몇몇 사람의 판단에 맡기지 않으면 그런 일을 막을 수 있을 거예요." },
      { r: "B", de: "Einverstanden. Ich wäre außerdem dafür, die Regelung erst nach einem halben Jahr zu evaluieren, es sei denn, die Kennzahlen des Teams zeigen schon früher deutliche Probleme.", ko: "동의해요. 그리고 이 규정은 반년이 지난 뒤에 평가했으면 해요. 그 전에 팀 지표에 뚜렷한 문제가 나타난다면 몰라도요." },
      { r: "A", de: "Dann schlage ich vor, dass wir bis Monatsende ein Konzept ausarbeiten und es dem Vorstand zur Entscheidung vorlegen.", ko: "그럼 월말까지 구체적인 안을 만들어서 이사회에 올리고 결정을 받는 걸로 해요." },
      { r: "B", de: "Gut. Ich übernehme die Umfrage unter den Mitarbeitenden, damit wir eine belastbare Grundlage haben.", ko: "좋아요. 믿을 만한 근거를 마련할 수 있게 직원 설문은 제가 맡을게요." }
    ],
    redemittel: [
      { group: "의견 제시", items: [
        { de: "Ich habe den Eindruck, dass …", ko: "…라는 느낌이 들어요." }
      ] },
      { group: "부분 동의", items: [
        { de: "Da stimme ich dir zum Teil zu.", ko: "그 말에는 부분적으로 동의해요." }
      ] },
      { group: "반론", items: [
        { de: "Das mag stimmen, nur …", ko: "그럴 수도 있지만 …" },
        { de: "Das ist ein berechtigter Einwand.", ko: "타당한 지적이에요." },
        { de: "Allerdings wird oft übersehen, dass …", ko: "하지만 …라는 점은 자주 간과돼요." }
      ] },
      { group: "중립 정리", items: [
        { de: "Es gibt Argumente auf beiden Seiten.", ko: "양쪽 다 근거가 있어요." }
      ] },
      { group: "우려", items: [
        { de: "… birgt die Gefahr, dass …", ko: "…은 …할 위험이 있어요." }
      ] },
      { group: "대안", items: [
        { de: "Dem könnte man entgegenwirken, indem man …", ko: "…하면 그런 일을 막을 수 있을 거예요." },
        { de: "Ein Modell, bei dem …", ko: "…하는 방식의 모델" }
      ] },
      { group: "조건", items: [
        { de: "…, es sei denn, …", ko: "…, …라면 몰라도요." }
      ] },
      { group: "찬성 · 합의", items: [
        { de: "Ich wäre außerdem dafür, …", ko: "그리고 …했으면 해요." },
        { de: "Einverstanden.", ko: "동의해요." }
      ] }
    ]
  },

  {
    no: 2, lv: "C1",
    title: "Vier-Tage-Woche", titleKo: "주 4일제 인터뷰", type: "Interview", typeKo: "인터뷰",
    intro: "진행자가 노동시장 연구자에게 주 4일제의 장단점과 조건을 묻는 인터뷰예요.",
    focus: ["인터뷰", "양보와 제한", "명사형 문체"],
    roles: { A: "Moderatorin", B: "Arbeitsmarktforscher" },
    turns: [
      { r: "A", de: "Herr Dr. Brandt, die Vier-Tage-Woche wird in Deutschland zunehmend diskutiert. Wie erklären Sie sich das große Interesse?", ko: "브란트 박사님, 독일에서 주 4일제가 점점 더 많이 논의되고 있습니다. 이렇게 관심이 큰 이유가 뭐라고 보시나요?" },
      { r: "B", de: "Vor allem mit dem Fachkräftemangel. Unternehmen suchen nach Argumenten, mit denen sie im Wettbewerb um qualifizierte Bewerber punkten können. Hinzu kommt, dass sich die Erwartungen an Arbeit grundlegend verschoben haben: Viele wollen nicht mehr, dass ihr Leben um den Job herum organisiert wird.", ko: "무엇보다 전문 인력 부족 때문입니다. 기업들은 우수한 지원자를 확보하는 경쟁에서 내세울 만한 강점을 찾고 있어요. 게다가 일에 대한 기대가 근본적으로 달라졌습니다. 많은 사람이 더는 삶이 일을 중심으로 짜이는 걸 원하지 않아요." },
      { r: "A", de: "Skeptiker wenden ein, dass sich die gleiche Leistung in vier Tagen kaum erbringen lässt. Ist die Vier-Tage-Woche also Wunschdenken?", ko: "회의적인 쪽에서는 같은 성과를 나흘 만에 내기는 어렵다고 반박합니다. 그렇다면 주 4일제는 희망 사항에 불과한 걸까요?" },
      { r: "B", de: "Teils, teils. In Bereichen, in denen Leistung an Anwesenheit gekoppelt ist, etwa in der Pflege oder im Schichtdienst, lässt sich Arbeitszeit nicht beliebig verdichten. In wissensbasierten Berufen dagegen zeigen mehrere Pilotprojekte, dass die Produktivität nicht zwangsläufig sinkt – vorausgesetzt, Besprechungen und Abläufe werden konsequent gestrafft.", ko: "반반입니다. 돌봄이나 교대 근무처럼 현장에 있어야 일이 되는 분야에서는 근무 시간을 마음대로 압축할 수 없어요. 반면 지식 기반 직종에서는 생산성이 반드시 떨어지지는 않는다는 결과가 여러 시범 사업에서 나왔습니다. 회의와 업무 절차를 철저히 간소화한다는 전제에서요." },
      { r: "A", de: "Besteht nicht die Gefahr, dass die Beschäftigten am Ende dieselbe Arbeit in weniger Zeit erledigen müssen und der Druck steigt?", ko: "결국 직원들이 같은 일을 더 짧은 시간에 해내야 해서 압박만 커질 위험은 없을까요?" },
      { r: "B", de: "Diese Gefahr besteht tatsächlich. Eine Vier-Tage-Woche ohne Entlastung bei den Aufgaben wäre eine verkappte Arbeitsverdichtung. Entscheidend ist, ob Aufgaben wegfallen oder neu verteilt werden und ob der Arbeitgeber bereit ist, seine Erwartungen anzupassen.", ko: "그 위험은 실제로 있습니다. 업무를 덜어 주지 않는 주 4일제는 사실상 노동 강도만 높이는 셈이에요. 중요한 건 업무를 줄이거나 다시 나누느냐, 그리고 고용주가 기대치를 조정할 준비가 되어 있느냐입니다." },
      { r: "A", de: "Wie sieht es mit den Kosten aus? Wer trägt das finanzielle Risiko?", ko: "비용은 어떤가요? 재정적 위험은 누가 지나요?" },
      { r: "B", de: "Das hängt vom Modell ab. Bei vollem Lohnausgleich tragen es zunächst die Unternehmen. Es wäre aber zu kurz gedacht, nur die Kosten zu sehen: Wenn dafür die Krankheitstage sinken und die Fluktuation zurückgeht, kann sich das Modell durchaus rechnen.", ko: "모델에 따라 다릅니다. 임금을 그대로 보전하면 우선은 기업이 부담해요. 하지만 비용만 보는 건 근시안적이에요. 그 대신 병가가 줄고 이직이 줄어든다면 충분히 수지가 맞을 수 있습니다." },
      { r: "A", de: "Sollte der Gesetzgeber die Vier-Tage-Woche fördern?", ko: "입법부가 주 4일제를 장려해야 할까요?" },
      { r: "B", de: "Bei einer gesetzlichen Pflicht wäre ich zurückhaltend. Sinnvoller wäre es, Rahmenbedingungen zu schaffen, die Experimente erleichtern, und die Ergebnisse systematisch auszuwerten, statt aus Einzelbeispielen allgemeine Schlüsse zu ziehen.", ko: "법으로 의무화하는 데는 신중한 편입니다. 그보다는 시도를 쉽게 할 수 있는 여건을 만들고, 개별 사례에서 일반적인 결론을 끌어내기보다 결과를 체계적으로 분석하는 편이 더 합리적이라고 봅니다." },
      { r: "A", de: "Herr Dr. Brandt, vielen Dank für das Gespräch.", ko: "브란트 박사님, 인터뷰에 응해 주셔서 감사합니다." },
      { r: "B", de: "Sehr gern.", ko: "별말씀을요." }
    ],
    redemittel: [
      { group: "이유 묻기", items: [
        { de: "Wie erklären Sie sich das große Interesse?", ko: "관심이 이렇게 큰 이유가 뭐라고 보시나요?" }
      ] },
      { group: "반박 소개", items: [
        { de: "Skeptiker wenden ein, dass …", ko: "회의적인 쪽에서는 …라고 반박합니다." }
      ] },
      { group: "구분하기", items: [
        { de: "Teils, teils.", ko: "반반이에요." },
        { de: "In … dagegen …", ko: "반면 …에서는 …" },
        { de: "…, vorausgesetzt, …", ko: "…. …라는 전제에서요." }
      ] },
      { group: "위험 말하기", items: [
        { de: "Diese Gefahr besteht tatsächlich.", ko: "그 위험은 실제로 있습니다." }
      ] },
      { group: "상대화", items: [
        { de: "Es wäre zu kurz gedacht, nur … zu sehen.", ko: "…만 보는 건 근시안적이에요." }
      ] },
      { group: "신중한 입장", items: [
        { de: "Bei … wäre ich zurückhaltend.", ko: "…에는 신중한 편입니다." },
        { de: "…, statt aus Einzelbeispielen Schlüsse zu ziehen.", ko: "개별 사례에서 결론을 끌어내기보다 …" }
      ] }
    ]
  },

  {
    no: 3, lv: "C1",
    title: "Lieferverzug", titleKo: "납품 지연 협상", type: "Verhandlung", typeKo: "협상",
    intro: "납품이 늦어진 상황에서 구매 담당자와 판매 담당자가 보상 방안을 두고 협상하는 대화예요.",
    focus: ["비즈니스 협상", "명사화 · 기능동사 결합", "sofern · andernfalls"],
    roles: { A: "Einkaufsleiter", B: "Vertriebsleiterin" },
    turns: [
      { r: "A", de: "Frau Albrecht, ich komme direkt zur Sache. Die vereinbarte Lieferung der Steuerungseinheiten ist nun schon vier Wochen überfällig. Dadurch gerät unsere Produktion erheblich in Verzug.", ko: "알브레히트 씨, 바로 본론으로 들어가겠습니다. 약속된 제어 장치 납품이 벌써 4주나 늦어지고 있습니다. 이 때문에 저희 생산 일정이 크게 밀리고 있어요." },
      { r: "B", de: "Herr Lindner, ich verstehe Ihren Ärger. Der Verzug ist auf einen Engpass bei unserem Zulieferer zurückzuführen, den wir nicht vorhersehen konnten. Wir arbeiten mit Hochdruck an einer Lösung.", ko: "린트너 씨, 화나신 건 이해합니다. 이번 지연은 저희가 예상하지 못한 협력업체의 공급 차질 때문입니다. 해결책을 찾기 위해 총력을 기울이고 있어요." },
      { r: "A", de: "Mir geht es weniger um die Ursache als um die Folgen. Wir mussten bereits Überstunden anordnen und riskieren Vertragsstrafen gegenüber unseren eigenen Kunden. Im Vertrag ist für solche Fälle eine Verzugsentschädigung vorgesehen.", ko: "저에게는 원인보다 결과가 더 중요합니다. 저희는 이미 초과 근무를 지시해야 했고, 저희 고객사에 위약금을 물 위험도 있습니다. 계약서에는 이런 경우에 대비한 지연 배상이 규정되어 있습니다." },
      { r: "B", de: "Ich bestreite nicht, dass uns diese Klausel bindet. Allerdings sieht der Vertrag bei höherer Gewalt eine Ausnahme vor, und ob der Lieferengpass darunterfällt, wäre zumindest zu klären.", ko: "그 조항이 저희를 구속한다는 점은 부인하지 않습니다. 다만 계약서에는 불가항력일 때의 예외가 있고, 이번 공급 차질이 거기에 해당하는지는 적어도 따져 봐야 합니다." },
      { r: "A", de: "Das halte ich für sehr weit hergeholt. Ein Lieferengpass bei einem Zulieferer fällt in Ihren Risikobereich, nicht in unseren. Ich möchte nicht, dass wir uns in juristischen Feinheiten verlieren; mir wäre an einer tragfähigen Lösung gelegen.", ko: "그건 상당히 억지라고 봅니다. 협력업체의 공급 차질은 저희가 아니라 귀사가 책임질 위험입니다. 법적인 세부 사항을 따지느라 시간을 끌고 싶지 않습니다. 저는 실효성 있는 해결책이 나왔으면 합니다." },
      { r: "B", de: "Das ist auch in unserem Interesse. Ich könnte Ihnen eine Teillieferung von 60 Prozent bereits nächste Woche zusagen, den Rest bis Monatsende.", ko: "그건 저희도 바라는 바입니다. 60퍼센트는 다음 주에 먼저 납품하고, 나머지는 월말까지 납품하겠다고 약속드릴 수 있어요." },
      { r: "A", de: "Eine Teillieferung hilft uns, aber sie löst das Problem nicht. Wir bräuchten verbindliche Termine, und für jeden weiteren Tag Verzug müsste ein pauschaler Abschlag vereinbart werden.", ko: "부분 납품은 도움이 되지만 문제를 해결하지는 못합니다. 확정된 납기가 필요하고, 추가로 늦어지는 하루마다 일정액을 감액하기로 합의해야 합니다." },
      { r: "B", de: "Einen pauschalen Abschlag kann ich nicht ohne Rücksprache mit der Geschäftsführung zusagen. Was ich anbieten kann, ist ein Preisnachlass von fünf Prozent auf diese Lieferung, sofern Sie auf weitergehende Ansprüche verzichten.", ko: "일정액 감액은 경영진과 상의하지 않고는 약속드릴 수 없습니다. 제가 제안할 수 있는 건, 추가 청구를 하지 않으신다는 조건으로 이번 납품분을 5퍼센트 할인해 드리는 것입니다." },
      { r: "A", de: "Fünf Prozent stehen in keinem Verhältnis zu unserem Schaden. Ich könnte mir sieben Prozent vorstellen, zuzüglich einer schriftlichen Zusage, dass die Restlieferung spätestens zum 30. erfolgt. Verzichten würden wir dann nur auf die Verzugsentschädigung für diese Lieferung, nicht auf Ansprüche aus künftigen Lieferungen.", ko: "5퍼센트는 저희 손해에 비하면 턱없이 부족합니다. 7퍼센트에, 나머지 물량을 늦어도 30일까지 납품한다는 서면 약속을 더한다면 생각해 볼 수 있습니다. 그 경우에도 저희가 포기하는 건 이번 납품의 지연 배상뿐이고, 앞으로의 납품과 관련된 청구권은 포기하지 않습니다." },
      { r: "B", de: "Das lässt sich hören. Ich werde das heute noch mit meiner Geschäftsführung besprechen und melde mich bis morgen Mittag.", ko: "들어 볼 만한 제안이네요. 오늘 중으로 경영진과 상의하고 내일 정오까지 연락드리겠습니다." },
      { r: "A", de: "Gut. Ich gehe davon aus, dass wir bis dahin eine verbindliche Antwort haben. Andernfalls müsste ich unsere Rechtsabteilung einschalten.", ko: "좋습니다. 그때까지 확답을 받을 수 있으리라 생각하겠습니다. 그렇지 않으면 법무팀에 맡길 수밖에 없습니다." },
      { r: "B", de: "Verstanden. Ich bin zuversichtlich, dass wir zu einer Einigung kommen.", ko: "알겠습니다. 합의에 이를 수 있을 거라고 믿습니다." }
    ],
    redemittel: [
      { group: "본론으로", items: [
        { de: "Ich komme direkt zur Sache.", ko: "바로 본론으로 들어가겠습니다." }
      ] },
      { group: "원인과 결과", items: [
        { de: "Mir geht es weniger um … als um …", ko: "저에게는 …보다 …가 더 중요합니다." },
        { de: "Der Verzug ist auf … zurückzuführen.", ko: "이번 지연은 … 때문입니다." }
      ] },
      { group: "인정하되 반박", items: [
        { de: "Ich bestreite nicht, dass … Allerdings …", ko: "…라는 점은 부인하지 않습니다. 다만 …" },
        { de: "Das halte ich für sehr weit hergeholt.", ko: "그건 상당히 억지라고 봅니다." }
      ] },
      { group: "제안", items: [
        { de: "Was ich anbieten kann, ist …, sofern …", ko: "제가 제안할 수 있는 건 …입니다. 단, …하신다면요." },
        { de: "Ich könnte mir … vorstellen, zuzüglich …", ko: "…에 …을 더한다면 생각해 볼 수 있습니다." }
      ] },
      { group: "압박 · 마무리", items: [
        { de: "Andernfalls müsste ich … einschalten.", ko: "그렇지 않으면 …에 맡길 수밖에 없습니다." },
        { de: "Das lässt sich hören.", ko: "들어 볼 만한 제안이네요." }
      ] }
    ]
  },

  {
    no: 4, lv: "C1",
    title: "Stadt oder Land?", titleKo: "도시냐 시골이냐", type: "Gespräch", typeKo: "대화",
    intro: "시골로 이사한 친구에게 경험을 묻고 장단점을 따져 보는 대화예요.",
    focus: ["경험 평가", "장단점 따져 보기", "Konjunktiv I: sei · indirekte Rede"],
    roles: { A: "Carla", B: "Tobias" },
    turns: [
      { r: "A", de: "Nach zehn Jahren in der Stadt überlegen wir ernsthaft, aufs Land zu ziehen. Du hast ja selbst vor zwei Jahren den Schritt gewagt – würdest du es im Nachhinein wieder so machen?", ko: "도시에서 10년을 살았는데, 우리 요즘 시골로 이사할까 진지하게 고민 중이야. 너는 2년 전에 직접 그렇게 했잖아. 지금 돌아보면 다시 그렇게 할 것 같아?" },
      { r: "B", de: "Im Großen und Ganzen ja, wobei ich anfangs unterschätzt habe, wie sehr man auf das Auto angewiesen ist. Ohne eigenes Fahrzeug wäre das Leben hier kaum zu organisieren.", ko: "대체로는 그래. 다만 처음에는 차가 얼마나 꼭 있어야 하는지 얕봤어. 자기 차가 없으면 여기서는 생활이 거의 안 될 거야." },
      { r: "A", de: "Das ist genau das, was mich zögern lässt. Wir wollen eigentlich weniger Auto fahren, nicht mehr. Dafür locken uns die Ruhe und die Aussicht, uns endlich ein Haus mit Garten leisten zu können.", ko: "바로 그게 내가 망설이는 이유야. 우리는 사실 차를 더 타는 게 아니라 덜 타고 싶거든. 대신 조용한 환경이랑, 드디어 정원 딸린 집을 장만할 수 있다는 점이 끌려." },
      { r: "B", de: "Bezahlbarer Wohnraum ist sicher ein starkes Argument. Man darf aber nicht vergessen, dass das Land nicht automatisch Idylle bedeutet. Das soziale Leben spielt sich oft in Vereinen ab, und wer nicht dazugehört, braucht Zeit, um Anschluss zu finden.", ko: "집값이 감당할 만하다는 건 분명 큰 장점이야. 그래도 시골이라고 해서 저절로 평화롭고 아늑한 건 아니라는 점은 잊으면 안 돼. 사람들이 주로 동호회 같은 모임에서 어울리는데, 거기 속하지 않으면 사람들과 가까워지기까지 시간이 걸려." },
      { r: "A", de: "Das habe ich befürchtet. Andererseits hört man auch, dass der Zusammenhalt auf dem Dorf stärker sei als in der Anonymität der Großstadt.", ko: "그럴까 봐 걱정했어. 한편으로는 마을 사람들끼리의 유대가 익명성이 강한 대도시보다 끈끈하다는 말도 있잖아." },
      { r: "B", de: "Das stimmt zum Teil, aber Zusammenhalt hat seinen Preis: Man kennt sich, und man spricht über einen. Wer Wert auf Privatsphäre legt, muss damit leben können.", ko: "어느 정도는 맞아. 그런데 유대에는 대가가 있어. 다들 서로 알고, 남 얘기도 많이 하거든. 사생활을 중요하게 여기는 사람은 그걸 감수할 수 있어야 해." },
      { r: "A", de: "Wie sieht es mit der Infrastruktur aus – Ärzte, Schulen, Internet?", ko: "기반 시설은 어때? 병원, 학교, 인터넷 같은 거." },
      { r: "B", de: "Das ist ein wunder Punkt. Der nächste Facharzt ist 25 Kilometer entfernt, und das Glasfasernetz wird erst jetzt ausgebaut. Dafür fällt der lange Arbeitsweg dank Homeoffice weniger ins Gewicht, als es noch vor ein paar Jahren der Fall gewesen wäre.", ko: "그게 약점이야. 가장 가까운 전문의가 25킬로미터 떨어져 있고, 광케이블망은 이제야 깔리고 있어. 대신 재택근무 덕분에 먼 출퇴근길은 몇 년 전만큼 큰 문제가 아니야." },
      { r: "A", de: "Dann hängt die Entscheidung wohl davon ab, wie flexibel wir beruflich bleiben können.", ko: "그럼 결국 우리가 일하는 데서 얼마나 유연할 수 있느냐에 달렸겠네." },
      { r: "B", de: "Genau. Mein Rat wäre, nicht übereilt zu entscheiden: Wohnt erst einmal ein halbes Jahr zur Miete, bevor ihr ein Haus kauft. Dann merkt ihr, ob ihr so einen Alltag tatsächlich wollt.", ko: "맞아. 내 조언은 서두르지 말라는 거야. 집을 사기 전에 일단 반년 정도 세 들어 살아 봐. 그러면 그런 일상을 정말 원하는지 알 수 있어." },
      { r: "A", de: "Das ist ein kluger Gedanke. Wir würden damit nichts Unumkehrbares tun.", ko: "좋은 생각이다. 그러면 되돌릴 수 없는 일을 하는 것도 아니고." },
      { r: "B", de: "Eben. Und wenn es nicht passt, ist die Stadt ja nur eine Autostunde entfernt.", ko: "그렇지. 그리고 안 맞으면 도시까지 차로 한 시간밖에 안 걸리잖아." }
    ],
    redemittel: [
      { group: "경험 돌아보기", items: [
        { de: "Würdest du es im Nachhinein wieder so machen?", ko: "지금 돌아보면 다시 그렇게 할 것 같아?" },
        { de: "Im Großen und Ganzen ja, wobei …", ko: "대체로는 그래. 다만 …" }
      ] },
      { group: "망설임", items: [
        { de: "Das ist genau das, was mich zögern lässt.", ko: "바로 그게 내가 망설이는 이유야." }
      ] },
      { group: "상대화", items: [
        { de: "Man darf aber nicht vergessen, dass …", ko: "그래도 …라는 점은 잊으면 안 돼." },
        { de: "Das stimmt zum Teil, aber …", ko: "어느 정도는 맞아. 그런데 …" }
      ] },
      { group: "전해 들은 말", items: [
        { de: "Man hört, dass der Zusammenhalt stärker sei.", ko: "유대가 더 끈끈하다는 말이 있어." }
      ] },
      { group: "약점 · 비중", items: [
        { de: "Das ist ein wunder Punkt.", ko: "그게 약점이야." },
        { de: "Das fällt weniger ins Gewicht.", ko: "그건 그만큼 큰 문제는 아니야." }
      ] },
      { group: "조언", items: [
        { de: "Mein Rat wäre, nicht übereilt zu entscheiden.", ko: "내 조언은 서두르지 말라는 거야." }
      ] }
    ]
  },

  {
    no: 5, lv: "C1",
    title: "Im Literaturkreis", titleKo: "독서 모임: 소설 이야기", type: "Gespräch", typeKo: "대화",
    intro: "함께 읽은 소설을 해석하며 의견이 엇갈리는 부분을 조율하는 대화예요.",
    focus: ["해석하기", "추측 표현", "양보 표현: wenngleich · trotzdem"],
    roles: { A: "Marlene", B: "Jonas" },
    turns: [
      { r: "A", de: "Bevor wir ins Detail gehen: Wie hat euch der Roman insgesamt gefallen? Ich muss gestehen, dass ich anfangs Schwierigkeiten hatte, in die Handlung hineinzukommen.", ko: "자세한 얘기에 들어가기 전에, 다들 소설 전체적으로 어땠어? 솔직히 말하면 나는 처음에 이야기에 빠져들기가 힘들었어." },
      { r: "B", de: "Mir ging es ähnlich, aber ab dem zweiten Drittel hat mich das Buch gepackt. Besonders gelungen finde ich, wie die Autorin mit den Zeitebenen spielt: Die Vergangenheit schiebt sich immer wieder in die Gegenwart der Erzählerin.", ko: "나도 비슷했는데, 중반부터는 책에 푹 빠졌어. 특히 좋았던 건 작가가 시간대를 다루는 방식이야. 과거가 화자의 현재 속으로 자꾸 끼어들잖아." },
      { r: "A", de: "Ja, das wirkt auf mich weniger wie ein formaler Kniff als wie eine Darstellung dessen, wie Erinnerung funktioniert – unscharf, sprunghaft und von der Gegenwart gefärbt.", ko: "맞아. 나한테는 그게 형식적인 기교라기보다는 기억이 작동하는 방식을 보여 주는 것처럼 느껴져. 흐릿하고, 이리저리 건너뛰고, 현재의 색이 입혀진 기억 말이야." },
      { r: "B", de: "Das sehe ich auch so. Allerdings frage ich mich, ob man der Erzählerin trauen kann. An mehreren Stellen widerspricht sie sich, ohne dass der Text das kommentiert.", ko: "나도 그렇게 봐. 다만 화자를 믿어도 되는지는 잘 모르겠어. 화자가 여러 군데서 앞뒤가 안 맞는 말을 하는데, 소설은 그걸 따로 짚지 않거든." },
      { r: "A", de: "Das könnte Absicht sein. Vielleicht soll uns der Roman gerade vor Augen führen, dass jede Erinnerung eine Konstruktion ist, die man nicht für bare Münze nehmen darf.", ko: "의도일 수도 있어. 모든 기억은 곧이곧대로 받아들이면 안 되는, 머릿속에서 만들어진 것이라는 걸 소설이 일부러 보여 주려는 걸지도 몰라." },
      { r: "B", de: "Eine überzeugende Lesart, wenngleich ich sie ein wenig zu glatt finde. Man könnte genauso gut sagen, dass die Widersprüche schlicht eine Unachtsamkeit der Autorin sind.", ko: "설득력 있는 해석이야. 나한테는 좀 지나치게 깔끔하게 들리긴 하지만. 모순이 그냥 작가의 실수라고 볼 수도 있잖아." },
      { r: "A", de: "Das halte ich für unwahrscheinlich, dafür ist das Buch zu sorgfältig komponiert. Was mich eher gestört hat, ist die Sprache. Die langen Satzgefüge haben mich bisweilen ermüdet.", ko: "그건 아닐 것 같아. 그러기엔 책이 너무 공들여 짜여 있어. 나는 오히려 문체가 거슬렸어. 길게 이어지는 문장 때문에 가끔 지치더라." },
      { r: "B", de: "Da widerspreche ich dir. Gerade die Sprache macht für mich den Reiz aus. Sie bildet das Kreisen der Gedanken ab, und ohne sie wäre der Roman deutlich weniger eindringlich.", ko: "그 말에는 동의 못 하겠어. 나한테는 바로 그 문체가 매력이야. 생각이 맴도는 모습을 그대로 담고 있고, 그런 문체가 아니었다면 소설이 훨씬 덜 강렬했을 거야." },
      { r: "A", de: "Das lässt sich nicht von der Hand weisen. Trotzdem hätte ich mir an einigen Stellen mehr Verdichtung gewünscht.", ko: "그건 부정할 수 없네. 그래도 몇몇 대목은 좀 더 압축했으면 좋았을 거야." },
      { r: "B", de: "Vielleicht liegt es auch an den Erwartungen. Wer eine geradlinige Handlung sucht, wird enttäuscht; wer sich auf den Rhythmus einlässt, wird belohnt.", ko: "어쩌면 기대의 차이일지도 몰라. 줄거리가 곧게 이어지길 바라는 사람은 실망하겠지만, 문장의 리듬에 몸을 맡기는 사람은 그만큼 얻는 게 있어." },
      { r: "A", de: "Schön formuliert. Dann würde ich sagen: kein einfaches Buch, aber eines, über das man lange nachdenkt.", ko: "멋진 말이네. 그럼 이렇게 정리할 수 있겠다. 쉬운 책은 아니지만 오래 곱씹게 되는 책이라고." },
      { r: "B", de: "Genau das macht es für mich empfehlenswert.", ko: "나는 바로 그래서 이 책을 추천하고 싶어." }
    ],
    redemittel: [
      { group: "첫인상", items: [
        { de: "Wie hat euch der Roman insgesamt gefallen?", ko: "다들 소설 전체적으로 어땠어?" }
      ] },
      { group: "해석", items: [
        { de: "Das wirkt auf mich weniger wie … als wie …", ko: "나한테는 …라기보다는 …처럼 느껴져." }
      ] },
      { group: "의문 · 추측", items: [
        { de: "Ich frage mich, ob man … trauen kann.", ko: "…를 믿어도 되는지 잘 모르겠어." },
        { de: "Das könnte Absicht sein.", ko: "의도일 수도 있어." }
      ] },
      { group: "다른 해석", items: [
        { de: "Man könnte genauso gut sagen, dass …", ko: "…라고 볼 수도 있잖아." }
      ] },
      { group: "반대 · 양보", items: [
        { de: "Da widerspreche ich dir.", ko: "그 말에는 동의 못 하겠어." },
        { de: "Das lässt sich nicht von der Hand weisen.", ko: "그건 부정할 수 없네." }
      ] },
      { group: "정리", items: [
        { de: "Dann würde ich sagen: kein einfaches Buch, aber …", ko: "그럼 이렇게 정리할 수 있겠다. 쉬운 책은 아니지만 …" }
      ] }
    ]
  },

  {
    no: 6, lv: "C1",
    title: "Sprachenlernen im KI-Zeitalter", titleKo: "AI 번역 시대의 외국어 학습", type: "Diskussion", typeKo: "토론",
    intro: "번역 AI가 있어도 외국어를 배울 가치가 있는지 학생과 교사가 논증을 주고받는 대화예요.",
    focus: ["주장과 반론", "논거 구성", "Konjunktiv II: würde · wäre · könnte"],
    roles: { A: "Studentin", B: "Sprachlehrer" },
    turns: [
      { r: "A", de: "Herr Keller, ich habe in letzter Zeit ernsthaft darüber nachgedacht, ob es sich überhaupt noch lohnt, eine Fremdsprache mühsam zu lernen. Die Übersetzungs-Apps werden doch von Jahr zu Jahr besser.", ko: "켈러 선생님, 요즘 외국어를 힘들게 배우는 게 아직도 의미가 있나 진지하게 고민하고 있어요. 번역 앱이 해마다 좋아지고 있잖아요." },
      { r: "B", de: "Die Frage ist berechtigt, und ich nehme sie ernst. Für viele praktische Zwecke wie Speisekarten oder Hinweisschilder reicht die Technik inzwischen völlig aus. Ich würde aber unterscheiden zwischen dem Verstehen von Informationen und dem Führen eines Gesprächs.", ko: "충분히 나올 만한 질문이고, 저도 가볍게 넘기지 않아요. 메뉴판이나 안내 표지판 같은 실용적인 용도라면 이제 기술로 충분해요. 다만 저는 정보를 이해하는 것과 대화를 나누는 것은 구분해서 보고 싶어요." },
      { r: "A", de: "Inwiefern macht das einen Unterschied? Auch im Gespräch kann ich meine Sätze eintippen und übersetzen lassen.", ko: "어떤 점에서 다르다는 건가요? 대화할 때도 문장을 입력해서 번역할 수 있잖아요." },
      { r: "B", de: "Das können Sie, aber Sie würden dabei den Gesprächsfluss verlieren. Zudem geht es in der Kommunikation nicht nur um Wörter. Tonfall, Höflichkeit, Humor – ein Gespür dafür entwickelt man erst, wenn man eine Sprache wirklich beherrscht. Eine Maschine liefert Ihnen eine korrekte Übersetzung, aber nicht unbedingt eine angemessene.", ko: "할 수는 있죠. 하지만 그러다 보면 대화의 흐름이 끊겨요. 게다가 의사소통은 단어만의 문제가 아니에요. 말투, 예의, 유머에 대한 감각은 그 언어를 제대로 익혀야 비로소 생겨요. 기계는 정확한 번역은 주지만, 상황에 맞는 번역까지 준다는 보장은 없어요." },
      { r: "A", de: "Das leuchtet ein. Trotzdem könnte man einwenden, dass die Zeit, die man ins Lernen steckt, anderswo sinnvoller investiert wäre.", ko: "그건 이해가 돼요. 그래도 공부에 들이는 시간을 다른 데 쓰는 게 더 낫다고 반박할 수도 있잖아요." },
      { r: "B", de: "Dieses Argument ist nicht von der Hand zu weisen. Man sollte aber bedenken, dass Sprachenlernen nicht nur ein Mittel zum Zweck ist. Wer eine Sprache lernt, lernt auch, anders zu denken und fremde Perspektiven nachzuvollziehen. Das lässt sich nicht auslagern.", ko: "그 주장은 쉽게 무시할 수 없어요. 하지만 외국어 공부가 목적을 이루기 위한 수단만은 아니라는 점도 생각해 봐야 해요. 언어를 배우면 다르게 생각하는 법, 낯선 관점을 이해하는 법도 함께 배우게 돼요. 그건 남에게 맡길 수 없는 일이에요." },
      { r: "A", de: "Das klingt schön, aber ist das empirisch belegt, oder ist das eher Wunschdenken von Sprachlehrern?", ko: "말씀은 좋은데, 실제로 연구로 입증된 건가요? 아니면 어학 선생님들의 바람에 가까운 건가요?" },
      { r: "B", de: "Berechtigte Skepsis. Die Forschungslage zur Mehrsprachigkeit ist nicht eindeutig; manche Effekte, etwa auf die Aufmerksamkeitssteuerung, werden kontrovers diskutiert. Gesichert ist eher, dass Menschen schneller Vertrauen fassen, wenn man in ihrer Sprache mit ihnen kommuniziert. Das deckt sich mit meiner Erfahrung.", ko: "의심하실 만해요. 다중 언어 사용에 관한 연구 결과는 한쪽으로 모이지 않아요. 예를 들어 주의력 조절에 미치는 효과 같은 몇몇 효과는 논란이 있습니다. 그보다 확실한 건, 상대의 언어로 소통하면 상대가 더 빨리 신뢰를 갖게 된다는 점이에요. 제 경험과도 맞고요." },
      { r: "A", de: "Dann würde ich Ihre These so zusammenfassen: Technik ersetzt das Übersetzen, aber nicht die Beziehung.", ko: "그럼 선생님 주장을 이렇게 정리할 수 있겠네요. 기술은 번역을 대신하지만 관계를 대신하지는 못한다고요." },
      { r: "B", de: "Genau, und ich würde ergänzen: Die Technik kann uns das Nachschlagen abnehmen, aber das Verstehen müssen wir selbst leisten.", ko: "맞아요. 덧붙이자면, 기술이 찾아보는 수고는 덜어 줄 수 있어도 이해하는 일은 우리가 직접 해야 해요." },
      { r: "A", de: "Dann lerne ich weiter, zumindest vorerst.", ko: "그럼 계속 배울게요. 적어도 당분간은요." },
      { r: "B", de: "Das freut mich, zumal Sie bereits so weit gekommen sind.", ko: "그 말을 들으니 기쁘네요. 벌써 이만큼 실력을 쌓았으니 더더욱요." }
    ],
    redemittel: [
      { group: "의문 제기", items: [
        { de: "Ich habe darüber nachgedacht, ob es sich lohnt, … zu …", ko: "…하는 게 의미가 있는지 고민해 봤어요." }
      ] },
      { group: "구분", items: [
        { de: "Ich würde unterscheiden zwischen … und …", ko: "저는 …와 …를 구분해서 보고 싶어요." },
        { de: "Inwiefern macht das einen Unterschied?", ko: "어떤 점에서 다르다는 건가요?" }
      ] },
      { group: "반론 소개", items: [
        { de: "Man könnte einwenden, dass …", ko: "…라고 반박할 수도 있어요." }
      ] },
      { group: "인정", items: [
        { de: "Dieses Argument ist nicht von der Hand zu weisen.", ko: "그 주장은 쉽게 무시할 수 없어요." },
        { de: "Berechtigte Skepsis.", ko: "의심하실 만해요." }
      ] },
      { group: "고려 요청", items: [
        { de: "Man sollte aber bedenken, dass …", ko: "하지만 …라는 점도 생각해 봐야 해요." }
      ] },
      { group: "요약", items: [
        { de: "Dann würde ich Ihre These so zusammenfassen: …", ko: "그럼 선생님 주장을 이렇게 정리할 수 있겠네요. …" }
      ] }
    ]
  }
];
