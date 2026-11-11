#!/usr/bin/env python3
"""SODA DIKTATTRAINING · 받아쓰기 문장과 문장별 음성을 만드는 스크립트

재료
  hoertraining/index.html    듣기 훈련의 줄(원문, 해석, 줄 단위 시작·끝 시각)과 hoertraining/audio/*.mp3
  sprechtraining/data/*.js   말하기 훈련 대화의 줄과 sprechtraining/assets/audio/*.mp3 (MZ 챕터는 쓰지 않음)

하는 일
  1. 두 앱에서 3–12단어 줄을 모읍니다.
  2. 글로 보아 받아쓰기에 맞지 않는 줄을 뺍니다(아래 reason() 의 규칙 + tools/ausschluss.json 의 목록).
  3. 음원을 검사해 문장 하나만 깨끗하게 들려줄 수 없는 줄을 뺍니다. 줄마다 자를 자리 또는 뺀 이유를 tools/schnitt.json 에 적습니다.
       듣기 훈련: 전화 음질로 만든 줄, 앞뒤에 쉼이 없어 옆 문장과 떼어 낼 수 없는 줄, 줄 시각이 음원과 맞지 않는 줄,
                  말소리에 다른 큰 소리(안내 방송의 신호음 등)가 겹쳐 배경음을 줄일 때 말소리도 함께 줄어드는 줄
       말하기 훈련: 음성 파일이 문장의 끝소리 도중에 끝나는 줄
  4. 문장마다 음성 파일 audio/<레벨>/<문장 id>.mp3 를 만듭니다(이미 있는 파일은 다시 만들지 않음, --audio 를 붙이면 모두 다시 만듦).
       듣기 훈련 음원은 줄 앞뒤의 무음 구간을 찾아 그 가운데에서 자릅니다.
       배경음(시장, 역, 카페 소리 등)이 깔린 지문은 먼저 배경음을 줄인 음원을 만들어 거기서 자릅니다(DeepFilterNet, 아래 참고).
       말하기 훈련 줄 음성은 통째로 씁니다.
       모든 문장의 음량을 같은 크기로 맞추고 앞뒤에 무음을 붙입니다.
  5. 세트 구성을 tools/sets.json 에 적고, 앱이 읽는 data/saetze.js 를 만듭니다.

세트 구성은 한 번 정해지면 바꾸지 않습니다. 학생의 기록이 세트 id(a1-01)와 문장 id로 저장되기 때문입니다.
새로 생긴 문장은 그 레벨의 새 세트로 뒤에 붙고, 재료에서 없어진 문장은 세트에서 빠집니다.
(--neu 를 붙이면 세트를 처음부터 다시 짭니다. 학생 기록의 세트 번호와 문장이 어긋나므로 평소에는 쓰지 않습니다.)

실행: python3 diktattraining/tools/build.py [--audio] [--neu]      (ffmpeg, node, numpy 필요)

배경음 줄이기
  배경음이 있는 지문의 음성을 새로 만들 때만 DeepFilterNet 의 실행 파일 deep-filter (0.5.6) 가 필요합니다.
  https://github.com/Rikorose/DeepFilterNet/releases 에서 받아 PATH 에 두거나 환경 변수 DEEP_FILTER 에 경로를 적습니다.
  배경음을 줄인 지문 음원은 tools/.cache/ 에 보관합니다(저장소에는 올리지 않음, 환경 변수 DIKTAT_CACHE 로 위치를 바꿀 수 있음).

실행한 뒤에는 diktattraining/index.html 의 saetze.js?v= 값을 바꿔야 학생 기기에 새 내용이 나옵니다.
음성 파일을 바꿨다면 assets/app.js 의 AUDIO_V 도 올립니다.
"""
import collections
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.dirname(HERE)
ROOT = os.path.dirname(APP)
CACHE = os.environ.get('DIKTAT_CACHE') or os.path.join(HERE, '.cache')
SR = 16000              # 음원을 검사할 때 쓰는 표본화 주파수
TARGET = -18.0          # 문장마다 맞추는 음량(EBU R128 통합 음량, LUFS)
MIN_GAP = 0.08          # 줄 앞뒤의 무음이 이보다 짧으면(초) 옆 문장과 깨끗하게 떼어 낼 수 없다고 봅니다.
PAD_BEFORE = 0.25       # 음성 파일 앞에 붙이는 무음(초). 재생을 시작할 때 첫 부분을 놓치는 기기(무선 이어폰 등)가 있어 넉넉하게 둡니다.
PAD_AFTER = 0.30        # 음성 파일 뒤에 붙이는 무음(초)
ATTEN = 24              # 배경음을 줄이는 한도(dB). 더 세게 줄이면 약한 자음까지 깎입니다.
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


