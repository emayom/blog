'use client'

import Link from 'next/link'
import type { PostMeta } from '@/types/post'
import { cn } from '@/lib/cn'
import { formatDate } from '@/lib/format-date'

interface SearchResultItemProps {
  post: PostMeta
  active?: boolean
  onClick: () => void
  onMouseEnter?: () => void
}

export function SearchResultItem({ post, active = false, onClick, onMouseEnter }: SearchResultItemProps) {
  const tagLine = post.tags.slice(0, 3).map(t => `#${t}`).join(' · ')
  const meta = [formatDate(post.date), `${post.readingTime}분 읽기`, tagLine].filter(Boolean).join(' · ')

  return (
    <Link
      href={`/writing/${post.slug}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      aria-current={active ? 'true' : undefined}
      data-active={active ? 'true' : undefined}
      className={cn(
        'block px-4.5 py-3.25 transition-colors hover:bg-canvas-parchment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus dark:hover:bg-surface-tile-1',
        active && 'bg-canvas-parchment dark:bg-surface-tile-1',
      )}
    >
      <p className="mb-1.5 text-[14px] font-semibold text-ink dark:text-body-on-dark">
        {post.title}
      </p>
      {post.description && (
        <p className="mb-2 line-clamp-1 text-[13px] text-ink-muted-48 dark:text-body-muted">
          {post.description}
        </p>
      )}
      <p className="text-[11px] text-ink-muted-48 dark:text-body-muted">{meta}</p>
    </Link>
  )
}
