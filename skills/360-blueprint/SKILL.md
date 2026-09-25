---
name: 360-blueprint
description: Create an executable plan from a new objective with explicit tasks, constraints, and verification. Use when a goal exists but the path is unclear, or the request is "plan this".
version: 2.4.0
---

# 360 Blueprint

## Purpose

Turn a new objective into an executable plan with explicit assumptions, constraints, risks and acceptance checks.

## When to Use

- A new project, feature, migration, product, workflow, or initiative needs a plan
- A goal exists but the path is unclear
- Any request of the form "plan this"
- Not for hardening a plan that already exists (`360-expert-review`) or building one that is already final (`360-execute`)

## Core Principle

Resolve decisions that change success; make routine choices from evidence.

## Workflow

### Entry: Optional Token Efficiency

Reuse explicit approval or refusal for `360-token-efficiency` from this session. If unknown and not already offered, ask once whether to enable it for this session; continue the main task with the overlay inactive while unanswered. Explicit user invocation counts as approval; merely appearing in a generated plan does not. On approval, discover and load it through the host's supported skill mechanism, reusing already-loaded instructions. If unavailable, explain briefly and continue; do not install automatically. Refusal disables the overlay, not ordinary efficient habits. Revocation takes effect immediately. Keep consent in-session only; it does not authorize cross-session memory writes. The overlay never invokes itself or restarts the parent skill.

### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or `None`), Parallel, Effort, Priority, Done when (observable). Use `Priority: must | should | could`, `Effort: S | M | L`, and `Parallel: yes | no`. Only `should` and `could` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: `Draft` → `Ready for review` → `Reviewed and ready to execute`. Open blocking questions keep it `Draft`; a complete unreviewed plan is `Ready for review`; a passed review sets `Reviewed and ready to execute`. Material edits after review return it to `Ready for review` (or `Draft` if blocked). Execution progress belongs in the ledger, not the readiness status. An explicit user instruction to execute a supplied plan authorizes execution without a mandatory sibling review; record that basis without claiming a review occurred.

### Delivery

Prefer a recoverable file when supported, using the existing path or the default below. Honor explicit user output requests. If files are unavailable, deliver the same complete structure in-session and label it `in-session only; not persisted`; never claim a file was saved. With a saved file, chat normally carries a short briefing and its path. These delivery rules also apply to the templates and quality gate below.

Use observable preservation and acceptance checks. Structural validation cannot prove behavior or accuracy; evaluate realistic consent, capability, recovery, and handoff scenarios separately. Document unavailable telemetry and regressions; do not infer universal accuracy or token savings from finite tests.

### 1. Ground the Objective in the Current Project

- Inspect available instructions, plans, decisions, relevant artifacts, recent changes, verification and any execution ledger. Establish the current stage and done/pending/blocked work; cite sources and distinguish observed facts from claims. Record unavailable evidence
- Reuse current evidence and user answers. Resolve discoverable facts by inspection; do not ask the user to rediscover them
- Separate remaining gaps: material user decisions change the outcome, scope, acceptance criteria, significant cost or irreversible effects; reversible implementation defaults stay within established intent and conventions. Choose supported defaults, record the reason and revisit condition, and proceed. Do not present a default or inference as a fact
- Ask only for unresolved material decisions, conflicting instructions, or inaccessible facts needed to judge success. Use the available interactive question tool in focused rounds of one to three questions, with the best supported recommendation, its trade-off, and a free-text/custom option. For missing facts, request the needed evidence without inventing it. If tools are unavailable, offer equivalent numbered choices and notes in chat
- Unanswered required questions block dependent planning and readiness, not independent inspection. Silence, a recommendation, a preselected option or elapsed time is not an answer. Honor explicit delegation or deferral within its limits
- After answers, update the existing context, assumptions or review sections and inspect newly relevant evidence. Stop questioning when material choices are settled; reopen only on new conflicting evidence

### 2. Establish Readiness

- Restate the intended outcome, observable success and what must not happen
- Keep outcome-changing unanswered choices in `Draft`, with the required decision and affected tasks; do not relabel a blocker as a default
- A complete plan with supported defaults may be `Ready for review`. An optional companion offer does not block it
- If a draft is requested despite blockers, deliver it honestly and actively prompt the needed decisions

### 3. Examine Relevant Risks

- First principles: what is known, what is assumed, what is unknown
- Inversion: what would guarantee failure
- Second-order effects: what each major step sets in motion
- Stakeholders: who is affected, who decides, who executes, who can block
- Constraints: time, people, skills, systems, dependencies, unknowns

### 4. Design the Strategy

- Choose the simplest path that fully satisfies the objective
- Sequence by dependency and by risk
- Put discovery work first when uncertainty could invalidate the plan
- Declare what is out of scope and how scope changes are handled

### 5. Craft the Plan

- Structure the plan as phases and tasks
- Separate new capabilities from changes to existing features, behavior, or documents
- Every task states what, how, where, and done when
- Mark effort, priority, and parallelization
- Define the cut line
- Use established stack choices and conventions. Record reversible defaults and falsifiable assumptions with supporting evidence or a pending validation method in `Validated by`; keep material unresolved choices as blockers
- Keep names and terms consistent from start to finish
- Make the plan self-contained for a fresh executor

