# Audit and portable token-efficiency redesign — execution record

Implemented the user-supplied plan across all seven skills. Scope: skill instructions, supporting references, shared contracts, validation and documentation. The repository remains Markdown/Node-based; Python packaging is out of scope.

## Coverage ledger

| ID | Task | Priority | Acceptance check | State | Evidence |
|---|---|---|---|---|---|
| 1.1 | Audit seven skills | must | Read all seven and reconcile supplied findings | done (verified) | Audit resolution table below; original consistency check passed despite gaps |
| 1.2 | Shared session consent | must | Six siblings carry identical consent/load rules; transitions evaluated | done (verified) | Shared entry enforced by checker; scenarios C1–C8 |
| 2.1 | Portable efficiency and evidence | must | Capability gates, strict preservation, separate loss approval, recovery and measurement documented | done (verified) | Token-efficiency 2.0.0 and its evidence reference; P1–P6 |
| 3.1 | Plan and handover contracts | must | Fields/statuses survive blueprint → faculty → review → execution | done (verified) | Five snapshots passed seven categories of contract assertions; actual README execution passed eight checks |
| 3.2 | Audit, faculty and delivery repairs | must | Audit read-only; roster optional; output fallback works | done (verified) | P4, P7, P8; faculty suggestion gate fixed and rerun |
| 4.1 | Validator and fixture coverage | must | Valid fixtures pass; malformed metadata, contracts, links and registration fail | done (verified) | 51 Node tests; includes actual task/handover template checks |
| 4.2 | Behavioral evaluations | must | Consent, capabilities, recovery and paired tasks evaluated with honest limits | done (verified) | Three evaluator agents; two paired fixture exercises; scenario protocol and captured evidence linked below |
| 5.1 | Versions and documentation | must | Indexes, guide, README contents and compiled references agree | done (verified) | Version table below; deterministic bundle and consistency checks |
| 5.2 | Final verification | must | Tests, consistency and diff checks pass; scope reviewed | done (verified) | Verification commands below; final diff limited to the stated scope including CI validation |

## Audit resolution

| Skill / shared component | Finding and resolution | Version |
|---|---|---|
| Blueprint | Added Skills and allowed task values; canonical handover; readiness and portable output | 1.6.0 → 2.0.0 |
| Faculty | Roster moved to optional reference; roles chosen from risks; obsolete review-section dependency removed; material edits invalidate review; mode-specific completion gate | 1.0.0 → 1.1.0 |
| Expert review | Local minimum plan contract removes installation dependency; applicable risk gate and concrete blockers replace endless review | 2.3.0 → 3.0.0 |
| Execute | Removed automatic conversation clearing; verified handover and evidence recovery; optional overlay consent overrides plan listing | 1.1.1 → 2.0.0 |
| Backend audit | Read-only inspection by default; unification and observability are recommendations; evidence bounds and verification gaps explicit | 1.2.0 → 2.0.0 |
| Optimize | Shared consent, task/handover contracts and complete in-session fallback; existing performance quality bar retained | 1.1.0 → 2.0.0 |
| Token efficiency | Capability-aware techniques, strict preservation, separate lossy-method approval, observable checks, honest measurement | 1.2.0 → 2.0.0 |
| Contributor guide and validator | Exact metadata, naming, useful synchronized negative routes, local contracts, references, registration and compiled contents checked | Repository tooling |

Major versions mark changed output contracts. Faculty's compatible workflow/reference additions retain the existing output structure and receive a minor bump.

## Decisions

- Consent lasts for the session; unanswered offers are inactive and not repeated. Explicit invocation counts; a generated plan listing does not. Revocation is immediate; a new session starts unknown.
- Consent authorizes the overlay only, not installation, configuration changes, lossy techniques or cross-session memory writes.
- Strict accuracy means no intentional sacrifice of task requirements. It is not a mathematical guarantee of error-free output.
- Every skill works independently. Shared text is intentionally duplicated in installed skills; repository tooling checks drift without creating runtime includes.
- Files are preferred where supported; explicit output requests and complete in-session fallback take precedence.
- The supplied plan authorized implementation. Resolved design choices were not reopened.

## Verification

Run from the repository root:

```bash
node scripts/build-llms-full.mjs
node --test scripts/*.test.mjs
node scripts/check-consistency.mjs
git diff --check
```

Results: 51/51 fixture tests passed; seven public skills and their contracts, references, indexes and compiled documentation are consistent; whitespace check passed. CI now runs the fixture tests as well as consistency checks.

Fixtures cover public and experimental skills; exact/duplicate/missing metadata; semver and naming; section order and fences; consent and portable delivery; local plan and handover contracts plus emitted template fields; useful negative triggers; broken/escaping/unreachable references; routing and registration drift/duplicates; and stale compiled skill/reference content.

See [behavioral scenarios](behavioral-scenarios.md) for repeatable inputs and outcomes, and [captured evidence](behavioral-evidence.md) for actual paired audit outputs and acceptance results. The trials covered session transitions, missing installation, restricted capabilities, source freshness, pagination, exact values, read-only boundaries, handovers, standalone review, readiness invalidation, and blocked execution without files.

## Findings during implementation

- Independent evaluation found faculty's suggestion mode could not satisfy an unconditional seating gate. Applied a narrow mode-specific fix; rerun passed without seating, plan edits or memory writes.
- Clarified preservation of the already-offered flag across same-session compaction. The wording was inspected; native compaction was not exercised.
- New template tests initially exposed a validator regex bug (multiline end-of-line stopped handover capture early) and an incomplete valid test fixture. Both were corrected; all tests now pass.

## Measurement and limitations

Two representative baseline/overlay pairs passed identical acceptance checks: an exact-character documentation correction and an isolated backend replay audit. No output regression was observed in those fixtures. These were sequential interpreted trials within each evaluator context, with synthetic user replies and simulated host restrictions; they were not blinded fresh-context model runs. Actual fixture code and document operations ran in temporary workspaces. No production service was accessed.

Billed input/output tokens, cached tokens, cost, total model latency and overhead are **UNMEASURED**. No validated savings claim is made. The supporting reference distinguishes caching cost from context reduction and records limitations of learned compression. These results do not establish universal accuracy, native host portability or a compliance rate.

## Handover

- Context: all seven catalog skills and repository validation updated under the supplied plan.
- Decisions: session consent, strict default accuracy, independent installation and portable delivery as above.
- State: done.
- Remaining tasks: none for the implementation scope; native-host trials or measured savings comparisons require separately available environments and telemetry.
- Verification: 51 tests, consistency checker, regenerated bundle, independent interpreted scenarios, two fixture pairs, plan round-trip and diff review.
- Risks and how to detect them early: structural checks cannot establish agent behavior; reuse the scenario protocol after instruction changes and report actual telemetry and regressions when available.
