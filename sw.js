const CACHE = 'ansha-donuts-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/favicon.png',
  './icons/berries/aspearberry.png',
  './icons/berries/babiriberry.png',
  './icons/berries/chartiberry.png',
  './icons/berries/cheriberry.png',
  './icons/berries/chestoberry.png',
  './icons/berries/chilanberry.png',
  './icons/berries/chopleberry.png',
  './icons/berries/cobaberry.png',
  './icons/berries/colburberry.png',
  './icons/berries/grepaberry.png',
  './icons/berries/habanberry.png',
  './icons/berries/hondewberry.png',
  './icons/berries/hyperaspearberry.png',
  './icons/berries/hyperbabiriberry.png',
  './icons/berries/hyperchartiberry.png',
  './icons/berries/hypercheriberry.png',
  './icons/berries/hyperchestoberry.png',
  './icons/berries/hyperchilanberry.png',
  './icons/berries/hyperchopleberry.png',
  './icons/berries/hypercobaberry.png',
  './icons/berries/hypercolburberry.png',
  './icons/berries/hypergrepaberry.png',
  './icons/berries/hyperhabanberry.png',
  './icons/berries/hyperhondewberry.png',
  './icons/berries/hyperkasibberry.png',
  './icons/berries/hyperkebiaberry.png',
  './icons/berries/hyperkelpsyberry.png',
  './icons/berries/hyperlumberry.png',
  './icons/berries/hyperoccaberry.png',
  './icons/berries/hyperoranberry.png',
  './icons/berries/hyperpasshoberry.png',
  './icons/berries/hyperpayapaberry.png',
  './icons/berries/hyperpechaberry.png',
  './icons/berries/hyperpersimberry.png',
  './icons/berries/hyperpomegberry.png',
  './icons/berries/hyperqualotberry.png',
  './icons/berries/hyperrawstberry.png',
  './icons/berries/hyperrindoberry.png',
  './icons/berries/hyperroseliberry.png',
  './icons/berries/hypershucaberry.png',
  './icons/berries/hypersitrusberry.png',
  './icons/berries/hypertamatoberry.png',
  './icons/berries/hypertangaberry.png',
  './icons/berries/hyperwacanberry.png',
  './icons/berries/hyperyacheberry.png',
  './icons/berries/kasibberry.png',
  './icons/berries/kebiaberry.png',
  './icons/berries/kelpsyberry.png',
  './icons/berries/lumberry.png',
  './icons/berries/occaberry.png',
  './icons/berries/oranberry.png',
  './icons/berries/passhoberry.png',
  './icons/berries/payapaberry.png',
  './icons/berries/pechaberry.png',
  './icons/berries/persimberry.png',
  './icons/berries/pomegberry.png',
  './icons/berries/qualotberry.png',
  './icons/berries/rawstberry.png',
  './icons/berries/rindoberry.png',
  './icons/berries/roseliberry.png',
  './icons/berries/shucaberry.png',
  './icons/berries/sitrusberry.png',
  './icons/berries/tamatoberry.png',
  './icons/berries/tangaberry.png',
  './icons/berries/wacanberry.png',
  './icons/berries/yacheberry.png',
  './icons/donuts/alpha-old-fashioned-donut.png',
  './icons/donuts/bad-dreams-cruller.png',
  './icons/donuts/delta-old-fashioned-donut.png',
  './icons/donuts/omega-old-fashioned-donut.png',
  './icons/donuts/plasma-glazed-donut.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
