"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaRocket, FaCode, FaLaptopCode } from 'react-icons/fa';

const CTASection = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating code snippets */}
        {isMounted && [...Array(15)].map((_, i) => {
          // Use deterministic positions based on index
          const leftPos = ((i * 7) % 100).toFixed(0);
          const topPos = ((i * 11) % 100).toFixed(0);
          const fontSize = (8 + (i % 7)).toFixed(0);
          const duration = 15 + (i % 10);
          const delay = i % 5;
          
          return (
            <motion.div
              key={i}
              className="absolute text-white text-opacity-10 font-mono whitespace-nowrap"
              style={{
                left: `${leftPos}%`,
                top: `${topPos}%`,
                fontSize: `${fontSize}px`,
              }}
              initial={{ opacity: 0.1, y: 0 }}
              animate={{ 
                opacity: [0.1, 0.2, 0.1],
                y: [0, -30, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: duration,
                delay: delay,
                repeatType: "loop"
              }}
            >
              {i % 2 === 0 ? '<HackIntoIt className="future" />' : 
               i % 3 === 0 ? 'function createFuture() { return innovation; }' : 
               'const youCanHackIt = true;'}
            </motion.div>
          );
        })}

        {/* Colorful shapes */}
        <motion.div 
          className="absolute top-0 left-0 w-64 h-64 bg-yellow-300 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            scale: [1, 1.2, 1],
            x: ['-50%', '-30%', '-50%']
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "loop" 
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full opacity-20 translate-x-1/2 translate-y-1/2"
          animate={{ 
            scale: [1, 1.3, 1],
            y: ['50%', '30%', '50%']
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity,
            repeatType: "loop" 
          }}
        />
      </div>
      
      <div className="relative container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <motion.div 
              className="inline-block"
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "loop" }}
            >
              <FaRocket className="inline-block text-5xl text-yellow-300 mr-2" />
            </motion.div>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            準備好了嗎？
          </motion.h2>
          
          <motion.div
            className="relative mb-6 p-3 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* 程式碼風格的打字動畫 - 適合暗色背景 */}
            <div className="font-mono flex items-center text-2xl md:text-3xl relative">
              <motion.span
                className="absolute -left-5 top-1/2 -translate-y-1/2 w-3 h-6 bg-yellow-300"
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                  repeatType: "loop"
                }}
              />
              
              <motion.span 
                className="text-green-400 mr-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.2 }}
                viewport={{ once: true }}
              >
                &gt;
              </motion.span>
              
              <motion.div className="flex">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "auto" }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.5,
                    ease: "easeInOut",
                  }}
                  className="overflow-hidden flex"
                  viewport={{ once: true }}
                >
                  <motion.span
                    className="text-yellow-300 font-bold whitespace-nowrap"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ 
                      x: 0, 
                      opacity: 1,
                    }}
                    transition={{ 
                      delay: 0.5, 
                      duration: 0.3 
                    }}
                    viewport={{ once: true }}
                  >
                    Hack
                  </motion.span>
                </motion.div>
                
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "auto" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.3,
                    ease: "easeInOut",
                  }}
                  className="overflow-hidden flex"
                  viewport={{ once: true }}
                >
                  <motion.span
                    className="text-white opacity-90 font-medium whitespace-nowrap mx-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    into
                  </motion.span>
                </motion.div>
                
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "auto" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 1.8,
                    ease: "easeInOut",
                  }}
                  className="overflow-hidden flex"
                  viewport={{ once: true }}
                >
                  <motion.span
                    className="text-yellow-300 font-bold whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    It
                  </motion.span>
                </motion.div>
                
                <motion.span
                  className="text-cyan-300 font-bold"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                  }}
                  animate={{ 
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ 
                    opacity: { delay: 2.3, duration: 0.2 },
                    scale: { 
                      duration: 0.4,
                      repeat: Infinity,
                      repeatDelay: 3,
                      repeatType: "loop",
                    }
                  }}
                  viewport={{ once: true }}
                >
                  !
                </motion.span>
              </motion.div>
            </div>
            
            {/* 輸入後的閃爍效果 */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-green-400"
              initial={{ width: "0%" }}
              whileInView={{ width: "0%" }}
              animate={{ 
                width: ["0%", "100%", "0%"],
              }}
              transition={{ 
                duration: 1.5,
                times: [0, 0.7, 1],
                repeat: Infinity,
                repeatDelay: 5,
                repeatType: "loop"
              }}
              viewport={{ once: true }}
            />
            
            {/* 程式碼風格的背景元素 */}
            <motion.div
              className="absolute inset-0 -z-10 bg-indigo-900/30 rounded-md border border-indigo-700"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            />
            
            {/* 浮動的程式碼符號 */}
            {isMounted && [...Array(8)].map((_, i) => {
              const symbols = ["{", "}", "<", ">", "/", "*", "#", "="];
              const char = symbols[i % symbols.length];
              const topPos = (i * 12.5).toFixed(0);
              const leftPos = (i * 12.5).toFixed(0);
              
              return (
                <motion.span
                  key={i}
                  className="absolute text-white text-opacity-20 font-mono pointer-events-none"
                  style={{
                    top: `${topPos}%`,
                    left: `${leftPos}%`,
                    fontSize: `${10 + i}px`,
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  animate={{ 
                    opacity: [0, 0.7, 0],
                    y: [0, -20],
                    rotate: i * 5 - 20
                  }}
                  transition={{ 
                    opacity: { delay: 2.5 + i * 0.2, duration: 0.2 },
                    y: { 
                      delay: 2.5 + i * 0.2, 
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: i,
                      repeatType: "loop"
                    },
                    rotate: { 
                      delay: 2.5 + i * 0.2, 
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: i,
                      repeatType: "loop"
                    }
                  }}
                  viewport={{ once: true }}
                >
                  {char}
                </motion.span>
              );
            })}
          </motion.div>
          
          <motion.p 
            className="text-lg text-white mb-10 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            加入我們充滿創意和活力的科技社群，一起探索、學習、創造和成長！
            不管你是初學者還是有經驗的開發者，這裡都有屬於你的位置。
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-5 w-full justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href="/signup" className="flex-1 sm:flex-initial">
              <motion.button 
                className="w-full sm:w-auto bg-white text-purple-700 font-bold py-4 px-8 rounded-xl transition duration-300 shadow-lg flex items-center justify-center gap-2"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "#FEFEFE",
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FaCode className="text-xl" />
                <span>立即加入</span>
              </motion.button>
            </Link>
            <Link href="/contact" className="flex-1 sm:flex-initial">
              <motion.button 
                className="w-full sm:w-auto bg-transparent text-white font-bold py-4 px-8 rounded-xl border-2 border-white transition duration-300 flex items-center justify-center gap-2"
                whileHover={{ 
                  scale: 1.05, 
                  borderColor: "#FEFEFE",
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FaLaptopCode className="text-xl" />
                <span>聯絡我們</span>
              </motion.button>
            </Link>
          </motion.div>
          
          <motion.p 
            className="text-white opacity-80 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            不需要任何承諾！今天就加入我們的社群吧！
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 