'use client'

import { format } from 'date-fns'
import { useState } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface Props {
  date?: Date
  setDate: (data?: Date) => void
}

export default function DatePicker({ date, setDate }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const onSetDate = (date?: Date) => {
    setDate(date)
    setIsOpen(false)
  }
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full flex justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'dd-MMM-yyyy') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSetDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
