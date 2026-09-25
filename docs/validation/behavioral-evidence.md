# Captured behavioral evidence

These are observer captures from temporary evaluator workspaces. Paths, filenames and hashes inside captures refer to those fixtures, not this repository. See [scenario protocol and limitations](behavioral-scenarios.md). They are historical results, not tests automatically rerun by CI.

## Audit baseline output

````text
In-session only; not persisted by the simulated audit host. This temporary file records evaluation output.

1. Overview: Read-only audit of src/service.py:1–3 and supplied evidence pages only. Current retry_delay is exactly 250 ms, max_retries 3, source config.json version 4 (config@v4). The v3 summary is stale even though 0.25 s is numerically equivalent.
2. Dead weight: None found in these three lines; no claim about other code.
3. Accuracy: Proven within the isolated fixture: two calls for evt-007, each 12005 cents, append two ledger entries totaling 24010 cents. Source service.py:2 unconditionally appends. Baseline-execution.json records both accepted responses and equal before/after source SHA256. Replays require caller-level deduplication or a handler fix; caller coverage is unavailable, so production duplicate charging is unproven.
4. Duplication and structure: No duplicate logic in inspected function. Transport, caller, and data store are uninspected.
5. Performance risks: Repeated appends may accumulate duplicate work; unmeasured, no performance magnitude.
6. Observability: Handler returns accepted for both calls and has no local duplicate diagnostic. External logs and instrumentation uninspected; no observability change made.
7. Risk register: Retry duplication, locally proven; production impact depends on callers. Detect with replay integration coverage. Completeness: page1 contains 2/3 records and cursor p2; initial p2 is truncated and malformed; complete page2 restores coverage to 3/3 with no next cursor. Event evt-007 appears twice in supplied records. Runtime configuration integration is unverified.
8. Implementation plan — recommendations only. New: none. Updates: ID 1.1; What: prevent repeated ledger writes for an event; How: first verify caller replay contract, then atomically enforce agreed deduplication; Where: src/service.py:2 and caller/data-store boundary once available; Depends on: caller replay contract; Skills: None; Parallel: no; Effort: M; Priority: must; Done when: two deliveries of evt-007 produce the agreed single ledger effect and required response, with concurrency coverage. Classification: needs tests first. Status: Draft; caller contract is a blocking question for implementation, not the audit.
9. Handover: Context: read-only fixture audit. Decisions: no patches, no services, in-session output, baseline overlay inactive, no learned compression or memory writes. State: audit done; implementation pending. Remaining tasks: obtain caller contract and implement only if authorized, at the handler/data-store boundary. Verification: isolated replay and unchanged source hash pass; evidence pagination complete; production tests unavailable. Risks and how to detect them early: caller deduplication may change production impact; inspect it before implementing. Exact config remains 250 ms and 3 retries from config@v4.
````

## Audit overlay output

````text
In-session only; not persisted by the simulated audit host. This temporary file records evaluation output.

1. Overview: Audit covers src/service.py:1–3, config.json, and the complete supplied event listing. Current config@v4 records retry_delay 250 ms and max_retries 3; the v3 summary's 0.25 s is stale and does not replace the exact current value.
2. Dead weight: No dead code identified in this function; other modules uninspected.
3. Accuracy: Locally proven replay duplication. Two isolated calls with evt-007 and 12005 cents both return accepted and produce two ledger entries totaling 24010 cents (overlay-execution.json). The unconditional append at service.py:2 explains the result. Caller deduplication is unknown, so this does not prove production duplicate charging.
4. Duplication and structure: No duplicated business logic within the three lines. Caller and persistence boundaries were not supplied.
5. Performance risks: Duplicate processing can add work; unmeasured, no magnitude.
6. Observability: No duplicate diagnostic in the supplied handler; surrounding logging uninspected. Recommendation only: review diagnostic needs after establishing the caller contract.
7. Risk register: Local replay duplication proven; detect production relevance by inspecting caller deduplication. Evidence boundary: page1 gave 2/3 and cursor p2; truncated malformed p2 was rejected, complete page2 retrieved, count verified 3/3, no next cursor. Both evt-007 records retain 12005 cents. No system-wide clean claim.
8. Implementation plan — recommendations only. New: none. Updates: ID 1.1; What: enforce agreed replay behavior; How: establish caller contract, then test and atomically guard the ledger write if required; Where: src/service.py:2 and caller/data-store boundary; Depends on: caller replay contract; Skills: None; Parallel: no; Effort: M; Priority: must; Done when: duplicate and concurrent evt-007 delivery produces agreed ledger effects and response. Classification: needs tests first. Status: Draft; missing caller contract blocks implementation.
9. Handover: Context: read-only audit with session-approved efficiency overlay. Decisions: preserve integer cents, 250 ms, max_retries 3, no code patches, no external services, no learned compression or cross-session memory, in-session delivery. State: audit done; implementation pending. Remaining tasks: inspect caller contract before any separately authorized implementation. Verification: isolated replay, unchanged source SHA256, current source recheck, and complete 3/3 listing; production checks unavailable. Risks and how to detect them early: caller deduplication may contain impact; inspect before claiming production damage. Evidence: config@v4, page1.json, page2.json, service.py:1–3, overlay-execution.json. Efficiency savings: UNMEASURED; no model token telemetry available.
````

