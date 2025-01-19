import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

import { Dashboard } from './components/dashboard'
import { Navbar } from '@/components/ui/navbar'
import db from '@/lib/db'

export const metadata = {
  title: 'Dashboard | Expense Tracker',
  description: '...',
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/')

  const userId = session?.user.id

  const incomes = await getIncomes(userId)
  const expenses = await getExpenses(userId)

  return (
    <main className="min-h-screen">
      <Navbar user={session.user} />

      <div className="xl:container xl:mx-auto">
        <Dashboard incomes={incomes} expenses={expenses} />
      </div>
    </main>
  )
}

async function getIncomes(userId: string) {
  return db.income.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

async function getExpenses(userId: string) {
  return db.expense.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}
