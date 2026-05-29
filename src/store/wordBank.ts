// Source of solution words, grouped by length so the board can always find a
// word that matches the current "length" setting (3-8, see the Length slider).
// Kept as a plain module (no React) so it is trivial to swap for an API later.
const WORD_BANK: Record<number, string[]> = {
    3: ["CAT", "DOG", "SUN", "BOX", "FLY", "ICE", "JOY", "KEY", "RUN", "TOP"],
    4: ["TREE", "BLUE", "FROG", "GAME", "LAMP", "MOON", "RAIN", "SHIP", "WIND", "GOLD"],
    5: ["REACT", "APPLE", "BRAIN", "CRANE", "GHOST", "LEMON", "MUSIC", "PLANT", "RIVER", "STORM"],
    6: ["BANANA", "CASTLE", "DRAGON", "FOREST", "GARDEN", "MARKET", "ORANGE", "PLANET", "ROCKET", "WINTER"],
    7: ["BICYCLE", "CAPTAIN", "DIAMOND", "JOURNEY", "MACHINE", "NETWORK", "PICTURE", "RAINBOW", "TEACHER", "VICTORY"],
    8: ["AIRPLANE", "BUILDING", "DINOSAUR", "ELEPHANT", "MOUNTAIN", "NOTEBOOK", "SANDWICH", "TREASURE", "UMBRELLA", "VACATION"],
}

// Pick a random word of the given length. `exclude` (the previous solution)
// is avoided so a new game does not repeat the word back-to-back, unless the
// list is too small to offer an alternative.
export function pickWord(length: number, exclude?: string | null): string {
    const words = WORD_BANK[length] ?? []

    if (words.length === 0) {
        // No bank for this size yet: fall back to a placeholder of right length.
        return "?".repeat(length)
    }

    const candidates =
        words.length > 1 && exclude
            ? words.filter((word) => word !== exclude)
            : words

    const index = Math.floor(Math.random() * candidates.length)
    return candidates[index]
}
