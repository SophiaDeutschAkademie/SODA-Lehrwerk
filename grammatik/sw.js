/* Lehrwerk Grammatik — offline cache.
   Every file name below carries ?v=<content hash>, so a new upload only
   re-downloads the files that actually changed. */
const VERSION = '79732dd026';
const PREFIX = 'lehrwerk-grammatik-';
const CACHE = PREFIX + VERSION;
const CORE = [
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
  "lessons/L01.json?v=e466de97c5",
  "lessons/L02.json?v=da8b6d4d19",
  "lessons/L03.json?v=c87526baf4",
  "lessons/L04.json?v=77bbaad68c",
  "lessons/L05.json?v=dd15336942",
  "lessons/L06.json?v=9996f8b200",
  "lessons/L07.json?v=3bb813cf0e",
  "lessons/L08.json?v=f5fc4c8b1a",
  "lessons/L09.json?v=68e9a47874",
  "lessons/L10.json?v=1704021d27",
  "lessons/L11.json?v=ca70363759",
  "lessons/L12.json?v=b2e28db1f0",
  "lessons/L13.json?v=31674a6a81",
  "lessons/L14.json?v=f4b013cf6c",
  "lessons/L15.json?v=733720004d",
  "lessons/L16.json?v=b5941892e6",
  "lessons/L17.json?v=1a7882e3bd",
  "lessons/L18.json?v=84e2aeb6d1",
  "lessons/L19.json?v=f2b341af2a",
  "lessons/L20.json?v=fb9cc1cc4f",
  "lessons/L21.json?v=6ea7e352c8",
  "lessons/L22.json?v=33f962b774",
  "lessons/L23.json?v=0123655bc7",
  "lessons/L24.json?v=66f1ae5c4b",
  "lessons/L25.json?v=fe815e890d",
  "lessons/L26.json?v=d903f765af",
  "lessons/L27.json?v=5c12ebb4c0",
  "lessons/L28.json?v=405259d995",
  "lessons/L29.json?v=ba96928820",
  "lessons/L30.json?v=96b6cf816c",
  "lessons/L31.json?v=199a53fab8",
  "lessons/L32.json?v=32c9dd6b00",
  "lessons/L33.json?v=cbf5f68b27",
  "lessons/L34.json?v=43c12211fa",
  "lessons/L35.json?v=e76544c338",
  "lessons/L36.json?v=e8db682554",
  "lessons/L37.json?v=8f11bd9420",
  "lessons/anhang.json?v=7baa5408b1"
];

const UEBUNGEN = [
  "uebungen/U01.json?v=b46f5a25c9",
  "uebungen/U02.json?v=a7fc06be3b",
  "uebungen/U03.json?v=ee438399ec",
  "uebungen/U04.json?v=da5b439729",
  "uebungen/U05.json?v=4fc169b186",
  "uebungen/U06.json?v=94ee8947e4",
  "uebungen/U07.json?v=77f00b385a",
  "uebungen/U08.json?v=94954df8aa",
  "uebungen/U09.json?v=74e4360bad",
  "uebungen/U10.json?v=6c5e60ccec",
  "uebungen/U11.json?v=284a6e99ce",
  "uebungen/U12.json?v=66f674becc",
  "uebungen/U13.json?v=215ee20076",
  "uebungen/U14.json?v=45ee59d146",
  "uebungen/U15.json?v=a84505aff8",
  "uebungen/U16.json?v=c3d444fbab",
  "uebungen/U17.json?v=0e349f32f2",
  "uebungen/U18.json?v=c2ee5c1a8b",
  "uebungen/U19.json?v=955c586fd2",
  "uebungen/U20.json?v=ae3e1c4597",
  "uebungen/U21.json?v=b8e538962e",
  "uebungen/U22.json?v=df37eff2a8",
  "uebungen/U23.json?v=584775bdf6",
  "uebungen/U24.json?v=f6426025fa",
  "uebungen/U25.json?v=36417f1744",
  "uebungen/U26.json?v=47bd01ee98",
  "uebungen/U27.json?v=faaa2b9983",
  "uebungen/U28.json?v=7361c2f470",
  "uebungen/U29.json?v=2247f82dce",
  "uebungen/U30.json?v=e4885e4a94",
  "uebungen/U31.json?v=6366ad479b",
  "uebungen/U32.json?v=3dcac39874",
  "uebungen/U33.json?v=c59cc16506",
  "uebungen/U34.json?v=628f4ff073",
  "uebungen/U35.json?v=39cb5a9c25",
  "uebungen/U36.json?v=e5289be832",
  "uebungen/U37.json?v=02bd81e56f"
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
