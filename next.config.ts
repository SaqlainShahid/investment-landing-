import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // enable browser source maps in production for readable stack traces
  productionBrowserSourceMaps: true,
  // turn on strict mode to help surface hook misuse during development
  reactStrictMode: true
};

export default nextConfig;
