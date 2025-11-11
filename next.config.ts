import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eu-images.contentstack.com',
      },
    ],
  },
  // Fix source map issues with external packages
  productionBrowserSourceMaps: false,
  webpack: (config, { isServer, dev }) => {
    // Disable source maps for server-side builds to avoid issues with external packages
    if (isServer && !dev) {
      config.devtool = false;
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=0, s-maxage=86400, must-revalidate'
          }
        ]
      }
    ];
  },
};

export default nextConfig;