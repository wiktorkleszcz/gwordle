import Board from '#/components/Board'
import Header from '#/components/Header'
import { createFileRoute } from '@tanstack/react-router'
import { GameSettingProvider} from '#/store/GameSettingContext'
import Actions from '#/components/Actions'

export const Route = createFileRoute('/game')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex flex-col gap-2 bg-gradient-to-br from-black via-black to-green-500 w-screen h-screen overflow-hidden'>
        <Header link='/'/>
        <main className='flex flex-row justify-center items-center h-full gap-2'>
          <GameSettingProvider>
            <Actions />
            <Board />
          </GameSettingProvider>
        </main>
    </div>
  )
}