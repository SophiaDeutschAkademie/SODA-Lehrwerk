#!/usr/bin/env python3
"""성인 교재 세 권의 앱 아이콘 만들기.

  python3 erwachsene/tools/icons.py

남색 바탕에 단계 수만큼 막대가 올라가는 그림입니다(청소년 교재 아이콘과 같은 모양).
공통 과정(A1–B1) 여섯 막대는 아이보리입니다. 「성인 독일어 밑바탕」은 이 여섯 막대만 그리고,
B2부터의 두 교재는 그 뒤에 자기 단계 수만큼 교재 색 막대를 더 그립니다(대학생 4개, 직장인 2개).
-> basis/icons/, studium/icons/, beruf/icons/ 에 icon-512.png, icon-192.png, icon-maskable-512.png, apple-touch-icon.png
"""
import json, os
from PIL import Image, ImageDraw

T = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(os.path.dirname(T))
NAVY = (46, 58, 85); IVORY = (251, 248, 241); SS = 4


def rgb(h):
    h = h.lstrip('#'); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def draw(n, common, col, size, pad, round_bg):
    """n: 막대 수, common: 아이보리로 칠할 앞 막대 수, pad: 그림 둘레 여백(크기에 대한 비율)"""
    S = size * SS
    im = Image.new('RGBA', (S, S), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    if round_bg:
        d.rounded_rectangle([0, 0, S - 1, S - 1], radius=int(S * 0.215), fill=NAVY)
    else:
        d.rectangle([0, 0, S, S], fill=NAVY)
    x0, x1 = S * pad, S * (1 - pad); base = S * 0.735; top = S * 0.265
    gap = (x1 - x0) * (0.28 / n) * 1.0
    w = ((x1 - x0) - gap * (n - 1)) / n
    for i in range(n):
        h = (base - top) * (0.16 + 0.84 * i / (n - 1))
        x = x0 + i * (w + gap)
        d.rounded_rectangle([x, base - h, x + w, base], radius=w * 0.22, fill=IVORY if i < common else col)
    return im.resize((size, size), Image.LANCZOS)


def main():
    data = json.load(open(os.path.join(T, 'inhalt.json'), encoding='utf-8'))
    art = {x['id']: x['art'] for x in data['levels']}
    for b in data['books']:
        n = 6 + (0 if art[b['levels'][0]] == 'g' else len(b['levels'])); col = rgb(b['farbe']['daccent'])
        d = os.path.join(ROOT, b['id'], 'icons'); os.makedirs(d, exist_ok=True)
        big = draw(n, 6, col, 512, 0.17, True)
        big.save(os.path.join(d, 'icon-512.png'), optimize=True)
        big.resize((192, 192), Image.LANCZOS).save(os.path.join(d, 'icon-192.png'), optimize=True)
        draw(n, 6, col, 512, 0.24, False).convert('RGB').save(os.path.join(d, 'icon-maskable-512.png'), optimize=True)
        draw(n, 6, col, 180, 0.17, False).convert('RGB').save(os.path.join(d, 'apple-touch-icon.png'), optimize=True)
        print(b['id'], '아이콘 4개')


if __name__ == '__main__':
    main()
