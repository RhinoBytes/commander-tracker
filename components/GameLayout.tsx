'use client';

import { ReactNode } from 'react';
import { useGameState } from '@/hooks/useGameState';

interface GameLayoutProps {
  children: ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  const { players } = useGameState();
  const playerCount = players.length;

  return (
    <div
      className={`h-screen w-screen grid ${
        playerCount === 2
          ? 'grid-cols-2 grid-rows-1'
          : playerCount === 4
          ? 'grid-cols-2 grid-rows-2'
          : 'grid-cols-2 grid-rows-2'
      } overflow-hidden`}
    >
      {children}
    </div>
  );
}
