/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '2227df6066871acd662b5e0cce755807.r2.cloudflarestorage.com',
        pathname: '/nocodb/**',
      },
    ],
  },
  output: 'standalone',
  experimental: {
    // Ensure vendor chunk is generated for framer-motion to avoid missing vendor-chunks errors
    optimizePackageImports: ['framer-motion'],
  },
};

module.exports = nextConfig; 
