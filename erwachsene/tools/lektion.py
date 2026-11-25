#!/usr/bin/env python3
"""SODA Studium, SODA Beruf 본문(과, Wiederholung, Stufentest) 도구. 청소년 교재 도구(jugend/tools/lektion.py)를 옮겨 쓴 것입니다.

  python3 erwachsene/tools/lektion.py check [a1-1/1 ...]      원고(tools/src/<단계>/<이름>.txt)를 읽어 짜임과 음성 글자 수를 검사합니다
  python3 erwachsene/tools/lektion.py tts NAME a1-1/1 ...      아직 음성이 없는 줄의 음성 대본을 tools/tts/NAME_<화자>_NN.json 에 씁니다
  python3 erwachsene/tools/lektion.py prompts NAME a1-1/1 ...  아직 그림이 없는 그림의 프롬프트를 tools/tts/NAME.prompts.json 에 씁니다 (--alle: 있는 그림도 모두)
  python3 erwachsene/tools/lektion.py cut RAW_DIR              RAW_DIR 의 생성 음성(<job>.mp3 + <job>.words.json)을 줄 단위로 잘라 audio/ 에 넣습니다
  python3 erwachsene/tools/lektion.py img RAW_DIR              RAW_DIR 의 그림(<단계>_<이름>_szene.webp, _kartenN.webp, cast_N.webp)을 img/ 에 넣습니다
  python3 erwachsene/tools/lektion.py site [--draft]           과 화면을 두 교재(studium/<단계>/<이름>/, beruf/<단계>/<이름>/)에 만들고 tools/open.json 을 씁니다

원고 하나로 두 교재의 화면을 만듭니다. 공통 단계(A1.1–B1.2)의 과는 본문이 같고, 과제 구역에서 --S 로 시작한 블록은 대학생 교재에만, --B 로 시작한 블록은 직장인 교재에만 나옵니다.
원고 형식은 tools/src/README.md 에 있습니다. 음성은 ElevenLabs eleven_v3(language_code de), 그림은 Recraft 4.1 Flash(SODA 삽화 그림체)입니다.
"""
import sys, os, re, json, glob, html, hashlib, subprocess, datetime, random

T = os.path.dirname(os.path.abspath(__file__))
J = os.path.dirname(T)
ROOT = os.path.dirname(J)
SITE = 'https://sophiadeutschakademie.github.io/SODA-Lehrwerk/'
SR = 44100
PAUSE = os.environ.get('SODA_PAUSE', ' [pause] ')          # 줄 사이에 넣는 쉼 표시
TAIL = 'Gut.'          # 대본 맨 끝에 붙이고 자를 때 버리는 낱말
HEAD = 'Also.'         # 대본 맨 앞에 붙이고 자를 때 버리는 낱말 (음성 파일이 첫 소리 중간에서 시작하는 일이 있다)
MAXLINES = 10
MAXCHARS = 760

# 화자: 화면 이름, 음성(ElevenLabs voice_id), 음성 파일 머리글자, 얼굴 그림
CAST = {
    'Jiu':      dict(name='Jiu', voice='WzPl01KDMCPMOyx39EfF', vname='Leni', pre='ji', av='jiu'),
    'Dohyun':   dict(name='Dohyun', voice='bNFIvb6Gmmlk9QMIWo7U', vname='Andrew', pre='do', av='dohyun'),
    'Sora':     dict(name='Sora', voice='b07hJVVJyFDBHxFNr1Qb', vname='Ithaka', pre='so', av='sora'),
    'Lena':     dict(name='Lena', voice='MiVAi0PlB7YlXfCDRCkq', vname='Lucy', pre='le', av='lena'),
    'Becker':   dict(name='Frau Becker', voice='paJLeKT4SGdqKEMFGc6U', vname='Melissa', pre='be', av='becker'),
    'Markus':   dict(name='Markus', voice='xlbJQnFFGB01bv7HK5CZ', vname='Jonas', pre='mk', av='markus'),
    'Hoffmann': dict(name='Frau Hoffmann', voice='VwrOyjuYiIhDmERAlgrS', vname='Bettina', pre='ho', av='hoffmann'),
    'Frau':     dict(name='Frau', voice='NE7AIW5DoJ7lUosXV2KR', vname='Ela', pre='fr', av=''),
    'Mann':     dict(name='Mann', voice='aTTiK3YzK3dXETpuDE2h', vname='Ben', pre='ma', av=''),
    'N':        dict(name='', voice='tR9bEXIX9ixlxSis0fqv', vname='Toni', pre='n', av=''),
}
CASTSHEETS = (('cast_1', ['jiu', 'dohyun', 'sora', 'lena']), ('cast_2', ['becker', 'markus', 'hoffmann']))
STYLE = ('Modern minimalist editorial illustration, calm and refined, simplified geometric forms, flat matte colors with a very fine subtle grain, '
         'restrained palette of deep navy, slate gray, warm sand and ivory with one muted ochre accent, natural muted skin tones, minimal facial features, '
         'soft subtle shadows. Plain white background, wordless.')
ONE = 'The whole scene sits fully inside the frame, centered, with even generous white margins on all four sides.'
MANY = 'Every item is complete, separated from the others by wide empty white space, and does not touch the edges of the image.'
WHO = {
    'JIU': 'a Korean woman in her mid-twenties with straight black shoulder-length hair and light skin, wearing a muted ochre cardigan over an ivory top and navy trousers',
    'DOHYUN': 'a Korean man in his mid-thirties with short neat black hair, light skin and rectangular glasses, wearing a navy blazer over a slate gray sweater and sand colored trousers',
    'SORA': 'a Korean woman in her late thirties with black hair in a low ponytail and light skin, wearing a slate gray knit sweater and navy trousers',
    'LENA': 'a woman in her mid-twenties with wavy shoulder-length light brown hair and fair skin, wearing a sand colored sweater and navy jeans',
    'BECKER': 'a woman in her fifties with chin-length gray hair and round glasses, wearing a navy cardigan, a muted ochre scarf and slate gray trousers',
    'MARKUS': 'a man in his mid-thirties with short dark blond hair, a short beard and fair skin, wearing a slate gray shirt and navy trousers',
    'HOFFMANN': 'a woman in her mid-forties with dark brown skin and short curly black hair, wearing a navy blazer over an ivory blouse and sand colored trousers',
}
STEPS = [('einstieg', 'Ziel', '목표'), ('hoeren', 'Hören', '듣기'), ('wortschatz', 'Wortschatz', '낱말'),
         ('grammatik', 'Grammatik', '문법'), ('training', 'Lesen und Training', '읽기와 연습'), ('sprechen', 'Aufgabe', '과제')]
STEPS_S = [('rueckblick', 'Rückblick', '돌아보기'), ('training', 'Wiederholung', '복습'), ('projekt', 'Aufgabe', '실전 과제')]
SID = {'einstieg': 'ziel', 'sprechen': 'aufgabe'}          # 화면 주소에 쓰는 구역 이름 (#ziel, #aufgabe)
ALIAS = {'ziel': 'einstieg', 'aufgabe': 'sprechen'}        # 원고에 쓰는 구역 이름
STEPS_T = [('hoeren', 'Hören', '듣기'), ('lesen', 'Lesen', '읽기'), ('schreiben', 'Schreiben', '쓰기'), ('sprechen', 'Sprechen', '말하기'), ('ergebnis', 'Ergebnis', '결과')]


def steps_of(typ):
    return {'station': STEPS_S, 'test': STEPS_T}.get(typ, STEPS)


ALPHABET = [
    ('A B C D E F G', 'Ah, Beh, Tseh, Deh, Eh, Eff, Geh.', '아 베 체 데 에 에프 게'),
    ('H I J K L M N', 'Hah, Ih, Jott, Kah, Ell, Emm, Enn.', '하 이 요트 카 엘 엠 엔'),
    ('O P Q R S T U', 'Oh, Peh, Kuh, Err, Ess, Teh, Uh.', '오 페 쿠 에르 에스 테 우'),
    ('V W X Y Z', 'Fau, Weh, Iks, Ypsilon, Tsett.', '파우 베 익스 윕실론 체트'),
    ('Ä Ö Ü ß', 'Äh, Öh, Üh, Eszett.', '애 외 위 에스체트'),
]
BAD = [r'mach\w*\s+\w+(\s+\w+)?\s+von Beruf', r'_']          # 쓰지 않기로 한 표현, 밑줄

E = lambda s: html.escape(str(s), quote=True)
HANGUL = re.compile(r'[가-힣]')
LAT = r"[0-9]*[\-]?[A-Za-zÄÖÜäöüßẞ][A-Za-zÄÖÜäöüßẞ0-9'’\-]*"
LATRUN = re.compile(r"%s(?:(?:, | )%s)*[?!]?" % (LAT, LAT))


def hl(s):
    """*x* -> 강조"""
    return re.sub(r'\*([^*]+)\*', r'<b class="hl">\1</b>', E(s))


def ko(s):
    """한국어 문장: 안에 든 독일어 낱말을 lang=de 로 묶는다."""
    out = []; i = 0
    for m in LATRUN.finditer(s):
        out.append(hl(s[i:m.start()])); out.append('<span lang="de" class="d">%s</span>' % hl(m.group(0))); i = m.end()
    out.append(hl(s[i:]))
    return ''.join(out)


def mix(s):
    """보기처럼 독일어일 수도 한국어일 수도 있는 짧은 말"""
    return (ko(s), 'ko') if HANGUL.search(s) else (hl(s), 'de')


def plain(s):
    return re.sub(r'\*([^*]+)\*', r'\1', s)


def seed(*parts):
    return random.Random(int(hashlib.md5('|'.join(parts).encode('utf-8')).hexdigest()[:8], 16))


def hid(prefix, *parts):
    return prefix + hashlib.md5('|'.join(parts).encode('utf-8')).hexdigest()[:5]


def fields(s):
    return [x.strip() for x in s.split(' | ')]


def cut_why(s):
    if ' => ' in s:
        a, b = s.rsplit(' => ', 1)
        return a.strip(), b.strip()
    return s.strip(), ''


def take_say(f):
    say = ''
    rest = []
    for x in f:
        if x.startswith('say='):
            say = x[4:].strip()
        else:
            rest.append(x)
    return rest, say


# ---------------------------------------------------------------- 원고 읽기
def p_mc(rest):
    rest, why = cut_why(rest)
    f = fields(rest)
    q, opts = f[0], f[1:]
    ok = [i for i, o in enumerate(opts) if o.endswith('*')]
    assert len(opts) >= 2 and len(ok) == 1, '보기에 정답 표시(*)가 하나여야 합니다'
    return {'k': 'mc', 'q': q, 'opts': [o[:-1].strip() if o.endswith('*') else o for o in opts], 'ok': ok[0], 'why': why}


def p_rf(rest):
    rest, why = cut_why(rest)
    f = fields(rest)
    assert len(f) == 2 and f[1] in ('r', 'f'), 'rf: 문장 | r 또는 f'
    return {'k': 'mc', 'rf': 1, 'q': f[0], 'opts': ['richtig', 'falsch'], 'ok': 0 if f[1] == 'r' else 1, 'why': why, 'fix': 1}


def p_wahl(rest, opts):
    rest, why = cut_why(rest)
    f = fields(rest)
    assert opts and len(f) == 2 and f[1] in opts, 'wahl: 낱말 | 보기 가운데 하나'
    return {'k': 'mc', 'row': 1, 'q': f[0], 'opts': list(opts), 'ok': opts.index(f[1]), 'why': why, 'fix': 1}


def p_gap(rest):
    rest, why = cut_why(rest)
    f = fields(rest)
    sent, kor = f[0], (f[1] if len(f) > 1 else '')
    parts = []; pos = 0
    for m in re.finditer(r'\[([^\]]+)\]', sent):
        if m.start() > pos:
            parts.append(sent[pos:m.start()])
        g = m.group(1)
        if g.startswith('='):
            parts.append({'t': 'in', 'ans': [a.strip() for a in g[1:].split('/')]})
        else:
            o = [x.strip() for x in g.split('|')]
            assert len(o) >= 2, '빈칸 보기가 둘 이상이어야 합니다'
            parts.append({'t': 'pick', 'opts': o, 'ok': o[0]})
        pos = m.end()
    if pos < len(sent):
        parts.append(sent[pos:])
    assert any(isinstance(p, dict) for p in parts), '빈칸이 없습니다'
    return {'k': 'gap', 'parts': parts, 'ko': kor, 'why': why}


def p_ord(rest):
    rest, why = cut_why(rest)
    f = fields(rest)
    alts = []; end = ''
    for a in f[0].split(' ~ '):
        toks = [t.strip() for t in a.split(' / ')]
        m = re.search(r'[.?!]$', toks[-1])
        if m:
            end = m.group(0); toks[-1] = toks[-1][:-1]
        alts.append(toks)
    assert all(sorted(a) == sorted(alts[0]) for a in alts) and len(alts[0]) >= 3, 'ord: 낱말이 셋 이상이고 다른 답도 같은 낱말이어야 합니다'
    return {'k': 'ord', 'alts': alts, 'end': end, 'ko': f[1] if len(f) > 1 else '', 'why': why}


def p_paar(rest):
    pairs = [[x.strip() for x in p.split(' = ')] for p in rest.split(' ; ')]
    assert all(len(p) == 2 for p in pairs) and len(pairs) >= 3, 'paar: 왼쪽 = 오른쪽 ; … (셋 이상)'
    return {'k': 'paar', 'pairs': pairs}


def p_line(rest):
    """Name: 독일어 | 한국어 | say=… -> 화자가 있는 줄"""
    m = re.match(r'^(\w+): (.*)$', rest)
    assert m and m.group(1) in CAST, '화자를 알 수 없습니다: ' + rest[:20]
    f, say = take_say(fields(m.group(2)))
    return {'who': m.group(1), 'de': f[0], 'ko': f[1] if len(f) > 1 else '', 'say': say or plain(f[0])}


