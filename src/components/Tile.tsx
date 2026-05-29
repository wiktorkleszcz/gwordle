import type { LetterStatus } from "#/store/BoardContext"

// Tile is a presentational square: it displays a letter, colors itself by its
// check status, and highlights when it is the active tile.
type TileProps = {
    value: string
    status: LetterStatus | null
    active: boolean
    onClick: () => void
}

// Background color reflects the result of checking the guessed letter.
const STATUS_CLASS: Record<LetterStatus, string> = {
    correct: "bg-green-600",
    present: "bg-yellow-600",
    absent: "bg-stone-700",
}

export default function Tile({value, status, active, onClick}: TileProps) {
    const background = status ? STATUS_CLASS[status] : "bg-stone-900"

    return (
        <div 
            className={`flex flex-col justify-center items-center w-22 h-22 rounded-xl text-6xl text-white cursor-pointer ${background} ${active ? "outline-2 outline-offset-2 outline-green-500" : ""}`}
            onClick={onClick}
        >
            {value}
        </div>
    )
}
