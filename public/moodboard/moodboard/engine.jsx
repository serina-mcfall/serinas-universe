// Mood board engine — shared across all variations.
// Storage: IndexedDB (for images as Blobs — survives thousands without choking)
// + localStorage for metadata (tags, notes, positions, palettes).
// Each image has: id, blobKey OR url, label, note, tags[], palette[], source, starred,
//                 createdAt, x, y, rotation, width (for free layout)

const DB_NAME = 'serinas-moodboard';
const DB_STORE = 'images';
const META_KEY = 'serinas-moodboard-meta-v1';

// ─── IndexedDB helpers ─────────────────────────────────────────────
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function dbPut(key, blob) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readwrite');
    tx.objectStore(DB_STORE).put(blob, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
async function dbGet(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readonly');
    const req = tx.objectStore(DB_STORE).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function dbDelete(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, 'readwrite');
    tx.objectStore(DB_STORE).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// ─── Metadata (the index) ──────────────────────────────────────────
function loadMeta() {
  try {
    const raw = localStorage.getItem(META_KEY);
    if (!raw) return { images: [] };
    return JSON.parse(raw);
  } catch (e) {
    return { images: [] };
  }
}
function saveMeta(meta) {
  localStorage.setItem(META_KEY, JSON.stringify(meta));
}

// ─── Palette extraction (k-means lite, 5 colors) ───────────────────
function extractPalette(imgEl, count = 5) {
  return new Promise((resolve) => {
    try {
      const w = 60, h = 60;
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      ctx.drawImage(imgEl, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      // Bucket pixels into 4-bit per channel buckets, then pick top buckets.
      const buckets = new Map();
      for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3];
        if (a < 128) continue;
        const r = data[i] >> 4, g = data[i + 1] >> 4, b = data[i + 2] >> 4;
        const key = (r << 8) | (g << 4) | b;
        const entry = buckets.get(key) || { r: 0, g: 0, b: 0, n: 0 };
        entry.r += data[i]; entry.g += data[i + 1]; entry.b += data[i + 2]; entry.n += 1;
        buckets.set(key, entry);
      }
      const sorted = [...buckets.values()].sort((a, b) => b.n - a.n);
      // Greedy de-dup: skip new candidates too close to already chosen ones.
      const chosen = [];
      for (const e of sorted) {
        const r = Math.round(e.r / e.n), g = Math.round(e.g / e.n), b = Math.round(e.b / e.n);
        const hex = '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
        const tooClose = chosen.some((c) => {
          const cr = parseInt(c.slice(1, 3), 16), cg = parseInt(c.slice(3, 5), 16), cb = parseInt(c.slice(5, 7), 16);
          return Math.abs(cr - r) + Math.abs(cg - g) + Math.abs(cb - b) < 60;
        });
        if (!tooClose) chosen.push(hex);
        if (chosen.length >= count) break;
      }
      resolve(chosen);
    } catch (e) {
      resolve([]);
    }
  });
}

// ─── Image ingestion ───────────────────────────────────────────────
// Returns a new image record (without blob attached — caller writes meta)
async function ingestBlob(blob, opts = {}) {
  const id = 'img_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
  const blobKey = id + '_blob';
  await dbPut(blobKey, blob);
  const objectUrl = URL.createObjectURL(blob);
  const img = await loadImg(objectUrl);
  const palette = await extractPalette(img);
  return {
    id, blobKey,
    url: null,
    label: opts.label || '',
    note: '',
    tags: opts.tags || [],
    palette,
    source: opts.source || '',
    starred: false,
    bibleLink: null, // {section, prompt}
    createdAt: Date.now(),
    width: img.naturalWidth,
    height: img.naturalHeight,
    // free-layout coords (set by Variation 1)
    x: null, y: null, rotation: 0, displayWidth: 220,
  };
}

async function ingestUrl(url, opts = {}) {
  // Try to fetch as blob (works for many CORS-friendly sources). If it fails, fall back to keeping URL.
  try {
    const resp = await fetch(url, { mode: 'cors' });
    if (resp.ok) {
      const blob = await resp.blob();
      if (blob.type.startsWith('image/')) {
        const rec = await ingestBlob(blob, { ...opts, source: opts.source || url });
        return rec;
      }
    }
  } catch (e) { /* fall through */ }
  // Fallback: load via <img crossOrigin> for palette, store URL only
  try {
    const img = await loadImg(url, true);
    const palette = await extractPalette(img);
    return {
      id: 'img_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
      blobKey: null,
      url,
      label: opts.label || '',
      note: '',
      tags: opts.tags || [],
      palette,
      source: opts.source || url,
      starred: false,
      bibleLink: null,
      createdAt: Date.now(),
      width: img.naturalWidth || 800,
      height: img.naturalHeight || 600,
      x: null, y: null, rotation: 0, displayWidth: 220,
    };
  } catch (e) {
    // Last resort: store URL with no palette
    return {
      id: 'img_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
      blobKey: null,
      url,
      label: opts.label || '',
      note: '',
      tags: opts.tags || [],
      palette: [],
      source: opts.source || url,
      starred: false,
      bibleLink: null,
      createdAt: Date.now(),
      width: 800, height: 600,
      x: null, y: null, rotation: 0, displayWidth: 220,
    };
  }
}

function loadImg(src, crossOrigin = false) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (crossOrigin) img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Resolve an image record to a displayable URL.
const _urlCache = new Map();
async function resolveDisplayUrl(rec) {
  if (rec.url) return rec.url;
  if (rec.blobKey) {
    if (_urlCache.has(rec.id)) return _urlCache.get(rec.id);
    const blob = await dbGet(rec.blobKey);
    if (!blob) return null;
    const url = URL.createObjectURL(blob);
    _urlCache.set(rec.id, url);
    return url;
  }
  return null;
}

// ─── React hook: useMoodBoard ─────────────────────────────────────
function useMoodBoard() {
  const [images, setImages] = React.useState(() => loadMeta().images || []);
  const [resolvedUrls, setResolvedUrls] = React.useState({});

  // Persist on every change
  React.useEffect(() => {
    saveMeta({ images });
  }, [images]);

  // Resolve blob URLs lazily when records change
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const rec of images) {
        if (resolvedUrls[rec.id]) continue;
        const url = await resolveDisplayUrl(rec);
        if (cancelled) return;
        if (url) setResolvedUrls((u) => ({ ...u, [rec.id]: url }));
      }
    })();
    return () => { cancelled = true; };
  }, [images]);

  const addImage = React.useCallback(async (input, opts = {}) => {
    let rec;
    if (input instanceof Blob) {
      rec = await ingestBlob(input, opts);
    } else if (typeof input === 'string') {
      rec = await ingestUrl(input, opts);
    } else {
      return null;
    }
    setImages((arr) => [rec, ...arr]);
    return rec;
  }, []);

  const updateImage = React.useCallback((id, patch) => {
    setImages((arr) => arr.map((r) => r.id === id ? { ...r, ...patch } : r));
  }, []);

  const removeImage = React.useCallback(async (id) => {
    const rec = images.find((r) => r.id === id);
    if (rec?.blobKey) await dbDelete(rec.blobKey).catch(() => {});
    if (_urlCache.has(id)) {
      try { URL.revokeObjectURL(_urlCache.get(id)); } catch (e) {}
      _urlCache.delete(id);
    }
    setImages((arr) => arr.filter((r) => r.id !== id));
  }, [images]);

  const addTag = React.useCallback((id, tag) => {
    const t = tag.trim().toLowerCase();
    if (!t) return;
    setImages((arr) => arr.map((r) => {
      if (r.id !== id) return r;
      if (r.tags.includes(t)) return r;
      return { ...r, tags: [...r.tags, t] };
    }));
  }, []);

  const removeTag = React.useCallback((id, tag) => {
    setImages((arr) => arr.map((r) => r.id === id ? { ...r, tags: r.tags.filter((t) => t !== tag) } : r));
  }, []);

  return { images, resolvedUrls, addImage, updateImage, removeImage, addTag, removeTag };
}

