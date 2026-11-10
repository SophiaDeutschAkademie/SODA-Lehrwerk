#!/usr/bin/env python3
"""연습 챕터 원본(tools/uebungen-src/U01.json … U37.json)으로 uebungen/U01.json … U37.json을 만들어요.

    python3 grammatik/tools/uebungen-build.py

하는 일
  1. 원본을 검사해요(uebungen-check.py의 오류 검사). 오류가 있으면 멈춰요.
  2. 객관식 보기를 문항마다 정해진 순서로 섞고, 단어 배열 조각도 섞어서 HTML로 만들어요.
  3. index.html의 sx-ux(연습 주소·문항 수)·sx-wx(통합 복습)와 sw.js의 오프라인 목록·VERSION을 함께 갱신해요.

문항마다 data-id(문항 내용으로 만든 고정 번호)를 붙여요. 앱은 학생의 답을 이 번호로 저장하므로,
문항을 더하거나 순서를 바꿔도 이미 푼 답이 다른 문항에 붙지 않아요. 문항의 질문이나 정답을 고치면
그 문항의 번호만 바뀌고, 그 문항의 이전 답만 사라져요.
원본 형식과 쓰는 법은 grammatik/tools/uebungen-src/README.md에 있어요.
"""
import hashlib, html as H, importlib.util, json, os, random, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
G = os.path.normpath(os.path.join(HERE, '..')) + os.sep
OUT = G + 'uebungen' + os.sep
spec = importlib.util.spec_from_file_location('uchk', HERE + os.sep + 'uebungen-check.py')
chk = importlib.util.module_from_spec(spec)
spec.loader.exec_module(chk)

LV = {1: ('기본', '기본 문제', '배운 내용을 그대로 확인해요'),
      2: ('중간', '중간 문제', '조건이 한두 개 더 붙어요'),
      3: ('도전', '도전 문제', '함정과 예외까지 따져 봐요')}
PLUS = ('보강', '보강 문제', '문장을 바꿔 쓰고, 틀린 단어를 찾아요')
LETTERS = 'abcd'
LONG_OPT = 22  # 보기 한 줄이 이 글자 수를 넘으면 세로 한 열로 놓아요
PENCIL = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1-4.2L16.2 4.6a1.6 1.6 0 0 1 2.3 0l.9.9a1.6 1.6 0 0 1 0 2.3L8.2 19z"/><path d="M14.5 6.4l3.1 3.1"/></svg>'


def md(s):
    s = H.escape(s, quote=False).replace('"', '&quot;')
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    return s.replace('&lt;br&gt;', '<br>').replace('\n', '<br>')


def attr(obj):
    return H.escape(json.dumps(obj, ensure_ascii=False, separators=(',', ':')), quote=True)


def first(a):
    return a if isinstance(a, str) else a[0]


def item_id(it):
    """문항의 고정 번호. 질문과 정답이 같으면 늘 같은 번호예요(해설·힌트를 고쳐도 그대로)."""
    core = [it.get('t'), it.get('q'), it.get('s'), it.get('a'), it.get('o'), it.get('x'), it.get('r')]
    return hashlib.sha1(json.dumps(core, ensure_ascii=False, sort_keys=True).encode('utf8')).hexdigest()[:10]


def toks(s):
    return s.split()


def render_item(n, idx, it):
    return render_core(n, idx, it).replace('<div class="qi', '<div data-id="%s" class="qi' % item_id(it), 1)


