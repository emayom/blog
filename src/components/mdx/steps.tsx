import type { ReactNode } from 'react'

interface StepsProps { children: ReactNode }
interface StepProps { title?: string, children: ReactNode }

export function Steps({ children }: StepsProps) {
  return <ol className="steps my-lg">{children}</ol>
}

export function Step({ title, children }: StepProps) {
  return (
    <li>
      {title && (
        <strong className="mb-2 block text-sm font-semibold leading-[1.24] tracking-[-0.374px] text-ink dark:text-body-on-dark">
          {title}
        </strong>
      )}
      <div className="text-sm leading-[1.47] tracking-[-0.374px] text-ink-muted-80 dark:text-body-muted">
        {children}
      </div>
    </li>
  )
}
