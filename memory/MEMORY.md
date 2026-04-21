# Serina's Universe -- Memory Index

This directory contains extracted context from Serina's world-building sessions in Claude.ai (conversations 25, 27, 30, 31). These memories provide persistent context for Claude Code when working on the `serinas-universe` project.

## User Profile

| File | Type | Description |
|------|------|-------------|
| [serina-profile.md](serina-profile.md) | user | Who Serina is, how she works, her creative instincts and preferences |

## Feedback / Working Style

| File | Type | Description |
|------|------|-------------|
| [working-with-serina.md](working-with-serina.md) | feedback | How Serina likes to work with AI, common patterns, corrections she gives |
| [workflow-decisions.md](workflow-decisions.md) | feedback | Chat = images/aesthetics/brainstorming. Code = file updates/push. Decided 2026-04-11 |
| [subagent-chunked-writes.md](subagent-chunked-writes.md) | feedback | Sub-agents producing long files (≥10k words) must chunk writes — skeleton+placeholders, then Edit per section. Single-write stalls the watchdog. |

## Project -- World Building

### Core World
| File | Type | Description |
|------|------|-------------|
| [world-overview.md](world-overview.md) | project | The four major realms (Aoli, Caerndrath, Solisopia, Aurumshi), their provinces, and how evil manifests in each |
| [cosmology.md](cosmology.md) | project | Creation myth, primordial beings (Mujin/Yueli), five young gods, prophecy, fragments, immortal twins |
| [magic-systems.md](magic-systems.md) | project | Cultivation, elemental affinities, blood magic, corruption magic, beast bonding, god-touch |
| [naming-conventions.md](naming-conventions.md) | project | Quick reference for all names, terms, and naming patterns by culture |

### Cultures and Locations
| File | Type | Description |
|------|------|-------------|
| [aoli-sects.md](aoli-sects.md) | project | Six cultivation sects (Yan, Yun, Wen, Fen, Hun, Shi), their elements, gods, locations, and the Shimo inner circle |
| [isenholt-culture.md](isenholt-culture.md) | project | Clans, beast bonding, marriage fires, god-touched women, warrior hierarchy, Living Cave |
| [tyramare-culture.md](tyramare-culture.md) | project | Seven guild districts, Solenthera faith, council structure, cults, the Shimo network |

