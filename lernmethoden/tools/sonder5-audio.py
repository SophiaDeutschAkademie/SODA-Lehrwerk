"""절대음감 글(특별 주제, 글 id sonder-5) 예시 음원 생성 스크립트.

piper(독일어 남성 음성 thorsten)로 읽고, TD-PSOLA로 관사와 명사의 음 높이를 정한 음에 고정한 뒤
기준음을 앞에 붙여 mp3로 저장한다. 결과는 lernmethoden/audio/sonder-5/ 에 둔다.

준비(이 파일과 같은 폴더에):
  curl -L https://github.com/rhasspy/piper/releases/download/2023.11.14-2/piper_linux_x86_64.tar.gz | tar xz
  curl -L https://github.com/rhasspy/piper/releases/download/v0.0.2/voice-de-thorsten-low.tar.gz | tar xz
실행: python3 sonder5-audio.py ../audio/sonder-5
음: 도 C3, 미 E3, 솔 G2, 라 A2 (목소리 음역에 맞춰 솔·라는 한 옥타브 낮음)
"""
import json, os, subprocess, sys, wave
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
PIPER = os.path.join(HERE, 'piper', 'piper')
MODEL = os.path.join(HERE, 'de-thorsten-low.onnx')
OUT = sys.argv[1]
SR = 16000
NOTE = {'C': 130.81, 'E': 164.81, 'G': 98.00, 'A': 110.00}


