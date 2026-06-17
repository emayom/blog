import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // X-Powered-By 헤더 제거 — 프레임워크 정보 노출 방지
  poweredByHeader: false,
}

export default nextConfig
