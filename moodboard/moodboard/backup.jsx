// Backup module — export the entire mood board (images + metadata + boards)
// as a single .zip file, and import the same back. Lossless round-trip.
//
// Zip layout:
//   manifest.json              — { version, exportedAt, images: [...meta], boards: [...] }
//   images/<id>.<ext>          — the binary blob for each image (skipped for url-only records)
//
// On import: any image whose id already exists in your library is SKIPPED
// (so re-importing the same backup is safe). Boards are merged by id —
// same-id boards keep your current name, new-id boards are appended.

const BACKUP_VERSION = 1;

// Lazy-load JSZip from CDN on first use; cache the promise so we only fetch once.
let _jszipPromise = null;
function loadJSZip() {
  if (_jszipPromise) return _jszipPromise;
  _jszipPromise = new Promise((resolve, reject) => {
    if (window.JSZip) return resolve(window.JSZip);
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
    s.onload = () => resolve(window.JSZip);
    s.onerror = () => reject(new Error('Could not load JSZip'));
    document.head.appendChild(s);
  });
  return _jszipPromise;
}

function extFromMime(mime) {
  if (!mime) return 'bin';
  if (mime === 'image/jpeg') return 'jpg';
  if (mime === 'image/png') return 'png';
  if (mime === 'image/webp') return 'webp';
  if (mime === 'image/gif') return 'gif';
  if (mime === 'image/avif') return 'avif';
  if (mime === 'image/bmp') return 'bmp';
  if (mime === 'image/svg+xml') return 'svg';
  // best-guess
  const m = mime.match(/^image\/([\w+-]+)$/);
  return m ? m[1] : 'bin';
}

