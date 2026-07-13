---
name: blog-feature
description: Orchestrates Next.js 16 + React 19 + Tailwind v4 blog feature development via planner → designer → builder → qa pipeline. Use when adding pages, components, layouts, styles, dark mode, MDX, tag filters, post list, nav, footer, or running milestones ("M1 시작", "M2 진행"). Also triggers on: 블로그에 X 추가, 페이지 만들어줘, 컴포넌트 만들어, 기능 구현, 레이아웃 수정, 스타일 변경, 다시 실행, 재실행, 업데이트, 수정, 보완. 블로그 개발 관련 모든 작업에 반드시 이 스킬을 사용할 것.
---

# Blog Feature Orchestrator

**실행 모드:** 파이프라인 (서브 에이전트 순차 호출)

| 작업 유형 | 파이프라인 |
|----------|-----------|
| UI (페이지·컴포넌트·레이아웃·스타일) | planner → designer → builder → qa |
| 로직 (데이터·API·유틸) | planner → builder → qa |

UI 판단: 요청에 컴포넌트·페이지·레이아웃·스타일·색상·타이포그래피 등 시각적 요소가 있으면 UI 작업.

## Workflow

- [ ] **Phase 0** — 워크스페이스 확인 + ADR 검토 + GitHub 이슈 생성 + 브랜치 설정
- [ ] **Phase 1** — planner: PRD·ROADMAP·마일스톤 파일 읽고 계획 수립
- [ ] **Phase 1.5** — designer (UI만): 컴포넌트별 DESIGN.md 토큰 매핑 (미정의 토큰이 있을 때만 CSS 변수 추가)
- [ ] **Phase 2** — builder: 계획 + 디자인 스펙으로 구현 + 커밋
- [ ] **Phase 3** — qa: build · lint · tsc · 테스트 검증
- [ ] **Phase 4** — QA 통과 시 PR 생성 (실패 시 1회 재시도)

## Phase 0: GitHub 설정 + 컨텍스트 확인

### 0-1. 워크스페이스 상태 확인

```bash
ls .claude/_workspace/ 2>/dev/null && echo "workspace exists" || echo "fresh start"
```

- `_workspace/` 없음 → **초기 실행** (0-2로 진행)
- `_workspace/` 있음 + 부분 수정 요청 → **부분 재실행** (해당 단계 에이전트만 재호출, GitHub 설정 생략)
- `_workspace/` 있음 + 새 기능 요청 → 기존 `_workspace/`를 `_workspace_prev/`로 이동 후 **새 실행** (0-2로 진행)

### 0-2. ADR 확인 (초기 실행·새 실행 시에만)

`docs/adr/` 를 읽어 기존 ADR 목록을 파악하고, 이번 작업과 관련된 의사결정 중 아직 문서화되지 않은 것이 있는지 확인한다.

**확인 기준 — 아래 결정이 코드에 영향을 주는데 ADR이 없을 때:**
- 새 외부 패키지 도입 (라이브러리 선택 근거)
- 새 폴더 구조나 파일 규칙 정의
- 데이터 페칭·상태 관리 방식
- 렌더링 전략 (SSG·SSR·CSR) 선택
- 마일스톤 첫 작업에서 등장하는 핵심 기술 결정

**누락된 ADR이 있을 때 처리 방식:**

사용자에게 직접 질문하여 결정 맥락을 파악하고 ADR을 작성한다. 질문은 Nygard 포맷의 Context → Decision → Consequences 흐름을 이끌어낼 수 있게 구성한다:

```
예시 질문 흐름 (MDX 파싱 라이브러리 ADR이 없을 때):

1. "MDX를 파싱할 라이브러리로 어떤 것들을 고려하셨나요?
   (@next/mdx / next-mdx-remote / contentlayer2)"

2. "각 옵션에서 가장 중요하게 본 기준이 무엇인가요?
   (App Router 호환성 / 빌드 속도 / API 유연성 등)"

3. "결국 어떤 것으로 결정하셨나요? 그 이유는?"

4. "이 결정으로 수용해야 할 트레이드오프가 있다면?"
```

