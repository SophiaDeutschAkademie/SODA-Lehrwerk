#!/usr/bin/env python3
"""Vokalab 암기용 PDF 만들기.

    python3 tools/vokalab_pdf.py              # 8개 모두 (vokalab/pdf/)
    python3 tools/vokalab_pdf.py b1           # B1 전체·시험용
    python3 tools/vokalab_pdf.py b1 --exam    # B1 시험용만
    python3 tools/vokalab_pdf.py --stats      # 예문 굵은 글씨 표시 비율만 출력

vokalab/data/words.js 를 읽어 「접어서 가리기 + 예문」 모양의 A4 PDF를 만든다.
가운데 접는 선을 기준으로 왼쪽은 독일어(단어·예문), 오른쪽은 뜻·해석이다.
모든 줄의 높이가 같고, 내용이 길면 그 줄의 글자만 줄여서 맞춘다.

필요한 것: Chrome 또는 Chromium(환경 변수 CHROME 으로 경로 지정 가능),
글꼴 Inter·Lora(시스템에 설치), Pretendard(저장소 assets/).
있으면 쓰는 것: fontTools 와 node(글꼴을 고정 TrueType 으로 바꿔 파일을 1/3로 줄인다),
pikepdf 또는 pypdf(다시 압축하고 문서 정보를 넣는다).
단어 자료가 같으면 만들어지는 파일도 같다(만든 시각을 넣지 않는다).
"""
import argparse
import html
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'vokalab', 'data', 'words.js')
OUT = os.path.join(ROOT, 'vokalab', 'pdf')
ROWS = {'a12': 12, 'b1': 11, 'b2': 10, 'c1': 9}      # 한 쪽에 넣는 단어 수
AREA = 705.0                                         # 단어 줄이 차지하는 높이(pt)

esc = html.escape


# ---------------------------------------------------------------- 자료 읽기
def load():
    s = open(DATA, encoding='utf-8').read()
    return json.loads(s[s.index('{'):s.rindex('}') + 1])


def split_ko(ko):
    m = re.search(r'\s*·\s*\[([^\]]+)\]\s*$', ko)
    return (ko[:m.start()].strip(), m.group(1)) if m else (ko.strip(), '')


# ---------------------------------------------------------------- 제시 단어
ART = {'der': 'm', 'die': 'f', 'das': 'n'}
ART_RE = re.compile(r'^(der/die|der|die|das) (.+)$')


def variants(de):
    """' / ' 로 이어진 표기를 줄로 나눈다(남성형 / 여성형, 낱말 / 낱말)."""
    ps = de.split(' / ')
    if len(ps) > 1 and all(not re.search(r'[ +]', p.strip()) for p in ps):
        return ps
    out = [ps[0]]
    for p in ps[1:]:
        if ART_RE.match(p):
            out.append(p)
        else:
            out[-1] += ' / ' + p
    return out


def soften(s):
    """이미 esc 한 문자열에서 보조 표기를 옅게."""
    s = re.sub(r'(\s\+\s[A-Za-z/]+)', r'<span class="s">\1</span>', s)
    s = re.sub(r'(\([^)]*\))', r'<span class="s">\1</span>', s)
    s = s.replace('|', '<span class="bar">|</span>')
    s = re.sub(r' (↔|/|…) ', r' <span class="s">\1</span> ', s)
    return s.replace('⸚', '<span class="um">-</span>')


def line_html(p):
    m = ART_RE.match(p)
    if not m:
        return soften(esc(p))
    arts, rest = m.group(1), m.group(2)
    a = '<span class="s">/</span>'.join('<u class="g%s">%s</u>' % (ART[x], x) for x in arts.split('/'))
    k = rest.find(', ')
    noun, tail = (rest, '') if k < 0 else (rest[:k], rest[k:])
    return a + ' ' + soften(esc(noun)) + ('<span class="s">%s</span>' % soften(esc(tail)).replace(
        '<span class="s">', '<span>') if tail else '')


def head_html(de):
    return ''.join('<div class="l">%s</div>' % line_html(p) for p in variants(de))


# ---------------------------------------------------------------- 예문에서 제시 단어 찾기
WORD = re.compile(r"[A-Za-zÄÖÜäöüßéèêáàâçñóôíîúû]+(?:-[A-Za-zÄÖÜäöüß]+)*")
STOP = set('''der die das den dem des ein eine einen einem einer eines und oder aber denn doch nicht kein keine
ich du er sie es wir ihr mich dich sich uns euch mir dir ihm ihn ihnen in im an am auf aus bei mit nach von vom zu
zum zur um für durch über unter vor hinter neben zwischen ohne gegen bis seit als wie so auch nur noch schon sehr
mehr hier da dort ist sind war hat haben wird werden kann muss will soll man was wer wo wann warum dass ob wenn weil
etwas jemand jemanden jemandem sein'''.split())
CONTR = {'an': ['am', 'ans'], 'in': ['im', 'ins'], 'zu': ['zum', 'zur'], 'von': ['vom'], 'bei': ['beim'],
         'auf': ['aufs'], 'für': ['fürs'], 'um': ['ums'], 'über': ['übers'], 'durch': ['durchs'],
         'vor': ['vors', 'vorm'], 'unter': ['unters', 'unterm'], 'hinter': ['hinters', 'hinterm']}
PREPS = set('an auf aus bei für gegen in mit nach über um unter von vor zu durch ohne zwischen wegen'.split())
INSEP = ('be', 'ge', 'er', 'ver', 'zer', 'ent', 'emp', 'miss', 'über', 'unter', 'um', 'durch', 'wider', 'voll',
         'hinter', 'wieder')
