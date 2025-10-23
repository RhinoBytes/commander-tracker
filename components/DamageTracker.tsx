'use client';

import { Player } from '@/data/players';
import { useGameState } from '@/hooks/useGameState';

interface DamageTrackerProps {
  player: Player;
}

export default function DamageTracker({ player }: DamageTrackerProps) {
  const { players, updateCommanderDamage, updatePoisonCounters } = useGameState();

  const handleCommanderDamageChange = (opponentId: number, newValue: number) => {
    updateCommanderDamage(player.id, opponentId, Math.max(0, newValue));
  };

  return (
    <div className="space-y-4">
      {/* Commander Damage Section */}
      <div>
        <h3 className="text-lg font-semibold text-purple-400 mb-3">
          Commander Damage Received
        </h3>
        <div className="space-y-2">
          {players
            .filter((p) => p.id !== player.id)
            .map((opponent) => {
              const damage = player.commanderDamage[opponent.id] || 0;
              const isLethal = damage >= 21;

              return (
                <div
                  key={opponent.id}
                  className="flex items-center justify-between p-2 bg-white/5 rounded"
                >
                  <span className="text-sm">{opponent.name}:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCommanderDamageChange(opponent.id, damage - 1)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-500/30 transition-colors"
                    >
                      -
                    </button>
                    <span
                      className={`w-10 text-center font-bold ${
                        isLethal ? 'text-red-500' : ''
                      }`}
                    >
                      {damage}
                    </span>
                    <button
                      onClick={() => handleCommanderDamageChange(opponent.id, damage + 1)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-green-500/30 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Poison Counters Section */}
      <div className="pt-4 border-t border-white/20">
        <h3 className="text-lg font-semibold text-purple-400 mb-3">Poison Counters</h3>
        <div className="flex items-center justify-between p-3 bg-purple-900/20 rounded border border-purple-500/30">
          <span className="text-sm">Poison:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updatePoisonCounters(player.id, Math.max(0, player.poisonCounters - 1))}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-500/30 transition-colors"
            >
              -
            </button>
            <span
              className={`w-10 text-center font-bold ${
                player.poisonCounters >= 10 ? 'text-purple-400' : ''
              }`}
            >
              {player.poisonCounters}
            </span>
            <button
              onClick={() => updatePoisonCounters(player.id, player.poisonCounters + 1)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-green-500/30 transition-colors"
            >
              +
            </button>
          </div>
        </div>
        {player.poisonCounters >= 10 && (
          <p className="text-xs text-purple-400 mt-1 text-center animate-pulse">
            Lethal poison!
          </p>
        )}
      </div>
    </div>
  );
}
