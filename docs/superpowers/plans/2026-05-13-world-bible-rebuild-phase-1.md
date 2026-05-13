# World Bible Rebuild — Phase 1 (Walking Skeleton) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the new World Bible journal end-to-end with a single category working (Characters), then expand to all 11 — so Serina can create, edit, and save items with structured fields + markdown notes, persisted across reloads, in a calm ND-friendly UI, all coexisting with the old World Bible behind a `?journal=new` URL flag.

**Architecture:** A new `src/journal/` tree containing a small React app: schema-driven category/field definitions in code, single-store React state, plain localStorage persistence. Old `WorldBible.jsx` and friends are untouched. Tests with vitest + @testing-library/react.

**Tech Stack:** Vite 6, React 19 (plain JSX), `marked` for markdown rendering, vitest + @testing-library/react + jsdom for tests. No state management library, no router (path read directly from `window.location`), no UI library.

**Scope of Phase 1 (what's IN):**
- New entrypoint mounted at `?journal=new`
- 11 categories with their schemas, sidebar to switch between them
- Per-category list view with "Add new" button
- Per-item view: editable title, structured fields (text/number/tags/link), markdown notes textarea + rendered preview
- Save & load to localStorage key `world-bible-v2`
- Quiet auto-save indicator
- Calm base CSS (palette, fonts, `prefers-reduced-motion`, `:focus-visible`)

**Scope of Phase 1 (what's NOT — these are Phase 2+):**
- Wiki `[[double-bracket]]` links in markdown
- Mentioned-by backlinks panel
- Typeahead link picker (Phase 1 uses a plain `<select>`)
- Markdown toolbar
- Focus mode
- Global search
- Places `[List][Map]` toggle and pin map
- Mood board image grid
- Export / Import JSON
- Migration from the old World Bible
- Flipping the default URL

---

## File Structure

**Created in this plan:**

```
serinas-universe/
├── vitest.config.js              ← test runner config
├── src/
│   └── journal/
│       ├── App.jsx               ← top-level component for the new journal
│       ├── state/
│       │   ├── schemas.js        ← the 11 categories + their fields
│       │   └── store.js          ← state provider, CRUD, localStorage save/load
│       ├── components/
│       │   ├── Sidebar.jsx       ← category list, last-edited footer
│       │   ├── CategoryView.jsx  ← list of items in a category
│       │   ├── ItemView.jsx      ← edit one item
│       │   ├── FieldEditor.jsx   ← dispatches by field type
│       │   ├── NotesEditor.jsx   ← markdown textarea + rendered preview
│       │   └── SavedIndicator.jsx ← quiet 'Saved' text
│       ├── utils/
│       │   ├── slug.js           ← name → id
│       │   └── slug.test.js
│       └── styles/
│           └── journal.css       ← palette, fonts, reduced-motion, focus
└── src/
    └── main.jsx                  ← MODIFIED to branch on ?journal=new
```

Each component file owns exactly one concern. Tests live next to the units they test (`slug.test.js` next to `slug.js`). `store.js` is the only place that touches `localStorage`.

---

## Task 1: Add testing toolchain

**Files:**
- Modify: `package.json`
- Create: `vitest.config.js`
- Create: `src/test-setup.js`

- [ ] **Step 1: Install dev dependencies**

Run from `serinas-universe/`:
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
```

Expected: lockfile updates, no errors.

- [ ] **Step 2: Add the test script**

In `package.json`, inside `"scripts"`, add `"test": "vitest"` so the block reads:
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest"
}
```

- [ ] **Step 3: Create `vitest.config.js`**

```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.js'],
  },
})
```

- [ ] **Step 4: Create `src/test-setup.js`**

```js
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 5: Verify test runner starts**

Run: `npm test -- --run`
Expected: vitest runs, finds no test files, exits 0.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vitest.config.js src/test-setup.js
git commit -m "Add vitest + testing-library scaffold"
```

---

## Task 2: URL flag for the new journal

**Files:**
- Modify: `src/main.jsx`
- Create: `src/journal/App.jsx`

- [ ] **Step 1: Create a placeholder `App.jsx`**

`src/journal/App.jsx`:
```jsx
export default function JournalApp() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Quicksand, sans-serif' }}>
      <h1>World Bible — new build</h1>
      <p>If you can read this, the routing flag worked.</p>
    </div>
  )
}
```

- [ ] **Step 2: Modify `src/main.jsx` to branch on the flag**

Replace the contents of `src/main.jsx` with:
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import WorldBible from './WorldBible'
import JournalApp from './journal/App'
import './WorldBible.css'

const useNewJournal = new URLSearchParams(window.location.search).get('journal') === 'new'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {useNewJournal ? <JournalApp /> : <WorldBible />}
  </React.StrictMode>
)
```

- [ ] **Step 3: Verify manually**

Run: `npm run dev`. Open `http://localhost:3000/` — you should see the OLD World Bible. Open `http://localhost:3000/?journal=new` — you should see the new placeholder page.

- [ ] **Step 4: Commit**

```bash
git add src/main.jsx src/journal/App.jsx
git commit -m "Mount new journal behind ?journal=new flag"
```

---

## Task 3: Slug utility

**Files:**
- Create: `src/journal/utils/slug.js`
- Create: `src/journal/utils/slug.test.js`

- [ ] **Step 1: Write the failing tests**

`src/journal/utils/slug.test.js`:
```js
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
```

- [ ] **Step 2: Run and watch them fail**

Run: `npm test -- --run src/journal/utils/slug.test.js`
Expected: FAIL — `Cannot find module './slug'`.

- [ ] **Step 3: Write the minimal implementation**

`src/journal/utils/slug.js`:
```js
export function slugify(name) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function uniqueSlug(base, takenSlugs) {
  const safe = base || 'item'
  if (!takenSlugs.has(safe)) return safe
  let i = 2
  while (takenSlugs.has(`${safe}-${i}`)) i++
  return `${safe}-${i}`
}
```

- [ ] **Step 4: Run tests until they pass**

Run: `npm test -- --run src/journal/utils/slug.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/journal/utils/slug.js src/journal/utils/slug.test.js
git commit -m "Add slug utilities for stable item ids"
```

---

## Task 4: Category schemas

**Files:**
- Create: `src/journal/state/schemas.js`

No tests for this task — it is pure data, used by the components that follow. Misconfiguration will surface immediately when we render fields in Task 8.

- [ ] **Step 1: Create `schemas.js`**

```js
// Field types: 'text' | 'number' | 'tags' | 'link' | 'linkList' | 'coords'
// Linked fields' `target` must be a key in CATEGORIES.

export const CATEGORIES = {
  characters: {
    key: 'characters',
    label: 'Characters',
    fields: [
      { key: 'home',   type: 'link', target: 'places', label: 'Home' },
      { key: 'house',  type: 'link', target: 'houses', label: 'House' },
      { key: 'age',    type: 'text', label: 'Age' },
      { key: 'status', type: 'text', label: 'Status' },
      { key: 'tags',   type: 'tags', label: 'Tags' },
    ],
  },
  places: {
    key: 'places',
    label: 'Places',
    fields: [
      { key: 'region',     type: 'text',     label: 'Region' },
      { key: 'population', type: 'text',     label: 'Population' },
      { key: 'climate',    type: 'text',     label: 'Climate' },
      { key: 'belongsTo',  type: 'link',     target: 'houses', label: 'Belongs to' },
      { key: 'tags',       type: 'tags',     label: 'Tags' },
    ],
  },
  items: {
    key: 'items',
    label: 'Items',
    fields: [
      { key: 'owner',    type: 'link', target: 'characters', label: 'Owner' },
      { key: 'origin',   type: 'link', target: 'places',     label: 'Origin' },
      { key: 'material', type: 'text', label: 'Material' },
      { key: 'powers',   type: 'text', label: 'Powers' },
      { key: 'tags',     type: 'tags', label: 'Tags' },
    ],
  },
  lore: {
    key: 'lore',
    label: 'Lore',
    fields: [
      { key: 'era',       type: 'text',     label: 'Era' },
      { key: 'relatedTo', type: 'linkList', target: 'any', label: 'Related to' },
      { key: 'tags',      type: 'tags',     label: 'Tags' },
    ],
  },
  events: {
    key: 'events',
    label: 'Events',
    fields: [
      { key: 'when',  type: 'text',     label: 'When' },
      { key: 'where', type: 'link',     target: 'places', label: 'Where' },
      { key: 'who',   type: 'linkList', target: 'characters', label: 'Who' },
      { key: 'tags',  type: 'tags',     label: 'Tags' },
    ],
  },
  magic: {
    key: 'magic',
    label: 'Magic',
    fields: [
      { key: 'source',        type: 'text',     label: 'Source' },
      { key: 'practitioners', type: 'linkList', target: 'characters', label: 'Practitioners' },
      { key: 'cost',          type: 'text',     label: 'Cost' },
      { key: 'tags',          type: 'tags',     label: 'Tags' },
    ],
  },
  cultures: {
    key: 'cultures',
    label: 'Cultures',
    fields: [
      { key: 'region',   type: 'link', target: 'places',    label: 'Region' },
      { key: 'language', type: 'link', target: 'languages', label: 'Language' },
      { key: 'religion', type: 'link', target: 'religions', label: 'Religion' },
      { key: 'tags',     type: 'tags', label: 'Tags' },
    ],
  },
  houses: {
    key: 'houses',
    label: 'Houses & factions',
    fields: [
      { key: 'seat',       type: 'link',     target: 'places', label: 'Seat' },
      { key: 'allegiance', type: 'linkList', target: 'houses', label: 'Allegiance' },
      { key: 'tags',       type: 'tags',     label: 'Tags' },
    ],
  },
  languages: {
    key: 'languages',
    label: 'Languages',
    fields: [
      { key: 'spokenIn', type: 'linkList', target: 'places', label: 'Spoken in' },
      { key: 'script',   type: 'text',     label: 'Script' },
      { key: 'tags',     type: 'tags',     label: 'Tags' },
    ],
  },
  religions: {
    key: 'religions',
    label: 'Religions',
    fields: [
      { key: 'followedBy', type: 'linkList', target: 'cultures', label: 'Followed by' },
      { key: 'deities',    type: 'text',     label: 'Deities' },
      { key: 'tags',       type: 'tags',     label: 'Tags' },
    ],
  },
  moodboard: {
    key: 'moodboard',
    label: 'Mood board',
    fields: [], // Special — handled by a different component in Phase 3
    special: 'moodboard',
  },
}

export const CATEGORY_KEYS = Object.keys(CATEGORIES)
```

- [ ] **Step 2: Commit**

```bash
git add src/journal/state/schemas.js
git commit -m "Define the 11 category schemas"
```

---

## Task 5: Journal store (state + load/save)

**Files:**
- Create: `src/journal/state/store.js`
- Create: `src/journal/state/store.test.js`

The store owns: in-memory state, localStorage persistence, and CRUD operations on items. It exposes a React context + provider + hook.

- [ ] **Step 1: Write the failing tests for the pure helpers**

`src/journal/state/store.test.js`:
```js
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
```

- [ ] **Step 2: Run and watch them fail**

Run: `npm test -- --run src/journal/state/store.test.js`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the pure-function store helpers**

`src/journal/state/store.js`:
```js
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
```

- [ ] **Step 4: Run tests until they pass**

Run: `npm test -- --run src/journal/state/store.test.js`
Expected: PASS, all green.

- [ ] **Step 5: Commit**

```bash
git add src/journal/state/store.js src/journal/state/store.test.js
git commit -m "Add journal store with CRUD + localStorage persistence"
```

---

## Task 6: React context provider for the store

**Files:**
- Modify: `src/journal/state/store.js`

This task adds the React glue on top of the pure functions from Task 5.

- [ ] **Step 1: Append the provider + hook to `store.js`**

Add to the bottom of `src/journal/state/store.js`:
```js
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
```

- [ ] **Step 2: Verify it doesn't break existing tests**

Run: `npm test -- --run`
Expected: all tests still pass (the new code is import-only until something uses it).

- [ ] **Step 3: Commit**

```bash
git add src/journal/state/store.js
git commit -m "Add JournalProvider + useJournal hook"
```

---

## Task 7: Wire the provider into App.jsx and read URL state

**Files:**
- Modify: `src/journal/App.jsx`

- [ ] **Step 1: Replace `App.jsx` with the routed shell**

`src/journal/App.jsx`:
```jsx
import { useEffect, useState } from 'react'
import { JournalProvider } from './state/store'
import './styles/journal.css'

function getRoute() {
  // Examples we support in Phase 1:
  //   /                      → no category selected
  //   /c/characters          → category view
  //   /c/characters/mei      → item view
  const parts = window.location.pathname.split('/').filter(Boolean)
  if (parts[0] !== 'c') return { kind: 'home' }
  if (!parts[1]) return { kind: 'home' }
  if (!parts[2]) return { kind: 'category', category: parts[1] }
  return { kind: 'item', category: parts[1], id: parts[2] }
}

function useRoute() {
  const [route, setRoute] = useState(getRoute())
  useEffect(() => {
    const onPop = () => setRoute(getRoute())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return route
}

export function navigate(path) {
  // Preserve the ?journal=new flag while we're behind it.
  window.history.pushState({}, '', `${path}${window.location.search}`)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export default function JournalApp() {
  const route = useRoute()
  return (
    <JournalProvider>
      <div className="journal-shell">
        <pre style={{ padding: '1rem' }}>
          Route: {JSON.stringify(route, null, 2)}
        </pre>
      </div>
    </JournalProvider>
  )
}
```

- [ ] **Step 2: Create the styles file**

`src/journal/styles/journal.css`:
```css
.journal-shell {
  min-height: 100vh;
  background: linear-gradient(170deg, #f5efe6 0%, #ebe3d7 40%, #f0e8dc 100%);
  font-family: 'Quicksand', 'Segoe UI', sans-serif;
  color: #5a4a3a;
}
```

- [ ] **Step 3: Verify the routing skeleton in the browser**

Run: `npm run dev`.
- Open `http://localhost:3000/?journal=new` → see route `{ kind: 'home' }`
- Open `http://localhost:3000/c/characters?journal=new` → see route `{ kind: 'category', category: 'characters' }`
- Open `http://localhost:3000/c/characters/mei?journal=new` → see route `{ kind: 'item', ... }`

- [ ] **Step 4: Commit**

```bash
git add src/journal/App.jsx src/journal/styles/journal.css
git commit -m "Wire JournalProvider + path-based routing into JournalApp"
```

---

## Task 8: Sidebar component

**Files:**
- Create: `src/journal/components/Sidebar.jsx`
- Create: `src/journal/components/Sidebar.test.jsx`
- Modify: `src/journal/App.jsx`
- Modify: `src/journal/styles/journal.css`

- [ ] **Step 1: Write the failing test**

`src/journal/components/Sidebar.test.jsx`:
```jsx
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { JournalProvider } from '../state/store'
import Sidebar from './Sidebar'

describe('<Sidebar>', () => {
  beforeEach(() => localStorage.clear())

  it('renders every category label', () => {
    render(
      <JournalProvider>
        <Sidebar activeCategory={null} />
      </JournalProvider>,
    )
    expect(screen.getByText('Characters')).toBeInTheDocument()
    expect(screen.getByText('Places')).toBeInTheDocument()
    expect(screen.getByText('Mood board')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run and watch it fail**

Run: `npm test -- --run src/journal/components/Sidebar.test.jsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `Sidebar.jsx`**

`src/journal/components/Sidebar.jsx`:
```jsx
import { CATEGORIES, CATEGORY_KEYS } from '../state/schemas'
import { useJournal } from '../state/store'
import { navigate } from '../App'

export default function Sidebar({ activeCategory }) {
  const { state } = useJournal()
  const lastEdited = state.settings.lastEdited

  return (
    <nav className="journal-sidebar" aria-label="Categories">
      <ul className="journal-sidebar__list">
        {CATEGORY_KEYS.map((key) => {
          const cat = CATEGORIES[key]
          const isActive = key === activeCategory
          return (
            <li key={key}>
              <button
                type="button"
                className={`journal-sidebar__btn${isActive ? ' is-active' : ''}`}
                onClick={() => navigate(`/c/${key}`)}
              >
                {cat.label}
              </button>
            </li>
          )
        })}
      </ul>
      {lastEdited && state.items[lastEdited.itemId] && (
        <button
          type="button"
          className="journal-sidebar__last-edited"
          onClick={() => {
            const it = state.items[lastEdited.itemId]
            navigate(`/c/${it.category}/${it.id}`)
          }}
        >
          Last edited:{' '}
          <strong>{state.items[lastEdited.itemId].name}</strong>
        </button>
      )}
    </nav>
  )
}
```

- [ ] **Step 4: Add sidebar styles**

Append to `src/journal/styles/journal.css`:
```css
.journal-shell {
  display: flex;
  align-items: stretch;
}

.journal-sidebar {
  width: 240px;
  flex-shrink: 0;
  padding: 1.5rem 1rem;
  border-right: 1px solid rgba(90, 74, 58, 0.12);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.journal-sidebar__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.journal-sidebar__btn {
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font: inherit;
  font-size: 0.95rem;
  color: inherit;
  cursor: pointer;
}

.journal-sidebar__btn:hover {
  background: rgba(150, 120, 130, 0.08);
}

.journal-sidebar__btn:focus-visible {
  outline: 2px solid rgba(150, 120, 130, 0.6);
  outline-offset: 1px;
}

.journal-sidebar__btn.is-active {
  background: rgba(150, 120, 130, 0.14);
  font-weight: 600;
}

.journal-sidebar__last-edited {
  margin-top: auto;
  text-align: left;
  background: transparent;
  border: none;
  padding: 0.5rem 0.75rem;
  font: inherit;
  font-size: 0.8rem;
  color: rgba(90, 74, 58, 0.7);
  cursor: pointer;
}

.journal-sidebar__last-edited:focus-visible {
  outline: 2px solid rgba(150, 120, 130, 0.6);
  outline-offset: 1px;
}
```

- [ ] **Step 5: Render the sidebar from App**

Replace the `<pre>` block in `App.jsx` with:
```jsx
import Sidebar from './components/Sidebar'

// ...inside JournalApp:
return (
  <JournalProvider>
    <div className="journal-shell">
      <Sidebar activeCategory={route.kind === 'home' ? null : route.category} />
      <main className="journal-main">
        <pre style={{ padding: '1rem' }}>
          {JSON.stringify(route, null, 2)}
        </pre>
      </main>
    </div>
  </JournalProvider>
)
```

And add to `journal.css`:
```css
.journal-main {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  max-height: 100vh;
}
```

- [ ] **Step 6: Run tests and verify manually**

Run: `npm test -- --run src/journal/components/Sidebar.test.jsx`
Expected: PASS.

Run: `npm run dev` and open `?journal=new`. You should see the sidebar with all 11 category labels. Clicking one updates the URL.

- [ ] **Step 7: Commit**

```bash
git add src/journal/components/Sidebar.jsx src/journal/components/Sidebar.test.jsx src/journal/App.jsx src/journal/styles/journal.css
git commit -m "Add Sidebar with category navigation"
```

---

## Task 9: CategoryView (list + Add new)

**Files:**
- Create: `src/journal/components/CategoryView.jsx`
- Create: `src/journal/components/CategoryView.test.jsx`
- Modify: `src/journal/App.jsx`
- Modify: `src/journal/styles/journal.css`

- [ ] **Step 1: Write the failing test**

`src/journal/components/CategoryView.test.jsx`:
```jsx
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JournalProvider } from '../state/store'
import CategoryView from './CategoryView'

function renderWith(category) {
  return render(
    <JournalProvider>
      <CategoryView category={category} />
    </JournalProvider>,
  )
}

describe('<CategoryView>', () => {
  beforeEach(() => localStorage.clear())

  it('shows the category label as a heading', () => {
    renderWith('characters')
    expect(
      screen.getByRole('heading', { name: /characters/i }),
    ).toBeInTheDocument()
  })

  it('shows an empty state when there are no items', () => {
    renderWith('characters')
    expect(screen.getByText(/nothing here yet/i)).toBeInTheDocument()
  })

  it('creates a new item when "Add new" is clicked and a name is entered', () => {
    renderWith('characters')
    fireEvent.click(screen.getByRole('button', { name: /add new/i }))
    const input = screen.getByLabelText(/new character name/i)
    fireEvent.change(input, { target: { value: 'Princess Mei' } })
    fireEvent.click(screen.getByRole('button', { name: /^create$/i }))
    expect(screen.getByText('Princess Mei')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run and watch it fail**

Run: `npm test -- --run src/journal/components/CategoryView.test.jsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `CategoryView.jsx`**

`src/journal/components/CategoryView.jsx`:
```jsx
import { useState } from 'react'
import { CATEGORIES } from '../state/schemas'
import { useJournal } from '../state/store'
import { navigate } from '../App'

export default function CategoryView({ category }) {
  const { state, dispatch } = useJournal()
  const cat = CATEGORIES[category]
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')

  if (!cat) return <p>Unknown category.</p>

  const items = Object.values(state.items)
    .filter((it) => it.category === category)
    .sort((a, b) => a.name.localeCompare(b.name))

  const handleCreate = (e) => {
    e.preventDefault()
    const name = newName.trim()
    if (!name) return
    dispatch({ type: 'CREATE_ITEM', category, name })
    setAdding(false)
    setNewName('')
  }

  return (
    <section className="journal-category">
      <h1 className="journal-category__title">{cat.label}</h1>

      {!adding && (
        <button
          type="button"
          className="journal-btn"
          onClick={() => setAdding(true)}
        >
          + Add new {cat.label.toLowerCase()}
        </button>
      )}

      {adding && (
        <form className="journal-add-form" onSubmit={handleCreate}>
          <label className="journal-add-form__label">
            New {cat.label.toLowerCase().replace(/s$/, '')} name
            <input
              autoFocus
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              aria-label={`New ${cat.label.toLowerCase().replace(/s$/, '')} name`}
            />
          </label>
          <button type="submit" className="journal-btn">Create</button>
          <button
            type="button"
            className="journal-btn journal-btn--ghost"
            onClick={() => { setAdding(false); setNewName('') }}
          >
            Cancel
          </button>
        </form>
      )}

      {items.length === 0 && !adding && (
        <p className="journal-category__empty">
          Nothing here yet. What would you like to add?
        </p>
      )}

      <ul className="journal-category__list">
        {items.map((it) => (
          <li key={it.id}>
            <button
              type="button"
              className="journal-item-link"
              onClick={() => navigate(`/c/${it.category}/${it.id}`)}
            >
              {it.name}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
```

- [ ] **Step 4: Add styles**

Append to `journal.css`:
```css
.journal-category__title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 500;
  margin: 0 0 1.5rem;
}

.journal-category__empty {
  margin-top: 2rem;
  color: rgba(90, 74, 58, 0.7);
  font-size: 0.95rem;
}

.journal-category__list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.journal-item-link {
  background: transparent;
  border: 1px solid rgba(90, 74, 58, 0.1);
  border-radius: 6px;
  padding: 0.75rem 1rem;
  width: 100%;
  text-align: left;
  font: inherit;
  font-size: 0.95rem;
  color: inherit;
  cursor: pointer;
}

.journal-item-link:hover {
  background: rgba(150, 120, 130, 0.05);
}

.journal-item-link:focus-visible {
  outline: 2px solid rgba(150, 120, 130, 0.6);
  outline-offset: 1px;
}

.journal-btn {
  background: rgba(150, 120, 130, 0.12);
  border: 1px solid rgba(90, 74, 58, 0.15);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  color: inherit;
}

.journal-btn:hover {
  background: rgba(150, 120, 130, 0.2);
}

.journal-btn:focus-visible {
  outline: 2px solid rgba(150, 120, 130, 0.6);
  outline-offset: 1px;
}

.journal-btn--ghost {
  background: transparent;
}

.journal-add-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 28rem;
  margin-top: 0.5rem;
}

.journal-add-form__label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.85rem;
}

.journal-add-form input {
  font: inherit;
  font-size: 1rem;
  padding: 0.5rem 0.6rem;
  border: 1px solid rgba(90, 74, 58, 0.2);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.6);
}

.journal-add-form input:focus-visible {
  outline: 2px solid rgba(150, 120, 130, 0.6);
  outline-offset: 1px;
  border-color: rgba(150, 120, 130, 0.6);
}
```

- [ ] **Step 5: Render CategoryView from App for the right route**

Update `App.jsx`'s render block:
```jsx
import CategoryView from './components/CategoryView'

// ...inside JournalApp:
return (
  <JournalProvider>
    <div className="journal-shell">
      <Sidebar activeCategory={route.kind === 'home' ? null : route.category} />
      <main className="journal-main">
        {route.kind === 'home' && (
          <p>Pick a category to start.</p>
        )}
        {route.kind === 'category' && (
          <CategoryView category={route.category} />
        )}
        {route.kind === 'item' && (
          <pre>Item view coming in Task 10: {JSON.stringify(route, null, 2)}</pre>
        )}
      </main>
    </div>
  </JournalProvider>
)
```

- [ ] **Step 6: Run tests and verify manually**

Run: `npm test -- --run src/journal/components/CategoryView.test.jsx`
Expected: PASS.

Run: `npm run dev`. Visit `?journal=new`. Click "Characters". Click "+ Add new". Type "Princess Mei". Click Create. See the item appear in the list.

- [ ] **Step 7: Commit**

```bash
git add src/journal/components/CategoryView.jsx src/journal/components/CategoryView.test.jsx src/journal/App.jsx src/journal/styles/journal.css
git commit -m "Add CategoryView with item list and Add new flow"
```

---

## Task 10: FieldEditor (text, number, tags, link, linkList)

**Files:**
- Create: `src/journal/components/FieldEditor.jsx`
- Create: `src/journal/components/FieldEditor.test.jsx`
- Modify: `src/journal/styles/journal.css`

- [ ] **Step 1: Write failing tests for each field type**

`src/journal/components/FieldEditor.test.jsx`:
```jsx
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JournalProvider } from '../state/store'
import FieldEditor from './FieldEditor'

function harness({ field, value, onChange }) {
  return render(
    <JournalProvider>
      <FieldEditor field={field} value={value} onChange={onChange} />
    </JournalProvider>,
  )
}

describe('<FieldEditor>', () => {
  beforeEach(() => localStorage.clear())

  it('renders a text input for type="text"', () => {
    const onChange = vi.fn()
    harness({
      field: { key: 'age', type: 'text', label: 'Age' },
      value: '24',
      onChange,
    })
    const input = screen.getByLabelText('Age')
    expect(input).toHaveValue('24')
    fireEvent.change(input, { target: { value: '25' } })
    expect(onChange).toHaveBeenCalledWith('25')
  })

  it('renders a number input for type="number"', () => {
    const onChange = vi.fn()
    harness({
      field: { key: 'pop', type: 'number', label: 'Population' },
      value: '1000',
      onChange,
    })
    expect(screen.getByLabelText('Population')).toHaveAttribute('type', 'number')
  })

  it('renders tags as comma-separated text and parses them back', () => {
    const onChange = vi.fn()
    harness({
      field: { key: 'tags', type: 'tags', label: 'Tags' },
      value: ['royalty', 'fugitive'],
      onChange,
    })
    const input = screen.getByLabelText('Tags')
    expect(input).toHaveValue('royalty, fugitive')
    fireEvent.change(input, { target: { value: 'royalty, fugitive, dyer' } })
    expect(onChange).toHaveBeenCalledWith(['royalty', 'fugitive', 'dyer'])
  })

  it('renders a select for type="link"', () => {
    const onChange = vi.fn()
    harness({
      field: { key: 'home', type: 'link', target: 'places', label: 'Home' },
      value: '',
      onChange,
    })
    expect(screen.getByLabelText('Home').tagName).toBe('SELECT')
  })
})
```

- [ ] **Step 2: Run and watch them fail**

Run: `npm test -- --run src/journal/components/FieldEditor.test.jsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `FieldEditor.jsx`**

`src/journal/components/FieldEditor.jsx`:
```jsx
import { useId } from 'react'
import { useJournal } from '../state/store'
import { CATEGORY_KEYS } from '../state/schemas'

export default function FieldEditor({ field, value, onChange }) {
  const id = useId()
  const labelId = `${id}-label`

  switch (field.type) {
    case 'text':
      return (
        <div className="journal-field">
          <label className="journal-field__label" htmlFor={id} id={labelId}>
            {field.label}
          </label>
          <input
            id={id}
            type="text"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            className="journal-field__input"
          />
        </div>
      )
    case 'number':
      return (
        <div className="journal-field">
          <label className="journal-field__label" htmlFor={id}>{field.label}</label>
          <input
            id={id}
            type="number"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            className="journal-field__input"
          />
        </div>
      )
    case 'tags':
      return (
        <div className="journal-field">
          <label className="journal-field__label" htmlFor={id}>{field.label}</label>
          <input
            id={id}
            type="text"
            value={(value ?? []).join(', ')}
            onChange={(e) => {
              const parts = e.target.value
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean)
              onChange(parts)
            }}
            className="journal-field__input"
            placeholder="comma, separated"
          />
        </div>
      )
    case 'link':
      return <LinkField id={id} field={field} value={value} onChange={onChange} />
    case 'linkList':
      return (
        <LinkListField id={id} field={field} value={value} onChange={onChange} />
      )
    default:
      return null
  }
}

