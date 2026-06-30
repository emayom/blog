'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Tag } from '@/components/writing/tag'
import type { SeriesSummary } from '@/types/series-navigation'

const ITEMS_PER_PAGE = 4

interface SeriesSectionProps {
  series: SeriesSummary[]
}

export function SeriesSection({ series }: SeriesSectionProps) {
  const [page, setPage] = useState(0)

  if (series.length === 0) return null

  const totalPages = Math.ceil(series.length / ITEMS_PER_PAGE)
  const visible = series.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)

  return (
    <section aria-label="시리즈">
      <hr className="my-12 border-hairline dark:border-ink-muted-80" />
      <div className="mb-4.5 flex items-center justify-between">
        <Heading size="sm">시리즈</Heading>
        {totalPages > 1 && (
          <div className="flex gap-2">
            <Button onClick={() => setPage(p => p - 1)} disabled={page === 0} aria-label="이전 시리즈" className="size-8 rounded-full p-0">‹</Button>
            <Button onClick={() => setPage(p => p + 1)} disabled={page === totalPages - 1} aria-label="다음 시리즈" className="size-8 rounded-full p-0">›</Button>
          </div>
        )}
      </div>
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {visible.map(s => (
          <Link
            key={s.slug}
            href={`/series/${s.slug}`}
            className="group block overflow-hidden rounded-lg border border-hairline bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus dark:border-ink-muted-80 dark:bg-surface-tile-2"
          >
            <div className="aspect-square w-full bg-canvas-parchment dark:bg-surface-tile-2" />
            <div className="px-4 py-3.5">
              <div className="text-md font-semibold leading-[1.24] tracking-[-0.374px] text-ink group-hover:text-primary dark:text-body-on-dark dark:group-hover:text-primary-on-dark">
                {s.name}
              </div>
              <Tag as="span" label={`${s.count}편`} className="mt-2" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
