---
name: 360-optimize
description: Audit working code for zero-cost speed, weight, and reliability gains — measure first, rank drop-in upgrades and restructures, and report conservative expected effects on this system. Use when existing code must run faster, lighter, or more robustly without changing what it does.
version: 1.1.0
---

# 360 Optimize

## Purpose

Run this skill on code that already works. Find gains in speed, weight, and reliability that pass a zero-cost gate: same function, same or better reliability, net-lighter system.

Technology-agnostic. Audit hot paths, data movement, drop-in upgrades, and structure. Do not hunt bugs, dead weight, or observability as the job — that is `360-backend-audit`.

This skill writes an audit, not a rewrite. To plan approved work, use `360-blueprint`. To build it, use `360-execute`.

Reported expectations must be realistic for this system. A sold gain that this load will not see is a defect.

The full audit lives in a file. Chat gets ranked highlights only.

## When to Use

- Working code feels slow, heavy, or fragile under load, and behavior must stay the same
- A stack, library, or runtime may have a drop-in successor that is lighter or more robust
- A restructure might cut copies, I/O, or serialized work on a hot path
- Before or after `360-backend-audit` when the remaining question is performance and weight, not correctness
- Not for greenfield design (`360-blueprint`), not for executing changes (`360-execute`), not for correctness or dead-weight hunts (`360-backend-audit`)

## Core Principle

- Current behavior is the floor. A faster wrong answer is still wrong
- Zero-cost is a gate, not a mood. Fail a check and the idea is Rejected
- Measure before you rank. Unmeasured stays unlabeled as proven
- Expected gain is a conservative typical case on this code, this load, this environment — never a best case, never a vendor number
- Local win is not end-to-end win. Do not stack overlapping gains
- Delete waste before you swap tools. Swap tools before you reshape the system
- Robust beats emergent. Emergent enters only behind an adapter, with rollback, and with evidence
- The file is the audit. Chat is the briefing

## Workflow

### 1. Lock the Contract

- Map purpose, inputs, outputs, ordering, error shapes, and caller-visible side effects
- Treat that map as the contract that must survive
- If any behavior is allowed to change, ask once. Default is none
- If the contract is unclear, mark questions. Do not optimize guessing

### 2. Find Time and Weight

- Locate hot paths from profiles, traces, logs, complexity, or data volume
- Name the resource: latency, CPU, memory, I/O, binary size, dependency surface
- Record the baseline: what was measured, on which path, under which load, in which environment
- Cold paths stay untouched
- If you did not measure, write `unmeasured` and keep the finding as a candidate

### 3. Hunt Waste First

Attack in this order. Stop at the first level that removes the cost.

1. Needless work — extra copies, repeated compute, unbounded scans, chatty I/O, work on the wrong side of a boundary
2. Algorithm and data structure on the hot path
3. Data movement — batching, pushdown, streaming, pagination that the contract already allows
4. Drop-in upgrade of what is already in the stack
5. Restructure

Do not micro-tune a cold path. Do not strip checks, reduce precision, or weaken failure handling to go faster.

### 4. Apply the Zero-Cost Gate

Admit a change only when every check is yes:

- Function: observable outputs and caller-visible side effects stay the same
- Reliability: failure semantics, integrity, bounds, and precision are not weaker
- Weight: net dependencies, operational surface, and code complexity do not grow
- Money: no new paid obligation unless it replaces a larger one
- Reversal: a rollback path exists
- Gain: measured, or explicitly `unmeasured` — never claimed proven without evidence

A failed check means Rejected, with the failed check named. Not "do it carefully".

### 5. Gate Upgrades and Libraries

Prefer, in order: delete the work; use the language and current stack; a compatible version of an existing dependency; a maintained drop-in with the same contract and less weight; a new library only when it removes more than it adds.

For every candidate tool or library, record:

- Contract match (API, errors, types, concurrency, numeric behavior)
- Maintenance and license compatibility
- What it removes, not only what it adds
- The named axis it wins on, with evidence from this system — not from the vendor's bench

Stdlib or an existing dependency wins when it meets the need. Do not add a dependency to look modern.

An emergent or young tool is admissible only with an adapter, a rollback, and evidence it beats the incumbent on a named axis. Missing any of those: Rejected.

Never name a tool because it is popular. Name it because it passed this gate on this code.

### 6. Restructure Only When Shape Is the Cost

Restructure when the current shape forces extra I/O, extra copies, or serialized work on a hot path.

Forbidden as "optimization": layering fashion, package renaming, architecture theater, new abstractions that do not remove cost.

Callers and error shapes stay identical unless the user approved a contract change.

### 7. Prove No Cost

