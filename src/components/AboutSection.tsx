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

  const imageHoverVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const decorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        delay: 0.3
      }
    }
  };

  return (
    <section id="關於我們" className="py-20 md:py-28 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* 背景裝飾 */}
      <motion.div 
        className="absolute top-[10%] right-[5%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-primary/3 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.5,
          x: [0, 20, 0],
          y: [0, -30, 0]
        }}
        transition={{ 
          opacity: { duration: 1 },
          x: { repeat: Infinity, duration: 15, ease: "easeInOut" },
          y: { repeat: Infinity, duration: 20, ease: "easeInOut" }
        }}
      />
      <motion.div 
        className="absolute bottom-[10%] left-[5%] w-[25vw] h-[25vw] max-w-[400px] max-h-[400px] bg-blue-500/3 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.5,
          x: [0, -20, 0],
          y: [0, 20, 0]
        }}
        transition={{ 
          opacity: { duration: 1 },
          x: { repeat: Infinity, duration: 18, ease: "easeInOut" },
          y: { repeat: Infinity, duration: 24, ease: "easeInOut" }
        }}
      />

      <div className="container mx-auto px-4 md:px-6" ref={sectionRef}>
        <motion.div 
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
            關於我們
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            用<motion.span 
              className="text-primary"
              initial={{ textShadow: "0 0 0 rgba(124, 58, 237, 0)" }}
              animate={isInView ? { textShadow: "0 0 10px rgba(124, 58, 237, 0.3)" } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >創新思維</motion.span>啟發未來科技人才
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            HackIt是一個致力於透過編程教育賦能青少年，啟發他們成為未來科技創新者的社群平台
          </p>
        </motion.div>

        {/* 創始人故事 */}
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-12 md:gap-16 lg:gap-24 mb-24 md:mb-32"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="lg:w-1/2 relative w-full max-w-2xl mx-auto lg:mx-0"
            variants={itemVariants}
          >
            <motion.div 
              className="relative rounded-xl overflow-hidden shadow-xl aspect-[4/3]"
              whileHover="hover"
              initial="rest"
              variants={imageHoverVariants}
            >
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop"
                alt="HackIt創辦人"
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 40vw"
                style={{ objectFit: "cover" }}
                className="transition-transform duration-500"
              />
            </motion.div>
            {/* 裝飾元素 - 增強動畫 */}
            <motion.div 
              className="absolute -bottom-6 -left-6 w-16 h-16 md:w-24 md:h-24 bg-primary/10 rounded-xl -z-10"
              variants={decorVariants}
              animate={{ 
                x: [0, -5, 0],
                y: [0, 5, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                x: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                y: { repeat: Infinity, duration: 7, ease: "easeInOut" },
                rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" },
              }}
            />
            <motion.div 
              className="absolute -top-6 -right-6 w-16 h-16 md:w-24 md:h-24 bg-primary/10 rounded-xl -z-10"
              variants={decorVariants}
              animate={{ 
                x: [0, 5, 0],
                y: [0, -5, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                x: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" },
              }}
            />
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-2xl md:text-3xl font-bold mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              我們的<motion.span 
                className="text-primary"
                initial={{ textShadow: "0 0 0 rgba(124, 58, 237, 0)" }}
                animate={{ textShadow: "0 0 8px rgba(124, 58, 237, 0.3)" }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >創辦故事</motion.span>
            </motion.h3>
            <motion.p 
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              HackIt創立於2020年，由一群熱愛科技教育的資深軟體工程師和教育工作者共同發起。在疫情帶來的遠距教學挑戰中，我們看見了數位教育的新機會，也發現傳統教育體系難以滿足現代科技人才的培育需求。
            </motion.p>
            <motion.p 
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              作為第一線的科技從業人員，我們深知實作經驗和創新思維對於未來工作者的重要性。因此，我們決定打造一個結合線上學習、實體工作坊和黑客松競賽的綜合平台，讓青少年能在寓教於樂的環境中接觸真實的科技專案開發。
            </motion.p>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              三年來，HackIt已經服務超過25,000名學生，舉辦了50多場線上及實體活動，並協助多位學員實現了自己的創新項目，甚至獲得國際級競賽的肯定。
            </motion.p>
          </motion.div>
        </motion.div>

        {/* 使命與願景 */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 md:p-12 mb-24 md:mb-32 relative overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-primary/5 rounded-full transform translate-x-1/2 -translate-y-1/2"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              scale: { repeat: Infinity, duration: 8, ease: "easeInOut" },
              rotate: { repeat: Infinity, duration: 12, ease: "easeInOut" }
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-primary/5 rounded-full transform -translate-x-1/2 translate-y-1/2"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -8, 0]
            }}
            transition={{ 
              scale: { repeat: Infinity, duration: 10, ease: "easeInOut" },
              rotate: { repeat: Infinity, duration: 9, ease: "easeInOut" }
            }}
          />
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 relative z-10">
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
                <motion.span 
                  className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3"
                  animate={{ 
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    scale: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                  }}
                >
                  <span className="font-bold">M</span>
                </motion.span>
                我們的使命
              </h3>
              <p className="text-gray-600 mb-4">
                我們致力於透過實用且創新的編程教育，啟發年輕人的技術潛能和創造力，培養他們成為未來的數位創新者和問題解決者。
              </p>
              <p className="text-gray-600">
                我們相信每個年輕人都應該有機會接觸編程技能，不論其背景或先前經驗。透過我們的平台，我們希望消除科技教育的障礙，讓更多人能夠參與數位未來的建設。
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
                <motion.span 
                  className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3"
                  animate={{ 
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    scale: { repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }
                  }}
                >
                  <span className="font-bold">V</span>
                </motion.span>
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
          className="mb-16 md:mb-24"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-center mb-12"
            variants={itemVariants}
          >
            我們的<motion.span 
              className="text-primary"
              initial={{ textShadow: "0 0 0 rgba(124, 58, 237, 0)" }}
              animate={{ textShadow: "0 0 8px rgba(124, 58, 237, 0.3)" }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >核心價值</motion.span>
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    scale: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: index * 0.2 },
                    rotate: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: index * 0.2 }
                  }}
                >
                  {value.icon}
                </motion.div>
                <h4 className="text-xl font-bold text-center mb-3">{value.title}</h4>
                <p className="text-gray-600 text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-gray-600 mb-6">
            想了解更多關於我們的故事和團隊成員？
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/about"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg shadow-sm hover:shadow-lg transition-colors"
            >
              認識我們的團隊
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection; 