# ───────── 2. 글로 고르기 ─────────
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


# ───────── 3. 음원 검사 ─────────
def decode(path, sr=SR):
    import numpy as np
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 'f32le', '-ac', '1', '-ar', str(sr), '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def env_db(x, sr=SR):
    """10ms 간격(20ms 창)의 음량 dB 와, 그것을 50ms 로 평균한 음량"""
    import numpy as np
    hop = sr // 100
    win = hop * 2
    n = 1 + max(0, (len(x) - win)) // hop
    idx = np.arange(win)[None, :] + hop * np.arange(n)[:, None]
    f = x[idx]
    p = (f * f).mean(axis=1) + 1e-12
    ps = np.convolve(p, np.ones(5) / 5, mode='same')
    return 10 * np.log10(p), 10 * np.log10(ps)


def median3(e):
    import numpy as np
    p = np.pad(e, 1, mode='edge')
    return np.median(np.stack([p[:-2], p[1:-1], p[2:]]), axis=0)


def runs_of(mask, minlen):
    """mask 가 참인 연속 구간 (시작 프레임, 끝 프레임+1) 가운데 길이가 minlen 프레임 이상인 것"""
    out, i, n = [], 0, len(mask)
    while i < n:
        if mask[i]:
            j = i
            while j < n and mask[j]:
                j += 1
            if j - i >= minlen:
                out.append((i, j))
            i = j
        else:
            i += 1
    return out


