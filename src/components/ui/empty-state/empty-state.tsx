import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { Button, buttonVariants } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

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

function InboxIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  )
}
