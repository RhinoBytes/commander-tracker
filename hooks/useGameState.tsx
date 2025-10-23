'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Player } from '@/data/players';
import { GameLogEntry } from '@/data/gameHistory';

interface Commander {
  name: string;
  image: string;
}

interface GameStateContextType {
  players: Player[];
  currentTurn: number;
  activePlayer: number;
  turnNumber: number;
  gameStarted: boolean;
  commanders: { [playerId: number]: { main: Commander | null; partner: Commander | null } };
  gameLogs: GameLogEntry[];
  updatePlayerLife: (playerId: number, newLife: number) => void;
  incrementLife: (playerId: number, amount: number) => void;
  decrementLife: (playerId: number, amount: number) => void;
  updatePoisonCounters: (playerId: number, newCount: number) => void;
  updateCommanderDamage: (playerId: number, opponentId: number, damage: number) => void;
  setCommander: (playerId: number, commander: Commander, isPartner: boolean) => void;
  nextTurn: () => void;
  startGame: (playerCount: number) => void;
  endGame: () => void;
  resetGame: () => void;
  addGameLog: (entry: Omit<GameLogEntry, 'timestamp'>) => void;
}

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [activePlayer, setActivePlayer] = useState(1);
  const [turnNumber, setTurnNumber] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  const [commanders, setCommanders] = useState<{
    [playerId: number]: { main: Commander | null; partner: Commander | null };
  }>({});
  const [gameLogs, setGameLogs] = useState<GameLogEntry[]>([]);

  const addGameLog = useCallback((entry: Omit<GameLogEntry, 'timestamp'>) => {
    const newLog: GameLogEntry = {
      ...entry,
      timestamp: new Date(),
    };
    setGameLogs((prev) => [...prev, newLog]);
  }, []);

  const updatePlayerLife = useCallback(
    (playerId: number, newLife: number) => {
      setPlayers((prev) =>
        prev.map((p) => {
          if (p.id === playerId) {
            const diff = newLife - p.life;
            addGameLog({
              playerId,
              type: 'life_change',
              details: `${p.name} ${diff > 0 ? 'gained' : 'lost'} ${Math.abs(diff)} life`,
              value: diff,
            });
            return { ...p, life: newLife };
          }
          return p;
        })
      );
    },
    [addGameLog]
  );

  const incrementLife = useCallback(
    (playerId: number, amount: number = 1) => {
      setPlayers((prev) =>
        prev.map((p) => {
          if (p.id === playerId) {
            const newLife = p.life + amount;
            addGameLog({
              playerId,
              type: 'life_change',
              details: `${p.name} gained ${amount} life`,
              value: amount,
            });
            return { ...p, life: newLife };
          }
          return p;
        })
      );
    },
    [addGameLog]
  );

  const decrementLife = useCallback(
    (playerId: number, amount: number = 1) => {
      setPlayers((prev) =>
        prev.map((p) => {
          if (p.id === playerId) {
            const newLife = p.life - amount;
            addGameLog({
              playerId,
              type: 'life_change',
              details: `${p.name} lost ${amount} life`,
              value: -amount,
            });
            return { ...p, life: newLife };
          }
          return p;
        })
      );
    },
    [addGameLog]
  );

  const updatePoisonCounters = useCallback(
    (playerId: number, newCount: number) => {
      setPlayers((prev) =>
        prev.map((p) => {
          if (p.id === playerId) {
            const diff = newCount - p.poisonCounters;
            addGameLog({
              playerId,
              type: 'poison',
              details: `${p.name} ${diff > 0 ? 'gained' : 'lost'} ${Math.abs(diff)} poison counter(s)`,
              value: diff,
            });
            return { ...p, poisonCounters: newCount };
          }
          return p;
        })
      );
    },
    [addGameLog]
  );

  const updateCommanderDamage = useCallback(
    (playerId: number, opponentId: number, damage: number) => {
      setPlayers((prev) =>
        prev.map((p) => {
          if (p.id === playerId) {
            const newDamage = { ...p.commanderDamage, [opponentId]: damage };
            addGameLog({
              playerId,
              type: 'commander_damage',
              details: `${p.name} took ${damage} commander damage from Player ${opponentId}`,
              value: damage,
            });
            return { ...p, commanderDamage: newDamage };
          }
          return p;
        })
      );
    },
    [addGameLog]
  );

  const setCommander = useCallback((playerId: number, commander: Commander, isPartner: boolean) => {
    setCommanders((prev) => ({
      ...prev,
      [playerId]: {
        ...(prev[playerId] || { main: null, partner: null }),
        [isPartner ? 'partner' : 'main']: commander,
      },
    }));
  }, []);

  const nextTurn = useCallback(() => {
    setCurrentTurn((prev) => {
      const next = (prev + 1) % players.length;
      setActivePlayer(players[next].id);
      if (next === 0) {
        setTurnNumber((t) => t + 1);
      }
      addGameLog({
        playerId: players[next].id,
        type: 'turn_change',
        details: `Turn ${turnNumber}: ${players[next].name}'s turn`,
      });
      return next;
    });
  }, [players, turnNumber, addGameLog]);

  const startGame = useCallback(
    (playerCount: number) => {
      const newPlayers: Player[] = Array.from({ length: playerCount }, (_, i) => ({
        id: i + 1,
        name: `Player ${i + 1}`,
        life: 40,
        poisonCounters: 0,
        commanderDamage: {},
        backgroundImage: `/images/${
          ['7c0c5910e664db0fd696ba8a0bdc6c33.jpg', 'eldraine_art_1600x.webp', 
           'magic__the_gathering__mountain_for_m19_standard_by_alayna_dce0noo-fullview.jpg', 
           'Simic_Wallpaper_2560x1440.jpg'][i]
        }`,
      }));
      setPlayers(newPlayers);
      setGameStarted(true);
      setCurrentTurn(0);
      setActivePlayer(1);
      setTurnNumber(1);
      setGameLogs([]);
      addGameLog({
        playerId: 1,
        type: 'game_start',
        details: `Game started with ${playerCount} players`,
      });
    },
    [addGameLog]
  );

  const endGame = useCallback(() => {
    addGameLog({
      playerId: activePlayer,
      type: 'game_end',
      details: 'Game ended',
    });
    setGameStarted(false);
  }, [activePlayer, addGameLog]);

  const resetGame = useCallback(() => {
    setPlayers([]);
    setGameStarted(false);
    setCurrentTurn(0);
    setActivePlayer(1);
    setTurnNumber(1);
    setCommanders({});
    setGameLogs([]);
  }, []);

  return (
    <GameStateContext.Provider
      value={{
        players,
        currentTurn,
        activePlayer,
        turnNumber,
        gameStarted,
        commanders,
        gameLogs,
        updatePlayerLife,
        incrementLife,
        decrementLife,
        updatePoisonCounters,
        updateCommanderDamage,
        setCommander,
        nextTurn,
        startGame,
        endGame,
        resetGame,
        addGameLog,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
}
