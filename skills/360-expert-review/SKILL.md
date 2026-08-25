---
name: 360-expert-review
description: Pre-finalization plan review that stress-tests a draft plan for user impact, reliability, security, rollback, traceability, and failure modes. Uses direct expert lenses instead of persona theater and finalizes only after hostile review.
version: 2.2.0
---

# 360 Expert Review

## Purpose

Run this skill before finalizing any important plan. Its job is to turn a draft into the strongest usable plan by exposing missing scenarios, weak assumptions, and hidden failure modes.

## When to Use

- A plan changes real systems, data, users, money, security, or operations
- A wrong assumption or missed case could create real damage
- A plan needs adversarial review before execution

## Core Principle

Review the plan the way a senior team would: user impact, reliability, security, operations, and domain correctness. Then attack it hard enough that only the strongest version survives.

## Workflow

### 1. Understand the Project First

- Identify the real problem, not just the requested task.
- Identify users, stakeholders, constraints, dependencies, and what must not break.
- Ask questions until the plan can be judged without guessing.
- If a handover is needed, ask for it explicitly.

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

- Solve the real need with the lowest-friction path that works.
- Cover empty, loading, error, interrupted, and recovery states.
- Prevent lost work, confusion, and irreversible mistakes.
- Include first-time, returning, low-skill, accessibility, and poor-connectivity users when relevant.

### 4. Cover Every Scenario and Effect

- Map affected components, data, APIs, permissions, integrations, and existing behavior.
- Cover happy paths, edge cases, invalid input, retries, duplicates, and concurrency.
- Cover dependency failures, timeouts, partial completion, degraded performance, migrations, mixed versions, and rollback.
- Every risk needs prevention, detection, mitigation, or rollback.

### 5. Guarantee Reliability and Traceability

- Validation, error handling, idempotency, and graceful failure where relevant
- Security, privacy, performance, and compatibility where relevant
- The simplest design that fully works
- Every requirement traceable to implementation, tests, monitoring, and ownership
- Debugging path: meaningful errors, structured logs, correlation IDs, metrics, alerts, and reproduction path

### 6. Verify Everything

- Define testing proportional to risk.
- Every acceptance criterion must be observable.
- "Works correctly" is not a criterion.

### 7. Attack the Plan

Switch to hostile critic. Ask:

- What is assumed but unproven?
- What is missing: a user, a state, a sequence, a permission, a failure mode?
- What is the most likely failure?
- What is the most damaging failure?
- Which step could be read two different ways?
- What cannot be detected, reproduced, or reversed?
- What can be simpler?

Fix the plan, then attack it again until no high-severity issue remains open.

### 8. Produce Handover Only If Requested

If the user asked for a handover, produce one that includes:

- Context
- Decisions
- Tasks
- Verification
- Risks
- State

If no handover was requested, mark it `Not requested`.

## Final Plan Format

1. Objective and user outcome
2. Scope, assumptions, open questions
3. Expert findings and key decisions
4. Implementation steps
5. Scenario and impact coverage
6. Reliability, security, and simplicity measures
7. Tests and observable acceptance criteria
8. Observability and debugging path
9. Release, monitoring, and rollback
10. Risks found, how they were resolved, and why this is the best final plan
11. Handover plan, or `Not requested`

## Quality Gate

The plan is final only when every answer is yes:

- Real user need understood and served
- The right expert lenses were applied
- Every important scenario and effect was mapped
- Every risk has a countermeasure
- Requirements are traceable to code, tests, and monitoring
- Failures are detectable, reproducible, diagnosable, and fixable
- The design is clear, consistent, and as simple as possible
- Testing matches the risk
- Release and rollback are safe
- The plan survived hostile review
- Handover was explicitly requested and completed, or explicitly skipped

Any "no" means the plan is not final. Fix it and review again.
