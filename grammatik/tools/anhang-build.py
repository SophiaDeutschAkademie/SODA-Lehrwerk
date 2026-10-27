#!/usr/bin/env python3
"""부록 「암기 노트」(lessons/anhang.json)를 각 과의 표에서 다시 만듭니다.

    python3 grammatik/tools/anhang-build.py

각 과(lessons/L01.json …)에서 아래 PARTS에 적은 블록을 그대로 복사하고,
index.html의 sx-ax(부록 주소)와 sw.js(캐시 목록·VERSION)를 함께 갱신해요.
과의 표를 고친 뒤 이 스크립트를 다시 실행하면 부록도 같은 내용이 됩니다.
필요한 패키지: beautifulsoup4, lxml

Block ids: L03-t1 = lesson 3, first table outside quizzes and traps (counted in
document order, solutions excluded); -d = diagram (.dgm); -k = key callout
(.callout-key); -e = example list (.exl, outside diagrams).
"""
import hashlib, html as H, json, os, re, sys
from bs4 import BeautifulSoup, NavigableString

G = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')) + os.sep

PARTS = [
    ('명사', 'Nomen', [
        (None, ['L01-k1']),
        ('여성 명사의 단서', ['L01-t4']),
        ('남성 명사의 단서', ['L01-t5']),
        ('중성 명사의 단서', ['L01-t6']),
        ('사람 명사의 여성형 -in', ['L01-t3']),
        ('복수형 다섯 가지', ['L02-t2']),
        ('복수형과 움라우트', ['L02-t3']),
        ('복수만 쓰는 명사', ['L02-t6']),
        ('2격 명사 어미', ['L16-t3']),
        ('n-변화 명사', ['L16-t5', 'L16-t6', 'L16-k3']),
        ('동사에서 만든 명사', ['L35-t2']),
        ('형용사에서 만든 명사', ['L35-t3', 'L35-k1']),
    ]),
    ('관사', 'Artikel', [
        ('정관사의 변화', ['L03-t1']),
        ('정관사의 끝글자', ['L03-t2']),
        ('부정관사의 변화', ['L03-t3']),
        ('소유관사 — 누구의 것인지', ['L08-t2']),
        ('소유관사의 변화', ['L08-t3']),
        ('소유관사의 끝', ['L08-t4']),
        ('unser · euer', ['L08-t5']),
        ('kein의 변화', ['L09-t2']),
        ('der-류 관사', ['L22-t2', 'L22-k1']),
        ('dieser의 변화', ['L22-t3']),
        ('관사를 쓰지 않는 경우', ['L01-t9']),
    ]),
    ('대명사', 'Pronomen', [
        ('인칭대명사', ['L04-t4']),
        ('재귀대명사', ['L17-t1']),
        ('소유대명사 — 명사 없이', ['L08-t6']),
        ('der · die · das를 대명사로', ['L22-t4']),
        ('einer · keiner · welche — 명사 없이', ['L22-t7']),
        ('man의 격', ['L22-t5']),
        ('jemand · niemand · etwas · nichts', ['L22-t6']),
        ('관계대명사', ['L29-t2']),
        ('관계사 was · wo · wer', ['L29-t4']),
        ('의문사', ['L06-t1', 'L06-k2']),
        ('wie + 형용사 · 부사', ['L06-t2']),
        ('전치사 + 대명사 — 사람과 사물', ['L14-t8', 'L18-k2']),
    ]),
    ('동사 활용', 'Konjugation', [
        ('현재형 인칭어미', ['L05-t2']),
        ('발음 때문에 모양이 바뀌는 동사', ['L05-t3']),
        ('모음이 바뀌는 동사', ['L05-t4', 'L05-t5']),
        ('sein · haben · werden · wissen', ['L05-t6', 'L05-k1']),
        ('명령형', ['L05-t7']),
        ('du 명령형의 세부 규칙', ['L05-t8']),
        ('화법조동사의 현재형', ['L10-t1']),
        ('화법조동사의 뜻', ['L10-t2']),
        ('nicht müssen과 nicht dürfen', ['L10-t3']),
        ('분리 접두어', ['L11-t1']),
        ('비분리 접두어 여덟 개', ['L11-t2']),
        ('비분리 접두어의 대표 뜻', ['L35-t6']),
        ('분리·비분리가 모두 되는 접두어', ['L11-t4']),
        ('규칙 동사의 과거분사', ['L12-t1']),
        ('ge-의 자리', ['L12-t3', 'L12-k2']),
        ('sein · haben · werden의 과거분사', ['L12-e2']),
        ('haben이냐 sein이냐', ['L12-t4', 'L12-k3']),
        ('과거형 — 규칙 동사', ['L13-t3']),
        ('과거형 — 불규칙 동사', ['L13-t4']),
        ('혼합 동사', ['L13-t6']),
        ('sein · haben · werden의 과거형', ['L13-t7']),
        ('화법조동사의 과거형', ['L13-t8', 'L13-k2']),
        ('불규칙 동사 — 원형 · 과거형 · 과거분사', ['L13-t9']),
        ('같은 모음 패턴끼리 묶어 외우기', ['L13-t10']),
    ]),
    ('시제 · 수동 · 접속법', 'Tempus, Passiv und Konjunktiv', [
        ('과거완료', ['L26-t1']),
        ('werden의 세 가지 쓰임', ['L26-t5']),
        ('수동태의 시제', ['L31-t1', 'L31-k2']),
        ('수동 대신 쓰는 표현', ['L31-t2']),
        ('접속법 II — würde + 원형', ['L30-t2']),
        ('접속법 II — 고유 형태', ['L30-t3', 'L30-k1']),
        ('접속법 II — 그 밖의 고유 형태', ['L30-t4']),
        ('소망', ['L30-t6']),
        ('정중한 부탁과 질문', ['L30-t7']),
        ('조언과 제안', ['L30-t8']),
        ('접속법 I', ['L33-t2', 'L33-k1']),
        ('접속법 I이 직설법과 같을 때', ['L33-t3']),
        ('간접화법의 시제', ['L33-t4']),
    ]),
    ('동사와 함께 쓰는 말', 'Verben und ihre Ergänzungen', [
        ('3격 동사', ['L18-t2']),
        ('사물이 주어, 사람이 3격인 동사', ['L18-t3']),
        ('3격 + 4격 동사', ['L18-t4']),
        ('전치사와 함께 쓰는 동사', ['L18-t5']),
        ('늘 재귀대명사와 쓰는 동사', ['L17-t2']),
        ('재귀로도, 다른 목적어와도 쓰는 동사', ['L17-t3']),
        ('3격 재귀대명사와 쓰는 동사', ['L17-t4']),
        ('재귀동사 + 전치사', ['L17-t5']),
        ('옮기다 · 놓여 있다', ['L15-t2']),
        ('zu 부정형 만들기', ['L28-t2']),
        ('zu 부정형과 함께 쓰는 동사', ['L28-t3']),
        ('명사 + haben / machen', ['L28-t4']),
        ('es ist + 형용사', ['L28-t5']),
        ('zu를 붙이지 않는 원형', ['L28-t6']),
        ('lassen의 뜻', ['L28-t7']),
        ('haben … zu · sein … zu · scheinen … zu', ['L28-t11']),
        ('비인칭 es', ['L18-t7']),
        ('느끼는 상태는 3격', ['L18-t8']),
    ]),
    ('형용사', 'Adjektive', [
        ('어떤 변화를 쓰나요', ['L24-t2']),
        ('약변화 — 정관사 · der-류 뒤', ['L23-t4', 'L23-k2']),
        ('혼합변화 — ein-류 뒤', ['L24-t4', 'L24-k1']),
        ('강변화 — 관사가 없을 때', ['L24-t5', 'L24-k2']),
        ('어미가 붙으면 모양이 바뀌는 형용사', ['L23-t5']),
        ('어미를 붙이지 않는 형용사', ['L23-t6']),
        ('형용사를 명사로', ['L24-t6']),
        ('분사 명사', ['L32-t6']),
        ('비교급과 최상급 — 기본 규칙', ['L25-t2']),
        ('최상급에 -e-를 넣는 형용사', ['L25-e1']),
        ('-el · -er로 끝나는 형용사', ['L25-e2']),
        ('움라우트가 붙는 형용사', ['L25-t3']),
        ('불규칙 비교급 · 최상급', ['L25-t4']),
        ('비교하기 — als와 so … wie', ['L25-t5']),
        ('immer + 비교급 — 점점 더', ['L25-e7']),
        ('je … desto — ~할수록 더', ['L25-e8']),
        ('형용사 + 전치사', ['L34-t2', 'L34-k1']),
        ('명사 + 전치사', ['L34-t3']),
        ('동사 · 형용사 · 명사의 전치사 짝', ['L34-t4']),
        ('형용사를 만드는 접미사', ['L35-t4']),
        ('반대말 un- · miss-', ['L35-t5']),
    ]),
    ('전치사', 'Präpositionen', [
        ('전치사의 네 무리', ['L14-t2']),
        ('늘 4격과 쓰는 전치사', ['L14-t3']),
        ('늘 3격과 쓰는 전치사', ['L14-t5']),
        ('전치사와 관사의 축약형', ['L14-t7']),
        ('3·4격 전치사 — Wo? 3격 · Wohin? 4격', ['L15-t1']),
        ('장소 표현 — 가는 곳 · 있는 곳 · 온 곳', ['L15-t3']),
        ('장소 부사', ['L15-t4']),
        ('hin- · her-', ['L15-t5']),
        ('2격 전치사', ['L16-t4']),
        ('2격 전치사 — 뜻별로', ['L37-t5']),
        ('시간 전치사', ['L07-t10']),
    ]),
    ('접속사와 연결어', 'Konnektoren', [
        ('등위접속사', ['L19-t1']),
        ('접속부사', ['L19-t2']),
        ('denn · deshalb · weil', ['L19-t3']),
        ('aber · trotzdem · sondern', ['L19-t4']),
        ('두 부분 접속사', ['L19-t5']),
        ('종속접속사', ['L20-t2']),
        ('indem · dadurch, dass — ~함으로써 (방법)', ['L20-e2']),
        ('so …, dass — 너무 ~해서 그 결과', ['L20-e3']),
        ('sofern · soweit — ~하는 한, ~라면', ['L20-e4']),
        ('es sei denn · außer wenn — ~하지 않는 한', ['L20-e5']),
        ('als냐 wenn이냐', ['L27-t2', 'L27-k1']),
        ('시간 접속사', ['L27-t3']),
        ('nachdem의 시제', ['L27-t4']),
        ('전치사 · 접속사 · 접속부사', ['L27-t5']),
        ('wann · wenn · als', ['L27-t6']),
        ('um … zu · ohne … zu · statt … zu', ['L28-t8']),
        ('대조', ['L37-t2']),
        ('이유와 결과', ['L37-t3']),
        ('조건과 범위', ['L37-t4']),
        ('zu …, als dass — 너무 ~해서 ~할 수 없다', ['L37-e1']),
        ('außer dass · nur dass · abgesehen davon, dass — ~만 빼면', ['L37-e2']),
        ('접속사 문장과 전치사구', ['L37-t6']),
    ]),
    ('어순과 부정', 'Wortstellung und Negation', [
        ('목적어가 둘일 때', ['L04-t7']),
        ('가운데 자리 — 시간 → 이유 → 방법 → 장소', ['L06-e2']),
        ('종속절의 동사 자리', ['L20-t1']),
        ('nicht의 자리', ['L09-t4']),
        ('Ja · Nein · Doch', ['L09-t5']),
        ('그 밖의 부정어', ['L09-t6', 'L09-k1']),
    ]),
    ('말투와 추측', 'Modalpartikeln und Vermutung', [
        ('명령과 부탁 — mal · doch · bloß · ruhig', ['L21-t3']),
        ('질문 — denn · eigentlich', ['L21-t4']),
        ('아는 사실과 어쩔 수 없는 일 — ja · doch · eben · halt', ['L21-t5']),
        ('안심과 추측 — schon · wohl', ['L21-t6']),
        ('화법조동사 — 주어의 일과 말하는 사람의 판단', ['L36-t1']),
        ('확신의 정도', ['L36-d2', 'L36-t2']),
        ('sollen과 wollen — 남의 말 전하기', ['L36-t3']),
        ('지난 일의 추측', ['L36-t4']),
    ]),
    ('수와 시간', 'Zahlen und Zeit', [
        ('0–12', ['L07-t2']),
        ('13–19', ['L07-t3']),
        ('20–90', ['L07-t4']),
        ('21–99', ['L07-d2']),
        ('100 이상', ['L07-t5', 'L07-k1']),
        ('연도 읽기', ['L07-e1']),
        ('서수', ['L07-t6', 'L07-k2']),
        ('요일과 달', ['L07-t7']),
        ('날짜 말하기', ['L07-t8']),
        ('시각', ['L07-t9']),
        ('가격 · 소수 · 분수 · 횟수', ['L07-t11']),
        ('빈도 부사', ['L06-t3']),
    ]),
]

