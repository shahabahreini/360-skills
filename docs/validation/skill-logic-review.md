# Skill logic review

Baseline: `0e0a8aae67aeee2162f7eb52d5875d39be4cabc5`, inspected 2026-09-24. Seven public skills, no experimental skills; 51 tests and consistency passed. Entrypoints total 16,670 whitespace-delimited words. These facts establish structure, not behavioral reliability.

The user supplied the implementation plan and explicitly requested execution. Its readiness remains **Ready for review**; no independent review is claimed. Preserve output sections, task fields, statuses, consent, completion interactions, independent installation, and faculty memory columns/status vocabulary. No new skills, dependencies, benchmark platform, or installed-copy edits.

## Findings and acceptance

Source locations below identify baseline files and headings; quotations are the defective instruction, not endorsed guidance. Impact describes a plausible failure scenario, not measured model frequency.

| ID / disposition | Baseline source and defect | Trigger and consequence | Smallest correction | Acceptance check |
|---|---|---|---|---|
| B1 / revise blueprint | `skills/360-blueprint/SKILL.md`, Core Principle; Workflow 1–2, 5–7; Quality Gate: “without guessing”, all gaps require clarification, unknown choices become open questions, “no duplication” | A reversible filename choice blocks a plan; a quality slogan adds needless abstraction | Separate discoverable facts, material decisions, and reversible defaults; record evidence/defaults and falsifiable assumptions; define domain checks | Default proceeds with reason and revisit condition; an outcome-changing unanswered choice blocks dependent planning; no abstraction without a concrete need |
| R1 / revise review | `skills/360-expert-review/SKILL.md`, Workflow 3–7 and Quality Gate: “Cover Every Scenario”, “Guarantee Reliability”, non-blocking details require answers | A documentation patch acquires operational requirements; speculative concerns become mandatory scope | Require trigger, consequence, evidence or hypothesis, smallest correction; use relevant lenses and rank severity separately from confidence | Documentation omits irrelevant runtime checks with reason; severe plausible loss gets a concrete check before certainty; stop after applicable checks and blocker resolution |
| E1 / revise execution | `skills/360-execute/SKILL.md`, When to Use; Workflow 2–5: ledger is “source of truth”, no freshness or partial-action reconciliation | Old verified row survives an artifact change; interruption after an external write causes duplicate replay | Reconcile plan, ledger, artifacts and verification; record action intent and inspect effects before retry; invalidate affected evidence; use authorized change policy | Stale verdict is reopened; confirmed prior effect is not repeated; failed dependency blocks descendants while independent authorized work continues |
| A1 / revise audit | `skills/360-backend-audit/SKILL.md`, Workflow 1–3; Output Format; Quality Gate: behavior “must survive”; dead-code evidence lacks caller boundary | A registered handler has no direct callers and is deleted; local replay is reported as production loss | Compare intended contract with observed behavior; require trigger, consequence, evidence, confidence and boundary; inspect indirect/config/external use | Registered handler is retained; incomplete search remains uncertain; local reproduction and unavailable production coverage are stated separately |
| O1 / revise optimization | `skills/360-optimize/SKILL.md`, Workflow 4, 7–8; Output Format: affirmative gate permits “unmeasured” gain | Unmeasured candidate reaches Ranked gains; local speedup with preservation failure is sold as safe | Pass / fail / unknown dispositions inside existing sections; representative comparisons, trade-offs and overlap limits | Unknown remains in Measurement/Verification; failed preservation is Rejected; Ranked gains have supported gates; overlapping gains are not summed |
| F1 / revise faculty | `skills/360-faculty/SKILL.md`, Workflow 3–6; Output Format; Quality Gate; `references/seating-roster.md` introduction: fixed seat bands, role as validator/owner, any implementation divergence blocks, unused inference becomes disputed | An advisory persona validates its own inference; overlapping seats manufacture consultation; stale preference overrides current instruction | Evidence or pending method in Validated by; operational owner separate from advisor; bands are guidance; material divergence only; provenance and freshness in existing fields | No role validates an inference; current instruction prevails; overlapping seats merge; stale is not disputed without contrary evidence; suggest mode writes no dossiers or plan |
| T1 / retain token efficiency | `skills/360-token-efficiency/SKILL.md`, Workflow 1–6 and completion | Handoff drops refusal, exact units, truncation or stale evidence | Keep existing design and version; recheck compatibility only | Refusal/revocation retained; missing capabilities disclosed; incomplete evidence reopened; exact values and parent-owned prompt preserved |
| C1 / family consistency | `AGENTS.md`, Delivery vs six sibling Delivery sections; `scripts/lib/contracts.mjs` DELIVERY; `scripts/check-consistency.mjs` workflow checks | Missing verification paragraph or displaced/altered completion silently passes structural validation | Synchronize Delivery; enforce canonical completion, local routing, final Workflow position and matching Quality Gate in public and experimental skills | Positive fixtures pass; missing/changed/misplaced/duplicate/fenced completion, absent routing/gate, and Delivery drift fail with useful errors |

