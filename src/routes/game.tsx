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
    <div className={`flex flex-col gap-2 bg-gradient-to-br from-black via-black ${isHovered ? "to-red-500" : "to-green-500"} transition-colors w-screen h-screen overflow-hidden`}>
        <Header link='/' onHover={setIsHovered}/>
        <main className='flex flex-row justify-center items-center h-full gap-2'>
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