# Corrections applied to the copies only (the lessons themselves are untouched).
FIXES = {
    'L08-t3': [('mein<span class="x-e">en</span> Eltern<span class="x-e">n</span>',
                'mein<span class="x-e">en</span> Eltern')],
    'L16-t3': [('des Junge<span class="x-e">n</span> (F)', 'des Junge<span class="x-e">n</span>')],
    # wording that only makes sense inside the lesson
    'L14-t2': [('entlang)</td><td>이 과</td>', 'entlang)</td><td>14과</td>'),
               ('außer)</td><td>이 과</td>', 'außer)</td><td>14과</td>'),
               ('um (bis · entlang)</td>', 'um (bis · 명사 뒤의 entlang)</td>')],
    'L36-t1': [('말하는 사람의 판단 (이 과)', '말하는 사람의 판단 (36과)')],
    'L07-k2': [('<br/>지금은 두 가지만 기억해요', '<br/>두 가지만 기억해요')],
    # proofreading of the appendix (the same spots are in the lessons)
    'L19-t2': [('<tr><td>반대 — 그 대신</td><td>stattdessen · jedoch</td><td>Er hat nicht gelernt, <strong>stattdessen</strong> hat er gespielt.</td></tr>',
                '<tr><td>반대 — 그 대신</td><td>stattdessen</td><td>Er hat nicht gelernt, <strong>stattdessen</strong> hat er gespielt.</td></tr>'
                '<tr><td>대조 — 그러나</td><td>jedoch</td><td>Die Wohnung ist schön, <strong>jedoch</strong> ist sie zu klein.</td></tr>')],
    'L05-t8': [('<td>바뀐 모음 그대로, -st만 빼요</td>', '<td>바뀐 모음 그대로, du 형에서 -st를 빼요 (어간이 -s·-ss로 끝나면 -t만)</td>')],
    'L34-k1': [('an·vor·in은 낱말마다 다르니 격까지 함께 외워요', 'vor는 늘 3격이고, an·in은 낱말마다 다르니 격까지 함께 외워요')],
    'L30-t8': [('wenn du früher kommst.', 'wenn du früher kommen würdest.')],
    'L34-t3': [('Ich habe eine <strong>Bitte um</strong> Hilfe.', 'Er hat meine <strong>Bitte um</strong> Hilfe ignoriert.')],
    'L11-t4': [('<strong>Ü</strong>bersetzen', '<strong>ÜBER</strong>setzen')],
    'L07-t8': [('Vom wievielten bis zum wievielten?', 'Vom Wievielten bis zum Wievielten?')],
    'L27-t6': [("종속접속사 — 과거의 한 번 / 비교의 '~\u2060보다'", "종속접속사 — 과거의 한 번 / 비교의 말 — '~\u2060보다'")],
}

