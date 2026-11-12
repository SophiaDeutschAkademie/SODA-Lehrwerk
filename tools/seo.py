#!/usr/bin/env python3
"""SODA Lehrwerk 검색 노출 도구.

하는 일
  1. 아래 PAGES 의 페이지마다 <title>을 바꾸고, <head> 안에 검색용 태그 묶음
     (설명, canonical 주소, 카카오톡·SNS 미리보기 og 태그)을 넣거나 새로 고칩니다.
     묶음은 <!-- seo:begin --> … <!-- seo:end --> 사이에 들어가므로 여러 번 실행해도 한 번만 들어갑니다.
  2. 검색에 내보내지 않을 페이지(NOINDEX)에는 noindex 태그를 넣습니다.
  3. 저장소 루트에 sitemap.xml 을 만듭니다(PAGES + Lernmethoden 글 페이지 lernmethoden/a/*.html).
  4. VERIFY 에 네이버 서치어드바이저·구글 서치 콘솔 확인 코드를 적으면 목차(index.html)에 확인 태그를 넣습니다.

실행: python3 tools/seo.py   (저장소 어디에서 실행해도 됩니다)
앱 index.html 을 통째로 새로 만드는 빌드를 돌린 뒤에는 이 스크립트를 한 번 더 실행합니다.
lernmethoden/build.py 는 끝날 때 이 스크립트를 자동으로 부릅니다.
"""
import datetime
import html
import os
import re
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://sophiadeutschakademie.github.io/SODA-Lehrwerk/'
SITE_NAME = 'SODA Lehrwerk · 소피아 독일어학원'

# 사이트 확인 코드. 서치어드바이저·서치 콘솔에서 받은 content 값만 적습니다.
#   네이버: <meta name="naver-site-verification" content="여기 값">
#   구글:   <meta name="google-site-verification" content="여기 값">
VERIFY = {
    'naver-site-verification': '',
    'google-site-verification': '',
}

