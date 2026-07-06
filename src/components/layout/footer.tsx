import Image from 'next/image'
import Link from 'next/link'
import { footerMeta, footerNav, siteConfig } from '@/config/site'
import profileImg from '@/assets/profile.png'

const linkClass
  = 'relative inline-block py-0.5 text-sm text-ink-muted-48 dark:text-body-muted transition-colors hover:text-ink dark:hover:text-body-on-dark after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-100'

export function Footer() {
  const year = new Date().getFullYear()

  const groups = footerNav
    .map(group => ({
      ...group,
      items: group.items.filter(item => item.enabled),
    }))
    .filter(group => group.items.length > 0)

  return (
    <footer className="border-t border-hairline bg-canvas-parchment py-16 dark:border-ink-muted-80 dark:bg-surface-tile-3">
      <div className="mx-auto max-w-4xl px-6">

        {/* 메인: 좌측 Bio + 우측 Nav 컬럼 */}
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between sm:gap-16">
          {/* Bio */}
          <div className="flex flex-col gap-3">
            <div className="relative size-16 overflow-hidden rounded-full border border-hairline bg-canvas-parchment dark:border-ink-muted-80 dark:bg-surface-tile-2">
              <Image
                src={profileImg}
                alt={`${siteConfig.name} 프로필`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-ink dark:text-body-on-dark">
                {siteConfig.name}
              </p>
              <p className="text-sm text-ink-muted-48 dark:text-body-muted">
                {siteConfig.description}
              </p>
            </div>
          </div>

          {/* Nav 컬럼 */}
          <div className="grid grid-cols-4 gap-8">
            {groups.map(group => (
              <div key={group.title} className="ml-auto w-max min-w-28">
                <h2 className="pb-4 text-sm font-semibold text-ink dark:text-body-on-dark">
                  {group.title}
                </h2>
                <ul className="flex flex-col gap-1.5">
                  {group.items.map(item =>
                    item.external
                      ? (
                          <li key={item.label}>
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={linkClass}
                            >
                              {item.label}
                            </a>
                          </li>
                        )
                      : (
                          <li key={item.href}>
                            <Link href={item.href} className={linkClass}>
                              {item.label}
                            </Link>
                          </li>
                        ),
                  )}
                </ul>
              </div>
            ))}

            {/* 메타데이터 */}
            <div className="ml-auto w-max min-w-28">
              <h2 className="pb-4 text-sm font-semibold text-ink dark:text-body-on-dark">
                {footerMeta.title}
              </h2>
              <dl className="flex flex-col gap-1.5">
                {footerMeta.items.map(({ label, value, href }) => (
                  <div key={label} className="flex items-baseline gap-2">
                    <dt className="w-8 shrink-0 text-sm text-ink-muted-48 dark:text-body-muted">{label}</dt>
                    <dd>
                      {href
                        ? <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>{value}</a>
                        : <span className="text-sm text-ink-muted-48 dark:text-body-muted">{value}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* 하단 바 */}
        <div className="mt-12 flex flex-col gap-1 border-t border-hairline pt-6 text-xs text-ink-muted-48 sm:flex-row sm:justify-between dark:border-ink-muted-80 dark:text-body-muted">
          <div className="flex items-center gap-3">
            <span>
              ©
              {year}
              {' '}
              {siteConfig.name}
              . All rights reserved.
            </span>
          </div>
          <span>{siteConfig.location}</span>
        </div>

      </div>
    </footer>
  )
}
