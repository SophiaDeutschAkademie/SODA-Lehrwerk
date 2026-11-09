/* SODA SCHREIBTRAINING · 쓰기 훈련 데이터 (A1–C1, 레벨별 2챕터)
 *
 * 챕터 하나의 구조
 *   id, level, no, title(독일어), titleKo, type, typeKo, exam(어떤 시험 유형과 같은지), time(권장 분), words[최소, 최대]
 *   intro        이 챕터에서 쓰는 글 소개
 *   goals        이 챕터의 목표
 *   aufbau       글의 구조: [{ de: 독일어 이름, ko: 한국어 이름, ex: 예시 }]
 *   tipps        쓰기 요령
 *   fehler       자주 하는 실수: [{ f: 틀린 문장, r: 고친 문장, e: 설명 }]
 *   redemittel   표현: [{ g: 묶음 이름, items: [[독일어, 한국어], …] }]
 *   uebung       연습: { t:'mc'|'fill'|'fix', q, o(객관식 보기), a(정답 번호 또는 인정 답 목록), e(설명) }
 *                fill의 빈칸은 ___, fix는 q의 틀린 문장을 고쳐 쓰는 문제
 *   aufgabe      쓰기 과제: { lead, brief?, chart?, punkte, close, ko: { lead, brief?, punkte, close } }
 *   check        스스로 점검하기
 *   muster       모범답안: { de: [문단], ko: [문단], notes: [{ de, ko }] }
 */
