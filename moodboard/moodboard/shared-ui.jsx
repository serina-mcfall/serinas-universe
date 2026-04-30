// Shared UI bits: AddBar (paste URL / upload / drop hint), TagPills, ImageEditor.

function AddBar({ addImage, defaultTags = [], hint }) {
  const [url, setUrl] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const fileRef = React.useRef(null);

  const submitUrl = async (e) => {
    e?.preventDefault();
    const u = url.trim();
    if (!u) return;
    setBusy(true);
    try {
      await addImage(u, { tags: defaultTags, source: u });
      setUrl('');
    } finally { setBusy(false); }
  };

  const onFiles = async (e) => {
    setBusy(true);
    try {
      for (const f of Array.from(e.target.files || [])) {
        if (f.type.startsWith('image/')) await addImage(f, { tags: defaultTags });
      }
      e.target.value = '';
    } finally { setBusy(false); }
  };

  return (
    <div className="addbar">
      <form onSubmit={submitUrl} className="addbar-url">
        <span className="addbar-icon">🔗</span>
        <input
          type="text"
          placeholder="Paste an image URL from Pinterest, ArtStation, anywhere…"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" disabled={!url.trim() || busy}>Pin</button>
      </form>
      <div className="addbar-divider" />
      <button className="addbar-upload" onClick={() => fileRef.current?.click()} disabled={busy}>
        📁 Upload
      </button>
      <input ref={fileRef} type="file" accept="image/*" multiple onChange={onFiles} style={{ display: 'none' }} />
      <div className="addbar-hint">
        {hint || (<><span>or </span><kbd>Ctrl/Cmd</kbd>+<kbd>V</kbd><span> to paste · drag images here</span></>)}
      </div>
    </div>
  );
}

function TagPill({ tag, onRemove, tone }) {
  return (
    <span className={`tag-pill ${tone || ''}`}>
      {tag}
      {onRemove && <button onClick={onRemove} aria-label="remove tag">×</button>}
    </span>
  );
}