## Audit acceptance record

````json
{
  "baseline": {
    "duplicate_reproduced": true,
    "integer_amount_preserved": true,
    "source_unchanged": true,
    "current_exact_config": true,
    "complete_recovered_listing": true,
    "fixture_evidence_duplicates": true
  },
  "overlay": {
    "duplicate_reproduced": true,
    "integer_amount_preserved": true,
    "source_unchanged": true,
    "current_exact_config": true,
    "complete_recovered_listing": true,
    "fixture_evidence_duplicates": true
  },
  "output_review": {
    "method": "Evaluator semantic inspection of both complete Markdown audits against identical acceptance criteria, not heading/regex matching",
    "both_pass": [
      "nine audit sections with bounded claims",
      "exact 250 ms, 3 retries and config@v4 attribution",
      "12005 cents replay and 24010 cents result",
      "no production duplication overclaim",
      "stable recommendation ID 1.1 and full task contract",
      "pagination restoration and coverage disclosed",
      "permission and persistence boundaries retained"
    ],
    "regressions_observed": []
  },
  "telemetry": {
    "model_input_tokens": "UNMEASURED",
    "model_output_tokens": "UNMEASURED",
    "cached_tokens": "UNMEASURED",
    "cost": "UNMEASURED",
    "model_latency": "UNMEASURED",
    "skill_loading_overhead": "UNMEASURED",
    "tool_discovery_overhead": "UNMEASURED",
    "retry_overhead": "UNMEASURED",
    "delegation_overhead": "UNMEASURED",
    "validated_savings": "UNMEASURED"
  },
  "limits": [
    "One sequential same-agent walkthrough pair, not blinded independent model calls.",
    "Actual model usage telemetry unavailable.",
    "Tool reported wall times are command-level only, not task/model latency.",
    "Initial missing-python failure and retry are disclosed in scenarios.md.",
    "No external APIs, subagents, production services, or source edits.",
    "Role-play restrictions do not prove behavior on native no-filesystem hosts."
  ]
}
````

## Plan snapshot contract checks

````json
{
  "01-blueprint.md": {
    "task_ids": true,
    "task_fields": true,
    "vocab": true,
    "protected_values": true,
    "decisions": true,
    "plan_support": true,
    "handover": true
  },
  "02-faculty.md": {
    "task_ids": true,
    "task_fields": true,
    "vocab": true,
    "protected_values": true,
    "decisions": true,
    "plan_support": true,
    "handover": true
  },
  "03-review.md": {
    "task_ids": true,
    "task_fields": true,
    "vocab": true,
    "protected_values": true,
    "decisions": true,
    "plan_support": true,
    "handover": true
  },
  "04-faculty-material.md": {
    "task_ids": true,
    "task_fields": true,
    "vocab": true,
    "protected_values": true,
    "decisions": true,
    "plan_support": true,
    "handover": true
  },
  "05-rereview.md": {
    "task_ids": true,
    "task_fields": true,
    "vocab": true,
    "protected_values": true,
    "decisions": true,
    "plan_support": true,
    "handover": true
  },
  "branches": {
    "faculty_status_reset": true,
    "appendix_preserved": true,
    "standalone_skill_inventory": true,
    "blocked_review_terminated_Draft": true,
    "no_files_not_marked_done": true,
    "no_files_full_structures": true
  }
}
````

