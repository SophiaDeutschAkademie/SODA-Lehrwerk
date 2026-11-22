#!/usr/bin/env python3
"""SODA Kinder 화면 검사 (Playwright).

  python3 kinder/tools/test.py full 1 2       단원을 처음부터 끝까지 눌러 봅니다(이야기·카드·말하기·놀이·리듬·스티커)
  python3 kinder/tools/test.py smoke 1-24     모든 화면을 열어 그림·음성 파일·오류만 확인합니다
  python3 kinder/tools/test.py spiel 1        복습 놀이를 끝까지 해 봅니다
저장소 루트를 임시 웹 서버로 띄워 http://127.0.0.1:8765/kinder/ 로 엽니다. 화면 사진은 /tmp/kinder-shots 에 남깁니다.
"""
import asyncio, sys, os, json, time, subprocess, re, glob, urllib.request
from playwright.async_api import async_playwright
T = os.path.dirname(os.path.abspath(__file__)); K = os.path.dirname(T); ROOT = os.path.dirname(K)
PORT = os.environ.get('KINDER_PORT', '8765')      # 여러 검사를 함께 돌릴 때는 KINDER_PORT 를 서로 다르게 줍니다
BASE = f'http://127.0.0.1:{PORT}/kinder/'; SH = '/tmp/kinder-shots'; os.makedirs(SH, exist_ok=True)
errors = []
IGN = ('SODA-LERNPORTAL', 'gc.zgo.at', 'goatcounter', 'favicon')
def src(n): return json.load(open(f'{T}/src/k{n:02d}.json', encoding='utf-8'))
def plain(h): return re.sub(r'<[^>]+>', '', h)
def parse(a):
    out = []
    for x in a:
        if '-' in x: lo, hi = x.split('-'); out += list(range(int(lo), int(hi)+1))
        else: out.append(int(x))
    return out
def watch(page, tag):
    page.on('console', lambda m: errors.append(f'{tag} console {m.type}: {m.text[:200]}') if m.type == 'error' and not any(i in (m.text+str(m.location)) for i in IGN) else None)
    page.on('pageerror', lambda e: errors.append(f'{tag} pageerror: {e}'))
    page.on('requestfailed', lambda r: errors.append(f'{tag} request failed: {r.url[-80:]}') if not any(i in r.url for i in IGN) else None)
    page.on('response', lambda r: errors.append(f'{tag} HTTP {r.status}: {r.url[-80:]}') if r.status >= 400 and not any(i in r.url for i in IGN) else None)
async def overflow(page, tag):
    r = await page.evaluate("()=>[document.documentElement.scrollWidth,window.innerWidth]")
    if r[0] > r[1]+1: errors.append(f'{tag} horizontal overflow {r}')
async def imgs_ok(page, tag):
    bad = await page.evaluate("()=>[...document.querySelectorAll('.screen.is-on img')].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute('src'))")
    if bad: errors.append(f'{tag} broken images {bad[:4]}')
async def solve_memory(page, d):
    n = await page.locator('.mcard').count(); seen = {}
    lab = {}
    for c in d['cards']: lab[c.get('alt') or c['ko']] = c['k']; lab[c['de']] = c['k']
    for i in range(0, n, 2):
        for j in (i, i+1):
            await page.click(f'.mcard[data-m="{j}"]'); await page.wait_for_timeout(120)
            seen[j] = await page.get_attribute(f'.mcard[data-m="{j}"]', 'aria-label')
        await page.wait_for_timeout(1250)
    by = {}
    for i, l in seen.items(): by.setdefault(lab.get(l, l), []).append(i)
    for k, v in by.items():
        if len(v) != 2: errors.append(f'memory labels unmatched {k} {v}'); continue
        if await page.locator(f'.mcard[data-m="{v[0]}"].is-done').count(): continue
        await page.click(f'.mcard[data-m="{v[0]}"]'); await page.wait_for_timeout(150)
        await page.click(f'.mcard[data-m="{v[1]}"]'); await page.wait_for_timeout(1300)
    return await page.locator('.mcard.is-done').count() == n
