# World Bible Rebuild — Design Spec

**Date:** 2026-05-13
**Status:** Draft, awaiting Serina's review
**Authors:** Serina (with Claude)

## 1. Why this rebuild

The current World Bible (`src/WorldBible.jsx` and friends) was built as a worldbuilding *site* — with floating decorative orbs, pulse-glow on filled cards, page-load animation cascades, low-contrast italic-serif secondary text, and a sidebar that gamifies completion with three status colours. An accessibility audit on 2026-05-13 flagged most of these as hostile to an AuDHD/dyslexic workspace.

But the real problem isn't the decoration — it's the framing. Serina's words for what the World Bible actually is:

> "It is a workspace for my to build my world... it is meant to help with writing a place to plan out ideas and the like... my personal wrioting journal i keep all the relevant information about my world how it tics and stuf in it."

It is a **personal writing journal** — a quiet, predictable tool she sits inside for long stretches to think, plan, and remember. Decoration, gamification, and "look at me" UI are wrong for that job. So instead of patching the existing version, we rebuild it as a proper journal/workspace.

## 2. Goals

- **Calm.** The UI gets out of the way. The writing is the loudest thing on the page.
- **Predictable.** Same place, same shape, every time. No surprise animations, no flicker, no scroll-jacking.
- **Associative.** A brain that thinks in connections (👋 AuDHD) can click from one entity to another and see what links to what.
- **Resilient.** Years of writing must not be trapped in one browser. Export/import as a save file.
- **Buildable by Serina.** She is a Dev Academy student in her first week of React. The architecture must be approachable: plain JSX, small focused components, no exotic dependencies.
- **Co-exists with the old.** Old World Bible stays running until migration is verified.

## 3. Non-goals for v1

- Cloud sync (manual export/import covers backup)
- Custom-field editor UI (fields are fixed in v1, changed via code)
- Full SVG zoomable atlas (simple pin map instead)
- Multiple variants per category (one Character template, one Place template, etc.)
- Story timeline / scene view
- AI integration

These may come in v2+. They are not blockers for v1.

## 4. Information architecture

A two-pane layout.

**Left sidebar** (~240px, fixed):
- Search box at the top — matches item title and body across the entire bible.
- A vertical list of the 11 categories (see §5). Soft type, no badges, no status colours.
- A small footer line: `Last edited: 2 hours ago in Characters → Princess Mei`. Clicking it jumps to that item.

**Right pane** (everything else):
- **Category view** (when a category is selected): list of items in that category + a `+ Add new` button. List shows item name and a tiny preview of its first notes line.
- **Item view** (when an item is selected): the page itself — see §6.
- **Map view** (Places only, toggle): see §8.
- **Mood board view** (Mood board category): see §8.

URL reflects state: `/c/characters`, `/c/characters/princess-mei`, `/c/places?view=map`, etc. Browser back/forward works.

## 5. Categories at launch

Eleven categories, each with default fields. Field types are one of `text`, `number`, `link` (typeahead picker pointing at another item), `linkList` (multiple links), or `tags` (free-form chip list).

| Category | Default fields |
| --- | --- |
| Characters | Home (link → Places), House (link → Houses), Age (text), Status (text), Tags |
| Places | Region (text), Population (text), Climate (text), Belongs to (link → Houses), Tags |
| Items | Owner (link → Characters), Origin (link → Places), Material (text), Powers (text), Tags |
| Lore | Era (text), Related to (linkList → any), Tags |
| Events | When (text), Where (link → Places), Who (linkList → Characters), Tags |
| Magic | Source (text), Practitioners (linkList → Characters or Cultures), Cost (text), Tags |
| Cultures | Region (link → Places), Language (link → Languages), Religion (link → Religions), Tags |
| Houses/factions | Seat (link → Places), Allegiance (linkList → Houses), Tags |
| Languages | Spoken in (linkList → Places or Cultures), Script (text), Tags |
| Religions | Followed by (linkList → Cultures), Deities (text), Tags |
| Mood board | (special — see §8) |

All non-Mood categories also have a freeform **markdown notes** field below the structured fields.

Fields are fixed in v1. Changing them = editing the category schema in code. A future v2 may add a customisation UI.

## 6. A single item page

