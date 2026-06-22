import Link from 'next/link'
import type { YearCount } from '@/types/archive'

interface ArchiveSidebarProps {
  years: YearCount[]
}

export function ArchiveSidebar({ years }: ArchiveSidebarProps) {
  if (years.length === 0) return null

  return (
    <aside className="flex flex-col gap-4">
      <h2 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.2px] text-ink dark:text-body-on-dark">
        아카이브
      </h2>
      <ul className="flex flex-col">
        {years.map(({ year, count }) => (
          <li
            key={year}
            className="flex items-baseline justify-between border-b border-divider-soft py-2.5 last:border-b-0 dark:border-ink-muted-80"
          >
            <Link
              href={`/archive/${year}`}
              className="text-[17px] text-ink hover:text-primary dark:text-body-on-dark dark:hover:text-primary-on-dark"
            >
              {year}
            </Link>
            <span className="text-sm text-ink-muted-48 dark:text-body-muted">
              {`${count}편`}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
