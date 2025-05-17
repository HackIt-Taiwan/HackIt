/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // App Router 不支持舊版的 i18n 配置方式，
  // 而是通過 [locale] 目錄實現，我們已有相應目錄
};

module.exports = nextConfig; 