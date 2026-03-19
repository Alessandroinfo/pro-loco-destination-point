import { createServer } from "node:http";
import { access, readFile, stat } from "node:fs/promises";
import { constants } from "node:fs";
import { extname, join, resolve } from "node:path";

const outputDirectory = resolve(process.cwd(), "out");
const port = Number(process.env.PORT || 3000);
const basePath = normalizeBasePath(process.env.BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH || "");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8"
};

createServer(async (request, response) => {
  try {
    if (!request.url) {
      respondNotFound(response);
      return;
    }

    const requestUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);
    const mountedPathname = stripMountedBasePath(requestUrl.pathname);

    if (mountedPathname === null) {
      if (basePath && requestUrl.pathname === "/") {
        response.writeHead(302, { Location: `${basePath}/` });
        response.end();
        return;
      }

      respondNotFound(response);
      return;
    }

    const filePath = await resolveExportPath(mountedPathname);

    if (!filePath) {
      respondNotFound(response);
      return;
    }

    const fileContents = await readFile(filePath);
    const contentType = mimeTypes[extname(filePath)] || "application/octet-stream";

    response.writeHead(200, {
      "Cache-Control": "no-cache",
      "Content-Type": contentType
    });

    if (request.method !== "HEAD") {
      response.end(fileContents);
      return;
    }

    response.end();
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Internal server error");
  }
}).listen(port, () => {
  const previewUrl = `http://localhost:${port}${basePath ? `${basePath}/` : "/"}`;

  console.log(`Serving exported app from ${outputDirectory}`);
  console.log(`Preview URL: ${previewUrl}`);
});

function normalizeBasePath(value) {
  if (!value || value === "/") {
    return "";
  }

  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;

  return withLeadingSlash.replace(/\/+$/g, "");
}

function stripMountedBasePath(pathname) {
  if (!basePath) {
    return pathname;
  }

  if (pathname === basePath || pathname === `${basePath}/`) {
    return "/";
  }

  if (!pathname.startsWith(`${basePath}/`)) {
    return null;
  }

  return pathname.slice(basePath.length) || "/";
}

async function resolveExportPath(pathname) {
  const relativePath = pathname.replace(/^\/+/, "");
  const candidates = pathname === "/"
    ? [resolve(outputDirectory, "index.html")]
    : [
        resolve(outputDirectory, relativePath, "index.html"),
        resolve(outputDirectory, relativePath)
      ];

  for (const candidate of candidates) {
    if (!candidate.startsWith(outputDirectory)) {
      continue;
    }

    try {
      await access(candidate, constants.R_OK);
      const fileStats = await stat(candidate);

      if (!fileStats.isFile()) {
        continue;
      }

      return candidate;
    } catch {
      continue;
    }
  }

  return null;
}

function respondNotFound(response) {
  response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Not found");
}
