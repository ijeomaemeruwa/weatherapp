self.addEventListener('install', (event) => {
    console.log('SW Installed');
    event.waitUntil(
        caches.open('static')
    .then(function(cache) {
     cache.addAll([
       '/',
       '../html/index.html',
       '../app.js',
       '../style.css',
       'icons',
       'https://kit.fontawesome.com/3d62637f3e.js'
     ]); 
    })
    );   
});


self.addEventListener('activate', () => {
    console.log('SW Activated');
})


self.addEventListener('fetch', (e) => {
  e.respondWith(
   caches.match(e.request)
   .then(function(res) {
       if(res) {
           return res;
       } else {
           return fetch(e.request);
       }
   })
  );
});