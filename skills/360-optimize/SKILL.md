---
name: 360-optimize
description: Audit working code and its whole toolchain — build, test, lint, CI, and runtime libraries — for zero-cost speed, weight, and reliability gains, verifying every claim against the pinned versions and measuring before ranking. Use when existing code must run faster, lighter, or more robustly without changing what it does, or when a list of proposed tooling or library upgrades needs a verdict.
version: 3.0.0
---

# 360 Optimize

## Purpose

Assess working code and the tools, libraries and methods around it for supported speed, weight and reliability gains that preserve its intended contract. Produce an audit with conservative expectations, unresolved candidates and rejected ideas; implementation requires separate authorization.

## When to Use

- Working code feels slow, heavy, or fragile under load, and behavior must stay the same
- A stack, library, or runtime may have a drop-in successor that is lighter or more robust
- A restructure might cut copies, I/O, or serialized work on a hot path
- A supplied audit or recommendation list needs a verified verdict per item
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

Prefer a recoverable file when supported, using the existing path or the default below. Honor explicit user output requests. If files are unavailable, deliver the same complete structure in-session and label it `in-session only; not persisted`; never claim a file was saved. With a saved file, chat carries the Reader's Briefing and the path. These delivery rules also apply to the templates and quality gate below.

Judge completion by observable acceptance checks. A structural or format check does not prove behavior or accuracy; state what was not verified.

### 1. Lock the Contract

- Map purpose, inputs, outputs, ordering, error shapes, and caller-visible side effects
- Confirm that map against requirements and caller evidence; known defects are handed off, not preserved as intended behavior
- Honor already authorized contract changes; otherwise preserve the intended contract and ask only about material unresolved trade-offs
- If the contract is unclear, mark questions. Do not optimize guessing

### 2. Inventory the Stack

Build one inventory table before hunting. Sources: manifests, lockfiles and toolchain pins; build and compile profiles; CI workflows; test, lint, format and typecheck configs; git hooks and scripts; runtime libraries by role (serialization, hashing, compression, codecs, database, concurrency, collections); I/O and persistence methods on hot paths.

Each row: role · tool or library · resolved version · effective configuration · what it costs or wins here · suspect or not.

- Record the effective state, not the declared one: feature unification and transitive enablement, defaults of the pinned toolchain or library version, runtime detection, config overrides
- Note what already exists transitively; reuse it before adding anything
- Note duplicate versions of one package and what each pulls in
- Note what CI actually runs, not what the scripts offer
- Resolve with the ecosystem's own tools, for example `cargo tree -e features -i <crate>`, `cargo tree -d`, `pnpm why`, `npm ls`, `pipdeptree`, `go mod graph`
- State layers left out of scope

Read [suspect patterns](references/suspect-patterns.md) once the inventory exists, and sweep each layer with it. It lists suspects to confirm, never prescriptions.

### 3. Find Time and Weight

- Locate hot paths from profiles, traces, logs, complexity, or data volume
- Name the resource: latency, CPU, memory, I/O, binary size, dependency surface
- Record baseline and candidate under comparable representative workloads, input sizes, environment and run conditions; note variability and measurement limits
- Expose resource trade-offs: latency, CPU, memory, I/O, dependency/operational weight and money. A local speedup may move cost elsewhere
- Cold paths stay untouched
- If you did not measure, write `unmeasured` and keep the finding as a candidate
- When nothing measures the path, add a minimal harness: timing tests beside the code, skipped by default, or the ecosystem's bench tool. Same workload before and after; repeat runs and report spread
- Decompose a path into its parts before choosing a target. Declare each gate threshold before measuring; a change that misses it is dropped

### 4. Hunt Waste First

Attack in this order. Stop at the first level that removes the cost.

1. Needless work — extra copies, repeated compute, unbounded scans, chatty I/O, work on the wrong side of a boundary
2. Algorithm and data structure on the hot path
3. Data movement — batching, pushdown, streaming, pagination that the contract already allows
4. Drop-in upgrade of what is already in the stack
5. Restructure

