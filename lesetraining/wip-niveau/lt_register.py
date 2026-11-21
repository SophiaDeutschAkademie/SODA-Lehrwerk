#!/usr/bin/env python3
"""Vergleicht die Sprechstufe der Absatz-Übersetzungen (해요체/합니다체) zwischen orig/ und work/.
Aufruf: python3 -I lt_register.py [ID …]"""
import sys, os, json, glob, re
HERE = os.path.dirname(os.path.abspath(__file__))
def reg(d):
    ko = " ".join(x["ko"] for x in d["paragraphs"] if x.get("style") not in ("h", "meta"))
    a = len(re.findall(r"(니다|니까)[.!?…\"”’)]*(\s|$)", ko)); b = len(re.findall(r"요[.!?…\"”’)]*(\s|$)", ko))
    return ("합니다체" if a > b else "해요체"), a, b
ids = sys.argv[1:] or [os.path.basename(p)[:-5] for p in sorted(glob.glob(os.path.join(HERE, "work", "*.json")))]
for tid in ids:
    o = json.load(open(os.path.join(HERE, "orig", tid + ".json"), encoding="utf-8"))
    d = json.load(open(os.path.join(HERE, "work", tid + ".json"), encoding="utf-8"))
    if d == o:
        continue
    ro, rd = reg(o), reg(d)
    if ro[0] != rd[0]:
        print(f"{tid}: {ro[0]} → {rd[0]} (니다 {rd[1]} · 요 {rd[2]})")
