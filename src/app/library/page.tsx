import type { Metadata } from 'next'
import { getLibraryItemsByType, groupByYear, collapseBySeries } from '@/lib/library'
import { buildMetadata } from '@/lib/seo'
import { LibraryShelf } from '@/components/library/library-shelf'
import { CategoryTabs } from '@/components/library/category-tabs'
import { FeaturedSection } from '@/components/library/featured-section'
import { YearSection } from '@/components/library/year-section'
import { EmptyState } from '@/components/ui/empty-state'
import type { LibraryType } from '@/types/library'

export const metadata: Metadata = buildMetadata({
  title: '책장',
  description: '읽고 본 것들의 기록',
  path: '/library',
})

interface LibraryPageProps {
  searchParams: Promise<{ type?: string }>
}

const LABEL: Record<LibraryType, string> = { anime: 'anime', book: 'books' }

export default async function LibraryPage({ searchParams }: LibraryPageProps) {
  const { type } = await searchParams
  const validType: LibraryType = type === 'book' ? 'book' : 'anime'

  const items = getLibraryItemsByType(validType)
  const featuredItems = items.filter(item => item.featured)
  const yearGroups = groupByYear(collapseBySeries(items.filter(item => !item.featured)))

  const mobileSections = yearGroups.length === 0 && featuredItems.length === 0
    ? <EmptyState title="아직 기록된 항목이 없어요" className="flex-1" />
    : (
        <>
          <FeaturedSection items={featuredItems} />
          {yearGroups.map(([year, yearItems]) => (
            <YearSection key={year} year={year} items={yearItems} />
          ))}
        </>
      )

  return (
    <div className="mx-auto flex min-h-0 w-full min-w-0 max-w-270 flex-1 flex-col px-4 py-12 md:px-8 md:py-18">
      {/* 데스크톱: FinderWindow + 인라인 검색 */}
      <LibraryShelf items={items} activeType={validType} label={LABEL[validType]} />

      {/* 모바일: 상단 탭 + 섹션 (검색 미포함 — 후속 이슈) */}
      <div className="md:hidden">
        <CategoryTabs active={validType} />
        <h1 className="mb-5 mt-4 text-label-md font-semibold text-fg">
          {LABEL[validType]}
        </h1>
        {mobileSections}
      </div>
    </div>
  )
}
