import json
# Kategorien je Text (Textsorte → Bezugsteil im Standard)
CAT = {
 "a1": {"P": [1,2,3,7,8,9,12,14,15,17,18,19,21,25], "I": [4,5,6,10,11,13,16,20,22,23,24]},
 "a2": {"P": [1,2,3,4,7,9,10,11,16,25], "S": [5,6,8,12,15,18,22,24], "R": [13,14,17,19,20,21,23]},
 "b1": {"P": [5,8,10,11,16,18], "C": [3,6,14,20,22], "S": [1,2,4,9,15,17,23,24,25], "R": [7,12,13,19,21]},
 "b2": {"S": [1,2,5,6,7,8,10,12,14,16,17,19,22,24], "P": [3,4,9,11,13,15,18,20,21,23,25]},
 "c1": {"M": [1,3,5,9,10,12,15,17,19,24], "S": [2,6,8,11,13,14,16,20,21,22,23], "L": [4,7,18,25]},
}
# Bänder: LIX und ASL hart (Fehler), die übrigen weich (Hinweis). Quelle: Schwierigkeit-Kennzahlen-Standard (dm.py), Bereich Median–Maximum.
BAND = {
 ("a1","P"): dict(LIX=(22.0,26.5), ASL=(7.0,9.5), k5=(0,14), NOM=(0,1.5), MTLD=130, ref="kein A1-Referenzmaterial: unter dem A2-Median E-Mail (26,8)"),
 ("a1","I"): dict(LIX=(25.0,30.5), ASL=(5.5,9.5), k5=(0,20), NOM=(0,2.0), MTLD=140, ref="kein A1-Referenzmaterial: unter dem A2-Median Zeitungstext (31,1)"),
 ("a2","P"): dict(LIX=(31.0,35.0), ASL=(9.5,11.5), k5=(7.8,13.0), NOM=(0.8,2.2), MTLD=150, ref="Goethe A2 Teil 3 E-Mail 26,8–34,8"),
 ("a2","S"): dict(LIX=(35.0,39.0), ASL=(10.4,13.8), k5=(13.6,23.0), NOM=(0.9,2.0), MTLD=181, ref="Goethe A2 Teil 1 Zeitungstext 31,1–39,1"),
 ("a2","R"): dict(LIX=(36.0,40.0), ASL=(8.0,12.5), k5=(15.0,30.0), NOM=(1.0,4.0), MTLD=214, ref="Goethe A2 Teil 1/4, Obergrenze B1-Median 40,3"),
 ("b1","P"): dict(LIX=(37.0,40.0), ASL=(11.5,14.7), k5=(14.0,21.0), NOM=(0.8,4.1), MTLD=187, ref="Goethe B1 Teil 1 Blog 35,1–38,4"),
 ("b1","C"): dict(LIX=(39.0,41.5), ASL=(10.6,13.0), k5=(17.4,21.0), NOM=(2.1,2.7), MTLD=201, ref="Goethe B1 Teil 4 Leserkommentare 37,8–40,5"),
 ("b1","S"): dict(LIX=(43.0,45.5), ASL=(11.8,13.7), k5=(21.4,27.4), NOM=(2.7,4.0), MTLD=198, ref="Goethe B1 Teil 2 Zeitungsartikel 43,1–45,5"),
 ("b1","R"): dict(LIX=(42.5,45.5), ASL=(11.0,13.8), k5=(22.0,34.0), NOM=(3.5,5.3), MTLD=170, ref="Goethe B1 Teil 5 Hausordnung 46,1–52,3, Obergrenze B2-Median 45,5"),
 ("b2","S"): dict(LIX=(48.0,50.5), ASL=(15.0,17.6), k5=(26.0,30.1), NOM=(3.5,5.7), MTLD=205, ref="telc B2 LV2 Artikel 47,6–50,1"),
 ("b2","P"): dict(LIX=(44.0,48.0), ASL=(13.0,17.0), k5=(20.0,28.0), NOM=(2.5,5.0), MTLD=205, ref="telc B2 zwischen B1-Maximum und LV2"),
 ("c1","M"): dict(LIX=(50.5,53.5), ASL=(16.0,20.1), k5=(25.0,29.2), NOM=(3.9,4.9), MTLD=210, ref="telc C1 HS LV2 Meinungstext 49,7–52,4"),
 ("c1","S"): dict(LIX=(52.5,56.0), ASL=(15.7,21.5), k5=(27.0,31.3), NOM=(4.0,5.9), MTLD=229, ref="telc C1 HS LV3 Reportage 50,5–57,8"),
 ("c1","L"): dict(LIX=(47.0,51.0), ASL=(14.0,20.0), k5=(22.0,29.0), NOM=(1.0,4.0), MTLD=229, ref="telc C1 HS HV2/LV2, literarisch-erzählend"),
}
LEVEL = {  # Niveau gesamt (alle 25 Texte zusammen gemessen) und Aufgaben
 "a1": dict(LIX=(24.5,28.0), cap=28.2, ov=0.40, kw_text=1, nd=1),
 "a2": dict(LIX=(35.8,37.8), cap=40.3, ov=0.40, kw_text=1, nd=2),
 "b1": dict(LIX=(41.5,43.5), cap=45.5, ov=0.35, kw_text=1, nd=3),
 "b2": dict(LIX=(46.5,48.5), cap=51.0, ov=0.32, kw_text=0, nd=4),
 "c1": dict(LIX=(52.0,54.0), cap=54.0, ov=0.32, kw_text=0, nd=5),
}
T = {"texts": {}, "level": LEVEL, "band": {f"{k[0]}-{k[1]}": v for k, v in BAND.items()}}
for lv, cats in CAT.items():
    for c, nos in cats.items():
        for n in nos:
            T["texts"][f"{lv}-{n:02d}"] = {"level": lv, "cat": c}
assert len(T["texts"]) == 125, len(T["texts"])
json.dump(T, open("targets.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("targets.json:", len(T["texts"]), "Texte")
