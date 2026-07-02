'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { LibraryItemMeta } from '@/types/library'

const DEFAULT_COVER_HEIGHT = 128

type BadgeVariant = 'dark' | 'light'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
}

export function CoverBadge({ children, variant = 'light' }: BadgeProps) {
  const styles = variant === 'dark' ? 'bg-black/80 text-white/90' : 'bg-white/80 text-black/90'
  return (
    <span className={cn('rounded px-1 py-1 text-xs font-semibold leading-none', styles)}>
      {children}
    </span>
  )
}

interface CoverCardProps {
  item: LibraryItemMeta
  coverHeight?: number
  showLabel?: boolean
  badges?: ReactNode
}

export function CoverCard({
  item,
  coverHeight = DEFAULT_COVER_HEIGHT,
  showLabel = false,
  badges,
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
      className="relative shrink-0 overflow-hidden rounded outline outline-black/4 -outline-offset-1"
      style={{ width: renderWidth, height: coverHeight }}
    >
      {item.cover
        ? (
            <>
              {!loaded && (
                <div className="absolute inset-0 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
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
      {badges && (
        <div className="pointer-events-none absolute left-1 top-1 flex gap-1">{badges}</div>
      )}
    </div>
  )

  if (!showLabel) return cover

  return (
    <div className="flex shrink-0 flex-col gap-1.5" style={{ width: renderWidth }}>
      {cover}
      <span className="line-clamp-2 text-center text-xs leading-tight text-ink dark:text-body-on-dark">
        {item.title}
      </span>
    </div>
  )
}
