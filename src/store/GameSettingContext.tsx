import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from "react";

// This context stores settings shared by the controls panel and the board.
export type GameState = {
    stake: number,
    length: number,
    tries: number,
    mode: 'manual' | 'auto'
}

export type GameAction = 
| {type: 'setStake'; value: number}
| {type: 'setLength'; value: number}
| {type: 'setTries'; value: number}
| {type: 'setMode'; value: GameState['mode']}

export const STAKE_LIMITS = {
    min: 0,
    max: 100,
}

type GameSettingContextType = {
    gameState: GameState
    gameStateDispatch: Dispatch<GameAction>
}

// Initial settings decide the first board size and selected play mode.
const initialGameState: GameState = {
    stake: 0,
    length: 5,
    tries: 6,
    mode: 'manual',
}

function clampStake(value: number) {
    if (!Number.isFinite(value)) {
        return STAKE_LIMITS.min
    }

    return Math.min(Math.max(value, STAKE_LIMITS.min), STAKE_LIMITS.max)
}

// Reducer is the only place where game settings are changed.
function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
      case 'setStake':
        return { ...state, stake: clampStake(action.value) }
      case 'setLength':
        return { ...state, length: action.value }
      case 'setTries':
        return { ...state, tries: action.value }
      case 'setMode':
        return { ...state, mode: action.value }
      default:
        return state
    } 

    return state
}

const GameSettingContext = createContext<GameSettingContextType | null>(null)

// Provider makes game settings available to every component inside the game route.
export function GameSettingProvider({ children }: {children: ReactNode}) {
    const [gameState, gameStateDispatch] = useReducer(gameReducer, initialGameState)

    return (
        <GameSettingContext.Provider value={{gameState, gameStateDispatch}}>
            {children}
        </GameSettingContext.Provider>
    )
}

// Hook gives components safe access to the settings context.
export function useGameSettings() {
    const context = useContext(GameSettingContext)

    if (!context) {
        throw new Error('useGameSettings must be used inside GameSettingProvider')
    }

    return context
}