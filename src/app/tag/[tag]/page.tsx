import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostMetaList } from '@/lib/mdx'
import { getTagCounts, getPostsByTag } from '@/lib/tags'
import { absoluteUrl, buildMetadata } from '@/lib/seo'
import { buildBreadcrumbJsonLd } from '@/lib/json-ld'
import { JsonLd } from '@/components/seo/json-ld'
import { PostCard } from '@/components/writing/post-card'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Heading } from '@/components/ui/heading'

type Props = { params: Promise<{ tag: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  const posts = getPostMetaList()
  return getTagCounts(posts).map(({ tag }) => ({ tag }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  return buildMetadata({
    title: `#${tag}`,
    description: `'${tag}' 태그의 글 목록`,
    path: `/tag/${tag}`,
  })
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const posts = getPostMetaList()
  const filtered = getPostsByTag(posts, tag)
  if (filtered.length === 0) notFound()

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: '홈', url: absoluteUrl('/') },
          { name: `#${tag}`, url: absoluteUrl(`/tag/${tag}`) },
        ])}
      />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <Breadcrumb
          items={[
            { label: '홈', href: '/' },
            { label: '글', href: '/writing' },
            { label: `#${tag}` },
          ]}
        />

        <Heading as="h1" size="md" className="mb-[22px]">
          #
          {tag}
          <span className="ml-2 text-title-lg font-normal text-fg-subtle dark:text-body-muted">
            (
            {filtered.length}
            )
          </span>
        </Heading>

        <ul className="flex flex-col divide-y divide-hairline dark:divide-fg-muted">
          {filtered.map(post => (
            <li key={post.slug}>
              <PostCard post={post} showTags={false} />
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
