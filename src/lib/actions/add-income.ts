'use server'

import { IncomePayload, IncomeValidator } from '@/lib/validators'
import { revalidatePath } from 'next/cache'
import { getAuthSession } from '@/lib/auth'
import db from '@/lib/db'

export async function addIncomeAction(data: IncomePayload) {
  const session = await getAuthSession()
  if (!session?.user) {
    throw new Error('Unauthorized, Please Login First')
  }

  const body = await IncomeValidator.safeParseAsync(data)

  if (!body.success) {
    throw new Error(`Invalid request body`)
  }

  const { title, amount, date, type, description } = body.data

  await db.income.create({
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
