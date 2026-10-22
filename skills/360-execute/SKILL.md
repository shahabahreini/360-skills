---
name: 360-execute
description: Execute a finalized plan task by task with a persisted coverage ledger, verify every item with evidence, and show progress as a quiet phase-and-task board before a final briefing — with optional audited delegation of routine tasks to lighter models. Use when a plan exists and work must begin, or when resuming a partial execution.
version: 3.2.0
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

Reuse an explicit `quiet` or `lean` choice from this session (treat `verbose` as `lean`). If unknown and not already offered, ask once, in the same interactive round as the delegation question when both are unknown. State the trade-off: `quiet` gives the cleanest screen (todo list and short status lines only) at a higher token cost, because a background executor does the work out of view; `lean` gives the lowest token cost, with work in the main thread, so tool calls and edit diffs stay visible while chat text stays minimal. Recommend `quiet` unless the user has said cost matters more. Quiet applies while unanswered. The user may switch with `quiet` or `lean` at any time; it takes effect immediately.

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
- The quiet-mode executor (see Quiet Output) is the accountable executor running out of view, not delegation: at the current tier it needs no delegation consent. Lighter tiers belong inside the executor through approved delegation, not in the shell: in benchmarks, lighter session models ignored the detached design and worked inline

### 4. Execute in Order

- Follow phase order and task dependencies exactly; honor parallel markers
- Load declared skills through the supported host mechanism when available. The optional `360-token-efficiency` always follows session consent; a plan listing is not approval. If another declared skill is unavailable, use the self-contained contract and available capabilities; block only tasks that actually require the missing capability
- Dispatch delegated tasks within the same order; a rejected or failed delegated attempt returns the task to the current model, recorded as a deviation. Never retry silently across tiers, never forward broken output downstream
- Verify each phase checkpoint before advancing dependent work. A failure blocks affected descendants; continue independent authorized work where dependencies and parallel markers permit
- Keep work within the task and change policy
- Before a non-repeatable or external action, record intent and a recoverable operation identifier or reconciliation method. After interruption, inspect partial effects and external state before retrying. Reuse confirmed results; retry only if absence or safe repeatability is established. If state cannot be determined, block that action and identify the missing check

### Quiet Output

In `quiet` mode, the user's screen shows the todo list and nothing else until the result. Hosts draw every main-thread tool call, so quiet comes from where the work runs, not from restraint: one detached executor does all the work out of view, and the main thread is a thin shell that mirrors progress. The shell's context stays small, so its turns stay cheap.

Shell (main thread), where the host can run a background subagent:

1. Read the plan once and pick the slug. Create one todo item per task (`<ID> <task name>`) before anything else. The shell writes no ledger or runner and reads no source files
2. Launch one executor in the background (`run_in_background` in Claude Code; a foreground launch blocks the shell and loses live updates) with the Executor Brief, at the current tier or the tier Step 3 sets. Use one executor for the whole plan: every subagent pays a fixed startup cost, so never spawn one per task
3. Watch `<slug>-events.txt` with the host's event-stream tool (Monitor in Claude Code), filtered so only lines starting with `@ ` wake the shell, for example `tail -n +1 -F <path> | grep --line-buffered '^@ '`. Every wake re-reads the shell's whole context, so wakes are the shell's main cost:
   - Mark the first ready tasks `in progress` when launching. On each event batch, in one message: mark the reported tasks, mark the tasks they unblock `in progress`, then end the turn with exactly one status line, `<symbol> <task names> — <8 words or fewer>`. Never post "waiting", "still running" or summary sentences; the todo list already shows them
   - The watch is the only wait: start no sleeps, polls or second watches. Re-arm it only when it expires while the executor still runs, and stop it when the executor finishes
4. On `needs decision`, or a blocker only the user can clear, ask with the interactive question tool, send the answer to the same executor (SendMessage in Claude Code), and keep watching
5. When the executor finishes, run `<runner> verify all` once as an independent check. Then print the final board and the Reader's Briefing from the executor's reply. A mismatch reopens the task; it never passes silently
6. Shell chat holds only the start line, one status line per event batch, and surfaced failures, blockers, deviations and decisions, one or two lines each. Never print code, diffs, file contents or raw output

At start, print one line offering zero-token live views; never launch windows or panes:

```text
Quiet mode on. Todo list tracks tasks. Full board: <path> (side pane: while :; do clear; cat <path>; sleep 2; done)
```

Offer `watch -t -n 2 cat <path>` where `watch` exists, or `while(1){cls; gc <path>; sleep 2}` in PowerShell. Where the host has a command status line, also offer a line that prints the board's progress row while the file exists. It refreshes locally and costs no tokens. Never replace an existing status line without explicit approval; offer to chain it instead. Where the host has a view that collapses tool calls (`/focus` in Claude Code), mention it once.

Executor (the background subagent) runs Steps 1–7 in full, with these rules:

