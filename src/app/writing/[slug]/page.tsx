import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllSlugs, getPostBySlug, getPostMetaList } from '@/lib/mdx'
import { buildMetadata } from '@/lib/seo'
import { getAdjacentPosts, getRelatedPosts } from '@/lib/post-navigation'
import { getSeriesNavigation } from '@/lib/series'
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

  // OG images는 opengraph-image.tsx가 자동 주입하므로 여기서 지정하지 않는다(중복 방지).
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/writing/${slug}`,
    type: 'article',
    publishedTime: post.date,
    tags: post.tags,
  })
}

export default async function WritingPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const posts = getPostMetaList()
  const adjacent = getAdjacentPosts(posts, slug)
  const related = getRelatedPosts(posts, slug)
  const series = getSeriesNavigation(posts, slug)

  return (
    <ArticleLayout post={post} adjacent={adjacent} related={related} series={series} />
  )
}
