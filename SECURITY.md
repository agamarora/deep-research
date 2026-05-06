# Security & Trust Model

`deep-research` is a Claude Code framework. Installing it adds files to your Claude Code project that the model reads as authoritative instructions. **Review before installing**, the same way you'd review any code you `git clone` into a working directory.

## What this framework does

- **Reads & writes within your repo**: creates and updates files under `reports/<date>-<slug>/`.
- **Edits frontmatter and prompts** in `.claude/agents/`, `.claude/commands/`, `.claude/skills/` — when you intentionally edit them.
- **Runs Claude Code's built-in `WebSearch` and `WebFetch` tools** during research.

## What this framework does NOT do

- ❌ No outbound network calls outside `WebSearch` and `WebFetch`. No Tavily, Firecrawl, Exa, Perplexity, or other API integrations. No telemetry. No analytics beacons.
- ❌ No API keys collected, stored, or transmitted. The framework is deliberately key-free.
- ❌ No filesystem access outside your repo working tree.
- ❌ No subprocess execution outside what you explicitly ask Claude Code to run.
- ❌ No credential reading from `~/.aws/`, `~/.ssh/`, env vars, etc.

## Trust surface — what to review before installing

When you copy `.claude/agents/`, `.claude/commands/`, and `.claude/skills/` into your project, those markdown files become part of Claude Code's context. They contain instructions the model follows. Treat them like code:

1. **Read `.claude/agents/lead-researcher.md`** — the orchestrator. Verify the operating loop is what you expect.
2. **Read `.claude/agents/subagent-researcher.md`** — the parallel worker. Verify the tool list is `WebSearch`, `WebFetch`, and filesystem-only.
3. **Read `.claude/commands/research.md`** — the entry slash command. Verify the bootstrap behavior.
4. **Read `.claude/skills/deep-research/SKILL.md`** — the workflow doc. Confirm constraints.

If a fork modifies these files in surprising ways (adds external tool calls, requires API keys, posts data anywhere), that fork is no longer this framework. Diff before installing forks.

## Reporting a vulnerability

Open a private GitHub Security Advisory: https://github.com/agamarora/deep-research/security/advisories/new

Or open a regular issue prefixed `[SECURITY]` if the problem isn't sensitive enough to need private disclosure.

Response time: best-effort, solo maintainer. Material issues prioritized.

## Output disclaimer

Reports under `reports/` are **research output, not professional advice**. Source data is scraped from public web pages at run time and may be stale, paywalled, or wrong. Verify before acting on any specific claim.
