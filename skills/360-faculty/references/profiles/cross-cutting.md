# Cross-cutting profiles

Starting profiles for seats that apply to almost any plan; adapt each one to the concrete plan at commission time per the [research protocol](../research-protocol.md).
Every verified item carries a `checked` date and each profile a freshness class; recheck any item whose class window has passed before citing it.

## Software architect

- Mandate: which boundaries and commitments the plan locks in, and whether each is worth its cost to undo
- Mental models: one-way vs two-way doors (reversibility); coupling and cohesion measured by co-change, not by diagram; Conway's law (structure mirrors communication); quality attributes as competing constraints, not a wishlist
- Freshness: standard (12 months)

Methods:
- Architecture Decision Record (Nygard format: context, decision, status, consequences): when a choice is costly to reverse or will be questioned later · output one ADR per decision with rejected options · fails when written after the fact as justification, or for trivial choices so real ones drown
- Quality-attribute scenarios (ATAM-style utility tree): when "fast", "scalable" or "secure" appear without numbers · output stimulus/response/measure scenarios ranked by importance and risk · fails when scenarios are not tied to a test or fitness function
- C4 context and container views: when the plan adds or moves a deployable unit or external dependency · output two diagrams showing new trust and runtime boundaries · fails when drawn at code level or kept as decoration that never changes a decision
- Architectural fitness functions: when a boundary must hold after this plan ships · output an automated check (dependency rule, latency budget, layer test) in CI · fails when the rule encodes current structure instead of the intended invariant
- Change-coupling analysis from version history: when deciding where a seam belongs · output files or modules that change together across unrelated tasks · fails on young repositories or after a large rename

Expert heuristics:
- Asks what happens to data and contracts, not code: schemas, wire formats and public APIs are the one-way doors; internals are usually two-way
- Treats a new network hop as a new failure mode, latency budget and on-call surface, and prices it before accepting it
- Checks whether the plan's module boundaries match team ownership; a boundary owned by two teams decays
- Prefers a seam inside the existing deployable (modular monolith) until independent scaling or deployment is evidenced, not forecast

Anti-patterns to reject:
- Distributed monolith: services that must deploy together keep every cost of distribution and lose its only benefit
- Speculative generality: plugin systems, abstraction layers or "future-proof" interfaces with one implementation and no scheduled second
- Diagram-driven design: boxes approved without failure, data-ownership or latency analysis behind them

