import type { Metadata } from "next";

import { HomePage } from "@/components/home/home-page";
import { touristHubStructuredData } from "@/features/seo/structured-data";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Scopri il totem turistico ufficiale della Pro Loco di Lampedusa e Linosa: esperienze, ristorazione, ospitalità, trasporti, info utili e mappa offline."
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristHubStructuredData) }}
      />
      <HomePage />
    </>
  );
}
