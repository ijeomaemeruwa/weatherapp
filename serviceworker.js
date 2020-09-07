self.addEventListener('install', installEvent => {
    console.log('Service Worker Installed');

    installEvent.waitUntil(
    caches.open('static')
    .then(cache => {
     cache.addAll([
       '/',
       'index.html',
       'app.js',
       'style.css',
       '/icons',
       'https://kit.fontawesome.com/3d62637f3e.js'
     ]); 
    })
    );   
});


self.addEventListener('activate', () => {
    console.log('Service Worker Activated');
})


self.addEventListener('fetch', fetchEvent => {
  fetchEvent.respondWith(
   caches.match(fetchEvent.request)
   .then(res => {
      return res || fetch(fetchEvent.request)
   })
  );
});