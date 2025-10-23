# GitHub Copilot Instructions for Commander Tracker

## Project Overview

Commander Tracker is a Next.js 15 web application for tracking life totals, commander damage, and game state in Magic: The Gathering Commander format games. The project uses TypeScript, React 19, and Tailwind CSS with a desktop-first responsive design.

## Tech Stack & Dependencies

- **Framework**: Next.js 15.5.6 with App Router
- **Language**: TypeScript 5
- **UI Framework**: React 19
- **Styling**: Tailwind CSS 3.4+
- **State Management**: React Context API
- **API Integration**: Scryfall REST API for MTG card data
- **Build Tools**: Next.js built-in tooling

## Development Workflow

### Setup & Commands
```bash
npm install          # Install dependencies
npm run dev          # Start development server (localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npm start            # Start production server
```

### Code Quality Standards
- Always run `npm run lint` before committing
- Ensure TypeScript has no errors during build
- Follow existing code formatting patterns
- Use functional components with hooks (no class components)

## Project Structure & File Organization

```
app/                    # Next.js App Router pages
├── api/               # API routes (placeholder for future database)
├── globals.css        # Global styles
├── layout.tsx         # Root layout with providers
└── page.tsx           # Main game page

components/            # React UI components
├── CommanderSearch.tsx
├── DamageTracker.tsx
├── GameLayout.tsx
├── LifeCounter.tsx
├── PlayerMenu.tsx
├── PlayerPanel.tsx
├── Sidebar.tsx
├── StartScreen.tsx
└── TurnTracker.tsx

hooks/                 # Custom React hooks
├── useCommanderDamage.ts
├── useGameState.tsx
├── useLifeCounter.ts
└── useTurnTracker.ts

utils/                 # Utility functions
└── scryfall.ts       # Scryfall API integration

data/                  # Placeholder data layer (future DB integration)
├── commanders.ts
├── gameHistory.ts
├── gameState.ts
└── players.ts
```

## Coding Standards & Patterns

### TypeScript
- Use strict typing - avoid `any` types
- Define interfaces for all props and state objects
- Export types/interfaces when they're reused across files
- Use type inference where appropriate

### React Components
- Use functional components with hooks
- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks
- Place hooks in the `hooks/` directory

### State Management
- Use React Context API for global game state
- See `hooks/useGameState.tsx` for the main state pattern
- Keep component-level state local when possible
- Custom hooks should encapsulate related state logic

### Styling
- Use Tailwind CSS utility classes
- Follow existing color scheme and spacing patterns
- Desktop-first responsive design (optimize for large screens first)
- Use Tailwind's animation utilities for transitions

### API Integration
- All Scryfall API calls go through `utils/scryfall.ts`
- Use async/await pattern with proper error handling
- Validate card data (legendary creatures, commander planeswalkers)
- Cache responses when appropriate

## Component Guidelines

### File Naming
- Components: PascalCase (e.g., `LifeCounter.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useGameState.tsx`)
- Utilities: camelCase (e.g., `scryfall.ts`)

### Component Structure
```typescript
// 1. Imports
import { useState } from 'react';
import type { ComponentProps } from './types';

// 2. Types/Interfaces
interface Props {
  // ...
}

// 3. Component
export default function ComponentName({ prop1, prop2 }: Props) {
  // Hooks
  const [state, setState] = useState();
  
  // Event handlers
  const handleClick = () => {
    // ...
  };
  
  // Render
  return (
    // JSX
  );
}
```

### Custom Hooks Pattern
- Extract stateful logic into custom hooks
- Hooks should return clear, documented values
- Follow naming convention: `use[Feature]` (e.g., `useLifeCounter`)
- Keep hooks focused on single responsibility

## Future Database Integration

The application is structured for easy database integration:
- Look for `// TODO: Database integration` comments
- `/data/*.ts` files are placeholders for data layer
- `/app/api/*/route.ts` are prepared API endpoints
- When adding DB features, maintain current function signatures

## Key Features to Maintain

### Game State
- 2-4 player support with responsive layouts
- Turn tracking with visual indicators
- Comprehensive game event logging
- Session controls (start/end/reset with confirmation)

### Player Tracking
- Life counters with click-to-edit functionality
- Commander damage tracking (including partner commanders)
- Poison counter tracking with visual warnings
- Commander card integration via Scryfall

### UI/UX Principles
- Desktop-first design optimization
- Beautiful MTG card art backgrounds
- Smooth Tailwind animations
- Clear visual feedback for all interactions
- Slide-out sidebar pattern for game menu

## When Making Changes

1. **Understand Context**: Review related components and hooks before modifying
2. **Maintain Patterns**: Follow existing architectural patterns
3. **Type Safety**: Ensure full TypeScript coverage
4. **Test Thoroughly**: Verify in development mode (`npm run dev`)
5. **Check Build**: Run `npm run build` to catch type errors
6. **Lint Code**: Run `npm run lint` before committing
7. **Preserve Features**: Don't break existing functionality
8. **Document Changes**: Update README.md for significant feature additions

## Common Tasks

### Adding a New Component
1. Create in `components/` directory
2. Use TypeScript with proper prop types
3. Follow functional component pattern
4. Apply Tailwind for styling
5. Import and use in parent component

### Adding a New Hook
1. Create in `hooks/` directory
2. Name with `use` prefix
3. Document return values with TypeScript
4. Test in a component

### Modifying Game State
1. Update `hooks/useGameState.tsx`
2. Ensure type safety for state structure
3. Update related components
4. Test all affected features

### Scryfall API Changes
1. Modify `utils/scryfall.ts`
2. Maintain error handling
3. Update type definitions
4. Test with real API calls

## Performance Considerations

- Next.js automatically optimizes bundle size
- Use React.memo() for expensive components only when needed
- Lazy load components that aren't needed on initial render
- Keep component trees shallow where possible

## Accessibility

- Maintain semantic HTML structure
- Ensure interactive elements are keyboard accessible
- Provide clear visual feedback for actions
- Use appropriate ARIA labels where needed
