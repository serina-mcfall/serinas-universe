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

  const singular = cat.label.toLowerCase().replace(/s$/, '')

  return (
    <section className="journal-category">
      <h1 className="journal-category__title">{cat.label}</h1>

      {!adding && (
        <button
          type="button"
          className="journal-btn"
          onClick={() => setAdding(true)}
        >
          + Add new {singular}
        </button>
      )}

      {adding && (
        <form className="journal-add-form" onSubmit={handleCreate}>
          <label className="journal-add-form__label">
            New {singular} name
            <input
              autoFocus
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              aria-label={`New ${singular} name`}
            />
          </label>
          <div className="journal-add-form__actions">
            <button type="submit" className="journal-btn">Create</button>
            <button
              type="button"
              className="journal-btn journal-btn--ghost"
              onClick={() => { setAdding(false); setNewName('') }}
            >
              Cancel
            </button>
          </div>
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
