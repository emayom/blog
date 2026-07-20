import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { InfoIcon, TipIcon, WarningIcon } from '@/components/icons'

type CalloutType = 'info' | 'warning' | 'tip'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
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
