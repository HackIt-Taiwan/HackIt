"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getUpcomingEvents, type Event } from '@/utils/events';
import { useI18n } from "@/i18n";

// 從 utils/events.ts 獲取活動數據
const events = getUpcomingEvents();

const EventsSection: React.FC = () => {
  const ref = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const { t } = useI18n();

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
    <section ref={ref} className="py-20 md:py-28 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* 背景圖案 */}
      <div 
        className="absolute inset-0 bg-repeat opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'50\' height=\'50\' viewBox=\'0 0 50 50\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 50 L50 0 L50 50 Z M0 0 L50 50 L0 50 Z\'/%3E%3C/g%3E%3C/svg%3E")',
        }}
      />
      
      {/* 光暈效果 */}
      <motion.div
        className="absolute -top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl -z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 right-1/4 w-1/2 h-1/2 bg-accent/10 dark:bg-accent/20 rounded-full blur-3xl -z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      />

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
            {t("eventsSection.title")}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            {t("eventsSection.subtitle")}
          </p>
        </motion.div>

        {/* 活動卡片滾動容器 */}
        <div className="relative">
          <motion.div
            ref={scrollContainerRef}
            className={`flex overflow-x-auto pb-8 space-x-6 md:space-x-8 cursor-grab ${
              isDragging ? 'cursor-grabbing' : ''
            }`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} /* 隱藏滾動條 */
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {events.map((event, index) => (
              <motion.div 
                key={event.slug}
                variants={itemVariants} 
                className="flex-none w-[280px] md:w-[320px] lg:w-[360px]"
                initial="rest"
                whileHover="hover"
                animate={controls} // 用於卡片進入/離開視圖的動畫
              >
                <motion.div 
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden h-full flex flex-col transition-all duration-300"
                  variants={cardHoverVariants}
                >
                  <motion.div className="relative h-48 md:h-56 overflow-hidden" variants={bgVariants}>
                    <Image
                      src={event.frontmatter.image}
                      alt={event.frontmatter.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {event.frontmatter.category}
                    </div>
                  </motion.div>
                  
                  <div className="p-5 md:p-6 flex-grow flex flex-col">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <FaCalendar className="mr-1.5" />
                      {new Date(event.frontmatter.date).toLocaleDateString(t('common.language') === 'English' ? 'en-US' : 'zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 min-h-[3em]">
                      {event.frontmatter.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                      {event.frontmatter.description}
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <span>{event.frontmatter.spotsLeft > 0 ? t("eventsSection.spotsLeft", { spotsLeft: event.frontmatter.spotsLeft, spots: event.frontmatter.spots }) : t("eventsSection.spotsFull")}</span>
                        <span>{((event.frontmatter.spots - event.frontmatter.spotsLeft) / event.frontmatter.spots * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <motion.div 
                          className={`h-2.5 rounded-full ${
                            event.frontmatter.spotsLeft > 0 ? 'bg-primary' : 'bg-red-500'
                          }`}
                          style={{ width: `${calculateSpotsPercentage(event.frontmatter.spots, event.frontmatter.spotsLeft)}%` }}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${calculateSpotsPercentage(event.frontmatter.spots, event.frontmatter.spotsLeft)}%` } : { width: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <FaMapMarkerAlt className="mr-1.5 flex-shrink-0" /> 
                      <span className="truncate">{event.frontmatter.location}</span>
                    </div>

                    <Link href={`/events/${event.slug}`} className="mt-auto">
                      <motion.button 
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-5 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {t("eventsSection.learnMore")}
                        <FaArrowRight className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* 左右滾動箭頭 - 增強樣式和交互性 */}
          <button 
            onClick={scrollToLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 -ml-4 md:-ml-6 focus:outline-none"
            aria-label="Scroll Left"
          >
            <FaChevronLeft className="text-gray-700 dark:text-white text-xl" />
          </button>
          <button 
            onClick={scrollToRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 -mr-4 md:-mr-6 focus:outline-none"
            aria-label="Scroll Right"
          >
            <FaChevronRight className="text-gray-700 dark:text-white text-xl" />
          </button>
        </div>
        
        {/* 拖動提示 */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          {t("eventsSection.dragHint")}
        </p>

        {/* 查看所有活動按鈕 */}
        <motion.div 
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/events">
            <motion.button 
              className="bg-transparent hover:bg-primary/10 dark:hover:bg-primary/20 border-2 border-primary text-primary font-semibold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 mx-auto shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("eventsSection.viewAllEvents")}
              <FaArrowRight />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection; 