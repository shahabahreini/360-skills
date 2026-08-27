---
name: 360-expert-review
description: Pre-finalization plan review and adversarial pre-mortem that stress-tests draft plans for user impact, reliability, security, rollback, traceability, and edge cases. Uses direct expert lenses instead of persona theater and finalizes only after hostile review.
version: 3.1.0
---

# 360 Expert Review

## Purpose

Run this skill before finalizing any important plan. Its job is to turn a draft into the strongest usable plan by exposing missing scenarios, weak assumptions, and hidden failure modes.

Drafts usually arrive from `360-blueprint`, sometimes already tailored by `360-faculty`. Once a plan passes this review, hand it to `360-execute` to build. Run `360-token-efficiency` alongside this skill when context or cost matters.

## When to Use

- A plan changes real systems, data, users, money, security, or operations
- A wrong assumption or missed case could create real damage
- A plan needs adversarial review before execution
- Not for writing a plan that does not exist yet (`360-blueprint`), tailoring one to this developer (`360-faculty`), or executing one already final (`360-execute`)

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

If `360-faculty` supplied a prioritized lens list for this plan, start from it, then add any lens this plan needs that the list omits. A supplied list sets the order of attack, never the limit of coverage.

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
- Which risk was accepted instead of solved, and does evidence now overturn that acceptance?

A risk whose countermeasure reads `Accepted by developer` is attack surface, not settled matter. Re-open any of them when evidence warrants, put the evidence in front of the developer, and let them decide again. An earlier acceptance never exempts a risk from this review.

Fix the plan, then attack it again until no high-severity issue remains open.

### 8. Complete the Handover

Section 10 of the plan template is always filled. It is part of the plan, not an optional extra. Use these fields:

- Context
- Decisions
- State: done / pending / blocked
- Remaining tasks: what, how, where
- Verification
- Risks and how to detect them early

If the user also asked for a standalone handover document, produce one with the same fields. If they did not, mark it `Not requested`.

## Final Plan Format

Return the revised plan in `360-blueprint`'s Plan Template, sections 1 to 10 intact.

Preserve every task field — ID, Depends on, Skills, Parallel, Effort, Priority, Done when — along with phase checkpoints, the change policy, the replanning triggers, and the traceability table. `360-execute` reads those fields directly. A review that turns them into prose breaks execution.

If the incoming plan is not in the template, normalize it into the template first, then review.

Append the review's own output as four further sections:

- **11. Expert Findings and Key Decisions**: what each lens surfaced, and what was decided
- **12. Scenario and Impact Coverage**: components, data, users, states, edge cases, and failure modes
- **13. Reliability, Observability, and Release**: reliability and security measures, debugging path, tests and observable acceptance criteria, release, monitoring, and rollback
- **14. Review Verdict**: risks found, how each was resolved, and why this is the strongest version

Set the plan's Status field to `Reviewed and ready to execute`.

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
- Every risk marked `Accepted by developer` was re-tested against evidence, and any re-opened one was decided again
- Every Plan Template field survived intact: task IDs, Depends on, Skills, Parallel, Effort, Priority, Done when, checkpoints, change policy, replanning triggers, traceability
- The plan's handover summary is complete, and a standalone handover document was produced if requested or marked `Not requested`

Any "no" means the plan is not final. Fix it and review again.
