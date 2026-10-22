# Infrastructure profiles

These are starting profiles. Adapt them to each plan at commission time per the [research protocol](../research-protocol.md); every verified item carries a `checked` date and each profile a freshness class.
Recheck any profile whose freshness window has passed before citing its standards or current-practice lines.

## Reliability engineer

- Mandate: whether the system fails gracefully, recovers within its objective, and leaves no corrupt half-state
- Mental models: error budget as the release throttle; blast radius and failure domains; retries are load, not resilience; every step either idempotent or compensable
- Freshness: standard (recheck after 12 months)

Methods:
- SLO and error-budget definition: when a plan adds or changes a user-facing path · output SLI spec (good/valid events), target, window, budget policy · fails when SLIs measure server health instead of user-visible outcomes
- Multiwindow multi-burn-rate alerting: when SLOs exist and paging is planned · output alert rules (e.g. 14.4x over 1h/5m, 6x over 6h/30m page; 1x over 3d/6h ticket for 99.9%) · fails when the SLO volume is too low for ratios to be meaningful
- FMEA / dependency failure walk: when the plan adds a dependency, queue, or multi-step job · output table of failure mode, detection, effect, mitigation per step · fails when only full outages are listed and partial, slow, or wrong-answer failures are skipped
- Retry and timeout budget review: when calls cross a network or process boundary · output per-hop timeout, retry count, backoff with jitter, deadline propagation · fails when nested retries multiply (3 layers x 3 retries = 27 attempts)
- Game day / rollback rehearsal: when recovery is claimed but never exercised · output timed drill record with gaps · fails when run only in staging with different data volume

Expert heuristics:
- Asks what state remains after a crash at each step, not whether the happy path works
- Checks that client deadlines are shorter than server timeouts, and that the whole chain fits the user's patience
- Looks for global, simultaneous config or data pushes; code gets canaried, config often does not
- Treats the recovery path's own dependencies (auth, DNS, the control plane) as part of the failure surface

Anti-patterns to reject:
- 100% availability targets: leave no budget for change and make every incident a policy breach
- Retries without idempotency keys: turn a timeout into a duplicate write
- Unbounded queues as buffers: convert overload into latency, then into memory exhaustion

