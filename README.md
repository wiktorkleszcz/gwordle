# GWRDL

GWRDL is a Wordle-inspired web game prototype. You configure stake, word length, and number of tries, play on a Wordle-style board, and see payouts from letter/length/tries multipliers. The UI uses a dark neumorphic style.

## Disclaimer

**GWRDL is a parody and a design experiment, not a gambling product.**

- **No real money.** Stakes, payouts, and balances are fictional UI only. This project does not accept wagers, does not pay out prizes, and **never will** operate with real currency or real-world value.
- **Anti-gambling stance.** The author is strictly against gambling and does not encourage betting or games of chance for money.
- **Why the “betting” skin exists.** The point is to show how familiar, skill-based games (here, Wordle-style guessing) can be reframed with stakes and multipliers until they *feel* like gambling — even when the core loop is still “just a game.” GWRDL is meant as a cautionary example: almost any game can be dressed up as a gambling product; that does not make it ethical or safe to do so in the real world.

If you use this repo, treat all monetary language as satire and keep play offline and pretend-only.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** — dev server and production build
- **TanStack Router** — file-based routes (`/`, `/sign`, `/game`)
- **TanStack Form** + **Zod** — sign-in / sign-up field validation
- **Tailwind CSS v4** — layout and styling
- **Vitest** + Testing Library — unit tests

Package manager: **Bun** (see scripts below; npm/pnpm also work if you prefer).

## What works today

### Game (`/game`)

- Adjustable **stake**, **word length**, and **tries**
- **Manual** and **auto** play modes (auto loop in context)
- Wordle-style **board** with correct / present / absent tile states
- **Multipliers** for letters, length, tries, and final payout
- Play gated when stake is invalid; board resets when settings change

### Auth UI (`/sign`)

- Toggle between **sign in** and **sign up** layouts
- **TanStack Form** with per-field validators:
  - Email, username, password — **Zod** schemas
  - Repeat password — match check against password field
- **500ms debounced** `onChangeAsync` validation (errors after you pause typing)
- Submit disabled until the visible form is valid; successful submit navigates to `/game` (no real backend yet)

### Other

- **Home** (`/`) — landing page with animated gradient header CTA to sign

## Routes

| Path    | Purpose                          |
| ------- | -------------------------------- |
| `/`     | Home                             |
| `/sign` | Sign in / sign up (client-only)  |
| `/game` | Main game                        |

## Planned work

- Real authentication and session handling
- Profile / account routes
- Backend API and persistence (users, games, stats)
- Richer skeuomorphic controls (e.g. stake slider polish)
- Game history and statistics

## Getting started

Install dependencies:

```bash
bun install
```

Run the dev server (port **3000**):

```bash
bun run dev
```

Production build:

```bash
bun run build
```

Preview production build:

```bash
bun run preview
```

Run tests:

```bash
bun run test
```

## Project layout (high level)

```
src/
  routes/          # TanStack Router pages
  components/      # UI (Board, Input, formComponents/, …)
  game/            # Word bank, multipliers, tile logic
  store/           # React context (board, game settings)
```

## Status

Frontend-first prototype: game logic and sign UI run entirely in the browser. Auth does not call a server; validation and `canSubmit` are local only. Backend and database design are still open.
