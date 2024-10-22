// Service Worker
const CACHE_NAME = 'SeriesMingle-cache-v1'
const urlsToCache = [
  '/',
  '/favicon.ico',
  '/index.html',
  '/manifest.json',
  '/robots.txt',
  '/server.js',
  '/sitemap.xml',
  '/icons/192.png',
  '/icons/512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request)),
  )
})

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME]

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName))
            return caches.delete(cacheName)
        }),
      ),
    ),
  )
})