def parse(path):
    L = {'id': '', 'typ': 'lektion', 'secs': {}, 'order': []}
    sec = None; blk = None; pend = None
    for ln, raw in enumerate(open(path, encoding='utf-8'), 1):
        s = raw.strip()
        if not s or s.startswith('#'):
            continue
        try:
            if s.startswith('@'):
                k, _, v = s[1:].partition(' ')
                L[k] = v.strip(); continue
            if s.startswith('== '):
                sec = s[3:].strip(); sec = ALIAS.get(sec, sec); L['secs'][sec] = []; L['order'].append(sec); blk = None
                if sec == 'einstieg':
                    blk = {'t': 'einstieg', 'worte': [], 'items': []}; L['secs'][sec].append(blk)
                continue
            assert sec, '== 구역 이름이 먼저 와야 합니다'
            if s.startswith(('-- ', '--S ', '--B ')):
                nur = s[2] if s[2] in 'SB' else ''                  # --S: 대학생 교재에만, --B: 직장인 교재에만
                head = s[3:].strip(); t, _, arg = head.partition(' '); f = fields(arg) if arg else []
                blk = {'t': t, 'nur': nur}; pend = None
                if t == 'dialog':
                    blk.update(key=f[0], titel=f[1], ort=f[2] if len(f) > 2 else '', vor='', lines=[], names={})
                    for extra in f[3:]:
                        for kv in extra.split(';'):
                            a, _, b = kv.partition('='); blk['names'][a.strip()] = b.strip()
                elif t in ('fragen',):
                    blk.update(inst=arg, items=[])
                elif t == 'kultur':
                    blk.update(titel=arg, p=[], items=[])
                elif t == 'gruppe':
                    blk.update(de=f[0], ko=f[1] if len(f) > 1 else '', items=[])
                elif t == 'bilder':
                    blk.update(map=[])
                elif t == 'aussprache':
                    blk.update(titel=f[0], sub=f[1] if len(f) > 1 else '', p=[], hoer=[])
                elif t == 'tipp':
                    blk.update(titel=arg, p=[])
                elif t == 'punkt':
                    blk.update(de=f[0], ko=f[1] if len(f) > 1 else '', bsp=[], finde=None, regel='', tab=[], merke='')
                elif t == 'alphabet':
                    blk.update(p=[])
                elif t == 'tafel':
                    blk.update(titel=f[0], sub=f[1] if len(f) > 1 else '', p=[], rows=[])
                elif t == 'ex':
                    opt = []
                    for x in f[2:]:
                        if x.startswith('opt:'):
                            opt = [o.strip() for o in x[4:].split('/')]
                    blk.update(rubrik=f[0], inst=f[1] if len(f) > 1 else '', opt=opt, parts=[])
                elif t == 'redemittel':
                    blk.update(rows=[])
                elif t == 'rolle':
                    blk.update(dialog=f[0], roles=[r.strip() for r in f[1].split(',')])
                elif t == 'ich':
                    blk.update(titel=f[0], inst=f[1] if len(f) > 1 else '', felder=[], saetze=[])
                elif t == 'schreiben':
                    blk.update(titel=f[0], aufgabe=f[1] if len(f) > 1 else '', punkt=[], muster='', check=[], start='')
                elif t == 'kann':
                    blk.update(items=[])
                elif t == 'projekt':
                    blk.update(titel=f[0], inst=f[1] if len(f) > 1 else '', p=[], felder=[], saetze=[], check=[], karte=[], kt=f[2] if len(f) > 2 else f[0])
                elif t == 'info':
                    blk.update(titel=arg, p=[])
                elif t == 'story':
                    blk.update(titel=f[0], inst=f[1] if len(f) > 1 else '', bilder=[])
                elif t == 'fortschritt':
                    pass
                elif t == 'bilanz':
                    blk.update(hoch='', mittel='', tief='')
                elif t == 'quiz':
                    blk.update(titel=f[0] if f else '낱말 다시 보기', sub=f[1] if len(f) > 1 else '')
                elif t == 'sprich':
                    blk.update(titel=f[0], inst=f[1] if len(f) > 1 else '', fragen=[], thema=[], muster='', names={})
                    for extra in f[2:]:
                        for kv in extra.split(';'):
                            a_, _, b_ = kv.partition('='); blk['names'][a_.strip()] = b_.strip()
                elif t == 'teil':
                    blk.update(titel=f[0], inst=f[1] if len(f) > 1 else '', parts=[], opt=[], rubrik=f[0])
                else:
                    raise AssertionError('모르는 블록: ' + t)
                L['secs'][sec].append(blk); continue
            assert blk is not None, '-- 블록이 먼저 와야 합니다'
            t = blk['t']
            key, sep, rest = s.partition(': ')
            if not sep:
                key, rest = '', s
            # 구역이나 블록에 따라 줄을 읽는다
            if t == 'einstieg':
                if key in ('bild', 'alt', 'lead', 'mission'):
                    blk[key] = rest
                elif key == 'wort':
                    f, say = take_say(fields(rest)); blk['worte'].append({'de': f[0], 'ko': f[1], 'say': say or f[0]})
                elif key == 'mc':
                    blk['items'].append(p_mc(rest))
                else:
                    raise AssertionError('einstieg 에 쓸 수 없는 줄')
            elif t == 'dialog':
                if key == 'vor':
                    blk['vor'] = rest
                else:
                    blk['lines'].append(p_line(s))
            elif t in ('fragen', 'kultur', 'ex', 'teil'):
                tgt = blk['items'] if t in ('fragen', 'kultur') else blk['parts']
                if t == 'kultur' and key == 'p':
                    blk['p'].append(rest); continue
                if key == 'hör':
                    pend = p_line(rest); continue
                if s.startswith('text '):
                    f = fields(s[5:]); tgt.append({'k': 'text', 'art': f[0], 'titel': f[1] if len(f) > 1 else '', 'rows': []}); continue
                if s == 'audio' or s.startswith('audio |'):
                    f = fields(s); nm = {}
                    for extra in f[2:]:                      # audio | 제목 | Mann=Trainer; Frau=Kellnerin
                        for kv in extra.split(';'):
                            a_, _, b_ = kv.partition('='); nm[a_.strip()] = b_.strip()
                    tgt.append({'k': 'audio', 'titel': f[1] if len(f) > 1 else '', 'lines': [], 'names': nm}); continue
                if s.startswith('> '):
                    last = tgt[-1]
                    if last['k'] == 'audio':
                        last['lines'].append(p_line(s[2:]))
                    else:
                        last['rows'].append(s[2:])
                    continue
                if key == 'mc': it = p_mc(rest)
                elif key == 'rf': it = p_rf(rest)
                elif key == 'gap': it = p_gap(rest)
                elif key == 'ord': it = p_ord(rest)
                elif key == 'paar': it = p_paar(rest)
                elif key == 'wahl': it = p_wahl(rest, blk.get('opt'))
                elif key == 'dik':
                    d = p_line(rest); it = {'k': 'dik', 'who': d['who'], 'de': d['de'], 'ko': d['ko'], 'say': d['say']}
                else:
                    raise AssertionError('모르는 문제 줄: ' + key)
                if pend:
                    it['hoer'] = pend; pend = None
                tgt.append(it)
            elif t == 'gruppe':
                f, say = take_say(fields(s))
                assert len(f) >= 4, '단어 줄: 낱말 | 뜻 | 예문 | 예문 뜻'
                blk['items'].append({'lemma': f[0], 'ko': f[1], 'bsp': f[2], 'bspko': f[3], 'bsay': say or plain(f[2])})
            elif t == 'bilder':
                assert sep, '그림 줄: 낱말: 그림 설명'
                blk['map'].append((key, rest))
            elif t == 'aussprache':
                if key == 'p':
                    blk['p'].append(rest)
                elif key == 'hör':
                    f, say = take_say(fields(rest)); blk['hoer'].append({'de': f[0], 'label': f[1] if len(f) > 1 else '', 'say': say or f[0]})
                else:
                    raise AssertionError('aussprache 에 쓸 수 없는 줄')
            elif t in ('tipp', 'alphabet', 'info'):
                assert key == 'p'; blk['p'].append(rest)
            elif t == 'bilanz':
                assert key in ('hoch', 'mittel', 'tief'), 'bilanz: hoch, mittel, tief'
                blk[key] = rest
            elif t == 'story':
                if key == 'bild':
                    blk['bilder'].append({'bild': rest, 'alt': '', 'lines': []})
                elif key == 'alt':
                    blk['bilder'][-1]['alt'] = rest
                else:
                    blk['bilder'][-1]['lines'].append(p_line(s))
            elif t == 'sprich':
                if key == 'f':
                    q, _, ans = rest.partition(' => '); d_ = p_line(q.strip()); d_['muster'] = ans.strip(); blk['fragen'].append(d_)
                elif key == 'thema':
                    blk['thema'] = [x.strip() for x in rest.split(' ; ')]
                elif key == 'muster':
                    blk['muster'] = rest
                else:
                    raise AssertionError('sprich 에 쓸 수 없는 줄')
            elif t == 'tafel':
                if key == 'p':
                    blk['p'].append(rest)
                elif key == 'r':
                    f, say = take_say(fields(rest)); cells = [c.strip() for c in f[0].split(' ; ')]
                    blk['rows'].append({'cells': cells, 'say': say or ', '.join(cells)})
                else:
                    raise AssertionError('tafel 에 쓸 수 없는 줄')
            elif t == 'punkt':
                if key == 'bsp':
                    f = fields(rest); blk['bsp'].append((f[0], f[1] if len(f) > 1 else ''))
                elif key == 'finde':
                    blk['finde'] = p_mc(rest)
                elif key in ('regel', 'merke'):
                    blk[key] = rest
                elif s.startswith('|'):
                    blk['tab'].append([c.strip() for c in s[1:].split('|')])
                else:
                    raise AssertionError('punkt 에 쓸 수 없는 줄')
            elif t == 'redemittel':
                assert sep, 'redemittel: 제목: 독일어 | 한국어 ; …'
                blk['rows'].append((key, [fields(x) for x in rest.split(' ; ')]))
            elif t in ('ich', 'projekt'):
                if key == 'feld':
                    f = fields(rest); blk['felder'].append({'k': f[0], 'label': f[1], 'ph': f[2] if len(f) > 2 else ''})
                elif key == 'satz':
                    blk['saetze'].append(rest)
                elif key == 'p' and t == 'projekt':
                    blk['p'].append(rest)
                elif key == 'check' and t == 'projekt':
                    blk['check'] = [x.strip() for x in rest.split(' ; ')]
                elif key == 'karte' and t == 'projekt':
                    a_, _, b_ = rest.partition(' = '); blk['karte'].append((a_.strip(), b_.strip()))
                else:
                    raise AssertionError(t + ' 에 쓸 수 없는 줄')
            elif t == 'schreiben':
                if key in ('punkt', 'check'):
                    blk[key] = [x.strip() for x in rest.split(' ; ')]
                elif key in ('muster', 'start'):
                    blk[key] = rest
                else:
                    raise AssertionError('schreiben 에 쓸 수 없는 줄')
            elif t == 'kann':
                f = fields(s); blk['items'].append((f[0], f[1]))
            else:
                raise AssertionError('이 블록에는 줄을 쓸 수 없습니다: ' + t)
        except (AssertionError, IndexError, KeyError) as e:
            raise SystemExit('%s:%d: %s\n    %s' % (os.path.relpath(path, ROOT), ln, e, s))
    assert L['id'], path + ': @id 가 없습니다'
    return L


def lemma_info(lemma):
    """('der', 'der Name', ', die Namen', 말할 글)"""
    forms = re.search(r'\((du [^)]*)\)', lemma)                  # 모음이 바뀌는 동사는 du, er 형태도 함께 말한다
    spoken = re.sub(r'\s*\([^)]*\)', '', lemma).strip()
    m = re.match(r'^(der|die|das) ', spoken)
    art = m.group(1) if m else ''
    if art and '(Pl.)' in lemma:
        art = 'pl'
    head, sepc, pl = spoken.partition(', ') if art else (spoken, '', '')
    if forms:
        spoken += ', ' + forms.group(1)
    if not re.search(r'[.!?…]$', spoken):
        spoken += '.'
    return art, head, (sepc + pl) if pl else '', spoken


# ---------------------------------------------------------------- 차례와 원고 목록
def inhalt():
    return json.load(open(os.path.join(T, 'inhalt.json'), encoding='utf-8'))


_PAGES = []


def status():
    """erwachsene/tools/status.json: {"public": 공개 여부, "ohne_audio": [음성을 아직 만들지 않은 단계]}"""
    try:
        return json.load(open(os.path.join(T, 'status.json'), encoding='utf-8'))
    except (OSError, ValueError):
        return {}


def is_public():
    """성인 교재 두 권의 공개 여부. 비공개이면 화면마다 noindex 를 넣는다."""
    return bool(status().get('public', True))


def ohne_audio(lv_id):
    """음성을 나중에 만들기로 한 단계인가. 그런 단계는 음성이 없어도 화면을 열고, 음성 단추는 꺼 둔다."""
    return lv_id in (status().get('ohne_audio') or [])


def lvdir(code):
    """A1.1 -> a1-1 : 교재 폴더와 목차 주소에 쓰는 단계 이름"""
    return code.lower().replace('.', '-')


def books():
    return inhalt()['books']


