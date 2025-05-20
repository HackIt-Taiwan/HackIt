"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaCalendar, FaUser, FaNewspaper, FaStar, FaInbox, FaRss } from 'react-icons/fa';
import { getLatestNews } from '@/utils/news';
import { useI18n } from '@/i18n';

// 浮動動畫
const floatAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [0, -10, 0], 
    transition: { 
      duration: 5, 
      repeat: Infinity, 
      repeatType: "reverse" as const,
      ease: "easeInOut" 
    } 
  }
};

export default function LatestNewsSection() {
  const { t, locale } = useI18n();
  
  // 獲取最新的3則新聞
  const latestNews = getLatestNews(3);
  const hasNews = latestNews.length > 0;
  
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-purple-50/30 to-indigo-50/20 dark:from-gray-900 dark:via-purple-900/5 dark:to-indigo-900/10 relative overflow-hidden">
      {/* 背景圖案與裝飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 漂浮圓點 */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10 dark:bg-primary/5"
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              delay: i * 0.7,
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        ))}
        
        {/* 光暈效果 */}
        <motion.div 
          className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4] 
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* 移除熱門消息標記區塊 */}
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div 
              className="relative inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4 relative z-10">
                <span dangerouslySetInnerHTML={{ __html: t("latestNewsSection.title") }}></span>
                  <motion.div 
                    className="absolute bottom-1 left-0 h-3 w-full bg-primary/20 -z-10 rounded-sm"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  />
              </h2>
              
              {/* 手繪風格底線 */}
              <svg className="absolute -bottom-4 left-0 w-full h-4 overflow-visible">
                <motion.path 
                  d="M0,4 C40,15 80,-5 120,4 C160,15 200,-5 240,4 C280,15 320,-5 360,4"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.7 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
              </svg>
            </motion.div>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t("latestNewsSection.subtitle")}
            </motion.p>
          </motion.div>
        </div>
        
        {hasNews ? (
          // 有新聞時顯示新聞列表
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {latestNews.map((news, index) => (
            <motion.div
              key={news.slug}
              className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.3, ease: "easeOut" } 
              }}
            >
              {/* 顏色疊加層 */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              
                <Link href={`/${locale}/news/${news.slug}`} className="block">
                <div className="relative h-52 overflow-hidden">
                  {/* 輝光效果 */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-0 z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.6, scale: 1.05 }} 
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image 
                      src={news.frontmatter.image} 
                      alt={news.frontmatter.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="transition-all duration-700 ease-in-out"
                    />
                  </motion.div>
                  
                  <div className="absolute top-3 left-3 z-20">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    >
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-primary shadow-md border border-primary/20 flex items-center gap-1.5">
                        <FaNewspaper className="text-primary" size={12} />
                        {news.frontmatter.category}
                      </span>
                    </motion.div>
                  </div>
                </div>
              </Link>
              
              <div className="p-6 relative">
                {/* 右上角裝飾 */}
                <div className="absolute -top-3 right-4">
                  <motion.div
                    initial={{ rotate: 15, scale: 0 }}
                    whileInView={{ rotate: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <motion.path 
                        d="M12,2 L14,8 L20,10 L14,12 L12,18 L10,12 L4,10 L10,8 L12,2 Z" 
                        fill={index === 0 ? "#8B5CF6" : "#D8B4FE"}
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, delay: index }}
                      />
                    </svg>
                  </motion.div>
                </div>
                
                <div className="flex justify-between mb-3 text-xs text-gray-500 dark:text-gray-400">
                  <motion.div 
                    className="flex items-center"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <FaCalendar className="mr-1" />
                    <span>{new Date(news.frontmatter.date).toLocaleDateString(locale === 'en' ? 'en-US' : 'zh-TW', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center"
                    initial={{ x: 10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <FaUser className="mr-1" />
                    <span>{news.frontmatter.author}</span>
                  </motion.div>
                </div>
                
                  <Link href={`/${locale}/news/${news.slug}`} className="block">
                  <motion.h3 
                    className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300 line-clamp-2"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    {news.frontmatter.title}
                  </motion.h3>
                </Link>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4"
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  {news.content.split('\n\n')[1]}
                </motion.p>
                
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <Link 
                      href={`/${locale}/news/${news.slug}`} 
                    className="inline-flex items-center text-primary font-medium relative overflow-hidden group-hover:font-bold"
                  >
                    <span className="relative z-10">{t("latestNewsSection.readMore")}</span>
                    <span className="relative z-10 overflow-hidden">
                      <motion.span
                        className="inline-block ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
                      >
                        <FaArrowRight className="text-xs" />
                      </motion.span>
                    </span>
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 origin-left"
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        ) : (
          // 沒有新聞時顯示的"暫無最新消息"提示
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12 max-w-3xl mx-auto overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* 波浪背景裝飾 */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-primary/60 overflow-hidden">
              <motion.div 
                className="absolute inset-0 opacity-30"
                animate={{ 
                  background: [
                    "linear-gradient(90deg, transparent 0%, #fff 50%, transparent 100%)",
                    "linear-gradient(90deg, transparent 100%, #fff 50%, transparent 0%)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
              />
            </div>
            
            <div className="text-center">
              <motion.div 
                className="relative flex justify-center mb-6"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div 
                  className="text-primary text-5xl md:text-6xl opacity-90"
                  animate={floatAnimation}
                >
                  <FaInbox />
                </motion.div>
                <motion.div 
                  className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1.5 text-white text-xs"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <FaRss />
                </motion.div>
              </motion.div>
              
              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {t("latestNewsSection.noNews.title")}
              </motion.h3>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mb-8"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {t("latestNewsSection.noNews.description")}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link 
                  href="https://hackittw.notion.site/1f459188ed5280499052d8d3b813770c"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  <span className="mr-2">{t("latestNewsSection.noNews.notionLink")}</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
                  >
                    <FaArrowRight className="text-xs" />
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {hasNews && (
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Link 
              href={`/${locale}/news`}
            className="inline-block px-8 py-3 text-primary border-2 border-primary rounded-full relative overflow-hidden group hover:text-white transition-colors duration-500"
          >
            <motion.span 
              className="absolute inset-0 bg-primary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"
              style={{ zIndex: -1 }}
            />
            <span className="flex items-center">
              <span className="mr-2">{t("latestNewsSection.viewAllNews")}</span> 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
              >
                <FaArrowRight />
              </motion.span>
            </span>
          </Link>
        </motion.div>
        )}
      </div>
    </section>
  );
} 