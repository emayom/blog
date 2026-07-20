import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { Button, buttonVariants } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { AlertIcon, InboxIcon } from '@/components/icons'

const iconBoxVariants = cva(
  'mb-md inline-flex size-14 items-center justify-center',
  {
    variants: {
      variant: {
        empty:
          'rounded-[11px] border border-hairline bg-canvas-parchment text-ink-muted-48 dark:border-ink-muted-80 dark:bg-surface-tile-2 dark:text-body-muted',
        error:
          'rounded-[11px] border border-dashed border-ink-muted-48 text-ink-muted-48 dark:text-body-muted',
      },
    },
    defaultVariants: { variant: 'empty' },
  },
)

type EmptyStateAction
  = | { label: string, onClick: () => void, href?: never }
    | { label: string, href: string, onClick?: never }

interface EmptyStateProps extends VariantProps<typeof iconBoxVariants> {
  title: string
  action?: EmptyStateAction
  className?: string
}

export function EmptyState({
  variant = 'empty',
  title,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center px-6 py-12 text-center',
        className,
      )}
    >
      <span className={iconBoxVariants({ variant })} aria-hidden="true">
        {variant === 'error' ? <AlertIcon /> : <InboxIcon />}
      </span>
      <Text className="mb-md text-fg-muted dark:text-body-muted">
        {title}
      </Text>
      {action && (action.href
        ? (
            <a
              href={action.href}
              className={buttonVariants({ variant: 'primary' })}
            >
              {action.label}
            </a>
          )
        : (
            <Button variant="primary" onClick={action.onClick}>
              {action.label}
            </Button>
          ))}
    </div>
  )
}