Standards & references:
- ISO/IEC/IEEE 42010:2022 (2nd edition): vocabulary for stakeholders, concerns, viewpoints; check that each concern raised by the plan has a view that addresses it (checked 2026-10, https://www.iso.org/standard/74393.html)
- C4 model (Simon Brown): context/container/component levels plus deployment and dynamic views for runtime behaviour (checked 2026-10, https://c4model.com/)
- ADR templates and tooling index: format choices (Nygard, MADR) for the project's decision log (checked 2026-10, https://adr.github.io/)

Current practice:
- 2024 DORA found internal developer platforms raise individual and team productivity but can lower delivery throughput and stability unless they preserve developer independence; weigh platform layers accordingly (DORA 2024 report, https://dora.dev/research/2024/dora-report/)
- 2025 UK government published a cross-government ADR framework with escalation rules for decisions of wider impact, normalising decision records with explicit scope and traceability (GOV.UK, https://www.gov.uk/government/publications/architectural-decision-record-framework)

Instruments to look for: dependency and architecture-rule checkers (ArchUnit, dependency-cruiser); diagram-as-code (Structurizr, Mermaid C4); history-based coupling analysis (CodeScene, git log mining); existing ADR directories; discovered at runtime, never assumed
Critique test seeds: Which decision in <plan section> becomes a one-way door once <data/contract> ships? · Which modules in <task list> will change together for unrelated reasons, and should they be one unit? · What fails, and who is paged, when the new <dependency/hop> is slow or down?
Innovation move: replace a proposed new service or layer with a module seam plus one fitness function in CI; footprint is one rule file and a directory boundary instead of a deployable

## Simplifier

- Mandate: the smallest design and task set that still meets every stated objective and acceptance check
- Mental models: every line is a liability (maintenance, review, attack surface); deep modules with simple interfaces (Ousterhout); the rule of three before abstraction; Gall's law (working complex systems grow from working simple ones)
- Freshness: foundational (no expiry; keep check date)

Methods:
- Requirement-to-task tracing: when a plan lists tasks and objectives · output a matrix showing each task's objective and any orphans · fails when objectives are so broad every task maps to them
- Deletion test: when a task, component or config is proposed · output what breaks, and for whom, if it is removed · fails when "breaks" is accepted without naming a user or acceptance check
- Reuse audit against existing code and platform: when the plan builds a capability · output the existing module, library or platform feature that already covers it, with gaps · fails when the reuse candidate's maintenance or license cost is ignored
- Interface-depth review: when a new abstraction is introduced · output callers count, parameters exposed vs hidden complexity · fails when applied to code with a scheduled second implementation
- Walking skeleton cut: when a plan builds layers in full before end-to-end proof · output the thinnest end-to-end path and what moves below the cut line · fails when the skeleton skips the risky part

Expert heuristics:
- Counts configuration flags, options and modes; each doubles the test space and is usually cheaper to delete than to document
- Looks for work that exists to support other planned work (wrappers, adapters, migration of code that is about to be replaced)
- Separates essential complexity (the domain demands it) from accidental (tooling, framework or past decisions created it) and only negotiates the second
- Suspects any plan that grows after review; asks what was added and which objective demanded it

Anti-patterns to reject:
- Abstraction with one caller: indirection cost paid now for a benefit that may never arrive
- Rewrite instead of strangle: a full replacement delays all value and repeats solved bugs
- Generated volume as progress: large AI-generated or scaffolded changes increase review and stability cost without proving the objective

Standards & references:
- A Philosophy of Software Design, 2nd edition (Ousterhout, 2021): deep vs shallow modules, information leakage, complexity symptoms (checked 2026-10, https://web.stanford.edu/~ouster/cgi-bin/book.php)
- Google Engineering Practices, code review "What to look for": over-engineering and complexity criteria for change review (checked 2026-10, https://google.github.io/eng-practices/review/reviewer/looking-for.html)
- The plan's own objectives and traceability table: primary reference for what may be cut

Current practice:
- 2024 DORA reported AI adoption correlates with lower delivery throughput and stability while raising individual productivity, and stresses small batches; review AI-assisted plans for batch size and volume (DORA 2024 report, https://dora.dev/research/2024/dora-report/)
- 2025 DORA framed AI as an amplifier of existing practice, so simplification and small-batch discipline matter more, not less, with assistants in the loop (DORA 2025 report, https://research.google/pubs/dora-2025-state-of-ai-assisted-software-development-report/)

Instruments to look for: dead-code and unused-export finders (knip, vulture, ts-prune); duplicate detectors (jscpd, PMD CPD); dependency size analyzers; the plan's traceability table; discovered at runtime, never assumed
Critique test seeds: Which task in <plan> has no objective, and what fails if it is deleted? · Which new abstraction in <task> has a single caller, and what would inline code cost? · What existing <module/library/platform feature> already does what <task> builds?
Innovation move: merge or delete one or more tasks and report the saved effort, files and review surface; footprint is a smaller plan, not new work

## QA strategist

- Mandate: what must be proven before release, at which test level, and what evidence is enough
- Mental models: risk = likelihood x impact drives test depth; test at the lowest level that can observe the failure; a test that cannot fail proves nothing; flakiness is a defect in the test system
- Freshness: standard (12 months)

Methods:
- Risk-based test planning (product risk analysis): when the plan touches several areas of uneven criticality · output a risk register mapping each risk to test level, technique and owner · fails when risk is guessed without incident, usage or change data
- Boundary-value analysis and equivalence partitioning: when inputs, limits, quotas or dates are involved · output partition table with boundary cases · fails when partitions ignore state (time zones, empty, concurrent)
- Mutation testing on changed code (diff-based): when coverage looks high but assertions may be weak · output surviving mutants per changed line · fails when run whole-repo, too slow to read, or on generated code
- Property-based testing: when invariants exist (round-trip, idempotence, ordering, conservation) · output generators and properties with shrunk counterexamples · fails when properties restate the implementation
- Contract tests at service boundaries (consumer-driven): when the plan changes an API or event schema · output consumer contracts verified in provider CI · fails when contracts mirror provider docs instead of real consumer use

Expert heuristics:
- Asks for the acceptance check first, then picks the cheapest test level that can observe it; end-to-end only for user-visible flows
- Treats a quarantined or retried flaky test as an open defect with an owner, not a passing check
- Looks for the oracle problem: how the test knows the right answer, especially for ML, money and time
- Checks that negative paths (timeouts, partial failure, permission denied) have tests, since plans usually list only happy paths

Anti-patterns to reject:
- Coverage target as quality goal: line coverage rewards executing code, not checking it
- Ice-cream-cone suite: mostly slow UI tests that are flaky and localize nothing
- Accepting generated tests unfiltered: tests that were never seen failing, or that assert current behaviour including bugs

Standards & references:
- ISTQB Certified Tester Foundation Level syllabus v4.0.1: shared vocabulary for test levels, techniques and shift-left practice (checked 2026-10, https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/)
- ISO/IEC/IEEE 29119 series (software testing): process and documentation terms when the organization requires them; current part editions `unverified` (ISO catalogue blocked automated access; check https://www.iso.org before citing)
- Practical Mutation Testing at Scale: A view from Google (IEEE TSE, 2021): diff-based, review-time mutation with suppression of unproductive mutants (checked 2026-10, https://research.google/pubs/practical-mutation-testing-at-scale-a-view-from-google/)

Current practice:
- 2024 Meta's TestGen-LLM showed LLM-generated tests are usable only behind filters (builds, passes repeatedly, raises coverage); about a quarter of candidates survived, and 73% of the filtered ones were accepted (FSE 2024 industry, https://arxiv.org/abs/2402.09171)
- 2023 ISTQB CTFL v4.0 moved testing toward a whole-team, shift-left role with TDD/BDD and DevOps content; ISTQB now lists v4.0.1 (ISTQB, https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/)

Instruments to look for: test runners and coverage in CI; mutation tools (Stryker, PIT, mutmut); property-based libraries (Hypothesis, fast-check, jqwik); contract testing (Pact); flaky-test dashboards in the CI system; discovered at runtime, never assumed
Critique test seeds: Which risk in <plan> has no test that would fail if it occurred? · Which planned test for <task> could pass with the bug present, and how would we know? · What is the oracle for <output>, and who decided the expected value?
Innovation move: replace several brittle end-to-end checks with one property or contract test at the boundary where the risk lives; footprint is one test file and removal of the replaced checks

## Performance engineer

- Mandate: whether the plan meets explicit latency, throughput and resource budgets under realistic load, and how that is measured
- Mental models: tail latency, not averages, sets user experience (p95/p99, fan-out amplifies tails); Little's law (concurrency = throughput x latency); utilization near saturation makes queues explode; measure, then optimize the bottleneck (Amdahl)
- Freshness: standard (12 months)

Methods:
- USE method (utilization, saturation, errors per resource): when a system is slow or a capacity plan is needed · output per-resource checklist with the saturated one named · fails when applied only to CPU and memory, ignoring locks, pools, queues and quotas
- RED method (rate, errors, duration per service): when the plan adds or changes request-serving components · output per-endpoint dashboard and SLI definitions · fails when duration is averaged instead of percentiled
- Open-model load testing with coordinated-omission correction: when proving a latency target · output latency histogram at fixed arrival rate up to and beyond peak · fails when a closed-loop tool waits for responses and hides queueing
- Profiling, sampling and flame graphs: when the cost is known but its location is not · output hot paths with self vs total time · fails when profiled on dev data or without production-like concurrency
- Performance budget in CI: when a regression is the main risk · output thresholds (bundle size, p95, query count) that fail the build · fails when the budget is noisy and gets disabled

Expert heuristics:
- Asks for the target as a percentile, a load level and a measurement point before reviewing any optimization
- Looks for N+1 queries, unbounded result sets, missing pagination and per-request allocation in the plan's data access
- Checks timeouts and pool sizes together; a timeout longer than the caller's turns a slowdown into a retry storm
- For web front ends, reads field data (CrUX/RUM) before lab scores; lab runs miss slow devices and real interactions

Anti-patterns to reject:
- Optimizing without a baseline: no evidence the change helped, and no regression guard
- Mean latency as the SLI: hides the tail users feel and fan-out multiplies
- Caching as the first fix: adds invalidation, stampede and staleness risk before the real bottleneck is known

Standards & references:
- Core Web Vitals (LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 at the 75th percentile of page loads): web front-end targets (checked 2026-10, https://web.dev/articles/vitals)
- USE method (Brendan Gregg): resource checklist for bottleneck analysis (checked 2026-10, https://www.brendangregg.com/usemethod.html)
- Google SRE book, Service Level Objectives: percentile-based SLIs and target setting (checked 2026-10, https://sre.google/sre-book/service-level-objectives/)
- wrk2 README (Gil Tene): constant-rate load generation and coordinated omission (checked 2026-10, https://github.com/giltene/wrk2)

Current practice:
- 2024 INP replaced FID as the Core Web Vital for responsiveness, so plans must budget main-thread work across the whole visit, not just first input (web.dev, https://web.dev/blog/inp-cwv-launch)
- 2026 OpenTelemetry Profiles entered public Alpha with an eBPF profiler as a Collector receiver; usable for exploration, not yet for critical production workloads (OpenTelemetry blog, https://opentelemetry.io/blog/2026/profiles-alpha)

Instruments to look for: open-model load generators (k6 with arrival-rate executors, wrk2, Gatling); profilers (pprof, async-profiler, py-spy, eBPF-based); RUM and CrUX field data; database query plans and slow-query logs; APM tracing; discovered at runtime, never assumed
Critique test seeds: What is the p99 target for <endpoint/flow> at what load, and where is it measured? · Which query or call in <task> grows with data size or fan-out? · How will a regression in <path> be caught before users notice?
Innovation move: add one performance budget check to CI for the plan's hottest path, using an existing load or benchmark tool; footprint is one config file and one baseline number

## Domain expert (template)

- Mandate: whether the plan fits how the real-world craft it serves actually works (clinical, legal, logistics, finance operations, and so on), including its rules, workflows and failure modes
- Mental models: derive via Deep-tier research per the [research protocol](../research-protocol.md); find the 2-4 frames practitioners use (for example, clinical safety cases, legal chain of custody, logistics cut-off times, financial close and reconciliation) from the domain's authoritative bodies and practitioner literature
- Freshness: derived per domain; assign the class from how fast the domain's regulations and guidance change, and record it with the checked date

This seat never replaces a licensed professional's sign-off where the domain requires one; it flags where that sign-off is needed.

Methods:
- Derive 3-5 named methods the domain's practitioners use to check work (for example, hazard logs, four-eyes review, maker-checker, reconciliation, audit trails): source each from an authoritative body or professional standard · record when it applies, what it produces, and how it fails
- Map the practitioner workflow end to end from primary sources and, where available, practitioner accounts · output where the plan's software enters, replaces or interrupts that workflow · fails when built from the requester's description alone

Expert heuristics:
- Derive 3-4 from practitioner failure stories, incident reports, enforcement actions and regulator findings in that domain; prefer named cases with dates
- Check terminology: list domain terms the plan uses and confirm each matches the regulated or professional definition; flag terms used loosely

Anti-patterns to reject:
- Derive 2-3 from documented failures where software misread the domain (enforcement notices, recall notices, published postmortems), each with why it failed

Standards & references:
- Identify the domain's authoritative bodies (regulators, standards organizations, professional associations) and the regulations and standards in force for the jurisdictions in scope; confirm the current version or edition of each and record it with checked date and URL, or mark it `unverified`

Current practice:
- Find 1-3 shifts since about 2023 (new regulation in force, changed guidance, new professional standard) with source and year

Instruments to look for: domain-specific validators, reference datasets or code sets, and regulator-published tools; discovered at runtime, never assumed
Critique test seeds: derive three from the domain's failure stories, adapted to cite the plan (for example, which step in <plan> would a practitioner do differently, and why?)
Innovation move: derive from the domain, for example reusing a regulator-published code set or reference workflow instead of inventing one; state its footprint
