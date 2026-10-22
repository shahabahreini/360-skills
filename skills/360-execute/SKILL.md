---
name: 360-execute
description: Execute a finalized plan task by task with a persisted coverage ledger, verify every item with evidence, and show progress as a quiet phase-and-task board before a final briefing — with optional audited delegation of routine tasks to lighter models. Use when a plan exists and work must begin, or when resuming a partial execution.
version: 3.1.0
---

# 360 Execute

## Purpose

Execute an authorized plan against its acceptance checks and keep a recoverable coverage ledger of results, deviations and unfinished work. When the user approves, dispatch routine tasks to lighter-tier subagents and reserve heavier models for complex work, then review and audit every delegated result before it counts. By default, keep chat quiet: a progress board and short status lines, not code or raw output.

## When to Use

- A plan exists and work must begin — any domain, any scale
- Any request of the form "implement this plan", "build this", "execute this"
- Resuming a partially executed plan by reconciling its ledger with current evidence
- Not for creating plans (`360-blueprint`) or reviewing drafts (`360-expert-review`)

## Core Principle

Current evidence establishes progress; the ledger records it. Delegation speeds execution; it never transfers accountability.

## Workflow

### Entry: Optional Token Efficiency

Reuse explicit approval or refusal for `360-token-efficiency` from this session. If unknown and not already offered, ask once whether to enable it for this session; continue the main task with the overlay inactive while unanswered. Explicit user invocation counts as approval; merely appearing in a generated plan does not. On approval, discover and load it through the host's supported skill mechanism, reusing already-loaded instructions. If unavailable, explain briefly and continue; do not install automatically. Refusal disables the overlay, not ordinary efficient habits. Revocation takes effect immediately. Keep consent in-session only; it does not authorize cross-session memory writes. The overlay never invokes itself or restarts the parent skill.

### Entry: Optional Model Delegation

Reuse explicit approval or refusal for model delegation from this session. If unknown and not already offered, ask once using the host's interactive question tool and state the trade-off plainly: routine tasks go to lighter, faster subagent models; complex tasks go to heavier models or stay with the current one; the executing agent reviews and audits everything a subagent returns; refusal means the same work runs with the current model — via same-tier subagents or plain sequential execution. Present refusal as a full equal choice, never as a delay. Continue without delegation while unanswered; silence and elapsed time are not approval. On approval, class models by relative tier (lighter / same / heavier) and prefer the newest model the host offers within each tier; never hardcode or assume a specific vendor or model name. If the host offers no subagent or tier mechanism, explain briefly and execute sequentially. Refusal or unavailability disables delegation only — it changes nothing else in this skill.

### Entry: Output Mode

Reuse an explicit `quiet` or `verbose` choice from this session. If unknown and not already offered, ask once, in the same interactive round as the delegation question when both are unknown. Recommend `quiet`: chat shows only the progress board, one-line status changes, and the final result; `verbose` shows working detail such as diffs and command output. Quiet applies while unanswered. The user may switch with `quiet` or `verbose` at any time; it takes effect immediately.

### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or `None`), Parallel, Effort, Priority, Done when (observable). Use `Priority: must | should | could`, `Effort: S | M | L`, and `Parallel: yes | no`. Only `should` and `could` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: `Draft` → `Ready for review` → `Reviewed and ready to execute`. Open blocking questions keep it `Draft`; a complete unreviewed plan is `Ready for review`; a passed review sets `Reviewed and ready to execute`. Material edits after review return it to `Ready for review` (or `Draft` if blocked). Execution progress belongs in the ledger, not the readiness status. An explicit user instruction to execute a supplied plan authorizes execution without a mandatory sibling review; record that basis without claiming a review occurred.

### Delivery

Prefer a recoverable file when supported, using the existing path or the default below. Honor explicit user output requests. If files are unavailable, deliver the same complete structure in-session and label it `in-session only; not persisted`; never claim a file was saved. With a saved file, chat carries the Reader's Briefing and the path. These delivery rules also apply to the templates and quality gate below.

