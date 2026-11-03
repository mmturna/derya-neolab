import type { NextConfig } from "next";

const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: process.env.STATIC_EXPORT ? "export" : undefined,
  basePath,
};

export default nextConfig;
