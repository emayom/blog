import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Text } from './text'

describe('Text', () => {
  it('기본: <p>로 렌더하고 body 4축 클래스를 갖는다', () => {
    render(<Text>본문</Text>)
    const el = screen.getByText('본문')
    expect(el.tagName).toBe('P')
    const cls = el.className
    expect(cls).toContain('text-(length:--text-body)')
    expect(cls).toContain('leading-(--text-body--line-height)')
    expect(cls).toContain('tracking-(--text-body--letter-spacing)')
    expect(cls).toContain('font-(--text-body--font-weight)')
  })

  it.each([
    ['body', 'text-(length:--text-body)'],
    ['caption', 'text-caption'],
    ['fine-print', 'text-fine-print'],
  ] as const)('variant %s를 매핑한다', (variant, expected) => {
    render(<Text variant={variant}>{variant}</Text>)
    expect(screen.getByText(variant).className).toContain(expected)
  })

  it.each([
    ['light', 'font-light'],
    ['normal', 'font-normal'],
    ['bold', 'font-bold'],
  ] as const)('weight %s를 오버레이한다', (weight, expected) => {
    render(<Text variant="caption" weight={weight}>{weight}</Text>)
    expect(screen.getByText(weight).className).toContain(expected)
  })

  it('compound: body×semibold는 body-strong 변수 클래스로 스냅하고 body 기본 4축과 섞이지 않는다', () => {
    render(<Text weight="semibold">강조</Text>)
    const cls = screen.getByText('강조').className
    expect(cls).toContain('text-(length:--text-body-strong)')
    expect(cls).toContain('leading-(--text-body-strong--line-height)')
    expect(cls).toContain('tracking-(--text-body-strong--letter-spacing)')
    expect(cls).toContain('font-(--text-body-strong--font-weight)')
    // 변수 shorthand는 서로 다른 arbitrary 값이라 twMerge가 병합하지 못한다 → 기본 body 4축이 남으면 안 됨을 명시적으로 고정
    expect(cls).not.toContain('text-(length:--text-body)')
    expect(cls).not.toContain('leading-(--text-body--line-height)')
    expect(cls).not.toContain('tracking-(--text-body--letter-spacing)')
    expect(cls).not.toContain('font-(--text-body--font-weight)')
    // weight 오버레이(font-semibold)는 compound가 대신하므로 잔존하지 않는다
    expect(cls).not.toContain('font-semibold')
  })

  it('compound: caption×semibold는 caption-strong 변수 클래스로 스냅한다', () => {
    render(<Text variant="caption" weight="semibold">메타</Text>)
    const cls = screen.getByText('메타').className
    expect(cls).toContain('text-(length:--text-caption-strong)')
    expect(cls).toContain('leading-(--text-caption-strong--line-height)')
    expect(cls).toContain('tracking-(--text-caption-strong--letter-spacing)')
    expect(cls).toContain('font-(--text-caption-strong--font-weight)')
    expect(cls).not.toBe('text-caption')
    expect(cls).not.toContain('font-semibold')
  })

  it.each(['span', 'figcaption'] as const)('as="%s"로 태그를 바꾼다', (tag) => {
    render(<Text as={tag}>{tag}</Text>)
    expect(screen.getByText(tag).tagName).toBe(tag.toUpperCase())
  })

  it('className 병합: leading 오버라이드가 우선한다', () => {
    render(<Text variant="caption" className="leading-loose text-fg-muted">오버라이드</Text>)
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
