#!/usr/bin/env python3
"""Vokalab 힌트 그림을 여러 장 한꺼번에 넣을 때 쓰는 도구.

그림은 한 장(2:1, 1536x768)에 10개씩 「2줄 x 5개」로 생성한 뒤 단어별로 잘라 쓴다.
생성 자체는 이 도구가 하지 않는다(그림 생성 서비스에서 시트를 만든다). 이 도구는
①그림 없는 단어 목록을 10개씩 묶고 ②받은 시트를 단어별 webp 로 자르고 ③앱에 넣는다.

    python3 tools/vokalab_hints.py queue            # 그림 없는 시험용 단어 (전부는 --all)
    python3 tools/vokalab_hints.py show 0 19        # 시트 0~19 의 단어 (프롬프트 쓸 때 본다)
    python3 tools/vokalab_hints.py fetch run.json 0-19   # 생성 결과(JSON)에서 시트 그림 받기
    python3 tools/vokalab_hints.py slice 0 19       # 자르기 + 미리보기(qa/qa_0000_0.png …)
    python3 tools/vokalab_hints.py apply            # vokalab/img 에 넣고 words.js 에 "h":1

작업 폴더는 --work (기본 /tmp/vokalab-hints). 시트 그림은 <작업 폴더>/sheets/S0000.webp.
시트의 그림 순서는 show 가 보여 준 단어 순서(윗줄 1~5, 아랫줄 6~10)와 같아야 한다.
자른 결과는 반드시 미리보기로 확인한다. 분할이 어긋난 줄은 <작업 폴더>/overrides.json 에
{"S0012": {"1": "alt"}} (다른 분할 기준) 또는 {"S0012": {"2": [[x0,x1], …5개]}} 로 지정한다.
필요한 것: Pillow, numpy.
"""
import argparse
import json
import os
import re
import subprocess
import sys
from itertools import combinations

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'vokalab', 'data', 'words.js')
IMG = os.path.join(ROOT, 'vokalab', 'img')
ROWS, COLS = 2, 5
HEIGHT, QUALITY = 200, 66


def load():
    s = open(DATA, encoding='utf-8').read()
    return json.loads(s[s.index('{'):s.rindex('}') + 1])


def jread(path, default=None):
    return json.load(open(path, encoding='utf-8')) if os.path.exists(path) else default


def jwrite(path, obj):
    json.dump(obj, open(path, 'w', encoding='utf-8'), ensure_ascii=False)


def sheet_name(k):
    return 'S%04d' % k


