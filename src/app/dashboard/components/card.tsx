'use client'

import {
  BriefcaseMedicalIcon,
  BusFrontIcon,
  Calendar,
  ClapperboardIcon,
  EllipsisIcon,
  EuroIcon,
  GraduationCapIcon,
  HomeIcon,
  NotebookPenIcon,
  ShoppingCartIcon,
  Trash2Icon,
  TrendingUpIcon,
  TruckIcon,
  UserIcon,
  UtensilsIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'
import { format } from 'date-fns'

import { Expense, ExpenseType, Income, IncomeType } from '@prisma/client'
import { deleteExpenseAction } from '@/lib/actions/delete-expense'
import { deleteIncomeAction } from '@/lib/actions/delete-income'
import { DeleteModal } from '@/components/delete-modal'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

let icons = {
  DROPSHIPPING: TruckIcon,
  FREELANCING: UserIcon,
  INVESTMENT: TrendingUpIcon,
  TEACHING: NotebookPenIcon,
  SALARY: EuroIcon,
  ENTERTAINMENT: ClapperboardIcon,
  HEALTHCARE: BriefcaseMedicalIcon,
  EDUCATION: GraduationCapIcon,
  TRANSPORT: BusFrontIcon,
  GROCERIES: ShoppingCartIcon,
  FOOD: UtensilsIcon,
  RENT: HomeIcon,
  OTHER: EllipsisIcon,
}

interface CardProps {
  data: Income | Expense
}

export const Card: React.FC<CardProps> = ({ data }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const { id, title, amount, date, type, description } = data
  const Icon = icons[type as IncomeType | ExpenseType]

  const variant = IncomeType[data.type as IncomeType] ? 'income' : 'expense'

  const handleDeleteTransaction = async () => {
    let promise

    setIsDeleting(true)
    if (variant === 'income') {
      promise = deleteIncomeAction({ id })
    } else {
      promise = deleteExpenseAction({ id })
    }
    toast.promise(promise, {
      loading: `Deleting ${variant}...`,
      success: () => {
        return `Successfully deleted ${variant}!`
      },
      error: (error) =>
        `Error deleting ${variant}! ${(error as Error).message}`,
    })
    setIsDeleting(false)
  }

  return (
    <div
      className={cn(
        'flex justify-between border p-4 rounded shadow',
        isDeleting && 'opacity-30'
      )}
    >
      <div className="flex gap-3">
        <div className="self-start p-2 border-2 rounded-full text-muted-foreground">
          <Icon size={20} />
        </div>

        <div className="w-full">
          <h4 className="font-bold" title={title}>
            {title}
          </h4>

          <p
            className="text-sm line-clamp-3 text-muted-foreground"
            title={description}
          >
            {description}
          </p>

          <div className="text-sm text-gray-600 flex flex-wrap items-center gap-x-5">
            <p
              className={cn('font-bold text-gray-800', {
                'text-green-400': variant === 'income',
                'text-destructive': variant === 'expense',
              })}
            >
              <span>
                {variant === 'income' ? '+' : '-'} ${amount.toString()}
              </span>
            </p>

            <p className="flex gap-1 items-center">
              <Calendar
                strokeWidth={2.7}
                className="w-4 shrink-0 text-gray-800"
              />

              {format(new Date(date as Date), 'dd-MMM-yyyy')}
            </p>
          </div>
        </div>
      </div>

      <DeleteModal onDelete={handleDeleteTransaction}>
        <Button
          variant="ghost"
          className="py-2 text-muted-foreground hover:text-destructive"
          onClick={() => console.log({ data })}
        >
          <Trash2Icon size={16} />
        </Button>
      </DeleteModal>
    </div>
  )
}
