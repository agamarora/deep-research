# 1 — Status & timeline

## Headline finding

Anthropic's Claude Code plugin system **launched in public beta on October 9, 2025** as the official, repo-owned way to bundle and share Claude Code customizations [S1][S2]. As of May 2026 there is **no separate "spec" RFC document** — the canonical specification is the live documentation at `code.claude.com/docs/en/plugins-reference`, which functions as the de-facto spec [S3]. The system is **still labeled "public beta"** in the original announcement language, but in practice it is treated as an established, actively-evolving feature: an Anthropic-managed official marketplace shipped in December 2025 with 36 curated plugins [S4][S5], the surrounding tooling has matured through ~30+ point releases in Q1-Q2 2026 [S6], and Anthropic has stated that "plugins will be our standard way to bundle and share Claude Code customizations" going forward [S2].

## Timeline

- **Oct 9, 2025** — Public-beta launch via Anthropic news/blog post "Plugins for Claude Code" (later redirected from anthropic.com/news to claude.com/blog). Announcement names the `/plugin` command, the four bundleable component types at launch (commands, subagents, MCP servers, hooks), and highlights community marketplaces from Dan Ávila and Seth Hobson (wshobson) [S2].
- **Oct 20, 2025** — Anthropic engineering blog post "Claude Code sandboxing — making Claude Code more secure and autonomous" introduces OS-level sandboxing (Linux bubblewrap / macOS seatbelt) as a separate security layer that can isolate "arbitrary processes, agents and MCP servers" — including those introduced by plugins [S7].
- **Dec 2025** — Anthropic ships its **official Anthropic-managed marketplace** at `github.com/anthropics/claude-plugins-official`, with ~36 plugins across categories (code intelligence/LSP, external integrations, dev workflows, output styles) [S4][S5]. The marketplace becomes auto-available — Claude Code now adds `claude-plugins-official` automatically on startup with auto-update on by default [S3].
- **Q1 2026** — Plugin tooling hardens: `--plugin-dir` accepts `.zip` archives, `/plugin tag` adds a release-tag command, marketplace plugins with `package.json` and lockfiles auto-install dependencies on install/update [S6][S8].
- **Mar 30 – Apr 3, 2026 (Week 14)** — Plugin executables added to the Bash tool's `PATH` automatically [S6].
- **Apr 20-24, 2026 (Week 17)** — Custom themes can now be shipped from a plugin via `experimental.themes` [S6].
- **May 7, 2026 (cutoff)** — System remains in active development. No public GA flag-flip announcement has been made; **plugins continue to be referred to as in "public beta" in the original announcement copy**, even as the surrounding ecosystem (9,000+ third-party plugins by April 2026 per third-party survey [S9]) operates as a production feature.

## Current status

**Public beta, with production-grade tooling and an Anthropic-curated official marketplace.** Anthropic has not flipped a "general availability" switch nor published a stand-alone versioned spec document. Instead, the plugin system is treated as a stable but still-expanding extension surface — new component types (LSP servers, monitors, channels) and new manifest fields are added in a backwards-compatible fashion, with the docs page at `/plugins-reference` carrying the authoritative schema. The `experimental.*` namespace is used for fields that may still change shape (themes, monitors), giving Anthropic a release valve without breaking existing plugins [S3].

A signal that plugins are now first-class: the **official `claude-plugins-official` marketplace is auto-loaded** when Claude Code starts (third-party marketplaces require manual `/plugin marketplace add`), and **auto-update is on by default for it** [S3]. That treatment is inconsistent with a "preview" feature.

## Is there a formal "spec" document?

**No standalone RFC or versioned spec document exists** as of May 2026. What plays the role of a spec:

1. **`code.claude.com/docs/en/plugins-reference`** — the technical reference, including the complete `plugin.json` manifest schema, directory layout rules, environment variables, CLI commands, and component schemas [S3].
2. **`code.claude.com/docs/en/plugin-marketplaces`** — the marketplace.json schema and distribution model [S10].
3. **Unofficial JSON Schema** — `hesreallyhim/claude-code-json-schema` on GitHub provides a community-maintained machine-readable schema for `plugin.json` and `marketplace.json`, sourced via `$schema: "https://json.schemastore.org/claude-code-plugin-manifest.json"` referenced in Anthropic's own docs [S11][S3].