async def play_listen(page):
    guard = 0
    while await page.locator('.opts').count() and guard < 80:
        guard += 1
        if await page.locator('.opt.is-right').count(): await page.wait_for_timeout(300); continue
        o = page.locator('.opt:not([disabled]):not(.is-right)').first
        await o.click(); await page.wait_for_timeout(250)
        if await page.locator('.opt.is-right').count() == 0: await page.wait_for_timeout(600)
    await page.wait_for_selector('.gbox .stars', timeout=15000)
async def full(page, n, shots=True):
    d = src(n); tag = f'k{n:02d}'; t0 = time.time()
    await page.goto(BASE+f'#k{n}-1'); await page.wait_for_selector('.line', timeout=10000)
    await overflow(page, tag+' s1'); await imgs_ok(page, tag+' s1')
    if shots: await page.screenshot(path=f'{SH}/{tag} 1.png', full_page=True)
    nl = sum(len(s['lines']) for s in d['story'])
    await page.click('#story')
    await page.wait_for_function(f"document.querySelectorAll('.line.is-heard').length==={nl}", timeout=nl*7000+10000)
    assert await page.locator('.step[data-step="1"].is-done').count() == 1, 'step1'
    await page.click('#next'); await page.wait_for_selector('.card')
    await overflow(page, tag+' s2')
    if shots: await page.screenshot(path=f'{SH}/{tag} 2.png', full_page=True)
    for c in d['cards']:
        await page.click(f'.card[data-card="{c["k"]}"]'); await page.wait_for_selector(f'.card[data-card="{c["k"]}"].is-heard', timeout=9000)
    if d.get('letter'): await page.click('.ltr-say'); await page.wait_for_timeout(1500)
    assert await page.locator('.step[data-step="2"].is-done').count() == 1, 'step2'
    await page.click('#next'); await page.wait_for_selector('.talk')
    if await page.locator('#nm').count(): await page.fill('#nm', '지우')
    if await page.locator('#ct').count(): await page.fill('#ct', 'Seoul')
    for ch in await page.locator('.opt-chip').all(): await ch.click(); await page.wait_for_timeout(60)
    if await page.locator('.model').count(): await page.locator('.model').first.click(); await page.wait_for_timeout(1200)
    await page.locator('.say-b[data-play]').first.click(); await page.wait_for_timeout(1500)
    for i in range(len(d['talk'])): await page.click(f'[data-said="{i}"]')
    await overflow(page, tag+' s3'); await imgs_ok(page, tag+' s3')
    if shots: await page.screenshot(path=f'{SH}/{tag} 3.png', full_page=True)
    assert await page.locator('.step[data-step="3"].is-done').count() == 1, 'step3'
    await page.click('#next'); await page.wait_for_selector('[data-g1="start"]')
    await page.click('[data-g1="start"]'); await page.wait_for_timeout(300)
    if shots: await page.screenshot(path=f'{SH}/{tag} 4.png')
    await play_listen(page)
    assert await page.locator('.step[data-step="4"].is-done').count() == 1, 'step4'
    await page.click('.gbox [data-game="2"]'); await page.click('[data-g2="start"]'); await page.wait_for_timeout(200)
    assert await solve_memory(page, d), 'memory'
    await page.wait_for_timeout(1200); await overflow(page, tag+' s4')
    await page.click('#next'); await page.wait_for_selector('#chant')
    if shots: await page.screenshot(path=f'{SH}/{tag} 5.png', full_page=True)
    await page.click('.reim-line[data-reim="0"]'); await page.wait_for_timeout(600)
    await page.click('#chant')
    await page.wait_for_selector('.step[data-step="5"].is-done', timeout=60000)
    await overflow(page, tag+' s5')
    await page.click('#next'); await page.wait_for_selector('#getst')
    await page.click('#getst'); await page.wait_for_timeout(1200)
    await page.click('.note summary'); await overflow(page, tag+' s6'); await imgs_ok(page, tag+' s6')
    if shots: await page.screenshot(path=f'{SH}/{tag} 6.png', full_page=True)
    assert await page.locator('.step.is-done').count() == 6, 'all steps'
    print(f'{tag} full flow ok in {time.time()-t0:.0f}s')
