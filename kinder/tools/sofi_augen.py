#!/usr/bin/env python3
"""Sofi의 눈 그리기.

  python3 kinder/tools/sofi_augen.py [kinder 폴더]

생성한 Sofi 그림의 눈은 남색 타원뿐이라 눈이 없는 것처럼 보입니다. 이 도구가 눈마다 호박색 홍채 고리와
흰 반짝임 두 개를 덧그립니다. 원래의 남색 타원은 테두리와 눈동자로 남습니다.
고치는 그림: img/c/sofi_hallo, sofi_super, sofi_hoer(.webp 와 _a.webp), img/c/av_sofi.webp, icons/ 의 아이콘 네 개.
sofi_schlaf 는 눈을 감고 있어서 그대로 둡니다. 이미 눈이 그려진 그림은 건너뜁니다.
"""
import os, sys, importlib.util
import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

T = os.path.dirname(os.path.abspath(__file__))
K = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else os.path.dirname(T)
SS = 8                              # 덧그릴 때의 확대 배율 (줄이면서 가장자리가 부드러워집니다)
IRIS = (210, 162, 86, 255)          # 홍채: 부리와 같은 계열의 호박색
GLANZ = (255, 253, 248, 255)        # 반짝임
R_IRIS, R_PUP = 0.86, 0.58          # 눈 반지름에 대한 홍채의 바깥, 안쪽 반지름
SHADE = np.array([0.80, 0.77, 0.72])                    # hoer 자세: 날개 그늘에 든 쪽
HOER = dict(disc=(237.6, 91.9, 15.3, 17.6), shade_from=243.8)   # hoer 자세의 뜬 눈 (그늘과 날개에 닿아 있어 자리를 적어 둡니다)


def find_discs(im, lo=25, hi=4000):
    """짙은 남색 타원을 찾습니다: [(cx, cy, rx, ry)]"""
    a = np.asarray(im.convert('RGB')).astype(int); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    lab, n = ndi.label((r < 75) & (g < 85) & (b < 115)); out = []
    for i in range(1, n + 1):
        ys, xs = np.nonzero(lab == i); area = len(ys)
        if not lo <= area <= hi: continue
        w = xs.max() - xs.min() + 1; h = ys.max() - ys.min() + 1
        if 0.70 <= area / (w * h) <= 0.88 and 0.7 <= w / h <= 1.3:
            out.append(((xs.min() + xs.max() + 1) / 2, (ys.min() + ys.max() + 1) / 2, w / 2, h / 2))
    return sorted(out)


def ocker(px):
    r, g, b = [int(v) for v in px[:3]]
    return r > 150 and b < 150 and r - b > 55


def painted(im, disc):
    """이 자리에 이미 홍채가 있는가: 타원의 안쪽 고리 자리와 바로 바깥을 살핍니다."""
    a = np.asarray(im.convert('RGB')); cx, cy, rx, ry = disc; H, W = a.shape[:2]; hit = 0
    for k in (0.72, 1.3):
        for dx, dy in ((-1, 0), (0, -1), (0, 1), (-0.7, -0.7), (-0.7, 0.7)):
            x = int(round(cx + dx * rx * k)); y = int(round(cy + dy * ry * k))
            if 0 <= x < W and 0 <= y < H and ocker(a[y, x]): hit += 1
    return hit >= 2


