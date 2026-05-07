# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project loosely follows [Semantic Versioning](https://semver.org/).

## Unreleased

### Changed (v0.2.0 — distribution overhaul)

- **One-paste install** — `git clone ... ~/.claude/skills/deep-research && node setup.mjs` puts the framework in your global Claude Code config; `/research` works in every project.
- **Node.js installer** (`setup.mjs`) — true OS-agnostic, leverages Claude Code's existing Node requirement. No Bash/PowerShell variants. No Git-Bash assumption on Windows.
- **Marker-aware copy** — every managed file carries `<!-- managed by deep-research v<commit> sha:<hash> -->` so re-runs skip current files, back up edits before overwriting (`.bak`), and refuse to clobber unmarked files unless `--force`.
- **Agent rename**: `lead-researcher` → `dr-lead-researcher`, `subagent-researcher` → `dr-subagent-researcher`, `critic` → `dr-critic`, `citation-checker` → `dr-citation-checker`. Generic names collide with other skill packs; the `dr-` prefix keeps deep-research isolated.
- **Uninstall script** — `bin/deep-research-uninstall.mjs` removes only marker-tagged files; foreign files left alone unless `--force`.
- **Upgrade path documented** — `cd ~/.claude/skills/deep-research && git pull && node setup.mjs`. Auto-update deferred to v0.3.

### Deferred to v0.3

- Auto-update on session start (was speculative — Claude Code doesn't reliably execute slash-command preambles).
- Team mode (`bin/deep-research-team-init`) — vendoring framework into shared repos. v1 ships solo install only.
- `reports/` path config (was v0.1 roadmap; pushed for v0.3 alongside team mode).

### Added (v0.1)

- **Multi-agent deep-research framework** for Claude Code, native search only.
- 4 file-based subagents in `.claude/agents/`:
  - `dr-lead-researcher.md` (Opus orchestrator) — plans, decomposes, dispatches parallel subagents, synthesizes, runs critic + citation passes.
  - `dr-subagent-researcher.md` (Sonnet) — parallel worker for individual sub-questions.
  - `dr-critic.md` (Sonnet) — adversarial review of draft synthesis.
  - `dr-citation-checker.md` (Haiku) — claim → source verification.
- 1 entry slash command at `.claude/commands/research.md` (`/research <query>`).
- 1 skill at `.claude/skills/deep-research/SKILL.md` documenting workflow + scaling rules + Anthropic's 8 prompt-engineering principles.
- Output convention: `reports/<YYYY-MM-DD>-<slug>/` with `query.md`, `plan.md`, `notes/`, `sources.md`, `claims.md`, `synthesis.md`, `audit.md`, `meta.json`, and a thin `README.md` cover page so GitHub auto-renders the run.
- Customizable run-dir cover-page template at `templates/run-readme.md.template`.
- `SECURITY.md` documenting the trust model and constraints (no external APIs, no telemetry, no key collection).
- `CONTRIBUTING.md` with maintainer expectation-set and PR acceptance criteria.
- `.github/ISSUE_TEMPLATE/{bug,feature}.md`.
- `.github/workflows/lint.yml` — YAML frontmatter validation on agents, commands, and skills. Hardened: `pull_request` (not `_target`), `permissions: contents: read`, third-party action pinned by SHA.
- MIT LICENSE.
- `reports/` gitignored by default — users decide whether to track in their own projects.

### Constraints (load-bearing)

- **No external API keys.** Native `WebSearch` and `WebFetch` only. No Tavily, Firecrawl, Exa, Perplexity, or MCP search servers.
- **No telemetry.** No outbound calls outside the search tools.
- **Reports are research output, not professional advice.** Each `synthesis.md` carries a disclaimer.

### Known limitations

v0.1 hardening planned: reconciler subagent, SKU/entity-lock prompt, auto-versioning of `synthesis.md` on revision, optional plugin manifest pending Anthropic's plugin spec stability. First tagged release will follow once a clean dogfood eval has been recorded.
