# M4 — 콘텐츠 경험 고도화

- **진행 상태:** 완료
- **목표 일자:** —
- **목표:** 글의 표현력을 높이고, 목록 탐색 경험을 개선한다
- **목표 버전:** v0.4.0
- **Blocks:** —
- **Blocked by:** M1

## Tasks

- [x] Featured Posts — 목록 상단에 주목할 글 고정 표시
- [x] 헤딩 앵커 링크 — h2~h6 hover 시 링크 아이콘 표시, 클릭 시 URL 클립보드 복사 (`rehype-autolink-headings` + `HeadingAnchor` 클라이언트 컴포넌트)
- [x] 글 상세 breadcrumb — 홈 / 글 / 글 제목 형태로 현재 위치 표시 (목록 페이지와 일관성)
- [x] 시리즈 섹션 — 글 목록 하단에 시리즈 목록 표시
- [x] 커스텀 MDX 컴포넌트 — 글 안에서 사용할 수 있는 UI 블록
  - `<Callout>` — info / warning / tip 변형
  - `<CodeGroup>` — 탭으로 여러 언어·프레임워크 코드 전환
  - `<Collapse>` — 긴 부연설명 접기
  - `<FileTree>` — 폴더 구조 시각화
  - `<Steps>` — 번호 매긴 단계별 가이드
  - `<Kbd>` — 키보드 단축키 표기 (기존 Kbd 컴포넌트 MDX 연결)

## Out of Scope

- 방문자 분석·운영 도구 (M5)
- 애니메이션·UX 폴리시 (M6)
- 외부 CMS 연동
- 이미지 최적화 파이프라인 (별도 검토)

## Definition of Done

- [x] frontmatter `featured: true` 글이 목록 상단에 고정 노출된다
- [x] h2~h6 헤딩에 hover 시 앵커 링크 아이콘이 표시되고, 클릭 시 URL이 클립보드에 복사된다
- [x] 글 상세 페이지에 홈 / 글 / 글 제목 형태의 breadcrumb가 표시된다
- [x] 글 목록 최하단에 시리즈 섹션이 표시된다
- [x] Callout · CodeGroup · Collapse · FileTree · Steps · Kbd 컴포넌트를 MDX에서 사용할 수 있다
- [x] `npm run build` + Vitest 통과

## Related Issues / Links

- 와이어프레임: [list](../wireframes/list.html), [series](../wireframes/series.html)
