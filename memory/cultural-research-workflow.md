---
name: Cultural Research Dossier Workflow
description: Sub-agent workflow for producing the 7 remaining cultural research dossiers for Avalúne. Design approved 2026-04-19. Aoli pilot next.
type: project
originSessionId: a364797a-e79f-4ca7-aade-63a8bd50b010
---
## Status (as of 2026-04-19)

Serina has one research dossier complete (`braedun-research.md`, Pre-Roman Celtic Britain, ~12k words). Seven remain: Aoli, Isenholt, Tyramare, Ardenmere, Maramir, Solis, Aurum. She wants them produced via Claude Code sub-agents (not Claude.ai Deep Research).

**Aoli pilot COMPLETED 2026-04-19** — `memory/aoli-research.md` at ~17,200 words (115KB), all 20 sections + Sources. Serina approved with no calibration changes ("that is perfect you can continue on with the others now"). First attempt stalled on single-write; second attempt succeeded with chunked-write strategy (see `subagent-chunked-writes.md`).

**Creative anchors for the other 6 drafted 2026-04-19** — all at `docs/superpowers/specs/2026-04-19-creative-anchors-six-cultures.md`. Approved by Serina ("Approved").

**Six parallel agents dispatched 2026-04-19.** Progress:
- ✅ **Isenholt** complete — `memory/isenholt-research.md`, ~17,149 words
- ✅ **Solis** complete — `memory/solis-research.md`, ~15,606 words
- ⏳ Tyramare, Ardenmere, Maramir, Aurum still running

Solis agent flagged: it extrapolated a "Code of the Sash" five-rule ethic for Lady Pearl's house from Tang jiaofang + Byzantine theatre-troupe solidarity + Sogdian merchant-honour networks. **This is invented narrative material, not research.** Serina should review that section specifically and decide whether to keep, adapt, or strip.

## Approved Design

Full spec at `docs/superpowers/specs/2026-04-19-cultural-research-dossiers-design.md`.

**Cadence:** pilot-first, then fan out the rest in parallel.
**Architecture:** one `general-purpose` sub-agent per culture. Each agent has WebSearch + WebFetch + Write. Each writes its own `memory/<country>-research.md` file directly and returns only a ~300-word summary so the 15k words don't bloat main context.

**Pilot:** Aoli. After Serina reviews the pilot, we calibrate the template, then spawn six parallel agents for the remaining six.

**Per-dossier target:** ~12-18k words, 20 categories (from `memory/deep-research-prompt.md`), Braedun format as reference, scholarly sources cited at the end.

## Why pilot-first

Serina's words on the decision (2026-04-19): chose option B — "Pilot one first, then fan out the rest in parallel" — over all-at-once (risk of getting flavour wrong seven times over) or one-at-a-time (too slow).

## Serina's Aoli vision (verbatim, 2026-04-19)

> *"Think The Untamed, Ashes of Love, Legend of Fuyao. This country is based on Chinese XianWuxia / Xianxia Dramas."*

This quote is the tonal anchor for the Aoli pilot and every future Aoli-related piece of work. The three dramas establish the register: flying swords, immortal masters, sect politics, cosmic romance, ethereal robes, centuries-long rivalries. Full approved anchor is in `docs/superpowers/specs/2026-04-19-cultural-research-dossiers-design.md` and will be reproduced at the top of `memory/aoli-research.md` once the pilot completes.

## Rich findings from Isenholt (2026-04-19)

1. **The Volga Silver Road** is the REAL historical seam where Viking and Mongol worlds touched. Islamic silver dirhams in Swedish hoards; Ibn Fadlan's eyewitness of Rus ship-burials. Isenholt's fusion is historically credible, not just aesthetic convenience.
2. **The Oseberg ship burial held TWO WOMEN** — one aged 70–80, one ~50, with 15 horses, 6 dogs, 2 cows, ornate sledges, a wagon, imported vessels. The single richest Viking burial ever found, and it was women. Direct ground for Isenholt's Hearthkeeper aristocracy.
3. **Birka grave Bj 581** — the "Viking warrior" long assumed male was confirmed female by DNA in 2017. Buried with sword, axe, fighting knife, lances, shields, 25 armour-piercing arrows, 2 horses. The female Stoneborn is grounded history.

