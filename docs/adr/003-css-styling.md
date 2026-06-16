# 3. CSS 스타일링 도구

Date: 2026-06-15

## Status

Accepted

## Context

블로그 스타일링 방식을 결정해야 한다. 주요 후보는 다음과 같다:

- **Tailwind CSS v4** — 유틸리티 퍼스트 CSS 프레임워크 최신 버전
- **Tailwind CSS v3** — 안정화된 이전 버전
- **CSS Modules** — 컴포넌트 단위 스코프 CSS
- **styled-components / Emotion** — CSS-in-JS

## Decision

**Tailwind CSS v4 + CVA(Class Variance Authority)** 조합을 채택한다.

- Tailwind CSS v4는 `tailwind.config.js` 없이 CSS 파일에서 직접 설정하는 PostCSS 방식을 사용한다
- CVA는 variant가 명확한 공통 컴포넌트에 한정하여 사용한다

## Consequences

긍정적 결과:
- 컴포넌트별 별도 CSS 파일 없이 마크업에서 직접 스타일을 적용해 개발 속도가 빠르다
- 사전 정의된 스케일(spacing, color, typography)로 일관된 디자인이 자연스럽게 유지된다
- CVA로 `size`, `variant` 같은 props에 따른 클래스 조합을 타입 안전하게 선언적으로 정의할 수 있다

수용해야 할 결과:
- v4는 v3 대비 breaking change가 있어 기존 레퍼런스(블로그 글, 강의)가 맞지 않을 수 있다
- `@apply` 사용이 v4에서 권장되지 않으므로 유틸리티 클래스를 직접 사용하는 습관이 필요하다
- CVA는 variant가 명확한 공통 컴포넌트에 적합하고, 단순한 일회성 스타일에는 오버스펙이다
