#!/usr/bin/env python3
"""SODA Kinder 빌드 도구.

  python3 kinder/tools/build.py check 2-24     단원 원본(tools/src/kNN.json)의 짜임과 음성 글자 수를 검사합니다
  python3 kinder/tools/build.py tts 2 3 4      단원 음성 대본(화자별 묶음)을 tools/tts/ 에 씁니다
  python3 kinder/tools/build.py prompts 2 3 4  단원 그림 프롬프트(kNN_szene, kNN_karten)를 tools/tts/prompts.json 에 씁니다
  python3 kinder/tools/build.py cut RAW_DIR    RAW_DIR 의 생성 음성(<job>.mp3)을 줄 단위로 잘라 audio/ 에 넣습니다
  python3 kinder/tools/build.py img RAW_DIR    RAW_DIR 의 그림(kNN_szene.webp, kNN_karten.webp, kNN_cN.webp)을 img/ 에 넣습니다
  python3 kinder/tools/build.py site           data/kNN.js 와 index.html 을 다시 만듭니다 (그림·음성이 모두 있는 단원만 엽니다)

원본: tools/src/kNN.json (단원), tools/book.json (차례), tools/shell.html (화면), tools/blocks/ (Lehrwerk 공통 블록)
음성: ElevenLabs eleven_v3, language_code de. Sofi = Milly Maple, Lena = Rika Sturm, Ben = Pipp.
그림: Recraft 4.1 Flash, SODA 삽화 그림체. 장면 4:3 한 장, 낱말 카드 여섯 개를 3:2 한 장에 그려 잘라 씁니다.
"""
import sys, os, re, json, glob, subprocess, datetime
import numpy as np

T = os.path.dirname(os.path.abspath(__file__))
K = os.path.dirname(T)
SR = 44100
VOICE = {'sofi': 'Milly Maple', 'lena': 'Rika Sturm', 'ben': 'Pipp'}
VOICE_ID = {'sofi': 'VD1if7jDVYtAKs4P0FIY', 'lena': 'Jpm0FNvrnzdW3k4rnWVH', 'ben': 'Im1tDIlzaGXABXZ9xEzu'}
OPEN_TAG = '[happy] '
PAUSE = ' [long pause] '
MAXJOB = 10          # lines per generation

STYLE = ('Modern minimalist editorial illustration, calm and refined, simplified geometric forms, flat matte colors with a very fine subtle grain, '
         'restrained palette of deep navy, slate gray, warm sand and ivory with one muted ochre accent, natural muted skin tones, minimal facial features, '
         'soft subtle shadows. Plain white background, wordless.')
ONE = 'The whole scene sits fully inside the frame, centered, with even generous white margins on all four sides.'
MANY = 'Every item is complete, separated from the others by wide empty white space, and does not touch the edges of the image.'
WHO = {'LENA': 'a girl with a dark blond ponytail and fair pale skin in a sand sweater and navy trousers',
       'BEN': 'a boy with short curly dark brown hair and fair pale skin in a navy sweater and slate gray trousers',
       'SOFI': 'a small round friendly owl with slate gray feathers, an ivory face and belly, big round dark eyes and a small ochre beak'}

def plain(h): return re.sub(r'<[^>]+>', '', h)
def src(n): return json.load(open(f'{T}/src/k{n:02d}.json', encoding='utf-8'))
def chapters(): return sorted(int(os.path.basename(p)[1:3]) for p in glob.glob(f'{T}/src/k??.json'))
def parse(a):
    out = []
    for x in a:
        if x == 'all': out += chapters()
        elif '-' in x: lo, hi = x.split('-'); out += list(range(int(lo), int(hi)+1))
        else: out.append(int(x))
    return out

def keys(d):
    """ordered (speaker, text) pairs a chapter needs as audio"""
    out = []
    def add(who, text):
        k = (who, plain(text))
        if '{' in k[1]: return
        if k not in out: out.append(k)
    for sc in d['story']:
        for l in sc['lines']: add(l[0], l[3] if len(l) > 3 else l[1])
    for c in d['cards']: add('sofi', c.get('say', c['de']))
    if d.get('letter'): add('sofi', d['letter'][1])
    for f in d.get('frames', []):
        for m in f.get('models', []): add(m[0], m[1])
    for g in (d.get('opts') or {}).values():
        for o in g:
            if len(o) > 2 and o[2]: add('sofi', o[2])
    for t in d['talk']: add('sofi', t.get('say', t['de']))
    for r in d['reim']: add('sofi', r[0])
    for e in d.get('extra', []): add(e[0], e[1])          # lines used outside the six steps (certificate)
    return out

