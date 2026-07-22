# Disallow utility classes that bypass design tokens (`design/no-untokenized-classname`)

🔧 이 룰은 `--fix` 옵션으로 자동 수정할 수 있다. (일부 — [Autofix Limitations](#autofix-limitations) 참조)

디자인 토큰을 쓰는 프로젝트에서 색·타이포·radius 값의 단일 원천은 토큰이다. 컴포넌트가 Tailwind 기본 팔레트나 임의값을 직접 쓰면 그 규약이 조용히 깨진다. 이 룰은 그 우회를 코드 리뷰가 아니라 lint에서 막는다.

## Rule Details

이 룰이 **잡는** 코드의 예:

```tsx
<div className="bg-neutral-200 dark:bg-neutral-700" />
<h1 className="text-[34px] tracking-[-0.374px] leading-[1.1]" />
<div className="rounded-[14px]" />
<span className="text-ink dark:border-ink-muted-80" />

cva('base', { variants: { tone: { muted: 'text-ink' } } })
expect(el).toHaveClass('text-ink')
```

이 룰이 **잡지 않는** 코드의 예:

```tsx
<div className="bg-canvas text-fg rounded-lg" />
<h1 className="text-display-md" />

{/* 대응 토큰이 없는 임의값은 정당하다 */}
<div className="max-w-[40ch] min-h-[150px] rotate-[9deg]" />
<div className="translate-x-[calc(-50%_-_var(--spacing)*2.4)]" />
<div className="text-[color-mix(in_srgb,var(--color-primary),white_22%)]" />

{/* 클래스 문자열이 아닌 곳 */}
const label = 'text-[13px]'
```

> 예제의 `text-fg`·`rounded-lg`·`ink` 같은 이름은 소비하는 프로젝트의 토큰 이름이다. 실제 금지·치환 목록은 그 프로젝트의 토큰 원천에서 파생된다.

### Disallowed Patterns

| 대상 | 예 | 이유 |
|------|-----|------|
| Tailwind 기본 팔레트 | `bg-neutral-200` | semantic 색 토큰을 써야 한다 |
| font-size 임의값 | `text-[13px]` | 타이포 토큰이 담당하는 축 |
| tracking·leading 임의값 | `tracking-[-0.374px]` `leading-[1.47]` | 타이포 composite 토큰이 이미 함께 갖고 있는 축 |
| radius 임의값 | `rounded-[14px]` | radius 토큰이 담당하는 축 |
| deprecated 토큰 | 개명 맵에 등록된 이름 | 새 이름으로 옮겨야 한다 |

토큰 축에 해당하면서 **순수 치수값이거나 기본 팔레트일 때만** 잡는다. `calc()`·`color-mix()`·`40ch`·`9deg`처럼 대응 토큰이 없는 값은 정당하므로 건드리지 않는다.

### Where It Looks

| 위치 | 예 |
|------|-----|
| 클래스 prop | `className` · `activeClassName` 등 `*ClassName` |
| 클래스 헬퍼 인자 | `cn(…)` `clsx(…)` `twMerge(…)` |
| CVA 정의 | `cva(base, { variants: { … } })` — 중첩 객체·배열 내부까지 |
| 클래스 상수 | `const labelClass = '…'` 등 `*Class`·`*ClassName` 변수 |
| 테스트 단언 | `expect(el).toHaveClass(…)` |

`className` 속성만 보면 놓치는 자리가 많다 — 프리미티브의 클래스는 대부분 `cva()` 안에 있고, 반복되는 클래스는 모듈 상수로 빠지며, 테스트는 클래스명을 문자열로 단언한다. 특히 상수와 테스트가 빠지면 개명 autofix가 일부만 바꾸고 나머지를 조용히 남긴다.

변수는 이름으로 판별하므로 클래스 문자열을 담는 변수는 `*Class`·`*ClassName`으로 명명한다.

## How to Fix

**대응 토큰이 있으면 autofix가 처리한다** — `eslint <파일> --fix`.

```
rounded-[18px]              → rounded-lg
text-ink                    → text-fg
dark:border-ink-muted-80/50 → dark:border-fg-muted/50   (variant·투명도 보존)
```

**없으면 수동이다.** 특히 타이포는 `text-[13px] tracking-[-0.374px] leading-[1.47]` 세 축을 손으로 조합하는 대신 composite 토큰 하나로 바꾼다. 맞는 토큰이 없으면 **토큰을 먼저 정의한다** — 임의값으로 우회하지 않는다.

### Autofix Limitations

템플릿 리터럴에서 **보간에 맞닿은 토큰은 고치지 않는다.**

```ts
cn(`text-ink rounded-[18px]${suffix}`)
//  ^^^^^^^^ 고침          ^^^^^^^^^^^^^^ 안 고침 — 클래스의 일부만 보고 있을 수 있다
```

`bg-ink-muted-${level}` 같은 동적 조합을 잘못 자르지 않기 위한 의도적 제한이다. 이런 자리는 경고만 나가고 수동으로 판단한다.

## Options

옵션 없음. 금지·치환 목록은 토큰 원천에서 파생되므로, 룰 설정이 아니라 토큰 정의를 고쳐 바꾼다.

## When Not To Use It

토큰 규약을 적용하지 않는 영역에서는 끈다 — 와이어프레임·프로토타입, 외부에서 들여온 템플릿 등. 파일 단위 제외는 ESLint 설정의 `ignores`로 처리한다.

개별 예외는 이유와 함께 억제한다.

```tsx
{/* eslint-disable-next-line design/no-untokenized-classname -- 외부 위젯이 요구하는 고정 치수 */}
<div className="text-[13px]" />
```

이유 없는 억제는 리뷰에서 반려한다 — 억제가 늘면 룰이 무의미해진다.
