// Tile is a presentational square: it displays a letter and highlights when active.
type TileProps = {
    value: string
    active: boolean
    onClick: () => void
}

export default function Tile({value, active, onClick}: TileProps) {
    return (
        <div 
            className={`flex flex-col justify-center items-center w-22 h-22 rounded-xl text-6xl text-white bg-stone-900 cursor-pointer ${active ? "outline-2 outline-offset-2 outline-green-500" : ""}`}
            onClick={onClick}
        >
            {value}
        </div>
    )
}