Do not micro-tune a cold path. Do not strip checks, reduce precision, or weaken failure handling to go faster.

### 5. Verify Before You Claim

Apply to every candidate, ours or supplied. A failed check rejects or rewrites the claim; an unchecked one stays a candidate.

1. Exists: the flag, feature or API exists in the pinned version. Read that version's manifest or source (a local package cache counts) or its versioned docs
2. Not already done: the pinned toolchain or library does not already do it by default or by runtime detection
3. Not already active: no feature unification, transitive dependency or config override already enables it
4. Located: the cited file and line match the code. A wrong location demotes the claim until re-verified
5. Ceiling: measure the target's share of the path. The best possible speedup is 1 / (1 − share); reject when that ceiling is below the declared threshold
6. Contract-bound: changes to persisted, shared or parity-bound behavior (stored digests, cache keys, file layouts, wire formats, model preprocessing) fail the Function check unless the user approved a contract change
7. Concurrency fits: added parallelism is bounded, respects existing pools and schedulers, keeps result order, and keeps progress and cancellation semantics
8. Durability fits the data: authoritative data keeps its atomicity and fsyncs; a disposable cache may drop fsyncs only if it validates what it reads and regenerates on failure
9. Tests really run: the tests a claim relies on run in CI; otherwise say so and make running them part of the change

When the user supplies recommendations, give each exactly one verdict with evidence:

- `Accept` — passes every check
- `Modify → <better form>` — the goal is valid, the method is not; name the better form
- `Reject (<failed check>)`
- `Defer (<missing evidence or decision>)`
- `Already done (<evidence>)`

Also scan for what the list missed; the inventory and suspect patterns are the sweep.

### 6. Apply the Zero-Cost Gate

Admit a change only when every check is yes:

- Function: observable outputs and caller-visible side effects stay the same
- Reliability: failure semantics, integrity, bounds, and precision are not weaker
- Weight: net dependencies, operational surface, and code complexity do not grow
- Money: no new paid obligation unless it replaces a larger one
- Reversal: a rollback path exists
- Gain: a supported improvement on a named axis from a representative comparison on this system, with uncertainty and resource trade-offs stated

A failed check means Rejected, even if another axis improved. An unknown check leaves an unresolved candidate with the missing evidence and next check in Measurement/Verification; it is not admitted to Ranked gains, Upgrades or Restructures. Only all-pass items are supported recommendations. An audit can complete with no admitted gains.

### 7. Gate Upgrades and Libraries

Prefer, in order: delete the work; use the language and current stack; a compatible version of an existing dependency; a maintained drop-in with the same contract and less weight; a new library only when it removes more than it adds.

For every candidate tool or library, record:

- Contract match (API, errors, types, concurrency, numeric behavior)
- Maintenance and license compatibility
- What it removes, not only what it adds
- The named axis it wins on, with evidence from this system — not from the vendor's bench

Stdlib or an existing dependency wins when it meets the need. Do not add a dependency to look modern.

For an emergent or young tool, check an adapter, rollback and evidence of improvement on a named axis. Known absence of a required safeguard fails; an uninspected safeguard remains unknown under the same gate.

Never name a tool because it is popular. Name it because it passed this gate on this code.

### 8. Restructure Only When Shape Is the Cost

Restructure when the current shape forces extra I/O, extra copies, or serialized work on a hot path.

Forbidden as "optimization": layering fashion, package renaming, architecture theater, new abstractions that do not remove cost.

Callers and error shapes stay identical unless the user approved a contract change.

### 9. Prove No Cost

- Existing tests that cover the contract must still pass
- Where coverage is thin on a touched path, propose contract tests first: outputs, errors, ordering, bounds, concurrency
- Classify each item: `safe now` / `needs tests first` / `needs measurement first` / `needs human decision`. Items lacking gate evidence remain candidates in Measurement/Verification, regardless of a promising local result
- When in doubt, leave it in the audit and wait. Do not rewrite production code under this skill

Correctness bugs found while scanning are out of scope. Record them as `handoff to 360-backend-audit`, do not disguise them as optimizations.

### 10. Bound the Expectation

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

