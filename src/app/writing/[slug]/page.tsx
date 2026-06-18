import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllSlugs, getPostBySlug } from '@/lib/mdx'

// Next.js 16: params는 Promise — await 필수
type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

// generateStaticParams에 없는 경로(prod의 draft 포함)는 404
export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function WritingPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-[680px] px-[24px] py-[48px]">
      <h1 className="text-ink dark:text-body-on-dark font-semibold text-[40px] leading-[1.1] tracking-[-0.4px]">
        {post.title}
      </h1>
      <time
        dateTime={post.date}
        className="mt-[12px] block text-[14px] text-ink-muted-48 dark:text-body-muted"
      >
        {post.date}
      </time>
      <div className="mt-[32px]">{post.content}</div>
    </article>
  )
}
