# 컴포넌트 인벤토리

- **상태:** Draft
- **날짜:** 2026-06-15
- **참조:** `docs/wireframes/`(구조), `DESIGN.md`(토큰·컴포넌트), `docs/information-architecture.md`(화면)

재사용 UI 컴포넌트 카탈로그. 와이어프레임에서 도출한 컴포넌트를 변형·상태·주요 props·사용 화면과 함께 정리하고,
`DESIGN.md`의 토큰/컴포넌트 키에 매핑한다. 구현 시 이 목록을 단일 출처로 삼아 중복 생성을 막는다.

이 문서는 *무엇이 있는지*(인덱스)를 다루고, *어떻게 생겼는지*(시각 정본)는 컴포넌트 시트 `docs/wireframes/components.html`에서 본다. 공유 셸(헤더/푸터)은 `docs/wireframes/layout.html`.

> **정본 주의:** 컴포넌트가 코드로 구현되면(예: Storybook) 그쪽이 시각/동작의 정본이 되고,
> 이 문서는 "무엇이 있는지"의 인덱스 역할로 남는다. 와이어프레임은 구조 스케치일 뿐 픽셀 기준이 아니다.

## 1. 네비게이션

`GlobalNav`·`Footer`는 모든 페이지 공유 셸이다. 와이어프레임 정본은 `docs/wireframes/layout.html`이며, 변경 시 그곳을 먼저 고친다.

| 컴포넌트 | 변형 / 상태 | 주요 props | 사용 화면 | DESIGN.md |
|----------|-------------|------------|-----------|-----------|
| `GlobalNav` | 데스크톱 / 모바일(햄버거), 항목 active | `items[]`, `current` | 전체 (정본 `layout.html`) | `global-nav` |
| `Footer` | — | `copyright`, `links[]` | 전체 (정본 `layout.html`) | `footer` |
| `MobileTabBar` | 항목 on/off | `tabs[]`, `current` | 모바일 | (신규) |

## 2. 액션

| 컴포넌트 | 변형 / 상태 | 주요 props | 사용 화면 | DESIGN.md |
|----------|-------------|------------|-----------|-----------|
| `Button` | solid / ghost, hover·active·focus·disabled | `variant`, `href`, `onClick` | 진입·상태 | `button-primary`, `button-secondary-pill` |
| `TextLink` | 기본 / on-dark | `href` | 본문·메타 | `text-link`, `text-link-on-dark` |
| `Chip` | 선택 on/off (필터) | `label`, `selected` | 탐색 | `configurator-option-chip(-selected)` |
| `Tab` | on/off (카테고리) | `label`, `selected` | 감상 | (탭 패턴) |
| `Pagination` | 현재 페이지, 이전/다음 비활성 (현재 미적용·향후) | `page`, `total` | 탐색 | — |
| `Sort` | 드롭다운(라벨·값·chevron) | `options[]`, `current` | 탐색(글 목록) | (신규) |
| `Tag` | 라벨(채움 칩) | `label`, `href` | 전역 | (신규) |
| `RssButton` | 아이콘 + 라벨 | `href`(해당 분류 피드) | 태그(향후 목록·아카이브) | (신규) |

## 3. 콘텐츠 카드 · 목록

| 컴포넌트 | 변형 / 상태 | 주요 props | 사용 화면 | DESIGN.md |
|----------|-------------|------------|-----------|-----------|
| `Intro` | 슬림 — 아바타 + 한 줄 소개 (연결 정보는 푸터) | `avatar`, `bio` | 진입 | — |
| `PostCard` | 기본 / featured. **제목 → 요약 → 메타(날짜·읽기시간) → 태그** 순 | `title`, `date`, `readingTime`, `tags[]`, `excerpt`, `href` | 탐색·진입·태그·아카이브 | `store-utility-card` |
| `NoteCard` | 고정(pinned) / 일반 — 제목(선택)+본문+태그·날짜 | `title?`, `body`, `tags[]`, `date`, `pinned` | 메모 | (신규) |
| `ShelfCard` | type별(책/애니) | `title`, `cover`, `rating`, `type`, `link` | 감상 | `store-utility-card` |
| `ArchiveList` | 사이드바 / 진입 블록 / 테두리 없는 리스트 | `years[{year,count}]` | 진입·탐색 | — |
| `TagList` | — | `tags[]` | 탐색·상세 | — |
| `SectionHeading` | 제목 / 제목+더보기 링크 | `title`, `moreHref?` | 진입·상세·메모 | `.sec-title` |

## 4. 글 읽기 (소비)

