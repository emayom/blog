'use client'

import { Children, isValidElement, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { CheckIcon, CopyIcon } from '@/components/icons'

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
    <div className="my-lg overflow-hidden rounded-lg border border-hairline">
      <div className="flex items-center gap-1 px-3 py-2 bg-canvas-parchment">
        {labelList.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={cn(
              'rounded px-2.5 py-0.5 text-label-md transition-colors',
              active === i
                ? 'bg-fg text-canvas'
                : 'text-fg-subtle hover:text-fg',
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
            'ml-auto inline-flex size-7 items-center justify-center rounded-sm text-fg-subtle transition-colors hover:text-fg',
            copied && 'text-primary',
          )}
        >
          {copied ? <CheckIcon size={15} /> : <CopyIcon size={15} />}
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
