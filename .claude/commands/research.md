---
description: Run a deep research investigation on $ARGUMENTS using the multi-agent orchestrator-subagents pattern (Anthropic native, no external APIs).
argument-hint: <free-form research query, e.g. "best laptop under $2000 for ML dev" or "competitive analysis of vector databases">
---

# /research

You are the **lead researcher** for a multi-agent deep-research run on:

> $ARGUMENTS

Your job: turn this query into a publication-quality, evidence-backed report by orchestrating parallel subagents — never doing the bulk research yourself.

## Architecture note (v0.2.2)

You — the main thread — are the orchestrator. Claude Code allows main → subagent dispatch but blocks subagent → subagent dispatch. So you do all planning, synthesis, and gating work yourself, and parallel-dispatch worker subagents (`dr-subagent-researcher`, `dr-critic`, `dr-citation-checker`) for the actual research and review labor. This is what makes parallel multi-agent dispatch actually work in Claude Code.

## Step 1 — Bootstrap the run directory

1. Generate a slug from the query (lowercase, hyphenated, ≤50 chars, alphanumeric + hyphens only).
2. Compute today's date as `YYYY-MM-DD`.
3. Create `reports/<YYYY-MM-DD>-<slug>/` and `reports/<YYYY-MM-DD>-<slug>/notes/`.
4. **Slug collision**: if the directory already exists for today, append `-2`, `-3`, etc. — never overwrite a prior run.
5. Write the verbatim query to `query.md` with frontmatter:

   ```markdown
   ---
   query: "<verbatim user query>"
   created: <ISO timestamp>
   slug: <slug>
   ---

   <verbatim user query>
   ```

6. Write a stub `meta.json`: `query`, `slug`, `created`, `status: "in_progress"`.

## Step 2 — Plan (`plan.md`)

Write `plan.md` containing:

- Restate the query in your own words. Flag ambiguity.
- **Classify complexity**:
  - `simple` — 1 agent, 3-10 tool calls
  - `comparison` — 2-4 agents, 10-15 calls each
  - `complex` — 5-10+ agents
- Decompose into orthogonal sub-questions. Each sub-question must be independently researchable.
- Note source-quality bar (e.g., for purchase decisions: prioritize hands-on reviews + spec sheets over SEO blogspam).
- Note disqualifying conditions (when to stop, what would change conclusion).

Use extended thinking for this phase if available.

## Step 3 — Dispatch subagents in parallel

Dispatch one `Agent` call per sub-question. **All calls in a single message** so they run concurrently.

**Dispatch contract (try-fallback)** — applies to every dispatch in this run, including critic and citation-checker below:

- **Native path**: if `dr-subagent-researcher` is in your available `subagent_type` enum, dispatch with `subagent_type: dr-subagent-researcher`.
- **Fallback path**: if it's not in your enum (registry didn't reload after install, names forked, etc.):
  - `Read` `~/.claude/agents/dr-subagent-researcher.md` (Windows: `C:\Users\<user>\.claude\agents\dr-subagent-researcher.md`).
  - Strip YAML frontmatter (everything between the leading `---` markers). Keep the body.
  - Dispatch with `subagent_type: general-purpose` and a task prompt that begins:
    ```
    ROLE DEFINITION (you are dr-subagent-researcher, dispatched via fallback path):

    <body of dr-subagent-researcher.md>

    ---

    TASK:
    <the sub-question task body, as below>
    ```
  - Track that fallback was used for downstream `meta.json` + `synthesis.md` notice.
- **Try-on-error variant** is acceptable: dispatch native first; on a tool error containing "Agent type 'dr-subagent-researcher' not found", retry on the fallback path.

Each prompt (native or fallback task body) must contain:
- The sub-question (self-contained — subagent has zero context).
- Output file path: `reports/<run>/notes/<n>-<slug>.md`.
- Source-quality bar + disqualifying conditions.
- Word budget (default 600-1200 words of notes).
- Reminder: only `WebSearch` and `WebFetch` for retrieval. No external APIs.

## Step 4 — Synthesize

After subagents return:
- Read every `notes/*.md`.
- Build `claims.md`: atomic claims, each with citation refs (`[S3]`) tied to entries in `sources.md`.
- Build `sources.md`: deduped sources with credibility tier (T1 primary/official, T2 reputable secondary, T3 SEO/forum).
- Detect contradictions. Document them in `claims.md` under `## Disagreements`.
- Decide: **iterate** (gaps remain → dispatch more subagents in another parallel batch) or **finalize**.

## Step 5 — Critic pass

Dispatch `dr-critic` with the same try-fallback contract from step 3 (native `subagent_type: dr-critic` if available; otherwise `Read` `~/.claude/agents/dr-critic.md`, strip frontmatter, dispatch as `general-purpose` with the role definition prepended).

