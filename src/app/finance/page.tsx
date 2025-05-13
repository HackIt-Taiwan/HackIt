"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaLock, FaRegCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function FinancePage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* 頁面內容 */}
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
              財務公開頁面<span className="text-primary">暫時關閉</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              我們正在更新並審核最新的財務數據，此頁面將在完成後重新開放。
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <FaRegCalendarAlt className="text-primary text-xl mr-2" />
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  預計恢復時間：近期
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                感謝您的理解與耐心等待。如有關於財務的問題，請聯繫我們的團隊。
              </p>
            </div>
            
            <Link 
              href="/"
              className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors"
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