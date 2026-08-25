---
name: 360-blueprint
description: Universal plan creator. Brings superhuman rigor to planning any objective — software, business, creative, operational, personal. Clarifies the true objective, thinks from first principles, enforces the quality standards of the domain, and delivers a crystal-clear, self-contained plan report that any AI agent can execute without guessing.
version: 1.4.0
---

# 360 Blueprint

## Purpose

Run this skill when a plan must be **created from scratch** — for any objective, in any domain. Its job: bring a superhuman mind to planning — philosophical depth, complete coverage, zero vagueness — and deliver a plan so clear that any AI agent or human can execute it cold.

This skill creates plans. To review and finalize an existing plan, use `360-expert-review`.

## When to Use

- A new project, feature, product, migration, or initiative needs a plan
- A goal exists but the path is unclear
- Any request of the form "plan this" — in any field, at any scale

## Core Principle

Superhuman planning is not more complexity — it is more clarity. Four disciplines drive every plan: **begin at the end** (define done, work backward), **first principles** (build on truths, not assumptions), **inversion** (design failure out), and **second-order thinking** (map what each step sets in motion).

A plan that can be misunderstood will be. Clarity is the deliverable.

## Workflow

### 1. Extract the True Objective

Never plan toward fog.

- Ask the user until the objective is crystal clear — what does "done" look like, how will we measure it, what must not happen?
- Separate the stated request from the real goal; restate the objective back in the user's own terms and proceed only on confirmation
- Check legitimacy and feasibility first — if the objective is harmful, impossible, or self-contradictory, say so before planning, not after
- Surface every hidden objective, constraint, and deadline
- Ask the user whether to apply `360-token-efficiency` during implementation of this plan — if yes, add it as a loaded skill in every implementation task in Section 6 and note it in Section 10
- If anything is ambiguous, ask. Questions are cheaper than wrong plans

### 2. See From Every Angle

The superhuman pass — examine the problem the way no single mind would:

- First principles — what is certainly true here? What is merely assumed?
- Inversion — what would guarantee failure? What would make success almost automatic?
- Second-order effects — what does each major step set in motion?
- Stakeholders — who is affected, who decides, who executes, who can block?
- Constraints — time, resources, skills, dependencies, unknowns. Name them all; unnamed constraints sink plans

### 3. Design the Strategy

- Choose the simplest path that fully satisfies the objective — simplest means: **removing any task would fail an objective** — and say why it beats the alternatives
- Sequence by dependency and by risk — schedule earliest the work that could invalidate the whole plan
- Mark uncertainty honestly — high-uncertainty work gets a discovery step first, never a confident guess
- Declare what is explicitly out of scope, and how new requests are handled — parked, or trigger a replan; never silently absorbed

### 4. Craft the Plan

- Structure: phases → tasks, ordered by dependency, each independently verifiable
- Every task answers: **what** is done, **how** it is done, **where** it applies, and **done when** — the observable check that proves completion
- Every task is marked: effort (S/M/L), priority (must / should / could), and whether it can run in parallel
- If token efficiency was accepted in Step 1, every implementation task also lists `Skills: 360-token-efficiency` alongside any other loaded skill
- Define the cut line — which should/could tasks drop first when constraints tighten. They always tighten
- Zero vague words. Banned unless precisely defined: "appropriate", "handle", "optimize", "etc.", "as needed", "and so on" — this skill included
- Names, terms, and definitions stay identical from first mention to last
- Self-contained: an agent opening this plan in a fresh session, knowing nothing, can execute it without asking a single question

### 5. Enforce Quality by Domain

A plan is only as good as what it produces. Apply the standards of the domain the plan touches — where relevant, never as ceremony.

**When the plan produces code:**

- Maintainable — clear structure, single responsibility, readable by the next engineer
- Scalable — grows with load and features without rewrites
- Auditable — decisions, logic, and changes are traceable and reviewable
- No duplication — shared logic is unified, never copy-pasted across the plan
- No weak logic — no fragile conditionals, hidden side effects, or half-handled cases
- No outdated methods or practices — prefer current, maintained, community-trusted approaches; flag anything inherited that is deprecated or discouraged

**When the plan produces documentation:**

- Update before creating — find existing documents first; edit, extend, or unify them instead of spawning duplicates
- One source of truth — merge overlapping documents, resolve contradictions, refresh or remove stale content
- Clean and polished — consistent naming, formatting, and hierarchy; every document has a clear purpose and a clear home
- Organized to be found — structure serves the reader, not the writer

