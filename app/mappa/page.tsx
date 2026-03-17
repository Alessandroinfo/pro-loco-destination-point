import type { Metadata } from "next";

import { MapScreen } from "@/components/map-screen";
import { getAbsoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mappa interattiva",
  description:
    "Mappa vettoriale offline di Lampedusa e Linosa con punti di interesse per spiagge, natura, porto, monumenti e centro.",
  alternates: {
    canonical: getAbsoluteUrl("/mappa")
  }
};

export default function MapPage() {
  return <MapScreen />;
}
