import type { MetadataRoute } from "next";

import { businesses } from "@/features/catalog/businesses.data";
import { categories } from "@/features/catalog/categories.data";
import { getAlternatePathnames } from "@/lib/i18n/config";
import { getBusinessRoute, getCategoryRoute, getMapRoute, getHomeRoute } from "@/lib/routes";
import { getAbsoluteRouteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];
  const now = new Date();

  const appendLocalizedRoute = (pathname: string, priority: number) => {
    const alternates = getAlternatePathnames(pathname);
    const languages = {
      en: getAbsoluteRouteUrl(alternates.en),
      it: getAbsoluteRouteUrl(alternates.it)
    };

    routes.push({
      url: languages.it,
      lastModified: now,
      changeFrequency: "weekly",
      priority,
      alternates: {
        languages
      }
    });
    routes.push({
      url: languages.en,
      lastModified: now,
      changeFrequency: "weekly",
      priority,
      alternates: {
        languages
      }
    });
  };

  appendLocalizedRoute(getHomeRoute("standard"), 1);
  appendLocalizedRoute(getMapRoute("standard"), 0.75);

  categories.forEach((category) => {
    appendLocalizedRoute(getCategoryRoute(category.id), 0.8);
  });

  businesses.forEach((business) => {
    appendLocalizedRoute(getBusinessRoute(business.categoryId, business.id), 0.7);
  });

  return routes;
}
