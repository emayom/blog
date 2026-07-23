import Link from 'next/link'
import { Heading } from '@/components/ui/heading'
import type { YearCount } from '@/types/archive'

interface ArchiveSidebarProps {
  years: YearCount[]
}

export function ArchiveSidebar({ years }: ArchiveSidebarProps) {
  if (years.length === 0) return null

  return (
    <aside className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Heading size="sm">아카이브</Heading>
        <Link
          href="/archive"
          className="text-label-md text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus"
        >
          전체 →
        </Link>
      </div>
      <ul className="flex flex-col">
        {years.map(({ year, count }) => (
          <li
            key={year}
            className="flex items-center justify-between gap-3 pb-5 last:pb-0 sm:pb-4"
          >
            <Link
              href={`/archive/${year}`}
              className="min-w-9 shrink-0 text-label-md text-fg hover:text-primary"
            >
              {year}
            </Link>
            <span className="group/bars relative flex flex-1 justify-end">
              <span
                className="flex flex-wrap justify-end gap-[1px]"
                role="img"
                aria-label={`${count}편`}
              >
                {Array.from({ length: count }).map((_, i) => (
                  <span
                    key={i}
                    className="h-3 w-1 bg-primary/70 dark:bg-primary-on-dark/70"
                  />
                ))}
              </span>
              <span
                role="tooltip"
                className="pointer-events-none absolute bottom-full right-0 mb-1.5 whitespace-nowrap rounded bg-fg px-2 py-1 text-label-sm text-canvas opacity-0 transition-opacity duration-150 group-hover/bars:opacity-100 dark:bg-canvas dark:text-fg"
              >
                {count}
                편
              </span>
            </span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
