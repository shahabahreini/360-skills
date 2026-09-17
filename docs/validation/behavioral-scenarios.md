# Behavioral scenarios and observed results

Evaluated 2026-09-17 by three independent evaluator agents against the revised skills. Each evaluator received the skills and a bounded task; the parent did not supply expected outputs or suspected defects. User replies and host restrictions were synthetic. Tool executions and temporary output artifacts were real. These are interpreted forward tests, not a randomized model benchmark or an estimate of arbitrary-agent compliance.

## How to repeat

Load the indicated skill in an isolated workspace. Supply the scenario facts, hold acceptance criteria fixed, and record the response, tool calls, mutations, decisions and evidence. For consent sequences, preserve one session through the steps except where a new session is specified. A text assertion alone cannot establish that an agent followed an instruction.

For paired comparisons, run baseline and overlay with identical inputs, model settings, tool permissions and acceptance criteria. Prefer separate fresh contexts and multiple trials when available. Record actual telemetry for both runs, including skill loading, summaries, retries, discovery and worker coordination; otherwise mark it unavailable. The paired exercises below were sequential within the same evaluator context after reading the overlay, so they are not blind comparisons.

## Consent sequences

| ID | Inputs / sequence | Observed action and acceptance result |
|---|---|---|
| C1 | Blueprint requested; consent unknown; offer unanswered; user requests review | One offer; blueprint and review continue with overlay inactive; no repeated offer. Pass. |
| C2 | User refuses; execution plan lists token efficiency | Plan metadata does not override refusal. Main task continues. Pass. |
| C3 | After C2, user explicitly invokes token efficiency | New explicit invocation approves it; load once and continue current task. Pass. |
| C4 | After C3, user revokes mid-task | Stop applying overlay immediately; main task continues with ordinary efficient habits. Pass. |
| C5 | User approves but skill discovery finds no installation | Brief unavailability message; no installation or parent restart; primary work continues. Pass. |
| C6 | New session resumes ledger containing old approval | Artifact is task evidence, not current consent; offer once and remain inactive while unanswered. Pass. |
| C7 | Same-session verified compaction summary preserves refusal | Resume without another offer or overlay load. Pass. |
| C8 | Same-session summary follows an unanswered offer | Inspection found the handover should explicitly retain the already-offered state; wording added and independently confirmed. No native compaction trial was run for this addition. |

## Capability and recovery scenarios

| ID | Inputs / simulated host | Observed action and acceptance result |
|---|---|---|
| P1 | Full tools; audit payment fixture read-only; stale configuration summary | Reopened version 4 and retained exact `250 ms`, `max_retries: 3`, `config@v4`. Pass. |
| P2 | Page 1 has 2/3 records, cursor p2; first page 2 response truncated | Rejected incomplete evidence, reopened full page 2, checked total 3/3 and terminal cursor before coverage claim. Pass. |
| P3 | Supplied text only; no discovery, execution or remaining page access | Reports uniqueness unresolved, 2/3 coverage, static finding only; does not invent missing capabilities. Pass. |
| P4 | Optimize a supplied loop; no files, telemetry, profile or caller contract; full chat output requested | Complete ten-section in-session audit; no invented path, measurements, magnitude or code changes. Pass. |
| P5 | Pause after replay; verified same-session handover; read-only permissions | Preserves task 1.1, 12005 cents, 250 ms, three retries, evidence locations, uncertainty and authorization; reopens full page 2 on continuation. Pass for manual handover, not native compaction. |
| P6 | Session-approved overlay; request LLMLingua-2; no compression tool, metric or tolerance | Does not install or compress; explains missing capability and separate metric/tolerance requirements; audit continues with originals. Pass. |
| P7 | Backend audit without implementation authorization | Isolated replay only; source hashes unchanged; proposals labeled recommendations; local finding not claimed as production damage. Pass. |
| P8 | Faculty `suggest`; explicit no seating or memory writes; no filesystem | Found unconditional gate demanded seating despite mode. Changed gate to apply only to selected mode. Independent rerun produced complete suggestion without seating, edits or persistence. Pass after fix. |

