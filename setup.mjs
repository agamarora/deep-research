#!/usr/bin/env node
// deep-research setup — copy framework files into ~/.claude/{agents,commands,skills}/.
// OS-agnostic. Requires Node (Claude Code already does). Idempotent. Marker-aware.
//
// Usage: node setup.mjs [--force] [--quiet] [--dry-run] [--help]

import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, copyFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";
import { execSync } from "node:child_process";
import { createHash } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(__dirname);

const args = new Set(process.argv.slice(2));
const FORCE = args.has("--force");
const QUIET = args.has("--quiet");
const DRY_RUN = args.has("--dry-run");

if (args.has("--help") || args.has("-h")) {
  console.log(`deep-research setup

Usage: node setup.mjs [flags]

Flags:
  --force      Overwrite user-modified destination files (lossy).
  --quiet      Suppress success banner.
  --dry-run    Print actions without touching disk.
  --help, -h   This message.

Installs into:
  ~/.claude/agents/dr-*.md            (4 agent definitions)
  ~/.claude/commands/research.md      (the /research slash command)
  ~/.claude/skills/deep-research/     (skill marker + state via this repo)

Re-run after \`git pull\` to upgrade. Removes nothing on its own — see bin/deep-research-uninstall.
`);
  process.exit(0);
}

const log = (...m) => { if (!QUIET) console.log(...m); };
const warn = (...m) => console.warn(...m);
const err = (...m) => { console.error(...m); };

function getCommitHash() {
  try {
    return execSync("git rev-parse HEAD", { cwd: REPO, stdio: ["ignore", "pipe", "ignore"] })
      .toString().trim().slice(0, 12);
  } catch {
    return "unknown";
  }
}

function sha256(content) {
  return createHash("sha256").update(content).digest("hex").slice(0, 16);
}

const COMMIT = getCommitHash();
const HOME = homedir();
const CLAUDE_DIR = join(HOME, ".claude");
const AGENTS_DIR = join(CLAUDE_DIR, "agents");
const COMMANDS_DIR = join(CLAUDE_DIR, "commands");
const SKILLS_DIR = join(CLAUDE_DIR, "skills", "deep-research");
const STATE_DIR = join(HOME, ".deep-research");

const FILES = [
  { src: ".claude/agents/dr-lead-researcher.md",     dst: join(AGENTS_DIR,   "dr-lead-researcher.md") },
  { src: ".claude/agents/dr-subagent-researcher.md", dst: join(AGENTS_DIR,   "dr-subagent-researcher.md") },
  { src: ".claude/agents/dr-critic.md",              dst: join(AGENTS_DIR,   "dr-critic.md") },
  { src: ".claude/agents/dr-citation-checker.md",    dst: join(AGENTS_DIR,   "dr-citation-checker.md") },
  { src: ".claude/commands/research.md",             dst: join(COMMANDS_DIR, "research.md") },
  { src: ".claude/skills/deep-research/SKILL.md",    dst: join(SKILLS_DIR,   "SKILL.md") },
];

const MARKER_RE = /<!--\s*managed by deep-research\s+v([a-f0-9]+)\s+sha:([a-f0-9]+)\s*-->/i;

function mkMarker(srcSha) {
  return `<!-- managed by deep-research v${COMMIT} sha:${srcSha} -->\n<!-- Edits here are clobbered on upgrade. Customize in the cloned repo: ~/.claude/skills/deep-research/${"".padEnd(0)} -->\n`;
}

function preflight() {
  // Verify source files exist.
  const missing = FILES.filter(f => !existsSync(join(REPO, f.src)));
  if (missing.length) {
    err(`✖ Missing source files in ${REPO}:`);
    missing.forEach(f => err(`    ${f.src}`));
    err(`  This script must run from the deep-research repo root.`);
    process.exit(1);
  }
}

function ensureDir(d) {
  if (DRY_RUN) { log(`  [dry-run] mkdir -p ${d}`); return; }
  mkdirSync(d, { recursive: true });
}

function classifyTarget(dstPath, srcSha) {
  if (!existsSync(dstPath)) return { kind: "absent" };
  let cur;
  try { cur = readFileSync(dstPath, "utf8"); }
  catch (e) { return { kind: "unreadable", error: e.message }; }
  const m = cur.match(MARKER_RE);
  if (!m) return { kind: "foreign" };           // user-owned or unmanaged file
  const [, , markerSha] = m;
  if (markerSha === srcSha) return { kind: "current", markerSha };
  return { kind: "stale", markerSha };
}