IRR = {k: set(v.split()) for k, v in {
    'sein': 'bin bist ist sind seid war warst waren wart gewesen sei seien wäre wären wärst',
    'haben': 'habe hast hat habt hatte hattest hatten hattet gehabt hätte hätten hättest',
    'werden': 'werde wirst wird werdet wurde wurdest wurden wurdet geworden worden würde würden würdest',
    'können': 'kann kannst könnt konnte konnten konntest gekonnt könnte könnten könntest',
    'müssen': 'muss musst müsst musste mussten musstest gemusst müsste müssten',
    'dürfen': 'darf darfst dürft durfte durften gedurft dürfte dürften',
    'wollen': 'will willst wollt wollte wollten gewollt',
    'sollen': 'soll sollst sollt sollte sollten gesollt',
    'mögen': 'mag magst mögt mochte mochten gemocht möchte möchten möchtest',
    'wissen': 'weiß weißt wisst wusste wussten gewusst wüsste wüssten',
    'gehen': 'gehe gehst geht ging gingen gingst gegangen gehend',
    'stehen': 'stehe stehst steht stand standen standst gestanden stünde stehend',
    'tun': 'tue tust tut tat taten getan täte',
    'sehen': 'sehe siehst sieht seht sah sahen sahst gesehen sähe sieh',
    'geben': 'gebe gibst gibt gebt gab gaben gabst gegeben gäbe gib',
    'essen': 'esse isst esst aß aßen gegessen iss',
    'fressen': 'frisst fraß fraßen gefressen',
    'messen': 'misst maß maßen gemessen',
    'sitzen': 'sitze sitzt saß saßen gesessen',
    'bringen': 'bringe bringst bringt brachte brachten gebracht brächte',
    'denken': 'denke denkst denkt dachte dachten gedacht dächte',
    'ziehen': 'ziehe ziehst zieht zog zogen gezogen zöge',
    'liegen': 'liege liegst liegt lag lagen gelegen läge',
    'bitten': 'bitte bittest bittet bat baten gebeten',
    'leiden': 'leide leidest leidet litt litten gelitten',
    'schneiden': 'schnitt schnitten geschnitten',
    'reiten': 'ritt ritten geritten', 'streiten': 'stritt stritten gestritten',
    'greifen': 'griff griffen gegriffen', 'pfeifen': 'pfiff pfiffen gepfiffen',
    'treten': 'trete trittst tritt trat traten getreten',
    'bieten': 'bot boten geboten', 'heben': 'hob hoben gehoben',
    'laufen': 'läufst läuft lief liefen gelaufen', 'rufen': 'rief riefen gerufen',
    'lesen': 'liest las lasen gelesen lies', 'leihen': 'lieh liehen geliehen',
    'kennen': 'kannte kannten gekannt', 'nennen': 'nannte nannten genannt',
    'brennen': 'brannte brannten gebrannt', 'rennen': 'rannte rannten gerannt',
    'senden': 'sandte sandten gesandt', 'wenden': 'wandte wandten gewandt',
    'gessen': 'gisst gaß gaßen gessen',          # vergessen
    'ginnen': 'gann gannen gonnen',              # beginnen
    'winnen': 'wann wannen wonnen',              # gewinnen
    'lieren': 'lor loren loren',                 # verlieren
    'fehlen': 'fiehlt fahl fahlen fohlen',       # empfehlen, befehlen
}.items()}
AUX = set().union(*(IRR[k] for k in ('sein', 'haben', 'werden', 'können', 'müssen', 'dürfen', 'wollen', 'sollen',
                                     'mögen', 'wissen')))
IRR_ADJ = {'hoch': 'hoh höher höchst', 'gut': 'besser best', 'viel': 'mehr meist', 'gern': 'lieber liebst',
           'gerne': 'lieber liebst', 'nah': 'näher nächst', 'groß': 'größer größt'}
END_V = ['test', 'tet', 'ten', 'est', 'end', 'et', 'en', 'st', 'te', 't', 'e', 'n', '']
END_A = ['erem', 'eren', 'erer', 'eres', 'ere', 'em', 'en', 'er', 'es', 'e', '']
ADJ_TAIL = re.compile(r'(e[rsnm]?|er(e[rsnm]?)?|e?st(e[rsnm]?)?)?$')


def norm(t):
    return t.lower().replace('ß', 'ss')


def deuml(t):
    return t.replace('ä', 'a').replace('ö', 'o').replace('ü', 'u')


def skel(t):
    t = re.sub(r'(?<=[aeiouyäöü])h', '', norm(t))
    t = re.sub(r'[aeiouyäöü]', '', t)
    return re.sub(r'(.)\1+', r'\1', t)


def umlaut(s):
    for i in range(len(s) - 1, -1, -1):
        c = s[i]
        if c in 'aouAOU':
            if c in 'uU' and i > 0 and s[i - 1] in 'aA':
                i -= 1
                c = s[i]
            return s[:i] + {'a': 'ä', 'o': 'ö', 'u': 'ü', 'A': 'Ä', 'O': 'Ö', 'U': 'Ü'}[c] + s[i + 1:]
    return s


