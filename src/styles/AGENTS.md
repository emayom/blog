# 디자인 토큰 가드레일

이 디렉토리는 디자인 토큰의 **단일 원천**이다. 체계 설명·계층 구조·카테고리·절차는 [docs/design-tokens.md](../../docs/design-tokens.md)가 정본이고, 여기는 작업 시 지켜야 할 규칙만 적는다.

1. **`tokens.css`·`tokens.groups.ts`는 생성물 — 직접 수정 금지.** 값은 `tokens/**/*.json` 원천을 고치고 `npm run tokens:build`로 재생성한다. 손으로 고친 변경은 다음 빌드에서 소실된다.

2. **새 토큰은 base → semantic 2단.** 원시값(hex·px)은 base(순수 스케일 — 역할명 금지, 색은 밝기 역순 번호), 역할명은 semantic에서 `{color.gray.900}`처럼 base 참조. base 팔레트는 CSS로 내보내지 않으므로(config 필터) 컴포넌트가 쓸 값은 반드시 semantic에 정의한다.

3. **semantic 이름은 Tailwind 네임스페이스를 따른다** — `--color-*` / `--spacing-*` / `--radius-*` / `--text-*` / `--font-*`. 토큰 path가 그대로 유틸리티 클래스명이 되므로 벗어나면 유틸리티가 생성되지 않는다.

4. **색과 타이포 semantic 토큰 이름은 서로 충돌 금지** — 색(`--color-*`)과 타이포(`--text-*`)는 Tailwind `text-*` 유틸리티 네임스페이스를 공유한다. 같은 이름이면 색 유틸이 우선해 타이포가 유실된다. 색 토큰에 `body`·`caption` 같은 타이포 이름을 쓰지 않는다.

5. **전경색은 `fg` 계열** (`fg`/`fg-muted`/`fg-subtle`).

6. **텍스트 스타일은 DTCG typography composite** (`tokens/typography/text-styles.json`, 4축). fontFamily는 composite에 넣지 않는다. `--font-sans`·`--font-mono`는 next/font 런타임 변수라 토큰화 불가 — globals.css `@theme inline` 소관.

7. **다크모드는 `$extensions.dark`로만.** 팔레트 라이트/다크 이중 정의 금지 — 다크 대응의 기본은 컴포넌트의 `dark:` 유틸리티.

## 삭제 예약 (컴포넌트 마이그레이션 시 처리)

- `text.md` — `text.body`와 값 중복. 크기 전용 토큰이라 `leading`·`tracking`을 손으로 덧붙이게 만든다. `text-md` 사용처를 composite 토큰으로 옮길 때 함께 삭제
