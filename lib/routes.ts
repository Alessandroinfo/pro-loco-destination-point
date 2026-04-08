import type { AppMode } from "@/lib/app-mode";
import type { Locale } from "@/lib/i18n/config";
import { getLocalizedBusinessBySlug, getLocalizedCategoryById } from "@/features/catalog/catalog.i18n";
import { stripLocalePrefix } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { getCanonicalPathname, getModeAwarePathname } from "@/lib/app-mode";

export const publicRoutes = {
  home: "/",
  map: "/map"
} as const;

export function getHomeRoute(mode: AppMode = "standard") {
  return getModeAwarePathname(publicRoutes.home, mode);
}

export function getMapRoute(mode: AppMode = "standard") {
  return getModeAwarePathname(publicRoutes.map, mode);
}

export function getCategoryRoute(categoryId: string, mode: AppMode = "standard") {
  return getModeAwarePathname(`/categories/${categoryId}`, mode);
}

export function getBusinessRoute(categoryId: string, businessId: string, mode: AppMode = "standard") {
  return getModeAwarePathname(`/categories/${categoryId}/${businessId}`, mode);
}

export function getCurrentRouteLabel(pathname: string, locale: Locale = "it") {
  const messages = getMessages(locale);
  const normalizedPathname = stripLocalePrefix(getCanonicalPathname(pathname));
  const trimmedPathname = normalizedPathname !== "/" && normalizedPathname.endsWith("/") ? normalizedPathname.slice(0, -1) : normalizedPathname;

  if (trimmedPathname === publicRoutes.home) {
    return messages.common.home;
  }

  if (trimmedPathname === publicRoutes.map) {
    return messages.featuredMap.title;
  }

  const segments = trimmedPathname.split("/").filter(Boolean);

  if (segments[0] !== "categories") {
    return messages.common.currentPage;
  }

  const categoryId = segments[1];

  if (!categoryId) {
    return messages.common.categories;
  }

  if (segments.length === 2) {
    return getLocalizedCategoryById(categoryId, locale)?.name ?? messages.common.categories;
  }

  const businessId = segments[2];

  if (!businessId) {
    return getLocalizedCategoryById(categoryId, locale)?.name ?? messages.common.categories;
  }

  return getLocalizedBusinessBySlug(categoryId, businessId, locale)?.name ?? messages.common.routePageLabel;
}
