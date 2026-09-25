---
name: 360-blueprint
description: Create an executable plan from a new objective with explicit tasks, constraints, and verification. Use when a goal exists but the path is unclear, or the request is "plan this".
version: 2.3.0
---

# 360 Blueprint

## Purpose

Run this skill when a plan must be created from scratch. Turn an objective into an executable plan with explicit assumptions, constraints, and risks.

Prefer a file for the full deliverable and a short chat briefing; use the Delivery rules below.

This skill creates plans. To review and finalize one, use `360-expert-review`.

## When to Use

- A new project, feature, migration, product, workflow, or initiative needs a plan
- A goal exists but the path is unclear
- Any request of the form "plan this"
- Not for hardening a plan that already exists (`360-expert-review`) or building one that is already final (`360-execute`)

## Core Principle

- A plan is finished when a fresh executor can act without guessing, and every task serves a real objective
- Begin at the end. Think from first principles. Design out failure. Prefer the simplest plan that fully works
- Ground questions in project evidence; provide recommended choices and a free-text note option before finishing; never dump trailing questions at the end of the conversation
- Preserve a recoverable record using the Delivery rules below

## Workflow

### Entry: Optional Token Efficiency

Reuse explicit approval or refusal for `360-token-efficiency` from this session. If unknown and not already offered, ask once whether to enable it for this session; continue the main task with the overlay inactive while unanswered. Explicit user invocation counts as approval; merely appearing in a generated plan does not. On approval, discover and load it through the host's supported skill mechanism, reusing already-loaded instructions. If unavailable, explain briefly and continue; do not install automatically. Refusal disables the overlay, not ordinary efficient habits. Revocation takes effect immediately. Keep consent in-session only; it does not authorize cross-session memory writes. The overlay never invokes itself or restarts the parent skill.

### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or `None`), Parallel, Effort, Priority, Done when (observable). Use `Priority: must | should | could`, `Effort: S | M | L`, and `Parallel: yes | no`. Only `should` and `could` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: `Draft` → `Ready for review` → `Reviewed and ready to execute`. Open blocking questions keep it `Draft`; a complete unreviewed plan is `Ready for review`; a passed review sets `Reviewed and ready to execute`. Material edits after review return it to `Ready for review` (or `Draft` if blocked). Execution progress belongs in the ledger, not the readiness status. An explicit user instruction to execute a supplied plan authorizes execution without a mandatory sibling review; record that basis without claiming a review occurred.

### Delivery

Prefer a recoverable file when supported, using the existing path or the default below. Honor explicit user output requests. If files are unavailable, deliver the same complete structure in-session and label it `in-session only; not persisted`; never claim a file was saved. With a saved file, chat normally carries a short briefing and its path. These delivery rules also apply to the templates and quality gate below.

### 1. Ground the Objective in the Current Project

- Before asking task questions, inspect the available project context: instructions, existing plans and decisions, relevant artifacts or implementation, recent changes, verification results, and any execution ledger. Establish the current stage and what is done, pending, or blocked; cite evidence and distinguish verified state from claims. If nothing exists yet, record that; if access is unavailable, state the gap and ask only for the missing context that changes the work
- Reuse answers already supplied by the user or established by current evidence. Do not ask generic intake questions, ask the user to rediscover accessible facts, or reopen settled decisions without new conflicting evidence
- Build a short gap list covering the goal, success measures, scope boundaries, high-level outline, constraints, dependencies, and details needed to execute or judge the plan without guessing. Resolve discoverable facts first; ask the user only about remaining decisions, contradictions, or unavailable facts
- Use the host's available interactive question tool for every user question. Offer small, focused rounds of one to three questions; for each decision, give concrete options, put the best supported recommendation first, and briefly explain its evidence and trade-off. Always allow a free-text note or custom answer alongside the options. For missing facts, request a note and recommend what information to include; do not invent an answer or a recommendation unsupported by evidence
- If interactive tools are unavailable, present the same numbered choices, recommendation with rationale, and explicit free-text note option in chat, then wait for the answer
- After each answer, update the known facts and decisions, inspect newly relevant evidence, and ask the next unresolved questions. Continue until the goal, scope, outline, and required details are clear; do not stop after a fixed questionnaire or repeat answered questions. Re-enter this loop if later planning or review exposes a new gap
- Treat a recommendation, preselected option, silence, or elapsed time as unanswered. Continue independent inspection while waiting, but do not decide dependent work or claim readiness. Preserve explicit user deferrals or delegated choices with their limits; keep unresolved blockers in `Draft`
- Summarize the resulting understanding and record evidence, current stage, completed work, decisions, and remaining uncertainty within the existing context, assumptions, or review sections. Ask for confirmation only where the user's answers and evidence have not already settled the issue; stop questioning when a fresh executor or reviewer can proceed without material guessing

### 2. Confirm Before Generating

- Restate the objective in the user's terms; check feasibility, what done means, and what must not happen
- Resolve the gap list through the clarification loop before generating the plan. Do not bypass a required answer by calling it a task-shape or detail-only question
- Do not deliver a ready plan while required answers are pending. An optional companion offer does not block delivery
- If the user explicitly asks for a draft despite uncertainty, label it `Draft`, record open questions in the plan file, and actively prompt decisions needed to proceed
- Never conclude with a passive list of questions or a `Need from you` section

### 3. See From Every Angle

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
- Do not invent stack choices, vendors, metrics, or architecture details. If a choice is required but unknown, write it as an open question
- Keep names and terms consistent from start to finish
- Make the plan self-contained for a fresh executor

### 6. Enforce Quality by Domain

Apply the standards of the domain the plan touches.

When the plan produces code: maintainable, scalable, auditable, no duplication, no weak logic, no outdated practices.

When the plan produces documentation: update before creating, one source of truth, clean structure, easy to find.

For any other domain, define that domain's quality bar explicitly and enforce it.

### 7. Stress-Test Before Delivery

- Walk the plan end to end
- Run a premortem
- Falsify assumptions
- Check whether two executors could read the same step two different ways
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
- Every question, ambiguity, and decision was actively prompted through the evidence-grounded interactive clarification loop with recommendations and a free-text note option before completing, never dumped as trailing bullets at the end of the turn
- No invented technical details were presented as facts
- Every assumption is explicit and falsifiable
- Every task has what, how, where, done when, dependencies, skills, effort, priority, and parallel markings
- The cut line is defined
- Every objective maps to tasks and no orphan tasks remain
- New work and updates to existing work are grouped separately
- A fresh executor can act without guessing
- Checkpoints and replanning triggers exist
- The plan survived a premortem
- The deliverable follows the template and accurately states its location or in-session status
- The briefing omits empty sections and uses proven/likely/possible/uncertain, never numbers

Any "no" means the plan is not finished. Refine and review again.
