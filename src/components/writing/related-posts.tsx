import { PostCard } from '@/components/writing/post-card'
import type { PostMeta } from '@/types/post'

interface RelatedPostsProps {
  posts: PostMeta[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <>
      <div className="my-12 h-px bg-hairline dark:bg-ink-muted-80" />

      <section>
        <h2 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.2px] text-ink dark:text-body-on-dark">
          관련 글
        </h2>

        <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
