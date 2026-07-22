import Link from 'next/link'
import { cn } from '@/lib/cn'
import { BookOpenIcon, HeartIcon } from '@/components/icons'
import type { LibraryType } from '@/types/library'

interface ShelfSidebarProps {
  active: LibraryType
}

const items: { type: LibraryType, label: string, href: string, Icon: typeof HeartIcon }[] = [
  { type: 'anime', label: 'anime', href: '/library', Icon: HeartIcon },
  { type: 'book', label: 'books', href: '/library?type=book', Icon: BookOpenIcon },
]

export function ShelfSidebar({ active }: ShelfSidebarProps) {
  return (
    <nav
      aria-label="카테고리 필터"
      className="flex flex-row gap-2 overflow-x-auto py-2 md:flex-col md:gap-1 md:overflow-visible md:p-0 scrollbar-none"
    >
      {items.map((item) => {
        const isActive = item.type === active
        return (
          <Link
            key={item.type}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex shrink-0 items-center gap-2 rounded px-3 py-2 text-left text-label-md transition-colors md:px-2 md:py-1 md:text-label-sm',
              isActive
                ? 'bg-fg/8 font-medium text-primary dark:text-primary-on-dark'
                : 'text-fg-subtle hover:text-fg dark:text-body-muted dark:hover:text-body-on-dark',
            )}
          >
            <item.Icon className="size-4 flex-none md:size-3.5" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
