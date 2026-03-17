import type { Metadata } from "next";

import { HomeScreen } from "@/components/home-screen";

const touristHubJsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristInformationCenter",
  name: "Hub Turistico Pro Loco Lampedusa e Linosa",
  description:
    "Punto di accesso digitale della Pro Loco per scoprire aziende, esperienze, ospitalità e punti di interesse a Lampedusa e Linosa.",
  areaServed: ["Lampedusa", "Linosa"],
  availableLanguage: ["it", "en"],
  audience: {
    "@type": "Audience",
    audienceType: "Turisti"
  },
  provider: {
    "@type": "Organization",
    name: "Pro Loco Lampedusa e Linosa"
  }
};

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristHubJsonLd) }}
      />
      <HomeScreen />
    </>
  );
}
