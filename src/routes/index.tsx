import { createFileRoute } from '@tanstack/react-router'
import Header  from '#/components/Header'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="flex flex-col-reverse justify-between bg-black h-screen">
      <h1 className="text-6xl font-bold text-white m-24">Welcome to Gwordle!</h1>
      <Header />
    </div>

  )
}
