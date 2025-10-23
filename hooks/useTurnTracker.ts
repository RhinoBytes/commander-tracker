'use client';

import { useState, useCallback } from 'react';

export function useTurnTracker(playerCount: number = 4) {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [turnNumber, setTurnNumber] = useState(1);

  const nextTurn = useCallback(() => {
    setCurrentTurn((prev) => {
      const next = (prev + 1) % playerCount;
      if (next === 0) {
        setTurnNumber((t) => t + 1);
      }
      return next;
    });
  }, [playerCount]);

  const previousTurn = useCallback(() => {
    setCurrentTurn((prev) => {
      const next = prev === 0 ? playerCount - 1 : prev - 1;
      if (prev === 0) {
        setTurnNumber((t) => Math.max(1, t - 1));
      }
      return next;
    });
  }, [playerCount]);

  const reset = useCallback(() => {
    setCurrentTurn(0);
    setTurnNumber(1);
  }, []);

  const setTurn = useCallback((turn: number) => {
    if (turn >= 0 && turn < playerCount) {
      setCurrentTurn(turn);
    }
  }, [playerCount]);

  return {
    currentTurn,
    turnNumber,
    nextTurn,
    previousTurn,
    reset,
    setTurn,
    activePlayerId: currentTurn + 1,
  };
}
