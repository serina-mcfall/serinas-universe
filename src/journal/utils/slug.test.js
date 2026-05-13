import { describe, it, expect } from 'vitest'
import { slugify, uniqueSlug } from './slug'

describe('slugify', () => {
  it('lowercases and dash-separates', () => {
    expect(slugify('Princess Mei')).toBe('princess-mei')
  })

  it('strips diacritics and punctuation', () => {
    expect(slugify('Aoli Yan!')).toBe('aoli-yan')
    expect(slugify('Café  Noir')).toBe('cafe-noir')
  })

  it('handles empty and whitespace-only input', () => {
    expect(slugify('')).toBe('')
    expect(slugify('   ')).toBe('')
  })
})

describe('uniqueSlug', () => {
  it('returns the base slug if not taken', () => {
    expect(uniqueSlug('princess-mei', new Set())).toBe('princess-mei')
  })

  it('suffixes -2, -3, etc. when collisions exist', () => {
    const taken = new Set(['princess-mei', 'princess-mei-2'])
    expect(uniqueSlug('princess-mei', taken)).toBe('princess-mei-3')
  })

  it('falls back to "item" if the base is empty', () => {
    expect(uniqueSlug('', new Set())).toBe('item')
  })
})