답변을 바탕으로 `docs/adr/{번호}-{파일명}.md`를 Nygard 포맷으로 작성하고 커밋한다:

```bash
git add docs/adr/{번호}-{파일명}.md
git commit -m "docs(adr): {주제} 의사결정 기록"
```

누락된 ADR이 없거나 모두 작성되면 0-3으로 진행한다.

### 0-2-1. 마일스톤 전체 요청 처리

"M1 시작" 같이 마일스톤 단위 요청이 들어오면 아래 기준으로 이슈를 분할한다:

- 마일스톤 파일(`docs/roadmap/m*.md`)의 Tasks 목록을 읽는다
- **의존성이 없는 독립 태스크**는 각각 별도 이슈로 분리 (예: 소개 페이지, 404 페이지)
- **순차 의존성이 있는 태스크 묶음**은 하나의 이슈로 통합 (예: MDX 파싱 → 글 목록 → 글 상세)
- 분할 계획을 사용자에게 먼저 제시하고 승인 후 이슈 생성:

```
## M1 이슈 분할 계획

1. {이슈 제목} — {포함 태스크 목록}
2. {이슈 제목} — {포함 태스크 목록}
...

이 순서로 진행할까요?
```

승인 후 첫 번째 이슈부터 순차적으로 파이프라인을 실행한다.

### 0-3. GitHub 이슈 생성 (초기 실행·새 실행 시에만)

`.github/ISSUE_TEMPLATE/feature_request.md` 형식을 따른다:

마일스톤 번호는 GitHub와 1:1 대응한다:

| 마일스톤 | GitHub 번호 |
|---------|------------|
| M0 — 개발 환경 구축 | 1 |
| M1 — 블로그 코어 | 2 |
| M2 — 읽기 경험 | 3 |
| M3 — 탐색 / SEO | 4 |
| M4 — 콘텐츠 경험 고도화 | 5 |
| M5 — 운영 / 분석 | 6 |
| M6 — 감상 (Library) | 10 |
| M7 — 메모 (Notes) | 11 |
| M8 — 디자인 시스템 | 13 |
| M9 — UX 폴리시 | 12 |

```bash
ISSUE_URL=$(gh issue create \
  --title "{기능명 한 줄}" \
  --label "enhancement" \
  --milestone "{해당 마일스톤명 — 예: M1 — 블로그 코어}" \
  --body "## 기능 설명
{사용자 요청 요약}

## 배경 / 동기
{왜 이 기능이 필요한지 — PRD·ROADMAP 기반으로 작성}

## 구현 아이디어 (선택)
{planner 계획이 있으면 핵심만 요약, 없으면 생략}

## 관련 마일스톤
{해당 마일스톤 — 예: M1 — 블로그 코어}")

ISSUE_NUM=$(echo "$ISSUE_URL" | grep -o '[0-9]*$')
echo "Issue: #$ISSUE_NUM"
```

이슈 번호를 `.claude/_workspace/github.env`에 저장한다:
```bash
echo "ISSUE_NUM=$ISSUE_NUM" > .claude/_workspace/github.env
```

### 0-4. 브랜치 생성

```bash
source .claude/_workspace/github.env
SLUG="{기능명을 kebab-case로 — 예: post-list-page}"
BRANCH="feat/#${ISSUE_NUM}-${SLUG}"

git checkout -b "$BRANCH"
echo "Branch: $BRANCH"
```

브랜치가 이미 존재하면 checkout만 수행한다.

## Phase 1: 계획 수립 (planner)

`planner` 에이전트를 서브 에이전트로 호출한다:

```
Agent(
  subagent_type: "Plan",
  model: "opus",
  description: "블로그 기능 구현 계획 수립",
  prompt: """
  에이전트 정의: .claude/agents/planner.md 를 읽고 그 역할을 수행하라.
  
  요청: {사용자 요청 전달}
  
  컨텍스트 문서 (계획 수립 전 반드시 읽을 것):
  - docs/PRD.md — 기능 요구사항 및 Out of Scope 확인
  - docs/ROADMAP.md — 마일스톤 인덱스 확인
  - 해당 마일스톤 파일 (docs/roadmap/m*.md) — 포함 기능 및 진행 상황 확인
  - 해당 마일스톤의 Related Links에 명시된 와이어프레임 (docs/wireframes/*.html) — UI 작업이면 반드시 읽고 레이아웃·컴포넌트 구조 파악
  
  기존 관련 파일:
  {src/ 하위 관련 파일 목록 및 내용}
  
  구현 계획을 작성하여 반환하라.
  """
)
```

계획을 `.claude/_workspace/01_plan.md`에 저장한다.

## Phase 1 검토: 계획 사용자 확인

계획 저장 후 사용자에게 요약을 제시하고 승인을 받는다:

```
## 구현 계획 요약

### 생성/수정 파일
{01_plan.md의 파일 목록}

### 구현 순서
{01_plan.md의 단계 요약}

이 계획으로 진행할까요?
```

- **승인** → Phase 1.5(UI) 또는 Phase 2(로직)로 진행
- **수정 요청** → planner에 피드백 전달 후 재계획, 재확인
- **중단** → `_workspace/` 보존 후 종료

## Phase 1.5: 디자인 스펙 (designer) — UI 작업 시에만

UI 작업인 경우 `designer` 에이전트를 서브 에이전트로 호출한다:

```
Agent(
  subagent_type: "general-purpose",
  model: "opus",
  description: "컴포넌트 디자인 스펙 산출",
  prompt: """
  에이전트 정의: .claude/agents/designer.md 를 읽고 그 역할을 수행하라.

  DESIGN.md 를 읽고, 아래 계획의 각 컴포넌트에 적용할 디자인 토큰 매핑과
  globals.css에 추가할 CSS 변수 정의를 작성하라.

  구현 계획: {.claude/_workspace/01_plan.md 내용}
  """
)
```

디자인 스펙을 `.claude/_workspace/01_design.md`에 저장한다.

## Phase 1.5 검토: 디자인 방향 사용자 확인

designer가 Visual Companion을 제시하고 사용자 승인을 받은 뒤 최종 스펙을 `.claude/_workspace/01_design.md`에 저장한다.

- **승인** → Phase 2로 진행
- **수정 요청** → designer에 피드백 전달 후 재제시
- **중단** → `_workspace/` 보존 후 종료

## Phase 2: 구현 (builder)

`builder` 에이전트를 서브 에이전트로 호출한다:

```
Agent(
  subagent_type: "general-purpose",
  model: "opus",
  description: "블로그 기능 구현",
  prompt: """
  에이전트 정의: .claude/agents/builder.md 를 읽고 그 역할을 수행하라.

  구현 계획: {.claude/_workspace/01_plan.md 내용}
  디자인 스펙 (있는 경우): {.claude/_workspace/01_design.md 내용 — 없으면 생략}

  계획에 따라 파일을 생성/수정하고, 구현 완료 보고를 반환하라.
  """
)
```

구현 보고를 `.claude/_workspace/02_impl.md`에 저장한다.

## Phase 3: QA 검증 (qa)

`qa` 에이전트를 서브 에이전트로 호출한다:

```
Agent(
  subagent_type: "general-purpose",
  model: "opus",
  description: "블로그 구현 검증",
  prompt: """
  에이전트 정의: .claude/agents/qa.md 를 읽고 그 역할을 수행하라.
  
  구현 보고: {.claude/_workspace/02_impl.md 내용}
  구현 계획: {.claude/_workspace/01_plan.md 내용}
  
  빌드, 린트, 타입 체크를 실행하고 검증 결과를 반환하라.
  """
)
```

검증 결과를 `.claude/_workspace/03_qa.md`에 저장한다.

## Phase 4: PR 생성 및 결과 보고

**QA 실패 시 — 에러 유형에 따라 분기:**

