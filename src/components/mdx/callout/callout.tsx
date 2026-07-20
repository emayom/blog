import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type CalloutType = 'info' | 'warning' | 'tip'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
}

function InfoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  )
}
function WarningIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  )
}
function TipIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6M10 22h4" />
    </svg>
  )
}

const icons = { info: InfoIcon, warning: WarningIcon, tip: TipIcon }
const defaultTitles = { info: '알아두기', warning: '주의', tip: '팁' }
const iconColors = {
  info: 'text-callout-info',
  warning: 'text-callout-warning',
  tip: 'text-callout-tip',
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const Icon = icons[type]

  return (
    <div
      className="my-lg flex gap-3 rounded-xl border border-hairline bg-canvas px-4 py-4 dark:border-ink-muted-80 dark:bg-surface-tile-2"
      role="note"
    >
      <span className={cn('mt-0.5 shrink-0', iconColors[type])}>
        <Icon />
      </span>
      <div>
        <strong className="mb-1 block text-sm font-medium text-ink dark:text-body-on-dark">
          {title ?? defaultTitles[type]}
        </strong>
        <div className="text-sm leading-[1.47] tracking-[-0.374px] text-ink-muted-80 dark:text-body-muted">
          {children}
        </div>
      </div>
    </div>
  )
}
