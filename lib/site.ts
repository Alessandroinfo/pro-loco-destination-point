export const fallbackSiteUrl = "https://example.com";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl;
}

export function normalizePathname(pathname: string) {
  if (pathname === "/") {
    return pathname;
  }

  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export function getAbsoluteUrl(pathname: string) {
  return new URL(normalizePathname(pathname), getSiteUrl()).toString();
}
