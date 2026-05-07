# 3 — Distribution & marketplaces

## Headline finding

Plugin distribution is **decentralized and git-first**: any git repository (or local path, or a hosted `marketplace.json` URL) can be a marketplace [S1]. Anthropic operates **one official marketplace** — `claude-plugins-official`, auto-loaded into every Claude Code session — but does not gatekeep distribution; third-party marketplaces are first-class [S1][S2]. The user-facing surface is the `/plugin` slash command (with subcommands for marketplace and plugin management) plus a `claude plugin ...` CLI variant for scripting [S1].

## `/plugin` command surface

The `/plugin` interactive UI has four tabs (Tab/Shift-Tab to cycle): **Discover**, **Installed**, **Marketplaces**, **Errors** [S1].

### Marketplace subcommands

| Command | Action |
|---|---|
| `/plugin marketplace add <source>` | Register a marketplace catalog. Source = `owner/repo`, full git URL (with optional `#ref` for branch/tag), local path, or remote `marketplace.json` URL [S1] |
| `/plugin marketplace list` | List configured marketplaces [S1] |
| `/plugin marketplace update <name>` | Refresh listings [S1] |
| `/plugin marketplace remove <name>` | Uninstall the marketplace (also uninstalls plugins from it) [S1] |
| `/plugin market …` | Shorthand for `marketplace`; `rm` aliases `remove` [S1] |

### Plugin-management subcommands

| Command | Action |
|---|---|
| `/plugin install <name>@<marketplace>` | Install (default scope: user) [S1] |
| `/plugin disable <name>@<marketplace>` | Disable without uninstalling [S1] |
| `/plugin enable <name>@<marketplace>` | Re-enable [S1] |
| `/plugin uninstall <name>@<marketplace>` | Remove (with `--keep-data` to preserve `${CLAUDE_PLUGIN_DATA}`) [S3] |
| `/reload-plugins` | Apply install/enable/disable changes mid-session [S1] |
| `/plugin tag` | (Author-side) create a release git tag from inside a plugin's folder [S3] |
| `/plugin validate` (or `claude plugin validate`) | Validate `plugin.json`, hook/agent/command frontmatter [S3] |

### CLI form

`claude plugin install <name>@<marketplace> --scope project` — same actions, scriptable, with `--scope user|project|local` [S1]. Project scope writes to `.claude/settings.json` so collaborators inherit the plugin set [S1].

## Marketplace manifest (`.claude-plugin/marketplace.json`)

`marketplace.json` is the catalog file every marketplace must publish under `.claude-plugin/marketplace.json` (or a hosted URL pointing at the JSON). It declares plugins, their sources, and optional version pins. Source types include git references (with branch/tag), relative paths within the marketplace repo, and external git URLs [S4]. Anthropic's own `anthropics/claude-plugins-official` repo is the canonical example, with internal plugins under `/plugins` and partner-contributed ones under `/external_plugins` [S2].

## Installation flow (end-to-end)

1. **Add a marketplace** — `/plugin marketplace add anthropics/claude-code` (note: `claude-plugins-official` is auto-added on startup) [S1].
2. **Discover** — Run `/plugin`, cycle to **Discover** tab, browse [S1].
3. **Install** — Pick a plugin, choose scope (User / Project / Local / Managed), install [S1]. Or skip the UI: `/plugin install commit-commands@anthropics-claude-code` [S1].
4. **Activate** — `/reload-plugins` (no full restart needed) [S1].
5. **Use** — Plugin components are namespaced: e.g., `/commit-commands:commit` for a skill in the `commit-commands` plugin [S1].

## Update / pin semantics

- **Auto-update** is per-marketplace; **on by default for official Anthropic marketplaces**, off by default for third-party/local-dev [S1].
- Toggle via `/plugin` → Marketplaces → Enable/Disable auto-update [S1].
- Global kill-switch: `DISABLE_AUTOUPDATER=1` env var disables Claude Code + plugin auto-updates entirely [S1].
- To keep plugin updates while disabling Claude Code's own self-update, also set `FORCE_AUTOUPDATE_PLUGINS=1` [S1].
- **Version resolution** for cache invalidation: `plugin.json.version` → `marketplace.json` entry version → git SHA [S3].
- **Update command**: `/plugin update <name>@<marketplace>` (and `claude plugin update`) — skips no-op if version matches cache [S3].

