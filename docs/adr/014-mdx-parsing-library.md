# 14. MDX 파싱 라이브러리 선택

Date: 2026-06-18

## Status

Accepted

## Context

`src/content/writing/*.mdx` 로컬 파일(ADR-002)을 블로그 글로 렌더링하는 라이브러리를 선택해야 한다. 주요 후보는 다음과 같다:

- **`@next/mdx`** — Next.js 공식 패키지. MDX 파일을 페이지 컴포넌트로 직접 사용하거나 import해서 렌더링. App Router와 통합 방식이 파일 기반 라우팅에 최적화되어 있다.
- **`next-mdx-remote`** — Hashicorp가 관리하는 커뮤니티 패키지. `compileMDX` API로 MDX 문자열을 받아 frontmatter와 컨텐츠를 동시에 반환. `next-mdx-remote/rsc` export가 React Server Component를 명시적으로 지원한다.

결정에 영향을 준 조건:
- 글 목록은 `fs.readdirSync`로 `src/content/writing/`을 순회해서 생성한다
- 각 파일에서 `title`, `date`, `tags`, `draft`, `description`, `thumbnail` frontmatter를 파싱해야 한다
- 신택스 하이라이팅은 `rehype-pretty-code`(Shiki 기반) rehype 플러그인으로 처리한다

## Decision

**`next-mdx-remote`** 를 채택한다.

## Consequences

긍정적 결과:
- `compileMDX(source, { parseFrontmatter: true })` 한 번 호출로 frontmatter와 렌더링 컴포넌트를 동시에 반환 — `gray-matter` 별도 설치 불필요
- `next-mdx-remote/rsc`가 React Server Component에 최적화되어 있어 App Router 환경과 자연스럽게 맞는다
- `mdxOptions.rehypePlugins`에 `rehype-pretty-code`를 직접 연결할 수 있어 플러그인 체인 구성이 단순하다
- 파일 읽기 → `compileMDX` → 렌더링 흐름이 직관적이고 타입 파라미터로 frontmatter 타입을 명시할 수 있다

수용해야 할 결과:
- Next.js 공식 패키지가 아닌 커뮤니티 패키지(Hashicorp 관리)다
- `@next/mdx`에 비해 MDX 파일을 페이지 컴포넌트로 직접 import하는 패턴은 사용하기 어렵다 (이 프로젝트에서는 해당 패턴을 사용하지 않으므로 문제없음)