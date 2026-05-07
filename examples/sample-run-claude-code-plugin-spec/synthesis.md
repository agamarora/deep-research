---
query: "Anthropic Claude Code plugin spec — current status, planned shape, ETA as of May 2026"
created: 2026-05-07
slug: anthropic-claude-code-plugin-spec-status
status: final
dispatch_mode: fallback
disclaimer: "Research output, not retail/professional recommendation. Sources scraped at run date; verify before acting."
---

# Anthropic Claude Code plugin spec — current status, planned shape, ETA (May 2026)

## TL;DR

*Note: dispatched via general-purpose fallback (subagent registry not loaded at session start; the Agent tool returned "not available inside subagents" for all 5 dr-subagent-researcher calls). The lead executed the five sub-questions sequentially using only WebSearch + WebFetch. Restart Claude Code for native isolated dispatch on future runs — output quality unaffected.*

- **Status**: Public beta since **October 9, 2025**. **No formal GA announcement** through May 7, 2026, despite production-grade treatment (auto-loaded official Anthropic marketplace, 30+ point releases in Q1 2026, ~36 curated plugins as of December 2025). [S1, S5, S8, S13]
- **No standalone "spec" RFC document exists.** The de-facto spec lives at the live docs pages `code.claude.com/docs/en/plugins-reference` (manifest, components, env vars, CLI) and `…/plugin-marketplaces` (distribution). The docs reference an unofficial JSON Schema URL via the `$schema` field example, but Claude Code "ignores this field at load time" — Anthropic has not yet committed to a versioned, machine-validated schema URL of its own. [S2, S4]
- **Shape**: A plugin is a self-contained directory with an optional `.claude-plugin/plugin.json`. If present, only `name` is required. Plugins bundle skills, commands, subagents, hooks, MCP servers, LSP servers, output styles, channels, plus experimental themes/monitors. Versioning falls back to git SHA when `version` is omitted. Two env vars (`${CLAUDE_PLUGIN_ROOT}` ephemeral, `${CLAUDE_PLUGIN_DATA}` persistent) are exposed to plugin code. [S2]
- **ETA / roadmap**: Anthropic has made **no public commitment to a GA date** or to publishing a formal versioned spec. The only on-the-record forward-looking statement remains the launch post: "plugins will be our standard way to bundle and share Claude Code customizations, and we'll continue to evolve the format as we add more extension points." [S1] Continuous incremental development is visible weekly through the docs `What's new` digest. [S5]
- **Security**: Plugins run with **the user's full privileges**; **no signing, no per-plugin sandbox**. Anthropic's own warning: *"Plugins and marketplaces are highly trusted components that can execute arbitrary code on your machine with your user privileges. Only install plugins and add marketplaces from sources you trust."* Defense-in-depth comes from the separately-configured permission system and the Oct-2025 OS-level sandbox (bubblewrap/seatbelt) — both are tool/Bash-layer, not plugin-layer. [S3, S6, S7]

---

## 1. Current status

The Claude Code plugin system was announced and shipped in **public beta on October 9, 2025** [S1]. As of May 7, 2026, that "public beta" framing has never been formally retired by Anthropic, but the system is operationally treated as production:

- Anthropic launched its **official `claude-plugins-official` marketplace by December 2025** with ~36 curated plugins covering language servers, third-party integrations, dev workflows, and output styles [S8, S13].
- That official marketplace is **auto-loaded on Claude Code startup** with auto-update enabled by default; only third-party marketplaces require manual `/plugin marketplace add` and have auto-update off by default [S3].
- The system has accumulated **30+ point releases (v2.1.69 → v2.1.119) through April 2026** [S17], with continuous plugin-tooling additions: zip plugin packaging, `/plugin tag` for release tags, auto-install of npm dependencies for plugins shipping `package.json` lockfiles, plugin executables auto-mounted on Bash `PATH`, and `experimental.themes` graduating to a usable component [S5].

**Net status: nominal public beta, de-facto production.**

## 2. Is there a formal "plugin spec" document?

**No.** No standalone RFC, versioned spec PDF, or schema-as-product has been published as of May 2026. What plays the role of a spec:

| Artifact | Role |
|---|---|
| `code.claude.com/docs/en/plugins-reference` | Authoritative `plugin.json` schema, env vars, CLI, component schemas [S2] |
| `code.claude.com/docs/en/plugin-marketplaces` | `marketplace.json` schema and distribution model [S4] |
| `code.claude.com/docs/en/discover-plugins` | Install flow, scope semantics, security posture [S3] |
| `hesreallyhim/claude-code-json-schema` (community) | Unofficial machine-readable JSON Schema for `plugin.json` and `marketplace.json` [S15] |

The docs explicitly reference `https://json.schemastore.org/claude-code-plugin-manifest.json` as a `$schema` example value but note that "Claude Code ignores this field at load time" [S2]. Anthropic has therefore not committed to a stable, versioned, machine-validated schema URL of its own — the docs page is the spec.

## 3. Planned shape — manifest, components, layout

### 3.1 Manifest (`.claude-plugin/plugin.json`) — optional

