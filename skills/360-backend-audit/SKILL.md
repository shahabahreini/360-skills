---
name: 360-backend-audit
description: Deep-audit backend code, write the full report to a file, and brief the user in chat with bugs, updates, and dead weight. Use before or after significant backend work, or when inheriting, refactoring, or handing off services.
version: 2.1.0
---

# 360 Backend Audit

## Purpose

Run this skill on backend code: APIs, services, business logic, data access layers, integrations, background jobs, and pipelines. Identify correctness, structure, performance, and observability risks with evidence and actionable recommendations.

Technology-agnostic: audit logic, structure, and data flow, not stack syntax.

Prefer a file for the full deliverable and a short chat briefing; use the Delivery rules below.

## When to Use

- Before or after merging significant backend work
- When inheriting, refactoring, or modernizing services or data layers
- When code feels heavy, fragile, slow, or hard to debug
- Before handing code to another engineer or AI agent
- Not for planning work that does not exist yet (`360-blueprint`) or executing a plan (`360-execute`)

## Core Principle

Working backend code is not finished code. Audit what exists that should not, what exists twice, what is subtly wrong, what may fail under load, what cannot be diagnosed when it breaks, and what the next engineer needs to continue safely.

Functionality, reliability, and accuracy are untouchable. A fast bug is still a bug.

Preserve a recoverable audit using the Delivery rules below.

## Workflow

### Entry: Optional Token Efficiency

Reuse explicit approval or refusal for `360-token-efficiency` from this session. If unknown and not already offered, ask once whether to enable it for this session; continue the main task with the overlay inactive while unanswered. Explicit user invocation counts as approval; merely appearing in a generated plan does not. On approval, discover and load it through the host's supported skill mechanism, reusing already-loaded instructions. If unavailable, explain briefly and continue; do not install automatically. Refusal disables the overlay, not ordinary efficient habits. Revocation takes effect immediately. Keep consent in-session only; it does not authorize cross-session memory writes. The overlay never invokes itself or restarts the parent skill.

### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or `None`), Parallel, Effort, Priority, Done when (observable). Use `Priority: must | should | could`, `Effort: S | M | L`, and `Parallel: yes | no`. Only `should` and `could` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: `Draft` → `Ready for review` → `Reviewed and ready to execute`. Open blocking questions keep it `Draft`; a complete unreviewed plan is `Ready for review`; a passed review sets `Reviewed and ready to execute`. Material edits after review return it to `Ready for review` (or `Draft` if blocked). Execution progress belongs in the ledger, not the readiness status. An explicit user instruction to execute a supplied plan authorizes execution without a mandatory sibling review; record that basis without claiming a review occurred.

### Delivery

Prefer a recoverable file when supported, using the existing path or the default below. Honor explicit user output requests. If files are unavailable, deliver the same complete structure in-session and label it `in-session only; not persisted`; never claim a file was saved. With a saved file, chat normally carries a short briefing and its path. These delivery rules also apply to the templates and quality gate below.

### 1. Map the Audit Scope

Read-only by default: do not change application code, dependencies, configuration, or observability unless implementation is explicitly requested. Writing the audit artifact is allowed. Use non-mutating inspection and authorized isolated tests; record checks that cannot safely run.

- Establish what the code does: purpose, inputs, outputs, side effects
- Identify callers, dependencies, state changes, and trust boundaries
- Treat current behavior as the baseline that must survive the audit
- If behavior is unclear, mark it as a question, not a deletion

### 2. Hunt Dead Weight

Find and document, with evidence only: dead code, redundant code, incomplete logic, swallowed failures, stale flags, orphaned config, unused paths.

### 3. Verify Code Accuracy

Scrutinize business logic, data integrity, numeric accuracy, concurrency, trust boundaries, and failure semantics.

If you cannot prove a bug exists, mark it `possible` or `uncertain` with reasoning. Never say `proven` without evidence.

### 4. Recommend Structural Improvements

- Recommend unifying duplicated business logic only when it is truly the same
- Recommend replacing reinvented wheels with mature, maintained, lighter alternatives when justified
- Assess separation of transport, domain logic, and data access cleanly
- Avoid premature abstraction

### 5. Assess Performance Honestly

Find real computational and data-access risks: N+1 access, missing indexes, unbounded result sets, repeated work, blocking I/O, caching with explicit staleness trade-offs.

- No performance recommendation may weaken functionality, reliability, accuracy, or precision
- If you did not measure it, call it a risk, not a measured result
- Rank opportunities by impact versus effort

### 6. Assess Observability

Audit the debugging surface: structured logs, correct log levels, useful error context, correlation IDs, audit trails for critical writes, metrics for latency, errors, and throughput.

