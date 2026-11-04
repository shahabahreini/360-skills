---
name: 360-execute
description: Execute a finalized plan task by task with a persisted coverage ledger, verifying every item against its own acceptance check and keeping chat to short status lines and a final briefing. Optionally delegate routine tasks to lighter models under audit, or run the work in one background executor for a quiet screen. Use when a plan exists and work must begin, or when resuming a partial execution.
version: 4.0.0
---

# 360 Execute

## Purpose

Execute an authorized plan against its acceptance checks, keep a recoverable coverage ledger of results, deviations and unfinished work, and spend the fewest tokens that still meet every check.

## When to Use

- A plan exists and work must begin, in any domain and at any scale
- Requests such as "implement this plan", "build this", "execute this"
- Resuming a partially executed plan by reconciling its ledger with current evidence
- Not for creating plans (`360-blueprint`) or reviewing drafts (`360-expert-review`)

## Core Principle

Current evidence establishes progress; the ledger records it. Delegation speeds execution; it never transfers accountability.

## Workflow

### Entry: Optional Token Efficiency

Reuse this session's approval or refusal of `360-token-efficiency`. If unknown and not yet offered, ask once, in the same question round as any other entry question, and keep the overlay off until answered. Explicit user invocation is approval; a plan that lists the skill is not. On approval, load it through the host's skill mechanism, reusing instructions already loaded; if unavailable, say so briefly and continue without installing it. Refusal turns the overlay off, not ordinary efficient work. Revocation takes effect immediately. Consent lasts this session only and never authorizes cross-session memory writes.

### Entry: Session Choices

Ask each unknown choice once, in the same round as the token-efficiency offer, then start work; an unanswered choice uses its default. Reuse this session's answers. A later change applies from the next task.

- Model delegation, default off. Trade-off: routine tasks go to lighter, faster subagents and complex ones stay with the current or a heavier model; you audit everything returned. Refusal is an equal choice: the same work runs with the current model. On approval, class models by relative tier (lighter, same, heavier) and prefer the newest model the host offers in each tier; do not assume any vendor or model name. Without a subagent or tier mechanism, say so and run sequentially
- Output mode, default `lean`. `lean` works in the main thread at the lowest token cost, with tool calls visible and chat minimal. `quiet` runs the work in one background executor so the screen shows only the todo list and status lines, at a higher token cost. These mode words belong to this skill; treat `verbose` as `lean`

### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or `None`), Parallel, Effort, Priority, Done when (observable). Use `Priority: must | should | could`, `Effort: S | M | L`, and `Parallel: yes | no`. Only `should` and `could` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: `Draft` → `Ready for review` → `Reviewed and ready to execute`. Open blocking questions keep a plan `Draft`; a complete unreviewed plan is `Ready for review`; only a passed review sets `Reviewed and ready to execute`, and material edits after it return the plan to `Ready for review` (or `Draft` if blocked). Execution progress lives in the ledger, not in this status. An explicit user instruction to execute a supplied plan authorizes execution without a sibling review; record that basis and never claim a review occurred.

### Delivery

Write the deliverable to a recoverable file when the host supports it, at the existing path or the default below. Honor explicit user output requests. Without files, deliver the same complete structure in chat labeled `in-session only; not persisted`, and never claim a file was saved. With a saved file, chat carries the Reader's Briefing and the path.

Judge completion by observable acceptance checks. A structural or format check does not prove behavior or accuracy; state what was not verified.

### Output Modes

Both modes share one chat rule: chat carries only failures, blockers, deviations and decisions, one or two lines each, and no code, diffs, file contents or raw command output. Put intent in each tool call's description instead of in chat.

**Lean (default)**

- Run builds, tests and checks with full output redirected to `<slug>-log.txt` beside the ledger. Keep only exit status and counts in context; read the log by search or line range when a decision needs it
- Read only the files and ranges a task needs, batch independent reads and checks in one turn, and do not re-read a file you just edited
- Change existing files with targeted edits; write whole files only when creating them
- Update the ledger, and in the main thread the todo list, in the same turn as the next action, never in a turn of their own
- Do not repeat a check that passed with unchanged inputs

**Quiet (on request)**

