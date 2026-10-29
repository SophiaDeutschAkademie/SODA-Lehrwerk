#!/usr/bin/env python3
"""연습 챕터 원본(tools/uebungen-src/U01.json … U37.json)을 검사해요.

    python3 grammatik/tools/uebungen-check.py            # 전부 검사
    python3 grammatik/tools/uebungen-check.py 05 06      # 일부만 검사
    python3 grammatik/tools/uebungen-check.py --text 05  # 교재 5과의 본문을 글자로 보기 (작성할 때 참고)

검사 항목
  오류(고쳐야 해요)  형식, 문항 수·난이도 배분, 정답 오류 가능성, 교재 문장과 같은 문장, 반복 문장, 반말·격식체
  경고(확인해요)     교재와 겹치는 표현(내용어 둘 이상이 이어진 3어 이상), 아직 배우지 않은 문법으로 보이는 형태
경고는 문항에 "ok": "이유"를 적으면 넘어가요. 이유에는 왜 괜찮은지(예: "werden은 본동사, 5과")를 써요.
"""
import collections, glob, html, json, os, re, sys

G = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..') + os.sep
G = os.path.normpath(G) + os.sep
SRC = G + 'tools' + os.sep + 'uebungen-src' + os.sep

WORD = r"[A-Za-zÄÖÜäöüß]+"
SPLIT = r'[가-힣0-9.?!:;|/()·—–=→+\[\]„“"”‚‘’…~]+'


# ── 교재 본문 ────────────────────────────────────────────────
def text_of(h):
    h = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', h, flags=re.S)
    h = re.sub(r'<span class="gt-tip">.*?</span></span></span>', '', h, flags=re.S)
    h = re.sub(r'<br\s*/?>|</(p|div|li|tr|td|th|h\d|section|button)>', '\n', h)
    h = re.sub(r'<[^>]+>', '', h)
    return html.unescape(h)


def lesson_text(n):
    name = 'anhang' if n == 'anhang' else 'L%02d' % int(n)
    return text_of(json.load(open(G + 'lessons/%s.json' % name, encoding='utf8')))


def runs_of(text):
    """줄을 한국어·숫자·문장부호에서 끊어 독일어 단어 열(소문자)로 만들어요."""
    out = []
    for line in text.split('\n'):
        for seg in re.split(SPLIT, line):
            toks = [t.lower() for t in re.findall(WORD, seg)]
            if toks:
                out.append(toks)
    return out


_corpus = None


def corpus():
    global _corpus
    if _corpus:
        return _corpus
    full, grams, freq = set(), collections.defaultdict(set), collections.Counter()
    for f in sorted(glob.glob(G + 'lessons/*.json')):
        nm = os.path.basename(f)[:-5]
        for toks in runs_of(text_of(json.load(open(f, encoding='utf8')))):
            freq.update(toks)
            if len(toks) >= 3:
                full.add(' '.join(toks))
            for n in (3, 4):
                for i in range(len(toks) - n + 1):
                    grams[' '.join(toks[i:i + n])].add(nm)
    stop = set(w for w, _ in freq.most_common(110))
    _corpus = (full, grams, stop)
    return _corpus


