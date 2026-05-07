# 2 — Plugin manifest & technical shape

## Headline finding

A Claude Code plugin is a **self-contained directory** with an optional `.claude-plugin/plugin.json` manifest at the root, plus convention-located component directories (`commands/`, `agents/`, `skills/`, `hooks/`, `output-styles/`, `themes/`, `monitors/`) and special config files (`.mcp.json`, `.lsp.json`, `hooks/hooks.json`) [S1]. The manifest is **optional**; if present, only `name` is required. All other fields are metadata or path-overrides for the conventional component locations [S1].

## Manifest schema (`.claude-plugin/plugin.json`)

### Required fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes (if manifest present) | Kebab-case identifier; used to namespace components (e.g., `plugin-dev:agent-creator`) [S1] |

### Metadata fields (all optional)

| Field | Type | Notes |
|---|---|---|
| `$schema` | string | JSON Schema URL for editor autocomplete. Claude Code ignores it at load time. Anthropic's own example points at `https://json.schemastore.org/claude-code-plugin-manifest.json` [S1] |
| `version` | string | SemVer. Acts as cache key. If omitted, Claude Code falls back to git commit SHA, treating every commit as a new version. Pinned in `plugin.json` wins over marketplace entry [S1] |
| `description` | string | Brief explanation [S1] |
| `author` | object | `{ name, email, url }` [S1] |
| `homepage` | string | Documentation URL [S1] |
| `repository` | string | Source code URL [S1] |
| `license` | string | SPDX-style license id [S1] |
| `keywords` | string[] | Discovery tags [S1] |

### Component path fields (all optional; override defaults)

| Field | Type | Default location it overrides |
|---|---|---|
| `skills` | string \| array | `skills/` (directories with `SKILL.md`) |
| `commands` | string \| array | `commands/` (flat `.md` files) |
| `agents` | string \| array | `agents/*.md` |
| `hooks` | string \| array \| object | `hooks/hooks.json` (or inline) |
| `mcpServers` | string \| array \| object | `.mcp.json` (or inline) |
| `outputStyles` | string \| array | `output-styles/` |
| `lspServers` | string \| array \| object | `.lsp.json` (or inline) |
| `experimental.themes` | string \| array | `themes/` (experimental — schema may change) |
| `experimental.monitors` | string \| array | `monitors/monitors.json` (experimental) |
| `userConfig` | object | Values prompted at enable-time (supports `sensitive: true` for secrets) |
| `channels` | array | Telegram/Slack/Discord-style message-injection channels |
| `dependencies` | array | Other plugins required, with optional semver constraints |

[All of the above: S1]

### Complete example (verbatim from docs)

```json
{
  "name": "plugin-name",
  "version": "1.2.0",
  "description": "Brief plugin description",
  "author": { "name": "Author Name", "email": "author@example.com", "url": "https://github.com/author" },
  "homepage": "https://docs.example.com/plugin",
  "repository": "https://github.com/author/plugin",
  "license": "MIT",
  "keywords": ["keyword1", "keyword2"],
  "skills": "./custom/skills/",
  "commands": ["./custom/commands/special.md"],
  "agents": ["./custom/agents/reviewer.md"],
  "hooks": "./config/hooks.json",
  "mcpServers": "./mcp-config.json",
  "outputStyles": "./styles/",
  "lspServers": "./.lsp.json",
  "experimental": {
    "themes": "./themes/",
    "monitors": "./monitors.json"
  },
  "dependencies": [
    "helper-lib",
    { "name": "secrets-vault", "version": "~2.1.0" }
  ]
}
```
[S1]

