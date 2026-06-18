'use client'

import { cva } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import type { TagCount } from '@/types/tag'

const chipVariants = cva(
  'inline-flex h-[34px] cursor-pointer items-center gap-1.5 rounded-full border px-4 text-sm tracking-[-0.224px] transition-colors active:scale-95',
  {
    variants: {
      active: {
        true: 'border-primary bg-primary font-semibold text-on-primary',
        false:
          'border-hairline bg-canvas text-ink hover:border-ink-muted-48 dark:border-ink-muted-80 dark:bg-surface-tile-2 dark:text-body-on-dark',
      },
    },
    defaultVariants: { active: false },
  },
)

interface TagFilterProps {
  tags: TagCount[]
  total: number
  selected: string | null
  onSelect: (tag: string | null) => void
}

export function TagFilter({ tags, total, selected, onSelect }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        aria-pressed={selected === null}
        onClick={() => onSelect(null)}
        className={chipVariants({ active: selected === null })}
      >
        전체
        <span className={cn('text-ink-muted-48 dark:text-body-muted', selected === null && 'text-white/75')}>
          {total}
        </span>
      </button>

      {tags.map(({ tag, count }) => {
        const isActive = selected === tag
        return (
          <button
            key={tag}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(tag)}
            className={chipVariants({ active: isActive })}
          >
            {tag}
            <span className={cn('text-ink-muted-48 dark:text-body-muted', isActive && 'text-white/75')}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
