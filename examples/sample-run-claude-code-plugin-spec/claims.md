# Atomic claims

All claims trace to entries in `sources.md`.

## Status & timeline

- **C1**. The Claude Code plugin system was announced and shipped in **public beta on October 9, 2025**. [S1, S12]
- **C2**. As of May 7, 2026, **no GA announcement** has been made on Anthropic-owned surfaces. [S1, S5, S9, S10]
- **C3**. The original announcement promised that "plugins will be our standard way to bundle and share Claude Code customizations, and we'll continue to evolve the format as we add more extension points." [S1]
- **C4**. **No standalone RFC/spec document** exists; the live docs at `code.claude.com/docs/en/plugins-reference` and `…/plugin-marketplaces` serve as the de-facto spec. [S2, S4]
- **C5**. The `$schema` example in Anthropic's docs points at `https://json.schemastore.org/claude-code-plugin-manifest.json` but Claude Code "ignores this field at load time" — Anthropic has not yet committed to a versioned, machine-validated schema URL of its own. [S2]
- **C6**. Anthropic launched the **official `claude-plugins-official` marketplace by December 2025 with ~36 curated plugins**. [S8, S13]
- **C7**. The official marketplace is **auto-loaded on Claude Code startup**, with **auto-update enabled by default**; third-party marketplaces are off by default. [S3]

## Manifest & technical shape

