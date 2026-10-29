#!/usr/bin/env python3
"""SODA Lernmethoden 빌드 스크립트.

src/*.txt(글 원고)를 읽어 한 장짜리 오프라인 페이지 lernmethoden/index.html 을 만든다.
실행: python3 lernmethoden/build.py   (저장소 어디에서 실행해도 됩니다)

원고 형식(src/<id>.txt)
  머리말: id / cat / no / date / title / sum  (줄마다 `키: 값`), 그 뒤 `---` 한 줄
  본문:   ## 큰 제목, ### 작은 제목, 일반 줄 = 문단 하나
          - 목록, 1. 번호 목록, > 강조 상자, de| 독일어 예문, |표|머리줄이 첫 줄
          ref| 참고문헌, link| 이름 | 설명 | 주소, tag| 근거 표시 | 문단
          **굵게**, *기울임*, [[글id|글 이름]] 다른 글로 가는 링크
"""
import html
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'src')
SHARED = os.path.join(SRC, 'shared')
OUT = os.path.join(HERE, 'index.html')

# (id, 독일어 이름, 한국어 이름, 설명)
CATS = [
    ('allgemein', 'Allgemeines', '일반', '공부 전반에 걸친 원리: 인출, 간격, 정체기, 마음가짐'),
    ('wortschatz', 'Wortschatz', '어휘', '단어를 얼마나, 어떻게 공부할 것인가'),
    ('grammatik', 'Grammatik', '문법', '문법책을 읽고 몸에 붙이는 방법'),
    ('lesen', 'Lesen', '읽기', '독해 습관과 수집하며 읽기'),
    ('hoeren', 'Hören', '듣기', '듣기 루틴과 듣기가 늘지 않는 이유'),
    ('sprechen', 'Sprechen', '말하기', '독일에 가지 않고 말하기 실력을 키우는 훈련'),
    ('schreiben', 'Schreiben', '쓰기', '연어, 연결어, 다시 쓰기, 문장의 첫머리'),
    ('sonder', 'Sonderthemen', '특별 주제', 'ADHD 학습자, 시험 직전 한 달'),
]


def read(path):
    with open(path, encoding='utf-8') as f:
        return f.read()


def esc(s):
    return html.escape(s, quote=True)


def inline(s):
    s = esc(s)
    s = re.sub(r'\[\[([a-z0-9-]+)\|([^\]]+)\]\]', r'<a class="xref" href="#a/\1">\2</a>', s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'(?<![*\w])\*([^*\s][^*]*?)\*(?![*\w])', r'<em>\1</em>', s)
    return s


def slug(s, used):
    base = re.sub(r'[^0-9A-Za-z가-힣]+', '-', s).strip('-').lower() or 'h'
    n, out = 1, base
    while out in used:
        n += 1
        out = '%s-%d' % (base, n)
    used.add(out)
    return out


def parse(path):
    text = read(path).replace('\r\n', '\n')
    head, _, body = text.partition('\n---\n')
    meta = {}
    for line in head.split('\n'):
        if ':' in line:
            k, v = line.split(':', 1)
            meta[k.strip()] = v.strip()
    for k in ('id', 'cat', 'no', 'date', 'title', 'sum'):
        if k not in meta:
            sys.exit('%s: 머리말에 %s 가 없습니다' % (path, k))
    meta['no'] = int(meta['no'])
    meta['body'] = body.strip('\n')
    return meta


