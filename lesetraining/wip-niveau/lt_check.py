#!/usr/bin/env python3
"""SODA LESETRAINING – Prüfung der überarbeiteten Texte in work/ (Ziel: oberes Ende des jeweiligen Niveaus).

Aufruf:
    python3 -I lt_check.py a1-01 [a1-02 …]      # Texte prüfen
    python3 -I lt_check.py a1-01 --blind         # zusätzlich blind/a1-01.txt (Text + Aufgaben ohne Lösungen)

Prüft:
  1. das Prüfskript des Repos (tools/validate.py) – Fehler UND Hinweise müssen weg
  2. Gleichbleibendes gegenüber orig/: id, level, no, type, Absatzzahl mit label/style, Fragetypen, Lösungsnummern, Anzahl der Teile
  3. Kennzahlen (dm.py) gegen das Zielband der Textsorte (targets.json): LIX und Satzlänge hart, > 5k %, Nominalstil, MTLD weich
  4. Aufgaben: richtige Option nie allein die längste, Stichwort-Lösbarkeit, Paraphrase-Grad, Distraktoren mit Textwörtern,
     genug Aufgaben jenseits von „detail“
  5. Hinweise auf Strukturen oberhalb des Niveaus (Kandidaten – bitte selbst beurteilen)
Letzte Zeile: ALLES OK (keine Fehler) oder FEHLER: n.
"""
import sys, os, re, json
from pathlib import Path

HERE = os.path.dirname(os.path.abspath(__file__))
S = os.path.dirname(HERE)
sys.path.insert(0, os.path.join(S, "dm"))
from dm import text_stats, overlap  # noqa: E402

REPO_TOOLS = "/home/claude/soda-lehrwerk/lesetraining/tools"
sys.path.insert(0, REPO_TOOLS)
import validate  # noqa: E402

T = json.load(open(os.path.join(HERE, "targets.json"), encoding="utf-8"))
WORK = os.path.join(HERE, "work")
ORIG = os.path.join(HERE, "orig")

