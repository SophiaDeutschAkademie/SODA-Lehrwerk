#!/usr/bin/env python3
"""Syntalab(문법 교재) 인쇄용 PDF 를 만듭니다.

    python3 grammatik/tools/pdf-build.py                 # 바뀐 것만 다시 만든다
    python3 grammatik/tools/pdf-build.py --all           # 모두 다시 만든다
    python3 grammatik/tools/pdf-build.py L03 anhang      # 고른 것만 다시 만든다 (L01 … L37, anhang, book)
    python3 grammatik/tools/pdf-build.py --out DIR L03   # 저장소는 그대로 두고 DIR 에 만들어 본다 (--html: 중간 HTML 도 남긴다)

만드는 것 (저장소의 grammatik-pdf/)
    syntalab.pdf          전체 — 표지 · 목차 · Lektion 01~37 · 부록 「암기 노트」 · 용어 풀이
    syntalab-L01.pdf …    한 과씩
    syntalab-anhang.pdf   부록
    manifest.json         파일마다 쪽 수 · 크기 · 원본 지문. 다음에 바뀐 것만 다시 만드는 데 쓴다.
그리고 grammatik/index.html 의 sx-pdf 블록(목차의 내려받기 단추가 읽는 정보)과 sw.js 의 VERSION 을 맞춘다.

하는 일
  1. grammatik/lessons/*.json(과의 HTML)을 읽어 종이용으로 바꾼다: 문제의 단추 → 글자, 말풍선 용어 풀이 → 용어 풀이 목록,
     본문의 「3과」 → 그 과로 가는 링크(전체 PDF), 그림 → JPEG.
  2. 교재 앱의 화면용 스타일(index.html 의 <style>)에 pdf-print.css 를 얹어 HTML 한 장으로 만든다. 모양은 A4 두 단.
  3. Chrome 에 띄워 pdf-fit.js 로 좁은 단에 선지·표·도식을 맞춘 뒤 PDF 로 두 번 찍는다
     (첫 번째에서 제목들이 놓인 쪽을 알아내 목차의 쪽 번호를 채우고 다시 찍는다).
  4. pikepdf 로 책갈피, 쪽마다 왼쪽 아래 「↑ 목차」 링크, 문서 정보를 넣고, 문서 안 링크를 쪽을 직접 가리키는 방식으로 바꾼다
     (Chrome 이 쓰는 이름 방식은 핸드폰의 PDF 뷰어 가운데 따라가지 못하는 것이 있다).

PDF 를 grammatik/ 밖에 두는 까닭: grammatik/sw.js 는 그 폴더 안의 모든 페이지 이동 요청에 교재 화면(index.html)을 돌려준다.
PDF 가 그 안에 있으면 주소로 들어온 사람이 PDF 대신 교재 화면을 보게 된다.

필요한 것: Chrome 또는 Chromium(환경 변수 CHROME 으로 지정할 수 있다), 파이썬 꾸러미 beautifulsoup4 · lxml · pikepdf ·
fonttools · Pillow, 시스템에 깔린 Inter 글꼴(Inter-*.otf, InterDisplay-*.otf), woff2 를 풀 brotli 또는 node.
글꼴 변환 함수는 tools/vokalab_pdf.py 의 것을 가져다 쓴다.
"""
import argparse
import base64
import copy
import fcntl
import hashlib
import html as H
import importlib.util
import io
import json
import logging
import os
import re
import select
import shutil
import subprocess
import sys
import tempfile
import time

from bs4 import BeautifulSoup, NavigableString, Tag

sys.dont_write_bytecode = True                       # tools/ 에 __pycache__ 를 남기지 않는다

HERE = os.path.dirname(os.path.abspath(__file__))
G = os.path.dirname(HERE)                            # grammatik/
ROOT = os.path.dirname(G)                            # 저장소
OUT = os.path.join(ROOT, 'grammatik-pdf')
FONT_DIR = os.path.join(tempfile.gettempdir(), 'syntalab-pdf-fonts-2')
IMG_DIR = os.path.join(tempfile.gettempdir(), 'syntalab-pdf-img-2')
esc = H.escape

# 쪽: A4 세로. 여백(mm)은 위 · 오른쪽 · 아래 · 왼쪽. 본문은 화면용 스타일(17px 글자)을 ZOOM 배로 줄여 쓴다(약 8.4pt).
MARGIN = (17, 13, 16, 13)
ZOOM = 0.66
MM = 72 / 25.4                                       # 1mm 를 pt 로
IMG_MAX = 800                                        # 사진의 가로 픽셀(가장 크게 놓여도 88mm 이므로 이만하면 넉넉하다)


def _load_vokalab():
    spec = importlib.util.spec_from_file_location('vokalab_pdf', os.path.join(ROOT, 'tools', 'vokalab_pdf.py'))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


vp = _load_vokalab()                                 # _find_font, _otf_to_ttf, _brotli_shim, _ranges, chrome


# ════════════════════════════════════════════════════════════════ 자료 읽기
_cache = {}


def _index():
    if 'index' not in _cache:
        _cache['index'] = open(os.path.join(G, 'index.html'), encoding='utf-8').read()
    return _cache['index']


def _json_block(src, block_id):
    m = re.search(r'<script type="application/json" id="%s">(.*?)</script>' % block_id, src, re.S)
    return json.loads(m.group(1))


def load_meta():
    """→ (과 목록, 부록). index.html 의 sx-meta · sx-ax 그대로이고 key(L01 … / anhang)만 더한다."""
    if 'meta' not in _cache:
        src = _index()
        meta = _json_block(src, 'sx-meta')
        for m in meta:
            m['key'] = 'L' + m['n']
        ax = _json_block(src, 'sx-ax')
        ax.update(key='anhang', n='')
        _cache['meta'] = (meta, ax)
    return _cache['meta']


def _lesson_raw(meta):
    """과의 HTML(문자열)."""
    path = os.path.join(G, meta['src'].split('?')[0])
    if path not in _cache:
        _cache[path] = json.load(open(path, encoding='utf-8'))
    return _cache[path]


# 교재 틀(목차·표지·다크 모드 단추 …)의 규칙을 알아보는 표시. 인쇄용 문서에는 이런 요소가 없다.
SHELL = re.compile(r'\.sx-|\.uc\b|\.uc-|\.soda-|#lx-|#fp\b|\.fc\b|\.fc-')


def _rules(css):
    """맨 바깥 규칙을 (머리, 몸통) 으로. 화면 폭·인쇄·다크 모드용 @media, 글꼴, 애니메이션, 다크 모드 규칙은 뺀다."""
    i, n = 0, len(css)
    while i < n:
        j = css.find('{', i)
        if j < 0:
            break
        depth, k = 1, j + 1
        while k < n and depth:
            c = css[k]
            if c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
            k += 1
        head = re.sub(r'/\*.*?\*/', '', css[i:j], flags=re.S).strip()
        if not head.startswith('@') and 'data-theme="dark"' not in head:
            yield head, css[j:k]
        i = k


def _split_selectors(head):
    out, depth, cur = [], 0, ''
    for c in head:
        if c in '([':
            depth += 1
        elif c in ')]':
            depth -= 1
        if c == ',' and depth == 0:
            out.append(cur.strip())
            cur = ''
        else:
            cur += c
    out.append(cur.strip())
    return [s for s in out if s]


