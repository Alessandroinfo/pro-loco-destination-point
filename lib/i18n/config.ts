export const locales = ["it", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "it";

function normalizePathInput(pathname: string | null | undefined) {
  const pathWithoutQueryOrHash = pathname?.split("#")[0]?.split("?")[0]?.trim() || "/";

  if (pathWithoutQueryOrHash === "" || pathWithoutQueryOrHash === "/") {
    return "/";
  }

  return pathWithoutQueryOrHash.startsWith("/") ? pathWithoutQueryOrHash : `/${pathWithoutQueryOrHash}`;
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "it" || value === "en";
}

export function getLocalePrefix(locale: Locale) {
  return locale === defaultLocale ? "" : `/${locale}`;
}

export function getLocaleFromPathname(pathname: string | null | undefined): Locale {
  const normalizedPathname = normalizePathInput(pathname);

  if (normalizedPathname === "/en" || normalizedPathname.startsWith("/en/")) {
    return "en";
  }

  return defaultLocale;
}

export function stripLocalePrefix(pathname: string | null | undefined) {
  const normalizedPathname = normalizePathInput(pathname);

  if (normalizedPathname === "/en") {
    return "/";
  }

  if (normalizedPathname.startsWith("/en/")) {
    return normalizedPathname.slice(3) || "/";
  }

  return normalizedPathname;
}

export function getLocalePathname(pathname: string | null | undefined, locale: Locale) {
  const canonicalPathname = stripLocalePrefix(pathname);
  const localePrefix = getLocalePrefix(locale);

  if (canonicalPathname === "/") {
    return localePrefix || "/";
  }

  return `${localePrefix}${canonicalPathname}`;
}

export function getLocaleAwareHref(href: string, locale: Locale) {
  if (/^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith("data:") || href.startsWith("blob:")) {
    return href;
  }

  const [pathAndQuery, hash = ""] = href.split("#");
  const [pathname, queryString = ""] = pathAndQuery.split("?");
  const localizedPathname = getLocalePathname(pathname || "/", locale);
  const withTrailingSlash =
    localizedPathname === "/" ? "/" : localizedPathname.endsWith("/") ? localizedPathname : `${localizedPathname}/`;

  return `${withTrailingSlash}${queryString ? `?${queryString}` : ""}${hash ? `#${hash}` : ""}`;
}

export function getAlternatePathnames(pathname: string) {
  const canonicalPathname = stripLocalePrefix(pathname);

  return {
    it: getLocalePathname(canonicalPathname, "it"),
    en: getLocalePathname(canonicalPathname, "en")
  };
}
