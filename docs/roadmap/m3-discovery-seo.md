# M3 — 탐색 / SEO

- **진행 상태:** 진행중
- **목표 일자:** —
- **목표:** 글 탐색 경로를 확장하고, 검색 엔진 노출을 위한 SEO를 정비한다
- **목표 버전:** v0.3.0
- **Blocks:** —
- **Blocked by:** M1 (M2와 병렬 진행 가능)

## Tasks

- [x] 태그 페이지 (`/tag/[tag]`)
- [x] 연도별 아카이브 (`/archive/[year]`)
- [ ] 검색 모달 (퍼지 검색)
- [ ] 페이지별 메타데이터 (title, description)
- [ ] 동적 OG 이미지
- [ ] 사이트맵 / robots.txt
- [ ] RSS 피드 (`/feed.xml`)
- [ ] 공유 버튼 (URL 복사)
- [ ] 댓글 (giscus)

## Out of Scope

- 방문자 분석 (M5)
- 유료 SEO 도구 연동
- 다국어(i18n) 지원

## Definition of Done

- 사용자가 태그 클릭으로 같은 태그의 글 목록을 볼 수 있다
- 사용자가 검색 모달에서 키워드로 글을 찾을 수 있다
- Google Search Console에 사이트맵 제출 가능한 상태
- 글 공유 시 OG 미리보기가 정상 노출된다 (공유 디버거 확인)
- `npm run build` + Vitest + Playwright 통과

## Technical Risks

- 퍼지 검색 성능 — 글 수 증가 시 클라이언트 사이드 인덱스 크기 문제 (Fuse.js 기준 ~500개까지 무난)
- 동적 OG 이미지 생성 — `next/og` Edge Runtime 제약, 한글 폰트 로드 필요
- giscus — GitHub 계정 없는 독자는 댓글 불가 (의도된 트레이드오프)

## Related Issues / Links

- 와이어프레임: [tag](../wireframes/tag.html), [archive](../wireframes/archive.html)
