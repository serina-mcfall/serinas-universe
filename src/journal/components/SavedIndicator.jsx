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
