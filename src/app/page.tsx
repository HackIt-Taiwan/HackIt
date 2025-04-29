import React from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import TechSection from '@/components/TechSection';
import EventsSection from '@/components/EventsSection';
import TestimonialSection from '@/components/TestimonialSection';
import CTASection from '@/components/CTASection';
import TechAnimation from '@/components/TechAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
        <AboutSection />
      </div>
      
      {/* Tech skills section */}
      <TechSection />
      
      {/* Events section */}
      <EventsSection />
      
      {/* Testimonial section */}
      <TestimonialSection />
      
      {/* CTA section */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
} 