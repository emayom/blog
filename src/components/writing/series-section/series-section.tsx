'use client'

import { useEffect, useState } from 'react'
import { Divider } from '@/components/ui/divider'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Tag } from '@/components/ui/tag'
import type { SeriesBrowseItem } from '@/types/series-navigation'

const DESKTOP_PER_PAGE = 4
const MOBILE_PER_PAGE = 1

interface SeriesSectionProps {
  series: SeriesBrowseItem[]
}

export function SeriesSection({ series }: SeriesSectionProps) {
  const [page, setPage] = useState(0)
  // 모바일(<sm)에서는 1개, 그 이상은 4개씩 — 페이징 단위도 함께 맞춰 어긋나지 않게 한다
  const [perPage, setPerPage] = useState(DESKTOP_PER_PAGE)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    function apply() {
      setPerPage(mq.matches ? DESKTOP_PER_PAGE : MOBILE_PER_PAGE)
      setPage(0)
    }
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  if (series.length === 0) return null

  const totalPages = Math.ceil(series.length / perPage)
  const visible = series.slice(page * perPage, (page + 1) * perPage)

  return (
    <section aria-label="엮은 글">
      <Divider className="my-12" />
      <div className="mb-4.5 flex items-center justify-between">
        <Heading size="sm">엮은 글</Heading>
        {totalPages > 1 && (
          <div className="flex gap-2">
            <Button onClick={() => setPage(p => p - 1)} disabled={page === 0} aria-label="이전 시리즈" className="size-8 rounded-full p-0">‹</Button>
            <Button onClick={() => setPage(p => p + 1)} disabled={page === totalPages - 1} aria-label="다음 시리즈" className="size-8 rounded-full p-0">›</Button>
          </div>
        )}
      </div>
      <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-4">
        {visible.map(s => (
          <Link
            key={s.slug}
            href={`/series/${s.slug}`}
            className="group block overflow-hidden rounded-lg border border-hairline bg-canvas focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus dark:border-fg-muted dark:bg-surface-tile-2"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-canvas-parchment dark:bg-surface-tile-2">
              {s.thumbnail && (
                <Image
                  src={s.thumbnail}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 25vw, 100vw"
                  className="object-cover"
                />
              )}
            </div>
            <div className="px-4 py-3.5">
              <div className="text-md font-semibold leading-[1.24] tracking-[-0.374px] text-fg group-hover:text-primary dark:text-body-on-dark dark:group-hover:text-primary-on-dark">
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