**Any other domain:** identify that domain's definition of quality explicitly and enforce it the same way.

### 6. Stress-Test Before Delivery

- Walk the plan start to finish — does every step follow logically from the last? Does anything reference work that doesn't exist?
- Premortem — assume the plan failed; write down why; design out every cause worth preventing
- Falsify the assumptions — for each one, name the evidence that would prove it wrong
- Executor's test — could two different agents read any step two different ways? If yes, sharpen it until they can't
- Coverage check — every objective maps to tasks; every task serves an objective. No orphans in either direction

### 7. Deliver Crystal Clear

- Output the plan using the Plan Template below — fill every field; if a field does not apply, write `N/A` with a one-line reason
- State assumptions, open questions, and decision points explicitly — never buried
- Offer to adjust depth or scope, and to hand the plan to `360-expert-review` for final adversarial review

## Plan Template

Output every plan as an organized report in exactly this structure:

```markdown
# Plan: <title>

| Field | Value |
|---|---|
| Objective | <one sentence> |
| Status | Draft / Ready for review |
| Version | <version or date> |
| Created | <date> |
| Token efficiency | Enabled (360-token-efficiency) / Not requested |

## 1. Objective & Definition of Done
- Goal: <the real objective, confirmed with the user>
- Done when: <observable state that proves completion>
- Success measures: <what is measured, target, and how>
- Must not happen: <unacceptable outcomes>

## 2. Context & Constraints
- Background: <what shaped this plan>
- Constraints: <time, resources, skills, dependencies, unknowns>
- Stakeholders: <affected / decides / executes / can block>

## 3. Strategy
- Chosen path: <the approach in a few sentences>
- Why it wins: <reasoning>
- Alternatives rejected: <each with its reason>

## 4. Scope
- In scope: <...>
- Explicitly out of scope: <...>
- Change policy: <how new requests are handled — parked or replan>

## 5. Assumptions
| # | Assumption | Validated by |
|---|---|---|
| A1 | <assumption> | <task or step that verifies it> |

## 6. Phases & Tasks

### Phase 1: <name>
Checkpoint: <criterion that must hold before Phase 2 begins>

**Task 1.1 — <name>**
- What: <what is done>
- How: <how it is done, step by step where needed>
- Where: <artifacts, areas, or components affected>
- Skills: <e.g. 360-token-efficiency, if enabled, plus any other loaded skill, or "none">
- Depends on: <task IDs or "none"> | Parallel: <yes/no>
- Effort: <S/M/L> | Priority: <must/should/could>
- Done when: <observable acceptance check>

**Task 1.2 — <name>**
- ...

### Phase 2: <name>
- ...

## 7. Risks & Countermeasures
| Risk | Impact | Countermeasure |
|---|---|---|
| <risk> | <consequence> | <prevention, detection, or recovery> |

## 8. Verification & Replanning
- Per task: see each task's "Done when"
- Overall: <how completion of the whole plan is confirmed>
- Replan when: <triggers — an assumption fails, a checkpoint is missed, scope changes>

## 9. Traceability
| Objective | Covered by tasks |
|---|---|
| <objective> | <task IDs> |

## 10. Handover Summary
- Executor must know: <everything a fresh agent needs, in one place>
- Token efficiency: <"Load 360-token-efficiency for all implementation tasks" or "Not requested">
- Cut line: <tasks that drop first if constraints tighten>
- Open questions: <...>
- Decision points: <...>
```

## Quality Gate

The plan is ready only when every answer is yes:

- The objective is crystal clear, restated in the user's terms, and confirmed — and it passed the legitimacy and feasibility check
- The user was explicitly asked about applying `360-token-efficiency`, and the answer is reflected consistently across Section 6 and Section 10
- Zero vague terms; zero unstated assumptions; every assumption is falsifiable
- Every task is executable without guessing — what, how, where, and done-when are all present
- Every task carries effort, priority, and parallel markings; the cut line is defined
- Every objective is covered; no orphan tasks
- Removing any task would fail an objective — nothing extra remains
- The plan is self-contained for a fresh executor
- Checkpoints and replanning triggers are defined — the plan knows what to do when reality disagrees
- If the plan produces code: it enforces maintainable, scalable, auditable development — no duplication, no weak logic, no outdated methods or practices
- If the plan produces documentation: existing documents are updated, edited, or unified — one source of truth, clean and well-structured
- It survived the premortem
- The report follows the Plan Template exactly — every field filled or marked `N/A` with reason

Any "no" means the plan is not finished. Refine and review again.
