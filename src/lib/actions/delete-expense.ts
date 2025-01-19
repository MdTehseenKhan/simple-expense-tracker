'use server'

import { getAuthSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import db from '@/lib/db'
import { z } from 'zod'

const bodySchema = z.object({ id: z.string() })

export async function deleteExpenseAction(data: z.infer<typeof bodySchema>) {
  const session = await getAuthSession()
  if (!session?.user) {
    throw new Error('Unauthorized, Please Login First')
  }

  const body = await bodySchema.safeParseAsync(data)

  if (!body.success) {
    throw new Error(`Invalid request body`)
  }
  const { id } = body.data

  const expense = await db.expense.findUnique({ where: { id } })
  if (!expense) throw new Error('Expense Not Found')

  await db.expense.delete({ where: { id } })
  revalidatePath('/dashboard')
}