- Existing tests that cover the contract must still pass
- Where coverage is thin on a touched path, propose contract tests first: outputs, errors, ordering, bounds, concurrency
- Classify each admitted change: `safe now` / `needs tests first` / `needs measurement first` / `needs human decision`
- When in doubt, leave it in the audit and wait. Do not rewrite production code under this skill

Correctness bugs found while scanning are out of scope. Record them as `handoff to 360-backend-audit`, do not disguise them as optimizations.

### 8. Bound the Expectation

Every admitted gain gets a conservative expected effect. This step is not optional.

- Baseline is this codebase, this load shape, this environment
- Report the typical production path. Best-case is not the expectation
- A local win stays local until you can scale it by that path's share of end-to-end cost. If the share is unknown, say `end-to-end unknown`
- Do not add overlapping recommendations as if they stack
- Vendor benches, blog numbers, microbenchmarks, and other projects are not evidence here
- Unmeasured: no magnitude, no `high` rank, no `proven`
- Rank `high` only when evidence shows this path dominates the named resource
- Round the gain down and the cost of the change up (effort, overhead, risk)
- If the sentence still sells after the evidence is removed, rewrite it
- State `Holds when` and `Falsified when` for every expected effect

### 9. Write the Audit

- Write the full audit to a file using the work-file template
- Reuse the existing path if known; otherwise `plans/<short-slug>-optimize.md`; create the folder if needed; ask once if ambiguous
- If the file cannot be written, stop and ask — never paste the audit into chat
- Rank admitted gains by conservative impact versus effort versus risk
- Keep new work and updates to existing work in separate lists
- Print only the terminal briefing

## Output Format

### Work file

1. Contract — what must not change
2. Measurement — what was profiled, load, environment, what is `unmeasured`
3. Ranked gains — only items that passed the Zero-Cost Gate. Each row:

   - Change and axis (speed / weight / reliability)
   - Evidence (this system)
   - Baseline
   - Expected effect — conservative typical case, scoped `local` or `end-to-end`
   - Holds when
   - Falsified when
   - Rank: `high` / `medium` / `low` (no `high` if unmeasured)
   - Effort and classification

4. Upgrades — drop-in runtime, library, or tool changes that passed
5. Restructures — shape changes that passed, with why the current shape is the cost
6. Rejected — attractive ideas that failed the gate, with the failed check
7. Handoff bugs — correctness or dead-weight items for `360-backend-audit`; or "None"
8. Verification — tests to run, rollback, how to detect a silent contract break
9. Implementation plan — grouped as New vs Updates to existing
10. Handover — context, decisions, tasks, verification, risks, state

Every finding needs evidence. Clean areas are stated as clean. No magnitude without a measurement on this system.

### Terminal briefing

Use this shape. Omit any section that would be empty. Never paste the work file into chat.

```text
Optimize — complete
Full audit: <path>

Gains
- <change, axis, local|end-to-end> — <proven|likely|possible|uncertain>

Upgrades
- <drop-in replacement that passed the gate>

Restructures
- <shape change that passed the gate>

Rejected
- <idea and the check it failed>

Handoff
- <bug or dead weight for a correctness audit>

Need from you
- <decision required to proceed>
```

- Talk to the user, not the next agent
- A new artifact is Features to add only if a harness or tool must be introduced; a change to current code is Updates to existing. Never mix them
- Confidence: `proven` evidence in hand; `likely` strong reason; `possible` suspected; `uncertain` hypothesis. Never numbers. Never say proven without evidence
- Never hype. If you cannot state a conservative expected effect, the gain is not ready to brief
- No skill-name dump, no audit body in chat

## Quality Gate

The audit is complete only when every answer is yes:

- The contract is written and treated as the floor
- Hot paths were located from evidence, or marked `unmeasured`
- Waste was considered before upgrades, and upgrades before restructure
- Every admitted change passed the Zero-Cost Gate
- Every Rejected item names the check it failed
- No recommendation weakens function, reliability, precision, or failure semantics
- No new dependency was proposed that fails net-lighter
- Emergent tools, if any, have adapter, rollback, and evidence — otherwise they are Rejected
- Every admitted gain has baseline, conservative expected effect, scope, Holds when, and Falsified when
- No magnitude, `high` rank, or `proven` on an unmeasured item
- No vendor, blog, or other-project number is presented as this system's gain
- Best-case is not reported as typical; overlapping gains are not stacked
- End-to-end claims are scaled by path share, or marked `end-to-end unknown`
- Correctness bugs are handed off, not sold as optimizations
- New work and updates to existing work are grouped separately
- The handover lets the next agent act with zero guessing
- The work file lives at the stated path and was not pasted into chat
- The briefing omits empty sections, uses proven/likely/possible/uncertain, never numbers, and does not hype

Any "no" means the audit is not finished. Fix it and review again.
