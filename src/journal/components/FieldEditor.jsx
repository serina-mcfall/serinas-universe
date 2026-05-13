import { useId } from 'react'
import { useJournal } from '../state/store'

export default function FieldEditor({ field, value, onChange }) {
  const id = useId()

  switch (field.type) {
    case 'text':
      return (
        <div className="journal-field">
          <label className="journal-field__label" htmlFor={id}>
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
