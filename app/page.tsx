'use client';

import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import GameLayout from '@/components/GameLayout';
import PlayerPanel from '@/components/PlayerPanel';
import StartScreen from '@/components/StartScreen';
import TurnTracker from '@/components/TurnTracker';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const { players, gameStarted, activePlayer } = useGameState();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getPlayerPosition = (index: number, total: number): 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' => {
    if (total === 2) {
      return index === 0 ? 'top-left' : 'top-right';
    } else if (total === 3) {
      const positions: Array<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'> = ['top-left', 'top-right', 'bottom-left'];
      return positions[index];
    } else {
      const positions: Array<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'> = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];
      return positions[index];
    }
  };

  return (
    <main className="h-screen w-screen overflow-hidden">
      <StartScreen />
      
      {gameStarted && (
        <>
          <TurnTracker onOpenSidebar={() => setSidebarOpen(true)} />
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          <GameLayout>
            {players.map((player, index) => (
              <PlayerPanel
                key={player.id}
                player={player}
                isActive={player.id === activePlayer}
                position={getPlayerPosition(index, players.length)}
              />
            ))}
          </GameLayout>
        </>
      )}
    </main>
  );
}
