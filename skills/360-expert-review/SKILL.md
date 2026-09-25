---
name: 360-expert-review
description: Stress-test a draft plan, write the finalized executable plan back to the same file, and brief the user in chat. Use before executing any plan where a missed case could cause real damage.
version: 3.3.0
---

# 360 Expert Review

## Purpose

Run this skill before finalizing any important plan. Turn a draft into the strongest executable plan by exposing missing scenarios, weak assumptions, and hidden failure modes.

Prefer a file for the full deliverable and a short chat briefing; use the Delivery rules below.

## When to Use

- A plan changes real systems, data, users, money, security, or operations
- A wrong assumption or missed case could create real damage
- A plan needs adversarial review before execution
- Not for drafting plans from scratch (`360-blueprint`) or executing a finalized plan (`360-execute`)

## Core Principle

- Review the plan the way a senior team would: user impact, reliability, security, operations, and domain correctness
- Attack it hard enough that only the strongest version survives
- Finalize into the existing plan file. Do not replace tasks with a narrative essay
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

### 1. Understand the Project First

- Before asking task questions, inspect the available project context: instructions, existing plans and decisions, relevant artifacts or implementation, recent changes, verification results, and any execution ledger. Establish the current stage and what is done, pending, or blocked; cite evidence and distinguish verified state from claims. If nothing exists yet, record that; if access is unavailable, state the gap and ask only for the missing context that changes the work
- Reuse answers already supplied by the user or established by current evidence. Do not ask generic intake questions, ask the user to rediscover accessible facts, or reopen settled decisions without new conflicting evidence
- Build a short gap list covering the goal, success measures, scope boundaries, high-level outline, constraints, dependencies, and details needed to execute or judge the plan without guessing. Resolve discoverable facts first; ask the user only about remaining decisions, contradictions, or unavailable facts
- Use the host's available interactive question tool for every user question. Offer small, focused rounds of one to three questions; for each decision, give concrete options, put the best supported recommendation first, and briefly explain its evidence and trade-off. Always allow a free-text note or custom answer alongside the options. For missing facts, request a note and recommend what information to include; do not invent an answer or a recommendation unsupported by evidence
- If interactive tools are unavailable, present the same numbered choices, recommendation with rationale, and explicit free-text note option in chat, then wait for the answer
- After each answer, update the known facts and decisions, inspect newly relevant evidence, and ask the next unresolved questions. Continue until the goal, scope, outline, and required details are clear; do not stop after a fixed questionnaire or repeat answered questions. Re-enter this loop if later planning or review exposes a new gap
- Treat a recommendation, preselected option, silence, or elapsed time as unanswered. Continue independent inspection while waiting, but do not decide dependent work or claim readiness. Preserve explicit user deferrals or delegated choices with their limits; keep unresolved blockers in `Draft`
- Summarize the resulting understanding and record evidence, current stage, completed work, decisions, and remaining uncertainty within the existing context, assumptions, or review sections. Ask for confirmation only where the user's answers and evidence have not already settled the issue; stop questioning when a fresh executor or reviewer can proceed without material guessing
- Compare the supplied plan with the observed project stage and completed work before judging it. Surface stale assumptions, duplicated completed tasks, and conflicts with existing decisions; preserve valid task IDs and progress records

### 2. Review Through Expert Lenses

Use only the lenses this project needs:

- Architecture: boundaries, simplicity, trade-offs
- Engineering: correctness, edge cases, integration, performance
- Product and UX: user value, friction, recovery, accessibility
- QA: scenario coverage, regressions, acceptance criteria
- Operations: deployment, observability, rollback
- Security and privacy: access, data exposure, abuse cases
- Domain: business rules, terminology, real-world accuracy

Do not role-play personas. Extract findings directly from each lens.

### 3. Cover the User Completely

- Solve the real need with the lowest-friction path that works
- Cover empty, loading, error, interrupted, and recovery states
- Prevent lost work, confusion, and irreversible mistakes
- Include first-time, returning, low-skill, accessibility, and poor-connectivity users when relevant

### 4. Cover Every Scenario and Effect

- Map affected components, data, APIs, permissions, integrations, and existing behavior
- Cover happy paths, edge cases, invalid input, retries, duplicates, and concurrency
- Cover dependency failures, timeouts, partial completion, degraded performance, migrations, mixed versions, and rollback
- Every risk needs prevention, detection, mitigation, or rollback

### 5. Guarantee Reliability and Traceability

- Validation, error handling, idempotency, and graceful failure where relevant
- Security, privacy, performance, and compatibility where relevant
- The simplest design that fully works
- Every requirement traceable to implementation, tests, monitoring, and ownership
- Debugging path: meaningful errors, structured logs, correlation IDs, metrics, alerts, and reproduction path

### 6. Verify Everything

- Define testing proportional to risk
- Every acceptance criterion must be observable
- "Works correctly" is not a criterion

### 7. Attack the Plan

Switch to hostile critic. Ask:

- What is assumed but unproven?
- What is missing: a user, a state, a sequence, a permission, a failure mode?
- What is the most likely failure?
- What is the most damaging failure?
- Which step could be read two different ways?
- What cannot be detected, reproduced, or reversed?
- What can be simpler?

Fix actionable findings, then recheck the affected risks. Stop when applicable acceptance checks pass and no unresolved high-severity blocker remains. If evidence or a user decision is unavailable, record a concrete blocker and stop that review line; do not loop indefinitely or claim finality. When a decision, design trade-off, or ambiguity requires user input (even for task-level shapes or non-blocking details), return to the clarification loop and resolve the required input before finalizing; do not dump questions as trailing chat bullets. Mark non-applicable checks with a reason.

### 8. Write the Final Plan

