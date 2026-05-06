# deep-research

A **Claude-Code-native** multi-agent deep-research framework. Inspired by Anthropic's published [multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) (Opus lead + Sonnet subagents — 90.2% better than single-agent on internal evals).

Run open-ended research tasks — buy decisions, idea validation, competitive analysis, brainstorming — without leaving Claude Code, without external API keys, without LangGraph or Python orchestration servers.

## Why

- **Native**: pure Claude Code primitives — subagents, slash commands, skills, `WebSearch`/`WebFetch`. Zero external dependencies.
- **No API keys**: deliberately built around Claude Code's bundled tools. No Tavily, Firecrawl, Exa, Perplexity. Removes friction.
- **Persistent**: every run produces a structured directory you can git-track, search, and revisit. Memory survives across sessions.
- **Modular, not bloated**: one slash command (`/research`), four subagents, one skill. Adapts to query complexity automatically.
- **Open-source-friendly**: drop the `.claude/` directory into any project to enable the framework.

## Architecture

```
User
  │
  ▼
/research <query>      ← bootstraps reports/<date>-<slug>/
  │
  ▼
lead-researcher        ← Opus. Plans, decomposes, synthesizes.
  │
  ├─ subagent-researcher  ┐
  ├─ subagent-researcher  ├─ Sonnet. Parallel. One per sub-question.
  └─ subagent-researcher  ┘
  │
  ├─ critic              ← Sonnet. Adversarial review.
  └─ citation-checker    ← Haiku. Claim→source verification.
  │
  ▼
synthesis.md  +  audit.md  +  sources.md  +  claims.md
```

## Install

Drop the `.claude/` directory into the root of any project. That's it.

```
your-project/
  .claude/
    agents/
    commands/
    skills/
```

The framework activates the moment Claude Code starts in that directory.

## Usage

```
/research best laptop under $2000 for ML dev work in 2026
```

The lead-researcher will:

1. Bootstrap `reports/2026-05-06-best-laptop-under-2000-for-ml-dev/`.
2. Plan and write `plan.md` (decomposition + complexity tier).
3. Dispatch 2-10 parallel subagent-researchers depending on complexity.
4. Build `sources.md`, `claims.md`, draft `synthesis.md`.
5. Run `critic` for adversarial review → `audit.md`.
6. Run `citation-checker` to verify every claim traces to a source.
7. Finalize `synthesis.md` and surface the TL;DR.

## Output convention

Every run produces this structure:

```
reports/<YYYY-MM-DD>-<slug>/
  query.md         # verbatim query + frontmatter
  plan.md          # decomposition + complexity tier
  sources.md       # deduped sources, credibility-tiered
  notes/           # one file per subagent
    1-<slug>.md
    2-<slug>.md
  claims.md        # atomic claims with citation refs
  synthesis.md     # the final report
  audit.md         # critic + citation-checker output
  meta.json        # run metadata
```

## Scaling rules

The lead-researcher classifies the query and scales accordingly:

| Complexity        | Agents  | Tool calls / agent |
|-------------------|---------|--------------------|
| Simple fact       | 1       | 3-10               |
| Direct comparison | 2-4     | 10-15              |
| Complex research  | 5-10+   | 10-15              |

Don't burn 15× tokens on a trivial question — answer directly instead of `/research`-ing.

## Design principles (Anthropic-derived)

1. Think like your agents — every prompt is self-contained.
2. Teach orchestration — dispatches state objective, output, scope, budget.
3. Scale effort to complexity — don't over-deploy.
4. Critical tool design — `WebSearch` for discovery, `WebFetch` for deep reads.
5. Self-improvement — diagnose weak output before retrying.
6. Broad-to-narrow — open queries general; narrow as terrain reveals itself.
7. Guide thinking — extended thinking for plans; interleaved per-search.
8. Parallel tool calling — single message, concurrent subagents.

## Hard constraints

- **Native search only**: `WebSearch` + `WebFetch`. Removing this constraint would technically work — but it sacrifices the API-key-free UX that's the point of the framework.
- **One entry**: `/research`. Resist adding `/buy`, `/comp-analysis`, `/idea-validate`. The lead adapts.
- **Persist to disk**: run dir is the orchestrator's working memory.
- **No fabrication**: every claim cites a source. Gaps go under "Open questions."

## File layout

```
.claude/
  agents/
    lead-researcher.md       # Opus. Orchestrator.
    subagent-researcher.md   # Sonnet. Parallel worker.
    critic.md                # Sonnet. Adversarial reviewer.
    citation-checker.md      # Haiku. Citation auditor.
  commands/
    research.md              # /research entry point
  skills/
    deep-research/SKILL.md   # framework guide
reports/                     # all runs, git-tracked
templates/                   # reusable scaffolds (lazy-added)
memory/                      # auto-memory (gitignored)
CLAUDE.md                    # operating instructions for Claude Code
```

## Token cost

A complex run can use ~15× the tokens of a normal chat (per Anthropic). Plan accordingly — `/research` is for questions that warrant the depth.

## License

MIT. See `LICENSE`.

## Credits

- Architecture inspired by [Anthropic's multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system).
- Pattern lineage from the [Claude Cookbooks orchestrator-workers pattern](https://github.com/anthropics/claude-cookbooks/blob/main/patterns/agents/orchestrator_workers.ipynb).