Hosts display every main-thread tool call, so a quiet screen needs the work out of view. Where the host can run a background subagent and notify the main thread:

1. The main thread (the shell) reads the plan once, creates one todo item per task (`<ID> <task name>`), and launches one background executor with the Executor Brief. One executor serves the whole plan, because each subagent pays its own start-up cost
2. The executor runs Steps 1 to 7 under the Lean rules and appends events to `<slug>-events.txt`: `@ <phase> done <IDs>` at each phase checkpoint, and `@ <ID> <status> <note>` immediately for `failed`, `blocked` or `needs decision`
3. The shell waits on the host's notifications without polling or sleeping; each wake re-reads its context, so completions arrive batched by phase. Per event, it updates the todo list and posts one line: `<symbol> <task names>: <8 words or fewer>`
4. On `needs decision`, the shell asks the user with the interactive question tool and sends the answer to the same executor, which continues independent work meanwhile
5. When the executor finishes, the shell runs the plan's overall verification once as an independent check. A mismatch reopens the affected task
6. The executor's final reply holds only the final Progress Board and the Reader's Briefing; the shell prints both

Without background subagents or notifications, say in one line that quiet is unavailable on this host and continue in `lean`.

### 1. Load the Plan Completely

- Read the entire plan before touching anything: objective, scope, assumptions, every phase, task and checkpoint
- Record the plan's readiness status and the authorization basis. Open blockers in a `Draft` plan block the tasks they affect
- Build the full task inventory: every task ID, its priority, its dependencies and its done-when check
- If an acceptance check is missing, derive it from the approved objective; ask only when alternatives would change the intended outcome
- Resolve material ambiguity before dependent work; continue independent authorized work

Never clear history automatically. Before host compaction or a handoff, write the six handover fields into the ledger and check them against the plan, including constraints, authorization, open uncertainty, evidence locations and exact values. Reopen the original evidence when the summary cannot support the next decision.

### 2. Persist the Coverage Ledger

- Write the ledger to a file and keep it current after each task and each significant partial effect. Reuse the existing path if known; otherwise use `plans/<short-slug>-execution.md`, creating the folder if needed. If the file cannot be written, use the Delivery fallback
- One row per task: ID, name, priority, acceptance check, status, evidence. Delegated tasks also record the tier and the audit result
- Statuses (the text label is required; the symbol is optional):
  - `pending` ○: not started
  - `in progress` ◐: work underway
  - `verifying` ◑: work finished, acceptance check running
  - `done (verified)` ✓: check passed with recorded evidence
  - `failed` ✗: check failed; being fixed or retried
  - `blocked` ⊘: waiting on a dependency, missing evidence or a missing capability
  - `needs decision` ?: waiting on the user
  - `dropped (approved)` –: removed with explicit approval or by the cut line
- On resume, reconcile the plan, the ledger, the actual artifacts or external state, and the relevant verification. A ledger verdict is a recorded claim until current evidence supports it: reopen stale or unsupported rows, invalidate dependent verification, and recheck only the affected acceptance conditions
- Mark `done (verified)` only with current acceptance evidence, including the source revision or state identifier when relevant
- Record remaining uncertainty and the next check so a fresh agent can resume safely
- The ledger is the durable record. The log and events files are disposable: at completion, delete them or keep them out of version control, and say which

### 3. Assign Execution Tiers

Only when delegation was approved; otherwise every task runs with the current model.

- Lighter tier: self-contained, mechanical, reversible tasks with an observable done-when, typically effort S. Send a short, fixed task contract instead of the session context; a short brief is cheaper and easier for any model to follow exactly
- Same tier: independent tasks a subagent can finish without your accumulated context
- Heavier tier, when available: tasks whose reasoning or verification demands exceed what the current model has shown on this plan
- Keep with the accountable executor: irreversible or external actions, security- and auth-sensitive work, work that depends on accumulated context, and every decision the plan assigns to the user
- In quiet mode the background executor is the accountable executor, at the current tier, and needs no delegation consent. Lighter tiers run as its subagents, never as the executor itself, because the executor must hold the whole plan

### 4. Execute in Order

