import test from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, writeFileSync, mkdirSync, rmSync, renameSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkConsistency } from './check-consistency.mjs';
import { generateLlmsFull } from './build-llms-full.mjs';
import { CONSENT, PLAN_CONTRACT, HANDOVER, DELIVERY } from './lib/contracts.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BLUEPRINT = 'skills/360-blueprint/SKILL.md';
const TOKEN = 'skills/360-token-efficiency/SKILL.md';
const edit = (root, path, change) => writeFileSync(join(root, path), change(readFileSync(join(root, path), 'utf8')));
const sync = root => writeFileSync(join(root, 'llms-full.txt'), generateLlmsFull(root));

function fixture(run) {
  const root = mkdtempSync(join(tmpdir(), '360-consistency-'));
  try {
    for (const path of ['skills', 'assets', 'docs', 'README.md', 'AGENTS.md', 'CONTRIBUTING.md', 'llms.txt', 'llms-full.txt', 'LICENSE']) cpSync(join(ROOT, path), join(root, path), { recursive: true });
    return run(root);
  } finally { rmSync(root, { recursive: true, force: true }); }
}

function rejects(name, mutate, expected, { compile = true } = {}) {
  test(name, () => fixture(root => {
    mutate(root);
    if (compile) sync(root);
    const { errors } = checkConsistency(root);
    assert.ok(errors.some(error => expected.test(error)), `Expected ${expected}; got ${JSON.stringify(errors)}`);
  }));
}

function experimental(root, name = '360-fixture') {
  const dir = join(root, 'skills/.experimental', name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'SKILL.md'), `---\nname: ${name}\ndescription: Inspect an isolated fixture and report the result. Use when validating catalog behavior.\nversion: 1.0.0\n---\n\n# Fixture\n\n## Purpose\n\nValidate a fixture.\n\n## When to Use\n\n- For fixture checks\n- Not for executing plans (\`360-execute\`)\n\n## Core Principle\n\nPreserve evidence.\n\n## Workflow\n\n${CONSENT}\n\n${DELIVERY}\n\n### Inspect\n\nRead the input.\n\n## Output Format\n\nA concise finding.\n\n## Quality Gate\n\n- The finding has evidence\n`);
  return `skills/.experimental/${name}/SKILL.md`;
}

