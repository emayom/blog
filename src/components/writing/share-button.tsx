'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'

interface ShareButtonProps {
  url: string
  title?: string
  className?: string
}

export function ShareButton({ url, title, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ url, ...(title ? { title } : {}) })
      }
      catch (error) {
        // 사용자가 공유 시트를 닫으면 AbortError가 던져진다 — 정상 흐름이므로 무시한다.
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          // 그 외 실패는 클립보드 폴백으로 처리한다.
          await copyToClipboard()
        }
      }
      return
    }

    await copyToClipboard()
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={copied ? '링크 복사됨' : '글 공유'}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-sm border border-hairline bg-canvas text-ink-muted-48 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus active:scale-95 dark:border-ink-muted-80 dark:bg-surface-tile-1 dark:text-body-muted',
        copied && 'text-primary dark:text-primary-on-dark',
        className,
      )}
    >
      {copied ? <CheckIcon /> : <ShareIcon />}
    </button>
  )
}

function ShareIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
