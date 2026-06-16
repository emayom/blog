# 6. 코드 포맷팅 도구

Date: 2026-06-15

## Status

Accepted

## Context

코드 포맷팅 도구를 선택해야 한다. 주요 후보는 다음과 같다:

- **Prettier** — 독립적인 코드 포매터. ESLint와 병행 사용 시 룰 충돌을 `eslint-config-prettier`로 해소해야 한다
- **@stylistic/eslint-plugin** — ESLint v8에서 deprecated된 포맷팅 룰(indent, quotes, semi 등)을 이관받아 유지하는 공식 후속 프로젝트

## Decision

**`@stylistic/eslint-plugin`** 을 채택한다. Prettier는 사용하지 않는다.

## Consequences

긍정적 결과:
- ESLint 하나로 lint + 포맷팅을 모두 처리하여 툴체인이 단순해진다
- Prettier와의 룰 충돌(`eslint-config-prettier`) 설정이 불필요하다
- `npm run lint` 한 명령으로 스타일 위반까지 커버된다
- `npm run lint:fix`로 자동 수정 가능하고, pre-commit(husky + lint-staged)에서 포맷팅까지 함께 적용된다

수용해야 할 결과:
- Prettier에 비해 포맷팅 룰을 개별적으로 설정해야 하므로 초기 설정 비용이 있다
- Prettier의 "opinionated" 방식에 익숙한 경우 룰 단위 제어가 낯설 수 있다
