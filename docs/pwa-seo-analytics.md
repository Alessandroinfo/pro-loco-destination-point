# PWA, SEO, Analytics

## SEO

- Public pages are the only indexable URLs.
- `/totem` pages emit `noindex, nofollow`.
- `/totem` pages canonicalize to the matching public URL.
- `robots.txt` disallows `/totem`.
- `sitemap.xml` includes only the public canonical routes.
- Structured data is emitted only on indexable public pages.

## PWA

- Standard manifest: `/manifest.webmanifest`
- Standard English manifest: `/en/manifest.webmanifest`
- Totem manifest: `/totem/manifest.webmanifest`
- Totem English manifest: `/totem/en/manifest.webmanifest`
- Each manifest uses `start_url` and `scope` aligned with its own routing subtree.
- Manifest URLs, icons, service worker registration, and asset URLs are base-path aware.

This allows the public app and the kiosk app to be installable with the correct startup context.

## Offline Support

- The shared service worker is registered from `/sw.js`.
- When the app is hosted under a subpath, the registration and cache scope are automatically adjusted to that base path.
- It precaches:
  - public routes
  - `/en` routes
  - `/totem` routes
  - `/totem/en` routes
  - core icons, video, placeholders, and manifests
- Offline navigation falls back to:
  - `/` for the public app
  - `/en/` for the English public app
  - `/totem/` for the kiosk app
  - `/totem/en/` for the English kiosk app

The current route list is manually maintained in `public/sw.js`, so if new content routes are added later the precache list must be updated as part of that change.

## Testing the PWA Locally

The service worker is intentionally disabled only while running the development server. On every `dev` page load, a script in `components/layout/site-root-layout.tsx` deregisters all service workers and clears all caches.

This prevents a cached production SW from intercepting the dev server's hot-reload requests and hiding code changes.

As a result, the following things do **not** work with `npm run dev`:

- Service worker registration
- `beforeinstallprompt` (requires SW + HTTPS or localhost with SW)
- Install app banner (requires the above)

To test the full PWA experience locally, build and serve the static export instead:

```bash
npm run build && npm start
```

With a production build served locally, the service worker remains active, so offline navigation and manifest installability can be tested on `localhost` as well.

The install banner is also intentionally rendered only in `production` mode, so it is never shown while running the dev server even if the SW check were bypassed.

To test from a **mobile device on the same network**, find your Mac's local IP address and open `http://<ip>:3000` on the device. Note that `beforeinstallprompt` requires HTTPS except on localhost, so Chrome on Android will not show the native install prompt over plain HTTP on a local IP; iOS Safari will still show the manual share-sheet instructions.



## Analytics Readiness

No analytics provider (e.g. Google Analytics 4) is currently integrated. The app is intentionally built to be analytics-ready without coupling to a specific provider.

### What the app exposes on every navigation

`AppModeProvider` (`components/providers/app-mode-provider.tsx`) runs a side effect on every pathname change and writes:

| Surface | Value |
|---|---|
| `document.documentElement.dataset.appMode` | `"standard"` or `"totem"` |
| `document.documentElement.dataset.canonicalPath` | canonical pathname (without `/totem` prefix) |
| `window.__PRO_LOCO_PAGE_CONTEXT__` | `{ mode, actualPathname, canonicalPathname }` |
| `window` custom event `proloco:page-context` | same payload as above, in `event.detail` |

### Why canonical paths matter

The same content page exists at two URLs: `/categories/foo` (public) and `/totem/categories/foo` (kiosk). Without canonicalization, analytics would split page-view counts across both paths. By always reporting `canonicalPathname`, a single GA4 dimension covers both modes, and `mode` can be used as a secondary dimension to separate public vs kiosk traffic.

### How to integrate GA4

When GA4 is added, wire it to the `proloco:page-context` event instead of relying on automatic URL-based page views. This ensures every SPA navigation is tracked and uses the canonical path:

```ts
window.addEventListener("proloco:page-context", (e) => {
  const { canonicalPathname, mode } = (e as CustomEvent).detail;
  gtag("event", "page_view", {
    page_path: canonicalPathname,
    app_mode: mode,       // custom dimension: "standard" | "totem"
  });
});
```

The GA4 script (`gtag.js`) and measurement ID (`NEXT_PUBLIC_GA_MEASUREMENT_ID`) would be added to `components/layout/site-root-layout.tsx`, loaded only in production.

## Future Server-Driven Data

- The route split between public and `/totem` is compatible with future server-backed data fetching.
- Shared page views and centralized metadata helpers reduce the cost of moving from static data to server data later.
- If the app stops using static export in the future, the current route structure remains valid.

## Related Docs

- [Architecture](./architecture.md)
- [Route Modes](./route-modes.md)
