# GWRDL

GWRDL is a Wordle-inspired web game prototype built with React, TypeScript, Vite, TanStack Router, and Tailwind CSS.

The main idea of the project is to combine a Wordle-style guessing board with betting-like game settings. The player can choose a stake, change the word length, change the number of tries, fill the board with guesses, and receive a payout based on calculated multipliers.

## Current Features

- Home page with simple animated UI.
- Sign in / sign up screen layout.
- Main game screen.
- Configurable stake, word length, and tries.
- Manual and autoplay game modes.
- Wordle-style board input.
- Tile statuses: correct, present, and absent.
- Letter, length, tries, and final payout multipliers.
- Dark skeuomorphic/neumorphic UI style using custom shadows.

## Planned Features

This project is still in development. The next planned parts include:

- Real form handling and validation.
- Improved skeuomorphic slider UI.
- Profile routes for user account pages.
- Backend for users and saved data.
- User data storage.
- Possible game statistics.
- Database structure for users, games, stats, and other data.

The exact backend and database structure is still TBD.

## Running The Project

Install dependencies:

```bash
bun install
```

Start the development server:

```bash
bun --bun run dev
```

Build the project:

```bash
bun --bun run build
```

Run tests:

```bash
bun --bun run test
```

## Project Status

At the moment, GWRDL is mainly a frontend prototype. Authentication, profiles, backend logic, database storage, and full validation are planned but not finished yet.