test('current catalog, references and compilation pass', () => {
  assert.deepEqual(checkConsistency(ROOT).errors, []);
});
test('compilation is deterministic and includes reference bodies', () => {
  const result = generateLlmsFull(ROOT);
  assert.equal(result, generateLlmsFull(ROOT));
  for (const path of ['skills/360-faculty/references/seating-roster.md', 'skills/360-token-efficiency/references/evidence-and-techniques.md']) {
    assert.ok(result.includes(`Source: ${path}`));
    assert.ok(result.includes(readFileSync(join(ROOT, path), 'utf8').trim()));
  }
});
test('experimental skill validates without public registration or compilation', () => fixture(root => {
  experimental(root);
  const before = generateLlmsFull(root);
  assert.ok(!before.includes('### Skill: 360-fixture'));
  assert.deepEqual(checkConsistency(root).errors, []);
}));
test('quoted scalars and semver prerelease/build identifiers are valid', () => fixture(root => {
  const path = experimental(root);
  edit(root, path, t => t.replace('version: 1.0.0', 'version: "2.0.0-rc.1+build.4"').replace('name: 360-fixture', "name: '360-fixture'"));
  assert.deepEqual(checkConsistency(root).errors, []);
}));
test('fenced headings and links do not become structure or dependencies', () => fixture(root => {
  const path = experimental(root);
  edit(root, path, t => t.replace('A concise finding.', 'A concise finding.\n\n~~~~markdown\n## Not a heading\n```\n[not a link](missing.md)\n~~~~'));
  assert.deepEqual(checkConsistency(root).errors, []);
}));
test('LF and CRLF sources compile identically', () => fixture(root => {
  edit(root, TOKEN, t => t.replaceAll('\n', '\r\n'));
  assert.deepEqual(checkConsistency(root).errors, []);
}));
rejects('extra frontmatter field', root => edit(root, BLUEPRINT, t => t.replace('version: 2.3.0', 'version: 2.3.0\nmetadata: extra')), /extra frontmatter/);
rejects('duplicate frontmatter key', root => edit(root, BLUEPRINT, t => t.replace('version: 2.3.0', 'version: 2.3.0\nversion: 2.3.0')), /duplicate frontmatter/);
rejects('missing frontmatter field', root => edit(root, BLUEPRINT, t => t.replace('version: 2.3.0\n', '')), /missing frontmatter field/);
rejects('unclosed frontmatter', root => edit(root, BLUEPRINT, t => t.replace('\n---\n', '\n--\n')), /unclosed frontmatter/);
rejects('block YAML is rejected', root => edit(root, BLUEPRINT, t => t.replace(/^description: .+$/m, 'description: |\n  A hidden field.')), /single-line scalar|must be a scalar/);
rejects('wrong frontmatter name', root => edit(root, BLUEPRINT, t => t.replace('name: 360-blueprint', 'name: 360-wrong')), /name does not match/);
rejects('non-kebab skill name', root => renameSync(join(root, 'skills/360-blueprint'), join(root, 'skills/360-Bad_Name')), /folder name must be kebab-case/);
rejects('semver leading zero', root => edit(root, BLUEPRINT, t => t.replace('version: 2.3.0', 'version: 02.3.0')), /not valid semver/);
rejects('semver leading-zero prerelease', root => edit(root, BLUEPRINT, t => t.replace('version: 2.3.0', 'version: 2.3.0-01')), /not valid semver/);
rejects('one-sentence description', root => edit(root, BLUEPRINT, t => t.replace(/^description: .+$/m, 'description: Use to make plans.')), /two or three complete sentences/);
rejects('missing section', root => edit(root, BLUEPRINT, t => t.replace('## Core Principle', '### Core Principle')), /expected Purpose/);
rejects('extra section', root => edit(root, BLUEPRINT, t => t + '\n## Extra\n\nUnregistered.\n'), /expected Purpose/);
rejects('negative trigger without neighbor', root => edit(root, BLUEPRINT, t => t.replace(/^- Not for .+$/m, '- Not for other tasks')), /negative trigger naming existing/);
rejects('negative trigger is not last', root => edit(root, BLUEPRINT, t => t.replace(/(^- Not for .+$)/m, '$1\n- Another positive trigger')), /last When to Use line/);
rejects('self-reference is not neighboring routing', root => edit(root, BLUEPRINT, t => t.replace(/^- Not for .+$/m, '- Not for other work (`360-blueprint`)')), /negative trigger naming existing/);
rejects('missing shared consent', root => edit(root, BLUEPRINT, t => t.replace(CONSENT, '### Entry\n\nProceed.')), /shared session consent/);
rejects('weakened consent', root => edit(root, BLUEPRINT, t => t.replace('Revocation takes effect immediately.', 'Revocation takes effect next session.')), /shared session consent/);
rejects('missing local plan contract', root => edit(root, BLUEPRINT, t => t.replace(PLAN_CONTRACT, '')), /Shared Plan Contract/);
rejects('wrong family vocabulary', root => edit(root, BLUEPRINT, t => t.replace('Priority: must | should | could', 'Priority: high | medium | low')), /Shared Plan Contract/);
rejects('missing handover verification', root => edit(root, BLUEPRINT, t => t.replace(HANDOVER, HANDOVER.replace(' · Verification', ''))), /six-field handover/);
rejects('unsafe history reset instruction', root => edit(root, BLUEPRINT, t => t + '\nClear the conversation before work.\n'), /obsolete behavioral instruction/);
rejects('missing local reference', root => rmSync(join(root, 'skills/360-faculty/references/seating-roster.md')), /broken local link/);
rejects('unreachable supporting reference', root => writeFileSync(join(root, 'skills/360-faculty/references/orphan.md'), '# Orphan\n'), /not reachable/);
rejects('skill local dependency escapes its folder', root => edit(root, BLUEPRINT, t => t + '\n[Template](../360-expert-review/SKILL.md)\n'), /escapes its installable directory/);
rejects('repository link escapes root', root => edit(root, 'README.md', t => t + '\n[Outside](../secrets.md)\n'), /escapes repository/);
rejects('missing local anchor', root => edit(root, 'README.md', t => t + '\n[Missing](#does-not-exist)\n'), /missing local anchor/);
rejects('missing README index entry', root => edit(root, 'README.md', t => t.replace(/^\| \[`360-blueprint`\].+\n/m, '')), /missing index row/);
rejects('duplicate README registration', root => edit(root, 'README.md', t => t + '\n' + t.match(/^\| \[`360-blueprint`\].+$/m)[0] + '\n'), /duplicate index row/);
rejects('wrong README version', root => edit(root, 'README.md', t => t.replace(/(^\| \[`360-blueprint`\].+)\| 2.3.0 \|/m, '$1| 9.0.0 |')), /version drift/);
rejects('routing drift', root => edit(root, 'README.md', t => t.replace('Not for hardening a plan', 'Not for testing a plan')), /routing negative trigger/);
rejects('llms description drift', root => edit(root, 'llms.txt', t => t.replace(/(^- \[360-blueprint\].+: ).+$/m, '$1Wrong description.')), /description drift/);
rejects('llms duplicate registration', root => edit(root, 'llms.txt', t => t + '\n' + t.match(/^- \[360-blueprint\].+$/m)[0] + '\n'), /duplicate entry/);
rejects('llms wrong destination', root => edit(root, 'llms.txt', t => t.replace('/skills/360-blueprint/SKILL.md', '/skills/360-execute/SKILL.md')), /wrong destination/);
rejects('unregistered public skill', root => {
  experimental(root);
  renameSync(join(root, 'skills/.experimental/360-fixture'), join(root, 'skills/360-fixture'));
}, /missing index row for 360-fixture/);
rejects('experimental skill cannot be registered', root => {
  experimental(root);
  edit(root, 'llms.txt', t => t + '\n- [360-fixture](https://github.com/shahabahreini/360-skills/blob/main/skills/360-fixture/SKILL.md): Hidden fixture.\n');
}, /registered non-public/);
rejects('malformed experimental skill is checked', root => {
  const path = experimental(root);
  edit(root, path, t => t.replace('version: 1.0.0', 'version: bad'));
}, /not valid semver/);
rejects('stale compiled skill content', root => edit(root, TOKEN, t => t.replace('Remove redundant work', 'Remove repeated work')), /out of sync/, { compile: false });
rejects('stale compiled reference content', root => edit(root, 'skills/360-faculty/references/seating-roster.md', t => t + '\nExtra maintained guidance.\n'), /out of sync/, { compile: false });
rejects('empty compiled documentation', root => writeFileSync(join(root, 'llms-full.txt'), ''), /out of sync/, { compile: false });
rejects('missing SKILL.md yields useful errors', root => rmSync(join(root, BLUEPRINT)), /missing or unreadable file/, { compile: false });
rejects('contributor consent drift', root => edit(root, 'AGENTS.md', t => t.replace(CONSENT, '')), /AGENTS.md: shared consent/);
rejects('portable fallback missing', root => edit(root, BLUEPRINT, t => t.replace('Honor explicit user output requests.', 'Only save files.')), /portable Delivery/);
rejects('task template omits Skills despite contract prose', root => edit(root, BLUEPRINT, t => t.replace('- Skills: <list or None>\n', '')), /task template 1.1 missing Skills/);
rejects('task template omits priority values', root => edit(root, BLUEPRINT, t => t.replace('- Priority: must | should | could', '- Priority: high')), /task template 1.1 missing allowed values/);
rejects('handover template omits Verification despite contract prose', root => edit(root, BLUEPRINT, t => t.replace('- Verification:\n', '')), /handover template must retain/);
