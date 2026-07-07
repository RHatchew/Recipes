/* Recipe Library service worker
   - App code (index.html) and data (recipes.json): network-first, so the newest
     version loads every time the app opens online. Falls back to cache when offline.
   - Icons/manifest: cache-first (they rarely change).
*/
const VERSION = 'recipes-v2';
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
  if (e.request.method !== 'GET') return;                 // never touch writes/API
  if (url.origin !== self.location.origin) return;        // let GitHub API + fonts pass through

  const isData  = url.pathname.endsWith('/recipes.json');
  const isShell = e.request.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/');

  // recipes.json: network-first, cache as offline backup
  if (isData) {
    e.respondWith(
      fetch(e.request).then(res => { const c = res.clone(); caches.open(VERSION).then(x => x.put('./recipes.json', c)); return res; })
        .catch(() => caches.match('./recipes.json'))
    );
    return;
  }

  // app shell / navigations: network-first so updates show up on open; cached copy offline
  if (isShell) {
    e.respondWith(
      fetch(e.request).then(res => { const c = res.clone(); caches.open(VERSION).then(x => x.put('./index.html', c)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // everything else (icons, manifest): cache-first
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request))
  );
});
