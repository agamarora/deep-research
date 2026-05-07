# Anthropic Claude Code plugin spec — current status, planned shape, ETA (May 2026)

**Query**: Anthropic Claude Code plugin spec — current status, planned shape, ETA as of May 2026
**Run date**: 2026-05-07
**Status**: final
**Dispatch mode**: fallback (Agent tool unavailable in this session; lead-only execution)

## TL;DR

- **Public beta since Oct 9, 2025**. **No GA announcement** through May 7, 2026, despite production-grade treatment (auto-loaded official Anthropic marketplace, ~36 curated plugins by Dec 2025, 30+ point releases in Q1 2026).
- **No standalone "spec" RFC** exists. The de-facto spec is the live docs at `code.claude.com/docs/en/plugins-reference` and `…/plugin-marketplaces`. Anthropic has not yet committed to a versioned, machine-validated first-party JSON Schema.
- **Shape**: self-contained directory with optional `.claude-plugin/plugin.json` (only `name` is required). Bundles skills, commands, subagents, hooks, MCP servers, LSP servers, output styles, channels, themes/monitors (experimental). Versioning via SemVer or git SHA.
- **No public ETA** for GA or for a formal spec document. The only on-the-record forward-looking commitment is the launch post: "plugins will be our standard way to bundle and share Claude Code customizations."
- **Security**: plugins run with **the user's full privileges**. **No signing, no per-plugin sandbox**. Defense-in-depth comes from the separately-configured permission system and the OS-level Bash sandbox (bubblewrap/seatbelt, Oct 2025).

For the full report, see [`synthesis.md`](./synthesis.md).

## Files in this run

| File | What it is |
|---|---|
| `README.md` | This cover page |
| `query.md` | Original query, verbatim |
| `plan.md` | Decomposition + research strategy |
| `notes/1-status-and-timeline.md` | Sub-question 1 research notes |
| `notes/2-manifest-and-shape.md` | Sub-question 2 research notes |
| `notes/3-distribution-and-marketplaces.md` | Sub-question 3 research notes |
| `notes/4-security-and-permissions.md` | Sub-question 4 research notes |
| `notes/5-roadmap-and-eta.md` | Sub-question 5 research notes |
| `claims.md` | Atomic claims with citation refs |
| `sources.md` | Deduped sources, tier-classified |
| `audit.md` | Self-critic pass (dr-critic substitute) |
| `synthesis.md` | **Final report** |
| `meta.json` | Run metadata |
