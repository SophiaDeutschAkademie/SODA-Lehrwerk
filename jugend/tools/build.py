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


def open_ids():
    """본문이 올라온 화면의 이름 (tools/lektion.py site 가 적어 둔 tools/open.json)"""
    p = os.path.join(T, 'open.json')
    return set(json.load(open(p))['open']) if os.path.exists(p) else set()


OPEN = open_ids()


def ohne_audio():
    """음성을 아직 만들지 않은 단계 (tools/status.json 의 ohne_audio)"""
    p = os.path.join(T, 'status.json')
    try:
        return set(json.load(open(p, encoding='utf-8')).get('ohne_audio') or [])
    except (OSError, ValueError):
        return set()


NA = ohne_audio()


def lv_open(lv):
    return any(x.startswith(lv['id'] + '/') for x in OPEN)


def stairs(data):
    out = []
    for i, lv in enumerate(data['levels']):
        on = lv_open(lv)
        out.append('        <button type="button" role="tab" class="step%s" id="tab-%s" aria-controls="p-%s" aria-selected="%s" aria-label="%s" style="--i:%d">%s</button>'
                   % (' offen' if on else '', lv['id'], lv['id'], 'true' if i == 0 else 'false',
                      esc('%s %s, %s%s' % (lv['code'], lv['de'], lv['ko'], ', 본문 공개' if on else '')), i, esc(lv['code'])))
    return '\n'.join(out)


def groups(data):
    codes = []
    for lv in data['levels']:
        c = lv['code'].split('.')[0]
        if c not in codes:
            codes.append(c)
    return '\n'.join('        <div><b>%s</b></div>' % esc(c) for c in codes)


def item(it, n, pid):
    """pid: 이 줄의 화면 이름(a1-1/3, a1-1/station-1, a1-1/stufentest). 본문이 올라와 있으면 그 화면으로 가는 줄이 된다."""
    on = pid in OPEN; attr = (' auf" data-id="%s' % pid) if on else ''; stat = '<span class="stat"></span>' if on else ''
    if it['t'] == 'l':
        name = ('<a class="de" lang="de" href="%s/">%s</a>' % (pid, de(it['de']))) if on else '<span class="de" lang="de">%s</span>' % de(it['de'])
        return ('      <li class="lek%s"><span class="num">%d</span><div><h3>%s<span class="ko">%s</span>%s</h3>'
                '<dl><div><dt>말하기</dt><dd>%s</dd></div><div><dt>문법</dt><dd class="gr">%s</dd></div></dl></div></li>'
                % (attr, n, name, esc(it['ko']), stat, esc(it['ziel']), de(it['gr'])))
    name = ('<a href="%s/">%s</a>' % (pid, esc(it['de']))) if on else esc(it['de'])
    if it['t'] == 's':
        head, _, rest = it['txt'].partition(': ')
        return '      <li class="sta%s"><b lang="de">%s</b><i>복습과 프로젝트</i>%s<p><span lang="de">%s</span>: %s</p></li>' % (attr, name, stat, esc(head), esc(rest))
    return '      <li class="tst%s"><b lang="de">%s</b><i>%s</i>%s<p>%s</p></li>' % (attr, name, esc(it['ko']), stat, esc(it['txt']))


def panels(data):
    out = []
    for lv in data['levels']:
        n = 0; s = 0
        rows = []
        for it in lv['items']:
            if it['t'] == 'l':
                n += 1; pid = '%s/%d' % (lv['id'], n)
            elif it['t'] == 's':
                s += 1; pid = '%s/station-%d' % (lv['id'], s)
            else:
                pid = lv['id'] + '/stufentest'
            rows.append(item(it, n, pid))
        if lv['id'] + '/1' in OPEN:
            go = '      <p class="p-go"><a class="btn" href="%s/1/" data-go="%s">Lektion 1 시작하기</a></p>\n' % (lv['id'], lv['id'])
            if lv['id'] in NA:
                go += '      <p class="p-wart">이 단계의 음성은 준비 중이에요. 지금은 글과 그림으로 볼 수 있어요.</p>\n'
        else:
            go = '      <p class="p-wart">이 단계의 본문은 준비 중이에요. 지금은 목차만 볼 수 있어요.</p>\n'
        out.append(
            '    <article class="panel" id="p-{id}" role="tabpanel" aria-labelledby="tab-{id}">\n'
            '     <div class="p-info">\n'
            '      <p><span class="p-code">{code}</span></p>\n'
            '      <h2 class="p-name" lang="de">{de}</h2>\n'
            '      <p class="p-ko">{ko}</p>\n'
            '      <p class="p-lead">{lead}</p>\n{go}'
            '      <h3>이 단계를 마치면</h3>\n'
            '      <ul class="kann">{kann}</ul>\n'
            '      <dl><div><dt>읽고 쓰는 글</dt><dd>{text}</dd></div><div><dt>문화</dt><dd>{kultur}</dd></div></dl>\n'
            '     </div>\n'
            '     <ol class="leks">\n{rows}\n     </ol>\n'
            '    </article>'.format(id=lv['id'], code=esc(lv['code']), de=esc(lv['de']), ko=esc(lv['ko']), lead=esc(lv['lead']),
                                    kann=''.join('<li>%s</li>' % esc(k) for k in lv['kann']), text=esc(lv['text']), kultur=esc(lv['kultur']),
                                    rows='\n'.join(rows), go=go))
    return '\n'.join(out)


def note(data):
    codes = [lv['code'] for lv in data['levels'] if lv_open(lv)]
    if not codes:
        return '지금은 목차만 볼 수 있어요. 본문은 A1.1부터 차례로 올라와요.'
    if len(codes) == len(data['levels']):
        return '모든 단계의 본문을 볼 수 있어요.'
    return '%s 본문을 볼 수 있어요. 나머지 단계는 차례로 올라와요.' % ', '.join(codes)


def main():
    data = json.load(open(os.path.join(T, 'inhalt.json'), encoding='utf-8'))
    check(data)
    sys.path.insert(0, os.path.join(ROOT, 'tools')); import fz; fz.muss(['jugend/tools/shell.html'])          # 글자 크기 배율(오른쪽 위 「가」 버튼)을 따르는지
    shell = open(os.path.join(T, 'shell.html'), encoding='utf-8').read()
    date = os.environ.get('JUGEND_DATE') or datetime.date.today().strftime('%Y.%m.%d')
    rep = (
        ('<!--SODA_THEME_JS-->', rd('soda-theme-js.html')),
        ('<!--SODA_FZ-->', rd('soda-fz.html')),
        ('/*SODA_DARK_SHARED*/', rd('soda-dark-shared.css')),
        ('<!--A2HS-->', rd('a2hs.html')),
        ('<!--STAIRS-->', stairs(data)),
        ('<!--GROUPS-->', groups(data)),
        ('<!--PANELS-->', panels(data)),
        ('<!--NOTE-->', note(data)),
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
