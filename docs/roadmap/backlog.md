# 백로그

우선순위가 정해지지 않은 기능 후보 목록.
마일스톤 계획 시 여기서 꺼내 배치한다.

## 유지보수

- **ESLint 10 도입** — `eslint-config-next`(16.x)가 ESLint 10을 지원하면 `.github/dependabot.yml`의 `eslint` 메이저 `ignore`를 제거하고 업그레이드한다. (현재 `eslint-plugin-react`의 `context.getFilename()` 제거 비호환으로 lint 실패 → 보류)
