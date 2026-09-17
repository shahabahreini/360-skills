# AGENTS.md: Contributor Guide for Agents

This file tells AI agents how to add new skills to this repository. Follow it exactly.

## Where Skills Live

Every skill is a directory under `skills/`, named in kebab-case, containing one `SKILL.md`:

```
skills/<kebab-case-name>/SKILL.md
```

Experimental or unproven skills go under `skills/.experimental/<kebab-case-name>/SKILL.md` instead. Promote them to `skills/` only once they're stable and ready to be listed publicly.

## Naming

- Every skill name carries the `360-` prefix (e.g. `360-expert-review`, `360-api-design`).
- The folder name and the frontmatter `name` must match exactly.

## Required Frontmatter

Every `SKILL.md` starts with YAML frontmatter containing exactly these fields:

```yaml
---
name: 360-example-skill
description: Perform a concrete action with a defined output. Use when a specific task needs that action.
version: 1.0.0
---
```

- `name`: must exactly match the folder name
- `description`: two or three sentences, action-oriented, covering both what the skill does and when to reach for it. This is the only text an agent sees before deciding to load the skill, so it is the trigger surface: make it specific enough to win the right tasks and lose the wrong ones.
- `version`: semantic version (`MAJOR.MINOR.PATCH`). Bump major when a skill's output shape changes, since other skills consume it; use minor for compatible workflow additions.
- Use single-line scalar values for these three fields; no extra keys, duplicate keys, YAML blocks, or implicit objects.

## Required Skill Body Structure

Every `SKILL.md` follows this section order:

1. **Purpose**: why this skill exists, in one or two sentences
2. **When to Use**: concrete triggers for reaching for this skill
3. **Core Principle**: the single idea the skill is built around
4. **Workflow**: the ordered steps the agent executes
5. **Output Format**: the exact shape of the final deliverable. May carry a domain-specific heading instead (`Plan Template`, `Final Plan Format`, `Audit Report Format`) as long as it defines that exact shape.
6. **Quality Gate**: a yes/no checklist that must fully pass before the work is considered done

## Style Rules

- Brief. Imperative. No filler.
- No redundant restrictions. Say a thing once, in the place it matters.
- Usable by any agent, not just one product's assistant.
- Prefer concrete checklists and steps over abstract advice.

## Family Conventions

Skills install individually. Repeat the following contract locally in every skill that emits or consumes plans; do not require another skill's installation or template. Preserve valid existing plan structure.

### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or `None`), Parallel, Effort, Priority, Done when (observable). Use `Priority: must | should | could`, `Effort: S | M | L`, and `Parallel: yes | no`. Only `should` and `could` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: `Draft` → `Ready for review` → `Reviewed and ready to execute`. Open blocking questions keep it `Draft`; a complete unreviewed plan is `Ready for review`; a passed review sets `Reviewed and ready to execute`. Material edits after review return it to `Ready for review` (or `Draft` if blocked). Execution progress belongs in the ledger, not the readiness status. An explicit user instruction to execute a supplied plan authorizes execution without a mandatory sibling review; record that basis without claiming a review occurred.

Every skill that produces a handover uses these six fields:

> Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early

Each skill's **When to Use** ends with a single `- Not for ...` line naming its neighboring skills in backticks. Copy that line (without the bullet) into the README routing table's **Not for** column. The validator checks both destinations and exact synchronization.

### Optional Companion Convention

Every sibling skill, including future additions, starts its Workflow with this identical entry step. Token efficiency carries its own non-recursive consent handling.

### Entry: Optional Token Efficiency

Reuse explicit approval or refusal for `360-token-efficiency` from this session. If unknown and not already offered, ask once whether to enable it for this session; continue the main task with the overlay inactive while unanswered. Explicit user invocation counts as approval; merely appearing in a generated plan does not. On approval, discover and load it through the host's supported skill mechanism, reusing already-loaded instructions. If unavailable, explain briefly and continue; do not install automatically. Refusal disables the overlay, not ordinary efficient habits. Revocation takes effect immediately. Keep consent in-session only; it does not authorize cross-session memory writes. The overlay never invokes itself or restarts the parent skill.

Consent is a session decision, not a prerequisite for the main task. Keep unknown/offered, approved, refused, and revoked state in-session across skill handoffs. An unanswered offer is not approval and must not be repeated on each handoff. A new session starts unknown. Do not persist consent in faculty dossiers or other cross-session memory.

### Portable Delivery and Verification

Every sibling repeats these Delivery rules inside Workflow:

### Delivery

Prefer a recoverable file when supported, using the existing path or the default below. Honor explicit user output requests. If files are unavailable, deliver the same complete structure in-session and label it `in-session only; not persisted`; never claim a file was saved. With a saved file, chat normally carries a short briefing and its path. These delivery rules also apply to the templates and quality gate below.

Use observable preservation and acceptance checks. Structural validation cannot prove behavior or accuracy; evaluate realistic consent, capability, recovery, and handoff scenarios separately. Document unavailable telemetry and regressions; do not infer universal accuracy or token savings from finite tests.

## Registering a New Skill

Adding a skill to `skills/` (not `.experimental/`) is not complete until both of these are updated:

1. **`README.md`**: add a row to the skills index table with name, description, and version, plus a row in the routing table.
2. **`llms.txt`**: add a bullet to the Skills list with the description copied verbatim from the frontmatter.

Optional, and local only: `.claude-plugin/marketplace.json`. That directory is gitignored and never ships with the repository, so keep it in sync only if you maintain a local copy for plugin testing. It does not gate "done".

Skills under `skills/.experimental/` are not registered anywhere until promoted.

## Before You're Done

Run `node scripts/build-llms-full.mjs`, `node --test scripts/*.test.mjs`, and `node scripts/check-consistency.mjs`. The checker validates public and experimental skill structure, local reference links, consent and plan contracts, routing/index registration, and compiled documentation. Experimental skills are excluded from indexes and the bundle. Fixture tests exercise both valid inputs and specific failures.

- [ ] Folder name is kebab-case and starts with `360-`
- [ ] Frontmatter `name` matches the folder name exactly
- [ ] `description` is two or three sentences, action-oriented, states when to use it
- [ ] `version` is valid semver
- [ ] Body follows the required section order
- [ ] Family conventions followed: priority vocabulary, handover fields, negative trigger
- [ ] `README.md` index, `README.md` routing table, and `llms.txt` are all updated (unless experimental)
- [ ] `node scripts/check-consistency.mjs` exits 0

Supporting Markdown references belong inside the skill directory and must be linked from its entrypoint or another reachable reference. Load them only when relevant. The compiled bundle includes these references for single-fetch use; routine skill loading does not.