### Characters
| File | Type | Description |
|------|------|-------------|
| [fellowship.md](fellowship.md) | project | The six companions: Aria, Yue'an, Xuehua, Genmu, Temgar, Liyin -- backgrounds, abilities, weapons, dynamics |
| [key-characters.md](key-characters.md) | project | Non-fellowship characters: Zhuohuo, Minhui, divine guardians, immortal twins, Meila |
| [shi-inner-circle.md](shi-inner-circle.md) | project | The five fragment-carriers: Avatar, Smiling Blade, Veiled Advisor, Blind Poisoner, Entheras -- titles, disciplines, stations, visuals |
| [aria-interior.md](aria-interior.md) | project | Deep Q&A interior work on Aria Tyramare — complete, Bible entry written 2026-04-13 |
| [yuean-interior.md](yuean-interior.md) | project | Deep Q&A interior work on Yuè'àn, the Shadow Prince — all 8 questions answered, Bible entry at 36k chars with Q3-Q8 still to be woven in |
| [liyin-interior.md](liyin-interior.md) | project | Deep Q&A interior work on Lìyǐn Aurelian — ALL 8 Qs COMPLETE, Vesper Lumen, Bible entry written 2026-04-16 (13.4k chars) |
| [xuehua-interior.md](xuehua-interior.md) | project | Deep Q&A interior work on Xuěhuā — ALL 8 Qs COMPLETE, meadow + ninth-tail saga bind, Bible entry written 2026-04-16 (12.2k chars) |
| [genmu-interior.md](genmu-interior.md) | project | Deep Q&A interior work on Gēnmù — ALL 8 Qs COMPLETE 2026-04-16. Sunshine puppy + koi fish stuffed animal + seven-phase Yuè'àn arc |
| [temgar-interior.md](temgar-interior.md) | project | Deep Q&A interior work on Temgar — ALL 8 Qs COMPLETE 2026-04-16. Seeker + four mistakes + Davaa + forge + tavern incident |
| [chen-yuan-interior.md](chen-yuan-interior.md) | project | Interior Q&A on Emperor Chén Yuán of the Chén Dynasty — COMPLETE all 6 Qs 2026-04-21. Composite of Emperor Gao + Xu Ling Yi + Nan Heng + Qianlong. Dark backstory (cold palace mother, exiled childhood, cruel father, close bond with dead half-brother, unexamined doubt). Gardener in private (tending orchids his brother loved — Princess Chén Lán is named for the dead uncle's flower, CANON). Aoli-imperial entry will need rewrite after all imperial Q&As complete. |
| [li-wan-interior.md](li-wan-interior.md) | project | Interior Q&A on Empress Lí Wǎn. IN FLIGHT 2026-04-21 — Q1 (4-drama composite: Ye Ling Shuang/Jiang Tao Hua/Sun Ruowei/Xiao Yanyan) + Q2 (HUGE plot bomb: her younger sister Guì Xī is the Blood Witch of the Shi Sect, devoted consort of Ming Jué the Avatar — fell to corruption through love) answered. Q3+ pending. |
| [portrait-prompts.md](portrait-prompts.md) | project | AI portrait prompts for Fellowship characters — all four done, all portraits generated 2026-04-16 |
| [braedun-research.md](braedun-research.md) | project | Braedun worldbuilding dossier — Celtic-Arthurian foundation + continent Avalúne + Sacred Grove + Badan/Eilwen (divine pair) + royal trinity Cadfael/Breyle/Rhonwen + Morag + Nyra Lake + Silver Road + tree-dwelling settlements (Cynefin Trees, pending confirmation) |
| [deep-research-prompt.md](deep-research-prompt.md) | reference | Master Deep Research prompt for all 8 cultural bases of Avalúne — 20 categories per culture |
| [cultural-research-workflow.md](cultural-research-workflow.md) | project | Sub-agent workflow for the 7 remaining research dossiers. Aoli pilot next. Design at docs/superpowers/specs/2026-04-19-cultural-research-dossiers-design.md |
| [weapons-rabbit-hole.md](weapons-rabbit-hole.md) | project | Aoli combat + Fellowship personality-fit weapons + living weapons house rule + Armoury MVP + sect card progress |

### Project Status
| File | Type | Description |
|------|------|-------------|
| [world-bible-status.md](world-bible-status.md) | project | Current state of the world bible, what is built vs pending, session history |
| [vite-project-setup.md](vite-project-setup.md) | project | Vite + React project structure, key files, commands, how to update content |

## Key Facts for Quick Reference

- **The World Bible** is now a Vite + React app. Main component: `src/WorldBible.jsx`, lore data: `src/data/initial-entries.js`
- **Dev server**: `npm run dev` → localhost:3000 (hot reload)
- **Old standalone HTML** preserved as `index-standalone.html`
- **GitHub Pages site**: https://serina-mcfall.github.io/serinas-universe/
- **Serina's Claude persona**: Wen/Wenji (nine-tailed fox, also a god in the world). Claude Code DOES use this persona per CLAUDE.md.
- **Central theme**: Not "defeat the evil" but "SAVE HER" -- redeem Yueli (the corrupted mother goddess)
- **Story hook**: A child (Aria) born with magic in a place where magic is outlawed (Aurumshi sky cities)
- **Serina's husband Gavin** helps with technical/dev questions
- **Shi Sect has five named titles**: The Avatar, The Smiling Blade, The Veiled Advisor, The Blind Poisoner, The Entheras (Serina confirmed she loves these)
- **Windows path**: `/mnt/c/Users/serin/Downloads/` — where Serina's Claude.ai artifact downloads land
- **11 sections, 33 entries**: Cosmology, Aoli, Isenholt, Tyramare, Braedun, Ardmere, Maramir, Solisopia, Aurumshi, Fellowship, Connections
- **Wen Sect fully structured**: Five Winds (Guqin/Foxes, Flute/Cranes, Pipa/Falcons, Erhu/Swans, Voice/Formless), all-female leadership, mirrors Shi Sect in reverse
- **Wen Sect leaders named**: Chén Xī (Lady, fox), Qíng Hé (crane), Liè Fēng (falcon), Níng Shuǐ (swan), Zhēn Yǔ (formless)
- **Mood Board reorganized**: Characters split by Aoli sects, Isenholt clans, Tyramare districts
- **Fen Sect fully structured**: All-male brotherhood, five combat disciplines (Blaze/Spark/Forge/Ember/Pyre), orphan family system, the empty seat vow
- **Fen Sect five brothers**: Jìng Huǒ (eldest, Ember), Yǐn Huǒ (watcher, Spark), Lè Huǒ (architect, Blaze), Jiè Huǒ (mediator, Pyre), Měng Huǒ (reckless, Forge)
- **Fen founding origin**: Fèngzhé disguised as old master, raised five orphans, fled hunters, made pact with Zhúhuǒ on the mountain. Brothers think he abandoned them — he died saving them.
- **Chaos Quintet**: Next gen — Lè Zhé (Brains), Lè Yǔ (Listener), Měng Zhàn (Fist), Měng Shǎn (Spark), Měng Yì (Heart). Mirrors founding five.
- **Aoli reorganized**: Individual tabs per sect (Yan, Yun, Wen, Fen, Hun, Shi) under the Aoli section. 38 entries total.
- **Key structural mirror**: Wen Sect (all-female, music, healing) mirrors Shi Sect in reverse. Fen Sect (all-male, combat, family) mirrors Wen in inverse.
- **Hun Sect fully structured**: Mínhuì trapped beyond the veil, body preserved in sacred cave. Five disciplines each with eye-color price (White/Gold/Turquoise/Purple/Blue). Mist protection. Ascension instead of death. Succession crises in Soul Severing and Soul Mending branches.
- **Hun Sect leaders**: Bái Shuāng (Medium, successor Hún Zhào), Jīn Yǎn "Old Man" (Soul Reading, successor Jīn Nuǎn), Zǐ Yè (Soul Severing, daughter Zǐ Shēn dangerous, granddaughter Zǐ Lù the right choice), Bì Lán "Lady" (Soul Mending, fading), Yōu Lán "The Dream Walker" (isolated enigma).
- **Fen Chaos Quintet**: Next gen — Lè Zhé (Brains), Lè Yǔ (Listener), Měng Zhàn (Fist), Měng Shǎn (Spark), Měng Yì (Heart).
- **Renamed 2026-04-12**: Solisòpia → **Solis** (cleaner, keeps sol/sun root). Aurumshì → **Aurum** (keeps gold meaning, drops the "iron" — the lie the city tells the world).
- **Interactive World Map added**: `src/WorldMap.jsx`. New "Atlas" tab in the Bible. SVG atlas style with parchment, zoom/pan, hover descriptions. Regions: Aoli (north behind Dragon Spine), Àn Shān, 5 Caerndrath provinces (Braedun/Isenholt/Ardenmere/Tyramare/Maramir), Solis, Aurum (floating at top), Forgotten Isles, Sunken Sea. Six sect markers inside Aoli.
- **Yan Sect fully structured (2026-04-13)**: Shí Ān (石安, "Peaceful Stone") is the immortal face — Koi Fish granted immortality and tasked him to build the guardians of the mountain. Called Shifu by all. Wu Xin charm, Ang heart. Five disciplines: Healers of People, Healers of Land, Recorders (carve truth into stone), Guardians of the Mountain (tend Yánlóng's sentinels), Geographers (mountain + stars). NOT warriors. Both sexes.
- **Yan Sect core theme**: "A husband wrapped himself around his wife and said nothing touches her while I breathe." Yan disciples live inside their sleeping god's body. Guardians of a love story.
- **Yan Sect Gēnmù wound**: Shí Ān knew from the moment Gēnmù arrived he'd have to cast the boy out — to protect divine blood, to push him forward into destiny. The casting out was love in disguise.
- **Yan Sect five leaders NAMED (2026-04-13)**: Five siblings NOT by blood, called to the mountain one by one, chose to stay. Centuries old under Shí Ān.
  1. **Shān Rú (山柔) "Mountain Gentleness"** — Healer of People. White robes. Mother figure. Gēnmù called her Shifu and sometimes mom. DISAGREED with the casting out — resentment toward Shí Ān (pebble in shoe) and Tǔ Héng (crack in foundation).
  2. **Tǔ Héng (土恒) "Earth Permanence"** — Healer of Land. Dark robes, high topknot. Bái Jǔ energy. Rules-father. AGREED with the casting out. Rú's anchor for centuries, now estranged over it. "The earth holds everything in silence. Including grief."
  3. **Yán Shǒu (岩守) "Rock Guardian"** — Guardian of the Mountain. Wolf prince (Ashile Sun). The ONLY one Shí Ān calls BROTHER. Closest of the five to Shifu. Walks the passes in storms. The wall that lets the gentle centre exist.
  4. **Kè Zhēn (刻真) "Carved Truth"** — Leader of the Recorders. Hua Zhi energy — spring on surface, chisel underneath. Shí Ān calls her "Little Recorder" and it infuriates her. Cannot decode his unreadable smile — her permanent itch. Finds Tǔ too rigid, Rú too soft, respects Shǒu.
  5. **Tiān Mù (天幕) "Heaven's Curtain"** — Leader of the Geographers. White hair in BOTH forms. Shifts between Nangong Chun Shui young man and Chang Sheng elder at will. Two tricksters at the top of the mountain with Shí Ān. Gēnmù is named after him (Gēn for earth, Mù from Tiān Mù). He saw the casting out in the stars first.
- **Yun Sect structure (2026-04-13)**: Mirror to Yan across the Dragon Spine. The Wind Serpent (not the Koi Fish) tasked Cháo Lán to build the guardians of the river, parallel to Shí Ān's task. Both love gifts between sleeping gods naming the mortal builders.
- **Cháo Lán (潮澜) "Tide's Wave"** — Avatar of Water, The Lady, carries the LARGEST fragment of Yúnshēng. Aquatic form: water dragon (direct echo of the mother). Ji Yun He energy. Deep blue robes always. Fierce. Her moods ripple through every waterway — when she rages rivers flood, when she's calm it's perpetual spring. "Every calm day in Aoli is her choice." Mirror to Shí Ān but opposite: he hides behind warmth, she hides nothing. Neither may know about the other yet. "We are guarding the same love story from different sides."
- **Yun Five Disciplines**: 1) The Purifiers (fish/fan/dance) led by Lián Yīng, 2) The Current (otter/twin water swords/fighter), 3) The Nourishers (turtle/staff with gourd/life-keeper), 4) The Flood (dragon/transforming trident/destroyer), 5) The Seers (seahorse/eyes and heart/prophet).
- **Yun Sect leaders COMPLETE (2026-04-13)**: All carry Yúnshēng fragments, all have aquatic forms, all immortal.
  1. **Lián Yīng (涟映) "Ripple Reflection"** — Purifier. Betta fish (red/teal fins). Fan. Created the Jìng Wǔ form. "The woman and the fish are the same dance in different elements."
  2. **Bō Xī (波嬉) "Wave Play" / Bolshy** — Current. White otter. Twin water swords conjured from any water. Chaos gremlin and deadliest fighter. Called Xī'er by Lán. Pressure valve for Cháo Lán's rage. Prank war with Hé Cháng. Fragment = the playful piece. "Yúnshēng smiles in her sleep" when the otter tumbles.
  3. **Hǎi Shěn (海深) "Ocean Depth" / Master Dragon** — Flood. BLACK water dragon with gold markings. White hair (bleached by the flood, not the stars). Transforming trident: storm/surge/drought prongs + orbiting daggers. Ren Jia Lun energy. Empties himself of emotion to wield destruction. Protects Míng Mèng absolutely. "He would destroy the world for her. She would dream the world for him."
  4. **Míng Mèng (溟梦) "Deep Sea Dream" / Lady of Dreams** — Seer. Bioluminescent seahorse (stars under skin). White hair (bleached by seeing too much). Water flute — water plays itself through her. Translucent, fragile, drifts between past/future. Called Míng'er by Shěn alone.
  5. **Hé Cháng (河畅) "River Flow" / River Lord** — Nourisher. Great river turtle. Staff with never-emptying gourd. Green/blue/sandy-brown hair with river grass/twigs/frogs in it. Chang Hua Sen energy. The HEART of the Yun Sect. The reason water GIVES. Sits silently near Lán when she rages — "the river always calms eventually." Lán calls him "Hé Cháng you get back here right now." The gourd noise is his favourite memory.
