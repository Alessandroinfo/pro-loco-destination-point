import type { MetadataRoute } from "next";

import { businesses } from "@/features/catalog/businesses.data";
import { categories } from "@/features/catalog/categories.data";
import { getBusinessRoute, getCategoryRoute, getMapRoute, getHomeRoute } from "@/lib/routes";
import { getAbsoluteRouteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: getAbsoluteRouteUrl(getHomeRoute("standard")),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    }
  ];

  categories.forEach((category) => {
    routes.push({
      url: getAbsoluteRouteUrl(getCategoryRoute(category.id)),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    });
  });

  businesses.forEach((business) => {
    routes.push({
      url: getAbsoluteRouteUrl(getBusinessRoute(business.categoryId, business.id)),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7
    });
  });

  routes.push({
    url: getAbsoluteRouteUrl(getMapRoute("standard")),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.75
  });

  return routes;
}
