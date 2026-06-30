# M5 — 운영 / 분석

- **진행 상태:** 미시작
- **목표 일자:** —
- **목표:** 블로그 운영에 필요한 도구와 독자 데이터를 확보한다
- **목표 버전:** v0.5.0
- **Blocks:** —
- **Blocked by:** M1, Vercel 배포 완료

## Tasks

- [x] RSS 피드 (`/feed.xml`)
- [ ] 방문자 분석 — Google Analytics 4 (ADR-018)
- [ ] Web Vitals 모니터링 — GA4 Enhanced Measurement

## Out of Scope

- 광고·수익화
- 뉴스레터 발송
- 댓글 알림 (giscus 자체 알림으로 대체)
- 커스텀 대시보드 구축

## Definition of Done

- `/feed.xml`이 RSS 리더에서 정상 파싱된다
- 방문자 대시보드에서 페이지뷰 데이터를 확인할 수 있다
- Core Web Vitals 지표가 대시보드에 수집된다
- `npm run build` 통과

## Technical Risks

- GA4 측정 ID(`NEXT_PUBLIC_GA_ID`)를 `.env.local`에 설정해야 실제 데이터 수집 가능

## Related Issues / Links

-
