#!/usr/bin/env python3
"""성인 교재 세 권의 목차 페이지 빌드.

  SODA Basis   「성인 독일어」    A1–B1            -> basis/index.html
  SODA Studium 「대학생 독일어」  B2–C1 Hochschule -> studium/index.html
  SODA Beruf   「직장인 독일어」  B2               -> beruf/index.html

tools/inhalt.json(교재, 단계, 과 목록) + tools/shell.html(화면 틀) + tools/blocks(공통 조각)
A1.1부터 B1.2까지 여섯 단계(art = g)는 공통 과정으로 「성인 독일어」 한 권에 있고, 과마다 과제만 두 가지입니다(as = 대학 생활, ab = 직장 생활).
B2부터는 목적에 따라 교재가 갈립니다(art = s 대학생, b 직장인). 한 교재에는 art 가 같은 단계만 들어갑니다.

실행: python3 erwachsene/tools/build.py   (끝에 저장소 tools/seo.py 를 부릅니다)
"""
import datetime, html, json, os, re, subprocess, sys

T = os.path.dirname(os.path.abspath(__file__))
E = os.path.dirname(T)
ROOT = os.path.dirname(E)
esc = lambda s: html.escape(s, quote=True)
ART = {'g': '공통 과정', 's': '대학생 과정', 'b': '직장인 과정'}
ALT_STORES = ['soda-studium-v1', 'soda-beruf-v1']      # 공통 과정이 두 교재에 따로 있던 때(2026.11.26까지)의 기록 이름. 새 기록이 없으면 여기서 읽어 온다


def open_ids():
    """본문이 올라온 화면의 이름 (tools/lektion.py site 가 적어 둔 tools/open.json)"""
    p = os.path.join(T, 'open.json')
    return set(json.load(open(p))['open']) if os.path.exists(p) else set()


def ohne_audio():
    """음성을 아직 만들지 않은 단계 (tools/status.json 의 ohne_audio)"""
    try:
        return set(json.load(open(os.path.join(T, 'status.json'), encoding='utf-8')).get('ohne_audio') or [])
    except (OSError, ValueError):
        return set()


def ohne_seiten():
    """음성이 아직 없는 화면의 이름 (tools/lektion.py site 가 tools/open.json 의 na 에 적어 둔다)"""
    p = os.path.join(T, 'open.json')
    return set(json.load(open(p)).get('na') or []) if os.path.exists(p) else set()


OPEN = open_ids()
NA = ohne_audio()
OHNE = ohne_seiten()


def lv_open(lv):
    return sorted(x for x in OPEN if x.startswith(lv['id'] + '/'))


def de(s):
    """독일어 줄: 붙임표가 든 말(W-Fragen, Ja-/Nein-Fragen)이 줄 끝에서 갈라지지 않게 묶는다."""
    return ' '.join('<span class="nb">%s</span>' % esc(w) if re.search(r'\w-\w', w) else esc(w) for w in s.split(' '))


def rd(name):
    return open(os.path.join(T, 'blocks', name), encoding='utf-8').read()


def check(data):
    lv = {x['id']: x for x in data['levels']}
    assert len(lv) == len(data['levels'])
    for x in data['levels']:
        kinds = [it['t'] for it in x['items']]
        assert kinds.count('l') in (6, 8) and kinds.count('w') == 2 and kinds.count('t') == 1, (x['id'], kinds)
        assert kinds[-1] == 't' and kinds[-2] == 'w', (x['id'], kinds)
        assert x['art'] in ART and len(x['kann']) == 3, x['id']
        for k in ('code', 'de', 'ko', 'lead', 'text', 'leben'):
            assert x.get(k, '').strip(), (x['id'], k)
        for it in x['items']:
            if it['t'] == 'l':
                need = ('de', 'ko', 'ziel', 'gr') + (('as', 'ab') if x['art'] == 'g' else ('auf',))
                assert all(1 <= n <= 37 for n in it['syn']) and it['syn'] == sorted(set(it['syn'])), (x['id'], it['de'], it['syn'])
            else:
                need = ('de', 'txt')
            for k in need:
                assert it.get(k, '').strip(), (x['id'], it.get('de'), k)
    used = []
    for b in data['books']:
        ids = b['levels']; used += ids
        assert all(i in lv for i in ids) and len({lv[i]['art'] for i in ids}) == 1, b['id']        # 한 교재에는 같은 과정의 단계만
        codes = [lv[i]['code'] for i in ids]
        assert len(codes) == len(set(codes)) and len(codes) % 2 == 0, (b['id'], codes)
        w = b['weiter']
        assert w['titel'].strip() and w['text'].strip() and w['links'], b['id']
    assert sorted(used) == sorted(lv), '단계마다 교재가 하나씩 있어야 함'
    blob = json.dumps(data, ensure_ascii=False)
    assert 'von Beruf?' not in blob          # 쓰지 않기로 한 표현
    assert '_' not in blob