// ─── Universal "add image" surface (paste, drop, upload, URL) ─────
// Listens at the document level for paste; provides drag-drop on a target;
// returns helpers to render UI.
function useGlobalIngest(addImage, opts = {}) {
  const { defaultTags = [], onAdded } = opts;
  const optsRef = React.useRef(opts);
  optsRef.current = opts;

  // Paste anywhere
  React.useEffect(() => {
    const handler = async (e) => {
      // Skip if user is typing in a textarea/input
      const t = e.target;
      if (t && (t.tagName === 'TEXTAREA' || t.tagName === 'INPUT' || t.isContentEditable)) return;
      const items = e.clipboardData?.items || [];
      let added = false;
      for (const it of items) {
        if (it.kind === 'file' && it.type.startsWith('image/')) {
          const blob = it.getAsFile();
          if (blob) {
            e.preventDefault();
            const rec = await addImage(blob, { tags: defaultTags });
            added = true;
            optsRef.current.onAdded?.(rec);
          }
        }
      }
      if (!added) {
        // Try plain text — could be a URL
        const text = e.clipboardData?.getData('text/plain');
        if (text && /^https?:\/\/.+\.(png|jpe?g|gif|webp|avif|bmp)(\?.*)?$/i.test(text.trim())) {
          e.preventDefault();
          const rec = await addImage(text.trim(), { tags: defaultTags, source: text.trim() });
          optsRef.current.onAdded?.(rec);
        }
      }
    };
    document.addEventListener('paste', handler);
    return () => document.removeEventListener('paste', handler);
  }, [addImage, defaultTags.join('|')]);

  // Drag-drop on body
  React.useEffect(() => {
    const onDragOver = (e) => {
      if (e.dataTransfer?.types?.includes('Files') || e.dataTransfer?.types?.includes('text/uri-list')) {
        e.preventDefault();
      }
    };
    const onDrop = async (e) => {
      const dt = e.dataTransfer;
      if (!dt) return;
      let added = false;
      if (dt.files?.length) {
        e.preventDefault();
        for (const f of dt.files) {
          if (f.type.startsWith('image/')) {
            const rec = await addImage(f, { tags: defaultTags });
            optsRef.current.onAdded?.(rec);
            added = true;
          }
        }
      }
      if (!added) {
        const url = dt.getData('text/uri-list') || dt.getData('text/plain');
        if (url && /^https?:\/\//i.test(url)) {
          e.preventDefault();
          const rec = await addImage(url, { tags: defaultTags, source: url });
          optsRef.current.onAdded?.(rec);
        }
      }
    };
    document.addEventListener('dragover', onDragOver);
    document.addEventListener('drop', onDrop);
    return () => {
      document.removeEventListener('dragover', onDragOver);
      document.removeEventListener('drop', onDrop);
    };
  }, [addImage, defaultTags.join('|')]);
}

