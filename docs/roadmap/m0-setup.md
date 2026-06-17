# M0 — 개발 환경 구축

- **진행 상태:** 완료 (2026-06-17)
- **목표 일자:** 2026-06-19
- **목표:** M1 기능 구현 전에 테스트 환경·패키지·프로젝트 구조를 완비한다
- **목표 버전:** 없음 (버전 bump 없음 — 인프라 설정)
- **Blocks:** M1, M2, M3, M4, M5, M6
- **Blocked by:** 없음

## Tasks

- [x] Next.js 16 프로젝트 초기 세팅
- [x] TypeScript strict mode
- [x] Tailwind CSS v4 (PostCSS)
- [x] ESLint + @stylistic/eslint-plugin
- [x] husky + lint-staged (pre-commit 품질 게이트)
- [x] GitHub 설정 (.github/workflows, ISSUE_TEMPLATE, PR 템플릿, dependabot)
- [x] 하네스 구성 (agents, skills, CLAUDE.md)
- [x] 프로젝트 문서 (PRD, ROADMAP, ADR, IA, seo-spec 등)
- [x] `tsconfig.json` 경로 별칭 설정 (`@/` → `src/`)
- [x] `.nvmrc` — Node 버전 고정 (`24.16.0` LTS)
- [x] `engines` 필드 (`package.json`) — Node 버전 강제
- [x] `.editorconfig` — 에디터 무관 포맷 통일
- [x] `.vscode/settings.json` + `extensions.json` — ESLint 저장 시 자동 fix, 추천 확장
- [x] `LICENSE` — MIT
- [x] `README.md` — 프로젝트 설명으로 교체 (기본 Next.js 내용 제거)
- [x] `commitlint` + `commit-msg` hook — 커밋 컨벤션 강제
- [x] `.env.example` 생성 (환경변수 템플릿)
- [x] Vitest + Testing Library 설치 및 `vitest.config.ts`, `vitest.setup.ts` 설정
- [x] Playwright 설치 및 `playwright.config.ts` 설정
- [x] Storybook 설치 및 기본 설정 (Story 작성은 M1부터)
- [x] `class-variance-authority` + `clsx` + `tailwind-merge` 설치 → `src/lib/cn.ts` (`cn` 유틸) 생성, `.vscode/settings.json`에 `tailwindCSS.experimental.classRegex` 추가
- [x] 폴더 스캐폴딩: `src/components/ui/`, `src/components/layout/`, `src/components/mdx/`, `src/lib/`, `src/types/`, `src/content/writing/`, `src/content/library/`, `e2e/`
- [x] `src/app/layout.tsx` — 기본 메타데이터 설정 (seo-spec.md 공통 토큰 기반)
- [x] `src/app/globals.css` — Tailwind v4 기본 설정 + DESIGN.md 기초 CSS 변수 + `color-scheme: light`
- [x] `src/config/site.ts` — 사이트 상수 (`url`, `name`, `description`, `locale`) 중앙 관리
- [x] `src/types/global.d.ts` — CSS 모듈 타입 선언 (`declare module '*.css'`)
- [x] `.gitattributes` — 줄바꿈 LF 정규화 (macOS 개발 ↔ Linux CI 일관성)
- [x] `next.config.ts` — `poweredByHeader: false` (X-Powered-By 헤더 제거)
- [x] `package.json` — `typecheck` 스크립트 (`tsc --noEmit`)
- [x] CI(`ci.yml`) 활성화 — 테스트 환경 완비 후 트리거 주석 해제

## Out of Scope

- 실제 블로그 기능 구현 (페이지, 컴포넌트, MDX 파싱 등)
- 디자인 토큰 커스텀 (DESIGN.md 기초 CSS 변수만)
- 배포 설정

## Definition of Done

- `npx vitest run` 실행 가능 (설정 파일 존재)
- `npx playwright test` 실행 가능 (설정 파일 존재)
- `npm run build` 통과
- CI `ci.yml` 트리거 활성화 상태

## Related Issues / Links

-
