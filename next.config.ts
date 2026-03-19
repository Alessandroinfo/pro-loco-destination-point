import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim()
  ? `/${process.env.NEXT_PUBLIC_BASE_PATH.trim().replace(/^\/+|\/+$/g, "")}`
  : undefined;

const nextConfig: NextConfig = {
  assetPrefix: basePath,
  basePath,
  output: "export",
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  trailingSlash: true
};

export default nextConfig;
