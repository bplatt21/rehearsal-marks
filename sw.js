const CACHE = "rehearsal-marks-v1";
const PRECACHE = ["/", "/index.html", "/manifest.json", "/icon-192.png", "/icon-512.png", "/icon-180.png", "/audio/chunk_01.mp3", "/audio/chunk_02.mp3", "/audio/chunk_03.mp3", "/audio/chunk_04.mp3", "/audio/chunk_05.mp3", "/audio/chunk_06.mp3", "/audio/chunk_07.mp3", "/audio/chunk_08.mp3", "/audio/chunk_09.mp3", "/audio/chunk_10.mp3", "/audio/chunk_11.mp3", "/audio/chunk_12.mp3", "/audio/chunk_13.mp3", "/audio/chunk_14.mp3", "/audio/chunk_15.mp3", "/audio/chunk_16.mp3", "/audio/chunk_17.mp3", "/audio/chunk_18.mp3", "/audio/chunk_19.mp3", "/audio/chunk_20.mp3", "/audio/chunk_21.mp3", "/audio/chunk_22.mp3"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
