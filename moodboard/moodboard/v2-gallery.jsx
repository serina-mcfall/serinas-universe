// Variation 2 — Boards (collections) + tags. The writer's filing cabinet.
// User creates named boards (e.g. "Aria's wardrobe", "Aoli rooftops"). Each image lives in
// one or more boards, plus has free-form tags. Sidebar of boards on the left.

const BOARDS_KEY = 'serinas-moodboard-boards-v1';

// Boards seeded from the full world bible canon, grouped by realm/section.
// Each board has an optional `section` — boards with the same section render
// under a sticky section header in the sidebar.
function defaultBoards() {
  return [
    // === COSMOLOGY & MYTH ===
    { id: 'b_cosmology', name: 'Cosmology & gods', icon: '🌙', section: 'Myth' },
    { id: 'b_virtues', name: 'The Virtues (Fellowship)', icon: '🔥', section: 'Myth' },
    { id: 'b_fragments', name: 'Fragments & corruption', icon: '✦', section: 'Myth' },

    // === AOLI — IMPERIAL CORE ===
    { id: 'b_aoli_imperial', name: 'Imperial court — Zǐchén', icon: '🏯', section: 'Aoli' },
    { id: 'b_aoli_emperor', name: 'Chén Yuán — orchid garden', icon: '🌸', section: 'Aoli' },
    { id: 'b_aoli_empress', name: 'Lí Wǎn — prayer beads', icon: '📿', section: 'Aoli' },
    { id: 'b_aoli_jing', name: 'Crown Prince Chén Jǐng', icon: '🐉', section: 'Aoli' },
    { id: 'b_aoli_selection', name: 'Crown Princess Selection', icon: '👑', section: 'Aoli' },
    { id: 'b_aoli_lumei', name: 'Lǔ Méi — broom girl', icon: '🍃', section: 'Aoli' },

    // === AOLI — SECTS ===
    { id: 'b_yan', name: 'Yan Sect — earth & stone', icon: '⛰️', section: 'Aoli sects' },
    { id: 'b_yun', name: 'Yun Sect — water & blossom', icon: '🌊', section: 'Aoli sects' },
    { id: 'b_wen', name: 'Wen Sect — wind & music', icon: '🎴', section: 'Aoli sects' },
    { id: 'b_fen', name: 'Fen Sect — phoenix & forge', icon: '🔥', section: 'Aoli sects' },
    { id: 'b_hun', name: 'Hun Sect — soul & mist', icon: '🕯', section: 'Aoli sects' },
    { id: 'b_shi', name: 'Shi Sect — chaos web', icon: '🕸', section: 'Aoli sects' },

    // === ISENHOLT — CLANS ===
    { id: 'b_greymane', name: 'Greymane (Wolf)', icon: '🐺', section: 'Isenholt clans' },
    { id: 'b_mistborne', name: 'Mistborne (Fox)', icon: '🦊', section: 'Isenholt clans' },
    { id: 'b_stonewall', name: 'Stonewall (Bear)', icon: '🐻', section: 'Isenholt clans' },
    { id: 'b_shroudborn', name: 'Shroudborn (Leopard)', icon: '🐆', section: 'Isenholt clans' },
    { id: 'b_skycrest', name: 'Skycrest (Eagle)', icon: '🦅', section: 'Isenholt clans' },
    { id: 'b_coldhollow', name: 'Coldhollow (Owl)', icon: '🦉', section: 'Isenholt clans' },

    // === TYRAMARE — DISTRICTS ===
    { id: 'b_spice', name: 'Spice Harbour', icon: '🌶', section: 'Tyramare districts' },
    { id: 'b_marble', name: 'Marble Quarter', icon: '🏛️', section: 'Tyramare districts' },
    { id: 'b_iron', name: 'Iron Quarter', icon: '⚒', section: 'Tyramare districts' },
    { id: 'b_veil', name: 'The Veil', icon: '🕯', section: 'Tyramare districts' },
    { id: 'b_aurumvale', name: 'Aurumvale', icon: '💰', section: 'Tyramare districts' },
    { id: 'b_stillhaven', name: 'Stillhaven (Lìyǐn)', icon: '🌑', section: 'Tyramare districts' },
    { id: 'b_solace', name: 'The Solace', icon: '⚪', section: 'Tyramare districts' },

    // === AURUM — SKY CITIES ===
    { id: 'b_tianxin', name: 'Tiānxīn — the Heart', icon: '👑', section: 'Aurum islands' },
    { id: 'b_wuying', name: 'Wǔyíng — the Bastion', icon: '🛡', section: 'Aurum islands' },
    { id: 'b_yunshi', name: 'Yúnshì — the Exchange', icon: '⚖', section: 'Aurum islands' },
    { id: 'b_wenyuan', name: 'Wényuán — the Gardens', icon: '🌳', section: 'Aurum islands' },
    { id: 'b_tianzhui', name: 'Tiānzhuī — the Anvil (Aria)', icon: '⚙️', section: 'Aurum islands' },
    { id: 'b_lutian', name: 'Lǜtián — the Greenfields', icon: '🌾', section: 'Aurum islands' },
    { id: 'b_underrock', name: 'The Underrock / Bilge', icon: '🪔', section: 'Aurum islands' },

    // === AURUM — ARIA'S WORLD ===
    { id: 'b_clocktower', name: 'Aria\u2019s clock tower', icon: '⏱', section: 'Aria\u2019s Aurum' },
    { id: 'b_tickandtock', name: 'Tick & Tock workshop', icon: '🔧', section: 'Aria\u2019s Aurum' },
    { id: 'b_grannie', name: 'Grannie\u2019s apothecary', icon: '🌿', section: 'Aria\u2019s Aurum' },
    { id: 'b_potions', name: 'Potions & curiosities', icon: '🧪', section: 'Aria\u2019s Aurum' },
    { id: 'b_bloodtree', name: 'Blood Tree / Hope Tree', icon: '🌳', section: 'Aria\u2019s Aurum' },

    // === OTHER REALMS ===
    { id: 'b_solis', name: 'Solis — jewelled rot', icon: '💎', section: 'Other realms' },
    { id: 'b_maramir', name: 'Maramir — desert shadows', icon: '🏜', section: 'Other realms' },
    { id: 'b_braedun', name: 'Braedun — wild groves', icon: '🌿', section: 'Other realms' },
    { id: 'b_ardmere', name: 'Ardmere — fields & chains', icon: '⚔️', section: 'Other realms' },

    // === CRAFT BOARDS (cross-cutting) ===
    { id: 'b_wardrobe', name: 'Wardrobe & textiles', icon: '👘', section: 'Craft' },
    { id: 'b_architecture', name: 'Architecture & interiors', icon: '🏛', section: 'Craft' },
    { id: 'b_landscapes', name: 'Landscapes & weather', icon: '🌄', section: 'Craft' },
    { id: 'b_objects', name: 'Weapons, jewels & artifacts', icon: '⚔️', section: 'Craft' },
    { id: 'b_palette', name: 'Color & light studies', icon: '🎨', section: 'Craft' },
    { id: 'b_loose', name: 'Loose ideas', icon: '✦', section: 'Craft' },
  ];
}

