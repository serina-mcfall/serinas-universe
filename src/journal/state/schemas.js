// Field types: 'text' | 'number' | 'tags' | 'link' | 'linkList' | 'coords'
// Linked fields' `target` must be a key in CATEGORIES (or 'any').

export const CATEGORIES = {
  characters: {
    key: 'characters',
    label: 'Characters',
    fields: [
      { key: 'home',   type: 'link', target: 'places', label: 'Home' },
      { key: 'house',  type: 'link', target: 'houses', label: 'House' },
      { key: 'age',    type: 'text', label: 'Age' },
      { key: 'status', type: 'text', label: 'Status' },
      { key: 'tags',   type: 'tags', label: 'Tags' },
    ],
  },
  places: {
    key: 'places',
    label: 'Places',
    fields: [
      { key: 'region',     type: 'text', label: 'Region' },
      { key: 'population', type: 'text', label: 'Population' },
      { key: 'climate',    type: 'text', label: 'Climate' },
      { key: 'belongsTo',  type: 'link', target: 'houses', label: 'Belongs to' },
      { key: 'tags',       type: 'tags', label: 'Tags' },
    ],
  },
  items: {
    key: 'items',
    label: 'Items',
    fields: [
      { key: 'owner',    type: 'link', target: 'characters', label: 'Owner' },
      { key: 'origin',   type: 'link', target: 'places',     label: 'Origin' },
      { key: 'material', type: 'text', label: 'Material' },
      { key: 'powers',   type: 'text', label: 'Powers' },
      { key: 'tags',     type: 'tags', label: 'Tags' },
    ],
  },
  lore: {
    key: 'lore',
    label: 'Lore',
    fields: [
      { key: 'era',       type: 'text',     label: 'Era' },
      { key: 'relatedTo', type: 'linkList', target: 'any', label: 'Related to' },
      { key: 'tags',      type: 'tags',     label: 'Tags' },
    ],
  },
  events: {
    key: 'events',
    label: 'Events',
    fields: [
      { key: 'when',  type: 'text',     label: 'When' },
      { key: 'where', type: 'link',     target: 'places', label: 'Where' },
      { key: 'who',   type: 'linkList', target: 'characters', label: 'Who' },
      { key: 'tags',  type: 'tags',     label: 'Tags' },
    ],
  },
  magic: {
    key: 'magic',
    label: 'Magic',
    fields: [
      { key: 'source',        type: 'text',     label: 'Source' },
      { key: 'practitioners', type: 'linkList', target: 'characters', label: 'Practitioners' },
      { key: 'cost',          type: 'text',     label: 'Cost' },
      { key: 'tags',          type: 'tags',     label: 'Tags' },
    ],
  },
  cultures: {
    key: 'cultures',
    label: 'Cultures',
    fields: [
      { key: 'region',   type: 'link', target: 'places',    label: 'Region' },
      { key: 'language', type: 'link', target: 'languages', label: 'Language' },
      { key: 'religion', type: 'link', target: 'religions', label: 'Religion' },
      { key: 'tags',     type: 'tags', label: 'Tags' },
    ],
  },
  houses: {
    key: 'houses',
    label: 'Houses & factions',
    fields: [
      { key: 'seat',       type: 'link',     target: 'places', label: 'Seat' },
      { key: 'allegiance', type: 'linkList', target: 'houses', label: 'Allegiance' },
      { key: 'tags',       type: 'tags',     label: 'Tags' },
    ],
  },
  languages: {
    key: 'languages',
    label: 'Languages',
    fields: [
      { key: 'spokenIn', type: 'linkList', target: 'places', label: 'Spoken in' },
      { key: 'script',   type: 'text',     label: 'Script' },
      { key: 'tags',     type: 'tags',     label: 'Tags' },
    ],
  },
  religions: {
    key: 'religions',
    label: 'Religions',
    fields: [
      { key: 'followedBy', type: 'linkList', target: 'cultures', label: 'Followed by' },
      { key: 'deities',    type: 'text',     label: 'Deities' },
      { key: 'tags',       type: 'tags',     label: 'Tags' },
    ],
  },
  moodboard: {
    key: 'moodboard',
    label: 'Mood board',
    fields: [], // Special — handled by a different component in Phase 3
    special: 'moodboard',
  },
}

export const CATEGORY_KEYS = Object.keys(CATEGORIES)
