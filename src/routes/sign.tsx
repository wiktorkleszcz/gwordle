import { createFileRoute, Link } from '@tanstack/react-router'
import Form from '#/components/Form'
import Input from '#/components/Input'
import Button from '#/components/Button'

export const Route = createFileRoute('/sign')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  <div className='flex h-screen w-screen flex-col items-center justify-center bg-black'>
    {/* <h1 className='text-white'>Hello world</h1> */}
    <Form>
      <h1 className='flex flex-row justify-center text-4xl m-10 text-white'>Hello world</h1>
      <Input desc="Test"/>
      <Input desc="Test"/>
      <Input desc="Test"/>
      <Input desc="Test"/>
      <p className='flex flex-row justify-between gap-6 mt-10'>
        <Link to='/' className='w-full'>
          <Button classes='bg-stone-800 w-full text-white p-3 rounded-md min-w-24 hover:bg-orange-400 transition-colors'>Test</Button>
        </Link>
        <Link to="/game" className='w-full'>
          <Button classes='bg-stone-800 w-full text-white p-3 rounded-md min-w-24 hover:bg-green-500 transition-colors'>Test</Button>
        </Link>
      </p>
    </Form>
  </div>
  )
}
