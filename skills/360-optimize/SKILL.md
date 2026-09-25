---
name: 360-optimize
description: Audit working code for zero-cost speed, weight, and reliability gains — measure first, rank drop-in upgrades and restructures, and report conservative expected effects on this system. Use when existing code must run faster, lighter, or more robustly without changing what it does.
version: 2.2.0
---

# 360 Optimize

## Purpose

Assess working code for supported speed, weight and reliability gains that preserve its intended contract. Produce an audit with conservative expectations, unresolved candidates and rejected ideas; implementation requires separate authorization.

## When to Use

- Working code feels slow, heavy, or fragile under load, and behavior must stay the same
- A stack, library, or runtime may have a drop-in successor that is lighter or more robust
- A restructure might cut copies, I/O, or serialized work on a hot path
- Before or after `360-backend-audit` when the remaining question is performance and weight, not correctness
- Not for greenfield design (`360-blueprint`), not for executing changes (`360-execute`), not for correctness or dead-weight hunts (`360-backend-audit`)

## Core Principle

Recommend gains only as strongly as their evidence permits.

## Workflow

### Entry: Optional Token Efficiency

Reuse explicit approval or refusal for `360-token-efficiency` from this session. If unknown and not already offered, ask once whether to enable it for this session; continue the main task with the overlay inactive while unanswered. Explicit user invocation counts as approval; merely appearing in a generated plan does not. On approval, discover and load it through the host's supported skill mechanism, reusing already-loaded instructions. If unavailable, explain briefly and continue; do not install automatically. Refusal disables the overlay, not ordinary efficient habits. Revocation takes effect immediately. Keep consent in-session only; it does not authorize cross-session memory writes. The overlay never invokes itself or restarts the parent skill.

### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or `None`), Parallel, Effort, Priority, Done when (observable). Use `Priority: must | should | could`, `Effort: S | M | L`, and `Parallel: yes | no`. Only `should` and `could` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: `Draft` → `Ready for review` → `Reviewed and ready to execute`. Open blocking questions keep it `Draft`; a complete unreviewed plan is `Ready for review`; a passed review sets `Reviewed and ready to execute`. Material edits after review return it to `Ready for review` (or `Draft` if blocked). Execution progress belongs in the ledger, not the readiness status. An explicit user instruction to execute a supplied plan authorizes execution without a mandatory sibling review; record that basis without claiming a review occurred.

### Delivery

Prefer a recoverable file when supported, using the existing path or the default below. Honor explicit user output requests. If files are unavailable, deliver the same complete structure in-session and label it `in-session only; not persisted`; never claim a file was saved. With a saved file, chat normally carries a short briefing and its path. These delivery rules also apply to the templates and quality gate below.

Use observable preservation and acceptance checks. Structural validation cannot prove behavior or accuracy; evaluate realistic consent, capability, recovery, and handoff scenarios separately. Document unavailable telemetry and regressions; do not infer universal accuracy or token savings from finite tests.

### 1. Lock the Contract

- Map purpose, inputs, outputs, ordering, error shapes, and caller-visible side effects
- Confirm that map against requirements and caller evidence; known defects are handed off, not preserved as intended behavior
- Honor already authorized contract changes; otherwise preserve the intended contract and ask only about material unresolved trade-offs
- If the contract is unclear, mark questions. Do not optimize guessing

### 2. Find Time and Weight

- Locate hot paths from profiles, traces, logs, complexity, or data volume
- Name the resource: latency, CPU, memory, I/O, binary size, dependency surface
- Record baseline and candidate under comparable representative workloads, input sizes, environment and run conditions; note variability and measurement limits
- Expose resource trade-offs: latency, CPU, memory, I/O, dependency/operational weight and money. A local speedup may move cost elsewhere
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
- Gain: a supported improvement on a named axis from a representative comparison on this system, with uncertainty and resource trade-offs stated