- **C8**. A plugin is a **self-contained directory**; the manifest lives at `.claude-plugin/plugin.json` and is **optional**. [S2]
- **C9**. If the manifest is present, only `name` is required. [S2]
- **C10**. Documented manifest fields include: `$schema`, `version`, `description`, `author`, `homepage`, `repository`, `license`, `keywords`, `skills`, `commands`, `agents`, `hooks`, `mcpServers`, `outputStyles`, `lspServers`, `experimental.themes`, `experimental.monitors`, `userConfig`, `channels`, `dependencies`. [S2]
- **C11**. A plugin can bundle: **skills, commands, agents (subagents), hooks, MCP servers, LSP servers, output styles, channels, themes (experimental), monitors (experimental)**. [S2]
- **C12**. Version resolution order for cache key is: `plugin.json.version` → marketplace entry's `version` → git commit SHA. Omitting `version` means every commit is a new version. [S2]
- **C13**. Two environment variables are exposed: `${CLAUDE_PLUGIN_ROOT}` (ephemeral, install dir, ~7-day grace on the previous version's directory) and `${CLAUDE_PLUGIN_DATA}` (persistent across updates, intended for `node_modules` / venvs / caches). [S2]
- **C14**. `experimental.*` namespace warns that schema may change between releases; "a future release will require `experimental.*`". [S2]
- **C15**. `userConfig.*.sensitive: true` masks the prompt for secret values; documentation does not specify encrypted-at-rest storage. [S2]

## Distribution & marketplaces

- **C16**. The user-facing surface is the **`/plugin` slash command** (interactive, with Discover/Installed/Marketplaces/Errors tabs) and a `claude plugin …` CLI form for scripting. [S3]
- **C17**. `/plugin marketplace add <source>` accepts: GitHub `owner/repo`, full git URLs (with optional `#ref`), local paths, and remote `marketplace.json` URLs. [S3]
- **C18**. Plugins install with `/plugin install <name>@<marketplace>`; the namespacing is critical because the same plugin name can exist in multiple marketplaces. [S3]
- **C19**. Installation **scopes** are User (default), Project (`.claude/settings.json`), Local (this repo only), Managed (admin-set, immutable to user). [S3]
- **C20**. `/reload-plugins` applies install/enable/disable changes mid-session without a full restart. [S3]
- **C21**. Auto-update is configurable per-marketplace, on by default for official Anthropic marketplaces; `DISABLE_AUTOUPDATER=1` and `FORCE_AUTOUPDATE_PLUGINS=1` env vars control global behavior. [S3]
- **C22**. Submissions to the official marketplace go through `claude.ai/settings/plugins/submit` or `platform.claude.com/plugins/submit`. [S3]
- **C23**. The official repo splits **internal Anthropic plugins (`/plugins`) from partner ones (`/external_plugins`)**; the distinction is not surfaced as a badge in the UI. [S8]

## Security & sandboxing

- **C24**. Anthropic's docs explicitly state plugins are **trusted code**: "Plugins and marketplaces are highly trusted components that can execute arbitrary code on your machine with your user privileges." [S3]
- **C25**. **No plugin signing / verified-publisher / cryptographic-trust mechanism** exists as of May 2026. [S3, S8]
- **C26**. Claude Code's **permission system** (Allow/Ask rules per tool) and the **OS-level sandbox** (Linux bubblewrap, macOS seatbelt, shipped Oct 20, 2025) operate at the tool/Bash layer, not at a per-plugin layer. [S6, S7]
- **C27**. Sandboxing applies to "Bash commands and their child processes" and "can be used to sandbox arbitrary processes, agents and MCP servers" — covering plugin hooks, MCP servers, LSP servers when they run as Bash-spawned processes. [S6, S7]
- **C28**. Internal usage shows sandboxing reduces permission prompts by 84%. [S7]
- **C29**. Sandboxing is **opt-in / configured per-project**, not automatically applied to every plugin. [S6, S7]
- **C30**. **Auto mode** (research preview, March 2026) introduces a classifier that handles permission prompts — a middle ground between approving everything and `--dangerously-skip-permissions`. Affects plugin hook approval but is orthogonal to the plugin system. [S5]
- **C31**. Anthropic-curated inclusion in `claude-plugins-official` is **the only trust signal** (no badges, no signing). [S3, S8]
- **C32**. Organizations can use **managed marketplace restrictions** to whitelist marketplaces — coarse corporate control, not cryptographic. [S4]

## Roadmap & ecosystem

- **C33**. The plugin envelope **contains, does not compete with**, Skills/Agents/MCP — these are component types a plugin bundles. [S2, S11]
- **C34**. Q1-Q2 2026 plugin-relevant features include: zip plugin support, `/plugin tag`, auto npm-dependency install for plugins shipping `package.json` lockfiles, plugin executables on Bash `PATH`, custom themes from a plugin (Week 17), Auto mode permission classifier (Week 13). [S5]
- **C35**. By April 2026, **9,000+ plugins exist across all marketplaces** with ~100 deemed production-ready (third-party survey — directional only). [S18]
- **C36**. The launch announcement named **Dan Ávila** (DevOps/docs/PM/testing marketplace) and **Seth Hobson / wshobson** (80+ specialized subagents) as ecosystem partners. [S1]
- **C37**. The official marketplace categorizes plugins as: **code intelligence (LSPs for 11 languages), external integrations (GitHub, GitLab, Atlassian, Asana, Linear, Notion, Figma, Vercel, Firebase, Supabase, Slack, Sentry), development workflows (commit-commands, pr-review-toolkit, agent-sdk-dev, plugin-dev), output styles (explanatory, learning)**. [S3]
- **C38**. The `claude.com/plugins` landing page positions plugins as serving both **Claude Code and Cowork** — implying future expansion to the Cowork product. [S10]

## Disagreements / contradictions

- **D1**. Status framing — "public beta" (per launch announcement [S1]) vs "established / production" (current docs [S2, S3] use neutral present tense; auto-loaded official marketplace [S3] and 30+ point releases in Q1 2026 alone [S5, S17] suggest production-grade treatment). **Resolution**: report as "still nominally public beta, with no GA flip; in practice operating as production." This is not a factual contradiction but a label/practice gap.
- **D2**. Plugin count — third-party "9,000+" claim [S18] vs Anthropic-curated ~36 [S13]. **Resolution**: distinguish between **all marketplaces (third-party survey: 9k+, treat as directional only)** vs **Anthropic-curated official marketplace (~36 in Dec 2025; latest count not retrieved)**. Not contradictory once disaggregated.