- Follow phase order and task dependencies; honor parallel markers
- Load declared skills through the host's mechanism when available. `360-token-efficiency` always follows session consent; a plan listing is not approval. If another declared skill is unavailable, use its self-contained contract and the available capabilities, and block only tasks that actually require the missing capability
- Dispatch delegated tasks in the same order. A rejected or failed delegated attempt returns the task to the current model and is recorded as a deviation; do not retry silently across tiers or pass broken output downstream
- Verify each phase checkpoint before dependent work advances. A failure blocks the affected descendants; independent authorized work continues where dependencies and parallel markers permit
- Keep work within the task and the change policy
- Before a non-repeatable or external action, record the intent and a recoverable operation identifier or reconciliation method. After an interruption, inspect partial effects and external state before retrying. Reuse confirmed results, and retry only when absence or safe repeatability is established; if the state cannot be determined, block that action and name the missing check

### 5. Verify Every Task

- Run the task's done-when check and record the evidence in the ledger
- Done means the check passed with evidence, not "looks right" or "should work"
- Delegated output is a claim, not a result. Re-verify it against the task's own check at the same standard as your own work, and audit the returned diff or artifact before dependent work advances. A subagent never marks its own task verified
- If an implementation check cannot run, mark the task `blocked` with the missing evidence. An assessment task may finish with disclosed limits only when its own acceptance criteria permit them; an unknown check never becomes a pass
- After each task, check the affected behavior and the diff; state the inspected boundary and any regressions instead of claiming everything else is safe

### 6. Handle Deviations in the Open

When reality disagrees with the plan (a failed assumption, missing information, a clearly better path):

- Classify the departure under the plan's change policy and existing authorization
- Resolve routine reversible implementation choices within that authority; record the reason and the affected checks without asking again
- Escalate changes to outcome, scope, acceptance criteria, significant cost, irreversible effects or authorization. Stop dependent work, present concrete options, and continue independent authorized tasks
- Record every new scope item and every skipped task; absorb or skip nothing silently
- Drop a `must` task only on an explicit user decision; `should` and `could` tasks follow the plan's cut line

### 7. Sweep and Write the Report

Before declaring completion, walk the ledger top to bottom:

- Every task has a final status; zero unaccounted items
- Every objective in the plan's traceability maps to verified work
- Every delegated verdict carries its tier and audit evidence; failed delegations show how they were re-executed
- Run the plan's overall verification and confirm all checkpoints passed; in quiet mode, the shell's independent run is this check
- Sweep once for regressions introduced across phases
- Write the execution report into the ledger file and handle the disposable files
- Print the final Progress Board, then the Reader's Briefing as the final result
- Print the Reader's Briefing in chat before any next-action question; when the host sends one message, the briefing comes first

### Completion: Choose the Next Action

- Deliver and verify the current result first, with its location. An unanswered suggestion never reopens finished work, and a blocked job is not complete
- Recommend one next action from the local routing below, based on the result, project stage, open risks and prior instructions. Skip stages that do not apply; recommend stopping when no useful work remains
- Ask with the host's interactive question tool, or with numbered choices in chat when there is none: the recommendation first with its reason, a stop option, and a free-text option for any direction, inside or outside the 360 skills. This prompt is separate from the briefing and is not a list of open task questions
- An explicit next-step instruction answers this prompt, and an explicit stop or request for no suggestions suppresses it. Otherwise wait for the user's choice. Silence, a preselected recommendation, and elapsed time are not authorization. On a choice, clarify only what is missing, load a selected skill through the host's mechanism without installing it (offer an equivalent if it is unavailable), and carry forward paths, decisions, verification, risks and session consent

Local routing: Recommend `360-backend-audit` after significant backend work, or `360-optimize` when working code has a relevant performance or weight concern. For other completed work, recommend a concrete domain-appropriate follow-up or stopping; do not invent backend work to fit the flow.

## Output Format

### Work file

The ledger file contains:

1. Coverage ledger: every task with ID, name, priority, acceptance check, final status, and evidence for each `done (verified)`
2. Delegation: per task, the tier assigned (lighter / same / heavier / none) and the audit outcome; or "None"
3. Deviations: what diverged, how it was resolved, who approved it; or "None"
4. QC results: checks run, checkpoints verified, regression sweeps and outcomes
5. Unfinished items: pending, blocked or dropped, with reason and approval; or "None"
6. Handover summary: Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early

