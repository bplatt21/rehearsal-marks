const CACHE = "rehearsal-marks-v2";
const PRECACHE = ["/", "/index.html", "/manifest.json", "/icon-192.png", "/icon-512.png", "/icon-180.png", "/audio/chunk_01.mp3", "/audio/chunk_02.mp3", "/audio/chunk_03.mp3", "/audio/chunk_04.mp3", "/audio/chunk_05.mp3", "/audio/chunk_06.mp3", "/audio/chunk_07.mp3", "/audio/chunk_08.mp3", "/audio/chunk_09.mp3", "/audio/chunk_10.mp3", "/audio/chunk_11.mp3", "/audio/chunk_12.mp3", "/audio/chunk_13.mp3", "/audio/chunk_14.mp3", "/audio/chunk_15.mp3", "/audio/chunk_16.mp3", "/audio/chunk_17.mp3", "/audio/chunk_18.mp3", "/audio/chunk_19.mp3", "/audio/chunk_20.mp3", "/audio/chunk_21.mp3", "/audio/chunk_22.mp3", "/audio/chunk_23.mp3", "/audio/chunk_24.mp3", "/audio/chunk_25.mp3", "/audio/chunk_26.mp3", "/audio/chunk_27.mp3", "/audio/chunk_28.mp3", "/audio/chunk_29.mp3", "/audio/chunk_30.mp3", "/audio/chunk_31.mp3", "/audio/chunk_32.mp3", "/audio/chunk_33.mp3", "/audio/chunk_34.mp3", "/audio/chunk_35.mp3", "/audio/chunk_36.mp3", "/audio/chunk_37.mp3", "/audio/chunk_38.mp3", "/audio/chunk_39.mp3", "/audio/chunk_40.mp3", "/audio/chunk_41.mp3", "/audio/chunk_42.mp3", "/audio/chunk_43.mp3", "/audio/chunk_44.mp3", "/audio/chunk_45.mp3", "/audio/chunk_46.mp3", "/audio/chunk_47.mp3", "/audio/chunk_48.mp3", "/audio/chunk_49.mp3", "/audio/chunk_50.mp3", "/audio/chunk_51.mp3", "/audio/chunk_52.mp3", "/audio/chunk_53.mp3", "/audio/chunk_54.mp3", "/audio/chunk_55.mp3", "/audio/chunk_56.mp3", "/audio/chunk_57.mp3", "/audio/chunk_58.mp3", "/audio/chunk_59.mp3", "/audio/chunk_60.mp3", "/audio/chunk_61.mp3", "/audio/chunk_62.mp3", "/audio/chunk_63.mp3", "/audio/chunk_64.mp3", "/audio/chunk_65.mp3", "/audio/chunk_66.mp3"];

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