### 11. Write the Audit

- Write the full audit to a file using the work-file template
- Reuse the existing path if known; otherwise `plans/<short-slug>-optimize.md`; create the folder if needed; ask once if ambiguous
- If the file cannot be written, use the in-session delivery fallback
- Rank admitted gains by conservative impact versus effort versus risk
- Keep new work and updates to existing work in separate lists
- Print the Reader's Briefing in chat before asking anything. A next-action question with no briefing above it is a failed delivery. If the host sends one message, the briefing comes first in that message

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

1. Contract — what must not change, including persisted, shared and parity-bound behavior
2. Stack inventory — the table from Inventory the Stack, with effective state and suspects; layers out of scope
3. Measurement — what was profiled, load, environment, harness, thresholds declared up front, what is `unmeasured`; unresolved candidates and missing gate evidence
4. Recommendation verdicts — only when a list was supplied: each item, its verdict, the evidence, and the better form for `Modify`
5. Ranked gains — only items that passed the Zero-Cost Gate. Each row:

   - Change and axis (speed / weight / reliability)
   - Evidence (this system)
   - Baseline
   - Expected effect — conservative typical case, scoped `local` or `end-to-end`
   - Holds when
   - Falsified when
   - Rank: `high` / `medium` / `low` (supported gains only)
   - Effort and classification

6. Upgrades — drop-in runtime, library, or tool changes that passed
7. Restructures — shape changes that passed, with why the current shape is the cost
8. Rejected — attractive ideas that failed the gate, with the failed check
9. Handoff bugs — correctness or dead-weight items for `360-backend-audit`; or "None"
10. Verification — tests run/to run, rollback, how to detect a silent contract break; next checks for unresolved candidates
11. Implementation plan — grouped as New vs Updates to existing
12. Handover — Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early

Implementation tasks use the Shared Plan Contract. Keep candidates separate from supported gains using the existing Measurement/Verification sections. State inspection limits; completion of the assessment does not verify a candidate or its implementation. No magnitude without a measurement on this system.

### Reader's Briefing

Print this in chat. Follow the Delivery rules for file or in-session output.

```text
Optimize — complete
Full audit: <path>

Verdicts (only when a list was supplied)
- <n> accepted, <n> modified, <n> rejected, <n> deferred, <n> already done
- <notable reject or modification, and why>

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

Briefing rules:

- Write for someone who has not read the full artifact. Define or drop any term of art
- One line per bullet, 20 words or fewer. The whole briefing fits one screen (about 25 lines)
- Outcomes and decisions, never mechanics: no task IDs, phases, priorities, status tables, executor notes, or skill names
- Keep new things and changes to existing things in separate sections. Never mix them
- Confidence uses proven (evidence in hand), likely (strong reason), possible (suspected), or uncertain (hypothesis). Never numbers; never proven without evidence
- The second line names the full artifact's path, or says `in-session only; not persisted`
- Omit empty sections unless this skill marks one as always present
- Gains, upgrades and restructures change existing code; a harness or tool the change needs is named inside the item it serves
- Never hype. If you cannot state a conservative expected effect, the gain is not ready to brief

## Quality Gate

The audit is complete only when every answer is yes:

- The contract is written and treated as the floor
- The stack inventory covers build, test, lint and format, typecheck, CI, runtime libraries and hot-path I/O, or names the layers left out
- Effective state (pinned version, defaults, unification, transitive presence) was resolved for every candidate
- Every recommended flag, feature or API was confirmed to exist in the pinned version
- Every targeted speedup has a measured share and ceiling, or is marked `unmeasured`
- Persisted, shared and parity-bound behavior was identified before any change was admitted
- Every supplied recommendation has exactly one verdict with evidence
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
- The briefing follows the briefing rules and does not hype
- The Reader's Briefing was printed in chat before any next-action question
- Completion includes the interactive next-action offer with a recommendation, stop choice, and custom-note option, or the explicit-instruction/parent-owned exception; unanswered suggestions do not block the completed deliverable

Any "no" means the audit is not finished. Fix it and review again.
