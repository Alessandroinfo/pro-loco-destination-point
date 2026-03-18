# Pro Loco Hub

Static Next.js kiosk application for the Pro Loco tourism hub of Lampedusa and Linosa.

## Project Structure

- `app/`: App Router pages, metadata, sitemap, robots, manifest.
- `components/layout/`: global shell, header, footer, screensaver, route QR modal.
- `components/home/`, `components/category/`, `components/business/`, `components/map/`: page-specific UI blocks.
- `components/shared/`: reusable UI primitives.
- `features/catalog/`: categories, businesses, types, selectors.
- `features/map/`: points of interest data and types.
- `features/seo/`: structured data helpers.
- `lib/`: shared route and site helpers.
- `public/`: static assets, placeholders, icons, service worker, kiosk video.

## Functional Overview

- Home page with featured map and category cards.
- Category pages with business listings.
- Business detail pages with gallery and WhatsApp booking QR.
- Interactive offline-friendly island map.
- Floating QR to continue the current page on a mobile device.
- Screensaver mode for kiosk inactivity.
- PWA support with service worker precaching for core routes and local assets.

## Commands

- `npm run dev`: start local development.
- `npm run assets:generate`: regenerate local SVG placeholders.
- `npm run build`: create the static production build.
- `npm run serve`: serve the exported `out/` folder locally.
