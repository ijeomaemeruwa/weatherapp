//Register Service workers
if('serviceWorker' in navigator) {
   // window.addEventListener('load', function() {
        navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('Service worker registered', reg))
        .catch((err) => console.log('Service worker not registered', err))
   
}