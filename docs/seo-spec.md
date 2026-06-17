# SEO · 메타데이터 스펙

- **상태:** Draft
- **날짜:** 2026-06-15
- **참조:** `docs/roadmap/m3-discovery-seo.md`, `docs/content-model.md`, `docs/information-architecture.md`

검색 노출과 공유 미리보기를 위한 메타데이터 규칙. 페이지 메타·동적 OG·사이트맵·공유의 기준을 잡는다.
메타값은 가능한 한 frontmatter에서 파생하고, 누락 시 폴백 규칙을 따른다.

## 공통 토큰

값은 `src/config/site.ts`(`siteConfig`)가 정본이다. 이 표는 토큰 ↔ 필드 ↔ 용도 매핑만 정의한다(값을 복제하지 않는다).

| 토큰 | 정본 | 용도 |
|------|------|------|
| `{siteName}` | `siteConfig.name` | `og:site_name`, 타이틀 접미 |
| `{baseUrl}` | `siteConfig.url` | canonical·OG·sitemap 절대경로 |
| `{locale}` | `siteConfig.locale` | `og:locale`, `<html lang>` |
| `{siteDescription}` | `siteConfig.description` | 홈 description 폴백 |
| `{defaultOg}` | `/profile.jpg` (1200×630, 에셋) | OG 폴백 이미지 |

## 페이지별 타이틀 · description

타이틀 패턴: `<페이지 라벨> | {siteName}` (홈은 `{siteName}` 단독).

| 화면 | 라우트 | `<title>` | description |
|------|--------|-----------|-------------|
| 진입 | `/` | `{siteName}` | `{siteDescription}` |
| 탐색(목록) | `/writing` | `배운 것들 | {siteName}` | 목록 소개(정적) |
| 소비(글) | `/writing/[slug]` | `{글 제목} | {siteName}` | `description` → 없으면 본문 발췌 ~150자 |
| 태그 | `/tag/[tag]` | `#{tag} | {siteName}` | `'{tag}' 태그 글 모음`(정적) |
| 아카이브 | `/archive/[year]` | `{year} 아카이브 | {siteName}` | `{year}년에 쓴 글`(정적) |
| 메모 | `/notes` | `남긴 것들 | {siteName}` | 짧은 기록 모음(정적) |
| 감상 | `/library` | `본 것들 | {siteName}` | 책장 소개(정적) |
| 저자 | `/about` | `{이름} | {siteName}` | 한 줄 소개 |

규칙: description은 70~160자 권장, 페이지마다 고유하게. 중복 금지.

## Canonical · 기본 메타

- 모든 페이지에 자기 참조 canonical: `{baseUrl}` + 경로(쿼리·후행 슬래시 제외).
- `robots`: 기본 `index,follow`. `draft`는 프로덕션 빌드에서 제외되므로 별도 noindex 불필요.
- 페이지네이션은 현재 미도입(ADR-012). 도입 시 2쪽 이상은 canonical을 자기 페이지로 두되 1쪽은 베이스 경로를 canonical로 한다.

## Open Graph · Twitter Card

| 속성 | 값 |
|------|-----|
| `og:type` | 글=`article`, 그 외=`website` |
| `og:title` / `og:description` | `<title>`·description과 동일 |
| `og:url` | canonical |
| `og:site_name` | `{siteName}` |
| `og:locale` | `{locale}` |
| `og:image` | 글=동적 OG(아래) / 그 외=`{defaultOg}` |
| `article:published_time` | 글 `date` |
| `article:modified_time` | 글 `updated`(있으면) |
| `article:tag` | 글 `tags[]` |
| `twitter:card` | `summary_large_image` |
| `twitter:title/description/image` | OG와 동일 |

## 동적 OG 이미지 (글)

- 경로: `/writing/[slug]/opengraph-image` (Route Handler, 1200×630).
- 구성: 글 `title` + `date` + `{siteName}`. 폰트·색은 `DESIGN.md` 토큰.
- frontmatter `cover`가 있으면 그것으로 override.
- 사이트 페이지(홈·목록·소개 등)는 `{defaultOg}` 사용.

## 구조화 데이터 (JSON-LD)

| 페이지 | 타입 | 핵심 필드 |
|--------|------|-----------|
| 전체(루트) | `WebSite` | `name`, `url` |
| 글 | `BlogPosting` | `headline`(title), `datePublished`(date), `dateModified`(updated), `author`(Person), `keywords`(tags), `image`(OG) |
| 저자 | `Person` | `name`, `url`, `sameAs`(GitHub·LinkedIn) |
| 태그·아카이브 | `BreadcrumbList` | Home → Tag / Home → Archive (2단계). 글 상세는 breadcrumb 미사용 |

> - `BreadcrumbList`는 **구조화 데이터 한정**(SERP 표시용)이다. 시각적 브레드크럼 UI는 두지 않는다(IA 전역 정책).
> - `SearchAction`은 검색 결과 URL이 필요하나, 검색이 클라이언트 모달(섹션 한정)이라 해당 URL이 없어 **제외**한다.

## 사이트맵 · robots

- `sitemap.xml`(`{baseUrl}/sitemap.xml`): 발행 글 + 태그 + 아카이브 + 정적 페이지(홈·목록·메모·책장·소개). `draft` 제외. `lastmod`=`updated`||`date`.
- `robots.txt`: 전체 허용 + `Sitemap:` 라인. (드래프트는 빌드 제외라 노출 안 됨)

## 점검 (구현 시)

- [ ] 페이지마다 고유 title·description
- [ ] canonical 절대경로, 자기 참조
- [ ] OG/Twitter 미리보기 실측(공유 디버거)
- [ ] 글 JSON-LD가 Rich Results 테스트 통과
- [ ] sitemap에 draft 미포함, 404·리다이렉트 경로 미포함
- [ ] 시맨틱 헤딩(접근성 체크리스트 1장과 공유) — SEO·a11y 공통

## 성능 목표 (Core Web Vitals)

| 지표 | 목표 | 주요 수단 |
|------|------|-----------|
| LCP | < 2.5s | SSG, `next/image`, `next/font` |
| CLS | < 0.1 | 이미지 크기 명시, 폰트 `display: swap` |
| INP | < 200ms | 클라이언트 컴포넌트 최소화, 인터랙션 경량화 |
| 번들 크기 | 최소화 | dynamic import, tree-shaking, Server Component 우선 |

측정: Vercel Analytics 또는 Lighthouse CI. 배포 후 [PageSpeed Insights](https://pagespeed.web.dev/)로 실측 확인.

## 동기화 책임

라우트·frontmatter 스키마가 바뀌면 이 스펙의 타이틀 표·JSON-LD 매핑을 함께 갱신한다(담당 `docs-manager`).
`{siteName}`·`{baseUrl}` 등 사이트 상수는 `src/config/site.ts`가 정본이며, 위 토큰 표는 필드 매핑만 정의한다(값을 복제하지 않는다).

## 변경 이력

| 날짜 | 변경 내용 | 사유 |
|------|----------|------|
| 2026-06-15 | SEO·메타데이터 스펙 초기 정의 | m3 구현 기준 수립 |
| 2026-06-15 | 성능 목표(Core Web Vitals) 섹션 추가 | TRD 대체 — LCP/CLS/INP 목표치 명시 |
