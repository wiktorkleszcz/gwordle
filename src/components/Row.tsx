type RowProps = {
    wordLength: number
}

export default function Row({wordLength}: RowProps) {
    return (
        <div className="flex flex-row gap-2 justify-evenly items-center">
            {Array.from({ length: wordLength }).map((_, i) => (
                <div key={i} className="w-25 h-25 bg-stone-900 rounded-xl" />
            ))}
        </div>
    )
}