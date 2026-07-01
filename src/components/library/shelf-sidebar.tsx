import Link from 'next/link'
import { cn } from '@/lib/cn'
import type { LibraryType } from '@/types/library'

interface ShelfSidebarProps {
  active: LibraryType
}

const items: { type: LibraryType, label: string, href: string }[] = [
  { type: 'anime', label: 'anime', href: '/library' },
  { type: 'book', label: 'books', href: '/library?type=book' },
]

export function ShelfSidebar({ active }: ShelfSidebarProps) {
  return (
    <nav className="border-r border-hairline bg-surface-pearl py-5 dark:border-ink-muted-80 dark:bg-surface-tile-2">
      {items.map((item) => {
        const isActive = item.type === active
        return (
          <Link
            key={item.type}
            href={item.href}
            className={cn(
              'flex items-center gap-2.5 px-4 py-2.5 text-[13px]',
              isActive
                ? 'bg-[--color-sidebar-active-bg] font-semibold text-ink dark:text-body-on-dark'
                : 'text-ink-muted-48 dark:text-body-muted',
            )}
          >
            <span
              className={cn(
                'size-4 flex-none rounded-xs',
                isActive
                  ? 'bg-primary dark:bg-primary-on-dark'
                  : 'bg-canvas-parchment dark:bg-surface-tile-3',
              )}
            />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
