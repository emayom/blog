@AGENTS.md

## Core Documents

- @TECH.md — 아키텍처 · 기술 상세
- @DESIGN.md — 디자인 원칙 · 토큰 규약

## Commands

모든 명령은 레포 루트에서 실행:

```bash
npm run dev      # dev server (localhost:3000)
npm run build    # production build
npm run lint     # ESLint
npm run lint:fix # ESLint with auto-fix
```

## Commit Convention

[Conventional Commits](https://www.conventionalcommits.org/ko/v1.0.0/) 스펙을 따른다.

```
<type>[optional scope]: <description>

feat:     새로운 기능
fix:      버그 수정
docs:     문서 변경
style:    코드 의미에 영향 없는 변경 (포맷, 세미콜론 등)
refactor: 기능 변경 없는 코드 리팩토링
test:     테스트 추가 또는 수정
chore:    빌드 프로세스, 보조 도구 변경
ci:       CI 설정 변경
perf:     성능 개선
```

예시:
- `feat(blog): 태그 필터 컴포넌트 추가`
- `fix(nav): 모바일 메뉴 닫힘 버그 수정`
- `chore: ESLint 설정 업데이트`

## 브랜치 전략

**GitHub Flow** — `main`에서 분기, PR로 `main`에 merge.

| 항목 | 규칙 |
|------|------|
| 기반 브랜치 | `main`에서 분기 |
| 브랜치명 | `{type}/#N-{kebab-slug}` — N은 GitHub 이슈 번호 |
| Merge 전략 | **Rebase merge** — 선형 이력 유지 |
| Merge 후 | 브랜치 삭제 |
| `main` 보호 | 직접 push 금지, PR 필수 |

**브랜치 유형:**

| 유형 | 용도 |
|------|------|
| `feat` | 새로운 기능 |
| `fix` | 버그 수정 |
| `refactor` | 기능 변경 없는 코드 정리 |
| `docs` | 문서만 변경 |
| `chore` | 빌드·설정·의존성 변경 |

예시: `feat/#12-post-list-page`, `fix/#15-dark-mode-flash`

## Tech Spec

| 항목 | 버전 / 결정 |
|------|------------|
| Next.js | 16.2.9 — App Router (`src/app/`), Server Component 기본 |
| React | 19.2.4 |
| TypeScript | 5.x strict mode — `any` 사용 금지 |
| CSS | Tailwind CSS v4 — PostCSS 방식, `tailwind.config.js` 없음 (ADR-003) |
| 컴포넌트 스타일 | CVA(Class Variance Authority) — variant 분기 컴포넌트에 한정 사용 |
| 콘텐츠 | MDX — `src/content/` (ADR-002) |
| 검색 | 클라이언트 사이드 (ADR-004) |
| 댓글 | giscus (ADR-005) |
| 디자인 토큰 | Style Dictionary 파이프라인 — 원천 `src/styles/tokens/**/*.json` (카테고리별 base·semantic) → `npm run tokens:build` → 생성물 `src/styles/tokens.css` (`@theme`). 생성물 직접 수정 금지, DESIGN.md는 참조 문서 (ADR-019) |

상세 결정 배경: `docs/adr/`

## Testing Policy

테스트는 구현의 일부다. 테스트 없는 구현은 완료로 보지 않는다.

| 대상 | 도구 | 위치 |
|------|------|------|
| 유틸 함수 · 개별 컴포넌트 | Vitest + Testing Library | `src/__tests__/` 또는 `.test.tsx` |
| 페이지 컴포넌트 · 섹션 조합 | Vitest + Testing Library | `src/__tests__/` 또는 `.test.tsx` |
| 전체 사용자 플로우 | Playwright e2e | `e2e/` |

상세 전략 (레벨 분류 · 커버리지 목표 · 제외 패턴 · E2E 시나리오): `docs/testing-strategy.md`

## HITL (Human-in-the-Loop)

파이프라인에서 에이전트가 독자적으로 결정하지 않고 사람 확인을 받아야 하는 시점:

| 시점 | 이유 |
|------|------|
| PRD · ROADMAP scope 변경 | 기능 범위는 사람이 결정 |
| 새로운 외부 의존성(패키지) 추가 | 장기 유지보수 영향 |
| 디자인 토큰 신규 정의 | 디자인 시스템 일관성 |
| DB 스키마 · 파일 구조 변경 | 되돌리기 어려운 결정 |
| PR merge | 최종 승인은 항상 사람 |

에이전트는 위 사항에 해당할 경우 임의로 진행하지 않고 구현 완료 보고에 명시하여 확인을 요청한다.

## Code Guardrails

모든 에이전트가 코드 생성 시 준수한다:

- **`any` 금지** — 타입은 `src/types/`에 정의
- **Server Component 기본** — `'use client'`는 필요한 경우에만
- **파일명 kebab-case** — 컴포넌트 포함 (`post-card.tsx`)
- **컴포넌트명 PascalCase**, 함수명 camelCase
- **`@apply` 지양** — Tailwind 유틸리티 클래스 직접 사용
- **환경변수** — 클라이언트 노출 시 `NEXT_PUBLIC_` prefix 필수
- **주석** — WHY가 비자명한 경우에만. 무엇을 하는지 설명하는 주석 금지

## Constraints

| Constraint | 규칙 | 이유 |
|-----------|------|------|
| **의존성 추가** | 기존 패키지로 먼저 해결. 새 패키지는 반드시 사람 확인 후 설치 | 보안·라이선스 검토 필요, 번들 사이즈 영향 |
| **수정 금지 디렉토리** | `.next/`, `node_modules/`, `out/` 직접 수정 금지 | 빌드 산출물 — 재빌드 시 덮어써짐 |
| **브랜치 전략** | `main` 직접 push 금지, PR 필수. 상세: 브랜치 전략 섹션 참조 | PR 리뷰·CI 필수, 이슈 추적 연결 |
| **환경변수** | 클라이언트 노출 변수는 `NEXT_PUBLIC_` prefix 필수. 비밀값은 `.env.local`에만 | 비밀값 노출 방지 |
| **라우팅** | App Router(`src/app/`)만 사용. Pages Router 혼용 금지 (ADR-001) | 두 라우터 혼용 시 예측 불가 동작 |
| **환경별 설정** | `localhost` URL, dev 전용 설정을 prod 코드에 하드코딩 금지 | 환경 오염 및 배포 사고 방지 |

## 하네스: 블로그 개발

**목표:** Next.js 16 docs 기반으로 계획 → 구현 → 검증 파이프라인을 통해 블로그 기능을 안전하게 개발한다.

**트리거:** 블로그 기능 추가/수정/보완 요청 시 `blog-feature` 스킬을 사용하라. 단순 질문은 직접 응답 가능.

**변경 이력:**
| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-06-15 | 초기 구성 | 전체 | - |