def render_body(body, pfx):
    lines = body.split('\n')
    out, i, used = [], 0, set()

    def run(prefix):
        nonlocal i
        got = []
        while i < len(lines) and lines[i].startswith(prefix):
            got.append(lines[i][len(prefix):])
            i += 1
        return got

    while i < len(lines):
        ln = lines[i]
        if not ln.strip():
            i += 1
        elif ln.startswith('### '):
            t = ln[4:].strip()
            out.append('<h3 id="%s-%s">%s</h3>' % (pfx, slug(t, used), inline(t)))
            i += 1
        elif ln.startswith('## '):
            t = ln[3:].strip()
            out.append('<h2 id="%s-%s">%s</h2>' % (pfx, slug(t, used), inline(t)))
            i += 1
        elif ln.startswith('de|'):
            rows = [r.strip() for r in run('de|')]
            out.append('<div class="de" lang="de">%s</div>' % ''.join('<p>%s</p>' % inline(r) for r in rows))
        elif ln.startswith('ref|'):
            rows = [r.strip() for r in run('ref|')]
            out.append('<aside class="refs"><b>참고</b><ul>%s</ul></aside>' % ''.join('<li>%s</li>' % inline(r) for r in rows))
        elif ln.startswith('link|'):
            rows = [r.strip() for r in run('link|')]
            cards = []
            for r in rows:
                p = [x.strip() for x in r.split('|')]
                title, url = p[0], p[-1]
                desc = ' | '.join(p[1:-1])
                dom = re.sub(r'^https?://(www\.)?', '', url).rstrip('/')
                cards.append(
                    '<a class="lk" href="%s" target="_blank" rel="noopener noreferrer"><span class="lk-t">%s</span>'
                    '<span class="lk-d">%s</span><span class="lk-u">%s</span></a>' % (esc(url), inline(title), inline(desc), esc(dom)))
            out.append('<div class="links">%s</div>' % ''.join(cards))
        elif ln.startswith('tag|'):
            p = [x.strip() for x in ln[4:].split('|', 1)]
            i += 1
            out.append('<p class="tagp"><span class="tg">%s</span> %s</p>' % (esc(p[0]), inline(p[1] if len(p) > 1 else '')))
        elif ln.startswith('|'):
            rows = []
            while i < len(lines) and lines[i].startswith('|'):
                cells = [c.strip() for c in lines[i][1:].split('|')]
                if not all(re.fullmatch(r'-+:?', c) for c in cells if c):
                    rows.append(cells)
                i += 1
            n = max(len(r) for r in rows)
            th = ''.join('<th>%s</th>' % inline(c) for c in rows[0])
            tb = ''.join('<tr>%s</tr>' % ''.join('<td>%s</td>' % inline(c) for c in r) for r in rows[1:])
            out.append('<div class="tbl c%d"><table><thead><tr>%s</tr></thead><tbody>%s</tbody></table></div>' % (n, th, tb))
        elif ln.startswith('> '):
            rows = run('> ')
            out.append('<blockquote class="call">%s</blockquote>' % ''.join('<p>%s</p>' % inline(r) for r in rows))
        elif ln.startswith('- '):
            rows = run('- ')
            out.append('<ul>%s</ul>' % ''.join('<li>%s</li>' % inline(r) for r in rows))
        elif re.match(r'\d+\. ', ln):
            rows = []
            while i < len(lines) and re.match(r'\d+\. ', lines[i]):
                rows.append(re.sub(r'^\d+\. ', '', lines[i]))
                i += 1
            out.append('<ol>%s</ol>' % ''.join('<li>%s</li>' % inline(r) for r in rows))
        else:
            out.append('<p>%s</p>' % inline(ln.strip()))
            i += 1
    return '\n'.join(out)


def fmt_date(d):
    y, m, dd = d.split('-')
    return '%s.%s.%s' % (y, int(m), int(dd))


ARROW = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" '
         'stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>')
BACK = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" '
        'stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>')

