// Define o escopo do Service Worker
const cacheName = 'swift-nation-rodrigo';
const cacheUrls = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  '/img/logo.png',
  '/img/swift.jpg',
];

// Instala o Service Worker e adiciona o cache inicial
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(cacheUrls);
    })
  );
});

// Ativa o Service Worker e exclui os caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

// Intercepta as solicitações de rede e usa o cache, se disponível
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
