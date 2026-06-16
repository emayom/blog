# 1. 블로그 프레임워크 선택

Date: 2026-06-15

## Status

Accepted

## Context

블로그를 구축할 프레임워크를 선택해야 한다. 주요 후보는 다음과 같다:

- **Next.js (App Router)** — React 기반 풀스택 프레임워크, 정적 생성(SSG) 지원
- **Next.js (Pages Router)** — 구버전 라우팅 방식
- **Astro** — 콘텐츠 중심 사이트에 특화된 프레임워크
- **Gatsby** — React 기반 정적 사이트 생성기

블로그는 콘텐츠가 빌드 시 고정되므로 정적 생성이 유리하고, MDX 렌더링과 동적 OG 이미지 생성 등 일부 서버 기능도 필요하다.

## Decision

**Next.js 16 (App Router)** 를 채택한다.

## Consequences

긍정적 결과:
- 기존 React 경험을 그대로 활용할 수 있고 컴포넌트 재사용이 용이하다
- `generateStaticParams`로 글 페이지를 빌드 타임에 정적 생성하면서, Route Handler로 OG 이미지 동적 생성 등 서버 기능도 함께 사용할 수 있다
- Server Component로 데이터 페칭을 서버에서 처리하여 클라이언트 번들 크기를 줄일 수 있다

수용해야 할 결과:
- Astro에 비해 콘텐츠 사이트 특화 기능(Content Collections 등)이 부족하다
- App Router는 Pages Router보다 학습 곡선이 있다
- Next.js 16은 비교적 최신 버전으로 학습 데이터와 다른 breaking change가 있을 수 있다 — 공식 문서를 반드시 참조한다
