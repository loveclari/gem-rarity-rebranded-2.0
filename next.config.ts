import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true
  },
  eslint: {
    // Disable ESLint during builds to avoid deployment issues
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
