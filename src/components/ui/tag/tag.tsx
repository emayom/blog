import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const tagVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus',
  {
    variants: {
      variant: {
        soft: 'bg-canvas-parchment text-fg-muted hover:bg-canvas-parchment/70 hover:text-primary dark:bg-surface-tile-1',
        outline: 'border border-hairline bg-canvas text-fg hover:border-fg-subtle dark:bg-surface-tile-2',
      },
      size: {
        sm: 'px-3 py-1 text-label-sm',
        md: 'h-[34px] px-4 text-label-md',
      },
    },
    defaultVariants: { variant: 'soft', size: 'sm' },
  },
)

interface TagProps extends VariantProps<typeof tagVariants> {
  'label': string
  'count'?: number
  'className'?: string
  'as'?: 'span'
  'href'?: string
  'aria-current'?: 'page'
}

export function Tag({ href, label, count, variant, size, className, as, 'aria-current': ariaCurrent }: TagProps) {
  const classes = cn(tagVariants({ variant, size }), className)
  const children = (
    <>
      {label}
      {count !== undefined && (
        <span className="text-fg-subtle">{count}</span>
      )}
    </>
  )

  if (as === 'span') return <span className={classes} aria-current={ariaCurrent}>{children}</span>
  return <Link href={href!} className={classes} aria-current={ariaCurrent}>{children}</Link>
}
