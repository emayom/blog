import type { ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const badgeVariants = cva('inline-flex text-label-sm', {
  variants: {
    variant: {
      outline:
        'rounded-md border border-hairline bg-surface-pearl px-3 py-1 text-fg-muted',
      solid: 'rounded px-1 py-1 font-semibold leading-none',
    },
    tone: {
      dark: '',
      light: '',
    },
  },
  compoundVariants: [
    { variant: 'solid', tone: 'dark', class: 'bg-black/80 text-white/90' },
    { variant: 'solid', tone: 'light', class: 'bg-white/80 text-black/90' },
  ],
  defaultVariants: { variant: 'outline', tone: 'light' },
})

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode
  className?: string
}

export function Badge({ variant, tone, children, className }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, tone }), className)}>{children}</span>
}
