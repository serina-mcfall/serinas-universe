#!/usr/bin/env python3
"""Safe string replacement inside initial-entries.js.

Usage: python3 safe_replace.py <path-to-old-string-file> <path-to-new-string-file>
The old string MUST appear exactly once; otherwise this script refuses to edit.
"""
import sys
import os

TARGET = '/home/serina/GitHub/Personal/serinas-universe/src/data/initial-entries.js'

def main():
    old_path = sys.argv[1]
    new_path = sys.argv[2]
    with open(old_path, 'r') as f:
        old = f.read()
    with open(new_path, 'r') as f:
        new = f.read()
    with open(TARGET, 'r') as f:
        data = f.read()
    count = data.count(old)
    if count == 0:
        print('ERROR: old string not found in file', file=sys.stderr)
        sys.exit(1)
    if count > 1:
        print(f'ERROR: old string found {count} times, must be unique', file=sys.stderr)
        sys.exit(1)
    new_data = data.replace(old, new)
    tmp = TARGET + '.tmp'
    with open(tmp, 'w') as f:
        f.write(new_data)
    os.replace(tmp, TARGET)
    print('OK — replaced old → new, new file size:', len(new_data))

if __name__ == '__main__':
    main()
