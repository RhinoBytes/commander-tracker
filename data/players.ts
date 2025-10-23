// Placeholder data for players
// This will be replaced with database calls later
export interface Player {
  id: number;
  name: string;
  life: number;
  poisonCounters: number;
  commanderDamage: { [opponentId: number]: number };
  backgroundImage?: string;
}

export const defaultPlayers: Player[] = [
  {
    id: 1,
    name: 'Player 1',
    life: 40,
    poisonCounters: 0,
    commanderDamage: {},
    backgroundImage: '/images/7c0c5910e664db0fd696ba8a0bdc6c33.jpg',
  },
  {
    id: 2,
    name: 'Player 2',
    life: 40,
    poisonCounters: 0,
    commanderDamage: {},
    backgroundImage: '/images/eldraine_art_1600x.webp',
  },
  {
    id: 3,
    name: 'Player 3',
    life: 40,
    poisonCounters: 0,
    commanderDamage: {},
    backgroundImage: '/images/magic__the_gathering__mountain_for_m19_standard_by_alayna_dce0noo-fullview.jpg',
  },
  {
    id: 4,
    name: 'Player 4',
    life: 40,
    poisonCounters: 0,
    commanderDamage: {},
    backgroundImage: '/images/Simic_Wallpaper_2560x1440.jpg',
  },
];
