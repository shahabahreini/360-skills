---
name: 360-blueprint
description: Create an executable plan from a new objective, asking questions until every requirement and default is confirmed, with explicit tasks, constraints, and verification. Use when a goal exists but the path is unclear, or the request is "plan this".
version: 2.8.1
---

# 360 Blueprint

## Purpose

Turn a new objective into an executable plan with explicit assumptions, constraints, risks and acceptance checks, then show the user a short plain-language briefing of what will change and what to expect.

## When to Use

- A new project, feature, migration, product, workflow, or initiative needs a plan
- A goal exists but the path is unclear
- Any request of the form "plan this"
- Not for hardening a plan that already exists (`360-expert-review`) or building one that is already final (`360-execute`)

## Core Principle

The smallest plan that meets every objective, planned only once every decision is answered by the user, proven by evidence, or a default the user confirmed.

## Workflow

### Entry: Optional Token Efficiency

Reuse this session's approval or refusal of `360-token-efficiency`. If unknown and not yet offered, ask once, in the same question round as any other entry question, and keep the overlay off until answered. Explicit user invocation is approval; a plan that lists the skill is not. On approval, load it through the host's skill mechanism, reusing instructions already loaded; if unavailable, say so briefly and continue without installing it. Refusal turns the overlay off, not ordinary efficient work. Revocation takes effect immediately. Consent lasts this session only and never authorizes cross-session memory writes.

### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or `None`), Parallel, Effort, Priority, Done when (observable). Use `Priority: must | should | could`, `Effort: S | M | L`, and `Parallel: yes | no`. Only `should` and `could` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: `Draft` → `Ready for review` → `Reviewed and ready to execute`. Open blocking questions keep a plan `Draft`; a complete unreviewed plan is `Ready for review`; only a passed review sets `Reviewed and ready to execute`, and material edits after it return the plan to `Ready for review` (or `Draft` if blocked). Execution progress lives in the ledger, not in this status. An explicit user instruction to execute a supplied plan authorizes execution without a sibling review; record that basis and never claim a review occurred.

### Delivery

Write the deliverable to a recoverable file when the host supports it, at the existing path or the default below. Honor explicit user output requests. Without files, deliver the same complete structure in chat labeled `in-session only; not persisted`, and never claim a file was saved. With a saved file, chat carries the Reader's Briefing and the path. In a non-interactive run where no one can answer, do not wait: record each open question, apply only reversible defaults, mark readiness honestly, and deliver.

Judge completion by observable acceptance checks. A structural or format check does not prove behavior or accuracy; state what was not verified.

### 1. Ground the Objective and Close Every Gap

- Inspect available instructions, plans, decisions, developer preference records (such as `faculty/` dossiers), relevant artifacts, recent changes, verification and any execution ledger. Establish the current stage and done/pending/blocked work; cite sources and distinguish observed facts from claims. Record unavailable evidence
- Reuse current evidence and user answers. Resolve discoverable facts by inspection; do not ask the user to rediscover them
- Track a clarity checklist: outcome and observable success; users and stakeholders; scope in and out; constraints (time, stack, budget, compatibility); acceptance and done-when; dependencies and integrations; must-not-happen and risk tolerance; preferences. Each dimension ends as answered by the user, proven by inspection (cite it), or a proposed default awaiting confirmation. Never present a default or inference as a fact
- Ask only about material decisions and facts that inspection cannot settle; routine reversible choices become proposed defaults for Step 2. Use the available interactive question tool in rounds of one to four questions, each with the best supported recommendation first, its trade-off, and a free-text/custom option. For missing facts, request the needed evidence without inventing it. If tools are unavailable, offer equivalent numbered choices and notes in chat
- After each round, update the checklist, inspect newly relevant evidence, and ask the next round. An answer that opens new ambiguity starts another round. Stop only when every dimension is answered, proven, or a proposed default
- Unanswered questions block dependent planning and readiness, not independent inspection. Silence, a recommendation, a preselected option or elapsed time is not an answer. Honor explicit delegation or deferral within its limits

### 2. Confirm Understanding and Defaults

- Before drafting, show one compact batch: goal, scope, out of scope, done-when, and every proposed default and assumption with its reason and revisit condition
- Offer `accept all`, `change some`, or a free-text note through the interactive question tool. Apply changes, then confirm again only what changed
- Explicit "you decide" delegation confirms the covered defaults. Silence does not; unconfirmed defaults keep the plan `Draft`

### 3. Establish Readiness

- Restate the intended outcome, observable success and what must not happen
- Keep unanswered or unconfirmed choices in `Draft`, with the required decision and affected tasks; do not relabel a blocker as a default
- A complete plan with confirmed defaults may be `Ready for review`. An optional companion offer does not block it
- If a draft is requested despite blockers, deliver it honestly and actively prompt the needed decisions

