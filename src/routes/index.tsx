import { createFileRoute, Link } from '@tanstack/react-router'
import Header  from '#/components/Header'
import Button from '#/components/Button'
import logo from '../../public/a680dd9e-bc1e-406b-a61b-a4e7521f9721.png'
import { useState } from 'react'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const[isHovered, setIsHovered] = useState(false)

  return (
    <div className={`flex flex-col-reverse justify-between bg-gradient-to-br ${isHovered ? "from-black via-black to-green-500" : "from-orange-400 via-black to-black"} h-screen transition-colors duration-500`}>
      <h1 className="text-6xl font-bold text-white m-24">Welcome to GWRDL!</h1>
      <Header>
        <img src={logo} alt="Logo" className="h-full w-auto" />
        <Link to="/sign" className="absolute right-4">
          <Button classes="bg-stone-900 text-white p-3 rounded-md min-w-24 hover:bg-green-500 transition-colors" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Sign</Button>
        </Link>
      </Header>
    </div>

  )
}
