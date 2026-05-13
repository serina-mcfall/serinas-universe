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
