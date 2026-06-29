import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/format-date'
import type { PostMeta } from '@/types/post'

interface FeaturedPostsProps {
  posts: PostMeta[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mb-7">
      <h2 className="mb-6 font-display text-[21px] font-semibold leading-[1.19] tracking-[0.231px] text-ink dark:text-body-on-dark">
        Featured Posts
      </h2>
      <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        {posts.map(post => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              className="group block overflow-hidden rounded-lg border border-hairline bg-canvas dark:border-ink-muted-80 dark:bg-surface-tile-2"
            >
              {post.thumbnail && (
                <div className="relative h-[150px] w-full">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className={post.thumbnail ? 'px-4 py-3' : 'px-5 py-[17px]'}>
                <p className="text-[17px] font-semibold leading-[1.24] tracking-[-0.374px] text-ink group-hover:text-primary dark:text-body-on-dark dark:group-hover:text-primary-on-dark">
                  {post.title}
                </p>
                <p className="mt-1 text-sm text-ink-muted-48 dark:text-body-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
