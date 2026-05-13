import { useEffect, useState } from 'react'
import '@fontsource/opendyslexic/400.css'
import '@fontsource/opendyslexic/400-italic.css'
import '@fontsource/opendyslexic/700.css'
import '@fontsource/opendyslexic/700-italic.css'
import { JournalProvider } from './state/store'
import Sidebar from './components/Sidebar'
import CategoryView from './components/CategoryView'
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
        <Sidebar activeCategory={route.kind === 'home' ? null : route.category} />
        <main className="journal-main">
          {route.kind === 'home' && (
            <p className="journal-home-hint">Pick a category to start.</p>
          )}
          {route.kind === 'category' && (
            <CategoryView category={route.category} />
          )}
          {route.kind === 'item' && (
            <ItemView category={route.category} id={route.id} />
          )}
        </main>
      </div>
    </JournalProvider>
  )
}
