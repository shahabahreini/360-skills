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
description: One sentence. Action-oriented. States what it does and when to use it.
version: 1.0.0
---
```

- `name`: must exactly match the folder name
- `description`: two or three sentences, action-oriented, covering both what the skill does and when to reach for it. This is the only text an agent sees before deciding to load the skill, so it is the trigger surface: make it specific enough to win the right tasks and lose the wrong ones.
- `version`: semantic version (`MAJOR.MINOR.PATCH`). Bump major when a skill's output shape changes, since other skills consume it.

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

Skills in this repository hand work to each other, so shared vocabulary is a contract, not a preference. A skill that emits or consumes a plan uses these exact values:

- `Priority: must | should | could`. Only `should` and `could` sit below the cut line.
- `Effort: S | M | L`
- `Parallel: yes | no`
- Every task carries a stable ID (`1.1`, `1.2`) that downstream skills reference.

Every skill that produces a handover uses the same field list:

> Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early

Skills install individually into arbitrary agents, so there is no include mechanism. Each skill carries its own copy of these conventions, and that duplication is deliberate.

Each skill's **When to Use** ends with a negative trigger naming the neighboring skills it should not be confused with. Keep those lines in sync with the routing table in `README.md`.

## Registering a New Skill

Adding a skill to `skills/` (not `.experimental/`) is not complete until both of these are updated:

1. **`README.md`**: add a row to the skills index table with name, description, and version, plus a row in the routing table.
2. **`llms.txt`**: add a bullet to the Skills list with the description copied verbatim from the frontmatter.

Optional, and local only: `.claude-plugin/marketplace.json`. That directory is gitignored and never ships with the repository, so keep it in sync only if you maintain a local copy for plugin testing. It does not gate "done".

Skills under `skills/.experimental/` are not registered anywhere until promoted.

## Before You're Done

Run `node scripts/check-consistency.mjs`. It enforces most of this list mechanically and exits non-zero with the specific violation.

- [ ] Folder name is kebab-case and starts with `360-`
- [ ] Frontmatter `name` matches the folder name exactly
- [ ] `description` is two or three sentences, action-oriented, states when to use it
- [ ] `version` is valid semver
- [ ] Body follows the required section order
- [ ] Family conventions followed: priority vocabulary, handover fields, negative trigger
- [ ] `README.md` index, `README.md` routing table, and `llms.txt` are all updated (unless experimental)
- [ ] `node scripts/check-consistency.mjs` exits 0