# Declension tables whose phone-layout labels are long: label goes above the value.
LONG_LABELS = ['L16-t6', 'L24-t6']


# ── locate blocks ────────────────────────────────────────────────────────────
_cache = {}


def lesson_blocks(n):
    if n not in _cache:
        h = json.load(open(G + 'lessons/L%02d.json' % n, encoding='utf8'))
        soup = BeautifulSoup(h, 'lxml')
        found, counters = {}, {}
        for sec in soup.find_all('section'):
            if sec.get('id', '') == 'solutions':
                continue
            for el in sec.descendants:
                if isinstance(el, NavigableString) or el.name is None:
                    continue
                if el.find_parent(class_=['quiz-block', 'trap', 'qi']):
                    continue
                cls = el.get('class') or []
                kind = None
                if el.name == 'table':
                    kind = 't'
                elif 'dgm' in cls:
                    kind = 'd'
                elif 'callout-key' in cls:
                    kind = 'k'
                elif el.name == 'div' and 'exl' in cls and not el.find_parent(class_='dgm'):
                    kind = 'e'
                if kind:
                    counters[kind] = counters.get(kind, 0) + 1
                    found['L%02d-%s%d' % (n, kind, counters[kind])] = el
        _cache[n] = found
    return _cache[n]


def block_html(bid):
    el = lesson_blocks(int(bid[1:3]))[bid]
    if el.name == 'table':
        wrap = el.parent
        s = str(wrap) if wrap is not None and 'tbl-wrap' in (wrap.get('class') or []) else '<div class="tbl-wrap">' + str(el) + '</div>'
    else:
        s = str(el)
    if bid in LONG_LABELS:
        s = s.replace('<table class="decl-m">', '<table class="decl-m ax-lab">', 1)
    for old, new in FIXES.get(bid, []):
        if old in s:
            s = s.replace(old, new, 1)
        elif new not in s:
            print('  note: %s — text to correct not found (fixed in the lesson already?): %s' % (bid, old))
    return s


