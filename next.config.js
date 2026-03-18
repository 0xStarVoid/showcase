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
  modularizeImports: {
    "lucide-react": { transform: "lucide-react/dist/esm/icons/{{ kebabCase member }}" },
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  webpack: (config) => {
    config.resolve.alias["framer-motion"] = path.resolve(__dirname, "lib/motion.js");
    return config;
  },
};

module.exports = nextConfig;
