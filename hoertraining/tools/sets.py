#!/usr/bin/env python3
"""Lehrwerk Hörtraining 에 세트를 더하는 도구.

  python3 hoertraining/tools/sets.py check [세트 …]          원고 검사 (낱말 뜻이 빠진 낱말, 근거 인용, 정답 수, 줄 길이)
  python3 hoertraining/tools/sets.py tts 이름 [세트 …]        화자마다 음성 대본 묶음을 tools/tts/ 에 씁니다
  python3 hoertraining/tools/sets.py mix 받은폴더 [세트 …]    받은 음성을 줄마다 잘라 대화 순서로 이어 붙입니다 -> audio/<파일>.mp3, tools/src/<세트>.t.json
  python3 hoertraining/tools/sets.py merge [세트 …]          index.html(자료·음원 목록·통계)과 sw.js 에 넣습니다. 여러 번 실행해도 결과가 같습니다

원고는 tools/src/<세트>.txt 입니다(형식은 tools/README.md). 2026.11.04까지 만든 88세트는 원고가 이 폴더에 없고
index.html 의 routine-data 에만 있습니다. 이 도구는 새 세트를 그 자료 뒤에 덧붙입니다.

자료 형식(routine-data 1.1)과 낱말 나누는 규칙은 듣기 훈련 루틴 빌더(listening-routine-builder)의 build.py · lrb_common.py 와 같습니다.
"""
import sys, os, re, json, glob, hashlib, subprocess, datetime, collections
sys.dont_write_bytecode = True
T = os.path.dirname(os.path.abspath(__file__)); H = os.path.dirname(T); SRC = os.path.join(T, 'src')
PAGE = os.path.join(H, 'index.html'); SW = os.path.join(H, 'sw.js')
SR = 44100
PAUSE = ' [pause] '; HEAD = 'Also.'; TAIL = 'Gut.'          # 줄 사이 쉼 표시, 대본 앞뒤에 붙였다가 버리는 낱말
MAXLINES = 8; MAXCHARS = 760
# 말 빠르기(말하는 시간 1초에 읽는 음절 수)의 레벨별 목표. 2026-11 까지 있던 88세트의 레벨별 가운데값이다.
# 받은 음성이 이보다 빠르면 mix 가 그만큼 느리게 늘인다. 가장 느리게 늘이는 한도는 TEMPO_MIN.
ZIEL = {'A1': 3.2, 'A2': 3.8, 'B1': 4.2, 'B2': 4.4, 'C1': 4.4}
TEMPO_MIN = 0.85
LEVEL_COLOR = {'A1': '#D4915E', 'A2': '#5E9E5A', 'B1': '#3F8F8A', 'B2': '#4A7FB5', 'C1': '#7C5BA8'}
VOICES = {      # 이름 -> ElevenLabs voice_id (Eleven v3, language_code de)
    'Nadine': 'XFigb6fqZPxl2Q2dFOXN', 'Ithaka': 'b07hJVVJyFDBHxFNr1Qb', 'Melissa': 'paJLeKT4SGdqKEMFGc6U', 'Bettina': 'VwrOyjuYiIhDmERAlgrS',
    'Ela': 'NE7AIW5DoJ7lUosXV2KR', 'Andrew': 'bNFIvb6Gmmlk9QMIWo7U', 'Jonas': 'xlbJQnFFGB01bv7HK5CZ', 'Ben': 'aTTiK3YzK3dXETpuDE2h',
    'Toni': 'tR9bEXIX9ixlxSis0fqv', 'Juna': 'uZCiMraXvGgdBPlDzm6l', 'Ava': 'AnvlJBAqSLDzEevYr9Ap', 'Leon': 'KJGvwDt0zADAAvDmMQEN', 'Emily': 'OO0WT3lY2gVNwzZMAjAI',
}
TRAPS = ('wording', 'number', 'context', 'negation', 'paraphrase', 'speaker')
GAP_SAME, GAP_TURN, LEAD, TAILGAP = 0.30, 0.45, 0.80, 0.50      # 같은 화자의 다음 줄, 화자가 바뀔 때, 맨 앞, 맨 뒤 (초)

# ---------------------------------------------------------------- 낱말 나누기 (lrb_common.py 와 같은 규칙)
_P = r'[\s.,?!;:()\[\]{}„“”"‚‘’\'«»‹›…–—\-/]+'
_EDGE = re.compile(r'^' + _P + r'|' + _P + r'$')
ABBR = {'dr', 'nr', 'ca', 'bzw', 'usw', 'str', 'tel', 'st', 'evtl', 'ggf', 'inkl', 'max', 'min', 'prof', 'z', 'b', 'd', 'h', 'u', 'a', 'o', 'ä', 's', 'm', 'v'}


def core(tok):
    return _EDGE.sub('', tok)


def tokens(text):
    return [c for c in (core(t) for t in text.split(' ')) if c]


def split_sentences(text):
    out, buf = [], []
    for w in text.split(' '):
        buf.append(w)
        m = re.search(r'([.!?…]+)["“”’\')\]]*$', w)
        if not m:
            continue
        stem = core(w).lower()
        if m.group(1) == '.' and (stem.isdigit() or stem in ABBR or re.fullmatch(r'\d+([.:]\d+)*', stem or 'x')):
            continue
        out.append(' '.join(buf)); buf = []
    if buf:
        out.append(' '.join(buf))
    return [s for s in out if s.strip()]


# ---------------------------------------------------------------- 원고 읽기
def two(s, n=2):
    f = [x.strip() for x in s.split(' | ')]
    assert len(f) == n, '칸 수가 %d개가 아닙니다: %s' % (n, s[:70])
    return f


