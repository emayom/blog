import Link from 'next/link'
import { formatDate } from '@/lib/format-date'
import { EmptyState } from '@/components/ui/empty-state'
import { Heading } from '@/components/ui/heading'
import type { LibraryItem } from '@/types/library'

interface LibraryDetailProps {
  item: LibraryItem
  hasBody: boolean
}

function Rating({ rating }: { rating: number }) {
  const filled = Math.round(rating)
  return (
    <span aria-label={`별점 ${rating}/5`}>
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} aria-hidden="true" className={n <= filled ? 'text-primary' : 'text-ink-muted-48'}>
          ★
        </span>
      ))}
    </span>
  )
}

export function LibraryDetail({ item, hasBody }: LibraryDetailProps) {
  const ratio = item.width && item.height ? item.width / item.height : 0.6

  const metaParts = [
    item.date && <time key="date" dateTime={item.date}>{formatDate(item.date)}</time>,
    item.rating !== undefined && <Rating key="rating" rating={item.rating} />,
    item.genres && item.genres.length > 0 && <span key="genres">{item.genres.join('·')}</span>,
  ].filter(Boolean)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <nav aria-label="breadcrumb" className="mb-6 text-xs tracking-[-0.12px] text-ink-muted-48">
        <Link href="/" className="text-primary hover:underline dark:text-primary-on-dark">홈</Link>
        <span aria-hidden="true"> / </span>
        <Link href="/library" className="text-primary hover:underline dark:text-primary-on-dark">책장</Link>
        <span aria-hidden="true"> / </span>
        <span className="max-w-[40ch] truncate">{item.title}</span>
      </nav>

      <div className="flex items-start gap-6">
        <div
          className="h-48 shrink-0 overflow-hidden rounded outline outline-black/4 -outline-offset-1 sm:h-56"
          style={{ aspectRatio: ratio }}
        >
          {item.cover
            ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.cover}
                  alt={item.title}
                  className="block h-full w-full"
                />
              )
            : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-200 p-2 dark:bg-neutral-700">
                  <span className="text-center text-xs font-medium leading-tight text-ink-muted-48 dark:text-body-muted">
                    {item.title}
                  </span>
                </div>
              )}
        </div>

        <div className="min-w-0 flex-1">
          <Heading as="h1" size="xl" className="mb-2">
            {item.title}
          </Heading>

          {item.author && (
            <p className="text-md font-semibold text-ink-muted-80 dark:text-body-muted">
              {item.author}
            </p>
          )}

          {metaParts.length > 0 && (
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm tracking-[-0.224px] text-ink-muted-48 dark:text-body-muted">
              {metaParts.map((part, i) => (
                <span key={i} className="flex items-center gap-x-2">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  {part}
                </span>
              ))}
            </p>
          )}

          {item.status && (
            <span className="mt-3 inline-flex rounded-md border border-hairline bg-surface-pearl px-3 py-1 text-xs text-ink-muted-80 dark:border-ink-muted-80 dark:bg-surface-tile-2 dark:text-body-muted">
              {item.status}
            </span>
          )}
        </div>
      </div>

      <div className="my-8 h-px bg-hairline dark:bg-ink-muted-80" />

      {hasBody
        ? (
            <>
              <div className="text-[17px] leading-[1.47] tracking-[-0.374px] text-ink-muted-80 dark:text-body-muted [&_p]:mb-md">
                {item.content}
              </div>
              <Link
                href="/library"
                className="mt-12 inline-block text-sm tracking-[-0.224px] text-primary dark:text-primary-on-dark"
              >
                ← 책장으로
              </Link>
            </>
          )
        : (
            <EmptyState
              variant="empty"
              title="아직 감상 기록이 없어요"
              action={{ label: '책장으로 돌아가기', href: '/library' }}
            />
          )}
    </div>
  )
}
