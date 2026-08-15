import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 100],
    // Allow Wix-hosted product images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.wixmp.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