# ── 아직 배우지 않은 문법으로 보이는 형태 (과 번호 미만이면 경고) ──
PARTICIPLE_EXC = r'(?!geben\b|gehen\b|gehören\b|gewinnen\b|gefallen\b|gelingen\b|gegen\b|gelten\b|genießen\b|geschehen\b|gestern\b|genug\b|gerade\b|gern\b|genau\b|gebären\b|gebrauchen\b|gedenken\b)'
RULES = [
    ('화법조동사', 10, r'\b(kann|kannst|können|könnt|muss|musst|müssen|müsst|will|willst|wollen|wollt|darf|darfst|dürfen|dürft|soll|sollst|sollen|sollt|mag|magst|mögen|möchte|möchtest|möchten|möchtet)\b'),
    ('분리동사(문장 끝 접두어)', 11, r'\b(auf|an|ab|aus|ein|mit|zurück|weg|vor|nach|zu|um|los|fest|weiter|fern|her|hin)\s*[.?!]?\s*$'),
    ('현재완료 과거분사', 12, r'\b' + PARTICIPLE_EXC + r'(?-i:ge[a-zäöüß]{2,}(?:t|en))\b'),
    ('과거형', 13, r'\b(war|waren|warst|wart|hatte|hatten|hattest|hattet|wurde|wurden|wurdest|konnte|konnten|musste|mussten|wollte|wollten|sollte|sollten|durfte|durften|mochte|ging|gingen|kam|kamen|sah|sahen|fuhr|fuhren|aß|aßen|trank|lief|schrieb|las|nahm|gab|fand|blieb|dachte|wusste|sagte|machte|lernte|spielte|kaufte|arbeitete|wohnte|lebte|brachte|bekam|stand|saß|lag|schlief|trug|zog|fing|hielt|rief|ließ|traf|half|sprach|verstand|begann|erklärte)\b'),
    ('2격', 16, r'\b(des|eines|meines|deines|seines|ihres|unseres|eures|dessen|deren|wegen|trotz|statt|anstatt|innerhalb|außerhalb)\b'),
    ('재귀동사', 17, r'\bsich\b|\b(freue|freust|freut|beeile|ärgere|setze|erinnere|interessiere|fühle|wasche|entschuldige|bedanke|erhole|verabschiede|verspäte|verliebe|beschwere|konzentriere|bereite)\w*\s+(mich|dich|uns|euch)\b'),
    ('종속절 접속사', 20, r'\b(dass|weil|ob|wenn|obwohl|damit)\b'),
    ('형용사 어미', 23, r'\b(der|die|das|den|dem|des|ein|eine|einen|einem|einer|eines|kein\w*|mein\w*|dein\w*|sein\w*|unser\w*|euer\w*|eure\w*|dies\w+|jed\w+|welch\w+|alle|alle[nrsm])\s+[a-zäöüß]{2,}(?:e|en|em|er|es)\s+(?-i:[A-ZÄÖÜ])'),
    ('비교급·최상급', 25, r'\b(besser|lieber|höher|länger|älter|jünger|größer|kleiner|schneller|teurer|billiger|näher|am\s+\w+sten|am\s+liebsten|am\s+besten)\b|\b\w+er\s+als\b'),
    ('미래·과거완료·werden', 26, r'\b(werde|wirst|wird|werden|werdet)\b'),
    ('시간 종속절', 27, r'\b(bevor|nachdem|sobald|solange|seitdem|sodass|indem|falls|sofern)\b'),
    ('zu 부정형', 28, r'\bzu\s+(?!den\b|einen\b|meinen\b|keinen\b|diesen\b|jenen\b|welchen\b|allen\b|denen\b|unseren\b|seinen\b|ihren\b|euren\b|deinen\b|manchen\b|vielen\b|wenigen\b|beiden\b|anderen\b|haben\b|sein\b)[a-zäöüß]+en\b|\b\w+zu[a-zäöüß]+en\b'),
    ('관계문', 29, r',\s*(der|die|das|den|dem|dessen|deren|denen)\s+[a-zäöüß]|,\s*(mit|in|auf|an|von|für|zu|bei|aus|über|um)\s+(dem|der|denen|dessen|das|die|den)\b'),
    ('접속법 II', 30, r'\b(würde|würden|würdest|würdet|hätte|hätten|hättest|hättet|wäre|wären|wärst|wärt|könnte|könnten|könntest|müsste|müssten|dürfte|dürften|täte|käme|ginge|bräuchte)\b'),
    ('수동태', 31, r'\b(wird|werden|wurde|wurden|worden)\b.*\b(ge[a-zäöüß]+(?:t|en)|[a-zäöüß]+iert)\b'),
    ('분사 수식', 32, r'\b(der|die|das|den|dem|ein|eine|einen|einem|einer)\s+(?:[a-zäöüß]+(?:end|ende|enden|ender|endes|endem)|ge[a-zäöüß]+(?:te|ten|ter|tes|tem|ene|enen|ener|enes|enem))\s+(?-i:[A-ZÄÖÜ])'),
    ('부정(kein·nicht)', 9, r'\b(kein|keine|keinen|keinem|keiner|keines|nicht|nie|niemals)\b'),
    ('소유관사', 8, r'\b(mein|meine|meinen|meinem|meiner|meines|dein|deine|deinen|deinem|deiner|unser|unsere|unseren|unserem|unserer|euer|eure|euren|eurem|eurer)\b'),
    ('수·요일·달·시각', 7, r'\d|\b(elf|zwölf|zwanzig|dreißig|hundert|tausend|montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag|januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember|uhr)\b'),
    ('숫자 1–10', 2, r'\b(eins|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn)\b'),
    ('의문사', 6, r'\b(wer|wen|wem|wessen|was|wo|woher|wohin|wann|warum|wie|welche|welcher|welches|welchen|welchem)\b'),
]

BAD_KO = re.compile(r'(습니다|입니다|합니다|됩니다|십시오)|[가-힣]다(?=\s*[.!?]?\s*(?:<br>|$))')
BANNED = ['Was machst du von Beruf']


def strip_md(s):
    return s.replace('**', '')


