---
name: deep-research
description: Use the multi-agent deep-research framework — lead researcher orchestrates parallel subagents, critic audits, citation checker verifies sources, all artifacts persisted under reports/. Trigger when the user asks to "research", "investigate", "compare", "validate idea", "comp analysis", "buy decision", or any open-ended question that benefits from iterative search + synthesis. Native search only (WebSearch + WebFetch), no external APIs.
---

# Deep Research Framework

This repo implements a Claude-Code-native multi-agent deep-research system based on Anthropic's published architecture (Opus lead + Sonnet subagents — 90.2% better than single-agent on internal evals).

## When to invoke

Trigger this skill when the user wants:

- **Buy decisions**: "best X for use case Y" — laptops, gear, services, software
- **Idea validation**: "is this product idea worth building" — market check, differentiation, feasibility
- **Competitive analysis**: "comp landscape for X" — players, positioning, gaps
- **Brainstorming**: "give me product ideas in space X" — opportunity scanning
- **Open-ended technical research**: "how do teams handle X" — pattern discovery
- **Anything iterative** that benefits from broad-to-narrow search + cross-source triangulation

If the question can be answered in 1-2 sentences from training data or a single WebSearch, **don't** invoke deep research — just answer.

## How to invoke

Two paths:

1. **User-driven**: user types `/research <query>` — that command handles bootstrapping and hands off to the lead researcher.
2. **Auto**: Claude Code recognizes a research-shaped request and invokes `/research` proactively. Confirm scope with the user first if the query is ambiguous (e.g. "research laptops" → ask which use case, budget, OS preference).

## Architecture

```
User
  │
  ▼
/research command (bootstrap run dir)
  │
  ▼
lead-researcher (Opus)        ← plans, decomposes, synthesizes
  │
  ├── Agent → subagent-researcher (Sonnet)  ← runs sub-question 1
  ├── Agent → subagent-researcher (Sonnet)  ← runs sub-question 2     [parallel]
  ├── Agent → subagent-researcher (Sonnet)  ← runs sub-question 3
  │
  ▼ (synthesize draft)
  │
  ├── Agent → critic (Sonnet)            ← adversarial audit
  └── Agent → citation-checker (Haiku)   ← claim→source verification
  │
  ▼
synthesis.md + audit.md
```

## Output convention

Every run lands in `reports/<YYYY-MM-DD>-<slug>/`:

| File | Purpose |
|---|---|
| `query.md` | Verbatim query + frontmatter |
| `plan.md` | Decomposition + sub-questions + complexity tier |
| `notes/<n>-<slug>.md` | One per subagent — findings, evidence, gaps |
| `sources.md` | Deduped sources with credibility tiers (T1/T2/T3) |
| `claims.md` | Atomic claims with citation refs `[S<n>]` |
| `synthesis.md` | Final report — the artifact the user reads |
| `audit.md` | Critic verdict + citation audit |
| `meta.json` | Run metadata (status, agent count, timestamps) |

This convention is part of the framework — don't drift from it across runs.

## Scaling rules (Anthropic eval-derived)

| Complexity | Agents | Tool calls/agent | Example |
|---|---|---|---|
| Simple fact-finding | 1 | 3-10 | "What's the current Claude Sonnet model ID?" |
| Direct comparison | 2-4 | 10-15 | "Pinecone vs Weaviate vs Qdrant for our use case" |
| Complex research | 5-10+ | 10-15 | "Comp analysis of the LLM observability market" |

Lead researcher classifies in `plan.md` and dispatches accordingly.

## Eight prompt-engineering principles (applied)

1. **Think like your agents** — every subagent prompt is self-contained.
2. **Teach orchestration** — sub-question, output path, scope, budget all explicit.
3. **Scale effort to complexity** — don't dispatch 10 agents for a trivial query.
4. **Critical tool design** — `WebSearch` for discovery, `WebFetch` for deep reads, `Read`/`Write`/`Glob`/`Grep` for filesystem.
5. **Self-improvement** — diagnose weak subagent output before retrying with the same prompt.
6. **Broad-to-narrow** — open queries general, narrow as terrain reveals itself.
7. **Guide thinking** — extended thinking for planning; interleaved thinking inside subagents.
8. **Parallel tool calling** — every dispatch round runs subagents concurrently in one Agent message.

## Hard constraints

- **Native search only** — `WebSearch` + `WebFetch`. No Tavily/Firecrawl/Exa/MCP search. Repo is API-key-free by design.
- **Persist plan to disk** — the run directory is the lead's working memory. Survives context compaction.
- **No fabrication** — every non-trivial claim cites a source. Open questions go under "Open questions," not invented answers.
- **Single-message parallelism** — sequential subagent dispatch defeats the architecture.
- **Don't overwrite prior runs** — collisions append `-2`, `-3`, etc.

## Cost & token awareness

A complex run can use ~15× the tokens of a normal chat. Be judicious — invoke `/research` for questions that warrant the depth, not for trivia.

## Templates (lazy-add)

`templates/` holds reusable scaffolds (comparison-matrix, idea-validation, comp-analysis). Empty by default. Add a template the first time a pattern repeats. Keep the count low — fewer patterns = more intuitive.
