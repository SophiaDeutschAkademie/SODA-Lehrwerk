#!/usr/bin/env python3
"""연습 챕터 원본(tools/uebungen-src/U01.json … U37.json)으로 uebungen/U01.json … U37.json을 만들어요.

    python3 grammatik/tools/uebungen-build.py

하는 일
  1. 원본을 검사해요(uebungen-check.py의 오류 검사). 오류가 있으면 멈춰요.
  2. 객관식 보기를 문항마다 정해진 순서로 섞고, 단어 배열 조각도 섞어서 HTML로 만들어요.
  3. index.html의 sx-ux(연습 주소·문항 수)와 sw.js의 오프라인 목록·VERSION을 함께 갱신해요.
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
LETTERS = 'abcd'
PENCIL = '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1-4.2L16.2 4.6a1.6 1.6 0 0 1 2.3 0l.9.9a1.6 1.6 0 0 1 0 2.3L8.2 19z"/><path d="M14.5 6.4l3.1 3.1"/></svg>'


def md(s):
    s = H.escape(s, quote=False).replace('"', '&quot;')
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    return s.replace('&lt;br&gt;', '<br>').replace('\n', '<br>')


def attr(obj):
    return H.escape(json.dumps(obj, ensure_ascii=False, separators=(',', ':')), quote=True)


def first(a):
    return a if isinstance(a, str) else a[0]


def render_item(n, idx, it):
    rng = random.Random('%s-%d' % (n, idx))
    qn = '<strong class="qn">%d.</strong> ' % idx
    e = '<div class="qe">%s</div>'
    t = it['t']
    if t == 'mc':
        order = list(range(len(it['o'])))
        rng.shuffle(order)
        btns = ''.join('<button class="qo" data-c="%d">%s) %s</button>' % (1 if k == it['a'] else 0, LETTERS[j], md(it['o'][k]))
                       for j, k in enumerate(order))
        q = re.sub(r'_{3,}', '<span class="qblank"></span>', md(it['q']))
        return '<div class="qi"><div class="qq">%s%s</div><div class="qg">%s</div>%s</div>' % (qn, q, btns, e % md(it['e']))
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
    words = it['a'][0].split()
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
        attr(it['a']), qn, md(it['q']), md(it['ko']), chips, H.escape(it['a'][0]), md(it['e']))


def chapter_html(d, meta, head, foot):
    n = d['n']
    items = sorted(enumerate(d['items']), key=lambda p: (p[1]['lv'], p[0]))
    cnt = {1: 0, 2: 0, 3: 0}
    for _, it in items: cnt[it['lv']] += 1
    total = len(items)
    goals = ''.join('<div class="x-goal">%s</div>' % md(g) for g in d['goals'])
    intro = ('Lektion %s의 문법을 직접 풀어 보며 익혀요.<br>%s 수준의 문장으로, 기본 %d · 중간 %d · 도전 %d 문제를 풀어요.'
             '<div class="x-goals"><div class="x-goals-t">이 연습에서 확인할 것</div>%s</div>'
             '<div class="x-goals" style="margin-top:14px"><div class="x-goals-t">풀이 방법</div>'
             '<div class="x-goal">보기를 고르거나, 빈칸에 쓰거나, 단어를 눌러 문장을 만들어요</div>'
             '<div class="x-goal">빈칸 옆 괄호와 한국어 뜻이 힌트예요. 대문자와 소문자는 구별하지 않아요</div></div>') % (
        n, d['level'], cnt[1], cnt[2], cnt[3], goals)
    out = [head.replace('%%LEKTION%%', n).replace('%%KO%%', H.escape(meta['ko'])).replace('%%DE%%', H.escape(meta['de'])).replace('%%INTRO%%', intro)]
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
    out.append('<div class="qscore" data-total="%d" data-no-print><div class="qscore-t">맞힌 문제 <b class="qscore-n">0</b> / %d</div>'
               '<div class="qscore-bar"><i></i></div><button type="button" class="qb is-ghost" data-q="all">모두 다시 풀기</button></div>' % (total, total))
    out.append(foot)
    return '\n'.join(out), cnt


def main():
    ns = ['%02d' % i for i in range(1, 38) if os.path.exists(chk.SRC + 'U%02d.json' % i)]
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
        body, cnt = chapter_html(d, meta_all[n], head, foot)
        data = json.dumps(body, ensure_ascii=False)
        path = OUT + 'U%s.json' % n
        open(path, 'w', encoding='utf8').write(data)
        hv = hashlib.sha256(data.encode('utf8')).hexdigest()[:10]
        ux.append({'n': n, 'q': sum(cnt.values()), 'lv': [cnt[1], cnt[2], cnt[3]], 'level': d['level'], 'src': 'uebungen/U%s.json?v=%s' % (n, hv)})
    if nerr:
        print('오류가 있는 챕터는 만들지 않았어요.')
    # index.html
    tag = '<script type="application/json" id="sx-ux">' + json.dumps(ux, ensure_ascii=False, separators=(',', ':')) + '</script>'
    idx, k = re.subn(r'<script type="application/json" id="sx-ux">.*?</script>', lambda m: tag, idx, flags=re.S)
    assert k == 1, 'sx-ux script missing in index.html'
    open(G + 'index.html', 'w', encoding='utf8').write(idx)
    # sw.js
    sw = open(G + 'sw.js', encoding='utf8').read()
    arr = 'const UEBUNGEN = [\n' + ',\n'.join('  "%s"' % u['src'] for u in ux) + '\n];'
    sw, k = re.subn(r'const UEBUNGEN = \[.*?\];', lambda m: arr, sw, flags=re.S)
    assert k == 1, 'UEBUNGEN missing in sw.js'
    lists = re.findall(r'"([^"]+\?v=[0-9a-f]+)"', sw)
    ver = hashlib.sha256(('\n'.join(lists) + hashlib.sha256(idx.encode('utf8')).hexdigest()).encode()).hexdigest()[:10]
    sw = re.sub(r"const VERSION = '[0-9a-f]+';", "const VERSION = '%s';" % ver, sw)
    open(G + 'sw.js', 'w', encoding='utf8').write(sw)
    print('연습 %d챕터 · 문항 %d개 · sw VERSION %s' % (len(ux), sum(u['q'] for u in ux), ver))
    sys.exit(1 if nerr else 0)


if __name__ == '__main__':
    main()
