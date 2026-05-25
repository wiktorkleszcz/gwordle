import Row from "./Row"

type BoardProps = {
    rows: string[]
    activeRow: number
    onRowClick: (rowIndex: number) => void
}

export default function Board({ rows, activeRow, onRowClick }: BoardProps) {
    return (
        <div className="flex flex-col gap-6 justify-center items-center h-180 w-180 bg-stone-900 rounded-2xl">
            {rows.map((letters, index) => (
                <Row
                    key={index}
                    letters={letters}
                    isActive={activeRow === index}
                    onCellClick={() => onRowClick(index)}
                />
            ))}
        </div>
    )
}