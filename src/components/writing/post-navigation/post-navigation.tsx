import Link from 'next/link'
import { Divider } from '@/components/ui/divider'
import { cn } from '@/lib/cn'
import { Text } from '@/components/ui/text'
import type { AdjacentPosts } from '@/types/post-navigation'

const labelClass = 'text-fg-subtle'
const titleClass
  = 'mt-2.5 text-fg group-hover:text-primary'

export function PostNavigation({ prev, next }: AdjacentPosts) {
  if (!prev && !next) return null

  return (
    <>
      <Divider className="my-12" />

      <nav aria-label="이전·다음 글" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {prev && (
          <Link
            href={`/writing/${prev.slug}`}
            className="group flex flex-col rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus"
          >
            <Text as="span" variant="label-md" className={labelClass}>이전 글</Text>
            <Text as="span" weight="semibold" className={titleClass}>{prev.title}</Text>
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
            <Text as="span" variant="label-md" className={labelClass}>다음 글</Text>
            <Text as="span" weight="semibold" className={titleClass}>{next.title}</Text>
          </Link>
        )}
      </nav>
    </>
  )
}