If present, only `name` is required. Documented fields [S2]:

**Metadata**: `$schema`, `version`, `description`, `author` (object: name/email/url), `homepage`, `repository`, `license`, `keywords`.

**Component-path overrides** (each replaces a default location): `skills`, `commands`, `agents`, `hooks`, `mcpServers`, `outputStyles`, `lspServers`, `experimental.themes`, `experimental.monitors`.

**User-facing**: `userConfig` (declares values prompted at enable-time, supports `sensitive: true`), `channels` (Telegram/Slack/Discord-style message-injection), `dependencies` (other plugins, optional semver constraints).

Verbatim minimal manifest [S2]:
```json
{ "name": "my-plugin" }
```

### 3.2 Directory layout

```
my-plugin/
├── .claude-plugin/plugin.json   # only file under .claude-plugin/
├── commands/                    # flat .md slash commands
├── agents/                      # subagents (markdown w/ frontmatter)
├── skills/<name>/SKILL.md       # skill directories
├── hooks/hooks.json             # lifecycle callbacks
├── output-styles/
├── themes/                      # experimental
├── monitors/monitors.json       # experimental
├── .mcp.json                    # MCP server bundle
└── .lsp.json                    # LSP server bundle
```

Components must live at the plugin root, not inside `.claude-plugin/` [S2].

### 3.3 Components a plugin can carry

Skills, commands, subagents, hooks, MCP servers, LSP servers, output styles, channels, themes (experimental), monitors (experimental) [S2, S3].

### 3.4 Versioning

Cache-key resolution order: `plugin.json.version` → marketplace entry's `version` → git commit SHA [S2]. Two regimes:
- **Explicit SemVer** — bump to ship updates. Recommended for stable releases.
- **Commit-SHA mode** (omit `version`) — every commit is a new version. Recommended for active development.

`dependencies` may pin other plugins by name + optional semver constraint (e.g., `"~2.1.0"`) [S2].

### 3.5 Environment exposed to plugin code

- `${CLAUDE_PLUGIN_ROOT}` — install dir; ephemeral; ~7-day grace on previous version's directory [S2].
- `${CLAUDE_PLUGIN_DATA}` — persistent across updates; intended for `node_modules`/venvs/caches [S2].

## 4. Distribution & marketplaces

The user-facing surface is the **`/plugin` slash command** (interactive UI with Discover/Installed/Marketplaces/Errors tabs) plus a `claude plugin …` CLI form for scripting [S3].

`/plugin marketplace add` accepts: GitHub `owner/repo`, full git URLs (with optional `#ref` for branch/tag), local paths, and remote `marketplace.json` URLs [S3].

**Installation scopes**: User (default), Project (`.claude/settings.json`), Local (this repo only), Managed (admin-set, immutable to end-user) [S3]. Team admins can pre-register marketplaces via `extraKnownMarketplaces` in project settings, with corporate `managed marketplace restrictions` to whitelist allowable sources [S3, S4].

**`/reload-plugins`** applies install/enable/disable changes mid-session without a full restart [S3].

**Marketplace ecosystem snapshot** (May 2026):

| Tier | Marketplace | Notes |
|---|---|---|
| Official Anthropic | `claude-plugins-official` | Auto-loaded; ~36 curated plugins (Dec 2025); split into `/plugins` (internal Anthropic) and `/external_plugins` (partners) [S8, S13] |
| Anthropic demo | `claude-code-plugins` (`anthropics/claude-code/plugins`) | Manual add; example plugins [S3] |
| Community | wshobson/agents (Seth Hobson, 80+ subagents); Dan Ávila's marketplace; Dev-GOM, davila7, davepoon, claudemarketplaces.com, buildwithclaude.com, claudepluginhub.com, aitmpl.com | Decentralized; not vetted by Anthropic [S1, S20] |

Submissions to the official marketplace go through `claude.ai/settings/plugins/submit` or `platform.claude.com/plugins/submit` [S3].

## 5. Security & permissions

Anthropic's stance, **verbatim from the docs** [S3]:

> "Plugins and marketplaces are highly trusted components that can execute arbitrary code on your machine with your user privileges. Only install plugins and add marketplaces from sources you trust."
>
> "Make sure you trust a plugin before installing it. Anthropic does not control what MCP servers, files, or other software are included in plugins and cannot verify that they work as intended."

What this means in practice:

- **No plugin signing**, no verified-publisher badges, no cryptographic provenance [S3, S8].
- **No per-plugin sandbox profile** declarable in `plugin.json`. Sandboxing exists but is project/user-configured at the Bash-tool layer, not author-declared [S6, S7].
- **The Oct 20, 2025 sandbox** (Linux bubblewrap, macOS seatbelt) reduces internal-usage permission prompts by 84%, applies to "Bash commands and their child processes," and "can be used to sandbox arbitrary processes, agents and MCP servers" — covering plugin hooks, MCP servers, LSP servers when invoked through Bash [S7].
- **Auto mode** (research preview, March 2026) [S5]: classifier handles permission prompts, blocking risky actions and silently approving safe ones. Affects plugin hook approval flow but is orthogonal to the plugin system.
- **Curation in the official marketplace is the only trust signal**. The internal vs `external_plugins` split exists in the repo but is not surfaced as a UI badge [S8].

