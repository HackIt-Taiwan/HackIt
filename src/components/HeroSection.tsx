"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaGithub, FaDiscord } from "react-icons/fa";

// 添加接口定義
interface DiscordMemberResponse {
  memberCount: number;
  guildName?: string;
  error?: string;
  fromCache?: boolean;
}

const HeroSection: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [typedText, setTypedText] = useState("");
  const [memberCount, setMemberCount] = useState<number>(1337);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fullText = "console.log('你好，駭客！')";
  const [typingIndex, setTypingIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    // 獲取Discord成員數量
    const fetchMemberCount = async () => {
      setIsLoading(true);
      try {
        // 使用普通請求，不添加随機参数或时间戳来允许缓存工作
        const response = await fetch('/api/discord-members');
        
        if (response.ok) {
          const data: DiscordMemberResponse = await response.json();
          if (data.memberCount && data.memberCount > 0) {
            const source = data.fromCache ? '緩存' : 'API';
            console.log(`成功獲取成員數量(${source}):`, data.memberCount, '伺服器:', data.guildName);
            setMemberCount(data.memberCount);
          } else {
            console.error('獲取的數據中沒有有效的成員數量:', data);
          }
        } else {
          console.error('獲取成員數量請求失敗:', response.status);
        }
      } catch (error) {
        console.error('獲取Discord成員數量失敗:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // 立即獲取一次
    fetchMemberCount();
    
    // 每30分鐘刷新一次數據 (1800000ms)
    // 這樣可以減少API請求頻率，但保持數據的相對新鮮度
    const intervalId = setInterval(fetchMemberCount, 1800000);
    
    // 清理定時器
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // 初始化窗口尺寸
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Typing animation - only when section is in view
    if (isInView && typingIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prevText => prevText + fullText[typingIndex]);
        setTypingIndex(prevIndex => prevIndex + 1);
      }, Math.random() * 100 + 50);
      
      return () => {
        clearTimeout(timeout);
        window.removeEventListener("resize", handleResize);
      };
    }
    
    return () => window.removeEventListener("resize", handleResize);
  }, [typingIndex, fullText, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7 },
    },
  };

  // 確定是否為移動設備以調整佈局
  const isMobile = windowWidth > 0 && windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative bg-light dark:bg-dark overflow-hidden"
      style={{
        minHeight: windowHeight ? `${windowHeight}px` : '100vh',
        paddingTop: isMobile ? '100px' : '120px', // 移動設備上減少頂部間距
      }}
    >
      {/* 背景元素 - 更有駭客風格 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* 背景網格 */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="h-full w-full" 
            style={{
              backgroundImage: 'radial-gradient(circle, #252429 1px, transparent 1px)',
              backgroundSize: isMobile ? '25px 25px' : '40px 40px' // 在移動設備上縮小網格尺寸
            }}
          />
        </div>
        
        {/* 模擬程式碼行 - 在移動設備上隱藏部分程式碼 */}
        <div className="absolute -left-4 top-1/4 transform -rotate-6 opacity-10 dark:opacity-15 hidden sm:block">
          {[...Array(isMobile ? 5 : 10)].map((_, i) => (
            <div key={i} className="flex gap-2 text-xs font-mono my-1.5">
              <span className="text-muted">{i + 1}</span>
              <span className="text-primary">function</span>
              <span>createAwesome() {'{...}'}</span>
            </div>
          ))}
        </div>
        
        <div className="absolute right-0 bottom-1/3 transform rotate-6 opacity-10 dark:opacity-15 hidden sm:block">
          {[...Array(isMobile ? 4 : 8)].map((_, i) => (
            <div key={i} className="flex gap-2 text-xs font-mono my-1.5">
              <span className="text-muted">{i + 20}</span>
              <span className="text-accent">if</span>
              <span>(isHacker) {'{...}'}</span>
            </div>
          ))}
        </div>
        
        {/* 裝飾元素 - 調整大小以適應不同設備 */}
        <motion.div
          className={`absolute top-1/5 right-1/4 rounded-full bg-secondary/20 dark:bg-secondary/30 blur-3xl ${
            isMobile ? 'w-40 h-40' : isTablet ? 'w-60 h-60' : 'w-80 h-80'
          }`}
          animate={isInView ? { scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] } : {}}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        
        <motion.div
          className={`absolute bottom-1/3 left-1/3 rounded-full bg-primary/20 dark:bg-primary/30 blur-3xl ${
            isMobile ? 'w-32 h-32' : isTablet ? 'w-48 h-48' : 'w-64 h-64'
          }`}
          animate={isInView ? { scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] } : {}}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 h-full flex flex-col justify-center py-12 md:py-16 lg:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-16 lg:gap-24">
          {/* 左側文字內容 */}
          <motion.div
            className="w-full md:w-1/2 md:pr-4 lg:pr-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-6 md:mb-10">
              <div className="inline-flex items-center bg-dark dark:bg-light px-3 sm:px-4 md:px-5 py-2 md:py-3 rounded-lg text-light dark:text-dark">
                <div className="mr-2 md:mr-3 flex space-x-1.5 md:space-x-2">
                  <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-primary"></div>
                  <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-accent"></div>
                  <div className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-secondary"></div>
                </div>
                <code className="font-mono text-xs sm:text-sm">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </code>
              </div>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight tracking-tight text-dark dark:text-light"
              variants={itemVariants}
            >
              由<span className="text-primary">青少年</span>打造的 
              <br /><span className="text-accent">創意</span>程式社群
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted dark:text-gray-300 mb-8 md:mb-12 max-w-2xl leading-relaxed"
              variants={itemVariants}
            >
              我們在這裡一起創造、探索和分享程式的無限可能！發揮你的創意，用程式將想法變成現實，HackIt 是屬於所有創作者的地方。
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-12 lg:mb-16"
              variants={itemVariants}
            >
              <Link
                href="#join"
                className="px-4 sm:px-6 md:px-8 py-3 md:py-4 bg-primary text-white rounded-lg flex items-center font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base md:text-lg"
              >
                加入社群
                <FaArrowRight className="ml-2 md:ml-3" />
              </Link>
              
              <Link
                href="#projects"
                className="px-4 sm:px-6 md:px-8 py-3 md:py-4 bg-light dark:bg-dark border-2 border-dark dark:border-light text-dark dark:text-light rounded-lg hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark transition-colors font-medium flex items-center text-sm sm:text-base md:text-lg"
              >
                查看專案
                <FaGithub className="ml-2 md:ml-3" />
              </Link>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mt-6 md:mt-10"
              variants={itemVariants}
            >
              <span className="text-sm md:text-base text-muted dark:text-gray-300">我們有</span>
              <div className="px-3 md:px-4 py-1.5 md:py-2 bg-secondary/20 dark:bg-secondary/30 text-dark dark:text-light rounded-full font-mono">
                {isLoading ? (
                  <span className="font-bold text-base md:text-lg inline-flex items-center">
                    <span className="animate-pulse mr-1">•••</span>
                  </span>
                ) : (
                  <span className="font-bold text-base md:text-lg">{memberCount.toLocaleString()}</span>
                )}
                <span> 位駭客</span>
              </div>
              <span className="text-sm md:text-base text-muted dark:text-gray-300">共同創造</span>
              <div className="px-3 md:px-4 py-1.5 md:py-2 bg-accent/20 dark:bg-accent/30 text-dark dark:text-light rounded-full font-mono">
                <span className="font-bold text-base md:text-lg">∞</span> 種可能性
              </div>
            </motion.div>
          </motion.div>

          {/* 右側圖像/動畫 */}
          <motion.div 
            className="w-full md:w-1/2 mt-10 sm:mt-12 md:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative rounded-lg overflow-hidden border-2 sm:border-3 md:border-4 border-dark dark:border-light shadow-xl max-w-lg mx-auto">
              <div className="absolute top-0 left-0 right-0 h-7 sm:h-8 md:h-10 bg-dark dark:bg-light flex items-center px-2 sm:px-3 md:px-4 z-10">
                <div className="flex space-x-1.5 sm:space-x-2 md:space-x-2.5">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-primary"></div>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-accent"></div>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-secondary"></div>
                </div>
                <div className="text-xs sm:text-sm font-mono text-white dark:text-dark ml-2 sm:ml-3 md:ml-4">terminal</div>
              </div>
              <div className="pt-8 sm:pt-10 md:pt-12 bg-dark dark:bg-gray-900 text-light p-3 sm:p-4 md:p-6 font-mono text-xs sm:text-sm md:text-base">
                <div className="mb-1 md:mb-2">$ cd HackIt</div>
                <div className="mb-1 md:mb-2">$ ls</div>
                <div className="text-secondary mb-2 md:mb-3">projects/ events/ community/ tutorials/</div>
                <div className="mb-1 md:mb-2">$ echo "Hello, World!"</div>
                <div className="text-light mb-2 md:mb-3">Hello, World!</div>
                <div className="mb-1 md:mb-2">$ npm run create</div>
                <div className="text-accent mb-1 md:mb-2">Starting creativity engine...</div>
                <div className="text-primary mb-3 md:mb-4">Welcome to HackIt! What will you create today?</div>
                <div className="flex mt-2 md:mt-3">
                  <span>$</span>
                  <span className="ml-1.5 md:ml-2 inline-block animate-pulse">|</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6 sm:mt-10 md:mt-14 gap-4 sm:gap-6 md:gap-8">
              <motion.div 
                className="bg-accent/10 dark:bg-accent/20 p-2 sm:p-3 md:p-4 rounded-lg"
                whileHover={{ y: -8 }}
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-accent/20 dark:bg-accent/30 flex items-center justify-center rounded-md">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-dark dark:text-light">JS</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-primary/10 dark:bg-primary/20 p-2 sm:p-3 md:p-4 rounded-lg"
                whileHover={{ y: -8 }}
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/20 dark:bg-primary/30 flex items-center justify-center rounded-md">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-dark dark:text-light">PY</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-secondary/10 dark:bg-secondary/20 p-2 sm:p-3 md:p-4 rounded-lg"
                whileHover={{ y: -8 }}
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-secondary/20 dark:bg-secondary/30 flex items-center justify-center rounded-md">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-dark dark:text-light">HW</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* 向下滾動指示器 - 在小屏幕上調整尺寸和位置 */}
      <motion.div 
        className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10 hidden sm:flex"
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ 
          delay: 1.8, 
          duration: 0.8,
          ease: "easeOut" 
        }}
      >
        <motion.span 
          className="text-xs sm:text-sm font-mono text-primary mb-2 sm:mb-3 font-bold"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 2.1, 
            duration: 0.6,
            ease: "backOut" 
          }}
        >
          準備好了嗎？
        </motion.span>
        <motion.div 
          className="w-6 h-9 sm:w-7 sm:h-10 md:w-8 md:h-12 border-2 border-dark dark:border-light rounded-full flex justify-center overflow-hidden relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div 
            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-primary rounded-full absolute"
            animate={{ 
              y: [0, isMobile ? 14 : isTablet ? 16 : 19, 0],
              scale: [0.4, 0.6, 0.4]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut"
            }}
          />
        </motion.div>
        <motion.div
          className="mt-2 sm:mt-3 md:mt-4 text-xs font-mono text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.8, 1] }}
          transition={{ 
            delay: 2.3, 
            duration: 0.8,
            times: [0, 0.5, 0.75, 1]
          }}
        >
          點擊或滾動
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 