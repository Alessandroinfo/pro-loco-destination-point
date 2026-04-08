# Content & Assets

## Goal

For the first release, the repository can host the public-facing media directly. The asset layout under `public/assets` is organized so placeholder media and final business media can coexist without forcing another refactor when real content arrives.

## Directory Layout

```text
public/assets/
  brand/
    logos/
      pro-loco.svg
      pro-loco-white.svg
    social/
      og-image.svg
  pwa/
    icons/
      app-icon.svg
      icon-192.png
      icon-512.png
      icon-512-maskable.png
  catalog/
    placeholders/
      categories/
        experiences.svg
        dining.svg
        hospitality.svg
        renting.svg
        shopping.svg
        info.svg
      businesses/
        experiences/
          1.svg
          2.svg
        dining/
        hospitality/
        renting/
        shopping/
        info/
    businesses/
      <businessId>/
        hero.webp
        gallery/
          01.webp
          02.webp
          03.webp
  maps/
    illustrations/
      lampedusa-linosa-professionale.svg
    placeholders/
      pelagie-overview.svg
      point-of-interest.svg
  video/
    screensaver/
      boat-video.mp4
      poster.svg
```

## Naming Rules

- Use the same folder name as `business.id` for each final business media set.
- Keep file names lowercase and kebab-case.
- Prefer `.webp` for photos, `.svg` for vectors, and `.png` only for icons or transparency-sensitive assets.
- Keep one `hero` image and a numbered `gallery/` sequence for each business.
- Reserve `placeholders/` for mock or fallback visuals only.

## Data Checklist Per Business

- `name`, `type`, `shortDescription`, `description`
- `hours`, `address`
- `latitude`, `longitude`
- booking link or website URL
- contact number or WhatsApp number
- hero image and 3-5 gallery images

## Workflow

1. Keep shared assets in their final folders immediately, even if business content is still incomplete.
2. When a business is ready, create `public/assets/catalog/businesses/<businessId>/` and add `hero.webp` plus the `gallery/` files.
3. Replace the placeholder path in data with the helper functions from `lib/asset-paths.ts`.
4. Leave placeholders in place for businesses that are still missing complete content.

## Current Transition Strategy

`lib/asset-paths.ts` centralizes the new folder structure.

`normalizeLegacyAssetPath()` keeps the old placeholder references valid while the codebase finishes moving away from legacy paths.