No other proposed improvement is mandatory. Each correction must satisfy its distinguishing scenario without changing artifact schemas. Preserve token efficiency unchanged. Operational rules belong in Workflow; Core Principle states one governing idea; gates check observable completion. Assessments may finish with disclosed limits; implementation cannot claim an unrun acceptance check passed.

## Verification record

The six entrypoints now use one governing principle and explicit decision/evidence rules. Output section topology, shared plan fields/statuses, consent/completion blocks and independent installation are retained. Token efficiency and its reference are unchanged.

The [scenario record](behavioral-scenarios.md#2026-09-24-logic-revision-walkthroughs) separates expected outcomes from observed manual rule applications. [Supporting evidence](behavioral-evidence.md#2026-09-24-logic-revision-evidence) records local fixture outputs and a complete fallback assessment. Two residual contradictions were found during walkthroughs and corrected: execution’s phase gate now applies before dependent work, and a local microbenchmark supports its tested boundary without establishing representative end-to-end gains. Both cases were rewalked after correction.

Structural fixtures reached 91 passing tests, including public/experimental completion, routing, gate and Delivery failures. Structural checks do not prove philosophical judgment. Cross-model and native-host trials are outside scope; production external-action recovery, model usage and savings are UNMEASURED. No unresolved defect was observed in these bounded walkthroughs; this is not a universal reliability claim.


## Final acceptance

- Build, 91/91 tests, consistency and both working/staged whitespace checks passed on 2026-09-24.
- Entrypoints total **16,435 words**, 235 below the 16,670 baseline ceiling (whitespace-delimited count, not token telemetry).
- Automated preservation checks confirmed all seven output-heading structures, the blueprint task template byte-for-byte, shared consent/plan/completion blocks, and local routing. Token-efficiency entrypoint and reference remain byte-identical.
- Compatible minor versions: blueprint 2.4.0; expert review 3.4.0; faculty 1.3.0; backend audit, execute and optimize 2.2.0. Unchanged token efficiency remains 2.1.0.
- README metadata and compiled documentation were synchronized. Descriptions did not change, so `llms.txt` required no edit and passed exact-description consistency.
- Final diff review found only intended source, validation and generated-document changes; the pre-existing staged `.gitignore` edit was preserved. No installed copies were modified.

## 2026-11-04 audit: duplication, host coupling and execution cost

Baseline: `5af2af2`, 99/99 tests and consistency passing, entrypoints 23,157 whitespace-delimited words. Scope: logic gaps, contradictions, over-structure, wording tied to current hosts or models, and the language used toward agents and users. User decisions: simplify execute's quiet mode, make `lean` the default, keep faculty to wording fixes, delete the stale execution ledger.

| ID | Finding | Disposition |
|---|---|---|
| F1 | About 750 words of shared blocks repeated per skill | Compressed consent, delivery, completion and briefing blocks in `scripts/lib/contracts.mjs` and every copy; semantics kept |
| F2 | Execute could ask three entry questions in separate rounds | Consent now joins any other entry question in one round; execute asks delegation and mode in that round and starts on defaults |
| F3 | Default `quiet` cost more tokens than `lean` | `lean` is the default; `quiet` on request |
| F4 | Quiet mode required a per-plan runner script, board file and viewer offers | Removed; the ledger is the only state file, plus a disposable log and an append-only events file |
| F5 | Host tool names and a benchmark anecdote in a portable entrypoint | Replaced by capability wording; validator rejects known host tool names in `SKILL.md` |
| F6 | Output-mode sections interrupted Steps 1 to 7 | Moved before Step 1 |
| F7 | Executor brief had no state for unanswered choices | Added `unanswered`, treated as off until a message says otherwise |
| F8 | Ledger row fields differed between workflow and output | One field list: ID, name, priority, acceptance check, status, evidence |
| F9 | No cleanup rule for runtime files | Log and events files are disposable; their handling is stated at completion |
| F10 | 24 execute gate items with duplicates | 12 local items plus the two shared items |
| F11 | Blueprint "ask until nothing is open" contradicted the routine-default rule | Asks only about material decisions and facts inspection cannot settle |
| F12 | Review gate demanded rounds its workflow does not require; round sizes differed | Gate aligned to material decisions; rounds of one to four in both skills |
| F13 | Review repeated lean-audit questions and a testing gate item | Duplicates removed |
| F14 | Backend audit routing omitted `360-optimize`; grammar error | Negative trigger and README routing updated; sentence fixed |
| F15 | Optimize repeated the cold-path rule and three "unmeasured" gate items | One rule and one gate item |
| F16 | Faculty repeated consent and readiness rules; "developer" and "user" were undefined synonyms | Duplicates now point to the shared rule; term defined in Step 1 |
| F17 | Token efficiency stated price ratios and model behavior as fact | Reworded as general rules with reasons |
| F18 | Stale execution ledger in `plans/` | Deleted |
| F19 | The Agent Skills specification may expect `version` under `metadata` | Open: agentskills.io was unreachable from this session; frontmatter unchanged |

Language rules for agents and users were added to AGENTS.md: rules carry their reason, `never` is kept for unsafe or irreversible actions, one term per concept, gates check results instead of restating steps, and user-facing text states concrete results and calibrated confidence.

Execute walkthroughs against the revised text, applied manually by the implementing agent (not independent trials):

| Case | Expected | Observed in text |
|---|---|---|
| Entry questions unanswered | One question round; work starts in `lean`, delegation off | Session Choices and the consent block both require one round and defaults while unanswered |
| Quiet with a background executor, then a decision | Executor marks `needs decision`, continues independent work; shell relays the answer; shell runs final verification | Quiet steps 2, 4 and 5 and the Executor Brief cover each point |
| Quiet on a host without background subagents | One-line notice, continue in `lean` | Stated after the quiet steps |
| Resume with a stale verified row | Row reopened, dependent verification invalidated | Step 2 reconciliation bullet |

One conflict was found and fixed during the walkthrough: the Lean rules told the executor to update the todo list, which the Executor Brief forbids. The todo list now belongs to the main thread only.

Result: entrypoints total 21,014 words (from 23,157). Execute fell from 4,787 to 3,366 words; the 3,000-word target was not met because the shared blocks it must carry account for about 600 words. Structural checks and these walkthroughs do not establish model compliance or token savings; those remain UNMEASURED.

## 2026-11-04 second pass: handoffs, conflicts, validator, fallbacks, routing and a trial

Baseline: `db5533a`, 100/100 tests. Token figures below are chars/4 estimates, not the Claude tokenizer (its encoding file was blocked by the network policy).

### Static analyses

| ID | Analysis | Finding | Disposition |
|---|---|---|---|
| S1 | Handoff map | Review read a "faculty lens list" and "seat Cards" that faculty never produces | Review now reads faculty review angles and faculty blocks |
| S2 | Handoff map | Audit and optimize implementation plans carry no readiness status; execute required one | A plan without a status counts as unreviewed |
| S3 | Rule conflicts | Token efficiency requires confirming the model that ran; execute delegation never recorded it | Ledger records the model that actually ran when the host reports it |
| S4 | Rule conflicts | Faculty writes dossiers after every seat but named no single authorization point | Authorization is asked once, in the seating confirmation |
| S5 | Validator coverage | Purpose length, duplicate gate items and the briefing path line were not enforced; faculty's Purpose had three sentences | Three checks with fixtures; faculty Purpose fixed |
| S6 | Fallbacks | With no one to answer, Completion and question rounds waited indefinitely | Shared Delivery and Completion: record open questions, apply only reversible defaults, deliver, stop |
| S7 | Fallbacks | Quiet mode needs file writes for its events file | Quiet falls back to lean without file writes |

### Faculty 4.0.0

Seats extend the shipped profile with 10 plan-specific fields instead of rewriting 17; the per-seat block is 7 lines instead of 13; one source serves several seats; the cross-cutting profile (about 5,000 tokens) loads only when a cross-cutting seat is needed; the gate checks results instead of restating steps. Entrypoint: 5,142 to 4,767 words. The 4,000-word target was not met without cutting working rules.

### Routing test

Thirty prompts (26 with an expected skill, 4 with none), descriptions only. Sonnet: 30/30. Haiku: 30/30. No description changed. The most frequent runner-up confusions were faculty against expert review and backend audit against optimize. Limit: the prompts were written by the agent that edited the descriptions, so they may be easier than real requests.

### Behavioral trial

One agent per chain ran blueprint, expert review and execute on a fixture Node project (add `maxLength` to `slugify`, fix repeated dashes), with scripted user answers. This deviates from the planned one agent per skill because a single session is the realistic case.

| Check | Chain B (lighter model) |
|---|---|
| Plan tasks carry every contract field and valid vocabulary | pass (5 tasks) |
| Review set `Reviewed and ready to execute` and wrote the appendix | pass |
| Every task has a final ledger status with evidence | pass |
| Project tests and objective probe | pass (11/11; dashes, `maxLength`, existing caller) |
| Briefing before every next-action question; path on line two | pass (3 skills) |
| Token-efficiency offer asked once; execute choices in one round | pass |
| Ledger handover section | fail: missing |
| Review briefing bullet length | fail: 3 finding bullets over 20 words |
| Review briefing size matches plan footprint | fail: briefing said 1 new file, plan said 0 |

Fixes: execute Step 7 now names every Work file section including the handover; review finding bullets may use up to 30 words, since the template carries problem, fix and result; blueprint and review briefings must match the plan's footprint line. These were rechecked against the text, not by a full re-run.

Chain A (current model) stopped during blueprint when a safety check halted the agent while it wrote the plan. Its partial transcript shows one question round with the token-efficiency offer asked once, then the defaults batch. The run was not repeated. Quiet mode was not trialed (it needs nested background agents). Token usage per chain was not reported by the host and is UNMEASURED.

### Result

103/103 tests and consistency pass. Estimated load: all entrypoints 33,856 to 33,577 tokens; faculty 8,190 to 7,575; blueprint, review and execute chain 13,870 to 14,114, because the headless-run rule adds about 40 tokens per skill. The main remaining weight is in the blueprint, review and optimize Quality Gates (about 550 to 610 tokens each).
