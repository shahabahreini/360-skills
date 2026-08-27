#!/usr/bin/env node
// Validates that every skill on disk is registered, in sync, and correctly structured.
// Zero external dependencies. Exits non-zero and lists every violation it found.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { generateLlmsFull } from "./build-llms-full.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = join(ROOT, "skills");

const SEMVER = /^\d+\.\d+\.\d+$/;
const FIXED_SECTIONS = ["Purpose", "When to Use", "Core Principle", "Workflow"];
const FINAL_SECTION = "Quality Gate";

const errors = [];
const fail = (msg) => errors.push(msg);

// --- parsing helpers ---------------------------------------------------------

function parseFrontmatter(text, skill) {
  if (!text.startsWith("---\n")) {
    fail(`${skill}: SKILL.md does not start with YAML frontmatter`);
    return null;
  }
  const end = text.indexOf("\n---", 4);
  if (end === -1) {
    fail(`${skill}: frontmatter is never closed`);
    return null;
  }
  const fields = {};
  for (const line of text.slice(4, end).split("\n")) {
    const match = line.match(/^([a-z]+):\s*(.*)$/);
    if (match) fields[match[1]] = match[2].trim();
  }
  return fields;
}

// Collects "## " headings, ignoring anything inside a fenced code block.
function topLevelSections(text) {
  const sections = [];
  let inFence = false;
  for (const line of text.split("\n")) {
    if (line.startsWith("```")) inFence = !inFence;
    else if (!inFence && line.startsWith("## ")) sections.push(line.slice(3).trim());
  }
  return sections;
}

// Returns the body of a "## <heading>" section, up to the next "## ".
function sectionBody(text, heading) {
  const lines = text.split("\n");
  const start = lines.findIndex((l) => l.trim() === `## ${heading}`);
  if (start === -1) return null;
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((l) => l.startsWith("## "));
  return (end === -1 ? rest : rest.slice(0, end)).join("\n");
}

// --- gather skills -----------------------------------------------------------

const skillNames = readdirSync(SKILLS_DIR)
  .filter((name) => !name.startsWith("."))
  .filter((name) => statSync(join(SKILLS_DIR, name)).isDirectory())
  .sort();

if (skillNames.length === 0) fail("no skills found under skills/");

const skills = new Map();

for (const name of skillNames) {
  const path = join(SKILLS_DIR, name, "SKILL.md");
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    fail(`${name}: missing SKILL.md`);
    continue;
  }

  const fm = parseFrontmatter(text, name);
  if (!fm) continue;

  for (const key of ["name", "description", "version"]) {
    if (!fm[key]) fail(`${name}: frontmatter is missing "${key}"`);
  }
  if (fm.name && fm.name !== name) {
    fail(`${name}: frontmatter name is "${fm.name}" but the folder is "${name}"`);
  }
  if (fm.version && !SEMVER.test(fm.version)) {
    fail(`${name}: version "${fm.version}" is not valid semver`);
  }
  if (!name.startsWith("360-")) {
    fail(`${name}: folder name must carry the 360- prefix`);
  }

  // Section order: four fixed sections, one output section under any name, then the gate.
  const sections = topLevelSections(text);
  if (sections.length !== 6) {
    fail(`${name}: expected 6 top-level sections, found ${sections.length} (${sections.join(", ")})`);
  } else {
    FIXED_SECTIONS.forEach((expected, i) => {
      if (sections[i] !== expected) {
        fail(`${name}: section ${i + 1} should be "${expected}", found "${sections[i]}"`);
      }
    });
    if (sections[5] !== FINAL_SECTION) {
      fail(`${name}: last section should be "${FINAL_SECTION}", found "${sections[5]}"`);
    }
  }

  // Family convention: every skill disambiguates itself from its neighbors.
  const whenToUse = sectionBody(text, "When to Use");
  if (whenToUse !== null && !/\bNot\b|\bNever\b/.test(whenToUse)) {
    fail(`${name}: "When to Use" has no negative trigger naming neighboring skills`);
  }

  skills.set(name, fm);
}

// --- README ------------------------------------------------------------------

const readme = readFileSync(join(ROOT, "README.md"), "utf8");
const readmeRows = new Map();

for (const line of readme.split("\n")) {
  const match = line.match(/^\|\s*\[`([^`]+)`\]\(skills\/[^)]+\)\s*\|(.+)\|([^|]*)\|\s*$/);
  if (match) readmeRows.set(match[1], { description: match[2].trim(), version: match[3].trim() });
}

const routing = sectionBody(readme, "Which Skill Do I Need?");
if (routing === null) fail("README.md: missing the \"Which Skill Do I Need?\" routing table");

for (const [name, fm] of skills) {
  const row = readmeRows.get(name);
  if (!row) {
    fail(`README.md: skills table has no row for ${name}`);
    continue;
  }
  if (row.version !== fm.version) {
    fail(`README.md: ${name} is listed as ${row.version}, frontmatter says ${fm.version}`);
  }
  if (row.description !== fm.description) {
    fail(`README.md: ${name} description has drifted from its frontmatter`);
  }
  if (routing !== null && !routing.includes(`\`${name}\``)) {
    fail(`README.md: routing table does not mention ${name}`);
  }
}

for (const name of readmeRows.keys()) {
  if (!skills.has(name)) fail(`README.md: lists ${name}, which does not exist under skills/`);
}

// --- llms.txt ----------------------------------------------------------------

const llms = readFileSync(join(ROOT, "llms.txt"), "utf8");
const llmsEntries = new Map();

for (const line of llms.split("\n")) {
  const match = line.match(/^- \[([^\]]+)\]\([^)]*\/skills\/[^)]+\):\s*(.+)$/);
  if (match) llmsEntries.set(match[1], match[2].trim());
}

for (const [name, fm] of skills) {
  const description = llmsEntries.get(name);
  if (description === undefined) {
    fail(`llms.txt: no entry for ${name}`);
  } else if (description !== fm.description) {
    fail(`llms.txt: ${name} description has drifted from its frontmatter`);
  }
}

for (const name of llmsEntries.keys()) {
  if (!skills.has(name)) fail(`llms.txt: lists ${name}, which does not exist under skills/`);
}

// --- llms-full.txt -----------------------------------------------------------

let diskLlmsFull;
try {
  diskLlmsFull = readFileSync(join(ROOT, "llms-full.txt"), "utf8").replace(/\r\n/g, "\n");
} catch {
  fail("llms-full.txt: missing file. Run: node scripts/build-llms-full.mjs");
}

if (diskLlmsFull) {
  const expectedLlmsFull = generateLlmsFull();
  if (diskLlmsFull !== expectedLlmsFull) {
    fail("llms-full.txt: out of sync with repository contents. Run: node scripts/build-llms-full.mjs");
  }
}

// --- report ------------------------------------------------------------------

if (errors.length > 0) {
  console.error(`check-consistency: ${errors.length} problem(s) found\n`);
  for (const error of errors) console.error(`  - ${error}`);
  console.error("");
  process.exit(1);
}

console.log(`check-consistency: ${skills.size} skills and llms-full.txt, all consistent.`);
