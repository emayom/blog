'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { IconButton } from '@/components/ui/icon-button'
import { ArrowUpIcon } from '@/components/icons'

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
        'fixed bottom-8 right-8 transition-opacity hover:text-fg motion-reduce:transition-none dark:bg-surface-tile-2',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <ArrowUpIcon />
    </IconButton>
  )
}
