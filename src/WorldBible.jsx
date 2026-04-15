import { useState, useEffect, useRef, useCallback } from 'react'
import { SECTIONS, MOOD_CATEGORIES } from './data/sections'
import { INITIAL_ENTRIES } from './data/initial-entries'
import { CHARACTERS } from './data/characters'
import WorldMap from './WorldMap'
import CharacterGallery from './CharacterGallery'
import Armoury from './Armoury'

function WorldBible() {
  const [activeSection, setActiveSection] = useState('cosmology')
  const [entries, setEntries] = useState({})
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedPrompt, setExpandedPrompt] = useState(null)
  const [wordCounts, setWordCounts] = useState({})
  const [moodBoard, setMoodBoard] = useState({})
  const [activeMoodCat, setActiveMoodCat] = useState('aoli-yan')
  const textareaRefs = useRef({})
  const fileInputRef = useRef(null)

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('world-bible-entries')
      if (saved) {
        const parsed = JSON.parse(saved)
        const merged = { ...INITIAL_ENTRIES }
        Object.keys(parsed).forEach((key) => {
          if (!INITIAL_ENTRIES[key]) {
            merged[key] = parsed[key]
          }
        })
        setEntries(merged)
      } else {
        setEntries({ ...INITIAL_ENTRIES })
      }
    } catch {
      setEntries({ ...INITIAL_ENTRIES })
    }

    try {
      const mb = localStorage.getItem('world-bible-moodboard')
      if (mb) setMoodBoard(JSON.parse(mb))
    } catch { /* fresh start */ }

    setLoaded(true)
  }, [])

  // Auto-save entries
  useEffect(() => {
    if (!loaded) return
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('world-bible-entries', JSON.stringify(entries))
        setSaving(true)
        setTimeout(() => setSaving(false), 800)
      } catch { /* storage full */ }
    }, 1000)
    return () => clearTimeout(timer)
  }, [entries, loaded])

  // Auto-save mood board
  useEffect(() => {
    if (!loaded) return
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('world-bible-moodboard', JSON.stringify(moodBoard))
      } catch { /* storage full */ }
    }, 1000)
    return () => clearTimeout(timer)
  }, [moodBoard, loaded])

  // Calculate word counts
  useEffect(() => {
    const counts = {}
    SECTIONS.forEach((s) => {
      let total = 0
      s.prompts.forEach((p) => {
        const t = entries[`${s.id}-${p.id}`] || ''
        total += t.trim() ? t.trim().split(/\s+/).length : 0
      })
      counts[s.id] = total
    })
    setWordCounts(counts)
  }, [entries])

  const handleChange = (sid, pid, val) => {
    setEntries((prev) => ({ ...prev, [`${sid}-${pid}`]: val }))
  }

  const getFilledCount = (sid) => {
    const s = SECTIONS.find((x) => x.id === sid)
    return s.prompts.filter((p) => (entries[`${sid}-${p.id}`] || '').trim().length > 0).length
  }

  const totalFilled = SECTIONS.reduce((a, s) => a + getFilledCount(s.id), 0)
  const totalPrompts = SECTIONS.reduce((a, s) => a + s.prompts.length, 0)
  const totalWords = Object.values(wordCounts).reduce((a, b) => a + b, 0)
  const totalImages = Object.values(moodBoard).reduce((a, arr) => a + (arr ? arr.length : 0), 0)
  const currentSection = SECTIONS.find((s) => s.id === activeSection)

  const autoResize = useCallback((el) => {
    if (el) {
      el.style.height = 'auto'
      const maxH = window.innerHeight * 0.7
      if (el.scrollHeight > maxH) {
        el.style.height = maxH + 'px'
        el.style.overflowY = 'auto'
      } else {
        el.style.height = el.scrollHeight + 'px'
        el.style.overflowY = 'hidden'
      }
    }
  }, [])

  useEffect(() => {
    Object.values(textareaRefs.current).forEach(autoResize)
  }, [activeSection, autoResize])

  const handleExport = () => {
    let t = '\u2550'.repeat(39) + '\n         THE WORLD BIBLE\n         A Universe Awaits\n' + '\u2550'.repeat(39) + '\n\n'
    SECTIONS.forEach((s) => {
      t += '\n' + '\u2500'.repeat(40) + '\n' + s.icon + '  ' + s.title.toUpperCase() + '\n' + s.subtitle + '\n' + '\u2500'.repeat(40) + '\n\n'
      s.prompts.forEach((p) => {
        const v = entries[`${s.id}-${p.id}`] || ''
        t += '\u25B8 ' + p.label + '\n' + (v.trim() ? v + '\n\n' : '[Not yet written]\n\n')
      })
    })
    t += '\n' + '\u2550'.repeat(40) + '\nTotal words: ' + totalWords + '\nSections filled: ' + totalFilled + '/' + totalPrompts + '\n' + '\u2550'.repeat(40) + '\n'
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([t], { type: 'text/plain' }))
    a.download = 'world-bible.txt'
    a.click()
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear ALL entries? This cannot be undone.\n\n(Pre-populated lore will remain, but anything you\u2019ve added will be lost.)')) {
      setEntries({ ...INITIAL_ENTRIES })
      try { localStorage.removeItem('world-bible-entries') } catch { /* ok */ }
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const img = {
          id: Date.now() + Math.random(),
          src: ev.target.result,
          label: file.name.replace(/\.[^.]+$/, ''),
          note: '',
        }
        setMoodBoard((prev) => ({
          ...prev,
          [activeMoodCat]: [...(prev[activeMoodCat] || []), img],
        }))
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const removeImage = (catId, imgId) => {
    setMoodBoard((prev) => ({
      ...prev,
      [catId]: (prev[catId] || []).filter((i) => i.id !== imgId),
    }))
  }

  const updateImageLabel = (catId, imgId, label) => {
    setMoodBoard((prev) => ({
      ...prev,
      [catId]: (prev[catId] || []).map((i) => (i.id === imgId ? { ...i, label } : i)),
    }))
  }

  const updateImageNote = (catId, imgId, note) => {
    setMoodBoard((prev) => ({
      ...prev,
      [catId]: (prev[catId] || []).map((i) => (i.id === imgId ? { ...i, note } : i)),
    }))
  }

  const navigateSection = (id) => {
    setActiveSection(id)
    setSidebarOpen(false)
    setExpandedPrompt(null)
  }

  if (!loaded) {
    return (
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.3rem', fontStyle: 'italic', color: '#6b5a4a', opacity: 0.7 }}>
          Unrolling the scroll...
        </p>
      </div>
    )
  }

  const sIdx = SECTIONS.findIndex((s) => s.id === activeSection)
  const prev = sIdx > 0 ? SECTIONS[sIdx - 1] : null
  const next = sIdx < SECTIONS.length - 1 ? SECTIONS[sIdx + 1] : null

  return (
    <div className="app-container">
      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="floating-orb"
          style={{
            width: 12 + i * 4 + 'px',
            height: 12 + i * 4 + 'px',
            background: i % 2 === 0
              ? 'radial-gradient(circle, rgba(200,150,160,.25), rgba(200,150,160,.05))'
              : 'radial-gradient(circle, rgba(150,180,170,.2), rgba(150,180,170,.04))',
            top: (10 + i * 14) + '%',
            left: (5 + i * 16) + '%',
            animation: `float ${4 + i * 1.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}

      {/* Header */}
      <header>
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            background: 'none',
            border: '1px solid rgba(150,130,120,.25)',
            color: '#5a4a3a',
            fontSize: '1.3rem',
            padding: '6px 10px',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          ☰
        </button>
        <div style={{ flex: 1 }}>
          <h1>
            <span style={{ opacity: 0.4, marginRight: '10px' }}>文</span>
            The World Bible
          </h1>
          <p className="subtitle">A universe awaits your words</p>
        </div>
        <div style={{ textAlign: 'right', fontSize: '.75rem', color: 'rgba(110,90,75,.55)', position: 'relative' }}>
          <div>{totalWords.toLocaleString()} words</div>
          <div>{totalFilled}/{totalPrompts} entries</div>
          {saving && <div className="save-indicator">saved ✓</div>}
        </div>
      </header>

      {/* Content */}
      <div className="content-wrapper">
        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

        {/* Sidebar */}
        <nav className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          {SECTIONS.map((section) => {
            const filled = getFilledCount(section.id)
            const total = section.prompts.length
            const isActive = activeSection === section.id
            const bgColor = filled === total ? 'rgba(90,150,110,.12)' : filled > 0 ? 'rgba(180,140,80,.1)' : 'rgba(140,130,120,.06)'
            const textColor = filled === total ? 'rgba(60,120,80,.85)' : filled > 0 ? 'rgba(150,110,50,.75)' : 'rgba(130,115,100,.4)'
            return (
              <button
                key={section.id}
                className={`nav-btn ${isActive ? 'active' : ''}`}
                onClick={() => navigateSection(section.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                  border: 'none', borderLeft: '2px solid transparent', borderRadius: '0 8px 8px 0',
                  background: 'transparent', color: isActive ? '#4a3a2e' : 'rgba(100,85,70,.55)',
                  cursor: 'pointer', transition: 'all .25s ease', textAlign: 'left',
                  fontFamily: "'Quicksand', sans-serif", fontSize: '.85rem',
                  fontWeight: isActive ? 600 : 400, width: '100%',
                }}
              >
                <span style={{ fontSize: '1.1rem', width: '24px', textAlign: 'center' }}>{section.icon}</span>
                <span style={{ flex: 1 }}>{section.title}</span>
                <span style={{ fontSize: '.65rem', padding: '2px 6px', borderRadius: '10px', background: bgColor, color: textColor }}>
                  {filled}/{total}
                </span>
              </button>
            )
          })}

          <div style={{ height: '8px' }} />

          {/* Atlas nav */}
          <button
            className={`nav-btn ${activeSection === 'atlas' ? 'active' : ''}`}
            onClick={() => navigateSection('atlas')}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
              border: 'none', borderLeft: '2px solid transparent', borderRadius: '0 8px 8px 0',
              background: 'transparent', color: activeSection === 'atlas' ? '#4a3a2e' : 'rgba(100,85,70,.55)',
              cursor: 'pointer', transition: 'all .25s ease', textAlign: 'left',
              fontFamily: "'Quicksand', sans-serif", fontSize: '.85rem',
              fontWeight: activeSection === 'atlas' ? 600 : 400, width: '100%',
            }}
          >
            <span style={{ fontSize: '1.1rem', width: '24px', textAlign: 'center' }}>🗺️</span>
            <span style={{ flex: 1 }}>The Atlas</span>
          </button>

          {/* Armoury nav */}
          <button
            className={`nav-btn ${activeSection === 'armoury' ? 'active' : ''}`}
            onClick={() => navigateSection('armoury')}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
              border: 'none', borderLeft: '2px solid transparent', borderRadius: '0 8px 8px 0',
              background: 'transparent', color: activeSection === 'armoury' ? '#4a3a2e' : 'rgba(100,85,70,.55)',
              cursor: 'pointer', transition: 'all .25s ease', textAlign: 'left',
              fontFamily: "'Quicksand', sans-serif", fontSize: '.85rem',
              fontWeight: activeSection === 'armoury' ? 600 : 400, width: '100%',
            }}
          >
            <span style={{ fontSize: '1.1rem', width: '24px', textAlign: 'center' }}>⚔️</span>
            <span style={{ flex: 1 }}>The Armoury</span>
          </button>

          {/* Mood Board nav */}
          <button
            className={`nav-btn ${activeSection === 'moodboard' ? 'active' : ''}`}
            onClick={() => navigateSection('moodboard')}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
              border: 'none', borderLeft: '2px solid transparent', borderRadius: '0 8px 8px 0',
              background: 'transparent', color: activeSection === 'moodboard' ? '#4a3a2e' : 'rgba(100,85,70,.55)',
              cursor: 'pointer', transition: 'all .25s ease', textAlign: 'left',
              fontFamily: "'Quicksand', sans-serif", fontSize: '.85rem',
              fontWeight: activeSection === 'moodboard' ? 600 : 400, width: '100%',
            }}
          >
            <span style={{ fontSize: '1.1rem', width: '24px', textAlign: 'center' }}>🖼️</span>
            <span style={{ flex: 1 }}>Mood Board</span>
            <span style={{
              fontSize: '.65rem', padding: '2px 6px', borderRadius: '10px',
              background: totalImages > 0 ? 'rgba(180,140,80,.1)' : 'rgba(140,130,120,.06)',
              color: totalImages > 0 ? 'rgba(150,110,50,.75)' : 'rgba(130,115,100,.4)',
            }}>
              {totalImages}
            </span>
          </button>

          <div style={{ flex: 1 }} />

          <div className="nav-footer">
            <button className="action-btn" onClick={handleExport} style={{
              padding: '8px 14px', border: '1px solid rgba(150,130,120,.2)', borderRadius: '8px',
              background: 'rgba(150,130,120,.05)', color: 'rgba(90,75,60,.65)', cursor: 'pointer',
              fontFamily: "'Quicksand', sans-serif", fontSize: '.78rem', transition: 'all .2s ease',
            }}>
              📄 Export as Text
            </button>
            <button className="action-btn" onClick={handleReset} style={{
              padding: '8px 14px', border: '1px solid rgba(180,110,110,.18)', borderRadius: '8px',
              background: 'transparent', color: 'rgba(160,100,100,.5)', cursor: 'pointer',
              fontFamily: "'Quicksand', sans-serif", fontSize: '.72rem', transition: 'all .2s ease',
            }}>
              Reset All
            </button>
          </div>
        </nav>

        {/* Main content */}
        <main style={activeSection === 'atlas' ? { padding: 0, overflow: 'hidden' } : undefined}>
          {activeSection === 'atlas' ? (
            <WorldMap />
          ) : activeSection === 'armoury' ? (
            <Armoury />
          ) : activeSection === 'moodboard' ? (
            /* Mood Board */
            <div style={{ animation: 'fadeIn .5s ease' }}>
              <div className="section-header">
                <div className="section-title-row">
                  <span className="section-icon">🖼️</span>
                  <h2 className="section-title">Mood Board</h2>
                </div>
                <p className="section-subtitle">The gallery of visions</p>
                <p className="section-description">
                  Collect your inspirations — character references, location moods, aesthetic ideas, artifact concepts.
                  Everything that helps you SEE your world.
                </p>
              </div>

              <div className="mood-categories">
                {MOOD_CATEGORIES.map((cat) => {
                  const isActive = activeMoodCat === cat.id
                  const count = (moodBoard[cat.id] || []).length
                  return (
                    <button
                      key={cat.id}
                      className="mood-cat-btn"
                      onClick={() => setActiveMoodCat(cat.id)}
                      style={{
                        border: `1px solid ${isActive ? 'rgba(150,120,130,.4)' : 'rgba(180,170,160,.25)'}`,
                        background: isActive ? 'rgba(150,120,130,.1)' : 'rgba(255,252,248,.7)',
                        color: isActive ? '#4a3a2e' : 'rgba(100,85,70,.5)',
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {cat.icon} {cat.label} {count > 0 && <span style={{ marginLeft: '4px', opacity: 0.5 }}>({count})</span>}
                    </button>
                  )
                })}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <button className="upload-btn" onClick={() => fileInputRef.current?.click()}>
                + Add images to {MOOD_CATEGORIES.find((c) => c.id === activeMoodCat)?.label}
              </button>

              <div className="mood-grid">
                {(moodBoard[activeMoodCat] || []).length === 0 ? (
                  <div className="mood-empty">No visions yet... upload images to begin</div>
                ) : (
                  (moodBoard[activeMoodCat] || []).map((img, idx) => (
                    <div key={img.id} className="prompt-card mood-image-card" style={{ animationDelay: `${idx * 0.05}s`, opacity: 0 }}>
                      <div className="mood-image-wrapper">
                        <img src={img.src} alt={img.label} />
                        <button className="mood-remove-btn" onClick={() => removeImage(activeMoodCat, img.id)}>✕</button>
                      </div>
                      <div className="mood-image-info">
                        <input
                          defaultValue={img.label}
                          onBlur={(e) => updateImageLabel(activeMoodCat, img.id, e.target.value)}
                          placeholder="Name this image..."
                        />
                        <textarea
                          defaultValue={img.note || ''}
                          onBlur={(e) => updateImageNote(activeMoodCat, img.id, e.target.value)}
                          placeholder="Notes, prompts, ideas..."
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : currentSection ? (
            /* Regular section */
            <>
              <div className="section-header">
                <div className="section-title-row">
                  <span className="section-icon">{currentSection.icon}</span>
                  <h2 className="section-title">{currentSection.title}</h2>
                </div>
                <p className="section-subtitle">{currentSection.subtitle}</p>
                <p className="section-description">{currentSection.description}</p>
                {wordCounts[activeSection] > 0 && (
                  <div className="section-word-count">
                    {wordCounts[activeSection]?.toLocaleString()} words in this section
                  </div>
                )}
              </div>

              <div className="prompts-list">
                {currentSection.prompts.map((prompt, index) => {
                  const key = `${currentSection.id}-${prompt.id}`
                  const value = entries[key] || ''
                  const hasContent = value.trim().length > 0
                  const isExpanded = expandedPrompt === key || hasContent
                  const words = value.trim() ? value.trim().split(/\s+/).length : 0

                  return (
                    <div
                      key={key}
                      className="prompt-card"
                      style={{
                        animationDelay: `${index * 0.07}s`,
                        opacity: 0,
                        background: 'rgba(255,252,248,.7)',
                        border: `1px solid ${hasContent ? 'rgba(160,130,140,.18)' : 'rgba(185,175,165,.25)'}`,
                        borderRadius: '12px',
                        overflow: 'hidden',
                        transition: 'border-color .3s ease',
                        ...(hasContent ? { animation: `fadeIn .4s ease ${index * 0.07}s forwards, pulseGlow 4s ease-in-out infinite` } : {}),
                      }}
                    >
                      <button
                        className="prompt-button"
                        onClick={() => setExpandedPrompt(expandedPrompt === key ? null : key)}
                        style={{ color: hasContent ? '#4a3a2e' : 'rgba(100,85,70,.5)' }}
                      >
                        <span className="prompt-dot" style={{ background: hasContent ? 'rgba(90,150,110,.6)' : 'rgba(180,170,160,.3)' }} />
                        <span style={{ flex: 1 }}>{prompt.label}</span>
                        <span className="prompt-arrow" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
                      </button>
                      {isExpanded && (
                        <div style={{ padding: '0 18px 16px' }}>
                          {CHARACTERS[key] && (
                            <CharacterGallery characters={CHARACTERS[key]} />
                          )}
                          <textarea
                            ref={(el) => {
                              textareaRefs.current[key] = el
                              if (el) autoResize(el)
                            }}
                            className="entry-textarea"
                            value={value}
                            onChange={(e) => {
                              handleChange(currentSection.id, prompt.id, e.target.value)
                              autoResize(e.target)
                            }}
                            placeholder={prompt.placeholder}
                          />
                          {hasContent && <div className="word-count">{words} words</div>}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="page-nav">
                {prev ? (
                  <button className="page-nav-btn action-btn" onClick={() => navigateSection(prev.id)}>
                    ← {prev.icon} {prev.title}
                  </button>
                ) : <div />}
                {next ? (
                  <button className="page-nav-btn action-btn" onClick={() => navigateSection(next.id)}>
                    {next.icon} {next.title} →
                  </button>
                ) : <div />}
              </div>
            </>
          ) : null}
        </main>
      </div>
    </div>
  )
}

export default WorldBible
