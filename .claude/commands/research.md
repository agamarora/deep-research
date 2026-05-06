---
description: Run a deep research investigation on $ARGUMENTS using the multi-agent orchestrator-subagents pattern (Anthropic native, no external APIs).
argument-hint: <free-form research query, e.g. "best laptop under $2000 for ML dev" or "competitive analysis of vector databases">
---

# /research

You are about to kick off a deep research run for:

> $ARGUMENTS

## Step 1 — bootstrap the run directory

1. Generate a slug from the query (lowercase, hyphenated, ≤50 chars, alphanumeric + hyphens only).
2. Compute today's date as `YYYY-MM-DD`.
3. Create the run directory: `reports/<YYYY-MM-DD>-<slug>/`.
4. Create subdir: `reports/<YYYY-MM-DD>-<slug>/notes/`.
5. Write the verbatim query to `reports/<YYYY-MM-DD>-<slug>/query.md` with frontmatter:

```markdown
---
query: "<verbatim user query>"
created: <ISO timestamp>
slug: <slug>
---

<verbatim user query>
```

6. Write a stub `meta.json` with `query`, `slug`, `created`, `status: "in_progress"`.

## Step 2 — hand off to the lead researcher

Invoke the `lead-researcher` subagent via the `Agent` tool. Pass it:

- The verbatim query.
- The absolute run directory path.
- A note that the run directory is bootstrapped — start with the planning phase.
- Reminder: **search backends are limited to `WebSearch` and `WebFetch`. No external APIs.**

The lead researcher will plan, dispatch parallel subagent-researchers, synthesize, run critic + citation passes, and finalize `synthesis.md`.

## Step 3 — surface the result

When the lead returns:

1. Read `synthesis.md` and `audit.md`.
2. Show the user:
   - Path to the run directory.
   - The TL;DR section from `synthesis.md`.
   - The verdict line from `audit.md`.
   - 1-2 lines on what to read next (full synthesis, claims, sources).
3. Update `meta.json`: `status: "completed"`, `completed_at`, subagent count, iteration count.

## Notes

- **Complexity scaling** (per Anthropic's eval): simple queries get 1 agent / 3-10 tool calls; comparisons get 2-4 agents / 10-15 calls each; complex topics get 5-10+ agents. The lead decides based on the query.
- **Resumable**: if the same slug already exists for today, append `-2`, `-3`, etc. — never overwrite a prior run.
- **Cost**: a complex run can use 15× the tokens of chat. For trivial questions, consider answering directly instead of invoking `/research`.
