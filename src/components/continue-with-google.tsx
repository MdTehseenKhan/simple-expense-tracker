'use client'

import { useState } from 'react'

import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Google } from '@/components/icons/google'

const ContinueWithGoogle = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loginWithGoogle = () => {
    setIsLoading(true)

    signIn('google', { callbackUrl: '/dashboard' })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false))
  }

  return (
    <Button
      type="button"
      isLoading={isLoading}
      onClick={loginWithGoogle}
      variant="ghost"
      className="border border-border"
    >
      {!isLoading && <Google className="h-5 w-5 mr-2" />}
      Continue with Google
    </Button>
  )
}

export default ContinueWithGoogle
