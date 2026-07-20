'use client'

import { useMemo, useState } from 'react'
import { FinderWindow } from '@/components/library/finder-window'
import { ShelfSidebar } from '@/components/library/shelf-sidebar'
import { FeaturedSection } from '@/components/library/featured-section'
import { YearSection } from '@/components/library/year-section'
import { EmptyState } from '@/components/ui/empty-state'
import { Heading } from '@/components/ui/heading'
import { collapseBySeries, groupByYear } from '@/lib/library-group'
import { filterLibraryItemsByTitle } from '@/lib/library-search'
import type { LibraryItemMeta, LibraryType } from '@/types/library'

interface LibraryShelfProps {
  items: LibraryItemMeta[]
  activeType: LibraryType
  label: string
}

export function LibraryShelf({ items, activeType, label }: LibraryShelfProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () => filterLibraryItemsByTitle(items, query),
    [items, query],
  )

  const featuredItems = query ? [] : filtered.filter(item => item.featured)
  const yearGroups = groupByYear(collapseBySeries(filtered.filter(item => query || !item.featured)))

  const hasResults = featuredItems.length > 0 || yearGroups.length > 0

  return (
    <FinderWindow
      className="hidden md:flex md:h-140"
      sidebar={<ShelfSidebar active={activeType} />}
      title={<Heading as="h1" className="text-sm">{label}</Heading>}
      onSearch={setQuery}
      searchPlaceholder="제목 검색"
    >
      {hasResults
        ? (
            <>
              <FeaturedSection items={featuredItems} />
              {yearGroups.map(([year, yearItems]) => (
                <YearSection key={year} year={year} items={yearItems} />
              ))}
            </>
          )
        : (
            <div className="flex h-full items-center justify-center">
              <EmptyState title="검색 결과가 없어요" />
            </div>
          )}
    </FinderWindow>
  )
}
