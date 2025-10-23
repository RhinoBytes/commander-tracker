'use client';

import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'game' | 'history' | 'settings'>('game');
  const { endGame, resetGame, gameLogs, gameStarted } = useGameState();

  const handleEndGame = () => {
    if (window.confirm('Are you sure you want to end this game?')) {
      endGame();
      onClose();
    }
  };

  const handleResetGame = () => {
    if (window.confirm('Are you sure you want to reset the game? All progress will be lost.')) {
      resetGame();
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-900 text-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Game Menu</h2>
          <button
            onClick={onClose}
            className="text-2xl hover:text-gray-400 transition-colors"
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            className={`flex-1 py-3 ${
              activeTab === 'game' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
            } transition-colors`}
            onClick={() => setActiveTab('game')}
          >
            Game
          </button>
          <button
            className={`flex-1 py-3 ${
              activeTab === 'history' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
            } transition-colors`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
          <button
            className={`flex-1 py-3 ${
              activeTab === 'settings' ? 'bg-purple-600' : 'bg-gray-800 hover:bg-gray-700'
            } transition-colors`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto h-[calc(100%-8rem)]">
          {activeTab === 'game' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-3">Game Controls</h3>
              {gameStarted && (
                <>
                  <button
                    onClick={handleEndGame}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors"
                  >
                    End Game
                  </button>
                  <button
                    onClick={handleResetGame}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded transition-colors"
                  >
                    Reset Game
                  </button>
                </>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold mb-3">Game Log</h3>
              {gameLogs.length === 0 ? (
                <p className="text-gray-400 italic">No game events yet</p>
              ) : (
                <div className="space-y-2">
                  {gameLogs.slice().reverse().map((log, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 p-2 rounded text-sm"
                    >
                      <div className="text-gray-400 text-xs">
                        {log.timestamp.toLocaleTimeString()}
                      </div>
                      <div>{log.details}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-3">Settings</h3>
              <div className="text-gray-400">
                <p>Settings coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
