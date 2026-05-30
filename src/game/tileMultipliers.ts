import { letterMultiplier } from "#/game/multipliers";

// Turns the board letters into the multiplier shown on each tile.
//   null -> empty tile, render nothing
//   0    -> a duplicate (same letter in the same column on an earlier row);
//           it has already been claimed, so it pays nothing (x0.00)
//   >0   -> the live multiplier for that letter at that position
//
// "Counts once" rule (current, simplified): de-duplicate by (letter, column).
// The first occurrence top-to-bottom keeps its multiplier; later identical
// (letter, column) tiles are zeroed. Like everything here it is solution-
// independent, so it is safe to compute and show during typing.
export function computeTileMultipliers(letters: string[][], length: number): (number | null)[][] {
    const claimed = new Set<string>()

    return letters.map((row) =>
        row.map((letter, col) => {
            if (letter === "") return null

            const key = `${letter.toUpperCase()}@${col}`
            if (claimed.has(key)) return 0

            claimed.add(key)
            return letterMultiplier(letter, col, length)
        })
    )
}
