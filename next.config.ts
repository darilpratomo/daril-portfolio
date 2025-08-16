import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Jangan fail build gara-gara error ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
