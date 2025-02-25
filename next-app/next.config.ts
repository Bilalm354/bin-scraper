import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, _options) => {
    config.module.rules.push({
      test: /\.node/,
      use: "node-loader",
    });

    return config;
  },
};

export default nextConfig;
