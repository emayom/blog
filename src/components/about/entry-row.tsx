import Image from 'next/image'
import { ArrowUpRightIcon, BuildingIcon } from '@/components/icons'
import { cn } from '@/lib/cn'

function EntryThumb({ src, alt, className }: { src?: string, alt: string, className?: string }) {
  return (
    <div className={cn('relative flex shrink-0 items-center justify-center overflow-hidden bg-canvas-parchment dark:bg-surface-tile-2', className)}>
      {src
        ? (
            <Image src={src} alt={alt} fill sizes="36px" className="object-contain" />
          )
        : (
            <BuildingIcon size={18} className="text-ink-muted-48 dark:text-body-muted" />
          )}
    </div>
  )
}

export interface EntryRowProps {
  image?: string
  alt: string
  title: string
  subtitle?: string
  meta: string
  description?: string
  href?: string
}

export function EntryRow({ image, alt, title, subtitle, meta, description, href }: EntryRowProps) {
  return (
    <li className="flex gap-3">
      <EntryThumb src={image} alt={alt} className="size-9 rounded-sm" />
      <div className="min-w-0 flex-1 text-base leading-snug tracking-tight">
        <p className="font-medium text-ink dark:text-body-on-dark">
          {title}
          {href && (
            <a
              href={href}
              aria-label={`${title} 링크`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex align-middle text-ink-muted-48 transition-colors hover:text-ink dark:text-body-muted dark:hover:text-body-on-dark"
            >
              <ArrowUpRightIcon size={16} />
            </a>
          )}
        </p>
        {subtitle && (
          <p className="text-sm text-ink-muted-80 dark:text-body-muted">
            {subtitle}
          </p>
        )}
        <p className="text-xs text-ink-muted-48 dark:text-body-muted">
          {meta}
        </p>
        {description && (
          <p className="mt-1 text-sm text-ink-muted-80 dark:text-body-muted">
            {description}
          </p>
        )}
      </div>
    </li>
  )
}
