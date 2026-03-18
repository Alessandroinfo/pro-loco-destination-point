import { getBusinessBySlug, getCategoryById } from "@/features/catalog/catalog.selectors";

export const publicRoutes = {
  home: "/",
  map: "/map"
} as const;

export function getCategoryRoute(categoryId: string) {
  return `/categories/${categoryId}`;
}

export function getBusinessRoute(categoryId: string, businessId: string) {
  return `/categories/${categoryId}/${businessId}`;
}

export function getCurrentRouteLabel(pathname: string) {
  const normalizedPathname = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  if (normalizedPathname === publicRoutes.home) {
    return "Home";
  }

  if (normalizedPathname === publicRoutes.map) {
    return "Esplora le Pelagie";
  }

  const segments = normalizedPathname.split("/").filter(Boolean);

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