| 컴포넌트 | 변형 / 상태 | 주요 props | 사용 화면 | DESIGN.md |
|----------|-------------|------------|-----------|-----------|
| `ArticleHeader` | — | `title`, `date`, `tags[]` | 상세 | `{typography.display-md}` |
| `TableOfContents` | 데스크톱 sticky / 모바일 숨김 | `headings[]`, `activeId` | 상세 | — |
| `RelatedPosts` | 1~3개 / 없으면 섹션 미노출 | `posts[]`(태그 겹침 파생, 최대 3) | 상세 | `store-utility-card` |
| `PrevNext` | 이전만 / 다음만 / 양쪽 | `prev`, `next` | 상세 | — |
| `Comments` | 외부 위젯(직접 구현 아님) | giscus 임베드 설정 | 상세 | — (ADR-005) |
| `CodeBlock` | 복사 기본 / 복사됨 | `lang`, `code` | 상세 | — |

> `Comments`는 직접 구현하지 않고 외부 라이브러리 **giscus**(GitHub Discussions 기반)를 임베드한다 — 결정 배경은 `docs/adr/005-giscus-comments.md`. 와이어프레임의 점선 박스는 임베드 영역 placeholder이며, 실제 UI·동작은 giscus가 제공한다.

## 5. 사이드바 · 위젯

| 컴포넌트 | 변형 / 상태 | 주요 props | 사용 화면 | DESIGN.md |
|----------|-------------|------------|-----------|-----------|
| `Widget` | 아카이브 / 태그 / 목차 컨테이너 | `title`, `children` | 탐색·상세 | `store-utility-card` |
| `WithAside` (레이아웃) | 본문+사이드바 / 모바일 단일 | — | 탐색·상세 | Responsive |

## 6. 프로필 (저자)

| 컴포넌트 | 변형 / 상태 | 주요 props | 사용 화면 | DESIGN.md |
|----------|-------------|------------|-----------|-----------|
| `ProfileHeader` | 데스크톱 가로 / 모바일 세로 | `name`, `handle`, `bio`, `avatar` | 저자 | — |
| `StatusBadge` | — | `label` (예: 포커싱 중) | 저자 | — |
| `SocialLinks` | — | `links[]` (GitHub·LinkedIn·Email) | 저자·진입·푸터 | — |

## 7. 폼 · 입력

| 컴포넌트 | 변형 / 상태 | 주요 props | 사용 화면 | DESIGN.md |
|----------|-------------|------------|-----------|-----------|
| `SearchTrigger` | 보더·배경 없는 아이콘 버튼(돋보기) — 클릭 시 검색 모달 오픈 | `onClick` | 목록·메모 | — |
| `SearchModal` | 열림/닫힘 · 결과/빈 결과 · 키보드 선택. **fuse.js 퍼지 검색**, 스코프=현재 섹션 | `open`, `query`, `results[]`, `scope` | 검색 (정본 `search.html`) | — |

## 8. 상태

| 컴포넌트 | 변형 / 상태 | 주요 props | 사용 화면 | DESIGN.md |
|----------|-------------|------------|-----------|-----------|
| `EmptyState` | 글 없음 / 감상 없음 / 빈 결과 | `icon`, `message`, `action?` | 상태 | — |
| `ErrorState` | 불러오기 실패 / 404 | `message`, `retry?` | 상태 | — |
| `Skeleton` | 줄 / 카드 / 이미지 | `variant` | 로딩 | — |

## 미해결 / 신규 필요

- `MobileTabBar`, `EmptyState`, `ErrorState`, `Skeleton`, `Sort`, `Tag`, `NoteCard`은 `DESIGN.md`에 대응 토큰이 없다 → 디자인 정의 필요(`designer`).
- `DESIGN.md`는 Apple 참조 시스템이라 블로그 전용 컴포넌트(TOC·NoteCard·Hero 등)는 토큰을 새로 정해야 한다.

## 동기화 책임

새 컴포넌트를 구현하거나 변형/상태를 추가하면 `docs-manager`가 이 표에 반영한다.
`DESIGN.md` 토큰이 새로 생기면 매핑 열을 채운다. 코드(Storybook 등) 구현 후에는 이 문서를 인덱스로 유지한다.

## 변경 이력

| 날짜 | 변경 내용 | 사유 |
|------|----------|------|
| 2026-06-15 | 초기 컴포넌트 인벤토리 정의 | 와이어프레임 기반 컴포넌트 카탈로그화 |
| 2026-06-17 | 누락 컴포넌트 보강: `Sort`·`Tag`·`Hero`·`NoteCard`·`SectionHeading` 추가, `PostCard`에 읽기시간 props·사용 화면 반영 | 페이지↔컴포넌트 정합성 점검 |
