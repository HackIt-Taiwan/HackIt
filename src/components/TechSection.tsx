"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';

const techSkills = [
  { name: '創新思維', level: 90 },
  { name: '程式設計', level: 85 },
  { name: '團隊合作', level: 95 },
  { name: '解決問題', level: 88 },
  { name: '活動策劃', level: 92 },
];

const TechSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
            transition={{ duration: 0.5 }}
          >
            我們重視的<span className="gradient-text">能力</span>
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-indigo-600 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={controls}
            variants={{
              visible: { width: 80 },
              hidden: { width: 0 }
            }}
            transition={{ duration: 0.6 }}
          ></motion.div>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 }
            }}
            transition={{ duration: 0.7 }}
          >
            在HackIt，我們培養青少年多方面的能力，讓他們在科技領域中脫穎而出，成為未來的創新者和領導者。
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            {techSkills.map((skill, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-700">{skill.name}</span>
                  <span className="text-indigo-600 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={controls}
                    variants={{
                      visible: { width: `${skill.level}%` },
                      hidden: { width: 0 }
                    }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>

          <motion.div
            className="grid grid-cols-2 gap-4"
            initial="hidden"
            animate={controls}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              },
              hidden: {}
            }}
          >
            {[
              { icon: '💡', title: '創意發想', desc: '激發學生天馬行空的想法' },
              { icon: '🚀', title: '專案實作', desc: '從零到一的實際開發經驗' },
              { icon: '🤝', title: '團隊協作', desc: '學習跨領域交流與合作' },
              { icon: '🏆', title: '成就展示', desc: '展現成果並獲得回饋' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-5 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                variants={{
                  visible: { opacity: 1, y: 0, scale: 1 },
                  hidden: { opacity: 0, y: 20, scale: 0.9 }
                }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-16 p-8 bg-indigo-600 rounded-xl text-white text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0.9 }
          }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-3">準備好迎接挑戰了嗎？</h3>
          <p className="mb-6">加入HackIt，與其他熱愛科技的青少年一起成長！</p>
          <motion.button
            className="px-6 py-2 bg-white text-indigo-600 font-semibold rounded-md hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            立即報名
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TechSection; 