# ---------------------------------------------------------------- 목록
def cmd_queue(a):
    D = load()
    out = []
    for L in D['levels']:
        ex = set((D.get('exam') or {}).get(L['id'], {}).get('seq', []))
        for w in L['words']:
            if not w.get('h') and (a.all or w['i'] in ex):
                out.append({'lv': L['id'], 'i': w['i'], 'de': w['de'],
                            'ko': re.sub(r'\s*·\s*\[.*$', '', w['ko'])})
    jwrite(os.path.join(a.work, 'queue.json'), out)
    n = -(-len(out) // (ROWS * COLS))
    print('단어 %d개, 시트 %d장 (%s ~ %s)' % (len(out), n, sheet_name(0), sheet_name(max(0, n - 1))))
    print({lv: sum(1 for w in out if w['lv'] == lv) for lv in sorted({w['lv'] for w in out})})


def words_of(a, k):
    q = jread(os.path.join(a.work, 'queue.json'))
    if q is None:
        sys.exit('먼저 queue 를 실행하세요.')
    per = ROWS * COLS
    return q[k * per:(k + 1) * per]


def cmd_show(a):
    for k in range(a.first, a.last + 1):
        ws = words_of(a, k)
        if not ws:
            break
        print(sheet_name(k) + ' ' + ' | '.join(
            '%s=%s' % (re.sub(r', [-⸚/].*$| / (der|die|das) .*$', '', w['de'])[:24], w['ko'][:11]) for w in ws))


# ---------------------------------------------------------------- 받기
def cmd_fetch(a):
    raw = json.load(open(a.result, encoding='utf-8'))
    data = json.loads(raw[0]['text']) if isinstance(raw, list) else raw
    gens = data['generations']
    if '-' in a.sheets:
        x, y = a.sheets.split('-')
        ks = list(range(int(x), int(y) + 1))
    else:
        ks = [int(x) for x in a.sheets.split(',')]
    if len(gens) != len(ks):
        sys.exit('생성 결과 %d개와 시트 %d장의 수가 다릅니다.' % (len(gens), len(ks)))
    os.makedirs(os.path.join(a.work, 'sheets'), exist_ok=True)
    ok = 0
    for g, k in zip(gens, ks):
        out = os.path.join(a.work, 'sheets', sheet_name(k) + '.webp')
        if os.path.exists(out) and os.path.getsize(out) > 20000 and not a.force:
            ok += 1
            continue
        if g.get('status') != 'completed' or not g.get('content_url'):
            print('%s 아직 준비되지 않음: %s' % (sheet_name(k), g.get('status')))
            continue
        r = subprocess.run(['curl', '-sS', '-m', '90', '-o', out, '-w', '%{http_code}', g['content_url']],
                           stdout=subprocess.PIPE)
        if r.stdout.decode().strip() == '200' and os.path.getsize(out) > 20000:
            ok += 1
        else:
            print('%s 내려받기 실패' % sheet_name(k))
    print('받은 시트 %d / %d' % (ok, len(ks)))


# ---------------------------------------------------------------- 자르기
def runs_of(flags, min_gap, min_w):
    runs, x, n = [], 0, len(flags)
    while x < n:
        if flags[x]:
            x0 = x
            while x < n and flags[x]:
                x += 1
            runs.append([x0, x])
        else:
            x += 1
    merged = []
    for r in runs:
        if merged and r[0] - merged[-1][1] < min_gap:
            merged[-1][1] = r[1]
        else:
            merged.append(list(r))
    return [r for r in merged if r[1] - r[0] >= min_w]


def groupings(runs, n):
    gaps = [runs[k + 1][0] - runs[k][1] for k in range(len(runs) - 1)]
    for cuts in combinations(range(len(runs) - 1), n - 1):
        groups, s = [], 0
        for c in cuts:
            groups.append(runs[s:c + 1])
            s = c + 1
        groups.append(runs[s:])
        yield ([[g[0][0], g[-1][1]] for g in groups], [gaps[c] for c in cuts],
               [gaps[k] for k in range(len(gaps)) if k not in cuts])


def split(flags_sum, n, prefer_gaps=False):
    """구간을 n묶음으로. 기본은 폭이 고르게, prefer_gaps 는 넓은 틈에서 자르는 쪽을 더 본다."""
    import numpy as np
    runs = runs_of(flags_sum > 2, 3, 6)
    if len(runs) > 14:
        runs = runs_of(flags_sum > 2, 8, 10)
    if len(runs) < n:
        return None, len(runs)
    best = None
    for segs, cut, unc in groupings(runs, n):
        wd = [b - a for a, b in segs]
        if prefer_gaps:
            cost = float(np.std(wd)) / float(np.mean(wd)) - 0.25 * min(min(cut) / max(1, max(unc) if unc else 1), 2.0)
        else:
            ctr = [(a + b) / 2 for a, b in segs]
            cost = float(np.std(wd)) + 0.5 * float(np.std(np.diff(ctr))) - 0.4 * min(cut)
        if best is None or cost < best[0]:
            best = (cost, segs, wd, min(cut))
    if np.std(best[2]) > 0.45 * np.mean(best[2]):
        return None, len(runs)
    return best[1], best[3]


def forced(col, n):
    import numpy as np
    W = len(col)
    sm = np.convolve(col, np.ones(9) / 9, mode='same')
    bounds = [0]
    for k in range(1, n):
        c, r = int(W * k / n), int(W / n * 0.3)
        bounds.append(c - r + int(np.argmin(sm[c - r:c + r])))
    bounds.append(W)
    out = []
    for k in range(n):
        x0, x1 = bounds[k], bounds[k + 1]
        xs = np.where(col[x0:x1] > 2)[0]
        out.append([x0 + int(xs[0]), x0 + int(xs[-1]) + 1] if len(xs) else [x0, x1])
    return out


def bands(mask, n):
    H = mask.shape[0]
    segs, _ = split(mask.sum(axis=1), n, prefer_gaps=True)
    if not segs:
        return [(H * k // n, H * (k + 1) // n) for k in range(n)]
    return [(0 if k == 0 else (segs[k - 1][1] + a) // 2, H if k == n - 1 else (b + segs[k + 1][0]) // 2)
            for k, (a, b) in enumerate(segs)]


def crop(im, mask, x0, x1):
    import numpy as np
    from PIL import Image
    rows = np.where(mask[:, x0:x1].sum(axis=1) > 1)[0]
    y0, y1 = (int(rows[0]), int(rows[-1]) + 1) if len(rows) else (0, mask.shape[0])
    w, h = x1 - x0, y1 - y0
    m = int(max(w, h) * 0.07)
    cw, ch = w + 2 * m, h + 2 * m
    if cw / ch < 0.62:
        cw = int(ch * 0.62)
    if cw / ch > 1.6:
        ch = int(cw / 1.6)
    canvas = Image.new('RGB', (cw, ch), 'white')
    canvas.paste(im.crop((x0, y0, x1, y1)), ((cw - w) // 2, (ch - h) // 2))
    return canvas.resize((max(1, round(cw * HEIGHT / ch)), HEIGHT), Image.LANCZOS)


def process(a, k, ovr):
    import numpy as np
    from PIL import Image
    name = sheet_name(k)
    im = Image.open(os.path.join(a.work, 'sheets', name + '.webp')).convert('RGB')
    mask = np.asarray(im.convert('L'), dtype=np.int16) < 236
    words = words_of(a, k)
    outs, notes = [], []
    for r, (top, bot) in enumerate(bands(mask, ROWS)):
        sub = np.zeros_like(mask)
        sub[top:bot] = mask[top:bot]
        col = sub.sum(axis=0)
        segs, info = split(col, COLS)
        alt, _ = split(col, COLS, prefer_gaps=True)
        note = ''
        o = ovr.get(name, {}).get(str(r + 1))
        if isinstance(o, list):
            segs = o
        elif o == 'alt' and alt:
            segs = alt
        elif segs is None:
            segs = forced(col, COLS)
            note = '떨어진 그림이 %d개뿐이라 균등 분할' % info if info < COLS else '폭이 고르지 않아 균등 분할'
        elif alt and alt != segs and o != 'keep':
            note = '두 분할 기준이 다름(확인)'
        elif info < 6:
            note = '틈이 좁음(%dpx)' % info
        if note:
            notes.append('%d행: %s' % (r + 1, note))
        for c, (x0, x1) in enumerate(segs):
            idx = r * COLS + c
            if idx >= len(words):
                continue
            w = words[idx]
            t = crop(im, sub, x0, x1)
            d = os.path.join(a.work, 'out', w['lv'])
            os.makedirs(d, exist_ok=True)
            t.save(os.path.join(d, '%d.webp' % w['i']), 'WEBP', quality=QUALITY, method=6)
            outs.append((w, t))
    return outs, '; '.join(notes)


def qa_sheet(items, path, cols=10, cell=118):
    from PIL import Image, ImageDraw, ImageFont

    def font(paths, size):
        for p, idx in paths:
            if os.path.exists(p):
                return ImageFont.truetype(p, size, index=idx)
        return ImageFont.load_default()
    f1 = font([('/usr/share/fonts/opentype/inter/Inter-SemiBold.otf', 0)], 12)
    f2 = font([('/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc', 1)], 11)
    ch = cell + 30
    sheet = Image.new('RGB', (cols * cell, -(-len(items) // cols) * ch), 'white')
    d = ImageDraw.Draw(sheet)
    for k, (w, t) in enumerate(items):
        x, y = (k % cols) * cell, (k // cols) * ch
        t = t.copy()
        t.thumbnail((cell - 8, cell - 8))
        sheet.paste(t, (x + (cell - t.width) // 2, y + 2 + (cell - 8 - t.height) // 2))
        d.text((x + 3, y + cell - 4), re.sub(r', [-⸚/].*$', '', w['de'])[:17], fill=(20, 30, 70), font=f1)
        d.text((x + 3, y + cell + 11), w['ko'][:10], fill=(90, 100, 120), font=f2)
        d.rectangle((x, y, x + cell - 1, y + ch - 1), outline=(228, 232, 238))
    sheet.save(path)


def cmd_slice(a):
    ovr = jread(os.path.join(a.work, 'overrides.json'), {})
    os.makedirs(os.path.join(a.work, 'qa'), exist_ok=True)
    items = []
    for k in range(a.first, a.last + 1):
        if not os.path.exists(os.path.join(a.work, 'sheets', sheet_name(k) + '.webp')):
            print('%s 시트 없음' % sheet_name(k))
            continue
        outs, note = process(a, k, ovr)
        items += outs
        if note:
            print('%s %s' % (sheet_name(k), note))
    for p in range(0, len(items), 100):
        qa_sheet(items[p:p + 100], os.path.join(a.work, 'qa', 'qa_%s_%d.png' % (sheet_name(a.first), p // 100)))
    print('그림 %d개, 미리보기 %d장 (%s)' % (len(items), -(-len(items) // 100), os.path.join(a.work, 'qa')))


# ---------------------------------------------------------------- 앱에 넣기
def cmd_apply(a):
    q = jread(os.path.join(a.work, 'queue.json'), [])
    have = [(w['lv'], w['i']) for w in q if os.path.exists(os.path.join(a.work, 'out', w['lv'], '%d.webp' % w['i']))]
    if not have:
        sys.exit('넣을 그림이 없습니다.')
    lines = open(DATA, encoding='utf-8').read().split('\n')
    want = set(have)
    lv, done = None, 0
    for n, line in enumerate(lines):
        m = re.match(r'\s*\{"id":"([a-z0-9]+)"', line)
        if m:
            lv = m.group(1)
        m = re.match(r'^(\{"i":(\d+),.*\})(,?)$', line)
        if not m or (lv, int(m.group(2))) not in want:
            continue
        w = json.loads(m.group(1))
        if w.get('h'):
            continue
        keys = ['i', 'de', 'ko', 'ex', 'exKo', 'koAlt', 'deAlt', 'vc', 'say', 'x', 'h', 'em']
        w['h'] = 1
        w = {k: w[k] for k in keys if k in w}
        lines[n] = json.dumps(w, ensure_ascii=False, separators=(',', ':')) + m.group(3)
        src = os.path.join(a.work, 'out', lv, '%d.webp' % w['i'])
        dst = os.path.join(IMG, lv, '%d.webp' % w['i'])
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        with open(src, 'rb') as f, open(dst, 'wb') as g:
            g.write(f.read())
        done += 1
    open(DATA, 'w', encoding='utf-8').write('\n'.join(lines))
    print('그림 %d개를 넣었습니다.' % done)
    subprocess.run([sys.executable, os.path.join(ROOT, 'tools', 'vokalab_data.py'), '--stamp'], check=False)


def main():
    ap = argparse.ArgumentParser(description='Vokalab 힌트 그림 묶음 작업')
    ap.add_argument('--work', default='/tmp/vokalab-hints', help='작업 폴더')
    sub = ap.add_subparsers(dest='cmd', required=True)
    p = sub.add_parser('queue')
    p.add_argument('--all', action='store_true', help='시험용이 아닌 단어도 포함')
    for name in ('show', 'slice'):
        p = sub.add_parser(name)
        p.add_argument('first', type=int)
        p.add_argument('last', type=int)
    p = sub.add_parser('fetch')
    p.add_argument('result', help='생성 결과 JSON (generations[].content_url)')
    p.add_argument('sheets', help='예: 0-19 또는 3,7,12 (결과의 순서와 같게)')
    p.add_argument('--force', action='store_true')
    sub.add_parser('apply')
    a = ap.parse_args()
    os.makedirs(a.work, exist_ok=True)
    {'queue': cmd_queue, 'show': cmd_show, 'fetch': cmd_fetch, 'slice': cmd_slice, 'apply': cmd_apply}[a.cmd](a)


if __name__ == '__main__':
    main()
