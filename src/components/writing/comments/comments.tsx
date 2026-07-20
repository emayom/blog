'use client'

import { useEffect, useRef, useState } from 'react'
import { Divider } from '@/components/ui/divider'
import { Heading } from '@/components/ui/heading'
import { useTheme } from 'next-themes'
import { giscusConfig, isGiscusEnabled } from '@/config/giscus'
import type { GiscusTheme, ISetConfigMessage } from '@/types/giscus'

const GISCUS_ORIGIN = 'https://giscus.app'

function toGiscusTheme(resolvedTheme: string | undefined): GiscusTheme {
  return resolvedTheme === 'dark' ? 'dark' : 'light'
}

export function Comments() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // 마운트 후에만 테마 의존 위젯을 그려 hydration mismatch 방지 (next-themes 권장 패턴)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !containerRef.current) return

    const container = containerRef.current
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('data-repo', giscusConfig.repo)
    script.setAttribute('data-repo-id', giscusConfig.repoId)
    script.setAttribute('data-category', giscusConfig.category)
    script.setAttribute('data-category-id', giscusConfig.categoryId)
    script.setAttribute('data-mapping', giscusConfig.mapping)
    script.setAttribute('data-reactions-enabled', giscusConfig.reactionsEnabled)
    script.setAttribute('data-emit-metadata', giscusConfig.emitMetadata)
    script.setAttribute('data-input-position', giscusConfig.inputPosition)
    script.setAttribute('data-lang', giscusConfig.lang)
    // 초기 테마는 data 속성으로 주입하고, 이후 변경만 postMessage로 전달한다.
    script.setAttribute('data-theme', toGiscusTheme(resolvedTheme))

    container.appendChild(script)

    return () => {
      container.innerHTML = ''
    }
    // resolvedTheme 변경 시 위젯을 재생성하지 않는다 — 테마는 별도 effect에서 postMessage로 갱신한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted])

  useEffect(() => {
    if (!mounted) return

    const iframe = document.querySelector<HTMLIFrameElement>(
      'iframe.giscus-frame',
    )
    if (!iframe?.contentWindow) return

    const message: ISetConfigMessage = {
      giscus: { setConfig: { theme: toGiscusTheme(resolvedTheme) } },
    }
    iframe.contentWindow.postMessage(message, GISCUS_ORIGIN)
  }, [mounted, resolvedTheme])

  if (!isGiscusEnabled) return null

  return (
    <>
      <Divider className="my-12" />
      <section>
        <Heading size="md">댓글</Heading>
        <div ref={containerRef} className="mt-6" />
      </section>
    </>
  )
}