function LinkField({ id, field, value, onChange }) {
  const { state } = useJournal()
  const candidates = getCandidates(state, field.target)
  return (
    <div className="journal-field">
      <label className="journal-field__label" htmlFor={id}>{field.label}</label>
      <select
        id={id}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="journal-field__input"
      >
        <option value="">— none —</option>
        {candidates.map((it) => (
          <option key={it.id} value={it.id}>{it.name}</option>
        ))}
      </select>
    </div>
  )
}

function LinkListField({ id, field, value, onChange }) {
  const { state } = useJournal()
  const selected = value ?? []
  const candidates = getCandidates(state, field.target)
  const toggle = (itemId) => {
    if (selected.includes(itemId)) {
      onChange(selected.filter((x) => x !== itemId))
    } else {
      onChange([...selected, itemId])
    }
  }
  return (
    <div className="journal-field">
      <span className="journal-field__label" id={id}>{field.label}</span>
      <ul className="journal-field__chips" aria-labelledby={id}>
        {candidates.map((it) => (
          <li key={it.id}>
            <label className="journal-field__chip">
              <input
                type="checkbox"
                checked={selected.includes(it.id)}
                onChange={() => toggle(it.id)}
              />
              {it.name}
            </label>
          </li>
        ))}
        {candidates.length === 0 && (
          <li className="journal-field__chip-empty">
            No {field.target === 'any' ? 'items' : field.target} yet.
          </li>
        )}
      </ul>
    </div>
  )
}

