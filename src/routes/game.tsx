import { createFileRoute, Link } from '@tanstack/react-router'
import { useRef, useState, type KeyboardEvent } from 'react'
import Header from '#/components/Header'
import Button from '#/components/Button'
import Input from '#/components/Input'
import Form from '#/components/Form'
import logo from '../../public/a680dd9e-bc1e-406b-a61b-a4e7521f9721.png'
import Board from '#/components/Board'

export const Route = createFileRoute('/game')({
  component: RouteComponent,
})

const defaultRowCount = 6
const minRowCount = 0
const maxRowCount = 6
const wordLength = 5
type GameMode = 'manual' | 'auto'

function RouteComponent() {
  const [rowCount, setRowCount] = useState(defaultRowCount)
  const [guesses, setGuesses] = useState(() => Array<string>(defaultRowCount).fill(''))
  const [activeRow, setActiveRow] = useState(0)
  const [gameMode, setGameMode] = useState<GameMode>('manual')
  const boardRef = useRef<HTMLDivElement>(null)

  function focusRow(rowIndex: number) {
    setActiveRow(rowIndex)
    requestAnimationFrame(() => boardRef.current?.focus())
  }

  function handleBoardKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (rowCount === 0) {
      return
    }

    if (event.key === 'Backspace') {
      event.preventDefault()
      setGuesses((currentGuesses) => {
        const nextGuesses = [...currentGuesses]

        if (nextGuesses[activeRow].length > 0) {
          nextGuesses[activeRow] = nextGuesses[activeRow].slice(0, -1)
          return nextGuesses
        }

        if (activeRow > 0) {
          const previousRow = activeRow - 1
          nextGuesses[previousRow] = nextGuesses[previousRow].slice(0, -1)
          setActiveRow(previousRow)
          requestAnimationFrame(() => boardRef.current?.focus())
        }

        return nextGuesses
      })
      return
    }

    if (!/^[a-z]$/i.test(event.key) || guesses[activeRow].length >= wordLength) {
      return
    }

    event.preventDefault()
    setGuesses((currentGuesses) => {
      const nextGuesses = [...currentGuesses]
      const nextGuess = `${nextGuesses[activeRow]}${event.key.toUpperCase()}`
      nextGuesses[activeRow] = nextGuess

      if (nextGuess.length === wordLength && activeRow < rowCount - 1) {
        setActiveRow(activeRow + 1)
      }

      return nextGuesses
    })
  }

  function handleRowCountChange(value: string) {
    const valueAsNumber = Number(value)
    const nextRowCount = Number.isNaN(valueAsNumber)
      ? minRowCount
      : Math.min(maxRowCount, Math.max(minRowCount, valueAsNumber))

    setRowCount(nextRowCount)
    setGuesses((currentGuesses) => {
      const nextGuesses = Array<string>(nextRowCount).fill('')

      currentGuesses.slice(0, nextRowCount).forEach((guess, index) => {
        nextGuesses[index] = guess
      })

      return nextGuesses
    })
    setActiveRow((currentActiveRow) => Math.max(0, Math.min(currentActiveRow, nextRowCount - 1)))
  }

  return (
  <div className="relative flex h-screen flex-col bg-gradient-to-br from-black via-black via-65% to-green-500">
    <Header>
      <Link to="/" className="absolute left-4">
        <Button classes="bg-stone-900 text-white p-3 rounded-md min-w-24 hover:bg-green-500 transition-colors">Home</Button>
      </Link>
      <img src={logo} alt="Logo" className="h-10 w-auto" />
    </Header>
    <div className="flex flex-row items-center justify-center h-full m-4 gap-6">
      <Form width="w-2xs">
        <div className='flex flex-row justify-between gap-6 my-3'>
            <Input type="number" desc="Tries" min={minRowCount} max={maxRowCount} value={rowCount} onChange={(event) => handleRowCountChange(event.target.value)}/>
            <Input type="number" desc="Stake"/>
        </div>
        <div className='flex flex-row justify-center my-3'>
            <Button type="button" classes={`${gameMode === 'manual' ? 'bg-green-500' : 'bg-stone-800'} text-white p-3 min-w-24 transition-colors rounded-tl-md rounded-bl-md`} onClick={() => setGameMode('manual')}>Manual</Button>
            <Button type="button" classes={`${gameMode === 'auto' ? 'bg-green-500' : 'bg-stone-800'} text-white p-3 min-w-24 transition-colors rounded-tr-md rounded-br-md`} onClick={() => setGameMode('auto')}>Auto</Button>
        </div>
        <Button type="button" classes="bg-stone-800 text-white p-3 rounded-md min-w-24 hover:bg-green-500 transition-colors">Submit</Button>
      </Form>
      <div
        ref={boardRef}
        tabIndex={0}
        onKeyDown={handleBoardKeyDown}
        className="outline-none"
      >
        <Board rows={guesses} activeRow={activeRow} onRowClick={focusRow} />
      </div>
    </div>
  </div>
  )
}
