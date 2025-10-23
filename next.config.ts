import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove standalone output - it's designed for Docker and doesn't copy public files
  // For standard deployments, use the default output or 'export' for static sites
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c1.scryfall.com",
      },
      {
        protocol: "https",
        hostname: "cards.scryfall.io",
      },
    ],
    // For static export, images need to be unoptimized
    unoptimized: true,
  },
};

export default nextConfig;