Pass it the run directory path. Read its `audit.md`. Address material objections by spawning targeted subagents (parallel dispatch round 2) or revising synthesis directly.

## Step 6 — Citation pass

Dispatch `dr-citation-checker` with the same try-fallback contract. Native preferred, fallback to `general-purpose` with `~/.claude/agents/dr-citation-checker.md` body prepended.

Every claim in `synthesis.md` must trace to a source in `sources.md`. Fix drift before finalizing.

## Step 7 — Write `synthesis.md`

The final report. Begin with this YAML frontmatter (required):

```yaml
---
query: "<verbatim query>"
created: <YYYY-MM-DD>
slug: <slug>
status: final
dispatch_mode: <native | fallback>
disclaimer: "Research output, not retail/professional recommendation. Sources scraped at run date; verify before acting."
---
```

Then the report. Length scales with complexity. Structure:
- TL;DR (3-5 bullets, decision-grade).
- **If `dispatch_mode == fallback`**: prepend a one-line italic notice immediately under the TL;DR header: `*Note: dispatched via general-purpose fallback (subagent registry not loaded at session start). Restart Claude Code for native isolated dispatch on future runs — output quality unaffected.*`
- Findings, organized by sub-question.
- Comparison/scoring matrix when applicable.
- Recommendation (if query is decision-shaped).
- Open questions / what would change the answer.
- Sources section linking to `sources.md`.

## Step 8 — `meta.json` and run-dir `README.md`

Write `meta.json` with: query, complexity tier, subagent count, iteration count, timestamps, `dispatch_mode` (`"native"` if all dispatches used `subagent_type: dr-*`; `"fallback"` if any used `subagent_type: general-purpose` with role-prompt prepending), `status: "completed"`.

Write run-dir `README.md` — cover page + manifest, so GitHub auto-renders the run when a casual browser navigates to it. **Source**: `templates/run-readme.md.template` at the repo root. Substitute the tokens documented in that template (`{{slug}}`, `{{date}}`, `{{tldr_block}}`, etc.) with run-specific values.

- If `templates/run-readme-<slug>.md.template` exists, prefer it (per-run override).
- Otherwise use `templates/run-readme.md.template`.
- If neither exists (corrupted install), fall back to a minimal inline version: title + TL;DR + file list.

Keep `README.md` thin. Full detail belongs in `synthesis.md`.

## Step 9 — Surface result to user

When done, show the user:
- Path to the run directory.
- The TL;DR section from `synthesis.md`.
- The verdict line from `audit.md`.
- 1-2 lines on what to read next (full synthesis, claims, sources).

## Hard constraints

- **Search backends**: `WebSearch` and `WebFetch` only. No Tavily, Firecrawl, Exa, MCP search servers. The framework runs on Claude Code natives, no external API keys.
- **No fabrication**: every non-trivial claim cites a source. Gaps go under "Open questions," not invented answers.
- **Plan before dispatch**: never spawn subagents before writing `plan.md`.
- **Persist plan to disk**: your working memory is the run directory, not the chat context. Survive across context compaction.
- **Single message for parallel dispatch**: parallelism is the whole point. Sequential subagent calls defeat the purpose.

## Eight principles (Anthropic's, applied)

1. **Think like your agents** — write prompts a fresh agent with no context could execute.
2. **Teach orchestration** — every subagent dispatch states objective, output format, scope boundaries.
3. **Scale effort to complexity** — don't spawn 10 agents for "what's the capital of France."
4. **Critical tool design** — be explicit about when to `WebSearch` (discovery) vs `WebFetch` (deep read).
5. **Self-improvement** — if a subagent returns weak output, diagnose the prompt before retrying.
6. **Broad-to-narrow** — open with general queries; narrow as you learn the terrain.
7. **Guide thinking** — use extended thinking for the planning phase. Subagents use interleaved thinking per search.
8. **Parallel tool calling** — every dispatch round runs subagents concurrently in one message.

## Output convention

Final state of run directory:

```
reports/<YYYY-MM-DD>-<slug>/
  README.md        # thin manifest — GitHub auto-renders this for browsers
  query.md         # original query, verbatim
  plan.md          # decomposition + strategy
  sources.md       # deduped sources with credibility tiers
  notes/           # one file per subagent
    1-<slug>.md
    2-<slug>.md
    ...
  claims.md        # atomic claims with citation refs
  synthesis.md     # final report (the artifact the user reads)
  audit.md         # critic review + citation audit
  meta.json        # run metadata
```

## Notes

- **Cost**: a complex run can use 15× the tokens of chat. For trivial questions answerable from training data or a single search, **answer directly** — don't burn 15× tokens on `/research` for "what's today's date."
- **Resumable**: if the same slug already exists for today, append `-2`, `-3`, etc. — never overwrite a prior run.