function getCandidates(state, target) {
  const all = Object.values(state.items)
  if (target === 'any') return all.sort(byName)
  return all.filter((it) => it.category === target).sort(byName)
}

function byName(a, b) {
  return a.name.localeCompare(b.name)
}
```

- [ ] **Step 4: Add field styles**

Append to `journal.css`:
```css
.journal-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.journal-field__label {
  font-size: 0.85rem;
  color: rgba(90, 74, 58, 0.85);
}

.journal-field__input {
  font: inherit;
  font-size: 0.95rem;
  padding: 0.45rem 0.6rem;
  border: 1px solid rgba(90, 74, 58, 0.15);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.6);
  color: inherit;
  max-width: 32rem;
}

.journal-field__input:focus-visible {
  outline: 2px solid rgba(150, 120, 130, 0.6);
  outline-offset: 1px;
  border-color: rgba(150, 120, 130, 0.6);
}

.journal-field__chips {
  list-style: none;
  padding: 0;
  margin: 0.25rem 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  max-width: 32rem;
}

.journal-field__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.6rem;
  border: 1px solid rgba(90, 74, 58, 0.15);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  cursor: pointer;
}

.journal-field__chip-empty {
  font-size: 0.85rem;
  color: rgba(90, 74, 58, 0.55);
}
```

- [ ] **Step 5: Run tests until they pass**

Run: `npm test -- --run src/journal/components/FieldEditor.test.jsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/journal/components/FieldEditor.jsx src/journal/components/FieldEditor.test.jsx src/journal/styles/journal.css
git commit -m "Add FieldEditor with text, number, tags, link, linkList types"
```

---

## Task 11: NotesEditor (markdown textarea + rendered preview)

**Files:**
- Modify: `package.json` (add `marked`)
- Create: `src/journal/components/NotesEditor.jsx`
- Create: `src/journal/components/NotesEditor.test.jsx`
- Modify: `src/journal/styles/journal.css`

- [ ] **Step 1: Install marked**

```bash
npm install marked
```

- [ ] **Step 2: Write the failing test**

`src/journal/components/NotesEditor.test.jsx`:
```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import NotesEditor from './NotesEditor'

