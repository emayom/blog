import Link from 'next/link'
import { cn } from '@/lib/cn'
import type { LibraryType } from '@/types/library'

interface ShelfSidebarProps {
  active: LibraryType
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
    </svg>
  )
}

function BookOpenIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  )
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
              'flex shrink-0 items-center gap-2 rounded px-3 py-2 text-left text-sm transition-colors md:px-2 md:py-1 md:text-xs',
              isActive
                ? 'bg-ink/8 font-medium text-primary dark:text-primary-on-dark'
                : 'text-ink-muted-48 hover:text-ink dark:text-body-muted dark:hover:text-body-on-dark',
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
