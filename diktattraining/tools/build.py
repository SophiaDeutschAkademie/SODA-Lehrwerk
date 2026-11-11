#!/usr/bin/env python3
"""SODA DIKTATTRAINING · 받아쓰기 문장과 문장별 음성을 만드는 스크립트

재료
  hoertraining/index.html    듣기 훈련의 줄(원문, 해석, 줄 단위 시작·끝 시각)과 hoertraining/audio/*.mp3
  sprechtraining/data/*.js   말하기 훈련 대화의 줄과 sprechtraining/assets/audio/*.mp3 (MZ 챕터는 쓰지 않음)

하는 일
  1. 두 앱에서 3–12단어 줄을 모읍니다.
  2. 받아쓰기에 맞지 않는 줄을 뺍니다(아래 reason() 의 규칙 + tools/ausschluss.json 의 목록).
  3. 문장마다 음성 파일 audio/<레벨>/<문장 id>.mp3 를 만듭니다(이미 있는 파일은 다시 만들지 않음, --audio 를 붙이면 모두 다시 만듦).
     듣기 훈련 음원은 줄의 앞뒤 쉼(음량이 가장 낮은 곳)을 찾아 그 사이를 잘라 냅니다. 말하기 훈련 줄 음성은 통째로 씁니다.
  4. 세트 구성을 tools/sets.json 에 적고, 앱이 읽는 data/saetze.js 를 만듭니다.

세트 구성은 한 번 정해지면 바꾸지 않습니다. 학생의 기록이 세트 id(a1-01)와 문장 id로 저장되기 때문입니다.
새로 생긴 문장은 그 레벨의 새 세트로 뒤에 붙고, 재료에서 없어진 문장은 세트에서 빠집니다.

실행: python3 diktattraining/tools/build.py [--audio]      (ffmpeg, node, numpy 필요)
실행한 뒤에는 diktattraining/index.html 의 saetze.js?v= 값을 바꿔야 학생 기기에 새 내용이 나옵니다.
"""
import collections
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.dirname(HERE)
ROOT = os.path.dirname(APP)
SR = 16000
HOP = 160
WIN = 320
TARGET = -19.5          # 말소리 구간의 평균 음량(dB). 문장마다 이 값에 맞춥니다(±6dB 안에서).
SET_SIZE = 10
LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1']

# 이름 힌트: 받아쓰기 화면에서 미리 보여 주는 사람 이름·지명·상호 (철자를 들어서는 알 수 없는 말)
NAMES = set('''
Anna Aylin Felix Jana Jin Jiyoung Jonas Julia Katharina Lena Levi Lisa Marco Marie Mia Mimi Min-jun Niklas Nina Pablo Piotr
Sara Sarah Tim Timo Tobias Tom Vroni
Albers Aydin Becker Berger Brenner Brückner Böhm Costa Demir Haller Hartl Hartmann Kessler Kim Kraus Krämer Krüger Kühn Lenz
Lorenz Neumann Nowak Roth Schmidt Schulz Seidel Strauss Vogt Wagner Weber Wendt Yilmaz Yoon
Achental Berlin Bonn Bremen Freiburg Hamburg Heidelberg Köln Kreuzberg Leipzig München Münster Neukölln Warschau Wien
Gartenstraße Lindenstraße Brandenburger
FitPunkt Frischmarkt Silberlinde Telmara Sole Margherita
'''.split())
DIG1 = {'null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun'}


def strip_tok(w):
    return re.sub(r"^[^\wÄÖÜäöüß]+|[^\wÄÖÜäöüß]+$", '', w)


def nwords(s):
    return sum(1 for w in s.split() if re.search(r'[A-Za-zÄÖÜäöüß]', w))


# ───────── 1. 줄 모으기 ─────────
def hoer_lines():
    h = open(os.path.join(ROOT, 'hoertraining/index.html'), encoding='utf-8').read()
    d = json.loads(re.search(r'<script type="application/json" id="routine-data">(.*?)</script>', h, flags=re.S).group(1))
    media = dict(re.findall(r'<script type="text/plain" data-media="([^"]+)">([^<]*)</script>', h))
    secs = {s['id']: s for s in d['sections']}
    out = []
    for it in d['items']:
        lv = it['sec'].split('_')[0]
        src = media.get(it['audio'], '').split('?')[0]
        kind = secs[it['sec']]['meta'].split(' · ')[0].replace('\xa0', ' ')
        for i, l in enumerate(it['lines']):
            out.append(dict(src='h', lv=lv, item=it['id'], n=i + 1, de=l['text'], ko=l.get('ko', ''), t=l.get('t'),
                            audio=os.path.join('hoertraining', src), topic=it.get('topic', ''), topicKo=it.get('topicKo', ''), kind=kind))
    return out


