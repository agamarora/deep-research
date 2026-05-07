#!/usr/bin/env node
// deep-research uninstall — remove files installed by setup.mjs.
// Detects the deep-research marker before removing. Foreign files are left alone.
//
// Usage: node deep-research-uninstall.mjs [--force] [--keep-state] [--keep-repo] [--quiet] [--help]

import { readFileSync, unlinkSync, rmSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const args = new Set(process.argv.slice(2));
const FORCE = args.has("--force");
const KEEP_STATE = args.has("--keep-state");
const KEEP_REPO  = args.has("--keep-repo");
const QUIET = args.has("--quiet");

if (args.has("--help") || args.has("-h")) {
  console.log(`deep-research uninstall

Usage: node deep-research-uninstall.mjs [flags]

Flags:
  --force        Remove files even if the deep-research marker is missing.
  --keep-state   Preserve ~/.deep-research/ (version file, future config).
  --keep-repo    Preserve cloned repo at ~/.claude/skills/deep-research/.
  --quiet        Suppress banner.
  --help, -h     This message.

Removes (when marker matches OR --force):
  ~/.claude/agents/dr-lead-researcher.md
  ~/.claude/agents/dr-subagent-researcher.md
  ~/.claude/agents/dr-critic.md
  ~/.claude/agents/dr-citation-checker.md
  ~/.claude/commands/research.md
  ~/.claude/skills/deep-research/SKILL.md
  ~/.deep-research/                       (unless --keep-state)
  ~/.claude/skills/deep-research/         (unless --keep-repo)
`);
  process.exit(0);
}

const log = (...m) => { if (!QUIET) console.log(...m); };
const warn = (...m) => console.warn(...m);

const HOME = homedir();
const CLAUDE_DIR = join(HOME, ".claude");
const STATE_DIR  = join(HOME, ".deep-research");
const REPO_DIR   = join(CLAUDE_DIR, "skills", "deep-research");

const TARGETS = [
  join(CLAUDE_DIR, "agents",   "dr-lead-researcher.md"),
  join(CLAUDE_DIR, "agents",   "dr-subagent-researcher.md"),
  join(CLAUDE_DIR, "agents",   "dr-critic.md"),
  join(CLAUDE_DIR, "agents",   "dr-citation-checker.md"),
  join(CLAUDE_DIR, "commands", "research.md"),
  join(REPO_DIR,                "SKILL.md"),
];

const MARKER_RE = /<!--\s*managed by deep-research\b/;

function removeFile(path) {
  if (!existsSync(path)) { log(`  -  ${path}  (absent)`); return "absent"; }
  let content = "";
  try { content = readFileSync(path, "utf8"); }
  catch { /* binary or unreadable; treat as foreign */ }
  const managed = MARKER_RE.test(content);
  if (!managed && !FORCE) {
    warn(`  ✖ ${path}  (no deep-research marker; skipped — use --force to remove)`);
    return "skipped-foreign";
  }
  // Also try .bak alongside, if present.
  const bak = path + ".bak";
  try { unlinkSync(path); log(`  ✓ ${path}`); }
  catch (e) { warn(`  ✖ ${path}: ${e.message}`); return "error"; }
  if (existsSync(bak)) {
    try { unlinkSync(bak); log(`  ✓ ${bak}`); } catch { /* nbd */ }
  }
  return managed ? "removed" : "force-removed";
}

function removeDir(path, label) {
  if (!existsSync(path)) { log(`  -  ${path}  (absent)`); return "absent"; }
  try {
    rmSync(path, { recursive: true, force: true });
    log(`  ✓ ${label}: ${path}`);
    return "removed";
  } catch (e) {
    warn(`  ✖ ${label}: ${path} — ${e.message}`);
    return "error";
  }
}

function banner(results) {
  if (QUIET) return;
  const removed     = results.filter(r => r === "removed" || r === "force-removed").length;
  const skipped     = results.filter(r => r === "skipped-foreign").length;
  const errored     = results.filter(r => r === "error").length;
  console.log("");
  console.log("─".repeat(64));
  console.log("  deep-research uninstall complete");
  console.log("─".repeat(64));
  console.log(`  removed: ${removed}   skipped (foreign): ${skipped}   errors: ${errored}`);
  if (skipped) {
    console.log("");
    console.log("  Some files lacked the deep-research marker and were left alone.");
    console.log("  Re-run with --force to remove them anyway.");
  }
  console.log("─".repeat(64));
}

function main() {
  log("deep-research uninstall");
  if (FORCE) log("  --force: will remove files even without marker check.");
  log("");

  const fileResults = TARGETS.map(removeFile);

  const dirResults = [];
  if (!KEEP_STATE) dirResults.push(removeDir(STATE_DIR, "state"));
  else log(`  -  ${STATE_DIR}  (kept; --keep-state)`);

  if (!KEEP_REPO) {
    // Self-deletion guard: this script lives inside REPO_DIR, so removing it
    // is OK on POSIX (file already loaded) but flaky on Windows where the
    // running script's parent dir is locked. Best-effort.
    dirResults.push(removeDir(REPO_DIR, "repo"));
  } else log(`  -  ${REPO_DIR}  (kept; --keep-repo)`);

  banner([...fileResults, ...dirResults]);
  const anyError = [...fileResults, ...dirResults].includes("error");
  process.exit(anyError ? 1 : 0);
}

main();