describe('<NotesEditor>', () => {
  it('renders the textarea with the current value', () => {
    const onChange = vi.fn()
    render(<NotesEditor value="hello" onChange={onChange} />)
    expect(screen.getByLabelText(/notes/i)).toHaveValue('hello')
  })

  it('calls onChange when the user types', () => {
    const onChange = vi.fn()
    render(<NotesEditor value="" onChange={onChange} />)
    fireEvent.change(screen.getByLabelText(/notes/i), {
      target: { value: 'a new line' },
    })
    expect(onChange).toHaveBeenCalledWith('a new line')
  })

  it('renders markdown in the preview', () => {
    render(<NotesEditor value="# Title" onChange={() => {}} />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'Title' }),
    ).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run and watch them fail**

Run: `npm test -- --run src/journal/components/NotesEditor.test.jsx`
Expected: FAIL — module not found.

- [ ] **Step 4: Implement `NotesEditor.jsx`**

`src/journal/components/NotesEditor.jsx`:
```jsx
import { useId, useMemo } from 'react'
import { marked } from 'marked'

marked.setOptions({ breaks: true })

export default function NotesEditor({ value, onChange }) {
  const id = useId()
  const html = useMemo(() => marked.parse(value ?? ''), [value])

  return (
    <div className="journal-notes">
      <label htmlFor={id} className="journal-notes__label">Notes</label>
      <textarea
        id={id}
        className="journal-notes__textarea"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        rows={10}
        placeholder="Write whatever you want here. Markdown works: # heading, **bold**, *italic*, - bullet, [[wiki link]] (Phase 2)."
      />
      <div
        className="journal-notes__preview"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
```

> Note on `dangerouslySetInnerHTML`: in Phase 1, the only source of HTML is the user's own markdown rendered by `marked` locally. There is no external content. Phase 2 will revisit when we add wiki-link rendering and stricter sanitisation.

- [ ] **Step 5: Add notes styles**

Append to `journal.css`:
```css
.journal-notes {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.journal-notes__label {
  font-size: 0.85rem;
  color: rgba(90, 74, 58, 0.85);
}

.journal-notes__textarea {
  font: inherit;
  font-size: 0.95rem;
  line-height: 1.7;
  padding: 0.75rem 0.9rem;
  border: 1px solid rgba(90, 74, 58, 0.15);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.5);
  color: inherit;
  width: 100%;
  max-width: 48rem;
  min-height: 12rem;
  resize: vertical;
}

.journal-notes__textarea:focus-visible {
  outline: 2px solid rgba(150, 120, 130, 0.6);
  outline-offset: 1px;
  border-color: rgba(150, 120, 130, 0.6);
}

.journal-notes__preview {
  border-top: 1px dashed rgba(90, 74, 58, 0.15);
  padding-top: 1rem;
  max-width: 48rem;
  line-height: 1.7;
}

.journal-notes__preview h1,
.journal-notes__preview h2,
.journal-notes__preview h3 {
  font-family: 'Cormorant Garamond', serif;
  margin: 0.75em 0 0.25em;
}

.journal-notes__preview p { margin: 0.5em 0; }
.journal-notes__preview ul, .journal-notes__preview ol { padding-left: 1.5em; }
```

- [ ] **Step 6: Run tests until they pass**

Run: `npm test -- --run src/journal/components/NotesEditor.test.jsx`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json src/journal/components/NotesEditor.jsx src/journal/components/NotesEditor.test.jsx src/journal/styles/journal.css
git commit -m "Add NotesEditor with markdown textarea + rendered preview"
```

---

## Task 12: ItemView (the page itself)

**Files:**
- Create: `src/journal/components/ItemView.jsx`
- Create: `src/journal/components/ItemView.test.jsx`
- Modify: `src/journal/App.jsx`
- Modify: `src/journal/styles/journal.css`

- [ ] **Step 1: Write the failing test**

`src/journal/components/ItemView.test.jsx`:
```jsx
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { JournalProvider } from '../state/store'
import ItemView from './ItemView'
import CategoryView from './CategoryView'

function setup() {
  return render(
    <JournalProvider>
      <CategoryView category="characters" />
      <ItemView category="characters" id="princess-mei" />
    </JournalProvider>,
  )
}

describe('<ItemView>', () => {
  beforeEach(() => localStorage.clear())

  it('shows nothing helpful for an unknown item', () => {
    render(
      <JournalProvider>
        <ItemView category="characters" id="ghost" />
      </JournalProvider>,
    )
    expect(screen.getByText(/can't find that item/i)).toBeInTheDocument()
  })

  it('renders fields and notes for an existing item', () => {
    setup()
    fireEvent.click(screen.getByRole('button', { name: /add new/i }))
    fireEvent.change(screen.getByLabelText(/new character name/i), {
      target: { value: 'Princess Mei' },
    })
    fireEvent.click(screen.getByRole('button', { name: /^create$/i }))

    // Title appears
    expect(screen.getByDisplayValue('Princess Mei')).toBeInTheDocument()
    // Field labels appear
    expect(screen.getByText('Age')).toBeInTheDocument()
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument()
  })

  it('updates a field via dispatch', () => {
    setup()
    fireEvent.click(screen.getByRole('button', { name: /add new/i }))
    fireEvent.change(screen.getByLabelText(/new character name/i), {
      target: { value: 'Princess Mei' },
    })
    fireEvent.click(screen.getByRole('button', { name: /^create$/i }))

    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '24' } })
    expect(screen.getByLabelText('Age')).toHaveValue('24')
  })
})
```

- [ ] **Step 2: Run and watch it fail**

Run: `npm test -- --run src/journal/components/ItemView.test.jsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `ItemView.jsx`**

`src/journal/components/ItemView.jsx`:
```jsx
import { CATEGORIES } from '../state/schemas'
import { useJournal } from '../state/store'
import { navigate } from '../App'
import FieldEditor from './FieldEditor'
import NotesEditor from './NotesEditor'

export default function ItemView({ category, id }) {
  const { state, dispatch } = useJournal()
  const item = state.items[id]
  const cat = CATEGORIES[category]

  if (!item || !cat) {
    return (
      <section className="journal-item">
        <p>Can't find that item. It may have been renamed or removed.</p>
      </section>
    )
  }

  return (
    <section className="journal-item">
      <nav className="journal-breadcrumb">
        <button
          type="button"
          className="journal-breadcrumb__btn"
          onClick={() => navigate(`/c/${category}`)}
        >
          {cat.label}
        </button>
        <span aria-hidden="true"> › </span>
        <span>{item.name}</span>
      </nav>

      <input
        className="journal-item__title"
        value={item.name}
        onChange={(e) =>
          dispatch({ type: 'RENAME_ITEM', id: item.id, name: e.target.value })
        }
        aria-label="Item name"
      />

      <div className="journal-item__fields">
        {cat.fields.map((f) => (
          <FieldEditor
            key={f.key}
            field={f}
            value={item.fields[f.key]}
            onChange={(value) =>
              dispatch({
                type: 'UPDATE_FIELD',
                id: item.id,
                fieldKey: f.key,
                value,
              })
            }
          />
        ))}
      </div>

      <NotesEditor
        value={item.notes}
        onChange={(notes) =>
          dispatch({ type: 'UPDATE_NOTES', id: item.id, notes })
        }
      />
    </section>
  )
}
```

- [ ] **Step 4: Mount ItemView from `App.jsx`**

In `App.jsx`, replace the `<pre>` placeholder for the item route:
```jsx
import ItemView from './components/ItemView'

// ...inside the render:
{route.kind === 'item' && (
  <ItemView category={route.category} id={route.id} />
)}
```

- [ ] **Step 5: Add styles**

Append to `journal.css`:
```css
.journal-breadcrumb {
  font-size: 0.85rem;
  color: rgba(90, 74, 58, 0.7);
  margin-bottom: 0.5rem;
}

.journal-breadcrumb__btn {
  background: transparent;
  border: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
  text-decoration: underline dotted;
}

.journal-breadcrumb__btn:focus-visible {
  outline: 2px solid rgba(150, 120, 130, 0.6);
  outline-offset: 2px;
}

.journal-item__title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 500;
  background: transparent;
  border: none;
  border-bottom: 1px dashed transparent;
  padding: 0.2rem 0;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 48rem;
  color: inherit;
}

.journal-item__title:hover,
.journal-item__title:focus-visible {
  border-bottom-color: rgba(90, 74, 58, 0.2);
  outline: none;
}

.journal-item__fields {
  max-width: 32rem;
  margin-bottom: 1.5rem;
}
```

- [ ] **Step 6: Run tests and verify manually**

Run: `npm test -- --run src/journal/components/ItemView.test.jsx`
Expected: PASS.

Run: `npm run dev`, visit `?journal=new`, click Characters → Add new → "Princess Mei" → Create. Click "Princess Mei" in the list. Fill in Age, write something in Notes, see it render below.

- [ ] **Step 7: Commit**

```bash
git add src/journal/components/ItemView.jsx src/journal/components/ItemView.test.jsx src/journal/App.jsx src/journal/styles/journal.css
git commit -m "Add ItemView with editable title, fields, and markdown notes"
```

---

## Task 13: Saved indicator

**Files:**
- Create: `src/journal/components/SavedIndicator.jsx`
- Create: `src/journal/components/SavedIndicator.test.jsx`
- Modify: `src/journal/state/store.js`
- Modify: `src/journal/App.jsx`
- Modify: `src/journal/styles/journal.css`

The store already debounce-saves on a 500ms timer (Task 6). We add a `lastSavedAt` timestamp to the store that the indicator reads.

- [ ] **Step 1: Update `store.js` to track save events**

Replace the existing `useEffect` block inside `JournalProvider` with:
```js
const [lastSavedAt, setLastSavedAt] = useState(null)

useEffect(() => {
  const t = setTimeout(() => {
    saveToStorage(state)
    setLastSavedAt(Date.now())
  }, 500)
  return () => clearTimeout(t)
}, [state])

return (
  <JournalContext.Provider value={{ state, dispatch, lastSavedAt }}>
    {children}
  </JournalContext.Provider>
)
```

Add the missing import at the top of `store.js`:
```js
import { createContext, useContext, useEffect, useReducer, useState } from 'react'
```

- [ ] **Step 2: Write the failing test**

`src/journal/components/SavedIndicator.test.jsx`:
```jsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { JournalProvider } from '../state/store'
import SavedIndicator from './SavedIndicator'

describe('<SavedIndicator>', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })
  afterEach(() => vi.useRealTimers())

  it('shows "Saved" briefly after a save', async () => {
    render(
      <JournalProvider>
        <SavedIndicator />
      </JournalProvider>,
    )
    // Initial render triggers a debounce timer in the provider.
    await act(async () => { vi.advanceTimersByTime(600) })
    expect(screen.getByText(/saved/i)).toBeInTheDocument()

    // It fades after a couple of seconds.
    await act(async () => { vi.advanceTimersByTime(2500) })
    expect(screen.queryByText(/saved/i)).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Implement `SavedIndicator.jsx`**

`src/journal/components/SavedIndicator.jsx`:
```jsx
import { useEffect, useState } from 'react'
import { useJournal } from '../state/store'

export default function SavedIndicator() {
  const { lastSavedAt } = useJournal()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!lastSavedAt) return
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 2000)
    return () => clearTimeout(t)
  }, [lastSavedAt])

  if (!visible) return null
  return <span className="journal-saved" role="status">Saved</span>
}
```

- [ ] **Step 4: Add saved indicator styles**

Append to `journal.css`:
```css
.journal-saved {
  font-size: 0.78rem;
  color: rgba(90, 74, 58, 0.55);
  margin-left: 0.6rem;
  font-style: italic;
}
```

- [ ] **Step 5: Mount it next to the item title in `App.jsx`**

Add to `App.jsx` somewhere visible (e.g. inside the `journal-main` div, above the route content):
```jsx
import SavedIndicator from './components/SavedIndicator'

