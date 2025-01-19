import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Providers from '@/components/providers'

import { cn } from '@/lib/utils'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Expense Tracker',
  description: '...',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn('text-gray-900 antialiased', inter.className)}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
