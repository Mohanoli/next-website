import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.sanakisan.magnus.com.np",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
