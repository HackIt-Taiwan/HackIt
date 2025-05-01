"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaRocket, FaLaptopCode, FaUsers, FaStar, FaCode } from 'react-icons/fa';

const YouthIntroSection: React.FC = () => {
  // 隨機分佈的裝飾星星
  const stars = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    size: 3 + Math.random() * 10,
  }));

  // 手繪風格動畫變體
  const handDrawnVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: { 
      opacity: 1, 
      pathLength: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut" 
      }
    }
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 背景繪製線條 */}
        <svg
          className="absolute w-full h-full opacity-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,50 C20,30 50,70 100,50"
            stroke="#7C3AED"
            strokeWidth="0.5"
            fill="none"
            initial="hidden"
            animate="visible"
            variants={handDrawnVariants}
          />
          <motion.path
            d="M0,30 C30,50 70,20 100,40"
            stroke="#7C3AED"
            strokeWidth="0.5"
            fill="none"
            initial="hidden"
            animate="visible"
            variants={handDrawnVariants}
          />
          <motion.path
            d="M0,70 C40,90 60,40 100,60"
            stroke="#7C3AED"
            strokeWidth="0.5"
            fill="none"
            initial="hidden"
            animate="visible"
            variants={handDrawnVariants}
          />
        </svg>
        
        {/* 裝飾星星 */}
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute text-primary opacity-20 dark:opacity-30"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              fontSize: `${star.size}px`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              delay: star.delay,
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <FaStar />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* 標題區 */}
          <div className="text-center relative mb-16">
            <motion.div
              className="inline-block mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="px-4 py-2 bg-primary/10 dark:bg-primary/20 text-primary rounded-full inline-flex items-center gap-2 font-medium">
                <FaCode className="text-sm" />
                <span>專為年輕創作者打造</span>
              </div>
            </motion.div>
            
            {/* 修改標題樣式，使其更加突出且有手工感 */}
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="relative inline-block">
                <span className="relative z-10 text-gray-800 dark:text-gray-100">一起探索</span>
                <svg className="absolute inset-0 w-full h-full" style={{ top: '5%', zIndex: 0 }}>
                  <motion.rect 
                    width="100%" 
                    height="65%" 
                    fill="#F2E8FF" 
                    className="dark:fill-purple-900/30"
                    rx="3"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  />
                </svg>
              </span>{' '}
              <span className="relative inline-block mt-2 md:mt-0">
                <span className="relative z-10 text-primary">程式創作</span>
                <svg className="absolute inset-0 w-full h-full" style={{ top: '60%', left: '0', zIndex: 0 }}>
                  <motion.path 
                    d="M0,10 Q40,20 80,10 T160,10" 
                    stroke="#7C3AED" 
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    viewport={{ once: true }}
                  />
                </svg>
              </span>{' '}
              <span className="relative inline-block mt-2 md:mt-0">
                <span className="relative z-10 text-gray-800 dark:text-gray-100">的</span>
                <span className="relative z-10 text-primary font-bold">無限可能</span>
                <svg className="absolute inset-0 w-full h-full" style={{ top: '5%', zIndex: 0 }}>
                  <motion.circle 
                    cx="50%" 
                    cy="50%" 
                    r="25" 
                    fill="#FFE4D6"
                    className="dark:fill-orange-800/30" 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 3 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                  />
                </svg>
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              HackIt 是一群熱愛創作的13-18歲夥伴們的秘密基地，我們在這裡玩程式、做專案、交朋友、
              <span className="font-semibold text-primary">一起瘋狂創造屬於這個世代的數位可能</span>！
            </motion.p>

            {/* 手繪的裝飾 */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
              <svg width="150" height="20" viewBox="0 0 150 20" fill="none">
                <motion.path 
                  d="M5,10 C30,2 60,18 75,10 C90,2 120,18 145,10" 
                  stroke="#7C3AED" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </svg>
            </div>
          </div>
          
          {/* 特色區塊 - 設計成手繪筆記風格 */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <FaLaptopCode className="w-6 h-6 text-white" />,
                title: "動手做最酷的程式專案",
                description: "從零開始，一步步打造屬於自己的網站、遊戲、App、AI 應用，沒有經驗也沒關係！"
              },
              {
                icon: <FaUsers className="w-6 h-6 text-white" />,
                title: "找到一群同路人",
                description: "跟來自各地的科技愛好者成為朋友，一起腦力激盪、互相幫助、共同成長！"
              },
              {
                icon: <FaRocket className="w-6 h-6 text-white" />,
                title: "打造個人超強作品集",
                description: "在導師指導下完成專案，累積實戰經驗，為未來升學與職涯做準備～"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                {/* 筆記紙風格背景 - 更加強調手工感 */}
                <div className="absolute inset-0 bg-white dark:bg-gray-700 rounded-xl shadow-md transform rotate-1 group-hover:rotate-2 transition-transform duration-300" style={{ 
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 27px, #f0f0f0 28px)'
                }}></div>
                
                <div className="relative p-7 bg-white dark:bg-gray-800 rounded-xl shadow-md border-t-4 border-primary z-10 h-full transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300">
                  {/* 手繪風格裝飾膠帶 */}
                  <div className="absolute -left-2 -top-1 w-10 h-5 bg-yellow-300/60 dark:bg-yellow-500/50 transform rotate-45"></div>
                  <div className="absolute -right-3 -top-3">
                    <motion.div 
                      className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white"
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.05
                      }}
                      transition={{ duration: 1 }}
                    >
                      {feature.icon}
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 mt-2 text-gray-800 dark:text-gray-100">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  
                  {/* 手繪裝飾 */}
                  <svg className="absolute bottom-3 right-4 w-12 h-12 text-primary/10 dark:text-primary/20" viewBox="0 0 24 24">
                    <motion.path
                      d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 1 }}
                      viewport={{ once: true }}
                    />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* 呼籲行動區域 */}
          <motion.div 
            className="relative mt-24 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
              <svg width="30" height="30" viewBox="0 0 30 30">
                <motion.path
                  d="M15,3 L28,28 L15,20 L2,28 L15,3Z"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                  viewport={{ once: true }}
                />
              </svg>
            </div>
            
            <motion.div
              className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-lg relative"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* 手繪風的紙張背景 */}
              <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl overflow-hidden" style={{ 
                backgroundImage: 'radial-gradient(circle, #f9f9f9 1px, transparent 1px)',
                backgroundSize: '15px 15px' 
              }}></div>
              
              <div className="absolute top-0 right-0 w-full h-full overflow-hidden rounded-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 dark:bg-primary/10 rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-50 dark:bg-indigo-900/20 rounded-full transform -translate-x-16 translate-y-16"></div>
                
                {/* 手繪風紙膠帶裝飾 */}
                <div className="absolute -top-3 left-10 w-24 h-6 bg-pink-200/40 dark:bg-pink-800/30 transform rotate-5"></div>
                <div className="absolute -bottom-3 right-10 w-24 h-6 bg-blue-200/40 dark:bg-blue-800/30 transform -rotate-5"></div>
              </div>
              
              <div className="relative z-10">
                <motion.p 
                  className="text-2xl text-gray-800 dark:text-gray-100 font-medium mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  無論你是第一次碰程式的新手，還是已經有一點經驗的開發者<br/>
                  <span className="text-primary font-bold">來 HackIt，總有一段冒險在等你！</span>
                </motion.p>
                
                <div className="flex flex-wrap justify-center gap-6">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: -1 }} 
                    whileTap={{ scale: 0.95 }}
                    initial={{ x: -30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      href="/about" 
                      className="inline-block px-8 py-3 bg-white dark:bg-gray-700 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                    >
                      了解更多
                    </Link>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 1 }} 
                    whileTap={{ scale: 0.95 }}
                    initial={{ x: 30, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Link 
                      href="/signup" 
                      className="inline-block px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
                    >
                      馬上加入
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default YouthIntroSection; 