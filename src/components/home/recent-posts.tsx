import Link from 'next/link'
import { PostCard } from '@/components/writing/post-card'
import { EmptyState } from '@/components/ui/empty-state'
import type { PostMeta } from '@/types/post'

export const RECENT_POST_COUNT = 3

interface RecentPostsProps {
  posts: PostMeta[]
}

export function RecentPosts({ posts }: RecentPostsProps) {
  const recent = posts.slice(0, RECENT_POST_COUNT)

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.2px] text-ink dark:text-body-on-dark">
          최근 글
        </h2>
        <Link
          href="/writing"
          className="text-[17px] text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus dark:text-primary-on-dark"
        >
          전체 →
        </Link>
      </div>

      {recent.length === 0
        ? (
            <EmptyState variant="empty" title="아직 작성된 글이 없습니다." />
          )
        : (
            <ul className="flex flex-col gap-3.5">
              {recent.map(post => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
    </section>
  )
}
