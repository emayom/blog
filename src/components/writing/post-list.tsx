import { PostCard } from '@/components/writing/post-card'
import { TagFilter } from '@/components/writing/tag-filter'
import { EmptyState } from '@/components/ui/empty-state'
import type { PostMeta } from '@/types/post'
import type { TagCount } from '@/types/tag'

interface PostListProps {
  posts: PostMeta[]
  tags: TagCount[]
}

export function PostList({ posts, tags }: PostListProps) {
  return (
    <div className="flex flex-col gap-7">
      {tags.length > 0 && <TagFilter tags={tags} total={posts.length} />}

      {posts.length === 0
        ? <EmptyState variant="empty" title="아직 작성된 글이 없습니다." />
        : (
            <ul className="flex flex-col gap-3.5">
              {posts.map(post => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
    </div>
  )
}
