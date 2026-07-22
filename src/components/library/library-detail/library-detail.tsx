import { formatDate } from '@/lib/format-date'
import { Divider } from '@/components/ui/divider'
import { BackLink } from '@/components/ui/back-link'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { EmptyState } from '@/components/ui/empty-state'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import type { LibraryItem } from '@/types/library'

interface LibraryDetailProps {
  item: LibraryItem
  hasBody: boolean
}

export function LibraryDetail({ item, hasBody }: LibraryDetailProps) {
  const ratio = item.width && item.height ? item.width / item.height : 0.6
  const hasQuotes = item.quotes !== undefined && item.quotes.length > 0
  // 목록으로 복귀 시 항목의 카테고리 탭을 유지 (book만 파라미터 필요 — anime는 기본값)
  const backHref = item.type === 'book' ? '/library?type=book' : '/library'

  const metaParts = [
    item.date && <time key="date" dateTime={item.date}>{formatDate(item.date)}</time>,
    item.genres && item.genres.length > 0 && <span key="genres">{item.genres.join('·')}</span>,
  ].filter(Boolean)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Breadcrumb
        items={[
          { label: '홈', href: '/' },
          { label: '책장', href: backHref },
          { label: item.title, truncate: true },
        ]}
      />

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
                  <span className="text-center text-xs font-medium leading-tight text-fg-subtle dark:text-body-muted">
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
            <p className="text-title-md text-fg-muted dark:text-body-muted">
              {item.author}
            </p>
          )}

          {metaParts.length > 0 && (
            <Text variant="label-md" className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-fg-subtle dark:text-body-muted">
              {metaParts.map((part, i) => (
                <span key={i} className="flex items-center gap-x-2">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  {part}
                </span>
              ))}
            </Text>
          )}

          {item.status && (
            <Badge variant="outline" className="mt-3">{item.status}</Badge>
          )}
        </div>
      </div>

      <Divider className="my-8" />

      {hasQuotes || hasBody
        ? (
            <>
              {hasQuotes && (
                <section aria-label="문장수집">
                  <Heading as="h2" size="sm" className="mb-4">문장수집</Heading>
                  <div className="space-y-lg">
                    {item.quotes!.map((quote, i) => (
                      <Text
                        as="blockquote"
                        key={i}
                        className="border-l-2 border-primary bg-canvas-parchment py-sm pl-lg pr-md text-fg-muted dark:border-primary-on-dark dark:bg-surface-tile-2 dark:text-body-muted"
                      >
                        {quote}
                      </Text>
                    ))}
                  </div>
                </section>
              )}

              {hasQuotes && hasBody && <Divider className="my-8" />}

              {hasBody && (
                <section>
                  <Heading as="h2" size="sm" className="mb-4">서평</Heading>
                  <div className="text-body-lg text-fg-muted dark:text-body-muted [&_p]:mb-md">
                    {item.content}
                  </div>
                </section>
              )}

              <BackLink href={backHref} className="mt-12">책장으로</BackLink>
            </>
          )
        : (
            <EmptyState
              variant="empty"
              title="아직 감상 기록이 없어요"
              action={{ label: '책장으로 돌아가기', href: backHref }}
            />
          )}
    </div>
  )
}
