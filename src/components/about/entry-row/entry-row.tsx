import Image from 'next/image'
import { ArrowUpRightIcon, BuildingIcon } from '@/components/icons'
import { cn } from '@/lib/cn'

function EntryThumb({ src, alt, className }: { src?: string, alt: string, className?: string }) {
  return (
    <div className={cn('relative flex shrink-0 items-center justify-center overflow-hidden bg-canvas-parchment', className)}>
      {src
        ? (
            <Image src={src} alt={alt} fill sizes="36px" className="object-contain" />
          )
        : (
            <BuildingIcon size={18} className="text-fg-subtle" />
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
      <div className="min-w-0 flex-1 text-body-lg">
        <p className="font-medium text-fg">
          {title}
          {href && (
            <a
              href={href}
              aria-label={`${title} 링크`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex align-middle text-fg-subtle transition-colors hover:text-fg"
            >
              <ArrowUpRightIcon size={16} />
            </a>
          )}
        </p>
        {subtitle && (
          <p className="text-label-md text-fg-muted">
            {subtitle}
          </p>
        )}
        <p className="text-label-sm text-fg-subtle">
          {meta}
        </p>
        {description && (
          <p className="mt-1 text-label-md text-fg-muted">
            {description}
          </p>
        )}
      </div>
    </li>
  )
}