def hid(lv):
    """화면 안에서 쓰는 단계 이름: A1.1 -> a1-1 (두 교재의 B2는 서로 다른 화면에 있으므로 겹치지 않는다)"""
    return lv['code'].lower().replace('.', '-')


def stairs(levels):
    out = []; n = len(levels)
    for i, lv in enumerate(levels):
        a, _, b = lv['code'].partition('.')
        out.append('        <button type="button" role="tab" class="step%s" id="tab-%s" aria-controls="p-%s" aria-selected="%s" aria-label="%s" style="--i:%d;--h:%.1f%%"><span>%s</span><span>.%s</span></button>'
                   % ((' offen' if lv_open(lv) else ''), hid(lv), hid(lv), 'true' if i == 0 else 'false',
                      esc('%s %s, %s, %s' % (lv['code'], lv['de'], lv['ko'], ART[lv['art']])), i, 40 + 60.0 * i / (n - 1), esc(a), esc(b)))
    return '\n'.join(out)


def groups(levels):
    codes = []
    for lv in levels:
        c = lv['code'].split('.')[0]
        if c not in codes:
            codes.append(c)
    return codes


def item(it, n, lv, book, pid, slug):
    """목차의 한 줄. 본문이 올라온 화면(pid 가 OPEN 에 있음)은 줄 전체가 그 화면으로 가는 링크가 된다."""
    on = pid in OPEN; attr = (' auf" data-id="%s' % pid) if on else ''; stat = '<span class="stat"></span>' if on else ''
    href = '%s/%s/' % (hid(lv), slug)
    if it['t'] == 'l':
        if lv['art'] == 'g':                # 공통 과정: 과제가 두 가지(대학 생활, 직장 생활)
            auf = '<span class="zw"><i>대학</i>%s</span><span class="zw"><i>직장</i>%s</span>' % (esc(it['as']), esc(it['ab']))
        else:
            auf = esc(it['auf'])
        syn = ''.join('<a href="../grammatik/#/L%02d" aria-label="Syntalab Lektion %d">%02d</a>' % (k, k, k) for k in it['syn'])
        name = ('<a class="de go" lang="de" href="%s">%s</a>' % (href, de(it['de']))) if on else '<span class="de" lang="de">%s</span>' % de(it['de'])
        return ('      <li class="lek%s"><span class="num" lang="de">Lektion %d</span><div><h3>%s<span class="ko">%s</span>%s</h3>'
                '<dl><div><dt>목표</dt><dd>%s</dd></div>'
                '<div><dt>문법</dt><dd class="gr"><span lang="de">%s</span><span class="syn">Syntalab %s</span></dd></div>'
                '<div><dt>과제</dt><dd>%s</dd></div></dl></div></li>'
                % (attr, n, name, esc(it['ko']), stat, esc(it['ziel']), de(it['gr']), syn, auf))
    name = ('<a class="go" href="%s">%s</a>' % (href, esc(it['de']))) if on else esc(it['de'])
    if it['t'] == 'w':
        head, _, rest = it['txt'].partition(': ')
        return '      <li class="sta%s"><b lang="de">%s</b><i>복습과 실전 과제</i>%s<p><span>%s</span>: %s</p></li>' % (attr, name, stat, esc(head), esc(rest))
    return '      <li class="tst%s"><b lang="de">%s</b><i>%s</i>%s<p>%s</p></li>' % (attr, name, esc(it['ko']), stat, esc(it['txt']))


def links(pairs):
    return ''.join('<a href="%s">%s</a>' % (esc(h), esc(t)) for t, h in pairs)


