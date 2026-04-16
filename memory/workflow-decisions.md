---
name: Serina's Preferred Workflow
description: How Serina wants to split work between Claude Chat and Claude Code going forward
type: feedback
originSessionId: bd123ac3-fbc3-4c54-95f1-aaaaed19c370
---
## Two-Tool Workflow (decided 2026-04-11)

Serina explicitly defined how she wants to work going forward:

**Claude Chat (with Wen persona):**
- Images, aesthetics, visual references, mood boards
- Brainstorming with pictures (drag-and-drop images)
- "When I need advice on images and aesthetics as it's hard to get images to you, I can't drag and drop like I could in the chat"

**Claude Code (here):**
- Serina reports decisions from chat sessions
- Claude Code updates the files live
- Changes visible instantly in browser (localhost:3000)
- Push to GitHub when ready

**Why:** Claude Code can't receive drag-and-drop images the way Claude Chat can. Chat is the studio, Code is the forge.

**How to apply:** When Serina arrives in Claude Code, ask what decisions she's made in chat and update accordingly. Don't ask for images — that's chat territory. Focus on translating her decisions into file updates.

## Memory backup to GitHub (confirmed 2026-04-16)

When Serina says "push everything" or "push," she means: **copy the memory files from `~/.claude/projects/.../memory/` into the repo's `memory/` directory and push to GitHub for backup.** She wants all world-building notes backed up on GitHub the same way code changes are. This is a regular end-of-session habit.

**Why:** The memory files are her world-building bible — months of character interior work, lore, and creative decisions. Losing them would be devastating. GitHub is the safety net.

**How to apply:** At the end of any session where memory files have been created or modified, copy them into the repo's `memory/` folder, commit, and push when asked. Don't ask what she means — when she says "push" she means copy + commit + push now.
