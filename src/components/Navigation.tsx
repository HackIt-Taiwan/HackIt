"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { name: '首頁', href: '/' },
  { name: '關於我們', href: '/#關於我們' },
  { name: '活動', href: '/#活動' },
  { name: '團隊', href: '/#團隊' },
  { name: '常見問題', href: '/#常見問題' },
  { name: '聯絡我們', href: '/#聯絡我們' },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('首頁');
  
  // 監聽滾動事件變更導航欄樣式
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // 檢測當前處於哪個部分
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.getAttribute('id');
        
        if (sectionTop < 100 && sectionTop > -300 && sectionId) {
          setActiveItem(sectionId);
        }
      });
      
      if (window.scrollY < 100) {
        setActiveItem('首頁');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logo動畫變體
  const logoVariants = {
    normal: { scale: 1 },
    hover: { 
      scale: 1.05,
      rotate: [0, -5, 5, -5, 0], 
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 400
      }
    }
  };
  
  // 導航項目動畫變體
  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      y: -3,
      scale: 1.05,
      color: "#7C3AED",
      transition: {
        duration: 0.2
      }
    }
  };
  
  // 移動菜單動畫變體
  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    },
    open: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const mobileItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-md' : 'py-5 bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo部分 */}
          <motion.div 
            className="flex items-center"
            variants={logoVariants}
            initial="normal"
            whileHover="hover"
          >
            <Link href="/" className="flex items-center">
              <span className="font-bold text-2xl gradient-text relative">
                HackIt
                <span className="absolute -top-1 -right-3 text-xs animate-pulse-slow">✨</span>
              </span>
            </Link>
          </motion.div>
          
          {/* 桌面菜單 */}
          <div className="hidden md:flex space-x-1 items-center">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.name}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="relative"
              >
                <Link 
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${activeItem === item.name ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
                  onClick={() => setActiveItem(item.name)}
                >
                  {item.name}
                  {activeItem === item.name && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-primary mx-auto rounded-full" 
                      layoutId="activeIndicator"
                      style={{ width: '50%', marginLeft: '25%', marginTop: '2px' }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="https://hackmd.io/@hackithq/main" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-4 btn-primary text-sm"
              >
                參與活動 <span className="ml-1">🚀</span>
              </a>
            </motion.div>
          </div>
          
          {/* 移動端漢堡菜單按鈕 */}
          <div className="md:hidden">
            <button
              className="flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-primary focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative w-6 h-5">
                <motion.span
                  className="absolute h-0.5 w-6 bg-current transform transition-transform duration-300"
                  animate={{
                    top: isOpen ? "50%" : "20%",
                    rotate: isOpen ? "45deg" : "0deg",
                    y: isOpen ? "-50%" : "0%"
                  }}
                ></motion.span>
                <motion.span
                  className="absolute h-0.5 w-6 bg-current top-1/2 -translate-y-1/2"
                  animate={{
                    opacity: isOpen ? 0 : 1
                  }}
                ></motion.span>
                <motion.span
                  className="absolute h-0.5 w-6 bg-current transform transition-transform duration-300"
                  animate={{
                    top: isOpen ? "50%" : "80%",
                    rotate: isOpen ? "-45deg" : "0deg",
                    y: isOpen ? "-50%" : "0%"
                  }}
                ></motion.span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* 移動端菜單 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 p-4 bg-white shadow-xl rounded-b-2xl"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex flex-col space-y-2 pt-2 pb-4">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  variants={mobileItemVariants}
                  className="overflow-hidden"
                >
                  <Link
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg font-medium ${activeItem === item.name ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => {
                      setIsOpen(false);
                      setActiveItem(item.name);
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={mobileItemVariants}
                className="px-4 pt-2"
              >
                <a 
                  href="https://hackmd.io/@hackithq/main" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full py-3 text-center btn-primary"
                >
                  參與活動 <span className="ml-1">🚀</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation; 