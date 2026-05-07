# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **Claude-Code-native deep-research framework**. The user runs deep research (buy decisions, idea validation, competitive analysis, brainstorming, etc.) by invoking `/research <query>`. A dr-lead-researcher subagent plans the work, dispatches parallel dr-subagent-researchers, then runs critic + dr-citation-checker passes before finalizing. All artifacts persist to `reports/<YYYY-MM-DD>-<slug>/`.

The framework is designed to be open-sourceable to other Claude Code users, so keep the design generic, the dependencies minimal, and the user-specific config out of committed files.

## Operating loop

When the user asks to research, investigate, compare, validate an idea, or do competitive analysis:

1. **Confirm scope if ambiguous** — for "research laptops" ask use case, budget, OS, etc. before invoking. Skip the question if the query is already specific.
2. **Invoke `/research <query>`** — this is the single entry point. Do not bypass it.
3. The command bootstraps `reports/<YYYY-MM-DD>-<slug>/`, then hands off to the `dr-lead-researcher` subagent (Opus). The lead handles planning, parallel dispatch, synthesis, critic, citation check.
4. When the lead returns, surface: run dir path, TL;DR from `synthesis.md`, audit verdict, what to read next.

For trivial questions answerable from training data or a single search, **answer directly**. Don't burn 15× tokens on `/research` for "what's today's date."

## Architecture

```
User → /research → dr-lead-researcher (Opus)
                       │
                       ├─ Agent ─→ dr-subagent-researcher (Sonnet)   ┐
                       ├─ Agent ─→ dr-subagent-researcher (Sonnet)   │ parallel
                       └─ Agent ─→ dr-subagent-researcher (Sonnet)   ┘
                       │
                       ├─ Agent ─→ dr-critic (Sonnet)
                       └─ Agent ─→ dr-citation-checker (Haiku)
                       │
                       ▼
                  synthesis.md
```

Subagents live in `.claude/agents/`. Skill in `.claude/skills/deep-research/`. Slash command in `.claude/commands/research.md`.

## Hard constraints (do not violate)

- **Search backends**: `WebSearch` and `WebFetch` only. **No** Tavily, Firecrawl, Exa, Perplexity, or MCP search servers. The framework is deliberately API-key-free.
- **Single-message parallel dispatch**: subagents must be invoked concurrently in one Agent message. Sequential dispatch defeats the architecture.
- **Persist to disk**: the lead's working memory is the run directory, not chat context — survives compaction.
- **Output convention** in every run dir:
  ```
  query.md  plan.md  sources.md  claims.md  synthesis.md  audit.md  meta.json
  notes/<n>-<slug>.md
  ```
- **No fabrication**: every non-trivial claim cites a source. Gaps go under "Open questions," not invented answers.
- **Don't overwrite prior runs**: slug collisions append `-2`, `-3`, etc.
- **Source-quality tiers** (T1 primary/official, T2 reputable secondary, T3 forums/SEO) — surfaced explicitly in `sources.md`.

## Scaling rules (Anthropic eval-derived)

| Complexity | Agents | Tool calls/agent |
|---|---|---|
| Simple fact-finding | 1 | 3-10 |
| Direct comparison | 2-4 | 10-15 |
| Complex research | 5-10+ | 10-15 |

The dr-lead-researcher classifies in `plan.md` and dispatches accordingly. Don't manually override unless the user explicitly says so.

## Repo layout

```
.claude/
  agents/
    dr-lead-researcher.md       # orchestrator (Opus)
    dr-subagent-researcher.md   # parallel worker (Sonnet)
    dr-critic.md             # adversarial reviewer (Sonnet)
    dr-citation-checker.md      # claim→source auditor (Haiku)
  commands/
    research.md              # /research entry point
  skills/
    deep-research/SKILL.md   # framework guide
reports/                     # run outputs. GITIGNORED in this framework repo.
                             # In your own project: untrack or commit per your preference.
                             # If you already use reports/ for something else, edit the path
                             # in .claude/agents/dr-lead-researcher.md and .claude/commands/research.md.
                             # Path config deferred to v0.3.
templates/                   # reusable scaffolds; run-readme.md.template controls cover page
memory/                      # auto-memory per global convention
README.md                    # OSS-facing pitch + usage
CLAUDE.md                    # this file
```

## Adding new patterns

User preference: **fewer patterns = more intuitive**. Resist the urge to add a new slash command per use case. The single `/research` entry handles buy decisions, idea validation, comp analysis, brainstorming, etc. — the dr-lead-researcher classifies and adapts.

Add a new command **only** when:
1. A pattern is invoked ≥3 times manually with the same shape.
2. The pattern materially differs from generic deep research (e.g., needs a fixed output schema, different scaling rules, or a non-research workflow).

Otherwise, codify reusable patterns as templates under `templates/` and reference them from the dr-lead-researcher's plan when relevant.

## Open-source readiness

This repo is intended to be shared. Keep clean:

- **No personal queries** — examples in docs use generic queries, not the user's actual research.
- **No API keys, secrets, or local paths** in committed files.
- **MIT license** — see `LICENSE`.
- **Generic** — no organization-specific or user-specific assumptions in the framework. Personal context goes in `memory/MEMORY.md`, which can be gitignored if desired.

## What this repo is **not**

- Not a wrapper around gpt-researcher, LangChain open_deep_research, or any external Python framework.
- Not a port of Anthropic's internal Research feature — it's an inspired implementation using the same architecture (orchestrator-subagents) and published principles.
- Not a tool for code-gen, debugging, or general software engineering. Use other repos for those.
