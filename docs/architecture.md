# Architecture

## Overview

This project is a static Next.js App Router application optimized for a touch kiosk and a standard public browsing experience.

## Main Areas

- `app/`: route wrappers, metadata, sitemap, robots, manifests, and the dedicated `/totem` route tree.
- `components/layout/`: app shell, header, footer, screensaver, and floating route QR.
- `components/home/`, `components/category/`, `components/business/`, `components/map/`: page-specific UI.
- `components/routes/`: shared page-level views reused by both standard and `/totem` route wrappers.
- `components/shared/`: reusable UI primitives such as `AppModeLink` and `BackLink`.
- `features/catalog/`: categories, businesses, types, and selectors.
- `features/map/`: points of interest data and map types.
- `features/seo/`: structured data helpers for the public indexable pages.
- `lib/`: shared helpers for app mode, routes, metadata, site URLs, manifests, and page param resolution.
- `public/`: shared static output, with application assets organized under `public/assets/`, plus the service worker and localized manifest files.

## Shared Rendering Strategy

- Public pages and `/totem` pages reuse the same React page views from `components/routes/page-route-views.tsx`.
- Route files in `app/` and `app/totem/` are intentionally thin wrappers around shared helpers.
- Metadata and static params are centralized in `lib/page-metadata.ts` and `lib/catalog-route-helpers.ts` to reduce double maintenance.

## Related Docs

- [Route Modes](./route-modes.md)
- [Content & Assets](./content-assets.md)
- [PWA, SEO, Analytics](./pwa-seo-analytics.md)