def panels(levels, book):
    out = []
    for lv in levels:
        n = 0; w = 0; rows = []; nl = sum(1 for it in lv['items'] if it['t'] == 'l')
        for it in lv['items']:
            if it['t'] == 'l':
                n += 1; slug = str(n)
            elif it['t'] == 'w':
                w += 1; slug = 'wiederholung-%d' % w
            else:
                slug = 'stufentest'
            rows.append(item(it, n, lv, book, '%s/%s' % (lv['id'], slug), slug))
        offen = lv_open(lv); ol = [x for x in offen if x.rsplit('/', 1)[1].isdigit()]
        if not offen:
            go = '      <p class="p-wart">이 단계의 본문은 준비 중이에요. 지금은 목차만 볼 수 있어요.</p>\n'
        else:
            go = ''
            if lv['id'] + '/1' in OPEN:
                go += '      <p class="p-go"><a class="btn" href="%s/1/" data-go="%s">Lektion 1 시작하기</a></p>\n' % (hid(lv), hid(lv))
            if len(offen) < len(lv['items']):
                go += '      <p class="p-wart">지금은 과 %d개 가운데 %d개를 볼 수 있어요. 나머지는 차례로 올라와요.</p>\n' % (nl, len(ol))
            ohne = [x for x in offen if x in OHNE]
            if lv['id'] in NA and ohne and len(ohne) == len(offen):
                go += '      <p class="p-na">음성은 준비 중이에요. 지금은 글과 그림으로 공부할 수 있어요.</p>\n'
            elif lv['id'] in NA and ohne:                   # 음성이 있는 화면과 없는 화면이 섞인 단계: 없는 화면만 적는다
                nam = ['Lektion ' + x.rsplit('/', 1)[1] for x in ohne if x.rsplit('/', 1)[1].isdigit()]
                if any('wiederholung' in x for x in ohne):
                    nam.append('복습')
                if any(x.endswith('/stufentest') for x in ohne):
                    nam.append('평가')
                go += '      <p class="p-na">음성이 준비 중인 화면이 있어요: %s. 이 화면은 글과 그림으로 공부할 수 있어요.</p>\n' % ', '.join(nam)
        extra = '<div><dt>함께 쓰는 앱</dt><dd class="lnk">%s</dd></div>' % links(lv['apps']) if lv.get('apps') else ''
        if lv.get('nach'):
            extra += '<div><dt>단계를 마친 뒤</dt><dd class="lnk">%s</dd></div>' % links(lv['nach'])
        out.append(
            '    <article class="panel" id="p-{id}" role="tabpanel" aria-labelledby="tab-{id}">\n'
            '     <div class="p-info">\n'
            '      <p><span class="p-code">{code}</span><span class="p-art">{art}</span></p>\n'
            '      <h2 class="p-name" lang="de">{de}</h2>\n'
            '      <p class="p-ko">{ko}</p>\n'
            '      <p class="p-lead">{lead}</p>\n'
            '{go}'
            '      <h3>이 단계를 마치면</h3>\n'
            '      <ul class="kann">{kann}</ul>\n'
            '      <dl><div><dt>읽고 쓰는 글</dt><dd>{text}</dd></div><div><dt>독일 생활과 제도</dt><dd>{leben}</dd></div>{extra}</dl>\n'
            '     </div>\n'
            '     <ol class="leks">\n{rows}\n     </ol>\n'
            '    </article>'.format(id=hid(lv), code=esc(lv['code']), art=ART[lv['art']],
                                    de=esc(lv['de']), ko=esc(lv['ko']), lead=esc(lv['lead']),
                                    kann=''.join('<li>%s</li>' % esc(k) for k in lv['kann']), text=esc(lv['text']), leben=esc(lv['leben']),
                                    extra=extra, rows='\n'.join(rows), go=go))
    return '\n'.join(out)


def note(levels):
    """표지 아래 안내: 본문이 어디까지 올라왔는지"""
    parts = []; alle = True; zahl = 0
    for lv in levels:
        ns = sorted(int(x.rsplit('/', 1)[1]) for x in lv_open(lv) if x.rsplit('/', 1)[1].isdigit())
        zahl += len(ns); alle = alle and len(lv_open(lv)) == len(lv['items'])
        if ns:
            parts.append('%s Lektion %s' % (lv['code'], ('%d–%d' % (ns[0], ns[-1])) if ns == list(range(ns[0], ns[-1] + 1)) and len(ns) > 1 else ', '.join(str(n) for n in ns)))
    if not parts:
        return '지금은 목차만 볼 수 있어요. 본문은 %s부터 차례로 올라와요.' % levels[0]['code']
    if alle:                                                    # 모든 단계의 과, 복습, 단계 평가가 열려 있다
        return '본문은 %s부터 %s까지 과 %d개가 모두 올라와 있어요.' % (levels[0]['code'], levels[-1]['code'], zahl)
    return '본문은 %s까지 올라와 있어요. 나머지는 차례로 올라와요.' % ', '.join(parts)


