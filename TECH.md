# 기술 상세

## 기술 스택

> 정확한 버전은 이 표에 적지 않는다. 코드 작성 방식을 좌우하는 major 버전만 정체성으로 남긴다.

| 영역 | 선택 | 비고 |
|------|------|------|
| 런타임/패키지 | Node.js + npm | 버전은 `.nvmrc` / `package.json` engines |
| 프레임워크 | Next.js 16 (App Router) | [ADR-001](docs/adr/001-framework.md) |
| UI | React 19 | |
| 타입 | TypeScript | strict |
| 스타일 | Tailwind CSS v4 | PostCSS · `tailwind.config.js` 없음 ([ADR-003](docs/adr/003-css-styling.md)) |
| 콘텐츠 | MDX | `next-mdx-remote` · `src/content/` ([ADR-002](docs/adr/002-mdx-content.md)) |
| 디자인 토큰 | Style Dictionary | 작성 예정 |
| 문서/스토리 | Storybook | |
| 테스트 | Vitest · Playwright | [ADR-007](docs/adr/007-testing.md) |
| 린트/포맷 | ESLint (`eslint-config-next` + `@stylistic`) | |

기능 라이브러리(코드 하이라이트 Shiki · 검색 Fuse.js · 댓글 giscus · variant CVA)는 아래 아키텍처 섹션에서 쓰이는 자리에 설명한다.

## 공통 규칙

### 타입 · 컴포넌트

- `any` 금지 — 타입은 `src/types/`에 정의
- Server Component 기본 — `'use client'`는 상호작용이 필요한 경계에서만

### 네이밍 · 스타일

- 파일명 kebab-case · 컴포넌트명 PascalCase · 함수명 camelCase
- `@apply` 지양 — Tailwind 유틸리티 클래스 직접 사용

### 생성 파일 직접 수정 금지

> 작성 예정 — 디자인 토큰 빌드 산출물 규칙.

## 아키텍처 개요

> 작성 예정 — 콘텐츠 파이프라인(MDX → HTML)과 디자인 토큰 파이프라인(JSON → CSS) 설명.

## 핵심 디렉토리 관계

| 디렉토리 | 분류 | 역할 |
|----------|------|------|
| `src/content/` | 원천 | MDX 콘텐츠 (writing · notes · library · series) |
| `src/lib/` | 로직 | 콘텐츠 로딩 · 파생 데이터 계산 (순수 함수, 테스트 대상) |
| `src/config/` | 설정 | 사이트 · 댓글 · about 설정 |
| `src/components/` | UI | 도메인별(writing/notes/library/…) + `ui`/`layout`/`mdx` 공용 |
| `src/app/` | 라우팅 | App Router 페이지 · `sitemap.ts` · `robots.ts` · `feed.xml` · `opengraph-image.tsx` |

---

## 주요 명령어

### 개발

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | dev 서버 |
| `npm run storybook` | Storybook |

### 빌드

| 명령어 | 설명 |
|--------|------|
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 빌드 결과 서빙 |

### 린트 · 타입

| 명령어 | 설명 |
|--------|------|
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

### 테스트

| 명령어 | 설명 |
|--------|------|
| `npm run test` | Vitest (단위·컴포넌트) |
| `npm run test:e2e` | Playwright (사용자 플로우) |

---

## 디자인 토큰 스키마 구조

> 작성 예정.

---

## 버전 관리

- `CHANGELOG.md` 수기 기록 — 릴리스 도구(Changesets 등) 없이 직접 관리.
- git 태그는 1.0.0부터 부여, 0.x는 CHANGELOG 기록만.

커밋 규칙·브랜치 전략은 `CLAUDE.md` › Commit Convention / 브랜치 전략.

---

## 환경 변수

클라이언트 노출 변수는 `NEXT_PUBLIC_` prefix 필수. 비밀값은 `.env.local`에만.

| 변수 | 용도 |
|------|------|
| `NEXT_PUBLIC_SITE_URL` | 정규 사이트 URL (SEO · RSS · sitemap) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ([ADR-018](docs/adr/018-analytics.md)) |
| `NEXT_PUBLIC_GISCUS_REPO` / `_REPO_ID` | giscus 대상 저장소 ([ADR-005](docs/adr/005-comments.md)) |
| `NEXT_PUBLIC_GISCUS_CATEGORY` / `_CATEGORY_ID` | giscus 토론 카테고리 |
| `NEXT_PUBLIC_SOCIAL_GITHUB` / `_LINKEDIN` / `_EMAIL` | 소셜 링크 |
| `NEXT_PUBLIC_COMMIT_SHA` | 빌드 커밋 표기 |
