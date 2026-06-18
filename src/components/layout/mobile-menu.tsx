'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavItem } from '@/types/nav'

interface MobileMenuProps {
  items: NavItem[]
  social: NavItem[]
}

export function MobileMenu({ items, social }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const trayId = useId()
  const trayRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const enabledItems = items.filter(item => item.enabled)
  const enabledSocial = social.filter(item => item.enabled)

  // 라우트 변경 시 자동 닫힘 — pathname(외부 URL 상태) 동기화
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false)
  }, [pathname])

  // ESC 닫힘 + body 스크롤 락 + 포커스 이동
  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const firstLink = trayRef.current?.querySelector<HTMLElement>('a, button')
    firstLink?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(prev => !prev)}
        aria-label="메뉴 열기"
        aria-expanded={open}
        aria-controls={trayId}
        className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-ink transition-transform active:scale-95 dark:text-body-on-dark"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            onClick={() => setOpen(false)}
            style={{ backgroundColor: 'rgba(0,0,0,0.32)' }}
            className="absolute inset-0"
            aria-hidden="true"
          />
          <div
            ref={trayRef}
            id={trayId}
            role="dialog"
            aria-modal="true"
            aria-label="모바일 메뉴"
            className="absolute inset-y-0 right-0 flex w-4/5 max-w-xs flex-col bg-canvas pt-11 dark:bg-surface-tile-1"
          >
            <nav className="flex flex-col">
              {enabledItems.map((item) => {
                const isActive
                  = pathname === item.href
                    || pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex min-h-11 items-center border-b border-divider-soft px-6 py-3 text-[17px] text-ink dark:border-ink-muted-80 dark:text-body-on-dark ${
                      isActive ? 'font-semibold' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {enabledSocial.length > 0 && (
              <div className="mt-auto flex flex-col gap-1 px-6 py-4">
                {enabledSocial.map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="flex min-h-11 items-center text-[17px] text-primary dark:text-primary-on-dark"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
