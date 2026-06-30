import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const tagVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus',
  {
    variants: {
      variant: {
        soft: 'bg-canvas-parchment text-ink-muted-80 hover:bg-canvas-parchment/70 hover:text-primary dark:bg-surface-tile-1 dark:text-body-muted dark:hover:text-primary-on-dark',
        outline: 'border border-hairline bg-canvas text-ink hover:border-ink-muted-48 dark:border-ink-muted-80 dark:bg-surface-tile-2 dark:text-body-on-dark',
      },
      size: {
        sm: 'px-3 py-1 text-xs',
        md: 'h-[34px] px-4 text-sm tracking-[-0.224px]',
      },
    },
    defaultVariants: { variant: 'soft', size: 'sm' },
  },
)

interface TagProps extends VariantProps<typeof tagVariants> {
  label: string
  count?: number
  className?: string
  as?: 'span'
  href?: string
}

export function Tag({ href, label, count, variant, size, className, as }: TagProps) {
  const classes = cn(tagVariants({ variant, size }), className)
  const children = (
    <>
      {label}
      {count !== undefined && (
        <span className="text-ink-muted-48 dark:text-body-muted">{count}</span>
      )}
    </>
  )

  if (as === 'span') return <span className={classes}>{children}</span>
  return <Link href={href!} className={classes}>{children}</Link>
}
