import type { Metadata } from 'next'
import { getLibraryItemsByType, groupByYear } from '@/lib/library'
import { buildMetadata } from '@/lib/seo'
import { ShelfWrapper } from '@/components/library/shelf-wrapper'
import { FeaturedSection } from '@/components/library/featured-section'
import { YearSection } from '@/components/library/year-section'
import type { LibraryType } from '@/types/library'

export const metadata: Metadata = buildMetadata({
  title: '책장',
  description: '읽고 본 것들의 기록',
  path: '/library',
})

interface LibraryPageProps {
  searchParams: Promise<{ type?: string }>
}

export default async function LibraryPage({ searchParams }: LibraryPageProps) {
  const { type } = await searchParams
  const validType: LibraryType = type === 'book' ? 'book' : 'anime'

  const items = getLibraryItemsByType(validType)
  const featuredItems = items.filter(item => item.featured)
  const yearGroups = groupByYear(items.filter(item => !item.featured))

  return (
    <ShelfWrapper type={validType}>
      <FeaturedSection items={featuredItems} />
      {yearGroups.map(([year, yearItems]) => (
        <YearSection key={year} year={year} items={yearItems} />
      ))}
    </ShelfWrapper>
  )
}
