"use client";

import React, { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaLightbulb, FaUsers, FaRocket, FaChalkboardTeacher, FaCode, FaStar, FaMagic, FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n';
import { getAllEvents } from '@/utils/events';

// 更新團隊成員接口
interface TeamMember {
  image: string;
  name: string;
  title: string;
  shortIntro: string; // 卡片上顯示的簡短介紹
  description: string; // Popup中顯示的詳細描述
  specialties: string[];
  github?: string;
  twitter?: string;
  linkedin?: string;
  email?: string;
}

// 示範團隊數據（請根據實際情況擴充）
const teamMembers: TeamMember[] = [
  {
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    name: "林小明",
    title: "共同創辦人 / 技術總監",
    shortIntro: "熱衷於用科技改變教育的先行者。",
    description: "林小明是一位資深全端工程師，對教育科技充滿熱情，致力於培養下一代科技人才。他曾參與多個知名開源專案，並在程式教育領域擁有超過8年的實戰與教學經驗。他相信透過實作與創新，能激發學生的無限潛能。",
    specialties: ["全端開發", "教育科技", "開源文化", "系統架構"],
    github: "github.com/lxm",
    twitter: "twitter.com/lxm",
    linkedin: "linkedin.com/in/lxm",
    email: "lxm@hackit.tw"
  },
  {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    name: "王美玲",
    title: "共同創辦人 / 教育長",
    shortIntro: "致力於打造創新且包容的學習環境。",
    description: "王美玲是前高中資訊教師，擁有超過10年的程式教學經驗，專注於教育方法創新。她深信每個學生都擁有獨特的學習方式，致力於設計多元化課程，打破傳統科技教育的框架與限制，引導學生找到學習的樂趣。",
    specialties: ["程式教學法", "課程設計", "STEAM教育", "學習心理學"],
    github: "github.com/wml",
    twitter: "twitter.com/wml",
    linkedin: "linkedin.com/in/wml",
    email: "wml@hackit.tw"
  },
  {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    name: "張文彥",
    title: "營運總監",
    shortIntro: "專注於社群連結與活動的完美落地。",
    description: "張文彥具有豐富的社群經營和大型活動策劃經驗，他專注於為HackIt打造一個充滿活力且互助的學習社群。他擅長資源整合與跨部門協作，確保每個活動都能順利進行，並為參與者帶來最佳體驗。",
    specialties: ["社群經營", "活動策劃", "專案管理", "市場行銷"],
    github: "github.com/cwy",
    twitter: "twitter.com/cwy",
    linkedin: "linkedin.com/in/cwy",
    email: "cwy@hackit.tw"
  },
  {
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    name: "陳小華",
    title: "資深工程師",
    shortIntro: "建構穩固學習平台的技術推手。",
    description: "陳小華是HackIt技術團隊的核心成員，負責教育平台的後端開發與維護。他對系統穩定性和效能有著極高要求，致力於為學生提供流暢無礙的線上學習體驗。",
    specialties: ["後端開發", "資料庫管理", "雲端架構", "API設計"],
    github: "github.com/cxh",
    linkedin: "linkedin.com/in/cxh",
    email: "cxh@hackit.tw"
  }
  // ...可以添加更多團隊成員
]; 

// 獲取Discord成員數量的接口
interface DiscordMemberResponse {
  memberCount: number;
  guildName?: string;
  error?: string;
  fromCache?: boolean;
}

export default function AboutPage() {
  const { t, locale } = useI18n();
  
  // 參考各個區塊，用於檢測滾動到視圖
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  
  // 控制是否顯示團隊部分
  const showTeamSection = false; // 設為false以暫時隱藏團隊部分
  
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

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // 添加狀態來保存動態數據
  const [memberCount, setMemberCount] = useState<number | string>("•••");
  const [eventsCount, setEventsCount] = useState<number | string>("•••");
  const [yearsCount, setYearsCount] = useState<number | string>("•••");
  
  // 添加useEffect以獲取並計算數據
  useEffect(() => {
    // 1. 獲取Discord成員數量
    const fetchMemberCount = async () => {
      try {
        const response = await fetch('/api/discord-members');
        if (response.ok) {
          const data: DiscordMemberResponse = await response.json();
          if (data.memberCount && data.memberCount > 0) {
            setMemberCount(data.memberCount);
          }
        }
      } catch (error) {
        console.error('Failed to fetch Discord members:', error);
        setMemberCount("0"); // 如果失敗則使用預設值
      }
    };
    
    // 2. 計算從2024/9/26至今的年份
    const calculateYears = () => {
      const foundingDate = new Date('2024-09-26');
      const currentDate = new Date();
      
      // 計算差距（以毫秒為單位）
      const timeDiff = currentDate.getTime() - foundingDate.getTime();
      
      // 轉換為年份（大約估算）
      const yearsDiff = timeDiff / (1000 * 60 * 60 * 24 * 365.25);
      
      if (yearsDiff < 1) {
        // 如果不到一年，顯示"<1"
        setYearsCount("<1");
      } else {
        // 四捨五入到最接近的整數
        setYearsCount(Math.round(yearsDiff));
      }
    };
    
    // 3. 獲取活動總數
    const getEventsCount = () => {
      const events = getAllEvents();
      setEventsCount(events.length);
    };
    
    // 執行所有數據獲取函數
    fetchMemberCount();
    calculateYears();
    getEventsCount();
  }, []);

  const missionShort = t('aboutSection.missionShort', { returnObjects: true });
  const missionArr = Array.isArray(missionShort) ? missionShort : missionShort ? [missionShort] : [];
  const manifestoShort = t('aboutSection.manifestoShort', { returnObjects: true });
  const manifestoArr = Array.isArray(manifestoShort) ? manifestoShort : manifestoShort ? [manifestoShort] : [];

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
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {t("aboutSection.aboutUs")}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t("aboutSection.tagline", {
                highlight: (text) => (
                  <span className="text-primary font-semibold">{text}</span>
                )
              })}
            </motion.p>
            
            <motion.div 
              className="h-1 w-20 bg-primary mx-auto mb-8"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("aboutSection.introduction")}
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
            className="absolute right-1/4 bottom-10 w-40 h-40 border-4 border-secondary/30 rounded-full blur-xl"
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
                    src="/images/scrapyard_taiwan_all.jpg"
                    alt={t("aboutSection.hackItFoundersAlt") as string}
                    fill
                    style={{ 
                      objectFit: "cover",
                      filter: "saturate(0.9) hue-rotate(-10deg) brightness(0.99)"
                    }}
                    className="transition-transform duration-500 hover:scale-105"
                  />
                  
                  {/* 圖片疊加效果 */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                  {/* 攝影師浮水印 */}
                  <div className="absolute bottom-3 right-4 flex items-center group select-none">
                    <span
                      className="text-xs text-white/60 bg-black/30 rounded px-2 py-1 backdrop-blur-sm transition-all duration-300 group-hover:text-white group-hover:bg-black/70 group-hover:scale-110 flex items-center gap-1"
                      style={{ fontFamily: 'monospace', letterSpacing: '0.02em', cursor: 'pointer' }}
                    >
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A2 2 0 0 1 22 9.618V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.618a2 2 0 0 1 2.447-1.894L9 10m6 0V7a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v3m6 0l-3 2.5L9 10"/></svg>
                      攝影：劉研軾
                    </span>
                  </div>
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
                  { 
                    value: memberCount, 
                    label: t("aboutSection.students")
                  },
                  { 
                    value: eventsCount, 
                    label: t("aboutSection.events")
                  },
                  { 
                    value: yearsCount, 
                    label: t("aboutSection.years")
                  }
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    className="text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="text-4xl font-bold text-primary"
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: [0.9, 1.1, 1] }}
                      transition={{ duration: 0.5, delay: 0.1 * i }}
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
                initial={{ opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                {t("aboutSection.ourOrigins")}
              </motion.div>
              
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100"
                initial={{ opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                HackIt
                <motion.span 
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
                  {t("aboutSection.founderStoryTitlePlain") as string}
                </motion.span>
              </motion.h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
                {[
                  t("aboutSection.founderStoryParagraph1"),
                  t("aboutSection.founderStoryParagraph2"),
                  t("aboutSection.founderStoryParagraph3")
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
        className="py-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
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
          
          {/* 增加一些裝飾性元素 */}
          <motion.div 
            className="absolute top-1/4 right-[15%] w-24 h-24 bg-gradient-to-br from-purple-100/30 to-indigo-100/20 dark:from-purple-900/10 dark:to-indigo-900/5 rounded-full blur-xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-[20%] w-32 h-32 bg-gradient-to-tr from-indigo-100/20 to-purple-100/30 dark:from-indigo-900/5 dark:to-purple-900/10 rounded-full blur-xl"
            animate={{ 
              scale: [1, 0.8, 1],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
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
        
        {/* 矩形裝飾 */}
        <motion.div
          className="absolute right-[15%] bottom-[15%] w-12 h-12 border-2 border-primary/10 rounded-lg opacity-50"
          animate={{ 
            rotate: [0, 45],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isMissionInView ? "visible" : "hidden"}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-100 tracking-tight"
              variants={itemVariants}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {t("aboutSection.missionAndManifesto")}
            </motion.h2>
            
            <motion.div 
              className="h-0.5 w-16 md:w-24 bg-primary mx-auto mb-6"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 96, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light"
              variants={itemVariants}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t("aboutSection.coreIdealsPromise")}
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* 使命卡片 */}
            <motion.div 
              className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 duration-500 relative overflow-hidden border border-transparent hover:border-primary/10"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 40, damping: 25 }}
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
              
              {/* 裝飾光暈 */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-2xl"></div>
              
              <motion.div 
                className="relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8"
                  whileHover={{ rotate: [0, 5, -5, 0], scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaRocket className="text-2xl" />
                </motion.div>
                
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {t("aboutSection.mission")}
                </motion.h3>
                
                <div className="space-y-5">
                  {missionArr.map((line: string, idx: number) => (
                    <motion.p
                      key={idx}
                      className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-medium"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 + idx * 0.08 }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            {/* 宣言卡片 */}
            <motion.div 
              className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 duration-500 relative overflow-hidden border border-transparent hover:border-primary/10"
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 40, damping: 25 }}
              viewport={{ once: true }}
            >
              {/* 背景圖案 */}
              <div className="absolute inset-0 overflow-hidden opacity-5">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <motion.path
                    d="M0,50 C20,40 40,60 60,40 C80,20 100,30 100,0 L100,100 L0,100 Z"
                    fill="currentColor"
                    className="text-primary"
                    animate={{ 
                      d: [
                        "M0,50 C20,40 40,60 60,40 C80,20 100,30 100,0 L100,100 L0,100 Z",
                        "M0,40 C30,50 50,30 70,50 C90,70 100,60 100,10 L100,100 L0,100 Z",
                        "M0,50 C20,40 40,60 60,40 C80,20 100,30 100,0 L100,100 L0,100 Z"
                      ]
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  />
                </svg>
              </div>
              
              {/* 裝飾光暈 */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-2xl"></div>
              
              <motion.div 
                className="relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaMagic className="text-2xl" />
                </motion.div>
                
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {t("aboutSection.manifesto")}
                </motion.h3>
                
                <div className="space-y-5">
                  {manifestoArr.map((line: string, idx: number) => (
                    <motion.p
                      key={idx}
                      className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 font-medium"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 + idx * 0.08 }}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
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
        {/* 左上角裝飾 */}
        <motion.div 
          className="absolute top-0 left-0 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* 右下角裝飾 */}
        <motion.div 
          className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-50 dark:bg-indigo-900/10 rounded-full translate-x-1/3 translate-y-1/3"
          animate={{
            scale: [1, 0.9, 1],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {t("aboutSection.coreValuesTitle", {
                highlight: (text) => (
                  <span className="text-primary">{text}</span>
                )
              })}
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {locale === 'zh-TW' 
                ? "這些原則指導著我們的決策和行動"
                : "These principles guide our decisions and actions"}
            </motion.p>
          </motion.div>
          
          {/* 核心價值卡片 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaLightbulb className="text-2xl" />,
                title: t("aboutSection.coreValueInnovativeTitle"),
                description: t("aboutSection.coreValueInnovativeDescription")
              },
              {
                icon: <FaUsers className="text-2xl" />,
                title: t("aboutSection.coreValueCommunityTitle"),
                description: t("aboutSection.coreValueCommunityDescription")
              },
              {
                icon: <FaCode className="text-2xl" />,
                title: t("aboutSection.coreValuePracticalTitle"),
                description: t("aboutSection.coreValuePracticalDescription")
              },
              {
                icon: <FaChalkboardTeacher className="text-2xl" />,
                title: t("aboutSection.coreValueLifelongLearningTitle"),
                description: t("aboutSection.coreValueLifelongLearningDescription")
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-md hover:shadow-lg transition-all"
                initial={{ opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6">
                  {value.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* CTA 部分 - 只在顯示團隊部分時才顯示 */}
          {showTeamSection && (
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                {t("aboutSection.ctaText")}
              </p>
              <button className="px-8 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark hover:shadow-lg transition-all font-medium">
                {t("aboutSection.ctaButton")}
              </button>
            </motion.div>
          )}
        </div>
      </motion.section>
      
      {/* Notion 連結部分 */}
      <motion.section 
        className="py-16 bg-gray-50 dark:bg-gray-800 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* 背景裝飾 */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -right-20 top-1/3 w-40 h-40 bg-primary/5 dark:bg-primary/10 rounded-full"
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute left-1/4 bottom-10 w-24 h-24 bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100"
              initial={{ opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              {t("aboutSection.learnMoreNotion")}
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              viewport={{ once: true }}
            >
              {t("aboutSection.notionDescription")}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <a 
                href="https://hackittw.notion.site/wi-ki-about?pvs=4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium gap-2"
              >
                {t("aboutSection.visitNotionButton")}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* 團隊部分 */}
      {showTeamSection && (
        <motion.section
          ref={teamRef}
          className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* 背景裝飾 */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/5 to-indigo-100/30 dark:from-primary/10 dark:to-indigo-800/10 rounded-full"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 15, 0]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-indigo-100/30 to-primary/5 dark:from-indigo-800/10 dark:to-primary/10 rounded-full"
              animate={{ 
                scale: [1, 0.9, 1],
                rotate: [0, -10, 0]
              }}
              transition={{ 
                duration: 18, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            
            {/* 浮動代碼符號 */}
            <motion.div
              className="absolute bottom-20 right-[10%] text-gray-300 dark:text-gray-700 font-mono text-xl opacity-30 transform rotate-12"
              animate={{ 
                y: [0, -15, 0],
                rotate: [12, 15, 12]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              &lt;/&gt;
            </motion.div>
            <motion.div
              className="absolute top-40 left-[15%] text-gray-300 dark:text-gray-700 font-mono text-2xl opacity-20 transform -rotate-12"
              animate={{ 
                y: [0, 15, 0],
                rotate: [-12, -16, -12]
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              {"{...}"}
            </motion.div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {t("aboutSection.teamHeader")}
              </motion.h2>
              
              <motion.p 
                className="text-lg text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {t("aboutSection.teamSubheader")}
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={isTeamInView ? "visible" : "hidden"}
            >
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all group"
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="relative h-60 overflow-hidden">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm font-medium invisible group-hover:visible">
                        {t("aboutSection.clickForDetails")}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">{member.name}</h3>
                    <p className="text-primary font-medium text-sm mb-4">{member.title}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">{member.shortIntro}</p>
                    
                    <div className="flex gap-2 mt-5 text-gray-600 dark:text-gray-400">
                      {member.specialties.slice(0, 2).map((specialty, i) => (
                        <span key={i} className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full">
                          {specialty}
                        </span>
                      ))}
                      {member.specialties.length > 2 && (
                        <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full">
                          +{member.specialties.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
                      {/* CTA Button - 只在顯示團隊部分時才顯示 */}
          {showTeamSection && (
            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <button className="px-8 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark hover:shadow-lg transition-all font-medium">
                {t("aboutSection.viewFullTeam")}
              </button>
            </motion.div>
          )}
          </div>
          
          {/* 團隊成員詳情彈窗 */}
          <AnimatePresence>
            {selectedMember && (
              <motion.div 
                className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMember(null)}
              >
                <motion.div 
                  className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-2xl overflow-hidden relative"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 dark:text-white shadow-md z-10"
                    onClick={() => setSelectedMember(null)}
                  >
                    <FaTimes />
                  </button>
                  
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 relative h-60 md:h-auto">
                      <Image 
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
                    </div>
                    
                    <div className="md:w-2/3 p-6 md:p-8">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">{selectedMember.name}</h3>
                      <p className="text-primary font-medium mb-4">{selectedMember.title}</p>
                      
                      <div className="prose prose-sm md:prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                        <p>{selectedMember.description}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-6">
                        {selectedMember.specialties.map((specialty, i) => (
                          <span key={i} className="inline-block px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-4 mt-6">
                        {selectedMember.github && (
                          <a href={`https://${selectedMember.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                            <FaGithub className="text-xl" />
                          </a>
                        )}
                        {selectedMember.twitter && (
                          <a href={`https://${selectedMember.twitter}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                            <FaTwitter className="text-xl" />
                          </a>
                        )}
                        {selectedMember.linkedin && (
                          <a href={`https://${selectedMember.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                            <FaLinkedin className="text-xl" />
                          </a>
                        )}
                        {selectedMember.email && (
                          <a href={`mailto:${selectedMember.email}`} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                            <FaEnvelope className="text-xl" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      )}
      
      <Footer />
    </main>
  );
} 