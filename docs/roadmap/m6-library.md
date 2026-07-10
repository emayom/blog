# M6 — 감상 (Library)

- **진행 상태:** 완료
- **목표 일자:** —
- **목표:** 감상 기록(책·애니) 영역을 추가한다 (외부 소스 메타 자동 수집은 현 범위 제외)
- **목표 버전:** v0.6.0
- **Blocks:** —
- **Blocked by:** M1

## Tasks

- [x] 감상 콘텐츠 타입(Library Item) 파싱 — frontmatter 메타 (본문은 저장만, 표출 미정) — [#81](https://github.com/emayom/blog/issues/81)
- [x] 책장 페이지 (`/library`) — 카드 그리드 — [#83](https://github.com/emayom/blog/issues/83)
- [x] 카테고리 탭 (`book` · `anime`) — [#83](https://github.com/emayom/blog/issues/83)
- [x] 빈 상태 처리 — [#83](https://github.com/emayom/blog/issues/83)
- [x] 검색 (책장 스코프 — 제목) — [#84](https://github.com/emayom/blog/issues/84)
- [x] 항목 상세 페이지 (`/library/[slug]`) — hover underline, 문장수집(인용)·서평(감상) 섹션 표출, type별 목록 탭 복귀 — [#112](https://github.com/emayom/blog/issues/112)

## Out of Scope

- 영화·만화 (book·anime로 한정 — ADR-013)
- 정량 평가 체계(별점 등) — 문장수집·서평 텍스트 기록으로 대체 (별점 필드 제거, [#112])
- 외부 소스(Naver Book·AniList) 메타 자동 수집 — 현 범위 제외, frontmatter 수기 입력 (ADR-013 계약은 향후 재개 대비 보존)
- 외부 소스 실시간 동기화 (재개 시에도 작성 시점 수집 + 캐시)
- 전용 fetch 스크립트·`add` CLI·git hook 자동화 — 에이전트 구두 요청으로 충분 (ADR-013)

## Definition of Done

- 사용자가 `/library`에서 책·애니 카드 그리드를 카테고리별로 본다
- 작성자가 frontmatter(`title`·`type`·`cover`·`author` 등)를 직접 입력해 항목을 추가한다
- 책장 화면에서 검색이 책장(제목)으로 한정된다
- 항목 상세에서 문장수집(인용)·서평(감상)을 보고, 목록 복귀 시 항목의 카테고리 탭이 유지된다
- `npm run build` + Vitest + Playwright 통과

## Related Issues / Links

- 와이어프레임: [library](../wireframes/library.html)
- ADR-013 (감상 항목 데이터 소싱과 저장)
