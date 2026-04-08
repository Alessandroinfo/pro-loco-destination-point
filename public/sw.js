const CACHE_NAME = "pro-loco-discovery-point-v11";

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

// Critical assets — precached atomically. Must all succeed.
const CORE_ASSETS = [
  "/manifest.webmanifest",
  "/en/manifest.webmanifest",
  "/totem/manifest.webmanifest",
  "/totem/en/manifest.webmanifest",
  "/assets/brand/logos/pro-loco.svg",
  "/assets/brand/logos/pro-loco-white.svg",
  "/assets/brand/social/og-image.svg",
  "/assets/pwa/icons/icon-192.png",
  "/assets/pwa/icons/icon-512.png",
  "/assets/pwa/icons/icon-512-maskable.png",
  "/assets/catalog/placeholders/categories/experiences.svg",
  "/assets/catalog/placeholders/categories/dining.svg",
  "/assets/catalog/placeholders/categories/hospitality.svg",
  "/assets/catalog/placeholders/categories/renting.svg",
  "/assets/catalog/placeholders/categories/shopping.svg",
  "/assets/catalog/placeholders/categories/info.svg",
  "/assets/maps/placeholders/pelagie-overview.svg",
  "/assets/maps/placeholders/point-of-interest.svg",
  "/assets/video/screensaver/poster.svg"
];

// Large assets — cached best-effort so they never block SW install.
const VIDEO_ASSETS = ["/assets/video/screensaver/boat-video.mp4"];

// _next/static/ assets (JS chunks, CSS, woff2 fonts).
// This array is empty in the source file and is injected automatically by
// scripts/inject-sw-precache.mjs after every `npm run build`.
// Without injection the app still works online; offline it degrades gracefully.
const NEXT_STATIC_ASSETS = [];

const BUSINESS_ASSETS = ["experiences", "dining", "hospitality", "renting", "shopping", "info"].flatMap((categoryId) =>
  Array.from({ length: 6 }, (_, index) => `/assets/catalog/placeholders/businesses/${categoryId}/${index + 1}.svg`)
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
  const standardRoutes = STATIC_ROUTES.flatMap((route) => [
    withBasePath(route, { route: true }),
    withBasePath(route === "/" ? "/en/" : `/en${route}`, { route: true })
  ]);
  const totemRoutes = STATIC_ROUTES.flatMap((route) => [
    withBasePath(route === "/" ? "/totem/" : `/totem${route}`, { route: true }),
    withBasePath(route === "/" ? "/totem/en/" : `/totem/en${route}`, { route: true })
  ]);
  const coreAssets = CORE_ASSETS.map((asset) => withBasePath(asset));
  const businessAssets = BUSINESS_ASSETS.map((asset) => withBasePath(asset));
  const nextStaticAssets = NEXT_STATIC_ASSETS.map((asset) => withBasePath(asset));

  return [...standardRoutes, ...totemRoutes, ...coreAssets, ...businessAssets, ...nextStaticAssets];
}

// Only bypass the SW itself and source maps — everything else goes through
// the cache-first handler so it works offline (including _next/static/ bundles).
function shouldBypassRuntimeCache(requestUrl) {
  if (requestUrl.pathname === withBasePath("/sw.js")) {
    return true;
  }

  if (/\.map$/i.test(requestUrl.pathname)) {
    return true;
  }

  return false;
}

// Wraps fetch() with an AbortController timeout.
// When the signal fires the fetch rejects with an AbortError,
// which causes the navigate handler to fall back to the cache immediately.
function fetchWithTimeout(request, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(request, { signal: controller.signal }).finally(() => clearTimeout(timeoutId));
}

// Video elements on Safari/iOS send Range requests and strictly require a
// 206 Partial Content response. The SW caches the full 200 response, so we
// slice it here and rebuild the correct partial response.
async function handleRangeRequest(request, cachedResponse) {
  const rangeHeader = request.headers.get("range");

  if (!rangeHeader) {
    return cachedResponse;
  }

  const blob = await cachedResponse.blob();
  const match = /bytes=(\d+)-(\d*)/.exec(rangeHeader);

  if (!match) {
    return cachedResponse;
  }

  const start = Number(match[1]);
  const end = match[2] ? Number(match[2]) : blob.size - 1;
  const slicedBlob = blob.slice(start, end + 1);

  return new Response(slicedBlob, {
    status: 206,
    statusText: "Partial Content",
    headers: {
      "Content-Type": cachedResponse.headers.get("Content-Type") ?? "video/mp4",
      "Content-Range": `bytes ${start}-${end}/${blob.size}`,
      "Content-Length": String(slicedBlob.size),
      "Accept-Ranges": "bytes"
    }
  });
}
    
    self.addEventListener("message", (event) => {
      if (event.data?.type === "SKIP_WAITING") {
        self.skipWaiting();
      }
    });

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Routes + images: atomic — if any of these fail the SW does not install.
      await cache.addAll(getPrecacheEntries());

      // Video: best-effort — a failure here does not block SW install.
      // On slow connections the 25 MB file could time out and would otherwise
      // cause cache.addAll() to reject, leaving the user with zero offline support.
      const videoUrls = VIDEO_ASSETS.map((asset) => withBasePath(asset));
      await Promise.allSettled(videoUrls.map((url) => cache.add(url)));
    })
  );
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

  // Navigation requests: network-first with a 3-second timeout.
  // On flaky connections this avoids the 30+ second wait for TCP timeout
  // before the cached page is finally served.
  if (event.request.mode === "navigate") {
    const totemRoot = withBasePath("/totem", { route: true }).replace(/\/$/, "");
    const totemFallbackRoute = withBasePath("/totem/", { route: true });
    const totemEnglishRoot = withBasePath("/totem/en", { route: true }).replace(/\/$/, "");
    const totemEnglishFallbackRoute = withBasePath("/totem/en/", { route: true });
    const standardFallbackRoute = withBasePath("/", { route: true });
    const englishRoot = withBasePath("/en", { route: true }).replace(/\/$/, "");
    const englishFallbackRoute = withBasePath("/en/", { route: true });
    const fallbackRoute =
      requestUrl.pathname === totemEnglishRoot || requestUrl.pathname.startsWith(totemEnglishFallbackRoute)
        ? totemEnglishFallbackRoute
        : requestUrl.pathname === totemRoot || requestUrl.pathname.startsWith(totemFallbackRoute)
        ? totemFallbackRoute
        : requestUrl.pathname === englishRoot || requestUrl.pathname.startsWith(englishFallbackRoute)
          ? englishFallbackRoute
        : standardFallbackRoute;

    event.respondWith(
      fetchWithTimeout(event.request, 3000)
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

  // Asset requests (images, video, JS bundles, CSS, etc.): cache-first.
  // _next/static/ files are intentionally included — they are cached at
  // runtime on first load so they are available on subsequent offline visits.
  event.respondWith(
    caches.match(event.request, { ignoreVary: true }).then(async (cachedResponse) => {
      if (cachedResponse) {
        // Serve range requests (video) with a proper 206 response so Safari
        // and iOS do not block playback.
        if (event.request.headers.has("range")) {
          return handleRangeRequest(event.request, cachedResponse);
        }

        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        if (response.ok && event.request.url.startsWith(self.location.origin)) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }

        return response;
      });
    })
  );
});
