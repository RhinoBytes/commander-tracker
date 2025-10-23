// Placeholder data for game history and logs
// This will be replaced with database calls later

export interface GameLogEntry {
  id?: string;
  timestamp: Date;
  playerId: number;
  type: 'life_change' | 'commander_damage' | 'poison' | 'turn_change' | 'game_start' | 'game_end';
  details: string;
  value?: number;
}

export interface GameHistory {
  gameId: string;
  logs: GameLogEntry[];
  winner?: number;
  duration?: number;
}

export const sampleGameHistory: GameHistory = {
  gameId: 'sample-game-1',
  logs: [
    {
      timestamp: new Date(),
      playerId: 1,
      type: 'game_start',
      details: 'Game started with 4 players',
    },
    {
      timestamp: new Date(),
      playerId: 1,
      type: 'life_change',
      details: 'Player 1 lost 5 life',
      value: -5,
    },
    {
      timestamp: new Date(),
      playerId: 2,
      type: 'commander_damage',
      details: 'Player 2 dealt 7 commander damage to Player 1',
      value: 7,
    },
  ],
  winner: 2,
  duration: 3600, // seconds
};

// Database integration point
export async function saveGameLog(gameId: string, entry: GameLogEntry): Promise<void> {
  // TODO: Replace with actual database save
  console.log('Saving game log to database:', gameId, entry);
}

export async function getGameHistory(gameId: string): Promise<GameHistory | null> {
  // TODO: Replace with actual database query
  console.log('Loading game history from database:', gameId);
  return null;
}

export async function getAllGames(): Promise<GameHistory[]> {
  // TODO: Replace with actual database query
  console.log('Loading all games from database');
  return [];
}
