import { redirect } from 'next/navigation';
import { defaultLocale } from '@/middleware';
import React from 'react';
import HeroSection from '@/components/HeroSection';
import YouthIntroSection from '@/components/YouthIntroSection';
import FeaturedEvents from '@/components/FeaturedEvents';
import ScrollableEvents from '@/components/ScrollableEvents';
import LatestNewsSection from '@/components/LatestNewsSection';
import CTASection from '@/components/CTASection';
import TechAnimation from '@/components/TechAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// 定義 metadata 用於 SEO
export const metadata = {
  title: 'HackIt - 青少年程式創意社群',
  description: 'HackIt 是一個專為 13-18 歲青少年打造的科技學習平台，透過實作工作坊、黑客松和課程，培養未來的科技創新者。',
};

// 根路由重定向到默認語言路徑
export default function Home() {
  redirect(`/${defaultLocale}`);
} 