def sprech_lines():
    js = ("const fs=require('fs');global.window={};for(const lv of ['a1','a2','b1','b2','c1']){eval(fs.readFileSync(%s+'/sprechtraining/data/'+lv+'.js','utf8'));}"
          "process.stdout.write(JSON.stringify(window.DIALOG_DATA));") % json.dumps(ROOT)
    D = json.loads(subprocess.run(['node', '-e', js], capture_output=True, text=True, check=True).stdout)
    out = []
    for LV in LEVELS:
        for dlg in D.get(LV, []):
            for i, t in enumerate(dlg['turns']):
                out.append(dict(src='s', lv=LV, item='%s-%02d' % (LV.lower(), dlg['no']), n=i + 1, de=t['de'], ko=t.get('ko', ''), t=None,
                                audio='sprechtraining/assets/audio/%s-%02d-%02d.mp3' % (LV.lower(), dlg['no'], i + 1),
                                topic=dlg['title'], topicKo=dlg['titleKo'], kind=dlg.get('typeKo', '')))
    return out


def sid(l):
    return '%s-%s-%02d' % (l['src'], l['item'], l['n'])


# ───────── 2. 고르기 ─────────
def reason(l, manual):
    """받아쓰기에 맞지 않으면 이유를, 맞으면 None 을 돌려줍니다."""
    s = l['de']
    if sid(l) in manual:
        return manual[sid(l)]
    T = [t for t in (strip_tok(w) for w in s.split()) if t]
    if not 3 <= nwords(s) <= 12:
        return '길이(3–12단어가 아님)'
    if '…' in s or '...' in s:
        return '말줄임'
    if re.search(r'\b(z\. ?B\.|usw\.|ca\.|Dr\.|bzw\.|d\. ?h\.|Nr\.|Str\.|etc\.|u\. ?a\.)', s):
        return '줄임말'
    if re.search(r'[„“”"»«]', s):
        return '따옴표'
    if not re.search(r'[.!?]$', s.strip()):
        return '문장이 끝나지 않음'
    if any(re.fullmatch(r'[A-ZÄÖÜ]', t) for t in T):
        return '낱글자'
    if re.search(r'\b([A-ZÄÖÜ]-){2,}[A-ZÄÖÜ]\b', s):
        return '철자 부르기'
    if any(re.fullmatch(r'[A-ZÄÖÜ]{2,}', p) for t in T for p in t.split('-')):
        return '대문자 약어'
    if sum(1 for t in T if t.lower() in DIG1) >= 4:
        return '숫자 나열'
    if re.search(r'\d[:.,]\d', s):
        return '숫자 표기'
    return None


def names_in(s):
    """문장에 나오는 이름 힌트. Herr·Frau 뒤의 성, 'Namen' 뒤의 이름도 넣습니다."""
    out = []
    ws = [strip_tok(w) for w in s.split()]
    for i, t in enumerate(ws):
        if not t:
            continue
        if t in ('Herr', 'Herrn', 'Frau'):
            continue
        hit = t in NAMES or (i > 0 and ws[i - 1] in ('Herr', 'Herrn', 'Frau', 'Namen') and t[:1].isupper())
        if hit and t not in out:
            out.append(t)
    return out


# ───────── 3. 음성 ─────────
def decode(path):
    import numpy as np
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def env_db(x):
    import numpy as np
    n = 1 + max(0, (len(x) - WIN)) // HOP
    idx = np.arange(WIN)[None, :] + HOP * np.arange(n)[:, None]
    f = x[idx]
    p = (f * f).mean(axis=1) + 1e-12
    ps = np.convolve(p, np.ones(5) / 5, mode='same')        # 50ms 평균
    return 10 * np.log10(p), 10 * np.log10(ps)


def fr(t):
    return int(round(t * SR / HOP))


def tm(i):
    return i * HOP / SR


