const cacheName = 'swiftnation';
const cacheUrls = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  'images/Taylor_Swift_2020_TS_logo.svg.png',
  'images/Taylor_Swift_2020_TS_logo.svg.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(cacheUrls);
    })
  );
});

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

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
  .then(function(registration) {
    console.log('Service Worker Registered');
  })
  .catch(function(error) {
    console.error('Error registering Service Worker:', error);
  });
  
  navigator.serviceWorker.ready.then(function(registration) {
    registration.update();
  });
}
