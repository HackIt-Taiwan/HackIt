"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaClock, FaFilter, FaSearch, FaChevronDown } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllEvents, getUpcomingEvents, getPastEvents, type Event } from '@/utils/events';
import EventsList from '@/components/EventsList';

// 分類選項
const categories = [
  "全部", "工作坊", "黑客松", "講座", "論壇", "創業營", "課程"
];

export default function EventsPage() {
  // 從 Markdown 檔案獲取活動數據
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();
  
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* 主視覺 */}
      <section className="pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-20 bg-gradient-to-b from-primary/5 to-indigo-50 dark:from-primary/10 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 dark:text-white">
              精彩<span className="text-primary">活動</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              參與我們的工作坊、黑客松和講座，與志同道合的朋友一起學習成長
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* 活動列表區塊 */}
      <EventsList upcomingEvents={upcomingEvents} pastEvents={pastEvents} categories={categories} />
      
      {/* CTA */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            想舉辦自己的活動？
          </motion.h2>
          <motion.p 
            className="text-white/90 text-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            HackIt 提供場地和資源支持，讓你的創意活動成為可能。
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="/propose-event" 
              className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              提案活動
            </Link>
            <Link 
              href="/volunteer" 
              className="bg-transparent text-white hover:bg-white/10 border-2 border-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              成為志工
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 