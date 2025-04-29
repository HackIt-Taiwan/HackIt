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
    image: "/images/events/workshop.jpg",
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
    image: "/images/events/hackathon.jpg",
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
    image: "/images/events/tech-talk.jpg",
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
    image: "/images/events/open-source.jpg",
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

  // 計算剩餘名額比例
  const calculateSpotsPercentage = (total: number, left: number) => {
    const taken = total - left;
    return (taken / total) * 100;
  };

  return (
    <section id="活動資訊" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            活動資訊
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            即將舉行的<span className="text-primary">精彩活動</span>
          </h2>
          <p className="text-lg text-gray-600">
            參加我們的工作坊、講座和駭客松，與志同道合的夥伴一起學習和成長
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {events.map((event) => (
            <motion.div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="relative h-48">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute top-4 left-4 bg-white py-1 px-3 rounded-full text-sm font-medium text-primary shadow-sm">
                  {event.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-1">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <FaCalendar className="mr-2 text-primary" />
                    <span>{event.date} {event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaMapMarkerAlt className="mr-2 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaUsers className="mr-2 text-primary" />
                    <span>尚餘 {event.spotsLeft} 個名額</span>
                  </div>
                </div>
                
                {/* 名額進度條 */}
                <div className="mb-6">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${calculateSpotsPercentage(event.spots, event.spotsLeft)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-500">已報名 {event.spots - event.spotsLeft} 人</span>
                    <span className="text-gray-500">總共 {event.spots} 人</span>
                  </div>
                </div>
                
                <Link 
                  href={`/events/${event.id}`} 
                  className="flex items-center justify-center py-2.5 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors group"
                >
                  <span>查看詳情</span>
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/events"
            className="inline-flex items-center text-primary font-medium hover:text-primary-dark group"
          >
            <span>查看所有活動</span>
            <FaArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection; 