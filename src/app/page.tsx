import React from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import EventsSection from '@/components/EventsSection';
import CTASection from '@/components/CTASection';
import TechAnimation from '@/components/TechAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedConnector from '@/components/AnimatedConnector';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      
      {/* Hero section */}
      <HeroSection />
      
      {/* About section */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-30 pointer-events-none">
          <TechAnimation />
        </div>
        <AnimatedSection>
          <AboutSection />
        </AnimatedSection>
      </div>
      
      {/* Events section with enhanced animation */}
      <AnimatedSection animation="slideUp">
        <EventsSection />
      </AnimatedSection>
      
      {/* Animated connection element */}
      <AnimatedConnector />
      
      {/* CTA section */}
      <AnimatedSection animation="scale">
        <CTASection />
      </AnimatedSection>
      
      {/* Footer */}
      <Footer />
    </main>
  );
} 