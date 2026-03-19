# Route Modes

## Canonical Public Mode

- Home: `/`
- Map: `/map`
- Categories: `/categories/...`
- Business detail: `/categories/[categoryId]/[businessId]`

These are the canonical, indexable URLs.

## Totem Mode

- Home: `/totem`
- Map: `/totem/map`
- Categories: `/totem/categories/...`
- Business detail: `/totem/categories/[categoryId]/[businessId]`

These URLs are kiosk-specific and are not meant to be indexed.

## How Mode Is Resolved

- The active mode is derived from the pathname.
- No query params or `localStorage` are used to decide whether the UI is in standard or totem mode.
- `AppModeProvider` exposes:
  - `mode`
  - `isStandardMode`
  - `isTotemMode`
  - `getModeAwareHref(...)`
  - `getCanonicalHref(...)`

## Navigation Rules

- Shared internal links use `AppModeLink`, so navigation stays within the current mode tree.
- `BackLink` is also mode-aware because it is built on top of `AppModeLink`.
- Screensaver exit keeps the current mode and returns to the correct home route.

## QR Behavior

- The floating route QR is shown only in totem mode.
- The QR always encodes the canonical public URL for the current content.
- This means scanning the QR on a phone opens the standard experience, not the kiosk route.

## Related Docs

- [Architecture](./architecture.md)
- [PWA, SEO, Analytics](./pwa-seo-analytics.md)
