---
name: 360-backend-audit
description: Deep-audit backend code, write the full report to a file, and brief the user in chat with bugs, updates, and dead weight. Use before or after significant backend work, or when inheriting, refactoring, or handing off services.
version: 2.4.0
---

# 360 Backend Audit

## Purpose

Audit APIs, services, business logic, data access, integrations and jobs for correctness, structure, performance and observability risks. Produce evidence-backed recommendations within an explicit inspection boundary.

## When to Use

- Before or after merging significant backend work
- When inheriting, refactoring, or modernizing services or data layers
- When code feels heavy, fragile, slow, or hard to debug
- Before handing code to another engineer or AI agent
- Not for planning work that does not exist yet (`360-blueprint`), executing a plan (`360-execute`), or measured performance and toolchain tuning (`360-optimize`)

## Core Principle

Judge observed behavior against the intended contract.

## Workflow

### Entry: Optional Token Efficiency

Reuse this session's approval or refusal of `360-token-efficiency`. If unknown and not yet offered, ask once, in the same question round as any other entry question, and keep the overlay off until answered. Explicit user invocation is approval; a plan that lists the skill is not. On approval, load it through the host's skill mechanism, reusing instructions already loaded; if unavailable, say so briefly and continue without installing it. Refusal turns the overlay off, not ordinary efficient work. Revocation takes effect immediately. Consent lasts this session only and never authorizes cross-session memory writes.

### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or `None`), Parallel, Effort, Priority, Done when (observable). Use `Priority: must | should | could`, `Effort: S | M | L`, and `Parallel: yes | no`. Only `should` and `could` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: `Draft` → `Ready for review` → `Reviewed and ready to execute`. Open blocking questions keep a plan `Draft`; a complete unreviewed plan is `Ready for review`; only a passed review sets `Reviewed and ready to execute`, and material edits after it return the plan to `Ready for review` (or `Draft` if blocked). Execution progress lives in the ledger, not in this status. An explicit user instruction to execute a supplied plan authorizes execution without a sibling review; record that basis and never claim a review occurred.

### Delivery

Write the deliverable to a recoverable file when the host supports it, at the existing path or the default below. Honor explicit user output requests. Without files, deliver the same complete structure in chat labeled `in-session only; not persisted`, and never claim a file was saved. With a saved file, chat carries the Reader's Briefing and the path. In a non-interactive run where no one can answer, do not wait: record each open question, apply only reversible defaults, mark readiness honestly, and deliver.

Judge completion by observable acceptance checks. A structural or format check does not prove behavior or accuracy; state what was not verified.

### 1. Map the Audit Scope

Read-only by default: do not change application code, dependencies, configuration, or observability unless implementation is explicitly requested. Writing the audit artifact is allowed. Use non-mutating inspection and authorized isolated tests; record checks that cannot safely run.

- Establish expected behavior from requirements, public contracts, tests and current user decisions; distinguish these sources from what the implementation actually does
- Identify callers, dependencies, state changes, and trust boundaries
- Record observed inputs, outputs and side effects as evidence, not proof of correctness. Preserve intended behavior when recommending changes; a defect need not be preserved
- If the intended contract is unclear, state competing interpretations and the next useful check

### 2. Hunt Dead Weight

Inspect suspected dead code, redundancy, incomplete logic, swallowed failures, stale flags, orphaned configuration and unused paths. Before recommending deletion, check indirect callers, registration, reflection or generated entrypoints, configuration and external consumers where relevant. State the search boundary. No direct callers or an inconclusive search means uncertain use, not proven dead code.

### 3. Verify Code Accuracy

Scrutinize business logic, data integrity, numeric accuracy, concurrency, trust boundaries, and failure semantics.

For each finding, record the triggering input/state, expected versus observed behavior, consequence, source or reproduction evidence, confidence, and inspection boundary. Use `likely` for strong indirect evidence, `possible` or `uncertain` for hypotheses, and name the next check. A local reproduction proves only that local case; production impact needs evidence of reachability and relevant conditions.

### 4. Recommend Structural Improvements

