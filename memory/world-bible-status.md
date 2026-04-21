---
name: World Bible Status and Project State
description: Current state of the world bible, what's been built, and what's still pending
type: project
originSessionId: bd123ac3-fbc3-4c54-95f1-aaaaed19c370
---
## World Bible Format

- Now a Vite + React app running at localhost:3000 with hot reload
- Main component: `src/WorldBible.jsx`, data: `src/data/sections.js` + `src/data/initial-entries.js`
- Also still works as Claude.ai artifact (`updated-world-bible.jsx` kept for reference)
- GitHub Pages site: https://serina-mcfall.github.io/serinas-universe/
- Repo: `/home/serina/GitHub/Personal/serinas-universe`
- 11 sections: Cosmology, Aoli, Isenholt, Tyramare, Braedun, Ardmere, Maramir, Solisopia, Aurumshi, Fellowship, Connections
- 1,052+ lines of lore as of last session
- 87+ images in the mood board organized by category

## What Has Been Built (Deep)

### Fully Fleshed Out:
- Cosmology (complete): Primordials, five gods, guardians, twins, prophecy, fragments, fate vs chaos
- Aoli: Six sects named (short names: Yan, Yun, Wen, Fen, Hun, Shi), sect locations on map, visual references, the Shimo secret and inner circle
- Isenholt: Six clans, beast bonding, the Choosing, god-touched women, Living Cave, marriage fires, God's Tears, Volugan, veils, clan structure, warbands, warband leaders, warrior hierarchy, Greyhearth council
- Tyramare: Seven guild districts named, council seat mechanics, Solenthera faith, Entheras, Oranthi, Umbrathi cult, Verenthae resistance, Liyin's spy network
- The Fellowship: All six members with full backstory, appearance, personality, weapons, relationships
- **Aria Bible entry**: COMPLETE — full deep-dive in initial-entries.js (~25k chars, 14 sections)
- **Yuè'àn Bible entry**: PARTIAL — Q1-Q2 woven in, Q3-Q8 still pending
- **Lìyǐn Bible entry**: COMPLETE — written 2026-04-16 (~13.4k chars, 11 sections, includes Vesper Lumen)
- **Xuěhuā Bible entry**: COMPLETE — written 2026-04-16 (~12.2k chars, 11 sections, includes ninth-tail saga bind)
- **Gēnmù Bible entry**: COMPLETE — written 2026-04-16 (~11.3k chars, 11 sections, includes koi fish + Yuè'àn arc)
- **Temgar Bible entry**: COMPLETE — written 2026-04-16 (~12.2k chars, 11 sections, includes Davaa + tavern incident)
- **Fellowship inspiration folders**: Created 2026-04-16 at `public/images/characters/fellowship/inspiration/` — six folders (aria, yuean, xuehua, liyin, genmu, temgar). Aria + Yuè'àn portraits done; other four need portraits designed.
- Shi Sect Inner Circle: Five fragment-carriers with descriptions, disciplines, stations

### Partially Built (Needs More):
- Braedun: ALL 6 entries now live in the world bible as of 2026-04-21 — overview, earthtwin, magic, politics, culture, dailylife. Total ~42k chars across Braedun. Royal trinity (Cadfael, Breyle, Rhonwen), Morag backstory, Nyra Lake + Silver Road, six named tree-settlements, mythic tree-scale (10× redwood), three-tier vertical template, druidic plumbing, and the Breaking ritual for corrupted trees all present. Braedun is the first fully-fleshed Caerndrath province.
- Ardmere: English/French farmlands, slavery, powder keg. Concept established but not deep-dived
- Maramir: Nomadic, illusion, Shadow Prince. Concept established but not deep-dived
- Solisopia: Roman/Byzantine excess, pleasure houses, the Water Twin. Concept established but not deep-dived
- Aurumshi: Victorian steampunk + Asian, blood magic secret, fog. Concept established but not deep-dived

### Still Pending:
- Sect leaders (other than Shi inner circle) -- personalities and names
- Individual character biographies (Serina paused to flesh out homelands first)
- Detailed maps (using map-making tools beyond ChatGPT reference images)
- Naming the capital city of Tyramare (province =/= city name)
- Caerndrath province deep dives (Braedun, Ardmere, Maramir culture like Isenholt got)
- Naming the evil (the name buried in the cave with the Wind Serpent)
- Mujin's and Yueli's formal names/titles
- The Bannric dynasty history in detail
- Daily life, food, music, architecture for most cultures (Isenholt is furthest along)

## Session History

1. **Session 1 (Conv 25 "Greeting"):** World Bible created. Four cultures conceived. Creation myth. Two sleeping gods named (Yanlong, Yunsheng). Prophecy written. Caerndrath named. Bannric dynasty. Five provinces of Caerndrath started.

2. **Session 2 (Conv 27 "Resuming the adventure"):** Massive session. Aoli named. Six sects named. All five gods named (Wenji, Fengzhe, Minhui). Primordials named (Mujin, Yueli). Guardians described. Immortal twins revealed. All provinces named. Fellowship created -- all six members with full profiles. Weapons designed. Isenholt deep dive started (clans, bonding, god-touched).

3. **Session 3 (Conv 30 "Nine-tailed fox by the stream"):** Marriage fires ceremony. Isenholt culture deep dive (warbands, leaders, titled hierarchy, Greyhearth). Tyramare deep dive (seven districts, guild council, faith system, cults). Aoli geography and sect placement. Map building. Shi sect inner circle (five fragment-carriers). Short sect names adopted.

4. **Session 4 (Conv 31 "Reading summary for context"):** Shi sect inner circle finalized with images. Five disciplines of the sect. Corruption magic defined. Multi-medium story structure. Technical discussion about GitHub workflow and world bible deployment (with Gavin).

5. **Session 5 (2026-04-11, Claude Code):** Converted World Bible from standalone HTML to Vite + React app. Set up dev server at localhost:3000 with hot reload. Extracted 11-section structure and 33 entries from Claude.ai artifact files (copied from Windows Downloads). Gavin helped clarify that Serina wanted a real web app, not just a chat artifact. Pushed to GitHub (commit dd56051).

6. **Session 6 (2026-04-21, Claude Code):** Braedun port-to-bible session. Serina asked to "push to GitHub so all work is saved there first" then chose "port first" when I explained yesterday's creative work lived only in the research dossier. Sequential: `braedun-politics` drafted and written (10.6k chars — royal trinity, sacred marriage, elections, term/rules), `braedun-culture` drafted and written (6.2k chars — Celtic classes, handfast/sanctified, fair folk, fire festivals), `braedun-overview` updated with Nyra Lake + Silver Road + hidden watershed (+2k chars). Dev server fired up to preview. Then creative session: named six tree-dwelling settlements (**Lúnewood, Mistwood, Wardwood, Havenwood, Reedwood, Elderwood**) + scattered farmsteads. Serina generated AI fantasy maps of Aoli + Braedun (parchment scroll style). **Pushed to origin/main as commit `3e814ec`** (port + maps). Then atlas modal feature: extended `WorldMap.jsx` so REGIONS with a `detailedMap` field show a "View detailed map" button in the Atlas side panel that opens a fullscreen modal of the painted map (Aoli + Braedun wired). **Pushed as commit `c7e9bfa`.** Then `braedun-dailylife` drafted and written (13k chars — mythic 10× redwood tree-scale, three-tier ground/middle/canopy template, copse-by-copse settlement sizes, daily rhythm, Celtic food/cloth/craft, druidic plumbing drawing from the Lúnavé's hidden watershed, hospitality for outsiders, the Breaking ritual for corrupted trees, childhood in the canopy). **Pushed as commit `94ca6c1`.** Then Serina dropped 18 aesthetic reference images into the braedun image folder briefly; I studied them and flagged four questions. Serina answered "yes make canon don't change how Cadfael looks he had to change his look a little when he became a king." Resulting canon updates to `braedun-culture` (+1.7k chars) and `braedun-politics` (+1.3k chars): **North/South druid sub-styles** (dark-forest druids wear dark/charcoal + face-scarves; light-forest druids wear teal/moss-green + bow and quiver), **druidic hair** (many thin braids woven through long hair, silver crescents/stars for ceremony), **cream-and-gold ceremonial robes** (moon white + land gold + triskele), **Breyle's three wardrobes** (everyday druidic / ceremonial / royal), **Breyle's signature crescent-moon braid** (star-reader's mark), **Cadfael's trimmed beard** clarified as the King's Trim (he cut his warrior's plaited beard when he took the crown). **Pushed as commit `fbda3ff`.** All 6 Braedun entries complete (~44k chars total with visual canon). Braedun is the first fully-fleshed Caerndrath province.
