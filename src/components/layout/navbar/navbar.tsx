import Link from 'next/link'
import { mainNav, siteConfig } from '@/config/site'
import { NavLink } from '@/components/layout/nav-link'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { MobileMenu } from '@/components/layout/mobile-menu'

export function Navbar() {
  const items = mainNav.filter(item => item.enabled)

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/72 backdrop-blur-[20px] backdrop-saturate-[180%] dark:bg-surface-tile-1/72">
      <div className="mx-auto flex h-[44px] max-w-4xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-title-md text-fg"
        >
          <span>{siteConfig.logoText}</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {items.map(item => (
            <NavLink
              key={item.href}
              href={item.href}
              className="text-label-md text-fg-subtle transition-colors hover:text-fg"
              activeClassName="font-semibold text-fg"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          <div className="md:hidden">
            <MobileMenu items={mainNav} />
          </div>
        </div>
      </div>
    </header>
  )
}
