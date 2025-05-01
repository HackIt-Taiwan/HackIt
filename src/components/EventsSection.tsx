"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaArrowRight } from "react-icons/fa";

// 模擬活動數據
const events = [
  {
    id: 1,
    title: "新手入門工作坊",
    date: "2023年12月10日",
    time: "14:00 - 17:00",
    location: "台北市信義區松高路1號",
    category: "工作坊",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2940&auto=format&fit=crop",
    spots: 20,
    spotsLeft: 8,
    description: "專為完全沒有程式基礎的新手設計的工作坊，從零開始學習編程基礎知識。",
  },
  {
    id: 2,
    title: "网頁開發大挑戰",
    date: "2023年12月16日",
    time: "09:00 - 18:00",
    location: "台北市大安區復興南路一段",
    category: "駭客松",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940&auto=format&fit=crop",
    spots: 50,
    spotsLeft: 15,
    description: "為期一天的網頁開發馬拉松，挑戰在限定時間內完成一個完整的網站專案。",
  },
  {
    id: 3,
    title: "AI應用開發講座",
    date: "2023年12月23日",
    time: "19:00 - 21:00",
    location: "線上活動",
    category: "講座",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2940&auto=format&fit=crop",
    spots: 100,
    spotsLeft: 42,
    description: "由AI領域專家帶來的前沿技術分享，探討人工智能在各領域的實際應用。",
  },
  {
    id: 4,
    title: "開源專案貢獻日",
    date: "2024年1月6日",
    time: "10:00 - 16:00",
    location: "台北市中山區南京東路三段",
    category: "實作",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2940&auto=format&fit=crop",
    spots: 30,
    spotsLeft: 12,
    description: "學習如何為開源專案做出貢獻，從提交第一個Pull Request開始，成為開源社區的一份子。",
  },
];

const EventsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full"
              initial="rest"
              whileHover="hover"
              variants={cardHoverVariants}
            >
              <div className="relative h-48 sm:h-40 md:h-48 lg:h-44 xl:h-48 overflow-hidden">
                <motion.div
                  className="w-full h-full absolute"
                  variants={bgVariants}
                >
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                </motion.div>
                <motion.div 
                  className="absolute top-4 left-4 bg-white dark:bg-gray-800 py-1 px-3 rounded-full text-sm font-medium text-primary shadow-sm"
                  initial={{ opacity: 0, scale: 0.8, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                >
                  {event.category}
                </motion.div>
              </div>
              
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 line-clamp-1 dark:text-white">{event.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm md:text-base line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 mb-5 md:mb-6">
                  <motion.div 
                    className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  >
                    <FaCalendar className="mr-2 text-primary flex-shrink-0" />
                    <span className="truncate">{event.date} {event.time}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  >
                    <FaMapMarkerAlt className="mr-2 text-primary flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center text-sm text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  >
                    <FaUsers className="mr-2 text-primary flex-shrink-0" />
                    <span>尚餘 {event.spotsLeft} 個名額</span>
                  </motion.div>
                </div>
                
                {/* 名額進度條 */}
                <div className="mb-5 md:mb-6">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${calculateSpotsPercentage(event.spots, event.spotsLeft)}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-500 dark:text-gray-400">已報名 {event.spots - event.spotsLeft} 人</span>
                    <span className="text-gray-500 dark:text-gray-400">總共 {event.spots} 人</span>
                  </div>
                </div>
                
                <Link 
                  href={`/events/${event.id}`} 
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