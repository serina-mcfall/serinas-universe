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
