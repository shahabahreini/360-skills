---
name: 360-execute
description: Faithful plan execution with enforced coverage. Executes a finalized plan task by task, tracks every item in a coverage ledger, verifies each against its acceptance check with evidence, surfaces deviations instead of absorbing them, and finishes with a full-coverage QC sweep and flawless handover. Nothing on the plan is skipped, dropped, or claimed done without proof.
version: 1.0.0
---

# 360 Execute

## Purpose

Run this skill when a **finalized plan must be executed** — completely, faithfully, and verifiably. Its job: guarantee that everything on the plan gets done, gets QCed against its own acceptance check, and gets accounted for — nothing missed, nothing silently changed, nothing claimed without evidence.

This skill executes plans. To create one, use `360-blueprint`. To stress-test and finalize one, use `360-expert-review`. To audit the built result afterward, use `360-backend-audit`. Run `360-token-efficiency` alongside this skill when context or cost matters.

## When to Use

- A plan exists and work must begin — any domain, any scale
- Any request of the form "implement this plan", "build this", "execute this"
- Resuming a partially executed plan — the ledger file rebuilds the state
- Not for creating plans (`360-blueprint`) or reviewing drafts (`360-expert-review`)

## Core Principle

The plan is the contract: execute what it says, not what feels close enough. Coverage is tracked rather than trusted, and done is a verdict backed by evidence, not a feeling that the work is finished.

Reality overrides the plan only through an explicit decision, never through a quiet improvisation.

## Workflow

### 1. Load the Plan Completely

Never execute a plan you have not fully read.

- Read the entire plan before touching anything: objective, scope, assumptions, every phase, every task, every checkpoint
- Build the full task inventory: every task ID, its priority, its dependencies, its "done when" check
- If any task lacks an observable acceptance check, derive one and confirm it with the user before executing that task
- If anything is ambiguous, ask before starting — questions before execution, not after

### 2. Build the Coverage Ledger

The ledger is the spine of execution and the source of truth for progress.

- Write it to a file, never only to the conversation: `<plan-name>.ledger.md` beside the plan, or an `## Execution Ledger` section appended to the plan file itself
- One row per task: ID, name, priority, acceptance check, status, evidence
- Statuses: `pending` / `in progress` / `done (verified)` / `blocked` / `dropped (approved)`. The last three are terminal
- Update the file as each status changes, not in a batch at the end — an interrupted run must leave accurate state on disk
- Nothing counts as done until the ledger says verified — memory and confidence are not tracking
- To resume, read the ledger file first and continue from the first non-terminal row

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

### 6. Sweep for Full Coverage

Before declaring completion, walk the ledger top to bottom:

- Every task has an accounted status, and every non-terminal one is listed as unfinished with a reason
- Cross-check the plan's traceability: every objective maps to verified work
- Run the plan's overall verification; confirm all checkpoints passed
- Sweep once more for regressions introduced across phases
- Only then write the Execution Report

## Output Format

Deliver an Execution Report in exactly this structure:

1. **Coverage ledger** — every task: ID, name, priority, final status, and the evidence behind each `done (verified)`
2. **Deviations** — what diverged from the plan, how each was resolved, who approved it; or "None"
3. **QC results** — checks run, checkpoints verified, regression sweeps, and their outcomes
4. **Unfinished items** — anything pending, blocked, or dropped, each with its reason and approval; or "None"
5. **Handover summary** — context, decisions, state (done / pending / blocked), remaining tasks with exactly what, how, and where, verification, and risks with how to detect them early

## Quality Gate

Execution is complete only when every answer is yes:

- The ledger exists as a file on disk and matches the reported outcome
- Every task in the plan appears in the ledger with an accounted status — zero unaccounted items
- Every `done (verified)` verdict is backed by evidence from the task's own acceptance check
- Every phase checkpoint was verified before the next phase began
- Every deviation was surfaced and resolved through the plan's change policy or a user decision — none silently absorbed
- No `must`-priority task was dropped or skipped without explicit user approval
- Every objective in the plan's traceability maps to verified work
- Regressions and collateral damage were swept for, and the results are stated
- Declared skills were loaded wherever the plan required them
- Unfinished items are stated honestly — pending, blocked, or dropped, with reasons
- The handover lets the next agent continue with zero guessing

Any "no" means execution is not finished. Fix it and re-run the sweep.
