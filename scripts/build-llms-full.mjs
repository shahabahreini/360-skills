#!/usr/bin/env node
// Compiles the entire 360-skills documentation and skill catalog into a single llms-full.txt file.
// Zero external dependencies. Normalizes line endings to LF (\n).

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = join(ROOT, "skills");

export function generateLlmsFull() {
  const skillNames = readdirSync(SKILLS_DIR)
    .filter((name) => !name.startsWith("."))
    .filter((name) => statSync(join(SKILLS_DIR, name)).isDirectory())
    .sort();

  const readme = readFileSync(join(ROOT, "README.md"), "utf8").replace(/\r\n/g, "\n");
  const agents = readFileSync(join(ROOT, "AGENTS.md"), "utf8").replace(/\r\n/g, "\n");

  const lines = [
    "# 360-skills: Complete Agent Skills Catalog & Documentation",
    "",
    "> 360-skills is an open-standard, MIT-licensed collection of Agent Skills for AI coding agents (Claude Code, Cursor, Codex, Copilot, Windsurf, Gemini CLI, and 70+ others via skills.sh).",
    "",
    "This document compiles all repository documentation, contributor specifications, and full SKILL.md instruction sets for direct, single-fetch LLM ingestion.",
    "",
    "## Table of Contents",
    "- [Overview & Installation](#overview--installation)",
    "- [Contributor Guide (AGENTS.md)](#contributor-guide-agentsmd)",
    "- [Skills Catalog](#skills-catalog)",
  ];

  for (const name of skillNames) {
    lines.push(`  - [${name}](#skill-${name.toLowerCase()})`);
  }

  lines.push("", "---", "", "## Overview & Installation", "", readme.trim(), "", "---", "", "## Contributor Guide (AGENTS.md)", "", agents.trim(), "", "---", "", "## Skills Catalog", "");

  for (const name of skillNames) {
    const skillPath = join(SKILLS_DIR, name, "SKILL.md");
    const skillContent = readFileSync(skillPath, "utf8").replace(/\r\n/g, "\n").trim();
    lines.push(`### Skill: ${name}`, "", skillContent, "", "---", "");
  }

  return lines.join("\n").replace(/\r\n/g, "\n").trim() + "\n";
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const content = generateLlmsFull();
  writeFileSync(join(ROOT, "llms-full.txt"), content, "utf8");
  console.log(`build-llms-full: generated llms-full.txt (${(Buffer.byteLength(content, 'utf8') / 1024).toFixed(1)} KB)`);
}
