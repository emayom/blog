import Link from 'next/link'
import { ArrowUpRightIcon } from '@/components/icons'
import type { PostMeta } from '@/types/post'
import type { LibraryItemMeta } from '@/types/library'
import type { ReactNode } from 'react'

interface HeroProps {
  latestPost?: PostMeta
  nowReading?: LibraryItemMeta
  /** 대표 타일 내부 컨텐츠 — 계절·이벤트 요소를 페이지에서 주입 */
  children?: ReactNode
}

const tileFocus
  = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus'
const tileLift = 'transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0'

export function Hero({ latestPost, nowReading, children }: HeroProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-[1.5fr_1fr] sm:grid-rows-2">
        {/* 대표 타일 — 컨텐츠는 페이지에서 주입 (parchment, 2행 span).
            relative + overflow-hidden: 배경형 주입 요소(absolute inset-0)의 기준·클리핑 */}
        <div className="relative col-span-2 flex min-h-[180px] flex-col overflow-hidden rounded-[18px] bg-canvas-parchment p-7 sm:col-span-1 sm:row-span-2 dark:bg-ink-muted-80">
          {children}
        </div>

        {/* 최근 글 — 다크 타일 */}
        {latestPost && (
          <Link
            href={`/writing/${latestPost.slug}`}
            className={`group flex min-h-[150px] flex-col justify-between rounded-[18px] bg-surface-tile-1 p-6 dark:bg-primary/85 ${tileLift} ${tileFocus}`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-body-muted dark:text-on-primary/75">
                Latest
              </span>
              <ArrowUpRightIcon className="shrink-0 text-body-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none dark:text-on-primary/90" />
            </div>
            <h2 className="font-display text-base font-semibold leading-tight tracking-tight text-body-on-dark line-clamp-3 sm:text-xl">
              {latestPost.title}
            </h2>
          </Link>
        )}

        {/* 지금 읽는 중 — pearl 타일 */}
        {nowReading && (
          <Link
            href="/library"
            className={`group flex min-h-[150px] flex-col justify-between rounded-[18px] border border-divider-soft bg-surface-pearl p-6 ${tileLift} ${tileFocus} dark:border-ink-muted-80 dark:bg-surface-tile-3`}
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted-48 dark:text-body-muted">
              Now reading
            </span>
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-display text-base font-semibold leading-tight tracking-tight text-ink line-clamp-2 sm:text-xl dark:text-body-on-dark">
                  {nowReading.title}
                </h2>
                {nowReading.author && (
                  <span className="mt-1 block truncate text-sm text-ink-muted-48 dark:text-body-muted">
                    {nowReading.author}
                  </span>
                )}
              </div>
            </div>
          </Link>
        )}
      </div>
    </section>
  )
}
