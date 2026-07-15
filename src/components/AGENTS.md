# 컴포넌트 구조 가드레일

## 디렉토리 배치

- **`ui/`** — 도메인 무관 공통 프리미티브만. 기준: **두 개 이상의 도메인에서 쓰이(거나 쓰일 수 있)고, 도메인 지식이 없는 컴포넌트** (Badge·Breadcrumb·BackLink·EmptyState 등)
- **`{도메인}/`** (writing·notes·library·…) — 해당 도메인 전용 컴포넌트
- **`icons/`** — 모든 아이콘. 컴포넌트 파일 안에 로컬 아이콘 정의 금지 (`{ size?, className? }` props + 배럴 export 관례)
- **`layout/`·`mdx/`** — 전역 셸·MDX 렌더 전용

## 공통 컴포넌트 디렉토리 컨벤션

신규 공통 컴포넌트는 **디렉토리 단위**로 만든다 (kebab-case — 파일명 규칙 유지):

```
src/components/ui/badge/
├── badge.tsx        # 구현
├── badge.test.tsx   # 단위 테스트 (동거)
└── index.ts         # 공개 re-export — import 경로는 '@/components/ui/badge' 유지
```

- **단위 테스트는 컴포넌트 디렉토리에 동거** — 이동·삭제가 원자적이고 영향 범위가 한눈에 보인다
- 여러 모듈을 가로지르는 **통합 테스트는 `src/__tests__/` 유지**, 사용자 플로우는 `e2e/`
- `index.ts`는 외부에 공개할 API만 export — 내부 helper는 구현 파일 안에 숨긴다
- 기존 단일 파일 컴포넌트(breadcrumb·back-link·empty-state 등)의 마이그레이션은 별도 이슈로 진행 — 새 컴포넌트부터 이 구조를 적용한다