# (파일, 제목, 설명, 미리보기 그림)
PAGES = [
    ('index.html',
     'SODA Lehrwerk · 무료 독일어 학습 자료 | 소피아 독일어학원',
     '소피아 독일어학원이 무료로 공개하는 독일어 학습 자료. A1–C1 문법 교재, 독해·듣기·받아쓰기·쓰기·말하기 훈련, '
     '단어장 12,000여 단어, 전치사와 연어 플래시카드, 독일어 공부법, Goethe·telc 모의고사를 한곳에서 엽니다.',
     'assets/icons/icon-512.png'),
    ('grammatik/index.html',
     '독일어 문법 교재 Syntalab · Lektion 37개와 연습문제 | SODA Lehrwerk',
     '독일어 문법을 Lektion 37개로 정리한 무료 교재. 과마다 연습문제가 있고 통합 복습 4세트와 부록 암기 노트가 있습니다. 소피아 독일어학원.',
     'grammatik/icons/icon-512.png'),
    ('lesetraining/index.html',
     '독일어 독해 훈련 · A1–C1 텍스트 100개 | SODA Lesetraining',
     'A1부터 C1까지 레벨별 독일어 텍스트 100개로 하는 독해 훈련. 독해 문제, 패러프레이징, 주요 문법, 단어와 숙어를 함께 공부합니다. 소피아 독일어학원.',
     'lesetraining/assets/icon-512.png'),
    ('hoertraining/index.html',
     '독일어 듣기 훈련 · A1–C1 88세트 | SODA Hörtraining',
     'A1부터 C1까지 독일어 듣기 훈련 88세트. 음원을 나눠 다시 듣고 스크립트와 해석으로 확인하는 듣기 루틴입니다. 소피아 독일어학원.',
     'hoertraining/icons/icon-512.png'),
    ('schreibtraining/index.html',
     '독일어 쓰기 훈련 · A1–C1 구성·표현·모범답안 | SODA Schreibtraining',
     'A1부터 C1까지 레벨별 독일어 쓰기 훈련. 글의 구성과 표현을 익히고 직접 쓴 글을 모범답안과 비교합니다. telc·Goethe 쓰기 시험 대비. 소피아 독일어학원.',
     'schreibtraining/assets/icon-512.png'),
    ('sprechtraining/index.html',
     '독일어 말하기 훈련 · 레벨별 대화문과 원어민 음성 | SODA Sprechtraining',
     'A1부터 C1까지 레벨별 독일어 대화문 36개와 독일어 음성 433줄로 하는 말하기 훈련. 역할 연습, 표현 모음, 녹음 비교, MZ 구어체 대화. 소피아 독일어학원.',
     'sprechtraining/assets/icon-512.png'),
    ('diktattraining/index.html',
     '독일어 받아쓰기 훈련 · A1–C1 문장 563개 | SODA Diktattraining',
     'A1부터 C1까지 독일어 문장 563개를 듣고 받아쓰는 훈련. 틀린 곳을 어미, 관사, 철자, 빠진 단어로 나눠 보여 주고 틀린 문장은 다시 씁니다. 독일어 듣기와 맞춤법 연습. 소피아 독일어학원.',
     'diktattraining/assets/icon-512.png'),
    ('vokalab/index.html',
     '독일어 단어장 A1–C1 · 12,724단어 | SODA Vokalab',
     'A1부터 C1까지 독일어 단어 12,724개를 주차별 목표와 테스트로 공부하는 무료 단어장. 예문과 한국어 뜻, 시험용 필수 단어 학습. 소피아 독일어학원.',
     'vokalab/icons/icon-512.png'),
    ('praepositionen/index.html',
     '독일어 전치사의 모든 것 · 전치사 80개 비교와 퀴즈 | SODA Präpositionen',
     '독일어 전치사 80개의 격과 뜻, 헷갈리는 전치사 비교, 퀴즈를 한곳에 모았습니다. 소피아 독일어학원의 무료 전치사 학습 자료.',
     'praepositionen/icons/icon-512.png'),
    ('verben-mit-praepositionen/index.html',
     '독일어 동사와 전치사 결합 · A1–C2 플래시카드 324장 | Verben mit Präpositionen',
     'warten auf, denken an 같은 독일어 동사와 전치사 결합 324개를 A1부터 C2까지 플래시카드로 외웁니다. 소피아 독일어학원.',
     'verben-mit-praepositionen/icons/icon-512.png'),
    ('nomen-verb-verbindungen/index.html',
     '독일어 명사-동사 연어(Funktionsverbgefüge) · A1–C2 317장 | Nomen-Verb-Verbindungen',
     'eine Entscheidung treffen 같은 독일어 명사와 동사 연어 317개를 A1부터 C2까지 플래시카드로 익힙니다. 쓰기·말하기 시험 대비. 소피아 독일어학원.',
     'nomen-verb-verbindungen/icons/icon-512.png'),
    ('redemittel/index.html',
     '독일어 회화 표현 · 상황별 반응 플래시카드 A1–B2 | SODA Alltagsredemittel',
     '독일어 회화 패턴과 상황별 반응 표현 279개를 A1부터 B2까지 플래시카드로 익힙니다. 맞장구, 놀람, 거절 같은 일상 대화 표현. 소피아 독일어학원.',
     'redemittel/icons/icon-512.png'),
    ('kuerze-wuerze/index.html',
     '짧은 독일어 일상 표현 256개 · 일상을 위한 MSG | In der Kürze liegt die Würze',
     '독일 사람들이 일상에서 자주 쓰는 짧은 독일어 표현 256개와 헷갈리는 짝을 A2부터 C1까지 플래시카드로 익힙니다. 소피아 독일어학원.',
     'kuerze-wuerze/icons/icon-512.png'),
    ('lernmethoden/index.html',
     '독일어 공부법 · SODA Lernmethoden | 소피아 독일어학원',
     '독일어를 효과적으로 공부하는 방법을 연구를 근거로 정리한 글 38편. 학습 계획, 어휘, 문법, 읽기, 듣기, 말하기, 쓰기와 시험 직전 한 달까지 다룹니다.',
     'lernmethoden/icons/icon-512.png'),
]

# 검색에 내보내지 않는 페이지: 수강생 전용 로그인 화면, 새 주소로 넘기는 옛 주소 안내
NOINDEX = ['sprechen/index.html'] + ['zertifikat/%s/%s' % (d, f)
                                     for d in ('goethe-a2', 'goethe-b1', 'goethe-b2', 'telc-b1', 'telc-b2', 'telc-c1-hs')
                                     for f in ('index.html', 'digital.html')]

BEGIN = '<!-- seo:begin (tools/seo.py에서 만듦, 직접 고치지 마세요) -->'
END = '<!-- seo:end -->'
BLOCK_RE = re.compile(r'\n?<!-- seo:begin[^>]*-->.*?<!-- seo:end -->', re.S)


def esc(s):
    return html.escape(s, quote=True)


def url_of(path):
    return SITE + (path[:-len('index.html')] if path.endswith('index.html') else path)


def block(lines):
    return '\n' + BEGIN + '\n' + '\n'.join(lines) + '\n' + END