def band_ratio(x, sr, hi=(4000, 7500), lo=(300, 3400)):
    """고음 대역과 말소리 중심 대역의 에너지 차(dB). 전화 음질이면 아주 낮습니다."""
    import numpy as np
    n = 512
    if len(x) < n:
        return 0.0
    fr = np.lib.stride_tricks.sliding_window_view(x, n)[::n // 2] * np.hanning(n)
    P = (np.abs(np.fft.rfft(fr, axis=1)) ** 2).mean(axis=0)
    f = np.fft.rfftfreq(n, 1 / sr)
    a = P[(f >= hi[0]) & (f < hi[1])].sum() + 1e-12
    b = P[(f >= lo[0]) & (f < lo[1])].sum() + 1e-12
    return float(10 * np.log10(a / b))


def signature(path):
    return '%d-%s' % (os.path.getsize(path), hashlib.sha1(open(path, 'rb').read()).hexdigest()[:12])


def pause_level(e, es, ref):
    """말소리가 없는 0.25초 이상 구간의 음량 중앙값(dB). 그런 구간이 없으면 None"""
    import numpy as np
    P = [(a + 6, b - 6) for a, b in runs_of(es < ref - 26, 25)]
    P = [(a, b) for a, b in P if b > a]
    if not P:
        return None
    return float(np.median(np.concatenate([e[a:b] for a, b in P])))


def denoised(src):
    """배경음을 줄인 지문 음원(32kHz flac)의 경로. 없으면 만들어 CACHE 에 둡니다."""
    name = os.path.splitext(os.path.basename(src))[0]
    out = os.path.join(CACHE, '%s-%s-a%d.flac' % (name, signature(src), ATTEN))
    if os.path.exists(out):
        return out
    exe = os.environ.get('DEEP_FILTER') or shutil.which('deep-filter')
    if not exe:
        raise SystemExit('배경음이 있는 지문(%s)을 처리하려면 DeepFilterNet 실행 파일 deep-filter 가 필요합니다.\n'
                         'https://github.com/Rikorose/DeepFilterNet/releases 에서 받아 PATH 에 두거나 DEEP_FILTER 에 경로를 적으세요.' % os.path.basename(src))
    os.makedirs(CACHE, exist_ok=True)
    tmp = os.path.join(CACHE, name + '.wav')
    odir = os.path.join(CACHE, 'df')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-ac', '1', '-ar', '48000', '-c:a', 'pcm_s16le', tmp], check=True)
    subprocess.run([exe, '-D', '-a', str(ATTEN), '-o', odir, tmp], check=True, capture_output=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', os.path.join(odir, name + '.wav'), '-ac', '1', '-ar', '32000', '-c:a', 'flac', out], check=True)
    os.remove(tmp)
    os.remove(os.path.join(odir, name + '.wav'))
    return out


def pick(runs, t0, t1, nominal, later):
    """[t0, t1] 과 겹치는 무음 구간 가운데 줄 시각(nominal)에 가장 가까운 것. 같으면 later 에 따라 뒤쪽·앞쪽"""
    c = [(i, j) for i, j in runs if j * 0.01 > t0 and i * 0.01 < t1]
    if not c:
        return None

    def dist(r):
        a, b = r[0] * 0.01, r[1] * 0.01
        return 0.0 if a - 0.05 <= nominal <= b + 0.05 else round(min(abs(nominal - a), abs(nominal - b)), 2)
    d = min(dist(r) for r in c)
    best = [r for r in c if dist(r) == d]
    return best[-1] if later else best[0]


def analyze_passage(src, L, want):
    """듣기 훈련 지문 하나에서 want(줄 번호)의 줄마다 자를 자리를 정합니다.
    돌려주는 값: {sig, noisy, snr, lines: {줄 번호: {s 시작, e 끝, gb 앞 무음, ga 뒤 무음} 또는 {aus 뺀 이유}}}"""
    import numpy as np
    x0 = decode(src)
    e0, es0 = env_db(x0)
    ref0 = float(np.percentile(e0, 95))
    fl0 = pause_level(e0, es0, ref0)
    lvl0 = float(np.mean(e0[es0 > ref0 - 26]))
    snr = 99.0 if fl0 is None else min(99.0, lvl0 - fl0)
    noisy = snr < 35                                    # 쉼 구간에도 소리가 이어짐 = 배경음이 깔린 지문 (숨소리만 가끔 들리는 지문은 40 이상)
    if noisy:
        x = decode(denoised(src))
        e, es = env_db(x)
        ref = float(np.percentile(e, 95))
        fl = pause_level(e, es, ref)
        m = min(len(e0), len(e))
        hit = (e0[:m] > ref0 - 15) & (e[:m] - e0[:m] < -6)     # 원본에서 말소리만큼 크던 소리가 6dB 넘게 줄어든 곳
    else:
        x, e, ref, fl = x0, e0, ref0, fl0
        hit = None
    thr = max(ref - 45.0, (fl if fl is not None else -120.0) + 8.0)
    runs = runs_of(median3(e) <= thr, 6)                # 60ms 이상 이어지는 무음
    dur = len(x) / SR
    out = {}
    for l in L:
        if l['n'] not in want:
            continue
        k = l['n'] - 1
        if not l.get('t'):
            out[str(l['n'])] = dict(aus='줄 시각이 없음')
            continue
        a, b = l['t']
        pe = L[k - 1]['t'][1] if k > 0 and L[k - 1].get('t') else 0.0
        ns = L[k + 1]['t'][0] if k < len(L) - 1 and L[k + 1].get('t') else dur
        r1 = pick(runs, max(pe - 0.40, a - 0.80, 0.0), a + 0.40, a, True)
        r2 = pick(runs, b - 0.40, min(ns + 0.40, b + 0.80, dur), b, False)
        if r1 is None or r2 is None or r2[0] <= r1[1]:
            out[str(l['n'])] = dict(aus='앞뒤에 쉼이 없어 옆 소리와 떼어 낼 수 없음')
            continue
        on, off = r1[1] * 0.01, r2[0] * 0.01 + 0.01     # 말소리가 시작하는 때와 끝나는 때
        gb, ga = (r1[1] - r1[0]) * 0.01, (r2[1] - r2[0]) * 0.01
        if gb < MIN_GAP or ga < MIN_GAP:
            out[str(l['n'])] = dict(aus='앞뒤 쉼이 짧아 옆 문장과 떼어 낼 수 없음(%.2f초/%.2f초)' % (gb, ga))
            continue
        if abs((off - on) - (b - a - 0.34)) > 0.6:      # 줄 시각은 보통 말소리보다 0.14초 먼저 시작하고 0.20초 늦게 끝납니다
            out[str(l['n'])] = dict(aus='줄 시각이 음원과 맞지 않음')
            continue
        if band_ratio(x0[int(on * SR):int(off * SR)], SR) < -30:
            out[str(l['n'])] = dict(aus='전화 음질로 만든 줄')
            continue
        if hit is not None:
            h = hit[int(on * 100):int(off * 100)]
            longest = max([j - i for i, j in runs_of(h, 1)] or [0])
            if longest >= 10 or int(h.sum()) >= 25:        # 0.1초 넘게 이어지거나 모두 0.25초가 넘으면
                out[str(l['n'])] = dict(aus='말소리에 다른 큰 소리가 겹쳐 배경음을 줄일 때 말소리도 함께 줄어듦')
                continue
        start = max(0.0, on - min(0.18, gb / 2))
        end = min(dur, off + min(0.28, ga / 2))
        out[str(l['n'])] = dict(s=round(start, 3), e=round(end, 3), gb=round(gb, 2), ga=round(ga, 2))
    return dict(sig=signature(src), noisy=bool(noisy), snr=round(snr, 1), lines=out)


def last_sound(text):
    """문장의 마지막 소리 종류: F 마찰음, P 파열음, N 비음·유음, V 모음"""
    w = re.sub(r'[^a-zäöüß]', '', text.split()[-1].lower())
    if re.search(r'(sch|ch|s|ß|f|z|x)$', w):
        return 'F'
    if re.search(r'ng$', w):
        return 'N'
    if re.search(r'[tdkgpb]$', w):
        return 'P'
    if re.search(r'[nml]$', w):
        return 'N'
    return 'V'


def tail_check(x, sr, text):
    """말하기 훈련 줄 음성이 문장 끝까지 들어 있는지 봅니다. (쓸 수 있는지, 끝을 줄이는 길이 ms, 설명)
    이 음성 파일들은 말소리 바로 뒤에서 끝나는데, 일부는 마지막 소리가 아직 크게 나는 도중에 끝납니다."""
    import numpy as np
    e, _ = env_db(x, sr)
    ref = float(np.percentile(e, 95))
    end = float(np.mean(e[-2:])) - ref                  # 파일이 끝나는 순간의 음량(기준 대비)
    c = last_sound(text)
    t = e[-32:] - ref
    hf = band_ratio(x[-int(0.06 * sr):], sr, hi=(4000, 10000), lo=(200, 3400))
    burst = False                                       # 닫힘(음량이 내려간 곳) 뒤에 터지는 소리가 20ms 이상 있는지
    k = len(t) - 22 + int(np.argmin(t[-22:]))
    if k < len(t) - 2 and t[k] <= t[:k + 1].max() - 10 and (t[k + 1:] >= t[k] + 6).sum() >= 2:
        burst = True
    if end <= -25:
        if c == 'P' and not burst:
            hfs = [band_ratio(x[len(x) - int((j + 0.06) * sr):len(x) - int(j * sr) or None], sr, hi=(4000, 10000), lo=(200, 3400)) for j in (0.0, 0.04, 0.08, 0.12, 0.16)]
            if max(hfs) < -8:
                return False, 0, '끝 자음(파열음)이 들리지 않을 수 있음'
        return True, 12, '끝까지 있음'
    if c == 'F' and hf > -8:
        return True, 25, '마지막 마찰음 도중에 끝남(소리는 있음)'
    if c == 'P' and burst and hf > -12:
        return True, 6, '마지막 파열음이 터진 뒤에 끝남'
    return False, 0, '음성 파일이 끝소리 도중에 끝남'


def analyze_s(src, text):
    x = decode(src, 44100)
    ok, fade, why = tail_check(x, 44100, text)
    return dict(sig=signature(src), fade=fade) if ok else dict(sig=signature(src), aus=why)


def audio_plan(cands, all_h, schnitt):
    """글로 고른 줄(cands)마다 음원을 검사해 schnitt 를 채웁니다. 음원이 바뀌지 않은 줄은 다시 검사하지 않습니다."""
    by = collections.defaultdict(list)
    for l in all_h:
        by[l['item']].append(l)
    want = collections.defaultdict(set)
    for l in cands:
        if l['src'] == 'h':
            want[l['audio']].add(l['n'])
    items = {l['audio']: l['item'] for l in cands if l['src'] == 'h'}
    for rel in sorted(want):
        src = os.path.join(ROOT, rel)
        ent = schnitt.get(rel)
        if ent and ent.get('sig') == signature(src) and all(str(n) in ent['lines'] for n in want[rel]):
            continue
        print('음원 검사:', rel, flush=True)
        new = analyze_passage(src, by[items[rel]], want[rel])
        if ent and ent.get('sig') == new['sig']:
            ent['lines'].update(new['lines'])
        else:
            schnitt[rel] = new
    for l in cands:
        if l['src'] != 's':
            continue
        src = os.path.join(ROOT, l['audio'])
        ent = schnitt.get(l['audio'])
        if ent and ent.get('sig') == signature(src):
            continue
        schnitt[l['audio']] = analyze_s(src, l['de'])


def audio_reason(l, schnitt):
    ent = schnitt[l['audio']]
    if l['src'] == 'h':
        return ent['lines'][str(l['n'])].get('aus')
    return ent.get('aus')


# ───────── 4. 음성 만들기 ─────────
def loudness(pcm, rate):
    """귀로 느끼는 크기에 가까운 음량(EBU R128 통합 음량, LUFS). 잴 수 없으면 None"""
    out = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-f', 'f32le', '-ar', str(rate), '-ac', '1', '-i', '-',
                          '-af', 'highpass=f=60,ebur128=framelog=quiet', '-f', 'null', '-'], input=pcm.tobytes(), capture_output=True).stderr.decode('utf-8', 'replace')
    m = re.findall(r'I:\s+(-?[\d.]+) LUFS', out)
    return float(m[-1]) if m and float(m[-1]) > -60 else None


