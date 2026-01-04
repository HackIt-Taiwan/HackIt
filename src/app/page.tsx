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

// SEO metadata for the root route.
export const metadata = {
  title: 'HackIt - 青少年程式創意社群',
  description: 'HackIt 是台灣首個由青少年主導的創造型社群，我們自己辦活動、自己寫程式、自己改變世界。拒絕填鴨、拒絕等待，HackIt 要讓每一位青少年，親手打造屬於自己的未來。',
};

// Redirect the root route to the default locale path.
export default function Home() {
  redirect(`/${defaultLocale}`);
}
