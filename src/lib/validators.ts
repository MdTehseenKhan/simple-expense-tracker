import { ExpenseType, IncomeType } from '@prisma/client'
import { z } from 'zod'

export const IncomeValidator = z.object({
  title: z
    .string()
    .max(26, { message: 'Title must be at least 26 characters' }),
  amount: z.preprocess((x) => (x ? x : undefined), z.coerce.number().int()),
  type: z.nativeEnum(IncomeType).optional(),
  date: z.coerce.date().optional(),
  description: z
    .string()
    .max(150, { message: 'Title must be at least 50 characters' }),
})
export type IncomePayload = z.infer<typeof IncomeValidator>

export const ExpenseValidator = z.object({
  title: z
    .string()
    .max(26, { message: 'Title must be at least 26 characters' }),
  amount: z.preprocess((x) => (x ? x : undefined), z.coerce.number().int()),
  type: z.nativeEnum(ExpenseType).optional(),
  date: z.coerce.date().optional(),
  description: z
    .string()
    .max(150, { message: 'Title must be at least 50 characters' }),
})
export type ExpensePayload = z.infer<typeof ExpenseValidator>
