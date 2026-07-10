# 콘텐츠 모델 (스키마)

- **상태:** Draft
- **날짜:** 2026-06-15
- **참조:** `docs/information-architecture.md`(분류축), `docs/adr/002-mdx-content.md`(저장 방식), `docs/roadmap/`

콘텐츠 타입과 필드를 정의하는 문서. IA에서 정한 분류축(주제 태그·작성 시점·미디어 유형·시리즈)을
실제 **frontmatter 필드**로 구체화해, 목록 필터·아카이브·책장·메모·SEO 구현이 같은 정의를 공유하게 한다.

## 원칙

- **정본은 콘텐츠 파일이다.** 글·감상·메모의 메타데이터는 각 파일의 frontmatter가 진실의 원천이다.
- **분류는 frontmatter로만 한다.** 별도 DB·태그 목록 파일을 두지 않는다(ADR-002). 태그·아카이브·책장 카테고리는 모두 필드에서 파생한다.
- **필수 최소화.** 필수 필드는 글이 성립하는 데 꼭 필요한 것만. 나머지는 선택 + 기본값.

## 콘텐츠 타입 1 — 글 (Article)

- **위치:** `src/content/writing/*.mdx`
- **URL:** 파일명(또는 `slug`) → `/writing/[slug]`

| 필드 | 타입 | 필수 | 기본 | 설명 | 연결 기능 |
|------|------|:---:|------|------|-----------|
| `title` | string | ✓ | — | 글 제목 | 목록·상세·메타 |
| `date` | string `YYYY-MM-DD` | ✓ | — | 작성일 | 아카이브·정렬·연관 글 |
| `slug` | string | – | 파일명 | URL 경로. 영문 케밥케이스 | `/writing/[slug]` |
| `tags` | string[] | – | `[]` | 주제 태그 | 필터·`/tag/[tag]`·연관 글(m2) |
| `description` | string | – | 본문 발췌 | 요약/메타 | 목록 발췌·SEO·OG(m3) |
| `draft` | boolean | – | `false` | 초안 여부 | dev 환경에서만 노출(m1) |
| `featured` | boolean | – | `false` | 주목 글 | 목록 상단 고정(m4) |
| `series` | string | – | — | 시리즈 식별자 | 시리즈 네비게이션(m2) |
| `updated` | string `YYYY-MM-DD` | – | — | 수정일 | 표시용 |
| `cover` | string(경로/URL) | – | 자동 생성 | OG 이미지 override | 동적 OG(m3) |

## 콘텐츠 타입 2 — 감상 항목 (Library Item)

- **위치:** `src/content/library/*.mdx` — 항목별 MDX
- **노출:** 책장(`/library`) 그리드
- **본문:** 선택 — 감상 기록을 자유 형식으로 쓴다(없으면 비움)
- **메타 수집:** 작성자는 `title`·`type`만 입력한다. 나머지 필드(ID·cover·치수·author·장르 등)는 **직접 작성하지 않으며**, 제목을 기준으로 자동 수집되어 frontmatter에 채워진다. 수집 방식은 구현 단계에서 정한다 — ADR-013 참조.

**수동 입력 필드**

| 필드 | 타입 | 필수 | 기본 | 설명 |
|------|------|:---:|------|------|
| `title` | string | ✓ | — | 작품명 — 검색(제목) · **메타 자동 수집의 검색어** |
| `type` | `book` \| `anime` | ✓ | — | 미디어 유형 · 카테고리 탭 · 검색 소스 결정 |
| `date` | string `YYYY-MM` | – | — | 감상 시점 · 정렬 |
| `rating` | number `0–5`(0.5 단위) | – | — | 별점(선택) |
| `featured` | boolean | – | `false` | 홈 하이라이트 노출 |
| `released` | boolean | – | `true` | 미출시 표시(`false` 시 "예정") |
| `id` | string \| number | – | — | 외부 소스 식별자(`type`별로 해석). 직접 적으면 제목 검색 대신 **정확 매칭 override** |

**자동 수집 필드** (직접 작성하지 않음 — 외부 소스의 캐시)

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string \| number | 제목 검색으로 해석된 외부 식별자 — frontmatter에 **기록**(검증·고정용) |
| `cover` | string(URL) | 표지/포스터 |
| `width` / `height` | number | 커버 치수(CLS 방지) |
| `author` | string | 저자/감독/원작자 |
| `genres` | string[] | 장르(anime) |
| `status` / `season` / `seasonYear` | string / number | 방영 메타(anime) |

