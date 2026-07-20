import { PostCard } from '@/components/writing/post-card'
import { Divider } from '@/components/ui/divider'
import { Heading } from '@/components/ui/heading'
import type { PostMeta } from '@/types/post'

interface RelatedPostsProps {
  posts: PostMeta[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <>
      <Divider className="my-12" />

      <section>
        <Heading size="md">관련 글</Heading>

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
