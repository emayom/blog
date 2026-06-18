'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const tagParam = searchParams.get('tag')
  // URL의 tag가 존재하는 태그일 때만 유효, 아니면 전체로 폴백
  const selected = tagParam && tags.some(t => t.tag === tagParam) ? tagParam : null

  const handleSelect = useCallback(
    (tag: string | null) => {
      const params = new URLSearchParams(searchParams)
      if (tag === null) params.delete('tag')
      else params.set('tag', tag)
      const query = params.toString()
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
    },
    [router, pathname, searchParams],
  )

  const filtered = selected === null
    ? posts
    : posts.filter(post => post.tags.includes(selected))

  return (
    <div className="flex flex-col gap-7">
      {tags.length > 0 && (
        <TagFilter
          tags={tags}
          total={posts.length}
          selected={selected}
          onSelect={handleSelect}
        />
      )}

      {filtered.length === 0
        ? (
            posts.length === 0
              ? <EmptyState variant="empty" title="아직 작성된 글이 없습니다." />
              : (
                  <EmptyState
                    variant="empty"
                    title={`'${selected}' 태그의 글이 없습니다.`}
                    action={{ label: '전체 보기', onClick: () => handleSelect(null) }}
                  />
                )
          )
        : (
            <ul className="flex flex-col gap-3.5">
              {filtered.map(post => (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
    </div>
  )
}
