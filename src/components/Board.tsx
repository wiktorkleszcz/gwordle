import { useGameSettings } from "#/store/GameSettingContext";
import { useEffect, useRef, useState } from "react";
import Row from "./Row";

// Board owns the typed letters and the active tile position for the game grid.
function createEmptyBoard(tries: number, length: number) {
    return Array.from({ length: tries }, () =>
        Array.from({ length }, () => "")
    )
}

export default function Board() {
    const {gameState} = useGameSettings();
    const boardRef = useRef<HTMLDivElement>(null)
    const [letters, setLetters] = useState(() =>
        createEmptyBoard(gameState.tries, gameState.length)
    )
    const [currentRow, setCurrentRow] = useState(0)
    const [currentCol, setCurrentCol] = useState(0)

    // When sliders change the grid size, rebuild the board and start from the first tile.
    useEffect(() => {
        setLetters(createEmptyBoard(gameState.tries, gameState.length))
        setCurrentRow(0)
        setCurrentCol(0)
    }, [gameState.tries, gameState.length])

    // Arrow navigation keeps the active tile inside the board and wraps left/right by row.
    function moveLeft() {
        if (currentCol > 0) {
            setCurrentCol((col) => col - 1)
        } else if (currentRow > 0) {
            setCurrentRow((row) => row - 1)
            setCurrentCol(gameState.length - 1)
        }
    }

    function moveRight() {
        if (currentCol < gameState.length - 1) {
            setCurrentCol((col) => col + 1)
        } else if (currentRow < gameState.tries - 1) {
            setCurrentRow((row) => row + 1)
            setCurrentCol(0)
        }
    }

    function moveUp() {
        if (currentRow > 0) {
            setCurrentRow((row) => row - 1)
        }
    }

    function moveDown() {
        if (currentRow < gameState.tries - 1) {
            setCurrentRow((row) => row + 1)
        }
    }

    // One keyboard handler controls letters, deleting, row changes, and arrow movement.
    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === "ArrowLeft") {
            moveLeft()
            return
        }

        if (e.key === "ArrowRight") {
            moveRight()
            return
        }

        if (e.key === "ArrowUp") {
            moveUp()
            return
        }

        if (e.key === "ArrowDown") {
            moveDown()
            return
        }

        if (/^[a-zA-Z]$/.test(e.key)) {
            setLetters((prev) => {
                // Copy every row so React sees a new board instead of a mutated old one.
                const next = prev.map((row) => [...row])
                next[currentRow][currentCol] = e.key.toUpperCase()
                return next
            })

            if (currentCol < gameState.length - 1) {
                setCurrentCol((col) => col + 1)
            } else if (currentRow < gameState.tries - 1) {
                setCurrentRow((row) => row + 1)
                setCurrentCol(0)
            }

            return
        }

        if (e.key === "Backspace") {
            setLetters((prev) => {
                // Backspace clears the current tile, or moves back and clears the previous tile.
                const next = prev.map((row) => [...row])

                if (next[currentRow][currentCol]) {
                    next[currentRow][currentCol] = ""
                    return next
                }

                if (currentCol > 0) {
                    next[currentRow][currentCol - 1] = ""
                    setCurrentCol((col) => col - 1)
                    return next
                }

                if (currentRow > 0) {
                    next[currentRow - 1][gameState.length - 1] = ""
                    setCurrentRow((row) => row - 1)
                    setCurrentCol(gameState.length - 1)
                }

                return next
            })

            return
        }

        if (e.key === "Enter" && currentRow < gameState.tries - 1) {
            setCurrentRow((row) => row + 1)
            setCurrentCol(0)
        }
    }

    return (
        <div
            ref={boardRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="w-240 h-240 bg-stone-800 rounded-xl flex flex-col justify-between items-center outline-none p-10"
        >   
            <h1 className="text-white text-6xl">Board</h1>
            <div className="flex flex-col justify-center items-center gap-2 h-full">
            {letters.map((row, i) => (
                <Row
                    key={i}
                    letters={row}
                    activeCol={currentRow === i ? currentCol : null}
                    onTileClick={(col) => {
                        // After clicking a tile, focus the board so keyboard input still works.
                        boardRef.current?.focus()
                        setCurrentRow(i)
                        setCurrentCol(col)
                    }}
                />
            ))}
            </div>
        </div>
    )
}