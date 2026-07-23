import type { ReactNode } from 'react'
import Link from 'next/link'
import { MoveLeftIcon } from '@/components/icons'
import { cn } from '@/lib/cn'

interface BackLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export function BackLink({ href, children, className }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-1 text-label-md text-primary',
        className,
      )}
    >
      <MoveLeftIcon />
      {children}
    </Link>
  )
}
