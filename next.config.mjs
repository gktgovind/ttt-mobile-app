/** @type {import('next').NextConfig} */
import CompressionPlugin from "compression-webpack-plugin";

const nextConfig = {
  distDir: 'build',
  compiler:{
      removeConsole: true,
  },
  reactStrictMode: true,
  // Do not enable experimental options unless you're sure
  experimental: {
    // optional, not required for now
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.triptotemples.com",
      },
      {
        protocol: "https",
        hostname: "www.triptotemples.com",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Add compression plugin only on the client-side build
    if (!isServer) {
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|html|svg|jpeg|jpg|png|webp)$/,
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }
    return config;
  },
};

export default nextConfig;
