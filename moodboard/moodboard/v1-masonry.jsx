// Variation 1 — Pinterest-style masonry with tags + filter + search.
// The "default but better" — feels familiar, cleanest path for a writer with hundreds of images.

function MasonryCard({ image, url, onOpen, updateImage, addTag, removeTag }) {
  const aspect = image.width && image.height ? (image.height / image.width) : 1.2;
  return (
    <div className="m1-card" style={{ gridRowEnd: `span ${Math.max(20, Math.round(aspect * 30) + 14)}` }}>
      <div className="m1-img-wrap" onClick={onOpen}>
        {url ? <img src={url} alt={image.label || ''} loading="lazy" /> : <div className="m1-skeleton" style={{ paddingTop: `${aspect * 100}%` }} />}
        <div className="m1-overlay">
          <StarBtn on={image.starred} onClick={(e) => { e.stopPropagation(); updateImage(image.id, { starred: !image.starred }); }} />
          {image.palette?.length > 0 && (
            <div className="m1-palette">
              {image.palette.slice(0, 5).map((c, i) => <span key={i} style={{ background: c }} />)}
            </div>
          )}
        </div>
      </div>
      {(image.label || image.note || image.tags.length > 0) && (
        <div className="m1-meta" onClick={onOpen}>
          {image.label && <div className="m1-label">{image.label}</div>}
          {image.note && <div className="m1-note">{image.note.slice(0, 80)}{image.note.length > 80 ? '…' : ''}</div>}
          {image.tags.length > 0 && (
            <div className="m1-tags">
              {image.tags.slice(0, 4).map((t) => <span key={t} className="tag-pill mini">{t}</span>)}
              {image.tags.length > 4 && <span className="tag-pill mini muted">+{image.tags.length - 4}</span>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Masonry() {
  const board = useMoodBoard();
  const { images, resolvedUrls, addImage, updateImage, removeImage, addTag, removeTag } = board;
  useGlobalIngest(addImage);

  const [query, setQuery] = React.useState('');
  const [activeTags, setActiveTags] = React.useState([]);
  const [starredOnly, setStarredOnly] = React.useState(false);
  const [openId, setOpenId] = React.useState(null);

  const filtered = applyFilter(images, query, activeTags, starredOnly);
  const openImage = images.find((r) => r.id === openId);

  return (
    <div className="m1-root">
      <div className="m1-header">
        <h2><span className="m1-glyph">文</span> Mood Board</h2>
        <p className="m1-subtitle">A scroll of inspirations — paste, drop, pin freely</p>
      </div>
      <AddBar addImage={addImage} />
      <FilterBar
        images={images}
        query={query} setQuery={setQuery}
        activeTags={activeTags} setActiveTags={setActiveTags}
        starredOnly={starredOnly} setStarredOnly={setStarredOnly}
      />
      <div className="m1-stats">
        {filtered.length} {filtered.length === 1 ? 'vision' : 'visions'}
        {filtered.length !== images.length && <span> of {images.length}</span>}
      </div>
      {images.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="m1-grid">
          {filtered.map((rec) => (
            <MasonryCard
              key={rec.id}
              image={rec}
              url={resolvedUrls[rec.id]}
              onOpen={() => setOpenId(rec.id)}
              updateImage={updateImage}
              addTag={addTag}
              removeTag={removeTag}
            />
          ))}
        </div>
      )}
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

function EmptyState() {
  return (
    <div className="m1-empty">
      <div className="m1-empty-glyph">⊹</div>
      <h3>The board is bare.</h3>
      <p>Paste an image URL above, drag pictures from your desktop, or press <kbd>Ctrl/Cmd</kbd>+<kbd>V</kbd> after copying any image.</p>
      <p className="m1-empty-hint">Pinterest tip: right-click any pin → <em>Copy image address</em> → paste it here.</p>
    </div>
  );
}

window.Masonry = Masonry;