function copyOne({ src, dst }) {
  const srcPath = join(REPO, src);
  const srcContent = readFileSync(srcPath, "utf8");
  const srcSha = sha256(srcContent);
  const cls = classifyTarget(dst, srcSha);

  ensureDir(dirname(dst));

  switch (cls.kind) {
    case "absent": {
      log(`  + ${dst}`);
      if (!DRY_RUN) writeFileSync(dst, mkMarker(srcSha) + srcContent, "utf8");
      return { action: "installed" };
    }
    case "current": {
      log(`  = ${dst}  (up to date)`);
      return { action: "skipped-current" };
    }
    case "stale": {
      const bak = dst + ".bak";
      log(`  ↑ ${dst}  (upgrade; backup → ${bak})`);
      if (!DRY_RUN) {
        copyFileSync(dst, bak);
        writeFileSync(dst, mkMarker(srcSha) + srcContent, "utf8");
      }
      return { action: "upgraded" };
    }
    case "foreign": {
      if (FORCE) {
        const bak = dst + ".bak";
        warn(`  ! ${dst}  (foreign file; --force → backup at ${bak})`);
        if (!DRY_RUN) {
          copyFileSync(dst, bak);
          writeFileSync(dst, mkMarker(srcSha) + srcContent, "utf8");
        }
        return { action: "force-overwritten" };
      }
      warn(`  ✖ ${dst}  (exists, not managed by deep-research; skipped)`);
      warn(`     Re-run with --force to overwrite (saves a .bak first).`);
      return { action: "skipped-foreign" };
    }
    case "unreadable": {
      err(`  ✖ ${dst}  (unreadable: ${cls.error})`);
      return { action: "error" };
    }
  }
}

function writeStateFile() {
  ensureDir(STATE_DIR);
  const versionFile = join(STATE_DIR, "version");
  if (DRY_RUN) { log(`  [dry-run] write ${versionFile} = ${COMMIT}`); return; }
  writeFileSync(versionFile, `${COMMIT}\n`, "utf8");
}

function banner(results) {
  if (QUIET) return;
  const installed   = results.filter(r => r.action === "installed").length;
  const upgraded    = results.filter(r => r.action === "upgraded").length;
  const current     = results.filter(r => r.action === "skipped-current").length;
  const foreign     = results.filter(r => r.action === "skipped-foreign").length;
  const forced      = results.filter(r => r.action === "force-overwritten").length;
  const errors      = results.filter(r => r.action === "error").length;

  console.log("");
  console.log("─".repeat(64));
  console.log(`  deep-research v${COMMIT}  ${DRY_RUN ? "(dry-run)" : "installed"}`);
  console.log("─".repeat(64));
  console.log(`  installed: ${installed}   upgraded: ${upgraded}   current: ${current}`);
  if (forced)  console.log(`  force-overwritten: ${forced}`);
  if (foreign) console.log(`  skipped (foreign): ${foreign}    (re-run with --force)`);
  if (errors)  console.log(`  errors: ${errors}`);
  console.log("");
  if (foreign === 0 && errors === 0) {
    console.log("  Next steps:");
    console.log("    1. Open a new Claude Code session (slash commands load at session start).");
    console.log("    2. Type:  /research  <your query>");
    console.log("    3. Optional: add `/research` to your project CLAUDE.md so teammates discover it.");
    console.log("");
    console.log("  Upgrade later:  cd ~/.claude/skills/deep-research && git pull && node setup.mjs");
    console.log("  Uninstall:      node ~/.claude/skills/deep-research/bin/deep-research-uninstall.mjs");
  }
  console.log("─".repeat(64));
}

function main() {
  preflight();
  log(`deep-research setup (v${COMMIT})${DRY_RUN ? " — dry-run" : ""}`);
  log(`  repo:    ${REPO}`);
  log(`  target:  ${CLAUDE_DIR}`);
  log("");

  const results = [];
  for (const f of FILES) {
    try { results.push(copyOne(f)); }
    catch (e) {
      err(`  ✖ ${f.dst}: ${e.message}`);
      results.push({ action: "error" });
    }
  }
  writeStateFile();
  banner(results);

  const errored = results.some(r => r.action === "error");
  process.exit(errored ? 1 : 0);
}

main();
