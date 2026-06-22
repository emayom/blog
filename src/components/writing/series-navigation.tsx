import Link from 'next/link'
import type { SeriesNavigation as SeriesNavigationData } from '@/types/series-navigation'

interface SeriesNavigationProps {
  series: SeriesNavigationData | null
}

const itemLinkClass
  = 'flex rounded-sm text-[17px] leading-[1.47] tracking-[-0.374px] text-ink-muted-80 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus dark:text-body-muted dark:hover:text-primary-on-dark'

const currentItemClass
  = 'flex text-[17px] font-semibold leading-[1.47] tracking-[-0.374px] text-primary dark:text-primary-on-dark'

export function SeriesNavigation({ series }: SeriesNavigationProps) {
  if (!series) return null

  return (
    <>
      <div className="my-12 h-px bg-hairline dark:bg-ink-muted-80" />

      <section aria-label="시리즈">
        <h2 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.2px]">
          <span className="text-ink dark:text-body-on-dark">{series.name}</span>
          <span aria-hidden="true"> · </span>
          <span className="font-normal text-ink-muted-48 dark:text-body-muted">
            {`${series.total}편 중 ${series.currentPosition}번째`}
          </span>
        </h2>

        <ol className="mt-6 list-none space-y-2.5">
          {series.items.map(item => (
            <li key={item.post.slug}>
              {item.isCurrent
                ? (
                    <span aria-current="true" className={currentItemClass}>
                      {`${item.order}. ${item.post.title}`}
                    </span>
                  )
                : (
                    <Link href={`/writing/${item.post.slug}`} className={itemLinkClass}>
                      {`${item.order}. ${item.post.title}`}
                    </Link>
                  )}
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
