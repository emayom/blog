# 7. 테스트 도구

Date: 2026-06-15

## Status

Accepted

## Context

블로그 코드의 품질을 검증할 테스트 환경을 구성해야 한다. 주요 후보는 다음과 같다:

**단위·통합 테스트:**
- **Vitest** — Vite 기반 테스트 러너. ESM 네이티브, 빠른 실행, Vite 설정 재사용
- **Jest** — Node.js 기반 테스트 러너. 가장 넓은 생태계, Next.js 공식 지원

**E2E 테스트:**
- **Playwright** — Microsoft 개발. 멀티 브라우저, 강력한 셀렉터, 병렬 실행
- **Cypress** — 브라우저 내 실행 방식, 디버깅 편의성이 높음
- **Puppeteer** — Google 개발. 브라우저 자동화 도구로 E2E에 활용 가능하나 테스트 프레임워크 기능(어설션, 리포트 등)은 별도 구성이 필요. Playwright 팀이 Puppeteer 출신으로 API가 유사하며, Playwright는 Puppeteer의 Chromium 한정 방식에서 멀티 브라우저·테스트 프레임워크 기능을 추가한 상위 호환 도구

**컴포넌트 어설션:**
- **Testing Library** — 사용자 관점의 DOM 쿼리 (`getByRole`, `getByText`). Vitest·Jest 모두 호환

## Decision

**Vitest + Testing Library** (단위·통합) + **Playwright** (E2E) 조합을 채택한다.

- Storybook(@storybook/addon-vitest)과 Vitest를 단일 설정으로 통합할 수 있다
- Testing Library는 Vitest와 Jest 모두 호환되며, 사용자 행동 중심 테스트를 작성할 수 있다
- Playwright는 Next.js 공식 권장 E2E 도구다

## Consequences

긍정적 결과:
- Vite 기반 프로젝트(Storybook 포함)와 설정을 공유하여 환경 불일치를 줄인다
- Jest 대비 ESM 변환 설정 없이 동작하여 초기 설정 비용이 낮다
- Playwright로 실제 브라우저에서 핵심 사용자 플로우(글 목록 → 글 읽기, 다크모드 전환)를 검증할 수 있다

수용해야 할 결과:
- Jest에 비해 레퍼런스(블로그 글, 강의)가 적다
- Playwright 브라우저 바이너리 설치 용량이 크며 CI 캐싱 설정이 필요하다
