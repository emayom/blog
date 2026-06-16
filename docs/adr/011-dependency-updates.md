# 11. 의존성 업데이트 전략

Date: 2026-06-16

## Status

Accepted

## Context

Dependabot으로 의존성 업데이트를 자동화하면서, 모든 패키지를 단일 그룹으로 묶는 설정을 사용했다.

```yaml
groups:
  all-dependencies:
    patterns:
      - "*"
```

이 방식은 하나의 PR에 **사소한 패치와 파괴적 메이저 업그레이드가 함께 섞이는** 문제를 일으켰다. 실제로 최초 npm 업데이트 PR에는 다음이 한 묶음으로 들어왔다:

| 안전 (patch·minor) | 위험 (major — 파괴적 변경) |
|------|------|
| react 19.2.4 → 19.2.7 | typescript ^5 → ^6 |
| @playwright/test 1.60 → 1.61 | eslint ^9 → ^10 |
| @storybook/* 10.4.4 → 10.4.5 | @types/node ^24 → ^25 |

이렇게 묶이면:

- 안전한 패치만 받고 싶어도 메이저까지 함께 들어와 **부분 머지가 불가능**하다
- 메이저는 `lint`·`tsc` 단계를 깨뜨릴 수 있어 검토 부담이 크지만, 패치와 섞여 PR 단위 판단이 어렵다
- 결국 매 PR마다 "이걸 어떻게 처리하지" 상황이 반복된다

## Decision

**semver 레벨로 그룹을 분리**한다. minor·patch는 한 묶음으로 묶고, major는 그룹에서 제외해 각각 개별 PR로 떨어지게 한다.

```yaml
groups:
  minor-and-patch:
    patterns:
      - "*"
    update-types:
      - "minor"
      - "patch"
```

`update-types`에 major가 없으므로, 메이저 업데이트는 그룹 조건에 맞지 않아 Dependabot이 자동으로 개별 PR을 생성한다.

- 적용 대상: `npm`, `github-actions` 양쪽 생태계
- 주기: `monthly` 유지
- `open-pull-requests-limit: 10` — 분리된 메이저 PR이 한도에 막혀 누락되지 않도록 상향

## Consequences

긍정적 결과:

- 대부분의 PR이 minor·patch 안전 묶음이 되어 가볍게 검토 후 머지할 수 있다
- TypeScript·ESLint 같은 메이저는 독립 PR로 분리되어, 영향 범위를 격리해 신중히 검토·대응할 수 있다
- 메이저를 무시(`ignore`)하지 않으므로 새 메이저 릴리스를 놓치지 않는다

수용해야 할 결과:

- 메이저가 여러 개 나오는 달에는 개별 PR 수가 늘어난다. monthly 주기와 검토 한도(10)로 관리한다
- 메이저 PR은 코드·설정 수정이 동반될 수 있어 자동 머지 대상이 아니며, 사람이 직접 처리한다 (HITL)
