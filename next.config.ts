import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // The site and the /concept preview use separate root layouts, so the
    // 404 for unmatched URLs comes from src/app/global-not-found.tsx.
    globalNotFound: true,
  },
};

export default nextConfig;
