import { useState, useMemo } from 'react'
import { WEAPONS } from './data/weapons'
import WeaponCard from './WeaponCard'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'fellowship', label: 'Fellowship' },
  { id: 'aoli', label: 'Aoli' },
  { id: 'caerndrath', label: 'Caerndrath' },
  { id: 'solis', label: 'Solis' },
  { id: 'aurum', label: 'Aurum' },
]

export default function Armoury() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return WEAPONS
    return WEAPONS.filter((w) => w.ownerType === activeFilter)
  }, [activeFilter])

  // Group by owner
  const grouped = useMemo(() => {
    const groups = {}
    for (const w of filtered) {
      const key = w.ownerId || 'unassigned'
      if (!groups[key]) {
        groups[key] = { ownerName: w.ownerName || 'Unknown', weapons: [] }
      }
      groups[key].weapons.push(w)
    }
    return groups
  }, [filtered])

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      {/* Header */}
      <div className="section-header">
        <div className="section-title-row">
          <span className="section-icon">⚔️</span>
          <h2 className="section-title">The Armoury</h2>
        </div>
        <p className="section-subtitle">
          Weapons of every sect, every fellowship, every land
        </p>
        <p className="section-description">
          Each weapon is a card — named, labelled, described, and costed. A
          blueprint for the artists who will one day illustrate them. Click any
          card to study its labels and the style of its wielder.
        </p>
      </div>

      {/* Filter bar */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '28px',
        }}
      >
        {FILTERS.map((f) => {
          const isActive = activeFilter === f.id
          return (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              style={{
                padding: '8px 18px',
                border: `1px solid ${isActive ? 'rgba(150,120,130,0.45)' : 'rgba(180,170,160,0.25)'}`,
                borderRadius: '20px',
                background: isActive
                  ? 'rgba(150,120,130,0.12)'
                  : 'rgba(255,252,248,0.7)',
                color: isActive ? '#4a3a2e' : 'rgba(100,85,70,0.6)',
                cursor: 'pointer',
                fontFamily: "'Quicksand', sans-serif",
                fontSize: '0.82rem',
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s ease',
              }}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {/* Empty state */}
      {Object.keys(grouped).length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'rgba(120, 100, 85, 0.35)',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontSize: '1.1rem',
          }}
        >
          No weapons in this category yet. The forge is still warm.
        </div>
      )}

      {/* Groups */}
      {Object.entries(grouped).map(([ownerId, group]) => (
        <div key={ownerId} style={{ marginBottom: '42px' }}>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1.4rem',
              fontWeight: 500,
              color: '#4a3a2e',
              margin: '0 0 16px',
              letterSpacing: '0.04em',
              borderBottom: '1px solid rgba(160,130,140,0.15)',
              paddingBottom: '8px',
            }}
          >
            {group.ownerName}
            <span
              style={{
                fontSize: '0.72rem',
                color: 'rgba(100,85,70,0.45)',
                marginLeft: '10px',
                fontStyle: 'italic',
              }}
            >
              ({group.weapons.length}{' '}
              {group.weapons.length === 1 ? 'weapon' : 'weapons'})
            </span>
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
              gap: '28px',
              justifyItems: 'start',
            }}
          >
            {group.weapons.map((w) => (
              <WeaponCard key={w.id} weapon={w} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
