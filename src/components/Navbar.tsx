"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/i18n';

// Import ThemeToggle with no SSR to avoid hydration issues
const ThemeToggle = dynamic(() => import('./ThemeToggle'), {
  ssr: false,
});

// Import LanguageSelector with no SSR
const LanguageSelector = dynamic(() => import('./LanguageSelector'), {
  ssr: false,
});

const Navbar: React.FC = () => {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
      console.log(t("navbar.easterEgg"));
      setClickCount(0);
    }
    
    const timer = setTimeout(() => setClickCount(0), 2000);
    return () => clearTimeout(timer);
  }, [clickCount, t]);

  // 導航項目定義 - 重新排序，將「最新消息」移到「首頁」旁邊
  const navItems = [
    { name: t('common.home'), href: '/' },
    { name: t('common.events'), href: 'https://hackittw.notion.site/1f459188ed5280499052d8d3b813770c', isExternal: true },
    { name: t('common.news'), href: '/news' },
    // 財務公開頁面暫時關閉
    { name: t('common.about'), href: '/about' },
    { name: t('common.join'), href: '/join', highlight: true }
  ];

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-dark/95 backdrop-blur-sm shadow-sm py-2' 
          : 'bg-transparent py-4'
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
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary dark:text-primary">Hack<span className="text-dark dark:text-light">It</span></span>
            <motion.div 
              className="ml-1 bg-primary w-2 h-2 rounded-full" 
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1 items-center">
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.isExternal ? (
                <a 
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-medium px-4 py-2 rounded-md block transition-colors hover:bg-light dark:hover:bg-dark hover:text-primary`}
                >
                  {item.name}
                </a>
              ) : (
              <Link 
                href={item.href}
                className={`font-medium px-4 py-2 rounded-md block transition-colors ${
                  item.highlight 
                    ? 'bg-primary text-white hover:bg-primary/90' 
                    : pathname === item.href
                      ? 'text-primary bg-light/50 dark:bg-dark/50'
                      : 'hover:bg-light dark:hover:bg-dark hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
              )}
              {!item.highlight && !item.isExternal && pathname !== item.href && (
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full w-0"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.2 }}
                />
              )}
              {!item.highlight && !item.isExternal && pathname === item.href && (
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full w-full"
                  layoutId="navIndicator"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
          
          {/* Language Selector */}
          <div className="ml-2">
            <LanguageSelector />
          </div>
          
          {/* Theme Toggle Button */}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {/* Language Selector for Mobile */}
          <LanguageSelector />
          
          <ThemeToggle />
          
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md focus:outline-none hover:bg-light dark:hover:bg-dark"
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-6 flex flex-col space-y-1.5">
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="h-0.5 w-full bg-dark dark:bg-light block transition-all duration-300"
              ></motion.span>
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="h-0.5 w-full bg-dark dark:bg-light block transition-all duration-300"
              ></motion.span>
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="h-0.5 w-full bg-dark dark:bg-light block transition-all duration-300"
              ></motion.span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.nav
        className="md:hidden absolute w-full bg-white dark:bg-dark shadow-lg border-t border-gray-100 dark:border-gray-800"
        initial={{ height: 0, opacity: 0 }}
        animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
      >
        <div className="container mx-auto py-4 px-4 flex flex-col space-y-2">
          {navItems.map((item, index) => (
            item.isExternal ? (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium py-3 px-3 rounded-md transition-colors text-dark dark:text-light hover:text-primary hover:bg-light dark:hover:bg-gray-800"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ) : (
            <Link
              key={index}
              href={item.href}
              className={`font-medium py-3 px-3 rounded-md transition-colors ${
                pathname === item.href
                  ? 'bg-light/70 dark:bg-dark/70 text-primary'
                  : 'text-dark dark:text-light hover:text-primary hover:bg-light dark:hover:bg-gray-800'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
            )
          ))}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-2 font-mono text-xs text-muted">
            <p className="px-3">print("你好，駭客！")</p>
          </div>
        </div>
      </motion.nav>
    </motion.header>
  );
};

export default Navbar; 