### Executor Brief

In quiet mode, the shell sends this to the background executor. Keep the wording fixed so hosts can cache it.

```text
You are the background executor for <plan path>. Load the 360-execute skill through the host's mechanism, or read <skill path>, and run Steps 1-7 under its Lean rules.
Session choices: delegation <approved|refused|unanswered>; token efficiency <approved|refused|unanswered>. Treat unanswered as off until a message says otherwise.
Files in <dir>: ledger <slug>-execution.md, log <slug>-log.txt, events <slug>-events.txt.
Append "@ <phase> done <IDs>" at each phase checkpoint, and "@ <ID> <status> <note>" at once for failed, blocked or needs decision.
Do not ask the user, use todo tools, start another background executor, or print code. On needs decision, finish independent work, then wait for a message.
Final reply: the final Progress Board and the Reader's Briefing only.
```

### Progress Board

A progress display, separate from the Reader's Briefing; the briefing rules do not apply to it. Print it at the end. Print it at checkpoints and on problems only when the host has no todo list. Its statuses match the ledger at every print.

```text
<plan title>                                    <n>/<m> verified
[##########..........]  <k> active · <b> blocked
! Needs you: <decision or blocker, 10 words or fewer>
✓ Phase 1  <name>                                         4/4
◐ Phase 2  <name>                                         2/5
    ✓ <task name>
    ◐ <task name>
    ⊘ <task name>: <reason, 8 words or fewer>
○ Phase 3  <name>                                         0/5
Ledger: <path>
```

- 72 columns or fewer; truncate names instead of wrapping
- Expand the active phase and any phase holding a `failed`, `blocked` or `needs decision` task, which that phase then shows; collapse the rest to one line with counts
- Show `! Needs you` only when something waits on the user
- Where symbols may not render, use the text status labels

### Reader's Briefing

Print this in chat. Follow the Delivery rules for file or in-session output.

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

Briefing rules:

- Write for a reader who has not seen the full artifact; define or drop any term of art
- One line per bullet, 20 words or fewer; the whole briefing fits one screen (about 25 lines)
- Outcomes and decisions, not mechanics: no task IDs, phases, priorities, status tables, executor notes or skill names
- Keep new things and changes to existing things in separate sections
- Confidence is proven (evidence in hand), likely (strong reason), possible (suspected), or uncertain (hypothesis). Never numbers; never proven without evidence
- The second line names the full artifact's path, or says `in-session only; not persisted`
- Omit empty sections unless this skill marks one as always present
- `Done` lists new work shipped; `Updates to existing` lists changes to something that already existed
- Describe a missing skill or tool by what it does when it explains a limitation
- Omit delegation tiers and subagent mechanics

## Quality Gate

Execution is complete only when every answer is yes:

- Every plan task has a final ledger status, and every `done (verified)` row cites current evidence from its own acceptance check
- Checkpoints passed before dependent work advanced; independent work respected authorization, dependencies and parallel markers
- Every deviation was recorded and resolved within the change policy or by the user; no `must` task was dropped without an explicit decision
- Every objective maps to verified work, and the regression sweep result is stated
- Declared skills and session consent were respected; missing required capabilities are explicit blockers
- Session choices were asked once in one round, defaults applied while unanswered, and later changes were honored
- Chat held only surfaced problems and decisions, never code, diffs or raw output; check output went to the log, and passed checks were not repeated with unchanged inputs
- In quiet mode, one background executor did the work and the shell waited on notifications and ran the independent overall verification; otherwise the fallback to lean was stated
- No irreversible, security-sensitive or context-dependent task was delegated; every delegated result was re-verified and audited before dependent work advanced
- The ledger matches current artifacts after reconciliation; a fresh agent can recover evidence, uncertainty, unfinished items and the next check
- The Progress Board matched the ledger, and the handling of disposable files is stated
- Delivery states persistence accurately, and the briefing follows the briefing rules
- The Reader's Briefing was printed in chat before any next-action question
- Completion offered one recommended next action with stop and free-text options, or followed an explicit instruction or the parent skill's prompt; an unanswered suggestion does not block the finished deliverable

Any "no" means execution is not finished. Fix it and re-run the sweep.