Proposed observability changes should be additive and non-breaking; do not implement them during the audit.

### 7. Record Verification and Gaps

- Report results of existing tests when they can run within scope; otherwise state the limitation
- Where coverage is thin, propose missing tests first: boundary, failure, and concurrency cases
- Classify every recommendation as safe now, needs tests first, or needs human decision
- Deliver recommendations as an audit; execute only separately requested implementation within its authorized scope

### 8. Write the Audit

- Write the full audit to a file using the work-file template
- Reuse the existing path if known; otherwise `plans/<short-slug>-audit.md`; create the folder if needed; ask once if ambiguous
- If the file cannot be written, use the in-session delivery fallback
- Keep new work and updates to existing work in separate lists
- With a saved file, print the terminal briefing and path

### Completion: Choose the Next Action

- Finish and verify the current deliverable first; make the result and its location available before asking about follow-on work. Keep artifact readiness separate from the next-action choice: an unanswered suggestion does not reopen completed work, and a blocked job is not complete
- Check the result, current project stage, remaining risks, and prior user instructions. Recommend the next useful action from the local routing guidance below; skip irrelevant stages and prefer stopping when no useful work remains
- Use an available interactive question tool to offer one concise next-action choice. Put the best recommendation first, explain why it fits this result, and include a stop/pause choice. Always allow a free-text note or custom direction, including work outside the 360 flow; never force the user into a sibling skill
- If interactive tools are unavailable, offer equivalent numbered choices with the recommendation, rationale, and explicit custom-note option in chat. This completion prompt is separate from the deliverable briefing; skill names are allowed here, and it is not a passive list of unresolved task questions
- Reuse an already explicit next-step instruction instead of asking again; continue work it authorizes. Otherwise wait for the user's choice before starting follow-on work. Silence, a preselected recommendation, and elapsed time are not authorization. An explicit stop or request for no suggestions suppresses the prompt
- When the user chooses, follow that direction and clarify only missing information needed for it. Discover and load a selected skill through the host's supported mechanism; do not assume it is installed or install it automatically. If unavailable, explain and offer an equivalent action. Carry forward artifact paths, decisions, verification, remaining risks, and session consent without restarting intake

Local routing: Recommend planning actionable correctness or reliability fixes with `360-blueprint`, or `360-execute` when a suitable authorized plan already exists. Recommend `360-optimize` when optimization is the remaining need; stop when there is no justified follow-up.

## Output Format

### Work file

1. Overview
2. Dead weight
3. Accuracy
4. Duplication and structure
5. Performance risks
6. Observability
7. Risk register
8. Implementation plan — grouped as New vs Updates to existing
9. Handover — Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early

Every finding needs evidence and an inspection boundary. Call an area clean only within verified coverage; mark uninspected areas explicitly. Implementation tasks use the Shared Plan Contract. Label all proposed changes as recommendations, not completed fixes.

### Terminal briefing

Use this shape. Omit any section that would be empty. Follow the Delivery rules for file or in-session output.

```text
Backend audit — complete
Full audit: <path>

Bugs found
- <bug> — <proven|likely|possible|uncertain>

Updates to existing
- <fix or change to current behavior>

Features to add
- <new capability, if any>

Dead weight
- <remove or unused>

Need from you
- <decision required to proceed>
```

- Talk to the user, not the next agent
- A new artifact is Features to add. A change to an existing artifact, feature, or document is Updates to existing. Never mix them
- Confidence: `proven` evidence in hand; `likely` strong reason; `possible` suspected; `uncertain` hypothesis. Never numbers. Never say proven without evidence

## Quality Gate

- Completion includes the interactive next-action offer with a recommendation, stop choice, and custom-note option, or the explicit-instruction/parent-owned exception; unanswered suggestions do not block the completed deliverable

The audit is complete only when every answer is yes:

- Every finding is backed by evidence
- Clean areas are stated as clean
- Accuracy risks are verified or marked possible/uncertain
- No recommendation trades away functionality, reliability, accuracy, or precision without an explicit trade-off
- Unification is recommended only where logic is genuinely the same
- Library recommendations include maintenance, compatibility, and weight evidence or explicit verification gaps
- Performance claims are measured when measurement is possible, and labeled as risks when it is not
- The observability plan integrates without breaking behavior
- New work and updates to existing work are grouped separately
- The handover lets the next agent act with zero guessing
- The deliverable is saved at the stated path, or honestly labeled in-session only
- The briefing omits empty sections and uses proven/likely/possible/uncertain, never numbers

Any "no" means the audit is not finished. Fix it and review again.
