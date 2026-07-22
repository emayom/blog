import Image from 'next/image'
import Link from 'next/link'
import { footerMeta, footerNav, siteConfig } from '@/config/site'
import { Text } from '@/components/ui/text'
import profileImg from '@/assets/profile.png'

// 크기는 Text의 variant가 정한다 — 여기는 링크 밑줄 애니메이션만 담당한다.
const linkClass
  = 'relative inline-block py-0.5 text-fg-subtle dark:text-body-muted transition-colors hover:text-fg dark:hover:text-body-on-dark after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100'

const columnTitleClass = 'pb-4 text-fg dark:text-body-on-dark'
const mutedClass = 'text-fg-subtle dark:text-body-muted'

export function Footer() {
  const year = new Date().getFullYear()

  const groups = footerNav
    .map(group => ({
      ...group,
      items: group.items.filter(item => item.enabled),
    }))
    .filter(group => group.items.length > 0)

  return (
    <footer className="border-t border-hairline bg-canvas-parchment py-16 dark:border-fg-muted dark:bg-surface-tile-3">
      <div className="mx-auto max-w-4xl px-6">

        {/* 메인: 좌측 Bio + 우측 Nav 컬럼 */}
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between sm:gap-16">
          {/* Bio */}
          <div className="flex flex-col gap-3">
            <div className="relative size-16 overflow-hidden rounded-full border border-hairline bg-canvas-parchment dark:border-fg-muted dark:bg-surface-tile-2">
              <Image
                src={profileImg}
                alt={`${siteConfig.name} 프로필`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Text variant="label-md" weight="semibold" className="text-fg dark:text-body-on-dark">
                {siteConfig.name}
              </Text>
              <Text variant="label-md" className={mutedClass}>
                {siteConfig.description}
              </Text>
            </div>
          </div>

          {/* Nav 컬럼 */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-4">
            {groups.map(group => (
              <div key={group.title} className="w-max min-w-28">
                <Text as="h2" variant="label-md" weight="semibold" className={columnTitleClass}>
                  {group.title}
                </Text>
                <ul className="flex flex-col gap-1.5">
                  {group.items.map(item =>
                    item.external
                      ? (
                          <li key={item.label}>
                            <Text
                              as="a"
                              variant="label-md"
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={linkClass}
                            >
                              {item.label}
                            </Text>
                          </li>
                        )
                      : (
                          <li key={item.href}>
                            <Text as={Link} variant="label-md" href={item.href} className={linkClass}>
                              {item.label}
                            </Text>
                          </li>
                        ),
                  )}
                </ul>
              </div>
            ))}

            {/* 메타데이터 */}
            <div className="w-max min-w-28">
              <Text as="h2" variant="label-md" weight="semibold" className={columnTitleClass}>
                {footerMeta.title}
              </Text>
              <dl className="flex flex-col gap-1.5">
                {footerMeta.items.map(({ label, value, href }) => (
                  <div key={label} className="flex items-baseline gap-2">
                    <Text as="dt" variant="label-md" className={`w-8 shrink-0 ${mutedClass}`}>{label}</Text>
                    <dd>
                      {href
                        ? (
                            <Text as="a" variant="label-md" href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                              {value}
                            </Text>
                          )
                        : <Text as="span" variant="label-md" className={mutedClass}>{value}</Text>}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* 하단 바 */}
        <div className={`mt-12 flex flex-col gap-1 border-t border-hairline pt-6 sm:flex-row sm:justify-between dark:border-fg-muted ${mutedClass}`}>
          <Text as="span" variant="label-sm">
            ©
            {year}
            {' '}
            {siteConfig.name}
            . All rights reserved.
          </Text>
          <Text as="span" variant="label-sm">{siteConfig.location}</Text>
        </div>

      </div>
    </footer>
  )
}
