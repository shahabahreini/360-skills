---
name: 360-execute
description: Execute a finalized plan task by task with a persisted coverage ledger, verify every item with evidence, and brief the user in chat. Use when a plan exists and work must begin, or when resuming a partial execution.
version: 1.1.0
---

# 360 Execute

## Purpose

Run this skill when a finalized plan must be executed — completely, faithfully, and verifiably. Everything on the plan gets done, QCed against its own acceptance check, and accounted for.

This skill executes plans. To create one, use `360-blueprint`. To stress-test and finalize one, use `360-expert-review`. To audit the built result afterward, use `360-backend-audit`.

The ledger and report live in a file. Chat gets a short briefing only.

## When to Use

- A plan exists and work must begin — any domain, any scale
- Any request of the form "implement this plan", "build this", "execute this"
- Resuming a partially executed plan — the ledger file is the source of truth
- Not for creating plans (`360-blueprint`) or reviewing drafts (`360-expert-review`)

## Core Principle

- The plan is the contract — execute what it says, not what feels close enough
- Coverage is tracked, not trusted — a persisted ledger records every task and its verdict
- Done is a verdict with evidence — a task is complete when its acceptance check passes
- Deviations surface, never absorb — reality overrides the plan only through an explicit decision
- The file is the record. Chat is the briefing

## Workflow

### 1. Load the Plan Completely

Never execute a plan you have not fully read.

- Read the entire plan before touching anything: objective, scope, assumptions, every phase, every task, every checkpoint
- Build the full task inventory: every task ID, its priority, its dependencies, its "done when" check
- If any task lacks an observable acceptance check, derive one and confirm it with the user before executing that task
- If anything is ambiguous, ask before starting

### 2. Persist the Coverage Ledger

The ledger is the spine of execution and the source of truth for progress.

- Write it to a file and keep it current after every task
- Reuse the existing path if known; otherwise `plans/<short-slug>-execution.md`; create the folder if needed; ask once if ambiguous
- If the file cannot be written, stop and ask — never treat chat as the ledger
- One row per task: ID, name, priority, acceptance check, status
- Statuses: `pending` / `in progress` / `done (verified)` / `blocked` / `dropped (approved)`
- Nothing counts as done until the ledger says verified
- A fresh agent must be able to open the file and continue with zero guessing

### 3. Execute in Order

- Follow phase order and task dependencies exactly; honor parallel markers
- Load every skill a task declares (e.g., `360-token-efficiency`) before starting that task
- Verify each phase checkpoint before advancing to the next phase — a failed checkpoint stops the line
- Do exactly what the task specifies — no silent extras, no silent shortcuts

### 4. Verify Every Task

- Run the task's "done when" check and record the evidence in the ledger
- Done means the check passed with evidence — never "looks right", never "should work"
- If a check cannot be executed, mark the task `blocked` with the reason — never mark it done
- Sweep for collateral damage after each task: nothing else broke, nothing unrelated changed

### 5. Handle Deviations in the Open

When reality disagrees with the plan — a failed assumption, missing information, a visibly better path:

- Stop that line of work; do not improvise forward
- Follow the plan's change policy or replanning triggers
- Surface the deviation to the user with options and a recommendation
- Never silently absorb new scope, never silently skip a task
- A `must`-priority task is never dropped without an explicit user decision; `should`/`could` tasks follow the plan's cut line

### 6. Sweep and Write the Report

Before declaring completion, walk the ledger top to bottom:

- Every task has a final status — zero unaccounted items
- Cross-check the plan's traceability: every objective maps to verified work
- Run the plan's overall verification; confirm all checkpoints passed
- Sweep once more for regressions introduced across phases
- Write the execution report into the same ledger file
- Print only the terminal briefing

## Output Format

### Work file

The ledger file contains:

1. Coverage ledger — every task: ID, name, priority, final status, evidence for each `done (verified)`
2. Deviations — what diverged, how it was resolved, who approved it; or "None"
3. QC results — checks run, checkpoints verified, regression sweeps, outcomes
4. Unfinished items — pending, blocked, or dropped, with reason and approval; or "None"
5. Handover summary — context, decisions, current state, remaining tasks with what/how/where, risks and how to detect them early

### Terminal briefing

Use this shape. Omit any section that would be empty. Never paste the work file into chat.

```text
Execution — <n>/<m> tasks verified
Full report: <path>

Done
- <outcome delivered>

Updates to existing
- <change made to something that already existed>

Blocked
- <item and why>

Deviations
- <what changed and whether it was approved>

Issues found
- <bug or surprise> — <proven|likely|possible|uncertain>
```

- Talk to the user, not the next agent
- Done is new work shipped. Updates to existing is a change to something that already existed. Never mix them
- Confidence: `proven` evidence in hand; `likely` strong reason; `possible` suspected; `uncertain` hypothesis. Never numbers. Never say proven without evidence
- No ledger dump, no handover essay, no skill names

## Quality Gate

Execution is complete only when every answer is yes:

- Every task in the plan appears in the ledger file with a final status — zero unaccounted items
- Every `done (verified)` verdict is backed by evidence from the task's own acceptance check
- Every phase checkpoint was verified before the next phase began
- Every deviation was surfaced and resolved through the plan's change policy or a user decision — none silently absorbed
- No `must`-priority task was dropped or skipped without explicit user approval
- Every objective in the plan's traceability maps to verified work
- Regressions and collateral damage were swept for, and the results are stated
- Declared skills were loaded wherever the plan required them
- Unfinished items are stated honestly — pending, blocked, or dropped, with reasons
- The ledger file lets the next agent continue with zero guessing
- Chat does not contain the ledger or report body
- The briefing omits empty sections and uses proven/likely/possible/uncertain, never numbers

Any "no" means execution is not finished. Fix it and re-run the sweep.