def tts(text, length_scale=1.0):
    path = os.path.join(HERE, 'tmp.wav')
    subprocess.run([PIPER, '-m', MODEL, '-f', path, '--length_scale', str(length_scale),
                    '--sentence_silence', '0'], input=text.encode(), check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    with wave.open(path) as w:
        assert w.getframerate() == SR
        x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768
    # 앞뒤 무음 자르기
    env = np.convolve(np.abs(x), np.ones(160) / 160, 'same')
    idx = np.where(env > 0.01)[0]
    return x[max(idx[0] - 160, 0): idx[-1] + 320]


def f0_track(x, hop=80, win=480, fmin=70, fmax=320):
    n = (len(x) - win) // hop + 1
    f0 = np.zeros(max(n, 0))
    lo, hi = SR // fmax, SR // fmin
    for k in range(n):
        fr = x[k * hop: k * hop + win] * np.hanning(win)
        if np.sqrt(np.mean(fr ** 2)) < 0.012:
            continue
        ac = np.correlate(fr, fr, 'full')[win - 1:]
        ac /= ac[0] + 1e-12
        lag = lo + np.argmax(ac[lo:hi])
        if ac[lag] > 0.45:
            f0[k] = SR / lag
    # 중앙값 필터로 튀는 값 정리
    g = f0.copy()
    for k in range(len(f0)):
        seg = f0[max(0, k - 2): k + 3]
        v = seg[seg > 0]
        g[k] = np.median(v) if f0[k] > 0 and len(v) else 0
    return g, hop


def marks(x, f0, hop):
    """분석 표지(위치, 반주기 길이, 유성 여부)"""
    out = []
    t = 0
    uv = int(0.008 * SR)
    while t < len(x):
        k = min(int(t / hop), len(f0) - 1)
        if f0[k] > 0:
            P = int(SR / f0[k])
            a, b = max(t - P // 2, 0), min(t + P // 2, len(x))
            if b > a:
                t = a + int(np.argmax(np.abs(x[a:b])))
            out.append((t, P, True))
            t += P
        else:
            out.append((t, uv, False))
            t += uv
    return out


def psola(x, target_hz):
    f0, hop = f0_track(x)
    if not len(f0):
        return x
    ms = marks(x, f0, hop)
    pos = np.array([m[0] for m in ms])
    T0 = int(round(SR / target_hz))
    y = np.zeros(len(x) + 2 * SR)
    ts = ms[0][0]
    while ts < len(x):
        j = int(np.argmin(np.abs(pos - ts)))
        t, P, v = ms[j]
        a, b = t - P, t + P
        g = np.zeros(2 * P)
        sa, sb = max(a, 0), min(b, len(x))
        g[sa - a: sa - a + (sb - sa)] = x[sa:sb]
        g *= np.hanning(2 * P)
        step = T0 if v else P
        g *= step / P
        s = ts - P
        if s >= 0:
            y[s: s + 2 * P] += g
        ts += step
    y = y[: len(x)]
    return y


def tone(hz, dur=0.55):
    t = np.arange(int(dur * SR)) / SR
    s = sum((0.6 ** (h - 1)) * np.sin(2 * np.pi * hz * h * t) for h in range(1, 6))
    env = np.minimum(t / 0.008, 1) * np.exp(-t * 4.0)
    return 0.35 * s / np.max(np.abs(s)) * env


def norm(y, peak=0.8):
    return y * (peak / (np.max(np.abs(y)) + 1e-9))


def sil(sec):
    return np.zeros(int(sec * SR))


def chunk(text, note=None, ls=1.15):
    x = tts(text, ls)
    if note:
        x = psola(x, NOTE[note])
    return norm(x)


def save(name, y):
    y = np.concatenate([sil(0.05), y, sil(0.15)])
    pcm = (np.clip(y, -1, 1) * 32767).astype(np.int16)
    wp = os.path.join(HERE, name + '.wav')
    with wave.open(wp, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wp, '-ac', '1', '-ar', '22050',
                    '-codec:a', 'libmp3lame', '-b:a', '48k', os.path.join(OUT, name + '.mp3')], check=True)


def phrase_set(name, note, phrases, gap=0.45):
    parts = [tone(NOTE[note]), sil(0.2)]
    for i, p in enumerate(phrases):
        if i:
            parts.append(sil(gap))
        parts.append(chunk(p, note))
    save(name, np.concatenate(parts))


def mixed(name, items, gap=0.12):
    """items: [(text, note|None)] — 음이 있는 덩어리만 음 높이 고정"""
    parts = []
    for i, (t, n) in enumerate(items):
        if i:
            parts.append(sil(gap))
        parts.append(chunk(t, n, 1.05))
    save(name, np.concatenate(parts))


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    # 방법 1: 성마다 음 하나
    phrase_set('m1-stuhl', 'C', ['der Stuhl'])
    phrase_set('m1-lampe', 'E', ['die Lampe'])
    phrase_set('m1-bett', 'G', ['das Bett'])
    phrase_set('m1-stuehle', 'A', ['die Stühle'])
    phrase_set('m1-loeffel-sg', 'C', ['der Löffel'])
    phrase_set('m1-loeffel-pl', 'A', ['die Löffel'])
    # 방법 2: 정관사·부정관사·소유관사·kein
    phrase_set('m2-mask', 'C', ['der Stuhl', 'ein Stuhl', 'mein Stuhl', 'kein Stuhl'])
    phrase_set('m2-fem', 'E', ['die Lampe', 'eine Lampe', 'meine Lampe', 'keine Lampe'])
    phrase_set('m2-neut', 'G', ['das Bett', 'ein Bett', 'mein Bett', 'kein Bett'])
    phrase_set('m2-pl', 'A', ['die Stühle', 'Stühle', 'meine Stühle', 'keine Stühle'])
    mixed('m2-satz-stuhl', [('Das ist', None), ('mein Stuhl.', 'C'), ('Wo ist', None), ('dein Stuhl?', 'C')])
    mixed('m2-satz-lampe', [('Das ist', None), ('meine Lampe.', 'E'), ('Wo ist', None), ('deine Lampe?', 'E')])
    # 방법 3: 격변화 세로 읽기
    phrase_set('m3-mask', 'C', ['der, den, dem, des', 'ein, einen, einem, eines', 'mein, meinen, meinem, meines'], 0.6)
    phrase_set('m3-fem', 'E', ['die, die, der, der', 'eine, eine, einer, einer', 'meine, meine, meiner, meiner'], 0.6)
    phrase_set('m3-neut', 'G', ['das, das, dem, des', 'ein, ein, einem, eines', 'mein, mein, meinem, meines'], 0.6)
    phrase_set('m3-pl', 'A', ['die, die, den, der', 'meine, meine, meinen, meiner'], 0.6)
    mixed('m3-satz', [('Der Mann', 'C'), ('gibt', None), ('der Frau', 'E'), ('das Buch.', 'G')])
    print('done')
