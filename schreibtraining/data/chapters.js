/* SODA SCHREIBTRAINING · 쓰기 훈련 데이터 (A1–C1, 레벨별 10챕터)
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
 *
 * 말투: 한국어 설명과 해석은 해요체로 써요. B1 이상 격식 편지의 해석(표현, 모범답안)만 합니다체로 써요.
 * 모범답안에서 40자보다 짧은 문단(부르는 말, 끝인사)은 화면에 「해석」 단추가 나오지 않아요.
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
    { g: '부르는 말', items: [['Liebe Lena,', '레나에게 (여자)'], ['Lieber Jonas,', '요나스에게 (남자)'], ['Hallo Lena,', '레나, 안녕하세요']] },
    { g: '사과하기', items: [['Es tut mir leid.', '미안해요.'], ['Leider kann ich am Samstag nicht kommen.', '아쉽지만 토요일에 못 가요.'], ['Entschuldige bitte!', '미안해요!']] },
    { g: '이유 말하기', items: [['Ich bin krank.', '아파요.'], ['Ich muss arbeiten.', '일해야 해요.'], ['Meine Eltern besuchen mich.', '부모님이 저를 보러 오세요.'], ['Ich habe einen Termin beim Arzt.', '병원 예약이 있어요.']] },
    { g: '새로 제안하기', items: [['Hast du am Sonntag Zeit?', '일요일에 시간 있어요?'], ['Können wir am Montag ins Kino gehen?', '월요일에 영화 보러 갈 수 있을까요?'], ['Geht es am Freitag um 18 Uhr?', '금요일 6시는 어때요?']] },
    { g: '끝인사', items: [['Bis bald!', '곧 만나요!'], ['Liebe Grüße', '안부를 전해요 (다정한 끝인사)'], ['Viele Grüße', '안부를 전해요 (무난한 끝인사)']] }
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
      '미안하지만 토요일에 못 가요. 아파서 침대에 누워 있어야 해요. 일요일에 시간 있어요? 그러면 카페에 갈 수 있어요.',
      '안부를 전하며,\n민지'
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
{
  id: 'a1-03', level: 'A1', no: 3,
  title: 'Ich stelle mich vor', titleKo: '나를 소개하는 글 쓰기',
  type: 'Vorstellung', typeKo: '자기소개',
  exam: '수업 단체 채팅방에 올리는 소개 글 · Goethe-Zertifikat A1 쓰기 Teil 2와 비슷한 분량',
  time: 10, words: [30, 50],
  intro: '새 독일어 반의 단체 채팅방에 나를 소개하는 글을 써요. 이름, 출신, 사는 곳, 하는 일, 취미를 짧은 문장으로 차례대로 말해요.',
  goals: ['이름·출신·사는 곳을 heißen, kommen aus, wohnen in으로 말해요', '직업은 관사 없이, 취미는 gern과 함께 말해요', '인사로 시작하고 인사로 끝내요'],
  aufbau: [
    { de: 'Begrüßung', ko: '인사', ex: 'Hallo zusammen!' },
    { de: 'Name und Herkunft', ko: '이름과 출신', ex: 'Ich heiße Jiho Kim und komme aus Korea.' },
    { de: 'Wohnort', ko: '사는 곳', ex: 'Jetzt wohne ich in Köln.' },
    { de: 'Beruf', ko: '하는 일', ex: 'Ich bin Koch und arbeite in einem Restaurant.' },
    { de: 'Hobbys', ko: '취미', ex: 'Ich koche gern. Am Wochenende spiele ich Fußball.' },
    { de: 'Schluss und Gruß', ko: '끝맺는 말과 인사', ex: 'Ich freue mich auf den Kurs! / Viele Grüße / Jiho' }
  ],
  tipps: [
    '직업이나 신분 앞에는 관사를 쓰지 않아요. Ich bin Lehrerin. Ich bin Student.',
    '나라 이름 앞에는 보통 관사가 없어요. aus Korea, aus Japan. 하지만 aus der Türkei, aus der Schweiz, aus den USA는 관사가 있어요.',
    '좋아하는 일은 「동사 + gern」으로 말해요. Ich schwimme gern.',
    '모든 문장을 Ich로 시작하면 단조로워요. Jetzt wohne ich …, Am Wochenende spiele ich …처럼 다른 말로 시작하면 동사가 두 번째, ich가 세 번째예요.'
  ],
  fehler: [
    { f: 'Ich bin ein Student.', r: 'Ich bin Student.', e: '직업·신분 앞에는 관사를 쓰지 않아요.' },
    { f: 'Ich komme von Korea.', r: 'Ich komme aus Korea.', e: '출신 나라는 aus로 말해요.' },
    { f: 'Ich gern koche.', r: 'Ich koche gern.', e: '동사는 두 번째 자리예요. gern은 동사 뒤에 와요.' },
    { f: 'Jetzt ich wohne in Köln.', r: 'Jetzt wohne ich in Köln.', e: 'Jetzt가 첫 자리에 오면 동사 wohne가 두 번째예요.' }
  ],
  redemittel: [
    { g: '인사', items: [['Hallo zusammen!', '여러분, 안녕하세요!'], ['Guten Tag!', '안녕하세요!'], ['Hallo, ich bin neu hier.', '안녕하세요, 저는 여기 새로 왔어요.']] },
    { g: '이름과 출신', items: [['Ich heiße Jiho Kim.', '제 이름은 김지호예요.'], ['Mein Name ist Jiho Kim.', '제 이름은 김지호예요.'], ['Ich komme aus Korea.', '저는 한국에서 왔어요.'], ['Ich bin 27 Jahre alt.', '스물일곱 살이에요.']] },
    { g: '사는 곳', items: [['Ich wohne in Köln.', '쾰른에 살아요.'], ['Jetzt wohne ich in Deutschland.', '지금은 독일에 살아요.'], ['Ich wohne allein.', '혼자 살아요.']] },
    { g: '하는 일', items: [['Ich bin Studentin.', '대학생이에요. (여자)'], ['Ich bin Koch von Beruf.', '직업은 요리사예요.'], ['Ich arbeite als Koch.', '요리사로 일해요.'], ['Ich lerne seit drei Monaten Deutsch.', '석 달 전부터 독일어를 배워요.']] },
    { g: '취미', items: [['Ich koche gern.', '요리하는 것을 좋아해요.'], ['Meine Hobbys sind Lesen und Schwimmen.', '취미는 독서와 수영이에요.'], ['Am Wochenende spiele ich Fußball.', '주말에는 축구를 해요.']] },
    { g: '끝맺기', items: [['Ich freue mich auf den Kurs!', '수업이 기대돼요!'], ['Bis bald!', '곧 만나요!'], ['Viele Grüße', '안부를 전해요']] }
  ],
  uebung: [
    { t: 'mc', q: '직업을 바르게 말한 문장은?', o: ['Ich bin ein Koch.', 'Ich bin Koch.', 'Ich bin der Koch.'], a: 1, e: '직업 앞에는 관사를 쓰지 않아요.' },
    { t: 'fill', q: 'Ich komme ___ Korea.', a: ['aus'], e: '출신 나라는 aus로 말해요.' },
    { t: 'fill', q: 'Ich ___ in Köln. (wohnen)', a: ['wohne'], e: 'ich와 함께 쓰는 동사는 -e로 끝나요.' },
    { t: 'fix', q: 'Ich gern schwimme.', a: ['Ich schwimme gern.'], e: '동사 schwimme가 두 번째 자리, gern은 그 뒤에 와요.' },
    { t: 'mc', q: 'Am Wochenende로 시작할 때 어순이 바른 문장은?', o: ['Am Wochenende ich spiele Tennis.', 'Am Wochenende spiele ich Tennis.', 'Am Wochenende spiele Tennis ich.'], a: 1, e: 'Am Wochenende가 첫 자리를 차지하므로 동사 spiele가 두 번째, 주어 ich가 세 번째예요.' },
    { t: 'fill', q: 'Meine Hobbys ___ Kochen und Lesen. (sein)', a: ['sind'], e: '주어 Meine Hobbys가 복수라서 sind예요.' }
  ],
  aufgabe: {
    lead: 'Sie besuchen einen neuen Deutschkurs. Die Lehrerin sagt: „Bitte stellen Sie sich in unserer Chatgruppe vor.“ Schreiben Sie einen kurzen Text über sich.',
    punkte: ['Wie heißen Sie und woher kommen Sie?', 'Wo wohnen Sie? Was sind Sie von Beruf?', 'Was machen Sie gern?'],
    close: 'Schreiben Sie 30–50 Wörter. Schreiben Sie zu allen drei Punkten.',
    ko: {
      lead: '새 독일어 수업을 듣게 됐어요. 선생님이 「우리 단체 채팅방에 자기소개를 올려 주세요.」라고 해요. 나를 소개하는 짧은 글을 쓰세요.',
      punkte: ['이름이 무엇이고 어디에서 왔나요?', '어디에 사나요? 직업은 무엇인가요?', '무엇을 즐겨 하나요?'],
      close: '30–50단어로 쓰세요. 세 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['인사로 시작했어요.', '이름과 출신을 썼어요.', '사는 곳과 하는 일을 썼어요.', '좋아하는 일을 gern이나 Hobbys로 말했어요.', '직업 앞에 관사를 쓰지 않았어요.', '모든 문장에서 동사가 두 번째 자리에 있어요.'],
  muster: {
    de: [
      'Hallo zusammen!',
      'Ich heiße Jiho Kim und komme aus Korea. Ich bin 27 Jahre alt. Jetzt wohne ich in Köln. Ich bin Koch und arbeite in einem Restaurant. Ich koche gern. Am Wochenende spiele ich Fußball.',
      'Ich freue mich auf den Kurs!\nViele Grüße\nJiho'
    ],
    ko: [
      '여러분, 안녕하세요!',
      '제 이름은 김지호이고 한국에서 왔어요. 스물일곱 살이에요. 지금은 쾰른에 살아요. 요리사이고 식당에서 일해요. 요리하는 것을 좋아해요. 주말에는 축구를 해요.',
      '수업이 기대돼요!\n안부를 전하며,\n지호'
    ],
    notes: [
      { de: 'Ich heiße … und komme aus …', ko: '주어가 같으면 und 뒤에서 ich를 다시 쓰지 않아도 돼요.' },
      { de: 'Jetzt wohne ich in Köln.', ko: 'Jetzt가 첫 자리라 동사 wohne가 두 번째, 주어 ich가 세 번째예요.' },
      { de: 'Ich bin Koch …', ko: '직업 앞에는 관사가 없어요.' },
      { de: 'Am Wochenende spiele ich Fußball.', ko: '시간 표현으로 문장을 시작하면 글이 단조롭지 않아요.' }
    ]
  }
},
{
  id: 'a1-04', level: 'A1', no: 4,
  title: 'Eine Einladung zum Geburtstag', titleKo: '생일 파티에 초대하기',
  type: 'Einladung', typeKo: '초대 메시지',
  exam: 'Goethe-Zertifikat A1 쓰기 Teil 2와 같은 유형',
  time: 10, words: [25, 45],
  intro: '친구를 생일 파티에 초대하는 짧은 메시지를 써요. 언제, 어디서 하는지 정확히 알리고, 가져올 것을 부탁해요.',
  goals: ['요일은 am, 시각은 um으로 써요', '「우리 집에서」를 bei mir zu Hause로 말해요', 'Bring bitte … mit!로 부탁해요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Lieber Tim,' },
    { de: 'Einladung', ko: '초대', ex: 'ich habe am Samstag Geburtstag und mache eine Party.' },
    { de: 'Zeit und Ort', ko: '시간과 장소', ex: 'Die Party beginnt um 19 Uhr. Wir feiern bei mir zu Hause.' },
    { de: 'Bitte', ko: '부탁', ex: 'Bring bitte einen Salat mit!' },
    { de: 'Frage', ko: '올 수 있는지 묻기', ex: 'Kannst du kommen?' },
    { de: 'Gruß und Name', ko: '끝인사와 이름', ex: 'Liebe Grüße / Yuna' }
  ],
  tipps: [
    '요일과 날짜 앞에는 am, 시각 앞에는 um을 써요. am Samstag, um 19 Uhr.',
    '「우리 집에서」는 bei mir zu Hause예요. in meinem Haus보다 자연스러워요.',
    'mitbringen은 분리동사예요. 명령문에서 mit은 문장 끝으로 가요. Bring bitte Getränke mit!',
    '끝에 Kannst du kommen?을 쓰고 답장 기한(bis Donnerstag)을 알리면 초대가 완성돼요.'
  ],
  fehler: [
    { f: 'Ich habe im Samstag Geburtstag.', r: 'Ich habe am Samstag Geburtstag.', e: '요일 앞에는 am이에요.' },
    { f: 'Die Party beginnt am 19 Uhr.', r: 'Die Party beginnt um 19 Uhr.', e: '시각 앞에는 um이에요.' },
    { f: 'Bitte mitbring einen Kuchen!', r: 'Bitte bring einen Kuchen mit!', e: '분리동사는 명령문에서 접두어 mit이 문장 끝으로 가요.' },
    { f: 'Die Party ist in mein Haus.', r: 'Die Party ist bei mir zu Hause.', e: '「우리 집에서」는 bei mir zu Hause라고 해요.' }
  ],
  redemittel: [
    { g: '초대하기', items: [['Ich habe am Samstag Geburtstag.', '토요일이 제 생일이에요.'], ['Ich mache eine Party.', '파티를 해요.'], ['Ich möchte dich einladen.', '초대하고 싶어요.'], ['Kommst du auch?', '같이 올 거죠?']] },
    { g: '시간과 장소', items: [['Die Party beginnt um 19 Uhr.', '파티는 저녁 7시에 시작해요.'], ['Wir feiern bei mir zu Hause.', '우리 집에서 해요.'], ['Meine Adresse ist Gartenstraße 12.', '주소는 가르텐슈트라세 12번지예요.'], ['Wir treffen uns im Restaurant „Roma“.', '레스토랑 「로마」에서 만나요.']] },
    { g: '부탁하기', items: [['Bring bitte einen Salat mit!', '샐러드를 하나 가져와 주세요!'], ['Kannst du Getränke mitbringen?', '음료를 좀 가져올 수 있어요?'], ['Du musst nichts mitbringen.', '아무것도 안 가져와도 돼요.']] },
    { g: '묻고 끝맺기', items: [['Kannst du kommen?', '올 수 있어요?'], ['Ich hoffe, du hast Zeit.', '시간이 되면 좋겠어요.'], ['Bitte antworte bis Donnerstag.', '목요일까지 답장해 주세요.'], ['Liebe Grüße', '안부를 전해요']] }
  ],
  uebung: [
    { t: 'fill', q: 'Ich habe ___ Samstag Geburtstag.', a: ['am'], e: '요일 앞에는 am을 써요.' },
    { t: 'fill', q: 'Die Party beginnt ___ 19 Uhr.', a: ['um'], e: '시각 앞에는 um을 써요.' },
    { t: 'mc', q: '「우리 집에서 파티해요.」를 바르게 쓴 문장은?', o: ['Wir feiern in mir.', 'Wir feiern bei mir zu Hause.', 'Wir feiern zu mir.'], a: 1, e: '「우리 집에서」는 bei mir zu Hause예요.' },
    { t: 'fix', q: 'Bitte mitbring einen Kuchen!', a: ['Bitte bring einen Kuchen mit!', 'Bring bitte einen Kuchen mit!'], e: '명령문에서 분리동사의 접두어 mit은 문장 끝으로 가요.' },
    { t: 'mc', q: 'Kannst du Getränke ___?', o: ['mitbringen', 'bringen mit', 'mitbringst'], a: 0, e: '화법조동사 kannst와 함께 쓰면 분리동사는 원형 그대로 문장 끝에 와요.' },
    { t: 'fill', q: 'Du ___ nichts mitbringen. (müssen)', a: ['musst'], e: 'du와 함께 쓰는 müssen은 musst예요.' }
  ],
  aufgabe: {
    lead: 'Sie haben am Samstag Geburtstag und machen eine Party. Schreiben Sie Ihrem Freund Tim eine Einladung.',
    punkte: ['Wann und wo ist die Party?', 'Was soll Tim mitbringen?', 'Fragen Sie: Kann Tim kommen?'],
    close: 'Schreiben Sie 25–45 Wörter. Schreiben Sie zu allen drei Punkten.',
    ko: {
      lead: '토요일이 생일이라 파티를 해요. 친구 팀에게 초대 메시지를 쓰세요.',
      punkte: ['파티는 언제, 어디서 하나요?', '팀은 무엇을 가져와야 하나요?', '팀이 올 수 있는지 물어보세요.'],
      close: '25–45단어로 쓰세요. 세 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['Lieber Tim, 또는 Hallo Tim,으로 시작했어요.', '요일(am)과 시각(um)을 썼어요.', '장소를 썼어요.', '가져올 것을 부탁했어요.', '올 수 있는지 물었어요.', '끝인사와 내 이름을 썼어요.'],
  muster: {
    de: [
      'Lieber Tim,',
      'ich habe am Samstag Geburtstag und mache eine Party. Wir feiern bei mir zu Hause, in der Gartenstraße 12. Die Party beginnt um 19 Uhr. Bring bitte einen Salat mit! Kannst du kommen? Bitte antworte bis Donnerstag.',
      'Liebe Grüße\nYuna'
    ],
    ko: [
      '팀에게,',
      '토요일이 제 생일이라 파티를 해요. 우리 집에서 해요. 주소는 가르텐슈트라세 12번지예요. 파티는 저녁 7시에 시작해요. 샐러드를 하나 가져와 주세요! 올 수 있어요? 목요일까지 답장해 주세요.',
      '안부를 전하며,\n유나'
    ],
    notes: [
      { de: 'ich habe am Samstag Geburtstag und mache eine Party.', ko: '부르는 말 다음 줄이라 소문자로 시작해요. und로 두 동사를 이었어요.' },
      { de: 'Wir feiern bei mir zu Hause, in der Gartenstraße 12.', ko: '「우리 집에서」는 bei mir zu Hause예요. 주소를 덧붙여 장소를 정확히 알렸어요.' },
      { de: 'Bring bitte einen Salat mit!', ko: 'mitbringen의 mit이 문장 끝에 왔어요. Salat는 남성 4격이라 einen이에요.' },
      { de: 'Bitte antworte bis Donnerstag.', ko: '「bis + 요일」로 답장 기한을 알려요.' }
    ]
  }
},
{
  id: 'a1-05', level: 'A1', no: 5,
  title: 'Ein Hotelzimmer reservieren', titleKo: '호텔 방 예약 메일 쓰기',
  type: 'Formelle E-Mail', typeKo: '격식 이메일',
  exam: 'Goethe-Zertifikat A1 쓰기 Teil 2와 같은 유형',
  time: 10, words: [25, 45],
  intro: '호텔에 방을 예약하는 짧은 격식 이메일을 써요. 언제부터 언제까지, 몇 명이, 어떤 방을 원하는지 정확히 쓰고 가격을 물어요.',
  goals: ['Ich möchte … reservieren으로 예약해요', 'vom … bis zum …으로 기간을 말해요', 'Einzelzimmer, Doppelzimmer, pro Nacht 같은 예약 낱말을 써요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Sehr geehrte Damen und Herren,' },
    { de: 'Reservierung', ko: '예약', ex: 'ich möchte ein Doppelzimmer reservieren.' },
    { de: 'Zeitraum', ko: '기간', ex: 'Wir bleiben vom 3. bis zum 5. August.' },
    { de: 'Frage', ko: '질문', ex: 'Was kostet das Zimmer pro Nacht?' },
    { de: 'Bitte um Antwort', ko: '답장 부탁', ex: 'Bitte antworten Sie mir per E-Mail.' },
    { de: 'Gruß und Name', ko: '끝인사와 이름(성까지)', ex: 'Mit freundlichen Grüßen / Minho Lee' }
  ],
  tipps: [
    '날짜 기간은 vom 3. bis zum 5. August처럼 써요. 숫자 뒤의 점은 「~번째」라는 뜻이에요.',
    '한 사람이 쓰는 방은 Einzelzimmer, 두 사람이 쓰는 방은 Doppelzimmer예요.',
    '1박은 eine Nacht, 2박은 zwei Nächte예요. 「1박에」는 pro Nacht라고 해요.',
    '예약 메일에는 이름과 성을 모두 쓰고, 끝인사는 Mit freundlichen Grüßen으로 해요.'
  ],
  fehler: [
    { f: 'Ich möchte reservieren ein Zimmer.', r: 'Ich möchte ein Zimmer reservieren.', e: 'möchte와 함께 쓰는 원형은 문장 끝에 와요.' },
    { f: 'Wir bleiben von 3. bis zum 5. August.', r: 'Wir bleiben vom 3. bis zum 5. August.', e: '날짜 앞에서는 von이 아니라 vom(von + dem)을 써요.' },
    { f: 'Was kostet das Zimmer für ein Nacht?', r: 'Was kostet das Zimmer für eine Nacht?', e: 'Nacht는 여성이라 eine Nacht예요.' },
    { f: 'Hallo Hotel,', r: 'Sehr geehrte Damen und Herren,', e: '호텔처럼 모르는 사람에게 쓰는 메일은 격식 있는 부르는 말로 시작해요.' }
  ],
  redemittel: [
    { g: '예약하기', items: [['Ich möchte ein Einzelzimmer reservieren.', '1인실을 예약하고 싶어요.'], ['Ich brauche ein Doppelzimmer für zwei Nächte.', '2인실이 2박 필요해요.'], ['Haben Sie noch ein Zimmer frei?', '빈 방이 아직 있나요?']] },
    { g: '기간 말하기', items: [['Ich komme am 3. August.', '8월 3일에 가요.'], ['Wir bleiben vom 3. bis zum 5. August.', '8월 3일부터 5일까지 머물러요.'], ['Wir sind zwei Personen.', '저희는 두 명이에요.']] },
    { g: '묻기', items: [['Was kostet das Zimmer pro Nacht?', '방은 1박에 얼마인가요?'], ['Ist das Frühstück inklusive?', '조식이 포함되어 있나요?'], ['Gibt es einen Parkplatz?', '주차장이 있나요?']] },
    { g: '부탁과 끝인사', items: [['Bitte antworten Sie mir per E-Mail.', '이메일로 답장해 주세요.'], ['Vielen Dank im Voraus!', '미리 감사드려요!'], ['Mit freundlichen Grüßen', '안녕히 계세요 (격식 있는 끝인사)']] }
  ],
  uebung: [
    { t: 'mc', q: '두 사람이 쓰는 방은?', o: ['das Einzelzimmer', 'das Doppelzimmer', 'das Wohnzimmer'], a: 1, e: 'Doppel-은 「둘」이라는 뜻이에요. Wohnzimmer는 거실이에요.' },
    { t: 'fill', q: 'Wir bleiben vom 3. ___ zum 5. August.', a: ['bis'], e: '기간은 vom … bis zum …으로 말해요.' },
    { t: 'fix', q: 'Ich möchte reservieren ein Zimmer.', a: ['Ich möchte ein Zimmer reservieren.'], e: 'möchte가 두 번째 자리, 원형 reservieren은 문장 끝이에요.' },
    { t: 'fill', q: 'Was ___ das Zimmer pro Nacht?', a: ['kostet'], e: 'das Zimmer는 es와 같아서 kosten이 kostet가 돼요.' },
    { t: 'mc', q: '호텔에 보내는 메일의 부르는 말로 알맞은 것은?', o: ['Liebes Hotel,', 'Sehr geehrte Damen und Herren,', 'Hallo zusammen,'], a: 1, e: '이름을 모르는 담당자에게는 Sehr geehrte Damen und Herren,으로 써요.' },
    { t: 'fill', q: 'Ich brauche ein Zimmer für zwei ___. (Nacht)', a: ['Nächte'], e: 'Nacht의 복수는 Nächte예요.' }
  ],
  aufgabe: {
    lead: 'Sie möchten im August drei Tage in Hamburg bleiben. Schreiben Sie eine E-Mail an das Hotel „Alster“.',
    punkte: ['Sie brauchen ein Zimmer: Für wie viele Personen?', 'Wann kommen Sie und wie lange bleiben Sie?', 'Fragen Sie nach dem Preis.'],
    close: 'Schreiben Sie 25–45 Wörter. Vergessen Sie die Anrede und den Gruß nicht.',
    ko: {
      lead: '8월에 함부르크에서 사흘 동안 머물고 싶어요. 호텔 „Alster“에 이메일을 쓰세요.',
      punkte: ['방이 필요해요. 몇 명이 쓰나요?', '언제 가서 얼마 동안 머무나요?', '가격을 물어보세요.'],
      close: '25–45단어로 쓰세요. 부르는 말과 끝인사를 잊지 마세요.'
    }
  },
  check: ['Sehr geehrte Damen und Herren,으로 시작했어요.', '어떤 방인지(몇 명인지) 썼어요.', '오는 날과 머무는 기간을 썼어요.', '가격을 물었어요.', '처음부터 끝까지 Sie로 썼어요.', 'Mit freundlichen Grüßen과 이름·성으로 끝냈어요.'],
  muster: {
    de: [
      'Sehr geehrte Damen und Herren,',
      'ich möchte ein Doppelzimmer reservieren. Wir sind zwei Personen und bleiben vom 3. bis zum 5. August. Was kostet das Zimmer pro Nacht? Ist das Frühstück inklusive? Bitte antworten Sie mir per E-Mail.',
      'Mit freundlichen Grüßen\nMinho Lee'
    ],
    ko: [
      '담당자님께,',
      '2인실을 예약하고 싶어요. 저희는 두 명이고 8월 3일부터 5일까지 머물러요. 방은 1박에 얼마인가요? 조식이 포함되어 있나요? 이메일로 답장해 주세요.',
      '안녕히 계세요.\n이민호 드림'
    ],
    notes: [
      { de: 'ich möchte ein Doppelzimmer reservieren.', ko: 'möchte가 두 번째 자리, 원형 reservieren이 문장 끝이에요.' },
      { de: 'vom 3. bis zum 5. August', ko: '날짜 기간을 말하는 표현이에요. 읽을 때는 vom dritten bis zum fünften August라고 해요.' },
      { de: 'Was kostet das Zimmer pro Nacht?', ko: 'pro Nacht는 「1박에」라는 뜻이에요. für eine Nacht라고 해도 돼요.' },
      { de: 'Ist das Frühstück inklusive?', ko: 'Ja/Nein 질문이라 동사가 맨 앞에 와요.' }
    ]
  }
},

{
  id: 'a1-06', level: 'A1', no: 6,
  title: 'Einen Arzttermin absagen', titleKo: '병원 예약 취소하고 다시 잡기',
  type: 'Formelle E-Mail', typeKo: '격식 이메일',
  exam: 'Goethe-Zertifikat A1 쓰기 Teil 2와 같은 유형',
  time: 10, words: [25, 45],
  intro: '병원에 예약한 시간에 갈 수 없다고 알리고 새 예약을 부탁하는 짧은 격식 이메일을 써요. 요일과 시각을 정확하게 쓰는 연습을 해요.',
  goals: ['요일에는 am, 시각에는 um을 써요', '갈 수 없다고 알리고 이유를 한 문장으로 말해요', 'Haben Sie …?로 새 예약을 정중하게 물어요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Sehr geehrte Damen und Herren,' },
    { de: 'Termin', ko: '내 예약', ex: 'ich habe am Dienstag um 10 Uhr einen Termin bei Dr. Weber.' },
    { de: 'Absage und Grund', ko: '취소와 이유', ex: 'Leider kann ich nicht kommen. Ich muss arbeiten.' },
    { de: 'Bitte um einen neuen Termin', ko: '새 예약 부탁', ex: 'Haben Sie am Donnerstag einen Termin frei?' },
    { de: 'Gruß und Name', ko: '끝인사와 이름', ex: 'Mit freundlichen Grüßen / Sora Kim' }
  ],
  tipps: [
    '먼저 내 예약이 언제인지 써요. 병원은 그 정보로 내 예약을 찾아요.',
    '요일 앞에는 am, 시각 앞에는 um이에요. am Dienstag um 10 Uhr',
    '병원이나 기관에는 Sie로 써요. Sie와 Ihnen은 언제나 대문자로 시작해요.',
    '이름을 모르는 사람에게는 Sehr geehrte Damen und Herren,으로 시작해요.'
  ],
  fehler: [
    { f: 'Ich habe im Dienstag einen Termin.', r: 'Ich habe am Dienstag einen Termin.', e: '요일 앞에는 am을 써요.' },
    { f: 'Ich habe am 10 Uhr einen Termin.', r: 'Ich habe um 10 Uhr einen Termin.', e: '시각 앞에는 um을 써요.' },
    { f: 'Ich habe ein Termin.', r: 'Ich habe einen Termin.', e: 'der Termin은 남성 명사예요. haben 뒤에서는 4격 einen이 돼요.' },
    { f: 'Hast du am Donnerstag einen Termin frei?', r: 'Haben Sie am Donnerstag einen Termin frei?', e: '병원에는 du가 아니라 Sie로 물어요.' }
  ],
  redemittel: [
    { g: '내 예약 말하기', items: [['Ich habe am Dienstag um 10 Uhr einen Termin.', '화요일 10시에 예약이 있어요.'], ['Ich habe einen Termin bei Dr. Weber.', '베버 선생님께 예약이 있어요.'], ['Mein Name ist Sora Kim.', '제 이름은 김소라예요.']] },
    { g: '취소하기', items: [['Leider kann ich nicht kommen.', '아쉽지만 갈 수 없어요.'], ['Ich kann am Dienstag leider nicht kommen.', '화요일에는 아쉽지만 갈 수 없어요.'], ['Ich muss den Termin absagen.', '예약을 취소해야 해요.']] },
    { g: '이유 말하기', items: [['Ich muss arbeiten.', '일해야 해요.'], ['Ich habe einen Deutschkurs.', '독일어 수업이 있어요.'], ['Mein Kind ist krank.', '아이가 아파요.']] },
    { g: '새 예약 부탁하기', items: [['Haben Sie am Donnerstag einen Termin frei?', '목요일에 빈 예약 시간이 있나요?'], ['Kann ich am Freitag kommen?', '금요일에 가도 될까요?'], ['Ich habe am Nachmittag Zeit.', '오후에 시간이 있어요.']] },
    { g: '끝인사', items: [['Vielen Dank!', '감사합니다!'], ['Mit freundlichen Grüßen', '안녕히 계세요 (격식 있는 끝인사)']] }
  ],
  uebung: [
    { t: 'fill', q: 'Ich habe ___ Dienstag einen Termin.', a: ['am'], e: '요일 앞에는 am을 써요.' },
    { t: 'fill', q: 'Der Termin ist ___ 10 Uhr.', a: ['um'], e: '시각 앞에는 um을 써요.' },
    { t: 'mc', q: '알맞은 것은? Ich habe ___ Termin bei Dr. Weber.', o: ['ein', 'einen', 'eine'], a: 1, e: 'der Termin은 남성 명사라서 4격은 einen이에요.' },
    { t: 'mc', q: '병원에 새 예약을 물을 때 알맞은 문장은?', o: ['Hast du am Donnerstag Zeit?', 'Haben Sie am Donnerstag einen Termin frei?', 'Ich will einen Termin!'], a: 1, e: '병원에는 Sie로 정중하게 물어요.' },
    { t: 'fix', q: 'Leider ich kann nicht kommen.', a: ['Leider kann ich nicht kommen.'], e: 'Leider가 첫 자리에 오면 동사 kann이 두 번째 자리에 와요.' },
    { t: 'mc', q: '병원에 보내는 이메일의 끝인사로 알맞은 것은?', o: ['Tschüs!', 'Liebe Grüße', 'Mit freundlichen Grüßen'], a: 2, e: '기관에 쓰는 글은 Mit freundlichen Grüßen으로 끝내요.' }
  ],
  aufgabe: {
    lead: 'Sie haben am Dienstag um 10 Uhr einen Termin bei Dr. Weber. Sie können nicht kommen. Schreiben Sie eine E-Mail an die Arztpraxis.',
    punkte: ['Warum schreiben Sie?', 'Warum können Sie nicht kommen?', 'Bitten Sie um einen neuen Termin.'],
    close: 'Schreiben Sie 25–45 Wörter. Schreiben Sie zu allen drei Punkten.',
    ko: {
      lead: '화요일 10시에 베버 선생님께 예약이 있어요. 그런데 갈 수 없어요. 병원에 이메일을 쓰세요.',
      punkte: ['왜 메일을 쓰나요?', '왜 갈 수 없나요?', '새 예약을 부탁하세요.'],
      close: '25–45단어로 쓰세요. 세 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['Sehr geehrte Damen und Herren,으로 시작했어요.', '내 예약의 요일과 시각을 썼어요.', '갈 수 없는 이유를 썼어요.', '새 예약을 물었어요.', '처음부터 끝까지 Sie로 썼어요.', 'Mit freundlichen Grüßen과 내 이름으로 끝냈어요.'],
  muster: {
    de: [
      'Sehr geehrte Damen und Herren,',
      'ich habe am Dienstag um 10 Uhr einen Termin bei Dr. Weber. Leider kann ich nicht kommen. Ich muss am Dienstag arbeiten. Haben Sie am Donnerstag einen Termin frei? Vielen Dank!',
      'Mit freundlichen Grüßen\nSora Kim'
    ],
    ko: [
      '담당자님께,',
      '화요일 10시에 베버 선생님께 예약이 있어요. 아쉽지만 갈 수 없어요. 화요일에 일해야 해요. 목요일에 빈 예약 시간이 있나요? 감사합니다!',
      '안녕히 계세요.\n김소라'
    ],
    notes: [
      { de: 'am Dienstag um 10 Uhr', ko: '요일은 am, 시각은 um이에요. 요일을 먼저, 시각을 나중에 써요.' },
      { de: 'einen Termin bei Dr. Weber', ko: '사람에게 가는 예약은 bei + 사람으로 말해요.' },
      { de: 'Leider kann ich nicht kommen.', ko: 'Leider가 첫 자리라 동사 kann이 두 번째, 원형 kommen은 맨 끝이에요.' },
      { de: 'Haben Sie am Donnerstag einen Termin frei?', ko: '질문이라 동사 Haben이 맨 앞에 와요. 새 날짜를 직접 제안하면 답을 빨리 받을 수 있어요.' }
    ]
  }
},
{
  id: 'a1-07', level: 'A1', no: 7,
  title: 'Eine Postkarte aus dem Urlaub', titleKo: '휴가지에서 엽서 쓰기',
  type: 'Postkarte', typeKo: '엽서',
  exam: '휴가지에서 친구에게 보내는 엽서 · Goethe-Zertifikat A1 쓰기 Teil 2와 비슷한 분량',
  time: 10, words: [30, 50],
  intro: '휴가지에서 친구에게 엽서를 써요. 어디에 있는지, 날씨가 어떤지, 무엇을 하는지를 짧은 문장으로 전해요.',
  goals: ['Viele Grüße aus …로 엽서를 시작해요', '날씨를 Das Wetter ist …, Es regnet. 같은 문장으로 말해요', '시간 표현을 문장 앞에 두고 동사를 두 번째 자리에 써요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Lieber Paul,' },
    { de: 'Gruß aus dem Urlaub', ko: '휴가지 인사', ex: 'viele Grüße aus Hamburg!' },
    { de: 'Wetter', ko: '날씨', ex: 'Das Wetter ist schön, die Sonne scheint.' },
    { de: 'Aktivitäten', ko: '하는 일', ex: 'Ich gehe viel spazieren und esse jeden Tag Fisch.' },
    { de: 'Rückkehr', ko: '돌아가는 날', ex: 'Am Sonntag komme ich zurück.' },
    { de: 'Gruß und Name', ko: '끝인사와 이름', ex: 'Bis bald! / Deine Yuna' }
  ],
  tipps: [
    '도시와 나라 이름 앞에는 aus(~에서 보내는)와 in(~에 있는)을 써요. Grüße aus Hamburg / Ich bin in Hamburg.',
    '엽서는 짧아요. 한 문장에 한 가지 내용만 쓰세요.',
    'Morgen, Am Sonntag 같은 시간 표현으로 문장을 시작하면 동사가 바로 뒤에 와요. Morgen fahre ich …',
    '끝에는 Dein(남자가 쓸 때) 또는 Deine(여자가 쓸 때)와 이름을 써요.'
  ],
  fehler: [
    { f: 'Viele Grüße von Hamburg!', r: 'Viele Grüße aus Hamburg!', e: '도시에서 보내는 인사는 aus를 써요.' },
    { f: 'Das Wetter ist schon.', r: 'Das Wetter ist schön.', e: 'schon은 「이미」, schön은 「좋은, 아름다운」이에요. 움라우트를 꼭 써요.' },
    { f: 'Morgen ich fahre mit dem Schiff.', r: 'Morgen fahre ich mit dem Schiff.', e: 'Morgen이 첫 자리에 오면 동사 fahre가 두 번째 자리에 와요.' },
    { f: 'Ich bin in Hamburg seit Montag.', r: 'Ich bin seit Montag in Hamburg.', e: '시간(seit Montag)을 장소(in Hamburg)보다 먼저 써요.' }
  ],
  redemittel: [
    { g: '휴가지에서 인사하기', items: [['Viele Grüße aus Hamburg!', '함부르크에서 인사를 보내요!'], ['Ich bin seit Montag hier.', '월요일부터 여기 있어요.'], ['Ich bin mit meiner Familie in Wien.', '가족과 함께 빈에 있어요.']] },
    { g: '날씨 말하기', items: [['Das Wetter ist schön.', '날씨가 좋아요.'], ['Die Sonne scheint.', '해가 나요.'], ['Es regnet leider.', '아쉽게도 비가 와요.'], ['Es ist kalt, aber schön.', '춥지만 좋아요.']] },
    { g: '하는 일 말하기', items: [['Ich gehe viel spazieren.', '산책을 많이 해요.'], ['Ich esse jeden Tag Fisch.', '매일 생선을 먹어요.'], ['Ich besuche viele Museen.', '박물관에 많이 가요.'], ['Morgen fahre ich mit dem Schiff.', '내일은 배를 타요.']] },
    { g: '돌아가는 날 말하기', items: [['Am Sonntag komme ich zurück.', '일요일에 돌아가요.'], ['Ich bleibe noch drei Tage.', '사흘 더 있어요.']] },
    { g: '끝인사', items: [['Bis bald!', '곧 만나요!'], ['Dein Minsu', '민수가 (남자가 쓸 때)'], ['Deine Yuna', '유나가 (여자가 쓸 때)']] }
  ],
  uebung: [
    { t: 'fill', q: 'Viele Grüße ___ Hamburg!', a: ['aus'], e: '도시에서 보내는 인사는 aus를 써요.' },
    { t: 'mc', q: '어순이 바른 문장은?', o: ['Morgen ich fahre mit dem Schiff.', 'Morgen fahre ich mit dem Schiff.', 'Morgen fahre mit dem Schiff ich.'], a: 1, e: '시간 표현이 첫 자리에 오면 동사가 두 번째, 주어가 그 뒤에 와요.' },
    { t: 'fill', q: 'Die Sonne ___. (scheinen)', a: ['scheint'], e: 'die Sonne는 3인칭 단수라서 동사에 -t가 붙어요.' },
    { t: 'mc', q: '여자인 Yuna가 엽서 끝에 쓰는 말은?', o: ['Dein Yuna', 'Deine Yuna', 'Deiner Yuna'], a: 1, e: '쓰는 사람이 여자이면 Deine, 남자이면 Dein을 써요.' },
    { t: 'fix', q: 'Am Sonntag ich komme zurück.', a: ['Am Sonntag komme ich zurück.'], e: 'Am Sonntag이 첫 자리라 동사 komme가 두 번째 자리에 와요. zurück은 문장 끝이에요.' },
    { t: 'fill', q: 'Ich ___ jeden Tag Fisch. (essen)', a: ['esse'], e: 'ich와 함께 쓰는 essen은 esse예요.' }
  ],
  aufgabe: {
    lead: 'Sie machen Urlaub in Hamburg. Schreiben Sie eine Postkarte an Ihren Freund Paul.',
    punkte: ['Wie ist das Wetter?', 'Was machen Sie in Hamburg?', 'Wann kommen Sie zurück?'],
    close: 'Schreiben Sie 30–50 Wörter. Schreiben Sie zu allen drei Punkten.',
    ko: {
      lead: '함부르크에서 휴가를 보내고 있어요. 친구 파울에게 엽서를 쓰세요.',
      punkte: ['날씨가 어떤가요?', '함부르크에서 무엇을 하나요?', '언제 돌아가나요?'],
      close: '30–50단어로 쓰세요. 세 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['Lieber Paul, 또는 Hallo Paul,로 시작했어요.', '날씨를 썼어요.', '하는 일을 두 가지 이상 썼어요.', '돌아가는 날을 썼어요.', '시간 표현 뒤에 동사를 바로 썼어요.', '끝인사와 내 이름을 썼어요.'],
  muster: {
    de: [
      'Lieber Paul,',
      'viele Grüße aus Hamburg! Ich bin seit Montag hier. Das Wetter ist schön, die Sonne scheint. Ich gehe viel spazieren und esse jeden Tag Fisch. Morgen fahre ich mit dem Schiff. Am Sonntag komme ich zurück.',
      'Bis bald!\nDeine Yuna'
    ],
    ko: [
      '파울에게,',
      '함부르크에서 인사를 보내요! 월요일부터 여기 있어요. 날씨가 좋고 해가 나요. 산책을 많이 하고 매일 생선을 먹어요. 내일은 배를 타요. 일요일에 돌아가요.',
      '곧 만나요!\n유나가'
    ],
    notes: [
      { de: 'viele Grüße aus Hamburg!', ko: '부르는 말 다음 줄이라 소문자로 시작해요. 엽서에서 가장 많이 쓰는 첫 문장이에요.' },
      { de: 'Ich bin seit Montag hier.', ko: 'seit + 시점은 「~부터 지금까지」예요. 현재형과 함께 써요.' },
      { de: 'Ich gehe viel spazieren und esse jeden Tag Fisch.', ko: '주어가 같으면 und 뒤에서 ich를 다시 쓰지 않아도 돼요.' },
      { de: 'Am Sonntag komme ich zurück.', ko: 'zurückkommen은 분리동사예요. zurück이 문장 끝으로 가요.' }
    ]
  }
},
{
  id: 'a1-08', level: 'A1', no: 8,
  title: 'Wann kommst du an?', titleKo: '놀러 오는 친구에게 메시지 쓰기',
  type: 'Kurznachricht', typeKo: '짧은 메시지',
  exam: 'Goethe-Zertifikat A1 쓰기 Teil 2와 같은 유형',
  time: 10, words: [30, 50],
  intro: '주말에 나를 찾아오는 친구에게 메시지를 써요. 도착 시간을 묻고, 어디에서 만나는지와 함께 무엇을 할지 알려요.',
  goals: ['ankommen, abholen 같은 분리동사를 바르게 써요', 'W-질문과 Ja/Nein 질문을 구별해 써요', 'können wir …로 함께 할 일을 제안해요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Hallo Jan,' },
    { de: 'Freude', ko: '기쁜 마음', ex: 'ich freue mich sehr auf deinen Besuch!' },
    { de: 'Frage nach der Ankunft', ko: '도착 시간 묻기', ex: 'Wann kommst du am Samstag an?' },
    { de: 'Treffpunkt', ko: '만나는 곳', ex: 'Ich hole dich am Bahnhof ab.' },
    { de: 'Programm', ko: '함께 할 일', ex: 'Am Nachmittag können wir in die Stadt gehen.' },
    { de: 'Gruß und Name', ko: '끝인사와 이름', ex: 'Bis Samstag! / Jiho' }
  ],
  tipps: [
    '분리동사는 앞부분이 문장 끝으로 가요. ankommen → Wann kommst du an? / abholen → Ich hole dich ab.',
    'W-질문은 의문사 다음에 동사, Ja/Nein 질문은 동사로 시작해요. Wann kommst du? / Isst du gern scharf?',
    '어디에서 만나는지는 am Bahnhof, am Flughafen, vor dem Kino처럼 써요.',
    '끝인사에 만나는 날을 넣으면 자연스러워요. Bis Samstag!'
  ],
  fehler: [
    { f: 'Wann ankommst du?', r: 'Wann kommst du an?', e: 'ankommen은 분리동사예요. an이 문장 끝으로 가요.' },
    { f: 'Ich abhole dich am Bahnhof.', r: 'Ich hole dich am Bahnhof ab.', e: 'abholen도 분리동사예요. ab이 문장 끝으로 가요.' },
    { f: 'Ich hole du ab.', r: 'Ich hole dich ab.', e: 'abholen의 목적어는 4격이에요. du의 4격은 dich예요.' },
    { f: 'Wir können gehen in die Stadt.', r: 'Wir können in die Stadt gehen.', e: 'können과 함께 쓰는 원형 gehen은 문장 맨 끝에 와요.' }
  ],
  redemittel: [
    { g: '기쁜 마음 말하기', items: [['Ich freue mich sehr auf deinen Besuch!', '와 준다니 정말 기대돼요!'], ['Schön, dass du kommst!', '온다니 좋아요!'], ['Ich freue mich auf Samstag.', '토요일이 기대돼요.']] },
    { g: '도착 묻기', items: [['Wann kommst du an?', '언제 도착해요?'], ['Um wie viel Uhr kommst du an?', '몇 시에 도착해요?'], ['Kommst du mit dem Zug oder mit dem Bus?', '기차로 와요, 버스로 와요?']] },
    { g: '만나는 곳 말하기', items: [['Ich hole dich am Bahnhof ab.', '역으로 데리러 갈게요.'], ['Wir treffen uns am Flughafen.', '공항에서 만나요.'], ['Ich warte vor dem Bahnhof.', '역 앞에서 기다릴게요.']] },
    { g: '함께 할 일 말하기', items: [['Am Nachmittag können wir in die Stadt gehen.', '오후에 시내에 갈 수 있어요.'], ['Am Abend koche ich koreanisch.', '저녁에는 제가 한국 음식을 해요.'], ['Am Sonntag können wir ins Museum gehen.', '일요일에는 박물관에 갈 수 있어요.'], ['Isst du gern scharf?', '매운 음식 좋아해요?']] },
    { g: '끝인사', items: [['Bis Samstag!', '토요일에 만나요!'], ['Bis bald!', '곧 만나요!'], ['Viele Grüße', '안부를 전해요']] }
  ],
  uebung: [
    { t: 'fix', q: 'Wann ankommst du am Samstag?', a: ['Wann kommst du am Samstag an?'], e: '분리동사 ankommen의 an은 문장 끝으로 가요.' },
    { t: 'fill', q: 'Ich hole ___ am Bahnhof ab. (du)', a: ['dich'], e: 'du의 4격은 dich예요.' },
    { t: 'mc', q: '어순이 바른 문장은?', o: ['Wir können in die Stadt gehen.', 'Wir können gehen in die Stadt.', 'Wir in die Stadt gehen können.'], a: 0, e: '화법조동사가 두 번째 자리, 원형은 맨 끝이에요.' },
    { t: 'mc', q: 'Ja/Nein 질문으로 바른 것은?', o: ['Du isst gern scharf?', 'Isst du gern scharf?', 'Gern isst du scharf?'], a: 1, e: 'Ja/Nein 질문은 동사로 시작해요.' },
    { t: 'fill', q: 'Ich freue mich ___ deinen Besuch.', a: ['auf'], e: '앞으로 올 일을 기대할 때는 sich freuen auf + 4격을 써요.' },
    { t: 'fill', q: 'Am Abend ___ ich koreanisch. (kochen)', a: ['koche'], e: 'Am Abend이 첫 자리라 동사 koche가 두 번째 자리에 와요.' }
  ],
  aufgabe: {
    lead: 'Ihr Freund Jan besucht Sie am Wochenende. Schreiben Sie Jan eine Nachricht.',
    punkte: ['Fragen Sie: Wann kommt er an?', 'Wo treffen Sie Jan?', 'Was möchten Sie zusammen machen?'],
    close: 'Schreiben Sie 30–50 Wörter. Schreiben Sie zu allen drei Punkten.',
    ko: {
      lead: '친구 얀이 주말에 찾아와요. 얀에게 메시지를 쓰세요.',
      punkte: ['언제 도착하는지 물어보세요.', '얀을 어디에서 만나나요?', '함께 무엇을 하고 싶나요?'],
      close: '30–50단어로 쓰세요. 세 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['Hallo Jan, 또는 Lieber Jan,으로 시작했어요.', '도착 시간을 질문으로 물었어요.', '만나는 곳을 썼어요.', '함께 할 일을 한 가지 이상 썼어요.', '분리동사의 앞부분을 문장 끝에 썼어요.', '끝인사와 내 이름을 썼어요.'],
  muster: {
    de: [
      'Hallo Jan,',
      'ich freue mich sehr auf deinen Besuch! Wann kommst du am Samstag an? Ich hole dich am Bahnhof ab. Am Nachmittag können wir in die Stadt gehen. Am Abend koche ich koreanisch. Isst du gern scharf?',
      'Bis Samstag!\nJiho'
    ],
    ko: [
      '얀, 안녕하세요.',
      '와 준다니 정말 기대돼요! 토요일에 언제 도착해요? 역으로 데리러 갈게요. 오후에는 시내에 갈 수 있어요. 저녁에는 제가 한국 음식을 해요. 매운 음식 좋아해요?',
      '토요일에 만나요!\n지호'
    ],
    notes: [
      { de: 'ich freue mich sehr auf deinen Besuch!', ko: 'sich freuen auf + 4격이에요. der Besuch가 남성이라 deinen이 돼요.' },
      { de: 'Wann kommst du am Samstag an?', ko: '분리동사 ankommen의 an이 문장 맨 끝에 있어요.' },
      { de: 'Ich hole dich am Bahnhof ab.', ko: 'abholen도 분리동사예요. 목적어 dich는 4격이에요.' },
      { de: 'Am Nachmittag können wir in die Stadt gehen.', ko: '시간 표현이 첫 자리, können이 두 번째, 원형 gehen이 맨 끝이에요.' }
    ]
  }
},
{
  id: 'a1-09', level: 'A1', no: 9,
  title: 'Mein Tag', titleKo: '나의 하루 쓰기',
  type: 'Tagesablauf', typeKo: '하루 일과',
  exam: '수업에서 쓰는 하루 일과 글 · Goethe-Zertifikat A1 쓰기 Teil 2보다 조금 긴 분량',
  time: 15, words: [35, 55],
  intro: '아침부터 밤까지 나의 하루를 순서대로 써요. 시각과 하루의 때를 나타내는 말, 그리고 분리동사를 익혀요.',
  goals: ['um sieben Uhr, am Nachmittag처럼 시각과 때를 말해요', 'aufstehen, einkaufen, fernsehen 같은 분리동사를 바르게 써요', 'Dann, Danach로 문장을 순서대로 이어요'],
  aufbau: [
    { de: 'Titel', ko: '제목', ex: 'Mein Tag' },
    { de: 'Morgen', ko: '아침', ex: 'Ich stehe um sieben Uhr auf.' },
    { de: 'Vormittag', ko: '오전', ex: 'Der Kurs beginnt um neun Uhr.' },
    { de: 'Nachmittag', ko: '오후', ex: 'Am Nachmittag kaufe ich ein oder lerne zu Hause.' },
    { de: 'Abend', ko: '저녁', ex: 'Am Abend koche ich und sehe fern.' },
    { de: 'Nacht', ko: '밤', ex: 'Um elf Uhr gehe ich ins Bett.' }
  ],
  tipps: [
    '모든 문장을 Ich로 시작하지 마세요. Dann, Am Abend, Um elf Uhr로 시작하면 글이 자연스러워요.',
    '시각은 um, 하루의 때는 am이에요. um sieben Uhr / am Morgen, am Nachmittag, am Abend. 밤만 in der Nacht예요.',
    '분리동사는 앞부분을 문장 끝에 써요. Ich stehe um sieben Uhr auf.',
    '「집에서」는 zu Hause, 「집으로」는 nach Hause예요.'
  ],
  fehler: [
    { f: 'Ich aufstehe um sieben Uhr.', r: 'Ich stehe um sieben Uhr auf.', e: 'aufstehen은 분리동사예요. auf가 문장 끝으로 가요.' },
    { f: 'Dann ich frühstücke.', r: 'Dann frühstücke ich.', e: 'Dann이 첫 자리에 오면 동사가 두 번째 자리에 와요.' },
    { f: 'Ich lerne nach Hause.', r: 'Ich lerne zu Hause.', e: '「집에서」는 zu Hause예요. nach Hause는 「집으로」예요.' },
    { f: 'Ich sehe fern am Abend.', r: 'Am Abend sehe ich fern.', e: '분리동사의 앞부분 fern은 문장 맨 끝에 와요.' }
  ],
  redemittel: [
    { g: '아침', items: [['Ich stehe um sieben Uhr auf.', '7시에 일어나요.'], ['Dann frühstücke ich.', '그다음에 아침을 먹어요.'], ['Ich trinke Kaffee und esse Brot.', '커피를 마시고 빵을 먹어요.']] },
    { g: '오전', items: [['Ich fahre mit dem Bus zum Deutschkurs.', '버스를 타고 독일어 수업에 가요.'], ['Der Kurs beginnt um neun Uhr.', '수업은 9시에 시작해요.'], ['Ich arbeite von neun bis fünf Uhr.', '9시부터 5시까지 일해요.']] },
    { g: '오후', items: [['Am Nachmittag kaufe ich ein.', '오후에 장을 봐요.'], ['Ich lerne zu Hause.', '집에서 공부해요.'], ['Danach treffe ich Freunde.', '그 뒤에 친구들을 만나요.']] },
    { g: '저녁과 밤', items: [['Am Abend koche ich.', '저녁에 요리해요.'], ['Ich sehe fern.', '텔레비전을 봐요.'], ['Um elf Uhr gehe ich ins Bett.', '11시에 자러 가요.']] }
  ],
  uebung: [
    { t: 'fix', q: 'Ich aufstehe um sieben Uhr.', a: ['Ich stehe um sieben Uhr auf.'], e: '분리동사 aufstehen의 auf는 문장 끝으로 가요.' },
    { t: 'fill', q: 'Der Kurs beginnt ___ neun Uhr.', a: ['um'], e: '시각 앞에는 um을 써요.' },
    { t: 'fill', q: '___ Nachmittag kaufe ich ein.', a: ['Am'], e: '하루의 때 앞에는 am을 써요. 문장 처음이라 대문자로 써요.' },
    { t: 'mc', q: '「집에서 공부해요」로 알맞은 문장은?', o: ['Ich lerne nach Hause.', 'Ich lerne zu Hause.', 'Ich lerne im Hause.'], a: 1, e: '「집에서」는 zu Hause예요.' },
    { t: 'mc', q: '어순이 바른 문장은?', o: ['Dann ich frühstücke.', 'Dann frühstücke ich.', 'Ich dann frühstücke.'], a: 1, e: 'Dann이 첫 자리, 동사가 두 번째 자리예요.' },
    { t: 'fill', q: 'Am Abend sehe ich ___. (fernsehen)', a: ['fern'], e: 'fernsehen은 분리동사예요. fern이 문장 끝으로 가요.' }
  ],
  aufgabe: {
    lead: 'Ihre Lehrerin möchte wissen: Wie ist Ihr Tag? Schreiben Sie einen kurzen Text für den Deutschkurs.',
    punkte: ['Wann stehen Sie auf?', 'Was machen Sie am Vormittag und am Nachmittag?', 'Was machen Sie am Abend?'],
    close: 'Schreiben Sie 35–55 Wörter. Schreiben Sie zu allen drei Punkten.',
    ko: {
      lead: '선생님이 여러분의 하루가 어떤지 알고 싶어 해요. 독일어 수업에 낼 짧은 글을 쓰세요.',
      punkte: ['언제 일어나나요?', '오전과 오후에 무엇을 하나요?', '저녁에 무엇을 하나요?'],
      close: '35–55단어로 쓰세요. 세 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['일어나는 시각을 썼어요.', '오전과 오후에 하는 일을 썼어요.', '저녁에 하는 일을 썼어요.', '분리동사의 앞부분을 문장 끝에 썼어요.', 'Ich가 아닌 말로 시작하는 문장이 두 개 이상 있어요.', '시각에는 um, 하루의 때에는 am을 썼어요.'],
  muster: {
    de: [
      'Mein Tag',
      'Ich stehe um sieben Uhr auf. Dann frühstücke ich und fahre mit dem Bus zum Deutschkurs. Der Kurs beginnt um neun Uhr. Am Nachmittag kaufe ich ein oder lerne zu Hause. Am Abend koche ich und sehe fern. Um elf Uhr gehe ich ins Bett.'
    ],
    ko: [
      '나의 하루',
      '저는 7시에 일어나요. 그다음에 아침을 먹고 버스를 타고 독일어 수업에 가요. 수업은 9시에 시작해요. 오후에는 장을 보거나 집에서 공부해요. 저녁에는 요리하고 텔레비전을 봐요. 11시에 자러 가요.'
    ],
    notes: [
      { de: 'Ich stehe um sieben Uhr auf.', ko: '분리동사 aufstehen이에요. stehe는 두 번째 자리, auf는 맨 끝이에요.' },
      { de: 'Dann frühstücke ich und fahre mit dem Bus zum Deutschkurs.', ko: 'Dann 뒤에 동사가 바로 와요. frühstücken은 분리동사가 아니에요.' },
      { de: 'Am Nachmittag kaufe ich ein oder lerne zu Hause.', ko: 'einkaufen은 분리동사예요. oder로 두 가지 일을 이었어요.' },
      { de: 'Um elf Uhr gehe ich ins Bett.', ko: 'ins Bett gehen은 「자러 가다」예요. ins = in das.' }
    ]
  }
},
{
  id: 'a1-10', level: 'A1', no: 10,
  title: 'Eine E-Mail an die Touristeninformation', titleKo: '관광 안내소에 정보 부탁하기',
  type: 'Formelle E-Mail', typeKo: '격식 이메일',
  exam: 'Goethe-Zertifikat A1 쓰기 Teil 2와 같은 유형',
  time: 10, words: [25, 45],
  intro: '여행 가려는 도시의 관광 안내소에 이메일을 써서 정보를 부탁해요. A1 시험에 자주 나오는 과제예요. Bitte schicken Sie mir …를 익혀요.',
  goals: ['언제 어디에 가려는지 ich möchte …로 말해요', 'Bitte schicken Sie mir …로 정중하게 부탁해요', 'Informationen über + 4격을 바르게 써요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Sehr geehrte Damen und Herren,' },
    { de: 'Plan', ko: '내 계획', ex: 'ich möchte im Mai Dresden besuchen.' },
    { de: 'Bitte um Informationen', ko: '정보 부탁', ex: 'Bitte schicken Sie mir Informationen über die Museen.' },
    { de: 'Frage nach Hotels', ko: '호텔 묻기', ex: 'Haben Sie Adressen von günstigen Hotels?' },
    { de: 'Dank', ko: '감사', ex: 'Vielen Dank!' },
    { de: 'Gruß und Name', ko: '끝인사와 이름', ex: 'Mit freundlichen Grüßen / Minho Lee' }
  ],
  tipps: [
    '달 이름 앞에는 im을 써요. im Mai, im August',
    'Bitte로 시작하는 부탁은 동사가 바로 뒤에 와요. Bitte schicken Sie mir …',
    'Informationen은 언제나 복수로 써요. Informationen über die Stadt',
    '부탁을 한 뒤에는 Vielen Dank!로 미리 고마움을 말하면 좋아요.'
  ],
  fehler: [
    { f: 'Ich möchte am Mai Dresden besuchen.', r: 'Ich möchte im Mai Dresden besuchen.', e: '달 이름 앞에는 im을 써요.' },
    { f: 'Bitte Sie schicken mir Informationen.', r: 'Bitte schicken Sie mir Informationen.', e: 'Sie에게 하는 부탁은 동사가 Sie 앞에 와요.' },
    { f: 'Bitte schicken Sie mich Informationen.', r: 'Bitte schicken Sie mir Informationen.', e: '「나에게」는 3격 mir예요.' },
    { f: 'Ich möchte besuchen Dresden.', r: 'Ich möchte Dresden besuchen.', e: 'möchte와 함께 쓰는 원형 besuchen은 문장 맨 끝에 와요.' }
  ],
  redemittel: [
    { g: '계획 말하기', items: [['Ich möchte im Mai Dresden besuchen.', '5월에 드레스덴에 가고 싶어요.'], ['Ich komme im August nach Wien.', '8월에 빈에 가요.'], ['Ich bleibe drei Tage.', '사흘 동안 있어요.']] },
    { g: '정보 부탁하기', items: [['Bitte schicken Sie mir Informationen über die Museen.', '박물관 정보를 보내 주세요.'], ['Was kann man in Dresden sehen?', '드레스덴에서 무엇을 볼 수 있나요?'], ['Haben Sie einen Stadtplan?', '시내 지도가 있나요?'], ['Gibt es im Mai Konzerte?', '5월에 음악회가 있나요?']] },
    { g: '호텔 묻기', items: [['Ich brauche auch ein Hotel.', '호텔도 필요해요.'], ['Haben Sie Adressen von günstigen Hotels?', '싼 호텔 주소가 있나요?'], ['Was kostet ein Zimmer?', '방 하나에 얼마예요?']] },
    { g: '감사와 끝인사', items: [['Vielen Dank!', '감사합니다!'], ['Vielen Dank für Ihre Hilfe.', '도와주셔서 감사합니다.'], ['Mit freundlichen Grüßen', '안녕히 계세요 (격식 있는 끝인사)']] }
  ],
  uebung: [
    { t: 'fill', q: 'Ich möchte ___ Mai Dresden besuchen.', a: ['im'], e: '달 이름 앞에는 im을 써요.' },
    { t: 'fix', q: 'Bitte Sie schicken mir Informationen.', a: ['Bitte schicken Sie mir Informationen.'], e: 'Sie에게 하는 부탁은 동사가 먼저, Sie가 그 뒤에 와요.' },
    { t: 'mc', q: '알맞은 것은? Bitte schicken Sie ___ einen Stadtplan.', o: ['ich', 'mich', 'mir'], a: 2, e: '「나에게 보내다」는 3격 mir를 써요.' },
    { t: 'mc', q: '어순이 바른 문장은?', o: ['Ich möchte besuchen Dresden.', 'Ich möchte Dresden besuchen.', 'Ich Dresden möchte besuchen.'], a: 1, e: 'möchte가 두 번째 자리, 원형 besuchen이 맨 끝이에요.' },
    { t: 'fill', q: 'Was ___ man in Dresden sehen? (können)', a: ['kann'], e: 'man과 함께 쓰는 können은 kann이에요.' },
    { t: 'fill', q: 'Vielen Dank ___ Ihre Hilfe.', a: ['für'], e: '고마운 이유는 danken für, Dank für로 말해요.' }
  ],
  aufgabe: {
    lead: 'Sie möchten im Mai Dresden besuchen. Schreiben Sie eine E-Mail an die Touristeninformation in Dresden.',
    punkte: ['Warum schreiben Sie?', 'Bitten Sie um Informationen über Museen.', 'Fragen Sie nach Hoteladressen.'],
    close: 'Schreiben Sie 25–45 Wörter. Schreiben Sie zu allen drei Punkten.',
    ko: {
      lead: '5월에 드레스덴에 가고 싶어요. 드레스덴 관광 안내소에 이메일을 쓰세요.',
      punkte: ['왜 메일을 쓰나요?', '박물관 정보를 부탁하세요.', '호텔 주소를 물어보세요.'],
      close: '25–45단어로 쓰세요. 세 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['Sehr geehrte Damen und Herren,으로 시작했어요.', '언제 드레스덴에 가는지 썼어요.', '박물관 정보를 부탁했어요.', '호텔 주소를 물었어요.', '처음부터 끝까지 Sie로 썼어요.', 'Mit freundlichen Grüßen과 내 이름으로 끝냈어요.'],
  muster: {
    de: [
      'Sehr geehrte Damen und Herren,',
      'ich möchte im Mai Dresden besuchen. Was kann man in Dresden sehen? Bitte schicken Sie mir Informationen über die Museen. Ich brauche auch ein Hotel. Haben Sie Adressen von günstigen Hotels? Vielen Dank!',
      'Mit freundlichen Grüßen\nMinho Lee'
    ],
    ko: [
      '담당자님께,',
      '5월에 드레스덴에 가고 싶어요. 드레스덴에서 무엇을 볼 수 있나요? 박물관 정보를 보내 주세요. 호텔도 필요해요. 싼 호텔 주소가 있나요? 감사합니다!',
      '안녕히 계세요.\n이민호'
    ],
    notes: [
      { de: 'ich möchte im Mai Dresden besuchen.', ko: '첫 문장이 「왜 쓰나요?」의 답이에요. möchte는 두 번째, besuchen은 맨 끝이에요.' },
      { de: 'Was kann man in Dresden sehen?', ko: 'man은 「사람들, 누구나」예요. 동사는 3인칭 단수로 써요.' },
      { de: 'Bitte schicken Sie mir Informationen über die Museen.', ko: 'Sie에게 하는 부탁이에요. über 뒤는 4격이에요.' },
      { de: 'Haben Sie Adressen von günstigen Hotels?', ko: 'von 뒤는 3격이에요. 복수 3격이라 형용사 어미가 -en이에요.' }
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
    { g: '시작하기', items: [['Lieber Paul,', '파울에게'], ['wie geht es dir?', '잘 지내요?'], ['Ich habe tolle Neuigkeiten!', '좋은 소식이 있어요!']] },
    { g: '지난 일 말하기', items: [['Ich bin letzte Woche umgezogen.', '지난주에 이사했어요.'], ['Wir haben den ganzen Tag Kisten getragen.', '우리는 하루 종일 상자를 날랐어요.'], ['Am Abend haben wir Pizza bestellt.', '저녁에는 피자를 시켰어요.']] },
    { g: '집 설명하기', items: [['Die Wohnung ist hell und ruhig.', '집이 밝고 조용해요.'], ['Sie hat zwei Zimmer und einen Balkon.', '방 두 개에 발코니가 하나 있어요.'], ['Sie liegt direkt am Park.', '공원 바로 옆에 있어요.']] },
    { g: '초대하기', items: [['Hast du am Samstag Zeit?', '토요일에 시간 있어요?'], ['Komm doch um 18 Uhr vorbei!', '6시에 들러요!'], ['Ich koche für uns.', '제가 요리할게요.']] },
    { g: '끝맺기', items: [['Ich freue mich auf deinen Besuch.', '오는 날을 기다릴게요.'], ['Schreib mir bald!', '곧 답장해 주세요!'], ['Viele Grüße', '안부를 전해요']] }
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
      '잘 지내요? 저 지난주에 이사했어요! 새집은 밝고 조용하고 작은 발코니도 있어요. 언니와 친구 두 명이 이사를 도와줬어요.',
      '토요일에 시간 있어요? 그러면 제가 요리할게요. 6시에 들러요!',
      '안부를 전하며,\n하나'
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
{
  id: 'a2-03', level: 'A2', no: 3,
  title: 'Danke für das Geschenk!', titleKo: '선물에 고맙다고 답장하기',
  type: 'Persönliche E-Mail', typeKo: '개인 이메일',
  exam: 'Goethe-Zertifikat A2 쓰기와 같은 유형',
  time: 15, words: [40, 60],
  intro: '생일 선물을 보내 준 친구에게 고맙다는 이메일을 써요. 고마움을 전하고, 선물이 왜 마음에 드는지 weil로 이유를 말하고, 만나자고 제안해요.',
  goals: ['danken, gefallen과 함께 3격(mir, dir)을 써요', 'weil 문장에서 동사를 끝에 둬요', 'Wollen wir …?로 만남을 제안해요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Liebe Sophie,' },
    { de: 'Dank', ko: '고마움', ex: 'vielen Dank für dein Geschenk!' },
    { de: 'Freude und Grund', ko: '마음에 드는 이유', ex: 'Der Schal gefällt mir sehr, weil Blau meine Lieblingsfarbe ist.' },
    { de: 'Bericht', ko: '생일 이야기', ex: 'Meine Feier war schön, aber du hast uns gefehlt.' },
    { de: 'Vorschlag', ko: '만남 제안', ex: 'Wollen wir uns nächste Woche treffen?' },
    { de: 'Gruß', ko: '끝인사', ex: 'Liebe Grüße / Junho' }
  ],
  tipps: [
    'danken, gefallen, schmecken 뒤에는 3격이 와요. Ich danke dir. Der Schal gefällt mir.',
    'gefallen은 선물이 주어예요. 선물이 하나면 Der Schal gefällt mir, 여러 개면 Die Blumen gefallen mir.',
    'weil 뒤에서는 동사가 문장 끝으로 가요. …, weil Blau meine Lieblingsfarbe ist.',
    '고맙다는 말만 쓰면 글이 짧아요. 선물을 어떻게 쓰고 있는지 한 문장을 더하세요. Ich trage ihn jeden Tag.'
  ],
  fehler: [
    { f: 'Ich danke dich für das Geschenk.', r: 'Ich danke dir für das Geschenk.', e: 'danken 뒤에는 3격 dir가 와요.' },
    { f: 'Ich gefalle den Schal.', r: 'Der Schal gefällt mir.', e: 'gefallen은 마음에 드는 물건이 주어이고, 사람은 3격이에요.' },
    { f: 'Danke für dem Buch!', r: 'Danke für das Buch!', e: 'für 뒤에는 4격이 와요.' },
    { f: 'Ich freue mich, weil ich mag Schokolade.', r: 'Ich freue mich, weil ich Schokolade mag.', e: 'weil 문장에서는 동사 mag이 끝으로 가요.' }
  ],
  redemittel: [
    { g: '고마움 전하기', items: [['Vielen Dank für dein Geschenk!', '선물 정말 고마워요!'], ['Ich danke dir für das Paket.', '소포 고마워요.'], ['Ich habe mich sehr über das Buch gefreut.', '책을 받고 정말 기뻤어요.'], ['Das ist sehr lieb von dir.', '마음 써 줘서 고마워요.']] },
    { g: '마음에 든다고 말하기', items: [['Der Schal gefällt mir sehr.', '목도리가 정말 마음에 들어요.'], ['Die Farbe ist wunderschön.', '색이 정말 예뻐요.'], ['Die Schokolade schmeckt mir sehr gut.', '초콜릿이 아주 맛있어요.'], ['Ich trage ihn jeden Tag.', '날마다 하고 다녀요.']] },
    { g: '이유 말하기', items: [['…, weil Blau meine Lieblingsfarbe ist.', '파란색이 제가 가장 좋아하는 색이라서요.'], ['…, weil ich gern lese.', '책 읽기를 좋아해서요.'], ['Das kann ich gut gebrauchen.', '저한테 꼭 필요한 물건이에요.']] },
    { g: '생일 이야기', items: [['Meine Feier war sehr schön.', '생일 파티는 정말 즐거웠어요.'], ['Wir haben zusammen gegessen und gefeiert.', '같이 밥을 먹고 축하했어요.'], ['Schade, dass du nicht da warst.', '오지 못해서 아쉬웠어요.'], ['Du hast uns gefehlt.', '없어서 허전했어요.']] },
    { g: '만남 제안하기', items: [['Wollen wir uns nächste Woche treffen?', '다음 주에 만날까요?'], ['Hast du am Samstag Zeit?', '토요일에 시간 있어요?'], ['Ich lade dich zum Kaffee ein.', '제가 커피 살게요.']] },
    { g: '끝인사', items: [['Liebe Grüße', '안부를 전해요'], ['Bis bald!', '곧 만나요!']] }
  ],
  uebung: [
    { t: 'mc', q: 'Ich danke ___ für das Geschenk.', o: ['dich', 'dir', 'du'], a: 1, e: 'danken 뒤에는 3격이 와요. du의 3격은 dir예요.' },
    { t: 'fill', q: 'Der Schal ___ mir sehr. (gefallen)', a: ['gefällt'], e: '주어 der Schal이 단수라서 gefällt예요. a가 ä로 바뀌어요.' },
    { t: 'fill', q: 'Vielen Dank ___ das Buch!', a: ['für'], e: '고마운 대상은 für + 4격으로 말해요.' },
    { t: 'fix', q: 'Ich freue mich, weil ich mag Schokolade.', a: ['Ich freue mich, weil ich Schokolade mag.'], e: 'weil 문장에서는 동사가 끝에 와요.' },
    { t: 'mc', q: 'Ich habe mich sehr ___ dein Geschenk gefreut.', o: ['auf', 'über', 'für'], a: 1, e: '이미 받은 것에 기뻐할 때는 sich freuen über예요. auf는 앞으로 올 일을 기다릴 때 써요.' },
    { t: 'fill', q: 'Die Blumen ___ mir sehr gut. (gefallen)', a: ['gefallen'], e: '주어 die Blumen이 복수라서 gefallen이에요.' }
  ],
  aufgabe: {
    lead: 'Sie hatten Geburtstag. Ihre Freundin Sophie konnte nicht kommen, aber sie hat Ihnen ein Geschenk geschickt. Schreiben Sie Sophie eine E-Mail.',
    punkte: ['Bedanken Sie sich für das Geschenk.', 'Warum gefällt Ihnen das Geschenk?', 'Schlagen Sie ein Treffen vor.'],
    close: 'Schreiben Sie 40–60 Wörter. Schreiben Sie zu allen drei Punkten.',
    ko: {
      lead: '얼마 전이 생일이었어요. 친구 조피는 오지 못했지만 선물을 보내 줬어요. 조피에게 이메일을 쓰세요.',
      punkte: ['선물에 고맙다고 말하세요.', '선물이 왜 마음에 드나요?', '만나자고 제안하세요.'],
      close: '40–60단어로 쓰세요. 세 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['Liebe Sophie,로 시작했어요.', '선물에 고맙다고 썼어요.', '마음에 드는 이유를 weil로 썼어요.', '만나자고 제안했어요.', 'danken, gefallen 뒤에 3격을 썼어요.', '끝인사와 내 이름을 썼어요.'],
  muster: {
    de: [
      'Liebe Sophie,',
      'vielen Dank für dein Geschenk! Ich habe mich sehr über das Paket gefreut. Der Schal gefällt mir sehr, weil Blau meine Lieblingsfarbe ist. Ich trage ihn jeden Tag.',
      'Meine Feier war schön, aber du hast uns gefehlt. Wollen wir uns nächste Woche treffen? Ich lade dich zum Kaffee ein.',
      'Liebe Grüße\nJunho'
    ],
    ko: [
      '조피에게,',
      '선물 정말 고마워요! 소포를 받고 무척 기뻤어요. 목도리가 정말 마음에 들어요. 파란색이 제가 가장 좋아하는 색이라서요. 날마다 하고 다녀요.',
      '생일 파티는 즐거웠지만 조피가 없어서 허전했어요. 다음 주에 만날까요? 제가 커피 살게요.',
      '안부를 전하며,\n준호'
    ],
    notes: [
      { de: 'vielen Dank für dein Geschenk!', ko: 'für 뒤는 4격이에요. das Geschenk는 중성이라 dein Geschenk예요.' },
      { de: 'Ich habe mich sehr über das Paket gefreut.', ko: 'sich freuen über + 4격은 이미 받은 것에 기뻐할 때 써요.' },
      { de: 'Der Schal gefällt mir sehr, weil Blau meine Lieblingsfarbe ist.', ko: '선물이 주어, 나는 3격 mir예요. weil 문장의 동사 ist는 끝에 왔어요.' },
      { de: 'Ich trage ihn jeden Tag.', ko: 'der Schal을 4격 대명사 ihn으로 받았어요.' },
      { de: 'Wollen wir uns nächste Woche treffen?', ko: 'Wollen wir …?는 「우리 ~할까요?」 하고 제안하는 표현이에요.' }
    ]
  }
},
{
  id: 'a2-04', level: 'A2', no: 4,
  title: 'Ist das Fahrrad noch da?', titleKo: '중고 거래 광고에 문의하기',
  type: 'Anfrage auf eine Anzeige', typeKo: '광고 문의 메일',
  exam: 'Goethe-Zertifikat A2 쓰기와 같은 유형',
  time: 15, words: [40, 60],
  intro: '중고 자전거 광고를 보고 판매자에게 문의하는 이메일을 써요. 모르는 사람에게 쓰는 글이라 Sie로 쓰고, 물건에 대해 묻고 보러 갈 시간을 제안해요.',
  goals: ['모르는 판매자에게 Sie와 Ihr로 써요', 'sich interessieren für로 관심을 말해요', '물건의 상태를 묻는 질문을 만들어요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Sehr geehrter Herr Braun,' },
    { de: 'Grund', ko: '메일을 쓰는 이유', ex: 'ich habe Ihre Anzeige im Internet gelesen und interessiere mich für das Fahrrad.' },
    { de: 'Fragen', ko: '질문', ex: 'Wie alt ist das Fahrrad? Funktioniert das Licht?' },
    { de: 'Termin', ko: '보러 갈 시간', ex: 'Kann ich das Fahrrad am Samstag ansehen?' },
    { de: 'Dank', ko: '감사', ex: 'Vielen Dank für Ihre Antwort!' },
    { de: 'Gruß', ko: '끝인사', ex: 'Mit freundlichen Grüßen / Sena Park' }
  ],
  tipps: [
    '광고를 낸 사람은 모르는 사람이에요. du가 아니라 Sie, dein이 아니라 Ihr로 써요. Ihr, Ihre는 항상 대문자로 시작해요.',
    '이름을 알면 Sehr geehrter Herr Braun, / Sehr geehrte Frau Braun,으로 불러요. 조금 가볍게 Guten Tag, Herr Braun,이라고 써도 돼요.',
    '관심이 있다고 할 때는 sich interessieren für + 4격을 써요. Ich interessiere mich für das Fahrrad.',
    '물건은 성에 맞는 대명사로 받아요. das Fahrrad → es, der Tisch → er, die Lampe → sie.'
  ],
  fehler: [
    { f: 'Ich habe deine Anzeige gelesen.', r: 'Ich habe Ihre Anzeige gelesen.', e: '모르는 사람에게는 Sie를 쓰니까 소유관사도 Ihre예요.' },
    { f: 'Ich interessiere mich an das Fahrrad.', r: 'Ich interessiere mich für das Fahrrad.', e: 'sich interessieren은 für와 함께 써요.' },
    { f: 'Wie alt ist der Fahrrad?', r: 'Wie alt ist das Fahrrad?', e: 'Fahrrad는 중성 명사예요.' },
    { f: 'Kann ich ansehen das Fahrrad am Samstag?', r: 'Kann ich das Fahrrad am Samstag ansehen?', e: 'kann과 함께 쓰는 원형 ansehen은 문장 끝에 와요.' }
  ],
  redemittel: [
    { g: '시작하기', items: [['Ich habe Ihre Anzeige im Internet gelesen.', '인터넷에서 올리신 광고를 읽었어요.'], ['Ich interessiere mich für das Fahrrad.', '자전거에 관심이 있어요.'], ['Ist das Fahrrad noch da?', '자전거가 아직 있나요?'], ['Ist es noch zu haben?', '아직 살 수 있나요?']] },
    { g: '물건에 대해 묻기', items: [['Wie alt ist das Fahrrad?', '자전거는 몇 년 됐나요?'], ['Funktioniert das Licht?', '전조등은 잘 켜지나요?'], ['Ist etwas kaputt?', '고장 난 데가 있나요?'], ['Sind 80 Euro auch möglich?', '80유로에도 될까요?']] },
    { g: '약속 잡기', items: [['Kann ich das Fahrrad am Samstag ansehen?', '토요일에 자전거를 보러 가도 될까요?'], ['Ich habe ab 14 Uhr Zeit.', '오후 2시부터 시간이 돼요.'], ['Wann haben Sie Zeit?', '언제 시간이 되시나요?'], ['Wo kann ich das Fahrrad abholen?', '자전거는 어디에서 받으면 되나요?']] },
    { g: '끝맺기', items: [['Vielen Dank für Ihre Antwort!', '답장 미리 감사드려요!'], ['Ich freue mich auf Ihre Antwort.', '답장 기다릴게요.'], ['Mit freundlichen Grüßen', '안녕히 계세요 (격식 있는 끝인사)']] }
  ],
  uebung: [
    { t: 'mc', q: '모르는 판매자에게 쓰는 문장으로 알맞은 것은?', o: ['Ich habe deine Anzeige gelesen.', 'Ich habe Ihre Anzeige gelesen.', 'Ich habe ihre Anzeige gelesen.'], a: 1, e: '존칭 Sie의 소유관사 Ihre는 대문자로 써요. 소문자 ihre는 「그녀의, 그들의」예요.' },
    { t: 'fill', q: 'Ich interessiere mich ___ das Fahrrad.', a: ['für'], e: 'sich interessieren für + 4격이에요.' },
    { t: 'fill', q: 'Ich habe Ihre Anzeige im Internet ___. (lesen)', a: ['gelesen'], e: 'lesen의 과거분사는 gelesen이에요. 현재완료는 haben + 과거분사로 만들어요.' },
    { t: 'fix', q: 'Kann ich ansehen das Fahrrad am Samstag?', a: ['Kann ich das Fahrrad am Samstag ansehen?', 'Kann ich am Samstag das Fahrrad ansehen?'], e: '원형 ansehen은 문장 끝에 와요.' },
    { t: 'mc', q: 'Das Fahrrad ist rot. Ist ___ noch da?', o: ['er', 'sie', 'es'], a: 2, e: 'das Fahrrad는 중성이라 es로 받아요.' },
    { t: 'fill', q: 'Wann ___ Sie Zeit? (haben)', a: ['haben'], e: '존칭 Sie와 함께 쓰는 동사는 원형과 모양이 같아요.' }
  ],
  aufgabe: {
    lead: 'Sie suchen ein Fahrrad und lesen im Internet diese Anzeige. Schreiben Sie Herrn Braun eine E-Mail.',
    brief: 'Verkaufe Damenfahrrad, rot, wenig gefahren. 90 Euro.\nThomas Braun, Köln',
    punkte: ['Warum schreiben Sie?', 'Stellen Sie zwei Fragen zum Fahrrad.', 'Wann können Sie das Fahrrad ansehen?'],
    close: 'Schreiben Sie 40–60 Wörter. Schreiben Sie zu allen drei Punkten.',
    ko: {
      lead: '자전거를 구하고 있는데 인터넷에서 이 광고를 봤어요. 브라운 씨에게 이메일을 쓰세요.',
      brief: '여성용 자전거 팝니다. 빨간색, 거의 타지 않았어요. 90유로.\n토마스 브라운, 쾰른',
      punkte: ['왜 메일을 쓰나요?', '자전거에 대해 두 가지를 물어보세요.', '언제 자전거를 보러 갈 수 있나요?'],
      close: '40–60단어로 쓰세요. 세 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['Sehr geehrter Herr Braun,으로 시작했어요.', '광고를 보고 쓴다고 밝혔어요.', '자전거에 대해 두 가지를 물었어요.', '보러 갈 수 있는 때를 썼어요.', '처음부터 끝까지 Sie와 Ihr로 썼어요.', 'Mit freundlichen Grüßen과 이름·성으로 끝냈어요.'],
  muster: {
    de: [
      'Sehr geehrter Herr Braun,',
      'ich habe Ihre Anzeige im Internet gelesen und interessiere mich für das Fahrrad. Ist es noch da? Ich habe zwei Fragen: Wie alt ist das Fahrrad? Und funktioniert das Licht?',
      'Kann ich das Fahrrad am Samstag ansehen? Ich habe ab 14 Uhr Zeit. Vielen Dank für Ihre Antwort!',
      'Mit freundlichen Grüßen\nSena Park'
    ],
    ko: [
      '브라운 님께,',
      '인터넷에서 올리신 광고를 읽었고 자전거에 관심이 있어요. 아직 있나요? 두 가지 질문이 있어요. 자전거는 몇 년 됐나요? 그리고 전조등은 잘 켜지나요?',
      '토요일에 자전거를 보러 가도 될까요? 오후 2시부터 시간이 돼요. 답장 미리 감사드려요!',
      '안녕히 계세요.\n박세나 드림'
    ],
    notes: [
      { de: 'ich habe Ihre Anzeige im Internet gelesen', ko: '현재완료(haben + gelesen)로 이미 한 일을 말해요. Ihre는 대문자예요.' },
      { de: 'interessiere mich für das Fahrrad', ko: 'sich interessieren für + 4격이에요. 주어가 ich라서 재귀대명사는 mich예요.' },
      { de: 'Ist es noch da?', ko: 'das Fahrrad를 es로 받았어요. noch da는 「아직 남아 있다」는 뜻이에요.' },
      { de: 'Ich habe zwei Fragen: …', ko: '질문이 몇 개인지 먼저 말하면 읽는 사람이 답하기 쉬워요.' },
      { de: 'Ich habe ab 14 Uhr Zeit.', ko: '「ab + 시각」은 「~부터」예요.' }
    ]
  }
},
{
  id: 'a2-05', level: 'A2', no: 5,
  title: 'Wollen wir einen Ausflug machen?', titleKo: '친구들에게 나들이 제안하기',
  type: 'Persönliche E-Mail', typeKo: '개인 이메일',
  exam: 'Goethe-Zertifikat A2 쓰기와 같은 유형',
  time: 15, words: [40, 60],
  intro: '친구 두 명에게 주말 나들이를 제안하는 이메일을 써요. 여러 명에게 쓰는 글이라 ihr로 쓰고, 어디로 가는지, 언제 어디서 만나는지, 무엇을 가져오는지 알려요.',
  goals: ['여러 친구에게 ihr로 써요', 'Wollen wir …?로 제안해요', '가는 곳을 an den See, in die Berge, nach Potsdam처럼 말해요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Hallo Mia, hallo Jonas,' },
    { de: 'Vorschlag', ko: '제안', ex: 'Wollen wir einen Ausflug an den See machen?' },
    { de: 'Programm', ko: '할 일', ex: 'Dort können wir schwimmen und grillen.' },
    { de: 'Treffpunkt', ko: '만나는 시간과 장소', ex: 'Wir treffen uns um 9 Uhr am Bahnhof.' },
    { de: 'Mitbringen', ko: '가져올 것', ex: 'Bringt bitte Badesachen mit!' },
    { de: 'Bitte um Antwort und Gruß', ko: '답장 부탁과 끝인사', ex: 'Schreibt mir bitte bis Donnerstag. / Viele Grüße / Dahye' }
  ],
  tipps: [
    '친구 여러 명에게는 ihr를 써요. 동사는 -t로 끝나요. Habt ihr Zeit? Kommt ihr mit?',
    'ihr에게 하는 명령문은 ihr 형태에서 ihr만 빼면 돼요. Bringt Getränke mit! Schreibt mir!',
    '「어디로」는 4격이에요. an den See, in die Berge, in den Park. 도시 이름 앞에는 nach를 써요. nach Potsdam.',
    '「어디에서」는 3격이에요. am See, in den Bergen, am Bahnhof. 만나는 장소는 3격으로 말해요.'
  ],
  fehler: [
    { f: 'Wollen wir fahren an den See?', r: 'Wollen wir an den See fahren?', e: 'wollen과 함께 쓰는 원형 fahren은 문장 끝에 와요.' },
    { f: 'Wir fahren an dem See.', r: 'Wir fahren an den See.', e: '「호수로」 가는 방향은 4격 an den See예요. am See는 「호숫가에서」예요.' },
    { f: 'Wir fahren zu Potsdam.', r: 'Wir fahren nach Potsdam.', e: '도시 이름 앞에는 nach를 써요.' },
    { f: 'Mia und Jonas, bring bitte Getränke mit!', r: 'Mia und Jonas, bringt bitte Getränke mit!', e: '여러 명에게 하는 명령문은 -t로 끝나요.' }
  ],
  redemittel: [
    { g: '제안하기', items: [['Habt ihr am Samstag Zeit?', '토요일에 시간 있어요?'], ['Wollen wir einen Ausflug machen?', '우리 나들이 갈까요?'], ['Ich habe eine Idee: Wir fahren an den See.', '좋은 생각이 있어요. 호수로 가요.'], ['Kommt ihr mit?', '같이 갈래요?']] },
    { g: '가는 곳과 할 일', items: [['Wir fahren an den See.', '호수로 가요.'], ['Wir fahren in die Berge.', '산으로 가요.'], ['Wir fahren nach Potsdam.', '포츠담으로 가요.'], ['Dort können wir schwimmen und grillen.', '거기서 수영하고 바비큐를 할 수 있어요.']] },
    { g: '만나는 시간과 장소', items: [['Wir treffen uns um 9 Uhr am Bahnhof.', '아침 9시에 역에서 만나요.'], ['Wir fahren mit dem Zug.', '기차를 타고 가요.'], ['Die Fahrt dauert eine Stunde.', '가는 데 한 시간 걸려요.']] },
    { g: '가져올 것', items: [['Bringt bitte Badesachen mit!', '수영 준비물을 가져오세요!'], ['Ich bringe Würstchen und Getränke mit.', '저는 소시지와 음료를 가져갈게요.'], ['Vergesst die Sonnencreme nicht!', '선크림 잊지 마세요!']] },
    { g: '답장 부탁하고 끝맺기', items: [['Schreibt mir bitte bis Donnerstag.', '목요일까지 답장해 주세요.'], ['Ich freue mich auf euch!', '만날 날이 기다려져요!'], ['Viele Grüße', '안부를 전해요']] }
  ],
  uebung: [
    { t: 'fix', q: 'Wollen wir fahren an den See?', a: ['Wollen wir an den See fahren?'], e: '원형 fahren은 문장 끝에 와요.' },
    { t: 'mc', q: 'Am Samstag fahren wir ___.', o: ['am See', 'an den See', 'in dem See'], a: 1, e: '「호수로」 가는 방향은 an + 4격이에요. am See는 「호숫가에서」라는 위치예요.' },
    { t: 'fill', q: 'Wir fahren ___ Potsdam.', a: ['nach'], e: '도시 이름 앞에는 nach를 써요.' },
    { t: 'fill', q: 'Wann ___ ihr Zeit? (haben)', a: ['habt'], e: 'ihr와 함께 쓰는 haben은 habt예요.' },
    { t: 'mc', q: '친구 두 명에게 부탁하는 문장은?', o: ['Bring bitte Getränke mit!', 'Bringt bitte Getränke mit!', 'Bringen bitte Getränke mit!'], a: 1, e: '여러 친구(ihr)에게 하는 명령문은 Bringt …!예요. Bring …!은 한 명(du)에게 써요.' },
    { t: 'fill', q: 'Wir treffen ___ um 9 Uhr am Bahnhof.', a: ['uns'], e: 'sich treffen은 재귀동사예요. wir의 재귀대명사는 uns예요.' }
  ],
  aufgabe: {
    lead: 'Sie möchten am Samstag mit Ihren Freunden Mia und Jonas einen Ausflug machen. Schreiben Sie den beiden eine E-Mail.',
    punkte: ['Wohin möchten Sie fahren?', 'Wann und wo treffen Sie sich?', 'Was sollen Mia und Jonas mitbringen?'],
    close: 'Schreiben Sie 40–60 Wörter. Schreiben Sie zu allen drei Punkten.',
    ko: {
      lead: '토요일에 친구 미아, 요나스와 나들이를 가고 싶어요. 두 사람에게 이메일을 쓰세요.',
      punkte: ['어디로 가고 싶나요?', '언제 어디서 만나나요?', '미아와 요나스는 무엇을 가져와야 하나요?'],
      close: '40–60단어로 쓰세요. 세 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['두 친구를 부르는 말로 시작했어요.', '어디로 가는지 썼어요.', '만나는 시간과 장소를 썼어요.', '가져올 것을 썼어요.', '처음부터 끝까지 ihr로 썼어요.', '끝인사와 내 이름을 썼어요.'],
  muster: {
    de: [
      'Hallo Mia, hallo Jonas,',
      'habt ihr am Samstag Zeit? Das Wetter wird schön. Wollen wir einen Ausflug an den See machen? Dort können wir schwimmen und grillen.',
      'Wir treffen uns um 9 Uhr am Bahnhof und fahren mit dem Zug. Bringt bitte Badesachen mit! Ich bringe Würstchen und Getränke mit. Schreibt mir bitte bis Donnerstag.',
      'Viele Grüße\nDahye'
    ],
    ko: [
      '미아, 요나스에게,',
      '토요일에 시간 있어요? 날씨가 좋을 거예요. 우리 호수로 나들이 갈까요? 거기서 수영도 하고 바비큐도 할 수 있어요.',
      '아침 9시에 역에서 만나서 기차를 타고 가요. 수영 준비물을 가져오세요! 저는 소시지와 음료를 가져갈게요. 목요일까지 답장해 주세요.',
      '안부를 전하며,\n다혜'
    ],
    notes: [
      { de: 'habt ihr am Samstag Zeit?', ko: '여러 친구에게 묻는 질문이라 habt ihr예요.' },
      { de: 'Wollen wir einen Ausflug an den See machen?', ko: 'Wollen wir …?로 제안해요. 「호수로」는 방향이라 4격 an den See예요.' },
      { de: 'Wir treffen uns um 9 Uhr am Bahnhof', ko: '만나는 장소는 위치라서 3격 am Bahnhof예요.' },
      { de: 'Bringt bitte Badesachen mit!', ko: 'ihr에게 하는 명령문이에요. mitbringen의 mit은 끝으로 가요.' },
      { de: 'Ich bringe Würstchen und Getränke mit.', ko: '내가 무엇을 가져가는지도 알리면 준비물이 겹치지 않아요.' }
    ]
  }
},

{
  id: 'a2-06', level: 'A2', no: 6,
  title: 'Ich komme später!', titleKo: '늦는다고 알리는 문자 쓰기',
  type: 'SMS', typeKo: '문자 메시지',
  exam: 'Goethe-Zertifikat A2 쓰기 Teil 1(SMS)과 같은 유형',
  time: 10, words: [20, 30],
  intro: '약속에 늦는다고 친구에게 알리는 문자를 써요. 20–30단어 안에 사과, 이유, 새 시간이나 장소를 모두 담는 연습을 해요.',
  goals: ['짧은 글 안에 요구 사항 세 가지를 모두 써요', 'weil 문장에서 동사를 끝에 둬요', 'zu spät, Verspätung, erst um … 같은 표현을 익혀요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Hallo Anna,' },
    { de: 'Entschuldigung', ko: '사과', ex: 'entschuldige, ich komme leider zu spät,' },
    { de: 'Grund', ko: '이유', ex: 'weil mein Bus Verspätung hat.' },
    { de: 'Neue Zeit', ko: '새 시간', ex: 'Ich bin erst um halb acht da.' },
    { de: 'Neuer Ort', ko: '새 장소', ex: 'Wartest du im Café neben dem Kino?' },
    { de: 'Gruß und Name', ko: '끝인사와 이름', ex: 'Bis gleich / Dami' }
  ],
  tipps: [
    '문자는 20–30단어예요. 요구 사항 하나에 한 문장이면 충분해요.',
    'weil 다음에는 동사가 맨 끝에 와요. …, weil mein Bus Verspätung hat.',
    '「늦게 가요」는 Ich komme zu spät. 또는 Ich komme später.로 써요. spät만 쓰면 뜻이 달라져요.',
    '곧 만날 사람에게는 Bis gleich! 또는 Bis später!로 끝내요.'
  ],
  fehler: [
    { f: 'Ich komme zu spät, weil mein Bus hat Verspätung.', r: 'Ich komme zu spät, weil mein Bus Verspätung hat.', e: 'weil 문장에서는 동사 hat이 맨 끝에 와요.' },
    { f: 'Ich bin zu spät kommen.', r: 'Ich komme zu spät.', e: '「늦게 가요」는 현재형 Ich komme zu spät.로 써요.' },
    { f: 'Ich bin um halb acht dort erst.', r: 'Ich bin erst um halb acht da.', e: 'erst(~에야)는 시각 앞에 써요.' },
    { f: 'Wartest du in Café?', r: 'Wartest du im Café?', e: 'das Café이므로 in dem을 줄인 im을 써요.' }
  ],
  redemittel: [
    { g: '사과하기', items: [['Entschuldige, ich komme leider zu spät.', '미안해요, 아쉽지만 늦어요.'], ['Tut mir leid, ich schaffe es nicht pünktlich.', '미안해요, 제시간에 못 가요.'], ['Sei bitte nicht böse!', '화내지 말아요!']] },
    { g: '이유 말하기', items: [['Mein Bus hat Verspätung.', '버스가 늦어요.'], ['Ich habe die Bahn verpasst.', '전철을 놓쳤어요.'], ['Ich muss noch länger arbeiten.', '일을 더 해야 해요.'], ['Ich stehe im Stau.', '길이 막혀요.']] },
    { g: '새 시간 말하기', items: [['Ich bin erst um halb acht da.', '7시 반에야 도착해요.'], ['Ich komme 20 Minuten später.', '20분 늦게 가요.'], ['Können wir uns um acht Uhr treffen?', '8시에 만날 수 있을까요?']] },
    { g: '새 장소 말하기', items: [['Wartest du im Café neben dem Kino?', '영화관 옆 카페에서 기다려 줄래요?'], ['Treffen wir uns vor dem Eingang?', '입구 앞에서 만날까요?'], ['Geh schon rein, ich komme nach.', '먼저 들어가요, 뒤따라 갈게요.']] },
    { g: '끝인사', items: [['Bis gleich!', '곧 만나요!'], ['Bis später!', '나중에 만나요!']] }
  ],
  uebung: [
    { t: 'fix', q: 'Ich komme zu spät, weil mein Bus hat Verspätung.', a: ['Ich komme zu spät, weil mein Bus Verspätung hat.'], e: 'weil 문장에서는 동사가 맨 끝에 와요.' },
    { t: 'fill', q: 'Ich habe die Bahn ___. (verpassen)', a: ['verpasst'], e: 'verpassen의 과거분사는 verpasst예요. ver-로 시작하는 동사에는 ge-가 붙지 않아요.' },
    { t: 'mc', q: '「7시 반에야 도착해요」로 알맞은 문장은?', o: ['Ich bin nur um halb acht da.', 'Ich bin erst um halb acht da.', 'Ich bin schon um halb acht da.'], a: 1, e: '예상보다 늦은 시각은 erst로 말해요. schon은 「벌써」예요.' },
    { t: 'fill', q: 'Wartest du ___ Café neben dem Kino?', a: ['im'], e: 'das Café, 어디에서 기다리는지이므로 in dem = im이에요.' },
    { t: 'mc', q: '곧 만날 친구에게 보내는 문자의 끝인사로 알맞은 것은?', o: ['Mit freundlichen Grüßen', 'Bis gleich!', 'Hochachtungsvoll'], a: 1, e: '곧 만날 때는 Bis gleich!가 자연스러워요.' },
    { t: 'fill', q: 'Können wir ___ um acht Uhr treffen?', a: ['uns'], e: 'sich treffen은 재귀동사예요. wir의 재귀대명사는 uns예요.' }
  ],
  aufgabe: {
    lead: 'Sie sind um 19 Uhr mit Ihrer Freundin Anna vor dem Kino verabredet, aber Sie kommen zu spät. Schreiben Sie Anna eine SMS.',
    punkte: ['Entschuldigen Sie sich, dass Sie zu spät kommen.', 'Schreiben Sie, warum.', 'Nennen Sie eine neue Uhrzeit oder einen neuen Ort für das Treffen.'],
    close: 'Schreiben Sie 20–30 Wörter. Schreiben Sie zu allen drei Punkten.',
    ko: {
      lead: '저녁 7시에 영화관 앞에서 친구 안나와 만나기로 했는데 늦어요. 안나에게 문자를 쓰세요.',
      punkte: ['늦는 것을 사과하세요.', '왜 늦는지 쓰세요.', '만날 새 시간이나 새 장소를 알려 주세요.'],
      close: '20–30단어로 쓰세요. 세 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['사과하는 말을 썼어요.', '늦는 이유를 썼어요.', '새 시간이나 새 장소를 썼어요.', 'weil 문장에서 동사가 맨 끝에 있어요.', '20–30단어로 썼어요.', '끝인사와 내 이름을 썼어요.'],
  muster: {
    de: [
      'Hallo Anna,',
      'entschuldige, ich komme leider zu spät, weil mein Bus Verspätung hat. Ich bin erst um halb acht da. Wartest du im Café neben dem Kino?',
      'Bis gleich\nDami'
    ],
    ko: [
      '안나, 안녕하세요.',
      '미안해요, 버스가 늦어서 아쉽지만 늦어요. 7시 반에야 도착해요. 영화관 옆 카페에서 기다려 줄래요?',
      '곧 만나요.\n다미'
    ],
    notes: [
      { de: 'entschuldige, ich komme leider zu spät', ko: 'entschuldige는 du에게 하는 사과예요. Sie에게는 Entschuldigen Sie를 써요.' },
      { de: '…, weil mein Bus Verspätung hat.', ko: 'weil 문장이라 동사 hat이 맨 끝이에요. weil 앞에는 쉼표를 찍어요.' },
      { de: 'Ich bin erst um halb acht da.', ko: 'halb acht는 7시 반이에요. erst는 예상보다 늦다는 뜻을 더해요.' },
      { de: 'Wartest du im Café neben dem Kino?', ko: '새 장소를 질문으로 제안했어요. neben + 3격(어디에)이에요.' }
    ]
  }
},
{
  id: 'a2-07', level: 'A2', no: 7,
  title: 'Antwort auf die Einladung der Chefin', titleKo: '상사의 초대에 답장하기',
  type: 'Halbformelle E-Mail', typeKo: '반격식 이메일',
  exam: 'Goethe-Zertifikat A2 쓰기 Teil 2와 같은 유형',
  time: 15, words: [35, 50],
  intro: '상사가 보낸 초대에 고맙다고 하고, 가겠다고 알리고, 궁금한 것을 묻는 이메일을 써요. Sie로 쓰는 A2 시험 Teil 2의 대표 과제예요.',
  goals: ['Sehr geehrte Frau …로 시작하고 Sie로 써요', 'Vielen Dank für + 4격으로 고마움을 말해요', 'Darf ich …?, Soll ich …?로 정중하게 물어요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Sehr geehrte Frau Sommer,' },
    { de: 'Dank', ko: '감사', ex: 'vielen Dank für die Einladung zum Sommerfest.' },
    { de: 'Zusage', ko: '가겠다는 말', ex: 'Ich komme sehr gern.' },
    { de: 'Frage', ko: '질문', ex: 'Darf ich meinen Mann mitbringen?' },
    { de: 'Angebot', ko: '제안', ex: 'Soll ich einen Salat oder einen Kuchen machen?' },
    { de: 'Gruß und Name', ko: '끝인사와 이름', ex: 'Mit freundlichen Grüßen / Hana Choi' }
  ],
  tipps: [
    '상사에게는 이름을 알아도 Sie로 써요. Sehr geehrte Frau Sommer, / Sehr geehrter Herr Sommer,',
    'Darf ich …?는 허락을, Soll ich …?는 상대가 원하는지를 묻는 말이에요.',
    'mitbringen은 분리동사지만 dürfen, sollen과 함께 쓰면 문장 끝에 붙여 써요. Darf ich … mitbringen?',
    'Teil 2는 30–40단어가 기준이에요. 요구 사항마다 한두 문장을 쓰세요.'
  ],
  fehler: [
    { f: 'Sehr geehrte Herr Sommer,', r: 'Sehr geehrter Herr Sommer,', e: '남자에게는 geehrter, 여자에게는 geehrte예요.' },
    { f: 'Vielen Dank für der Einladung.', r: 'Vielen Dank für die Einladung.', e: 'für 뒤는 4격이에요. die Einladung은 4격에서도 die예요.' },
    { f: 'Darf ich mitbringen meinen Mann?', r: 'Darf ich meinen Mann mitbringen?', e: '화법조동사와 함께 쓰는 원형은 문장 맨 끝에 와요.' },
    { f: 'Ich komme sehr gern zu Ihre Party.', r: 'Ich komme sehr gern zu Ihrer Party.', e: 'zu 뒤는 3격이에요. die Party의 3격은 Ihrer Party예요.' }
  ],
  redemittel: [
    { g: '감사하기', items: [['Vielen Dank für die Einladung.', '초대해 주셔서 감사합니다.'], ['Ich habe mich sehr über Ihre Einladung gefreut.', '초대를 받고 무척 기뻤습니다.'], ['Das ist sehr nett von Ihnen.', '정말 친절하세요.']] },
    { g: '가겠다고 말하기', items: [['Ich komme sehr gern.', '기꺼이 가겠습니다.'], ['Natürlich komme ich.', '물론 가겠습니다.'], ['Ich freue mich schon auf das Fest.', '벌써 잔치가 기대됩니다.']] },
    { g: '허락 구하기', items: [['Darf ich meinen Mann mitbringen?', '남편을 데려가도 될까요?'], ['Darf ich meine Kinder mitbringen?', '아이들을 데려가도 될까요?'], ['Kann ich etwas später kommen?', '조금 늦게 가도 될까요?']] },
    { g: '도움 제안하기', items: [['Soll ich einen Salat machen?', '샐러드를 만들어 갈까요?'], ['Ich möchte etwas zum Essen mitbringen.', '먹을 것을 가져가고 싶습니다.'], ['Kann ich Ihnen helfen?', '도와드릴까요?'], ['Brauchen Sie noch Getränke?', '음료가 더 필요하신가요?']] },
    { g: '끝인사', items: [['Mit freundlichen Grüßen', '안녕히 계세요 (격식 있는 끝인사)'], ['Viele Grüße', '안부를 전합니다 (조금 편한 끝인사)']] }
  ],
  uebung: [
    { t: 'mc', q: 'Herr Sommer에게 쓸 때 알맞은 부르는 말은?', o: ['Sehr geehrte Herr Sommer,', 'Sehr geehrter Herr Sommer,', 'Lieber Sommer,'], a: 1, e: '남자에게는 Sehr geehrter Herr + 성으로 써요.' },
    { t: 'fill', q: 'Vielen Dank ___ die Einladung.', a: ['für'], e: '고마운 이유는 für + 4격으로 말해요.' },
    { t: 'fix', q: 'Darf ich mitbringen meinen Mann?', a: ['Darf ich meinen Mann mitbringen?'], e: '원형 mitbringen은 문장 맨 끝에 와요.' },
    { t: 'mc', q: '「샐러드를 만들어 갈까요?」로 알맞은 문장은?', o: ['Muss ich einen Salat machen?', 'Soll ich einen Salat machen?', 'Will ich einen Salat machen?'], a: 1, e: '상대가 원하는지 물을 때는 Soll ich …?를 써요.' },
    { t: 'fill', q: 'Ich freue mich schon ___ das Fest.', a: ['auf'], e: '앞으로 올 일을 기대할 때는 sich freuen auf + 4격이에요.' },
    { t: 'fill', q: 'Ich komme gern zu ___ Party. (Ihr)', a: ['Ihrer'], e: 'zu + 3격이에요. die Party의 3격이라 Ihrer가 돼요.' }
  ],
  aufgabe: {
    lead: 'Ihre Chefin, Frau Sommer, macht ein Sommerfest in ihrem Garten und hat Sie eingeladen. Schreiben Sie Frau Sommer eine E-Mail.',
    punkte: ['Bedanken Sie sich und schreiben Sie, dass Sie kommen.', 'Fragen Sie, ob Sie jemanden mitbringen dürfen.', 'Fragen Sie, was Sie mitbringen sollen.'],
    close: 'Schreiben Sie 35–50 Wörter. Schreiben Sie zu allen drei Punkten.',
    ko: {
      lead: '상사인 좀머 씨가 정원에서 여름 잔치를 열고 여러분을 초대했어요. 좀머 씨에게 이메일을 쓰세요.',
      punkte: ['고맙다고 하고, 가겠다고 쓰세요.', '누군가를 데려가도 되는지 물어보세요.', '무엇을 가져가면 좋을지 물어보세요.'],
      close: '35–50단어로 쓰세요. 세 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['Sehr geehrte Frau Sommer,로 시작했어요.', '초대에 고맙다고 썼어요.', '가겠다고 썼어요.', '누군가를 데려가도 되는지 물었어요.', '무엇을 가져갈지 물었어요.', '처음부터 끝까지 Sie로 쓰고 Mit freundlichen Grüßen으로 끝냈어요.'],
  muster: {
    de: [
      'Sehr geehrte Frau Sommer,',
      'vielen Dank für die Einladung zum Sommerfest. Ich komme sehr gern. Darf ich meinen Mann mitbringen? Ich möchte auch etwas zum Essen mitbringen. Soll ich einen Salat oder einen Kuchen machen?',
      'Mit freundlichen Grüßen\nHana Choi'
    ],
    ko: [
      '좀머 씨께,',
      '여름 잔치에 초대해 주셔서 감사합니다. 기꺼이 가겠습니다. 남편을 데려가도 될까요? 먹을 것도 가져가고 싶습니다. 샐러드를 만들어 갈까요, 케이크를 만들어 갈까요?',
      '안녕히 계세요.\n최하나 드림'
    ],
    notes: [
      { de: 'vielen Dank für die Einladung zum Sommerfest.', ko: 'für + 4격, zu + 3격이에요. zum = zu dem.' },
      { de: 'Darf ich meinen Mann mitbringen?', ko: 'dürfen으로 허락을 구해요. 4격 목적어 meinen Mann, 원형은 맨 끝이에요.' },
      { de: 'etwas zum Essen', ko: '「먹을 것」이에요. 동사를 명사로 쓰면 대문자로 시작하고 중성이에요.' },
      { de: 'Soll ich einen Salat oder einen Kuchen machen?', ko: 'Soll ich …?로 상대가 원하는 것을 물었어요. 두 가지를 주면 답하기 쉬워요.' }
    ]
  }
},
{
  id: 'a2-08', level: 'A2', no: 8,
  title: 'Die Heizung ist kaputt', titleKo: '집주인에게 고장 알리기',
  type: 'Halbformelle E-Mail', typeKo: '반격식 이메일',
  exam: 'Goethe-Zertifikat A2 쓰기 Teil 2와 비슷한 유형 · 독일 생활에서 자주 쓰는 메일',
  time: 15, words: [40, 60],
  intro: '집에 고장 난 것이 있을 때 집주인에게 알리고 수리를 부탁하는 이메일을 써요. 무엇이, 언제부터, 어떻게 안 되는지를 정확하게 전해요.',
  goals: ['funktioniert nicht, ist kaputt로 문제를 설명해요', 'seit + 3격으로 언제부터인지 말해요', 'Können Sie bitte …?로 수리를 부탁하고 내가 집에 있는 시간을 알려요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Sehr geehrter Herr Krause,' },
    { de: 'Wer und wo', ko: '누구이고 어디에 사는지', ex: 'ich wohne in der Gartenstraße 12 im zweiten Stock.' },
    { de: 'Problem', ko: '문제', ex: 'Seit Montag funktioniert meine Heizung nicht mehr.' },
    { de: 'Bitte', ko: '부탁', ex: 'Können Sie bitte einen Handwerker schicken?' },
    { de: 'Zeit', ko: '집에 있는 시간', ex: 'Ich bin diese Woche jeden Tag ab 16 Uhr zu Hause.' },
    { de: 'Dank und Gruß', ko: '감사와 끝인사', ex: 'Vielen Dank für Ihre Hilfe. / Mit freundlichen Grüßen' }
  ],
  tipps: [
    '집주인은 집이 여러 채일 수 있어요. 주소와 층을 먼저 써요.',
    'seit 뒤는 3격이에요. seit Montag, seit einer Woche, seit drei Tagen',
    '문제 때문에 무엇이 불편한지 한 문장 더 쓰면 급한 일인지 알 수 있어요. In der Wohnung ist es sehr kalt.',
    '수리 기사가 올 수 있게 내가 집에 있는 시간을 알려 주세요. ab 16 Uhr, am Vormittag'
  ],
  fehler: [
    { f: 'Seit Montag meine Heizung funktioniert nicht mehr.', r: 'Seit Montag funktioniert meine Heizung nicht mehr.', e: 'Seit Montag이 첫 자리에 오면 동사 funktioniert가 두 번째 자리에 와요.' },
    { f: 'Seit eine Woche ist die Heizung kaputt.', r: 'Seit einer Woche ist die Heizung kaputt.', e: 'seit 뒤는 3격이에요. die Woche의 3격은 einer Woche예요.' },
    { f: 'Ich wohne im zweite Stock.', r: 'Ich wohne im zweiten Stock.', e: 'im(in dem) 뒤의 형용사와 서수는 어미 -en을 가져요.' },
    { f: 'Können Sie bitte schicken einen Handwerker?', r: 'Können Sie bitte einen Handwerker schicken?', e: '원형 schicken은 문장 맨 끝에 와요.' }
  ],
  redemittel: [
    { g: '누구인지 말하기', items: [['Ich wohne in der Gartenstraße 12 im zweiten Stock.', '가르텐 거리 12번지 3층에 삽니다. (독일의 2층은 한국의 3층)'], ['Ich bin Ihre Mieterin. / Ich bin Ihr Mieter.', '세입자입니다.']] },
    { g: '문제 말하기', items: [['Meine Heizung funktioniert nicht mehr.', '난방이 더는 안 됩니다.'], ['Die Waschmaschine ist kaputt.', '세탁기가 고장 났습니다.'], ['Aus dem Wasserhahn kommt kein warmes Wasser.', '수도꼭지에서 따뜻한 물이 안 나옵니다.'], ['Das Licht im Flur geht nicht.', '복도 불이 안 켜집니다.'], ['In der Wohnung ist es sehr kalt.', '집 안이 무척 춥습니다.']] },
    { g: '언제부터인지 말하기', items: [['seit Montag', '월요일부터'], ['seit drei Tagen', '사흘 전부터'], ['seit einer Woche', '일주일 전부터']] },
    { g: '부탁하기', items: [['Können Sie bitte einen Handwerker schicken?', '수리 기사를 보내 주실 수 있나요?'], ['Könnten Sie das bitte schnell reparieren lassen?', '빨리 수리하게 해 주실 수 있을까요?'], ['Ich bin jeden Tag ab 16 Uhr zu Hause.', '매일 오후 4시부터 집에 있습니다.']] },
    { g: '감사와 끝인사', items: [['Vielen Dank für Ihre Hilfe.', '도와주셔서 감사합니다.'], ['Mit freundlichen Grüßen', '안녕히 계세요 (격식 있는 끝인사)']] }
  ],
  uebung: [
    { t: 'fill', q: 'Seit ___ Woche ist die Heizung kaputt. (eine)', a: ['einer'], e: 'seit + 3격이에요. die Woche의 3격은 einer Woche예요.' },
    { t: 'fill', q: 'Ich wohne im ___ Stock. (zweite)', a: ['zweiten'], e: 'im 뒤에서 서수는 어미 -en을 가져요.' },
    { t: 'mc', q: '「난방이 더는 안 돼요」로 알맞은 문장은?', o: ['Die Heizung funktioniert nicht mehr.', 'Die Heizung funktioniert kein mehr.', 'Die Heizung funktioniert nicht noch.'], a: 0, e: '「더는 ~하지 않다」는 nicht mehr예요.' },
    { t: 'fix', q: 'Können Sie bitte schicken einen Handwerker?', a: ['Können Sie bitte einen Handwerker schicken?'], e: '화법조동사와 함께 쓰는 원형은 문장 맨 끝에 와요.' },
    { t: 'mc', q: '「오후 4시부터」로 알맞은 것은?', o: ['seit 16 Uhr', 'ab 16 Uhr', 'bis 16 Uhr'], a: 1, e: '앞으로의 시작 시점은 ab으로 말해요. seit는 과거에 시작해 지금까지 이어지는 일에 써요.' },
    { t: 'fill', q: 'Aus dem Wasserhahn kommt ___ warmes Wasser.', a: ['kein'], e: '관사 없는 명사는 kein으로 부정해요. das Wasser라서 kein이에요.' }
  ],
  aufgabe: {
    lead: 'Ihre Heizung funktioniert nicht. Schreiben Sie eine E-Mail an Ihren Vermieter, Herrn Krause.',
    punkte: ['Was ist das Problem?', 'Seit wann haben Sie das Problem?', 'Worum bitten Sie? Wann sind Sie zu Hause?'],
    close: 'Schreiben Sie 40–60 Wörter. Schreiben Sie zu allen drei Punkten.',
    ko: {
      lead: '난방이 안 돼요. 집주인 크라우제 씨에게 이메일을 쓰세요.',
      punkte: ['무엇이 문제인가요?', '언제부터 그런가요?', '무엇을 부탁하나요? 언제 집에 있나요?'],
      close: '40–60단어로 쓰세요. 세 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['Sehr geehrter Herr Krause,로 시작했어요.', '주소나 층을 썼어요.', '무엇이 안 되는지 썼어요.', '언제부터인지 seit로 썼어요.', '수리를 부탁하고 집에 있는 시간을 썼어요.', 'Mit freundlichen Grüßen과 내 이름으로 끝냈어요.'],
  muster: {
    de: [
      'Sehr geehrter Herr Krause,',
      'ich wohne in der Gartenstraße 12 im zweiten Stock. Seit Montag funktioniert meine Heizung nicht mehr und in der Wohnung ist es sehr kalt.',
      'Können Sie bitte einen Handwerker schicken? Ich bin diese Woche jeden Tag ab 16 Uhr zu Hause. Vielen Dank für Ihre Hilfe.',
      'Mit freundlichen Grüßen\nSeojun Park'
    ],
    ko: [
      '크라우제 씨께,',
      '저는 가르텐 거리 12번지 3층에 삽니다. 월요일부터 난방이 안 되어서 집 안이 무척 춥습니다.',
      '수리 기사를 보내 주실 수 있나요? 이번 주에는 매일 오후 4시부터 집에 있습니다. 도와주셔서 감사합니다.',
      '안녕히 계세요.\n박서준 드림'
    ],
    notes: [
      { de: 'im zweiten Stock', ko: '독일에서는 1층이 Erdgeschoss라서 zweiter Stock은 한국식으로 3층이에요.' },
      { de: 'Seit Montag funktioniert meine Heizung nicht mehr', ko: 'Seit Montag이 첫 자리라 동사가 두 번째예요. 지금도 이어지는 일이라 현재형으로 써요.' },
      { de: '… und in der Wohnung ist es sehr kalt.', ko: '문제 때문에 생긴 불편을 덧붙였어요. 급한 일이라는 것이 전해져요.' },
      { de: 'Können Sie bitte einen Handwerker schicken?', ko: 'Können Sie bitte …?는 정중한 부탁이에요. 원형 schicken이 맨 끝이에요.' },
      { de: 'jeden Tag ab 16 Uhr', ko: 'ab + 시각은 「~부터」예요. 수리 기사가 올 시간을 정하기 쉬워져요.' }
    ]
  }
},
{
  id: 'a2-09', level: 'A2', no: 9,
  title: 'Mein Urlaub an der Ostsee', titleKo: '친구에게 휴가 이야기 전하기',
  type: 'Persönliche E-Mail', typeKo: '개인 이메일',
  exam: 'Goethe-Zertifikat A2 쓰기와 같은 분량 · 지난 일을 현재완료로 전하는 연습',
  time: 15, words: [40, 60],
  intro: '지난 휴가에 어디에 갔고 무엇을 했는지 친구에게 이메일로 전해요. 현재완료(Perfekt)에서 haben과 sein을 고르는 연습을 해요.',
  goals: ['지난 일을 현재완료로 써요', '이동과 상태 변화 동사는 sein과 함께 써요', 'war, hatte로 날씨와 느낌을 말해요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Lieber Felix,' },
    { de: 'Einstieg', ko: '첫 문장', ex: 'wie geht es dir?' },
    { de: 'Wo und mit wem', ko: '어디에, 누구와', ex: 'Ich war letzte Woche mit meiner Schwester an der Ostsee.' },
    { de: 'Aktivitäten', ko: '한 일', ex: 'Wir sind jeden Tag geschwommen und haben viel Fisch gegessen.' },
    { de: 'Bewertung', ko: '느낌', ex: 'Der Urlaub hat mir sehr gefallen.' },
    { de: 'Frage und Gruß', ko: '질문과 끝인사', ex: 'Was hast du in den Ferien gemacht? / Viele Grüße' }
  ],
  tipps: [
    '현재완료는 haben 또는 sein + 과거분사예요. 과거분사는 문장 맨 끝에 와요.',
    '이동(fahren, gehen, fliegen, schwimmen)과 상태 변화(aufstehen, einschlafen), 그리고 sein, bleiben은 sein과 함께 써요.',
    'sein과 haben은 현재완료보다 과거형 war, hatte를 더 많이 써요. Das Wetter war gut.',
    '끝에 친구에게 질문을 하나 하면 답장을 받기 쉬운 이메일이 돼요.'
  ],
  fehler: [
    { f: 'Ich habe nach Rostock gefahren.', r: 'Ich bin nach Rostock gefahren.', e: 'fahren은 이동 동사라서 sein과 함께 써요.' },
    { f: 'Wir haben gegessen viel Fisch.', r: 'Wir haben viel Fisch gegessen.', e: '과거분사 gegessen은 문장 맨 끝에 와요.' },
    { f: 'Der Urlaub hat mich sehr gefallen.', r: 'Der Urlaub hat mir sehr gefallen.', e: 'gefallen은 3격과 함께 써요. ich의 3격은 mir예요.' },
    { f: 'Wir haben eine Radtour gemachen.', r: 'Wir haben eine Radtour gemacht.', e: 'machen은 규칙동사라서 과거분사가 gemacht예요.' }
  ],
  redemittel: [
    { g: '어디에 갔는지 말하기', items: [['Ich war letzte Woche an der Ostsee.', '지난주에 발트해에 있었어요.'], ['Ich bin mit dem Zug nach Rostock gefahren.', '기차를 타고 로스토크에 갔어요.'], ['Wir sind fünf Tage geblieben.', '닷새 동안 있었어요.'], ['Ich war mit meiner Schwester dort.', '언니(여동생)와 함께 갔어요.']] },
    { g: '한 일 말하기', items: [['Wir sind jeden Tag geschwommen.', '매일 수영했어요.'], ['Wir haben viel Fisch gegessen.', '생선을 많이 먹었어요.'], ['Am Mittwoch haben wir eine Radtour gemacht.', '수요일에는 자전거 여행을 했어요.'], ['Ich habe viele Fotos gemacht.', '사진을 많이 찍었어요.']] },
    { g: '날씨와 느낌 말하기', items: [['Das Wetter war leider nicht so gut.', '날씨는 아쉽게도 별로 좋지 않았어요.'], ['Der Urlaub hat mir sehr gefallen.', '휴가가 정말 마음에 들었어요.'], ['Es war wunderschön.', '정말 좋았어요.'], ['Das Hotel war klein, aber gemütlich.', '호텔은 작지만 아늑했어요.']] },
    { g: '질문하기', items: [['Was hast du in den Ferien gemacht?', '방학에 뭐 했어요?'], ['Wie war dein Urlaub?', '휴가는 어땠어요?'], ['Warst du auch am Meer?', '바다에도 갔어요?']] },
    { g: '끝인사', items: [['Viele Grüße', '안부를 전해요'], ['Schreib mir bald!', '곧 답장해요!']] }
  ],
  uebung: [
    { t: 'mc', q: '알맞은 것은? Ich ___ mit dem Zug nach Rostock gefahren.', o: ['habe', 'bin', 'war'], a: 1, e: 'fahren은 이동 동사라서 현재완료를 sein으로 만들어요.' },
    { t: 'fill', q: 'Wir haben viel Fisch ___. (essen)', a: ['gegessen'], e: 'essen의 과거분사는 gegessen이에요.' },
    { t: 'fill', q: 'Wir sind jeden Tag ___. (schwimmen)', a: ['geschwommen'], e: 'schwimmen의 과거분사는 geschwommen이에요. sein과 함께 써요.' },
    { t: 'fix', q: 'Wir haben gemacht eine Radtour.', a: ['Wir haben eine Radtour gemacht.'], e: '과거분사는 문장 맨 끝에 와요.' },
    { t: 'mc', q: '알맞은 것은? Der Urlaub hat ___ sehr gefallen.', o: ['ich', 'mich', 'mir'], a: 2, e: 'gefallen은 3격과 함께 써요.' },
    { t: 'fill', q: 'Das Wetter ___ leider nicht so gut. (sein, 과거)', a: ['war'], e: 'sein의 과거형은 war예요. 현재완료보다 과거형을 더 많이 써요.' }
  ],
  aufgabe: {
    lead: 'Sie waren letzte Woche im Urlaub. Schreiben Sie Ihrem Freund Felix eine E-Mail.',
    punkte: ['Wo waren Sie und mit wem?', 'Was haben Sie dort gemacht?', 'Wie hat Ihnen der Urlaub gefallen?'],
    close: 'Schreiben Sie 40–60 Wörter. Schreiben Sie zu allen drei Punkten.',
    ko: {
      lead: '지난주에 휴가를 다녀왔어요. 친구 펠릭스에게 이메일을 쓰세요.',
      punkte: ['어디에 누구와 갔나요?', '거기에서 무엇을 했나요?', '휴가가 어땠나요?'],
      close: '40–60단어로 쓰세요. 세 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['Lieber Felix, 또는 Hallo Felix,로 시작했어요.', '어디에 누구와 갔는지 썼어요.', '한 일을 두 가지 이상 썼어요.', '휴가가 어땠는지 썼어요.', '이동 동사를 sein과 함께 썼어요.', '과거분사를 문장 맨 끝에 썼어요.'],
  muster: {
    de: [
      'Lieber Felix,',
      'wie geht es dir? Ich war letzte Woche mit meiner Schwester an der Ostsee. Wir sind jeden Tag geschwommen und haben viel Fisch gegessen. Am Mittwoch haben wir eine Radtour gemacht.',
      'Das Wetter war leider nicht so gut, aber der Urlaub hat mir sehr gefallen. Was hast du in den Ferien gemacht?',
      'Viele Grüße\nEunji'
    ],
    ko: [
      '펠릭스에게,',
      '잘 지내요? 저는 지난주에 언니와 발트해에 다녀왔어요. 매일 수영하고 생선을 많이 먹었어요. 수요일에는 자전거 여행을 했어요.',
      '날씨는 아쉽게도 별로 좋지 않았지만 휴가는 정말 마음에 들었어요. 방학에 뭐 했어요?',
      '안부를 전하며,\n은지'
    ],
    notes: [
      { de: 'Ich war letzte Woche … an der Ostsee.', ko: 'sein은 과거형 war로 써요. 바다와 호수는 an + 3격이에요.' },
      { de: 'Wir sind jeden Tag geschwommen und haben viel Fisch gegessen.', ko: 'schwimmen은 sein, essen은 haben과 함께 써요. 조동사가 다르면 둘 다 써야 해요.' },
      { de: 'Am Mittwoch haben wir eine Radtour gemacht.', ko: 'Am Mittwoch이 첫 자리, haben이 두 번째, 과거분사가 맨 끝이에요.' },
      { de: '…, aber der Urlaub hat mir sehr gefallen.', ko: 'gefallen + 3격이에요. aber 앞에는 쉼표를 찍어요.' },
      { de: 'Was hast du in den Ferien gemacht?', ko: '친구에게 되물으면서 이메일을 마무리했어요.' }
    ]
  }
},
{
  id: 'a2-10', level: 'A2', no: 10,
  title: 'Anmeldung zum Schwimmkurs', titleKo: '강좌에 등록 문의하기',
  type: 'Formelle E-Mail', typeKo: '격식 이메일',
  exam: 'Goethe-Zertifikat A2 쓰기 Teil 2와 비슷한 유형',
  time: 15, words: [40, 60],
  intro: '스포츠 클럽의 수영 강좌에 등록하고 싶다고 알리고, 가능한 시간과 수강료를 묻는 격식 이메일을 써요. deshalb로 이유와 결과를 잇는 연습을 해요.',
  goals: ['sich anmelden für + 4격을 바르게 써요', 'deshalb 뒤에 동사를 바로 써요', '시간과 가격을 W-질문으로 물어요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Sehr geehrte Damen und Herren,' },
    { de: 'Grund', ko: '메일을 쓰는 이유', ex: 'ich möchte mich für den Schwimmkurs für Anfänger anmelden.' },
    { de: 'Zeit', ko: '가능한 시간', ex: 'Ich arbeite bis 17 Uhr, deshalb habe ich nur am Abend Zeit.' },
    { de: 'Fragen', ko: '질문', ex: 'Gibt es einen Kurs am Samstag? Wie viel kostet der Kurs?' },
    { de: 'Dank', ko: '감사', ex: 'Vielen Dank für Ihre Antwort.' },
    { de: 'Gruß und Name', ko: '끝인사와 이름', ex: 'Mit freundlichen Grüßen / Taeyang Kim' }
  ],
  tipps: [
    'sich anmelden은 재귀동사이면서 분리동사예요. Ich melde mich an. / Ich möchte mich anmelden.',
    'deshalb는 문장의 첫 자리를 차지해요. 바로 뒤에 동사가 와요. …, deshalb habe ich …',
    '어디에서 광고를 봤는지 쓰면 첫 문장이 자연스러워요. im Internet, in der Zeitung',
    '가격은 pro Monat(한 달에), pro Stunde(한 시간에)로 물어요.'
  ],
  fehler: [
    { f: 'Ich möchte anmelden für den Kurs.', r: 'Ich möchte mich für den Kurs anmelden.', e: 'sich anmelden은 재귀동사예요. mich를 꼭 쓰고, 원형은 맨 끝에 둬요.' },
    { f: 'Ich arbeite bis 17 Uhr, deshalb ich habe nur am Abend Zeit.', r: 'Ich arbeite bis 17 Uhr, deshalb habe ich nur am Abend Zeit.', e: 'deshalb 바로 뒤에 동사가 와요.' },
    { f: 'Wie viel kostet der Kurs für Monat?', r: 'Wie viel kostet der Kurs pro Monat?', e: '「한 달에」는 pro Monat 또는 im Monat예요.' },
    { f: 'Ich habe Ihre Anzeige im Internet gesehen und ich möchte mich für der Kurs anmelden.', r: 'Ich habe Ihre Anzeige im Internet gesehen und möchte mich für den Kurs anmelden.', e: 'für 뒤는 4격이라 den Kurs예요. 주어가 같으면 und 뒤의 ich는 빼도 돼요.' }
  ],
  redemittel: [
    { g: '메일을 쓰는 이유', items: [['Ich habe Ihre Anzeige im Internet gesehen.', '인터넷에서 광고를 봤습니다.'], ['Ich möchte mich für den Schwimmkurs anmelden.', '수영 강좌에 등록하고 싶습니다.'], ['Ich interessiere mich für den Kurs für Anfänger.', '초보자 강좌에 관심이 있습니다.']] },
    { g: '가능한 시간 말하기', items: [['Ich arbeite bis 17 Uhr.', '오후 5시까지 일합니다.'], ['Deshalb habe ich nur am Abend Zeit.', '그래서 저녁에만 시간이 있습니다.'], ['Am Wochenende kann ich immer.', '주말에는 언제든 됩니다.'], ['Vormittags habe ich leider keine Zeit.', '오전에는 아쉽게도 시간이 없습니다.']] },
    { g: '질문하기', items: [['Gibt es einen Kurs am Samstag?', '토요일에 강좌가 있습니까?'], ['Wie viel kostet der Kurs pro Monat?', '수강료가 한 달에 얼마입니까?'], ['Wann beginnt der nächste Kurs?', '다음 강좌는 언제 시작합니까?'], ['Was muss ich mitbringen?', '무엇을 가져가야 합니까?']] },
    { g: '감사와 끝인사', items: [['Vielen Dank für Ihre Antwort.', '답변에 감사드립니다.'], ['Mit freundlichen Grüßen', '안녕히 계세요 (격식 있는 끝인사)']] }
  ],
  uebung: [
    { t: 'fix', q: 'Ich möchte anmelden für den Kurs.', a: ['Ich möchte mich für den Kurs anmelden.'], e: '재귀대명사 mich를 쓰고 원형 anmelden을 맨 끝에 둬요.' },
    { t: 'mc', q: '어순이 바른 문장은?', o: ['Ich arbeite viel, deshalb ich habe wenig Zeit.', 'Ich arbeite viel, deshalb habe ich wenig Zeit.', 'Ich arbeite viel, deshalb ich wenig Zeit habe.'], a: 1, e: 'deshalb 바로 뒤에 동사가 와요.' },
    { t: 'fill', q: 'Ich möchte mich ___ den Schwimmkurs anmelden.', a: ['für'], e: 'sich anmelden für + 4격이에요.' },
    { t: 'fill', q: 'Wie viel kostet der Kurs ___ Monat?', a: ['pro', 'im'], e: '「한 달에」는 pro Monat 또는 im Monat예요.' },
    { t: 'mc', q: '알맞은 것은? ___ es einen Kurs am Samstag?', o: ['Ist', 'Gibt', 'Hat'], a: 1, e: '「~이 있다」는 es gibt + 4격으로 말해요.' },
    { t: 'fill', q: 'Ich melde ___ für den Kurs an.', a: ['mich'], e: 'ich의 재귀대명사는 mich예요.' }
  ],
  aufgabe: {
    lead: 'Sie möchten schwimmen lernen und haben im Internet die Anzeige von einem Sportverein gesehen. Schreiben Sie eine E-Mail an den Sportverein.',
    punkte: ['Warum schreiben Sie?', 'Wann haben Sie Zeit?', 'Fragen Sie nach dem Preis.'],
    close: 'Schreiben Sie 40–60 Wörter. Schreiben Sie zu allen drei Punkten.',
    ko: {
      lead: '수영을 배우고 싶은데 인터넷에서 스포츠 클럽의 광고를 봤어요. 스포츠 클럽에 이메일을 쓰세요.',
      punkte: ['왜 메일을 쓰나요?', '언제 시간이 있나요?', '가격을 물어보세요.'],
      close: '40–60단어로 쓰세요. 세 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['Sehr geehrte Damen und Herren,으로 시작했어요.', '등록하고 싶다고 썼어요.', '시간이 되는 때를 썼어요.', '가격을 물었어요.', 'deshalb 뒤에 동사를 바로 썼어요.', 'Mit freundlichen Grüßen과 내 이름으로 끝냈어요.'],
  muster: {
    de: [
      'Sehr geehrte Damen und Herren,',
      'ich habe Ihre Anzeige im Internet gesehen und möchte mich für den Schwimmkurs für Anfänger anmelden.',
      'Ich arbeite bis 17 Uhr, deshalb habe ich nur am Abend oder am Wochenende Zeit. Gibt es einen Kurs am Samstag? Wie viel kostet der Kurs pro Monat?',
      'Vielen Dank für Ihre Antwort.\nMit freundlichen Grüßen\nTaeyang Kim'
    ],
    ko: [
      '담당자님께,',
      '인터넷에서 광고를 보았고 초보자 수영 강좌에 등록하고 싶습니다.',
      '저는 오후 5시까지 일해서 저녁이나 주말에만 시간이 있습니다. 토요일에 강좌가 있습니까? 수강료는 한 달에 얼마입니까?',
      '답변에 감사드립니다.\n안녕히 계세요.\n김태양 드림'
    ],
    notes: [
      { de: '… und möchte mich für den Schwimmkurs für Anfänger anmelden.', ko: 'sich anmelden für + 4격이에요. mich는 möchte 바로 뒤, 원형은 맨 끝이에요.' },
      { de: 'Ich arbeite bis 17 Uhr, deshalb habe ich …', ko: '이유를 먼저 쓰고 deshalb로 결과를 이었어요. deshalb 뒤에 동사가 바로 와요.' },
      { de: 'nur am Abend oder am Wochenende', ko: '시간이 되는 때를 두 가지 써서 답을 받기 쉽게 했어요.' },
      { de: 'Gibt es einen Kurs am Samstag?', ko: 'es gibt 뒤는 4격이에요. 질문이라 동사 Gibt가 맨 앞이에요.' },
      { de: 'Wie viel kostet der Kurs pro Monat?', ko: '가격을 묻는 W-질문이에요. 요구 사항 「Preis」에 답하는 문장이에요.' }
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
    { g: '도입', items: [['Vielen Dank für deine Einladung!', '초대해 줘서 고마워요!'], ['Ich habe mich sehr über deine Nachricht gefreut.', '메시지 받고 정말 기뻤어요.'], ['Herzlichen Glückwunsch zur neuen Wohnung!', '새집 축하해요!']] },
    { g: '가겠다고 말하기', items: [['Natürlich komme ich gern.', '당연히 기꺼이 갈게요.'], ['Ich komme auf jeden Fall.', '꼭 갈게요.'], ['Leider kann ich nicht kommen, weil …', '아쉽지만 … 때문에 못 가요.']] },
    { g: '묻기', items: [['Soll ich etwas mitbringen?', '뭐 좀 가져갈까요?'], ['Ich kann zum Beispiel einen Salat machen.', '예를 들면 샐러드를 만들 수 있어요.'], ['Brauchst du noch etwas für die Wohnung?', '집에 필요한 것이 더 있어요?']] },
    { g: '늦는 이유 말하기', items: [['Leider kann ich erst gegen 21 Uhr kommen.', '아쉽지만 9시쯤에야 갈 수 있어요.'], ['…, weil ich bis 20 Uhr arbeiten muss.', '8시까지 일해야 해서 …'], ['Ich habe vorher noch einen Termin, deshalb komme ich später.', '그 전에 약속이 있어서 늦게 가요.']] },
    { g: '부탁하기', items: [['Kannst du mir bitte erklären, wie ich zu dir komme?', '집까지 어떻게 가는지 설명해 줄래요?'], ['Könntest du mir den Weg beschreiben?', '가는 길을 알려 줄 수 있어요?'], ['Welche Straßenbahn muss ich nehmen?', '어떤 트램을 타야 해요?']] },
    { g: '마무리', items: [['Ich freue mich schon auf die Party!', '파티가 벌써 기대돼요!'], ['Bis Samstag!', '토요일에 만나요!'], ['Liebe Grüße', '안부를 전해요']] }
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
      brief: '안녕하세요!\n드디어 제 집을 구했어요. 시내 한가운데예요! 11월 22일 토요일에 집들이를 해요. 올 거죠? 와 주면 정말 기쁠 거예요!\n막스',
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
      '초대해 줘서 고마워요! 새집 축하해요. 시내 한가운데라니 정말 좋네요! 당연히 파티에 기꺼이 갈게요.',
      '뭐 좀 가져갈까요? 예를 들면 감자샐러드를 만들거나 음료를 사 갈 수 있어요.',
      '아쉽지만 9시쯤에야 갈 수 있어요. 토요일에 카페에서 8시까지 일해야 하거든요. 괜찮으면 좋겠어요.',
      '집까지 어떻게 가는지 알려 줄래요? 그 동네를 잘 몰라서요. 어떤 트램을 타야 해요?',
      '토요일이 벌써 정말 기대돼요!',
      '안부를 전하며,\n소라'
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
{
  id: 'b1-03', level: 'B1', no: 3,
  title: 'Online einkaufen – ja oder nein?', titleKo: '토론 게시판에 의견 쓰기',
  type: 'Diskussionsbeitrag', typeKo: '토론 글',
  exam: 'Goethe-Zertifikat B1 쓰기 Aufgabe 2와 같은 유형',
  time: 25, words: [80, 110],
  intro: '방송 토론을 보고 온라인 게시판에 내 의견을 쓰는 글이에요. 편지가 아니라서 부르는 말과 끝인사가 없어요. 의견을 밝히고, 이유를 대고, 내 경험에서 예를 하나 들어요.',
  goals: ['Meiner Meinung nach, Ich finde, dass …로 의견을 말해요', '다른 사람의 의견에 동의하거나 반대해요', '이유와 경험을 weil, zum Beispiel, deshalb로 이어요'],
  aufbau: [
    { de: 'Bezug', ko: '읽은 의견에 반응', ex: 'Ich kann Paul verstehen, aber ich sehe das anders.' },
    { de: 'Meinung', ko: '내 의견', ex: 'Meiner Meinung nach ist Online-Shopping sehr praktisch.' },
    { de: 'Begründung', ko: '이유', ex: '…, weil man viel Zeit spart.' },
    { de: 'Beispiel', ko: '내 경험에서 든 예', ex: 'Letzten Monat habe ich zum Beispiel einen Rucksack gekauft.' },
    { de: 'Schluss', ko: '마무리 (정리하는 한 문장)', ex: 'Deshalb finde ich: Am besten ist eine Mischung aus beidem.' }
  ],
  tipps: [
    '토론 글은 편지가 아니에요. Liebe …나 Viele Grüße 없이 바로 의견으로 시작해요.',
    '게시판에 올라온 의견의 문장을 그대로 베끼지 마세요. 그 의견에 동의하는지 반대하는지 내 말로 밝혀요.',
    '의견만 쓰면 내용이 부족해요. 이유 하나와 내 경험에서 나온 예 하나를 꼭 넣으세요.',
    '실제 시험에는 요구 사항이 따로 주어지지 않아요. 의견 → 이유 → 예 → 마무리 순서를 외워 두면 바로 쓸 수 있어요.'
  ],
  fehler: [
    { f: 'Meiner Meinung nach Online-Shopping ist praktisch.', r: 'Meiner Meinung nach ist Online-Shopping praktisch.', e: 'Meiner Meinung nach가 첫 자리를 차지하므로 동사 ist가 바로 뒤에 와요.' },
    { f: 'Ich finde, dass Online-Shopping ist praktisch.', r: 'Ich finde, dass Online-Shopping praktisch ist.', e: 'dass 문장에서는 동사가 맨 끝에 와요.' },
    { f: 'Ich stimme diese Meinung zu.', r: 'Ich stimme dieser Meinung zu.', e: 'zustimmen은 3격과 함께 써요.' },
    { f: 'Obwohl es praktisch ist, aber ich kaufe lieber im Geschäft.', r: 'Obwohl es praktisch ist, kaufe ich lieber im Geschäft.', e: 'obwohl과 aber를 함께 쓰지 않아요. obwohl 문장 뒤의 주문장은 동사로 시작해요.' }
  ],
  redemittel: [
    { g: '다른 의견에 반응하기', items: [['Ich bin ganz Pauls Meinung.', '파울의 의견에 전적으로 동의해요.'], ['Ich stimme Paul zu.', '파울의 말에 동의해요.'], ['Ich kann Paul verstehen, aber ich sehe das anders.', '파울의 말은 이해하지만 저는 다르게 생각해요.'], ['Da bin ich anderer Meinung.', '그 점에서는 생각이 달라요.']] },
    { g: '의견 말하기', items: [['Meiner Meinung nach ist Online-Shopping praktisch.', '제 생각에는 온라인 쇼핑이 편리해요.'], ['Ich finde, dass man im Internet viel Zeit spart.', '인터넷에서는 시간을 많이 아낄 수 있다고 생각해요.'], ['Ich bin der Meinung, dass …', '저는 …라고 생각해요.'], ['Für mich ist wichtig, dass …', '저에게는 …이 중요해요.']] },
    { g: '이유 대기', items: [['…, weil man die Preise vergleichen kann.', '가격을 비교할 수 있어서요.'], ['Der Grund dafür ist, dass …', '그 이유는 …이기 때문이에요.'], ['Ein Vorteil ist, dass …', '한 가지 장점은 …이라는 점이에요.'], ['Ein Nachteil ist, dass …', '한 가지 단점은 …이라는 점이에요.']] },
    { g: '예 들기', items: [['Letzten Monat habe ich zum Beispiel …', '예를 들어 지난달에 저는 …'], ['Ich habe selbst erlebt, dass …', '…을 직접 겪은 적이 있어요.'], ['Bei mir ist es so: …', '제 경우는 이래요. …']] },
    { g: '반대쪽도 인정하기', items: [['Natürlich gibt es auch Nachteile.', '물론 단점도 있어요.'], ['Obwohl es praktisch ist, kaufe ich lieber im Geschäft.', '편리하기는 하지만 저는 가게에서 사는 것을 더 좋아해요.'], ['Auf der anderen Seite …', '다른 한편으로는 …']] },
    { g: '마무리하기', items: [['Deshalb finde ich: …', '그래서 저는 이렇게 생각해요. …'], ['Am besten ist eine Mischung aus beidem.', '두 가지를 섞는 것이 가장 좋아요.'], ['Das muss jeder selbst entscheiden.', '그건 각자 정할 일이에요.']] }
  ],
  uebung: [
    { t: 'fix', q: 'Meiner Meinung nach Online-Shopping ist praktisch.', a: ['Meiner Meinung nach ist Online-Shopping praktisch.'], e: 'Meiner Meinung nach 뒤에는 동사가 바로 와요.' },
    { t: 'fill', q: 'Ich finde, dass man im Internet viel Zeit ___. (sparen)', a: ['spart'], e: 'dass 문장에서는 동사가 맨 끝에 와요. 주어 man에 맞춰 spart예요.' },
    { t: 'mc', q: 'Ich stimme ___ zu.', o: ['diese Meinung', 'dieser Meinung', 'diesen Meinung'], a: 1, e: 'zustimmen + 3격이에요. die Meinung의 3격은 dieser Meinung이에요.' },
    { t: 'fill', q: 'Ich kaufe lieber im Geschäft, ___ Online-Shopping praktisch ist.', a: ['obwohl', 'auch wenn'], e: '「~이지만」으로 반대되는 내용을 잇는 접속사예요. 동사 ist가 끝에 있어요.' },
    { t: 'mc', q: '「내 경험에서 든 예」로 알맞은 문장은?', o: ['Viele Leute kaufen heute im Internet ein.', 'Letzte Woche habe ich online Schuhe bestellt, aber sie waren zu klein.', 'Online-Shopping hat Vorteile und Nachteile.'], a: 1, e: '내가 직접 겪은 일을 과거 시제로 쓴 문장이 경험에서 든 예예요. 나머지 둘은 일반적인 말이에요.' },
    { t: 'fix', q: 'Obwohl es praktisch ist, aber ich kaufe lieber im Geschäft.', a: ['Obwohl es praktisch ist, kaufe ich lieber im Geschäft.', 'Es ist praktisch, aber ich kaufe lieber im Geschäft.'], e: 'obwohl 문장 뒤에서는 aber 없이 동사 kaufe가 바로 와요. obwohl을 빼고 aber만 써도 돼요.' }
  ],
  aufgabe: {
    lead: 'Sie haben im Fernsehen eine Diskussionssendung zum Thema „Online einkaufen“ gesehen. Im Online-Gästebuch der Sendung finden Sie folgende Meinung:',
    brief: 'Paul: Ich kaufe fast nichts mehr im Internet. Die Kleidung passt oft nicht, und dann muss ich alles zurückschicken. Außerdem schließen immer mehr kleine Geschäfte in unserer Stadt. Das finde ich sehr schade.',
    punkte: ['Sagen Sie Ihre Meinung zum Thema.', 'Begründen Sie Ihre Meinung.', 'Nennen Sie ein Beispiel aus Ihrer eigenen Erfahrung.'],
    close: 'Schreiben Sie nun Ihre Meinung zum Thema (circa 80 Wörter).',
    ko: {
      lead: '텔레비전에서 「온라인 쇼핑」을 주제로 한 토론 프로그램을 봤어요. 프로그램의 온라인 게시판에 이런 의견이 올라와 있어요.',
      brief: '파울: 저는 이제 인터넷에서 거의 아무것도 사지 않아요. 옷이 안 맞을 때가 많고, 그러면 전부 반품해야 해요. 게다가 우리 도시에서는 작은 가게들이 점점 더 많이 문을 닫고 있어요. 그게 정말 안타까워요.',
      punkte: ['주제에 대한 내 의견을 말하세요.', '의견의 이유를 대세요.', '내 경험에서 예를 하나 드세요.'],
      close: '이제 이 주제에 대한 내 의견을 쓰세요. (80단어 정도)'
    }
  },
  check: ['부르는 말과 끝인사 없이 썼어요.', '게시판의 의견에 동의하는지 반대하는지 밝혔어요.', '내 의견을 분명하게 썼어요.', '이유를 weil이나 dass로 이었어요.', '내 경험에서 예를 하나 들었어요.', '마무리 문장을 썼어요.', '80단어 이상 썼어요.'],
  muster: {
    de: [
      'Ich kann Paul verstehen, aber ich sehe das anders. Meiner Meinung nach ist Online-Shopping sehr praktisch, weil man viel Zeit spart. Ich arbeite bis 19 Uhr, und danach sind viele Geschäfte schon geschlossen. Im Internet kann ich auch abends bestellen und in Ruhe die Preise vergleichen.',
      'Letzten Monat habe ich zum Beispiel einen Rucksack gekauft. Im Internet war er 20 Euro billiger als im Geschäft.',
      'Natürlich gibt es auch Nachteile. Schuhe und Hosen kaufe ich lieber im Laden, weil ich sie dort anprobieren kann. Deshalb finde ich: Am besten ist eine Mischung aus beidem.'
    ],
    ko: [
      '파울의 말은 이해하지만 저는 다르게 생각해요. 제 생각에는 온라인 쇼핑이 아주 편리해요. 시간을 많이 아낄 수 있어서요. 저는 저녁 7시까지 일하는데, 그 뒤에는 많은 가게가 이미 문을 닫아요. 인터넷에서는 저녁에도 주문할 수 있고 가격도 차분히 비교할 수 있어요.',
      '예를 들어 지난달에 배낭을 하나 샀어요. 인터넷에서는 가게보다 20유로 더 쌌어요.',
      '물론 단점도 있어요. 신발과 바지는 가게에서 사는 것을 더 좋아해요. 거기서는 입어 보고 신어 볼 수 있어서요. 그래서 저는 이렇게 생각해요. 두 가지를 섞는 것이 가장 좋아요.'
    ],
    notes: [
      { de: 'Ich kann Paul verstehen, aber ich sehe das anders.', ko: '게시판의 의견에 먼저 반응한 뒤 내 의견으로 넘어가요.' },
      { de: 'Meiner Meinung nach ist Online-Shopping sehr praktisch, weil …', ko: 'Meiner Meinung nach 뒤에 동사 ist가 바로 왔어요. 이유는 weil로 이었어요.' },
      { de: 'Letzten Monat habe ich zum Beispiel einen Rucksack gekauft.', ko: '내 경험에서 든 예예요. 지난 일이라 현재완료로 썼어요.' },
      { de: '20 Euro billiger als im Geschäft', ko: '「비교급 + als」로 두 곳의 가격을 비교했어요.' },
      { de: 'Natürlich gibt es auch Nachteile.', ko: '반대쪽도 인정하면 글이 균형 있어 보여요.' },
      { de: 'Deshalb finde ich: …', ko: '쌍점(:) 뒤에 결론을 한 문장으로 정리했어요.' }
    ]
  }
},
{
  id: 'b1-04', level: 'B1', no: 4,
  title: 'Wie war der Kochkurs?', titleKo: '친구에게 경험 전하기',
  type: 'Persönliche E-Mail', typeKo: '개인 이메일',
  exam: 'Goethe-Zertifikat B1 쓰기 Aufgabe 1과 같은 유형',
  time: 20, words: [80, 110],
  intro: '함께 가지 못한 친구에게 요리 수업이 어땠는지 전하는 이메일을 써요. 이 유형의 요구 사항은 늘 같은 순서로 나와요. 설명하기, 이유 대기, 제안하기예요.',
  goals: ['지난 일을 현재완료와 과거형(war, hatte)으로 설명해요', 'am besten과 weil로 가장 좋았던 것과 이유를 말해요', 'Wie wäre es, wenn …?로 제안해요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Liebe Julia,' },
    { de: 'Einleitung', ko: '도입', ex: 'schade, dass du am Samstag nicht dabei sein konntest!' },
    { de: 'Beschreiben', ko: '설명하기', ex: 'Der Kochkurs war wirklich toll. Wir waren zu acht.' },
    { de: 'Begründen', ko: '이유 대기', ex: 'Am besten hat mir das Curry geschmeckt, weil es scharf war.' },
    { de: 'Vorschlag', ko: '제안하기', ex: 'Wie wäre es, wenn wir nächsten Samstag zusammen kochen?' },
    { de: 'Schluss und Gruß', ko: '마무리와 끝인사', ex: 'Melde dich bald! / Liebe Grüße / Minseo' }
  ],
  tipps: [
    '과제의 동사를 보세요. Beschreiben Sie는 어땠는지 두세 문장으로, Begründen Sie는 weil로 이유를, Machen Sie einen Vorschlag는 언제 어디서 할지 구체적으로 제안하라는 뜻이에요.',
    '지난 일은 현재완료로 쓰고, sein과 haben은 과거형 war, hatte를 써요. Der Kurs war toll. Wir haben gekocht.',
    '「좋았다」만 쓰지 말고 누가 있었는지, 무엇을 했는지, 분위기가 어땠는지 가운데 두 가지를 쓰면 설명이 충분해요.',
    '채점 기준에 글의 짜임이 들어 있어요. 부르는 말, 도입 한 문장, 마무리 한 문장, 끝인사를 빠뜨리지 마세요.'
  ],
  fehler: [
    { f: 'Der Kurs hat mir sehr gefallt.', r: 'Der Kurs hat mir sehr gefallen.', e: 'gefallen의 과거분사는 gefallen이에요.' },
    { f: 'Das Curry war lecker, weil es war scharf.', r: 'Das Curry war lecker, weil es scharf war.', e: 'weil 문장에서는 동사 war가 맨 끝에 와요.' },
    { f: 'Wie wäre es, wenn wir kochen zusammen?', r: 'Wie wäre es, wenn wir zusammen kochen?', e: 'wenn 문장에서도 동사가 맨 끝에 와요.' },
    { f: 'Hast du Lust, zusammen kochen?', r: 'Hast du Lust, zusammen zu kochen?', e: 'Lust haben 뒤에는 zu + 원형이 와요.' }
  ],
  redemittel: [
    { g: '도입', items: [['Schade, dass du nicht dabei sein konntest!', '함께하지 못해서 아쉬웠어요!'], ['Wie geht es dir? Ich habe am Samstag an dich gedacht.', '어떻게 지내요? 토요일에 생각이 났어요.'], ['Ich muss dir unbedingt vom Kochkurs erzählen.', '요리 수업 이야기를 꼭 해 주고 싶어요.']] },
    { g: '설명하기', items: [['Der Kochkurs war wirklich toll.', '요리 수업은 정말 좋았어요.'], ['Wir waren zu acht.', '우리는 여덟 명이었어요.'], ['Wir haben zusammen ein Menü gekocht.', '함께 코스 요리를 만들었어요.'], ['Die Köchin hat alles sehr gut erklärt.', '요리사 선생님이 모든 것을 아주 잘 설명해 줬어요.'], ['Die Stimmung war super.', '분위기가 아주 좋았어요.']] },
    { g: '가장 좋았던 것과 이유', items: [['Am besten hat mir das Curry geschmeckt, weil …', '카레가 가장 맛있었어요. …해서요.'], ['Besonders gut hat mir gefallen, dass …', '…이 특히 마음에 들었어요.'], ['So etwas hatte ich noch nie gegessen.', '그런 음식은 한 번도 먹어 본 적이 없었어요.']] },
    { g: '제안하기', items: [['Wie wäre es, wenn wir zusammen kochen?', '우리 같이 요리하면 어때요?'], ['Hast du Lust, nächsten Samstag zu mir zu kommen?', '다음 토요일에 우리 집에 올래요?'], ['Wir könnten das Curry zusammen kochen.', '카레를 같이 만들 수도 있어요.'], ['Ich schlage vor, dass wir uns am Wochenende treffen.', '주말에 만나면 좋겠어요.']] },
    { g: '마무리', items: [['Melde dich bald!', '곧 연락 주세요!'], ['Ich freue mich auf deine Antwort.', '답장 기다릴게요.'], ['Liebe Grüße', '안부를 전해요']] }
  ],
  uebung: [
    { t: 'fill', q: 'Der Kochkurs hat mir sehr gut ___. (gefallen)', a: ['gefallen'], e: 'gefallen은 원형과 과거분사의 모양이 같아요.' },
    { t: 'fix', q: 'Wie wäre es, wenn wir kochen zusammen?', a: ['Wie wäre es, wenn wir zusammen kochen?'], e: 'wenn 문장에서는 동사가 맨 끝에 와요.' },
    { t: 'mc', q: 'Hast du Lust, ___?', o: ['mitkommen', 'mitzukommen', 'zu mitkommen'], a: 1, e: '분리동사는 zu가 접두어와 동사 사이에 들어가요. mit + zu + kommen.' },
    { t: 'fill', q: 'Schade, dass du nicht dabei sein ___. (können, 과거형)', a: ['konntest'], e: 'können의 과거형은 konnte예요. du에 맞춰 konntest가 되고, dass 문장이라 맨 끝에 와요.' },
    { t: 'mc', q: '요구 사항 「Begründen Sie: Welches Gericht hat Ihnen am besten geschmeckt und warum?」에 가장 알맞은 문장은?', o: ['Wir haben drei Gerichte gekocht.', 'Am besten hat mir die Suppe geschmeckt, weil sie schön scharf war.', 'Die Suppe war das erste Gericht.'], a: 1, e: 'Begründen은 이유를 대라는 뜻이에요. 가장 맛있었던 음식과 weil로 이은 이유가 함께 있어야 해요.' },
    { t: 'fill', q: 'Am ___ hat mir die Nachspeise geschmeckt. (gut, 최상급)', a: ['besten'], e: 'gut의 최상급은 am besten이에요.' }
  ],
  aufgabe: {
    lead: 'Sie haben am Samstag einen Kochkurs besucht. Ihre Freundin Julia wollte mitkommen, hatte aber keine Zeit.',
    punkte: ['Beschreiben Sie: Wie war der Kochkurs?', 'Begründen Sie: Welches Gericht hat Ihnen am besten geschmeckt und warum?', 'Machen Sie einen Vorschlag für einen gemeinsamen Kochabend.'],
    close: 'Schreiben Sie eine E-Mail (circa 80 Wörter). Schreiben Sie etwas zu allen drei Punkten. Achten Sie auf den Textaufbau (Anrede, Einleitung, Reihenfolge der Inhaltspunkte, Schluss).',
    ko: {
      lead: '토요일에 요리 수업에 다녀왔어요. 친구 율리아도 같이 가고 싶어 했지만 시간이 없었어요.',
      punkte: ['설명하세요: 요리 수업은 어땠나요?', '이유를 대세요: 어떤 음식이 가장 맛있었고, 왜 그랬나요?', '함께 요리하는 저녁 모임을 제안하세요.'],
      close: '이메일을 쓰세요. (80단어 정도) 세 가지 내용을 모두 쓰세요. 글의 짜임(부르는 말, 도입, 내용 순서, 마무리)에 신경 쓰세요.'
    }
  },
  check: ['부르는 말과 도입 문장을 썼어요.', '요리 수업이 어땠는지 두 문장 이상으로 설명했어요.', '가장 맛있었던 음식과 이유를 썼어요.', '언제, 어디서 할지 구체적으로 제안했어요.', '지난 일을 현재완료나 과거형으로 썼어요.', '마무리 문장과 끝인사를 썼어요.', '80단어 이상 썼어요.'],
  muster: {
    de: [
      'Liebe Julia,',
      'schade, dass du am Samstag nicht dabei sein konntest! Der Kochkurs war wirklich toll. Wir waren zu acht und haben zusammen ein thailändisches Menü gekocht. Die Köchin hat alles sehr gut erklärt, und die Stimmung war super.',
      'Am besten hat mir das grüne Curry geschmeckt, weil es scharf und gleichzeitig ein bisschen süß war. So etwas hatte ich noch nie gegessen.',
      'Ich habe alle Rezepte mitgenommen. Wie wäre es, wenn wir nächsten Samstag bei mir zusammen kochen? Dann kannst du das Curry selbst probieren. Melde dich bald!',
      'Liebe Grüße\nMinseo'
    ],
    ko: [
      '율리아에게,',
      '토요일에 함께하지 못해서 아쉬웠어요! 요리 수업은 정말 좋았어요. 여덟 명이서 태국식 코스 요리를 함께 만들었어요. 요리사 선생님이 모든 것을 아주 잘 설명해 줬고 분위기도 아주 좋았어요.',
      '그린 카레가 가장 맛있었어요. 매우면서도 살짝 달았거든요. 그런 음식은 한 번도 먹어 본 적이 없었어요.',
      '요리법을 전부 가져왔어요. 다음 토요일에 우리 집에서 같이 요리하면 어때요? 그러면 카레를 직접 맛볼 수 있어요. 곧 연락 주세요!',
      '안부를 전하며,\n민서'
    ],
    notes: [
      { de: 'schade, dass du … nicht dabei sein konntest!', ko: '도입 문장이에요. dass 문장이라 과거형 konntest가 맨 끝에 왔어요.' },
      { de: 'Wir waren zu acht …', ko: '「zu + 숫자」는 「~명이서」라는 뜻이에요. zu zweit, zu dritt, zu acht.' },
      { de: 'Am besten hat mir das grüne Curry geschmeckt, weil …', ko: '가장 좋았던 것(am besten)과 이유(weil)를 한 문장에 담아 두 번째 요구 사항에 정확히 답했어요.' },
      { de: 'So etwas hatte ich noch nie gegessen.', ko: '과거완료(hatte + 과거분사)예요. 그날보다 더 이전의 경험을 말해요.' },
      { de: 'Wie wäre es, wenn wir nächsten Samstag bei mir zusammen kochen?', ko: '언제(nächsten Samstag), 어디서(bei mir)가 들어 있어서 구체적인 제안이 돼요.' }
    ]
  }
},
{
  id: 'b1-05', level: 'B1', no: 5,
  title: 'Anfrage an die Volkshochschule', titleKo: '정보를 요청하는 격식 메일 쓰기',
  type: 'Formelle Anfrage', typeKo: '격식 문의 메일',
  exam: 'telc Deutsch B1 · DTZ 쓰기처럼 요구 사항 네 가지에 답하는 문의 메일 유형',
  time: 30, words: [80, 110],
  intro: '강좌 광고를 보고 시민대학(Volkshochschule)에 정보를 요청하는 격식 메일을 써요. 직접 묻는 질문을 간접의문문으로 바꿔 정중하게 묻는 연습을 해요.',
  goals: ['Könnten Sie mir bitte mitteilen, …로 정중하게 물어요', '간접의문문에서 동사를 끝에 두고, 의문사가 없으면 ob을 써요', '격식 메일의 첫 문장과 마무리 문장을 익혀요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Sehr geehrte Damen und Herren,' },
    { de: 'Grund für das Schreiben', ko: '메일을 쓰는 이유', ex: 'in Ihrem Programm habe ich die Anzeige für den Fotokurs gelesen.' },
    { de: 'Eigene Situation', ko: '내 상황', ex: 'Ich fotografiere seit einem Jahr in meiner Freizeit.' },
    { de: 'Fragen', ko: '질문', ex: 'Könnten Sie mir bitte mitteilen, wie viel der Kurs kostet?' },
    { de: 'Schlusssatz', ko: '마무리 문장', ex: 'Über eine baldige Antwort würde ich mich freuen.' },
    { de: 'Gruß', ko: '끝인사', ex: 'Mit freundlichen Grüßen / Hyunwoo Jang' }
  ],
  tipps: [
    '격식 메일에서는 질문을 간접의문문으로 바꾸면 정중해요. Was kostet der Kurs? → Könnten Sie mir bitte mitteilen, was der Kurs kostet?',
    '간접의문문에서는 동사가 맨 끝에 와요. 의문사가 없는 질문(Ja/Nein 질문)은 ob으로 시작해요.',
    '첫 문장에서 무엇을 보고 쓰는지 밝혀요. in Ihrem Programm, auf Ihrer Internetseite, in der Zeitung.',
    '요구 사항 하나에 단락 하나를 쓰고, 질문이 여러 개면 Außerdem으로 이어 주세요.'
  ],
  fehler: [
    { f: 'Können Sie mir sagen, was kostet der Kurs?', r: 'Können Sie mir sagen, was der Kurs kostet?', e: '간접의문문에서는 동사 kostet가 맨 끝에 와요.' },
    { f: 'Ich möchte wissen, wenn es noch freie Plätze gibt.', r: 'Ich möchte wissen, ob es noch freie Plätze gibt.', e: '「~인지 아닌지」는 wenn이 아니라 ob이에요.' },
    { f: 'Ich freue mich auf Ihre Antwort bald.', r: 'Ich freue mich auf Ihre baldige Antwort.', e: 'bald는 부사라서 명사를 꾸밀 수 없어요. 형용사 baldig를 명사 앞에 써요.' },
    { f: 'Ich habe Ihre Anzeige mit großes Interesse gelesen.', r: 'Ich habe Ihre Anzeige mit großem Interesse gelesen.', e: 'mit 뒤는 3격이에요. 관사 없는 중성 3격의 형용사 어미는 -em이에요.' }
  ],
  redemittel: [
    { g: '메일을 쓰는 이유', items: [['In Ihrem Programm habe ich die Anzeige für den Fotokurs gelesen.', '프로그램 안내에서 사진 강좌 광고를 읽었습니다.'], ['Ich interessiere mich sehr für diesen Kurs.', '이 강좌에 관심이 많습니다.'], ['Ich schreibe Ihnen, weil ich noch einige Fragen habe.', '몇 가지 여쭤볼 것이 있어 메일을 드립니다.']] },
    { g: '내 상황 말하기', items: [['Ich fotografiere seit einem Jahr in meiner Freizeit.', '1년 전부터 여가 시간에 사진을 찍고 있습니다.'], ['Ich habe noch nie einen Kurs besucht.', '강좌를 들어 본 적은 아직 없습니다.'], ['Ich habe schon etwas Erfahrung mit …', '…에 경험이 조금 있습니다.'], ['Ich bin Anfänger. / Ich bin Anfängerin.', '저는 초보자입니다.']] },
    { g: '정중하게 묻기', items: [['Könnten Sie mir bitte mitteilen, wie viel der Kurs kostet?', '수강료가 얼마인지 알려 주실 수 있겠습니까?'], ['Ich möchte gern wissen, ob der Kurs für mich geeignet ist.', '이 강좌가 저에게 맞는지 알고 싶습니다.'], ['Außerdem würde mich interessieren, ob …', '또한 …인지도 궁금합니다.'], ['Können Sie mir sagen, um wie viel Uhr der Kurs beginnt?', '강좌가 몇 시에 시작하는지 알려 주실 수 있습니까?']] },
    { g: '등록 묻기', items: [['Wie kann ich mich anmelden?', '등록은 어떻게 하면 됩니까?'], ['Gibt es ein Formular auf Ihrer Internetseite?', '홈페이지에 신청서가 있습니까?'], ['Bis wann muss ich mich anmelden?', '언제까지 등록해야 합니까?'], ['Gibt es noch freie Plätze?', '아직 자리가 남아 있습니까?']] },
    { g: '마무리와 끝인사', items: [['Über eine baldige Antwort würde ich mich freuen.', '빠른 답변을 주시면 감사하겠습니다.'], ['Vielen Dank im Voraus für Ihre Mühe.', '수고에 미리 감사드립니다.'], ['Mit freundlichen Grüßen', '안녕히 계십시오 (격식 있는 끝인사)']] }
  ],
  uebung: [
    { t: 'fix', q: 'Können Sie mir sagen, was kostet der Kurs?', a: ['Können Sie mir sagen, was der Kurs kostet?'], e: '간접의문문에서는 동사가 맨 끝에 와요.' },
    { t: 'fill', q: 'Ich möchte wissen, ___ es noch freie Plätze gibt.', a: ['ob'], e: '의문사가 없는 질문은 ob으로 시작하는 간접의문문이 돼요.' },
    { t: 'mc', q: '「Wann beginnt der Kurs?」를 간접의문문으로 바르게 바꾼 것은?', o: ['Könnten Sie mir mitteilen, wann beginnt der Kurs?', 'Könnten Sie mir mitteilen, wann der Kurs beginnt?', 'Könnten Sie mir mitteilen, ob wann der Kurs beginnt?'], a: 1, e: '의문사 wann은 그대로 두고 동사 beginnt를 맨 끝으로 보내요.' },
    { t: 'fill', q: 'Über eine baldige Antwort ___ ich mich freuen.', a: ['würde'], e: 'würde + 원형은 접속법 II예요. 바람을 정중하게 말할 때 써요.' },
    { t: 'fill', q: 'Ich habe Ihre Anzeige mit ___ Interesse gelesen. (groß)', a: ['großem'], e: 'mit + 3격이에요. 관사가 없으면 형용사가 관사 어미 -em을 가져요.' },
    { t: 'mc', q: '격식 메일의 마무리 문장으로 알맞은 것은?', o: ['Schreib mir bald!', 'Über eine baldige Antwort würde ich mich freuen.', 'Antworten Sie sofort!'], a: 1, e: '첫 문장은 친구에게 쓰는 말이고, 셋째 문장은 명령처럼 들려요.' }
  ],
  aufgabe: {
    lead: 'Sie haben im Programm der Volkshochschule diese Anzeige gelesen:',
    brief: 'Fotokurs für Anfänger\nLernen Sie an vier Samstagen, bessere Fotos zu machen!\nBeginn: 6. März · Informationen und Anmeldung: Volkshochschule Mitte',
    punkte: ['Grund für Ihr Schreiben', 'Ihre Erfahrungen mit dem Fotografieren', 'Fragen zu Preis und Kurszeiten', 'Anmeldung'],
    close: 'Schreiben Sie eine E-Mail an die Volkshochschule. Schreiben Sie etwas zu allen vier Punkten (etwa 80–110 Wörter). Denken Sie an Anrede, Einleitung, Schluss und Gruß.',
    ko: {
      lead: '시민대학(Volkshochschule) 프로그램 안내에서 이 광고를 읽었어요.',
      brief: '초보자를 위한 사진 강좌\n토요일 네 번에 걸쳐 사진을 더 잘 찍는 법을 배워 보세요!\n시작: 3월 6일 · 안내와 등록: 미테 시민대학',
      punkte: ['메일을 쓰는 이유', '사진 촬영 경험', '가격과 수업 시간에 대한 질문', '등록'],
      close: '시민대학에 이메일을 쓰세요. 네 가지 내용을 모두 쓰세요(80–110단어 정도). 부르는 말, 도입, 마무리, 끝인사를 잊지 마세요.'
    }
  },
  check: ['Sehr geehrte Damen und Herren,으로 시작했어요.', '무엇을 보고 쓰는지 밝혔어요.', '내 사진 촬영 경험을 썼어요.', '가격과 수업 시간을 물었어요.', '등록 방법을 물었어요.', '질문 가운데 하나 이상을 간접의문문으로 썼어요.', '마무리 문장과 Mit freundlichen Grüßen으로 끝냈어요.'],
  muster: {
    de: [
      'Sehr geehrte Damen und Herren,',
      'in Ihrem Programm habe ich die Anzeige für den Fotokurs gelesen und interessiere mich sehr dafür.',
      'Ich fotografiere seit einem Jahr in meiner Freizeit, habe aber noch nie einen Kurs besucht. Deshalb möchte ich gern wissen, ob der Kurs auch für mich geeignet ist.',
      'Könnten Sie mir bitte mitteilen, wie viel der Kurs kostet und um wie viel Uhr er beginnt? Außerdem würde mich interessieren, ob ich eine eigene Kamera mitbringen muss.',
      'Wie kann ich mich anmelden? Gibt es ein Formular auf Ihrer Internetseite?',
      'Über eine baldige Antwort würde ich mich freuen.',
      'Mit freundlichen Grüßen\nHyunwoo Jang'
    ],
    ko: [
      '담당자님께,',
      '프로그램 안내에서 사진 강좌 광고를 읽었고, 이 강좌에 관심이 많습니다.',
      '저는 1년 전부터 여가 시간에 사진을 찍고 있지만 강좌를 들어 본 적은 없습니다. 그래서 이 강좌가 저에게도 맞는지 알고 싶습니다.',
      '수강료가 얼마인지, 그리고 몇 시에 시작하는지 알려 주실 수 있겠습니까? 또한 제 카메라를 가져가야 하는지도 궁금합니다.',
      '등록은 어떻게 하면 됩니까? 홈페이지에 신청서가 있습니까?',
      '빠른 답변을 주시면 감사하겠습니다.',
      '안녕히 계십시오.\n장현우 드림'
    ],
    notes: [
      { de: 'in Ihrem Programm habe ich die Anzeige … gelesen', ko: '첫 문장에서 무엇을 보고 쓰는지 밝혔어요. 요구 사항 「Grund für Ihr Schreiben」에 답하는 문장이에요.' },
      { de: '… und interessiere mich sehr dafür.', ko: 'dafür = für den Fotokurs. 앞에 나온 말을 「da + 전치사」로 받았어요.' },
      { de: 'Deshalb möchte ich gern wissen, ob der Kurs auch für mich geeignet ist.', ko: '의문사 없는 질문이라 ob으로 시작하고 동사 ist가 맨 끝이에요.' },
      { de: 'Könnten Sie mir bitte mitteilen, wie viel der Kurs kostet und um wie viel Uhr er beginnt?', ko: '질문 두 개를 간접의문문으로 만들어 und로 이었어요. 두 동사 모두 끝에 있어요.' },
      { de: 'Außerdem würde mich interessieren, ob …', ko: '질문을 하나 더 할 때 쓰는 정중한 표현이에요.' },
      { de: 'Über eine baldige Antwort würde ich mich freuen.', ko: '격식 메일의 대표적인 마무리 문장이에요. 통째로 외워 두세요.' }
    ]
  }
},

{
  id: 'b1-06', level: 'B1', no: 6,
  title: 'Einen Termin höflich absagen', titleKo: '약속을 정중하게 취소하기',
  type: 'Formelle Absage', typeKo: '격식 있는 취소 메일',
  exam: 'Goethe-Zertifikat B1 쓰기 Aufgabe 3과 같은 유형',
  time: 15, words: [40, 60],
  intro: '선생님이 잡아 준 상담 약속에 갈 수 없을 때 정중하게 사과하고 이유를 알리는 짧은 격식 메일을 써요. 40단어 안팎의 짧은 글에서 격식을 지키는 연습을 해요.',
  goals: ['고마움, 취소, 이유, 새 제안을 네다섯 문장에 담아요', 'da, leider, Wäre es möglich, …로 정중하게 말해요', 'absagen과 verschieben을 구별해 써요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Sehr geehrte Frau Hoffmann,' },
    { de: 'Dank', ko: '감사', ex: 'vielen Dank für die Einladung zum Beratungsgespräch am Donnerstag.' },
    { de: 'Absage und Grund', ko: '취소와 이유', ex: 'Leider muss ich den Termin absagen, da ich …' },
    { de: 'Entschuldigung', ko: '사과', ex: 'Das tut mir sehr leid.' },
    { de: 'Neuer Vorschlag', ko: '새 제안', ex: 'Wäre es möglich, das Gespräch auf Freitag zu verschieben?' },
    { de: 'Gruß', ko: '끝인사', ex: 'Mit freundlichen Grüßen / Jimin Seo' }
  ],
  tipps: [
    '이 과제는 40단어 정도예요. 부르는 말과 끝인사를 빼면 서너 문장이니, 문장마다 할 일을 하나씩 맡기세요.',
    '이유는 구체적으로 한 가지만 써요. 「시간이 없어서」보다 「그날 관청에 약속이 있어서」가 설득력이 있어요.',
    'absagen은 「취소하다」, verschieben auf + 4격은 「~로 미루다」예요.',
    '취소만 하지 말고 새 날짜를 제안하면 성의가 전해져요.'
  ],
  fehler: [
    { f: 'Leider ich muss den Termin absagen.', r: 'Leider muss ich den Termin absagen.', e: 'Leider가 첫 자리에 오면 동사 muss가 두 번째 자리에 와요.' },
    { f: 'Ich muss den Termin absagen, da ich habe einen anderen Termin.', r: 'Ich muss den Termin absagen, da ich einen anderen Termin habe.', e: 'da는 weil처럼 종속접속사예요. 동사가 맨 끝에 와요.' },
    { f: 'Wäre es möglich, das Gespräch auf Freitag verschieben?', r: 'Wäre es möglich, das Gespräch auf Freitag zu verschieben?', e: 'Es ist möglich 뒤에는 zu + 원형을 써요.' },
    { f: 'Können wir das Gespräch am Freitag verschieben?', r: 'Können wir das Gespräch auf Freitag verschieben?', e: '「~로 미루다」는 verschieben auf + 4격이에요.' }
  ],
  redemittel: [
    { g: '감사하기', items: [['Vielen Dank für die Einladung zum Beratungsgespräch.', '상담에 불러 주셔서 감사합니다.'], ['Vielen Dank für Ihre Nachricht.', '연락 주셔서 감사합니다.']] },
    { g: '취소하기', items: [['Leider muss ich den Termin absagen.', '죄송하지만 약속을 취소해야 합니다.'], ['Leider kann ich an diesem Tag nicht kommen.', '죄송하지만 그날은 갈 수 없습니다.'], ['Zu meinem Bedauern kann ich den Termin nicht wahrnehmen.', '유감스럽게도 그 약속에 갈 수 없습니다.']] },
    { g: '이유 말하기', items: [['…, da ich an diesem Tag einen Termin bei der Ausländerbehörde habe.', '그날 외국인청에 약속이 있어서'], ['…, weil ich an diesem Tag arbeiten muss.', '그날 일해야 해서'], ['Ich habe an diesem Tag eine Prüfung.', '그날 시험이 있습니다.']] },
    { g: '사과하기', items: [['Das tut mir sehr leid.', '정말 죄송합니다.'], ['Ich bitte um Ihr Verständnis.', '양해를 부탁드립니다.'], ['Ich möchte mich dafür entschuldigen.', '그 점 사과드립니다.']] },
    { g: '새로 제안하기', items: [['Wäre es möglich, das Gespräch auf Freitag zu verschieben?', '상담을 금요일로 미룰 수 있겠습니까?'], ['Hätten Sie nächste Woche Zeit?', '다음 주에 시간이 있으십니까?'], ['Ich könnte am Montag nach dem Unterricht kommen.', '월요일 수업 뒤에는 갈 수 있습니다.']] },
    { g: '끝인사', items: [['Mit freundlichen Grüßen', '안녕히 계십시오 (격식 있는 끝인사)']] }
  ],
  uebung: [
    { t: 'fix', q: 'Ich muss absagen, da ich habe einen anderen Termin.', a: ['Ich muss absagen, da ich einen anderen Termin habe.'], e: 'da 문장에서는 동사가 맨 끝에 와요.' },
    { t: 'fill', q: 'Wäre es möglich, das Gespräch auf Freitag ___ verschieben?', a: ['zu'], e: 'Es ist möglich, … 뒤에는 zu + 원형이 와요.' },
    { t: 'mc', q: '「약속을 금요일로 미루다」로 알맞은 것은?', o: ['den Termin am Freitag verschieben', 'den Termin auf Freitag verschieben', 'den Termin für Freitag absagen'], a: 1, e: 'verschieben auf + 4격이에요.' },
    { t: 'mc', q: '선생님께 쓰는 취소 메일에 가장 알맞은 문장은?', o: ['Ich komme nicht. Tschüs!', 'Leider muss ich den Termin absagen.', 'Der Termin passt mir überhaupt nicht.'], a: 1, e: 'leider와 müssen을 쓰면 어쩔 수 없는 사정이라는 뜻이 전해져요.' },
    { t: 'fill', q: '___ Sie nächste Woche Zeit? (haben, 접속법 II)', a: ['Hätten'], e: 'haben의 접속법 II는 hätten이에요. 정중하게 물을 때 써요.' },
    { t: 'fill', q: 'Ich bitte ___ Ihr Verständnis.', a: ['um'], e: 'bitten um + 4격이에요.' }
  ],
  aufgabe: {
    lead: 'Ihre Kursleiterin, Frau Hoffmann, hat Sie für Donnerstag zu einem Beratungsgespräch über Ihre Lernfortschritte eingeladen. Zu dem Termin können Sie nicht kommen. Schreiben Sie an Frau Hoffmann.',
    punkte: ['Entschuldigen Sie sich höflich.', 'Berichten Sie, warum Sie nicht kommen können.', 'Schlagen Sie einen neuen Termin vor.'],
    close: 'Schreiben Sie eine E-Mail (etwa 40–60 Wörter). Vergessen Sie nicht die Anrede und den Gruß am Schluss.',
    ko: {
      lead: '담당 선생님인 호프만 선생님이 목요일에 학습 상담을 하자고 했어요. 그런데 그 시간에 갈 수 없어요. 호프만 선생님께 메일을 쓰세요.',
      punkte: ['정중하게 사과하세요.', '왜 갈 수 없는지 알리세요.', '새 날짜를 제안하세요.'],
      close: '이메일을 쓰세요(40–60단어 정도). 부르는 말과 끝인사를 잊지 마세요.'
    }
  },
  check: ['Sehr geehrte Frau Hoffmann,으로 시작했어요.', '초대에 고맙다고 하거나 사과하는 말을 썼어요.', '갈 수 없는 이유를 구체적으로 썼어요.', '새 날짜를 제안했어요.', 'da·weil 문장에서 동사가 맨 끝에 있어요.', '처음부터 끝까지 Sie로 썼어요.', 'Mit freundlichen Grüßen과 내 이름으로 끝냈어요.'],
  muster: {
    de: [
      'Sehr geehrte Frau Hoffmann,',
      'vielen Dank für die Einladung zum Beratungsgespräch am Donnerstag. Leider muss ich den Termin absagen, da ich an diesem Tag einen wichtigen Termin bei der Ausländerbehörde habe. Das tut mir sehr leid.',
      'Wäre es möglich, das Gespräch auf Freitag zu verschieben?',
      'Mit freundlichen Grüßen\nJimin Seo'
    ],
    ko: [
      '호프만 선생님께,',
      '목요일 상담에 불러 주셔서 감사합니다. 죄송하지만 그날 외국인청에 중요한 약속이 있어서 상담 약속을 취소해야 합니다. 정말 죄송합니다.',
      '상담을 금요일로 미룰 수 있겠습니까?',
      '안녕히 계십시오.\n서지민 드림'
    ],
    notes: [
      { de: 'vielen Dank für die Einladung zum Beratungsgespräch am Donnerstag.', ko: '취소하는 메일도 감사로 시작하면 정중해요. 어떤 약속인지도 함께 밝혔어요.' },
      { de: 'Leider muss ich den Termin absagen, da ich …', ko: 'leider + müssen으로 어쩔 수 없다는 뜻을 전해요. da는 weil보다 조금 격식 있는 말이에요.' },
      { de: '… einen wichtigen Termin bei der Ausländerbehörde habe.', ko: '이유를 구체적으로 썼어요. da 문장이라 동사 habe가 맨 끝이에요.' },
      { de: 'Wäre es möglich, das Gespräch auf Freitag zu verschieben?', ko: '접속법 II로 정중하게 제안했어요. verschieben auf + 4격, zu + 원형이에요.' },
      { de: 'Mit freundlichen Grüßen', ko: '끝인사 뒤에는 쉼표나 마침표를 찍지 않아요.' }
    ]
  }
},
{
  id: 'b1-07', level: 'B1', no: 7,
  title: 'Handyverbot an Schulen?', titleKo: '방송 게시판에 의견 쓰기',
  type: 'Diskussionsbeitrag', typeKo: '토론 글',
  exam: 'Goethe-Zertifikat B1 쓰기 Aufgabe 2와 같은 유형',
  time: 25, words: [80, 110],
  intro: '다른 사람의 의견을 읽고 부분적으로만 동의하는 의견 글을 써요. 상대의 말을 인정한 뒤 trotzdem으로 내 입장을 밝히고, 경험에서 나온 예로 뒷받침해요.',
  goals: ['Ich kann … nur teilweise zustimmen.으로 부분 동의를 말해요', 'Natürlich …, trotzdem …으로 인정한 뒤 반박해요', 'statt … zu + 원형, seit 문장을 써서 예를 들어요'],
  aufbau: [
    { de: 'Bezug', ko: '상대 의견에 반응', ex: 'Ich kann Lukas nur teilweise zustimmen.' },
    { de: 'Zugeständnis', ko: '인정하는 점', ex: 'Natürlich gehören Handys heute zum Alltag, …' },
    { de: 'Eigene Meinung', ko: '내 의견', ex: 'Trotzdem bin ich dafür, dass Handys im Unterricht ausgeschaltet bleiben.' },
    { de: 'Begründung und Beispiel', ko: '이유와 예', ex: 'Mein jüngerer Bruder zum Beispiel …' },
    { de: 'Schluss', ko: '결론', ex: 'Deshalb finde ich klare Regeln sinnvoll.' }
  ],
  tipps: [
    '토론 글에는 부르는 말과 끝인사가 없어요. 상대 의견에 반응하는 문장으로 바로 시작해요.',
    '상대 의견을 조금 인정한 다음 내 의견을 쓰면 글이 균형 있게 보여요. Natürlich …, trotzdem …',
    'trotzdem은 문장의 첫 자리를 차지해요. 바로 뒤에 동사가 와요. Trotzdem bin ich dafür, …',
    '예는 내 주변 이야기가 좋아요. Mein Bruder zum Beispiel …, In meinem Heimatland …'
  ],
  fehler: [
    { f: 'Trotzdem ich bin dafür.', r: 'Trotzdem bin ich dafür.', e: 'trotzdem 바로 뒤에 동사가 와요.' },
    { f: 'Ich stimme mit Lukas zu.', r: 'Ich stimme Lukas zu.', e: 'zustimmen은 전치사 없이 3격과 함께 써요.' },
    { f: 'Viele Schüler schauen auf ihr Handy, statt zuhören.', r: 'Viele Schüler schauen auf ihr Handy, statt zuzuhören.', e: 'statt … zu + 원형이에요. 분리동사는 zu가 가운데에 들어가요.' },
    { f: 'Ich bin dafür, dass Handys bleiben ausgeschaltet.', r: 'Ich bin dafür, dass Handys ausgeschaltet bleiben.', e: 'dass 문장에서는 동사 bleiben이 맨 끝에 와요.' }
  ],
  redemittel: [
    { g: '상대 의견에 반응하기', items: [['Ich kann Lukas nur teilweise zustimmen.', '루카스의 말에 일부만 동의해요.'], ['Ich bin ganz anderer Meinung als Lukas.', '저는 루카스와 생각이 아주 달라요.'], ['Lukas hat recht, wenn er sagt, dass …', '…라고 한 루카스의 말은 맞아요.']] },
    { g: '인정한 뒤 반박하기', items: [['Natürlich gehören Handys heute zum Alltag.', '물론 휴대폰은 오늘날 일상의 일부예요.'], ['Es stimmt zwar, dass …, aber …', '…인 것은 맞지만 …'], ['Trotzdem bin ich dafür, dass …', '그래도 저는 …에 찬성해요.'], ['Auf der anderen Seite …', '다른 한편으로는 …']] },
    { g: '내 의견 말하기', items: [['Meiner Meinung nach lenken Handys zu stark ab.', '제 생각에 휴대폰은 주의를 너무 많이 빼앗아요.'], ['Ich bin dafür. / Ich bin dagegen.', '찬성해요. / 반대해요.'], ['Ich halte ein komplettes Verbot für übertrieben.', '전면 금지는 지나치다고 생각해요.'], ['Ich finde klare Regeln sinnvoll.', '분명한 규칙이 의미 있다고 생각해요.']] },
    { g: '이유와 예 들기', items: [['Viele Schüler schauen ständig auf ihre Nachrichten, statt zuzuhören.', '많은 학생이 듣지 않고 계속 메시지를 봐요.'], ['Mein jüngerer Bruder zum Beispiel …', '예를 들어 제 남동생은 …'], ['Seit seine Schule die Handys einsammelt, …', '학교에서 휴대폰을 걷은 뒤로 …'], ['Ein weiterer Vorteil ist, dass …', '또 하나의 좋은 점은 …라는 거예요.']] },
    { g: '결론 맺기', items: [['Deshalb finde ich klare Regeln sinnvoll.', '그래서 분명한 규칙이 의미 있다고 생각해요.'], ['Insgesamt bin ich der Meinung, dass …', '전체적으로 저는 …라고 생각해요.']] }
  ],
  uebung: [
    { t: 'fix', q: 'Trotzdem ich bin für klare Regeln.', a: ['Trotzdem bin ich für klare Regeln.'], e: 'trotzdem 바로 뒤에 동사가 와요.' },
    { t: 'mc', q: '바른 문장은?', o: ['Ich stimme mit Lukas zu.', 'Ich stimme Lukas zu.', 'Ich stimme den Lukas zu.'], a: 1, e: 'zustimmen + 3격이에요. 전치사를 쓰지 않아요.' },
    { t: 'fill', q: 'Viele Schüler schauen aufs Handy, statt ___. (zuhören)', a: ['zuzuhören'], e: '분리동사의 zu는 앞부분과 동사 사이에 들어가요. zu + zu + hören' },
    { t: 'fill', q: 'Ich halte ein Verbot ___ übertrieben.', a: ['für'], e: 'etwas für + 형용사 halten은 「~을 ~라고 생각하다」예요.' },
    { t: 'mc', q: '「~인 것은 맞지만」으로 알맞은 것은?', o: ['Es stimmt zwar, dass …, aber …', 'Es stimmt weil, dass …, aber …', 'Es stimmt obwohl, dass …'], a: 0, e: 'zwar … aber는 인정한 뒤 반박할 때 쓰는 짝이에요.' },
    { t: 'fix', q: 'Ich bin dafür, dass Handys bleiben ausgeschaltet.', a: ['Ich bin dafür, dass Handys ausgeschaltet bleiben.'], e: 'dass 문장에서는 동사가 맨 끝에 와요.' }
  ],
  aufgabe: {
    lead: 'Sie haben im Fernsehen eine Diskussionssendung zum Thema „Handyverbot an Schulen“ gesehen. Im Online-Gästebuch der Sendung finden Sie folgende Meinung:',
    brief: 'Lukas: Ich finde ein Handyverbot an Schulen falsch. Handys gehören heute einfach zum Leben. Die Schüler sollen lieber lernen, wie man sie sinnvoll benutzt. Verbote bringen doch nichts!',
    punkte: ['Reagieren Sie auf die Meinung von Lukas.', 'Schreiben Sie Ihre eigene Meinung.', 'Begründen Sie Ihre Meinung und nennen Sie ein Beispiel.'],
    close: 'Schreiben Sie nun Ihre Meinung (etwa 80–110 Wörter).',
    ko: {
      lead: '텔레비전에서 「학교의 휴대폰 금지」를 주제로 한 토론 방송을 봤어요. 방송의 온라인 게시판에 이런 의견이 있어요.',
      brief: '루카스: 저는 학교에서 휴대폰을 금지하는 것이 잘못이라고 생각해요. 휴대폰은 이제 삶의 일부예요. 학생들은 휴대폰을 의미 있게 쓰는 법을 배우는 편이 나아요. 금지는 아무 소용이 없어요!',
      punkte: ['루카스의 의견에 반응하세요.', '내 의견을 쓰세요.', '이유를 대고 예를 하나 드세요.'],
      close: '이제 내 의견을 쓰세요(80–110단어 정도).'
    }
  },
  check: ['루카스의 의견에 동의하는지 밝혔어요.', '내 의견을 분명하게 썼어요.', '이유를 두 가지 이상 썼어요.', '예를 하나 들었어요.', '결론 문장으로 끝냈어요.', 'trotzdem, deshalb 뒤에 동사를 바로 썼어요.', '부르는 말과 끝인사 없이 썼어요.'],
  muster: {
    de: [
      'Ich kann Lukas nur teilweise zustimmen. Natürlich gehören Handys heute zum Alltag, und im Unterricht kann man damit schnell etwas recherchieren. Trotzdem bin ich dafür, dass Handys während des Unterrichts ausgeschaltet bleiben.',
      'Meiner Meinung nach lenken sie zu stark ab: Viele Schüler schauen ständig auf ihre Nachrichten, statt zuzuhören. Mein jüngerer Bruder zum Beispiel kann sich viel besser konzentrieren, seit seine Schule die Handys morgens einsammelt. In den Pausen sprechen die Schüler außerdem wieder mehr miteinander.',
      'Deshalb finde ich klare Regeln sinnvoll. Ein komplettes Verbot auf dem ganzen Schulgelände halte ich aber für übertrieben.'
    ],
    ko: [
      '루카스의 말에 일부만 동의해요. 물론 휴대폰은 오늘날 일상의 일부이고, 수업에서 휴대폰으로 무언가를 빨리 찾아볼 수도 있어요. 그래도 저는 수업 시간에는 휴대폰을 꺼 두는 데 찬성해요.',
      '제 생각에 휴대폰은 주의를 너무 많이 빼앗아요. 많은 학생이 듣지 않고 계속 메시지를 봐요. 예를 들어 제 남동생은 학교에서 아침마다 휴대폰을 걷은 뒤로 훨씬 잘 집중해요. 게다가 쉬는 시간에 학생들이 다시 서로 이야기를 더 많이 해요.',
      '그래서 분명한 규칙이 의미 있다고 생각해요. 하지만 학교 안 어디에서나 전면 금지하는 것은 지나치다고 생각해요.'
    ],
    notes: [
      { de: 'Ich kann Lukas nur teilweise zustimmen.', ko: '첫 문장에서 상대 의견에 반응했어요. zustimmen + 3격이에요.' },
      { de: 'Natürlich …, Trotzdem bin ich dafür, dass …', ko: '먼저 인정하고, trotzdem으로 내 입장을 밝혔어요. trotzdem 뒤에 동사가 바로 와요.' },
      { de: 'während des Unterrichts', ko: 'während + 2격이에요. 「수업 동안」' },
      { de: '…, statt zuzuhören.', ko: 'statt … zu + 원형은 「~하지 않고」예요. 분리동사 zuhören이라 zuzuhören이 돼요.' },
      { de: '… kann sich viel besser konzentrieren, seit seine Schule die Handys morgens einsammelt.', ko: 'seit가 접속사로 쓰였어요. 동사 einsammelt가 맨 끝이고 분리동사가 다시 붙어요.' },
      { de: 'Ein komplettes Verbot … halte ich aber für übertrieben.', ko: '4격 목적어가 첫 자리에 왔어요. 마지막에 내 입장의 한계를 밝혀 균형을 잡았어요.' }
    ]
  }
},
{
  id: 'b1-08', level: 'B1', no: 8,
  title: 'Reklamation: Die neue Waschmaschine', titleKo: '고장 난 물건에 대해 항의 메일 쓰기',
  type: 'Formelle Reklamation', typeKo: '격식 항의 메일',
  exam: 'telc Deutsch B1 · DTZ 쓰기의 항의(Reklamation) 유형',
  time: 30, words: [80, 110],
  intro: '새로 산 세탁기가 고장 났을 때 가게에 보내는 항의 메일을 써요. 언제 무엇을 샀는지, 무엇이 문제인지, 무엇을 원하는지를 차분하고 분명하게 전해요.',
  goals: ['구입 날짜와 물건을 첫 문장에서 밝혀요', '문제를 구체적으로 설명해요', 'Ich bitte Sie, … zu + 원형으로 요구를 정중하게 말해요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Sehr geehrte Damen und Herren,' },
    { de: 'Kauf', ko: '언제 무엇을 샀는지', ex: 'am 3. Mai habe ich in Ihrem Geschäft eine Waschmaschine gekauft.' },
    { de: 'Problem', ko: '문제', ex: 'Die Maschine verliert Wasser, und die Tür lässt sich nur schwer öffnen.' },
    { de: 'Forderung', ko: '요구', ex: 'Ich bitte Sie, einen Techniker zu schicken oder die Maschine umzutauschen.' },
    { de: 'Erreichbarkeit', ko: '연락 방법', ex: 'Sie erreichen mich am besten per E-Mail.' },
    { de: 'Schluss und Gruß', ko: '마무리와 끝인사', ex: 'Ich hoffe auf eine schnelle Lösung. / Mit freundlichen Grüßen' }
  ],
  tipps: [
    '화가 나도 말투는 정중하게 유지해요. 사실을 정확하게 쓰는 것이 가장 강한 항의예요.',
    '날짜, 물건 이름, 영수증 번호를 쓰면 가게가 바로 확인할 수 있어요.',
    '요구는 하나로 분명하게 써요. 수리(reparieren), 교환(umtauschen), 환불(das Geld zurückbekommen) 가운데 무엇을 원하는지 밝혀요.',
    'Ich bitte Sie, … 뒤에는 zu + 원형이 와요. 분리동사는 umzutauschen처럼 zu가 가운데에 들어가요.'
  ],
  fehler: [
    { f: 'Ich habe am 3. Mai eine Waschmaschine in Ihrem Geschäft kaufen.', r: 'Ich habe am 3. Mai in Ihrem Geschäft eine Waschmaschine gekauft.', e: '현재완료는 haben + 과거분사예요. kaufen의 과거분사는 gekauft예요.' },
    { f: 'Ich bin mit das Gerät nicht zufrieden.', r: 'Ich bin mit dem Gerät nicht zufrieden.', e: 'zufrieden mit + 3격이에요. das Gerät의 3격은 dem Gerät예요.' },
    { f: 'Ich bitte Sie, die Maschine umtauschen.', r: 'Ich bitte Sie, die Maschine umzutauschen.', e: 'bitten 뒤에는 zu + 원형이에요. 분리동사 umtauschen은 umzutauschen이 돼요.' },
    { f: 'Die Tür kann man nur schwer sich öffnen.', r: 'Die Tür lässt sich nur schwer öffnen.', e: '「~이 잘 안 된다」는 sich lassen + 원형으로 말해요.' }
  ],
  redemittel: [
    { g: '구입 밝히기', items: [['Am 3. Mai habe ich in Ihrem Geschäft eine Waschmaschine gekauft.', '5월 3일에 귀하의 가게에서 세탁기를 샀습니다.'], ['Die Rechnungsnummer lautet 48215.', '영수증 번호는 48215입니다.'], ['Leider bin ich mit dem Gerät nicht zufrieden.', '유감스럽게도 이 제품에 만족하지 못합니다.']] },
    { g: '문제 설명하기', items: [['Schon nach einer Woche ist das erste Problem aufgetreten.', '일주일 만에 벌써 첫 문제가 생겼습니다.'], ['Die Maschine verliert Wasser.', '세탁기에서 물이 샙니다.'], ['Die Tür lässt sich nur schwer öffnen.', '문이 잘 열리지 않습니다.'], ['Außerdem ist sie beim Schleudern extrem laut.', '게다가 탈수할 때 몹시 시끄럽습니다.']] },
    { g: '요구하기', items: [['Da das Gerät noch Garantie hat, bitte ich Sie, einen Techniker zu schicken.', '제품의 보증 기간이 남아 있으니 수리 기사를 보내 주시기 바랍니다.'], ['Ich bitte Sie, die Maschine umzutauschen.', '세탁기를 교환해 주시기 바랍니다.'], ['Andernfalls möchte ich mein Geld zurückbekommen.', '그렇지 않으면 환불을 받고 싶습니다.'], ['Bitte teilen Sie mir mit, wann der Techniker kommen kann.', '수리 기사가 언제 올 수 있는지 알려 주십시오.']] },
    { g: '연락 방법 알리기', items: [['Sie erreichen mich am besten per E-Mail.', '이메일로 연락 주시는 것이 가장 좋습니다.'], ['Nachmittags ab 15 Uhr bin ich auch telefonisch erreichbar.', '오후 3시부터는 전화도 받을 수 있습니다.']] },
    { g: '마무리와 끝인사', items: [['Ich hoffe auf eine schnelle Lösung.', '빠른 해결을 기대합니다.'], ['Ich erwarte Ihre Antwort bis zum 20. Mai.', '5월 20일까지 답변을 기다리겠습니다.'], ['Mit freundlichen Grüßen', '안녕히 계십시오 (격식 있는 끝인사)']] }
  ],
  uebung: [
    { t: 'fill', q: 'Leider bin ich mit ___ Gerät nicht zufrieden. (das)', a: ['dem'], e: 'zufrieden mit + 3격이에요.' },
    { t: 'fix', q: 'Ich bitte Sie, die Maschine umtauschen.', a: ['Ich bitte Sie, die Maschine umzutauschen.'], e: '분리동사의 zu는 앞부분과 동사 사이에 들어가요.' },
    { t: 'mc', q: '「문이 잘 열리지 않습니다」로 알맞은 문장은?', o: ['Die Tür lässt sich nur schwer öffnen.', 'Die Tür lässt nur schwer öffnen.', 'Die Tür ist nur schwer sich öffnen.'], a: 0, e: 'sich lassen + 원형은 수동의 뜻(~될 수 있다)을 나타내요.' },
    { t: 'fill', q: 'Schon nach einer Woche ist das erste Problem ___. (auftreten)', a: ['aufgetreten'], e: 'auftreten의 과거분사는 aufgetreten이에요. sein과 함께 써요.' },
    { t: 'mc', q: '항의 메일의 말투로 가장 알맞은 문장은?', o: ['Ihre Maschine ist Schrott!', 'Leider bin ich mit dem Gerät nicht zufrieden.', 'Ich kaufe nie wieder bei Ihnen!'], a: 1, e: '격식 항의 메일에서는 사실을 차분하게 말해요.' },
    { t: 'fill', q: 'Ich hoffe ___ eine schnelle Lösung.', a: ['auf'], e: 'hoffen auf + 4격이에요.' }
  ],
  aufgabe: {
    lead: 'Sie haben vor zwei Wochen in einem Elektrogeschäft eine Waschmaschine gekauft. Die Maschine funktioniert nicht richtig. Schreiben Sie eine E-Mail an das Geschäft.',
    punkte: ['Grund für Ihr Schreiben', 'Was genau ist das Problem?', 'Was soll das Geschäft tun?', 'Wie kann man Sie erreichen?'],
    close: 'Schreiben Sie etwas zu allen vier Punkten (etwa 80–110 Wörter). Denken Sie an Anrede, Einleitung, Schluss und Gruß.',
    ko: {
      lead: '2주 전에 전자제품 가게에서 세탁기를 샀어요. 그런데 세탁기가 제대로 작동하지 않아요. 가게에 이메일을 쓰세요.',
      punkte: ['메일을 쓰는 이유', '정확히 무엇이 문제인가요?', '가게가 무엇을 해 주기를 원하나요?', '어떻게 연락하면 되나요?'],
      close: '네 가지 내용을 모두 쓰세요(80–110단어 정도). 부르는 말, 도입, 마무리, 끝인사를 잊지 마세요.'
    }
  },
  check: ['Sehr geehrte Damen und Herren,으로 시작했어요.', '언제 무엇을 샀는지 썼어요.', '문제를 두 가지 이상 구체적으로 썼어요.', '원하는 해결(수리, 교환, 환불)을 분명히 썼어요.', '연락 방법을 썼어요.', '정중한 말투를 끝까지 지켰어요.', '마무리 문장과 Mit freundlichen Grüßen으로 끝냈어요.'],
  muster: {
    de: [
      'Sehr geehrte Damen und Herren,',
      'am 3. Mai habe ich in Ihrem Geschäft eine Waschmaschine gekauft (Rechnungsnummer 48215). Leider bin ich mit dem Gerät nicht zufrieden.',
      'Schon nach einer Woche ist das erste Problem aufgetreten: Die Maschine verliert Wasser, und die Tür lässt sich nur schwer öffnen. Außerdem ist sie beim Schleudern extrem laut.',
      'Da das Gerät noch Garantie hat, bitte ich Sie, einen Techniker zu schicken oder die Maschine umzutauschen.',
      'Sie erreichen mich am besten per E-Mail oder nachmittags ab 15 Uhr telefonisch.',
      'Ich hoffe auf eine schnelle Lösung.',
      'Mit freundlichen Grüßen\nYerin Han'
    ],
    ko: [
      '담당자님께,',
      '5월 3일에 귀하의 가게에서 세탁기를 샀습니다(영수증 번호 48215). 유감스럽게도 이 제품에 만족하지 못합니다.',
      '일주일 만에 벌써 첫 문제가 생겼습니다. 세탁기에서 물이 새고 문이 잘 열리지 않습니다. 게다가 탈수할 때 몹시 시끄럽습니다.',
      '제품의 보증 기간이 남아 있으니 수리 기사를 보내 주시거나 세탁기를 교환해 주시기 바랍니다.',
      '이메일로 연락 주시는 것이 가장 좋고, 오후 3시부터는 전화도 받을 수 있습니다.',
      '빠른 해결을 기대합니다.',
      '안녕히 계십시오.\n한예린 드림'
    ],
    notes: [
      { de: 'am 3. Mai habe ich in Ihrem Geschäft eine Waschmaschine gekauft', ko: '날짜, 장소, 물건을 첫 문장에 모두 담았어요. 날짜가 첫 자리라 habe가 두 번째예요.' },
      { de: 'Leider bin ich mit dem Gerät nicht zufrieden.', ko: '항의의 뜻을 차분하게 밝히는 문장이에요. zufrieden mit + 3격.' },
      { de: '… die Tür lässt sich nur schwer öffnen.', ko: 'sich lassen + 원형은 「~될 수 있다」예요. 여기서는 「잘 열리지 않는다」.' },
      { de: 'beim Schleudern', ko: 'beim + 명사가 된 동사는 「~할 때」예요.' },
      { de: 'Da das Gerät noch Garantie hat, bitte ich Sie, einen Techniker zu schicken oder die Maschine umzutauschen.', ko: 'da 문장이 앞에 와서 주절의 동사 bitte가 바로 뒤에 왔어요. 요구는 zu + 원형으로 썼어요.' },
      { de: 'Ich hoffe auf eine schnelle Lösung.', ko: '항의 메일을 정중하게 마무리하는 문장이에요.' }
    ]
  }
},
{
  id: 'b1-09', level: 'B1', no: 9,
  title: 'Ein Rat für eine Freundin', titleKo: '고민하는 친구에게 조언하기',
  type: 'Persönliche E-Mail', typeKo: '개인 이메일',
  exam: 'telc Deutsch B1 · Goethe-Zertifikat B1 개인 이메일 유형',
  time: 25, words: [80, 110],
  intro: '새 도시에서 외로워하는 친구의 메일에 답장하면서 조언을 해요. 접속법 II로 부드럽게 권하는 표현을 익혀요.',
  goals: ['친구의 상황에 공감하는 말로 시작해요', 'An deiner Stelle würde ich …, Du könntest …로 조언해요', '내 경험을 이유로 덧붙여요'],
  aufbau: [
    { de: 'Anrede und Dank', ko: '부르는 말과 감사', ex: 'Liebe Sara, vielen Dank für deine E-Mail.' },
    { de: 'Mitgefühl', ko: '공감', ex: 'Es tut mir leid, dass du dich in Leipzig noch so allein fühlst.' },
    { de: 'Ratschläge', ko: '조언', ex: 'An deiner Stelle würde ich mich in einem Sportverein anmelden.' },
    { de: 'Eigene Erfahrung', ko: '내 경험', ex: 'Ich habe so meine beste Freundin kennengelernt.' },
    { de: 'Angebot', ko: '제안', ex: 'Wenn du Lust hast, besuche ich dich nächsten Monat.' },
    { de: 'Gruß', ko: '끝인사', ex: 'Kopf hoch und bis bald! / Deine Nari' }
  ],
  tipps: [
    '조언하기 전에 먼저 공감하는 문장을 써요. 바로 조언부터 하면 차갑게 들려요.',
    '명령문(Mach das!)보다 접속법 II가 부드러워요. Du könntest …, Du solltest …, An deiner Stelle würde ich …',
    '조언마다 이유나 내 경험을 한 문장 덧붙이면 설득력이 생겨요.',
    '요구 사항 하나에 단락 하나를 쓰면 빠뜨리지 않아요.'
  ],
  fehler: [
    { f: 'An deiner Stelle ich würde in einen Verein gehen.', r: 'An deiner Stelle würde ich in einen Verein gehen.', e: 'An deiner Stelle가 첫 자리라 동사 würde가 두 번째 자리에 와요.' },
    { f: 'Es tut mir leid, dass du fühlst dich allein.', r: 'Es tut mir leid, dass du dich allein fühlst.', e: 'dass 문장에서는 동사 fühlst가 맨 끝에 와요.' },
    { f: 'Du solltest einen Tandempartner zu suchen.', r: 'Du solltest einen Tandempartner suchen.', e: 'sollen은 화법조동사라서 zu 없이 원형과 함께 써요.' },
    { f: 'Ich habe meine beste Freundin kennenlernt.', r: 'Ich habe meine beste Freundin kennengelernt.', e: 'kennenlernen은 분리동사라서 과거분사는 kennen + ge + lernt예요.' }
  ],
  redemittel: [
    { g: '공감하기', items: [['Es tut mir leid, dass du dich so allein fühlst.', '그렇게 외롭다니 마음이 아파요.'], ['Das kann ich gut verstehen.', '그 마음 잘 알아요.'], ['Am Anfang ging es mir genauso.', '저도 처음에는 똑같았어요.'], ['Mach dir keine Sorgen!', '걱정하지 마요!']] },
    { g: '조언하기', items: [['An deiner Stelle würde ich mich in einem Sportverein anmelden.', '나라면 스포츠 클럽에 등록하겠어요.'], ['Du könntest auch einen Tandempartner suchen.', '탄뎀 파트너를 찾아볼 수도 있어요.'], ['Du solltest öfter rausgehen.', '더 자주 밖에 나가는 게 좋겠어요.'], ['Wie wäre es, wenn du einen Kochkurs machst?', '요리 강좌를 들어 보면 어때요?']] },
    { g: '이유와 경험 말하기', items: [['Dort lernt man schnell Leute kennen.', '거기서는 사람을 금방 사귀어요.'], ['Ich habe so meine beste Freundin kennengelernt.', '저는 그렇게 가장 친한 친구를 사귀었어요.'], ['Mir hat das damals sehr geholfen.', '저에게는 그때 그게 큰 도움이 됐어요.']] },
    { g: '제안하기', items: [['Wenn du Lust hast, besuche ich dich nächsten Monat.', '원하면 다음 달에 찾아갈게요.'], ['Dann erkunden wir zusammen die Stadt.', '그러면 같이 도시를 구경해요.'], ['Ruf mich an, wenn du reden möchtest.', '이야기하고 싶으면 전화해요.']] },
    { g: '끝인사', items: [['Kopf hoch!', '힘내요!'], ['Bis bald!', '곧 만나요!'], ['Deine Nari', '나리가']] }
  ],
  uebung: [
    { t: 'fix', q: 'An deiner Stelle ich würde einen Kurs machen.', a: ['An deiner Stelle würde ich einen Kurs machen.'], e: 'An deiner Stelle 바로 뒤에 동사 würde가 와요.' },
    { t: 'fill', q: 'Du ___ auch einen Tandempartner suchen. (können, 접속법 II)', a: ['könntest'], e: 'du와 함께 쓰는 können의 접속법 II는 könntest예요.' },
    { t: 'mc', q: '가장 부드러운 조언은?', o: ['Geh in einen Verein!', 'Du musst in einen Verein gehen.', 'Du könntest in einen Verein gehen.'], a: 2, e: '접속법 II könntest를 쓰면 권하는 말투가 돼요.' },
    { t: 'fix', q: 'Es tut mir leid, dass du fühlst dich allein.', a: ['Es tut mir leid, dass du dich allein fühlst.'], e: 'dass 문장에서는 동사가 맨 끝에 와요.' },
    { t: 'fill', q: 'Ich habe so meine beste Freundin ___. (kennenlernen)', a: ['kennengelernt'], e: '분리동사의 과거분사는 앞부분 + ge + 동사예요.' },
    { t: 'mc', q: '알맞은 것은? Wie wäre es, ___ du einen Kochkurs machst?', o: ['wenn', 'ob', 'dass'], a: 0, e: 'Wie wäre es, wenn …?은 제안할 때 쓰는 굳은 표현이에요.' }
  ],
  aufgabe: {
    lead: 'Ihre Freundin Sara hat Ihnen diese E-Mail geschrieben:',
    brief: 'Hallo!\nSeit zwei Monaten wohne ich jetzt in Leipzig. Die Arbeit gefällt mir, aber ich kenne hier noch niemanden. Am Wochenende sitze ich meistens allein zu Hause. Wie hast du das damals in Berlin gemacht? Hast du einen Tipp für mich?\nLiebe Grüße\nSara',
    punkte: ['Reagieren Sie auf Saras Situation.', 'Geben Sie Sara zwei Ratschläge.', 'Berichten Sie von Ihren eigenen Erfahrungen.', 'Machen Sie einen Vorschlag für ein Treffen.'],
    close: 'Schreiben Sie eine Antwort an Sara (etwa 80–110 Wörter). Schreiben Sie etwas zu allen vier Punkten.',
    ko: {
      lead: '친구 사라가 이런 이메일을 보냈어요.',
      brief: '안녕하세요!\n라이프치히에 산 지 이제 두 달이 됐어요. 일은 마음에 드는데 여기 아는 사람이 아직 아무도 없어요. 주말에는 거의 집에 혼자 있어요. 그때 베를린에서는 어떻게 했어요? 저에게 해 줄 조언이 있나요?\n안부를 전하며\n사라',
      punkte: ['사라의 상황에 반응하세요.', '사라에게 조언을 두 가지 하세요.', '내 경험을 이야기하세요.', '만나자고 제안하세요.'],
      close: '사라에게 답장을 쓰세요(80–110단어 정도). 네 가지 내용을 모두 쓰세요.'
    }
  },
  check: ['Liebe Sara,로 시작했어요.', '사라의 상황에 공감하는 말을 썼어요.', '조언을 두 가지 썼어요.', '내 경험을 썼어요.', '만나자고 제안했어요.', '접속법 II(würde, könntest, solltest)를 한 번 이상 썼어요.', '끝인사와 내 이름을 썼어요.'],
  muster: {
    de: [
      'Liebe Sara,',
      'vielen Dank für deine E-Mail. Es tut mir leid, dass du dich in Leipzig noch so allein fühlst. Das kann ich gut verstehen, denn am Anfang ging es mir in Berlin genauso.',
      'An deiner Stelle würde ich mich in einem Sportverein anmelden. Dort lernt man schnell Leute kennen, weil man jede Woche zusammen trainiert. Du könntest auch einen Tandempartner suchen. Ich habe so meine beste Freundin kennengelernt.',
      'Wenn du Lust hast, besuche ich dich nächsten Monat. Dann erkunden wir zusammen die Stadt.',
      'Kopf hoch und bis bald!\nDeine Nari'
    ],
    ko: [
      '사라에게,',
      '메일 고마워요. 라이프치히에서 아직 그렇게 외롭다니 마음이 아파요. 그 마음 잘 알아요. 저도 처음에 베를린에서 똑같았거든요.',
      '나라면 스포츠 클럽에 등록하겠어요. 매주 같이 운동하니까 거기서는 사람을 금방 사귀어요. 탄뎀 파트너를 찾아볼 수도 있어요. 저는 그렇게 가장 친한 친구를 사귀었어요.',
      '원하면 다음 달에 찾아갈게요. 그러면 같이 도시를 구경해요.',
      '힘내요, 곧 만나요!\n나리가'
    ],
    notes: [
      { de: 'Es tut mir leid, dass du dich in Leipzig noch so allein fühlst.', ko: '조언하기 전에 공감부터 했어요. dass 문장이라 동사 fühlst가 맨 끝이에요.' },
      { de: '…, denn am Anfang ging es mir in Berlin genauso.', ko: 'denn 뒤는 어순이 그대로예요. ging은 gehen의 과거형이에요.' },
      { de: 'An deiner Stelle würde ich mich in einem Sportverein anmelden.', ko: '「나라면 ~하겠다」는 조언의 대표 표현이에요. würde + 원형으로 써요.' },
      { de: 'Du könntest auch einen Tandempartner suchen.', ko: 'könntest로 두 번째 조언을 부드럽게 권했어요.' },
      { de: 'Wenn du Lust hast, besuche ich dich nächsten Monat.', ko: 'wenn 문장이 앞에 오면 주절은 동사로 시작해요. nächsten Monat은 4격으로 때를 나타내요.' }
    ]
  }
},
{
  id: 'b1-10', level: 'B1', no: 10,
  title: 'Auf eine Wohnungsanzeige antworten', titleKo: '집 광고에 문의 메일 쓰기',
  type: 'Formelle Anfrage', typeKo: '격식 문의 메일',
  exam: 'telc Deutsch B1 · DTZ 쓰기처럼 요구 사항 네 가지에 답하는 메일 유형 · 독일에서 집을 구할 때 쓰는 메일',
  time: 30, words: [80, 110],
  intro: '집 광고를 보고 집주인에게 보내는 문의 메일을 써요. 나를 믿을 만한 세입자로 소개하고, 집에 대해 묻고, 집을 볼 날짜를 제안해요.',
  goals: ['나이, 직업, 생활 방식을 짧게 소개해요', '간접의문문으로 집에 대해 물어요', 'Ich würde mir die Wohnung gern ansehen.으로 방문을 부탁해요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Sehr geehrte Frau Lindner,' },
    { de: 'Bezug auf die Anzeige', ko: '광고를 봤다는 말', ex: 'mit großem Interesse habe ich Ihre Anzeige … gelesen.' },
    { de: 'Angaben zur Person', ko: '나에 대한 소개', ex: 'Ich bin 29 Jahre alt und arbeite seit zwei Jahren als Ingenieur.' },
    { de: 'Fragen zur Wohnung', ko: '집에 대한 질문', ex: 'Könnten Sie mir bitte mitteilen, ob die Wohnung einen Balkon hat?' },
    { de: 'Besichtigung', ko: '집 보기', ex: 'Ich würde mir die Wohnung gern ansehen.' },
    { de: 'Schluss und Gruß', ko: '마무리와 끝인사', ex: 'Über eine Antwort würde ich mich sehr freuen. / Mit freundlichen Grüßen' }
  ],
  tipps: [
    '집주인은 믿을 만한 세입자를 찾아요. 직업, 일한 기간, 흡연과 반려동물 여부를 짧게 쓰면 좋아요.',
    '집에 대한 말을 익혀요. die Kaution(보증금), die Nebenkosten(관리비), warm(난방비 포함), kalt(난방비 제외), die Besichtigung(집 보기)',
    'sich etwas ansehen에서 sich는 3격이에요. Ich würde mir die Wohnung gern ansehen.',
    '집을 볼 수 있는 날을 내가 먼저 제안하면 약속이 빨리 잡혀요.'
  ],
  fehler: [
    { f: 'Ich würde mich die Wohnung gern ansehen.', r: 'Ich würde mir die Wohnung gern ansehen.', e: '4격 목적어(die Wohnung)가 있으면 재귀대명사는 3격 mir예요.' },
    { f: 'Ich arbeite seit zwei Jahren als ein Ingenieur.', r: 'Ich arbeite seit zwei Jahren als Ingenieur.', e: '직업 앞에는 관사를 쓰지 않아요.' },
    { f: 'Könnten Sie mir mitteilen, wie hoch ist die Kaution?', r: 'Könnten Sie mir mitteilen, wie hoch die Kaution ist?', e: '간접의문문에서는 동사 ist가 맨 끝에 와요.' },
    { f: 'Die Wohnung liegt in der Nähe vom Hauptbahnhofs.', r: 'Die Wohnung liegt in der Nähe des Hauptbahnhofs.', e: 'in der Nähe 뒤는 2격(des Hauptbahnhofs) 또는 von + 3격(vom Hauptbahnhof)이에요. 둘을 섞지 않아요.' }
  ],
  redemittel: [
    { g: '광고를 봤다고 말하기', items: [['Mit großem Interesse habe ich Ihre Anzeige gelesen.', '광고를 큰 관심을 갖고 읽었습니다.'], ['Ich suche zum 1. Juli eine neue Wohnung.', '7월 1일부터 살 새 집을 찾고 있습니다.'], ['Die Wohnung gefällt mir sehr gut.', '집이 무척 마음에 듭니다.']] },
    { g: '나를 소개하기', items: [['Ich bin 29 Jahre alt und komme aus Korea.', '저는 29살이고 한국에서 왔습니다.'], ['Ich arbeite seit zwei Jahren als Ingenieur bei einer Firma in Stuttgart.', '2년 전부터 슈투트가르트의 한 회사에서 엔지니어로 일하고 있습니다.'], ['Ich bin Nichtraucher und habe keine Haustiere.', '담배를 피우지 않고 반려동물도 없습니다.'], ['Ich habe ein festes Einkommen.', '고정 수입이 있습니다.']] },
    { g: '집에 대해 묻기', items: [['Könnten Sie mir bitte mitteilen, ob die Wohnung einen Balkon hat?', '집에 발코니가 있는지 알려 주실 수 있겠습니까?'], ['Ich möchte gern wissen, wie hoch die Kaution ist.', '보증금이 얼마인지 알고 싶습니다.'], ['Sind die Nebenkosten im Preis enthalten?', '관리비가 가격에 포함되어 있습니까?'], ['Gibt es eine Einbauküche?', '붙박이 주방이 있습니까?']] },
    { g: '집 보기 부탁하기', items: [['Ich würde mir die Wohnung gern ansehen.', '집을 보고 싶습니다.'], ['Wäre ein Termin am Samstagvormittag möglich?', '토요일 오전에 볼 수 있겠습니까?'], ['Wann wäre eine Besichtigung möglich?', '언제 집을 볼 수 있겠습니까?']] },
    { g: '마무리와 끝인사', items: [['Über eine Antwort würde ich mich sehr freuen.', '답변을 주시면 무척 감사하겠습니다.'], ['Mit freundlichen Grüßen', '안녕히 계십시오 (격식 있는 끝인사)']] }
  ],
  uebung: [
    { t: 'mc', q: '알맞은 것은? Ich würde ___ die Wohnung gern ansehen.', o: ['mich', 'mir', 'mein'], a: 1, e: '4격 목적어가 따로 있으면 재귀대명사는 3격이에요.' },
    { t: 'fix', q: 'Könnten Sie mir mitteilen, wie hoch ist die Kaution?', a: ['Könnten Sie mir mitteilen, wie hoch die Kaution ist?'], e: '간접의문문에서는 동사가 맨 끝에 와요.' },
    { t: 'fill', q: 'Ich arbeite seit zwei ___ als Ingenieur. (Jahr)', a: ['Jahren'], e: 'seit + 3격이에요. 복수 3격에는 -n이 붙어요.' },
    { t: 'fill', q: 'Ich möchte wissen, ___ die Wohnung einen Balkon hat.', a: ['ob'], e: '의문사가 없는 질문은 ob으로 시작하는 간접의문문이 돼요.' },
    { t: 'mc', q: '「650 € warm」의 뜻은?', o: ['난방비를 뺀 월세 650유로', '난방비 등 관리비를 포함한 월세 650유로', '보증금 650유로'], a: 1, e: 'warm은 난방비 같은 관리비가 포함된 월세(Warmmiete)를 말해요.' },
    { t: 'fill', q: 'Die Wohnung liegt in der Nähe ___ Hauptbahnhofs.', a: ['des'], e: 'in der Nähe + 2격이에요. 남성 2격 관사는 des이고 명사에 -s가 붙어요.' }
  ],
  aufgabe: {
    lead: 'Sie suchen eine Wohnung und haben im Internet diese Anzeige gelesen:',
    brief: '2-Zimmer-Wohnung, 55 m², Nähe Hauptbahnhof\n650 € warm, ab 1. Juli frei\nKontakt: Frau Lindner',
    punkte: ['Grund für Ihr Schreiben', 'Angaben zu Ihrer Person', 'Fragen zur Wohnung', 'Termin für eine Besichtigung'],
    close: 'Schreiben Sie eine E-Mail an Frau Lindner. Schreiben Sie etwas zu allen vier Punkten (etwa 80–110 Wörter). Denken Sie an Anrede, Einleitung, Schluss und Gruß.',
    ko: {
      lead: '집을 구하고 있는데 인터넷에서 이 광고를 읽었어요.',
      brief: '방 2개 집, 55 m², 중앙역 근처\n월세 650유로(관리비 포함), 7월 1일부터 입주 가능\n연락: 린트너 씨',
      punkte: ['메일을 쓰는 이유', '나에 대한 소개', '집에 대한 질문', '집을 볼 날짜'],
      close: '린트너 씨에게 이메일을 쓰세요. 네 가지 내용을 모두 쓰세요(80–110단어 정도). 부르는 말, 도입, 마무리, 끝인사를 잊지 마세요.'
    }
  },
  check: ['Sehr geehrte Frau Lindner,로 시작했어요.', '어떤 광고를 보고 쓰는지 밝혔어요.', '나이나 직업 등 나를 소개했어요.', '집에 대해 한 가지 이상 물었어요.', '집을 볼 날짜를 제안했어요.', '질문 가운데 하나 이상을 간접의문문으로 썼어요.', '마무리 문장과 Mit freundlichen Grüßen으로 끝냈어요.'],
  muster: {
    de: [
      'Sehr geehrte Frau Lindner,',
      'mit großem Interesse habe ich Ihre Anzeige für die 2-Zimmer-Wohnung in der Nähe des Hauptbahnhofs gelesen. Ich suche zum 1. Juli eine neue Wohnung.',
      'Ich bin 29 Jahre alt, komme aus Korea und arbeite seit zwei Jahren als Ingenieur bei einer Firma in Stuttgart. Ich bin Nichtraucher und habe keine Haustiere.',
      'Könnten Sie mir bitte mitteilen, ob die Wohnung einen Balkon hat und wie hoch die Kaution ist?',
      'Ich würde mir die Wohnung gern ansehen. Wäre ein Termin am Samstagvormittag möglich?',
      'Über eine Antwort würde ich mich sehr freuen.',
      'Mit freundlichen Grüßen\nDohyun Lim'
    ],
    ko: [
      '린트너 씨께,',
      '중앙역 근처 방 2개 집 광고를 큰 관심을 갖고 읽었습니다. 저는 7월 1일부터 살 새 집을 찾고 있습니다.',
      '저는 29살이고 한국에서 왔으며, 2년 전부터 슈투트가르트의 한 회사에서 엔지니어로 일하고 있습니다. 담배를 피우지 않고 반려동물도 없습니다.',
      '집에 발코니가 있는지, 그리고 보증금이 얼마인지 알려 주실 수 있겠습니까?',
      '집을 보고 싶습니다. 토요일 오전에 볼 수 있겠습니까?',
      '답변을 주시면 무척 감사하겠습니다.',
      '안녕히 계십시오.\n임도현 드림'
    ],
    notes: [
      { de: 'mit großem Interesse habe ich Ihre Anzeige … gelesen.', ko: '격식 문의 메일의 대표적인 첫 문장이에요. mit + 3격이라 großem이에요.' },
      { de: 'in der Nähe des Hauptbahnhofs', ko: 'in der Nähe + 2격이에요. 남성 명사에 -s가 붙어요.' },
      { de: 'Ich suche zum 1. Juli eine neue Wohnung.', ko: 'zum + 날짜는 「그 날짜부터, 그 날짜에 맞춰」예요. 계약과 이사에서 자주 써요.' },
      { de: '… arbeite seit zwei Jahren als Ingenieur', ko: '직업 앞에는 관사를 쓰지 않아요. seit + 3격, 현재형이에요.' },
      { de: 'Könnten Sie mir bitte mitteilen, ob … hat und wie hoch … ist?', ko: '질문 두 개를 간접의문문으로 묶었어요. 두 동사가 모두 끝에 있어요.' },
      { de: 'Ich würde mir die Wohnung gern ansehen.', ko: 'sich(3격) etwas(4격) ansehen이에요. würde gern으로 정중하게 바람을 말했어요.' }
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
    { g: '주제 소개와 입장', items: [['Ob …, wird zurzeit viel diskutiert.', '…인지 아닌지가 요즘 많이 논의되고 있어요.'], ['Ich halte … (nicht) für sinnvoll.', '저는 …이 의미 있다고(없다고) 봐요.'], ['Meiner Ansicht nach …', '제 생각에는 …'], ['Ich bin der Meinung, dass …', '저는 …라고 생각해요.']] },
    { g: '근거 대기', items: [['Dafür spricht vor allem, dass …', '이를 뒷받침하는 것은 무엇보다 …라는 점이에요.'], ['Ein wichtiger Grund ist …', '중요한 이유는 …이에요.'], ['Hinzu kommt, dass …', '게다가 …'], ['Das zeigt sich zum Beispiel daran, dass …', '이는 예를 들어 …라는 데서 드러나요.']] },
    { g: '반대 의견 다루기', items: [['Natürlich kann man einwenden, dass …', '물론 …라고 반박할 수 있어요.'], ['Zwar …, aber …', '…하기는 하지만 …'], ['Kritiker sagen, … Allerdings …', '비판하는 사람들은 …라고 말해요. 하지만 …']] },
    { g: '제안하기', items: [['Sinnvoller wäre es, … zu …', '…하는 편이 더 의미 있을 거예요.'], ['Ich schlage vor, dass …', '저는 …를 제안해요.'], ['Eltern sollten …', '부모는 …해야 할 거예요.']] },
    { g: '마무리', items: [['Zusammenfassend lässt sich sagen, dass …', '정리하면 …라고 할 수 있어요.'], ['Aus diesen Gründen bin ich gegen …', '이런 이유로 저는 …에 반대해요.']] }
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
      '14세 미만 어린이의 소셜 미디어 사용을 금지해야 하는지가 요즘 많이 논의되고 있어요. 저는 전면 금지가 가장 좋은 해결책이라고 보지 않아요.',
      '물론 많은 부모의 걱정은 이해해요. 아이들은 인터넷에서 자기에게 맞지 않는 내용을 자주 보고, 휴대폰 앞에서 너무 많은 시간을 보내요. 금지하면 아이들을 이런 것에서 지킬 수는 있겠지만 실제로는 거의 단속할 수 없을 거예요. 많은 아이가 그냥 나이를 속여 입력할 거예요.',
      '게다가 소셜 미디어는 오늘날 일상의 일부예요. 반 단체 대화방이나 학교 과제도 소셜 미디어로 이루어지는 경우가 많아서, 접근할 수 없는 아이는 금세 소외될 거예요. 열네 살이 되어서야 시작하는 아이는 그 전에 소셜 미디어를 비판적으로 다루는 법을 배워 본 적이 없어요.',
      '그래서 초등학교 때부터 미디어 활용 능력을 가르치는 편이 더 의미 있을 거예요. 부모는 아이와 함께 분명한 규칙을 정해야 해요. 예를 들면 휴대폰을 쓰는 시간을 정하고 어린이에게 맞는 설정을 해 두는 거예요.',
      '정리하면 이래요. 아이들에게 필요한 것은 금지가 아니라 곁에서 이끌어 주는 거예요.'
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
{
  id: 'b2-03', level: 'B2', no: 3,
  title: 'Nachricht an die Vorgesetzte', titleKo: '상사에게 사정 알리고 제안하기',
  type: 'Formelle Nachricht', typeKo: '직장 내 격식 메시지',
  exam: 'Goethe-Zertifikat B2 쓰기 Teil 2와 같은 유형',
  time: 25, words: [100, 140],
  intro: '맡은 발표를 할 수 없게 된 사정을 상사에게 알리는 메시지를 써요. 사정을 설명하고, 상대의 처지를 헤아리고, 해결책을 제안하고, 답을 부탁하는 네 가지를 자연스러운 순서로 배열하는 것이 핵심이에요.',
  goals: ['요구 사항의 순서를 스스로 정해 논리적으로 배열해요', 'Mir ist bewusst, dass …로 상대의 처지를 헤아려요', 'Ich würde vorschlagen, dass …로 해결책을 정중하게 제안해요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Sehr geehrte Frau Kaiser,' },
    { de: 'Situation erklären', ko: '사정 설명', ex: 'leider muss ich Ihnen mitteilen, dass ich die Präsentation am Donnerstag nicht halten kann.' },
    { de: 'Verständnis zeigen', ko: '상대의 처지 헤아리기', ex: 'Mir ist bewusst, dass meine Absage für Sie sehr kurzfristig kommt.' },
    { de: 'Lösung vorschlagen', ko: '해결책 제안', ex: 'Ich würde deshalb vorschlagen, dass Herr Demir die Präsentation übernimmt.' },
    { de: 'Um Rückmeldung bitten', ko: '답 부탁하기', ex: 'Für eine kurze Rückmeldung wäre ich Ihnen sehr dankbar.' },
    { de: 'Gruß', ko: '끝인사', ex: 'Mit freundlichen Grüßen / Soyeon Han' }
  ],
  tipps: [
    '과제의 요구 사항은 일부러 뒤섞여 나와요. 사정 설명 → 상대의 처지 헤아리기 → 해결책 → 답 부탁 순서로 다시 배열하세요.',
    '사정은 구체적으로 써야 설득력이 있어요. 「약속이 있다」에서 그치지 말고 무슨 약속인지, 왜 바꿀 수 없는지를 써요.',
    '해결책은 하나만 쓰지 말고 대안까지 내면 좋아요. Falls Sie es vorziehen, könnten wir auch …',
    '상사에게는 Konjunktiv II로 부드럽게 써요. Ich würde vorschlagen …, Wäre es möglich …?, Ich wäre Ihnen dankbar …'
  ],
  fehler: [
    { f: 'Ich kann nicht an die Präsentation teilnehmen.', r: 'Ich kann nicht an der Präsentation teilnehmen.', e: 'teilnehmen an + 3격이에요.' },
    { f: 'Ich habe einen Termin, der nicht verschieben kann.', r: 'Ich habe einen Termin, der sich nicht verschieben lässt.', e: '약속이 스스로 미루는 것이 아니에요. 「미뤄질 수 없다」는 sich lassen + 원형으로 써요.' },
    { f: 'Ich bitte Sie für Ihr Verständnis.', r: 'Ich bitte Sie um Ihr Verständnis.', e: 'bitten은 um과 함께 써요.' },
    { f: 'Bitte teilen Sie mir mit, ob Sie sind einverstanden.', r: 'Bitte teilen Sie mir mit, ob Sie einverstanden sind.', e: 'ob 문장에서는 동사가 맨 끝에 와요.' }
  ],
  redemittel: [
    { g: '사정 알리기', items: [['Leider muss ich Ihnen mitteilen, dass …', '유감스럽지만 …을 알려 드려야 합니다.'], ['An diesem Tag habe ich einen Termin bei der Ausländerbehörde.', '그날 외국인청에 예약이 있습니다.'], ['Auf diesen Termin habe ich drei Monate gewartet.', '이 예약을 석 달 동안 기다렸습니다.'], ['Der Termin lässt sich leider nicht verschieben.', '그 예약은 아쉽게도 미룰 수 없습니다.']] },
    { g: '상대의 처지 헤아리기', items: [['Mir ist bewusst, dass die Präsentation sehr wichtig ist.', '발표가 매우 중요하다는 점을 잘 알고 있습니다.'], ['Ich weiß, dass meine Absage sehr kurzfristig kommt.', '못 하게 됐다는 말씀을 너무 갑작스럽게 드린다는 점을 알고 있습니다.'], ['Das tut mir aufrichtig leid.', '진심으로 죄송합니다.'], ['Ich bitte Sie um Ihr Verständnis.', '너그러이 이해해 주시기를 부탁드립니다.']] },
    { g: '해결책 제안하기', items: [['Ich würde deshalb vorschlagen, dass Herr Demir die Präsentation übernimmt.', '그래서 데미르 씨가 발표를 맡는 방안을 제안드립니다.'], ['Wäre es möglich, den Termin auf Freitag zu verschieben?', '일정을 금요일로 옮기는 것이 가능하겠습니까?'], ['Falls Sie es vorziehen, könnten wir auch …', '원하신다면 …할 수도 있습니다.'], ['Die Folien bereite ich bis Mittwoch vor.', '발표 자료는 수요일까지 준비하겠습니다.']] },
    { g: '답 부탁하기', items: [['Für eine kurze Rückmeldung wäre ich Ihnen sehr dankbar.', '짧게라도 답을 주시면 대단히 감사하겠습니다.'], ['Bitte geben Sie mir Bescheid, ob Sie damit einverstanden sind.', '이 방안에 동의하시는지 알려 주시기 바랍니다.'], ['Könnten Sie mir bis morgen mitteilen, welche Lösung Ihnen lieber ist?', '어느 방안이 더 좋으신지 내일까지 알려 주실 수 있겠습니까?']] },
    { g: '끝맺기', items: [['Vielen Dank für Ihr Verständnis.', '이해해 주셔서 감사합니다.'], ['Mit freundlichen Grüßen', '안녕히 계십시오']] }
  ],
  uebung: [
    { t: 'mc', q: 'Ich kann leider nicht ___ Besprechung teilnehmen.', o: ['an die', 'an der', 'in der'], a: 1, e: 'teilnehmen an + 3격이에요. die Besprechung → an der Besprechung.' },
    { t: 'fill', q: 'Ich bitte Sie ___ Ihr Verständnis.', a: ['um'], e: 'jemanden um etwas bitten = 누구에게 무엇을 부탁하다.' },
    { t: 'fix', q: 'Ich habe einen Termin, der nicht verschieben kann.', a: ['Ich habe einen Termin, der sich nicht verschieben lässt.', 'Ich habe einen Termin, den ich nicht verschieben kann.', 'Ich habe einen Termin, der nicht verschoben werden kann.'], e: '약속은 미루는 주체가 아니에요. sich lassen + 원형이나 수동태로 쓰거나, 「내가 미룰 수 없는(den ich …)」으로 써요.' },
    { t: 'fill', q: 'Wäre es möglich, die Präsentation auf Freitag zu ___?', a: ['verschieben', 'verlegen'], e: 'etwas auf + 4격 verschieben = 무엇을 …으로 미루다. verlegen도 같은 뜻으로 써요.' },
    { t: 'mc', q: '상사에게 답을 부탁하는 문장으로 가장 알맞은 것은?', o: ['Antworten Sie mir bitte sofort.', 'Für eine kurze Rückmeldung wäre ich Ihnen sehr dankbar.', 'Sag mir Bescheid, ob das okay ist.'], a: 1, e: '첫 문장은 명령처럼 들리고, 셋째 문장은 du로 쓴 친구 사이의 말이에요.' },
    { t: 'fill', q: 'Mir ist ___, dass meine Absage sehr kurzfristig kommt.', a: ['bewusst', 'klar'], e: 'Mir ist bewusst, dass … = …을 잘 알고 있다. 상대의 처지를 헤아릴 때 써요.' }
  ],
  aufgabe: {
    lead: 'Sie arbeiten seit einem Jahr in einer deutschen Firma. Am Donnerstag sollen Sie vor einem wichtigen Kunden die Ergebnisse Ihres Projekts präsentieren. Genau an diesem Tag haben Sie aber einen Termin bei der Ausländerbehörde, den Sie nicht verschieben können. Schreiben Sie eine Nachricht an Ihre Vorgesetzte, Frau Kaiser.',
    punkte: ['Machen Sie einen Vorschlag, wie das Problem gelöst werden kann.', 'Erklären Sie, warum Sie am Donnerstag nicht präsentieren können.', 'Bitten Sie um eine Rückmeldung.', 'Zeigen Sie Verständnis für die Situation Ihrer Vorgesetzten.'],
    close: 'Überlegen Sie sich eine passende Reihenfolge für die Inhaltspunkte. Vergessen Sie nicht Anrede und Gruß. Schreiben Sie mindestens 100 Wörter.',
    ko: {
      lead: '독일 회사에서 1년째 일하고 있어요. 목요일에 중요한 고객 앞에서 프로젝트 결과를 발표해야 해요. 그런데 바로 그날 외국인청에 예약이 있고, 이 예약은 미룰 수 없어요. 상사인 카이저 씨에게 메시지를 쓰세요.',
      punkte: ['문제를 어떻게 해결할 수 있을지 제안하세요.', '목요일에 왜 발표할 수 없는지 설명하세요.', '답을 달라고 부탁하세요.', '상사의 처지를 이해한다는 것을 보여 주세요.'],
      close: '요구 사항을 알맞은 순서로 배열하세요. 부르는 말과 끝인사를 잊지 마세요. 100단어 이상 쓰세요.'
    }
  },
  check: ['Sehr geehrte Frau Kaiser,로 시작했어요.', '발표를 못 하는 이유를 구체적으로 썼어요.', '상사의 처지를 헤아리는 문장을 썼어요.', '해결책을 하나 이상 제안했어요.', '답을 부탁했어요.', '요구 사항을 논리적인 순서로 배열했어요.', 'Konjunktiv II로 정중하게 표현했어요.', '100단어 이상 썼어요.'],
  muster: {
    de: [
      'Sehr geehrte Frau Kaiser,',
      'leider muss ich Ihnen mitteilen, dass ich die Projektpräsentation am Donnerstag nicht halten kann. An diesem Tag habe ich einen Termin bei der Ausländerbehörde, um meinen Aufenthaltstitel zu verlängern. Auf diesen Termin habe ich drei Monate gewartet, und er lässt sich leider nicht verschieben.',
      'Mir ist bewusst, dass die Präsentation für unseren Kunden sehr wichtig ist und dass meine Absage für Sie sehr kurzfristig kommt. Das tut mir aufrichtig leid.',
      'Ich würde deshalb vorschlagen, dass Herr Demir die Präsentation übernimmt. Er kennt das Projekt genauso gut wie ich. Alle Folien bereite ich bis Mittwoch vor und gehe sie mit ihm gemeinsam durch. Falls Sie es vorziehen, könnten wir den Kunden auch um einen neuen Termin am Freitag bitten.',
      'Für eine kurze Rückmeldung wäre ich Ihnen sehr dankbar.',
      'Mit freundlichen Grüßen\nSoyeon Han'
    ],
    ko: [
      '카이저 님께,',
      '유감스럽지만 목요일 프로젝트 발표를 제가 할 수 없게 되었음을 알려 드립니다. 그날 체류 허가를 연장하러 외국인청에 가는 예약이 있습니다. 이 예약을 석 달 동안 기다렸고, 아쉽게도 미룰 수 없습니다.',
      '이번 발표가 고객사에 매우 중요하다는 점과, 못 하게 됐다는 말씀을 너무 갑작스럽게 드린다는 점을 잘 알고 있습니다. 진심으로 죄송합니다.',
      '그래서 데미르 씨가 발표를 맡는 방안을 제안드립니다. 데미르 씨는 이 프로젝트를 저만큼 잘 알고 있습니다. 발표 자료는 제가 수요일까지 모두 준비해서 데미르 씨와 함께 검토하겠습니다. 원하신다면 고객사에 금요일로 일정을 새로 잡아 달라고 요청할 수도 있습니다.',
      '짧게라도 답을 주시면 대단히 감사하겠습니다.',
      '안녕히 계십시오.\n한소연 드림'
    ],
    notes: [
      { de: 'leider muss ich Ihnen mitteilen, dass …', ko: '좋지 않은 소식을 격식 있게 알릴 때 쓰는 표현이에요.' },
      { de: '…, um meinen Aufenthaltstitel zu verlängern.', ko: 'um … zu로 목적을 밝혀 사정을 구체적으로 만들었어요.' },
      { de: 'er lässt sich leider nicht verschieben', ko: 'sich lassen + 원형 = 「…될 수 있다」. 수동태 대신 쓰는 표현이에요.' },
      { de: 'Mir ist bewusst, dass … und dass …', ko: '상대의 처지를 헤아리는 부분이에요. dass 문장 두 개를 und로 이었어요.' },
      { de: 'Ich würde deshalb vorschlagen, dass …', ko: 'Konjunktiv II로 제안을 부드럽게 했어요.' },
      { de: 'Falls Sie es vorziehen, könnten wir …', ko: '대안을 하나 더 내서 결정을 상사에게 맡겼어요.' }
    ]
  }
},
{
  id: 'b2-04', level: 'B2', no: 4,
  title: 'Bewerbung um eine Stelle', titleKo: '지원 편지(Anschreiben) 쓰기',
  type: 'Bewerbungsschreiben', typeKo: '지원 편지',
  exam: '독일어권에서 일자리·아르바이트·인턴에 지원할 때 쓰는 Anschreiben',
  time: 35, words: [150, 200],
  intro: '구인 광고를 보고 지원 편지(Anschreiben)를 써요. 이력서의 내용을 되풀이하는 글이 아니라, 광고가 요구하는 조건마다 그에 맞는 내 경험을 보여 주는 글이에요.',
  goals: ['광고의 요구 조건과 내 경험을 연결해 써요', 'sich bewerben um, verfügen über 같은 지원 편지의 동사와 전치사를 익혀요', '성격을 나열하지 않고 경험으로 증명해요'],
  aufbau: [
    { de: 'Betreff', ko: '제목 줄', ex: 'Bewerbung als Servicekraft im Frühstücksrestaurant' },
    { de: 'Anrede', ko: '부르는 말 (담당자 이름)', ex: 'Sehr geehrte Frau Sommer,' },
    { de: 'Einleitung', ko: '도입: 어느 자리에 왜 지원하는지', ex: 'mit großem Interesse habe ich Ihre Stellenanzeige gelesen.' },
    { de: 'Qualifikation', ko: '경력과 능력', ex: 'In Seoul habe ich zwei Jahre lang als Kellnerin gearbeitet.' },
    { de: 'Motivation', ko: '이 회사를 고른 이유', ex: 'An Ihrem Haus reizt mich vor allem der Kontakt mit internationalen Gästen.' },
    { de: 'Organisatorisches', ko: '일할 수 있는 시간과 시작일', ex: 'Beginnen könnte ich ab dem 1. April.' },
    { de: 'Schluss und Gruß', ko: '면접 요청과 끝인사', ex: 'Über eine Einladung zu einem Vorstellungsgespräch freue ich mich sehr. / Mit freundlichen Grüßen / Jiwon Seo' }
  ],
  tipps: [
    '광고에 담당자 이름이 있으면 꼭 그 이름으로 불러요. Sehr geehrte Damen und Herren은 이름이 없을 때만 써요.',
    '광고의 요구 조건에 밑줄을 긋고, 조건마다 그에 맞는 내 경험을 하나씩 써요. freundlich → 손님을 대한 경험, Englisch → 내 외국어 실력.',
    '「저는 성실합니다」는 증명할 수 없는 말이에요. 어디서 얼마 동안 무엇을 했는지 사실로 써요.',
    '마지막 문장은 자신 있게 써요. 지원 편지에서는 Ich würde mich freuen보다 Ich freue mich를 권하는 경우가 많아요.'
  ],
  fehler: [
    { f: 'Ich habe viel Erfahrung für den Service.', r: 'Ich habe viel Erfahrung im Service.', e: '어떤 분야의 경험은 Erfahrung in + 3격으로 말해요.' },
    { f: 'Ich verfüge gute Englischkenntnisse.', r: 'Ich verfüge über gute Englischkenntnisse.', e: 'verfügen은 über + 4격과 함께 써요.' },
    { f: 'Ich freue mich für eine Einladung zum Gespräch.', r: 'Ich freue mich über eine Einladung zum Gespräch.', e: 'sich freuen 뒤에는 über나 auf가 와요. für는 쓰지 않아요.' },
    { f: 'Ich habe als eine Kellnerin gearbeitet.', r: 'Ich habe als Kellnerin gearbeitet.', e: 'als + 직업에는 관사를 쓰지 않아요.' }
  ],
  redemittel: [
    { g: '도입', items: [['Mit großem Interesse habe ich Ihre Stellenanzeige gelesen.', '귀사의 구인 광고를 큰 관심을 가지고 읽었습니다.'], ['Hiermit bewerbe ich mich um die Stelle als Servicekraft.', '서비스 직원 자리에 지원합니다.'], ['Da ich gern mit Menschen arbeite, bewerbe ich mich bei Ihnen.', '사람을 대하는 일을 좋아하기에 귀사에 지원합니다.']] },
    { g: '경력과 능력', items: [['Ich habe zwei Jahre lang als Kellnerin gearbeitet.', '2년 동안 웨이트리스로 일했습니다.'], ['Ich habe bereits Erfahrung in der Gastronomie.', '요식업 경험이 이미 있습니다.'], ['Dabei habe ich gelernt, auch unter Zeitdruck freundlich zu bleiben.', '그 과정에서 시간에 쫓길 때도 친절함을 잃지 않는 법을 배웠습니다.'], ['Ich verfüge über gute Englischkenntnisse.', '영어를 잘합니다.'], ['Koreanisch ist meine Muttersprache.', '한국어는 제 모국어입니다.']] },
    { g: '지원 동기', items: [['An Ihrem Haus reizt mich vor allem …', '귀사에서 무엇보다 끌리는 점은 …입니다.'], ['Gern würde ich dazu beitragen, dass …', '…하는 데 기꺼이 보탬이 되고 싶습니다.'], ['Die Arbeit im Team macht mir viel Freude.', '팀으로 일하는 것을 무척 좋아합니다.']] },
    { g: '근무 조건', items: [['Ich kann jeden Vormittag arbeiten.', '오전에는 매일 일할 수 있습니다.'], ['Beginnen könnte ich ab dem 1. April.', '4월 1일부터 시작할 수 있습니다.'], ['Ich bin zeitlich flexibel.', '시간을 유연하게 조정할 수 있습니다.']] },
    { g: '마무리', items: [['Über eine Einladung zu einem Vorstellungsgespräch freue ich mich sehr.', '면접에 불러 주시면 대단히 기쁘겠습니다.'], ['Für Rückfragen stehe ich Ihnen gern zur Verfügung.', '궁금하신 점이 있으면 언제든 답변드리겠습니다.'], ['Mit freundlichen Grüßen', '안녕히 계십시오']] }
  ],
  uebung: [
    { t: 'fill', q: 'Ich verfüge ___ gute Englischkenntnisse.', a: ['über'], e: 'über etwas verfügen = 무엇을 갖추고 있다.' },
    { t: 'fix', q: 'Ich habe zwei Jahre als eine Kellnerin gearbeitet.', a: ['Ich habe zwei Jahre als Kellnerin gearbeitet.', 'Ich habe zwei Jahre lang als Kellnerin gearbeitet.'], e: 'als + 직업에는 관사를 쓰지 않아요.' },
    { t: 'mc', q: 'Ich habe bereits Erfahrung ___ Verkauf.', o: ['für den', 'im', 'an dem'], a: 1, e: 'Erfahrung in + 3격이에요. in dem Verkauf → im Verkauf.' },
    { t: 'fill', q: 'Über eine Einladung zu einem ___ freue ich mich sehr. (면접)', a: ['Vorstellungsgespräch', 'Bewerbungsgespräch', 'Gespräch'], e: 'das Vorstellungsgespräch = 면접. Bewerbungsgespräch라고도 해요.' },
    { t: 'mc', q: '지원 편지에 가장 알맞은 문장은?', o: ['Ich bin sehr fleißig, pünktlich und nett.', 'In Seoul habe ich zwei Jahre lang im Service eines Hotels gearbeitet.', 'Ich brauche dringend einen Job.'], a: 1, e: '성격을 나열하는 문장은 증명할 수 없어요. 어디서 얼마 동안 무엇을 했는지 쓴 문장이 설득력 있어요.' },
    { t: 'fill', q: 'Für Rückfragen stehe ich Ihnen gern zur ___.', a: ['Verfügung'], e: 'jemandem zur Verfügung stehen = 누구의 요청에 응할 준비가 되어 있다.' }
  ],
  aufgabe: {
    lead: 'Sie haben im Internet diese Stellenanzeige gefunden und möchten sich bewerben:',
    brief: 'Hotel Lindenhof (Heidelberg) sucht ab April:\nServicekraft (m/w/d) für das Frühstücksrestaurant, 20 Stunden pro Woche\nSie sind freundlich, zuverlässig und arbeiten gern im Team. Sie sprechen gut Deutsch und Englisch; weitere Sprachen sind willkommen. Erfahrung in der Gastronomie ist von Vorteil.\nIhre Bewerbung richten Sie bitte an Frau Sommer.',
    punkte: ['Warum interessieren Sie sich für diese Stelle?', 'Welche Erfahrungen und Fähigkeiten bringen Sie mit?', 'Ab wann und zu welchen Zeiten können Sie arbeiten?', 'Bitten Sie um ein Vorstellungsgespräch.'],
    close: 'Schreiben Sie ein Bewerbungsschreiben (etwa 150–200 Wörter). Denken Sie an Betreff, Anrede und Gruß.',
    ko: {
      lead: '인터넷에서 이 구인 광고를 보고 지원하려고 해요.',
      brief: '린덴호프 호텔(하이델베르크)에서 4월부터 일할 분을 찾습니다.\n조식 레스토랑 서비스 직원(성별 무관), 주 20시간\n친절하고 믿음직하며 팀으로 일하는 것을 좋아하는 분을 찾습니다. 독일어와 영어를 잘하셔야 하며, 다른 언어도 할 수 있으면 좋습니다. 요식업 경험이 있으면 우대합니다.\n지원서는 조머 씨 앞으로 보내 주세요.',
      punkte: ['왜 이 자리에 관심이 있나요?', '어떤 경험과 능력을 갖추고 있나요?', '언제부터, 어느 시간대에 일할 수 있나요?', '면접 기회를 달라고 부탁하세요.'],
      close: '지원 편지를 쓰세요(150–200단어 정도). 제목 줄, 부르는 말, 끝인사를 잊지 마세요.'
    }
  },
  check: ['제목 줄(Betreff)을 썼어요.', '담당자 이름으로 불렀어요.', '어느 자리에 지원하는지 첫 단락에서 밝혔어요.', '광고의 요구 조건에 맞는 경험을 사실로 썼어요.', '이 호텔에서 일하고 싶은 이유를 썼어요.', '일할 수 있는 시간과 시작일을 썼어요.', '면접을 요청하는 문장으로 끝냈어요.', '150단어 이상 썼어요.'],
  muster: {
    de: [
      'Bewerbung als Servicekraft im Frühstücksrestaurant',
      'Sehr geehrte Frau Sommer,',
      'mit großem Interesse habe ich Ihre Stellenanzeige gelesen. Da ich gern mit Menschen arbeite und bereits Erfahrung in der Gastronomie habe, bewerbe ich mich um die Stelle als Servicekraft.',
      'Ich komme aus Südkorea und studiere seit zwei Jahren Germanistik in Heidelberg. In Seoul habe ich zwei Jahre lang als Kellnerin in einem Hotelrestaurant gearbeitet. Dabei habe ich gelernt, auch unter Zeitdruck freundlich und aufmerksam zu bleiben. Die Arbeit im Team hat mir immer besonders viel Freude gemacht.',
      'Ich spreche sehr gut Deutsch und Englisch; Koreanisch ist meine Muttersprache. An Ihrem Haus reizt mich vor allem der Kontakt mit internationalen Gästen. Gern würde ich dazu beitragen, dass sich Ihre Gäste schon beim Frühstück wohlfühlen.',
      'Da meine Vorlesungen erst am Nachmittag stattfinden, kann ich jeden Vormittag und auch am Wochenende arbeiten. Beginnen könnte ich ab dem 1. April.',
      'Über eine Einladung zu einem Vorstellungsgespräch freue ich mich sehr.',
      'Mit freundlichen Grüßen\nJiwon Seo'
    ],
    ko: [
      '조식 레스토랑 서비스 직원 지원',
      '조머 님께,',
      '귀사의 구인 광고를 큰 관심을 가지고 읽었습니다. 저는 사람을 대하는 일을 좋아하고 요식업 경험도 이미 있어 서비스 직원 자리에 지원합니다.',
      '저는 한국 출신으로, 2년 전부터 하이델베르크에서 독어독문학을 공부하고 있습니다. 서울에서는 호텔 레스토랑에서 2년 동안 웨이트리스로 일했습니다. 그 과정에서 시간에 쫓길 때도 친절하고 세심한 태도를 잃지 않는 법을 배웠습니다. 팀으로 일하는 것은 언제나 특히 즐거웠습니다.',
      '독일어와 영어를 아주 잘하며, 한국어는 모국어입니다. 귀 호텔에서 무엇보다 끌리는 점은 여러 나라에서 온 손님들을 만날 수 있다는 것입니다. 손님들이 아침 식사 때부터 편안함을 느끼시도록 기꺼이 보탬이 되고 싶습니다.',
      '강의가 오후에야 있어서 오전에는 매일, 그리고 주말에도 일할 수 있습니다. 4월 1일부터 시작할 수 있습니다.',
      '면접에 불러 주시면 대단히 기쁘겠습니다.',
      '안녕히 계십시오.\n서지원 드림'
    ],
    notes: [
      { de: 'Bewerbung als Servicekraft im Frühstücksrestaurant', ko: '제목 줄이에요. 편지에서는 Betreff:라는 말을 붙이지 않고 어느 자리에 지원하는지만 써요.' },
      { de: 'Da ich … arbeite und … habe, bewerbe ich mich um die Stelle als Servicekraft.', ko: 'da 문장이 앞에 와서 주문장이 동사 bewerbe로 시작해요. 지원 이유와 지원하는 자리를 한 문장에 담았어요.' },
      { de: 'Dabei habe ich gelernt, auch unter Zeitdruck freundlich und aufmerksam zu bleiben.', ko: '광고의 조건 freundlich, zuverlässig를 경험으로 증명하는 문장이에요.' },
      { de: 'An Ihrem Haus reizt mich vor allem …', ko: 'Haus는 호텔이나 회사를 격식 있게 가리키는 말이에요. 이 회사를 고른 이유를 말해요.' },
      { de: 'Gern würde ich dazu beitragen, dass …', ko: 'zu etwas beitragen = 무엇에 기여하다. 내가 회사에 줄 수 있는 것을 말해요.' },
      { de: 'Beginnen könnte ich ab dem 1. April.', ko: '광고의 「ab April」에 정확히 답했어요. 원형 Beginnen을 맨 앞에 두어 강조했어요.' }
    ]
  }
},
{
  id: 'b2-05', level: 'B2', no: 5,
  title: 'Leserbrief: Vier-Tage-Woche für alle?', titleKo: '신문 기사에 독자 편지 쓰기',
  type: 'Leserbrief', typeKo: '독자 편지',
  exam: '기사를 읽고 편집부에 의견을 보내는 독자 편지(Leserbrief) 유형',
  time: 30, words: [150, 190],
  intro: '신문 기사를 읽고 편집부에 내 의견을 보내는 독자 편지를 써요. 기사의 내용을 한두 문장으로 옮기고, 동의하는 부분과 동의하지 않는 부분을 나눠 말하고, 내 경험을 근거로 대는 글이에요.',
  goals: ['기사의 내용을 내 말로 짧게 옮겨요 (laut, zufolge, Darin heißt es …)', 'zwar … aber, einerseits … andererseits로 균형 있게 논증해요', '내 경험을 근거로 들고 제안으로 마무리해요'],
  aufbau: [
    { de: 'Anrede', ko: '부르는 말', ex: 'Sehr geehrte Damen und Herren,' },
    { de: 'Bezug auf den Artikel', ko: '기사 언급과 요약', ex: 'mit großem Interesse habe ich Ihren Artikel „…“ gelesen. Darin heißt es, …' },
    { de: 'Eigene Position', ko: '내 입장', ex: 'Dem kann ich nur teilweise zustimmen.' },
    { de: 'Argumente und Beispiel', ko: '근거와 경험', ex: 'Ich arbeite als Pflegekraft in einem Krankenhaus. Bei uns …' },
    { de: 'Vorschlag', ko: '제안', ex: 'Sinnvoller wäre es, wenn jeder Betrieb selbst entscheiden könnte.' },
    { de: 'Schluss und Gruß', ko: '마무리와 끝인사', ex: 'Ich würde mich freuen, wenn Sie über dieses Thema weiter berichten. / Mit freundlichen Grüßen / Eunji Kwon' }
  ],
  tipps: [
    '첫 단락에서 어느 기사에 대해 쓰는지 제목을 밝히고, 기사의 핵심을 한두 문장으로 옮겨요. 기사 문장을 그대로 베끼지 않아요.',
    '기사 내용을 옮길 때는 laut + 3격, … zufolge, Darin heißt es, …를 써요. 기사의 주장과 내 의견이 섞이지 않게 해요.',
    '전부 찬성하거나 전부 반대하기보다 어디까지 동의하는지 나누면 글이 설득력 있어요. Zwar …, aber … / Dem kann ich nur teilweise zustimmen.',
    '독자 편지는 경험을 근거로 댈 때 설득력이 커요. 내 직업이나 일상에서 나온 구체적인 예를 하나 넣으세요.'
  ],
  fehler: [
    { f: 'Laut den Artikel sind viele Beschäftigte zufriedener.', r: 'Laut dem Artikel sind viele Beschäftigte zufriedener.', e: 'laut 뒤에는 3격이 와요.' },
    { f: 'Der Artikel sagt, dass die Ergebnisse positiv sind.', r: 'In dem Artikel heißt es, dass die Ergebnisse positiv sind.', e: '글에서는 Der Artikel sagt보다 In dem Artikel heißt es …나 Der Autor schreibt …가 자연스러워요.' },
    { f: 'Ich bin dagegen die Vier-Tage-Woche.', r: 'Ich bin gegen die Vier-Tage-Woche.', e: '명사 앞에는 전치사 gegen을 써요. dagegen은 명사 없이 혼자 쓰는 말이에요.' },
    { f: 'Einerseits ist die Idee gut, andererseits sie kostet viel Geld.', r: 'Einerseits ist die Idee gut, andererseits kostet sie viel Geld.', e: 'andererseits도 첫 자리를 차지하므로 동사가 바로 뒤에 와요.' }
  ],
  redemittel: [
    { g: '기사 언급하기', items: [['Mit großem Interesse habe ich Ihren Artikel „…“ gelesen.', '귀지의 기사 「…」를 큰 관심을 가지고 읽었습니다.'], ['Ich beziehe mich auf Ihren Artikel vom 3. Mai.', '5월 3일 자 기사에 대해 씁니다.'], ['Darin heißt es, …', '기사에는 …라고 쓰여 있습니다.'], ['Laut dem Artikel …', '기사에 따르면 …'], ['Dem Artikel zufolge …', '기사에 따르면 …']] },
    { g: '입장 밝히기', items: [['Dem kann ich nur teilweise zustimmen.', '그 주장에는 일부만 동의할 수 있습니다.'], ['Ich bin ganz anderer Meinung.', '저는 생각이 전혀 다릅니다.'], ['In diesem Punkt gebe ich dem Autor recht.', '이 점에서는 글쓴이의 말이 옳다고 봅니다.'], ['Meiner Ansicht nach …', '제 생각에는 …']] },
    { g: '균형 있게 논증하기', items: [['Zwar klingt die Idee verlockend, aber …', '그 생각이 솔깃하게 들리기는 하지만 …'], ['Einerseits …, andererseits …', '한편으로는 …, 다른 한편으로는 …'], ['Dabei wird jedoch übersehen, dass …', '그러나 …이라는 점이 간과되고 있습니다.'], ['Man darf nicht vergessen, dass …', '…이라는 점을 잊어서는 안 됩니다.']] },
    { g: '경험으로 뒷받침하기', items: [['Ich arbeite als Pflegekraft in einem Krankenhaus.', '저는 병원에서 간호 인력으로 일합니다.'], ['Aus eigener Erfahrung weiß ich, dass …', '제 경험으로 …을 알고 있습니다.'], ['Bei uns fehlen schon heute Kolleginnen und Kollegen.', '저희는 지금도 이미 동료가 부족합니다.']] },
    { g: '제안하고 마무리하기', items: [['Sinnvoller wäre es, wenn …', '…하는 편이 더 합리적일 것입니다.'], ['Meiner Ansicht nach sollte … nicht vorgeschrieben werden.', '제 생각에는 …을 의무로 정해서는 안 됩니다.'], ['Ich würde mich freuen, wenn Sie über dieses Thema weiter berichten.', '이 주제를 계속 다뤄 주시면 기쁘겠습니다.'], ['Mit freundlichen Grüßen', '안녕히 계십시오']] }
  ],
  uebung: [
    { t: 'fill', q: 'Laut ___ Artikel testen immer mehr Firmen die Vier-Tage-Woche. (der)', a: ['dem'], e: 'laut + 3격이에요. der Artikel → dem Artikel.' },
    { t: 'fix', q: 'Einerseits ist die Idee gut, andererseits sie kostet viel Geld.', a: ['Einerseits ist die Idee gut, andererseits kostet sie viel Geld.'], e: 'andererseits 뒤에는 동사가 바로 와요.' },
    { t: 'mc', q: 'Ich bin ___ eine Pflicht für alle Betriebe.', o: ['dagegen', 'gegen', 'entgegen'], a: 1, e: '명사 앞에는 전치사 gegen을 써요. dagegen은 「Ich bin dagegen.」처럼 혼자 써요.' },
    { t: 'mc', q: '기사의 내용을 옮기는 문장으로 가장 알맞은 것은?', o: ['Ich finde, die Vier-Tage-Woche ist gut.', 'Dem Artikel zufolge fühlen sich viele Beschäftigte gesünder.', 'Die Vier-Tage-Woche ist natürlich das beste Modell.'], a: 1, e: '… zufolge는 「…에 따르면」이에요. 누구의 주장인지 밝혀서 내 의견과 구별해요.' },
    { t: 'fill', q: 'Dem kann ich nur teilweise ___.', a: ['zustimmen', 'beipflichten'], e: '3격 + zustimmen = …에 동의하다. kann과 함께라서 원형이 끝에 와요.' },
    { t: 'fill', q: 'Aus eigener ___ weiß ich, dass Überstunden zum Alltag gehören.', a: ['Erfahrung'], e: 'aus eigener Erfahrung = 직접 겪어 봐서.' }
  ],
  aufgabe: {
    lead: 'In einer deutschen Zeitung lesen Sie folgenden Artikel:',
    brief: 'Vier Tage arbeiten, drei Tage frei\nImmer mehr Unternehmen testen die Vier-Tage-Woche bei vollem Lohn. Die ersten Ergebnisse sind positiv: Viele Beschäftigte fühlen sich gesünder und zufriedener, und die Firmen berichten, dass die Arbeit trotzdem geschafft wird. Fachleute fordern deshalb, die Vier-Tage-Woche überall einzuführen. Kritiker warnen dagegen: In Krankenhäusern, Schulen oder im Handwerk fehlt schon heute Personal.',
    punkte: ['Beziehen Sie sich auf den Artikel.', 'Äußern Sie Ihre Meinung zur Vier-Tage-Woche.', 'Begründen Sie Ihre Meinung mit einem Beispiel aus Ihrer Erfahrung.', 'Machen Sie einen Vorschlag.'],
    close: 'Schreiben Sie einen Leserbrief an die Zeitung (etwa 150–190 Wörter).',
    ko: {
      lead: '독일 신문에서 다음 기사를 읽었어요.',
      brief: '나흘 일하고 사흘 쉬기\n임금을 그대로 주면서 주 4일제를 시험하는 기업이 점점 늘고 있어요. 첫 결과는 긍정적이에요. 많은 직원이 더 건강하고 만족스럽다고 느끼고, 기업들은 그래도 일이 다 처리된다고 전해요. 그래서 전문가들은 주 4일제를 모든 곳에 도입하자고 요구해요. 반면 비판하는 사람들은 병원, 학교, 수공업 분야에서는 지금도 이미 인력이 부족하다고 경고해요.',
      punkte: ['기사를 언급하세요.', '주 4일제에 대한 내 의견을 밝히세요.', '내 경험에서 나온 예로 의견을 뒷받침하세요.', '제안을 하나 하세요.'],
      close: '신문사에 독자 편지를 쓰세요(150–190단어 정도).'
    }
  },
  check: ['어느 기사에 대해 쓰는지 밝혔어요.', '기사의 핵심을 내 말로 한두 문장에 옮겼어요.', '내 입장을 분명하게 썼어요.', '경험에서 나온 예를 들었어요.', 'zwar … aber(jedoch) 또는 einerseits … andererseits를 썼어요.', '제안을 썼어요.', '부르는 말과 끝인사를 썼어요.', '150단어 이상 썼어요.'],
  muster: {
    de: [
      'Sehr geehrte Damen und Herren,',
      'mit großem Interesse habe ich Ihren Artikel „Vier Tage arbeiten, drei Tage frei“ gelesen. Darin heißt es, viele Beschäftigte seien mit vier Arbeitstagen gesünder und zufriedener. Fachleute fordern deshalb, dieses Modell überall einzuführen.',
      'Dem kann ich nur teilweise zustimmen. Zwar klingt die Idee verlockend, und in vielen Büros lässt sie sich sicher gut umsetzen. Dabei wird jedoch übersehen, dass das nicht in jedem Beruf funktioniert. Ich arbeite als Pflegekraft in einem Krankenhaus. Bei uns fehlen schon heute Kolleginnen und Kollegen. Überstunden gehören längst zum Alltag. Würden alle nur noch vier Tage arbeiten, müssten die Patienten noch länger warten, oder wir müssten an den vier Tagen deutlich mehr leisten.',
      'Meiner Ansicht nach sollte die Vier-Tage-Woche deshalb nicht für alle vorgeschrieben werden. Sinnvoller wäre es, wenn jeder Betrieb gemeinsam mit seinen Beschäftigten entscheiden könnte, welches Arbeitszeitmodell zu ihm passt. Zuerst müsste jedoch mehr Personal eingestellt werden.',
      'Ich würde mich freuen, wenn Sie über dieses Thema weiter berichten.',
      'Mit freundlichen Grüßen\nEunji Kwon'
    ],
    ko: [
      '담당자님께,',
      '귀지의 기사 「나흘 일하고 사흘 쉬기」를 큰 관심을 가지고 읽었습니다. 기사에는 많은 직원이 나흘 근무로 더 건강해지고 만족도도 높아졌다고 쓰여 있습니다. 그래서 전문가들은 이 방식을 모든 곳에 도입하자고 요구합니다.',
      '저는 그 주장에 일부만 동의할 수 있습니다. 그 생각이 솔깃하게 들리는 것은 사실이고, 많은 사무직에서는 분명 잘 실행할 수 있을 것입니다. 그러나 모든 직업에서 통하는 방식은 아니라는 점이 간과되고 있습니다. 저는 병원에서 간호 인력으로 일합니다. 저희는 지금도 이미 동료가 부족합니다. 초과 근무는 일상이 된 지 오래입니다. 모두가 나흘만 일하게 된다면 환자들은 더 오래 기다려야 하거나, 저희가 그 나흘 동안 훨씬 더 많은 일을 해내야 할 것입니다.',
      '그래서 제 생각에는 주 4일제를 모두에게 의무로 정해서는 안 됩니다. 어떤 근무 시간 방식이 맞는지를 사업장마다 직원들과 함께 정할 수 있게 하는 편이 더 합리적일 것입니다. 다만 그보다 먼저 인력을 더 채용해야 할 것입니다.',
      '이 주제를 계속 다뤄 주시면 기쁘겠습니다.',
      '안녕히 계십시오.\n권은지 드림'
    ],
    notes: [
      { de: 'Darin heißt es, viele Beschäftigte seien … gesünder und zufriedener.', ko: '기사의 내용을 접속법 I(seien)로 옮겼어요. 내 주장이 아니라 기사의 주장이라는 표시예요.' },
      { de: 'Dem kann ich nur teilweise zustimmen.', ko: 'Dem은 앞 문장의 주장을 받는 3격 지시대명사예요. 어디까지 동의하는지 밝혀요.' },
      { de: 'Zwar klingt die Idee verlockend, … Dabei wird jedoch übersehen, dass …', ko: 'zwar로 상대 주장을 인정한 뒤 jedoch로 반론을 폈어요.' },
      { de: 'Ich arbeite als Pflegekraft in einem Krankenhaus.', ko: '내 직업을 밝혀서 뒤에 오는 경험을 믿을 만하게 했어요.' },
      { de: 'Würden alle nur noch vier Tage arbeiten, müssten …', ko: 'wenn 없이 동사 würden을 맨 앞에 둔 가정문이에요. Wenn alle … arbeiten würden과 같은 뜻이에요.' },
      { de: 'Sinnvoller wäre es, wenn …', ko: '비판에서 끝내지 않고 대안을 제안했어요.' }
    ]
  }
},

{
  id: 'b2-06', level: 'B2', no: 6,
  title: 'Bitte um Informationen: Weiterbildung', titleKo: '교육 과정에 대해 자세히 문의하기',
  type: 'Formelle Anfrage', typeKo: '격식 문의 편지',
  exam: 'telc Deutsch B2 쓰기(Schriftlicher Ausdruck) 정보 요청(Bitte um Informationen) 유형',
  time: 30, words: [140, 180],
  intro: '직업 교육 과정 광고를 읽고 교육 기관에 자세한 정보를 요청하는 격식 편지를 써요. 내 상황을 근거로 질문을 묶어서 묻고, 명사 중심의 격식 있는 표현을 익혀요.',
  goals: ['광고를 언급하며 편지의 목적을 밝혀요', '내 직업 상황과 기대를 설명한 뒤 그에 맞는 질문을 해요', 'Mich würde interessieren, …, Ließe sich …? 같은 B2 표현으로 물어요'],
  aufbau: [
    { de: 'Betreff und Anrede', ko: '제목과 부르는 말', ex: 'Ihre Anzeige „Projektmanagement kompakt“ / Sehr geehrte Damen und Herren,' },
    { de: 'Anlass', ko: '쓰는 계기', ex: 'mit großem Interesse habe ich Ihre Anzeige … gelesen.' },
    { de: 'Berufliche Situation', ko: '직업 상황과 기대', ex: 'Seit drei Jahren bin ich als Sachbearbeiterin … tätig.' },
    { de: 'Fragen zu Inhalt und Ablauf', ko: '내용과 진행에 대한 질문', ex: 'Zunächst würde mich interessieren, welche Vorkenntnisse vorausgesetzt werden.' },
    { de: 'Fragen zu Kosten und Abschluss', ko: '비용과 수료에 대한 질문', ex: 'Darüber hinaus wüsste ich gern, ob …' },
    { de: 'Schluss und Gruß', ko: '마무리와 끝인사', ex: 'Für Ihre Bemühungen bedanke ich mich im Voraus.' }
  ],
  tipps: [
    'B2에서는 질문을 나열하지 말고 내 상황과 이어서 물어요. 「저녁까지 일하므로, 수업 시간이 어떻게 되는지 궁금합니다」처럼 써요.',
    '질문의 순서를 Zunächst, Darüber hinaus, Schließlich로 잡아 주면 읽기 쉬워요.',
    '간접의문문 안에 수동태가 오면 werden이 맨 끝이에요. …, welche Vorkenntnisse vorausgesetzt werden.',
    '제목(Betreff)을 한 줄 쓰면 격식 편지의 형식이 갖춰져요. 제목 끝에는 마침표를 찍지 않아요.'
  ],
  fehler: [
    { f: 'Ich bin seit drei Jahren als Sachbearbeiterin beschäftigen.', r: 'Ich bin seit drei Jahren als Sachbearbeiterin beschäftigt.', e: '「~로 일하고 있다」는 beschäftigt sein 또는 tätig sein이에요.' },
    { f: 'Mich würde interessieren, welche Vorkenntnisse werden vorausgesetzt.', r: 'Mich würde interessieren, welche Vorkenntnisse vorausgesetzt werden.', e: '간접의문문에서는 변화한 동사 werden이 맨 끝에 와요.' },
    { f: 'Ich interessiere mich an dieser Weiterbildung.', r: 'Ich interessiere mich für diese Weiterbildung.', e: 'sich interessieren für + 4격이에요. interessiert sein an + 3격과 섞지 않아요.' },
    { f: 'Ich bedanke mich im Voraus für Ihre Bemühung und freue mich auf Ihre Antwort bald.', r: 'Für Ihre Bemühungen bedanke ich mich im Voraus und freue mich auf Ihre baldige Antwort.', e: 'bald는 부사라 명사 뒤에 붙일 수 없어요. 형용사 baldig를 명사 앞에 써요.' }
  ],
  redemittel: [
    { g: '쓰는 계기 밝히기', items: [['Mit großem Interesse habe ich Ihre Anzeige in der „Süddeutschen Zeitung“ gelesen.', '「쥐트도이체 차이퉁」에 실린 귀 기관의 광고를 큰 관심을 갖고 읽었습니다.'], ['Ihr Angebot hat mich sofort angesprochen.', '귀 기관의 과정이 곧바로 제 관심을 끌었습니다.'], ['Bevor ich mich anmelde, hätte ich noch einige Fragen.', '등록하기 전에 몇 가지 여쭙고 싶은 것이 있습니다.']] },
    { g: '직업 상황과 기대 말하기', items: [['Seit drei Jahren bin ich als Sachbearbeiterin in einem Logistikunternehmen tätig.', '저는 3년 전부터 물류 회사에서 사무 담당자로 일하고 있습니다.'], ['In Zukunft möchte ich mehr Verantwortung übernehmen.', '앞으로 더 큰 책임을 맡고 싶습니다.'], ['Von dem Kurs erhoffe ich mir vor allem praxisnahes Wissen.', '이 과정에서 무엇보다 실무에 가까운 지식을 얻기를 기대합니다.']] },
    { g: '정중하게 묻기', items: [['Zunächst würde mich interessieren, welche Vorkenntnisse vorausgesetzt werden.', '먼저 어떤 사전 지식이 필요한지 궁금합니다.'], ['Darüber hinaus wüsste ich gern, ob …', '그 밖에 …인지도 알고 싶습니다.'], ['Könnten Sie mir außerdem mitteilen, wie hoch die Kursgebühr ist?', '또한 수강료가 얼마인지 알려 주실 수 있겠습니까?'], ['Ließe sich die Gebühr auch in Raten zahlen?', '수강료를 나누어 낼 수도 있겠습니까?']] },
    { g: '수료와 지원 묻기', items: [['Mit welchem Abschluss endet die Weiterbildung?', '이 과정은 어떤 수료증으로 끝납니까?'], ['Wird das Zertifikat bundesweit anerkannt?', '그 수료증은 독일 전역에서 인정됩니까?'], ['Gibt es Fördermöglichkeiten für Berufstätige?', '직장인을 위한 지원 제도가 있습니까?']] },
    { g: '마무리와 끝인사', items: [['Für Ihre Bemühungen bedanke ich mich im Voraus.', '수고에 미리 감사드립니다.'], ['Über eine baldige Antwort würde ich mich sehr freuen.', '빠른 답변을 주시면 대단히 감사하겠습니다.'], ['Mit freundlichen Grüßen', '안녕히 계십시오 (격식 있는 끝인사)']] }
  ],
  uebung: [
    { t: 'fix', q: 'Mich würde interessieren, welche Vorkenntnisse werden vorausgesetzt.', a: ['Mich würde interessieren, welche Vorkenntnisse vorausgesetzt werden.'], e: '간접의문문에서는 werden이 맨 끝에 와요.' },
    { t: 'fill', q: 'Darüber hinaus ___ ich gern, ob der Kurs auch online stattfindet. (wissen, 접속법 II)', a: ['wüsste'], e: 'wissen의 접속법 II는 wüsste예요. 「알고 싶습니다」를 정중하게 말해요.' },
    { t: 'mc', q: '알맞은 것은? Ich interessiere mich ___ diese Weiterbildung.', o: ['an', 'für', 'über'], a: 1, e: 'sich interessieren für + 4격이에요.' },
    { t: 'fill', q: 'Von dem Kurs erhoffe ich ___ vor allem praxisnahes Wissen.', a: ['mir'], e: 'sich(3격) etwas erhoffen이에요. ich의 3격 재귀대명사는 mir예요.' },
    { t: 'mc', q: '「수강료를 나누어 낼 수도 있겠습니까?」로 알맞은 문장은?', o: ['Ließe sich die Gebühr auch in Raten zahlen?', 'Lässt man die Gebühr auch in Raten?', 'Kann die Gebühr sich in Raten zahlen?'], a: 0, e: 'sich lassen + 원형은 수동의 뜻이에요. 접속법 II ließe로 더 정중해져요.' },
    { t: 'fill', q: 'Seit drei Jahren bin ich als Sachbearbeiterin ___. (일하고 있다, 형용사)', a: ['tätig', 'beschäftigt'], e: 'als … tätig sein, beschäftigt sein은 「~로 일하고 있다」예요.' }
  ],
  aufgabe: {
    lead: 'Sie haben in der Zeitung folgende Anzeige gelesen und interessieren sich für das Angebot. Sie möchten aber noch mehr wissen.',
    brief: 'Projektmanagement kompakt\nBerufsbegleitende Weiterbildung mit Zertifikat\nIn sechs Monaten zum Projektleiter / zur Projektleiterin\nBeginn: Oktober · Akademie für Berufsbildung, Hamburg',
    punkte: ['Grund für Ihr Schreiben', 'Ihre berufliche Situation und Ihre Erwartungen', 'Fragen zu Inhalten und Kurszeiten', 'Fragen zu Kosten und Abschluss'],
    close: 'Schreiben Sie einen Brief an die Akademie (etwa 140–180 Wörter). Überlegen Sie sich eine passende Reihenfolge der Punkte, eine Einleitung und einen Schluss. Vergessen Sie nicht Betreff, Anrede und Gruß.',
    ko: {
      lead: '신문에서 다음 광고를 읽고 이 과정에 관심이 생겼어요. 그런데 더 알고 싶은 것이 있어요.',
      brief: '프로젝트 관리 집중 과정\n직장을 다니며 듣는 수료증 과정\n6개월 만에 프로젝트 책임자로\n시작: 10월 · 함부르크 직업교육 아카데미',
      punkte: ['편지를 쓰는 이유', '내 직업 상황과 기대', '내용과 수업 시간에 대한 질문', '비용과 수료에 대한 질문'],
      close: '아카데미에 편지를 쓰세요(140–180단어 정도). 내용의 순서, 도입, 마무리를 스스로 정하세요. 제목, 부르는 말, 끝인사를 잊지 마세요.'
    }
  },
  check: ['제목(Betreff)을 썼어요.', 'Sehr geehrte Damen und Herren,으로 시작했어요.', '어떤 광고를 보고 쓰는지 밝혔어요.', '내 직업 상황과 기대를 썼어요.', '내용과 수업 시간을 물었어요.', '비용과 수료를 물었어요.', '질문을 Zunächst, Darüber hinaus 같은 말로 이었어요.', '마무리 문장과 Mit freundlichen Grüßen으로 끝냈어요.'],
  muster: {
    de: [
      'Ihre Anzeige „Projektmanagement kompakt“',
      'Sehr geehrte Damen und Herren,',
      'mit großem Interesse habe ich Ihre Anzeige in der Zeitung gelesen. Bevor ich mich anmelde, hätte ich allerdings noch einige Fragen.',
      'Seit drei Jahren bin ich als Sachbearbeiterin in einem Logistikunternehmen tätig. Da ich in Zukunft eigene Projekte leiten möchte, erhoffe ich mir von der Weiterbildung vor allem praxisnahes Wissen.',
      'Zunächst würde mich interessieren, welche Vorkenntnisse vorausgesetzt werden und welche Themen im Mittelpunkt stehen. Da ich täglich bis 18 Uhr arbeite, wüsste ich außerdem gern, an welchen Tagen der Unterricht stattfindet und ob ein Teil davon online angeboten wird.',
      'Darüber hinaus bitte ich Sie, mir mitzuteilen, wie hoch die Kursgebühr ist und ob sie sich in Raten zahlen lässt. Wichtig wäre für mich auch zu erfahren, ob das Zertifikat bundesweit anerkannt wird.',
      'Für Ihre Bemühungen bedanke ich mich im Voraus und freue mich auf Ihre baldige Antwort.',
      'Mit freundlichen Grüßen\nSoyeon Bae'
    ],
    ko: [
      '귀 기관의 광고 「프로젝트 관리 집중 과정」',
      '담당자님께,',
      '신문에 실린 귀 기관의 광고를 큰 관심을 갖고 읽었습니다. 다만 등록하기 전에 몇 가지 여쭙고 싶은 것이 있습니다.',
      '저는 3년 전부터 물류 회사에서 사무 담당자로 일하고 있습니다. 앞으로 직접 프로젝트를 이끌고 싶기 때문에 이 과정에서 무엇보다 실무에 가까운 지식을 얻기를 기대합니다.',
      '먼저 어떤 사전 지식이 필요한지, 그리고 어떤 주제를 중심으로 다루는지 궁금합니다. 또한 저는 매일 오후 6시까지 일하므로 수업이 무슨 요일에 있는지, 일부가 온라인으로 제공되는지도 알고 싶습니다.',
      '그 밖에 수강료가 얼마인지, 나누어 낼 수 있는지 알려 주시기 바랍니다. 수료증이 독일 전역에서 인정되는지도 저에게는 중요합니다.',
      '수고에 미리 감사드리며 빠른 답변을 기다리겠습니다.',
      '안녕히 계십시오.\n배소연 드림'
    ],
    notes: [
      { de: 'Bevor ich mich anmelde, hätte ich allerdings noch einige Fragen.', ko: 'hätte로 「질문이 있습니다」를 정중하게 말했어요. bevor 문장이 앞에 와서 주절은 동사로 시작해요.' },
      { de: 'Da ich in Zukunft eigene Projekte leiten möchte, erhoffe ich mir …', ko: '내 상황(da 문장)을 근거로 기대를 말했어요. sich(3격) etwas erhoffen von + 3격.' },
      { de: '…, welche Vorkenntnisse vorausgesetzt werden', ko: '간접의문문 안의 수동태예요. 과거분사 다음에 werden이 맨 끝에 와요.' },
      { de: 'Da ich täglich bis 18 Uhr arbeite, wüsste ich außerdem gern, …', ko: '질문을 내 상황과 이었어요. wüsste gern은 möchte wissen보다 격식 있어요.' },
      { de: '… ob sie sich in Raten zahlen lässt.', ko: 'sich lassen + 원형으로 수동의 뜻을 나타냈어요. sie는 die Kursgebühr를 가리켜요.' }
    ]
  }
},
{
  id: 'b2-07', level: 'B2', no: 7,
  title: 'Stellungnahme: Autofreie Innenstadt?', titleKo: '찬반을 따져 의견 글 쓰기',
  type: 'Stellungnahme', typeKo: '찬반 의견 글',
  exam: 'B2 시험과 수업에서 쓰는 찬반 의견 글(Stellungnahme) 유형',
  time: 35, words: [150, 190],
  intro: '찬성 근거와 반대 근거를 차례로 살핀 뒤 내 입장을 밝히는 의견 글을 써요. 문단마다 역할을 나누고, 근거를 연결어로 잇는 연습을 해요.',
  goals: ['도입, 찬성, 반대, 입장의 네 문단으로 글을 짜요', 'Befürworter, Kritiker 같은 말로 다른 사람의 근거를 전해요', 'zwar … aber, je … desto, sofern 같은 연결 표현을 써요'],
  aufbau: [
    { de: 'Einleitung', ko: '도입: 주제 소개', ex: 'In immer mehr Städten wird darüber diskutiert, ob …' },
    { de: 'Argumente dafür', ko: '찬성 근거', ex: 'Befürworter weisen darauf hin, dass …' },
    { de: 'Argumente dagegen', ko: '반대 근거', ex: 'Kritiker befürchten dagegen, dass …' },
    { de: 'Eigene Position', ko: '내 입장', ex: 'Ich persönlich halte … für sinnvoll, sofern …' },
    { de: 'Schluss', ko: '결론', ex: 'Alles in allem überwiegen meiner Ansicht nach die Vorteile.' }
  ],
  tipps: [
    '도입에서는 아직 내 의견을 말하지 않아요. 주제가 왜 논의되는지만 한두 문장으로 써요.',
    '근거마다 「주장 + 이유 또는 예」를 붙여요. 주장만 나열하면 설득력이 없어요.',
    '찬성과 반대의 분량을 비슷하게 맞추고, 내 입장은 마지막 문단에서 분명히 밝혀요.',
    'je + 비교급 …, desto + 비교급 … 문장에서 je 쪽은 동사가 끝, desto 쪽은 동사가 비교급 바로 뒤에 와요.'
  ],
  fehler: [
    { f: 'Befürworter weisen darauf hin, dass die Luft wird sauberer.', r: 'Befürworter weisen darauf hin, dass die Luft sauberer wird.', e: 'dass 문장에서는 동사 wird가 맨 끝에 와요.' },
    { f: 'Je weniger Autos fahren, desto die Luft ist besser.', r: 'Je weniger Autos fahren, desto besser ist die Luft.', e: 'desto 바로 뒤에 비교급, 그다음에 동사가 와요.' },
    { f: 'Ich bin der Meinung, dass man soll die Innenstadt sperren.', r: 'Ich bin der Meinung, dass man die Innenstadt sperren sollte.', e: 'dass 문장에서 화법조동사는 원형 뒤, 문장 맨 끝에 와요.' },
    { f: 'Meiner Ansicht nach die Vorteile überwiegen.', r: 'Meiner Ansicht nach überwiegen die Vorteile.', e: 'Meiner Ansicht nach가 첫 자리라 동사가 바로 뒤에 와요.' }
  ],
  redemittel: [
    { g: '주제 소개하기', items: [['In immer mehr Städten wird darüber diskutiert, ob …', '점점 더 많은 도시에서 …인지를 두고 논의하고 있어요.'], ['Das Thema ist heftig umstritten.', '이 주제는 논란이 커요.'], ['Im Folgenden möchte ich beide Seiten betrachten.', '아래에서 양쪽을 모두 살펴보려 해요.']] },
    { g: '찬성 근거 전하기', items: [['Befürworter weisen darauf hin, dass …', '찬성하는 사람들은 …라고 지적해요.'], ['Ein wichtiges Argument dafür ist, dass …', '찬성의 중요한 근거는 …라는 점이에요.'], ['Hinzu kommt, dass …', '여기에 …라는 점이 더해져요.'], ['Je weniger Autos fahren, desto sauberer ist die Luft.', '자동차가 적게 다닐수록 공기가 깨끗해요.']] },
    { g: '반대 근거 전하기', items: [['Kritiker befürchten dagegen, dass …', '반면 비판하는 사람들은 …를 걱정해요.'], ['Dagegen spricht, dass …', '반대 근거로는 …라는 점이 있어요.'], ['Nicht zu vergessen sind Menschen, die auf das Auto angewiesen sind.', '자동차가 꼭 필요한 사람들도 잊으면 안 돼요.']] },
    { g: '내 입장 밝히기', items: [['Ich persönlich halte eine autofreie Innenstadt für sinnvoll, sofern …', '저는 …라는 조건이라면 차 없는 도심이 의미 있다고 생각해요.'], ['Zwar …, aber …', '…이긴 하지만 …'], ['Entscheidend ist meiner Meinung nach, dass …', '제 생각에 결정적인 것은 …라는 점이에요.']] },
    { g: '결론 맺기', items: [['Alles in allem überwiegen meiner Ansicht nach die Vorteile.', '종합하면 제가 보기에 좋은 점이 더 커요.'], ['Zusammenfassend lässt sich sagen, dass …', '요약하면 …라고 할 수 있어요.']] }
  ],
  uebung: [
    { t: 'fix', q: 'Je weniger Autos fahren, desto die Luft ist besser.', a: ['Je weniger Autos fahren, desto besser ist die Luft.'], e: 'desto + 비교급 + 동사 + 주어 순서예요.' },
    { t: 'mc', q: '「~라는 조건이라면」으로 알맞은 접속사는?', o: ['sofern', 'obwohl', 'sodass'], a: 0, e: 'sofern은 「~하는 한, ~라는 조건이라면」이에요.' },
    { t: 'fill', q: 'Befürworter weisen ___ hin, dass die Lebensqualität steigt.', a: ['darauf'], e: 'hinweisen auf + 4격이에요. dass 문장이 뒤따르면 darauf를 써요.' },
    { t: 'fix', q: 'Ich bin der Meinung, dass man soll die Innenstadt sperren.', a: ['Ich bin der Meinung, dass man die Innenstadt sperren soll.', 'Ich bin der Meinung, dass man die Innenstadt sperren sollte.'], e: 'dass 문장에서 화법조동사는 맨 끝에 와요.' },
    { t: 'mc', q: '알맞은 것은? Menschen, die auf das Auto ___ sind', o: ['abhängig', 'angewiesen', 'gewohnt'], a: 1, e: 'auf + 4격 angewiesen sein은 「~에 의존해야 한다」예요. abhängig는 von과 함께 써요.' },
    { t: 'fill', q: 'Alles in allem ___ meiner Ansicht nach die Vorteile. (überwiegen)', a: ['überwiegen'], e: '주어가 복수 die Vorteile라서 동사는 überwiegen이에요. 비분리동사예요.' }
  ],
  aufgabe: {
    lead: 'In Ihrer Stadt wird diskutiert, ob die Innenstadt für private Autos gesperrt werden soll. Die Lokalzeitung bittet ihre Leserinnen und Leser um Stellungnahmen. Schreiben Sie einen Text.',
    punkte: ['Führen Sie kurz in das Thema ein.', 'Nennen Sie Argumente für eine autofreie Innenstadt.', 'Nennen Sie Argumente dagegen.', 'Schreiben Sie Ihre eigene Meinung und begründen Sie sie.'],
    close: 'Schreiben Sie etwa 150–190 Wörter. Achten Sie darauf, dass die Abschnitte und Sätze gut miteinander verbunden sind.',
    ko: {
      lead: '여러분이 사는 도시에서 도심에 개인 자동차가 못 들어오게 할지를 두고 논의하고 있어요. 지역 신문이 독자들에게 의견을 보내 달라고 해요. 글을 쓰세요.',
      punkte: ['주제를 짧게 소개하세요.', '차 없는 도심에 찬성하는 근거를 쓰세요.', '반대하는 근거를 쓰세요.', '내 의견을 쓰고 이유를 대세요.'],
      close: '150–190단어 정도로 쓰세요. 문단과 문장이 서로 잘 이어지도록 쓰세요.'
    }
  },
  check: ['도입에서 주제를 소개했어요.', '찬성 근거를 두 가지 썼어요.', '반대 근거를 두 가지 썼어요.', '근거마다 이유나 예를 붙였어요.', '내 입장을 마지막에 분명히 밝혔어요.', '문단을 연결어로 이었어요.', 'dass 문장과 종속절에서 동사가 맨 끝에 있어요.'],
  muster: {
    de: [
      'In immer mehr Städten wird darüber diskutiert, ob die Innenstadt für private Autos gesperrt werden soll. Auch bei uns ist das Thema heftig umstritten, seit der Stadtrat einen entsprechenden Antrag berät.',
      'Befürworter weisen darauf hin, dass die Lebensqualität deutlich steigen würde: Je weniger Autos fahren, desto sauberer ist die Luft und desto leiser wird es. Hinzu kommt, dass frei werdende Parkplätze für Radwege, Bäume oder Cafés genutzt werden könnten.',
      'Kritiker befürchten dagegen, dass die Geschäfte im Zentrum Kunden verlieren, weil viele Menschen dann lieber in Einkaufszentren am Stadtrand fahren. Nicht zu vergessen sind außerdem ältere Menschen und Handwerker, die auf das Auto angewiesen sind.',
      'Ich persönlich halte eine autofreie Innenstadt für sinnvoll, sofern Busse und Bahnen häufiger fahren und es Ausnahmen für Lieferungen und Menschen mit Behinderung gibt. Zwar müssen sich manche erst umstellen, aber Städte wie Kopenhagen zeigen, dass ein Zentrum ohne Autos attraktiver wird.',
      'Alles in allem überwiegen meiner Ansicht nach die Vorteile, wenn die Umstellung schrittweise erfolgt.'
    ],
    ko: [
      '점점 더 많은 도시에서 도심에 개인 자동차가 못 들어오게 해야 하는지를 두고 논의하고 있어요. 우리 도시에서도 시의회가 관련 안건을 논의하기 시작한 뒤로 이 주제는 논란이 커요.',
      '찬성하는 사람들은 삶의 질이 뚜렷이 높아질 것이라고 지적해요. 자동차가 적게 다닐수록 공기가 깨끗해지고 더 조용해져요. 여기에 비게 되는 주차 공간을 자전거 도로, 나무, 카페에 쓸 수 있다는 점이 더해져요.',
      '반면 비판하는 사람들은 많은 사람이 차라리 교외 쇼핑센터로 가게 되어 도심 가게들이 손님을 잃을 것을 걱정해요. 또한 자동차가 꼭 필요한 노인과 기술자들도 잊으면 안 돼요.',
      '저는 버스와 전철이 더 자주 다니고 배달 차량과 장애인을 위한 예외가 있다는 조건이라면 차 없는 도심이 의미 있다고 생각해요. 적응하는 데 시간이 걸리는 사람도 있겠지만, 코펜하겐 같은 도시는 차 없는 도심이 더 매력적이라는 것을 보여 줘요.',
      '종합하면 제가 보기에 변화를 단계적으로 진행한다면 좋은 점이 더 커요.'
    ],
    notes: [
      { de: 'In immer mehr Städten wird darüber diskutiert, ob …', ko: '주어 없는 수동태로 주제를 객관적으로 소개했어요. 도입에서는 내 의견을 말하지 않아요.' },
      { de: 'Je weniger Autos fahren, desto sauberer ist die Luft …', ko: 'je 쪽은 동사가 끝, desto 쪽은 비교급 다음에 동사가 와요.' },
      { de: 'frei werdende Parkplätze', ko: '현재분사 werdend가 형용사처럼 쓰였어요. 「비게 되는 주차 공간」' },
      { de: 'Kritiker befürchten dagegen, dass …', ko: 'dagegen으로 반대쪽 근거로 넘어갔어요. 문단의 역할이 첫 문장에서 드러나요.' },
      { de: '…, sofern Busse und Bahnen häufiger fahren …', ko: 'sofern으로 조건을 달아 입장을 정확하게 했어요. 무조건 찬성보다 설득력이 있어요.' }
    ]
  }
},
{
  id: 'b2-08', level: 'B2', no: 8,
  title: 'Beschwerde nach einer Sprachreise', titleKo: '광고와 달랐던 어학연수에 항의하기',
  type: 'Formelle Beschwerde', typeKo: '격식 항의 편지',
  exam: 'telc Deutsch B2 쓰기(Schriftlicher Ausdruck) 항의 편지 유형 · 광고와 실제를 비교하는 과제',
  time: 30, words: [140, 180],
  intro: '광고를 믿고 간 어학연수가 약속과 달랐을 때 주최 회사에 보내는 항의 편지를 써요. 광고의 약속과 실제를 짝지어 대비하고, 구체적인 보상을 요구해요.',
  goals: ['광고의 약속과 실제를 하나씩 짝지어 대비해요', 'anders als angekündigt, entgegen Ihrer Zusage, statt + 2격을 써요', '금액과 기한을 정해 보상을 요구해요'],
  aufbau: [
    { de: 'Betreff und Anrede', ko: '제목과 부르는 말', ex: 'Beschwerde über die Sprachreise nach Freiburg (Buchungsnummer 7731)' },
    { de: 'Anlass', ko: '쓰는 계기', ex: 'vom 4. bis 17. August habe ich an Ihrer Sprachreise … teilgenommen.' },
    { de: 'Mängel: Anzeige und Wirklichkeit', ko: '문제점: 광고와 실제', ex: 'In Ihrer Anzeige hieß es, … Tatsächlich …' },
    { de: 'Folgen', ko: '그 때문에 생긴 일', ex: 'Unter diesen Umständen konnte ich … kaum verbessern.' },
    { de: 'Forderung mit Frist', ko: '요구와 기한', ex: 'Ich fordere Sie daher auf, mir … zu erstatten.' },
    { de: 'Schluss und Gruß', ko: '마무리와 끝인사', ex: 'Andernfalls sehe ich mich gezwungen, …' }
  ],
  tipps: [
    '문제마다 「광고에서는 … 그런데 실제로는 …」의 짝으로 써요. 채점자는 광고의 내용을 정확히 언급했는지를 봐요.',
    '광고의 내용은 과거형 hieß es, wurde versprochen이나 접속법 I(sei, werde)로 전해요.',
    '요구는 숫자로 써요. 「보상해 주세요」보다 「참가비의 30퍼센트를 돌려주세요」가 분명해요.',
    '기한(bis zum …)과 다음 조치를 밝히되, 협박처럼 들리지 않게 차분하게 써요.'
  ],
  fehler: [
    { f: 'In Ihrer Anzeige hieß es, dass die Gruppen sind klein.', r: 'In Ihrer Anzeige hieß es, dass die Gruppen klein seien.', e: 'dass 문장이라 동사가 맨 끝에 와요. 남의 말을 전할 때는 접속법 I(seien)이 격식에 맞아요.' },
    { f: 'Statt einem Einzelzimmer bekam ich ein Dreibettzimmer.', r: 'Statt eines Einzelzimmers bekam ich ein Dreibettzimmer.', e: '격식 있는 글에서 statt 뒤는 2격이에요.' },
    { f: 'Ich fordere Sie auf, mir 30 Prozent des Preises erstatten.', r: 'Ich fordere Sie auf, mir 30 Prozent des Preises zu erstatten.', e: 'auffordern 뒤에는 zu + 원형이 와요.' },
    { f: 'Entgegen Ihre Zusage gab es kein Freizeitprogramm.', r: 'Entgegen Ihrer Zusage gab es kein Freizeitprogramm.', e: 'entgegen 뒤는 3격이에요.' }
  ],
  redemittel: [
    { g: '쓰는 계기 밝히기', items: [['Vom 4. bis 17. August habe ich an Ihrer Sprachreise nach Freiburg teilgenommen.', '8월 4일부터 17일까지 귀사의 프라이부르크 어학연수에 참가했습니다.'], ['Leider entsprach die Reise in mehreren Punkten nicht Ihrer Anzeige.', '유감스럽게도 연수는 여러 점에서 귀사의 광고와 달랐습니다.'], ['Ich sehe mich daher veranlasst, mich bei Ihnen zu beschweren.', '그래서 귀사에 항의하지 않을 수 없습니다.']] },
    { g: '광고와 실제 대비하기', items: [['In Ihrer Anzeige hieß es, die Gruppen bestünden aus höchstens acht Personen.', '귀사의 광고에는 한 반이 최대 여덟 명이라고 되어 있었습니다.'], ['Tatsächlich saßen wir zu sechzehnt im Unterricht.', '실제로는 열여섯 명이 함께 수업을 들었습니다.'], ['Anders als angekündigt …', '예고된 것과 달리 …'], ['Entgegen Ihrer Zusage …', '귀사의 약속과 달리 …'], ['Statt eines Einzelzimmers erhielt ich ein Dreibettzimmer.', '1인실 대신 3인실을 받았습니다.']] },
    { g: '결과 말하기', items: [['Unter diesen Umständen konnte ich meine Sprachkenntnisse kaum verbessern.', '이런 상황에서는 언어 실력을 거의 늘릴 수 없었습니다.'], ['Von einer intensiven Betreuung konnte keine Rede sein.', '집중적인 지도라고는 전혀 할 수 없었습니다.']] },
    { g: '요구하기', items: [['Ich fordere Sie daher auf, mir 30 Prozent des Reisepreises zu erstatten.', '그러므로 연수 비용의 30퍼센트를 돌려주시기를 요구합니다.'], ['Ich erwarte Ihre Stellungnahme bis zum 15. September.', '9월 15일까지 귀사의 답변을 기다리겠습니다.'], ['Als Entschädigung halte ich 400 Euro für angemessen.', '보상으로 400유로가 적절하다고 생각합니다.']] },
    { g: '마무리와 끝인사', items: [['Andernfalls sehe ich mich gezwungen, mich an die Verbraucherzentrale zu wenden.', '그렇지 않으면 소비자 센터에 도움을 청할 수밖에 없습니다.'], ['Ich hoffe auf eine einvernehmliche Lösung.', '원만한 해결을 기대합니다.'], ['Mit freundlichen Grüßen', '안녕히 계십시오 (격식 있는 끝인사)']] }
  ],
  uebung: [
    { t: 'fill', q: 'Statt ___ Einzelzimmers erhielt ich ein Dreibettzimmer. (ein)', a: ['eines'], e: 'statt + 2격이에요. 중성 2격은 eines이고 명사에 -s가 붙어요.' },
    { t: 'fill', q: 'Entgegen ___ Zusage gab es kein Freizeitprogramm. (Ihre)', a: ['Ihrer'], e: 'entgegen + 3격이에요. die Zusage의 3격은 Ihrer Zusage예요.' },
    { t: 'mc', q: '광고의 내용을 전하는 격식 있는 문장은?', o: ['In Ihrer Anzeige hieß es, die Gruppen seien klein.', 'In Ihrer Anzeige heißt, die Gruppen sind klein.', 'Ihre Anzeige sagte, die Gruppen klein sind.'], a: 0, e: 'hieß es + 접속법 I로 남의 말을 전해요.' },
    { t: 'fix', q: 'Ich fordere Sie auf, mir 30 Prozent des Preises erstatten.', a: ['Ich fordere Sie auf, mir 30 Prozent des Preises zu erstatten.'], e: 'auffordern 뒤에는 zu + 원형이 와요.' },
    { t: 'mc', q: '알맞은 것은? Die Reise entsprach nicht ___ Anzeige.', o: ['Ihre', 'Ihrer', 'Ihren'], a: 1, e: 'entsprechen은 3격과 함께 써요.' },
    { t: 'fill', q: 'Andernfalls sehe ich mich ___, mich an die Verbraucherzentrale zu wenden. (zwingen, 과거분사)', a: ['gezwungen'], e: 'sich gezwungen sehen, … zu + 원형은 「~할 수밖에 없다」예요.' }
  ],
  aufgabe: {
    lead: 'Sie haben aufgrund der folgenden Anzeige eine Sprachreise gebucht. Nach der Reise sind Sie sehr unzufrieden, weil vieles nicht der Anzeige entsprach.',
    brief: 'Deutsch lernen in Freiburg!\nZwei Wochen Intensivkurs in kleinen Gruppen (max. 8 Personen)\nUnterkunft im Einzelzimmer bei Gastfamilien\nJeden Nachmittag Freizeitprogramm mit Betreuung\nSprachreisen Sonnenschein',
    punkte: ['Grund für Ihr Schreiben', 'Was war anders als in der Anzeige? (mindestens zwei Punkte)', 'Welche Folgen hatte das für Sie?', 'Was erwarten Sie vom Veranstalter?'],
    close: 'Schreiben Sie einen Beschwerdebrief an den Veranstalter (etwa 140–180 Wörter). Vergessen Sie nicht Betreff, Anrede und Gruß.',
    ko: {
      lead: '다음 광고를 보고 어학연수를 예약했어요. 그런데 많은 것이 광고와 달라서 연수를 마친 뒤 무척 불만이에요.',
      brief: '프라이부르크에서 독일어를 배우세요!\n2주 집중 과정, 소규모 반(최대 8명)\n홈스테이 가정의 1인실\n매일 오후 지도 교사와 함께하는 여가 프로그램\n조넨샤인 어학연수',
      punkte: ['편지를 쓰는 이유', '광고와 무엇이 달랐나요? (두 가지 이상)', '그 때문에 어떤 일이 생겼나요?', '주최 회사에 무엇을 기대하나요?'],
      close: '주최 회사에 항의 편지를 쓰세요(140–180단어 정도). 제목, 부르는 말, 끝인사를 잊지 마세요.'
    }
  },
  check: ['제목에 무엇에 대한 항의인지 썼어요.', '언제 어떤 연수에 참가했는지 썼어요.', '광고의 약속과 실제를 두 가지 이상 짝지어 썼어요.', '그 때문에 생긴 결과를 썼어요.', '요구를 숫자로 분명히 썼어요.', '답변 기한을 썼어요.', '정중한 말투를 끝까지 지켰어요.', 'Mit freundlichen Grüßen과 내 이름으로 끝냈어요.'],
  muster: {
    de: [
      'Beschwerde über die Sprachreise nach Freiburg (Buchungsnummer 7731)',
      'Sehr geehrte Damen und Herren,',
      'vom 4. bis 17. August habe ich an Ihrer Sprachreise nach Freiburg teilgenommen. Leider entsprach die Reise in mehreren Punkten nicht Ihrer Anzeige, weshalb ich mich hiermit bei Ihnen beschwere.',
      'Dort hieß es, die Gruppen bestünden aus höchstens acht Personen. Tatsächlich saßen wir zu sechzehnt im Unterricht, sodass jeder nur selten zu Wort kam. Statt eines Einzelzimmers erhielt ich zudem ein Dreibettzimmer, in dem konzentriertes Lernen unmöglich war. Entgegen Ihrer Zusage fand außerdem nur an drei Nachmittagen ein Freizeitprogramm statt.',
      'Unter diesen Umständen konnte ich meine Sprachkenntnisse kaum verbessern, obwohl ich für einen Intensivkurs bezahlt hatte.',
      'Ich fordere Sie daher auf, mir 30 Prozent des Reisepreises zu erstatten, und erwarte Ihre Stellungnahme bis zum 15. September. Andernfalls sehe ich mich gezwungen, mich an die Verbraucherzentrale zu wenden.',
      'Mit freundlichen Grüßen\nJunho Shin'
    ],
    ko: [
      '프라이부르크 어학연수에 대한 항의(예약 번호 7731)',
      '담당자님께,',
      '저는 8월 4일부터 17일까지 귀사의 프라이부르크 어학연수에 참가했습니다. 유감스럽게도 연수는 여러 점에서 귀사의 광고와 달랐기에 이 편지로 귀사에 항의합니다.',
      '광고에는 한 반이 최대 여덟 명이라고 되어 있었습니다. 실제로는 열여섯 명이 함께 수업을 들어서 각자 말할 기회가 드물었습니다. 또한 1인실 대신 3인실을 받아 집중해서 공부할 수 없었습니다. 게다가 귀사의 약속과 달리 여가 프로그램은 사흘 오후에만 있었습니다.',
      '집중 과정의 비용을 냈는데도 이런 상황에서는 언어 실력을 거의 늘릴 수 없었습니다.',
      '그러므로 연수 비용의 30퍼센트를 돌려주시기를 요구하며, 9월 15일까지 귀사의 답변을 기다리겠습니다. 그렇지 않으면 소비자 센터에 도움을 청할 수밖에 없습니다.',
      '안녕히 계십시오.\n신준호 드림'
    ],
    notes: [
      { de: 'Leider entsprach die Reise in mehreren Punkten nicht Ihrer Anzeige, weshalb …', ko: 'entsprechen + 3격이에요. weshalb(그래서)로 편지를 쓰는 이유를 이었어요. 동사는 맨 끝이에요.' },
      { de: 'Dort hieß es, die Gruppen bestünden aus höchstens acht Personen.', ko: '광고의 내용을 접속법으로 전했어요. bestehen의 접속법 I이 직설법과 같아서 접속법 II bestünden을 썼어요.' },
      { de: 'Tatsächlich saßen wir zu sechzehnt im Unterricht, sodass …', ko: 'Tatsächlich로 실제를 대비했어요. zu sechzehnt는 「열여섯 명이서」, sodass는 결과를 나타내요.' },
      { de: 'Statt eines Einzelzimmers … / Entgegen Ihrer Zusage …', ko: 'statt + 2격, entgegen + 3격으로 약속과 실제를 짧게 대비했어요.' },
      { de: '…, obwohl ich für einen Intensivkurs bezahlt hatte.', ko: '연수보다 먼저 일어난 일이라 과거완료(hatte bezahlt)를 썼어요.' },
      { de: 'Ich fordere Sie daher auf, mir 30 Prozent des Reisepreises zu erstatten', ko: '요구를 숫자로 밝혔어요. auffordern + zu 원형, des Reisepreises는 2격이에요.' }
    ]
  }
},
{
  id: 'b2-09', level: 'B2', no: 9,
  title: 'Eine Grafik beschreiben: Nachrichten', titleKo: '그래프를 설명하고 내 생각 쓰기',
  type: 'Grafikbeschreibung', typeKo: '그래프 설명',
  exam: 'B2 수업과 대학 준비 과정에서 쓰는 그래프 설명 유형 · C1 그래프 설명의 앞 단계',
  time: 30, words: [130, 170],
  intro: '막대그래프를 보고 주제, 중요한 수치, 변화를 설명한 뒤 내 경험과 생각을 덧붙여요. 수치를 말하는 여러 표현과 변화를 나타내는 동사를 익혀요.',
  goals: ['그래프의 주제와 출처를 첫 문단에서 소개해요', 'steigen, sinken, sich verdoppeln과 von … auf …를 바르게 써요', '모든 수치를 옮기지 않고 눈에 띄는 것만 골라 써요'],
  aufbau: [
    { de: 'Einleitung', ko: '도입: 주제와 출처', ex: 'Die Grafik zeigt, woher die Menschen in Deutschland ihre Nachrichten beziehen.' },
    { de: 'Wichtigste Ergebnisse', ko: '가장 중요한 결과', ex: 'Am deutlichsten ist die Veränderung bei den Nachrichten-Apps.' },
    { de: 'Weitere Entwicklungen', ko: '그 밖의 변화', ex: 'Dagegen ist der Anteil der gedruckten Zeitung … gesunken.' },
    { de: 'Eigene Erfahrung', ko: '내 경험', ex: 'Diese Entwicklung kann ich aus eigener Erfahrung bestätigen.' },
    { de: 'Bewertung', ko: '내 생각', ex: 'Meiner Meinung nach hat diese Entwicklung Vor- und Nachteile.' }
  ],
  tipps: [
    '변화의 크기는 um, 도착점은 auf로 말해요. von 12 auf 35 Prozent steigen / um 23 Prozentpunkte steigen',
    '숫자를 문장마다 바꿔 표현해요. 41 Prozent → gut 40 Prozent, vier von zehn Befragten, fast die Hälfte',
    '수치 네 개를 모두 쓰지 마세요. 가장 큰 변화와 가장 작은 변화를 골라 쓰면 돼요.',
    '지난 변화는 현재완료(ist gestiegen, ist gesunken)로 써요. steigen과 sinken은 sein과 함께 써요.'
  ],
  fehler: [
    { f: 'Der Anteil hat von 12 auf 35 Prozent gestiegen.', r: 'Der Anteil ist von 12 auf 35 Prozent gestiegen.', e: 'steigen과 sinken은 sein과 함께 현재완료를 만들어요.' },
    { f: 'Der Anteil ist auf 23 Prozentpunkte gestiegen.', r: 'Der Anteil ist um 23 Prozentpunkte gestiegen.', e: '변화의 크기는 um, 도착한 값은 auf로 말해요.' },
    { f: 'Die Grafik zeigt, woher beziehen die Menschen ihre Nachrichten.', r: 'Die Grafik zeigt, woher die Menschen ihre Nachrichten beziehen.', e: '간접의문문에서는 동사가 맨 끝에 와요.' },
    { f: 'Die Zahl der Zeitungsleser sind gesunken.', r: 'Die Zahl der Zeitungsleser ist gesunken.', e: '주어는 단수 die Zahl이에요. 동사도 단수로 써요.' }
  ],
  redemittel: [
    { g: '그래프 소개하기', items: [['Die Grafik zeigt, woher die Menschen ihre Nachrichten beziehen.', '이 그래프는 사람들이 뉴스를 어디에서 얻는지 보여 줘요.'], ['Die Angaben erfolgen in Prozent.', '수치는 퍼센트로 표시되어 있어요.'], ['Verglichen werden die Jahre 2015 und 2025.', '2015년과 2025년을 비교하고 있어요.'], ['Die Daten stammen aus einer Umfrage.', '자료는 설문 조사에서 나왔어요.']] },
    { g: '수치 말하기', items: [['Der Anteil liegt bei 38 Prozent.', '비율은 38퍼센트예요.'], ['gut ein Drittel / fast die Hälfte', '3분의 1 남짓 / 거의 절반'], ['vier von zehn Befragten', '응답자 열 명 가운데 네 명'], ['An erster Stelle steht das Fernsehen.', '1위는 텔레비전이에요.']] },
    { g: '변화 말하기', items: [['Der Anteil ist von 12 auf 35 Prozent gestiegen.', '비율이 12퍼센트에서 35퍼센트로 올랐어요.'], ['Der Anteil hat sich fast verdreifacht.', '비율이 거의 세 배가 됐어요.'], ['Der Anteil ist um 19 Prozentpunkte gesunken.', '비율이 19퍼센트포인트 내렸어요.'], ['Der Wert hat sich fast halbiert.', '값이 거의 절반으로 줄었어요.'], ['Das Fernsehen hat nur leicht verloren.', '텔레비전은 조금만 줄었어요.']] },
    { g: '비교하고 강조하기', items: [['Am deutlichsten ist die Veränderung bei …', '변화가 가장 뚜렷한 것은 …예요.'], ['Dagegen … / Im Gegensatz dazu …', '반면 …'], ['Auffällig ist, dass …', '눈에 띄는 것은 …라는 점이에요.']] },
    { g: '내 경험과 생각 말하기', items: [['Diese Entwicklung kann ich aus eigener Erfahrung bestätigen.', '이 변화는 제 경험으로도 확인할 수 있어요.'], ['Ich selbst lese Nachrichten fast nur noch auf dem Handy.', '저도 뉴스를 거의 휴대폰으로만 읽어요.'], ['Meiner Meinung nach hat diese Entwicklung Vor- und Nachteile.', '제 생각에 이 변화에는 좋은 점과 나쁜 점이 다 있어요.']] }
  ],
  uebung: [
    { t: 'mc', q: '알맞은 것은? Der Anteil ___ von 12 auf 35 Prozent gestiegen.', o: ['hat', 'ist', 'wird'], a: 1, e: 'steigen은 sein과 함께 현재완료를 만들어요.' },
    { t: 'fill', q: 'Der Anteil ist ___ 23 Prozentpunkte gestiegen.', a: ['um'], e: '얼마만큼 변했는지는 um으로 말해요.' },
    { t: 'fill', q: 'Der Anteil ist von 41 ___ 22 Prozent gesunken.', a: ['auf'], e: '도착한 값은 auf로 말해요. von … auf …' },
    { t: 'fix', q: 'Die Grafik zeigt, woher beziehen die Menschen ihre Nachrichten.', a: ['Die Grafik zeigt, woher die Menschen ihre Nachrichten beziehen.'], e: '간접의문문에서는 동사가 맨 끝에 와요.' },
    { t: 'mc', q: '「41 Prozent」를 다르게 말한 것으로 알맞은 것은?', o: ['knapp ein Viertel', 'gut 40 Prozent', 'mehr als die Hälfte'], a: 1, e: 'gut은 「~남짓」, knapp은 「~에 조금 못 미치는」이에요.' },
    { t: 'fill', q: 'Der Anteil der Apps hat ___ fast verdreifacht.', a: ['sich'], e: 'sich verdoppeln, sich verdreifachen, sich halbieren은 재귀동사예요.' }
  ],
  aufgabe: {
    lead: 'Die Grafik zeigt, welche Medien die Menschen in Deutschland in den Jahren 2015 und 2025 regelmäßig genutzt haben, um sich über Nachrichten zu informieren. Mehrere Antworten waren möglich.',
    chart: {
      title: 'Woher kommen die Nachrichten?',
      unit: 'Angaben in Prozent, Mehrfachnennungen möglich',
      source: 'Quelle: Umfrage zur Mediennutzung (Beispieldaten für den Unterricht)',
      series: ['2015', '2025'],
      rows: [
        { label: 'Fernsehen', ko: '텔레비전', v: [46, 38] },
        { label: 'Gedruckte Zeitung', ko: '종이 신문', v: [41, 22] },
        { label: 'Nachrichten-Apps', ko: '뉴스 앱', v: [12, 35] },
        { label: 'Soziale Medien', ko: '소셜 미디어', v: [9, 28] }
      ]
    },
    punkte: ['Beschreiben Sie, was die Grafik zeigt.', 'Nennen Sie die wichtigsten Veränderungen.', 'Berichten Sie, wie Sie selbst sich über Nachrichten informieren.', 'Wie bewerten Sie diese Entwicklung?'],
    close: 'Schreiben Sie etwa 130–170 Wörter.',
    ko: {
      lead: '이 그래프는 독일 사람들이 2015년과 2025년에 뉴스를 얻으려고 어떤 매체를 자주 이용했는지 보여 줘요. 여러 개를 고를 수 있었어요.',
      punkte: ['그래프가 무엇을 보여 주는지 설명하세요.', '가장 중요한 변화를 쓰세요.', '나는 뉴스를 어떻게 얻는지 쓰세요.', '이 변화를 어떻게 생각하나요?'],
      close: '130–170단어 정도로 쓰세요.'
    }
  },
  check: ['첫 문단에서 그래프의 주제를 소개했어요.', '가장 큰 변화를 수치와 함께 썼어요.', '줄어든 항목과 늘어난 항목을 대비했어요.', '수치를 두 가지 이상의 방식으로 표현했어요.', '내 경험을 썼어요.', '이 변화에 대한 내 생각을 썼어요.', 'steigen, sinken을 sein과 함께 썼어요.'],
  muster: {
    de: [
      'Die Grafik zeigt, über welche Medien sich die Menschen in Deutschland in den Jahren 2015 und 2025 über Nachrichten informiert haben. Die Angaben erfolgen in Prozent.',
      'Am deutlichsten ist die Veränderung bei den Nachrichten-Apps: Ihr Anteil hat sich von 12 auf 35 Prozent fast verdreifacht. Auch die sozialen Medien haben stark zugelegt und werden inzwischen von gut einem Viertel der Befragten genutzt. Dagegen ist der Anteil der gedruckten Zeitung von 41 auf 22 Prozent gesunken und hat sich damit fast halbiert. Das Fernsehen steht zwar weiterhin an erster Stelle, hat aber ebenfalls verloren.',
      'Diese Entwicklung kann ich aus eigener Erfahrung bestätigen. Ich selbst lese Nachrichten fast nur noch auf dem Handy, während meine Eltern jeden Abend die Fernsehnachrichten sehen.',
      'Meiner Meinung nach hat diese Entwicklung Vor- und Nachteile. Einerseits ist man schneller informiert, andererseits verbreiten sich in sozialen Medien auch viele falsche Meldungen. Deshalb sollte man immer prüfen, woher eine Nachricht stammt.'
    ],
    ko: [
      '이 그래프는 독일 사람들이 2015년과 2025년에 어떤 매체로 뉴스를 접했는지 보여 줘요. 수치는 퍼센트로 표시되어 있어요.',
      '변화가 가장 뚜렷한 것은 뉴스 앱이에요. 비율이 12퍼센트에서 35퍼센트로 거의 세 배가 됐어요. 소셜 미디어도 크게 늘어 이제 응답자의 4분의 1 남짓이 이용해요. 반면 종이 신문의 비율은 41퍼센트에서 22퍼센트로 내려 거의 절반이 됐어요. 텔레비전은 여전히 1위이지만 역시 줄었어요.',
      '이 변화는 제 경험으로도 확인할 수 있어요. 저도 뉴스를 거의 휴대폰으로만 읽고, 부모님은 매일 저녁 텔레비전 뉴스를 보세요.',
      '제 생각에 이 변화에는 좋은 점과 나쁜 점이 다 있어요. 한편으로는 소식을 더 빨리 알 수 있지만, 다른 한편으로는 소셜 미디어에서 잘못된 소식도 많이 퍼져요. 그래서 뉴스가 어디에서 나왔는지 늘 확인해야 해요.'
    ],
    notes: [
      { de: 'Die Grafik zeigt, über welche Medien sich die Menschen … informiert haben.', ko: '간접의문문으로 그래프의 주제를 소개했어요. 과제의 문장을 그대로 베끼지 않고 바꿔 썼어요.' },
      { de: 'Ihr Anteil hat sich von 12 auf 35 Prozent fast verdreifacht.', ko: 'von … auf …로 처음과 끝 값을, sich verdreifachen으로 변화의 크기를 말했어요.' },
      { de: '… werden inzwischen von gut einem Viertel der Befragten genutzt.', ko: '28퍼센트를 「4분의 1 남짓」으로 바꿔 표현했어요. 수동태 + von + 3격이에요.' },
      { de: 'Dagegen ist der Anteil … gesunken und hat sich damit fast halbiert.', ko: 'Dagegen으로 줄어든 항목을 대비했어요. sinken은 sein, sich halbieren은 haben과 써요.' },
      { de: 'Das Fernsehen steht zwar weiterhin an erster Stelle, hat aber ebenfalls verloren.', ko: 'zwar … aber로 「1위이긴 하지만 줄었다」를 한 문장에 담았어요.' },
      { de: 'Einerseits …, andererseits …', ko: '좋은 점과 나쁜 점을 한 문장으로 견주는 짝이에요. 둘 다 뒤에 동사가 바로 와요.' }
    ]
  }
},
{
  id: 'b2-10', level: 'B2', no: 10,
  title: 'Einen Vertrag kündigen', titleKo: '계약 해지 통지서 쓰기',
  type: 'Kündigungsschreiben', typeKo: '해지 통지서',
  exam: '독일 생활에서 실제로 쓰는 해지 통지서(Kündigung) · 헬스장, 휴대폰, 보험 계약에 그대로 쓸 수 있는 형식',
  time: 20, words: [90, 130],
  intro: '헬스장 회원 계약을 해지하는 통지서를 써요. 독일에서는 계약을 글로 해지해야 하는 경우가 많아요. 짧지만 빠지면 안 되는 내용과 굳어진 표현을 익혀요.',
  goals: ['제목에 무엇을 해지하는지와 회원 번호를 써요', 'hiermit kündige ich … fristgerecht zum …를 정확하게 써요', '해지 확인서를 요청하고 자동이체 동의를 철회해요'],
  aufbau: [
    { de: 'Betreff', ko: '제목', ex: 'Kündigung meiner Mitgliedschaft, Mitgliedsnummer 20417' },
    { de: 'Anrede', ko: '부르는 말', ex: 'Sehr geehrte Damen und Herren,' },
    { de: 'Kündigung', ko: '해지 선언', ex: 'hiermit kündige ich meine Mitgliedschaft fristgerecht zum 30. Juni.' },
    { de: 'Begründung', ko: '이유 (쓰지 않아도 됨)', ex: 'Grund dafür ist mein beruflich bedingter Umzug nach München.' },
    { de: 'Lastschrift', ko: '자동이체', ex: 'Zugleich widerrufe ich die Ihnen erteilte Einzugsermächtigung zum Vertragsende.' },
    { de: 'Bitte um Bestätigung', ko: '확인서 요청', ex: 'Bitte bestätigen Sie mir die Kündigung schriftlich.' },
    { de: 'Gruß', ko: '끝인사', ex: 'Mit freundlichen Grüßen' }
  ],
  tipps: [
    '해지 통지서는 짧을수록 좋아요. 감정이나 긴 설명은 쓰지 않아요.',
    '날짜를 모를 때는 zum nächstmöglichen Zeitpunkt(가능한 가장 빠른 시점에)를 덧붙여요.',
    '이유는 쓰지 않아도 되지만, 이사처럼 계약 기간보다 일찍 해지하려는 사정이 있으면 꼭 써요.',
    '해지 확인서와 계약이 끝나는 날짜를 글로 받아 두면 나중에 다툼이 없어요.'
  ],
  fehler: [
    { f: 'Hiermit ich kündige meine Mitgliedschaft.', r: 'Hiermit kündige ich meine Mitgliedschaft.', e: 'hiermit가 첫 자리에 오면 동사가 바로 뒤에 와요.' },
    { f: 'Ich kündige meine Mitgliedschaft am 30. Juni.', r: 'Ich kündige meine Mitgliedschaft zum 30. Juni.', e: '계약이 끝나는 날짜는 zum으로 말해요. am 30. Juni는 그날 통지한다는 뜻이 돼요.' },
    { f: 'Bitte bestätigen Sie mich die Kündigung.', r: 'Bitte bestätigen Sie mir die Kündigung.', e: 'jemandem(3격) etwas(4격) bestätigen이에요.' },
    { f: 'Ich kündige wegen meinem Umzug nach München.', r: 'Ich kündige wegen meines Umzugs nach München.', e: '격식 있는 글에서 wegen 뒤는 2격이에요.' }
  ],
  redemittel: [
    { g: '해지 선언하기', items: [['Hiermit kündige ich meine Mitgliedschaft fristgerecht zum 30. Juni.', '이 편지로 제 회원 계약을 기한에 맞춰 6월 30일 자로 해지합니다.'], ['…, hilfsweise zum nächstmöglichen Zeitpunkt.', '그것이 안 되면 가능한 가장 빠른 시점에 해지합니다.'], ['Hiermit kündige ich den oben genannten Vertrag.', '이 편지로 위에 적은 계약을 해지합니다.']] },
    { g: '이유 말하기', items: [['Grund dafür ist mein beruflich bedingter Umzug nach München.', '이유는 직장 때문에 뮌헨으로 이사하기 때문입니다.'], ['Da es an meinem neuen Wohnort kein Studio Ihrer Kette gibt, bitte ich um eine vorzeitige Beendigung des Vertrags.', '새로 살 곳에 귀사의 지점이 없으므로 계약을 일찍 끝내 주시기를 부탁드립니다.'], ['Eine Meldebescheinigung reiche ich gern nach.', '거주 등록 확인서는 나중에 기꺼이 내겠습니다.']] },
    { g: '자동이체 철회하기', items: [['Zugleich widerrufe ich die Ihnen erteilte Einzugsermächtigung zum Vertragsende.', '아울러 귀사에 드린 자동이체 동의를 계약 종료일 자로 철회합니다.'], ['Bitte buchen Sie nach diesem Datum keine Beiträge mehr ab.', '이 날짜 이후로는 회비를 인출하지 마시기 바랍니다.']] },
    { g: '확인서 요청하기', items: [['Bitte bestätigen Sie mir die Kündigung schriftlich.', '해지를 서면으로 확인해 주시기 바랍니다.'], ['Bitte teilen Sie mir das genaue Datum des Vertragsendes mit.', '계약이 끝나는 정확한 날짜를 알려 주시기 바랍니다.'], ['Vielen Dank im Voraus.', '미리 감사드립니다.']] },
    { g: '끝인사', items: [['Mit freundlichen Grüßen', '안녕히 계십시오 (격식 있는 끝인사)']] }
  ],
  uebung: [
    { t: 'fill', q: 'Hiermit kündige ich meine Mitgliedschaft ___ 30. Juni.', a: ['zum'], e: '계약이 끝나는 날짜는 zum + 날짜로 말해요.' },
    { t: 'mc', q: '「기한에 맞춰」를 뜻하는 말은?', o: ['fristlos', 'fristgerecht', 'vorzeitig'], a: 1, e: 'fristgerecht는 「해지 기한을 지켜서」, fristlos는 「기한 없이 즉시」, vorzeitig는 「기간보다 일찍」이에요.' },
    { t: 'fix', q: 'Hiermit ich kündige den Vertrag.', a: ['Hiermit kündige ich den Vertrag.'], e: 'hiermit 바로 뒤에 동사가 와요.' },
    { t: 'mc', q: '알맞은 것은? Bitte bestätigen Sie ___ die Kündigung schriftlich.', o: ['mich', 'mir', 'ich'], a: 1, e: '「나에게 확인해 주다」는 3격 mir예요.' },
    { t: 'fill', q: 'Ich kündige wegen ___ Umzugs nach München. (mein)', a: ['meines'], e: 'wegen + 2격이에요. 남성 2격은 meines이고 명사에 -s가 붙어요.' },
    { t: 'fill', q: 'Zugleich ___ ich die Einzugsermächtigung. (widerrufen)', a: ['widerrufe'], e: 'widerrufen은 비분리동사예요. 앞부분이 떨어지지 않아요.' }
  ],
  aufgabe: {
    lead: 'Sie sind seit zwei Jahren Mitglied im Fitnessstudio „FitPlus“ in Köln. Weil Sie aus beruflichen Gründen nach München ziehen, möchten Sie den Vertrag beenden. Schreiben Sie eine Kündigung.',
    punkte: ['Kündigen Sie den Vertrag und nennen Sie ein Datum.', 'Begründen Sie die Kündigung.', 'Klären Sie die Zahlung der Beiträge.', 'Bitten Sie um eine schriftliche Bestätigung.'],
    close: 'Schreiben Sie etwa 90–130 Wörter. Vergessen Sie nicht Betreff, Anrede und Gruß.',
    ko: {
      lead: '쾰른의 헬스장 「FitPlus」에 2년 전부터 다니고 있어요. 직장 때문에 뮌헨으로 이사하게 되어 계약을 끝내려고 해요. 해지 통지서를 쓰세요.',
      punkte: ['계약을 해지하고 날짜를 밝히세요.', '해지하는 이유를 쓰세요.', '회비 납부를 정리하세요.', '서면 확인을 요청하세요.'],
      close: '90–130단어 정도로 쓰세요. 제목, 부르는 말, 끝인사를 잊지 마세요.'
    }
  },
  check: ['제목에 Kündigung과 회원 번호를 썼어요.', 'Hiermit kündige ich …로 해지를 분명히 선언했어요.', '계약이 끝나는 날짜를 zum으로 썼어요.', '이유를 한두 문장으로 썼어요.', '자동이체에 대해 썼어요.', '서면 확인을 요청했어요.', '감정적인 표현 없이 짧게 썼어요.', 'Mit freundlichen Grüßen과 내 이름으로 끝냈어요.'],
  muster: {
    de: [
      'Kündigung meiner Mitgliedschaft, Mitgliedsnummer 20417',
      'Sehr geehrte Damen und Herren,',
      'hiermit kündige ich meine Mitgliedschaft in Ihrem Studio fristgerecht zum 30. Juni, hilfsweise zum nächstmöglichen Zeitpunkt.',
      'Grund dafür ist mein beruflich bedingter Umzug nach München. Da es an meinem neuen Wohnort kein Studio Ihrer Kette gibt, kann ich Ihr Angebot künftig nicht mehr nutzen. Eine Meldebescheinigung reiche ich Ihnen gern nach.',
      'Zugleich widerrufe ich die Ihnen erteilte Einzugsermächtigung zum Vertragsende. Bitte buchen Sie nach diesem Datum keine Beiträge mehr von meinem Konto ab.',
      'Bitte bestätigen Sie mir den Eingang dieses Schreibens sowie das genaue Datum des Vertragsendes schriftlich.',
      'Vielen Dank im Voraus.',
      'Mit freundlichen Grüßen\nMinseo Kwon'
    ],
    ko: [
      '회원 계약 해지, 회원 번호 20417',
      '담당자님께,',
      '이 편지로 귀 지점의 제 회원 계약을 기한에 맞춰 6월 30일 자로, 그것이 안 되면 가능한 가장 빠른 시점에 해지합니다.',
      '이유는 직장 때문에 뮌헨으로 이사하기 때문입니다. 새로 살 곳에 귀사의 지점이 없어 앞으로는 시설을 이용할 수 없습니다. 거주 등록 확인서는 나중에 기꺼이 내겠습니다.',
      '아울러 귀사에 드린 자동이체 동의를 계약 종료일 자로 철회합니다. 이 날짜 이후로는 제 계좌에서 회비를 인출하지 마시기 바랍니다.',
      '이 편지를 받으셨다는 것과 계약이 끝나는 정확한 날짜를 서면으로 확인해 주시기 바랍니다.',
      '미리 감사드립니다.',
      '안녕히 계십시오.\n권민서 드림'
    ],
    notes: [
      { de: 'hiermit kündige ich … fristgerecht zum 30. Juni, hilfsweise zum nächstmöglichen Zeitpunkt.', ko: '해지 통지서의 굳어진 문장이에요. hilfsweise 뒤의 말로 날짜가 틀렸을 때를 대비해요.' },
      { de: 'mein beruflich bedingter Umzug', ko: 'beruflich bedingt는 「직장 때문에 생긴」이에요. 과거분사가 형용사로 쓰였어요.' },
      { de: 'die Ihnen erteilte Einzugsermächtigung', ko: '분사 구문이에요. 「귀사에 드린 자동이체 동의」. 관계문 die ich Ihnen erteilt habe를 줄인 꼴이에요.' },
      { de: 'Bitte buchen Sie … keine Beiträge mehr von meinem Konto ab.', ko: 'abbuchen은 분리동사예요. kein … mehr는 「더는 ~않다」.' },
      { de: 'Bitte bestätigen Sie mir den Eingang dieses Schreibens … schriftlich.', ko: 'jemandem etwas bestätigen이에요. dieses Schreibens는 2격이에요.' }
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
    { g: '도입', items: [['In den letzten Jahren hat … stark an Bedeutung gewonnen.', '최근 몇 년 사이 …의 중요성이 크게 커졌어요.'], ['Kaum ein Thema wird derzeit so kontrovers diskutiert wie …', '요즘 …만큼 논란이 큰 주제는 드물어요.'], ['Im Folgenden sollen die wichtigsten Argumente abgewogen werden.', '아래에서는 가장 중요한 논거를 따져 보려 해요.']] },
    { g: '찬성 근거', items: [['Für … spricht in erster Linie, dass …', '…을 지지하는 가장 큰 근거는 …이에요.'], ['Ein gewichtiges Argument ist …', '무게 있는 논거는 …이에요.'], ['Nicht zu unterschätzen ist zudem, dass …', '또한 …라는 점도 가볍게 볼 수 없어요.']] },
    { g: '반대 근거', items: [['Dem steht allerdings entgegen, dass …', '그러나 이에 맞서는 것은 …라는 점이에요.'], ['Kritisch zu sehen ist jedoch …', '하지만 …은 비판적으로 보아야 해요.'], ['Gegner verweisen darauf, dass …', '반대하는 사람들은 …라는 점을 지적해요.'], ['Schwerer wiegt jedoch ein anderes Argument: …', '그러나 더 무거운 논거는 따로 있어요.']] },
    { g: '비교와 입장', items: [['Wägt man die Argumente gegeneinander ab, so …', '논거들을 서로 견주어 보면 …'], ['Meines Erachtens überwiegen …', '제가 보기에는 …이 더 커요.'], ['Ausschlaggebend ist für mich, dass …', '저에게 결정적인 것은 …라는 점이에요.']] },
    { g: '제안', items: [['Es wäre wünschenswert, dass …', '…라면 바람직할 거예요.'], ['Denkbar wäre etwa, dass …', '예를 들어 …하는 방안을 생각해 볼 수 있어요.'], ['… sollten klare Richtlinien erarbeiten, die …', '…은 …하는 분명한 지침을 마련해야 해요.']] },
    { g: '결론', items: [['Abschließend lässt sich festhalten, dass …', '끝으로 …라고 정리할 수 있어요.'], ['Entscheidend wird sein, ob es gelingt, …', '…에 성공하느냐가 관건이 될 거예요.']] }
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
      lead: '많은 대학이 학생들이 과제에 챗봇 같은 AI 프로그램을 써도 되는지 논의하고 있어요. 「대학 공부와 AI – 도움일까요, 위험일까요?」를 주제로 논증문을 쓰세요.',
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
      '대학 공부와 AI – 도움일까요, 위험일까요?',
      '챗봇 같은 AI 프로그램을 누구나 무료로 쓸 수 있게 된 뒤로 대학 공부는 눈에 띄게 달라졌어요. 몇 초 만에 글을 요약하고, 개요를 짜고, 문단 전체를 써 낼 수 있어요. 학생들이 이런 도구를 써도 되는지, 쓴다면 어디까지 써도 되는지만큼 요즘 대학에서 논란이 큰 문제는 드물어요.',
      '사용을 지지하는 가장 큰 근거는 AI가 지식에 다가가는 길을 쉽게 해 준다는 점이에요. 예를 들어 어려운 전공 글과 씨름하는 학생은 개념 설명을 받아 핵심에 더 빨리 다가갈 수 있어요. 또한 특히 모국어가 아닌 언어로 공부하는 학생들이 자기 글의 언어를 점검할 수 있다는 점도 가볍게 볼 수 없어요. 나아가 프로그램은 처음 떠오른 생각을 정리하고 글의 구성을 짜는 데도 도움이 돼요.',
      '그러나 이에 맞서는 것은 프로그램이 자주 틀리거나 심지어 지어낸 정보를 내놓는다는 점이에요. 프로그램을 무작정 믿는 사람은 그 오류를 그대로 가져가게 돼요. 하지만 더 무거운 논거는 따로 있어요. 글쓰기를 통째로 맡겨 버리는 사람은 대학 공부가 길러 주어야 할 바로 그 능력, 곧 스스로 생각하고 정확하게 논증하는 능력을 기르지 못해요.',
      '논거들을 견주어 보면 저는 전면 금지가 의미 있지도 않고 실제로 지켜질 수도 없다고 봐요. 저에게 결정적인 것은 AI를 쓰느냐가 아니라 어떻게 쓰느냐예요.',
      '그러므로 대학은 AI를 어디에 써도 되는지 정하는 분명한 지침을 마련해야 해요. 예를 들어 학생이 과제마다 어떤 도구를 썼는지 밝히게 하는 방안을 생각해 볼 수 있어요. 동시에 시험 방식도 구술 방어와 성찰에 더 무게를 두어야 할 거예요.',
      '끝으로 이렇게 정리할 수 있어요. AI는 만능 해결책도 위협도 아니에요. 관건은 학생들이 AI를 책임 있게 다룰 수 있도록 길러 내는 데 성공하느냐예요.'
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
    { g: '그래프 소개', items: [['Die Grafik gibt Auskunft darüber, wie/wie viele …', '이 그래프는 …에 대해 알려 줘요.'], ['Das Säulendiagramm zeigt …', '이 막대그래프는 …을 보여 줘요.'], ['Die Angaben stammen aus …', '자료의 출처는 …이에요.'], ['Verglichen werden die Jahre 2015 und 2025.', '2015년과 2025년을 비교해요.']] },
    { g: '결과 말하기', items: [['Auffällig ist zunächst, dass …', '먼저 눈에 띄는 것은 …이에요.'], ['An erster Stelle stehen …, gefolgt von …', '1위는 …이고, 그 뒤를 …이 이어요.'], ['Den größten Anteil machen … aus.', '가장 큰 비율을 차지하는 것은 …이에요.'], ['knapp die Hälfte / gut ein Viertel / fast ein Drittel', '절반에 조금 못 미치는 / 4분의 1이 조금 넘는 / 거의 3분의 1']] },
    { g: '변화 말하기', items: [['Der Anteil ist von 38 auf 44 Prozent gestiegen.', '비율이 38%에서 44%로 올랐어요.'], ['… ist um acht Prozentpunkte gestiegen.', '…이 8%포인트 올랐어요.'], ['… hat stark an Bedeutung verloren.', '…의 비중이 크게 줄었어요.'], ['… ist mit 12 Prozent gleich geblieben.', '…은 12%로 그대로예요.']] },
    { g: '이유 추측', items: [['Diese Entwicklung lässt sich vermutlich darauf zurückführen, dass …', '이 변화는 아마 …에서 비롯된 것으로 볼 수 있어요.'], ['Ein möglicher Grund dafür ist …', '그 이유로 …을 들 수 있어요.'], ['Zum einen …, zum anderen …', '한편으로는 …, 다른 한편으로는 …']] },
    { g: '비교와 정리', items: [['In meinem Heimatland sieht die Situation etwas anders aus.', '우리나라의 상황은 조금 달라요.'], ['Ähnlich wie in Deutschland …', '독일과 비슷하게 …'], ['Insgesamt zeigt die Grafik deutlich, dass …', '전체적으로 이 그래프는 …을 분명히 보여 줘요.']] }
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
      '이 그래프는 독일의 한 대학 학생들이 주로 어떤 교통수단으로 학교에 오는지 알려 줘요. 2015년과 2025년을 비교하고 있어요. 자료는 학생 설문 조사에서 나왔으며 백분율로 나타냈어요.',
      '먼저 눈에 띄는 것은 두 해 모두 버스와 전철이 1위라는 점이에요. 그 비율은 38%에서 44%로 올랐어요. 이제 학생의 절반에 조금 못 미치는 수가 대중교통을 이용하는 셈이에요. 자전거는 더 뚜렷하게 늘었어요. 자전거 이용자의 비율은 8%포인트 올라 27%가 되었어요. 반면 자동차의 비중은 크게 줄었어요. 2015년에는 31%가 자기 차로 왔지만 2025년에는 17%에 그쳤어요. 걸어서 오는 학생의 비율은 12%로 그대로예요.',
      '이 변화는 아마 여러 원인에서 비롯된 것으로 볼 수 있어요. 한편으로는 많은 대학 근처의 주차 공간이 부족해지고 비싸졌어요. 다른 한편으로는 저렴한 학기 교통권이 자동차를 대신할 매력적인 선택지가 되었어요. 게다가 많은 도시가 자전거 도로를 넓혔어요.',
      '한국의 상황은 조금 달라요. 한국에서도 대부분의 학생이 지하철과 버스를 이용해요. 하지만 서울 같은 대도시에서는 이동 거리가 긴 경우가 많고 안전한 자전거 도로가 어디에나 있는 것은 아니어서 자전거의 비중이 비교적 작아요.',
      '전체적으로 이 그래프는 학생들의 이동 습관이 친환경 교통수단 쪽으로 옮겨 갔다는 것을 분명히 보여 줘요.'
    ],
    notes: [
      { de: 'Die Grafik gibt Auskunft darüber, mit welchen …', ko: '첫 문장에서 그래프의 주제를 간접의문문으로 정리했어요.' },
      { de: 'von 38 auf 44 Prozent / um acht Prozentpunkte auf 27 Prozent', ko: '출발값은 von, 도착값은 auf, 변한 폭은 um이에요. 백분율 차이는 Prozentpunkte예요.' },
      { de: 'Fuhren 2015 noch 31 Prozent …, waren es 2025 nur noch 17 Prozent.', ko: '동사를 맨 앞에 둔 문장 두 개로 과거와 현재를 맞대어 보여 줬어요.' },
      { de: 'der Anteil derjenigen, die zu Fuß gehen', ko: 'derjenigen(2격 복수) + 관계문 = 「…하는 사람들의」.' },
      { de: 'lässt sich vermutlich auf … zurückführen', ko: '그래프에 없는 이유라서 vermutlich로 조심스럽게 추측했어요.' }
    ]
  }
},
{
  id: 'c1-03', level: 'C1', no: 3,
  title: 'E-Mail an eine Professorin', titleKo: '교수님께 기한 연장 요청하기',
  type: 'Formelle E-Mail', typeKo: '대학 격식 이메일',
  exam: 'Goethe-Zertifikat C1 쓰기 Teil 2(격식 메시지)와 비슷한 유형 · 대학에서 교수에게 쓰는 메일',
  time: 20, words: [100, 140],
  intro: '과제 제출 기한을 늦춰 달라고 교수님께 부탁하는 이메일을 써요. 짧은 글이지만 호칭, 제목, 사정 설명, 부탁하는 표현을 모두 알맞게 써야 해요.',
  goals: ['교수에게 맞는 호칭과 제목(Betreff)을 써요', '사정을 변명처럼 들리지 않게 간결하고 사실대로 설명해요', '부탁을 Konjunktiv II와 명사구로 격식 있게 표현해요'],
  aufbau: [
    { de: 'Betreff', ko: '제목', ex: 'Bitte um Fristverlängerung – Hausarbeit im Seminar „Sprache und Migration“' },
    { de: 'Anrede', ko: '부르는 말', ex: 'Sehr geehrte Frau Professorin Lindner,' },
    { de: 'Vorstellung und Anliegen', ko: '내가 누구인지와 용건', ex: 'ich besuche in diesem Semester Ihr Seminar … und wende mich mit einer Bitte an Sie.' },
    { de: 'Situation', ko: '사정', ex: 'Aufgrund einer Erkrankung konnte ich … nicht an meiner Hausarbeit arbeiten.' },
    { de: 'Bitte mit konkretem Termin', ko: '구체적인 날짜를 넣은 부탁', ex: 'Ich möchte Sie daher fragen, ob es möglich wäre, die Abgabefrist bis zum 14. März zu verlängern.' },
    { de: 'Dank und Gruß', ko: '감사와 끝인사', ex: 'Für Ihr Verständnis danke ich Ihnen im Voraus. / Mit freundlichen Grüßen / Doyun Lim' }
  ],
  tipps: [
    '교수에게는 Sehr geehrte Frau Professorin Lindner, / Sehr geehrter Herr Professor Lindner,라고 써요. 직함은 Prof.로 줄여도 되지만, Hallo로 시작하거나 성을 빼고 쓰지 않아요.',
    '제목만 읽어도 용건을 알 수 있게 써요. 무엇을 부탁하는지와 어느 수업인지를 넣어요.',
    '교수는 수강생을 모두 기억하지 못해요. 첫 문장에서 어느 수업을 듣는 누구인지 밝히고, 끝에 학번을 적어요.',
    '사정은 한두 문장이면 충분해요. 길게 사과하기보다 새 날짜와 증빙(진단서, 지금까지 쓴 부분)을 제시하면 부탁이 받아들여지기 쉬워요.'
  ],
  fehler: [
    { f: 'Hallo Frau Lindner,', r: 'Sehr geehrte Frau Professorin Lindner,', e: '교수에게 쓰는 첫 메일은 격식 있는 호칭과 직함으로 시작해요.' },
    { f: 'Ich brauche unbedingt mehr Zeit.', r: 'Wäre es möglich, die Abgabefrist um eine Woche zu verlängern?', e: '요구가 아니라 부탁이에요. Konjunktiv II로 가능한지 물어요.' },
    { f: 'Ich konnte wegen privaten Problemen leider gar nichts machen.', r: 'Aus persönlichen Gründen konnte ich in den letzten zwei Wochen nicht an der Arbeit schreiben.', e: '「아무것도 못 했다」 같은 막연한 말 대신 기간과 사실을 써요. 이유는 aus persönlichen Gründen처럼 명사구로 말하면 격식 있어요.' },
    { f: 'Ich bitte um Verlängerung von der Frist bis 14. März.', r: 'Ich bitte um eine Verlängerung der Frist bis zum 14. März.', e: '격식 있는 글에서는 von + 3격 대신 2격을 써요. 날짜 앞에는 bis zum을 써요.' }
  ],
  redemittel: [
    { g: '호칭과 제목', items: [['Sehr geehrte Frau Professorin Lindner,', '린드너 교수님께 (여자)'], ['Sehr geehrter Herr Professor Lindner,', '린드너 교수님께 (남자)'], ['Betreff: Bitte um Fristverlängerung', '제목: 기한 연장 요청'], ['Betreff: Frage zur Hausarbeit im Seminar „…“', '제목: 「…」 세미나 과제에 관한 질문']] },
    { g: '용건 꺼내기', items: [['Ich besuche in diesem Semester Ihr Seminar „…“.', '이번 학기에 교수님의 「…」 세미나를 수강하고 있습니다.'], ['Ich wende mich mit einer Bitte an Sie.', '부탁드릴 일이 있어 연락드립니다.'], ['Ich schreibe Ihnen wegen meiner Hausarbeit.', '과제 때문에 메일을 드립니다.']] },
    { g: '사정 설명하기', items: [['Aufgrund einer Erkrankung konnte ich zwei Wochen lang nicht arbeiten.', '병으로 2주 동안 작업하지 못했습니다.'], ['Aus persönlichen Gründen …', '개인적인 사정으로 …'], ['Dadurch bin ich in Verzug geraten.', '그 때문에 일정이 늦어졌습니다.'], ['Trotz aller Bemühungen kann ich den Abgabetermin nicht einhalten.', '온갖 노력을 했지만 제출 기한을 지킬 수 없습니다.']] },
    { g: '부탁하기', items: [['Wäre es möglich, die Abgabefrist bis zum 14. März zu verlängern?', '제출 기한을 3월 14일까지 연장하는 것이 가능하겠습니까?'], ['Ich möchte Sie daher fragen, ob …', '그래서 …인지 여쭙고 싶습니다.'], ['Ich wäre Ihnen sehr dankbar, wenn Sie mir eine Woche mehr Zeit geben könnten.', '일주일 더 시간을 주신다면 대단히 감사하겠습니다.'], ['Ein ärztliches Attest reiche ich gern nach.', '진단서는 추후에 제출하겠습니다.']] },
    { g: '감사와 끝인사', items: [['Für Ihr Verständnis danke ich Ihnen im Voraus.', '이해해 주시리라 믿고 미리 감사드립니다.'], ['Vielen Dank für Ihre Mühe.', '수고해 주셔서 감사합니다.'], ['Mit freundlichen Grüßen', '안녕히 계십시오']] }
  ],
  uebung: [
    { t: 'mc', q: '여자 교수에게 쓰는 첫 메일의 호칭으로 알맞은 것은?', o: ['Hallo Frau Lindner,', 'Sehr geehrte Frau Professorin Lindner,', 'Liebe Professorin,'], a: 1, e: 'Sehr geehrte + Frau + 직함 + 성 순서로 써요.' },
    { t: 'fill', q: 'Wäre es möglich, die Abgabefrist ___ zwei Wochen zu verlängern?', a: ['um'], e: '얼마만큼 늘리는지는 um으로 말해요. bis zum 14. März는 언제까지인지를 말해요.' },
    { t: 'fix', q: 'Ich bitte um Verlängerung von der Frist.', a: ['Ich bitte um eine Verlängerung der Frist.', 'Ich bitte um Verlängerung der Frist.', 'Ich bitte um die Verlängerung der Frist.', 'Ich bitte um eine Fristverlängerung.', 'Ich bitte um Fristverlängerung.'], e: '격식 있는 글에서는 von der Frist 대신 2격 der Frist를 써요. 한 낱말 Fristverlängerung으로 써도 돼요.' },
    { t: 'fill', q: 'Ein ärztliches Attest ___ ich gern nach.', a: ['reiche', 'liefere'], e: 'etwas nachreichen = 서류를 나중에 제출하다. 분리동사라 nach가 끝으로 가요.' },
    { t: 'mc', q: '사정을 설명하는 문장으로 가장 알맞은 것은?', o: ['Ich hatte leider totalen Stress und habe nichts geschafft.', 'Aufgrund einer Erkrankung konnte ich zwei Wochen lang nicht an der Arbeit schreiben.', 'Es war nicht meine Schuld, dass ich nicht fertig bin.'], a: 1, e: '첫 문장은 구어체이고 셋째 문장은 변명처럼 들려요. 원인과 기간을 사실대로 쓴 문장이 알맞아요.' },
    { t: 'fill', q: 'Dadurch bin ich mit der Arbeit in ___ geraten.', a: ['Verzug', 'Rückstand'], e: 'in Verzug geraten = 일정이 늦어지다. in Rückstand geraten도 같은 뜻이에요.' }
  ],
  aufgabe: {
    lead: 'Sie besuchen an einer deutschen Universität das Seminar „Sprache und Migration“ bei Frau Professorin Lindner. Bis zum 28. Februar müssen Sie eine Hausarbeit abgeben. Weil Sie zwei Wochen krank waren, schaffen Sie das nicht rechtzeitig. Schreiben Sie Ihrer Professorin eine E-Mail.',
    punkte: ['Stellen Sie sich kurz vor und nennen Sie Ihr Anliegen.', 'Schildern Sie Ihre Situation.', 'Bitten Sie um eine Verlängerung und schlagen Sie einen neuen Abgabetermin vor.', 'Bedanken Sie sich.'],
    close: 'Schreiben Sie mindestens 100 Wörter. Denken Sie an einen passenden Betreff, die Anrede und den Gruß.',
    ko: {
      lead: '독일의 한 대학에서 린드너 교수님의 「언어와 이주」 세미나를 듣고 있어요. 2월 28일까지 과제를 내야 해요. 2주 동안 아팠기 때문에 제때 끝낼 수 없어요. 교수님께 이메일을 쓰세요.',
      punkte: ['짧게 자신을 소개하고 용건을 밝히세요.', '사정을 설명하세요.', '기한 연장을 부탁하고 새 제출일을 제안하세요.', '감사 인사를 하세요.'],
      close: '100단어 이상 쓰세요. 알맞은 제목, 부르는 말, 끝인사를 잊지 마세요.'
    }
  },
  check: ['용건이 드러나는 제목(Betreff)을 썼어요.', 'Sehr geehrte Frau Professorin Lindner,로 시작했어요.', '어느 수업을 듣는지 밝혔어요.', '사정을 한두 문장으로 사실대로 썼어요.', '새 제출일을 구체적인 날짜로 제안했어요.', '부탁을 Konjunktiv II로 표현했어요.', '감사 인사와 끝인사를 썼어요.', '100단어 이상 썼어요.'],
  muster: {
    de: [
      'Betreff: Bitte um Fristverlängerung – Hausarbeit im Seminar „Sprache und Migration“',
      'Sehr geehrte Frau Professorin Lindner,',
      'ich besuche in diesem Semester Ihr Seminar „Sprache und Migration“ und wende mich mit einer Bitte an Sie.',
      'Aufgrund einer Erkrankung konnte ich in den vergangenen zwei Wochen nicht an meiner Hausarbeit arbeiten. Dadurch bin ich so sehr in Verzug geraten, dass ich den Abgabetermin am 28. Februar trotz aller Bemühungen nicht einhalten kann.',
      'Ich möchte Sie daher fragen, ob es möglich wäre, die Abgabefrist bis zum 14. März zu verlängern. Ein ärztliches Attest reiche ich selbstverständlich gern nach. Die Gliederung und das erste Kapitel liegen bereits vor; auf Wunsch sende ich Ihnen beides vorab zu.',
      'Für Ihr Verständnis danke ich Ihnen im Voraus.',
      'Mit freundlichen Grüßen\nDoyun Lim\n(Matrikelnummer 2087654)'
    ],
    ko: [
      '제목: 기한 연장 요청 – 「언어와 이주」 세미나 과제',
      '린드너 교수님께,',
      '저는 이번 학기에 교수님의 「언어와 이주」 세미나를 수강하고 있으며, 부탁드릴 일이 있어 연락드립니다.',
      '병으로 지난 2주 동안 과제를 쓰지 못했습니다. 그 때문에 일정이 크게 늦어져, 온갖 노력을 다해도 2월 28일 제출 기한을 지킬 수 없게 되었습니다.',
      '그래서 제출 기한을 3월 14일까지 연장해 주실 수 있는지 여쭙고 싶습니다. 진단서는 당연히 추후에 제출하겠습니다. 목차와 첫 장은 이미 완성되어 있으며, 원하시면 두 가지를 먼저 보내 드리겠습니다.',
      '이해해 주시리라 믿고 미리 감사드립니다.',
      '안녕히 계십시오.\n임도윤 드림\n(학번 2087654)'
    ],
    notes: [
      { de: 'Betreff: Bitte um Fristverlängerung – …', ko: '제목만 읽어도 무엇을 부탁하는지, 어느 수업인지 알 수 있어요. 실제 메일에서는 제목 칸에 쓰는 내용이에요.' },
      { de: 'ich besuche in diesem Semester Ihr Seminar …', ko: '첫 문장에서 내가 누구인지 밝혔어요. 교수가 바로 상황을 파악할 수 있어요.' },
      { de: 'Aufgrund einer Erkrankung …', ko: 'aufgrund + 2격으로 이유를 명사구에 담았어요. weil ich krank war보다 격식 있고 간결해요.' },
      { de: '… so sehr in Verzug geraten, dass …', ko: 'so … dass(너무 …해서 …하다)로 결과를 이었어요.' },
      { de: 'Ich möchte Sie daher fragen, ob es möglich wäre, …', ko: '간접의문문과 Konjunktiv II(wäre)를 함께 써서 부탁을 더 조심스럽게 표현했어요.' },
      { de: 'Die Gliederung und das erste Kapitel liegen bereits vor', ko: '지금까지 한 일을 보여 주면 부탁이 더 믿을 만해 보여요. vorliegen = 이미 나와 있다.' }
    ]
  }
},
{
  id: 'c1-04', level: 'C1', no: 4,
  title: 'Einen Sachtext zusammenfassen', titleKo: '글 요약하기',
  type: 'Zusammenfassung', typeKo: '요약문',
  exam: '대학 과제에서 쓰는 요약문 · digital TestDaF 쓰기 Aufgabe 2(글과 그래프 요약)에 필요한 요약 연습',
  time: 35, words: [80, 110],
  intro: '설명문 한 편을 읽고 100단어 안팎으로 요약해요. 요약문은 내 의견 없이 글쓴이와 전문가의 말을 내 문장으로 옮기는 글이에요. 누구의 말인지 드러내는 접속법 I과 zufolge, laut가 핵심이에요.',
  goals: ['첫 문장에 글의 제목과 주제를 담아요', '남의 말을 접속법 I과 laut, zufolge로 옮겨요', '예시와 세부 내용을 버리고 핵심만 내 말로 다시 써요'],
  aufbau: [
    { de: 'Einleitungssatz', ko: '첫 문장: 제목과 주제', ex: 'Der Text „…“ befasst sich mit der Frage, warum …' },
    { de: 'Kernaussage', ko: '핵심 주장', ex: 'Der Psychologin Anna Weber zufolge ist dieses Verhalten kein Zeichen von Faulheit.' },
    { de: 'Ursachen', ko: '원인', ex: 'Als Hauptursache nennt sie unangenehme Gefühle wie …' },
    { de: 'Folgen', ko: '결과', ex: 'Das Aufschieben führe zu …' },
    { de: 'Empfehlungen', ko: '권고', ex: 'Weber empfiehlt deshalb, Aufgaben in kleine Schritte zu gliedern.' }
  ],
  tipps: [
    '요약문은 현재 시제로 쓰고, 내 의견이나 평가를 넣지 않아요. Ich finde …, interessant, leider 같은 말은 빼요.',
    '읽으면서 단락마다 핵심어를 하나씩 적어 보세요. 이 글은 정의 → 원인 → 결과 → 권고 순서예요. 요약문도 이 순서를 따라가요.',
    '예시(집 청소, 휴대폰)와 되풀이되는 내용은 버려요. 여러 항목은 한 낱말로 묶어요. Stress, Schlafprobleme, schlechtes Gewissen → psychische Belastungen.',
    '원문 문장을 그대로 베끼지 않아요. 같은 뜻의 다른 낱말로 바꿔 쓰세요. zerlegen → gliedern, raten → empfehlen, die Beratung aufsuchen → Beratung in Anspruch nehmen.'
  ],
  fehler: [
    { f: 'Laut Weber sei Aufschieben keine Faulheit.', r: 'Laut Weber ist Aufschieben keine Faulheit.', e: 'laut, zufolge, nach Ansicht von이 이미 출처를 밝히므로 동사는 직설법으로 써요.' },
    { f: 'Der Text handelt über Prokrastination.', r: 'Der Text handelt von Prokrastination.', e: 'handeln von + 3격이에요. über를 쓰려면 Der Text informiert über …라고 해요.' },
    { f: 'Ich finde, dass der Text sehr interessant ist.', r: 'Der Text befasst sich mit den Ursachen des Aufschiebens.', e: '요약문에는 내 의견이나 평가를 쓰지 않아요.' },
    { f: 'Weber sagt, große Aufgaben lösen oft Angst aus.', r: 'Weber sagt, große Aufgaben lösten oft Angst aus.', e: '접속법 I(lösen)이 직설법과 모양이 같으면 접속법 II(lösten)나 würden + 원형(würden … auslösen)으로 바꿔 써요.' }
  ],
  redemittel: [
    { g: '첫 문장', items: [['Der Text „…“ befasst sich mit der Frage, warum …', '「…」라는 글은 왜 …인지를 다뤄요.'], ['In dem Text geht es um …', '이 글은 …에 관한 글이에요.'], ['Der Text handelt von …', '이 글은 …을 다뤄요.'], ['Der Artikel informiert über …', '이 기사는 …에 대해 알려 줘요.']] },
    { g: '남의 말 옮기기', items: [['Der Psychologin Anna Weber zufolge …', '심리학자 아나 베버에 따르면 …'], ['Laut Weber …', '베버에 따르면 …'], ['Nach Ansicht der Psychologin …', '그 심리학자의 견해로는 …'], ['Weber betont, dass …', '베버는 …이라고 강조해요.'], ['Als Hauptursache nennt sie …', '가장 큰 원인으로 …을 꼽아요.']] },
    { g: '원인과 결과', items: [['Ursache dafür sei …', '그 원인은 …이라고 해요.'], ['Hinzu kämen …', '여기에 …도 더해진다고 해요.'], ['Verschärft werde das Problem durch …', '…이 문제를 더 키운다고 해요.'], ['Dies führe zu …', '이것이 …으로 이어진다고 해요.']] },
    { g: '권고 옮기기', items: [['Weber empfiehlt deshalb, … zu …', '그래서 베버는 …하라고 권해요.'], ['Sie rät dazu, … zu …', '…하라고 조언해요.'], ['Wer …, solle …', '…하는 사람은 …해야 한다고 해요.']] },
    { g: '글의 흐름 잇기', items: [['Zunächst wird erklärt, was …', '먼저 …이 무엇인지 설명해요.'], ['Anschließend geht der Text auf … ein.', '이어서 글은 …을 다뤄요.'], ['Abschließend werden Empfehlungen gegeben.', '끝으로 권고를 제시해요.']] }
  ],
  uebung: [
    { t: 'mc', q: 'Der Text handelt ___ den Ursachen des Aufschiebens.', o: ['über', 'von', 'mit'], a: 1, e: 'handeln von + 3격이에요. sich befassen mit, informieren über와 구별해요.' },
    { t: 'fix', q: 'Laut Weber sei Aufschieben keine Faulheit.', a: ['Laut Weber ist Aufschieben keine Faulheit.'], e: 'laut가 이미 누구의 말인지 밝히므로 직설법 ist를 써요.' },
    { t: 'fill', q: 'Weber sagt, das Aufschieben ___ kurzfristig Erleichterung. (verschaffen, 접속법 I)', a: ['verschaffe'], e: '접속법 I의 3인칭 단수는 어간 + e예요. er verschafft → er verschaffe.' },
    { t: 'mc', q: '요약문에 알맞은 문장은?', o: ['Ich finde den Text sehr interessant, weil ich das Problem selbst kenne.', 'Weber empfiehlt, große Aufgaben in kleine Schritte zu gliedern.', 'Zum Beispiel putzt man die Wohnung oder schaut aufs Handy.'], a: 1, e: '첫 문장은 내 의견이고, 셋째 문장은 버려야 할 예시예요. 요약문에는 핵심 내용만 내 말로 옮겨요.' },
    { t: 'fill', q: 'Der Psychologin ___ hat das Verhalten wenig mit Faulheit zu tun.', a: ['zufolge', 'nach'], e: 'zufolge는 3격 명사 뒤에 놓여요. der Psychologin zufolge = 그 심리학자에 따르면. 같은 자리에 nach를 써도 돼요.' },
    { t: 'fill', q: 'Sie rät dazu, große Aufgaben in kleine Schritte zu ___.', a: ['zerlegen', 'gliedern', 'teilen', 'unterteilen'], e: 'etwas in + 4격 zerlegen = 무엇을 …으로 나누다. 요약문에서는 gliedern, unterteilen처럼 다른 낱말로 바꿔 쓰면 좋아요.' }
  ],
  aufgabe: {
    lead: 'Lesen Sie den folgenden Text. Fassen Sie ihn anschließend mit eigenen Worten zusammen.',
    brief: '„Morgen fange ich an“ – warum wir Wichtiges aufschieben\n\nFast alle Studierenden kennen die Situation: Die Hausarbeit müsste längst geschrieben sein, doch stattdessen wird die Wohnung geputzt oder aufs Handy geschaut. Fachleute nennen dieses Verhalten Prokrastination. Gemeint ist damit, dass wichtige Aufgaben immer wieder verschoben werden, obwohl man die negativen Folgen kennt. Mit Faulheit hat das nach Ansicht der Psychologin Anna Weber wenig zu tun. Wer aufschiebe, sei meist nicht untätig, sondern erledige andere, weniger wichtige Dinge.\n\nAls Hauptursache nennt Weber unangenehme Gefühle. Große Aufgaben lösten oft Angst vor dem Scheitern aus, und das Aufschieben verschaffe kurzfristig Erleichterung. Besonders gefährdet seien Menschen mit sehr hohen Ansprüchen an sich selbst: Aus Sorge, kein perfektes Ergebnis abzuliefern, fingen sie gar nicht erst an. Verstärkt werde das Problem durch unklare Aufgaben, weit entfernte Abgabetermine und die ständige Ablenkung durch digitale Medien.\n\nDie Folgen würden oft unterschätzt. Zwar gelinge es vielen, ihre Arbeit im letzten Moment doch noch fertigzustellen. Die Qualität leide jedoch häufig, und der wachsende Zeitdruck führe zu Stress, Schlafproblemen und einem schlechten Gewissen. In schweren Fällen verlängere sich das Studium, oder es werde ganz abgebrochen.\n\nWeber rät deshalb, große Aufgaben in kleine, überschaubare Schritte zu zerlegen und feste Arbeitszeiten einzuplanen. Hilfreich sei es außerdem, das Handy während dieser Zeiten auszuschalten und sich für erreichte Ziele zu belohnen. Auch feste Verabredungen zum gemeinsamen Lernen könnten helfen, weil man sich gegenüber anderen verpflichtet fühle. Wer trotz solcher Maßnahmen dauerhaft unter dem Aufschieben leide, solle die psychologische Beratung seiner Hochschule aufsuchen.',
    punkte: ['Nennen Sie das Thema und die Kernaussage des Textes.', 'Geben Sie die wichtigsten Ursachen und Folgen wieder.', 'Geben Sie die Empfehlungen der Psychologin wieder.', 'Schreiben Sie sachlich und ohne eigene Meinung.'],
    close: 'Schreiben Sie etwa 80–110 Wörter.',
    ko: {
      lead: '다음 글을 읽으세요(연습용으로 쓴 글이에요). 그런 다음 내 말로 요약하세요.',
      brief: '「내일부터 시작할게」 – 우리는 왜 중요한 일을 미룰까\n\n대학생이라면 거의 누구나 아는 상황이 있어요. 과제는 진작 썼어야 하는데, 그 대신 집을 청소하거나 휴대폰을 들여다봐요. 전문가들은 이런 행동을 미루기 습관(Prokrastination)이라고 불러요. 나쁜 결과를 알면서도 중요한 일을 자꾸 뒤로 미루는 것을 뜻해요. 심리학자 아나 베버의 견해로는 이것은 게으름과 별 관계가 없어요. 미루는 사람은 대개 아무것도 안 하는 것이 아니라 덜 중요한 다른 일을 처리한다고 해요.\n\n베버는 불쾌한 감정을 가장 큰 원인으로 꼽아요. 큰 과제는 실패에 대한 두려움을 불러일으킬 때가 많고, 미루면 잠깐은 마음이 놓인다고 해요. 스스로에게 거는 기대가 아주 높은 사람이 특히 위험하다고 해요. 완벽한 결과를 내지 못할까 걱정해서 아예 시작조차 하지 않는다는 거예요. 분명하지 않은 과제, 한참 남은 마감일, 디지털 매체 때문에 끊임없이 주의가 흐트러지는 것이 문제를 더 키운다고 해요.\n\n결과는 흔히 가볍게 여겨진다고 해요. 마지막 순간에 어떻게든 과제를 끝내는 사람이 많기는 해요. 하지만 질이 떨어질 때가 많고, 커지는 시간 압박은 스트레스와 수면 문제, 양심의 가책으로 이어진다고 해요. 심한 경우에는 졸업이 늦어지거나 학업을 완전히 그만두게 된다고 해요.\n\n그래서 베버는 큰 과제를 한눈에 들어오는 작은 단계로 나누고 일하는 시간을 정해 두라고 조언해요. 그 시간에는 휴대폰을 끄고, 목표를 이루면 스스로에게 상을 주는 것도 도움이 된다고 해요. 함께 공부하기로 약속을 정해 두는 것도 도움이 될 수 있는데, 다른 사람에게 책임감을 느끼기 때문이라고 해요. 이런 방법을 써도 미루는 버릇 때문에 오래 힘들다면 대학의 심리 상담실을 찾아가야 한다고 해요.',
      punkte: ['글의 주제와 핵심 주장을 쓰세요.', '가장 중요한 원인과 결과를 옮기세요.', '심리학자의 권고를 옮기세요.', '내 의견 없이 객관적으로 쓰세요.'],
      close: '80–110단어 정도로 쓰세요.'
    }
  },
  check: ['첫 문장에 글의 제목과 주제를 썼어요.', '핵심 주장(게으름이 아니다)을 옮겼어요.', '원인, 결과, 권고를 모두 담았어요.', '내 의견이나 평가를 쓰지 않았어요.', '누구의 말인지 zufolge, laut, 접속법 I로 드러냈어요.', '예시와 세부 내용을 뺐어요.', '원문 문장을 그대로 베끼지 않았어요.', '80–110단어로 썼어요.'],
  muster: {
    de: [
      'Der Text „Morgen fange ich an“ befasst sich mit der Frage, warum viele Studierende wichtige Aufgaben immer wieder aufschieben. Der Psychologin Anna Weber zufolge ist dieses als Prokrastination bezeichnete Verhalten kein Zeichen von Faulheit.',
      'Als Hauptursache nennt sie unangenehme Gefühle wie die Angst vor dem Scheitern. Hinzu kämen unklare Aufgaben, späte Fristen und digitale Ablenkung. Das Aufschieben führe zu schlechteren Leistungen und psychischen Belastungen, im Extremfall sogar zum Abbruch des Studiums.',
      'Weber empfiehlt deshalb, Aufgaben in kleine Schritte zu gliedern, sich feste Arbeitszeiten zu setzen und sich mit anderen zum Lernen zu verabreden. Wer dennoch dauerhaft unter dem Aufschieben leide, solle professionelle Beratung in Anspruch nehmen.'
    ],
    ko: [
      '「내일부터 시작할게」라는 글은 많은 대학생이 왜 중요한 일을 자꾸 미루는지를 다뤄요. 심리학자 아나 베버에 따르면 미루기 습관(Prokrastination)이라고 부르는 이 행동은 게으름의 표시가 아니에요.',
      '베버는 실패에 대한 두려움 같은 불쾌한 감정을 가장 큰 원인으로 꼽아요. 여기에 분명하지 않은 과제, 먼 마감일, 디지털 기기로 인한 산만함이 더해진다고 해요. 미루기는 성과를 떨어뜨리고 심리적 부담을 주며, 심한 경우에는 학업 중단으로까지 이어진다고 해요.',
      '그래서 베버는 과제를 작은 단계로 나누고, 일하는 시간을 정해 두고, 다른 사람과 함께 공부할 약속을 잡으라고 권해요. 그래도 미루는 버릇 때문에 오래 힘들다면 전문 상담을 받아야 한다고 해요.'
    ],
    notes: [
      { de: 'Der Text „…“ befasst sich mit der Frage, warum …', ko: '첫 문장에 제목과 주제를 담았어요. sich befassen mit + 3격 = …을 다루다.' },
      { de: 'Der Psychologin Anna Weber zufolge ist …', ko: 'zufolge가 출처를 밝히므로 동사는 직설법 ist예요.' },
      { de: 'dieses als Prokrastination bezeichnete Verhalten', ko: '분사구로 정의를 압축했어요. = dieses Verhalten, das als Prokrastination bezeichnet wird.' },
      { de: 'Hinzu kämen …', ko: 'kommen의 접속법 I(kommen)은 직설법과 모양이 같아요. 그래서 접속법 II(kämen)로 남의 말임을 나타냈어요.' },
      { de: 'Das Aufschieben führe zu schlechteren Leistungen und psychischen Belastungen', ko: '접속법 I(führe)로 베버의 말임을 나타냈어요. 원문의 Stress, Schlafprobleme, schlechtes Gewissen은 psychische Belastungen 한마디로 묶었어요.' },
      { de: 'Wer dennoch … leide, solle …', ko: '권고는 sollen의 접속법 I(solle)로 옮겨요. 원문의 trotz solcher Maßnahmen을 dennoch 한 낱말로 줄였어요.' }
    ]
  }
},
{
  id: 'c1-05', level: 'C1', no: 5,
  title: 'Motivationsschreiben für ein Masterstudium', titleKo: '석사 과정 지원 동기서 쓰기',
  type: 'Motivationsschreiben', typeKo: '지원 동기서',
  exam: '독일 대학 석사 과정·장학금 지원에 내는 Motivationsschreiben',
  time: 50, words: [250, 320],
  intro: '독일 대학 석사 과정에 지원할 때 내는 지원 동기서를 써요. 지금까지 한 공부와 경험, 이 전공과 이 대학을 고른 이유, 졸업 뒤의 목표를 차례로 이어 쓰면서, 내가 왜 이 과정에 맞는 사람인지 보여 주는 글이에요.',
  goals: ['이력 → 전공 동기 → 대학 선택 이유 → 진로 목표의 흐름을 만들어요', '막연한 말 대신 구체적인 경험과 사실로 동기를 증명해요', 'im Rahmen, darüber hinaus, langfristig처럼 격식 있는 연결 표현을 써요'],
  aufbau: [
    { de: 'Betreff', ko: '제목 줄', ex: 'Bewerbung um einen Studienplatz im Masterstudiengang „Deutsch als Fremdsprache“' },
    { de: 'Anrede und Einleitung', ko: '부르는 말과 도입: 무엇에 지원하는지', ex: 'hiermit bewerbe ich mich zum kommenden Wintersemester um einen Studienplatz …' },
    { de: 'Werdegang', ko: '지금까지의 공부와 경험', ex: 'Im Rahmen meines Bachelorstudiums habe ich mich in erster Linie mit … beschäftigt.' },
    { de: 'Motivation für das Fach', ko: '이 전공을 고른 이유', ex: 'Den entscheidenden Anstoß für meine Bewerbung gab meine Unterrichtspraxis.' },
    { de: 'Motivation für die Hochschule', ko: '이 대학을 고른 이유', ex: 'Ihr Studiengang überzeugt mich vor allem durch die enge Verbindung von Theorie und Praxis.' },
    { de: 'Berufliche Ziele', ko: '졸업 뒤의 목표', ex: 'Nach dem Abschluss möchte ich … Langfristig strebe ich an, …' },
    { de: 'Schluss und Gruß', ko: '마무리와 끝인사', ex: 'Über die Möglichkeit, mein Studium an Ihrer Universität fortzusetzen, würde ich mich sehr freuen. / Mit freundlichen Grüßen / Sujin Yoo' }
  ],
  tipps: [
    '「어릴 때부터 독일에 관심이 많았습니다」 같은 첫 문장은 누구나 써요. 무엇을 계기로 이 전공을 택하게 됐는지 구체적인 경험으로 시작하세요.',
    '이력서를 문장으로 옮겨 적는 글이 아니에요. 경험을 두세 가지만 고르고, 그 경험에서 무엇을 배웠고 왜 이 과정으로 이어지는지를 써요.',
    '대학 이름만 바꾸면 어디에나 낼 수 있는 글은 설득력이 떨어져요. 그 과정의 중점 분야, 수업, 실습처럼 그 대학에만 있는 것을 하나 이상 언급하세요.',
    '분량은 보통 A4 한 장이에요. 대학이 분량이나 형식을 정해 두는 경우가 많으니 지원 요강을 먼저 확인하세요.'
  ],
  fehler: [
    { f: 'Ich interessiere mich schon seit meiner Kindheit für Deutschland.', r: 'Mein Interesse an der Sprachdidaktik entstand, als ich in einem Tandemprogramm zum ersten Mal meine eigene Sprache erklären musste.', e: '누구나 쓸 수 있는 막연한 문장이에요. 언제, 무엇을 계기로 관심이 생겼는지 구체적으로 써요.' },
    { f: 'Ich möchte bei Ihrer Universität studieren.', r: 'Ich möchte an Ihrer Universität studieren.', e: '대학에서 공부한다고 할 때는 an + 3격을 써요.' },
    { f: 'Ich bin sehr fleißig, teamfähig und motiviert.', r: 'Im dritten Studienjahr habe ich eine Lerngruppe für Studienanfänger geleitet.', e: '성격을 나열하면 증명이 안 돼요. 그 성격이 드러나는 사실을 써요.' },
    { f: 'Ich hoffe, dass Sie mir eine Chance geben.', r: 'Über die Möglichkeit, mein Studium bei Ihnen fortzusetzen, würde ich mich sehr freuen.', e: '부탁하는 말투로 끝내지 말고, 기회를 얻으면 기쁘겠다는 뜻을 차분하게 써요.' }
  ],
  redemittel: [
    { g: '도입', items: [['Hiermit bewerbe ich mich um einen Studienplatz im Masterstudiengang „…“.', '「…」 석사 과정에 지원합니다.'], ['Zum kommenden Wintersemester möchte ich mein Studium an Ihrer Universität fortsetzen.', '오는 겨울 학기부터 귀 대학에서 학업을 이어 가고자 합니다.']] },
    { g: '이력', items: [['Im Rahmen meines Bachelorstudiums habe ich mich vor allem mit … beschäftigt.', '학사 과정에서 주로 …을 공부했습니다.'], ['Meine Abschlussarbeit habe ich über … geschrieben.', '졸업 논문은 …을 주제로 썼습니다.'], ['Während eines Auslandssemesters in Leipzig konnte ich …', '라이프치히에서 교환 학기를 보내는 동안 …할 수 있었습니다.'], ['Seit zwei Jahren unterrichte ich …', '2년 전부터 …을 가르치고 있습니다.']] },
    { g: '전공 동기', items: [['Den entscheidenden Anstoß für meine Bewerbung gab …', '지원을 결심한 결정적인 계기는 …이었습니다.'], ['Dabei ist mir bewusst geworden, dass …', '그 과정에서 …을 깨달았습니다.'], ['Mein Interesse an … wurde durch … geweckt.', '…에 대한 관심은 …을 계기로 생겼습니다.'], ['Mir fehlt das methodische Fundament, das ich mir im Studium erarbeiten möchte.', '저에게 부족한 방법론적 토대를 이 과정에서 쌓고자 합니다.']] },
    { g: '대학 선택 이유', items: [['Ihr Studiengang überzeugt mich vor allem durch …', '귀 과정이 무엇보다 마음에 드는 점은 …입니다.'], ['Besonders reizt mich der Schwerpunkt „…“.', '특히 「…」 중점 분야에 끌립니다.'], ['Darüber hinaus bietet mir das Studium die Möglichkeit, …', '나아가 이 과정은 …할 기회를 줍니다.']] },
    { g: '진로 목표', items: [['Nach dem Abschluss möchte ich …', '졸업 후에는 …하고자 합니다.'], ['Langfristig strebe ich an, …', '장기적으로는 …하는 것을 목표로 합니다.'], ['Mein Ziel ist es, …', '제 목표는 …하는 것입니다.']] },
    { g: '마무리', items: [['Über die Möglichkeit, mein Studium an Ihrer Universität fortzusetzen, würde ich mich sehr freuen.', '귀 대학에서 학업을 이어 갈 기회를 얻는다면 대단히 기쁘겠습니다.'], ['Für Rückfragen stehe ich Ihnen jederzeit gern zur Verfügung.', '궁금하신 점이 있으면 언제든 답변드리겠습니다.'], ['Mit freundlichen Grüßen', '안녕히 계십시오']] }
  ],
  uebung: [
    { t: 'mc', q: 'Ich möchte ___ Ihrer Universität studieren.', o: ['bei', 'an', 'in'], a: 1, e: 'an einer Universität studieren. 대학·학교 같은 기관에는 an을 써요.' },
    { t: 'fill', q: 'Im ___ meines Bachelorstudiums habe ich mich mit Sprachdidaktik beschäftigt.', a: ['Rahmen', 'Verlauf', 'Laufe', 'Lauf'], e: 'im Rahmen + 2격 = …의 일환으로. im Laufe, im Verlauf + 2격(…하는 동안)도 쓸 수 있어요.' },
    { t: 'fill', q: 'Das Praktikum hat mein Interesse ___ der Sprachdidaktik geweckt.', a: ['an'], e: 'das Interesse an + 3격이에요. 동사 sich interessieren für와 전치사가 달라요.' },
    { t: 'mc', q: '지원 동기서의 첫 단락에 가장 알맞은 문장은?', o: ['Schon als Kind habe ich Deutschland geliebt.', 'Seit zwei Jahren unterrichte ich Deutsch und stoße dabei immer wieder an methodische Grenzen.', 'Ich bin eine sehr motivierte und fleißige Person.'], a: 1, e: '구체적인 경험에서 출발하는 문장이 지원 동기를 가장 잘 보여 줘요.' },
    { t: 'fix', q: 'Langfristig strebe ich eine Tätigkeit als Dozentin.', a: ['Langfristig strebe ich eine Tätigkeit als Dozentin an.'], e: 'anstreben은 분리동사예요. 접두어 an이 문장 끝에 와야 해요.' },
    { t: 'fill', q: 'Ihr Studiengang überzeugt mich vor allem ___ die Verbindung von Theorie und Praxis.', a: ['durch'], e: 'durch + 4격으로 무엇이 마음을 움직였는지 말해요.' }
  ],
  aufgabe: {
    lead: 'Sie möchten sich an einer deutschen Universität für einen Masterstudiengang Ihrer Wahl bewerben. Die Universität verlangt ein Motivationsschreiben.',
    punkte: ['Stellen Sie Ihren bisherigen Werdegang dar (Studium, praktische Erfahrungen).', 'Begründen Sie, warum Sie dieses Fach studieren möchten.', 'Erläutern Sie, warum Sie sich für diese Universität entschieden haben.', 'Beschreiben Sie Ihre beruflichen Ziele nach dem Abschluss.'],
    close: 'Schreiben Sie etwa 250–320 Wörter. Denken Sie an Betreff, Anrede und Gruß.',
    ko: {
      lead: '독일 대학의 석사 과정 가운데 원하는 과정에 지원하려고 해요. 대학에서 지원 동기서를 요구해요.',
      punkte: ['지금까지의 이력(전공, 실무 경험)을 쓰세요.', '왜 이 전공을 공부하고 싶은지 이유를 쓰세요.', '왜 이 대학을 골랐는지 설명하세요.', '졸업 뒤의 진로 목표를 쓰세요.'],
      close: '250–320단어 정도로 쓰세요. 제목 줄, 부르는 말, 끝인사를 잊지 마세요.'
    }
  },
  check: ['제목 줄에 어느 과정에 지원하는지 썼어요.', '첫 단락에서 지원하는 과정과 학기를 밝혔어요.', '경험을 두세 가지 골라 구체적으로 썼어요.', '이 전공을 택한 계기를 경험과 연결했어요.', '이 대학에만 해당하는 이유를 하나 이상 썼어요.', '졸업 뒤의 목표를 썼어요.', '성격을 나열하지 않고 사실로 보여 줬어요.', '250단어 이상 썼어요.'],
  muster: {
    de: [
      'Bewerbung um einen Studienplatz im Masterstudiengang „Deutsch als Fremdsprache“',
      'Sehr geehrte Damen und Herren,',
      'hiermit bewerbe ich mich zum kommenden Wintersemester um einen Studienplatz im Masterstudiengang „Deutsch als Fremdsprache“ an Ihrer Universität.',
      'Im Rahmen meines Bachelorstudiums der Germanistik in Seoul habe ich mich in erster Linie mit Sprachwissenschaft und Sprachdidaktik beschäftigt. Meine Abschlussarbeit habe ich über typische Wortstellungsfehler koreanischer Deutschlernender geschrieben. Während eines Auslandssemesters in Leipzig konnte ich zudem an einem Tandemprogramm teilnehmen und erleben, wie unterschiedlich Menschen Sprachen lernen.',
      'Den entscheidenden Anstoß für meine Bewerbung gab jedoch meine Unterrichtspraxis. Seit zwei Jahren unterrichte ich an einer Sprachschule in Seoul Erwachsene auf den Niveaustufen A1 bis B1. Dabei ist mir bewusst geworden, dass gute Sprachkenntnisse allein nicht ausreichen, um Grammatik verständlich zu vermitteln. Immer wieder stoße ich im Unterricht auf Fragen, die ich aus der Praxis heraus nicht beantworten kann. Mir fehlt das methodische Fundament, das ich mir in einem wissenschaftlichen Studium erarbeiten möchte.',
      'Ihr Studiengang überzeugt mich vor allem durch die enge Verbindung von Theorie und Praxis. Besonders reizen mich der Schwerpunkt „Grammatikvermittlung“ und das integrierte Unterrichtspraktikum, in dem das Gelernte unmittelbar erprobt werden kann. Darüber hinaus bietet mir das Studium in Deutschland die Möglichkeit, meine eigenen Sprachkenntnisse auf ein Niveau zu bringen, das für die Arbeit mit fortgeschrittenen Lernenden unverzichtbar ist.',
      'Nach dem Abschluss möchte ich nach Korea zurückkehren und in der Aus- und Fortbildung von Deutschlehrkräften arbeiten. Langfristig strebe ich an, Lehrmaterialien zu entwickeln, die auf die besonderen Schwierigkeiten koreanischer Lernender zugeschnitten sind.',
      'Über die Möglichkeit, mein Studium an Ihrer Universität fortzusetzen, würde ich mich sehr freuen.',
      'Mit freundlichen Grüßen\nSujin Yoo'
    ],
    ko: [
      '「외국어로서의 독일어」 석사 과정 지원',
      '담당자님께,',
      '오는 겨울 학기 귀 대학의 「외국어로서의 독일어」 석사 과정에 지원합니다.',
      '저는 서울에서 독어독문학 학사 과정을 밟으며 주로 언어학과 언어 교수법을 공부했습니다. 졸업 논문은 한국인 독일어 학습자가 자주 틀리는 어순을 주제로 썼습니다. 또한 라이프치히에서 교환 학기를 보내는 동안 탄뎀 프로그램에 참여해, 사람마다 언어를 배우는 방식이 얼마나 다른지 직접 볼 수 있었습니다.',
      '그러나 지원을 결심한 결정적인 계기는 수업 경험이었습니다. 저는 2년 전부터 서울의 한 어학원에서 성인을 대상으로 A1부터 B1 단계까지 가르치고 있습니다. 그 과정에서 문법을 알기 쉽게 전달하려면 언어 실력만으로는 부족하다는 것을 깨달았습니다. 수업을 하다 보면 현장 경험만으로는 답할 수 없는 질문에 거듭 부딪힙니다. 저에게는 방법론적 토대가 부족하며, 이를 학문적인 과정에서 쌓고자 합니다.',
      '귀 과정이 무엇보다 마음에 드는 점은 이론과 실습이 긴밀하게 연결되어 있다는 것입니다. 특히 「문법 교수」 중점 분야와, 배운 것을 곧바로 시험해 볼 수 있는 통합 수업 실습에 끌립니다. 나아가 독일에서 공부하면 제 독일어 실력을 고급 학습자를 가르치는 데 꼭 필요한 수준으로 끌어올릴 수 있습니다.',
      '졸업 후에는 한국으로 돌아가 독일어 교사를 양성하고 재교육하는 일을 하고자 합니다. 장기적으로는 한국인 학습자가 겪는 특유의 어려움에 맞춘 교재를 개발하는 것을 목표로 합니다.',
      '귀 대학에서 학업을 이어 갈 기회를 얻는다면 대단히 기쁘겠습니다.',
      '안녕히 계십시오.\n유수진 드림'
    ],
    notes: [
      { de: 'hiermit bewerbe ich mich zum kommenden Wintersemester um einen Studienplatz …', ko: '첫 문장에 어느 과정에, 어느 학기에 지원하는지를 모두 담았어요. sich bewerben um + 4격.' },
      { de: 'Im Rahmen meines Bachelorstudiums der Germanistik …', ko: 'im Rahmen + 2격 = …의 일환으로. 2격 두 개(meines Bachelorstudiums, der Germanistik)가 이어져 있어요.' },
      { de: 'Den entscheidenden Anstoß für meine Bewerbung gab jedoch meine Unterrichtspraxis.', ko: '이력에서 동기로 넘어가는 문장이에요. 4격 목적어를 맨 앞에 두어 「결정적인 계기」를 강조했어요.' },
      { de: 'Dabei ist mir bewusst geworden, dass … nicht ausreichen, um … zu vermitteln.', ko: '경험에서 깨달은 점을 말해요. 「나는 이런 사람이다」가 아니라 「이런 일을 겪고 이것을 알게 됐다」로 써요.' },
      { de: 'Ihr Studiengang überzeugt mich vor allem durch …', ko: '이 대학을 고른 이유예요. 과정의 중점 분야와 실습처럼 그 대학에만 있는 것을 짚었어요.' },
      { de: 'Langfristig strebe ich an, Lehrmaterialien zu entwickeln, die auf … zugeschnitten sind.', ko: 'anstreben은 분리동사예요. auf etwas zugeschnitten sein = 무엇에 꼭 맞춰져 있다.' }
    ]
  }
},
{
  id: 'c1-06', level: 'C1', no: 6,
  title: 'Forumsbeitrag: Unbezahlte Praktika', titleKo: '포럼 토론 글 쓰기: 무급 인턴',
  type: 'Forumsbeitrag', typeKo: '포럼 토론 글',
  exam: 'Goethe-Zertifikat C1 쓰기 Teil 1(포럼 토론 글)과 비슷한 유형',
  time: 45, words: [220, 270],
  intro: '온라인 포럼의 토론에 내 글을 올려요. 요구 사항 네 가지를 모두 다루면서도 하나의 흐름으로 읽히게 쓰는 것이 C1의 과제예요. 입장을 조건과 함께 정교하게 밝히는 표현을 익혀요.',
  goals: ['요구 사항 네 가지를 문단 하나씩에 담고 서로 이어요', 'grundsätzlich … dennoch, sobald, wer … 문장으로 입장에 조건을 달아요', '명사화와 sich lassen 구문으로 문체를 압축해요'],
  aufbau: [
    { de: 'Einstieg mit Bezug zur Diskussion', ko: '토론에 이어 들어가기', ex: 'Die Diskussion in diesem Forum zeigt, wie unterschiedlich … bewertet werden.' },
    { de: 'Eigene Position', ko: '내 입장', ex: 'Grundsätzlich halte ich unbezahlte Praktika für problematisch, sobald …' },
    { de: 'Bedeutung für den Berufseinstieg', ko: '취업에서의 의미', ex: 'Dennoch wäre es falsch, den Wert von Praktika generell infrage zu stellen.' },
    { de: 'Alternativen', ko: '다른 방법', ex: 'Berufserfahrung lässt sich allerdings auch auf anderen Wegen sammeln.' },
    { de: 'Vorteile der Alternativen', ko: '그 방법의 장점', ex: 'Der Vorteil solcher Alternativen liegt auf der Hand: …' },
    { de: 'Fazit', ko: '결론', ex: 'Mein Fazit lautet daher: Praktika ja, aber nicht um jeden Preis.' }
  ],
  tipps: [
    '포럼 글이라도 C1에서는 말하듯 쓰지 않아요. 부르는 말 없이 토론에 이어지는 문장으로 시작하고, 문체는 중립적으로 유지해요.',
    '요구 사항의 문장을 그대로 옮기지 말고 바꿔 써요. Berufserfahrung sammeln → auf anderen Wegen in die Praxis kommen',
    '입장에 조건을 달면 글이 정교해져요. 「무급 인턴은 나쁘다」보다 「몇 주를 넘기면 문제가 된다」가 C1다운 주장이에요.',
    '문단의 첫 문장이 앞 문단을 받아야 해요. Dennoch, Allerdings, Der Vorteil solcher Alternativen처럼 앞 내용을 가리키는 말로 시작해요.'
  ],
  fehler: [
    { f: 'Wer drei Monate Vollzeit arbeitet, er sollte bezahlt werden.', r: 'Wer drei Monate Vollzeit arbeitet, sollte bezahlt werden.', e: 'wer로 시작하는 문장 뒤에는 주어를 다시 쓰지 않아요. 격이 같으면 der도 생략해요.' },
    { f: 'Es wäre falsch, den Wert von Praktika in Frage stellen.', r: 'Es wäre falsch, den Wert von Praktika infrage zu stellen.', e: 'Es wäre falsch 뒤에는 zu + 원형이 와요.' },
    { f: 'Berufserfahrung lässt sich auch anders gesammelt.', r: 'Berufserfahrung lässt sich auch anders sammeln.', e: 'sich lassen 뒤에는 과거분사가 아니라 원형이 와요.' },
    { f: 'Praktika sind kaum zu ersetzen, denn erst im Arbeitsalltag sich zeigt, ob …', r: 'Praktika sind kaum zu ersetzen, denn erst im Arbeitsalltag zeigt sich, ob …', e: 'denn 뒤는 주문장 어순이에요. erst im Arbeitsalltag이 첫 자리라 동사 zeigt가 두 번째예요.' }
  ],
  redemittel: [
    { g: '토론에 이어 들어가기', items: [['Die Diskussion in diesem Forum zeigt, wie unterschiedlich … bewertet werden.', '이 포럼의 토론은 …에 대한 평가가 얼마나 다른지 보여 줘요.'], ['Ich möchte etwas differenzierter antworten.', '저는 조금 더 나누어 답하고 싶어요.'], ['Aus eigener Erfahrung kann ich dazu Folgendes beitragen.', '제 경험에서 다음과 같은 점을 보탤 수 있어요.']] },
    { g: '조건을 달아 입장 밝히기', items: [['Grundsätzlich halte ich … für problematisch, sobald …', '원칙적으로 저는 …하면 곧 …가 문제라고 봐요.'], ['Wer …, sollte dafür auch entlohnt werden.', '…하는 사람은 그에 대한 대가도 받아야 해요.'], ['Hinzu kommt ein Gerechtigkeitsproblem.', '여기에 공정성의 문제가 더해져요.'], ['Dennoch wäre es falsch, … generell infrage zu stellen.', '그렇다고 …를 통째로 의심하는 것은 잘못일 거예요.']] },
    { g: '의미 설명하기', items: [['Gerade für den Berufseinstieg sind Praktika kaum zu ersetzen.', '특히 취업에서 인턴은 다른 것으로 바꾸기 어려워요.'], ['Erst im Arbeitsalltag zeigt sich, ob …', '일하는 일상 속에서야 …인지 드러나요.'], ['Zudem entstehen Kontakte, die sich später als entscheidend erweisen können.', '또한 나중에 결정적이었다고 밝혀질 수 있는 인맥이 생겨요.']] },
    { g: '다른 방법과 장점 말하기', items: [['Berufserfahrung lässt sich auch auf anderen Wegen sammeln.', '직업 경험은 다른 길로도 쌓을 수 있어요.'], ['Zu denken ist etwa an Werkstudentenstellen.', '예를 들어 근로 학생 자리를 생각해 볼 수 있어요.'], ['Der Vorteil solcher Alternativen liegt auf der Hand.', '이런 방법의 장점은 분명해요.'], ['…, sodass sie mehr Verantwortung übernehmen als …', '그래서 …보다 더 큰 책임을 맡아요.']] },
    { g: '결론 맺기', items: [['Mein Fazit lautet daher: …', '그래서 제 결론은 이래요. …'], ['Wer Leistung erwartet, muss sie auch honorieren.', '성과를 기대하는 쪽은 그에 대한 대가도 치러야 해요.'], ['… ja, aber nicht um jeden Preis.', '…는 좋지만 어떤 대가를 치르더라도 그런 것은 아니에요.']] }
  ],
  uebung: [
    { t: 'fix', q: 'Wer drei Monate Vollzeit arbeitet, er sollte bezahlt werden.', a: ['Wer drei Monate Vollzeit arbeitet, sollte bezahlt werden.', 'Wer drei Monate Vollzeit arbeitet, der sollte bezahlt werden.'], e: 'wer 문장 뒤에는 인칭대명사 er를 쓰지 않아요. 쓰려면 지시대명사 der를 써요.' },
    { t: 'fill', q: 'Berufserfahrung ___ sich auch auf anderen Wegen sammeln.', a: ['lässt'], e: 'sich lassen + 원형은 「~될 수 있다」예요. 주어가 단수라 lässt예요.' },
    { t: 'mc', q: '「~하자마자, ~하면 곧」을 뜻하는 접속사는?', o: ['sobald', 'solange', 'sofern'], a: 0, e: 'sobald는 「~하자마자」, solange는 「~하는 동안」, sofern은 「~라는 조건이라면」이에요.' },
    { t: 'fill', q: 'Es entstehen Kontakte, die sich später ___ entscheidend erweisen können.', a: ['als'], e: 'sich als + 형용사 erweisen은 「~인 것으로 밝혀지다」예요.' },
    { t: 'mc', q: '알맞은 것은? Praktika sind für den Berufseinstieg kaum ___.', o: ['ersetzt', 'zu ersetzen', 'ersetzend'], a: 1, e: 'sein + zu + 원형은 「~될 수 있다, ~되어야 한다」는 수동의 뜻이에요.' },
    { t: 'fill', q: 'Der Vorteil solcher Alternativen liegt auf der ___.', a: ['Hand'], e: 'auf der Hand liegen은 「분명하다, 뻔하다」는 굳은 표현이에요.' }
  ],
  aufgabe: {
    lead: 'In einem Online-Forum für Studierende wird über das Thema „Unbezahlte Praktika – Sprungbrett oder Ausbeutung?“ diskutiert. Schreiben Sie einen Beitrag für das Forum.',
    punkte: ['Äußern Sie Ihre Meinung zu unbezahlten Praktika.', 'Begründen Sie, warum Praktika für den Berufseinstieg wichtig sind.', 'Nennen Sie andere Möglichkeiten, Berufserfahrung zu sammeln.', 'Nennen Sie Vorteile dieser Möglichkeiten.'],
    close: 'Schreiben Sie mindestens 220 Wörter. Denken Sie an eine Einleitung und einen Schluss. Bei der Bewertung wird darauf geachtet, wie genau die Inhaltspunkte bearbeitet sind, wie korrekt der Text ist und wie gut die Sätze und Abschnitte verknüpft sind.',
    ko: {
      lead: '대학생 온라인 포럼에서 「무급 인턴 – 발판인가, 착취인가?」라는 주제로 토론하고 있어요. 이 포럼에 올릴 글을 쓰세요.',
      punkte: ['무급 인턴에 대한 내 의견을 말하세요.', '인턴이 취업에 왜 중요한지 근거를 대세요.', '직업 경험을 쌓을 수 있는 다른 방법을 드세요.', '그 방법들의 장점을 쓰세요.'],
      close: '220단어 이상 쓰세요. 도입과 결론을 넣으세요. 채점에서는 요구 사항을 얼마나 정확히 다뤘는지, 글이 얼마나 정확한지, 문장과 문단이 얼마나 잘 이어지는지를 봐요.'
    }
  },
  check: ['토론에 이어지는 문장으로 시작했어요.', '무급 인턴에 대한 내 입장을 조건과 함께 밝혔어요.', '인턴이 취업에 중요한 이유를 썼어요.', '다른 방법을 두 가지 이상 들었어요.', '그 방법의 장점을 썼어요.', '문단의 첫 문장이 앞 문단을 받아요.', '요구 사항의 문장을 그대로 옮기지 않았어요.', '결론으로 끝냈어요.'],
  muster: {
    de: [
      'Die Diskussion in diesem Forum zeigt, wie unterschiedlich unbezahlte Praktika bewertet werden. Ich selbst habe während meines Studiums zwei Praktika absolviert, eines davon ohne jede Vergütung, und möchte deshalb etwas differenzierter antworten.',
      'Grundsätzlich halte ich unbezahlte Praktika für problematisch, sobald sie länger als wenige Wochen dauern. Wer drei Monate lang Vollzeit arbeitet, leistet in der Regel einen echten Beitrag zum Unternehmen und sollte dafür auch entlohnt werden. Hinzu kommt ein Gerechtigkeitsproblem: Unbezahlt arbeiten kann nur, wer von den Eltern unterstützt wird. Alle anderen bleiben von begehrten Branchen wie Medien oder Kultur faktisch ausgeschlossen.',
      'Dennoch wäre es falsch, den Wert von Praktika generell infrage zu stellen. Gerade für den Berufseinstieg sind sie kaum zu ersetzen, denn erst im Arbeitsalltag zeigt sich, ob die eigenen Vorstellungen von einem Beruf der Realität standhalten. Zudem entstehen Kontakte, die sich später als entscheidend erweisen können.',
      'Berufserfahrung lässt sich allerdings auch auf anderen Wegen sammeln. Zu denken ist etwa an Werkstudentenstellen, an Projektarbeiten in Kooperation mit Unternehmen oder an ehrenamtliches Engagement.',
      'Der Vorteil solcher Alternativen liegt auf der Hand: Werkstudierende werden bezahlt und über einen längeren Zeitraum eingebunden, sodass sie mehr Verantwortung übernehmen als Praktikanten, die nach sechs Wochen wieder gehen. Ehrenamtliche Tätigkeiten wiederum fördern Fähigkeiten wie Organisationstalent und Teamarbeit, auf die Arbeitgeber großen Wert legen.',
      'Mein Fazit lautet daher: Praktika ja, aber nicht um jeden Preis. Wer Leistung erwartet, muss sie auch honorieren.'
    ],
    ko: [
      '이 포럼의 토론은 무급 인턴에 대한 평가가 얼마나 다른지 보여 줘요. 저도 대학 때 인턴을 두 번 했고 그 가운데 한 번은 아무 보수도 받지 못했어요. 그래서 조금 더 나누어 답하고 싶어요.',
      '원칙적으로 저는 무급 인턴이 몇 주를 넘기면 곧 문제가 된다고 봐요. 석 달 동안 전일제로 일하는 사람은 대개 회사에 실제로 기여하므로 그에 대한 대가도 받아야 해요. 여기에 공정성의 문제가 더해져요. 보수 없이 일할 수 있는 사람은 부모의 지원을 받는 사람뿐이에요. 나머지는 미디어나 문화처럼 인기 있는 분야에서 사실상 배제돼요.',
      '그렇다고 인턴의 가치를 통째로 의심하는 것은 잘못일 거예요. 특히 취업에서 인턴은 다른 것으로 바꾸기 어려워요. 어떤 직업에 대해 품은 생각이 현실 앞에서도 유지되는지는 일하는 일상 속에서야 드러나기 때문이에요. 또한 나중에 결정적이었다고 밝혀질 수 있는 인맥이 생겨요.',
      '하지만 직업 경험은 다른 길로도 쌓을 수 있어요. 예를 들어 근로 학생 자리, 기업과 함께하는 프로젝트 과제, 자원봉사를 생각해 볼 수 있어요.',
      '이런 방법의 장점은 분명해요. 근로 학생은 보수를 받고 더 긴 기간 동안 조직에 참여하므로, 6주 뒤에 떠나는 인턴보다 더 큰 책임을 맡아요. 한편 자원봉사는 기업이 중요하게 여기는 조직력과 협업 같은 능력을 길러 줘요.',
      '그래서 제 결론은 이래요. 인턴은 좋지만 어떤 대가를 치르더라도 그런 것은 아니에요. 성과를 기대하는 쪽은 그에 대한 대가도 치러야 해요.'
    ],
    notes: [
      { de: 'Grundsätzlich halte ich … für problematisch, sobald sie länger als wenige Wochen dauern.', ko: 'grundsätzlich와 sobald로 입장에 조건을 달았어요. 무조건적인 주장보다 정교해요.' },
      { de: 'Wer drei Monate lang Vollzeit arbeitet, leistet … und sollte dafür auch entlohnt werden.', ko: 'wer 문장이 주어 역할을 해요. 뒤에 주어를 다시 쓰지 않아요.' },
      { de: 'Unbezahlt arbeiten kann nur, wer von den Eltern unterstützt wird.', ko: '원형 구문을 첫 자리에 두고 wer 문장을 뒤로 보내 「~뿐이다」를 강조했어요.' },
      { de: 'Dennoch wäre es falsch, den Wert von Praktika generell infrage zu stellen.', ko: 'Dennoch가 앞 문단을 받으면서 두 번째 요구 사항으로 넘어가요.' },
      { de: '…, ob die eigenen Vorstellungen von einem Beruf der Realität standhalten.', ko: 'standhalten + 3격은 「~을 견뎌 내다」예요. ob 문장이라 동사가 끝에 붙어요.' },
      { de: 'Zu denken ist etwa an …', ko: 'sein + zu + 원형으로 「~를 생각해 볼 수 있다」를 객관적으로 표현했어요. ich를 쓰지 않는 C1 문체예요.' }
    ]
  }
},
{
  id: 'c1-07', level: 'C1', no: 7,
  title: 'Widerspruch gegen einen Bescheid', titleKo: '결정에 이의 제기하기',
  type: 'Widerspruch', typeKo: '이의 신청서',
  exam: '독일 대학과 관청의 결정에 이의를 제기하는 격식 서한(Widerspruch) · 대학 생활에서 실제로 쓰는 글',
  time: 30, words: [140, 190],
  intro: '교환학기에 딴 학점을 인정하지 않는다는 시험 사무처의 결정에 이의를 제기하는 서한을 써요. 감정을 빼고 결정문, 근거, 증빙, 요청을 차례로 제시하는 관청 문체를 익혀요.',
  goals: ['제목에 결정문의 날짜와 학번을 밝혀요', 'Widerspruch einlegen, zur Begründung anführen, in Aussicht stellen 같은 기능동사 구문을 써요', '상대의 근거를 접속법 I로 옮긴 뒤 증빙으로 반박해요'],
  aufbau: [
    { de: 'Betreff', ko: '제목', ex: 'Widerspruch gegen den Bescheid vom 12. März, Matrikelnummer 3120458' },
    { de: 'Widerspruch', ko: '이의 선언', ex: 'gegen Ihren oben genannten Bescheid … lege ich hiermit fristgerecht Widerspruch ein.' },
    { de: 'Wiedergabe der Begründung', ko: '상대 근거 옮기기', ex: 'Zur Begründung führen Sie an, die Module seien … nicht gleichwertig.' },
    { de: 'Eigene Begründung mit Nachweisen', ko: '내 근거와 증빙', ex: 'Wie aus den beigefügten Modulbeschreibungen hervorgeht, …' },
    { de: 'Bitte um erneute Prüfung', ko: '재검토 요청', ex: 'Ich bitte Sie daher, die Entscheidung … erneut zu prüfen.' },
    { de: 'Gruß und Anlagen', ko: '끝인사와 첨부', ex: 'Mit freundlichen Grüßen / Anlagen: …' }
  ],
  tipps: [
    '이의 신청에는 기한(대개 결정문을 받은 뒤 한 달)이 있어요. fristgerecht라는 말로 기한을 지켰다는 것을 밝혀요.',
    '상대의 근거는 접속법 I로 옮겨요. 내 생각이 아니라 상대의 말이라는 것이 문법으로 드러나요.',
    '「부당하다」 같은 평가어 대신 nicht nachvollziehen können(납득할 수 없다)을 쓰고, 곧바로 증빙을 가리켜요.',
    '첨부한 서류는 끝인사 아래 Anlagen에 적어요. 본문에서는 beigefügt, beiliegend로 가리켜요.'
  ],
  fehler: [
    { f: 'Ich lege hiermit Widerspruch gegen Ihrem Bescheid ein.', r: 'Ich lege hiermit Widerspruch gegen Ihren Bescheid ein.', e: 'gegen 뒤는 4격이에요. der Bescheid의 4격은 Ihren Bescheid예요.' },
    { f: 'Sie führen an, die Module sind nicht gleichwertig.', r: 'Sie führen an, die Module seien nicht gleichwertig.', e: '상대의 말을 옮길 때는 접속법 I(seien)을 써요.' },
    { f: 'Wie aus den beigefügten Unterlagen hervorgeht, die Lernziele stimmen überein.', r: 'Wie aus den beigefügten Unterlagen hervorgeht, stimmen die Lernziele überein.', e: '종속절이 앞에 오면 주절은 동사로 시작해요.' },
    { f: 'Ich bitte Sie, die Entscheidung unter Berücksichtigung den Unterlagen erneut zu prüfen.', r: 'Ich bitte Sie, die Entscheidung unter Berücksichtigung der Unterlagen erneut zu prüfen.', e: 'unter Berücksichtigung 뒤는 2격이에요.' }
  ],
  redemittel: [
    { g: '이의 선언하기', items: [['Gegen Ihren Bescheid vom 12. März lege ich hiermit fristgerecht Widerspruch ein.', '3월 12일 자 귀 기관의 결정에 대해 이 서한으로 기한 안에 이의를 제기합니다.'], ['… mit dem mein Antrag auf Anerkennung abgelehnt wurde', '제 인정 신청을 거부한 (결정)'], ['Ich beziehe mich auf Ihr Schreiben vom …', '…일 자 귀 기관의 서한과 관련하여 씁니다.']] },
    { g: '상대 근거 옮기기', items: [['Zur Begründung führen Sie an, die Module seien nicht gleichwertig.', '귀 기관은 그 근거로 해당 과목들이 동등하지 않다는 점을 들고 있습니다.'], ['In Ihrem Bescheid heißt es, …', '귀 기관의 결정문에는 …라고 되어 있습니다.'], ['Diese Einschätzung kann ich nicht nachvollziehen.', '이 판단은 납득할 수 없습니다.']] },
    { g: '증빙으로 반박하기', items: [['Wie aus den beigefügten Modulbeschreibungen hervorgeht, …', '첨부한 과목 설명서에서 알 수 있듯이 …'], ['Sowohl die Lernziele als auch der Arbeitsaufwand stimmen weitgehend überein.', '학습 목표와 학습량이 모두 대체로 일치합니다.'], ['Zudem wurde die Anerkennung im Learning Agreement ausdrücklich in Aussicht gestellt.', '또한 학습 계약서에서 학점 인정을 명시적으로 약속받았습니다.'], ['Den entsprechenden Nachweis füge ich bei.', '해당 증빙을 첨부합니다.']] },
    { g: '재검토 요청하기', items: [['Ich bitte Sie daher, die Entscheidung erneut zu prüfen.', '그러므로 결정을 다시 검토해 주시기 바랍니다.'], ['unter Berücksichtigung der beiliegenden Unterlagen', '동봉한 서류를 고려하여'], ['Sollten weitere Nachweise erforderlich sein, reiche ich diese umgehend nach.', '증빙이 더 필요하면 곧바로 추가로 내겠습니다.']] },
    { g: '마무리와 끝인사', items: [['Für eine schriftliche Rückmeldung wäre ich Ihnen dankbar.', '서면으로 답변해 주시면 감사하겠습니다.'], ['Mit freundlichen Grüßen', '안녕히 계십시오 (격식 있는 끝인사)'], ['Anlagen', '첨부']] }
  ],
  uebung: [
    { t: 'fill', q: 'Gegen Ihren Bescheid ___ ich hiermit Widerspruch ein.', a: ['lege'], e: 'Widerspruch einlegen은 「이의를 제기하다」는 기능동사 구문이에요.' },
    { t: 'mc', q: '상대의 근거를 옮기는 문장으로 알맞은 것은?', o: ['Sie führen an, die Module sind nicht gleichwertig.', 'Sie führen an, die Module seien nicht gleichwertig.', 'Sie führen an, die Module nicht gleichwertig sind.'], a: 1, e: '남의 말을 옮길 때는 접속법 I을 써요. sein의 3인칭 복수 접속법 I은 seien이에요.' },
    { t: 'fix', q: 'Wie aus den Unterlagen hervorgeht, die Lernziele stimmen überein.', a: ['Wie aus den Unterlagen hervorgeht, stimmen die Lernziele überein.'], e: '종속절 다음의 주절은 동사로 시작해요.' },
    { t: 'fill', q: 'Die Anerkennung wurde ausdrücklich in Aussicht ___. (stellen)', a: ['gestellt'], e: 'in Aussicht stellen은 「약속하다, 기대하게 하다」는 기능동사 구문이에요. 수동태라 과거분사를 써요.' },
    { t: 'mc', q: '알맞은 것은? ___ weitere Nachweise erforderlich sein, reiche ich diese nach.', o: ['Sollten', 'Wenn', 'Würden'], a: 0, e: 'wenn을 빼고 sollten을 문장 맨 앞에 두면 격식 있는 조건문이 돼요.' },
    { t: 'fill', q: 'unter Berücksichtigung ___ beiliegenden Unterlagen', a: ['der'], e: 'unter Berücksichtigung + 2격이에요. 복수 2격 관사는 der예요.' }
  ],
  aufgabe: {
    lead: 'Sie haben ein Semester an einer Universität in Seoul studiert. Das Prüfungsamt Ihrer deutschen Universität hat mit Bescheid vom 12. März Ihren Antrag abgelehnt, zwei dort bestandene Module anzuerkennen. Sie halten die Entscheidung für falsch. Schreiben Sie einen Widerspruch an das Prüfungsamt.',
    punkte: ['Beziehen Sie sich auf den Bescheid und legen Sie Widerspruch ein.', 'Geben Sie die Begründung des Prüfungsamts wieder.', 'Begründen Sie Ihren Widerspruch und verweisen Sie auf Nachweise.', 'Bitten Sie um eine erneute Prüfung.'],
    close: 'Schreiben Sie etwa 140–190 Wörter. Achten Sie auf Betreff, Anrede, Gruß und einen sachlichen Stil.',
    ko: {
      lead: '서울의 한 대학에서 한 학기를 공부했어요. 독일 대학의 시험 사무처가 3월 12일 자 결정문으로, 거기서 합격한 두 과목을 인정해 달라는 신청을 거부했어요. 이 결정이 잘못됐다고 생각해요. 시험 사무처에 이의 신청서를 쓰세요.',
      punkte: ['결정문을 언급하고 이의를 제기하세요.', '시험 사무처의 근거를 옮기세요.', '이의의 근거를 대고 증빙을 가리키세요.', '재검토를 요청하세요.'],
      close: '140–190단어 정도로 쓰세요. 제목, 부르는 말, 끝인사와 객관적인 문체에 주의하세요.'
    }
  },
  check: ['제목에 결정문의 날짜와 학번을 썼어요.', '첫 문장에서 이의를 분명히 선언했어요.', '상대의 근거를 접속법 I로 옮겼어요.', '내 근거를 두 가지 이상 썼어요.', '첨부한 증빙을 본문에서 가리켰어요.', '재검토를 요청했어요.', '감정적인 표현 없이 객관적으로 썼어요.', '끝인사 아래에 첨부 서류를 적었어요.'],
  muster: {
    de: [
      'Widerspruch gegen den Bescheid vom 12. März (Anerkennung von Studienleistungen), Matrikelnummer 3120458',
      'Sehr geehrte Damen und Herren,',
      'gegen Ihren oben genannten Bescheid, mit dem mein Antrag auf Anerkennung zweier im Ausland erbrachter Studienleistungen abgelehnt wurde, lege ich hiermit fristgerecht Widerspruch ein.',
      'Zur Begründung führen Sie an, die an meiner Gastuniversität in Seoul belegten Module seien mit den hiesigen Pflichtmodulen inhaltlich nicht gleichwertig. Diese Einschätzung kann ich nicht nachvollziehen. Wie aus den beigefügten Modulbeschreibungen hervorgeht, stimmen sowohl die Lernziele als auch der Arbeitsaufwand von jeweils sechs Leistungspunkten weitgehend überein. Zudem wurde die Anerkennung im Learning Agreement, das vor meiner Abreise von der Fachstudienberatung unterzeichnet wurde, ausdrücklich in Aussicht gestellt.',
      'Ich bitte Sie daher, die Entscheidung unter Berücksichtigung der beiliegenden Unterlagen erneut zu prüfen. Sollten weitere Nachweise erforderlich sein, reiche ich diese umgehend nach.',
      'Für eine schriftliche Rückmeldung wäre ich Ihnen dankbar, da meine Anmeldung zur Abschlussarbeit von der Anerkennung abhängt.',
      'Mit freundlichen Grüßen\nHaeun Jung',
      'Anlagen: Modulbeschreibungen, Notenübersicht der Gastuniversität, Learning Agreement'
    ],
    ko: [
      '3월 12일 자 결정(학업 성과 인정)에 대한 이의 신청, 학번 3120458',
      '담당자님께,',
      '외국에서 취득한 두 과목의 학점을 인정해 달라는 제 신청을 거부한 위 결정에 대해 이 서한으로 기한 안에 이의를 제기합니다.',
      '귀 사무처는 그 근거로, 제가 서울의 교환 대학에서 수강한 과목들이 이곳의 필수 과목과 내용상 동등하지 않다는 점을 들고 있습니다. 이 판단은 납득할 수 없습니다. 첨부한 과목 설명서에서 알 수 있듯이 학습 목표와 각 6학점의 학습량이 모두 대체로 일치합니다. 또한 출국 전에 학과 상담 담당자가 서명한 학습 계약서에서 학점 인정을 명시적으로 약속받았습니다.',
      '그러므로 동봉한 서류를 고려하여 결정을 다시 검토해 주시기 바랍니다. 증빙이 더 필요하면 곧바로 추가로 내겠습니다.',
      '졸업 논문 등록이 학점 인정에 달려 있으므로 서면으로 답변해 주시면 감사하겠습니다.',
      '안녕히 계십시오.\n정하은 드림',
      '첨부: 과목 설명서, 교환 대학 성적표, 학습 계약서'
    ],
    notes: [
      { de: 'gegen Ihren oben genannten Bescheid, mit dem mein Antrag … abgelehnt wurde, lege ich hiermit fristgerecht Widerspruch ein.', ko: '이의 신청서의 핵심 문장이에요. 관계문으로 어떤 결정인지 밝히고, 기능동사 구문 Widerspruch einlegen으로 끝냈어요.' },
      { de: 'zweier im Ausland erbrachter Studienleistungen', ko: 'zwei의 2격 zweier예요. 관사가 없어서 분사 erbrachter도 2격 어미 -er를 가져요.' },
      { de: 'Zur Begründung führen Sie an, die … Module seien … nicht gleichwertig.', ko: '상대의 근거를 접속법 I로 옮겼어요. 내 판단과 분명히 구별돼요.' },
      { de: 'Wie aus den beigefügten Modulbeschreibungen hervorgeht, stimmen … überein.', ko: '주장을 곧바로 증빙에 연결했어요. hervorgehen aus + 3격은 「~에서 드러나다」.' },
      { de: '… wurde … ausdrücklich in Aussicht gestellt.', ko: '기능동사 구문의 수동태예요. 누가 약속했는지보다 약속이 있었다는 사실을 앞세워요.' },
      { de: 'Sollten weitere Nachweise erforderlich sein, reiche ich diese umgehend nach.', ko: 'wenn 없는 조건문이에요. sollten이 맨 앞에 오고 주절은 동사로 시작해요.' }
    ]
  }
},
{
  id: 'c1-08', level: 'C1', no: 8,
  title: 'Text und Grafik zusammenfassen', titleKo: '글과 그래프를 함께 요약하기',
  type: 'Zusammenfassung von Text und Grafik', typeKo: '글·그래프 요약',
  exam: 'digital TestDaF 쓰기 Aufgabe 2(글과 그래프 요약)와 같은 유형',
  time: 30, words: [100, 150],
  intro: '짧은 글과 그래프를 읽고 두 자료의 정보를 하나의 글로 요약해요. 내 의견은 쓰지 않아요. 글의 내용은 내 말로 줄이고, 그래프에서는 글과 관계있는 수치만 골라 두 자료를 서로 이어요.',
  goals: ['글의 핵심을 원문과 다른 말로 줄여요', '그래프에서 글의 내용을 뒷받침하거나 보충하는 수치만 골라요', 'dem Text zufolge, die Grafik bestätigt로 두 자료의 관계를 밝혀요'],
  aufbau: [
    { de: 'Gemeinsames Thema', ko: '두 자료의 공통 주제', ex: 'Der Text und die Grafik befassen sich mit …' },
    { de: 'Kernaussagen des Textes', ko: '글의 핵심 내용', ex: 'Dem Text zufolge reicht eine einmal abgeschlossene Ausbildung … nicht mehr aus.' },
    { de: 'Wichtigste Daten der Grafik', ko: '그래프의 주요 수치', ex: 'Zwischen 2012 und 2022 ist die Teilnahmequote in allen Altersgruppen gestiegen.' },
    { de: 'Bezug zwischen Text und Grafik', ko: '두 자료의 관계', ex: 'Die Grafik bestätigt die wachsende Bedeutung des Themas.' },
    { de: 'Schlusssatz', ko: '마무리 문장', ex: 'Insgesamt zeigt sich, dass …' }
  ],
  tipps: [
    '내 의견, 내 경험, 한국과의 비교는 쓰지 않아요. 두 자료에 있는 정보만 써요.',
    '글의 문장을 베끼면 감점이에요. 동사를 명사로, 능동을 수동으로, 낱말을 비슷한 말로 바꿔요.',
    '그래프의 수치를 모두 쓰지 않아요. 전체 흐름 하나, 가장 높은 값 하나, 가장 눈에 띄는 변화 하나면 충분해요.',
    '두 자료를 따로 요약하고 끝내지 말고, 그래프가 글의 어떤 내용을 확인하거나 보충하는지 한 문장으로 써요.'
  ],
  fehler: [
    { f: 'Laut dem Text zufolge reicht eine Ausbildung nicht mehr aus.', r: 'Dem Text zufolge reicht eine Ausbildung nicht mehr aus.', e: 'laut과 zufolge를 함께 쓰지 않아요. zufolge는 3격 명사 뒤에 와요.' },
    { f: 'Ich finde, dass Weiterbildung sehr wichtig ist.', r: 'Dem Text zufolge ist Weiterbildung unverzichtbar geworden.', e: '요약에는 내 의견을 쓰지 않아요. 자료의 내용만 전해요.' },
    { f: 'Die Teilnahmequote ist in allen Altersgruppen gestiegt.', r: 'Die Teilnahmequote ist in allen Altersgruppen gestiegen.', e: 'steigen의 과거분사는 gestiegen이에요.' },
    { f: 'Den stärksten Zuwachs verzeichnet die 55- bis 64-Jährigen.', r: 'Den stärksten Zuwachs verzeichnen die 55- bis 64-Jährigen.', e: '주어는 복수 die 55- bis 64-Jährigen이에요. 4격 목적어가 앞에 와도 동사는 주어에 맞춰요.' }
  ],
  redemittel: [
    { g: '공통 주제 밝히기', items: [['Der Text und die Grafik befassen sich mit der beruflichen Weiterbildung.', '글과 그래프는 직업 재교육을 다뤄요.'], ['Beide Materialien behandeln das Thema …', '두 자료는 모두 …라는 주제를 다뤄요.'], ['Im Mittelpunkt steht die Frage, …', '중심에는 …라는 물음이 있어요.']] },
    { g: '글의 내용 전하기', items: [['Dem Text zufolge …', '글에 따르면 …'], ['Im Text wird betont, dass …', '글에서는 …라는 점을 강조해요.'], ['Als Hindernisse werden Zeitmangel und ungeklärte Kosten genannt.', '걸림돌로는 시간 부족과 해결되지 않은 비용 문제를 들어요.'], ['Davon profitieren demnach sowohl … als auch …', '그에 따르면 …와 … 모두 그 덕을 봐요.']] },
    { g: '그래프의 수치 전하기', items: [['Zwischen 2012 und 2022 ist die Teilnahmequote in allen Altersgruppen gestiegen.', '2012년과 2022년 사이에 참여율이 모든 연령대에서 올랐어요.'], ['Am höchsten liegt sie mit 47 Prozent bei den 25- bis 34-Jährigen.', '25–34세가 47퍼센트로 가장 높아요.'], ['Den stärksten Zuwachs verzeichnen die 55- bis 64-Jährigen.', '가장 크게 늘어난 것은 55–64세예요.'], ['… deren Anteil von 21 auf 34 Prozent zugenommen hat', '그 비율이 21퍼센트에서 34퍼센트로 늘어난 …'], ['Nach wie vor bildet sich nur rund jeder Dritte weiter.', '여전히 세 명 가운데 한 명쯤만 재교육을 받아요.']] },
    { g: '두 자료 잇기', items: [['Die Grafik bestätigt die wachsende Bedeutung des Themas.', '그래프는 이 주제가 점점 중요해지고 있음을 확인해 줘요.'], ['Die Grafik ergänzt den Text um konkrete Zahlen.', '그래프는 글에 구체적인 수치를 보태요.'], ['Im Unterschied zum Text zeigt die Grafik, dass …', '글과 달리 그래프는 …를 보여 줘요.']] },
    { g: '마무리하기', items: [['Insgesamt zeigt sich, dass …', '전체적으로 …라는 것을 알 수 있어요.'], ['Zusammenfassend lässt sich festhalten, dass …', '요약하면 …라고 정리할 수 있어요.']] }
  ],
  uebung: [
    { t: 'mc', q: '바른 것은?', o: ['Laut dem Text zufolge …', 'Dem Text zufolge …', 'Zufolge der Text …'], a: 1, e: 'zufolge는 3격 명사 뒤에 와요. laut과 함께 쓰지 않아요.' },
    { t: 'mc', q: '요약문에 쓰면 안 되는 문장은?', o: ['Dem Text zufolge profitieren auch die Unternehmen.', 'Meiner Meinung nach sollten alle Betriebe die Kosten übernehmen.', 'Als Hindernis wird der Zeitmangel genannt.'], a: 1, e: '요약에는 내 의견을 쓰지 않아요.' },
    { t: 'fill', q: 'Den stärksten Zuwachs ___ die 55- bis 64-Jährigen. (verzeichnen)', a: ['verzeichnen'], e: '주어가 복수라서 동사는 verzeichnen이에요. 문장 앞의 Den stärksten Zuwachs는 4격 목적어예요.' },
    { t: 'fill', q: 'die 55- bis 64-Jährigen, ___ Anteil von 21 auf 34 Prozent zugenommen hat', a: ['deren'], e: '복수 명사를 받는 2격 관계대명사는 deren이에요.' },
    { t: 'fix', q: 'Im Text wird betont, dass Weiterbildung ist unverzichtbar geworden.', a: ['Im Text wird betont, dass Weiterbildung unverzichtbar geworden ist.'], e: 'dass 문장에서는 변화한 동사 ist가 맨 끝에 와요.' },
    { t: 'mc', q: '「Digitalisierung verändert die Anforderungen.」을 명사 중심으로 바꾼 것은?', o: ['die Veränderung der Anforderungen durch die Digitalisierung', 'die Digitalisierung der veränderten Anforderungen', 'die Anforderungen an die Veränderung'], a: 0, e: '동사를 명사로 바꾸면 목적어는 2격, 행위자는 durch + 4격이 돼요.' }
  ],
  aufgabe: {
    lead: 'Fassen Sie die Informationen aus dem Text und der Grafik zusammen. Setzen Sie beide Materialien zueinander in Beziehung. Ihre eigene Meinung ist nicht gefragt.',
    brief: 'Lernen hört nach der Ausbildung nicht auf\nWer heute einen Beruf erlernt, kann sich nicht darauf verlassen, ihn vierzig Jahre lang auf dieselbe Weise auszuüben. Digitalisierung und neue Technologien verändern die Anforderungen in fast allen Branchen. Fachleute betonen deshalb, dass berufliche Weiterbildung für Beschäftigte jeden Alters unverzichtbar geworden ist. Auch die Unternehmen haben etwas davon: Sie können offene Stellen leichter mit eigenen Mitarbeitenden besetzen. Allerdings fehlt vielen Beschäftigten im Alltag die Zeit, und nicht jeder Betrieb übernimmt die Kosten.',
    chart: {
      title: 'Teilnahme an beruflicher Weiterbildung nach Alter',
      unit: 'Anteil der Beschäftigten in Prozent',
      source: 'Quelle: Befragung von Beschäftigten (Beispieldaten für den Unterricht)',
      series: ['2012', '2022'],
      rows: [
        { label: '25–34 Jahre', ko: '25–34세', v: [38, 47] },
        { label: '35–44 Jahre', ko: '35–44세', v: [37, 46] },
        { label: '45–54 Jahre', ko: '45–54세', v: [33, 43] },
        { label: '55–64 Jahre', ko: '55–64세', v: [21, 34] }
      ]
    },
    punkte: ['Nennen Sie das gemeinsame Thema.', 'Geben Sie die wichtigsten Aussagen des Textes wieder.', 'Beschreiben Sie die wichtigsten Informationen der Grafik.', 'Zeigen Sie, wie Text und Grafik zusammenhängen.'],
    close: 'Schreiben Sie etwa 100–150 Wörter.',
    ko: {
      lead: '글과 그래프의 정보를 요약하세요. 두 자료를 서로 관련지으세요. 내 의견은 쓰지 않아요.',
      brief: '배움은 직업 교육이 끝나도 끝나지 않는다\n오늘날 어떤 직업을 배운 사람은 그 일을 40년 동안 같은 방식으로 할 수 있으리라고 믿을 수 없어요. 디지털화와 새로운 기술이 거의 모든 분야에서 요구되는 능력을 바꾸고 있어요. 그래서 전문가들은 직업 재교육이 모든 연령의 직장인에게 꼭 필요해졌다고 강조해요. 기업에도 이로운 점이 있어요. 빈자리를 자기 직원으로 더 쉽게 채울 수 있어요. 다만 많은 직장인은 일상에서 시간이 부족하고, 모든 회사가 비용을 내 주는 것도 아니에요.',
      punkte: ['공통 주제를 밝히세요.', '글의 가장 중요한 내용을 전하세요.', '그래프의 가장 중요한 정보를 설명하세요.', '글과 그래프가 어떻게 이어지는지 보여 주세요.'],
      close: '100–150단어 정도로 쓰세요.'
    }
  },
  check: ['첫 문장에서 두 자료의 공통 주제를 밝혔어요.', '글의 핵심 내용을 내 말로 바꿔 썼어요.', '그래프의 전체 흐름을 썼어요.', '가장 눈에 띄는 수치를 한두 개만 골라 썼어요.', '글과 그래프의 관계를 한 문장 이상으로 밝혔어요.', '내 의견이나 경험을 쓰지 않았어요.', '글의 문장을 그대로 베끼지 않았어요.', '100–150단어로 썼어요.'],
  muster: {
    de: [
      'Der Text und die Grafik befassen sich mit der beruflichen Weiterbildung in Deutschland.',
      'Dem Text zufolge reicht eine einmal abgeschlossene Ausbildung heute nicht mehr für ein ganzes Berufsleben aus, da der technische Wandel die Anforderungen in nahezu allen Branchen verändert. Von Weiterbildung profitieren demnach sowohl die Beschäftigten als auch die Unternehmen. Als Hindernisse werden Zeitmangel und ungeklärte Kosten genannt.',
      'Die Grafik bestätigt die wachsende Bedeutung des Themas: Zwischen 2012 und 2022 ist die Teilnahmequote in allen Altersgruppen gestiegen. Am höchsten liegt sie mit 47 Prozent bei den 25- bis 34-Jährigen. Den stärksten Zuwachs verzeichnen jedoch die 55- bis 64-Jährigen, deren Anteil von 21 auf 34 Prozent zugenommen hat. Dennoch bildet sich in dieser Gruppe nach wie vor nur rund jeder Dritte weiter.',
      'Insgesamt zeigt sich, dass die im Text beschriebene Notwendigkeit zunehmend erkannt wird, ältere Beschäftigte aber weiterhin seltener erreicht werden.'
    ],
    ko: [
      '글과 그래프는 독일의 직업 재교육을 다뤄요.',
      '글에 따르면 기술 변화가 거의 모든 분야에서 요구되는 능력을 바꾸기 때문에, 한 번 마친 직업 교육만으로는 이제 직업 생활 전체를 버틸 수 없어요. 그에 따르면 재교육은 직장인과 기업 모두에게 이로워요. 걸림돌로는 시간 부족과 해결되지 않은 비용 문제를 들어요.',
      '그래프는 이 주제가 점점 중요해지고 있음을 확인해 줘요. 2012년과 2022년 사이에 참여율이 모든 연령대에서 올랐어요. 25–34세가 47퍼센트로 가장 높아요. 하지만 가장 크게 늘어난 것은 55–64세로, 그 비율이 21퍼센트에서 34퍼센트로 늘었어요. 그런데도 이 집단에서는 여전히 세 명 가운데 한 명쯤만 재교육을 받아요.',
      '전체적으로, 글에서 말한 필요성을 점점 더 많은 사람이 알아차리고 있지만 나이 든 직장인에게는 여전히 덜 미친다는 것을 알 수 있어요.'
    ],
    notes: [
      { de: 'Dem Text zufolge reicht eine einmal abgeschlossene Ausbildung … nicht mehr … aus', ko: '원문의 「40년 동안 같은 방식으로 할 수 없다」를 다른 말로 줄였어요. zufolge는 3격 명사 뒤에 와요.' },
      { de: '…, da der technische Wandel die Anforderungen … verändert.', ko: '원문의 「Digitalisierung und neue Technologien」을 상위 개념 der technische Wandel로 묶었어요.' },
      { de: 'Als Hindernisse werden Zeitmangel und ungeklärte Kosten genannt.', ko: '원문의 두 문장을 명사 두 개로 압축하고 수동태로 전했어요.' },
      { de: 'Die Grafik bestätigt die wachsende Bedeutung des Themas: …', ko: '그래프 문단의 첫 문장에서 글과의 관계를 밝혔어요. 이 과제의 핵심 요구예요.' },
      { de: 'Den stärksten Zuwachs verzeichnen jedoch die 55- bis 64-Jährigen, deren Anteil …', ko: '4격 목적어를 앞에 두어 강조했어요. deren은 복수 명사를 받는 2격 관계대명사예요.' },
      { de: '…, dass die im Text beschriebene Notwendigkeit zunehmend erkannt wird, ältere Beschäftigte aber …', ko: '마무리 문장 하나에 글의 내용과 그래프의 내용을 함께 담았어요.' }
    ]
  }
},
{
  id: 'c1-09', level: 'C1', no: 9,
  title: 'Stellungnahme zu einem Text', titleKo: '글을 읽고 입장 밝히기',
  type: 'Textgebundene Stellungnahme', typeKo: '글에 대한 입장문',
  exam: '대학 세미나와 C1 시험에서 쓰는, 글을 읽고 입장을 밝히는 글',
  time: 50, words: [230, 290],
  intro: '짧은 글을 읽고 핵심 주장을 옮긴 뒤, 그 근거 하나하나에 동의하는지 따져 내 입장을 세워요. 글의 내용을 옮기는 말투와 내 판단을 밝히는 말투를 분명히 구별하는 것이 핵심이에요.',
  goals: ['글의 주장을 접속법 I과 간접 화법 표현으로 옮겨요', 'stichhaltig, weniger überzeugend처럼 근거를 평가하는 말을 써요', '근거마다 따로 평가한 뒤 조건이 달린 제안으로 맺어요'],
  aufbau: [
    { de: 'Wiedergabe der Kernaussagen', ko: '글의 핵심 주장 옮기기', ex: 'Der vorliegende Text befasst sich mit der Frage, …' },
    { de: 'Zustimmung zu einem Argument', ko: '동의하는 근거', ex: 'Das erste Argument der Kritiker halte ich für stichhaltig.' },
    { de: 'Einwand gegen ein Argument', ko: '동의하지 않는 근거', ex: 'Weniger überzeugend erscheint mir dagegen …' },
    { de: 'Eigene Erfahrung oder Vergleich', ko: '내 경험이나 비교', ex: 'Aus Korea kenne ich eine ähnliche Debatte.' },
    { de: 'Fazit mit Vorschlag', ko: '제안이 있는 결론', ex: 'Meines Erachtens liegt die Lösung daher nicht in einem Entweder-oder.' }
  ],
  tipps: [
    '첫 문단은 요약이에요. 내 평가를 섞지 말고 글의 주장만 접속법 I이나 befürchten, warnen 같은 동사로 옮겨요.',
    '글 전체에 찬성하거나 반대하지 말고 근거를 하나씩 따져요. 하나는 받아들이고 하나는 반박하면 글이 정교해져요.',
    '평가할 때는 근거를 대요. 「설득력이 없다」에서 끝내지 말고 왜 그런지 한두 문장으로 밝혀요.',
    '결론에서는 양쪽을 아우르는 제안을 해요. ohne dass + 문장으로 「~하지 않으면서도」를 표현할 수 있어요.'
  ],
  fehler: [
    { f: 'Kritiker befürchten, dass das Deutsche verliert an Bedeutung.', r: 'Kritiker befürchten, dass das Deutsche an Bedeutung verliere.', e: 'dass 문장이라 동사가 맨 끝에 와요. 남의 주장을 옮길 때는 접속법 I(verliere)이 알맞아요.' },
    { f: 'Das erste Argument halte ich als stichhaltig.', r: 'Das erste Argument halte ich für stichhaltig.', e: 'etwas für + 형용사 halten이에요. als는 betrachten, ansehen과 함께 써요.' },
    { f: 'Meines Erachtens nach liegt die Lösung woanders.', r: 'Meines Erachtens liegt die Lösung woanders.', e: 'meines Erachtens 뒤에는 nach를 붙이지 않아요. meiner Meinung nach와 섞이기 쉬워요.' },
    { f: 'Die Hochschulen bleiben attraktiv, ohne dass ihre Absolventen bleiben isoliert.', r: 'Die Hochschulen bleiben attraktiv, ohne dass ihre Absolventen isoliert bleiben.', e: 'ohne dass 문장에서도 동사가 맨 끝에 와요.' }
  ],
  redemittel: [
    { g: '글의 주장 옮기기', items: [['Der vorliegende Text befasst sich mit der Frage, …', '이 글은 …라는 물음을 다뤄요.'], ['Während die Hochschulen darin eine Chance sehen, befürchten Kritiker, dass …', '대학은 그것을 기회로 보는 반면 비판하는 사람들은 …를 걱정해요.'], ['Zudem drohe das Deutsche seine Rolle als Wissenschaftssprache einzubüßen.', '또한 독일어가 학문 언어로서의 역할을 잃을 위험이 있다고 해요.'], ['Der Autor vertritt die These, dass …', '글쓴이는 …라는 주장을 펴요.']] },
    { g: '근거에 동의하기', items: [['Dieses Argument halte ich für stichhaltig.', '이 근거는 타당하다고 생각해요.'], ['Dem ist uneingeschränkt zuzustimmen.', '이 점에는 전적으로 동의할 수 있어요.'], ['Spätestens bei der Stellensuche erweist sich das als Nachteil.', '늦어도 일자리를 구할 때 그것이 불리하다는 것이 드러나요.']] },
    { g: '근거에 반박하기', items: [['Weniger überzeugend erscheint mir dagegen …', '반면 …는 덜 설득력 있어 보여요.'], ['Dieses Argument greift meines Erachtens zu kurz.', '이 근거는 제가 보기에 충분히 깊지 않아요.'], ['Diese Entwicklung lässt sich kaum aufhalten.', '이 흐름은 거의 막을 수 없어요.'], ['Dabei wird übersehen, dass …', '여기서는 …라는 점을 놓치고 있어요.']] },
    { g: '경험과 비교 말하기', items: [['Aus Korea kenne ich eine ähnliche Debatte.', '한국에도 비슷한 논쟁이 있어요.'], ['Nicht selten litt darunter die Qualität der Diskussionen.', '그 때문에 토론의 질이 떨어지는 일이 드물지 않았어요.'], ['Ähnliches lässt sich in meinem Heimatland beobachten.', '제 나라에서도 비슷한 일을 볼 수 있어요.']] },
    { g: '결론과 제안', items: [['Meines Erachtens liegt die Lösung nicht in einem Entweder-oder.', '제가 보기에 해결책은 둘 가운데 하나를 고르는 데 있지 않아요.'], ['Sinnvoll wären Studiengänge, die … einschließen.', '…를 포함하는 과정이 의미 있을 거예요.'], ['Auf diese Weise blieben die Hochschulen attraktiv, ohne dass …', '이렇게 하면 대학은 …하지 않으면서도 매력을 유지할 거예요.']] }
  ],
  uebung: [
    { t: 'mc', q: '알맞은 것은? Dieses Argument halte ich ___ stichhaltig.', o: ['als', 'für', 'wie'], a: 1, e: 'etwas für + 형용사 halten은 「~을 ~라고 여기다」예요.' },
    { t: 'fix', q: 'Meines Erachtens nach liegt die Lösung woanders.', a: ['Meines Erachtens liegt die Lösung woanders.'], e: 'meines Erachtens에는 nach를 붙이지 않아요.' },
    { t: 'fill', q: 'Zudem ___ das Deutsche seine Rolle einzubüßen. (drohen, 접속법 I)', a: ['drohe'], e: '3인칭 단수 접속법 I은 어간 + e예요. 남의 주장을 옮길 때 써요.' },
    { t: 'fill', q: 'Diese Entwicklung ___ sich kaum aufhalten.', a: ['lässt'], e: 'sich lassen + 원형은 「~될 수 있다」예요.' },
    { t: 'mc', q: '글의 주장을 옮기는 문장은?', o: ['Ich finde, dass Deutsch wichtig bleibt.', 'Kritiker warnen, das Deutsche verliere an Bedeutung.', 'Das ist natürlich völlig falsch.'], a: 1, e: 'warnen + 접속법 I로 남의 주장을 내 평가 없이 옮겨요.' },
    { t: 'fix', q: 'Die Hochschulen bleiben attraktiv, ohne dass ihre Absolventen bleiben isoliert.', a: ['Die Hochschulen bleiben attraktiv, ohne dass ihre Absolventen isoliert bleiben.'], e: 'ohne dass 문장에서는 동사가 맨 끝에 와요.' }
  ],
  aufgabe: {
    lead: 'Lesen Sie den folgenden Text und schreiben Sie dazu eine Stellungnahme.',
    brief: 'Studieren auf Englisch\nImmer mehr Masterstudiengänge in Deutschland werden vollständig auf Englisch angeboten. Die Hochschulen versprechen sich davon mehr internationale Studierende und eine größere Sichtbarkeit in der Forschung. Kritiker warnen jedoch: Wer nur auf Englisch studiert, lernt kaum Deutsch und verlässt das Land nach dem Abschluss häufig wieder. Außerdem verliere das Deutsche als Wissenschaftssprache an Bedeutung, wenn Fachbegriffe nicht mehr auf Deutsch geprägt würden.',
    punkte: ['Geben Sie die wichtigsten Aussagen des Textes wieder.', 'Nehmen Sie zu den Argumenten der Kritiker Stellung.', 'Berichten Sie von eigenen Erfahrungen oder von der Situation in Ihrem Heimatland.', 'Formulieren Sie ein Fazit mit einem eigenen Vorschlag.'],
    close: 'Schreiben Sie etwa 230–290 Wörter. Achten Sie auf eine klare Gliederung und auf die Trennung von Textwiedergabe und eigener Meinung.',
    ko: {
      lead: '다음 글을 읽고 이에 대한 입장문을 쓰세요.',
      brief: '영어로 공부하기\n독일에서 영어로만 진행하는 석사 과정이 점점 늘고 있어요. 대학은 이를 통해 외국인 학생이 늘고 연구에서 더 눈에 띄게 되기를 기대해요. 하지만 비판하는 사람들은 경고해요. 영어로만 공부하는 사람은 독일어를 거의 배우지 않고 졸업 뒤에 독일을 다시 떠나는 일이 많다는 거예요. 또한 전문 용어가 더는 독일어로 만들어지지 않으면 독일어가 학문 언어로서 중요성을 잃는다고 해요.',
      punkte: ['글의 가장 중요한 내용을 옮기세요.', '비판하는 사람들의 근거에 대한 입장을 밝히세요.', '내 경험이나 내 나라의 상황을 쓰세요.', '내 제안이 담긴 결론을 쓰세요.'],
      close: '230–290단어 정도로 쓰세요. 구성을 분명히 하고, 글의 내용을 옮기는 부분과 내 의견을 구별하세요.'
    }
  },
  check: ['첫 문단에서 글의 핵심 주장을 내 평가 없이 옮겼어요.', '남의 주장을 접속법 I이나 간접 화법 표현으로 썼어요.', '근거 하나에는 동의하고 이유를 댔어요.', '다른 근거에는 반박하고 이유를 댔어요.', '내 경험이나 내 나라의 상황을 썼어요.', '제안이 담긴 결론으로 끝냈어요.', '글의 문장을 그대로 베끼지 않았어요.', '문단의 첫 문장이 그 문단의 역할을 보여 줘요.'],
  muster: {
    de: [
      'Studieren auf Englisch – Gewinn oder Verlust?',
      'Der vorliegende Text befasst sich mit der Frage, welche Folgen es hat, dass immer mehr Masterstudiengänge in Deutschland ausschließlich auf Englisch angeboten werden. Während die Hochschulen darin eine Chance sehen, internationale Studierende zu gewinnen, befürchten Kritiker, dass diese kaum Deutsch lernen und das Land nach dem Abschluss wieder verlassen. Zudem drohe das Deutsche seine Rolle als Wissenschaftssprache einzubüßen.',
      'Das erste Argument der Kritiker halte ich für stichhaltig. Wer im Hörsaal, im Labor und im Wohnheim ausschließlich Englisch spricht, hat wenig Anlass, sich auf die Landessprache einzulassen. Spätestens bei der Stellensuche erweist sich das als Nachteil, denn außerhalb weniger internationaler Konzerne wird im Berufsalltag nach wie vor Deutsch erwartet.',
      'Weniger überzeugend erscheint mir dagegen die Sorge um die Wissenschaftssprache. In den Natur- und Ingenieurwissenschaften wird längst weltweit auf Englisch publiziert; diese Entwicklung lässt sich durch die Unterrichtssprache einzelner Studiengänge kaum aufhalten. Entscheidend ist vielmehr, dass deutschsprachige Lehrbücher und Fachbegriffe weiterhin gepflegt werden.',
      'Aus Korea kenne ich eine ähnliche Debatte. Dort wurden an vielen Universitäten englischsprachige Lehrveranstaltungen eingeführt, um internationaler zu werden. Nicht selten litt darunter jedoch die Qualität der Diskussionen, weil weder Lehrende noch Studierende sich so differenziert ausdrücken konnten wie in ihrer Muttersprache.',
      'Meines Erachtens liegt die Lösung daher nicht in einem Entweder-oder. Sinnvoll wären englischsprachige Studiengänge, die verpflichtende Deutschkurse und einzelne deutschsprachige Module einschließen. Auf diese Weise blieben die Hochschulen international attraktiv, ohne dass ihre Absolventen sprachlich isoliert bleiben.'
    ],
    ko: [
      '영어로 공부하기 – 얻는 것일까요, 잃는 것일까요?',
      '이 글은 독일에서 영어로만 진행하는 석사 과정이 점점 늘어나는 것이 어떤 결과를 낳는지를 다뤄요. 대학은 여기서 외국인 학생을 끌어올 기회를 보는 반면, 비판하는 사람들은 그 학생들이 독일어를 거의 배우지 않고 졸업 뒤에 독일을 다시 떠날 것을 걱정해요. 또한 독일어가 학문 언어로서의 역할을 잃을 위험이 있다고 해요.',
      '비판하는 사람들의 첫 번째 근거는 타당하다고 생각해요. 강의실, 실험실, 기숙사에서 영어만 쓰는 사람은 그 나라의 말을 배우려고 마음먹을 계기가 별로 없어요. 늦어도 일자리를 구할 때 그것이 불리하다는 것이 드러나요. 몇몇 국제적인 대기업을 빼면 직장 생활에서는 여전히 독일어를 기대하기 때문이에요.',
      '반면 학문 언어에 대한 걱정은 덜 설득력 있어 보여요. 자연 과학과 공학에서는 이미 오래전부터 세계적으로 영어로 논문을 내고 있어요. 이 흐름은 몇몇 과정의 수업 언어로는 거의 막을 수 없어요. 그보다 중요한 것은 독일어 교재와 전문 용어를 계속 가꾸어 가는 일이에요.',
      '한국에도 비슷한 논쟁이 있어요. 한국에서는 국제화를 위해 많은 대학에 영어 강의가 도입됐어요. 하지만 가르치는 사람도 배우는 사람도 모국어만큼 정교하게 표현할 수 없어서 토론의 질이 떨어지는 일이 드물지 않았어요.',
      '그래서 제가 보기에 해결책은 둘 가운데 하나를 고르는 데 있지 않아요. 필수 독일어 수업과 독일어로 진행하는 과목 몇 개를 포함하는 영어 과정이 의미 있을 거예요. 이렇게 하면 대학은 졸업생이 언어 때문에 고립되지 않으면서도 국제적인 매력을 유지할 거예요.'
    ],
    notes: [
      { de: 'Während die Hochschulen darin eine Chance sehen, …, befürchten Kritiker, dass …', ko: 'während로 두 입장을 한 문장에 대비했어요. 요약 문단이라 내 평가는 들어 있지 않아요.' },
      { de: 'Zudem drohe das Deutsche seine Rolle als Wissenschaftssprache einzubüßen.', ko: '접속법 I drohe로 비판자의 주장임을 나타냈어요. drohen + zu 원형은 「~할 위험이 있다」.' },
      { de: 'Das erste Argument der Kritiker halte ich für stichhaltig.', ko: '문단의 첫 문장에서 평가를 밝히고, 이어지는 문장에서 이유를 댔어요.' },
      { de: 'Wer …, hat wenig Anlass, sich auf die Landessprache einzulassen.', ko: 'sich einlassen auf + 4격은 「~에 마음을 열고 뛰어들다」예요. Anlass haben, … zu + 원형.' },
      { de: 'Weniger überzeugend erscheint mir dagegen die Sorge um die Wissenschaftssprache.', ko: '형용사구를 앞에 두고 dagegen으로 앞 문단과 대비했어요. 주어는 뒤의 die Sorge예요.' },
      { de: 'Auf diese Weise blieben die Hochschulen …, ohne dass ihre Absolventen … bleiben.', ko: '접속법 II blieben으로 제안의 결과를 가정했어요. ohne dass는 「~하지 않으면서」.' }
    ]
  }
},
{
  id: 'c1-10', level: 'C1', no: 10,
  title: 'Erfahrungsbericht: Auslandssemester', titleKo: '교환학기 경험 보고서 쓰기',
  type: 'Erfahrungsbericht', typeKo: '경험 보고서',
  exam: '교환학기 뒤 대학 국제처나 장학 기관에 내는 경험 보고서(Erfahrungsbericht)',
  time: 45, words: [230, 290],
  intro: '독일에서 보낸 교환학기를 돌아보는 경험 보고서를 써요. 다음에 갈 학생이 읽는 글이라, 겪은 일을 시간 순서로 늘어놓지 않고 주제별로 묶어 평가와 조언을 함께 담아요.',
  goals: ['준비, 학업, 일상, 총평의 주제별 문단으로 글을 짜요', 'sich erweisen als, empfinden als, zu schaffen machen으로 경험을 평가해요', 'Es empfiehlt sich, …, Ich würde raten, …로 다음 학생에게 조언해요'],
  aufbau: [
    { de: 'Titel und Rahmen', ko: '제목과 기본 정보', ex: 'Im Wintersemester 2025/26 habe ich … ein Semester in Heidelberg studiert.' },
    { de: 'Vorbereitung', ko: '준비', ex: 'Als zeitaufwendig erwies sich vor allem die Wohnungssuche.' },
    { de: 'Studium', ko: '학업', ex: 'Das Studium unterschied sich deutlich von dem an meiner Heimatuniversität.' },
    { de: 'Alltag und Freizeit', ko: '일상과 여가', ex: 'Auch außerhalb der Universität habe ich mich schnell eingelebt.' },
    { de: 'Fazit und Empfehlungen', ko: '총평과 조언', ex: 'Rückblickend war das Semester … ein großer Gewinn.' }
  ],
  tipps: [
    '일기처럼 「그다음에, 그다음에」로 쓰지 않아요. 문단마다 주제를 하나 정하고 그 주제의 경험을 평가해요.',
    '보고서에서는 과거형(Präteritum)이 기본이에요. 지금까지 이어지는 결과나 총평에는 현재완료와 현재형을 써요.',
    '어려웠던 점도 써요. 좋은 말만 있는 보고서는 다음 학생에게 도움이 되지 않아요. 어려움 다음에는 어떻게 풀었는지를 붙여요.',
    '조언은 구체적으로 써요. 「열심히 준비하세요」보다 「합격 통지를 받자마자 기숙사를 신청하세요」가 쓸모 있어요.'
  ],
  fehler: [
    { f: 'Das Studium unterschied sich deutlich von das an meiner Heimatuniversität.', r: 'Das Studium unterschied sich deutlich von dem an meiner Heimatuniversität.', e: 'von 뒤는 3격이에요. das Studium을 받는 지시대명사의 3격은 dem이에요.' },
    { f: 'Die Wohnungssuche hat sich als zeitaufwendig erweist.', r: 'Die Wohnungssuche hat sich als zeitaufwendig erwiesen.', e: 'erweisen의 과거분사는 erwiesen이에요. 과거형은 erwies예요.' },
    { f: 'Es empfiehlt sich, früh um einen Wohnheimplatz bewerben.', r: 'Es empfiehlt sich, sich früh um einen Wohnheimplatz zu bewerben.', e: 'Es empfiehlt sich 뒤에는 zu + 원형이 와요. sich bewerben의 재귀대명사도 빠지면 안 돼요.' },
    { f: 'Ich würde raten, den Kontakt zu Einheimischen suchen, statt unter Landsleuten bleiben.', r: 'Ich würde raten, den Kontakt zu Einheimischen zu suchen, statt unter Landsleuten zu bleiben.', e: 'raten 뒤에도, statt 뒤에도 zu + 원형이 와요.' }
  ],
  redemittel: [
    { g: '기본 정보 밝히기', items: [['Im Wintersemester 2025/26 habe ich im Rahmen eines Austauschprogramms in Heidelberg studiert.', '2025/26년 겨울 학기에 교환 프로그램으로 하이델베르크에서 공부했어요.'], ['Mit der Vorbereitung begann ich rund sechs Monate vor der Abreise.', '준비는 출국하기 여섯 달쯤 전에 시작했어요.']] },
    { g: '경험 평가하기', items: [['Als zeitaufwendig erwies sich vor allem die Wohnungssuche.', '무엇보다 집을 구하는 데 시간이 많이 들었어요.'], ['Als besonders hilfreich empfand ich das Schreibzentrum.', '글쓰기 센터가 특히 도움이 됐어요.'], ['Anfangs fiel es mir schwer, mich spontan zu Wort zu melden.', '처음에는 그 자리에서 손을 들고 말하기가 어려웠어요.'], ['Zu schaffen machte mir lediglich die Bürokratie.', '저를 힘들게 한 것은 행정 절차뿐이었어요.'], ['Dank der Unterstützung der Dozierenden gewann ich rasch an Sicherheit.', '교수진의 도움 덕분에 빠르게 자신감을 얻었어요.']] },
    { g: '차이 설명하기', items: [['Das Studium unterschied sich deutlich von dem an meiner Heimatuniversität.', '학업은 제 대학에서의 학업과 뚜렷이 달랐어요.'], ['Statt Vorlesungen mit Abschlussklausur besuchte ich überwiegend Seminare.', '기말시험이 있는 강의 대신 주로 세미나를 들었어요.'], ['Im Unterschied zu Korea wird hier erwartet, dass …', '한국과 달리 여기서는 …하기를 기대해요.']] },
    { g: '일상 말하기', items: [['Auch außerhalb der Universität habe ich mich schnell eingelebt.', '대학 밖에서도 빨리 적응했어요.'], ['Über den Hochschulsport kam ich mit deutschen Studierenden in Kontakt.', '대학 스포츠 프로그램을 통해 독일 학생들과 알게 됐어요.'], ['Das erwies sich als weitaus wirkungsvoller als jeder Sprachkurs.', '그것이 어떤 어학 수업보다 훨씬 효과적이었어요.']] },
    { g: '총평과 조언', items: [['Rückblickend war das Semester sowohl fachlich als auch persönlich ein großer Gewinn.', '돌아보면 이 학기는 전공 면에서도 개인적으로도 큰 수확이었어요.'], ['Es empfiehlt sich, sich frühzeitig um einen Wohnheimplatz zu bewerben.', '기숙사는 일찍 신청하는 것이 좋아요.'], ['Künftigen Austauschstudierenden würde ich raten, …', '앞으로 올 교환 학생에게는 …하라고 권하고 싶어요.']] }
  ],
  uebung: [
    { t: 'fill', q: 'Die Wohnungssuche ___ sich als zeitaufwendig. (erweisen, 과거형)', a: ['erwies'], e: 'erweisen의 과거형은 erwies, 과거분사는 erwiesen이에요.' },
    { t: 'fix', q: 'Es empfiehlt sich, früh um einen Wohnheimplatz bewerben.', a: ['Es empfiehlt sich, sich früh um einen Wohnheimplatz zu bewerben.'], e: 'zu + 원형을 쓰고, sich bewerben의 재귀대명사 sich도 써요.' },
    { t: 'mc', q: '알맞은 것은? Das Studium unterschied sich von ___ an meiner Heimatuniversität.', o: ['das', 'dem', 'den'], a: 1, e: 'von + 3격이에요. das Studium을 받는 지시대명사 3격은 dem이에요.' },
    { t: 'fill', q: 'Anfangs ___ es mir schwer, mich zu Wort zu melden. (fallen, 과거형)', a: ['fiel'], e: 'es fällt mir schwer의 과거형은 es fiel mir schwer예요.' },
    { t: 'mc', q: '보고서의 문단 첫 문장으로 가장 알맞은 것은?', o: ['Und dann bin ich in die Mensa gegangen.', 'Das Studium unterschied sich deutlich von dem an meiner Heimatuniversität.', 'Am 3. Oktober war ich müde.'], a: 1, e: '문단의 첫 문장은 그 문단의 주제와 평가를 보여 줘야 해요.' },
    { t: 'fill', q: '___ der Unterstützung der Dozierenden gewann ich rasch an Sicherheit.', a: ['Dank'], e: 'dank + 2격(또는 3격)은 「~ 덕분에」예요. 좋은 결과의 원인에 써요.' }
  ],
  aufgabe: {
    lead: 'Sie haben ein Semester an einer deutschen Universität studiert. Das International Office Ihrer Heimatuniversität bittet Sie um einen Erfahrungsbericht, der künftigen Austauschstudierenden bei der Vorbereitung helfen soll.',
    punkte: ['Beschreiben Sie Ihre Vorbereitung und geben Sie einen Hinweis dazu.', 'Berichten Sie über das Studium an der Gasthochschule.', 'Gehen Sie auf Alltag und Freizeit ein, auch auf Schwierigkeiten.', 'Ziehen Sie ein Fazit und geben Sie Empfehlungen.'],
    close: 'Schreiben Sie etwa 230–290 Wörter. Gliedern Sie Ihren Bericht nach Themen und geben Sie ihm eine Überschrift.',
    ko: {
      lead: '독일의 한 대학에서 한 학기를 공부했어요. 여러분 대학의 국제처가 앞으로 갈 교환 학생의 준비에 도움이 될 경험 보고서를 부탁해요.',
      punkte: ['준비 과정을 설명하고 그에 대한 조언을 하나 하세요.', '교환 대학에서의 학업을 이야기하세요.', '일상과 여가를 다루고, 어려웠던 점도 쓰세요.', '총평을 하고 조언을 하세요.'],
      close: '230–290단어 정도로 쓰세요. 보고서를 주제별로 나누고 제목을 다세요.'
    }
  },
  check: ['제목을 달았어요.', '언제 어디에서 무엇을 공부했는지 첫 문단에 썼어요.', '준비 과정과 그에 대한 조언을 썼어요.', '학업의 차이와 그에 대한 평가를 썼어요.', '일상에서 좋았던 점과 어려웠던 점을 모두 썼어요.', '총평과 구체적인 조언으로 끝냈어요.', '시간 순서가 아니라 주제별로 문단을 나눴어요.', '과거형을 기본 시제로 썼어요.'],
  muster: {
    de: [
      'Erfahrungsbericht: Ein Semester an der Universität Heidelberg',
      'Im Wintersemester 2025/26 habe ich im Rahmen eines Austauschprogramms ein Semester Germanistik in Heidelberg studiert. Mit der Vorbereitung begann ich rund sechs Monate vor der Abreise. Als zeitaufwendig erwies sich vor allem die Wohnungssuche; es empfiehlt sich daher, sich unmittelbar nach der Zusage um einen Platz im Studierendenwohnheim zu bewerben. Auch das Visum und die Krankenversicherung sollten frühzeitig geklärt werden.',
      'Das Studium unterschied sich deutlich von dem an meiner Heimatuniversität. Statt Vorlesungen mit Abschlussklausur besuchte ich überwiegend Seminare, in denen Referate gehalten und Texte kontrovers diskutiert wurden. Anfangs fiel es mir schwer, mich spontan zu Wort zu melden. Dank der Unterstützung der Dozierenden, die Nachfragen ausdrücklich begrüßten, gewann ich jedoch rasch an Sicherheit. Als besonders hilfreich empfand ich das Schreibzentrum, das mich bei meiner ersten Hausarbeit beriet.',
      'Auch außerhalb der Universität habe ich mich schnell eingelebt. Über den Hochschulsport und ein Sprachtandem kam ich mit deutschen Studierenden in Kontakt, was sich als weitaus wirkungsvoller erwies als jeder Sprachkurs. Zu schaffen machten mir lediglich die frühen Ladenschlusszeiten und die Bürokratie bei der Anmeldung im Bürgeramt. Wer sich darauf einstellt und Behördentermine rechtzeitig online bucht, erspart sich allerdings viel Ärger.',
      'Rückblickend war das Semester sowohl fachlich als auch persönlich ein großer Gewinn. Künftigen Austauschstudierenden würde ich raten, mindestens ein Seminar außerhalb des eigenen Fachs zu belegen und von Anfang an den Kontakt zu Einheimischen zu suchen, statt unter Landsleuten zu bleiben.'
    ],
    ko: [
      '경험 보고서: 하이델베르크 대학에서 보낸 한 학기',
      '저는 2025/26년 겨울 학기에 교환 프로그램으로 하이델베르크에서 한 학기 동안 독어독문학을 공부했어요. 준비는 출국하기 여섯 달쯤 전에 시작했어요. 무엇보다 집을 구하는 데 시간이 많이 들었어요. 그래서 합격 통지를 받자마자 학생 기숙사 자리를 신청하는 것이 좋아요. 비자와 건강 보험도 일찍 해결해 두어야 해요.',
      '학업은 제 대학에서의 학업과 뚜렷이 달랐어요. 기말시험이 있는 강의 대신 주로 세미나를 들었는데, 세미나에서는 발표를 하고 글을 놓고 치열하게 토론했어요. 처음에는 그 자리에서 손을 들고 말하기가 어려웠어요. 하지만 질문을 분명히 반기는 교수진의 도움 덕분에 빠르게 자신감을 얻었어요. 첫 학기 말 과제를 쓸 때 조언해 준 글쓰기 센터가 특히 도움이 됐어요.',
      '대학 밖에서도 빨리 적응했어요. 대학 스포츠 프로그램과 언어 교환을 통해 독일 학생들과 알게 됐는데, 그것이 어떤 어학 수업보다 훨씬 효과적이었어요. 저를 힘들게 한 것은 가게가 일찍 닫는 것과 시청에서 거주 등록을 할 때의 행정 절차뿐이었어요. 다만 이를 미리 알고 관청 예약을 제때 온라인으로 해 두면 번거로운 일을 많이 줄일 수 있어요.',
      '돌아보면 이 학기는 전공 면에서도 개인적으로도 큰 수확이었어요. 앞으로 올 교환 학생에게는 자기 전공 밖의 세미나를 적어도 하나 듣고, 같은 나라 사람들 사이에만 머물지 말고 처음부터 현지 사람들과 사귀라고 권하고 싶어요.'
    ],
    notes: [
      { de: 'Als zeitaufwendig erwies sich vor allem die Wohnungssuche; es empfiehlt sich daher, …', ko: '평가(als … erwies sich)와 조언(es empfiehlt sich)을 한 문장에 이었어요. 보고서의 기본 틀이에요.' },
      { de: 'Das Studium unterschied sich deutlich von dem an meiner Heimatuniversität.', ko: 'dem은 das Studium을 되풀이하지 않으려고 쓴 지시대명사예요. 문단의 주제를 첫 문장에서 밝혔어요.' },
      { de: '… Seminare, in denen Referate gehalten und Texte kontrovers diskutiert wurden.', ko: '관계문 안의 수동태 과거예요. 과거분사 두 개가 wurden 하나를 함께 써요.' },
      { de: 'Anfangs fiel es mir schwer, … Dank der Unterstützung … gewann ich jedoch rasch an Sicherheit.', ko: '어려움을 쓰고 곧바로 어떻게 풀렸는지를 붙였어요. dank + 2격.' },
      { de: '…, was sich als weitaus wirkungsvoller erwies als jeder Sprachkurs.', ko: 'was는 앞 문장 전체를 받는 관계대명사예요. 앞의 als는 sich erweisen als, 뒤의 als는 비교예요.' },
      { de: 'Künftigen Austauschstudierenden würde ich raten, … zu belegen und … zu suchen, statt … zu bleiben.', ko: 'raten + 3격 + zu 원형이에요. 조언 두 가지와 피할 일 한 가지를 한 문장에 담았어요.' }
    ]
  }
}
];
