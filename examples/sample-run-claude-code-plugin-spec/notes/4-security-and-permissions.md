# 4 — Security, permissions & sandboxing

## Headline finding

**Plugins are explicitly treated as fully-trusted code** running with the user's full privileges. Anthropic's docs are blunt: "Plugins and marketplaces are highly trusted components that can execute arbitrary code on your machine with your user privileges. Only install plugins and add marketplaces from sources you trust" [S1]. There is **no plugin-specific sandbox or signing system** as of May 2026. The defenses Claude Code does provide — the **permission system** (allow/ask rules per tool) and the **OS-level sandbox** introduced October 2025 — operate at the tool/Bash layer, not at a per-plugin layer [S2][S3].

## Trust model

Plugins inherit the trust model of any code the user installs locally. When Claude Code runs hooks, MCP servers, or LSP servers shipped in a plugin, those processes run with **the user's full OS privileges**: filesystem access, network access, environment variables, the lot [S1]. Anthropic explicitly disclaims warranty of plugin behavior: "Anthropic does not control what MCP servers, files, or other software are included in plugins and cannot verify that they work as intended" [S1][S4].

This is the same trust posture as `npm install` or `cargo install`: a plugin is treated as conventional installable software, not as a confined extension.

## Permission prompts

Claude Code's permission system is **separate from** and **layered with** the plugin system [S2][S3]:

- **Allow rules** — let Claude Code use a tool without manual approval [S2].
- **Ask rules** — prompt for confirmation each time [S2].
- Permission rules apply to **tools** (Bash, Edit, Write, MCP tool calls). When a plugin's hook fires a Bash command, Bash permission rules apply; when Claude calls an MCP tool from a plugin's bundled server, MCP permission rules apply [S2].
- Permission rules **do not get evaluated at plugin install time** — installation runs whatever lifecycle the plugin source dictates (e.g., npm `package.json` lockfile dependency install for plugins that ship one was added in Q1 2026 — these run before any permission gate) [S5].

## Sandboxing — what it actually covers

In **October 20, 2025**, Anthropic shipped sandboxing in Claude Code [S3]:

- **OS primitives**: Linux **bubblewrap**, macOS **seatbelt** [S3].
- **Two isolation axes**: filesystem (Claude can only access pre-approved directories) and network (only approved hosts) [S3].
- **Stat**: "In our internal usage, we've found that sandboxing safely reduces permission prompts by 84%" [S3].
- **Scope**: "applies only to Bash commands and their child processes" — meaning plugin hooks (which run shell) and MCP servers/LSP servers (which run as subprocesses of Bash-spawned processes) **can be brought under the sandbox** [S2][S3].
- **Engineering blog wording**: the sandbox "can be used to sandbox arbitrary processes, agents and MCP servers" [S3].

**Critical caveat**: sandboxing is **a separate, opt-in security layer that the user/admin configures**, not something automatically applied to every plugin. The default behavior outside sandboxed projects is the unrestricted permission-prompt model [S2][S3]. The two layers serve different purposes: permissions gate which tools may run; sandboxing constrains what those tools can touch when they do run [S2].

## Auto mode (March 2026)

A March 23-27, 2026 release introduced **Auto mode** in research preview: a classifier handles permission prompts so safe actions run silently and risky ones get blocked — a "middle ground between approving everything and `--dangerously-skip-permissions`" [S5]. Auto mode is orthogonal to the plugin system but governs what happens when a plugin hook or MCP call fires.

## Secret handling

The manifest provides a `userConfig` block where each value can declare `"sensitive": true`, intended for things like API tokens [S6]:

```json
"userConfig": {
  "api_token": {
    "type": "string",
    "title": "API token",
    "sensitive": true
  }
}
```

The docs use this to describe **how plugins prompt for secrets at enable-time** rather than requiring users to hand-edit `settings.json`. Documentation reviewed in this run does not commit to encrypted-at-rest storage of `sensitive: true` values; it only specifies UX (mask the input). Plugins that require secrets via env vars instead are also a common pattern (see official `github`, `slack`, `sentry` plugins which expect tokens in env). **Treat plugin secrets as plaintext-on-disk by default** until/unless a future docs revision says otherwise.

## Verification & signing

- **No plugin signing** is currently documented [S1][S4][S6].
- **Curation is the only trust signal**: inclusion in `claude-plugins-official` (the Anthropic-managed marketplace) is the closest thing to a verified-publisher tier; submission goes through `claude.ai/settings/plugins/submit` or `platform.claude.com/plugins/submit` [S1]. The repo splits internal Anthropic plugins (`/plugins`) from partner ones (`/external_plugins`), but this distinction is not surfaced as a badge in the `/plugin` UI.
- **Managed marketplace restrictions** let organizations whitelist which marketplaces users may add — a coarse-grained corporate control, not a cryptographic trust mechanism [S1][S4].

## Code-execution risk surface

| Surface | Risk | Mitigation |
|---|---|---|
| Hooks (`hooks/hooks.json`) | Run arbitrary shell on lifecycle events (`PreToolUse`, etc.) — fires automatically | Sandbox if configured; otherwise none |
| MCP servers (`.mcp.json`) | Long-running subprocesses with ambient access | Sandbox; per-tool permission rules on MCP tool calls |
| LSP servers (`.lsp.json`) | Subprocesses; some LSPs (like rust-analyzer) execute build scripts | Sandbox |
| Skills/Commands/Agents (markdown only) | Prompt-injection risk only — no direct code execution | Permission system on the tools the agent invokes |
| `package.json` auto-install (Q1 2026 feature) | Runs npm install on update with whatever the plugin's lockfile resolves to | None documented; relies on user trust |

## Known incidents / CVEs

No public CVE or named incident specific to the Claude Code plugin system was surfaced in this round of research. The October 2025 sandboxing post explicitly motivates itself by **prompt-injection** risk: "even a successful prompt injection is fully isolated" [S3]. That framing — defending against compromised agents, not malicious plugin authors — confirms that **plugin-author trust is treated as a user responsibility**, not a platform guarantee.

## Open questions

- **Encrypted-at-rest storage for `sensitive: true` userConfig values** — not documented; recommend treating as plaintext.
- **Plugin signing or content-hashing roadmap** — no public commitment.
- **Will Auto-mode classifier learn plugin-specific signals** (e.g., distrust unsandboxed third-party plugin hooks more aggressively)? Open.
- **CVE/incident disclosure channel** — Anthropic's general security disclosure page applies, but no plugin-specific bug-bounty scope was surfaced.

## Sources

1. [S1] Anthropic Claude Code docs — "Discover and install prebuilt plugins" (Security section) — T1.
   https://code.claude.com/docs/en/discover-plugins
2. [S2] Anthropic Claude Code docs — "Configure permissions" — T1.
   https://code.claude.com/docs/en/permissions
3. [S3] Anthropic engineering — "Claude Code sandboxing — making Claude Code more secure and autonomous" — Oct 20, 2025 — T1.
   https://www.anthropic.com/engineering/claude-code-sandboxing
4. [S4] GitHub — `anthropics/claude-plugins-official` README — T1.
   https://github.com/anthropics/claude-plugins-official
5. [S5] Anthropic Claude Code docs — "What's new" Weeks 13-17 (2026) — T1.
   https://code.claude.com/docs/en/whats-new
6. [S6] Anthropic Claude Code docs — "Plugins reference" — T1.
   https://code.claude.com/docs/en/plugins-reference
