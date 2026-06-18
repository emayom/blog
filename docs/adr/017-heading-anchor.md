# 17. 헤딩 앵커(id) 생성 방식

Date: 2026-06-18

## Status

Accepted

## Context

M2 읽기 경험의 목차(TOC) 기능은 글 내 헤딩으로 이동하는 앵커 링크가 필요하다. 현재 MDX 파이프라인([src/lib/mdx-options.ts])에는 `rehype-pretty-code`만 등록되어 있고, 헤딩에 `id`를 부여하는 플러그인이 없다. TOC 항목 클릭 시 해당 헤딩으로 스크롤하려면 각 헤딩에 안정적인 `id`가 있어야 한다.

후보는 다음과 같다:

- **rehype-slug** — unified 생태계 표준 플러그인. 헤딩 텍스트를 기반으로 `github-slugger`를 사용해 `id`를 자동 생성한다. rehype-pretty-code와 동일하게 `rehypePlugins`에 등록만 하면 된다
- **커스텀 rehype 플러그인** — 외부 의존성 없이 직접 헤딩을 순회하며 `id`를 부여한다

## Decision

**`rehype-slug`** 를 채택한다.

헤딩 추출(TOC 데이터)은 기존 컨텐츠 처리 흐름에서 별도로 수행하되, 본문 렌더 시 헤딩 `id` 부여는 `rehype-slug`에 위임한다. 슬러그 규칙은 사실상 GitHub 표준(`github-slugger`)을 따르며, TOC 생성 측에서도 동일 규칙을 사용해 앵커 일치를 보장한다.

## Consequences

긍정적 결과:
- 슬러그 생성·중복 처리 로직을 직접 구현/유지보수할 필요가 없다 (`github-slugger` 위임)
- GitHub 마크다운과 동일한 슬러그 규칙이라 사용자 예측 가능성이 높다
- `rehypePlugins` 배열에 추가만 하면 되어 기존 파이프라인과 정합적이다

수용해야 할 결과:
- 외부 의존성이 1개 늘어난다 (번들이 아닌 빌드 타임 처리라 클라이언트 번들 영향은 없음)
- TOC 헤딩 추출 측과 `rehype-slug`의 슬러그 규칙이 어긋나면 앵커가 불일치하므로, 양측 모두 `github-slugger` 규칙을 사용하도록 맞춰야 한다
