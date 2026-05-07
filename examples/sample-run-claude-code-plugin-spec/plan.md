# Research Plan

## Restated query

User wants a current-status read on Anthropic's **Claude Code plugin specification** as of May 2026:
1. **Current status** — is it announced? in beta? GA? deprecated/superseded?
2. **Planned shape** — what does the spec actually look like (manifest format, capabilities, distribution model, security/sandboxing, hooks/extension points)?
3. **ETA** — if not yet GA, when is it expected? what milestones are public?

## Ambiguity flags

- "Plugin spec" could mean any of:
  - The `plugins` system Anthropic shipped in late 2025 (marketplace + .claude-plugin/plugin.json manifest), which bundles slash commands / agents / hooks / MCP servers.
  - A separate forthcoming "spec" document (RFC-style) defining the format.
  - Third-party derivatives (Claude Code Toolkit, plugin marketplaces).
- We treat "Claude Code plugin spec" broadly — covering Anthropic's own first-party plugin system, its manifest schema, and any official spec publication.

## Complexity classification

**Complex** — fast-moving area, multiple terms (plugins, marketplaces, skills, agents, hooks, MCP), need to disambiguate Anthropic-official vs community work. Dispatch 5 parallel subagents.

## Source-quality bar

- **T1 (primary/official)**: docs.claude.com / docs.anthropic.com / anthropic.com/news, Anthropic's GitHub repos (anthropics/claude-code, claude-code-action, official marketplace repos), Anthropic engineering blog, Anthropic changelog/release notes.
- **T2 (reputable secondary)**: TechCrunch, The Verge, InfoQ, official partner blogs (Vercel, GitHub), well-known dev publications, Anthropic team members' verified posts.
- **T3 (community/SEO)**: Medium SEO blogspam, random Reddit threads — usable only for triangulation, not as primary source.

Prioritize T1. Reject T3 unless corroborated.

## Disqualifying conditions / what would change conclusion

- Discovery that Anthropic published a formal RFC/spec document (would change "spec status" answer).
- Discovery the plugin system was deprecated/renamed (e.g., folded into "skills" or "agents").
- New GA announcement post-May 2026 cutoff — flag and exclude.

## Sub-question decomposition (5 parallel workers)

1. **Status & timeline of Claude Code plugins** — when announced, current release stage (beta/GA), changelog history through May 2026, any official "spec" document published. Output: `notes/1-status-and-timeline.md`.

2. **Plugin manifest & technical shape** — `.claude-plugin/plugin.json` schema, what a plugin contains (commands, agents, hooks, MCP servers, skills), file layout, versioning. Output: `notes/2-manifest-and-shape.md`.

3. **Distribution, marketplaces & installation model** — how plugins are published/discovered/installed (`/plugin` command, marketplace.json, git-based vs registry, Anthropic-hosted vs third-party). Output: `notes/3-distribution-and-marketplaces.md`.

4. **Security, sandboxing, permissions** — trust model, permission prompts, sandbox boundaries, secret handling, code-execution risk surface. Output: `notes/4-security-and-permissions.md`.

5. **Roadmap, ETA, and ecosystem signals** — Anthropic's public roadmap statements, GA timeline, relationship to Skills/Agents/MCP, third-party adoption, any forthcoming formal spec/RFC. Output: `notes/5-roadmap-and-eta.md`.

## Word budget

600-1200 words per subagent note.

## Dispatch mode

Native (`subagent_type: dr-subagent-researcher`).