def parse(path):
    S = {'stimmen': {}, 'farben': {}, 'lines': [], 'woerter': [], 'saetze': [], 'vokabeln': collections.OrderedDict(), 'fragen': [], 'path': path}
    sec = None; q = None
    for ln, raw in enumerate(open(path, encoding='utf-8'), 1):
        s = raw.rstrip('\n').strip()
        if not s or s.startswith('#'):
            continue
        try:
            if s.startswith('@'):
                k, _, v = s[1:].partition(' '); v = v.strip()
                if k == 'stimme':
                    who, _, rest = v.partition(' = '); vo, _, col = rest.partition(' | ')
                    assert vo.strip() in VOICES, '모르는 목소리: ' + vo
                    S['stimmen'][who.strip()] = vo.strip(); S['farben'][who.strip()] = col.strip()
                elif k == 'thema':
                    S['topic'], S['topicKo'] = two(v)
                else:
                    S[k] = v
            elif s.startswith('[') and s.endswith(']'):
                sec = s[1:-1]; q = None
            elif sec == 'text':
                gap = None
                m = re.match(r'^\+([0-9.]+)\s+', s)
                if m:
                    gap = float(m.group(1)); s = s[m.end():]
                who, _, rest = s.partition(': ')
                assert who in S['stimmen'], '화자에 목소리가 없습니다: ' + who
                de, ko = two(rest)
                S['lines'].append({'sp': who, 'text': de, 'ko': ko, 'gap': gap})
            elif sec == 'woerter':
                w, m_ = two(s); S['woerter'].append({'w': w, 'm': m_})
            elif sec == 'saetze':
                de, ko = two(s); S['saetze'].append({'de': de, 'ko': ko})
            elif sec == 'vokabeln':
                keys, mean = two(s)
                forms = [x.strip() for x in keys.split(',') if x.strip()]
                assert forms[0] not in S['vokabeln'], '낱말이 두 번 나옵니다: ' + forms[0]
                S['vokabeln'][forms[0]] = {'meaning': mean, 'forms': forms[1:]}
            elif sec == 'fragen':
                c = s[0]
                if re.match(r'^\d+ \| ', s):
                    no, de, ko = two(s, 3)
                    q = {'no': no, 'de': de, 'ko': ko, 'opts': [], 'answer': None, 'evidence': [], 'explain': '', 'trap': ''}
                    S['fragen'].append(q)
                elif c in '-*':
                    f = [x.strip() for x in s[1:].strip().split(' | ')]
                    assert len(f) in (1, 2)
                    if c == '*':
                        assert q['answer'] is None, '정답 표시가 두 개입니다'
                        q['answer'] = len(q['opts'])
                    q['opts'].append({'de': f[0], 'ko': f[1] if len(f) > 1 else ''})
                elif c == '=':
                    v = s[1:].strip(); assert v in ('richtig', 'falsch')
                    q['opts'] = [{'de': 'richtig', 'ko': ''}, {'de': 'falsch', 'ko': ''}]; q['answer'] = 0 if v == 'richtig' else 1; q['rf'] = True
                elif c == '>':
                    q['evidence'].append(s[1:].strip())
                elif c == '!':
                    q['explain'] = s[1:].strip()
                elif c == '~':
                    q['trap'] = s[1:].strip()
                else:
                    raise AssertionError('알 수 없는 줄')
            else:
                raise AssertionError('구역 밖의 줄')
        except AssertionError as e:
            raise SystemExit('%s:%d %s\n   %s' % (os.path.basename(path), ln, e, s[:120]))
    return S


def all_sets(args):
    ids = [a for a in args if not a.startswith('-')]
    paths = sorted(glob.glob(os.path.join(SRC, '*.txt')))
    out = [parse(p) for p in paths if not ids or os.path.basename(p)[:-4] in ids]
    assert out, '원고가 없습니다'
    return out


def basis():
    p = os.path.join(T, 'basis.json')
    return json.load(open(p, encoding='utf-8')) if os.path.exists(p) else {}


def vocab_of(S, B):
    """원고의 낱말 뜻 + 모자란 낱말은 basis.json(자주 나오는 낱말)에서 채운다. -> (vocab, 채운 낱말, 빠진 낱말, 본문에 없는 키)"""
    toks = []
    for l in S['lines']:
        toks += tokens(l['text'])
    exact = set(toks); lower = {t.lower() for t in exact}
    V = collections.OrderedDict(); covered = set(); dead = []
    for k, e in S['vokabeln'].items():
        forms = [k] + e['forms']
        hit = [f for f in forms if f in exact or f.lower() in lower]
        if not hit:
            dead.append(k)
        V[k] = dict(e)
        for f in forms:
            covered.add(f.lower())
    filled = []; missing = []
    seen = set()
    for t in toks:                                         # 본문에 나오는 순서로
        if t.lower() in covered or t.lower() in seen:
            continue
        seen.add(t.lower())
        e = B.get(t) or B.get(t.lower()) or B.get(t[:1].upper() + t[1:])
        if e:
            V[t] = {'meaning': e, 'forms': []}; filled.append(t)
        else:
            missing.append(t)
    return V, filled, missing, dead


def find_line(S, quote):
    hit = [i for i, l in enumerate(S['lines']) if quote in l['text']]
    return hit


