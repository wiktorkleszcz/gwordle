import Tile from "./Tile"
import type { GamePhase } from "#/store/BoardContext"

// SolutionRow sits under the guess grid. While the player types it stays hidden
// behind "?" placeholders; once the game is in 'result' it reveals the word.
type SolutionRowProps = {
    // null while typing (the word is only drawn at submit time).
    solution: string | null
    length: number
    phase: GamePhase
}

// Build the tiles for the current phase: "?" everywhere during input, and the
// solution letters once revealed. The word is sliced/padded to the board width
// so it always lines up with the grid.
function buildTiles(solution: string | null, length: number, phase: GamePhase): string[] {
    if (phase === 'input' || !solution) {
        return Array.from({ length }, () => "?")
    }

    const letters = solution.toUpperCase().split("")
    return Array.from({ length }, (_, i) => letters[i] ?? "?")
}

export default function SolutionRow({ solution, length, phase }: SolutionRowProps) {
    const tiles = buildTiles(solution, length, phase)

    return (
        <div className="flex flex-row gap-2 justify-evenly items-center">
            {tiles.map((value, i) => (
                // Solution tiles are display-only: no status, no odds, never active.
                <Tile key={i} value={value} status={null} multiplier={null} active={false} solution={true} onClick={() => {}} />
            ))}
        </div>
    )
}