def level_gain(seg, rate):
    """음량을 TARGET 에 맞추는 배수"""
    import numpy as np
    lu = loudness(seg, rate)
    if lu is None:                                      # 아주 짧아 잴 수 없는 경우: 큰 소리 구간의 평균 전력으로 대신합니다
        e, _ = env_db(seg, rate)
        ref = float(np.percentile(e, 95))
        lu = float(10 * np.log10(np.mean(10 ** (e[e > ref - 20] / 10)))) - 1.4
    return 10 ** (max(-12.0, min(14.0, TARGET - lu)) / 20)


def write_clip(seg, rate, dst):
    """음량을 맞추고 앞뒤에 무음을 붙여 mp3 로 저장합니다. 60Hz 아래의 웅웅거리는 소리는 걸러 내고, 드물게 튀는 소리는 limiter 가 눌러 줍니다."""
    import numpy as np
    seg = np.ascontiguousarray(seg, dtype=np.float32)
    pcm = np.concatenate([np.zeros(int(PAD_BEFORE * rate), dtype=np.float32), seg * np.float32(level_gain(seg, rate)),
                          np.zeros(int(PAD_AFTER * rate), dtype=np.float32)])
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(rate), '-ac', '1', '-i', '-',
                    '-af', 'highpass=f=60,alimiter=limit=0.89:attack=3:release=40:level=0:latency=1', '-ac', '1', '-ar', str(rate),
                    '-c:a', 'libmp3lame', '-b:a', '96k', '-map_metadata', '-1', '-write_xing', '0', dst], input=pcm.tobytes(), check=True)


