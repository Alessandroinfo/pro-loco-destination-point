import type { Business } from "@/features/catalog/catalog.types";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site-brand";

export const touristHubStructuredData = {
  "@context": "https://schema.org",
  "@type": "TouristInformationCenter",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
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
