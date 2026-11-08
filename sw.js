// アプリを更新したら CACHE_VERSION を上げてください(古いキャッシュが破棄されます)
const CACHE_VERSION = 'v20';
const CACHE_NAME = 'handwriting-memo-' + CACHE_VERSION;
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './jspdf.umd.min.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('handwriting-memo-') && k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// キャッシュ優先で即表示し、裏で最新版を取得して次回に反映(stale-while-revalidate)
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      const cached = await cache.match(req, { ignoreSearch: true });
      const network = fetch(req).then(res => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => null);
      if (cached) { event.waitUntil(network); return cached; }
      const res = await network;
      if (res) return res;
      if (req.mode === 'navigate') return cache.match('./index.html');
      return new Response('', { status: 504, statusText: 'Offline' });
    })
  );
});
