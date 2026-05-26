type RowProps = {
    letters: string
    isActive: boolean
    onCellClick: () => void
    lettersNum: number
}

export default function Row({ letters, isActive, onCellClick, lettersNum }: RowProps) {
    return (
        <div className="flex flex-row gap-2 justify-evenly items-center">
            {Array.from({ length: lettersNum }).map((_, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={onCellClick}
                    className={`flex w-20 h-20 items-center justify-center rounded-xl bg-stone-800 text-4xl font-bold text-white transition-colors ${
                        isActive ? 'ring-2 ring-green-500' : ''
                    }`}
                >
                    {letters[index] ?? ''}
                </button>
            ))}
        </div>
    )
}