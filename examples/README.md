# Sample runs

Real outputs from the deep-research framework, kept here so first-time users can see what `/research` produces before installing.

These are tracked because they're samples; **runtime `reports/` are gitignored** in this repo and live in your own project.

## What's in here

### [`sample-run-budget-laptop-india/`](sample-run-budget-laptop-india/)

> Budget laptop in India for Linux dev work — expandable RAM to 32GB, no dedicated GPU, 14"+ no numpad, 16:10 preferred, FHD+, Intel or AMD.

The framework's first real dogfood run (2026-05-06). 8 subagents dispatched (4 round-1 research + 1 critic + 1 citation + 2 round-3 fix-ups), 136 sources, 58 claims, 7 disagreements surfaced and reconciled. v1 → v2 after the critic flagged SKU/CPU drift in 2 of 5 rows.

**Start here**: [`synthesis.md`](sample-run-budget-laptop-india/synthesis.md) — the final report.

Then optionally:
- [`audit.md`](sample-run-budget-laptop-india/audit.md) — what the critic caught + citation audit results.
- [`sources.md`](sample-run-budget-laptop-india/sources.md) — credibility-tiered source list (136 entries, T1/T2/T3).
- [`plan.md`](sample-run-budget-laptop-india/plan.md) — how the lead-researcher decomposed the query.
- [`notes/`](sample-run-budget-laptop-india/notes/) — one file per subagent.
- [`EVAL.md`](sample-run-budget-laptop-india/EVAL.md) — framework eval notes from this run (what worked, what to harden in v0.1).

> Disclaimer: research output, not retail recommendation. Pricing/SKU data scraped 2026-05-06; verify before acting.
