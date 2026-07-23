'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { IconButton } from '@/components/ui/icon-button'
import { CheckIcon, CopyIcon } from '@/components/icons'

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
        copied && 'text-primary',
        className,
      )}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
    </IconButton>
  )
}
