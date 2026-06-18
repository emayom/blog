# 15. 다크/라이트 모드 구현

Date: 2026-06-18

## Status

Accepted

## Context

PRD 우선순위 '상'으로 다크/라이트 모드를 지원해야 한다. 요구사항은 다음과 같다:
- 시스템 설정(prefers-color-scheme)을 기본값으로 사용
- 사용자가 수동으로 전환 가능
- 새로고침 후에도 선택한 테마가 유지되어야 한다 (M1 Definition of Done)

Next.js App Router + SSR 환경에서 테마 구현 시 hydration 불일치(FOUC — Flash of Unstyled Content) 문제가 발생할 수 있다. 서버는 테마를 모르는 상태로 HTML을 내려보내고, 클라이언트가 localStorage에서 테마를 읽어 적용하는 시점 사이에 깜빡임이 생긴다.

## Decision

**`next-themes`** 를 채택하고 `src/app/layout.tsx`에 `ThemeProvider`를 적용한다.

`next-themes`가 FOUC를 완화하는 방식:
- `<html>` 태그에 `suppressHydrationWarning`을 설정해 React hydration 경고를 억제한다
- 인라인 스크립트로 페이지 로드 직후(React 로드 이전) localStorage 값을 읽어 `<html>` class를 즉시 적용한다

Tailwind CSS v4에서는 `globals.css`에 `@variant dark (.dark)` 설정으로 연동한다.

## Consequences

긍정적 결과:
- App Router RSC 환경에서 검증된 라이브러리로 설정이 단순하다
- 시스템 테마 감지(`system`)와 localStorage 기반 사용자 선택 유지가 내장되어 있다
- Tailwind CSS v4 dark variant와 자연스럽게 연동된다

수용해야 할 결과:
- `<html>` 태그에 `suppressHydrationWarning`이 필요하다 — 의도적 선택이며 다크모드 외의 hydration 불일치를 숨길 수 있으므로 해당 속성의 목적을 주석으로 명시한다
- 인라인 스크립트 특성상 Content Security Policy(CSP) 설정 시 `unsafe-inline`을 허용해야 한다 (현재 CSP 미적용이므로 문제없음)