window.SCHREIB_DATA = [

/* ═══════════════════════ A1 ═══════════════════════ */
{
  id: 'a1-01', level: 'A1', no: 1,
  title: 'Eine Nachricht an eine Freundin', titleKo: '친구에게 짧은 메시지 쓰기',
  type: 'Kurznachricht', typeKo: '짧은 메시지',
  exam: 'Goethe-Zertifikat A1 쓰기 Teil 2와 같은 유형',
  time: 10, words: [20, 40],
  intro: '친구에게 약속에 갈 수 없다고 알리는 짧은 메시지를 써요. 과제에 나온 세 가지 내용을 하나도 빠뜨리지 않고 쓰는 연습을 해요.',
  goals: ['친구를 부르는 말과 끝인사를 바르게 써요', '못 가는 이유를 짧은 문장으로 말해요', '다른 날을 질문으로 제안해요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Liebe Lena,' },
    { de: 'Entschuldigung', ko: '사과', ex: 'es tut mir leid, aber ich kann am Samstag nicht kommen.' },
    { de: 'Grund', ko: '이유', ex: 'Ich bin krank.' },
    { de: 'Vorschlag', ko: '새 제안', ex: 'Hast du am Sonntag Zeit?' },
    { de: 'Gruß und Name', ko: '끝인사와 이름', ex: 'Liebe Grüße / Minji' }
  ],
  tipps: [
    '과제의 점 세 개가 곧 채점 기준이에요. 점마다 한 문장 이상 쓰세요.',
    '부르는 말 뒤에는 쉼표를 찍고, 다음 줄은 소문자로 시작해요. Liebe Lena, → es tut mir leid …',
    '여자 친구에게는 Liebe, 남자 친구에게는 Lieber를 써요. Hallo는 둘 다 쓸 수 있어요.',
    '이유는 weil 없이 짧은 문장 하나로 충분해요. Ich bin krank. / Ich muss arbeiten.'
  ],
  fehler: [
    { f: 'Liebe Tom,', r: 'Lieber Tom,', e: '남자에게는 Lieber를 써요.' },
    { f: 'Leider ich kann nicht kommen.', r: 'Leider kann ich nicht kommen.', e: 'Leider가 첫 자리에 오면 동사 kann이 바로 두 번째 자리에 와요.' },
    { f: 'Ich kann nicht kommen am Samstag.', r: 'Ich kann am Samstag nicht kommen.', e: '화법조동사와 함께 쓰는 원형 kommen은 문장 맨 끝에 와요.' },
    { f: 'Liebe Lena, Es tut mir leid …', r: 'Liebe Lena, es tut mir leid …', e: '부르는 말 뒤 쉼표 다음 줄은 소문자로 시작해요.' }
  ],
  redemittel: [
    { g: '부르는 말', items: [['Liebe Lena,', '레나에게 (여자)'], ['Lieber Jonas,', '요나스에게 (남자)'], ['Hallo Lena,', '안녕, 레나']] },
    { g: '사과하기', items: [['Es tut mir leid.', '미안해.'], ['Leider kann ich am Samstag nicht kommen.', '아쉽지만 토요일에 못 가.'], ['Entschuldige bitte!', '미안해!']] },
    { g: '이유 말하기', items: [['Ich bin krank.', '나 아파.'], ['Ich muss arbeiten.', '일해야 해.'], ['Meine Eltern besuchen mich.', '부모님이 나를 보러 오셔.'], ['Ich habe einen Termin beim Arzt.', '병원 예약이 있어.']] },
    { g: '새로 제안하기', items: [['Hast du am Sonntag Zeit?', '일요일에 시간 있어?'], ['Können wir am Montag ins Kino gehen?', '월요일에 영화 보러 갈 수 있을까?'], ['Geht es am Freitag um 18 Uhr?', '금요일 6시는 어때?']] },
    { g: '끝인사', items: [['Bis bald!', '곧 보자!'], ['Liebe Grüße', '안녕 (다정한 끝인사)'], ['Viele Grüße', '안녕 (무난한 끝인사)']] }
  ],
  uebung: [
    { t: 'mc', q: '남자 친구 Jonas에게 쓸 때 알맞은 부르는 말은?', o: ['Liebe Jonas,', 'Lieber Jonas,', 'Liebes Jonas,'], a: 1, e: '남자에게는 Lieber, 여자에게는 Liebe를 써요.' },
    { t: 'mc', q: '어순이 바른 문장은?', o: ['Leider ich kann nicht kommen.', 'Leider kann ich nicht kommen.', 'Leider kann ich kommen nicht.'], a: 1, e: 'Leider가 첫 자리에 오면 동사 kann이 두 번째 자리에 와요. 원형 kommen은 맨 끝이에요.' },
    { t: 'fill', q: '___ du am Sonntag Zeit?', a: ['Hast'], e: 'du와 함께 쓰는 haben은 hast예요. 질문이라 동사가 맨 앞에 와요.' },
    { t: 'fill', q: 'Ich ___ am Samstag arbeiten. (müssen)', a: ['muss'], e: 'ich와 함께 쓰는 müssen은 muss예요.' },
    { t: 'mc', q: '친구에게 보내는 메시지의 끝인사로 알맞은 것은?', o: ['Sehr geehrte Damen und Herren', 'Liebe Grüße', 'Mit freundlichen Grüßen'], a: 1, e: 'Mit freundlichen Grüßen은 기관이나 잘 모르는 사람에게 쓰는 격식 있는 끝인사예요.' },
    { t: 'fix', q: 'Am Samstag ich habe keine Zeit.', a: ['Am Samstag habe ich keine Zeit.'], e: 'Am Samstag이 첫 자리에 오면 동사 habe가 두 번째, 주어 ich가 그 뒤에 와요.' }
  ],
  aufgabe: {
    lead: 'Sie haben am Samstag eine Verabredung mit Ihrer Freundin Lena. Sie können nicht kommen. Schreiben Sie Lena eine Nachricht.',
    punkte: ['Entschuldigen Sie sich.', 'Warum können Sie nicht kommen?', 'Machen Sie einen neuen Termin.'],
    close: 'Schreiben Sie 20–40 Wörter. Schreiben Sie zu allen drei Punkten.',
    ko: {
      lead: '토요일에 친구 레나와 약속이 있어요. 그런데 갈 수 없어요. 레나에게 메시지를 쓰세요.',
      punkte: ['사과하세요.', '왜 갈 수 없나요?', '새 약속을 잡으세요.'],
      close: '20–40단어로 쓰세요. 세 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['Liebe Lena, 또는 Hallo Lena,로 시작했어요.', '사과하는 문장을 썼어요.', '못 가는 이유를 썼어요.', '새 날짜나 시간을 제안했어요.', '끝인사와 내 이름을 썼어요.', '모든 문장에서 동사가 두 번째 자리에 있어요. (질문은 맨 앞)'],
  muster: {
    de: [
      'Liebe Lena,',
      'es tut mir leid, aber ich kann am Samstag nicht kommen. Ich bin krank und muss im Bett bleiben. Hast du am Sonntag Zeit? Dann können wir ins Café gehen.',
      'Liebe Grüße\nMinji'
    ],
    ko: [
      '레나에게,',
      '미안하지만 토요일에 못 가. 아파서 침대에 누워 있어야 해. 일요일에 시간 있어? 그러면 카페에 갈 수 있어.',
      '안녕,\n민지가'
    ],
    notes: [
      { de: 'es tut mir leid, aber …', ko: '부르는 말 다음 줄이라 소문자로 시작해요. aber 앞에는 쉼표를 찍어요.' },
      { de: 'muss im Bett bleiben', ko: '화법조동사 muss와 함께 쓰는 원형 bleiben은 문장 끝에 와요.' },
      { de: 'Hast du am Sonntag Zeit?', ko: '새 약속은 질문으로 제안하면 자연스러워요.' },
      { de: 'Dann können wir …', ko: 'Dann이 첫 자리라 동사 können이 두 번째, 주어 wir가 세 번째예요.' }
    ]
  }
},
{
  id: 'a1-02', level: 'A1', no: 2,
  title: 'Eine E-Mail an die Sprachschule', titleKo: '어학원에 문의 메일 쓰기',
  type: 'Formelle E-Mail', typeKo: '격식 이메일',
  exam: 'Goethe-Zertifikat A1 쓰기 Teil 2와 같은 유형',
  time: 10, words: [25, 45],
  intro: '모르는 사람이나 기관에 보내는 짧은 격식 이메일을 써요. 친구에게 쓰는 메시지와 무엇이 다른지 부르는 말, 끝인사, Sie를 중심으로 익혀요.',
  goals: ['Sehr geehrte …와 Mit freundlichen Grüßen을 바르게 써요', '처음부터 끝까지 Sie로 써요', 'W-질문으로 궁금한 것을 물어요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Sehr geehrte Damen und Herren,' },
    { de: 'Vorstellung', ko: '나와 용건', ex: 'mein Name ist Jisu Park. Ich möchte einen Deutschkurs machen.' },
    { de: 'Fragen', ko: '질문', ex: 'Wann beginnt der Kurs? Was kostet er?' },
    { de: 'Bitte', ko: '부탁', ex: 'Bitte schicken Sie mir Informationen.' },
    { de: 'Gruß und Name', ko: '끝인사와 이름(성까지)', ex: 'Mit freundlichen Grüßen / Jisu Park' }
  ],
  tipps: [
    '받는 사람의 이름을 모르면 Sehr geehrte Damen und Herren,으로 시작해요.',
    '이름을 알면 여자는 Sehr geehrte Frau …, 남자는 Sehr geehrter Herr …예요.',
    '격식 이메일에서는 du를 쓰지 않아요. 동사도 Sie에 맞춰요. Können Sie …?',
    '끝에는 이름과 성을 모두 써요.'
  ],
  fehler: [
    { f: 'Sehr geehrte Herr Klein,', r: 'Sehr geehrter Herr Klein,', e: '남자에게는 geehrter예요.' },
    { f: 'Hallo Damen und Herren,', r: 'Sehr geehrte Damen und Herren,', e: '격식 이메일에서는 Hallo를 쓰지 않아요.' },
    { f: 'Kannst du mir Informationen schicken?', r: 'Können Sie mir Informationen schicken?', e: '어학원 직원에게는 Sie를 써요.' },
    { f: 'Wann der Kurs beginnt?', r: 'Wann beginnt der Kurs?', e: 'W-질문에서는 동사가 의문사 바로 뒤에 와요.' }
  ],
  redemittel: [
    { g: '부르는 말', items: [['Sehr geehrte Damen und Herren,', '담당자님께 (이름을 모를 때)'], ['Sehr geehrte Frau Becker,', '베커 님께 (여자)'], ['Sehr geehrter Herr Klein,', '클라인 님께 (남자)']] },
    { g: '나와 용건', items: [['Mein Name ist Jisu Park.', '제 이름은 박지수예요.'], ['Ich möchte einen Deutschkurs machen.', '독일어 수업을 듣고 싶어요.'], ['Ich habe eine Frage.', '질문이 하나 있어요.']] },
    { g: '질문하기', items: [['Wann beginnt der Kurs?', '수업은 언제 시작해요?'], ['Was kostet der Kurs?', '수업료는 얼마예요?'], ['Wie lange dauert der Kurs?', '수업은 얼마 동안 해요?'], ['Gibt es auch Kurse am Abend?', '저녁 수업도 있어요?']] },
    { g: '부탁하기', items: [['Bitte schicken Sie mir Informationen.', '안내 자료를 보내 주세요.'], ['Können Sie mir bitte antworten?', '답장해 주실 수 있어요?']] },
    { g: '끝인사', items: [['Vielen Dank!', '감사합니다!'], ['Mit freundlichen Grüßen', '안녕히 계세요 (격식 있는 끝인사)']] }
  ],
  uebung: [
    { t: 'mc', q: '이름을 모르는 어학원 직원에게 쓰는 부르는 말은?', o: ['Liebe Damen und Herren,', 'Sehr geehrte Damen und Herren,', 'Hallo Leute,'], a: 1, e: '이름을 모르는 사람에게 쓰는 격식 있는 부르는 말이에요.' },
    { t: 'mc', q: 'Herr Klein에게 쓸 때 알맞은 것은?', o: ['Sehr geehrte Herr Klein,', 'Sehr geehrter Herr Klein,', 'Sehr geehrtes Herr Klein,'], a: 1, e: '남자에게는 geehrter, 여자에게는 geehrte예요.' },
    { t: 'fill', q: '___ Sie mir bitte Informationen schicken?', a: ['Können'], e: 'Sie와 함께 쓰는 können은 können이에요. 질문이라 맨 앞에 와요.' },
    { t: 'fill', q: 'Was ___ der Kurs?', a: ['kostet'], e: 'der Kurs는 er와 같아서 kosten이 kostet가 돼요.' },
    { t: 'fix', q: 'Wann der Kurs beginnt?', a: ['Wann beginnt der Kurs?'], e: 'W-질문에서는 의문사 바로 뒤에 동사가 와요.' },
    { t: 'mc', q: '격식 이메일의 끝인사로 알맞은 것은?', o: ['Bis bald!', 'Mit freundlichen Grüßen', 'Tschüss'], a: 1, e: 'Bis bald와 Tschüss는 친구에게 쓰는 말이에요.' }
  ],
  aufgabe: {
    lead: 'Sie möchten in Berlin einen Deutschkurs machen. Schreiben Sie eine E-Mail an die Sprachschule „Deutsch aktiv“.',
    punkte: ['Sie möchten einen Kurs am Abend besuchen.', 'Wann beginnt der Kurs?', 'Was kostet der Kurs?'],
    close: 'Schreiben Sie 25–45 Wörter. Vergessen Sie die Anrede und den Gruß nicht.',
    ko: {
      lead: '베를린에서 독일어 수업을 듣고 싶어요. 어학원 „Deutsch aktiv“에 이메일을 쓰세요.',
      punkte: ['저녁 수업을 듣고 싶어요.', '수업은 언제 시작하나요?', '수업료는 얼마인가요?'],
      close: '25–45단어로 쓰세요. 부르는 말과 끝인사를 잊지 마세요.'
    }
  },
  check: ['Sehr geehrte Damen und Herren,으로 시작했어요.', '이름과 용건을 밝혔어요.', '저녁 수업을 듣고 싶다고 썼어요.', '시작 날짜와 수업료를 물었어요.', '처음부터 끝까지 Sie로 썼어요.', 'Mit freundlichen Grüßen과 이름·성으로 끝냈어요.'],
  muster: {
    de: [
      'Sehr geehrte Damen und Herren,',
      'mein Name ist Jisu Park. Ich möchte in Berlin einen Deutschkurs am Abend machen. Wann beginnt der Kurs? Und was kostet er? Bitte schicken Sie mir Informationen.',
      'Mit freundlichen Grüßen\nJisu Park'
    ],
    ko: [
      '담당자님께,',
      '제 이름은 박지수예요. 베를린에서 저녁 독일어 수업을 듣고 싶어요. 수업은 언제 시작하나요? 그리고 수업료는 얼마인가요? 안내 자료를 보내 주세요.',
      '안녕히 계세요.\n박지수 드림'
    ],
    notes: [
      { de: 'mein Name ist …', ko: '부르는 말 다음 줄이라 소문자로 시작해요.' },
      { de: 'einen Deutschkurs am Abend machen', ko: '화법조동사 möchte와 함께 쓰는 원형 machen은 맨 끝에 와요.' },
      { de: 'Und was kostet er?', ko: 'der Kurs를 대명사 er로 받아서 같은 말을 되풀이하지 않았어요.' },
      { de: 'Bitte schicken Sie mir …', ko: 'Sie에게 하는 부탁이에요. Bitte를 붙이면 정중해져요.' }
    ]
  }
},

/* ═══════════════════════ A2 ═══════════════════════ */
{
  id: 'a2-01', level: 'A2', no: 1,
  title: 'Ich bin umgezogen!', titleKo: '친구에게 이사 소식 전하기',
  type: 'Persönliche E-Mail', typeKo: '개인 이메일',
  exam: 'Goethe-Zertifikat A2 쓰기와 같은 유형',
  time: 15, words: [40, 60],
  intro: '지난주에 있었던 일을 친구에게 이메일로 전해요. 현재완료로 지난 일을 말하고, 새집을 설명하고, 친구를 초대해요.',
  goals: ['현재완료로 지난 일을 말해요', 'haben과 sein 가운데 맞는 것을 골라요', '친구를 초대하고 시간을 정해요'],
  aufbau: [
    { de: 'Anrede und Einstieg', ko: '부르는 말과 첫 문장', ex: 'Lieber Paul, wie geht es dir?' },
    { de: 'Was ist passiert?', ko: '무슨 일이 있었는지', ex: 'Ich bin letzte Woche umgezogen!' },
    { de: 'Beschreibung', ko: '새집 설명', ex: 'Die Wohnung ist hell und ruhig.' },
    { de: 'Wer hat geholfen?', ko: '누가 도와줬는지', ex: 'Meine Schwester hat mir geholfen.' },
    { de: 'Einladung', ko: '초대', ex: 'Hast du am Samstag Zeit?' },
    { de: 'Gruß', ko: '끝인사', ex: 'Viele Grüße / Hana' }
  ],
  tipps: [
    '지난 일은 현재완료로 써요. haben 또는 sein이 두 번째 자리, 과거분사가 맨 끝이에요.',
    '장소가 바뀌는 동사(umziehen, fahren, kommen)는 sein과 함께 써요.',
    'wie geht es dir? 같은 첫 문장 하나를 넣으면 이메일이 자연스러워져요.',
    '초대할 때는 요일과 시간을 정확히 써요.'
  ],
  fehler: [
    { f: 'Ich habe umgezogen.', r: 'Ich bin umgezogen.', e: 'umziehen은 사는 곳이 바뀌는 동사라서 sein과 함께 써요.' },
    { f: 'Meine Schwester hat mir geholft.', r: 'Meine Schwester hat mir geholfen.', e: 'helfen의 과거분사는 geholfen이에요.' },
    { f: 'Letzte Woche ich bin umgezogen.', r: 'Letzte Woche bin ich umgezogen.', e: 'Letzte Woche가 첫 자리면 동사 bin이 두 번째예요.' },
    { f: 'Ich freue mich über deinen Besuch.', r: 'Ich freue mich auf deinen Besuch.', e: '앞으로 올 방문을 기다릴 때는 auf, 이미 온 방문이 기쁠 때는 über예요.' }
  ],
  redemittel: [
    { g: '시작하기', items: [['Lieber Paul,', '파울에게'], ['wie geht es dir?', '잘 지내?'], ['Ich habe tolle Neuigkeiten!', '좋은 소식이 있어!']] },
    { g: '지난 일 말하기', items: [['Ich bin letzte Woche umgezogen.', '나 지난주에 이사했어.'], ['Wir haben den ganzen Tag Kisten getragen.', '우리는 하루 종일 상자를 날랐어.'], ['Am Abend haben wir Pizza bestellt.', '저녁에는 피자를 시켰어.']] },
    { g: '집 설명하기', items: [['Die Wohnung ist hell und ruhig.', '집이 밝고 조용해.'], ['Sie hat zwei Zimmer und einen Balkon.', '방 두 개에 발코니가 하나 있어.'], ['Sie liegt direkt am Park.', '공원 바로 옆에 있어.']] },
    { g: '초대하기', items: [['Hast du am Samstag Zeit?', '토요일에 시간 있어?'], ['Komm doch um 18 Uhr vorbei!', '6시에 들러!'], ['Ich koche für uns.', '내가 요리할게.']] },
    { g: '끝맺기', items: [['Ich freue mich auf deinen Besuch.', '네가 오기를 기다릴게.'], ['Schreib mir bald!', '곧 답장해 줘!'], ['Viele Grüße', '안녕']] }
  ],
  uebung: [
    { t: 'mc', q: 'umziehen(이사하다)의 현재완료로 바른 것은?', o: ['Ich habe umgezogen.', 'Ich bin umgezogen.', 'Ich bin umgezieht.'], a: 1, e: '사는 곳이 바뀌니까 sein, 과거분사는 umgezogen이에요.' },
    { t: 'fill', q: 'Mein Bruder hat mir beim Umzug ___. (helfen)', a: ['geholfen'], e: 'helfen의 과거분사는 geholfen이에요.' },
    { t: 'fill', q: 'Am Abend ___ wir Pizza bestellt.', a: ['haben'], e: 'bestellen은 haben과 함께 현재완료를 만들어요. wir와 함께 쓰니까 haben이에요.' },
    { t: 'mc', q: '친구가 놀러 오기를 기다린다고 말할 때 알맞은 것은?', o: ['Ich freue mich über deinen Besuch.', 'Ich freue mich auf deinen Besuch.', 'Ich freue mich an deinen Besuch.'], a: 1, e: '앞으로 일어날 일을 기다리며 기뻐할 때는 sich freuen auf예요.' },
    { t: 'fix', q: 'Letzte Woche ich bin umgezogen.', a: ['Letzte Woche bin ich umgezogen.'], e: '시간 표현이 첫 자리에 오면 동사가 두 번째, 주어가 그 뒤에 와요.' },
    { t: 'fill', q: 'Die Wohnung ___ zwei Zimmer und einen Balkon. (haben)', a: ['hat'], e: 'die Wohnung은 sie와 같아서 haben이 hat이 돼요.' }
  ],
  aufgabe: {
    lead: 'Sie sind letzte Woche in eine neue Wohnung umgezogen. Schreiben Sie Ihrem Freund Paul eine E-Mail.',
    punkte: ['Wie ist die neue Wohnung?', 'Wer hat beim Umzug geholfen?', 'Laden Sie Paul ein: Wann soll er kommen?'],
    close: 'Schreiben Sie 40–60 Wörter. Schreiben Sie zu allen drei Punkten.',
    ko: {
      lead: '지난주에 새집으로 이사했어요. 친구 파울에게 이메일을 쓰세요.',
      punkte: ['새집은 어떤가요?', '이사할 때 누가 도와줬나요?', '파울을 초대하세요. 언제 오면 되나요?'],
      close: '40–60단어로 쓰세요. 세 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['부르는 말과 첫 문장(wie geht es dir?)을 썼어요.', '새집을 두 가지 이상 설명했어요.', '누가 도와줬는지 현재완료로 썼어요.', '요일이나 시간을 넣어 초대했어요.', 'umziehen은 sein, helfen은 haben으로 썼어요.', '끝인사와 이름을 썼어요.'],
  muster: {
    de: [
      'Lieber Paul,',
      'wie geht es dir? Ich bin letzte Woche umgezogen! Die neue Wohnung ist hell und ruhig und hat einen kleinen Balkon. Meine Schwester und zwei Freunde haben mir beim Umzug geholfen.',
      'Hast du am Samstag Zeit? Dann koche ich für uns. Komm doch um 18 Uhr vorbei!',
      'Viele Grüße\nHana'
    ],
    ko: [
      '파울에게,',
      '잘 지내? 나 지난주에 이사했어! 새집은 밝고 조용하고 작은 발코니도 있어. 언니랑 친구 두 명이 이사를 도와줬어.',
      '토요일에 시간 있어? 그러면 내가 요리할게. 6시에 들러!',
      '안녕,\n하나가'
    ],
    notes: [
      { de: 'Ich bin … umgezogen!', ko: 'umziehen은 sein과 함께 현재완료를 만들어요.' },
      { de: 'ist hell und ruhig und hat …', ko: '주어 하나에 동사 두 개를 und로 이어서 짧게 설명했어요.' },
      { de: 'haben mir beim Umzug geholfen', ko: 'helfen은 3격을 써서 mir예요. beim Umzug = 이사할 때.' },
      { de: 'Komm doch … vorbei!', ko: 'doch를 넣은 명령문은 부드러운 초대가 돼요. vorbeikommen의 vorbei는 맨 끝으로 가요.' }
    ]
  }
},
{
  id: 'a2-02', level: 'A2', no: 2,
  title: 'Krank – eine E-Mail an die Kursleiterin', titleKo: '선생님께 결석 알리기',
  type: 'Halbformelle E-Mail', typeKo: '반격식 이메일',
  exam: 'Goethe-Zertifikat A2 쓰기와 같은 유형',
  time: 15, words: [40, 60],
  intro: '이미 아는 선생님께 결석을 알리는 반격식 이메일을 써요. Sie를 쓰면서도 친근한 부르는 말과 끝인사를 쓰는 방법을 익혀요.',
  goals: ['Liebe Frau …처럼 반격식 부르는 말을 써요', 'Sie로 정중하게 부탁해요', 'zum, beim처럼 줄여 쓰는 전치사를 바르게 써요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Liebe Frau Wagner,' },
    { de: 'Entschuldigung und Grund', ko: '결석 알림과 이유', ex: 'leider kann ich morgen nicht zum Kurs kommen. Ich bin krank.' },
    { de: 'Frage', ko: '질문', ex: 'Welche Hausaufgaben haben wir?' },
    { de: 'Bitte', ko: '부탁', ex: 'Können Sie mir bitte die Seiten schicken?' },
    { de: 'Rückkehr', ko: '언제 다시 오는지', ex: 'Am Montag bin ich wieder da.' },
    { de: 'Gruß', ko: '끝인사', ex: 'Viele Grüße / Seojun Lee' }
  ],
  tipps: [
    '아는 선생님, 이웃, 직장 동료에게는 반격식으로 써요. 부르는 말은 Liebe Frau … / Lieber Herr …, 문장은 Sie예요.',
    '끝인사는 Viele Grüße나 Herzliche Grüße가 알맞아요.',
    'zu + dem = zum, bei + dem = beim처럼 줄여 쓰는 형태를 그대로 외워 두세요.',
    '부탁은 Können Sie mir bitte …?로 시작하면 정중해요.'
  ],
  fehler: [
    { f: 'Liebe Frau Wagner, kannst du mir helfen?', r: 'Liebe Frau Wagner, können Sie mir helfen?', e: '부르는 말이 Liebe여도 선생님께는 Sie를 써요.' },
    { f: 'Ich kann morgen nicht zu Kurs kommen.', r: 'Ich kann morgen nicht zum Kurs kommen.', e: 'der Kurs는 남성이라 zu dem → zum이에요.' },
    { f: 'Gestern war ich bei dem Arzt.', r: 'Gestern war ich beim Arzt.', e: 'bei dem은 보통 beim으로 줄여 써요.' },
    { f: 'Am Montag ich bin wieder da.', r: 'Am Montag bin ich wieder da.', e: '시간 표현이 첫 자리면 동사가 두 번째예요.' }
  ],
  redemittel: [
    { g: '부르는 말', items: [['Liebe Frau Wagner,', '바그너 선생님께'], ['Lieber Herr Schmidt,', '슈미트 선생님께'], ['Sehr geehrte Frau Wagner,', '바그너 선생님께 (더 격식 있게)']] },
    { g: '결석 알리기', items: [['Leider kann ich morgen nicht zum Kurs kommen.', '아쉽지만 내일 수업에 못 가요.'], ['Ich bin krank und habe Fieber.', '아프고 열이 나요.'], ['Gestern war ich beim Arzt.', '어제 병원에 다녀왔어요.']] },
    { g: '묻고 부탁하기', items: [['Welche Hausaufgaben haben wir?', '숙제가 뭐예요?'], ['Können Sie mir bitte die Seiten schicken?', '교재 쪽수를 보내 주실 수 있어요?'], ['Ich mache die Aufgaben zu Hause.', '숙제는 집에서 할게요.']] },
    { g: '다시 오기', items: [['Am Montag bin ich wieder da.', '월요일에는 다시 나갈게요.'], ['Ich komme nächste Woche wieder in den Kurs.', '다음 주에 다시 수업에 갈게요.']] },
    { g: '끝인사', items: [['Viele Grüße', '안녕히 계세요'], ['Herzliche Grüße', '따뜻한 안부를 전해요']] }
  ],
  uebung: [
    { t: 'mc', q: '이미 아는 여자 선생님께 쓰는 반격식 부르는 말은?', o: ['Lieber Frau Wagner,', 'Liebe Frau Wagner,', 'Liebes Frau Wagner,'], a: 1, e: '여자에게는 Liebe예요. 반격식에서는 Liebe Frau + 성으로 불러요.' },
    { t: 'fill', q: 'Ich kann morgen leider nicht ___ Kurs kommen.', a: ['zum'], e: 'zu + dem Kurs = zum Kurs.' },
    { t: 'fill', q: 'Gestern war ich ___ Arzt.', a: ['beim'], e: 'bei + dem Arzt = beim Arzt. 병원에 갔다고 할 때 자주 써요.' },
    { t: 'mc', q: '선생님께 정중하게 부탁하는 문장은?', o: ['Schick mir bitte die Hausaufgaben!', 'Können Sie mir bitte die Hausaufgaben schicken?', 'Du musst mir die Hausaufgaben schicken.'], a: 1, e: '선생님께는 Sie를 쓰고 질문 형식으로 부탁해요.' },
    { t: 'fix', q: 'Am Montag ich bin wieder da.', a: ['Am Montag bin ich wieder da.'], e: 'Am Montag가 첫 자리면 동사 bin이 두 번째예요.' },
    { t: 'mc', q: '반격식 이메일에 가장 알맞은 끝인사는?', o: ['Tschüss!', 'Viele Grüße', 'Hochachtungsvoll'], a: 1, e: 'Tschüss는 친구에게, Hochachtungsvoll은 아주 딱딱한 공문서에 써요.' }
  ],
  aufgabe: {
    lead: 'Sie sind krank und können morgen nicht zum Deutschkurs kommen. Schreiben Sie Ihrer Kursleiterin Frau Wagner eine E-Mail.',
    punkte: ['Entschuldigen Sie sich und sagen Sie, warum Sie nicht kommen.', 'Fragen Sie nach den Hausaufgaben.', 'Wann kommen Sie wieder?'],
    close: 'Schreiben Sie 40–60 Wörter.',
    ko: {
      lead: '아파서 내일 독일어 수업에 갈 수 없어요. 담당 선생님 바그너 선생님께 이메일을 쓰세요.',
      punkte: ['사과하고 왜 못 오는지 말하세요.', '숙제를 물어보세요.', '언제 다시 오나요?'],
      close: '40–60단어로 쓰세요.'
    }
  },
  check: ['Liebe Frau Wagner,로 시작했어요.', '결석 이유를 썼어요.', '숙제를 물어보거나 부탁했어요.', '다시 오는 날을 썼어요.', '처음부터 끝까지 Sie로 썼어요.', 'zum, beim을 바르게 썼어요.'],
  muster: {
    de: [
      'Liebe Frau Wagner,',
      'leider kann ich morgen nicht zum Kurs kommen. Ich bin krank und habe Fieber. Gestern war ich schon beim Arzt.',
      'Welche Hausaufgaben haben wir? Können Sie mir bitte die Seiten schicken? Ich mache die Aufgaben zu Hause. Am Montag bin ich wieder da.',
      'Viele Grüße\nSeojun Lee'
    ],
    ko: [
      '바그너 선생님께,',
      '아쉽지만 내일 수업에 갈 수 없어요. 아프고 열이 나요. 어제 이미 병원에 다녀왔어요.',
      '숙제는 무엇인가요? 교재 쪽수를 보내 주실 수 있을까요? 숙제는 집에서 할게요. 월요일에는 다시 수업에 나갈게요.',
      '안녕히 계세요.\n이서준 드림'
    ],
    notes: [
      { de: 'leider kann ich …', ko: 'leider가 첫 자리라 동사 kann이 두 번째예요. 부르는 말 다음 줄이라 소문자로 시작해요.' },
      { de: 'Gestern war ich schon beim Arzt.', ko: 'sein은 현재완료보다 과거형 war를 더 자주 써요.' },
      { de: 'Welche Hausaufgaben …?', ko: 'welche는 여러 개 가운데 어느 것인지 물을 때 써요.' },
      { de: 'Viele Grüße', ko: '반격식 이메일에 알맞은 끝인사예요.' }
    ]
  }
},

/* ═══════════════════════ B1 ═══════════════════════ */
{
  id: 'b1-01', level: 'B1', no: 1,
  title: 'Antwort auf eine Einladung', titleKo: '집들이 초대에 답장하기',
  type: 'Persönliche E-Mail', typeKo: '개인 이메일',
  exam: 'telc Deutsch B1 · Goethe-Zertifikat B1 개인 이메일 유형',
  time: 25, words: [80, 110],
  intro: '친구의 이메일을 읽고 네 가지 요구 사항에 모두 답하는 개인 이메일을 써요. 요구 사항마다 두세 문장으로 쓰고, 접속사로 문장을 이어 글의 흐름을 만드는 연습을 해요.',
  goals: ['네 가지 요구 사항을 빠짐없이, 요구 사항마다 두세 문장으로 써요', 'weil, deshalb, aber로 이유와 결과를 이어요', '도입 문장과 마무리 문장을 넣어 편지 모양을 갖춰요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Lieber Max,' },
    { de: 'Einleitung', ko: '도입 (받은 편지에 반응)', ex: 'vielen Dank für deine Einladung!' },
    { de: 'Leitpunkt 1–4', ko: '요구 사항 1–4 (단락마다 하나)', ex: 'Natürlich komme ich gern. / Soll ich etwas mitbringen? …' },
    { de: 'Schluss', ko: '마무리 문장', ex: 'Ich freue mich schon sehr auf Samstag!' },
    { de: 'Gruß', ko: '끝인사와 이름', ex: 'Liebe Grüße / Sora' }
  ],
  tipps: [
    '요구 사항 하나에 단락 하나를 쓰면 빠뜨린 내용이 없는지 한눈에 보여요.',
    '요구 사항의 단어를 그대로 베끼지 말고 내 문장으로 바꿔 쓰세요.',
    '이유는 weil(동사 맨 끝) 또는 deshalb(동사 바로 뒤)로 이어요.',
    '도입 한 문장과 마무리 한 문장은 점수를 주는 부분이에요. 꼭 넣으세요.'
  ],
  fehler: [
    { f: 'Ich freue mich auf deine Einladung.', r: 'Ich habe mich über deine Einladung gefreut.', e: '초대는 이미 받았으니 über예요. auf는 앞으로 올 일을 기다릴 때 써요.' },
    { f: 'Ich komme später, weil ich muss bis 20 Uhr arbeiten.', r: 'Ich komme später, weil ich bis 20 Uhr arbeiten muss.', e: 'weil 문장에서는 변화한 동사 muss가 맨 끝에 와요.' },
    { f: 'Herzlichen Glückwunsch für die neue Wohnung!', r: 'Herzlichen Glückwunsch zur neuen Wohnung!', e: 'Glückwunsch는 zu와 함께 써요. zu der → zur.' },
    { f: 'Deshalb ich komme etwas später.', r: 'Deshalb komme ich etwas später.', e: 'deshalb는 첫 자리를 차지하므로 동사가 바로 뒤에 와요.' }
  ],
  redemittel: [
    { g: '도입', items: [['Vielen Dank für deine Einladung!', '초대해 줘서 고마워!'], ['Ich habe mich sehr über deine Nachricht gefreut.', '네 메시지 받고 정말 기뻤어.'], ['Herzlichen Glückwunsch zur neuen Wohnung!', '새집 축하해!']] },
    { g: '가겠다고 말하기', items: [['Natürlich komme ich gern.', '당연히 기꺼이 갈게.'], ['Ich komme auf jeden Fall.', '꼭 갈게.'], ['Leider kann ich nicht kommen, weil …', '아쉽지만 … 때문에 못 가.']] },
    { g: '묻기', items: [['Soll ich etwas mitbringen?', '뭐 좀 가져갈까?'], ['Ich kann zum Beispiel einen Salat machen.', '예를 들면 샐러드를 만들 수 있어.'], ['Brauchst du noch etwas für die Wohnung?', '집에 필요한 거 더 있어?']] },
    { g: '늦는 이유 말하기', items: [['Leider kann ich erst gegen 21 Uhr kommen.', '아쉽지만 9시쯤에야 갈 수 있어.'], ['…, weil ich bis 20 Uhr arbeiten muss.', '8시까지 일해야 해서 …'], ['Ich habe vorher noch einen Termin, deshalb komme ich später.', '그 전에 약속이 있어서 늦게 가.']] },
    { g: '부탁하기', items: [['Kannst du mir bitte erklären, wie ich zu dir komme?', '너희 집에 어떻게 가는지 설명해 줄래?'], ['Könntest du mir den Weg beschreiben?', '가는 길을 알려 줄 수 있어?'], ['Welche Straßenbahn muss ich nehmen?', '어떤 트램을 타야 해?']] },
    { g: '마무리', items: [['Ich freue mich schon auf die Party!', '파티가 벌써 기대돼!'], ['Bis Samstag!', '토요일에 봐!'], ['Liebe Grüße', '안녕']] }
  ],
  uebung: [
    { t: 'fill', q: 'Ich komme etwas später, weil ich bis 20 Uhr arbeiten ___.', a: ['muss'], e: 'weil 문장에서는 변화한 동사가 맨 끝에 와요.' },
    { t: 'mc', q: 'Herzlichen Glückwunsch ___ neuen Wohnung!', o: ['für die', 'zur', 'an die'], a: 1, e: 'Glückwunsch zu + 3격. zu der neuen Wohnung → zur neuen Wohnung.' },
    { t: 'mc', q: '이미 받은 초대에 고맙다고 할 때 알맞은 것은?', o: ['Ich freue mich auf deine Einladung.', 'Ich habe mich über deine Einladung gefreut.', 'Ich freue mich an deiner Einladung.'], a: 1, e: '이미 일어난 일이 기쁠 때는 sich freuen über예요.' },
    { t: 'fix', q: 'Deshalb ich komme erst um 21 Uhr.', a: ['Deshalb komme ich erst um 21 Uhr.'], e: 'deshalb 뒤에는 동사가 바로 와요.' },
    { t: 'fill', q: 'Kannst du mir erklären, ___ ich zu dir komme?', a: ['wie'], e: '간접의문문이에요. 의문사 wie로 시작하고 동사 komme는 맨 끝이에요.' },
    { t: 'mc', q: '요구 사항 「길 안내를 부탁하세요」에 맞는 문장은?', o: ['Wie geht es dir in der neuen Wohnung?', 'Kannst du mir bitte den Weg vom Bahnhof zu dir beschreiben?', 'Ich weiß, wo du wohnst.'], a: 1, e: '첫 문장은 안부, 셋째 문장은 길을 안다는 말이라 부탁이 아니에요.' }
  ],
  aufgabe: {
    lead: 'Ihr Freund Max hat Ihnen geschrieben:',
    brief: 'Hallo!\nEndlich habe ich eine eigene Wohnung gefunden – mitten in der Stadt! Am Samstag, den 22. November, feiere ich eine Einweihungsparty. Kommst du? Ich würde mich riesig freuen!\nMax',
    punkte: ['Gratulieren Sie und sagen Sie, ob Sie kommen.', 'Fragen Sie, was Sie mitbringen können.', 'Sie kommen später: Erklären Sie, warum.', 'Bitten Sie Max um eine Wegbeschreibung.'],
    close: 'Antworten Sie Max. Schreiben Sie etwa 80–110 Wörter. Schreiben Sie etwas zu allen vier Punkten. Denken Sie an Anrede, Einleitung, Schluss und Gruß.',
    ko: {
      lead: '친구 막스가 이메일을 보냈어요.',
      brief: '안녕!\n드디어 내 집을 구했어. 시내 한가운데야! 11월 22일 토요일에 집들이를 해. 올 거지? 와 주면 정말 기쁠 거야!\n막스',
      punkte: ['축하하고, 갈 수 있는지 말하세요.', '무엇을 가져가면 좋을지 물어보세요.', '늦게 가요. 이유를 설명하세요.', '막스에게 길 안내를 부탁하세요.'],
      close: '막스에게 답장하세요. 80–110단어 정도로 쓰세요. 네 가지 내용을 모두 쓰세요. 부르는 말, 도입, 마무리, 끝인사를 잊지 마세요.'
    }
  },
  check: ['도입 문장(초대에 대한 감사나 반응)을 썼어요.', '축하하고 갈 수 있다고 말했어요.', '무엇을 가져갈지 물었어요.', '늦는 이유를 weil이나 deshalb로 설명했어요.', '길 안내를 부탁했어요.', '마무리 문장과 끝인사를 썼어요.', '80단어 이상 썼어요.'],
  muster: {
    de: [
      'Lieber Max,',
      'vielen Dank für deine Einladung! Herzlichen Glückwunsch zur neuen Wohnung – mitten in der Stadt, das ist ja toll! Natürlich komme ich gern zu deiner Party.',
      'Soll ich etwas mitbringen? Ich kann zum Beispiel einen Kartoffelsalat machen oder Getränke kaufen.',
      'Leider kann ich erst gegen 21 Uhr kommen, weil ich am Samstag bis 20 Uhr im Café arbeiten muss. Ich hoffe, das ist kein Problem.',
      'Kannst du mir noch erklären, wie ich zu dir komme? Ich kenne die Gegend nicht so gut. Welche Straßenbahn muss ich nehmen?',
      'Ich freue mich schon sehr auf Samstag!',
      'Liebe Grüße\nSora'
    ],
    ko: [
      '막스에게,',
      '초대해 줘서 고마워! 새집 축하해. 시내 한가운데라니 정말 좋다! 당연히 파티에 기꺼이 갈게.',
      '뭐 좀 가져갈까? 예를 들면 감자샐러드를 만들거나 음료를 사 갈 수 있어.',
      '아쉽지만 9시쯤에야 갈 수 있어. 토요일에 카페에서 8시까지 일해야 하거든. 괜찮으면 좋겠어.',
      '너희 집에 어떻게 가는지 알려 줄래? 그 동네를 잘 몰라서. 어떤 트램을 타야 해?',
      '토요일이 벌써 정말 기대돼!',
      '안녕,\n소라가'
    ],
    notes: [
      { de: 'vielen Dank für deine Einladung!', ko: '받은 편지에 반응하는 도입 문장이에요.' },
      { de: 'das ist ja toll!', ko: 'ja는 놀라움이나 감탄을 더하는 화법 불변화사예요.' },
      { de: '…, weil ich … arbeiten muss.', ko: '늦는 이유를 weil로 이었어요. 변화한 동사 muss가 맨 끝이에요.' },
      { de: 'Kannst du mir noch erklären, wie ich zu dir komme?', ko: '간접의문문으로 부탁해서 자연스러워요.' },
      { de: 'Ich freue mich schon sehr auf Samstag!', ko: '앞으로 올 일이라 auf를 썼어요. 마무리 문장 역할을 해요.' }
    ]
  }
},
{
  id: 'b1-02', level: 'B1', no: 2,
  title: 'Eine E-Mail an die Nachbarin', titleKo: '이웃에게 파티 알리고 부탁하기',
  type: 'Halbformelle E-Mail', typeKo: '반격식 이메일',
  exam: 'telc Deutsch B1 반격식 편지 유형',
  time: 25, words: [80, 110],
  intro: '이웃에게 파티를 알리고, 미리 사과하고, 초대하고, 부탁까지 하는 반격식 이메일을 써요. Sie로 정중하게 쓰면서도 딱딱하지 않게 쓰는 표현을 익혀요.',
  goals: ['Sie, Ihnen, Ihr를 대문자로 바르게 써요', 'sich entschuldigen, Könnten Sie …?로 정중하게 사과하고 부탁해요', 'wenn 문장으로 조건과 바람을 말해요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Liebe Frau Schulz,' },
    { de: 'Information', ko: '파티 알림', ex: 'am Samstag feiere ich meinen 30. Geburtstag.' },
    { de: 'Entschuldigung', ko: '미리 사과', ex: 'Dafür möchte ich mich schon jetzt entschuldigen.' },
    { de: 'Einladung', ko: '초대', ex: 'Ich würde mich freuen, wenn Sie auch vorbeikommen.' },
    { de: 'Bitte', ko: '부탁', ex: 'Könnten Sie vielleicht ein Paket für mich annehmen?' },
    { de: 'Gruß', ko: '끝인사', ex: 'Herzliche Grüße / Ihre Mina Choi' }
  ],
  tipps: [
    '존칭 Sie와 Ihnen, Ihr, Ihre는 문장 가운데서도 대문자로 써요. 소문자로 쓰면 「그들」이라는 뜻이 돼요.',
    'Könnten Sie …?, Ich hätte eine Bitte, Das wäre sehr nett는 반격식 편지에서 그대로 쓰는 정중한 표현이에요.',
    '사과에는 해결책을 함께 쓰면 좋아요. Ab 22 Uhr machen wir die Musik leiser.',
    '끝에 Ihre(여자) 또는 Ihr(남자)를 이름 앞에 붙이면 반격식다운 마무리가 돼요.'
  ],
  fehler: [
    { f: 'Ich entschuldige für den Lärm.', r: 'Ich entschuldige mich für den Lärm.', e: 'sich entschuldigen은 재귀동사라 mich가 꼭 필요해요.' },
    { f: 'Ich danke ihnen sehr.', r: 'Ich danke Ihnen sehr.', e: '존칭 Ihnen은 대문자예요. ihnen은 「그들에게」예요.' },
    { f: 'Könnten Sie für mich ein Paket nehmen?', r: 'Könnten Sie ein Paket für mich annehmen?', e: '택배를 대신 받아 주는 것은 annehmen이에요.' },
    { f: 'Vielen Dank in Voraus!', r: 'Vielen Dank im Voraus!', e: '「미리 감사합니다」는 im Voraus예요.' }
  ],
  redemittel: [
    { g: '알리기', items: [['ich möchte Ihnen kurz Bescheid sagen: …', '짧게 알려 드리고 싶어요.'], ['Am Samstag feiere ich meinen Geburtstag.', '토요일에 생일 파티를 해요.'], ['Die Feier beginnt um 19 Uhr.', '파티는 7시에 시작해요.']] },
    { g: '사과하기', items: [['Es kann leider etwas lauter werden.', '아쉽지만 조금 시끄러울 수 있어요.'], ['Dafür möchte ich mich schon jetzt entschuldigen.', '미리 사과드리고 싶어요.'], ['Wenn es Sie stört, klingeln Sie bitte einfach bei mir.', '방해가 되면 그냥 벨을 눌러 주세요.']] },
    { g: '초대하기', items: [['Ich würde mich freuen, wenn Sie auch vorbeikommen.', '들러 주시면 기쁘겠어요.'], ['Sie sind herzlich eingeladen!', '진심으로 초대할게요!']] },
    { g: '부탁하기', items: [['Außerdem hätte ich noch eine Bitte: …', '그리고 부탁이 하나 있어요.'], ['Könnten Sie vielleicht ein Paket für mich annehmen?', '혹시 택배를 대신 받아 주실 수 있을까요?'], ['Das wäre sehr nett von Ihnen.', '그래 주시면 정말 고맙겠어요.'], ['Vielen Dank im Voraus!', '미리 감사드려요!']] },
    { g: '끝인사', items: [['Herzliche Grüße', '따뜻한 안부를 전해요'], ['Ihre Mina Choi', '최미나 드림 (여자)'], ['Ihr Daniel Han', '한다니엘 드림 (남자)']] }
  ],
  uebung: [
    { t: 'fill', q: 'Ich möchte ___ schon jetzt für den Lärm entschuldigen.', a: ['mich'], e: 'sich entschuldigen은 재귀동사예요. ich와 함께 쓰면 mich예요.' },
    { t: 'mc', q: 'Frau Schulz에게 쓴 문장에서 바른 것은?', o: ['Ich danke ihnen sehr.', 'Ich danke Ihnen sehr.', 'Ich danke dir sehr.'], a: 1, e: '존칭은 대문자 Ihnen이에요.' },
    { t: 'fill', q: 'Könnten Sie vielleicht ein Paket für mich ___?', a: ['annehmen'], e: '택배를 대신 받다 = ein Paket annehmen. 원형이라 맨 끝에 붙여 써요.' },
    { t: 'mc', q: '정중한 부탁 뒤에 붙이기 좋은 문장은?', o: ['Das wäre sehr nett von Ihnen.', 'Das ist Ihre Aufgabe.', 'Machen Sie das!'], a: 0, e: '접속법 II wäre로 부드럽게 고마움을 미리 전해요.' },
    { t: 'fix', q: 'Vielen Dank in Voraus!', a: ['Vielen Dank im Voraus!'], e: 'in + dem → im. im Voraus는 굳은 표현이에요.' },
    { t: 'fill', q: 'Ich würde mich freuen, ___ Sie auch kommen.', a: ['wenn'], e: '「…하면 기쁘겠다」는 wenn 문장으로 이어요. 동사 kommen은 맨 끝이에요.' }
  ],
  aufgabe: {
    lead: 'Sie feiern am Samstag Ihren Geburtstag in Ihrer Wohnung. Schreiben Sie Ihrer Nachbarin Frau Schulz eine E-Mail.',
    punkte: ['Informieren Sie Frau Schulz über die Feier.', 'Entschuldigen Sie sich schon jetzt für den Lärm.', 'Laden Sie Frau Schulz ein.', 'Sie sind am Samstagvormittag nicht zu Hause: Bitten Sie Frau Schulz, ein Paket für Sie anzunehmen.'],
    close: 'Schreiben Sie etwa 80–110 Wörter. Denken Sie an Anrede, Einleitung, Schluss und Gruß.',
    ko: {
      lead: '토요일에 집에서 생일 파티를 해요. 이웃 슐츠 씨에게 이메일을 쓰세요.',
      punkte: ['슐츠 씨에게 파티를 알리세요.', '시끄러울 수 있다고 미리 사과하세요.', '슐츠 씨를 초대하세요.', '토요일 오전에 집에 없어요. 택배를 대신 받아 달라고 부탁하세요.'],
      close: '80–110단어 정도로 쓰세요. 부르는 말, 도입, 마무리, 끝인사를 잊지 마세요.'
    }
  },
  check: ['Liebe Frau Schulz,로 시작했어요.', '파티 날짜와 시간을 알렸어요.', 'sich entschuldigen으로 미리 사과했어요.', '슐츠 씨를 초대했어요.', '택배를 받아 달라고 정중하게 부탁했어요.', 'Sie, Ihnen, Ihr를 모두 대문자로 썼어요.', '80단어 이상 썼어요.'],
  muster: {
    de: [
      'Liebe Frau Schulz,',
      'ich möchte Ihnen kurz Bescheid sagen: Am Samstag feiere ich meinen 30. Geburtstag in meiner Wohnung. Die Feier beginnt um 19 Uhr, und ich erwarte etwa fünfzehn Gäste.',
      'Es kann leider etwas lauter werden. Dafür möchte ich mich schon jetzt entschuldigen. Ab 22 Uhr machen wir die Musik leiser.',
      'Ich würde mich sehr freuen, wenn Sie auch vorbeikommen. Es gibt Kuchen und koreanisches Essen!',
      'Außerdem hätte ich noch eine Bitte: Am Samstagvormittag bin ich nicht zu Hause, aber ich erwarte ein Paket. Könnten Sie es vielleicht für mich annehmen? Das wäre sehr nett.',
      'Herzliche Grüße\nIhre Mina Choi'
    ],
    ko: [
      '슐츠 씨께,',
      '짧게 알려 드리고 싶은 것이 있어요. 토요일에 저희 집에서 서른 번째 생일 파티를 해요. 파티는 7시에 시작하고, 손님은 열다섯 명쯤 올 거예요.',
      '아쉽지만 조금 시끄러울 수 있어요. 미리 사과드려요. 10시부터는 음악 소리를 줄일게요.',
      '슐츠 씨도 들러 주시면 정말 기쁘겠어요. 케이크와 한국 음식이 있어요!',
      '그리고 부탁이 하나 있어요. 토요일 오전에 제가 집에 없는데 택배가 올 예정이에요. 혹시 대신 받아 주실 수 있을까요? 그래 주시면 정말 고맙겠어요.',
      '따뜻한 안부를 전하며,\n최미나 드림'
    ],
    notes: [
      { de: 'ich möchte Ihnen kurz Bescheid sagen:', ko: 'Bescheid sagen = 알려 주다. 반격식 편지의 무난한 도입이에요.' },
      { de: 'Dafür möchte ich mich … entschuldigen.', ko: 'dafür가 앞 문장의 「시끄러운 것」을 가리켜요. 재귀대명사 mich를 빠뜨리지 않았어요.' },
      { de: 'Ab 22 Uhr machen wir die Musik leiser.', ko: '사과 뒤에 해결책을 붙여 상대를 배려했어요.' },
      { de: 'Außerdem hätte ich noch eine Bitte:', ko: '접속법 II hätte로 부탁을 부드럽게 꺼냈어요.' },
      { de: 'Ihre Mina Choi', ko: '여자가 쓴 편지라 Ihre예요. 남자라면 Ihr예요.' }
    ]
  }
},

