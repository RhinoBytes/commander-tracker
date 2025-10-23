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

The production build will be available at `http://localhost:3000` by default.

#### Deployment Options

**Option 1: Traditional Node.js Server (Recommended)**
```bash
# Build the application
npm run build

# Start the server
npm start
```
This creates an optimized production build that runs on a Node.js server. The `public` directory with background images will be served automatically.

**Option 2: Static Export**
For static hosting (Netlify, Vercel, GitHub Pages), you can export the app as static HTML:

1. Update `next.config.ts` to add `output: 'export'`:
```typescript
const nextConfig: NextConfig = {
  output: 'export', // Enable static HTML export
  images: {
    unoptimized: true, // Required for static export
    // ... rest of config
  },
};
```

2. Build the static site:
```bash
npm run build
```

3. The static files will be in the `out` directory. Deploy this directory to your static host.

**Important Notes:**
- Images from the `public` directory are automatically included in all build types
- Scryfall API calls require internet connectivity and may be subject to CORS policies
- The app uses client-side state management, so state is not persisted between sessions

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

## Troubleshooting

### Images Not Loading in Production
If background images aren't loading after deployment:
1. Verify the `public/images` directory exists in your deployment
2. Check that you're not using `output: 'standalone'` in next.config.ts (this is for Docker only)
3. Ensure static files are being served correctly by your hosting provider
4. Check browser console for 404 errors on image requests

### Commander Names Not Updating
If commander names don't appear in the search input after selection:
1. Clear your browser cache and reload
2. Verify you're running the latest build (`npm run build && npm start`)
3. Check browser console for any React hydration errors

### Scryfall API Not Working
If commander search returns no results:
1. Check your internet connection
2. Verify Scryfall API is accessible: https://api.scryfall.com/cards/autocomplete?q=test
3. Check browser console for CORS errors
4. Try disabling browser extensions that might block requests (ad blockers, privacy tools)

### Build Failures
If the build fails:
1. Delete `.next` directory: `rm -rf .next`
2. Delete `node_modules`: `rm -rf node_modules`
3. Reinstall dependencies: `npm install`
4. Try building again: `npm run build`
