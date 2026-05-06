# deep-research

**Multi-agent deep research for Claude Code. Zero API keys.**

A drop-in framework that turns any Claude Code project into a publication-quality research engine. Plan → parallel subagents → synthesis → adversarial critic → citation audit. Native `WebSearch` and `WebFetch` only. No Tavily, no Firecrawl, no Exa, no MCP search servers.

Inspired by [Anthropic's published multi-agent research architecture](https://www.anthropic.com/engineering/multi-agent-research-system) (Opus lead + Sonnet subagents, 90.2% better than single-agent on internal evals).

## Install

```bash
git clone https://github.com/agamarora/deep-research.git
cp -r deep-research/.claude    /your/project/
cp -r deep-research/templates  /your/project/
```

That's it. Open your project in Claude Code, type `/research`.

## Use

```
/research best laptop in India under ₹75,000 for Linux dev work
```

The `lead-researcher` subagent plans the work, dispatches parallel `subagent-researcher` workers, synthesizes a draft, runs `critic` for adversarial review, then `citation-checker` to verify every claim. Output lands at `reports/<YYYY-MM-DD>-<slug>/` with a cover-page `README.md` GitHub auto-renders.

[See the first dogfood run →](reports/2026-05-06-budget-laptop-india-linux-dev/)

---

## Why

- **Native**: pure Claude Code primitives. Subagents, slash commands, skills. Zero external dependencies.
- **No API keys**: deliberately built around bundled tools. No friction, no signup, no monthly limits.
- **Persistent**: every run is a structured directory you git-track and revisit.
- **Modular, not bloated**: one slash command, four subagents, one skill. Adapts to query complexity automatically.
- **Open-source-friendly**: drop the `.claude/` directory into any project to enable.

## Architecture

```
User
  │
  ▼
/research <query>           ← bootstraps reports/<date>-<slug>/
  │
  ▼
lead-researcher             ← Opus. Plans, decomposes, synthesizes.
  │
  ├─ subagent-researcher    ┐
  ├─ subagent-researcher    ├─ Sonnet. Parallel. One per sub-question.
  └─ subagent-researcher    ┘
  │
  ├─ critic                 ← Sonnet. Adversarial review.
  └─ citation-checker       ← Haiku. Claim→source verification.
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

The lead-researcher classifies query complexity and scales accordingly:

| Complexity        | Agents  | Tool calls / agent |
|-------------------|---------|--------------------|
| Simple fact       | 1       | 3-10               |
| Direct comparison | 2-4     | 10-15              |
| Complex research  | 5-10+   | 10-15              |

A complex run uses ~15× the tokens of normal chat. Don't `/research` "what's today's date."

## FAQ

**Q: I already have a `reports/` directory in my project for something else.**
By default this framework writes to `reports/<date>-<slug>/`. Two ways to handle the collision: (a) move your existing `reports/` to a different name, or (b) edit the run path in `.claude/agents/lead-researcher.md` and `.claude/commands/research.md`. A path-config option is on the v0.1 roadmap.

**Q: Do I need an API key for anything?**
No. The framework uses Claude Code's bundled `WebSearch` and `WebFetch`. No Tavily, no Firecrawl, no Exa. No external account.

**Q: Can I add Tavily / Firecrawl / Exa / etc.?**
Yes, in your fork. The base framework deliberately doesn't, because the install UX ("drop the folder, type `/research`") only works if there are no setup steps.

**Q: How is this different from gpt-researcher / langchain open_deep_research / Defiect's plugin?**
- **gpt-researcher**: Python service, requires API keys (OpenAI/Anthropic + a search provider). Different deployment shape.
- **langchain open_deep_research**: LangGraph-based, requires LangSmith config and API keys. Much heavier setup.
- **Defiect's plugin**: more sophisticated evidence-graph machinery, comparable architecture, but slightly different emphasis.

This framework's edge is install simplicity (clone + copy + `/research`) and the no-API-key constraint that flows from it.

**Q: Why are reports tracked in the repo?**
Search and revisit. Research compounds; throwing it away is the loss.

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
