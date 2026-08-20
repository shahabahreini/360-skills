# AGENTS.md — Contributor Guide for Agents

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

- `name` — must exactly match the folder name
- `description` — a single sentence, action-oriented, that tells an agent both what the skill does and when to reach for it
- `version` — semantic version (`MAJOR.MINOR.PATCH`)

## Required Skill Body Structure

Every `SKILL.md` follows this section order:

1. **Purpose** — why this skill exists, in one or two sentences
2. **When to Use** — concrete triggers for reaching for this skill
3. **Core Principle** — the single idea the skill is built around
4. **Workflow** — the ordered steps the agent executes
5. **Output Format** — the exact shape of the final deliverable
6. **Quality Gate** — a yes/no checklist that must fully pass before the work is considered done

## Style Rules

- Brief. Imperative. No filler.
- No redundant restrictions — say a thing once, in the place it matters.
- Usable by any agent, not just one product's assistant.
- Prefer concrete checklists and steps over abstract advice.

## Registering a New Skill

Adding a skill to `skills/` (not `.experimental/`) is not complete until both of these are updated:

1. **`README.md`** — add a row to the skills index table with name, one-line description, and status.
2. **`.claude-plugin/marketplace.json`** — add an entry to `plugins`:
   ```json
   {
     "name": "<skill-name>",
     "source": "./skills/<skill-name>",
     "description": "<same one-sentence description as the frontmatter>"
   }
   ```

Skills under `skills/.experimental/` are not registered in either file until promoted.

## Before You're Done

- [ ] Folder name is kebab-case and starts with `360-`
- [ ] Frontmatter `name` matches the folder name exactly
- [ ] `description` is one sentence, action-oriented, states when to use it
- [ ] `version` is valid semver
- [ ] Body follows the required section order
- [ ] README index and `marketplace.json` are both updated (unless experimental)