- **Yan/Yun Cosmological Mirrors**: Shí Ān ↔ Cháo Lán (twin leaders, Koi Fish ↔ Wind Serpent taskers). Tiān Mù ↔ Hǎi Shěn (both white-haired, bleached by power). Tǔ Héng ↔ Hé Cháng (both walk the land intimately). Kè Zhēn ↔ Míng Mèng (both keepers of what happened). Yán Shǒu ↔ Hǎi Shěn (both men who stand between the world and its end). Shān Rú ↔ Lián Yīng (healers — body/corruption). The mountain and the river. Two halves of one love story.
- **CharacterGallery component (2026-04-13)**: Added `src/CharacterGallery.jsx` + `src/data/characters.js` with character manifest. When a sect prompt is expanded, a row of circular portraits appears at the top. Clicking a portrait opens a modal showing the full image + auto-extracted text section (parsed from the entry by finding the character's `═══ HEADER` and grabbing until next `═══`). Arrow keys/buttons cycle through characters, Escape closes. Covers all 6 Aoli sects (Yan, Yun, Wen, Fen, Hun, Shi). Total 46 character portraits linked. Text extraction is automatic — as the entry text grows, modals stay in sync with no manual updating needed.
- **Braedun world-bible entries PORTED (2026-04-21)**: Three new/updated entries now live in `src/data/initial-entries.js`. (1) `braedun-politics` (10.6k chars) — sacred marriage of crown, fractal pairing, elections (owl + stag ceremonies), term/rules, full profiles for Breyle, Cadfael, Rhonwen, Morag. (2) `braedun-culture` (6.2k chars) — Celtic classes (druids/warriors/bards/craftspeople/farmers), druidic hierarchy, handfast vs sanctified marriage, birth vs druid names, fair folk, the four fire festivals. (3) `braedun-overview` updated (+2k chars) — Nyra Lake, the Silver Road, hidden watershed sections woven between the Lúnavé paragraph and the forests section. All content faithfully ported from `braedun-research.md`. Backup kept at `src/data/initial-entries.js.bak`.
- **Braedun settlements — ALL NAMED (2026-04-21)**: "Cynefin" rejected. Trees are NATIVE oaks + yews, cultivated to enormous size by druids over centuries. Six named settlements + scattered tree-farmsteads: **Lúnewood** *(Royal Seat)*, **Mistwood** *(Fog-Shrouded Tree Tower)*, **Wardwood** *(Southern Watch Tower)*, **Havenwood** *(Harbor of the Steppes)*, **Reedwood** *(Tree of the Reeds)*, **Elderwood** *(Grove Village)*. Naming family: all end in -wood; each prefix says what the place IS. Subtitles canon (surfaced by map generator 2026-04-21, Serina loved them). Full detail in `braedun-research.md`.
- **Braedun daily-life COMPLETE (2026-04-21)**: `braedun-dailylife` entry written (13k chars) and all 6 Braedun entries now fully populated. Decisions: trees are MYTHIC-SCALE (10× redwood, 300-person linked hands to span base, 100m+ diameter), grow in natural copses "as if nature knew homes would be built in the canopy." Three-tier template: GROUND (livestock/fields/workshops/forges, the only tier with open flame), MIDDLE (communal heart — kitchen, hall, study), CANOPY (private bedrooms, each with its own druidic-plumbed bathroom). Winding stairs up trunks; bridges span copse-clustered canopies. Druidic plumbing taps Lúnavé hidden watershed and ground wells. Corruption-death ritual = The Breaking (druids + warriors fell the tree cleanly, burn the wood, leave land fallow for a generation). Outsiders housed in dedicated visitor quarters; first week often spent at ground level until the canopy feels safe.
- **Braedun map exists at `public/images/locations/caerndrath/braedun/Braedun Map.png` (2026-04-21)**: Painted watercolor vertical parchment scroll, Celtic-Arthurian atmospheric style, matches the Aoli map's visual family. Surfaced canonical landscape taglines: Nyra Lake = *Mirror of Shadows*, Dark Circle = *Ancient Standing Stones*, Central Circle = *Ancient Stone Circle*, Silver Road = *Flowing South*, Sacred Grove = *Elders of Light*. Current map (v2) has Lúnewood + Elderwood labeled but is MISSING Mistwood, Reedwood, Havenwood labels. Serina decided to keep the map as-is and label the missing settlements in by hand later (manual image-editor work).
- **Atlas detailed-map modal (2026-04-21)**: `src/WorldMap.jsx` extended so any REGION with a `detailedMap` field shows a "View detailed map" button in the side panel when selected. Clicking opens a fullscreen modal with the painted parchment map (close by click-outside, X button, or Escape). Currently wired for Aoli and Braedun. To add a future country's map: drop the PNG into `public/images/locations/<country>/`, add `detailedMap: '/images/locations/<country>/<filename>.png'` to that country's REGIONS entry. No further code change needed.
- **Cultural bases — Aoli=Zhou, Solis=Tang (2026-04-21)**: Aoli's imperial culture modeled on **Western Zhou Dynasty** (1046-771 BCE) — Mandate of Heaven doctrine perfect for sects-coexisting-with-emperor (emperor rules settled lands under Heaven's mandate; sects hold their own mandate from sleeping gods), feudal vassal-lord structure, pre-Confucian mythic time, ritual bronze + jade aesthetic, archaic silk. Aoli gets an EMPEROR and imperial dynasty ruling non-sect populace in addition to the six sects. Solis's culture modeled on **Tang Dynasty** (618-907 CE) — cosmopolitan golden-age excess, courtesan culture, poetry, multi-ethnic Silk-Road mix, lush silk and jewels. "Jewelled rot" label fits Tang perfectly. Aoli is what Solis was a thousand years ago before it drifted worldward. Original Solis description was "Roman/Byzantine" — that framing is now REPLACED by Tang-coded.
- **Aoli spatial structure — sacred ring (Serina's verbatim 2026-04-21)**: *"if you look at the map of Aoli that middle part that will be the empire the sects will suround it but the middle part that is the empire."* The imperial heartland sits at the CENTRE of Aoli (green valleys, terraced farmland, imperial cities, Zhou-coded dynasty); the six sect mountains RING it (Wen NW, Yan N, Yun NE, Hun E, Fen SW, Shi SE). A mandala structure — emperor at the sacred centre, cultivators on the guardian peaks. Fractal parallel to Braedun's crown-and-grove pairing, scaled up to civilization level.
- **Aoli entries STATE (as of 2026-04-21)**: 3 of 4 missing entries now written and pushed. `aoli-landscape` (5.4k) and `aoli-overview` (6.6k) pushed as commit `06fdf65`. `aoli-imperial` (15.9k — the Chén Dynasty + Imperial Family + Noble Ranks + Three Ducal Ministers + Nine Ministers + Scholar Class + Civil Ranks + Imperial/Sect Separation) written; a new `aoli-imperial` section prompt was added to `sections.js`. STILL PENDING: `aoli-cultivation` and `aoli-dailylife`.
- **Aoli Imperial Canon (2026-04-21)** — Serina's decisions + the Chén Dynasty written into `aoli-imperial`:
  - **Dynasty**: The **Chén (辰) Clan** — "celestial body / morning star" — mandate literally written in the sky
  - **Capital**: **Zǐchén (紫宸)** — "Purple Celestial" — mandala city at the heart of the central valley
  - **Emperor**: Chén Yuán (辰元) "First Star" — principled, monogamous, devoted to the Empress
  - **Empress**: Lí Wǎn (黎婉) "Gentle" of the House of Lí (a Duke-rank noble house)
  - **Dowager Empress**: Mù Tàihòu (穆太后) — **benevolent grandmother** (Serina chose A) — the softest hand in the palace, stabilising force, deeply loved
  - **Crown Prince**: Chén Jǐng (辰景) "Bright Light" — prepared, thoughtful, well-liked heir
  - **Second Prince**: Chén Wǔ (辰武) "Martial Star" — **Head of the Imperial Guard** (defends Zǐchén + Emperor's household); disciplined, fierce of loyalty, no appetite for the throne
  - **Third Prince**: Chén Qīng (辰清) "Pure/Serene" — **cultivator of the HUN SECT**; left palace young with Emperor's blessing and Dowager's insistence; takes a cultivator name the court does not use
  - **Grand Princess**: Chén Lán (辰兰) "Orchid Star" — **Minister of Music** (樂官 — sacred role in Zhou-coded world; she is the voice of the mandate at ceremony); studied with Wen Sect music-cultivators; the closest thing Aoli has to a bridge between imperial and sect domains
  - **Women in office (MAJOR canon)**: *"women can hold office in Aoli. They can be ministers hold land and be generals if they want to be."* Rooted in the realm's cosmology — Aoli's sleeping gods are a married pair (Yánlóng + Yúnshēng) and the young gods were co-equal across gender. Aoli's humans inherited the balance.
  - **Noble structure**: Zhou's five ranks (Gōng/Hóu/Bó/Zǐ/Nán); Three Ducal Ministers (Tàishī/Tàibǎo/Tàifù); Nine Ministers (Rites/Music/War/Justice/Census/Treasury/Works/Envoys/Stables); scholar class (Grand Astrologer, Court Ritualists, Sages, Apprentices) is mastery+lineage+appointment (NOT Han-style exams — Aoli predates that system)
  - **Imperial/Sect separation**: Mandate of Heaven explicitly two-pillar — emperor and sect-leader address each other as equals, joint tribunals at the boundary, distance is the respect. Third Prince's cultivation at Hun Sect is the ONE anomaly, arranged with formal protocol.
- **🎭 BIG PLOT GEM — Third Prince = Yōu Lán (2026-04-21 Serina's implication)**: Serina wrote *"third prince cultivates in the Hun sect (remember Mr Mystery from the Hun Yōu Lán) I wonder who he is hmmmmm."* The strong reading: **Yōu Lán the Dream Walker IS Chén Qīng, the Third Prince** — living in the Hun Sect under a cultivator name, his true identity known only to Hun Sect's inner circle (possibly not even all five Hun leaders). The world bible's `aoli-imperial` entry preserves the mystery (does not state it explicitly) but ends with a line planting the seed: *"And somewhere in the Hun Sect's valley of mist, a figure called Yōu Lán — 'The Dream Walker,' the isolated enigma — will step out of his quiet life and remember the palace he was born in."* When the Fellowship visits Hun Sect, the reveal is available to them. Canon in memory; mystery in the world bible.

## References

| File | Type | Description |
|------|------|-------------|
| [file-transfer-workflow.md](file-transfer-workflow.md) | reference | Windows-to-WSL paths, Claude.ai artifact limitation |
