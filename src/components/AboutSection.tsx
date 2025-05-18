"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaLightbulb, FaUsers, FaRocket, FaChalkboardTeacher } from "react-icons/fa";
import { useI18n } from "@/i18n";

// 定義核心價值類型
type CoreValue = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const AboutSection: React.FC = () => {
  const { t } = useI18n();
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

  // 核心價值數據 - 現在將從 i18n 獲取
  const coreValues: CoreValue[] = [
    {
      icon: <FaLightbulb className="w-8 h-8 text-primary" />,
      title: t("aboutSection.coreValueInnovativeTitle"),
      description: t("aboutSection.coreValueInnovativeDescription")
    },
    {
      icon: <FaUsers className="w-8 h-8 text-primary" />,
      title: t("aboutSection.coreValueCommunityTitle"),
      description: t("aboutSection.coreValueCommunityDescription")
    },
    {
      icon: <FaRocket className="w-8 h-8 text-primary" />,
      title: t("aboutSection.coreValuePracticalTitle"),
      description: t("aboutSection.coreValuePracticalDescription")
    },
    {
      icon: <FaChalkboardTeacher className="w-8 h-8 text-primary" />,
      title: t("aboutSection.coreValueLifelongLearningTitle"),
      description: t("aboutSection.coreValueLifelongLearningDescription")
    }
  ];

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
            {t("aboutSection.aboutUs")}
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t("aboutSection.tagline", {
              highlight: (text: React.ReactNode) => (
                <motion.span 
                  className="text-primary"
                  initial={{ textShadow: "0 0 0 rgba(124, 58, 237, 0)" }}
                  animate={isInView ? { textShadow: "0 0 10px rgba(124, 58, 237, 0.3)" } : {}}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  {text}
                </motion.span>
              )
            })}
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            {t("aboutSection.introduction")}
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
                alt={t("aboutSection.hackItFoundersAlt")}
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
              {t("aboutSection.founderStoryTitle", {
                highlight: (text: React.ReactNode) => (
                  <motion.span 
                    className="text-primary"
                    initial={{ textShadow: "0 0 0 rgba(124, 58, 237, 0)" }}
                    animate={{ textShadow: "0 0 8px rgba(124, 58, 237, 0.3)" }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  >
                    {text}
                  </motion.span>
                )
              })}
            </motion.h3>
            <motion.p 
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t("aboutSection.founderStoryParagraph1")}
            </motion.p>
            <motion.p 
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {t("aboutSection.founderStoryParagraph2")}
            </motion.p>
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {t("aboutSection.founderStoryParagraph3")}
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
                {t("aboutSection.missionTitle")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("aboutSection.missionParagraph1")}
              </p>
              <p className="text-gray-600">
                {t("aboutSection.missionParagraph2")}
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
                {t("aboutSection.visionTitle")}
              </h3>
              <p className="text-gray-600 mb-4">
                {t("aboutSection.visionParagraph1")}
              </p>
              <p className="text-gray-600">
                {t("aboutSection.visionParagraph2")}
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
            {t("aboutSection.coreValuesTitle", {
              highlight: (text: React.ReactNode) => (
                <motion.span 
                  className="text-primary"
                  initial={{ textShadow: "0 0 0 rgba(124, 58, 237, 0)" }}
                  animate={{ textShadow: "0 0 8px rgba(124, 58, 237, 0.3)" }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  {text}
                </motion.span>
              )
            })}
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
            {t("aboutSection.ctaText")}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/about"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg shadow-sm hover:shadow-lg transition-colors"
            >
              {t("aboutSection.ctaButton")}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection; 