## Installation scopes

| Scope | Where it persists | Use case |
|---|---|---|
| **User** (default) | User config | Personal workflows across all projects [S1] |
| **Project** | `.claude/settings.json` | Team-shared, version-controlled [S1] |
| **Local** | Repo-only, not shared | Personal use in this repo only [S1] |
| **Managed** | Set by org admin via managed settings; cannot be modified by end-user [S1] |

Team admins can pre-register marketplaces by adding `extraKnownMarketplaces` to `.claude/settings.json`; when team members trust the repo folder, Claude Code prompts them to install [S1]:

```json
{
  "extraKnownMarketplaces": {
    "my-team-tools": {
      "source": { "source": "github", "repo": "your-org/claude-plugins" }
    }
  }
}
```

Organizations can also use **managed marketplace restrictions** to constrain which marketplaces users may add [S1][S4].

## First-party vs third-party marketplaces

| Marketplace | Slug | Tier | Notes |
|---|---|---|---|
| Official Anthropic | `claude-plugins-official` | T1 first-party | Auto-loaded on Claude Code startup; auto-update on by default; ~36 curated plugins as of Dec 2025 (LSPs, integrations, dev workflows, output styles) [S2][S5][S6] |
| Anthropic demo | `claude-code-plugins` (`anthropics/claude-code` repo `/plugins` subdir) | T1 first-party | Manual `add`; demo/example plugins to show what's possible [S1] |
| wshobson/agents | community | T3 third-party | Seth Hobson's curated 80+ subagents; cited in launch announcement [S7] |
| Dan Ávila's marketplace | community | T3 third-party | DevOps/docs/PM/testing plugins; cited in launch announcement [S7] |
| davila7/claude-code-templates, davepoon/claude-code-marketplace, Dev-GOM/claude-code-marketplace, claudemarketplaces.com, buildwithclaude.com | community | T3 third-party | Discovery aggregators / individual marketplaces — surfaced in search results but not endorsed by Anthropic [S8] |

Submissions to the official marketplace go through in-app forms at `claude.ai/settings/plugins/submit` or `platform.claude.com/plugins/submit` — Anthropic curates inclusion [S1].

## Notable distribution capabilities (2026 additions)

- **Zip plugin support** — `--plugin-dir` accepts `.zip` archives [S5].
- **Auto dependency install** — marketplace plugins with a `package.json` and lockfile auto-install npm deps on install/update [S5].
- **`/plugin tag`** — author-side helper to create release tags from inside a plugin folder [S3].
- **Plugin executables on Bash `PATH`** — Week 14 (Mar 30 – Apr 3, 2026) update added bundled plugin binaries to the Bash tool's PATH automatically [S6].

## Open questions

- No public Anthropic statement on **whether the official marketplace will ever charge** or introduce paid tiers; current model is free + open submission.
- **No formal trust labels** in the catalog (e.g., "Anthropic-verified" badge) — curation is binary (in the official marketplace or not).
- **No SBOM / provenance metadata** appears to be required of submitted plugins as of May 2026.

## Sources

1. [S1] Anthropic Claude Code docs — "Discover and install prebuilt plugins through marketplaces" — T1.
   https://code.claude.com/docs/en/discover-plugins
2. [S2] GitHub — `anthropics/claude-plugins-official` — T1.
   https://github.com/anthropics/claude-plugins-official
3. [S3] Anthropic Claude Code docs — "Plugins reference" — T1.
   https://code.claude.com/docs/en/plugins-reference
4. [S4] Anthropic Claude Code docs — "Plugin marketplaces" (create/distribute) — T1.
   https://code.claude.com/docs/en/plugin-marketplaces
5. [S5] Anthropic Claude Code docs — "What's new" digest, Q1-Q2 2026 — T1.
   https://code.claude.com/docs/en/whats-new
6. [S6] Pete Gypps Consultancy — "36 plugins guide" — Dec 2025 — T2.
   https://www.petegypps.uk/blog/claude-code-official-plugin-marketplace-complete-guide-36-plugins-december-2025
7. [S7] Anthropic blog — "Plugins for Claude Code" — Oct 9, 2025 — T1.
   https://claude.com/blog/claude-code-plugins
8. [S8] Search results for community marketplaces (claudemarketplaces.com, buildwithclaude.com, etc.) — T3.
