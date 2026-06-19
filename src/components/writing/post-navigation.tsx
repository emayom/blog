import Link from 'next/link'
import { cn } from '@/lib/cn'
import type { AdjacentPosts } from '@/types/post-navigation'

const labelClass = 'text-sm tracking-[-0.224px] text-ink-muted-48 dark:text-body-muted'
const titleClass
  = 'mt-2.5 text-[17px] font-semibold leading-[1.24] tracking-[-0.374px] text-ink group-hover:text-primary dark:text-body-on-dark dark:group-hover:text-primary-on-dark'

export function PostNavigation({ prev, next }: AdjacentPosts) {
  if (!prev && !next) return null

  return (
    <>
      <div className="my-12 h-px bg-hairline dark:bg-ink-muted-80" />

      <nav aria-label="이전·다음 글" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {prev && (
          <Link
            href={`/writing/${prev.slug}`}
            className="group flex flex-col rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus"
          >
            <span className={labelClass}>이전 글</span>
            <span className={titleClass}>{prev.title}</span>
          </Link>
        )}

        {next && (
          <Link
            href={`/writing/${next.slug}`}
            className={cn(
              'group flex flex-col rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus sm:items-end sm:text-right',
              !prev && 'sm:col-start-2',
            )}
          >
            <span className={labelClass}>다음 글</span>
            <span className={titleClass}>{next.title}</span>
          </Link>
        )}
      </nav>
    </>
  )
}