def check(S, B, verbose=True):
    E = []; W = []
    need = ('set', 'titel', 'art', 'id', 'datei', 'topic', 'topicKo', 'lage', 'form', 'plays', 'prep')
    for k in need:
        if not S.get(k):
            E.append('@%s 가 없습니다' % k)
    if E:
        return E, W, {}
    lv = S['set'][:2]
    if not re.fullmatch(r'[A-C][12]_\d\d', S['set']): E.append('@set 형식: A2_17')
    if not re.fullmatch(r'[a-c][12]-\d\d-[a-z0-9]+', S['datei']): E.append('@datei 형식: a2-17-a')
    chars = 0
    for i, l in enumerate(S['lines']):
        t = l['text']; chars += len(t)
        if len(t) > 240: W.append('줄 %d: %d자 (240자 넘음)' % (i + 1, len(t)))
        if len(split_sentences(t)) > 3: W.append('줄 %d: 문장 %d개 (3개 넘음)' % (i + 1, len(split_sentences(t))))
        if re.search(r'\d', t): W.append('줄 %d: 숫자는 글자로 씁니다: %s' % (i + 1, t[:50]))
        if '  ' in t or t != t.strip(): E.append('줄 %d: 공백' % (i + 1))
        if re.search(r'[„“”"()\[\]–—…]', t): W.append('줄 %d: 따옴표·괄호·줄표·줄임표는 쓰지 않습니다: %s' % (i + 1, t[:50]))
        if len(split_sentences(t)) != len(split_sentences(l['ko'])): W.append('줄 %d: 독일어 문장 %d개, 한국어 문장 %d개' % (i + 1, len(split_sentences(t)), len(split_sentences(l['ko']))))
        if 'von Beruf?' in t: E.append('줄 %d: 쓰지 않기로 한 표현' % (i + 1))
    V, filled, missing, dead = vocab_of(S, B)
    if missing: E.append('뜻이 없는 낱말 %d개: %s' % (len(missing), ' '.join(missing)))
    if dead: W.append('본문에 없는 낱말 키: ' + ' '.join(dead))
    if not 8 <= len(S['woerter']) <= 14: W.append('미리 볼 낱말 %d개 (8~14)' % len(S['woerter']))
    if not 3 <= len(S['saetze']) <= 6: W.append('미리 볼 문장 %d개 (3~6)' % len(S['saetze']))
    ans = []
    for q in S['fragen']:
        tag = '문항 %s' % q['no']
        if q['answer'] is None: E.append(tag + ': 정답 표시가 없습니다')
        if not q.get('rf') and len(q['opts']) != 3 and S['form'] == '3지선다': E.append(tag + ': 보기가 %d개' % len(q['opts']))
        if not q['evidence']: E.append(tag + ': 근거가 없습니다')
        for ev in q['evidence']:
            hit = find_line(S, ev)
            if not hit: E.append(tag + ': 근거 인용이 본문에 없습니다: ' + ev[:60])
            elif len(hit) > 1: W.append(tag + ': 근거 인용이 여러 줄에 있습니다(첫 줄을 씀): ' + ev[:40])
        if not q['explain']: E.append(tag + ': 해설이 없습니다')
        if q['trap'] not in TRAPS: E.append(tag + ': 함정 종류 ' + q['trap'])
        if not q['ko']: E.append(tag + ': 한국어 요지가 없습니다')
        if not q.get('rf') and any(not o['ko'] for o in q['opts']) and S['form'] == '3지선다': E.append(tag + ': 보기의 한국어가 없습니다')
        ans.append(q['answer'])
    if not 8 <= len(S['fragen']) <= 10: W.append('문항 %d개 (8~10)' % len(S['fragen']))
    if ans and max(collections.Counter(ans).values()) > len(ans) * 0.6: W.append('정답 위치가 한쪽에 몰려 있습니다: %s' % ans)
    for a, b in zip(ans, ans[1:] + [None]):
        pass
    run = 1
    for a, b in zip(ans, ans[1:]):
        run = run + 1 if a == b else 1
        if run >= 4: W.append('같은 정답 위치가 네 번 이어집니다: %s' % ans); break
    blob = json.dumps(S, ensure_ascii=False, default=str)
    if '_' in blob.replace(S['set'], '').replace(S['path'], ''): W.append('밑줄(_)이 들어 있습니다')
    info = {'chars': chars, 'lines': len(S['lines']), 'q': len(S['fragen']), 'vocab': len(V), 'filled': filled, 'ans': ans,
            'speakers': collections.Counter(l['sp'] for l in S['lines'])}
    return E, W, info


def cmd_check(args):
    B = basis(); bad = 0; total = 0
    for S in all_sets(args):
        E, W, info = check(S, B)
        name = os.path.basename(S['path'])[:-4]
        if info:
            total += info['chars']
            print('%s  %s | 줄 %d · %d자 · 문항 %d · 낱말 뜻 %d(공통에서 채움 %d) · 정답 %s · 화자 %s' % (
                name, S.get('titel', ''), info['lines'], info['chars'], info['q'], info['vocab'], len(info['filled']), ''.join('abc'[a] if a is not None else '?' for a in info['ans']), dict(info['speakers'])))
            if '-v' in args and info['filled']:
                print('   공통에서 채운 낱말: ' + ' '.join(info['filled']))
        for x in W: print('   ! ' + x)
        for x in E: print('   ✗ ' + x)
        bad += len(E)
    print('글자 수 합계 %d | 오류 %d' % (total, bad))
    return bad


