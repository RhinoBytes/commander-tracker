'use client';

import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';

export default function StartScreen() {
  const { startGame, gameStarted } = useGameState();
  const [selectedPlayerCount, setSelectedPlayerCount] = useState(4);

  if (gameStarted) return null;

  const handleStart = () => {
    startGame(selectedPlayerCount);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 flex items-center justify-center z-50">
      <div className="bg-black/80 p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Commander Tracker
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Track life, commander damage, and more
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-white mb-3 text-lg">
              Number of Players
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[2, 3, 4].map((count) => (
                <button
                  key={count}
                  onClick={() => setSelectedPlayerCount(count)}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    selectedPlayerCount === count
                      ? 'bg-purple-600 text-white shadow-lg scale-105'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {count} Players
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg shadow-lg transition-all transform hover:scale-105"
          >
            Start Game
          </button>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Starting life: 40</p>
        </div>
      </div>
    </div>
  );
}
