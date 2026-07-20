import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Metric } from 'web-vitals'
import { WebVitals } from './web-vitals'

type MetricCallback = (metric: Metric) => void

// web-vitals의 onXXX는 등록 시점에 콜백을 저장해 두었다가 측정값이 나오면 호출한다.
// 실제 측정 없이 등록된 콜백을 캡처해 직접 호출하여 전송 페이로드를 검증한다.
const callbacks: Record<string, MetricCallback> = {}

vi.mock('web-vitals', () => ({
  onLCP: (cb: MetricCallback) => (callbacks.LCP = cb),
  onCLS: (cb: MetricCallback) => (callbacks.CLS = cb),
  onINP: (cb: MetricCallback) => (callbacks.INP = cb),
}))

function makeMetric(overrides: Partial<Metric>): Metric {
  return {
    name: 'LCP',
    value: 0,
    rating: 'good',
    delta: 0,
    id: 'v1-test',
    entries: [],
    navigationType: 'navigate',
    ...overrides,
  } as Metric
}

beforeEach(() => {
  for (const key of Object.keys(callbacks)) delete callbacks[key]
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('WebVitals', () => {
  it('gtag 미로드 시 콜백이 호출돼도 throw하지 않는다', () => {
    vi.stubGlobal('gtag', undefined)
    render(<WebVitals />)
    expect(() => callbacks.LCP(makeMetric({ name: 'LCP', value: 2500 }))).not.toThrow()
  })

  it('LCP value를 반올림하여 전송한다', () => {
    const gtag = vi.fn()
    vi.stubGlobal('gtag', gtag)
    render(<WebVitals />)

    callbacks.LCP(makeMetric({ name: 'LCP', value: 2500.7, rating: 'needs-improvement' }))

    expect(gtag).toHaveBeenCalledWith('event', 'web_vitals', {
      metric_name: 'LCP',
      value: 2501,
      rating: 'needs-improvement',
      delta: 0,
      id: 'v1-test',
    })
  })

  it('CLS는 1000배로 변환하여 전송한다', () => {
    const gtag = vi.fn()
    vi.stubGlobal('gtag', gtag)
    render(<WebVitals />)

    callbacks.CLS(makeMetric({ name: 'CLS', value: 0.1 }))

    expect(gtag).toHaveBeenCalledWith(
      'event',
      'web_vitals',
      expect.objectContaining({ metric_name: 'CLS', value: 100 }),
    )
  })

  it('LCP / CLS / INP 3개를 모두 등록한다', () => {
    render(<WebVitals />)
    expect(callbacks.LCP).toBeTypeOf('function')
    expect(callbacks.CLS).toBeTypeOf('function')
    expect(callbacks.INP).toBeTypeOf('function')
  })
})
