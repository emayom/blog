'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconButton } from '@/components/ui/icon-button'
import { CloseIcon, HamburgerIcon } from '@/components/icons'
import type { NavItem } from '@/types/nav'

interface MobileMenuProps {
  items: NavItem[]
}

// 페이드 인/아웃 전환 시간(ms) — Tailwind duration-200과 일치시켜 언마운트 타이밍을 맞춘다
const TRANSITION_MS = 200

const iconClass = 'block'

export function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false) // 패널을 DOM에 두는지 (마운트 의도)
  const [shown, setShown] = useState(false) // 페이드 인 상태 (애니메이션)
  const pathname = usePathname()
  const trayId = useId()
  const trayRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const enabledItems = items.filter(item => item.enabled)

  // 페이드 아웃 후 언마운트
  const requestClose = useCallback(() => {
    setShown(false)
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), TRANSITION_MS)
  }, [])

  const requestOpen = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }, [])

  // 마운트 다음 프레임에 페이드 인 — opacity 0 → 100 트랜지션 트리거
  useEffect(() => {
    if (!open) return
    const id = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(id)
  }, [open])

  // 라우트 변경 시 즉시 닫힘 — pathname(외부 URL 상태) 동기화
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShown(false)
    setOpen(false)
  }, [pathname])

  // ESC 닫힘 + body 스크롤 락 + 포커스 이동
  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        requestClose()
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const firstFocusable = trayRef.current?.querySelector<HTMLElement>('a, button')
    firstFocusable?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, requestClose])

  return (
    <>
      <IconButton
        ref={triggerRef}
        size="lg"
        shape="circle"
        variant="ghost"
        onClick={() => (open ? requestClose() : requestOpen())}
        label={open ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={open}
        aria-controls={trayId}
        className="transition-transform"
      >
        {open ? <CloseIcon className={iconClass} /> : <HamburgerIcon className={iconClass} />}
      </IconButton>

      {open && createPortal(
        <div className="fixed inset-x-0 bottom-0 top-11 z-30 md:hidden">
          <div
            onClick={requestClose}
            className={`absolute inset-0 bg-canvas/50 backdrop-blur-[3px] transition-opacity duration-200 ease-out dark:bg-surface-tile-1/50 ${
              shown ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
          />
          <div
            ref={trayRef}
            id={trayId}
            role="dialog"
            aria-modal="true"
            aria-label="모바일 메뉴"
            className={`absolute inset-x-0 top-0 flex flex-col bg-canvas pb-3 shadow-[0_16px_48px_rgba(0,0,0,0.06)] transition-opacity duration-200 ease-out dark:border-fg-muted dark:bg-surface-tile-1 ${
              shown ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <nav className="flex flex-col py-2">
              {enabledItems.map((item) => {
                const isActive
                  = pathname === item.href
                    || pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex min-h-[3.25rem] items-center px-6 text-body-lg transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.04] ${
                      isActive
                        ? 'font-semibold text-fg dark:text-body-on-dark'
                        : 'font-medium text-fg-muted dark:text-body-muted'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
