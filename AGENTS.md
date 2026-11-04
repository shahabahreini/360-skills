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
5. **Output Format**: the exact shape of the final deliverable. May carry a domain-specific heading instead (`Plan Template`, `Final Plan Format`, `Audit Report Format`) as long as it defines that exact shape. Every skill that delivers an artifact also defines a `Reader's Briefing` here (see Reader's Briefing Convention).
6. **Quality Gate**: a yes/no checklist that must fully pass before the work is considered done

## Style Rules

- Brief. Imperative. No filler.
- No redundant restrictions. Say a thing once, in the place it matters.
- Usable by any agent, not just one product's assistant.
- Prefer concrete checklists and steps over abstract advice.
- Use one governing idea in Core Principle, operational decisions in Workflow, and observable checks in Quality Gate.
- Distinguish facts, reversible defaults, assumptions and unknowns. Ask about material decisions; resolve routine choices from evidence and existing authorization.
- Check relevant requirements, likely failures and severe plausible failures; disclose inspection limits instead of promising exhaustive reliability.
- An unknown check never passes. A bounded assessment can finish with disclosed limits; implementation requires its acceptance evidence.
- Have agents check version-specific or fast-moving facts (APIs, versions, standards, advisories) against the project and current primary sources, or record them as assumptions with a check.
- Name capabilities, not host products or tool names, in `SKILL.md` ("the host's background-subagent mechanism", not a specific tool). Host-specific notes belong in a dated reference file. The validator rejects known host tool names in entrypoints.
- Do not tie a rule to current model behavior, prices or benchmark anecdotes. State the rule and its reason so a more capable model can apply it to cases the text does not list.

### Writing for agents

- Lead each step with the action. Give the reason in a clause when the rule is not self-evident; a rule with a reason generalizes, a bare prohibition gets over-applied.
- Prefer a positive instruction to a list of prohibitions. Keep `never` for actions that are unsafe or irreversible.
- Use one term per concept across the skill (one name for each status, mode, file and role), and define it where it first appears.
- Put a rule in the one step where it applies. Quality Gate items check observable results; they do not restate the workflow.
- Ask the user only what evidence cannot settle, in one round where possible, with a recommendation and its trade-off first.

### Writing for users

- Briefings, status lines and questions use plain words, short sentences and concrete results ("tests pass: 35/35"), not process narration.
- State confidence with the shared vocabulary (proven, likely, possible, uncertain). Do not inflate or hedge beyond the evidence.
- A question names the decision, the recommended answer and what each choice changes. It stands on its own without the earlier conversation.

## Family Conventions

Skills install individually. Repeat the following contract locally in every skill that emits or consumes plans; do not require another skill's installation or template. Preserve valid existing plan structure.

### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or `None`), Parallel, Effort, Priority, Done when (observable). Use `Priority: must | should | could`, `Effort: S | M | L`, and `Parallel: yes | no`. Only `should` and `could` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: `Draft` → `Ready for review` → `Reviewed and ready to execute`. Open blocking questions keep a plan `Draft`; a complete unreviewed plan is `Ready for review`; only a passed review sets `Reviewed and ready to execute`, and material edits after it return the plan to `Ready for review` (or `Draft` if blocked). Execution progress lives in the ledger, not in this status. An explicit user instruction to execute a supplied plan authorizes execution without a sibling review; record that basis and never claim a review occurred.

Every skill that produces a handover uses these six fields:

> Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early

Each skill's **When to Use** ends with a single `- Not for ...` line naming its neighboring skills in backticks. Copy that line (without the bullet) into the README routing table's **Not for** column. The validator checks both destinations and exact synchronization.

### Optional Companion Convention

Every sibling skill, including future additions, starts its Workflow with this identical entry step. Token efficiency carries its own non-recursive consent handling.

### Entry: Optional Token Efficiency

Reuse this session's approval or refusal of `360-token-efficiency`. If unknown and not yet offered, ask once, in the same question round as any other entry question, and keep the overlay off until answered. Explicit user invocation is approval; a plan that lists the skill is not. On approval, load it through the host's skill mechanism, reusing instructions already loaded; if unavailable, say so briefly and continue without installing it. Refusal turns the overlay off, not ordinary efficient work. Revocation takes effect immediately. Consent lasts this session only and never authorizes cross-session memory writes.

Consent is a session decision, not a prerequisite for the main task. Keep unknown/offered, approved, refused, and revoked state in-session across skill handoffs. An unanswered offer is not approval and must not be repeated on each handoff. A new session starts unknown. Do not persist consent in faculty dossiers or other cross-session memory.

### Portable Delivery and Verification

Every sibling repeats these Delivery rules inside Workflow:

### Delivery

Write the deliverable to a recoverable file when the host supports it, at the existing path or the default below. Honor explicit user output requests. Without files, deliver the same complete structure in chat labeled `in-session only; not persisted`, and never claim a file was saved. With a saved file, chat carries the Reader's Briefing and the path. In a non-interactive run where no one can answer, do not wait: record each open question, apply only reversible defaults, mark readiness honestly, and deliver.

Judge completion by observable acceptance checks. A structural or format check does not prove behavior or accuracy; state what was not verified.

### Reader's Briefing Convention

The full artifact serves the next agent; the Reader's Briefing serves the user. Every skill that carries the Delivery rules defines a `### Reader's Briefing` template in its output section, followed by these shared rules and then any local rules:

Briefing rules:

- Write for a reader who has not seen the full artifact; define or drop any term of art
- One line per bullet, 20 words or fewer; the whole briefing fits one screen (about 25 lines)
- Outcomes and decisions, not mechanics: no task IDs, phases, priorities, status tables, executor notes or skill names
- Keep new things and changes to existing things in separate sections
- Confidence is proven (evidence in hand), likely (strong reason), possible (suspected), or uncertain (hypothesis). Never numbers; never proven without evidence
- The second line names the full artifact's path, or says `in-session only; not persisted`
- Omit empty sections unless this skill marks one as always present

Each such skill includes this rule in Workflow, before the completion step:

- Print the Reader's Briefing in chat before any next-action question; when the host sends one message, the briefing comes first

### Interactive Completion Convention

Every skill, including future additions, ends its Workflow with the following completion step and local, result-dependent routing guidance. The token-efficiency companion shares its parent’s prompt; standalone use still offers a next action. Include a matching Quality Gate item. Preserve deliverable formats; this is a separate interaction.

### Completion: Choose the Next Action

- Deliver and verify the current result first, with its location. An unanswered suggestion never reopens finished work, and a blocked job is not complete
- Recommend one next action from the local routing below, based on the result, project stage, open risks and prior instructions. Skip stages that do not apply; recommend stopping when no useful work remains
- Ask with the host's interactive question tool, or with numbered choices in chat when there is none: the recommendation first with its reason, a stop option, and a free-text option for any direction, inside or outside the 360 skills. This prompt is separate from the briefing and is not a list of open task questions
- An explicit next-step instruction answers this prompt, and an explicit stop or request for no suggestions suppresses it. Otherwise wait for the user's choice; in a non-interactive run, state the recommendation and stop. Silence, a preselected recommendation, and elapsed time are not authorization. On a choice, clarify only what is missing, load a selected skill through the host's mechanism without installing it (offer an equivalent if it is unavailable), and carry forward paths, decisions, verification, risks and session consent

Use these exact Quality Gate items in each skill:

- Completion offered one recommended next action with stop and free-text options, or followed an explicit instruction or the parent skill's prompt; an unanswered suggestion does not block the finished deliverable

For skills with a Reader's Briefing, also include:

- The Reader's Briefing was printed in chat before any next-action question

## Registering a New Skill

Adding a skill to `skills/` (not `.experimental/`) is not complete until both of these are updated:

1. **`README.md`**: add a row to the skills index table with name, description, and version, plus a row in the routing table.
2. **`llms.txt`**: add a bullet to the Skills list with the description copied verbatim from the frontmatter.

Optional, and local only: `.claude-plugin/marketplace.json`. That directory is gitignored and never ships with the repository, so keep it in sync only if you maintain a local copy for plugin testing. It does not gate "done".

Skills under `skills/.experimental/` are not registered anywhere until promoted.

## Before You're Done

Run `node scripts/build-llms-full.mjs`, `node --test scripts/*.test.mjs`, and `node scripts/check-consistency.mjs`. The checker validates public and experimental skill structure, local reference links, consent and plan contracts, routing/index registration, and compiled documentation. Experimental skills are excluded from indexes and the bundle. Fixture tests exercise both valid inputs and specific failures. Structural validation cannot prove behavior or accuracy: walk realistic consent, capability, recovery, and handoff scenarios separately, record unavailable telemetry and regressions, and do not infer universal accuracy or token savings from finite tests.

- [ ] Folder name is kebab-case and starts with `360-`
- [ ] Frontmatter `name` matches the folder name exactly
- [ ] `description` is two or three sentences, action-oriented, states when to use it
- [ ] `version` is valid semver
- [ ] Body follows the required section order
- [ ] Family conventions followed: priority vocabulary, handover fields, negative trigger, Reader's Briefing
- [ ] `README.md` index, `README.md` routing table, and `llms.txt` are all updated (unless experimental)
- [ ] `node scripts/check-consistency.mjs` exits 0

Supporting Markdown references belong inside the skill directory and must be linked from its entrypoint or another reachable reference. Load them only when relevant. The compiled bundle includes these references for single-fetch use; routine skill loading does not.