/* ═══════════════════════ B2 ═══════════════════════ */
{
  id: 'b2-01', level: 'B2', no: 1,
  title: 'Beschwerde an einen Online-Shop', titleKo: '온라인 쇼핑몰에 항의 편지 쓰기',
  type: 'Formelle Beschwerde', typeKo: '격식 항의 편지',
  exam: 'telc Deutsch B2 쓰기(Schriftlicher Ausdruck) 항의 편지 유형',
  time: 30, words: [140, 180],
  intro: '배송 지연과 고장 난 제품에 대해 고객센터에 항의하는 격식 편지를 써요. 감정이 아니라 사실과 요구를 분명하게 쓰는 것이 핵심이에요.',
  goals: ['날짜, 주문 번호 같은 사실로 문제를 설명해요', 'trotz, laut, jedoch처럼 B2다운 연결어를 써요', '요구 사항과 기한을 정중하지만 분명하게 써요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Sehr geehrte Damen und Herren,' },
    { de: 'Anlass', ko: '편지를 쓰는 이유', ex: 'am 3. November habe ich bei Ihnen … bestellt.' },
    { de: 'Problem 1–3', ko: '문제를 차례대로', ex: 'Laut Ihrer Website sollte die Lieferung …' },
    { de: 'Forderung', ko: '요구', ex: 'Ich erwarte daher, dass Sie mir umgehend …' },
    { de: 'Schluss', ko: '마무리와 기한', ex: 'Ich erwarte Ihre Antwort bis zum 25. November.' },
    { de: 'Gruß', ko: '끝인사와 이름', ex: 'Mit freundlichen Grüßen / Daniel Han' }
  ],
  tipps: [
    '첫 단락에 언제, 무엇을, 어디서 샀는지 사실만 써요. 주문 번호를 넣으면 신뢰도가 높아져요.',
    '문제는 시간 순서대로 하나씩 써요. Zunächst, Außerdem, Noch ärgerlicher ist …',
    'Frechheit, unmöglich 같은 감정적인 말 대신 enttäuscht, nicht zufrieden을 써요.',
    '요구는 하나로 끝내지 말고 대안까지 써요. Sollte das nicht möglich sein, bitte ich Sie …'
  ],
  fehler: [
    { f: 'Ich beschwere über die Lieferung.', r: 'Ich beschwere mich über die Lieferung.', e: 'sich beschweren은 재귀동사예요.' },
    { f: 'Trotz mehreren Anrufen habe ich niemanden erreicht.', r: 'Trotz mehrerer Anrufe habe ich niemanden erreicht.', e: '격식 있는 글에서 trotz는 2격과 함께 써요.' },
    { f: 'Ich erwarte, dass Sie schicken mir ein neues Gerät.', r: 'Ich erwarte, dass Sie mir ein neues Gerät schicken.', e: 'dass 문장에서는 변화한 동사가 맨 끝이에요.' },
    { f: 'Das ist eine Frechheit! Ich will sofort mein Geld!', r: 'Ich bin von Ihrem Service sehr enttäuscht und bitte Sie, mir den Kaufpreis zu erstatten.', e: '격식 편지에서는 감정을 드러내기보다 실망과 요구를 차분하게 써요.' }
  ],
  redemittel: [
    { g: '편지를 쓰는 이유', items: [['ich wende mich an Sie, weil …', '… 때문에 연락드립니다.'], ['Am 3. November habe ich bei Ihnen … bestellt (Bestellnummer …).', '11월 3일에 귀사에서 …을 주문했습니다(주문 번호 …).'], ['Leider bin ich mit Ihrem Service überhaupt nicht zufrieden.', '유감스럽게도 귀사의 서비스에 전혀 만족하지 못합니다.']] },
    { g: '문제 설명', items: [['Laut Ihrer Website sollte die Lieferung innerhalb von drei Tagen erfolgen.', '웹사이트에 따르면 3일 안에 배송되어야 했습니다.'], ['Das Paket ist jedoch erst nach einer Woche angekommen.', '그러나 소포는 일주일이 지나서야 도착했습니다.'], ['Schon beim ersten Gebrauch hat sich herausgestellt, dass …', '처음 사용할 때부터 …라는 것이 드러났습니다.'], ['Das Gerät lässt sich nicht einschalten.', '기기가 켜지지 않습니다.'], ['Trotz mehrerer Anrufe habe ich niemanden erreicht.', '여러 번 전화했지만 아무와도 연결되지 않았습니다.']] },
    { g: '감정 표현 (차분하게)', items: [['Das ist für mich besonders ärgerlich, da …', '… 때문에 특히 불쾌합니다.'], ['Ich bin von Ihrem Unternehmen sehr enttäuscht.', '귀사에 매우 실망했습니다.']] },
    { g: '요구하기', items: [['Ich erwarte daher, dass Sie mir umgehend ein neues Gerät schicken.', '따라서 즉시 새 기기를 보내 주시기를 요구합니다.'], ['Sollte das nicht möglich sein, bitte ich Sie, mir den Kaufpreis zu erstatten.', '그것이 불가능하다면 구매 대금을 환불해 주시기 바랍니다.'], ['Bitte teilen Sie mir bis zum 25. November mit, wie Sie das Problem lösen wollen.', '11월 25일까지 문제를 어떻게 해결할지 알려 주십시오.']] },
    { g: '마무리', items: [['Ich hoffe auf eine schnelle Lösung.', '빠른 해결을 바랍니다.'], ['Mit freundlichen Grüßen', '안녕히 계십시오']] }
  ],
  uebung: [
    { t: 'fill', q: '___ mehrerer Anrufe habe ich niemanden erreicht.', a: ['Trotz'], e: 'trotz + 2격: 「…에도 불구하고」.' },
    { t: 'fill', q: 'Ich ___ mich an Sie, weil ich ein Problem mit meiner Bestellung habe.', a: ['wende'], e: 'sich an jemanden wenden = 누구에게 연락하다, 문의하다.' },
    { t: 'mc', q: '요구를 정중하면서도 분명하게 쓴 문장은?', o: ['Schicken Sie sofort eine neue Maschine!', 'Ich erwarte, dass Sie mir umgehend ein neues Gerät schicken.', 'Vielleicht könnten Sie eventuell etwas machen.'], a: 1, e: '첫째는 명령이라 무례하고, 셋째는 무엇을 원하는지 알 수 없어요.' },
    { t: 'fix', q: 'Ich bitte Sie, dass Sie den Kaufpreis erstatten mir.', a: ['Ich bitte Sie, mir den Kaufpreis zu erstatten.', 'Ich bitte Sie, dass Sie mir den Kaufpreis erstatten.'], e: 'bitten 뒤에는 zu 부정형이 자연스러워요. dass 문장으로 쓰면 동사 erstatten이 맨 끝에 와요.' },
    { t: 'mc', q: 'Das Gerät ___ sich nicht einschalten.', o: ['kann', 'lässt', 'wird'], a: 1, e: 'sich lassen + 원형 = 「…될 수 있다」. 수동을 대신하는 표현이에요.' },
    { t: 'fill', q: 'Die Lieferung sollte innerhalb ___ drei Tagen erfolgen.', a: ['von'], e: '관사 없는 수와 함께 쓰면 innerhalb von + 3격이에요.' }
  ],
  aufgabe: {
    lead: 'Sie haben bei dem Online-Shop „Haushaltsprofi“ eine Kaffeemaschine bestellt. Leider gab es Probleme. Schreiben Sie eine Beschwerde an den Kundenservice.',
    punkte: ['Die Lieferung kam eine Woche zu spät.', 'Die Maschine funktioniert nicht richtig.', 'Ihre Anrufe beim Kundenservice blieben ohne Erfolg.', 'Was erwarten Sie jetzt?'],
    close: 'Schreiben Sie etwa 150 Wörter. Achten Sie auf einen passenden Einstieg, eine sinnvolle Reihenfolge der Punkte und einen passenden Schluss.',
    ko: {
      lead: '온라인 쇼핑몰 „Haushaltsprofi“에서 커피 머신을 주문했어요. 그런데 문제가 생겼어요. 고객센터에 항의 편지를 쓰세요.',
      punkte: ['배송이 일주일 늦었어요.', '머신이 제대로 작동하지 않아요.', '고객센터에 전화했지만 소용없었어요.', '이제 무엇을 요구하나요?'],
      close: '150단어 정도로 쓰세요. 알맞은 도입, 논리적인 순서, 알맞은 마무리에 신경 쓰세요.'
    }
  },
  check: ['Sehr geehrte Damen und Herren,으로 시작했어요.', '주문 날짜와 상품(주문 번호)을 밝혔어요.', '배송 지연을 설명했어요.', '고장 내용을 구체적으로 썼어요.', '연락이 닿지 않은 일을 썼어요.', '요구와 그 대안을 썼어요.', '감정적인 표현 없이 차분하게 썼어요.', '140단어 이상 썼어요.'],
  muster: {
    de: [
      'Sehr geehrte Damen und Herren,',
      'am 3. November habe ich in Ihrem Online-Shop eine Kaffeemaschine des Modells „Crema 300“ bestellt (Bestellnummer 48213). Leider bin ich mit Ihrem Service überhaupt nicht zufrieden.',
      'Laut Ihrer Website sollte die Lieferung innerhalb von drei Tagen erfolgen. Das Paket ist jedoch erst nach einer Woche angekommen. Noch ärgerlicher ist, dass die Maschine nicht richtig funktioniert. Das Gerät lässt sich zwar einschalten, aber das Wasser wird nicht heiß.',
      'Trotz mehrerer Anrufe bei Ihrem Kundenservice habe ich niemanden erreicht. Auch auf meine E-Mail vom 12. November habe ich bis heute keine Antwort bekommen.',
      'Ich erwarte daher, dass Sie mir umgehend ein neues, einwandfreies Gerät schicken und die Kosten für die Rücksendung übernehmen. Sollte das nicht möglich sein, bitte ich Sie, mir den vollen Kaufpreis zu erstatten.',
      'Ich hoffe auf eine schnelle Lösung und erwarte Ihre Antwort bis zum 25. November.',
      'Mit freundlichen Grüßen\nDaniel Han'
    ],
    ko: [
      '담당자님께,',
      '11월 3일 귀사의 온라인 쇼핑몰에서 „Crema 300“ 모델 커피 머신을 주문했습니다(주문 번호 48213). 유감스럽게도 귀사의 서비스에 전혀 만족하지 못합니다.',
      '웹사이트에 따르면 3일 안에 배송되어야 했습니다. 그러나 소포는 일주일이 지나서야 도착했습니다. 더 불쾌한 것은 머신이 제대로 작동하지 않는다는 점입니다. 전원은 켜지지만 물이 뜨거워지지 않습니다.',
      '고객센터에 여러 번 전화했지만 아무와도 연결되지 않았습니다. 11월 12일에 보낸 이메일에도 오늘까지 답장을 받지 못했습니다.',
      '따라서 즉시 결함 없는 새 기기를 보내 주시고 반송 비용을 부담해 주시기를 요구합니다. 그것이 불가능하다면 구매 대금 전액을 환불해 주시기 바랍니다.',
      '빠른 해결을 바라며 11월 25일까지 답변을 기다리겠습니다.',
      '안녕히 계십시오.\n한다니엘 드림'
    ],
    notes: [
      { de: '(Bestellnummer 48213)', ko: '주문 번호 같은 사실을 넣으면 글이 구체적이고 믿음직해져요.' },
      { de: 'Laut Ihrer Website …', ko: 'laut + 3격(또는 2격) = 「…에 따르면」. 약속과 실제를 대비하는 출발점이에요.' },
      { de: 'Noch ärgerlicher ist, dass …', ko: '문제를 하나 더 꺼낼 때 쓰는 연결 표현이에요. 강도가 올라가는 느낌을 줘요.' },
      { de: 'lässt sich zwar einschalten, aber …', ko: 'zwar … aber로 「…하긴 하지만」을 표현했어요.' },
      { de: 'Sollte das nicht möglich sein, …', ko: 'wenn 없이 동사 sollte를 맨 앞에 둔 조건문이에요. 격식 편지에서 자주 써요.' }
    ]
  }
},
{
  id: 'b2-02', level: 'B2', no: 2,
  title: 'Forumsbeitrag: Soziale Medien erst ab 14?', titleKo: '포럼에 의견 글 쓰기',
  type: 'Forumsbeitrag', typeKo: '의견 글',
  exam: 'Goethe-Zertifikat B2 쓰기 Teil 1(포럼 글) 유형',
  time: 30, words: [140, 180],
  intro: '찬반이 갈리는 주제에 내 의견을 밝히고, 근거를 대고, 반대 의견에 답하고, 제안까지 하는 의견 글을 써요. 문단 사이의 연결어가 점수를 크게 좌우해요.',
  goals: ['의견을 첫 문단에서 분명하게 밝혀요', 'zwar … aber, Natürlich kann man einwenden으로 반대 의견을 다뤄요', 'Sinnvoller wäre es, …처럼 접속법 II로 제안해요'],
  aufbau: [
    { de: 'Einleitung', ko: '주제 소개와 내 입장', ex: 'Ob … , wird zurzeit viel diskutiert. Ich halte … nicht für …' },
    { de: 'Argumente', ko: '근거', ex: 'In der Praxis ließe es sich kaum kontrollieren.' },
    { de: 'Gegenargument', ko: '반대 의견과 반박', ex: 'Zwar würde ein Verbot …, aber …' },
    { de: 'Vorschlag', ko: '제안', ex: 'Sinnvoller wäre es deshalb, …' },
    { de: 'Schluss', ko: '마무리', ex: 'Zusammenfassend lässt sich sagen: …' }
  ],
  tipps: [
    '포럼 글에는 Sehr geehrte …나 Mit freundlichen Grüßen을 쓰지 않아요. 바로 주제로 들어가요.',
    '첫 문단에서 찬성인지 반대인지 분명히 밝혀요. 끝까지 같은 입장을 지켜요.',
    '확인할 수 없는 통계나 수치는 만들어 쓰지 않아요. 일상의 예로 근거를 대요.',
    '단락마다 연결어로 시작하면 글의 흐름이 보여요. Außerdem / Natürlich … / Sinnvoller wäre es …'
  ],
  fehler: [
    { f: 'Meiner Meinung nach ein Verbot ist sinnvoll.', r: 'Meiner Meinung nach ist ein Verbot sinnvoll.', e: 'Meiner Meinung nach가 첫 자리를 차지하므로 동사 ist가 바로 뒤에 와요.' },
    { f: 'Ich bin der Meinung, dass ein Verbot ist sinnvoll.', r: 'Ich bin der Meinung, dass ein Verbot sinnvoll ist.', e: 'dass 문장에서는 동사가 맨 끝이에요.' },
    { f: 'Zwar ein Verbot schützt Kinder, aber …', r: 'Zwar schützt ein Verbot Kinder, aber …', e: 'zwar가 첫 자리에 오면 동사가 바로 뒤에 와요.' },
    { f: 'Ich bin dagegen, weil es ist schlecht.', r: 'Ich bin dagegen, weil ein Verbot das eigentliche Problem nicht löst.', e: 'weil 문장은 동사가 맨 끝이에요. 그리고 「나쁘다」 대신 구체적인 이유를 써요.' }
  ],
  redemittel: [
    { g: '주제 소개와 입장', items: [['Ob …, wird zurzeit viel diskutiert.', '…인지 아닌지가 요즘 많이 논의되고 있다.'], ['Ich halte … (nicht) für sinnvoll.', '나는 …이 의미 있다고(없다고) 본다.'], ['Meiner Ansicht nach …', '내 생각에는 …'], ['Ich bin der Meinung, dass …', '나는 …라고 생각한다.']] },
    { g: '근거 대기', items: [['Dafür spricht vor allem, dass …', '이를 뒷받침하는 것은 무엇보다 …라는 점이다.'], ['Ein wichtiger Grund ist …', '중요한 이유는 …이다.'], ['Hinzu kommt, dass …', '게다가 …'], ['Das zeigt sich zum Beispiel daran, dass …', '이는 예를 들어 …라는 데서 드러난다.']] },
    { g: '반대 의견 다루기', items: [['Natürlich kann man einwenden, dass …', '물론 …라고 반박할 수 있다.'], ['Zwar …, aber …', '…하기는 하지만 …'], ['Kritiker sagen, … Allerdings …', '비판하는 사람들은 …라고 말한다. 하지만 …']] },
    { g: '제안하기', items: [['Sinnvoller wäre es, … zu …', '…하는 편이 더 의미 있을 것이다.'], ['Ich schlage vor, dass …', '나는 …를 제안한다.'], ['Eltern sollten …', '부모는 …해야 할 것이다.']] },
    { g: '마무리', items: [['Zusammenfassend lässt sich sagen, dass …', '정리하면 …라고 할 수 있다.'], ['Aus diesen Gründen bin ich gegen …', '이런 이유로 나는 …에 반대한다.']] }
  ],
  uebung: [
    { t: 'fix', q: 'Meiner Meinung nach ein Verbot ist sinnvoll.', a: ['Meiner Meinung nach ist ein Verbot sinnvoll.'], e: 'Meiner Meinung nach 뒤에는 동사가 바로 와요.' },
    { t: 'fill', q: 'Zwar ___ ein Verbot die Kinder, aber es löst das Problem nicht. (schützen)', a: ['schützt'], e: 'zwar가 첫 자리라 동사 schützt가 바로 뒤에 와요.' },
    { t: 'mc', q: '반대 의견을 인정하면서 꺼낼 때 알맞은 것은?', o: ['Natürlich kann man einwenden, dass …', 'Es ist klar, dass alle anderen falsch liegen.', 'Also deshalb trotzdem …'], a: 0, e: '상대 의견을 존중하며 꺼내야 반박이 설득력을 얻어요.' },
    { t: 'fill', q: '___ kommt, dass viele Kinder abends zu lange am Handy sind.', a: ['Hinzu'], e: 'Hinzu kommt, dass … = 「게다가 …」. 근거를 하나 더할 때 써요.' },
    { t: 'mc', q: '글을 마무리하는 문장으로 알맞은 것은?', o: ['Zusammenfassend lässt sich sagen, dass …', 'Erstens …', 'Im Gegenteil …'], a: 0, e: 'Erstens는 첫 근거를, Im Gegenteil은 반대 내용을 시작할 때 써요.' },
    { t: 'fill', q: 'Sinnvoller ___ es, Medienkompetenz in der Schule zu unterrichten.', a: ['wäre'], e: '접속법 II wäre로 「…하는 편이 낫겠다」라고 부드럽게 제안해요.' }
  ],
  aufgabe: {
    lead: 'Im Online-Forum einer Zeitung wird diskutiert: „Sollten soziale Medien für Kinder unter 14 Jahren verboten werden?“ Schreiben Sie einen Beitrag.',
    punkte: ['Äußern Sie Ihre Meinung zu einem Verbot.', 'Nennen Sie Gründe für Ihre Meinung.', 'Nennen Sie ein mögliches Gegenargument und reagieren Sie darauf.', 'Machen Sie einen Vorschlag, wie Kinder sicher mit sozialen Medien umgehen können.'],
    close: 'Schreiben Sie etwa 150 Wörter.',
    ko: {
      lead: '한 신문의 온라인 포럼에서 「14세 미만 어린이의 소셜 미디어 사용을 금지해야 할까?」를 두고 토론하고 있어요. 의견 글을 쓰세요.',
      punkte: ['금지에 대한 내 의견을 밝히세요.', '그렇게 생각하는 이유를 쓰세요.', '반대 의견을 하나 들고 그것에 답하세요.', '어린이가 소셜 미디어를 안전하게 쓰는 방법을 제안하세요.'],
      close: '150단어 정도로 쓰세요.'
    }
  },
  check: ['첫 문단에서 내 입장을 분명히 밝혔어요.', '근거를 두 가지 이상 썼어요.', '반대 의견을 들고 반박했어요.', '구체적인 제안을 했어요.', '마무리 문장으로 끝냈어요.', '단락마다 연결어를 썼어요.', '140단어 이상 썼어요.'],
  muster: {
    de: [
      'Ob soziale Medien für Kinder unter 14 Jahren verboten werden sollten, wird zurzeit viel diskutiert. Ich halte ein generelles Verbot nicht für die beste Lösung.',
      'Natürlich verstehe ich die Sorgen vieler Eltern. Kinder sehen im Netz oft Inhalte, die nicht für sie gedacht sind, und verbringen viel zu viel Zeit am Handy. Zwar würde ein Verbot sie davor schützen, aber in der Praxis ließe es sich kaum kontrollieren. Viele Kinder würden einfach ein falsches Alter angeben.',
      'Außerdem gehören soziale Medien heute zum Alltag. Auch Klassenchats und Schulprojekte laufen oft darüber, sodass Kinder ohne Zugang schnell ausgeschlossen wären. Wer erst mit 14 anfängt, hat vorher nie gelernt, kritisch damit umzugehen.',
      'Sinnvoller wäre es deshalb, Medienkompetenz schon in der Grundschule zu unterrichten. Eltern sollten gemeinsam mit ihren Kindern klare Regeln festlegen, zum Beispiel feste Handyzeiten und kinderfreundliche Einstellungen.',
      'Zusammenfassend lässt sich sagen: Kinder brauchen kein Verbot, sondern Begleitung.'
    ],
    ko: [
      '14세 미만 어린이의 소셜 미디어 사용을 금지해야 하는지가 요즘 많이 논의되고 있다. 나는 전면 금지가 가장 좋은 해결책이라고 보지 않는다.',
      '물론 많은 부모의 걱정은 이해한다. 아이들은 인터넷에서 자기에게 맞지 않는 내용을 자주 보고, 휴대폰 앞에서 너무 많은 시간을 보낸다. 금지하면 아이들을 이런 것에서 지킬 수는 있겠지만 실제로는 거의 단속할 수 없을 것이다. 많은 아이가 그냥 나이를 속여 입력할 것이다.',
      '게다가 소셜 미디어는 오늘날 일상의 일부다. 반 단체 대화방이나 학교 과제도 소셜 미디어로 이루어지는 경우가 많아서, 접근할 수 없는 아이는 금세 소외될 것이다. 열네 살이 되어서야 시작하는 아이는 그 전에 소셜 미디어를 비판적으로 다루는 법을 배워 본 적이 없다.',
      '그래서 초등학교 때부터 미디어 활용 능력을 가르치는 편이 더 의미 있을 것이다. 부모는 아이와 함께 분명한 규칙을 정해야 한다. 예를 들면 휴대폰을 쓰는 시간을 정하고 어린이에게 맞는 설정을 해 두는 것이다.',
      '정리하면 이렇다. 아이들에게 필요한 것은 금지가 아니라 곁에서 이끌어 주는 것이다.'
    ],
    notes: [
      { de: 'Ob …, wird zurzeit viel diskutiert.', ko: '포럼 주제를 ob 문장으로 받아 첫 문장을 만들었어요. 과제 문장을 그대로 베끼지 않았어요.' },
      { de: 'Ich halte … nicht für die beste Lösung.', ko: 'halten für = 「…라고 여기다」. 입장을 첫 문단에서 분명히 했어요.' },
      { de: 'Zwar würde …, aber … ließe es sich kaum kontrollieren.', ko: '반대 의견을 zwar로 인정한 뒤 aber로 반박했어요. 접속법 II로 가정을 표현했어요.' },
      { de: 'Wer erst mit 14 anfängt, hat …', ko: 'wer로 시작하는 관계문이 주어 역할을 해요. 「…하는 사람은」.' },
      { de: 'kein Verbot, sondern Begleitung', ko: 'kein … sondern으로 대비를 만들어 짧고 강하게 마무리했어요.' }
    ]
  }
},