# ---------------------------------------------------------------- Niveau-Obergrenzen (Kandidatensuche, Regex – nicht perfekt)
SUB_A2 = r"\b(weil|dass|wenn|ob|als|falls|obwohl|damit|nachdem|bevor|während|sodass|seitdem|sobald|solange|indem)\b"
PRAET = r"\b(ging|gingen|kam|kamen|sah|sahen|gab|fand|fanden|stand|saß|lag|nahm|nahmen|fuhr|fuhren|lief|sprach|schrieb|las|trank|aß|machte|machten|sagte|sagten|wohnte|kaufte|spielte|arbeitete|lernte|konnte|konnten|musste|mussten|durfte|sollte|wollte|wollten|mochte|wusste|dachte|brachte|blieb|wurde|wurden)\b"
CEIL = {
    "a1": [
        (r"(?:,|^|[.!?]\s)\s*" + SUB_A2 + r"\b[^.!?]*", "Nebensatz (ab A2)"),
        (r",\s+(?:\w+\s+)?(der|die|das|dem|den|deren|dessen|denen)\s+[^,.!?]*\b\w+(t|en|n)\s*[,.!?]", "Relativsatz? (ab A2)"),
        (PRAET, "Präteritum außer war/hatte (ab A2)"),
        (r"\b(würde\w*|hätte\w*|wäre\w*|könnte\w*|sollte\w*|müsste\w*)\b", "Konjunktiv II außer möchte (ab A2)"),
        (r"\b(wird|werden|wurde|wurden)\b[^.!?]{0,60}\bge[a-zäöüß]+(t|en)\b", "Passiv? (ab A2/B1)"),
        (r"\bzu\s+[a-zäöüß]+en\b", "zu + Infinitiv? (ab A2)"),
        (r"\b(des|eines|meines|deines|seines|ihres|unseres)\s+[A-ZÄÖÜ]\w+?e?s\b", "Genitiv (ab A2/B1)"),
        (r"\bsich\b", "reflexives Verb (ab A2)"),
    ],
    "a2": [
        (r"\b(hatte|hatten|hattest|war|waren|warst)\b[^.!?,]{0,50}\b(ge[a-zäöüß]+(t|en)|[a-zäöüß]+iert)\b", "Plusquamperfekt? (ab B1)"),
        (r"\b(hätte|hätten|hättest|wäre|wären|wärst)\b[^.!?]{0,50}\b(ge[a-zäöüß]+(t|en)|[a-zäöüß]+iert)\b", "Konjunktiv II Vergangenheit (ab B1)"),
        (r"\b(wurde|wurden)\b[^.!?]{0,60}\bge[a-zäöüß]+(t|en)\b|\bworden\b", "Passiv Präteritum/Perfekt (ab B1)"),
        (r"\b(obwohl|nachdem|sodass|indem|sobald|solange|seitdem)\b", "Konnektor ab B1"),
        (r",\s*damit\b|\bum\b[^.!?]{1,50}\bzu\s+[a-zäöüß]+en\b", "Finalsatz damit / um … zu (ab B1)"),
        (r"\bje\b[^.!?]{1,40}\bdesto\b|\bsowohl\b[^.!?]{1,40}\bals auch\b|\bweder\b[^.!?]{1,40}\bnoch\b|\bentweder\b|\bnicht nur\b[^.!?]{1,40}\bsondern auch\b", "zweiteiliger Konnektor (ab B1)"),
        (r",\s+(mit|von|bei|zu|aus|nach|in|an|auf|für|über|unter|vor|neben|zwischen|durch|gegen|ohne)\s+(dem|der|denen|den|das|die|deren|dessen)\s", "Relativsatz mit Präposition (ab B1)"),
        (r"\b(trotz|wegen|während|statt|innerhalb|außerhalb)\s+(des|der|eines|einer)\b", "Genitivpräposition (ab B1)"),
        (r"\b(lässt|lassen|ließ)\s+sich\b|\b(ist|sind)\s+(?:\w+\s+){0,3}zu\s+[a-zäöüß]+en\b", "Passiversatz (ab B2)"),
    ],
    "b1": [
        (r"\b(sei|seien|könne|müsse|solle|wolle|dürfe|werde)\b", "Konjunktiv I? (ab B2)"),
        (r"\b(?:er|sie|es|man|[A-ZÄÖÜ][a-zäöüß]+)\s+habe\b", "Konjunktiv I habe? (ab B2)"),
        (r"\b(der|die|das|den|dem|des|ein|eine|einen|einem|einer|eines)\s+(?:[a-zäöüß]+\s+){1,4}(ge[a-zäöüß]+(ten|tene[nmrs]?|enen|ene[mrs]?)|[a-zäöüß]+(ende|enden|ender|endes|endem)|[a-zäöüß]+ierte[nmrs]?)\s+[A-ZÄÖÜ]", "erweitertes Partizipialattribut? (ab B2)"),
        (r"\b(lässt|lassen|ließ|ließen)\s+sich\b|\b(ist|sind|war|waren)\s+(?:\w+\s+){0,3}zu\s+[a-zäöüß]+en\b", "Passiversatz (ab B2)"),
        (r"\bwerden?\b[^.!?]{0,40}\bge[a-zäöüß]+(t|en)\s+(haben|sein)\b", "Futur II (ab B2)"),
        (r"\bzu\s+[a-zäöüß]+end(e|en|er|es|em)?\b|\bals dass\b|\bgeschweige denn\b|\bes bedarf\b|\bbedarf es\b", "C1-Struktur"),
    ],
    "b2": [
        (r"\bzu\s+[a-zäöüß]+end(e|en|er|es|em)?\b", "Gerundiv zu + Partizip I (C1)"),
        (r"\bals dass\b", "zu …, als dass (C1)"),
        (r"\bgeschweige denn\b", "geschweige denn (C1)"),
        (r"\bes bedarf\b|\bbedarf es\b|\bbedurfte\b", "es bedarf (C1)"),
        (r"\b(mag|mögen|mochte)\b[^.!?]{0,50}\b(auch|noch so)\b", "konzessives mögen (C1)"),
        (r"\b(ungeachtet|unbeschadet|vermittels|zwecks)\b", "C1-Präposition"),
        (r"\bsei es\b", "sei es … oder (C1)"),
    ],
    "c1": [],
}
# Ausnahmen: Lösungsnummer darf sich ändern (Original hatte alle MC-Lösungen an derselben Stelle – Hinweis des Repo-Prüfskripts)
ALLOW_ANSWER_CHANGE = {("a1-02", 2), ("a1-02", 5)}
FORBIDDEN = [(r"Was machst du von Beruf\??", "„Was machst du von Beruf?“ nicht verwenden")]


