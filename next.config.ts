import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 在构建时忽略 ESLint 错误和警告
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 在构建时忽略 TypeScript 错误
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