def noun_forms(noun, tail):
    n = noun
    f = {n, n + 's', n + 'es', n + 'n', n + 'en', n + 'e', n + 'ns', n + 'r', n + 'm'}
    for t in re.split(r'\s*/\s*', (tail or '').lstrip(', ')):
        t = re.sub(r'\s*\(.*\)\s*$', '', t).strip()
        if not t:
            continue
        p = umlaut(n) + t[1:] if t[0] == '⸚' else n + t[1:] if t[0] == '-' else t
        f |= {p, p + 'n', p + 's'}
    return {x.lower() for x in f}


def irr_forms(base):
    if base in IRR:
        return IRR[base] | {base}
    for q in INSEP:
        if base.startswith(q) and base[len(q):] in IRR:
            fs = IRR[base[len(q):]]
            return {q + x for x in fs} | {q + x[2:] for x in fs if x.startswith('ge')} | {base}
    return None


def verb_match(tok, inf, prefix=''):
    t, base = tok.lower(), inf.lower()
    irr = irr_forms(base)
    if t in STOP and t != base and not (irr and t in irr):
        return False
    cands = [t]
    if prefix:
        p = prefix.lower()
        if t.startswith(p) and len(t) > len(p) + 2:
            cands.append(t[len(p):])
            if t[len(p):].startswith('zu'):
                cands.append(t[len(p) + 2:])
    stem = norm(re.sub(r'(en|n)$', '', base))
    sk = skel(stem)
    for c in cands:
        if c == base:
            return True
        vs = [c]
        if c.startswith('ge') and not base.startswith('ge') and len(c) > 4:
            vs.append(c[2:])
        for v in vs:
            for a in END_A:
                if a and not v.endswith(a):
                    continue
                v2 = v[:len(v) - len(a)] if a else v
                if irr and (v2 in irr or v in irr):
                    return True
                v2 = norm(v2)
                for e in END_V:
                    if e and not v2.endswith(e):
                        continue
                    s = v2[:len(v2) - len(e)] if e else v2
                    if len(s) < 2:
                        continue
                    if s == stem:
                        return True
                    if not irr and t not in AUX and len(sk) >= 2 and s[0] == stem[0] and skel(s) == sk \
                            and abs(len(s) - len(stem)) <= 2:
                        return True
    return False


def adj_match(tok, lemma):
    t, l = tok.lower(), lemma.lower()
    if t == l:
        return True
    if len(l) < 3:
        return False
    for x in IRR_ADJ.get(l, '').split():
        if t.startswith(x) and ADJ_TAIL.fullmatch(t[len(x):]):
            return True
    a, b = deuml(norm(t)), deuml(norm(l))
    if a.startswith(b) and ADJ_TAIL.fullmatch(a[len(b):]):
        return True
    if b[-2:] in ('el', 'er', 'en') and len(b) > 4:
        c = b[:-2] + b[-1]
        if a.startswith(c) and ADJ_TAIL.fullmatch(a[len(c):]):
            return True
    if b.endswith('e') and a.startswith(b[:-1]) and ADJ_TAIL.fullmatch(a[len(b) - 1:]):
        return True
    return a.startswith(b + b[-1]) and ADJ_TAIL.fullmatch(a[len(b) + 1:]) is not None


def plain_match(tok, lemma):
    t, l = tok.lower(), lemma.lower()
    if t == l:
        return True
    if len(l) >= 5 and l.endswith('er') and t.startswith(l[:-2]) and re.fullmatch(r'e[rsnm]?', t[len(l) - 2:]):
        return True                                       # dieser → diese, diesen
    return len(l) >= 4 and t.startswith(l) and re.fullmatch(r'(e[rsnm]?|s|n)', t[len(l):]) is not None


def clean(de):
    s = re.sub(r'\([^)]*\)', ' ', de)
    s = re.sub(r'\s\+\s[A-Za-z/]+', ' ', s)
    s = re.sub(r'\b(etw|jdn|jdm|jds|jmdn|jmdm)\.', ' ', s)
    return re.sub(r'[!?.…]', ' ', s)


