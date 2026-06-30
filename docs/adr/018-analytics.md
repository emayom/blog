# ADR-018: 방문자 분석 도구 — Google Analytics 4

- **날짜:** 2026-06-30
- **상태:** 결정됨

## Context

M5 운영/분석 마일스톤에서 블로그 방문자 데이터와 Core Web Vitals를 수집할 도구가 필요하다.
후보는 GA4(구글), Plausible(클라우드 유료), Umami(셀프 호스팅 무료) 세 가지였다.

## Decision

**Google Analytics 4**를 선택한다.

구현 방식: Next.js 내장 `<Script>` 컴포넌트 + gtag.js. 추가 패키지 없이 `NEXT_PUBLIC_GA_ID` 환경변수 하나로 활성화한다.

## Consequences

**장점**
- 추가 npm 패키지 불필요 — 번들 사이즈 영향 없음
- GA4 Enhanced Measurement로 Web Vitals 자동 수집 (별도 구현 불필요)
- Google Search Console과 연동하여 CWV 리포트 확인 가능
- 업계 표준 — 레퍼런스와 디버깅 리소스가 풍부함

**트레이드오프**
- 광고 차단기에 의해 차단될 수 있음 (Plausible/Umami 대비 불리)
- 데이터가 Google 서버에 저장됨 (프라이버시 친화적이지 않음)
- `NEXT_PUBLIC_GA_ID`가 클라이언트에 노출됨 (GA 측정 ID는 공개 정보이므로 문제없음)
