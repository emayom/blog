import Link from 'next/link'
import { footerNav, siteConfig } from '@/config/site'

export function Footer() {
  const year = new Date().getFullYear()
  const groups = footerNav
    .map(group => ({
      ...group,
      items: group.items.filter(item => item.enabled),
    }))
    .filter(group => group.items.length > 0)

  return (
    <footer className="border-t border-hairline bg-canvas-parchment py-12 dark:border-ink-muted-80 dark:bg-surface-tile-3">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="text-[21px] font-semibold text-ink dark:text-body-on-dark">
            {siteConfig.name}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {groups.map(group => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold text-ink dark:text-body-on-dark">
                  {group.title}
                </h2>
                <ul>
                  {group.items.map(item =>
                    item.external
                      ? (
                          <li key={item.label}>
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ lineHeight: 2.41 }}
                              className="text-[17px] text-ink-muted-80 transition-colors hover:text-ink dark:text-body-muted dark:hover:text-body-on-dark"
                            >
                              {item.label}
                            </a>
                          </li>
                        )
                      : (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              style={{ lineHeight: 2.41 }}
                              className="text-[17px] text-ink-muted-80 transition-colors hover:text-ink dark:text-body-muted dark:hover:text-body-on-dark"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-1 border-t border-hairline pt-6 text-xs text-ink-muted-48 sm:flex-row sm:gap-4 dark:border-ink-muted-80">
          <span>
            ©
            {' '}
            {year}
            .
            {' '}
            {siteConfig.name}
          </span>
          <span>{siteConfig.location}</span>
        </div>
      </div>
    </footer>
  )
}