/* ═══════════════════════ C1 ═══════════════════════ */
{
  id: 'c1-01', level: 'C1', no: 1,
  title: 'Künstliche Intelligenz im Studium', titleKo: '논증문 쓰기: 대학 공부와 AI',
  type: 'Erörterung', typeKo: '논증문',
  exam: 'C1 시험과 대학 과제에서 쓰는 논증문(Erörterung) 유형',
  time: 50, words: [250, 320],
  intro: '찬반 근거를 모두 살핀 뒤 내 입장을 세우고 제안까지 하는 논증문을 써요. C1에서는 근거의 무게를 비교하는 표현과 명사 중심 문체가 중요해요.',
  goals: ['찬성과 반대 근거를 균형 있게 제시해요', 'Dem steht entgegen, Schwerer wiegt, Ausschlaggebend ist처럼 근거의 무게를 비교해요', '접속사 문장을 명사구로 바꿔 글을 압축해요'],
  aufbau: [
    { de: 'Einleitung', ko: '도입: 왜 지금 이 주제인가', ex: 'Seit KI-Programme … zugänglich sind, hat sich das Studium spürbar verändert.' },
    { de: 'Pro-Argumente', ko: '찬성 근거', ex: 'Für die Nutzung spricht in erster Linie, dass …' },
    { de: 'Contra-Argumente', ko: '반대 근거', ex: 'Dem steht allerdings entgegen, dass …' },
    { de: 'Abwägung und Stellungnahme', ko: '비교와 내 입장', ex: 'Wägt man die Argumente gegeneinander ab, so …' },
    { de: 'Vorschlag', ko: '제안', ex: 'Hochschulen sollten daher klare Richtlinien erarbeiten, …' },
    { de: 'Schluss', ko: '결론', ex: 'Abschließend lässt sich festhalten: …' }
  ],
  tipps: [
    '제목을 한 줄 달고 시작해도 좋아요. 도입은 주제가 왜 중요해졌는지로 시작해요.',
    '반대 근거 가운데 더 무거운 것을 뒤에 두면 입장으로 넘어가기 자연스러워요. Schwerer wiegt jedoch …',
    'C1에서는 ich를 줄이고 man, 수동, sich lassen 같은 객관적인 표현을 섞어요.',
    '같은 연결어를 되풀이하지 말고 바꿔 써요. außerdem → zudem, darüber hinaus / aber → allerdings, jedoch'
  ],
  fehler: [
    { f: 'Meines Erachtens nach überwiegen die Vorteile.', r: 'Meines Erachtens überwiegen die Vorteile.', e: 'Meines Erachtens에는 nach를 붙이지 않아요. Meiner Meinung nach와 섞어 쓴 실수예요.' },
    { f: 'Je häufiger KI genutzt wird, desto wichtiger klare Regeln werden.', r: 'Je häufiger KI genutzt wird, desto wichtiger werden klare Regeln.', e: 'desto + 형용사 다음에는 동사가 바로 와요.' },
    { f: 'Aufgrund dessen, weil KI Fehler macht, …', r: 'Weil KI Fehler macht, … / Aufgrund der Fehleranfälligkeit von KI …', e: '이유 표현을 두 번 겹쳐 썼어요. 접속사 문장과 명사구 가운데 하나만 써요.' },
    { f: 'Die Studenten sollen KI nicht benutzen, weil es ist gefährlich.', r: 'Studierende sollten KI nicht unkritisch nutzen, da sie häufig fehlerhafte Informationen liefert.', e: 'weil/da 문장은 동사가 맨 끝이에요. C1에서는 「위험하다」 대신 무엇이 왜 문제인지 구체적으로 써요.' }
  ],
  redemittel: [
    { g: '도입', items: [['In den letzten Jahren hat … stark an Bedeutung gewonnen.', '최근 몇 년 사이 …의 중요성이 크게 커졌다.'], ['Kaum ein Thema wird derzeit so kontrovers diskutiert wie …', '요즘 …만큼 논란이 큰 주제는 드물다.'], ['Im Folgenden sollen die wichtigsten Argumente abgewogen werden.', '아래에서는 가장 중요한 논거를 따져 보려 한다.']] },
    { g: '찬성 근거', items: [['Für … spricht in erster Linie, dass …', '…을 지지하는 가장 큰 근거는 …이다.'], ['Ein gewichtiges Argument ist …', '무게 있는 논거는 …이다.'], ['Nicht zu unterschätzen ist zudem, dass …', '또한 …라는 점도 가볍게 볼 수 없다.']] },
    { g: '반대 근거', items: [['Dem steht allerdings entgegen, dass …', '그러나 이에 맞서는 것은 …라는 점이다.'], ['Kritisch zu sehen ist jedoch …', '하지만 …은 비판적으로 보아야 한다.'], ['Gegner verweisen darauf, dass …', '반대하는 사람들은 …라는 점을 지적한다.'], ['Schwerer wiegt jedoch ein anderes Argument: …', '그러나 더 무거운 논거는 따로 있다.']] },
    { g: '비교와 입장', items: [['Wägt man die Argumente gegeneinander ab, so …', '논거들을 서로 견주어 보면 …'], ['Meines Erachtens überwiegen …', '내가 보기에는 …이 더 크다.'], ['Ausschlaggebend ist für mich, dass …', '나에게 결정적인 것은 …라는 점이다.']] },
    { g: '제안', items: [['Es wäre wünschenswert, dass …', '…라면 바람직할 것이다.'], ['Denkbar wäre etwa, dass …', '예를 들어 …하는 방안을 생각해 볼 수 있다.'], ['… sollten klare Richtlinien erarbeiten, die …', '…은 …하는 분명한 지침을 마련해야 한다.']] },
    { g: '결론', items: [['Abschließend lässt sich festhalten, dass …', '끝으로 …라고 정리할 수 있다.'], ['Entscheidend wird sein, ob es gelingt, …', '…에 성공하느냐가 관건이 될 것이다.']] }
  ],
  uebung: [
    { t: 'fix', q: 'Meines Erachtens nach überwiegen die Vorteile.', a: ['Meines Erachtens überwiegen die Vorteile.', 'Meiner Meinung nach überwiegen die Vorteile.', 'Meiner Ansicht nach überwiegen die Vorteile.'], e: 'Meines Erachtens 자체가 「내 생각에는」이라 nach가 필요 없어요.' },
    { t: 'fill', q: 'Dem ___ entgegen, dass KI-Texte häufig Fehler enthalten.', a: ['steht'], e: 'etwas steht etwas entgegen = 무엇이 무엇에 맞서다. 반대 근거를 꺼낼 때 써요.' },
    { t: 'fix', q: 'Je häufiger KI genutzt wird, desto wichtiger klare Regeln werden.', a: ['Je häufiger KI genutzt wird, desto wichtiger werden klare Regeln.'], e: 'desto 문장은 「desto + 비교급 + 동사 + 주어」 순서예요.' },
    { t: 'mc', q: '반대 측의 근거를 소개할 때 알맞은 것은?', o: ['Gegner verweisen darauf, dass …', 'Aus diesem Grund …', 'Infolgedessen …'], a: 0, e: 'Aus diesem Grund와 Infolgedessen은 앞 내용의 결과를 말할 때 써요.' },
    { t: 'fill', q: '___ man die Argumente gegeneinander ab, so überwiegen die Vorteile.', a: ['Wägt'], e: 'wenn 없이 동사를 맨 앞에 둔 조건문이에요. abwägen → Wägt man … ab.' },
    { t: 'mc', q: '「Weil KI immer häufiger genutzt wird, …」를 명사구로 바꾼 것은?', o: ['Wegen der zunehmenden Nutzung von KI …', 'Wegen KI immer häufiger genutzt …', 'Trotz der häufigen KI …'], a: 0, e: '동사 nutzen → 명사 die Nutzung, immer häufiger → zunehmend. wegen + 2격이에요.' }
  ],
  aufgabe: {
    lead: 'Viele Hochschulen diskutieren darüber, ob Studierende KI-Programme wie Chatbots für Hausarbeiten nutzen dürfen. Schreiben Sie einen argumentativen Text zum Thema „Künstliche Intelligenz im Studium – Hilfe oder Gefahr?“',
    punkte: ['Erläutern Sie, warum das Thema an Bedeutung gewinnt.', 'Stellen Sie Argumente für und gegen die Nutzung dar.', 'Nehmen Sie begründet Stellung.', 'Machen Sie einen Vorschlag für den Umgang mit KI an Hochschulen.'],
    close: 'Schreiben Sie etwa 250–320 Wörter.',
    ko: {
      lead: '많은 대학이 학생들이 과제에 챗봇 같은 AI 프로그램을 써도 되는지 논의하고 있어요. 「대학 공부와 AI – 도움인가, 위험인가?」를 주제로 논증문을 쓰세요.',
      punkte: ['이 주제가 왜 중요해지고 있는지 설명하세요.', 'AI 사용에 찬성하는 근거와 반대하는 근거를 제시하세요.', '근거를 들어 내 입장을 밝히세요.', '대학에서 AI를 어떻게 다루면 좋을지 제안하세요.'],
      close: '250–320단어 정도로 쓰세요.'
    }
  },
  check: ['도입에서 주제가 중요해진 이유를 썼어요.', '찬성 근거를 두 가지 이상 썼어요.', '반대 근거를 두 가지 이상 썼어요.', '근거를 비교한 뒤 내 입장을 밝혔어요.', '구체적인 제안을 했어요.', '결론 문단으로 끝냈어요.', '같은 연결어를 되풀이하지 않았어요.', '250단어 이상 썼어요.'],
  muster: {
    de: [
      'Künstliche Intelligenz im Studium – Hilfe oder Gefahr?',
      'Seit KI-Programme wie Chatbots für jeden kostenlos zugänglich sind, hat sich das Studium spürbar verändert. Innerhalb weniger Sekunden lassen sich Texte zusammenfassen, Gliederungen erstellen oder ganze Absätze formulieren. Kaum eine Frage wird an Hochschulen derzeit so kontrovers diskutiert wie die, ob und in welchem Umfang Studierende solche Werkzeuge nutzen dürfen.',
      'Für die Nutzung spricht in erster Linie, dass KI den Zugang zu Wissen erleichtert. Wer etwa mit einem komplexen Fachtext kämpft, kann sich Begriffe erklären lassen und so schneller zum Kern vordringen. Nicht zu unterschätzen ist zudem, dass gerade Studierende, die nicht in ihrer Muttersprache studieren, ihre Texte sprachlich überprüfen können. Darüber hinaus helfen die Programme dabei, erste Ideen zu ordnen und eine Arbeit sinnvoll zu gliedern.',
      'Dem steht allerdings entgegen, dass die Programme häufig fehlerhafte oder sogar erfundene Informationen liefern. Wer sich blind auf sie verlässt, übernimmt diese Fehler. Schwerer wiegt jedoch ein anderes Argument: Wer das Schreiben vollständig auslagert, trainiert genau die Fähigkeiten nicht, die ein Studium vermitteln soll – eigenständiges Denken und präzises Argumentieren.',
      'Wägt man die Argumente gegeneinander ab, so halte ich ein generelles Verbot weder für sinnvoll noch für durchsetzbar. Ausschlaggebend ist für mich nicht die Frage, ob KI genutzt wird, sondern wie.',
      'Hochschulen sollten daher klare Richtlinien erarbeiten, die festlegen, wofür KI eingesetzt werden darf. Denkbar wäre etwa, dass Studierende in jeder Hausarbeit angeben, welche Hilfsmittel sie verwendet haben. Zugleich müssten Prüfungsformen stärker auf mündliche Verteidigung und Reflexion setzen.',
      'Abschließend lässt sich festhalten: KI ist weder Wundermittel noch Bedrohung. Entscheidend wird sein, ob es gelingt, Studierende zu einem verantwortungsvollen Umgang mit ihr zu befähigen.'
    ],
    ko: [
      '대학 공부와 AI – 도움인가, 위험인가?',
      '챗봇 같은 AI 프로그램을 누구나 무료로 쓸 수 있게 된 뒤로 대학 공부는 눈에 띄게 달라졌다. 몇 초 만에 글을 요약하고, 개요를 짜고, 문단 전체를 써 낼 수 있다. 학생들이 이런 도구를 써도 되는지, 쓴다면 어디까지 써도 되는지만큼 요즘 대학에서 논란이 큰 문제는 드물다.',
      '사용을 지지하는 가장 큰 근거는 AI가 지식에 다가가는 길을 쉽게 해 준다는 점이다. 예를 들어 어려운 전공 글과 씨름하는 학생은 개념 설명을 받아 핵심에 더 빨리 다가갈 수 있다. 또한 특히 모국어가 아닌 언어로 공부하는 학생들이 자기 글의 언어를 점검할 수 있다는 점도 가볍게 볼 수 없다. 나아가 프로그램은 처음 떠오른 생각을 정리하고 글의 구성을 짜는 데도 도움이 된다.',
      '그러나 이에 맞서는 것은 프로그램이 자주 틀리거나 심지어 지어낸 정보를 내놓는다는 점이다. 프로그램을 무작정 믿는 사람은 그 오류를 그대로 가져가게 된다. 하지만 더 무거운 논거는 따로 있다. 글쓰기를 통째로 맡겨 버리는 사람은 대학 공부가 길러 주어야 할 바로 그 능력, 곧 스스로 생각하고 정확하게 논증하는 능력을 기르지 못한다.',
      '논거들을 견주어 보면 나는 전면 금지가 의미 있지도 않고 실제로 지켜질 수도 없다고 본다. 나에게 결정적인 것은 AI를 쓰느냐가 아니라 어떻게 쓰느냐다.',
      '그러므로 대학은 AI를 어디에 써도 되는지 정하는 분명한 지침을 마련해야 한다. 예를 들어 학생이 과제마다 어떤 도구를 썼는지 밝히게 하는 방안을 생각해 볼 수 있다. 동시에 시험 방식도 구술 방어와 성찰에 더 무게를 두어야 할 것이다.',
      '끝으로 이렇게 정리할 수 있다. AI는 만능 해결책도 위협도 아니다. 관건은 학생들이 AI를 책임 있게 다룰 수 있도록 길러 내는 데 성공하느냐다.'
    ],
    notes: [
      { de: 'Innerhalb weniger Sekunden lassen sich Texte zusammenfassen …', ko: 'sich lassen + 원형으로 수동의 뜻을 객관적으로 표현했어요. innerhalb + 2격이에요.' },
      { de: 'Kaum eine Frage wird … so kontrovers diskutiert wie die, ob …', ko: 'die가 앞의 Frage를 다시 가리키고, 그 내용을 ob 문장으로 풀었어요.' },
      { de: 'Dem steht allerdings entgegen, dass …', ko: '찬성 근거에서 반대 근거로 넘어가는 C1다운 연결이에요.' },
      { de: 'Schwerer wiegt jedoch ein anderes Argument:', ko: '반대 근거 가운데 더 무거운 것을 뒤에 두어 입장으로 이어지게 했어요.' },
      { de: 'nicht die Frage, ob KI genutzt wird, sondern wie', ko: 'nicht … sondern으로 논점을 「쓰느냐」에서 「어떻게 쓰느냐」로 옮겼어요.' },
      { de: 'Zugleich müssten Prüfungsformen …', ko: '접속법 II müssten으로 제안을 단정하지 않고 부드럽게 했어요.' }
    ]
  }
},
{
  id: 'c1-02', level: 'C1', no: 2,
  title: 'Eine Grafik beschreiben und auswerten', titleKo: '그래프 설명하고 해석하기',
  type: 'Grafikbeschreibung', typeKo: '그래프 설명',
  exam: 'TestDaF·대학 과제에서 쓰는 그래프 설명 유형',
  time: 40, words: [200, 260],
  intro: '막대그래프를 보고 무엇을 보여 주는지, 어떤 변화가 있는지, 왜 그런지를 쓰고, 한국의 상황과 비교해요. 수치를 정확한 표현으로 옮기는 것이 핵심이에요.',
  goals: ['그래프의 주제, 출처, 기간을 첫 문단에 써요', 'um과 auf, Prozent와 Prozentpunkt를 정확히 구분해요', '변화의 이유를 vermutlich, lässt sich … zurückführen으로 조심스럽게 추측해요'],
  aufbau: [
    { de: 'Einleitung', ko: '무엇을 보여 주는 그래프인가', ex: 'Die Grafik gibt Auskunft darüber, …' },
    { de: 'Hauptergebnisse', ko: '가장 눈에 띄는 결과', ex: 'Auffällig ist zunächst, dass …' },
    { de: 'Veränderungen', ko: '변화', ex: 'Der Anteil … ist von 38 auf 44 Prozent gestiegen.' },
    { de: 'Gründe', ko: '이유 추측', ex: 'Diese Entwicklung lässt sich vermutlich darauf zurückführen, dass …' },
    { de: 'Vergleich', ko: '한국과 비교', ex: 'In Korea sieht die Situation etwas anders aus.' },
    { de: 'Fazit', ko: '정리', ex: 'Insgesamt zeigt die Grafik deutlich, dass …' }
  ],
  tipps: [
    '숫자를 모두 나열하지 말고 가장 큰 것, 가장 많이 변한 것, 변하지 않은 것을 골라 써요.',
    'von 38 auf 44 Prozent = 38%에서 44%로, um 6 Prozentpunkte = 6%포인트만큼. 백분율끼리의 차이는 Prozentpunkte예요.',
    'knapp die Hälfte(50%보다 조금 적게), gut ein Viertel(25%보다 조금 많게)처럼 어림 표현을 섞으면 글이 자연스러워요.',
    '그래프에 없는 이유는 단정하지 않아요. vermutlich, möglicherweise, lässt sich … erklären을 써요.'
  ],
  fehler: [
    { f: 'Der Anteil ist um 17 Prozent gesunken. (31 % → 17 %)', r: 'Der Anteil ist auf 17 Prozent gesunken.', e: '도착한 값은 auf, 변한 폭은 um이에요. 31%에서 17%로 내려갔으니 auf 17 Prozent예요.' },
    { f: 'Der Anteil ist um 14 Prozent gesunken. (31 % → 17 %)', r: 'Der Anteil ist um 14 Prozentpunkte gesunken.', e: '백분율끼리의 차이는 Prozentpunkte예요.' },
    { f: 'Die Grafik zeigt über die Verkehrsmittel …', r: 'Die Grafik gibt Auskunft über die Verkehrsmittel …', e: 'zeigen은 4격 목적어를 바로 받아요. über를 쓰려면 Auskunft geben über, informieren über를 써요.' },
    { f: 'Das Fahrrad ist gestiegen.', r: 'Der Anteil der Radfahrer ist gestiegen.', e: '오르고 내리는 것은 자전거가 아니라 자전거 이용자의 비율이에요.' }
  ],
  redemittel: [
    { g: '그래프 소개', items: [['Die Grafik gibt Auskunft darüber, wie/wie viele …', '이 그래프는 …에 대해 알려 준다.'], ['Das Säulendiagramm zeigt …', '이 막대그래프는 …을 보여 준다.'], ['Die Angaben stammen aus …', '자료의 출처는 …이다.'], ['Verglichen werden die Jahre 2015 und 2025.', '2015년과 2025년을 비교한다.']] },
    { g: '결과 말하기', items: [['Auffällig ist zunächst, dass …', '먼저 눈에 띄는 것은 …이다.'], ['An erster Stelle stehen …, gefolgt von …', '1위는 …이고, 그 뒤를 …이 잇는다.'], ['Den größten Anteil machen … aus.', '가장 큰 비율을 차지하는 것은 …이다.'], ['knapp die Hälfte / gut ein Viertel / fast ein Drittel', '절반에 조금 못 미치는 / 4분의 1이 조금 넘는 / 거의 3분의 1']] },
    { g: '변화 말하기', items: [['Der Anteil ist von 38 auf 44 Prozent gestiegen.', '비율이 38%에서 44%로 올랐다.'], ['… ist um acht Prozentpunkte gestiegen.', '…이 8%포인트 올랐다.'], ['… hat stark an Bedeutung verloren.', '…의 비중이 크게 줄었다.'], ['… ist mit 12 Prozent gleich geblieben.', '…은 12%로 그대로다.']] },
    { g: '이유 추측', items: [['Diese Entwicklung lässt sich vermutlich darauf zurückführen, dass …', '이 변화는 아마 …에서 비롯된 것으로 볼 수 있다.'], ['Ein möglicher Grund dafür ist …', '그 이유로 …을 들 수 있다.'], ['Zum einen …, zum anderen …', '한편으로는 …, 다른 한편으로는 …']] },
    { g: '비교와 정리', items: [['In meinem Heimatland sieht die Situation etwas anders aus.', '내 나라의 상황은 조금 다르다.'], ['Ähnlich wie in Deutschland …', '독일과 비슷하게 …'], ['Insgesamt zeigt die Grafik deutlich, dass …', '전체적으로 이 그래프는 …을 분명히 보여 준다.']] }
  ],
  uebung: [
    { t: 'mc', q: '31%에서 17%로 내려갔을 때 바른 문장은?', o: ['Der Anteil ist um 17 Prozent gesunken.', 'Der Anteil ist auf 17 Prozent gesunken.', 'Der Anteil ist bis 17 Prozent gesunken.'], a: 1, e: '도착한 값은 auf예요. um은 변한 폭(14%포인트)을 말할 때 써요.' },
    { t: 'fill', q: 'Der Anteil der Radfahrer ist ___ acht Prozentpunkte gestiegen.', a: ['um'], e: '변한 폭은 um이에요.' },
    { t: 'mc', q: '44%를 어림해서 말한 것으로 알맞은 것은?', o: ['knapp die Hälfte', 'gut ein Drittel', 'fast ein Viertel'], a: 0, e: 'knapp = 「조금 못 미치는」. 44%는 절반에 조금 못 미쳐요.' },
    { t: 'fill', q: 'Diese Entwicklung lässt sich vermutlich darauf ___, dass das Ticket günstiger geworden ist.', a: ['zurückführen'], e: 'etwas auf etwas zurückführen = 무엇의 원인을 무엇에서 찾다.' },
    { t: 'fix', q: 'Die Grafik zeigt über die Verkehrsmittel von Studierenden.', a: ['Die Grafik gibt Auskunft über die Verkehrsmittel von Studierenden.', 'Die Grafik informiert über die Verkehrsmittel von Studierenden.', 'Die Grafik zeigt die Verkehrsmittel von Studierenden.'], e: 'zeigen 뒤에는 über 없이 4격이 와요. über를 쓰려면 Auskunft geben이나 informieren을 써요.' },
    { t: 'mc', q: '버스·전철이 1위, 자전거가 2위일 때 알맞은 문장은?', o: ['An erster Stelle stehen Bus und Bahn, gefolgt vom Fahrrad.', 'Bus und Bahn sind erster, Fahrrad ist zweiter.', 'Zuerst kommt der Bus, dann gefolgt das Fahrrad.'], a: 0, e: 'an erster Stelle stehen, gefolgt von + 3격이 순위를 말하는 고정 표현이에요.' }
  ],
  aufgabe: {
    lead: 'Die Grafik zeigt, mit welchen Verkehrsmitteln die Studierenden einer deutschen Universität in den Jahren 2015 und 2025 hauptsächlich zur Hochschule gekommen sind.',
    chart: {
      title: 'Wie kommen Studierende zur Hochschule?',
      unit: 'Angaben in Prozent',
      source: 'Quelle: Studierendenbefragung (Beispieldaten für den Unterricht)',
      series: ['2015', '2025'],
      rows: [
        { label: 'Bus und Bahn', ko: '버스·전철', v: [38, 44] },
        { label: 'Fahrrad', ko: '자전거', v: [19, 27] },
        { label: 'Auto', ko: '자동차', v: [31, 17] },
        { label: 'zu Fuß', ko: '걸어서', v: [12, 12] }
      ]
    },
    punkte: ['Beschreiben Sie, was die Grafik zeigt.', 'Nennen Sie die wichtigsten Ergebnisse und Veränderungen.', 'Nennen Sie mögliche Gründe für die Veränderungen.', 'Beschreiben Sie die Situation in Ihrem Heimatland und vergleichen Sie.'],
    close: 'Schreiben Sie etwa 200–260 Wörter.',
    ko: {
      lead: '이 그래프는 독일의 한 대학 학생들이 2015년과 2025년에 주로 어떤 교통수단으로 학교에 왔는지 보여 줘요.',
      punkte: ['그래프가 무엇을 보여 주는지 설명하세요.', '가장 중요한 결과와 변화를 쓰세요.', '변화의 이유를 추측해 쓰세요.', '한국의 상황을 설명하고 비교하세요.'],
      close: '200–260단어 정도로 쓰세요.'
    }
  },
  check: ['첫 문단에 주제, 출처, 비교 연도를 썼어요.', '1위와 가장 크게 변한 항목을 썼어요.', 'von … auf …와 um … Prozentpunkte를 바르게 썼어요.', '변하지 않은 항목도 썼어요.', '이유를 vermutlich 같은 말로 조심스럽게 추측했어요.', '한국과 비교했어요.', '정리 문장으로 끝냈어요.', '200단어 이상 썼어요.'],
  muster: {
    de: [
      'Die Grafik gibt Auskunft darüber, mit welchen Verkehrsmitteln Studierende einer deutschen Universität hauptsächlich zur Hochschule kommen. Verglichen werden die Jahre 2015 und 2025. Die Angaben stammen aus einer Befragung der Studierenden und sind in Prozent angegeben.',
      'Auffällig ist zunächst, dass Bus und Bahn in beiden Jahren an erster Stelle stehen. Ihr Anteil ist von 38 auf 44 Prozent gestiegen; damit fährt inzwischen knapp die Hälfte der Studierenden mit öffentlichen Verkehrsmitteln. Noch deutlicher hat das Fahrrad zugelegt: Der Anteil der Radfahrer stieg um acht Prozentpunkte auf 27 Prozent. Das Auto hat dagegen stark an Bedeutung verloren. Fuhren 2015 noch 31 Prozent mit dem eigenen Wagen, waren es 2025 nur noch 17 Prozent. Der Anteil derjenigen, die zu Fuß gehen, ist mit 12 Prozent gleich geblieben.',
      'Diese Entwicklung lässt sich vermutlich auf mehrere Ursachen zurückführen. Zum einen sind Parkplätze in der Nähe vieler Hochschulen knapp und teuer geworden. Zum anderen bieten günstige Semestertickets eine attraktive Alternative zum Auto. Hinzu kommt, dass viele Städte ihre Radwege ausgebaut haben.',
      'In Korea sieht die Situation etwas anders aus. Auch dort nutzen die meisten Studierenden U-Bahn und Bus. Das Fahrrad spielt in Großstädten wie Seoul jedoch eine eher geringe Rolle, weil die Wege oft sehr lang sind und es nicht überall sichere Radwege gibt.',
      'Insgesamt zeigt die Grafik deutlich, dass sich das Mobilitätsverhalten der Studierenden in Richtung umweltfreundlicher Verkehrsmittel verschoben hat.'
    ],
    ko: [
      '이 그래프는 독일의 한 대학 학생들이 주로 어떤 교통수단으로 학교에 오는지 알려 준다. 2015년과 2025년을 비교하고 있다. 자료는 학생 설문 조사에서 나왔으며 백분율로 나타냈다.',
      '먼저 눈에 띄는 것은 두 해 모두 버스와 전철이 1위라는 점이다. 그 비율은 38%에서 44%로 올랐다. 이제 학생의 절반에 조금 못 미치는 수가 대중교통을 이용하는 셈이다. 자전거는 더 뚜렷하게 늘었다. 자전거 이용자의 비율은 8%포인트 올라 27%가 되었다. 반면 자동차의 비중은 크게 줄었다. 2015년에는 31%가 자기 차로 왔지만 2025년에는 17%에 그쳤다. 걸어서 오는 학생의 비율은 12%로 그대로다.',
      '이 변화는 아마 여러 원인에서 비롯된 것으로 볼 수 있다. 한편으로는 많은 대학 근처의 주차 공간이 부족해지고 비싸졌다. 다른 한편으로는 저렴한 학기 교통권이 자동차를 대신할 매력적인 선택지가 되었다. 게다가 많은 도시가 자전거 도로를 넓혔다.',
      '한국의 상황은 조금 다르다. 한국에서도 대부분의 학생이 지하철과 버스를 이용한다. 하지만 서울 같은 대도시에서는 이동 거리가 긴 경우가 많고 안전한 자전거 도로가 어디에나 있는 것은 아니어서 자전거의 비중이 비교적 작다.',
      '전체적으로 이 그래프는 학생들의 이동 습관이 친환경 교통수단 쪽으로 옮겨 갔다는 것을 분명히 보여 준다.'
    ],
    notes: [
      { de: 'Die Grafik gibt Auskunft darüber, mit welchen …', ko: '첫 문장에서 그래프의 주제를 간접의문문으로 정리했어요.' },
      { de: 'von 38 auf 44 Prozent / um acht Prozentpunkte auf 27 Prozent', ko: '출발값은 von, 도착값은 auf, 변한 폭은 um이에요. 백분율 차이는 Prozentpunkte예요.' },
      { de: 'Fuhren 2015 noch 31 Prozent …, waren es 2025 nur noch 17 Prozent.', ko: '동사를 맨 앞에 둔 문장 두 개로 과거와 현재를 맞대어 보여 줬어요.' },
      { de: 'der Anteil derjenigen, die zu Fuß gehen', ko: 'derjenigen(2격 복수) + 관계문 = 「…하는 사람들의」.' },
      { de: 'lässt sich vermutlich auf … zurückführen', ko: '그래프에 없는 이유라서 vermutlich로 조심스럽게 추측했어요.' }
    ]
  }
}
];
