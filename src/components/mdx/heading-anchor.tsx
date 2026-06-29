'use client'

import { useState } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

export function HeadingAnchor({ href, children }: ComponentPropsWithoutRef<'a'>) {
  const [copied, setCopied] = useState(false)

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    const url = window.location.origin + window.location.pathname + encodeURI(href ?? '')
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <span className="group/anchor relative inline-flex items-center ml-2 align-middle">
      <a
        href={href}
        onClick={handleClick}
        aria-label={copied ? '복사되었습니다!' : '링크를 제목에 복사'}
        className="opacity-0 group-hover:opacity-100 text-ink-muted-48 no-underline dark:text-body-muted"
      >
        {children}
      </a>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-ink px-2 py-1 text-xs text-canvas opacity-0 transition-opacity duration-150 group-hover/anchor:opacity-100 dark:bg-canvas dark:text-ink"
      >
        {copied ? '복사되었습니다!' : '링크를 제목에 복사'}
      </span>
    </span>
  )
}
