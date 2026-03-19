import type { MetadataRoute } from "next";

import type { AppMode } from "@/lib/app-mode";
import { getHomeRoute } from "@/lib/routes";
import { SITE_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME } from "@/lib/site-brand";
import { normalizePathname, withBasePath } from "@/lib/site";

export function createManifest(mode: AppMode): MetadataRoute.Manifest {
  const startUrl = withBasePath(getHomeRoute(mode));

  return {
    name: SITE_NAME,
    short_name: SITE_SHORT_NAME,
    description: SITE_DESCRIPTION,
    start_url: startUrl,
    scope: normalizePathname(startUrl),
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#10243f",
    orientation: "portrait",
    icons: [
      {
        src: withBasePath("/icons/icon-192.png"),
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: withBasePath("/icons/icon-512.png"),
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: withBasePath("/icons/icon-512-maskable.png"),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
