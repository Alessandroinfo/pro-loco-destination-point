/**
 * Post-build script: injects the list of all _next/static/ assets into out/sw.js
 * and sets CACHE_NAME to "pro-loco-hub-<BUILD_ID>" so the cache version is
 * automatically bumped on every deploy without any manual intervention.
 *
 * Run automatically as part of `npm run build`.
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const outDir = join(process.cwd(), "out");
const swPath = join(outDir, "sw.js");
const staticDir = join(outDir, "_next", "static");

function collectFiles(dir) {
  const results = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }

  return results;
}

// Derive BUILD_ID from the hashed directory Next.js creates inside _next/static/.
// e.g. _next/static/EZHZ0FhRReVKugpGo7Up8/ → "EZHZ0FhRReVKugpGo7Up8"
const buildIdEntry = readdirSync(staticDir, { withFileTypes: true }).find(
  (entry) => entry.isDirectory() && entry.name !== "chunks" && entry.name !== "media"
);

if (!buildIdEntry) {
  console.error("[inject-sw-precache] Could not find BUILD_ID directory inside _next/static/. Skipping.");
  process.exit(0);
}

const buildId = buildIdEntry.name;
const cacheName = `pro-loco-hub-${buildId}`;

// Collect every _next/static/ file, excluding source maps which are not needed offline.
const allStaticFiles = collectFiles(staticDir)
  .filter((f) => !f.endsWith(".map"))
  .map((f) => {
    // Convert absolute path to a URL-style path relative to out/.
    const rel = relative(outDir, f);
    return "/" + rel.split(sep).join("/");
  });

console.log(`[inject-sw-precache] BUILD_ID  : ${buildId}`);
console.log(`[inject-sw-precache] CACHE_NAME: ${cacheName}`);
console.log(`[inject-sw-precache] _next/static assets: ${allStaticFiles.length} files`);

// Patch out/sw.js — replace the two placeholders left by public/sw.js.
let sw = readFileSync(swPath, "utf8");

// 1. Bump the cache name to the build-specific version.
const cacheNameReplaced = sw.replace(
  /const CACHE_NAME = "pro-loco-hub-[^"]+";/,
  `const CACHE_NAME = "${cacheName}";`
);

if (cacheNameReplaced === sw) {
  console.warn("[inject-sw-precache] Warning: CACHE_NAME pattern not found in out/sw.js.");
}

sw = cacheNameReplaced;

// 2. Inject the full asset list into the NEXT_STATIC_ASSETS placeholder.
const assetsJson = JSON.stringify(allStaticFiles, null, 2);
const assetsReplaced = sw.replace("const NEXT_STATIC_ASSETS = [];", `const NEXT_STATIC_ASSETS = ${assetsJson};`);

if (assetsReplaced === sw) {
  console.warn("[inject-sw-precache] Warning: NEXT_STATIC_ASSETS placeholder not found in out/sw.js.");
}

sw = assetsReplaced;

writeFileSync(swPath, sw, "utf8");
console.log("[inject-sw-precache] Done. out/sw.js updated successfully.");
