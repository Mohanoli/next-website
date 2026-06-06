import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "api.website.magnus.com.np",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;