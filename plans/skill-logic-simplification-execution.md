# Execution: simplify skill logic

## Coverage ledger

Source: user-supplied plan “Make 360 skills simpler and more reliable”, tasks 1.1–1.5. Direct user instruction authorizes execution without another review. Plan readiness: Ready for review; execution status is recorded here. All tasks are must, sequential, above the cut line; declared task Skills: None.

| ID | Task | Priority | Acceptance check | Status / evidence |
|---|---|---|---|---|
| 1.1 | Record adversarial findings | must | Seven dispositions have source defects, scenarios, impact, corrections and acceptance checks | done (verified): docs/validation/skill-logic-review.md contains B1–T1 plus family gap C1; no unrelated mandatory improvements |
| 1.2 | Revise principles and workflows | must | Contracts and independent installation preserved; no contradictions; entrypoints at most 16,670 words | done (verified): six revised entrypoints, preserved templates/contract blocks; token entrypoint unchanged; final word count 16,435 / 16,670; shared blocks and output-heading topology checked |
| 1.3 | Close structural validation gaps | must | Valid public/experimental fixtures pass; targeted violations fail usefully | done (verified): 91/91 tests and consistency pass; shared Delivery/Completion/gate checks with both fixture classes |
| 1.4 | Exercise failure/recovery scenarios | must | Expected/observed outcomes separated; defects fixed/rechecked; unavailable trials disclosed | done (verified): 20 cases in behavioral-scenarios.md; real local probes and complete fallback in behavioral-evidence.md; two wording contradictions corrected/rechecked |
| 1.5 | Synchronize and verify delivery | must | Appropriate minor versions, catalogs/bundle synchronized; build/tests/consistency/whitespace pass; intended diff only | done (verified): six minor bumps; token efficiency unchanged; build, 91/91 tests, consistency and git diff --check pass; final diff reviewed |

## Deviations

None. Existing staged `.gitignore` change is user work and remains untouched. Output schemas are a stop-and-replan boundary; ordinary wording and fixture choices are authorized implementation details.

## QC results

- Baseline: 51/51 tests, consistency pass; seven public skills, zero experimental; 16,670 entrypoint words.
- Task 1.1 checkpoint: each proposed correction is tied to an instruction and distinguishing scenario.
- Task 1.2 checkpoint: one governing principle per changed skill; original output sections, task template, consent, readiness and completion retained; final 16,435 words below 16,670.
- Task 1.3 checkpoint: 40 new structural cases, 91 total passing; public/experimental positive fixtures and useful failure diagnostics. No claim of semantic validation.
- Task 1.4 checkpoint: 20 bounded walkthrough cases with expectations and observations separated. Temporary probes checked stale ledger reconciliation, interrupted-action reuse, indirect handler invocation, ordering preservation failure and truncated evidence recovery. Two residual wording contradictions were corrected and rechecked. Cross-model/native-host trials not run.
- Task 1.5 checkpoint: `node scripts/build-llms-full.mjs`, `node --test scripts/*.test.mjs`, `node scripts/check-consistency.mjs`, `git diff --check` and staged whitespace check passed. Descriptions unchanged: `llms.txt` already synchronized. Six minor bumps; unchanged token efficiency remains 2.1.0.
- Preservation assertions: all seven output-heading structures unchanged; blueprint task template, shared contracts/completion/local routing retained; token-efficiency entrypoint/reference byte-identical to baseline.
- Final source and fixture diff reviewed; initial staged `.gitignore` change preserved. No new skills, dependencies, installed-copy edits or benchmark framework.

## Unfinished items

None within the supplied plan. Cross-model benchmarking remains outside scope.

## Handover summary

- Context: implement the supplied five-task plan in this repository only.
- Decisions: preserve formats, task IDs/statuses, independent installation, consent and completion; token-efficiency design unchanged. No installed copies or runtime dependencies.
- State: done — 5/5 tasks verified; no blockers.
- Remaining tasks: none. Changes are local and uncommitted; publishing or further work requires a new direction.
- Verification: required checks passed; bounded scenario results and limits are recorded in docs/validation/skill-logic-review.md, behavioral-scenarios.md and behavioral-evidence.md.
- Risks and how to detect them early: finite walkthroughs cannot establish general model compliance; use future real-task observations to detect regressions. Structural fixtures catch contract drift; word count and concrete scenarios constrain instruction bloat. External production recovery and model/token telemetry remain untested or UNMEASURED.
