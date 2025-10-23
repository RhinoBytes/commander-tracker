'use client';

import { useGameState } from '@/hooks/useGameState';

interface TurnTrackerProps {
  onOpenSidebar: () => void;
}

export default function TurnTracker({ onOpenSidebar }: TurnTrackerProps) {
  const { nextTurn, turnNumber, activePlayer, gameStarted } = useGameState();

  if (!gameStarted) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-4 bg-black/80 px-6 py-3 rounded-lg shadow-lg">
      <div className="text-white">
        <span className="text-sm text-gray-400">Turn {turnNumber}</span>
        <span className="mx-2">•</span>
        <span className="font-bold">Player {activePlayer}&apos;s Turn</span>
      </div>
      
      <button
        onClick={nextTurn}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
      >
        Next Turn
      </button>

      <button
        onClick={onOpenSidebar}
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
      >
        Menu
      </button>
    </div>
  );
}
