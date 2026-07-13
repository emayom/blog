# M2 — 읽기 경험

- **진행 상태:** 완료 (2026-06-22, v0.2.0)
- **목표 일자:** 2026-06-22
- **목표:** 글을 읽는 과정에서 탐색과 집중을 돕는 기능을 추가한다
- **목표 버전:** v0.2.0
- **Blocks:** —
- **Blocked by:** M1

## Tasks

- [x] 목차(TOC) — 헤딩 추출, 데스크탑 사이드바 고정
- [x] 시리즈 네비게이션
- [x] 이전/다음 글
- [x] 연관 글 (태그 겹침 기준, 최대 3개)
- [x] Back to Top 버튼

## Out of Scope

- SEO 최적화·메타데이터 (M3)
- 검색·댓글 (M3)
- 읽기 진행 표시 progress bar (M9)
- 페이지 전환 애니메이션 (M9)

## Definition of Done

- [x] 사용자가 TOC를 클릭해 글 내 특정 헤딩으로 이동할 수 있다
- [x] 스크롤 위치에 따라 TOC 현재 위치가 하이라이트된다
- [x] 글 하단에서 이전/다음 글로 이동할 수 있다
- [x] 연관 글이 없을 때 빈 영역 없이 자연스럽게 처리된다
- [x] `npm run build` + Vitest + Playwright 통과

## Related Issues / Links

- 와이어프레임: [detail](../wireframes/detail.html)
- #20 — TOC + Back to Top 버튼
- #21 — 이전/다음 글 · 연관 글
- #22 — 시리즈 네비게이션
