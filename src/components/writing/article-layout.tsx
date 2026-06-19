import Link from 'next/link'
import { formatDate } from '@/lib/format-date'
import { BackToTop } from '@/components/writing/back-to-top'
import { PostNavigation } from '@/components/writing/post-navigation'
import { RelatedPosts } from '@/components/writing/related-posts'
import { TableOfContents } from '@/components/writing/table-of-contents'
import type { Post, PostMeta } from '@/types/post'
import type { AdjacentPosts } from '@/types/post-navigation'

interface ArticleLayoutProps {
  post: Post
  adjacent: AdjacentPosts
  related: PostMeta[]
}

export function ArticleLayout({ post, adjacent, related }: ArticleLayoutProps) {
  return (
    <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-[1fr_260px] xl:gap-8">
      <article className="min-w-0 max-w-[680px]">
        <Link
          href="/writing"
          className="mb-6 inline-block text-sm tracking-[-0.224px] text-primary dark:text-primary-on-dark"
        >
          ← 모든 글
        </Link>

        <h1 className="mb-3.5 font-display text-[40px] font-semibold leading-[1.1] tracking-[-0.374px] text-ink dark:text-body-on-dark">
          {post.title}
        </h1>

        <p className="mb-8 text-sm tracking-[-0.224px] text-ink-muted-48 dark:text-body-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true"> · </span>
          <span>{`${post.readingTime}분 읽기`}</span>
        </p>

        <div className="text-[17px] leading-[1.47] tracking-[-0.374px] text-ink-muted-80 dark:text-body-muted [&_p]:mb-[17px]">
          {post.content}
        </div>

        <RelatedPosts posts={related} />

        <PostNavigation prev={adjacent.prev} next={adjacent.next} />

        <div className="my-12 h-px bg-hairline dark:bg-ink-muted-80" />

        <Link
          href="/writing"
          className="inline-block text-sm tracking-[-0.224px] text-primary dark:text-primary-on-dark"
        >
          ← 모든 글
        </Link>
      </article>

      <aside className="hidden lg:block">
        <div className="sticky top-[70px]">
          <TableOfContents items={post.toc} />
        </div>
      </aside>

      <BackToTop />
    </div>
  )
}
