# 5 — Roadmap, ETA, and ecosystem

## Headline finding

**There is no public GA date and no formal RFC/spec document on the roadmap as of May 2026.** Anthropic's only on-the-record roadmap statement remains the launch post's commitment that "plugins will be our standard way to bundle and share Claude Code customizations, and we'll continue to evolve the format as we add more extension points" [S1]. In practice the roadmap reveals itself through the "What's new" weekly digest and changelog: new component types and quality-of-life features land continuously, the system has not been re-labelled GA, and there is no signal of an imminent rename, deprecation, or merger with another product line [S2].

## ETA / GA status

| Question | Answer |
|---|---|
| Has Anthropic announced a GA date? | **No.** No public commitment found in docs, blog, or release notes through May 2026 [S1][S2][S3]. |
| Is the system still labelled "public beta"? | The Oct 2025 launch language said "now in public beta" [S1]. Current docs at `discover-plugins` and `plugins-reference` describe the system in plain present tense without "beta" qualifiers, but no explicit "GA" announcement exists. |
| Is a formal spec document on the roadmap? | **No public commitment.** The reference docs page acts as the de-facto spec; an unofficial JSON Schema (`hesreallyhim/claude-code-json-schema`) is referenced via the `$schema` example field [S2]. |
| Will plugins be deprecated / merged into Skills/Agents? | **No** — the docs explicitly position plugins as the bundling envelope that **carries** Skills, Agents, Hooks, MCP, LSP, etc. [S2]. |

## Roadmap statements (on the record)

- Anthropic, Oct 9, 2025 launch post: "Moving forward, plugins will be our standard way to bundle and share Claude Code customizations, and we'll continue to evolve the format as we add more extension points" [S1]. This is the strongest forward-looking commitment found.
- Anthropic engineering, Oct 20, 2025: sandboxing positioned as enabling "more autonomous" Claude Code work and explicitly mentions sandboxing "arbitrary processes, agents and MCP servers" — implicitly including plugin-shipped subprocesses [S4].
- Docs framing of `experimental.*` namespace: "a future release will require `experimental.*`" for themes and monitors — confirms Anthropic intends an eventual stabilization migration rather than indefinite experimental status [S5].

No specific calendar dates were attached to any of these.

## Plugins vs Skills vs Agents vs MCP

The relationship is **containment, not competition** [S2][S5]:

```
            ┌────────────────────── Plugin (bundling envelope) ──────────────────────┐
            │                                                                        │
            │   Skills    Commands    Agents    Hooks    MCP servers    LSP servers  │
            │                                  ↑                                     │
            │                                  └── lifecycle: PreToolUse, etc.       │
            └────────────────────────────────────────────────────────────────────────┘
                          ↑
                     Each component type also exists standalone
                     (you can have a SKILL.md outside any plugin)
```

- **Skills** were popularized in late 2025 and exist independently, but plugins remain the natural distribution unit for shipping a bundle of Skills.
- **MCP servers** predate plugins; plugins simply pre-configure them.
- **Agents (subagents)** can be defined per-project; plugins package and namespace them (`plugin-name:agent-name`).

There is **no signal** of a competing "extension" or "addon" surface that would supersede plugins. The plugin envelope appears stable as Anthropic's publishing primitive.

## Ecosystem adoption snapshot

- **9,000+ Claude Code plugins** documented to exist by April 2026 across all marketplaces, with **~100 deemed production-ready** by community survey — third-party signal, treat with skepticism on exact counts [S6].
- **~36 curated plugins** in the official `claude-plugins-official` marketplace as of December 2025 [S7], spanning:
  - Code intelligence (LSPs for 11 languages: clangd, csharp-ls, gopls, jdtls, kotlin-language-server, lua-language-server, intelephense, pyright, rust-analyzer, sourcekit-lsp, typescript-language-server) [S8].
  - External integrations (GitHub, GitLab, Jira/Confluence, Asana, Linear, Notion, Figma, Vercel, Firebase, Supabase, Slack, Sentry) [S8].
  - Dev workflows (commit-commands, pr-review-toolkit, agent-sdk-dev, plugin-dev) [S8].
  - Output styles (explanatory, learning) [S8].