def pages():
    """단계 순서대로 늘어놓은 화면 목록. id 는 <단계 id>/<이름> (a1-1/1, s-b2-1/1 …)"""
    if _PAGES:
        return _PAGES
    out = _PAGES
    for lv in inhalt()['levels']:
        lv['hid'] = lvdir(lv['code']); n = 0; w = 0
        for it in lv['items']:
            if it['t'] == 'l':
                n += 1
                out.append(dict(id='%s/%d' % (lv['id'], n), lv=lv, slug=str(n), typ='lektion', nr=n, de=it['de'], ko=it['ko'], ziel=it['ziel'], gr=it['gr'],
                                syn=it.get('syn') or [], auf={'S': it.get('as') or it.get('auf', ''), 'B': it.get('ab') or it.get('auf', '')}))
            elif it['t'] == 'w':
                w += 1; head, _, rest = it['txt'].partition(': ')
                out.append(dict(id='%s/wiederholung-%d' % (lv['id'], w), lv=lv, slug='wiederholung-%d' % w, typ='station', nr=w, de='Wiederholung %d' % w, ko='복습과 실전 과제', ziel=rest or it['txt'], gr='',
                                syn=[], auf={'S': '', 'B': ''}))
            else:
                out.append(dict(id='%s/stufentest' % lv['id'], lv=lv, slug='stufentest', typ='test', nr=0, de=it['de'], ko=it.get('ko', '단계 평가'), ziel=it['txt'], gr='', syn=[], auf={'S': '', 'B': ''}))
    return out


def src_path(pid):
    lvl, name = pid.split('/')
    name = {'stufentest': 't'}.get(name, name.replace('wiederholung-', 'w'))
    return os.path.join(T, 'src', lvl, name + '.txt')


def have_src():
    return [p for p in pages() if os.path.exists(src_path(p['id']))]


def want(args):
    ps = have_src()
    if not args:
        return ps
    out = []
    for a in args:
        hit = [p for p in ps if p['id'] == a or p['id'].startswith(a + '/')]
        assert hit, '원고가 없습니다: ' + a
        out += hit
    return out


# ---------------------------------------------------------------- 음성으로 만들 줄
def audio_items(L):
    """[(화자, [글…])]: 한 번에 이어 말할 글 묶음. 단어는 [낱말, 예문] 두 조각이다."""
    out = []; seen = set()

    def add(who, *texts):
        texts = [t for t in texts if (who, t) not in seen]
        for t in texts:
            seen.add((who, t))
        if texts:
            out.append((who, list(texts)))

    def items(lst):
        for it in lst:
            if it.get('hoer'):
                add(it['hoer']['who'], it['hoer']['say'])
            if it['k'] == 'dik':
                add(it['who'], it['say'])
            if it['k'] == 'audio':
                for l in it['lines']:
                    add(l['who'], l['say'])

    for sec in L['order']:
        for b in L['secs'][sec]:
            t = b['t']
            if t == 'einstieg':
                for w in b['worte']:
                    add('N', w['say'])
                items(b['items'])
            elif t == 'dialog':
                for l in b['lines']:
                    add(l['who'], l['say'])
            elif t in ('fragen', 'kultur'):
                items(b['items'])
            elif t in ('ex', 'teil'):
                items(b['parts'])
            elif t == 'gruppe':
                for w in b['items']:
                    add('N', lemma_info(w['lemma'])[3], w['bsay'])
            elif t == 'aussprache':
                for h in b['hoer']:
                    add('N', h['say'])
            elif t == 'alphabet':
                for _, say, _ in ALPHABET:
                    add('N', say)
            elif t == 'tafel':
                for r in b['rows']:
                    add('N', r['say'])
            elif t == 'sprich':
                for q in b['fragen']:
                    add(q['who'], q['say'])
            elif t == 'story':
                for bd in b['bilder']:
                    for l in bd['lines']:
                        add(l['who'], l['say'])
    return out


def amap_path(pid):
    return os.path.join(T, 'audio', pid.replace('/', '_') + '.json')


def amap(pid):
    p = amap_path(pid)
    return json.load(open(p, encoding='utf-8')) if os.path.exists(p) else {}


def aid(mp, pid, who, text):
    """음성 파일 이름(확장자 없이). 파일이 없으면 ''."""
    ident = mp.get(who + '|' + text)
    if ident and os.path.exists(os.path.join(J, 'audio', pid, ident + '.mp3')):
        return ident
    return ''


_MAPS = {}


def sib_audio(pid, who, text):
    """같은 단계의 과에 같은 사람이 말한 같은 글이 있으면 그 음성을 쓴다(Station, 평가). -> '../3/n12' 또는 ''"""
    lvl = pid.split('/')[0]
    for q in pages():
        if q['lv']['id'] != lvl or q['id'] == pid or q['typ'] != 'lektion':
            continue
        if q['id'] not in _MAPS:
            _MAPS[q['id']] = amap(q['id'])
        ident = aid(_MAPS[q['id']], q['id'], who, text)
        if ident:
            return '../%s/%s' % (q['slug'], ident)
    return ''


def any_voice(mp, pid, text):
    """말한 사람과 상관없이 같은 글의 음성을 찾는다(문법 예문에 씀)."""
    for who in CAST:
        a = aid(mp, pid, who, text)
        if a:
            return a
    return ''


# ---------------------------------------------------------------- 검사
def check_one(L, p):
    errs = []
    blob = open(src_path(p['id']), encoding='utf-8').read()
    for pat in BAD:
        if re.search(pat, blob):
            errs.append('쓰지 않는 표현: ' + pat)
    secs = L['secs']
    if L['typ'] == 'lektion':
        for s, _, _ in STEPS:
            if s not in secs:
                errs.append('구역 없음: ' + s)
        dl = {b['key']: b for b in secs.get('hoeren', []) if b['t'] == 'dialog'}
        if len(dl) < 2:
            errs.append('대화가 둘보다 적음')
        for b in secs.get('sprechen', []):
            if b['t'] == 'rolle':
                if b['dialog'] not in dl:
                    errs.append('rolle: 대화 없음 ' + b['dialog'])
                else:
                    who = {l['who'] for l in dl[b['dialog']]['lines']}
                    for r in b['roles']:
                        if r not in who:
                            errs.append('rolle: 역할 없음 ' + r)
        words = [w for b in secs.get('wortschatz', []) if b['t'] == 'gruppe' for w in b['items']]
        lem = [w['lemma'] for w in words]
        if len(set(lem)) != len(lem):
            errs.append('단어가 겹침')
        for b in secs.get('wortschatz', []):
            if b['t'] == 'bilder':
                for k, _ in b['map']:
                    if k not in lem:
                        errs.append('bilder: 단어 없음 ' + k)
                if len(b['map']) % 6:
                    errs.append('bilder: 6의 배수가 아님 (%d)' % len(b['map']))
        if not any(b['t'] == 'kann' for b in secs.get('sprechen', [])):
            errs.append('kann 없음')
        nur = {b.get('nur') for b in secs.get('sprechen', [])}
        if p['lv']['art'] == 'g' and not {'S', 'B'} <= nur:
            errs.append('공통 단계의 과제 구역에는 --S 블록과 --B 블록이 모두 있어야 함')
        if p['lv']['art'] != 'g' and nur & {'S', 'B'}:
            errs.append('교재가 하나뿐인 단계에는 --S, --B 를 쓰지 않음')
        for sec_, bl_ in secs.items():
            if sec_ != 'sprechen' and any(b.get('nur') for b in bl_):
                errs.append('--S, --B 는 과제 구역에서만 씀 (%s)' % sec_)
        e = secs.get('einstieg', [{}])[0]
        for k in ('bild', 'alt', 'lead', 'mission'):
            if not e.get(k):
                errs.append('einstieg: ' + k)
    else:
        if L['typ'] != p['typ']:
            errs.append('@typ 이 %s 여야 함' % p['typ'])
        for s, _, _ in steps_of(p['typ']):
            if s not in secs:
                errs.append('구역 없음: ' + s)
        if p['typ'] == 'station' and not L.get('lektionen'):
            errs.append('@lektionen 없음')
        for bl in secs.values():
            for b in bl:
                if b['t'] == 'projekt':
                    keys = {f['k'] for f in b['felder']}
                    for txt in b['saetze'] + [v for _, v in b['karte']]:
                        for m in re.findall(r'\{(\w+)\}', txt):
                            if m not in keys:
                                errs.append('projekt: 칸 없음 ' + m)
    return errs


def cmd_check(args):
    tot = 0; bad = 0
    for p in want(args):
        L = parse(src_path(p['id'])); errs = check_one(L, p); bad += len(errs)
        its = audio_items(L); ch = sum(len(t) for _, ts in its for t in ts); tag = len(its) * len(PAUSE); tot += ch + tag
        by = {}
        for who, ts in its:
            by[who] = by.get(who, 0) + sum(len(t) for t in ts)
        words = sum(len(b['items']) for b in L['secs'].get('wortschatz', []) if b['t'] == 'gruppe')
        print('%-18s 음성 %3d줄 글자 %5d(+쉼 %4d)  단어 %2d  %s%s' % (p['id'], len(its), ch, tag, words, ' '.join('%s %d' % kv for kv in sorted(by.items(), key=lambda x: -x[1])),
                                                              ('\n   !! ' + '; '.join(errs)) if errs else ''))
    print('음성 글자(쉼 포함) %d | 문제 %d' % (tot, bad))
    return bad


