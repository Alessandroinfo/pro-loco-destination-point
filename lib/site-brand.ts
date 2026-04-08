import type { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export function getSiteName(locale: Locale = "it") {
  return getMessages(locale).site.name;
}

export function getSiteDescription(locale: Locale = "it") {
  return getMessages(locale).site.description;
}

export function getSiteShortName(locale: Locale = "it") {
  return getMessages(locale).site.shortName;
}

export const SITE_NAME = getSiteName("it");
export const SITE_DESCRIPTION = getSiteDescription("it");
export const SITE_SHORT_NAME = getSiteShortName("it");
export const INSTALLABLE_APP_NAME = "Discovery Point - Pro Loco - Lampedusa e Linosa";
export const INSTALLABLE_APP_SHORT_NAME = "Discovery Point - Pro Loco - Lampedusa e Linosa";