## README execution acceptance

````json
{
  "exact_sentence": true,
  "visible_exact_unit": true,
  "endpoint": true,
  "timeout_integer": true,
  "unrelated_text_unchanged": true,
  "support_unchanged": true,
  "json_block_unchanged": true,
  "plan_readiness_unchanged": true
}
````

## Faculty suggestion rerun

````text
# Faculty suggest / no-filesystem rerun

Evaluation method: same-agent forward role play with supplied fixture; no-filesystem host simulated. This file records evaluator evidence in /tmp; the simulated host performed no writes. Re-read current selected-mode Quality Gate before running. Same user request and acceptance criteria as original scenario.

User: "Suggest experts for this payment-handler audit. Keep it in chat; don't seat anyone or save memory. My goal is correctness, taste is small changes, decisions are test-led, strategy is simplicity."

Assistant output:

In-session only; not persisted.

Fit assessment: Nature is backend correctness and data integrity. Depth is hard to reverse because payment ledger effects may be implicated. Complexity is moderate: task 1.1 crosses handler, caller replay policy, and persistence, with two unresolved boundaries. The suggested band is 3–4 experts.

| Faculty | Priority | Why now | If absent |
|---|---|---|---|
| Reliability | must | Task 1.1 reproduces evt-007 delivery twice; examine retry semantics and failure recovery. | Replay behavior may remain ambiguous. |
| Data integrity | must | Task 1.1 appends 12005 cents twice; examine atomic ledger effects and concurrent delivery. | A sequential guard could miss races. |
| Backend architecture | should | Caller and persistence boundaries for task 1.1 are uninspected. | A handler change could duplicate or conflict with caller guarantees. |

House style: protect correctness with small changes, test-led decisions, and simple implementation. These supplied preferences answer the profile questions, so no further question is needed for this suggestion.

No faculty was seated. Seating, polishing, dossier writes, team management, and per-seat question/raise/memory gates do not apply to this suggest-only request. Existing plan-field, readiness, and plan-section gates require no change because the plan was untouched. Dossier-based continuation is inapplicable because no dossiers were requested or created; the supplied profile and rationale above remain in session.

Handover — Context: read-only payment-handler audit, task 1.1. Decisions: recommend the three lenses above; keep correctness, small changes, tests, and simplicity; do not seat or save memory. State: suggestion done. Remaining tasks: none within this request; if the user later requests review, apply these prioritized lenses. Verification: recommendations follow the supplied replay evidence and uninspected caller/persistence boundaries, not a production-damage claim. Risks and how to detect them early: production behavior may be protected by callers; inspect their replay contract before recommending a code change.

Acceptance review:
- Fits the requested suggest mode: PASS.
- Fit assessment, three evidence-backed recommendations, rationale: PASS.
- Known four-part profile reused without unnecessary questions: PASS.
- No seating, plan edits, source edits, dossier writes, team management, or external services: PASS.
- Honest in-session-only delivery: PASS.
- Applicable continuation fields retain scope, remaining work, verification and uncertainty: PASS.
- Previously contradictory seating gate now explicitly non-applicable: PASS.

Outcome: original contradiction resolved. Completion does not require exceeding the user's requested scope. No new defect observed in this rerun. This is a behavioral walkthrough, not an independent host benchmark.
````


## 2026-09-24 logic revision evidence

The implementing agent knew the scenarios and expected outcomes. Temporary fixture files were created under an isolated system temp directory; no production services or faculty memory were touched. These probes support the concrete observations below, not autonomous skill compliance. Inputs are synthetic; timings were not benchmarked.

### Recovery and evidence probe

Setup: artifact baseline `timeout: 1250 ms\nendpoint: /v1/jobs\n`, actual artifact `timeout: 2500 ms\nendpoint: /v1/jobs\n`. Ledger 1.1 incorrectly says done (verified) at the baseline hash. Ledger 1.2 says in progress, operation op-42, append evt-007 / 12005 cents. Local effects journal already contains exactly that one operation. This simulates interruption between effect and ledger update; it is not a real external API.

