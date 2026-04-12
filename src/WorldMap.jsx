import { useState, useRef, useEffect } from 'react'

// ═══════════════════════════════════════
// REGION DEFINITIONS
// ═══════════════════════════════════════

const REGIONS = [
  {
    id: 'aoli',
    name: 'Aoli',
    subtitle: 'The Breathing Land',
    description:
      'Xianxia cultivation civilisation. The land is alive — air, rivers, mountains, trees carry memory and magic. Home of the Six Sects. Protected in the far north behind the Dragon Spine Mountains.',
    fill: '#e6d4b0',
    stroke: '#a68a60',
    path: 'M 120 80 L 1080 80 L 1080 320 L 980 350 L 820 340 L 680 360 L 520 340 L 380 360 L 220 340 L 120 320 Z',
    labelX: 600,
    labelY: 180,
  },
  {
    id: 'braedun',
    name: 'Braedun',
    subtitle: 'The Wild Crags',
    description:
      'Celtic highlands. Wild, untamed, riders and druids. The Earth Twin hides here as the original druid, teaching the old ways for centuries.',
    fill: '#b8c890',
    stroke: '#6e8048',
    group: 'caerndrath',
    path: 'M 120 420 L 320 420 L 360 480 L 340 560 L 280 610 L 180 610 L 120 570 Z',
    labelX: 240,
    labelY: 510,
  },
  {
    id: 'isenholt',
    name: 'Isenholt',
    subtitle: 'The Frozen Watch',
    description:
      'Mongolian-Scandinavian frozen province. Fjords, steppes, deep mountain passes. Six beast-bonded clans. God-touched women hidden behind veils. The wall between worlds.',
    fill: '#c4ccd6',
    stroke: '#6a7684',
    group: 'caerndrath',
    path: 'M 780 420 L 1080 420 L 1080 600 L 960 620 L 840 600 L 780 540 Z',
    labelX: 930,
    labelY: 510,
  },
  {
    id: 'ardenmere',
    name: 'Ardenmere',
    subtitle: 'The Breadbasket',
    description:
      'English/French farmland. Rolling countryside. Enslaved peasants with sleeping earth magic in their blood — the land responds to their touch but they think it is luck. Revolution waiting to happen.',
    fill: '#dcc888',
    stroke: '#9a8340',
    group: 'caerndrath',
    path: 'M 340 480 L 560 460 L 760 480 L 780 600 L 700 680 L 540 700 L 400 680 L 340 580 Z',
    labelX: 560,
    labelY: 580,
  },
  {
    id: 'tyramare',
    name: 'Tyramare',
    subtitle: 'Beauty With Poison',
    description:
      'Mediterranean coastal province. Venice meets Alexandria. Seven guild districts, a corrupt faith, a stolen palace, and an empty throne that waits. Island city connected by canals.',
    fill: '#d4a878',
    stroke: '#8e5e30',
    group: 'caerndrath',
    path: 'M 780 600 L 900 590 L 1020 620 L 1080 700 L 1050 820 L 940 830 L 830 790 L 800 700 Z',
    labelX: 920,
    labelY: 710,
  },
  {
    id: 'maramir',
    name: 'Maramir',
    subtitle: 'The Shadow Sands',
    description:
      'Middle Eastern / nomadic desert. Ruled by the Shadow Prince Yuè\u2019àn whose face nobody knows. Mirage magic and assassination. The other provinces hire them for dirty work then pretend they don\u2019t exist.',
    fill: '#e0bc80',
    stroke: '#9a6e28',
    group: 'caerndrath',
    path: 'M 120 620 L 280 620 L 400 680 L 440 800 L 340 880 L 180 870 L 100 780 L 90 690 Z',
    labelX: 260,
    labelY: 760,
  },
  {
    id: 'solis',
    name: 'Solis',
    subtitle: 'The Jewelled Rot',
    description:
      'Roman/Byzantine. The bridge between Aoli and Caerndrath. Born from refugee children. Meant to connect two worlds — became a pit of excess and indulgence. Beautiful and drowning. Home of the Water Twin.',
    fill: '#d49860',
    stroke: '#8a4a18',
    path: 'M 440 720 L 580 700 L 720 720 L 780 800 L 720 880 L 560 900 L 440 870 L 410 780 Z',
    labelX: 590,
    labelY: 800,
  },
  {
    id: 'anshan',
    name: 'Àn Shān',
    subtitle: 'The Dark Range',
    description:
      'The Dark Mountains of western Aoli. Eternal winter, blood-red maples, home of the Shi Sect. Where the corruption of Yuèlì has put down its deepest roots.',
    fill: '#5a4a60',
    stroke: '#382838',
    path: 'M 160 180 L 320 170 L 340 280 L 280 320 L 180 310 L 140 250 Z',
    labelX: 240,
    labelY: 240,
    darkText: true,
  },
  {
    id: 'forgotten_isles',
    name: 'Forgotten Isles',
    subtitle: 'Small island chain',
    description:
      'A small island chain off the eastern coast. Forgotten by most, remembered only by those who know what hides in forgotten places.',
    fill: '#d8c090',
    stroke: '#8a6830',
    isles: true,
  },
  {
    id: 'aurum',
    name: 'Aurum',
    subtitle: 'The Sky Cities',
    description:
      'Victorian steampunk with Asian fusion. Floating cities in the clouds. Officially powered by steam — secretly powered by blood magic. Magic is outlawed. Mínhuì hides here. Aria is born here.',
    fill: '#f0dc88',
    stroke: '#c8a020',
    floating: true,
  },
]

