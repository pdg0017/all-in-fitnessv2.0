const CACHE_NAME = 'all-in-fitness-v2';
const CANDIDATE_ASSETS = ['/', '/manifest.webmanifest', '/logo.png', '/icons/icon-192.png', '/icons/icon-512.png'];
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    try { await cache.addAll(CANDIDATE_ASSETS); }
    catch { await Promise.all(CANDIDATE_ASSETS.map(async u => { try { await cache.add(u); } catch {} })); }
    self.skipWaiting();
  })());
});
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    self.clients.claim();
  })());
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match('/')));
  } else {
    event.respondWith((async () => {
      const hit = await caches.match(req);
      if (hit) return hit;
      try {
        const resp = await fetch(req);
        const copy = resp.clone();
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, copy);
        return resp;
      } catch (err) { throw err; }
    })());
  }
});