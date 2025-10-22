const CACHE_NAME = "swim-attendance-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./tailwind.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  // ✅ تحديث تلقائي للنسخة الجديدة
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  // ✅ فوراً خليه يستخدم النسخة الجديدة
  self.clients.claim();
});


self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      // Network falling back to cache for POST/others not cached
      return res || fetch(e.request).catch(() => res);
    })
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});
