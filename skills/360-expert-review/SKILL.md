---
name: 360-expert-review
description: Pre-finalization plan review. Build a project-specific panel of senior experts, examine the plan from every angle (user experience, reliability, scenarios, traceability), then attack it as a hostile critic. Finalize only when it survives.
version: 2.0.0
---

# 360 Expert Review

## Purpose

Run this skill **before finalizing any plan**. Its job: turn a draft plan into the best plan that can be produced: complete, reliable, user-centered, traceable, and proven against strong criticism.

A plan is not final until it passes every stage below.

## When to Use

Any plan that changes something real: features, fixes, refactors, migrations, integrations, workflows, data, infrastructure, or UX. If a wrong assumption or a missed case could hurt users, data, or trust, use this skill.

## Core Principle

Think like a team of senior engineers and domain experts, not a single planner. Cover every aspect: what the user thinks, experiences, and feels; the reliability of what gets built; every scenario the change touches; every way the plan could fail. Then criticize the plan hard enough that only the strongest version survives.

## Workflow

### 1. Understand the Project First

Before judging the plan, establish:

- The real problem, not just the requested task
- The nature of the project and the expertise it demands
- Users, stakeholders, constraints, dependencies, assumptions
- What must not break
- Ask any question to have a crystal clear what is needed and how should it work

Missing something critical? Ask, or state the assumption explicitly. Never guess silently.

### 2. Assemble the Expert Panel

Based on the project's nature, form a virtual team of senior specialists, choosing only the roles this project needs:

- Architect: design, boundaries, simplicity, trade-offs
- Engineer (backend, frontend, data): correctness, edge cases, integration, performance
- Product & UX: user value, clarity, friction, emotion, recovery
- QA: scenario coverage, regressions, acceptance criteria
- SRE/DevOps: deployment, observability, rollback
- Security & privacy: access, data exposure, abuse cases
- Domain expert: business rules, terminology, real-world accuracy

Review the plan through each selected role's eyes. Every concern becomes a fix, a test, or an explicitly accepted risk.

### 3. Cover the User Completely

The plan must respect user thought, experience, and feeling:

- Solves the real need through a clear, low-friction path
- Handles empty, loading, error, interrupted, and recovery states
- Prevents lost work, confusion, and irreversible mistakes
- Works for all users: first-time, returning, low-skill, accessibility needs, poor connectivity

### 4. Cover Every Scenario and Effect

For each change, map what it touches and what it could break:

- Affected components, data, APIs, permissions, integrations, existing behavior
- Happy paths, edge cases, invalid input, retries, duplicates, concurrency
- Dependency failures, timeouts, partial completion, degraded performance
- Legacy data, migrations, mixed versions, rollback

Every risk gets a prevention, detection, mitigation, or rollback.

### 5. Guarantee Reliability and Traceability

The plan must produce work that is dependable and debuggable:

- Validation, error handling, idempotency, graceful failure where relevant
- Security, privacy, performance, compatibility
- The simplest design that fully works, with no unnecessary complexity
- Every requirement traceable: requirement, implementation, test, production signal, owner
- Debugging made easy: meaningful errors, structured logs, correlation IDs, metrics, alerts, a clear reproduction path

If the plan says how to build it but not how to find out why it failed, it is incomplete.

### 6. Verify Everything

Define testing proportional to risk: unit, integration, end-to-end, regression, migration, security, performance, whatever applies. Every acceptance criterion must be observable. "Works correctly" is not a criterion.

### 7. Attack the Plan

Switch to hostile critic. Ask:

- What is assumed but unproven?
- What is missing: a user, a data state, a sequence, a permission, a failure mode?
- What is the most likely failure? The most damaging one?
- Which step is vague enough to be implemented two different ways?
- What cannot be detected, reproduced, or reversed in production?
- Can this be simpler?

Don't list concerns. Fix them. Revise and re-attack until no high-severity issue remains open.

## Final Plan Format

Present the finished plan as:

1. Objective & user outcome
2. Scope, assumptions, open questions
3. Expert panel findings & key decisions
4. Implementation steps, clear, ordered, actionable
5. Scenario & impact coverage
6. Reliability, security & simplicity measures
7. Tests & observable acceptance criteria
8. Observability & debugging path
9. Release, monitoring & rollback
10. Risks found, how they were resolved, and why this is the best final plan

## Quality Gate

The plan is final only when every answer is yes:

- Real user need understood and served
- Right experts consulted; all aspects covered
- Every scenario and effect mapped; every risk has a countermeasure
- Requirements traceable to code, tests, and monitoring
- Failures easy to detect, reproduce, diagnose, and fix
- Design clear, consistent, and as simple as possible
- Testing matches the risk
- Safe release and a viable rollback
- Survived aggressive criticism

Any "no" means not final. Fix it and review again.