def manifest(book):
    return {
        'id': './', 'name': book['app'], 'short_name': book['kurz'], 'description': book['desc'], 'lang': 'ko',
        'start_url': './', 'scope': './', 'display': 'standalone', 'background_color': '#182033', 'theme_color': '#182033',
        'icons': [
            {'src': 'icons/icon-192.png', 'sizes': '192x192', 'type': 'image/png', 'purpose': 'any'},
            {'src': 'icons/icon-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'any'},
            {'src': 'icons/icon-maskable-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'maskable'},
        ],
    }


def page(book, data, shell, date):
    by = {x['id']: x for x in data['levels']}
    levels = [by[i] for i in book['levels']]
    codes = groups(levels); n = len(levels); w = book['weiter']
    f = book['farbe']
    rep = (
        ('<!--SODA_THEME_JS-->', rd('soda-theme-js.html')),
        ('<!--SODA_FZ-->', rd('soda-fz.html')),
        ('/*SODA_DARK_SHARED*/', rd('soda-dark-shared.css')),
        ('<!--A2HS-->', rd('a2hs.html')),
        ('<!--STAIRS-->', stairs(levels)),
        ('<!--GROUPS-->', '\n'.join('        <div><b>%s</b></div>' % esc(c) for c in codes)),
        ('<!--PANELS-->', panels(levels, book)),
        ('<!--NOTE-->', note(levels)),
        ('__STORE__', 'soda-%s-v1' % book['id']),
        ('<!--AUFBAU-->', '\n'.join('        <li><div><b lang="de">%s</b><span>%s</span></div></li>' % (esc(a['de']), esc(a['ko'])) for a in data['aufbau'])),
        ('<!--EXTRAS-->', '\n'.join('        <li><b lang="de">%s</b><span>%s</span></li>' % (esc(a['de']), esc(a['ko'])) for a in data['extras'])),
        ('__SEITE__', esc(book['seite'])), ('__MARK__', esc(book['mark'])), ('__TITEL__', esc(book['titel'])), ('__SUB__', esc(book['sub'])),
        ('__LEAD__', esc(book['lead'])), ('__STUFEN__', esc(book['stufen'])), ('__STUFE__', esc(book['stufe'])),
        ('__WEITER_T__', esc(w['titel'])), ('__WEITER__', esc(w['text'])), ('<!--WEITER_LINKS-->', ' '.join('<a href="%s">%s</a>' % (esc(h), esc(t)) for t, h in w['links'])),
        ('__ALT__', json.dumps(ALT_STORES if levels[0]['art'] == 'g' else [])),
        ('__ACC__', f['accent']), ('__INK__', f['ink']), ('__FILL__', f['fill']), ('__DACC__', f['daccent']), ('__DINK__', f['dink']), ('__DFILL__', f['dfill']),
        ('__NG__', str(len(codes))), ('__N__', str(n)),
        ('__ID__', book['id']), ('__BILD_ALT__', esc(book['bildalt'])),          # 표지 그림: erwachsene/img/titel/<id>.webp
        ('__IDS__', json.dumps([hid(x) for x in levels])),
        ('__DATE__', date),
    )
    for a, b in rep:
        assert a in shell, a
        shell = shell.replace(a, b)
    assert not re.search(r'__[A-Z_]+__|<!--[A-Z0-9_]+-->', shell), re.findall(r'__[A-Z_]+__|<!--[A-Z0-9_]+-->', shell)
    return shell, n, sum(1 for x in levels for it in x['items'] if it['t'] == 'l')


def main():
    data = json.load(open(os.path.join(T, 'inhalt.json'), encoding='utf-8'))
    check(data)
    sys.path.insert(0, os.path.join(ROOT, 'tools')); import fz; fz.muss(['erwachsene/tools/shell.html'])          # 글자 크기 배율(오른쪽 위 「가」 버튼)을 따르는지
    shell = open(os.path.join(T, 'shell.html'), encoding='utf-8').read()
    date = os.environ.get('ERWACHSENE_DATE') or datetime.date.today().strftime('%Y.%m.%d')
    for book in data['books']:
        d = os.path.join(ROOT, book['id']); os.makedirs(d, exist_ok=True)
        out, n, k = page(book, data, shell, date)
        open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(out)
        json.dump(manifest(book), open(os.path.join(d, 'manifest.webmanifest'), 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
        print('%s: 단계 %d개, 과 %d개 -> %s/index.html (%d bytes)' % (book['mark'], n, k, book['id'], len(out.encode('utf-8'))))
    seo = os.path.join(ROOT, 'tools', 'seo.py')
    if os.path.exists(seo) and '--no-seo' not in sys.argv:
        subprocess.run([sys.executable, seo], check=True)


if __name__ == '__main__':
    main()
