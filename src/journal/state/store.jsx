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

const JournalContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_ITEM':
      return createItem(state, action.category, action.name)
    case 'RENAME_ITEM':
      return renameItem(state, action.id, action.name)
    case 'UPDATE_FIELD':
      return updateField(state, action.id, action.fieldKey, action.value)
    case 'UPDATE_NOTES':
      return updateNotes(state, action.id, action.notes)
    case 'DELETE_ITEM':
      return deleteItem(state, action.id)
    case 'REPLACE_STATE':
      return action.state
    default:
      return state
  }
}

export function JournalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadFromStorage)

  useEffect(() => {
    const t = setTimeout(() => saveToStorage(state), 500)
    return () => clearTimeout(t)
  }, [state])

  return (
    <JournalContext.Provider value={{ state, dispatch }}>
      {children}
    </JournalContext.Provider>
  )
}

export function useJournal() {
  const ctx = useContext(JournalContext)
  if (!ctx) throw new Error('useJournal must be used inside <JournalProvider>')
  return ctx
}
