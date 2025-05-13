"use client";

import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaLightbulb, FaUsers, FaRocket, FaChalkboardTeacher, FaCode, FaStar, FaMagic } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

export default function AboutPage() {
  // 參考各個區塊，用於檢測滾動到視圖
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  
  // 滾動進度動畫
  const { scrollYProgress } = useScroll();
  const opacityHero = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  
  // 檢測各區塊是否在視圖中
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const isStoryInView = useInView(storyRef, { once: false, amount: 0.3 });
  const isMissionInView = useInView(missionRef, { once: false, amount: 0.2 });
  const isValuesInView = useInView(valuesRef, { once: false, amount: 0.2 });
  const isTeamInView = useInView(teamRef, { once: false, amount: 0.1 });
  
  // 動畫變體
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  // 漂浮動畫元素
  const FloatingElement = ({ delay, className }: { delay: number, className: string }) => (
    <motion.div
      className={`absolute ${className}`}
      animate={{ 
        y: [0, -10, 0, 10, 0],
        rotate: [0, 2, 0, -2, 0]
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 5, 
        ease: "easeInOut", 
        delay
      }}
    />
  );

  return (
    <main className="relative">
      <Navbar />
      
      {/* 頁面標題區塊 - 簡化動畫 */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
      >
        {/* 簡化背景 */}
        <div className="absolute top-0 right-0 w-1/3 h-64 bg-indigo-100/70 dark:bg-indigo-900/20 blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-purple-100/70 dark:bg-purple-900/30 blur-3xl opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 dark:text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              關於<span className="text-primary inline-block">我們</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              用<span className="text-primary font-semibold">創新思維</span>啟發未來科技人才
            </motion.p>
            
            <motion.div 
              className="h-1 w-20 bg-primary mx-auto mb-8"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              HackIt是一個致力於透過編程教育賦能青少年，啟發他們成為未來科技創新者的社群平台
            </motion.p>
        </div>
        </div>
      </section>
      
      {/* 創辦故事 */}
      <motion.section 
        ref={storyRef}
        className="py-24 bg-white dark:bg-gray-900 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* 背景裝飾 */}
        <div className="absolute w-full h-full overflow-hidden">
          <motion.div
            className="absolute -left-16 top-1/4 w-32 h-32 border-2 border-primary/10 rounded-lg"
            animate={{ rotate: [0, 90], opacity: [0.2, 0.1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute right-10 top-10 w-24 h-24 border-2 border-dashed border-primary/10 rounded-full"
            animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute right-1/4 bottom-10 w-40 h-40 border-4 border-secondary/30 rounded-full"
            style={{ borderRadius: "38% 62% 63% 37% / 41% 44% 56% 59%" }}
            animate={{ 
              rotate: [0, 360],
              borderRadius: [
                "38% 62% 63% 37% / 41% 44% 56% 59%",
                "45% 55% 67% 33% / 53% 36% 64% 47%",
                "33% 67% 58% 42% / 63% 68% 32% 37%",
                "38% 62% 63% 37% / 41% 44% 56% 59%"
              ]
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-16"
            variants={containerVariants}
            initial="hidden"
            animate={isStoryInView ? "visible" : "hidden"}
          >
            <motion.div className="lg:w-1/2 relative" variants={itemVariants}>
              <motion.div 
                className="relative rounded-2xl overflow-hidden shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="aspect-w-16 aspect-h-12 relative h-[400px]"
                  initial={{ filter: "grayscale(100%)" }}
                  whileInView={{ filter: "grayscale(0%)" }}
                  transition={{ duration: 1.5 }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop"
                    alt="HackIt創辦人團隊"
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 hover:scale-105"
                  />
                  
                  {/* 圖片疊加效果 */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                  
                  {/* 浮動代碼符號 */}
                  <motion.div
                    className="absolute bottom-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-lg text-white font-mono"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    &lt;hack&gt;it&lt;/hack&gt;
                  </motion.div>
                </motion.div>
                
                {/* 裝飾元素 */}
                <motion.div 
                  className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/10 rounded-xl -z-10"
                  animate={{ 
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.05, 1, 0.95, 1]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-xl -z-10"
                  animate={{ 
                    rotate: [0, -10, 0, 10, 0],
                    scale: [1, 0.95, 1, 1.05, 1]
                  }}
                  transition={{ duration: 8, repeat: Infinity, delay: 0.5 }}
                />
              </motion.div>
              
              {/* 統計數字 */}
              <div className="flex justify-center mt-10 gap-8">
                {[
                  { value: '25,000+', label: '學生' },
                  { value: '50+', label: '活動' },
                  { value: '3', label: '年歷史' }
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    className="text-center"
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 * i, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="text-4xl font-bold text-primary"
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: [0.8, 1.2, 1] }}
                      transition={{ duration: 0.6, delay: 0.3 + 0.1 * i }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-gray-600 dark:text-gray-300 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div className="lg:w-1/2" variants={itemVariants}>
              <motion.div 
                className="inline-block px-4 py-1 rounded-full text-primary bg-primary/10 text-sm font-medium mb-6"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                我們的起源
              </motion.div>
              
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                HackIt<motion.span 
                  className="text-primary"
                  animate={{ 
                    textShadow: [
                      "0px 0px 0px rgba(124, 58, 237, 0)",
                      "0px 0px 5px rgba(124, 58, 237, 0.3)",
                      "0px 0px 0px rgba(124, 58, 237, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  創辦故事
                </motion.span>
              </motion.h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
                {[
                  "HackIt創立於2020年，由一群熱愛科技教育的資深軟體工程師和教育工作者共同發起。在疫情帶來的遠距教學挑戰中，我們看見了數位教育的新機會，也發現傳統教育體系難以滿足現代科技人才的培育需求。",
                  "作為第一線的科技從業人員，我們深知實作經驗和創新思維對於未來工作者的重要性。因此，我們決定打造一個結合線上學習、實體工作坊和黑客松競賽的綜合平台，讓青少年能在寓教於樂的環境中接觸真實的科技專案開發。",
                  "三年來，HackIt已經服務超過25,000名學生，舉辦了50多場線上及實體活動，並協助多位學員實現了自己的創新項目，甚至獲得國際級競賽的肯定。"
                ].map((paragraph, i) => (
                  <motion.p 
                    key={i}
                    className={i < 2 ? "mb-6" : ""}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + 0.1 * i }}
                    viewport={{ once: true }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* 使命與願景 */}
      <motion.section 
        ref={missionRef}
        className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* 動態背景形狀 */}
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div 
            className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 dark:bg-primary/10 rounded-full transform -translate-x-1/3 -translate-y-1/3"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full transform translate-x-1/4 translate-y-1/4"
            animate={{ 
              scale: [1, 0.9, 1],
              rotate: [0, -10, 0]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
        
        {/* 裝飾性圖形 */}
        <motion.div
          className="absolute left-[10%] top-[20%] w-16 h-16"
          style={{ 
            background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(30, 64, 175, 0.05) 100%)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%"
          }}
          animate={{ 
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%"
            ],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isMissionInView ? "visible" : "hidden"}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100"
              variants={itemVariants}
            >
              我們的
              <motion.span 
                className="text-primary mx-1"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                使命
              </motion.span>
              與
              <motion.span 
                className="text-primary mx-1"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                願景
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              variants={itemVariants}
            >
              驅動我們前進的核心理念和遠大目標
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* 使命卡片 */}
            <motion.div 
              className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300 relative overflow-hidden"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* 背景圖案 */}
              <div className="absolute inset-0 overflow-hidden opacity-5">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <motion.path
                    d="M0,0 C20,10 40,0 60,10 C80,20 100,10 100,30 L100,100 L0,100 Z"
                    fill="currentColor"
                    className="text-primary"
                    animate={{ 
                      d: [
                        "M0,0 C20,10 40,0 60,10 C80,20 100,10 100,30 L100,100 L0,100 Z",
                        "M0,0 C30,20 50,10 70,20 C90,30 100,20 100,40 L100,100 L0,100 Z",
                        "M0,0 C20,10 40,0 60,10 C80,20 100,10 100,30 L100,100 L0,100 Z"
                      ]
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </svg>
              </div>
              
              <motion.div 
                className="flex items-center mb-6 relative z-10"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mr-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FaRocket />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">我們的使命</h3>
              </motion.div>
              
              <div className="prose prose-lg text-gray-600 dark:text-gray-300 relative z-10">
                {[
                  "我們致力於透過實用且創新的編程教育，啟發年輕人的技術潛能和創造力，培養他們成為未來的數位創新者和問題解決者。",
                  "我們相信每個年輕人都應該有機會接觸編程技能，不論其背景或先前經驗。透過我們的平台，我們希望消除科技教育的障礙，讓更多人能夠參與數位未來的建設。"
                ].map((paragraph, i) => (
                  <motion.p 
                    key={i}
                    className={i === 0 ? "mb-6" : ""}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 + 0.1 * i }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
              
              {/* 裝飾性元素 */}
              <motion.div
                className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-tl-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
            
            {/* 願景卡片 */}
            <motion.div 
              className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300 relative overflow-hidden"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* 背景圖案 */}
              <div className="absolute inset-0 overflow-hidden opacity-5">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <motion.path
                    d="M100,0 C80,10 60,0 40,10 C20,20 0,10 0,30 L0,100 L100,100 Z"
                    fill="currentColor"
                    className="text-primary"
                    animate={{ 
                      d: [
                        "M100,0 C80,10 60,0 40,10 C20,20 0,10 0,30 L0,100 L100,100 Z",
                        "M100,0 C70,20 50,10 30,20 C10,30 0,20 0,40 L0,100 L100,100 Z",
                        "M100,0 C80,10 60,0 40,10 C20,20 0,10 0,30 L0,100 L100,100 Z"
                      ]
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </svg>
              </div>
              
              <motion.div 
                className="flex items-center mb-6 relative z-10"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mr-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FaStar />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">我們的願景</h3>
              </motion.div>
              
              <div className="prose prose-lg text-gray-600 dark:text-gray-300 relative z-10">
                {[
                  "我們期望打造一個蓬勃發展的科技學習生態系統，在此生態系統中，創新思考被鼓勵，技術技能被賦能，社群合作被重視。",
                  "我們希望成為台灣青少年科技教育的領導品牌，透過我們培育的人才，為社會創造正面影響，並協助台灣在全球數位經濟中保持競爭力。"
                ].map((paragraph, i) => (
                  <motion.p 
                    key={i}
                    className={i === 0 ? "mb-6" : ""}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 + 0.1 * i }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
              
              {/* 裝飾性元素 */}
              <motion.div
                className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-tr-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* 核心價值 */}
      <motion.section 
        ref={valuesRef}
        className="py-24 bg-white dark:bg-gray-900 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* 背景裝飾 */}
        <motion.div 
          className="absolute -left-20 -top-20 w-40 h-40 rounded-full bg-primary/5"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute right-10 bottom-20 w-60 h-60 rounded-full bg-indigo-100/50 dark:bg-indigo-900/10 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isValuesInView ? "visible" : "hidden"}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100"
              variants={itemVariants}
            >
              我們的
              <motion.span 
                className="text-primary ml-2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                核心價值
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              variants={itemVariants}
            >
              引導我們所有行動和決策的基本原則
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isValuesInView ? "visible" : "hidden"}
          >
            {[
              {
                icon: <FaLightbulb className="w-8 h-8 text-primary" />,
                title: "創新思維",
                description: "鼓勵突破傳統框架，培養解決問題的創造力，讓學習者用不同角度思考問題。"
              },
              {
                icon: <FaUsers className="w-8 h-8 text-primary" />,
                title: "社群合作",
                description: "建立互助學習環境，強調團隊協作的重要性，共同成長比單打獨鬥更能取得成功。"
              },
              {
                icon: <FaRocket className="w-8 h-8 text-primary" />,
                title: "實踐導向",
                description: "理論與實作並重，透過真實項目應用所學，打造可展示的作品集加速職涯發展。"
              },
              {
                icon: <FaChalkboardTeacher className="w-8 h-8 text-primary" />,
                title: "終身學習",
                description: "培養持續學習的習慣，在科技快速變遷的時代，保持好奇心與學習熱情是最大的競爭力。"
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                {/* 背景裝飾 */}
                <motion.div 
                  className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-primary/5 dark:bg-primary/10"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 20, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    delay: index * 0.7
                  }}
                />
                
                <motion.div 
                  className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 relative z-10"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  {value.icon}
                  
                  {/* 旋轉光環 */}
                  <motion.div 
                    className="absolute inset-0 border-2 border-primary/30 rounded-full"
                    animate={{ rotate: [0, 360] }}
                    transition={{ 
                      duration: 15, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
                
                <motion.h3 
                  className="text-xl font-bold text-center mb-4 dark:text-gray-100 relative z-10"
                  whileHover={{ scale: 1.05 }}
                >
                  {value.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 text-center relative z-10"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {value.description}
                </motion.p>
                
                {/* 懸浮點綴 */}
                <motion.div
                  className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {/* 底部額外裝飾 */}
          <motion.div
            className="w-full flex justify-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full"
              style={{ width: '50%' }}
              animate={{ 
                width: ['0%', '50%', '0%'],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </motion.section>
      
      {/* 團隊成員 */}
      <motion.section 
        ref={teamRef}
        className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* 背景效果 */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-0 right-0 w-full h-40 bg-gradient-to-b from-primary/5 to-transparent"
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              y: [0, 10, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        {/* 動態圖形 */}
        <motion.div
          className="absolute -left-16 top-20 w-32 h-64 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 20, 0],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-0 bottom-20 w-80 h-40 bg-gradient-to-bl from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isTeamInView ? "visible" : "hidden"}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100"
              variants={itemVariants}
            >
              認識我們的
              <motion.span 
                className="text-primary ml-2 inline-block"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                團隊
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              variants={itemVariants}
            >
              一群充滿熱情與專業的教育者和科技人
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isTeamInView ? "visible" : "hidden"}
          >
            {[
              {
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
                name: "林小明",
                title: "共同創辦人 / 技術總監",
                description: "資深全端工程師，熱衷於教育科技和培養下一代人才。"
              },
              {
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
                name: "王美玲",
                title: "共同創辦人 / 教育長",
                description: "前高中資訊教師，擁有10年以上程式教學經驗，專注於教育方法創新。"
              },
              {
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
                name: "張文彥",
                title: "營運總監",
                description: "具有豐富的社群經營和活動策劃經驗，專注於打造優質學習體驗。"
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="h-64 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image 
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* 圖像疊加效果 */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-indigo-700/70 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.6 }}
                  />
                  
                  {/* 懸停時的動態效果 */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-medium"
                      whileHover={{ scale: 1.1 }}
                    >
                      查看簡介
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="p-6 relative"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 * index, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary/50 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: 64 }}
                    transition={{ delay: 0.3 * index, duration: 0.5 }}
                  />
                  
                  <motion.h3 
                    className="text-xl font-bold mb-1 dark:text-gray-100"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {member.name}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-primary mb-3"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    {member.title}
                  </motion.p>
                  
                  <motion.p 
                    className="text-gray-600 dark:text-gray-300 mb-4"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    {member.description}
                  </motion.p>
                  
                  <motion.div 
                    className="flex space-x-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 * index + 0.2, duration: 0.4 }}
                  >
                    {/* 社群媒體圖標 */}
                    {['#', '#', '#'].map((_, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"
                        whileHover={{ scale: 1.2, backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
                      >
                        <FaMagic className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* 加入我們CTA */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              我們正在尋找志同道合的夥伴一起成長
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/join-team"
                className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-lg transition-colors relative overflow-hidden group"
              >
                <span className="relative z-10">加入我們的團隊</span>
                <motion.span
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-25"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <motion.span 
                  className="absolute -right-2 -top-2 w-12 h-12 bg-primary/20 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.8, 0.6]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* 聯絡我們 */}
      <motion.section 
        className="py-24 bg-gradient-to-br from-indigo-600 to-purple-600 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* 背景動畫 */}
        <div className="absolute inset-0 overflow-hidden">
          {/* 波浪效果 */}
          <svg 
            className="absolute bottom-0 left-0 w-full" 
            height="100" 
            preserveAspectRatio="none"
            viewBox="0 0 1440 100"
          >
            <motion.path 
              d="M0,100 C180,60 360,80 540,100 C720,120 900,60 1080,40 C1260,20 1440,60 1440,100 L1440,100 L0,100 Z"
              fill="white" 
              fillOpacity="0.1"
              animate={{
                d: [
                  "M0,100 C180,60 360,80 540,100 C720,120 900,60 1080,40 C1260,20 1440,60 1440,100 L1440,100 L0,100 Z",
                  "M0,100 C180,40 360,100 540,80 C720,60 900,80 1080,100 C1260,120 1440,80 1440,100 L1440,100 L0,100 Z",
                  "M0,100 C180,60 360,80 540,100 C720,120 900,60 1080,40 C1260,20 1440,60 1440,100 L1440,100 L0,100 Z"
                ]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
          
          {/* 漂浮粒子 */}
          {[...Array(20)].map((_, index) => (
            <motion.div 
              key={index}
              className="absolute w-2 h-2 rounded-full bg-white opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{ 
                y: [0, -30], 
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 6 + Math.random() * 5, 
                repeat: Infinity,
                delay: Math.random() * 5 
              }}
            />
          ))}
          
          {/* 光影效果 */}
          <motion.div
            className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent"
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              讓我們一起
              <motion.span 
                className="ml-2 inline-block"
                animate={{ 
                  y: [0, -5, 0],
                  textShadow: [
                    "0px 0px 0px rgba(255,255,255,0)",
                    "0px 0px 10px rgba(255,255,255,0.5)",
                    "0px 0px 0px rgba(255,255,255,0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                創造未來
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-xl mb-10 opacity-90"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              有任何問題或合作提案，歡迎隨時與我們聯繫
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="inline-block bg-white dark:bg-gray-800 text-primary hover:bg-gray-100 dark:hover:bg-gray-700 font-medium py-3 px-8 rounded-lg transition-colors relative overflow-hidden group"
              >
                <span className="relative z-10">聯絡我們</span>
                <motion.span 
                  className="absolute -left-4 -bottom-4 w-16 h-16 bg-white/20 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 0.3, 0.6]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      <Footer />
    </main>
  );
} 