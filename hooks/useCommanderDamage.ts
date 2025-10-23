'use client';

import { useState, useCallback } from 'react';

export interface CommanderDamageState {
  [opponentId: number]: number;
}

export function useCommanderDamage() {
  const [damage, setDamage] = useState<CommanderDamageState>({});

  const incrementDamage = useCallback((opponentId: number, amount: number = 1) => {
    setDamage((prev) => ({
      ...prev,
      [opponentId]: (prev[opponentId] || 0) + amount,
    }));
  }, []);

  const decrementDamage = useCallback((opponentId: number, amount: number = 1) => {
    setDamage((prev) => ({
      ...prev,
      [opponentId]: Math.max(0, (prev[opponentId] || 0) - amount),
    }));
  }, []);

  const setDamageAmount = useCallback((opponentId: number, amount: number) => {
    setDamage((prev) => ({
      ...prev,
      [opponentId]: Math.max(0, amount),
    }));
  }, []);

  const getDamage = useCallback(
    (opponentId: number): number => {
      return damage[opponentId] || 0;
    },
    [damage]
  );

  const isLethal = useCallback(
    (opponentId: number): boolean => {
      return getDamage(opponentId) >= 21;
    },
    [getDamage]
  );

  const reset = useCallback(() => {
    setDamage({});
  }, []);

  return {
    damage,
    incrementDamage,
    decrementDamage,
    setDamageAmount,
    getDamage,
    isLethal,
    reset,
  };
}