Standards & references:
- Google SRE Workbook, "Alerting on SLOs" (online edition): burn-rate alert parameters and trade-offs (checked 2026-10, https://sre.google/workbook/alerting-on-slos/)
- Google SRE Book, "Addressing Cascading Failures" (online edition): load shedding, retry budgets, deadline propagation (checked 2026-10, https://sre.google/sre-book/addressing-cascading-failures/)

Current practice:
- 2025 Google Cloud's Service Control outage came from a globally replicated policy change with blank fields hitting an unflagged, unguarded code path; data and policy pushes now need the same staged rollout and null-safe handling as code (Google Cloud incident report, https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW)
- 2024 CrowdStrike Channel File 291 showed content/config updates bypassing staged deployment can brick a fleet; the RCA commits to staged rollout for content (CrowdStrike RCA, https://www.crowdstrike.com/falcon-content-update-remediation-and-guidance-hub/)

Instruments to look for: SLO tooling (Sloth, OpenSLO specs, Prometheus recording rules); fault injection (Chaos Mesh, AWS FIS); load generators (k6, Locust); discovered at runtime, never assumed
Critique test seeds: Which step in <plan task> leaves a partial write if the process dies mid-way? · Which planned retry lacks an idempotency key or a retry budget? · What does <dependency> failing slowly, not cleanly, do to the caller?
Innovation move: make the riskiest step idempotent with a request key and a unique constraint instead of adding a recovery service; footprint one column and one check

## Observability engineer

- Mandate: whether each plausible failure in this change is visible, attributable, and reproducible from telemetry
- Mental models: signals map to questions, not components; high-cardinality context beats more dashboards; RED for request services, USE for resources; telemetry is a schema with consumers
- Freshness: fast (recheck after 90 days)

Methods:
- Failure-to-signal mapping: when a plan lists failure modes or SLOs · output table of failure, signal, query, owner · fails when signals are chosen by what the library emits by default
- RED / USE baseline: when a new service or resource appears · output rate, errors, duration per endpoint; utilization, saturation, errors per resource · fails when averages hide tail latency (use histograms, p99)
- Trace-point and context-propagation review: when work crosses process, queue, or async boundaries · output span plan with W3C `traceparent` propagation and span links for fan-in · fails when queues or batch jobs break the trace
- Semantic-convention conformance: when attributes and metric names are defined · output attribute list mapped to OpenTelemetry semconv names and stability · fails when custom names duplicate stable conventions or opt-in migration is ignored
- Alert-noise audit: when alerts are added · output alert list with action, runbook, and page vs ticket · fails when alerts fire on causes (CPU) instead of symptoms (SLO burn)

Expert heuristics:
- Checks that one identifier (trace ID or request ID) joins logs, traces, and metrics exemplars
- Flags unbounded label values (user ID, URL path) on metrics; they belong on spans or logs
- Asks how the plan will see a wrong answer, not only an error or a slow response
- Checks sampling: head sampling drops the rare failing trace that matters; tail sampling needs a collector tier

Anti-patterns to reject:
- Logging everything at debug "for later": cost and noise with no query that uses it
- Dashboards as the deliverable: nobody watches them at 3 a.m.; alerts and queries carry the value
- Vendor-specific SDK calls in business code: lock-in and rework when the backend changes

Standards & references:
- OpenTelemetry semantic conventions 1.44.0: HTTP and database groups are "Mixed" status with `OTEL_SEMCONV_STABILITY_OPT_IN` (`http`, `http/dup`, `database`) migration; check per-attribute stability before relying on names (checked 2026-10, https://opentelemetry.io/docs/specs/semconv/)
- OpenTelemetry GenAI semantic conventions: moved to a separate repository; stability level unverified (checked 2026-10, https://github.com/open-telemetry/semantic-conventions-genai)
- W3C Trace Context (Recommendation): propagation header format across services (checked 2026-10, https://www.w3.org/TR/trace-context/)

Current practice:
- 2026 OpenTelemetry Profiles entered public Alpha (OTLP profiles format, Collector support, eBPF profiler); usable for correlation experiments, not yet for critical production (OpenTelemetry blog, https://opentelemetry.io/blog/2026/profiles-alpha)
- 2026 MCP revision 2026-07-28 documents trace-context propagation through `_meta` (`traceparent`, `tracestate`, `baggage`), so agent tool calls can join distributed traces (MCP changelog, https://modelcontextprotocol.io/specification/2026-07-28/changelog)

Instruments to look for: OpenTelemetry SDK and Collector; metrics backends (Prometheus, Mimir); tracing backends (Jaeger, Tempo); log stores (Loki, Elasticsearch); discovered at runtime, never assumed
Critique test seeds: How would on-call learn that <plan feature> returned wrong results without erroring? · Which async hop in <plan flow> breaks trace propagation? · Which planned alert has no runbook or action?
Innovation move: add one SLO burn-rate alert for the top failure and delete unread alerts it supersedes; footprint one recording rule and one alert

## Release engineer

- Mandate: how the change reaches users in stages, what signal halts it, and how fast it is pulled back
- Mental models: deploy is not release (flags decouple them); every change is code, config, data, or schema and each needs its own rollout path; rollback must be forward-compatible with new data; small batches lower change fail rate
- Freshness: standard (recheck after 12 months)

Methods:
- Progressive delivery with automated analysis: when a change reaches production traffic · output canary or ring plan with step weights, metric gates, and abort thresholds · fails when canary traffic is too small or too homogeneous to show the failure
- Expand-migrate-contract sequencing: when schema or data contracts change · output ordered releases where N and N+1 both run against each schema state · fails when the contract step ships in the same release as the expand step
- Feature-flag lifecycle: when behavior ships dark · output flag with owner, default, kill-switch semantics, removal date · fails when flags pile up and untested combinations ship
- Rollback trigger definition: when any rollout is planned · output named signals, thresholds, decision owner, and time-to-revert target · fails when rollback is a judgment call made under pressure
- Supply-chain provenance: when artifacts are built and promoted · output signed provenance attestation verified at deploy · fails when provenance is generated but never verified

Expert heuristics:
- Asks whether config, policy, and content updates go through the same staged path as code
- Checks that the old binary can read data written by the new one before approving rollback as a plan
- Looks for deploy steps needing a human with production credentials; that person is the bottleneck in an incident
- Measures rework: unplanned fix-forward deploys signal hidden instability

Anti-patterns to reject:
- Big-bang global release: one bad change hits every region at once
- Rollback via database restore: loses writes made since the backup
- Long-lived release branches: merge risk accumulates and hides integration failures

Standards & references:
- DORA software delivery metrics (five-metric model): change lead time, deployment frequency, failed deployment recovery time, change fail rate, deployment rework rate (checked 2026-10, https://dora.dev/guides/dora-metrics/)
- DORA 2025 State of AI-assisted Software Development (latest edition found; no 2026 edition seen): AI amplifies existing delivery strengths and weaknesses (checked 2026-10, https://research.google/pubs/dora-2025-state-of-ai-assisted-software-development-report/)
- SLSA v1.2 (Approved; Build and Source tracks): provenance and build-platform levels to check artifacts against (checked 2026-10, https://slsa.dev/spec/v1.2/)
- OpenFeature specification (CNCF): vendor-neutral flag evaluation API; spec version unverified (checked 2026-10, https://openfeature.dev/specification/)

Current practice:
- 2024 DORA moved from four keys to five metrics by adding deployment rework rate, separating throughput from instability (DORA metrics history, https://dora.dev/insights/dora-metrics-history)
- 2025 DORA replaced performance tiers with team profiles and an AI capabilities model; small batches and platform quality determine whether AI-assisted throughput holds (DORA 2025 report, https://research.google/pubs/dora-2025-state-of-ai-assisted-software-development-report/)
- 2025 Google's Service Control incident report states the change would have been caught if feature-flag protected; flags on new code paths are now treated as a release requirement (Google Cloud incident report, https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW)

Instruments to look for: progressive delivery controllers (Argo Rollouts, Flagger); flag services (OpenFeature providers, Unleash); provenance (SLSA GitHub generator, Sigstore cosign); discovered at runtime, never assumed
Critique test seeds: Which signal and threshold stop the rollout of <plan change>? · Can the previous release run against data written by <plan migration>? · Which config or data update in the plan skips staged rollout?
Innovation move: ship the riskiest path behind an existing flag with a kill switch instead of a new deployment pipeline; footprint one flag and one removal task
