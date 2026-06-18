# 문서 인덱스

- **상태:** Living
- **날짜:** 2026-06-15

이 레포 문서의 안내도. 각 문서의 **목적·정본 여부·동기화 관계**를 한곳에서 본다.
"무엇을 보고 / 무엇을 고치면 무엇을 같이 고치나"의 허브 역할을 한다.

## 문서별 목적

| 문서 | 위치 | 목적 |
|------|------|------|
| 제품 요구사항 | `docs/PRD.md` | 무엇을·왜 만드는가 |
| 로드맵(개요) | `docs/ROADMAP.md` | 마일스톤 전체 그림 |
| 마일스톤 상세 | `docs/roadmap/m*.md` | 각 마일스톤 포함 기능 |
| 백로그 | `docs/roadmap/backlog.md` | 미배치 기능 후보 |
| 결정 기록 | `docs/adr/*.md` | 구조적 의사결정과 근거 |
| 정보 구조(IA) | `docs/information-architecture.md` | 기능 영역·내비·라우트 매핑 |
| 콘텐츠 모델 | `docs/content-model.md` | 글·감상 항목 frontmatter 스키마 |
| 컴포넌트 인벤토리 | `docs/component-inventory.md` | 재사용 UI 컴포넌트 카탈로그 |
| 테스트 전략 | `docs/testing-strategy.md` | 레벨 분류·커버리지 목표·E2E 시나리오 |
| 접근성 체크리스트 | `docs/accessibility-checklist.md` | WCAG 점검 항목 |
| SEO·메타데이터 | `docs/seo-spec.md` | 타이틀·OG·JSON-LD·사이트맵 규칙 + 성능 목표(Core Web Vitals) |
| 와이어프레임 | `docs/wireframes/` | 화면 구조 스케치(저충실도) |
| 디자인 시스템 | `DESIGN.md` | 색·타이포·컴포넌트 토큰 |
| 작성 워크플로우 | `docs/authoring-workflow.md` | 새 글/감상 추가 절차 |
| 에디토리얼 가이드 | `docs/editorial-guide.md` | 보이스·문체·구성 등 글쓰기 기준 |
| 변경 이력 | `CHANGELOG.md` | 버전별 변경(Keep a Changelog) |
| 에이전트 지침 | `CLAUDE.md`, `AGENTS.md`, `.claude/agents/*` | AI 하네스 규칙 |

## 정본(Source of Truth) 맵

문서가 아니라 **코드/파일이 정본**인 항목들. 문서는 그것을 설명·인덱싱한다.

| 대상 | 정본 | 설명 문서 |
|------|------|-----------|
| 라우트 | `src/app/` 디렉터리 구조 | IA 구현 매핑 표 |
| 콘텐츠 메타데이터 | 각 콘텐츠 파일 frontmatter | `content-model.md`(스키마) |
| 컴포넌트 시각/동작 | 구현 코드(추후 Storybook) | `component-inventory.md`(인덱스) |
| 디자인 토큰 | 현재 `DESIGN.md` → 커스텀 단계엔 `src/styles/tokens.css` | `DESIGN.md` |
| 화면 픽셀/스타일 | 구현 코드 | 와이어프레임(구조만) |

## 동기화 관계

한쪽을 바꾸면 함께 점검할 대상. (담당: `docs-manager`)

| 변경 발생 | 함께 갱신 |
|-----------|-----------|
| 라우트(`src/app/`) | IA 매핑 표 · `next.config`(리다이렉트) · `docs/roadmap/m1` · `seo-spec.md`(타이틀 표) |
| frontmatter 스키마 | `content-model.md` · IA 분류축 · 파싱/타입 구현 · `seo-spec.md`(JSON-LD) |
| 새 컴포넌트·상태 | `component-inventory.md` · `accessibility-checklist.md` |
| 새 화면·인터랙션 구현 | `testing-strategy.md`(E2E 시나리오 추가) |
| 디자인 토큰 | `DESIGN.md` · 접근성(대비·포커스) 항목 |
| 마일스톤 범위 | 해당 `m*.md` · `docs/ROADMAP.md` · 관련 IA/스키마 |
| `.claude/` 또는 `CLAUDE.md` | `CLAUDE.md` 변경 이력 테이블 |

## 원칙

- **정본은 가능한 한 코드에 둔다.** 문서는 얇게, 인덱스/설명 위주로.
- **변경 시 동기화 대상을 명시한다.** 위 표가 그 계약이다.
- **docs-as-code.** 문서는 git으로 관리하고 PR에서 리뷰한다.

## 변경 이력

| 날짜 | 변경 내용 | 사유 |
|------|----------|------|
| 2026-06-15 | 문서 인덱스 초기 작성 | 문서 증가에 따른 허브 정리 |
| 2026-06-15 | seo-spec 성능 목표 반영 · 테스트 동기화 행 추가 | 문서 감사 후속 |
