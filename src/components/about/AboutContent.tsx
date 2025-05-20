"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { FaLightbulb, FaUsers, FaRocket, FaChalkboardTeacher } from 'react-icons/fa';

interface AboutContentProps {
  locale: string;
}

export default function AboutContent({ locale }: AboutContentProps) {
  const { t } = useI18n();
  
  // 參考各個區塊，用於檢測滾動到視圖
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  
  // 檢測各區塊是否在視圖中
  const isHeroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const isStoryInView = useInView(storyRef, { once: false, amount: 0.3 });
  const isValuesInView = useInView(valuesRef, { once: false, amount: 0.2 });
  
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

  return (
    <>
      {/* 頁面標題區塊 */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
      >
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
              animate={{ width: "5rem", opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t("aboutSection.introduction")}
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* 創辦故事區塊 */}
      <section
        ref={storyRef}
        className="py-20 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial="hidden"
              animate={isStoryInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="flex flex-col md:flex-row items-center gap-10 md:gap-14"
            >
              <motion.div 
                variants={itemVariants}
                className="md:w-1/2 relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1469&auto=format&fit=crop"
                    alt={t("aboutSection.hackItFoundersAlt") as string}
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="md:w-1/2"
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                  {t("aboutSection.founderStoryTitle", {
                    highlight: (text) => (
                      <span className="text-primary">{text}</span>
                    )
                  })}
                </h2>
                
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>{t("aboutSection.founderStoryParagraph1")}</p>
                  <p>{t("aboutSection.founderStoryParagraph2")}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* 核心價值區塊 */}
      <section
        ref={valuesRef}
        className="py-20 bg-gray-50 dark:bg-gray-800"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              initial="hidden"
              animate={isValuesInView ? "visible" : "hidden"}
              variants={containerVariants}
              className="text-center mb-14"
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold mb-5 text-gray-800 dark:text-white"
              >
                {t("aboutSection.coreValuesTitle", {
                  highlight: (text) => (
                    <span className="text-primary">{text}</span>
                  )
                })}
              </motion.h2>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={isValuesInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <motion.div 
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-primary mb-4 text-4xl">
                  <FaLightbulb />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                  {t("aboutSection.coreValueInnovativeTitle")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("aboutSection.coreValueInnovativeDescription")}
                </p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-primary mb-4 text-4xl">
                  <FaUsers />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                  {t("aboutSection.coreValueCommunityTitle")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("aboutSection.coreValueCommunityDescription")}
                </p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-primary mb-4 text-4xl">
                  <FaRocket />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                  {t("aboutSection.coreValuePracticalTitle")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("aboutSection.coreValuePracticalDescription")}
                </p>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-primary mb-4 text-4xl">
                  <FaChalkboardTeacher />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                  {t("aboutSection.coreValueLifelongLearningTitle")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("aboutSection.coreValueLifelongLearningDescription")}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
} 