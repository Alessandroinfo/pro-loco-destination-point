import type { Business } from "@/features/catalog/catalog.types";
import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { getSiteName } from "@/lib/site-brand";

export function getTouristHubStructuredData(locale: Locale) {
  const messages = getMessages(locale);

  return {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    name: getSiteName(locale),
    description: messages.site.description,
    areaServed: ["Lampedusa", "Linosa"],
    availableLanguage: ["it", "en"],
    audience: {
      "@type": "Audience",
      audienceType: locale === "en" ? "Tourists" : "Turisti"
    },
    provider: {
      "@type": "Organization",
      name: "Pro Loco Lampedusa e Linosa"
    }
  };
}

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
