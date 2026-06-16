# 9. Storybook

Date: 2026-06-15

## Status

Accepted

## Context

컴포넌트 개발 및 문서화 도구 도입 여부를 결정해야 한다. 개인 블로그 프로젝트에서 Storybook은 일반적인 선택이 아니므로 도입 근거가 필요하다.

Storybook은 UI 컴포넌트를 실제 페이지와 분리된 환경에서 개발·시각화·테스트할 수 있는 도구다. 이 프로젝트에서는 `@storybook/nextjs-vite` 프레임워크와 `@storybook/addon-vitest`를 통해 Vitest와 단일 설정으로 통합한다.

**도입 여부 검토:**

| 관점 | 내용 |
|------|------|
| 개인 프로젝트 규모 | 팀 협업이 없으므로 컴포넌트 문서화 필요성이 낮음 |
| 블로그 컴포넌트 복잡도 | PostCard, Navbar, Button 수준으로 Storybook 없이도 개발 가능 |
| Vitest 통합 | `@storybook/addon-vitest`로 Storybook Story를 Vitest 테스트로 실행 가능 — 테스트 환경 통합이 주된 이점 |
| 디자인 시스템 방향 | 장기적으로 커스텀 디자인 토큰 기반 컴포넌트를 구축할 계획으로, 컴포넌트 단위 개발 환경이 유용 |

## Decision

Storybook을 도입한다. 단, 환경 설정만 완료하고 Story 작성은 컴포넌트 구현 시점부터 시작한다.

## Consequences

긍정적 결과:
- 컴포넌트를 페이지 컨텍스트 없이 독립적으로 개발·확인할 수 있어, 디자인 토큰 적용 결과를 빠르게 검증할 수 있다
- `@storybook/addon-vitest`로 Story가 곧 컴포넌트 테스트가 되어 Vitest와 테스트 환경을 공유한다
- 컴포넌트 변형(variant)을 Story로 관리하면 CVA 설계를 시각적으로 검증할 수 있다

수용해야 할 결과:
- Storybook 설정 유지 비용이 발생한다 (Next.js·Tailwind 버전 업 시 호환성 확인 필요)
- Story를 작성하지 않으면 도구의 이점을 얻지 못하므로, 컴포넌트 구현 시 Story 작성을 관행으로 유지해야 한다
