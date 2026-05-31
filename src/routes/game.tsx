import Board from '#/components/Board'
import Header from '#/components/Header'
import { createFileRoute } from '@tanstack/react-router'
import { GameSettingProvider} from '#/store/GameSettingContext'
import { BoardProvider } from '#/store/BoardContext'
import Actions from '#/components/Actions'
import { useState } from 'react'

// Game route connects the settings panel and board through GameSettingProvider.
export const Route = createFileRoute('/game')({
  component: RouteComponent,
})

function RouteComponent() {
  const[isHovered, setIsHovered] = useState(false)
  return (
    <div className={`flex flex-col gap-2 bg-stone-800 transition-colors w-screen h-screen overflow-hidden`}>
        <Header link='/' onHover={setIsHovered} classes='bg-stone-800 text-white p-3 rounded-md min-w-24 shadow-[-1px_-1px_2px_rgba(255,255,255,0.2),1px_1px_2px_rgba(0,0,0,0.5)]'/>
        <main className='flex flex-row justify-center items-center h-full gap-10'>
          {/* Actions and Board share the same settings context here. */}
          {/* BoardProvider sits inside GameSettingProvider so it can read the grid size. */}
          <GameSettingProvider>
            <BoardProvider>
              <Actions />
              <Board />
            </BoardProvider>
          </GameSettingProvider>
        </main>
    </div>
  )
}