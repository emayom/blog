import Link from 'next/link'
import { mainNav, siteConfig, social } from '@/config/site'
import { NavLink } from '@/components/layout/nav-link'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { MobileMenu } from '@/components/layout/mobile-menu'

export function Navbar() {
  const items = mainNav.filter(item => item.enabled)

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/72 backdrop-blur-[20px] backdrop-saturate-[180%] dark:border-ink-muted-80 dark:bg-surface-tile-1/72">
      <div className="mx-auto flex h-[44px] max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold text-ink dark:text-body-on-dark"
        >
          <span>{siteConfig.logoText}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {items.map(item => (
            <NavLink
              key={item.href}
              href={item.href}
              className="text-xs text-ink-muted-48 transition-colors hover:text-ink dark:text-body-muted dark:hover:text-body-on-dark"
              activeClassName="font-semibold text-ink dark:text-body-on-dark"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          <div className="md:hidden">
            <MobileMenu items={mainNav} social={social} />
          </div>
        </div>
      </div>
    </header>
  )
}
