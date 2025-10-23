// Placeholder data for game state
// This will be replaced with database calls later
import { Player } from './players';

export interface GameState {
  id?: string;
  players: Player[];
  currentTurn: number;
  activePlayer: number;
  turnNumber: number;
  startedAt?: Date;
  endedAt?: Date;
}

export const initialGameState: GameState = {
  players: [],
  currentTurn: 0,
  activePlayer: 1,
  turnNumber: 1,
};

// Database integration point
export async function saveGameState(gameState: GameState): Promise<void> {
  // TODO: Replace with actual database save
  console.log('Saving game state to database:', gameState);
}

export async function loadGameState(gameId: string): Promise<GameState | null> {
  // TODO: Replace with actual database query
  console.log('Loading game state from database:', gameId);
  return null;
}

export async function deleteGameState(gameId: string): Promise<void> {
  // TODO: Replace with actual database delete
  console.log('Deleting game state from database:', gameId);
}
