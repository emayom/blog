import type { MetadataRoute } from 'next'
import { getPostMetaList } from '@/lib/mdx'
import { getTagCounts } from '@/lib/tags'
import { getArchiveCounts } from '@/lib/archive'
import { absoluteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPostMetaList()
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: absoluteUrl('/writing'), lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: absoluteUrl('/archive'), lastModified: now, changeFrequency: 'weekly', priority: 0.4 },
    { url: absoluteUrl('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ]

  const postEntries: MetadataRoute.Sitemap = posts.map(post => ({
    url: absoluteUrl(`/writing/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const tagEntries: MetadataRoute.Sitemap = getTagCounts(posts).map(({ tag }) => ({
    url: absoluteUrl(`/tag/${tag}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.4,
  }))

  const archiveEntries: MetadataRoute.Sitemap = getArchiveCounts(posts).map(({ year }) => ({
    url: absoluteUrl(`/archive/${year}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.4,
  }))

  return [...staticEntries, ...postEntries, ...tagEntries, ...archiveEntries]
}
