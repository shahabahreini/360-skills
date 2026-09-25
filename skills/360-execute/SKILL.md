---
name: 360-execute
description: Execute a finalized plan task by task with a persisted coverage ledger, verify every item with evidence, and brief the user in chat. Use when a plan exists and work must begin, or when resuming a partial execution.
version: 2.2.0
---

# 360 Execute

## Purpose

Execute an authorized plan against its acceptance checks and keep a recoverable coverage ledger of results, deviations and unfinished work.

## When to Use

- A plan exists and work must begin — any domain, any scale
- Any request of the form "implement this plan", "build this", "execute this"
- Resuming a partially executed plan by reconciling its ledger with current evidence
- Not for creating plans (`360-blueprint`) or reviewing drafts (`360-expert-review`)

## Core Principle

Current evidence establishes progress; the ledger records it.

## Workflow

### Entry: Optional Token Efficiency

Reuse explicit approval or refusal for `360-token-efficiency` from this session. If unknown and not already offered, ask once whether to enable it for this session; continue the main task with the overlay inactive while unanswered. Explicit user invocation counts as approval; merely appearing in a generated plan does not. On approval, discover and load it through the host's supported skill mechanism, reusing already-loaded instructions. If unavailable, explain briefly and continue; do not install automatically. Refusal disables the overlay, not ordinary efficient habits. Revocation takes effect immediately. Keep consent in-session only; it does not authorize cross-session memory writes. The overlay never invokes itself or restarts the parent skill.

### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or `None`), Parallel, Effort, Priority, Done when (observable). Use `Priority: must | should | could`, `Effort: S | M | L`, and `Parallel: yes | no`. Only `should` and `could` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: `Draft` → `Ready for review` → `Reviewed and ready to execute`. Open blocking questions keep it `Draft`; a complete unreviewed plan is `Ready for review`; a passed review sets `Reviewed and ready to execute`. Material edits after review return it to `Ready for review` (or `Draft` if blocked). Execution progress belongs in the ledger, not the readiness status. An explicit user instruction to execute a supplied plan authorizes execution without a mandatory sibling review; record that basis without claiming a review occurred.

### Delivery

Prefer a recoverable file when supported, using the existing path or the default below. Honor explicit user output requests. If files are unavailable, deliver the same complete structure in-session and label it `in-session only; not persisted`; never claim a file was saved. With a saved file, chat normally carries a short briefing and its path. These delivery rules also apply to the templates and quality gate below.

Use observable preservation and acceptance checks. Structural validation cannot prove behavior or accuracy; evaluate realistic consent, capability, recovery, and handoff scenarios separately. Document unavailable telemetry and regressions; do not infer universal accuracy or token savings from finite tests.

### 1. Load the Plan Completely

Never execute a plan you have not fully read.

- Read the entire plan before touching anything: objective, scope, assumptions, every phase, every task, every checkpoint
- Build the full task inventory: every task ID, its priority, its dependencies, its "done when" check
- If an acceptance check is missing, derive it from the approved objective; ask only when alternatives would change the intended outcome
- Resolve material ambiguity before dependent work; continue independent authorized work

Never automatically clear history. Use context management only when the host supports it. Before compaction or handoff, preserve and verify the six handover fields against the plan and ledger, including constraints, authorization, unresolved uncertainty, evidence locations, and exact values. Reopen original evidence if the summary cannot support the next decision. Without recoverable artifacts or context controls, keep state in-session and explain any continuity limit.

### 2. Persist the Coverage Ledger

Reconcile the plan, ledger, actual artifacts or external state, and relevant verification before resuming. A ledger verdict is a recorded claim until current evidence supports it.

- Write it to a file and keep it current after each task and significant partial effect
- Reopen stale or unsupported verified rows; record what changed and invalidate affected verification, including dependent results. Recheck only the affected acceptance conditions
- Reuse the existing path if known; otherwise `plans/<short-slug>-execution.md`; create the folder if needed; reuse repository conventions for routine location choices
- If the file cannot be written, use the in-session delivery fallback
- One row per task: ID, name, priority, acceptance check, status
- Statuses: `pending` / `in progress` / `done (verified)` / `blocked` / `dropped (approved)`
- Mark verified only when current acceptance evidence supports it; include source revision or state identifiers when relevant
- Record remaining uncertainty and the next check so a fresh agent can resume safely

### 3. Execute in Order

- Follow phase order and task dependencies exactly; honor parallel markers
- Load declared skills through the supported host mechanism when available. The optional `360-token-efficiency` always follows session consent; a plan listing is not approval. If another declared skill is unavailable, use the self-contained contract and available capabilities; block only tasks that actually require the missing capability
- Verify each phase checkpoint before advancing dependent work. A failure blocks affected descendants; continue independent authorized work where dependencies and parallel markers permit
- Keep work within the task and change policy
- Before a non-repeatable or external action, record intent and a recoverable operation identifier or reconciliation method. After interruption, inspect partial effects and external state before retrying. Reuse confirmed results; retry only if absence or safe repeatability is established. If state cannot be determined, block that action and identify the missing check

