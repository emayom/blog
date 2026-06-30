import type { ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded transition-colors disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus',
  {
    variants: {
      variant: {
        outline: 'border border-hairline bg-canvas text-ink hover:border-ink-muted-48 dark:border-ink-muted-80 dark:bg-surface-tile-2 dark:text-body-on-dark',
        ghost: 'text-ink hover:text-primary dark:text-body-on-dark dark:hover:text-primary-on-dark',
      },
      size: {
        sm: 'px-2.5 py-1 text-sm',
        md: 'px-4 py-2 text-sm',
      },
    },
    defaultVariants: { variant: 'outline', size: 'sm' },
  },
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
