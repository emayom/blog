# 8. UI 컴포넌트 라이브러리

Date: 2026-06-16

## Status

Accepted

## Context

컴포넌트 구현 비용을 줄이기 위해 Tailwind CSS와 함께 자주 사용되는 UI 컴포넌트 라이브러리 도입을 검토했다. 주요 후보는 다음과 같다:

- **shadcn/ui** — Radix UI 기반 copy-paste 방식. CVA + clsx + tailwind-merge 동일 스택 사용. 2025년 2월부터 Tailwind v4 + React 19 공식 지원
- **Headless UI** — Tailwind Labs에서 만든 비스타일 접근성 컴포넌트. Tailwind와 가장 자연스럽게 통합되나 컴포넌트 수가 적음
- **daisyUI** — Tailwind 플러그인 방식의 pre-styled 컴포넌트. 설정이 간단하지만 커스텀 디자인 시스템과 충돌 가능성 있음
- **직접 구현** — CVA + Radix UI Primitives 조합으로 필요한 컴포넌트만 직접 작성

## Decision

현 단계에서 UI 컴포넌트 라이브러리를 도입하지 않는다. PostCard, Navbar, TOC 수준의 블로그 컴포넌트는 CVA로 직접 구현하고, Dialog·Dropdown 등 복잡한 접근성 컴포넌트가 필요해지는 시점에 shadcn/ui에서 해당 컴포넌트만 개별 복사(copy-paste)하는 방식을 채택한다.

## Consequences

긍정적 결과:
- 블로그 수준의 컴포넌트는 CVA로 충분히 구현 가능하여 불필요한 코드 도입을 피한다
- 외부 라이브러리의 CSS 변수 체계와 이 프로젝트의 커스텀 디자인 토큰이 혼재하지 않는다
- 필요한 시점에 컴포넌트를 가져오므로 코드 소유권과 디자인 일관성을 유지할 수 있다

수용해야 할 결과:
- 복잡한 UI(모달, 드롭다운 등)가 필요할 때 직접 구현 비용이 발생한다
- 개별 컴포넌트 도입 시점에 Tailwind v4 호환성을 그때그때 검증해야 한다
- 새 라이브러리 설치 전 CLAUDE.md HITL 규칙에 따라 사람 확인이 필요하다
