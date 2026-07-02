'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

const navBtn
  = 'absolute top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-full border border-hairline bg-canvas text-ink shadow-sm transition-all duration-150 hover:shadow-md disabled:pointer-events-none disabled:opacity-0 dark:border-ink-muted-80 dark:bg-surface-tile-2 dark:text-body-on-dark'

interface CarouselRowProps<T> {
  items: T[]
  className?: string
  children: (item: T, index: number) => ReactNode
}

export function CarouselRow<T>({ items, className, children }: CarouselRowProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const syncButtons = () => {
    const el = scrollRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 0)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }

  useEffect(() => {
    syncButtons()
    const ro = new ResizeObserver(syncButtons)
    if (scrollRef.current) ro.observe(scrollRef.current)
    return () => ro.disconnect()
  }, [items])

  const scroll = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * scrollRef.current.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className={cn('relative min-w-0 py-1', className)}>
      <button
        type="button"
        onClick={() => scroll(-1)}
        disabled={!canPrev}
        aria-label="이전"
        className={cn(navBtn, '-left-3.5')}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={syncButtons}
          className="flex flex-nowrap gap-1 overflow-x-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, ii) => children(item, ii))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => scroll(1)}
        disabled={!canNext}
        aria-label="다음"
        className={cn(navBtn, '-right-3.5')}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}
