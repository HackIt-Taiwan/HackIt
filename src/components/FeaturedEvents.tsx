"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendar, FaMapMarkerAlt, FaArrowRight, FaRegLightbulb, FaRegCompass, FaStar, FaPaperclip, FaThumbtack } from 'react-icons/fa';

// 大型精選活動的資料
const featuredEvents = [
  {
    id: 1,
    title: "HackIT 2024 年度黑客松",
    date: "2024年7月15-17日",
    location: "台北創新實驗室",
    description: "一年一度最大規模的青少年程式競賽，為期三天的密集開發挑戰，打造解決真實問題的創新專案。",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
    color: "indigo",
    emoji: "🚀",
    link: "/events/hackathon-2024"
  },
  {
    id: 2,
    title: "未來科技體驗營",
    date: "2024年8月5-9日",
    location: "台中高中國際會議廳",
    description: "專為13-18歲青少年設計的五天四夜科技體驗營，涵蓋AI、機器人、區塊鏈等前沿技術的實作工作坊。",
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=2069&auto=format&fit=crop",
    color: "purple",
    emoji: "🔮",
    link: "/events/tech-camp-2024"
  }
];

// 筆記紙背景效果
const notePaperBg = {
  background: "linear-gradient(to bottom, white 29px, #f0f0f0 1px)",
  backgroundSize: "100% 30px",
};

// 手繪效果 SVG 路徑
const randomSquiggle = () => {
  const start = Math.random() * 20;
  return `M${start},10 
    Q${start + 10},${5 + Math.random() * 10} ${start + 20},10 
    T${start + 40},10 
    T${start + 60},10 
    T${start + 80},10`;
};

