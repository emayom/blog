'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@/components/icons'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // 클라이언트 마운트 후에만 테마 의존 UI를 그려 hydration mismatch 방지 (next-themes 권장 패턴)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // mount 전에는 resolvedTheme이 undefined → SSR hydration mismatch 방지
  if (!mounted) {
    return (
      <span
        className="inline-flex size-11 shrink-0"
        aria-hidden="true"
      />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-ink transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-focus active:scale-95 dark:text-body-on-dark"
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
