"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendar, FaMapMarkerAlt, FaArrowRight, FaChevronLeft, FaChevronRight, FaCheckCircle } from 'react-icons/fa';
import { getUpcomingEvents, getPastEvents, Event } from '@/utils/events';
import { useI18n } from '@/i18n';

const ScrollableEvents: React.FC = () => {
  const { t, locale } = useI18n();
  
  // Load events asynchronously on client
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const [upcoming, past] = await Promise.all([
          getUpcomingEvents(),
          getPastEvents(),
        ]);
        if (!isMounted) return;
        setUpcomingEvents(upcoming || []);
        setPastEvents(past || []);
      } catch (err) {
        console.error('Failed to load events:', err);
        if (!isMounted) return;
        setUpcomingEvents([]);
        setPastEvents([]);
      }
    })();
    return () => { isMounted = false; };
  }, []);
  const events = [...upcomingEvents, ...pastEvents];
  
  // Core state and refs.
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(false);
  const rafIdRef = useRef<number | null>(null);

  
  // Enable auto-scroll when the section is in view.
  useEffect(() => {
    if (isInView) {
      setIsAutoScrollEnabled(true);
    } else {
      setIsAutoScrollEnabled(false);
    }
  }, [isInView]);
  
  // Drag-related refs.
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  
  // Duplicate events to simulate infinite scrolling.
  const repeatedEvents = [...events, ...events, ...events];

  // 1) Base utilities (no dependencies on other callbacks).
  // ----------------------------------------
  
  // Safely read container metrics.
  const getContainerInfo = useCallback(() => {
    if (!scrollContainerRef.current) {
      return { container: null, totalWidth: 0, viewWidth: 0, maxScroll: 0, currentScroll: 0 };
    }
    
    const container = scrollContainerRef.current;
    const totalWidth = container.scrollWidth;
    const viewWidth = container.clientWidth;
    const maxScroll = Math.max(0, totalWidth - viewWidth);
    const currentScroll = container.scrollLeft;
    
    return { container, totalWidth, viewWidth, maxScroll, currentScroll };
  }, []);
  
  // Calculate the width of one full card set.
  const getCardSetWidth = useCallback(() => {
    if (!scrollContainerRef.current) return 0;
    
    const container = scrollContainerRef.current;
    const cardElements = container.querySelectorAll('[data-event-card]');
    
    // If cards have not rendered yet, return an estimate.
    if (!cardElements.length) return events.length * 324; // 300px card width + 24px gap (estimate).
    
    // Measure the first complete card set.
    const firstCardSet = Array.from(cardElements).slice(0, events.length);
    if (firstCardSet.length === 0) return 0;
    
    // Measure first and last card positions to calculate total width.
    const firstCard = firstCardSet[0];
    const lastCard = firstCardSet[firstCardSet.length - 1];
    
    if (!firstCard || !lastCard) return 0;
    
    const firstRect = firstCard.getBoundingClientRect();
    const lastRect = lastCard.getBoundingClientRect();
    
    // Include the final card width and its trailing gap.
    return (lastRect.right - firstRect.left);
  }, [events.length]);
  
  // Fix out-of-range scroll positions.
  const checkAndFixScroll = useCallback(() => {
    const { container, maxScroll, currentScroll } = getContainerInfo();
    if (!container) return false;
    
    // Clamp negative scroll positions.
    if (currentScroll < 0) {
      container.scrollLeft = 0;
      return true;
    }
    
    // Clamp overflow beyond max scroll.
    if (currentScroll > maxScroll && maxScroll > 0) {
      container.scrollLeft = maxScroll;
      return true;
    }
    
    return false;
  }, [getContainerInfo]);
  
  // 2) Infinite scroll logic (depends on base utilities).
  // ----------------------------------------
  
  // Handle infinite scroll adjustments.
  const handleInfiniteScroll = useCallback(() => {
    const { container, maxScroll, currentScroll } = getContainerInfo();
    if (!container) return false;
    
    // First, fix any out-of-range scroll position.
    if (checkAndFixScroll()) return true;
    
    const cardSetWidth = getCardSetWidth();
    if (cardSetWidth <= 0) return false;
    
    // Adaptive threshold to keep behavior consistent across sizes.
    const jumpThreshold = Math.max(30, cardSetWidth * 0.15);
    
    // Detect and adjust at the left boundary.
    if (currentScroll < jumpThreshold) {
      // Adjust precisely to avoid a visible jump.
      container.scrollLeft = currentScroll + cardSetWidth;
      return true;
    }
    
    // Detect and adjust at the right boundary.
    if (currentScroll > maxScroll - jumpThreshold && maxScroll > 0) {
      container.scrollLeft = currentScroll - cardSetWidth;
      return true;
    }
    
    return false;
  }, [getContainerInfo, checkAndFixScroll, getCardSetWidth]);
  
  // 3) Scroll + animation (depends on infinite scroll logic).
  // ----------------------------------------
  
  // Inertia animation.
  const animateScroll = useCallback(() => {
    const { container } = getContainerInfo();
    if (!container) return;
    
    const now = Date.now();
    const elapsed = now - lastMoveTimeRef.current;
    
    // Apply inertia deceleration.
    if (elapsed > 40 && Math.abs(velocityRef.current) > 0.1) {
      // Dynamic friction for a more natural feel.
      const friction = Math.min(0.98, 0.96 + (Math.abs(velocityRef.current) * 0.01));
      velocityRef.current *= friction;
      
      // Smooth scrolling.
      container.scrollLeft += velocityRef.current;
      
      // Check and handle infinite scrolling.
      handleInfiniteScroll();
      
      // Stop animation once velocity is negligible.
      if (Math.abs(velocityRef.current) < 0.1) {
        velocityRef.current = 0;
        rafIdRef.current = null;
        
        // Re-enable auto-scroll after deceleration.
        setTimeout(() => {
          setIsAutoScrollEnabled(true);
        }, 300);
        
        return;
      }
      
      rafIdRef.current = requestAnimationFrame(animateScroll);
    } else {
      rafIdRef.current = null;
    }
  }, [getContainerInfo, handleInfiniteScroll]);
  
  // 4) User interaction handlers (depends on animation + infinite scroll).
  // ----------------------------------------
  
  // Touch/mouse down.
  const handleDragStart = useCallback((clientX: number) => {
    const { container } = getContainerInfo();
    if (!container) return;
    
    // Cancel any ongoing animations.
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    
    setIsDragging(true);
    setIsAutoScrollEnabled(false);
    
    const rect = container.getBoundingClientRect();
    startXRef.current = clientX - rect.left;
    scrollLeftRef.current = container.scrollLeft;
    lastXRef.current = clientX;
    lastMoveTimeRef.current = Date.now();
    velocityRef.current = 0;
  }, [getContainerInfo]);
  
  // Touch/mouse move.
  const handleDragMove = useCallback((clientX: number) => {
    const { container } = getContainerInfo();
    if (!isDragging || !container) return;
    
    const now = Date.now();
    const deltaTime = now - lastMoveTimeRef.current;
    
    if (deltaTime > 0) {
      const deltaX = clientX - lastXRef.current;
      velocityRef.current = deltaX * 0.4; // Increase inertia multiplier.
      lastXRef.current = clientX;
      lastMoveTimeRef.current = now;
    }
    
    const x = clientX - container.getBoundingClientRect().left;
    const walk = (startXRef.current - x) * 1.1; // Increase multiplier for responsiveness.
    
    // Update scroll position immediately.
    container.scrollLeft = scrollLeftRef.current + walk;
    
    // Randomized checks balance performance and UX.
    if (Math.random() < 0.1) {
      handleInfiniteScroll();
    }
  }, [isDragging, getContainerInfo, handleInfiniteScroll]);
  
  // Touch/mouse up.
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    
    // Check if we reached the boundary.
    handleInfiniteScroll();
    
    // Apply inertia.
    if (Math.abs(velocityRef.current) > 0.1) {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(animateScroll);
    } else {
      // No significant velocity: re-enable auto-scroll immediately.
      setTimeout(() => {
        setIsAutoScrollEnabled(true);
      }, 300);
    }
  }, [handleInfiniteScroll, animateScroll]);
  
  // 5) Auto-scroll (depends on infinite scroll logic).
  // ----------------------------------------
  
  // Auto-scroll loop.
  useEffect(() => {
    let frameId: number | null = null;
    let lastTimestamp = 0;
    
    const autoScroll = (timestamp: number) => {
      if (!isAutoScrollEnabled) {
        lastTimestamp = 0;
        return;
      }
      
      const { container } = getContainerInfo();
      if (!container) {
        lastTimestamp = 0;
        return;
      }
      
      // Compute time delta.
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      
      // Cap maximum time delta.
      const effectiveDelta = Math.min(deltaTime, 32);
      
      // Compute scroll increment.
      const scrollIncrement = (effectiveDelta / 1000) * 25; // 25px per second.
      
      // Scroll and check infinite loop.
      container.scrollLeft += scrollIncrement;
      handleInfiniteScroll();
      
      // Continue loop.
      if (isAutoScrollEnabled) {
        frameId = requestAnimationFrame(autoScroll);
      }
    };
    
    // Start auto-scroll.
    if (isAutoScrollEnabled) {
      frameId = requestAnimationFrame(autoScroll);
    }
    
    // Cleanup.
    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [isAutoScrollEnabled, getContainerInfo, handleInfiniteScroll]);
  
  // 6) Event listeners.
  // ----------------------------------------
  
  // Add event listeners.
  useEffect(() => {
    // Touch event handling.
    const handleTouchStart = (e: TouchEvent) => {
      handleDragStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleDragMove(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (isDragging) {
        handleDragEnd();
      }
    };

    // Mouse event handling.
    const handleMouseDown = (e: MouseEvent) => {
      handleDragStart(e.clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleDragMove(e.clientX);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        handleDragEnd();
      }
    };

    // Add event listeners.
    const element = scrollContainerRef.current;
    if (element) {
      element.addEventListener('touchstart', handleTouchStart, { passive: true });
      element.addEventListener('touchmove', handleTouchMove, { passive: false });
      element.addEventListener('touchend', handleTouchEnd);
      
      element.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    // Cleanup.
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      
      if (element) {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
        element.removeEventListener('touchend', handleTouchEnd);
        
        element.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [isDragging, handleDragStart, handleDragMove, handleDragEnd]);
  
  // 7) Accessibility helpers.
  // ----------------------------------------
  
  // Scroll buttons.
  const scrollToLeft = () => {
    const { container } = getContainerInfo();
    if (container) {
      const curLeft = container.scrollLeft;
      container.scrollTo({
        left: curLeft - 400,
        behavior: 'smooth'
      });
    }
  };

  const scrollToRight = () => {
    const { container } = getContainerInfo();
    if (container) {
      const curLeft = container.scrollLeft;
      container.scrollTo({
        left: curLeft + 400,
        behavior: 'smooth'
      });
    }
  };

  // 8) Render.
  // ----------------------------------------
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span dangerouslySetInnerHTML={{ __html: t("scrollableEvents.title") as string }}></span>
              <span className="text-sm md:text-base font-normal text-gray-500 dark:text-gray-400 ml-1">{t("scrollableEvents.pastEventsNote")}</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("scrollableEvents.subtitle")}
            </p>
          </div>
          
          <Link href="/events" className="text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium hover:underline flex items-center">
            {t("scrollableEvents.viewAllEvents")} <FaArrowRight className="ml-2" />
          </Link>
        </div>
        
        <div className="relative">
          {/* Scroll buttons */}
          <button 
            onClick={scrollToLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-shadow transform -translate-x-1/2 focus:outline-none"
            aria-label="滾動向左"
          >
            <FaChevronLeft className="text-gray-700 dark:text-gray-300" />
          </button>
          
          <button 
            onClick={scrollToRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:shadow-lg transition-shadow transform translate-x-1/2 focus:outline-none"
            aria-label="滾動向右"
          >
            <FaChevronRight className="text-gray-700 dark:text-gray-300" />
          </button>
          
          {/* Drag hint */}
          <div className="text-center mb-4 text-gray-500 dark:text-gray-400 text-sm">
            <span className="inline-flex items-center">
              <motion.div 
                animate={isInView ? { x: [-5, 5, -5] } : {}}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mr-2"
              >
                {t("scrollableEvents.dragHint")}
              </motion.div>
            </span>
          </div>
          
          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className={`flex space-x-6 overflow-x-auto py-4 px-2 scrollbar-hide select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            } will-change-scroll`}
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'auto',
              scrollSnapType: 'none', // Disable snapping for smoother scrolling.
              touchAction: 'pan-x',
            }}
          >
            {repeatedEvents.map((event, index) => (
              <motion.div
                key={`${event.slug}-${index}`}
                className="flex-shrink-0 w-[300px] bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                data-event-card
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    duration: 0.3, 
                    delay: Math.min((index % events.length) * 0.05, 0.3) 
                  }
                }}
                viewport={{ once: true, margin: "100px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-40 relative will-change-transform">
                  <Image 
                    src={event.frontmatter.image} 
                    alt={event.frontmatter.title} 
                    fill 
                    style={{ objectFit: 'cover' }}
                    sizes="300px"
                    loading={index < 12 ? "eager" : "lazy"}
                    draggable="false"
                  />
                  
                  {/* Transparent hit shield to prevent direct image clicks */}
                  <div 
                    className="absolute inset-0 z-10 cursor-grab" 
                    aria-hidden="true"
                    style={{ touchAction: 'pan-x' }}
                  ></div>
                  
                  
                  
                  
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1 dark:text-white">{event.frontmatter.title}</h3>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center text-gray-500 dark:text-gray-300">
                      <FaCalendar className="mr-2 text-primary text-xs" />
                      <span>
                        {new Date(event.frontmatter.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}
                        {' '}{event.frontmatter.time}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-300">
                      <FaMapMarkerAlt className="mr-2 text-primary text-xs" />
                      <span className="line-clamp-1">{event.frontmatter.location}</span>
                    </div>
                  </div>
                  
                  {/* Event details / external link button */}
                  {event.frontmatter.url ? (
                    <a 
                      href={event.frontmatter.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`inline-block w-full text-center py-2 rounded-lg transition-colors ${
                        event.frontmatter.isCompleted 
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' 
                          : 'bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30'
                      }`}
                    >
                      {event.frontmatter.isCompleted ? t("scrollableEvents.viewRecap") : t("scrollableEvents.viewDetails")}
                    </a>
                  ) : (
                    <button 
                      className="inline-block w-full text-center py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed" 
                      disabled
                    >
                      {t("scrollableEvents.noMoreInfo")}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollableEvents; 