# ---------------------------------------------------------------- 음성 대본
def jobs_of(S, name):
    """화자마다 그 화자의 줄을 차례로 묶는다. -> [{job, who, voice_id, items:[{i, parts:[text]}], script}]"""
    stem = S['datei'].replace('-', '')                       # a217a
    by = collections.OrderedDict()
    for i, l in enumerate(S['lines']):
        by.setdefault(l['sp'], []).append({'i': i, 'parts': [l['text']]})
    out = []
    for k, (who, items) in enumerate(by.items()):
        total = sum(len(x['parts'][0]) + len(PAUSE) for x in items)
        n_jobs = max(-(-total // MAXCHARS), -(-len(items) // MAXLINES)); limit = total / n_jobs + 70      # 묶음 길이를 고르게
        groups = [[]]
        for it in items:
            cur = groups[-1]; ln = sum(len(x['parts'][0]) + len(PAUSE) for x in cur) + len(it['parts'][0])
            if cur and len(groups) < n_jobs and (len(cur) >= MAXLINES or ln > limit):
                groups.append([]); cur = groups[-1]
            cur.append(it)
        for n, g in enumerate(groups):
            jn = '%s_%s_s%d_%02d' % (name, stem, k + 1, n + 1)
            script = HEAD + PAUSE + PAUSE.join(x['parts'][0] for x in g) + PAUSE + TAIL
            out.append({'job': jn, 'set': S['set'], 'who': who, 'voice': S['stimmen'][who], 'voice_id': VOICES[S['stimmen'][who]], 'items': g, 'script': script, 'head': HEAD, 'tail': TAIL})
    return out


def cmd_tts(name, args):
    os.makedirs(os.path.join(T, 'tts'), exist_ok=True); plan = []; total = 0
    for S in all_sets(args):
        for j in jobs_of(S, name):
            json.dump(j, open(os.path.join(T, 'tts', j['job'] + '.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
            plan.append({'job': j['job'], 'voice': j['voice'], 'chars': len(j['script']), 'lines': len(j['items'])}); total += len(j['script'])
    json.dump(plan, open(os.path.join(T, 'tts', name + '.plan.json'), 'w'), indent=0)
    for q in plan:
        print(q['job'], q['voice'], q['lines'], q['chars'])
    print('jobs', len(plan), 'TOTAL chars', total)


# ---------------------------------------------------------------- 음성 자르기 (jugend/tools/lektion.py 와 같은 방법)
def _np():
    import numpy as np
    return np


def load(path, tempo=1.0):
    """소리를 읽는다. tempo 가 1 보다 작으면 높낮이는 그대로 두고 그만큼 느리게 늘인다(ffmpeg atempo)."""
    np = _np()
    af = ['-af', 'atempo=%.4f' % tempo] if abs(tempo - 1.0) > 1e-6 else []
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path] + af + ['-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32).copy()


def silben(text):
    return len(re.findall(r'[aeiouyäöüAEIOUYÄÖÜ]+', text))


def env_db(x, win=0.02, hop=0.005):
    np = _np()
    w = int(win * SR); h = int(hop * SR); n = max(1, (len(x) - w) // h + 1)
    c = np.concatenate([[0.0], np.cumsum(x.astype(np.float64) ** 2)])
    i = np.arange(n) * h; r = np.sqrt((c[i + w] - c[i]) / w + 1e-12)
    return 20 * np.log10(r + 1e-9), h


def speech_runs(x, tags=()):
    """말소리 구간 [[시작, 끝] …]과 묵음 기준(dB)."""
    np = _np()
    db, h = env_db(x); top = db.max(); thr = top - 42
    idx = [np.arange(int(a * SR / h), min(len(db), int(b * SR / h))) for a, b in tags if b > a]
    if idx:
        nz = float(np.percentile(db[np.concatenate(idx)], 75)); thr = min(top - 28, max(thr, nz + 8))
    on = db > thr; runs = []; s = None
    for i, v in enumerate(on):
        if v and s is None:
            s = i
        if (not v) and s is not None:
            runs.append([s, i]); s = None
    if s is not None:
        runs.append([s, len(on)])
    runs = [r for r in runs if (r[1] - r[0]) * h / SR > 0.03 and db[r[0]:r[1]].max() >= top - 26]
    merged = []
    for r in runs:
        if merged and (r[0] - merged[-1][1]) * h / SR < 0.12:
            merged[-1][1] = r[1]
        else:
            merged.append(r)
    return [[a * h / SR, b * h / SR] for a, b in merged], thr


def units(t):
    return len(re.findall(r'[A-Za-zÄÖÜäöüß]', t)) + 2.0 * len(re.findall(r'[.!?:,–…]', t)) + 2.0


def split_words(x, words, items, tail='', head=''):
    """음성 엔진이 알려 주는 낱말 시각으로 줄을 나눈다. 줄 사이는 쉼 표시이고, 자를 곳은 가장 가까운 실제 묵음에 맞춘다. -> [(시작, 끝) 줄마다]"""
    np = _np()
    groups = [[]]; tags = []; cur = None
    for w in words:
        t = w['text']
        if t in ('[long', '[short'):
            cur = [w['start'], w['end']]; continue
        if t == 'pause]' and cur is not None:
            tags.append((cur[0], w['end'])); cur = None; groups.append([]); continue
        if t == '[pause]':
            tags.append((w['start'], w['end'])); groups.append([]); continue
        if t.startswith('[') and t.endswith(']'):
            continue
        groups[-1].append(w)
    alltags = list(tags)
    if len(groups) == len(items) + 1 and not groups[-1]:
        groups.pop(); tags.pop()
    nhead = 0
    if head and len(groups) > len(items) and ' '.join(w['text'] for w in groups[0]) == head:
        groups.pop(0); nhead = 1
    ntail = 0
    if tail and len(groups) == len(items) + 1 and ' '.join(w['text'] for w in groups[-1]) == tail:
        groups.pop(); ntail = 1
    if len(groups) != len(items) or any(not g for g in groups):
        return None, {'err': '%d aligned lines, need %d' % (len([g for g in groups if g]), len(items))}
    for g, it in zip(groups, items):
        want_t = ' '.join(' '.join(it['parts']).split())
        if ' '.join(w['text'] for w in g) != want_t:
            return None, {'err': 'text differs: ' + ' '.join(w['text'] for w in g) + ' / ' + want_t}
    runs, thr = speech_runs(x, alltags); gaps = [(runs[i][1], runs[i + 1][0]) for i in range(len(runs) - 1)]
    if len(runs) < len(items) + ntail + nhead:
        return None, {'err': '%d sounds for %d lines' % (len(runs), len(items))}
    cut = []; far = 0.0
    for ts, te in tags:
        best = None; key = None
        for i, (g0, g1) in enumerate(gaps):
            if cut and i <= cut[-1]:
                continue
            ov = max(0.0, min(g1, te) - max(g0, ts)); dist = 0.0 if ov > 0 else (ts - g1 if g1 <= ts else g0 - te)
            k = (ov > 0, ov if ov > 0 else -dist, g1 - g0)
            if key is None or k > key:
                key = k; best = (i, dist)
        if best is None:
            return None, {'err': 'no silence left for a line break'}
        cut.append(best[0]); far = max(far, best[1])
    b = [0] + [c + 1 for c in cut] + [len(runs)]
    own = [runs[b[j]:b[j + 1]] for j in range(nhead + len(items) + ntail)]
    headrun = own.pop(0) if nhead else None
    tailrun = own.pop() if ntail else None
    if (nhead and not headrun) or (ntail and not tailrun):
        return None, {'err': 'the extra first or last word has no sound'}
    if any(not o for o in own):
        return None, {'err': 'a line has no sound'}
    flat = [(o[0][0], o[-1][1]) for o in own]
    rate = [(q - p) / units(' '.join(it['parts'])) for (p, q), it in zip(flat, items)]; med = float(np.median(rate))
    off = max(abs(o[0][0] - g[0]['start']) for o, g in zip(own, groups))
    win = []
    for i, (a_, b_) in enumerate(flat):
        lo = max(a_ - 0.10, (flat[i - 1][1] + a_) / 2 if i else ((headrun[-1][1] + a_) / 2 if headrun else 0.0))
        nxt = flat[i + 1][0] if i + 1 < len(flat) else (tailrun[0][0] if tailrun else None)
        hi = min(b_ + 0.20, (b_ + nxt) / 2 if nxt is not None else len(x) / SR)
        win.append((lo, hi))
    return win, {'far': round(far, 2), 'off': round(off, 2), 'rate': [round(r / med, 2) for r in rate], 'thr': thr}


def squeeze(x, thr, max_gap=0.55):
    """줄 안의 긴 묵음을 max_gap 으로 줄인다."""
    np = _np()
    db, h = env_db(x); sil = db <= thr
    keep = np.ones(len(x), bool); s = None
    for k, v in enumerate(sil):
        if v and s is None:
            s = k
        if (not v) and s is not None:
            d = (k - s) * h / SR
            if s > 0 and d > max_gap:
                c = int((d - max_gap) * SR); mid = int(((s + k) / 2) * h); keep[mid - c // 2: mid - c // 2 + c] = False
            s = None
    return x[keep]


def polish(x, thr):
    """줄 하나: 긴 묵음 줄이기, 앞뒤 묵음 떼기, 크기 맞추기, 가장자리 다듬기."""
    np = _np()
    x = squeeze(x, thr)
    db, h = env_db(x); on = np.where(db > thr)[0]
    if len(on):
        a = max(0, int(on[0] * h) - int(0.03 * SR)); b = min(len(x), int((on[-1] + 4) * h) + int(0.06 * SR)); x = x[a:b]
    db, h = env_db(x); act = db[db > db.max() - 25]; rms = 10 * np.log10(np.mean(10 ** (act / 10)))
    y = x * 10 ** ((-19.0 - rms) / 20); p = np.abs(y).max()
    if p > 0.89:
        y = np.tanh(y / 0.89) * 0.89 if p < 1.4 else y * (0.89 / p)
    fi = int(0.010 * SR); fo = int(0.03 * SR); y[:fi] *= np.linspace(0, 1, fi); y[-fo:] *= np.linspace(1, 0, fo)
    return y


def encode(x, path):
    """mono 32kHz 56kbps CBR mp3, −16 LUFS (기존 음원과 같은 형식: 빌더의 cut.py 와 같은 설정)."""
    np = _np()
    pcm = (np.clip(x, -1, 1) * 32767).astype('<i2').tobytes()
    src = ['-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-']
    target = 'I=-16:TP=-1.5:LRA=11'
    r = subprocess.run(['ffmpeg', '-hide_banner', '-nostdin'] + src + ['-af', 'loudnorm=%s:print_format=json' % target, '-f', 'null', '-'], input=pcm, capture_output=True)
    m = re.search(r'\{[^{}]*"input_i"[^{}]*\}', r.stderr.decode('utf-8', 'ignore'), re.S)
    ms = json.loads(m.group(0))
    af = 'loudnorm=%s:measured_I=%s:measured_TP=%s:measured_LRA=%s:measured_thresh=%s:offset=%s:linear=true' % (
        target, ms['input_i'], ms['input_tp'], ms['input_lra'], ms['input_thresh'], ms['target_offset'])
    os.makedirs(os.path.dirname(path), exist_ok=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-nostdin', '-y'] + src + ['-af', af, '-ac', '1', '-ar', '32000', '-codec:a', 'libmp3lame', '-b:a', '56k', path], input=pcm, check=True)
    d = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path], capture_output=True, text=True).stdout.strip())
    return d, float(ms['input_i'])


def cmd_mix(raw, args):
    np = _np(); bad = []
    name = next((a[2:] for a in args if a.startswith('--')), None)
    for S in all_sets(args):
        sid = os.path.basename(S['path'])[:-4]
        jobs = [json.load(open(p, encoding='utf-8')) for p in sorted(glob.glob(os.path.join(T, 'tts', '*_%s_s*_??.json' % S['datei'].replace('-', ''))))]
        if name:
            jobs = [j for j in jobs if j['job'].startswith(name + '_')]
        def cut(f, say=True):
          clips = {}; ok = True; mark = []
          for j in jobs:
              p = os.path.join(raw, j['job'] + '.mp3'); wf = os.path.join(raw, j['job'] + '.words.json')
              if not (os.path.exists(p) and os.path.exists(wf)):
                  print('!! %s: 음성 또는 낱말 시각 파일이 없습니다' % j['job']); ok = False; continue
              x = load(p, f); words = json.load(open(wf, encoding='utf-8'))
              if isinstance(words, dict):
                  words = words['words']
              if f != 1.0:
                  words = [dict(w, start=w['start'] / f, end=w['end'] / f) if 'start' in w else w for w in words]
              win, info = split_words(x, words, j['items'], j['tail'], j['head'])
              if win is None:
                  print('!! %s: %s' % (j['job'], info['err'])); ok = False; continue
              flags = []
              if info['far'] > 0.6: flags.append('줄 경계가 쉼 표시에서 %s초 떨어짐' % info['far'])
              if info['off'] > 2.5: flags.append('줄 시작이 알려 준 시각과 %s초 다름' % info['off'])
              if min(info['rate']) < 0.5 or max(info['rate']) > 2.0: flags.append('길이가 어긋남')
              if say: print('%s: %d줄 %.1f초 빠르기 %s..%s%s' % (j['job'], len(j['items']), len(x) / SR, min(info['rate']), max(info['rate']), ('   <-- ' + ', '.join(flags)) if flags else ''))
              if flags:
                  mark.append(j['job'])
                  for it, (lo, hi), r in zip(j['items'], win, info['rate']):
                      print('      %6.2f-%6.2f %4.2f  %s' % (lo, hi, r, it['parts'][0][:70]))
              for it, (lo, hi) in zip(j['items'], win):
                  seg = x[max(0, int(lo * SR)):int(hi * SR)]
                  d_, h_ = env_db(seg)
                  if len(d_) > 12 and (d_[:3].max() > d_.max() - 14 or d_[-4:].max() > d_.max() - 14):
                      print('   가장자리? %s 줄 %d (%.0f / %.0f dB)' % (j['job'], it['i'] + 1, d_[:3].max() - d_.max(), d_[-4:].max() - d_.max()))
                  clips[it['i']] = polish(seg, info['thr'])
          return clips, ok, mark
        clips, ok, mark = cut(1.0)
        tempo = 1.0; rate0 = rate1 = None
        if ok and len(clips) == len(S['lines']):
            syl = sum(silben(l['text']) for l in S['lines'])
            rate0 = rate1 = syl / (sum(len(c) for c in clips.values()) / SR)
            ziel = ZIEL.get(S['set'].split('_')[0])
            if S.get('tempo'):
                tempo = float(S['tempo'])
            elif ziel and rate0 > ziel * 1.03:
                tempo = max(TEMPO_MIN, round(ziel / rate0, 3))
            if tempo != 1.0:
                clips, ok, mark = cut(tempo, say=False)
                if ok and len(clips) == len(S['lines']):
                    rate1 = syl / (sum(len(c) for c in clips.values()) / SR)
            print('   말 빠르기 %.2f 음절/초%s (목표 %s)' % (rate0, (' -> %.2f (속도 %.3f)' % (rate1, tempo)) if tempo != 1.0 else '', ziel))
        bad += mark
        if not ok or len(clips) != len(S['lines']):
            print('!! %s: 줄 %d개 가운데 %d개만 있습니다. 건너뜁니다' % (sid, len(S['lines']), len(clips))); bad.append(sid); continue
        out = [np.zeros(int(LEAD * SR), np.float32)]; pos = LEAD; times = []
        for i, l in enumerate(S['lines']):
            if i:
                g = l['gap'] if l['gap'] is not None else (GAP_SAME if l['sp'] == S['lines'][i - 1]['sp'] else GAP_TURN)
                out.append(np.zeros(int(g * SR), np.float32)); pos += int(g * SR) / SR
            c = clips[i].astype(np.float32); out.append(c)
            times.append([round(pos, 2), round(pos + len(c) / SR, 2)]); pos += len(c) / SR
        out.append(np.zeros(int(TAILGAP * SR), np.float32))
        y = np.concatenate(out)
        dst = os.path.join(H, 'audio', S['datei'] + '.mp3')
        dur, lufs = encode(y, dst)
        json.dump({'dur': round(dur, 2), 't': times, 'lufs': lufs, 'tempo': tempo, 'silben': [round(rate0, 2), round(rate1, 2)]}, open(os.path.join(SRC, sid + '.t.json'), 'w'), indent=0)
        # 만든 mp3 를 다시 읽어 줄 시각을 확인한다: 줄 시작·끝에 말소리가 있고, 줄 사이는 조용해야 한다
        z = load(dst); db, h = env_db(z); top = float(np.percentile(db, 95)); thr2 = top - 30; off = []
        def lvl(a, b):
            i, j = int(max(0, a) * SR / h), int(min(len(z) / SR, b) * SR / h)
            return float(db[i:j].max()) if j > i else -120.0
        for i, (a, b) in enumerate(times):
            if lvl(a, a + 0.35) < thr2: off.append('줄 %d 시작에 소리 없음' % (i + 1))
            if lvl(b - 0.45, b) < thr2: off.append('줄 %d 끝에 소리 없음' % (i + 1))
            if i and times[i][0] - times[i - 1][1] >= 0.25 and lvl(times[i - 1][1] + 0.08, a - 0.08) > thr2 + 6: off.append('줄 %d 앞 쉼에 소리 있음' % (i + 1))
        if abs(dur - len(y) / SR) > 0.12: off.append('길이 %.2f != %.2f' % (dur, len(y) / SR))
        if off:
            bad.append(sid); print('   !! ' + '; '.join(off[:8]))
        print('== %s -> audio/%s.mp3 %.1f초 (%d분 %02d초) · %dKB · 입력 %.1f LUFS' % (sid, S['datei'], dur, dur // 60, round(dur % 60), os.path.getsize(dst) // 1024, lufs))
    print('NEEDS ATTENTION:', bad if bad else 'none')


# ---------------------------------------------------------------- 자료로 바꾸기 (빌더 build.py 의 to_runtime 과 같은 모양)
def derive_example(lines, forms):
    fl = {f.lower() for f in forms}
    for ln in lines:
        de = split_sentences(ln['text'])
        for si, s in enumerate(de):
            if any(c in forms or c.lower() in fl for c in tokens(s)):
                ko = split_sentences(ln['ko'])
                return s, (ko[si] if len(ko) == len(de) else ln['ko'])
    return '', ''


def nbsp(s):
    return s.replace(' ', ' ')


def runtime(S, B):
    sid = os.path.basename(S['path'])[:-4]
    tj = json.load(open(os.path.join(SRC, sid + '.t.json')))
    assert len(tj['t']) == len(S['lines']), sid + ': 줄 수와 시각 수가 다릅니다 (mix 를 다시 실행)'
    lines = [{'sp': l['sp'], 'text': l['text'], 'ko': l['ko'], 't': t} for l, t in zip(S['lines'], tj['t'])]
    V, filled, missing, dead = vocab_of(S, B)
    assert not missing, sid + ': 뜻이 없는 낱말 ' + ' '.join(missing)
    exact = set();
    for l in lines:
        exact.update(tokens(l['text']))
    lower = {c.lower() for c in exact}
    vocab = {}; vx = {}; vl = {}
    for k, e in V.items():
        forms = [k] + list(e.get('forms', []))
        ex, exk = derive_example(lines, forms)
        vocab[k] = {'meaning': e['meaning'], 'example': ex, 'exampleKo': exk}
        for f in forms:
            if f in exact:
                vx[f] = k
            if f.lower() in lower:
                vl.setdefault(f.lower(), k)
    qs = []
    RF = {'richtig': 'Richtig', 'falsch': 'Falsch'}
    for q in S['fragen']:
        ko = q['ko']
        if not q.get('rf') and all(o['ko'] for o in q['opts']):
            ko += ' ' + ' / '.join('%s) %s' % ('abcd'[i], o['ko']) for i, o in enumerate(q['opts']))
        ev = [{'line': find_line(S, e)[0], 'quote': e} for e in q['evidence']]
        qs.append({'no': q['no'], 'de': q['de'], 'ko': ko, 'isExample': False, 'options': [{'t': RF.get(o['de'], o['de'])} for o in q['opts']],
                   'answer': q['answer'], 'confidence': 'official', 'evidence': ev, 'explain': q['explain'], 'trap': q['trap']})
    n = len(qs); dur = tj['dur']
    situation = '%s · Aufgabe 1–%d · %s · %s회 청취 (문제 읽기 %s초)' % (S['lage'], n, S['form'], S['plays'], S['prep'])
    key = S['datei'].upper().replace('-', '_')
    item = {'id': S['id'], 'sec': S['set'], 'audio': key, 'dur': dur, 'topic': S['topic'], 'topicKo': S['topicKo'], 'situation': situation,
            'plays': int(S['plays']), 'prepSeconds': int(S['prep']), 'transcriptSource': 'official', 'hasT': True, 'lines': lines,
            'keyVocab': S['woerter'], 'keySentences': S['saetze'], 'vocab': vocab, 'vx': vx, 'vl': vl, 'imageBank': [], 'questions': qs}
    lv = S['set'][:2]
    sec = {'id': S['set'], 'label': '%s · Set %s' % (lv, S['set'][3:]), 'color': LEVEL_COLOR[lv], 'description': S['titel'],
           'meta': '%s · %d문항 · %d분 %02d초' % (nbsp(S['art']), n, int(dur // 60), int(round(dur % 60)) % 60), 'items': []}
    return sec, item, key


def sha10(path):
    return hashlib.sha256(open(path, 'rb').read()).hexdigest()[:10]


def cmd_merge(args):
    B = basis()
    for S in all_sets(args):
        E, W, info = check(S, B)
        assert not E, os.path.basename(S['path']) + ': ' + '; '.join(E)
    page = open(PAGE, encoding='utf-8').read()
    m = re.search(r'(<script type="application/json" id="routine-data">)(.*?)(</script>)', page, re.S)
    data = json.loads(m.group(2))
    vorher = json.dumps({k: v for k, v in data.items() if k != 'meta'}, ensure_ascii=False, sort_keys=True)
    new = [runtime(S, B) + (S,) for S in all_sets(args)]
    new_secs = {sec['id'] for sec, it, key, S in new}; new_items = {it['id'] for sec, it, key, S in new}
    ids = [it['id'] for it in data['items']]
    sec_items = {s['id']: [ids[i] for i in s['items']] for s in data['sections']}
    # 이미 들어 있는 같은 세트는 빼고 다시 넣는다
    data['items'] = [it for it in data['items'] if it['id'] not in new_items]
    data['sections'] = [s for s in data['sections'] if s['id'] not in new_secs]
    for sec, it, key, S in new:
        data['items'].append(it); sec_items[sec['id']] = [it['id']]
        lv = sec['id'][:2]
        pos = max(i for i, s in enumerate(data['sections']) if s['id'][:2] == lv and s['id'] < sec['id']) + 1
        data['sections'].insert(pos, sec)
        for who, col in S['farben'].items():
            data['meta']['speakers'].setdefault(who, col); data['meta']['speakers'][sec['id'] + '|' + who] = col
    where = {it['id']: i for i, it in enumerate(data['items'])}
    for s in data['sections']:
        s['items'] = [where[x] for x in sec_items[s['id']]]
    nq = sum(1 for it in data['items'] for q in it['questions'] if not q['isExample'])
    mins = round(sum(it['dur'] for it in data['items']) / 60)
    data['meta']['stats'] = [{'value': str(len(data['sections'])), 'label': '세트'}, {'value': str(len(data['items'])), 'label': '지문'},
                             {'value': str(nq), 'label': '문항'}, {'value': '%d분' % mins, 'label': '음원'}]
    if json.dumps({k: v for k, v in data.items() if k != 'meta'}, ensure_ascii=False, sort_keys=True) != vorher:          # 자료가 바뀐 때에만 만든 시각을 고친다
        data['meta']['builtAt'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M')
    blob = json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c')
    page = page[:m.start(2)] + blob + page[m.end(2):]
    # 음원 목록(주소 뒤에 내용 해시)
    tag = re.compile(r'<script type="text/plain" data-media="([A-Z0-9_]+)">(audio/[^<]+)</script>\n')
    media = collections.OrderedDict((k, v) for k, v in tag.findall(page))
    for sec, it, key, S in new:
        f = 'audio/%s.mp3' % S['datei']
        media[key] = '%s?v=%s' % (f, sha10(os.path.join(H, f)))
    first = tag.search(page).start(); last = [x for x in tag.finditer(page)][-1].end()
    order = sorted(media)
    page = page[:first] + ''.join('<script type="text/plain" data-media="%s">%s</script>\n' % (k, media[k]) for k in order) + page[last:]
    n_sets = len(data['sections'])
    cnt = lambda t: re.sub(r'(A1–C1 |A1–C1 · |독일어 듣기 훈련 |SODA Original |듣기 훈련, A1–C1, )\d+(세트)', lambda mm: mm.group(1) + str(n_sets) + mm.group(2), t)
    # 세트 수가 적힌 다른 곳: 앱 이름표(manifest), 검색 제목(tools/seo.py), 저장소 README 표, Lehrwerk 목차 칸
    mf = os.path.join(H, 'manifest.webmanifest'); t0 = open(mf, encoding='utf-8').read(); t1 = cnt(t0)
    if t1 != t0:
        open(mf, 'w', encoding='utf-8').write(t1)
    mfv = 'manifest.webmanifest?v=' + sha10(mf)
    page = re.sub(r'manifest\.webmanifest\?v=[0-9a-f]{10}', mfv, cnt(page))
    open(PAGE, 'w', encoding='utf-8').write(page)
    R = os.path.dirname(H)
    for rel in ('tools/seo.py', 'README.md', 'index.html'):
        fp = os.path.join(R, rel); t0 = open(fp, encoding='utf-8').read()
        t1 = cnt(t0) if rel != 'index.html' else re.sub(r'(<a class="tile" href="hoertraining/".*?<span class="meta">A1–C1 · )\d+(세트</span>)', lambda mm: mm.group(1) + str(n_sets) + mm.group(2), t0, flags=re.S)
        if t1 != t0:
            open(fp, 'w', encoding='utf-8').write(t1)
    # 독일어 공부법 글의 바로가기 칸에도 세트 수가 있다: 원고를 고치고 그 글들을 다시 만든다
    lm = False
    for fp in glob.glob(os.path.join(R, 'lernmethoden', 'src', '*.txt')):
        t0 = open(fp, encoding='utf-8').read()
        t1 = re.sub(r'(듣기 훈련, A1–C1 )\d+(세트)', lambda mm: mm.group(1) + str(n_sets) + mm.group(2), t0)
        if t1 != t0:
            open(fp, 'w', encoding='utf-8').write(t1); lm = True
    # 검색용 태그(제목·설명)와 sitemap 을 다시 쓴다. 이 페이지의 <head> 가 바뀌므로 sw.js 의 VERSION 은 그 뒤에 계산한다
    if lm:
        subprocess.run([sys.executable, os.path.join(R, 'lernmethoden', 'build.py')], check=True, stdout=subprocess.DEVNULL)       # 끝에 tools/seo.py 도 실행한다
    else:
        subprocess.run([sys.executable, os.path.join(R, 'tools', 'seo.py')], check=True, stdout=subprocess.DEVNULL)
    page = open(PAGE, encoding='utf-8').read()
    # 오프라인 캐시 목록과 버전
    sw = open(SW, encoding='utf-8').read()
    sw = re.sub(r'manifest\.webmanifest\?v=[0-9a-f]{10}', mfv, sw)
    a = sw.index('const AUDIO = ['); b = sw.index('];', a)
    sw = sw[:a] + 'const AUDIO = [\n' + ',\n'.join('  ' + json.dumps(media[k]) for k in order) + '\n' + sw[b:]
    blank = re.sub(r"const VERSION = '[0-9a-f]+';", "const VERSION = '';", sw)          # 버전 글자를 뺀 내용으로 계산해야 다시 실행해도 같은 값이 나온다
    ver = hashlib.sha256((page + blank).encode('utf-8')).hexdigest()[:10]
    sw = re.sub(r"const VERSION = '[0-9a-f]+';", "const VERSION = '%s';" % ver, sw)
    open(SW, 'w', encoding='utf-8').write(sw)
    print('세트 %d · 지문 %d · 문항 %d · 음원 %d분 | 새로 넣은 세트: %s | sw VERSION %s' % (n_sets, len(data['items']), nq, mins, ' '.join(sorted(new_secs)), ver))


if __name__ == '__main__':
    a = sys.argv[1:]
    if not a:
        print(__doc__)
    elif a[0] == 'check':
        sys.exit(1 if cmd_check(a[1:]) else 0)
    elif a[0] == 'tts':
        cmd_tts(a[1], a[2:])
    elif a[0] == 'mix':
        cmd_mix(a[1], a[2:])
    elif a[0] == 'merge':
        cmd_merge(a[1:])
    else:
        print(__doc__)
