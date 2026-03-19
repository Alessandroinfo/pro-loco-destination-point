import type { Business } from "@/features/catalog/catalog.types";

export const touristHubStructuredData = {
  "@context": "https://schema.org",
  "@type": "TouristInformationCenter",
  name: "Pro Loco - Destination Point",
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

export function getBusinessStructuredData(business: Business) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    description: business.description,
    address: business.address,
    openingHours: business.hours
  };
}
