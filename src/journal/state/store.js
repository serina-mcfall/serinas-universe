import { createContext, useContext, useEffect, useReducer } from 'react'
import { slugify, uniqueSlug } from '../utils/slug'

export const STORAGE_KEY = 'world-bible-v2'
const SCHEMA_VERSION = 1

export function emptyState() {
  return {
    version: SCHEMA_VERSION,
    settings: { lastEdited: null },
    items: {},
    moodboard: [],
  }
}

export function createItem(state, category, name) {
  const taken = new Set(Object.keys(state.items))
  const id = uniqueSlug(slugify(name), taken)
  const now = new Date().toISOString()
  return {
    ...state,
    items: {
      ...state.items,
      [id]: {
        id,
        category,
        name,
        fields: {},
        notes: '',
        createdAt: now,
        updatedAt: now,
      },
    },
  }
}

export function renameItem(state, id, newName) {
  const item = state.items[id]
  if (!item) return state
  return {
    ...state,
    items: {
      ...state.items,
      [id]: { ...item, name: newName, updatedAt: new Date().toISOString() },
    },
  }
}

export function updateField(state, id, fieldKey, value) {
  const item = state.items[id]
  if (!item) return state
  return {
    ...state,
    items: {
      ...state.items,
      [id]: {
        ...item,
        fields: { ...item.fields, [fieldKey]: value },
        updatedAt: new Date().toISOString(),
      },
    },
  }
}

export function updateNotes(state, id, notes) {
  const item = state.items[id]
  if (!item) return state
  return {
    ...state,
    items: {
      ...state.items,
      [id]: { ...item, notes, updatedAt: new Date().toISOString() },
    },
    settings: {
      ...state.settings,
      lastEdited: { itemId: id, at: new Date().toISOString() },
    },
  }
}

export function deleteItem(state, id) {
  const { [id]: _gone, ...rest } = state.items
  return { ...state, items: rest }
}

export function saveToStorage(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyState()
    const parsed = JSON.parse(raw)
    if (parsed.version !== SCHEMA_VERSION) return emptyState()
    return parsed
  } catch {
    return emptyState()
  }
}