- **Named launch ecosystem partners** (Oct 2025): Dan Ávila (DevOps/docs/PM/testing marketplace), Seth Hobson / wshobson (80+ specialized subagents) [S1].
- **Aggregator sites**: claudemarketplaces.com, buildwithclaude.com, claudepluginhub.com, aitmpl.com — community-run discovery layers [S6].

## Recent (Q1-Q2 2026) plugin-relevant releases

Reconstructed from the `What's new` weekly digest [S2]:

| Week | Date range | Plugin-relevant change |
|---|---|---|
| Week 13 | Mar 23-27, 2026 | Auto mode (research preview) — classifier-mediated permissions, affects plugin hook approval flow |
| Week 14 | Mar 30 - Apr 3 | Per-tool MCP result-size override up to 500K; **plugin executables on Bash `PATH`** automatically |
| Week 15 | Apr 6-10 | **Monitor tool** streams background events — pairs with `experimental.monitors` plugin component |
| Week 16 | Apr 13-17 | Routines on Web fire cloud agents from schedule/events; `/usage` shows what drives limits |
| Week 17 | Apr 20-24 | **Custom themes from `/theme` or a plugin** — `experimental.themes` graduates toward usable |

Through April 2026 Anthropic shipped roughly **30+ point releases (v2.1.69 → v2.1.119)** [S9], with plugin/marketplace polish appearing in many of them: zip plugin support, `/plugin tag`, auto-install of `package.json` deps, etc. [S9][S2].

## Pending feature requests / community asks

Surfaced from search results (T3 sources, treated as directional only):

- **Plugin signing / verified-publisher badges** — no signal Anthropic is working on this [S6].
- **Per-plugin sandbox profiles** — sandboxing exists but is not author-declared in `plugin.json`.
- **Searchable, browsable web catalog beyond the in-CLI Discover tab** — partially addressed by `claude.com/plugins` and submission UIs [S10].
- **First-class telemetry / usage analytics for plugin authors** — no public commitment.
- **Paid / commercial plugins** — no signal Anthropic intends to introduce a marketplace billing layer.

## Open questions

- **Will the "public beta" label ever be retired explicitly?** No date.
- **Is a versioned, machine-validated JSON Schema published by Anthropic itself on the roadmap?** Anthropic references `json.schemastore.org/claude-code-plugin-manifest.json` in docs but explicitly says Claude Code ignores `$schema` at load time — implying the schema is community-maintained.
- **Cowork integration**: `claude.com/plugins` URL says "Plugins for Claude Code and Cowork" — implying plugins will extend to the new Cowork product, but no detailed roadmap is public yet [S10].

## Sources

1. [S1] Anthropic blog — "Plugins for Claude Code" — Oct 9, 2025 — T1.
   https://claude.com/blog/claude-code-plugins
2. [S2] Anthropic Claude Code docs — "What's new" digest — T1.
   https://code.claude.com/docs/en/whats-new
3. [S3] Anthropic Claude Code docs — Changelog — T1.
   https://code.claude.com/docs/en/changelog
4. [S4] Anthropic engineering — "Claude Code sandboxing" — Oct 20, 2025 — T1.
   https://www.anthropic.com/engineering/claude-code-sandboxing
5. [S5] Anthropic Claude Code docs — "Plugins reference" — T1.
   https://code.claude.com/docs/en/plugins-reference
6. [S6] Redwerk — "7 Best Claude Code Plugins" 2026 — T3 (cited only for ecosystem-size signal).
   https://redwerk.com/blog/best-claude-code-plugins/
7. [S7] Pete Gypps — "36 plugins guide" — Dec 2025 — T2.
   https://www.petegypps.uk/blog/claude-code-official-plugin-marketplace-complete-guide-36-plugins-december-2025
8. [S8] Anthropic Claude Code docs — "Discover and install plugins" (official-marketplace categories) — T1.
   https://code.claude.com/docs/en/discover-plugins
9. [S9] Apiyi.com — "April 2026 Changelog overview" — T3 (cited for triangulating S2).
   https://help.apiyi.com/en/claude-code-changelog-2026-april-updates-en.html
10. [S10] Anthropic — `claude.com/plugins` (Plugins for Claude Code and Cowork landing page) — T1.
    https://claude.com/plugins
