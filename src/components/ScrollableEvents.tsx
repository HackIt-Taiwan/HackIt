"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendar, FaMapMarkerAlt, FaArrowRight, FaChevronLeft, FaChevronRight, FaCheckCircle } from 'react-icons/fa';

// 小型活動資料
const regularEvents = [
  {
    id: 1,
    title: "Python 初學者工作坊",
    date: "2024年6月15日",
    time: "14:00 - 17:00",
    location: "線上直播",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2069&auto=format&fit=crop",
    category: "工作坊",
    link: "/events/python-workshop",
    isCompleted: false
  },
  {
    id: 2,
    title: "網頁開發入門課程",
    date: "2024年6月22日",
    time: "09:00 - 12:00",
    location: "台北市信義區松高路",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop",
    category: "課程",
    link: "/events/web-dev-course",
    isCompleted: false
  },
  {
    id: 3,
    title: "遊戲開發體驗日",
    date: "2024年7月1日",
    time: "13:00 - 18:00",
    location: "台北市中山區松江路",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
    category: "體驗",
    link: "/events/game-dev-day",
    isCompleted: false
  },
  {
    id: 4,
    title: "AI 應用開發工作坊",
    date: "2024年7月8日",
    time: "14:00 - 17:00",
    location: "台北市大安區敦化南路",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=2070&auto=format&fit=crop",
    category: "工作坊",
    link: "/events/ai-workshop",
    isCompleted: false
  },
  {
    id: 5,
    title: "數據分析實戰",
    date: "2023年12月20日",
    time: "10:00 - 16:00",
    location: "台北市大安區復興南路",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    category: "實作",
    link: "/events/data-analysis",
    isCompleted: true
  },
  {
    id: 6,
    title: "行動應用開發基礎",
    date: "2023年11月15日",
    time: "14:00 - 17:00",
    location: "線上直播",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2070&auto=format&fit=crop",
    category: "課程",
    link: "/events/mobile-dev",
    isCompleted: true
  }
];