function TagInput({ image, addTag, removeTag }) {
  const [val, setVal] = React.useState('');
  const [showSuggest, setShowSuggest] = React.useState(false);
  const submit = (raw) => {
    const t = (raw ?? val).trim();
    if (t) addTag(image.id, t);
    setVal('');
  };
  const suggestions = ALL_SUGGESTED
    .filter((s) => !image.tags.includes(s))
    .filter((s) => !val || s.includes(val.toLowerCase()))
    .slice(0, 8);

  return (
    <div className="tag-input">
      <div className="tag-row">
        {image.tags.map((t) => (
          <TagPill key={t} tag={t} onRemove={() => removeTag(image.id, t)} />
        ))}
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setShowSuggest(true)}
          onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); submit(); }
            if (e.key === ',' || e.key === 'Tab') { if (val.trim()) { e.preventDefault(); submit(); } }
          }}
          placeholder={image.tags.length === 0 ? '+ tag' : '+'}
          className="tag-input-field"
        />
      </div>
      {showSuggest && suggestions.length > 0 && (
        <div className="tag-suggestions">
          {suggestions.map((s) => (
            <button key={s} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => submit(s)}>
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PaletteStrip({ palette, onCopy }) {
  if (!palette || palette.length === 0) return null;
  return (
    <div className="palette-strip">
      {palette.map((c, i) => (
        <button
          key={i}
          className="palette-swatch"
          style={{ background: c }}
          title={c}
          onClick={() => {
            navigator.clipboard?.writeText(c);
            onCopy?.(c);
          }}
        />
      ))}
    </div>
  );
}

// Small star toggle
function StarBtn({ on, onClick }) {
  return (
    <button className={`star-btn ${on ? 'on' : ''}`} onClick={onClick} title={on ? 'Unstar' : 'Star'}>
      {on ? '★' : '☆'}
    </button>
  );
}

// Structured fields block — used inside ImageDetail
function StructuredFields({ image, updateImage }) {
  const cat = window.MoodCatalog;
  if (!cat) return null;
  const realm = cat.findRealm(image.realm);
  const subs = realm ? realm.subs : [];
  const set = (patch) => updateImage(image.id, patch);
  return (
    <div className="sf-block">
      <div className="sf-row">
        <label className="sf-label">For</label>
        <select className="sf-input" value={image.category || ''} onChange={(e) => set({ category: e.target.value })}>
          <option value="">— uncategorised —</option>
          {cat.CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.glyph}  {c.label}</option>)}
        </select>
      </div>
      <div className="sf-row sf-row-split">
        <div className="sf-half">
          <label className="sf-label">Realm</label>
          <select className="sf-input" value={image.realm || ''} onChange={(e) => set({ realm: e.target.value, subRegion: '' })}>
            <option value="">— none —</option>
            {cat.REALMS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
        </div>
        <div className="sf-half">
          <label className="sf-label">Sub</label>
          <select className="sf-input" value={image.subRegion || ''} onChange={(e) => set({ subRegion: e.target.value })} disabled={!realm || subs.length <= 1}>
            {subs.length === 0 ? <option value="">—</option> : subs.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
      </div>
      <div className="sf-row sf-row-split">
        <div className="sf-half">
          <label className="sf-label">Era</label>
          <select className="sf-input" value={image.era || ''} onChange={(e) => set({ era: e.target.value })}>
            <option value="">— unset —</option>
            {cat.ERAS.map((er) => <option key={er.id} value={er.id}>{er.label}</option>)}
          </select>
        </div>
        <div className="sf-half">
          <label className="sf-label">Season</label>
          <select className="sf-input" value={image.season || ''} onChange={(e) => set({ season: e.target.value })}>
            <option value="">— unset —</option>
            {cat.SEASONS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
      </div>
      <div className="sf-row">
        <label className="sf-label">Character</label>
        <CharacterAutocomplete value={image.character} onChange={(v) => set({ character: v })} />
      </div>
      <div className="sf-row">
        <label className="sf-label">Status</label>
        <div className="sf-status-pills">
          {cat.STATUSES.map((s) => {
            const active = image.status === s.id;
            return (
              <button
                key={s.id}
                className={`sf-status-pill ${active ? 'active' : ''}`}
                style={active ? { borderColor: s.tone, color: s.tone } : null}
                onClick={() => set({ status: active ? '' : s.id })}
                type="button"
              >
                <span style={{ color: s.tone }}>{s.glyph}</span> {s.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="sf-row">
        <label className="sf-label">Source</label>
        <input
          className="sf-input"
          value={image.source || ''}
          onChange={(e) => set({ source: e.target.value })}
          placeholder="URL, artist credit, book reference…"
        />
      </div>
    </div>
  );
}

function CharacterAutocomplete({ value, onChange }) {
  const [focus, setFocus] = React.useState(false);
  const list = (window.ALL_SUGGESTED || []).filter((t) => /^[a-zà-ÿ]/i.test(t));
  const q = (value || '').toLowerCase().trim();
  const matches = q ? list.filter((t) => t.includes(q) && t !== q).slice(0, 8) : [];
  return (
    <div className="sf-autocomplete">
      <input
        className="sf-input"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setTimeout(() => setFocus(false), 150)}
        placeholder="e.g. Aria, Iris Yún, Crown Prince Jǐng…"
      />
      {focus && matches.length > 0 && (
        <div className="sf-autocomplete-menu">
          {matches.map((m) => (
            <button key={m} type="button" className="sf-autocomplete-item"
                    onMouseDown={(e) => { e.preventDefault(); onChange(m); }}>{m}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// Lightbox / detail editor — opens for any image
function ImageDetail({ image, url, onClose, updateImage, removeImage, addTag, removeTag }) {
  const [copied, setCopied] = React.useState('');
  if (!image) return null;
  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox-card" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>×</button>
        <div className="lightbox-img-wrap">
          {url ? <img src={url} alt={image.label || ''} /> : <div className="lightbox-loading">loading…</div>}
        </div>
        <div className="lightbox-meta">
          <input
            className="lightbox-label"
            placeholder="A name for this vision…"
            defaultValue={image.label}
            onBlur={(e) => updateImage(image.id, { label: e.target.value })}
          />
          <div className="lightbox-row">
            <StarBtn on={image.starred} onClick={() => updateImage(image.id, { starred: !image.starred })} />
            <PaletteStrip palette={image.palette} onCopy={(c) => { setCopied(c); setTimeout(() => setCopied(''), 1200); }} />
            {copied && <span className="copied-toast">copied {copied}</span>}
          </div>

          <StructuredFields image={image} updateImage={updateImage} />

          <label className="lightbox-section-label">Tags</label>
          <TagInput image={image} addTag={addTag} removeTag={removeTag} />
          <label className="lightbox-section-label">Notes &amp; quotes</label>
          <textarea
            className="lightbox-note"
            placeholder="What does this image whisper to you? Scene fragments, character notes, descriptions…"
            defaultValue={image.note}
            onBlur={(e) => updateImage(image.id, { note: e.target.value })}
            rows={6}
          />
          {image.source ? (
            <div className="lightbox-source">
              <span>source:</span>
              {/^https?:\/\//.test(image.source)
                ? <a href={image.source} target="_blank" rel="noreferrer">{image.source.length > 60 ? image.source.slice(0, 60) + '…' : image.source}</a>
                : <em>{image.source.length > 80 ? image.source.slice(0, 80) + '…' : image.source}</em>}
            </div>
          ) : null}
          <div className="lightbox-footer">
            <span className="lightbox-date">{new Date(image.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            <button className="lightbox-delete" onClick={() => { if (confirm('Remove this image?')) { removeImage(image.id); onClose(); } }}>
              Remove from board
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Filter bar — used by all variations. Returns filtered images.
function FilterBar({ images, query, setQuery, activeTags, setActiveTags, starredOnly, setStarredOnly }) {
  const allTags = React.useMemo(() => {
    const counts = new Map();
    images.forEach((r) => r.tags.forEach((t) => counts.set(t, (counts.get(t) || 0) + 1)));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [images]);

  const toggleTag = (t) => {
    setActiveTags((arr) => arr.includes(t) ? arr.filter((x) => x !== t) : [...arr, t]);
  };

  return (
    <div className="filterbar">
      <div className="filterbar-search">
        <span>🔍</span>
        <input
          placeholder="Search labels, notes, tags…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && <button className="filterbar-clear" onClick={() => setQuery('')}>×</button>}
      </div>
      <button
        className={`filterbar-star ${starredOnly ? 'on' : ''}`}
        onClick={() => setStarredOnly((s) => !s)}
      >
        {starredOnly ? '★' : '☆'} starred
      </button>
      {allTags.length > 0 && (
        <div className="filterbar-tags">
          {allTags.slice(0, 18).map(([t, n]) => (
            <button
              key={t}
              className={`filter-tag ${activeTags.includes(t) ? 'active' : ''}`}
              onClick={() => toggleTag(t)}
            >
              {t} <span className="ftag-count">{n}</span>
            </button>
          ))}
          {activeTags.length > 0 && (
            <button className="filter-clear" onClick={() => setActiveTags([])}>clear</button>
          )}
        </div>
      )}
    </div>
  );
}

function applyFilter(images, query, activeTags, starredOnly, structured = null) {
  const q = query.trim().toLowerCase();
  const s = structured || {};
  return images.filter((r) => {
    if (starredOnly && !r.starred) return false;
    if (activeTags.length && !activeTags.every((t) => r.tags.includes(t))) return false;
    if (s.category && r.category !== s.category) return false;
    if (s.realm && r.realm !== s.realm) return false;
    if (s.subRegion && r.subRegion !== s.subRegion) return false;
    if (s.era && r.era !== s.era) return false;
    if (s.season && r.season !== s.season) return false;
    if (s.status && r.status !== s.status) return false;
    if (!q) return true;
    if (r.label?.toLowerCase().includes(q)) return true;
    if (r.note?.toLowerCase().includes(q)) return true;
    if (r.character?.toLowerCase().includes(q)) return true;
    if (r.source?.toLowerCase().includes(q)) return true;
    if (r.tags.some((t) => t.includes(q))) return true;
    return false;
  });
}

Object.assign(window, {
  AddBar, TagPill, TagInput, PaletteStrip, StarBtn,
  ImageDetail, FilterBar, applyFilter, StructuredFields,
});
