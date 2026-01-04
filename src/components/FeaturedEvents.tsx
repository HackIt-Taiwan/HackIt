"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendar, FaMapMarkerAlt, FaArrowRight, FaRegLightbulb, FaRegCompass, FaStar, FaPaperclip, FaThumbtack } from 'react-icons/fa';
import { Event, getFeaturedEvents } from '@/utils/events';
import { useI18n } from '@/i18n';

// Note: use Tailwind arbitrary values + dark variants to keep dark mode consistent.

// Hand-drawn SVG path for decorative squiggles.
const randomSquiggle = () => {
  const start = Math.random() * 20;
  return `M${start},10 
    Q${start + 10},${5 + Math.random() * 10} ${start + 20},10 
    T${start + 40},10 
    T${start + 60},10 
    T${start + 80},10`;
};

// Legacy DOM observers were removed to avoid React re-render conflicts.

const FeaturedEvents: React.FC = () => {
  // i18n copy.
  const { t } = useI18n();
  
  // Load featured events on client
  const [featuredEvents, setFeaturedEvents] = React.useState<Event[]>([]);
  React.useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const events = await getFeaturedEvents();
        if (isMounted) setFeaturedEvents(events || []);
      } catch (err) {
        console.error('Failed to load featured events:', err);
        if (isMounted) setFeaturedEvents([]);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);
  
  // Hide the section when no featured events are available.
  if (featuredEvents.length === 0) {
    return null;
  }
  
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100 dark:bg-indigo-900 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100 dark:bg-purple-900 rounded-full blur-3xl"></div>
        
        {/* Playful waves and lines */}
        <svg width="100%" height="100%" className="absolute top-0 left-0">
          <motion.path 
            d={randomSquiggle()}
            stroke="#6366F1" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.path 
            d={randomSquiggle()} 
            stroke="#8B5CF6" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 2, delay: 1 }}
            style={{ transform: "translateY(50px)" }}
          />
        </svg>
        
        {/* Hand-drawn stars */}
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute text-yellow-400 dark:text-yellow-300" 
            style={{ 
              top: `${20 + i * 15}%`, 
              left: `${10 + i * 20}%`,
              fontSize: `${20 + i * 5}px`,
              opacity: 0.2
            }}
            animate={{ 
              rotate: [0, 20, -20, 0],
              scale: [1, 1.2, 0.9, 1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              delay: i * 0.7 
            }}
          >
            <FaStar />
          </motion.div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          {/* Hand-drawn label */}
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="px-5 py-3 bg-white dark:bg-gray-800 border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-lg inline-flex items-center gap-2 shadow-sm transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <motion.div
                animate={{ 
                  rotate: [-10, 10, -10],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <FaRegLightbulb className="text-indigo-500 dark:text-indigo-400 text-lg" />
              </motion.div>
              <span className="text-indigo-700 dark:text-indigo-300 font-bold text-base">{t("featuredEvents.tagline")}</span>
            </div>
          </motion.div>
          
          {/* Hand-drawn title */}
          <div className="relative inline-block">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-2 text-gray-800 dark:text-gray-100 relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t("featuredEvents.title.first")}<span className="text-indigo-600 dark:text-indigo-400">{t("featuredEvents.title.highlighted")}</span>
            </motion.h2>
            
            {/* Hand-drawn underline */}
            <svg className="absolute left-0 bottom-0 w-full" height="15" viewBox="0 0 300 15" preserveAspectRatio="none">
              <motion.path 
                d="M0,10 C50,2 100,12 150,10 C200,8 250,13 300,10" 
                stroke="#8B5CF6"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 1.0, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </svg>
            
            {/* Decorative stars */}
            <svg className="absolute -right-14 -top-6 w-12 h-12" viewBox="0 0 50 50">
              <motion.path 
                d="M25,2 L30,20 L48,25 L30,30 L25,48 L20,30 L2,25 L20,20 L25,2 Z" 
                fill="#FDE68A"
                stroke="#F59E0B"
                strokeWidth="1"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 15 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                viewport={{ once: true }}
              />
            </svg>
          </div>
          
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {t("featuredEvents.subtitle")}
          </motion.p>
        </div>
        
        <div className="space-y-28">
          {featuredEvents.map((event, index) => (
            <motion.div
              key={event.slug}
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              {/* Scrapbook-style card layout */}
              <motion.div 
                className="relative max-w-5xl mx-auto"
                whileHover={{ rotate: index % 2 === 0 ? 1 : -1 }}
                transition={{ duration: 0.4 }}
              >
                {/* Backing plate */}
                <div className="absolute inset-0 bg-amber-50 dark:bg-amber-900 rounded-xl shadow-lg transform rotate-1 -z-10"></div>
                
                {/* Main card with a note-paper style */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-1 shadow-md overflow-hidden transform rotate-0">
                  <div className="grid md:grid-cols-2 h-full rounded-lg overflow-hidden">
                    {/* Left image area */}
                    <div className="relative h-[300px] md:h-full overflow-hidden">
                      {/* Photo corners */}
                      <div className="absolute top-0 left-0 w-0 h-0 border-t-[30px] border-l-[30px] border-white dark:border-gray-800 z-10"></div>
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-white dark:border-gray-800 z-10"></div>
                      <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[30px] border-l-[30px] border-white dark:border-gray-800 z-10"></div>
                      <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[30px] border-r-[30px] border-white dark:border-gray-800 z-10"></div>
                      
                      {/* Image */}
                      <Image 
                        src={event.frontmatter.image} 
                        alt={event.frontmatter.title} 
                        fill 
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-700"
                      />
                      
                      {/* Sticker overlay */}
                      <motion.div
                        className="absolute top-6 right-6 z-30 bg-yellow-300 dark:bg-yellow-600 px-3 py-2 rounded-lg shadow-md transform -rotate-6 text-gray-800 dark:text-gray-100 font-bold border-2 border-yellow-400 dark:border-yellow-500"
                        whileHover={{ rotate: 0, scale: 1.05 }}
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                      >
                        {event.frontmatter.emoji || "🔥"} {t("featuredEvents.eventSticker")}
                      </motion.div>
                      
                      {/* Paperclip decoration */}
                      <div className="absolute -top-2 left-8 z-30 text-blue-400 dark:text-blue-300 text-2xl transform rotate-12">
                        <FaPaperclip />
                      </div>
                      
                      {/* Highlight tag */}
                      <div className="absolute bottom-6 left-6 z-20">
                        <motion.div 
                          className="px-3 py-1 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 font-bold rounded-lg transform -rotate-2 border border-red-200 dark:border-red-700 flex items-center gap-1 text-sm shadow-sm"
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6, duration: 0.4 }}
                          viewport={{ once: true }}
                          whileHover={{ rotate: 2, y: -3 }}
                        >
                          <FaRegCompass className="text-red-500 dark:text-red-300" />
                          <span>{t("featuredEvents.popularTag")}</span>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* Right content area (note-paper style with dark variants) */}
                    <div 
                      className="p-6 md:p-8 flex flex-col dark:text-white bg-[linear-gradient(to_bottom,_white_29px,_#f0f0f0_1px)] dark:bg-[linear-gradient(to_bottom,_#0F172A_29px,_#1E293B_1px)] bg-[length:100%_30px] dark:bg-[length:100%_30px]"
                    >
                      {/* Title area */}
                      <div className="relative mb-2">
                        {/* Thumbtack decoration */}
                        <div className="absolute -top-6 right-2 text-gray-400 dark:text-gray-500 text-xl z-10">
                          <FaThumbtack />
                        </div>
                        
                        <motion.h3 
                          className="text-2xl md:text-3xl font-bold mb-1 text-indigo-700 dark:text-indigo-300"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                          viewport={{ once: true }}
                        >
                          {event.frontmatter.title}
                        </motion.h3>
                        
                        {/* Hand-drawn underline */}
                        <svg width="100%" height="8" viewBox="0 0 200 8">
                          <motion.path 
                            d="M0,4 C40,1 80,7 120,4 C160,1 200,7 240,4" 
                            stroke="#818CF8" 
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                          />
                        </svg>
                      </div>
                      
                      {/* Decorative marker */}
                      <div className="absolute right-6 md:right-8 top-6 md:top-8">
                        <motion.div
                          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-pink-100 dark:bg-pink-800 text-pink-600 dark:text-pink-200 font-mono text-xs md:text-sm font-bold border border-pink-200 dark:border-pink-700 transform rotate-6 shadow-sm"
                          whileHover={{ rotate: -6, scale: 1.1 }}
                        >
                          {new Date(event.frontmatter.date).getMonth() + 1}{t("featuredEvents.month")}
                        </motion.div>
                      </div>
                      
                      {/* Description */}
                      <motion.p 
                        className="text-gray-700 dark:text-gray-200 mb-6 font-medium relative"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        {event.frontmatter.description}
                      </motion.p>
                      
                      {/* Time and location */}
                      <div className="space-y-3 mb-8 font-mono text-sm">
                        <motion.div 
                          className="flex items-center text-gray-700 dark:text-gray-200"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-700 flex items-center justify-center mr-3">
                            <FaCalendar className="text-amber-600 dark:text-amber-200" />
                          </div>
                          <span>
                            {new Date(event.frontmatter.date).toLocaleDateString(t('common.language') === 'English' ? 'en-US' : 'zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}
                            {event.frontmatter.endDate && 
                              ` ${t("featuredEvents.dateTo")} ${new Date(event.frontmatter.endDate).toLocaleDateString(t('common.language') === 'English' ? 'en-US' : 'zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}`
                            }
                          </span>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-center text-gray-700 dark:text-gray-200"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5, duration: 0.6 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-7 h-7 rounded-full bg-teal-100 dark:bg-teal-700 flex items-center justify-center mr-3">
                            <FaMapMarkerAlt className="text-teal-600 dark:text-teal-200" />
                          </div>
                          <span>{event.frontmatter.location}</span>
                        </motion.div>
                      </div>
                      
                      {/* Footer actions */}
                      <div className="mt-auto">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.4 }}
                          viewport={{ once: true }}
                          className="relative"
                        >
                          {event.frontmatter.url ? (
                            <a
                              href={event.frontmatter.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg font-bold group w-full justify-center md:w-auto"
                            >
                              <span>{t("featuredEvents.learnMoreButton")}</span>
                              <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{
                                  repeat: Infinity,
                                  repeatType: "loop",
                                  duration: 1.5,
                                  repeatDelay: 1
                                }}
                              >
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                              </motion.div>
                            </a>
                          ) : (
                            <button
                              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-400 rounded-lg font-bold w-full justify-center md:w-auto cursor-not-allowed"
                              disabled
                            >
                              <span>{t("featuredEvents.noMoreInfo")}</span>
                            </button>
                          )}
                          {/* Hand-drawn emphasis line */}
                          <svg className="absolute -bottom-4 left-0 w-full" height="6" viewBox="0 0 100 6">
                            <motion.path
                              d="M0,3 C20,1 40,5 60,3 C80,1 100,5 120,3"
                              stroke="#6366F1"
                              strokeWidth="2"
                              strokeLinecap="round"
                              fill="none"
                              initial={{ pathLength: 0, opacity: 0 }}
                              whileInView={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 0.6, delay: 0.7 }}
                              viewport={{ once: true }}
                            />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Washi tape decoration */}
                <div className={`absolute ${index % 2 === 0 ? '-top-3 -left-3' : '-top-3 -right-3'} w-20 h-6 bg-indigo-300/70 dark:bg-indigo-700/70 transform ${index % 2 === 0 ? 'rotate-12' : '-rotate-12'} z-10`}></div>
                <div className={`absolute ${index % 2 === 0 ? '-bottom-3 -right-3' : '-bottom-3 -left-3'} w-20 h-6 bg-pink-300/70 dark:bg-pink-700/70 transform ${index % 2 === 0 ? '-rotate-12' : 'rotate-12'} z-10`}></div>
                
                {/* Sticky note effect */}
                <div className={`absolute ${index % 2 === 0 ? '-bottom-10 left-10' : '-bottom-10 right-10'} transform ${index % 2 === 0 ? 'rotate-6' : '-rotate-6'} bg-yellow-200 dark:bg-yellow-700 w-24 h-24 shadow-sm z-10 flex items-center justify-center text-center p-2`}
                  style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)" }}
                >
                  <div>
                    <div className="text-sm font-bold dark:text-gray-100">{t("featuredEvents.dateLabel")}</div>
                    <div className="text-lg font-mono font-bold text-indigo-700 dark:text-indigo-200">
                      {new Date(event.frontmatter.date).toLocaleDateString(t('common.language') === 'English' ? 'en-US' : 'zh-TW', { month: 'numeric', day: 'numeric' })}
                      {event.frontmatter.endDate && ` - ${new Date(event.frontmatter.endDate).toLocaleDateString(t('common.language') === 'English' ? 'en-US' : 'zh-TW', { month: 'numeric', day: 'numeric' })}`}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom decorative animation */}
        <motion.div
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-400 dark:via-indigo-600 to-transparent mt-24 relative"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-indigo-400 dark:bg-indigo-600 rounded-full"
            animate={{ 
              x: [-300, 300, -300],
              transition: { 
                repeat: Infinity, 
                repeatType: "mirror", 
                duration: 8,
                ease: "easeInOut" 
              }
            }}
          />
        </motion.div>
        
        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/events" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium text-lg hover:text-indigo-800 dark:hover:text-indigo-300">
              <span>{t("featuredEvents.viewAllButton")}</span>
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents; 
