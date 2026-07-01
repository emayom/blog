'use client'

import { useEffect } from 'react'
import { onLCP, onCLS, onINP, type Metric } from 'web-vitals'

function sendToGA(metric: Metric) {
  // ponytail: GoogleAnalytics가 production에서만 gtag 로드 → gtag 부재로 자연 게이팅됨
  if (typeof window.gtag !== 'function') return

  window.gtag('event', 'web_vitals', {
    metric_name: metric.name,
    // CLS는 0~1 소수 → GA4 정수 권장으로 1000배 반올림
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
  })
}

export function WebVitals() {
  useEffect(() => {
    onLCP(sendToGA)
    onCLS(sendToGA)
    onINP(sendToGA)
  }, [])

  return null
}