### 6. Enforce Quality by Domain

Turn quality goals into task-specific acceptance checks.

- Code: identify required outputs, boundaries, failure behavior and compatibility; add performance or scaling checks only for relevant workloads and constraints
- Documentation: identify the intended reader action, facts and links to preserve, and how the result will be checked; update existing material when it serves that need
- Other domains: state observable success and likely or severe plausible failure checks
- Reuse existing structure where it fits. Require a concrete maintenance or correctness benefit before adding abstraction or consolidating superficially similar logic

### 7. Stress-Test Before Delivery

- Walk the plan end to end
- Run a premortem
- Falsify assumptions
- Check whether different readings change success or safety; permit equivalent reversible implementations
- Verify every objective maps to tasks and every task serves an objective

### 8. Deliver in Two Channels

- Write the full plan to a file using the work-file template
- Reuse the existing path if known; otherwise `plans/<short-slug>.md`; create the folder if needed; ask once if the location is ambiguous
- If the file cannot be written, use the in-session delivery fallback
- With a saved file, print the terminal briefing and path
- If the plan deserves adversarial review before build, say so in plain language — no skill names
- Ensure required answers were resolved before ready/final delivery; keep unanswered blockers in `Draft`; never conclude by dumping passive questions at the end of the conversation

### Completion: Choose the Next Action

- Finish and verify the current deliverable first; make the result and its location available before asking about follow-on work. Keep artifact readiness separate from the next-action choice: an unanswered suggestion does not reopen completed work, and a blocked job is not complete
- Check the result, current project stage, remaining risks, and prior user instructions. Recommend the next useful action from the local routing guidance below; skip irrelevant stages and prefer stopping when no useful work remains
- Use an available interactive question tool to offer one concise next-action choice. Put the best recommendation first, explain why it fits this result, and include a stop/pause choice. Always allow a free-text note or custom direction, including work outside the 360 flow; never force the user into a sibling skill
- If interactive tools are unavailable, offer equivalent numbered choices with the recommendation, rationale, and explicit custom-note option in chat. This completion prompt is separate from the deliverable briefing; skill names are allowed here, and it is not a passive list of unresolved task questions
- Reuse an already explicit next-step instruction instead of asking again; continue work it authorizes. Otherwise wait for the user's choice before starting follow-on work. Silence, a preselected recommendation, and elapsed time are not authorization. An explicit stop or request for no suggestions suppresses the prompt
- When the user chooses, follow that direction and clarify only missing information needed for it. Discover and load a selected skill through the host's supported mechanism; do not assume it is installed or install it automatically. If unavailable, explain and offer an equivalent action. Carry forward artifact paths, decisions, verification, remaining risks, and session consent without restarting intake

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

## 5. Assumptions
| # | Assumption | Validated by |
|---|---|---|
| A1 |  |  |

## 6. Phases & Tasks
### Phase 1: <name>
Checkpoint:

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

### Terminal briefing

Use this shape. Omit any section that would be empty. Follow the Delivery rules for file or in-session output.

```text
<what this plan is> — plan is ready
Full plan: <path>

Features to add
- <new capability as an outcome>

Updates to existing
- <change to something that already exists>

Not adding
- <left out on purpose>

Issues found
- <problem or uncertainty> — <proven|likely|possible|uncertain>
```

- First line is `plan is ready` or `draft — open questions remain`
- Talk to the user, not the next agent. Outcomes, not tasks
- A new artifact is Features to add. A change to an existing artifact, feature, or document is Updates to existing. Never mix them
- Confidence: `proven` evidence in hand; `likely` strong reason; `possible` suspected; `uncertain` hypothesis. Never numbers
- No phases, tasks, MoSCoW, status tables, handover, or skill names
- Never append open questions, design choices, or trailing bullet lists at the end of the conversation (no `Need from you` dump). Use the clarification loop for every required question before concluding

## Quality Gate

- Completion includes the interactive next-action offer with a recommendation, stop choice, and custom-note option, or the explicit-instruction/parent-owned exception; unanswered suggestions do not block the completed deliverable

The plan is ready only when every answer is yes:

- The objective is clear and confirmed, or the output is explicitly marked `Draft`
- Current project stage and completed work were inspected, or unavailable evidence was explicitly recorded
- Existing answers were reused; follow-up rounds resolved the goal, scope, outline, and required details without treating silence or recommendations as consent
- No blocking question or decision was skipped
- Material unresolved decisions were actively prompted with evidence, recommendations and a free-text option; reversible defaults have a reason and revisit condition
- No invented technical details were presented as facts
- Every assumption is explicit and falsifiable
- Every task has what, how, where, done when, dependencies, skills, effort, priority, and parallel markings
- The cut line is defined
- Every objective maps to tasks and no orphan tasks remain
- New work and updates to existing work are grouped separately
- A fresh executor can distinguish requirements, defaults, assumptions and unresolved blockers
- Checkpoints and replanning triggers exist
- The premortem covered relevant requirements, likely failures and severe plausible failures; inspection limits are stated
- The deliverable follows the template and accurately states its location or in-session status
- The briefing omits empty sections and uses proven/likely/possible/uncertain, never numbers

Any "no" means the plan is not finished. Refine and review again.