## Directory layout

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json           # manifest (only file allowed under .claude-plugin/)
├── commands/                 # slash commands (markdown files)
├── agents/                   # subagents (markdown files w/ frontmatter)
├── skills/                   # skill directories with SKILL.md
│   └── pdf-processor/
│       ├── SKILL.md
│       ├── reference.md
│       └── scripts/
├── hooks/
│   └── hooks.json
├── output-styles/
├── themes/                   # experimental
├── monitors/                 # experimental
│   └── monitors.json
├── .mcp.json                 # MCP server bundle
├── .lsp.json                 # LSP server bundle
├── README.md
└── CHANGELOG.md
```

The docs explicitly note: "the `.claude-plugin/` directory contains the `plugin.json` file. All other directories (commands/, agents/, skills/, output-styles/, themes/, monitors/, hooks/) must be at the plugin root, not inside `.claude-plugin/`" [S1].

## Capabilities a plugin can bundle

| Component | Purpose |
|---|---|
| **Skills** | Long-form instructions in `SKILL.md` directories; Claude can auto-invoke based on context [S1][S2] |
| **Commands** | Simple `/name` slash commands as flat markdown files [S1] |
| **Agents** | Specialized subagents with frontmatter declaring tools/scope [S1] |
| **Hooks** | Lifecycle callbacks running shell on `PreToolUse`, `PostToolUse`, `UserPromptSubmit`, etc. [S1] |
| **MCP servers** | Pre-configured MCP server processes [S1] |
| **LSP servers** | Language Server Protocol integrations for code intelligence (added later) [S1][S3] |
| **Output styles** | Customize how Claude responds (e.g., `explanatory-output-style`, `learning-output-style`) [S3] |
| **Channels** | Message-injection for Telegram/Slack/Discord (uses `userConfig` schema for tokens) [S1] |
| **Themes** (experimental) | Color palettes shipped from a plugin via `experimental.themes` [S1][S4] |
| **Monitors** (experimental) | Background processes that start when the plugin is active [S1] |

## Versioning & compatibility

- **Cache key**: Claude Code uses the resolved version as the install/update cache key [S1].
- **Resolution order**: `plugin.json` `version` → `marketplace.json` entry's `version` → git commit SHA [S1].
- **Two regimes** [S1]:
  - **Explicit SemVer** — set `"version": "2.1.0"`; users only get updates when the publisher bumps it. Recommended for stable releases.
  - **Commit-SHA versioning** — omit `version`; every commit is a new version. Recommended for internal/team plugins under active dev.
- **Dependencies** — `dependencies` may pin other plugins by name only (any version), or by name + semver constraint (e.g., `~2.1.0`) [S1].
- **Experimental fields** — `experimental.themes` and `experimental.monitors` may change shape between releases; `claude plugin validate` warns; "a future release will require `experimental.*`" [S1].

## Environment variables exposed to plugin code

- `${CLAUDE_PLUGIN_ROOT}` — absolute path to the plugin's installation directory; changes on update; previous version's directory persists ~7 days for grace [S1].
- `${CLAUDE_PLUGIN_DATA}` — persistent dir surviving updates; intended for `node_modules`, virtualenvs, caches [S1].

## Minimum-viable plugin

The smallest valid plugin is a directory with **no manifest at all** — Claude Code auto-discovers components from default locations and derives `name` from the directory name [S1]:

```
my-plugin/
└── commands/
    └── hello.md
```

If a manifest is present, the minimum is:

```json
{ "name": "my-plugin" }
```

## Open questions

- The `userConfig` field references a `sensitive: true` flag, but the docs do not specify whether secrets are stored encrypted-at-rest by Claude Code or merely masked at prompt-time. The reference docs section on userConfig was truncated in the fetch; deeper read recommended for security-critical plugins.
- The `channels` and `lspServers` schemas were referenced but full sub-schemas were not extracted in this round.

## Sources

1. [S1] Anthropic Claude Code docs — "Plugins reference" — T1.
   https://code.claude.com/docs/en/plugins-reference
2. [S2] Anthropic Claude Code docs — "Skills" — T1.
   https://code.claude.com/docs/en/skills
3. [S3] Anthropic Claude Code docs — "Discover and install plugins" (lists official-marketplace plugin categories) — T1.
   https://code.claude.com/docs/en/discover-plugins
4. [S4] Anthropic Claude Code docs — "What's new" Week 17 (2026) — T1.
   https://code.claude.com/docs/en/whats-new
