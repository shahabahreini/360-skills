---
name: 360-blueprint
description: Create an executable plan from a new objective — clarify first, write the full plan to a file, and brief the user in chat — when a goal exists but the path is unclear or the request is "plan this".
version: 1.6.0
---

# 360 Blueprint

## Purpose

Run this skill when a plan must be created from scratch. Turn an objective into an executable plan with explicit assumptions, constraints, and risks.

The full plan lives in a file. Chat gets a short briefing only.

This skill creates plans. To review and finalize one, use `360-expert-review`.

## When to Use

- A new project, feature, migration, product, workflow, or initiative needs a plan
- A goal exists but the path is unclear
- Any request of the form "plan this"
- Not for hardening a plan that already exists (`360-expert-review`) or building one that is already final (`360-execute`)

## Core Principle

- A plan is finished when a fresh executor can act without guessing, and every task serves a real objective
- Begin at the end. Think from first principles. Design out failure. Prefer the simplest plan that fully works
- The file is the plan. Chat is the briefing

## Workflow

### 1. Extract the True Objective

- Ask until the objective is clear: what done means, what must not happen, and how success is measured
- Restate the objective in the user's terms
- Check legitimacy and feasibility before planning
- Surface constraints, deadlines, dependencies, and hidden goals
- If the objective is ambiguous, ask before generating

### 2. Confirm Before Generating

- If critical facts are missing, stop after clarification and wait for confirmation
- Do not both ask blocking questions and deliver a plan in the same turn
- If the user asks for a draft despite uncertainty, label it `Draft` and list open questions explicitly

### 3. See From Every Angle

- First principles: what is known, what is assumed, what is unknown
- Inversion: what would guarantee failure
- Second-order effects: what each major step sets in motion
- Stakeholders: who is affected, who decides, who executes, who can block
- Constraints: time, people, skills, systems, dependencies, unknowns

### 4. Design the Strategy

- Choose the simplest path that fully satisfies the objective
- Sequence by dependency and by risk
- Put discovery work first when uncertainty could invalidate the plan
- Declare what is out of scope and how scope changes are handled

### 5. Craft the Plan

- Structure the plan as phases and tasks
- Separate new capabilities from changes to existing features, behavior, or documents
- Every task states what, how, where, and done when
- Mark effort, priority, and parallelization
- Define the cut line
- Do not invent stack choices, vendors, metrics, or architecture details. If a choice is required but unknown, write it as an open question
- Keep names and terms consistent from start to finish
- Make the plan self-contained for a fresh executor

### 6. Enforce Quality by Domain

Apply the standards of the domain the plan touches.

When the plan produces code: maintainable, scalable, auditable, no duplication, no weak logic, no outdated practices.

When the plan produces documentation: update before creating, one source of truth, clean structure, easy to find.

For any other domain, define that domain's quality bar explicitly and enforce it.

### 7. Stress-Test Before Delivery

- Walk the plan end to end
- Run a premortem
- Falsify assumptions
- Check whether two executors could read the same step two different ways
- Verify every objective maps to tasks and every task serves an objective

### 8. Deliver in Two Channels

- Write the full plan to a file using the work-file template
- Reuse the existing path if known; otherwise `plans/<short-slug>.md`; create the folder if needed; ask once if the location is ambiguous
- If the file cannot be written, stop and ask where to save — never paste the plan into chat as a fallback
- Print only the terminal briefing
- If the plan deserves adversarial review before build, say so in plain language — no skill names

## Output Format

### Work file

```markdown
# Plan: <title>

| Field | Value |
|---|---|
| Objective | <one sentence> |
| Status | Draft / Ready for review |
| Version | <version or date> |
| Created | <date> |

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
- New:
- Updates to existing:
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
- Parallel:
- Effort:
- Priority:
- Done when:

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
- Executor must know:
- Cut line:
- Open questions:
- Decision points:
```

Fill every field or write `N/A` with a one-line reason.

### Terminal briefing

Use this shape. Omit any section that would be empty. Never paste the work file into chat.

```text
<what this plan is> — plan is ready
Full plan: <path>

Features to add
- <new capability as an outcome>

Updates to existing
- <change to something that already exists>

Not adding
- <left out on purpose>

Issues found
- <problem or uncertainty> — <proven|likely|possible|uncertain>

Need from you
- <blocking decision only>
```

- First line is `plan is ready` or `draft — open questions remain`
- Talk to the user, not the next agent. Outcomes, not tasks
- A new artifact is Features to add. A change to an existing artifact, feature, or document is Updates to existing. Never mix them
- Confidence: `proven` evidence in hand; `likely` strong reason; `possible` suspected; `uncertain` hypothesis. Never numbers
- No phases, tasks, MoSCoW, status tables, handover, or skill names

## Quality Gate

The plan is ready only when every answer is yes:

- The objective is clear and confirmed, or the output is explicitly marked `Draft`
- No blocking question was skipped
- No invented technical details were presented as facts
- Every assumption is explicit and falsifiable
- Every task has what, how, where, done when, effort, priority, and parallel markings
- The cut line is defined
- Every objective maps to tasks and no orphan tasks remain
- New work and updates to existing work are grouped separately
- A fresh executor can act without guessing
- Checkpoints and replanning triggers exist
- The plan survived a premortem
- The work file follows the template, lives at the stated path, and was not pasted into chat
- The briefing omits empty sections and uses proven/likely/possible/uncertain, never numbers

Any "no" means the plan is not finished. Refine and review again.