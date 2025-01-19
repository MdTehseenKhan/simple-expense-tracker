import { LoaderCircle } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen w-full grid place-items-center bg-background">
      <LoaderCircle className="h-12 w-12 text-primary animate-spin" />
    </div>
  )
}
