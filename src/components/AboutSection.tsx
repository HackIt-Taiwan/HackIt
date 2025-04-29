"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaLightbulb, FaUsers, FaRocket, FaChalkboardTeacher } from "react-icons/fa";

// 定義核心價值類型
type CoreValue = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

// 核心價值數據
const coreValues: CoreValue[] = [
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
];

const AboutSection: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
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

  return (
    <section id="關於我們" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4" ref={sectionRef}>
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            關於我們
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            用<span className="text-primary">創新思維</span>啟發未來科技人才
          </h2>
          <p className="text-lg text-gray-600">
            HackIt是一個致力於透過編程教育賦能青少年，啟發他們成為未來科技創新者的社群平台
          </p>
        </motion.div>

        {/* 創始人故事 */}
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-12 mb-24"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="lg:w-1/2 relative"
            variants={itemVariants}
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl aspect-[4/3]">
              <Image
                src="/images/about/founder.jpg"
                alt="HackIt創辦人"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
            {/* 裝飾元素 */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/10 rounded-xl -z-10"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-xl -z-10"></div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold mb-6">
              我們的<span className="text-primary">創辦故事</span>
            </h3>
            <p className="text-gray-600 mb-6">
              HackIt創立於2020年，由一群熱愛科技教育的資深軟體工程師和教育工作者共同發起。在疫情帶來的遠距教學挑戰中，我們看見了數位教育的新機會，也發現傳統教育體系難以滿足現代科技人才的培育需求。
            </p>
            <p className="text-gray-600 mb-6">
              作為第一線的科技從業人員，我們深知實作經驗和創新思維對於未來工作者的重要性。因此，我們決定打造一個結合線上學習、實體工作坊和黑客松競賽的綜合平台，讓青少年能在寓教於樂的環境中接觸真實的科技專案開發。
            </p>
            <p className="text-gray-600">
              三年來，HackIt已經服務超過25,000名學生，舉辦了50多場線上及實體活動，並協助多位學員實現了自己的創新項目，甚至獲得國際級競賽的肯定。
            </p>
          </motion.div>
        </motion.div>

        {/* 使命與願景 */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-24 relative overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                  <span className="font-bold">M</span>
                </span>
                我們的使命
              </h3>
              <p className="text-gray-600 mb-4">
                我們致力於透過實用且創新的編程教育，啟發年輕人的技術潛能和創造力，培養他們成為未來的數位創新者和問題解決者。
              </p>
              <p className="text-gray-600">
                我們相信每個年輕人都應該有機會接觸編程技能，不論其背景或先前經驗。透過我們的平台，我們希望消除科技教育的障礙，讓更多人能夠參與數位未來的建設。
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                  <span className="font-bold">V</span>
                </span>
                我們的願景
              </h3>
              <p className="text-gray-600 mb-4">
                我們期望打造一個蓬勃發展的科技學習生態系統，在此生態系統中，創新思考被鼓勵，技術技能被賦能，社群合作被重視。
              </p>
              <p className="text-gray-600">
                我們希望成為台灣青少年科技教育的領導品牌，透過我們培育的人才，為社會創造正面影響，並協助台灣在全球數位經濟中保持競爭力。
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* 核心價值 */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h3 
            className="text-2xl font-bold text-center mb-12"
            variants={itemVariants}
          >
            我們的<span className="text-primary">核心價值</span>
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-center mb-3">{value.title}</h4>
                <p className="text-gray-600 text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-gray-600 mb-6">
            想了解更多關於我們的故事和團隊成員？
          </p>
          <Link
            href="/about"
            className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg shadow-sm transition-colors"
          >
            認識我們的團隊
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection; 