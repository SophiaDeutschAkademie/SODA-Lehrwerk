#!/usr/bin/env python3
"""work/*.json → Repo lesetraining/src/texts (im Format der Repo-Dateien).
Aufruf: python3 -I lt_integrate.py [--write] [ID …]   (ohne --write nur Vergleich)"""
import sys, os, json, glob
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = "/home/claude/soda-lehrwerk/lesetraining/src/texts"

def prim(x):
    return isinstance(x, (str, int, float, bool)) or x is None

def inline_ok(v):
    return all(prim(e) or (isinstance(e, list) and all(prim(y) for y in e)) for e in v)

def fmt(o, ind=0, key=None):
    sp = " " * ind
    if isinstance(o, dict):
        if not o:
            return "{}"
        if key == "vocab" and all(prim(v) for v in o.values()):
            return "{ " + ", ".join(f"{json.dumps(k, ensure_ascii=False)}: {json.dumps(v, ensure_ascii=False)}" for k, v in o.items()) + " }"
        return "{\n" + ",\n".join(f'{sp}  {json.dumps(k, ensure_ascii=False)}: {fmt(v, ind + 2, k)}' for k, v in o.items()) + "\n" + sp + "}"
    if isinstance(o, list):
        if inline_ok(o):
            return json.dumps(o, ensure_ascii=False, separators=(", ", ": "))
        return "[\n" + ",\n".join(f"{sp}  {fmt(v, ind + 2, key)}" for v in o) + "\n" + sp + "]"
    return json.dumps(o, ensure_ascii=False)

def dump(d, nl=True):
    return fmt(d) + ("\n" if nl else "")

if __name__ == "__main__":
    if "--selftest" in sys.argv:
        bad = 0
        for p in sorted(glob.glob(os.path.join(HERE, "orig", "*.json"))):
            s = open(p, encoding="utf-8").read()
            if dump(json.loads(s), s.endswith("\n")) != s:
                bad += 1
                print("abweichend:", os.path.basename(p))
        print("Formattest:", "OK" if bad == 0 else f"{bad} abweichend")
        sys.exit(0)
    ids = [a for a in sys.argv[1:] if not a.startswith("--")] or [os.path.basename(p)[:-5] for p in sorted(glob.glob(os.path.join(HERE, "work", "*.json")))]
    changed = 0
    for tid in ids:
        d = json.load(open(os.path.join(HERE, "work", tid + ".json"), encoding="utf-8"))
        old = open(os.path.join(REPO, tid + ".json"), encoding="utf-8").read()
        new = dump(d, old.endswith("\n"))
        if new != old:
            changed += 1
            if "--write" in sys.argv:
                open(os.path.join(REPO, tid + ".json"), "w", encoding="utf-8").write(new)
    print(f"{changed} von {len(ids)} Dateien {'geschrieben' if '--write' in sys.argv else 'würden sich ändern'}")
