import Tile from "./Tile"
import { useGameSettings } from "#/store/GameSettingContext"

// Row receives one row of letters and renders one tile per character slot.
type RowProps = {
    letters: string[]
    activeCol: number | null
    onTileClick: (col: number) => void
}

// Fewer tries are harder, so they pay a higher multiplier.
const rowCountMultipliers: Record<number, number> = {
    1: 3.5,
    2: 3.0,
    3: 2.5,
    4: 2.0,
    5: 1.5,
    6: 1.0,
}

// Longer words are harder, so they pay a higher multiplier.
const rowLetterMultipliers: Record<number, number> = {
    3: 1.0,
    4: 1.25,
    5: 1.5,
    6: 2.0,
    7: 2.75,
    8: 3.5,
}

export default function Row({letters, activeCol, onTileClick}: RowProps) {
    const {gameState} = useGameSettings()
    const rowCountMultiplier = rowCountMultipliers[gameState.tries] ?? 1
    const rowLetterMultiplier = rowLetterMultipliers[gameState.length] ?? 1

    return (
        <div className="flex flex-row gap-2 justify-evenly items-center">
            <p className="text-white text-2xl">x{rowCountMultiplier.toFixed(2)}</p>
            {letters.map((letter, i) => (
                <Tile 
                    key={i} 
                    value={letter}
                    active={activeCol === i}
                    // Tell the board which column was clicked; the board owns active position.
                    onClick={() => onTileClick(i)}
                />
            ))}
            <p className="text-white text-2xl">x{rowLetterMultiplier.toFixed(2)}</p>
        </div>
    )
}