def spans(de, pos, ex):
    """예문에서 굵게 할 구간 [(시작, 끝)]."""
    toks = [(m.start(), m.end(), m.group(0)) for m in WORD.finditer(ex)]
    hit = set()

    def phrase(words):
        """낱말 묶음이 예문에 그대로 이어져 나오면 표시."""
        n = len(words)
        for i in range(len(toks) - n + 1):
            if all(toks[i + k][2].lower() == words[k].lower() for k in range(n)):
                hit.update(range(i, i + n))
                return True
        return False

    def prep(p, after=0):
        forms = [p] + CONTR.get(p, [])
        v = p[0] in 'aeiouäöü'
        forms += ['da' + ('r' if v else '') + p, 'wo' + ('r' if v else '') + p]
        order = [i for i in range(len(toks)) if i >= after] + [i for i in range(len(toks)) if i < after]
        for i in order:
            if toks[i][2].lower() in forms:
                hit.add(i)
                return

    def verb(word):
        prefix, inf = word.split('|') if '|' in word else ('', word)
        found = [i for i, t in enumerate(toks) if verb_match(t[2], inf, prefix)]
        hit.update(found)
        if found and prefix:
            joined = any(toks[i][2].lower().startswith(prefix.lower()) for i in found)
            if not joined:
                later = [i for i, t in enumerate(toks) if i > found[0] and t[2].lower() == prefix.lower()]
                if later:
                    hit.add(later[-1])
        return found

    part = []                                             # 낱말 일부만 굵게 (합성어 안의 제시 단어)

    def noun(word, tail, lead=()):
        forms = noun_forms(word, tail)
        heads = [i for i, t in enumerate(toks) if t[2].lower() in forms]
        for i in heads:
            hit.add(i)
            for k, w in enumerate(reversed(lead), 1):     # die halbe Stunde
                if i - k >= 0 and adj_match(toks[i - k][2], w):
                    hit.add(i - k)
        if not heads and len(word) >= 3:                  # Lieblingsfarbe, Kfz-Werkstatt
            lw = word.lower()
            for i, t in enumerate(toks):
                tl = t[2].lower()
                fs = sorted((f for f in forms if tl.endswith(f) and len(tl) > len(f)), key=len)
                if fs and len(word) >= 4:
                    part.append((t[1] - len(fs[-1]), t[1]))
                elif tl.startswith(lw) and len(tl) > len(lw) and (t[2][0].isupper() or '-' in t[2]):
                    part.append((t[0], t[0] + len(lw)))
        return heads

    def phrase_words(ws, isverb):
        if phrase([w.replace('|', '') for w in ws]):
            return
        first = None
        vi = None
        j = len(ws) - 1
        while j > 0 and ws[j].lower() in PREPS:           # reagieren auf → 동사는 reagieren
            j -= 1
        if '|' in ws[j] or (isverb and ws[j][0].islower() and re.search(r'(en|ln|rn|tun|sein)$', ws[j])
                            and ws[j] not in PREPS):
            vi = j
        for k, w in enumerate(ws):
            if k == vi or '|' in w:
                f = verb(w)
                if f and first is None:
                    first = f[0]
        for n in range(len(ws), 1, -1):                   # 이어진 묶음
            for i in range(len(ws) - n + 1):
                phrase([w.replace('|', '') for w in ws[i:i + n]])
        for k, w in enumerate(ws):
            lw = w.lower()
            if k == vi or '|' in w or lw in STOP or lw in PREPS:
                continue
            if w[0].isupper():
                noun(w, '')
            else:
                found = [i for i, t in enumerate(toks) if adj_match(t[2], w)]
                hit.update(found)
                if not found and isverb and re.search(r'(en|ln|rn)$', w):
                    verb(w)
        if vi is not None and ws[vi].lower() in ('sein', 'haben', 'werden'):
            vs = [i for i in hit if verb_match(toks[i][2], ws[vi])]
            rest = [i for i in hit if i not in vs]
            if len(vs) > 1 and rest:
                keep = min(vs, key=lambda i: min(abs(i - r) for r in rest))
                hit.difference_update(v for v in vs if v != keep)
        if hit:
            for w in ws:
                if w.lower() in PREPS or (w.lower() in STOP and len(ws) <= 3):
                    if not any(toks[i][2].lower() == w.lower() for i in hit):
                        prep(w.lower(), first or 0)

    for var in de.split(' / '):
        m = ART_RE.match(var)
        isverb = pos.startswith('동사') or pos.startswith('숙어')
        if m:
            rest = m.group(2)
            k = rest.find(', ')
            nn, tail = (rest, '') if k < 0 else (rest[:k], rest[k:])
            nn = re.sub(r'\s*\([^)]*\)', '', nn).strip()
            ws = nn.split()
            if not ws:
                continue
            if len(ws) > 1 and not tail and (ws[-1][0].islower() or '|' in ws[-1]):
                phrase_words(ws, True)                    # die Meinung vertreten, das Handy auf|laden
            else:
                noun(ws[-1], tail, ws[:-1])
            continue
        ws = clean(var.replace('↔', ' ')).split()
        ws = [w.strip(',') for w in ws if w.lower() != 'sich' and WORD.search(w)]
        if not ws:
            continue
        if len(ws) == 1:
            w = ws[0]
            if w.endswith('-') or w.startswith('-'):      # Speise-, -speise, erst-
                st = w.strip('-').lower()
                for i, t in enumerate(toks):
                    tl = t[2].lower()
                    if len(st) < 3 or len(tl) <= len(st):
                        continue
                    if w.endswith('-') and tl.startswith(st):
                        if ADJ_TAIL.fullmatch(tl[len(st):]):
                            hit.add(i)
                        else:
                            part.append((t[0], t[0] + len(st)))
                    elif w.startswith('-') and tl.endswith(st):
                        part.append((t[1] - len(st), t[1]))
            elif pos.startswith('동사') or '|' in w:
                verb(w)
            elif pos.startswith('형용사') or pos.startswith('부사'):
                hit.update(i for i, t in enumerate(toks) if adj_match(t[2], w))
            elif w.lower() in PREPS:
                fs = [w.lower()] + CONTR.get(w.lower(), [])
                hit.update(i for i, t in enumerate(toks) if t[2].lower() in fs)
            else:
                hit.update(i for i, t in enumerate(toks) if plain_match(t[2], w))
            continue
        if ',' in var and not pos.startswith('동사') and '+' not in var:
            for w in ws:                                  # dein, deine / nächster, nächste, nächstes
                hit.update(i for i, t in enumerate(toks) if plain_match(t[2], w) or adj_match(t[2], w))
            continue
        phrase_words(ws, isverb)
    out = []
    for a, b in sorted([(toks[i][0], toks[i][1]) for i in hit] + (part if not hit else [])):
        if out and a < out[-1][1]:
            continue
        if out and ex[out[-1][1]:a] == ' ':
            out[-1] = (out[-1][0], b)
        else:
            out.append((a, b))
    return out


def ex_html(de, pos, ex):
    out, p = [], 0
    for a, b in spans(de, pos, ex):
        out.append(esc(ex[p:a]) + '<b>' + esc(ex[a:b]) + '</b>')
        p = b
    return ''.join(out) + esc(ex[p:])


