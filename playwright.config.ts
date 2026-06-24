import { defineConfig, devices } from '@playwright/test'

const port = Number(process.env.PORT ?? 3000)
const baseURL = `http://localhost:${port}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    // 프로덕션 빌드 기준으로 e2e를 돌린다. dev 서버는 메타 라우트(metadata/OG/sitemap/robots)를
    // on-demand 컴파일 + 비결정적 스트리밍으로 처리해 head 메타가 누락·중복되는 플레이크가 있다.
    // 정적 빌드 산출물은 항상 안정적이므로 메타데이터 e2e가 신뢰성 있게 검증된다.
    // CI는 앞선 Build 스텝에서 이미 빌드하므로 start만, 로컬은 build 후 start.
    command: process.env.CI
      ? `npm run start -- --port ${port}`
      : `npm run build && npm run start -- --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
})