def render_core(n, idx, it):
    rng = random.Random('%s-%d' % (n, idx))
    qn = '<strong class="qn">%d.</strong> ' % idx
    e = '<div class="qe">%s</div>'
    t = it['t']
    if t == 'tr':
        return ('<div class="qi qt" data-t="tr" data-a="%s"><div class="qq">%s%s</div><div class="qsrc" lang="de">%s</div>%s'
                '<textarea class="qtr" rows="2" lang="de" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="바꿔 쓴 문장 %d"></textarea>'
                '<div class="qa"><button type="button" class="qb" data-q="chk">확인</button>'
                '<button type="button" class="qb is-ghost" data-q="show">정답 보기</button>'
                '<button type="button" class="qb is-ghost" data-q="redo">다시 풀기</button></div>'
                '<div class="qe"><div class="qsol">정답 · <b>%s</b></div>%s</div></div>') % (
            attr(it['a']), qn, md(it['q']), md(it['s']), ('<div class="qko">%s</div>' % md(it['ko'])) if it.get('ko') else '',
            idx, H.escape(it['a'][0]), md(it['e']))
    if t == 'err':
        ws = ''.join('<button type="button" class="qw" data-w="%d">%s</button>' % (k, H.escape(w)) for k, w in enumerate(toks(it['q'])))
        return ('<div class="qi qx" data-t="err" data-x="%d"><div class="qq">%s틀린 단어를 하나 눌러요.</div><div class="qko">%s</div>'
                '<div class="qtok" lang="de">%s</div>'
                '<div class="qa"><button type="button" class="qb is-ghost" data-q="redo">다시 풀기</button></div>'
                '<div class="qe"><div class="qsol">고친 문장 · <b>%s</b></div>%s</div></div>') % (
            it['x'], qn, md(it['ko']), ws, H.escape(it['r']), md(it['e']))
    if t == 'mc':
        order = list(range(len(it['o'])))
        rng.shuffle(order)
        btns = ''.join('<button class="qo" data-c="%d" data-k="%d">%s) %s</button>' % (1 if k == it['a'] else 0, k, LETTERS[j], md(it['o'][k]))
                       for j, k in enumerate(order))
        q = re.sub(r'_{3,}', '<span class="qblank"></span>', md(it['q']))
        col = ' qg1' if max(len(re.sub(r'\*\*', '', o)) for o in it['o']) > LONG_OPT else ''
        return '<div class="qi"><div class="qq">%s%s</div><div class="qg%s">%s</div>%s</div>' % (qn, q, col, btns, e % md(it['e']))
    if t == 'fill':
        hs = it.get('h')
        if isinstance(hs, str): hs = [hs]
        parts = re.split(r'_{3,}', md(it['q']))
        sent = parts[0]
        sol = md(it['q'])
        for k, a in enumerate(it['a']):
            ans = first(a)
            width = max(len(x) for x in ([a] if isinstance(a, str) else a)) + 2
            hint = (hs[k] if hs and k < len(hs) else '') or ''
            sent += ('<input class="qin" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" '
                     'style="width:%dch" aria-label="빈칸 %d">' % (max(width, 5), k + 1))
            if hint: sent += '<span class="qh">(%s)</span>' % md(hint)
            sent += parts[k + 1]
            sol = re.sub(r'_{3,}', '<b>%s</b>' % H.escape(ans), sol, count=1)
        norm = [[x] if isinstance(x, str) else x for x in it['a']]
        return ('<div class="qi qf" data-t="fill" data-a="%s"><div class="qq">%s%s</div><div class="qko">%s</div>'
                '<div class="qa"><button type="button" class="qb" data-q="chk">확인</button>'
                '<button type="button" class="qb is-ghost" data-q="show">정답 보기</button>'
                '<button type="button" class="qb is-ghost" data-q="redo">다시 풀기</button></div>'
                '<div class="qe"><div class="qsol">정답 · %s</div>%s</div></div>') % (attr(norm), qn, sent, md(it['ko']), sol, md(it['e']))
    # order
    PW = lambda x: re.sub(r'[.,!?;:]', '', x).split()
    words = PW(it['a'][0])
    idxs = list(range(len(words)))
    for _ in range(20):
        rng.shuffle(idxs)
        if idxs != list(range(len(words))): break
    chips = ''.join('<button type="button" class="qc" data-i="%d">%s</button>' % (k, H.escape(words[j])) for k, j in enumerate(idxs))
    return ('<div class="qi qr" data-t="order" data-a="%s"><div class="qq">%s%s</div><div class="qko">%s</div>'
            '<div class="qbuild" aria-live="polite"></div><div class="qpool">%s</div>'
            '<div class="qa"><button type="button" class="qb" data-q="chk">확인</button>'
            '<button type="button" class="qb is-ghost" data-q="clr">지우기</button>'
            '<button type="button" class="qb is-ghost" data-q="show">정답 보기</button>'
            '<button type="button" class="qb is-ghost" data-q="redo">다시 풀기</button></div>'
            '<div class="qe"><div class="qsol">정답 · <b>%s</b></div>%s</div></div>') % (
        attr([' '.join(PW(x)) for x in it['a']]), qn, md(it['q']), md(it['ko']), chips, H.escape(it['a'][0]), md(it['e']))


