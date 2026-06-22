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

[Unreleased]: https://github.com/emayom/blog/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/emayom/blog/releases/tag/v0.1.0
