import type { NextConfig } from 'next'
import { execSync } from 'node:child_process'

// 배포 식별용 커밋 해시 — Vercel은 빌드 env로 제공, 로컬은 git에서 읽고, 둘 다 없으면 빈 문자열
function commitSha(): string {
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA
  try {
    return execSync('git rev-parse HEAD').toString().trim()
  }
  catch {
    return ''
  }
}

const nextConfig: NextConfig = {
  // X-Powered-By 헤더 제거 — 프레임워크 정보 노출 방지
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_COMMIT_SHA: commitSha(),
  },
}

export default nextConfig
