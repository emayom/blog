import Link from 'next/link'
import { footerMeta, footerNav, siteConfig } from '@/config/site'

const navLinkClass
  = 'inline-block py-1 text-sm text-ink-muted-80 transition-colors hover:text-ink hover:underline dark:text-body-muted dark:hover:text-body-on-dark'

const metaLinkClass
  = 'inline-flex items-center gap-1 py-1 text-sm text-ink-muted-48 transition-colors hover:text-ink hover:underline dark:text-body-muted dark:hover:text-body-on-dark'

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
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-6">
          {groups.map(group => (
            <div key={group.title} className="sm:pb-4">
              <h2 className="pb-4 text-sm font-bold text-ink dark:text-body-on-dark">
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

          <div className="pb-4 sm:col-span-2">
            <h2 className="pb-4 text-sm font-bold text-ink dark:text-body-on-dark">
              {footerMeta.title}
            </h2>
            <dl className="flex flex-col">
              {footerMeta.items.map(({ label, value, href }) => (
                <div key={label} className="flex items-baseline gap-3">
                  <dt className="w-12 shrink-0 py-1 text-sm text-ink-muted-80 dark:text-body-muted">
                    {label}
                  </dt>
                  <dd>
                    {href
                      ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={metaLinkClass}
                          >
                            {value}
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                              className="opacity-60"
                            >
                              <path d="M7 17 17 7M9 7h8v8" />
                            </svg>
                          </a>
                        )
                      : <span className="inline-block py-1 text-sm text-ink-muted-48 dark:text-body-muted">{value}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-1 pt-6 text-sm text-ink-muted-48 sm:flex-row sm:justify-between sm:gap-4 dark:text-body-muted">
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
