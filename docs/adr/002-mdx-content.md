# 2. MDX 기반 콘텐츠 관리

Date: 2026-06-15

## Status

Accepted

## Context

블로그 글을 어떻게 저장하고 관리할지 결정해야 한다. 주요 후보는 다음과 같다:

- **MDX 파일 (로컬)** — 코드와 함께 git으로 관리
- **Headless CMS** (Contentful, Sanity 등) — 외부 서비스에서 콘텐츠 관리
- **데이터베이스** (Supabase 등) — DB에 글 저장
- **Markdown 파일** — MDX 대신 순수 Markdown

## Decision

**로컬 MDX 파일**(`src/content/blog/*.mdx`)을 채택한다.

## Consequences

긍정적 결과:
- 글과 코드가 같은 git 히스토리에서 관리되어 글 수정 이력이 commit으로 남는다
- CMS 서비스 장애, 요금 정책 변경, API 변경에 영향받지 않는다
- 순수 Markdown과 달리 글 안에 React 컴포넌트를 직접 삽입할 수 있어 인터랙티브한 예제 표현이 가능하다
- 익숙한 에디터에서 바로 작성하고 `npm run dev`로 즉시 미리볼 수 있다

수용해야 할 결과:
- 비개발자가 글을 작성하기 어렵다 (개인 블로그이므로 문제없음)
- 글이 수백 개를 넘으면 빌드 시간이 길어질 수 있다
- CMS에 비해 이미지 업로드, 예약 발행 등의 편의 기능이 없다
