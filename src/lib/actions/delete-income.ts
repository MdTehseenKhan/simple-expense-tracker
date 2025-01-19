'use server'

import { getAuthSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import db from '@/lib/db'
import { z } from 'zod'

const bodySchema = z.object({ id: z.string() })

export async function deleteIncomeAction(data: z.infer<typeof bodySchema>) {
  const session = await getAuthSession()
  if (!session?.user) {
    throw new Error('Unauthorized, Please Login First')
  }

  const body = await bodySchema.safeParseAsync(data)

  if (!body.success) {
    throw new Error(`Invalid request body`)
  }
  const { id } = body.data

  const income = await db.income.findUnique({ where: { id } })
  if (!income) throw new Error('Income Not Found')

  await db.income.delete({ where: { id } })
  revalidatePath('/dashboard')
}