- Recommend unifying duplicated business logic only when it is truly the same
- Recommend replacing reinvented wheels with mature, maintained, lighter alternatives when justified
- Assess whether transport, domain logic and data access are cleanly separated
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

- Cover relevant requirements, likely failures and severe plausible failures within scope. Report authorized tests and their results; state uninspected paths, unavailable access and the checks needed to close gaps
- Where coverage is thin, propose missing tests first: boundary, failure, and concurrency cases
- Classify every recommendation as safe now, needs tests first, or needs human decision
- Deliver recommendations as an audit; execute only separately requested implementation within its authorized scope

### 8. Write the Audit

- Write the full audit to a file using the work-file template
- Reuse the existing path if known; otherwise `plans/<short-slug>-audit.md`; create the folder if needed; ask once if ambiguous
- If the file cannot be written, use the in-session delivery fallback
- Keep new work and updates to existing work in separate lists
- Print the Reader's Briefing in chat before any next-action question; when the host sends one message, the briefing comes first

### Completion: Choose the Next Action

- Deliver and verify the current result first, with its location. An unanswered suggestion never reopens finished work, and a blocked job is not complete
- Recommend one next action from the local routing below, based on the result, project stage, open risks and prior instructions. Skip stages that do not apply; recommend stopping when no useful work remains
- Ask with the host's interactive question tool, or with numbered choices in chat when there is none: the recommendation first with its reason, a stop option, and a free-text option for any direction, inside or outside the 360 skills. This prompt is separate from the briefing and is not a list of open task questions
- An explicit next-step instruction answers this prompt, and an explicit stop or request for no suggestions suppresses it. Otherwise wait for the user's choice; in a non-interactive run, state the recommendation and stop. Silence, a preselected recommendation, and elapsed time are not authorization. On a choice, clarify only what is missing, load a selected skill through the host's mechanism without installing it (offer an equivalent if it is unavailable), and carry forward paths, decisions, verification, risks and session consent

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

Keep the finding details from Workflow 3 inside the existing report sections. Call an area clean only within verified coverage; mark uninspected areas explicitly. A completed bounded audit does not verify proposed fixes or unavailable production behavior. Implementation tasks use the Shared Plan Contract. Label all proposed changes as recommendations, not completed fixes.

### Reader's Briefing

Print this in chat. Follow the Delivery rules for file or in-session output.

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

Briefing rules:

- Write for a reader who has not seen the full artifact; define or drop any term of art
- One line per bullet, 20 words or fewer; the whole briefing fits one screen (about 25 lines)
- Outcomes and decisions, not mechanics: no task IDs, phases, priorities, status tables, executor notes or skill names
- Keep new things and changes to existing things in separate sections
- Confidence is proven (evidence in hand), likely (strong reason), possible (suspected), or uncertain (hypothesis). Never numbers; never proven without evidence
- The second line names the full artifact's path, or says `in-session only; not persisted`
- Omit empty sections unless this skill marks one as always present
- A new artifact goes under `Features to add`; a change to an existing artifact, feature, or document goes under `Updates to existing`

## Quality Gate

The audit is complete only when every answer is yes:

- Every finding distinguishes expected and observed behavior, trigger, consequence, evidence or hypothesis, confidence and inspection boundary
- Clean claims are restricted to inspected coverage; unavailable checks remain limitations
- Deletion recommendations account for indirect, registered, configured and external use, or remain uncertain
- Local reproductions are not overstated as production impact
- No recommendation trades away functionality, reliability, accuracy, or precision without an explicit trade-off
- Unification is recommended only where logic is genuinely the same
- Library recommendations include maintenance, compatibility, and weight evidence or explicit verification gaps
- Performance claims are measured when measurement is possible, and labeled as risks when it is not
- The observability plan integrates without breaking behavior
- New work and updates to existing work are grouped separately
- The handover preserves evidence, limits and the next useful checks
- The deliverable is saved at the stated path, or honestly labeled in-session only
- The briefing follows the briefing rules
- The Reader's Briefing was printed in chat before any next-action question
- Completion offered one recommended next action with stop and free-text options, or followed an explicit instruction or the parent skill's prompt; an unanswered suggestion does not block the finished deliverable

Any "no" means the audit is not finished. Fix it and review again.
