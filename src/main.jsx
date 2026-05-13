import React from 'react'
import ReactDOM from 'react-dom/client'
import WorldBible from './WorldBible'
import JournalApp from './journal/App'
import './WorldBible.css'

const useNewJournal =
  new URLSearchParams(window.location.search).get('journal') === 'new'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {useNewJournal ? <JournalApp /> : <WorldBible />}
  </React.StrictMode>,
)
