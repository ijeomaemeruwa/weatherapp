//Register Service workers
if('serviceworker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker
        .register('/serviceworker.js')
        .then(res => console.log('Service worker registered'))
        .catch(err => console.log('Service weorker not registered', err))
    })   
}