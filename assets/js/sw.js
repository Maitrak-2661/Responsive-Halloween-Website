/*=============== SERVICE WORKER — Halloween Night ===============*/
/*
 * Cache strategy: Cache-first for all pre-cached assets,
 * falling back to the network for anything not in the cache.
 *
 * Bump CACHE_VERSION whenever you deploy updated assets so the
 * old cache is deleted and visitors receive fresh files.
 */

const CACHE_VERSION = 'halloween-v4'

// All paths are relative to the service worker's location (project root).
const PRECACHE_URLS = [
    /* Page */
    './index.html',
    './manifest.json',

    /* Styles */
    './assets/css/styles.css',
    './assets/css/swiper-bundle.min.css',

    /* Scripts */
    './assets/js/main.js',
    './assets/js/swiper-bundle.min.js',
    './assets/js/scrollreveal.min.js',

    /* Icons */
    './assets/img/favicon.png',
    './assets/img/icon-192.png',
    './assets/img/icon-512.png',

    /* Core images — hero, logo, nav decoration */
    './assets/img/logo.png',
    './assets/img/nav-img.png',
    './assets/img/home1-img.png',
    './assets/img/home2-img.png',
    './assets/img/home3-img.png',

    /* Below-fold images */
    './assets/img/about-img.png',
    './assets/img/category1-img.png',
    './assets/img/category2-img.png',
    './assets/img/category3-img.png',
    './assets/img/discount-img.png',
    './assets/img/new1-img.png',
    './assets/img/new2-img.png',
    './assets/img/new3-img.png',
    './assets/img/new4-img.png',
    './assets/img/new5-img.png',
    './assets/img/new6-img.png',
    './assets/img/trick-treat1-img.png',
    './assets/img/trick-treat2-img.png',
    './assets/img/trick-treat3-img.png',
    './assets/img/trick-treat4-img.png',
    './assets/img/trick-treat5-img.png',
    './assets/img/trick-treat6-img.png',
    './assets/img/footer1-img.png',
    './assets/img/footer2-img.png'
]

/*===== INSTALL — pre-cache all core assets =====*/
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting()) // activate immediately
    )
})

/*===== ACTIVATE — delete stale caches from previous versions =====*/
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys
                    .filter(key => key !== CACHE_VERSION)
                    .map(key => caches.delete(key))
            ))
            .then(() => self.clients.claim()) // take control of open pages
    )
})

/*===== FETCH — cache-first strategy =====*/
self.addEventListener('fetch', event => {
    // Only handle GET requests; skip cross-origin requests (CDN fonts/icons)
    if (event.request.method !== 'GET') return
    if (!event.request.url.startsWith(self.location.origin)) return

    event.respondWith(
        caches.match(event.request)
            .then(cached => {
                if (cached) return cached

                // Not in cache — fetch from network and store for next time
                return fetch(event.request)
                    .then(response => {
                        // Only cache valid same-origin responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response
                        }
                        const responseClone = response.clone()
                        caches.open(CACHE_VERSION)
                            .then(cache => cache.put(event.request, responseClone))
                        return response
                    })
            })
    )
})
