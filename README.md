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

- Static App Router website optimized for a 1080x1920 outdoor touch kiosk.
- SEO-friendly prerendered pages for home, map, category listings, and business details.
- Home page with full-width hero, featured map entry point, and category discovery cards.
- Category pages with visual business grids and touch-first navigation.
- Business detail pages with hero media, image gallery, business info, and booking QR modal.
- Floating QR button to continue the current page on a mobile device.
- Interactive Pelagie map with offline local rendering, point-of-interest legend, and tooltips.
- Screensaver overlay triggered by inactivity, with local video background and return-to-home flow.
- PWA support with service worker precaching for routes and local assets.
- Reusable modular architecture with shared UI, feature-based data modules, and English code conventions.
- Accessibility baseline with skip link, keyboard-focus handling, accessible dialogs, and reduced-motion support.

## Commands

- `npm run dev`: start local development.
- `npm run assets:generate`: regenerate local SVG placeholders.
- `npm run build`: create the static production build.
- `npm run serve`: serve the exported `out/` folder locally.
