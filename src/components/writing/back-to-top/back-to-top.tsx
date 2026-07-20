'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { IconButton } from '@/components/ui/icon-button'

const SCROLL_THRESHOLD = 400

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SCROLL_THRESHOLD)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToTop() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <IconButton
      size="lg"
      shape="circle"
      variant="outline"
      onClick={scrollToTop}
      label="맨 위로"
      className={cn(
        'fixed bottom-8 right-8 transition-opacity hover:text-fg motion-reduce:transition-none dark:bg-surface-tile-2 dark:hover:text-body-on-dark',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <ArrowUpIcon />
    </IconButton>
  )
}

function ArrowUpIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  )
}
