---
name: Sub-agents must chunk large file writes
description: Single-write tool calls for long outputs (≥~10k words) stall the stream watchdog. Use skeleton-then-fill Edit pattern instead.
type: feedback
originSessionId: a364797a-e79f-4ca7-aade-63a8bd50b010
---
## The rule

When dispatching a sub-agent to produce a file ≥~10,000 words (e.g. a cultural research dossier, a long plan, a book chapter), the sub-agent must NOT attempt to generate the whole file body in one Write tool call. Force the chunked-write pattern in the prompt:

1. First Write: skeleton with frontmatter, top sections, and `<<PLACEHOLDER>>` markers for each major section
2. Subsequent Edits: one per section, each replacing its placeholder with ~500–700 words of content

## Why

**Stream watchdog kills agents after 600s of no output progress.** If a sub-agent is generating a 15,000-word body as the single `content` argument of one Write call, the model streams that output slowly enough that the watchdog declares the stream stalled and kills the agent. Happened 2026-04-19 on the first Aoli research attempt — `stream watchdog did not recover after 600s`; 10 minutes of web research was lost because the file was never written.

**How to apply:**

- For any sub-agent prompt that produces a long file, put the chunked-write instruction EARLY and in bold. Tell the agent the skeleton + Edit pattern is mandatory.
- Target 500–700 words per Edit. That keeps each generation well under the watchdog window.
- Braedun (~12k words) and the successful Aoli retry (~17k words) both worked with this pattern.
- This applies to the six parallel cultural research agents next, and any similar long-form generation task going forward.

## The prompt pattern that worked

```
CRITICAL: A previous attempt stalled because it tried to write the entire file in one Write call.
You MUST follow the chunked-write strategy:

1. Initial Write — create the file with frontmatter + top section + <<PLACEHOLDER>> markers
2. One Edit per section, each replacing its placeholder with ~500–700 words

Do NOT try to write the full file body in one Write or Edit call.
```

The research phase itself is fine — WebSearch/WebFetch calls don't trigger the watchdog because each one produces output. The failure mode is specifically a single massive text generation.
