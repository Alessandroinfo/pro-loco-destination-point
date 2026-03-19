import type { MetadataRoute } from "next";

import type { AppMode } from "@/lib/app-mode";

export function createManifest(mode: AppMode): MetadataRoute.Manifest {
  const isTotemMode = mode === "totem";

  return {
    name: isTotemMode ? "Pro Loco - Destination Point Totem" : "Pro Loco - Destination Point",
    short_name: isTotemMode ? "Destination Totem" : "Destination Point",
    description:
      "Hub turistico offline-ready per il totem della Pro Loco di Lampedusa e Linosa.",
    start_url: isTotemMode ? "/totem/" : "/",
    scope: isTotemMode ? "/totem/" : "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#10243f",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };
}
