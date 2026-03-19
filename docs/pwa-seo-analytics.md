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
- Totem manifest: `/totem/manifest.webmanifest`
- The totem manifest uses `start_url` and `scope` under `/totem/`.
- Manifest URLs, icons, service worker registration, and asset URLs are base-path aware.

This allows the public app and the kiosk app to be installable with the correct startup context.

## Offline Support

- The shared service worker is registered from `/sw.js`.
- When the app is hosted under a subpath, the registration and cache scope are automatically adjusted to that base path.
- It precaches:
  - public routes
  - `/totem` routes
  - core icons, video, placeholders, and manifests
- Offline navigation falls back to:
  - `/` for the public app
  - `/totem/` for the kiosk app

The current route list is manually maintained in `public/sw.js`, so if new content routes are added later the precache list must be updated as part of that change.

## Analytics Readiness

- `AppModeProvider` writes `data-app-mode` and `data-canonical-path` on the `<html>` element.
- It exposes `window.__PRO_LOCO_PAGE_CONTEXT__`.
- It dispatches a `proloco:page-context` event after navigation.

The event payload contains:

- `mode`
- `actualPathname`
- `canonicalPathname`

This is designed so analytics can report:

- whether the user is in `standard` or `totem`
- the canonical content path without splitting reporting by `/totem` vs public URLs

## Future Server-Driven Data

- The route split between public and `/totem` is compatible with future server-backed data fetching.
- Shared page views and centralized metadata helpers reduce the cost of moving from static data to server data later.
- If the app stops using static export in the future, the current route structure remains valid.

## Related Docs

- [Architecture](./architecture.md)
- [Route Modes](./route-modes.md)
