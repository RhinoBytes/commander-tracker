import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
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
  },
};

export default nextConfig;
