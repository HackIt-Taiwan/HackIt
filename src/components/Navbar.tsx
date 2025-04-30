"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Easter egg - prints a fun message when logo is clicked 3 times quickly
  const [clickCount, setClickCount] = useState(0);
  useEffect(() => {
    if (clickCount === 3) {
      console.log("嘿！你發現了彩蛋！你真是個探索者 👀");
      setClickCount(0);
    }
    
    const timer = setTimeout(() => setClickCount(0), 2000);
    return () => clearTimeout(timer);
  }, [clickCount]);

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setClickCount(prev => prev + 1)}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="text-2xl font-bold text-primary">Hack<span className="text-dark">It</span></span>
          <motion.div 
            className="ml-1 bg-primary w-2 h-2 rounded-full" 
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1">
          {[
            { name: '首頁', href: '#home' },
            { name: '社群', href: '#community' },
            { name: '活動', href: '#events' },
            { name: '專案', href: '#projects' },
            { name: '加入我們', href: '#join', highlight: true }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href={item.href}
                className={`font-medium px-4 py-2 rounded-md block transition-colors ${
                  item.highlight 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : 'hover:bg-light hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
              {!item.highlight && (
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full w-0"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md focus:outline-none hover:bg-light"
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-6 flex flex-col space-y-1.5">
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="h-0.5 w-full bg-dark block transition-all duration-300"
              ></motion.span>
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="h-0.5 w-full bg-dark block transition-all duration-300"
              ></motion.span>
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="h-0.5 w-full bg-dark block transition-all duration-300"
              ></motion.span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        className="md:hidden absolute w-full bg-white shadow-lg border-t border-gray-100"
        initial={{ height: 0, opacity: 0 }}
        animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
      >
        <div className="container mx-auto py-4 px-4 flex flex-col space-y-2">
          {[
            { name: '首頁', href: '#home' },
            { name: '社群', href: '#community' },
            { name: '活動', href: '#events' },
            { name: '專案', href: '#projects' },
            { name: '加入我們', href: '#join' }
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="font-medium text-dark hover:text-primary py-3 px-3 rounded-md hover:bg-light transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 mt-2 font-mono text-xs text-muted">
            <p className="px-3">print("你好，駭客！")</p>
          </div>
        </div>
      </motion.nav>
    </motion.header>
  );
};

export default Navbar; 