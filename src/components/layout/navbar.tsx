import Link from 'next/link'
import { mainNav, siteConfig, social } from '@/config/site'
import { NavLink } from '@/components/layout/nav-link'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { MobileMenu } from '@/components/layout/mobile-menu'
import { GithubIcon } from '@/components/icons'

export function Navbar() {
  const items = mainNav.filter(item => item.enabled)
  const githubLink = social.find(item => item.icon === 'github')

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
