// Variation 3 — Atelier wall. Free-form pinned scrapboard with light rotation,
// torn-paper notes, and the bible-cream/pink palette. Drag images to arrange.

function PinCard({ image, url, onOpen, updateImage, onDragStart, isDragging }) {
  const rot = image.rotation ?? 0;
  const w = image.displayWidth ?? 220;
  return (
    <div
      className={`m3-pin ${isDragging ? 'dragging' : ''} ${image.starred ? 'starred' : ''}`}
      style={{
        left: image.x ?? 0, top: image.y ?? 0,
        transform: `rotate(${rot}deg)`,
        width: w + 'px',
      }}
      onMouseDown={onDragStart}
    >
      <div className="m3-pin-tape" />
      <div className="m3-pin-img" onClick={onOpen}>
        {url ? <img src={url} alt={image.label || ''} loading="lazy" draggable={false} /> : <div className="m3-skel" />}
      </div>
      {(image.label || image.note) && (
        <div className="m3-pin-caption">
          {image.label && <div className="m3-pin-label">{image.label}</div>}
          {image.note && <div className="m3-pin-note">{image.note.slice(0, 60)}{image.note.length > 60 ? '…' : ''}</div>}
        </div>
      )}
      {image.palette?.length > 0 && (
        <div className="m3-pin-palette">
          {image.palette.slice(0, 5).map((c, i) => <span key={i} style={{ background: c }} />)}
        </div>
      )}
      <button className="m3-star" onClick={(e) => { e.stopPropagation(); updateImage(image.id, { starred: !image.starred }); }}>
        {image.starred ? '★' : '☆'}
      </button>
    </div>
  );
}

function Atelier() {
  const board = useMoodBoard();
  const { images, resolvedUrls, addImage, updateImage, removeImage, addTag, removeTag } = board;
  useGlobalIngest(addImage, { onAdded: (rec) => {
    if (rec && rec.x == null) {
      // Place new pins in a loose grid spread
      const n = images.length;
      const col = n % 5, row = Math.floor(n / 5);
      const x = 60 + col * 240 + (Math.random() * 40 - 20);
      const y = 80 + row * 280 + (Math.random() * 40 - 20);
      const rotation = (Math.random() * 8 - 4);
      updateImage(rec.id, { x, y, rotation });
    }
  } });

  const [query, setQuery] = React.useState('');
  const [activeTags, setActiveTags] = React.useState([]);
  const [starredOnly, setStarredOnly] = React.useState(false);
  const [openId, setOpenId] = React.useState(null);
  const [dragId, setDragId] = React.useState(null);
  const wallRef = React.useRef(null);

  // Auto-place any image still missing coords
  React.useEffect(() => {
    images.forEach((rec, i) => {
      if (rec.x == null) {
        const col = i % 5, row = Math.floor(i / 5);
        const x = 60 + col * 240 + (Math.random() * 40 - 20);
        const y = 80 + row * 280 + (Math.random() * 40 - 20);
        const rotation = (Math.random() * 8 - 4);
        updateImage(rec.id, { x, y, rotation });
      }
    });
  }, [images.length]);

  // Drag a pin
  const onPinDown = (rec) => (e) => {
    if (e.target.tagName === 'BUTTON') return;
    e.preventDefault();
    setDragId(rec.id);
    const startX = e.clientX, startY = e.clientY;
    const origX = rec.x ?? 0, origY = rec.y ?? 0;
    let lastX = origX, lastY = origY;
    const move = (ev) => {
      lastX = origX + (ev.clientX - startX);
      lastY = origY + (ev.clientY - startY);
      // Direct DOM move during drag — commit on release
      const el = document.querySelector(`[data-pin-id="${rec.id}"]`);
      if (el) el.style.transform = `translate(${lastX - origX}px, ${lastY - origY}px) rotate(${rec.rotation || 0}deg)`;
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      updateImage(rec.id, { x: lastX, y: lastY });
      setDragId(null);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  const filtered = applyFilter(images, query, activeTags, starredOnly);
  const openImage = images.find((r) => r.id === openId);

  // Compute wall extents based on pin positions
  const wallSize = React.useMemo(() => {
    let maxX = 1200, maxY = 800;
    images.forEach((r) => {
      if ((r.x ?? 0) + (r.displayWidth ?? 220) > maxX) maxX = (r.x ?? 0) + (r.displayWidth ?? 220);
      if ((r.y ?? 0) + 320 > maxY) maxY = (r.y ?? 0) + 320;
    });
    return { width: maxX + 200, height: maxY + 200 };
  }, [images]);

  return (
    <div className="m3-root">
      <div className="m3-topbar">
        <div className="m3-title">
          <span className="m3-glyph">文</span>
          <div>
            <h2>The Atelier Wall</h2>
            <p>Pin freely — drag to arrange — let the wall fill up</p>
          </div>
        </div>
        <AddBar addImage={addImage} hint={<><kbd>Ctrl/Cmd</kbd>+<kbd>V</kbd> · drag onto the wall</>} />
        <FilterBar
          images={images}
          query={query} setQuery={setQuery}
          activeTags={activeTags} setActiveTags={setActiveTags}
          starredOnly={starredOnly} setStarredOnly={setStarredOnly}
        />
      </div>
      <div className="m3-wall-wrap">
        <div className="m3-wall" ref={wallRef} style={{ width: wallSize.width, height: wallSize.height }}>
          {images.length === 0 && (
            <div className="m3-wall-empty">
              <div className="m3-empty-glyph">⊹</div>
              <p>The wall is bare. Pin your first vision.</p>
              <p className="muted">Paste a URL, drag a file, or Ctrl/Cmd+V.</p>
            </div>
          )}
          {filtered.map((rec) => (
            <div key={rec.id} data-pin-id={rec.id} className="m3-pin-wrap">
              <PinCard
                image={rec}
                url={resolvedUrls[rec.id]}
                onOpen={() => setOpenId(rec.id)}
                updateImage={updateImage}
                onDragStart={onPinDown(rec)}
                isDragging={dragId === rec.id}
              />
            </div>
          ))}
        </div>
      </div>
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

window.Atelier = Atelier;
