'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { IconButton } from '@/components/ui/icon-button'
import { CheckIcon, ShareIcon } from '@/components/icons'

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
    <IconButton
      size="md"
      shape="square"
      variant="outline"
      onClick={handleShare}
      label={copied ? '링크 복사됨' : '글 공유'}
      className={cn(
        copied && 'text-primary',
        className,
      )}
    >
      {copied ? <CheckIcon /> : <ShareIcon />}
    </IconButton>
  )
}
