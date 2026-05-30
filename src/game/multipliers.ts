// Pure multiplier math for the betting layer. No React, no game state, and no
// dependency on the secret solution: every value here is a deterministic
// "odds" function of public info (the letter, its position, the board size).
// That is what lets us show live multipliers without breaking the anti-peek
// design. All numbers are intentionally simple and centralized here for tuning.

// Base letter value by rarity: common letters pay little, rare ones pay a lot.
const LETTER_BASE: Record<string, number> = {
    // common
    E: 1.2, A: 1.2, R: 1.2, I: 1.2, O: 1.2, T: 1.2, N: 1.2, S: 1.2,
    // mid
    L: 1.8, C: 1.8, U: 1.8, D: 1.8, P: 1.8, M: 1.8,
    H: 1.8, G: 1.8, B: 1.8, F: 1.8, Y: 1.8, W: 1.8,
    // rare
    K: 3.5, V: 3.5, X: 3.5, Z: 3.5, J: 3.5, Q: 3.5,
}

const DEFAULT_LETTER_BASE = 1

// Position nudges the value up a little toward the end of the word, normalized
// by length so the effect is the same shape for every board size (0% .. +15%).
export function positionFactor(position: number, length: number): number {
    const span = Math.max(length - 1, 1)
    return 1 + 0.15 * (position / span)
}

// Multiplier shown inside a single tile: letter rarity scaled by its position.
export function letterMultiplier(letter: string, position: number, length: number): number {
    const base = LETTER_BASE[letter.toUpperCase()] ?? DEFAULT_LETTER_BASE
    return base * positionFactor(position, length)
}

// Longer words are harder, so they pay more.
export function lengthMultiplier(length: number): number {
    return 1 + 0.25 * (length - 3)
}

// Fewer tries are harder, so they pay more (6 tries = baseline).
export function triesMultiplier(tries: number): number {
    return 1 + 0.3 * Math.max(6 - tries, 0)
}

export function formatMultiplier(value: number): string {
    return `\u00d7${value.toFixed(2)}`
}
