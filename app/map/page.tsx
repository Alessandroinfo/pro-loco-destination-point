import type { Metadata } from "next";

import { MapPage as MapPageView } from "@/components/map/map-page";
import { getAbsoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mappa interattiva",
  description:
    "Mappa vettoriale offline di Lampedusa e Linosa con punti di interesse per spiagge, natura, porto, monumenti e centro.",
  alternates: {
    canonical: getAbsoluteUrl("/map")
  }
};

export default function MapPage() {
  return <MapPageView />;
}
