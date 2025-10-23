'use client';

import { useState, useCallback, useEffect } from 'react';

export function useLifeCounter(initialLife: number = 40) {
  const [life, setLife] = useState(initialLife);
  const [animating, setAnimating] = useState<'increase' | 'decrease' | null>(null);

  const increment = useCallback((amount: number = 1) => {
    setLife((prev) => prev + amount);
    setAnimating('increase');
  }, []);

  const decrement = useCallback((amount: number = 1) => {
    setLife((prev) => prev - amount);
    setAnimating('decrease');
  }, []);

  const setValue = useCallback((newValue: number) => {
    setLife((prev) => {
      setAnimating(newValue > prev ? 'increase' : 'decrease');
      return newValue;
    });
  }, []);

  const reset = useCallback(() => {
    setLife(initialLife);
    setAnimating(null);
  }, [initialLife]);

  // Clear animation after a short delay
  useEffect(() => {
    if (animating) {
      const timer = setTimeout(() => setAnimating(null), 300);
      return () => clearTimeout(timer);
    }
  }, [animating]);

  return {
    life,
    increment,
    decrement,
    setValue,
    reset,
    animating,
  };
}
