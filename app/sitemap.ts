import type { MetadataRoute } from "next";

import { businesses, categories, getBusinessRoute, getCategoryRoute } from "@/lib/totem-data";

const fallbackSiteUrl = "https://example.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl;

  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    }
  ];

  categories.forEach((category) => {
    routes.push({
      url: `${siteUrl}${getCategoryRoute(category.id)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    });
  });

  businesses.forEach((business) => {
    routes.push({
      url: `${siteUrl}${getBusinessRoute(business.categoryId, business.id)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7
    });
  });

  routes.push({
    url: `${siteUrl}/mappa`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.75
  });

  return routes;
}