// ═══════════════════════════════════════
// SECT MARKERS WITHIN AOLI
// ═══════════════════════════════════════

const SECTS = [
  {
    id: 'shi',
    name: 'Shi Sect',
    element: 'Chaos',
    x: 240,
    y: 250,
    description: 'Within Àn Shān. Blood-red maples. Eternal winter. The Shi Sect and the fragment-carriers.',
    color: '#6a2030',
  },
  {
    id: 'wen',
    name: 'Wen Sect',
    element: 'Wind',
    x: 420,
    y: 140,
    description: 'Above the clouds. Golden-white temples on pillar tops. All-female leadership. Music and shapeshifting.',
    color: '#e0c060',
  },
  {
    id: 'fen',
    name: 'Fen Sect',
    element: 'Fire',
    x: 560,
    y: 230,
    description: 'Volcanic plains. Lava rivers. Cherry blossoms growing from ash. The five brothers and the empty seat.',
    color: '#c84820',
  },
  {
    id: 'hun',
    name: 'Hun Sect',
    element: 'Spirit',
    x: 700,
    y: 250,
    description: 'Perpetual mist. The veil is thin here. Mínhuì\u2019s body preserved in the sacred cave.',
    color: '#9878b8',
  },
  {
    id: 'yan',
    name: 'Yan Sect',
    element: 'Earth',
    x: 860,
    y: 180,
    description: 'Carved into the Dragon\u2019s Spine. Yánlóng sleeps beneath. Earth still connected.',
    color: '#886840',
  },
  {
    id: 'yun',
    name: 'Yun Sect',
    element: 'Water',
    x: 980,
    y: 260,
    description: 'Perpetual spring. Cherry blossoms always in bloom. Water glows at night. Yúnshēng\u2019s domain.',
    color: '#68a8c0',
  },
]

// ═══════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════

