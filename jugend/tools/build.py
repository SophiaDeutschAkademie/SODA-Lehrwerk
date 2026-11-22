#!/usr/bin/env python3
"""SODA Jugendliche (청소년 독일어 발돋움) 목차 페이지 빌드.

tools/inhalt.json(단계와 과 목록) + tools/shell.html(화면 틀) + tools/blocks(공통 조각)
-> jugend/index.html

실행: python3 jugend/tools/build.py   (끝에 저장소 tools/seo.py 를 부릅니다)
"""
import datetime, html, json, os, re, subprocess, sys

T = os.path.dirname(os.path.abspath(__file__))
J = os.path.dirname(T)
ROOT = os.path.dirname(J)
esc = lambda s: html.escape(s, quote=True)


def de(s):
    """독일어 줄: 붙임표가 든 말(W-Fragen, D-A-CH)이 줄 끝에서 갈라지지 않게 묶는다."""
    return ' '.join('<span class="nb">%s</span>' % esc(w) if re.search(r'\w-\w', w) else esc(w) for w in s.split(' '))


def rd(name):
    return open(os.path.join(T, 'blocks', name), encoding='utf-8').read()


def check(data):
    ids = [lv['id'] for lv in data['levels']]
    assert len(ids) == len(set(ids)) == 6, ids
    for lv in data['levels']:
        kinds = [it['t'] for it in lv['items']]
        assert kinds.count('l') == 8 and kinds.count('s') == 2 and kinds.count('t') == 1, (lv['id'], kinds)
        assert len(lv['kann']) == 3, lv['id']
        for it in lv['items']:
            for k in (('de', 'ko', 'ziel', 'gr') if it['t'] == 'l' else ('de', 'txt')):
                assert it.get(k, '').strip(), (lv['id'], it)
    blob = json.dumps(data, ensure_ascii=False)
    assert 'von Beruf?' not in blob          # 쓰지 않기로 한 표현
    assert '_' not in blob


def stairs(data):
    out = []
    for i, lv in enumerate(data['levels']):
        out.append('        <button type="button" role="tab" class="step" id="tab-%s" aria-controls="p-%s" aria-selected="%s" aria-label="%s" style="--i:%d">%s</button>'
                   % (lv['id'], lv['id'], 'true' if i == 0 else 'false', esc('%s %s, %s' % (lv['code'], lv['de'], lv['ko'])), i, esc(lv['code'])))
    return '\n'.join(out)


def groups(data):
    codes = []
    for lv in data['levels']:
        c = lv['code'].split('.')[0]
        if c not in codes:
            codes.append(c)
    return '\n'.join('        <div><b>%s</b></div>' % esc(c) for c in codes)


def item(it, n):
    if it['t'] == 'l':
        return ('      <li class="lek"><span class="num">%d</span><div><h3><span class="de" lang="de">%s</span><span class="ko">%s</span></h3>'
                '<dl><div><dt>말하기</dt><dd>%s</dd></div><div><dt>문법</dt><dd class="gr">%s</dd></div></dl></div></li>'
                % (n, de(it['de']), esc(it['ko']), esc(it['ziel']), de(it['gr'])))
    if it['t'] == 's':
        head, _, rest = it['txt'].partition(': ')
        return '      <li class="sta"><b lang="de">%s</b><i>복습과 프로젝트</i><p><span lang="de">%s</span>: %s</p></li>' % (esc(it['de']), esc(head), esc(rest))
    return '      <li class="tst"><b lang="de">%s</b><i>%s</i><p>%s</p></li>' % (esc(it['de']), esc(it['ko']), esc(it['txt']))


def panels(data):
    out = []
    for lv in data['levels']:
        n = 0
        rows = []
        for it in lv['items']:
            if it['t'] == 'l':
                n += 1
            rows.append(item(it, n))
        out.append(
            '    <article class="panel" id="p-{id}" role="tabpanel" aria-labelledby="tab-{id}">\n'
            '     <div class="p-info">\n'
            '      <p><span class="p-code">{code}</span></p>\n'
            '      <h2 class="p-name" lang="de">{de}</h2>\n'
            '      <p class="p-ko">{ko}</p>\n'
            '      <p class="p-lead">{lead}</p>\n'
            '      <h3>이 단계를 마치면</h3>\n'
            '      <ul class="kann">{kann}</ul>\n'
            '      <dl><div><dt>읽고 쓰는 글</dt><dd>{text}</dd></div><div><dt>문화</dt><dd>{kultur}</dd></div></dl>\n'
            '     </div>\n'
            '     <ol class="leks">\n{rows}\n     </ol>\n'
            '    </article>'.format(id=lv['id'], code=esc(lv['code']), de=esc(lv['de']), ko=esc(lv['ko']), lead=esc(lv['lead']),
                                    kann=''.join('<li>%s</li>' % esc(k) for k in lv['kann']), text=esc(lv['text']), kultur=esc(lv['kultur']),
                                    rows='\n'.join(rows)))
    return '\n'.join(out)


def main():
    data = json.load(open(os.path.join(T, 'inhalt.json'), encoding='utf-8'))
    check(data)
    shell = open(os.path.join(T, 'shell.html'), encoding='utf-8').read()
    date = os.environ.get('JUGEND_DATE') or datetime.date.today().strftime('%Y.%m.%d')
    rep = (
        ('<!--SODA_THEME_JS-->', rd('soda-theme-js.html')),
        ('/*SODA_DARK_SHARED*/', rd('soda-dark-shared.css')),
        ('<!--A2HS-->', rd('a2hs.html')),
        ('<!--STAIRS-->', stairs(data)),
        ('<!--GROUPS-->', groups(data)),
        ('<!--PANELS-->', panels(data)),
        ('<!--AUFBAU-->', '\n'.join('        <li><div><b lang="de">%s</b><span>%s</span></div></li>' % (esc(a['de']), esc(a['ko'])) for a in data['aufbau'])),
        ('<!--EXTRAS-->', '\n'.join('        <li><b lang="de">%s</b><span>%s</span></li>' % (esc(a['de']), esc(a['ko'])) for a in data['extras'])),
        ('__IDS__', json.dumps([lv['id'] for lv in data['levels']])),
        ('__DATE__', date),
    )
    for a, b in rep:
        assert shell.count(a) == 1, a
        shell = shell.replace(a, b)
    open(os.path.join(J, 'index.html'), 'w', encoding='utf-8').write(shell)
    n = sum(1 for lv in data['levels'] for it in lv['items'] if it['t'] == 'l')
    print('jugend: 단계 %d개, 과 %d개 -> index.html (%d bytes)' % (len(data['levels']), n, len(shell.encode('utf-8'))))
    seo = os.path.join(ROOT, 'tools', 'seo.py')
    if os.path.exists(seo) and '--no-seo' not in sys.argv:
        subprocess.run([sys.executable, seo], check=True)


if __name__ == '__main__':
    main()