def cmd_prune(args):
    """원고에서 빠진 줄의 음성 파일과 이름표를 지운다."""
    for p in want(args):
        L = parse(src_path(p['id'])); mp = amap(p['id'])
        need = {who + '|' + t for who, ts in audio_items(L) for t in ts}
        gone = [k for k in mp if k not in need]
        for k in gone:
            f = os.path.join(J, 'audio', p['id'], mp.pop(k) + '.mp3')
            if os.path.exists(f):
                os.remove(f)
        d = os.path.join(J, 'audio', p['id']); keep = set(mp.values())
        stray = [f for f in (os.listdir(d) if os.path.isdir(d) else []) if f.endswith('.mp3') and f[:-4] not in keep]
        for f in stray:
            os.remove(os.path.join(d, f))
        if gone or stray:
            json.dump(mp, open(amap_path(p['id']), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
            print('%s: 이름표 %d줄, 파일 %d개 지움' % (p['id'], len(gone), len(stray)))


# ---------------------------------------------------------------- 음성 대본
def missing_audio(ps):
    out = []
    for p in ps:
        L = parse(src_path(p['id'])); mp = amap(p['id'])
        for who, texts in audio_items(L):
            texts = [t for t in texts if not aid(mp, p['id'], who, t) and not (p['typ'] != 'lektion' and sib_audio(p['id'], who, t))]
            if texts:
                out.append({'pid': p['id'], 'who': who, 'parts': texts})
    return out


def cmd_tts(name, args):
    os.makedirs(os.path.join(T, 'tts'), exist_ok=True)
    todo = missing_audio(want(args)); by = {}
    for it in todo:
        by.setdefault(it['who'], []).append(it)
    plan = []; total = 0
    for who in CAST:
        items = by.get(who, []); jobs = [[]]
        for it in items:
            cur = jobs[-1]; ln = sum(len(' '.join(x['parts'])) + len(PAUSE) for x in cur) + len(' '.join(it['parts']))
            if cur and (len(cur) >= MAXLINES or ln > MAXCHARS):
                jobs.append([]); cur = jobs[-1]
            cur.append(it)
        for i, job in enumerate(j for j in jobs if j):
            jn = '%s_%s_%02d' % (name, CAST[who]['pre'], i + 1)
            script = HEAD + PAUSE + PAUSE.join(' '.join(x['parts']) for x in job) + PAUSE + TAIL         # 앞뒤에 버리는 낱말을 하나씩 두어 첫 말과 마지막 말이 잘리지 않게 한다
            json.dump({'job': jn, 'who': who, 'voice': CAST[who]['vname'], 'voice_id': CAST[who]['voice'], 'items': job, 'script': script, 'tail': TAIL, 'head': HEAD},
                      open(os.path.join(T, 'tts', jn + '.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
            plan.append({'job': jn, 'voice_id': CAST[who]['voice'], 'chars': len(script), 'lines': len(job)}); total += len(script)
    json.dump(plan, open(os.path.join(T, 'tts', name + '.plan.json'), 'w'), indent=0)
    for q in plan:
        print(q['job'], q['lines'], q['chars'])
    print('jobs', len(plan), 'TOTAL chars', total)


# ---------------------------------------------------------------- 그림 프롬프트
def who_text(s):
    for k, v in WHO.items():
        s = s.replace(k, v)
    return s


def card_sheets(L):
    """[[(낱말, 설명) x 6], …]"""
    cards = [kv for b in L['secs'].get('wortschatz', []) if b['t'] == 'bilder' for kv in b['map']]
    return [cards[i:i + 6] for i in range(0, len(cards), 6)]


def story_pics(L):
    """[(번호, 그림 설명)] 새로 그릴 이야기 그림. 'bild: = a1-2/2 c1' 처럼 다른 과의 그림을 빌려 쓰는 줄은 뺀다."""
    out = []; k = 0
    for bl in L['secs'].values():
        for b in bl:
            if b['t'] == 'story':
                for bd in b['bilder']:
                    k += 1
                    if not bd['bild'].startswith('='):
                        out.append((k, bd['bild']))
    return out


def cmd_prompts(name, args):
    alle = '--alle' in args; args = [a for a in args if a != '--alle']      # --alle: 이미 있는 그림의 프롬프트도 적는다 (기록용)
    os.makedirs(os.path.join(T, 'tts'), exist_ok=True); out = []
    for p in want(args):
        L = parse(src_path(p['id'])); base = p['id'].replace('/', '_'); d = os.path.join(J, 'img', p['id'])
        e = (L['secs'].get('einstieg') or [{}])[0]
        if e.get('bild') and (alle or not os.path.exists(os.path.join(d, 'szene.webp'))):
            out.append({'name': base + '_szene', 'ratio': '4:3', 'prompt': '%s All figures are shown in full from head to feet. %s %s' % (who_text(e['bild']), ONE, STYLE)})
        for i, sh in enumerate(card_sheets(L)):
            if not alle and all(os.path.exists(os.path.join(d, 'c%d.webp' % (i * 6 + k + 1))) for k in range(6)):
                continue
            k = [who_text(x[1]) for x in sh]
            out.append({'name': '%s_karten%d' % (base, i + 1), 'ratio': '3:2', 'prompt':
                        'Six separate small illustrations arranged in a neat grid of two rows and three columns, all the same size. Top row from left to right: %s; %s; %s. '
                        'Bottom row from left to right: %s; %s; %s. %s %s' % (k[0], k[1], k[2], k[3], k[4], k[5], MANY, STYLE)})
        for k, bild in story_pics(L):
            if alle or not os.path.exists(os.path.join(d, 'b%d.webp' % k)):
                t = who_text(bild).strip()
                t = t[0].upper() + t[1:] + ('' if t.endswith('.') else '.')
                out.append({'name': '%s_b%d' % (base, k), 'ratio': '4:3', 'prompt': '%s %s %s' % (t, ONE, STYLE)})
    json.dump(out, open(os.path.join(T, 'tts', name + '.prompts.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    for o in out:
        print(o['name'], o['ratio'])
    print(len(out), 'image prompts')


# ---------------------------------------------------------------- 음성 자르기
def _np():
    import numpy as np
    return np


def load(path):
    np = _np()
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32).copy()


def env_db(x, win=0.02, hop=0.005):
    np = _np()
    w = int(win * SR); h = int(hop * SR); n = max(1, (len(x) - w) // h + 1)
    c = np.concatenate([[0.0], np.cumsum(x.astype(np.float64) ** 2)])
    i = np.arange(n) * h; r = np.sqrt((c[i + w] - c[i]) / w + 1e-12)
    return 20 * np.log10(r + 1e-9), h


def speech_runs(x, tags=()):
    """말소리 구간 [[시작, 끝] …]과 묵음 기준(dB). 쉼 표시 구간의 소리 크기로 바탕 소음을 재서 기준을 정하고,
    숨소리처럼 작은 덩어리는 말소리로 치지 않는다."""
    np = _np()
    db, h = env_db(x); top = db.max(); thr = top - 42
    idx = [np.arange(int(a * SR / h), min(len(db), int(b * SR / h))) for a, b in tags if b > a]
    if idx:
        nz = float(np.percentile(db[np.concatenate(idx)], 75)); thr = min(top - 28, max(thr, nz + 8))
    on = db > thr; runs = []; s = None
    for i, v in enumerate(on):
        if v and s is None:
            s = i
        if (not v) and s is not None:
            runs.append([s, i]); s = None
    if s is not None:
        runs.append([s, len(on)])
    runs = [r for r in runs if (r[1] - r[0]) * h / SR > 0.03 and db[r[0]:r[1]].max() >= top - 26]
    merged = []
    for r in runs:
        if merged and (r[0] - merged[-1][1]) * h / SR < 0.12:
            merged[-1][1] = r[1]
        else:
            merged.append(r)
    return [[a * h / SR, b * h / SR] for a, b in merged], thr


def units(t):
    return len(re.findall(r'[A-Za-zÄÖÜäöüß]', t)) + 2.0 * len(re.findall(r'[.!?:,–…]', t)) + 2.0


def split_words(x, words, items, tail='', head=''):
    """음성 엔진이 알려 주는 낱말 시각으로 자른다. 줄 사이는 쉼 표시, 한 줄 안의 두 조각(낱말과 예문)은 낱말 수로 나누고,
    알려 준 시각이 조금 어긋날 수 있어 자를 곳은 가장 가까운 실제 묵음에 맞춘다. -> [[(시작, 끝) 조각마다] 줄마다]"""
    np = _np()
    groups = [[]]; tags = []; cur = None
    for w in words:
        t = w['text']
        if t in ('[long', '[short'):
            cur = [w['start'], w['end']]; continue
        if t == 'pause]' and cur is not None:
            tags.append((cur[0], w['end'])); cur = None; groups.append([]); continue
        if t == '[pause]':
            tags.append((w['start'], w['end'])); groups.append([]); continue
        if t.startswith('[') and t.endswith(']'):
            continue
        groups[-1].append(w)
    alltags = list(tags)
    if len(groups) == len(items) + 1 and not groups[-1]:          # 대본 끝에 붙인 쉼 표시
        groups.pop(); tags.pop()
    nhead = 0
    if head and len(groups) > len(items) and ' '.join(w['text'] for w in groups[0]) == head:
        groups.pop(0); nhead = 1                                  # 앞에 붙인 버리는 낱말: 쉼 표시는 그대로 두고 첫 소리 덩어리를 뺀다
    ntail = 0
    if tail and len(groups) == len(items) + 1 and ' '.join(w['text'] for w in groups[-1]) == tail:
        groups.pop(); ntail = 1                                   # 끝에 붙인 버리는 낱말: 쉼 표시는 그대로 두고 마지막 소리 덩어리를 뺀다
    if len(groups) != len(items) or any(not g for g in groups):
        return None, {'err': '%d aligned lines, need %d' % (len([g for g in groups if g]), len(items))}
    for g, it in zip(groups, items):
        want_t = ' '.join(' '.join(it['parts']).split())
        if ' '.join(w['text'] for w in g) != want_t:
            return None, {'err': 'text differs: ' + ' '.join(w['text'] for w in g) + ' / ' + want_t}
    runs, thr = speech_runs(x, alltags); gaps = [(runs[i][1], runs[i + 1][0]) for i in range(len(runs) - 1)]
    if len(runs) < len(items) + ntail + nhead:
        return None, {'err': '%d sounds for %d lines' % (len(runs), len(items))}
    cut = []; far = 0.0
    for ts, te in tags:
        best = None; key = None
        for i, (g0, g1) in enumerate(gaps):
            if cut and i <= cut[-1]:
                continue
            ov = max(0.0, min(g1, te) - max(g0, ts)); dist = 0.0 if ov > 0 else (ts - g1 if g1 <= ts else g0 - te)
            k = (ov > 0, ov if ov > 0 else -dist, g1 - g0)
            if key is None or k > key:
                key = k; best = (i, dist)
        if best is None:
            return None, {'err': 'no silence left for a line break'}
        cut.append(best[0]); far = max(far, best[1])
    b = [0] + [c + 1 for c in cut] + [len(runs)]
    own = [runs[b[j]:b[j + 1]] for j in range(nhead + len(items) + ntail)]
    headrun = own.pop(0) if nhead else None
    tailrun = own.pop() if ntail else None
    if (nhead and not headrun) or (ntail and not tailrun):
        return None, {'err': 'the extra first or last word has no sound'}
    if any(not o for o in own):
        return None, {'err': 'a line has no sound'}
    out = []; inner = []
    for o, g, it in zip(own, groups, items):
        if len(it['parts']) == 1:
            out.append([(o[0][0], o[-1][1])]); continue
        k = len(it['parts'][0].split())                      # 첫 조각의 낱말 수
        tb = (g[k - 1]['end'] + g[k]['start']) / 2
        cand = [(abs((o[i][1] + o[i + 1][0]) / 2 - tb) - 0.6 * (o[i + 1][0] - o[i][1]), i) for i in range(len(o) - 1)]
        if not cand:
            return None, {'err': 'no pause between word and example: ' + it['parts'][0] + ' (runs %s)' % o}
        _, i = min(cand)
        inner.append(round(o[i + 1][0] - o[i][1], 2))
        out.append([(o[0][0], o[i][1]), (o[i + 1][0], o[-1][1])])
    rate = [sum(q - p for p, q in o) / units(' '.join(it['parts'])) for o, it in zip(own, items)]; med = float(np.median(rate))
    off = max(abs(o[0][0] - g[0]['start']) for o, g in zip(own, groups))
    flat = [sg for o in out for sg in o]                          # 조각마다 자를 창: 앞뒤 여유를 두되 이웃 조각과의 가운데를 넘지 않는다
    win = []
    for i, (a_, b_) in enumerate(flat):
        lo = max(a_ - 0.10, (flat[i - 1][1] + a_) / 2 if i else ((headrun[-1][1] + a_) / 2 if headrun else 0.0))
        nxt = flat[i + 1][0] if i + 1 < len(flat) else (tailrun[0][0] if tailrun else None)
        hi = min(b_ + 0.20, (b_ + nxt) / 2 if nxt is not None else len(x) / SR)
        win.append((lo, hi))
    it_ = iter(win); out = [[next(it_) for _ in o] for o in out]
    return out, {'far': round(far, 2), 'off': round(off, 2), 'rate': [round(r / med, 2) for r in rate], 'inner': inner, 'thr': thr}


def squeeze(x, thr, max_gap=0.45):
    """줄 안의 긴 묵음을 max_gap 으로 줄인다."""
    np = _np()
    db, h = env_db(x); sil = db <= thr
    keep = np.ones(len(x), bool); s = None
    for k, v in enumerate(sil):
        if v and s is None:
            s = k
        if (not v) and s is not None:
            d = (k - s) * h / SR
            if s > 0 and d > max_gap:
                c = int((d - max_gap) * SR); mid = int(((s + k) / 2) * h); keep[mid - c // 2: mid - c // 2 + c] = False
            s = None
    return x[keep]


def polish(x, thr, fo=0.07):
    np = _np()
    x = squeeze(x, thr)
    db, h = env_db(x); act = db[db > db.max() - 25]; rms = 10 * np.log10(np.mean(10 ** (act / 10)))
    y = x * 10 ** ((-19.0 - rms) / 20); p = np.abs(y).max()
    if p > 0.89:
        y = np.tanh(y / 0.89) * 0.89 if p < 1.4 else y * (0.89 / p)
    fi = int(0.012 * SR); fo = int(fo * SR); y[:fi] *= np.linspace(0, 1, fi); y[-fo:] *= np.linspace(1, 0, fo)
    return y


def mp3(x, path):
    np = _np()
    os.makedirs(os.path.dirname(path), exist_ok=True)
    pcm = (np.clip(x, -1, 1) * 32767).astype('<i2').tobytes()
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-', '-c:a', 'libmp3lame', '-b:a', '64k', '-ar', str(SR), path], input=pcm, check=True)


def cmd_cut(raw, force=()):
    os.makedirs(os.path.join(T, 'audio'), exist_ok=True); bad = []; edge = []
    for jf in sorted(glob.glob(os.path.join(T, 'tts', '*_??.json'))):
        j = json.load(open(jf, encoding='utf-8')); job = j['job']; p = os.path.join(raw, job + '.mp3')
        if not os.path.exists(p):
            continue
        done = os.path.join(T, 'audio', job + '.done')
        if job not in force and os.path.exists(done) and os.path.getmtime(done) > os.path.getmtime(p):
            continue
        x = load(p); items = j['items']; wf = os.path.join(raw, job + '.words.json')
        if not os.path.exists(wf):
            bad.append(job); print('!! %s: no alignment file (words.json)' % job); continue
        words = json.load(open(wf, encoding='utf-8'))
        if isinstance(words, dict):
            words = words['words']
        segs, info = split_words(x, words, items, j.get('tail', ''), j.get('head', ''))
        if segs is None:
            bad.append(job); print('!! %s: %s' % (job, info['err'])); continue
        flags = []
        if info['far'] > 0.6: flags.append('a line break is %ss away from its pause' % info['far'])
        if info['off'] > 2.5: flags.append('a line starts %ss away from the reported time' % info['off'])
        if min(info['rate']) < 0.5 or max(info['rate']) > 2.0: flags.append('length off')
        if info['inner'] and min(info['inner']) < 0.15: flags.append('short pause inside a word line (%s)' % min(info['inner']))
        print('%s: %d lines %.1fs rate %s..%s far %s off %s inner %s%s' % (job, len(items), len(x) / SR, min(info['rate']), max(info['rate']), info['far'], info['off'],
                                                                         (min(info['inner']) if info['inner'] else '-'), ('   <-- ' + ', '.join(flags)) if flags else ''))
        if flags:
            bad.append(job)
            for it, sg, r in zip(items, segs, info['rate']):
                print('      %6.2f-%6.2f %4.2f  %s' % (sg[0][0], sg[-1][1], r, ' | '.join(it['parts'])))
        for it, sg in zip(items, segs):
            mp = amap(it['pid']); pre = CAST[it['who']]['pre']
            for text, (lo, hi) in zip(it['parts'], sg):
                rawseg = x[max(0, int(lo * SR)):int(hi * SR)]
                d_, h_ = env_db(rawseg)                                       # 가장자리에서 말소리가 잘렸는지 본다
                if len(d_) > 12 and (d_[:3].max() > d_.max() - 14 or d_[-4:].max() > d_.max() - 14):
                    edge.append('%s %s (%.0f / %.0f dB)' % (job, text, d_[:3].max() - d_.max(), d_[-4:].max() - d_.max()))
                seg = polish(rawseg, info['thr'], 0.02 if hi >= len(x) / SR - 0.02 else 0.07)
                key = it['who'] + '|' + text; ident = mp.get(key)
                if not ident:
                    used = set(mp.values()); i = 1
                    while '%s%02d' % (pre, i) in used:
                        i += 1
                    ident = '%s%02d' % (pre, i)
                mp[key] = ident
                mp3(seg, os.path.join(J, 'audio', it['pid'], ident + '.mp3'))
            json.dump(mp, open(amap_path(it['pid']), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
        open(done, 'w').write('ok')
    for e_ in edge:
        print('  edge?', e_)
    print('NEEDS ATTENTION:', bad if bad else 'none')


# ---------------------------------------------------------------- 그림
def _white(im):
    from PIL import Image
    np = _np()
    a = np.asarray(im.convert('RGB')).copy(); a[a.min(axis=2) >= 244] = 255
    return Image.fromarray(a)


def _bbox(m):
    np = _np()
    ys = np.where(m.any(axis=1))[0]; xs = np.where(m.any(axis=0))[0]
    return (int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1) if len(ys) else None


def _tile(crop, dst, size=384, pad=1.14):
    from PIL import Image
    side = int(max(crop.size) * pad); cv = Image.new('RGB', (side, side), (255, 255, 255))
    cv.paste(crop, ((side - crop.width) // 2, (side - crop.height) // 2))
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    cv.resize((size, size), Image.LANCZOS).save(dst, 'WEBP', quality=80, method=6)


def _cells(ink, rows, cols):
    np = _np()
    H, W = ink.shape

    def cutline(profile, guess, span):
        lo, hi = max(1, guess - span), min(len(profile) - 1, guess + span); seg = profile[lo:hi]
        idx = np.where(seg == seg.min())[0]
        return lo + int(idx[len(idx) // 2])
    ry = [0] + [cutline(ink.sum(axis=1), H * r // rows, H // (rows * 3)) for r in range(1, rows)] + [H]; cells = []
    for r in range(rows):
        prof = ink[ry[r]:ry[r + 1]].sum(axis=0)
        cx = [0] + [cutline(prof, W * c // cols, W // (cols * 3)) for c in range(1, cols)] + [W]
        for c in range(cols):
            cells.append((cx[c], ry[r], cx[c + 1], ry[r + 1]))
    return cells


def cmd_img(raw):
    from PIL import Image
    np = _np()
    for p in have_src():
        L = parse(src_path(p['id'])); base = p['id'].replace('/', '_'); d = os.path.join(J, 'img', p['id'])
        f = os.path.join(raw, base + '_szene.webp')
        if os.path.exists(f):
            im = _white(Image.open(f)); ink = np.asarray(im).min(axis=2) < 238; bb = _bbox(ink)
            w, h = im.size; mx = int(0.04 * w)
            x0 = max(0, bb[0] - mx); x1 = min(w, bb[2] + mx); y0 = max(0, bb[1] - mx); y1 = min(h, bb[3] + mx)
            im = im.crop((x0, y0, x1, y1)); os.makedirs(d, exist_ok=True)
            if im.width > 1200:
                im = im.resize((1200, round(im.height * 1200 / im.width)), Image.LANCZOS)
            im.save(os.path.join(d, 'szene.webp'), 'WEBP', quality=82, method=6)
            json.dump({'w': im.width, 'h': im.height}, open(os.path.join(d, 'szene.json'), 'w'))
            print(p['id'], 'szene', im.size)
        for i, sh in enumerate(card_sheets(L)):
            f = os.path.join(raw, '%s_karten%d.webp' % (base, i + 1))
            if os.path.exists(f):
                im = _white(Image.open(f)); ink = np.asarray(im).min(axis=2) < 236
                for k, (x0, y0, x1, y1) in enumerate(_cells(ink, 2, 3)):
                    bb = _bbox(ink[y0:y1, x0:x1])
                    if not bb:
                        print('!! empty cell', p['id'], i + 1, k + 1); continue
                    _tile(im.crop((x0 + bb[0], y0 + bb[1], x0 + bb[2], y0 + bb[3])), os.path.join(d, 'c%d.webp' % (i * 6 + k + 1)))
                print(p['id'], 'karten', i + 1)
            for k in range(6):                                  # 낱장으로 다시 만든 그림이 있으면 그것을 쓴다
                f1 = os.path.join(raw, '%s_c%d.webp' % (base, i * 6 + k + 1))
                if os.path.exists(f1):
                    im = _white(Image.open(f1)); ink = np.asarray(im).min(axis=2) < 236
                    _tile(im.crop(_bbox(ink)), os.path.join(d, 'c%d.webp' % (i * 6 + k + 1))); print(p['id'], 'single card', i * 6 + k + 1)
        for k in range(1, 13):                                  # 이야기 그림: 한 장씩
            f = os.path.join(raw, '%s_b%d.webp' % (base, k))
            if not os.path.exists(f):
                continue
            im = _white(Image.open(f)); ink = np.asarray(im).min(axis=2) < 236; crop = im.crop(_bbox(ink))
            w_, h_ = crop.size; asp = min(max(w_ / h_, 4 / 3), 2.0)
            cw = int(max(w_, h_ * asp) * 1.08); ch = int(max(h_ * 1.08, cw / asp))
            cv = Image.new('RGB', (cw, ch), (255, 255, 255)); cv.paste(crop, ((cw - w_) // 2, (ch - h_) // 2))
            cv = cv.resize((640, round(ch * 640 / cw)), Image.LANCZOS); os.makedirs(d, exist_ok=True)
            cv.save(os.path.join(d, 'b%d.webp' % k), 'WEBP', quality=82, method=6)
            json.dump({'w': cv.width, 'h': cv.height}, open(os.path.join(d, 'b%d.json' % k), 'w')); print(p['id'], 'story picture', k)
    for n, names in CASTSHEETS:
        f = os.path.join(raw, n + '.webp')
        if os.path.exists(f):
            im = _white(Image.open(f)); ink = np.asarray(im).min(axis=2) < 236
            for nm, (x0, y0, x1, y1) in zip(names, _cells(ink, 1, len(names))):
                bb = _bbox(ink[y0:y1, x0:x1]); crop = im.crop((x0 + bb[0], y0 + bb[1], x0 + bb[2], y0 + bb[3]))
                side = min(crop.width, int(crop.height * 0.86)); cx = crop.width // 2          # 얼굴이 가운데 오게 위쪽 정사각형
                sq = crop.crop((max(0, cx - side // 2), 0, min(crop.width, cx + side // 2), side))
                _tile(sq, os.path.join(J, 'img', 'c', nm + '.webp'), size=160, pad=1.0)
            print('cast', names)


# ---------------------------------------------------------------- 화면 만들기
ICON = {
    'play': '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>',
    'back': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    'home': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/></svg>',
}


class Page:
    """한 과의 화면을 만든다."""

    def __init__(self, p, L, book, draft=False):
        self.p = p; self.L = L; self.pid = p['id']; self.mp = amap(self.pid); self.draft = draft
        self.book = book; self.bk = 'S' if book['id'] == 'studium' else 'B'          # 교재
        self.miss = []; self.exn = 0; self.data = {'id': self.pid, 'w': [], 'dlg': {}}
        self.na = ohne_audio(p['lv']['id']); self.nan = 0     # 음성을 나중에 만드는 단계, 빠진 음성 수
        self.prev = None                                   # 같은 단계의 앞 과
        self.img = '../../../erwachsene/img/%s/' % self.pid

    # ---- 음성 단추
    def a(self, who, text):
        ident = aid(self.mp, self.pid, who, text)
        if not ident and self.p['typ'] != 'lektion':
            ident = sib_audio(self.pid, who, text)
        if not ident:
            if self.na:
                self.nan += 1                               # 음성이 없어도 화면은 연다
            else:
                self.miss.append('%s|%s' % (who, text))
        return ident

    def ton(self, ident, cls='', label='듣기'):
        return '<button type="button" class="ton%s" data-a="%s" aria-label="%s"%s>%s</button>' % ((' ' + cls) if cls else '', ident, E(label), '' if ident else ' disabled', ICON['play'])

    # ---- 문제
    def item(self, it, ctx):
        k = it['k']
        if k == 'text':
            return self.lese(it), False
        if k == 'audio':
            ids = [self.a(l['who'], l['say']) for l in it['lines']]
            rows = ''.join('<p><b>%s</b> <span lang="de">%s</span></p>' % (E(self.wname(l['who'], it.get('names') or {})), hl(l['de'])) for l in it['lines'])
            return ('<div class="hoertext" data-seq="%s">%s<button type="button" class="btn-s" data-act="seq">%s<span>듣기</span></button>'
                    '<details class="skript"><summary>대본 보기</summary>%s</details></div>'
                    % (' '.join(ids), ('<p class="lese-t" lang="de">%s</p>' % E(it['titel'])) if it['titel'] else '', ICON['play'], rows)), False
        ton = ''
        if it.get('hoer'):
            h = it['hoer']; ton = self.ton(self.a(h['who'], h['say']), 'gross', '문제 듣기')
            skript = '<p class="skript1" hidden><span lang="de">%s</span></p>' % hl(h['de'])
        else:
            skript = ''
        why = ('<p class="why" hidden>%s</p>' % ko(it['why'])) if it.get('why') else ''
        if k == 'mc':
            idx = list(range(len(it['opts'])))
            if not it.get('fix'):
                seed(ctx, it['q'], *it['opts']).shuffle(idx)
            opts = ''.join('<button type="button" class="opt" lang="%s">%s</button>' % (mix(it['opts'][i])[1], mix(it['opts'][i])[0]) for i in idx)
            qh, ql = mix(it['q']) if it['q'] else ('', 'ko')
            cls = 'it mc' + (' reihe' if (it.get('rf') or it.get('row')) else '')
            q = ('<p class="q" lang="%s">%s</p>' % (ql, qh)) if it['q'] else ''
            return '<li class="%s" data-k="mc" data-ok="%d">%s%s<div class="opts">%s</div>%s%s</li>' % (cls, idx.index(it['ok']), ton, q, opts, skript, why), True
        if k == 'gap':
            h = ''; typed = False
            for part in it['parts']:
                if isinstance(part, str):
                    h += hl(part)
                elif part['t'] == 'pick':
                    o = list(part['opts']); seed(ctx, *o).shuffle(o)
                    h += '<span class="lk" data-ok="%s">%s</span>' % (E(part['ok']), ''.join('<button type="button" class="opt">%s</button>' % E(x) for x in o))
                else:
                    typed = True; n = max(len(a) for a in part['ans'])
                    h += '<span class="lk in" data-ans="%s"><input type="text" lang="de" size="%d" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="빈칸"></span>' % (E('|'.join(part['ans'])), max(4, n + 1))
            kor = ('<p class="ko">%s</p>' % ko(it['ko'])) if it['ko'] else ''
            btn = '<button type="button" class="pruef">확인</button>' if typed else ''
            return '<li class="it gap" data-k="gap">%s<p class="satz" lang="de">%s</p>%s%s%s</li>' % (ton, h, btn, kor, why), True
        if k == 'ord':
            toks = list(it['alts'][0]); r = seed(ctx, *toks)
            for _ in range(8):
                r.shuffle(toks)
                if all(toks != a for a in it['alts']):
                    break
            ok = '|'.join(' / '.join(a) for a in it['alts'])
            kor = ('<p class="ko">%s</p>' % ko(it['ko'])) if it['ko'] else ''
            return ('<li class="it ord" data-k="ord" data-ok="%s" data-end="%s">%s%s<div class="ziel" lang="de" aria-label="내가 만든 문장"></div><div class="bank" lang="de">%s</div>%s</li>'
                    % (E(ok), E(it['end']), ton, kor, ''.join('<button type="button" class="tok">%s</button>' % E(t) for t in toks), why)), True
        if k == 'paar':
            n = len(it['pairs']); right = list(range(n)); seed(ctx, *[p[1] for p in it['pairs']]).shuffle(right)
            la = ''.join('<button type="button" class="pa" data-p="%d" lang="%s">%s</button>' % (i, mix(p[0])[1], mix(p[0])[0]) for i, p in enumerate(it['pairs']))
            rb = ''.join('<button type="button" class="pb" data-p="%d" lang="%s">%s</button>' % (i, mix(it['pairs'][i][1])[1], mix(it['pairs'][i][1])[0]) for i in right)
            return '<li class="it paar" data-k="paar" data-n="%d"><div class="paare"><div class="sp">%s</div><div class="sp">%s</div></div></li>' % (n, la, rb), True
        if k == 'dik':
            ident = self.a(it['who'], it['say'])
            if self.na and not ident:
                return ('<p class="na-dik"><span class="na-tag">음성 준비 중</span><span lang="de">%s</span>%s</p>'
                        % (hl(it['de']), (' <span class="ko">%s</span>' % ko(it['ko'])) if it['ko'] else '')), False
            return ('<li class="it dik" data-k="dik" data-ok="%s">%s<span class="feld"><input type="text" lang="de" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="들은 문장">'
                    '<button type="button" class="pruef">확인</button></span><p class="loes" hidden><span lang="de">%s</span>%s</p></li>'
                    % (E(it['de']), self.ton(ident, 'gross', '문장 듣기'), hl(it['de']), (' <span class="ko">%s</span>' % ko(it['ko'])) if it['ko'] else '')), True
        raise AssertionError(k)

    def lese(self, it):
        art = it['art']; t = ('<p class="lese-t" lang="de">%s</p>' % E(it['titel'])) if it['titel'] else ''
        if art == 'chat':
            names = []; rows = ''
            for r in it['rows']:
                who, _, txt = r.partition(': ')
                if who not in names:
                    names.append(who)
                rows += '<div class="blase%s"><b>%s</b><p>%s</p></div>' % (' ich' if names.index(who) % 2 else '', E(who), hl(txt))
            return '<div class="lese chat" lang="de">%s%s</div>' % (t, rows)
        if art == 'profil':
            rows = ''.join('<div><dt>%s</dt><dd>%s</dd></div>' % (E(r.partition(': ')[0]), hl(r.partition(': ')[2])) for r in it['rows'])
            return '<div class="lese profil" lang="de">%s<dl>%s</dl></div>' % (t, rows)
        if art == 'plan':
            trs = ''
            for i, r in enumerate(it['rows']):
                cells = [c.strip() for c in r.strip('|').split('|')]
                trs += '<tr>%s</tr>' % ''.join(('<th scope="%s">%s</th>' % ('col' if i == 0 else 'row', hl(c))) if (i == 0 or j == 0) else '<td>%s</td>' % hl(c) for j, c in enumerate(cells))
            return '<div class="lese plan" lang="de">%s<div class="scroll"><table>%s</table></div></div>' % (t, trs)
        if art == 'formular':
            rows = ''.join('<div><dt>%s</dt><dd>%s</dd></div>' % (E(r.partition(': ')[0]), hl(r.partition(': ')[2]) or '&nbsp;') for r in it['rows'])
            return '<div class="lese formular" lang="de">%s<dl>%s</dl></div>' % (t, rows)
        if art == 'mail':
            kopf = [r for r in it['rows'] if re.match(r'^(Von|An|Betreff|Datum): ', r)]; rest = [r for r in it['rows'] if r not in kopf]
            kh = ''.join('<div><dt>%s</dt><dd>%s</dd></div>' % (E(r.partition(': ')[0]), hl(r.partition(': ')[2])) for r in kopf)
            return '<div class="lese mail" lang="de">%s<dl>%s</dl><div class="mail-t">%s</div></div>' % (t, kh, ''.join('<p>%s</p>' % hl(r) for r in rest))
        if art == 'karte':
            rows = ''.join('<p%s>%s</p>' % (' class="k1"' if i == 0 else '', hl(r)) for i, r in enumerate(it['rows']))
            return '<div class="lese karte-v" lang="de">%s<div class="kv">%s</div></div>' % (t, rows)
        return '<div class="lese %s" lang="de">%s%s</div>' % (E(art), t, ''.join('<p>%s</p>' % hl(r) for r in it['rows']))

    def ex(self, rubrik, inst, parts, ctx, cls='ex'):
        self.exn += 1
        first = json.dumps(parts[:2], ensure_ascii=False, sort_keys=True)
        xid = hid('x', self.pid, ctx, rubrik, inst, first)
        body = ''; cur = ''; n = 0
        for it in parts:
            h, counted = self.item(it, xid)
            if counted:
                cur += h; n += 1
            else:
                if cur:
                    body += '<ol class="items">%s</ol>' % cur; cur = ''
                body += h
        if cur:
            body += '<ol class="items">%s</ol>' % cur
        head = '<header class="ex-kopf">%s<p class="inst">%s</p><span class="stand" aria-live="polite"></span></header>' % (('<span class="rub" lang="de">%s</span>' % E(rubrik)) if rubrik else '', ko(inst))
        return '<article class="%s" data-ex="%s" data-n="%d">%s%s<p class="ex-fuss"><button type="button" class="link" data-act="neu" hidden>다시 풀기</button></p></article>' % (cls, xid, n, head, body)

    def wname(self, who, names):
        return names.get(who) or CAST[who]['name']

    def avatar(self, who):
        av = CAST[who]['av']
        if av and os.path.exists(os.path.join(J, 'img', 'c', av + '.webp')):
            return '<span class="av"><img src="../../../erwachsene/img/c/%s.webp" alt="" width="68" height="68" loading="lazy"></span>' % av
        return '<span class="av av-t" aria-hidden="true">%s</span>' % E((CAST[who]['name'] or '?')[:1])

    # ---- 구역
    def s_einstieg(self, b):
        p = self.p; h = ''
        sz = os.path.join(J, 'img', self.pid, 'szene.webp')
        if os.path.exists(sz):
            dim = json.load(open(os.path.join(J, 'img', self.pid, 'szene.json')))
            h += '<figure class="szene"><img src="%sszene.webp" alt="%s" width="%d" height="%d"></figure>' % (self.img, E(b.get('alt', '')), dim['w'], dim['h'])
        else:
            self.miss.append('img szene')
        h += '<p class="lead">%s</p>' % ko(b['lead'])
        ziele = ''.join('<li>%s</li>' % ko(z.strip()) for z in p['ziel'].split(','))
        auf = p['auf'][self.bk]
        h += ('<div class="ziele"><h3>이 과에서 해낼 일</h3><ul class="zl">%s</ul><p class="zg"><b>문법</b> <span lang="de">%s</span></p>%s<p class="mission">%s</p></div>'
              % (ziele, E(p['gr']), ('<p class="zg auftrag"><b>과제</b> %s</p>' % ko(auf)) if auf else '', ko(b['mission'])))
        if b['worte']:
            chips = ''
            for w in b['worte']:
                a = self.a('N', w['say'])
                chips += '<button type="button" class="wchip" data-a="%s"%s><b lang="de">%s</b><span>%s</span></button>' % (a, '' if a else ' disabled', hl(w['de']), ko(w['ko']))
            h += '<div class="worte"><p class="klein">이 과에서 쓸 말이에요. 눌러서 먼저 들어 보세요.</p><div class="wchips">%s</div></div>' % chips
        if b['items']:
            h += self.ex('', '배우기 전에 먼저 해 보세요. 틀려도 괜찮아요.', b['items'], 'einstieg', 'ex leicht')
        if self.prev:
            pw = []
            for blk in self.prev[1]['secs'].get('wortschatz', []):
                if blk['t'] == 'gruppe':
                    for w in blk['items']:
                        art, head, pl, spoken = lemma_info(w['lemma']); pw.append({'d': head, 'k': w['ko'], 'a': '', 'g': art})
            if len(pw) >= 4:
                self.data['pw'] = pw
                h += ('<div class="quiz klein-q" data-quiz="pw"><h3>지난 과 낱말</h3><p class="klein"><span lang="de">Lektion %d</span>의 낱말 다섯 개를 다시 떠올려 보세요.</p>'
                      '<button type="button" class="btn hell" data-act="quiz">복습하기</button><div class="quiz-feld" hidden></div></div>' % self.prev[0]['nr'])
        return h

    def s_hoeren(self, blocks):
        h = ''
        for b in blocks:
            if b['t'] == 'dialog':
                rows = ''; data = []
                for l in b['lines']:
                    ident = self.a(l['who'], l['say']); nm = self.wname(l['who'], b['names'])
                    rows += ('<li><button type="button" class="z" data-a="%s"%s>%s<span class="zt"><b class="wer">%s</b><span class="zd" lang="de">%s</span><span class="zk">%s</span></span></button></li>'
                             % (ident, '' if ident else ' disabled', self.avatar(l['who']), E(nm), hl(l['de']), ko(l['ko'])))
                    data.append([l['who'], nm, ident, plain(l['de']), l['ko']])
                self.data['dlg'][b['key']] = data
                h += ('<article class="dlg" data-dlg="%s"><header><h3 lang="de"><span class="dk">%s</span>%s</h3>%s%s'
                      '<div class="dlg-bar"><button type="button" class="btn-s" data-act="dlg-play">%s<span>전체 듣기</span></button>'
                      '<button type="button" class="chip" data-act="dlg-ko" aria-pressed="false">한국어 뜻</button>'
                      '<button type="button" class="chip" data-act="dlg-slow" aria-pressed="false">천천히</button></div></header><ol class="zeilen">%s</ol></article>'
                      % (E(b['key']), E(b['key']), E(b['titel']), ('<p class="ort">%s</p>' % ko(b['ort'])) if b['ort'] else '',
                         ('<p class="vor">%s</p>' % ko(b['vor'])) if b['vor'] else '', ICON['play'], rows))
            elif b['t'] == 'fragen':
                h += self.ex('Verstehen', b['inst'] or '대화를 듣고 답하세요.', b['items'], 'fragen')
            elif b['t'] == 'kultur':
                h += self.box('Leben in Deutschland', b['titel'], ''.join('<p>%s</p>' % ko(x) for x in b['p']) + (self.ex('', '확인해 보세요.', b['items'], 'kultur', 'ex leicht') if b['items'] else ''), 'kultur')
        return h

    def tafel(self, b):
        rows = ''
        for r in b['rows']:
            a = self.a('N', r['say']); cells = ''; phr = False; wort = False
            for c in r['cells']:
                if ' = ' in c:
                    hd, _, rest = c.partition(' = ')
                elif re.match(r'\d', c):
                    hd, _, rest = c.partition(' ')           # 숫자와 읽는 법
                else:
                    hd, rest = c, ''; phr = True             # 뜻 없이 적은 표현은 통째로 한 칸
                wort = wort or not re.match(r'\d', hd)
                cells += '<span class="zc"><b>%s</b>%s</span>' % (E(hd), ('<i>%s</i>' % E(rest)) if rest else '')
            cls = ' phr' if phr else (' w' if wort else '')   # w: 낱말 줄, phr: 표현 줄, 없음: 숫자 줄
            rows += '<li><button type="button" class="tz%s" data-a="%s"%s lang="de">%s</button></li>' % (cls, a, '' if a else ' disabled', cells)
        return ('<article class="gp tafel"><h3><span lang="de">%s</span><small>%s</small></h3>%s<ul class="tafelliste">%s</ul></article>'
                % (E(b['titel']), ko(b['sub']), ''.join('<p>%s</p>' % ko(x) for x in b['p']), rows))

    def box(self, label, titel, body, cls):
        return '<aside class="box %s"><p class="box-l" lang="de">%s</p><h3>%s</h3>%s</aside>' % (cls, E(label), ko(titel), body)

    def s_wortschatz(self, blocks):
        h = ''; pics = {}; n = 0
        for b in blocks:
            if b['t'] == 'bilder':
                for i, (k, _) in enumerate(b['map']):
                    pics[k] = 'c%d' % (len(pics) + 1)
        for b in blocks:
            if b['t'] == 'gruppe':
                rows = ''
                for w in b['items']:
                    art, head, pl, spoken = lemma_info(w['lemma']); a1 = self.a('N', spoken); a2 = self.a('N', w['bsay'])
                    if art in ('der', 'die', 'das'):
                        hd = '<span class="a-%s">%s</span> %s' % (art, art, E(head[4:]))
                    else:
                        hd = E(head)
                    note = re.search(r'\(([^)]*)\)', w['lemma'])
                    pic = ''
                    if w['lemma'] in pics:
                        f = pics[w['lemma']]
                        if os.path.exists(os.path.join(J, 'img', self.pid, f + '.webp')):
                            pic = '<span class="w-bild"><img src="%s%s.webp" alt="" width="128" height="128" loading="lazy"></span>' % (self.img, f)
                        else:
                            self.miss.append('img ' + f)
                    rows += ('<li class="w%s">%s<div class="w-in"><p class="w-kopf">%s<span class="w-t"><b lang="de">%s%s%s</b> <span class="w-ko">%s</span></span></p>'
                             '<p class="w-bsp">%s<span lang="de">%s</span><span class="ko">%s</span></p></div></li>'
                             % ((' art-' + art) if art else '', pic, self.ton(a1, '', w['lemma'] + ' 듣기'), hd, ('<span class="pl">%s</span>' % E(pl)) if pl else '',
                                (' <span class="pl">(%s)</span>' % E(note.group(1))) if note else '', ko(w['ko']), self.ton(a2, 'klein', '예문 듣기'), hl(w['bsp']), ko(w['bspko'])))
                    self.data['w'].append({'d': head, 'k': w['ko'], 'a': a1, 'g': art}); n += 1
                h += '<section class="gruppe"><h3><span lang="de">%s</span><small>%s</small></h3><ul class="woerter">%s</ul></section>' % (E(b['de']), ko(b['ko']), rows)
        h = ('<p class="hinweis">낱말 %d개예요. 낱말이나 예문 앞의 단추를 누르면 소리가 나요. 명사는 <span class="a-der">der</span>, <span class="a-die">die</span>, <span class="a-das">das</span>를 색으로 구분했어요.</p>' % n) + h
        h += '<div class="quiz" id="quiz" data-quiz="w"><h3>단어 확인</h3><p class="klein">이 과의 낱말로 여덟 문제를 풀어요.</p><button type="button" class="btn" data-act="quiz">시작하기</button><div class="quiz-feld" hidden></div></div>'
        for b in blocks:
            if b['t'] == 'tafel':
                h += self.tafel(b)
            elif b['t'] == 'aussprache':
                rows = ''
                for x in b['hoer']:
                    a = self.a('N', x['say'])
                    rows += '<li><button type="button" class="hz" data-a="%s"%s>%s<span lang="de">%s</span>%s</button></li>' % (a, '' if a else ' disabled', ICON['play'], hl(x['de']), ('<small>%s</small>' % ko(x['label'])) if x['label'] else '')
                h += self.box('Aussprache', b['titel'], (('<p class="box-sub">%s</p>' % ko(b['sub'])) if b['sub'] else '') + ''.join('<p>%s</p>' % ko(x) for x in b['p']) + '<ul class="hoerliste">%s</ul>' % rows, 'aussprache')
            elif b['t'] == 'tipp':
                h += self.box('Lerntipp', b['titel'], ''.join('<p>%s</p>' % ko(x) for x in b['p']), 'tipp')
        return h

    def s_grammatik(self, blocks):
        h = ''
        for b in blocks:
            if b['t'] == 'punkt':
                bsp = ''
                for de_, ko_ in b['bsp']:
                    a = any_voice(self.mp, self.pid, plain(de_))
                    bsp += '<li>%s<span lang="de">%s</span><span class="ko">%s</span></li>' % (self.ton(a, 'klein') if a else '<span class="punkt" aria-hidden="true"></span>', hl(de_), ko(ko_))
                finde = self.ex('', '규칙을 보고 바로 확인해 보세요.', [b['finde']], 'finde' + b['de'], 'ex finde') if b['finde'] else ''
                tab = ''
                if b['tab']:
                    head = b['tab'][0]; trs = '<tr>%s</tr>' % ''.join('<th scope="col">%s</th>' % mix(c)[0] for c in head)
                    for r in b['tab'][1:]:
                        kz = lambda j, c: ' class="kz"' if j == 0 and len(plain(c)) <= 9 else ''     # 짧은 첫 칸은 줄을 바꾸지 않는다
                        trs += '<tr>%s</tr>' % ''.join(('<th scope="row" lang="%s"%s>%s</th>' % (mix(c)[1], kz(j, c), mix(c)[0])) if j == 0 and not head[0]
                                                       else '<td lang="%s"%s>%s</td>' % (mix(c)[1], kz(j, c), mix(c)[0]) for j, c in enumerate(r))
                    tab = '<div class="scroll"><table class="gt">%s</table></div>' % trs
                # 성인 교재는 규칙과 표를 바로 보여 주고, 그 뒤에 확인 물음을 둔다
                h += ('<article class="gp"><h3><span lang="de">%s</span><small>%s</small></h3><ul class="bsp">%s</ul><div class="regel"><p class="regel-l">규칙</p><p>%s</p>%s%s</div>%s</article>'
                      % (E(b['de']), ko(b['ko']), bsp, ko(b['regel']), tab, ('<p class="merke"><b>주의</b> %s</p>' % ko(b['merke'])) if b['merke'] else '', finde))
            elif b['t'] == 'tafel':
                h += self.tafel(b)
            elif b['t'] == 'alphabet':
                rows = ''
                for letters, say, kor in ALPHABET:
                    a = self.a('N', say)
                    rows += '<li><button type="button" class="abc" data-a="%s"%s><b lang="de">%s</b><small>%s</small></button></li>' % (a, '' if a else ' disabled', E(letters), E(kor))
                h += '<article class="gp"><h3><span lang="de">Das Alphabet</span><small>글자 이름</small></h3>%s<ul class="abcliste">%s</ul></article>' % (''.join('<p>%s</p>' % ko(x) for x in b['p'][:1]), rows) \
                     + ''.join('<p class="nach">%s</p>' % ko(x) for x in b['p'][1:])
        return h

    def s_training(self, blocks):
        return ''.join(self.ex(b['rubrik'], b['inst'], b['parts'], 'training') for b in blocks if b['t'] == 'ex') + self.mehr()

    def mehr(self):
        """Mehr üben: 이 과의 문법을 다루는 Syntalab Lektion 과 Vokalab 으로 가는 링크"""
        syn = self.p.get('syn') or []
        if not syn:
            return ''
        links = ''.join('<a href="../../../grammatik/#/L%02d" lang="de">Syntalab Lektion %02d</a>' % (n, n) for n in syn)
        links += '<a href="../../../vokalab/" lang="de">Vokalab</a>'
        return self.box('Mehr üben', '이어서 연습해요', '<p>이 과의 문법은 Syntalab에서 더 자세히 볼 수 있어요. 낱말은 Vokalab에서 이어서 익혀요.</p><p class="mehr-l">%s</p>' % links, 'mehr')

    def s_sprechen(self, blocks):
        h = ''
        for b in blocks:
            t = b['t']
            if t == 'redemittel':
                rows = ''
                for label, pairs in b['rows']:
                    rows += '<div class="rm"><dt>%s</dt><dd>%s</dd></div>' % (ko(label), ''.join('<p><span lang="de">%s</span>%s</p>' % (hl(x[0]), (' <span class="ko">%s</span>' % ko(x[1])) if len(x) > 1 else '') for x in pairs))
                h += '<section class="teilb"><h3><span lang="de">Redemittel</span><small>이 과의 표현</small></h3><dl class="rml">%s</dl></section>' % rows
            elif t == 'rolle':
                nm = next((d_['names'] for d_ in self.L['secs'].get('hoeren', []) if d_['t'] == 'dialog' and d_['key'] == b['dialog']), {})
                chips = ''.join('<button type="button" class="chip" data-rolle="%s" aria-pressed="false">%s</button>' % (E(r), E(nm.get(r) or CAST[r]['name'])) for r in b['roles'])
                self.data['rolle'] = {'dlg': b['dialog'], 'roles': b['roles']}
                h += ('<section class="teilb rolle" data-dlg="%s"><h3><span lang="de">Rollenspiel</span><small>역할을 맡아 말해요</small></h3>'
                      '<p>대화 %s에서 역할을 하나 고르세요. 상대의 말은 음성으로 나오고, 내 차례에는 직접 말해요.</p><div class="rolle-wahl">%s</div><div class="rolle-feld" hidden></div></section>'
                      % (E(b['dialog']), E(b['dialog']), chips))
            elif t == 'ich':
                fl = ''.join('<label class="fl"><span>%s</span><input type="text" lang="de" data-f="%s" placeholder="%s" maxlength="40" autocomplete="off" autocapitalize="words" spellcheck="false"></label>' % (ko(f['label']), E(f['k']), E(f['ph'])) for f in b['felder'])
                ph = {f['k']: f['ph'] for f in b['felder']}
                st = ''.join('<p lang="de">%s</p>' % re.sub(r'\{(\w+)\}', lambda m: '<span class="slot" data-s="%s" data-ph="%s">%s</span>' % (m.group(1), E(ph.get(m.group(1), '…')), E(ph.get(m.group(1), '…'))), E(s)) for s in b['saetze'])
                h += ('<section class="teilb ich" data-ich="%s"><h3><span lang="de">Ich</span><small>%s</small></h3><p>%s</p><div class="fls">%s</div><div class="ichtext">%s</div><div class="rec" data-rec></div></section>'
                      % (hid('i', self.pid, b['titel']), ko(b['titel']), ko(b['inst']), fl, st))
            elif t == 'schreiben':
                pk = ''.join('<li>%s</li>' % ko(x) for x in b['punkt']); ck = ''.join('<li><label><input type="checkbox"><span>%s</span></label></li>' % ko(x) for x in b['check'])
                h += ('<section class="teilb schreib" data-schreib="%s"><h3><span lang="de">Schreiben</span><small>짧은 글 쓰기</small></h3><p class="auf-t" lang="de">%s</p><p>%s</p>'
                      '<ul class="punkte">%s</ul><textarea lang="de" rows="5" placeholder="%s" autocomplete="off" autocapitalize="sentences" spellcheck="false" aria-label="내가 쓴 글"></textarea>'
                      '<div class="schreib-bar"><span class="gespeichert" aria-live="polite"></span><button type="button" class="chip" data-act="kopie">글 복사</button></div>'
                      '<details class="muster"><summary>예시 글 보기</summary><p lang="de">%s</p></details><div class="selbst"><p class="klein">다 쓴 뒤에 확인해 보세요.</p><ul class="checks">%s</ul></div></section>'
                      % (hid('s', self.pid, b['titel']), E(b['titel']), ko(b['aufgabe']), pk, E(b.get('start') or 'Hallo! …'), hl(b['muster']), ck))
            elif t == 'kann':
                rows = ''.join('<li><p><span lang="de">%s</span><span class="ko">%s</span></p><div class="stufe" role="group" aria-label="%s">'
                               '<button type="button" data-v="1" aria-pressed="false">아직 어려워요</button><button type="button" data-v="2" aria-pressed="false">조금 해요</button><button type="button" data-v="3" aria-pressed="false">잘해요</button></div></li>'
                               % (hl(de_), ko(ko_), E(ko_)) for de_, ko_ in b['items'])
                h += '<section class="teilb kann"><h3><span lang="de">Das kann ich jetzt</span><small>스스로 확인해요</small></h3><ul class="kannliste">%s</ul></section>' % rows
            elif t == 'tipp':
                h += self.box('Lerntipp', b['titel'], ''.join('<p>%s</p>' % ko(x) for x in b['p']), 'tipp')
        return h

    def lek(self, n):
        return next(x for x in pages() if x['lv']['id'] == self.p['lv']['id'] and x['typ'] == 'lektion' and x['nr'] == n)

    def lek_words(self):
        out = []
        for n in self.L.get('lektionen', '').split():
            q = self.lek(int(n)); M = parse(src_path(q['id'])); mp = amap(q['id'])
            for b in M['secs'].get('wortschatz', []):
                if b['t'] == 'gruppe':
                    for w in b['items']:
                        art, head, pl, spoken = lemma_info(w['lemma']); ident = aid(mp, q['id'], 'N', spoken)
                        out.append({'d': head, 'k': w['ko'], 'a': ('../%s/%s' % (q['slug'], ident)) if ident else '', 'g': art})
        return out

    def s_mix(self, blocks, ctx):
        """Station 과 평가의 구역: 블록을 적힌 순서대로 놓는다."""
        h = ''
        for b in blocks:
            t = b['t']
            if t == 'info' and ctx == 'sprechen' and self.p['typ'] == 'lektion':
                # 과제 순서의 쪽지: 과제에 필요한 정보를 종이 쪽지 모양으로 보여 준다
                h += '<section class="teilb zettel">%s%s</section>' % (('<h3><span>%s</span></h3>' % ko(b['titel'])) if b['titel'] else '', ''.join('<p>%s</p>' % ko(x) for x in b['p']))
            elif t == 'info':
                h += '<div class="intro">%s%s</div>' % (('<h3>%s</h3>' % ko(b['titel'])) if b['titel'] else '', ''.join('<p>%s</p>' % ko(x) for x in b['p']))
            elif t in ('ex', 'teil'):
                h += self.ex(b['rubrik'], b['inst'], b['parts'], ctx)
            elif t == 'fortschritt':
                ns = [int(n) for n in self.L.get('lektionen', '').split()]; rows = ''
                for n in ns:
                    q = self.lek(n)
                    rows += ('<li data-id="%s"><a href="../%s/"><span class="fo-n" lang="de">Lektion %d</span><b lang="de">%s</b><small>%s</small><span class="fo-s"></span></a></li>'
                             % (q['id'], q['slug'], q['nr'], E(q['de']), ko(q['ko'])))
                h += ('<section class="teilb fort"><h3><span lang="de">Lektion %d–%d</span><small>공부한 과</small></h3><p>과 이름을 누르면 그 과로 가요.</p><ul class="fortliste">%s</ul></section>'
                      % (ns[0], ns[-1], rows))
            elif t == 'quiz':
                self.data['w'] = self.lek_words()
                h += ('<div class="quiz" id="quiz" data-quiz="w"><h3>%s</h3><p class="klein">%s</p><button type="button" class="btn" data-act="quiz">시작하기</button><div class="quiz-feld" hidden></div></div>'
                      % (ko(b['titel']), ko(b['sub'] or '배운 낱말로 여덟 문제를 풀어요.')))
            elif t == 'projekt':
                ph = {f['k']: f['ph'] for f in b['felder']}
                slot = lambda x: re.sub(r'\{(\w+)\}', lambda m: '<span class="slot" data-s="%s" data-ph="%s">%s</span>' % (m.group(1), E(ph.get(m.group(1), '…')), E(ph.get(m.group(1), '…'))), E(x))
                fl = ''.join('<label class="fl"><span>%s</span><input type="text" lang="de" data-f="%s" placeholder="%s" maxlength="48" autocomplete="off" autocapitalize="off" spellcheck="false"></label>'
                             % (ko(f['label']), E(f['k']), E(f['ph'])) for f in b['felder'])
                karte = ''.join('<div><dt>%s</dt><dd>%s</dd></div>' % (E(lab), slot(val)) for lab, val in b['karte'])
                st = ''.join('<p lang="de">%s</p>' % slot(x) for x in b['saetze'])
                ck = ''.join('<li><label><input type="checkbox"><span>%s</span></label></li>' % ko(x) for x in b['check'])
                pid_ = hid('i', self.pid, b['titel'])
                h += ('<section class="teilb ich projekt" data-ich="%s"><h3><span lang="de">%s</span><small>%s</small></h3>%s<div class="fls">%s</div>'
                      '%s<h4>소리 내어 말해요</h4><p class="klein">%s</p>%s<div class="rec" data-rec></div>%s</section>'
                      % (pid_, E(b['titel']), ko(b['inst']), ''.join('<p>%s</p>' % ko(x) for x in b['p']), fl,
                         ('<div class="karte%s" lang="de"><p class="karte-t">%s</p><dl>%s</dl></div>' % (' kurz' if max(len(x[0]) for x in b['karte']) <= 7 else '', E(b['kt']), karte)) if karte else '',
                         '아래 글을 소리 내어 읽고, 익숙해지면 보지 않고 말해 보세요.' if st else '완성된 문장을 소리 내어 읽고, 익숙해지면 보지 않고 말해 보세요.',
                         ('<div class="ichtext">%s</div>' % st) if st else '',
                         ('<div class="selbst" data-checks="%s"><p class="klein">다 한 뒤에 확인해 보세요.</p><ul class="checks">%s</ul></div>' % (pid_, ck)) if ck else ''))
            elif t == 'sprich':
                rows = ''
                for q in b['fragen']:
                    ident = self.a(q['who'], q['say'])
                    rows += ('<li class="sp"><div class="sp-kopf">%s<b class="wer">%s</b></div><details class="sp-t"><summary>질문을 글로 보기</summary><p><span lang="de">%s</span>%s</p></details>'
                             '<div class="rec" data-rec></div><details class="muster"><summary>예시 답 보기</summary><p lang="de">%s</p></details></li>'
                             % (self.ton(ident, 'gross', '질문 듣기'), E(self.wname(q['who'], b['names'])), hl(q['de']), (' <span class="ko">%s</span>' % ko(q['ko'])) if q['ko'] else '', hl(q['muster'])))
                thema = ''
                if b['thema']:
                    thema = ('<ul class="stich" lang="de">%s</ul><div class="rec" data-rec></div>%s'
                             % (''.join('<li>%s</li>' % E(x) for x in b['thema']), ('<details class="muster"><summary>예시 보기</summary><p lang="de">%s</p></details>' % hl(b['muster'])) if b['muster'] else ''))
                h += ('<section class="teilb sprich"><h3><span lang="de">%s</span></h3><p>%s</p>%s%s</section>'
                      % (E(b['titel']), ko(b['inst']), ('<ol class="spliste">%s</ol>' % rows) if rows else '', thema))
            elif t == 'story':
                rows = ''
                for k, bd in enumerate(b['bilder']):
                    pic = ''
                    if bd['bild'].startswith('='):                          # 다른 과의 그림을 빌려 쓴다
                        pid2, name = bd['bild'][1:].split(); f = os.path.join(J, 'img', pid2, name); src = '../../../erwachsene/img/%s/%s.webp' % (pid2, name)
                    else:
                        f = os.path.join(J, 'img', self.pid, 'b%d' % (k + 1)); src = '%sb%d.webp' % (self.img, k + 1)
                    if os.path.exists(f + '.webp'):
                        dim = json.load(open(f + '.json')) if os.path.exists(f + '.json') else {'w': 384, 'h': 384}
                        pic = '<figure%s><img src="%s" alt="%s" width="%d" height="%d" loading="lazy"></figure>' % (' class="karte-bild"' if dim['w'] == dim['h'] else '', src, E(bd['alt']), dim['w'], dim['h'])
                    else:
                        self.miss.append('img ' + os.path.relpath(f, os.path.join(J, 'img')))
                    zs = ''
                    for l in bd['lines']:
                        ident = self.a(l['who'], l['say'])
                        zs += ('<button type="button" class="bz" data-a="%s"%s><span class="bd" lang="de">%s</span><span class="bk">%s</span></button>'
                               % (ident, '' if ident else ' disabled', hl(l['de']), ko(l['ko'])))
                    rows += '<li>%s<div class="b-text"><p class="b-n" lang="de">Bild %d</p>%s</div></li>' % (pic, k + 1, zs)
                h += ('<section class="teilb story"><h3><span lang="de">%s</span></h3><p>%s</p><div class="dlg-bar"><button type="button" class="btn-s" data-act="story-play">%s<span>전체 듣기</span></button></div>'
                      '<ol class="bilder">%s</ol></section>' % (E(b['titel']), ko(b['inst']), ICON['play'], rows))
            elif t == 'bilanz':
                self.data['bil'] = {'hoch': b['hoch'], 'mittel': b['mittel'], 'tief': b['tief']}
                h += ('<section class="teilb bilanz" data-bilanz><h3><span lang="de">Ergebnis</span><small>자동으로 채점한 문제</small></h3>'
                      '<div class="bil-feld"><p class="klein">문제를 풀면 여기에 결과가 나와요.</p></div></section>')
            elif t in ('dialog', 'fragen', 'kultur'):
                h += self.s_hoeren([b])
            else:
                h += self.s_sprechen([b])
        return h

    def render(self, tpl, nav):
        p = self.p; L = self.L; lv = p['lv']; body = ''; steps = ''; typ = p['typ']; STEPS = steps_of(typ); book = self.book
        secs = {k_: [b_ for b_ in v_ if b_.get('nur', '') in ('', self.bk)] for k_, v_ in L['secs'].items()}          # 다른 교재의 과제 블록은 뺀다
        if typ == 'lektion':
            fn = {'einstieg': lambda: self.s_einstieg(secs['einstieg'][0]), 'hoeren': lambda: self.s_hoeren(secs['hoeren']), 'wortschatz': lambda: self.s_wortschatz(secs['wortschatz']),
                  'grammatik': lambda: self.s_grammatik(secs['grammatik']), 'training': lambda: self.s_training(secs['training']), 'sprechen': lambda: self.s_mix(secs['sprechen'], 'sprechen')}
        else:
            fn = {k_: (lambda k_=k_: self.s_mix(secs.get(k_, []), k_)) for k_, _, _ in STEPS}
        for i, (key, de_, ko_) in enumerate(STEPS):
            sid = SID.get(key, key) if typ == 'lektion' else key
            steps += '<a class="st" href="#%s" data-i="%d" style="--i:%d" aria-label="%d %s, %s"><b>%d</b></a>' % (sid, i, i, i + 1, E(de_), E(ko_), i + 1)
            body += ('<section class="teil" id="%s" data-i="%d" aria-labelledby="h-%s"><h2 id="h-%s"><span class="nr">%d</span><span lang="de">%s</span><small>%s</small></h2>%s%s</section>\n'
                     % (sid, i, sid, sid, i + 1, E(de_), E(ko_), fn[key](), '__ENDE__' if i == len(STEPS) - 1 else ''))
        prev, nxt = nav
        wort = {'lektion': ('이 과를 끝까지 봤어요.', '이 과 마치기', '이 과를 마친 것으로 기록했어요.', '마친 과예요'),
                'station': ('복습을 끝까지 했어요.', '복습 마치기', '복습을 마친 것으로 기록했어요.', '마친 복습이에요'),
                'test': ('평가를 끝까지 했어요.', '평가 마치기', '평가를 마친 것으로 기록했어요.', '마친 평가예요')}[typ]
        nxt_a = ''
        if nxt and nxt['lv']['id'] == lv['id']:
            nxt_a = '<a class="btn hell" href="../%s/"><span>다음</span> <span lang="de">%s</span></a>' % (nxt['slug'], E(nxt['de']))
        elif nxt:
            nxt_a = '<a class="btn hell" href="../../%s/%s/"><span>다음</span> <span lang="de">%s · %s</span></a>' % (nxt['lv']['hid'], nxt['slug'], E(nxt['lv']['code']), E(nxt['de']))
        ende = '<div class="ende" id="ende"><p class="ende-t">%s</p><button type="button" class="btn" data-act="fertig" data-msg="%s" data-done="%s">%s</button>%s<a class="link" href="../../#%s">목차로 가기</a></div>' % (
            wort[0], wort[2], wort[3], wort[1], nxt_a, lv['hid'])
        mark = book['mark']; wem = '대학생' if self.bk == 'S' else '직장인과 성인'
        if typ == 'lektion':
            title = 'Lektion %d %s · %s | %s %s' % (p['nr'], p['de'], p['ko'], mark, lv['code'])
            desc = '%s을 위한 독일어 교재 「%s」 %s %d과 %s(%s). %s. 독일어 음성으로 듣는 대화, 낱말, 문법(%s), 읽기와 연습, 과제. 소피아 독일어학원.' % (wem, book['titel'], lv['code'], p['nr'], p['de'], p['ko'], p['ziel'], p['gr'])
            ort = '<span lang="de">%s %s</span> · <span lang="de">Lektion %d</span>' % (E(lv['code']), E(lv['de']), p['nr']); h1 = p['de']; thema = p['ko']
        elif typ == 'station':
            ns = L.get('lektionen', '').split()
            title = '%s · %s | %s %s' % (p['de'], p['ko'], mark, lv['code'])
            desc = '%s을 위한 독일어 교재 「%s」 %s %s. Lektion %s–%s에서 배운 것을 복습하고 실전 과제를 해요. %s 소피아 독일어학원.' % (wem, book['titel'], lv['code'], p['de'], ns[0], ns[-1], p['ziel'])
            ort = '<span lang="de">%s %s</span> · <span lang="de">%s</span>' % (E(lv['code']), E(lv['de']), E(p['de'])); h1 = p['de']; thema = p['ziel']
        else:
            title = '%s · %s | %s' % (p['de'], p['ko'], mark)
            desc = '%s을 위한 독일어 교재 「%s」 %s %s. %s 문제를 풀면 바로 채점되고, 약한 부분을 알려 줘요. 소피아 독일어학원.' % (wem, book['titel'], lv['code'], p['ko'], p['ziel'])
            ort = '<span lang="de">%s %s</span> · %s' % (E(lv['code']), E(lv['de']), E(p['ko'])); h1 = p['de']; thema = p['ziel']
        url = SITE + '%s/%s/%s/' % (book['id'], lv['hid'], p['slug'])
        hinweis = ''
        if self.na and self.nan:
            # 여러 음성을 이어 트는 단추는 끄고, 듣고 푸는 자리에는 글을 보여 준다
            for act in ('dlg-play', 'dlg-slow', 'story-play', 'seq'):
                body = body.replace('data-act="%s"' % act, 'data-act="%s" disabled' % act)
            body = body.replace('<details class="skript">', '<details class="skript" open>').replace('<details class="sp-t">', '<details class="sp-t" open>')
            body = body.replace('<p class="skript1" hidden>', '<p class="skript1">')
            for alt, neu in (('이 과에서 쓸 말이에요. 눌러서 먼저 들어 보세요.', '이 과에서 쓸 말이에요.'),
                             ('낱말이나 예문 앞의 단추를 누르면 소리가 나요. ', ''),
                             ('줄을 누르면 소리가 나요. ', ''), (' 줄을 누르면 소리가 나요.', ''),
                             ('상대의 말은 음성으로 나오고, 내 차례에는 직접 말해요.', '상대의 말은 글로 읽고, 내 차례에는 직접 말해요.')):
                body = body.replace(alt, neu)
            hinweis = '<p class="na-hinweis">음성은 준비 중이에요. 듣기 단추와 받아쓰기는 음성이 올라오면 쓸 수 있어요. 그동안은 글을 읽으면서 공부해요.</p>'
        rep = {
            '__ROBOTS__': '' if is_public() else '<meta name="robots" content="noindex">\n',
            '__NA__': ' data-na="1"' if (self.na and self.nan) else '', '__HINWEIS__': hinweis,
            '__TITLE__': E(title), '__DESC__': E(desc), '__URL__': url, '__ID__': self.pid, '__LEVEL__': lv['hid'], '__TYP__': p['typ'],
            '__ORT__': ort, '__H1__': E(h1), '__THEMA__': ko(thema), '__STEPS__': steps, '__BODY__': body.replace('__ENDE__', ende),
            '__DATA__': json.dumps(self.data, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/'),
            '__AUDIO__': '../../../erwachsene/audio/%s/' % self.pid,
            '__BOOK__': book['id'], '__MARK__': E(book['mark']), '__APP__': E(book['mark']), '__STORE__': 'soda-%s-v1' % book['id'],
            '__ACC__': book['farbe']['accent'], '__INK__': book['farbe']['ink'], '__FILL__': book['farbe']['fill'],
            '__DACC__': book['farbe']['daccent'], '__DINK__': book['farbe']['dink'], '__DFILL__': book['farbe']['dfill'],
        }
        out = tpl
        for k, v in rep.items():
            out = out.replace(k, v)
        return out


def asset_ver():
    h = hashlib.md5()
    for f in ('lektion.css', 'lektion.js'):
        h.update(open(os.path.join(J, f), 'rb').read())
    return h.hexdigest()[:8]


def cmd_site(draft=False):
    tpl = open(os.path.join(T, 'page.html'), encoding='utf-8').read()
    rd = lambda f: open(os.path.join(T, 'blocks', f), encoding='utf-8').read()
    tpl = tpl.replace('<!--SODA_THEME_JS-->', rd('soda-theme-js.html')).replace('/*SODA_DARK_SHARED*/', rd('soda-dark-shared.css')).replace('__VER__', asset_ver())
    ps = have_src(); allsrc = [(q, parse(src_path(q['id']))) for q in ps]; ready = []
    for book in books():
        mine = [(p, L) for p, L in allsrc if p['lv']['id'] in book['levels']]; ok = []
        for p, L in mine:
            pg = Page(p, L, book, draft); pg.render(tpl, (None, None))            # 한 번 돌려 빠진 것을 센다
            if pg.miss and not draft:
                print('  %s %s 아직 열 수 없음: 빠진 것 %d개, 예: %s' % (book['id'], p['id'], len(pg.miss), pg.miss[:3])); continue
            ok.append(p['id'])
        allp = [q for q in pages() if q['lv']['id'] in book['levels']]; ids = [q['id'] for q in allp]
        for p, L in mine:
            if p['id'] not in ok:
                continue
            i = ids.index(p['id'])
            prev = next((allp[k] for k in range(i - 1, -1, -1) if allp[k]['id'] in ok and allp[k]['lv']['id'] == p['lv']['id']), None)
            nxt = next((allp[k] for k in range(i + 1, len(allp)) if allp[k]['id'] in ok and allp[k]['lv']['id'] == p['lv']['id']), None)
            if nxt is None and i + 1 < len(allp) and allp[i + 1]['id'] in ok:      # 단계의 마지막 화면: 다음 단계의 첫 과가 열려 있으면 그리로 잇는다
                nxt = allp[i + 1]
            pg = Page(p, L, book, draft)
            pg.prev = next(((q, M) for q, M in mine if q['lv']['id'] == p['lv']['id'] and q['typ'] == 'lektion' and q['nr'] == p['nr'] - 1), None)
            out = pg.render(tpl, (prev, nxt))
            d = os.path.join(ROOT, book['id'], p['lv']['hid'], p['slug']); os.makedirs(d, exist_ok=True)
            open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(out)
            if pg.miss:
                print('  %s %s (초안) 빠진 것 %d개' % (book['id'], p['id'], len(pg.miss)))
        for x in ok:
            if x not in ready:
                ready.append(x)
        print(book['id'], '열린 화면:', ok)
    json.dump({'open': ready, 'date': datetime.date.today().isoformat()}, open(os.path.join(T, 'open.json'), 'w'), indent=0)


if __name__ == '__main__':
    a = sys.argv[1:]
    if not a:
        print(__doc__)
    elif a[0] == 'check':
        sys.exit(1 if cmd_check(a[1:]) else 0)
    elif a[0] == 'tts':
        cmd_tts(a[1], a[2:])
    elif a[0] == 'prompts':
        cmd_prompts(a[1], a[2:])
    elif a[0] == 'cut':
        cmd_cut(a[1], a[2:])
    elif a[0] == 'img':
        cmd_img(a[1])
    elif a[0] == 'prune':
        cmd_prune(a[1:])
    elif a[0] == 'site':
        cmd_site('--draft' in a)
