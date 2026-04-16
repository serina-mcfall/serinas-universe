---
name: World Bible Vite Project Setup
description: Technical setup of the World Bible as a Vite + React app with hot reload, replacing the old standalone HTML
type: project
originSessionId: bd123ac3-fbc3-4c54-95f1-aaaaed19c370
---
## Setup (completed 2026-04-11)

The World Bible was converted from a standalone HTML file into a proper Vite + React project.

**Why:** Serina wanted to work with Wen in Claude chat, have updates pushed to the project, and see changes live in the browser via localhost. Her husband Gavin helped clarify the requirements.

**How to apply:** When updating world content, edit `src/data/initial-entries.js`. When updating structure/UI, edit `src/WorldBible.jsx`. When updating sections/categories, edit `src/data/sections.js`.

## Project Structure
```
serinas-universe/
├── index.html              -- Vite entry point (thin loader)
├── index-standalone.html   -- Old standalone version (preserved)
├── package.json            -- Vite + React 19
├── vite.config.js          -- port 3000, auto-open
├── .gitignore              -- node_modules, dist
├── world-bible.jsx         -- Old Claude artifact version (kept for reference)
├── src/
│   ├── main.jsx            -- App mount point
│   ├── WorldBible.jsx      -- Main React component
│   ├── WorldBible.css      -- All styling
│   └── data/
│       ├── sections.js     -- 7 sections + mood board categories
│       └── initial-entries.js  -- All worldbuilding lore (~75KB, 22 entries)
```

## Key Commands
- `npm run dev` — starts dev server at localhost:3000 with hot reload
- `npm run build` — production build to dist/
- `npm run preview` — preview production build

## Storage
- Uses localStorage (not window.storage like the Claude artifact version)
- INITIAL_ENTRIES always take priority over saved data for pre-populated lore
- User additions to non-initial-entry keys are preserved
- Mood board images stored in localStorage as base64

## GitHub Connector
Serina connected the GitHub connector in Claude settings, but it provides browser automation tools, not direct file push. Manual workflow: save file → git add → git commit → git push.

## Current State (2026-04-11) — UPDATED AND WORKING
The Vite project now has the correct 11-section structure with 33 pre-filled entries. Serina copied updated files from Windows (`/mnt/c/Users/serin/Downloads/`) to WSL as `updated-world-bible.jsx` and `updated-index.html`. Sections and entries were extracted from these and rebuilt into the data files. Dev server confirmed running at localhost:3000.

## Key Lesson: Claude.ai Artifacts Not in JSONL
Claude.ai Artifacts (interactive code blocks) are NOT saved in conversation JSONL history files. They appear as "This block is not supported on your current device yet." The actual code is stored server-side. Always ask Serina to upload/copy the artifact file directly rather than trying to extract from history.
