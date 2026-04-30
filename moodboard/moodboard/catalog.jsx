// Structured field catalog — drives the dropdowns on the image info panel
// and the filters in the v2 sidebar. One source of truth so additions
// are easy.

const CATEGORIES = [
  { id: 'clothing',    label: 'Clothing / costume',    glyph: '⌬' },
  { id: 'architecture',label: 'Architecture',          glyph: '⌂' },
  { id: 'landscape',   label: 'Landscape / environment',glyph: '⛰' },
  { id: 'interior',    label: 'Interior',              glyph: '◰' },
  { id: 'object',      label: 'Object / prop',         glyph: '◇' },
  { id: 'character',   label: 'Character reference',   glyph: '☉' },
  { id: 'hairmakeup',  label: 'Hair & makeup',         glyph: '✶' },
  { id: 'jewellery',   label: 'Jewellery & accessories',glyph: '✦' },
  { id: 'weapon',      label: 'Weapon / armour',       glyph: '⚔' },
  { id: 'flora',       label: 'Flora / fauna',         glyph: '❀' },
  { id: 'food',        label: 'Food & drink',          glyph: '◐' },
  { id: 'texture',     label: 'Texture / material',    glyph: '▦' },
  { id: 'palette',     label: 'Colour palette',        glyph: '◉' },
  { id: 'mood',        label: 'Mood / atmosphere',     glyph: '☁' },
  { id: 'cartography', label: 'Map / cartography',     glyph: '✥' },
];

// Realm tree — top-level realm + its sub-regions.
// "" sub means "general / not pinned to a sub-region".
const REALMS = [
  {
    id: 'aoli',
    label: 'Aoli',
    subs: [
      { id: '',          label: '— general / empire-wide' },
      { id: 'zichen',    label: 'Imperial court · Zǐchén' },
      { id: 'yan',       label: 'Yan sect' },
      { id: 'yun',       label: 'Yun sect' },
      { id: 'wen',       label: 'Wen sect' },
      { id: 'fen',       label: 'Fen sect' },
      { id: 'hun',       label: 'Hun sect' },
      { id: 'shi',       label: 'Shi sect' },
    ],
  },
  {
    id: 'isenholt',
    label: 'Isenholt',
    subs: [
      { id: '',          label: '— general' },
      { id: 'greymane',  label: 'Greymane' },
      { id: 'stormhold', label: 'Stormhold' },
      { id: 'ashveil',   label: 'Ashveil' },
      { id: 'ironhearth',label: 'Ironhearth' },
      { id: 'frostspire',label: 'Frostspire' },
      { id: 'coldhollow',label: 'Coldhollow' },
    ],
  },
  {
    id: 'tyramare',
    label: 'Tyramare',
    subs: [
      { id: '',           label: '— general' },
      { id: 'spiceharbour',label: 'Spice Harbour' },
      { id: 'other',      label: 'Other district' },
    ],
  },
  {
    id: 'aurum',
    label: 'Aurum',
    subs: [
      { id: '',          label: '— general' },
      { id: 'tianxin',   label: 'Tiānxīn (Heart)' },
      { id: 'wuying',    label: 'Wǔyíng (Shadow)' },
      { id: 'yunshi',    label: 'Yúnshì (Cloud-Market)' },
      { id: 'wenyuan',   label: 'Wényuán (Scholar\'s Garden)' },
      { id: 'tianzhui',  label: 'Tiānzhuī / Anvil' },
      { id: 'lutian',    label: 'Lǜtián (Greenfield)' },
      { id: 'underrock', label: 'Underrock' },
    ],
  },
  { id: 'solis',    label: 'Solis',    subs: [{ id: '', label: '—' }] },
  { id: 'maramir',  label: 'Maramir',  subs: [{ id: '', label: '—' }] },
  { id: 'braedun',  label: 'Braedun',  subs: [{ id: '', label: '—' }] },
  { id: 'ardmere',  label: 'Ardmere',  subs: [{ id: '', label: '—' }] },
  { id: 'crossrealm',label: 'Cross-realm / unspecified', subs: [{ id: '', label: '—' }] },
];

const ERAS = [
  { id: 'pre-sundering',    label: 'Pre-Sundering' },
  { id: 'mythic',           label: 'Mythic age' },
  { id: 'founding',         label: 'Era of Founding' },
  { id: 'present',          label: 'Present day' },
  { id: 'recent-past',      label: 'Recent past' },
  { id: 'distant-future',   label: 'Distant future' },
  { id: 'timeless',         label: 'Timeless / undefined' },
];

const SEASONS = [
  { id: 'spring', label: 'Spring' },
  { id: 'summer', label: 'Summer' },
  { id: 'autumn', label: 'Autumn' },
  { id: 'winter', label: 'Winter' },
  { id: 'all',    label: 'All seasons' },
];

const STATUSES = [
  { id: 'reference',   label: 'Reference',     glyph: '◔', tone: '#8a7a6e' },
  { id: 'inspiration', label: 'Inspiration',   glyph: '◐', tone: '#a07b85' },
  { id: 'final-pick',  label: 'Final pick',    glyph: '●', tone: '#6f8f5c' },
  { id: 'maybe',       label: 'Maybe',         glyph: '○', tone: '#9a9a8a' },
  { id: 'rejected',    label: 'Rejected',      glyph: '⊘', tone: '#a86a5a' },
];

// Helpers
function findRealm(realmId) { return REALMS.find((r) => r.id === realmId); }
function realmLabel(realmId, subId) {
  const r = findRealm(realmId);
  if (!r) return '';
  const s = r.subs.find((s) => s.id === (subId || ''));
  if (!s || !subId) return r.label;
  return `${r.label} · ${s.label.replace(/^—\s*/, '')}`;
}
function categoryLabel(id) { return CATEGORIES.find((c) => c.id === id)?.label || ''; }
function categoryGlyph(id) { return CATEGORIES.find((c) => c.id === id)?.glyph || ''; }
function statusMeta(id) { return STATUSES.find((s) => s.id === id) || null; }

window.MoodCatalog = {
  CATEGORIES, REALMS, ERAS, SEASONS, STATUSES,
  findRealm, realmLabel, categoryLabel, categoryGlyph, statusMeta,
};
