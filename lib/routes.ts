import type { AppMode } from "@/lib/app-mode";
import { getCanonicalPathname, getModeAwarePathname } from "@/lib/app-mode";
import { getBusinessBySlug, getCategoryById } from "@/features/catalog/catalog.selectors";

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

export function getCurrentRouteLabel(pathname: string) {
  const normalizedPathname = getCanonicalPathname(pathname);
  const trimmedPathname = normalizedPathname !== "/" && normalizedPathname.endsWith("/") ? normalizedPathname.slice(0, -1) : normalizedPathname;

  if (trimmedPathname === publicRoutes.home) {
    return "Home";
  }

  if (trimmedPathname === publicRoutes.map) {
    return "Esplora le Pelagie";
  }

  const segments = trimmedPathname.split("/").filter(Boolean);

  if (segments[0] !== "categories") {
    return "Pagina corrente";
  }

  const categoryId = segments[1];

  if (!categoryId) {
    return "Categorie";
  }

  if (segments.length === 2) {
    return getCategoryById(categoryId)?.name ?? "Categoria";
  }

  const businessId = segments[2];

  if (!businessId) {
    return getCategoryById(categoryId)?.name ?? "Categoria";
  }

  return getBusinessBySlug(categoryId, businessId)?.name ?? "Dettaglio attività";
}