const ScrollableEvents: React.FC = () => {
  // 基本狀態和引用
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(false);
  const rafIdRef = useRef<number | null>(null);
  
  // 當元素進入視圖時啟用自動滾動
  useEffect(() => {
    if (isInView) {
      setIsAutoScrollEnabled(true);
    } else {
      setIsAutoScrollEnabled(false);
    }
  }, [isInView]);
  
  // 拖動相關的參考值
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  
  // 生成重複的活動數據用於無限滑動
  const repeatedEvents = [...regularEvents, ...regularEvents, ...regularEvents];

  // 1. 基本實用函數（不依賴其他回調函數）
  // ----------------------------------------
  
  // 安全獲取容器的各種屬性
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
  
  // 計算單個卡片組的總寬度
  const getCardSetWidth = useCallback(() => {
    if (!scrollContainerRef.current) return 0;
    
    const container = scrollContainerRef.current;
    const cardElements = container.querySelectorAll('[data-event-card]');
    
    // 如果還沒有渲染卡片，返回估計值
    if (!cardElements.length) return regularEvents.length * 324; // 估計一張卡片寬度300px + 間距24px
    
    // 取第一個完整卡片組的總寬度
    const firstCardSet = Array.from(cardElements).slice(0, regularEvents.length);
    if (firstCardSet.length === 0) return 0;
    
    // 獲取第一個和最後一個卡片的位置來計算總寬度
    const firstCard = firstCardSet[0];
    const lastCard = firstCardSet[firstCardSet.length - 1];
    
    if (!firstCard || !lastCard) return 0;
    
    const firstRect = firstCard.getBoundingClientRect();
    const lastRect = lastCard.getBoundingClientRect();
    
    // 計算整個卡片組的寬度，包括最後一張卡片的寬度和間距
    return (lastRect.right - firstRect.left);
  }, []);
  
  // 修復異常滾動位置
  const checkAndFixScroll = useCallback(() => {
    const { container, maxScroll, currentScroll } = getContainerInfo();
    if (!container) return false;
    
    // 如果滾動位置變為負數，重設為0
    if (currentScroll < 0) {
      container.scrollLeft = 0;
      return true;
    }
    
    // 處理異常極限位置
    if (currentScroll > maxScroll && maxScroll > 0) {
      container.scrollLeft = maxScroll;
      return true;
    }
    
    return false;
  }, [getContainerInfo]);
  
  // 2. 無限滾動邏輯（依賴基本函數）
  // ----------------------------------------
  
  // 處理無限滾動逻辑
  const handleInfiniteScroll = useCallback(() => {
    const { container, maxScroll, currentScroll } = getContainerInfo();
    if (!container) return false;
    
    // 先檢查和修復任何異常的滾動位置
    if (checkAndFixScroll()) return true;
    
    const cardSetWidth = getCardSetWidth();
    if (cardSetWidth <= 0) return false;
    
    // 適應性閾值：確保在各種尺寸下都有效
    const jumpThreshold = Math.max(30, cardSetWidth * 0.15);
    
    // 檢測滾動位置並調整 - 左側邊界
    if (currentScroll < jumpThreshold) {
      // 為避免視覺跳躍，精確計算位置
      container.scrollLeft = currentScroll + cardSetWidth;
      return true;
    }
    
    // 檢測滾動位置並調整 - 右側邊界
    if (currentScroll > maxScroll - jumpThreshold && maxScroll > 0) {
      container.scrollLeft = currentScroll - cardSetWidth;
      return true;
    }
    
    return false;
  }, [getContainerInfo, checkAndFixScroll, getCardSetWidth]);
  
  // 3. 處理滑動和動畫（依賴無限滾動邏輯）
  // ----------------------------------------
  
  // 處理滑動慣性動畫
  const animateScroll = useCallback(() => {
    const { container } = getContainerInfo();
    if (!container) return;
    
    const now = Date.now();
    const elapsed = now - lastMoveTimeRef.current;
    
    // 應用慣性減速
    if (elapsed > 40 && Math.abs(velocityRef.current) > 0.1) {
      // 動態摩擦力：提供更自然的滑動體驗
      const friction = Math.min(0.98, 0.96 + (Math.abs(velocityRef.current) * 0.01));
      velocityRef.current *= friction;
      
      // 平滑滾動
      container.scrollLeft += velocityRef.current;
      
      // 檢查並處理無限滾動
      handleInfiniteScroll();
      
      // 當速度變得非常小時，停止動畫
      if (Math.abs(velocityRef.current) < 0.1) {
        velocityRef.current = 0;
        rafIdRef.current = null;
        
        // 重新啟用自動滾動
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
  
  // 4. 處理用戶交互事件（依賴動畫和無限滾動）
  // ----------------------------------------
  
  // 觸摸/滑鼠按下開始
  const handleDragStart = useCallback((clientX: number) => {
    const { container } = getContainerInfo();
    if (!container) return;
    
    // 取消所有進行中的動畫
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
  
  // 觸摸/滑鼠移動
  const handleDragMove = useCallback((clientX: number) => {
    const { container } = getContainerInfo();
    if (!isDragging || !container) return;
    
    const now = Date.now();
    const deltaTime = now - lastMoveTimeRef.current;
    
    if (deltaTime > 0) {
      const deltaX = clientX - lastXRef.current;
      velocityRef.current = deltaX * 0.4; // 增加慣性係數
      lastXRef.current = clientX;
      lastMoveTimeRef.current = now;
    }
    
    const x = clientX - container.getBoundingClientRect().left;
    const walk = (startXRef.current - x) * 1.1; // 增加倍率提高靈敏度
    
    // 直接更新滾動位置
    container.scrollLeft = scrollLeftRef.current + walk;
    
    // 隨機檢查以平衡性能和體驗
    if (Math.random() < 0.1) {
      handleInfiniteScroll();
    }
  }, [isDragging, getContainerInfo, handleInfiniteScroll]);
  
  // 觸摸/滑鼠結束
  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    
    // 檢查是否滾動到了邊界
    handleInfiniteScroll();
    
    // 應用慣性滾動
    if (Math.abs(velocityRef.current) > 0.1) {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(animateScroll);
    } else {
      // 沒有顯著的速度，直接重新啟用自動滾動
      setTimeout(() => {
        setIsAutoScrollEnabled(true);
      }, 300);
    }
  }, [handleInfiniteScroll, animateScroll]);
  
  // 5. 自動滾動（依賴無限滾動邏輯）
  // ----------------------------------------
  
  // 實現自動滾動
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
      
      // 計算時間增量
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      
      // 限制最大時間差
      const effectiveDelta = Math.min(deltaTime, 32);
      
      // 計算滾動增量
      const scrollIncrement = (effectiveDelta / 1000) * 25; // 每秒滾動25px
      
      // 滾動並檢查無限滾動
      container.scrollLeft += scrollIncrement;
      handleInfiniteScroll();
      
      // 繼續循環
      if (isAutoScrollEnabled) {
        frameId = requestAnimationFrame(autoScroll);
      }
    };
    
    // 啟動自動滾動
    if (isAutoScrollEnabled) {
      frameId = requestAnimationFrame(autoScroll);
    }
    
    // 清理函數
    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [isAutoScrollEnabled, getContainerInfo, handleInfiniteScroll]);
  
  // 6. 設置事件監聽
  // ----------------------------------------
  
  // 添加事件監聽
  useEffect(() => {
    // 觸摸事件處理
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

    // 滑鼠事件處理
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

    // 添加事件監聽
    const element = scrollContainerRef.current;
    if (element) {
      element.addEventListener('touchstart', handleTouchStart, { passive: true });
      element.addEventListener('touchmove', handleTouchMove, { passive: false });
      element.addEventListener('touchend', handleTouchEnd);
      
      element.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    // 清理函數
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
  
  // 7. 輔助功能
  // ----------------------------------------
  
  // 滾動左右切換按鈕功能
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

  // 8. 渲染部分
  // ----------------------------------------
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              各式<span className="text-primary">活動</span>
              <span className="text-sm md:text-base font-normal text-gray-500 dark:text-gray-400 ml-1">(包括已結束的)</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              探索更多學習機會，任何時候都可以從中獲取靈感
            </p>
          </div>
          
          <Link href="/events" className="text-primary hover:text-primary-dark dark:hover:text-primary-light font-medium hover:underline flex items-center">
            查看全部活動 <FaArrowRight className="ml-2" />
          </Link>
        </div>
        
        <div className="relative">
          {/* 左右滾動按鈕 */}
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
          
          {/* 拖動提示 */}
          <div className="text-center mb-4 text-gray-500 dark:text-gray-400 text-sm">
            <span className="inline-flex items-center">
              <motion.div 
                animate={isInView ? { x: [-5, 5, -5] } : {}}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mr-2"
              >
                ← 按住拖動 →
              </motion.div>
            </span>
          </div>
          
          {/* 可滾動容器 */}
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
              scrollSnapType: 'none', // 移除捕捉，提高滑動流暢度
              touchAction: 'pan-x',
            }}
          >
            {repeatedEvents.map((event, index) => (
              <motion.div
                key={`${event.id}-${index}`}
                className="flex-shrink-0 w-[300px] bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                data-event-card
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    duration: 0.3, 
                    delay: Math.min((index % regularEvents.length) * 0.05, 0.3) 
                  }
                }}
                viewport={{ once: true, margin: "100px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-40 relative will-change-transform">
                  <Image 
                    src={event.image} 
                    alt={event.title} 
                    fill 
                    style={{ objectFit: 'cover' }}
                    sizes="300px"
                    loading={index < 12 ? "eager" : "lazy"}
                    draggable="false"
                  />
                  
                  {/* 透明防點擊覆蓋層 - 防止直接觸碰到圖片 */}
                  <div 
                    className="absolute inset-0 z-10 cursor-grab" 
                    aria-hidden="true"
                    style={{ touchAction: 'pan-x' }}
                  ></div>
                  
                  <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-primary flex items-center gap-1 z-20">
                    {event.isCompleted ? (
                      <>
                        <FaCheckCircle className="text-green-500 dark:text-green-400" />
                        <span>已結束</span>
                      </>
                    ) : (
                      event.category
                    )}
                  </div>
                  
                  {/* 右上角活動狀態 */}
                  {event.isCompleted && (
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden z-20">
                      <div className="bg-gray-700/80 dark:bg-gray-900/80 text-white text-xs font-bold py-1 px-4 rotate-45 transform origin-bottom-right absolute top-0 right-0 translate-x-[40%] translate-y-[10%]">
                        已結束
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1 dark:text-white">{event.title}</h3>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center text-gray-500 dark:text-gray-300">
                      <FaCalendar className="mr-2 text-primary text-xs" />
                      <span>{event.date} {event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-300">
                      <FaMapMarkerAlt className="mr-2 text-primary text-xs" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                  
                  <Link 
                    href={event.link} 
                    className={`inline-block w-full text-center py-2 rounded-lg transition-colors ${
                      event.isCompleted 
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' 
                        : 'bg-primary/10 dark:bg-primary/20 text-primary hover:bg-primary/20 dark:hover:bg-primary/30'
                    }`}
                  >
                    {event.isCompleted ? '查看回顧' : '查看詳情'}
                  </Link>
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