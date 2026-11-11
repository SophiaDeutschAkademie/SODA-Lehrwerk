#!/usr/bin/env python3
"""SODA DIKTATTRAINING · 만든 음성을 음성 인식 두 가지로 받아 적어 원문과 비교하는 검사 도구 (선택)

음성 파일에 문장이 빠짐없이 들어 있는지, 옆 문장의 소리가 섞이지 않았는지 확인할 때 씁니다.
음성 인식은 잡음이나 끊긴 소리에 사람보다 너그러우므로, 이 검사를 통과했다고 해서 듣기 좋은 음성이라는 뜻은 아닙니다.
자른 자리와 배경음은 build.py 가 따로 검사합니다.

필요한 것 (저장소에는 들어 있지 않음)
  sherpa-onnx 실행 파일 sherpa-onnx-offline            환경 변수 SHERPA 에 경로
  Parakeet 모델 폴더(sherpa-onnx-nemo-parakeet-tdt-0.6b-v3-int8)  환경 변수 PARAKEET
  Whisper 모델 폴더(sherpa-onnx-whisper-turbo)                    환경 변수 WHISPER
  모두 https://github.com/k2-fsa/sherpa-onnx/releases 에서 받을 수 있습니다.

실행: python3 diktattraining/tools/asr_check.py
  받아 적은 글은 tools/.cache/asr.json 에 모아 두어, 바뀐 음성 파일만 다시 받아 적습니다.
  두 가지 모두 원문과 같으면 통과, 하나라도 다르면 화면에 보여 줍니다(이름과 숫자 표기 차이는 무시).
"""
import hashlib
import json
import os
import re
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import build as B  # noqa: E402

ONES = ['null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn', 'elf', 'zwölf', 'dreizehn', 'vierzehn', 'fünfzehn',
        'sechzehn', 'siebzehn', 'achtzehn', 'neunzehn']
TENS = ['', '', 'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig']
SAME = {'ok': 'okay', 'tschüss': 'tschüs', 'hmm': 'hm', 'gerne': 'gern', 'ohje': 'oje', 'frisör': 'friseur', 'nee': 'ne', 'na': 'na'}


def n2de(n):
    if n < 20:
        return ONES[n]
    if n < 100:
        t, o = divmod(n, 10)
        return TENS[t] if o == 0 else ('ein' if o == 1 else ONES[o]) + 'und' + TENS[t]
    if n < 1000:
        h, r = divmod(n, 100)
        return ('ein' if h == 1 else ONES[h]) + 'hundert' + (n2de(r) if r else '')
    if n < 10000:
        t, r = divmod(n, 1000)
        return ('ein' if t == 1 else ONES[t]) + 'tausend' + (n2de(r) if r else '')
    return str(n)


def norm(s, names=()):
    s = s.lower().replace("'", '').replace('’', '')
    s = re.sub(r'(\d+)[:.](\d\d)\b', r'\1 uhr \2', s)
    s = re.sub(r'(\d+)\.(?=\s|$)', r'\1', s)
    s = re.sub(r'\d+', lambda m: ' ' + n2de(int(m.group(0))) + ' ', s)
    s = re.sub(r'[^a-zäöüß0-9 ]', ' ', s.replace('-', ''))
    out = [SAME.get(w, w).replace('ß', 'ss') for w in s.split()]
    return [w for w in out if w not in names]


