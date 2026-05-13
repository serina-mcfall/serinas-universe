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
        placeholder="Write whatever you want here. Markdown works: # heading, **bold**, *italic*, - bullet."
      />
      <div
        className="journal-notes__preview"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
