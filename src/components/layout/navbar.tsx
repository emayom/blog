import Link from 'next/link'
import { mainNav, siteConfig, social } from '@/config/site'
import { NavLink } from '@/components/layout/nav-link'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { MobileMenu } from '@/components/layout/mobile-menu'

export function Navbar() {
  const items = mainNav.filter(item => item.enabled)
  const githubLink = social.find(item => item.label === 'GitHub')

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/72 backdrop-blur-[20px] backdrop-saturate-[180%] dark:border-ink-muted-80 dark:bg-surface-tile-1/72">
      <div className="mx-auto flex h-[44px] max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-[21px] font-semibold text-ink dark:text-body-on-dark"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {items.map(item => (
            <NavLink
              key={item.href}
              href={item.href}
              className="text-sm text-ink-muted-48 transition-colors hover:text-ink dark:text-body-muted dark:hover:text-body-on-dark"
              activeClassName="font-semibold text-ink dark:text-body-on-dark"
            >
              {item.label}
            </NavLink>
          ))}

          {githubLink && (
            <a
              href={githubLink.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex size-11 items-center justify-center text-ink transition-transform active:scale-95 dark:text-body-on-dark"
            >
              <GithubIcon />
            </a>
          )}

          <ThemeToggle />
        </nav>

        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <MobileMenu items={mainNav} social={social} />
        </div>
      </div>
    </header>
  )
}

function GithubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}