### 4. Examine Relevant Risks

- First principles: what is known, what is assumed, what is unknown
- Inversion: what would guarantee failure
- Second-order effects: what each major step sets in motion
- Stakeholders: who is affected, who decides, who executes, who can block
- Constraints: time, people, skills, systems, dependencies, unknowns

### 5. Design the Strategy

- Choose the simplest path that fully satisfies the objective
- Sequence by dependency and by risk
- Put discovery work first when uncertainty could invalidate the plan
- Declare what is out of scope and how scope changes are handled
- Run the footprint test on the chosen path. For every file, dependency, layer, setting, and abstraction the plan creates, name the objective that fails without it. Cut what fails the test
- Prefer, in order: change nothing, edit what exists, reuse what exists, add the smallest new thing
- State the footprint in the plan: files created, files edited, dependencies added, abstractions added

### 6. Craft the Plan

- Structure the plan as phases and tasks
- Separate new capabilities from changes to existing features, behavior, or documents
- Every task states what, how, where, and done when
- Mark effort, priority, and parallelization
- Define the cut line
- Write each phase checkpoint as something the user can see or run
- Fill `Skills` with the agent skills the executor should load for that task, or `None`
- Check version-specific details (APIs, versions, commands, limits) against the project and current official documentation when tools allow; otherwise record them as assumptions with a validation method
- Use established stack choices and conventions. Record confirmed defaults and falsifiable assumptions with supporting evidence or a pending validation method in `Validated by`; keep unresolved choices as blockers
- Keep names and terms consistent from start to finish
- Make the plan self-contained for a fresh executor

### 7. Enforce Quality by Domain

Turn quality goals into task-specific acceptance checks.

- Code: identify required outputs, boundaries, failure behavior and compatibility; add performance or scaling checks only for relevant workloads and constraints
- Documentation: identify the intended reader action, facts and links to preserve, and how the result will be checked; update existing material when it serves that need
- Other domains: state observable success and likely or severe plausible failure checks
- Reuse existing structure where it fits. Require a concrete maintenance or correctness benefit before adding abstraction or consolidating superficially similar logic

### 8. Stress-Test Before Delivery

- Walk the plan end to end
- Run a premortem
- Falsify assumptions
- Check whether different readings change success or safety; permit equivalent reversible implementations
- Verify every objective maps to tasks and every task serves an objective
- Reread the briefing as a stranger: can they say what changes and what they will see afterward?

### 9. Deliver in Two Channels

- Write the full plan to a file using the work-file template
- Reuse the existing path if known; otherwise `plans/<short-slug>.md`; create the folder if needed; ask once if the location is ambiguous
- If the file cannot be written, use the in-session delivery fallback
- Ensure required answers were resolved before ready delivery. Keep unanswered blockers in `Draft`. Never end by dumping passive questions
- Print the Reader's Briefing in chat before any next-action question; when the host sends one message, the briefing comes first

### Completion: Choose the Next Action

- Deliver and verify the current result first, with its location. An unanswered suggestion never reopens finished work, and a blocked job is not complete
- Recommend one next action from the local routing below, based on the result, project stage, open risks and prior instructions. Skip stages that do not apply; recommend stopping when no useful work remains
- Ask with the host's interactive question tool, or with numbered choices in chat when there is none: the recommendation first with its reason, a stop option, and a free-text option for any direction, inside or outside the 360 skills. This prompt is separate from the briefing and is not a list of open task questions
- An explicit next-step instruction answers this prompt, and an explicit stop or request for no suggestions suppresses it. Otherwise wait for the user's choice; in a non-interactive run, state the recommendation and stop. Silence, a preselected recommendation, and elapsed time are not authorization. On a choice, clarify only what is missing, load a selected skill through the host's mechanism without installing it (offer an equivalent if it is unavailable), and carry forward paths, decisions, verification, risks and session consent

Local routing: Recommend `360-faculty` when tailoring or expertise would materially improve the prepared plan; otherwise recommend `360-expert-review`. Honor an explicit instruction to execute the supplied plan without imposing another review.

## Output Format

### Work file