function loadBoards() {
  try {
    const raw = localStorage.getItem(BOARDS_KEY);
    if (raw) {
      const stored = JSON.parse(raw);
      // Migration: if stored boards are the OLD short list (≤12) and the user
      // hasn't created custom boards yet, refresh to the canon-aligned set.
      // Detect by checking for the old generic ids.
      const isOldSeed = stored.length <= 12 &&
        stored.some((b) => b.id === 'b_characters' || b.id === 'b_aoli');
      if (isOldSeed) return defaultBoards();
      return stored;
    }
  } catch (e) {}
  return defaultBoards();
}

function useBoards() {
  const [boards, setBoards] = React.useState(loadBoards);
  React.useEffect(() => { localStorage.setItem(BOARDS_KEY, JSON.stringify(boards)); }, [boards]);
  const addBoard = (name, section) => {
    const id = 'b_' + Date.now().toString(36);
    setBoards((arr) => [...arr, { id, name, icon: '✦', section: section || 'Custom' }]);
    return id;
  };
  const renameBoard = (id, name) => setBoards((arr) => arr.map((b) => b.id === id ? { ...b, name } : b));
  const removeBoard = (id) => setBoards((arr) => arr.filter((b) => b.id !== id));
  return { boards, addBoard, renameBoard, removeBoard };
}

