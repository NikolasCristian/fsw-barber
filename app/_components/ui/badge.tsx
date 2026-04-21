import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/app/_lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap transition-all duration-300 shadow-sm",
  {
    variants: {
      variant: {
        default:
          "bg-blue-900 text-white border border-blue-700/40 hover:bg-blue-800",

        secondary:
          "bg-zinc-800 text-zinc-200 border border-zinc-700 hover:bg-zinc-700",

        destructive:
          "bg-red-600 text-white border border-red-500 hover:bg-red-500",

        outline:
          "border border-blue-700/40 text-blue-300 bg-transparent hover:bg-blue-900/20",

        ghost: "text-blue-300 hover:bg-blue-900/20",

        link: "text-blue-400 underline-offset-4 hover:underline hover:text-blue-300",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  },
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
