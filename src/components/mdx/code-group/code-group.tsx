'use client'

import { Children, isValidElement, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CodeGroupProps {
  labels: string
  children: ReactNode
}

export function CodeGroup({ labels, children }: CodeGroupProps) {
  const labelList = labels?.split(',').map(l => l.trim()).filter(Boolean) ?? []
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const panelsRef = useRef<HTMLDivElement>(null)

  const panels = Children.toArray(children).filter(isValidElement)

  async function handleCopy() {
    const panelEls = panelsRef.current?.querySelectorAll('[data-code-group-panel]')
    const pre = panelEls?.[active]?.querySelector('pre')
    try {
      await navigator.clipboard.writeText(pre?.textContent ?? '')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    catch {
      setCopied(false)
    }
  }

  return (
    <div className="my-lg overflow-hidden rounded-lg border border-hairline dark:border-ink-muted-80">
      <div className="flex items-center gap-1 px-3 py-2 bg-canvas-parchment dark:bg-surface-tile-3">
        {labelList.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={cn(
              'rounded px-2.5 py-0.5 text-[13px] tracking-[-0.224px] transition-colors',
              active === i
                ? 'bg-ink text-canvas dark:bg-ink-muted-80 dark:text-body-on-dark'
                : 'text-ink-muted-48 hover:text-ink dark:text-body-muted dark:hover:text-body-on-dark',
            )}
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? '복사됨' : '코드 복사'}
          className={cn(
            'ml-auto inline-flex size-7 items-center justify-center rounded-sm text-ink-muted-48 transition-colors hover:text-ink dark:text-body-muted dark:hover:text-body-on-dark',
            copied && 'text-primary dark:text-primary-on-dark',
          )}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
      <div ref={panelsRef}>
        {panels.map((panel, i) => (
          <div key={i} data-code-group-panel className={i === active ? '' : 'hidden'}>
            {panel}
          </div>
        ))}
      </div>
    </div>
  )
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