A failed check means Rejected, even if another axis improved. An unknown check leaves an unresolved candidate with the missing evidence and next check in Measurement/Verification; it is not admitted to Ranked gains, Upgrades or Restructures. Only all-pass items are supported recommendations. An audit can complete with no admitted gains.

### 5. Gate Upgrades and Libraries

Prefer, in order: delete the work; use the language and current stack; a compatible version of an existing dependency; a maintained drop-in with the same contract and less weight; a new library only when it removes more than it adds.

For every candidate tool or library, record:

- Contract match (API, errors, types, concurrency, numeric behavior)
- Maintenance and license compatibility
- What it removes, not only what it adds
- The named axis it wins on, with evidence from this system — not from the vendor's bench

Stdlib or an existing dependency wins when it meets the need. Do not add a dependency to look modern.

For an emergent or young tool, check an adapter, rollback and evidence of improvement on a named axis. Known absence of a required safeguard fails; an uninspected safeguard remains unknown under the same gate.

Never name a tool because it is popular. Name it because it passed this gate on this code.

### 6. Restructure Only When Shape Is the Cost

Restructure when the current shape forces extra I/O, extra copies, or serialized work on a hot path.

Forbidden as "optimization": layering fashion, package renaming, architecture theater, new abstractions that do not remove cost.

Callers and error shapes stay identical unless the user approved a contract change.

### 7. Prove No Cost

- Existing tests that cover the contract must still pass
- Where coverage is thin on a touched path, propose contract tests first: outputs, errors, ordering, bounds, concurrency
- Classify each item: `safe now` / `needs tests first` / `needs measurement first` / `needs human decision`. Items lacking gate evidence remain candidates in Measurement/Verification, regardless of a promising local result
- When in doubt, leave it in the audit and wait. Do not rewrite production code under this skill

Correctness bugs found while scanning are out of scope. Record them as `handoff to 360-backend-audit`, do not disguise them as optimizations.

### 8. Bound the Expectation

Every admitted gain gets a conservative expected effect. This step is not optional.

- Baseline is this codebase, this load shape, this environment
- Report the typical production path. Best-case is not the expectation
- A local win stays local until you can scale it by that path's share of end-to-end cost. If the share is unknown, say `end-to-end unknown`
- Do not add overlapping recommendations as if they stack
- Vendor benches, blog numbers and other projects do not establish this system’s gain. A local microbenchmark supports only its tested path and workload; do not generalize it without representative evidence
- Unmeasured candidates: no magnitude, rank, or `proven`; name the check needed before promotion
- Rank `high` only when evidence shows this path dominates the named resource
- Round the gain down and the cost of the change up (effort, overhead, risk)
- If the sentence still sells after the evidence is removed, rewrite it
- State `Holds when` and `Falsified when` for every expected effect

### 9. Write the Audit

- Write the full audit to a file using the work-file template
- Reuse the existing path if known; otherwise `plans/<short-slug>-optimize.md`; create the folder if needed; ask once if ambiguous
- If the file cannot be written, use the in-session delivery fallback
- Rank admitted gains by conservative impact versus effort versus risk
- Keep new work and updates to existing work in separate lists
- With a saved file, print the terminal briefing and path

### Completion: Choose the Next Action

- Finish and verify the current deliverable first; make the result and its location available before asking about follow-on work. Keep artifact readiness separate from the next-action choice: an unanswered suggestion does not reopen completed work, and a blocked job is not complete
- Check the result, current project stage, remaining risks, and prior user instructions. Recommend the next useful action from the local routing guidance below; skip irrelevant stages and prefer stopping when no useful work remains
- Use an available interactive question tool to offer one concise next-action choice. Put the best recommendation first, explain why it fits this result, and include a stop/pause choice. Always allow a free-text note or custom direction, including work outside the 360 flow; never force the user into a sibling skill
- If interactive tools are unavailable, offer equivalent numbered choices with the recommendation, rationale, and explicit custom-note option in chat. This completion prompt is separate from the deliverable briefing; skill names are allowed here, and it is not a passive list of unresolved task questions
- Reuse an already explicit next-step instruction instead of asking again; continue work it authorizes. Otherwise wait for the user's choice before starting follow-on work. Silence, a preselected recommendation, and elapsed time are not authorization. An explicit stop or request for no suggestions suppresses the prompt
- When the user chooses, follow that direction and clarify only missing information needed for it. Discover and load a selected skill through the host's supported mechanism; do not assume it is installed or install it automatically. If unavailable, explain and offer an equivalent action. Carry forward artifact paths, decisions, verification, remaining risks, and session consent without restarting intake

