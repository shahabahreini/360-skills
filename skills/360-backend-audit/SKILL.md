---
name: 360-backend-audit
description: Deep-audit backend code, write the full report to a file, and brief the user in chat with bugs, updates, and dead weight. Use before or after significant backend work, or when inheriting, refactoring, or handing off services.
version: 1.2.0
---

# 360 Backend Audit

## Purpose

Run this skill on backend code: APIs, services, business logic, data access layers, integrations, background jobs, and pipelines. Turn working backend code into correct, lean, observable, and transferable code without breaking what already works.

Technology-agnostic: audit logic, structure, and data flow, not stack syntax.

The full audit lives in a file. Chat gets a short briefing only.

## When to Use

- Before or after merging significant backend work
- When inheriting, refactoring, or modernizing services or data layers
- When code feels heavy, fragile, slow, or hard to debug
- Before handing code to another engineer or AI agent
- Not for planning work that does not exist yet (`360-blueprint`) or executing a plan (`360-execute`)

## Core Principle

Working backend code is not finished code. Audit what exists that should not, what exists twice, what is subtly wrong, what may fail under load, what cannot be diagnosed when it breaks, and what the next engineer needs to continue safely.

Functionality, reliability, and accuracy are untouchable. A fast bug is still a bug.

The file is the audit. Chat is the briefing.

## Workflow

### 1. Map Before You Cut

- Establish what the code does: purpose, inputs, outputs, side effects
- Identify callers, dependencies, state changes, and trust boundaries
- Treat current behavior as the baseline that must survive the audit
- If behavior is unclear, mark it as a question, not a deletion

### 2. Hunt Dead Weight

Find and document, with evidence only: dead code, redundant code, incomplete logic, swallowed failures, stale flags, orphaned config, unused paths.

### 3. Verify Code Accuracy

Scrutinize business logic, data integrity, numeric accuracy, concurrency, trust boundaries, and failure semantics.

If you cannot prove a bug exists, mark it `possible` or `uncertain` with reasoning. Never say `proven` without evidence.

### 4. Unify and Modularize

- Unify duplicated business logic only when it is truly the same
- Replace reinvented wheels with mature, maintained, lighter alternatives when justified
- Separate transport, domain logic, and data access cleanly
- Avoid premature abstraction

### 5. Assess Performance Honestly

Find real computational and data-access risks: N+1 access, missing indexes, unbounded result sets, repeated work, blocking I/O, caching with explicit staleness trade-offs.

- No performance recommendation may weaken functionality, reliability, accuracy, or precision
- If you did not measure it, call it a risk, not a measured result
- Rank opportunities by impact versus effort

### 6. Make It Observable

Audit the debugging surface: structured logs, correct log levels, useful error context, correlation IDs, audit trails for critical writes, metrics for latency, errors, and throughput.

Observability changes must be additive and non-breaking.

### 7. Verify Nothing Broke

- Existing tests must pass
- Where coverage is thin, propose missing tests first: boundary, failure, and concurrency cases
- Classify every change as safe now, needs tests first, or needs human decision
- When in doubt, deliver the audit as a plan and wait for approval

### 8. Write the Audit

- Write the full audit to a file using the work-file template
- Reuse the existing path if known; otherwise `plans/<short-slug>-audit.md`; create the folder if needed; ask once if ambiguous
- If the file cannot be written, stop and ask — never paste the audit into chat
- Keep new work and updates to existing work in separate lists
- Print only the terminal briefing

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
9. Handover plan — context, decisions, tasks, verification, risks, state

Every finding needs evidence. Clean areas are stated as clean.

### Terminal briefing

Use this shape. Omit any section that would be empty. Never paste the work file into chat.

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

The audit is complete only when every answer is yes:

- Every finding is backed by evidence
- Clean areas are stated as clean
- Accuracy risks are verified or marked possible/uncertain
- No recommendation trades away functionality, reliability, accuracy, or precision without an explicit trade-off
- Duplication is unified only where logic is genuinely the same
- Every library suggested is maintained, trusted, and lighter than the code it replaces
- Performance claims are measured when measurement is possible, and labeled as risks when it is not
- The observability plan integrates without breaking behavior
- New work and updates to existing work are grouped separately
- The handover lets the next agent act with zero guessing
- The work file lives at the stated path and was not pasted into chat
- The briefing omits empty sections and uses proven/likely/possible/uncertain, never numbers

Any "no" means the audit is not finished. Fix it and review again.