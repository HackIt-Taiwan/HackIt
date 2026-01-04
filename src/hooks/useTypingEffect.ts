import { useEffect, useState } from 'react';

type TypingOptions = {
  minDelayMs?: number;
  maxDelayMs?: number;
};

// Reveals text gradually when active; keeps current progress when paused.
export function useTypingEffect(
  text: string,
  isActive: boolean,
  { minDelayMs = 50, maxDelayMs = 150 }: TypingOptions = {}
): string {
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTypedText('');
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (!isActive) return;
    if (index >= text.length) return;

    const delay = Math.floor(Math.random() * (maxDelayMs - minDelayMs + 1)) + minDelayMs;
    const timeoutId = window.setTimeout(() => {
      setTypedText((prev) => prev + text[index]);
      setIndex((prev) => prev + 1);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [index, isActive, maxDelayMs, minDelayMs, text]);

  return typedText;
}
