import Link from 'next/link'
import { PostCard } from '@/components/writing/post-card'
import { EmptyState } from '@/components/ui/empty-state'
import { Heading } from '@/components/ui/heading'
import type { PostMeta } from '@/types/post'

export const RECENT_POST_COUNT = 4

interface RecentPostsProps {
  posts: PostMeta[]
  className?: string
}

export function RecentPosts({ posts, className }: RecentPostsProps) {
  const recent = posts.slice(0, RECENT_POST_COUNT)

  return (
    <section className={`flex flex-col gap-6${className ? ` ${className}` : ''}`}>
      <div className="flex items-center justify-between">
        <Heading size="sm">최근 글</Heading>
        <Link
          href="/writing"
          className="text-sm text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus dark:text-primary-on-dark"
        >
          전체 →
        </Link>
      </div>

      {recent.length === 0
        ? (
            <EmptyState variant="empty" title="아직 작성된 글이 없습니다." />
          )
        : (
            <ul className="flex flex-col lg:grid lg:grid-cols-2">
              {recent.map(post => (
                <li
                  key={post.slug}
                  className="border-b border-hairline lg:odd:pr-4 lg:even:pl-4 dark:border-fg-muted"
                >
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
    </section>
  )
}
