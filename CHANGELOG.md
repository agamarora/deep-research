# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project loosely follows [Semantic Versioning](https://semver.org/).

## Unreleased

### Fixed (v0.2.1 — autocomplete description rendering)

- **Marker injected after YAML frontmatter, not before.** Pre-v0.2.1 wrote `<!-- managed by deep-research ... -->` at the top of every managed file, which broke Claude Code's frontmatter parser. Result: slash-command and skill autocomplete showed the marker comment as the description (e.g., `/research <!-- managed by deep-research ... -->`) instead of the real description text. v0.2.1 detects YAML frontmatter and inserts the marker between the closing `---` and the body.
- **One-time migration**: `setup.mjs` now flags any pre-v0.2.1 install (marker positioned before frontmatter) as stale and upgrades it even when the body SHA is unchanged. `.bak` files are written for every migrated file. Re-run `git pull && node setup.mjs` to apply.

### Added (v0.2.1 — robustness: try-fallback dispatch wrapper)

- **Try-fallback wrapper around every `Agent` dispatch.** Claude Code's `subagent_type` enum is session-frozen — installing the framework mid-session registers the slash command and skill but not the `dr-*` subagents. Pre-v0.2.1 this surfaced as a raw `Agent type 'dr-lead-researcher' not found` error. Now: every dispatch checks the enum, and if the target `dr-*` agent isn't registered, falls back to `subagent_type: general-purpose` with the role definition (read from `~/.claude/agents/dr-<name>.md`, frontmatter stripped) prepended to the task prompt. Native path is preferred when available; fallback is functionally equivalent (general-purpose has every tool the `dr-*` agents need).
- **`dispatch_mode` field** in `meta.json` and `synthesis.md` frontmatter — `"native"` or `"fallback"` so runs are self-describing.
- **Soft notice in `synthesis.md` TL;DR** when fallback path was used: a one-line italic note recommending a restart for native dispatch on future runs. Output quality is unaffected.
- **Robustness side-effects**: also covers forked `dr-*` names, partial installs, registry quirks, and upgrades that introduce new agents the user's session predates.

### Changed (v0.2.1)

- **Install copy softened**: README and `setup.mjs` banner no longer instruct users to "open a new session". Now: "type `/research` immediately; restart for full-speed isolated dispatch — works either way." First-run UX is no longer paying for an architectural quirk.

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