def chapter_html(d, meta, head, foot):
    n = d['n']
    items = sorted(enumerate(d['items']), key=lambda p: (p[1]['lv'], p[0]))
    plus = d.get('plus') or []
    cnt = {1: 0, 2: 0, 3: 0}
    for _, it in items: cnt[it['lv']] += 1
    total = len(items) + len(plus)
    goals = ''.join('<div class="x-goal">%s</div>' % md(g) for g in d['goals'])
    how = ('<div class="x-goals" style="margin-top:14px"><div class="x-goals-t">풀이 방법</div>'
           '<div class="x-goal">보기를 고르거나, 빈칸에 쓰거나, 단어를 눌러 문장을 만들어요</div>'
           '<div class="x-goal">빈칸 옆 괄호와 한국어 뜻이 힌트예요. 대문자와 소문자는 구별하지 않아요</div>'
           '<div class="x-goal">단어 배열에는 문장부호가 없어요. 문법에 맞는 어순이면 모두 정답이에요</div>'
           + ('<div class="x-goal">바꿔 쓰기는 문장 전체를 써요. 쉼표와 마침표는 채점하지 않아요</div>'
              '<div class="x-goal">틀린 곳 찾기는 문장에서 틀린 단어 하나를 눌러요</div>' if (plus or d.get('range')) else '')
           + '<div class="x-goal">푼 답은 이 기기에 저장돼요. 새로고침하거나 앱을 업데이트해도 남아 있어요</div></div>')
    if d.get('range'):
        a, b = d['range']
        intro = ('Lektion %02d부터 %02d까지 배운 문법을 섞어서 풀어요.<br>여러 과의 문법이 한 문장에 함께 나와요. 기본 %d · 중간 %d · 도전 %d 문제예요.'
                 '<div class="x-goals"><div class="x-goals-t">이 복습에서 확인할 것</div>%s</div>%s') % (a, b, cnt[1], cnt[2], cnt[3], goals, how)
        big = 'R%s' % n[1:]
    else:
        intro = ('Lektion %s의 문법을 직접 풀어 보며 익혀요.<br>%s 수준의 문장으로, 기본 %d · 중간 %d · 도전 %d%s 문제를 풀어요.'
                 '<div class="x-goals"><div class="x-goals-t">이 연습에서 확인할 것</div>%s</div>%s') % (
            n, d['level'], cnt[1], cnt[2], cnt[3], (' · 보강 %d' % len(plus)) if plus else '', goals, how)
        big = n
    out = [head.replace('%%LEKTION%%', big).replace('%%KO%%', H.escape(meta['ko'])).replace('%%DE%%', H.escape(meta['de'])).replace('%%INTRO%%', intro)]
    num = 0
    for lv in (1, 2, 3):
        sub = [it for _, it in items if it['lv'] == lv]
        if not sub: continue
        out.append('<div class="sub-head"><span class="sub-badge%s">%s</span><span class="sub-title">%s · %s</span></div><div class="quiz-block">' % (
            ' review-badge' if lv == 1 else '', LV[lv][0], LV[lv][1], LV[lv][2]))
        for it in sub:
            num += 1
            out.append(render_item(n, num, it))
        out.append('</div>')
    if plus:
        out.append('<div class="sub-head"><span class="sub-badge plus-badge">%s</span><span class="sub-title">%s · %s</span></div><div class="quiz-block">' % PLUS)
        for it in plus:
            num += 1
            out.append(render_item(n, num, it))
        out.append('</div>')
    out.append('<div class="qscore" data-total="%d" data-no-print><div class="qscore-t">맞힌 문제 <b class="qscore-n">0</b> / %d</div>'
               '<div class="qscore-bar"><i></i></div><button type="button" class="qb is-ghost" data-q="all">모두 다시 풀기</button></div>' % (total, total))
    out.append(foot)
    return '\n'.join(out), cnt, len(plus)


