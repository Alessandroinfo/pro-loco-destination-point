import type { MetadataRoute } from "next";

import type { AppMode } from "@/lib/app-mode";
import { pwaAssetPaths } from "@/lib/asset-paths";
import type { Locale } from "@/lib/i18n/config";
import { getLocalePathname } from "@/lib/i18n/config";
import { getHomeRoute } from "@/lib/routes";
import { INSTALLABLE_APP_NAME, INSTALLABLE_APP_SHORT_NAME, getSiteDescription } from "@/lib/site-brand";
import { normalizePathname, withBasePath } from "@/lib/site";

export function createManifest(mode: AppMode, locale: Locale = "it"): MetadataRoute.Manifest {
  const localizedHomeRoute = getLocalePathname(getHomeRoute(mode), locale);
  const startUrl = withBasePath(localizedHomeRoute);

  return {
    name: INSTALLABLE_APP_NAME,
    short_name: INSTALLABLE_APP_SHORT_NAME,
    description: getSiteDescription(locale),
    lang: locale,
    start_url: startUrl,
    scope: normalizePathname(startUrl),
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#10243f",
    orientation: "portrait",
    icons: [
      {
        src: withBasePath(pwaAssetPaths.icon192),
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: withBasePath(pwaAssetPaths.icon512),
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: withBasePath(pwaAssetPaths.icon512Maskable),
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
