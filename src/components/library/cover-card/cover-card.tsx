'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import type { LibraryItemMeta } from '@/types/library'

const DEFAULT_COVER_HEIGHT = 128

interface CoverCardProps {
  item: LibraryItemMeta
  coverHeight?: number
  showLabel?: boolean
  badges?: ReactNode
  isExpanded?: boolean
  onToggle?: () => void
  href?: string
}

export function CoverCard({
  item,
  coverHeight = DEFAULT_COVER_HEIGHT,
  showLabel = false,
  badges,
  isExpanded,
  onToggle,
  href,
}: CoverCardProps) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  const renderWidth
    = item.width && item.height
      ? Math.round((item.width / item.height) * coverHeight)
      : Math.round(0.6 * coverHeight)

  const cover = (
    <div
      aria-label={item.title}
      role={onToggle ? 'button' : undefined}
      tabIndex={onToggle ? 0 : undefined}
      onClick={onToggle}
      onKeyDown={onToggle ? (e) => { if (e.key === 'Enter' || e.key === ' ') onToggle() } : undefined}
      className={cn(
        'relative shrink-0 overflow-hidden rounded outline outline-black/4 -outline-offset-1',
        onToggle && 'cursor-pointer',
        isExpanded && 'ring-2 ring-inset ring-primary/60',
      )}
      style={{ width: renderWidth, height: coverHeight }}
    >
      {item.cover
        ? (
            <>
              {!loaded && (
                <Skeleton className="absolute inset-0 rounded-none" />
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={item.cover}
                alt={item.title}
                width={renderWidth}
                height={coverHeight}
                loading="lazy"
                decoding="async"
                onLoad={() => setLoaded(true)}
                className={cn(
                  'block h-full w-full transition-opacity duration-200',
                  loaded ? 'opacity-100' : 'opacity-0',
                )}
              />
            </>
          )
        : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-200 p-2 dark:bg-neutral-700">
              <span className="text-center text-xs font-medium leading-tight text-ink-muted-48 dark:text-body-muted">
                {item.title}
              </span>
            </div>
          )}
      <div className="pointer-events-none absolute left-1 top-1 flex gap-1">
        {badges}
        {(item.seriesCount ?? 0) > 1 && (
          <Badge variant="solid" tone="light">series</Badge>
        )}
      </div>
    </div>
  )

  if (!showLabel) return cover

  const card = (
    <>
      {cover}
      <span className="line-clamp-2 text-center text-xs leading-tight text-ink group-hover:underline dark:text-body-on-dark">
        {item.title}
      </span>
    </>
  )

  // onToggle(시리즈 펼침)이 있으면 토글이 우선 — Link 래핑하지 않는다.
  if (href && !onToggle) {
    return (
      <Link href={href} className="group flex shrink-0 flex-col gap-1.5" style={{ width: renderWidth }}>
        {card}
      </Link>
    )
  }

  return (
    <div className="group flex shrink-0 flex-col gap-1.5" style={{ width: renderWidth }}>
      {card}
    </div>
  )
}
