#!/usr/bin/env python3
"""Lesetraining: Kennzahlen je Text und je Niveau (dm.py).
Aufruf: python3 -I measure.py [SRC_DIR] [--json out.json]"""
import sys, os, json, glob, statistics as st
S = "/tmp/claude-0/-home-claude/e076b1a8-017e-5846-97fc-4a0635c06c87/scratchpad"
sys.path.insert(0, f"{S}/dm")
from dm import text_stats, item_stats
SRC = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith("--") else "/home/claude/soda-lehrwerk/lesetraining/src/texts"

def text_of(d):
    return "\n".join(p["de"] for p in d["paragraphs"])

def items_of(d):
    out = []
    for q in d["questions"]:
        if q["type"] == "mc":
            opts = {str(i): o for i, o in enumerate(q["options"])}
            out.append({"stem": q["q"], "options": opts, "answer": str(q["answer"])})
        elif q["type"] == "rf":
            out.append({"stem": q["q"], "options": None, "answer": "richtig" if q["answer"] == 0 else "falsch"})
        elif q["type"] == "rfn":
            if q["answer"] in (0, 1):
                out.append({"stem": q["q"], "options": None, "answer": "ja" if q["answer"] == 0 else "nein"})
    return out

def measure(d):
    t = text_of(d)
    s = text_stats(t)
    i = item_stats(items_of(d), t)
    lens = []
    for q in d["questions"]:
        if q["type"] == "mc":
            L = [len(o) for o in q["options"]]
            lens.append(max(L) / min(L))
    return {**{k: s[k] for k in ("Wörter", "ASL", "LIX", "WSTF", "jenseits5k%", "Nominal%", "MTLD", "NS/Satz", "Sätze>25%")},
            **{k: i[k] for k in ("MC", "Lösung-Überlappung", "Distraktor-Überlappung", "Stichwort-lösbar%", "Lösung=längste%", "R-Aussage-Überlappung", "F-Aussage-Überlappung")},
            "maxLenRatio": max(lens) if lens else None}

if __name__ == "__main__":
    rows = {}
    for p in sorted(glob.glob(os.path.join(SRC, "*.json"))):
        d = json.load(open(p, encoding="utf-8"))
        rows[d["id"]] = {"type": d["type"], **measure(d)}
    if "--json" in sys.argv:
        json.dump(rows, open(sys.argv[sys.argv.index("--json") + 1], "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    keys = ["Wörter", "ASL", "LIX", "jenseits5k%", "Nominal%", "MTLD", "Lösung-Überlappung", "Distraktor-Überlappung", "Stichwort-lösbar%", "Lösung=längste%", "R-Aussage-Überlappung", "F-Aussage-Überlappung"]
    print("Niveau | " + " | ".join(keys))
    for lv in ["a1", "a2", "b1", "b2", "c1"]:
        rs = [r for k, r in rows.items() if k.startswith(lv)]
        def med(k):
            v = [r[k] for r in rs if r[k] is not None and r[k] == r[k]]
            return f"{st.median(v):.2f}" if v else "-"
        def rng(k):
            v = [r[k] for r in rs if r[k] is not None and r[k] == r[k]]
            return f"{min(v):.1f}–{max(v):.1f}" if v else "-"
        print(lv, "| " + " | ".join(f"{med(k)} ({rng(k)})" for k in keys))
