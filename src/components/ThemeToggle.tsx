"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaDesktop } from 'react-icons/fa';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleThemeSelect = (selectedTheme: 'light' | 'dark' | 'system') => (e: React.MouseEvent) => {
    e.stopPropagation();
    setTheme(selectedTheme);
    setIsOpen(false);
  };

  // Get current theme icon
  const getCurrentThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <FaSun className="text-yellow-400" />;
      case 'dark':
        return <FaMoon className="text-indigo-400" />;
      case 'system':
        return <FaDesktop className="text-green-400" />;
      default:
        return <FaSun className="text-yellow-400" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        aria-label="Toggle theme"
        className="rounded-full p-2 bg-opacity-20 dark:bg-opacity-20 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors focus:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleToggleClick}
      >
        {getCurrentThemeIcon()}
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-40 py-2 rounded-lg shadow-xl bg-white dark:bg-dark border border-gray-200 dark:border-gray-700 z-50"
          >
            <div className="px-2 text-xs text-gray-500 dark:text-gray-400 mb-1">主題選擇</div>
            
            <button
              className={`flex items-center w-full px-4 py-2 text-sm ${
                theme === 'light' ? 'bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={handleThemeSelect('light')}
            >
              <FaSun className="mr-2 text-yellow-400" />
              <span>淺色</span>
              {theme === 'light' && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto text-xs bg-primary text-white px-1.5 py-0.5 rounded-full"
                >
                  ✓
                </motion.span>
              )}
            </button>
            
            <button
              className={`flex items-center w-full px-4 py-2 text-sm ${
                theme === 'dark' ? 'bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={handleThemeSelect('dark')}
            >
              <FaMoon className="mr-2 text-indigo-400" />
              <span>深色</span>
              {theme === 'dark' && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto text-xs bg-primary text-white px-1.5 py-0.5 rounded-full"
                >
                  ✓
                </motion.span>
              )}
            </button>
            
            <button
              className={`flex items-center w-full px-4 py-2 text-sm ${
                theme === 'system' ? 'bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={handleThemeSelect('system')}
            >
              <FaDesktop className="mr-2 text-green-400" />
              <span>系統</span>
              {theme === 'system' && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto text-xs bg-primary text-white px-1.5 py-0.5 rounded-full"
                >
                  ✓
                </motion.span>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle; 