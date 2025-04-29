"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaPlay } from "react-icons/fa";

const HeroSection: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVideoOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.8,
      },
    },
  };

  const backgroundDecorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.5 },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white pt-20 pb-24 overflow-hidden">
      {/* 背景裝飾元素 */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        variants={backgroundDecorVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 左側文字內容 */}
          <div className="lg:w-1/2 lg:pr-8">
            <motion.span 
              className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
              variants={itemVariants}
            >
              啟發台灣下一代科技創新者
            </motion.span>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              variants={itemVariants}
            >
              用<span className="text-primary">程式力</span>打造
              <span className="relative inline-block mx-2">
                未來
                <svg className="absolute bottom-0 left-0 w-full" height="15" viewBox="0 0 400 15" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,15 Q200,-20 400,15" fill="none" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
              世界
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              HackIt是專為青少年設計的編程學習和創新實踐平台，透過互動課程、社群合作與實作項目，培養未來科技人才的核心能力。
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 mb-12"
              variants={itemVariants}
            >
              <Link 
                href="/signup" 
                className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all group"
              >
                <span>立即開始</span>
                <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <FaPlay className="text-primary mr-2" />
                <span>觀看介紹影片</span>
              </button>
            </motion.div>
            
            {/* 統計數字 */}
            <motion.div 
              className="grid grid-cols-3 gap-6"
              variants={statsVariants}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">25K+</div>
                <div className="text-sm text-gray-600">學習者</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">50+</div>
                <div className="text-sm text-gray-600">成功活動</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 mb-1">95%</div>
                <div className="text-sm text-gray-600">滿意度</div>
              </div>
            </motion.div>
          </div>
          
          {/* 右側圖片部分 */}
          <motion.div 
            className="lg:w-1/2 relative"
            variants={itemVariants}
          >
            <div className="relative">
              {/* 主圖片 */}
              <motion.div
                className="relative z-10 rounded-xl overflow-hidden shadow-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <Image
                  src="/images/hero/main-hero.jpg"
                  alt="青少年編程學習"
                  width={600}
                  height={500}
                  className="w-full h-auto rounded-xl"
                />
              </motion.div>
              
              {/* 小圖1 */}
              <motion.div 
                className="absolute -top-8 -right-8 z-20 bg-white p-2 rounded-lg shadow-lg w-28 h-28 md:w-36 md:h-36"
                initial={{ x: 50, y: 50, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                <Image
                  src="/images/hero/coding.jpg"
                  alt="程式編輯器"
                  width={150}
                  height={150}
                  className="w-full h-full object-cover rounded-md"
                />
              </motion.div>
              
              {/* 小圖2 */}
              <motion.div 
                className="absolute -bottom-6 -left-6 z-20 bg-white p-2 rounded-lg shadow-lg w-28 h-28 md:w-36 md:h-36"
                initial={{ x: -50, y: 50, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 1 }}
              >
                <Image
                  src="/images/hero/teamwork.jpg"
                  alt="團隊合作"
                  width={150}
                  height={150}
                  className="w-full h-full object-cover rounded-md"
                />
              </motion.div>
              
              {/* 裝飾元素 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-8 border-dashed border-primary/20 -z-10"></div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* 特色資訊橫條 */}
        <motion.div
          className="mt-16 bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          <div className="flex items-start">
            <div className="rounded-full bg-primary/10 p-3 mr-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">互動式學習</h3>
              <p className="text-gray-600">透過實作與挑戰學習，比枯燥的理論更能激發學習熱情</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="rounded-full bg-primary/10 p-3 mr-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">專家指導</h3>
              <p className="text-gray-600">資深業界導師提供專業指導與回饋，加速學習進程</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="rounded-full bg-primary/10 p-3 mr-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">實戰專案</h3>
              <p className="text-gray-600">從零到一完成真實專案，建立作品集展現實力</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 影片彈窗 */}
      {isVideoOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-full max-w-4xl mx-4">
            <button 
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsVideoOpen(false)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="bg-black rounded-xl overflow-hidden aspect-video">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="HackIt介紹視頻"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection; 