#!/usr/bin/env python3
"""교재 페이지 넘김 보기(pager.js)를 고친 뒤 실행합니다.

    python3 grammatik/tools/pager-build.py

pager.js는 핸드폰에서 교재의 과를 책처럼 한 페이지씩 넘겨 보게 하는 스크립트예요.
이 스크립트는 pager.js의 내용으로 ?v= 값을 다시 계산해서 index.html의 <script src="pager.js?v=…">와
sw.js의 오프라인 목록(CORE)·VERSION을 함께 갱신해요. 실행하지 않으면 학생 기기에 이전 pager.js가 계속 남아요.
index.html의 앱 스크립트만 고친 경우에도 실행하면 sw.js의 VERSION이 맞춰져요.
"""
import hashlib, os, re

G = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')) + os.sep


def main():
    hv = hashlib.sha256(open(G + 'pager.js', 'rb').read()).hexdigest()[:10]

    idx = open(G + 'index.html', encoding='utf8').read()
    idx, n = re.subn(r'<script src="pager\.js\?v=[0-9a-f]+"></script>', '<script src="pager.js?v=%s"></script>' % hv, idx)
    assert n == 1, 'index.html에 <script src="pager.js?v=…"> 줄이 없어요'
    open(G + 'index.html', 'w', encoding='utf8').write(idx)

    sw = open(G + 'sw.js', encoding='utf8').read()
    sw, n = re.subn(r'"pager\.js\?v=[0-9a-f]+"', '"pager.js?v=%s"' % hv, sw)
    assert n == 1, 'sw.js의 CORE에 pager.js가 없어요'
    # 다른 빌드 스크립트와 같은 식: 캐시 목록 전체와 index.html의 내용으로 VERSION을 정해요
    lists = re.findall(r'"([^"]+\?v=[0-9a-f]+)"', sw)
    ver = hashlib.sha256(('\n'.join(lists) + hashlib.sha256(idx.encode('utf8')).hexdigest()).encode()).hexdigest()[:10]
    sw = re.sub(r"const VERSION = '[0-9a-f]+';", "const VERSION = '%s';" % ver, sw)
    open(G + 'sw.js', 'w', encoding='utf8').write(sw)
    print('pager.js %s · sw VERSION %s' % (hv, ver))


if __name__ == '__main__':
    main()
