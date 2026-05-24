import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sign')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sign"!</div>
}
