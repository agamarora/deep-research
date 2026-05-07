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

**Dispatch with fallback** (this is the v0.2.1 robustness contract — read carefully):

1. **Check if `dr-lead-researcher` is in your available `subagent_type` enum** (visible in the `Agent` tool description in your system prompt).

2. **If present (native path)** — invoke `Agent` with `subagent_type: dr-lead-researcher`. Pass it:
   - The verbatim query.
   - The absolute run directory path.
   - A note that the run directory is bootstrapped — start with the planning phase.
   - Reminder: **search backends are limited to `WebSearch` and `WebFetch`. No external APIs.**
   - In `meta.json`, set `dispatch_mode: "native"`.

3. **If absent (fallback path)** — the user installed deep-research mid-session and the subagent registry hasn't reloaded. Don't fail; fall back gracefully:
   - `Read` the file `~/.claude/agents/dr-lead-researcher.md` (Windows: `C:\Users\<user>\.claude\agents\dr-lead-researcher.md`). If the file doesn't exist, the framework isn't installed — surface that to the user.
   - Strip the YAML frontmatter (everything between the leading `---` markers). Keep the body.
   - Invoke `Agent` with `subagent_type: general-purpose` and a task prompt of the form:
     ```
     ROLE DEFINITION (you are dr-lead-researcher, dispatched via fallback path):

     <body of dr-lead-researcher.md>

     ---

     TASK:
     <verbatim query>
     Run directory: <absolute path>
     The run directory is bootstrapped — start with the planning phase.
     Search backends: WebSearch and WebFetch only. No external APIs.

     IMPORTANT: You are running as general-purpose with the dr-lead-researcher role
     prompt. When you dispatch dr-subagent-researcher / dr-critic / dr-citation-checker,
     apply the same try-fallback pattern: prefer subagent_type: dr-* if available;
     otherwise read ~/.claude/agents/dr-<name>.md, strip frontmatter, dispatch as
     general-purpose with that role definition prepended. Set meta.json
     dispatch_mode: "fallback" and add a one-line soft notice to synthesis.md TL;DR.
     ```
   - In `meta.json`, set `dispatch_mode: "fallback"`.

   **Try-on-error variant**: if pre-detection is uncertain, you may dispatch native first; on a tool error containing "Agent type 'dr-lead-researcher' not found" or similar, retry on the fallback path. Either approach is acceptable.

The lead researcher (native or fallback) will plan, dispatch parallel `dr-subagent-researcher` workers, synthesize, run `dr-critic` + `dr-citation-checker` passes, and finalize `synthesis.md`.

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