def de_strings(it):
    """문항의 독일어 문장들 (빈칸은 정답으로 채워서)."""
    out = []
    t = it['t']
    if t == 'mc':
        q = strip_md(it['q'])
        correct = strip_md(it['o'][it['a']])
        if '___' in q:
            out.append(re.sub(r'_{3,}', correct, q, count=1))
        else:
            out.append(q)
        out += [strip_md(o) for o in it['o']]
    elif t == 'fill':
        q = strip_md(it['q'])
        for a in it['a']:
            ans = a if isinstance(a, str) else a[0]
            q = re.sub(r'_{3,}', ans, q, count=1)
        out.append(q)
    elif t == 'order':
        out += it['a']
    return out


def norm_key(s):
    return ' '.join(t for toks in runs_of(s) for t in toks)


def check_chapter(n, strict_counts=True):
    errs, warns = [], []
    path = SRC + 'U%s.json' % n
    if not os.path.exists(path):
        return ['파일이 없어요: ' + path], [], None
    try:
        d = json.load(open(path, encoding='utf8'))
    except Exception as e:
        return ['JSON 오류: %s' % e], [], None
    lesson = int(n)
    if d.get('n') != n:
        errs.append('n이 파일 번호와 달라요')
    if d.get('level') not in ('A1', 'A2', 'B1', 'B2'):
        errs.append('level은 A1·A2·B1·B2 중 하나')
    goals = d.get('goals') or []
    if not (3 <= len(goals) <= 4):
        errs.append('goals는 3~4개')
    items = d.get('items') or []
    cnt = collections.Counter(i.get('lv') for i in items)
    typ = collections.Counter(i.get('t') for i in items)
    if strict_counts:
        if not (28 <= len(items) <= 34):
            errs.append('문항 수 %d (28~34)' % len(items))
        if not (14 <= cnt[1] <= 18): errs.append('기본(lv1) %d문항 (14~18)' % cnt[1])
        if not (6 <= cnt[2] <= 10): errs.append('중간(lv2) %d문항 (6~10)' % cnt[2])
        if not (4 <= cnt[3] <= 8): errs.append('도전(lv3) %d문항 (4~8)' % cnt[3])
        if typ['fill'] < 8: errs.append('빈칸(fill) %d문항 (8 이상)' % typ['fill'])
        if typ['mc'] < 8: errs.append('객관식(mc) %d문항 (8 이상)' % typ['mc'])
        if typ['order'] < 2: warns.append('[배열] order가 %d문항뿐이에요 (어순이 중요한 과면 2개 이상)' % typ['order'])
    full, grams, stop = corpus()
    seen = {}
    for idx, it in enumerate(items, 1):
        tag = 'U%s #%d' % (n, idx)
        ok = it.get('ok')
        if it.get('lv') not in (1, 2, 3): errs.append(tag + ' lv는 1·2·3'); continue
        if it.get('t') not in ('mc', 'fill', 'order'): errs.append(tag + ' t는 mc·fill·order'); continue
        if not it.get('e'): errs.append(tag + ' 해설(e)이 없어요')
        if not it.get('q'): errs.append(tag + ' 질문(q)이 없어요')
        t = it['t']
        if t == 'mc':
            o = it.get('o') or []
            if not (3 <= len(o) <= 4): errs.append(tag + ' 보기는 3~4개')
            if len(set(x.strip() for x in o)) != len(o): errs.append(tag + ' 보기가 겹쳐요')
            if not isinstance(it.get('a'), int) or not (0 <= it['a'] < len(o)): errs.append(tag + ' a는 정답 보기의 번호(0부터)'); continue
            if any(re.search(r'모두|둘 다|위의|정답 없|해당 없', x) for x in o): errs.append(tag + ' "모두·둘 다·정답 없음" 보기는 쓰지 않아요')
        elif t == 'fill':
            if not it.get('ko'): errs.append(tag + ' 한국어 뜻(ko)이 없어요 — 빈칸은 뜻과 힌트가 있어야 풀 수 있어요')
            nb = len(re.findall(r'_{3,}', it['q']))
            a = it.get('a')
            if nb < 1 or not isinstance(a, list) or len(a) != nb: errs.append(tag + ' 빈칸 수(%d)와 a의 길이가 달라요' % nb); continue
            h = it.get('h')
            if h is None: errs.append(tag + ' 힌트(h)가 없어요 (빈칸마다 하나, 필요 없으면 "")')
            elif isinstance(h, str) and nb == 1: pass
            elif not (isinstance(h, list) and len(h) == nb): errs.append(tag + ' h의 길이가 빈칸 수와 달라요')
        elif t == 'order':
            if not it.get('ko'): errs.append(tag + ' 한국어 뜻(ko)이 없어요')
            a = it.get('a')
            if not isinstance(a, list) or not a: errs.append(tag + ' a는 문장 목록'); continue
            W = lambda x: re.sub(r'[.,!?;:]', '', x).lower().split()
            base = sorted(W(a[0]))
            aseen = set()
            for alt in a:
                if sorted(W(alt)) != base: errs.append(tag + ' 다른 정답의 단어가 첫 정답과 달라요: ' + alt)
                key = ' '.join(W(alt))
                if key in aseen: errs.append(tag + ' 같은 정답이 중복돼요(문장부호·대소문자 무시): ' + alt)
                aseen.add(key)
            if len(base) < 4: errs.append(tag + ' 배열 문장은 4단어 이상')
            if len(base) > 14: warns.append(tag + ' 배열 문장이 너무 길어요 (%d단어)' % len(base))
        # 한국어 말투
        for k in ('e', 'ko', 'q'):
            v = it.get(k)
            if isinstance(v, str):
                for ln in re.split(r'<br>|\n', v):
                    ln = re.sub(r'[A-Za-zÄÖÜäöüß].*$', '', ln) if k == 'q' else ln
                    if BAD_KO.search(ln.strip()):
                        errs.append(tag + ' %s 말투(해요체로): %s' % (k, ln.strip()[:40]))
        if any(b in json.dumps(it, ensure_ascii=False) for b in BANNED): errs.append(tag + ' 쓰지 않기로 한 표현')
        # 독일어 문장 검사
        sents = de_strings(it)
        flagged_gram, flagged_ov = set(), []
        for s in sents:
            for toks in runs_of(s):
                joined = ' '.join(toks)
                if len(toks) >= 3 and joined in full:
                    errs.append(tag + ' 교재와 같은 문장: ' + joined)
                if len(toks) >= 3:
                    k = joined
                    if k in seen and seen[k] != tag and t != 'mc': errs.append(tag + ' 다른 문항과 같은 문장(%s): %s' % (seen[k], joined))
                    if len(toks) >= 4 and t != 'mc': seen.setdefault(k, tag)
                for L in (4, 3):
                    for i in range(len(toks) - L + 1):
                        g = ' '.join(toks[i:i + L])
                        if g in grams and sum(1 for w in toks[i:i + L] if w not in stop) >= 2:
                            flagged_ov.append((g, sorted(grams[g])[:3]))
            for name, minl, rx in RULES:
                if name.startswith('분리동사') and len(s.split()) < 3:
                    continue
                if lesson < minl:
                    flags = re.I if name not in ('형용사 어미', '분사 수식') else re.I
                    m = re.search(rx, s, flags)
                    if m: flagged_gram.add((name, minl, m.group(0)[:30]))
        if flagged_ov:
            uniq = []
            for g, src in flagged_ov:
                if not any(g in u[0] or u[0] in g for u in uniq): uniq.append((g, src))
            if not ok:
                warns.append(tag + ' [교재 겹침] ' + '; '.join('"%s"(%s)' % (g, ','.join(s)) for g, s in uniq[:3]))
        if flagged_gram and not ok:
            warns.append(tag + ' [미학습 문법?] ' + '; '.join('%s(%d과~) "%s"' % x for x in sorted(flagged_gram)))
    return errs, warns, d