// ─── Suggested tags — pulled from the full world bible canon ───────
// Mirrors the structure in serinas-universe/src/data/sections.js + the canon
// files in when-the-land-sang/canon (MEMORY.md, aurum-worldbuilding.md, etc.)
const BIBLE_TAGS = {
  realms: [
    'aoli', 'isenholt', 'tyramare', 'aurum', 'solis', 'maramir', 'braedun', 'ardmere',
  ],
  cosmology: [
    'mujin', 'yueli', 'the-third', 'yanlong', 'yunsheng', 'wenji', 'fengzhe', 'minhui',
    'wind-serpent', 'koi-fish', 'immortal-twins', 'fragments', 'prophecy', 'eight-trees',
    'hope', 'mercy', 'memory', 'joy', 'courage', 'wisdom', 'change', 'time',
  ],
  // === AOLI ===
  'aoli-imperial': [
    'chen-dynasty', 'zichen', 'chen-yuan', 'li-wan', 'mu-taihou', 'chen-jing',
    'chen-wu', 'chen-qing', 'chen-lan', 'lu-mei', 'cui-yuanjing', 'crown-princess-selection',
    'imperial-court', 'imperial-guard', 'three-ducal-ministers', 'nine-ministers',
  ],
  'aoli-yan': [
    'yan-sect', 'shi-an', 'shan-ru', 'tu-heng', 'yan-shou', 'ke-zhen', 'tian-mu',
    'dragon-spine', 'mountain-stone', 'earth-affinity',
  ],
  'aoli-yun': [
    'yun-sect', 'chao-lan', 'lian-ying', 'bo-xi', 'hai-shen', 'ming-meng', 'he-chang',
    'water-stillness', 'cherry-blossoms', 'water-affinity',
  ],
  'aoli-wen': [
    'wen-sect', 'chen-xi', 'qing-he', 'lie-feng', 'ning-shui', 'zhen-yu',
    'five-winds', 'guqin', 'flute', 'pipa', 'erhu', 'wind-affinity',
  ],
  'aoli-fen': [
    'fen-sect', 'jing-huo', 'yin-huo', 'le-huo', 'jie-huo', 'meng-huo',
    'chaos-quintet', 'phoenix-ash', 'forge', 'fire-affinity', 'empty-seat',
  ],
  'aoli-hun': [
    'hun-sect', 'bai-shuang', 'jin-yan', 'zi-ye', 'bi-lan', 'you-lan',
    'soul-weave', 'living-cave', 'veil-walking', 'spirit-affinity', 'mist',
  ],
  'aoli-shi': [
    'shi-sect', 'avatar', 'smiling-blade', 'veiled-advisor', 'blind-poisoner', 'entheras',
    'gui-the-blood-witch', 'corruption', 'fragment-carriers',
  ],
  // === ISENHOLT ===
  isenholt: [
    'greymane', 'mistborne', 'stonewall', 'shroudborn', 'skycrest', 'coldhollow',
    'wolf-clan', 'fox-clan', 'bear-clan', 'leopard-clan', 'eagle-clan', 'owl-clan',
    'frost-howl', 'vanishing-snow', 'ironhide', 'mistwalkers', 'frostwing', 'nightfall',
    'stoneborn', 'stonebred', 'hearthkeeper', 'volugan',
    'silvermyst', 'skyborn', 'rootweaver', 'god-touched',
    'beast-bond', 'marriage-fires', 'gods-tears', 'living-cave', 'ivyless',
    'fjords', 'steppes', 'longhouse', 'yurt', 'davaa',
  ],
  // === TYRAMARE ===
  tyramare: [
    'spice-harbour', 'marble-quarter', 'iron-quarter', 'the-veil', 'aurumvale',
    'stillhaven', 'the-solace',
    'solenthera', 'umbrathi', 'verenthae', 'oranthi', 'entheras-pope',
    'guild-seats', 'empty-throne', 'bannric', 'canals', 'gondolas',
  ],
  // === AURUM ===
  'aurum-islands': [
    'tianxin', 'the-heart', 'wuying', 'the-bastion', 'yunshi', 'the-exchange',
    'wenyuan', 'the-gardens', 'tianzhui', 'the-anvil', 'lutian', 'the-greenfields',
  ],
  'aurum-anvil-districts': [
    'tiefang', 'forge-quarter', 'shiji', 'lantern-market', 'matou', 'lower-wharfside',
    'linhu', 'the-wards', 'yungang', 'the-cable-quay',
  ],
  'aurum-people': [
    'aria', 'aria-tyramare', 'iris-yun', 'bart', 'bartholomew-tie', 'tick-and-tock',
    'joren', 'mei-apprentice', 'grannie', 'grannie-thistledown', 'phineas-thatcher',
    'madam-lu', 'master-harrow', 'velan-lumen', 'lady-narcia', 'xin-the-owl',
  ],
  'aurum-canon': [
    'sky-cities', 'floating-islands', 'waterfalls', 'diwu-tree', 'hope-tree',
    'blood-tree', 'blood-magic', 'artimancers', 'dirigibles', 'cable-cars',
    'pneumatic-lifts', 'brass-clockwork', 'goggles', 'underrock', 'the-bilge',
    'royal-house', 'high-chancellor', 'inquisition', 'city-watch', 'aurum-archival',
    'subterranean-lake', 'olympian-marble', 'pagoda-peaks', 'paper-lanterns',
    'tea-pavilions', 'cherry-blossoms-aurum',
  ],
  // === SOLIS ===
  solis: [
    'yulan-strait', 'pleasure-house', 'lady-pearl', 'water-twin', 'vesper-lumen',
    'tang-coded', 'silk-road', 'jewelled-rot', 'courtesan',
  ],
  // === MARAMIR ===
  maramir: [
    'shadow-prince', 'mirage-magic', 'desert', 'nomadic', 'shadow-arts',
    'assassin', 'oasis', 'caravan',
  ],
  // === BRAEDUN ===
  braedun: [
    'lunewood', 'mistwood', 'wardwood', 'havenwood', 'reedwood', 'elderwood',
    'sacred-grove', 'nyra-lake', 'silver-road', 'standing-stones', 'stone-circle',
    'badan', 'eilwen', 'cadfael', 'breyle', 'rhonwen', 'morag',
    'druids', 'bards', 'celtic', 'arthurian', 'tree-dwelling', 'canopy-home',
    'fire-festivals', 'handfast', 'earth-twin',
  ],
  // === ARDMERE ===
  ardmere: [
    'farmland', 'slavery', 'revolution', 'sleeping-earth-magic', 'fields',
    'manor', 'serfs', 'iron-collar',
  ],
  // === FELLOWSHIP / VIRTUES ===
  virtues: [
    'aria-hope', 'yuean-mercy', 'xuehua-memory', 'genmu-joy',
    'temgar-courage', 'liyin-wisdom', 'lu-mei-change', 'transmigrator-time',
    'the-virtues', 'the-fellowship',
  ],
  // === THEMES & MOOD ===
  themes: [
    'architecture', 'interior', 'wardrobe', 'clothing', 'textiles', 'jewelry',
    'weapons', 'armor', 'food', 'feast', 'creatures', 'beasts', 'magic',
    'landscape', 'ruins', 'temple', 'palace', 'market', 'tavern', 'workshop',
  ],
  mood: [
    'atmosphere', 'lighting', 'golden-hour', 'sunset', 'mist', 'rain', 'snow',
    'color-palette', 'reference', 'sketch', 'portrait', 'wide-shot', 'detail',
  ],
};

const ALL_SUGGESTED = Object.values(BIBLE_TAGS).flat();

Object.assign(window, {
  useMoodBoard, useGlobalIngest, ingestBlob, ingestUrl,
  resolveDisplayUrl, BIBLE_TAGS, ALL_SUGGESTED, extractPalette, loadImg,
});
