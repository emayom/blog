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
    <article className={`group cursor-pointer bg-canvas ${hasTags ? 'py-md' : 'py-lg'}`}>
      <h2 className="text-title-md">
        <Link
          href={`/writing/${post.slug}`}
          className="text-fg group-hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus"
        >
          {post.title}
        </Link>
      </h2>

      {post.description && (
        <p className="mt-2 line-clamp-2 text-body-lg text-fg-muted">
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
        <p className="mt-3 text-label-md text-fg-subtle">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true"> · </span>
          <span>{`${post.readingTime}분 읽기`}</span>
        </p>
      )}
    </article>
  )
}
