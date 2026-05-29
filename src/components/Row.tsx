import Tile from "./Tile"
import type { LetterStatus } from "#/store/BoardContext"

// Row receives one row of letters and renders one tile per character slot.
type RowProps = {
    letters: string[]
    statuses: (LetterStatus | null)[]
    activeCol: number | null
    onTileClick: (col: number) => void
}

export default function Row({letters, statuses, activeCol, onTileClick}: RowProps) {
    return (
        <div className="flex flex-row gap-2 justify-evenly items-center">
            {letters.map((letter, i) => (
                <Tile 
                    key={i} 
                    value={letter}
                    status={statuses[i]}
                    active={activeCol === i}
                    // Tell the board which column was clicked; the board owns active position.
                    onClick={() => onTileClick(i)}
                />
            ))}
        </div>
    )
}