## Rich findings from Solis (2026-04-19)

1. **Byzantine "Born in the Purple" ↔ Tang "jinshi celebrating in Pingkangfang"** — both cultures ritualized hierarchy top through colour (porphyry birth-chamber) and pleasure-quarter (where new imperial scholars celebrated). Purple + pleasure carry doubly-loaded symbolism in Solis.
2. **Theodora and Xue Tao are the real historical Lady Pearls** — the courtesan who became empress (Byzantium) and the registered courtesan whose poetry stood beside the greatest male poets (Tang). Both cultures independently produced literate, politically powerful courtesans.
3. **Agent extrapolated a "Code of the Sash"** — invented five-rule ethic from Tang jiaofang + Byzantine theatre-troupe solidarity + Sogdian merchant-honour. NEW narrative material, needs Serina's review.

## Three rich findings from Aoli pilot (worth carrying into future work)

From the completed Aoli dossier — insights the research surfaced that directly serve worldbuilding:

1. **The nine-tailed fox turned "evil" in the Tang dynasty specifically** — tied to dynasty-toppling queen legends (Daji of the Shang, Baosi of the Zhou). Pre-Tang, the nine-tailed fox was AUSPICIOUS. **Aoli's Wen Sect — benevolent nine-tailed foxes, all-female, musical, healing — is historically a RECLAMATION of the pre-Tang fox.** Not a coincidence; a choice with real cultural weight. Wénjī isn't "a good fox by accident" — she is what the fox USED to mean before the Tang villainised her.

2. **Song paper money (*jiǎozi*, 1024 CE) is the world's first banknote** — centuries before Europe. Gives Aoli an economic sophistication argument that inverts the "advanced West / mystical East" cliché.

3. **The master-disciple bond (*shīshòu*) legally and emotionally outranked the biological father-son bond** in some Tang readings. Exactly the cultural machinery Aoli's sect-based storytelling needs — and it is historically real. A disciple defying their parents to stand with their master is grounded Chinese legal and emotional tradition, not invention.

## Pending Aoli expansion ideas (surfaced 2026-04-19, not yet decided)

Suggestions I proposed to Serina for things that could deepen Aoli's worldbuilding — she hasn't decided on any yet but noted them. Worth revisiting after the research pilot lands:

1. A capital city — Aoli's Chang'an-equivalent metropolis
2. Formal cultivation stages (xianxia canon: Qi Refining → Foundation Establishment → Core Formation → Nascent Soul → Spirit Severing → Dao Seeking → Immortal Ascension)
3. The imperial / court layer (is there an emperor alongside the sects? What's the tension?)
4. The commoners' Aoli (farmers, innkeepers, herbalists — non-cultivator daily life)
5. The jiānghú (江湖) — wandering swordsman / rogue cultivator layer
6. The sacred calendar (Lunar New Year, Qingming, Dragon Boat, Mid-Autumn, Lantern Festival)
7. Traditional Chinese medicine spine for the Yan Healers

## Why: creative anchor drawn from world bible

Each dossier opens with a "Serina's Vision" anchor tailored to that country, pulled from the existing world bible. Keeps research pointed at what matters to her world rather than at generic historical trivia. Braedun demonstrates the pattern — Camelot/Stonehenge vision quote up top, then clean historical research below.

## How to apply

When a future session returns to this work:
1. Check which research files already exist in `memory/` (pattern: `<country>-research.md`).
2. If Aoli isn't done yet, the next concrete step is drafting the Aoli creative anchor from her Aoli bible (sects, cosmology, Shí Ān, mountain/river mirror).
3. If Aoli is done but others are missing, Serina's calibration notes are the key input — check conversation context or ask her directly before dispatching the six parallel agents.
4. Sub-agent prompt template is in the spec doc under "Per-Agent Prompt Template (abridged)".