Judge completion by observable acceptance checks. A structural or format check does not prove behavior or accuracy; state what was not verified.

### 1. Load the Plan Completely

Never execute a plan you have not fully read.

- Read the entire plan before touching anything: objective, scope, assumptions, every phase, every task, every checkpoint
- Record the plan's readiness status and the authorization basis. Open blockers in a `Draft` plan block the tasks they affect
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
- Statuses, with optional board symbols (the text label is required):
  - `pending` ○ — not started
  - `in progress` ◐ — work underway
  - `verifying` ◑ — work finished; acceptance check running
  - `done (verified)` ✓ — check passed with recorded evidence
  - `failed` ✗ — check failed; being fixed or retried
  - `blocked` ⊘ — waiting on a dependency, missing evidence, or missing capability
  - `needs decision` ? — waiting on a user decision
  - `dropped (approved)` – — removed with explicit approval or by the cut line
- Mark verified only when current acceptance evidence supports it; include source revision or state identifiers when relevant
- For delegated tasks, record the assigned tier alongside the verdict and the audit evidence that backed it
- Record remaining uncertainty and the next check so a fresh agent can resume safely

### 3. Assign Execution Tiers

When delegation was approved, decide the executor for each task before dispatching. Without approval, every task runs with the current model.

- Delegate down to a lighter tier: tasks that are self-contained, mechanical, reversible and have an observable done-when — typically effort S with fixed instructions. Send the task contract only; do not hand over full session context
- Delegate across at the same tier: independent tasks a subagent can finish without the context you have accumulated
- Route up to a heavier tier when available: tasks whose reasoning or verification demands exceed the current model's demonstrated capability on this plan
- Keep with the current model: irreversible or external actions, security- and auth-sensitive work, anything depending on accumulated context, and every call the plan assigns to the user. These never leave the accountable executor
- Classify by relative capability, not by vendor. Model lineups change; the tier rules do not

### 4. Execute in Order

- Follow phase order and task dependencies exactly; honor parallel markers
- Load declared skills through the supported host mechanism when available. The optional `360-token-efficiency` always follows session consent; a plan listing is not approval. If another declared skill is unavailable, use the self-contained contract and available capabilities; block only tasks that actually require the missing capability
- Dispatch delegated tasks within the same order; a rejected or failed delegated attempt returns the task to the current model, recorded as a deviation. Never retry silently across tiers, never forward broken output downstream
- Verify each phase checkpoint before advancing dependent work. A failure blocks affected descendants; continue independent authorized work where dependencies and parallel markers permit
- Keep work within the task and change policy
- Before a non-repeatable or external action, record intent and a recoverable operation identifier or reconciliation method. After interruption, inspect partial effects and external state before retrying. Reuse confirmed results; retry only if absence or safe repeatability is established. If state cannot be determined, block that action and identify the missing check

### Quiet Output

In `quiet` mode, chat carries progress, not process. The ledger, logs and repository hold the detail.

- Never print code, diffs, file contents, or raw command output in chat
- No narration. Between boards, chat carries only `<symbol> <task> — <8 words or fewer>`, once per status change. No progress summaries, no statements of intent. Delegation shows as status changes only (`◐ <task> — delegated`, `◑ <task> — auditing`)
- Show progress in the host's native task or todo list when it exists, since it updates in place. Otherwise print the Progress Board right after the ledger is created and before the first task, at each phase checkpoint, on any `failed`, `blocked` or `needs decision`, and at the end. A board is always the last element of its message, so the bottom of the screen shows current state
- Never hide a failure, blocker, deviation or required decision. Surface it at once, in one or two lines

Many hosts display tool calls and their results; you cannot hide them, but you control their shape. Make each one a short line with a one-line result:

- Runner: at start, write one small runner script beside the ledger (`<slug>-run.sh`, or `.ps1` where only PowerShell exists). It runs a named command or check, appends full output to `<slug>-log.txt`, and prints one summary line such as `ok T3 35/35 tests` or `FAIL T3 2/35 — log:120`. It also rewrites the board file. Visible calls then read like `bash plans/<slug>-run.sh test T3`
- No `cd …&&` chains or inline heredoc programs; use absolute paths or the host's working-directory option, and put multi-line logic in the runner
- Batch independent reads and checks into one call. Give each call a short plain description of what it does
- Create the ledger as a short skeleton, then update rows with targeted edits instead of rewriting the file
- Read the log by line range or search, only for the excerpt a decision needs

