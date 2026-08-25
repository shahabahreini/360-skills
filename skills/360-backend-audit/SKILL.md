---
name: 360-backend-audit
description: Deep audit of backend code, APIs, services, business logic, data layers, integrations, and jobs. Verifies code accuracy, hunts dead weight and duplication, finds safe performance wins, hardens logging and traceability, and ends with a flawless handover plan. Functionality, reliability, and accuracy are never traded away.
version: 1.0.0
---

# 360 Backend Audit

## Purpose

Run this skill on **backend code**: APIs, services, business logic, data access layers, integrations, background jobs, and pipelines. Its job: turn working backend code into correct, lean, modular, observable, and transferable code, without breaking what already works.

This skill is technology-agnostic. It audits logic, structure, and data flow, not the syntax of any specific stack. UI and presentation concerns are out of scope.

## When to Use

- Before or after merging significant backend work
- When inheriting, refactoring, or modernizing services or data layers
- When code feels heavy, fragile, slow, or hard to debug in production
- Before handing code to another engineer or AI agent

## Core Principle

Working backend code is not finished code. Audit from every angle: what exists that shouldn't, what exists twice, what is subtly wrong, what runs slower than it should, what can't be diagnosed when it fails, and what the next engineer needs to continue safely.

One rule overrides everything: **functionality, reliability, and accuracy are untouchable.** A fast bug is still a bug. Every improvement must preserve all three, or be flagged as an explicit trade-off for the user to decide.

## Workflow

### 1. Map Before You Cut

Before changing anything, establish:

- What the code actually does: purpose, inputs, outputs, side effects
- Who calls it (endpoints, jobs, consumers) and what it depends on
- Where state is written, read, and transformed; where data crosses trust boundaries
- Current behavior as the baseline that must survive the audit

Never delete or refactor what you do not fully understand. If behavior is unclear, mark it as a question, not a deletion.

### 2. Hunt Dead Weight

Find and document:

- Dead code: unreachable branches, unused functions, endpoints, parameters, imports, files, commented-out blocks, stale feature flags, orphaned config
- Redundant code: the same query, computation, or validation repeated across layers or call sites
- Incomplete logic: TODOs, empty error handlers, swallowed exceptions, unhandled failure paths, placeholder returns, partial validation

Every finding needs evidence: why it is safe to remove or what it was meant to complete. No evidence, no removal; propose it as a question instead.

### 3. Verify Code Accuracy

Scrutinize correctness before anything else:

- Business logic: boundary conditions, off-by-one errors, wrong operators, inverted conditions, incorrect defaults
- Data integrity: transaction boundaries, atomicity of multi-step writes, constraint enforcement, consistency across related writes
- Numeric accuracy: rounding, precision loss, money and unit handling, timezone and calendar errors
- Concurrency: race conditions, duplicate processing, missing idempotency, unsafe ordering assumptions
- Trust boundaries: every external input validated; nothing upstream trusted blindly
- Failure semantics: errors return correct status and state; partial success is never reported as success

Verify against real behavior, not assumptions. If you cannot prove a bug exists, report it as a suspected risk with the reasoning, never as a fact.

### 4. Unify and Modularize

- Duplicated business logic across endpoints, services, or jobs → one shared source of truth
- Reinvented wheels: hand-rolled validation, serialization, retries, pagination, auth helpers → mature, maintained libraries. Before recommending one, verify: actively maintained, widely adopted, license-compatible, and lighter than the code it replaces
- Scattered responsibilities → one module, one clear job; clean boundaries between transport, domain logic, and data access
- Goal: scalable, maintainable, auditable

Unify only what is truly the same. Logic that looks alike but serves different purposes stays separate; premature abstraction is debt too.

### 5. Boost Performance Safely

Find real computational and data-access wins:

- Query patterns: N+1 access, missing indexes, unbounded result sets, missing pagination, over-fetching
- Computation: repeated work, wrong data structures, algorithmic complexity that matters at real scale
- I/O: blocking calls that could be concurrent, connection misuse, serialization overhead
- Caching: opportunities with the staleness trade-off stated explicitly

Hard constraints:

- No performance change may alter functionality, reliability, accuracy, or precision
- Risky speedups (caching staleness, float reordering, skipped validation, concurrency hazards) are flagged as trade-offs, never hidden inside a "win"
- Baseline before, measure after. No measurement, no claim

Rank every opportunity by impact versus effort.

### 6. Make It Observable

Audit the debugging surface, then propose an improvement plan:

- Logging: structured, correctly leveled, rich in context, free of secrets and noise
- Errors: what failed, where, why, and with what input; never swallowed
- Traceability: correlation IDs across service and job boundaries, visibility into state transitions and retries, audit trails for critical writes, metrics for latency, error rates, and throughput

Integration must never break the code:

- Additive changes first: instrument around logic, never rewrite logic to add logging
- Wrap, don't restructure
- Stage risky insertions behind flags or config
- Keep logging out of hot paths where volume hurts performance

### 7. Verify Nothing Broke

- All existing tests must pass; where coverage gaps let issues hide, propose the missing tests: boundary, failure, and concurrency cases first
- Classify every proposed change: safe to apply now, needs tests first, or needs human decision
- When in doubt, deliver the audit as a plan and let the user approve before code changes

### 8. Write the Handover Plan

Always finish by producing a handover plan for the next AI agent, and ask the user whether to issue it as a standalone prompt or document. It must be flawless: zero gaps, zero ambiguity.

The handover must tell the next agent:

- Context: what this code does and what the audit found
- Decisions: what was changed, what was deliberately kept, and why
- Tasks: what to do, in what order, exactly how, and exactly where
- Verification: what to check after each task to confirm correct implementation
- Risks: what could break and how to detect it early
- State: what is done, what is pending, what is blocked

If the next agent would have to guess anything, the handover is not finished.

## Audit Report Format

1. **Overview**: scope audited and overall health
2. **Dead weight**: redundant, dead, and incomplete code, each with evidence
3. **Accuracy**: correctness risks found, with severity and proof status
4. **Duplication & structure**: unification opportunities, modularization plan, library recommendations
5. **Performance**: ranked opportunities with safety notes and measurement plan
6. **Observability**: gaps and a non-breaking integration plan
7. **Risk register**: what could break and the mitigation for each
8. **Implementation plan**: ordered steps, safest first
9. **Handover plan**: complete brief for the next AI agent

## Quality Gate

The audit is complete only when every answer is yes:

- Every finding is backed by evidence; no invented problems
- Clean areas are stated as clean
- Accuracy risks are verified against real behavior or clearly marked as suspected
- No recommendation trades away functionality, reliability, accuracy, or precision without an explicit, flagged trade-off
- Duplication is unified only where logic is genuinely the same
- Every library suggested is maintained, trusted, and lighter than the code it replaces
- Performance claims are measurable and measured
- The observability plan integrates without breaking existing behavior
- The handover plan lets the next agent act with zero guessing

Any "no" means the audit is not finished. Fix it and review again.
