# ADR-006: @stylistic/eslint-plugin으로 코드 스타일 관리

- **상태:** Accepted
- **날짜:** 2026-06-15

## 맥락

코드 포맷팅 도구로 Prettier 대신 `@stylistic/eslint-plugin`을 사용한다.

ESLint는 v8에서 코어에 포함된 포맷팅 룰(indent, quotes, semi 등)을 deprecated 처리했다.
`@stylistic/eslint-plugin`은 이 룰들을 이관받아 유지하는 공식 후속 프로젝트다.

## 결정

`@stylistic/eslint-plugin`을 채택한다. Prettier는 사용하지 않는다.

## 근거

- **툴체인 단일화** — ESLint 하나로 lint + 포맷팅을 모두 처리. Prettier와의 룰 충돌(eslint-config-prettier) 불필요
- **pre-commit 단순화** — `npm run lint` 한 명령으로 스타일 위반까지 커버
- **AST 기반 포맷팅** — Prettier의 "opinionated" 방식보다 룰 단위 제어 가능

## 결과

- `eslint.config.mjs`에 `@stylistic/eslint-plugin` 설정 추가
- `npm run lint:fix`로 자동 수정 가능
- pre-commit(husky + lint-staged)에서 `eslint --fix` 실행 시 포맷팅까지 적용
