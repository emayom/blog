'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { IconButton } from '@/components/ui/icon-button'

interface CopyButtonProps {
  code: string
  className?: string
}

export function CopyButton({ code, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
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
      onClick={handleCopy}
      label={copied ? '복사됨' : '코드 복사'}
      className={cn(
        'absolute top-[12px] right-[12px]',
        copied && 'text-primary dark:text-primary-on-dark',
        className,
      )}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </IconButton>
  )
}

function CopyIcon() {
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
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
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