def trim_silence(y, rate):
    """말하기 훈련 줄 음성의 앞뒤에 무음이 길게 붙어 있으면 줄입니다(앞 0.05초, 뒤 0.10초만 남김)."""
    import numpy as np
    e, _ = env_db(y, rate)
    snd = np.where(e > float(np.percentile(e, 95)) - 45)[0]
    hop = rate // 100
    a = max(0, snd[0] * hop - int(0.05 * rate)) if snd[0] * 0.01 > 0.15 else 0
    b = min(len(y), (snd[-1] + 2) * hop + int(0.10 * rate)) if (len(e) - 1 - snd[-1]) * 0.01 > 0.25 else len(y)
    return y[a:b]


def fade(seg, rate, ms_in, ms_out):
    import numpy as np
    seg = seg.copy()
    a, b = max(1, int(rate * ms_in / 1000)), max(1, int(rate * ms_out / 1000))
    seg[:a] *= np.linspace(0.0, 1.0, a, dtype=np.float32)
    seg[-b:] *= np.linspace(1.0, 0.0, b, dtype=np.float32)
    return seg


def make_audio(sel, schnitt, force):
    import numpy as np
    made = 0
    todo = collections.defaultdict(list)
    for l in sel:
        dst = os.path.join(APP, 'audio', l['lv'].lower(), sid(l) + '.mp3')
        if force or not os.path.exists(dst):
            todo[l['audio']].append((l, dst))
    for rel in sorted(todo):
        src = os.path.join(ROOT, rel)
        ent = schnitt[rel]
        if todo[rel][0][0]['src'] == 'h':
            rate = 32000
            y = decode(denoised(src) if ent['noisy'] else src, rate)
            for l, dst in todo[rel]:
                c = ent['lines'][str(l['n'])]
                write_clip(fade(y[int(c['s'] * rate):int(c['e'] * rate)], rate, 10, 15), rate, dst)   # 자른 자리는 무음이라 짧게만 다듬습니다
                made += 1
        else:
            rate = 44100
            y = trim_silence(decode(src, rate), rate)
            e, _ = env_db(y, rate)
            loud_start = e[0] > float(np.percentile(e, 95)) - 35                                      # 파일이 소리와 함께 시작하면 조금 길게 다듬습니다
            for l, dst in todo[rel]:
                write_clip(fade(y, rate, 8 if loud_start else 3, ent['fade']), rate, dst)
                made += 1
    return made


