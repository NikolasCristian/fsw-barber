"use client"

import * as React from "react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker"

import { cn } from "@/app/_lib/utils"
import { Button, buttonVariants } from "@/app/_components/ui/button"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar bg-background p-2 [--cell-radius:var(--radius-md)] [--cell-size:28px]",
        className,
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code ?? "pt-BR", {
            month: "short",
          }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months,
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav,
        ),

        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0",
          defaultClassNames.button_next,
        ),

        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption,
        ),

        caption_label: cn(
          "font-medium select-none",
          defaultClassNames.caption_label,
        ),

        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 text-[0.8rem] font-normal text-muted-foreground select-none",
          defaultClassNames.weekday,
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),

        day: cn(
          "group/day relative aspect-square w-full p-0 text-center select-none",
          defaultClassNames.day,
        ),

        outside: cn("text-muted-foreground", defaultClassNames.outside),
        disabled: cn(
          "opacity-50 text-muted-foreground",
          defaultClassNames.disabled,
        ),
        hidden: cn("invisible", defaultClassNames.hidden),

        ...classNames,
      }}
      components={{
        Root: ({ rootRef, ...props }) => (
          <div ref={rootRef} data-slot="calendar" {...props} />
        ),

        Chevron: ({ orientation, className, ...props }) => {
          const iconClass = cn("size-4", className)

          if (orientation === "left") {
            return <ChevronLeftIcon className={iconClass} {...props} />
          }

          if (orientation === "right") {
            return <ChevronRightIcon className={iconClass} {...props} />
          }

          return <ChevronDownIcon className={iconClass} {...props} />
        },

        DayButton: (props) => <CalendarDayButton locale={locale} {...props} />,

        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & {
  locale?: Partial<Locale>
}) {
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus()
    }
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code ?? "pt-BR")}
      data-selected-single={String(
        modifiers.selected &&
          !modifiers.range_start &&
          !modifiers.range_end &&
          !modifiers.range_middle,
      )}
      data-range-start={String(modifiers.range_start)}
      data-range-end={String(modifiers.range_end)}
      data-range-middle={String(modifiers.range_middle)}
      className={cn("aspect-square w-full font-normal", className)}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
