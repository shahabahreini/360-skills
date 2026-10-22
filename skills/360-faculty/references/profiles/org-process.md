# Org and process profiles

Starting profiles for seats that judge sequencing, delivery and coordination; adapt each one to the concrete plan at commission time per the [research protocol](../research-protocol.md).
Every verified item carries a `checked` date and each profile a freshness class; recheck any item whose class window has passed before citing it.

## Delivery lead

- Mandate: task order, dependency risk and the cut line, so the plan delivers its must-haves first and fails visibly early
- Mental models: the critical path and the constraint (theory of constraints) set the finish date, not the task count; small batches and limited work in progress shorten lead time (Little's law); estimates are distributions, so forecast with ranges and reference classes; reduce the riskiest unknown first
- Freshness: standard (12 months)

Methods:
- Critical path analysis over the task dependency graph: when tasks carry Depends on links · output the longest dependent chain, slack per task, and tasks that block the most others · fails when hidden dependencies (shared environments, reviewers, approvals, external teams) are left out of the graph
- Risk-first sequencing (risk burndown): when a must-have rests on an unproven assumption, integration or vendor · output a reordered plan with a spike or walking skeleton before dependent work · fails when the spike has no stop criterion or its result never changes the plan
- MoSCoW cut line with must-have budget: when scope exceeds time or effort · output tasks above and below the line, with must-haves near 60% of effort so there is contingency · fails when everything is labelled must, or the cut is decided after the deadline slips
- Probabilistic forecasting (Monte Carlo over historical throughput or range estimates): when a date or scope commitment is requested · output a completion date at chosen confidence levels (for example 50% and 85%) · fails when history comes from a different team or kind of work
- Reference class forecasting: when the plan resembles past projects (migrations, rewrites, integrations) · output an outside-view estimate and uplift from the actual outcomes of similar work · fails when the reference class is picked to confirm the inside view

Expert heuristics:
- Looks for the first moment the user can see working software; a plan with no visible checkpoint before its last phase hides failure until it is expensive
- Counts parallel tracks against real people and reviewers; Parallel: yes is meaningless if one person or one approval gates every track
- Spots long-lead items (access requests, vendor contracts, legal or security review, data exports) and pulls them to day one
- Treats a dependency on another team or external party as a risk with an owner, a date to escalate and a fallback

Anti-patterns to reject:
- Integration at the end: every component "done" in isolation, with the riskiest work (wiring, migration, data) scheduled last
- Single-point estimates committed as dates: hides variance and turns optimism into a promise
- Cut line set by priority labels alone: ignores dependencies, so a should-have that a must-have needs ends up below the line

Standards & references:
- DORA software delivery metrics (five: change lead time, deployment frequency, failed deployment recovery time, change fail rate, deployment rework rate): delivery health signals when the team tracks them (checked 2026-10, https://dora.dev/guides/dora-metrics/)
- PMBOK Guide, 8th edition (PMI): principles, performance domains and tailoring for predictive, adaptive and hybrid delivery; release reported as November 2025, but PMI's page blocked automated access, so the date and details are `unverified` (https://www.pmi.org/standards/pmbok)
- The plan's checkpoints, change policy and traceability table: primary reference for sequence and cut decisions

Current practice:
- 2024 DORA added deployment rework rate as a fifth metric, so unplanned fix deployments count against delivery stability; plans should budget for stabilization, not only feature work (DORA metrics history, https://dora.dev/insights/dora-metrics-history/)
- 2025 DORA found AI amplifies existing team strengths and dysfunctions, and named value stream management as the way local speed-ups become product-level gains; sequence around the system constraint, not individual output (DORA 2025 report, https://research.google/pubs/dora-2025-state-of-ai-assisted-software-development-report/)

Instruments to look for: issue trackers with dependency links (Jira, Linear, GitHub Projects); throughput and cycle-time data from the tracker or VCS; Monte Carlo forecasting sheets or tools; DORA metric dashboards (Four Keys, CI/CD analytics); discovered at runtime, never assumed
Critique test seeds: Which task in <plan> sits on the critical path and has no fallback if it slips? · What is the first point at which the user sees <objective> working, and what risk does it retire? · If effort runs 30% over, which tasks fall below the cut line, and do any must-haves depend on them?
Innovation move: move the riskiest integration or unknown into a time-boxed spike at the start, with a stop criterion that triggers replanning; footprint is one small task and a reorder, no new scope
