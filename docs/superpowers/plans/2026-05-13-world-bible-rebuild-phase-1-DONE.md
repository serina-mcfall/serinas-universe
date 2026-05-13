# Phase 1 complete — 2026-05-13

Walking skeleton verified end-to-end by Serina in the browser. See [the plan](./2026-05-13-world-bible-rebuild-phase-1.md).

**What works in v1:**
- `?journal=new` mounts the new journal; default URL still mounts the old World Bible
- 11 categories in the sidebar (Characters, Places, Items, Lore, Events, Magic, Cultures, Houses, Languages, Religions, Mood board)
- Create / rename / edit items in every text category
- Fields: text, number, tags, link (plain `<select>`), linkList (checkboxes)
- Markdown notes with rendered preview underneath
- Quiet "Saved" indicator after every change
- Data persists in `localStorage` under `world-bible-v2`
- 29/29 vitest tests passing, build clean
- `prefers-reduced-motion` and `:focus-visible` baseline in place
- OpenDyslexic loaded as primary body font (Serina's request mid-build)

**Next: Phase 2** — wiki `[[links]]` in markdown, real typeahead picker for link fields, Mentioned-by backlinks panel, markdown toolbar, focus mode, global search.
