# 테스트 전략

- **상태:** Draft
- **날짜:** 2026-06-15
- **참조:** `CLAUDE.md` Testing Policy, `docs/roadmap/m0-setup.md`

## 테스트 전략

| 레벨 | 도구 | 대상 |
|------|------|------|
| 단위 테스트 | Vitest + Testing Library | 유틸리티 함수, 개별 컴포넌트 |
| 통합 테스트 | Vitest + Testing Library | 페이지 컴포넌트, 섹션 조합 |
| E2E 테스트 | Playwright | 전체 사용자 플로우 |

## 파일 위치 규칙

```
src/
  __tests__/              # 유틸 함수 단위 테스트
  components/
    post-card.test.tsx    # 컴포넌트와 같은 디렉토리 배치도 허용
e2e/
  writing.spec.ts         # 글 목록·상세 E2E
  shelf.spec.ts           # 감상 기록 E2E
  navigation.spec.ts      # 공통 내비게이션 E2E
```

## Vitest + Testing Library 설치

```bash
npm install --save-dev \
  vitest \
  @vitejs/plugin-react \
  jsdom \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event
```

### vitest.config.ts

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/app/',               // 페이지 파일 — E2E로 커버
        'src/components/layout/', // 레이아웃 컴포넌트 — E2E로 커버
      ],
      thresholds: { lines: 70 },
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

### vitest.setup.ts

```ts
import '@testing-library/jest-dom'
```

## 커버리지 목표

| 레벨 | 목표 |
|------|------|
| 단위·통합 (Vitest) | 라인 70%+ |
| E2E (Playwright) | 핵심 시나리오 전체 |

## E2E 핵심 시나리오

| 파일 | 시나리오 |
|------|---------|
| `writing.spec.ts` | 글 목록 렌더링, 태그 필터, 카드 클릭 → 상세 이동, 코드 블록 복사 |
| `navigation.spec.ts` | Navbar 링크, 다크/라이트 모드 전환, 모바일(375px) 메뉴 |
| `shelf.spec.ts` | 감상 기록 목록 렌더링, 유형별 필터 |

시나리오는 마일스톤 구현에 따라 추가한다.

## 변경 이력

| 날짜 | 변경 내용 | 사유 |
|------|----------|------|
| 2026-06-15 | 테스트 전략 초기 작성 | CLAUDE.md Testing Policy에서 상세 내용 분리 |
| 2026-06-15 | Vitest + Testing Library로 확정, 통합 테스트 레벨 추가 | 컴포넌트 단위 테스트 커버리지 확보 |
