"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaGithub, FaDiscord } from "react-icons/fa";

const HeroSection: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "console.log('你好，駭客！')";
  const [typingIndex, setTypingIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    
    // Typing animation - only when section is in view
    if (isInView && typingIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prevText => prevText + fullText[typingIndex]);
        setTypingIndex(prevIndex => prevIndex + 1);
      }, Math.random() * 100 + 50);
      
      return () => {
        clearTimeout(timeout);
        window.removeEventListener("resize", handleResize);
      };
    }
    
    return () => window.removeEventListener("resize", handleResize);
  }, [typingIndex, fullText, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7 },
    },
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative bg-light overflow-hidden"
      style={{
        minHeight: windowHeight ? `${windowHeight}px` : '100vh',
        paddingTop: '120px',
      }}
    >
      {/* 背景元素 - 更有駭客風格 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* 背景網格 */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" 
            style={{
              backgroundImage: 'radial-gradient(circle, #252429 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        
        {/* 模擬程式碼行 */}
        <div className="absolute -left-4 top-1/4 transform -rotate-6 opacity-10">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex gap-2 text-xs font-mono my-1.5">
              <span className="text-muted">{i + 1}</span>
              <span className="text-primary">function</span>
              <span>createAwesome() {'{...}'}</span>
            </div>
          ))}
        </div>
        
        <div className="absolute right-0 bottom-1/3 transform rotate-6 opacity-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex gap-2 text-xs font-mono my-1.5">
              <span className="text-muted">{i + 20}</span>
              <span className="text-accent">if</span>
              <span>(isHacker) {'{...}'}</span>
            </div>
          ))}
        </div>
        
        {/* 裝飾元素 */}
        <motion.div
          className="absolute top-1/5 right-1/4 w-80 h-80 rounded-full bg-secondary/20 blur-3xl"
          animate={isInView ? { scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] } : {}}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
          animate={isInView ? { scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] } : {}}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-8 relative z-10 h-full flex flex-col justify-center py-24">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-28">
          {/* 左側文字內容 */}
          <motion.div
            className="md:w-1/2 md:pr-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-10">
              <div className="inline-flex items-center bg-dark px-5 py-3 rounded-lg text-light">
                <div className="mr-3 flex space-x-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-primary"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-accent"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-secondary"></div>
                </div>
                <code className="font-mono text-sm">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </code>
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight"
              variants={itemVariants}
            >
              由<span className="text-primary">青少年</span>打造的 
              <br /><span className="text-accent">創意</span>程式社群
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted mb-12 max-w-2xl leading-relaxed"
              variants={itemVariants}
            >
              我們在這裡一起創造、探索和分享程式的無限可能！發揮你的創意，用程式將想法變成現實，HackIt 是屬於所有創作者的地方。
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-6 mb-16"
              variants={itemVariants}
            >
              <Link
                href="#join"
                className="px-8 py-4 bg-primary text-white rounded-lg flex items-center font-medium hover:bg-primary/90 transition-colors text-lg"
              >
                加入社群
                <FaArrowRight className="ml-3" />
              </Link>
              
              <Link
                href="#projects"
                className="px-8 py-4 bg-light border-2 border-dark text-dark rounded-lg hover:bg-dark hover:text-light transition-colors font-medium flex items-center text-lg"
              >
                查看專案
                <FaGithub className="ml-3" />
              </Link>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-4 mt-10"
              variants={itemVariants}
            >
              <span className="text-base text-muted">我們有</span>
              <div className="px-4 py-2 bg-secondary/20 text-dark rounded-full font-mono">
                <span className="font-bold text-lg">1,337</span> 位駭客
              </div>
              <span className="text-base text-muted">共同創造</span>
              <div className="px-4 py-2 bg-accent/20 text-dark rounded-full font-mono">
                <span className="font-bold text-lg">∞</span> 種可能性
              </div>
            </motion.div>
          </motion.div>

          {/* 右側圖像/動畫 */}
          <motion.div 
            className="md:w-1/2 mt-16 md:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative rounded-lg overflow-hidden border-4 border-dark shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-10 bg-dark flex items-center px-4 z-10">
                <div className="flex space-x-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-primary"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-accent"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-secondary"></div>
                </div>
                <div className="text-sm font-mono text-white ml-4">terminal</div>
              </div>
              <div className="pt-12 bg-dark text-light p-6 font-mono text-base">
                <div className="mb-2">$ cd HackIt</div>
                <div className="mb-2">$ ls</div>
                <div className="text-secondary mb-3">projects/ events/ community/ tutorials/</div>
                <div className="mb-2">$ echo "Hello, World!"</div>
                <div className="text-light mb-3">Hello, World!</div>
                <div className="mb-2">$ npm run create</div>
                <div className="text-accent mb-2">Starting creativity engine...</div>
                <div className="text-primary mb-4">Welcome to HackIt! What will you create today?</div>
                <div className="flex mt-3">
                  <span>$</span>
                  <span className="ml-2 inline-block animate-pulse">|</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-14 gap-8">
              <motion.div 
                className="bg-accent/10 p-4 rounded-lg"
                whileHover={{ y: -8 }}
              >
                <div className="w-16 h-16 bg-accent/20 flex items-center justify-center rounded-md">
                  <span className="text-2xl font-bold">JS</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-primary/10 p-4 rounded-lg"
                whileHover={{ y: -8 }}
              >
                <div className="w-16 h-16 bg-primary/20 flex items-center justify-center rounded-md">
                  <span className="text-2xl font-bold">PY</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-secondary/10 p-4 rounded-lg"
                whileHover={{ y: -8 }}
              >
                <div className="w-16 h-16 bg-secondary/20 flex items-center justify-center rounded-md">
                  <span className="text-2xl font-bold">HW</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* 向下滾動指示器 */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ 
          delay: 1.8, 
          duration: 0.8,
          ease: "easeOut" 
        }}
      >
        <motion.span 
          className="text-sm font-mono text-primary mb-3 font-bold"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 2.1, 
            duration: 0.6,
            ease: "backOut" 
          }}
        >
          準備好了嗎？
        </motion.span>
        <motion.div 
          className="w-8 h-12 border-2 border-dark rounded-full flex justify-center overflow-hidden relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div 
            className="w-5 h-5 bg-primary rounded-full absolute"
            animate={{ 
              y: [0, 19, 0],
              scale: [0.4, 0.6, 0.4]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut"
            }}
          />
        </motion.div>
        <motion.div
          className="mt-4 text-xs font-mono text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.8, 1] }}
          transition={{ 
            delay: 2.3, 
            duration: 0.8,
            times: [0, 0.5, 0.75, 1]
          }}
        >
          點擊或滾動
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 