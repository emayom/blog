import type { Metadata } from 'next'
import Image from 'next/image'
import { siteConfig, social } from '@/config/site'
import profileImg from '@/assets/profile.png'
import { Icon } from '@/components/icons'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: '소개',
  description: `${siteConfig.name} 소개`,
  path: '/about',
})

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-[160px_1fr]">
        <div className="relative size-[150px]">
          <div className="absolute inset-0 overflow-hidden rounded-full border border-hairline bg-canvas-parchment dark:border-ink-muted-80 dark:bg-surface-tile-2">
            <Image
              src={profileImg}
              alt={`${siteConfig.name} 프로필`}
              fill
              sizes="150px"
              className="object-cover"
              placeholder="blur"
              priority
            />
          </div>
          <span className="absolute bottom-1 right-1 rounded-full border border-hairline bg-canvas px-2.5 py-1 text-xs text-ink dark:border-ink-muted-80 dark:bg-surface-tile-1 dark:text-body-on-dark">
            Seoul
          </span>
        </div>

        <div>
          <h1 className="mb-1.5 font-display text-3xl font-semibold leading-tight tracking-tight text-ink dark:text-body-on-dark">
            {siteConfig.name}
          </h1>
          <p className="mb-md text-lg leading-relaxed tracking-tight text-ink-muted-48 dark:text-body-muted">
            배우고 기록하는 개발자입니다.
          </p>

          <ul className="flex flex-wrap gap-2">
            {social
              .filter(item => item.enabled)
              .map(item => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex size-9 items-center justify-center rounded-full text-ink-muted-80 transition-colors hover:bg-canvas-parchment hover:text-ink dark:text-body-muted dark:hover:bg-surface-tile-2 dark:hover:text-body-on-dark"
                  >
                    <Icon name={item.icon} />
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 text-base leading-relaxed tracking-tight text-ink-muted-80 dark:text-body-muted">
        <div className="space-y-1">
          <p>
            안녕하세요. 배우고 만든 것을 글로 정리하면서 제 나름의 관점을 만들어가는 것을 좋아합니다.
          </p>
          <p>
            무엇이든 ‘왜?’에서 출발해, 이해한 것을 제 언어로 재구성하고 그 위에 생각들을 쌓아갑니다.
          </p>
        </div>

        <div className="space-y-1 mt-6">
          <p>
            산책을 아주 좋아해서, 막힌 생각은 대체로 걸으면서 풉니다.
          </p>
        </div>
      </div>
    </main>
  )
}
