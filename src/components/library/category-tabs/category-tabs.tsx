import Link from 'next/link'
import { cn } from '@/lib/cn'
import type { LibraryType } from '@/types/library'

interface CategoryTabsProps {
  active: LibraryType
}

const tabs: { type: LibraryType, label: string, href: string }[] = [
  { type: 'anime', label: 'anime', href: '/library' },
  { type: 'book', label: 'books', href: '/library?type=book' },
]

export function CategoryTabs({ active }: CategoryTabsProps) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => {
        const isActive = tab.type === active
        return (
          <Link
            key={tab.type}
            href={tab.href}
            className={cn(
              'rounded-pill px-3 py-1 text-label-sm',
              isActive
                ? 'bg-primary text-on-primary'
                : 'bg-canvas-parchment text-fg-subtle dark:bg-surface-tile-2 dark:text-body-muted',
            )}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
