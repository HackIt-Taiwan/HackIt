"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getUpcomingEvents, type Event } from '@/utils/events';

// 從 utils/events.ts 獲取活動數據
const events = getUpcomingEvents();

const EventsSection: React.FC = () => {
  const ref = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  // 拖動滑動相關狀態
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const lastX = useRef(0);
  const lastMoveTime = useRef(0);
  const velocity = useRef(0);
  const rafId = useRef<number | null>(null);

  // 定義動畫變體
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const cardHoverVariants = {
    rest: { 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" } 
    },
    hover: { 
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3, ease: "easeIn" } 
    }
  };

  const bgVariants = {
    rest: {
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.5, ease: "easeIn" }
    }
  };

  // 計算剩餘名額比例
  const calculateSpotsPercentage = (total: number, left: number) => {
    const taken = total - left;
    return (taken / total) * 100;
  };

  // 滑動動畫（帶慣性）
  const animateScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    if (Math.abs(velocity.current) > 0.1) {
      // 提供漸進減速的感覺（慣性）
      velocity.current *= 0.95;
      
      // 應用位移
      scrollContainerRef.current.scrollLeft += velocity.current;
      
      // 繼續動畫循環
      rafId.current = requestAnimationFrame(animateScroll);
    } else {
      velocity.current = 0;
      rafId.current = null;
    }
  }, []);

  // 鼠標事件處理
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    
    // 重設任何進行中的動畫
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    
    // 確保之前的任何拖動狀態已被清除
    if (isDragging) {
      setIsDragging(false);
    }
    
    setIsDragging(true);
    startX.current = e.clientX;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    lastX.current = e.clientX;
    lastMoveTime.current = Date.now();
    velocity.current = 0;
    
    // 防止拖動過程中選中文本
    document.body.style.userSelect = 'none';
  }, [isDragging]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    const x = e.clientX;
    const dx = x - startX.current;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - dx;
    
    // 計算速度（用於慣性滾動）
    const now = Date.now();
    const dt = now - lastMoveTime.current;
    
    if (dt > 0) {
      velocity.current = (lastX.current - x) / dt * 15; // 調整慣性強度
    }
    
    lastX.current = x;
    lastMoveTime.current = now;
    
    // 允許 y 軸正常滾動但防止頁面左右滾動
    e.preventDefault();
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    document.body.style.userSelect = '';
    
    // 如果有速度，啟動慣性滾動
    if (Math.abs(velocity.current) > 0.1) {
      rafId.current = requestAnimationFrame(animateScroll);
    }
  }, [isDragging, animateScroll]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      handleMouseUp();
    }
  }, [isDragging, handleMouseUp]);

  // 觸控事件處理
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!scrollContainerRef.current || e.touches.length !== 1) return;
    
    // 重設任何進行中的動畫
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    
    // 確保之前的任何拖動狀態已被清除
    if (isDragging) {
      setIsDragging(false);
    }
    
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
    scrollLeft.current = scrollContainerRef.current.scrollLeft;
    lastX.current = e.touches[0].clientX;
    lastMoveTime.current = Date.now();
    velocity.current = 0;
  }, [isDragging]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current || e.touches.length !== 1) return;
    
    const x = e.touches[0].clientX;
    const dx = x - startX.current;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - dx;
    
    // 計算速度（用於慣性滾動）
    const now = Date.now();
    const dt = now - lastMoveTime.current;
    
    if (dt > 0) {
      velocity.current = (lastX.current - x) / dt * 15; // 調整慣性強度
    }
    
    lastX.current = x;
    lastMoveTime.current = now;
    
    // 防止頁面在移動時滾動（iOS需要）
    e.preventDefault();
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // 如果有速度，啟動慣性滾動
    if (Math.abs(velocity.current) > 0.1) {
      rafId.current = requestAnimationFrame(animateScroll);
    }
  }, [isDragging, animateScroll]);

  // 箭頭點擊滾動
  const scrollToLeft = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    // 使用平滑滾動效果
    const currentScroll = scrollContainerRef.current.scrollLeft;
    const cardWidth = 300; // 假設卡片寬度
    const scrollAmount = cardWidth * 2; // 一次滾動兩個卡片的寬度
    
    scrollContainerRef.current.scrollTo({
      left: currentScroll - scrollAmount,
      behavior: 'smooth'
    });
  }, []);

  const scrollToRight = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    // 使用平滑滾動效果
    const currentScroll = scrollContainerRef.current.scrollLeft;
    const cardWidth = 300; // 假設卡片寬度
    const scrollAmount = cardWidth * 2; // 一次滾動兩個卡片的寬度
    
    scrollContainerRef.current.scrollTo({
      left: currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  }, []);

  // 清理
  useEffect(() => {
    // 添加全局事件監聽器以捕獲容器外的放開事件
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.userSelect = '';
        
        // 如果有速度，啟動慣性滾動
        if (Math.abs(velocity.current) > 0.1) {
          rafId.current = requestAnimationFrame(animateScroll);
        }
      }
    };
    
    const handleGlobalTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        
        // 如果有速度，啟動慣性滾動
        if (Math.abs(velocity.current) > 0.1) {
          rafId.current = requestAnimationFrame(animateScroll);
        }
      }
    };
    
    // 添加防止卡在拖動狀態的安全計時器
    let dragTimeoutId: NodeJS.Timeout | null = null;
    
    const clearDragState = () => {
      if (isDragging) {
        console.log('安全機制：清除卡住的拖動狀態');
        setIsDragging(false);
        document.body.style.userSelect = '';
      }
    };
    
    // 當拖動狀態改變時，設置或清除安全計時器
    if (isDragging) {
      dragTimeoutId = setTimeout(clearDragState, 3000); // 3秒安全計時器
    } else if (dragTimeoutId) {
      clearTimeout(dragTimeoutId);
      dragTimeoutId = null;
    }
    
    // 註冊全局事件
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchend', handleGlobalTouchEnd);
    
    return () => {
      // 清理
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      
      // 移除全局事件監聽器
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
      
      // 清除計時器
      if (dragTimeoutId) {
        clearTimeout(dragTimeoutId);
      }
    };
  }, [isDragging, animateScroll]);

  // 當組件進入視圖時觸發動畫
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section id="活動資訊" className="py-20 md:py-28 lg:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* 背景裝飾 */}
      <motion.div 
        className="absolute top-[15%] left-[5%] w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] bg-primary/3 dark:bg-primary/5 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.5,
          x: [0, -20, 0],
          y: [0, 25, 0]
        }}
        transition={{ 
          opacity: { duration: 1 },
          x: { repeat: Infinity, duration: 18, ease: "easeInOut" },
          y: { repeat: Infinity, duration: 22, ease: "easeInOut" }
        }}
      />
      <motion.div 
        className="absolute bottom-[20%] right-[10%] w-[25vw] h-[25vw] max-w-[400px] max-h-[400px] bg-blue-500/3 dark:bg-blue-500/5 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.5,
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          opacity: { duration: 1 },
          x: { repeat: Infinity, duration: 20, ease: "easeInOut" },
          y: { repeat: Infinity, duration: 16, ease: "easeInOut" }
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span 
            className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            活動資訊
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            即將舉行的<motion.span 
              className="text-primary"
              initial={{ textShadow: "0 0 0 rgba(124, 58, 237, 0)" }}
              animate={{ textShadow: "0 0 10px rgba(124, 58, 237, 0.3)" }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >精彩活動</motion.span>
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            參加我們的工作坊、講座和駭客松，與志同道合的夥伴一起學習和成長
          </motion.p>
        </motion.div>

        {/* 滾動控制按鈕 */}
        <div className="flex justify-end mb-4 gap-2">
          <motion.button
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToLeft}
          >
            <FaChevronLeft className="text-primary" size={20} />
          </motion.button>
          <motion.button
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToRight}
          >
            <FaChevronRight className="text-primary" size={20} />
          </motion.button>
        </div>

        {/* 可滑動容器 */}
        <div
          ref={scrollContainerRef}
          className={`overflow-x-auto pb-4 hide-scrollbar flex gap-6 md:gap-8 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ scrollbarWidth: 'none', scrollBehavior: 'auto' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex gap-6 md:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {events.map((event, index) => (
              <motion.div
                key={event.slug}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full flex-shrink-0"
                style={{ width: 'calc(100% / 3.5)', minWidth: '280px', maxWidth: '380px' }}
                initial="rest"
                whileHover="hover"
                custom={index}
                variants={itemVariants}
              >
                <div className="relative h-48 sm:h-40 md:h-48 lg:h-44 xl:h-48 overflow-hidden">
                  <motion.div
                    className="w-full h-full absolute"
                    variants={bgVariants}
                  >
                    <Image
                      src={event.frontmatter.image}
                      alt={event.frontmatter.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                      draggable="false"
                      className="pointer-events-none"
                    />
                    
                    {/* 完全透明覆蓋層，阻止圖片直接互動 */}
                    <div 
                      className="absolute inset-0 z-10 cursor-grab" 
                      aria-hidden="true"
                      style={{ touchAction: 'pan-x' }}
                    ></div>
                  </motion.div>
                  <motion.div 
                    className="absolute top-4 left-4 bg-white dark:bg-gray-800 py-1 px-3 rounded-full text-sm font-medium text-primary shadow-sm z-20"
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  >
                    {event.frontmatter.category}
                  </motion.div>
                </div>
                
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 line-clamp-1 dark:text-white">{event.frontmatter.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm md:text-base line-clamp-2">{event.frontmatter.description}</p>
                  
                  <div className="space-y-2 mb-5 md:mb-6">
                    <motion.div 
                      className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    >
                      <FaCalendar className="mr-2 text-primary flex-shrink-0" />
                      <span className="truncate">
                        {new Date(event.frontmatter.date).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })} {event.frontmatter.time}
                      </span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                    >
                      <FaMapMarkerAlt className="mr-2 text-primary flex-shrink-0" />
                      <span className="truncate">{event.frontmatter.location}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    >
                      <FaUsers className="mr-2 text-primary flex-shrink-0" />
                      <span>尚餘 {event.frontmatter.spotsLeft} 個名額</span>
                    </motion.div>
                  </div>
                  
                  {/* 名額進度條 */}
                  <div className="mb-5 md:mb-6">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${calculateSpotsPercentage(event.frontmatter.spots, event.frontmatter.spotsLeft)}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className="text-gray-500 dark:text-gray-400">已報名 {event.frontmatter.spots - event.frontmatter.spotsLeft} 人</span>
                      <span className="text-gray-500 dark:text-gray-400">總共 {event.frontmatter.spots} 人</span>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/events/${event.slug}`} 
                    className="flex items-center justify-center py-2 sm:py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors group w-full"
                  >
                    <span>查看詳情</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 + index * 0.2 }}
                    >
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/events"
              className="inline-flex items-center text-primary font-medium hover:text-primary-dark dark:hover:text-primary-light group"
            >
              <span className="text-lg">查看所有活動</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
              >
                <FaArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection; 