#!/usr/bin/env python3
"""Browserprüfung SODA LESETRAINING (lokaler Server auf dem Repo-Stamm).
Öffnet jeden angegebenen Text, prüft Text/Aufgaben/Grammatik/Wortschatz, beantwortet alle Aufgaben mit dem Schlüssel und erwartet volle Punktzahl.
Aufruf: python3 -I lt_browser.py PORT [ID …]   (ohne IDs: alle 125)"""
import asyncio, sys, os, json, glob
from playwright.async_api import async_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
REPO_SRC = "/home/claude/soda-lehrwerk/lesetraining/src/texts"
port = int(sys.argv[1])
ids = sys.argv[2:] or [os.path.basename(p)[:-5] for p in sorted(glob.glob(os.path.join(REPO_SRC, "*.json")))]


async def one(ctx, tid, shots):
    d = json.load(open(os.path.join(REPO_SRC, tid + ".json"), encoding="utf-8"))
    lv, no = tid.split("-")
    pg = await ctx.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    base = f"http://127.0.0.1:{port}/lesetraining/index.html"
    await pg.goto(f"{base}#/{lv}/{no}/text")
    await pg.wait_for_selector("#panel-text", timeout=20000)
    await asyncio.sleep(0.4)
    body = await pg.evaluate("document.querySelector('#panel-text').innerText")
    p0 = d["paragraphs"][0]["de"][:40]
    ok_text = p0 in body
    if tid in shots:
        await pg.screenshot(path=os.path.join(HERE, "log", f"shot-{tid}-text.png"), full_page=False)
    await pg.goto(f"{base}#/{lv}/{no}/aufgaben")
    await asyncio.sleep(0.5)
    for i, q in enumerate(d["questions"]):
        await pg.click(f'[data-act="pick"][data-q="{i}"][data-o="{q["answer"]}"]')
    await pg.click('[data-act="grade"]')
    await asyncio.sleep(0.4)
    score = await pg.evaluate("(document.getElementById('score')||{}).innerText||''")
    n = len(d["questions"])
    ok_quiz = f"{n} / {n}" in score
    if tid in shots:
        await pg.screenshot(path=os.path.join(HERE, "log", f"shot-{tid}-aufgaben.png"), full_page=False)
    await pg.goto(f"{base}#/{lv}/{no}/grammatik")
    await asyncio.sleep(0.4)
    gram = await pg.evaluate("(document.querySelector('#panel-grammatik')||{}).innerText||''")
    ok_gram = all(g["title"][:12] in gram for g in d["grammar"])
    await pg.goto(f"{base}#/{lv}/{no}/wortschatz")
    await asyncio.sleep(0.4)
    voc = await pg.evaluate("(document.querySelector('#panel-wortschatz')||{}).innerText||''")
    ok_voc = all(v["de"].split(",")[0][:15] in voc for v in d["vocab"][:5])
    await pg.close()
    ok = ok_text and ok_quiz and ok_gram and ok_voc and not errs
    if not ok:
        print(f"{tid}: Text {ok_text} · Aufgaben {ok_quiz} ({score.splitlines()[0] if score else '-'}) · Grammatik {ok_gram} · Wortschatz {ok_voc} · JS-Fehler {errs[:2]}")
    return ok


async def main():
    shots = {"a1-01", "b2-01", "c1-01"}
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={"width": 1100, "height": 900})
        res = []
        for tid in ids:
            try:
                res.append(await one(ctx, tid, shots))
            except Exception as e:
                print(f"{tid}: Ausnahme {e}")
                res.append(False)
        await b.close()
    print(f"geprüft {len(res)} · OK {sum(res)}")
    print("BROWSER OK" if all(res) else "BROWSER: Probleme")

asyncio.run(main())
