const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react"],
  },
  turbopack: {
    resolveAlias: {
      "framer-motion": "./lib/motion.js",
    },
  },
  webpack: (config) => {
    config.resolve.alias["framer-motion"] = path.resolve(__dirname, "lib/motion.js");
    return config;
  },
};

module.exports = nextConfig;
