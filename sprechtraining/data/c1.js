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
  },
  {
    no: 7, lv: "C1",
    title: "Social Media und Jugendschutz", titleKo: "소셜 미디어와 청소년 보호", type: "Radiodiskussion", typeKo: "방송 토론",
    intro: "라디오 방송에서 사회자와 전문가가 청소년의 소셜 미디어 규제를 논의하는 대화예요.",
    focus: ["Argumentieren", "Abwägen", "Fachsprache"],
    roles: { A: "Moderator", B: "Medienpsychologin" },
    turns: [
      { r: "A", de: "Willkommen zu unserer Sendung. Heute geht es um die Frage, ob soziale Netzwerke für Jugendliche stärker reguliert werden sollten. Zu Gast ist die Medienpsychologin Dr. Lena Brandt. Frau Brandt, wo sehen Sie das größte Problem?", ko: "방송에 오신 것을 환영합니다. 오늘은 청소년을 위해 소셜 네트워크를 더 강하게 규제해야 하는지를 다룹니다. 미디어 심리학자 레나 브란트 박사님을 모셨습니다. 브란트 박사님, 가장 큰 문제가 어디에 있다고 보십니까?" },
      { r: "B", de: "Weniger in den Netzwerken selbst als in ihrer Funktionsweise. Die Algorithmen sind darauf ausgelegt, die Verweildauer zu maximieren, und das trifft Jugendliche besonders hart, deren Selbstkontrolle noch nicht ausgereift ist.", ko: "네트워크 자체보다는 작동 방식에 있습니다. 알고리즘이 이용 시간을 최대로 늘리도록 설계되어 있는데, 자기 통제력이 아직 덜 발달한 청소년에게 특히 큰 영향을 줍니다." },
      { r: "A", de: "Befürworter eines Mindestalters argumentieren, so könne man Jugendliche schützen. Kritiker halten dagegen, ein Verbot sei kaum durchsetzbar und treibe junge Menschen in unkontrollierte Ecken des Internets. Wie bewerten Sie das?", ko: "최소 연령을 찬성하는 쪽은 그렇게 해야 청소년을 보호할 수 있다고 주장합니다. 반대하는 쪽은 금지를 관철하기 어렵고 청소년을 통제되지 않는 인터넷 구석으로 내몬다고 반박합니다. 어떻게 평가하십니까?" },
      { r: "B", de: "Beide Einwände sind berechtigt. Ein pauschales Verbot halte ich für wenig wirksam, weil sich Altersgrenzen leicht umgehen lassen. Sinnvoller wäre es, die Plattformen in die Pflicht zu nehmen, etwa durch Voreinstellungen, die die Nachtnutzung begrenzen, und durch mehr Transparenz bei den Algorithmen.", ko: "두 반론 모두 타당합니다. 일괄적인 금지는 연령 제한을 쉽게 피할 수 있어서 효과가 적다고 봅니다. 플랫폼에 책임을 지우는 편이 더 의미 있습니다. 예를 들어 야간 사용을 제한하는 기본 설정과 알고리즘의 투명성 강화가 있겠습니다." },
      { r: "A", de: "Das würde die Anbieter aber wirtschaftlich treffen. Rechnen Sie mit Widerstand?", ko: "하지만 그것은 사업자에게 경제적 타격이 될 텐데요. 저항을 예상하십니까?" },
      { r: "B", de: "Zweifellos. Die Geschäftsmodelle beruhen auf Aufmerksamkeit. Doch wie der Verbraucherschutz in anderen Branchen zeigt, verhindern klare Vorgaben nicht zwangsläufig Innovation.", ko: "틀림없습니다. 사업 모델이 주목에 기반하니까요. 하지만 다른 업종의 소비자 보호가 보여 주듯, 분명한 기준이 반드시 혁신을 막지는 않습니다." },
      { r: "A", de: "Welche Rolle spielen die Eltern in diesem Gefüge? Es heißt oft, die Verantwortung werde auf sie abgewälzt.", ko: "이 구도에서 부모는 어떤 역할을 합니까? 책임이 부모에게 떠넘겨진다는 말이 자주 나옵니다." },
      { r: "B", de: "Zu Recht. Eltern können kaum kontrollieren, was ihre Kinder auf mehreren Geräten tun. Medienkompetenz muss deshalb in der Schule vermittelt werden, und zwar nicht als Zusatzangebot, sondern als fester Bestandteil des Unterrichts.", ko: "옳은 지적입니다. 부모는 아이가 여러 기기에서 하는 일을 거의 통제할 수 없습니다. 그래서 미디어 이해력은 학교에서 가르쳐야 하고, 부가 프로그램이 아니라 수업의 고정된 일부여야 합니다." },
      { r: "A", de: "Sie plädieren also für einen Dreiklang aus Regulierung, Schule und Elternhaus?", ko: "그러니까 규제, 학교, 가정의 삼중주를 주장하시는 거군요?" },
      { r: "B", de: "So könnte man es zusammenfassen. Wichtig ist mir allerdings, dass wir Jugendliche nicht nur als Schutzbedürftige betrachten. Sie sollten an den Regeln beteiligt werden, die ihren Alltag betreffen.", ko: "그렇게 요약할 수 있겠습니다. 다만 제게 중요한 것은 청소년을 보호받아야 할 대상으로만 보지 않는 것입니다. 자신의 일상에 관한 규칙에는 청소년도 참여해야 합니다." },
      { r: "A", de: "Ein wichtiger Gedanke zum Schluss. Frau Brandt, haben Sie vielen Dank für das Gespräch.", ko: "마무리로 중요한 생각이네요. 브란트 박사님, 대화 감사합니다." },
      { r: "B", de: "Sehr gern. Danke für die Einladung.", ko: "별말씀을요. 초대해 주셔서 감사합니다." }
    ],
    redemittel: [
      { group: "Problem benennen", items: [
        { de: "Das größte Problem liegt weniger in den Netzwerken selbst als in ihrer Funktionsweise.", ko: "가장 큰 문제는 네트워크 자체보다 작동 방식에 있습니다." }
      ] },
      { group: "Positionen gegenüberstellen", items: [
        { de: "Befürworter argumentieren, so könne man Jugendliche schützen.", ko: "찬성하는 쪽은 그렇게 해야 청소년을 보호할 수 있다고 주장합니다." },
        { de: "Kritiker halten dagegen, ein Verbot sei kaum durchsetzbar.", ko: "반대하는 쪽은 금지를 관철하기 어렵다고 반박합니다." }
      ] },
      { group: "Abwägen", items: [
        { de: "Beide Einwände sind berechtigt.", ko: "두 반론 모두 타당합니다." },
        { de: "Ein pauschales Verbot halte ich für wenig wirksam.", ko: "일괄 금지는 효과가 적다고 봅니다." }
      ] },
      { group: "Vorschläge machen", items: [
        { de: "Sinnvoller wäre es, die Plattformen in die Pflicht zu nehmen.", ko: "플랫폼에 책임을 지우는 편이 더 의미 있습니다." },
        { de: "Sie plädieren also für …?", ko: "그러니까 …를 주장하시는 거군요?" }
      ] },
      { group: "Gesprächsrahmen", items: [
        { de: "Zu Gast ist …", ko: "…를 모셨습니다." },
        { de: "Ein wichtiger Gedanke zum Schluss.", ko: "마무리로 중요한 생각이네요." }
      ] }
    ]
  },
  {
    no: 8, lv: "C1",
    title: "In der Ausstellung", titleKo: "전시회에서", type: "Kultur", typeKo: "문화",
    intro: "현대 미술 전시에서 작품을 두고 친구끼리 해석을 나누는 대화예요.",
    focus: ["Interpretieren", "Ironie", "Konjunktiv"],
    roles: { A: "Clara", B: "Felix" },
    turns: [
      { r: "A", de: "Was sagst du zu dieser Installation? Ich stehe seit fünf Minuten davor und weiß nicht, ob ich sie genial oder prätentiös finden soll.", ko: "이 설치 작품 어떻게 생각해? 5분째 앞에 서 있는데 천재적인지 허세인지 모르겠어." },
      { r: "B", de: "Ehrlich gesagt schwanke ich auch. Die Idee, Alltagsgegenstände aus Plastik wie Überreste einer untergegangenen Zivilisation zu zeigen, finde ich stark. Nur wirkt die Inszenierung ein bisschen überladen.", ko: "솔직히 나도 흔들려. 플라스틱 일상용품을 사라진 문명의 유물처럼 보여 주는 아이디어는 강렬하다고 생각해. 다만 연출이 좀 과해 보여." },
      { r: "A", de: "Genau das ist es. Die Botschaft liegt auf der Hand, und dann wird sie mit Nebel und Spotlights noch einmal unterstrichen. Als traute der Künstler dem Publikum nicht zu, es selbst zu verstehen.", ko: "바로 그거야. 메시지가 뻔한데 안개와 조명으로 한 번 더 강조하잖아. 마치 작가가 관객이 스스로 이해하리라 믿지 않는 것처럼." },
      { r: "B", de: "Vielleicht ist das aber Absicht. Möglicherweise spielt er mit der Übertreibung, um unseren Konsum zu parodieren.", ko: "어쩌면 의도일 수도 있어. 우리의 소비를 풍자하려고 일부러 과장하는 걸지도 몰라." },
      { r: "A", de: "Das wäre eine großzügige Lesart. Dann wird die Kritik selbst zum Spektakel, und wir stehen hier und machen Fotos für unsere Feeds. Ironie, oder?", ko: "후하게 해석하는 거네. 그러면 비판 자체가 구경거리가 되고, 우리는 여기서 피드에 올릴 사진을 찍고 있지. 아이러니하지 않아?" },
      { r: "B", de: "Touché. Dieses Dilemma haben viele politische Kunstwerke: Sie wollen aufrütteln und werden dabei zur Ware.", ko: "한 방 먹었네. 정치적인 예술 작품 상당수가 그런 딜레마를 안고 있어. 흔들어 깨우려다 상품이 되어 버리는 거지." },
      { r: "A", de: "Und trotzdem bleibt es hängen. Ich werde morgen beim Einkaufen garantiert zweimal überlegen, ob ich die Plastiktüte nehme.", ko: "그래도 기억에는 남아. 내일 장 볼 때 비닐봉지를 쓸지 분명히 두 번은 고민하게 될 거야." },
      { r: "B", de: "Dann hat das Werk seinen Zweck erfüllt, auch wenn es ästhetisch nicht alles überzeugt.", ko: "그럼 작품은 목적을 이룬 거네, 미적으로 다 설득되지는 않더라도." },
      { r: "A", de: "Lass uns in den nächsten Raum gehen. Dort soll es eine Videoarbeit geben, die laut Katalog ganz ohne Sprache auskommt.", ko: "다음 전시실로 가 보자. 카탈로그에 따르면 말 없이 진행되는 영상 작품이 있대." },
      { r: "B", de: "Gern. Nach so viel Reizüberflutung tut ein wenig Stille bestimmt gut.", ko: "좋아. 이렇게 자극이 넘친 뒤라 약간의 정적이 분명 좋을 거야." },
      { r: "A", de: "Und danach trinken wir im Museumscafé einen Kaffee und streiten weiter?", ko: "그러고 나서 미술관 카페에서 커피 마시면서 계속 논쟁하자?" },
      { r: "B", de: "Abgemacht. Allerdings zahlst du, weil ich vorhin die Eintrittskarten gekauft habe.", ko: "좋아. 그런데 아까 입장권을 내가 샀으니까 커피는 네가 사." }
    ],
    redemittel: [
      { group: "Unsicherheit ausdrücken", items: [
        { de: "Ich weiß nicht, ob ich sie genial oder prätentiös finden soll.", ko: "천재적인지 허세인지 모르겠어." },
        { de: "Ehrlich gesagt schwanke ich auch.", ko: "솔직히 나도 흔들려." }
      ] },
      { group: "Werk beurteilen", items: [
        { de: "Die Idee finde ich stark.", ko: "그 아이디어는 강렬하다고 생각해." },
        { de: "Die Inszenierung wirkt überladen.", ko: "연출이 과해 보여." }
      ] },
      { group: "Deuten", items: [
        { de: "Möglicherweise spielt er mit der Übertreibung.", ko: "어쩌면 일부러 과장하는 걸지도 몰라." },
        { de: "Das wäre eine großzügige Lesart.", ko: "후하게 해석하는 거네." }
      ] },
      { group: "Konzedieren", items: [
        { de: "Touché.", ko: "한 방 먹었네." },
        { de: "Und trotzdem bleibt es hängen.", ko: "그래도 기억에는 남아." }
      ] },
      { group: "Vorschlagen und abmachen", items: [
        { de: "Lass uns in den nächsten Raum gehen.", ko: "다음 전시실로 가 보자." },
        { de: "Abgemacht.", ko: "좋아, 그렇게 하자." }
      ] }
    ]
  },
  {
    no: 9, lv: "C1",
    title: "Das Jahresgespräch", titleKo: "연간 면담", type: "Beruf", typeKo: "직장",
    intro: "상사가 직원과 한 해를 돌아보며 비판과 성장 계획을 이야기하는 대화예요.",
    focus: ["Feedback geben", "Diplomatisch formulieren", "Entwicklungsplan"],
    roles: { A: "Vorgesetzte", B: "Mitarbeiter" },
    turns: [
      { r: "A", de: "Herr Weber, danke, dass Sie sich Zeit nehmen. Ich möchte mit Ihnen zunächst auf das vergangene Jahr zurückblicken. Insgesamt bin ich mit Ihrer Arbeit sehr zufrieden.", ko: "베버 씨, 시간 내 주셔서 감사해요. 먼저 지난 한 해를 함께 돌아보고 싶어요. 전반적으로 당신의 업무에 매우 만족해요." },
      { r: "B", de: "Das freut mich zu hören. Gibt es etwas, das aus Ihrer Sicht besonders gut gelaufen ist?", ko: "그렇게 말씀해 주시니 기뻐요. 특별히 잘됐다고 보시는 부분이 있나요?" },
      { r: "A", de: "Vor allem die Einführung des neuen Berichtssystems. Sie haben das Projekt nicht nur termingerecht abgeschlossen, sondern auch die Kollegen vorbildlich eingebunden. Ein Punkt liegt mir allerdings am Herzen.", ko: "특히 새 보고 시스템 도입이에요. 기한 내에 끝냈을 뿐 아니라 동료들도 모범적으로 참여시켰죠. 다만 마음에 걸리는 점이 하나 있어요." },
      { r: "B", de: "Bitte sprechen Sie offen. Ich bin an ehrlichem Feedback interessiert.", ko: "솔직하게 말씀해 주세요. 저는 솔직한 피드백을 원해요." },
      { r: "A", de: "In den Besprechungen habe ich den Eindruck, dass Sie sich mit Einwänden zurückhalten, obwohl Sie fachlich oft die fundiertere Position hätten. Das kostet das Team wertvolle Perspektiven.", ko: "회의에서 이의를 제기하는 걸 자제하시는 인상을 받았어요. 전문적으로는 더 탄탄한 입장일 때가 많은데도요. 그러면 팀이 소중한 관점을 잃어요." },
      { r: "B", de: "Das trifft einen wunden Punkt. Ich wollte nicht als besserwisserisch gelten, vor allem, weil ich neu im Team war.", ko: "아픈 곳을 짚으셨네요. 저는 아는 체한다는 인상을 주고 싶지 않았어요. 특히 팀에 새로 들어온 처지였으니까요." },
      { r: "A", de: "Das kann ich nachvollziehen. Aber inzwischen gehören Sie dazu, und Ihre Einschätzung hat Gewicht. Ich würde mir wünschen, dass Sie künftig früher Stellung beziehen.", ko: "이해해요. 하지만 이제는 팀의 일원이고 당신의 판단은 무게가 있어요. 앞으로는 더 일찍 입장을 밝혀 주면 좋겠어요." },
      { r: "B", de: "Ich werde es versuchen. Hilfreich wäre es, wenn Agenda und Unterlagen früher verschickt würden, damit ich mich vorbereiten kann.", ko: "노력해 볼게요. 의제와 자료가 더 일찍 발송되면 준비할 수 있어서 도움이 될 거예요." },
      { r: "A", de: "Das ist ein berechtigter Wunsch, den ich gern umsetze. Gibt es darüber hinaus etwas, das Ihnen die Arbeit erschwert?", ko: "정당한 요청이에요. 기꺼이 반영할게요. 그 밖에 일을 어렵게 하는 것이 있나요?" },
      { r: "B", de: "Ehrlich gesagt hätte ich Interesse, mehr Verantwortung zu übernehmen, etwa als Projektleiter für das nächste Vorhaben.", ko: "솔직히 더 많은 책임을 맡고 싶어요. 예를 들어 다음 프로젝트의 프로젝트 리더로요." },
      { r: "A", de: "Das halte ich für realistisch. Lassen Sie uns im nächsten Quartal gemeinsam einen Entwicklungsplan aufsetzen, der auch eine Weiterbildung im Bereich Führung umfasst.", ko: "현실적이라고 생각해요. 다음 분기에 리더십 교육까지 포함한 성장 계획을 함께 세워요." },
      { r: "B", de: "Das wäre ein großer Schritt für mich. Vielen Dank für das Vertrauen.", ko: "저에게 큰 걸음이 될 거예요. 믿어 주셔서 감사해요." }
    ],
    redemittel: [
      { group: "Würdigen", items: [
        { de: "Insgesamt bin ich mit Ihrer Arbeit sehr zufrieden.", ko: "전반적으로 업무에 매우 만족해요." },
        { de: "Sie haben die Kollegen vorbildlich eingebunden.", ko: "동료들을 모범적으로 참여시켰어요." }
      ] },
      { group: "Kritik diplomatisch äußern", items: [
        { de: "Ein Punkt liegt mir allerdings am Herzen.", ko: "다만 마음에 걸리는 점이 하나 있어요." },
        { de: "Ich habe den Eindruck, dass Sie sich zurückhalten.", ko: "자제하시는 인상을 받았어요." }
      ] },
      { group: "Auf Kritik reagieren", items: [
        { de: "Das trifft einen wunden Punkt.", ko: "아픈 곳을 짚으셨네요." },
        { de: "Ich werde es versuchen.", ko: "노력해 볼게요." }
      ] },
      { group: "Wünsche formulieren", items: [
        { de: "Ich würde mir wünschen, dass Sie früher Stellung beziehen.", ko: "더 일찍 입장을 밝혀 주면 좋겠어요." },
        { de: "Hilfreich wäre es, wenn Unterlagen früher verschickt würden.", ko: "자료가 더 일찍 발송되면 도움이 될 거예요." }
      ] },
      { group: "Perspektive entwickeln", items: [
        { de: "Ich hätte Interesse, mehr Verantwortung zu übernehmen.", ko: "더 많은 책임을 맡고 싶어요." },
        { de: "Lassen Sie uns einen Entwicklungsplan aufsetzen.", ko: "성장 계획을 함께 세워요." }
      ] }
    ]
  }
];