Observed baseline hash: `1bc7fe26a3f3ea257271502cfd0655b4f5434cb3abaf1912cdf5bccba74f18dc`; actual hash: `515dc8df70dc157f34cb5cb88102cc39b259f0840411970a2d72a2be4abe1016`. After inspecting both, the agent reopened 1.1, reused the existing op-42 result for 1.2, and deliberately did not replay it. Python assertions checked the different hashes, exact event fields and unchanged artifact/effects bytes.

Pagination inputs: page 1 contains records [1,2], total 3, next p2; first page-2 response is truncated `{"records": [`; recovered page 2 contains [3], total 3, next null. Current config is revision config@v4, retry_delay `250 ms`, max_retries 3; stale summary used config@v3. JSON parsing rejected the truncated page, and assertions checked full record count, terminal cursor and exact configuration after reopening sources.

Actual probe output:

```json
{
  "stale_task_status": "pending",
  "reconciled_action_status": "done (verified)",
  "effects_count": 1,
  "effects_unchanged": true,
  "artifact_unchanged": true,
  "restored_record_count": 3,
  "terminal_cursor": null,
  "exact_config": {"revision": "config@v4", "retry_delay": "250 ms", "max_retries": 3}
}
```

### Indirect caller and failed preservation probe

Node assertions executed a handler through `registered.get(config.eventHandler)` with `config.eventHandler = 'onReceipt'`; the registered function returned `{accepted: event.id}`. This establishes indirect reachability within the fixture only. A separate preservation assertion compared ascending-order contract output for [3,1,2] with an unsafe candidate returning its input unchanged. Any speedup in scenario O3 is hypothetical supplied data, not an observed timing.

Actual probe output:

```json
{
  "indirect_handler_result": {"accepted": "evt-007"},
  "expected_order": [1, 2, 3],
  "candidate_order": [3, 1, 2],
  "preservation_gate": "fail",
  "disposition": "Rejected regardless of supplied speedup",
  "speed_measurement": "UNMEASURED"
}
```

### Complete fallback walkthrough output

Synthetic request: assess a possible repeated-lookup cache; no caller contract, measurements or files available; return the full assessment in chat. The following is the generated walkthrough deliverable, captured here by the evaluation host. The hypothetical host did not save it. No implementation is authorized by this assessment.

```text
in-session only; not persisted

1. Contract — Caller-visible outputs, errors, ordering and freshness must be preserved. Caller contract is unavailable; acceptable cache staleness is unknown.
2. Measurement — Candidate: cache repeated lookups. No baseline/profile, representative workload or candidate measurement. Gain and preservation gates unknown; compare representative repeated/distinct key workloads and memory use after obtaining the caller contract. UNMEASURED.
3. Ranked gains — None; no candidate passed every gate.
4. Upgrades — None supported.
5. Restructures — None supported.
6. Rejected — None established; missing evidence leaves the cache unresolved rather than rejected.
7. Handoff bugs — None established within the supplied description.
8. Verification — Obtain caller freshness/error contract; check output, ordering, invalidation, concurrent access and failure behavior; compare baseline/candidate latency, CPU and memory under the same workload. No tests or measurements run. Rollback unverified.
9. Implementation plan — New: none. Updates to existing: none ready to implement. Candidate investigation is the next possible direction; the missing caller contract blocks an implementation plan, not this bounded assessment.
10. Handover — Context: static cache assessment with no files or telemetry. Decisions: preserve contract; do not implement; unresolved candidate stays outside Ranked gains. State: assessment done, candidate unresolved, implementation pending. Remaining tasks: obtain contract, then measure and test in the actual lookup path if authorized. Verification: static input review only; no measured gain or verified implementation. Risks and how to detect them early: stale answers, memory growth and changed failure behavior; use caller evidence and representative preservation checks.
```

Completion walkthrough: one parent-owned next-action prompt recommends stopping after this bounded assessment unless the user wants to supply the caller contract; allows stop and custom direction. An unanswered prompt does not change assessment completion or authorize implementation. A separate execution scenario requiring unavailable file writes remains blocked, with zero verified implementation tasks.