def register(d):
    ko = " ".join(x["ko"] for x in d["paragraphs"] if x.get("style") not in ("h", "meta"))
    a = len(re.findall(r"(니다|니까)[.!?…\"”’)]*(\s|$)", ko)); b = len(re.findall(r"요[.!?…\"”’)]*(\s|$)", ko))
    return "합니다체" if a > b else "해요체"


def text_of(d):
    return "\n".join(p["de"] for p in d["paragraphs"])


def sentences_simple(t):
    return [s.strip() for s in re.split(r"(?<=[.!?…])\s+|\n+", t) if s.strip()]


def ceiling_hits(lv, t):
    hits = []
    for pat, label in CEIL.get(lv, []):
        for s in sentences_simple(t):
            m = re.search(pat, s, flags=re.I if label.startswith(("Nebensatz", "Konnektor")) else 0)
            if m:
                hits.append((label, s))
    return hits


def mc_items(d):
    return [(i, q) for i, q in enumerate(d["questions"], 1) if q["type"] == "mc" and q.get("kind") != "match"]


def check(tid, blind=False, quiet=False):
    errs, warns, info = [], [], []
    wp = os.path.join(WORK, tid + ".json")
    op = os.path.join(ORIG, tid + ".json")
    try:
        d = json.load(open(wp, encoding="utf-8"))
    except Exception as e:
        print(f"{tid}: JSON nicht lesbar: {e}\nFEHLER: 1")
        return 1
    o = json.load(open(op, encoding="utf-8"))
    tg = T["texts"][tid]
    lv, cat = tg["level"], tg["cat"]
    band = T["band"][f"{lv}-{cat}"]
    L = T["level"][lv]

    # 1. Repo-Prüfskript
    res = validate.validate_file(Path(wp))
    rep, wc = res if isinstance(res, tuple) else (res, 0)
    errs += [f"validate: {e}" for e in rep.errors]
    errs += [f"validate (Hinweis, bitte beheben): {w}" for w in rep.warns]

    # 2. Gleichbleibendes
    for k in ("id", "level", "no", "type"):
        if d.get(k) != o.get(k):
            errs.append(f"Feld {k} geändert: {o.get(k)!r} → {d.get(k)!r}")
    for k in ("title", "titleKo", "typeKo"):
        if d.get(k) != o.get(k):
            warns.append(f"Feld {k} geändert: {o.get(k)!r} → {d.get(k)!r} (nur wenn nötig)")
    sig = lambda dd: [(p.get("label"), p.get("style")) for p in dd["paragraphs"]]
    if sig(d) != sig(o):
        errs.append(f"Absatzstruktur (Zahl/label/style) geändert: {len(o['paragraphs'])} → {len(d['paragraphs'])} Absätze")
    qsig = lambda dd: [(q["type"], q.get("kind") == "match", None if (tid, i) in ALLOW_ANSWER_CHANGE else q.get("answer")) for i, q in enumerate(dd["questions"], 1)]
    if qsig(d) != qsig(o):
        for i, (a, b) in enumerate(zip(qsig(o), qsig(d)), 1):
            if a != b:
                errs.append(f"Frage {i}: Typ/match/Lösungsnummer geändert {a} → {b} (bleiben gleich)")
        if len(d["questions"]) != len(o["questions"]):
            errs.append("Fragenzahl geändert")
    t = text_of(d)
    ow = len(validate.words(text_of(o)))
    if not (0.85 * ow <= wc <= 1.2 * ow):
        warns.append(f"Wortzahl {wc} weicht stark vom Original ({ow}) ab")
    if d != o and register(d) != register(o):
        errs.append(f"Übersetzungsstil der Absätze geändert: Original {register(o)}, jetzt {register(d)} – wie im Original halten (paragraphs.ko, examples.ko, exko)")
    for pat, label in FORBIDDEN:
        blob = json.dumps(d, ensure_ascii=False)
        if re.search(pat, blob):
            errs.append(label)

    # 3. Kennzahlen
    s = text_stats(t)
    def rng(name, val, lohi, hard):
        lo, hi = lohi
        ok = lo <= val <= hi
        if not ok:
            (errs if hard else warns).append(f"{name} {val:.1f} außerhalb Ziel {lo}–{hi}")
        return "✓" if ok else "✗"
    m_lix = rng("LIX", s["LIX"], band["LIX"], True)
    m_asl = rng("Satzlänge", s["ASL"], band["ASL"], True)
    m_k5 = rng("> 5k %", s["jenseits5k%"], band["k5"], False)
    m_nom = rng("Nominal %", s["Nominal%"], band["NOM"], False)
    mt = s["MTLD"]
    m_mt = "✓"
    if mt == mt and mt > band["MTLD"]:
        warns.append(f"MTLD {mt:.0f} über Obergrenze {band['MTLD']} (Kernwörter wiederholen, mit Pronomen/Demonstrativa aufnehmen)")
        m_mt = "✗"

    # 4. Aufgaben
    kw = 0; ans_ov = []; dis_ov = []; shortest = 0; mcn = 0
    for i, q in mc_items(d):
        opts = q["options"]; a = q["answer"]
        mcn += 1
        lens = [len(x) for x in opts]
        if lens[a] == max(lens) and lens.count(max(lens)) == 1:
            errs.append(f"Frage {i}: richtige Option ist allein die längste ({lens}) – kürzen oder eine falsche Option verlängern")
        if lens[a] == min(lens) and lens.count(min(lens)) == 1:
            shortest += 1
        ov = [overlap(x, t) for x in opts]
        ov = [v if v is not None else 0.0 for v in ov]
        ans_ov.append(ov[a]); dis_ov += [v for k, v in enumerate(ov) if k != a]
        if ov[a] == max(ov) and ov.count(ov[a]) == 1:
            kw += 1
            info.append(f"Frage {i}: Stichwort-lösbar (richtige Option hat allein die größte Wortüberlappung mit dem Text: {[round(v, 2) for v in ov]})")
    if kw > L["kw_text"]:
        errs.append(f"{kw} MC-Fragen per Stichwort lösbar (erlaubt ≤ {L['kw_text']}): Lösung stärker umschreiben oder Distraktoren mit Textwörtern bauen")
    mean = lambda x: sum(x) / len(x) if x else None
    a_m, d_m = mean(ans_ov), mean(dis_ov)
    if a_m is not None and a_m > L["ov"]:
        warns.append(f"Lösungs-Überlappung {a_m:.2f} über Ziel ≤ {L['ov']} (richtige Optionen stärker umschreiben)")
    if a_m is not None and d_m is not None and d_m < a_m + 0.05:
        warns.append(f"Distraktoren-Überlappung {d_m:.2f} < Lösung {a_m:.2f} + 0,05 (falsche Optionen mit Textwörtern bauen)")
    if mcn >= 3 and shortest * 2 > mcn:
        warns.append(f"richtige Option in {shortest} von {mcn} MC-Fragen allein die kürzeste")
    rf_true, rf_false = [], []
    for i, q in enumerate(d["questions"], 1):
        if q["type"] in ("rf", "rfn") and q["answer"] in (0, 1):
            v = overlap(q["q"], t) or 0.0
            (rf_true if q["answer"] == 0 else rf_false).append(v)
            if q["answer"] == 0 and v > 0.6:
                warns.append(f"Frage {i}: richtige Aussage übernimmt viele Textwörter ({v:.2f}) – stärker umschreiben")
    if rf_true and rf_false and mean(rf_false) + 0.02 < mean(rf_true):
        warns.append(f"falsche Aussagen ({mean(rf_false):.2f}) überlappen weniger mit dem Text als richtige ({mean(rf_true):.2f}) – falsche Aussagen mit Textwörtern als Falle bauen")
    nd = sum(1 for q in d["questions"] if q.get("kind", "detail") not in ("detail", "match"))
    if nd < L["nd"]:
        errs.append(f"nur {nd} Aufgaben jenseits von detail/match (gist, inference, intent, meaning, paraphrase) – mindestens {L['nd']}")

    # 5. Niveau-Obergrenze (Kandidaten)
    hits = ceiling_hits(lv, t)
    for label, sent in hits[:12]:
        warns.append(f"Niveau prüfen – {label}: „{sent[:110]}“")
    if len(hits) > 12:
        warns.append(f"… {len(hits) - 12} weitere Niveau-Kandidaten")

    if not quiet:
        print(f"== {tid} ({lv.upper()} · Kategorie {cat} · {band['ref']})")
        print(f"   Wörter {wc} (Original {ow}) · LIX {s['LIX']:.1f} {m_lix} [{band['LIX'][0]}–{band['LIX'][1]}] · Satzlänge {s['ASL']:.1f} {m_asl} [{band['ASL'][0]}–{band['ASL'][1]}]"
              f" · > 5k {s['jenseits5k%']:.1f} % {m_k5} [{band['k5'][0]}–{band['k5'][1]}] · Nominal {s['Nominal%']:.1f} % {m_nom} [{band['NOM'][0]}–{band['NOM'][1]}]"
              f" · MTLD {mt:.0f} {m_mt} [≤ {band['MTLD']}] · NS/Satz {s['NS/Satz']:.2f}")
        print(f"   Aufgaben: MC {mcn} · Lösung-Überlappung {a_m if a_m is None else round(a_m, 2)} (≤ {L['ov']}) · Distraktoren {d_m if d_m is None else round(d_m, 2)}"
              f" · Stichwort-lösbar {kw} (≤ {L['kw_text']}) · Lösung allein kürzeste {shortest} · R-Aussagen {mean(rf_true) if not rf_true else round(mean(rf_true), 2)}"
              f" · F-Aussagen {mean(rf_false) if not rf_false else round(mean(rf_false), 2)} · jenseits detail {nd} (≥ {L['nd']})")
        for x in info:
            print("   INFO", x)
        for w in warns:
            print("   HINWEIS", w)
        for e in errs:
            print("   FEHLER", e)
    if blind:
        os.makedirs(os.path.join(HERE, "blind"), exist_ok=True)
        out = [f"{tid} – {d['title']} ({d['type']})", ""]
        for p in d["paragraphs"]:
            out.append((p.get("label") + ": " if p.get("label") else "") + p["de"])
            out.append("")
        out.append("AUFGABEN")
        for i, q in enumerate(d["questions"], 1):
            out.append(f"{i}. [{q['type']}/{q.get('kind', 'detail')}] {q['q']}")
            if q["type"] == "mc":
                for k, x in enumerate(q["options"]):
                    out.append(f"   {'ABCDEFG'[k]}) {x}")
            elif q["type"] == "rf":
                out.append("   Richtig / Falsch")
            else:
                out.append("   Ja / Nein / Text sagt dazu nichts")
        open(os.path.join(HERE, "blind", tid + ".txt"), "w", encoding="utf-8").write("\n".join(out) + "\n")
    return len(errs)


if __name__ == "__main__":
    ids = [a for a in sys.argv[1:] if not a.startswith("--")]
    blind = "--blind" in sys.argv
    quiet = "--quiet" in sys.argv
    total = 0
    for tid in ids:
        n = check(tid, blind=blind, quiet=quiet)
        total += n
        if quiet:
            print(f"{tid}: {'OK' if n == 0 else f'{n} Fehler'}")
    print("ALLES OK" if total == 0 else f"FEHLER: {total}")
