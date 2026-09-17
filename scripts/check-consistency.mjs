#!/usr/bin/env node
// Validate independently installable skills, contracts, references and indexes.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateLlmsFull } from './build-llms-full.mjs';
import { CONSENT, PLAN_CONTRACT, HANDOVER, DELIVERY } from './lib/contracts.mjs';
import { frontmatter, markdownLinks, sections } from './lib/markdown.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;
const NAME = /^360-[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function checkConsistency(root = ROOT) {
  const errors = [];
  const fail = message => errors.push(message);
  const read = path => {
    try { return readFileSync(join(root, path), 'utf8').replace(/\r\n/g, '\n'); }
    catch { fail(`${path}: missing or unreadable file`); return ''; }
  };
  const directories = path => existsSync(path) ? readdirSync(path, { withFileTypes: true }).filter(e => e.isDirectory() && !e.name.startsWith('.')).map(e => e.name).sort() : [];
  const publicNames = directories(join(root, 'skills'));
  const experimentalNames = directories(join(root, 'skills/.experimental'));
  const allNames = new Set([...publicNames, ...experimentalNames]);
  if (!publicNames.length) fail('no skills found under skills/');
  const skills = new Map();
  const docPaths = ['README.md', 'AGENTS.md', 'CONTRIBUTING.md'];

  for (const [names, prefix, published] of [[publicNames, 'skills', true], [experimentalNames, 'skills/.experimental', false]]) {
    for (const name of names) {
      const dir = `${prefix}/${name}`;
      const path = `${dir}/SKILL.md`;
      const text = read(path);
      docPaths.push(path);
      const report = message => fail(`${path}: ${message}`);
      if (!NAME.test(name)) report('folder name must be kebab-case with the 360- prefix');
      const fm = frontmatter(text, report);
      if (fm) {
        if (fm.name !== name) report('frontmatter name does not match folder');
        if (!SEMVER.test(fm.version ?? '')) report('version is not valid semver');
        const description = fm.description ?? '';
        const sentences = description.match(/[^.!?]+[.!?](?:["']?(?=\s|$))/g) ?? [];
        if (sentences.length < 2 || sentences.length > 3 || !/[.!?]["']?$/.test(description)) report('description must contain two or three complete sentences');
        if (!/\b(?:Use|when)\b/.test(description)) report('description must state when to use the skill');
      }
      const parts = sections(text);
      const expected = ['Purpose', 'When to Use', 'Core Principle', 'Workflow'];
      if (parts.length !== 6 || expected.some((heading, i) => parts[i]?.title !== heading) || parts[5]?.title !== 'Quality Gate' || !/(?:Format|Template)$/.test(parts[4]?.title ?? '')) report('expected Purpose, When to Use, Core Principle, Workflow, output Format/Template, Quality Gate in order');
      for (const part of parts) if (!part.body) report(`empty section "${part.title}"`);
      const when = parts.find(p => p.title === 'When to Use')?.body ?? '';
      const negative = when.split('\n').filter(l => l.trim()).at(-1) ?? '';
      const neighbors = [...negative.matchAll(/`(360-[^`]+)`/g)].map(m => m[1]);
      if (!negative.startsWith('- Not for ') || !neighbors.length || neighbors.some(n => n === name || !allNames.has(n))) report('last When to Use line must be a negative trigger naming existing neighboring skills');
      const workflow = parts.find(p => p.title === 'Workflow')?.body ?? '';
      if (name !== '360-token-efficiency' && !workflow.startsWith(CONSENT)) report('Workflow must begin with the shared session consent entry');
      if (name !== '360-token-efficiency' && !workflow.includes(DELIVERY)) report('missing portable Delivery rules');
      const output = parts[4]?.body ?? '';
      // Known family members and explicit plan producers/consumers must carry their own contract.
      const usesPlan = name !== '360-token-efficiency' && (/\bplan\b/i.test(output) || /\bplan\b/i.test(fm?.description ?? ''));
      if (usesPlan && !workflow.includes(PLAN_CONTRACT)) report('missing or changed local Shared Plan Contract');
      if (/\bhandover\b/i.test(text) && !text.includes(HANDOVER)) report('missing canonical six-field handover contract');
      // Validate the emitted template too: prose declaring a contract is not enough.
      for (const task of text.matchAll(/\*\*Task (\d+\.\d+) [^\n]+\n([\s\S]*?)(?=\n##|\n\*\*Task |\n```|$)/g)) {
        for (const field of ['What', 'How', 'Where', 'Depends on', 'Skills', 'Parallel', 'Effort', 'Priority', 'Done when']) {
          if (!task[2].split('\n').some(line => line.startsWith('- ' + field + ':'))) report('task template ' + task[1] + ' missing ' + field);
        }
        for (const vocabulary of ['Parallel: yes | no', 'Effort: S | M | L', 'Priority: must | should | could']) {
          if (!task[2].includes(vocabulary)) report('task template ' + task[1] + ' missing allowed values for ' + vocabulary.split(':')[0]);
        }
      }
      for (const handover of text.matchAll(/^## (?:\d+\. )?Handover(?: Summary)?\n([\s\S]*?)(?=\n##|\n```|(?![\s\S]))/gm)) {
        const fields = [...handover[1].matchAll(/^- ([^:\n]+):/gm)].map(item => item[1]);
        const required = ['Context', 'Decisions', 'State', 'Remaining tasks', 'Verification', 'Risks and how to detect them early'];
        if (required.some((field, index) => fields[index] !== field)) report('handover template must retain the six fields in order');
      }
      if (/clear the conversation before|never paste .*fallback|at least as correct and complete as it would be without/i.test(text)) report('obsolete behavioral instruction: history clearing, file-only fallback, or unverifiable accuracy claim');
      if (published && fm) skills.set(name, { ...fm, negative: negative.slice(2), path });

      const refs = [];
      const collect = folder => {
        if (!existsSync(join(root, folder))) return;
        for (const item of readdirSync(join(root, folder), { withFileTypes: true })) {
          const child = `${folder}/${item.name}`;
          if (item.isDirectory()) collect(child);
          else if (item.name.endsWith('.md')) refs.push(child);
        }
      };
      collect(`${dir}/references`);
      docPaths.push(...refs);
      // Ensure all bundled references can actually be discovered from the entrypoint.
      const reached = new Set([path]);
      const queue = [path];
      while (queue.length) {
        const source = queue.shift();
        for (const link of markdownLinks(read(source))) {
          if (/^(?:[a-z]+:|#|\/)/i.test(link)) continue;
          const target = relative(root, resolve(root, dirname(source), link.split('#')[0])).split(sep).join('/');
          if (refs.includes(target) && !reached.has(target)) { reached.add(target); queue.push(target); }
        }
      }
      for (const ref of refs) if (!reached.has(ref)) fail(`${ref}: supporting reference is not reachable from SKILL.md`);
    }
  }

  for (const path of docPaths) {
    const text = read(path);
    for (const link of markdownLinks(text)) {
      if (/^[a-z][a-z0-9+.-]*:/i.test(link)) continue;
      let decoded;
      try { decoded = decodeURIComponent(link); } catch { fail(`${path}: invalid link encoding ${link}`); continue; }
      const [file, anchor] = decoded.split('#');
      const target = file ? resolve(root, dirname(path), file) : join(root, path);
      const rel = relative(root, target);
      if (rel.startsWith(`..${sep}`) || rel === '..' || link.startsWith('/')) { fail(`${path}: local link escapes repository: ${link}`); continue; }
      if (!existsSync(target)) { fail(`${path}: broken local link ${link}`); continue; }
      if (path.startsWith('skills/') && file) {
        const skillDir = path.includes('/.experimental/') ? path.split('/').slice(0, 3).join('/') : path.split('/').slice(0, 2).join('/');
        if (target !== resolve(root, skillDir) && !target.startsWith(resolve(root, skillDir) + sep)) fail(`${path}: local skill dependency escapes its installable directory: ${link}`);
      }
      if (anchor && statSync(target).isFile()) {
        const content = readFileSync(target, 'utf8');
        const slugs = [...content.matchAll(/^#{1,6} (.+)$/gm)].map(m => m[1].toLowerCase().replace(/[^\p{L}\p{N}_\s-]/gu, '').replace(/ /g, '-'));
        if (!slugs.includes(anchor)) fail(`${path}: missing local anchor ${link}`);
      }
    }
  }

  const readme = read('README.md');
  const rows = new Map();
  for (const line of readme.split('\n')) {
    const match = line.match(/^\|\s*\[`([^`]+)`\]\(([^)]+)\)\s*\|\s*(.+?)\s*\|\s*([^|]+?)\s*\|$/);
    if (!match) continue;
    const [, name, link, description, version] = match;
    if (rows.has(name)) fail(`README.md: duplicate index row for ${name}`);
    if (![ `skills/${name}`, `skills/${name}/SKILL.md` ].includes(link)) fail(`README.md: wrong index destination for ${name}`);
    rows.set(name, { description, version });
  }
  const routing = sections(readme).find(s => s.title === 'Which Skill Do I Need?');
  if (!routing) fail('README.md: missing routing table');
  const routes = new Map();
  for (const line of (routing?.body ?? '').split('\n')) {
    const match = line.match(/^\|[^|]+\|\s*`(360-[^`]+)`\s*\|\s*(.+?)\s*\|$/);
    if (!match) continue;
    if (routes.has(match[1])) fail(`README.md: duplicate routing row for ${match[1]}`);
    routes.set(match[1], match[2]);
  }
  const llms = read('llms.txt');
  const entries = new Map();
  for (const line of llms.split('\n')) {
    const match = line.match(/^- \[(360-[^\]]+)\]\(([^)]+)\):\s*(.+)$/);
    if (!match) continue;
    const [, name, link, description] = match;
    if (entries.has(name)) fail(`llms.txt: duplicate entry for ${name}`);
    if (link !== `https://github.com/shahabahreini/360-skills/blob/main/skills/${name}/SKILL.md`) fail(`llms.txt: wrong destination for ${name}`);
    entries.set(name, description);
  }
  for (const [name, fm] of skills) {
    if (!rows.has(name)) fail(`README.md: missing index row for ${name}`);
    else {
      if (rows.get(name).version !== fm.version) fail(`README.md: version drift for ${name}`);
      if (rows.get(name).description !== fm.description) fail(`README.md: description drift for ${name}`);
    }
    if (routes.get(name) !== fm.negative) fail(`README.md: routing negative trigger missing or drifted for ${name}`);
    if (entries.get(name) !== fm.description) fail(`llms.txt: entry missing or description drift for ${name}`);
  }
  for (const [source, items] of [['README.md index', rows], ['README.md routing', routes], ['llms.txt', entries]]) {
    for (const name of items.keys()) if (!skills.has(name)) fail(`${source}: registered non-public or nonexistent skill ${name}`);
  }
  if (!read('AGENTS.md').includes(CONSENT)) fail('AGENTS.md: shared consent entry missing or drifted');
  const compiled = read('llms-full.txt');
  try {
    if (compiled !== generateLlmsFull(root)) fail('llms-full.txt: out of sync; run node scripts/build-llms-full.mjs');
  } catch (error) { fail(`llms-full.txt: generation failed: ${error.message}`); }
  return { errors, skillCount: skills.size, experimentalCount: experimentalNames.length };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = checkConsistency();
  if (result.errors.length) {
    console.error(`check-consistency: ${result.errors.length} problem(s) found\n${result.errors.map(e => `  - ${e}`).join('\n')}`);
    process.exitCode = 1;
  } else console.log(`check-consistency: ${result.skillCount} public skills, ${result.experimentalCount} experimental, contracts, references and llms-full.txt consistent.`);
}
