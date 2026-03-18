const CACHE_NAME = "pro-loco-hub-v3";
const STATIC_ROUTES = [
  "/",
  "/map/",
  "/categories/experiences/",
  "/categories/dining/",
  "/categories/hospitality/",
  "/categories/renting/",
  "/categories/info/",
  "/categories/experiences/mare-vivo-diving/",
  "/categories/experiences/vento-di-scirocco/",
  "/categories/dining/porto-doro/",
  "/categories/dining/cala-bianca-bistrot/",
  "/categories/hospitality/suites-dei-coralli/",
  "/categories/hospitality/linosa-casa-luce/",
  "/categories/renting/island-rent-premium/",
  "/categories/renting/vento-lounge-charter/",
  "/categories/info/pelagie-help-desk/",
  "/categories/info/mobilita-pelagie/"
];

const CORE_ASSETS = [
  "/manifest.webmanifest",
  "/boat-video.mp4",
  "/logo-pro-loco.svg",
  "/logo-pro-loco-white.svg",
  "/og-image.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-512-maskable.png",
  "/placeholders/category-experiences.svg",
  "/placeholders/category-dining.svg",
  "/placeholders/category-hospitality.svg",
  "/placeholders/category-renting.svg",
  "/placeholders/category-info.svg",
  "/placeholders/category-map.svg",
  "/placeholders/screensaver-poster.svg"
];

const BUSINESS_ASSETS = ["experience", "dining", "hospitality", "renting", "info"].flatMap((prefix) =>
  Array.from({ length: 6 }, (_, index) => `/placeholders/business-${prefix}-${index + 1}.svg`)
);

self.addEventListener("install", (event) => {
  const precacheEntries = [...STATIC_ROUTES, ...CORE_ASSETS, ...BUSINESS_ASSETS];

  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(precacheEntries)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }

          return Promise.resolve();
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(event.request);
          return cachedPage ?? caches.match("/");
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((response) => {
          if (response.ok && event.request.url.startsWith(self.location.origin)) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => caches.match("/"));
    })
  );
});
