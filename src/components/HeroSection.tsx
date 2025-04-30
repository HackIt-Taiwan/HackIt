"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaGithub, FaDiscord } from "react-icons/fa";

const HeroSection: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "console.log('你好，駭客！')";
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    
    // Typing animation
    if (typingIndex < fullText.length) {
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
  }, [typingIndex, fullText]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="home"
      className="relative bg-light overflow-hidden"
      style={{
        minHeight: windowHeight ? `${windowHeight}px` : '100vh',
        paddingTop: '80px',
      }}
    >
      {/* 背景元素 - 更有駭客風格 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* 背景網格 */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" 
            style={{
              backgroundImage: 'radial-gradient(circle, #252429 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}
          />
        </div>
        
        {/* 模擬程式碼行 */}
        <div className="absolute -left-4 top-1/4 transform -rotate-6 opacity-10">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex gap-2 text-xs font-mono my-1">
              <span className="text-muted">{i + 1}</span>
              <span className="text-primary">function</span>
              <span>createAwesome() {'{...}'}</span>
            </div>
          ))}
        </div>
        
        <div className="absolute right-0 bottom-1/3 transform rotate-6 opacity-10">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex gap-2 text-xs font-mono my-1">
              <span className="text-muted">{i + 20}</span>
              <span className="text-accent">if</span>
              <span>(isHacker) {'{...}'}</span>
            </div>
          ))}
        </div>
        
        {/* 裝飾元素 */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-secondary/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-primary/20 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center py-16">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* 左側文字內容 */}
          <motion.div
            className="md:w-1/2 md:pr-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center mb-6 bg-dark px-4 py-2 rounded-lg text-light">
                <div className="mr-2 flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                </div>
                <code className="font-mono text-sm">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </code>
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
              variants={itemVariants}
            >
              由<span className="text-primary">青少年</span>打造的 
              <br /><span className="text-accent">創意</span>程式社群
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted mb-8 max-w-2xl"
              variants={itemVariants}
            >
              我們在這裡一起創造、探索和分享程式的無限可能！發揮你的創意，用程式將想法變成現實，HackIt 是屬於所有創作者的地方。
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <Link
                href="#join"
                className="px-6 py-3 bg-primary text-white rounded-lg flex items-center font-medium hover:bg-primary/90 transition-colors"
              >
                加入社群
                <FaArrowRight className="ml-2" />
              </Link>
              
              <Link
                href="#projects"
                className="px-6 py-3 bg-light border-2 border-dark text-dark rounded-lg hover:bg-dark hover:text-light transition-colors font-medium flex items-center"
              >
                查看專案
                <FaGithub className="ml-2" />
              </Link>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 mt-8"
              variants={itemVariants}
            >
              <span className="text-sm text-muted">我們有</span>
              <div className="px-3 py-1 bg-secondary/20 text-dark rounded-full font-mono">
                <span className="font-bold">1,337</span> 位駭客
              </div>
              <span className="text-sm text-muted">共同創造</span>
              <div className="px-3 py-1 bg-accent/20 text-dark rounded-full font-mono">
                <span className="font-bold">∞</span> 種可能性
              </div>
            </motion.div>
          </motion.div>

          {/* 右側圖像/動畫 */}
          <motion.div 
            className="md:w-1/2 mt-8 md:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative rounded-lg overflow-hidden border-4 border-dark shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-8 bg-dark flex items-center px-3 z-10">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <div className="w-3 h-3 rounded-full bg-accent"></div>
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                </div>
                <div className="text-xs font-mono text-white ml-3">terminal</div>
              </div>
              <div className="pt-8 bg-dark text-light p-4 font-mono text-sm">
                <div>$ cd HackIt</div>
                <div>$ ls</div>
                <div className="text-secondary">projects/ events/ community/ tutorials/</div>
                <div>$ echo "Hello, World!"</div>
                <div className="text-light mb-2">Hello, World!</div>
                <div>$ npm run create</div>
                <div className="text-accent">Starting creativity engine...</div>
                <div className="text-primary">Welcome to HackIt! What will you create today?</div>
                <div className="flex mt-2">
                  <span>$</span>
                  <span className="ml-2 inline-block animate-pulse">|</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 gap-4">
              <motion.div 
                className="bg-accent/10 p-3 rounded-lg"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-accent/20 flex items-center justify-center rounded-md">
                  <span className="text-xl font-bold">JS</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-primary/10 p-3 rounded-lg"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-primary/20 flex items-center justify-center rounded-md">
                  <span className="text-xl font-bold">PY</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-secondary/10 p-3 rounded-lg"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-secondary/20 flex items-center justify-center rounded-md">
                  <span className="text-xl font-bold">HW</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* 向下滾動指示器 */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-xs text-muted mb-2">往下滾動</span>
        <motion.div 
          className="w-6 h-10 border-2 border-muted rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [4, 16, 4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection; 