- Runner: write one script beside the ledger (`<slug>-run.sh`, or `.ps1` where only PowerShell exists). Every subcommand appends full output to `<slug>-log.txt`, rewrites `<slug>-board.txt` from the ledger (temp file, then rename), and prints one line:
  - `check <ID> <name>` — run a named build, test or command: `ok T3 35/35 tests` or `FAIL T3 2/35 — log:120`
  - `verify <ID>...|all` — run acceptance checks plus a change summary; record `done (verified)` with evidence on pass and `failed` on failure: `ok T3 35/35 tests · 3 files +42 -7`
  - `mark <ID> <status> [note]` — set a ledger row's status
  - `verify` and `mark` append `@ <ID> <status> [note]` to `<slug>-events.txt` only when a row's status actually changes to a final or problem status: `done (verified)`, `failed`, `blocked`, `needs decision`, `dropped (approved)`. Re-checks that confirm an unchanged status, such as the final sweep, emit nothing. `in progress` and `verifying` emit nothing; the shell infers starts from dependencies. With more than about 12 tasks, emit one `@ <phase> done <IDs>` line at each phase checkpoint instead of per-task completions, and still emit every problem status at once
- Keep ledger rows one line each, ID first, so the runner can rewrite them. After the skeleton, change the ledger, log, board and events only through the runner
- Report status only through the runner. The executor has no todo tools, never detaches again, and never asks the user directly. It marks `needs decision`, continues independent work, and waits for the shell's message only when nothing independent remains
- Delegate inside the executor per Step 3 where the host allows nested subagents. The audit rules of Step 5 are unchanged
- Final reply: the final Progress Board and the Reader's Briefing only, no code

Without background subagents, the shell and the executor are one thread. Use the runner and update the todo list on every status change. Write no chat text between tool calls. Batch independent calls. Use no `cd …&&` chains or inline heredoc programs. Keep edits targeted, since diffs will show. Without a todo tool, print the Progress Board at start, at each checkpoint, on any problem, and at the end, always as the last element of its message.

### Lean Output

In `lean` mode, spend the fewest tokens that still meet every acceptance check. Work runs in the main thread, so tool calls and diffs show; chat text and avoidable context do not.

- No subagents for display. Delegate only under Step 3 with approval, and only when it saves cost or time
- Use the runner from Quiet Output for every build, test and check, so only one summary line enters context. Read the log by line range or search, only for the excerpt a decision needs
- After the ledger skeleton, update ledger rows and the board through the runner `mark` and `verify`, never by rewriting files
- Read only the files and ranges a task needs, batch independent reads and checks in one message, and never re-read a file just edited
- Make existing-file changes with targeted edits; write whole files only when creating them
- Update the todo list in the same message as the next action, never in a turn of its own. Without a todo tool, print the Progress Board only at phase checkpoints, on problems, and at the end
- No chat text between tool calls except surfaced failures, blockers, deviations and decisions, one or two lines each. Put intent in the tool call's description. Never print code, diffs, file contents or raw output in chat
- Do not repeat checks already passed with unchanged inputs. The final sweep runs `verify all` once


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

### Executor Brief

The shell sends this to the detached executor. Keep the wording fixed so hosts can cache it.

```text
You are the detached executor for <plan path>. Run 360-execute Steps 1–7 out of the user's view.
Load the 360-execute skill through the host's mechanism, or read <skill path>, and follow its executor rules:
never detach again, never ask the user directly, use no todo tools, never print code in replies.
Session choices: output quiet; delegation <approved|refused>; token efficiency <approved|refused>.
Paths: ledger <slug>-execution.md, runner <slug>-run.sh, log <slug>-log.txt, board <slug>-board.txt, events <slug>-events.txt, all in <dir>.
Report every status change only through the runner, which appends "@ <ID> <status> [note]" to the events file.
If a decision is needed, mark it, continue independent work, then stop and wait for a message.
Final reply: the final Progress Board and the Reader's Briefing only.
```

### Progress Board

The board shows live progress in the board file, and in chat only when the host has no todo list; otherwise chat gets only the final board. It is a progress display, separate from the Reader's Briefing; the briefing rules do not apply to it. Statuses must match the ledger at every print.

```text
╭─ <plan title> ─────────────────────────────────── <mode> ─╮
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
- In `quiet` mode with background subagents, one detached executor did all the work; the shell created the todo list first, updated it only from runner events, ran one independent `verify all`, and printed nothing between tool calls except surfaced problems
- In `quiet` mode, the ledger (after its skeleton), log, board and events changed only through the runner, and no subagent marked its own task verified
- Without background subagents, the single thread followed the inline fallback: todo list or board cadence, no chat text between tool calls, batched calls
- In `lean` mode, checks ran through the runner, ledger updates went through `mark`/`verify`, reads and checks were batched, no passed check was repeated without changed inputs, and chat held no text between tool calls beyond surfaced problems
- The zero-token board viewer was offered once, and no existing status line was replaced without explicit approval
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
