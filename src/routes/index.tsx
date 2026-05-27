import { createFileRoute } from '@tanstack/react-router'
import Header  from '#/components/Header'
import { useState } from 'react'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const[isHovered, setIsHovered] = useState(false)
  return (
    <div className={`overflow-hidden flex flex-col-reverse justify-between bg-gradient-to-br ${isHovered ? "from-black via-black to-green-500" : "from-orange-400 via-black to-black"} h-screen transition-colors duration-500`}>
      <h1 className="text-6xl font-bold text-white m-24">Welcome to GWRDL!</h1>
      <Header link="/sign" onHover={setIsHovered}/>
    </div>

  )
}