const FeaturedEvents: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100 rounded-full blur-3xl"></div>
        
        {/* 可愛的波浪和線條 */}
        <svg width="100%" height="100%" className="absolute top-0 left-0">
          <motion.path 
            d={randomSquiggle()}
            stroke="#6366F1" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.path 
            d={randomSquiggle()} 
            stroke="#8B5CF6" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 2, delay: 1 }}
            style={{ transform: "translateY(50px)" }}
          />
        </svg>
        
        {/* 手繪星星 */}
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute text-yellow-400" 
            style={{ 
              top: `${20 + i * 15}%`, 
              left: `${10 + i * 20}%`,
              fontSize: `${20 + i * 5}px`,
              opacity: 0.2
            }}
            animate={{ 
              rotate: [0, 20, -20, 0],
              scale: [1, 1.2, 0.9, 1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              delay: i * 0.7 
            }}
          >
            <FaStar />
          </motion.div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          {/* 手繪風的標籤 */}
          <motion.div
            className="inline-block mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="px-5 py-3 bg-white border-2 border-dashed border-indigo-300 rounded-lg inline-flex items-center gap-2 shadow-sm transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <motion.div
                animate={{ 
                  rotate: [-10, 10, -10],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <FaRegLightbulb className="text-indigo-500 text-lg" />
              </motion.div>
              <span className="text-indigo-700 font-bold text-base">不能錯過的活動</span>
            </div>
          </motion.div>
          
          {/* 手繪風標題 */}
          <div className="relative inline-block">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-2 text-gray-800 relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              精彩<span className="text-indigo-600">活動</span>
            </motion.h2>
            
            {/* 手繪風格底線 */}
            <svg className="absolute left-0 bottom-0 w-full" height="15" viewBox="0 0 300 15" preserveAspectRatio="none">
              <motion.path 
                d="M0,10 C50,2 100,12 150,10 C200,8 250,13 300,10" 
                stroke="#8B5CF6"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 1.0, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </svg>
            
            {/* 裝飾星星 */}
            <svg className="absolute -right-14 -top-6 w-12 h-12" viewBox="0 0 50 50">
              <motion.path 
                d="M25,2 L30,20 L48,25 L30,30 L25,48 L20,30 L2,25 L20,20 L25,2 Z" 
                fill="#FDE68A"
                stroke="#F59E0B"
                strokeWidth="1"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 15 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                viewport={{ once: true }}
              />
            </svg>
          </div>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            來參加這些超酷的大型活動，認識志同道合的朋友，一起創造難忘的回憶！
          </motion.p>
        </div>
        
        <div className="space-y-28">
          {featuredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              viewport={{ once: true }}
            >
              {/* 完全重新設計的卡片 - 類似剪貼簿風格 */}
              <motion.div 
                className="relative max-w-5xl mx-auto"
                whileHover={{ rotate: index % 2 === 0 ? 1 : -1 }}
                transition={{ duration: 0.4 }}
              >
                {/* 底層板子 */}
                <div className="absolute inset-0 bg-amber-50 rounded-xl shadow-lg transform rotate-1 -z-10"></div>
                
                {/* 主要內容卡片 - 筆記紙風格 */}
                <div className="bg-white rounded-xl p-1 shadow-md overflow-hidden transform rotate-0">
                  <div className="grid md:grid-cols-2 h-full rounded-lg overflow-hidden">
                    {/* 左側圖片區域 */}
                    <div className="relative h-[300px] md:h-full overflow-hidden">
                      {/* 照片角落 */}
                      <div className="absolute top-0 left-0 w-0 h-0 border-t-[30px] border-l-[30px] border-white z-10"></div>
                      <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-r-[30px] border-white z-10"></div>
                      <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[30px] border-l-[30px] border-white z-10"></div>
                      <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[30px] border-r-[30px] border-white z-10"></div>
                      
                      {/* 圖片 */}
                      <Image 
                        src={event.image} 
                        alt={event.title} 
                        fill 
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-700"
                      />
                      
                      {/* 圖片上的貼紙 */}
                      <motion.div
                        className="absolute top-6 right-6 z-30 bg-yellow-300 px-3 py-2 rounded-lg shadow-md transform -rotate-6 text-gray-800 font-bold border-2 border-yellow-400"
                        whileHover={{ rotate: 0, scale: 1.05 }}
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                      >
                        {event.emoji} 超炫活動
                      </motion.div>
                      
                      {/* 迴紋針裝飾 */}
                      <div className="absolute -top-2 left-8 z-30 text-blue-400 text-2xl transform rotate-12">
                        <FaPaperclip />
                      </div>
                      
                      {/* 熱門標籤 */}
                      <div className="absolute bottom-6 left-6 z-20">
                        <motion.div 
                          className="px-3 py-1 bg-red-100 text-red-800 font-bold rounded-lg transform -rotate-2 border border-red-200 flex items-center gap-1 text-sm shadow-sm"
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.6, duration: 0.4 }}
                          viewport={{ once: true }}
                          whileHover={{ rotate: 2, y: -3 }}
                        >
                          <FaRegCompass className="text-red-500" />
                          <span>熱門活動</span>
                        </motion.div>
                      </div>
                    </div>
                    
                    {/* 右側內容區域 - 筆記紙風格 */}
                    <div className="p-6 md:p-8 flex flex-col" style={notePaperBg}>
                      {/* 標題區域 */}
                      <div className="relative mb-2">
                        {/* 圖釘裝飾 */}
                        <div className="absolute -top-6 right-2 text-gray-400 text-xl z-10">
                          <FaThumbtack />
                        </div>
                        
                        <motion.h3 
                          className="text-2xl md:text-3xl font-bold mb-1 text-indigo-700"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                          viewport={{ once: true }}
                        >
                          {event.title}
                        </motion.h3>
                        
                        {/* 手繪底線 */}
                        <svg width="100%" height="8" viewBox="0 0 200 8">
                          <motion.path 
                            d="M0,4 C40,1 80,7 120,4 C160,1 200,7 240,4" 
                            stroke="#818CF8" 
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                          />
                        </svg>
                      </div>
                      
                      {/* 裝飾標記 */}
                      <div className="absolute right-6 md:right-8 top-6 md:top-8">
                        <motion.div
                          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-pink-100 text-pink-600 font-mono text-xs md:text-sm font-bold border border-pink-200 transform rotate-6 shadow-sm"
                          whileHover={{ rotate: -6, scale: 1.1 }}
                        >
                          {index === 0 ? '7月' : '8月'}
                        </motion.div>
                      </div>
                      
                      {/* 內容描述 */}
                      <motion.p 
                        className="text-gray-700 mb-6 font-medium relative"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        {event.description}
                      </motion.p>
                      
                      {/* 時間地點 */}
                      <div className="space-y-3 mb-8 font-mono text-sm">
                        <motion.div 
                          className="flex items-center text-gray-700"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                            <FaCalendar className="text-amber-600" />
                          </div>
                          <span>{event.date}</span>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-center text-gray-700"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5, duration: 0.6 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                            <FaMapMarkerAlt className="text-teal-600" />
                          </div>
                          <span>{event.location}</span>
                        </motion.div>
                      </div>
                      
                      {/* 底部按鈕 */}
                      <div className="mt-auto">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6, duration: 0.4 }}
                          viewport={{ once: true }}
                          className="relative"
                        >
                          <Link
                            href={event.link}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold group w-full justify-center md:w-auto"
                          >
                            <span>了解更多</span> 
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ 
                                repeat: Infinity, 
                                repeatType: "loop", 
                                duration: 1.5, 
                                repeatDelay: 1
                              }}
                            >
                              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </motion.div>
                          </Link>
                          
                          {/* 手繪強調線 */}
                          <svg className="absolute -bottom-4 left-0 w-full" height="6" viewBox="0 0 100 6">
                            <motion.path 
                              d="M0,3 C20,1 40,5 60,3 C80,1 100,5 120,3" 
                              stroke="#6366F1" 
                              strokeWidth="2"
                              strokeLinecap="round"
                              fill="none"
                              initial={{ pathLength: 0, opacity: 0 }}
                              whileInView={{ pathLength: 1, opacity: 1 }}
                              transition={{ duration: 0.6, delay: 0.7 }}
                              viewport={{ once: true }}
                            />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 紙膠帶裝飾 */}
                <div className={`absolute ${index % 2 === 0 ? '-top-3 -left-3' : '-top-3 -right-3'} w-20 h-6 bg-indigo-300/70 transform ${index % 2 === 0 ? 'rotate-12' : '-rotate-12'} z-10`}></div>
                <div className={`absolute ${index % 2 === 0 ? '-bottom-3 -right-3' : '-bottom-3 -left-3'} w-20 h-6 bg-pink-300/70 transform ${index % 2 === 0 ? '-rotate-12' : 'rotate-12'} z-10`}></div>
                
                {/* 便利貼效果 */}
                <div className={`absolute ${index % 2 === 0 ? '-bottom-10 left-10' : '-bottom-10 right-10'} transform ${index % 2 === 0 ? 'rotate-6' : '-rotate-6'} bg-yellow-200 w-24 h-24 shadow-sm z-10 flex items-center justify-center text-center p-2`}
                  style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)" }}
                >
                  <div>
                    <div className="text-sm font-bold">日期</div>
                    <div className="text-lg font-mono font-bold text-indigo-700">
                      {index === 0 ? '7/15-17' : '8/5-9'}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        {/* 底部裝飾動畫 */}
        <motion.div
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent mt-24 relative"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-indigo-400 rounded-full"
            animate={{ 
              x: [-300, 300, -300],
              transition: { 
                repeat: Infinity, 
                repeatType: "mirror", 
                duration: 8,
                ease: "easeInOut" 
              }
            }}
          />
        </motion.div>
        
        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/events" className="inline-flex items-center text-indigo-600 font-medium text-lg hover:text-indigo-800">
              <span>查看所有活動</span>
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents; 