CSS = r"""
:root{
  --accent:#384568;--accent-d:#2C3754;--accent-bg:#ECEDF3;
  --text:#1E1E1E;--text-s:#444;--text-m:#666;--text-l:#8A8A86;
  --bg:#FAFAF8;--bg-c:#FFFFFF;--bg-s:#F2F0EB;--bd:#E0E0DB;--bd-l:#ECEAE4;
  --f-sans:'SODA Latin','Pretendard Variable','Noto Sans KR',system-ui,-apple-system,'Apple SD Gothic Neo',sans-serif;
  --ease:cubic-bezier(.2,.7,.2,1);
}
html[data-theme="dark"]{--accent:#AEB9DD;--accent-d:#C8D0EA;--accent-bg:#232A3D;--text:#ECEAE4;--text-s:#C9CCD3;--text-m:#A9B0BA;--text-l:#7C8591;--bg:#14181E;--bg-c:#1B2028;--bg-s:#222831;--bd:#2A313B;--bd-l:#232A33}
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--f-sans);line-height:1.6;-webkit-font-smoothing:antialiased;min-height:100vh;min-height:100svh;overflow-x:hidden}
a{color:inherit;text-decoration:none;-webkit-tap-highlight-color:transparent}
img{display:block}
:focus-visible{outline:3px solid var(--accent);outline-offset:3px;border-radius:6px}
h1:focus{outline:none}
[hidden]{display:none!important}
@keyframes viewIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes fade{from{opacity:0}to{opacity:1}}
.view{animation:viewIn .45s var(--ease) both}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}}

/* 표지 */
.cover{min-height:100vh;min-height:100svh;display:flex;flex-direction:column;padding:clamp(24px,4vw,48px) clamp(24px,7vw,112px);padding-bottom:max(clamp(24px,3vw,36px),env(safe-area-inset-bottom))}
.brand{display:flex;align-items:center;gap:18px;animation:fade .9s .05s ease both}
.brand img{height:58px;width:auto}
.brand-t{display:flex;flex-direction:column;line-height:1.25}
.brand-t b{font-size:21px;font-weight:700;letter-spacing:.2px}
.brand-t span{font-size:15px;color:var(--text-m);font-weight:500}
.hero{flex:1;display:flex;flex-direction:column;justify-content:center;padding:clamp(48px,10vh,120px) 0}
.title{font-size:clamp(46px,13vw,150px);line-height:1.04;letter-spacing:-.045em;color:var(--accent);animation:rise 1s .15s var(--ease) both}
.title span{display:block}
.title .t1{font-weight:800}
.title .t2{font-weight:300;color:var(--text);letter-spacing:-.04em}
.sub{margin-top:clamp(18px,3vh,28px);max-width:30em;font-size:clamp(16px,1.6vw,19px);color:var(--text-s);word-break:keep-all;animation:rise 1s .28s var(--ease) both}
.cta{margin-top:clamp(36px,6vh,56px);align-self:flex-start;display:inline-flex;align-items:center;gap:14px;height:56px;padding:0 26px 0 30px;border-radius:10px;background:var(--accent);color:#fff;font-size:16px;font-weight:700;letter-spacing:.2px;transition:background .2s,gap .25s var(--ease);animation:rise 1s .4s var(--ease) both}
.cta svg{width:18px;height:18px}
.cta:hover{background:var(--accent-d);gap:20px}
html[data-theme="dark"] .cta{color:#14181E}
.cover-foot{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;padding-top:20px;border-top:1px solid var(--bd);font-size:12.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--text-m);font-weight:600;animation:fade 1s .6s ease both}

/* 공통 알약 */
.pill{display:inline-flex;align-items:center;gap:6px;height:36px;padding:0 14px 0 10px;border:1px solid var(--bd);border-radius:999px;background:var(--bg-c);font-size:13px;font-weight:600;color:var(--text-s);transition:border-color .15s,color .15s;white-space:nowrap}
.pill svg{width:14px;height:14px}
.pill:hover{border-color:var(--accent);color:var(--accent)}

/* 목차 */
.split{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:minmax(280px,.75fr) 1.7fr;gap:clamp(32px,5vw,72px);padding:clamp(20px,3.5vw,44px) clamp(16px,5vw,64px) 72px}
.side-l{position:sticky;top:0;align-self:start;display:flex;flex-direction:column;min-height:calc(100svh - 2*clamp(20px,3.5vw,44px));padding:4px 0 8px}
.side-l .pill{align-self:flex-start}
.side-main{flex:1;display:flex;flex-direction:column;justify-content:center;padding:32px 0}
.top-brand{display:flex;align-items:center;gap:14px;margin-bottom:clamp(24px,5vh,44px)}
.top-brand img{height:44px;width:auto;flex:none}
.top-brand b{font-size:16px;font-weight:700;letter-spacing:.2px;display:block;line-height:1.25}
.top-brand span{font-size:13px;color:var(--text-m);font-weight:500;display:block;line-height:1.3}
.big{font-size:clamp(34px,3.9vw,56px);line-height:1.04;letter-spacing:-.045em;color:var(--accent)}
.big span{display:block}
.big .t1{font-weight:800}
.big .t2{font-weight:300;color:var(--text);letter-spacing:-.04em}
.eyebrow{margin-top:clamp(24px,5vh,44px);font-size:12px;font-weight:800;letter-spacing:.22em;color:var(--text-m)}
.side-main>h2{font-size:clamp(22px,2.6vw,28px);font-weight:800;letter-spacing:-.02em;line-height:1.25;margin-top:4px}
.lead{margin-top:6px;color:var(--text-s);font-size:15.5px;word-break:keep-all}
.side-r{display:flex;flex-direction:column;gap:clamp(32px,4vw,48px)}
.cat-h{display:flex;align-items:baseline;flex-wrap:wrap;gap:6px 14px;margin-bottom:6px;padding-bottom:12px;border-bottom:1px solid var(--bd)}
.cat-h h2{font-size:clamp(20px,2.2vw,26px);font-weight:800;letter-spacing:-.025em;color:var(--accent)}
.cat-h .ko{font-size:14px;font-weight:700;color:var(--text-s)}
.cat-h .note{font-size:13.5px;color:var(--text-m);width:100%;word-break:keep-all}
.rows{list-style:none}
.row{display:flex;gap:16px;align-items:flex-start;padding:16px 4px;border-bottom:1px solid var(--bd-l);transition:background .15s}
.row:hover{background:var(--bg-s)}
.row .n{flex:none;width:30px;height:30px;border-radius:50%;background:var(--accent-bg);color:var(--accent);display:grid;place-items:center;font-size:13px;font-weight:800;margin-top:2px}
.row .tx{flex:1;min-width:0}
.row .rt{display:block;font-size:17px;font-weight:700;letter-spacing:-.01em;line-height:1.4;word-break:keep-all;color:var(--text)}
.row .rs{display:block;margin-top:3px;font-size:14px;color:var(--text-m);line-height:1.55;word-break:keep-all}
.row .rd{display:block;margin-top:6px;font-size:12px;color:var(--text-l);font-weight:600;letter-spacing:.04em}
.row .go{flex:none;align-self:center;width:30px;height:30px;color:var(--text-l);display:grid;place-items:center;transition:color .2s,transform .25s var(--ease)}
.row .go svg{width:16px;height:16px}
.row:hover .go{color:var(--accent);transform:translateX(3px)}
.foot{margin-top:8px;font-size:12.5px;letter-spacing:.04em;color:var(--text-m);line-height:1.7}

/* 글 */
.reader{max-width:760px;margin:0 auto;padding:68px clamp(18px,5vw,32px) 96px}
.reader .pill{margin-bottom:28px}
.a-eb{font-size:12px;font-weight:800;letter-spacing:.2em;color:var(--accent);text-transform:uppercase}
.a-eb i{font-style:normal;color:var(--text-l);margin:0 .5em;font-weight:600}
.reader h1{margin-top:10px;font-size:clamp(27px,5vw,38px);line-height:1.3;letter-spacing:-.03em;font-weight:800;word-break:keep-all;color:var(--text)}
.a-sum{margin-top:14px;font-size:17px;line-height:1.65;color:var(--text-s);word-break:keep-all}
.a-meta{margin-top:16px;padding-bottom:22px;border-bottom:1px solid var(--bd);font-size:13px;color:var(--text-m);font-weight:600}
.body{margin-top:28px;font-size:17px;line-height:1.9;color:var(--text);word-break:keep-all;overflow-wrap:anywhere}
.body>*+*{margin-top:1.05em}
.body h2{margin-top:2.3em;font-size:clamp(21px,3.4vw,25px);line-height:1.4;font-weight:800;letter-spacing:-.025em;color:var(--accent);scroll-margin-top:72px}
.body h3{margin-top:1.8em;font-size:19px;line-height:1.45;font-weight:800;letter-spacing:-.015em;color:var(--text);scroll-margin-top:72px}
.body h2+*,.body h3+*{margin-top:.7em}
.body strong{font-weight:800;color:var(--text)}
.body em{font-style:normal;font-weight:700;color:var(--accent)}
.body a.xref{color:var(--accent);font-weight:700;text-decoration:underline;text-underline-offset:3px;text-decoration-color:var(--bd)}
.body a.xref:hover{text-decoration-color:var(--accent)}
.body ul,.body ol{padding-left:1.35em}
.body li+li{margin-top:.5em}
.body li::marker{color:var(--accent);font-weight:700}
.de{padding:14px 18px;border-left:3px solid var(--accent);background:var(--bg-s);border-radius:0 12px 12px 0;font-size:17.5px;line-height:1.75;word-break:normal;overflow-wrap:anywhere}
.de p+p{margin-top:.35em}
.call{padding:18px 20px;background:var(--accent-bg);border-radius:14px;color:var(--text);line-height:1.8}
.call p+p{margin-top:.6em}
.tagp{padding-top:.2em}
.tg{display:inline-block;vertical-align:1px;margin-right:6px;padding:1px 10px;border-radius:999px;background:var(--accent-bg);color:var(--accent);font-size:12.5px;font-weight:800;letter-spacing:.01em;line-height:1.7;white-space:nowrap}
.tbl{overflow-x:auto;border:1px solid var(--bd);border-radius:14px;background:var(--bg-c);-webkit-overflow-scrolling:touch}
.tbl table{width:100%;border-collapse:collapse;font-size:15.5px;line-height:1.6}
.tbl th{background:var(--bg-s);text-align:left;font-weight:800;color:var(--text);font-size:14px}
.tbl th,.tbl td{padding:10px 14px;border-bottom:1px solid var(--bd-l);vertical-align:top;word-break:keep-all;overflow-wrap:anywhere}
.tbl tr:last-child td{border-bottom:0}
.tbl.c3 table,.tbl.c4 table,.tbl.c5 table{min-width:520px}
.links{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px}
.lk{display:flex;flex-direction:column;gap:4px;padding:14px 16px;border:1px solid var(--bd);border-radius:14px;background:var(--bg-c);transition:border-color .2s,transform .25s var(--ease)}
.lk:hover{border-color:var(--accent);transform:translateY(-2px)}
.lk-t{font-size:15.5px;font-weight:800;color:var(--accent);line-height:1.4}
.lk-d{font-size:13.5px;color:var(--text-s);line-height:1.55;word-break:keep-all}
.lk-u{margin-top:2px;font-size:12px;color:var(--text-l);font-weight:600;overflow-wrap:anywhere}
.refs{padding:14px 16px;border-top:1px solid var(--bd);font-size:13.5px;line-height:1.65;color:var(--text-m)}
.refs b{display:block;font-size:11.5px;letter-spacing:.2em;font-weight:800;margin-bottom:4px}
.refs ul{list-style:none;padding:0}
.refs li+li{margin-top:.4em}
.pn{margin-top:56px;display:grid;grid-template-columns:1fr 1fr;gap:12px}
.pn a{display:flex;flex-direction:column;gap:4px;padding:16px 18px;border:1px solid var(--bd);border-radius:16px;background:var(--bg-c);transition:border-color .2s,transform .25s var(--ease)}
.pn a:hover{border-color:var(--accent);transform:translateY(-2px)}
.pn small{font-size:12px;font-weight:800;letter-spacing:.08em;color:var(--text-m)}
.pn b{font-size:15.5px;line-height:1.45;font-weight:700;color:var(--accent);word-break:keep-all}
.pn .nx{text-align:right;grid-column:2}
.pn .pv:only-child{grid-column:1}
.a-end{margin-top:28px;text-align:center}
.a-note{margin-top:36px;font-size:12.5px;color:var(--text-l);text-align:center;line-height:1.7}

@media (max-width:900px){
  .split{grid-template-columns:1fr;gap:20px;padding-top:68px}
  .side-l{position:static;min-height:0}
  .side-main{padding:12px 0 0}
  .top-brand{margin-bottom:20px}
  .eyebrow{margin-top:24px}
}
@media (max-width:560px){
  .brand img{height:48px}
  .brand-t b{font-size:18px}
  .body{font-size:16.5px;line-height:1.85}
  .pn{grid-template-columns:1fr}
  .pn .nx{grid-column:1}
  .row{gap:12px}
  .row .go{display:none}
}
@media print{.cover,.pill,.pn,.cta{display:none!important}.reader{padding:0}}
"""

