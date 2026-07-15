import Link from 'next/link'
import { cn } from '@/lib/cn'

interface BreadcrumbItem {
  label: string
  href?: string
  truncate?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn('mb-6 text-xs tracking-[-0.12px] text-fg-subtle', className)}
    >
      {items.map((item, index) => (
        <span key={index}>
          {index > 0 && <span aria-hidden="true"> / </span>}
          {item.href
            ? (
                <Link href={item.href} className="text-primary hover:underline dark:text-primary-on-dark">
                  {item.label}
                </Link>
              )
            : (
                <span aria-current="page" className={cn(item.truncate && 'max-w-[40ch] truncate')}>
                  {item.label}
                </span>
              )}
        </span>
      ))}
    </nav>
  )
}
