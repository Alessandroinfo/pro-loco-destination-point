# Pro Loco - Lampedusa e Linosa - Destination Point

Static Next.js tourism hub for the Pro Loco of Lampedusa and Linosa, with a public experience and a dedicated `/totem` kiosk mode.

## Quick Start

- `npm run dev`: start local development.
- `npm run build`: create the static production build.
- `npm run serve`: serve the exported `out/` folder locally.
- `npm run assets:generate`: regenerate local SVG placeholders.

If you build with a non-empty `NEXT_PUBLIC_BASE_PATH`, preview with the same mounted path:

- `NEXT_PUBLIC_BASE_PATH=/pro-loco-destination-point NEXT_PUBLIC_SITE_URL=https://alessandroinfo.github.io/pro-loco-destination-point npm run build`
- `BASE_PATH=/pro-loco-destination-point npm run serve`

The local preview server redirects `/` to the configured base path so GitHub Pages builds do not 404 on localhost.

## Deploy Config

- `NEXT_PUBLIC_SITE_URL`: public base URL of the app.
- `NEXT_PUBLIC_BASE_PATH`: optional subpath for static hosting.
- Production example:
  - `NEXT_PUBLIC_SITE_URL=https://example.com`
  - `NEXT_PUBLIC_BASE_PATH=`
- GitHub Pages example:
  - `NEXT_PUBLIC_SITE_URL=https://alessandroinfo.github.io/pro-loco-destination-point`
  - `NEXT_PUBLIC_BASE_PATH=/pro-loco-destination-point`

The public experience stays on `/` and the kiosk experience stays on `/totem`, regardless of the hosting target.

## GitHub Pages

- The repository includes [deploy-pages.yml](./.github/workflows/deploy-pages.yml) for free public preview deploys.
- The workflow builds the static export and publishes `out/` to GitHub Pages using the repository name as base path.

## Docs

- [Architecture](./docs/architecture.md)
- [Route Modes](./docs/route-modes.md)
- [PWA, SEO, Analytics](./docs/pwa-seo-analytics.md)
