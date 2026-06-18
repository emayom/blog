import Link from 'next/link'
import { formatDate } from '@/lib/format-date'
import type { Post } from '@/types/post'

interface ArticleLayoutProps {
  post: Post
}

export function ArticleLayout({ post }: ArticleLayoutProps) {
  return (
    <article className="mx-auto max-w-[680px] px-6 py-12">
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

      <div className="my-12 h-px bg-hairline dark:bg-ink-muted-80" />

      <Link
        href="/writing"
        className="inline-block text-sm tracking-[-0.224px] text-primary dark:text-primary-on-dark"
      >
        ← 모든 글
      </Link>
    </article>
  )
}
