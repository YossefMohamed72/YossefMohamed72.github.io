#!/usr/bin/env python3
"""
LINGOSKY — partial sync
------------------------
The site is plain HTML/CSS/JS with no build step, but the header, mobile
menu, and footer must be identical on every page. Rather than hand-editing
15 files whenever nav changes, edit the single source of truth in
/partials/ and re-run this script to propagate it everywhere.

Usage:
    python3 scripts/sync_partials.py

Run from the project root (the folder that contains /partials and the
site's *.html files), or pass --site-dir / --partials-dir explicitly.
"""
import argparse
import glob
import os
import re


def find_block(src, start_tag_re, close_tag_name):
    """Return (start, end) char offsets of a block, matching nested tags
    of the same name so we don't cut off early (e.g. nested <div>s)."""
    m = re.search(start_tag_re, src)
    if not m:
        return None
    start = m.start()
    tag_re = re.compile(r'<(/?)' + re.escape(close_tag_name) + r'\b')
    depth = 0
    pos = m.start()
    while True:
        tm = tag_re.search(src, pos)
        if not tm:
            return None
        if tm.group(1) == '':
            depth += 1
        else:
            depth -= 1
            if depth == 0:
                gt = src.index('>', tm.end())
                return start, gt + 1
        pos = tm.end()


def sync(site_dir, partials_dir):
    header = open(os.path.join(partials_dir, 'header.html'), encoding='utf-8').read().rstrip('\n')
    mobile_menu = open(os.path.join(partials_dir, 'mobile-menu.html'), encoding='utf-8').read().rstrip('\n')
    footer = open(os.path.join(partials_dir, 'footer.html'), encoding='utf-8').read().rstrip('\n')

    blocks = [
        (re.compile(r'<header[^>]*id="navbar"[^>]*>'), 'header', header),
        (re.compile(r'<div[^>]*id="mobile-menu"[^>]*>'), 'div', mobile_menu),
        (re.compile(r'<footer\b[^>]*>'), 'footer', footer),
    ]

    changed = []
    for path in sorted(glob.glob(os.path.join(site_dir, '*.html'))):
        src = open(path, encoding='utf-8').read()
        original = src
        for start_re, tag_name, replacement in blocks:
            span = find_block(src, start_re, tag_name)
            if span is None:
                print(f"  WARNING: could not find <{tag_name}> block in {os.path.basename(path)} — skipped")
                continue
            src = src[:span[0]] + replacement + src[span[1]:]
        if src != original:
            open(path, 'w', encoding='utf-8').write(src)
            changed.append(os.path.basename(path))

    print(f"Synced header/mobile-menu/footer into {len(changed)} file(s):")
    for c in changed:
        print(f"  - {c}")


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--site-dir', default=os.path.join(os.path.dirname(__file__), '..', 'lingosky'))
    ap.add_argument('--partials-dir', default=os.path.join(os.path.dirname(__file__), '..', 'partials'))
    args = ap.parse_args()
    sync(os.path.abspath(args.site_dir), os.path.abspath(args.partials_dir))
