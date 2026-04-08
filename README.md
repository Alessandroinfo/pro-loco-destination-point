# Pro Loco - Lampedusa e Linosa - Discovery Point

Static Next.js tourism hub for the Pro Loco of Lampedusa and Linosa, with a public experience and a dedicated `/totem` kiosk mode.

## Quick Start

- The npm scripts automatically try to use the Node version declared in `.nvmrc` when `nvm` is available.
- If `nvm` is not available, run the project with Node `20.x` or newer.
- `npm run dev`: start local development with Turbopack.
- `npm run dev:clean`: clear `.next` and start local development with Turbopack.
- `npm run build`: create the static production build.
- `npm run serve`: serve the exported `out/` folder locally.
- `npm run prod:local`: build and serve the local production export in one command.
- `npm run deploy`: build and deploy using the service configured via `DEPLOY_SERVICE`.
- `npm run assets:generate`: regenerate local SVG placeholders.

If you build with a non-empty `NEXT_PUBLIC_BASE_PATH`, preview with the same mounted path:

- `NEXT_PUBLIC_BASE_PATH=/pro-loco-discovery-point NEXT_PUBLIC_SITE_URL=https://alessandroinfo.github.io/pro-loco-discovery-point npm run build`
- `BASE_PATH=/pro-loco-discovery-point npm run serve`

The local preview server redirects `/` to the configured base path so GitHub Pages builds do not 404 on localhost.

## Deploy Config

- `NEXT_PUBLIC_SITE_URL`: public base URL of the app.
- `NEXT_PUBLIC_BASE_PATH`: optional subpath for static hosting.
- `DEPLOY_SERVICE`: deployment target selector. Supported values: `github-pages`, `vercel`, `netlify`, `cloudflare-pages`.
- `DEPLOY_ENV`: deployment mode. Supported values: `production` or `preview`. Default: `production`.
- `DEPLOY_YES=true`: opt into non-interactive confirmation for `vercel` and `netlify` deploys.
- `CLOUDFLARE_PROJECT_NAME`: required when deploying to Cloudflare Pages with direct upload.
- `CLOUDFLARE_BRANCH`: optional preview branch name for Cloudflare Pages. If omitted, the current git branch is used.
- Production example:
  - `NEXT_PUBLIC_SITE_URL=https://example.com`
  - `NEXT_PUBLIC_BASE_PATH=`
- GitHub Pages example:
  - `NEXT_PUBLIC_SITE_URL=https://alessandroinfo.github.io/pro-loco-discovery-point`
  - `NEXT_PUBLIC_BASE_PATH=/pro-loco-discovery-point`
  - `DEPLOY_SERVICE=github-pages`

### Deploy Examples

- GitHub Pages: `DEPLOY_SERVICE=github-pages npm run deploy`
- Vercel production: `DEPLOY_SERVICE=vercel DEPLOY_ENV=production npm run deploy`
- Netlify preview: `DEPLOY_SERVICE=netlify DEPLOY_ENV=preview npm run deploy`
- Cloudflare Pages production: `DEPLOY_SERVICE=cloudflare-pages CLOUDFLARE_PROJECT_NAME=<project-name> npm run deploy`
- Cloudflare Pages preview: `DEPLOY_SERVICE=cloudflare-pages DEPLOY_ENV=preview CLOUDFLARE_PROJECT_NAME=<project-name> CLOUDFLARE_BRANCH=<branch-name> npm run deploy`

The public experience stays on `/` and the kiosk experience stays on `/totem`, regardless of the hosting target.

## GitHub Pages

- The repository includes [deploy-pages.yml](./.github/workflows/deploy-pages.yml) for free public preview deploys.
- The workflow builds the static export and publishes `out/` to GitHub Pages using the repository name as base path.
- `npm run deploy` with `DEPLOY_SERVICE=github-pages` triggers that workflow through the GitHub CLI and deploys the currently pushed branch ref.

## Cloudflare Pages

- `npm run deploy` with `DEPLOY_SERVICE=cloudflare-pages` performs a local static build and then uploads `out/` with `npx wrangler pages deploy out --project-name=<project-name>`.
- For production deploys, the script omits `--branch`, so Cloudflare Pages treats the upload as the production deployment for that project.
- For preview deploys, the script adds `--branch=<branch>` and uses `CLOUDFLARE_BRANCH` if provided, otherwise the current git branch name.
- Direct upload typically uses `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in CI, or an existing Wrangler login in a local shell.

## Docs

- [Architecture](./docs/architecture.md)
- [Route Modes](./docs/route-modes.md)
- [PWA, SEO, Analytics](./docs/pwa-seo-analytics.md)