- **빌드·타입·린트 에러** (구현 문제) → builder에 에러 전달, 1회 수정 후 QA 재실행. 재실행도 실패하면 에러 내용과 함께 사용자에게 보고하고 중단
- **설계 문제** (계획 자체의 아키텍처 충돌, 의존성 누락 등) → 수정 시도 없이 즉시 사용자에게 보고하고 재계획 여부 확인

**QA 통과 시 — PR 생성:**

```bash
source .claude/_workspace/github.env

gh pr create \
  --title "{type}: {기능명}" \
  --body "$(cat <<EOF
## 개요
{구현 내용 한 줄 요약}

## 관련 이슈
Closes #${ISSUE_NUM}

## 변경 유형
- [x] {feat / fix / refactor / style / docs / chore 중 해당 항목}

## 스크린샷 (UI 변경 시)
| Before | After |
|--------|-------|
|        |       |

## 체크리스트
### 코드 품질
- [x] \`npm run build\` 통과
- [x] \`npm run lint\` 통과
- [x] \`npx tsc --noEmit\` 통과

### 기능 검증
- [ ] 주요 흐름 직접 확인
- [ ] 에지 케이스 확인 (빈 상태, 로딩, 에러)
- [ ] 모바일/데스크탑 레이아웃 확인 (UI 변경 시)

### 접근성 (UI 변경 시)
- [ ] 키보드 탐색 가능
- [ ] 대비(contrast) 기준 충족
EOF
)"
```

PR URL을 사용자에게 보고한다:
```markdown
## 완료: {기능명}

- Issue: #{ISSUE_NUM}
- PR: {PR URL}
- Branch: {브랜치명}

{사용자에게 확인 요청할 사항 — UI 확인, 스크린샷 첨부 등}

---
> **PR merge 후 할 일**
> PR을 merge하면 docs-manager에게 CHANGELOG 버전 bump를 요청하세요.
> - 버그 수정이면 PATCH, 새 기능이면 MINOR
> - 마일스톤 마지막 PR이라면 해당 마일스톤 완료 여부도 함께 확인
```

## Progress 추적

아래 조건 중 하나라도 해당하면 `.claude/_workspace/progress.md`를 작성하고 매 단계마다 갱신한다:

- 하루 이상 이어지는 작업
- 여러 파일과 테스트가 관련된 기능
- 중간에 사용자 승인 단계가 많은 작업
- 여러 에이전트나 세션으로 나눠 진행하는 작업
- 실패한 테스트와 남은 TODO를 추적해야 하는 작업

```markdown
## Progress: {기능명}

**상태:** 진행중 | 완료 | 중단
**마지막 갱신:** {날짜}

### 완료된 단계
- [x] Phase 1 — {계획 요약}
- [x] Phase 1.5 — {디자인 스펙}

### 현재 단계
- [ ] Phase 2 — {구현 중인 내용}

### 남은 TODO
- [ ] {항목}

### 실패 이력
- Phase 3 QA 실패: {에러 내용} → {조치}

### 사용자 승인 대기
- {승인이 필요한 결정 사항}
```

## 에러 핸들링

- 단계별 실패 시 해당 단계 결과 없이 다음 단계 생략
- 재시도는 1회만 수행
- 모든 단계 완료 후 `_workspace/` 보존 (감사 추적용)

## 테스트 시나리오

**정상 흐름:**
1. "포스트 목록 페이지 만들어줘" → planner가 계획 수립 → builder가 `src/app/posts/page.tsx` 생성 → QA 빌드 통과

**에러 흐름:**
1. builder가 잘못된 import 경로 사용 → QA 빌드 실패 → builder에 재수정 요청 → 통과
2. 계획이 모호 → planner가 분해 요청 또는 합리적 추론으로 진행

**후속 작업:**
- "포스트 목록 디자인 바꿔줘" → _workspace 있음 + 수정 요청 → 부분 재실행 (builder만)
- "태그 필터도 추가해" → 새 기능 → _workspace 이전 후 새 실행