Live board file: when files are available, keep `<slug>-board.txt` beside the ledger holding the current board, overwritten whole (temp file, then rename) in the same call as each ledger update, so it adds no extra visible tool call. It is a view; the ledger stays the source of truth. Never launch windows or panes. At start, print one line naming it and a viewer the user can run in a side pane, where each redraw clears the screen:

```text
Quiet mode on. Live board: <path> — view in a side pane: while :; do clear; cat <path>; sleep 2; done
```

Offer `watch -t -n 2 cat <path>` where `watch` exists, `while(1){cls; gc <path>; sleep 2}` in PowerShell, or an editor that reloads on change. Say this once. Do not apologize for visible tool calls; point to the board instead.

In `verbose` mode, the same statuses and board apply, and working detail may appear in chat.

### 5. Verify Every Task

- Run the task's "done when" check and record the evidence in the ledger
- Done means the check passed with evidence — never "looks right", never "should work"
- Delegated output is a claim, never a result. Re-verify it against the task's own done-when check at the same standard as your own work, and audit the returned diff or artifact yourself before dependent work advances. A subagent never marks its own task verified
- If an implementation acceptance check cannot run, mark the task `blocked` with the missing evidence. An assessment task may finish with disclosed limits only when its own acceptance criteria permit them; an unknown check never becomes a pass
- Check affected behavior and the diff after each task; state the inspected boundary and regressions rather than claiming everything else is safe

### 6. Handle Deviations in the Open

When reality disagrees with the plan — a failed assumption, missing information, a visibly better path:

- Classify the departure under the plan's change policy and existing authorization
- Resolve routine reversible implementation choices within that authority; record the reason and affected checks without asking again
- Escalate changes to outcome, scope, acceptance criteria, significant cost, irreversible effects or authorization. Stop dependent work and present concrete options; continue independent authorized tasks
- Never silently absorb new scope, never silently skip a task
- A `must`-priority task is never dropped without an explicit user decision; `should`/`could` tasks follow the plan's cut line

### 7. Sweep and Write the Report

Before declaring completion, walk the ledger top to bottom:

- Every task has a final status — zero unaccounted items
- Cross-check the plan's traceability: every objective maps to verified work
- Re-check every delegated verdict: each one carries the assigned tier and the audit evidence, and failed delegations have a recorded re-execution path
- Run the plan's overall verification; confirm all checkpoints passed
- Sweep once more for regressions introduced across phases
- Write the execution report into the same ledger file
- Print the final Progress Board, then the Reader's Briefing as the final result
- Print the Reader's Briefing in chat before asking anything. A next-action question with no briefing above it is a failed delivery. If the host sends one message, the briefing comes first in that message

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
2. Delegation — per task: tier assigned (lighter / same / heavier / none) and audit outcome; or "None"
3. Deviations — what diverged, how it was resolved, who approved it; or "None"
4. QC results — checks run, checkpoints verified, regression sweeps, outcomes
5. Unfinished items — pending, blocked, or dropped, with reason and approval; or "None"
6. Handover summary — Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early

### Progress Board

The board shows live progress in chat. It is a progress display, separate from the Reader's Briefing; the briefing rules do not apply to it. Statuses must match the ledger at every print.

```text
╭─ <plan title> ─────────────────────────────────── quiet ─╮
  ▕██████████░░░░░░░░▏ <n>/<m> verified · <k> active · <b> blocked
  ! Needs you: <decision or blocker, 10 words or fewer>
  ────────────────────────────────────────────────────────
  ✓ Phase 1  <name>                                 4/4
  ◐ Phase 2  <name>                                 2/5
      ✓ <task name>
      ◐ <task name>                                 ← now
      ⊘ <task name> — <reason, 8 words or fewer>
      ○ <task name>
  ○ Phase 3  <name>                                 0/5
  ────────────────────────────────────────────────────────
  Now     <current task> — <12 words or fewer>
  Recent  ✓ <task> · ✗ <task> retrying · ✓ <task>
  Ledger  <path>   Log <path>
╰──────────────────────────────────────────────── <hh:mm> ─╯
```

