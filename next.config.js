/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  output: 'standalone',
  experimental: {
    // Ensure vendor chunk is generated for framer-motion to avoid missing vendor-chunks errors
    optimizePackageImports: ['framer-motion'],
  },
};

module.exports = nextConfig; 