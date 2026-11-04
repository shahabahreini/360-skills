---
name: 360-optimize
description: Audit working code and its whole toolchain — build, test, lint, CI, and runtime libraries — for zero-cost speed, weight, and reliability gains, verifying every claim against the pinned versions and measuring before ranking. Use when existing code must run faster, lighter, or more robustly without changing what it does, or when a list of proposed tooling or library upgrades needs a verdict.
version: 3.1.1
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

Reuse this session's approval or refusal of `360-token-efficiency`. If unknown and not yet offered, ask once, in the same question round as any other entry question, and keep the overlay off until answered. Explicit user invocation is approval; a plan that lists the skill is not. On approval, load it through the host's skill mechanism, reusing instructions already loaded; if unavailable, say so briefly and continue without installing it. Refusal turns the overlay off, not ordinary efficient work. Revocation takes effect immediately. Consent lasts this session only and never authorizes cross-session memory writes.

### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or `None`), Parallel, Effort, Priority, Done when (observable). Use `Priority: must | should | could`, `Effort: S | M | L`, and `Parallel: yes | no`. Only `should` and `could` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: `Draft` → `Ready for review` → `Reviewed and ready to execute`. Open blocking questions keep a plan `Draft`; a complete unreviewed plan is `Ready for review`; only a passed review sets `Reviewed and ready to execute`, and material edits after it return the plan to `Ready for review` (or `Draft` if blocked). Execution progress lives in the ledger, not in this status. An explicit user instruction to execute a supplied plan authorizes execution without a sibling review; record that basis and never claim a review occurred.

### Delivery

Write the deliverable to a recoverable file when the host supports it, at the existing path or the default below. Honor explicit user output requests. Without files, deliver the same complete structure in chat labeled `in-session only; not persisted`, and never claim a file was saved. With a saved file, chat carries the Reader's Briefing and the path. In a non-interactive run where no one can answer, do not wait: record each open question, apply only reversible defaults, mark readiness honestly, and deliver.

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
- Print the Reader's Briefing in chat before any next-action question; when the host sends one message, the briefing comes first

### Completion: Choose the Next Action

- Deliver and verify the current result first, with its location. An unanswered suggestion never reopens finished work, and a blocked job is not complete
- Recommend one next action from the local routing below, based on the result, project stage, open risks and prior instructions. Skip stages that do not apply; recommend stopping when no useful work remains
- Ask with the host's interactive question tool, or with numbered choices in chat when there is none: the recommendation first with its reason, a stop option, and a free-text option for any direction, inside or outside the 360 skills. This prompt is separate from the briefing and is not a list of open task questions
- An explicit next-step instruction answers this prompt, and an explicit stop or request for no suggestions suppresses it. Otherwise wait for the user's choice; in a non-interactive run, state the recommendation and stop. Silence, a preselected recommendation, and elapsed time are not authorization. On a choice, clarify only what is missing, load a selected skill through the host's mechanism without installing it (offer an equivalent if it is unavailable), and carry forward paths, decisions, verification, risks and session consent

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

- Write for a reader who has not seen the full artifact; define or drop any term of art
- One line per bullet, 20 words or fewer; the whole briefing fits one screen (about 25 lines)
- Outcomes and decisions, not mechanics: no task IDs, phases, priorities, status tables, executor notes or skill names
- Keep new things and changes to existing things in separate sections
- Confidence is proven (evidence in hand), likely (strong reason), possible (suspected), or uncertain (hypothesis). Never numbers; never proven without evidence
- The second line names the full artifact's path, or says `in-session only; not persisted`
- Omit empty sections unless this skill marks one as always present
- Gains, upgrades and restructures change existing code; a harness or tool the change needs is named inside the item it serves
- Never hype. If you cannot state a conservative expected effect, the gain is not ready to brief

## Quality Gate

The audit is complete only when every answer is yes:

- The contract is written and treated as the floor
- The stack inventory covers build, test, lint and format, typecheck, CI, runtime libraries and hot-path I/O, or names the layers left out
- Every candidate's effective state (pinned version, defaults, unification, transitive presence) was resolved, and every recommended flag, feature or API exists in the pinned version
- Hot paths and every targeted speedup's share and ceiling come from evidence or are marked `unmeasured`; unmeasured candidates carry no magnitude, rank or `proven`
- Persisted, shared and parity-bound behavior was identified before any change was admitted
- Every supplied recommendation has exactly one verdict with evidence
- Waste was considered before upgrades, and upgrades before restructure
- Every admitted change has affirmative evidence for every Zero-Cost Gate check; unknowns remain candidates, and every Rejected item names the check it failed
- No recommendation weakens function, reliability, precision or failure semantics, and no proposed dependency or emergent tool fails the net-lighter, adapter, rollback or evidence rules
- Every admitted gain has baseline, conservative expected effect, scope, Holds when, and Falsified when
- Gains come from representative comparisons on this system with trade-offs and variability, never from vendor or blog numbers; best-case is not reported as typical, overlapping gains are not stacked, and end-to-end claims are scaled by path share or marked `end-to-end unknown`
- Correctness bugs are handed off, not sold as optimizations
- New work and updates to existing work are grouped separately
- The handover distinguishes supported gains, rejected ideas, unresolved candidates and their next checks
- The deliverable is saved at the stated path, or honestly labeled in-session only
- The briefing follows the briefing rules and does not hype
- The Reader's Briefing was printed in chat before any next-action question
- Completion offered one recommended next action with stop and free-text options, or followed an explicit instruction or the parent skill's prompt; an unanswered suggestion does not block the finished deliverable

Any "no" means the audit is not finished. Fix it and review again.
