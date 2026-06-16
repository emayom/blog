# M0 — 개발 환경 구축

- **상태:** 진행중
- **목표:** M1 기능 구현 전에 테스트 환경·패키지·프로젝트 구조를 완비한다
- **목표 버전:** 없음 (버전 bump 없음 — 인프라 설정)
- **선행 조건:** 없음

## 포함 기능

- [x] Next.js 16 프로젝트 초기 세팅
- [x] TypeScript strict mode
- [x] Tailwind CSS v4 (PostCSS)
- [x] ESLint + @stylistic/eslint-plugin
- [x] husky + lint-staged (pre-commit 품질 게이트)
- [x] GitHub 설정 (.github/workflows, ISSUE_TEMPLATE, PR 템플릿, dependabot)
- [x] 하네스 구성 (agents, skills, CLAUDE.md)
- [x] 프로젝트 문서 (PRD, ROADMAP, ADR, IA, seo-spec 등)
- [x] `tsconfig.json` 경로 별칭 설정 (`@/` → `src/`)
- [x] `next.config.ts` 기본 설정 (MDX 플러그인 자리 확보)
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
- [x] Storybook 설치 및 기본 설정 (Story 작성은 M1부터) — globals.css 생성 후 preview.tsx import 주석 해제 필요
- [x] `class-variance-authority` + `clsx` + `tailwind-merge` 설치 → `src/lib/cn.ts` (`cn` 유틸) 생성, `.vscode/settings.json`에 `tailwindCSS.experimental.classRegex` 추가
- [x] 폴더 스캐폴딩: `src/components/ui/`, `src/components/layout/`, `src/components/mdx/`, `src/lib/`, `src/types/`, `src/content/writing/`, `src/content/shelf/`, `e2e/`
- [x] `src/app/layout.tsx` — 기본 메타데이터 설정 (seo-spec.md 공통 토큰 기반)
- [x] `src/app/globals.css` — Tailwind v4 기본 설정 + DESIGN.md 기초 CSS 변수
- [ ] CI(`ci.yml`) 활성화 — 테스트 환경 완비 후 트리거 주석 해제

## Out of Scope

- 실제 블로그 기능 구현 (페이지, 컴포넌트, MDX 파싱 등)
- 디자인 토큰 커스텀 (DESIGN.md 기초 CSS 변수만)
- 배포 설정

## 완료 조건 (Definition of Done)

- `npx vitest run` 실행 가능 (설정 파일 존재)
- `npx playwright test` 실행 가능 (설정 파일 존재)
- `npm run build` 통과
- CI `ci.yml` 트리거 활성화 상태

## 기술 위험 요소

- Playwright 브라우저 설치 용량 (CI 캐싱 필요할 수 있음)
- Tailwind v4 CSS 변수 방식이 DESIGN.md 토큰 구조와 맞지 않을 경우 조정 필요
- Storybook — Next.js 16 + Tailwind v4 조합 설정이 복잡할 수 있음, 공식 Next.js 애드온 호환성 확인 필요