> 제목 검색은 모호할 수 있다(동명 도서, 시즌 여러 개 애니). 최선 매칭으로 해석된 ID가 frontmatter에 기록되므로, 오매칭 시 작성자가 ID를 확인·수정하면 정확 매칭으로 고정된다.

> 자동 필드의 정본은 외부 소스이며, frontmatter에 캐시된다. 재실행으로 갱신한다(특히 anime `status`). 외부 소스·수집 방식 등 구현 결정은 ADR-013 참조.

## 콘텐츠 타입 3 — 메모 (Note)

- **위치:** `src/content/notes/*.mdx`
- **노출:** 메모(`/notes`) 카드 그리드

| 필드 | 타입 | 필수 | 기본 | 설명 | 연결 기능 |
|------|------|:---:|------|------|-----------|
| `date` | string `YYYY-MM-DD` | ✓ | — | 작성일 | **최신순 정렬(기본, 사용자 정렬 없음)** |
| `tags` | string[] | – | `[]` | 주제 태그(**영어 소문자**) | 필터 · 검색 |
| `pinned` | boolean | – | `false` | sticky 고정 | 고정/일반 카드 |

> 메모는 **제목이 없다** — 짧은 기록이라 본문이 곧 내용이다. 본문은 MDX이며 한 줄 메모·인용·코드 스니펫·이미지 등 자유 형식(체크리스트·to-do 제외)이다. 검색은 본문을 제외하므로(ADR-004) 태그를 대상으로 한다.

## 분류축 ↔ 필드 매핑

IA의 분류축이 어떤 필드로 구현되는지의 대조표.

| IA 분류축 | 필드 | 파생 화면 |
|-----------|------|-----------|
| 주제 태그 | `Article.tags` · `Note.tags` | 목록 필터 · 태그 페이지 · 메모 필터 · 연관 글 |
| 작성 시점 | `Article.date` | 연도 아카이브 · 정렬 |
| 미디어 유형 | `LibraryItem.type` | 책장 카테고리 탭 |
| 시리즈 | `Article.series` | 시리즈 네비게이션(연재 글 묶음·순서) |

> **연관 글**은 별도 분류축이 아니라 `tags` 겹침으로 **파생**되는 관계다(전용 필드 없음).

## 검증 규칙

- `slug`/파일명: 소문자 케밥케이스, 영문·숫자·하이픈만. 한글 금지.
- 날짜: 글·메모는 `YYYY-MM-DD`, 감상은 `YYYY-MM`. 파싱 실패 시 빌드 에러로 취급.
- `rating`: 0~5, 0.5 단위. 범위 밖이면 무시.
- 감상 항목: `title`·`type`이 메타 자동 수집의 검색 키다. `id` 미입력 시 제목으로 해석해 기록하며, 모호하면 오매칭될 수 있으니 해석된 `id`를 확인한다.
- `draft: true`: 프로덕션 빌드에서 목록·상세·아카이브·연관에서 모두 제외.
- 필수 필드 누락 시 빌드 실패(조용한 누락 방지).

## 예시

글 (`src/content/writing/my-first-post.mdx`):

```yaml
---
title: 첫 글
date: 2026-06-10
tags: [react, ux]
description: 짧은 요약 한 줄.
draft: false
featured: true
series: react-basics
---
```

감상 (`src/content/library/frieren.mdx`) — 수동 입력은 제목·유형뿐, 나머지는 자동 수집:

```mdx
---
title: 장송의 프리렌
type: anime
date: 2026-05
---

(선택) 감상 기록을 여기에 자유롭게 쓴다. 없으면 비워둔다.
```

> `id`(제목 검색으로 해석)·`cover`·`width`·`height`·`author`·`genres`·`status` 등은 자동 수집되어 frontmatter에 채워진다.

메모 (`src/content/notes/ssg-build-cache.mdx`):

```yaml
---
date: 2026-06-12
tags: [nextjs]
pinned: true
---
```

## 동기화 책임

콘텐츠 스키마가 바뀌면(필드 추가/삭제/의미 변경) `docs-manager`가 함께 점검한다:
이 문서 · `docs/information-architecture.md`(분류축 매핑) · 파싱/타입 정의(`src/` 구현) · 관련 로드맵 항목.
필드의 정본은 이 문서이며, 구현은 이 스키마를 따른다.

## 변경 이력

| 날짜 | 변경 내용 | 사유 |
|------|----------|------|
| 2026-06-15 | 초기 콘텐츠 모델 정의 (글·감상 항목) | IA 분류축을 frontmatter 스키마로 구체화 |
| 2026-06-17 | 메모(Note) 타입 추가 · 분류축에 시리즈 추가·연관 글 파생 명시 | IA 명칭 정렬 및 메모 기능 반영 |
