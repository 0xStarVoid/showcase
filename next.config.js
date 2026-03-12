const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "qrcode.react"],
  },
  webpack: (config) => {
    config.resolve.alias["framer-motion"] = path.resolve(__dirname, "lib/motion.js");
    return config;
  },
};

module.exports = nextConfig;
