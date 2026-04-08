import type { Metadata } from "next";

import type { Locale } from "@/lib/i18n/config";
import { getSiteDescription, getSiteName } from "@/lib/site-brand";
import { getAbsoluteUrl, getSiteUrl, withBasePath } from "@/lib/site";

const localizedKeywords: Record<Locale, string[]> = {
  it: [
    "Lampedusa",
    "Linosa",
    "Lampione",
    "Pro Loco",
    "mappa Lampedusa",
    "vacanze Lampedusa",
    "attività Lampedusa"
  ],
  en: [
    "Lampedusa",
    "Linosa",
    "Lampione",
    "Pro Loco",
    "Lampedusa map",
    "Lampedusa holidays",
    "things to do in Lampedusa"
  ]
};

export function createRootMetadata(locale: Locale): Metadata {
  const siteName = getSiteName(locale);
  const siteDescription = getSiteDescription(locale);
  const manifestPath = locale === "en" ? "/en/manifest.webmanifest" : "/manifest.webmanifest";

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: siteName,
      template: `%s | ${siteName}`
    },
    description: siteDescription,
    keywords: localizedKeywords[locale],
    applicationName: siteName,
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: siteName
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false
    },
    openGraph: {
      title: siteName,
      description: siteDescription,
      type: "website",
      locale: locale === "en" ? "en_GB" : "it_IT",
      alternateLocale: locale === "en" ? ["it_IT"] : ["en_GB"],
      images: [
        {
          url: getAbsoluteUrl("/og-image.svg"),
          width: 1200,
          height: 630,
          alt: siteName
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: siteDescription,
      images: [getAbsoluteUrl("/og-image.svg")]
    },
    category: "travel",
    manifest: withBasePath(manifestPath)
  };
}
