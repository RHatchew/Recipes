/* Recipe Library service worker: offline shell + fresh data when online */
const VERSION = 'recipes-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest',
               './icon-180.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;                 // never touch API writes
  if (url.origin !== self.location.origin) return;        // let GitHub API + fonts pass through

  // recipes.json: network-first so everyone gets the latest, cache as backup
  if (url.pathname.endsWith('/recipes.json')) {
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put('./recipes.json', copy));
        return res;
      }).catch(() => caches.match('./recipes.json'))
    );
    return;
  }

  // app shell: cache-first, fall back to network, then to index for navigations
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit =>
      hit || fetch(e.request).catch(() => e.request.mode === 'navigate' ? caches.match('./index.html') : undefined)
    )
  );
});
