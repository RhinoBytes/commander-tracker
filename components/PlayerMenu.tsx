'use client';

import { Player } from '@/data/players';
import CommanderSearch from './CommanderSearch';
import DamageTracker from './DamageTracker';

interface PlayerMenuProps {
  player: Player;
  onClose: () => void;
}

export default function PlayerMenu({ player, onClose }: PlayerMenuProps) {
  return (
    <div className="absolute inset-0 bg-black/90 z-20 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 flex justify-between items-center p-4 bg-black/50 border-b border-white/20 z-30">
        <h2 className="text-xl font-bold text-white">{player.name} Options</h2>
        <button
          onClick={onClose}
          className="text-3xl text-white hover:text-gray-400 transition-colors"
          aria-label="Close menu"
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 text-white">
        {/* Commander Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-purple-400">Commander</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CommanderSearch playerId={player.id} isPartner={false} />
            <CommanderSearch playerId={player.id} isPartner={true} />
          </div>
        </div>

        {/* Damage Tracking */}
        <DamageTracker player={player} />
      </div>
    </div>
  );
}
