# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project loosely follows [Semantic Versioning](https://semver.org/).

## [0.1.0] — 2026-05-06

### Added

- Initial public release.
- **Multi-agent deep-research framework** for Claude Code, native search only.
- 4 file-based subagents in `.claude/agents/`:
  - `lead-researcher.md` (Opus orchestrator) — plans, decomposes, dispatches parallel subagents, synthesizes, runs critic + citation passes.
  - `subagent-researcher.md` (Sonnet) — parallel worker for individual sub-questions.
  - `critic.md` (Sonnet) — adversarial review of draft synthesis.
  - `citation-checker.md` (Haiku) — claim → source verification.
- 1 entry slash command at `.claude/commands/research.md` (`/research <query>`).
- 1 skill at `.claude/skills/deep-research/SKILL.md` documenting workflow + scaling rules + Anthropic's 8 prompt-engineering principles.
- Output convention: `reports/<YYYY-MM-DD>-<slug>/` with `query.md`, `plan.md`, `notes/`, `sources.md`, `claims.md`, `synthesis.md`, `audit.md`, `meta.json`, and a thin `README.md` cover page so GitHub auto-renders the run.
- Customizable run-dir cover-page template at `templates/run-readme.md.template`.
- First dogfood eval at `reports/2026-05-06-budget-laptop-india-linux-dev/` (8 subagents, 136 sources, 58 claims, 2 synthesis iterations after critic verdict).
- `EVAL.md` in the dogfood run with framework friction findings + v0.1 hardening proposals.
- `SECURITY.md` documenting the trust model and constraints (no external APIs, no telemetry, no key collection).
- `CONTRIBUTING.md` with maintainer expectation-set and PR acceptance criteria.
- `.github/ISSUE_TEMPLATE/{bug,feature}.md`.
- `.github/workflows/lint.yml` — YAML frontmatter validation on agents, commands, and skills. Hardened: `pull_request` (not `_target`), `permissions: contents: read`, third-party action pinned by SHA.
- MIT LICENSE.

### Constraints (load-bearing)

- **No external API keys.** Native `WebSearch` and `WebFetch` only. No Tavily, Firecrawl, Exa, Perplexity, or MCP search servers.
- **No telemetry.** No outbound calls outside the search tools.
- **Reports are research output, not professional advice.** Each `synthesis.md` carries a disclaimer.

### Known limitations

See [`reports/2026-05-06-budget-laptop-india-linux-dev/EVAL.md`](reports/2026-05-06-budget-laptop-india-linux-dev/EVAL.md) for v0.1 hardening proposals (reconciler subagent, SKU/entity-lock prompt, auto-versioning of `synthesis.md` on revision, optional plugin manifest pending Anthropic's plugin spec stability).

[0.1.0]: https://github.com/agamarora/deep-research/releases/tag/v0.1.0
