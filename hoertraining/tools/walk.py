#!/usr/bin/env python3
"""walk.py 세트 [세트 ...] [--shots]   예) python3 hoertraining/tools/walk.py A2_17 B1_20

Lehrwerk Hörtraining 의 세트를 실제 브라우저(Playwright Chromium, 휴대폰 크기 390x844)에서 7단계 모두 눌러 봅니다.
- 음원이 실제로 재생되는지, 줄 재생이 그 줄의 시각으로 가는지
- 지문의 모든 낱말에 뜻이 있는지, 해석·빈칸 지문·채점·근거·근거 구간 재생·복습 카드가 나오는지
- 화면 오류(pageerror, console error)가 없는지
마지막 줄이 "ALL PASS" 여야 합니다. --shots 를 붙이면 단계별 화면을 walk-<세트>-<단계>.png 로 지금 폴더에 저장합니다.
세트 하나에 1분 반쯤 걸립니다. 필요한 것: pip 의 playwright 와 Chromium."""
import subprocess, time, sys, json, os
from playwright.sync_api import sync_playwright
PORT = 8796
secs = [a for a in sys.argv[1:] if not a.startswith('-')]
shots = '--shots' in sys.argv
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))          # 저장소 맨 위 폴더
srv = subprocess.Popen(['python3', '-m', 'http.server', str(PORT)], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(0.8)
fails = []; checks = [0]


def ok(c, m):
    checks[0] += 1
    if not c:
        fails.append(m)
        if len(fails) <= 40: print('   FAIL', m)


try:
    with sync_playwright() as pw:
        b = pw.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
        ctx = b.new_context(viewport={'width': 390, 'height': 844}, service_workers='block')
        ctx.route('**/SODA-LERNPORTAL/**', lambda r: r.abort()); ctx.route('**/gc.zgo.at/**', lambda r: r.abort())
        pg = ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.on('console', lambda m: errs.append('console: ' + m.text[:200]) if m.type == 'error' and 'SODA-LERNPORTAL' not in m.text and 'ERR_FAILED' not in m.text else None)
        pg.goto('http://localhost:%d/hoertraining/' % PORT); pg.wait_for_timeout(700)
        D = pg.evaluate('window.__routine.data')
        ITEMS = D['items']; SECS = {s['id']: s for s in D['sections']}

        def act(a, arg=None):
            return pg.locator('[data-act="%s"]' % a + ('[data-arg="%s"]' % arg if arg is not None else ''))

        def click(a, arg=None, tag=''):
            loc = act(a, arg)
            if loc.count() == 0:
                ok(False, '%s: 누를 것이 없음 %s:%s' % (tag, a, arg)); return False
            loc.first.click(); pg.wait_for_timeout(60); return True

        def text():
            return pg.evaluate("document.getElementById('app') ? document.getElementById('app').innerText : document.body.innerText")

        def step():
            return pg.evaluate("(document.querySelector('[data-step]')||{dataset:{}}).dataset.step")

        def screen():
            return pg.evaluate("(document.querySelector('[data-screen]')||{dataset:{}}).dataset.screen")

        def next_disabled():
            return pg.evaluate("(function(){var b=document.querySelector('[data-act=\"next\"]');return !b||b.disabled;})()")

        def au(expr):
            return pg.evaluate("(function(){var a=document.getElementById('au');return %s;})()" % expr)

        click('start')
        n = 0
        for sid in secs:
            s = SECS[sid]; lv = sid[:2]; tag = sid
            if screen() != 'levels':
                if act('levels').count(): click('levels')
            click('pick', lv); ok(screen() == 'home', tag + ' 세트 목록')
            click('sec', sid, tag); pg.wait_for_timeout(200)
            for k, ix in enumerate(s['items']):
                it = ITEMS[ix]
                # STEP 1
                ok(step() == '1', tag + ' STEP 1')
                t = text()
                ok(it['topic'] in t and it['topicKo'] in t, tag + ' 주제')
                for v in it['keyVocab']: ok(v['w'] in t, tag + ' 미리 볼 낱말 ' + v['w'])
                for v in it['keySentences']: ok(v['de'] in t, tag + ' 미리 볼 문장')
                for q in it['questions']: ok(q['de'] in t, tag + ' 문항 미리 읽기 ' + q['no'])
                ok(next_disabled(), tag + ' STEP 1 잠금')
                click('c1', 'v'); click('c1', 's'); click('c1', 'q')
                ok(not next_disabled(), tag + ' STEP 1 해제')
                if shots: pg.screenshot(path='walk-%s-1.png' % sid)
                click('next')
                # STEP 2
                ok(step() == '2', tag + ' STEP 2')
                pg.wait_for_function("(function(){var a=document.getElementById('au');return a&&a.readyState>=2;})()", timeout=20000)
                dur = au('a.duration'); ok(abs(dur - it['dur']) < 0.3, tag + ' 음원 길이 %.2f / %.2f' % (dur, it['dur']))
                click('pp'); pg.wait_for_timeout(1600)
                ct = au('a.currentTime'); ok(ct > 0.8 and not au('a.paused'), tag + ' 재생됨 (%.2f초)' % ct)
                click('pp'); ok(au('a.paused'), tag + ' 멈춤')
                first = {}
                for qi, q in enumerate(it['questions']):
                    pick = q['answer'] if (qi + n) % 2 == 0 else (q['answer'] + 1) % len(q['options'])
                    first[qi] = pick; click('fp', '%d:%d' % (qi, pick), tag + ' 1차 ' + q['no'])
                t = text(); ok('정답입니다' not in t and '오답입니다' not in t, tag + ' 1차 풀이는 채점 표시 없음')
                click('fplock')
                ok(next_disabled(), tag + ' STEP 2 잠금'); click('rate2', '중'); ok(not next_disabled(), tag + ' STEP 2 해제')
                if shots: pg.screenshot(path='walk-%s-2.png' % sid)
                click('next')
                # STEP 3
                ok(step() == '3', tag + ' STEP 3')
                nl = pg.evaluate("document.querySelectorAll('[data-transcript] .ln').length"); ok(nl == len(it['lines']), tag + ' 대본 줄 수 %d' % nl)
                who = pg.evaluate("[...document.querySelectorAll('[data-transcript] .ln .who')].map(e=>e.textContent)")
                ok(who == [l['sp'] + ':' for l in it['lines']], tag + ' 화자')
                surf = list(it['vx'].keys())
                toks = pg.evaluate(r"""(() => { const P = /^[\s.,?!;:()\[\]{}„“”"‚‘’'«»‹›…–—\-\/]+|[\s.,?!;:()\[\]{}„“”"‚‘’'«»‹›…–—\-\/]+$/g; return [...document.querySelectorAll('.tk.v')].map(e => e.textContent.replace(P, '')); })()""")   # 앱과 같은 규칙(PUNCT)으로 문장 부호를 뗀다
                tk_all = pg.evaluate("document.querySelectorAll('.tk').length"); tk_v = len(toks)
                ok(tk_all == tk_v, tag + ' 모든 낱말에 뜻이 있음 (%d / %d)' % (tk_v, tk_all))
                for sfc in surf: ok(sfc in toks, tag + ' 낱말 토큰 ' + sfc)
                for sfc in surf[::max(1, len(surf) // 12)]:            # 열두 개쯤 눌러 본다
                    i = toks.index(sfc)
                    pg.locator('.tk.v').nth(i).click(); pg.wait_for_timeout(50)
                    e = it['vocab'][it['vx'][sfc]]
                    pop = pg.evaluate("(document.querySelector('.pop')||{textContent:''}).textContent")
                    ok(e['meaning'] in pop, tag + ' 뜻 ' + sfc)
                    click('popclose')
                for li in range(len(it['lines'])):
                    click('sq', str(li))
                t = text()
                for li, l in enumerate(it['lines']): ok(l['ko'] in t, tag + ' 해석 %d' % li)
                for li in range(0, len(it['lines']), max(1, len(it['lines']) // 6)):
                    pg.locator('[data-transcript] [data-act="seg"][data-arg="%d"]' % li).first.click(); pg.wait_for_timeout(350)
                    ct = au('a.currentTime'); t0, t1 = it['lines'][li]['t']
                    ok(t0 - 0.05 <= ct <= t0 + 1.2 and ct <= t1 + 0.3, tag + ' 줄 %d 재생 위치 %.2f (줄 %.2f~%.2f)' % (li, ct, t0, t1))
                    pg.wait_for_timeout(int(min(1.2, max(0.2, t1 - t0 - 0.4)) * 1000))
                pg.evaluate("document.getElementById('au').pause()")
                ok(next_disabled(), tag + ' STEP 3 잠금'); click('und')
                if shots: pg.screenshot(path='walk-%s-3.png' % sid)
                click('next')
                # STEP 4
                ok(step() == '4', tag + ' STEP 4')
                click('cloze'); nb = act('blank').count(); ok(nb > 0, tag + ' 빈칸 %d개' % nb)
                args = pg.evaluate("[...document.querySelectorAll('[data-act=\"blank\"]')].map(e=>e.getAttribute('data-arg'))")
                for a in args[:8]: click('blank', a)
                if shots: pg.screenshot(path='walk-%s-4.png' % sid)
                click('rate4', '상'); click('next')
                # STEP 5
                ok(step() == '5', tag + ' STEP 5')
                gc = 0; fc = 0; tot = 0
                for qi, q in enumerate(it['questions']):
                    nopt = pg.evaluate("document.querySelectorAll('.q[data-q=\"%d\"] .opt').length" % qi); ok(nopt == len(q['options']), tag + ' 보기 수 ' + q['no'])
                    wrong = (qi + n) % 3 == 1; pick = (q['answer'] + 1) % len(q['options']) if wrong else q['answer']
                    click('ans', '%d:%d' % (qi, pick), tag + ' 답 ' + q['no'])
                    bt = pg.evaluate("document.querySelector('.q[data-q=\"%d\"]').textContent" % qi)
                    ok(('오답입니다. 정답: ' in bt) if wrong else ('정답입니다!' in bt), tag + ' 채점 ' + q['no'])
                    ok(q['ko'] in bt, tag + ' 답 뒤 요지 ' + q['no'])
                    for e in q['evidence']: ok(e['quote'] in bt, tag + ' 근거 ' + q['no'])
                    ok(q['explain'] in bt, tag + ' 해설 ' + q['no'])
                    seg = pg.locator('.q[data-q="%d"] [data-act="seg"]' % qi)
                    if seg.count() and qi % 3 == 0:
                        seg.first.click(); pg.wait_for_timeout(350); ct = au('a.currentTime'); t0, t1 = it['lines'][q['evidence'][0]['line']]['t']
                        ok(t0 - 0.05 <= ct <= t0 + 1.2, tag + ' 근거 재생 위치 %s: %.2f (줄 %.2f~%.2f)' % (q['no'], ct, t0, t1))
                        pg.evaluate("document.getElementById('au').pause()")
                    tot += 1; gc += 0 if wrong else 1; fc += 1 if first[qi] == q['answer'] else 0
                fin = pg.evaluate("(document.querySelector('[data-score=\"final\"]')||{textContent:''}).textContent"); ok(fin == '%d / %d' % (gc, tot), tag + ' 최종 점수 ' + fin)
                fst = pg.evaluate("(document.querySelector('[data-score=\"first\"]')||{textContent:''}).textContent"); ok(fst == '%d / %d' % (fc, tot), tag + ' 1차 점수 ' + fst)
                if shots: pg.screenshot(path='walk-%s-5.png' % sid, full_page=True)
                click('next')
                # STEP 6
                ok(step() == '6', tag + ' STEP 6')
                click('cause', 'sound'); click('cause', 'vocab'); click('save'); pg.wait_for_timeout(150)
                # STEP 7
                ok(step() == '7' and '학습 완료!' in text(), tag + ' STEP 7')
                if shots: pg.screenshot(path='walk-%s-7.png' % sid)
                click('again'); n += 1
            print('%s  확인 %d개째, 실패 %d' % (sid, checks[0], len(fails)))
            if screen() != 'home' and act('back').count(): click('back')
            if act('levels').count(): click('levels')
        ok(not errs, '스크립트 오류: %s' % errs[:3])
        b.close()
finally:
    srv.terminate()
print('checks', checks[0], 'fails', len(fails), 'ALL PASS' if not fails else '')
sys.exit(1 if fails else 0)