```
┌─ Princess Mei ─────────────────────────────────────┐
│ Characters › Princess Mei                          │
│                                                    │
│ Quick fields                                       │
│   Home:    [Aoli Yan]   ← clickable linked field   │
│   House:   [Crane]                                 │
│   Age:     24                                      │
│   Status:  Alive                                   │
│   Tags:    royalty · fugitive · dyer               │
│                                                    │
│ Notes (markdown)                                   │
│   She has long dark hair and *pale jade* eyes.     │
│   After fleeing [[Lord Hua]], she...               │
│   [ large markdown textarea, grows with content ]  │
│                                                    │
│ Mentioned by                                       │
│   • Lord Hua           (Notes)                     │
│   • Aoli Yan           (Notable people field)      │
│   • Ch.1 scene draft   ([[link]] in prose)         │
└────────────────────────────────────────────────────┘
```

Visual rules:
- Empty fields show soft placeholder text, never asterisks or "required" cues.
- The notes textarea has a `min-height` and auto-grows up to ~70% of viewport then scrolls.
- Page title (item name) is editable inline — click it, type, blur to save. Renaming propagates through links (see §7).
- Above the title: small breadcrumb (`Characters › Princess Mei`). Below the page on mobile: same content stacked.

## 7. Connections

Two complementary link systems, both feeding one backlinks panel.

### 7.1 Linked fields

A `link` or `linkList` field stores **item IDs**, not item names. The UI is a typeahead picker:
1. User types "Aoli".
2. Dropdown lists items in the target category whose name matches.
3. User picks one (or chooses "+ Create new place 'Aoli Yan'").
4. Stored as `{ "type": "link", "value": "place-aoli-yan" }`.

Rendered as a clickable chip. Click → navigate to that item.

### 7.2 Wiki `[[links]]` in markdown

Anywhere inside a markdown notes field, `[[Item Name]]` becomes a clickable link to that item.
- Resolution: case-insensitive match against item names. If multiple items share the same name (across or within categories), the link resolves to the most recently created match, and the page shows a small "disambiguate" affordance so Serina can rebind it.
- If no item matches, render as a "ghost link" (dotted underline) — clicking offers to create that item.
- Aliases via `[[Item Name|displayed text]]` (later, optional).

### 7.3 Mentioned by panel

On every item's page, a "Mentioned by" panel lists every item that links to it. Fed by BOTH systems:
- Every linked-field whose value matches this item's ID.
- Every wiki `[[link]]` whose resolved target is this item's ID.

Each entry shows: source item name + small label of where the link appears (field name or "Notes").

### 7.4 Rename propagation

- Renaming an item updates its `name`. Item IDs do NOT change.
- Linked fields keep working unchanged (they point at the ID).
- Wiki `[[links]]` reference names, so they need updating. Two options:
  - (v1) On rename, scan all notes fields and replace `[[Old Name]]` → `[[New Name]]`.
  - (v2) Store wiki links internally by ID after resolution; display the current name.

V1 uses the scan-and-replace approach for simplicity.

## 8. Special category behaviours

### 8.1 Places: List + Map toggle

The Places category view has a `[ List ] [ Map ]` toggle.

- **List view** = standard category view.
- **Map view**: a single background image of the world (Serina supplies). Each Place item with a `coords` set renders as a pin labelled with its name. Click a pin → open the Place's page. Drag a pin → update that Place's `coords`. Places without `coords` appear in a "Not placed yet" sidebar.

Map state:
- One background image stored in app settings (replaceable).
- Each Place has optional `coords: { x: 0-1, y: 0-1 }` (proportional, so the map scales).
- No zoom or pan in v1 (image fills the viewport, contained by `max-width`).

### 8.2 Mood board: image grid

Mood board has no structured fields. Each entry is:
- An image (drag and drop a file → stored as a data URL in the bible).
- An optional caption.
- Optional tags.

Grid layout, masonry-style, ~3 columns at desktop, 1 at mobile. Click an image → lightbox view. Mentioned-by panel works on mood board items via wiki `[[links]]`.

⚠️ Storage caveat: data URLs in localStorage will fill the ~5MB quota fast. v1 ships a soft cap (warn at 50 images) and we plan for IndexedDB or filesystem in v2.

## 9. Editor

