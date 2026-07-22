import Image from 'next/image'
import { Divider } from '@/components/ui/divider'
import { formatDate } from '@/lib/format-date'
import { absoluteUrl } from '@/lib/seo'
import { BackToTop } from '@/components/writing/back-to-top'
import { Comments } from '@/components/writing/comments'
import { PostNavigation } from '@/components/writing/post-navigation'
import { RelatedPosts } from '@/components/writing/related-posts'
import { SeriesNavigation } from '@/components/writing/series-navigation'
import { ShareButton } from '@/components/writing/share-button'
import { TableOfContents } from '@/components/writing/table-of-contents'
import { BackLink } from '@/components/ui/back-link'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
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
        <Breadcrumb
          items={[
            { label: '홈', href: '/' },
            { label: '글', href: '/writing' },
            { label: post.title, truncate: true },
          ]}
        />

        {post.thumbnail && (
          <div className="relative mb-8 aspect-7/4 overflow-hidden rounded-xl">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              sizes="(min-width: 680px) 680px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        <Heading as="h1" size="xl" className="mb-3.5">
          {post.title}
        </Heading>

        <Text variant="caption" className="mb-4 text-fg-subtle dark:text-body-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true"> · </span>
          <span>{`${post.readingTime}분 읽기`}</span>
        </Text>

        <div className="mb-8 flex items-center gap-2">
          <ShareButton
            url={absoluteUrl(`/writing/${post.slug}`)}
            title={post.title}
          />
        </div>

        <Text as="div" className="text-fg-muted dark:text-body-muted [&_p]:mb-md">
          {post.content}
        </Text>

        <SeriesNavigation series={series} />

        <RelatedPosts posts={related} />

        <PostNavigation prev={adjacent.prev} next={adjacent.next} />

        <Divider className="my-12" />

        <BackLink href="/writing">모든 글</BackLink>

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
