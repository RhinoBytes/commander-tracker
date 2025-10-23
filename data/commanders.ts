// Placeholder data for commanders
// This will be replaced with database calls later
export interface Commander {
  id?: string;
  name: string;
  image: string;
  oracleText?: string;
  typeLine?: string;
  manaCost?: string;
}

export interface PlayerCommanders {
  main: Commander | null;
  partner: Commander | null;
}

export const sampleCommanders: Commander[] = [
  {
    id: 'atraxa',
    name: 'Atraxa, Praetors\' Voice',
    image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/d/0/d0d33d52-3d28-4635-b985-51e126289259.jpg',
    oracleText: 'Flying, vigilance, deathtouch, lifelink\nAt the beginning of your end step, proliferate.',
    typeLine: 'Legendary Creature — Phyrexian Angel',
    manaCost: '{G}{W}{U}{B}',
  },
  {
    id: 'edgar',
    name: 'Edgar Markov',
    image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/8/d/8d94b8ec-ecda-43c8-a60e-1ba33e6a54a4.jpg',
    oracleText: 'Eminence — Whenever you cast another Vampire spell, if Edgar Markov is in the command zone or on the battlefield, create a 1/1 black Vampire creature token.',
    typeLine: 'Legendary Creature — Vampire Knight',
    manaCost: '{3}{R}{W}{B}',
  },
  {
    id: 'thrasios',
    name: 'Thrasios, Triton Hero',
    image: 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/2/1/21e27b91-c7f1-4709-aa0d-8b5d81b22a0a.jpg',
    oracleText: '{4}: Scry 1, then reveal the top card of your library. If it\'s a land card, put it onto the battlefield tapped. Otherwise, draw a card.\nPartner',
    typeLine: 'Legendary Creature — Merfolk Wizard',
    manaCost: '{G}{U}',
  },
];

// Database integration point
export async function getCommanderByName(name: string): Promise<Commander | null> {
  // TODO: Replace with actual database query
  // For now, return null to use Scryfall API
  return null;
}

export async function saveCommander(commander: Commander): Promise<void> {
  // TODO: Replace with actual database save
  console.log('Saving commander to database:', commander);
}
