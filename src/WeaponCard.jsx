// WeaponCard — renders a single weapon as an atmospheric trading card
// styled after Serina's inspiration references (Bitten Jade, The Bounty, etc.)

export default function WeaponCard({ weapon }) {
  const hasImage = weapon.image && weapon.image.trim() !== ''

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '460px',
        background:
          'linear-gradient(165deg, #1a1410 0%, #261c16 45%, #14100c 100%)',
        border: '1px solid rgba(170, 130, 90, 0.35)',
        borderRadius: '14px',
        boxShadow:
          '0 12px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(220,180,120,0.12)',
        overflow: 'hidden',
        fontFamily: "'Quicksand', sans-serif",
        color: 'rgba(230, 210, 180, 0.9)',
      }}
    >
      {/* Ornamental top band */}
      <div
        style={{
          padding: '18px 22px 12px',
          borderBottom: '1px solid rgba(170, 130, 90, 0.2)',
          background:
            'linear-gradient(180deg, rgba(90,60,30,0.25) 0%, rgba(0,0,0,0) 100%)',
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.6rem',
            fontWeight: 500,
            color: 'rgba(240, 210, 160, 0.95)',
            letterSpacing: '0.04em',
            lineHeight: 1.1,
          }}
        >
          {weapon.name}
        </div>
        {weapon.subtitle && (
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '0.92rem',
              fontStyle: 'italic',
              color: 'rgba(200, 160, 110, 0.65)',
              marginTop: '3px',
            }}
          >
            {weapon.subtitle}
          </div>
        )}
        {weapon.category && (
          <div
            style={{
              fontSize: '0.62rem',
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: 'rgba(180, 140, 90, 0.55)',
              marginTop: '8px',
            }}
          >
            {weapon.category}
          </div>
        )}
      </div>

      {/* Image area */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '4 / 3',
          background:
            'radial-gradient(ellipse at center, rgba(60,40,20,0.3) 0%, rgba(10,8,6,0.6) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid rgba(170, 130, 90, 0.2)',
        }}
      >
        {hasImage ? (
          <img
            src={encodeURI(weapon.image)}
            alt={weapon.name}
            style={{
              maxWidth: '85%',
              maxHeight: '85%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.6))',
            }}
          />
        ) : (
          <div
            style={{
              color: 'rgba(200, 160, 110, 0.3)',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '1rem',
              fontStyle: 'italic',
              textAlign: 'center',
              padding: '20px',
            }}
          >
            image not yet forged
          </div>
        )}
      </div>

      {/* Labels */}
      {weapon.labels && weapon.labels.length > 0 && (
        <div style={{ padding: '16px 22px 8px' }}>
          {weapon.labels.map((label, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                columnGap: '12px',
                padding: '8px 0',
                borderBottom:
                  i < weapon.labels.length - 1
                    ? '1px dashed rgba(170, 130, 90, 0.12)'
                    : 'none',
              }}
            >
              <div
                style={{
                  fontSize: '0.66rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'rgba(220, 170, 100, 0.75)',
                  paddingTop: '2px',
                  fontWeight: 600,
                  minWidth: '90px',
                }}
              >
                {label.feature}
              </div>
              <div
                style={{
                  fontSize: '0.78rem',
                  lineHeight: 1.5,
                  color: 'rgba(220, 200, 170, 0.82)',
                }}
              >
                {label.description}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      {weapon.description && (
        <div
          style={{
            padding: '14px 22px 16px',
            borderTop: '1px solid rgba(170, 130, 90, 0.15)',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '0.92rem',
            fontStyle: 'italic',
            color: 'rgba(210, 180, 140, 0.8)',
            lineHeight: 1.6,
          }}
        >
          {weapon.description}
        </div>
      )}

      {/* Style line */}
      {weapon.style && (
        <div
          style={{
            padding: '10px 22px',
            borderTop: '1px solid rgba(170, 130, 90, 0.15)',
            fontSize: '0.75rem',
            color: 'rgba(200, 170, 130, 0.75)',
          }}
        >
          <span
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'rgba(220, 170, 100, 0.6)',
              fontSize: '0.62rem',
              marginRight: '8px',
            }}
          >
            Style
          </span>
          {weapon.style}
        </div>
      )}

      {/* Cost — trading card footer */}
      {weapon.cost && (
        <div
          style={{
            padding: '10px 22px 16px',
            borderTop: '1px solid rgba(170, 130, 90, 0.2)',
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(60,30,15,0.3) 100%)',
            display: 'flex',
            alignItems: 'baseline',
            gap: '10px',
          }}
        >
          <span
            style={{
              fontSize: '0.62rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'rgba(220, 120, 80, 0.75)',
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            Cost
          </span>
          <span
            style={{
              fontSize: '0.78rem',
              fontStyle: 'italic',
              color: 'rgba(220, 180, 140, 0.9)',
              lineHeight: 1.45,
            }}
          >
            {weapon.cost}
          </span>
        </div>
      )}
    </div>
  )
}
