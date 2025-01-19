'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { buttonVariants } from './button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

function getMonths() {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(2021, i), 'MMMM'),
  }));
}

function getYears(fromYear?: number, toYear?: number) {
  const startYear = fromYear ?? 1950;
  const currentYear = new Date().getFullYear();
  const endYear = toYear ?? currentYear;
  const yearRange = endYear - startYear + 1;
  return Array.from({ length: yearRange }, (_, i) => ({
    value: startYear + i,
    label: (startYear + i).toString(),
  }));
}

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  fromYear,
  toYear,
  ...props
}: CalendarProps & { fromYear?: number; toYear?: number }) {
  // @ts-ignore
  const [month, setMonth] = React.useState(props?.selected);
  const MONTHS = React.useMemo(() => getMonths(), []);
  const YEARS = React.useMemo(
    () => getYears(fromYear, toYear),
    [fromYear, toYear]
  );

  return (
    <DayPicker
      month={month}
      onMonthChange={(newMonth) => {
        setMonth(newMonth);
        if (props.onMonthChange) {
          props.onMonthChange(newMonth);
        }
      }}
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months:
          'flex flex-col sm:flex-row space-y-4 sm:space-y-0 justify-center',
        month: 'flex flex-col items-center space-y-4',
        month_caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center',
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 text-muted-foreground absolute left-4 top-4'
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 text-muted-foreground absolute right-4 top-4'
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: cn('flex', props.showWeekNumber && 'justify-end'),
        weekday:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 rounded-md',
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
        ),
        range_end: 'day-range-end',
        selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md',
        today: 'bg-accent text-accent-foreground rounded-md',
        outside: 'day-outside text-muted-foreground opacity-50',
        disabled: 'text-muted-foreground opacity-50',
        range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ ...props }) =>
          props.orientation === 'left' ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ),
        MonthCaption: ({ calendarMonth }) => {
          return (
            <div className="inline-flex gap-2 items-center">
              <Select
                defaultValue={calendarMonth.date.getMonth().toString()}
                onValueChange={(value) => {
                  const newDate = new Date(calendarMonth.date);
                  newDate.setMonth(Number.parseInt(value, 10));
                  setMonth(newDate);
                  if (props.onMonthChange) {
                    props.onMonthChange(newDate);
                  }
                }}
              >
                <SelectTrigger className="w-fit gap-1 border-none p-0 pl-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem
                      key={month.value}
                      value={month.value.toString()}
                    >
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                defaultValue={calendarMonth.date.getFullYear().toString()}
                onValueChange={(value) => {
                  const newDate = new Date(calendarMonth.date);
                  newDate.setFullYear(Number.parseInt(value, 10));
                  setMonth(newDate);
                  if (props.onMonthChange) {
                    props.onMonthChange(newDate);
                  }
                }}
              >
                <SelectTrigger className="w-fit gap-1 border-none p-0 pl-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((year) => (
                    <SelectItem key={year.value} value={year.value.toString()}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