def main():
    args = sys.argv[1:]
    if args and args[0] == '--toc':
        for i in range(1, 38):
            h = json.load(open(G + 'lessons/L%02d.json' % i, encoding='utf8'))
            t = re.search(r'<h1>(.*?)</h1>', h, re.S).group(1)
            secs = [x for x in re.findall(r'<section id="sec-[^"]+"><div class="sh"><span class="sl">[^<]*</span><h2>(.*?)</h2>', h)
                    if not re.match(r'한국어로 먼저|가장 많이|참고|바로 쓰는', x)]
            print('L%02d %s' % (i, t))
            print('     ' + ' / '.join(secs))
        return
    if args and args[0] == '--text':
        for n in args[1:]:
            print('=' * 20, 'Lektion', n)
            print(re.sub(r'\n{2,}', '\n', lesson_text(n)))
        return
    ns = ['%02d' % int(a) for a in args] if args else ['%02d' % i for i in range(1, 38)]
    bad = 0
    for n in ns:
        e, w, d = check_chapter(n)
        n_items = len(d['items']) if d else 0
        print('U%s  문항 %d  오류 %d  경고 %d' % (n, n_items, len(e), len(w)))
        for x in e: print('   오류  ' + x)
        for x in w: print('   경고  ' + x)
        bad += len(e)
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