def transcribe(wavs, kind, save):
    """wavs 를 받아 적어 save(파일 이름, 글) 로 넘깁니다. 모델을 여러 번 읽지 않도록 묶어서 돌리고, 빠진 것은 작은 묶음으로 다시 돌립니다."""
    exe = os.environ.get('SHERPA')
    if kind == 'p':
        m = os.environ.get('PARAKEET')
        args = ['--tokens=%s/tokens.txt' % m, '--encoder=%s/encoder.int8.onnx' % m, '--decoder=%s/decoder.int8.onnx' % m, '--joiner=%s/joiner.int8.onnx' % m,
                '--model-type=nemo_transducer']
    else:
        m = os.environ.get('WHISPER')
        args = ['--tokens=%s/turbo-tokens.txt' % m, '--whisper-encoder=%s/turbo-encoder.int8.onnx' % m, '--whisper-decoder=%s/turbo-decoder.int8.onnx' % m,
                '--whisper-language=de', '--whisper-task=transcribe']
    left = list(wavs)
    for size in (24, 6, 1):
        todo, left = left, []
        for k in range(0, len(todo), size):
            part = todo[k:k + size]
            p = subprocess.run([exe] + args + ['--num-threads=2'] + part, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
            got = {mm.group(1): json.loads(mm.group(2))['text'].strip() for mm in re.finditer(r'([^\n]+\.wav)\n(\{.*?\})\n', p.stdout)}
            for w in part:
                if w in got:
                    save(w, got[w])
                else:
                    left.append(w)
            print('  %s %d/%d' % ('Parakeet' if kind == 'p' else 'Whisper', min(k + size, len(todo)), len(todo)), flush=True)
        if not left:
            break


def main():
    for v in ('SHERPA', 'PARAKEET', 'WHISPER'):
        if not os.environ.get(v):
            raise SystemExit('환경 변수 %s 가 필요합니다. 파일 맨 위의 설명을 보세요.' % v)
    s = open(os.path.join(APP, 'data', 'saetze.js'), encoding='utf-8').read()
    D = json.loads(s[s.index('window.DIKTAT_DATA = ') + 21:].rstrip().rstrip(';'))
    items = [(st['lv'].lower(), it) for st in D['sets'] for it in st['items']]
    os.makedirs(B.CACHE, exist_ok=True)
    cp = os.path.join(B.CACHE, 'asr.json')
    cache = json.load(open(cp, encoding='utf-8')) if os.path.exists(cp) else {}
    tmp = tempfile.mkdtemp(prefix='diktat-asr-')
    todo = {'p': [], 'w': []}
    key = {}
    for lv, it in items:
        mp3 = os.path.join(APP, 'audio', lv, it['id'] + '.mp3')
        h = hashlib.sha1(open(mp3, 'rb').read()).hexdigest()[:12]
        key[it['id']] = h
        ent = cache.get(it['id'])
        if not ent or ent.get('sig') != h:
            cache[it['id']] = ent = dict(sig=h)
        need = [k for k in ('p', 'w') if k not in ent]
        if need:
            wav = os.path.join(tmp, it['id'] + '.wav')
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', mp3, '-ar', '16000', '-ac', '1', wav], check=True)
            for k in need:
                todo[k].append(wav)
    for k in ('p', 'w'):
        if todo[k]:
            done = [0]

            def save(wav, text, k=k, done=done):
                cache[os.path.basename(wav)[:-4]][k] = text
                done[0] += 1
                if done[0] % 24 == 0:
                    json.dump(cache, open(cp, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
            transcribe(todo[k], k, save)
            json.dump(cache, open(cp, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    names = {n.lower().replace('-', '') for n in B.NAMES}
    both = one = none = 0
    for lv, it in items:
        ent = cache[it['id']]
        a = norm(it['de'], names)
        ok = [(''.join(norm(ent.get(k, ''), names)) == ''.join(a)) for k in ('p', 'w')]
        if all(ok):
            both += 1
            continue
        if any(ok):
            one += 1
        else:
            none += 1
        print('%s [%s]\n   원문    : %s\n   Parakeet: %s\n   Whisper : %s' % (it['id'], '하나만 같음' if any(ok) else '둘 다 다름', it['de'], ent.get('p', '(없음)'), ent.get('w', '(없음)')))
    print('문장 %d개: 둘 다 같음 %d, 하나만 같음 %d, 둘 다 다름 %d' % (len(items), both, one, none))


if __name__ == '__main__':
    main()
