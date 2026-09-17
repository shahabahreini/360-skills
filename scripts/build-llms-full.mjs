#!/usr/bin/env node
// Deterministic, dependency-free compilation of public skills and their references.
import { readdirSync, readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export function generateLlmsFull(root = ROOT) {
  const read = path => readFileSync(join(root, path), 'utf8').replace(/\r\n/g, '\n').trim();
  const names = readdirSync(join(root, 'skills'), { withFileTypes: true })
    .filter(item => item.isDirectory() && !item.name.startsWith('.')).map(item => item.name).sort();
  const references = dir => {
    if (!existsSync(join(root, dir))) return [];
    return readdirSync(join(root, dir), { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en'))
      .flatMap(item => item.isDirectory() ? references(`${dir}/${item.name}`) : item.name.endsWith('.md') ? [`${dir}/${item.name}`] : []);
  };
  const lines = [
    '# 360-skills: Complete Agent Skills Catalog & Documentation', '',
    'This bundle contains the user guide, contributor instructions, and public skill instructions with supporting Markdown references. References are included for single-fetch access; normal skill loading should retrieve them only when relevant.', '',
    '## Table of Contents', '',
    '- [Overview & Installation](#overview--installation)',
    '- [Contributor Guide](#contributor-guide)',
    '- [Contributing](#contributing)',
    '- [Skills Catalog](#skills-catalog)',
    ...names.map(name => `  - [${name}](#skill-${name})`), '',
    '---', '', '## Overview & Installation', '', read('README.md'), '',
    '---', '', '## Contributor Guide', '', read('AGENTS.md'), '',
    '---', '', '## Contributing', '', read('CONTRIBUTING.md'), '',
    '---', '', '## Skills Catalog', '',
  ];
  for (const name of names) {
    lines.push(`### Skill: ${name}`, '', `Source: skills/${name}/SKILL.md`, '', read(`skills/${name}/SKILL.md`), '');
    for (const reference of references(`skills/${name}/references`)) {
      lines.push(`### Reference: ${reference}`, '', `Source: ${reference}`, '', read(reference), '');
    }
    lines.push('---', '');
  }
  return lines.join('\n').trim() + '\n';
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const content = generateLlmsFull();
  writeFileSync(join(ROOT, 'llms-full.txt'), content, 'utf8');
  console.log(`build-llms-full: generated llms-full.txt (${(Buffer.byteLength(content) / 1024).toFixed(1)} KB)`);
}
