/* Lehrwerk Grammatik — offline cache.
   Every file name below carries ?v=<content hash>, so a new upload only
   re-downloads the files that actually changed. */
const VERSION = '35c0ffeef8';
const PREFIX = 'lehrwerk-grammatik-';
const CACHE = PREFIX + VERSION;
const CORE = [
  "pager.js?v=11c3335a85",
  "pretendard.css?v=a50de844bc",
  "manifest.webmanifest?v=37cde27c99",
  "icons/icon-192.png?v=6019ff15b8",
  "icons/icon-512.png?v=b77d7efd3b",
  "icons/icon-maskable-512.png?v=60d7e39c7b",
  "icons/apple-touch-icon.png?v=e93cc6226d",
  "assets/image-1.webp?v=f15d5b8096",
  "assets/logo.png?v=d92b73352b"
];
const LESSONS = [
  "lessons/L01.json?v=27253dde07",
  "lessons/L02.json?v=bea1035135",
  "lessons/L03.json?v=87f5da0488",
  "lessons/L04.json?v=ff420a0041",
  "lessons/L05.json?v=286b387133",
  "lessons/L06.json?v=ddf1a58cb8",
  "lessons/L07.json?v=18de6f6dc8",
  "lessons/L08.json?v=447912ac95",
  "lessons/L09.json?v=fb180ad210",
  "lessons/L10.json?v=a9fb735e58",
  "lessons/L11.json?v=b5a7d2eeba",
  "lessons/L12.json?v=a83c822d36",
  "lessons/L13.json?v=893c0ed3e0",
  "lessons/L14.json?v=c9d0ea6eb0",
  "lessons/L15.json?v=f59b7244e6",
  "lessons/L16.json?v=537a8eab0c",
  "lessons/L17.json?v=49c68ff4ca",
  "lessons/L18.json?v=cf59885d75",
  "lessons/L19.json?v=4db484a29a",
  "lessons/L20.json?v=e206a6518d",
  "lessons/L21.json?v=aa72dbb5c6",
  "lessons/L22.json?v=7e150e0d2e",
  "lessons/L23.json?v=eeb3c63579",
  "lessons/L24.json?v=6e0e0add14",
  "lessons/L25.json?v=cf4feac236",
  "lessons/L26.json?v=83745fb729",
  "lessons/L27.json?v=8a3fe56abe",
  "lessons/L28.json?v=c0ae2b2ae4",
  "lessons/L29.json?v=51c0ab99d7",
  "lessons/L30.json?v=5488e5e20e",
  "lessons/L31.json?v=6f1e88f2ba",
  "lessons/L32.json?v=5d40fc35a8",
  "lessons/L33.json?v=bda96e46ad",
  "lessons/L34.json?v=435c7ba7ab",
  "lessons/L35.json?v=032cfc7d4b",
  "lessons/L36.json?v=5379d34134",
  "lessons/L37.json?v=be99ca2dc8",
  "lessons/anhang.json?v=3b4b9f3809"
];

const UEBUNGEN = [
  "uebungen/U01.json?v=3d2a210575",
  "uebungen/U02.json?v=26643833dc",
  "uebungen/U03.json?v=f2072ca0ac",
  "uebungen/U04.json?v=7ab8f87daf",
  "uebungen/U05.json?v=1cf6cfd9ab",
  "uebungen/U06.json?v=bd15de4d12",
  "uebungen/U07.json?v=04038dd82a",
  "uebungen/U08.json?v=756cd0697a",
  "uebungen/U09.json?v=cd88d4c8c5",
  "uebungen/U10.json?v=7ffceb04b0",
  "uebungen/U11.json?v=bde3529143",
  "uebungen/U12.json?v=8ac387f23d",
  "uebungen/U13.json?v=a18b865778",
  "uebungen/U14.json?v=8c39957e2b",
  "uebungen/U15.json?v=5db892263c",
  "uebungen/U16.json?v=0c4f6aed46",
  "uebungen/U17.json?v=d73db09d93",
  "uebungen/U18.json?v=73c8e94f19",
  "uebungen/U19.json?v=f06464f1fb",
  "uebungen/U20.json?v=e06f9a3175",
  "uebungen/U21.json?v=02e03a92fb",
  "uebungen/U22.json?v=952598f045",
  "uebungen/U23.json?v=46f265fe1d",
  "uebungen/U24.json?v=0e41fc6dab",
  "uebungen/U25.json?v=14b1f1c65a",
  "uebungen/U26.json?v=12a09fdffe",
  "uebungen/U27.json?v=372646324c",
  "uebungen/U28.json?v=ae99bfab85",
  "uebungen/U29.json?v=194ee86e5b",
  "uebungen/U30.json?v=aee16172dc",
  "uebungen/U31.json?v=d3d74bc4e5",
  "uebungen/U32.json?v=137b1bb42f",
  "uebungen/U33.json?v=082c3b5482",
  "uebungen/U34.json?v=5a9d2306fc",
  "uebungen/U35.json?v=44a778f7d6",
  "uebungen/U36.json?v=a1484954cf",
  "uebungen/U37.json?v=347a786210",
  "uebungen/W1.json?v=3d3df737e0",
  "uebungen/W2.json?v=553871c5de",
  "uebungen/W3.json?v=6dbf119f13",
  "uebungen/W4.json?v=ca89762aa5"
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const page = await fetch(new Request('index.html?sw=' + VERSION, { cache: 'reload' }));
    if (!page.ok) throw new Error('index.html ' + page.status);
    await cache.put('index.html', page);
    for (const url of CORE.concat(LESSONS, UEBUNGEN)) {
      const kept = await caches.match(url);
      if (kept) { await cache.put(url, kept); continue; }
      if (LESSONS.includes(url) || UEBUNGEN.includes(url)) continue; // fetched later by warm()
      const res = await fetch(url);
      if (!res.ok) throw new Error(url + ' ' + res.status);
      await cache.put(url, res);
    }
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith(PREFIX) && key !== CACHE) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data === 'skip-waiting') self.skipWaiting();
  else if (event.data === 'warm') event.waitUntil(warm());
});

/* download every lesson once, so the whole book opens without internet */
async function warm() {
  const cache = await caches.open(CACHE);
  for (const url of LESSONS.concat(UEBUNGEN)) {
    if (await cache.match(url)) continue;
    try {
      const res = await fetch(url);
      if (res.ok) await cache.put(url, res);
    } catch (e) {
      return; // offline: try again on the next visit
    }
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const page = await caches.match('index.html', { cacheName: CACHE }) || await caches.match('index.html');
      return page || fetch(req);
    })());
    return;
  }

  event.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    const res = await fetch(req);
    if (res.ok && res.type === 'basic' && url.search.startsWith('?v=')) {
      const cache = await caches.open(CACHE);
      cache.put(req, res.clone());
    }
    return res;
  })());
});