def chip(n):
    return '<a class="ax-src" href="#/L%02d" aria-label="Lektion %02d로 가기">%d과</a>' % (n, n, n)


def main():
    l1 = json.load(open(G + 'lessons/L01.json', encoding='utf8'))
    brand_bar = re.search(r'<div class="brand-bar">.*?</div></div>', l1).group(0)
    brand_foot = re.search(r'<div class="brand-foot">.*?</div></div>$', l1).group(0)
    icon = ('<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" '
            'stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 3.5h11v17l-5.5-3.8-5.5 3.8z"></path>'
            '<path d="M9.5 8h5M9.5 11h5"></path></svg>')
    toc = ''.join('<li><a href="#/anhang" data-jump="ax-%d"><b>%d</b><span>%s</span></a></li>' % (i, i, H.escape(ko))
                  for i, (ko, de, items) in enumerate(PARTS, 1))
    page = [brand_bar,
            '<header class="lk-hd"><div class="lk-topic">' + icon + '</div>'
            '<div class="lk-kicker">Anhang</div><h1>암기 노트</h1>'
            '<div class="lk-de">Das Wichtigste zum Auswendiglernen</div>'
            '<div class="lk-intro">1과부터 37과까지 나온 변화표와 목록 가운데 외워 두어야 할 것만 골라 주제별로 모았어요.<br>'
            '제목 옆의 과 번호를 누르면 그 과로 가서 설명을 다시 볼 수 있어요.'
            '<nav class="ax-toc" id="ax-toc" aria-label="부록 차례"><div class="ax-toc-t">차례</div><ol>' + toc + '</ol></nav>'
            '</div></header>']
    for i, (ko, de, items) in enumerate(PARTS, 1):
        page.append('<section id="ax-%d"><div class="sh"><span class="sl">%d</span><h2>%s<span class="ax-de">%s</span></h2></div>'
                    % (i, i, H.escape(ko), H.escape(de)))
        for title, bids in items:
            if title:
                page.append('<h3>%s%s</h3>' % (H.escape(title), chip(int(bids[0][1:3]))))
            page.extend(block_html(b) for b in bids)
        page.append('<p class="ax-up" data-no-print><a href="#/anhang" data-jump="ax-toc">차례로 ↑</a></p></section>')
    page.append(brand_foot)
    out = json.dumps(''.join(page), ensure_ascii=False)
    open(G + 'lessons/anhang.json', 'w', encoding='utf8').write(out)
    ax_hash = hashlib.sha256(out.encode('utf8')).hexdigest()[:10]

    idx = open(G + 'index.html', encoding='utf8').read()
    meta = {'ko': '암기 노트', 'de': 'Anhang · Das Wichtigste zum Auswendiglernen',
            'title': '부록 · 암기 노트', 'src': 'lessons/anhang.json?v=' + ax_hash}
    tag = '<script type="application/json" id="sx-ax">' + json.dumps(meta, ensure_ascii=False, separators=(',', ':')) + '</script>'
    idx, n = re.subn(r'<script type="application/json" id="sx-ax">.*?</script>', lambda m: tag, idx)
    assert n == 1, 'sx-ax script missing in index.html'

    # every file name carries ?v=<sha256 of the file>; keep the lesson ones right too
    def fresh(m):
        path = m.group(1)
        return '%s?v=%s' % (path, hashlib.sha256(open(G + path, 'rb').read()).hexdigest()[:10])
    idx = re.sub(r'(lessons/L\d{2}\.json)\?v=[0-9a-f]+', fresh, idx)
    open(G + 'index.html', 'w', encoding='utf8').write(idx)

    sw = open(G + 'sw.js', encoding='utf8').read()
    sw, n = re.subn(r'"lessons/anhang\.json\?v=[0-9a-f]+"', '"lessons/anhang.json?v=' + ax_hash + '"', sw)
    assert n == 1, 'anhang.json missing in sw.js'
    sw = re.sub(r'(lessons/L\d{2}\.json)\?v=[0-9a-f]+', fresh, sw)
    lists = re.findall(r'"([^"]+\?v=[0-9a-f]+)"', sw)
    ver = hashlib.sha256(('\n'.join(lists) + hashlib.sha256(idx.encode('utf8')).hexdigest()).encode()).hexdigest()[:10]
    sw = re.sub(r"const VERSION = '[0-9a-f]+';", "const VERSION = '%s';" % ver, sw)
    open(G + 'sw.js', 'w', encoding='utf8').write(sw)
    print('anhang.json %s (%d bytes), sw VERSION %s' % (ax_hash, len(out.encode('utf8')), ver))


if __name__ == '__main__':
    main()
