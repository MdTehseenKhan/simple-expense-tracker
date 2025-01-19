'use client'

import { useState } from 'react'
import { DollarSignIcon, PlusIcon, ReceiptText } from 'lucide-react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { AddIncomeForm } from '@/components/ui/add-income-form'
import { AddExpenseForm } from '@/components/ui/add-expense-form'

enum FormState {
  NOT_SELECTED,
  EXPENSE,
  INCOME,
}

export function AddTransaction({ balance }: { balance: number }) {
  const [formState, setFormState] = useState<FormState>(FormState.NOT_SELECTED)

  const handleSetNotSelected = () => setFormState(FormState.NOT_SELECTED)
  const handleSetExpense = () => setFormState(FormState.EXPENSE)
  const handleSetIncome = () => setFormState(FormState.INCOME)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="fixed bottom-10 right-10">
          <Button
            size="icon"
            className="rounded-full h-16 w-16"
            onClick={handleSetNotSelected}
          >
            <PlusIcon />
          </Button>
        </div>
      </SheetTrigger>

      <SheetContent className="w-full md:max-w-md">
        <SheetHeader>
          <SheetTitle>Add Transaction</SheetTitle>
          <SheetDescription>
            Manage your income and expenses here.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-10 mb-2">
          {formState === FormState.NOT_SELECTED && (
            <div className="grid gap-2">
              <Button
                variant="outline"
                className="w-full h-20 border-accent bg-accent hover:border-accent-foreground"
                onClick={handleSetIncome}
              >
                <DollarSignIcon className="mr-1 h-4" />
                <span>Add Income</span>
              </Button>

              <Button
                variant="outline"
                className="w-full h-20 border-accent bg-accent hover:border-accent-foreground"
                onClick={handleSetExpense}
              >
                <ReceiptText className="mr-1 h-4" />
                <span>Add Expense</span>
              </Button>
            </div>
          )}

          {formState === FormState.INCOME && (
            <AddIncomeForm onAddIncome={handleSetNotSelected} />
          )}

          {formState === FormState.EXPENSE && (
            <AddExpenseForm
              balance={balance}
              onAddExpense={handleSetNotSelected}
            />
          )}
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
