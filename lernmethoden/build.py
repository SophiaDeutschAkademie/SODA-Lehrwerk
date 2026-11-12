#!/usr/bin/env python3
"""SODA Lernmethoden 빌드 스크립트.

src/*.txt(글 원고)를 읽어 한 장짜리 오프라인 페이지 lernmethoden/index.html 을 만든다.
실행: python3 lernmethoden/build.py   (저장소 어디에서 실행해도 됩니다)
만드는 것: lernmethoden/index.html(앱), lernmethoden/a/<id>.html(글마다 검색용 페이지)와 a/article.css.
끝나면 tools/seo.py 를 불러 페이지 머리의 검색용 태그와 sitemap.xml 을 다시 맞춥니다.

원고 형식(src/<id>.txt)
  머리말: id / cat / no / date / title / sum  (줄마다 `키: 값`), 그 뒤 `---` 한 줄
          id  = 글의 주소(#a/<id>, a/<id>.html)이자 파일 이름. 한번 정하면 바꾸지 않는다.
          cat = 글이 들어갈 분류(CATS 의 id), no = 그 분류 안의 번호(1부터 빠짐없이).
          글을 다른 분류로 옮길 때는 cat 과 no 만 고친다. 그래서 id 앞부분이 분류와 다를 수 있다
          (시험 분류의 sonder-2, sonder-7, sonder-8 은 특별 주제에서 옮긴 글).
  본문:   ## 큰 제목, ### 작은 제목, 일반 줄 = 문단 하나
          - 목록, 1. 번호 목록, > 강조 상자, de| 독일어 예문, |표|머리줄이 첫 줄
          ref| 참고문헌, link| 이름 | 설명 | 주소, tag| 근거 표시 | 문단
          **굵게**, *기울임*, [[글id|글 이름]] 다른 글로 가는 링크
          {{독일어}} 표 안의 독일어 예문: 한 줄로 유지, 앞에 글이 있으면 다음 줄에 표시
          {♪폴더/파일} 소리 버튼(audio/폴더/파일.mp3), {♪폴더/파일|이름} 이름이 붙은 소리 버튼
          snd| 소리 버튼만 모은 줄
"""
import html
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'src')
SHARED = os.path.join(SRC, 'shared')
OUT = os.path.join(HERE, 'index.html')
# 글마다 따로 만드는 검색용 페이지(lernmethoden/a/<id>.html)와 그 공통 스타일
ADIR = os.path.join(HERE, 'a')
SITE = 'https://sophiadeutschakademie.github.io/SODA-Lehrwerk/'

# (id, 독일어 이름, 한국어 이름, 설명)
CATS = [
    ('allgemein', 'Allgemeines', '일반', '공부 전반에 걸친 원리: 인출, 간격, 정체기, 마음가짐'),
    ('lernplanung', 'Lernplanung', '학습 계획', '필요한 시간을 계산하고, 쉬었다가 다시 시작하는 법'),
    ('wortschatz', 'Wortschatz', '어휘', '단어를 얼마나, 어떻게 공부할 것인가'),
    ('grammatik', 'Grammatik', '문법', '문법책을 읽고 몸에 붙이는 방법'),
    ('lesen', 'Lesen', '읽기', '독해 습관과 수집하며 읽기'),
    ('hoeren', 'Hören', '듣기', '듣기 루틴과 듣기가 늘지 않는 이유'),
    ('sprechen', 'Sprechen', '말하기', '독일에 가지 않고 말하기 실력을 키우는 훈련'),
    ('schreiben', 'Schreiben', '쓰기', '연어, 연결어, 다시 쓰기, 문장의 첫머리'),
    ('pruefungen', 'Prüfungen', '시험', '시험 직전 한 달, 말하기 시험의 파트너, telc와 Goethe 고르기'),
    ('sonder', 'Sonderthemen', '특별 주제', 'ADHD 학습자, 나이와 외국어 학습, AI로 공부하기, 절대음감, 과제 미루기'),
]


def read(path):
    with open(path, encoding='utf-8') as f:
        return f.read()


SND_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg>'


def esc(s):
    return html.escape(s, quote=True)


