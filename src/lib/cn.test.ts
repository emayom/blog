import { describe, expect, it } from 'vitest'
import { cn } from '@/lib/cn'

describe('cn', () => {
  it('충돌하는 커스텀 스페이싱 토큰은 마지막 것만 남긴다', () => {
    expect(cn('px-md', 'px-lg')).toBe('px-lg')
    expect(cn('py-xs', 'py-sm')).toBe('py-sm')
  })

  it('커스텀 반경 토큰도 병합한다', () => {
    expect(cn('rounded-sm', 'rounded-pill')).toBe('rounded-pill')
  })

  it('충돌하지 않는 클래스는 모두 유지한다', () => {
    expect(cn('px-lg', 'bg-primary')).toBe('px-lg bg-primary')
  })
})

describe('cn — 타이포 토큰', () => {
  it('타이포 토큰과 기본 폰트 크기 유틸을 병합한다', () => {
    expect(cn('text-sm', 'text-label-md')).toBe('text-label-md')
    expect(cn('text-label-md', 'text-sm')).toBe('text-sm')
  })

  it('같은 역할의 다른 크기는 마지막 것만 남긴다', () => {
    expect(cn('text-body-md', 'text-body-lg')).toBe('text-body-lg')
  })

  it('색 유틸리티와 타이포 토큰은 서로 다른 그룹으로 공존한다', () => {
    expect(cn('text-fg-subtle', 'text-label-md')).toBe('text-fg-subtle text-label-md')
  })
})