```markdown
# Plan: <title>

| Field | Value |
|---|---|
| Objective | <one sentence> |
| Status | Draft / Ready for review |
| Version | <version or date> |
| Created | <date> |

## 1. Objective & Definition of Done
- Goal:
- Done when:
- Success measures:
- Expected results: <what the user can see, run, or measure after each phase>
- Must not happen:

## 2. Context & Constraints
- Background:
- Constraints:
- Stakeholders:
- Open questions and decision points:

## 3. Strategy
- Chosen path:
- Why it wins:
- Alternatives rejected:

## 4. Scope
- New:
- Updates to existing:
- Explicitly out of scope:
- Change policy:
- Cut line: <only should/could below it>
- Footprint: <n> files created · <n> edited · <n> dependencies · <n> abstractions. Each new item names the objective it serves

## 5. Assumptions
| # | Assumption | Validated by |
|---|---|---|
| A1 |  |  |

## 6. Phases & Tasks
### Phase 1: <name>
Checkpoint: <what the user can see or run when this phase ends>

**Task 1.1 — <name>**
- What:
- How:
- Where:
- Depends on:
- Skills: <list or None>
- Parallel: yes | no
- Effort: S | M | L
- Priority: must | should | could
- Done when:

## 7. Risks & Countermeasures
| Risk | Impact | Countermeasure |
|---|---|---|

## 8. Verification & Replanning
- Per task:
- Overall:
- Replan when:

## 9. Traceability
| Objective | Covered by tasks |
|---|---|

## 10. Handover Summary
- Context:
- Decisions:
- State: done / pending / blocked
- Remaining tasks: what, how, where
- Verification:
- Risks and how to detect them early:
```

Handover fields: Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early

Fill every field or write `N/A` with a one-line reason.

### Reader's Briefing

Print this in chat. Follow the Delivery rules for file or in-session output.

```text
<plain title> — plan is ready          (or: draft — open questions remain)
Full plan: <path>

In one sentence
<what will be done and why, 25 words or fewer>

What you'll get
- <new thing, as something you can see or use>

What changes in what you already have
- <thing> — now: <current behavior>; after: <new behavior>

What to expect when it's done
- <result you can check yourself, and how>

Size
- About <n> files touched (<n> new, <n> edited), <n> new dependencies. Effort: small | medium | large

Left out on purpose
- <item> — <why>

Risks
- <risk in plain words> — <proven|likely|possible|uncertain>. You'd notice it by: <sign>
```

Briefing rules:

- Write for a reader who has not seen the full artifact; define or drop any term of art
- One line per bullet, 20 words or fewer; the whole briefing fits one screen (about 25 lines)
- Outcomes and decisions, not mechanics: no task IDs, phases, priorities, status tables, executor notes or skill names
- Keep new things and changes to existing things in separate sections
- Confidence is proven (evidence in hand), likely (strong reason), possible (suspected), or uncertain (hypothesis). Never numbers; never proven without evidence
- The second line names the full artifact's path, or says `in-session only; not persisted`
- Omit empty sections unless this skill marks one as always present
- A new artifact goes under `What you'll get`; a change to an existing one goes under `What changes`, showing now and after
- `What to expect` is always present and observable: a command that runs, a screen that shows, a number that moves. "Works correctly" is not allowed
- No trailing question list. Required questions use the clarification loop before delivery
- `Size` matches the plan's footprint line

## Quality Gate

The plan is ready only when every answer is yes:

- The objective is clear and confirmed, or the output is explicitly marked `Draft`
- Current project stage and completed work were inspected, or unavailable evidence was explicitly recorded
- Existing answers were reused; questioning rounds continued until every clarity dimension was answered, proven by inspection, or a confirmed default, without treating silence or recommendations as consent
- No material decision was skipped, and no open ambiguity was left untracked
- The restatement and the batch of defaults were shown together and confirmed; each default has a reason and revisit condition
- No invented technical details were presented as facts; version-specific details cite the project or a current source, or are recorded assumptions
- Every assumption is explicit and falsifiable
- Every task has what, how, where, done when, dependencies, skills, effort, priority, and parallel markings
- The cut line is defined
- Every objective maps to tasks and no orphan tasks remain
- New work and updates to existing work are grouped separately
- The footprint is stated, and every new file, dependency, and abstraction names the objective it serves
- No task adds a layer, setting, or generalization for a need that no objective names
- A fresh executor can distinguish requirements, defaults, assumptions and unresolved blockers
- Checkpoints and replanning triggers exist, and each checkpoint is something the user can see or run
- The premortem covered relevant requirements, likely failures and severe plausible failures; inspection limits are stated
- The deliverable follows the template and accurately states its location or in-session status
- A reader with no context can say what will change and what they will see afterward
- The briefing follows the briefing rules
- The Reader's Briefing was printed in chat before any next-action question
- Completion offered one recommended next action with stop and free-text options, or followed an explicit instruction or the parent skill's prompt; an unanswered suggestion does not block the finished deliverable

Any "no" means the plan is not finished. Refine and review again.
