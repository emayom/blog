import Link from 'next/link'
import Image from 'next/image'
import { Heading } from '@/components/ui/heading'
import type { PostMeta } from '@/types/post'

interface FeaturedPostsProps {
  posts: PostMeta[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-8 mb-12">
      <Heading size="sm" className="sr-only">Featured Posts</Heading>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {posts.map(post => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden bg-canvas dark:bg-surface-tile-2"
            >
              <div className="pointer-events-none relative aspect-[520/280] w-full overflow-hidden rounded-sm bg-canvas-parchment dark:bg-surface-tile-3">
                {post.thumbnail && (
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col py-3">
                <p className="line-clamp-2 break-keep text-title-md text-fg group-hover:text-primary">
                  {post.title}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