# ---------------------------------------------------------------- HTML
CSS = r'''
@page{size:A4;margin:0}
*{box-sizing:border-box}
:root{--kr:VPretendard,'Pretendard Variable',Pretendard,'Noto Sans CJK KR',sans-serif}
html,body{margin:0;padding:0}
body{font-family:VInter,Inter,VPretendard,'Pretendard Variable',Pretendard,'Noto Sans CJK KR',sans-serif;color:#1f2e4a;
  -webkit-print-color-adjust:exact;print-color-adjust:exact;font-size:9pt}
.pg{position:relative;width:210mm;height:297mm;overflow:hidden;page-break-after:always}
.pg:last-child{page-break-after:auto}
.hd{position:absolute;left:14mm;right:14mm;top:0;height:63.3pt;padding-top:33.6pt;border-bottom:1pt solid #384568;
  display:flex;align-items:center}
.hd img{height:17pt;width:auto;margin-right:6.6pt}
.hd .br{font-weight:700;font-size:10.7pt;color:#374567;letter-spacing:-.005em}
.pill{margin-left:8pt;border:.9pt solid #374567;border-radius:9pt;font-weight:600;font-size:7.9pt;color:#374567;
  padding:0 6.6pt;height:13.1pt;line-height:11.3pt}
.pill.x{background:#374567;color:#fff;margin-left:4.5pt;font-family:var(--kr)}
.hd .rg{margin-left:auto;font-weight:600;font-size:10.5pt;color:#1f2e4a}
.hd .rg span{font-family:var(--kr);font-weight:600;margin-right:2.5pt}
.sh{position:absolute;left:14mm;right:14mm;top:63.3pt;height:30.2pt;border-bottom:.65pt solid #b4becd;
  font-family:var(--kr);font-size:7.2pt;color:#8b97a8}
.sh b{font-weight:600;color:#5e6e83}
.sh .c{position:absolute;bottom:4.6pt;text-align:center;line-height:1}
.sh .c1{left:73.6pt;width:173pt}
.sh .c2{left:269.5pt;width:207pt}
.sh .d{position:absolute;bottom:4.9pt;font-family:VInter,Inter;font-size:7.2pt;color:#5e6e83;line-height:1;width:30.4pt;
  display:flex;justify-content:space-around}
.sh .d1{left:-1pt}.sh .d2{right:-1pt}
.fold{position:absolute;left:105mm;top:66pt;height:732.5pt;width:.75pt;margin-left:-.375pt;
  background:repeating-linear-gradient(to bottom,#b4becd 0,#b4becd 2.2pt,transparent 2.2pt,transparent 4.4pt)}
.fl{position:absolute;left:105mm;top:68.3pt;transform:translateX(-50%);background:#fff;padding:1.2pt 0 1.6pt;
  font-family:var(--kr);font-size:6.8pt;color:#5e6e83;line-height:1;white-space:nowrap}
.rows{position:absolute;left:14mm;right:14mm;top:93.5pt}
.r{position:relative;height:var(--h);border-bottom:.65pt solid #dde2ea;--k:1;--j:1}
.ck{position:absolute;top:50%;transform:translateY(-50%);font-family:VInter,Inter;font-weight:400;font-size:10.6pt;
  line-height:1;color:#b4becd;letter-spacing:.35pt;white-space:nowrap}
.ck.a{left:-.5pt}.ck.b{right:-.9pt}
.no{position:absolute;left:28pt;width:26.4pt;top:50%;transform:translateY(-50%);text-align:right;font-size:7.6pt;
  color:#8b97a8;line-height:1}
.st{position:absolute;left:58.2pt;top:50%;transform:translateY(-52%);font-size:7pt;color:#0e756e;line-height:1}
.de,.ko{position:absolute;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center}
.de{left:73.6pt;width:173pt}
.ko{left:269.5pt;width:207pt;font-family:var(--kr)}
.hw{font-weight:600;font-size:calc(11.7pt*var(--j));line-height:1.3;text-align:justify}
.hw .s,.hw .s span{font-weight:400;color:#5e6e83}
.hw .bar{font-weight:400;color:#8b97a8}
.hw u{text-decoration:none;border-bottom:1.5pt solid;padding-bottom:0;line-height:1}
.hw u.gm{border-color:#2868b0}.hw u.gf{border-color:#e0a018}.hw u.gn{border-color:#3c9a5f}
.um{position:relative;display:inline-block}
.um:after{content:"¨";position:absolute;left:50%;top:.2em;transform:translateX(-50%)}
.alt{font-size:calc(8.25pt*var(--j));line-height:1.36;color:#5e6e83;margin-top:.6pt;text-align:justify}
.ex{font-family:VLora,Lora,'Noto Serif',Georgia,serif;font-size:calc(9.2pt*var(--k));line-height:1.38;color:#293853;
  margin-top:2.4pt;text-align:justify;hyphens:auto;-webkit-hyphens:auto}
.ex b{font-weight:700;color:#1f2e4a}
.mn{font-size:calc(10.7pt*var(--j));line-height:1.36;color:#5e6e83;text-align:justify;word-break:keep-all}
.mn b{font-weight:600;color:#1f2e4a}
.mn .pos{font-size:calc(7.2pt*var(--j));margin-left:4.5pt;white-space:nowrap}
.tr{font-size:calc(8.6pt*var(--k));line-height:1.45;color:#5e6e83;margin-top:4pt;text-align:justify;word-break:keep-all}
.ft{position:absolute;right:14mm;top:803pt;font-size:7.9pt;color:#5e6e83;line-height:12.6pt}
.ft b{font-weight:600;color:#1f2e4a;margin-left:9pt}
'''

