'use client'

import { Toaster } from 'sonner'
import { SessionProvider } from 'next-auth/react'
import { TooltipProvider } from '@/components/ui/tooltip'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <TooltipProvider>
        {children}
      </TooltipProvider>
      <Toaster position="top-center" />
    </SessionProvider>
  )
}

export default Providers