- Markdown stored as raw text.
- Rendered with a small markdown library (probably `marked` or `markdown-it`, picked in the implementation plan).
- A floating toolbar with: **B**, *I*, H1, H2, list, link, `[[wiki link]]`. Toolbar wraps the selection in the corresponding markdown.
- **Focus mode**: a button (or keyboard shortcut) that hides the sidebar and breadcrumb, leaving only the page. Esc returns. Implemented as a CSS class on `<body>`, not a route change.
- **Auto-save**: every 1s after typing stops. Quiet "Saved" text under the title that appears briefly then fades. Never flashes.

## 10. Aesthetic

| | Treatment |
| --- | --- |
| Keep | Warm beige palette (`#f5efe6` / `#ebe3d7` / `#f0e8dc`). Quicksand for body. |
| Change | Cormorant Garamond reserved for **page titles only**. Body and field labels use Quicksand throughout. |
| Remove | Floating orbs, pulse-glow, fade-in cascades, save flash, sidebar status colours. |
| Add | `:focus-visible` outlines on every interactive element. Minimum 0.8rem for labels. The new journal's CSS ships its own `@media (prefers-reduced-motion: reduce)` block (modelled on the one added to the old `WorldBible.css` on 2026-05-13). |

## 11. Tech stack

- **Build:** Vite 6, React 19, plain JSX (no TypeScript).
- **Routing:** start simple — read `window.location.pathname`, render based on the segment. Add `react-router` later if state gets complex.
- **State:** React state lifted to a top-level provider. No Redux. No Zustand v1 (can revisit).
- **Markdown:** `marked` or `markdown-it` (pick during implementation).
- **No new heavy dependencies** unless we justify them in the implementation plan.

## 12. Data model

Two parts: **schemas** (constants in code, define what fields each category has) and **data** (JSON in localStorage, holds only values).

### 12.1 Category schemas (code constants)

Defined once in `src/journal/state/schemas.js`. Each category lists its fields with type and label.

```js
// schemas.js
export const CATEGORIES = {
  characters: {
    label: 'Characters',
    fields: [
      { key: 'home',   type: 'link',     target: 'places', label: 'Home' },
      { key: 'house',  type: 'link',     target: 'houses', label: 'House' },
      { key: 'age',    type: 'text',     label: 'Age' },
      { key: 'status', type: 'text',     label: 'Status' },
      { key: 'tags',   type: 'tags',     label: 'Tags' },
    ],
  },
  places: {
    label: 'Places',
    fields: [
      { key: 'region',     type: 'text', label: 'Region' },
      { key: 'population', type: 'text', label: 'Population' },
      { key: 'climate',    type: 'text', label: 'Climate' },
      { key: 'belongsTo',  type: 'link', target: 'houses', label: 'Belongs to' },
      { key: 'tags',       type: 'tags', label: 'Tags' },
      { key: 'coords',     type: 'coords', label: 'Map position', hidden: true },
    ],
  },
  // ...etc for the other 9 categories
}
```

Field `type` is one of: `text`, `number`, `link`, `linkList`, `tags`, `coords` (Places only).

### 12.2 Stored data (JSON in localStorage)

A single top-level object holding only values — never duplicating the schema.

```json
{
  "version": 1,
  "settings": {
    "mapBackgroundUrl": "data:image/...",
    "lastEdited": { "itemId": "char-mei", "at": "2026-05-13T08:15:00Z" }
  },
  "items": {
    "char-mei": {
      "id": "char-mei",
      "category": "characters",
      "name": "Princess Mei",
      "fields": {
        "home": "place-aoli-yan",
        "house": "house-crane",
        "age": "24",
        "status": "Alive",
        "tags": ["royalty", "fugitive", "dyer"]
      },
      "notes": "She has long dark hair and *pale jade* eyes...",
      "createdAt": "2026-05-13T08:00:00Z",
      "updatedAt": "2026-05-13T08:15:00Z"
    },
    "place-aoli-yan": {
      "id": "place-aoli-yan",
      "category": "places",
      "name": "Aoli Yan",
      "fields": {
        "region": "Northern reach",
        "coords": { "x": 0.42, "y": 0.31 },
        "tags": []
      },
      "notes": "A city of fog and copper roofs...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  },
  "moodboard": [
    {
      "id": "mood-1",
      "image": "data:image/jpeg;base64,...",
      "caption": "Wisteria over the pavilion",
      "tags": ["aesthetic", "writing-sanctum"]
    }
  ]
}
```

