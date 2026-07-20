'use client'

import { Tag } from '@/components/ui/tag'
import type { TagCount } from '@/types/tag'

interface NotesTagFilterProps {
  tags: TagCount[]
  total: number
  activeTag?: string
}

export function NotesTagFilter({ tags, total, activeTag }: NotesTagFilterProps) {
  const allActive = !activeTag

  return (
    <nav aria-label="주제 필터" className="mb-7 flex flex-wrap gap-2">
      <Tag
        href="/notes"
        label="전체"
        count={total}
        variant={allActive ? 'soft' : 'outline'}
        size="md"
        className={allActive ? 'font-semibold' : undefined}
        aria-current={allActive ? 'page' : undefined}
      />

      {tags.map(({ tag, count }) => {
        const active = tag === activeTag
        return (
          <Tag
            key={tag}
            href={`/notes?tag=${encodeURIComponent(tag)}`}
            label={tag}
            count={count}
            variant={active ? 'soft' : 'outline'}
            size="md"
            className={active ? 'font-semibold' : undefined}
            aria-current={active ? 'page' : undefined}
          />
        )
      })}
    </nav>
  )
}
