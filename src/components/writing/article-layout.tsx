import Link from 'next/link'
import { formatDate } from '@/lib/format-date'
import { absoluteUrl } from '@/lib/seo'
import { BackToTop } from '@/components/writing/back-to-top'
import { Comments } from '@/components/writing/comments'
import { PostNavigation } from '@/components/writing/post-navigation'
import { RelatedPosts } from '@/components/writing/related-posts'
import { SeriesNavigation } from '@/components/writing/series-navigation'
import { ShareButton } from '@/components/writing/share-button'
import { TableOfContents } from '@/components/writing/table-of-contents'
import { Heading } from '@/components/ui/heading'
import type { Post, PostMeta } from '@/types/post'
import type { AdjacentPosts } from '@/types/post-navigation'
import type { SeriesNavigation as SeriesNavigationData } from '@/types/series-navigation'

interface ArticleLayoutProps {
  post: Post
  adjacent: AdjacentPosts
  related: PostMeta[]
  series: SeriesNavigationData | null
}

export function ArticleLayout({ post, adjacent, related, series }: ArticleLayoutProps) {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-6 py-12 lg:grid-cols-[1fr_260px] xl:gap-8">
      <article className="min-w-0 max-w-[680px]">
        <nav aria-label="breadcrumb" className="mb-6 text-xs tracking-[-0.12px] text-ink-muted-48">
          <Link href="/" className="text-primary hover:underline dark:text-primary-on-dark">홈</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/writing" className="text-primary hover:underline dark:text-primary-on-dark">글</Link>
          <span aria-hidden="true"> / </span>
          <span className="max-w-[40ch] truncate">{post.title}</span>
        </nav>

        <Heading as="h1" size="xl" className="mb-3.5">
          {post.title}
        </Heading>

        <p className="mb-4 text-sm tracking-[-0.224px] text-ink-muted-48 dark:text-body-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true"> · </span>
          <span>{`${post.readingTime}분 읽기`}</span>
        </p>

        <div className="mb-8 flex items-center gap-2">
          <ShareButton
            url={absoluteUrl(`/writing/${post.slug}`)}
            title={post.title}
          />
        </div>

        <div className="text-[17px] leading-[1.47] tracking-[-0.374px] text-ink-muted-80 dark:text-body-muted [&_p]:mb-md">
          {post.content}
        </div>

        <SeriesNavigation series={series} />

        <RelatedPosts posts={related} />

        <PostNavigation prev={adjacent.prev} next={adjacent.next} />

        <div className="my-12 h-px bg-hairline dark:bg-ink-muted-80" />

        <Link
          href="/writing"
          className="inline-block text-sm tracking-[-0.224px] text-primary dark:text-primary-on-dark"
        >
          ← 모든 글
        </Link>

        <Comments />
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
