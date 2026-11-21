#!/usr/bin/env python3
"""Aktuelle Grammatikpunkte aller Texte eines Niveaus in work/ (überarbeitet = Datei unterscheidet sich vom Original).
Aufruf: python3 -I lt_topics.py a2"""
import sys, os, json, glob
HERE = os.path.dirname(os.path.abspath(__file__))
lv = sys.argv[1].lower()
for p in sorted(glob.glob(os.path.join(HERE, "work", f"{lv}-*.json"))):
    d = json.load(open(p, encoding="utf-8"))
    o = json.load(open(os.path.join(HERE, "orig", os.path.basename(p)), encoding="utf-8"))
    mark = "neu " if d != o else "alt "
    print(f"{mark}{d['id']} ({d['type']}): " + " | ".join(f"{g['title']} [{g['term']}]" for g in d["grammar"]))
