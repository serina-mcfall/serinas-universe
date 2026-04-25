#!/usr/bin/env python3
"""Utility to append new entries to initial-entries.js safely.

Usage: python3 patch_entries.py <key> <path-to-content-file>
The content file should contain ONE pre-escaped JS string (no surrounding quotes).
It will be inserted before the final `"};` by changing it to
`", "<key>": "<content>"};`.
"""
import sys
import os

TARGET = '/home/serina/GitHub/Personal/serinas-universe/src/data/initial-entries.js'

def main():
    key = sys.argv[1]
    content_path = sys.argv[2]
    with open(content_path, 'r') as f:
        content = f.read()
    with open(TARGET, 'r') as f:
        data = f.read()
    if not data.rstrip().endswith('"};'):
        print('ERROR: file does not end with "};', file=sys.stderr)
        sys.exit(1)
    idx = data.rfind('"};')
    new_piece = '", "' + key + '": "' + content + '"};'
    new_data = data[:idx] + new_piece + data[idx+3:]
    tmp_target = TARGET + '.tmp'
    with open(tmp_target, 'w') as f:
        f.write(new_data)
    os.replace(tmp_target, TARGET)
    print('OK — appended key', key, '— new file size:', len(new_data))

if __name__ == '__main__':
    main()
