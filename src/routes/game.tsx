import Board from '#/components/Board'
import Form from '#/components/Form'
import Header from '#/components/Header'
import Input from '#/components/Input'
import { createFileRoute } from '@tanstack/react-router'
import { useReducer } from 'react'

export const Route = createFileRoute('/game')({
  component: RouteComponent,
})

type GameState = {
  stake: number,
  length: number,
  tries: number,
  mode: 'manual' | 'auto'
}

type GameAction = 
  | {type: 'setStake'; value: number}
  | {type: 'setLength'; value: number}
  | {type: 'setTries'; value: number}
  | {type: 'setMode'; value: GameState['mode']}

  const initialGameState: GameState = {
    stake: 0,
    length: 5,
    tries: 6,
    mode: 'manual',
  }

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'setStake':
      return { ...state, stake: action.value }
    case 'setLength':
      return { ...state, length: action.value }
    case 'setTries':
      return { ...state, tries: action.value }
    case 'setMode':
      return { ...state, mode: action.value }
    default:
      return state
  } 
}

function RouteComponent() {
  const [gameState, gameStateDispatch] = useReducer(gameReducer, initialGameState)
  return (
    <div className='flex flex-col gap-2 bg-gradient-to-br from-black via-black to-green-500 w-screen h-screen overflow-hidden'>
        <Header link='/'/>
        <main className='flex flex-row justify-center items-center h-full'>
            <div className='flex flex-col justify-between content-center p-6 bg-stone-800 w-80 gap-2 rounded-2xl'>
            <h1 className='flex flex-row justify-center text-white text-3xl'>Let's Play!</h1>
            <Input type='number' desc='Stake' onChange={(event)=> gameStateDispatch({type: 'setStake', value: Number(event.target.value)})}/>
            <div className='flex flex-row gap-2'>
                <Input type='number' desc='Length' onChange={(event)=> gameStateDispatch({type: 'setLength', value: Number(event.target.value)})}/>
                <Input type='number' desc='Tries'onChange={(event)=> gameStateDispatch({type: 'setTries', value: Number(event.target.value)})}/>
            </div>
            <div className='flex flex-col items-between gap-2'>
                <label className='text-white'>Profit/Lose Graph</label>
                <div className='bg-black h-68 w-68 rounded-md flex flex-row justify-center items-center'>
                    <p className='text-white'>There will be sumn. WIP</p>
                </div>
            </div>
            <div className='flex flex-col items-between gap-2'>
                <label className='text-white'>Manual/Auto</label>
                <div className='flex flex-row justify-center'>
                    <button 
                      type='button'
                      className={`${gameState.mode === "manual" ? "bg-green-500" : "bg-black"} hover:bg-stone-900 text-white p-3 rounded-bl-md rounded-tl-md min-w-24 transition-colors w-full`}
                      onClick={() => gameStateDispatch({type: 'setMode', value: 'manual'})}
                      >
                        Manual
                      </button>
                    <button 
                      type='button'
                      className={`${gameState.mode === "auto" ? "bg-green-500" : "bg-black"} hover:bg-stone-900 text-white p-3 rounded-br-md rounded-tr-md min-w-24 transition-colors w-full`}
                      onClick={() => gameStateDispatch({type: 'setMode', value: 'auto'})}
                      >
                        Autoplay
                      </button>
                </div>
            </div>
            </div>
            <Board />
        </main>
    </div>
  )
}
