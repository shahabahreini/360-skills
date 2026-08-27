---
name: 360-backend-audit
description: Deep audit of backend code, APIs, services, business logic, data layers, integrations, and jobs. Verifies correctness, hunts dead weight and duplication, finds safe performance risks, hardens observability, and ends with a usable handover. Functionality, reliability, and accuracy are never traded away.
version: 1.2.0
---

# 360 Backend Audit

## Purpose

Run this skill on backend code: APIs, services, business logic, data access layers, integrations, background jobs, and pipelines. Its job is to turn working backend code into correct, lean, observable, and transferable code without breaking what already works.

This skill is technology-agnostic. It audits logic, structure, and data flow, not the syntax of a specific stack.

The code it audits often came from `360-execute`, and its findings seed the next `360-blueprint` cycle. Run `360-token-efficiency` alongside this skill when context or cost matters.

## When to Use

- Before or after merging significant backend work
- When inheriting, refactoring, or modernizing services or data layers
- When code feels heavy, fragile, slow, or hard to debug
- Before handing code to another engineer or AI agent
- Not for planning work that does not exist yet (`360-blueprint`) or executing a plan (`360-execute`)

## Core Principle

Working backend code is not finished code. Audit what exists that should not, what exists twice, what is subtly wrong, what may fail under load, what cannot be diagnosed when it breaks, and what the next engineer needs to continue safely.

Functionality, reliability, and accuracy are untouchable. A fast bug is still a bug.

## Workflow

### 1. Map Before You Cut

- Establish what the code does: purpose, inputs, outputs, side effects
- Identify callers, dependencies, state changes, and trust boundaries
- Treat current behavior as the baseline that must survive the audit
- If behavior is unclear, mark it as a question, not a deletion

### 2. Hunt Dead Weight

Find and document:

- Dead code
- Redundant code
- Incomplete logic
- Swallowed failures
- Stale flags, orphaned config, and unused paths

Every finding needs evidence. No evidence, no removal.

### 3. Verify Code Accuracy

Scrutinize:

- Business logic
- Data integrity
- Numeric accuracy
- Concurrency
- Trust boundaries
- Failure semantics

If you cannot prove a bug exists, mark it as a suspected risk with reasoning.

### 4. Unify and Modularize

- Unify duplicated business logic only when it is truly the same
- Replace reinvented wheels with mature, maintained, lighter alternatives when justified
- Separate transport, domain logic, and data access cleanly
- Avoid premature abstraction

### 5. Assess Performance Honestly

Find real computational and data-access risks:

- N+1 access
- Missing indexes
- Unbounded result sets
- Repeated work
- Blocking I/O
- Caching opportunities with explicit staleness trade-offs

Rules:

- No performance recommendation may weaken functionality, reliability, accuracy, or precision
- If you did not measure it, call it a risk, not a measured result
- Rank opportunities by impact versus effort

### 6. Make It Observable

Audit the debugging surface:

- Structured logs
- Correct log levels
- Useful error context
- Correlation IDs
- Audit trails for critical writes
- Metrics for latency, errors, and throughput

Observability changes must be additive and non-breaking.

### 7. Verify Nothing Broke

- Existing tests must pass
- Where coverage is thin, propose missing tests first: boundary, failure, and concurrency cases
- Classify every change as safe now, needs tests first, or needs human decision
- When in doubt, deliver the audit as a plan and wait for approval

### 8. Write the Handover Plan

Always finish with a handover for the next agent. Include:

- Context
- Decisions
- State: done / pending / blocked
- Remaining tasks: what, how, where
- Verification
- Risks and how to detect them early

If the next agent would have to guess, the handover is not finished.

## Audit Report Format

1. Overview
2. Dead weight
3. Accuracy
4. Duplication and structure
5. Performance risks
6. Observability
7. Risk register
8. Implementation plan
9. Handover plan

## Quality Gate

The audit is complete only when every answer is yes:

- Every finding is backed by evidence
- Clean areas are stated as clean
- Accuracy risks are verified or clearly marked as suspected
- No recommendation trades away functionality, reliability, accuracy, or precision without an explicit trade-off
- Duplication is unified only where logic is genuinely the same
- Every library suggested is maintained, trusted, and lighter than the code it replaces
- Performance claims are measured when measurement is possible, and labeled as risks when it is not
- The observability plan integrates without breaking behavior
- The handover plan lets the next agent act with zero guessing

Any "no" means the audit is not finished. Fix it and review again.
