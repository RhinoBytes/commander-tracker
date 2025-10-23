# Commander Tracker

A modern web application for tracking life totals, commander damage, and other game state in Magic: The Gathering Commander format games.

## Features

### Game Management
- **Flexible Player Support**: 2-4 players with responsive layouts
- **Turn Tracking**: Visual turn indicator with active player highlighting
- **Game Log**: Comprehensive event tracking for all game actions
- **Session Controls**: Start, end, and reset games with confirmation

### Player Tracking
- **Life Counters**: 
  - Large, circular life displays with hover effects
  - Click left/right to decrement/increment
  - Click center to directly edit life total
  - Animated feedback for life changes
  
- **Commander Damage**: 
  - Track damage from each opponent's commander
  - Visual warning at lethal threshold (21 damage)
  - Separate tracking for partner commanders

- **Poison Counters**: 
  - Dedicated poison counter tracking
  - Visual warning at lethal threshold (10 counters)

### Commander Selection
- **Scryfall Integration**: 
  - Real-time card search with autocomplete
  - Card validation (legendary creatures and commander planeswalkers)
  - Support for partner commanders
  - Beautiful card art backgrounds

### UI/UX
- **Desktop-First Design**: Optimized for large screens
- **Beautiful Backgrounds**: Magic: The Gathering art for each player
- **Smooth Animations**: Tailwind CSS transitions
- **Intuitive Controls**: Clear visual feedback for all interactions
- **Slide-out Sidebar**: Game menu with tabs for different functions

## Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4+
- **State Management**: React Context API
- **API Integration**: Scryfall REST API
- **Build Tools**: Next.js built-in tooling

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/RhinoBytes/commander-tracker.git
cd commander-tracker

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
commander-tracker/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (placeholder for database)
│   │   ├── commanders/    # Commander data endpoints
│   │   └── game/          # Game state endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main game page
├── components/            # React components
│   ├── CommanderSearch.tsx
│   ├── DamageTracker.tsx
│   ├── GameLayout.tsx
│   ├── LifeCounter.tsx
│   ├── PlayerMenu.tsx
│   ├── PlayerPanel.tsx
│   ├── Sidebar.tsx
│   ├── StartScreen.tsx
│   └── TurnTracker.tsx
├── hooks/                 # Custom React hooks
│   ├── useCommanderDamage.ts
│   ├── useGameState.tsx
│   ├── useLifeCounter.ts
│   └── useTurnTracker.ts
├── utils/                 # Utility functions
│   └── scryfall.ts       # Scryfall API integration
├── data/                  # Placeholder data (for future DB)
│   ├── commanders.ts
│   ├── gameHistory.ts
│   ├── gameState.ts
│   └── players.ts
└── public/               # Static assets
    └── images/           # Background images
```

## Development

### Code Quality

```bash
# Run linter
npm run lint

# Type checking is done automatically during build
npm run build
```

### Key Technologies

- **State Management**: Uses React Context API for global game state
- **Type Safety**: Full TypeScript coverage
- **Styling**: Utility-first CSS with Tailwind
- **API Calls**: Modern fetch API with async/await
- **Component Pattern**: Functional components with hooks

## Future Enhancements

The application is structured to easily integrate with a database. Look for `// TODO: Database integration` comments in:

- `/data/*.ts` - Data layer functions
- `/app/api/*/route.ts` - API endpoints

Planned features:
- Database persistence (Supabase/PostgreSQL)
- User authentication
- Game history and statistics
- Multiplayer synchronization
- Mobile app (React Native)
- Card collection tracking
- Deck building integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Card data and images provided by [Scryfall](https://scryfall.com/)
- Background art © Wizards of the Coast
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
