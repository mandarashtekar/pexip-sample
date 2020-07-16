var cacheName = 'pexip-sample-personal';
var filesToCache = [
  'index.html',
  'videoconf.html',
  'css/style.css',
  'js/index.js',
  'js/webui.js',
  'js/main.js',
  'js/pexrtcV20.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
