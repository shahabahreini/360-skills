---
name: 360-blueprint
description: Universal plan creator for new objectives in any domain. Clarifies the real objective, separates confirmation from generation, avoids invented details, enforces domain quality, and produces a self-contained plan an agent can execute without guessing.
version: 2.1.0
---

# 360 Blueprint

## Purpose

Run this skill when a plan must be created from scratch. Its job is to turn an objective into a clear, executable plan with explicit assumptions, constraints, risks, and handover.

This skill creates plans. To fit one to this developer's goals, taste, and standing decisions, use `360-faculty`. To stress-test and finalize one, use `360-expert-review`. To execute a finalized plan, use `360-execute`. Run `360-token-efficiency` alongside this skill when context or cost matters.

## When to Use

- A new project, feature, migration, product, workflow, or initiative needs a plan
- A goal exists but the path is unclear
- Any request of the form "plan this"
- Not for tailoring a draft to this developer (`360-faculty`), hardening one that already exists (`360-expert-review`), or building one that is already final (`360-execute`)

## Core Principle

A plan is not finished when it sounds complete. It is finished when a fresh executor can act without guessing, and when every task is tied to a real objective.

Begin at the end. Think from first principles. Design out failure. Prefer the simplest plan that fully works.

## Workflow

### 1. Extract the True Objective

- Ask until the objective is clear: what done means, what must not happen, and how success is measured.
- Restate the objective in the user's terms.
- Check legitimacy and feasibility before planning.
- Surface constraints, deadlines, dependencies, and hidden goals.
- If the objective is ambiguous, ask before generating.

### 2. Confirm Before Generating

- If critical facts are missing, stop after clarification and wait for confirmation.
- Do not both ask blocking questions and deliver a final plan in the same turn.
- If the user asks for a draft despite uncertainty, label it `Draft` and list open questions explicitly.

### 3. See From Every Angle

- First principles: what is known, what is assumed, what is unknown
- Inversion: what would guarantee failure
- Second-order effects: what each major step sets in motion
- Stakeholders: who is affected, who decides, who executes, who can block
- Constraints: time, people, skills, systems, dependencies, unknowns

### 4. Design the Strategy

- Choose the simplest path that fully satisfies the objective.
- Sequence by dependency and by risk.
- Put discovery work first when uncertainty could invalidate the plan.
- Declare what is out of scope and how scope changes are handled.

### 5. Craft the Plan

- Structure the plan as phases and tasks. Give every task a stable ID (`1.1`, `1.2`) that later skills reference.
- Every task states what, how, where, and done when.
- Mark every task `Effort: S | M | L`, `Priority: must | should | could`, and `Parallel: yes | no`. Execution keys its drop rules off these exact values, so use no others.
- List the skills the executor must load for each task, or `None`.
- Define the cut line: `should` and `could` tasks may be cut, `must` tasks never.
- Do not invent stack choices, vendors, metrics, or architecture details. If a choice is required but unknown, write it as an open question.
- Keep names and terms consistent from start to finish.
- Make the plan self-contained for a fresh executor.

### 6. Enforce Quality by Domain

Apply the standards of the domain the plan touches.

When the plan produces code:

- Maintainable
- Scalable
- Auditable
- No duplication
- No weak logic
- No outdated practices

When the plan produces documentation:

- Update before creating
- One source of truth
- Clean structure
- Easy to find

For any other domain, define that domain's quality bar explicitly and enforce it.

### 7. Stress-Test Before Delivery

- Walk the plan end to end.
- Run a premortem.
- Falsify assumptions.
- Check whether two executors could read the same step two different ways.
- Verify every objective maps to tasks and every task serves an objective.

### 8. Deliver Crystal Clear

- Use the Plan Template below.
- Fill every field or write `N/A` with a one-line reason.
- State assumptions, open questions, and decision points explicitly.
- Offer `360-faculty` when the plan should be fitted to this developer's taste and standing decisions before review.
- Offer `360-expert-review` when the plan is important enough to deserve adversarial review.

## Plan Template

```markdown
# Plan: <title>

| Field | Value |
|---|---|
| Objective | <one sentence> |
| Status | Draft / Ready for review / Reviewed and ready to execute |
| Version | <version or date> |
| Created | <date> |
| Tailored by | <faculty roster reference, or N/A> |

## 1. Objective & Definition of Done
- Goal:
- Done when:
- Success measures:
- Must not happen:

## 2. Context & Constraints
- Background:
- Constraints:
- Stakeholders:

## 3. Strategy
- Chosen path:
- Why it wins:
- Alternatives rejected:

## 4. Scope
- In scope:
- Explicitly out of scope:
- Change policy:

## 5. Assumptions
| # | Assumption | Validated by |
|---|---|---|
| A1 |  |  |

## 6. Phases & Tasks
### Phase 1: <name>
Checkpoint:

**Task 1.1 — <name>**
- What:
- How:
- Where:
- Depends on:
- Skills: <skills the executor must load, or None>
- Parallel: yes | no
- Effort: S | M | L
- Priority: must | should | could
- Done when: <observable check>

## 7. Risks & Countermeasures
| Risk | Impact | Countermeasure |
|---|---|---|

## 8. Verification & Replanning
- Per task:
- Overall:
- Replan when:

## 9. Traceability
| Objective | Covered by tasks |
|---|---|

## 10. Handover Summary
- Context:
- Decisions:
- State: done / pending / blocked
- Remaining tasks: what, how, where
- Verification:
- Risks and how to detect them early:
- Cut line:
- Open questions:
- Decision points:
```

## Quality Gate

The plan is ready only when every answer is yes:

- The objective is clear and confirmed, or the output is explicitly marked `Draft`
- No blocking question was skipped
- No invented technical details were presented as facts
- Every assumption is explicit and falsifiable
- Every task has what, how, where, and done when
- Every task has a stable ID, declared skills, and `Effort` / `Priority` / `Parallel` values from the defined vocabularies
- The cut line is defined
- Every objective maps to tasks and no orphan tasks remain
- A fresh executor can act without guessing
- Checkpoints and replanning triggers exist
- The plan survived a premortem
- The report follows the Plan Template exactly

Any "no" means the plan is not finished. Refine and review again.
