'use client'

import { Children, isValidElement, useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CodeGroupProps {
  labels: string[]
  children: ReactNode
}

export function CodeGroup({ labels, children }: CodeGroupProps) {
  const [active, setActive] = useState(0)

  // 유효한 엘리먼트만 필터 (코드펜스 사이 공백 노드 제거)
  const panels = Children.toArray(children).filter(isValidElement)

  return (
    <div className="my-lg overflow-hidden rounded-lg border border-hairline dark:border-ink-muted-80">
      <div className="flex border-b border-hairline bg-canvas-parchment dark:border-ink-muted-80 dark:bg-surface-tile-2">
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={cn(
              'px-4 py-2.5 text-[14px] tracking-[-0.224px] transition-colors',
              active === i
                ? 'border-b-2 border-primary text-ink dark:border-primary-on-dark dark:text-body-on-dark'
                : 'text-ink-muted-48 hover:text-ink dark:hover:text-body-on-dark',
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {panels.map((panel, i) => (
        <div key={i} className={i === active ? '' : 'hidden'}>
          {panel}
        </div>
      ))}
    </div>
  )
}
