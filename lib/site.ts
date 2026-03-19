export const fallbackSiteOrigin = "https://example.com";

function stripTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function stripQueryAndHash(pathname: string) {
  return pathname.split("#")[0]?.split("?")[0] ?? pathname;
}

function normalizePathInput(pathname: string | null | undefined) {
  const pathWithoutQueryOrHash = stripQueryAndHash(pathname?.trim() || "/");

  if (pathWithoutQueryOrHash === "" || pathWithoutQueryOrHash === "/") {
    return "/";
  }

  return pathWithoutQueryOrHash.startsWith("/") ? pathWithoutQueryOrHash : `/${pathWithoutQueryOrHash}`;
}

export function getBasePath() {
  const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();

  if (!configuredBasePath || configuredBasePath === "/") {
    return "";
  }

  const normalizedBasePath = configuredBasePath.startsWith("/") ? configuredBasePath : `/${configuredBasePath}`;

  return stripTrailingSlash(normalizedBasePath);
}

export function normalizePathname(pathname: string | null | undefined) {
  const normalizedPathInput = normalizePathInput(pathname);

  if (normalizedPathInput === "/") {
    return "/";
  }

  return normalizedPathInput.endsWith("/") ? normalizedPathInput : `${normalizedPathInput}/`;
}

export function stripBasePath(pathname: string | null | undefined) {
  const normalizedPathname = normalizePathInput(pathname);
  const basePath = getBasePath();

  if (!basePath) {
    return normalizedPathname;
  }

  if (normalizedPathname === basePath) {
    return "/";
  }

  if (normalizedPathname === `${basePath}/`) {
    return "/";
  }

  if (normalizedPathname.startsWith(`${basePath}/`)) {
    return normalizedPathname.slice(basePath.length) || "/";
  }

  return normalizedPathname;
}

export function withBasePath(pathname: string) {
  if (/^(?:[a-z]+:)?\/\//i.test(pathname) || pathname.startsWith("data:") || pathname.startsWith("blob:")) {
    return pathname;
  }

  const basePath = getBasePath();
  const normalizedPathname = normalizePathInput(pathname);

  if (!basePath) {
    return normalizedPathname;
  }

  if (normalizedPathname === basePath || normalizedPathname.startsWith(`${basePath}/`)) {
    return normalizedPathname;
  }

  return normalizedPathname === "/" ? `${basePath}/` : `${basePath}${normalizedPathname}`;
}

function joinBaseUrlAndPath(baseUrl: string, pathname: string, { route = false }: { route?: boolean } = {}) {
  const normalizedBaseUrl = `${stripTrailingSlash(baseUrl)}/`;
  const normalizedPathname = route ? normalizePathname(pathname) : normalizePathInput(pathname);
  const relativePathname = normalizedPathname === "/" ? "" : normalizedPathname.slice(1);

  return new URL(relativePathname, normalizedBaseUrl).toString();
}

export function getSiteUrl() {
  return stripTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL ?? `${fallbackSiteOrigin}${getBasePath()}`);
}

export function getAbsoluteUrl(pathname: string) {
  return joinBaseUrlAndPath(getSiteUrl(), stripBasePath(pathname));
}

export function getAbsoluteRouteUrl(pathname: string) {
  return joinBaseUrlAndPath(getSiteUrl(), stripBasePath(pathname), { route: true });
}

export function getRuntimeAbsoluteUrl(origin: string, pathname: string) {
  return joinBaseUrlAndPath(`${stripTrailingSlash(origin)}${getBasePath()}`, stripBasePath(pathname), { route: true });
}
