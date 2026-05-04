import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/app/_lib/utils"

const badgeVariants = cva(
  "inline-flex h-5 w-fit items-center justify-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",

        success: "bg-green-600 text-white hover:bg-green-700",

        warning: "bg-yellow-500 text-black hover:bg-yellow-600",

        destructive: "bg-blue-600 text-white hover:bg-red-700",

        outline:
          "bg-zinc-900/90 backdrop-blur-xl border border-white/10 hover:bg-zinc-800/90 shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge }
