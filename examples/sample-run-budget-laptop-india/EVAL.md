# Framework eval — first dogfood run

**Date**: 2026-05-06 · **Run**: budget-laptop-india-linux-dev · **Framework**: v0

> **Historical note (post-v0.2)**: agent names below (`lead-researcher`, `subagent-researcher`, `critic`, `citation-checker`) have since been prefixed `dr-` (`dr-lead-researcher`, `dr-subagent-researcher`, `dr-critic`, `dr-citation-checker`) to avoid collisions with other Claude Code skill packs. Findings below use the original names because that's what was run.

This is the first real run of the deep-research framework. Captures friction observed and recommended changes.

## What went well

1. **Multi-agent architecture worked as designed.** 4 parallel research subagents returned in ~4 minutes with structured notes following the prompt-specified format. Token cost was ~95k per agent (Anthropic's "15× chat" estimate held up).
2. **Critic caught real bugs.** v1 synthesis had:
   - "Ubuntu certified" claim drift (cert covers 155H SKU, not 125U).
   - SKU/CPU drift in 2 of 5 rows (21SJA0K9IG is G8 IAL Core Ultra 225U, not G7 IML 210H; 21MVA096IN is 7535HS/660M, not 7735HS/780M — half the price too).
   - Missing model (E14 Gen 7 / 21T9005SIG entirely absent from v1).
   - Coverage gaps (webcam, keyboard, ports, used market) despite user's explicit mention of video calls.
   - Internal contradiction between notes/4 ("single SODIMM + soldered") and notes/2 ("2× SODIMM").
   The adversarial critic loop caught all of these. Framework value confirmed.
3. **Citation hygiene was clean.** Citation-checker found zero broken refs across [C1-C42] → [S1-S100]. Author discipline (writing claims.md before synthesis.md) paid off.
4. **Output convention was followed exactly.** Every run-dir file was where it was supposed to be: `query.md`, `plan.md`, `notes/`, `sources.md`, `claims.md`, `synthesis.md`, `audit.md`, `meta.json`. Future runs can rely on the layout.
5. **Source diversity was real.** 136 unique sources across T1 (Phoronix, NotebookCheck, vendor PSREF, Lenovo Linux UG), T2 (LaptopMedia, XDA, NoypiGeeks, Crucial/Kingston, Beebom, Digit), T3 (forums, SEO blogs explicitly flagged).

## What the framework needs to fix

### Material (v0 → v0.1)

1. **Subagents must verify SKU codes early in research.** The 21SJA0K9IG / 21MVA096IN drift happened because round-1 subagents pattern-matched by model line ("ThinkBook 14 G7") without locking the exact SKU code → CPU mapping. Mitigation: subagent-researcher prompt should require explicit SKU code → spec PDF resolution before claiming.

2. **Critic should run before, not after, synthesis.** Better separation:
   - Round 1: research subagents.
   - **NEW Round 1.5: reconciler subagent** — read all notes, find contradictions, force a single source of truth before synthesis. (notes/4 vs notes/2 contradiction would have been caught here.)
   - Round 2: synthesis.
   - Round 3: critic + citation in parallel.
   This adds one agent call but prevents the critic from finding contradictions that should never have reached the synthesis.

3. **The lead-researcher prompt does not currently flag user-stated workload as scope items.** User said "video calls" — synthesis v1 ignored webcams. Mitigation: lead-researcher should extract user-stated workload terms from the query and explicitly seed sub-questions to cover each one. Add a "user-workload-scope" section to plan.md.

4. **No re-research budget.** v1 → v2 cost 2 fix-up agent calls. The framework didn't pre-allocate budget for revisions. Mitigation: in plan.md, set "iteration budget = N rounds before final" and surface the count.

### Soft (consider for v0.2+)

5. **No "user-state validator" gate.** A reconciler that re-reads `query.md` against the proposed `synthesis.md` recommendation and explicitly maps each hard constraint → cited evidence would catch motivated-reasoning issues earlier (e.g. recommending soldered-RAM model when constraint is hard SODIMM).

6. **Output convention should include synthesis-vN versioning by default.** I had to manually `cp synthesis.md synthesis-v1.md` before rewriting. The lead-researcher should do this automatically before any post-audit revision.

7. **Indian-context sources were under-represented in round 1**, despite the plan calling them out. Mitigation: subagent-researcher should explicitly require ≥1 Indian-reviewer source per Indian-market-relevant sub-question.

8. **Plan.md mentioned "Used market" as a sanity check** but only got covered after the critic flagged it. Mitigation: lead-researcher should review plan.md vs notes/ coverage before declaring round 1 complete.

9. **Search backend lock is working as designed.** Zero subagents tried Tavily/Firecrawl/MCP. The hard constraint in 4 places held. Confirms the design choice.

10. **Custom subagents need a fresh-session test.** This entire run was hand-piloted because `lead-researcher` / `subagent-researcher` / `critic` / `citation-checker` are file-based subagent definitions registered at session start — and this session began before they existed. Next test: open a fresh Claude Code session in the repo root and type `/research <new query>`. That validates the named-subagent flow end-to-end.

## Concrete next changes (if/when iterating to v0.1)

- Edit `lead-researcher.md` operating loop:
  - Step 2.5 (NEW): extract user-stated workload terms from the query and seed sub-questions for each.
  - Step 4.5 (NEW): dispatch a reconciler subagent to find/resolve contradictions across notes before synthesis.
  - Step 7.5 (NEW): before any post-audit revision, archive `synthesis.md → synthesis-v<n>.md`.
- Edit `subagent-researcher.md`:
  - Require explicit SKU code → primary spec source resolution before any per-model claim.
  - Require ≥1 region-specific source for region-scoped sub-questions.
- Add a new agent: `reconciler.md`. Reads all notes, builds a single-source-of-truth fact table, flags contradictions for the lead.
- Edit `research.md` slash command:
  - Pre-allocate iteration budget in `meta.json`.
  - Surface the budget to user in step 3.

## Cost / time

- Total agent dispatches: 8 (4 round-1 research + 1 critic + 1 citation + 2 round-3 fix-up).
- Total tokens (approximate): ~750k across all agents.
- Wall time: ~15 minutes from `/research` invocation to v2 synthesis.
- Equivalent chat-only cost: probably 3-5 minutes of Claude time but materially worse output (single-pass synthesis without adversarial critique → would have shipped the SKU drift bugs).

## Verdict

**Framework v0 worked.** The architecture caught what the architecture was designed to catch (drift, contradictions, coverage gaps, citation hygiene). The fix-up loop closed v1's gaps in one extra round. Output is decision-grade. v0.1 changes above would harden it further.

User test recommended: **fresh Claude Code session in the repo root, type `/research <a different query>`**, and confirm the named-subagent flow registers and runs correctly.
