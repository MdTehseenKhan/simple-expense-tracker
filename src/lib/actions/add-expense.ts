'use server'

import { ExpensePayload, ExpenseValidator } from '@/lib/validators'
import { revalidatePath } from 'next/cache'
import { getAuthSession } from '@/lib/auth'
import db from '@/lib/db'

export async function addExpenseAction(data: ExpensePayload) {
  const session = await getAuthSession()
  console.log({ session })
  if (!session?.user) {
    throw new Error('Unauthorized, Please Login First')
  }

  const body = await ExpenseValidator.safeParseAsync(data)

  if (!body.success) {
    throw new Error(`Invalid request body`)
  }

  const { title, amount, date, type, description } = body.data
  await db.expense.create({
    data: {
      title,
      amount,
      date,
      type,
      description,
      userId: session.user.id,
    },
  })
  revalidatePath('/dashboard')
}