Anthropic does point at `json.schemastore.org/claude-code-plugin-manifest.json` from its docs (the `$schema` field example) but the docs note that "Claude Code ignores this field at load time" — confirming Anthropic has not yet committed to a versioned, machine-validated schema URL of its own [S3].

## Distinguishing plugins from adjacent concepts

- **Plugins** = bundling envelope (the unit of distribution).
- **Skills** = a component type a plugin can carry (`SKILL.md` directories under `skills/`); also usable standalone outside any plugin.
- **Subagents** = another component type (`agents/*.md`); also usable standalone.
- **Hooks** = lifecycle callbacks (`hooks/hooks.json`); also usable standalone.
- **MCP servers** = pre-configured Model Context Protocol server definitions (`.mcp.json`); pre-existing concept, plugins simply bundle them.
- **LSP servers** = added later (component type for code-intelligence integrations).
- **Monitors / Themes** = currently `experimental.*` component types.

The plugin manifest is the **container**. Skills, subagents, hooks, MCP servers etc. all exist as standalone Claude Code primitives too, but plugins are the standard packaging format [S2][S3].

## Open questions / where evidence was thin

- **Will Anthropic publish a versioned, GA-stamped spec document, and on what timeline?** No public commitment found.
- **Exact plugin count in the official marketplace** — December 2025 source says 36 [S4]; current count not retrieved (the `claude-plugins-official` repo splits internal vs `external_plugins` directories and does not display a single count).
- **Whether "public beta" framing has been formally retired** anywhere on Anthropic-owned surfaces. The `discover-plugins` doc page describes the system in plain present tense without "beta" qualifiers, but the original Oct 2025 announcement is still the most authoritative status statement [S2][S3].

## Sources

1. [S1] startuphub.ai — "Anthropic's Claude Code plugins open the floodgates", Oct 2025 — T2.
   https://www.startuphub.ai/ai-news/ai-research/2025/anthropics-claude-code-plugins-open-the-floodgates/
2. [S2] Anthropic blog — "Plugins for Claude Code" (originally anthropic.com/news/claude-code-plugins, redirected to claude.com/blog/claude-code-plugins) — Oct 9, 2025 — T1.
   https://claude.com/blog/claude-code-plugins
3. [S3] Anthropic Claude Code docs — "Plugins reference" — fetched May 2026 — T1.
   https://code.claude.com/docs/en/plugins-reference
4. [S4] Pete Gypps Consultancy — "Claude Code Official Plugin Marketplace: Complete Guide to 36 Plugins" — Dec 2025 — T2.
   https://www.petegypps.uk/blog/claude-code-official-plugin-marketplace-complete-guide-36-plugins-december-2025
5. [S5] GitHub — `anthropics/claude-plugins-official` — T1.
   https://github.com/anthropics/claude-plugins-official
6. [S6] Anthropic Claude Code docs — "What's new" weekly digest (Weeks 13-17, 2026) — T1.
   https://code.claude.com/docs/en/whats-new
7. [S7] Anthropic engineering — "Claude Code sandboxing" — Oct 20, 2025 — T1.
   https://www.anthropic.com/engineering/claude-code-sandboxing
8. [S8] apiyi.com — "Decoding the Claude Code April 2026 Changelog" — Apr 2026 — T3 (used only for triangulating S6).
   https://help.apiyi.com/en/claude-code-changelog-2026-april-updates-en.html
9. [S9] Redwerk — "7 Best Claude Code Plugins Every Developer Should Install in 2026" — 2026 — T3 (cited for ecosystem-size signal only).
   https://redwerk.com/blog/best-claude-code-plugins/
10. [S10] Anthropic Claude Code docs — "Plugin marketplaces" — T1.
    https://code.claude.com/docs/en/plugin-marketplaces
11. [S11] GitHub — `hesreallyhim/claude-code-json-schema` (unofficial) — T3.
    https://github.com/hesreallyhim/claude-code-json-schema