def overlay(size, discs):
    W, H = size
    big = Image.new('RGBA', (W * SS, H * SS), (0, 0, 0, 0)); d = ImageDraw.Draw(big)
    def ell(cx, cy, rx, ry, col):
        d.ellipse([(cx - rx) * SS, (cy - ry) * SS, (cx + rx) * SS, (cy + ry) * SS], fill=col)
    for cx, cy, rx, ry in discs:
        ell(cx, cy, rx * R_IRIS, ry * R_IRIS, IRIS)
        ell(cx, cy, rx * R_PUP, ry * R_PUP, (0, 0, 0, 0))           # 눈동자 자리는 비워 원래 남색을 둡니다
    for cx, cy, rx, ry in discs:
        ell(cx - rx * 0.30, cy - ry * 0.33, rx * 0.27, rx * 0.27, GLANZ)      # 큰 반짝임, 왼쪽 위
        ell(cx + rx * 0.33, cy + ry * 0.36, rx * 0.115, rx * 0.115, GLANZ)    # 작은 반짝임, 오른쪽 아래
    arr = np.asarray(big).astype(np.float64); al = arr[..., 3:4] / 255.0; arr[..., :3] *= al
    pm = Image.fromarray(arr.round().astype(np.uint8), 'RGBA').resize((W, H), Image.BOX)
    p = np.asarray(pm).astype(np.float64); al = p[..., 3:4] / 255.0
    return np.dstack([(p[..., :3] / np.maximum(al, 1e-6)).clip(0, 255), p[..., 3:4]])


def paint(im, discs, shade_from=None):
    base = np.asarray(im.convert('RGB')).astype(np.float64); ov = overlay(im.size, discs)
    rgb = ov[..., :3]; al = ov[..., 3:4] / 255.0
    if shade_from is not None:
        sh = np.clip(np.arange(im.width)[None, :, None] - shade_from, 0, 1)
        rgb = rgb * (1 - sh) + rgb * SHADE * sh
    return Image.fromarray((base * (1 - al) + rgb * al).round().clip(0, 255).astype(np.uint8), 'RGB')


def same_size(discs):
    rx = sum(d[2] for d in discs) / len(discs); ry = sum(d[3] for d in discs) / len(discs)
    return [(d[0], d[1], rx, ry) for d in discs]


def eyes_of(im):
    """아직 눈을 그리지 않은 남색 타원 두 개. 없으면 None."""
    d = [x for x in find_discs(im) if not painted(im, x)]
    return same_size(d) if len(d) == 2 else None


def main():
    spec = importlib.util.spec_from_file_location('kbuild', f'{T}/build.py'); kb = importlib.util.module_from_spec(spec)
    sys.dont_write_bytecode = True; spec.loader.exec_module(kb)
    done = []
    for pose in ('hallo', 'super', 'hoer'):
        f = f'{K}/img/c/sofi_{pose}.webp'; src = Image.open(f).convert('RGB')
        if pose == 'hoer':
            discs = None if painted(src, HOER['disc']) else [HOER['disc']]; shade = HOER['shade_from']
        else:
            discs = eyes_of(src); shade = None
        if not discs: print(f'sofi_{pose}: 건너뜀 (눈이 이미 있거나 찾지 못함)'); continue
        new = paint(src, discs, shade); new.save(f, 'WEBP', quality=92, method=6)
        im = kb._white(new); m = ndi.binary_fill_holes(ndi.binary_dilation(kb._ink(im), iterations=2))
        kb._cut(im, m, kb._bbox(m), 1.0, f'{K}/img/c/sofi_{pose}_a.webp'); done.append(f'sofi_{pose}')
    f = f'{K}/img/c/av_sofi.webp'; src = Image.open(f).convert('RGB'); d = eyes_of(src)
    if d: paint(src, d).save(f, 'WEBP', quality=92, method=6); done.append('av_sofi')
    else: print('av_sofi: 건너뜀')
    big = None
    for name in ('icon-512.png', 'icon-maskable-512.png'):
        f = f'{K}/icons/{name}'; src = Image.open(f).convert('RGB'); d = eyes_of(src)
        if not d: print(f'{name}: 건너뜀'); continue
        new = paint(src, d); new.save(f, 'PNG', optimize=True); done.append(name)
        if name == 'icon-512.png': big = new
    if big is not None:                                             # 작은 아이콘 두 개는 512 아이콘을 줄인 것입니다
        for name, n in (('icon-192.png', 192), ('apple-touch-icon.png', 180)):
            big.resize((n, n), Image.LANCZOS).save(f'{K}/icons/{name}', 'PNG', optimize=True); done.append(name)
    print('눈을 그린 그림:', ', '.join(done) if done else '없음')


if __name__ == '__main__':
    main()
