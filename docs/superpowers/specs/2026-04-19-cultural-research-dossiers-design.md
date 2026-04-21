# Cultural Research Dossiers — Sub-Agent Design

**Date:** 2026-04-19
**Status:** Approved, pending Serina's written-spec review
**Author:** Wen (with Serina)

## Purpose

Serina's Avalúne world bible maps each fictional country to a real-world historical culture (or fusion of cultures). She has a polished master research prompt (`memory/deep-research-prompt.md`) covering 20 categories per culture. One dossier is already done: `memory/braedun-research.md` (Pre-Roman Celtic Britain, ~12k words, ~65k chars).

This spec designs the sub-agent workflow for researching the remaining seven cultures so Serina can build the rest of her world on authentic cultural DNA.

## Scope

### In scope
Producing seven cultural research dossiers, one per remaining country:

| Country    | Culture                                                       |
|------------|---------------------------------------------------------------|
| Aoli       | Ancient China (Tang/Song primary, Han/Zhou as background)     |
| Isenholt   | Viking Age Scandinavia + Medieval Mongolian steppe (fusion)   |
| Tyramare   | Byzantine Empire + Medieval Italian city-states (fusion)      |
| Ardenmere  | Medieval Anglo-French (10th-13th century)                     |
| Maramir    | Bedouin Arabian + Ancient Egyptian + Berber Saharan (fusion)  |
| Solis      | Byzantine + Tang Silk Road crossroads (fusion)                |
| Aurum      | Atlantis myths + Egyptian priestly + aerial high-magic        |

### Out of scope
- Braedun (already complete)
- Translating research into in-world content for `src/data/initial-entries.js`
- Any changes to the master research prompt itself
- Running any of this inside Claude.ai or ChatGPT Deep Research (this stays inside Claude Code, via sub-agents)

## Architecture

**One sub-agent per culture.** Each agent is self-contained: its own context window, its own web research pass, writes one file. No cross-agent coordination.

Rationale: coherence-per-culture matters more than cross-referencing, and the master prompt already asks each dossier to "note connections" to other cultures inside its own body. Agents running in isolation is simpler, cheaper, and safer than trying to coordinate them.

### Sub-agent type
`general-purpose` — has web access (WebSearch + WebFetch) plus Write. Each agent writes its dossier directly to `memory/<country>-research.md`.

### Output shape
Each dossier file will mirror `braedun-research.md`:

- YAML frontmatter (name / description / type: project; originSessionId omitted or set to the current Claude Code session ID)
- Purpose section anchored in Serina's creative vision for that country
- Twenty sections matching the master prompt's 20 categories, in order
- Sources section at the end
- Target length ~12-18k words (Braedun is ~12k; master prompt aspires to 20k)

## Phases

### Phase 1 — Aoli Pilot

1. **I draft the creative anchor** (~200-300 words) by pulling from the Aoli world bible: sects (Yan/Yun/Wen/Fen/Hun/Shi), cosmology, the mountain-and-river mirror, the Koi Fish and Wind Serpent, cultivation, the aesthetic Serina has already built.
2. **Serina reviews the anchor.** She approves or tweaks.
3. **I compose the pilot prompt** containing:
   - The master research prompt (20 categories, depth requirements, sensory detail rule, cite-sources rule)
   - The approved creative anchor
   - Reference to `memory/braedun-research.md` as format/depth template
   - Length target (~15k words)
   - Source rule: prefer scholarly, museum, and academic sources; be cautious with pop-history blogs; cite sources at end
   - Explicit Write-to-file instruction + return-only-a-summary instruction (so the 15k words do not bloat my context)
4. **I spawn one `general-purpose` sub-agent** with the composed prompt.
5. **Agent writes** `memory/aoli-research.md`, returns a ~300-word summary.
6. **Serina reads the file** and gives calibration notes.

### Phase 2 — Calibrate

I apply Serina's notes to a refined per-agent template. If the pilot was way off, we iterate on Aoli before fanning out. If it was close, we go straight to Phase 3.