async def smoke(page, n):
    d = src(n); tag = f'k{n:02d}'
    for st in range(1, 7):
        await page.goto(BASE+f'#k{n}-{st}'); await page.wait_for_selector('.guide', timeout=10000); await page.wait_for_timeout(350)
        await overflow(page, f'{tag} s{st}'); await imgs_ok(page, f'{tag} s{st}')
        if st == 2:
            c = d['cards'][0]; await page.click(f'.card[data-card="{c["k"]}"]'); await page.wait_for_selector('.card.is-heard', timeout=9000)
        if st == 4:
            await page.click('[data-g1="start"]'); await page.wait_for_timeout(500); await imgs_ok(page, f'{tag} game')
async def spiel(page, g):
    book = json.load(open(f'{T}/book.json', encoding='utf-8'))['book'][g-1]
    await page.goto(BASE+f'#sp{g}'); await page.wait_for_selector('[data-g1="start"]', timeout=15000)
    await page.screenshot(path=f'{SH}/sp{g} a.png')
    await page.click('[data-g1="start"]'); await page.wait_for_timeout(400); await imgs_ok(page, f'sp{g}')
    await page.screenshot(path=f'{SH}/sp{g} b.png')
    await play_listen(page)
    await page.click('.gbox [data-game="2"]'); await page.click('[data-g2="start"]'); await page.wait_for_timeout(200)
    cards = []
    for it in book['items']: cards += [dict(c, k=f'{it["n"]}:{c["k"]}') for c in src(it['n'])['cards']]
    ok = await solve_memory(page, {'cards': cards}); await page.wait_for_timeout(1500)
    await page.screenshot(path=f'{SH}/sp{g} c.png')
    await page.goto(BASE+'#toc'); await page.wait_for_timeout(300)
    assert ok and await page.locator('.mini-star').count() >= 1, 'spielplatz star'
    print(f'sp{g} ok')
async def main(mode, ns):
    srv = subprocess.Popen([sys.executable, '-m', 'http.server', PORT, '--bind', '127.0.0.1'], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        for _ in range(40):
            try: urllib.request.urlopen(BASE, timeout=1); break
            except Exception: time.sleep(0.25)
        async with async_playwright() as p:
            b = await p.chromium.launch(args=['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--autoplay-policy=no-user-gesture-required'])
            ctx = await b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
            page = await ctx.new_page(); watch(page, 'm')
            for n in ns:
                try:
                    if mode == 'full': await full(page, n)
                    elif mode == 'smoke': await smoke(page, n)
                    elif mode == 'spiel': await spiel(page, n)
                except Exception as e:
                    errors.append(f'{mode} {n}: {type(e).__name__} {str(e)[:300]}')
                    try: await page.screenshot(path=f'{SH}/FAIL {mode} {n}.png')
                    except Exception: pass
            if mode == 'smoke':
                await page.goto(BASE); await page.wait_for_timeout(300); await page.screenshot(path=f'{SH}/cover.png')
                await page.goto(BASE+'#toc'); await page.wait_for_timeout(300); await page.screenshot(path=f'{SH}/toc.png', full_page=True); await overflow(page, 'toc')
            await ctx.close()
            if mode == 'smoke':      # desktop pass
                ctx = await b.new_context(viewport={'width': 1280, 'height': 820}); page = await ctx.new_page(); watch(page, 'd')
                for n in ns[:3]:
                    for st in (1, 2, 3, 5):
                        await page.goto(BASE+f'#k{n}-{st}'); await page.wait_for_selector('.guide'); await page.wait_for_timeout(250); await overflow(page, f'desktop k{n} s{st}')
                await ctx.close()
            await b.close()
    finally:
        srv.terminate()
    print('ERRORS:', len(errors))
    for e in errors[:40]: print('  ', e)
if __name__ == '__main__':
    asyncio.run(main(sys.argv[1], parse(sys.argv[2:])))
