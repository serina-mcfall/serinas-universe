// ImageInfoPanel — slide-in side panel that shows everything for one image
// and lets the user edit category, realm, sub-region, era, character,
// season, status, source URL, label, note. Tags stay on the image card
// because they live everywhere; this panel is for structured fields.
//
// Usage:
//   const [panelImg, setPanelImg] = React.useState(null);
//   ...
//   {panelImg && <ImageInfoPanel image={panelImg} updateImage={updateImage}
//                                 onClose={() => setPanelImg(null)} />}

const { CATEGORIES, REALMS, ERAS, SEASONS, STATUSES,
        findRealm, realmLabel, statusMeta } = window.MoodCatalog;

function FieldRow({ label, children, hint }) {
  return (
    <div className="iip-field">
      <label className="iip-field-label">{label}</label>
      {children}
      {hint && <div className="iip-field-hint">{hint}</div>}
    </div>
  );
}

function CharacterAutocomplete({ value, onChange }) {
  const [focus, setFocus] = React.useState(false);
  const list = (window.ALL_SUGGESTED || []).filter((t) => /[a-z]/i.test(t));
  const q = (value || '').toLowerCase().trim();
  const matches = q
    ? list.filter((t) => t.includes(q) && t !== q).slice(0, 8)
    : [];
  return (
    <div className="iip-autocomplete">
      <input
        className="iip-input"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setTimeout(() => setFocus(false), 150)}
        placeholder="e.g. Aria, Iris Yún, Crown Prince Jǐng…"
      />
      {focus && matches.length > 0 && (
        <div className="iip-autocomplete-menu">
          {matches.map((m) => (
            <button
              key={m}
              type="button"
              className="iip-autocomplete-item"
              onMouseDown={(e) => { e.preventDefault(); onChange(m); }}
            >
              {m}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ImageInfoPanel({ image, resolvedUrl, updateImage, onClose, onRemove }) {
  if (!image) return null;

  const set = (patch) => updateImage(image.id, patch);

  // Cache realm to drive sub-region dropdown
  const realm = findRealm(image.realm);
  const subs = realm ? realm.subs : [];

  return (
    <>
      <div className="iip-backdrop" onClick={onClose} />
      <aside className="iip-panel" role="dialog" aria-label="Image details">
        <header className="iip-header">
          <h2>Image details</h2>
          <button className="iip-close" onClick={onClose} title="Close (Esc)">×</button>
        </header>

        <div className="iip-preview">
          {resolvedUrl
            ? <img src={resolvedUrl} alt={image.label || 'reference'} />
            : <div className="iip-preview-placeholder">no preview</div>}
        </div>

        <div className="iip-body">
          <FieldRow label="Label">
            <input
              className="iip-input"
              value={image.label || ''}
              onChange={(e) => set({ label: e.target.value })}
              placeholder="Short title (e.g. 'Aria's daily wear')"
            />
          </FieldRow>

          <FieldRow label="What is this for?">
            <select
              className="iip-input"
              value={image.category || ''}
              onChange={(e) => set({ category: e.target.value })}
            >
              <option value="">— uncategorised —</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.glyph}  {c.label}</option>
              ))}
            </select>
          </FieldRow>

          <div className="iip-row-2">
            <FieldRow label="Realm">
              <select
                className="iip-input"
                value={image.realm || ''}
                onChange={(e) => set({ realm: e.target.value, subRegion: '' })}
              >
                <option value="">— none —</option>
                {REALMS.map((r) => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </FieldRow>

            <FieldRow label="Sub-region">
              <select
                className="iip-input"
                value={image.subRegion || ''}
                onChange={(e) => set({ subRegion: e.target.value })}
                disabled={!realm || subs.length <= 1}
              >
                {subs.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </FieldRow>
          </div>

          <div className="iip-row-2">
            <FieldRow label="Era">
              <select
                className="iip-input"
                value={image.era || ''}
                onChange={(e) => set({ era: e.target.value })}
              >
                <option value="">— unset —</option>
                {ERAS.map((e) => (
                  <option key={e.id} value={e.id}>{e.label}</option>
                ))}
              </select>
            </FieldRow>

            <FieldRow label="Season">
              <select
                className="iip-input"
                value={image.season || ''}
                onChange={(e) => set({ season: e.target.value })}
              >
                <option value="">— unset —</option>
                {SEASONS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </FieldRow>
          </div>

          <FieldRow label="Character" hint="Free text — autocompletes from canon names.">
            <CharacterAutocomplete
              value={image.character}
              onChange={(v) => set({ character: v })}
            />
          </FieldRow>

          <FieldRow label="Status">
            <div className="iip-status-pills">
              {STATUSES.map((s) => {
                const active = image.status === s.id;
                return (
                  <button
                    key={s.id}
                    className={`iip-status-pill ${active ? 'active' : ''}`}
                    style={active ? { borderColor: s.tone, color: s.tone } : null}
                    onClick={() => set({ status: active ? '' : s.id })}
                  >
                    <span className="iip-status-glyph" style={{ color: s.tone }}>{s.glyph}</span>
                    {s.label}
                  </button>
                );
              })}
            </div>
          </FieldRow>

          <FieldRow label="Source / credit" hint="Where it came from — URL, artist name, book.">
            <input
              className="iip-input"
              value={image.source || ''}
              onChange={(e) => set({ source: e.target.value })}
              placeholder="https://… or 'Pinterest — @user' or 'Studio Ghibli, Spirited Away'"
            />
          </FieldRow>

          <FieldRow label="Note">
            <textarea
              className="iip-input iip-textarea"
              rows={4}
              value={image.note || ''}
              onChange={(e) => set({ note: e.target.value })}
              placeholder="Why does this matter? What detail are you keeping?"
            />
          </FieldRow>

          {image.palette?.length > 0 && (
            <FieldRow label="Extracted palette">
              <div className="iip-palette">
                {image.palette.map((c, i) => (
                  <span key={i} className="iip-swatch" style={{ background: c }} title={c} />
                ))}
              </div>
            </FieldRow>
          )}

          <div className="iip-actions">
            {onRemove && (
              <button
                className="iip-danger"
                onClick={() => {
                  if (confirm('Delete this image from your board? This cannot be undone.')) {
                    onRemove(image.id);
                    onClose();
                  }
                }}
              >
                Delete image
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

// Esc-to-close — wire from the host
function useEscToClose(active, onClose) {
  React.useEffect(() => {
    if (!active) return;
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [active, onClose]);
}

window.ImageInfoPanel = ImageInfoPanel;
window.useEscToClose = useEscToClose;
