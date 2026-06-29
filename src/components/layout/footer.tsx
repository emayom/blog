import Link from 'next/link'
import { footerNav, siteConfig } from '@/config/site'

const navLinkClass
  = 'inline-block py-1 text-xs text-ink-muted-80 transition-colors hover:text-ink hover:underline dark:text-body-muted dark:hover:text-body-on-dark'

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
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-5">
          {groups.map(group => (
            <div key={group.title} className="pb-4">
              <h2 className="pb-2 text-xs font-bold text-ink dark:text-body-on-dark">
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
                            className={navLinkClass}
                          >
                            {item.label}
                          </a>
                        </li>
                      )
                    : (
                        <li key={item.href}>
                          <Link href={item.href} className={navLinkClass}>
                            {item.label}
                          </Link>
                        </li>
                      ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-1 border-t border-hairline pt-6 text-xs text-ink-muted-48 sm:flex-row sm:justify-between sm:gap-4 dark:border-ink-muted-80">
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