def valley(es, lo, hi, ref):
    """[lo, hi] 프레임 안에서 가장 조용한 곳과, 그 양쪽에서 말소리가 끝나고 시작하는 프레임"""
    import numpy as np
    lo = max(0, lo)
    hi = min(len(es) - 1, hi)
    v = lo + int(np.argmin(es[lo:hi + 1]))
    thr = min(max(float(es[v]) + 8.0, ref - 26.0), ref - 12.0)
    k = v
    while k > 0 and es[k] <= thr:
        k -= 1
    left = k
    k = v
    while k < len(es) - 1 and es[k] <= thr:
        k += 1
    return left, k


def make_audio(sel, all_h, force):
    import numpy as np
    by = collections.defaultdict(list)
    for l in all_h:
        by[l['item']].append(l)
    cache = {}
    made = 0
    for l in sel:
        dst = os.path.join(APP, 'audio', l['lv'].lower(), sid(l) + '.mp3')
        if os.path.exists(dst) and not force:
            continue
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        src = os.path.join(ROOT, l['audio'])
        if l['src'] == 'h':
            if src not in cache:
                cache.clear()
                x = decode(src)
                e, es = env_db(x)
                cache[src] = (x, e, es, float(np.percentile(e, 95)))
            x, e, es, ref = cache[src]
            dur = len(x) / SR
            L = by[l['item']]
            i = l['n'] - 1
            a, b = l['t']
            pe = L[i - 1]['t'][1] if i > 0 else 0.0
            ns = L[i + 1]['t'][0] if i < len(L) - 1 else dur
            l1, r1 = valley(es, fr(max(pe - 0.30, a - 0.70, 0)), fr(a + 0.30), ref)
            l2, r2 = valley(es, fr(b - 0.30), fr(min(ns + 0.30, b + 0.70, dur)), ref)
            on, offp = tm(r1), tm(l1) + 0.02
            off, onn = tm(l2) + 0.02, tm(r2)
            if i == 0 and l1 == 0:
                offp = max(0.0, on - 1.0)
            if i == len(L) - 1 and r2 >= len(es) - 2:
                onn = min(dur, off + 1.0)
            start = max(0.0, on - min(0.22, max(on - offp, 0) / 2))
            end = min(dur, off + min(0.30, max(onn - off, 0) / 2))
            seg = e[fr(on):max(fr(on) + 1, fr(off))]
            lvl = float(np.mean(seg[seg > ref - 26])) if (seg > ref - 26).any() else ref
            xs = x[int(start * SR):int(end * SR)]
            d = end - start
            rate = 32000
            cut = ['-ss', '%.3f' % start, '-t', '%.3f' % d]
            fade = 'afade=t=in:st=0:d=0.03,afade=t=out:st=%.3f:d=0.06' % max(0, d - 0.06)
            pad = 'adelay=120:all=1,apad=pad_dur=0.2'
        else:
            # 말하기 훈련 줄 음성은 말소리 바로 뒤에서 파일이 끝나므로 자르지 않고 통째로 씁니다.
            xs = decode(src)
            e, _ = env_db(xs)
            ref = float(np.percentile(e, 95))
            sp = np.where(e > ref - 26)[0]
            seg = e[sp[0]:sp[-1] + 1]
            lvl = float(np.mean(seg[seg > ref - 26]))
            d = len(xs) / SR
            rate = 44100
            cut = []
            fade = 'afade=t=out:st=%.3f:d=0.008' % max(0, d - 0.008)
            pad = 'adelay=200:all=1,apad=pad_dur=0.35'
        peak = float(np.abs(xs).max()) if len(xs) else 1.0
        gain = max(-6.0, min(6.0, TARGET - lvl))
        if peak * 10 ** (gain / 20) > 0.89:
            gain = 20 * np.log10(0.89 / peak)
        af = '%s,volume=%.2fdB,%s' % (fade, gain, pad)
        subprocess.run(['ffmpeg', '-v', 'error', '-y'] + cut + ['-i', src, '-af', af, '-ac', '1', '-ar', str(rate),
                        '-c:a', 'libmp3lame', '-b:a', '80k', '-map_metadata', '-1', '-write_xing', '0', dst], check=True)
        made += 1
    return made


def duration(path):
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path], capture_output=True, text=True).stdout
    return round(float(out), 2)


# ───────── 4. 세트 ─────────
def order_level(sel_lv):
    """듣기 훈련 지문과 말하기 훈련 대화를 고르게 섞은 순서(지문 안에서는 줄 순서 그대로)"""
    groups = collections.OrderedDict()
    for l in sel_lv:
        groups.setdefault((l['src'], l['item']), []).append(l)
    hs = [k for k in groups if k[0] == 'h']
    ss = [k for k in groups if k[0] == 's']
    pos = {}
    for arr in (hs, ss):
        for i, k in enumerate(arr):
            pos[k] = (i + 0.5) / len(arr)
    keys = sorted(groups, key=lambda k: (pos[k], k[0]))
    return [l for k in keys for l in groups[k]]


