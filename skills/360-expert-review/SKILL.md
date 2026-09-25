---
name: 360-expert-review
description: Stress-test a draft plan, write the finalized executable plan back to the same file, and brief the user in chat. Use before executing any plan where a missed case could cause real damage.
version: 3.4.0
---

# 360 Expert Review

## Purpose

Expose concrete failure cases and weak assumptions in a draft plan, then revise it in place until applicable readiness checks pass or blockers are explicit.

## When to Use

- A plan changes real systems, data, users, money, security, or operations
- A wrong assumption or missed case could create real damage
- A plan needs adversarial review before execution
- Not for drafting plans from scratch (`360-blueprint`) or executing a finalized plan (`360-execute`)

## Core Principle

Try to disprove readiness with concrete failure cases.

## Workflow

### Entry: Optional Token Efficiency

Reuse explicit approval or refusal for `360-token-efficiency` from this session. If unknown and not already offered, ask once whether to enable it for this session; continue the main task with the overlay inactive while unanswered. Explicit user invocation counts as approval; merely appearing in a generated plan does not. On approval, discover and load it through the host's supported skill mechanism, reusing already-loaded instructions. If unavailable, explain briefly and continue; do not install automatically. Refusal disables the overlay, not ordinary efficient habits. Revocation takes effect immediately. Keep consent in-session only; it does not authorize cross-session memory writes. The overlay never invokes itself or restarts the parent skill.

### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or `None`), Parallel, Effort, Priority, Done when (observable). Use `Priority: must | should | could`, `Effort: S | M | L`, and `Parallel: yes | no`. Only `should` and `could` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: `Draft` → `Ready for review` → `Reviewed and ready to execute`. Open blocking questions keep it `Draft`; a complete unreviewed plan is `Ready for review`; a passed review sets `Reviewed and ready to execute`. Material edits after review return it to `Ready for review` (or `Draft` if blocked). Execution progress belongs in the ledger, not the readiness status. An explicit user instruction to execute a supplied plan authorizes execution without a mandatory sibling review; record that basis without claiming a review occurred.

### Delivery

Prefer a recoverable file when supported, using the existing path or the default below. Honor explicit user output requests. If files are unavailable, deliver the same complete structure in-session and label it `in-session only; not persisted`; never claim a file was saved. With a saved file, chat normally carries a short briefing and its path. These delivery rules also apply to the templates and quality gate below.

Use observable preservation and acceptance checks. Structural validation cannot prove behavior or accuracy; evaluate realistic consent, capability, recovery, and handoff scenarios separately. Document unavailable telemetry and regressions; do not infer universal accuracy or token savings from finite tests.

### 1. Understand the Project First

- Inspect available instructions, plans, decisions, relevant artifacts, recent changes, verification and any execution ledger. Establish the current stage and done/pending/blocked work; cite sources and distinguish observed facts from claims. Record unavailable evidence
- Reuse current evidence and user answers. Resolve discoverable facts by inspection; do not ask the user to rediscover them
- Separate remaining gaps: material user decisions change the outcome, scope, acceptance criteria, significant cost or irreversible effects; reversible implementation defaults stay within established intent and conventions. Choose supported defaults, record the reason and revisit condition, and proceed. Do not present a default or inference as a fact
- Ask only for unresolved material decisions, conflicting instructions, or inaccessible facts needed to judge success. Use the available interactive question tool in focused rounds of one to three questions, with the best supported recommendation, its trade-off, and a free-text/custom option. For missing facts, request the needed evidence without inventing it. If tools are unavailable, offer equivalent numbered choices and notes in chat
- Unanswered required questions block dependent planning and readiness, not independent inspection. Silence, a recommendation, a preselected option or elapsed time is not an answer. Honor explicit delegation or deferral within its limits
- After answers, update the existing context, assumptions or review sections and inspect newly relevant evidence. Stop questioning when material choices are settled; reopen only on new conflicting evidence
- Compare the supplied plan with current artifacts before judging it. Identify stale assumptions, duplicated completed work and conflicting decisions; preserve valid task IDs and progress records

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

### 3. Check Relevant User Outcomes

- Trace the real need through normal use, likely failures and severe plausible failures
- Check empty, error, interrupted and recovery states where they affect this task
- Include affected user groups, accessibility and connectivity constraints when relevant; state inspection limits

### 4. Make Findings Actionable

- For each actionable finding, name its trigger, consequence, evidence or explicit hypothesis, and smallest correction or next check
- Rank consequence separately from confidence. A plausible severe failure can justify investigation without being a proven defect
- Require work only when it protects a requirement or addresses a concrete material failure; speculative improvements remain optional
- Map only affected components, interfaces and state. Check retries, duplicates, concurrency, dependencies and rollback where those mechanisms exist

### 5. Check Reliability and Traceability

- Trace relevant requirements to implementation tasks and observable verification
- Add validation, failure handling, security, compatibility, monitoring and ownership only where a concrete risk demands them
- Prefer the simplest correction that protects the intended outcome; do not introduce operational machinery into an unrelated documentation task

### 6. Define Proportionate Verification

- Match each acceptance check to the consequence it detects; “works correctly” is not observable
- Distinguish a reviewed plan from a verified implementation. A planned test has not run
- Mark irrelevant checks non-applicable with reasons. Missing evidence remains unknown; obtain it or disclose the resulting limitation/blocker

### 7. Attack the Plan

Switch to hostile critic. Ask:

- What is assumed but unproven?
- What is missing: a user, a state, a sequence, a permission, a failure mode?
- What is the most likely failure?
- What is the most damaging failure?
- Which step could be read two different ways?
- What cannot be detected, reproduced, or reversed?
- What can be simpler?

Fix actionable findings and recheck affected risks. Stop when applicable checks pass and material blockers are resolved. An unavailable check stays unknown; if it prevents judging readiness, keep the plan non-final and name the missing evidence or decision. Otherwise disclose the limit without manufacturing required work. Use the clarification loop only for material user decisions; record routine defaults. Do not loop indefinitely.

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
- Relevant requirements, likely failures and severe plausible failures were checked; inspection limits are explicit
- Every actionable finding has a trigger, consequence, evidence or hypothesis, and smallest correction; severity and confidence are separate
- Relevant requirements are traceable to tasks and observable verification; monitoring is included only where needed
- Material failure cases have proportionate detection, diagnosis and recovery checks
- The design is clear, consistent, and as simple as possible
- Testing matches the risk
- Release and rollback checks address the plan’s relevant failure cases
- The plan survived hostile review
- Material decisions were resolved through the clarification loop; defaults and unknown evidence are explicit, never silent passes
- Task IDs were preserved or changed with a stated reason
- New work and updates to existing work are grouped separately
- The finalized plan preserves its original location where supported, or follows the Delivery fallback
- The briefing omits empty sections and uses proven/likely/possible/uncertain, never numbers

Any unresolved "no" keeps the plan non-final. Fix actionable findings or report the blocker and the evidence or decision needed to resolve it.
