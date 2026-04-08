import type { MetadataRoute } from "next";

import { createManifest } from "@/lib/pwa-manifest";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return createManifest("standard", "it");
}