def duration(path):
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path], capture_output=True, text=True).stdout
    return round(float(out), 2)


def check_clips(sel):
    """만든 음성 파일을 다시 열어 음량과 앞뒤 무음을 확인합니다. 어긋난 파일의 목록을 돌려줍니다."""
    import numpy as np
    bad = []
    for l in sel:
        p = os.path.join(APP, 'audio', l['lv'].lower(), sid(l) + '.mp3')
        x = decode(p, 32000)
        e, _ = env_db(x, 32000)
        if not (e > -90).any():
            bad.append((sid(l), '소리가 없음'))
            continue
        ref = float(np.percentile(e[e > -90], 95))
        act = np.where(e > ref - 35)[0]
        head, tail = act[0] * 0.01, (len(e) - 1 - act[-1]) * 0.01
        lu = loudness(x, 32000)
        why = []
        if lu is not None and abs(lu - TARGET) > 1.5:
            why.append('음량 %.1f LUFS' % lu)
        if head < PAD_BEFORE - 0.03:
            why.append('앞 무음 %.2f초' % head)
        if tail < PAD_AFTER - 0.10:
            why.append('뒤 무음 %.2f초' % tail)
        if why:
            bad.append((sid(l), ', '.join(why)))
    return bad


# ───────── 5. 세트 ─────────
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
    dropped = collections.Counter()
    cands = []
    for l in lines:
        r = reason(l, manual)
        if r:
            if r != '길이(3–12단어가 아님)':
                dropped[r] += 1
        else:
            cands.append(l)

    # 음원 검사: 자를 자리를 정하고, 깨끗하게 들려줄 수 없는 줄을 뺍니다.
    schnitt_path = os.path.join(HERE, 'schnitt.json')
    schnitt = json.load(open(schnitt_path, encoding='utf-8')) if os.path.exists(schnitt_path) else {}
    audio_plan(cands, all_h, schnitt)
    json.dump(schnitt, open(schnitt_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1, sort_keys=True)
    sel, seen, adrop = [], set(), collections.Counter()
    for l in cands:
        r = audio_reason(l, schnitt)
        if r:
            adrop[re.sub(r'\(.*\)$', '', r)] += 1
            continue
        key = re.sub(r'[^\wäöüß ]', '', l['de'].lower()).strip()
        if key in seen:
            dropped['같은 문장'] += 1
            continue
        seen.add(key)
        sel.append(l)
    by_id = {sid(l): l for l in sel}

    made = make_audio(sel, schnitt, force)

    # 세트: 이미 정해진 구성은 그대로 두고, 새 문장만 새 세트로 붙입니다.
    sets_path = os.path.join(HERE, 'sets.json')
    frozen = json.load(open(sets_path, encoding='utf-8')) if os.path.exists(sets_path) and '--neu' not in sys.argv else {}
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
    print('글로 뺀 줄:', dict(dropped))
    print('음원 때문에 뺀 줄:', dict(adrop))
    print('새로 만든 음성 %d개' % made)
    bad = check_clips(sel)
    for i, why in bad:
        print('확인 필요:', i, why)
    # 쓰지 않는 음성 파일 알림
    for lv in LEVELS:
        d = os.path.join(APP, 'audio', lv.lower())
        if os.path.isdir(d):
            extra = sorted(f for f in os.listdir(d) if f.endswith('.mp3') and f[:-4] not in by_id)
            if extra:
                print('쓰지 않는 음성(%s) %d개: %s' % (lv, len(extra), ', '.join(extra[:6]) + (' …' if len(extra) > 6 else '')))


if __name__ == '__main__':
    main()
