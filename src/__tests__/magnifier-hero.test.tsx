import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MagnifierHero, parseRgb } from '@/components/home/magnifier-hero'

describe('parseRgb', () => {
  it('rgb 문자열을 [r, g, b]로 파싱한다', () => {
    expect(parseRgb('rgb(245, 245, 247)')).toEqual([245, 245, 247])
  })

  it('rgba의 앞 3개 채널을 취한다', () => {
    expect(parseRgb('rgba(29, 29, 31, 0.8)')).toEqual([29, 29, 31])
  })

  it('파싱 실패 시 흰색으로 폴백한다', () => {
    expect(parseRgb('transparent')).toEqual([255, 255, 255])
    expect(parseRgb('')).toEqual([255, 255, 255])
  })
})

describe('MagnifierHero', () => {
  it('글귀를 스크린리더용 텍스트로 노출한다', () => {
    // canvas 2d 컨텍스트 미지원 환경(jsdom)에서도 렌더 자체는 통과해야 한다
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
    render(<MagnifierHero body="검은 티티새가 담장 위에 앉아 있다." />)
    expect(screen.getByText('검은 티티새가 담장 위에 앉아 있다.')).toBeInTheDocument()
    vi.restoreAllMocks()
  })
})
