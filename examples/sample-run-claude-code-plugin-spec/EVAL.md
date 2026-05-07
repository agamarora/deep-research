# Evaluation note — sample run "Anthropic Claude Code plugin spec"

This run is one of two committed sample runs that ship with deep-research. It is preserved verbatim — including its `dispatch_mode: fallback` notice — because the run itself surfaced an architectural issue in the framework that became the v0.2.2 fix.

## Context

- **Query**: "Anthropic Claude Code plugin spec — current status, planned shape, ETA as of May 2026"
- **Framework version at run time**: v0.2.1 (commit `78e09c4025fc`)
- **Run date**: 2026-05-07
- **Class**: meta / competitive analysis
- **Output**: 5 sub-questions, 20 sources (T1: 11, T2: 3, T3: 6), 38 atomic claims, ~15 KB synthesis

## Why it shipped on the fallback path

v0.2.1 dispatched a separate `dr-lead-researcher` subagent, which then tried to dispatch the worker subagents. Claude Code blocks subagent → subagent dispatch (the lead lost access to the `Agent` tool inside its execution context). The v0.2.1 fallback wrapper handled this gracefully:

- The lead degraded to in-process sequential execution + self-critic + self-citation-check.
- All artifacts were still produced.
- `meta.json` recorded `dispatch_mode: "fallback"` with full `dispatch_notes`.
- A soft notice was prepended to the `synthesis.md` TL;DR.
- The output is correct and well-cited — quality was not impacted.

The notice you see in this run's `synthesis.md` is real, intentional, and honest about what happened.

## What v0.2.2 changed

The `dr-lead-researcher` subagent was retired. The `/research` slash command body now embeds the orchestrator role: your main Claude Code session plans, dispatches workers, synthesizes, and runs the critic / citation passes. Only main → subagent dispatches happen, which Claude Code allows. Native parallel multi-agent dispatch works.

If you ran the same query under v0.2.2 today, you would see:

- `dispatch_mode: "native"` in `synthesis.md` frontmatter and `meta.json`.
- No fallback notice in the TL;DR.
- 5 `dr-subagent-researcher` subagents dispatched in a single message (parallel).
- A real `dr-critic` subagent producing `audit.md` instead of a self-critic pass.
- A real `dr-citation-checker` subagent producing the citation audit instead of a self-check.

Output content quality on this query is essentially equivalent in either mode. The architectural difference matters most on harder, more complex queries where parallel research over independent sub-questions is meaningfully faster.

## Why we kept the fallback run as the shipped sample

Two reasons:

1. **The graceful-degradation path is itself a feature.** Future installs can hit edge cases (mid-session installs, registry quirks, agent renames upstream). The fallback path is the framework's contract for "still produce a usable result." Showing what that looks like in practice is more useful than hiding it.

2. **Re-running for cosmetics is the wrong tradeoff.** The research is real, the sources are real, the conclusions hold. Re-running the same query just to remove a footer note would be theatre.

If you want to see the native multi-agent path, look at the other sample: [`../sample-run-budget-laptop-india/`](../sample-run-budget-laptop-india/). It was run under the architecture that v0.2.2 brings to all queries.

## What the critic + citation auditor actually said (excerpts)

> Material objections requiring synthesis revision: None that change conclusions. The two soft caveats above (Cowork claim weakly evidenced; ETA conclusion is "absence of evidence") are flagged in synthesis.md under "Open questions" rather than asserted.

> Citation audit:
> - ✅ Every claim in `claims.md` carries a `[S#]` citation matching `sources.md`.
> - ✅ Every paragraph in `synthesis.md` is traceable to a claim.
> - ⚠️ The notes/*.md files use per-note-local source numbering for readability; master `sources.md` uses global numbering. (Flagged, intentional.)

Mapped: critic verdict = ship; citation audit = pass.
