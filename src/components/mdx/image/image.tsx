import type { ComponentPropsWithoutRef } from 'react'

// MDX 본문의 단일 이미지. alt를 캡션으로도 노출한다.
export function MdxImage({ src, alt, ...props }: ComponentPropsWithoutRef<'img'>) {
  return (
    <figure className="my-xl">
      <img src={src} alt={alt ?? ''} className="w-full rounded-sm" {...props} />
      {alt && (
        <figcaption className="mt-xs text-center text-sm text-ink-muted-48 dark:text-body-muted">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}