### 4. Verify Every Task

- Run the task's "done when" check and record the evidence in the ledger
- Done means the check passed with evidence — never "looks right", never "should work"
- If an implementation acceptance check cannot run, mark the task `blocked` with the missing evidence. An assessment task may finish with disclosed limits only when its own acceptance criteria permit them; an unknown check never becomes a pass
- Check affected behavior and the diff after each task; state the inspected boundary and regressions rather than claiming everything else is safe

### 5. Handle Deviations in the Open

When reality disagrees with the plan — a failed assumption, missing information, a visibly better path:

- Classify the departure under the plan's change policy and existing authorization
- Resolve routine reversible implementation choices within that authority; record the reason and affected checks without asking again
- Escalate changes to outcome, scope, acceptance criteria, significant cost, irreversible effects or authorization. Stop dependent work and present concrete options; continue independent authorized tasks
- Never silently absorb new scope, never silently skip a task
- A `must`-priority task is never dropped without an explicit user decision; `should`/`could` tasks follow the plan's cut line

### 6. Sweep and Write the Report

Before declaring completion, walk the ledger top to bottom:

- Every task has a final status — zero unaccounted items
- Cross-check the plan's traceability: every objective maps to verified work
- Run the plan's overall verification; confirm all checkpoints passed
- Sweep once more for regressions introduced across phases
- Write the execution report into the same ledger file
- With a saved file, print the terminal briefing and path

### Completion: Choose the Next Action

- Finish and verify the current deliverable first; make the result and its location available before asking about follow-on work. Keep artifact readiness separate from the next-action choice: an unanswered suggestion does not reopen completed work, and a blocked job is not complete
- Check the result, current project stage, remaining risks, and prior user instructions. Recommend the next useful action from the local routing guidance below; skip irrelevant stages and prefer stopping when no useful work remains
- Use an available interactive question tool to offer one concise next-action choice. Put the best recommendation first, explain why it fits this result, and include a stop/pause choice. Always allow a free-text note or custom direction, including work outside the 360 flow; never force the user into a sibling skill
- If interactive tools are unavailable, offer equivalent numbered choices with the recommendation, rationale, and explicit custom-note option in chat. This completion prompt is separate from the deliverable briefing; skill names are allowed here, and it is not a passive list of unresolved task questions
- Reuse an already explicit next-step instruction instead of asking again; continue work it authorizes. Otherwise wait for the user's choice before starting follow-on work. Silence, a preselected recommendation, and elapsed time are not authorization. An explicit stop or request for no suggestions suppresses the prompt
- When the user chooses, follow that direction and clarify only missing information needed for it. Discover and load a selected skill through the host's supported mechanism; do not assume it is installed or install it automatically. If unavailable, explain and offer an equivalent action. Carry forward artifact paths, decisions, verification, remaining risks, and session consent without restarting intake

Local routing: Recommend `360-backend-audit` after significant backend work, or `360-optimize` when working code has a relevant performance or weight concern. For other completed work, recommend a concrete domain-appropriate follow-up or stopping; do not invent backend work to fit the flow.

## Output Format

### Work file

The ledger file contains:

1. Coverage ledger — every task: ID, name, priority, final status, evidence for each `done (verified)`
2. Deviations — what diverged, how it was resolved, who approved it; or "None"
3. QC results — checks run, checkpoints verified, regression sweeps, outcomes
4. Unfinished items — pending, blocked, or dropped, with reason and approval; or "None"
5. Handover summary — Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early

### Terminal briefing

Use this shape. Omit any section that would be empty. Follow the Delivery rules for file or in-session output.

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
- With file delivery, keep the briefing concise; name a missing skill when it explains a limitation

## Quality Gate

- Completion includes the interactive next-action offer with a recommendation, stop choice, and custom-note option, or the explicit-instruction/parent-owned exception; unanswered suggestions do not block the completed deliverable

Execution is complete only when every answer is yes:

- Every task in the plan appears in the ledger file with a final status — zero unaccounted items
- Every `done (verified)` verdict is backed by evidence from the task's own acceptance check
- Every phase checkpoint passed before its dependent work advanced; independent work respected authorization and dependency/parallel markers
- Every deviation was recorded and resolved within existing authorization/change policy or an explicit user decision
- No `must`-priority task was dropped or skipped without explicit user approval
- Every objective in the plan's traceability maps to verified work
- Regressions and collateral damage were swept for, and the results are stated
- Declared skill availability and consent were respected; required unavailable capabilities are explicit blockers
- Unfinished items are stated honestly — pending, blocked, or dropped, with reasons
- The ledger matches current artifacts and verification; stale verdicts and partial actions were reconciled before resumption
- The next agent can recover evidence, uncertainty and the next check; affected verification was invalidated after relevant changes
- Delivery honors the requested format and accurately states persistence
- The briefing omits empty sections and uses proven/likely/possible/uncertain, never numbers

Any "no" means execution is not finished. Fix it and re-run the sweep.
