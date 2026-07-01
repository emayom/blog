import { describe, it, expect } from 'vitest'
import { getAllLibraryItems, getLibraryItemsByType } from './library'

describe('library', () => {
  it('샘플 2개 파싱', () => {
    expect(getAllLibraryItems().length).toBeGreaterThanOrEqual(2)
  })
  it('book 필터', () => {
    expect(getLibraryItemsByType('book').length).toBeGreaterThanOrEqual(1)
  })
  it('anime 필터', () => {
    expect(getLibraryItemsByType('anime').length).toBeGreaterThanOrEqual(1)
  })
  it('id가 string 타입', () => {
    const items = getAllLibraryItems()
    items.forEach((item) => {
      if (item.id !== undefined) expect(typeof item.id).toBe('string')
    })
  })
})
