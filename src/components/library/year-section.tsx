'use client'

import { useState } from 'react'
import { CarouselRow } from '@/components/library/carousel-row'
import { CoverCard } from '@/components/library/cover-card'
import type { LibraryItemMeta } from '@/types/library'

interface YearSectionProps {
  year: string
  items: LibraryItemMeta[]
}

export function YearSection({ year, items }: YearSectionProps) {
  const [expandedSeries, setExpandedSeries] = useState<string | null>(null)

  const toggle = (series: string) =>
    setExpandedSeries(prev => (prev === series ? null : series))

  const displayItems: LibraryItemMeta[] = items.flatMap(item =>
    item.series === expandedSeries && item.seriesItems
      ? [item, ...item.seriesItems.filter(s => s.slug !== item.slug)]
      : [item],
  )

  const expandedRep = expandedSeries ? items.find(i => i.series === expandedSeries) : undefined
  const expandedSubSlugs = new Set(
    expandedRep?.seriesItems?.filter(s => s.slug !== expandedRep.slug).map(i => i.slug) ?? [],
  )

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex items-center justify-between self-stretch md:px-5">
        <h2 className="text-sm font-semibold leading-none tracking-[-0.03em] text-ink-muted-48 dark:text-body-muted">
          {year === '' ? '연도 미상' : `${year}년`}
        </h2>
      </div>
      <hr className="border-hairline dark:border-ink-muted-80" />
      <CarouselRow items={displayItems} className="md:mx-5">
        {(item) => {
          const isSub = expandedSubSlugs.has(item.slug)
          const isRep = !!item.series && !isSub
          return (
            <div
              key={item.slug}
              className={isSub ? 'animate-slide-in' : undefined}
            >
              <CoverCard
                item={item}
                showLabel
                isExpanded={isRep && expandedSeries === item.series}
                onToggle={isRep ? () => toggle(item.series!) : undefined}
                href={isRep ? undefined : `/library/${item.slug}`}
              />
            </div>
          )
        }}
      </CarouselRow>
    </div>
  )
}
