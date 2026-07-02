import type { Metadata } from 'next'
import { getLibraryItemsByType, groupByYear, collapseBySeries } from '@/lib/library'
import { buildMetadata } from '@/lib/seo'
import { FinderWindow } from '@/components/ui/finder-window'
import { ShelfSidebar } from '@/components/library/shelf-sidebar'
import { CategoryTabs } from '@/components/library/category-tabs'
import { FeaturedSection } from '@/components/library/featured-section'
import { YearSection } from '@/components/library/year-section'
import { Heading } from '@/components/ui/heading'
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

  const sections = (
    <>
      <FeaturedSection items={featuredItems} />
      {yearGroups.map(([year, yearItems]) => (
        <YearSection key={year} year={year} items={yearItems} />
      ))}
    </>
  )

  return (
    <div className="mx-auto flex min-h-0 w-full min-w-0 max-w-270 flex-1 flex-col px-4 py-12 md:px-8 md:py-18">
      {/* 데스크탑: FinderWindow (검색은 #84에서 연결) */}
      <FinderWindow
        className="hidden md:flex md:max-h-[calc(100vh-14.2rem)]"
        sidebar={<ShelfSidebar active={validType} />}
        title={<Heading as="h1" className="text-sm">{LABEL[validType]}</Heading>}
      >
        {sections}
      </FinderWindow>

      {/* 모바일: 상단 탭 + 섹션 */}
      <div className="md:hidden">
        <CategoryTabs active={validType} />
        <h1 className="mb-5 mt-4 text-[13px] font-semibold text-ink dark:text-body-on-dark">
          {LABEL[validType]}
        </h1>
        {sections}
      </div>
    </div>
  )
}