export default function WorldMap() {
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 1200, h: 980 })
  const [isPanning, setIsPanning] = useState(false)
  const panStart = useRef({ x: 0, y: 0, vbX: 0, vbY: 0 })
  const svgRef = useRef(null)

  const active = hovered || selected
  const activeRegion = active ? REGIONS.find((r) => r.id === active) || SECTS.find((s) => s.id === active) : null

  // ═══ ZOOM ═══
  const handleWheel = (e) => {
    e.preventDefault()
    const scale = e.deltaY < 0 ? 0.9 : 1.1
    const rect = svgRef.current.getBoundingClientRect()
    const mx = ((e.clientX - rect.left) / rect.width) * viewBox.w + viewBox.x
    const my = ((e.clientY - rect.top) / rect.height) * viewBox.h + viewBox.y
    const newW = Math.max(300, Math.min(2400, viewBox.w * scale))
    const newH = Math.max(250, Math.min(2000, viewBox.h * scale))
    const newX = mx - ((e.clientX - rect.left) / rect.width) * newW
    const newY = my - ((e.clientY - rect.top) / rect.height) * newH
    setViewBox({ x: newX, y: newY, w: newW, h: newH })
  }

  // ═══ PAN ═══
  const handleMouseDown = (e) => {
    if (e.button !== 0) return
    setIsPanning(true)
    panStart.current = { x: e.clientX, y: e.clientY, vbX: viewBox.x, vbY: viewBox.y }
  }
  const handleMouseMove = (e) => {
    if (!isPanning) return
    const rect = svgRef.current.getBoundingClientRect()
    const dx = ((e.clientX - panStart.current.x) / rect.width) * viewBox.w
    const dy = ((e.clientY - panStart.current.y) / rect.height) * viewBox.h
    setViewBox((v) => ({ ...v, x: panStart.current.vbX - dx, y: panStart.current.vbY - dy }))
  }
  const handleMouseUp = () => setIsPanning(false)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    svg.addEventListener('wheel', handleWheel, { passive: false })
    return () => svg.removeEventListener('wheel', handleWheel)
  }, [viewBox])

  const resetView = () => setViewBox({ x: 0, y: 0, w: 1200, h: 980 })

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(170deg, #f5efe0 0%, #ebe0c8 50%, #f0e5d0 100%)',
        fontFamily: "'Quicksand', 'Segoe UI', sans-serif",
        color: '#4a3a2e',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 28px 12px',
          borderBottom: '1px solid rgba(160, 130, 140, 0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexShrink: 0,
          background: 'linear-gradient(170deg, #f5efe0 0%, #ebe0c8 100%)',
          zIndex: 10,
        }}
      >
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              fontWeight: 500,
              color: '#4a3a2e',
              margin: 0,
              letterSpacing: '0.05em',
            }}
          >
            <span style={{ opacity: 0.4, marginRight: '10px' }}>⛰</span>
            The Atlas
          </h2>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '0.9rem',
              fontStyle: 'italic',
              color: 'rgba(100, 80, 65, 0.55)',
              margin: '2px 0 0',
            }}
          >
            A cartographer's planning map of the known world
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={resetView}
            style={{
              padding: '6px 14px',
              border: '1px solid rgba(150, 130, 120, 0.25)',
              borderRadius: '6px',
              background: 'rgba(255, 252, 248, 0.7)',
              color: 'rgba(90, 75, 60, 0.75)',
              cursor: 'pointer',
              fontFamily: "'Quicksand', sans-serif",
              fontSize: '0.75rem',
              transition: 'all 0.2s ease',
            }}
          >
            Reset View
          </button>
        </div>
      </div>

      {/* Map + Info */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* SVG Map */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <svg
            ref={svgRef}
            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
            style={{
              width: '100%',
              height: '100%',
              cursor: isPanning ? 'grabbing' : 'grab',
              display: 'block',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Defs: patterns, filters, gradients */}
            <defs>
              <pattern id="parchment" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="#f1e6c8" />
                <circle cx="15" cy="25" r="0.5" fill="#c8b080" opacity="0.3" />
                <circle cx="60" cy="55" r="0.5" fill="#b89870" opacity="0.3" />
                <circle cx="40" cy="70" r="0.5" fill="#c8b080" opacity="0.3" />
              </pattern>
              <radialGradient id="sea" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#a8c8d0" />
                <stop offset="100%" stopColor="#7898a4" />
              </radialGradient>
              <radialGradient id="aurumGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#faebc0" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#e8c860" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#c8a020" stopOpacity="0" />
              </radialGradient>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="2" dy="3" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="cloudBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>

            {/* Ocean / background */}
            <rect x="-200" y="-200" width="1600" height="1400" fill="url(#sea)" />
            {/* Parchment land mass as one big shape underneath */}
            <path
              d="M 80 60 L 1120 60 L 1120 680 L 1090 810 L 1050 860 L 940 870 L 780 870 L 620 910 L 440 900 L 280 880 L 120 820 L 60 700 L 60 200 Z"
              fill="url(#parchment)"
              stroke="#9a7848"
              strokeWidth="1.5"
              filter="url(#shadow)"
            />

            {/* Regions */}
            {REGIONS.map((region) => {
              if (region.floating || region.isles) return null
              const isActive = active === region.id
              const inGroup = region.group === 'caerndrath'
              return (
                <g key={region.id}>
                  <path
                    d={region.path}
                    fill={region.fill}
                    stroke={region.stroke}
                    strokeWidth={isActive ? 3 : inGroup ? 1.2 : 1.8}
                    strokeDasharray={inGroup ? '4 2' : 'none'}
                    opacity={active && !isActive ? 0.55 : 0.92}
                    style={{ cursor: 'pointer', transition: 'opacity 0.2s, stroke-width 0.2s' }}
                    onMouseEnter={() => setHovered(region.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setSelected(region.id === selected ? null : region.id)}
                  />
                  {/* Region label */}
                  <text
                    x={region.labelX}
                    y={region.labelY}
                    textAnchor="middle"
                    pointerEvents="none"
                    fontFamily="'Cormorant Garamond', Georgia, serif"
                    fontSize="24"
                    fontWeight="600"
                    fill={region.darkText ? '#e8d8f0' : '#3a2818'}
                    letterSpacing="0.08em"
                    style={{ textTransform: 'uppercase' }}
                  >
                    {region.name}
                  </text>
                  <text
                    x={region.labelX}
                    y={region.labelY + 20}
                    textAnchor="middle"
                    pointerEvents="none"
                    fontFamily="'Cormorant Garamond', Georgia, serif"
                    fontSize="13"
                    fontStyle="italic"
                    fill={region.darkText ? '#c8b0d0' : 'rgba(100, 70, 40, 0.75)'}
                  >
                    {region.subtitle}
                  </text>
                </g>
              )
            })}

            {/* Dragon Spine Mountains (crossing the continent behind Aoli) */}
            <g pointerEvents="none">
              {[...Array(24)].map((_, i) => {
                const x = 120 + i * 40
                const y = 360 + Math.sin(i * 0.8) * 12
                return (
                  <g key={i}>
                    <path
                      d={`M ${x - 14} ${y + 14} L ${x} ${y - 16} L ${x + 14} ${y + 14} Z`}
                      fill="#8c7456"
                      stroke="#5c4428"
                      strokeWidth="1"
                    />
                    <path
                      d={`M ${x - 7} ${y} L ${x} ${y - 10} L ${x + 7} ${y}`}
                      fill="none"
                      stroke="#f0e0b8"
                      strokeWidth="1.2"
                    />
                  </g>
                )
              })}
              <text
                x="600"
                y="400"
                textAnchor="middle"
                fontFamily="'Cormorant Garamond', Georgia, serif"
                fontSize="16"
                fontStyle="italic"
                fill="rgba(60, 40, 20, 0.85)"
                letterSpacing="0.15em"
              >
                The Dragon Spine Mountains
              </text>
            </g>

            {/* Sect markers within Aoli */}
            {SECTS.map((sect) => {
              const isActive = active === sect.id
              return (
                <g
                  key={sect.id}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHovered(sect.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelected(sect.id === selected ? null : sect.id)
                  }}
                >
                  <circle
                    cx={sect.x}
                    cy={sect.y}
                    r={isActive ? 9 : 6}
                    fill={sect.color}
                    stroke="#f5efe0"
                    strokeWidth="2"
                    style={{ transition: 'r 0.2s' }}
                  />
                  <text
                    x={sect.x}
                    y={sect.y - 14}
                    textAnchor="middle"
                    pointerEvents="none"
                    fontFamily="'Quicksand', sans-serif"
                    fontSize="10"
                    fontWeight="600"
                    fill="#3a2818"
                  >
                    {sect.name}
                  </text>
                </g>
              )
            })}

            {/* Àn Shān mountain symbols within the dark range */}
            <g pointerEvents="none">
              {[
                [180, 230],
                [220, 210],
                [260, 225],
                [300, 215],
              ].map(([x, y], i) => (
                <g key={i}>
                  <path
                    d={`M ${x - 10} ${y + 10} L ${x} ${y - 12} L ${x + 10} ${y + 10} Z`}
                    fill="#3c2848"
                    stroke="#1a0e20"
                    strokeWidth="0.8"
                  />
                  <path
                    d={`M ${x - 5} ${y - 2} L ${x} ${y - 8} L ${x + 5} ${y - 2}`}
                    fill="none"
                    stroke="#c8a0d8"
                    strokeWidth="0.8"
                  />
                </g>
              ))}
            </g>

            {/* Forgotten Isles - small island chain east coast */}
            <g
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered('forgotten_isles')}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(selected === 'forgotten_isles' ? null : 'forgotten_isles')}
            >
              <ellipse cx="1140" cy="720" rx="22" ry="14" fill="#d8c090" stroke="#8a6830" strokeWidth="1.2" />
              <ellipse cx="1160" cy="760" rx="16" ry="10" fill="#d8c090" stroke="#8a6830" strokeWidth="1.2" />
              <ellipse cx="1135" cy="790" rx="12" ry="8" fill="#d8c090" stroke="#8a6830" strokeWidth="1.2" />
              <text
                x="1150"
                y="720"
                textAnchor="middle"
                pointerEvents="none"
                fontFamily="'Cormorant Garamond', Georgia, serif"
                fontSize="11"
                fontStyle="italic"
                fill="#4a3a2e"
                transform="rotate(15 1150 720)"
              >
                Forgotten Isles
              </text>
            </g>

            {/* Sunken Sea label */}
            <text
              x="600"
              y="960"
              textAnchor="middle"
              pointerEvents="none"
              fontFamily="'Cormorant Garamond', Georgia, serif"
              fontSize="18"
              fontStyle="italic"
              fill="rgba(60, 80, 100, 0.7)"
              letterSpacing="0.3em"
            >
              ~ The Sunken Sea ~
            </text>

            {/* Aurum — floating sky cities above the continent */}
            <g
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered('aurum')}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(selected === 'aurum' ? null : 'aurum')}
            >
              {/* Cloud layer */}
              <ellipse cx="600" cy="35" rx="320" ry="28" fill="url(#aurumGlow)" filter="url(#cloudBlur)" />
              {/* Floating city silhouettes */}
              {[
                [440, 32, 18],
                [540, 20, 24],
                [640, 36, 20],
                [740, 24, 22],
              ].map(([x, y, r], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r={r} fill="#f0dc88" stroke="#b88020" strokeWidth="1.5" opacity="0.85" />
                  <rect x={x - 3} y={y - 12} width="6" height="10" fill="#c89030" opacity="0.9" />
                </g>
              ))}
              <text
                x="600"
                y="12"
                textAnchor="middle"
                pointerEvents="none"
                fontFamily="'Cormorant Garamond', Georgia, serif"
                fontSize="20"
                fontWeight="600"
                fill="#8a5a10"
                letterSpacing="0.2em"
                style={{ textTransform: 'uppercase' }}
              >
                Aurum
              </text>
              <text
                x="600"
                y="60"
                textAnchor="middle"
                pointerEvents="none"
                fontFamily="'Cormorant Garamond', Georgia, serif"
                fontSize="11"
                fontStyle="italic"
                fill="rgba(90, 60, 20, 0.8)"
              >
                The Sky Cities
              </text>
            </g>

            {/* Compass Rose */}
            <g transform="translate(100, 900)" pointerEvents="none">
              <circle cx="0" cy="0" r="36" fill="#f5efe0" stroke="#8a6838" strokeWidth="1.2" opacity="0.92" />
              <circle cx="0" cy="0" r="28" fill="none" stroke="#8a6838" strokeWidth="0.5" />
              {/* Cardinal points */}
              <path d="M 0 -32 L 4 0 L 0 32 L -4 0 Z" fill="#8a6838" />
              <path d="M -32 0 L 0 4 L 32 0 L 0 -4 Z" fill="#a88858" />
              <text x="0" y="-40" textAnchor="middle" fontSize="11" fontWeight="700" fill="#4a3a2e" fontFamily="serif">
                N
              </text>
              <text x="0" y="50" textAnchor="middle" fontSize="10" fill="#4a3a2e" fontFamily="serif">
                S
              </text>
              <text x="42" y="4" textAnchor="middle" fontSize="10" fill="#4a3a2e" fontFamily="serif">
                E
              </text>
              <text x="-42" y="4" textAnchor="middle" fontSize="10" fill="#4a3a2e" fontFamily="serif">
                W
              </text>
            </g>

            {/* Scale Bar */}
            <g transform="translate(1000, 920)" pointerEvents="none">
              <rect x="0" y="0" width="40" height="8" fill="#4a3a2e" />
              <rect x="40" y="0" width="40" height="8" fill="#f5efe0" stroke="#4a3a2e" strokeWidth="0.8" />
              <rect x="80" y="0" width="40" height="8" fill="#4a3a2e" />
              <text x="0" y="24" fontSize="9" fill="#4a3a2e" fontFamily="serif">
                0
              </text>
              <text x="60" y="24" textAnchor="middle" fontSize="9" fill="#4a3a2e" fontFamily="serif">
                500 li
              </text>
              <text x="120" y="24" textAnchor="end" fontSize="9" fill="#4a3a2e" fontFamily="serif">
                1000
              </text>
            </g>
          </svg>

          {/* Zoom hint */}
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              fontSize: '0.7rem',
              color: 'rgba(100, 80, 65, 0.5)',
              fontStyle: 'italic',
              pointerEvents: 'none',
            }}
          >
            scroll to zoom · drag to pan · click a region for details
          </div>
        </div>

        {/* Side Panel — Region Info */}
        <aside
          style={{
            width: '320px',
            minWidth: '320px',
            borderLeft: '1px solid rgba(160, 130, 140, 0.12)',
            padding: '24px 22px',
            overflowY: 'auto',
            background: 'rgba(255, 252, 245, 0.6)',
            flexShrink: 0,
          }}
        >
          {activeRegion ? (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              <div
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: 'rgba(100, 85, 70, 0.5)',
                  marginBottom: '6px',
                }}
              >
                {activeRegion.element ? 'Sect' : 'Realm'}
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.6rem',
                  fontWeight: 500,
                  color: '#3a2818',
                  margin: '0 0 4px',
                  letterSpacing: '0.04em',
                }}
              >
                {activeRegion.name}
              </h3>
              {activeRegion.subtitle && (
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '1rem',
                    fontStyle: 'italic',
                    color: 'rgba(100, 70, 40, 0.7)',
                    margin: '0 0 16px',
                  }}
                >
                  {activeRegion.subtitle}
                </p>
              )}
              {activeRegion.element && (
                <div
                  style={{
                    display: 'inline-block',
                    padding: '3px 10px',
                    background: 'rgba(160, 130, 140, 0.12)',
                    borderRadius: '12px',
                    fontSize: '0.72rem',
                    color: 'rgba(100, 85, 70, 0.75)',
                    marginBottom: '14px',
                  }}
                >
                  {activeRegion.element} Element
                </div>
              )}
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'rgba(80, 60, 45, 0.85)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {activeRegion.description}
              </p>
            </div>
          ) : (
            <div style={{ color: 'rgba(100, 85, 70, 0.45)' }}>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '1.3rem',
                  fontWeight: 500,
                  margin: '0 0 10px',
                  color: 'rgba(74, 58, 46, 0.8)',
                }}
              >
                The Known World
              </h3>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  margin: '0 0 16px',
                }}
              >
                Hover a region to glimpse it. Click to pin its tale.
              </p>
              <div
                style={{
                  marginTop: '24px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(160, 130, 140, 0.15)',
                  fontSize: '0.75rem',
                  lineHeight: 1.9,
                }}
              >
                <div style={{ marginBottom: '10px', color: 'rgba(100, 85, 70, 0.7)' }}>
                  <strong style={{ color: '#4a3a2e' }}>Four Realms</strong>
                </div>
                <div>· Aoli — the Breathing Land</div>
                <div>· Caerndrath — the Fractured Kingdom</div>
                <div>· Solis — the Jewelled Rot</div>
                <div>· Aurum — the Sky Cities</div>
                <div style={{ marginTop: '14px', marginBottom: '6px', color: 'rgba(100, 85, 70, 0.7)' }}>
                  <strong style={{ color: '#4a3a2e' }}>Five Caerndrath Provinces</strong>
                </div>
                <div>· Braedun · Isenholt · Ardenmere</div>
                <div>· Tyramare · Maramir</div>
              </div>
            </div>
          )}
        </aside>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
