import type { ReactNode } from 'react'

interface CollapseProps {
  title: string
  open?: boolean
  children: ReactNode
}

export function Collapse({ title, open = false, children }: CollapseProps) {
  return (
    <details
      open={open}
      className="my-lg rounded-md border border-hairline dark:border-ink-muted-80"
    >
      <summary className="flex cursor-pointer select-none list-none items-center justify-between px-4 py-3 text-[17px] font-semibold tracking-[-0.374px] text-ink dark:text-body-on-dark [&::-webkit-details-marker]:hidden">
        {title}
        <svg
          className="details-chevron size-4 shrink-0 text-ink-muted-48"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </summary>
      <div className="border-t border-hairline px-4 pb-4 pt-3 text-[17px] leading-[1.47] tracking-[-0.374px] text-ink-muted-80 dark:border-ink-muted-80 dark:text-body-muted">
        {children}
      </div>
    </details>
  )
}