def inline(s):
    s = esc(s)
    s = re.sub(r'\[\[([a-z0-9-]+)\|([^\]]+)\]\]', r'<a class="xref" href="#a/\1">\2</a>', s)
    s = re.sub(r'\{\{(.+?)\}\}', r'<span class="de-i" lang="de">\1</span>', s)
    s = re.sub(r'\{♪([a-z0-9/-]+)\|([^}]+)\}', lambda m: '<button type="button" class="snd lbl" data-snd="audio/%s.mp3">%s<span>%s</span></button>' % (m.group(1), SND_ICON, m.group(2)), s)
    s = re.sub(r'\{♪([a-z0-9/-]+)\}', lambda m: '<button type="button" class="snd" data-snd="audio/%s.mp3" aria-label="듣기">%s</button>' % (m.group(1), SND_ICON), s)
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
            vis = lambda c: re.sub(r'\s*\{♪[^}]*\}', '', c).strip()
            tb = ''.join('<tr>%s</tr>' % ''.join(('<td class="nw">%s</td>' if 0 < len(vis(c)) <= 3 else '<td>%s</td>') % inline(c) for c in r) for r in rows[1:])
            fit = ' fit' if max(len(vis(c)) + (2 if '{♪' in c else 0) for r in rows for c in r) <= 18 else ''
            out.append('<div class="tbl c%d%s"><table><thead><tr>%s</tr></thead><tbody>%s</tbody></table></div>' % (n, fit, th, tb))
        elif ln.startswith('snd|'):
            out.append('<p class="snd-row">%s</p>' % inline(ln[4:].strip()))
            i += 1
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
CHEV = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" '
        'stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>')

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
/* 분류는 닫힌 상태로 두고, 누르면 글 목록이 아래에 열린다 */
.side-r{display:flex;flex-direction:column}
.cat{border-bottom:1px solid var(--bd)}
.cat-hd{font:inherit}
.cat-h{position:relative;display:flex;align-items:baseline;flex-wrap:wrap;gap:4px 14px;width:100%;padding:18px 52px 18px 4px;border:0;background:none;color:inherit;font:inherit;text-align:left;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:background .15s}
.cat-h .cat-n{font-size:clamp(20px,2.2vw,26px);line-height:1.3;font-weight:800;letter-spacing:-.025em;color:var(--accent)}
.cat-h .ko{font-size:14px;font-weight:700;color:var(--text-s)}
.cat-h .cnt{font-size:12.5px;font-weight:700;color:var(--text-l);letter-spacing:.02em}
.cat-h .note{font-size:13.5px;line-height:1.55;color:var(--text-m);width:100%;word-break:keep-all}
.cat-h .chev{position:absolute;right:6px;top:50%;width:30px;height:30px;margin-top:-15px;display:grid;place-items:center;color:var(--text-l);transition:transform .3s var(--ease),color .2s}
.cat-h .chev svg{width:16px;height:16px}
.cat.open .chev{color:var(--accent);transform:rotate(180deg)}
@media (hover:hover){.cat-h:hover{background:var(--bg-s)}.cat-h:hover .chev{color:var(--accent)}}
.rows{list-style:none}
.cat.open .rows{padding-bottom:12px;border-top:1px solid var(--bd-l);animation:viewIn .35s var(--ease) both}
.rows li:last-child .row{border-bottom:0}
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
.foot{margin-top:28px;font-size:12.5px;letter-spacing:.04em;color:var(--text-m);line-height:1.7}

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
.tbl.fit table{min-width:0}
.tbl td.nw{white-space:nowrap}
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
/* 양쪽 정렬: 본문·요약·설명 글. 제목과 표 머리줄은 왼쪽 정렬 유지 */
.sub,.lead,.cat-h .note,.row .rs,.a-sum,.body,.lk-d,.refs li{text-align:justify}
.body h2,.body h3,.tbl th,.tbl td{text-align:left}
.de-i{white-space:nowrap}
.tbl td>:not(:first-child).de-i{display:block;margin-top:3px}
.de{-webkit-hyphens:auto;hyphens:auto}
.snd{display:inline-flex;align-items:center;justify-content:center;gap:6px;width:28px;height:28px;margin:0 0 0 6px;padding:0;border:1px solid var(--bd);border-radius:999px;background:var(--accent-bg);color:var(--accent);vertical-align:-7px;cursor:pointer;font:inherit;-webkit-tap-highlight-color:transparent}
.snd svg{width:13px;height:13px;fill:currentColor;margin-left:2px}
.snd:hover{border-color:var(--accent)}
.snd.on{background:var(--accent);color:var(--bg);border-color:var(--accent)}
.snd.lbl{width:auto;height:34px;padding:0 14px 0 11px;margin:0;font-size:14px;font-weight:700;vertical-align:middle}
.snd-row{display:flex;flex-wrap:wrap;gap:8px;text-align:left!important}
.tbl td .snd{vertical-align:middle;margin-top:-4px}
.de .snd{vertical-align:middle;margin-top:-4px}

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
  var T0='독일어 공부법 · SODA Lernmethoden | 소피아 독일어학원';
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
  // 목차의 분류: 누르면 글 목록을 열고, 다시 누르면 닫는다
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('.cat-h'); if(!b)return;
    var on=b.getAttribute('aria-expanded')!=='true';
    var ul=document.getElementById(b.getAttribute('aria-controls'));
    var sec=b.closest('.cat');
    b.setAttribute('aria-expanded',on?'true':'false');
    if(ul)ul.hidden=!on;
    if(sec){if(on)sec.classList.add('open');else sec.classList.remove('open');}
  });
  var au=null, cur=null;
  function stop(){if(au){au.pause();au=null;} if(cur){cur.classList.remove('on');cur=null;}}
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('.snd'); if(!b)return;
    var same=b===cur; stop(); if(same)return;
    au=new Audio(b.getAttribute('data-snd')); cur=b; b.classList.add('on');
    au.addEventListener('ended',stop); au.addEventListener('error',stop);
    var pr=au.play(); if(pr&&pr.catch)pr.catch(stop);
  });
  window.addEventListener('hashchange',stop);
  window.addEventListener('hashchange',function(){route(true);});
  route(false);
})();
"""


STATIC_JS = r"""
(function(){
  var au=null, cur=null;
  function stop(){if(au){au.pause();au=null;} if(cur){cur.classList.remove('on');cur=null;}}
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('.snd'); if(!b)return;
    var same=b===cur; stop(); if(same)return;
    au=new Audio(b.getAttribute('data-snd')); cur=b; b.classList.add('on');
    au.addEventListener('ended',stop); au.addEventListener('error',stop);
    var pr=au.play(); if(pr&&pr.catch)pr.catch(stop);
  });
})();
"""

STATIC_CSS = r"""
/* 글 페이지(lernmethoden/a/*.html) 전용 */
.reader .crumbs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px}
.reader .crumbs .pill{margin-bottom:0}
.more{margin-top:48px;padding:22px 22px 20px;border:1px solid var(--bd);border-radius:16px;background:var(--bg-c)}
.more b{display:block;font-size:12px;font-weight:800;letter-spacing:.2em;color:var(--text-m);text-transform:uppercase}
.more p{margin-top:8px;font-size:15.5px;line-height:1.7;color:var(--text-s);word-break:keep-all;text-align:justify}
.more ul{list-style:none;margin-top:12px;display:flex;flex-wrap:wrap;gap:8px}
.more a{display:inline-flex;align-items:center;height:36px;padding:0 14px;border:1px solid var(--bd);border-radius:999px;font-size:13.5px;font-weight:700;color:var(--accent);transition:border-color .15s}
.more a:hover{border-color:var(--accent)}
"""

# 글 페이지 아래 「다른 무료 학습 자료」에 보여 줄 앱 (폴더, 이름)
MORE_APPS = [
    ('grammatik/', '문법 교재'), ('lesetraining/', '독해 훈련'), ('hoertraining/', '듣기 훈련'),
    ('schreibtraining/', '쓰기 훈련'), ('sprechtraining/', '말하기 훈련'), ('vokalab/', '단어장 A1–C1'),
]


def static_pages(series, catname, theme, chrome, fonts):
    """글마다 본문이 HTML에 그대로 들어 있는 페이지를 만든다. 검색엔진이 글 하나하나를 따로 찾게 하려는 것."""
    os.makedirs(ADIR, exist_ok=True)
    css = fonts + CSS + STATIC_CSS + chrome
    with open(os.path.join(ADIR, 'article.css'), 'w', encoding='utf-8') as f:
        f.write(css)
    import hashlib
    cv = hashlib.md5(css.encode('utf-8')).hexdigest()[:10]
    # 글 페이지는 lernmethoden/a/ 안에 있으므로 집 버튼은 두 단계 위 목차로 간다
    th = theme.replace("a.href='../#inhalt'", "a.href='../../#inhalt'")
    keep = set()
    for cid, lst in series.items():
        de, ko = catname[cid][1], catname[cid][2]
        for idx, a in enumerate(lst):
            body = render_body(a['body'], a['id'])
            body = re.sub(r'href="#a/([a-z0-9-]+)"', r'href="\1.html"', body)
            body = body.replace('data-snd="audio/', 'data-snd="../audio/')
            # 본문의 link| 가 가리키는 다른 앱(../vokalab/ 등)은 글 페이지에서 한 단계 더 위에 있다
            body = body.replace('<a class="lk" href="../', '<a class="lk" href="../../')
            chars = len(re.sub(r'\s+', '', a['body']))
            mins = max(1, round(chars / 500))
            pn = []
            if idx > 0:
                p = lst[idx - 1]
                pn.append('<a class="pv" href="%s.html"><small>← 이전 글</small><b>%s</b></a>' % (p['id'], esc(p['title'])))
            if idx < len(lst) - 1:
                n = lst[idx + 1]
                pn.append('<a class="nx" href="%s.html"><small>다음 글 →</small><b>%s</b></a>' % (n['id'], esc(n['title'])))
            pn_html = '<nav class="pn" aria-label="같은 분류의 글">%s</nav>' % ''.join(pn) if pn else ''
            url = SITE + 'lernmethoden/a/%s.html' % a['id']
            title = '%s · 독일어 공부법 | 소피아 독일어학원' % a['title']
            ld = {
                '@context': 'https://schema.org', '@type': 'Article',
                'headline': a['title'], 'description': a['sum'], 'inLanguage': 'ko',
                'datePublished': a['date'], 'mainEntityOfPage': url,
                'image': SITE + 'lernmethoden/icons/icon-512.png',
                'articleSection': '%s (%s)' % (ko, de),
                'author': {'@type': 'Organization', 'name': 'Sophia Deutsch Akademie (소피아 독일어학원)', 'url': SITE},
                'publisher': {'@type': 'Organization', 'name': 'Sophia Deutsch Akademie (소피아 독일어학원)',
                              'logo': {'@type': 'ImageObject', 'url': SITE + 'assets/icons/icon-512.png'}},
            }
            import json
            ld_txt = json.dumps(ld, ensure_ascii=False).replace('</', '<\\/')
            more = ''.join('<li><a href="../../%s">%s</a></li>' % (path, esc(name)) for path, name in MORE_APPS)
            doc = """<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
