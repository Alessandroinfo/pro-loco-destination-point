import type { Metadata } from "next";

import type { AppMode } from "@/lib/app-mode";
import type { Business, Category } from "@/features/catalog/catalog.types";
import type { Locale } from "@/lib/i18n/config";
import { getAlternatePathnames, getLocalePathname } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { getAbsoluteRouteUrl } from "@/lib/site";
import { getSiteShortName } from "@/lib/site-brand";
import { publicRoutes } from "@/lib/routes";

const mapDescriptions: Record<Locale, string> = {
  it: "Mappa vettoriale offline di Lampedusa, Linosa e Lampione con punti di interesse per spiagge, natura, porto, monumenti e centro.",
  en: "Offline vector map of Lampedusa, Linosa and Lampione with points of interest for beaches, nature, harbours, landmarks and town areas."
};

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
  mode,
  locale
}: {
  title: Exclude<Metadata["title"], null>;
  description: string;
  canonicalPathname: string;
  mode: AppMode;
  locale: Locale;
}): Metadata {
  const localizedCanonicalPathname = getLocalePathname(canonicalPathname, locale);
  const alternatePathnames = getAlternatePathnames(canonicalPathname);

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteRouteUrl(localizedCanonicalPathname),
      languages:
        mode === "standard"
          ? {
              it: getAbsoluteRouteUrl(alternatePathnames.it),
              en: getAbsoluteRouteUrl(alternatePathnames.en),
              "x-default": getAbsoluteRouteUrl(alternatePathnames.it)
            }
          : undefined
    },
    openGraph: {
      description,
      locale: locale === "en" ? "en_GB" : "it_IT",
      title
    },
    twitter: {
      description,
      title
    },
    robots: getTotemRobots(mode)
  };
}

export function createHomePageMetadata(mode: AppMode, locale: Locale = "it"): Metadata {
  const messages = getMessages(locale);

  return createModeAwareMetadata({
    title: {
      absolute: "Pro Loco - Discovery Point - Lampedusa e Linosa"
    },
    description: messages.site.description,
    canonicalPathname: publicRoutes.home,
    locale,
    mode
  });
}

export function createMapPageMetadata(mode: AppMode, locale: Locale = "it"): Metadata {
  return createModeAwareMetadata({
    title: locale === "en" ? "Interactive map" : "Mappa interattiva",
    description: mapDescriptions[locale],
    canonicalPathname: publicRoutes.map,
    locale,
    mode
  });
}

export function createCategoryPageMetadata(category: Category, mode: AppMode, locale: Locale = "it"): Metadata {
  return createModeAwareMetadata({
    title: category.name,
    description:
      locale === "en"
        ? `${category.tagline}. Explore the ${category.name} section of ${getSiteShortName(locale)} by the Pro Loco of Lampedusa and Linosa.`
        : `${category.tagline}. Esplora la sezione ${category.name} del ${getSiteShortName(locale)} della Pro Loco di Lampedusa e Linosa.`,
    canonicalPathname: `/categories/${category.id}`,
    locale,
    mode
  });
}

export function createBusinessPageMetadata(categoryId: string, business: Business, mode: AppMode, locale: Locale = "it"): Metadata {
  return createModeAwareMetadata({
    title: business.name,
    description: `${business.shortDescription} ${business.description}`,
    canonicalPathname: `/categories/${categoryId}/${business.id}`,
    locale,
    mode
  });
}
