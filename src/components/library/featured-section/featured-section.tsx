'use client'

import { CarouselRow } from '@/components/ui/carousel-row'
import { Divider } from '@/components/ui/divider'
import { Badge } from '@/components/ui/badge'
import { CoverCard } from '@/components/library/cover-card'
import type { LibraryItemMeta } from '@/types/library'

interface FeaturedSectionProps {
  items: LibraryItemMeta[]
}

export function FeaturedSection({ items }: FeaturedSectionProps) {
  if (items.length === 0) return null

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="flex items-center justify-between self-stretch md:px-5">
        <span className="text-xs font-semibold text-fg-subtle dark:text-body-muted">
          Featured
        </span>
      </div>
      <Divider />
      <CarouselRow items={items} className="md:mx-5">
        {item => (
          <CoverCard
            key={item.slug}
            item={item}
            coverHeight={180}
            showLabel
            href={`/library/${item.slug}`}
            badges={(
              <Badge variant="solid" tone="dark">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 17v5" />
                  <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
                </svg>
              </Badge>
            )}
          />
        )}
      </CarouselRow>
    </div>
  )
}