# ---------------------------------------------------------------- check
def cmd_check(ns):
    tot = 0; bad = 0
    for n in ns:
        d = src(n); ks = keys(d); ch = sum(len(t) for _, t in ks); tot += ch
        errs = []
        cardk = {c['k'] for c in d['cards']}
        if d.get('kind', 'pic') == 'pic' and len(d['cards']) != 6: errs.append('cards != 6')
        for c in d['cards']:
            if d.get('kind', 'pic') == 'pic' and not c.get('alt'): errs.append('card alt ' + c['k'])
        labels = [c.get('alt') or c['ko'] for c in d['cards']]
        if len(set(labels)) != len(labels): errs.append('card labels not unique')
        if len(set(c['de'] for c in d['cards'])) != len(d['cards']): errs.append('card de not unique')
        for t in d['talk']:
            if t.get('pic') and t['pic'] not in cardk: errs.append('talk pic ' + t['pic'])
        if d.get('sticker') and d['sticker'] not in cardk: errs.append('sticker')
        if len(d['reim']) != 4: errs.append('reim != 4')
        for r in d['reim']:
            if r[0].count('<b>') != 4: errs.append(f'reim beats {r[0].count("<b>")}: {plain(r[0])}')
        txt = json.dumps([d.get('frames', []), d['talk']], ensure_ascii=False)
        for tok in re.findall(r'\{(\w+)\}', txt):
            if tok in ('a', 'b', 'A', 'B') and tok.lower() not in (d.get('opts') or {}): errs.append('opts ' + tok)
        for f in d.get('frames', []):
            for s in f.get('slots', []):
                if s not in (d.get('opts') or {}): errs.append('slot ' + s)
        if d.get('kind', 'pic') == 'pic' and not os.path.exists(f'{T}/img/k{n:02d}.json'):      # pictures not made yet
            if not d.get('img', {}).get('szene'): errs.append('img.szene')
            if len(d.get('img', {}).get('karten', [])) != 6: errs.append('img.karten')
        for f in ('hint', 'todo', 'goals', 'sounds', 'lesson'):
            if not d.get(f): errs.append('missing ' + f)
        bad += len(errs)
        print(f'k{n:02d} lines {len(ks):2d} chars {ch:4d}  sofi {sum(1 for w,_ in ks if w=="sofi"):2d} lena {sum(1 for w,_ in ks if w=="lena")} ben {sum(1 for w,_ in ks if w=="ben")}' + ('   !! ' + '; '.join(errs) if errs else ''))
    J = jobs(ns); chars = sum(len(script(i)) for i in J.values())
    print(f'text chars {tot} | jobs {len(J)} | chars with tags {chars} | problems {bad}')

