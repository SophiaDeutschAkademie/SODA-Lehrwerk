"""dm.py – Schwierigkeitskennzahlen für deutsche Prüfungstexte (Sophia Deutsch Akademie).
Text: Umfang, LIX, Flesch-Amstad, Wiener Sachtextformel, Satzlänge, Silben, Wortfrequenz, MTLD, Nebensätze, Nominalstil, Passiv, Konjunktiv.
Aufgaben: Paraphrase-Grad (Wortstamm-Überlappung Lösung/Distraktoren mit dem Text), Stichwort-Lösbarkeit, Längen-Hinweis."""
import re, math, os, json, glob, statistics as st
HERE=os.path.dirname(os.path.abspath(__file__))
FREQ=os.environ.get("DM_FREQ", os.path.join(HERE,"de_50k.txt"))
RANK={}
for i,line in enumerate(open(FREQ,encoding="utf-8")):
    w=line.split()[0].lower()
    RANK.setdefault(w,i+1)
W=r"[A-Za-zÄÖÜäöüß]+(?:-[A-Za-zÄÖÜäöüß]+)*"
ABBR=r"\b(z\.\s?B|d\.\s?h|u\.\s?a|o\.\s?ä|s\.\s?o|u\.\s?U|z|bzw|ca|evtl|ggf|Dr|Prof|Nr|Str|usw|etc|inkl|vgl|bspw|Tel|St|Mio|Mrd|Jh|Hr|Fr|Abb|Kap|ff|v\.\s?a|ehem|max|min|Std|Min|sog|zzgl|zB)\."
MON="Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember|Jahrhunderts?|Jahrtausends?|Lebensjahr|Stock|Platz|Klasse|Semester|Auflage|Mal"
SPK=re.compile(r"^(?:[A-ZÄÖÜ][\wäöüß.\-]*(?: [A-ZÄÖÜ][\wäöüß.\-]*){0,3}|Sprecher(?:in)? ?\d*|Moderator(?:in)?|Interviewer(?:in)?|Frau \w+|Herr \w+|[A-Z])\s*:\s+",re.M)
def strip_speakers(t): return SPK.sub("",t)
def words(t): return re.findall(W,t)
def protect(t):
    t=re.sub(ABBR,lambda m:m.group(0).replace(".","·"),t)
    t=re.sub(r"(\d)\.(?=\s+(?:"+MON+r"|[a-zäöüß]))",r"\1·",t)          # 4. November, 3. Stock
    t=re.sub(r"(\d)\.(\d)",r"\1·\2",t)                                     # 8.30, 1.000
    t=re.sub(r"\b([A-ZÄÖÜ])\.(?=\s)",r"\1·",t)                             # Herr K.
    return t
def sentences(t):
    t=protect(t)
    parts=re.split(r"(?<=[.!?:…])[\"“”‘’»«)\]]*\s+|\n\s*\n|\n",t)
    return [p for p in parts if words(p)]
VOW=re.compile(r"(ie|ei|ai|au|eu|äu|ee|aa|oo|[aeiouyäöü])",re.I)
def syll(w):
    w=w.lower()
    n=len(re.findall(r"äu|eu|ei|ai|au|ie|aa|ee|oo|[aeiouyäöü]",w))
    return max(1,n)
SUBORD=r"\b(dass|weil|obwohl|obgleich|wenn|falls|ob|damit|während|nachdem|bevor|ehe|seitdem|seit|sodass|indem|solange|sobald|wobei|wodurch|wofür|womit|worüber|worauf|wohingegen|sofern|soweit|als ob)\b"
REL=r",\s+(?:\w+\s+)?(der|die|das|dem|den|deren|dessen|denen|welche[mnrs]?|wo|was)\s"
PART=r"(ge[a-zäöüß]{2,}(?:t|en)|[a-zäöüß]{3,}iert|(?:be|ver|er|ent|zer|über|unter|ge)[a-zäöüß]{2,}t)"
def passive(t):
    n=0
    for s in sentences(t):
        ws=[w.lower() for w in words(s)]
        n+=sum(1 for i,w in enumerate(ws) if w=="worden")
        for i,w in enumerate(ws):
            if w in ("wird","werden","wurde","wurden","wirst","werdet") and any(re.fullmatch(PART,x) for x in ws[i+1:i+12]) and "worden" not in ws:
                n+=1; break
    return n
