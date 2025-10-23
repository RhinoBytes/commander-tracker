'use client';

import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';

interface LifeCounterProps {
  playerId: number;
}

export default function LifeCounter({ playerId }: LifeCounterProps) {
  const { players, incrementLife, decrementLife, updatePlayerLife } = useGameState();
  const player = players.find((p) => p.id === playerId);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [animation, setAnimation] = useState<'increase' | 'decrease' | null>(null);

  if (!player) return null;

  const handleDecrement = () => {
    decrementLife(playerId, 1);
    setAnimation('decrease');
    setTimeout(() => setAnimation(null), 300);
  };

  const handleIncrement = () => {
    incrementLife(playerId, 1);
    setAnimation('increase');
    setTimeout(() => setAnimation(null), 300);
  };

  const handleClick = () => {
    setIsEditing(true);
    setEditValue(player.life.toString());
  };

  const handleBlur = () => {
    const newValue = parseInt(editValue);
    if (!isNaN(newValue) && newValue >= 0) {
      updatePlayerLife(playerId, newValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <div className="relative flex w-full h-full z-[2]">
      {/* Decrement area */}
      <div
        className="flex-1 cursor-pointer hover:bg-red-500/20 transition-colors"
        onClick={handleDecrement}
      />

      {/* Life display */}
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          flex items-center justify-center rounded-full w-36 h-36 bg-black/40 
          cursor-pointer hover:scale-105 transition-all duration-200
          ${animation === 'decrease' ? 'bg-red-500/50' : ''}
          ${animation === 'increase' ? 'bg-green-500/50' : ''}
        `}
        onClick={handleClick}
      >
        {isEditing ? (
          <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-3/4 h-3/5 bg-black/70 text-white text-4xl text-center border border-white/30 rounded"
            autoFocus
          />
        ) : (
          <span className="text-white text-7xl font-bold drop-shadow-lg">{player.life}</span>
        )}
      </div>

      {/* Increment area */}
      <div
        className="flex-1 cursor-pointer hover:bg-green-500/20 transition-colors"
        onClick={handleIncrement}
      />
    </div>
  );
}
