import Link from 'next/link'

type ModalEmptyStateAction
  = | { label: string, href: string, onClick?: () => void }
    | { label: string, onClick: () => void, href?: never }

interface ModalEmptyStateProps {
  message: string
  action?: ModalEmptyStateAction
}

export function ModalEmptyState({ message, action }: ModalEmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-4.5 py-12 text-center text-fg-subtle dark:text-body-muted">
      <div className="mb-3.5 size-12 rounded-xl bg-canvas-parchment dark:bg-surface-tile-1" aria-hidden="true" />
      <p className={action ? 'mb-3.5 text-label-md' : 'text-label-md'}>{message}</p>
      {action && (action.href
        ? (
            <Link
              href={action.href}
              onClick={action.onClick}
              className="rounded-full border border-hairline px-4 py-1.5 text-label-md text-fg-subtle transition-colors hover:border-fg-subtle hover:text-fg dark:border-fg-muted dark:text-body-muted dark:hover:text-body-on-dark"
            >
              {action.label}
            </Link>
          )
        : (
            <button
              type="button"
              onClick={action.onClick}
              className="rounded-full border border-hairline px-4 py-1.5 text-label-md text-fg-subtle transition-colors hover:border-fg-subtle hover:text-fg dark:border-fg-muted dark:text-body-muted dark:hover:text-body-on-dark"
            >
              {action.label}
            </button>
          ))}
    </div>
  )
}
