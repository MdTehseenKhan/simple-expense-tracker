'use client'

import { FC } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { IncomeType } from '@prisma/client'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { InputForm } from '@/components/ui/input-form'
import { IncomePayload, IncomeValidator } from '@/lib/validators'
import { addIncomeAction } from '@/lib/actions/add-income'

interface AddIncomeFormProps {
  onAddIncome: VoidFunction
}

export const AddIncomeForm: FC<AddIncomeFormProps> = ({ onAddIncome }) => {
  const form = useForm<IncomePayload>({
    resolver: zodResolver(IncomeValidator),
    defaultValues: {
      title: '',
      amount: 0,
      description: '',
      type: IncomeType.SALARY,
    },
  })

  function onSubmit(data: IncomePayload) {
    const promise = addIncomeAction(data)

    toast.promise(promise, {
      loading: 'Adding Income...',
      success: () => {
        form.reset()
        onAddIncome()
        return 'Income successfully added!'
      },
      error: (error) => `Error adding income! ${(error as Error).message}`,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 text-sm"
      >
        <InputForm form={form} types={Object.keys(IncomeType)} />

        <Button type="submit">Add Income</Button>
      </form>
    </Form>
  )
}
