---
name: Bug report
about: Something doesn't work as documented
title: "[BUG] "
labels: bug
---

## What happened

<one-line summary>

## Repro

Minimum steps to reproduce:

1. ...
2. ...
3. ...

## Expected

<what should have happened>

## Got

<what actually happened — paste error output, screenshots, or the run dir contents>

## Environment

- Claude Code version: <e.g. 1.x.y>
- OS: <Windows / macOS / Linux + version>
- Model: <Opus 4.7 / Sonnet 4.6 / etc.>
- deep-research version / commit: <git rev-parse HEAD or release tag>

## Run dir (if relevant)

If the issue is with a `/research` run, the run directory at `reports/<date>-<slug>/` contains the full state. Attach `meta.json`, `plan.md`, and `audit.md` if the run completed; attach whatever files exist if it didn't.
