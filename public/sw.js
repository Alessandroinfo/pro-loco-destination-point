const CACHE_NAME = "pro-loco-hub-v8";

const STATIC_ROUTES = [
  "/",
  "/map/",
  "/categories/experiences/",
  "/categories/dining/",
  "/categories/hospitality/",
  "/categories/renting/",
  "/categories/shopping/",
  "/categories/info/",
  "/categories/experiences/mare-vivo-diving/",
  "/categories/experiences/vento-di-scirocco/",
  "/categories/dining/porto-doro/",
  "/categories/dining/cala-bianca-bistrot/",
  "/categories/hospitality/suites-dei-coralli/",
  "/categories/hospitality/linosa-casa-luce/",
  "/categories/renting/island-rent-premium/",
  "/categories/renting/vento-lounge-charter/",
  "/categories/shopping/isola-di-lino/",
  "/categories/shopping/bottega-del-porto/",
  "/categories/shopping/coralli-boutique/",
  "/categories/shopping/pelagie-concept-store/",
  "/categories/shopping/casa-grecale/",
  "/categories/shopping/sette-venti/",
  "/categories/shopping/cala-bianca-souvenir/",
  "/categories/shopping/lab-mediterraneo/",
  "/categories/shopping/sabbia-chiara-kids/",
  "/categories/shopping/via-roma-boutique/",
  "/categories/shopping/blu-cobalto-atelier/",
  "/categories/shopping/porto-piccolo-market/",
  "/categories/shopping/pozzolana-store/",
  "/categories/shopping/linosa-made/",
  "/categories/shopping/isola-sunwear/",
  "/categories/shopping/filo-di-sale/",
  "/categories/shopping/marea-boutique/",
  "/categories/shopping/tramontana-shop/",
  "/categories/shopping/nasse-e-trame/",
  "/categories/shopping/pelagos-wear/",
  "/categories/info/pelagie-help-desk/",
  "/categories/info/mobilita-pelagie/"
];

const CORE_ASSETS = [
  "/manifest.webmanifest",
  "/totem/manifest.webmanifest",
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
  "/placeholders/category-shopping.svg",
  "/placeholders/category-info.svg",
  "/placeholders/category-map.svg",
  "/placeholders/screensaver-poster.svg"
];

const BUSINESS_ASSETS = ["experience", "dining", "hospitality", "renting", "shopping", "info"].flatMap((prefix) =>
  Array.from({ length: 6 }, (_, index) => `/placeholders/business-${prefix}-${index + 1}.svg`)
);

function normalizeRoute(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function normalizeAsset(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

function getBasePath() {
  const scopeUrl = new URL(self.registration.scope);
  const normalizedScopePath = scopeUrl.pathname.endsWith("/") ? scopeUrl.pathname.slice(0, -1) : scopeUrl.pathname;

  return normalizedScopePath === "" ? "" : normalizedScopePath;
}

function withBasePath(pathname, { route = false } = {}) {
  const basePath = getBasePath();
  const normalizedPathname = route ? normalizeRoute(pathname) : normalizeAsset(pathname);

  if (!basePath) {
    return normalizedPathname;
  }

  if (normalizedPathname === "/") {
    return `${basePath}/`;
  }

  return `${basePath}${normalizedPathname}`;
}

function getPrecacheEntries() {
  const standardRoutes = STATIC_ROUTES.map((route) => withBasePath(route, { route: true }));
  const totemRoutes = STATIC_ROUTES.map((route) =>
    withBasePath(route === "/" ? "/totem/" : `/totem${route}`, { route: true })
  );
  const coreAssets = CORE_ASSETS.map((asset) => withBasePath(asset));
  const businessAssets = BUSINESS_ASSETS.map((asset) => withBasePath(asset));

  return [...standardRoutes, ...totemRoutes, ...coreAssets, ...businessAssets];
}

function shouldBypassRuntimeCache(requestUrl) {
  const basePath = getBasePath();
  const nextAssetPrefix = `${basePath}/_next/`;

  if (requestUrl.pathname.startsWith(nextAssetPrefix)) {
    return true;
  }

  if (requestUrl.pathname === withBasePath("/sw.js")) {
    return true;
  }

  if (/\.(?:js|css|map|txt)$/i.test(requestUrl.pathname)) {
    return true;
  }

  return false;
}

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(getPrecacheEntries())));
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

  const requestUrl = new URL(event.request.url);

  if (shouldBypassRuntimeCache(requestUrl)) {
    event.respondWith(fetch(event.request));
    return;
  }

  if (event.request.mode === "navigate") {
    const totemRoot = withBasePath("/totem", { route: true }).replace(/\/$/, "");
    const totemFallbackRoute = withBasePath("/totem/", { route: true });
    const standardFallbackRoute = withBasePath("/", { route: true });
    const fallbackRoute =
      requestUrl.pathname === totemRoot || requestUrl.pathname.startsWith(totemFallbackRoute)
        ? totemFallbackRoute
        : standardFallbackRoute;

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
          return cachedPage ?? caches.match(fallbackRoute) ?? caches.match(standardFallbackRoute);
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
        .catch(() => caches.match(withBasePath("/", { route: true })));
    })
  );
});
