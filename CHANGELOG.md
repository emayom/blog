# Changelog

모든 주요 변경 사항을 이 파일에 기록한다.
[Keep a Changelog](https://keepachangelog.com/ko/1.0.0/) 형식을 따르며,
버전은 [Semantic Versioning](https://semver.org/lang/ko/)을 따른다.

## 버전 전략

| 버전 | 올리는 시점 | 예시 |
|------|------------|------|
| `MAJOR` (x.0.0) | 사이트 구조·URL 파괴적 변경 | 라우팅 전면 개편 |
| `MINOR` (0.x.0) | 새 페이지·섹션·기능 추가 | 블로그 기능 출시 |
| `PATCH` (0.0.x) | 버그 수정, 글 추가, 사소한 개선 | 오탈자 수정, 새 글 게시 |

- 개발 단계에서는 **마일스톤 완료 시점마다 `0.x.0` 릴리스를 태깅**한다(아직 프로덕션 미배포).
- **`1.0.0`** = Vercel 초도 프로덕션 배포 시점. 이후 실제 운영 변경에 SemVer를 적용한다.

---

## [Unreleased]

---

## [0.6.0] - 2026-07-10

M6 감상 (Library) — 책·애니 감상 기록을 카드 그리드·검색·상세 페이지로 열람할 수 있는 책장 섹션을 추가했다.

### Added

- 감상 콘텐츠 타입(Library Item) 파싱 — `title`·`type`·`cover`·`author` 등 frontmatter 수기 입력 (#81)
- 책장 페이지 (`/library`) — book·anime 카드 그리드, 카테고리 탭, 빈 상태 처리 (#83)
- 책장 스코프 검색 — 제목 기준 필터링 (#84)
- 항목 상세 페이지 (`/library/[slug]`) — hover underline, 문장수집(인용)·서평(감상) 섹션 표출, 카테고리 탭 복귀 (#112)

### Removed

- 별점(rating) 필드 — 정량 평가 대신 문장수집·서평 텍스트 기록으로 대체 (#112)

---

## [0.5.0] - 2026-07-01

M5 운영 / 분석 — 블로그 운영에 필요한 방문자 데이터 수집 도구를 추가했다.

### Added

- Google Analytics 4 연동 — `gtag.js` Script 컴포넌트로 페이지뷰 수집 (#74)
- Web Vitals 모니터링 — `web-vitals` 패키지로 LCP·CLS·INP·FCP·TTFB 측정, GA4 `web_vitals` 커스텀 이벤트 전송 (#79)
- `.env.example` — `NEXT_PUBLIC_GA_ID` 환경변수 항목 추가
- 내비게이션 모바일 메뉴 개편
- 푸터 배포 메타데이터 표시

---

## [0.4.0] - 2026-06-30

M4 콘텐츠 경험 고도화 — 글의 표현력을 높이고 목록 탐색 경험을 개선했다.

### Added

- Featured Posts — frontmatter `featured: true` 글을 목록 상단에 고정 표시
- 헤딩 앵커 링크 — h2~h6 hover 시 링크 아이콘 표시, 클릭 시 URL 클립보드 복사 (rehype-autolink-headings + HeadingAnchor 클라이언트 컴포넌트)
- 글 상세 breadcrumb — 홈 / 글 / 글 제목 형태로 현재 위치 표시
- 시리즈 섹션 — 글 목록 하단에 시리즈 목록 표시
- 커스텀 MDX 컴포넌트 — Callout (info / warning / tip), CodeGroup, Collapse, FileTree, Steps, Kbd

---

## [0.3.0] - 2026-06-26

M3 탐색 / SEO — 글 탐색 경로를 확장하고 검색 엔진 노출을 위한 SEO를 정비했다.

### Added

- 태그 페이지 (`/tag/[tag]`) + 연도별 아카이브 (`/archive/[year]`) (#33)
- 검색 모달 — fuse.js 퍼지 검색, 키보드 탐색 (#35)
- 페이지별 메타데이터 (title, description) + 동적 OG 이미지 + sitemap.xml / robots.txt (#37)
- RSS 2.0 피드 (`/feed.xml`) (#38)
- 공유 버튼 (Web Share API + 클립보드 폴백) + giscus 댓글 위젯 (#40)
- JSON-LD 구조화 데이터 — WebSite·Person·BlogPosting·BreadcrumbList (#42)

### Fixed

- BlogPosting `datePublished`·`dateModified` ISO 8601 시간대 포함 포맷 적용 (#43)

---

## [0.2.0] - 2026-06-22

M2 읽기 경험 — 글을 읽는 과정에서 탐색과 집중을 돕는 기능을 추가했다.

### Added

- 목차(TOC) — 헤딩 추출, 데스크탑 사이드바 고정, 스크롤 위치 하이라이트 (rehype-slug, ADR-017) (#20)
- Back to Top 버튼 (#20)
- 이전/다음 글 내비게이션 — 날짜순 인접 글 이동 (#21)
- 연관 글 — 태그 겹침 기준 최대 3개 (#21)
- 시리즈(연재) 네비게이션 — `series`/`seriesOrder` 프론트매터 기반 (#22)

---

## [0.1.0] - 2026-06-18

M1 블로그 코어 — MDX 기반 블로그 인프라를 구축하고 글을 읽을 수 있는 최소 상태를 완성했다.

### Added

- Navbar · Footer 전역 레이아웃 및 반응형 대응 (#12)
- 다크/라이트 모드 (next-themes, ADR-015) (#12)
- 404 Not Found 페이지 (#12)
- MDX 렌더링 파이프라인 (next-mdx-remote, ADR-014) (#14)
- Draft 모드 — 게시 전 글 숨김 처리 (#14)
- 코드 신택스 하이라이팅 (rehype-pretty-code / shiki, ADR-006) (#14)
- 코드 블록 복사 버튼 (#14)
- 글 목록 페이지 `/writing` (#16)
- 태그 필터 — `?tag=` URL 쿼리 동기화 (#16)
- 글 상세 페이지 `/writing/[slug]` (#16)
- 소개 페이지 `/about` (#16)
- 빈 상태 · 로딩 스켈레톤 · 에러 상태 UI (목록·상세) (#16)
- 읽기 시간 표시 (reading-time-estimator, ADR-016) (#16)
- 홈 페이지 `/` — Hero · 최근 글 · 연도별 아카이브 사이드바 (#18)

[Unreleased]: https://github.com/emayom/blog/compare/v0.6.0...HEAD
[0.6.0]: https://github.com/emayom/blog/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/emayom/blog/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/emayom/blog/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/emayom/blog/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/emayom/blog/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/emayom/blog/releases/tag/v0.1.0