%(theme)s<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>%(title)s</title>
<meta name="description" content="%(sum)s">
<link rel="canonical" href="%(url)s">
<meta property="og:type" content="article">
<meta property="og:site_name" content="SODA Lehrwerk · 소피아 독일어학원">
<meta property="og:locale" content="ko_KR">
<meta property="og:title" content="%(h)s">
<meta property="og:description" content="%(sum)s">
<meta property="og:url" content="%(url)s">
<meta property="og:image" content="%(site)slernmethoden/icons/icon-512.png">
<meta property="article:published_time" content="%(date)s">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#14181E">
<meta name="color-scheme" content="dark">
<link rel="icon" type="image/png" href="../icons/icon-192.png">
<link rel="apple-touch-icon" href="../icons/apple-touch-icon.png">
<link rel="stylesheet" href="../../assets/pretendard.css">
<link rel="stylesheet" href="article.css?v=%(cv)s">
<script type="application/ld+json">%(ld)s</script>
<script id="soda-analytics" data-goatcounter="https://sodadeutsch.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>
</head>
<body>
<article class="reader">
<nav class="crumbs" aria-label="위치"><a class="pill" href="../#inhalt">%(back)s독일어 공부법 목록</a></nav>
<p class="a-eb">%(de)s<i>·</i>%(ko)s %(i)d/%(n)d</p>
<h1>%(h)s</h1>
<p class="a-sum">%(sum)s</p>
<p class="a-meta">약 %(mins)d분 · 소피아 독일어학원</p>
<div class="body">
%(body)s
</div>
%(pn)s
<aside class="more" aria-label="다른 학습 자료"><b>SODA Lehrwerk</b><p>소피아 독일어학원은 독일어 공부법 글 %(total)d편과 함께 문법 교재, 독해·듣기·쓰기·말하기 훈련, 단어장, Goethe·telc 모의고사를 무료로 공개합니다.</p><ul>%(more)s<li><a href="../../#inhalt">전체 목차</a></li></ul></aside>
<p class="a-end"><a class="pill" href="../#inhalt">%(back)s독일어 공부법 목록</a></p>
<p class="a-note">소피아 독일어학원 · 독일어 공부법</p>
</article>
<script>%(js)s</script>
</body>
</html>
""" % dict(theme=th, title=esc(title), h=esc(a['title']), sum=esc(a['sum']), url=url, site=SITE, date=a['date'],
                cv=cv, ld=ld_txt, back=BACK, de=de, ko=ko, i=idx + 1, n=len(lst), mins=mins, body=body, pn=pn_html,
                total=sum(len(v) for v in series.values()), more=more, js=STATIC_JS)
            fn = '%s.html' % a['id']
            keep.add(fn)
            with open(os.path.join(ADIR, fn), 'w', encoding='utf-8') as f:
                f.write(doc)
    # 원고가 없어진 글의 페이지는 지운다
    for fn in os.listdir(ADIR):
        if fn.endswith('.html') and fn not in keep:
            os.remove(os.path.join(ADIR, fn))
    print('wrote %d article pages in %s' % (len(keep), ADIR))


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
        # 목차의 번호(no)와 글 머리의 순번(i/n)이 어긋나지 않게, 번호는 1부터 빠짐없이 이어져야 한다
        nos = [a['no'] for a in lst]
        if nos != list(range(1, len(lst) + 1)):
            sys.exit('분류 %s 의 no 가 1부터 차례로 이어지지 않습니다: %s (글: %s)'
                     % (c, nos, ', '.join(a['id'] for a in lst)))
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
                '<span class="rt">%s</span><span class="rs">%s</span></span>'
                '<span class="go" aria-hidden="true">%s</span></a></li>'
                % (a['id'], a['no'], esc(a['title']), esc(a['sum']), ARROW))
        toc.append(
            '<section class="cat" aria-labelledby="cat-%s"><h2 class="cat-hd"><button type="button" class="cat-h" '
            'aria-expanded="false" aria-controls="rows-%s"><span class="cat-n" id="cat-%s">%s</span>'
            '<span class="ko">%s</span><span class="cnt">글 %d편</span><span class="note">%s</span>'
            '<span class="chev" aria-hidden="true">%s</span></button></h2>'
            '<ul class="rows" id="rows-%s" hidden>%s</ul></section>'
            % (cid, cid, cid, de, ko, len(series[cid]), esc(note), CHEV, cid, ''.join(rows)))

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
                '<p class="a-meta">약 %d분</p>'
                '<div class="body">%s</div>%s'
                '<p class="a-end"><a class="pill" href="#inhalt">%s공부법 목록</a></p>'
                '<p class="a-note">소피아 독일어학원 · 독일어 공부법</p></article>'
                % (a['id'], esc(a['title']), BACK, de, ko, idx + 1, len(lst), esc(a['title']), esc(a['sum']),
                   mins, body, pn_html, BACK))

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
    <p class="sub">독일어를 효과적으로 공부하려면 무엇을 어떻게 해야 하는지, 연구를 근거로 정리했습니다.</p>
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
        <p class="lead">분류를 누르면 글 목록이 아래에 열립니다. 분류마다 글이 번호 순서로 이어집니다.</p>
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
    static_pages(series, catname, theme, chrome, fonts)
    # 페이지 머리의 검색용 태그와 sitemap.xml 을 다시 맞춘다
    seo = os.path.join(os.path.dirname(HERE), 'tools', 'seo.py')
    if os.path.exists(seo):
        import subprocess
        subprocess.run([sys.executable, seo], check=True)


if __name__ == '__main__':
    build()
