// Asignar nombre a la cache
// CONSTANTE
const CACHE_NAME = "vi_cache_PWA";

var urlsToCache = [
    "./icon/icon-16x16.jpeg",
    "./icon/icon-32x32.jpeg",
    "./icon/icon-64x64.jpeg",
    "./icon/icon-96x96.jpeg",
    "./icon/icon-128x128.jpeg",
    "./icon/icon-192x192.jpeg",
    "./icon/icon-256x256.jpeg",
    "./icon/icon-384x384.jpeg",
    "./icon/icon-512x512.jpeg",
    "./icon/icon-1024x1024.jpeg",
    "./icon/icon-144x144.png",
    "./icon.png",
    "./assets/img/yo.png",
    "./assets/img/letters.gif",
    "./assets/img/building.jpg",
    "./index.html",
    "./main.js",
    "./manifest.json",
    "./sw.js"
];

// Evento install
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(async cache => {
            await cache.addAll(urlsToCache);
            self.skipWaiting();
        })
        .catch(err => console.log('No se ha registrado la cache', err))
    );
});

// Evento activate
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        // Borrar elementos que no se necesitan
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            // Activar cache
            self.clients.claim();
        })
    );
});

// Evento fetch
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                // devolver datos desde cache
                return res;
            }
            return fetch(e.request);
        })
    );
});
