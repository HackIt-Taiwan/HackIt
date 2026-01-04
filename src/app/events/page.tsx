"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaRegCalendarAlt, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Page content */}
      <section className="pt-32 md:pt-36 lg:pt-40 pb-20 md:pb-28 lg:pb-36 flex items-center">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="mx-auto w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mb-8">
              <FaLock className="text-primary text-4xl" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
              活動頁面<span className="text-primary">暫時關閉</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              我們正在更新活動相關資訊，目前所有活動資訊已經移至 Notion 頁面。
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <FaRegCalendarAlt className="text-primary text-xl mr-2" />
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  您可以在我們的 Notion 頁面查看所有活動信息
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                感謝您的理解與耐心等待。如有任何問題，請聯繫我們的團隊。
              </p>
              <a 
                href="https://hackittw.notion.site/1f459188ed5280499052d8d3b813770c" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <FaExternalLinkAlt className="mr-2" /> 前往 Notion 頁面
              </a>
            </div>
            
            <Link 
              href="/"
              className="inline-flex items-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <FaArrowLeft className="mr-2" /> 返回首頁
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 
