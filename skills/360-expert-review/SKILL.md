---
name: 360-expert-review
description: Stress-test a draft plan, write the finalized executable plan back to the same file, and brief the user in chat. Use before executing any plan where a missed case could cause real damage.
version: 2.3.0
---

# 360 Expert Review

## Purpose

Run this skill before finalizing any important plan. Turn a draft into the strongest executable plan by exposing missing scenarios, weak assumptions, and hidden failure modes.

The finalized plan lives in the plan file. Chat gets a short briefing only.

## When to Use

- A plan changes real systems, data, users, money, security, or operations
- A wrong assumption or missed case could create real damage
- A plan needs adversarial review before execution
- Not for drafting plans from scratch (`360-blueprint`) or executing a finalized plan (`360-execute`)

## Core Principle

- Review the plan the way a senior team would: user impact, reliability, security, operations, and domain correctness
- Attack it hard enough that only the strongest version survives
- Finalize into the existing plan file. Do not replace tasks with a narrative essay
- The file is the plan. Chat is the briefing

## Workflow

### 1. Understand the Project First

- Identify the real problem, not just the requested task
- Identify users, stakeholders, constraints, dependencies, and what must not break
- Ask questions until the plan can be judged without guessing

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

Fix the plan, then attack it again until no high-severity issue remains open.

### 8. Write the Final Plan

- Update the draft's file in place using the `360-blueprint` work-file template
- Preserve task IDs; add, split, or drop a task only with a stated reason
- Keep new work and updates to existing work in separate scope lists
- Put review findings, key decisions, and remaining risks in a short appendix in that same file
- Executor handover lives in the file — never in chat
- If the file cannot be written, stop and ask — never paste the plan into chat
- Print only the terminal briefing

## Output Format

### Work file

The `360-blueprint` plan template, updated in place, plus a short appendix:

```markdown
## 11. Review appendix
- Findings:
- Decisions:
- Remaining risks:
```

Do not replace the task list with a narrative plan.

### Terminal briefing

Use this shape. Omit any section that would be empty. Never paste the work file into chat.

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

Need from you
- <only if not ready to build>
```

- First line is `plan is final` or `not final — blocked on you`
- Talk to the user, not the next agent. Outcomes, not tasks
- A new artifact is Features to add. A change to an existing artifact, feature, or document is Updates to existing. Never mix them
- Confidence: `proven` evidence in hand; `likely` strong reason; `possible` suspected; `uncertain` hypothesis. Never numbers. Never say proven without evidence
- No phases, tasks, skill names, or review-essay dump

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
- Task IDs were preserved or changed with a stated reason
- New work and updates to existing work are grouped separately
- The finalized plan is in the original file, not pasted into chat
- The briefing omits empty sections and uses proven/likely/possible/uncertain, never numbers

Any "no" means the plan is not final. Fix it and review again.