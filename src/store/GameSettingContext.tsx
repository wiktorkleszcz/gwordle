import { log } from "console";
import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from "react";

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

type GameSettingContextType = {
    gameState: GameState
    gameStateDispatch: Dispatch<GameAction>
}

const initialGameState: GameState = {
    stake: 0,
    length: 5,
    tries: 6,
    mode: 'manual',
}

function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
      case 'setStake':
        log("stake has changed")
        return { ...state, stake: action.value }
      case 'setLength':
        log("length has changed")
        return { ...state, length: action.value }
      case 'setTries':
        log("tires has changed")
        return { ...state, tries: action.value }
      case 'setMode':
        log("mode has changed")
        return { ...state, mode: action.value }
      default:
        return state
    } 
}

const GameSettingContext = createContext<GameSettingContextType | null>(null)

export function GameSettingProvider({ children }: {children: ReactNode}) {
    const [gameState, gameStateDispatch] = useReducer(gameReducer, initialGameState)

    return (
        <GameSettingContext.Provider value={{gameState, gameStateDispatch}}>
            {children}
        </GameSettingContext.Provider>
    )
}

export function useGameSettings() {
    const context = useContext(GameSettingContext)

    if (!context) {
        throw new Error('useGameSettings must be used inside GameSettingProvider')
    }

    return context
}