'use client'

import { useRef } from 'react'
import { LibraryCard } from '@/components/library/library-card'
import type { LibraryItemMeta } from '@/types/library'

interface YearSectionProps {
  year: string
  items: LibraryItemMeta[]
}

export function YearSection({ year, items }: YearSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="mb-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-md font-semibold text-ink dark:text-body-on-dark">
          {year === '' ? '연도 미상' : `${year}년`}
        </h2>
        <span className="cursor-not-allowed text-sm text-ink-muted-48 dark:text-body-muted">
          모두 보기
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div
          ref={scrollRef}
          className="flex flex-1 gap-3 overflow-x-auto scroll-smooth [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map(item => (
            <div
              key={item.slug}
              className="w-[110px] flex-none [scroll-snap-align:start]"
            >
              <LibraryCard item={item} />
            </div>
          ))}
        </div>
        <button
          type="button"
          aria-label="다음"
          onClick={() => scrollRef.current?.scrollBy({ left: 240, behavior: 'smooth' })}
          className="flex size-8 flex-none items-center justify-center rounded-full border border-hairline text-ink-muted-48 dark:border-ink-muted-80 dark:text-body-muted"
        >
          ›
        </button>
      </div>
    </section>
  )
}