- 72 columns or fewer, so it fits a side pane. Truncate names rather than wrap
- Expand only the active phase and any phase holding a `failed`, `blocked` or `needs decision` task; collapse the rest to one line with verified/total counts
- A phase shows `failed`, `blocked` or `needs decision` if any of its tasks does; otherwise its least-advanced task status
- Show `! Needs you` only when something waits on the user. `Recent` holds the last three status changes. Show `Log` only when a log exists
- Where box characters or symbols may not render, use `+ - |`, `#` and `.` for the bar, and the text status labels
- Omit `Now` on the final board

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

- Write for someone who has not read the full artifact. Define or drop any term of art
- One line per bullet, 20 words or fewer. The whole briefing fits one screen (about 25 lines)
- Outcomes and decisions, never mechanics: no task IDs, phases, priorities, status tables, executor notes, or skill names
- Keep new things and changes to existing things in separate sections. Never mix them
- Confidence uses proven (evidence in hand), likely (strong reason), possible (suspected), or uncertain (hypothesis). Never numbers; never proven without evidence
- The second line names the full artifact's path, or says `in-session only; not persisted`
- Omit empty sections unless this skill marks one as always present
- `Done` lists new work shipped; `Updates to existing` lists changes to something that already existed
- Describe a missing skill or tool by what it does when it explains a limitation
- Omit delegation tiers and subagent mechanics from the briefing

## Quality Gate

Execution is complete only when every answer is yes:

- Every task in the plan appears in the ledger file with a final status — zero unaccounted items
- Every `done (verified)` verdict is backed by evidence from the task's own acceptance check
- Every phase checkpoint passed before its dependent work advanced; independent work respected authorization and dependency/parallel markers
- Every deviation was recorded and resolved within existing authorization/change policy or an explicit user decision
- No `must`-priority task was dropped or skipped without explicit user approval
- Every objective in the plan's traceability maps to verified work
- Regressions and collateral damage were swept for, and the results are stated
- Declared skill availability and consent were respected; required unavailable capabilities are explicit blockers
- The output mode was asked once (with delegation when both were unknown), quiet applied while unanswered, and later switches were honored
- In `quiet` mode, chat carried no code, diffs, file contents or raw command output, and every failure, blocker, deviation and required decision still surfaced at once
- Progress Board statuses matched the ledger at every print, and the final board preceded the Reader's Briefing
- In `quiet` mode, the first board printed before the first task, each board ended its message, and chat between boards held only one-line status changes
- In `quiet` mode, visible tool calls were short runner or batched calls with one-line results, and the live board file (when files were available) matched the ledger with its viewer offered once
- The delegation question was asked once with its trade-off stated, the answer was honored, and refusal fell back to same-tier subagents or sequential execution
- No irreversible, security-sensitive, or context-dependent task was delegated
- Every delegated task was re-verified and its output audited by the executing agent against the task's own acceptance check; no subagent marked its own work verified
- Failed delegations were recorded and re-executed with the current model before any dependent work advanced
- Unfinished items are stated honestly — pending, blocked, or dropped, with reasons
- The ledger matches current artifacts and verification; stale verdicts and partial actions were reconciled before resumption
- The next agent can recover evidence, uncertainty and the next check; affected verification was invalidated after relevant changes
- Delivery honors the requested format and accurately states persistence
- The briefing follows the briefing rules
- The Reader's Briefing was printed in chat before any next-action question
- Completion includes the interactive next-action offer with a recommendation, stop choice, and custom-note option, or the explicit-instruction/parent-owned exception; unanswered suggestions do not block the completed deliverable

Any "no" means execution is not finished. Fix it and re-run the sweep.