def chunk(ids):
    n = max(1, round(len(ids) / SET_SIZE))
    base, extra = divmod(len(ids), n)
    out, p = [], 0
    for i in range(n):
        size = base + (1 if i < extra else 0)
        out.append(ids[p:p + size])
        p += size
    return [c for c in out if c]


def main():
    force = '--audio' in sys.argv
    manual = json.load(open(os.path.join(HERE, 'ausschluss.json'), encoding='utf-8'))
    all_h = hoer_lines()
    lines = all_h + sprech_lines()
    sel, seen, dropped = [], set(), collections.Counter()
    for l in lines:
        r = reason(l, manual)
        if not r:
            key = re.sub(r'[^\wäöüß ]', '', l['de'].lower()).strip()
            if key in seen:
                r = '같은 문장'
            else:
                seen.add(key)
        if r:
            if r != '길이(3–12단어가 아님)':
                dropped[r] += 1
        else:
            sel.append(l)
    by_id = {sid(l): l for l in sel}

    made = make_audio(sel, all_h, force)

    # 세트: 이미 정해진 구성은 그대로 두고, 새 문장만 새 세트로 붙입니다.
    sets_path = os.path.join(HERE, 'sets.json')
    frozen = json.load(open(sets_path, encoding='utf-8')) if os.path.exists(sets_path) else {}
    sets = {}
    for lv in LEVELS:
        old = [[i for i in s if i in by_id] for s in frozen.get(lv, [])]
        used = {i for s in old for i in s}
        fresh = [sid(l) for l in order_level([l for l in sel if l['lv'] == lv]) if sid(l) not in used]
        sets[lv] = [s for s in old if s] + (chunk(fresh) if fresh else [])
    json.dump(sets, open(sets_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

    topics, tindex, out_sets = [], {}, []
    for lv in LEVELS:
        for no, ids in enumerate(sets[lv], 1):
            items = []
            for i in ids:
                l = by_id[i]
                tk = (l['src'], l['item'])
                if tk not in tindex:
                    tindex[tk] = len(topics)
                    topics.append(dict(de=l['topic'], ko=l['topicKo'], kind=l['kind']))
                it = dict(id=i, de=l['de'], ko=l['ko'], tp=tindex[tk],
                          d=duration(os.path.join(APP, 'audio', lv.lower(), i + '.mp3')))
                nm = names_in(l['de'])
                if nm:
                    it['nm'] = nm
                items.append(it)
            out_sets.append(dict(id='%s-%02d' % (lv.lower(), no), lv=lv, no=no, items=items))
    data = dict(topics=topics, sets=out_sets)
    with open(os.path.join(APP, 'data', 'saetze.js'), 'w', encoding='utf-8') as f:
        f.write('/* SODA DIKTATTRAINING · 받아쓰기 문장 (tools/build.py 가 만듦, 직접 고치지 마세요)\n'
                ' * topics: 문장이 나온 지문·대화 { de, ko, kind }\n'
                ' * sets:   { id, lv, no, items: [{ id, de 원문, ko 해석, tp topics 번호, d 음성 길이(초), nm 이름 힌트 }] }\n'
                ' * 음성 파일: audio/<레벨 소문자>/<문장 id>.mp3\n */\n')
        f.write('window.DIKTAT_DATA = ' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n')
    n = sum(len(s['items']) for s in out_sets)
    print('문장 %d개, 세트 %d개 (%s)' % (n, len(out_sets), ', '.join('%s %d문장 %d세트' % (lv, sum(len(s) for s in sets[lv]), len(sets[lv])) for lv in LEVELS)))
    print('뺀 줄:', dict(dropped))
    print('새로 만든 음성 %d개' % made)
    # 쓰지 않는 음성 파일 알림
    for lv in LEVELS:
        d = os.path.join(APP, 'audio', lv.lower())
        if os.path.isdir(d):
            extra = sorted(f for f in os.listdir(d) if f.endswith('.mp3') and f[:-4] not in by_id)
            if extra:
                print('쓰지 않는 음성(%s): %s' % (lv, ', '.join(extra)))


if __name__ == '__main__':
    main()
