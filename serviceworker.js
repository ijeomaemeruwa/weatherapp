const staticWeatherCache = "smash-it-weather-app-v1"
const dynamicWeatherCache = "smash-it-dynamic-app"

const assets = [
  '/',
  './index.html',
  './js/app.js',
  './css/style.css',
  '/icons/01d.png',
  '/icons/01n.png',
  '/icons/02d.png',
  '/icons/02n.png',
  '/icons/03d.png',
  '/icons/03n.png',
  '/icons/04d.png',
  '/icons/04d.png',
  '/icons/09d.png',
  '/icons/09n.png',
  '/icons/10d.png',
  '/icons/10n.png',
  '/icons/11d.png',
  '/icons/11n.png',
  '/icons/13d.png',
  '/icons/50d.png',
  '/icons/50n.png',
  '/icons/unknown.png',
  '/icons/unknown.svg',
  'https://kit.fontawesome.com/3d62637f3e.js'
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
}


//Installing Service Worker
self.addEventListener('install', installEvent => {

    installEvent.waitUntil(
    caches.open(staticWeatherCache).then(cache => {
     cache.addAll(assets)
    })
    )   
})


//Activating Service Worker
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


//Fetching Service Worker
self.addEventListener('fetch', fetchEvent => {
  fetchEvent.respondWith(
  caches.match(fetchEvent.request).then( res => {
  return res || fetch(fetchEvent.request).
  then( async(fetchRes) => {
  const cache = await caches.open(dynamicWeatherCache)
    cache.put(fetchEvent.request.url, fetchRes.clone())
    cacheSize(dynamicWeatherCache, 15)
    return fetchRes
}
);
})
);
})

        

