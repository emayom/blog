import Link from 'next/link'
import { formatDate } from '@/lib/format-date'
import { Tag } from '@/components/ui/tag'
import type { PostMeta } from '@/types/post'

interface PostCardProps {
  post: PostMeta
  showTags?: boolean
  showDate?: boolean
}

export function PostCard({ post, showTags = true, showDate = false }: PostCardProps) {
  const hasTags = showTags && post.tags.length > 0
  return (
    <article className={`group cursor-pointer bg-canvas dark:border-fg-muted dark:bg-surface-tile-2 ${hasTags ? 'py-md' : 'py-lg'}`}>
      <h2 className="text-title-md">
        <Link
          href={`/writing/${post.slug}`}
          className="text-fg group-hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus dark:text-body-on-dark dark:group-hover:text-primary-on-dark"
        >
          {post.title}
        </Link>
      </h2>

      {post.description && (
        <p className="mt-2 line-clamp-2 text-body-lg text-fg-muted dark:text-body-muted">
          {post.description}
        </p>
      )}

      {hasTags && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <li key={tag}>
              <Tag href={`/tag/${tag}`} label={tag} />
            </li>
          ))}
        </ul>
      )}
      {showDate && (
        <p className="mt-3 text-sm text-ink-muted-48 dark:text-body-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true"> · </span>
          <span>{`${post.readingTime}분 읽기`}</span>
        </p>
      )}
    </article>
  )
}
