# deep-research

**Multi-agent deep research for Claude Code. Zero API keys.**

A drop-in framework that turns any Claude Code project into a publication-quality research engine. Plan → parallel subagents → synthesis → adversarial critic → citation audit. Native `WebSearch` and `WebFetch` only. No Tavily, no Firecrawl, no Exa, no MCP search servers.

Inspired by [Anthropic's published multi-agent research architecture](https://www.anthropic.com/engineering/multi-agent-research-system) (Opus lead + Sonnet subagents, 90.2% better than single-agent on internal evals).

## Install — 30 seconds

**Requirements:** [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Git](https://git-scm.com/), [Node.js](https://nodejs.org/) (Claude Code already requires it).

Open Claude Code and paste this. Claude does the rest:

> Install deep-research: run `git clone --single-branch --depth 1 https://github.com/agamarora/deep-research.git ~/.claude/skills/deep-research && cd ~/.claude/skills/deep-research && node setup.mjs` — then tell me to open a new project session and type `/research`.

Or run it yourself:

```bash
git clone --single-branch --depth 1 https://github.com/agamarora/deep-research.git ~/.claude/skills/deep-research
cd ~/.claude/skills/deep-research
node setup.mjs
```

### What gets created on disk

- `~/.claude/skills/deep-research/` — the cloned repo (skill + source of truth)
- `~/.claude/agents/dr-lead-researcher.md` — orchestrator (Opus)
- `~/.claude/agents/dr-subagent-researcher.md` — parallel worker (Sonnet)
- `~/.claude/agents/dr-critic.md` — adversarial review (Sonnet)
- `~/.claude/agents/dr-citation-checker.md` — claim→source audit (Haiku)
- `~/.claude/commands/research.md` — the `/research` slash command
- `~/.deep-research/version` — installed commit hash

Each managed file carries a `<!-- managed by deep-research v<commit> sha:<hash> -->` header so re-runs of `setup.mjs` skip already-current files and back up edits before overwriting.

### Use

Open a new Claude Code session in any project, then:

```
/research competitive landscape of OSS multi-agent frameworks in 2026
```

The `dr-lead-researcher` subagent plans the work, dispatches parallel `dr-subagent-researcher` workers, synthesizes a draft, runs `dr-critic` for adversarial review, then `dr-citation-checker` to verify every claim. Output lands at `reports/<YYYY-MM-DD>-<slug>/` with a cover-page `README.md` GitHub auto-renders.

> Research output is yours. Track `reports/` in your project repo or keep it local — your call.

### What does the output look like?

See [`examples/sample-run-budget-laptop-india/`](examples/sample-run-budget-laptop-india/) — a real run with 8 subagents, 136 sources, 58 claims, and a critic-reviewed synthesis.

[`synthesis.md`](examples/sample-run-budget-laptop-india/synthesis.md) is the final report; [`audit.md`](examples/sample-run-budget-laptop-india/audit.md) shows what the critic caught and fixed.

### Upgrade

```bash
cd ~/.claude/skills/deep-research && git pull && node setup.mjs
```

`setup.mjs` is idempotent: up-to-date files are skipped; upstream changes overwrite (with `.bak` backup); files you've edited locally are flagged and skipped unless you pass `--force`.

### Uninstall

```bash
node ~/.claude/skills/deep-research/bin/deep-research-uninstall.mjs
```

Removes only files carrying the deep-research marker. Leaves your own `~/.claude/commands/research.md` (or anything you authored) untouched. Pass `--force` to remove unmarked files anyway. See `--help` for `--keep-state` / `--keep-repo`.

---

## Why

- **Native**: pure Claude Code primitives. Subagents, slash commands, skills. Zero external dependencies.
- **No API keys**: deliberately built around bundled tools. No friction, no signup, no monthly limits.
- **Persistent**: every run is a structured directory you git-track and revisit.
- **Modular, not bloated**: one slash command, four subagents, one skill. Adapts to query complexity automatically.
- **Open-source-friendly**: install once globally; works in every project.

## Architecture

```
User
  │
  ▼
/research <query>           ← bootstraps reports/<date>-<slug>/
  │
  ▼
dr-lead-researcher          ← Opus. Plans, decomposes, synthesizes.
  │
  ├─ dr-subagent-researcher  ┐
  ├─ dr-subagent-researcher  ├─ Sonnet. Parallel. One per sub-question.
  └─ dr-subagent-researcher  ┘
  │
  ├─ dr-critic              ← Sonnet. Adversarial review.
  └─ dr-citation-checker    ← Haiku. Claim→source verification.
  │
  ▼
synthesis.md  +  audit.md  +  sources.md  +  claims.md  +  README.md
```

## Output convention

Every run produces:

```
reports/<YYYY-MM-DD>-<slug>/
  README.md        # cover page — GitHub auto-renders this when browsing the dir
  query.md         # verbatim query
  plan.md          # decomposition + complexity tier
  sources.md       # deduped sources, T1/T2/T3 credibility tiers
  notes/           # one file per subagent
  claims.md        # atomic claims with citation refs
  synthesis.md     # the final report
  audit.md         # critic verdict + citation audit
  meta.json        # run metadata
```

Customize the cover-page template at `templates/run-readme.md.template`.

## Scaling

`dr-lead-researcher` classifies query complexity and scales accordingly:

| Complexity        | Agents  | Tool calls / agent |
|-------------------|---------|--------------------|
| Simple fact       | 1       | 3-10               |
| Direct comparison | 2-4     | 10-15              |
| Complex research  | 5-10+   | 10-15              |

A complex run uses ~15× the tokens of normal chat. Don't `/research` "what's today's date."

## FAQ

**Q: I already have a `reports/` directory in my project for something else.**
By default this framework writes to `reports/<date>-<slug>/`. Two ways to handle the collision: (a) move your existing `reports/` to a different name, or (b) edit the run path in your installed `~/.claude/agents/dr-lead-researcher.md` and `~/.claude/commands/research.md` (changes will be flagged on next `setup.mjs` re-run; pass `--force` to keep them). A path-config option is on the v0.3 roadmap.

**Q: Do I need an API key for anything?**
No. The framework uses Claude Code's bundled `WebSearch` and `WebFetch`. No Tavily, no Firecrawl, no Exa. No external account.

**Q: Can I add Tavily / Firecrawl / Exa / etc.?**
Yes, in your fork. The base framework deliberately doesn't, because the install UX ("drop the folder, type `/research`") only works if there are no setup steps.

**Q: How is this different from gpt-researcher / langchain open_deep_research / Defiect's plugin?**
- **gpt-researcher**: Python service, requires API keys (OpenAI/Anthropic + a search provider). Different deployment shape.
- **langchain open_deep_research**: LangGraph-based, requires LangSmith config and API keys. Much heavier setup.
- **Defiect's plugin**: more sophisticated evidence-graph machinery, comparable architecture, but slightly different emphasis.

This framework's edge is install simplicity (paste one line, type `/research`) and the no-API-key constraint that flows from it.

**Q: What if Anthropic ships a first-party deep-research feature or official plugin spec?**
Then this framework adopts whichever path Anthropic publishes. The orchestrator-subagents pattern is portable — agents and the slash command are plain markdown. Until then, this is the path.

**Q: Are reports tracked in this repo?**
No. `reports/` is gitignored in this framework repo. In your own project that installs the framework, you choose: tracked (search + revisit, research compounds) or local-only (privacy, smaller repo). If you want to track, remove the `reports/` line from your `.gitignore` after installing.

## Eight design principles (Anthropic-derived)

1. Think like your agents — every prompt is self-contained.
2. Teach orchestration — dispatches state objective, output, scope, budget.
3. Scale effort to complexity — don't over-deploy.
4. Critical tool design — `WebSearch` for discovery, `WebFetch` for deep reads.
5. Self-improvement — diagnose weak output before retrying.
6. Broad-to-narrow — open queries general; narrow as terrain reveals itself.
7. Guide thinking — extended thinking for plans; interleaved per-search.
8. Parallel tool calling — single message, concurrent subagents.

## Token cost

A complex run can use ~15× the tokens of a normal chat. `/research` is for questions that warrant the depth.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Discussion-shaped questions go in [GitHub Discussions](https://github.com/agamarora/deep-research/discussions); bug reports and feature requests go in [Issues](https://github.com/agamarora/deep-research/issues).

## Security

See [SECURITY.md](SECURITY.md). TL;DR: no telemetry, no API key collection, no outbound calls beyond `WebSearch` + `WebFetch`. Treat installed subagents like code you'd `git clone` — review before running.

## License

MIT. See [LICENSE](LICENSE).

## Credits

- Architecture inspired by [Anthropic's multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system) and the [orchestrator-workers pattern](https://github.com/anthropics/claude-cookbooks/blob/main/patterns/agents/orchestrator_workers.ipynb).