function GalleryCard({ image, url, onOpen, updateImage, boards, currentBoard }) {
  const cat = window.MoodCatalog;
  const catMeta = cat && image.category ? cat.CATEGORIES.find((c) => c.id === image.category) : null;
  const realmText = cat && image.realm ? cat.realmLabel(image.realm, image.subRegion) : '';
  const statusMeta = cat && image.status ? cat.statusMeta(image.status) : null;
  return (
    <div className="m2-card">
      <div className="m2-img-wrap" onClick={onOpen}>
        {url ? <img src={url} alt={image.label || ''} loading="lazy" /> : <div className="m2-skel" />}
        <div className="m2-corner">
          <StarBtn on={image.starred} onClick={(e) => { e.stopPropagation(); updateImage(image.id, { starred: !image.starred }); }} />
          {statusMeta && (
            <span className="m2-status-dot" style={{ color: statusMeta.tone }} title={statusMeta.label}>
              {statusMeta.glyph}
            </span>
          )}
        </div>
        {(catMeta || realmText) && (
          <div className="m2-meta-strip">
            {catMeta && <span className="m2-meta-chip"><span className="m2-meta-glyph">{catMeta.glyph}</span> {catMeta.label}</span>}
            {realmText && <span className="m2-meta-chip m2-meta-realm">{realmText}</span>}
          </div>
        )}
        {image.palette?.length > 0 && (
          <div className="m2-palette">
            {image.palette.slice(0, 5).map((c, i) => <span key={i} style={{ background: c }} />)}
          </div>
        )}
      </div>
      <div className="m2-meta">
        <div className="m2-label">{image.label || <em>untitled</em>}</div>
        {image.tags.length > 0 && (
          <div className="m2-tags">
            {image.tags.slice(0, 5).map((t) => <span key={t} className="tag-pill mini">{t}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}

function StructuredFiltersPanel({ structured, setStructuredField }) {
  const cat = window.MoodCatalog;
  if (!cat) return null;
  const realm = cat.findRealm(structured.realm);
  const subs = realm ? realm.subs : [];
  const anyActive = Object.values(structured).some(Boolean);
  return (
    <div className="m2-sf-panel">
      <div className="m2-sf-head">
        <span>Filter</span>
        {anyActive && (
          <button className="m2-sf-clear" onClick={() => {
            setStructuredField('category', '');
            setStructuredField('realm', '');
            setStructuredField('era', '');
            setStructuredField('season', '');
            setStructuredField('status', '');
          }}>clear</button>
        )}
      </div>
      <select className="m2-sf-input" value={structured.category} onChange={(e) => setStructuredField('category', e.target.value)}>
        <option value="">All categories</option>
        {cat.CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.glyph}  {c.label}</option>)}
      </select>
      <select className="m2-sf-input" value={structured.realm} onChange={(e) => setStructuredField('realm', e.target.value)}>
        <option value="">All realms</option>
        {cat.REALMS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
      </select>
      {realm && subs.length > 1 && (
        <select className="m2-sf-input" value={structured.subRegion} onChange={(e) => setStructuredField('subRegion', e.target.value)}>
          <option value="">All of {realm.label}</option>
          {subs.filter((s) => s.id).map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      )}
      <div className="m2-sf-row-2">
        <select className="m2-sf-input" value={structured.era} onChange={(e) => setStructuredField('era', e.target.value)}>
          <option value="">Any era</option>
          {cat.ERAS.map((e) => <option key={e.id} value={e.id}>{e.label}</option>)}
        </select>
        <select className="m2-sf-input" value={structured.season} onChange={(e) => setStructuredField('season', e.target.value)}>
          <option value="">Any season</option>
          {cat.SEASONS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
      </div>
      <select className="m2-sf-input" value={structured.status} onChange={(e) => setStructuredField('status', e.target.value)}>
        <option value="">Any status</option>
        {cat.STATUSES.map((s) => <option key={s.id} value={s.id}>{s.glyph}  {s.label}</option>)}
      </select>
    </div>
  );
}

function Gallery() {
  const board = useMoodBoard();
  const { images, resolvedUrls, addImage, updateImage, removeImage, addTag, removeTag } = board;
  const { boards, addBoard, renameBoard, removeBoard } = useBoards();

  const [activeBoard, setActiveBoard] = React.useState('all');
  const [query, setQuery] = React.useState('');
  const [activeTags, setActiveTags] = React.useState([]);
  const [starredOnly, setStarredOnly] = React.useState(false);
  const [openId, setOpenId] = React.useState(null);
  const [renaming, setRenaming] = React.useState(null);
  const [structured, setStructured] = React.useState({
    category: '', realm: '', subRegion: '', era: '', season: '', status: '',
  });
  const setStructuredField = (k, v) => setStructured((s) => {
    const next = { ...s, [k]: v };
    if (k === 'realm') next.subRegion = ''; // reset sub when realm changes
    return next;
  });

  // When adding via global ingest, default-tag with the active board's id (if not "all")
  const defaultTags = activeBoard !== 'all' && activeBoard !== 'starred' ? [activeBoard] : [];
  useGlobalIngest(addImage, { defaultTags });

  // Filter by board (board id is stored as a tag), then by tags/query/starred/structured
  let filtered = images;
  if (activeBoard === 'starred') filtered = filtered.filter((r) => r.starred);
  else if (activeBoard !== 'all') filtered = filtered.filter((r) => r.tags.includes(activeBoard));
  filtered = applyFilter(filtered, query, activeTags, starredOnly, structured);

  const openImage = images.find((r) => r.id === openId);

  const counts = React.useMemo(() => {
    const c = { all: images.length, starred: images.filter((r) => r.starred).length };
    boards.forEach((b) => { c[b.id] = images.filter((r) => r.tags.includes(b.id)).length; });
    return c;
  }, [images, boards]);

  const newBoard = () => {
    const name = prompt('Name this board (e.g. "Aria\'s wardrobe", "Aoli rooftops"):');
    if (name?.trim()) {
      const id = addBoard(name.trim());
      setActiveBoard(id);
    }
  };

  return (
    <div className="m2-root">
      <aside className="m2-sidebar">
        <div className="m2-sb-header">
          <span className="m2-glyph">文</span>
          <div>
            <h2>Mood Board</h2>
            <p>{images.length} visions</p>
          </div>
        </div>
        <button className={`m2-board-btn ${activeBoard === 'all' ? 'active' : ''}`} onClick={() => setActiveBoard('all')}>
          <span>✶</span> All visions <span className="m2-count">{counts.all}</span>
        </button>
        <button className={`m2-board-btn ${activeBoard === 'starred' ? 'active' : ''}`} onClick={() => setActiveBoard('starred')}>
          <span>★</span> Starred <span className="m2-count">{counts.starred}</span>
        </button>
        <div className="m2-sb-divider">Boards</div>
        {(() => {
          // Group boards by section, preserving order
          const grouped = [];
          const seen = new Map();
          boards.forEach((b) => {
            const key = b.section || 'Boards';
            if (!seen.has(key)) {
              seen.set(key, grouped.length);
              grouped.push({ section: key, items: [] });
            }
            grouped[seen.get(key)].items.push(b);
          });
          return grouped.map((g) => (
            <div key={g.section} className="m2-board-section">
              <div className="m2-board-section-label">{g.section}</div>
              {g.items.map((b) => (
                <div key={b.id} className={`m2-board-row ${activeBoard === b.id ? 'active' : ''}`}>
                  {renaming === b.id ? (
                    <input
                      autoFocus
                      defaultValue={b.name}
                      onBlur={(e) => { renameBoard(b.id, e.target.value || b.name); setRenaming(null); }}
                      onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); if (e.key === 'Escape') setRenaming(null); }}
                    />
                  ) : (
                    <>
                      <button className={`m2-board-btn ${activeBoard === b.id ? 'active' : ''}`} onClick={() => setActiveBoard(b.id)}>
                        <span>{b.icon}</span> {b.name} <span className="m2-count">{counts[b.id] || 0}</span>
                      </button>
                      <div className="m2-board-actions">
                        <button title="Rename" onClick={() => setRenaming(b.id)}>✎</button>
                        <button title="Delete board (images stay)" onClick={() => {
                          if (confirm(`Delete the board "${b.name}"? The images in it will stay in your library — only the board itself is removed.`)) {
                            removeBoard(b.id);
                            if (activeBoard === b.id) setActiveBoard('all');
                          }
                        }}>×</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ));
        })()}
        <button className="m2-new-board" onClick={newBoard}>+ New board</button>
        <StructuredFiltersPanel structured={structured} setStructuredField={setStructuredField} />
        <div className="m2-sb-footer">
          {window.BackupControls ? React.createElement(window.BackupControls, { compact: true }) : null}
        </div>
      </aside>

      <main className="m2-main">
        <div className="m2-main-header">
          <h3>
            {activeBoard === 'all' ? 'All visions'
              : activeBoard === 'starred' ? 'Starred'
              : boards.find((b) => b.id === activeBoard)?.name || 'Board'}
          </h3>
          <p className="m2-subtitle">
            {activeBoard !== 'all' && activeBoard !== 'starred'
              ? 'New images you add here will be tagged for this board automatically.'
              : 'Everything you’ve collected.'}
          </p>
        </div>
        <AddBar addImage={addImage} defaultTags={defaultTags} />
        <FilterBar
          images={images}
          query={query} setQuery={setQuery}
          activeTags={activeTags} setActiveTags={setActiveTags}
          starredOnly={starredOnly} setStarredOnly={setStarredOnly}
        />
        {filtered.length === 0 ? (
          <div className="m2-empty">
            <div className="m2-empty-glyph">⊹</div>
            <p>No visions here yet.</p>
            <p className="muted">Paste an image URL, drop a file, or press Ctrl/Cmd+V.</p>
          </div>
        ) : (
          <div className="m2-grid">
            {filtered.map((rec) => (
              <GalleryCard
                key={rec.id}
                image={rec}
                url={resolvedUrls[rec.id]}
                onOpen={() => setOpenId(rec.id)}
                updateImage={updateImage}
                boards={boards}
                currentBoard={activeBoard}
              />
            ))}
          </div>
        )}
      </main>

      {openImage && (
        <ImageDetail
          image={openImage}
          url={resolvedUrls[openImage.id]}
          onClose={() => setOpenId(null)}
          updateImage={updateImage}
          removeImage={removeImage}
          addTag={addTag}
          removeTag={removeTag}
        />
      )}
    </div>
  );
}

window.Gallery = Gallery;
