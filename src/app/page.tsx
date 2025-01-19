import Image from 'next/image'
import { AuthForm } from '@/components/ui/auth-form'
import { redirect } from 'next/navigation'
import { getAuthSession } from '@/lib/auth'

export default async function Home() {
  const session = await getAuthSession()
  if (session) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* Left Section */}
      <section className="grid place-items-center m-10">
        <AuthForm />
      </section>

      {/* Right Section */}
      <section className="p-4 hidden lg:block">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src="/signup.jpg"
            alt="Sign Up"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </main>
  )
}