### Phase 3 — Parallel Fan-Out

1. **I draft six creative anchors**, one per remaining country (Isenholt, Tyramare, Ardenmere, Maramir, Solis, Aurum), each pulled from the relevant bits of Serina's world bible.
2. **Serina reviews the six anchors** (in one pass, briefly — these are short).
3. **I spawn six parallel `general-purpose` sub-agents** in a single message for parallel execution. Each gets the refined template plus its own anchor.
4. **Each agent writes its own file**: `memory/isenholt-research.md`, `memory/tyramare-research.md`, etc.
5. **Total runtime:** expected 30-60 minutes with all six running in parallel.
6. **Serina reads the six files at her pace.** Any weak ones can be individually re-run.

## Per-Agent Prompt Template (abridged)

Each agent will receive a prompt built on this structure:

```
You are producing a deep cultural research dossier for a fantasy worldbuilding project.

Country: <Country name>
Culture(s) to research: <Culture description>

STEP 1 — Read these files for context and format:
- /home/.../memory/deep-research-prompt.md (the master prompt — FOLLOW THE 20 CATEGORIES EXACTLY)
- /home/.../memory/braedun-research.md (format/depth/voice reference)

STEP 2 — Creative anchor for this country (use this to know what matters to Serina):
<anchor text>

STEP 3 — Research the culture(s) using WebSearch and WebFetch.
- Prefer scholarly, museum, and academic sources
- Be cautious with pop-history blogs; verify claims where possible
- Look up specific rulers, battles, artifacts, sites, practices
- Gather sensory detail (smells, sounds, textures, tastes)
- Include minority / overlooked groups
- Note connections to neighbouring cultures

STEP 4 — Write the dossier to /home/.../memory/<country>-research.md
- Frontmatter matching braedun-research.md's format
- Purpose section quoting / paraphrasing the creative anchor
- All 20 categories from the master prompt, in order, using the master prompt's exact category headings
- Sources section at end with scholarly citations
- Target length: ~15,000 words. Depth over brevity. Specific examples over generalities.

STEP 5 — Return ONLY a short summary (~300 words) to me.
Do NOT return the full dossier text. The file is the deliverable.
```

## Quality Safeguards

- **Format anchor:** Braedun is the reference template. Every agent reads it first.
- **Source rule:** explicit in the prompt; agents required to cite sources.
- **Length floor:** ~12k words minimum, explicit in the prompt.
- **Serina's review gate:** the pilot must pass calibration before any of the six fan-out agents spawn.
- **Re-run affordance:** any weak dossier can be individually re-dispatched with adjusted prompting — no need to re-run the whole batch.

## Risks and Mitigations

| Risk                                                | Mitigation                                                                 |
|-----------------------------------------------------|----------------------------------------------------------------------------|
| Sub-agent hallucinates historical "facts"           | Require sources; prefer scholarly; Serina can spot-check against known history |
| Output is shallow despite length target             | Braedun as template; explicit "specific examples over generalities" rule   |
| Format drifts between dossiers                      | All agents read the same master prompt; Braedun as reference               |
| Cross-cultural connections missed                   | Master prompt already asks each dossier to note connections internally      |
| Files bloat my context                              | Agents Write directly and return only a summary; I never read full output in-conversation unless spot-checking |
| Six parallel agents is expensive in tokens/time     | Pilot first — we only spend the parallel cost once we know the template works |

## What Happens After This Spec

1. Serina reviews this written spec.
2. If approved, I skip straight to drafting the Aoli anchor (task #4).
3. No implementation plan document is needed — this spec IS the plan, and the steps are straightforwardly sequential.

---

*This is a research-workflow design, not a code implementation. The superpowers:writing-plans skill would normally come next, but for a linear research sweep with clear phases and an explicit per-agent prompt template already specified here, a separate plan document would duplicate this spec rather than add value. If Serina wants a more formal plan, we can add one.*
