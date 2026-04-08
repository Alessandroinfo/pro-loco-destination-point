import type { CategoryId } from "@/features/catalog/catalog.types";

const ASSET_ROOT = "/assets";
const BRAND_ROOT = `${ASSET_ROOT}/brand`;
const CATALOG_ROOT = `${ASSET_ROOT}/catalog`;
const MAP_ROOT = `${ASSET_ROOT}/maps`;
const PWA_ROOT = `${ASSET_ROOT}/pwa`;
const VIDEO_ROOT = `${ASSET_ROOT}/video`;

const legacyBusinessPlaceholderCategoryMap: Record<string, CategoryId> = {
  experience: "experiences",
  dining: "dining",
  hospitality: "hospitality",
  renting: "renting",
  shopping: "shopping",
  info: "info"
};

const categoryPlaceholderImages: Record<CategoryId, string> = {
  experiences: `${CATALOG_ROOT}/placeholders/categories/experiences.svg`,
  dining: `${CATALOG_ROOT}/placeholders/categories/dining.svg`,
  hospitality: `${CATALOG_ROOT}/placeholders/categories/hospitality.svg`,
  renting: `${CATALOG_ROOT}/placeholders/categories/renting.svg`,
  shopping: `${CATALOG_ROOT}/placeholders/categories/shopping.svg`,
  info: `${CATALOG_ROOT}/placeholders/categories/info.svg`
};

const legacyStaticAssetPaths: Record<string, string> = {
  "/logo-pro-loco.svg": `${BRAND_ROOT}/logos/pro-loco.svg`,
  "/logo-pro-loco-white.svg": `${BRAND_ROOT}/logos/pro-loco-white.svg`,
  "/og-image.svg": `${BRAND_ROOT}/social/og-image.svg`,
  "/icons/app-icon.svg": `${PWA_ROOT}/icons/app-icon.svg`,
  "/icons/icon-192.png": `${PWA_ROOT}/icons/icon-192.png`,
  "/icons/icon-512.png": `${PWA_ROOT}/icons/icon-512.png`,
  "/icons/icon-512-maskable.png": `${PWA_ROOT}/icons/icon-512-maskable.png`,
  "/placeholders/category-experiences.svg": categoryPlaceholderImages.experiences,
  "/placeholders/category-dining.svg": categoryPlaceholderImages.dining,
  "/placeholders/category-hospitality.svg": categoryPlaceholderImages.hospitality,
  "/placeholders/category-renting.svg": categoryPlaceholderImages.renting,
  "/placeholders/category-shopping.svg": categoryPlaceholderImages.shopping,
  "/placeholders/category-info.svg": categoryPlaceholderImages.info,
  "/placeholders/category-map.svg": `${MAP_ROOT}/placeholders/point-of-interest.svg`,
  "/placeholders/category-map-pelagie.svg": `${MAP_ROOT}/placeholders/pelagie-overview.svg`,
  "/placeholders/screensaver-poster.svg": `${VIDEO_ROOT}/screensaver/poster.svg`,
  "/boat-video.mp4": `${VIDEO_ROOT}/screensaver/boat-video.mp4`,
  "/maps/lampedusa-linosa-professionale.svg": `${MAP_ROOT}/illustrations/lampedusa-linosa-professionale.svg`
};

function normalizeAssetSegment(segment: string) {
  return segment.replace(/^\/+/, "");
}

export const brandAssetPaths = {
  logo: `${BRAND_ROOT}/logos/pro-loco.svg`,
  logoWhite: `${BRAND_ROOT}/logos/pro-loco-white.svg`,
  openGraph: `${BRAND_ROOT}/social/og-image.svg`
} as const;

export const pwaAssetPaths = {
  appIcon: `${PWA_ROOT}/icons/app-icon.svg`,
  icon192: `${PWA_ROOT}/icons/icon-192.png`,
  icon512: `${PWA_ROOT}/icons/icon-512.png`,
  icon512Maskable: `${PWA_ROOT}/icons/icon-512-maskable.png`
} as const;

export const mapAssetPaths = {
  illustratedIslands: `${MAP_ROOT}/illustrations/lampedusa-linosa-professionale.svg`,
  featuredCard: `${MAP_ROOT}/placeholders/pelagie-overview.svg`,
  pointOfInterestPlaceholder: `${MAP_ROOT}/placeholders/point-of-interest.svg`
} as const;

export const videoAssetPaths = {
  screensaverLoop: `${VIDEO_ROOT}/screensaver/boat-video.mp4`,
  screensaverPoster: `${VIDEO_ROOT}/screensaver/poster.svg`
} as const;

export function getCategoryPlaceholderImage(categoryId: CategoryId) {
  return categoryPlaceholderImages[categoryId];
}

export function getBusinessPlaceholderImage(categoryId: CategoryId, index: number) {
  if (!Number.isInteger(index) || index < 1) {
    throw new Error(`Business placeholder index must be a positive integer. Received: ${index}`);
  }

  return `${CATALOG_ROOT}/placeholders/businesses/${categoryId}/${index}.svg`;
}

export function getBusinessAssetDirectory(businessId: string) {
  return `${CATALOG_ROOT}/businesses/${normalizeAssetSegment(businessId)}`;
}

export function getBusinessHeroAsset(businessId: string, filename = "hero.webp") {
  return `${getBusinessAssetDirectory(businessId)}/${normalizeAssetSegment(filename)}`;
}

export function getBusinessGalleryAsset(businessId: string, filename: string) {
  return `${getBusinessAssetDirectory(businessId)}/gallery/${normalizeAssetSegment(filename)}`;
}

export function normalizeLegacyAssetPath(pathname: string) {
  const directMatch = legacyStaticAssetPaths[pathname];

  if (directMatch) {
    return directMatch;
  }

  const businessPlaceholderMatch = pathname.match(/^\/placeholders\/business-([a-z-]+)-(\d+)\.svg$/);

  if (!businessPlaceholderMatch) {
    return pathname;
  }

  const [, legacyCategory, indexString] = businessPlaceholderMatch;
  const categoryId = legacyBusinessPlaceholderCategoryMap[legacyCategory];

  if (!categoryId) {
    return pathname;
  }

  return getBusinessPlaceholderImage(categoryId, Number(indexString));
}