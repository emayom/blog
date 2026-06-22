import Link from 'next/link'
import type { TagCount } from '@/types/tag'

interface TagFilterProps {
  tags: TagCount[]
  total: number
}

const chipClass = 'inline-flex h-[34px] items-center gap-1.5 rounded-full border border-hairline bg-canvas px-4 text-sm tracking-[-0.224px] text-ink transition-colors hover:border-ink-muted-48 dark:border-ink-muted-80 dark:bg-surface-tile-2 dark:text-body-on-dark'

export function TagFilter({ tags, total }: TagFilterProps) {
  return (
    <nav aria-label="주제 필터" className="flex flex-wrap gap-2">
      <Link href="/writing" className={chipClass}>
        전체
        <span className="text-ink-muted-48 dark:text-body-muted">{total}</span>
      </Link>

      {tags.map(({ tag, count }) => (
        <Link key={tag} href={`/tag/${tag}`} className={chipClass}>
          {tag}
          <span className="text-ink-muted-48 dark:text-body-muted">{count}</span>
        </Link>
      ))}
    </nav>
  )
}