# 줄 높이에 맞지 않는 줄은 예문·해석 글자부터 줄이고, 그래도 넘치면 단어·뜻 글자를 줄인다.
FIT = r'''
function fit(){
  var rows=[].slice.call(document.querySelectorAll('.r')),todo=rows,n=0;
  function over(r){var h=r.clientHeight-5;
    return Math.max(inner(r.querySelector('.de')),inner(r.querySelector('.ko')))>h}
  function inner(c){var t=0;for(var i=0;i<c.children.length;i++){var e=c.children[i],s=getComputedStyle(e);
    t+=e.offsetHeight+parseFloat(s.marginTop)}return t}
  while(todo.length&&n<24){
    var bad=todo.filter(over);
    bad.forEach(function(r){var k=+r.dataset.k||1,j=+r.dataset.j||1;
      if(k>0.72)k-=0.04;else if(j>0.8)j-=0.04;else{k-=0.03;j-=0.02}
      r.dataset.k=k;r.dataset.j=j;r.style.setProperty('--k',k.toFixed(2));r.style.setProperty('--j',j.toFixed(2))});
    todo=bad;n++}
  document.documentElement.dataset.left=todo.length;
  if(todo.length)document.title='OVERFLOW '+todo.length;
}
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(fit);
'''


def row_html(no, w, star):
    mean, pos = split_ko(w['ko'])
    alt = w.get('deAlt') or []
    ka = w.get('koAlt') or []
    mn = '<b>%s</b>' % esc(mean) + (', ' + esc(', '.join(ka)) if ka else '')
    if pos and pos != '명사':
        mn += '\u2060<span class="pos">%s</span>' % esc(pos)
    ck = '○○○'
    return ('<div class="r"><div class="ck a">%s</div><div class="no">%d</div>%s'
            '<div class="de"><div class="hw">%s</div>%s<div class="ex" lang="de">%s</div></div>'
            '<div class="ko"><div class="mn">%s</div><div class="tr">%s</div></div>'
            '<div class="ck b">%s</div></div>') % (
        ck, no, '<div class="st">★</div>' if star else '', head_html(w['de']),
        '<div class="alt">= %s</div>' % esc(', '.join(alt)) if alt else '',
        ex_html(w['de'], pos, w.get('ex', '')), mn, esc(w.get('exKo', '')), ck)