def main():
    ns = ['%02d' % i for i in range(1, 38) if os.path.exists(chk.SRC + 'U%02d.json' % i)]
    ws = ['W%d' % i for i in range(1, 10) if os.path.exists(chk.SRC + 'W%d.json' % i)]
    only = ['%02d' % int(a) for a in sys.argv[1:]]
    if not ns:
        print('원본이 없어요'); sys.exit(1)
    L1 = json.load(open(G + 'lessons/L01.json', encoding='utf8'))
    bar = re.search(r'<div class="brand-bar">.*?</div></div>', L1, re.S).group(0)
    foot = re.search(r'<div class="brand-foot">.*?</div></div>', L1, re.S).group(0)
    idx = open(G + 'index.html', encoding='utf8').read()
    meta_all = {m['n']: m for m in json.loads(re.search(r'<script type="application/json" id="sx-meta">(.*?)</script>', idx, re.S).group(1))}
    head = (bar + '\n<header class="lk-hd"><div class="lk-topic">' + PENCIL + '</div><div class="lk-kicker">Übung</div>'
            '<div class="lk-big">%%LEKTION%%</div><h1>%%KO%%</h1><div class="lk-de">%%DE%%</div><div class="lk-intro">%%INTRO%%</div></header>')
    os.makedirs(OUT, exist_ok=True)
    ux = []
    nerr = 0
    for n in ns:
        e, w, d = chk.check_chapter(n)
        if e:
            nerr += len(e)
            print('U%s 오류 %d개 — 건너뜀' % (n, len(e)))
            for x in e[:8]: print('   ' + x)
            continue
        body, cnt, np = chapter_html(d, meta_all[n], head, foot)
        data = json.dumps(body, ensure_ascii=False)
        path = OUT + 'U%s.json' % n
        open(path, 'w', encoding='utf8').write(data)
        hv = hashlib.sha256(data.encode('utf8')).hexdigest()[:10]
        ent = {'n': n, 'q': sum(cnt.values()) + np, 'lv': [cnt[1], cnt[2], cnt[3]], 'level': d['level'], 'src': 'uebungen/U%s.json?v=%s' % (n, hv)}
        if np: ent['p'] = np
        ux.append(ent)
    wx = []
    for n in ws:
        e, w, d = chk.check_review(n)
        if e:
            nerr += len(e)
            print('%s 오류 %d개 — 건너뜀' % (n, len(e)))
            for x in e[:8]: print('   ' + x)
            continue
        body, cnt, np = chapter_html(d, {'ko': d['ko'], 'de': d['de']}, head.replace('>Übung<', '>Wiederholung<'), foot)
        data = json.dumps(body, ensure_ascii=False)
        open(OUT + '%s.json' % n, 'w', encoding='utf8').write(data)
        hv = hashlib.sha256(data.encode('utf8')).hexdigest()[:10]
        wx.append({'n': n, 'q': sum(cnt.values()), 'lv': [cnt[1], cnt[2], cnt[3]], 'level': d['level'], 'range': d['range'],
                   'ko': d['ko'], 'de': d['de'], 'w': 1, 'src': 'uebungen/%s.json?v=%s' % (n, hv)})
    if nerr:
        print('오류가 있는 챕터는 만들지 않았어요.')
    # index.html
    tag = '<script type="application/json" id="sx-ux">' + json.dumps(ux, ensure_ascii=False, separators=(',', ':')) + '</script>'
    idx, k = re.subn(r'<script type="application/json" id="sx-ux">.*?</script>', lambda m: tag, idx, flags=re.S)
    assert k == 1, 'sx-ux script missing in index.html'
    wtag = '<script type="application/json" id="sx-wx">' + json.dumps(wx, ensure_ascii=False, separators=(',', ':')) + '</script>'
    idx, k = re.subn(r'<script type="application/json" id="sx-wx">.*?</script>', lambda m: wtag, idx, flags=re.S)
    assert k == 1, 'sx-wx script missing in index.html'
    open(G + 'index.html', 'w', encoding='utf8').write(idx)
    # sw.js
    sw = open(G + 'sw.js', encoding='utf8').read()
    arr = 'const UEBUNGEN = [\n' + ',\n'.join('  "%s"' % u['src'] for u in ux + wx) + '\n];'
    sw, k = re.subn(r'const UEBUNGEN = \[.*?\];', lambda m: arr, sw, flags=re.S)
    assert k == 1, 'UEBUNGEN missing in sw.js'
    lists = re.findall(r'"([^"]+\?v=[0-9a-f]+)"', sw)
    ver = hashlib.sha256(('\n'.join(lists) + hashlib.sha256(idx.encode('utf8')).hexdigest()).encode()).hexdigest()[:10]
    sw = re.sub(r"const VERSION = '[0-9a-f]+';", "const VERSION = '%s';" % ver, sw)
    open(G + 'sw.js', 'w', encoding='utf8').write(sw)
    print('연습 %d챕터 · 문항 %d개(보강 %d) · 통합 복습 %d세트 %d문항 · sw VERSION %s' % (
        len(ux), sum(u['q'] for u in ux), sum(u.get('p', 0) for u in ux), len(wx), sum(u['q'] for u in wx), ver))
    sys.exit(1 if nerr else 0)


if __name__ == '__main__':
    main()
