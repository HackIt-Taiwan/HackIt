"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Once mounted, we can safely access localStorage and window
    setMounted(true);
    
    // Check if user has a saved preference
    const savedTheme = (localStorage.getItem('theme') as Theme | null) || (typeof document !== 'undefined' ? (document.cookie.match(/(?:^|; )theme=([^;]+)/)?.[1] as Theme | null) : null);
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Use system preference as default
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
      setTheme('system');
    }
  }, []);

  // Update localStorage when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    try {
      localStorage.setItem('theme', theme);
    } catch {}
    try {
      document.cookie = `theme=${theme}; Path=/; Max-Age=31536000; SameSite=Lax`;
    } catch {}
    
    // Apply theme class to document
    const root = document.documentElement;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
    
    root.classList.remove('light-theme', 'dark-theme');
    
    const effectiveTheme = theme === 'system' ? systemTheme : theme;
    root.classList.add(`${effectiveTheme}-theme`);
    
    // Also set the data-theme attribute for tailwind
    if (effectiveTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        // Force a re-render to apply the new system theme
        setTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  const value = {
    theme,
    setTheme,
  };

  // Return the context provider with the current theme value
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 