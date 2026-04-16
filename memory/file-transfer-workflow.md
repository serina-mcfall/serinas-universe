---
name: File Transfer Between Windows and WSL
description: How to move files between Serina's Windows Downloads and WSL project directory
type: reference
originSessionId: bd123ac3-fbc3-4c54-95f1-aaaaed19c370
---
## Windows to WSL Path

Serina's Windows Downloads folder is accessible in WSL at:
`/mnt/c/Users/serin/Downloads/`

**How to apply:** When Serina says files are in her Downloads or on Windows, use `/mnt/c/Users/serin/Downloads/` to access them. She can also copy them manually with:
```
cp /mnt/c/Users/serin/Downloads/filename /home/serina/GitHub/Personal/serinas-universe/
```

## Claude.ai Artifacts Not in JSONL
Claude.ai Artifacts (interactive code blocks) are NOT saved in conversation JSONL history files. They appear as "This block is not supported on your current device yet." Always ask Serina to upload/copy the artifact file directly rather than trying to extract from history.