# ---------------------------------------------------------------- tts scripts
def jobs(ns):
    """Sofi: per chapter. Lena and Ben: per Thema (four chapters). Each job holds at most MAXJOB lines."""
    G = {}
    for n in ns:
        d = src(n)
        for who, text in keys(d):
            g = f'k{n:02d}_sofi' if who == 'sofi' else f't{(n-1)//4+1}_{who}'
            G.setdefault(g, []).append([n, who, text])
    J = {}
    for g, items in sorted(G.items()):
        parts = -(-len(items)//MAXJOB); size = -(-len(items)//parts)
        for i in range(parts): J[f'{g}_{chr(97+i)}'] = items[i*size:(i+1)*size]
    return J
def script(items): return OPEN_TAG + PAUSE.join(t for _, _, t in items)

def cmd_tts(ns):
    os.makedirs(f'{T}/tts', exist_ok=True)
    J = jobs(ns); total = 0; plan = []
    for job, items in J.items():
        who = items[0][1]; s = script(items)
        json.dump({'job': job, 'who': who, 'voice': VOICE[who], 'voice_id': VOICE_ID[who], 'items': items, 'script': s},
                  open(f'{T}/tts/{job}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        total += len(s); plan.append({'job': job, 'voice_id': VOICE_ID[who], 'chars': len(s), 'lines': len(items)})
    json.dump(plan, open(f'{T}/tts/plan.json', 'w'), indent=0)
    for p in plan: print(p['job'], p['lines'], p['chars'])
    print('jobs', len(plan), 'TOTAL chars', total)

def cmd_prompts(ns):
    os.makedirs(f'{T}/tts', exist_ok=True); out = []
    def who(s):
        for k, v in WHO.items(): s = s.replace(k, v)
        return s
    for n in ns:
        d = src(n); im = d.get('img', {})
        if im.get('szene'): out.append({'name': f'k{n:02d}_szene', 'ratio': '4:3', 'prompt': f'{who(im["szene"])} All figures are shown small and in full from head to feet. {ONE} {STYLE}'})
        for k, t in (im.get('single') or {}).items(): out.append({'name': f'k{n:02d}_{k}', 'ratio': '1:1', 'prompt': f'{who(t)} {ONE} {STYLE}'})
        if im.get('karten'):
            k = [who(x) for x in im['karten']]
            out.append({'name': f'k{n:02d}_karten', 'ratio': '3:2', 'prompt':
                        f'Six separate small illustrations arranged in a neat grid of two rows and three columns, all the same size. Top row from left to right: {k[0]}; {k[1]}; {k[2]}. '
                        f'Bottom row from left to right: {k[3]}; {k[4]}; {k[5]}. {MANY} {STYLE}'})
    json.dump(out, open(f'{T}/tts/prompts.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(len(out), 'image prompts ->', f'{T}/tts/prompts.json')

# ---------------------------------------------------------------- audio cutting
def load(path):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32).copy()

def env_db(x, win=0.02, hop=0.005):
    w = int(win*SR); h = int(hop*SR); n = max(1, (len(x)-w)//h+1)
    c = np.concatenate([[0.0], np.cumsum(x.astype(np.float64)**2)])
    i = np.arange(n)*h; r = np.sqrt((c[i+w]-c[i])/w+1e-12)
    return 20*np.log10(r+1e-9), h

def voiced_runs(x, thr_rel=-42, min_sil=0.12):
    db, h = env_db(x); thr = db.max()+thr_rel
    on = db > thr; runs = []; s = None
    for i, v in enumerate(on):
        if v and s is None: s = i
        if (not v) and s is not None: runs.append([s*h/SR, i*h/SR]); s = None
    if s is not None: runs.append([s*h/SR, len(x)/SR])
    merged = []
    for r in runs:
        if merged and r[0]-merged[-1][1] < min_sil: merged[-1][1] = r[1]
        else: merged.append(r)
    return [r for r in merged if r[1]-r[0] > 0.04]

def units(t):          # rough spoken length of a line
    return len(re.findall(r'[A-Za-zÄÖÜäöüß]', t)) + 2.0*len(re.findall(r'[.!?:,–…]', t)) + 2.0

def split(x, texts):
    """Assign the voiced runs of x to the lines in texts: choose the cuts that fit both the pauses and the expected line lengths."""
    runs = voiced_runs(x); m = len(runs); N = len(texts)
    if m < N: return None, {'runs': m}
    dur = np.array([b-a for a, b in runs]); gap = np.array([runs[i+1][0]-runs[i][1] for i in range(m-1)])
    u = np.array([units(t) for t in texts]); V = dur.sum(); exp = V*u/u.sum()
    cd = np.concatenate([[0], np.cumsum(dur)])
    INF = 1e9; D = np.full((N+1, m+1), INF); B = np.zeros((N+1, m+1), int); D[0][0] = 0
    def inner(a, b): return float(sum(3.0*max(0.0, g-0.28) for g in gap[a:b-1])) if b-a > 1 else 0.0
    for j in range(1, N+1):
        for b in range(j, m-(N-j)+1):
            best = INF; arg = -1
            for a in range(j-1, b):
                if D[j-1][a] >= INF: continue
                act = cd[b]-cd[a]
                c = D[j-1][a] + 1.6*abs(np.log((act+0.08)/(exp[j-1]+0.08))) + inner(a, b)
                if a > 0: c -= 1.2*np.log(max(gap[a-1], 0.05)/0.3)
                if c < best: best = c; arg = a
            D[j][b] = best; B[j][b] = arg
    cuts = []; b = m
    for j in range(N, 0, -1):
        a = B[j][b]; cuts.append((a, b)); b = a
    cuts.reverse()
    segs = [(runs[a][0], runs[b-1][1]) for a, b in cuts]
    cg = [gap[a-1] for a, b in cuts[1:]]; ig = [g for a, b in cuts for g in gap[a:b-1]]
    top = sorted(range(m-1), key=lambda i: gap[i], reverse=True)[:N-1]
    ratio = [float((cd[b]-cd[a])/exp[j]) for j, (a, b) in enumerate(cuts)]
    info = {'runs': m, 'min_cut': round(float(min(cg)), 2) if cg else None, 'max_inner': round(float(max(ig)), 2) if ig else 0.0,
            'agree': sorted(top) == [a-1 for a, b in cuts[1:]], 'ratio': [round(r, 2) for r in ratio]}
    return segs, info

def split_words(x, words, texts):
    """Cut by the timing the speech engine reports for its own prompt (words with start/end; lines are separated by the tokens "[long" "pause]").
    The reported times can be off by half a second, so each line break is snapped to the real silence that lies at, or nearest to, its pause tag."""
    groups = [[]]; tags = []; cur = None
    for w in words:
        t = w['text']
        if t in ('[long', '[short'): cur = [w['start'], w['end']]; continue
        if t == 'pause]' and cur is not None: tags.append((cur[0], w['end'])); cur = None; groups.append([]); continue
        if t == '[pause]': tags.append((w['start'], w['end'])); groups.append([]); continue
        if t.startswith('[') and t.endswith(']'): continue
        groups[-1].append(w)
    if len(groups) != len(texts) or any(not g for g in groups): return None, {'err': f'{len([g for g in groups if g])} aligned lines, need {len(texts)}'}
    for g, t in zip(groups, texts):
        if ' '.join(w['text'] for w in g) != ' '.join(t.split()): return None, {'err': 'text differs: ' + ' '.join(w['text'] for w in g) + ' / ' + t}
    runs = voiced_runs(x); gaps = [(runs[i][1], runs[i+1][0]) for i in range(len(runs)-1)]
    if len(runs) < len(texts): return None, {'err': f'{len(runs)} sounds for {len(texts)} lines'}
    cut = []; far = 0.0
    for ts, te in tags:
        best = None; key = None
        for i, (g0, g1) in enumerate(gaps):
            if cut and i <= cut[-1]: continue
            ov = max(0.0, min(g1, te)-max(g0, ts)); dist = 0.0 if ov > 0 else (ts-g1 if g1 <= ts else g0-te)
            k = (ov > 0, ov if ov > 0 else -dist, g1-g0)
            if key is None or k > key: key = k; best = (i, dist)
        if best is None: return None, {'err': 'no silence left for a line break'}
        cut.append(best[0]); far = max(far, best[1])
    b = [0] + [c+1 for c in cut] + [len(runs)]
    own = [runs[b[j]:b[j+1]] for j in range(len(texts))]
    if any(not o for o in own): return None, {'err': 'a line has no sound'}
    segs = [(o[0][0], o[-1][1]) for o in own]
    rate = [sum(q-p for p, q in o)/units(t) for o, t in zip(own, texts)]; med = float(np.median(rate))
    off = max(abs(o[0][0]-g[0]['start']) for o, g in zip(own, groups))
    return segs, {'far': round(far, 2), 'off': round(off, 2), 'rate': [round(r/med, 2) for r in rate]}

def squeeze(x, max_gap=0.42):
    db, h = env_db(x); thr = db.max()-42; sil = db <= thr
    keep = np.ones(len(x), bool); s = None
    for k, v in enumerate(sil):
        if v and s is None: s = k
        if (not v) and s is not None:
            d = (k-s)*h/SR
            if s > 0 and d > max_gap:
                cut = int((d-max_gap)*SR); mid = int(((s+k)/2)*h); keep[mid-cut//2: mid-cut//2+cut] = False
            s = None
    return x[keep]

def polish(x):
    db, h = env_db(x); thr = db.max()-50; idx = np.where(db > thr)[0]
    a = max(0, int(idx[0]*h-0.05*SR)); b = min(len(x), int(idx[-1]*h+0.14*SR)); x = squeeze(x[a:b])
    db, h = env_db(x); act = db[db > db.max()-25]; rms = 10*np.log10(np.mean(10**(act/10)))
    y = x*10**((-19.0-rms)/20); p = np.abs(y).max()
    if p > 0.89: y = np.tanh(y/0.89)*0.89 if p < 1.4 else y*(0.89/p)
    fi = int(0.008*SR); fo = int(0.05*SR); y[:fi] *= np.linspace(0, 1, fi); y[-fo:] *= np.linspace(1, 0, fo)
    return y

def mp3(x, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    pcm = (np.clip(x, -1, 1)*32767).astype('<i2').tobytes()
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-', '-c:a', 'libmp3lame', '-b:a', '64k', '-ar', str(SR), path], input=pcm, check=True)

_rng = np.random.default_rng(7)
def clap(level=0.6):
    n = int(0.16*SR); t = np.arange(n)/SR; y = np.zeros(n)
    for d, a in ((0.0, 1.0), (0.011, 0.8), (0.023, 0.6)):
        k = int(d*SR); m = n-k; y[k:] += a*_rng.standard_normal(m)*np.exp(-np.arange(m)/SR/0.018)
    Y = np.fft.rfft(y); f = np.fft.rfftfreq(n, 1/SR)
    y = np.fft.irfft(Y*(np.exp(-0.5*((f-1900)/900)**2)+0.25*np.exp(-0.5*((f-900)/300)**2)), n)*np.exp(-t/0.06)
    return y/np.abs(y).max()*level

def chant(lines, sup, path):
    lines = [squeeze(l, 0.26) for l in lines]          # keep the counting lines brisk
    longest = max(len(l) for l in lines)/SR
    beat = max(0.66, round((longest+0.12)/4, 2)); bar = 4*beat; lead = 0.35
    buf = np.zeros(int((lead+8*bar+2.6)*SR)); marks = []
    def put(x, t): a = int(t*SR); buf[a:a+len(x)] += x
    for i, l in enumerate(lines):
        ts = lead+2*i*bar; te = ts+bar; put(l, ts)
        for b in range(4): put(clap(), te+b*beat)
        marks.append([round(ts, 3), round(te, 3)])
    tend = lead+8*bar+0.15; put(sup, tend); end = tend+len(sup)/SR+0.25
    mp3(np.clip(buf[:int(end*SR)], -0.97, 0.97), path)
    return {'beat': beat, 'bar': round(bar, 3), 'marks': marks, 'sup': round(tend, 3)}

def amap(n):
    m = f'{T}/audio/k{n:02d}.json'
    return json.load(open(m, encoding='utf-8')) if os.path.exists(m) else {'aud': {}, 'dur': {}}
def amap_save(n, mp): json.dump(mp, open(f'{T}/audio/k{n:02d}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=0)

def cmd_cut(raw, force=()):
    os.makedirs(f'{T}/audio', exist_ok=True); bad = []
    for jf in sorted(glob.glob(f'{T}/tts/*_?.json')):
        j = json.load(open(jf, encoding='utf-8')); job = j['job']; p = f'{raw}/{job}.mp3'
        if not os.path.exists(p): continue
        done = f'{T}/audio/{job}.done'
        if job not in force and os.path.exists(done) and os.path.getmtime(done) > os.path.getmtime(p): continue
        x = load(p); items = j['items']; texts = [t for _, _, t in items]; wf = f'{raw}/{job}.words.json'
        if not os.path.exists(wf):
            bad.append(job); print(f'!! {job}: no alignment file (words.json)'); continue
        segs, info = split_words(x, json.load(open(wf, encoding='utf-8')), texts)
        if segs is None:
            bad.append(job); print(f'!! {job}: {info["err"]}'); continue
        flags = []
        if info['far'] > 0.6: flags.append(f'a line break is {info["far"]}s away from its pause')
        if info['off'] > 1.0: flags.append(f'a line starts {info["off"]}s away from the reported time')
        if min(info['rate']) < 0.5 or max(info['rate']) > 2.0: flags.append('length off')
        print(f'{job}: {len(items)} lines {len(x)/SR:.1f}s rate {min(info["rate"])}..{max(info["rate"])} far {info["far"]} off {info["off"]}' + ('   <-- ' + ', '.join(flags) if flags else ''))
        if flags:
            bad.append(job)
            for (n, who, text), (a, b), r in zip(items, segs, info['rate']): print(f'      {a:6.2f}-{b:6.2f} {r:4.2f}  {text}')
        for (n, who, text), (a, b) in zip(items, segs):
            seg = polish(x[max(0, int((a-0.2)*SR)):int((b+0.3)*SR)])
            mp = amap(n); key = f'{who}|{text}'
            ident = mp['aud'].get(key)
            if not ident:
                used = {v for v in mp['aud'].values()}; i = 1
                while f'{who[0]}{i:02d}' in used: i += 1
                ident = f'{who[0]}{i:02d}'
            mp['aud'][key] = ident; mp['dur'][ident] = round(len(seg)/SR, 2); mp.pop('chant', None)
            amap_save(n, mp); mp3(seg, f'{K}/audio/k{n:02d}/{ident}.mp3')
        open(done, 'w').write('ok')
    sup = load(f'{K}/audio/c/fb_super.mp3')
    for n in chapters():
        mp = amap(n); d = src(n)
        ids = [mp['aud'].get('sofi|'+plain(r[0])) for r in d['reim']]
        if None in ids or ('chant' in mp and os.path.exists(f'{K}/audio/k{n:02d}/chant.mp3')): continue
        mp['chant'] = chant([load(f'{K}/audio/k{n:02d}/{i}.mp3') for i in ids], sup, f'{K}/audio/k{n:02d}/chant.mp3')
        amap_save(n, mp); print(f'k{n:02d}: chant built, beat {mp["chant"]["beat"]}')
    print('NEEDS ATTENTION:', bad if bad else 'none')

# ---------------------------------------------------------------- images
CW, CH = 1000, 750          # scene canvas (4:3)

def _white(im):
    from PIL import Image
    a = np.asarray(im.convert('RGB')).copy(); a[a.min(axis=2) >= 244] = 255; return Image.fromarray(a)
def _ink(im): return np.asarray(im.convert('RGB')).min(axis=2) < 238
def _bbox(m):
    ys = np.where(m.any(axis=1))[0]; xs = np.where(m.any(axis=0))[0]
    return (int(xs.min()), int(ys.min()), int(xs.max())+1, int(ys.max())+1) if len(ys) else None
def _tile(crop, dst):
    from PIL import Image
    side = int(max(crop.size)*1.14); cv = Image.new('RGB', (side, side), (255, 255, 255))
    cv.paste(crop, ((side-crop.width)//2, (side-crop.height)//2))
    cv.resize((512, 512), Image.LANCZOS).save(dst, 'WEBP', quality=80, method=6)
def _cut(im, mask, box, scale, dst):
    """save the masked part of im (box) as a picture with a transparent background"""
    from PIL import Image
    from scipy import ndimage as ndi
    x0, y0, x1, y1 = box
    a = np.asarray(im.convert('RGB'))[y0:y1, x0:x1]
    al = ndi.gaussian_filter(mask[y0:y1, x0:x1].astype(np.float32), 0.8)
    rgba = np.dstack([a, np.clip(al*255*1.6, 0, 255).astype(np.uint8)])
    out = Image.fromarray(rgba, 'RGBA')
    w = max(2, round((x1-x0)*scale)); h = max(2, round((y1-y0)*scale))
    out.resize((w, h), Image.LANCZOS).save(dst, 'WEBP', quality=82, method=6)
def _parts(im, grow=6, min_frac=0.003, max_parts=6):
    """the separate things in a picture on white: [(mask, box)], largest first; specks join their nearest neighbour"""
    from scipy import ndimage as ndi
    ink = _ink(im); H, W = ink.shape
    lab, n = ndi.label(ndi.binary_dilation(ink, iterations=grow))
    if n == 0: return []
    area = ndi.sum(ink, lab, index=range(1, n+1)); order = np.argsort(area)[::-1]
    big = [int(i+1) for i in order if area[i] >= min_frac*H*W][:max_parts] or [int(order[0]+1)]
    keep = np.isin(lab, big)
    _, (iy, ix) = ndi.distance_transform_edt(~keep, return_indices=True)
    owner = np.where(keep, lab, 0); small = (lab > 0) & ~keep; owner[small] = lab[iy, ix][small]
    out = []
    for L in big:
        m = ndi.binary_fill_holes(ndi.binary_dilation(ink & (owner == L), iterations=2))
        out.append((m, _bbox(m)))
    return out

def sofi_layers():
    """Sofi's poses with a transparent background, cropped to the bird (img/c/sofi_<pose>_a.webp)"""
    from PIL import Image
    from scipy import ndimage as ndi
    for pose in ('hallo', 'super', 'hoer', 'schlaf'):
        dst = f'{K}/img/c/sofi_{pose}_a.webp'
        if os.path.exists(dst): continue
        im = _white(Image.open(f'{K}/img/c/sofi_{pose}.webp')); m = ndi.binary_fill_holes(ndi.binary_dilation(_ink(im), iterations=2))
        _cut(im, m, _bbox(m), 1.0, dst)

def scene(n, name, im, hint):
    """split a scene into its separate things, place them on the canvas and put Sofi next to them (or at hint['sofi_at'])"""
    from PIL import Image
    from scipy import ndimage as ndi
    out = f'{K}/img/k{n:02d}'; ink = _ink(im); H, W = ink.shape
    bx0, by0, bx1, by1 = _bbox(ink); bw, bh = bx1-bx0, by1-by0
    pose = hint.get('sofi'); at = hint.get('sofi_at'); side = hint.get('sofi_side', 'right'); beside = bool(pose) and not at
    sw = sh = sar = 0
    if pose:
        sp = Image.open(f'{K}/img/c/sofi_{pose}_a.webp'); sar = sp.width/sp.height
        sw = (0.27 if pose == 'schlaf' else 0.17)*CW; sh = sw/sar
    gap = 0.035*CW if beside else 0
    s = min((CW*0.94-(sw+gap if beside else 0))/bw, 750*0.9/bh)
    if beside and sh > 0.6*bh*s: sh = 0.6*bh*s; sw = sh*sar; s = min((CW*0.94-(sw+gap))/bw, 750*0.9/bh)   # the owl stays smaller than the children
    total = bw*s+(gap+sw if beside else 0)
    xk = (CW-total)/2+((sw+gap) if beside and side == 'left' else 0)
    CH = min(750.0, max(440.0, max(bh*s, sh if beside else 0)/0.88))          # wide scenes get a lower canvas
    base = CH if by1 >= H-3 else CH*0.96; yk = base-bh*s
    parts = _parts(im); who = hint.get('who', {}); names = [[] for _ in parts]
    for w_, (fx, fy) in who.items():
        px, py = min(W-1, int(fx*W)), min(H-1, int(fy*H)); best = None
        for i, (m, box) in enumerate(parts):
            d = 0.0 if m[py, px] else float(ndi.distance_transform_edt(~m)[py, px])
            if best is None or d < best[0]: best = (d, i)
        names[best[1]].append(w_)
    for f in glob.glob(f'{out}/{name}_p*.webp'): os.remove(f)
    recs = []
    for i, (m, box) in enumerate(parts):
        x0, y0, x1, y1 = box; f = f'{name}_p{i+1}'
        _cut(im, m, box, s, f'{out}/{f}.webp')
        recs.append({'f': f, 'x': round((xk+(x0-bx0)*s)/CW*100, 2), 'y': round((yk+(y0-by0)*s)/CH*100, 2), 'w': round((x1-x0)*s/CW*100, 2),
                     'who': ' '.join(names[i]), 'm': 'bob' if names[i] else 'sway'})
    if pose:
        if at:
            sw = at[2]*W*s; sh = sw/sar; cx = xk+(at[0]*W-bx0)*s; by = yk+(at[1]*H-by0)*s
        else:
            cx = (xk+bw*s+gap+sw/2) if side == 'right' else ((CW-total)/2+sw/2); by = base-CH*0.012
        recs.append({'f': f'c:sofi_{pose}_a', 'x': round((cx-sw/2)/CW*100, 2), 'y': round((by-sh)/CH*100, 2), 'w': round(sw/CW*100, 2), 'who': 'sofi', 'm': 'hop'})
    return {'ar': round(CW/CH, 4), 'parts': recs}

def lay(n):
    f = f'{T}/img/k{n:02d}.json'
    return json.load(open(f, encoding='utf-8')) if os.path.exists(f) else {}

def cmd_img(raw, only=()):
    from PIL import Image
    os.makedirs(f'{T}/img', exist_ok=True); sofi_layers()
    for n in chapters():
        if only and n not in only: continue
        d = src(n); hint = d.get('img', {}); out = f'{K}/img/k{n:02d}'; os.makedirs(out, exist_ok=True); L = lay(n)
        for sc in d['story']:                                            # scenes
            name = sc.get('pic'); p = f'{raw}/k{n:02d}_{name}.webp'
            if not name or not os.path.exists(p): continue
            h = hint if name == 'szene' else hint.get(name, {})
            L[name] = scene(n, name, _white(Image.open(p)), h)
        json.dump(L, open(f'{T}/img/k{n:02d}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
        if d.get('kind', 'pic') != 'pic': continue
        ks = [c['k'] for c in d['cards']]; p = f'{raw}/k{n:02d}_karten.webp'
        if os.path.exists(p):                                           # card sheet, two rows of three
            im = _white(Image.open(p)); ink = np.asarray(im).min(axis=2) < 236; H, W = ink.shape
            def cutline(profile, guess, span):
                lo, hi = max(1, guess-span), min(len(profile)-1, guess+span); seg = profile[lo:hi]
                idx = np.where(seg == seg.min())[0]; return lo+int(idx[len(idx)//2])
            ry = [0, cutline(ink.sum(axis=1), H//2, H//5), H]; cells = []
            for r in range(2):
                prof = ink[ry[r]:ry[r+1]].sum(axis=0)
                cx = [0, cutline(prof, W//3, W//8), cutline(prof, 2*W//3, W//8), W]
                for c in range(3): cells.append((cx[c], ry[r], cx[c+1], ry[r+1]))
            for k, ci in zip(ks, hint.get('order') or list(range(6))):
                x0, y0, x1, y1 = cells[ci]; src_im, src_ink = im, ink
                if k in (hint.get('soft') or []):                       # a very light thing (a white egg): keep its pale shading
                    a0 = np.asarray(Image.open(p).convert('RGB')).copy(); a0[a0.min(axis=2) >= 251] = 255
                    src_im = Image.fromarray(a0); src_ink = a0.min(axis=2) < 250
                bb = _bbox(src_ink[y0:y1, x0:x1])
                if not bb: print('!! empty cell', n, k); continue
                _tile(src_im.crop((x0+bb[0], y0+bb[1], x0+bb[2], y0+bb[3])), f'{out}/{k}.webp')
        for k in ks:                                                    # single pictures replace a sheet cell
            p1 = f'{raw}/k{n:02d}_{k}.webp'
            if os.path.exists(p1):
                im = _white(Image.open(p1)); _tile(im.crop(_bbox(_ink(im))), f'{out}/{k}.webp')
        for k, pose in (hint.get('use') or {}).items():                 # a card that shows Sofi herself
            im = _white(Image.open(f'{K}/img/c/{pose}.webp')); _tile(im.crop(_bbox(_ink(im))), f'{out}/{k}.webp')
        for k, (pic, x0, y0, x1, y1) in (hint.get('crop') or {}).items():   # a card cut out of the scene
            im = _white(Image.open(f'{raw}/k{n:02d}_{pic}.webp')); W, H = im.size
            cr = im.crop((int(x0*W), int(y0*H), int(x1*W), int(y1*H))); _tile(cr.crop(_bbox(_ink(cr))), f'{out}/{k}.webp')
        miss = [k for k in ks if not os.path.exists(f'{out}/{k}.webp')]
        print(f'k{n:02d}: scenes {list(L)} parts {[len(v["parts"]) for v in L.values()]}' + (f' missing cards {miss}' if miss else ''))

# ---------------------------------------------------------------- site
def cmd_site():
    book = json.load(open(f'{T}/book.json', encoding='utf-8'))
    ns = chapters(); ready = []; problems = []
    os.makedirs(f'{K}/data', exist_ok=True)
    for n in ns:
        d = src(n); mp = amap(n)
        miss = [f'{w}|{t}' for w, t in keys(d) if f'{w}|{t}' not in mp['aud']]
        L = lay(n)
        for sc in d['story']:
            if sc.get('pic') and sc['pic'] not in L: miss.append('img '+sc['pic'])
        if d.get('kind', 'pic') == 'pic':
            for c in d['cards']:
                if not os.path.exists(f'{K}/img/k{n:02d}/{c["k"]}.webp'): miss.append('img '+c['k'])
        if 'chant' not in mp: miss.append('chant')
        if miss:
            problems.append((n, miss)); continue
        d.setdefault('kind', 'pic')
        need = {f'{w}|{t}' for w, t in keys(d)}
        d['aud'] = {k: v for k, v in mp['aud'].items() if k in need}; d['dur'] = {v: mp['dur'][v] for v in d['aud'].values()}; d['chant'] = mp['chant']
        d['scenes'] = L
        body = json.dumps({k: v for k, v in d.items() if k not in ('n', 'img')}, ensure_ascii=False, separators=(',', ':'))
        open(f'{K}/data/k{n:02d}.js', 'w', encoding='utf-8').write(f'KINDER.put({n},{body});\n'); ready.append(n)
    last = max(it['n'] for g in book['book'] for it in g['items'])     # 32: Feste (33-36) do not count as 'open up to'
    op = 0
    while op+1 in ready and op < last: op += 1
    for f in book['feste']: f['ok'] = 1 if f['n'] in ready else 0
    shell = open(f'{T}/shell.html', encoding='utf-8').read()
    rd = lambda f: open(f'{T}/blocks/{f}', encoding='utf-8').read()
    ver = datetime.datetime.now().strftime('%Y%m%d%H%M')
    for a, b in (('<!--SODA_THEME_JS-->', rd('soda-theme-js.html')), ('/*SODA_DARK_SHARED*/', rd('soda-dark-shared.css')), ('<!--A2HS-->', rd('a2hs.html')),
                 ('__BUILD__', ver), ('__OPEN__', str(op)), ('__BOOK__', json.dumps(book['book'], ensure_ascii=False, separators=(',', ':'))),
                 ('__FESTE__', json.dumps(book['feste'], ensure_ascii=False, separators=(',', ':')))):
        assert shell.count(a) == 1, a; shell = shell.replace(a, b)
    open(f'{K}/index.html', 'w', encoding='utf-8').write(shell)
    print('ready chapters:', ready, '| open up to', op, '| build', ver)
    for n, miss in problems: print(f'  k{n:02d} not ready: {len(miss)} missing, e.g. {miss[:4]}')
    seo = os.path.join(os.path.dirname(K), 'tools', 'seo.py')              # the Lehrwerk tool puts the search tags back
    if os.path.exists(seo): subprocess.run([sys.executable, seo], stdout=subprocess.DEVNULL)

if __name__ == '__main__':
    a = sys.argv[1:]
    if not a: print(__doc__)
    elif a[0] == 'check': cmd_check(parse(a[1:]))
    elif a[0] == 'tts': cmd_tts(parse(a[1:]))
    elif a[0] == 'prompts': cmd_prompts(parse(a[1:]))
    elif a[0] == 'cut': cmd_cut(a[1], a[2:])
    elif a[0] == 'img': cmd_img(a[1], parse(a[2:]))
    elif a[0] == 'site': cmd_site()