async function exportAll(progress) {
  const JSZip = await loadJSZip();
  const zip = new JSZip();

  // Read images metadata (same source the engine uses)
  const meta = JSON.parse(localStorage.getItem('serinas-moodboard-meta-v1') || '{"images":[]}');
  const images = meta.images || [];

  // Read boards (v2 sidebar)
  const boards = JSON.parse(localStorage.getItem('serinas-moodboard-boards-v1') || 'null');

  // Read free-layout (v1 masonry) state if present, future-proofing
  const layoutKeys = Object.keys(localStorage).filter((k) => k.startsWith('serinas-moodboard-'));
  const extraStorage = {};
  layoutKeys.forEach((k) => {
    if (k === 'serinas-moodboard-meta-v1' || k === 'serinas-moodboard-boards-v1') return;
    extraStorage[k] = localStorage.getItem(k);
  });

  // Pull each image blob from IndexedDB
  const imgFolder = zip.folder('images');
  let done = 0;
  const total = images.length;
  const exportedImages = [];
  for (const rec of images) {
    let storedFilename = null;
    if (rec.blobKey) {
      try {
        const blob = await dbGet(rec.blobKey);
        if (blob) {
          const ext = extFromMime(blob.type);
          storedFilename = `${rec.id}.${ext}`;
          imgFolder.file(storedFilename, blob);
        }
      } catch (e) {
        console.warn('export: blob read failed for', rec.id, e);
      }
    }
    // Strip volatile / runtime-only fields. Keep everything else.
    exportedImages.push({
      ...rec,
      // record what filename in the zip holds the blob (or null if it was url-only)
      _file: storedFilename,
    });
    done++;
    progress?.(done, total);
  }

  const manifest = {
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    counts: { images: images.length, boards: boards?.length || 0 },
    images: exportedImages,
    boards: boards,
    extraStorage,
  };
  zip.file('manifest.json', JSON.stringify(manifest, null, 2));

  const blob = await zip.generateAsync({ type: 'blob' }, (m) => {
    // zip-side progress, after the file-read phase
    progress?.(total, total, m.percent);
  });
  return blob;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

async function importFromZip(file, opts = {}) {
  const { onProgress, mode = 'merge' } = opts; // mode: 'merge' | 'replace'
  const JSZip = await loadJSZip();
  const zip = await JSZip.loadAsync(file);

  const manifestFile = zip.file('manifest.json');
  if (!manifestFile) throw new Error('Not a valid mood board backup — no manifest.json');
  const manifest = JSON.parse(await manifestFile.async('string'));
  if (!manifest.version || manifest.version > BACKUP_VERSION) {
    throw new Error('This backup was made by a newer version. Please update before importing.');
  }

  // Existing state
  const existingMeta = JSON.parse(localStorage.getItem('serinas-moodboard-meta-v1') || '{"images":[]}');
  const existingImages = existingMeta.images || [];
  const existingIds = new Set(existingImages.map((r) => r.id));

  let mergedImages = existingImages;
  if (mode === 'replace') {
    // Wipe existing IndexedDB blobs first
    for (const rec of existingImages) {
      if (rec.blobKey) await dbDelete(rec.blobKey).catch(() => {});
    }
    mergedImages = [];
    existingIds.clear();
  }

  // Restore each image: write blob to IndexedDB, push record into meta
  let done = 0;
  const total = manifest.images.length;
  const newImages = [];
  for (const rec of manifest.images) {
    if (mode === 'merge' && existingIds.has(rec.id)) {
      done++;
      onProgress?.(done, total, 'skipped duplicate');
      continue;
    }
    if (rec._file && rec.blobKey) {
      const fileEntry = zip.file('images/' + rec._file);
      if (fileEntry) {
        const blob = await fileEntry.async('blob');
        await dbPut(rec.blobKey, blob);
      }
    }
    const { _file, ...clean } = rec;
    newImages.push(clean);
    done++;
    onProgress?.(done, total);
  }

  // Newest first when merging — feels more natural
  mergedImages = mode === 'replace' ? newImages : [...newImages, ...mergedImages];
  localStorage.setItem('serinas-moodboard-meta-v1', JSON.stringify({ images: mergedImages }));

  // Boards: merge by id
  if (manifest.boards) {
    const existingBoards = JSON.parse(localStorage.getItem('serinas-moodboard-boards-v1') || 'null');
    if (mode === 'replace' || !existingBoards) {
      localStorage.setItem('serinas-moodboard-boards-v1', JSON.stringify(manifest.boards));
    } else {
      const byId = new Map(existingBoards.map((b) => [b.id, b]));
      manifest.boards.forEach((b) => { if (!byId.has(b.id)) byId.set(b.id, b); });
      // Preserve manifest's ordering, append unseen-from-existing at end
      const ordered = [];
      const seen = new Set();
      manifest.boards.forEach((b) => {
        if (byId.has(b.id)) { ordered.push(byId.get(b.id)); seen.add(b.id); }
      });
      existingBoards.forEach((b) => { if (!seen.has(b.id)) { ordered.push(b); seen.add(b.id); } });
      localStorage.setItem('serinas-moodboard-boards-v1', JSON.stringify(ordered));
    }
  }

  // Extra storage (free-layout positions, etc.)
  if (manifest.extraStorage) {
    Object.entries(manifest.extraStorage).forEach(([k, v]) => {
      if (mode === 'replace' || !localStorage.getItem(k)) {
        localStorage.setItem(k, v);
      }
    });
  }

  return {
    imported: newImages.length,
    skipped: total - newImages.length,
    boards: manifest.boards?.length || 0,
  };
}

// React component: Export & Import controls. Drop into any sidebar/footer.
function BackupControls({ compact }) {
  const [busy, setBusy] = React.useState(null); // 'export' | 'import' | null
  const [progress, setProgress] = React.useState('');
  const [toast, setToast] = React.useState('');
  const fileRef = React.useRef(null);

  const flashToast = (msg, ms = 4000) => {
    setToast(msg);
    setTimeout(() => setToast(''), ms);
  };

  const doExport = async () => {
    setBusy('export');
    setProgress('Gathering images…');
    try {
      const blob = await exportAll((d, t, zipPct) => {
        if (zipPct != null) setProgress(`Compressing… ${Math.round(zipPct)}%`);
        else setProgress(`Packing image ${d} of ${t}…`);
      });
      const stamp = new Date().toISOString().slice(0, 10);
      downloadBlob(blob, `serinas-moodboard-${stamp}.zip`);
      flashToast('Backup downloaded ✓');
    } catch (e) {
      flashToast('Export failed: ' + e.message, 6000);
    } finally {
      setBusy(null);
      setProgress('');
    }
  };

  const doImport = async (file) => {
    if (!file) return;
    const replace = confirm(
      'Import this backup?\n\n' +
      'OK = MERGE (keeps your current images, adds new ones from the backup, skips duplicates)\n' +
      'Cancel = REPLACE (wipes your current board first, then imports — DESTRUCTIVE)\n\n' +
      'Most of the time you want OK / Merge.'
    );
    // confirm returns true for OK (merge), false for Cancel (replace)
    const mode = replace ? 'merge' : 'replace';
    if (mode === 'replace') {
      if (!confirm('Are you SURE you want to replace? This will delete your current board.')) return;
    }

    setBusy('import');
    setProgress('Reading backup…');
    try {
      const result = await importFromZip(file, {
        mode,
        onProgress: (d, t, note) => setProgress(`Restoring image ${d} of ${t}${note ? ' (' + note + ')' : ''}…`),
      });
      flashToast(`Imported ${result.imported} images, skipped ${result.skipped} duplicates ✓`);
      // Reload so the engine picks up the restored data cleanly
      setTimeout(() => location.reload(), 1200);
    } catch (e) {
      flashToast('Import failed: ' + e.message, 6000);
      setBusy(null);
      setProgress('');
    }
  };

  return (
    <div className={`backup-controls ${compact ? 'compact' : ''}`}>
      <button
        className="backup-btn"
        onClick={doExport}
        disabled={busy != null}
        title="Download a .zip with every image, tag, board, and note. Save it anywhere — restore on any device."
      >
        ⬇ Export backup
      </button>
      <button
        className="backup-btn"
        onClick={() => fileRef.current?.click()}
        disabled={busy != null}
        title="Restore a previously exported .zip. Merges by default — duplicates are skipped."
      >
        ⬆ Import backup
      </button>
      <input
        ref={fileRef}
        type="file"
        accept=".zip,application/zip,application/x-zip-compressed"
        style={{ display: 'none' }}
        onChange={(e) => { doImport(e.target.files?.[0]); e.target.value = ''; }}
      />
      {busy && <div className="backup-progress">{progress}</div>}
      {toast && <div className="backup-toast">{toast}</div>}
    </div>
  );
}

window.BackupControls = BackupControls;
window.exportAll = exportAll;
window.importFromZip = importFromZip;
