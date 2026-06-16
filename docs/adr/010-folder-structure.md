# 10. 폴더 구조

Date: 2026-06-16

## Status

Accepted

## Context

폴더 스캐폴딩에 앞서 프로젝트 폴더 구조 방식을 결정해야 한다. 주요 후보는 다음과 같다:

**Feature-Sliced Design (FSD)**
계층(Layer) → 슬라이스(Slice) → 세그먼트(Segment) 3단계로 코드를 구성하는 프론트엔드 아키텍처 방법론이다.

```
src/
├── app/        # 라우팅, 전역 설정, Provider
├── pages/      # 라우트 단위 화면
├── widgets/    # 독립적으로 동작하는 UI 블록
├── features/   # 비즈니스 가치를 제공하는 재사용 기능
├── entities/   # 비즈니스 엔티티 (Post, Tag 등)
└── shared/     # 공용 유틸, 공용 UI
```

상위 레이어가 하위 레이어만 참조할 수 있다는 단방향 의존성 규칙이 핵심이다.

**관습적 구조 (Conventional)**
역할 기반으로 폴더를 구분하는 방식으로 Next.js 공식 예시와 대부분의 블로그 레퍼런스가 따르는 구조다.

```
src/
├── app/        # Next.js App Router (라우팅)
├── components/ # 공용 컴포넌트
├── lib/        # 유틸리티, 헬퍼
├── types/      # TypeScript 타입 정의
└── content/    # MDX 콘텐츠
```

**FSD 적용 시 이 프로젝트에서의 구체적 충돌 지점:**

| 항목 | 문제 |
|------|------|
| 블로그 도메인 규모 | Post, Tag 수준의 엔티티가 전부로, FSD의 entities·features 레이어 분리 효과가 크지 않음 |
| Next.js App Router | `src/app/`이 FSD의 `app` 레이어와 이름이 같지만 역할이 다름. FSD `pages` 레이어와 Next.js `src/app/` 라우팅이 이중 구조를 형성 |

## Decision

**관습적 구조**를 채택한다.

```
src/
├── app/            # Next.js App Router
├── components/     # 공용 컴포넌트 (ui/, layout/, mdx/ 등 하위 분류)
├── lib/            # 유틸리티, MDX 파싱 헬퍼
├── types/          # TypeScript 타입 정의
├── styles/         # globals.css, 디자인 토큰
└── content/
    ├── writing/    # 블로그 글 MDX
    └── shelf/      # 감상 기록 MDX
```

## Consequences

긍정적 결과:
- Next.js App Router 공식 문서·예시와 구조가 일치하여 레퍼런스 그대로 적용 가능하다
- 블로그 수준의 도메인에서는 관습적 구조로 충분하며, FSD의 레이어 분리가 오히려 과설계가 된다

수용해야 할 결과:
- 프로젝트 규모가 커질 경우 `components/`가 비대해질 수 있다. 이 경우 하위 디렉토리 분류(ui, layout, mdx 등)로 완화한다
- FSD가 제공하는 레이어 간 의존성 규칙 강제가 없으므로, 컴포넌트 간 결합도 관리는 코드 리뷰와 관행에 의존한다