- Update the draft in place using the local minimum contract below. Preserve valid existing headings and structure; no sibling installation is required
- Preserve task IDs; add, split, or drop a task only with a stated reason
- Keep new work and updates to existing work in separate scope lists
- Put review findings, key decisions, and remaining risks in a short appendix in that same file
- Include the executor handover in the chosen delivery format
- If the file cannot be written, use the in-session delivery fallback
- With a saved file, print the terminal briefing and path
- Ensure required answers were resolved before ready/final delivery; keep unanswered blockers in `Draft`; never conclude by dumping passive questions at the end of the conversation

### Completion: Choose the Next Action

- Finish and verify the current deliverable first; make the result and its location available before asking about follow-on work. Keep artifact readiness separate from the next-action choice: an unanswered suggestion does not reopen completed work, and a blocked job is not complete
- Check the result, current project stage, remaining risks, and prior user instructions. Recommend the next useful action from the local routing guidance below; skip irrelevant stages and prefer stopping when no useful work remains
- Use an available interactive question tool to offer one concise next-action choice. Put the best recommendation first, explain why it fits this result, and include a stop/pause choice. Always allow a free-text note or custom direction, including work outside the 360 flow; never force the user into a sibling skill
- If interactive tools are unavailable, offer equivalent numbered choices with the recommendation, rationale, and explicit custom-note option in chat. This completion prompt is separate from the deliverable briefing; skill names are allowed here, and it is not a passive list of unresolved task questions
- Reuse an already explicit next-step instruction instead of asking again; continue work it authorizes. Otherwise wait for the user's choice before starting follow-on work. Silence, a preselected recommendation, and elapsed time are not authorization. An explicit stop or request for no suggestions suppresses the prompt
- When the user chooses, follow that direction and clarify only missing information needed for it. Discover and load a selected skill through the host's supported mechanism; do not assume it is installed or install it automatically. If unavailable, explain and offer an equivalent action. Carry forward artifact paths, decisions, verification, remaining risks, and session consent without restarting intake

Local routing: Recommend `360-execute` for a finalized executable plan. For a blocked or incomplete review, offer resolution of the concrete blocker or `360-blueprint` for substantial replanning; do not present execution as ready.

## Output Format

### Work file

Preserve the existing plan and fill only missing contract elements. Minimum standalone shape:

1. Metadata: objective, status, version/date
2. Objective and observable definition of done
3. Context, constraints, scope, assumptions, open questions and decisions
4. Strategy, alternatives, change policy and cut line
5. Phases and tasks using the Shared Plan Contract, with checkpoints
6. Risks and countermeasures
7. Per-task and overall verification, replanning triggers and traceability
8. Handover: Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early
9. Review appendix: findings, decisions, remaining risks, applicable checks and blockers

Set `Reviewed and ready to execute` only when the applicable Quality Gate passes. Otherwise use `Draft` for blockers and `Ready for review` for incomplete review without blockers. Preserve user-approved trade-offs; record unresolved high-severity risks as blockers. A typical appendix (retain an existing heading when present):

```markdown
## 11. Review appendix
- Findings:
- Decisions:
- Remaining risks:
- Applicable checks and evidence:
- Non-applicable checks and reasons:
- Blockers and resolution needed:
```

Do not replace the task list with a narrative plan.

### Terminal briefing

Use this shape. Omit any section that would be empty. Follow the Delivery rules for file or in-session output.

```text
<what this plan is> — plan is final
Full plan: <path>

What changed
- <material delta from the draft>

Features to add
- <new capability as an outcome>

Updates to existing
- <change to something that already exists>

Issues found
- <hole, bug, or weak assumption> — <proven|likely|possible|uncertain>

Remaining risks
- <accepted risk> — <likely|possible|uncertain>
```

- First line is `plan is final` or `not final — <specific blocker or remaining review>`
- Talk to the user, not the next agent. Outcomes, not tasks
- A new artifact is Features to add. A change to an existing artifact, feature, or document is Updates to existing. Never mix them
- Confidence: `proven` evidence in hand; `likely` strong reason; `possible` suspected; `uncertain` hypothesis. Never numbers. Never say proven without evidence
- No phases, tasks, skill names, or review-essay dump
- Never append open questions, design choices, or trailing bullet lists at the end of the conversation (no `Need from you` dump). Use the clarification loop for every required question before concluding

## Quality Gate

- Completion includes the interactive next-action offer with a recommendation, stop choice, and custom-note option, or the explicit-instruction/parent-owned exception; unanswered suggestions do not block the completed deliverable

The plan is final only when every applicable answer is yes (record a reason for each non-applicable item):

- Real user need understood and served
- Current project stage and completed work were inspected, or unavailable evidence was explicitly recorded
- Existing answers were reused; follow-up rounds resolved the goal, scope, outline, and required details without treating silence or recommendations as consent
- The right expert lenses were applied
- Every important scenario and effect was mapped
- Every risk has a countermeasure
- Requirements are traceable to code, tests, and monitoring
- Failures are detectable, reproducible, diagnosable, and fixable
- The design is clear, consistent, and as simple as possible
- Testing matches the risk
- Release and rollback are safe
- The plan survived hostile review
- Every blocker, ambiguity, and decision requiring user input was actively prompted through the evidence-grounded interactive clarification loop with recommendations and a free-text note option before completing, never dumped as trailing bullets at the end of the turn
- Task IDs were preserved or changed with a stated reason
- New work and updates to existing work are grouped separately
- The finalized plan preserves its original location where supported, or follows the Delivery fallback
- The briefing omits empty sections and uses proven/likely/possible/uncertain, never numbers

Any unresolved "no" keeps the plan non-final. Fix actionable findings or report the blocker and the evidence or decision needed to resolve it.
