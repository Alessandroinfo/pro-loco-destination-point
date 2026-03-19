import type { Metadata } from "next";

import type { AppMode } from "@/lib/app-mode";
import type { Business, Category } from "@/features/catalog/catalog.types";
import { getAbsoluteUrl } from "@/lib/site";
import { publicRoutes } from "@/lib/routes";

const homeDescription =
  "Scopri il totem turistico ufficiale della Pro Loco di Lampedusa e Linosa: esperienze, ristorazione, ospitalità, trasporti, shopping, info utili e mappa offline.";
const mapDescription =
  "Mappa vettoriale offline di Lampedusa, Linosa e Lampione con punti di interesse per spiagge, natura, porto, monumenti e centro.";

function getTotemRobots(mode: AppMode): Metadata["robots"] {
  if (mode !== "totem") {
    return undefined;
  }

  return {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  };
}

function createModeAwareMetadata({
  title,
  description,
  canonicalPathname,
  mode
}: {
  title: string;
  description: string;
  canonicalPathname: string;
  mode: AppMode;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(canonicalPathname)
    },
    robots: getTotemRobots(mode)
  };
}

export function createHomePageMetadata(mode: AppMode): Metadata {
  return createModeAwareMetadata({
    title: "Home",
    description: homeDescription,
    canonicalPathname: publicRoutes.home,
    mode
  });
}

export function createMapPageMetadata(mode: AppMode): Metadata {
  return createModeAwareMetadata({
    title: "Mappa interattiva",
    description: mapDescription,
    canonicalPathname: publicRoutes.map,
    mode
  });
}

export function createCategoryPageMetadata(category: Category, mode: AppMode): Metadata {
  return createModeAwareMetadata({
    title: category.name,
    description: `${category.tagline}. Esplora la sezione ${category.name} del totem turistico ufficiale di Lampedusa e Linosa.`,
    canonicalPathname: `/categories/${category.id}`,
    mode
  });
}

export function createBusinessPageMetadata(categoryId: string, business: Business, mode: AppMode): Metadata {
  return createModeAwareMetadata({
    title: business.name,
    description: `${business.shortDescription} ${business.description}`,
    canonicalPathname: `/categories/${categoryId}/${business.id}`,
    mode
  });
}
