'use client'

import { useRef } from 'react'
import Image from 'next/image'
import type { LibraryItemMeta } from '@/types/library'

interface FeaturedSectionProps {
  items: LibraryItemMeta[]
}

const LABEL = (
  <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-ink-muted-48 dark:text-body-muted">
    Featured
  </p>
)

function Pin({ className }: { className?: string }) {
  return (
    <span
      className={`absolute left-2 top-2 size-[22px] rounded-full bg-ink dark:bg-body-on-dark ${className ?? ''}`}
    />
  )
}

function Poster({ item, className }: { item: LibraryItemMeta, className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm bg-canvas-parchment shadow-[3px_5px_30px_rgba(0,0,0,0.22)] dark:bg-surface-tile-3 ${className ?? ''}`}
    >
      {item.cover
        ? (
            <Image src={item.cover} alt={item.title} fill className="object-cover" />
          )
        : (
            <span className="flex h-full w-full items-center justify-center text-2xl font-semibold text-ink-muted-48 dark:text-body-muted">
              {item.title.charAt(0)}
            </span>
          )}
    </div>
  )
}

export function FeaturedSection({ items }: FeaturedSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (items.length === 0) return null

  const first = items[0]

  return (
    <section className="mb-9">
      {/* PC: 첫 번째 항목 포스터만 */}
      <div className="hidden md:block">
        {LABEL}
        <div className="relative inline-block">
          <Poster item={first} className="h-[210px] w-[150px]" />
          <Pin />
        </div>
        <p className="mt-2 line-clamp-2 w-[150px] text-xs text-ink dark:text-body-on-dark">
          {first.title}
        </p>
      </div>

      {/* 모바일: 전체 너비 카드, 여럿이면 가로 스크롤 + 버튼 */}
      <div className="md:hidden">
        {LABEL}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map(item => (
            <div
              key={item.slug}
              className="relative w-full flex-none overflow-hidden rounded-lg border border-hairline [scroll-snap-align:start] dark:border-ink-muted-80"
            >
              <div className="relative h-[200px] w-full bg-canvas-parchment dark:bg-surface-tile-3">
                {item.cover
                  ? (
                      <Image src={item.cover} alt={item.title} fill className="object-cover" />
                    )
                  : (
                      <span className="flex h-full w-full items-center justify-center text-2xl font-semibold text-ink-muted-48 dark:text-body-muted">
                        {item.title.charAt(0)}
                      </span>
                    )}
              </div>
              <Pin />
              <p className="line-clamp-2 p-3 text-sm text-ink dark:text-body-on-dark">
                {item.title}
              </p>
            </div>
          ))}
        </div>
        {items.length > 1 && (
          <div className="mt-2 flex justify-center gap-2.5">
            <button
              type="button"
              aria-label="이전"
              onClick={() => scrollRef.current?.scrollBy({ left: -280, behavior: 'smooth' })}
              className="flex size-[26px] items-center justify-center rounded-full border border-hairline text-xs text-ink-muted-48 dark:border-ink-muted-80 dark:text-body-muted"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="다음"
              onClick={() => scrollRef.current?.scrollBy({ left: 280, behavior: 'smooth' })}
              className="flex size-[26px] items-center justify-center rounded-full border border-hairline text-xs text-ink-muted-48 dark:border-ink-muted-80 dark:text-body-muted"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
