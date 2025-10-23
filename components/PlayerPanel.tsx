'use client';

import { useState } from 'react';
import { Player } from '@/data/players';
import LifeCounter from './LifeCounter';
import PlayerMenu from './PlayerMenu';

interface PlayerPanelProps {
  player: Player;
  isActive: boolean;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export default function PlayerPanel({ player, isActive, position }: PlayerPanelProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuButtonPosition = {
    'top-left': 'bottom-20 left-20',
    'top-right': 'bottom-20 right-20',
    'bottom-left': 'top-20 left-20',
    'bottom-right': 'top-20 right-20',
  }[position];

  return (
    <div
      className={`relative overflow-hidden flex justify-center items-center bg-cover bg-center ${
        isActive ? 'ring-4 ring-yellow-400' : ''
      }`}
      style={{
        backgroundImage: player.backgroundImage ? `url(${player.backgroundImage})` : undefined,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Menu button */}
      <button
        className={`absolute ${menuButtonPosition} z-10 bg-black/60 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center text-white text-xl transition-colors`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Open player menu"
      >
        ☰
      </button>

      {/* Life counter */}
      <LifeCounter playerId={player.id} />

      {/* Player name */}
      <div className="absolute bottom-5 left-5 z-10 text-white text-2xl font-bold drop-shadow-lg">
        {player.name}
      </div>

      {/* Menu panel */}
      {menuOpen && <PlayerMenu player={player} onClose={() => setMenuOpen(false)} />}
    </div>
  );
}
