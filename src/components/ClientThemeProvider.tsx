"use client";

import { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';

export default function ClientThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  // This extra component ensures that client-side theme functionality
  // is properly isolated from server components
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same structure
    // to avoid layout shifts while hydrating
    return <>{children}</>;
  }

  return <ThemeProvider>{children}</ThemeProvider>;
} 