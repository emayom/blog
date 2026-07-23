import Link from 'next/link'
import { Divider } from '@/components/ui/divider'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import type { SeriesNavigation as SeriesNavigationData } from '@/types/series-navigation'

interface SeriesNavigationProps {
  series: SeriesNavigationData | null
}

const itemLinkClass
  = 'flex rounded-sm text-fg-muted transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus'

// weight prop 대신 font-semibold를 얹는다 — weight="semibold"는 title-md로 스냅해
// 행간이 조여지고(1.3), 그러면 형제 링크(body-lg 1.47)와 목록 리듬이 어긋난다.
const currentItemClass = 'flex font-semibold text-primary'

export function SeriesNavigation({ series }: SeriesNavigationProps) {
  if (!series) return null

  return (
    <>
      <Divider className="my-12" />

      <section aria-label="시리즈">
        <Heading size="md">
          {series.name}
          <span aria-hidden="true"> · </span>
          <span className="font-normal text-fg-subtle">
            {`${series.total}편 중 ${series.currentPosition}번째`}
          </span>
        </Heading>

        <ol className="mt-6 list-none space-y-2.5">
          {series.items.map(item => (
            <li key={item.post.slug}>
              {item.isCurrent
                ? (
                    <Text as="span" aria-current="true" className={currentItemClass}>
                      {`${item.order}. ${item.post.title}`}
                    </Text>
                  )
                : (
                    <Text as={Link} href={`/writing/${item.post.slug}`} className={itemLinkClass}>
                      {`${item.order}. ${item.post.title}`}
                    </Text>
                  )}
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
