#!/usr/bin/env python3
"""교재 화면의 글자 크기 배율(오른쪽 위 「가」 버튼)에 맞게 CSS의 font-size 를 적는 도구.

교재(어린이, 청소년, 성인, 대학생, 직장인)의 CSS는 글자 크기를 px 그대로 적지 않고 배율 변수를 곱해 적습니다.

  font-size:calc(17px*var(--fz))     본문 글자. 작게 .9 / 보통 1 / 크게 1.15 / 아주 크게 1.3
  font-size:calc(32px*var(--fzh))    큰 제목(26px 이상). 배율의 절반쯤만 따라갑니다
  font-size:14px/*고정*/              배율을 따르지 않는 글자. 크기가 정해진 동그라미·계단 안의 글자, 그림 칸 안의 글자 등

배율은 화면의 버튼(교재마다 tools/blocks/soda-fz.html)이 <html data-fz="s|l|xl"> 로 정하고, 변수 값도 그 조각에 있습니다.

실행 (저장소 어디에서나)
  python3 tools/fz.py            위 세 가지가 아닌 font-size 가 있으면 알려 주고 1로 끝납니다. 교재 빌드가 부릅니다
  python3 tools/fz.py --write    px 그대로인 font-size 를 아래 규칙대로 바꿔 씁니다 (FEST 에 맞으면 고정, 26px 이상은 --fzh, 나머지는 --fz)
  python3 tools/fz.py --list     모든 font-size 와 분류를 보여 줍니다

CSS를 고칠 때: 새 글자 크기는 위 세 가지 가운데 하나로 적습니다. px 로만 적었다면 --write 를 한 번 돌리면 됩니다.
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MARK = '/*고정*/'
BIG = 26.0          # 이 크기부터는 큰 제목으로 보고 --fzh 를 곱한다

# 배율을 따르지 않는 글자: 선택자(쉼표로 나눈 하나하나)가 아래 정규식에 맞으면 고정
FEST_LEKTION = [
    r'^\.st$',                      # 머리의 순서 계단(높이가 정해져 있음)
    r'^\.zurueck$',                 # 머리의 「교재 목차」
    r'^\.dk$', r'^\.av-t$',         # 동그라미 안의 숫자·머리글자
    r'^\.it::before$',              # 문제 번호
    r'^\.fuss \.btn$',              # 아래에 고정된 이전·다음 단추
]
FEST_TOC = [
    r'^h1$',                                                # 표지의 교재 이름
    r'^\.step$', r'^\.groups div$', r'^\.groups b$',        # 단계 계단과 그 아래 이름
    r'^\.teile li::before$',                                # 동그라미 안의 숫자
    r'^\.p-name$',                                          # 단계 이름(한 줄에 들어가야 함)
    r'^\.syn a$',                                           # 높이가 정해진 작은 알약
]
FEST_KINDER = [
    r'^\.back$',                                            # 머리의 뒤로 가기
    r'^\.cover-', r'^\.bubble$', r'^\.cta$',                # 표지
    r'^\.step$', r'^\.rowk-n$', r'^\.me-av$',               # 순서 단추, 동그라미 안의 숫자
    r'\.cp-num b$', r'\.cp-wort b$', r'^\.face$',           # 그림 칸 안의 숫자·낱말, 짝 맞추기 카드
    r'^\.ltr-big$', r'^\.trace-word$',                      # 큰 글자, 따라 쓰는 글자
    r'^\.urk', r'^\.note summary::after$',                  # 수료증, 접기 표시
    r'^\.ch-nav \.btn$',                                    # 아래에 고정된 단추
]
FILES = [
    ('jugend/lektion.css', FEST_LEKTION),
    ('erwachsene/lektion.css', FEST_LEKTION),
    ('jugend/tools/shell.html', FEST_TOC),
    ('erwachsene/tools/shell.html', FEST_TOC),
    ('kinder/tools/shell.html', FEST_KINDER),
]

DECL = re.compile(r'font-size\s*:\s*([^;{}]+?)(\s*!important)?(?=\s*(?:;|$))')        # 규칙 몸통 안에서: 값은 ; 또는 몸통 끝까지
RULE = re.compile(r'([^{}]*)\{([^{}]*)\}')


def css_span(path, text):
    """(시작, 끝): 이 파일에서 CSS 가 있는 자리. HTML 은 첫 <style> 만(공통 조각이 들어가는 뒤쪽 <style> 과 스크립트는 건드리지 않는다)."""
    if path.endswith('.css'):
        return 0, len(text)
    a = text.index('<style>') + len('<style>')
    return a, text.index('</style>', a)


def kind(value):
    v = value.strip()
    if 'var(--fz)' in v or 'var(--fzh)' in v:
        return 'ok'
    if v.endswith(MARK):
        return 'fest'
    return 'roh'


def groesse(value):
    """px 값. clamp(a,b,c) 는 가장 큰 값."""
    nums = [float(x) for x in re.findall(r'([0-9.]+)px', value)]
    return max(nums) if nums else 0.0


def sel_of(raw):
    s = re.sub(r'/\*.*?\*/', '', raw, flags=re.S)
    return s.strip()


def is_fest(selector, fest):
    parts = [p.strip() for p in selector.split(',') if p.strip()]
    hit = [any(re.search(rx, p) for rx in fest) for p in parts]
    if any(hit) and not all(hit):
        raise SystemExit('fz: 한 규칙 안에 고정과 배율이 섞였습니다. 규칙을 나눠 적어 주세요: %s' % selector)
    return bool(hit) and all(hit)


def walk(path, fest, write=False, show=False):
    full = os.path.join(ROOT, path)
    text = open(full, encoding='utf-8').read()
    a, b = css_span(path, text)
    css = text[a:b]
    assert not re.search(r'/\*[^*]*[{}][^*]*\*/', css), path + ': 주석 안의 중괄호는 읽지 못합니다'
    bad = []
    counts = {'ok': 0, 'fest': 0, 'roh': 0}

    def rule(m):
        sel, body = sel_of(m.group(1)), m.group(2)
        if 'font-size' not in body:
            return m.group(0)

        def decl(d):
            val, imp = d.group(1), d.group(2) or ''
            k = kind(val)
            counts[k] += 1
            v = val.strip()
            plan = k if k != 'roh' else ('고정' if is_fest(sel, fest) else '--fzh' if groesse(v) >= BIG else '--fz')
            if show:
                print('  %-5s %-60s %s' % (plan + ('' if k != 'roh' else '?'), sel[:60], v + imp.strip()))
            if k != 'roh':
                return d.group(0)
            if not write:
                bad.append((sel, v))
                return d.group(0)
            if plan == '고정':
                return 'font-size:%s%s%s' % (v, MARK, imp)
            return 'font-size:calc(%s*var(%s))%s' % (v, plan, imp)

        return m.group(1) + '{' + DECL.sub(decl, body) + '}'

    new = RULE.sub(rule, css)
    if write and new != css:
        open(full, 'w', encoding='utf-8').write(text[:a] + new + text[b:])
    return counts, bad


def check(paths=None):
    """교재 빌드가 부른다. 배율 표시가 없는 font-size 가 있으면 [(파일, 선택자, 값)] 을 돌려준다."""
    out = []
    for path, fest in FILES:
        if paths and path not in paths:
            continue
        _, bad = walk(path, fest)
        out += [(path, s, v) for s, v in bad]
    return out


def muss(paths):
    """교재 빌드의 첫 줄에서 부른다. 배율 표시가 없는 font-size 가 있으면 알려 주고 멈춘다."""
    bad = check(paths)
    for path, s, v in bad:
        print('  %s: %s { font-size:%s }' % (path, s, v))
    if bad:
        sys.exit('글자 크기(오른쪽 위 「가」 버튼)가 닿지 않는 font-size 가 있습니다. python3 tools/fz.py --write 로 바꾸거나 %s 를 붙여 주세요.' % MARK)


def main(argv):
    write, show = '--write' in argv, '--list' in argv
    fail = 0
    for path, fest in FILES:
        if show:
            print(path)
        counts, bad = walk(path, fest, write=write, show=show)
        print('fz: %-30s 배율 %3d, 고정 %3d%s' % (path, counts['ok'], counts['fest'], (', 바꿈 %d' % counts['roh']) if write and counts['roh'] else ''))
        for s, v in bad:
            fail += 1
            print('   font-size 가 px 그대로입니다: %s { font-size:%s }' % (s, v))
    if fail:
        print('fz: %d곳. python3 tools/fz.py --write 로 바꾸거나 %s 를 붙여 주세요.' % (fail, MARK))
    return 1 if fail else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
