import { useState, useEffect } from 'react'
import { extractCharacterText } from './data/characters'

export default function CharacterGallery({ characters, entryText }) {
  const [selectedIdx, setSelectedIdx] = useState(null)

  // Close on Escape
  useEffect(() => {
    if (selectedIdx === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedIdx(null)
      if (e.key === 'ArrowRight')
        setSelectedIdx((i) => (i + 1) % characters.length)
      if (e.key === 'ArrowLeft')
        setSelectedIdx((i) => (i - 1 + characters.length) % characters.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedIdx, characters.length])

  if (!characters || characters.length === 0) return null

  const selected = selectedIdx !== null ? characters[selectedIdx] : null
  const selectedText = selected ? extractCharacterText(entryText, selected.searchName) : ''

  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: 'rgba(100, 85, 70, 0.45)',
          marginBottom: '10px',
          fontFamily: "'Quicksand', sans-serif",
        }}
      >
        Characters
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px',
          padding: '4px 0 2px',
        }}
      >
        {characters.map((c, i) => (
          <button
            key={c.image}
            onClick={() => setSelectedIdx(i)}
            className="char-chip"
            title={c.title || c.name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              padding: 0,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              width: '84px',
              transition: 'transform 0.2s ease',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid rgba(160, 130, 140, 0.25)',
                boxShadow: '0 2px 8px rgba(100, 80, 60, 0.12)',
                background: 'rgba(255, 252, 248, 0.7)',
                transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
              }}
            >
              <img
                src={encodeURI(c.image)}
                alt={c.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '0.78rem',
                color: '#4a3a2e',
                textAlign: 'center',
                lineHeight: 1.15,
                fontWeight: 500,
              }}
            >
              {c.name}
            </span>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          onClick={() => setSelectedIdx(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(40, 30, 25, 0.75)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(170deg, #f5efe6 0%, #ebe3d7 100%)',
              borderRadius: '14px',
              maxWidth: '1100px',
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'row',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              position: 'relative',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedIdx(null)}
              style={{
                position: 'absolute',
                top: 12,
                right: 14,
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '1px solid rgba(150,130,120,0.3)',
                background: 'rgba(255,252,248,0.9)',
                color: '#5a4a3a',
                fontSize: '1.1rem',
                cursor: 'pointer',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
              }}
            >
              ×
            </button>

            {/* Prev / Next buttons */}
            {characters.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedIdx(
                      (selectedIdx - 1 + characters.length) % characters.length
                    )
                  }
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 10,
                    transform: 'translateY(-50%)',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1px solid rgba(150,130,120,0.3)',
                    background: 'rgba(255,252,248,0.9)',
                    color: '#5a4a3a',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    zIndex: 2,
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={() =>
                    setSelectedIdx((selectedIdx + 1) % characters.length)
                  }
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: 10,
                    transform: 'translateY(-50%)',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1px solid rgba(150,130,120,0.3)',
                    background: 'rgba(255,252,248,0.9)',
                    color: '#5a4a3a',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    zIndex: 2,
                  }}
                >
                  ›
                </button>
              </>
            )}

            {/* Portrait side */}
            <div
              style={{
                flex: '0 0 45%',
                minWidth: 320,
                background: 'rgba(40, 30, 25, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 30px',
              }}
            >
              <img
                src={encodeURI(selected.image)}
                alt={selected.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 8px 24px rgba(40,30,25,0.3)',
                }}
              />
            </div>

            {/* Text side */}
            <div
              style={{
                flex: 1,
                padding: '36px 40px 32px',
                overflowY: 'auto',
                maxHeight: '90vh',
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.8rem',
                  fontWeight: 500,
                  color: '#3a2818',
                  margin: '0 0 4px',
                  letterSpacing: '0.03em',
                }}
              >
                {selected.name}
              </h2>
              {selected.title && (
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1rem',
                    fontStyle: 'italic',
                    color: 'rgba(100, 70, 40, 0.75)',
                    margin: '0 0 18px',
                  }}
                >
                  {selected.title}
                </p>
              )}

              {/* Bio stats */}
              {selected.stats && Object.values(selected.stats).some((v) => v) && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    columnGap: '14px',
                    rowGap: '6px',
                    padding: '14px 16px',
                    marginBottom: '18px',
                    background: 'rgba(150, 120, 130, 0.06)',
                    border: '1px solid rgba(160, 130, 140, 0.15)',
                    borderRadius: '8px',
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: '0.78rem',
                  }}
                >
                  {selected.stats.hair && (
                    <>
                      <span style={{ color: 'rgba(100, 85, 70, 0.55)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.66rem', alignSelf: 'start', paddingTop: '2px' }}>Hair</span>
                      <span style={{ color: 'rgba(70, 55, 40, 0.9)', lineHeight: 1.5 }}>{selected.stats.hair}</span>
                    </>
                  )}
                  {selected.stats.eyes && (
                    <>
                      <span style={{ color: 'rgba(100, 85, 70, 0.55)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.66rem', alignSelf: 'start', paddingTop: '2px' }}>Eyes</span>
                      <span style={{ color: 'rgba(70, 55, 40, 0.9)', lineHeight: 1.5 }}>{selected.stats.eyes}</span>
                    </>
                  )}
                  {selected.stats.height && (
                    <>
                      <span style={{ color: 'rgba(100, 85, 70, 0.55)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.66rem', alignSelf: 'start', paddingTop: '2px' }}>Build</span>
                      <span style={{ color: 'rgba(70, 55, 40, 0.9)', lineHeight: 1.5 }}>{selected.stats.height}</span>
                    </>
                  )}
                  {selected.stats.attire && (
                    <>
                      <span style={{ color: 'rgba(100, 85, 70, 0.55)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.66rem', alignSelf: 'start', paddingTop: '2px' }}>Attire</span>
                      <span style={{ color: 'rgba(70, 55, 40, 0.9)', lineHeight: 1.5 }}>{selected.stats.attire}</span>
                    </>
                  )}
                </div>
              )}

              {/* Quote */}
              {selected.quote && (
                <blockquote
                  style={{
                    margin: '0 0 20px',
                    padding: '14px 18px 14px 20px',
                    borderLeft: '3px solid rgba(170, 120, 140, 0.5)',
                    background: 'rgba(255, 252, 248, 0.6)',
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1.05rem',
                    fontStyle: 'italic',
                    color: 'rgba(80, 60, 45, 0.9)',
                    lineHeight: 1.55,
                    borderRadius: '0 6px 6px 0',
                  }}
                >
                  "{selected.quote}"
                </blockquote>
              )}

              <div
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: '0.87rem',
                  color: 'rgba(70, 55, 40, 0.9)',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {selectedText || (
                  <em style={{ color: 'rgba(120, 100, 85, 0.5)' }}>
                    No text found for this character yet.
                  </em>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .char-chip:hover > div {
          border-color: rgba(170, 120, 140, 0.5) !important;
          box-shadow: 0 4px 14px rgba(120, 80, 80, 0.2) !important;
        }
        .char-chip:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  )
}
