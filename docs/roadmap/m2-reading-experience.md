# M2 — 읽기 경험

- **진행 상태:** 완료
- **목표 일자:** 2026-06-22
- **목표:** 글을 읽는 과정에서 탐색과 집중을 돕는 기능을 추가한다
- **목표 버전:** v0.2.0
- **Blocks:** —
- **Blocked by:** M1

## Tasks

- [x] 목차(TOC) — 헤딩 추출, 데스크탑 사이드바 고정 (#20)
- [x] 시리즈 네비게이션 (#22)
- [x] 이전/다음 글 (#21)
- [x] 연관 글 (태그 겹침 기준, 최대 3개) (#21)
- [x] Back to Top 버튼 (#20)

## Out of Scope

- SEO 최적화·메타데이터 (M3)
- 검색·댓글 (M3)
- 읽기 진행 표시 progress bar (M6)
- 페이지 전환 애니메이션 (M6)

## Definition of Done

- 사용자가 TOC를 클릭해 글 내 특정 헤딩으로 이동할 수 있다
- 스크롤 위치에 따라 TOC 현재 위치가 하이라이트된다
- 글 하단에서 이전/다음 글로 이동할 수 있다
- 연관 글이 없을 때 빈 영역 없이 자연스럽게 처리된다
- `npm run build` + Vitest + Playwright 통과

## Technical Risks

- TOC 헤딩 추출 — MDX 파싱 후 remark/rehype 플러그인으로 처리 필요, 중첩 헤딩 depth 처리
- TOC 스크롤 동기화 — `IntersectionObserver` 기반, 짧은 섹션에서 활성 항목 오작동 가능

## Related Issues / Links

- 와이어프레임: [detail](../wireframes/detail.html)