def build_html(D, lv, exam, limit=None):
    L = [x for x in D['levels'] if x['id'] == lv][0]
    seq = (D.get('exam') or {}).get(lv, {}).get('seq', [])
    by = {w['i']: w for w in L['words']}
    xs = set(seq)
    words = [by[i] for i in seq if i in by] if exam else L['words']
    if limit:
        words = words[:limit]
    per = ROWS[lv]
    title = 'Vokalab 단어장 %s%s' % (L['label'], ' 시험용' if exam else '')
    logo = 'file://' + os.path.join(ROOT, 'assets', 'logo.png')
    pages = []
    for p in range(0, len(words), per):
        chunk = words[p:p + per]
        rows = ''.join(row_html(p + k + 1, w, (not exam) and w['i'] in xs) for k, w in enumerate(chunk))
        pages.append(
            '<div class="pg"><div class="hd"><img src="%s" alt=""><span class="br">SODA Vokalab</span>'
            '<span class="pill">%s</span>%s<span class="rg"><span>단어</span>%d–%d</span></div>'
            '<div class="sh"><div class="d d1"><span>1</span><span>3</span><span>7</span></div>'
            '<div class="c c1"><b>독일어</b> 보고 <b>뜻</b> 말하기</div>'
            '<div class="c c2"><b>뜻</b> 보고 <b>독일어</b> 말하기</div>'
            '<div class="d d2"><span>1</span><span>3</span><span>7</span></div></div>'
            '<div class="fold"></div><div class="fl">접는 선</div>'
            '<div class="rows" style="--h:%.3fpt">%s</div>'
            '<div class="ft">Sophia Deutsch Akademie<b>%d</b></div></div>' % (
                logo, esc(L['label']), '<span class="pill x">시험용</span>' if exam else '',
                p + 1, p + len(chunk), AREA / per, rows, p // per + 1))
    body = ''.join(pages)
    return title, ('<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>%s</title>'
                   '<style>%s%s</style></head><body>%s<script>%s</script>'
                   '</body></html>') % (esc(title), fonts_css(set(re.sub(r'<[^>]+>', '', body))), CSS, body, FIT), len(words)


# ---------------------------------------------------------------- 글꼴
# Chrome 은 가변 글꼴과 OTF(CFF) 글꼴을 PDF 에 글자마다 따로 그리는 방식(Type 3)으로 넣어 파일이 몇 배 커진다.
# 그래서 고정 굵기의 TrueType 글꼴을 만들어 쓴다(처음 한 번만 만들고 임시 폴더에 둔다).
# fontTools 가 없거나 변환에 실패하면 시스템 글꼴을 그대로 쓴다(모양은 같고 파일만 커진다).
# 아래의 _find_font, _otf_to_ttf, _brotli_shim, _ranges 와 chrome 은 grammatik/tools/pdf-build.py(Syntalab PDF)도 가져다 쓴다.
FONT_DIR = os.path.join(tempfile.gettempdir(), 'vokalab-pdf-fonts-1')
INTER = {400: 'Regular', 600: 'SemiBold', 700: 'Bold'}
LORA = {400: 'Regular', 700: 'Bold'}
PRET = (400, 600)


def _find_font(names):
    for d in ('/usr/share/fonts', '/usr/local/share/fonts', os.path.expanduser('~/.fonts'),
              os.path.expanduser('~/.local/share/fonts'), '/Library/Fonts', os.path.expanduser('~/Library/Fonts'),
              'C:\\Windows\\Fonts'):
        for base, _, files in os.walk(d):
            for n in names:
                if n in files:
                    return os.path.join(base, n)
    return None


def _otf_to_ttf(font):
    from fontTools.pens.cu2quPen import Cu2QuPen
    from fontTools.pens.ttGlyphPen import TTGlyphPen
    from fontTools.ttLib import newTable
    order = font.getGlyphOrder()
    gs = font.getGlyphSet()
    glyf = newTable('glyf')
    glyf.glyphOrder = order
    glyf.glyphs = {}
    for name in order:
        pen = TTGlyphPen(gs)
        gs[name].draw(Cu2QuPen(pen, 1.0, reverse_direction=True))
        glyf.glyphs[name] = pen.glyph()
    font['loca'] = newTable('loca')
    font['glyf'] = glyf
    del font['CFF ']
    if 'VORG' in font:
        del font['VORG']
    glyf.compile(font)
    hmtx = font['hmtx']
    for name in order:
        g = glyf.glyphs[name]
        hmtx[name] = (hmtx[name][0], getattr(g, 'xMin', 0) or 0)
    mp = font['maxp']
    mp.tableVersion = 0x00010000
    for k in ('maxZones', 'maxTwilightPoints', 'maxStorage', 'maxFunctionDefs', 'maxInstructionDefs',
              'maxStackElements', 'maxSizeOfInstructions', 'maxComponentElements', 'maxComponentDepth'):
        setattr(mp, k, 1 if k == 'maxZones' else 0)
    post = font['post']
    post.formatType = 3.0
    font.sfntVersion = '\x00\x01\x00\x00'


def _brotli_shim():
    """파이썬에 brotli 가 없으면 node 로 woff2 를 푼다."""
    try:
        import brotli  # noqa: F401
        return True
    except ImportError:
        pass
    if not shutil.which('node'):
        return False
    import types
    mod = types.ModuleType('brotli')
    js = ('const c=[];process.stdin.on("data",d=>c.push(d)).on("end",()=>process.stdout.write('
          'require("zlib").brotliDecompressSync(Buffer.concat(c))))')
    mod.decompress = lambda data: subprocess.run(['node', '-e', js], input=bytes(data),
                                                 stdout=subprocess.PIPE, check=True).stdout
    sys.modules['brotli'] = mod
    return True


def _ranges(text):
    out = []
    for part in text.split(','):
        part = part.strip().lower().replace('u+', '')
        if not part:
            continue
        a, _, b = part.partition('-')
        out.append((int(a, 16), int(b or a, 16)))
    return out


def fonts_css(chars):
    """고정 TrueType 글꼴을 준비하고 @font-face 규칙을 돌려준다. 실패하면 Pretendard 원본 CSS 만 쓴다."""
    plain = '@import url("file://%s");' % os.path.join(ROOT, 'assets', 'pretendard.css')
    try:
        from fontTools.ttLib import TTFont
        from fontTools.varLib import instancer
    except ImportError:
        return plain
    os.makedirs(FONT_DIR, exist_ok=True)
    css = []

    def face(family, weight, path, extra=''):
        css.append('@font-face{font-family:%s;font-weight:%d;src:url("file://%s") format("truetype");%s}'
                   % (family, weight, path, extra))

    try:
        for w, n in INTER.items():
            out = os.path.join(FONT_DIR, 'Inter-%d.ttf' % w)
            if not os.path.exists(out):
                src = _find_font(['Inter-%s.otf' % n, 'Inter-%s.ttf' % n])
                if not src:
                    raise RuntimeError('Inter 글꼴 없음')
                f = TTFont(src)
                if 'CFF ' in f:
                    _otf_to_ttf(f)
                f.save(out)
            face('VInter', w, out)
        for w, n in LORA.items():
            out = os.path.join(FONT_DIR, 'Lora-%d.ttf' % w)
            if not os.path.exists(out):
                src = _find_font(['Lora-Variable.ttf', 'Lora[wght].ttf', 'Lora-VariableFont_wght.ttf'])
                if src:
                    f = instancer.instantiateVariableFont(TTFont(src), {'wght': w})
                else:
                    src = _find_font(['Lora-%s.ttf' % n])
                    if not src:
                        raise RuntimeError('Lora 글꼴 없음')
                    f = TTFont(src)
                f.save(out)
            face('VLora', w, out)
        if not _brotli_shim():
            raise RuntimeError('woff2 를 풀 수 없음(brotli·node 없음)')
        src_css = open(os.path.join(ROOT, 'assets', 'pretendard.css'), encoding='utf-8').read()
        need = {ord(c) for c in chars}
        for m in re.finditer(r'@font-face\{[^}]*?src:url\("fonts/([0-9a-f]+)\.woff2"\)[^}]*?unicode-range:([^}]+)\}',
                             src_css):
            name, rng = m.group(1), m.group(2).strip()
            if not any(any(a <= c <= b for a, b in _ranges(rng)) for c in need):
                continue
            for w in PRET:
                out = os.path.join(FONT_DIR, 'Pretendard-%s-%d.ttf' % (name, w))
                if not os.path.exists(out):
                    f = TTFont(os.path.join(ROOT, 'assets', 'fonts', name + '.woff2'))
                    f = instancer.instantiateVariableFont(f, {'wght': w})
                    f.flavor = None
                    f.save(out)
                face('VPretendard', w, out, 'unicode-range:%s;' % rng)
    except Exception as e:                                # noqa: BLE001
        print('글꼴 변환을 건너뜁니다(%s). 시스템 글꼴을 그대로 써서 PDF가 커집니다.' % e, file=sys.stderr)
        return plain
    return ''.join(css)


# ---------------------------------------------------------------- PDF
def chrome():
    for c in [os.environ.get('CHROME'), 'google-chrome', 'chromium', 'chromium-browser', 'chrome',
              '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome']:
        if c and (os.path.isfile(c) or shutil.which(c)):
            return c
    sys.exit('Chrome 또는 Chromium 을 찾지 못했습니다. 환경 변수 CHROME 에 실행 파일 경로를 넣어 주세요.')


def to_pdf(html_path, pdf_path, title):
    tmp = pdf_path + '.tmp'
    subprocess.run([chrome(), '--headless=new', '--no-sandbox', '--disable-gpu', '--no-pdf-header-footer',
                    '--disable-pdf-tagging', '--virtual-time-budget=600000', '--print-to-pdf=' + tmp,
                    'file://' + html_path],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=1800)
    info = {'/Title': title, '/Author': 'Sophia Deutsch Akademie', '/Subject': '접어서 가리기 + 예문',
            '/Creator': 'tools/vokalab_pdf.py'}
    left = ''
    try:                                                  # 다시 압축해 크기를 줄이고 문서 정보를 넣는다
        import pikepdf
        with pikepdf.open(tmp) as pdf:
            left = str(pdf.docinfo.get('/Title', ''))
            for k in list(pdf.docinfo.keys()):            # 만든 시각을 빼서, 내용이 같으면 파일도 같게
                del pdf.docinfo[k]
            for k, v in info.items():
                pdf.docinfo[k] = v
            pdf.save(pdf_path, compress_streams=True, recompress_flate=True, deterministic_id=True,
                     object_stream_mode=pikepdf.ObjectStreamMode.generate)
        os.remove(tmp)
    except ImportError:
        try:
            from pypdf import PdfReader, PdfWriter
            rd = PdfReader(tmp)
            left = str((rd.metadata or {}).get('/Title', ''))
            w = PdfWriter(clone_from=rd)
            w.metadata = None
            w.add_metadata(info)
            w.compress_identical_objects()
            with open(pdf_path, 'wb') as f:
                w.write(f)
            os.remove(tmp)
        except ImportError:
            os.replace(tmp, pdf_path)
    if left.startswith('OVERFLOW'):
        print('주의: 줄 높이에 맞추지 못한 줄이 %s개 있습니다 (%s).' % (left.split()[-1], os.path.basename(pdf_path)),
              file=sys.stderr)


def stats(D):
    import random
    random.seed(3)
    for L in D['levels']:
        tot = miss = 0
        bad = []
        for w in L['words']:
            pos = split_ko(w['ko'])[1]
            tot += 1
            if not spans(w['de'], pos, w.get('ex', '')):
                miss += 1
                bad.append((w['de'], w.get('ex', '')))
        print('%s: %d개 중 예문에서 단어를 찾지 못한 것 %d개 (%.1f%%)' % (L['id'], tot, miss, 100.0 * miss / tot))
        for de, ex in random.sample(bad, min(len(bad), int(os.environ.get('SHOW', '0')))):
            print('    %-34s %s' % (de[:34], ex[:80]))


def main():
    ap = argparse.ArgumentParser(description='Vokalab 암기용 PDF 만들기')
    ap.add_argument('levels', nargs='*', help='a12 b1 b2 c1 (비우면 전부)')
    ap.add_argument('--exam', action='store_true', help='시험용만')
    ap.add_argument('--all', action='store_true', help='전체 단어만')
    ap.add_argument('--out', default=OUT, help='PDF를 둘 폴더')
    ap.add_argument('--limit', type=int, help='앞에서부터 이 개수만(시험 인쇄)')
    ap.add_argument('--keep-html', action='store_true', help='중간 HTML을 지우지 않음')
    ap.add_argument('--stats', action='store_true', help='예문 굵은 글씨 표시 비율 출력')
    a = ap.parse_args()
    D = load()
    if a.stats:
        return stats(D)
    os.makedirs(a.out, exist_ok=True)
    kinds = [True] if a.exam else [False] if a.all else [False, True]
    for lv in a.levels or list(ROWS):
        for exam in kinds:
            title, doc, n = build_html(D, lv, exam, a.limit)
            fd, hp = tempfile.mkstemp(suffix='.html', prefix='vokalab-pdf-')
            with os.fdopen(fd, 'w', encoding='utf-8') as f:
                f.write(doc)
            out = os.path.join(a.out, 'vokalab-%s-%s.pdf' % (lv, 'exam' if exam else 'all'))
            to_pdf(hp, out, title)
            if a.keep_html:
                print('   html:', hp)
            else:
                os.remove(hp)
            print('%s  단어 %d개, %d쪽, %.1f MB' % (os.path.basename(out), n, -(-n // ROWS[lv]),
                                               os.path.getsize(out) / 1e6))


if __name__ == '__main__':
    main()
