'use client'

import { FC } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { ExpenseType } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { InputForm } from '@/components/ui/input-form'
import { ExpensePayload, ExpenseValidator } from '@/lib/validators'
import { addExpenseAction } from '@/lib/actions/add-expense'

interface AddExpenseformProps {
  balance: number
  onAddExpense: VoidFunction
}

export const AddExpenseForm: FC<AddExpenseformProps> = ({
  balance,
  onAddExpense,
}) => {
  const form = useForm<ExpensePayload>({
    resolver: zodResolver(ExpenseValidator),
    defaultValues: {
      title: '',
      amount: 0,
      description: '',
      type: ExpenseType.FOOD,
    },
  })

  function onSubmit(data: ExpensePayload) {
    if (balance < data.amount) {
      return toast.error('Insufficient balance')
    }

    const promise = addExpenseAction(data)
    toast.promise(promise, {
      loading: 'Adding Expense...',
      success: () => {
        form.reset()
        onAddExpense()
        return 'Expense successfully added!'
      },
      error: (err) => `Error adding expense! ${(err as Error).message}`,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 text-sm"
      >
        <InputForm form={form} types={Object.keys(ExpenseType)} />

        <Button type="submit">Add Expense</Button>
      </form>
    </Form>
  )
}
