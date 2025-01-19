'use server'

import { z } from 'zod'
import bcrypt from 'bcrypt'
import db from '@/lib/db'

export async function signUpWithCredentialsAction(
  data: z.infer<ReturnType<typeof credentials>>
) {
  const body = await credentials().safeParseAsync(data)

  if (!body.success) {
    throw new Error(`Invalid request body`)
  }
  const hashedPassword = await bcrypt.hash(body.data.password, 10)

  const user = await db.user.findUnique({ where: { email: body.data.email } })
  if (user) {
    throw new Error(`User already registered!`)
  }
  const newUser = await db.user.create({
    data: {
      email: body.data.email,
      password: hashedPassword,
    },
  })
  await db.account.create({
    data: {
      userId: newUser.id,
      type: 'credentials',
      provider: 'credentials',
      providerAccountId: newUser.id,
    },
  })
}

function credentials() {
  return z.object({
    email: z.string().email(),
    password: z.string().min(7),
  })
}
