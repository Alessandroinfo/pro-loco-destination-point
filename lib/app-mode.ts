import { stripBasePath } from "@/lib/site";

export type AppMode = "standard" | "totem";

export const TOTEM_ROUTE_PREFIX = "/totem";

function normalizeAppPath(pathname: string | null | undefined) {
  if (!pathname || pathname === "") {
    return "/";
  }

  const pathnameWithoutBasePath = stripBasePath(pathname);
  const pathnameWithoutTrailingSlash =
    pathnameWithoutBasePath !== "/" && pathnameWithoutBasePath.endsWith("/")
      ? pathnameWithoutBasePath.slice(0, -1)
      : pathnameWithoutBasePath;

  return pathnameWithoutTrailingSlash.startsWith("/") ? pathnameWithoutTrailingSlash : `/${pathnameWithoutTrailingSlash}`;
}

export function resolveAppModeFromPathname(pathname: string | null | undefined): AppMode {
  const normalizedPathname = normalizeAppPath(pathname);

  return normalizedPathname === TOTEM_ROUTE_PREFIX || normalizedPathname.startsWith(`${TOTEM_ROUTE_PREFIX}/`) ? "totem" : "standard";
}

export function getCanonicalPathname(pathname: string | null | undefined) {
  const normalizedPathname = normalizeAppPath(pathname);

  if (normalizedPathname === TOTEM_ROUTE_PREFIX) {
    return "/";
  }

  if (normalizedPathname.startsWith(`${TOTEM_ROUTE_PREFIX}/`)) {
    return normalizedPathname.slice(TOTEM_ROUTE_PREFIX.length) || "/";
  }

  return normalizedPathname;
}

export function getModeAwarePathname(pathname: string | null | undefined, mode: AppMode) {
  const canonicalPathname = getCanonicalPathname(pathname);

  if (mode === "standard") {
    return canonicalPathname;
  }

  return canonicalPathname === "/" ? TOTEM_ROUTE_PREFIX : `${TOTEM_ROUTE_PREFIX}${canonicalPathname}`;
}

export function getModeAwareHref(href: string, mode: AppMode) {
  const [pathAndQuery, hash = ""] = href.split("#");
  const [pathname, queryString = ""] = pathAndQuery.split("?");
  const modeAwarePathname = getModeAwarePathname(pathname || "/", mode);
  const withTrailingSlash = modeAwarePathname === "/" ? "/" : 
    (modeAwarePathname.endsWith("/") ? modeAwarePathname : `${modeAwarePathname}/`);

  return `${withTrailingSlash}${queryString ? `?${queryString}` : ""}${hash ? `#${hash}` : ""}`;
}

export function getCanonicalHref(href: string) {
  const [pathAndQuery, hash = ""] = href.split("#");
  const [pathname, queryString = ""] = pathAndQuery.split("?");
  const canonicalPathname = getCanonicalPathname(pathname || "/");
  const withTrailingSlash = canonicalPathname === "/" ? "/" : 
    (canonicalPathname.endsWith("/") ? canonicalPathname : `${canonicalPathname}/`);

  return `${withTrailingSlash}${queryString ? `?${queryString}` : ""}${hash ? `#${hash}` : ""}`;
}
