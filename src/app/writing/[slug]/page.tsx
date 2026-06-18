import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllSlugs, getPostBySlug } from '@/lib/mdx'
import { ArticleLayout } from '@/components/writing/article-layout'

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

  return <ArticleLayout post={post} />
}