def put(path, lines, title=None):
    full = os.path.join(ROOT, path)
    if not os.path.exists(full):
        print('건너뜀(파일 없음):', path)
        return
    s = open(full, encoding='utf-8').read()
    s = BLOCK_RE.sub('', s)
    if title is not None:
        s, n = re.subn(r'<title>[^<]*</title>', '<title>%s</title>' % esc(title), s, count=1)
        if n != 1:
            raise SystemExit('%s: <title>이 없습니다' % path)
        # 설명 태그는 묶음 안에 새로 넣으므로 원래 것은 지운다
        s = re.sub(r'\n?<meta name="description"[^>]*>', '', s)
        anchor = re.search(r'<title>[^<]*</title>', s)
    else:
        anchor = re.search(r'<meta charset="?[^>]*>', s, re.I) or re.search(r'<head[^>]*>', s, re.I)
    if not anchor:
        raise SystemExit('%s: 태그를 넣을 자리를 찾지 못했습니다' % path)
    s = s[:anchor.end()] + block(lines) + s[anchor.end():]
    open(full, 'w', encoding='utf-8').write(s)


_GIT = {}


def _git(*args):
    try:
        return subprocess.run(['git', '-C', ROOT] + list(args), capture_output=True, text=True).stdout
    except OSError:
        return ''


def _published_lastmod():
    """이미 올라가 있는 sitemap.xml(HEAD)의 주소별 날짜."""
    if 'old' not in _GIT:
        _GIT['old'] = dict(re.findall(r'<loc>([^<]+)</loc><lastmod>([^<]+)</lastmod>', _git('show', 'HEAD:sitemap.xml')))
    return _GIT['old']


def lastmod(path):
    # 고친 뒤 아직 커밋하지 않은 파일(새 파일 포함)은 오늘 날짜
    if _git('status', '--porcelain', '--', path).strip():
        return datetime.date.today().isoformat()
    # 얕은 복제(git clone --depth 1)에서는 git log 가 모든 파일의 날짜를 마지막 커밋 날짜로 알려 준다.
    # 그대로 쓰면 바뀌지 않은 페이지의 날짜까지 바뀌므로, 올라가 있는 sitemap.xml 의 날짜를 그대로 둔다.
    if 'shallow' not in _GIT:
        _GIT['shallow'] = _git('rev-parse', '--is-shallow-repository').strip() == 'true'
    if _GIT['shallow']:
        kept = _published_lastmod().get(url_of(path))
        if kept:
            return kept
    return _git('log', '-1', '--format=%cs', '--', path).strip() or datetime.date.today().isoformat()


def main():
    for path, title, desc, img in PAGES:
        u = url_of(path)
        lines = [
            '<meta name="description" content="%s">' % esc(desc),
            '<link rel="canonical" href="%s">' % u,
            '<meta property="og:type" content="website">',
            '<meta property="og:site_name" content="%s">' % esc(SITE_NAME),
            '<meta property="og:locale" content="ko_KR">',
            '<meta property="og:title" content="%s">' % esc(title),
            '<meta property="og:description" content="%s">' % esc(desc),
            '<meta property="og:url" content="%s">' % u,
            '<meta property="og:image" content="%s">' % (SITE + img),
            '<meta name="twitter:card" content="summary">',
        ]
        if path == 'index.html':
            for k, v in VERIFY.items():
                if v.strip():
                    lines.append('<meta name="%s" content="%s">' % (k, esc(v.strip())))
        put(path, lines, title)

    for path in NOINDEX:
        put(path, ['<meta name="robots" content="noindex">'])

    # sitemap.xml
    urls = [(url_of(p), lastmod(p), '1.0' if p == 'index.html' else '0.8') for p, *_ in PAGES]
    adir = os.path.join(ROOT, 'lernmethoden', 'a')
    if os.path.isdir(adir):
        for fn in sorted(os.listdir(adir)):
            if fn.endswith('.html'):
                p = 'lernmethoden/a/' + fn
                urls.append((url_of(p), lastmod(p), '0.6'))
    xml = ['<?xml version="1.0" encoding="UTF-8"?>',
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u, d, pr in urls:
        xml.append('  <url><loc>%s</loc><lastmod>%s</lastmod><priority>%s</priority></url>' % (u, d, pr))
    xml.append('</urlset>')
    with open(os.path.join(ROOT, 'sitemap.xml'), 'w', encoding='utf-8') as f:
        f.write('\n'.join(xml) + '\n')
    print('seo: 페이지 %d개 태그, noindex %d개, sitemap.xml 주소 %d개' % (len(PAGES), len(NOINDEX), len(urls)))


if __name__ == '__main__':
    main()
