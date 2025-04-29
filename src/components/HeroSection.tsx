"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaPlay } from "react-icons/fa";

const HeroSection: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // 設置初始窗口高度並監聽調整
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    // 監聽滾動
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 100);
    };

    // 初始設置
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // 清理監聽器
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const imageHoverVariants = {
    rest: { scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <section 
      className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden"
      style={{ 
        minHeight: windowHeight ? `${windowHeight}px` : '100vh',
        paddingTop: '80px', // 為導航欄預留空間
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {/* 背景裝飾元素 - 增強動畫 */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        variants={backgroundDecorVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            x: [0, 10, 0], 
            y: [0, -15, 0] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 12,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-[10%] right-[10%] w-[25vw] h-[25vw] max-w-[400px] max-h-[400px] bg-secondary/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, -15, 0], 
            y: [0, 10, 0] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 10,
            ease: "easeInOut"
          }}
        ></motion.div>
        <motion.div 
          className="absolute top-1/2 left-1/2 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-blue-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            scale: [1, 1.05, 1] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut"
          }}
        ></motion.div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10 flex-grow flex flex-col justify-center py-16 md:py-24">
        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
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
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
              variants={itemVariants}
            >
              用<motion.span 
                className="text-primary"
                initial={{ textShadow: "0 0 0 rgba(124, 58, 237, 0)" }}
                animate={{ textShadow: "0 0 10px rgba(124, 58, 237, 0.3)" }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >程式力</motion.span>打造
              <span className="relative inline-block mx-2">
                未來
                <motion.svg 
                  className="absolute bottom-0 left-0 w-full" 
                  height="15" 
                  viewBox="0 0 400 15" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path 
                    d="M0,15 Q200,-20 400,15" 
                    fill="none" 
                    stroke="#7C3AED" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                  />
                </motion.svg>
              </span>
              世界
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              HackIt是專為青少年設計的編程學習和創新實踐平台，透過互動課程、社群合作與實作項目，培養未來科技人才的核心能力。
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 mb-12"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href="/signup" 
                  className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all group"
                >
                  <span>立即開始</span>
                  <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                  >
                    <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </Link>
              </motion.div>
              
              <motion.button 
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatDelay: 2,
                    duration: 0.8 
                  }}
                >
                  <FaPlay className="text-primary mr-2" />
                </motion.div>
                <span>觀看介紹影片</span>
              </motion.button>
            </motion.div>
            
            {/* 統計數字 - 增強動畫 */}
            <motion.div 
              className="grid grid-cols-3 gap-6"
              variants={statsVariants}
            >
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="text-3xl font-bold text-gray-800 mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  25K+
                </motion.div>
                <div className="text-sm text-gray-600">學習者</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="text-3xl font-bold text-gray-800 mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  50+
                </motion.div>
                <div className="text-sm text-gray-600">成功活動</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="text-3xl font-bold text-gray-800 mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  95%
                </motion.div>
                <div className="text-sm text-gray-600">滿意度</div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* 右側圖片部分 - 更流暢的動畫 */}
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
                whileHover="hover"
                variants={imageHoverVariants}
              >
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2942&auto=format&fit=crop"
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
                whileHover="hover"
                variants={imageHoverVariants}
              >
                <Image
                  src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=2960&auto=format&fit=crop"
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
                whileHover="hover"
                variants={imageHoverVariants}
              >
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop"
                  alt="團隊合作"
                  width={150}
                  height={150}
                  className="w-full h-full object-cover rounded-md"
                />
              </motion.div>
              
              {/* 裝飾元素 - 動畫更新 */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-8 border-dashed border-primary/20 -z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              ></motion.div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* 特色資訊橫條 - 增強動畫 */}
        <motion.div
          className="mt-16 bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        >
          <motion.div 
            className="flex items-start"
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <motion.div 
              className="rounded-full bg-primary/10 p-3 mr-4"
              whileHover={{ backgroundColor: "rgba(124, 58, 237, 0.2)" }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </motion.div>
            <div>
              <h3 className="text-lg font-bold mb-2">互動式學習</h3>
              <p className="text-gray-600">透過實作與挑戰學習，比枯燥的理論更能激發學習熱情</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start"
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <motion.div 
              className="rounded-full bg-primary/10 p-3 mr-4"
              whileHover={{ backgroundColor: "rgba(124, 58, 237, 0.2)" }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 0.5 }}
            >
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </motion.div>
            <div>
              <h3 className="text-lg font-bold mb-2">專家指導</h3>
              <p className="text-gray-600">資深業界導師提供專業指導與回饋，加速學習進程</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-start"
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <motion.div 
              className="rounded-full bg-primary/10 p-3 mr-4"
              whileHover={{ backgroundColor: "rgba(124, 58, 237, 0.2)" }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, delay: 1 }}
            >
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </motion.div>
            <div>
              <h3 className="text-lg font-bold mb-2">實戰專案</h3>
              <p className="text-gray-600">從零到一完成真實專案，建立作品集展現實力</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 往下滾動指示器 - 更美觀的設計 */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              className="flex flex-col items-center"
              animate={{ y: [0, 5, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut" 
              }}
            >
              <motion.svg 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                animate={{ 
                  y: [0, 5, 0],
                  opacity: [0.5, 1, 0.5] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2, 
                  ease: "easeInOut" 
                }}
              >
                <path 
                  d="M12 5V19M12 19L6 13M12 19L18 13" 
                  stroke="rgba(107, 114, 128, 0.8)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 影片彈窗 */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div 
              className="relative w-full max-w-4xl mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button 
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                onClick={() => setIsVideoOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </motion.button>
              <div className="bg-black rounded-xl overflow-hidden aspect-video">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="HackIt介紹視頻"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection; 