Local routing: Recommend `360-blueprint` to turn supported findings into scoped work, or `360-execute` when a suitable authorized plan already exists. Recommend stopping if no worthwhile candidates remain; findings alone do not authorize implementation.

## Output Format

### Work file

1. Contract — what must not change
2. Measurement — what was profiled, load, environment, what is `unmeasured`; unresolved candidates and missing gate evidence
3. Ranked gains — only items that passed the Zero-Cost Gate. Each row:

   - Change and axis (speed / weight / reliability)
   - Evidence (this system)
   - Baseline
   - Expected effect — conservative typical case, scoped `local` or `end-to-end`
   - Holds when
   - Falsified when
   - Rank: `high` / `medium` / `low` (supported gains only)
   - Effort and classification

4. Upgrades — drop-in runtime, library, or tool changes that passed
5. Restructures — shape changes that passed, with why the current shape is the cost
6. Rejected — attractive ideas that failed the gate, with the failed check
7. Handoff bugs — correctness or dead-weight items for `360-backend-audit`; or "None"
8. Verification — tests run/to run, rollback, how to detect a silent contract break; next checks for unresolved candidates
9. Implementation plan — grouped as New vs Updates to existing
10. Handover — Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early

Implementation tasks use the Shared Plan Contract. Keep candidates separate from supported gains using the existing Measurement/Verification sections. State inspection limits; completion of the assessment does not verify a candidate or its implementation. No magnitude without a measurement on this system.

### Terminal briefing

Use this shape. Omit any section that would be empty. Follow the Delivery rules for file or in-session output.

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
- Keep the briefing concise when the audit is saved to a file

## Quality Gate

- Completion includes the interactive next-action offer with a recommendation, stop choice, and custom-note option, or the explicit-instruction/parent-owned exception; unanswered suggestions do not block the completed deliverable

The audit is complete only when every answer is yes:

- The contract is written and treated as the floor
- Hot paths were located from evidence, or marked `unmeasured`
- Waste was considered before upgrades, and upgrades before restructure
- Every admitted change has affirmative evidence for every Zero-Cost Gate check; unknowns remain candidates and failures are Rejected
- Every Rejected item names the check it failed
- No recommendation weakens function, reliability, precision, or failure semantics
- No new dependency was proposed that fails net-lighter
- Emergent tools meet the same pass/fail/unknown rules for adapter, rollback and improvement evidence
- Every admitted gain has baseline, conservative expected effect, scope, Holds when, and Falsified when
- No magnitude, rank, or `proven` on an unmeasured candidate
- Comparisons use representative workloads and expose resource trade-offs and variability
- No vendor, blog, or other-project number is presented as this system's gain
- Best-case is not reported as typical; overlapping gains are not stacked
- End-to-end claims are scaled by path share, or marked `end-to-end unknown`
- Correctness bugs are handed off, not sold as optimizations
- New work and updates to existing work are grouped separately
- The handover distinguishes supported gains, rejected ideas, unresolved candidates and their next checks
- The deliverable is saved at the stated path, or honestly labeled in-session only
- The briefing omits empty sections, uses proven/likely/possible/uncertain, never numbers, and does not hype

Any "no" means the audit is not finished. Fix it and review again.
