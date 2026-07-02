'use client'

import { CarouselRow } from '@/components/ui/carousel-row'
import { CoverCard } from '@/components/library/cover-card'
import type { LibraryItemMeta } from '@/types/library'

interface YearSectionProps {
  year: string
  items: LibraryItemMeta[]
}

export function YearSection({ year, items }: YearSectionProps) {
  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex items-center justify-between self-stretch md:px-5">
        <h2 className="text-sm font-semibold leading-none tracking-[-0.03em] text-ink-muted-48 dark:text-body-muted">
          {year === '' ? '연도 미상' : `${year}년`}
        </h2>
        {/* <span className="cursor-not-allowed text-xs text-ink-muted-48 dark:text-body-muted">
          모두 보기
        </span> */}
      </div>
      <hr className="border-hairline dark:border-ink-muted-80" />
      <CarouselRow items={items} className="md:mx-5">
        {item => <CoverCard key={item.slug} item={item} showLabel />}
      </CarouselRow>
    </div>
  )
}
