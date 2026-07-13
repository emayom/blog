# M1 — 블로그 코어

- **진행 상태:** 완료 (2026-06-18, v0.1.0)
- **목표 일자:** 2026-06-18
- **목표:** MDX 기반 블로그 인프라를 구축하고 글을 읽을 수 있는 최소 상태를 만든다
- **목표 버전:** v0.1.0
- **Blocks:** M2, M3, M4, M5, M6
- **Blocked by:** M0

## Tasks

- [x] Navbar / Footer 레이아웃 (데스크톱 텍스트 메뉴 + 모바일 햄버거 트레이)
- [x] 반응형 레이아웃
- [x] 다크/라이트 모드 (`next-themes` 설치 + `layout.tsx` ThemeProvider 적용)
- [x] 홈 페이지 (`/`) — Hero + 최근 글 섹션 + 아카이브 연도별 사이드바
- [x] 소개 페이지 (`/about`) — 프로필·연락 채널 (정적)
- [x] MDX 파싱 및 렌더링
- [x] Draft 모드 (dev 환경 전용)
- [x] 글 목록 페이지 (`/writing`)
- [x] 태그 필터 (목록 페이지 내)
- [x] 글 상세 페이지 (`/writing/[slug]`)
- [x] 코드 신택스 하이라이팅
- [x] 코드 블록 복사 버튼
- [x] 빈 상태 / 로딩 스켈레톤 / 에러 상태 UI (목록·상세)
- [x] 404 페이지

## Out of Scope

- 댓글 (M3)
- SEO 메타데이터·OG 이미지 (M3)
- 검색 (M3)
- TOC·이전/다음 글 (M2)
- 메모(`/notes`) (M7) · 감상 기록(`/library`) (M6)
- 방문자 분석 (M5)
- 글 목록 검색 박스 UI — `list.html` 와이어프레임에 포함되어 있으나 검색 기능 자체는 M3. UI placeholder 포함 여부는 M3 작업 시 결정

## Definition of Done

- [x] 사용자가 글 목록을 보고 글을 클릭해 읽을 수 있다
- [x] 태그로 글 목록을 필터링할 수 있다
- [x] 다크/라이트 모드가 전환되고 새로고침 후에도 유지된다
- [x] 소개 페이지에서 프로필·연락 채널을 볼 수 있다
- [x] 모바일(375px)과 데스크탑(1280px)에서 레이아웃이 깨지지 않는다
- [x] `npm run build` + Vitest + Playwright 통과

## Related Issues / Links

- 와이어프레임: [home](../wireframes/home.html), [list](../wireframes/list.html), [detail](../wireframes/detail.html), [about](../wireframes/about.html), [states](../wireframes/states.html), [mobile](../wireframes/mobile.html), [layout](../wireframes/layout.html)
- #11 — 레이아웃 기반 인프라 구축
- #13 — MDX 파이프라인 구축
- #15 — 글 읽기 경험 (목록·상세·태그·소개·상태 UI)
- #17 — 홈 페이지 (Hero + 최근 글 + 아카이브 사이드바)
- #24 — 기존 md/mdx 글 마이그레이션
- #45 — fix: MDX 테이블 렌더링 오류 (remark-gfm 누락)
- #48 — fix: 모바일 햄버거 메뉴 미표시
- #53 — 소개·푸터 소셜 링크 중복 제거 및 env 매핑
- #55 — 소개 페이지 프로필 사진 추가
- #58 — 소개 페이지 소셜 링크 아이콘 추가
