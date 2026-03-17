import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hub Turistico Pro Loco Lampedusa e Linosa",
    short_name: "Pro Loco Hub",
    description:
      "Hub turistico offline-ready per il totem della Pro Loco di Lampedusa e Linosa.",
    start_url: "/",
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
