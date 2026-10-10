# Skill set audit

Baseline: `c22f50f`, inspected 2026-10-10. Seven public skills, no experimental skills. At baseline, 6 of 95 tests failed and the consistency check passed.

Scope: every `SKILL.md`, the faculty references, AGENTS.md, README.md, llms.txt, the validator, and its tests. The audit judged each skill against the catalog's purpose: a plan builder that gives agents an executable plan and gives the user a plain-language summary, with a specialist faculty that reviews the plan from distinct angles using current practice.

## Findings and corrections

| ID | Source and defect | Consequence | Correction |
|---|---|---|---|
| S1 | `scripts/consistency.test.mjs`: six fixtures hardcoded `version: 2.4.0` after blueprint moved to 2.5.0 | CI failed on `main`; every release would break the fixtures again | Fixtures read the live blueprint version |
| S2 | `graft/.cache/session/*.json` tracked although `.gitignore` lists it | A local tool cache ships with the repository | Removed from the index; the local file stays |
| F1 | Faculty Card had no field or rule for current standards; core cards named methods but no reference sources | Seats could give stale "best practice" from memory with no signal that it was unverified | Card gains `Standards`; Apply the Card checks version-specific claims against current primary sources or records them as `Pending` assumptions; core cards list sources without versions |
| F2 | Core cards covered 10 seats, with no seat for UX, accessibility, data, APIs, money, privacy, release, or delivery, although the fit assessment names those natures | Step 3 named an angle that Step 4 had no starting Card for | Core cards regrouped by the nature dimension; 18 seats |
| F3 | Faculty required up to 3 developer questions before any seat when `developer.md` was empty, including in `quiet` mode | First use started with a questionnaire; `quiet` mode contradicted the measurement gate | Measures come from records and evidence first (marked `inferred`); questions only for unknowns that change seating; `quiet` proceeds on inferred measures |
| F4 | Faculty ran "Follow or raise" before "Apply the Card" | A seat raised alternatives before it had findings to raise | Order is now Ask, Apply, Follow or raise, Polish |
| F5 | Faculty session report repeated content already written to the plan and dossiers, had no file path, and no plain-language form | The user received a long agent-facing report instead of a readable summary | Replaced with a Reader's Briefing; the plan and dossiers stay the durable record |
| F6 | Faculty restated the plan contract in three places and the gate in two items; `team` mode said "Step 7" though `call` seats; suggest-mode output depended on review's "seven lenses" | Drift risk and a cross-skill dependency for independently installed skills | Single contract reference; mode table states the steps each mode runs; review angles handed over with plan evidence |
| R1 | Expert review chose from a fixed lens list and ignored faculty output | A faculty pass and a review could pick angles independently, or reopen accepted trade-offs without evidence | Review starts from any faculty lens list, Cards, or `Tailored by` row; records findings per lens; reopens accepted trade-offs only with new evidence; checks version-specific claims |
| B1 | Blueprint and review printed the briefing rule twice in their final step; blueprint also told the agent to avoid skill names right before a completion prompt that allows them | Duplicate and conflicting instructions | One briefing rule per skill; conflicting line removed |
| B2 | Blueprint did not say what goes in a task's `Skills` field or how to treat version-specific details | Executors received unexplained skill lists; stale API details could enter plans as fact | One line each in Craft the Plan; matching gate item |
| C1 | Execute, backend audit and optimize used "Terminal briefing" with separately worded rules; optimize referenced a `Features to add` section its template lacks | One concept under two names, three vocabularies for confidence, and a stale rule | All delivering skills use a Reader's Briefing with one shared, validator-enforced rule block plus local rules |
| C2 | The shared Delivery block told runtime agents how to test skills ("token savings from finite tests") | Contributor guidance consumed context in every skill run | Runtime text keeps one acceptance sentence; the testing guidance moved to AGENTS.md |
| C3 | README showed faculty as a mandatory step between blueprint and review; structure tree and FAQ were incomplete | Readers would route every plan through faculty; new contributors would skip `llms.txt` | Diagram shows faculty as optional; tree, references, and FAQ corrected |

No other change was made. Plan contract, statuses, consent, completion, task template, work-file sections, and memory vocabulary are unchanged.

## Versions

| Skill | Version | Reason |
|---|---|---|
| `360-faculty` | 2.0.0 | Session report replaced by a Reader's Briefing; Card gains `Standards` |
| `360-blueprint` | 2.6.0 | Workflow and briefing-rule changes |
| `360-expert-review` | 3.6.0 | Lens selection, currency check, appendix line |
| `360-execute`, `360-backend-audit`, `360-optimize` | 2.3.0 | Reader's Briefing and shared rules |
| `360-token-efficiency` | 2.1.1 | Gate item reordered only |

## Verification

- `node scripts/build-llms-full.mjs`, `node --test scripts/*.test.mjs` (99 pass, 0 fail), `node scripts/check-consistency.mjs`, and `git diff --check` pass.
- New fixtures reject a missing or changed shared briefing block, a delivering skill without a Reader's Briefing, and contributor drift.
- Entrypoints total 17,879 whitespace-delimited words, up from 17,455. The shared briefing block accounts for most of the increase.

These checks validate structure. They do not show how a given model follows the instructions; no cross-model or live-host runs were made.

## Rule walkthroughs

Manual applications of the written rules, not agent runs.

| Case | Expected from the rules |
|---|---|
| First faculty use, no dossiers, repository shows the developer's preferences | Measures recorded as `inferred`; at most one question round, only for unknowns that change seating |
| `quiet` mode with no dossiers | No measurement questions; inferred measures recorded as assumptions |
| A security seat recommends a library API from memory | Checked against current documentation with source and date, or recorded as `Pending: <check>` in Assumptions |
| Faculty polishes a reviewed plan | Status returns to `Ready for review`; briefing lists what changed with now/after |
| Review runs after faculty | Starts from the seated angles; does not reopen a trade-off the user kept unless new evidence exists |
| Execute finishes with no file access | Full report in-session labeled `in-session only; not persisted`; briefing second line says the same |
