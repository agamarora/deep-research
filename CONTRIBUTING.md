# Contributing

Thanks for considering a contribution.

## Maintainer expectation-set

**Solo maintainer.** Response time is best-effort. Plan for **1-2 weeks** between an issue or PR landing and a response. Material bugs and security issues get faster attention.

## Where to file what

- **Bug** (something doesn't work as documented) → [Issues](https://github.com/agamarora/deep-research/issues/new?template=bug.md)
- **Feature request** (new agent, new command, new template, new domain) → [Issues](https://github.com/agamarora/deep-research/issues/new?template=feature.md)
- **Question / discussion / "did anyone else see this"** → [Discussions](https://github.com/agamarora/deep-research/discussions). Please don't open Issues for open-ended questions.
- **Security disclosure** → see [SECURITY.md](SECURITY.md).

## PR acceptance criteria

PRs are welcome. Acceptance is opinionated. The framework is small and the constraints are deliberate.

**Will likely accept:**
- Bug fixes with a one-line repro.
- New domain templates under `templates/` (e.g. `templates/comparison-matrix.md`, `templates/idea-validation.md`).
- New domain skills under `.claude/skills/` that compose with the existing `deep-research` skill.
- Documentation improvements with concrete examples.
- Test cases (eval runs) demonstrating new query shapes.

**Will likely push back on:**
- Adding external API dependencies (Tavily, Firecrawl, Exa, Perplexity, etc.). The framework is deliberately key-free; this constraint is load-bearing for the install UX.
- Adding telemetry, analytics, or any outbound-call-on-import behavior.
- Refactors that don't fix a stated user problem.
- Renaming canonical files (`synthesis.md`, `claims.md`, `sources.md`, `audit.md`) — these are part of the framework's contract.

**Discuss before building** if your PR is large or changes the architecture. Open a Discussion first; the conversation saves both of us time.

## Style

- Markdown for all framework files. No code-gen, no build step.
- Subagents in `.claude/agents/` start with YAML frontmatter (`name`, `description`, `tools`, `model`).
- Slash commands in `.claude/commands/` use the standard Claude Code format with `description` and optional `argument-hint`.
- Cite sources for claims in any new agent/command prompt — same standard the framework holds itself to.

## Reviews

PRs are reviewed when the maintainer is available. No SLA. If a PR sits for more than 2 weeks, ping it politely on the PR thread.

## Code of conduct

Be technical, be specific, be kind. The framework is meant to be useful, not a fight club.
