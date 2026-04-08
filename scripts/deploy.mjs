import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

loadDotEnv();

const helpText = `Usage: npm run deploy

Required environment variables:
- DEPLOY_SERVICE=github-pages|vercel|netlify|cloudflare-pages

Optional environment variables:
- DEPLOY_ENV=production|preview   (default: production)
- DEPLOY_YES=true                 pass non-interactive confirmation when supported
- GITHUB_PAGES_WORKFLOW=<file>    workflow file for GitHub Pages (default: deploy-pages.yml)
- CLOUDFLARE_PROJECT_NAME=<name>  required for Cloudflare Pages deploys
- CLOUDFLARE_BRANCH=<name>        optional preview branch for Cloudflare Pages
`;

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(helpText);
  process.exit(0);
}

const deployService = (process.env.DEPLOY_SERVICE || "").trim().toLowerCase();
const deployEnvironment = (process.env.DEPLOY_ENV || "production").trim().toLowerCase();
const deployYes = (process.env.DEPLOY_YES || "").trim().toLowerCase() === "true";

if (!deployService) {
  console.error("[deploy] Missing DEPLOY_SERVICE.");
  console.error(helpText.trim());
  process.exit(1);
}

if (!["production", "preview"].includes(deployEnvironment)) {
  console.error(`[deploy] Unsupported DEPLOY_ENV: ${deployEnvironment}`);
  process.exit(1);
}

run("npm", ["run", "build"]);

switch (deployService) {
  case "github-pages":
    deployGithubPages();
    break;
  case "vercel":
    deployVercel();
    break;
  case "netlify":
    deployNetlify();
    break;
  case "cloudflare-pages":
    deployCloudflarePages();
    break;
  default:
    console.error(`[deploy] Unsupported DEPLOY_SERVICE: ${deployService}`);
    console.error("[deploy] Supported services: github-pages, vercel, netlify, cloudflare-pages.");
    process.exit(1);
}

function deployGithubPages() {
  const workflow = (process.env.GITHUB_PAGES_WORKFLOW || "deploy-pages.yml").trim() || "deploy-pages.yml";
  const currentBranch = capture("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
  const dirtyWorkingTree = capture("git", ["status", "--porcelain"]);

  if (dirtyWorkingTree) {
    console.warn("[deploy] Working tree has local changes. GitHub Pages will only deploy what is already pushed to the remote branch.");
  }

  if (!currentBranch || currentBranch === "HEAD") {
    console.error("[deploy] Unable to determine the current branch for GitHub Pages deployment.");
    process.exit(1);
  }

  console.log(`[deploy] Triggering ${workflow} on branch ${currentBranch}.`);
  run("gh", ["workflow", "run", workflow, "--ref", currentBranch]);
}

function deployVercel() {
  const args = ["--yes", "vercel", "deploy"];

  if (deployEnvironment === "production") {
    args.push("--prod");
  }

  if (!deployYes) {
    args.shift();
  }

  run("npx", args);
}

function deployNetlify() {
  const args = ["--yes", "netlify", "deploy", "--dir=out"];

  if (deployEnvironment === "production") {
    args.push("--prod");
  }

  if (!deployYes) {
    args.shift();
  }

  run("npx", args);
}

function deployCloudflarePages() {
  const projectName = (process.env.CLOUDFLARE_PROJECT_NAME || "").trim();
  const configuredBranch = (process.env.CLOUDFLARE_BRANCH || "").trim();
  const currentBranch = capture("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
  const previewBranch = configuredBranch || (currentBranch && currentBranch !== "HEAD" ? currentBranch : "preview");
  const args = ["wrangler", "pages", "deploy", "out", `--project-name=${projectName}`];

  if (!projectName) {
    console.error("[deploy] CLOUDFLARE_PROJECT_NAME is required when DEPLOY_SERVICE=cloudflare-pages.");
    process.exit(1);
  }

  if (deployEnvironment === "preview") {
    args.push(`--branch=${previewBranch}`);
  }

  run("npx", args);
}

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env: process.env
  });

  if (result.error) {
    if (result.error.code === "ENOENT") {
      console.error(`[deploy] Command not found: ${command}`);
    } else {
      console.error(`[deploy] Failed to run ${command}: ${result.error.message}`);
    }

    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function capture(command, args) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env: process.env
  });

  if (result.error || result.status !== 0) {
    return "";
  }

  return result.stdout.trim();
}

function loadDotEnv() {
  const envFilePath = resolve(process.cwd(), ".env");

  if (!existsSync(envFilePath)) {
    return;
  }

  const fileContents = readFileSync(envFilePath, "utf8");

  for (const rawLine of fileContents.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");

    if (separatorIndex <= 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();

    if (!key || Object.prototype.hasOwnProperty.call(process.env, key)) {
      continue;
    }

    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}