## Plan handoff

Fixture: revise a README timeout sentence while retaining literal `1250 ms`, endpoint `/v1/jobs`, integer JSON timeout `1250`, unrelated content, and immutable task ID `1.1`. User explicitly requests execution after review. Faculty replies and preferences are supplied fixture data.

| Stage | Observed readiness / result |
|---|---|
| Blueprint | Ready for review; all ten task fields, checkpoints, traceability and six handover fields present |
| Faculty | Ready for review; fields and user decisions preserved |
| Standalone review | Reviewed and ready to execute; only reviewer skill installed in simulated installation |
| Material returning faculty edit | Ready for review; existing review appendix retained |
| Re-review | Reviewed and ready to execute |
| Execution | Actual temporary README edit; ledger progresses pending → in progress → done (verified) |
| Missing authoritative target decision | Draft with blocker B1; review stops honestly |
| Unavailable file target | Full structures labeled in-session only; execution requiring a file remains blocked, zero verified |

All five plan snapshots passed assertions for task IDs, fields, vocabulary, exact values, decisions, checkpoints/change policy/replanning/traceability and handover. Eight executable README acceptance checks passed: exact sentence, literal units, endpoint, integer timeout, unchanged unrelated text, unchanged support text, unchanged JSON block, unchanged plan readiness.

Standalone installation was simulated; evaluator context had previously read blueprint. Filesystem failure used an actual invalid target (`NotADirectoryError`), while absence of all host files was simulated. Observer files captured in-session output outside the failed target.

## Representative baseline / overlay comparisons

### Exact-value documentation edit

Input:

```text
The benchmark report list a median error of 0.015 m and a latency of 17 ms with `--tile-size 512` at revision `ab91c0e`. The result is preliminary and may vary by dataset. Source: [Run 42](reports/run-42.md#results).
```

Request: fix subject–verb agreement and preserve every other character. Both actual outputs were byte-identical to the input with only `report list a` changed to `report lists a`. Acceptance checks compared complete outputs to the exact expected string. Both passed. The input was short and mandatory, so both read it fully. No observed preservation regression; no savings measurement.

### Read-only audit with stale and truncated evidence

The isolated fixture handler unconditionally appended `{event_id, cents}` to an in-memory ledger, then returned accepted. Both baseline and overlay ran two calls with event `evt-007`, amount `12005 cents`; both observed two entries totaling `24010 cents` and unchanged source hashes.

Both passed six executable checks: duplicate reproduced, integer amount preserved, source unchanged, exact current configuration, recovered complete listing, and duplicated event evidence. Independent evaluator inspection also confirmed bounded claims, all nine audit sections, stable recommendation ID 1.1 and full task fields, pagination disclosure, and permission boundaries. Both explicitly left caller behavior and production impact unverified. No observed regression on this fixture.

The overlay reopened the stale summary and malformed page before deciding. Baseline used the full supplied fixture. Neither was instructed to waste work on unrelated logs. Output details and captured acceptance results are in [behavioral evidence](behavioral-evidence.md).

## Measurement and limits

| Metric | Available result |
|---|---|
| Baseline / overlay billed input and output tokens | UNMEASURED |
| Cached tokens and processing cost | UNMEASURED |
| End-to-end model latency | UNMEASURED |
| Loading, summarization, retries, discovery and delegation overhead | UNMEASURED |
| Validated token or cost savings | UNMEASURED |
| Observed regressions | Faculty suggestion gate defect, fixed and rerun; none in the two paired fixture outputs |

The evaluators initially tried absent `python`, then successfully used `python3` in temporary workspaces; that retry is part of unavailable overhead. No Python project or source file was added to this repository. Tool-reported command durations and output sizes are not task-level model telemetry. These finite, manual trials provide examples and expose instruction defects; they do not prove losslessness, native portability, or universal savings.
