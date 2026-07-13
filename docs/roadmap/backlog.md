# 백로그

우선순위가 정해지지 않은 기능 후보 목록.
마일스톤 계획 시 여기서 꺼내 배치한다.

## 기능 후보

- **MDX 이미지 라이트박스** — 본문 이미지 클릭 시 확대 뷰. 스크린샷 위주 글에서 유용하나 신규 기능 성격이라 M9(UX 폴리시) 범위 밖으로 분류
- **메모 검색 (메모 스코프 — 태그)** — M7에서 보류 이월 (#117). 현재 메모 규모에서 후순위, 규모 증가 시 재개

## 유지보수

- **ESLint 10 도입** — `eslint-config-next`(16.x)가 ESLint 10을 지원하면 `.github/dependabot.yml`의 `eslint` 메이저 `ignore`를 제거하고 업그레이드한다. (현재 `eslint-plugin-react`의 `context.getFilename()` 제거 비호환으로 lint 실패 → 보류)