// ...inside JournalApp's render, top of <main>:
<div className="journal-status">
  <SavedIndicator />
</div>
```

And in `journal.css`:
```css
.journal-status {
  min-height: 1.2rem;
  margin-bottom: 0.5rem;
}
```

- [ ] **Step 6: Run tests**

Run: `npm test -- --run src/journal/components/SavedIndicator.test.jsx`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/journal/state/store.js src/journal/components/SavedIndicator.jsx src/journal/components/SavedIndicator.test.jsx src/journal/App.jsx src/journal/styles/journal.css
git commit -m "Add quiet Saved indicator wired to autosave"
```

---

## Task 14: Calm base CSS — reduced motion + focus + typography

**Files:**
- Modify: `src/journal/styles/journal.css`

- [ ] **Step 1: Prepend the global resets and global ND-friendly rules to `journal.css`**

Add at the TOP of `src/journal/styles/journal.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&family=Quicksand:wght@400;500;600&display=swap');

/* Respect OS-level reduce-motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Visible focus for keyboard navigation */
:where(button, a, input, select, textarea):focus-visible {
  outline: 2px solid rgba(150, 120, 130, 0.6);
  outline-offset: 2px;
}
```

(The `:where(...)` block is a baseline — individual components also set their own `:focus-visible` styles for tighter visuals; that's fine.)

- [ ] **Step 2: Verify in the browser**

Run: `npm run dev`. Visit `?journal=new`.
- Tab through the sidebar buttons. Each one should show a visible outline ring.
- In OS Accessibility settings, toggle "Reduce motion" on; reload — there should still be no motion to reduce (Phase 1 has no animations), but the rule is in place for Phase 2+.

- [ ] **Step 3: Commit**

```bash
git add src/journal/styles/journal.css
git commit -m "Add reduce-motion + visible focus baseline to journal styles"
```

---

## Task 15: End-to-end smoke test

**Files:**
- None (this is a manual verification + a documenting commit).

- [ ] **Step 1: Run full test suite**

Run: `npm test -- --run`
Expected: every test passes, no skipped tests.

- [ ] **Step 2: Manual end-to-end check**

Run: `npm run dev` and open `http://localhost:3000/?journal=new`.

Walk through:
1. Sidebar shows all 11 categories. Hovering each one highlights it. Tabbing through them shows clear focus outlines.
2. Click **Characters**. URL becomes `/c/characters?journal=new`. List is empty with "Nothing here yet" copy.
3. Click **+ Add new character**. Type "Princess Mei". Click Create. She appears in the list.
4. Click Princess Mei. URL becomes `/c/characters/princess-mei?journal=new`. The page shows breadcrumb "Characters › Princess Mei", editable title, all fields, and a Notes section.
5. Fill in `Age` = `24`. Fill in `Tags` = `royalty, fugitive, dyer`. Type into Notes: `# Background\nShe has long dark hair.`. The rendered preview shows the heading and paragraph.
6. Watch the "Saved" indicator appear in the top corner, then quietly fade after ~2 seconds.
7. Hit browser refresh. The data persists.
8. Click **Places** in the sidebar. Click **+ Add new place**. Add "Aoli Yan". Click Aoli Yan, fill `Region` = `Northern reach`.
9. Click **Characters** → **Princess Mei**. Open the `Home` select — "Aoli Yan" should appear as an option. Pick it. Reload — selection persists.
10. Open the OLD World Bible at `http://localhost:3000/` (no `?journal=new`). It still loads, with its own data, completely independent of the new build.

If any step fails, fix it before committing. If everything works:

- [ ] **Step 3: Commit a marker so we know Phase 1 is complete**

There's nothing to add for code. Instead, write a short note in the plans folder:

Create `docs/superpowers/plans/2026-05-13-world-bible-rebuild-phase-1-DONE.md`:
```markdown
# Phase 1 complete — 2026-05-XX

Walking skeleton verified end-to-end. See [the plan](./2026-05-13-world-bible-rebuild-phase-1.md).
Next: Phase 2 (wiki links, backlinks, typeahead picker, search, focus mode, toolbar).
```

Replace `2026-05-XX` with the actual date.

Run:
```bash
git add docs/superpowers/plans/2026-05-13-world-bible-rebuild-phase-1-DONE.md
git commit -m "Phase 1 walking skeleton complete"
```

---

## Phase 1 Definition of Done

- [x] `npm test -- --run` is all-green.
- [x] `?journal=new` mounts the new journal; default URL still mounts the old World Bible.
- [x] All 11 categories visible in the sidebar.
- [x] Creating, opening, editing, and renaming items works in every non-mood category. (Mood board is rendered as just a label in the sidebar — its UI lands in Phase 3.)
- [x] Text, number, tags, link (select), linkList (checkboxes) fields all work and persist.
- [x] Markdown notes render below the textarea.
- [x] "Saved" indicator appears and fades quietly.
- [x] Reduce-motion media query is in place.
- [x] `:focus-visible` outlines are visible on every interactive element.

When all of the above are true, Phase 1 ships. We then start Phase 2 with a separate plan.

---

## Self-Review Notes (post-write)

- **Spec coverage check:** Every item in the spec's §17 "Definition of done for v1" maps to either this plan or a clearly named future phase (links/backlinks/search → Phase 2; map/mood board → Phase 3; export/import/migration → Phase 4).
- **Placeholder scan:** No "TBD" or "implement later" sentences. Every code step contains complete code.
- **Type consistency:** Field types (`text`, `number`, `tags`, `link`, `linkList`, `coords`) and category keys are spelled the same way across schemas, store, and component files.
- **Known follow-up:** Task 11 uses `dangerouslySetInnerHTML` for markdown render. This is acceptable in Phase 1 (content is the user's own) and is explicitly flagged for revisit in Phase 2 when we add wiki-link rendering — at which point we should swap to a tree-walking renderer that sanitises and inserts components for `[[links]]`.
