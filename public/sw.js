const staticWeatherCache = "site-static-v20";
const dynamicWeatherCache = "site-dynamiv-v19";


const assets = [
  '/',
  '/index.html',
  '/offline.html',
  '/css/style.css',
  '/js/app.js',
  '/js/sw.js',
  '/images/icons/01d.png',
  '/images/icons/01n.png',
  '/images/icons/02d.png',
  '/images/icons/02n.png',
  '/images/icons/03d.png',
  '/images/icons/03n.png',
  '/images/icons/04d.png',
  '/images/icons/04d.png',
  '/images/icons/09d.png',
  '/images/icons/09n.png',
  '/images/icons/10d.png',
  '/images/icons/10n.png',
  '/images/icons/11d.png',
  '/images/icons/11n.png',
  '/images/icons/13d.png',
  '/images/icons/50d.png',
  '/images/icons/50n.png',
  '/images/icons/unknown.png',
  '/images/icons/unknown.svg',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap'
]

//Limit cache size
const cacheSize = (name, size) => {
  caches.open(name).then(cache => {
  cache.keys().then(keys => {
    if(keys.length > size) {
    cache.delete(keys[0]).then(cacheSize(name, size))
  }
  })
})
};


//Installing Service Worker
self.addEventListener('install', installEvent => {
  installEvent.waitUntil(
    caches.open(staticWeatherCache).then(cache => {
     cache.addAll(assets)
    })
  );   
});


//Activate Service Worker
self.addEventListener('activate', activateEvt => {
  activateEvt.waitUntil(
    caches.keys().then(keys => {
    return Promise.all(keys
    .filter(key => key !== staticWeatherCache && key !== dynamicWeatherCache)
    .map(key => caches.delete(key))
  )
  })
)
});


//Fetch Service Worker     
self.addEventListener('fetch', fetchEvent => {
  fetchEvent.respondWith(
  caches.match(fetchEvent.request).then(res => {
    return res || fetch(fetchEvent.request).then(fetchRes => {
    return caches.open(dynamicWeatherCache).then(cache => {
  cache.put(fetchEvent.request.url, fetchRes.clone());
    cacheSize(dynamicWeatherCache, 15);
    return fetchRes;
  })
  })
  }).catch(() => {
    if(fetchEvent.request.url.indexOf('.html') > -1){
      return caches.match('/offline.html');
    }  
  })  
 )
});