KONJ=r"\b(würde[nst]*|hätte[nst]*|wäre[nst]*|könnte[nst]*|müsste[nst]*|sollte[nst]*|dürfte[nst]*|möchte[nst]*|sei|seien|habe(?=\s+\w+\s+\w*t\b)|ginge|käme|gäbe|bliebe)\b"
NOM=re.compile(r"^[A-ZÄÖÜ][a-zäöüß]+(ung|heit|keit|ität|ion|nis|schaft|tum|ismus|enz|anz)(en|se|e|s)?$")
def mtld_pass(ws,thr=0.72):
    f=0; types=set(); n=0
    for w in ws:
        n+=1; types.add(w)
        if len(types)/n<=thr: f+=1; types=set(); n=0
    if n>0: f+= (1-len(types)/n)/(1-thr) if len(types)/n<1 else 0
    return len(ws)/f if f>0 else float("nan")
def mtld(ws):
    ws=[w.lower() for w in ws]
    if len(ws)<50: return float("nan")
    return (mtld_pass(ws)+mtld_pass(ws[::-1]))/2
def text_stats(t):
    ws=words(t); n=len(ws); ss=sentences(t)
    if n==0: return None
    S=max(1,len(ss)); asl=n/S
    sy=[syll(w) for w in ws]; asw=sum(sy)/n
    long_=sum(len(w)>6 for w in ws)/n*100
    ms=sum(x>=3 for x in sy)/n*100; es=sum(x==1 for x in sy)/n*100
    r=lambda k: sum(RANK.get(w.lower(),10**6)>k for w in ws)/n*100
    sub=len(re.findall(SUBORD,t,flags=re.I))+len(re.findall(REL,t))
    return {"Wörter":n,"Sätze":S,"ASL":asl,"lange%":long_,"LIX":asl+long_,
            "FRE":180-asl-58.5*asw,"WSTF":0.1935*ms+0.1672*asl+0.1297*long_-0.0327*es-0.875,
            "Silben/W":asw,"Zeichen/W":sum(len(w) for w in ws)/n,
            "jenseits2k%":r(2000),"jenseits5k%":r(5000),"jenseits10k%":r(10000),
            "MTLD":mtld(ws),"NS/Satz":sub/S,"Nominal%":sum(bool(NOM.match(w)) for w in ws)/n*100,
            "Passiv/100":passive(t)/n*100,"Konj/100":len(re.findall(KONJ,t))/n*100,
            "Sätze>25%":sum(len(words(s))>25 for s in ss)/S*100}
STOP=set("""der die das den dem des ein eine einen einem einer eines und oder aber auch noch nur schon sehr mehr nicht kein keine keinen keinem keiner ist sind war waren wird werden wurde wurden hat haben hatte hatten sein seine seinen seiner ihr ihre ihren ihrem ihrer ich du er sie es wir man sich mit von zu zum zur bei für auf aus an in im am um über unter nach vor wie was wer wenn dass als so da dann doch denn ob weil bis seit durch gegen ohne sowie dieser diese dieses diesen diesem jeder jede jedes alle allem allen kann können konnte konnten muss müssen musste soll sollen sollte will wollen wollte darf dürfen möchte möchten viele vielen einige etwa immer hier dort heute wieder ganz gibt geht gut neue neuen neuer damit dabei daher dafür darauf davon dazu""".split())
def stems(t): return {w.lower()[:6] for w in words(t) if len(w)>=4 and w.lower() not in STOP}
def overlap(a,b):
    sa=stems(a); return len(sa&stems(b))/len(sa) if sa else None
def item_stats(items,text):
    """items: [{stem, options|None, answer}]; liefert Paraphrase-Kennzahlen."""
    ok=[];dis=[];kw=0;mc=0;longest=0;rf_r=[];rf_f=[]
    for it in items:
        o=it.get("options"); a=it.get("answer")
        if o and a in o:
            mc+=1
            ov={k:overlap(v,text) for k,v in o.items()}
            ov={k:v for k,v in ov.items() if v is not None}
            if a in ov:
                ok.append(ov[a]); dis+= [v for k,v in ov.items() if k!=a]
                if ov[a]==max(ov.values()) and list(ov.values()).count(ov[a])==1: kw+=1
            L={k:len(v) for k,v in o.items()}
            if L[a]==max(L.values()): longest+=1
        elif a in ("R","F","r","f","+","-","richtig","falsch","ja","nein","Ja","Nein") and it.get("stem"):
            v=overlap(it["stem"],text)
            if v is not None: (rf_r if a in ("R","r","+","richtig","ja","Ja") else rf_f).append(v)
    m=lambda x: sum(x)/len(x) if x else None
    return {"MC":mc,"Lösung-Überlappung":m(ok),"Distraktor-Überlappung":m(dis),"Stichwort-lösbar%":(kw/mc*100 if mc else None),
            "Lösung=längste%":(longest/mc*100 if mc else None),"R-Aussage-Überlappung":m(rf_r),"F-Aussage-Überlappung":m(rf_f)}
