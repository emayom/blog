import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Text } from './text'

describe('Text', () => {
  it('기본: <p>로 렌더하고 body composite 토큰을 갖는다', () => {
    render(<Text>본문</Text>)
    const el = screen.getByText('본문')
    expect(el.tagName).toBe('P')
    expect(el).toHaveClass('text-body-lg')
  })

  it.each([
    ['body-lg', 'text-body-lg'],
    ['body-md', 'text-body-md'],
    ['label-md', 'text-label-md'],
    ['label-sm', 'text-label-sm'],
  ] as const)('variant %s를 매핑한다', (variant, expected) => {
    render(<Text variant={variant}>{variant}</Text>)
    expect(screen.getByText(variant)).toHaveClass(expected)
  })

  it.each([
    ['light', 'font-light'],
    ['normal', 'font-normal'],
    ['bold', 'font-bold'],
  ] as const)('weight %s를 오버레이한다', (weight, expected) => {
    render(<Text variant="label-md" weight={weight}>{weight}</Text>)
    expect(screen.getByText(weight).className).toContain(expected)
  })

  // composite 토큰은 font-weight를 `var(--tw-font-weight, …)`로 내보내므로 weight 유틸이 함께 남아도
  // 결과가 어긋나지 않는다 (strong 토큰의 weight와 semibold가 같은 값). 검증 대상은 composite 스냅 여부다.
  it('compound: body-lg×semibold는 title-md로 스냅하고 기본 body-lg는 남지 않는다', () => {
    render(<Text weight="semibold">강조</Text>)
    const classes = screen.getByText('강조').className.split(/\s+/)
    expect(classes).toContain('text-title-md')
    // twMerge가 같은 font-size 축으로 인식해 기본 body-lg를 걷어낸다
    expect(classes).not.toContain('text-body-lg')
  })

  it('compound: label-md×semibold는 title-sm으로 스냅한다', () => {
    render(<Text variant="label-md" weight="semibold">메타</Text>)
    const classes = screen.getByText('메타').className.split(/\s+/)
    expect(classes).toContain('text-title-sm')
    expect(classes).not.toContain('text-label-md')
  })

  it.each(['span', 'figcaption'] as const)('as="%s"로 태그를 바꾼다', (tag) => {
    render(<Text as={tag}>{tag}</Text>)
    expect(screen.getByText(tag).tagName).toBe(tag.toUpperCase())
  })

  it('className 병합: leading 오버라이드가 우선한다', () => {
    render(<Text variant="label-md" className="leading-loose text-fg-muted">오버라이드</Text>)
    const cls = screen.getByText('오버라이드').className
    // text-caption composite의 line-height는 twMerge가 인식 못하는 composite이므로 leading 유틸은 그대로 뒤에 남아 우선한다
    expect(cls).toContain('leading-loose')
    expect(cls).toContain('text-fg-muted')
    // className이 마지막에 병합되어 순서상 뒤에 위치한다
    expect(cls.indexOf('leading-loose')).toBeGreaterThan(cls.indexOf('text-caption'))
  })

  it('HTML 속성을 전달한다', () => {
    render(<Text data-testid="t" id="passthrough" aria-label="라벨">속성</Text>)
    const el = screen.getByTestId('t')
    expect(el.id).toBe('passthrough')
    expect(el.getAttribute('aria-label')).toBe('라벨')
  })
})
