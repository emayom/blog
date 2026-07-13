# M3 — 탐색 / SEO

- **진행 상태:** 완료 (2026-06-26, v0.3.0)
- **목표 일자:** —
- **목표:** 글 탐색 경로를 확장하고, 검색 엔진 노출을 위한 SEO를 정비한다
- **목표 버전:** v0.3.0
- **Blocks:** —
- **Blocked by:** M1 (M2와 병렬 진행 가능)

## Tasks

- [x] 태그 페이지 (`/tag/[tag]`)
- [x] 연도별 아카이브 (`/archive/[year]`)
- [x] 검색 모달 (퍼지 검색)
- [x] 페이지별 메타데이터 (title, description)
- [x] 동적 OG 이미지
- [x] 사이트맵 / robots.txt
- [x] 구조화 데이터 (JSON-LD: `WebSite`·`BlogPosting`·`Person`·`BreadcrumbList`)
- [x] RSS 피드 (`/feed.xml`)
- [x] 공유 버튼 (URL 복사)
- [x] 댓글 (giscus)

## Out of Scope

- 방문자 분석 (M5)
- 유료 SEO 도구 연동
- 다국어(i18n) 지원

## Definition of Done

- [x] 사용자가 태그 클릭으로 같은 태그의 글 목록을 볼 수 있다
- [x] 사용자가 검색 모달에서 키워드로 글을 찾을 수 있다
- [x] Google Search Console에 사이트맵 제출 가능한 상태
- [x] 글 공유 시 OG 미리보기가 정상 노출된다 (공유 디버거 확인)
- [x] `npm run build` + Vitest + Playwright 통과

## Related Issues / Links

- 와이어프레임: [list](../wireframes/list.html), [search](../wireframes/search.html), [tag](../wireframes/tag.html), [archive](../wireframes/archive.html)
- ADR: [ADR-004 검색 구현 방식](../adr/004-search.md), [ADR-005 댓글](../adr/005-comments.md)
- #29 — 탐색 페이지 (태그 페이지 + 연도별 아카이브)
- #30 — 검색 모달 (클라이언트 사이드 퍼지 검색)
- #31 — SEO 기반 (메타데이터 + 동적 OG 이미지 + 사이트맵)
- #32 — 공유 버튼 + giscus 댓글
- #34 — RSS 피드 (`/feed.xml`)
- #41 — 구조화 데이터 (JSON-LD)
- #50 — 연도별 아카이브 개선 (`/archive` 인덱스 + 연도 페이지)
- #52 — 아카이브 폴더 인터랙티브 UI 교체
