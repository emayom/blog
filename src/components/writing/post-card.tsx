import Link from 'next/link'
import { formatDate } from '@/lib/format-date'
import type { PostMeta } from '@/types/post'

interface PostCardProps {
  post: PostMeta
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="block rounded-lg border border-hairline bg-canvas px-5 py-[17px] transition-colors hover:bg-canvas-parchment focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus dark:border-ink-muted-80 dark:bg-surface-tile-2 dark:hover:bg-surface-tile-3"
    >
      <p className="text-sm text-ink-muted-48 dark:text-body-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true"> · </span>
        <span>{`${post.readingTime}분 읽기`}</span>
      </p>

      <h2 className="mt-2 text-[21px] font-semibold leading-[1.2] tracking-[-0.374px] text-ink dark:text-body-on-dark">
        {post.title}
      </h2>

      {post.description && (
        <p className="mt-2 line-clamp-2 text-[17px] leading-[1.47] text-ink-muted-80 dark:text-body-muted">
          {post.description}
        </p>
      )}

      {post.tags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <li
              key={tag}
              className="rounded-full bg-canvas-parchment px-3 py-1 text-xs text-ink-muted-80 dark:bg-surface-tile-1 dark:text-body-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </Link>
  )
}
