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
  description: 'HackIt 是台灣首個由青少年主導的創造型社群，我們自己辦活動、自己寫程式、自己改變世界。拒絕填鴨、拒絕等待，HackIt 要讓每一位青少年，親手打造屬於自己的未來。',
};

export default function LocaleHome() {
  return (
    <main className="relative">
      <Navbar />
      
      {/* Hero section */}
      <HeroSection />
      
      {/* 青少年介紹區塊 */}
      <YouthIntroSection />
      
      {/* 大型精選活動 */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 pointer-events-none">
          <TechAnimation />
        </div>
        <FeaturedEvents />
      </div>
      
      {/* 小型活動 (可橫向滾動) */}
      <ScrollableEvents />
      
      {/* 最新消息 */}
      <LatestNewsSection />
      
      {/* 加入我們 CTA */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
} 