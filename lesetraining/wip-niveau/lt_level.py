#!/usr/bin/env python3
"""Niveau gesamt: alle Texte eines Niveaus aus work/ zusammen (wie „Lesen gesamt“ im Standard) und Aufgaben-Summen.
Aufruf: python3 -I lt_level.py [a1 a2 …] [--orig]"""
import sys, os, json, glob, statistics as st
HERE = os.path.dirname(os.path.abspath(__file__)); S = os.path.dirname(HERE)
sys.path.insert(0, os.path.join(S, "dm"))
from dm import text_stats, overlap
T = json.load(open(os.path.join(HERE, "targets.json"), encoding="utf-8"))
SRC = os.path.join(HERE, "orig" if "--orig" in sys.argv else "work")
lvs = [a for a in sys.argv[1:] if not a.startswith("--")] or ["a1", "a2", "b1", "b2", "c1"]
for lv in lvs:
    ds = [json.load(open(p, encoding="utf-8")) for p in sorted(glob.glob(os.path.join(SRC, f"{lv}-*.json")))]
    texts = ["\n".join(x["de"] for x in d["paragraphs"]) for d in ds]
    pooled = text_stats("\n".join(texts))
    per = [text_stats(t)["LIX"] for t in texts]
    ans, dis, kw, mc, sh, lg, pos = [], [], 0, 0, 0, 0, {}
    for d, t in zip(ds, texts):
        for q in d["questions"]:
            if q["type"] != "mc" or q.get("kind") == "match":
                continue
            mc += 1; a = q["answer"]; pos[a] = pos.get(a, 0) + 1
            ov = [overlap(x, t) or 0.0 for x in q["options"]]
            ans.append(ov[a]); dis += [v for k, v in enumerate(ov) if k != a]
            if ov[a] == max(ov) and ov.count(ov[a]) == 1: kw += 1
            L = [len(x) for x in q["options"]]
            if L[a] == max(L) and L.count(max(L)) == 1: lg += 1
            if L[a] == min(L) and L.count(min(L)) == 1: sh += 1
    tg = T["level"][lv]
    ok = tg["LIX"][0] <= pooled["LIX"] <= tg["LIX"][1]
    print(f"{lv.upper()} ({len(ds)} Texte, {SRC.split('/')[-1]}): LIX gesamt {pooled['LIX']:.1f} {'✓' if ok else '✗'} [Ziel {tg['LIX'][0]}–{tg['LIX'][1]}, Obergrenze {tg['cap']}]"
          f" · Median je Text {st.median(per):.1f} · Satzlänge {pooled['ASL']:.1f} · > 5k {pooled['jenseits5k%']:.1f} % · Nominal {pooled['Nominal%']:.1f} % · MTLD {pooled['MTLD']:.0f}")
    print(f"     Aufgaben: MC {mc} · Lösung-Überlappung Median {st.median(ans):.2f} (≤ {tg['ov']}) · Distraktoren {st.mean(dis):.2f} · Stichwort-lösbar {kw / mc * 100:.0f} %"
          f" · Lösung allein längste {lg} · allein kürzeste {sh / mc * 100:.0f} % · Lösungspositionen {dict(sorted(pos.items()))}")