The `userConfig` block supports `sensitive: true` for masked-prompt secret entry [S2]. Documentation does not specify encrypted-at-rest storage of those values.

## 6. Roadmap & ETA

| Question | Answer |
|---|---|
| Public GA date? | **Not announced.** No date in docs, blog, or release notes through May 7, 2026 [S1, S5, S9]. |
| "Public beta" label retired? | Not formally. Current docs pages drop the qualifier; the original Oct 2025 announcement remains the most authoritative status statement. |
| Formal RFC / spec document on the roadmap? | **No public commitment.** [S1, S2] |
| Will plugins be deprecated, renamed, or merged? | **No** — docs explicitly position plugins as the bundling envelope carrying Skills/Agents/MCP/LSP/etc. [S2] |
| Future expansion to Cowork? | Implied by `claude.com/plugins` slug ("Plugins for Claude Code and Cowork") but no detailed roadmap. [S10] |
| Stabilization of `experimental.*`? | Docs say "a future release will require `experimental.*`" — confirms intent to migrate, no date. [S2] |

The only on-the-record forward-looking commitment is the Oct 2025 launch line: *"plugins will be our standard way to bundle and share Claude Code customizations, and we'll continue to evolve the format as we add more extension points."* [S1]

### Recent (Q1-Q2 2026) plugin-relevant releases

Reconstructed from the weekly digest [S5]:

| Week | Date range | Plugin-relevant change |
|---|---|---|
| 13 | Mar 23-27 | Auto mode (research preview) |
| 14 | Mar 30 – Apr 3 | Plugin executables on Bash `PATH`; per-tool MCP result-size override up to 500K |
| 15 | Apr 6-10 | **Monitor tool** streams background events (pairs with `experimental.monitors`) |
| 16 | Apr 13-17 | Routines on Web; `/usage` |
| 17 | Apr 20-24 | **Custom themes from a plugin** (`experimental.themes`) |

## 7. Recommendation (decision-shaped framing)

If the question is **"can I build a plugin against the current spec and expect it to keep working?"**:

- ✅ **Yes for the stable surface** — `name`, `version`, the conventional `commands/`/`agents/`/`skills/`/`hooks/` directories, `.mcp.json`, the `/plugin` install commands. Backwards-compatible additions are the norm.
- ⚠️ **Caveat for `experimental.*`** — themes and monitors. Their schema may change between releases; Anthropic has stated `experimental.*` namespacing will become required in a future release.
- ⚠️ **Caveat for unsigned secrets** — treat `userConfig.*.sensitive: true` values as plaintext-on-disk by default; if the plugin handles high-value credentials, route them through env vars / OS keychain instead.
- ⚠️ **No GA guarantee** — if your release process requires standing on a "GA" milestone, you do not have one. The pragmatic substitute is "depend only on the documented (non-experimental) surface."

If the question is **"should I install a third-party plugin?"** — Anthropic's own answer [S3]: only from sources you trust. The platform offers no signing, no provenance, no sandbox-by-default. Pair with project-level sandboxing where the plugin's hooks/MCP servers will run.

## 8. Open questions / what would change the answer

1. **Will Anthropic publish a versioned, machine-validated JSON Schema** as a first-party artifact? The docs reference `json.schemastore.org/claude-code-plugin-manifest.json` but disclaim it. A first-party schema URL would let `plugin.json` be reliably linted in CI.
2. **GA flip-flop announcement**. Argument-from-absence: I directly fetched the weekly `What's new` digest through Apr 20-24, 2026 (Week 17) and found no GA entry [S5]. A late-April or early-May 2026 GA announcement that didn't surface in WebSearch would change this answer.
3. **Plugin signing / verified-publisher badges**. No public roadmap commitment as of May 2026.
4. **Cowork integration plan**. URL slug suggests scope expansion; no detail published yet.
5. **Encrypted-at-rest storage of `userConfig.sensitive: true` values** — not documented either way.

## Sources

See `sources.md` for the full deduped, tier-classified source list. Load-bearing T1 references:

- [S1] Anthropic blog — "Plugins for Claude Code", Oct 9, 2025 — https://claude.com/blog/claude-code-plugins
- [S2] Plugins reference — https://code.claude.com/docs/en/plugins-reference
- [S3] Discover and install plugins — https://code.claude.com/docs/en/discover-plugins
- [S4] Plugin marketplaces — https://code.claude.com/docs/en/plugin-marketplaces
- [S5] What's new — https://code.claude.com/docs/en/whats-new
- [S6] Configure permissions — https://code.claude.com/docs/en/permissions
- [S7] Anthropic engineering — Claude Code sandboxing, Oct 20, 2025 — https://www.anthropic.com/engineering/claude-code-sandboxing
- [S8] anthropics/claude-plugins-official — https://github.com/anthropics/claude-plugins-official
- [S10] claude.com/plugins — https://claude.com/plugins