Storage rules:
- A field's value is a plain scalar (`"24"`), an ID string for `link`, an array of IDs for `linkList`, an array of strings for `tags`, an object `{ x, y }` for `coords`. The schema tells the UI how to render it.
- Item IDs are slugs of the name at creation time (`princess-mei`), suffixed if a collision exists. **Stable across renames** — IDs never change.
- Backlinks are NOT stored — they are computed on demand by scanning all items.

## 13. Storage & migration

### 13.1 Storage

- Primary: one localStorage key, `world-bible-v2`, holding the JSON object from §12.
- Backup: an `Export world.json` button that downloads the JSON. An `Import` button that reads a JSON file and replaces (or merges, with confirm) the current data.
- No cloud sync in v1.

### 13.2 Migration from current World Bible

A one-time **Import from old World Bible** action, available from settings:

1. Read `world-bible-entries` and `world-bible-moodboard` from localStorage.
2. For each `${sectionId}-${promptId}` entry with non-empty text:
   - Determine the matching new category from a hand-written map (`cosmology` → `Lore`, `characters-section` → `Characters`, etc.).
   - Create a new Item with the section/prompt as a heading inside its `notes` markdown.
   - Or, if multiple prompts belong to one logical item, group them — exact rules to be decided in the implementation plan once we re-read the old `sections.js`.
3. Mood board entries migrate one-for-one into the new mood board array.
4. The old keys are NOT deleted. Old World Bible keeps working until user manually archives it.

The exact mapping table is an implementation-plan task. The spec only commits to the shape and the safety property (no destructive operations).

## 14. Coexistence with the old version

- New code lives under `src/journal/`.
- Old code (`WorldBible.jsx`, `WorldMap.jsx`, `CharacterGallery.jsx`, `Armoury.jsx`, `WeaponCard.jsx`, `WorldBible.css`, `data/`) stays untouched.
- `src/main.jsx` reads a URL flag: `?journal=new` mounts the new journal; default mounts the old World Bible. After Serina is satisfied with the new version and migration is complete, we flip the default and move the old code under `src/_archive/`.

## 15. File structure (proposed)

```
src/
  journal/
    App.jsx              ← entrypoint for new journal
    state/
      store.js           ← single store (load/save/CRUD)
      schemas.js         ← category definitions + default fields
    components/
      Sidebar.jsx
      CategoryView.jsx
      ItemView.jsx
      ItemEditor.jsx
      FieldEditor.jsx       ← renders one field by type
      LinkPicker.jsx        ← typeahead for link fields
      MarkdownEditor.jsx    ← textarea + toolbar + preview
      Backlinks.jsx
      SearchBox.jsx
      FocusModeToggle.jsx
      PlacesMapView.jsx
      MoodBoard.jsx
    utils/
      slug.js
      wikiLinks.js          ← parse + resolve [[links]]
      backlinks.js          ← compute mentioned-by
      migration.js          ← import from old World Bible
    styles/
      journal.css
```

Names will probably evolve during implementation. This is a sketch, not a contract.

## 16. Open questions / decisions deferred to implementation plan

- Exact field set per category may need tweaks once we start using it. The spec commits to the *categories* and the *shape*, not the exact field names.
- Markdown library choice (`marked` vs `markdown-it` vs custom).
- Whether the typeahead picker uses a third-party combobox or we hand-roll one (week-1-React-friendly).
- Mood board image storage strategy when localStorage fills up (deferred to v2 unless Serina hits the cap during v1).
- The migration mapping table (old section ID → new category).
- **Phasing.** This v1 scope is intentionally broad (it's the whole journal). The implementation plan should break it into phases that each end at a usable state — suggested rough cuts: (1) categories + items + fields + markdown notes + save/load, (2) linked fields + wiki `[[links]]` + Mentioned-by, (3) search + Places map view + Mood board, (4) migration + flip default.

## 17. Definition of done for v1

- All 11 categories work: create, rename, edit fields, edit markdown notes, delete.
- Linked fields + wiki `[[links]]` resolve and render.
- Mentioned-by panel works on every page.
- Search returns results across titles and notes.
- Places list/map toggle works; pins are draggable.
- Mood board image grid works.
- Export and Import buttons work.
- Migration from the old World Bible runs end-to-end without destroying old data.
- Old World Bible still launches at the default URL.
- `:focus-visible`, `prefers-reduced-motion`, no flashing save indicator, no orbs.

When all the above are true, v1 ships. Then we flip the default URL and archive the old code.
