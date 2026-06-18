import type { Metadata } from 'next'
import { siteConfig, social } from '@/config/site'

export const metadata: Metadata = {
  title: '소개',
  description: `${siteConfig.name} 소개`,
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[680px] px-6 py-12">
      <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-[160px_1fr]">
        <div className="relative size-[150px] rounded-full border border-hairline bg-canvas-parchment dark:border-ink-muted-80 dark:bg-surface-tile-2">
          <span className="absolute bottom-1 right-1 rounded-full border border-hairline bg-canvas px-2.5 py-1 text-xs text-ink dark:border-ink-muted-80 dark:bg-surface-tile-1 dark:text-body-on-dark">
            Seoul
          </span>
        </div>

        <div>
          <h1 className="mb-1 font-display text-[28px] font-semibold leading-[1.14] text-ink dark:text-body-on-dark">
            {siteConfig.name}
          </h1>
          <p className="mb-[17px] text-[17px] text-ink-muted-48 dark:text-body-muted">
            배우고 기록하는 개발자입니다.
          </p>

          <ul className="flex flex-wrap gap-2">
            {social
              .filter(item => item.enabled)
              .map(item => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex h-[34px] items-center rounded-full border border-hairline bg-canvas px-4 text-sm text-primary dark:border-ink-muted-80 dark:bg-surface-tile-2 dark:text-primary-on-dark"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 text-[17px] leading-[1.47] text-ink-muted-80 dark:text-body-muted">
        <p className="mb-[17px]">
          안녕하세요. 배운 것과 만든 것을 글로 정리하며 천천히 쌓아가는 것을 좋아합니다.
        </p>
        <p>
          이곳에는 개발하면서 마주한 결정과 그 배경, 그리고 읽고 생각한 것들을 기록합니다.
        </p>
      </div>
    </main>
  )
}
