# Sources (deduped)

Tier legend: **T1** = Anthropic-owned / official primary; **T2** = reputable secondary; **T3** = community / SEO / unverified.

## T1 — primary / official

| Ref | Source | URL | Date | Notes |
|---|---|---|---|---|
| S1 | Anthropic blog — "Plugins for Claude Code" (originally `anthropic.com/news/claude-code-plugins`, redirected to `claude.com/blog/claude-code-plugins`) | https://claude.com/blog/claude-code-plugins | Oct 9, 2025 | Public-beta launch announcement; only on-the-record roadmap statement |
| S2 | Claude Code docs — "Plugins reference" | https://code.claude.com/docs/en/plugins-reference | Live (May 2026) | De-facto spec; `plugin.json` schema, env vars, CLI |
| S3 | Claude Code docs — "Discover and install prebuilt plugins through marketplaces" | https://code.claude.com/docs/en/discover-plugins | Live (May 2026) | `/plugin` command, install flow, official-marketplace categories, security warning |
| S4 | Claude Code docs — "Plugin marketplaces" (create/distribute) | https://code.claude.com/docs/en/plugin-marketplaces | Live (May 2026) | `marketplace.json` schema, hosting, managed restrictions |
| S5 | Claude Code docs — "What's new" weekly digest | https://code.claude.com/docs/en/whats-new | Live (May 2026) | Weeks 13-17 (2026) plugin-relevant releases |
| S6 | Claude Code docs — "Configure permissions" | https://code.claude.com/docs/en/permissions | Live (May 2026) | Allow/Ask permission tiers; layering with sandbox |
| S7 | Anthropic engineering — "Claude Code sandboxing — making Claude Code more secure and autonomous" | https://www.anthropic.com/engineering/claude-code-sandboxing | Oct 20, 2025 | bubblewrap/seatbelt; 84% prompt reduction; covers plugin subprocesses |
| S8 | GitHub — `anthropics/claude-plugins-official` | https://github.com/anthropics/claude-plugins-official | Live | Official Anthropic-managed marketplace; internal `/plugins` + `/external_plugins` |
| S9 | Claude Code docs — Changelog | https://code.claude.com/docs/en/changelog | Live | Per-version release notes |
| S10 | Anthropic — Plugins for Claude Code and Cowork landing page | https://claude.com/plugins | Live | Plugin browsing/submission entry point |
| S11 | Claude Code docs — "Skills" | https://code.claude.com/docs/en/skills | Live | Skill component spec (carried by plugins) |

## T2 — reputable secondary

| Ref | Source | URL | Date | Notes |
|---|---|---|---|---|
| S12 | startuphub.ai — "Anthropic's Claude Code plugins open the floodgates" | https://www.startuphub.ai/ai-news/ai-research/2025/anthropics-claude-code-plugins-open-the-floodgates/ | Oct 2025 | Independent coverage of launch |
| S13 | Pete Gypps Consultancy — "Claude Code Official Plugin Marketplace: Complete Guide to 36 Plugins" | https://www.petegypps.uk/blog/claude-code-official-plugin-marketplace-complete-guide-36-plugins-december-2025 | Dec 2025 | Independent enumeration of official marketplace contents |
| S14 | DataCamp — "How to Build Claude Code Plugins: A Step-by-Step Guide" | https://www.datacamp.com/tutorial/how-to-build-claude-code-plugins | 2025-2026 | Tutorial — used for triangulation only |

## T3 — community / SEO / unverified

| Ref | Source | URL | Notes |
|---|---|---|---|
| S15 | GitHub — `hesreallyhim/claude-code-json-schema` (unofficial JSON Schema) | https://github.com/hesreallyhim/claude-code-json-schema | Referenced via `$schema` example in S2 |
| S16 | GitHub — `situ2001/claude-plugin-validate` | https://github.com/situ2001/claude-plugin-validate | Community validator |
| S17 | apiyi.com — "April 2026 Changelog overview" | https://help.apiyi.com/en/claude-code-changelog-2026-april-updates-en.html | Used to triangulate S5 |
| S18 | Redwerk — "7 Best Claude Code Plugins 2026" | https://redwerk.com/blog/best-claude-code-plugins/ | 9,000+ plugin count signal — directional only |
| S19 | Medium (CherryZhou) — "Anthropic Launches Claude Code Plugins in Beta" | https://medium.com/@CherryZhouTech/anthropic-launches-claude-code-plugins-in-beta-signaling-a-shift-to-ai-coding-ecosystems-0d83d9a32b45 | Independent commentary; corroborates beta status |
| S20 | Aggregators: claudemarketplaces.com, buildwithclaude.com, claudepluginhub.com, aitmpl.com | various | Community discovery surfaces |
