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
        <strong className="mb-2 block text-title-sm text-fg dark:text-body-on-dark">
          {title}
        </strong>
      )}
      <div className="text-body-md text-fg-muted dark:text-body-muted">
        {children}
      </div>
    </li>
  )
}
