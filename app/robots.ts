import type { MetadataRoute } from "next";

import { getAbsoluteUrl, withBasePath } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: withBasePath("/"),
      disallow: [withBasePath("/totem"), withBasePath("/totem/")]
    },
    sitemap: getAbsoluteUrl("/sitemap.xml")
  };
}
