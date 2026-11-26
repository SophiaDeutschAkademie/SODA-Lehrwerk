#!/usr/bin/env python3
"""VOKALAB 단어 데이터(vokalab/data/words.js) 점검 도구.

  python3 tools/vokalab_data.py            점검만 합니다(고칠 것이 있으면 목록을 보이고 1로 끝납니다).
  python3 tools/vokalab_data.py --stamp    점검한 뒤 vokalab/index.html 의 words.js?v= 값을 지금 단어 파일에 맞춥니다.

단어 파일을 고쳤으면(뜻 수정, 단어 추가·삭제, 시험용 목록 변경) 반드시 --stamp 로 실행하고 index.html 도 함께 올립니다.
v= 값이 그대로면 학생 브라우저가 예전 단어 파일을 계속 쓸 수 있습니다.

규칙(README 「VOKALAB 파일 구성」과 같습니다)
  - 단어 번호 i 는 레벨 안에서 고유하고, 한번 쓴 번호는 바꾸거나 다시 쓰지 않습니다(학습 기록이 번호로 단어를 찾습니다).
  - 새 단어: 그 레벨의 n 을 번호로 쓰고 n 을 1 늘립니다. 줄은 어디에 넣어도 됩니다.
  - 단어 삭제: 줄을 지우고 그 레벨의 gone 에 "번호": -1 (같은 레벨의 다른 단어로 합쳤으면 그 단어 번호)을 더합니다.
  - 시험용 단어 추가: exam.<레벨>.seq 끝에 번호를 붙이고 그 단어에 "x":1 을 적습니다. seq 의 순서와 이미 있는 번호는 바꾸지 않습니다.
  - 힌트 그림: vokalab/img/<레벨>/<번호>.webp 를 넣고 그 단어에 "h":1 을 적습니다. 그림을 바꿨으면 imgv 를 1 늘립니다.
"""
import hashlib, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOKA = os.path.join(ROOT, 'vokalab')
WORDS = os.path.join(VOKA, 'data', 'words.js')
INDEX = os.path.join(VOKA, 'index.html')


def load():
    raw = open(WORDS, encoding='utf-8').read()
    a = raw.index('window.VOKA_DATA=') + len('window.VOKA_DATA=')
    b = raw.rstrip().rfind(';')
    return raw, json.loads(raw[a:b])


def main():
    stamp = '--stamp' in sys.argv
    raw, D = load()
    errs, warns = [], []
    total = 0
    for L in D['levels']:
        lid = L['id']
        n = L.get('n', 0)
        gone = {int(k): v for k, v in (L.get('gone') or {}).items()}
        seen = {}
        for w in L['words']:
            i = w.get('i')
            where = '%s#%s %s' % (lid, i, w.get('de', '')[:30])
            if not isinstance(i, int) or i < 0:
                errs.append('번호(i)가 없거나 잘못됨: ' + where); continue
            if i in seen: errs.append('번호가 겹침: %s ↔ %s' % (where, seen[i]))
            seen[i] = where
            if i >= n: errs.append('번호가 n(%d) 이상: %s → n 을 늘리세요' % (n, where))
            if i in gone: errs.append('gone 에 있는 번호를 다시 씀: ' + where)
            for f in ('de', 'ko', 'ex', 'exKo'):
                if not str(w.get(f, '')).strip(): errs.append('%s 가 비어 있음: %s' % (f, where))
            if not re.search(r' · \[[^\]]+\]\s*$', str(w.get('ko', ''))): errs.append('뜻 끝에 「 · [품사]」가 없음: ' + where)
            if re.search(r'\(Pl\.\)|-̈', str(w.get('de', ''))): warns.append('표기 통일: (Pl.) → (Pl), -̈ → ⸚ : ' + where)
            img = os.path.join(VOKA, 'img', lid, '%d.webp' % i)
            if w.get('h') and not os.path.exists(img): errs.append('h 표시가 있는데 그림 파일이 없음: ' + where)
            if not w.get('h') and os.path.exists(img): warns.append('그림 파일은 있는데 h 표시가 없음: ' + where)
        for g, to in gone.items():
            if g >= n: errs.append('%s gone 번호 %d 가 n 이상' % (lid, g))
            if to != -1 and to not in seen: errs.append('%s gone %d 가 가리키는 단어 %s 가 없음' % (lid, g, to))
        miss = [i for i in range(n) if i not in seen and i not in gone]
        if miss: errs.append('%s: 번호가 비어 있는데 gone 에 없음(단어를 지웠으면 gone 에 적으세요): %s%s' % (lid, miss[:12], ' …' if len(miss) > 12 else ''))
        ex = (D.get('exam') or {}).get(lid)
        xs = set()
        if ex:
            seq = ex.get('seq') or []
            if len(seq) != len(set(seq)): errs.append('%s 시험용 seq 에 같은 번호가 두 번 있음' % lid)
            for i in seq:
                if i in seen: xs.add(i)
                elif i not in gone: errs.append('%s 시험용 seq 의 번호 %s 가 단어 목록에도 gone 에도 없음' % (lid, i))
        for w in L['words']:
            if bool(w.get('x')) != (w.get('i') in xs): errs.append('x 표시와 시험용 seq 가 다름: %s#%s %s' % (lid, w.get('i'), w.get('de', '')[:30]))
        m = re.search(r'([\d,]+)개', L.get('desc', ''))
        if m and int(m.group(1).replace(',', '')) != len(L['words']): warns.append('%s 설명(desc)의 단어 수 %s ≠ 실제 %d' % (lid, m.group(1), len(L['words'])))
        total += len(L['words'])
        print('%-4s 단어 %5d (번호 %d까지, 뺀 번호 %d) · 시험용 %4d · 그림 %4d' % (lid, len(L['words']), n, len(gone), len(xs), sum(1 for w in L['words'] if w.get('h'))))
    ver = hashlib.sha1(raw.encode('utf-8')).hexdigest()[:10]
    html = open(INDEX, encoding='utf-8', newline='').read()
    used = re.findall(r'data/words\.js\?v=([0-9a-zA-Z]+)', html)
    print('모두 %d단어 · 단어 파일 버전 %s · index.html 이 가리키는 버전 %s' % (total, ver, sorted(set(used)) or '없음'))
    if not used: errs.append('index.html 에 data/words.js?v= 가 없음')
    elif set(used) != {ver}:
        if stamp:
            html = re.sub(r'(data/words\.js\?v=)[0-9a-zA-Z]+', r'\g<1>' + ver, html)
            open(INDEX, 'w', encoding='utf-8', newline='').write(html)
            print('index.html 의 words.js?v= 를 %s 로 맞췄습니다(%d곳).' % (ver, len(used)))
        else:
            errs.append('index.html 의 words.js?v= 가 단어 파일과 다름 → python3 tools/vokalab_data.py --stamp')
    for w in warns: print('주의: ' + w)
    for e in errs: print('오류: ' + e)
    print('오류 %d개, 주의 %d개' % (len(errs), len(warns)))
    return 1 if errs else 0


if __name__ == '__main__':
    sys.exit(main())