def app_css():
    """과 본문에 쓰는 화면용 스타일.

    과의 스타일(<style id="sx-lesson-css">)은 그대로 쓴다. 그 밖의 <style> 에서는 교재 틀의 규칙을 뺀다 —
    인쇄용 문서에서는 어차피 걸리지 않고, 빼 두어야 틀만 고쳤을 때 PDF 를 다시 만들지 않는다.
    """
    if 'css' not in _cache:
        out = []
        for attrs, body in re.findall(r'<style([^>]*)>(.*?)</style>', _index(), re.S):
            lesson = 'sx-lesson-css' in attrs
            for head, block in _rules(body):
                if lesson:
                    out.append(head + block)
                    continue
                sels = [s for s in _split_selectors(head)
                        if not SHELL.search(s) and not re.match(r'(html|body|:root|\[hidden\])$', s)]
                if sels:
                    out.append(','.join(sels) + block)
        _cache['css'] = '\n'.join(out)
    return _cache['css']


def _tool_file(name):
    return open(os.path.join(HERE, name), encoding='utf-8').read()


# ════════════════════════════════════════════════════════════════ 글꼴
# Chrome 은 가변 글꼴과 OTF(CFF) 글꼴을 PDF 에 글자마다 따로 그리는 방식(Type 3)으로 넣어 파일이 몇 배 커진다.
# 그래서 고정 굵기의 TrueType 글꼴을 만들어 쓴다(처음 한 번만 만들어 임시 폴더에 둔다).
# Pretendard 는 저장소에 잘게 나뉜 조각(assets/fonts/*.woff2)으로 있다. 조각을 그대로 쓰면 한글 한 글자마다 글꼴이 바뀌어
# PDF 의 글자 명령이 몇 배로 늘어나므로, 쓰는 조각들을 굵기마다 글꼴 하나로 합친다.
INTER = {300: 'Light', 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold'}
INTER_IT = {400: 'Italic', 600: 'SemiBoldItalic'}
DISPLAY = {300: 'Light', 800: 'ExtraBold'}
PRET = {400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold'}
FONT_NAMES = ('Inter', 'InterDisplay', 'Pretendard')   # PDF 에 들어가도 되는 글꼴(이름의 앞부분)


def all_chars():
    """교재에 나오는 글자 모두(어느 파일을 만들든 같은 글꼴을 쓰도록 모든 과에서 모은다)."""
    if 'chars' not in _cache:
        meta, ax = load_meta()
        chars = set('SODA Syntalab 문법 교재 목차 차례 부록 용어 풀이 정답 이 과 정리 에 나온 ↑ · 0123456789 Lektion Fachwörter Inhalt')
        for m in meta + [ax]:
            chars.update(re.sub(r'data:image/[^"\']+', '', _lesson_raw(m)))
            chars.update(m.get('title', '') + m.get('de', '') + m.get('ko', ''))
        _cache['chars'] = chars
    return _cache['chars']


def fonts_css():
    """@font-face 규칙."""
    if 'fonts' in _cache:
        return _cache['fonts']
    from fontTools.merge import Merger
    from fontTools.ttLib import TTFont
    from fontTools.varLib import instancer
    logging.getLogger('fontTools').setLevel(logging.ERROR)
    os.makedirs(FONT_DIR, exist_ok=True)
    css = []

    def face(family, weight, path, style='normal'):
        css.append('@font-face{font-family:%s;font-weight:%d;font-style:%s;src:url("file://%s") format("truetype")}'
                   % (family, weight, style, path))

    def static(name):
        out = os.path.join(FONT_DIR, name + '.ttf')
        if not os.path.exists(out):
            src = vp._find_font([name + '.otf', name + '.ttf'])
            if not src:
                sys.exit('글꼴 %s 을 찾지 못했습니다. Inter 글꼴(Inter-*.otf, InterDisplay-*.otf)을 깔아 주세요.' % name)
            f = TTFont(src)
            if 'CFF ' in f:
                vp._otf_to_ttf(f)
            f.save(out)
        return out

    for w, n in INTER.items():
        face('PInter', w, static('Inter-' + n))
    for w, n in INTER_IT.items():
        face('PInter', w, static('Inter-' + n), 'italic')
    for w, n in DISPLAY.items():
        face('PDisplay', w, static('InterDisplay-' + n))

    # Pretendard: 교재에 나오는 글자가 든 조각만 골라 굵기마다 하나로 합친다
    src_css = open(os.path.join(ROOT, 'assets', 'pretendard.css'), encoding='utf-8').read()
    need = {ord(c) for c in all_chars()}
    slices = []
    for m in re.finditer(r'@font-face\{[^}]*?src:url\("fonts/([0-9a-f]+)\.woff2"\)[^}]*?unicode-range:([^}]+)\}', src_css):
        rr = vp._ranges(m.group(2).strip())
        if any(any(a <= c <= b for a, b in rr) for c in need):
            slices.append(m.group(1))
    slices.sort()
    key = hashlib.sha1('|'.join(slices).encode()).hexdigest()[:8]
    for w, n in PRET.items():
        out = os.path.join(FONT_DIR, 'Pretendard-%s-%s.ttf' % (n, key))
        if not os.path.exists(out):
            if not vp._brotli_shim():
                sys.exit('woff2 글꼴을 풀 수 없습니다. 파이썬 꾸러미 brotli 나 node 가 있어야 합니다.')
            parts = []
            for i, name in enumerate(slices):
                f = instancer.instantiateVariableFont(TTFont(os.path.join(ROOT, 'assets', 'fonts', name + '.woff2')), {'wght': w})
                f.flavor = None
                # 한글에는 글자 바꾸기·자리 조정 표가 필요 없다(라틴 글자는 Inter 로 찍는다). 빼야 조각을 합칠 수 있다.
                for t in ('GSUB', 'GPOS', 'GDEF', 'STAT', 'DSIG', 'vhea', 'vmtx', 'meta', 'BASE'):
                    if t in f:
                        del f[t]
                p = os.path.join(FONT_DIR, 'part-%d-%03d.ttf' % (w, i))
                f.save(p)
                parts.append(p)
            font = Merger().merge(parts)
            for rec in font['name'].names:
                if rec.nameID in (1, 16):
                    rec.string = 'Pretendard'
                elif rec.nameID in (2, 17):
                    rec.string = n
                elif rec.nameID == 4:
                    rec.string = 'Pretendard ' + n
                elif rec.nameID == 6:
                    rec.string = 'Pretendard-' + n
            font.save(out + '.tmp')
            os.replace(out + '.tmp', out)
            for p in parts:
                os.remove(p)
        face('PPret', w, out)
    _cache['fonts'] = ''.join(css)
    return _cache['fonts']


# ════════════════════════════════════════════════════════════════ 그림
def _asset(path):
    return 'file://' + os.path.join(G, path.split('?')[0])


def _jpeg(raw):
    """그림을 JPEG 파일로 바꿔 둔다(webp 는 PDF 에 압축 없이 실려 용량이 커진다)."""
    os.makedirs(IMG_DIR, exist_ok=True)
    name = os.path.join(IMG_DIR, hashlib.sha1(raw).hexdigest()[:16] + '-%d.jpg' % IMG_MAX)
    if not os.path.exists(name):
        from PIL import Image
        im = Image.open(io.BytesIO(raw)).convert('RGB')
        if im.width > IMG_MAX:
            im = im.resize((IMG_MAX, round(im.height * IMG_MAX / im.width)), Image.LANCZOS)
        im.save(name + '.tmp', 'JPEG', quality=84, optimize=True)
        os.replace(name + '.tmp', name)
    return 'file://' + name


# ════════════════════════════════════════════════════════════════ 과 하나를 종이용으로
# 어미·접미사 표기(-en, -(e)n, ¨-e)는 하이픈 바로 뒤에서 줄이 바뀔 수 있다(「-」 만 줄 끝에 남는다). 한 덩어리로 묶는다.
# 낱말 사이의 하이픈(E-Mail)과 뒤에 붙는 하이픈(ab-)은 해당하지 않는다.
SUFFIX = re.compile(r'(?<![0-9A-Za-zÄÖÜäöüß가-힣)\]–-])(¨?-[A-Za-zÄÖÜäöüß(][A-Za-zÄÖÜäöüß()]*)')


def nb_html(escaped):
    """HTML 로 바꾼 글에서 어미 표기를 줄바꿈 금지 덩어리로 감싼다."""
    return SUFFIX.sub(r'<span class="nb">\1</span>', escaped)


def _width(text):
    """글자 폭 어림(한글 2, 그 밖 1)."""
    return sum(2 if ord(c) >= 0x1100 else 1 for c in text)


def _text(node):
    return re.sub(r'\s+', ' ', node.get_text(' ', strip=True)).strip()


class Lesson:
    """과 하나(또는 부록)를 읽어 종이용으로 바꾼 결과. book: 전체 PDF 에 넣을 것인지(과 사이 링크를 건다)."""

    def __init__(self, meta, book):
        self.meta, self.book = meta, book
        self.key = meta['key']
        self.is_ax = self.key == 'anhang'
        raw = _lesson_raw(meta).replace('✕', '×').replace('⏭', '→')     # 글꼴에 없는 기호
        if self.is_ax and not book:
            # 부록만 받는 파일에서는 과로 가는 링크가 없다
            raw = raw.replace('제목 옆의 과 번호를 누르면 그 과로 가서 설명을 다시 볼 수 있어요.',
                              '제목 옆의 과 번호는 그 내용을 설명한 과예요.')
        self.soup = BeautifulSoup('<div id="x-root">' + raw + '</div>', 'lxml')
        self.root = self.soup.select_one('#x-root')
        self.terms = []          # [(용어, 풀이, 예)] 나온 순서, 중복 없음
        self.sections = []       # [(id, 글자, 제목)]
        self._images()
        self._glossary()
        self._quiz()
        self._nobreak()
        self._head()
        self._sections()
        self._links()
        self._breaks()

    def _images(self):
        for img in self.root.select('img'):
            src = img.get('src', '')
            if src == '%%A0%%':
                img['src'] = _asset('assets/logo.png')
            elif src == '%%A1%%':
                img['src'] = _jpeg(open(os.path.join(G, 'assets', 'image-1.webp'), 'rb').read())
            elif src.startswith('data:image/'):
                img['src'] = _jpeg(base64.b64decode(src.split(',', 1)[1]))
            for a in ('decoding', 'loading'):
                if img.has_attr(a):
                    del img[a]
        for x in self.root.select('.brand-bar,.brand-foot'):
            x.decompose()

    # 용어 풀이(화면에서는 누르면 뜨는 말풍선) → 모아 두고 본문에서는 뺀다
    def _glossary(self):
        seen = set()
        for gt in self.root.select('span.gt'):
            tip = gt.select_one('.gt-tip')
            if not tip:
                continue
            t = tip.select_one('.gt-t')
            ex = tip.select_one('.gt-ex')
            term = _text(t) if t else _text(gt)
            exs = _text(ex) if ex else ''
            if t:
                t.extract()
            if ex:
                ex.extract()
            body = _text(tip)
            tip.decompose()
            if gt.has_attr('tabindex'):
                del gt['tabindex']
            if term not in seen:
                seen.add(term)
                self.terms.append((term, body, re.sub(r'^예:\s*', '', exs)))

    # 문제: 단추 → 글자(선지 글자 a~d 는 동그라미 안에), 해설은 뺀다. 한 줄에 몇 개 놓을지는 pdf-fit.js 가 정한다.
    def _quiz(self):
        for qi in self.root.select('.quiz-block .qi'):
            for o in qi.select('.qo'):
                o.name = 'span'
                txt = _text(o)
                m = re.match(r'^([a-d])\)\s*(.*)$', txt, re.S)
                if m:
                    o.clear()
                    k = self.soup.new_tag('b', attrs={'class': 'qk'})
                    k.string = m.group(1)
                    o.append(k)
                    o.append(NavigableString(m.group(2)))
                if o.has_attr('data-c'):
                    del o['data-c']
            for qe in qi.select('.qe'):
                qe.decompose()

    # 어미 표기를 줄바꿈 금지 덩어리로(SUFFIX)
    def _nobreak(self):
        for node in list(self.root.find_all(string=True)):
            if not isinstance(node, NavigableString) or '-' not in node:
                continue
            par = node.parent
            if par is None or par.name in ('text', 'tspan', 'script', 'style') or par.find_parent(['svg', 'script', 'style']) is not None:
                continue
            text = str(node)
            if not SUFFIX.search(text):
                continue
            pos = 0
            for m in SUFFIX.finditer(text):
                if m.start() > pos:
                    node.insert_before(NavigableString(text[pos:m.start()]))
                span = self.soup.new_tag('span', attrs={'class': 'nb'})
                span.string = m.group(1)
                node.insert_before(span)
                pos = m.end()
            if pos < len(text):
                node.insert_before(NavigableString(text[pos:]))
            node.extract()

    # 과 머리(번호·제목·소개·목표)를 읽고 본문에서 뺀다. 첫머리는 opener() 가 새로 짠다.
    def _head(self):
        hd = self.root.select_one('header.lk-hd')
        self.kicker = _text(hd.select_one('.lk-kicker')) if hd.select_one('.lk-kicker') else ''
        big = hd.select_one('.lk-big')
        self.num = _text(big) if big else ''
        self.title = _text(hd.select_one('h1'))
        de = hd.select_one('.lk-de')
        self.de = _text(de) if de else ''
        intro = hd.select_one('.lk-intro')
        self.goals, self.goals_t, self.intro = [], '', ''
        if intro is not None:
            g = intro.select_one('.x-goals')
            if g is not None:
                gt = g.select_one('.x-goals-t')
                self.goals_t = _text(gt) if gt else '이 과에서 익힐 것'
                self.goals = [x.decode_contents() for x in g.select('.x-goal')]
                g.decompose()
            nav = intro.select_one('.ax-toc')
            if nav is not None:
                nav.decompose()
            self.intro = intro.decode_contents().strip()
        hd.decompose()

    def _sections(self):
        for sec in self.root.select('section[id]'):
            sid = sec['id']
            sec['id'] = '%s-%s' % (self.key, sid)          # 전체 PDF 에서 과마다 겹치지 않게
            sl = sec.select_one('.sh .sl')
            h2 = sec.select_one('h2')
            if sid == 'summary':
                self.sections.append((sec['id'], '', '이 과 정리'))
            elif sid == 'solutions':
                self.sections.append((sec['id'], '', '정답'))
            elif h2 is not None:
                t = copy.copy(h2)
                for x in t.select('.ax-de'):
                    x.decompose()
                self.sections.append((sec['id'], _text(sl) if sl else '', _text(t)))

    # 부록의 「N과」 단추와 「맨 위로」, 본문의 「N과」
    def _links(self):
        for a in self.root.select('a.ax-src'):
            m = re.match(r'#/(L\d\d)$', a.get('href', ''))
            if m and self.book:
                a['href'] = '#' + m.group(1)
            else:
                a.name = 'span'
                del a['href']
            if a.has_attr('aria-label'):
                del a['aria-label']
        for x in self.root.select('.ax-up'):
            x.decompose()
        if self.book:
            self._xrefs()

    # 「3과」, 「5·6과」, 「12~14과」 — 숫자 앞이 숫자·점이 아니고 「과」 뒤에 숫자가 오지 않을 때만(「0과 2」, 「3과 4분의 3」 은 아니다)
    XREF = re.compile(r'(?<![\d.])(\d{1,2}(?:\s*[·,~–-]\s*\d{1,2})*)과(?!\s*\d)')

    def _xrefs(self):
        last = len(load_meta()[0])
        me = int(self.num) if self.num.isdigit() else 0
        for node in list(self.root.find_all(string=True)):
            if not isinstance(node, NavigableString) or '과' not in node:
                continue
            par = node.parent
            if par is None or par.name in ('a', 'text', 'tspan') or par.find_parent(['a', 'svg', 'script', 'style']) is not None:
                continue
            text = str(node)
            parts, pos, hit = [], 0, False
            for m in self.XREF.finditer(text):
                if not all(1 <= int(n) <= last for n in re.findall(r'\d{1,2}', m.group(1))):
                    continue
                parts.append(text[pos:m.start()])
                seg, p2 = m.group(0), 0
                for nm in re.finditer(r'\d{1,2}', m.group(1)):
                    n = int(nm.group(0))
                    parts.append(seg[p2:nm.start()])
                    tail = nm.end() == len(m.group(1))
                    label = nm.group(0) + ('과' if tail else '')
                    if n == me:
                        parts.append(label)
                    else:
                        a = self.soup.new_tag('a', attrs={'class': 'xr', 'href': '#L%02d' % n})
                        a.string = label
                        parts.append(a)
                        hit = True
                    p2 = nm.end() + (1 if tail else 0)
                parts.append(seg[p2:])
                pos = m.end()
            if not hit:
                continue
            parts.append(text[pos:])
            for part in parts:
                if isinstance(part, str):
                    if part:
                        node.insert_before(NavigableString(part))
                else:
                    node.insert_before(part)
            node.extract()

    # 긴 상자는 쪽·단을 넘겨도 되게 표시한다(짧은 상자와 격변화표는 통째로 둔다 — pdf-print.css)
    def _breaks(self):
        def mark(el):
            el['class'] = (el.get('class') or []) + ['brk']
        for d in self.root.select('.dgm'):
            kids = [c for c in d.children if isinstance(c, Tag)]
            heavy = len(d.select('.dgm-step,.dgm-row,.exl-i,tr,.klam,.dgm-side')) + 2 * len(d.select('table,figure,svg'))
            if _width(_text(d)) > 420 or heavy >= 4 or len(kids) >= 4:
                mark(d)
        for e in self.root.select('.exl'):
            if len(e.select('.exl-i')) >= 6:
                mark(e)
        for w in self.root.select('.tbl-wrap'):
            t = w.find('table')
            if t is None or 'decl-m' in (t.get('class') or []):
                continue
            if len(t.select('tbody tr')) >= 9 or _width(_text(t)) > 900:
                mark(w)
        for c in self.root.select('.callout,.summary-card'):
            if _width(_text(c)) > 700:
                mark(c)

    def body_html(self):
        return self.root.decode_contents()

    def gloss_title(self):
        return '부록에 나온 용어' if self.is_ax else '이 과에 나온 용어'

    def run_title(self):
        """쪽 머리말과 책갈피에 쓰는 이름."""
        return ('부록 · %s' % self.title) if self.is_ax else ('Lektion %s · %s' % (self.num, self.title))


# ════════════════════════════════════════════════════════════════ 문서 조립
def pn(ref):
    """쪽 번호 자리. 한 번 찍어 본 뒤에 채운다(그동안은 자리만 잡는 000)."""
    return '<i class="pn" data-ref="%s">000</i>' % ref


def nav_entries(L):
    """과 안의 차례(쪽 순서대로): [(자리 이름, 글자, 제목)]. 첫머리의 차례와 책갈피에 함께 쓴다."""
    out = list(L.sections)
    if L.terms and not L.book:
        out.append((L.key + '-gloss', '', L.gloss_title()))
    return out


def opener(L):
    """과의 첫머리: 번호·제목·소개·목표, 이 과의 차례."""
    brand = ''
    if not L.book:
        brand = ('<div class="op-brand"><img src="%s" alt=""><b>SODA Syntalab</b><span>문법 교재</span>'
                 '<em>Sophia Deutsch Akademie</em></div>' % _asset('assets/logo.png'))
    goals = ''
    if L.goals:
        goals = ('<div class="op-goals"><div class="op-lab">%s</div><ul>%s</ul></div>'
                 % (esc(L.goals_t), ''.join('<li>%s</li>' % g for g in L.goals)))
    rows = ['<a href="#%s"><b>%s</b><span>%s</span>%s</a>' % (sid, esc(letter), esc(title), pn(sid))
            for sid, letter, title in nav_entries(L)]
    nav = ('<nav class="op-nav"><div class="op-lab">%s</div><div class="op-nav-l">%s</div></nav>'
           % ('차례' if L.is_ax else '이 과의 차례', ''.join(rows)))
    num = '<div class="op-n">%s</div>' % esc(L.num) if L.num else ''
    return ('<header class="op%s">%s<div class="op-cols"><div class="op-main"><div class="op-hd">'
            '<div class="op-k">%s</div>%s<h1 class="op-t">%s</h1><div class="op-de" lang="de">%s</div></div>'
            '<div class="op-box"><div class="op-intro">%s</div>%s</div></div>%s</div></header>'
            % (' op-ax' if L.is_ax else '', brand, esc(L.kicker), num, esc(L.title), esc(L.de), L.intro, goals, nav))


def gloss_block(terms, key, title, sub, cls=''):
    items = ''.join('<div class="gl-i"><dt>%s</dt><dd>%s%s</dd></div>'
                    % (nb_html(esc(t)), nb_html(esc(b)), '<span class="gl-ex">%s</span>' % nb_html(esc(x)) if x else '')
                    for t, b, x in terms)
    return ('<section class="gl%s" id="%s-gloss"><div class="gl-h"><h2>%s</h2><span lang="de">%s</span></div>'
            '<dl class="gl-l">%s</dl></section>' % (cls, key, esc(title), esc(sub), items))


def lesson_html(L):
    tail = ''
    if L.terms and not L.book:
        tail = gloss_block(L.terms, L.key, L.gloss_title(), 'Fachwörter')
    return ('<article class="lk%s" id="%s" style="page:p%s">%s<div class="lx">%s</div>%s</article>'
            % (' lk-ax' if L.is_ax else '', L.key, L.key.lower(), opener(L), L.body_html(), tail))


def cover_html(n_lessons):
    return ('<section class="pcv" id="cover"><div class="pcv-brand"><img src="%s" alt="">'
            '<div><b>Sophia Deutsch Akademie</b><span>소피아 독일어학원</span></div></div>'
            '<div class="pcv-hero"><h1><span class="pt1">SODA</span><span class="pt2">SYNTALAB</span></h1>'
            '<div class="pcv-sub"><b>문법 교재</b><span>구조가 보이면 쉬워지는 독일어</span></div></div>'
            '<div class="pcv-foot"><span>Innovative Learning Beyond the Traditional</span>'
            '<span>%d Lektionen</span></div></section>' % (_asset('assets/logo.png'), n_lessons))


def toc_html(lessons, ax, has_gloss):
    row = ('<li><a href="#%s"><b class="ptc-n">%s</b><span class="ptc-t"><span class="ptc-ko">%s</span>'
           '<span class="ptc-de" lang="de">%s</span></span>%s</a></li>')
    rows = [row % (L.key, esc(L.num), esc(L.title), esc(L.de), pn(L.key)) for L in lessons]
    extra = [row % (ax.key, '부록', esc(ax.title), esc(ax.de), pn(ax.key))]
    if has_gloss:
        extra.append(row % ('book-gloss', '', '용어 풀이', 'Fachwörter', pn('book-gloss')))
    how = ('<p class="ptc-how">제목을 누르면 그 과로 갑니다. 본문 속 「3과」 같은 과 번호도 누르면 그 과로 가고, '
           '쪽마다 왼쪽 아래의 「↑ 목차」를 누르면 이 목차로 돌아옵니다.</p>')
    return ('<section class="ptc" id="toc" style="page:ptoc"><div class="ptc-h"><h1>목차</h1><span lang="de">Inhalt</span></div>%s'
            '<ol class="ptc-l">%s</ol><ol class="ptc-l ptc-x">%s</ol></section>' % (how, ''.join(rows), ''.join(extra)))


def toc_label(single):
    """쪽 왼쪽 아래에 찍는 글자. 누르면 목차(한 과만 받는 파일에서는 첫 쪽의 차례)로 간다."""
    return '↑ 차례' if single else '↑ 목차'


def page_css(lessons, single):
    """@page 규칙: 여백, 머리말(왼쪽 책 이름·오른쪽 과 제목), 꼬리말(왼쪽 목차로·오른쪽 쪽 번호)."""
    mt, mr, mb, ml = MARGIN
    f = 'font-family:PInter,PPret,sans-serif;'
    navy, mute = '#384568', '#6b7280'
    none = '@top-left{content:none}@top-right{content:none}@bottom-left{content:none}'
    rules = [
        '@page{size:A4;margin:%smm %smm %smm %smm;'
        '@top-left{content:"SODA Syntalab";%sfont-size:7.5pt;font-weight:700;color:%s;vertical-align:bottom;padding-bottom:5mm}'
        '@top-right{content:"";%sfont-size:7.5pt;font-weight:500;color:%s;vertical-align:bottom;padding-bottom:5mm}'
        '@bottom-left{content:"%s";%sfont-size:7.5pt;font-weight:600;color:%s;vertical-align:top;padding-top:5mm}'
        '@bottom-right{content:counter(page);%sfont-size:8.5pt;font-weight:700;color:%s;vertical-align:top;padding-top:5mm}}'
        % (mt, mr, mb, ml, f, navy, f, mute, toc_label(single), f, mute, f, navy)]
    for L in lessons:
        rules.append('@page p%s{@top-right{content:"%s"}}' % (L.key.lower(), L.run_title().replace('\\', '\\\\').replace('"', '\\"')))
    rules.append('@page ptoc{@top-right{content:"목차"}@bottom-left{content:""}}')
    rules.append('@page pgloss{@top-right{content:"용어 풀이"}}')
    if single:
        # 첫 쪽에는 과 첫머리의 상표 줄이 있으므로 머리말을 비운다. 「↑ 차례」 도 뺀다(차례가 이 쪽에 있다).
        rules.append('@page :first{%s}' % none)
        for L in lessons:
            rules.append('@page p%s:first{%s}' % (L.key.lower(), none))
    else:
        rules.append('@page :first{margin:0;%s@bottom-right{content:none}}' % none)      # 표지
    return '\n'.join(rules)


def build_html(target):
    """→ (HTML, 과들, 문서 제목). target: 'book' 또는 과의 key."""
    meta, axm = load_meta()
    single = target != 'book'
    if single:
        m = axm if target == 'anhang' else [x for x in meta if x['key'] == target][0]
        lessons = [Lesson(m, book=False)]
        parts = [lesson_html(lessons[0])]
        title = 'SODA Syntalab ' + lessons[0].run_title()
    else:
        lessons = [Lesson(m, book=True) for m in meta]
        ax = Lesson(axm, book=True)
        terms, seen = [], set()
        for L in lessons + [ax]:
            for t in L.terms:
                if t[0] not in seen:
                    seen.add(t[0])
                    terms.append(t)
        terms.sort(key=lambda t: t[0])
        parts = [cover_html(len(lessons)), toc_html(lessons, ax, bool(terms))]
        lessons.append(ax)
        parts += [lesson_html(L) for L in lessons]
        if terms:
            parts.append('<article class="lk lk-gl" style="page:pgloss">%s</article>'
                         % gloss_block(terms, 'book', '용어 풀이', 'Fachwörter', ' gl-book'))
        title = 'SODA Syntalab 문법 교재'
    mt, mr, mb, ml = MARGIN
    css = '\n'.join([
        fonts_css(),
        app_css(),
        _tool_file('pdf-print.css'),
        ':root{--z:%s;--pw:%smm}' % (ZOOM, 210 - ml - mr),
        page_css(lessons, single),
    ])
    # 쪽 여백 상자(머리말·꼬리말)에 찍는 글자. pdf-fit.js 가 이 글자에 쓸 글꼴을 미리 불러 둔다.
    margin_text = 'SODA Syntalab 목차 용어 풀이 ↑ 차례 0123456789 ' + ' '.join(L.run_title() for L in lessons)
    doc = ('<!doctype html><html lang="ko" data-margin-text="%s"><head><meta charset="utf-8"><title>%s</title>'
           '<style>%s</style></head><body class="%s">%s<script>%s</script></body></html>'
           % (esc(margin_text, quote=True), esc(title), css, 'single' if single else 'book', ''.join(parts),
              _tool_file('pdf-fit.js')))
    return doc, lessons, title


# ════════════════════════════════════════════════════════════════ Chrome
class Chrome:
    """Chrome 을 하나 띄워 두고 DevTools 프로토콜로 시킨다(파이프로 주고받으므로 다른 꾸러미가 필요 없다).

    명령줄의 --print-to-pdf 대신 이렇게 하는 까닭: 인쇄하기 전에 pdf-fit.js 가 끝났는지 확인하고 그 결과를 읽어야 하고,
    쪽 번호를 채운 뒤 같은 화면에서 한 번 더 찍어야 한다.
    """

    def __init__(self):
        self.dir = tempfile.mkdtemp(prefix='syntalab-chrome-')
        to_r, to_w = os.pipe()                       # 우리가 쓰고 Chrome 이 3번으로 읽는다
        from_r, from_w = os.pipe()                   # Chrome 이 4번으로 쓰고 우리가 읽는다
        c3 = fcntl.fcntl(to_r, fcntl.F_DUPFD, 20)    # 3·4번과 겹치지 않게 높은 번호로 옮겨 둔다
        c4 = fcntl.fcntl(from_w, fcntl.F_DUPFD, 20)
        os.close(to_r)
        os.close(from_w)

        def child():
            os.dup2(c3, 3)
            os.dup2(c4, 4)

        self.proc = subprocess.Popen(
            [vp.chrome(), '--headless=new', '--remote-debugging-pipe', '--no-sandbox', '--disable-gpu',
             '--user-data-dir=' + self.dir, '--no-first-run', '--no-default-browser-check',
             '--disable-background-networking', '--disable-component-update', '--disable-sync', '--disable-extensions',
             '--disable-features=Translate,OptimizationHints,MediaRouter', '--hide-scrollbars', '--window-size=1000,1200',
             'about:blank'],
            preexec_fn=child, close_fds=False, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL)
        os.close(c3)
        os.close(c4)
        self.w, self.r = to_w, from_r
        self.buf = b''
        self.n = 0

    def _read(self, timeout):
        end = time.time() + timeout
        while b'\0' not in self.buf:
            left = end - time.time()
            if left <= 0 or not select.select([self.r], [], [], left)[0]:
                raise RuntimeError('Chrome 이 %d초 동안 답하지 않았습니다.' % timeout)
            chunk = os.read(self.r, 1 << 20)
            if not chunk:
                raise RuntimeError('Chrome 이 끝나 버렸습니다.')
            self.buf += chunk
        msg, _, self.buf = self.buf.partition(b'\0')
        return json.loads(msg)

    def send(self, method, params=None, session=None, timeout=1800):
        self.n += 1
        msg = {'id': self.n, 'method': method, 'params': params or {}}
        if session:
            msg['sessionId'] = session
        data = json.dumps(msg).encode() + b'\0'
        while data:
            data = data[os.write(self.w, data):]
        while True:
            m = self._read(timeout)
            if m.get('id') == self.n:
                if 'error' in m:
                    raise RuntimeError('%s: %s' % (method, m['error'].get('message')))
                return m.get('result', {})

    def eval(self, session, expr):
        r = self.send('Runtime.evaluate', {'expression': expr, 'returnByValue': True}, session)
        if 'exceptionDetails' in r:
            raise RuntimeError('화면에서 스크립트 오류: %s' % json.dumps(r['exceptionDetails'], ensure_ascii=False)[:400])
        return r.get('result', {}).get('value')

    def open(self, url, ready, timeout=1800):
        """새 창에 url 을 띄우고 ready(자바스크립트 식)가 참이 될 때까지 기다린다. → 창(세션)"""
        target = self.send('Target.createTarget', {'url': 'about:blank'})['targetId']
        s = self.send('Target.attachToTarget', {'targetId': target, 'flatten': True})['sessionId']
        self.send('Page.enable', session=s)
        self.send('Page.navigate', {'url': url}, s)
        end = time.time() + timeout
        while not self.eval(s, ready):
            if time.time() > end:
                raise RuntimeError('화면이 준비되지 않았습니다: ' + url)
            time.sleep(0.05)
        return s, target

    def pdf(self, session, path):
        r = self.send('Page.printToPDF', {
            'printBackground': True, 'preferCSSPageSize': True, 'displayHeaderFooter': False,
            'marginTop': 0, 'marginBottom': 0, 'marginLeft': 0, 'marginRight': 0,
            'generateTaggedPDF': False, 'generateDocumentOutline': False, 'transferMode': 'ReturnAsStream'}, session)
        with open(path, 'wb') as f:
            while True:
                part = self.send('IO.read', {'handle': r['stream'], 'size': 1 << 20}, session)
                f.write(base64.b64decode(part['data']) if part.get('base64Encoded') else part['data'].encode())
                if part.get('eof'):
                    break
        self.send('IO.close', {'handle': r['stream']}, session)

    def close_page(self, target):
        self.send('Target.closeTarget', {'targetId': target})

    def quit(self):
        try:
            self.send('Browser.close', timeout=10)
        except Exception:
            pass
        try:
            self.proc.wait(timeout=10)
        except Exception:
            self.proc.kill()
        for fd in (self.w, self.r):
            try:
                os.close(fd)
            except OSError:
                pass
        shutil.rmtree(self.dir, ignore_errors=True)


# ════════════════════════════════════════════════════════════════ PDF 다듬기
def dest_pages(pdf_path):
    """이름 붙은 자리(#id) → (쪽(1부터), 쪽 위에서부터의 위치). 그리고 전체 쪽 수."""
    import pikepdf
    out = {}
    with pikepdf.open(pdf_path) as pdf:
        idx = {p.objgen: i + 1 for i, p in enumerate(pdf.pages)}
        dests = pdf.Root.get('/Dests')
        if dests is not None:
            for k in dests.keys():
                d = dests[k]
                out[str(k)[1:]] = (idx.get(d[0].objgen, 0), float(d[3]) if len(d) > 3 else 0.0)
        return out, len(pdf.pages)


def finish(tmp_pdf, out_pdf, lessons, title, single, ref_px=0):
    """책갈피, 쪽마다 왼쪽 아래 「↑ 목차」 링크, 문서 정보를 넣고, 문서 안 링크를 쪽을 직접 가리키게 바꾸고, 다시 압축한다.
    → (뜻밖의 글꼴 이름들, 찍힌 배율, 갈 곳을 찾지 못한 링크 수)"""
    import pikepdf
    pikepdf.settings.set_flate_compression_level(9)
    pages, _ = dest_pages(tmp_pdf)
    mt, mr, mb, ml = MARGIN
    with pikepdf.open(tmp_pdf) as pdf:
        # 「↑ 목차」 가 찍힌 쪽: 전체 PDF 는 표지와 목차를 뺀 모든 쪽, 한 과 파일은 첫 쪽을 뺀 모든 쪽
        if single:
            home, skip = 0, {0}
        else:
            home = pages.get('toc', (2, 0))[0] - 1
            first = pages.get(lessons[0].key, (home + 2, 0))[0] - 1
            skip = {0} | set(range(home, first))
        # 글자는 왼쪽 여백 선에서 시작하고, 아래 여백 선에서 5mm 내려온 곳이 글자 위쪽이다(pdf-print 의 @bottom-left)
        top = mb * MM - 5 * MM
        rect = [ml * MM - 4, top - 14, ml * MM + 36, top + 5]
        for i, page in enumerate(pdf.pages):
            if i in skip:
                continue
            hgt = float(page.MediaBox[3])
            annot = pikepdf.Dictionary(
                Type=pikepdf.Name.Annot, Subtype=pikepdf.Name.Link, Rect=rect, Border=[0, 0, 0], F=4,
                Dest=[pdf.pages[home].obj, pikepdf.Name.XYZ, 0, hgt, 0])
            if '/Annots' not in page:
                page.Annots = pdf.make_indirect(pikepdf.Array())
            page.Annots.append(pdf.make_indirect(annot))
        with pdf.open_outline() as ol:
            def item(text, ref):
                p = pages.get(ref)
                if not p or not p[0]:
                    return None
                return pikepdf.OutlineItem(text, p[0] - 1, 'XYZ', left=0, top=p[1])
            if not single:
                ol.root.append(pikepdf.OutlineItem('표지', 0))
                ol.root.append(pikepdf.OutlineItem('목차', home))
            for L in lessons:
                top_item = item(L.run_title(), L.key) if not single else None
                target = top_item.children if top_item else ol.root
                for sid, letter, t in nav_entries(L):
                    ch = item((letter + '  ' if letter else '') + t, sid)
                    if ch:
                        target.append(ch)
                if top_item:
                    top_item.is_closed = True
                    ol.root.append(top_item)
            if not single:
                it = item('용어 풀이', 'book-gloss')
                if it:
                    ol.root.append(it)
        for k in list(pdf.docinfo.keys()):              # 만든 시각을 빼서, 내용이 같으면 파일도 같게
            del pdf.docinfo[k]
        pdf.docinfo['/Title'] = title
        pdf.docinfo['/Author'] = 'Sophia Deutsch Akademie'
        pdf.docinfo['/Subject'] = 'SODA Syntalab 문법 교재'
        pdf.Root.PageMode = pikepdf.Name.UseOutlines
        pdf.Root.Lang = pikepdf.String('ko-KR')
        pdf.Root.ViewerPreferences = pikepdf.Dictionary(DisplayDocTitle=True)
        # Chrome 이 쪽을 줄여 찍지 않았는지: 과 첫머리 차례의 링크 폭을 화면에서 잰 폭(ref_px)과 견준다
        names = {sid for L in lessons for sid, _, _ in nav_entries(L)}
        widths = sorted(float(a.Rect[2]) - float(a.Rect[0]) for page in pdf.pages for a in (page.get('/Annots') or [])
                        if isinstance(a.get('/Dest'), pikepdf.Name) and str(a.Dest)[1:] in names)
        scale = widths[len(widths) // 2] / (ref_px * 0.75) if widths and ref_px else 1.0
        # 문서 안 링크를 「가리키는 쪽과 위치를 직접 적는」 방식으로 바꾼다(/Dest [쪽 /XYZ 왼쪽 위 0] — Word 가 PDF 를 만들 때 쓰는 방식).
        # Chrome 은 「이름 붙은 자리」(/Dest /이름 → 문서의 /Dests 사전)로 적는다. Chrome·Acrobat 은 이것을 따라가지만
        # 핸드폰의 PDF 뷰어(구글 드라이브 미리보기 등) 가운데에는 따라가지 못하는 것이 있어, 목차를 눌러도 움직이지 않는다.
        named = pdf.Root.get('/Dests')
        lost = 0
        for page in pdf.pages:
            for a in page.get('/Annots') or []:
                d = a.get('/Dest')
                act = a.get('/A')
                if d is None and act is not None and act.get('/S') == '/GoTo':
                    d = act.get('/D')
                if not isinstance(d, (pikepdf.Name, pikepdf.String)):
                    continue
                t = named.get('/' + str(d).lstrip('/')) if named is not None else None
                if isinstance(t, pikepdf.Dictionary):
                    t = t.get('/D')
                if not isinstance(t, pikepdf.Array):
                    lost += 1
                    continue
                a.Dest = pikepdf.Array(list(t))
                if act is not None:
                    del a['/A']
        odd = set()
        for obj in pdf.objects:
            if isinstance(obj, pikepdf.Dictionary) and obj.get('/Type') == '/Font':
                name, sub = str(obj.get('/BaseFont', '')), str(obj.get('/Subtype', ''))
                if sub == '/Type3' or not re.match(r'/(?:[A-Z]{6}\+)?(?:%s)\b' % '|'.join(FONT_NAMES), name):
                    odd.add('%s (%s)' % (name.lstrip('/') or '이름 없음', sub.lstrip('/')))
        pdf.save(out_pdf, compress_streams=True, recompress_flate=True, deterministic_id=True,
                 object_stream_mode=pikepdf.ObjectStreamMode.generate)
    return sorted(odd), scale, lost


ATTR_JS = '(document.documentElement?document.documentElement.getAttribute("%s"):null)'
FILL_JS = ('(function(p){var l=document.querySelectorAll(".pn[data-ref]");'
           'for(var i=0;i<l.length;i++){var v=p[l[i].getAttribute("data-ref")];l[i].textContent=v?String(v):"";}'
           'return l.length;})(%s)')


def build(chrome, target, out_pdf, keep_html=False):
    """target 하나를 만든다. → dict(pages, bytes, report)"""
    single = target != 'book'
    doc, lessons, title = build_html(target)
    work = tempfile.mkdtemp(prefix='syntalab-pdf-')
    hp = os.path.join(work, target + '.html')
    p1, p2 = os.path.join(work, 'pass1.pdf'), os.path.join(work, 'pass2.pdf')
    try:
        with open(hp, 'w', encoding='utf-8') as f:
            f.write(doc)
        s, tab = chrome.open('file://' + hp, ATTR_JS % 'data-pdf-fit' + '==="1"')
        err = chrome.eval(s, ATTR_JS % 'data-pdf-error')
        if err:
            raise RuntimeError('pdf-fit.js 오류 (%s): %s' % (target, err))
        report = json.loads(chrome.eval(s, ATTR_JS % 'data-pdf-report') or '{}')
        chrome.pdf(s, p1)
        pages, n1 = dest_pages(p1)
        chrome.eval(s, FILL_JS % json.dumps({k: v[0] for k, v in pages.items()}))
        chrome.pdf(s, p2)
        chrome.close_page(tab)
        pages2, n2 = dest_pages(p2)
        moved = [k for k in pages if pages2.get(k, (0,))[0] != pages[k][0]]
        if n1 != n2 or moved:
            report['moved'] = len(moved) or 1
        report['fonts'], report['scale'], report['lost'] = finish(p2, out_pdf, lessons, title, single, report.get('ref', 0))
        if keep_html:
            shutil.copy(hp, os.path.splitext(out_pdf)[0] + '.html')
    finally:
        shutil.rmtree(work, ignore_errors=True)
    return dict(pages=n2, bytes=os.path.getsize(out_pdf), report=report)


def show_report(target, rep):
    """맞춘 결과에서 손봐야 할 것을 알린다. → 고쳐야 할 것의 개수(그림 속 작은 글자는 알리기만 한다)"""
    bad = 0
    for o in rep.get('over', []):
        bad += 1
        print('  고칠 것 %s: 단이나 제 상자 밖으로 %.1fpx 나감 — %s 「%s」' % (o.get('key', target), o['over'], o['tag'], o['text']),
              file=sys.stderr)
    if rep.get('scale', 1.0) < 0.995:
        bad += 1
        print('  고칠 것 %s: 쪽 밖으로 나간 것이 있어 Chrome 이 전체를 %.3f배로 줄여 찍었습니다.' % (target, rep['scale']), file=sys.stderr)
    for name in rep.get('fonts', []):
        bad += 1
        print('  고칠 것 %s: 준비한 글꼴에 없는 글자가 있어 다른 글꼴이 쓰였습니다 — %s' % (target, name), file=sys.stderr)
    if rep.get('lost'):
        bad += 1
        print('  고칠 것 %s: 갈 곳을 찾지 못한 링크가 %d개 있습니다.' % (target, rep['lost']), file=sys.stderr)
    if rep.get('moved'):
        bad += 1
        print('  고칠 것 %s: 쪽 번호를 채운 뒤 쪽이 달라져 목차의 쪽 번호가 틀릴 수 있습니다.' % target, file=sys.stderr)
    for o in rep.get('small', []):
        print('  참고 %s: 그림 속 글자가 %.1fpt 로 작음 — 「%s」' % (o.get('key', target), o['pt'], o['text']), file=sys.stderr)
    return bad


# ════════════════════════════════════════════════════════════════ 무엇을 만들지, 목차에 알리기
def file_name(target):
    return 'syntalab.pdf' if target == 'book' else 'syntalab-%s.pdf' % target


def all_targets():
    meta, ax = load_meta()
    return ['book'] + [m['key'] for m in meta] + [ax['key']]


def signature(target):
    """이 PDF 의 원본 지문: 과의 내용, 과 본문 스타일, 이 도구의 파일들. 지문이 같으면 다시 만들지 않는다."""
    if 'sig' not in _cache:
        h = hashlib.sha256()
        for name in ('pdf-build.py', 'pdf-print.css', 'pdf-fit.js'):
            h.update(_tool_file(name).encode())
        h.update(app_css().encode())
        h.update(open(os.path.join(G, 'assets', 'logo.png'), 'rb').read())
        _cache['sig'] = h.hexdigest()
    meta, ax = load_meta()
    parts = meta + [ax] if target == 'book' else [m for m in meta + [ax] if m['key'] == target]
    h = hashlib.sha256((_cache['sig'] + target).encode())
    for m in parts:
        h.update(json.dumps([m.get(k, '') for k in ('key', 'n', 'ko', 'de', 'title')], ensure_ascii=False).encode())
        h.update(_lesson_raw(m).encode())
    return h.hexdigest()[:16]


def read_manifest():
    try:
        return json.load(open(os.path.join(OUT, 'manifest.json'), encoding='utf-8')).get('files', {})
    except (OSError, ValueError):
        return {}


def write_manifest(files):
    order = [t for t in all_targets() if t in files]
    data = {'note': 'grammatik/tools/pdf-build.py 가 쓰는 파일입니다. 손으로 고치지 않습니다.',
            'files': {t: files[t] for t in order}}
    with open(os.path.join(OUT, 'manifest.json'), 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
        f.write('\n')


def stamp(files):
    """목차의 내려받기 단추가 읽는 정보를 index.html 에 적고, sw.js 의 VERSION 을 맞춘다."""
    def entry(t):
        e = files[t]
        return {'f': e['file'], 'v': e['v'], 'p': e['pages'], 'mb': round(e['bytes'] / 1e6, 1)}
    info = {'dir': '../grammatik-pdf/', 'book': entry('book') if 'book' in files else None,
            'parts': {t: entry(t) for t in all_targets() if t != 'book' and t in files}}
    block = '<script type="application/json" id="sx-pdf">%s</script>' % json.dumps(info, ensure_ascii=False, separators=(',', ':'))
    path = os.path.join(G, 'index.html')
    idx = open(path, encoding='utf-8').read()
    old = re.search(r'<script type="application/json" id="sx-pdf">.*?</script>', idx, re.S)
    if old:
        new = idx[:old.start()] + block + idx[old.end():]
    else:
        ax = re.search(r'<script type="application/json" id="sx-ax">.*?</script>', idx, re.S)
        assert ax, 'index.html 에 sx-ax 블록이 없습니다'
        new = idx[:ax.end()] + '\n' + block + idx[ax.end():]
    if new != idx:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new)
    # 다른 빌드 스크립트(pager-build.py)와 같은 식: 캐시 목록 전체와 index.html 의 내용으로 VERSION 을 정한다
    sw_path = os.path.join(G, 'sw.js')
    sw = open(sw_path, encoding='utf-8').read()
    lists = re.findall(r'"([^"]+\?v=[0-9a-f]+)"', sw)
    ver = hashlib.sha256(('\n'.join(lists) + hashlib.sha256(new.encode('utf8')).hexdigest()).encode()).hexdigest()[:10]
    sw2 = re.sub(r"const VERSION = '[0-9a-f]+';", "const VERSION = '%s';" % ver, sw)
    if sw2 != sw:
        with open(sw_path, 'w', encoding='utf-8') as f:
            f.write(sw2)
    return new != idx, ver


def main():
    ap = argparse.ArgumentParser(description='Syntalab(문법 교재) 인쇄용 PDF 를 만듭니다.')
    ap.add_argument('targets', nargs='*', help='L01 … L37, anhang, book. 비우면 바뀐 것만')
    ap.add_argument('--all', action='store_true', help='모두 다시 만든다')
    ap.add_argument('--out', help='저장소 대신 이 폴더에 만든다(목차 정보는 건드리지 않는다)')
    ap.add_argument('--html', action='store_true', help='중간 HTML 도 PDF 옆에 남긴다')
    a = ap.parse_args()

    every = all_targets()
    bad = [t for t in a.targets if t not in every]
    if bad:
        sys.exit('모르는 이름: %s (쓸 수 있는 이름: book, L01 … L%s, anhang)' % (', '.join(bad), load_meta()[0][-1]['n']))
    out_dir = os.path.abspath(a.out) if a.out else OUT
    os.makedirs(out_dir, exist_ok=True)
    files = {} if a.out else read_manifest()
    sigs = {t: signature(t) for t in every}
    if a.targets:
        todo = [t for t in every if t in a.targets]
    elif a.all or a.out:
        todo = every
    else:
        todo = [t for t in every if files.get(t, {}).get('src') != sigs[t]
                or not os.path.exists(os.path.join(out_dir, file_name(t)))]
    bad = 0
    if not todo:
        print('바뀐 것이 없습니다.')
    else:
        chrome = Chrome()
        try:
            for t in todo:
                t0 = time.time()
                path = os.path.join(out_dir, file_name(t))
                res = build(chrome, t, path, keep_html=a.html)
                files[t] = {'file': file_name(t), 'src': sigs[t], 'pages': res['pages'], 'bytes': res['bytes'],
                            'v': hashlib.sha256(open(path, 'rb').read()).hexdigest()[:8]}
                n = res['report'].get('n', {})
                print('%-20s %3d쪽  %5.2f MB  %4.1f초   넘친 표 %d · 첫 칸 푼 표 %d · 두 단에 걸친 표 %d · 낱말 맞춤 %d · 그림 글자 키움 %d'
                      % (file_name(t), res['pages'], res['bytes'] / 1e6, time.time() - t0,
                         n.get('tf', 0), n.get('tb', 0), n.get('span', 0), n.get('wf', 0), n.get('svg', 0)))
                bad += show_report(t, res['report'])
        finally:
            chrome.quit()
    if bad:
        print('고칠 것이 %d건 있습니다. 위에 적힌 것을 손본 뒤 다시 만들어 주세요.' % bad, file=sys.stderr)
    if a.out:
        sys.exit(1 if bad else 0)
    write_manifest(files)
    stale = [t for t in every if files.get(t, {}).get('src') != sigs[t]]
    if stale:
        print('주의: 원본이 바뀌었는데 다시 만들지 않은 것 — %s' % ', '.join(stale), file=sys.stderr)
    changed, ver = stamp(files)
    total = sum(e['bytes'] for e in files.values())
    print('grammatik-pdf/ %d개 %.1f MB · index.html 의 내려받기 정보 %s · sw VERSION %s'
          % (len(files), total / 1e6, '고침' if changed else '그대로', ver))
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