JS = r"""
(function(){
  var views={cover:document.getElementById('cover'),toc:document.getElementById('inhalt')};
  var arts=Array.prototype.slice.call(document.querySelectorAll('.article'));
  var T0='SODA Lernmethoden · Sophia Deutsch Akademie';
  function show(el){
    views.cover.hidden=el!==views.cover; views.toc.hidden=el!==views.toc;
    arts.forEach(function(a){a.hidden=a!==el;});
  }
  function route(moved){
    var h=location.hash, el=views.cover, t=T0;
    if(h==='#inhalt'){el=views.toc;t='독일어 공부법 목차 · SODA Lernmethoden';}
    else if(h.indexOf('#a/')===0){
      var a=document.getElementById('a-'+h.slice(3));
      if(a){el=a;t=a.getAttribute('data-title')+' · SODA Lernmethoden';}
    }
    show(el); document.title=t;
    window.scrollTo(0,0);
    if(moved){var f=el.querySelector('h1'); if(f){try{f.focus({preventScroll:true});}catch(e){f.focus();}}}
  }
  window.addEventListener('hashchange',function(){route(true);});
  route(false);
})();
"""


def build():
    arts = {}
    for fn in sorted(os.listdir(SRC)):
        if fn.endswith('.txt'):
            m = parse(os.path.join(SRC, fn))
            if m['id'] + '.txt' != fn:
                sys.exit('%s: id(%s)가 파일 이름과 다릅니다' % (fn, m['id']))
            arts[m['id']] = m
    catids = [c[0] for c in CATS]
    for m in arts.values():
        if m['cat'] not in catids:
            sys.exit('%s: 알 수 없는 분류 %s' % (m['id'], m['cat']))
    series = {c: sorted([a for a in arts.values() if a['cat'] == c], key=lambda a: a['no']) for c in catids}
    for c, lst in series.items():
        if not lst:
            sys.exit('분류 %s 에 글이 없습니다' % c)
    # 링크 검사
    for m in arts.values():
        for ref in re.findall(r'\[\[([a-z0-9-]+)\|', m['body']):
            if ref not in arts:
                sys.exit('%s: 없는 글 [[%s]] 을 가리킵니다' % (m['id'], ref))

    total = len(arts)
    catname = {c[0]: c for c in CATS}

    # 목차
    toc = []
    for cid, de, ko, note in CATS:
        rows = []
        for a in series[cid]:
            rows.append(
                '<li><a class="row" href="#a/%s"><span class="n">%d</span><span class="tx">'
                '<span class="rt">%s</span><span class="rs">%s</span><span class="rd">%s</span></span>'
                '<span class="go" aria-hidden="true">%s</span></a></li>'
                % (a['id'], a['no'], esc(a['title']), esc(a['sum']), fmt_date(a['date']), ARROW))
        toc.append(
            '<section class="cat" aria-labelledby="cat-%s"><header class="cat-h"><h2 id="cat-%s">%s</h2>'
            '<span class="ko">%s</span><span class="note">%s</span></header><ul class="rows">%s</ul></section>'
            % (cid, cid, de, ko, esc(note), ''.join(rows)))

    # 글
    pages = []
    for cid in catids:
        lst = series[cid]
        de, ko = catname[cid][1], catname[cid][2]
        for idx, a in enumerate(lst):
            body = render_body(a['body'], a['id'])
            chars = len(re.sub(r'\s+', '', a['body']))
            mins = max(1, round(chars / 500))
            pn = []
            if idx > 0:
                p = lst[idx - 1]
                pn.append('<a class="pv" href="#a/%s"><small>← 이전 글</small><b>%s</b></a>' % (p['id'], esc(p['title'])))
            if idx < len(lst) - 1:
                n = lst[idx + 1]
                pn.append('<a class="nx" href="#a/%s"><small>다음 글 →</small><b>%s</b></a>' % (n['id'], esc(n['title'])))
            pn_html = '<nav class="pn" aria-label="같은 분류의 글">%s</nav>' % ''.join(pn) if pn else ''
            pages.append(
                '<article id="a-%s" class="article reader view" data-title="%s" hidden>'
                '<a class="pill" href="#inhalt">%s공부법 목록</a>'
                '<p class="a-eb">%s<i>·</i>%s %d/%d</p>'
                '<h1 tabindex="-1">%s</h1><p class="a-sum">%s</p>'
                '<p class="a-meta">%s · 약 %d분</p>'
                '<div class="body">%s</div>%s'
                '<p class="a-end"><a class="pill" href="#inhalt">%s공부법 목록</a></p>'
                '<p class="a-note">소피아 독일어학원 · 독일어 공부법</p></article>'
                % (a['id'], esc(a['title']), BACK, de, ko, idx + 1, len(lst), esc(a['title']), esc(a['sum']),
                   fmt_date(a['date']), mins, body, pn_html, BACK))

    theme = read(os.path.join(SHARED, 'theme.html'))
    chrome = read(os.path.join(SHARED, 'chrome.css'))
    a2hs = read(os.path.join(SHARED, 'a2hs.html'))
    fonts = read(os.path.join(SHARED, 'fonts.css'))

    doc = """<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
%(theme)s<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#14181E">
<meta name="color-scheme" content="dark">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Lernmethoden">
<meta name="description" content="Sophia Deutsch Akademie의 독일어 공부법. 어휘, 문법, 읽기, 듣기, 말하기, 쓰기와 시험 직전 한 달까지, 연구를 근거로 정리한 글 %(total)d편.">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" href="icons/icon-192.png">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<title>SODA Lernmethoden · Sophia Deutsch Akademie</title>
<link rel="stylesheet" href="../assets/pretendard.css">
<style>
/* SODA Latin: 움라우트 포함 라틴 문자를 한 글꼴(Inter Display)로 통일 */
%(fonts)s%(css)s
</style>
<style id="soda-dark">
%(chrome)s</style>
<script id="soda-analytics" data-goatcounter="https://sodadeutsch.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
</head>
<body>
<main id="cover" class="cover view">
  <div class="brand">
    <img src="../assets/logo.png" alt="">
    <div class="brand-t"><b>Sophia Deutsch Akademie</b><span>소피아 독일어학원</span></div>
  </div>
  <div class="hero">
    <h1 class="title" tabindex="-1"><span class="t1">SODA</span><span class="t2">Lernmethoden</span></h1>
    <p class="sub">독일어 공부법. 연구가 확인한 것과 수업에서 본 것을 구분해서 정리했습니다.</p>
    <a class="cta" href="#inhalt">목차 보기
      %(arrow)s
    </a>
  </div>
  <div class="cover-foot"><span>Innovative learning beyond the traditional</span><span>%(ncat)d Themen · %(total)d Beiträge</span></div>
</main>

<section id="inhalt" class="view" aria-label="목차" hidden>
  <div class="split">
    <aside class="side-l">
      <a class="pill" href="#">%(back)s표지</a>
      <div class="side-main">
        <div class="top-brand">
          <img src="../assets/logo.png" alt="">
          <div><b>Sophia Deutsch Akademie</b><span>소피아 독일어학원</span></div>
        </div>
        <h1 class="big" tabindex="-1"><span class="t1">SODA</span><span class="t2">Lernmethoden</span></h1>
        <p class="eyebrow">INHALT</p>
        <h2>독일어 공부법</h2>
        <p class="lead">읽고 싶은 글을 고르세요. 분류마다 글이 번호 순서로 이어집니다.</p>
      </div>
    </aside>
    <div class="side-r">
%(toc)s
      <p class="foot">글마다 근거를 밝혔습니다. 연구로 확인된 것, 수업에서 관찰한 것, 제 해석을 섞지 않으려고 했습니다.</p>
    </div>
  </div>
</section>

%(pages)s

<script>%(js)s</script>
%(a2hs)s</body>
</html>
""" % dict(theme=theme, fonts=fonts, css=CSS, chrome=chrome, total=total, ncat=len(CATS), arrow=ARROW,
           back=BACK, toc='\n'.join(toc), pages='\n'.join(pages), js=JS, a2hs=a2hs)
    with open(OUT, 'w', encoding='utf-8') as f:
        f.write(doc)
    print('wrote %s (%d bytes, %d articles)' % (OUT, len(doc.encode('utf-8')), total))


if __name__ == '__main__':
    build()
