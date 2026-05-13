import { describe, it, expect, beforeEach } from 'vitest'
import {
  emptyState,
  createItem,
  renameItem,
  updateField,
  updateNotes,
  deleteItem,
  loadFromStorage,
  saveToStorage,
  STORAGE_KEY,
} from './store'

describe('createItem', () => {
  it('adds a new item with a slug id', () => {
    const state = emptyState()
    const next = createItem(state, 'characters', 'Princess Mei')
    const id = Object.keys(next.items).find(
      (k) => next.items[k].name === 'Princess Mei',
    )
    expect(id).toBe('princess-mei')
    expect(next.items[id].category).toBe('characters')
    expect(next.items[id].fields).toEqual({})
    expect(next.items[id].notes).toBe('')
  })

  it('suffixes duplicate names', () => {
    let state = emptyState()
    state = createItem(state, 'characters', 'Wen')
    state = createItem(state, 'places', 'Wen')
    const ids = Object.keys(state.items)
    expect(ids).toContain('wen')
    expect(ids).toContain('wen-2')
  })
})

describe('renameItem', () => {
  it('updates the name but not the id', () => {
    let state = emptyState()
    state = createItem(state, 'characters', 'Princess Mei')
    state = renameItem(state, 'princess-mei', 'Empress Mei')
    expect(state.items['princess-mei'].name).toBe('Empress Mei')
  })
})

describe('updateField', () => {
  it('sets a field value', () => {
    let state = emptyState()
    state = createItem(state, 'characters', 'Princess Mei')
    state = updateField(state, 'princess-mei', 'age', '24')
    expect(state.items['princess-mei'].fields.age).toBe('24')
  })
})

describe('updateNotes', () => {
  it('sets the notes string', () => {
    let state = emptyState()
    state = createItem(state, 'characters', 'Princess Mei')
    state = updateNotes(state, 'princess-mei', 'She has dark hair.')
    expect(state.items['princess-mei'].notes).toBe('She has dark hair.')
  })
})

describe('deleteItem', () => {
  it('removes the item', () => {
    let state = emptyState()
    state = createItem(state, 'characters', 'Princess Mei')
    state = deleteItem(state, 'princess-mei')
    expect(state.items['princess-mei']).toBeUndefined()
  })
})

describe('localStorage round-trip', () => {
  beforeEach(() => localStorage.clear())

  it('persists and restores state', () => {
    let state = emptyState()
    state = createItem(state, 'characters', 'Princess Mei')
    saveToStorage(state)
    const restored = loadFromStorage()
    expect(restored.items['princess-mei'].name).toBe('Princess Mei')
  })

  it('returns empty state when storage is empty', () => {
    expect(loadFromStorage()).toEqual(emptyState())
  })
})
